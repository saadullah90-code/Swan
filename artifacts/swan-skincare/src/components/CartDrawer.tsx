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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 1 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#06070A] glass-heavy shadow-2xl z-[201] flex flex-col border-l border-white/10"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <h2 className="font-display font-medium text-2xl text-white">Your Bag</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 text-white/50">
                  <p className="font-display text-xl text-white">Your bag is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm font-medium"
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
                    className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-sm relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 rounded-full pointer-events-none group-hover:opacity-20 transition-opacity
                      ${item.colorType === 'blue' ? 'bg-blue-400' : ''}
                      ${item.colorType === 'pink' ? 'bg-pink-400' : ''}
                      ${item.colorType === 'rose' ? 'bg-purple-400' : ''}
                    `} />
                    
                    <div className="w-20 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 relative overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 drop-shadow-lg" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1 z-10">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display text-lg text-white leading-tight pr-4">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-400 transition-colors">
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-white/50 mt-1 font-sans">{item.size}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1 border border-white/10 text-white">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-cyan-400 transition-colors"><Minus size={14} /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-cyan-400 transition-colors"><Plus size={14} /></button>
                        </div>
                        <p className="font-sans text-white font-medium tracking-wide">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/60 uppercase tracking-widest text-xs font-medium">Subtotal</span>
                  <span className="font-sans text-2xl text-white font-medium">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 rounded-full bg-white text-black uppercase tracking-widest text-sm font-medium hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Secure Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/0 via-cyan-300/30 to-cyan-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
                <p className="text-center text-xs text-white/40 mt-4 font-sans flex items-center justify-center gap-2">
                   Complimentary shipping on all orders
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
