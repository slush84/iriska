-- ===========================================================================
-- Iriska Mediterranean GI Dataset — Supabase deployment v1.0.0
-- ---------------------------------------------------------------------------
-- 5 tables (~2,281 records target) + 3 views + RLS + API grants
-- Adapted from iriska_schema.sql for Supabase Postgres 15+
-- Idempotent: safe to re-run (uses IF NOT EXISTS / DROP+CREATE patterns)
-- ===========================================================================

-- Extensions (pgcrypto already in Supabase; IF NOT EXISTS = no-op if present)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- countries: lookup table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS countries (
    country_code CHAR(2) PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO countries (country_code, country_name) VALUES
    ('IT', 'Italy'),
    ('ES', 'Spain'),
    ('FR', 'France'),
    ('PT', 'Portugal'),
    ('GR', 'Greece')
ON CONFLICT (country_code) DO NOTHING;

-- ---------------------------------------------------------------------------
-- gi_entries: Layer 1 (registry) + Layer 2 (descriptive enrichment)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gi_entries (
    gi_id              UUID PRIMARY KEY,
    country_code       CHAR(2) NOT NULL REFERENCES countries(country_code),
    country            VARCHAR(50) NOT NULL,
    category           VARCHAR(50) NOT NULL,
    primary_gi_name    VARCHAR(255) NOT NULL,
    all_gi_names       JSONB NOT NULL DEFAULT '[]'::jsonb,
    gi_type_primary    VARCHAR(10) NOT NULL,
    gi_types_all       JSONB NOT NULL DEFAULT '[]'::jsonb,
    tasting_notes      TEXT,
    horeca_use         TEXT,
    packaging_formats  JSONB NOT NULL DEFAULT '[]'::jsonb,
    seasonal_months    JSONB NOT NULL DEFAULT '[]'::jsonb,
    aliases            JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_data_thin       BOOLEAN NOT NULL DEFAULT false,
    source_layer       VARCHAR(10) NOT NULL DEFAULT 'L1_L2',
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gi_country       ON gi_entries(country_code);
CREATE INDEX IF NOT EXISTS idx_gi_category      ON gi_entries(category);
CREATE INDEX IF NOT EXISTS idx_gi_type          ON gi_entries(gi_type_primary);
CREATE INDEX IF NOT EXISTS idx_gi_data_thin     ON gi_entries(is_data_thin) WHERE is_data_thin = true;
CREATE INDEX IF NOT EXISTS idx_gi_tasting_fts   ON gi_entries USING gin(to_tsvector('simple', coalesce(tasting_notes, '')));
CREATE INDEX IF NOT EXISTS idx_gi_packaging_jsonb ON gi_entries USING gin(packaging_formats);
CREATE INDEX IF NOT EXISTS idx_gi_seasonal_jsonb  ON gi_entries USING gin(seasonal_months);
CREATE INDEX IF NOT EXISTS idx_gi_aliases_jsonb   ON gi_entries USING gin(aliases);

-- ---------------------------------------------------------------------------
-- producers: Layer 3 — Tier 1 producer brands
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS producers (
    producer_id         UUID PRIMARY KEY,
    country_code        CHAR(2) NOT NULL REFERENCES countries(country_code),
    country             VARCHAR(50) NOT NULL,
    cluster             VARCHAR(255),
    producer_name       VARCHAR(255) NOT NULL,
    parent_company      VARCHAR(255),
    region_town         VARCHAR(255),
    tier                CHAR(1) NOT NULL CHECK (tier IN ('S', 'M', 'L')),
    export_to_eu        BOOLEAN,
    website             VARCHAR(255),
    commercial_notes    TEXT,
    gis_associated_raw  JSONB NOT NULL DEFAULT '[]'::jsonb,
    source_layer        VARCHAR(10) NOT NULL DEFAULT 'L3',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_producer_country ON producers(country_code);
CREATE INDEX IF NOT EXISTS idx_producer_tier    ON producers(tier);
CREATE INDEX IF NOT EXISTS idx_producer_export  ON producers(export_to_eu) WHERE export_to_eu = true;

-- producer ↔ GI junction (many-to-many)
CREATE TABLE IF NOT EXISTS producer_gi_links (
    producer_id  UUID NOT NULL REFERENCES producers(producer_id) ON DELETE CASCADE,
    gi_id        UUID NOT NULL REFERENCES gi_entries(gi_id) ON DELETE CASCADE,
    raw_gi_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (producer_id, gi_id)
);

CREATE INDEX IF NOT EXISTS idx_pgi_producer ON producer_gi_links(producer_id);
CREATE INDEX IF NOT EXISTS idx_pgi_gi       ON producer_gi_links(gi_id);

-- ---------------------------------------------------------------------------
-- price_benchmarks: Layer 4 — B2B HoReCa wholesale price corridors
-- EUR ex-VAT, ex-warehouse origin country, valid Q2 2026 → 2026-10-31
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS price_benchmarks (
    sku_id          UUID PRIMARY KEY,
    gi_id_link      UUID REFERENCES gi_entries(gi_id) ON DELETE SET NULL,
    country_code    CHAR(2) NOT NULL REFERENCES countries(country_code),
    country         VARCHAR(50) NOT NULL,
    cluster         VARCHAR(255),
    gi_or_category  VARCHAR(255) NOT NULL,
    format          VARCHAR(255),
    unit            VARCHAR(20) NOT NULL,
    eur_low         NUMERIC(10, 2),
    eur_typical     NUMERIC(10, 2),
    eur_high        NUMERIC(10, 2),
    tier            VARCHAR(20) NOT NULL,
    confidence      VARCHAR(20) NOT NULL CHECK (confidence IN ('HIGH', 'MEDIUM', 'DATA_THIN')),
    source_logic    TEXT,
    valid_until     DATE NOT NULL DEFAULT '2026-10-31',
    source_layer    VARCHAR(10) NOT NULL DEFAULT 'L4',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT price_corridor_invariant CHECK (
        (eur_low IS NULL OR eur_typical IS NULL OR eur_low <= eur_typical)
        AND (eur_typical IS NULL OR eur_high IS NULL OR eur_typical <= eur_high)
    )
);

CREATE INDEX IF NOT EXISTS idx_price_country         ON price_benchmarks(country_code);
CREATE INDEX IF NOT EXISTS idx_price_gi_id           ON price_benchmarks(gi_id_link) WHERE gi_id_link IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_price_tier            ON price_benchmarks(tier);
CREATE INDEX IF NOT EXISTS idx_price_confidence      ON price_benchmarks(confidence);
CREATE INDEX IF NOT EXISTS idx_price_valid_until     ON price_benchmarks(valid_until);
CREATE INDEX IF NOT EXISTS idx_price_typical_range   ON price_benchmarks(eur_typical) WHERE eur_typical IS NOT NULL;

-- ---------------------------------------------------------------------------
-- heritage_products: Layer 5 — PAT, Slow Food Presidi, heritage non-GI
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS heritage_products (
    heritage_id              UUID PRIMARY KEY,
    gi_id_link               UUID REFERENCES gi_entries(gi_id) ON DELETE SET NULL,
    country_code             CHAR(2) NOT NULL REFERENCES countries(country_code),
    country                  VARCHAR(50) NOT NULL,
    cluster                  VARCHAR(255),
    name                     VARCHAR(255) NOT NULL,
    region                   VARCHAR(255),
    registry                 VARCHAR(255),
    scale                    VARCHAR(50),
    producer_count_raw       TEXT,
    producer_count_estimate  INTEGER,
    horeca_use               TEXT,
    cross_reference_layer    VARCHAR(20),
    source_layer             VARCHAR(10) NOT NULL DEFAULT 'L5',
    created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_heritage_country  ON heritage_products(country_code);
CREATE INDEX IF NOT EXISTS idx_heritage_gi_link  ON heritage_products(gi_id_link) WHERE gi_id_link IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_heritage_registry ON heritage_products(registry);
CREATE INDEX IF NOT EXISTS idx_heritage_scale    ON heritage_products(scale);

-- ---------------------------------------------------------------------------
-- Convenience views for the AI engine 5-filter cascade
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_gi_with_prices AS
SELECT
    g.gi_id, g.country_code, g.primary_gi_name, g.category,
    g.gi_type_primary, g.is_data_thin,
    p.sku_id, p.format, p.unit,
    p.eur_low, p.eur_typical, p.eur_high,
    p.tier AS price_tier, p.confidence AS price_confidence
FROM gi_entries g
LEFT JOIN price_benchmarks p ON p.gi_id_link = g.gi_id;

CREATE OR REPLACE VIEW v_gi_with_producers AS
SELECT
    g.gi_id, g.country_code, g.primary_gi_name, g.category,
    pr.producer_id, pr.producer_name,
    pr.tier AS producer_tier, pr.website, pr.export_to_eu
FROM gi_entries g
JOIN producer_gi_links pgl ON pgl.gi_id = g.gi_id
JOIN producers pr ON pr.producer_id = pgl.producer_id;

CREATE OR REPLACE VIEW v_seasonal_gi AS
SELECT gi_id, country_code, primary_gi_name, category, seasonal_months
FROM gi_entries
WHERE jsonb_array_length(seasonal_months) > 0;

-- ===========================================================================
-- SUPABASE-SPECIFIC: API grants + RLS policies
-- ---------------------------------------------------------------------------
-- "Automatically expose new tables" was disabled at project creation time,
-- so we explicitly grant SELECT to the API roles:
--   anon          = unauthenticated public traffic
--   authenticated = signed-in users (Supabase Auth)
--   service_role  = backend operations (bypasses RLS, gets all privileges)
--
-- All data here is public catalog reference (no PII, no business secrets),
-- so read-only public access is safe and intentional.
-- ===========================================================================

GRANT SELECT ON countries           TO anon, authenticated;
GRANT SELECT ON gi_entries          TO anon, authenticated;
GRANT SELECT ON producers           TO anon, authenticated;
GRANT SELECT ON producer_gi_links   TO anon, authenticated;
GRANT SELECT ON price_benchmarks    TO anon, authenticated;
GRANT SELECT ON heritage_products   TO anon, authenticated;
GRANT SELECT ON v_gi_with_prices    TO anon, authenticated;
GRANT SELECT ON v_gi_with_producers TO anon, authenticated;
GRANT SELECT ON v_seasonal_gi       TO anon, authenticated;

-- Explicit RLS enable (idempotent; project event trigger may already have done this)
ALTER TABLE countries          ENABLE ROW LEVEL SECURITY;
ALTER TABLE gi_entries         ENABLE ROW LEVEL SECURITY;
ALTER TABLE producers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE producer_gi_links  ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_benchmarks   ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_products  ENABLE ROW LEVEL SECURITY;

-- Public read-only policies (DROP+CREATE pattern = idempotent)
DROP POLICY IF EXISTS "Public read" ON countries;
CREATE POLICY "Public read" ON countries
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read" ON gi_entries;
CREATE POLICY "Public read" ON gi_entries
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read" ON producers;
CREATE POLICY "Public read" ON producers
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read" ON producer_gi_links;
CREATE POLICY "Public read" ON producer_gi_links
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read" ON price_benchmarks;
CREATE POLICY "Public read" ON price_benchmarks
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read" ON heritage_products;
CREATE POLICY "Public read" ON heritage_products
  FOR SELECT TO anon, authenticated USING (true);

-- ===========================================================================
-- End of migration. Expected output: "Success. No rows returned."
-- Verify in Table Editor: 6 tables visible (countries, gi_entries, producers,
-- producer_gi_links, price_benchmarks, heritage_products) + 3 views.
-- countries should already contain 5 rows (IT/ES/FR/PT/GR).
-- ===========================================================================
