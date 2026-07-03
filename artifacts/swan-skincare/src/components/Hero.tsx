import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Sun, Sparkles, Plus, ArrowDown, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { getProduct } from '@/data/products';
import { flyToCart } from '@/lib/flyToCart';

gsap.registerPlugin(ScrollTrigger);

const retinolProduct = getProduct('retinol-serum')!;

const callouts = [
  { label: 'Deep hydration', pos: 'top-[14%] left-[6%] md:left-[12%]', color: 'text-[hsl(var(--c-sky))]' },
  { label: 'Even skin tone', pos: 'top-[30%] right-[5%] md:right-[12%]', color: 'text-[hsl(var(--c-violet))]' },
  { label: 'Visible radiance', pos: 'top-[52%] left-[3%] md:left-[9%]', color: 'text-[hsl(var(--c-amber))]' },
  { label: 'Barrier repair', pos: 'top-[64%] right-[4%] md:right-[10%]', color: 'text-[hsl(var(--c-mint))]' },
];

const ingredients = [
  { icon: Droplet, label: 'Hyaluronic Acid', tint: 'text-[hsl(var(--c-sky))]' },
  { icon: Sun, label: 'Vitamin C', tint: 'text-[hsl(var(--c-amber))]' },
  { icon: Sparkles, label: 'Retinol', tint: 'text-[hsl(var(--c-rose))]' },
];

export default function Hero({ isLoading }: { isLoading: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);
  const addItem = useCartStore((s) => s.addItem);

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBestSeller = () => {
    const slot = document.querySelector('[data-bottle-slot="0"]');
    if (slot) flyToCart(retinolProduct.image, slot.getBoundingClientRect());
    window.setTimeout(() => addItem(retinolProduct), 750);
  };

  // Parallax on the giant background word.
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (bgWordRef.current) {
        gsap.to(bgWordRef.current, {
          xPercent: -6,
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Entrance — everything rises up from below once the preloader releases.
  useEffect(() => {
    if (isLoading || !containerRef.current || hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero-bgword]', { opacity: 0, y: 150, duration: 1.3, ease: 'power4.out' }, 0)
        .from('[data-hero-line]', { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 }, 0.15)
        .from('[data-hero-sub]', { y: 50, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.5)
        .from('[data-hero-cta]', { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.7)
        .from('[data-hero-callout]', { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.55)
        .from('[data-hero-ingredient]', { y: 60, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.65)
        .from('[data-hero-scroll]', { opacity: 0, y: 20, duration: 0.6 }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-background bg-aurora pt-28 pb-16"
    >
      {/* Colorful ambient orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-8%] w-[46vw] h-[46vw] rounded-full bg-[hsl(var(--c-rose)/0.20)] blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[42vw] h-[42vw] rounded-full bg-[hsl(var(--c-violet)/0.18)] blur-[130px]" />
        <div className="absolute bottom-[-12%] left-[30%] w-[48vw] h-[48vw] rounded-full bg-[hsl(var(--c-peach)/0.20)] blur-[140px]" />
      </div>

      {/* Giant background word — now prominent */}
      <div
        ref={bgWordRef}
        data-hero-bgword
        className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[26vw] md:text-[21vw] font-display font-bold leading-none whitespace-nowrap z-0 pointer-events-none select-none"
        style={{
          color: 'hsl(var(--luxury) / 0.07)',
          WebkitTextStroke: '2px hsl(var(--luxury) / 0.20)',
        }}
      >
        SERUM
      </div>

      {/* Ingredient chips — left rail (desktop) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {ingredients.map((ing) => (
          <div
            key={ing.label}
            data-hero-ingredient
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 w-52"
          >
            <span className={`grid place-items-center w-9 h-9 rounded-xl bg-white/70 ${ing.tint}`}>
              <ing.icon className="w-4 h-4" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-medium text-foreground/80">{ing.label}</span>
          </div>
        ))}
      </div>

      {/* Floating benefit callouts */}
      {callouts.map((c) => (
        <div
          key={c.label}
          data-hero-callout
          className={`absolute ${c.pos} z-30 hidden sm:flex items-center gap-2 glass rounded-full pl-2 pr-4 py-2 luxury-shadow`}
        >
          <span className={`grid place-items-center w-6 h-6 rounded-full bg-white ${c.color}`}>
            <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
          </span>
          <span className="text-xs md:text-sm font-medium text-foreground/80 whitespace-nowrap">
            {c.label}
          </span>
        </div>
      ))}

      {/* Center — bottle slot (the traveling bottle rests here) */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mt-6 md:mt-2">
          <div className="absolute w-[62vw] max-w-[420px] aspect-square rounded-full bg-[hsl(var(--c-rose)/0.24)] blur-[80px]" />
          <div
            data-bottle-slot="0"
            className="relative w-[54vw] max-w-[300px] md:max-w-[340px] aspect-[0.72]"
          />
        </div>

        {/* Bold headline (rises from below) */}
        <div className="text-center px-6 mt-8 md:mt-6 max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-5" data-hero-sub>
            <span className="flex text-[hsl(var(--c-amber))]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </span>
            <span className="text-xs font-medium text-foreground/60 tracking-wide">
              Loved by 12,000+ glowing faces
            </span>
          </div>

          <h1 className="font-display font-bold leading-[0.92] text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl">
            <span data-hero-line className="block text-foreground">
              Skincare,
            </span>
            <span data-hero-line className="block text-luxury">
              perfected.
            </span>
          </h1>

          <p
            data-hero-sub
            className="mx-auto mt-6 max-w-xl text-base md:text-lg font-light text-foreground/70 leading-relaxed"
          >
            Jewel-like glass serums, formulated to make every ritual feel like
            quiet luxury — and every reflection feel like you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              data-hero-cta
              onClick={scrollToShop}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[hsl(var(--luxury))] text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition"
            >
              Shop the collection
            </button>
            <button
              data-hero-cta
              onClick={addBestSeller}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground active:scale-[0.98] transition"
            >
              Add best-seller · $76
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-foreground/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
