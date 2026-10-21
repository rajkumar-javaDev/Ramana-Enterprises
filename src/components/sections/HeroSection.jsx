import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, FileText, Star, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { heroSlidesData } from '../../data/heroSlidesData';
import { businessInfo } from '../../data/businessInfo';

export default function HeroSection({ onOpenQuoteModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => handleNext(), 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroSlidesData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroSlidesData.length) % heroSlidesData.length);
  };

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX.current;
    if (Math.abs(diffX) > 50) diffX > 0 ? handleNext() : handlePrev();
  };

  const currentSlide = heroSlidesData[currentIndex];

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.3, ease: 'easeIn' } }),
  };

  return (
    <section
      className="relative bg-white pt-6 pb-14 lg:pt-10 lg:pb-20 overflow-hidden border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide indicators - Desktop */}
        <div className="hidden sm:flex justify-end items-center mb-3">
          <div className="flex items-center space-x-1.5">
            {heroSlidesData.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-slate-950' : 'w-2 bg-slate-200 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="relative min-h-[520px] sm:min-h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* IMAGE FIRST (Left Desktop / Top Mobile) */}
              <div className="lg:col-span-6 order-1 relative w-full">
                <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[480px] rounded-3xl overflow-hidden shadow-soft-xl border border-slate-200 bg-slate-100">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Top-left badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 border border-white/80 shadow-soft-md flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold-600" />
                    <span>Garware ISO Certified</span>
                  </div>
                  {/* Bottom-right badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-slate-950 border border-white/80 text-xs font-semibold shadow-soft-md">
                    <span className="text-gold-600 font-bold block">{currentSlide.highlight}</span>
                    <span className="text-[10px] text-slate-500">100% Free Doorstep Survey</span>
                  </div>
                </div>
              </div>

              {/* CONTENT SECOND (Right Desktop / Bottom Mobile) */}
              <div className="lg:col-span-6 order-2 space-y-4 sm:space-y-5">
                {/* Badge & Highlight */}
                <div className="space-y-1">
                  <span className="inline-block text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                    {currentSlide.badgeText}
                  </span>
                  <span className="block text-xs font-semibold text-slate-500 pt-1">
                    {currentSlide.highlight}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                  {currentSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentSlide.subtitle}
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>100% Child & Pet Safe</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Official Warranty</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free Site Survey</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 shadow-soft-md transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-gold-400" />
                    <span>Call Specialist</span>
                  </a>
                  <a
                    href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Ramana Safety Nets! I am interested in ${currentSlide.title}. Please provide details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-soft-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={onOpenQuoteModal}
                    className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-soft-sm transition-all active:scale-95"
                  >
                    <FileText className="w-4 h-4 text-gold-600" />
                    <span>Get Free Quote</span>
                  </button>
                </div>

                {/* Social Proof */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <div className="flex items-center space-x-1 text-gold-600">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    <span className="font-bold text-slate-900 ml-1">4.9 / 5</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-slate-700 font-semibold">15,000+ Installations</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-emerald-700 font-semibold">Free Doorstep Survey</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/3 sm:top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 p-2.5 sm:p-3 rounded-full bg-white text-slate-800 shadow-soft-lg border border-slate-200 hover:bg-slate-950 hover:text-white transition-all z-20 hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-0 top-1/3 sm:top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 p-2.5 sm:p-3 rounded-full bg-white text-slate-800 shadow-soft-lg border border-slate-200 hover:bg-slate-950 hover:text-white transition-all z-20 hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex sm:hidden justify-center items-center mt-4 space-x-1.5">
          {heroSlidesData.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-slate-950' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
