import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RequestAccessButton } from '@/components/RequestAccessButton'
import { getIriskaStats, getCategoryCounts } from '@/lib/queries/stats'

// Revalidate this page every hour — landing reflects live BD counts
// without requiring a redeploy when data changes.
export const revalidate = 3600

const FEATURED_CATEGORIES = [
  { slug: 'cured_meats_charcuterie', label: 'Charcuterie', kicker: 'Iberian, Italian, French' },
  { slug: 'cheeses_dairy', label: 'Cheese & Dairy', kicker: 'PDO cheeses, butter, dairy' },
  { slug: 'olive_oils_olives', label: 'Olive Oil', kicker: 'Single-estate, early harvest' },
  { slug: 'seafood_conservas', label: 'Seafood', kicker: 'Conservas, salt-cured, smoked' },
  { slug: 'spices_salt_herbs', label: 'Spices & Salt', kicker: 'Saffron, Mediterranean herbs' },
  { slug: 'rice_pasta_grains', label: 'Rice, Pasta & Grains', kicker: 'Heritage cereals, artisan pasta' },
] as const

export default async function HomePage() {
  const [stats, categoryCounts] = await Promise.all([
    getIriskaStats(),
    getCategoryCounts(),
  ])

  return (
    <div className="min-h-screen bg-linen text-ink">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-content mx-auto px-6 pt-16 pb-10 md:px-10 md:pt-20 md:pb-12">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                AI-powered HoReCa procurement
              </p>
              <h1 className="font-display mt-4 text-5xl italic leading-[1.05] tracking-[-0.025em] text-burgundy-deep md:text-6xl lg:text-7xl">
                Origin-driven sourcing<br />for serious kitchens.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-[1.55] text-graphite md:text-xl">
                Quality you can trace. Producers you can name. Protected and heritage products from European producers — accessible across borders, through one intelligent procurement platform.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RequestAccessButton className="px-7 py-3" />
                <Link
                  href="/catalog"
                  className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
                >
                  Browse Catalog →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-pebble/40 md:aspect-square">
              <img
                src="/images/hero.webp"
                alt="Mediterranean charcuterie and cheese on a wooden board"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Live data band */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:px-10">
            <Stat number={stats.giCount.toLocaleString()} label="protected products" />
            <Stat number={stats.producerCount.toLocaleString()} label="verified producers" />
            <Stat number={stats.countryCount} label="origin countries" />
            <Stat number={stats.categoryCount} label="product categories" />
          </div>
        </section>
        {/* How it works */}
        <section id="how-it-works" className="max-w-content mx-auto px-6 py-12 md:px-10 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            How it works
          </p>
          <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
            One platform. Three steps.<br />Less time chasing suppliers.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <Step
              number="01"
              title="Discover"
              body="AI-powered search across a vetted catalog of protected and heritage European products. Filter by quality tier, origin, seasonality, or commercial vocabulary."
            />
            <Step
              number="02"
              title="Compare"
              body="Transparent prices, multi-rating quality scores, producer profiles. See trust indicators, packaging formats, and lead times before you commit."
            />
            <Step
              number="03"
              title="Order"
              body="Multi-supplier checkout, single invoice, smart reorder predictions. Logistics handled. Disputes resolved. One platform across borders."
            />
          </div>
        </section>

        {/* Featured categories */}
        <section className="border-t border-pebble/40 bg-cream">
        <div className="max-w-content mx-auto px-6 py-12 md:px-10 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                  Featured categories
                </p>
                <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
                  Where we start.
                </h2>
              </div>
              <Link
                href="/catalog"
                className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep"
              >
                Browse all categories →
              </Link>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog?category=${cat.slug}`}
                    className="block h-full rounded-2xl border border-pebble/60 bg-linen p-6 transition-colors hover:border-burgundy/40"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
                      {cat.kicker}
                    </p>
                    <h3 className="font-display mt-2 text-2xl italic leading-snug text-burgundy-deep">
                      {cat.label}
                    </h3>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                      {categoryCounts[cat.slug]?.toLocaleString() ?? '—'} protected products
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* For Suppliers preview */}
        <section className="max-w-content mx-auto px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                For producers and distributors
              </p>
              <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
                Reach kitchens<br />that take quality seriously.
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.6] text-graphite">
                Iriska connects European producers of protected and heritage products with HoReCa buyers across the continent — without the noise of generic B2B marketplaces. One platform, multiple countries, transparent pricing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <RequestAccessButton
                  email="partners@iriska.ai"
                  subject="Become an Iriska supplier"
                  className="px-7 py-3"
                >
                  Become a supplier
                </RequestAccessButton>
                <Link
                  href="/suppliers"
                  className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
                >
                  Learn more →
                </Link>
              </div>
            </div>
            <ul className="space-y-4">
              <Benefit
                title="List your SKUs in minutes"
                body="CSV import, fast manual editing, structured product data aligned with European GI registries."
              />
              <Benefit
                title="Reach beyond your borders"
                body="One supplier profile visible to restaurants across Spain, Italy, France, Portugal, Netherlands and more."
              />
              <Benefit
                title="Transparent commission, no hidden fees"
                body="Pay only on accepted orders. No listing fees, no platform subscription. Clear terms from day one."
              />
              <Benefit
                title="Trust, traceability, premium positioning"
                body="Your origin story, certifications and quality standards get the visibility they deserve."
              />
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Stat({ number, label }: { number: string | number; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl italic text-burgundy-deep md:text-5xl">
        {number}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
        {label}
      </p>
    </div>
  )
}
function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="border-l border-burgundy/30 pl-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
        {number}
      </p>
      <h3 className="font-display mt-2 text-2xl italic text-burgundy-deep md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 text-base leading-[1.6] text-graphite">
        {body}
      </p>
    </div>
  )
}
function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-xl border border-pebble/60 bg-cream p-5">
      <p className="font-display text-lg italic text-burgundy-deep">
        {title}
      </p>
      <p className="mt-2 text-sm leading-[1.55] text-graphite">
        {body}
      </p>
    </li>
  )
}