import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Text reveal
      const lines = Array.from(textRef.current!.querySelectorAll('.line-wrap'));
      
      lines.forEach((line, i) => {
        const text = line.querySelector('.line-text');
        gsap.fromTo(text, 
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="bg-[#06070A] py-32 md:py-48 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-xs font-medium tracking-widest uppercase text-white/80">Our Philosophy</span>
        </div>

        <div ref={textRef} className="flex flex-col gap-4 md:gap-6">
          <div className="line-wrap overflow-hidden">
            <h2 className="line-text text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-tight">
              We believe luxury is 
            </h2>
          </div>
          <div className="line-wrap overflow-hidden">
            <h2 className="line-text text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-tight">
              found in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">precision</span>
            </h2>
          </div>
          <div className="line-wrap overflow-hidden">
            <h2 className="line-text text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-tight">
              of formulation.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl font-display font-medium text-white mb-4">Bio-Active Ingredients</h3>
            <p className="text-white/60 font-sans leading-relaxed text-sm">Every drop contains clinically proven concentrations. We don't use filler ingredients; every element serves a specific, proven purpose for cellular regeneration.</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl font-display font-medium text-white mb-4">Cold-Processed</h3>
            <p className="text-white/60 font-sans leading-relaxed text-sm">Our serums are formulated in small batches using cold-processing technology to ensure active ingredients maintain their highest potency and efficacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
