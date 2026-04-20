# Vojvodina HC Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the entire website from "Cones Belgrade" to "Vojvodina HC" — rename CSS design tokens, update color values and surface palette, and replace all brand text strings.

**Architecture:** Three independent passes: (1) update `globals.css` with new token names and values, (2) batch find-replace class names across all TSX/TS source files, (3) manually update brand text strings, messages, and app-level metadata.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4 (`@theme` in CSS), next-intl (JSON message files)

---

## Files Modified

| File | Change |
|---|---|
| `app/globals.css` | Rename tokens, update color values, regenerate surface palette |
| `components/ui/__tests__/tokens.test.tsx` | Update token class names to match new names |
| `e2e/smoke.spec.ts` | Update brand text assertion |
| `components/layout/Nav.tsx` | Brand name text + logo alt |
| `components/layout/Footer.tsx` | Brand name text + copyright |
| `components/home/Hero.tsx` | Logo alt text |
| `components/home/About.tsx` | Team photo alt text |
| `app/layout.tsx` | Metadata title |
| `app/manifest.ts` | PWA name, short_name, description, background_color, theme_color |
| `app/[locale]/news/[slug]/page.tsx` | Fallback SITE_URL |
| `messages/en.json` | Hero title lines, about description, news page title |
| `messages/sr.json` | Same three strings in Serbian |
| All other `.tsx`/`.ts` source files | Automated class name replacement (cones-* → vojvodina-*) |

---

## Task 1: Update CSS tokens and surface palette

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the entire `@theme` brand + surface block**

Open `app/globals.css` and replace the full `@theme { ... }` block with:

```css
@theme {
  /* Brand colors */
  --color-vojvodina-red: #ed3237;
  --color-vojvodina-red-dark: #c5282d;
  --color-vojvodina-light: #fefefe;
  --color-vojvodina-light-dim: #d9d5d6;
  --color-vojvodina-dark: #373435;

  /* Surface palette (derived from #373435 as darkest anchor) */
  --color-surface-900: #373435;
  --color-surface-800: #413f40;
  --color-surface-700: #4d4a4b;
  --color-surface-600: #5a5758;
  --color-surface-500: #696667;
  --color-surface-400: #807d7e;
  --color-surface-300: #9a9798;
  --color-surface-200: #b6b3b4;
  --color-surface-100: #d3d0d1;
  --color-surface-50: #f0edee;

  /* Font families */
  --font-family-display: var(--font-display), Impact, sans-serif;
  --font-family-heading: var(--font-heading), Inter, sans-serif;
  --font-family-body: var(--font-body), system-ui, sans-serif;

  /* Geist fonts from create-next-app */
  --font-family-sans: var(--font-geist-sans);
  --font-family-mono: var(--font-geist-mono);

  /* Sizing tokens */
  --width-container: 1280px;
  --spacing-nav: 72px;
  --radius-pill: 9999px;

  /* Box shadows */
  --shadow-vojvodina-red: 0 10px 30px -10px rgba(237, 50, 55, 0.45);
  --shadow-vojvodina-light: 0 10px 30px -10px rgba(254, 254, 254, 0.20);
}
```

- [ ] **Step 2: Update global element styles**

Replace the `html, body` and `::selection` blocks in `app/globals.css`:

```css
html, body {
  background: #373435;
  color: #f0edee;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #ed3237;
  color: #fefefe;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: update CSS tokens to Vojvodina HC brand colors"
```

---

## Task 2: Batch replace CSS class names in source files

**Files:**
- Modify: all `.tsx` and `.ts` files under `app/`, `components/`, `lib/`, `e2e/` (excluding `globals.css` and test/spec files that assert on class names — those are handled in Task 3)

- [ ] **Step 1: Run the three replacement passes**

Run from the project root. The `-i ''` flag is macOS `sed` syntax.

```bash
# Replace cones-blue with vojvodina-red
find app components lib -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/cones-blue/vojvodina-red/g'

# Replace cones-orange with vojvodina-light
find app components lib -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/cones-orange/vojvodina-light/g'

# Replace cones-black with vojvodina-dark
find app components lib -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/cones-black/vojvodina-dark/g'
```

- [ ] **Step 2: Verify no old class names remain**

```bash
grep -r "cones-blue\|cones-orange\|cones-black" app components lib --include="*.tsx" --include="*.ts"
```

Expected output: no matches.

- [ ] **Step 3: Update the unit test to match new token names**

Replace the entire content of `components/ui/__tests__/tokens.test.tsx` with:

```tsx
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("tailwind design tokens are available via class names", () => {
  const { container } = render(<div className="bg-vojvodina-red text-vojvodina-light">x</div>);
  const el = container.firstChild as HTMLElement;
  expect(el.className).toContain("bg-vojvodina-red");
  expect(el.className).toContain("text-vojvodina-light");
});
```

- [ ] **Step 4: Run unit tests**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: rename cones-* CSS classes to vojvodina-* throughout"
```

---

## Task 3: Update brand text in layout components

**Files:**
- Modify: `components/layout/Nav.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Update Nav brand name and alt text**

In `components/layout/Nav.tsx`, make these two changes:

Change the logo `alt` attribute (line 26):
```tsx
<Image src="/logo.png" alt="Vojvodina HC" width={40} height={40} className="h-10 w-10 object-contain" />
```

Change the brand name span (line 28):
```tsx
<span className="font-display text-2xl tracking-wide text-surface-50">
  VOJVO<span className="text-vojvodina-light">DINA</span>
</span>
```

- [ ] **Step 2: Update Footer brand name and copyright**

In `components/layout/Footer.tsx`, make these two changes:

Change the brand name paragraph (line 14):
```tsx
<p className="font-display text-3xl text-surface-50">
  VOJVO<span className="text-vojvodina-light">DINA</span>
</p>
```

Change the copyright line (line 88):
```tsx
© {year} Vojvodina HC. {tF("rights")}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Footer.tsx
git commit -m "style: rebrand nav and footer to Vojvodina HC"
```

---

## Task 4: Update alt text in home components

**Files:**
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/About.tsx`

- [ ] **Step 1: Update Hero alt text**

In `components/home/Hero.tsx`, find the `alt="Cones Belgrade"` attribute and change it to:
```tsx
alt="Vojvodina HC"
```

- [ ] **Step 2: Update About alt text**

In `components/home/About.tsx`, find the `alt="Cones Belgrade team"` attribute and change it to:
```tsx
alt="Vojvodina HC team"
```

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx components/home/About.tsx
git commit -m "style: update image alt text to Vojvodina HC"
```

---

## Task 5: Update messages (en.json and sr.json)

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/sr.json`

- [ ] **Step 1: Update English messages**

In `messages/en.json`, make these changes:

```json
"hero": {
  "eyebrow": "Vojvodina's hockey club",
  "titleLine1": "VOJVODINA",
  "titleLine2": "HC",
  ...
},
"about": {
  ...
  "description": "Founded in 2014, Vojvodina HC is a club that stands behind every player — whether a veteran or lacing up skates for the first time.",
  ...
},
"newsPage": {
  ...
  "title": "Latest from Vojvodina HC",
  ...
},
```

Full updated sections (keep all other keys unchanged):

```json
"hero": {
  "eyebrow": "Vojvodina's hockey club",
  "titleLine1": "VOJVODINA",
  "titleLine2": "HC",
  "lead": "Ice hockey at the heart of Vojvodina. Passion, teamwork, and fair play since 2014.",
  "ctaPrimary": "Join the team",
  "ctaSecondary": "Learn more",
  "stats": { "yearsLabel": "Years of history", "membersLabel": "Members", "matchesLabel": "Matches played" }
},
"about": {
  "eyebrow": "About the club",
  "title": "Passion on the ice, community off it",
  "description": "Founded in 2014, Vojvodina HC is a club that stands behind every player — whether a veteran or lacing up skates for the first time.",
  "pillars": {
    "passionTitle": "Passion", "passionText": "Every practice, every game — no compromises.",
    "unityTitle": "Team", "unityText": "We play for each other, above all else.",
    "fairTitle": "Fair play", "fairText": "We respect opponents, referees, and the game.",
    "communityTitle": "Community", "communityText": "A club connecting generations of Vojvodina hockey."
  }
},
"newsPage": {
  "eyebrow": "News",
  "title": "Latest from Vojvodina HC",
  "description": "Matches, tournaments, new jerseys, and stories from the club.",
  "filters": { "all": "All", "tournament": "Tournaments", "club": "Club", "roster": "Roster", "match": "Matches", "community": "Community" },
  "empty": "No news yet. Check back soon."
},
```

- [ ] **Step 2: Update Serbian messages**

In `messages/sr.json`, make these changes:

```json
"hero": {
  "eyebrow": "Hokejaški klub Vojvodine",
  "titleLine1": "VOJVODINA",
  "titleLine2": "HC",
  "lead": "Hokej na ledu u srcu Vojvodine. Strast, timski duh i fer-plej od 2014. godine.",
  "ctaPrimary": "Pridruži se timu",
  "ctaSecondary": "Saznaj više",
  "stats": { "yearsLabel": "Godina istorije", "membersLabel": "Članova", "matchesLabel": "Odigranih utakmica" }
},
"about": {
  "eyebrow": "O klubu",
  "title": "Strast na ledu, zajednica van njega",
  "description": "Osnovan 2014. godine, Vojvodina HC je klub koji stoji iza svakog igrača, bilo da je veteran ili prvi put obuo klizaljke.",
  "pillars": {
    "passionTitle": "Strast", "passionText": "Svaki trening, svaka utakmica — bez kompromisa.",
    "unityTitle": "Tim", "unityText": "Igramo jedni za druge, pre svega ostalog.",
    "fairTitle": "Fer-plej", "fairText": "Poštujemo protivnika, sudije i igru.",
    "communityTitle": "Zajednica", "communityText": "Klub koji povezuje generacije hokejaša Vojvodine."
  }
},
"newsPage": {
  "eyebrow": "Vesti",
  "title": "Najnovije iz Vojvodina HC",
  "description": "Utakmice, turniri, novi dresovi i priče iz kluba.",
  "filters": { "all": "Sve", "tournament": "Turniri", "club": "Klub", "roster": "Ekipa", "match": "Utakmice", "community": "Zajednica" },
  "empty": "Trenutno nema vesti. Vratite se uskoro."
},
```

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/sr.json
git commit -m "content: update brand strings to Vojvodina HC in both locales"
```

---

## Task 6: Update app-level metadata and manifest

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/manifest.ts`
- Modify: `app/[locale]/news/[slug]/page.tsx`

- [ ] **Step 1: Update root metadata title**

In `app/layout.tsx`, change:
```ts
export const metadata = { title: "Vojvodina HC" };
```

- [ ] **Step 2: Update PWA manifest**

Replace the entire `app/manifest.ts` with:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vojvodina HC",
    short_name: "Vojvodina",
    description: "Vojvodina hockey club — Vojvodina HC",
    start_url: "/",
    display: "standalone",
    background_color: "#373435",
    theme_color: "#ed3237",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

- [ ] **Step 3: Update fallback SITE_URL**

In `app/[locale]/news/[slug]/page.tsx`, find the fallback URL on line 85 and change:
```ts
url: `${process.env.SITE_URL ?? "https://vojvodinahc.rs"}/${locale}/news/${slug}`,
```

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/manifest.ts "app/[locale]/news/[slug]/page.tsx"
git commit -m "meta: update page title, manifest, and fallback URL to Vojvodina HC"
```

---

## Task 7: Update e2e smoke test

**Files:**
- Modify: `e2e/smoke.spec.ts`

- [ ] **Step 1: Update the hero heading assertion**

In `e2e/smoke.spec.ts`, change line 5:
```ts
await expect(page.getByRole("heading", { level: 1 })).toContainText("VOJVODINA");
```

- [ ] **Step 2: Commit**

```bash
git add e2e/smoke.spec.ts
git commit -m "test: update smoke test brand assertion to Vojvodina HC"
```

---

## Task 8: Verify and final checks

- [ ] **Step 1: Run unit tests**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 2: Verify no old brand references remain in source**

```bash
grep -r "Cones Belgrade\|CONES BELGRADE\|cones-blue\|cones-orange\|cones-black\|conesbelgrade" \
  app components messages lib e2e \
  --include="*.tsx" --include="*.ts" --include="*.json"
```

Expected: no matches.

- [ ] **Step 3: Start dev server and do a visual check**

```bash
pnpm dev
```

Open `http://localhost:3000` and verify:
- Nav shows "VOJVO**DINA**" with light-colored "DINA"
- Hero shows "VOJVODINA" in red and "HC" in light/white
- Footer shows "VOJVO**DINA**" and copyright "Vojvodina HC"
- Background is warm dark gray (`#373435`), not near-black
- Red (`#ed3237`) is used for primary accents (active nav links, buttons, stat numbers)
