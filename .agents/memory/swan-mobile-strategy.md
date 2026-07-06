---
name: SWAN mobile responsiveness strategy
description: How the signature scroll choreography behaves on touch/mobile — the travelling bottle runs everywhere, Lenis smooth-scroll is desktop-only.
---

# SWAN mobile strategy

The signature travelling serum bottle (single fixed element that glides between
`[data-bottle-slot]` markers as you scroll) runs on **ALL devices**, desktop and
mobile. **Why:** the user explicitly wanted the desktop bottle animation to work
"same to same" on mobile.

**How it works cross-device:** the bottle recomputes its position every frame from
`window.scrollY` + the live `getBoundingClientRect` of each slot, driven by
`gsap.ticker` (which runs its own RAF loop independent of Lenis). So it tracks native
mobile scroll exactly as it tracks Lenis smooth-scroll on desktop — no gating needed.

**Lenis smooth-scroll is still desktop-only** (`SmoothScroll` gates on
`useIsDesktop()` / `DESKTOP_MQ = '(min-width:768px) and (pointer:fine)'`). On touch it
fought native scrolling and felt janky. The bottle does NOT depend on Lenis, so this
split is fine.

**Static per-slot fallback bottles are OFF everywhere.** The CSS helpers
`.slot-static { display:none }` / `.slot-marker { display:block }` (in `index.css`) are
now unconditional — there was a period when static bottles replaced the travelling one
on mobile; that was reverted. Do NOT re-introduce static-vs-travelling gating unless the
requirement changes again. Every `[data-bottle-slot]` marker must stay laid out and
non-zero-size on every breakpoint (a collapsed slot rect shrinks the bottle toward 0).

**Also:** `backdrop-filter` capped to `blur(8px)` under `@media (pointer: coarse)` to
relieve mobile GPUs — keep this.
