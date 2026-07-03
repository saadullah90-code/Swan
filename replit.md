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

- `artifacts/swan-skincare/src/pages/Home.tsx` — page composition + preloader `isLoading` state (order: Preloader, Header, CartDrawer, TravelingBottle, Hero, Story, FeaturedProducts, SwanSection, Routine, RitualFace, Benefits, Reviews, Footer). `isLoading` is passed to `Hero` AND `TravelingBottle` to gate their entrance animations.
- `artifacts/swan-skincare/src/pages/ProductDetail.tsx` — standalone product page at route `/product/:id` (wouter `useParams`), reuses Header/CartDrawer/Footer, looks up product via `getProduct` from `src/data/products.ts`, has its own fly-to-cart. "Back to collection" via wouter `useLocation`.
- `artifacts/swan-skincare/src/data/products.ts` — single source of truth for products (enriched: tagline, longDescription, benefits, howToUse, keyIngredients) + `getProduct(id)`. Re-exported from `FeaturedProducts.tsx` for backward compat.
- `artifacts/swan-skincare/src/lib/flyToCart.ts` — clones a product image and animates it to `#cart-fly-target` (the Header bag icon); returns a Promise. Handlers delay `addItem` by 750ms so the clone lands before the cart count bumps.
- `artifacts/swan-skincare/src/components/` — one file per section. Key ones: `Preloader`, `Hero` (floating benefit pills + left-rail ingredient chips, giant faded prominent "SERUM" bg word, "30 ml" badge, headline with "perfected." in solid `.text-luxury` wine color — NOT gradient; the hero's own bottle was replaced by an empty `[data-bottle-slot="0"]` marker; the "SERUM" bg word rises from below and headline lines rise from below, gated on `isLoading` — the bottle itself drops from the top, owned by `TravelingBottle`), `TravelingBottle` (see architecture decisions), `SwanSection` (animated swan line-art, `swan_line_art.png`, holds left-positioned `[data-bottle-slot="2"]` — kept visible on all breakpoints), `RitualFace` (luxury "lady applying serum" section, `lady_serum_ritual.png`, holds `[data-bottle-slot="3"]`), `Story` (pinned philosophy, `id="philosophy"`), `FeaturedProducts` (`id="shop"`, 3 product cards; middle card holds `[data-bottle-slot="1"]` as an empty marker — no dashed border, no own image), `Routine` (the ritual steps, `id="ritual"`), `Benefits` (marquee), `Reviews` (testimonials, `id="reviews"`, holds `[data-bottle-slot="4"]`), `Footer` (`id="contact"`, "Developed by BranX"), `CustomCursor` (magnetic), `SmoothScroll` (Lenis, bridged to `ScrollTrigger.update` + `gsap.ticker`), `Header` (shrink-on-scroll, `.glossy` when scrolled, bigger logo, `id="cart-fly-target"` on bag icon, mobile hamburger menu).
- `artifacts/swan-skincare/src/index.css` — theme tokens as HSL component triples (e.g. `--primary: 340 82% 62%`), consumed via `hsl(var(--primary) / <alpha>)`. Colorful light palette with extra `--c-rose/violet/peach/sky/mint/amber` accent tokens and helper utilities (`.text-gradient`, `.bg-aurora`, `.gradient-border`, `.glass`/`.glass-heavy`, `.luxury-shadow`). The Fontshare `@import` (Clash Display + General Sans) must stay line 1.
- `artifacts/swan-skincare/src/store/useCartStore.ts` — client-side zustand cart + `Product` type.
- Product images/logo imported via the `@assets` alias (see `vite.config.ts`).

## Architecture decisions

- **The TravelingBottle is a single scroll-driven bottle that travels down the whole page** (hero → middle product card → swan-left → ritual card → reviews). It is a fixed-position element (`TravelingBottle.tsx`) whose position/scale is recomputed **every frame via `gsap.ticker.add`** (NOT a scrubbed ScrollTrigger). Slots are empty `[data-bottle-slot="N"]` markers, N = 0 hero, 1 collection middle card, 2 swan (left), 3 ritual card, 4 reviews (ascending numeric = vertical DOM order). Each frame it reads the LIVE `getBoundingClientRect` of every slot, computes each slot's "anchor" scroll position (the `scrollY` at which that slot sits at the vertical center of the viewport), finds which two anchors the current `scrollY` is between, and lerps position/scale between those two slots' live rects. **Do NOT go back to a single scrubbed ScrollTrigger with global progress mapped evenly across segments (`p * segs`)** — that made the bottle race ahead of the actual sections (sticking/stutter) and freeze over the footer. Past the last anchor it docks to the last slot's live rect so it scrolls away with the page (never floats over the footer). Rotation is a full 360° clockwise (`power2.in`) applied only during segment 0 (hero→collection). Entrance drops in **from the top** (`gsap.from(entrance, { y: -220 })`). Nested wrappers keep transforms from fighting: outer(translate+scale, set by ticker) > entrance(one-time drop) > rotator(rotate, set by ticker) > float(infinite y). Reading live rects each frame means it survives layout/resize with no `ScrollTrigger.refresh` needed. **Every slot must stay visible on every breakpoint** — if a slot is hidden its rect collapses and the bottle scales toward 0 (the swan-left slot is positioned, never `hidden`). The hero and middle product card hold only slot markers; they render no bottle image of their own.
- **SmoothScroll must bridge Lenis to ScrollTrigger.** `lenis.on('scroll', ScrollTrigger.update)` plus driving `lenis.raf` from `gsap.ticker` (with `lagSmoothing(0)`) keeps scrubbed animations (especially the TravelingBottle) in phase with smooth scroll. Without this the bottle jitters/lags. Do NOT remove this bridge.
- **Hero entrance vs. float must not compete.** The Hero entrance timeline runs once, gated by `isLoading` plus a `hasEnteredRef` one-time guard. The TravelingBottle owns the bottle's transform now (entrance rise + gentle infinite float wrapped in a `gsap.context()` that is reverted on unmount), so it no longer competes with the Hero.
- **TravelingBottle tweens are wrapped in `gsap.context()`** and the `gsap.ticker` callback + context are removed/reverted on unmount to avoid orphaned infinite float tweens and a dangling per-frame ticker after route changes.
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
