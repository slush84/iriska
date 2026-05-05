import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RequestAccessButton } from '@/components/RequestAccessButton'
import { getIriskaStats } from '@/lib/queries/stats'

export default async function SuppliersPage() {
  const stats = await getIriskaStats()

  return (
    <div className="min-h-screen bg-linen text-ink">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-content mx-auto px-6 py-20 md:px-10 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            For producers and distributors
          </p>
          <h1 className="font-display mt-4 text-5xl italic leading-[1.05] tracking-[-0.025em] text-burgundy-deep md:text-7xl">
            Your products,<br />in the right kitchens.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-graphite md:text-xl">
            Iriska is a platform built for European producers of protected and heritage products. Reach HoReCa buyers across borders without losing your margin to generic B2B marketplaces or unreliable resellers.
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
              href="/catalog"
              className="rounded-full border border-pebble/60 bg-cream px-7 py-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy transition-colors hover:border-burgundy/40"
            >
              See current catalog →
            </Link>
          </div>
        </section>

        {/* Why Iriska — 4 reasons */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto px-6 py-20 md:px-10 md:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              Why Iriska
            </p>
            <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
              Built for serious producers,<br />not for the lowest bidder.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
              <Reason
                number="01"
                title="Premium positioning, by default"
                body="We don't list industrial products. Iriska accepts only PDO, PGI, TSG, AOP, DOP, AOC, Suisse Garantie, heritage producers, and quality-certified products. Your work appears alongside peers, not commodity goods."
              />
              <Reason
                number="02"
                title="Cross-border reach, single platform"
                body="One supplier profile visible to chefs and procurement teams across Spain, Italy, France, Portugal, Netherlands, Belgium, and growing. Sell to a Madrid restaurant or an Amsterdam hotel through the same dashboard."
              />
              <Reason
                number="03"
                title="Transparent commission, no hidden fees"
                body="No listing fees. No platform subscription. No exclusivity. You pay commission only on orders accepted by you, and only after the buyer has paid. Clear, written terms from day one."
              />
              <Reason
                number="04"
                title="AI does the heavy lifting"
                body="Iriska's recommendation engine matches your products to relevant restaurants based on cuisine, menu, price tier, seasonality, and quality ratings. You don't compete on visibility — you appear when you fit."
              />
            </div>
          </div>
        </section>

        {/* How it works for suppliers */}
        <section className="max-w-content mx-auto px-6 py-20 md:px-10 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
            How onboarding works
          </p>
          <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-5xl">
            From conversation<br />to first order in weeks, not quarters.
          </h2>
          <ol className="mt-12 space-y-8">
            <OnboardStep
              number="01"
              title="Initial conversation"
              body="We talk about your products, certifications, current channels, capacity, and target markets. No commitment yet — we make sure Iriska is the right platform for you, and you're the right fit for the catalog."
            />
            <OnboardStep
              number="02"
              title="Profile and SKU listing"
              body="We help you create your supplier profile, import your product list (CSV or manual), and set pricing tiers. Your origin story, certifications, and producer credentials become the spine of how buyers find you."
            />
            <OnboardStep
              number="03"
              title="Quality review"
              body="Our team reviews your profile against Iriska standards. Where data is missing, we work with you to complete it. Once approved, your products go live in the catalog and become visible to buyers."
            />
            <OnboardStep
              number="04"
              title="First orders"
              body="Buyers discover, compare, and order through the platform. You receive structured order requests, confirm or decline, fulfil through your existing logistics, and get paid through Iriska's payment infrastructure."
            />
          </ol>
        </section>

        {/* Stats reminder */}
        <section className="border-y border-pebble/40 bg-cream">
          <div className="max-w-content mx-auto px-6 py-16 md:px-10 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              The catalog you're joining
            </p>
            <p className="font-display mt-3 text-2xl italic leading-tight text-burgundy-deep md:text-4xl">
              {stats.giCount.toLocaleString()} protected products. {stats.producerCount.toLocaleString()} verified producers.<br />
              {stats.countryCount} origin countries. Growing.
            </p>
            <p className="mt-4 max-w-2xl text-base text-graphite">
              Iriska's catalog already maps every protected designation across our starting territory. Your SKUs link directly to these references — buyers see your offering with full provenance context, not as anonymous line items.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-content mx-auto px-6 py-20 md:px-10 md:py-28">
          <div className="rounded-2xl border border-burgundy/30 bg-cream p-10 md:p-16">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy">
              Next step
            </p>
            <h2 className="font-display mt-3 text-3xl italic leading-tight tracking-[-0.02em] text-burgundy-deep md:text-4xl">
              Tell us about your products.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.6] text-graphite">
              Send us a brief introduction — what you make, where, your certifications, and the markets you currently serve. We'll respond within two business days.
            </p>
            <div className="mt-8">
              <RequestAccessButton
                email="partners@iriska.ai"
                subject="Become an Iriska supplier"
                className="px-7 py-3"
              >
                Contact partners@iriska.ai
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