import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onNavigate
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onNavigate) onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight' && onNavigate) onNavigate((currentIndex + 1) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:-top-12 sm:right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 pointer-events-auto">
            <img
              src={currentItem.image}
              alt={currentItem.title || "Safety Net Installation"}
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>

          {/* Caption */}
          <div className="mt-4 text-center text-white pointer-events-auto">
            <h3 className="text-lg font-bold">{currentItem.title}</h3>
            {currentItem.category && (
              <span className="text-xs text-slate-300 font-medium px-3 py-1 bg-white/10 rounded-full inline-block mt-1">
                {currentItem.category}
              </span>
            )}
          </div>

          {/* Navigation Controls */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors pointer-events-auto"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate((currentIndex + 1) % items.length)}
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors pointer-events-auto"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
