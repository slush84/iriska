-- ============================================================================
-- Migration 006: events_log
-- ============================================================================
-- Event-driven architecture foundation. Every significant state change in the
-- platform emits a structured event to this table. Events are durable
-- (survive restarts), queryable, and can be consumed by:
--   - Real-time subscribers via Postgres LISTEN/NOTIFY
--   - Polling cron jobs (Vercel Cron / Supabase pg_cron)
--   - Webhook handlers
--   - Future automation agents
--
-- Naming convention for event_type: 'domain.action' lowercase.
-- Examples:
--   supplier.signed_up
--   supplier.verified
--   product.created
--   product.price_updated
--   order.placed
--   order.fulfilled
--   payment.received
--   ai_call.completed
--
-- Idempotent: safe to re-run.
-- ============================================================================

-- Status of event processing. Default 'pending' for new events.
DO $$ BEGIN
  CREATE TYPE event_processing_status AS ENUM (
    'pending',     -- not yet processed by any subscriber
    'processing',  -- being processed (avoid double-processing)
    'completed',   -- successfully processed
    'failed',      -- processing failed, retry candidate
    'skipped'      -- intentionally not processed (filter, dedup, etc.)
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Main events table
CREATE TABLE IF NOT EXISTS events_log (
  id BIGSERIAL PRIMARY KEY,

  -- Event identification
  event_type TEXT NOT NULL,
    -- e.g. 'supplier.signed_up', 'order.placed', 'product.created'

  -- Event content (flexible, schema per event_type)
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Who/what triggered the event
  actor_type TEXT,           -- 'user', 'system', 'webhook', 'cron', 'agent'
  actor_id TEXT,             -- user UUID, system process name, webhook source, etc.

  -- Tracing
  trace_id TEXT,             -- correlate events across requests
  parent_event_id BIGINT REFERENCES events_log(id),
                             -- for events triggered by other events

  -- Processing state
  status event_processing_status NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  processing_attempts INTEGER NOT NULL DEFAULT 0,
  processing_error TEXT,     -- last error message if status = 'failed'

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_events_log_event_type
  ON events_log (event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_log_status_pending
  ON events_log (created_at)
  WHERE status = 'pending';
  -- Partial index: only pending events. Used by pollers.

CREATE INDEX IF NOT EXISTS idx_events_log_actor
  ON events_log (actor_type, actor_id, created_at DESC)
  WHERE actor_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_events_log_trace
  ON events_log (trace_id, created_at)
  WHERE trace_id IS NOT NULL;

-- GIN index on payload for queries like "find events where payload contains X"
CREATE INDEX IF NOT EXISTS idx_events_log_payload_gin
  ON events_log USING GIN (payload jsonb_path_ops);

-- updated_at trigger
CREATE OR REPLACE FUNCTION events_log_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_events_log_updated_at ON events_log;
CREATE TRIGGER trg_events_log_updated_at
  BEFORE UPDATE ON events_log
  FOR EACH ROW
  EXECUTE FUNCTION events_log_set_updated_at();

-- ============================================================================
-- LISTEN/NOTIFY: Real-time subscriber notification
-- ============================================================================
-- When an event is inserted, broadcast a NOTIFY 'events_log_new' with the
-- event_type as payload. Subscribers can LISTEN events_log_new to react in
-- real time without polling.
-- ============================================================================

CREATE OR REPLACE FUNCTION events_log_notify()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'events_log_new',
    json_build_object(
      'id', NEW.id,
      'event_type', NEW.event_type,
      'created_at', NEW.created_at
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_events_log_notify ON events_log;
CREATE TRIGGER trg_events_log_notify
  AFTER INSERT ON events_log
  FOR EACH ROW
  EXECUTE FUNCTION events_log_notify();

-- ============================================================================
-- Row Level Security
-- ============================================================================
-- events_log is internal infrastructure. NOT exposed via Supabase public API.
-- Only service_role (server-side code via service key) can write/read.
-- Default RLS denies all access; we add no permissive policies.
-- ============================================================================

ALTER TABLE events_log ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Comments for self-documentation
-- ============================================================================

COMMENT ON TABLE events_log IS
  'Event-driven architecture: every significant platform state change emits a structured event here. Consumed by subscribers via LISTEN/NOTIFY or polling.';

COMMENT ON COLUMN events_log.event_type IS
  'Naming convention: domain.action lowercase (e.g., supplier.signed_up, order.placed)';

COMMENT ON COLUMN events_log.payload IS
  'JSONB payload with event-specific schema. Indexed via GIN for jsonb queries.';

COMMENT ON COLUMN events_log.status IS
  'Processing state. Pollers query WHERE status = pending. After processing, set to completed/failed/skipped.';

COMMENT ON COLUMN events_log.parent_event_id IS
  'For events triggered by other events. Enables event chains tracing.';
  -- ============================================================================
-- Grants for service_role
-- ============================================================================
-- PostgREST honors role-level grants in addition to RLS policies.
-- service_role needs explicit table + sequence grants to perform INSERTs.
-- ============================================================================

GRANT INSERT, SELECT, UPDATE, DELETE ON events_log TO service_role;
GRANT USAGE, SELECT ON SEQUENCE events_log_id_seq TO service_role;