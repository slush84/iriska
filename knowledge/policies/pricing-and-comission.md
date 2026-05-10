---
title: 'Pricing and commission policy'
category: 'policy'
audience: 'supplier'
last_reviewed: 2026-05-10
---

# Pricing and commission

> **Status:** Skeleton aligned with AGENTS.md v3 financial architecture.

## Architecture

Iriska uses a Wildberries-style commission model: supplier sets their **net
receivable** price, and Iriska applies commission **deducted** from that price
to derive the consumer-facing price.

This means:
- Supplier knows exactly how much they receive per unit
- Iriska's commission is transparent (visible in supplier dashboard)
- Buyers see a single price including all platform fees

## Commission rates

| Channel | Effective rate |
|---------|---------------|
| B2B (HoReCa, specialty retail, online retail) | 8% |
| B2C (consumer-facing) | 15% |

## B2B / B2C price gap

Suppliers selling to both channels via Iriska must maintain a **minimum 20%
gap** between B2B and B2C consumer-facing prices, to prevent channel
cannibalization. This is contractually required (see Iriska T&C).

Mathematically: with B2B at 8% and B2C at 15%, a 20% gap ensures supplier net
margin on B2C ≥ supplier net margin on B2B for any unit. This protects buyers
in both channels and aligns supplier incentives.

## What's included in commission

- Listing & catalog presence
- Buyer acquisition & matching engine (Phase 6)
- Payment processing infrastructure (Mollie, Stripe, etc.)
- Dispute mediation
- VAT calculation & invoicing assistance (Quaderno integration)
- Customer support for buyers

## What's NOT included

- Logistics (supplier arranges shipping; Iriska assists via Sendcloud)
- Marketing campaigns specific to a supplier
- Custom integrations with supplier ERP

## Deferred payment scheme (Phase 4.5b)

Available to verified suppliers with operational rating ≥ 4.0:
- Buyer pays Iriska upfront, supplier receives funds T+1 to T+5 standard
- Optional: supplier offers buyer 30/60/90 day payment terms.
  In this case, Iriska charges supplier:
  - 5% upfront fee (which conceals the 8% B2B commission)
  - 1.25%-2.75% interest depending on term length
  - **Iriska does NOT take credit risk** — supplier bears risk if buyer defaults

This scheme replaces traditional B2B factoring at materially better rates.