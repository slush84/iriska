# Iriska.AI — Brand System

This document is the source of truth for Iriska's visual identity in code. All UI components, pages, and assets must comply with this system.

---

## Brand voice

We are: **curatorial, warm, precise, grounded, unhurried.**
We are not: comprehensive, chummy, jargony, rustic cosplay, slow.

We write like a confident host who knows the producers by first name. Specific. Grounded. Quietly smart. Never hyperbolic, trendy, or salesy.

Tagline: *The Mediterranean, well-chosen.*

---

## Logo

Logo files live in `/public/brand/`:

- `iriska-logo-default.svg` — primary logo (Ink wordmark + Burgundy ".AI"). Use on light surfaces.
- `iriska-logo-cream.svg` — monochrome cream. Use on dark surfaces (Ink, Burgundy-deep).
- `iriska-logo-burgundy.svg` — monochrome Burgundy. Use when single-color is required.
- `iriska-logo-ink.svg` — monochrome Ink. Use for print, B&W, or low-key contexts.

**Rules:**
- Never recolor outside the four provided variants.
- Never stretch, rotate, or apply effects.
- Minimum size: 96px wide on web, 24mm in print.
- Clear space: at least the height of the "I" on all sides.
- The logo is a complete lockup. Don't separate "Iriska" from ".AI".

---

## Color tokens

All colors are exposed as Tailwind utility classes and CSS custom properties. Use semantic names (e.g. `bg-surface`, `text-ink`) over raw colors wherever possible.

### Hero — primary

| Token | HEX | Tailwind | CSS var |
|---|---|---|---|
| Burgundy | `#722F3A` | `bg-burgundy` `text-burgundy` | `--burgundy` |
| Ochre | `#C8923A` | `bg-ochre` `text-ochre` | `--ochre` |
| Olive | `#8C9657` | `bg-olive` `text-olive` | `--olive` |

### Hero — tints

| Token | HEX | Tailwind | CSS var |
|---|---|---|---|
| Burgundy Deep | `#4F1F28` | `burgundy-deep` | `--burgundy-deep` |
| Burgundy Soft | `#9C4754` | `burgundy-soft` | `--burgundy-soft` |
| Ochre Soft | `#E3B35D` | `ochre-soft` | `--ochre-soft` |
| Olive Soft | `#B8C28A` | `olive-soft` | `--olive-soft` |
| Olive Mid | `#6B7339` | `olive-mid` | `--olive-mid` |
| Olive Deep | `#3E5429` | `olive-deep` | `--olive-deep` |

### Neutrals — warm-toned

| Token | HEX | Tailwind | CSS var | Usage |
|---|---|---|---|---|
| Ink | `#211C16` | `text-ink` | `--ink` | Primary text |
| Graphite | `#4A3F32` | `text-graphite` | `--graphite` | Secondary text |
| Stone | `#8A7D6B` | `text-stone` | `--stone` | Muted text, captions |
| Pebble | `#B8A994` | `border-pebble` | `--pebble` | Dividers, borders |
| Bone | `#EDE5D4` | `bg-bone` | `--bone` | Surface (cards) |
| Linen | `#F4EFE6` | `bg-linen` | `--linen` | Page background |
| Cream | `#FBF8F1` | `bg-cream` | `--cream` | Pure surface |

### Semantic — in-family

| Token | HEX | Tailwind | CSS var | Usage |
|---|---|---|---|---|
| Success (Basil) | `#5C7A3D` | `bg-success` | `--success` | Confirmations |
| Warning (Saffron) | `#D9A441` | `bg-warning` | `--warning` | Cautions |
| Error (Madder) | `#722F3A` | `bg-error` | `--error` | Errors (same as Burgundy) |
| Info (Lagoon) | `#3E6B73` | `bg-info` | `--info` | Information |

**Rule:** Never use cold blues or aggressive reds. Semantic colors stay in the warm Mediterranean family.

---

## Typography

Three families. Never substitute.

### Newsreader (display) — `font-display`
Editorial italic for headlines, hero, brand moments. Use sparingly — gravitas comes from restraint.
- Loaded via `next/font/google` from Google Fonts
- Weights used: 400, 500
- Italic for wordmark and hero displays

### Bricolage Grotesque (interface) — `font-sans` (default)
Body, UI, buttons, navigation. Default font for everything that isn't display or label.
- Weights used: 400 (body), 500 (UI captions), 600 (UI strong)

### JetBrains Mono (label) — `font-mono`
Section kickers, data tables headers, badges, technical labels. Always uppercase, wide tracking.
- Weight: 500
- Always pair with `tracking-[0.14em]` and `text-xs uppercase`

### Type scale

```
display      72 / 1.0  / -0.035em   font-display italic
h1           44 / 1.05 / -0.02em    font-display italic
h2           32 / 1.15 / -0.015em   font-display italic
h3           22 / 1.3  / -0.01em    font-sans 500
body-lg      17 / 1.55              font-sans 400
body         14 / 1.55              font-sans 400
caption      12 / 1.4               font-sans 500
label        11 / 0.14em tracking   font-mono 500 uppercase
```

---

## Components

### Buttons
Five variants × three sizes. Primary is Burgundy. Ink appears on light-on-dark. Olive is reserved for success/confirm.

- **Primary** — `bg-burgundy text-cream hover:bg-burgundy-deep`
- **Secondary** — `border border-pebble bg-transparent text-ink`
- **Ink** — `bg-ink text-cream`
- **Olive** — `bg-olive text-cream` (success/confirm only)
- **Ghost** — `bg-transparent text-ink hover:bg-bone`

Sizes: `sm` (32px) · `md` (40px) · `lg` (48px). Disabled state at 50% opacity.

### Cards
- Surface: `bg-cream` or `bg-bone`
- Border: none, or `border border-pebble/60`
- Padding: 24px (mobile) / 32px (desktop)
- Radius: `rounded-lg` (8px)

### Trust score (signature visual)
Ring-chart pill showing curation confidence (e.g. "Trust 98"). The brand's signature UI moment — used on every product card.

### Badges
- Neutral, Featured, New, Verified, In stock, Low stock, Sold out, Limited
- Stay in-family — no harsh primaries

### AI markers
- "AI pick" / "AI match" / "Paired for you" — Burgundy pill with sparkle icon
- Toast variant: dark surface with colored left rule

---

## Motion

Three principles. All defined in `tailwind.config.ts`.

1. **Emerge** — content rises 8px + fades. `260ms ease-out cubic-bezier(.22,.7,.3,1)`
2. **Respond** — hover/press at 120ms with confident curve
3. **Commit** — state changes settle, never bounce

```
duration-fast   120ms   hover, press
duration-base   260ms   emerge, transitions
duration-slow   600-900ms   commit, settle
ease-default    cubic-bezier(.22,.7,.3,1)
```

---

## Page composition rules

- **Backgrounds**: default `bg-linen`. Cards on `bg-cream`. Dark moments use `bg-ink` or `bg-burgundy-deep`.
- **Max content width**: 1280px (desktop). Generous side padding.
- **Vertical rhythm**: section spacing uses 8px increments. No tight stacking.
- **Section headers**: kicker (mono uppercase) + display (Newsreader italic) + supporting body.

---

## What we don't do

- No cold blues
- No emojis in UI copy (badges/icons only)
- No Lorem Ipsum — write specific Mediterranean copy ("Tempranillo Crianza 2022", not "Product 1")
- No drop shadows in the UI (except modals over scrim)
- No gradients except at the lone `iris-seed` watermark
- No bouncy animations
- No heavy dark mode for the default product — dark is reserved for "after-hours" premium moments
