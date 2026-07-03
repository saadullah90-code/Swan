import React, { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${
          isScrolled ? 'py-4 glass border-b border-foreground/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 hidden md:flex items-center gap-10">
            {['Shop', 'Philosophy', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.2em] text-foreground hover:text-primary relative group"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex-1 flex justify-start md:justify-center">
            <img 
              src={logo} 
              alt="SWAN" 
              className={`transition-all duration-700 object-contain drop-shadow-lg ${isScrolled ? 'h-6' : 'h-10'}`} 
            />
          </div>

          <div className="flex-1 flex items-center justify-end gap-8">
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="hidden md:block text-[11px] uppercase tracking-[0.2em]">Bag</span>
              <div className="relative">
                <ShoppingBag strokeWidth={1} size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[9px]">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </button>
            <button 
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu strokeWidth={1} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center">
          <button 
            className="absolute top-8 right-6 text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X strokeWidth={1} size={32} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {['Shop', 'Philosophy', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-serif text-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
