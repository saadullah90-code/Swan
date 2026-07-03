import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '@/store/useCartStore';

import haBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_49_PM-Photoroom_1783077232627.png';
import vcBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_37_36_PM-Photoroom_1783077232628.png';
// The retinol bottle is the traveling bottle, so the middle slot image is visually omitted.

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    id: 'ha-serum',
    name: 'Hyaluronic Serum',
    subtitle: 'Deep Hydration',
    description: 'Multi-molecular weight hydration.',
    price: 68,
    size: '30ml',
    image: haBottle,
    colorType: 'blue'
  },
  {
    id: 'retinol-serum', // Middle slot for the traveling bottle
    name: 'Retinol Serum',
    subtitle: 'Skin Renewal',
    description: 'Micro-encapsulated renewal.',
    price: 76,
    size: '30ml',
    image: '', // Traveling bottle fills this space
    colorType: 'rose'
  },
  {
    id: 'vc-serum',
    name: 'Vitamin C Serum',
    subtitle: 'Brightening',
    description: 'Potent 15% L-ascorbic acid.',
    price: 72,
    size: '30ml',
    image: vcBottle,
    colorType: 'pink'
  }
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
            delay: i * 0.2
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="shop" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-serif">The Collection</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 relative">
          {products.map((product, i) => (
            <div 
              key={product.id}
              ref={el => { cardsRef.current[i] = el; }}
              className={`relative glass-heavy rounded-[2rem] p-8 w-full md:w-[320px] flex flex-col items-center text-center luxury-shadow hover:-translate-y-4 transition-transform duration-500
                ${i === 1 ? 'md:-translate-y-12' : ''}
              `}
            >
              <div className="h-[280px] w-full flex items-center justify-center mb-8 relative">
                {/* Background glow per product */}
                <div className={`absolute inset-0 blur-3xl opacity-30 rounded-full mix-blend-multiply
                  ${product.colorType === 'blue' ? 'bg-blue-300' : ''}
                  ${product.colorType === 'pink' ? 'bg-pink-300' : ''}
                  ${product.colorType === 'rose' ? 'bg-rose-300' : ''}
                `} />
                
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full object-contain drop-shadow-xl relative z-10" />
                ) : (
                  // Middle slot - target for the traveling bottle to land into
                  <div data-bottle-slot className="w-full h-full" />
                )}
              </div>
              
              <div className="text-[10px] uppercase tracking-widest text-primary mb-3">
                {product.subtitle}
              </div>
              <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
              <p className="text-sm font-light text-foreground/60 mb-6">{product.size}</p>
              
              <div className="w-full flex justify-between items-center mt-auto border-t border-foreground/10 pt-6">
                <span className="font-sans">${product.price}</span>
                <button className="text-xs uppercase tracking-widest hover:text-primary transition-colors">
                  Add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
