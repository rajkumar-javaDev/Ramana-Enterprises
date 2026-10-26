import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, Phone, ArrowRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { locationsData, priorityTargetLocations } from '../data/locationsData';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';

export default function LocationsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredLocations = locationsData.filter((loc) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      (loc.landmarks && loc.landmarks.toLowerCase().includes(q)) ||
      loc.description.toLowerCase().includes(q);

    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'hospet-belt' && loc.region === 'Hosapete Priority Zone') ||
      (selectedType === 'karnataka-cities' && loc.region !== 'Hosapete Priority Zone' && loc.region !== 'Bengaluru Metro') ||
      (selectedType === 'bengaluru' && loc.region === 'Bengaluru Metro');

    return matchesSearch && matchesType;
  });

  const hospetBeltCount = locationsData.filter((l) => l.region === 'Hosapete Priority Zone').length;
  const karnatakaCitiesCount = locationsData.filter(
    (l) => l.region !== 'Hosapete Priority Zone' && l.region !== 'Bengaluru Metro'
  ).length;
  const bengaluruCount = locationsData.filter((l) => l.region === 'Bengaluru Metro').length;

  return (
    <>
      <SEO
        title="Safety Net Installation in Hosapete (Hospet), Hampi, Ballari, Koppal, Hubballi, Bengaluru & 70+ Karnataka Locations"
        description="Raghavi Enterprises provides #1 safety net & invisible grill installation in Hosapete (Hospet), Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Mariyammanahalli, Gangavathi, Koppal, Ballari, Hubballi, Dharwad, Bengaluru, Mysuru, Mangaluru & all Karnataka."
        canonicalUrl="/locations"
      />

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-[#f0f7ff] to-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Priority Service Network — Hosapete & All Karnataka"
            title="Serving Hosapete (Hospet), Vijayanagara, Ballari, Koppal, Hubballi, Bengaluru & 70+ Locations"
            subtitle="Our #1 priority hub in Hosapete (Hospet) and dedicated regional teams across Karnataka provide same-day free doorstep measurement and certified Garware safety net installation."
          />

          {/* Priority Spotlight Banner for Hosapete & Surrounding Towns */}
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#00274c] via-[#054a91] to-[#00274c] text-white shadow-soft-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#21893c] text-white text-[11px] font-extrabold uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Main Priority Hub: Hosapete & Surrounding Region</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold">
                  Express 2-Hour Doorstep Service in Hosapete, Hampi, Toranagallu, Ballari, Koppal & Gangavathi
                </h2>
                <p className="text-xs text-blue-100">
                  Dedicated local installers stationed across Hosapete, Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Mariyammanahalli, Kampli, Kudligi, Gangavathi, Koppal & Ballari.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-[#21893c] hover:bg-[#196d2f] text-white text-xs font-extrabold flex items-center space-x-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {businessInfo.phone}</span>
                </a>
                <Link
                  to="/location/hosapete"
                  className="px-4 py-2.5 rounded-xl bg-white text-[#00274c] hover:bg-blue-50 text-xs font-extrabold transition-all"
                >
                  Explore Hosapete Hub →
                </Link>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search your city or town (e.g. Hosapete, Hampi, Toranagallu, Ballari, Koppal, Hubballi, Bengaluru)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-[#00274c] focus:border-transparent text-sm bg-white shadow-soft-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-[#00274c] text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Locations ({locationsData.length})
              </button>
              <button
                onClick={() => setSelectedType('hospet-belt')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedType === 'hospet-belt'
                    ? 'bg-[#21893c] text-white shadow-soft-sm'
                    : 'bg-emerald-50 text-[#21893c] border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                ★ Hosapete & Nearby Priority Belt ({hospetBeltCount})
              </button>
              <button
                onClick={() => setSelectedType('karnataka-cities')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedType === 'karnataka-cities'
                    ? 'bg-[#00274c] text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Karnataka Cities & Districts ({karnatakaCitiesCount})
              </button>
              <button
                onClick={() => setSelectedType('bengaluru')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedType === 'bengaluru'
                    ? 'bg-[#00274c] text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Bengaluru Zones ({bengaluruCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLocations.map((loc, idx) => {
              const isPriorityBelt = loc.region === 'Hosapete Priority Zone';
              return (
                <motion.div
                  key={loc.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 8) * 0.03 }}
                  className={`rounded-2xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between group ${
                    isPriorityBelt
                      ? 'bg-[#f8fbff] border-2 border-[#054a91]/25 hover:border-[#21893c]'
                      : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isPriorityBelt
                            ? 'bg-[#00274c] text-white group-hover:bg-[#21893c]'
                            : 'bg-emerald-50 text-emerald-600 group-hover:bg-[#00274c] group-hover:text-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          isPriorityBelt
                            ? 'text-[#21893c] bg-emerald-50 border-emerald-200'
                            : 'text-slate-500 bg-slate-50 border-slate-100'
                        }`}
                      >
                        {isPriorityBelt ? '★ Priority Hub' : loc.city}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#00274c] group-hover:text-[#21893c] transition-colors">
                      {loc.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {loc.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/location/${loc.slug}`}
                      className="inline-flex items-center text-xs font-bold text-[#00274c] hover:text-[#21893c] transition-colors"
                    >
                      <span>View All 19 Services</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <button
                      onClick={onOpenQuoteModal}
                      className="text-[11px] font-bold text-[#21893c] hover:text-white hover:bg-[#21893c] bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Free Survey
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">No locations found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                }}
                className="mt-3 px-4 py-2 bg-[#00274c] text-white rounded-xl text-xs font-bold"
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
