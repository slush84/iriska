/**
 * Type definitions for AI client.
 *
 * Provider-agnostic where possible — even though current implementation uses
 * Anthropic SDK, types should not leak Anthropic-specific shapes into app code.
 * If we add a second provider later, types stay stable.
 */

import type { ModelId } from './models'

/**
 * A single message in a conversation.
 */
export interface AiMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Input to a Claude completion call.
 */
export interface CompleteParams {
  /** Model ID (use Model.CHEAPEST / DEFAULT / BEST aliases) */
  model: ModelId

  /** System prompt — instructions for the model's behavior */
  system?: string

  /** Conversation history (most recent last) */
  messages: AiMessage[]

  /** Maximum tokens to generate (default 1024) */
  maxTokens?: number

  /** Temperature 0..1 (default 1, lower = more deterministic) */
  temperature?: number

  /**
   * Optional metadata for tracing/logging. Will be included in
   * 'ai_call.completed' events for cost analysis and debugging.
   */
  metadata?: {
    actorId?: string
    actorType?: string
    traceId?: string
    /** Use case label, e.g. 'matching', 'verification', 'support' */
    useCase?: string
  }
}

/**
 * Output of a Claude completion call.
 */
export interface CompleteResult {
  /** Generated text response */
  text: string

  /** Token usage for cost tracking */
  usage: {
    inputTokens: number
    outputTokens: number
  }

  /** Model that actually responded (may differ if fallback used) */
  model: string

  /** Stop reason from Anthropic API */
  stopReason: string | null
}

/**
 * Error result — returned instead of throwing when AI call fails.
 *
 * AI failures should never break user-facing flows. Caller decides how to
 * handle (fall back to pre-written response, retry, surface error to user).
 */
export interface AiError {
  type: 'rate_limit' | 'timeout' | 'invalid_request' | 'server_error' | 'unknown'
  message: string
  retryable: boolean
}

export type CompleteResponse =
  | { ok: true; data: CompleteResult }
  | { ok: false; error: AiError }