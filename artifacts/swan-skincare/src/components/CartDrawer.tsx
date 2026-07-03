import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  const { isOpen, items, toggleCart, updateQuantity, removeItem, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background glass shadow-2xl z-[201] flex flex-col border-l border-white/50"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="font-serif text-2xl">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-foreground/50">
                  <p className="font-serif text-xl">Your cart is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="text-sm uppercase tracking-widest border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
                  >
                    Continue Shopping
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
                    className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-white/50 shadow-sm"
                  >
                    <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-white/60 to-transparent flex items-center justify-center p-2 relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-20 blur-xl ${
                        item.colorType === 'blue' ? 'bg-blue-300' :
                        item.colorType === 'pink' ? 'bg-pink-300' : 'bg-rose-400'
                      }`} />
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 drop-shadow-md" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg leading-tight pr-4">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-foreground/40 hover:text-destructive transition-colors">
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-foreground/50 mt-1">{item.size}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-white/50 rounded-full px-3 py-1 border border-white/50">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:opacity-70"><Minus size={14} /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:opacity-70"><Plus size={14} /></button>
                        </div>
                        <p className="font-medium tracking-wide">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white/40 backdrop-blur-md border-t border-white/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/70 uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 rounded-full bg-foreground text-background uppercase tracking-widest text-sm font-medium hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20 transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Proceed to Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
                <p className="text-center text-xs text-foreground/40 mt-4">Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
