import React from 'react';
import { motion } from 'framer-motion';

export default function Ritual() {
  const steps = [
    {
      num: '01',
      title: 'Cleanse & Prep',
      desc: 'Begin with a gentle, non-stripping cleanser. Pat dry, leaving skin slightly damp to maximize serum absorption.'
    },
    {
      num: '02',
      title: 'Apply Serum',
      desc: 'Dispense 3-4 drops from the jewel-glass dropper into the palm of your hand. Gently press the serum into your face and neck.'
    },
    {
      num: '03',
      title: 'Seal & Glow',
      desc: 'Lock in the active ingredients with your favorite moisturizer. Follow with SPF during the day for ultimate protection.'
    }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sm uppercase tracking-widest text-primary font-medium mb-4 block">The Ritual</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">A moment for <span className="italic text-primary/80">yourself.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-8 relative overflow-hidden bg-background">
                <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="font-serif text-3xl text-primary relative z-10">{step.num}</span>
              </div>
              <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
              <p className="text-foreground/60 font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
