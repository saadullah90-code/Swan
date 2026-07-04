---
name: SWAN mobile responsiveness strategy
description: How the heavy scroll-choreography (Lenis + travelling bottle) is disabled on touch/mobile and replaced with static content, and why the JS gate must match the CSS gate.
---

# SWAN mobile strategy

The signature scroll choreography (Lenis smooth-scroll + the single per-frame fixed
TravelingBottle) is **desktop/mouse-only**. On touch devices it caused jank and a
"bottle jumps around" glitch, because a fixed per-frame element jumps whenever the
mobile browser's address bar resizes the viewport, and `backdrop-filter` blur repaints
every scroll frame.

**Gate:** `DESKTOP_MQ = '(min-width: 768px) and (pointer: fine)'` (in `src/lib/useIsDesktop.ts`).
Width-only is NOT enough — landscape phones/tablets exceed 768px but must still get the
mobile experience, so the `pointer: fine` clause is required.

**Rules:**
- `SmoothScroll` and `TravelingBottle` both gate on `useIsDesktop()` and react to media
  changes (init/destroy Lenis, mount/unmount bottle) — not mount-only.
- Each `[data-bottle-slot]` marker stays in the DOM always (the desktop bottle reads
  their live rects). On non-desktop, a static `<img>` bottle is shown inside/near each
  slot and the empty collection-middle marker collapses.
- **Static-image visibility is driven by CSS classes `.slot-static` / `.slot-marker`
  whose media query is kept byte-identical to `DESKTOP_MQ`.** Do NOT use Tailwind
  `md:hidden`/`hidden md:block` for this — `md:` is width-only and would drift from the
  pointer-based JS gate, leaving slots empty on wide touch devices.

**Why:** any divergence between the JS gate (which controls whether the travelling
bottle renders) and the CSS gate (which controls whether static bottles show) produces
either empty slots or double bottles. Keep them in lockstep.

**Also:** `backdrop-filter` is capped to `blur(8px)` under `@media (pointer: coarse)`
to relieve mobile GPUs.
