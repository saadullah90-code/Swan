import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import Ingredients from '@/components/Ingredients';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger refresh on mount after loading
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  return (
    <SmoothScroll>
      <div className="bg-[#06070A] min-h-screen text-white relative overflow-hidden hide-cursor selection:bg-cyan-500/30 selection:text-white" ref={mainRef}>
        <CustomCursor />
        <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
        
        <div 
          className="relative z-10 transition-opacity duration-1000" 
          style={{ opacity: isLoading ? 0 : 1 }}
        >
          <Header />
          <CartDrawer />
          
          <main>
            <Hero isLoading={isLoading} />
            <Benefits />
            <FeaturedProducts />
            <Story />
            <Ingredients />
            <FAQ />
          </main>
          
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
