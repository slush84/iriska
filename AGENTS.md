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

Last meaningful update: 2026-05-08 (financial architecture + B2C pivot +
multi-location + supplier rating model)

---

## What Iriska is

**Iriska.AI** — pan-European cross-border premium delicatessen platform.
Hybrid B2B+B2C model serving HoReCa, specialty retail, online retail, and
direct consumers across Europe. Marketplace mechanics, but positioned as a
curated network of quality producers, not a generic transactional surface.

**Tagline (current primary):** "The well-chosen list."

**Positioning (locked 2026-05-05, refined through 2026-05-08):** Quality +
Origin as the standard. Not geographic. Products qualify by:
1. Protected designation (PDO/PGI/TSG/AOP/DOP/AOC/Suisse Garantie/etc.)
2. Heritage producer status (>50 years, single-family / consortium)
3. Recognized quality certification (Slow Food Presidium, Bio EU, Demeter, etc.)
4. Curated exception by Iriska panel (booming quality producers)

**Geography model:** Iriska is NOT a pickup-to-delivery corridor. It is a
producer-to-buyer matching grid where ANY qualified producer in any
participating country sells to ANY qualifying buyer in any participating
country. Geography determines logistics cost and feasibility, not platform
eligibility.

**Y1 launch sequence (calendar locked):** ES + NL primary at M0 → FR at M4
→ IT at M6 → DE at M9. NL is primary B2C market (founder localization,
higher AOV, undersupplied premium iberian/mediterranean segment).

**Initial supplier focus (marketing/business framing, NOT architectural
constraint):** Mediterranean producers — Spain (ES), Italy (IT), France (FR),
Portugal (PT), Greece (GR). This is where the GI dataset coverage is
strongest at launch and where the founder's supply-side network operates.
Producers from any country meeting quality standards are welcomed
architecturally.

**Initial buyer focus (marketing/business framing, NOT architectural
constraint):** Northern Europe — Netherlands (NL), Belgium (BE), Germany
(DE), Denmark (DK), Austria (AT), Norway (NO), Sweden (SE), Poland (PL),
Czech Republic (CZ). Plus full cross-flows: any participating country buys
from any participating country (ES↔ES, ES↔IT, IT↔PT, etc.).

**Buyer-side model — B2B+B2C HYBRID (locked 2026-05-08):** Iriska serves
both B2B and B2C from Y1, by strategic decision. B2C drives early traffic
and visible growth (B2B grows slowly through founder-led sales); B2B
provides margin and long-term retention. The two channels share catalog
infrastructure but have separate pricing tiers (see Pricing Architecture).

Buyer types served:
- **HoReCa** (B2B, primary marketing focus): restaurants, hotels,
  catering, dark kitchens — multi-location architecture, deferred
  payment availability, menu pairing UX
- **Specialty retail** (B2B): wine shops, gourmet stores, deli, cheese shops
- **Online retail** (B2B): e-commerce gourmet stores, subscription boxes
- **Concept stores / B2B2C** (B2B): design boutiques carrying food
- **Direct consumers** (B2C): individual buyers via consumer accounts,
  destination VAT, 15% effective commission

**Underlying mission:** open small quality producers to a wider audience
(B2B + B2C combined), letting them compete on organoleptic and craft
advantage rather than volume or marketing spend.

**Categories at Y1 launch:** All 11 categories from current dataset
(charcuterie, cheese, EVOO, honey, seafood/conservas, spices/salt/herbs,
rice/pasta/grains, wine and others). Wine excluded from active commercial
operations until Y2 (excise/EMCS/fiscal-rep complexity), but stays in
catalog for discovery/dataset value.

**No physical showroom in Y1.** Earlier Amsterdam showroom plan dropped
(2026-05-08). Trust-building shifts to digital (verification badges,
producer storytelling, transparent quality scores) and selective
physical events (Madrid Fusión, Alimentaria, TuttoFood, SIAL).

**Domain:** `iriska.ai` is the single primary domain (locked 2026-05-08).
B2B and B2C share the same domain with role-based view switching after
auth or via `/pro` path for HoReCa surface. `iriska.app` reserved as
brand-protection redirect to `iriska.ai`. The `.ai` extension is an
identity signal at launch; we expect it to commoditize over 3-5 years
but by then Iriska is brand-established and won't migrate.

**Expansion path beyond M9:** smaller EU markets with localization
(German, Dutch, Spanish, Italian, French, Portuguese UI). UK post-Brexit,
Switzerland, Norway non-EU shipping — Phase 7+.

---

## AI-first operating principles

Iriska is built as an AI-first organization, not a traditional company that
adds AI features. Automation and intelligent agents are designed into
operations from day one. The principles below are operational truth, not
aspiration.

### Targets (year 1 baseline)

- **Automation rate:** 70% minimum of repeatable operations executed without
  human intervention by end of year 1. Aspire to 80%+.
- **Time-to-resolution:** <15 min for 80% of operational incidents.
- **Sub-linear headcount-to-revenue growth.**

### The ten principles (compressed)

1. **API-first for every process.** Every operational procedure is designed
   "agent does, human escalates" from the start.
2. **Observability from day one.** Sentry + structured logs + custom
   dashboards are MVP-level infrastructure.
3. **Formalized escalation rules** for each automated process: what the
   agent does, what it escalates, to whom, in which channel, with what SLA.
4. **Human-in-the-loop where cost-of-error is high.** Boundary explicit
   and reviewed at scale.
5. **Knowledge base as source of truth.** Processes, policies, FAQ,
   workflows in `knowledge/` accessible to agents and humans.
6. **Use what exists, don't build commodity.** Mollie/Revolut/PayPal/Stripe
   for payments, Supabase for auth/DB/storage, Resend for email, Sendcloud
   for shipping, Quaderno for invoicing. Differentiation built; commodity
   rented.
7. **Hiring triggered by metrics, not calendar.** Each role passes the
   test: "automation or contractor — what's the 24-month cost difference?"
8. **Contractors over hires for one-off work.** Security audit, payments
   audit, legal, financial audit — top experts on contract.
9. **AI is a product feature AND an operational layer.** 5-filter cascade
   is core product value; same infrastructure serves internal operations.
10. **Every employee is a leverage point.** Hires only for roles that
    cannot be automated or that deliver disproportionate growth.

### Rollout pattern by cost-of-error

NOT every automation goes through shadow→hybrid→autonomous. Pattern depends
on cost-of-error:

**HIGH** (irreversible, financial, legal, brand damage):
- Examples: payments above threshold, refunds, public auto-replies,
  catalog price modifications, account suspensions, KYC final decisions
- Pattern: permanent human-in-the-loop OR full shadow→hybrid→autonomous
  with explicit promotion criteria

**MEDIUM** (recoverable but user-visible):
- Examples: reorder predictions, sourcing matching, translations,
  supplier matching, email routing, AI recommendations
- Pattern: shadow → hybrid → autonomous

**LOW** (trivial, easily reversible, no user-facing harm):
- Examples: search ranking, caching decisions, log classification,
  alert triage
- Pattern: skip shadow, autonomous + monitoring + rollback

### What automates from day one (vs human-only)

**Automates:**
- Supplier onboarding: VIES validation, registry checks, document KYC
  via Claude Vision, certifications matching, risk scoring
- Customer support tier 1-2: chatbot widget for orders/shipping/FAQ
- Financial ops: payment reconciliation via Mollie webhooks, commission
  calculation, supplier payouts SEPA, dual invoice generation (Quaderno)
- Operations monitoring: SLA alerts, payment reconciliation, catalog sync
- Marketing: email campaigns (Resend), segmentation, dormant activation
- Analytics: dashboards for team, suppliers, buyers — auto-generated
- AI cascade as product: recommendations, substitutions, seasonality,
  AI-RRP indicator
- HR (when relevant): candidate screening, scheduling, doc generation

**Human-only (now and likely permanently):**
- Strategy, vision, key product decisions
- Personal negotiations with key clients and suppliers (Reserva Ibérica,
  Nandu Jubany, premium-segment producers)
- Tastings and physical events (Madrid Fusión, Alimentaria, etc.)
- Complex disputes between marketplace sides
- Legal, regulatory, tax decisions
- Final approval on payments above threshold (>€5K)
- Verification decisions ONLY in conflict cases (AI uncertain or signals
  contradict) — clean cases auto-approve/auto-reject

**Founder verification review trigger:** Currently estimated at 1-3
hours/year on Y1 supplier volume (~200 suppliers × ~10-15% conflict-flag
rate × 5 min review). Hiring trigger: when founder review exceeds
5h/month, hire part-time ops specialist.

---

## Architectural principles (anti-patterns to avoid)

The following must NEVER appear in database schema or code:

- **No `pickup_country` or `delivery_country` enum/column** — `country_code`
  on organizations is just a country, not a role label.
- **No hardcoded list of "supplier countries" vs "buyer countries"** — every
  EU country code is equally valid for either role.
- **No business logic that filters orgs by country before role check** —
  role is determined by `org_type` (supplier/buyer/consumer), country is
  metadata.
- **No assumption that "Mediterranean = supplier side" in code.** Marketing
  copy may emphasize Mediterranean as starting focus, but database queries,
  routing logic, catalog filtering, and shipping calculations must be
  country-agnostic.
- **No `buyer_type = 'horeca'` enum-only constraint** — buyer org_type is
  metadata; specialty retail / online retail / concept stores all welcomed.
- **No HoReCa-specific UI lock-in early in flow** — features like menu
  pairing should be optional/contextual, not gating.
- **No person-level B2B/B2C exclusivity.** Same User can be Member of a
  HoReCa Organization (B2B context) AND have a Consumer account (B2C
  context). Anti-abuse handled at verification layer, not account
  architecture.

The following must ALWAYS exist in the architecture:

- **Event emission on significant actions.** Every state change emits a
  structured event to `events_log`. Without this, automation is impossible.
- **Structured logs (JSON), not string console.log.** Every log entry has
  `trace_id`, `actor_id`, `event_type`. Machine-parseable from day one.
- **Feature flags for risky rollouts.** Any automation touching user-visible
  behavior or money goes behind a flag.
- **AI calls through abstraction layer.** Even single-provider (Anthropic
  only at MVP), AI provider sits behind `lib/ai/client.ts` interface.
- **Knowledge base accessible to agents.** Markdown in `knowledge/` folder,
  version-controlled, queryable via RAG.
- **Three-tier data hierarchy: User → Organization → Locations.** B2B
  buyers always have an Organization (verified legal entity); Organizations
  always have one or more Locations (delivery destinations). User can be
  Member of multiple Organizations (rare but supported).

---

## Account architecture (multi-location B2B + consumer)

Locked 2026-05-08. This is the core data model for buyers.

### Hierarchy

```
User (person, has email/phone, belongs to one or more contexts)
 │
 ├── Consumer Account (B2C context)
 │    - Email/phone verification only
 │    - Personal addresses, payment methods
 │    - 15% effective commission, destination VAT, B2C list pricing
 │
 └── Organization Memberships (B2B context, can have 0..N)
      └── Organization (verified legal entity: KvK/CIF/SIRET/HRB, VAT)
           ├── Locations[] (delivery points)
           │    ├── Location A: address, delivery contact, hours, billing
           │    ├── Location B: address, delivery contact, hours, billing
           │    └── Location C: ...
           │
           └── Members[] (Users with roles within Organization)
                ├── Owner — full access, all locations, billing control
                ├── Manager — orders for assigned locations, no billing
                └── Buyer — order placement only, assigned locations
```

### Key principles

1. **One Organization = one business verification.** KYC, KvK/CIF/SIRET,
   VAT, food safety registration done once at Organization level.
   Subsequent locations added without re-verification.

2. **Order context = Location-specific.** At checkout, buyer selects
   destination location. Each order tied to specific Location (delivery
   address, opening hours for slot picker, location-specific deferred
   payment if applicable).

3. **Single basket, split delivery — Y2+.** In Y1: one order = one
   location. Multi-location split shipping with single basket — M9+
   feature, not in MVP.

4. **Billing flexibility:**
   - Default: single invoice on Organization, payment from
     organization-level method
   - Optional Y2+: per-location invoicing for chains needing
     per-location P&L
   - Deferred payment limits applied at Organization level (shared
     credit limit) — never per-location, anti-abuse

5. **Analytics & reporting:**
   - Owner: aggregate across all locations + per-location drill-down
   - Manager: only assigned locations
   - Per-location reporting is core value-add for chains

6. **Pricing & commission:**
   - 8% B2B effective commission applied at Organization level regardless
     of location count
   - Volume discounts (if any) aggregate across Organization
   - Incentive for chains: consolidate purchasing through Iriska

### Multi-account by same User (B2B + B2C)

**Allowed and expected.** Chef-owner of HoReCa Organization can also have
personal Consumer Account for home purchases. Two separate transactions,
two separate contexts, two different commission rates and VAT logics —
both legitimate.

**Anti-abuse mechanism: at verification layer, not account architecture.**
- Consumer Account: email/phone verification, no business KYC
- Organization Membership: requires verified Organization (KvK/CIF/SIRET +
  VAT + food safety)
- Architecture allows both, verification controls who gets B2B pricing

### Edge cases

- **Independent franchisees of same brand:** Each legal entity is its own
  Organization. Not auto-grouped.
- **Group buying** (independent restaurants wanting aggregator pricing):
  Y2+ feature, not in MVP.
- **Location-level user invitations:** Owner can invite local Manager
  without full chain access.

---

## Pricing architecture

Locked 2026-05-08. Architecture B (Wildberries-style, commission deducted
from supplier price, not added on top).

### Commission rates (effective on GMV)

- **B2B:** 8% effective. Customer pays €100 → Iriska keeps €8 → supplier
  receives €92 (before destination VAT logic).
- **B2C:** 15% effective. Customer pays €100 → Iriska keeps €15 →
  supplier receives €85 (before destination VAT logic).

### T&C-enforced pricing rules (anti-cannibalization)

1. **20% gap minimum** between supplier wholesale (B2B base) and supplier
   B2C list price.

   **Mathematical justification:** B2C take rate (15%) > B2B take rate
   (8%). Without minimum gap, supplier margin in B2C would be lower than
   in B2B, killing supplier incentive to list/promote in B2C channel.
   20% gap ensures B2C net margin > B2B net margin for supplier.

   Example without 20% gap:
   - B2B price €100 → supplier net €92 (8% Iriska)
   - B2C price €105 → supplier net €89.25 (15% Iriska)
   - Supplier abandons B2C — kills the channel

   Example with 20% gap (T&C-enforced):
   - B2B price €100 → supplier net €92 (8% Iriska)
   - B2C price €120+ → supplier net €102+ (15% Iriska)
   - Supplier active in both channels — Iriska's higher B2C take rate
     compensated through price differentiation, not margin sacrifice

2. **Supplier net minimum +5% above wholesale** in B2C (after Iriska
   commission and destination VAT). Floor protection — even with adverse
   destination VAT scenarios, supplier never earns less in B2C than B2B.

3. **AI-RRP indicator** (Phase 3.6 simple math, Phase 6.x AI competitor
   parsing): green / yellow / red zones based on supplier B2C list vs
   market benchmarks. Ranking boost for green-zone listings. Phase 6.x
   includes parsing of competitor listings (e.g., barcode-matched
   Joselito 200g sliced) and Iriska-set baseline competitors.

4. **No Iriska-funded discounts.** Supplier-driven promotions only.

---

## Rating system

Locked 2026-05-08. Logarithmic, soft, recovery-favoring.

### Customer (Organization) rating

**Initial state:** "Unrated" (NOT 3 stars). First 3 transactions prepaid
only.

**Unlock progression:**
- After 3 prepaid successful: 3.0 stars + net-15 unlocked
- After 5 successful: 4.0 stars + net-30 unlocked
- After 8-10 successful: 4.85 stars + net-45 unlocked
- After 11-15 successful: 5.0 stars + net-60 unlocked

**Premium fast-track:** Creditsafe credit check (€50-150) optionally
unlocks net-15/net-30 immediately for verified creditworthy buyers.

**Penalties (cumulative, gradual):**
- Day +3 late: -0.25 rating
- Day +7 late: -0.5 cumulative
- Day +14 late: -1.0 cumulative
- Day +21 late: -1.5 cumulative
- Day +30 late: -2.0 + account suspension

30-day grace period before account suspension. Recovery curves favor
cure-and-continue (rating recovers as payment behavior normalizes).

**Communication tone: supportive, not punitive.**

**Founder review trigger:** cases >€5K AND >Day +21.

### Multi-location rating attribution

Locked 2026-05-08. Both Organization and Location have ratings.

```
Location rating  = independent metric per delivery point
                   (formed by orders to that specific location)

Organization rating = volume-weighted average of all Location ratings
                      (aggregate metric)

Trust decisions (deferred payment, suspension, credit):
  Default basis: Organization aggregate rating
  
  Supplier discretion override:
  - Supplier sees per-location ratings in their dashboard
  - Supplier can decide per-shipment: "I ship net-30 to Locations A, B,
    C (each 4.5+), but require prepaid for Location D (rating 2.0)"
  - Iriska enables this granular control via supplier UI

Org-level enforcement when math forces it:
  Example 1 — large chain, isolated problem:
    10 locations: 1 problematic (rating 2.0) + 9 healthy (4.8 avg)
    Org weighted avg ≈ 4.5+ → deferred payments stay enabled
    Supplier decides shipment-by-shipment using per-location data
  
  Example 2 — small chain, balanced damage:
    2 locations: 1 problematic (2.0) + 1 healthy (5.0)
    Org weighted avg ≈ 3.5 → BELOW 4.0 threshold
    Entire Organization loses deferred payment privileges
    Both locations affected — math forces this, no "healthy
    majority" to dilute the problem

Penalty propagation: applied at Location level (issue at Location B
  → Location B rating drops). Then weighted average to Organization.
  No special cases in code — natural arithmetic.
```

### Supplier rating

Hybrid model:

```
Supplier rating = volume-weighted average of product ratings
                  × soft operational multiplier

Operational multiplier components (cumulative, capped 0.7-1.1):
  Base 1.0
  +0.05 for on-time delivery > 95%
  -0.05 for on-time delivery < 85%
  -0.10 for dispute rate > 5%
  -0.10 for response time > 48h on inquiries
  -0.15 for late documentation submission
  -0.30 for KYC/VAT lapse
  Capped at 0.7 minimum, 1.1 maximum
```

**"Soft" multiplier:** operational issues correct, never dominate.
Product quality remains the foundation. Supplier with great products and
moderate operational issues stays viable; supplier with poor products
cannot be saved by perfect operations.

---

## Verification & onboarding (AI-first)

Locked 2026-05-08. ~€1K total Y1 cost.

### Mandatory documents at supplier onboarding

- Company registration (KvK, CIF, SIRET, HRB, etc.)
- VAT certificate (validated via VIES API real-time)
- OSS confirmation (where applicable)
- Bank account verification (SEPA name match)
- Director ID (Onfido or Veriff, €2-3 per check)
- Food safety registration:
  - **ES:** RGSEAA (Registro General Sanitario)
  - **IT:** ASL/SIAN registration
  - **FR:** Numéro d'agrément sanitaire
  - **NL:** NVWA registration
  - **DE:** Lebensmittelunternehmer registration
- DOP/PDO/IGP certificates (where claimed) — auto-validated against
  eAmbrosia API, badges applied automatically

**No insurance certificates required in Y1** (added compliance burden
for marginal risk reduction).

### Auto-verification stack

- **VIES API** (free): EU VAT validation
- **SEPA name validation** (Mollie/Revolut): bank account ownership
- **Onfido or Veriff** (€2-3/check): government ID verification
- **Companies registries:**
  - KvK (NL): €0.30 per query
  - INSEE (FR): free
  - Camera di Commercio (IT): €2-5 per query
  - Handelsregister (DE): €1.50 per query
- **eAmbrosia DOP API** (free): EU geographical indication validation
- **Claude Vision** (~€0.50 per supplier): document review (food safety
  certificates, registry extracts, ID consistency)

### AI risk engine

Combines all signals → produces verdict:
- **Auto-approve** (clean signals, ~70-80% of suppliers)
- **Auto-reject** (clear failures: invalid VAT, mismatched names, expired
  food safety, ~5-10% of suppliers)
- **Flag for founder review** (conflict cases, AI uncertain, signals
  contradict, ~10-15% of suppliers)

**Founder review only handles the conflict-flag bucket.** Everything else
is fully automated end-to-end. Y1 estimate: 1-3 hours/year founder time
on verification (200 suppliers × 15% × 5 min). Hiring trigger: >5h/month
→ part-time ops.

### Document storage

**Supabase Storage** (locked 2026-05-08). Security adequate:
- AES-256 encryption at rest
- TLS 1.3 in transit
- Row Level Security policies for access control
- GDPR compliant (EU regions, Frankfurt by default)
- SOC 2 Type II certified
- Signed URLs for time-limited document access
- 10-year retention policy

No new vendor needed (already in our stack). AWS S3 migration considered
only if scale exceeds 100GB or multi-region replication required (Phase 7+).

### Certifications database

Static internal database, ~80-120 entries:
- DOP/PDO: Manchego, Idiazabal, Cabrales, Mahón-Menorca, Roncal, Garrotxa,
  Tetilla, Jamón de Guijuelo, Jamón de Huelva, Salchichón de Vic, all
  Spanish/Italian/French DOP olive oils, etc.
- PGI: Fuet de Vic, regional charcuterie, etc.
- Food safety: BRCGS, IFS, FSSC 22000
- Organic: EU_Organic, Demeter
- Heritage: Slow Food Presidium, regional consortia

Setup: 4-6 hours one-time. Quarterly manual refresh: 1-2 hours.
eAmbrosia API as secondary live verification (free).

**€0 incremental cash cost** — internal data, version-controlled in
`knowledge/certifications/`.

---

## Payments & payouts

Locked 2026-05-08.

### Payment processing stack

| Method | Use case | Cost | Phase |
|---|---|---|---|
| **Mollie** (primary) | NL hometown, iDEAL critical (60% NL B2C conversion), marketplace split-payments | per provider rates | M0 |
| **Revolut Business + Revolut Pay** | EU consumer cards | 1% + €0.20 | M0 |
| **PayPal Reference Transactions** | Restaurants without card processing | 2.9% + €0.35 | M0-M3 |
| **SEPA Direct Debit B2B** (opt-in) | Restaurants willing to set up bank mandate | €0.25 fixed | M0-M3 |
| **Stripe** (backup) | International expansion fallback | per Stripe rates | M6+ |

**SEPA Core EXCLUDED** — 8-week chargeback risk unacceptable for
marketplace.

**Y1 blended processing rate: ~0.90% of GMV** (savings vs Stripe-only:
~€28K Y1).

### Payout structure

| Speed | Cost to supplier | Auto/Manual | Notes |
|---|---|---|---|
| **Standard T+5 working days** | Free | Fully automated SEPA | Default |
| **Fast Payout T+2** | €4.99 + 0.25% | Automated | No threshold |
| **Express Payout T+1** | €9.99 + 0.5% | Automated | No threshold |

**No same-day payout in Y1.**

**Y1 fast/express revenue estimate: ~€50-60K** (new revenue line).

**Float income setup deferred to Y2** (treasury management complexity).

---

## Deferred payment B2B (HoReCa, M5-M6 launch)

Locked 2026-05-08. Supplier-financed model — Iriska bears NO credit risk.

### Architecture

- **Payment methods accepted:**
  - Card pre-auth (primary) — restaurant authorizes card, supplier captures
  - PayPal Reference Transactions (secondary)
  - SEPA Direct Debit B2B opt-in (tertiary, NOT SEPA Core)
- **SEPA Core EXCLUDED** (8-week chargeback risk unsuitable)

### Pricing structure

- **5% upfront "Platform & Financing Fee"** charged to restaurant (hides
  the underlying 8% commission split between Iriska and supplier financing
  share)
- **Interest tiers (paid by restaurant):**
  - Net-15: 1.25%
  - Net-30: 1.75%
  - Net-45: 2.25%
  - Net-60: 2.75%
- **Iriska keeps 0.25% of interest** (positioned as processing fee, not
  credit risk premium — Iriska is technical platform only)
- **Supplier interest share:**
  - Net-15: 1.0%
  - Net-30: 1.5%
  - Net-45: 2.0%
  - Net-60: 2.5%

### Legal positioning

- **T&C explicit:** Supplier bears 100% credit risk; Iriska is technical
  platform only; liability cap €1,000 per transaction; indemnification
  clauses protect Iriska
- This positioning is critical — it's why Iriska does NOT need MiFID/PSD2
  credit licensing in Y1

### Y1 adoption forecast

- M5 launch: 12% of B2B orders use deferred
- M12: 42% of B2B orders use deferred
- Incremental Iriska revenue Y1: ~€1.2-1.8K (negligible Y1, scales Y2+)

---

## VAT & tax architecture

Locked 2026-05-08.

### Entity & registrations

- **NL B.V.** as primary entity (Iriska Holdings B.V. or similar)
- **OSS registration** (One-Stop Shop) for Iriska
- **Destination-based VAT:** customer's country VAT rate applies

### Article 14a (EU VAT Directive) — Iriska is NOT deemed supplier

- 95%+ of Iriska suppliers are EU-established (VIES validated)
- Per Article 14a + Amazon precedent, marketplace is NOT deemed supplier
  for VAT purposes
- Implication: Supplier remains the seller of record for VAT; Iriska only
  invoices commission

### Iriska commission invoicing

- **Intra-EU (most cases):** 0% reverse charge (VIES validated supplier)
- **NL suppliers:** 21% NL VAT applied
- **Non-EU suppliers (rare):** case-by-case

### Y1 net VAT position

**~€10-20K refund favorable** (Iriska pays NL VAT on operations, recovers
via OSS reverse charge mechanics).

### July 2027 ViDA changes

- ViDA (VAT in the Digital Age) makes marketplaces deemed suppliers for
  EU sales starting July 2027
- This is **pass-through, not payable cost** — Iriska collects and remits
  VAT on supplier's behalf, supplier's net economics unchanged
- Architecture handles this transition: dual invoice system already
  separates supplier→customer flow from Iriska→supplier (commission)

### Independent NL accountant audit

Pre-launch confirmation completed. Setup €500-1000, ongoing €400-800/mo.

### Tax jurisdiction strategy

**No Cyprus / Ireland / other low-tax jurisdictions in Y1-Y2.** Substance
requirements + ATAD blocks treaty shopping. Y3+ reconsider if profit
exceeds €1M and structure justifies setup cost.

---

## Invoice automation

Locked 2026-05-08.

### Required supplier data at onboarding

- VAT number (VIES validated real-time)
- Legal name
- Full address
- Tax jurisdiction
- Default VAT rates per SKU (varies by country and product type)

### Two invoices per transaction (auto-generated)

1. **Supplier → Customer:** Full transaction with correct destination VAT
   logic (depends on customer location and B2B/B2C status)
2. **Iriska → Supplier:** Commission only, with reverse charge or NL VAT
   per supplier jurisdiction

### Tech stack

- **Quaderno** (€49/mo): VAT compliance, invoice generation, OSS reporting
- **Custom integration** in Iriska platform: triggers Quaderno via API on
  order events
- **Bookkeeping: Exact Online** (€30/mo) — NL standard accounting software

### Y1 cost & dev

- Y1 invoice automation cost: ~€1,500
- Initial dev: 40-60 hours in Phase 3.0.5 (foundation) + Phase 3.6
  (full activation)

---

## AI integration philosophy

This section exists so any future AI session understands HOW we use AI on
Iriska, not just THAT we use it.

### What we don't do

- **We do not train or fine-tune LLMs ourselves.** Anthropic trains Claude.
  We use the API. Fine-tuning reserved for Phase 7+.
- **We do not run our own LLM infrastructure.**
- **We do not maintain multi-provider AI integration on MVP.** Anthropic
  only, behind clean interface. Switch only if Anthropic becomes
  insufficient or unfavorable on price.

### What we do — three levels

**Level 1 — Prompt engineering** (90% of AI features):
- Send Claude API: system prompt + context + user query → response
- Cost: $0.005-0.04 per request (Sonnet) or $0.0005-0.002 (Haiku)
- "Improvement" = iterating on system prompts

**Level 2 — RAG (Retrieval-Augmented Generation):**
- DB-aware answers: SQL/API search relevant data first, then send to Claude
- Most Iriska AI features are RAG (5-filter cascade, menu pairing, etc.)

**Level 3 — Embeddings** (semantic search, Phase 6.2+):
- Vectors via pgvector or Pinecone, cosine similarity
- "Find jamón with umami and nutty notes" matches semantically

### Where AI shows up in the product

| Feature | Phase | Level | Cost/call |
|---|---|---|---|
| Document verification (Claude Vision) | 3.0.5 | Prompt + Vision | ~$0.50/supplier |
| Search by intent | 6.1 | Prompt + RAG | ~$0.01 |
| Auto-translation of product descriptions | 6.1 | Prompt | ~$0.005 |
| AI-RRP indicator (competitor parsing) | 6.x | RAG + scraping | ~$0.05 |
| Menu analysis (upload menu → suggestions) | 6.2 | RAG | ~$0.10-0.30 |
| 5-filter recommendation cascade | 6.2 | RAG | ~$0.05 |
| Smart reorder predictions | 6.3 | Prompt + history | ~$0.01 |
| Quality score aggregation | 6.3 | RAG | ~$0.01 |
| Wine card optimization | 6.4 | RAG | ~$0.05 |
| Customer support chatbot widget | 4.6 | Prompt (Haiku) | ~$0.001 |
| Semantic search (embeddings) | 7+ | Embeddings | ~$0.0001 |

### Customer support chatbot (Phase 4.6)

- Lower-right corner widget on all pages
- Knows: platform features, navigation, FAQ, terminology (DOP, payment
  terms, deferred logic)
- Cannot: make purchases, modify orders, commit to terms
- Tech: Claude Haiku, knowledge base from `knowledge/` via RAG
- Escalation: out-of-scope queries → email handoff to hello@iriska.ai
- Anonymous OK on public pages, rate-limited per IP

### Abuse protection layers

1. **B2B registration verification** (handles 99%): KvK/CIF/SIRET + VAT +
   food safety + AI risk engine
2. **Cloudflare Turnstile** on signup/login (free anti-bot)
3. **Per-user quotas:** Free 20/day, Pro 200/day
4. **Per-IP rate limits** for anonymous chatbot: 10/hour
5. **Anomaly detection** (Phase 6): flag if usage > 10x baseline
6. **Vercel/Cloudflare** infrastructure DDoS

### Budget protection layers

1. **Anthropic Console hard monthly cap** ($50 MVP, scale later)
2. **Real-time alerts** if daily spend > threshold (Slack webhook)
3. **Per-feature cost tracking** in DB
4. **Tier optimization:** Haiku for narrow tasks, Sonnet for reasoning
5. **Prompt caching** (Anthropic feature) — 90% discount on cached tokens

---

## Strategic decisions log

### Business model & positioning

| Decision | Status | Rationale |
|---|---|---|
| Multi-vendor architecture from day one | Locked | Retrofit later costly |
| Hybrid bootstrapped → optional seed | Locked | Cashflow first |
| **B2B+B2C hybrid from Y1** | **Locked 2026-05-08** | **B2C drives early traffic; B2B grows slowly** |
| All 11 categories at launch (wine excluded operationally) | Locked 2026-05-08 | Catalog as is, no narrowing |
| No physical showroom in Y1 | Locked 2026-05-08 | Trust via digital + selective events |
| AI features from launch | Locked | Differentiation, not future phase |
| AI-first operating model | Locked | 70%+ year 1, 80%+ year 2 |
| 5-filter AI cascade | Spec done | price → cuisine → ratings → inventory → seasonality |
| Quality + Origin standard (not geographic) | Locked | Producer-to-buyer matching grid |
| Mediterranean as starting territory only | Locked | Open to producers from any country |
| Y1 calendar: ES+NL → FR M4 → IT M6 → DE M9 | Locked 2026-05-08 | NL primary B2C, ES primary supplier |
| Iriska.AI single domain | Locked 2026-05-08 | iriska.app reserved for redirect |
| Build self via Cursor + Claude API | Active | Save €50-70K vs outsourced |
| All docs/outputs in Russian by default | Active | English UI copy, Russian internal |
| Email: hello@iriska.ai, partners@iriska.ai | Active | No gmail |

### Pricing & financial

| Decision | Status | Rationale |
|---|---|---|
| **Architecture B (Wildberries-style)** | **Locked 2026-05-08** | **Commission deducted from supplier price** |
| **B2B effective commission 8%** | **Locked 2026-05-08** | Competitive with Faire/Ankorstore |
| **B2C effective commission 15%** | **Locked 2026-05-08** | Higher consumer acquisition cost justifies |
| **20% gap minimum B2B↔B2C** | **Locked 2026-05-08** | Anti-cannibalization, supplier margin protection |
| Supplier net minimum +5% over wholesale (B2C) | Locked 2026-05-08 | Floor protection on destination VAT scenarios |
| AI-RRP indicator green/yellow/red | Locked 2026-05-08 | Phase 3.6 simple, Phase 6.x AI competitor parsing |
| No Iriska-funded discounts | Locked 2026-05-08 | Supplier-driven promotions only |
| Mollie primary payment processor | Locked 2026-05-08 | NL hometown, iDEAL, marketplace split |
| Revolut + PayPal + SEPA DD B2B opt-in | Locked 2026-05-08 | Coverage matrix |
| Stripe backup M6+ | Locked 2026-05-08 | International expansion fallback |
| Payouts: T+5 free / T+2 €4.99+0.25% / T+1 €9.99+0.5% | Locked 2026-05-08 | Fast/express new revenue line |
| Deferred payment B2B M5-M6, supplier-financed | Locked 2026-05-08 | NO Iriska credit risk |
| 5% upfront "Platform & Financing Fee" hides 8% commission | Locked 2026-05-08 | Pricing presentation |
| Float income deferred to Y2 | Locked 2026-05-08 | Treasury complexity |

### Tech stack

| Decision | Status | Rationale |
|---|---|---|
| Next.js 16 + Vercel + Supabase | Locked | Free-tier friendly, EU region |
| Tailwind v4 + brand tokens | Locked | Burgundy/cream/linen, Newsreader |
| Auth: Supabase Auth | Locked | Migrate to Clerk only if needed |
| **Three user types: consumer / Organization member / supplier** | **Locked 2026-05-08** | **Reflects B2B+B2C hybrid** |
| **Three-tier hierarchy: User → Organization → Locations** | **Locked 2026-05-08** | **Multi-location B2B** |
| Resend for transactional email | Locked | Best DX, React Email |
| Sendcloud as carrier aggregator | Locked | 80+ EU carriers |
| ShippingProvider abstraction | Locked | Future direct contracts plug in |
| **Document storage: Supabase Storage** | **Locked 2026-05-08** | **GDPR EU, no new vendor** |
| Vercel Cron OR Supabase pg_cron | Pending | Both viable, pg_cron leaning |
| **Quaderno + Exact Online (invoicing/bookkeeping)** | **Locked 2026-05-08** | **Y1 cost ~€1.5K** |
| **Onfido or Veriff (ID verification)** | **Locked 2026-05-08** | **€2-3 per check** |
| **Creditsafe (premium credit fast-track)** | **Locked 2026-05-08** | **€50-150 per supplier optional** |
| i18n: next-intl | Locked | Avoid hardcoded-strings retrofit |
| Sentry, Pino, Vercel Flags Toolkit | Locked | Observability + flags day one |
| events_log via Postgres LISTEN/NOTIFY | Locked | In-Supabase event bus |
| AI: Anthropic only, behind abstraction | Locked | Switch only if insufficient |

### Logistics & compliance

| Decision | Status | Rationale |
|---|---|---|
| Alcohol/wine excluded from MVP operations | Locked | EMCS/excise complexity, Y2 reactivation |
| EU-only delivery on MVP | Locked | UK/Norway/Switzerland Phase 7+ |
| Temperature-aware routing | Locked | Core differentiation |
| Catalog filtering by delivery feasibility | Locked | shipping_zones pre-computed |
| Shipping cache TTL 15-30 min | Locked | Balance freshness vs API |
| Shipping markup 10-15% on Sendcloud | Locked | Logistics margin |
| Direct carrier contracts trigger | Defined | GMV ≥ €15K/mo |

### VAT & legal

| Decision | Status | Rationale |
|---|---|---|
| **NL B.V. primary entity** | **Locked 2026-05-08** | **Founder relocation, OSS-friendly** |
| **OSS registration** | **Locked 2026-05-08** | **Destination VAT compliance** |
| **Article 14a: Iriska NOT deemed supplier** | **Locked 2026-05-08** | **Amazon precedent, 95%+ EU suppliers** |
| **No Cyprus/Ireland Y1-Y2** | **Locked 2026-05-08** | **Substance requirements, ATAD** |
| ViDA July 2027 transition planned | Acknowledged | Architecture pass-through ready |

---

## Current project state
### Progress tracker (live)
```
TOTAL ESTIMATED HOURS: ~204h
DONE:        ~39h   (19.1%)  ████░░░░░░░░░░░░░░░░
NEXT BLOCK:  ~15h   (7.4%)   — Phases 3.1-3.4
BLOCKED:     ~4h    (2.0%)   — Phase 3.5 (NL B.V. required)
AFTER 3.5:   ~14h   (6.9%)   — Phases 3.6-3.8
PHASE 4:     ~35h   (17.2%)
PHASE 5:     ~14h   (6.9%)
PHASE 6:     ~30h   (14.7%)
PHASE 7:     ~29h   (14.2%)
PHASE 8:     ~28h   (13.7%)
To operational MVP (end of Phase 4):  ~84h   (~12 work days at 7h/day)
To AI differentiation (Phase 6):      ~127h  (~18 work days)
To full product:                      ~165h  (~24 work days)
```
Update this tracker every time a Phase closes. Recalculate percentages
if new Phases are inserted or existing scope changes.

### Completed phases (~39h)

**Phase 1 — Initial landing (April 2026, ~8h):** Next.js 16 + Vercel +
GitHub repo, brand v1.0, production at `iriska-inky.vercel.app`.

**Phase 2A — Database backend (April 29, ~6h):** Supabase Postgres
Frankfurt, 6 tables, RLS public-read, GIN indexes, 958 GI / 396
producers / 354 links / 487 prices / 364 heritage products loaded.

**Phase 2B.1-2B.4 — Catalog (May 1-4, ~10h):** Typed Supabase client,
paginated grid, accent-insensitive filters and search via custom
`immutable_unaccent()` and pg_trgm GIN, country/slug detail pages.

**Phase 2B.5-2B.6 — Landing redesign + visual upgrade (May 5, ~5h):**
Hero, live data band, How it works, Featured categories, For Suppliers
preview, full /suppliers page, editorial hero photo, Header/Footer
applied to all pages, ISR revalidation.

**Phase 2B.7 — Spacing polish (May 6, ~1h):** ~30% denser vertical
rhythm, professional B2B pacing.

**Phase 3.0 — i18n architecture (May 10, ~6h):** next-intl 4.x,
`src/i18n/{routing,request,navigation}.ts`, `proxy.ts` (Next.js 16
convention replacing middleware.ts), `app/[locale]/` restructure,
messages/en.json with all current copy as namespaced keys, all pages
+ Header + Footer + RequestAccessButton converted to translation keys.
URL: `/` → `/en/`. Architecture ready for Phase 5 localization rollout.

**Phase 3.0.5 — AI-first foundations (May 10, ~6h):** Four atomic
commits laying the observable, automatable, AI-ready foundation.

  1/4 Sentry — error tracking + performance + session replay + logs;
      `instrumentation.ts`, `sentry.{server,edge}.config.ts`,
      `app/global-error.tsx`, MCP config for Cursor, .gitignore
      .env.sentry-build-plugin. Composed with next-intl in
      `withSentryConfig(withNextIntl(nextConfig))`.

  2/4 Pino structured logger + events_log infrastructure —
      `lib/observability/logger.ts` with dev-mode pretty-print and
      production JSON, `lib/observability/childLogger()` for persistent
      context. `db/migrations/006_events_log.sql`: events_log table
      with status enum, JSONB payload + GIN index, parent_event_id
      self-FK, LISTEN/NOTIFY trigger, RLS with service_role permissive
      policy + explicit GRANTs. `lib/events/emit.ts` wrapper around
      Supabase admin client with type-safe EmitResult, fire-and-forget
      semantics (never throws on DB failure), pre-flight Pino logging
      for durability. 22 standardized EventType constants.

  3/4 AI client abstraction — `lib/ai/` with provider-agnostic types,
      Anthropic SDK wrapper, 3-attempt retry with exponential backoff,
      error classification (rate_limit / timeout / invalid_request /
      server_error / unknown), automatic emitEvent('ai_call.completed'
      | 'ai_call.failed') for cost tracking, Pino child logger with
      model/use_case/actor_id/trace_id context. Result-style return
      type (ok: true | ok: false) so callers handle failures
      gracefully. Model constants: CHEAPEST (Haiku), DEFAULT (Sonnet),
      BEST (Opus).

  4/4 Vercel Flags Toolkit + knowledge/ RAG skeleton — `lib/flags/`
      with 6 feature flags all default-OFF for safe rollout
      (ai_matching, deferred_payment, sentry_tunneling,
      multi_supplier_checkout, b2c_experience, ai_auto_verification).
      Each env-driven (FLAG_X=true) with Vercel dashboard override.
      `app/.well-known/vercel/flags/route.ts` discovery endpoint for
      Chrome Flags Toolkit extension (FLAGS_SECRET-signed auth).
      `knowledge/` foundation for Phase 6+ RAG: README + 7 skeleton
      files (faq/general, policies/{onboarding,verification,pricing},
      glossary/terms, workflows/supplier-signup, certifications/
      eu-quality-schemes). Frontmatter convention (title, category,
      audience, last_reviewed) ready for downstream RAG ingestion.

  Bonus (security upgrade): Supabase JWT signing migrated from Legacy
  HS256 to ECC P-256 via standby+rotate flow. Legacy anon/service_role
  JWT keys disabled, replaced with new Publishable + Secret API keys
  (opaque tokens, modern standard). Production Vercel env vars complete
  (SENTRY_AUTH_TOKEN, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY,
  FLAGS_SECRET, NEXT_PUBLIC_SUPABASE_ANON_KEY updated). Production
  deploy verified working. Workflow lesson captured in IMPROVEMENTS.

### Active phase

**(none — between phases, starting Phase 3.1 Auth)**

### Linear roadmap (execution order)

Each Phase number = order of work. Dependencies explicit. If a Phase
is blocked, downstream Phases that depend on it wait; independent
Phases proceed in parallel.

#### NOT BLOCKED — proceed now

**Phase 3.1 — Auth (~3h)**

Supabase Auth setup, magic link (passwordless email login), Cloudflare
Turnstile (anti-bot on signup), 3 user types (consumer / Organization
member / supplier), session middleware, signin/signup/verify pages,
emitEvent on auth lifecycle events.

**Phase 3.2 — Schema expansion (~5h)**

Full data model migration:
- `users` (Supabase auth users)
- `organizations` (verified legal entities: KvK/CIF/SIRET/HRB, VAT,
  food safety, 30 / 60 day payment terms preference)
- `locations` (per-org delivery points)
- `organization_members` (User ↔ Organization with Owner/Manager/Buyer role)
- `consumer_accounts` (B2C personal accounts)
- `suppliers` (extends organizations with pickup_address, pickup_zip,
  pickup_country, pickup_schedule, pickup_cutoff_time, lead_time_days,
  consolidation_capability, temperature_capabilities, sendcloud_sender_id)
- `products` (dual pricing: price_b2b, price_b2c_list,
  price_b2c_indicator computed; logistics: weight_kg, dimensions_cm,
  temperature_class, fragility, min_order_unit, min_order_quantity,
  packaging_options, shelf_life_days)
- `certifications` (~80-120 static reference entries)
- `product_certifications` (M2M)
- `verification_documents` (storage_path, document_type,
  claude_vision_analysis, verification_decision)
- `supplier_ratings` (product_avg, operational_multiplier, final, history)
- `location_ratings` (per-location independent)
- `organization_ratings` (volume-weighted aggregate)

All actions from this phase forward emit events to `events_log`.

**Phase 3.3 — User profiles & settings (~4h)**

Profile pages, address management, member management for Organizations,
preferences, password / magic-link management, email change flow.

**Phase 3.4 — Sourcing requests (~3h)**

Buyer requests product not in catalog. Suppliers respond. Notification
flow via emitEvent. Status tracking. Sets up the demand-signal data
that Phase 6 AI matching will consume.

#### BLOCKED — Phase 3.5 (NL B.V. required, ~1 week wait)

**Phase 3.5 — External integrations (~4h)**

Free providers (no NL B.V. needed):
- VIES VAT validation (EU-wide, public API, no auth)
- eAmbrosia PDO/PGI registry (EU, public)
- INSEE Sirene (FR companies, public API, no auth)

Paid providers (require NL B.V. credentials for billing/access):
- KvK (NL companies, €0.30/check)
- Camera di Commercio (IT companies, €2-5/check)
- Handelsregister (DE companies, €1.50/check)
- Mollie payment integration (NL B.V. needed for production keys)
- Quaderno invoicing integration
- Supabase Storage policies for verification documents

This Phase is intentionally placed AFTER 3.4 because Phases 3.1-3.4
do not depend on it. If NL B.V. registration delays, work continues
on 3.6+ in parallel only where dependencies allow. Risk-handling
guidance: see "If NL B.V. delayed" section below.

#### AFTER 3.5 — dependencies satisfied

**Phase 3.6 — Supplier dashboard (~5h)**

UI for org profile, products list, CSV import, manual SKU editing,
logistics info, verification status flow (calls 3.5 verification APIs),
document upload UI, KYC progress display.

**Phase 3.7 — Catalog evolution (~4h)**

Real supplier products replacing seeded GI benchmarks. Live prices
from suppliers. "X suppliers offer this product" indicator. Catalog
becomes operationally meaningful (not just reference data).

**Phase 3.8 — Pricing & invoicing UI (~5h)**

Dual pricing UI (supplier sets B2B + B2C per SKU). 20% gap T&C
enforcement at form level. AI-RRP indicator simple math (green/yellow/
red zones; AI competitor parsing deferred to Phase 6). Quaderno
invoice generation logic (built, not activated until Phase 4 checkout).
Mollie checkout integration (test mode in 3.5, live keys here).

#### Phase 4 — Buyer MVP + Logistics + Email (~35h)

- **4.1 Cart & basket (~4h):** Multi-supplier cart with location
  selection at checkout. Supplier-grouped basket display.
- **4.2 Checkout flow (~6h):** Dual payment paths (B2B Organization
  billing vs B2C consumer). Address validation. Order summary.
- **4.3 Logistics integration (~5h):** Sendcloud + ShippingProvider +
  routing engine + shipping_zones + temperature-aware splits + cache.
- **4.4 Email infrastructure (~3h):** Resend setup, transactional
  templates via React Email, supplier order notifications, customer
  confirmations.
- **4.5 Chatbot v1 (~6h):** Customer support chatbot widget using
  Claude Haiku, narrow scope, RAG over knowledge/ folder.
- **4.6 Order management (~5h):** Order tracking statuses + Mollie
  webhook activation + supplier accept/decline flow + buyer
  cancellation rules + dispute initiation hook.
- **4.7 Deferred payment infrastructure (~6h):** M5-M6 calendar
  launch — Card pre-auth flow, PayPal Reference Transactions, SEPA DD
  B2B opt-in. Interest tier UI, payment terms display, supplier credit
  risk T&C. Iriska 0.25% interest share accounting.

#### Phase 5 — Trust + Localization (~14h)

- **5.1 Trust signals UI (~4h):** Ratings display, reviews, supplier
  verification badges, rating-to-payment-term mapping visible to buyers.
- **5.2 Spanish localization (~6h):** messages/es.json, content review,
  cultural adaptation, ES-specific legal copy (VAT, T&C).
- **5.3 Dispute mediation flow (~4h):** Buyer-supplier dispute opening,
  evidence upload, founder review queue, resolution outcomes.

#### Phase 6 — AI layer (the differentiation, ~30h)

- **6.1 RAG ingestion pipeline (~5h):** knowledge/**/*.md → chunk by
  ## headings → embed via voyage-2 (or similar) → store in
  `knowledge_embeddings` Supabase table with pgvector. Query at
  runtime: cosine similarity → top-K → Claude context.
- **6.2 AI matching engine (~10h):** 5-filter cascade (price corridor
  → cuisine/menu fit → quality ratings → inventory availability →
  card balance/seasonality). Per-buyer personalization. A/B testing
  via Vercel Flags.
- **6.3 Menu analysis (~6h):** Restaurant uploads menu (image/PDF) →
  Claude Vision extracts dishes → AI suggests products that match
  cuisine and price tier.
- **6.4 AI-RRP competitor parsing (~5h):** Multi-rating sourcing —
  Vivino, Wine-Searcher (Parker/Suckling/Decanter), Guía Peñin,
  CellarTracker for wine (when wine returns Y2); generic competitor
  price scraping for non-wine.
- **6.5 Chatbot v2 with full RAG (~4h):** Upgrade Phase 4.5 chatbot
  with full knowledge base + product catalog + user history context.

#### Phase 7+ — Scale (~29h estimated)

- **7.1 Direct carriers (~5h):** DHL Freight, PostNL, GLS API contracts
  when GMV ≥ €15K/mo (replace Sendcloud aggregator for cost).
- **7.2 Alcohol/wine return Y2 (~6h):** NL-licensed distributor
  partnership, EMCS, fiscal rep, AGB/accijns infrastructure.
- **7.3 Multi-stop consolidation (~6h):** 1 truck, multiple pickup
  suppliers, routing engine extension.
- **7.4 Localization NL/FR/IT/DE/PT (~12h):** Five additional language
  rollouts in priority order: DE first (NL/DE buyer base), then NL,
  then IT, FR, PT.

#### Phase 8+ — B2C extension + Fulfillment Hub (~28h estimated)

- **8.1 B2C consumer UX (~10h):** Separate experience track from B2B
  HoReCa. Consumer-friendly navigation, recipes, gift packaging.
- **8.2 Consumer pricing 15% tier (~3h):** B2C take rate UI, displayed
  inclusive of VAT, 20% gap enforcement from supplier B2B price.
- **8.3 Iriska Fulfillment Hub (Barcelona) (~15h):** Ankorstore-style
  warehouse for small suppliers without own logistics. Inventory
  management, pick-pack-ship, sub-suppliers' SKUs into Iriska shipments.

#### Phase 9+ — Optional / future

- Trade event/tasting infrastructure
- Tax structure optimization (Cyprus/Ireland reconsideration if profit
  exceeds €1M Y3+)
- UK post-Brexit customs, Norway, Switzerland
- Mobile apps (React Native)
- ERP integrations for top suppliers
- API access for advanced suppliers
- Embeddings semantic search
- Fine-tuning Claude on Iriska conversation history
- Multi-provider AI (only if Anthropic becomes unfavorable)
- Multi-location split shipping (single basket, multiple delivery points)
- Per-location invoicing for chains
- Group buying (independent restaurants aggregator pricing)

### Risk handling

**If NL B.V. delayed > 2 weeks:**
- Phase 3.5 can be partial: VIES + eAmbrosia + INSEE work without
  NL B.V. (free APIs, no billing)
- Phase 3.6 supplier dashboard can be built with only free verification
  sources — Spain/France/Portugal/EU suppliers fully onboardable
- NL/DE/IT suppliers blocked at verification step, manual founder
  review until paid APIs available
- Phase 4 buyer MVP can proceed using Mollie test mode; switch to live
  keys when NL B.V. ready

**If registrations temporarily require an existing entity:**
- Atlander Unipessoal LDA can be used for test API access only (Mollie
  test mode, KvK sandbox) but NOT production billing
- Architecture supports credential rotation (proven with Supabase JWT
  rotation in Phase 3.0.5)

---

## Funding & metrics (context, not committed)

### F&F round (locked structure 2026-05-08)

- Amount: €600K (4 × €150K)
- Equity: 5% per investor (post-money valuation €3M)
- Instrument: SAFE notes (terms TBD separately)

### Y1 metrics baseline (founder considers conservative)

- Y1 GMV baseline: ~€3.5M (founder expectation higher; architecture
  designed for higher targets)
- Y1 Iriska revenue: ~€470K (commission + payout fees + deferred interest)
- Y1 EBITDA: ~-€320K
- Cash at M12: ~€280K (with €600K F&F)
- Min cash in year: ~€220K
- Break-even: M11

**Note: Revenue numbers in this section are conservative baseline.
Founder expects materially higher. Architecture optimized for upside,
but financial planning conservative.**

### Key Y1 OpEx items (context)

- Salaries gross + payroll tax 25%: ~€293K total
  - Founder/CEO €120K (€8K/mo + payroll)
  - Supply-side partner ES from M2 €49.5K
  - Growth marketer freelance €40K
  - CS/Ops freelance ES €28.5K
  - FR contractor from M4 €18K
  - IT contractor from M6 €16K
  - DE contractor from M9 €8.8K
  - Ops Manager NL FT from M9 €22.5K
- Paid acquisition: €270K Y1
- Trade events: €60K (Madrid Fusión, Alimentaria, TuttoFood, SIAL)
- Office Amsterdam mid-tier 50m²: €20K
- Transport (Mercedes EQE €900/mo + ops): €11.8K
- Communications: €5.4K
- AI/Claude (subs + API + dev tools): €24K
- Professional Indemnity insurance: €2.5K
- Strategic Supplier Reserve: €10K
- Credit checking (Creditsafe): €1.2K
- Tax compliance (Quaderno + Exact Online + accountant): €4K
- Tech infrastructure: €600-€2.2K/mo
- Legal/accounting: €20K M1 setup + €1.5-3.5K/mo ongoing

### Key partners / contacts

- **Spain — Nandu Jubany** (primary, founder personal relationship —
  Familia Jubany €32M turnover 2024, JV with Noel 50/50). Activate M3-M6.
- **Reserva Ibérica** — meeting upcoming, distributor/reseller, discuss
  margins and tier pricing for top 10-15 strategic suppliers
- **Italy chefs:** Carlo Cracco, Bruno Barbieri, Massimo Bottura
- **France:** Yves Camdeborde, Thierry Marx, Frédéric Anton
- **NL:** Joris Bijdendijk, Sergio Herman, Margot Janse

### Key events 2026

- Madrid Fusión 26-28 Jan 2026 (founder presence, ~€3K)
- Alimentaria Barcelona 23-26 March 2026 (€20K stand+travel)
- Salon du Fromage Paris March 2026 (€8K, scout-only)
- TuttoFood Milano 11-14 May 2026 (€12K)
- SIAL Paris 17-21 October 2026 (€25K stand)
- Cibus Parma May 2027 (biennial)
- Horecava Amsterdam January 2027

---

## Repository structure

```
iriska/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing
│   ├── catalog/                  # Catalog grid + detail pages
│   ├── suppliers/                # For Suppliers page
│   ├── pro/                      # B2B HoReCa surface (post-Phase 3.1)
│   └── layout.tsx
├── components/                   # Shared components
├── lib/
│   ├── supabase/                 # Supabase client + types
│   ├── queries/                  # Data-fetching layer
│   ├── ai/                       # AI provider abstraction (3.0.5+)
│   ├── events/                   # Event emit + subscribers (3.0.5+)
│   ├── observability/            # Pino logger, Sentry (3.0.5+)
│   ├── feature-flags/            # Vercel Flags wrapper (3.0.5+)
│   ├── verification/             # VIES, Onfido, registries (3.0.5+)
│   ├── invoicing/                # Quaderno (3.0.5+)
│   ├── payments/                 # Mollie, Revolut, PayPal (3.0.5+)
│   └── utils/
├── knowledge/                    # Structured KB (3.0.5+)
│   ├── faq.md
│   ├── policies/
│   ├── glossary/
│   ├── workflows/
│   └── certifications/
├── db/migrations/                # SQL migrations (idempotent)
├── public/
├── BRAND.md
├── AGENTS.md                     # This file
├── CLAUDE.md                     # Pointer to AGENTS.md
└── README.md
```

---

## Conventions in use

**Code style:**
- TypeScript strict, no `any` unless documented
- Server components default, `'use client'` only when needed
- URL search params for filter state
- Absolute imports via `@/`

**Database:**
- Idempotent migrations
- RLS on all tenant tables
- Generated columns for derived values used in indexes
- Events emitted on every significant state change
- Three-tier hierarchy: users → organizations → locations

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
  from chat to Cursor. Use RequestAccessButton component for mailto;
  inline external links — single-line format.

---

## IMPROVEMENTS (deferred, not blocking)

### Architectural

- **Naming/Tagline final:** Current primary tagline "The well-chosen list."
  works. Exploration ongoing for category descriptor — direction:
  "Pan-European Fine Food..." (something more refined than "marketplace"
  or "network"). Not urgent.
- **Commercial vocabulary layer:** HoReCa buyers search by commercial
  terms (iberico, cebo, bellota, manchego curado) but DB has formal DOP
  names. Decision needed: separate `commercial_terms` table vs hierarchy
  vs AI mapping. Coordinate with Barcelona partner.
- **Data quality enrichment:** 181/958 GI flagged `is_data_thin`. Solutions:
  AI batch via Claude API; producer scraping; supplier-driven natural
  improvement.
- **Non-Mediterranean GI registries:** Add Swiss AOP/IGP, UK PDO,
  Norwegian Beskyttede, Dutch/Belgian/German PDO as positioning expands.
- **Heritage producer table:** Producers without formal GI but meeting
  heritage criteria.
- **Quality certification taxonomy:** Slow Food Presidium, Bio EU, Demeter,
  curated panel exceptions.
- **Multi-stop consolidation logistics (Phase 7+):** Major margin lever.
- **Cron infrastructure decision:** Vercel Cron Hobby vs Supabase pg_cron.
  Decide before Phase 4.5.
- **Cold chain insurance review:** Investigate before serious chilled
  volume.
- **Landing/suppliers copy refresh:** Current copy emphasizes HoReCa
  exclusively. Refresh for B2B+B2C hybrid + broader buyer base.
- **Faire/Ankorstore UX patterns adoption:** UX research doc identifies
  Tier-1 patterns (visual design, brand storytelling, multi-filter
  discovery, free first-order replacement, net payment terms, reorder
  workflows) and patterns to avoid.
- **Multi-provider AI support (Phase 7+ if needed):** Single provider
  (Anthropic) behind abstraction. Real multi-provider engineering only
  if Anthropic insufficient/unfavorable.
- **Full agent tooling (shadow→hybrid→autonomous infrastructure):**
  Phase 6+ when first medium-cost-of-error automation goes live.
- **Knowledge base ownership process:** Currently single-maintainer.
  When team grows, formalize updates, review, versioning.
- **Multi-location split shipping (single basket, multiple destinations):**
  M9+ feature for chains.
- **Per-location invoicing:** Y2+ optional for chains needing per-location P&L.
- **Group buying (independent restaurants aggregator pricing):** Y2+ feature.
- **AI-RRP competitor parsing engine:** Phase 6.x — barcode-matched
  competitor scraping (Joselito 200g sliced, etc.), Iriska-set baseline
  competitors, market benchmarks.

### Quick wins

- **DB column slug** — generated column when GI table > 5K rows
- **Aliases not searched** — extend search to `aliases` column. ~15 min.
- **Logo aspect-ratio refactor** — switch to Next.js Image if raster
- **Tailwind v4 `@theme` lint warning** — Cursor false positive
- **Hero photo Next.js Image migration** — when more raster images appear

### Bugs

- **Data noise in GI names:** ~20 entries with annotations leaked into
  `primary_gi_name`. Single UPDATE pass.
- **Sticky 404 for some heritage GIs:** deeper testing of `is_data_thin`
  entries with nullable required fields.

### Workflow lessons learned

These are operational lessons from working sessions, captured to prevent
repeating mistakes. Each entry: what happened, why it happened, what to
do differently.

- **Never output secrets via Terminal commands (2026-05-10):** During
  Phase 3.0.5 setup, a Terminal command was used to retrieve a Supabase
  service_role key (`cat .env.local | grep | sed`), and the Terminal
  output containing the live key was pasted into chat. The key had to
  be rotated immediately (full Supabase JWT signing key rotation:
  Legacy HS256 → ECC P-256 standby → current, plus migration from
  legacy anon/service_role JWTs to modern Publishable + Secret API
  keys). Lesson: when working with secrets, copy directly from Cursor
  file view to clipboard — never via Terminal commands that echo the
  value. The `cat | grep | sed` pattern for retrieving env values is
  banned even when the user is the only intended recipient, because
  Terminal scroll-back is fungible with chat paste.

- **Copy-paste artefact: opening JSX tags lost in chat-to-Cursor
  paste (2026-05-10):** When Claude provides multi-line JSX with an
  opening tag on its own line (e.g. `<a` then `  href="..."` on the
  next line), the Claude desktop app's clipboard handler strips the
  bare `<a` during copy. This results in JSX with `href="..."` but no
  parent element, breaking compilation. Workaround: paste through
  Notes or another text editor first, verify the opening tag is
  present, then paste into Cursor. Reported via /bug. Until fixed in
  Claude app, prefer single-line opening tags when providing JSX
  examples (`<a href="..." className="...">text</a>` instead of the
  multi-line form), or instruct user to manually verify opening tag
  presence after each paste.

- **Turbopack OOM after long dev sessions (2026-05-10):** Node.js
  default heap is 4GB. Long dev sessions with many hot reloads
  accumulate memory pressure in Turbopack; eventual OOM crash forces
  `npm run dev` restart. Fix: `rm -rf .next && npm run dev` clears
  Turbopack cache. If recurring within 30 min, set
  `NODE_OPTIONS=--max-old-space-size=8192 npm run dev`. Not urgent
  but document for future sessions.

- **PostgREST RLS requires BOTH permissive policy AND role-level GRANT
  (2026-05-10):** When creating tables that need service_role access
  (e.g. events_log), it is not enough to add a permissive RLS policy
  for service_role — PostgREST also requires explicit
  `GRANT INSERT, SELECT, UPDATE, DELETE` on the table and
  `GRANT USAGE, SELECT` on associated sequences. Migrations creating
  new RLS-protected tables must include both. Already documented in
  `db/migrations/006_events_log.sql` end-of-file grants section as
  reference pattern.

- **Phase numbering can shift on dependency reordering:** Original
  phase numbers in earlier AGENTS.md versions assumed a fixed plan.
  In practice, registration timing (NL B.V.), partner availability,
  and external dependencies shift execution order. Linear numbering
  by execution order (current convention) means a Phase number =
  the order in which work is done, not original-plan slot. When
  reshuffling, recalculate Progress tracker hours and percentages.

---

## How to use this file

**For AI sessions:** Read this in full at session start. The "Strategic
decisions log", "Pricing architecture", "Account architecture", "Rating
system", "AI-first operating principles", and "Current project state"
sections are most important — don't re-litigate locked decisions.

**For Sergei:** Update this file when:
- A phase is completed
- A new strategic decision is made
- An IMPROVEMENT moves to active work or gets resolved
- A new convention emerges

The goal is that opening this file gives anyone (including future-you and
future-me) a complete picture of where Iriska is and why it's there in
under 5 minutes of reading.
