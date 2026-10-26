import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  Award
} from 'lucide-react';
import { heroSlidesData } from '../../data/heroSlidesData';
import { businessInfo } from '../../data/businessInfo';

const QUICK_PILLS = [
  { label: 'Balcony Nets', idx: 0, slug: '/services/balcony-safety-nets' },
  { label: 'Invisible Grills', idx: 1, slug: '/services/invisible-grills' },
  { label: 'Pigeon & Bird Nets', idx: 2, slug: '/services/pigeon-safety-nets' },
  { label: 'Children Safety', idx: 3, slug: '/services/children-safety-nets' },
  { label: 'Cricket & Sports', idx: 4, slug: '/services/cricket-practice-nets' },
  { label: 'Construction Nets', idx: 5, slug: '/services/construction-safety-nets' },
];

export default function HeroSection({ onOpenQuoteModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlidesData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const currentSlide = heroSlidesData[currentIndex] || heroSlidesData[0];

  return (
    <section
      className="relative bg-gradient-to-br from-[#f0f7ff] via-white to-[#f1fcf3] py-4 sm:py-6 lg:py-7 overflow-hidden border-b border-blue-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle architectural background mesh accents */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#054a91]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#21893c]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Split Card Container */}
        <div className="bg-white rounded-3xl border border-blue-100/90 shadow-soft-lg p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

            {/* FIRST COLUMN (Left on Desktop / Top on Mobile): Compact Framed Showcase Image (5 Cols) */}
            <div className="lg:col-span-5 order-1">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#054a91]/15 shadow-soft-md bg-slate-100 h-[200px] sm:h-[230px] lg:h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.image}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Gradient overlay at bottom for readable caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#00274c]/90 via-[#00274c]/50 to-transparent p-3 flex items-end justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#8ce3a1] bg-[#00274c]/80 px-2 py-0.5 rounded-md border border-white/15 mb-0.5">
                      {currentSlide.badgeText}
                    </span>
                    <p className="text-xs font-bold text-white truncate max-w-[230px] sm:max-w-[280px]">
                      {currentSlide.title}
                    </p>
                  </div>
                  <Link
                    to={`/services/${currentSlide.slug}`}
                    className="bg-white text-[#00274c] hover:bg-[#f0f7ff] px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold shadow-sm flex items-center shrink-0 transition-colors"
                  >
                    Details <ArrowRight className="w-3 h-3 ml-1 text-[#21893c]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* SECOND COLUMN (Right on Desktop / Bottom on Mobile): Brand Authority & Content (7 Cols) */}
            <div className="lg:col-span-7 order-2 space-y-3.5">
              {/* Top Trust Pill Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 bg-[#00274c] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52cd71]" />
                  <span>RAGHAVI ENTERPRISES</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-[#f1fcf3] text-[#1d6d32] border border-[#bef0c9] text-[11px] font-bold px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3 text-[#21893c]" />
                  <span>{currentSlide.highlight}</span>
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-semibold text-[#054a91] bg-[#f0f7ff] px-2.5 py-1 rounded-full border border-blue-200/60">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.9/5 (15,000+ Homes)</span>
                </span>
              </div>

              {/* Compact Headline */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5"
                >
                  <h1 className="text-xl sm:text-2xl lg:text-[32px] font-extrabold text-[#00274c] tracking-tight leading-[1.18]">
                    {currentSlide.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 max-w-2xl">
                    {currentSlide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Service Switcher Pills */}
              <div className="pt-0.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Quick Service Preview:
                  </span>
                  <Link
                    to={`/services/${currentSlide.slug}`}
                    className="text-[11px] font-bold text-[#054a91] hover:text-[#21893c] inline-flex items-center"
                  >
                    View Full Specs <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PILLS.map((pill) => {
                    const active = currentIndex === pill.idx;
                    return (
                      <button
                        key={pill.label}
                        onClick={() => setCurrentIndex(pill.idx)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                          active
                            ? 'bg-[#054a91] text-white border-[#054a91] shadow-xs'
                            : 'bg-[#f8fafc] text-slate-700 border-slate-200/80 hover:border-[#054a91]/40 hover:text-[#00274c]'
                        }`}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compact Action Row */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#00274c] to-[#054a91] hover:from-[#054a91] hover:to-[#00274c] shadow-soft-sm transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8ce3a1]" />
                  <span>Call {businessInfo.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Raghavi Enterprises! I am interested in ${currentSlide.title}. Please share quotation details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#21893c] hover:bg-[#1d6d32] shadow-soft-sm transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Quote</span>
                </a>

                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#00274c] bg-[#f0f7ff] hover:bg-blue-100 border border-blue-200 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Book Free Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#054a91]" />
                </button>
              </div>

              {/* Compact Bottom Feature Strip */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#21893c] shrink-0" />
                  <span className="truncate">Free Same-Day Survey</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#054a91] shrink-0" />
                  <span className="truncate">Invisible Grill & Garware HDPE</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#21893c] shrink-0" />
                  <span className="truncate">10-Yr Official Warranty</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
