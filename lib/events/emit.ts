/**
 * Event emission helper.
 *
 * Insert a structured event into the events_log table. Subscribers consume
 * via Postgres LISTEN/NOTIFY or polling.
 *
 * Usage:
 *   await emitEvent('supplier.signed_up', { supplier_id: 'abc' }, {
 *     actorType: 'user',
 *     actorId: userId,
 *     traceId: requestId,
 *   })
 *
 * Naming convention: 'domain.action' lowercase
 *   supplier.signed_up
 *   supplier.verified
 *   product.created
 *   product.price_updated
 *   order.placed
 *   order.fulfilled
 *   payment.received
 *   ai_call.completed
 *
 * Failure mode: if the DB write fails, we log the error but DO NOT throw.
 * Event emission must never break the main user-facing flow. Lost events
 * are recoverable via observability (logs + Sentry).
 */

import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/observability'

interface EmitOptions {
  /** Who triggered the event: 'user' | 'system' | 'webhook' | 'cron' | 'agent' */
  actorType?: string
  /** User ID, system process name, webhook source, etc. */
  actorId?: string
  /** Trace ID to correlate events across requests */
  traceId?: string
  /** Parent event ID — for events triggered by other events */
  parentEventId?: number
}

interface EmitResult {
  success: boolean
  eventId?: number
  error?: string
}

/**
 * Lazy-initialized Supabase admin client (service_role key).
 * events_log is service-only — RLS denies all public access.
 */
let _supabaseAdmin: ReturnType<typeof createClient> | null = null

function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'emitEvent requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars',
    )
  }

  _supabaseAdmin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return _supabaseAdmin
}

/**
 * Emit a structured event to events_log.
 *
 * @param eventType - 'domain.action' lowercase, e.g. 'supplier.signed_up'
 * @param payload - JSON-serializable event data
 * @param options - actorType, actorId, traceId, parentEventId
 * @returns EmitResult with success flag and event ID
 */
export async function emitEvent(
  eventType: string,
  payload: Record<string, unknown> = {},
  options: EmitOptions = {},
): Promise<EmitResult> {
  const { actorType, actorId, traceId, parentEventId } = options

  // Always log first — durable record even if DB write fails
  logger.info(
    {
      event_type: eventType,
      actor_type: actorType,
      actor_id: actorId,
      trace_id: traceId,
      parent_event_id: parentEventId,
      payload,
    },
    `event:${eventType}`,
  )

  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
    .from('events_log')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert({
      event_type: eventType,
      payload,
      actor_type: actorType ?? null,
      actor_id: actorId ?? null,
      trace_id: traceId ?? null,
      parent_event_id: parentEventId ?? null,
    } as never)
    .select('id')
    .single<{ id: number }>()

    if (error) {
      logger.error(
        {
          event_type: eventType,
          error: error.message,
          code: error.code,
        },
        'emitEvent: DB insert failed',
      )
      return { success: false, error: error.message }
    }

    return { success: true, eventId: data?.id }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    logger.error(
      { event_type: eventType, error: errorMessage },
      'emitEvent: unexpected error',
    )
    return { success: false, error: errorMessage }
  }
}

/**
 * Standardized event types — use these constants instead of string literals
 * to prevent typos and enable IDE autocomplete.
 *
 * Add new event types here as the platform grows. Format: 'domain.action'.
 */
export const EventType = {
  // Supplier lifecycle
  SUPPLIER_SIGNED_UP: 'supplier.signed_up',
  SUPPLIER_VERIFIED: 'supplier.verified',
  SUPPLIER_REJECTED: 'supplier.rejected',
  SUPPLIER_PROFILE_UPDATED: 'supplier.profile_updated',

  // Product lifecycle
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_PRICE_UPDATED: 'product.price_updated',
  PRODUCT_INVENTORY_UPDATED: 'product.inventory_updated',
  PRODUCT_PUBLISHED: 'product.published',

  // Order lifecycle
  ORDER_PLACED: 'order.placed',
  ORDER_CONFIRMED: 'order.confirmed',
  ORDER_REJECTED: 'order.rejected',
  ORDER_FULFILLED: 'order.fulfilled',
  ORDER_CANCELLED: 'order.cancelled',

  // Payment lifecycle
  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_RECEIVED: 'payment.received',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',

  // AI / automation
  AI_CALL_COMPLETED: 'ai_call.completed',
  AI_CALL_FAILED: 'ai_call.failed',
  VERIFICATION_COMPLETED: 'verification.completed',
  VERIFICATION_FAILED: 'verification.failed',
} as const

export type EventTypeValue = (typeof EventType)[keyof typeof EventType]