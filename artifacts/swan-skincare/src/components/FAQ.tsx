import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Our clinical trials show visible improvement in skin texture and hydration within 7 days. For deeper cellular regeneration, optimal results appear after 4-6 weeks of consistent use."
  },
  {
    question: "Are your serums suitable for sensitive skin?",
    answer: "Yes. Every formulation is dermatologist-tested, hypoallergenic, and free from synthetic fragrances, parabens, and common irritants. We recommend patch testing if you have highly reactive skin."
  },
  {
    question: "Can I layer the different serums?",
    answer: "Absolutely. We recommend applying the Hyaluronic Acid first on damp skin, followed by Vitamin C in the morning. Retinol should be reserved for your evening ritual."
  },
  {
    question: "Where are the products manufactured?",
    answer: "Our serums are engineered and cold-processed in small batches in our state-of-the-art laboratory in Paris, France."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-[#06070A] relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`glass-card border rounded-2xl overflow-hidden transition-colors duration-300 ${
                openIndex === index ? 'border-white/30 bg-white/[0.05]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <span className="font-display font-medium text-white text-lg">{faq.question}</span>
                <span className="text-white/50 ml-4 shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-0 text-white/60 font-sans leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
