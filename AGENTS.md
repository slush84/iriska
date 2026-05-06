<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Iriska — Project Context for AI

This file is the master context document for AI-assisted development on the
Iriska project. Cursor and other AI tools auto-load this file (and CLAUDE.md
which points here) when working in this repository. Read this first in any
new session before suggesting changes.

Last meaningful update: 2026-05-06 (evening — buyer expansion + AI architecture)

---

## What Iriska is

**Iriska.AI** — AI-powered B2B procurement platform for premium European
food products. Marketplace play, not distributor. Analogous to Booking.com
for restaurant procurement, but extending naturally to specialty retail
and online stores.

**Tagline:** "The well-chosen list."

**Positioning (locked 2026-05-05, refined 2026-05-06):** Quality + Origin
as the standard. Not geographic. Products qualify by:
1. Protected designation (PDO/PGI/TSG/AOP/DOP/AOC/Suisse Garantie/etc.)
2. Heritage producer status (>50 years, single-family / consortium)
3. Recognized quality certification (Slow Food Presidium, Bio EU, Demeter, etc.)
4. Curated exception by Iriska panel (booming quality producers)

**Geography model:** Iriska is NOT a pickup-to-delivery corridor (e.g.
"Mediterranean → Northern Europe"). It is a producer-to-buyer matching
grid where ANY qualified producer in any participating country sells to
ANY HoReCa buyer in any participating country. Geography determines
logistics cost and feasibility, not platform eligibility.

**Initial supplier focus (marketing/business framing, NOT architectural
constraint):** Mediterranean producers — Spain (ES), Italy (IT), France (FR),
Portugal (PT), Greece (GR). This is where the GI dataset coverage is strongest
at launch and where the founder's supply-side network operates.

**Initial buyer focus (marketing/business framing, NOT architectural
constraint):** Northern Europe — Netherlands (NL), Belgium (BE), Germany (DE),
Denmark (DK), Austria (AT), Norway (NO), Sweden (SE), Poland (PL), Czech
Republic (CZ). Plus full cross-flows: any participating country buys from
any participating country (ES↔ES, ES↔IT, IT↔PT, etc.).

**Buyer-side model (added 2026-05-06):** Iriska is NOT exclusively HoReCa.
HoReCa (restaurants, hotels, catering) is the primary marketing focus and
where the differentiated UX lives — menu pairing, reorder workflows, food
cost intelligence. But architecturally, any qualified B2B buyer sourcing
premium European products is welcome:

- HoReCa: restaurants, hotels, catering, dark kitchens (primary focus)
- Specialty retail: wine shops, gourmet stores, deli, cheese shops
- Online retail: e-commerce gourmet stores, subscription boxes
- Concept stores / B2B2C: design boutiques carrying food selections

**Underlying mission:** open small quality producers to a wider B2B audience,
letting them compete on organoleptic and craft advantage rather than volume
or marketing spend. A Madrid online store buying Catalan fuet, an Amsterdam
wine shop buying Spanish olive oil — these are valid Iriska transactions,
not edge cases.

**B2C direct-to-consumer:** Out of MVP scope. Considered for Phase 8+ as a
separate vertical only after HoReCa B2B model is proven, cashflow stable,
and we have a clear thesis on how a B2C extension would not dilute brand
focus or fragment operational priority. Architecturally not blocked
(`org_type` enum can extend), but not built for.

**Expansion path:** smaller EU markets next, with localization (German,
Dutch, Spanish, Italian, French, Portuguese UI). UK post-Brexit, Switzerland,
Norway non-EU shipping — Phase 7+.

---

## Architectural principles (anti-patterns to avoid)

The following must NEVER appear in database schema or code:

- **No `pickup_country` or `delivery_country` enum/column** — `country_code`
  on organizations is just a country, not a role label.
- **No hardcoded list of "supplier countries" vs "buyer countries"** — every
  EU country code is equally valid for either role.
- **No business logic that filters orgs by country before role check** — role
  is determined by `org_type` (supplier/buyer/both), country is metadata.
- **No assumption that "Mediterranean = supplier side" in code.** Marketing
  copy on landing/suppliers pages may emphasize Mediterranean as starting
  focus, but database queries, routing logic, catalog filtering, and shipping
  calculations must be country-agnostic.
- **No `buyer_type = 'horeca'` enum-only constraint** — buyer org_type is
  metadata, qualifying buyers are not restricted to HoReCa channel.
- **No HoReCa-specific UI lock-in early in flow** — features like menu
  pairing should be optional/contextual, not gating elsewhere in the buyer
  experience.

The marketing-focus lists above are for sales priority and dataset coverage,
not technical constraint. A Dutch cheese producer signing up tomorrow gets
the same code path as a Spanish jamón producer. An Amsterdam wine shop gets
the same buyer flow as a HoReCa restaurant.

---

## Who is building this

**Sergei** (founder) — 15+ years B2B distribution background. Pivoting from
cosmetics to HoReCa. Relocating to Amsterdam. Learning to code through this
project, using Cursor + Claude as primary dev tools.

**Business partner in Barcelona** — handles supply side, domain expertise for
Spanish HoReCa vocabulary and producer relationships.

**Looking for:** CTO equity partner, operational partner Barcelona, advisor.

---

## Strategic decisions log

### Business model & positioning

| Decision | Status | Rationale |
|---|---|---|
| Multi-vendor architecture from day one | Locked | Retrofit later would be costly |
| Hybrid bootstrapped → optional seed | Locked | Cashflow first, raise from traction |
| Amsterdam physical showroom | Planned | Trust-building + early revenue + supplier on-platform |
| AI features from launch | Locked | Differentiation, not future phase |
| 5-filter AI cascade | Spec done | price corridor → cuisine fit → ratings → inventory → seasonality |
| Quality + Origin standard (not geographic) | Locked | Producer-to-buyer matching grid |
| Mediterranean as starting territory only | Locked | Open to producers from any country meeting standards |
| HoReCa as primary buyer focus only | Locked 2026-05-06 | Specialty retail / online stores welcomed architecturally |
| B2C out of MVP, deferred to Phase 8+ | Locked 2026-05-06 | Reconsider only after HoReCa B2B proven, no brand dilution |
| Iriska.AI naming | Active | Trademark filed as "Iriska" alone; .AI as identity-magnet |
| Build self via Cursor + Claude API | Active | Save €50-70K vs outsourced |
| All docs/outputs in Russian by default | Active | English UI copy, but specs/analyses in Russian |
| Email: professional addresses on registered domain | Active | hello@iriska.ai, partners@iriska.ai. No gmail. |

### Tech stack

| Decision | Status | Rationale |
|---|---|---|
| Next.js 16 + Vercel + Supabase | Locked | Free-tier friendly, EU region, fast iteration |
| Tailwind v4 + brand token system | Locked | Burgundy/cream/linen, Newsreader display |
| Auth: Supabase Auth for MVP | Locked | Migrate to Clerk/Auth0 only if hit limits |
| Resend for transactional email | Locked 2026-05-06 | Best DX, React Email components, free tier covers MVP |
| Sendcloud as carrier aggregator on MVP | Locked 2026-05-06 | 80+ EU carriers via one API, premium 5-10% acceptable |
| ShippingProvider abstraction layer | Locked | Future direct contracts (DHL/PostNL/GLS) plug in cleanly |
| Vercel Cron OR Supabase pg_cron | Pending decision | Both viable; pg_cron preferred for in-DB ops |
| Payments: Stripe vs Mollie | Pending | Mollie favored for NL/EU iDEAL/SEPA |
| i18n architecture: next-intl from start | Locked 2026-05-06 | Add early to avoid hardcoded-strings retrofit pain |

### AI integration & cost control

| Decision | Status | Rationale |
|---|---|---|
| Anthropic Claude API as primary LLM | Locked 2026-05-06 | No fine-tuning, prompt engineering + RAG approach |
| Hard monthly spend cap in Anthropic Console | Locked | Set on first deploy ($50 MVP, scaled later) |
| Per-user app-level quotas | Locked | Free tier 20 AI calls/day, Pro 200/day, prevent abuse |
| Cloudflare Turnstile on signup forms | Locked | Free anti-bot, on registration/login pages |
| B2B verification as primary abuse barrier | Locked | KVK/VAT verification + manual approval initially |
| Anomaly detection (rate spikes per user) | Phase 6 | Flag and pause if 10x normal usage |
| Cost analytics per AI feature | Phase 6 | Know which features burn budget, optimize prompts |
| Claude Haiku for chatbot, Sonnet for analysis | Locked | 3x cheaper for narrow tasks (FAQ, navigation) |

### Logistics & compliance

| Decision | Status | Rationale |
|---|---|---|
| Alcohol excluded from MVP | Locked 2026-05-06 | EMCS/excise/fiscal-rep complexity. Phase 7+ via NL-licensed distributor |
| EU-only delivery on MVP | Locked | UK/Norway/Switzerland customs deferred to Phase 7+ |
| Temperature-aware routing (ambient/chilled/mixed) | Locked | Core Iriska differentiation vs Faire/Choco |
| Catalog filtering by delivery feasibility | Locked | shipping_zones pre-computed table, refresh weekly |
| Shipping cache TTL 15-30 min | Locked 2026-05-06 | Balance freshness vs API call cost |
| Shipping markup 10-15% on Sendcloud cost | Locked | Per logistics spec, our margin on logistics |
| Direct carrier contracts trigger | Defined | When GMV ≥ €15K/mo — switch DHL/PostNL/GLS to direct |

---

## AI integration philosophy

This section exists so any future AI session understands HOW we use AI on
Iriska, not just THAT we use it. Critical for not re-litigating decisions.

### What we don't do

- **We do not train or fine-tune LLMs ourselves.** Anthropic trains Claude.
  We use the API. Fine-tuning is reserved for Phase 7+ when we have
  proprietary conversation data and clear ROI thesis.
- **We do not run our own LLM infrastructure.** No GPUs, no model weights
  on our servers, no MLOps pipeline.

### What we do

**Three levels of integration, used progressively:**

**Level 1 — Prompt engineering (90% of AI features):**
- We send Claude API a request with system prompt + context + user query
- Claude responds, we render
- Cost: $0.005-0.04 per request (Sonnet) or $0.0005-0.002 (Haiku)
- "Improvement" = iterating on system prompts, not model retraining

**Level 2 — RAG (Retrieval-Augmented Generation):**
- For DB-aware answers, first SQL/API search relevant data
- Then send Claude: data + question → answer
- This is where the 5-filter cascade lives
- Most Iriska AI features are RAG: search by intent, menu pairing,
  recommendations, quality score aggregation

**Level 3 — Embeddings (semantic search, Phase 6.2+):**
- Product descriptions converted to vectors once at write time
- User queries vectorized at read time
- Cosine similarity finds semantic matches
- Cheap (~$0.0001 per query) but separate infrastructure (pgvector or Pinecone)
- Use case: "find jamón with umami and nutty notes" matches descriptions
  semantically even if those exact words aren't in the catalog

### Where AI shows up in the product

| Feature | Phase | Level | Cost/call |
|---|---|---|---|
| Search by intent ("ham for braising") | 6.1 | Prompt + RAG | ~$0.01 |
| Auto-translation of product descriptions | 6.1 | Prompt | ~$0.005 |
| Menu analysis (upload menu → suggestions) | 6.2 | RAG | ~$0.10-0.30 |
| 5-filter recommendation cascade | 6.2 | RAG | ~$0.05 |
| Smart reorder predictions | 6.3 | Prompt + history | ~$0.01 |
| Quality score aggregation | 6.3 | RAG | ~$0.01 |
| Wine card optimization | 6.4 | RAG | ~$0.05 |
| Customer support chatbot widget | 4.6 | Prompt (Haiku) | ~$0.001 |
| Semantic search | 7+ | Embeddings | ~$0.0001 |
| Fine-tuning on Iriska conversations | 7+ | Custom model | one-time + premium per call |

### Customer support chatbot (Phase 4.6)

Separate concern from menu-pairing AI. Narrow scope at launch:

- Lower-right corner widget on all pages
- Knows: platform features, navigation, FAQ, terminology (DOP, payment terms)
- Cannot: make purchases, modify orders, commit to terms
- Tech: Claude Haiku (cheap), static knowledge-base markdown loaded as
  system prompt context
- Escalation: out-of-scope queries → email handoff to hello@iriska.ai
- Anonymous use OK on public pages, but rate-limited per IP

### Abuse protection layers

1. **B2B registration verification** (primary barrier — handles 99%):
   KVK/VAT number required, manual approval first 6 months
2. **Cloudflare Turnstile** on signup/login (free, blocks automation)
3. **Per-user quotas** in app DB: Free tier 20/day, Pro 200/day
4. **Per-IP rate limits** for anonymous chatbot: 10/hour
5. **Anomaly detection** (Phase 6): flag if usage > 10x baseline
6. **Vercel/Cloudflare** infrastructure-level DDoS protection

### Budget protection layers

1. **Anthropic Console hard monthly cap** ($50 MVP, scale later) — API
   physically stops above limit
2. **Real-time alerts** if daily spend > threshold (Slack webhook)
3. **Per-feature cost tracking** in DB to identify burn sources
4. **Tier optimization**: use Haiku for narrow tasks, Sonnet only for
   reasoning-heavy work
5. **Prompt caching** (Anthropic feature) for repeated context — 90%
   discount on cached tokens

---

## Current project state

### Completed phases

**Phase 1 — Initial landing (April 2026)**
- Next.js 16 + Vercel + GitHub repo `slush84/iriska`
- Brand system v1.0 applied
- Production: `iriska-inky.vercel.app`

**Phase 2A — Database backend (April 29)**
- Supabase Postgres, Frankfurt region
- Project ref: `vxnkjjlzewukabydudmu`
- 6 tables for GI dataset, RLS public-read, GIN indexes
- Loaded: 958 GI entries, 396 producers, 354 producer-GI links,
  487 price benchmarks, 364 heritage products
- 5 SQL migrations in `db/migrations/`

**Phase 2B — Catalog (May 1-4)**
- 2B.1: Supabase ↔ Next.js typed client
- 2B.2: `/catalog` page with paginated grid
- 2B.3: Filters (country, category) + accent-insensitive search via `unaccent`
  extension and `primary_gi_name_search` generated column + pg_trgm GIN index
- 2B.4: `/catalog/[country]/[slug]` detail pages with producers and pricing

**Phase 2B.5 — Landing redesign (May 5)**
- Hero: "Origin-driven sourcing for serious kitchens." + dual CTA
- Reusable RequestAccessButton component
- Live data band with real BD counts
- How it works 3-step explainer
- Featured categories with real counts, links to filtered catalog
- For Suppliers preview section
- Full /suppliers page

**Phase 2B.6 — Visual upgrade (May 5)**
- Editorial hero photo in two-column layout
- Reusable Header and Footer applied to all pages
- ISR revalidate directives

**Phase 2B.7 — Spacing polish (May 6)**
- Tightened section padding across landing and Footer
- ~30% denser vertical rhythm, professional B2B pacing

### Active phase

**(none — between phases, planning Phase 3)**

### Next phases (planned)

**Phase 3 — Supplier MVP (this week target)**

- Phase 3.0: i18n architecture setup (next-intl, English-only content,
  language-ready scaffolding)
- Phase 3.1: Authentication (Supabase Auth, magic link, supplier/buyer
  user types, /login /signup /account pages, Cloudflare Turnstile)
- Phase 3.2: Schema expansion (orgs, users, products, SKUs, taxonomy)
  + LOGISTICS FIELDS (collect at supplier signup so we don't ask twice):
    - suppliers: pickup_address, pickup_zip, pickup_country,
      pickup_schedule, pickup_cutoff_time, lead_time_days,
      consolidation_capability, temperature_capabilities, sendcloud_sender_id
    - products: weight_kg, dimensions_cm, temperature_class, fragility,
      min_order_unit, min_order_quantity, packaging_options, shelf_life_days
- Phase 3.3: Supplier dashboard (org profile, products list,
  CSV import, manual SKU editing, logistics info form)
- Phase 3.4: Public supplier profile pages
- Phase 3.5: Catalog evolution showing "X suppliers offer this"
- Phase 3.6: Sourcing requests (buyer asks for unlisted product)

**Phase 4 — Buyer MVP**

- Phase 4.1: Buyer onboarding (HoReCa, specialty retail, online retail —
  unified buyer flow, org_type as metadata)
- Phase 4.2: Multi-supplier cart
- Phase 4.3: Checkout shell (order creation, no shipping logic yet)
- Phase 4.4: Order tracking statuses
- Phase 4.5: **Logistics integration** (the big one)
  - Sendcloud sandbox account, API keys, lib/sendcloud.ts
  - ShippingProvider interface + SendcloudProvider implementation
  - Routing engine: groupCartBySupplier → analyzeTemperatureMix → quotes
  - Catalog availability filter (shipping_zones table, weekly refresh)
  - Checkout UI with shipping options (split-by-temperature)
  - Sendcloud webhook handler (status updates, tracking)
  - Shipping quotes cache (15-30 min TTL)
  - Edge cases: lead time, pickup schedule, min order, fragility, hot weather
- Phase 4.6: Email + customer support infrastructure
  - Resend setup, transactional templates via React Email
  - Supplier order notifications, customer confirmations
  - **Customer support chatbot widget** (Claude Haiku, narrow scope)

**Phase 5 — Trust + Localization**

- Phase 5.0: Localization rollout
  - Spanish first (highest ROI: cross-flows ES↔ES, ES↔IT)
  - German next (NL/DE buyers)
  - Then Dutch, Italian, French, Portuguese
  - AI-assisted translation with human review for B2B copy
- Phase 5.1: Trust score (two-sided)
- Phase 5.2: Disputes & reviews

**Phase 6 — AI layer (the differentiation)**

- Phase 6.1: Search by intent + auto-translation
- Phase 6.2: Menu analysis + 5-filter cascade
- Phase 6.3: Smart reorder + quality score aggregation
- Phase 6.4: Wine card optimization (when wine returns in Phase 7+)
- Phase 6.x cost ops: per-feature cost tracking, anomaly detection,
  prompt caching optimization

**Phase 7+ — Scale**

- Direct carrier contracts (DHL Freight, PostNL, GLS) when GMV ≥ €15K/mo
- Multi-stop consolidation (1 truck, multiple pickup suppliers)
- Wine + alcohol return (NL-licensed distributor partnership, EMCS, fiscal rep)
- UK post-Brexit customs
- Norway, Switzerland (non-EU shipping)
- Mobile apps (React Native)
- ERP integrations for top suppliers
- API access for advanced suppliers
- Embeddings semantic search
- Fine-tuning Claude on Iriska conversation history

**Phase 8+ — New verticals (only after MVP proven)**

- B2C extension evaluation (separate vertical, separate brand decision,
  only if HoReCa/B2B model proven and B2C wouldn't dilute focus)
- Iriska Fulfillment Hub (Barcelona) — Ankorstore-style for small suppliers
- Trade event/tasting infrastructure

---

## Repository structure
iriska/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing
│   ├── catalog/
│   │   ├── page.tsx              # Catalog grid
│   │   ├── _components/          # Filter / search components
│   │   └── [country]/[slug]/     # GI detail pages
│   ├── suppliers/
│   │   └── page.tsx              # For Suppliers full page
│   └── layout.tsx                # Root layout, font loading
├── components/                   # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── RequestAccessButton.tsx
├── lib/
│   ├── supabase/                 # Supabase client + generated types
│   ├── queries/                  # Data-fetching layer
│   └── utils/                    # slugify, etc.
├── db/migrations/                # SQL migrations (idempotent)
├── public/
│   ├── brand/                    # Logo SVG variants
│   └── images/                   # Hero photo, etc.
├── BRAND.md                      # Brand book v1.0 (source of truth)
├── AGENTS.md                     # This file (AI agent operating instructions)
├── CLAUDE.md                     # Pointer to AGENTS.md for Cursor
├── INTEGRATION.md                # Brand integration notes
└── README.md                     # Project README
---

## Conventions in use

**Code style:**
- TypeScript strict mode, no `any` unless documented why
- Server components by default, `'use client'` only when needed
- URL search params for filter state (shareable links, SEO-friendly)
- Absolute imports via `@/` alias

**Database:**
- Idempotent migrations (`IF NOT EXISTS`, `ON CONFLICT DO NOTHING`)
- RLS on all tenant tables (public-read for catalog data)
- Generated columns for derived values when used in indexes
- Slugs derived in JS for now; move to GENERATED column when GI table > 5K rows

**UI:**
- No emojis in interface
- No cold blues, no aggressive reds
- Newsreader italic for display headings
- Bricolage Grotesque for body
- JetBrains Mono uppercase for labels/kickers
- Burgundy CTAs, cream cards, linen background
- Editorial / warm / restrained tone

**Workflow:**
- Commit per logical phase with descriptive messages
- Push to GitHub triggers Vercel auto-deploy
- Before each session: read this file + check git log for recent changes

**Known copy-paste pattern (workaround):**
- Multi-line `<a href="...">` tags often lose opening `<a>` when copied
  from chat to Cursor. Use RequestAccessButton component for mailto CTAs;
  for one-off external links inline, prefer single-line `<a href="...">text</a>`
  format when copying from chat.

---

## IMPROVEMENTS (deferred, not blocking)

Non-strategic enhancements parked for later. Don't interrupt structural
buildout to fix these — they're tracked here for systemic resolution
when the time is right.

### Architectural

- **Commercial vocabulary layer:** HoReCa buyers search by commercial terms
  (iberico, cebo, bellota, pata negra; manchego curado; extra virgin; early
  harvest) but DB has only formal DOP names. Systemic problem across all 11
  categories. Architectural decision needed: separate `commercial_terms` table
  vs `commercial_category → DOP → quality_grade` hierarchy vs AI-generated
  mapping. Coordinate with Barcelona partner for domain expertise.

- **Data quality enrichment:** 181/958 GI entries (17.5%) flagged
  `is_data_thin`. Solutions: AI batch via Claude API; producer/consortium
  scraping; supplier-driven natural improvement post-MVP.

- **Non-Mediterranean GI registries:** Add Swiss AOP/IGP, UK PDO, Norwegian
  Beskyttede, Dutch/Belgian/German PDO entries as positioning expands.
  Already explicit non-Mediterranean producers welcomed as buyers/sellers
  even before formal registry expansion.

- **Heritage producer table:** For producers without formal GI but meeting
  heritage criteria (>50 years, etc.).

- **Quality certification taxonomy:** Slow Food Presidium, Bio EU, Demeter,
  curated Iriska panel exceptions.

- **Multi-stop consolidation logistics (Phase 7+):** Single truck pickup
  from multiple suppliers in same region. Major margin lever but
  operationally complex.

- **Cron infrastructure decision:** Vercel Cron Hobby tier sufficient
  for weekly shipping_zones refresh, but Supabase pg_cron is in-database
  and free. Decide before Phase 4.5 implementation.

- **Cold chain insurance review:** Standard parcel carrier insurance
  may not cover food spoilage from broken cold chain. Investigate
  Sendcloud and direct carrier policies before serious chilled volume.

- **Landing/suppliers copy refresh:** Current copy emphasizes "kitchens"
  and "HoReCa" exclusively. Refresh to reflect broader B2B buyer base
  (specialty retail, online stores) while keeping HoReCa as primary
  marketing voice. Not urgent — current copy is true for primary launch
  audience, just incomplete for full architectural model.

- **Faire/Ankorstore UX patterns adoption:** Detailed UX research document
  identifies Tier-1 patterns to adopt (visual design, brand storytelling,
  multi-filter discovery, free first-order replacement, net payment terms,
  reorder workflows) and patterns to avoid (25% commission, margin filter,
  uncurated catalog). Reference for systemic interface improvements before
  buyer launch.

### Quick wins (when convenient)

- **DB column slug** — generated column for GI slugs when table > 5K rows
- **Aliases not searched** — extend search to use `aliases` column alongside
  `primary_gi_name_search`. Quick win, ~15 min.
- **Logo aspect-ratio refactor** — currently native `<img>`, switch to
  Next.js `Image` if raster logos needed
- **Tailwind v4 `@theme` lint warning** — Cursor false positive, will resolve
  with editor update
- **Hero photo Next.js Image migration** — if more raster images appear,
  switch from native `<img>` to optimized `<Image>` component

### Bugs (small, non-blocking)

- **Data noise in GI names:** ~20 entries have annotations leaked into
  `primary_gi_name`. Fix: single UPDATE pass.
- **Sticky 404 for some heritage GIs:** needs deeper testing of `is_data_thin`
  entries that have nullable required fields.

---

## How to use this file

**For AI sessions (Claude, Cursor, others):** Read this in full at the start
of any new session before making code suggestions. The "Strategic decisions
log", "AI integration philosophy", and "Current project state" sections are
most important — don't re-litigate decisions already locked.

**For Sergei:** Update this file when:
- A phase is completed (move from "Active" to "Completed")
- A new strategic decision is made
- An IMPROVEMENT moves to active work or gets resolved
- A new convention emerges that future sessions should follow

The goal is that opening this file gives anyone (including future-you and
future-me) a complete picture of where Iriska is and why it's there in
under 5 minutes of reading.