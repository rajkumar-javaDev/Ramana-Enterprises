import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Phone, MessageCircle, FileText } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { faqData } from '../data/faqData';
import { businessInfo } from '../data/businessInfo';

export default function FAQPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [activeTab, setActiveTab] = useState('All');
  const [openItems, setOpenItems] = useState({ '0-0': true });

  const categories = ['All', ...faqData.map(c => c.category)];

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = activeCategory => {
    if (activeCategory === 'All') return faqData;
    return faqData.filter(c => c.category === activeCategory);
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ) | Safety Net Installation"
        description="Get clear answers regarding safety net materials, Garware certifications, warranty terms, installation procedures, wall drilling, and high-rise apartment safety in Bangalore."
        canonicalUrl="/faq"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.flatMap(cat => cat.items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          })))
        }}
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Help & Knowledge Base"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our safety net specifications, Garware material warranty, installation timeframes, and doorstep survey policies."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-slate-950 text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCategories(activeTab).map((group, gIdx) => (
            <div key={group.category} className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  {group.category} Questions
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((item, idx) => {
                  const itemKey = `${gIdx}-${idx}`;
                  const isOpen = !!openItems[itemKey];

                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/50 border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-emerald-600' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-950">Have a Specific Question Not Listed Here?</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Our technical team in Bangalore is available 7 days a week from 7:00 AM to 9:00 PM to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-5 py-3 bg-slate-950 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-soft-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-gold-400" />
              Call {businessInfo.phone}
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent('Hi Raghavi Enterprises! I have a question regarding safety net installation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-soft-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-2" />
              WhatsApp Specialist
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
