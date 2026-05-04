import { createSupabaseServerClient } from '@/lib/supabase/server'

const PAGE_SIZE = 24

export type GiCatalogEntry = {
  gi_id: string
  primary_gi_name: string
  country_code: string
  country: string
  category: string
  gi_type_primary: string
}

export type GiCatalogFilters = {
  /** ISO country code: IT / ES / FR / PT / GR. Empty = all. */
  countryCode?: string
  /** Machine category from gi_entries.category. Empty = all. */
  category?: string
  /** Free-text search on primary_gi_name (case + accent insensitive). */
  search?: string
  /** 1-based page number for pagination. */
  page?: number
}

/**
 * Strip diacritics from a string: "Ibérico" -> "iberico", "Comté" -> "comte".
 * Uses Unicode NFD normalization to decompose accented chars, then removes
 * the combining marks (U+0300 to U+036F).
 */
function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Fetch a page of GI entries for the public catalog with optional filters.
 *
 * Sorted alphabetically by name. Uses Supabase range pagination.
 * Returns total count along with the page so UI can render pagination.
 *
 * Filters AND-combine. Search uses case + accent insensitive substring match
 * via the generated column primary_gi_name_search (lower(unaccent(name))).
 */
export async function getGiEntriesPage(
  filters: GiCatalogFilters = {}
): Promise<{
  entries: GiCatalogEntry[]
  totalCount: number
  totalPages: number
  currentPage: number
}> {
  const supabase = createSupabaseServerClient()

  const safePage = Math.max(1, filters.page ?? 1)
  const from = (safePage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('gi_entries')
    .select(
      'gi_id, primary_gi_name, country_code, country, category, gi_type_primary',
      { count: 'exact' }
    )

  if (filters.countryCode) {
    query = query.eq('country_code', filters.countryCode)
  }
  if (filters.category) {
    query = query.eq('category', filters.category)
  }
  if (filters.search && filters.search.trim().length > 0) {
    const term = normalizeForSearch(filters.search.trim())
    query = query.ilike('primary_gi_name_search', `%${term}%`)
  }

  const { data, error, count } = await query
    .order('primary_gi_name', { ascending: true })
    .range(from, to)

  if (error) {
    throw new Error(`Failed to fetch GI entries: ${error.message}`)
  }

  const totalCount = count ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return {
    entries: data ?? [],
    totalCount,
    totalPages,
    currentPage: safePage,
  }
}
import { slugify } from '@/lib/utils/slug'

export type GiDetail = {
  gi_id: string
  country_code: string
  country: string
  category: string
  primary_gi_name: string
  all_gi_names: string[]
  gi_type_primary: string
  gi_types_all: string[]
  tasting_notes: string | null
  horeca_use: string | null
  packaging_formats: string[]
  seasonal_months: number[]
  aliases: string[]
  is_data_thin: boolean
}

export type GiProducer = {
  producer_id: string
  producer_name: string
  parent_company: string | null
  region_town: string | null
  tier: string
  website: string | null
  export_to_eu: boolean | null
  commercial_notes: string | null
}

export type GiPriceBenchmark = {
  sku_id: string
  format: string | null
  unit: string
  eur_low: number | null
  eur_typical: number | null
  eur_high: number | null
  tier: string
  confidence: string
  source_logic: string | null
}

/**
 * Fetch full details for a single GI entry by country code + slug.
 *
 * Slug is derived from primary_gi_name on the fly (no slug column in DB yet).
 * Returns null if no GI matches — caller should render notFound().
 */
export async function getGiDetail(
  countryCode: string,
  slug: string
): Promise<{
  gi: GiDetail
  producers: GiProducer[]
  prices: GiPriceBenchmark[]
} | null> {
  const supabase = createSupabaseServerClient()

  // Step 1: load all GIs for this country, find by matching slug.
  // For ~382 max rows per country this is fast (single SQL roundtrip + JS filter).
  const { data: candidates, error: candidatesError } = await supabase
    .from('gi_entries')
    .select('*')
    .eq('country_code', countryCode.toUpperCase())

  if (candidatesError) {
    throw new Error(`Failed to load GI candidates: ${candidatesError.message}`)
  }

  const match = (candidates ?? []).find(
    (entry) => slugify(entry.primary_gi_name) === slug
  )

  if (!match) return null

  // Step 2: load producers via junction table.
  const { data: producerLinks, error: producerError } = await supabase
    .from('producer_gi_links')
    .select(
      `
      producer_id,
      producers (
        producer_id,
        producer_name,
        parent_company,
        region_town,
        tier,
        website,
        export_to_eu,
        commercial_notes
      )
    `
    )
    .eq('gi_id', match.gi_id)

  if (producerError) {
    throw new Error(`Failed to load producers: ${producerError.message}`)
  }

  // Flatten the nested producers from the junction.
  const producers: GiProducer[] = (producerLinks ?? [])
    .map((link) => link.producers)
    .filter((p): p is NonNullable<typeof p> => p !== null)

  // Step 3: load price benchmarks.
  const { data: prices, error: pricesError } = await supabase
    .from('price_benchmarks')
    .select(
      'sku_id, format, unit, eur_low, eur_typical, eur_high, tier, confidence, source_logic'
    )
    .eq('gi_id_link', match.gi_id)
    .order('eur_typical', { ascending: true })

  if (pricesError) {
    throw new Error(`Failed to load prices: ${pricesError.message}`)
  }

  return {
    gi: {
      gi_id: match.gi_id,
      country_code: match.country_code,
      country: match.country,
      category: match.category,
      primary_gi_name: match.primary_gi_name,
      all_gi_names: (match.all_gi_names as string[]) ?? [],
      gi_type_primary: match.gi_type_primary,
      gi_types_all: (match.gi_types_all as string[]) ?? [],
      tasting_notes: match.tasting_notes,
      horeca_use: match.horeca_use,
      packaging_formats: (match.packaging_formats as string[]) ?? [],
      seasonal_months: (match.seasonal_months as number[]) ?? [],
      aliases: (match.aliases as string[]) ?? [],
      is_data_thin: match.is_data_thin,
    },
    producers,
    prices: prices ?? [],
  }
}