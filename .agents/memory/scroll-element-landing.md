---
name: Scroll-linked element travel/landing (GSAP)
description: How to make a persistent fixed element travel on scroll and land precisely into a normal-flow target slot without desync.
---

# Scroll-linked element travel & landing

**Rule:** When a `position: fixed` element must travel on scroll and *land into* a target that lives in normal document flow (e.g. an image slot inside a card), drive the element by reading the target's **live `getBoundingClientRect()` every scroll frame** (via a ScrollTrigger `onUpdate`) and set the element's transform to that measured point. Do NOT animate the element to hard-coded viewport `top/left` percentages hoping they coincide with the target.

**Why:** Percentage-based landing is fragile and usually wrong because (1) the target card can be offset (e.g. a raised middle card) and reflows to a vertical stack on mobile, and (2) any *pinned* section elsewhere on the page (GSAP `pin`) injects extra synthetic scroll distance, so a body-scroll-fraction timeline reaches its "landed" keyframe at the wrong moment. Measuring the target live makes landing accuracy independent of pinning, resize, and breakpoint.

**How to apply:**
- Mark the target slot with a data attribute (e.g. `[data-bottle-slot]`) and render it empty — the traveling element *is* the slot's content once landed.
- Keep the element `fixed; top:0; left:0; xPercent:-50; yPercent:-50` and drive its center with `x`/`y` (px) each frame.
- Phase-split by scroll position: early phases can use viewport anchors; the final/landing phase converges toward the live slot center and, once past it, simply tracks the slot so the element scrolls away glued to the card.
- Any companion visuals (glow/shadow) must be written by the **same** place() call so they can't detach.
- Recompute on `onRefresh` too, and wrap in `gsap.context()` with cleanup.
