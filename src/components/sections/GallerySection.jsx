import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import { galleryData, galleryCategories } from '../../data/galleryData';

const GallerySection = ({ limit }) => {
  const [activeTab, setActiveTab] = useState('All');
  const filteredGallery = activeTab === 'All' ? galleryData : (galleryData || []).filter(item => item.category === activeTab);
  const displayGallery = limit ? filteredGallery.slice(0, limit) : filteredGallery;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Recent Installations</h2>
            <p className="text-lg text-slate-600">Browse through our portfolio of successful safety net installations across Bangalore.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(galleryCategories || []).map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === cat ? 'bg-green-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayGallery.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-200">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-2">{item.category}</div>
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 delay-100"><Eye className="w-6 h-6 text-white" /></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {limit && (
          <div className="mt-12 text-center">
            <Link to="/gallery" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">View Full Gallery<ArrowRight className="w-5 h-5 ml-2" /></Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default GallerySection;
