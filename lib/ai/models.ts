/**
 * Anthropic model identifiers.
 *
 * Use these constants instead of string literals to prevent typos and enable
 * IDE autocomplete. When models are deprecated or replaced, update here once.
 *
 * Model selection guide for Iriska:
 *
 * HAIKU (cheapest, fastest):
 *   - Customer support chatbot
 *   - Simple classification (category detection, language detection)
 *   - Routing decisions (which agent handles which query)
 *   - Bulk processing (catalog enrichment, descriptions translation)
 *   ~$0.80 / $4 per 1M tokens (input/output)
 *
 * SONNET (balanced, default):
 *   - AI matching engine (5-filter cascade)
 *   - Document Vision (certificates, registry extracts)
 *   - Knowledge base RAG queries
 *   - Email/message generation
 *   ~$3 / $15 per 1M tokens
 *
 * OPUS (most capable, expensive):
 *   - Complex multi-step reasoning
 *   - High-stakes verification edge cases (when Sonnet flagged uncertain)
 *   - Strategic analysis where quality > cost
 *   ~$15 / $75 per 1M tokens
 *
 * As of May 2026 latest stable models.
 */

export const Model = {
    // Latest stable models
    HAIKU_4_5: 'claude-haiku-4-5-20251001',
    SONNET_4_6: 'claude-sonnet-4-6',
    OPUS_4_6: 'claude-opus-4-6',
    OPUS_4_7: 'claude-opus-4-7',
  
    // Aliases for use-case clarity (recommended)
    CHEAPEST: 'claude-haiku-4-5-20251001',
    DEFAULT: 'claude-sonnet-4-6',
    BEST: 'claude-opus-4-7',
  } as const
  
  export type ModelId = (typeof Model)[keyof typeof Model]