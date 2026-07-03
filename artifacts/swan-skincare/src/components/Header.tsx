import React, { useState } from 'react';
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
          isScrolled ? 'py-4 bg-[#06070A]/80 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 hidden md:flex items-center gap-10">
            {['Shop', 'Philosophy', 'Ingredients', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const el = document.getElementById(item.toLowerCase());
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors relative group font-sans"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex-1 flex justify-start md:justify-center">
            {/* Using a drop-shadow with white/cyan glow to make the dark logo visible on dark backgrounds if needed */}
            <img 
              src={logo} 
              alt="SWAN" 
              className={`transition-all duration-700 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter brightness-0 invert ${isScrolled ? 'h-5' : 'h-8'}`} 
            />
          </div>

          <div className="flex-1 flex items-center justify-end gap-8">
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
            >
              <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-sans">Bag</span>
              <div className="relative">
                <ShoppingBag strokeWidth={1.5} size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </button>
            <button 
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#06070A]/95 backdrop-blur-2xl flex flex-col justify-center items-center">
          <button 
            className="absolute top-8 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X strokeWidth={1.5} size={32} />
          </button>
          <div className="flex flex-col items-center gap-10">
            {['Shop', 'Philosophy', 'Ingredients', 'FAQ', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById(item.toLowerCase());
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-4xl font-display font-medium text-white/70 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
