# Iriska Knowledge Base

Internal knowledge sources for AI assistants and human reference.

## Purpose

This directory contains structured knowledge about Iriska policies, workflows,
glossary, and product certifications. It serves two audiences:

1. **AI assistants (RAG)** — retrieved chunks added as context to Claude calls
   in chatbot, supplier guidance, customer support
2. **Humans (team + suppliers + buyers)** — readable reference, source of truth
   for written policies

## Structure
knowledge/
├── faq/             ← question/answer pairs
├── policies/        ← formal platform policies (legally relevant)
├── glossary/        ← term definitions (PDO, HoReCa, KvK, etc.)
├── workflows/       ← step-by-step process descriptions
└── certifications/  ← EU quality schemes, regulatory background
## Naming convention

- Folders are categories. New categories appear here when established
  through team consensus, not ad-hoc.
- Files are topics within category, kebab-case (e.g.
  `supplier-onboarding.md`, `eu-quality-schemes.md`).
- One file = one focused topic, ~300-1500 words. Long files become hard
  to retrieve relevant chunks during RAG.

## Markdown frontmatter

Each file may include YAML frontmatter for metadata:

```yaml
---
title: 'Title displayed to humans and AI'
category: 'policy'  # faq | policy | glossary | workflow | certification
audience: 'supplier'  # supplier | buyer | internal | public
last_reviewed: 2026-05-10
maintained_by: 'product@iriska.ai'
---
```

`title` and `category` may be inferred from path; explicit override wins.

## Adding content

1. Choose category folder (or propose new category in PR)
2. Create kebab-case `.md` file
3. Add frontmatter (optional but recommended)
4. Write focused content
5. Cross-link related files via `[link text](../other-folder/file.md)`

## RAG ingestion (Phase 6+)

A separate ingestion script (`scripts/rag-ingest.ts` — TBD) will:
1. Walk `knowledge/**/*.md`
2. Chunk by section (## headings)
3. Embed via `voyage-2` or similar embedding model
4. Store in `knowledge_embeddings` Supabase table with pgvector
5. Query at runtime: cosine similarity → top-K chunks → Claude context

## Versioning

Knowledge files are versioned in Git like code. Major policy changes go
through PR review same as feature changes. `last_reviewed` frontmatter
documents when content was last verified accurate.