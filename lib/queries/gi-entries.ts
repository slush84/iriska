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

/**
 * Fetch a page of GI entries for the public catalog.
 *
 * Sorted alphabetically by name. Uses Supabase range pagination
 * (page 1 = rows 0-23, page 2 = rows 24-47, etc.)
 *
 * Returns total count along with the page so UI can render pagination.
 */
export async function getGiEntriesPage(page: number = 1): Promise<{
  entries: GiCatalogEntry[]
  totalCount: number
  totalPages: number
  currentPage: number
}> {
  const supabase = createSupabaseServerClient()

  const safePage = Math.max(1, page)
  const from = (safePage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from('gi_entries')
    .select(
      'gi_id, primary_gi_name, country_code, country, category, gi_type_primary',
      { count: 'exact' }
    )
    .order('primary_gi_name', { ascending: true })
    .range(from, to)

  if (error) {
    throw new Error(`Failed to fetch GI entries: ${error.message}`)
  }

  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return {
    entries: data ?? [],
    totalCount,
    totalPages,
    currentPage: safePage,
  }
}