import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldCheck, Phone, FileText } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import LightboxModal from '../components/common/LightboxModal';
import { galleryData, galleryCategories } from '../data/galleryData';
import { businessInfo } from '../data/businessInfo';

export default function GalleryPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title="Project Gallery & Real Installations in Hosapete, Ballari & Karnataka"
        description="Explore 15 real on-site installation photos of balcony safety nets, pigeon nets, invisible grills, child safety nets, and cricket nets across Hosapete, Ballari, Hubballi, Bengaluru & Karnataka."
        canonicalUrl="/gallery"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Verified Portfolio"
            title="Real Installation Projects Across Hosapete & Karnataka"
            subtitle="Explore our curated gallery of 15 real residential balcony nets, invisible grills, pigeon barriers, and industrial safety net installations."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
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

      {/* Gallery Grid */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-soft-sm hover:shadow-soft-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-block w-fit mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white text-sm font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-soft-sm">
                    <Eye className="w-4 h-4 text-slate-900" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Want a Similar Flawless Installation for Your Home?
          </h2>
          <p className="text-sm text-slate-600">
            Schedule a free on-site survey anywhere in Bangalore. Our technicians carry actual material samples for your evaluation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Call Specialist
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request Free Inspection
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}
