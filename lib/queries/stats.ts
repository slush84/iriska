import { createSupabaseServerClient } from '@/lib/supabase/server'

export type IriskaStats = {
  giCount: number
  producerCount: number
  countryCount: number
  categoryCount: number
}

/**
 * Fetch headline numbers for the landing page live stats band.
 *
 * Reads counts from gi_entries, producers, and the distinct sets of
 * countries / categories present in the GI table.
 *
 * Called server-side at build time (or per-request in dev) so the numbers
 * always reflect the live database — when we add more producers / countries
 * the landing page automatically reflects that.
 */
export async function getIriskaStats(): Promise<IriskaStats> {
  const supabase = createSupabaseServerClient()

  // Total GI entries — single count(*) query, very fast.
  const { count: giCount, error: giError } = await supabase
    .from('gi_entries')
    .select('*', { count: 'exact', head: true })

  if (giError) {
    throw new Error(`Failed to fetch GI count: ${giError.message}`)
  }

  // Total producers
  const { count: producerCount, error: producerError } = await supabase
    .from('producers')
    .select('*', { count: 'exact', head: true })

  if (producerError) {
    throw new Error(`Failed to fetch producer count: ${producerError.message}`)
  }

  // Distinct countries — pull all country_codes and count unique on JS side.
  // Faster than a DISTINCT query for ~1K rows; for larger tables we'd use
  // a Postgres COUNT(DISTINCT) RPC function.
  const { data: countryRows, error: countryError } = await supabase
    .from('gi_entries')
    .select('country_code')

  if (countryError) {
    throw new Error(`Failed to fetch countries: ${countryError.message}`)
  }
  const countryCount = new Set(
    (countryRows ?? []).map((r) => r.country_code)
  ).size

  // Distinct categories — same pattern.
  const { data: categoryRows, error: categoryError } = await supabase
    .from('gi_entries')
    .select('category')

  if (categoryError) {
    throw new Error(`Failed to fetch categories: ${categoryError.message}`)
  }
  const categoryCount = new Set(
    (categoryRows ?? []).map((r) => r.category)
  ).size

  return {
    giCount: giCount ?? 0,
    producerCount: producerCount ?? 0,
    countryCount,
    categoryCount,
  }
}

/**
 * Fetch counts per category — used for the "Featured categories" section
 * on the landing page so each card shows a real number ("127 protected
 * products") instead of a hardcoded value.
 */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('gi_entries')
    .select('category')

  if (error) {
    throw new Error(`Failed to fetch category counts: ${error.message}`)
  }

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }
  return counts
}