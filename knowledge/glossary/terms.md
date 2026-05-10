---
title: 'Iriska glossary'
category: 'glossary'
audience: 'public'
last_reviewed: 2026-05-10
---

# Glossary

Definitions of terms used throughout the Iriska platform and documentation.

## Platform

**Iriska** — Pan-European cross-border platform connecting producers of
protected and heritage food products with HoReCa, specialty retail, and
consumer buyers.

**HoReCa** — Hotels, Restaurants, Catering. The primary buyer segment for
Iriska's B2B channel.

**B2B** — Business-to-business. Buyers are legal entities (restaurant groups,
distributors, retailers).

**B2C** — Business-to-consumer. End consumers buying directly from Iriska
catalog. Active in Iriska from Y1, with 15% commission.

**Organization** (in Iriska data model) — A verified buyer entity with VAT
registration, may have multiple Locations and Members.

**Location** — A physical site of an Organization (e.g. one restaurant in a
chain). Orders ship to Locations, ratings/penalties accrue at Location level
and propagate to Organization weighted-average.

## EU quality schemes

**PDO** (Protected Designation of Origin) / **DOP** (Italian/Portuguese) /
**AOP** (French) — Highest tier. Product must be produced, processed, AND
prepared in a defined geographical area using recognized know-how. Examples:
Parmigiano Reggiano, Roquefort, Aceto Balsamico Tradizionale.

**PGI** (Protected Geographical Indication) / **IGP** (Italian/French) —
Product is closely linked to the geographical area in at least one of the
stages of production, processing, or preparation. Less strict than PDO.

**TSG** (Traditional Specialities Guaranteed) / **STG** — Highlights
traditional character either in composition or means of production. Does
NOT specify geographical origin. Example: Mozzarella TSG.

**eAmbrosia** — Official EU registry of geographical indications, accessible
at `ec.europa.eu/agriculture/eambrosia/`. Iriska verifies producer
PDO/PGI/TSG claims against this registry.

## Legal & registries

**KvK** (Kamer van Koophandel) — Dutch Chamber of Commerce. All NL legal
entities registered here. Iriska uses KvK API to verify supplier identity.

**CIF** (Código de Identificación Fiscal) — Spanish tax identification
number for legal entities. Verified via AEAT/INE.

**SIRET** — French 14-digit identifier for business establishments. Verified
via INSEE Sirene API (free).

**HRB** (Handelsregister B) — German commercial register. Section B is
incorporated companies (GmbH, AG). Section A is sole proprietorships.

**VIES** (VAT Information Exchange System) — EU-wide VAT number validation
service at `ec.europa.eu/taxation_customs/vies/`. Free, instant.

**OSS** (One-Stop Shop) — EU VAT scheme for cross-border B2C sales. Iriska
uses OSS via NL B.V. for B2C transactions to avoid registering for VAT in
each consumer country.

**ViDA** (VAT in the Digital Age) — EU regulation effective July 2027,
introduces digital reporting and platform liability rules. Iriska
infrastructure pass-through ready.

**Article 14a** — EU VAT directive provision under which marketplaces are
deemed suppliers in certain cases. Per Amazon precedent, Iriska is **not**
deemed supplier; supplier remains the legal seller of record.

## Payments

**SEPA Direct Debit** — Pull payment scheme for euro accounts.
**SEPA Core** is consumer DD (chargeback risk too high for B2B; not used).
**SEPA B2B DD** is opt-in business DD (no chargeback; used selectively).

**Mollie** — Primary payment processor. NL-based, native iDEAL support,
~0.90% blended cost in Y1.

**Reference Transactions** — Vault payment method for repeat charges
without re-authentication. Used for recurring B2B invoices.