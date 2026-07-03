import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 hidden md:flex items-center gap-8">
            {['Shop', 'Philosophy', 'Journal', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground relative group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex justify-start md:justify-center">
            <img src={logo} alt="SWAN" className={`transition-all duration-500 object-contain ${isScrolled ? 'h-8' : 'h-12'}`} />
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <button
              onClick={toggleCart}
              className="relative p-2 text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 group"
            >
              <span className="hidden md:block text-sm uppercase tracking-widest group-hover:opacity-70 transition-opacity">Cart</span>
              <div className="relative">
                <ShoppingBag strokeWidth={1.5} size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col justify-center items-center">
          <button 
            className="absolute top-6 right-6 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X strokeWidth={1.5} size={32} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {['Shop', 'Philosophy', 'Journal', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif text-foreground hover:text-primary transition-colors"
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
