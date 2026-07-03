import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section while scrolling through the story
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      });

      // Text reveal
      const words = Array.from(textRef.current!.querySelectorAll('.word'));
      gsap.fromTo(words, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="bg-background relative z-10">
      <div ref={pinRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        
        {/* The traveling bottle will be positioned on the left side here during this scroll phase */}
        
        <div className="container mx-auto px-6 relative z-10 flex justify-end">
          <div className="max-w-2xl text-right">
            <h2 
              ref={textRef}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.2]"
            >
              <span className="word inline-block mr-3">Uncompromising</span>
              <span className="word inline-block mr-3">attention</span>
              <span className="word inline-block mr-3">to</span>
              <span className="word inline-block mr-3">detail.</span>
              <span className="word inline-block mr-3 italic text-primary">Unhurried</span>
              <span className="word inline-block mr-3">rituals.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
