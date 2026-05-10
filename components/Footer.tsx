import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'

/**
 * Site-wide footer. Brand restatement, navigation, contact, legal stub.
 *
 * The four-column layout collapses to single column on mobile.
 */
export function Footer() {
  const t = useTranslations('Footer')
  const year = new Date().getFullYear()

  return (
    <footer className="mt-6 border-t border-pebble/40 bg-cream">
      <div className="max-w-content mx-auto px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl italic leading-tight tracking-[-0.02em] text-burgundy-deep">
              {t('tagline')}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite">
              {t('description')}
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-burgundy">
              {t('iriskaSection')}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/catalog"
                  className="text-graphite transition-colors hover:text-burgundy"
                >
                  {t('catalogLink')}
                </Link>
              </li>
              <li>
                <Link
                  href="/suppliers"
                  className="text-graphite transition-colors hover:text-burgundy"
                >
                  {t('forSuppliersLink')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-graphite transition-colors hover:text-burgundy"
                >
                  {t('howItWorksLink')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-burgundy">
              {t('contactSection')}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@iriska.ai"
                  className="text-graphite transition-colors hover:text-burgundy"
                >
                  hello@iriska.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:partners@iriska.ai"
                  className="text-graphite transition-colors hover:text-burgundy"
                >
                  partners@iriska.ai
                </a>
              </li>
              <li className="pt-1 text-stone">{t('locations')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-pebble/40 pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>© {year} {t('copyright')}</p>
          <p className="font-mono uppercase tracking-[0.14em]">
            {t('brandLine')}
          </p>
        </div>
      </div>
    </footer>
  )
}