import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RequestAccessButton } from '@/components/RequestAccessButton'
import { getIriskaStats } from '@/lib/queries/stats'

// Revalidate hourly to refresh live stats from BD
export const revalidate = 3600

export default async function SuppliersPage() {
  const [stats, t] = await Promise.all([
    getIriskaStats(),
    getTranslations('Suppliers'),
  ])

  return (
    <div className="min-h-screen bg-linen text-ink">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-content mx-auto px-6 py-26 md:px-10 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            {t('kicker')}
          </p>
          <h1 className="font-display mt-4 text-5xl italic leading-[1.05] tracking-[-0.025em] text-burgundy-deep md:text-7xl">
            {t('heroH1Line1')}<br />{t('heroH1Line2')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-graphite md:text-xl">
            {t('heroDescription')}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RequestAccessButton
              email="partners@iriska.ai"
              subject="Become an Iriska supplier"
              className="px-7 py-3"
            >
              {t('becomeSupplier')}
            </RequestAccessButton>
            <Link
              href="/catalog"
              className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
            >
              {t('seeCatalog')} →
            </Link>
          </div>
        </section>

        {/* Why Iriska — 4 reasons */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto px-6 py-16 md:px-10 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              {t('whyIriska.kicker')}
            </p>
            <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
              {t('whyIriska.title1')}<br />{t('whyIriska.title2')}
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
              <Reason
                number="01"
                title={t('whyIriska.reason1Title')}
                body={t('whyIriska.reason1Body')}
              />
              <Reason
                number="02"
                title={t('whyIriska.reason2Title')}
                body={t('whyIriska.reason2Body')}
              />
              <Reason
                number="03"
                title={t('whyIriska.reason3Title')}
                body={t('whyIriska.reason3Body')}
              />
              <Reason
                number="04"
                title={t('whyIriska.reason4Title')}
                body={t('whyIriska.reason4Body')}
              />
            </div>
          </div>
        </section>

        {/* How it works for suppliers */}
        <section className="max-w-content mx-auto px-6 py-16 md:px-10 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            {t('howOnboarding.kicker')}
          </p>
          <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
            {t('howOnboarding.title1')}<br />{t('howOnboarding.title2')}
          </h2>
          <ol className="mt-12 space-y-8">
            <OnboardStep
              number="01"
              title={t('howOnboarding.step1Title')}
              body={t('howOnboarding.step1Body')}
            />
            <OnboardStep
              number="02"
              title={t('howOnboarding.step2Title')}
              body={t('howOnboarding.step2Body')}
            />
            <OnboardStep
              number="03"
              title={t('howOnboarding.step3Title')}
              body={t('howOnboarding.step3Body')}
            />
            <OnboardStep
              number="04"
              title={t('howOnboarding.step4Title')}
              body={t('howOnboarding.step4Body')}
            />
          </ol>
        </section>

        {/* Stats reminder */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto px-6 py-16 md:px-10 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              {t('statsBlock.kicker')}
            </p>
            <p className="font-display mt-3 text-2xl italic leading-tight text-burgundy-deep md:text-4xl">
              {t('statsBlock.summary', {
                giCount: stats.giCount.toLocaleString(),
                producerCount: stats.producerCount.toLocaleString(),
                countryCount: stats.countryCount,
              })}
            </p>
            <p className="mt-4 max-w-2xl text-base text-graphite">
              {t('statsBlock.description')}
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-content mx-auto px-6 py-16 md:px-10 md:py-20">
          <div className="rounded-2xl border border-burgundy/30 bg-cream p-10 md:p-16">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              {t('closingCta.kicker')}
            </p>
            <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-4xl">
              {t('closingCta.title')}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.6] text-graphite">
              {t('closingCta.description')}
            </p>
            <div className="mt-8">
              <RequestAccessButton
                email="partners@iriska.ai"
                subject="Become an Iriska supplier"
                className="px-7 py-3"
              >
                {t('closingCta.contactCta')}
              </RequestAccessButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Reason({ number, title, body }: { number: string; title: string; body: string }) {
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

function OnboardStep({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <li className="grid gap-4 md:grid-cols-[100px_1fr] md:gap-8">
      <p className="font-mono text-3xl text-burgundy md:text-4xl">{number}</p>
      <div>
        <h3 className="font-display text-2xl italic text-burgundy-deep md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-base leading-[1.6] text-graphite">
          {body}
        </p>
      </div>
    </li>
  )
}