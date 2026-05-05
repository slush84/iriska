import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function Header() {
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
            Catalog
          </Link>
          <Link
            href="/#how-it-works"
            className="font-mono text-xs uppercase tracking-[0.14em] text-graphite transition-colors hover:text-burgundy"
          >
            How it works
          </Link>
          <Link
            href="/suppliers"
            className="font-mono text-xs uppercase tracking-[0.14em] text-graphite transition-colors hover:text-burgundy"
          >
            For Suppliers
          </Link>
          <a
            href="mailto:hello@iriska.ai?subject=Iriska%20Access%20Request"
            className="rounded-full bg-burgundy px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-burgundy-deep"
          >
            Request Access
          </a>
        </nav>

        <a
          href="mailto:hello@iriska.ai?subject=Iriska%20Access%20Request"
          className="rounded-full bg-burgundy px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream md:hidden"
        >
          Request Access
        </a>
      </div>
    </header>
  )
}