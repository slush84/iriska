/**
 * Vercel Flags Toolkit — feature flags for Iriska.
 *
 * Each flag is a separate function exported here. Flags can be:
 *   - env-driven (process.env.FLAG_X === 'true')
 *   - user-tier-driven (premium / free)
 *   - percentage rollout (e.g. 10% of users)
 *   - date-gated (e.g. enable after 2026-06-01)
 *
 * Pattern:
 *   import { aiMatchingEnabled } from '@/lib/flags'
 *   if (await aiMatchingEnabled()) {
 *     // new code path
 *   } else {
 *     // legacy code path
 *   }
 *
 * Override flags in dev via `?flag-overrides=` URL params or
 * Vercel Flags Toolkit Chrome extension. Production: Vercel dashboard.
 *
 * IMPORTANT: Default to OFF for new features. Roll out gradually.
 */

import { flag } from 'flags/next'

/**
 * AI matching engine — 5-filter cascade for product recommendations.
 *
 * Phase 6 feature. While building, we keep it dark. When ready,
 * enable for internal team first, then 1% buyers, then 100%.
 */
export const aiMatchingEnabled = flag<boolean>({
  key: 'ai_matching_enabled',
  description: 'AI-powered product matching engine (5-filter cascade)',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_AI_MATCHING === 'true'
  },
})

/**
 * Deferred payment scheme — supplier-financed delayed B2B payments.
 *
 * Phase 4.5b feature. Only available to verified suppliers with rating >= 4.
 * Hidden behind flag during initial rollout to specific pilot suppliers.
 */
export const deferredPaymentEnabled = flag<boolean>({
  key: 'deferred_payment_enabled',
  description: 'Supplier-financed deferred payment scheme (Phase 4.5b)',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_DEFERRED_PAYMENT === 'true'
  },
})

/**
 * Sentry tunneling — route Sentry traffic through Next.js to avoid ad-blockers.
 *
 * Default OFF to save Vercel bandwidth on Hobby tier. Enable if we see
 * gap between Vercel error logs and Sentry events (ad-blocker likely).
 */
export const sentryTunnelingEnabled = flag<boolean>({
  key: 'sentry_tunneling_enabled',
  description: 'Route Sentry traffic through Next.js server (avoid ad-blockers)',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_SENTRY_TUNNELING === 'true'
  },
})

/**
 * Multi-supplier checkout — single basket with split fulfilment from many suppliers.
 *
 * Phase 4.x core feature. While building, restricted to internal test users.
 */
export const multiSupplierCheckoutEnabled = flag<boolean>({
  key: 'multi_supplier_checkout_enabled',
  description: 'Multi-supplier basket with split shipments per location',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_MULTI_SUPPLIER_CHECKOUT === 'true'
  },
})

/**
 * B2C consumer experience — separate UX track from B2B HoReCa.
 *
 * Architecturally enabled from Y1 (per AGENTS.md), but UI/UX surface
 * gates behind flag during Spain market launch.
 */
export const b2cExperienceEnabled = flag<boolean>({
  key: 'b2c_experience_enabled',
  description: 'B2C consumer-facing UX with 15% take rate pricing',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_B2C_EXPERIENCE === 'true'
  },
})

/**
 * AI verification autonomy — auto-approve low-risk suppliers without human review.
 *
 * Phase 3.3 feature. Per AGENTS.md AI-First principles: cost-of-error LOW
 * actions can be automated. Verification is MEDIUM cost-of-error initially,
 * we keep human review until accuracy is proven, then flip flag.
 */
export const aiAutoVerificationEnabled = flag<boolean>({
  key: 'ai_auto_verification_enabled',
  description: 'Auto-approve low-risk suppliers via AI verification (no human review)',
  defaultValue: false,
  decide: async () => {
    return process.env.FLAG_AI_AUTO_VERIFICATION === 'true'
  },
})