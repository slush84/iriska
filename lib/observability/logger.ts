/**
 * Structured logger for Iriska.
 *
 * - Production: JSON logs (one event per line) consumable by log aggregators
 *   (Sentry, Vercel logs, future Grafana/ELK)
 * - Development: pretty-printed colored output for human reading
 *
 * Always include trace_id, actor_id, event_type fields for correlation.
 *
 * Usage:
 *   import { logger } from '@/lib/observability/logger'
 *   logger.info({ event_type: 'order_placed', actor_id: userId, order_id }, 'Order placed')
 *   logger.error({ event_type: 'payment_failed', actor_id, error: err.message }, 'Payment failed')
 */

import pino from 'pino'

const isDev = process.env.NODE_ENV === 'development'

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  ...(isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname',
            singleLine: false,
          },
        },
      }
    : {
        // Production: JSON to stdout. Vercel collects, Sentry can ingest.
        formatters: {
          level: (label) => ({ level: label }),
        },
      }),
  base: {
    app: 'iriska',
    env: process.env.NODE_ENV,
  },
})

/**
 * Convenience helper for creating child loggers with persistent context.
 *
 * Example:
 *   const log = childLogger({ trace_id: 'abc', actor_id: userId })
 *   log.info({ event_type: 'cart_updated', sku_id }, 'SKU added to cart')
 *   log.info({ event_type: 'cart_submitted' }, 'Cart submitted')
 *   // Both events automatically include trace_id and actor_id.
 */
export function childLogger(context: Record<string, unknown>) {
  return logger.child(context)
}