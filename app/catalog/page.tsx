import Link from 'next/link'
import { getGiEntriesPage } from '@/lib/queries/gi-entries'
import { slugify } from '@/lib/utils/slug'
import { CountryFilter } from '@/app/catalog/_components/CountryFilter'
import { CategoryFilter } from '@/app/catalog/_components/CategoryFilter'
import { SearchBox } from '@/app/catalog/_components/SearchBox'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const COUNTRY_FLAGS: Record<string, string> = {
  IT: '🇮🇹',
  ES: '🇪🇸',
  FR: '🇫🇷',
  PT: '🇵🇹',
  GR: '🇬🇷',
}

const CATEGORY_LABELS: Record<string, string> = {
  cured_meats_charcuterie: 'Charcuterie',
  cheeses_dairy: 'Cheese & Dairy',
  olive_oils_olives: 'Olive Oil',
  fruits_nuts: 'Fruits & Nuts',
  seafood_conservas: 'Seafood',
  vinegars_condiments: 'Vinegars & Condiments',
  spices_salt_herbs: 'Spices, Salt & Herbs',
  preserves_pantry: 'Preserves',
  rice_pasta_grains: 'Rice, Pasta & Grains',
  honey_sweeteners: 'Honey',
  sweets_pastry_confectionery: 'Sweets & Pastry',
}

interface CatalogPageProps {
  searchParams: Promise<{
    page?: string
    country?: string
    category?: string
    search?: string
  }>
}

type SearchParamsRecord = Awaited<CatalogPageProps['searchParams']>

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams

  const page = parseInt(params.page ?? '1', 10) || 1
  const countryCode = params.country ?? ''
  const category = params.category ?? ''
  const search = params.search ?? ''

  const { entries, totalCount, totalPages, currentPage } = await getGiEntriesPage({
    page,
    countryCode,
    category,
    search,
  })

  const hasActiveFilters = Boolean(countryCode || category || search)

  return (
    <div className="min-h-screen bg-linen text-ink">
      <Header />

      <main className="max-w-content mx-auto flex w-full flex-col px-6 py-12 md:px-10 md:py-16">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">Catalog</p>
          <h1 className="font-display mt-2 text-4xl italic leading-tight tracking-[-0.025em] text-burgundy-deep md:text-5xl">
            Mediterranean Geographical Indications
          </h1>
          <p className="mt-3 text-base text-graphite">
            Browse {totalCount.toLocaleString()} protected products from Italy, Spain, France, Portugal & Greece.
          </p>
        </header>

        <section aria-label="Filters" className="mb-8 flex flex-col gap-5 border-y border-pebble/40 py-6">
          <SearchBox currentSearch={search} />
          <CountryFilter currentCountry={countryCode} />
          <CategoryFilter currentCategory={category} />
        </section>

        <div className="mb-6 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite">
            {totalCount.toLocaleString()} {totalCount === 1 ? 'result' : 'results'}
          </p>
          {hasActiveFilters && (
            <Link
              href="/catalog"
              className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep"
            >
              Clear filters ✕
            </Link>
          )}
        </div>

        {entries.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => {
              const slug = slugify(entry.primary_gi_name)
              return (
                <li key={entry.gi_id}>
                  <Link
                    href={`/catalog/${entry.country_code}/${slug}`}
                    className="block h-full rounded-2xl border border-pebble/60 bg-cream p-5 transition-colors hover:border-burgundy/40"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl" aria-label={entry.country}>
                        {COUNTRY_FLAGS[entry.country_code] ?? entry.country_code}
                      </span>
                      <span className="rounded-full border border-pebble/60 bg-bone px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                        {entry.gi_type_primary}
                      </span>
                    </div>
                    <h2 className="font-display text-lg italic leading-snug text-burgundy-deep">
                      {entry.primary_gi_name}
                    </h2>
                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-stone">
                      {CATEGORY_LABELS[entry.category] ?? entry.category}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <EmptyState />
        )}

        {entries.length > 0 && totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-between border-t border-pebble/40 pt-6">
            <PaginationLink params={params} targetPage={currentPage - 1} disabled={currentPage <= 1} label="← Previous" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite">
              Page {currentPage} of {totalPages}
            </p>
            <PaginationLink params={params} targetPage={currentPage + 1} disabled={currentPage >= totalPages} label="Next →" />
          </nav>
        )}
      </main>

      <Footer />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-pebble/60 bg-cream px-8 py-16 text-center">
      <p className="font-display text-2xl italic text-burgundy-deep">No products match your filters.</p>
      <p className="mt-3 text-base text-graphite">
        Try removing one or more filters, or{' '}
        <Link href="/catalog" className="text-burgundy underline hover:text-burgundy-deep">
          clear all
        </Link>
        {' '}to start over.
      </p>
    </div>
  )
}

function PaginationLink({
  params,
  targetPage,
  disabled,
  label,
}: {
  params: SearchParamsRecord
  targetPage: number
  disabled: boolean
  label: string
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-full border border-pebble/60 px-5 py-2 text-sm font-semibold text-stone">
        {label}
      </span>
    )
  }

  const queryParams = new URLSearchParams()
  if (params.country) queryParams.set('country', params.country)
  if (params.category) queryParams.set('category', params.category)
  if (params.search) queryParams.set('search', params.search)
  queryParams.set('page', String(targetPage))

  return (
    <Link
      href={`/catalog?${queryParams.toString()}`}
      className="rounded-full border border-pebble/60 px-5 py-2 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy/40"
    >
      {label}
    </Link>
  )
}