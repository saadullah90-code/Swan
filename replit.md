# SWAN Skincare

An ultra-premium, cinematic single-page marketing website for the SWAN Skincare luxury serum line, built to an Awwwards-level standard with GSAP + Framer Motion animations.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

Single-page, frontend-only luxury marketing site (artifact `swan-skincare`, previewPath `/`). Sections: cinematic preloader, hero, story/philosophy, horizontal-scroll headline, product shop, ingredients, ritual, press/journal, footer. Client-side cart (zustand) with a slide-out drawer — no real checkout or persistence. Three real products, all 30ml: Hyaluronic Acid Serum ($68, blue), Vitamin C Serum ($72, pink), Retinol Serum ($76, rose). Palette is soft blush pink / cream / rose gold; footer reads "Developed by BranX". Fonts: Playfair Display (serif) + Outfit (sans).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The hero's Framer Motion entrance delays (~2.2–3.5s) are synced to the 2.5s cinematic preloader. A fresh-load screenshot always captures the preloader/blank hero because content is still `opacity: 0` at capture time. To visually verify the hero, temporarily shorten the preloader timer in `Home.tsx` AND the hero delays in `Hero.tsx`, then restore both.
- The Google Fonts `@import` must be the very first line of `src/index.css` (before the tailwindcss/plugin imports) or the build fails.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
