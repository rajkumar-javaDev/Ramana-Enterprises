import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  if (!testimonialsData || testimonialsData.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % testimonialsData.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <section className="py-20 lg:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200 mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">What Our Clients Say</h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from thousands of satisfied customers across Bangalore.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl relative"
            >
              <Quote className="absolute top-6 left-6 w-10 h-10 text-slate-200" />

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Stars */}
                <div className="flex text-gold-500 mb-6">
                  {[...Array(testimonialsData[current].rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl leading-relaxed mb-8 font-medium text-slate-700">
                  "{testimonialsData[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center text-lg font-bold text-white">
                    {testimonialsData[current].avatar || testimonialsData[current].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg text-slate-900">{testimonialsData[current].name}</h4>
                    <p className="text-slate-500 text-sm">
                      {testimonialsData[current].location}
                      {testimonialsData[current].service && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                          {testimonialsData[current].service}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button onClick={prev} aria-label="Previous review" className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-6 bg-slate-950' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next review" className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
