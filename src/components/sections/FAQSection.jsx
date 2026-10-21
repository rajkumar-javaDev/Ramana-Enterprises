import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqData } from '../../data/faqData';

const FAQSection = ({ limit }) => {
  const [openIdx, setOpenIdx] = useState(0);

  // Flatten all FAQ items across categories for display
  const allItems = faqData.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.category }))
  );

  const displayItems = limit ? allItems.slice(0, limit) : allItems;

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center text-xs font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mb-4">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">Frequently Asked Questions</h2>
          <p className="text-base text-slate-500">
            Find answers to common queries about safety nets, installation, warranty, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {displayItems.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-soft-sm"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-2xl"
                aria-expanded={openIdx === idx}
              >
                <span className="text-sm sm:text-base font-bold text-slate-800 pr-6">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {limit && (
          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center px-6 py-3 bg-slate-950 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md active:scale-95"
            >
              View All FAQs
              <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
