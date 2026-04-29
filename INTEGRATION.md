# How to integrate Iriska brand into the project

This package contains everything needed to apply the Iriska brand system to the existing Next.js project.

---

## Step 1 — Drop files into the project

From this package, copy into your `iriska/` project root, replacing existing files where they overlap:

| Source in this package | Destination in `iriska/` project |
|---|---|
| `BRAND.md` | `BRAND.md` (project root) |
| `tailwind.config.ts` | `tailwind.config.ts` (replace existing) |
| `app/layout.tsx` | `app/layout.tsx` (replace existing) |
| `app/globals.css` | `app/globals.css` (replace existing) |
| `components/Logo.tsx` | `components/Logo.tsx` (new file — create `components/` folder if missing) |
| `public/brand/*` (8 files) | `public/brand/*` (new folder) |

After copying, restart the dev server:

```bash
npm run dev
```

---

## Step 2 — Tell Cursor what to do

Open Cursor in the `iriska/` project. In the right-side AI chat (Agent), paste this prompt:

```
Read BRAND.md carefully — it is the source of truth for our visual identity.

Then update the existing landing page in app/page.tsx to fully comply with the brand system:

1. Replace the current logo with our <Logo /> component (import from "@/components/Logo")
2. Switch the page background to bg-linen
3. Use font-display italic for the hero headline (h1)
4. Use font-mono uppercase tracked for section kickers ("01 — INTRODUCTION", "WHY IRISKA", "PRODUCT PORTFOLIO" style labels)
5. Body copy uses the default font-sans (Bricolage Grotesque)
6. All buttons follow the BRAND.md button system — Primary is bg-burgundy text-cream
7. Cards use bg-cream with subtle border-pebble/60
8. Add the Trust score visual (ring chart pill) where products are shown
9. Replace any generic copy with Mediterranean-specific copy: real product examples like "Rioja Reserva 2019" / "Manchego 12-month" / "Koroneiki EV Oil"
10. Add the tagline "The Mediterranean, well-chosen" somewhere prominent

Keep the structure of the current page but make it look and feel like the Iriska brand book — editorial, warm, restrained. No emojis in UI, no Lorem Ipsum, no cold blues.

After your changes, briefly describe what you updated.
```

Cursor will then read `BRAND.md` itself and rewrite the landing page in compliance with it. Review the diff, accept good changes, push back on anything that drifts from the brand.

---

## Step 3 — Commit and deploy

Once the lander looks right:

```bash
git add .
git commit -m "Apply Iriska brand system v1.0"
git push
```

Vercel will auto-deploy. Visit `iriska-inky.vercel.app` to see the rebranded site.

---

## What's in this package

```
iriska-brand-package/
├── BRAND.md                       ← source of truth for AI
├── INTEGRATION.md                 ← this file
├── tailwind.config.ts             ← brand tokens as Tailwind classes
├── app/
│   ├── layout.tsx                 ← loads Newsreader + Bricolage + JetBrains Mono
│   └── globals.css                ← CSS variables, base styles
├── components/
│   └── Logo.tsx                   ← <Logo /> component, 4 variants
└── public/
    └── brand/
        ├── iriska-logo-default.svg     ← Ink + Burgundy AI (primary)
        ├── iriska-logo-cream.svg       ← for dark surfaces
        ├── iriska-logo-burgundy.svg    ← single-color burgundy
        ├── iriska-logo-ink.svg         ← single-color ink
        └── (matching .png versions for fallback / email / OG)
```

---

## After integration — what to verify

Open the site and check:

- [ ] Logo appears at 200px wide on the landing page
- [ ] Hero headline is in Newsreader italic
- [ ] Section kickers are in JetBrains Mono uppercase, tracked wide
- [ ] Body text is in Bricolage Grotesque
- [ ] Page background is the warm `linen` cream, not white
- [ ] Primary CTA button is burgundy, hovers to burgundy-deep
- [ ] Real Mediterranean product names instead of placeholders
- [ ] Tagline "The Mediterranean, well-chosen" visible
- [ ] No emojis or icons of food
- [ ] No cold blues or aggressive reds in any UI element
- [ ] Trust score pill appears on product cards (if products are shown)

Anything off — tell Cursor specifically what's wrong, referencing BRAND.md by section.

---

## Next step after this

Once brand is integrated and verified — we'll move to **database integration**. Don't start that until brand is locked in.
