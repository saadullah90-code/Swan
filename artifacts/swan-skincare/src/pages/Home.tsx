import React, { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import HorizontalScroll from '@/components/HorizontalScroll';
import Products from '@/components/Products';
import Ingredients from '@/components/Ingredients';
import Ritual from '@/components/Ritual';
import Press from '@/components/Press';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-[#fdfafb] min-h-screen text-foreground selection:bg-primary/30 selection:text-primary-foreground relative">
        <CustomCursor />
        <Preloader isLoading={isLoading} />
        
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
          <Header />
          <CartDrawer />
          
          <main>
            <Hero />
            <Story />
            <HorizontalScroll />
            <Products />
            <Ingredients />
            <Ritual />
            <Press />
          </main>
          
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
