'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'

const CATEGORIES = [
  { code: '', label: 'All categories' },
  { code: 'cured_meats_charcuterie', label: 'Charcuterie' },
  { code: 'cheeses_dairy', label: 'Cheese & Dairy' },
  { code: 'olive_oils_olives', label: 'Olive Oil' },
  { code: 'fruits_nuts', label: 'Fruits & Nuts' },
  { code: 'seafood_conservas', label: 'Seafood' },
  { code: 'vinegars_condiments', label: 'Vinegars' },
  { code: 'spices_salt_herbs', label: 'Spices & Herbs' },
  { code: 'preserves_pantry', label: 'Preserves' },
  { code: 'rice_pasta_grains', label: 'Rice, Pasta & Grains' },
  { code: 'honey_sweeteners', label: 'Honey' },
  { code: 'sweets_pastry_confectionery', label: 'Sweets & Pastry' },
] as const

export function CategoryFilter({ currentCategory }: { currentCategory: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSelect(code: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (code) {
      params.set('category', code)
    } else {
      params.delete('category')
    }
    params.delete('page')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.code
        return (
          <button
            key={cat.code || 'all'}
            type="button"
            onClick={() => handleSelect(cat.code)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`
              rounded-full border px-3.5 py-1.5 font-mono text-[11px]
              uppercase tracking-[0.1em] transition-colors disabled:opacity-50
              ${isActive
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-pebble/60 bg-bone text-graphite hover:border-burgundy/40'
              }
            `}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}