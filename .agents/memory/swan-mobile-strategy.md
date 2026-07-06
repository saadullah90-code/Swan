---
name: SWAN mobile smooth-scroll strategy
description: Why Lenis runs on all devices and how the per-frame travelling bottle is kept smooth on mobile.
---

# SWAN mobile strategy

The signature travelling serum bottle is a single fixed element positioned per-frame
from the scroll position + live slot rects. It runs on all devices and must feel as
smooth on mobile as on desktop.

## Lenis runs on ALL devices — do not re-gate it to desktop
**Why:** a JS-positioned per-frame element lags native mobile momentum scroll (which
runs on the compositor thread) → jitter/"swim". Driving touch through Lenis's sync-touch
mode puts scroll on the same gsap.ticker as the bottle, so they stay in phase — same as
desktop. An earlier note claimed "Lenis fights native touch"; that was *without*
sync-touch. Touch options don't affect desktop wheel scrolling, so desktop is unchanged.
**How to apply:** keep Lenis a single instance on one RAF loop; never add a second raf.

## Viewport-height jumps on mobile
**Why:** the mobile address bar hiding/showing changes innerHeight mid-scroll, which
shifted the bottle's anchor math and made it jump.
**How to apply:** cache vh; on touch (pointer:coarse) only adopt large changes
(orientation), ignore small address-bar deltas; on desktop always track innerHeight so
desktop stays untouched.

## Invariants
- Every `[data-bottle-slot]` marker must stay laid out & non-zero on every breakpoint —
  a collapsed rect shrinks the bottle toward zero.
- Static per-slot fallback bottles are off everywhere.
- Mobile-only perf: heavy filters (the bottle glow/shadow, backdrop blur) are reduced
  under pointer:coarse; desktop keeps full strength.
