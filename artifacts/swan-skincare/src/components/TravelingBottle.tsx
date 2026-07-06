import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getProduct } from '@/data/products';

const bottle = getProduct('retinol-serum')!;
const BASE_W = 320; // base render width in px; scaled per slot

/**
 * A single fixed serum bottle that travels down the whole page, moving between
 * the empty `[data-bottle-slot]` markers as the user scrolls.
 *
 * The position is recomputed every frame from the LIVE positions of the slots:
 * for each slot we know the scroll position at which it sits at the vertical
 * centre of the viewport ("anchor"). We find which two slots the current scroll
 * is between and interpolate the bottle between their live rects. This keeps the
 * bottle perfectly glued to the actual sections (no sticking / racing ahead) and,
 * once it passes the last slot, it simply stays docked to that slot's live rect
 * and scrolls away with the page — so it never floats over the footer.
 *
 * Slot order (top → bottom): 0 hero · 1 collection card · 2 swan (left) ·
 * 3 ritual card · 4 reviews.
 */
export default function TravelingBottle({ isLoading }: { isLoading: boolean }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const enteredRef = useRef(false);
  // The travelling bottle runs on ALL devices (desktop + mobile). It reads
  // window.scrollY live every frame via gsap.ticker, so it tracks native mobile
  // scroll just like it tracks Lenis on desktop — same animation everywhere.
  useEffect(() => {
    if (isLoading) return;
    const outer = outerRef.current;
    const rotator = rotatorRef.current;
    const img = imgRef.current;
    if (!outer || !rotator || !img) return;

    let slots: HTMLElement[] = [];
    const collect = () => {
      slots = Array.from(
        document.querySelectorAll<HTMLElement>('[data-bottle-slot]'),
      ).sort(
        (a, b) => Number(a.dataset.bottleSlot) - Number(b.dataset.bottleSlot),
      );
    };
    collect();

    let outerW = BASE_W;
    let outerH = BASE_W;
    const measureOuter = () => {
      outerW = outer.offsetWidth || BASE_W;
      outerH = outer.offsetHeight || BASE_W;
    };
    measureOuter();

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    // Smootherstep — eases the glide out of one card and into the next.
    const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const spinEase = gsap.parseEase('power2.in');

    const place = () => {
      if (slots.length === 0) return;
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      const rects = slots.map((s) => s.getBoundingClientRect());
      // Scroll position at which each slot sits at the vertical centre.
      const anchors = rects.map(
        (r) => r.top + scrollY + r.height / 2 - vh / 2,
      );
      const last = slots.length - 1;
      // How long (in scroll px) the bottle rests glued to a slot before it
      // glides on. This gives an intentional "theher" at each slot/card and
      // removes the old long "stuck at viewport centre" feeling.
      const dwell = Math.min(vh * 0.16, 150);

      let cx = 0;
      let cy = 0;
      let w = 0;
      let rot = 0;

      const restOn = (r: DOMRect) => {
        cx = r.left + r.width / 2;
        cy = r.top + r.height / 2;
        w = r.width;
      };

      if (scrollY <= anchors[0]) {
        restOn(rects[0]);
      } else if (scrollY >= anchors[last]) {
        // Docked on the final slot — follows its live rect and scrolls away.
        restOn(rects[last]);
      } else {
        let i = 0;
        while (i < last && scrollY >= anchors[i + 1]) i++;
        const segStart = anchors[i];
        const segEnd = anchors[i + 1];
        // Cap the rest so a short segment still leaves room to travel.
        const rest = Math.min(dwell, (segEnd - segStart) * 0.35);
        const startRest = segStart + rest;
        const endRest = segEnd - rest;

        if (scrollY <= startRest) {
          // Resting on slot i — glued to its live rect, so it scrolls with the page.
          restOn(rects[i]);
          if (i === 0) rot = 0;
        } else if (scrollY >= endRest) {
          // Resting on slot i+1.
          restOn(rects[i + 1]);
          if (i === 0) rot = 360;
        } else {
          const denom = endRest - startRest || 1;
          const local = clamp((scrollY - startRest) / denom, 0, 1);
          const eased = smoother(local);
          const a = rects[i];
          const b = rects[i + 1];
          cx = lerp(a.left + a.width / 2, b.left + b.width / 2, eased);
          cy = lerp(a.top + a.height / 2, b.top + b.height / 2, eased);
          w = lerp(a.width, b.width, eased);
          // Full clockwise spin as it drops from the hero into the collection.
          if (i === 0) rot = spinEase(local) * 360;
        }
      }

      const s = w / (outerW || BASE_W);
      outer.style.transform = `translate(${cx - outerW / 2}px, ${cy - outerH / 2}px) scale(${s})`;
      rotator.style.transform = `rotate(${rot}deg)`;
    };

    // Entrance — drops in from ABOVE once, then a gentle infinite float.
    const ctx = gsap.context(() => {
      gsap.set(outer, { opacity: 1 });
      if (!enteredRef.current) {
        enteredRef.current = true;
        gsap.from(entranceRef.current, {
          y: -280,
          opacity: 0,
          scale: 0.82,
          filter: 'blur(10px)',
          duration: 1.5,
          ease: 'power4.out',
        });
        gsap.to(floatRef.current, {
          y: '+=14',
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    });

    // Drive placement every frame (in phase with Lenis, which runs on the same ticker).
    const tick = () => place();
    gsap.ticker.add(tick);

    const onResize = () => {
      collect();
      measureOuter();
      place();
    };
    window.addEventListener('resize', onResize);

    const onImgLoad = () => {
      measureOuter();
      place();
    };
    img.addEventListener('load', onImgLoad);
    if (img.complete) onImgLoad();

    // Re-measure after layout / fonts settle.
    const t1 = window.setTimeout(onResize, 200);
    const t2 = window.setTimeout(onResize, 800);

    place();

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      img.removeEventListener('load', onImgLoad);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <div
      ref={outerRef}
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: BASE_W,
        transformOrigin: 'center',
        opacity: 0,
        zIndex: 45,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div ref={entranceRef}>
        <div ref={rotatorRef} style={{ transformOrigin: 'center' }}>
          <div ref={floatRef} className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square rounded-full bg-[hsl(var(--c-rose)/0.28)] blur-[70px]" />
            <img
              ref={imgRef}
              src={bottle.image}
              alt=""
              className="relative w-full h-auto drop-shadow-2xl select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
