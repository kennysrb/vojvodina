# Vojvodina HC Rebrand Design

## Overview

Rebrand the website from "Cones Belgrade" to "Vojvodina HC". This covers:

1. CSS design token renames and color value updates
2. Surface palette regeneration based on the new dark anchor
3. Brand text string replacements throughout the codebase

Approach: batch find-replace for class names, manual updates for text strings and CSS.

---

## 1. CSS Tokens (`app/globals.css`)

### Brand token renames and new values

| Old token                   | New token                     | New value                                     |
| --------------------------- | ----------------------------- | --------------------------------------------- |
| `--color-cones-blue`        | `--color-vojvodina-red`       | `#ed3237`                                     |
| `--color-cones-blue-dark`   | `--color-vojvodina-red-dark`  | `#c5282d`                                     |
| `--color-cones-orange`      | `--color-vojvodina-light`     | `#fefefe`                                     |
| `--color-cones-orange-dark` | `--color-vojvodina-light-dim` | `#d9d5d6`                                     |
| `--color-cones-black`       | `--color-vojvodina-dark`      | `#373435`                                     |
| `--shadow-cones-blue`       | `--shadow-vojvodina-red`      | `0 10px 30px -10px rgba(237, 50, 55, 0.45)`   |
| `--shadow-cones-orange`     | `--shadow-vojvodina-light`    | `0 10px 30px -10px rgba(254, 254, 254, 0.20)` |

### Surface palette (derived from `#373435` as darkest anchor)

| Token                 | Value     |
| --------------------- | --------- |
| `--color-surface-900` | `#373435` |
| `--color-surface-800` | `#413f40` |
| `--color-surface-700` | `#4d4a4b` |
| `--color-surface-600` | `#5a5758` |
| `--color-surface-500` | `#696667` |
| `--color-surface-400` | `#807d7e` |
| `--color-surface-300` | `#9a9798` |
| `--color-surface-200` | `#b6b3b4` |
| `--color-surface-100` | `#d3d0d1` |
| `--color-surface-50`  | `#f0edee` |

### Global element updates in `globals.css`

- `html, body` background: `#0A0C10` → `#373435`
- `html, body` color: `#E4E8F0` → `#f0edee`
- `::selection` background: `#00ADF1` → `#ed3237`
- `::selection` color: `#0A0C10` → `#fefefe`

---

## 2. Class Name Batch Replacements (all `.tsx` / `.ts` files)

Run exact string replacement across the entire codebase:

| Old class fragment | New class fragment |
| ------------------ | ------------------ |
| `cones-blue`       | `vojvodina-red`    |
| `cones-orange`     | `vojvodina-light`  |
| `cones-black`      | `vojvodina-dark`   |

This covers all Tailwind utility classes: `bg-*`, `text-*`, `border-*`, `hover:*`, `focus-visible:*`, `ring-*`, etc.

---

## 3. Brand Text Changes (manual, file by file)

| File                                | Old                                                          | New                                                                    |
| ----------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `components/layout/Nav.tsx`         | `CONES <span>BELGRADE</span>`                                | `VOJVO<span>DINA</span>`                                               |
| `components/layout/Nav.tsx`         | alt `"Cones Belgrade"`                                       | `"Vojvodina HC"`                                                       |
| `components/layout/Footer.tsx`      | `CONES <span>BELGRADE</span>`                                | `VOJVO<span>DINA</span>`                                               |
| `components/layout/Footer.tsx`      | `© {year} Cones Belgrade.`                                   | `© {year} Vojvodina HC.`                                               |
| `components/home/Hero.tsx`          | alt `"Cones Belgrade"`                                       | `"Vojvodina HC"`                                                       |
| `components/home/About.tsx`         | alt `"Cones Belgrade team"`                                  | `"Vojvodina HC team"`                                                  |
| `app/layout.tsx`                    | `title: "Cones Belgrade"`                                    | `title: "Vojvodina HC"`                                                |
| `app/manifest.ts`                   | `name: "Cones Belgrade"`, `short_name: "Cones"`, description | `name: "Vojvodina HC"`, `short_name: "Vojvodina"`, updated description |
| `app/[locale]/news/[slug]/page.tsx` | fallback `conesbelgrade.rs`                                  | `vojvodinahc.rs`                                                       |
| `messages/en.json`                  | 2× "Cones Belgrade"                                          | "Vojvodina HC"                                                         |
| `messages/sr.json`                  | 2× "Cones Belgrade"                                          | "Vojvodina HC"                                                         |

**Leave unchanged** (external URLs / real contact info that can't be updated here):

- `vojvodinahc@gmail.com` in Footer
- Instagram and YouTube social links in Footer

---

## 4. Out of Scope

- Logo image (`/logo.png`) — asset swap not part of this task
- Sanity CMS content — not touched
- E2E / unit tests — only update if they assert on brand strings
