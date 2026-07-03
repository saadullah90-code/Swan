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

      let cx: number;
      let cy: number;
      let w: number;
      let rot = 0;

      if (scrollY <= anchors[0]) {
        const r = rects[0];
        cx = r.left + r.width / 2;
        cy = r.top + r.height / 2;
        w = r.width;
      } else if (scrollY >= anchors[last]) {
        // Docked on the final slot — follows its live rect and scrolls away.
        const r = rects[last];
        cx = r.left + r.width / 2;
        cy = r.top + r.height / 2;
        w = r.width;
      } else {
        let i = 0;
        while (i < last && scrollY >= anchors[i + 1]) i++;
        const denom = anchors[i + 1] - anchors[i] || 1;
        const local = clamp((scrollY - anchors[i]) / denom, 0, 1);
        const a = rects[i];
        const b = rects[i + 1];
        cx = lerp(a.left + a.width / 2, b.left + b.width / 2, local);
        cy = lerp(a.top + a.height / 2, b.top + b.height / 2, local);
        w = lerp(a.width, b.width, local);
        // Full clockwise spin as it drops from the hero into the collection.
        if (i === 0) rot = spinEase(local) * 360;
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
          y: -220,
          opacity: 0,
          duration: 1.3,
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
            <span className="absolute -bottom-1 right-3 z-20 grid place-items-center w-14 h-14 rounded-full bg-foreground text-background text-[11px] font-semibold tracking-wide rotate-[-8deg]">
              30 ml
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
