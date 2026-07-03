import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '@/store/useCartStore';
import { useCartStore } from '@/store/useCartStore';
import { Plus } from 'lucide-react';

import haBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_49_PM-Photoroom_1783077232627.png';
import vcBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_37_36_PM-Photoroom_1783077232628.png';
import retinolBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

gsap.registerPlugin(ScrollTrigger);

export const products: Product[] = [
  {
    id: 'ha-serum',
    name: 'Hyaluronic Acid Serum',
    subtitle: 'Deep Cellular Hydration',
    description: 'Multi-molecular weight hydration.',
    price: 68,
    size: '30ml / 1.01 fl oz',
    image: haBottle,
    colorType: 'blue'
  },
  {
    id: 'vc-serum',
    name: 'Vitamin C Serum',
    subtitle: 'Advanced Brightening',
    description: 'Potent 15% L-ascorbic acid.',
    price: 72,
    size: '30ml / 1.01 fl oz',
    image: vcBottle,
    colorType: 'pink'
  },
  {
    id: 'retinol-serum',
    name: 'Retinol Serum',
    subtitle: 'Micro-encapsulated Renewal',
    description: 'Micro-encapsulated renewal.',
    price: 76,
    size: '30ml / 1.01 fl oz',
    image: retinolBottle,
    colorType: 'rose'
  }
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { addItem } = useCartStore();

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
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: i * 0.15
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="shop" className="py-32 bg-[#06070A] relative z-10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/80">The Collection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6">Engineered for Results.</h2>
          <p className="text-white/50 max-w-xl mx-auto font-sans">Three potent serums, one transformative ritual. Discover the exact formulation your skin needs.</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 relative">
          {products.map((product, i) => (
            <div 
              key={product.id}
              ref={el => { cardsRef.current[i] = el; }}
              className="group relative glass-card rounded-[2rem] p-8 w-full lg:w-1/3 flex flex-col items-center text-center transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Card Ambient Glow */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none
                ${product.colorType === 'blue' ? 'bg-blue-400' : ''}
                ${product.colorType === 'pink' ? 'bg-pink-400' : ''}
                ${product.colorType === 'rose' ? 'bg-rose-400' : ''}
              `} />

              <div className="h-[300px] w-full flex items-center justify-center mb-10 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
                <img src={product.image} alt={product.name} className="h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative z-10" />
              </div>
              
              <div className={`text-[10px] uppercase tracking-widest font-bold mb-4
                ${product.colorType === 'blue' ? 'text-blue-400' : ''}
                ${product.colorType === 'pink' ? 'text-pink-400' : ''}
                ${product.colorType === 'rose' ? 'text-purple-400' : ''}
              `}>
                {product.subtitle}
              </div>
              <h3 className="font-display text-3xl mb-2 text-white font-medium">{product.name}</h3>
              <p className="text-sm font-sans text-white/50 mb-8">{product.size}</p>
              
              <div className="w-full mt-auto flex flex-col gap-4">
                <div className="w-full h-px bg-white/10" />
                <div className="flex justify-between items-center w-full">
                  <span className="font-sans text-xl text-white font-medium">${product.price}</span>
                  <button 
                    onClick={() => addItem(product)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-transform"
                  >
                    <Plus size={16} />
                    Add to Bag
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
