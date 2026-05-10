---
title: 'Verification criteria for suppliers'
category: 'policy'
audience: 'internal'
last_reviewed: 2026-05-10
---

# Verification criteria

> **Status:** Skeleton. Detail expanded as verification stack lands in Phase 3.0.5 (4/4).

Every supplier passes through automated verification before activation.
Founder/team reviews only conflict cases (~10-15%).

## Layer 1: identity & legal

| Check | Source | Cost | SLA |
|-------|--------|------|-----|
| EU VAT number valid | VIES (`ec.europa.eu/vies`) | Free | < 5s |
| Spanish CIF active | INE/AEAT registry | Free | < 5s |
| Dutch KvK number | KvK API | €0.30/check | < 10s |
| French SIRET | INSEE Sirene API | Free | < 5s |
| Italian Camera di Commercio | CdC API | €2-5/check | < 30s |
| German HRB | Handelsregister | €1.50/check | < 30s |

## Layer 2: certifications

| Check | Source | Cost |
|-------|--------|------|
| PDO/PGI/TSG registration | eAmbrosia (`ec.europa.eu/agriculture/eambrosia`) | Free |
| HACCP certificate | Document upload + Claude Vision | ~€0.50/check |
| Organic certification | EU Organic database | Free |
| National quality scheme | Per-country database | Varies |

## Layer 3: commercial

| Check | Source | Method |
|-------|--------|--------|
| Bank account ownership | Mollie/SEPA verification | Automatic on payout setup |
| Trade references | Manual founder review | Conflict-only |
| Online reputation | Web search + reviews aggregation | Conflict-only |

## Conflict resolution

If automated checks return a conflict (e.g. VIES says VAT inactive but supplier
provides recent invoice), the case is flagged for founder review with all
captured data attached. Resolution time target: 1 business day.

## Re-verification

Verification runs annually for active suppliers. Trigger conditions for
unscheduled re-verification:
- Buyer dispute escalated to platform
- Significant change in supplier profile (new legal entity, new product category)
- Sentry alert on supplier-related anomaly (see `lib/observability/`)