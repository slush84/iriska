'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'

const COUNTRIES = [
  { code: '', label: 'All' },
  { code: 'IT', flag: '🇮🇹', label: 'Italy' },
  { code: 'ES', flag: '🇪🇸', label: 'Spain' },
  { code: 'FR', flag: '🇫🇷', label: 'France' },
  { code: 'PT', flag: '🇵🇹', label: 'Portugal' },
  { code: 'GR', flag: '🇬🇷', label: 'Greece' },
] as const

export function CountryFilter({ currentCountry }: { currentCountry: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSelect(code: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (code) {
      params.set('country', code)
    } else {
      params.delete('country')
    }
    // Resetting to page 1 when filter changes — otherwise user could be on
    // page 5 of all countries and suddenly only 2 pages of Italian results exist.
    params.delete('page')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by country">
      {COUNTRIES.map((country) => {
        const isActive = currentCountry === country.code
        return (
          <button
            key={country.code || 'all'}
            type="button"
            onClick={() => handleSelect(country.code)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`
              inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm
              font-medium transition-colors disabled:opacity-50
              ${isActive
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-pebble/60 bg-cream text-graphite hover:border-burgundy/40'
              }
            `}
          >
            {'flag' in country && <span>{country.flag}</span>}
            <span>{country.label}</span>
          </button>
        )
      })}
    </div>
  )
}