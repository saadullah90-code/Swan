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

- `artifacts/swan-skincare/src/pages/Home.tsx` — page composition + preloader `isLoading` state (order: Preloader, Header, CartDrawer, TravelingBottle, Hero, Story, FeaturedProducts, Benefits, Footer).
- `artifacts/swan-skincare/src/components/` — one file per section. Key ones: `Preloader`, `Hero`, `Story` (pinned philosophy, `id="philosophy"`), `FeaturedProducts` (`id="shop"`, 3 product cards + product data), `TravelingBottle` (the persistent hero→card bottle), `Benefits` (marquee), `Footer` (`id="contact"`), `CustomCursor` (magnetic), `SmoothScroll` (Lenis), `Header` (shrink-on-scroll).
- `artifacts/swan-skincare/src/index.css` — theme tokens as HSL component triples (e.g. `--primary: 345 35% 65%`), consumed via `hsl(var(--primary) / <alpha>)`. Font `@import` must stay line 1.
- `artifacts/swan-skincare/src/store/useCartStore.ts` — client-side zustand cart + `Product` type.
- Product images/logo imported via the `@assets` alias (see `vite.config.ts`).

## Architecture decisions

- **Traveling bottle is element-driven, not viewport-percentage-driven.** `TravelingBottle` is a `position: fixed` image whose center is set each scroll frame; the landing phase measures the live `getBoundingClientRect()` of `[data-bottle-slot]` (the empty middle product-card image area). Reading the slot live every frame makes the landing immune to Story's pinning and to resize — do NOT revert to animating to fixed `top/left` percentages.
- The glow div shares the exact same computed transform as the bottle (same `place()` call) so it can never detach.
- The middle product card intentionally renders an empty `[data-bottle-slot]` (no `<img>`); the traveling Retinol bottle IS that card's product image once it lands.
- Nav anchors map to real section ids only: Shop→`#shop`, Philosophy→`#philosophy`, Contact→`#contact`. There is deliberately no Journal/press section.
- Smooth scroll uses Lenis; all GSAP work is wrapped in `gsap.context()` and reverted on unmount.

## Product

Single-page, frontend-only luxury marketing site (artifact `swan-skincare`, previewPath `/`). Sections: cinematic preloader → off-centered hero → pinned story/philosophy → product collection (with the traveling bottle landing into the middle card) → marquee → footer. The signature interaction is the single hero Retinol bottle that persists and travels down the page into the middle product card. Client-side cart (zustand) with a slide-out drawer — no real checkout or persistence. Three real products, all 30ml: Hyaluronic Acid Serum ($68, blue), Vitamin C Serum ($72, pink), Retinol Serum ($76, rose). Palette is soft blush pink / cream / rose gold; footer reads "Developed by BranX". Fonts: Playfair Display (serif) + Outfit (sans).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The hero's Framer Motion entrance delays (~2.2–3.5s) are synced to the 2.5s cinematic preloader. A fresh-load screenshot always captures the preloader/blank hero because content is still `opacity: 0` at capture time. To visually verify the hero, temporarily shorten the preloader timer in `Home.tsx` AND the hero delays in `Hero.tsx`, then restore both.
- The Google Fonts `@import` must be the very first line of `src/index.css` (before the tailwindcss/plugin imports) or the build fails.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
