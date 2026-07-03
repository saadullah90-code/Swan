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

- `artifacts/swan-skincare/src/pages/Home.tsx` — page composition + preloader `isLoading` state (order: Preloader, Header, CartDrawer, Hero, Story, FeaturedProducts, Routine, Benefits, Reviews, Footer). `isLoading` is passed to `Hero` to gate its entrance animation.
- `artifacts/swan-skincare/src/components/` — one file per section. Key ones: `Preloader`, `Hero` (centered floating serum bottle, floating benefit pills + left-rail ingredient chips, giant faded "SERUM" bg word, "30 ml" badge, gradient headline; entrance gated on `isLoading`), `Story` (pinned philosophy, `id="philosophy"`), `FeaturedProducts` (`id="shop"`, 3 product cards + exported `products` data), `Routine` (the ritual steps, `id="ritual"`), `Benefits` (marquee), `Reviews` (testimonials, `id="reviews"`), `Footer` (`id="contact"`), `CustomCursor` (magnetic), `SmoothScroll` (Lenis), `Header` (shrink-on-scroll + mobile hamburger menu).
- `artifacts/swan-skincare/src/index.css` — theme tokens as HSL component triples (e.g. `--primary: 340 82% 62%`), consumed via `hsl(var(--primary) / <alpha>)`. Colorful light palette with extra `--c-rose/violet/peach/sky/mint/amber` accent tokens and helper utilities (`.text-gradient`, `.bg-aurora`, `.gradient-border`, `.glass`/`.glass-heavy`, `.luxury-shadow`). The Fontshare `@import` (Clash Display + General Sans) must stay line 1.
- `artifacts/swan-skincare/src/store/useCartStore.ts` — client-side zustand cart + `Product` type.
- Product images/logo imported via the `@assets` alias (see `vite.config.ts`).

## Architecture decisions

- **The old TravelingBottle mechanic was removed.** It was the main source of animation glitches. There is no persistent hero→card bottle anymore; the hero has its own bottle and the middle product card renders its own real Retinol image (no `[data-bottle-slot]`). Do NOT reintroduce a fixed-position traveling bottle.
- **Hero entrance vs. float must not compete.** The entrance timeline (product drops in via `yPercent`, headline lines rise via `yPercent`) runs once, gated by `isLoading` plus a `hasEnteredRef` one-time guard. The gentle infinite float on the product (`y` oscillation) is started only in the timeline's `onComplete`, so the two tweens never fight over the product transform. Do NOT start the float on mount with a fixed delay.
- Nav anchors map to real section ids only: Shop→`#shop`, Philosophy→`#philosophy`, Ritual→`#ritual`, Contact→`#contact`. There is deliberately no Journal/press section.
- Smooth scroll uses Lenis; all GSAP work is wrapped in `gsap.context()` and reverted on unmount.

## Product

Single-page, frontend-only luxury marketing site (artifact `swan-skincare`, previewPath `/`). Colorful (but light, not dark) Awwwards-style theme. Sections in order: cinematic preloader → centered hero (floating serum bottle, benefit pills, ingredient chips, giant faded "SERUM" word) → pinned story/philosophy → product collection → routine/ritual → benefits marquee → reviews/testimonials → footer. The hero entrance is the signature moment: product drops from the top, the bold gradient headline rises from the bottom. Client-side cart (zustand) with a slide-out drawer — no real checkout or persistence. Three real products, all 30ml: Hyaluronic Acid Serum ($68, blue), Vitamin C Serum ($72, pink), Retinol Serum ($76, rose). Footer reads "Developed by BranX". Fonts: Clash Display (display) + General Sans (sans), via Fontshare.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The hero's Framer Motion entrance delays (~2.2–3.5s) are synced to the 2.5s cinematic preloader. A fresh-load screenshot always captures the preloader/blank hero because content is still `opacity: 0` at capture time. To visually verify the hero, temporarily shorten the preloader timer in `Home.tsx` AND the hero delays in `Hero.tsx`, then restore both.
- The Fontshare `@import` (Clash Display + General Sans) must be the very first line of `src/index.css` (before the tailwindcss/plugin imports) or the build fails.
- To screenshot the hero settled (bypassing the timed entrance), temporarily set Home's `isLoading` initial state to `false` AND add `if (true) return;` right after the entrance guard in `Hero.tsx`. Always revert both afterward.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
