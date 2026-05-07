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

Last meaningful update: 2026-05-06 (late evening — AI-first operating principles)

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

**Geography model:** Iriska is NOT a pickup-to-delivery corridor. It is a
producer-to-buyer matching grid where ANY qualified producer in any
participating country sells to ANY HoReCa buyer in any participating country.
Geography determines logistics cost and feasibility, not platform eligibility.

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
HoReCa is the primary marketing focus and where the differentiated UX lives —
menu pairing, reorder workflows, food cost intelligence. But architecturally,
any qualified B2B buyer sourcing premium European products is welcome:

- HoReCa: restaurants, hotels, catering, dark kitchens (primary focus)
- Specialty retail: wine shops, gourmet stores, deli, cheese shops
- Online retail: e-commerce gourmet stores, subscription boxes
- Concept stores / B2B2C: design boutiques carrying food selections

**Underlying mission:** open small quality producers to a wider B2B audience,
letting them compete on organoleptic and craft advantage rather than volume
or marketing spend.

**B2C direct-to-consumer:** Out of MVP scope. Considered for Phase 8+ as a
separate vertical only after HoReCa B2B model is proven, cashflow stable,
and we have a clear thesis on how a B2C extension would not dilute brand
focus or fragment operational priority. Architecturally not blocked
(`org_type` enum can extend), but not built for.

**Expansion path:** smaller EU markets next, with localization. UK
post-Brexit, Switzerland, Norway non-EU shipping — Phase 7+.

---

## AI-first operating principles

Iriska is built as an AI-first organization, not a traditional company that
adds AI features. This means automation and intelligent agents are designed
into operations from day one, not retrofitted later. The principles below
are operational truth, not aspiration.

### Targets (year 1 baseline)

- **Automation rate:** 70% minimum of repeatable operations executed without
  human intervention by end of year 1. Aspire to 80%+. This is the threshold
  below which the AI-first architecture is not delivering.
- **Time-to-resolution:** <15 min for 80% of operational incidents.
- **Revenue per FTE:** Significantly above industry baseline. Specific
  monetary targets are private; the structural goal is that headcount grows
  sub-linearly to revenue.

### The ten principles (compressed)

1. **API-first for every process.** Every operational procedure is designed
   "agent does, human escalates" from the start. Manual processes are
   documented with their automation path.
2. **Observability from day one.** Sentry + structured logs + custom
   dashboards are MVP-level infrastructure, not "we'll add it later".
3. **Formalized escalation rules.** For each automated process: what the
   agent does, what it escalates, to whom, in which channel, with what SLA.
4. **Human-in-the-loop where cost-of-error is high.** Full automation is
   not universal. The boundary is explicit and reviewed as we scale.
5. **Knowledge base as source of truth.** Processes, policies, FAQ, and
   workflows live in a structured store accessible to agents and humans.
   "If it's not in the KB, it doesn't exist operationally."
6. **Use what exists, don't build what's commodity.** Stripe/Mollie for
   payments, Supabase Auth for auth, Resend for email, Sendcloud for
   shipping. Differentiation (AI cascade, product logic, UX) is built;
   commodity infrastructure is rented.
7. **Hiring triggered by metrics, not calendar.** Each open role passes
   the test: "can this be closed by automation or contractor, and what's
   the 24-month cost difference?"
8. **Contractors over hires for specialized one-off work.** Security audit,
   payments integration audit, legal, financial audit — top experts on
   contract.
9. **AI is a product feature AND an operational layer.** The 5-filter
   cascade is core product value. The same AI infrastructure serves
   internal operations.
10. **Every employee is a leverage point.** Hires only for roles that
    cannot be automated (physical meetings, premium negotiations) or that
    deliver disproportionate growth (Country Lead, Head of Supplier Network).
    No support/admin roles — those are automated or contracted.

### Rollout pattern by cost-of-error (locked 2026-05-06)

NOT every automation goes through shadow→hybrid→autonomous. The pattern
depends on cost-of-error:

**High cost-of-error** (irreversible, financial, legal, brand damage):
- Examples: payments above threshold, refunds, public auto-replies to
  suppliers/buyers, catalog price modifications, account suspensions
- Pattern: permanent human-in-the-loop OR full shadow→hybrid→autonomous
  with explicit promotion criteria

**Medium cost-of-error** (recoverable but user-visible):
- Examples: reorder predictions, sourcing request matching, translations,
  supplier matching, email routing, AI recommendations
- Pattern: shadow → hybrid → autonomous (this is where the pattern earns
  its complexity)

**Low cost-of-error** (trivial, easily reversible, no user-facing harm):
- Examples: search ranking, caching decisions, internal log classification,
  alert triage
- Pattern: skip shadow, go straight to autonomous with monitoring + rollback

When proposing any new automation, classify it explicitly before deciding
on rollout strategy.

### What automates from day one (vs human-only)

**Automates:**
- Supplier onboarding: price-list parsing, SKU normalization, duplicate detection
- Customer support tier 1-2: order/shipping/status questions via chatbot
- Financial ops: payment reconciliation, commission calc, supplier payouts
- Operations monitoring: payment, catalog sync, SLA alerts with rollback
- Marketing: email campaigns, segmentation, dormant account activation
- Analytics: dashboards for team, suppliers, buyers — auto-generated
- AI cascade as product: recommendations, substitutions, seasonality
- HR (when relevant): candidate screening, scheduling, doc generation

**Human-only (now and likely permanently):**
- Strategy, vision, key product decisions
- Personal negotiations with key clients and suppliers
- Tastings, showroom, physical events
- Complex disputes between marketplace sides
- Legal, regulatory, tax decisions
- Final approval on payments above threshold
- Premium-segment supplier relationships

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
  pairing should be optional/contextual, not gating elsewhere.

The following must ALWAYS exist in the architecture:

- **Event emission on significant actions.** Supplier signed up, product
  created, order placed, payment received — every state change emits a
  structured event to `events_log`. Without this, automation is impossible.
- **Structured logs (JSON), not string console.log.** Every log entry has
  `trace_id`, `actor_id`, `event_type`. Machine-parseable from day one.
- **Feature flags for risky rollouts.** Any automation touching
  user-visible behavior or money goes behind a flag, allowing
  shadow/hybrid/autonomous progression without code changes.
- **AI calls through abstraction layer.** Even if we use Anthropic only,
  AI provider sits behind a thin interface (`lib/ai/client.ts`) so future
  switching costs are an interface change, not a rewrite.
- **Knowledge base accessible to agents.** Markdown files in `knowledge/`
  folder, version-controlled, queryable via RAG by chatbot and automations.

The marketing-focus lists for geography and buyer-side are for sales
priority and dataset coverage, not technical constraint.

---

## Who is building this

**Sergei** (founder) — 15+ years B2B distribution background. Pivoting from
cosmetics to HoReCa. Relocating to Amsterdam. Learning to code through this
project, using Cursor + Claude as primary dev tools.

**Business partner in Barcelona** — handles supply side, domain expertise
for Spanish HoReCa vocabulary and producer relationships.

**Looking for:** CTO equity partner, operational partner Barcelona, advisor.

---

## Strategic decisions log

### Business model & positioning

| Decision | Status | Rationale |
|---|---|---|
| Multi-vendor architecture from day one | Locked | Retrofit later would be costly |
| Hybrid bootstrapped → optional seed | Locked | Cashflow first, raise from traction |
| Amsterdam physical showroom | Planned | Trust + early revenue + on-platform supplier |
| AI features from launch | Locked | Differentiation, not future phase |
| AI-first operating model | Locked 2026-05-06 | 70% automation target year 1, 80%+ year 2 |
| 5-filter AI cascade | Spec done | price → cuisine → ratings → inventory → seasonality |
| Quality + Origin standard (not geographic) | Locked | Producer-to-buyer matching grid |
| Mediterranean as starting territory only | Locked | Open to producers from any country meeting standards |
| HoReCa as primary buyer focus only | Locked 2026-05-06 | Specialty retail / online stores welcomed architecturally |
| B2C out of MVP, deferred to Phase 8+ | Locked 2026-05-06 | Reconsider only after HoReCa B2B proven |
| Iriska.AI naming | Active | Trademark filed as "Iriska"; .AI as identity-magnet |
| Build self via Cursor + Claude API | Active | Save €50-70K vs outsourced |
| All docs/outputs in Russian by default | Active | English UI copy, but specs/analyses in Russian |
| Email: professional addresses on registered domain | Active | hello@iriska.ai, partners@iriska.ai. No gmail. |

### Tech stack

| Decision | Status | Rationale |
|---|---|---|
| Next.js 16 + Vercel + Supabase | Locked | Free-tier friendly, EU region, fast iteration |
| Tailwind v4 + brand token system | Locked | Burgundy/cream/linen, Newsreader display |
| Auth: Supabase Auth for MVP | Locked | Migrate to Clerk/Auth0 only if hit limits |
| Resend for transactional email | Locked 2026-05-06 | Best DX, React Email, free tier covers MVP |
| Sendcloud as carrier aggregator on MVP | Locked 2026-05-06 | 80+ EU carriers via one API |
| ShippingProvider abstraction layer | Locked | Future direct contracts plug in cleanly |
| Vercel Cron OR Supabase pg_cron | Pending decision | Both viable; pg_cron preferred for in-DB ops |
| Payments: Stripe vs Mollie | Pending | Mollie favored for NL/EU iDEAL/SEPA |
| i18n: next-intl from start | Locked 2026-05-06 | Add early to avoid hardcoded-strings retrofit |
| Sentry for error tracking | Locked 2026-05-06 | Free tier sufficient, 10-min Next.js setup |
| Pino structured logger | Locked 2026-05-06 | JSON logs, fast, machine-parseable |
| Vercel Flags Toolkit (feature flags) | Locked 2026-05-06 | Free, native Next.js, server-side flags |
| events_log table (Postgres LISTEN/NOTIFY) | Locked 2026-05-06 | In-Supabase event bus, no extra service cost |
| AI provider abstraction layer (single provider for now) | Locked 2026-05-06 | Anthropic only at MVP. Switch only if Anthropic insufficient or pricing changes materially. Thin interface, not multi-provider engineering. |

### AI integration & cost control

| Decision | Status | Rationale |
|---|---|---|
| Anthropic Claude API as primary LLM | Locked 2026-05-06 | No fine-tuning, prompt engineering + RAG approach |
| Hard monthly spend cap in Anthropic Console | Locked | Set on first deploy ($50 MVP, scaled later) |
| Per-user app-level quotas | Locked | Free tier 20 AI calls/day, Pro 200/day |
| Cloudflare Turnstile on signup forms | Locked | Free anti-bot on registration/login |
| B2B verification as primary abuse barrier | Locked | KVK/VAT verification + manual approval initially |
| Anomaly detection (rate spikes per user) | Phase 6 | Flag and pause if 10x normal usage |
| Cost analytics per AI feature | Phase 6 | Identify burn sources, optimize prompts |
| Claude Haiku for chatbot, Sonnet for analysis | Locked | 3x cheaper for narrow tasks |

### Logistics & compliance

| Decision | Status | Rationale |
|---|---|---|
| Alcohol excluded from MVP | Locked 2026-05-06 | EMCS/excise complexity. Phase 7+ via NL distributor |
| EU-only delivery on MVP | Locked | UK/Norway/Switzerland customs deferred to Phase 7+ |
| Temperature-aware routing | Locked | Core Iriska differentiation vs Faire/Choco |
| Catalog filtering by delivery feasibility | Locked | shipping_zones pre-computed, refresh weekly |
| Shipping cache TTL 15-30 min | Locked 2026-05-06 | Balance freshness vs API call cost |
| Shipping markup 10-15% on Sendcloud cost | Locked | Per logistics spec, our margin |
| Direct carrier contracts trigger | Defined | When GMV ≥ €15K/mo — switch to direct |

---

## AI integration philosophy

This section exists so any future AI session understands HOW we use AI on
Iriska, not just THAT we use it.

### What we don't do

- **We do not train or fine-tune LLMs ourselves.** Anthropic trains Claude.
  We use the API. Fine-tuning is reserved for Phase 7+.
- **We do not run our own LLM infrastructure.**
- **We do not maintain multi-provider AI integration on MVP.** Anthropic
  only, behind clean interface. Switch only if Anthropic becomes
  insufficient or unfavorable on price.

### What we do

**Three levels of integration, used progressively:**

**Level 1 — Prompt engineering (90% of AI features):**
- Send Claude API: system prompt + context + user query → response
- Cost: $0.005-0.04 per request (Sonnet) or $0.0005-0.002 (Haiku)
- "Improvement" = iterating on system prompts

**Level 2 — RAG (Retrieval-Augmented Generation):**
- For DB-aware answers, first SQL/API search relevant data
- Then send Claude: data + question → answer
- Most Iriska AI features are RAG

**Level 3 — Embeddings (semantic search, Phase 6.2+):**
- Vectors via pgvector or Pinecone, cosine similarity
- Use case: "find jamón with umami and nutty notes" matches semantically

### Where AI shows up in the product

| Feature | Phase | Level | Cost/call |
|---|---|---|---|
| Search by intent | 6.1 | Prompt + RAG | ~$0.01 |
| Auto-translation of product descriptions | 6.1 | Prompt | ~$0.005 |
| Menu analysis (upload menu → suggestions) | 6.2 | RAG | ~$0.10-0.30 |
| 5-filter recommendation cascade | 6.2 | RAG | ~$0.05 |
| Smart reorder predictions | 6.3 | Prompt + history | ~$0.01 |
| Quality score aggregation | 6.3 | RAG | ~$0.01 |
| Wine card optimization | 6.4 | RAG | ~$0.05 |
| Customer support chatbot widget | 4.6 | Prompt (Haiku) | ~$0.001 |
| Semantic search | 7+ | Embeddings | ~$0.0001 |

### Customer support chatbot (Phase 4.6)

Separate concern from menu-pairing AI. Narrow scope at launch:
- Lower-right corner widget on all pages
- Knows: platform features, navigation, FAQ, terminology (DOP, payment terms)
- Cannot: make purchases, modify orders, commit to terms
- Tech: Claude Haiku, knowledge base from `knowledge/` folder via RAG
- Escalation: out-of-scope queries → email handoff
- Anonymous OK on public pages, rate-limited per IP

### Abuse protection layers

1. **B2B registration verification** (handles 99%): KVK/VAT required, manual
   approval first 6 months
2. **Cloudflare Turnstile** on signup/login (free, blocks automation)
3. **Per-user quotas** in app DB: Free 20/day, Pro 200/day
4. **Per-IP rate limits** for anonymous chatbot: 10/hour
5. **Anomaly detection** (Phase 6): flag if usage > 10x baseline
6. **Vercel/Cloudflare** infrastructure DDoS protection

### Budget protection layers

1. **Anthropic Console hard monthly cap** ($50 MVP, scale later)
2. **Real-time alerts** if daily spend > threshold (Slack webhook)
3. **Per-feature cost tracking** in DB
4. **Tier optimization**: Haiku for narrow tasks, Sonnet for reasoning
5. **Prompt caching** (Anthropic feature) — 90% discount on cached tokens

---

## Current project state

### Completed phases

**Phase 1 — Initial landing (April 2026)**
- Next.js 16 + Vercel + GitHub repo `slush84/iriska`
- Brand system v1.0 applied
- Production: `iriska-inky.vercel.app`

**Phase 2A — Database backend (April 29)**
- Supabase Postgres, Frankfurt region
- 6 tables for GI dataset, RLS public-read, GIN indexes
- Loaded: 958 GI entries, 396 producers, 354 producer-GI links,
  487 price benchmarks, 364 heritage products

**Phase 2B — Catalog (May 1-4)**
- Typed Supabase client, paginated grid, filters with
  accent-insensitive search, detail pages

**Phase 2B.5 — Landing redesign (May 5)**
- Hero, live data band, How it works, Featured categories,
  For Suppliers preview, full /suppliers page

**Phase 2B.6 — Visual upgrade (May 5)**
- Editorial hero photo, Header/Footer applied to all pages, ISR

**Phase 2B.7 — Spacing polish (May 6)**
- ~30% denser vertical rhythm, professional B2B pacing

### Active phase

**(none — between phases, planning Phase 3)**

### Next phases (planned)

**Phase 3 — Supplier MVP (this week target)**

- **Phase 3.0:** i18n architecture setup (next-intl, English-only content,
  language-ready scaffolding) ~1 hour
- **Phase 3.0.5: AI-first foundations (NEW, locked 2026-05-06) ~3-4 hours**
  - Sentry setup (errors → central tracking)
  - Pino structured logger (JSON logs everywhere)
  - `events_log` table in Supabase (durable event store)
  - `lib/events/emit.ts` helper (used by every Server Action)
  - `lib/ai/client.ts` AI provider abstraction (Anthropic, single)
  - `lib/observability/` scaffold
  - `knowledge/` folder structure (markdown KB)
  - Vercel Flags Toolkit setup (server-side feature flags)
- **Phase 3.1:** Authentication (Supabase Auth, magic link, supplier/buyer
  user types, Cloudflare Turnstile on forms)
- **Phase 3.2:** Schema expansion (orgs, users, products, SKUs, taxonomy)
  + LOGISTICS FIELDS:
    - suppliers: pickup_address, pickup_zip, pickup_country,
      pickup_schedule, pickup_cutoff_time, lead_time_days,
      consolidation_capability, temperature_capabilities, sendcloud_sender_id
    - products: weight_kg, dimensions_cm, temperature_class, fragility,
      min_order_unit, min_order_quantity, packaging_options, shelf_life_days
  + EVENTS emitted for every supplier/product action from this phase
- **Phase 3.3:** Supplier dashboard (org profile, products list,
  CSV import, manual SKU editing, logistics info form)
- **Phase 3.4:** Public supplier profile pages
- **Phase 3.5:** Catalog evolution showing "X suppliers offer this"
- **Phase 3.6:** Sourcing requests (buyer asks for unlisted product)

**Phase 4 — Buyer MVP**

- Phase 4.1: Buyer onboarding (HoReCa, specialty retail, online retail —
  unified buyer flow, org_type as metadata)
- Phase 4.2: Multi-supplier cart
- Phase 4.3: Checkout shell
- Phase 4.4: Order tracking statuses
- Phase 4.5: **Logistics integration**
  - Sendcloud + ShippingProvider + routing engine
  - shipping_zones pre-computed, weekly refresh
  - Checkout UI with shipping options (split-by-temperature)
  - Sendcloud webhooks, tracking, cache 15-30 min TTL
- Phase 4.6: Email + customer support infrastructure
  - Resend setup, transactional templates via React Email
  - Customer support chatbot widget (Claude Haiku, narrow scope)

**Phase 5 — Trust + Localization**

- Phase 5.0: Localization rollout (Spanish first, then DE/NL/IT/FR/PT)
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

- Direct carrier contracts (DHL Freight, PostNL, GLS)
- Multi-stop consolidation
- Wine + alcohol return (NL-licensed distributor, EMCS, fiscal rep)
- UK post-Brexit customs, Norway, Switzerland
- Mobile apps (React Native)
- ERP integrations for top suppliers
- API access for advanced suppliers
- Embeddings semantic search
- Fine-tuning Claude on Iriska conversation history
- Multi-provider AI (only if Anthropic becomes unfavorable)

**Phase 8+ — New verticals**

- B2C extension evaluation (separate vertical, only if HoReCa proven and
  no brand dilution)
- Iriska Fulfillment Hub (Barcelona) — Ankorstore-style for small suppliers
- Trade event/tasting infrastructure

---

## Repository structure
iriska/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing
│   ├── catalog/                  # Catalog grid + detail pages
│   ├── suppliers/                # For Suppliers page
│   └── layout.tsx                # Root layout
├── components/                   # Shared components
├── lib/
│   ├── supabase/                 # Supabase client + generated types
│   ├── queries/                  # Data-fetching layer
│   ├── ai/                       # AI provider abstraction (3.0.5+)
│   ├── events/                   # Event emit helper + subscribers (3.0.5+)
│   ├── observability/            # Logger, Sentry config (3.0.5+)
│   ├── feature-flags/            # Vercel Flags wrapper (3.0.5+)
│   └── utils/
├── knowledge/                    # Structured KB (3.0.5+)
│   ├── faq.md
│   ├── policies/
│   ├── glossary/
│   └── workflows/
├── db/migrations/                # SQL migrations (idempotent)
├── public/
├── BRAND.md
├── AGENTS.md                     # This file
├── CLAUDE.md                     # Pointer to AGENTS.md
└── README.md
---

## Conventions in use

**Code style:**
- TypeScript strict mode, no `any` unless documented
- Server components by default, `'use client'` only when needed
- URL search params for filter state
- Absolute imports via `@/`

**Database:**
- Idempotent migrations
- RLS on all tenant tables
- Generated columns for derived values used in indexes
- Events emitted on every significant state change

**Observability:**
- Errors → Sentry
- Logs → Pino structured JSON
- Every log has `trace_id`, `actor_id`, `event_type`

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
- Before each session: read this file + check git log

**Known copy-paste pattern (workaround):**
- Multi-line `<a href="...">` tags often lose opening `<a>` when copied
  from chat to Cursor. Use RequestAccessButton component for mailto CTAs;
  inline external links — single-line format.

---

## IMPROVEMENTS (deferred, not blocking)

### Architectural

- **Commercial vocabulary layer:** HoReCa buyers search by commercial terms
  (iberico, cebo, bellota, manchego curado) but DB has formal DOP names.
  Decision needed: separate `commercial_terms` table vs hierarchy vs AI
  mapping. Coordinate with Barcelona partner.

- **Data quality enrichment:** 181/958 GI entries flagged `is_data_thin`.
  Solutions: AI batch via Claude API; producer scraping; supplier-driven
  natural improvement.

- **Non-Mediterranean GI registries:** Add Swiss AOP/IGP, UK PDO, Norwegian
  Beskyttede, Dutch/Belgian/German PDO as positioning expands.

- **Heritage producer table:** Producers without formal GI but meeting
  heritage criteria.

- **Quality certification taxonomy:** Slow Food Presidium, Bio EU, Demeter,
  curated panel exceptions.

- **Multi-stop consolidation logistics (Phase 7+):** Single truck pickup
  from multiple suppliers. Major margin lever.

- **Cron infrastructure decision:** Vercel Cron Hobby vs Supabase pg_cron.
  Decide before Phase 4.5.

- **Cold chain insurance review:** Standard parcel insurance may not cover
  food spoilage. Investigate before serious chilled volume.

- **Landing/suppliers copy refresh:** Current copy emphasizes HoReCa
  exclusively. Refresh for broader B2B audience while keeping HoReCa as
  primary marketing voice.

- **Faire/Ankorstore UX patterns adoption:** UX research doc identifies
  Tier-1 patterns (visual design, brand storytelling, multi-filter
  discovery, free first-order replacement, net payment terms, reorder
  workflows) and patterns to avoid (25% commission, margin filter).

- **Multi-provider AI support (Phase 7+ if needed):** Currently single
  provider (Anthropic) behind abstraction. Real multi-provider
  engineering only if Anthropic becomes insufficient or unfavorable.

- **Full agent tooling (shadow→hybrid→autonomous infrastructure):**
  Phase 6+ when first medium-cost-of-error automation goes live.

- **Knowledge base ownership process:** Currently single-maintainer
  (Sergei). When team grows, formalize who owns updates, review process,
  versioning convention.

### Quick wins

- **DB column slug** — generated column when GI table > 5K rows
- **Aliases not searched** — extend search to `aliases` column. ~15 min.
- **Logo aspect-ratio refactor** — switch to Next.js Image if raster needed
- **Tailwind v4 `@theme` lint warning** — Cursor false positive
- **Hero photo Next.js Image migration** — when more raster images appear

### Bugs

- **Data noise in GI names:** ~20 entries with annotations leaked into
  `primary_gi_name`. Single UPDATE pass.
- **Sticky 404 for some heritage GIs:** deeper testing of `is_data_thin`
  entries with nullable required fields.

---

## How to use this file

**For AI sessions:** Read this in full at session start. The "Strategic
decisions log", "AI-first operating principles", "AI integration
philosophy", and "Current project state" sections are most important —
don't re-litigate locked decisions.

**For Sergei:** Update this file when:
- A phase is completed
- A new strategic decision is made
- An IMPROVEMENT moves to active work or gets resolved
- A new convention emerges

The goal is that opening this file gives anyone (including future-you and
future-me) a complete picture of where Iriska is and why it's there in
under 5 minutes of reading.