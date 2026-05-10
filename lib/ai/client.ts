/**
 * AI client for Iriska.
 *
 * Wraps Anthropic SDK with:
 *  - Retry on transient errors (rate limit, timeout, 5xx)
 *  - Pino structured logging of every call
 *  - Event emission to events_log for cost tracking & analytics
 *  - Type-safe Result return (never throws on API failures)
 *
 * Usage:
 *   import { aiClient } from '@/lib/ai'
 *   import { Model } from '@/lib/ai'
 *
 *   const result = await aiClient.complete({
 *     model: Model.DEFAULT,
 *     system: 'You are a HoReCa procurement assistant.',
 *     messages: [{ role: 'user', content: 'Suggest pairings for cabrales.' }],
 *     metadata: { useCase: 'support', actorId: userId },
 *   })
 *
 *   if (result.ok) {
 *     console.log(result.data.text)
 *   } else {
 *     // Handle error gracefully — never blocks user
 *     console.warn('AI unavailable:', result.error.message)
 *   }
 */

import Anthropic from '@anthropic-ai/sdk'
import { logger } from '@/lib/observability'
import { emitEvent, EventType } from '@/lib/events'
import type { CompleteParams, CompleteResponse, AiError } from './types'

// Lazy singleton
let _anthropic: Anthropic | null = null

function getClient(): Anthropic {
  if (_anthropic) return _anthropic

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY env var is required')
  }

  _anthropic = new Anthropic({ apiKey })
  return _anthropic
}

/**
 * Maximum retry attempts on transient errors.
 * Total wait time with exponential backoff: ~1+2+4 = 7 seconds.
 */
const MAX_RETRIES = 3

/**
 * Classify an error from Anthropic SDK.
 */
function classifyError(err: unknown): AiError {
  if (err instanceof Anthropic.APIError) {
    if (err.status === 429) {
      return {
        type: 'rate_limit',
        message: err.message,
        retryable: true,
      }
    }
    if (err.status && err.status >= 500) {
      return {
        type: 'server_error',
        message: err.message,
        retryable: true,
      }
    }
    if (err.status && err.status >= 400 && err.status < 500) {
      return {
        type: 'invalid_request',
        message: err.message,
        retryable: false,
      }
    }
  }

  if (err instanceof Anthropic.APIConnectionTimeoutError) {
    return {
      type: 'timeout',
      message: 'Anthropic API timeout',
      retryable: true,
    }
  }

  return {
    type: 'unknown',
    message: err instanceof Error ? err.message : String(err),
    retryable: false,
  }
}

/**
 * Sleep helper for exponential backoff.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Send a completion request to Claude with retries and observability.
 */
async function complete(params: CompleteParams): Promise<CompleteResponse> {
  const startedAt = Date.now()
  const log = logger.child({
    component: 'ai_client',
    model: params.model,
    use_case: params.metadata?.useCase,
    actor_id: params.metadata?.actorId,
    trace_id: params.metadata?.traceId,
  })

  log.info({ message_count: params.messages.length }, 'ai_call.started')

  let lastError: AiError | null = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const anthropic = getClient()

      const response = await anthropic.messages.create({
        model: params.model,
        max_tokens: params.maxTokens ?? 1024,
        temperature: params.temperature,
        system: params.system,
        messages: params.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      })

      // Extract text from response (Anthropic returns content blocks)
      const text = response.content
        .filter((block) => block.type === 'text')
        .map((block) => (block as { type: 'text'; text: string }).text)
        .join('\n')

      const durationMs = Date.now() - startedAt

      log.info(
        {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
          duration_ms: durationMs,
          stop_reason: response.stop_reason,
          attempt,
        },
        'ai_call.completed',
      )

      // Emit event for cost tracking, async, fire and forget
      void emitEvent(
        EventType.AI_CALL_COMPLETED,
        {
          model: params.model,
          use_case: params.metadata?.useCase,
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
          duration_ms: durationMs,
          stop_reason: response.stop_reason,
        },
        {
          actorType: params.metadata?.actorType ?? 'system',
          actorId: params.metadata?.actorId,
          traceId: params.metadata?.traceId,
        },
      )

      return {
        ok: true,
        data: {
          text,
          usage: {
            inputTokens: response.usage.input_tokens,
            outputTokens: response.usage.output_tokens,
          },
          model: response.model,
          stopReason: response.stop_reason,
        },
      }
    } catch (err) {
      const aiError = classifyError(err)
      lastError = aiError

      log.warn(
        {
          attempt,
          error_type: aiError.type,
          error_message: aiError.message,
          retryable: aiError.retryable,
        },
        'ai_call.attempt_failed',
      )

      if (!aiError.retryable || attempt === MAX_RETRIES) {
        break
      }

      // Exponential backoff: 1s, 2s, 4s
      await sleep(1000 * Math.pow(2, attempt - 1))
    }
  }

  // All attempts failed
  const durationMs = Date.now() - startedAt
  log.error(
    {
      duration_ms: durationMs,
      error_type: lastError?.type,
      error_message: lastError?.message,
    },
    'ai_call.failed',
  )

  void emitEvent(
    EventType.AI_CALL_FAILED,
    {
      model: params.model,
      use_case: params.metadata?.useCase,
      duration_ms: durationMs,
      error_type: lastError?.type,
      error_message: lastError?.message,
    },
    {
      actorType: params.metadata?.actorType ?? 'system',
      actorId: params.metadata?.actorId,
      traceId: params.metadata?.traceId,
    },
  )

  return {
    ok: false,
    error: lastError ?? {
      type: 'unknown',
      message: 'No error captured',
      retryable: false,
    },
  }
}

/**
 * Public AI client interface.
 *
 * Add new methods here as we need them (e.g., vision, streaming, embeddings).
 */
export const aiClient = {
  complete,
}