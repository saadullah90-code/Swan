---
name: Scroll-linked element travel/landing (GSAP)
description: How to make a persistent fixed element travel on scroll and land precisely into a normal-flow target slot without desync.
---

# Scroll-linked element travel & landing

**Rule:** When a `position: fixed` element must travel on scroll and *land into* a target that lives in normal document flow (e.g. an image slot inside a card), drive the element by reading the target's **live `getBoundingClientRect()` every scroll frame** (via a ScrollTrigger `onUpdate`) and set the element's transform to that measured point. Do NOT animate the element to hard-coded viewport `top/left` percentages hoping they coincide with the target.

**Why:** Percentage-based landing is fragile and usually wrong because (1) the target card can be offset (e.g. a raised middle card) and reflows to a vertical stack on mobile, and (2) any *pinned* section elsewhere on the page (GSAP `pin`) injects extra synthetic scroll distance, so a body-scroll-fraction timeline reaches its "landed" keyframe at the wrong moment. Measuring the target live makes landing accuracy independent of pinning, resize, and breakpoint.

**Prefer `gsap.ticker.add` over one scrubbed ScrollTrigger for multi-slot travel.** For an element that hops between MANY slots down the page, drive placement from a per-frame `gsap.ticker` callback (Lenis runs on the same ticker, so `window.scrollY` is valid). Each frame: read every slot's live rect, compute each slot's "anchor" scrollY (`rect.top + scrollY + rect.height/2 - innerHeight/2` = where that slot is vertically centered), find which two anchors the current scrollY is between, and lerp position/scale between those two slots' live rects. Past the last anchor, dock to the last slot's live rect so it scrolls away with the page (never floats over the footer).

**Why (multi-slot):** a single scrubbed ScrollTrigger with global progress mapped evenly across segments (`p * segs`) assumes equal section spacing. It doesn't hold — the element races ahead/lags the real sections (looks like sticking/stutter) and freezes pinned over the footer at progress 1. Anchoring every frame to real slot geometry fixes both and needs no `ScrollTrigger.refresh` on resize.

**How to apply:**
- Mark the target slot with a data attribute (e.g. `[data-bottle-slot]`) and render it empty — the traveling element *is* the slot's content once landed. No dashed border / placeholder image (it shows when the element is elsewhere).
- Keep the element `fixed; top:0; left:0` and drive its center via transform each frame.
- Every slot marker MUST stay rendered on every breakpoint. A `hidden` slot collapses its rect to 0 and the element scales toward 0 — position it (e.g. absolute left, smaller on mobile) instead of hiding it.
- Keep competing transforms on SEPARATE nested wrappers: outer(translate+scale, ticker) > entrance(one-time) > rotator(rotate, ticker) > float(infinite y). Two animators writing one element's transform fight each other.
- Any companion visuals (glow/shadow) must be written by the **same** place() call (or nested inside the driven element) so they can't detach.
- Cleanup: `gsap.ticker.remove(tick)`, revert the `gsap.context()`, drop listeners/timeouts on unmount, or a per-frame callback leaks across route changes.

**Add a "dwell" window per slot to kill the "stuck at viewport centre" feel.** Pure linear lerp between two live rects keeps the element pinned near viewport centre for the whole (often long) segment, which reads as frozen. Fix: around each anchor reserve a small rest window (`dwell = min(vh*0.16, 150)` px, capped at ~35% of the segment each side). Inside the rest window snap the element to that slot's live rect (so it scrolls WITH the page = a natural brief pause), and only lerp (with smootherstep) in the shorter middle band. Boundaries stay continuous because rest-end == transition-start == slot centre, so no jump.
**Why:** users perceive "moving with scroll then a short rest at each card" as intentional; a constant-centre float reads as a bug/stutter.
