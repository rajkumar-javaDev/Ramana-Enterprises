import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, MessageCircle, Phone, FileText, Scale, BookOpen, AlertTriangle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { servicesData } from '../data/servicesData';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import FAQSection from '../components/sections/FAQSection';

export default function ServicesPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential Containment', 'Bird & Pest Control', 'Animal Exclusion', 'Construction & Industrial Safety', 'Sports & Recreation', 'Modern Cable Grills', 'Vector & Insect Control'];

  const filteredServices = selectedCategory === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory || (selectedCategory === 'Vector & Insect Control' && (s.category === 'Vector & Insect Control' || s.category === 'Specialized Barriers')));

  return (
    <>
      <SEO
        title="21 Certified Safety Net Services in Bangalore | Complete Catalog"
        description="Explore all 21 specialized safety net solutions: balcony nets, pigeon nets, invisible grills, bird spikes, child safety nets, sports cricket nets, and IS 11057 construction nets in Bangalore."
        canonicalUrl="/services"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Complete Industry Catalog"
            title="21 Certified Safety Net & Barrier Services"
            subtitle="Engineered with genuine Garware HDPE, high-tenacity nylon, and High-Tensile Stainless Steel cables with strict safety classification standards across Bangalore."
          />

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
            <Link
              to="/standards"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-soft-md transition-all flex items-center space-x-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Standards & Safety Guide</span>
                <span className="text-[11px] text-slate-500">IS 11057, EN 1263 & OSHA</span>
              </div>
            </Link>

            <Link
              to="/materials-guide"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-soft-md transition-all flex items-center space-x-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Materials Comparison Matrix</span>
                <span className="text-[11px] text-slate-500">HDPE vs Nylon vs Invisible Grills</span>
              </div>
            </Link>

            <Link
              to="/pricing-guide"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-soft-md transition-all flex items-center space-x-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Transparent Pricing Guide</span>
                <span className="text-[11px] text-slate-500">Cost formula & variables</span>
              </div>
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat} {cat === 'All' ? `(${servicesData.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Services Grid */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft-md hover:shadow-soft-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-white/80 shadow-soft-sm">
                      {service.warranty || "Garware Certified"}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white border border-white/20">
                      {service.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {/* Safety Scope Badge */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                        <span className="font-bold text-slate-900 block">Safety Class:</span>
                        <span>{service.safetyClass}</span>
                      </div>

                      {/* Features list */}
                      <ul className="space-y-1.5 pt-1">
                        {service.features && service.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Buttons */}
                    <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                      <Link
                        to={`/services/${service.slug}`}
                        className="flex items-center justify-center py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        <span>Full Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                      <a
                        href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Raghavi Enterprises! I would like to inquire about ${service.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-soft-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessTimeline />

      {/* FAQ */}
      <FAQSection limit={6} />
    </>
  );
}
