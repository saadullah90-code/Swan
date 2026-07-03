import React from 'react';
import { motion } from 'framer-motion';

export default function Press() {
  const quotes = [
    {
      text: "The texture is unlike anything else. It feels like liquid silk and leaves an unparalleled glow.",
      author: "VOGUE"
    },
    {
      text: "SWAN has managed to capture the essence of a luxury Parisian spa in a single bottle.",
      author: "ELLE"
    },
    {
      text: "Finally, a clean formula that doesn't compromise on efficacy or the sensory experience.",
      author: "Harper's BAZAAR"
    }
  ];

  return (
    <section id="journal" className="py-32 md:py-48 bg-[#f5f0f1] relative">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <span className="text-sm uppercase tracking-widest text-primary font-medium mb-16 block">In The Press</span>
        
        <div className="space-y-32">
          {quotes.map((quote, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground/90 leading-tight mb-8">
                "{quote.text}"
              </p>
              <p className="text-sm tracking-[0.3em] uppercase text-primary/80 font-medium">
                — {quote.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
