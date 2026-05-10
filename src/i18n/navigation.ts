import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Создаём locale-aware navigation utilities.
// Эти helpers автоматически добавляют locale-префикс к URL.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)