import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    const ctx = gsap.context(() => {
      // Parallax on the huge background text
      gsap.to(textRef.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[800px] flex items-center justify-start overflow-hidden bg-background"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-200/30 blur-[150px] mix-blend-multiply" />
      </div>

      {/* Huge Bleeding Typography */}
      <h1 
        ref={textRef}
        className="absolute top-[40%] -translate-y-1/2 left-[-5%] text-[18vw] font-serif text-foreground/5 leading-none whitespace-nowrap z-10 pointer-events-none select-none"
      >
        SWAN SKINCARE
      </h1>

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full">
        <div className="max-w-xl glass-heavy p-10 md:p-14 rounded-[2rem] luxury-shadow">
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-6 font-medium">
            L'Essence de Beauté
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-8">
            Luminous,<br />
            <span className="italic font-light text-primary">Weightless</span><br />
            Luxury.
          </h2>
          <p className="text-foreground/70 font-light text-lg mb-10 leading-relaxed max-w-sm">
            Jewel-like glass serums formulated in Paris. Your daily ritual, elevated to quiet luxury.
          </p>
          <button className="relative px-8 py-4 bg-background/50 border border-foreground/10 backdrop-blur-md rounded-full text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-500 overflow-hidden group">
            <span className="relative z-10">Discover the Collection</span>
          </button>
        </div>
      </div>
      
      {/* Floating glass cards (composition elements) */}
      <div className="absolute top-[20%] right-[10%] w-64 glass p-6 rounded-3xl luxury-shadow z-20 hidden lg:block">
        <div className="text-[10px] uppercase tracking-widest text-primary mb-2">Formulation</div>
        <div className="font-serif text-2xl">Micro-encapsulated</div>
      </div>
      
      <div className="absolute bottom-[20%] left-[50%] w-72 glass p-6 rounded-3xl luxury-shadow z-20 hidden md:block">
        <div className="text-[10px] uppercase tracking-widest text-primary mb-2">Purity</div>
        <div className="font-serif text-2xl">0% Synthetic Fragrance</div>
      </div>
    </section>
  );
}
