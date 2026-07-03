import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/ChatGPT_Image_Jul_3,_2026,_04_16_42_PM_1783077418756.png';

interface PreloaderProps {
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#fdfafb] glass"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative"
          >
            <img 
              src={logo} 
              alt="SWAN Skincare" 
              className="w-48 md:w-64 h-auto object-contain drop-shadow-2xl"
            />
            <motion.div 
              className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground/20 to-transparent relative overflow-hidden">
              <motion.div
                className="absolute inset-0 w-full h-full bg-foreground/50"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 font-sans">
              Discover Purity
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
