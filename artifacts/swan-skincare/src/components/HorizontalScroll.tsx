import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textContainerRef.current) return undefined;
    const ctx = gsap.context(() => {
      const totalWidth = textContainerRef.current!.scrollWidth - window.innerWidth;
      gsap.to(textContainerRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=200%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-secondary flex items-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,rgba(0,0,0,0)_100%)] pointer-events-none mix-blend-screen" />
      
      <div 
        ref={textContainerRef}
        className="flex items-center flex-nowrap whitespace-nowrap pl-[10vw] pr-[20vw]"
      >
        <h2 className="text-[12vw] font-serif text-foreground/80 leading-none">
          <span className="italic font-light mr-8">Ethereal</span> glow.
        </h2>
        <h2 className="text-[12vw] font-serif text-primary leading-none ml-16">
          Uncompromised
        </h2>
        <h2 className="text-[12vw] font-serif text-foreground/80 leading-none ml-8">
          <span className="italic font-light">purity.</span>
        </h2>
        <h2 className="text-[12vw] font-serif text-foreground/80 leading-none ml-24">
          Skin <span className="text-primary italic">reimagined.</span>
        </h2>
      </div>
    </section>
  );
}
