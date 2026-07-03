import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import heroBottle from '@assets/ChatGPT_Image_Jul_3,_2026,_03_41_09_PM-Photoroom_1783077232628.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bottleRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(bottleRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1.5,
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
      className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#fdfafb]"
    >
      {/* Soft background environment */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-rose-200/20 blur-[100px] mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,rgba(253,250,251,1)_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] text-foreground/60 text-center"
          >
            The Art of Radiance
          </motion.div>
        </div>

        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-center text-foreground leading-[0.9] tracking-tight relative z-20 mix-blend-darken"
        >
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: 'easeOut' }}
            className="block"
          >
            Luminous
          </motion.span>
          <motion.span
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.5, delay: 2.7, ease: 'easeOut' }}
            className="block italic font-light text-primary/80 ml-12 md:ml-32"
          >
            Skin
          </motion.span>
        </h1>

        {/* Hero Product Bottle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] md:max-w-[400px] pointer-events-none mt-16 md:mt-24">
          <motion.div 
            ref={glowRef}
            className="absolute inset-0 bg-rose-300/30 blur-[60px] rounded-full scale-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
          />
          <motion.img
            ref={bottleRef}
            src={heroBottle}
            alt="SWAN Retinol Serum"
            className="w-full h-auto drop-shadow-2xl relative z-30"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 2.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-foreground/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-foreground/50 w-full h-full"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
