import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Matcher определяет какие пути обрабатываются middleware.
  // Исключаем API routes, static files, _next internals.
  matcher: [
    // Match all pathnames except for:
    // - /api routes
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - Static files (favicon, images, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}