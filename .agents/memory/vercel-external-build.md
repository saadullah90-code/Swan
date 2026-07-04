---
name: Vercel / external static-host builds for swan-skincare
description: How the swan-skincare Vite artifact is made buildable outside Replit and why images were converted to WebP.
---

# Building swan-skincare outside Replit (Vercel etc.)

**Root cause of "build error on Vercel":** `artifacts/swan-skincare/vite.config.ts` used to `throw` when `PORT` or `BASE_PATH` were absent. Replit's workflow injects both, but external hosts (Vercel/CI) do not, so `vite build` crashed before bundling.

**Fix (keep it this way):** fall back instead of throwing — `port` defaults to 5173, `base` defaults to `/`. Replit still overrides via its injected env vars, so dev/preview and Replit deploy are unaffected.
**Why:** the throws were a Replit-only guardrail; a static host serves from the site root and never needs a dev PORT.

**Vercel config lives in root `vercel.json`:** Root Directory must stay the repo root so the workspace `pnpm --filter @workspace/swan-skincare run build` and `outputDirectory: artifacts/swan-skincare/dist/public` resolve. SPA `rewrites` to `/index.html` are required or wouter deep links (`/product/:id`) 404 on refresh.

**Performance — the big win was images, not JS.** The imported PNGs were ~6.2 MB total (logo alone 2.1 MB rendered tiny). Converted to resized WebP in `attached_assets/optimized/` (~230 KB total) and repointed imports. Regenerate with `sharp` if source art changes — sharp is NOT kept as a dep, add it ad hoc (`pnpm add -Dw sharp`), generate, then remove.
**How to apply:** any new large raster asset for this site should be resized + WebP-encoded before import; don't import multi-MB PNGs directly.
