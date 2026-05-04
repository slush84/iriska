'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

const DEBOUNCE_MS = 500
const MIN_SEARCH_LENGTH = 2

export function SearchBox({ currentSearch }: { currentSearch: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [value, setValue] = useState(currentSearch)

  useEffect(() => {
    setValue(currentSearch)
  }, [currentSearch])

  useEffect(() => {
    const trimmed = value.trim()

    // No-op if already in sync with URL.
    if (trimmed === currentSearch) return

    // Allow empty (= clear search), but require >= MIN_SEARCH_LENGTH chars otherwise.
    if (trimmed.length > 0 && trimmed.length < MIN_SEARCH_LENGTH) return

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (trimmed) {
        params.set('search', trimmed)
      } else {
        params.delete('search')
      }
      params.delete('page')

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="relative w-full max-w-md">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search GI products..."
        aria-label="Search GI products by name"
        className="w-full rounded-full border border-pebble/60 bg-cream px-5 py-2.5 text-base text-ink placeholder:text-stone focus:border-burgundy focus:outline-none focus:ring-1 focus:ring-burgundy/20"
      />
      {isPending && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-stone">
          ...
        </span>
      )}
    </div>
  )
}