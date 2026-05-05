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

Last meaningful update: 2026-05-05

---

## What Iriska is

**Iriska.AI** — AI-powered B2B procurement platform for HoReCa
(Hotel/Restaurant/Catering) sector. Marketplace play, not distributor.
Analogous to Booking.com for restaurant procurement.

**Tagline:** "The well-chosen list."

**Positioning (locked 2026-05-05):** Quality + Origin as the standard.
Not geographic. Products qualify by:
1. Protected designation (PDO/PGI/TSG/AOP/DOP/AOC/Suisse Garantie/etc.)
2. Heritage producer status (>50 years, single-family / consortium)
3. Recognized quality certification (Slow Food Presidium, Bio EU, Demeter, etc.)
4. Curated exception by Iriska panel (booming quality producers)

**Starting territory:** Mediterranean (Spain, Italy, France, Portugal, Greece) —
this is our origin point, openly stated. Expansion path: Alpine → Nordic →
British/Irish → Icelandic, by the same standard.

**Cross-EU sourcing model:** Not "import to your country" pattern. Quality
matters, not borders. Spain↔Spain (good jamón to Spanish restaurants who
otherwise buy mediocre), Spain↔Italy, Italy↔Portugal, full cross-flow grid.

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

| Decision | Status | Rationale |
|---|---|---|
| Multi-vendor architecture from day one | Locked | Retrofit later would be costly |
| Hybrid bootstrapped → optional seed | Locked | Cashflow first, raise from traction |
| Amsterdam physical showroom | Planned | Trust-building + early revenue + supplier on-platform |
| AI features from launch | Locked | Differentiation, not future phase |
| 5-filter AI cascade | Spec done | price corridor → cuisine fit → ratings → inventory → seasonality |
| Stack: Next.js 16 + Supabase + Vercel | Active | Free-tier friendly, EU region |
| Tailwind v4 + brand token system | Active | Burgundy/cream/linen, Newsreader display |
| Iriska.AI naming | Active | Trademark filed as "Iriska" alone; .AI keeps as identity-magnet |
| Auth: Supabase Auth for MVP | Planned | Migrate to Clerk/Auth0 only if hit limits |
| Payments: TBD Stripe vs Mollie | Pending | Mollie favored for NL/EU iDEAL/SEPA |
| Build self via Cursor + Claude API | Active | Save €50-70K vs outsourced |
| All docs/outputs in Russian by default | Active | English UI copy, but specs/analyses in Russian |
| Email: professional addresses on registered domain | Pending | No gmail. Setup when contact forms needed |

---

## Current project state

### Completed phases

**Phase 1 — Landing (April 2026)**
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
- 2B.3: Filters (country, category) + accent-insensitive search
  via `unaccent` extension and `primary_gi_name_search` generated column
  + pg_trgm GIN index for fast substring search
- 2B.4: `/catalog/[country]/[slug]` detail pages with producers and pricing

### Active phase

**(none — see Next phases)**

### Completed today (2026-05-05)

**Phase 2B.5 — Landing redesign**
- Hero: "Origin-driven sourcing for serious kitchens." + dual CTA
- Reusable RequestAccessButton component (fixes copy-paste artifact
  where multi-line `<a>` tags lost opening tag)
- Live data band with real BD counts (giCount, producerCount, etc.)
- How it works 3-step explainer
- Featured categories with real counts, links to filtered catalog
- For Suppliers preview section with partners@iriska.ai CTA
- Full /suppliers page (4 reasons, 4 onboarding steps, stats reminder)

**Phase 2B.6 — Visual upgrade + navigation polish**
- Editorial hero photo (sandwich/charcuterie on wooden board)
  in two-column layout (md:+ breakpoint)
- Section padding tightened (py-16 md:py-20) across all pages
- Reusable Header and Footer applied to /catalog and detail pages
- Restored <Link> wrapper on catalog cards (clickability regression)
- ISR revalidate directives on all pages:
  - Landing/suppliers: 3600s (hourly)
  - Catalog: 600s (10 min)
  - Detail pages: 3600s (hourly)

### Next phases (planned)

- Phase 2B.6 — Header/Footer/Navigation polish across all pages
- Phase 3.1 — Authentication setup (Supabase Auth, magic link)
- Phase 3.2 — Schema expansion (V003-V005 from larger backend architecture)
- Phase 3.3 — Supplier dashboard (organization profile, SKU CSV import)
- Phase 3.4 — Public supplier profile pages

---

## Repository structure
iriska/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing
│   ├── catalog/
│   │   ├── page.tsx              # Catalog grid
│   │   ├── _components/          # Filter / search components
│   │   └── [country]/[slug]/     # GI detail pages
│   └── layout.tsx                # Root layout, font loading
├── components/                   # Shared components (Logo, etc.)
├── lib/
│   ├── supabase/                 # Supabase client + generated types
│   ├── queries/                  # Data-fetching layer
│   └── utils/                    # slugify, etc.
├── db/migrations/                # SQL migrations (idempotent)
├── public/brand/                 # Logo SVG variants
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

---

## IMPROVEMENTS (deferred, not blocking)

Non-strategic enhancements parked for later. Don't interrupt structural
buildout to fix these — they're tracked here for systemic resolution when
the time is right.

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
  Beskyttede, etc. as positioning expands beyond Mediterranean.

- **Heritage producer table:** For producers without formal GI but meeting
  heritage criteria.

- **Quality certification taxonomy:** Slow Food Presidium, Bio EU, Demeter,
  curated Iriska panel exceptions.

### Quick wins (when convenient)

- **DB column slug** — generated column for GI slugs when table > 5K rows
- **Aliases not searched** — extend search to use `aliases` column alongside
  `primary_gi_name_search`. Quick win, ~15 min.
- **Logo aspect-ratio refactor** — currently native `<img>`, switch to
  Next.js `Image` if raster logos needed
- **Tailwind v4 `@theme` lint warning** — Cursor false positive, will resolve
  with editor update

### Bugs (small, non-blocking)

- **Data noise in GI names:** ~20 entries have annotations leaked into
  `primary_gi_name` (e.g. "Andouille — French; not in Spain section").
  Fix: single UPDATE pass.
- **Sticky 404 for some heritage GIs:** needs deeper testing of `is_data_thin`
  entries that have nullable required fields.

---

## How to use this file

**For AI sessions (Claude, Cursor, others):** Read this in full at the start
of any new session before making code suggestions. The "Strategic decisions
log" and "Current project state" sections are most important — don't
re-litigate decisions already locked.

**For Sergei:** Update this file when:
- A phase is completed (move from "Active" to "Completed")
- A new strategic decision is made
- An IMPROVEMENT moves to active work or gets resolved
- A new convention emerges that future sessions should follow

The goal is that opening this file gives anyone (including future-you and
future-me) a complete picture of where Iriska is and why it's there in
under 5 minutes of reading.