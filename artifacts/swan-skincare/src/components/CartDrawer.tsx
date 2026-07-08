import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  const { isOpen, items, toggleCart, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-background glass-heavy shadow-2xl z-[201] flex flex-col border-l border-white/50"
          >
            <div className="flex items-center justify-between p-6 border-b border-foreground/5 bg-white/50">
              <h2 className="font-display font-medium text-2xl text-foreground">Your Bag</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-foreground/5 active:scale-95 transition-all"
              >
                <X strokeWidth={1.5} size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative">
              <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none mix-blend-multiply" />
              
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-foreground/60 relative z-10">
                  <p className="font-display text-xl font-medium">Your bag is beautifully empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-sm font-semibold uppercase tracking-widest border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors mt-2"
                  >
                    Discover the Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="flex gap-4 p-4 rounded-3xl bg-white/60 border border-white shadow-sm relative z-10 group"
                  >
                    <div className="w-24 h-28 rounded-2xl bg-gradient-to-br from-white to-white/40 flex items-center justify-center p-2 relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-30 blur-xl ${
                        item.colorType === 'blue' ? 'bg-[hsl(var(--c-sky))]' :
                        item.colorType === 'pink' ? 'bg-[hsl(var(--c-rose))]' : 'bg-[hsl(var(--c-peach))]'
                      }`} />
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display font-medium text-lg leading-tight pr-2 text-foreground">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-foreground/40 hover:text-rose-500 transition-colors mt-1">
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-foreground/50 mt-1 uppercase tracking-widest font-medium">{item.size}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 shadow-sm border border-foreground/5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors"><Minus size={12} strokeWidth={2} /></button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors"><Plus size={12} strokeWidth={2} /></button>
                        </div>
                        <p className="font-sans font-medium text-foreground tracking-wide">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/70 uppercase tracking-widest text-xs font-semibold">Subtotal</span>
                  <span className="font-sans font-medium text-2xl text-foreground">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 rounded-full bg-foreground text-background uppercase tracking-widest text-sm font-semibold hover:bg-primary transition-colors shadow-lg shadow-foreground/20 active:scale-[0.98]">
                  Secure Checkout
                </button>
                <p className="text-center text-[10px] uppercase tracking-widest text-foreground/40 mt-4 font-medium">Complimentary shipping on all orders</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
