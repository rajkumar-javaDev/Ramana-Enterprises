import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, Phone, ArrowRight, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { locationsData } from '../data/locationsData';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';

export default function LocationsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredLocations = locationsData.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || 
                        (selectedType === 'bengaluru' && loc.city.toLowerCase() === 'bangalore') ||
                        (selectedType === 'nearby' && loc.city.toLowerCase() !== 'bangalore');
    return matchesSearch && matchesType;
  });

  return (
    <>
      <SEO
        title="Safety Net Installation Locations in Bangalore & Karnataka"
        description="Find Ramana Safety Nets installation services across Bangalore, Whitefield, HSR Layout, Koramangala, Electronic City, Mysuru, Tumakuru, and 40+ locations. Free doorstep survey."
        canonicalUrl="/locations"
      />

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Service Coverage Area"
            title="We Serve 40+ Locations Across Bangalore & Karnataka"
            subtitle="Local rope-access technicians deployed in every major zone for rapid same-day measurement and hassle-free safety net installation."
          />

          {/* Search & Filter Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search your area (e.g. Whitefield, HSR Layout, Mysuru)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent text-sm bg-slate-50/50 shadow-soft-sm"
              />
            </div>

            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'all' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Locations ({locationsData.length})
              </button>
              <button
                onClick={() => setSelectedType('bengaluru')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'bengaluru' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Bengaluru Areas (30+)
              </button>
              <button
                onClick={() => setSelectedType('nearby')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'nearby' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Nearby Districts & Cities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLocations.map((loc, idx) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 8) * 0.04 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft-sm hover:shadow-soft-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {loc.city}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {loc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/location/${loc.slug}`}
                    className="inline-flex items-center text-xs font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                  >
                    <span>View Area Services</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <button
                    onClick={onOpenQuoteModal}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Survey
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">No locations found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedType('all'); }}
                className="mt-3 px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessTimeline />
    </>
  );
}
