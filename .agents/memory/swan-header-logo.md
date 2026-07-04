---
name: SWAN header & logo contrast
description: Why the SWAN header uses a dark wine-tinted floating pill even though the site theme is light.
---

# SWAN header & logo contrast

**Rule:** The brand logo (`ChatGPT_Image_..._1783077418756.png`) is a rose-gold swan
on transparent — it is LOW contrast on the site's warm-white/light theme. Any surface
hosting it prominently must be dark. The header is a floating rounded-full pill
(`.header-pill` in `index.css`) with a deep rose-wine tinted glass + gold border, and a
large centered logo that overflows the pill; nav/icons use cream text.

**Why:** On the light hero the rose-gold logo washes out and looks tiny/weak (user
complaint). A dark, on-brand (wine, not black) backdrop makes it pop while staying
consistent with the luxury palette. The reference the user gave was a dark pill header.

**How to apply:** If you restyle the header or place the logo elsewhere, keep a dark
backing behind it (or swap to a darker logo variant). Don't put the rose-gold logo
directly on `--background`. The bag icon must keep `id="cart-fly-target"` for fly-to-cart.
