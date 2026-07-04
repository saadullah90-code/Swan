import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'wouter';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useCartStore, Product } from '@/store/useCartStore';
import { products } from '@/data/products';
import { flyToCart } from '@/lib/flyToCart';

gsap.registerPlugin(ScrollTrigger);

export { products };

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const addItem = useCartStore((s) => s.addItem);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.products-bg-orb', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 120, opacity: 0, scale: 0.95, rotate: i % 2 === 0 ? -2 : 2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            delay: i * 0.15,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (e: React.MouseEvent, i: number, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const card = cardsRef.current[i];
    const el =
      (card?.querySelector('img') as HTMLElement | null) ??
      (card?.querySelector('[data-bottle-slot]') as HTMLElement | null);
    if (el) flyToCart(product.image, el.getBoundingClientRect());
    window.setTimeout(() => addItem(product), 750);
  };

  return (
    <section ref={sectionRef} id="shop" className="py-24 md:py-40 bg-background relative z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="products-bg-orb absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[hsl(var(--c-sky)/0.15)] blur-[120px]" />
        <div className="products-bg-orb absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[hsl(var(--c-peach)/0.15)] blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-32">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[hsl(var(--luxury))] font-medium mb-4 block">Our Formulations</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold">The Collection</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => navigate(`/product/${product.id}`)}
              className={`relative glass rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center text-center luxury-shadow hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 group cursor-pointer
                ${i === 1 ? 'md:-translate-y-12' : ''}
              `}
            >
              {/* view arrow */}
              <div className="absolute top-5 left-5 w-9 h-9 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <ArrowUpRight size={16} className="text-[hsl(var(--luxury))]" />
              </div>

              <div className="h-[260px] sm:h-[300px] w-full flex items-center justify-center mb-8 relative">
                <div className={`absolute inset-0 blur-3xl opacity-40 rounded-full mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70
                  ${product.colorType === 'blue' ? 'bg-[hsl(var(--c-sky))]' : ''}
                  ${product.colorType === 'pink' ? 'bg-[hsl(var(--c-rose))]' : ''}
                  ${product.colorType === 'rose' ? 'bg-[hsl(var(--c-peach))]' : ''}
                `} />

                {i === 1 ? (
                  // The traveling bottle lands here (desktop). On mobile there is
                  // no travelling bottle, so show this card's own product image.
                  <div className="relative z-10 h-full w-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="slot-static h-full object-contain drop-shadow-2xl"
                    />
                    <div data-bottle-slot="1" className="slot-marker w-[64%] aspect-[0.72]" />
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain drop-shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-[10px] font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20 hidden md:block">
                  {product.size}
                </div>
              </div>

              <div className="w-full flex flex-col flex-1">
                <div className={`text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-3
                  ${product.colorType === 'blue' ? 'text-[hsl(var(--c-sky))]' : ''}
                  ${product.colorType === 'pink' ? 'text-[hsl(var(--c-rose))]' : ''}
                  ${product.colorType === 'rose' ? 'text-[hsl(var(--c-peach))]' : ''}
                `}>
                  {product.subtitle}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl mb-3 font-medium text-foreground">{product.name}</h3>
                <p className="text-sm font-light text-foreground/70 mb-8">{product.description}</p>

                <div className="w-full flex justify-between items-center mt-auto pt-6 border-t border-foreground/5">
                  <span className="font-sans text-lg font-medium">${product.price}</span>
                  <button
                    onClick={(e) => handleAdd(e, i, product)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-[hsl(var(--luxury))] hover:text-white transition-colors active:scale-95"
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
