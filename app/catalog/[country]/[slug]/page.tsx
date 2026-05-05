import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGiDetail } from '@/lib/queries/gi-entries'
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

const MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

const TIER_LABELS: Record<string, string> = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
}

interface PageProps {
  params: Promise<{ country: string; slug: string }>
}

export default async function GiDetailPage({ params }: PageProps) {
  const { country, slug } = await params
  const data = await getGiDetail(country, slug)

  if (!data) {
    notFound()
  }

  const { gi, producers, prices } = data

  return (
    <div className="min-h-screen bg-linen text-ink">
      <Header />
      <main className="max-w-content mx-auto flex w-full flex-col px-6 py-12 md:px-10 md:py-16">
        <Link
          href="/catalog"
          className="font-mono text-xs uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep"
        >
          ← Back to catalog
        </Link>

        <header className="mt-8 mb-10 border-b border-pebble/40 pb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl" aria-label={gi.country}>
              {COUNTRY_FLAGS[gi.country_code] ?? gi.country_code}
            </span>
            <span className="rounded-full border border-pebble/60 bg-bone px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
              {gi.gi_type_primary}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-stone">
              {CATEGORY_LABELS[gi.category] ?? gi.category}
            </span>
          </div>

          <h1 className="font-display text-4xl italic leading-[1.05] tracking-[-0.025em] text-burgundy-deep md:text-6xl">
            {gi.primary_gi_name}
          </h1>

          {gi.aliases.length > 0 && (
            <p className="mt-4 text-sm text-stone">
              Also known as: <span className="text-graphite">{gi.aliases.join(', ')}</span>
            </p>
          )}
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            {gi.tasting_notes && (
              <section>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">Tasting notes</p>
                <p className="text-base leading-[1.7] text-graphite">{gi.tasting_notes}</p>
              </section>
            )}

            {gi.horeca_use && (
              <section>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">HoReCa use</p>
                <p className="text-base leading-[1.7] text-graphite">{gi.horeca_use}</p>
              </section>
            )}

            {gi.packaging_formats.length > 0 && (
              <section>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">Packaging formats</p>
                <ul className="flex flex-wrap gap-2">
                  {gi.packaging_formats.map((format) => (
                    <li key={format} className="rounded-full border border-pebble/60 bg-cream px-3 py-1 text-xs text-graphite">
                      {format}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {gi.seasonal_months.length > 0 && (
              <section>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">Peak seasonality</p>
                <div className="flex gap-1.5" aria-label="Months indicator">
                  {MONTH_LABELS.map((label, i) => {
                    const month = i + 1
                    const isPeak = gi.seasonal_months.includes(month)
                    return (
                      <span
                        key={i}
                        className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs ${isPeak ? 'bg-burgundy text-cream' : 'border border-pebble/60 bg-cream text-stone'}`}
                      >
                        {label}
                      </span>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-10">
            {prices.length > 0 && (
              <section className="rounded-2xl border border-pebble/60 bg-cream p-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">B2B price corridor</p>
                <ul className="space-y-4">
                  {prices.map((p) => (
                    <li key={p.sku_id} className="border-b border-pebble/40 pb-3 last:border-0 last:pb-0">
                      <p className="font-display text-lg italic text-burgundy-deep">
                        €{p.eur_typical?.toFixed(2) ?? '–'} <span className="text-sm text-stone">/ {p.unit}</span>
                      </p>
                      <p className="mt-1 text-xs text-graphite">{p.format ?? 'Standard format'}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">{p.tier}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${p.confidence === 'HIGH' ? 'bg-olive/20 text-olive' : p.confidence === 'MEDIUM' ? 'bg-ochre-soft text-graphite' : 'bg-pebble/30 text-stone'}`}
                        >
                          {p.confidence}
                        </span>
                      </div>
                      {p.eur_low !== null && p.eur_high !== null && (
                        <p className="mt-1 text-[11px] text-stone">
                          Range: €{p.eur_low.toFixed(2)} – €{p.eur_high.toFixed(2)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-stone">EUR ex-VAT, ex-warehouse origin</p>
              </section>
            )}

            {producers.length > 0 && (
              <section>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-burgundy">Producers ({producers.length})</p>
                <ul className="space-y-3">
                  {producers.map((producer) => (
                    <li key={producer.producer_id} className="rounded-xl border border-pebble/60 bg-cream p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-base italic text-burgundy-deep">{producer.producer_name}</p>
                          {producer.region_town && <p className="mt-0.5 text-xs text-stone">{producer.region_town}</p>}
                        </div>
                        <span className="rounded-full border border-pebble/60 bg-bone px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-graphite">
                          {TIER_LABELS[producer.tier] ?? producer.tier}
                        </span>
                      </div>
                      {producer.website && (
                        <a
                          href={`https://${producer.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-burgundy hover:text-burgundy-deep"
                        >
                          {producer.website} ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {gi.is_data_thin && (
          <p className="mt-12 rounded-xl border border-ochre-soft bg-bone px-4 py-3 text-xs text-graphite">
            Note: this entry has limited descriptive data. Information will be expanded as suppliers join the platform.
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}