import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ingredients = [
    {
      name: "Micro-Hyaluronic Acid",
      desc: "Penetrates deep into the dermis layer for plumping from within."
    },
    {
      name: "L-Ascorbic Acid",
      desc: "The most potent, pure form of Vitamin C for radical brightening."
    },
    {
      name: "Encapsulated Retinol",
      desc: "Time-released renewal to minimize irritation and maximize efficacy."
    },
    {
      name: "Ceramide Complex",
      desc: "Identical to skin's natural lipids to restore barrier function."
    }
  ];

  return (
    <section id="ingredients" ref={containerRef} className="py-32 bg-[#0A0D15] relative z-10 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium tracking-widest uppercase text-white/80">Clinical Purity</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Nothing to hide. <br/>Everything to gain.</h2>
            <p className="text-white/60 font-sans leading-relaxed mb-10 max-w-md">
              We source only the highest grade bio-active compounds. Free from silicones, parabens, PEGs, and artificial fragrances. Just pure, unadulterated performance.
            </p>
            <button className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
              View Full Index
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ingredients.map((ing, i) => (
              <div 
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-4 font-display text-cyan-400 font-bold text-sm border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                  {i+1}
                </div>
                <h3 className="font-display font-medium text-white mb-2 text-lg">{ing.name}</h3>
                <p className="text-sm font-sans text-white/50 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
