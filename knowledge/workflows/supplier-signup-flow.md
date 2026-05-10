---
title: 'Supplier signup workflow'
category: 'workflow'
audience: 'internal'
last_reviewed: 2026-05-10
---

# Supplier signup workflow

> **Status:** Skeleton. Detail evolves as Phase 3.3 (supplier onboarding) lands.
Discovery
├── Supplier visits /suppliers landing
└── Submits expression of interest (mailto for MVP, form in Phase 3.3)
Initial conversation
├── Iriska team reviews fit
└── Either declines politely or invites to onboarding
Account creation
├── Supplier creates account via Supabase Auth (magic link)
├── Provides legal entity details (name, KvK/CIF/SIRET/HRB, VAT number)
└── emitEvent('supplier.signed_up', { supplier_id, country })
Automated verification (Phase 3.3)
├── VIES VAT check
├── Country-specific registry check (KvK/INSEE/CdC/Handelsregister)
├── eAmbrosia certification check (if PDO/PGI claimed)
├── Claude Vision: parse uploaded HACCP / quality certificates
└── Result: 'auto_approved' | 'auto_rejected' | 'requires_human_review'
Founder review (conflict cases only, ~10-15%)
├── Review captured data + supplier-provided evidence
├── Decide: approve / reject / request more information
└── emitEvent('supplier.verified' | 'supplier.rejected', { ... })
Profile completion
├── Supplier uploads product list (CSV import or manual)
├── Sets pricing tiers (B2B / B2C)
├── Adds origin story, photos, certifications
└── Quality review by Iriska team
Activation
├── Products go live in /catalog
├── Supplier dashboard fully accessible
└── emitEvent('supplier.profile_updated', { status: 'active' })
## SLA targets

| Stage | Target |
|-------|--------|
| Initial response after expression of interest | 1 business day |
| Verification (auto path) | < 1 hour from submission |
| Founder review (conflict path) | 1-3 business days |
| Quality review on completed profile | 2-3 business days |
| Total time to activation (low-conflict supplier) | 5 business days |