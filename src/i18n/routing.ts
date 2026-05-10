import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Список поддерживаемых locales. Сейчас только en.
  // Когда выкатим Phase 5.0 — добавим 'es', 'de', 'nl', 'it', 'fr', 'pt'.
  locales: ['en'],

  // Default locale — английский.
  defaultLocale: 'en',

  // 'as-needed' = URL prefix добавляется только для non-default locales.
  // Default locale (en) тоже получит /en/ префикс для consistency.
  // Меняем на 'always' чтобы все locales имели префикс.
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]