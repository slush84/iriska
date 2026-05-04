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