import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export default function Preloader({ isLoading, setIsLoading }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      // Counter animation
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value).toString() + '%';
          }
        },
        onComplete: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsLoading(false);
            }
          });
          
          tl.to(counterRef.current, { opacity: 0, duration: 0.5 })
            .to(logoRef.current, { scale: 1.1, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, "<")
            .to(containerRef.current, { 
              yPercent: -100, 
              duration: 1.2, 
              ease: 'power4.inOut' 
            }, "-=0.4");
        }
      });

      // Logo pulse
      gsap.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, setIsLoading]);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-rose-200/20 blur-[100px] rounded-full mix-blend-multiply" />
      
      <div className="relative z-10 flex flex-col items-center">
        <img 
          ref={logoRef}
          src={logo} 
          alt="SWAN Logo" 
          className="w-48 md:w-64 opacity-0 drop-shadow-xl mix-blend-darken"
        />
        <div 
          ref={counterRef}
          className="mt-12 text-sm font-sans tracking-[0.2em] text-primary/80"
        >
          0%
        </div>
      </div>
      
      <div className="absolute bottom-10 text-[10px] font-sans tracking-[0.4em] text-foreground/40 uppercase">
        Paris
      </div>
    </div>
  );
}
