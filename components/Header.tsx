import { useTranslations } from 'next-intl'
import { Link } from '@/src/i18n/navigation'
import { Logo } from '@/components/Logo'
import { RequestAccessButton } from '@/components/RequestAccessButton'

export function Header() {
  const t = useTranslations('Header')

  return (
    <header className="border-b border-pebble/40 bg-linen">
      <div className="max-w-content mx-auto flex w-full items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label="Iriska — home" className="flex items-center">
          <Logo height={32} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link
            href="/catalog"
            className="font-mono text-xs uppercase tracking-[0.14em] text-graphite transition-colors hover:text-burgundy"
          >
            {t('catalog')}
          </Link>
          <Link
            href="/#how-it-works"
            className="font-mono text-xs uppercase tracking-[0.14em] text-graphite transition-colors hover:text-burgundy"
          >
            {t('howItWorks')}
          </Link>
          <Link
            href="/suppliers"
            className="font-mono text-xs uppercase tracking-[0.14em] text-graphite transition-colors hover:text-burgundy"
          >
            {t('forSuppliers')}
          </Link>
          <RequestAccessButton />
        </nav>

        <RequestAccessButton size="small" className="md:hidden" />
      </div>
    </header>
  )
}