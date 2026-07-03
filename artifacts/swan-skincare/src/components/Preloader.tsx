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
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#06070A] overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.08) 45%, rgba(0,0,0,0) 70%)' }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <img 
          ref={logoRef}
          src={logo} 
          alt="SWAN Logo" 
          className="w-48 md:w-64 opacity-0 drop-shadow-[0_10px_40px_rgba(139,92,246,0.35)]"
        />
        <div 
          ref={counterRef}
          className="mt-12 text-sm font-sans tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400"
        >
          0%
        </div>
      </div>
      
      <div className="absolute bottom-10 text-[10px] font-sans tracking-[0.4em] text-white/40 uppercase">
        Paris
      </div>
    </div>
  );
}
