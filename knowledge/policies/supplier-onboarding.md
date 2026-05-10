---
title: 'Supplier onboarding policy'
category: 'policy'
audience: 'supplier'
last_reviewed: 2026-05-10
---

# Supplier onboarding policy

> **Status:** Skeleton. Formalize before public supplier launch.

## Eligibility

Iriska accepts suppliers who meet **all** of the following:

1. Legal entity registered in the EU (or Switzerland) with valid VAT number
2. Producer or authorized distributor of products with at least one of:
   - PDO (Protected Designation of Origin / DOP / AOP)
   - PGI (Protected Geographical Indication / IGP)
   - TSG (Traditional Specialities Guaranteed)
   - National quality certification (e.g. Suisse Garantie, Label Rouge)
   - Documented heritage producer status (>50 years operation)
3. Capacity to fulfil B2B orders (minimum order value to be defined per category)
4. Compliance with EU food safety regulations (HACCP, Reg 178/2002, etc.)

## Onboarding stages

1. **Initial conversation** — Iriska team reviews fit before paperwork
2. **Profile creation** — supplier provides registered name, KvK/CIF/SIRET/HRB,
   VAT number, certifications, product list
3. **Verification** — automated checks via VIES, national registries, eAmbrosia
   (PDO/PGI register), Claude Vision document parsing. Founder review only on
   conflict cases (~10-15% of submissions)
4. **Quality review** — product information completeness, photo quality,
   pricing reasonableness vs. category benchmarks
5. **Activation** — products go live in catalog, supplier dashboard accessible

## Verification stack

See `policies/verification-criteria.md` for detail on what is checked, by what
source, with what fallback.

## Timeline expectations

Target: 5 business days from initial contact to activation for low-conflict
suppliers. Conflict cases (incomplete documents, registry mismatches, edge-case
product categories) may require 10-15 business days.

## Rejection criteria

Iriska reserves the right to decline or remove suppliers for:
- Failed verification (registry mismatch, expired certifications, blacklisted
  legal entities)
- Product quality issues reported by multiple buyers
- Late or non-fulfilment of accepted orders (see `policies/operational-rating.md`)
- Misrepresentation of product origin, certification status, or producer credentials
- Unresolved buyer disputes