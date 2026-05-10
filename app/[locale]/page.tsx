import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RequestAccessButton } from '@/components/RequestAccessButton'
import { getIriskaStats, getCategoryCounts } from '@/lib/queries/stats'

// Revalidate this page every hour — landing reflects live BD counts
// without requiring a redeploy when data changes.
export const revalidate = 3600

const FEATURED_CATEGORIES = [
  { slug: 'cured_meats_charcuterie', kickerKey: 'charcuterieKicker', labelKey: 'charcuterieLabel' },
  { slug: 'cheeses_dairy', kickerKey: 'cheeseKicker', labelKey: 'cheeseLabel' },
  { slug: 'olive_oils_olives', kickerKey: 'oliveOilKicker', labelKey: 'oliveOilLabel' },
  { slug: 'seafood_conservas', kickerKey: 'seafoodKicker', labelKey: 'seafoodLabel' },
  { slug: 'spices_salt_herbs', kickerKey: 'spicesKicker', labelKey: 'spicesLabel' },
  { slug: 'rice_pasta_grains', kickerKey: 'grainsKicker', labelKey: 'grainsLabel' },
] as const

export default async function HomePage() {
  const [stats, categoryCounts, t] = await Promise.all([
    getIriskaStats(),
    getCategoryCounts(),
    getTranslations('Landing'),
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
                {t('kicker')}
              </p>
              <h1 className="font-display mt-4 text-5xl italic leading-[1.05] tracking-[-0.025em] text-burgundy-deep md:text-6xl lg:text-7xl">
                {t('heroH1Line1')}<br />{t('heroH1Line2')}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-[1.55] text-graphite md:text-xl">
                {t('heroDescription')}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RequestAccessButton className="px-7 py-3" />
                <Link
                  href="/catalog"
                  className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
                >
                  {t('browseCatalog')} →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-pebble/40 md:aspect-square">
              <img
                src="/images/hero.webp"
                alt={t('imageAlt')}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Live data band */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:px-10">
            <Stat number={stats.giCount.toLocaleString()} label={t('stats.protectedProducts')} />
            <Stat number={stats.producerCount.toLocaleString()} label={t('stats.verifiedProducers')} />
            <Stat number={stats.countryCount} label={t('stats.originCountries')} />
            <Stat number={stats.categoryCount} label={t('stats.productCategories')} />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="max-w-content mx-auto px-6 py-12 md:px-10 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            {t('howItWorks.kicker')}
          </p>
          <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
            {t('howItWorks.title1')}<br />{t('howItWorks.title2')}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            <Step
              number="01"
              title={t('howItWorks.step1Title')}
              body={t('howItWorks.step1Body')}
            />
            <Step
              number="02"
              title={t('howItWorks.step2Title')}
              body={t('howItWorks.step2Body')}
            />
            <Step
              number="03"
              title={t('howItWorks.step3Title')}
              body={t('howItWorks.step3Body')}
            />
          </div>
        </section>

        {/* Featured categories */}
        <section className="border-t border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto px-6 py-12 md:px-10 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                  {t('categories.kicker')}
                </p>
                <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
                  {t('categories.title')}
                </h2>
              </div>
              <Link
                href="/catalog"
                className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep"
              >
                {t('categories.browseAll')} →
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
                      {t(`categories.${cat.kickerKey}`)}
                    </p>
                    <h3 className="font-display mt-2 text-2xl italic leading-snug text-burgundy-deep">
                      {t(`categories.${cat.labelKey}`)}
                    </h3>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
                      {categoryCounts[cat.slug]?.toLocaleString() ?? '—'} {t('categories.protectedProducts')}
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
                {t('suppliersPreview.kicker')}
              </p>
              <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
                {t('suppliersPreview.title1')}<br />{t('suppliersPreview.title2')}
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.6] text-graphite">
                {t('suppliersPreview.description')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <RequestAccessButton
                  email="partners@iriska.ai"
                  subject="Become an Iriska supplier"
                  className="px-7 py-3"
                >
                  {t('suppliersPreview.becomeSupplier')}
                </RequestAccessButton>
                <Link
                  href="/suppliers"
                  className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
                >
                  {t('suppliersPreview.learnMore')} →
                </Link>
              </div>
            </div>
            <ul className="space-y-4">
              <Benefit
                title={t('suppliersPreview.benefit1Title')}
                body={t('suppliersPreview.benefit1Body')}
              />
              <Benefit
                title={t('suppliersPreview.benefit2Title')}
                body={t('suppliersPreview.benefit2Body')}
              />
              <Benefit
                title={t('suppliersPreview.benefit3Title')}
                body={t('suppliersPreview.benefit3Body')}
              />
              <Benefit
                title={t('suppliersPreview.benefit4Title')}
                body={t('suppliersPreview.benefit4Body')}
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