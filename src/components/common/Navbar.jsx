import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronDown, BookOpen, Scale, FileText, ShieldCheck, ListChecks, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { businessInfo } from '../../data/businessInfo';
import { servicesData } from '../../data/servicesData';
import { cn } from '../../utils/cn';

const Navbar = ({ onOpenQuoteModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const isScrolled = useScrollPosition(20);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsKnowledgeOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b',
        isScrolled ? 'py-2 shadow-soft-md border-slate-200' : 'py-3.5 border-slate-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Large and Clearly Visible */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/ramana-logo.png"
              alt="Ramana Safety Nets - Safe Homes Safer Lives"
              className={cn(
                'w-auto object-contain transition-all duration-300',
                isScrolled ? 'h-[50px] sm:h-[55px] lg:h-[60px]' : 'h-[60px] sm:h-[70px] lg:h-[80px]'
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all">
              Home
            </Link>

            {/* Services Dropdown (21 Services) */}
            <div className="relative" onMouseLeave={() => setIsServicesOpen(false)}>
              <button
                className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                onMouseEnter={() => setIsServicesOpen(true)}
              >
                Services <ChevronDown className={cn('w-3.5 h-3.5 ml-1 transition-transform', isServicesOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[580px] bg-white shadow-soft-xl rounded-3xl p-5 border border-slate-200 mt-1 grid grid-cols-2 gap-x-6 gap-y-2 z-50 max-h-[75vh] overflow-y-auto"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">All 21 Certified Services</span>
                      <Link to="/services" className="text-xs font-bold text-emerald-600 hover:underline">View All Hub →</Link>
                    </div>
                    {servicesData.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="py-1.5 px-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{service.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Knowledge Base Dropdown */}
            <div className="relative" onMouseLeave={() => setIsKnowledgeOpen(false)}>
              <button
                className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                onMouseEnter={() => setIsKnowledgeOpen(true)}
              >
                Knowledge Base <ChevronDown className={cn('w-3.5 h-3.5 ml-1 transition-transform', isKnowledgeOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {isKnowledgeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 bg-white shadow-soft-xl rounded-3xl p-3 border border-slate-200 mt-1 space-y-1 z-50"
                  >
                    <Link
                      to="/standards"
                      className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2.5"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span>Standards & Safety Guide</span>
                        <span className="block text-[10px] text-slate-400 font-normal">IS 11057, EN 1263 & OSHA</span>
                      </div>
                    </Link>
                    <Link
                      to="/materials-guide"
                      className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2.5"
                    >
                      <Scale className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div>
                        <span>Materials Comparison Matrix</span>
                        <span className="block text-[10px] text-slate-400 font-normal">HDPE vs Nylon vs SS316</span>
                      </div>
                    </Link>
                    <Link
                      to="/pricing-guide"
                      className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2.5"
                    >
                      <FileText className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <div>
                        <span>Transparent Pricing Guide</span>
                        <span className="block text-[10px] text-slate-400 font-normal">10-factor cost formula</span>
                      </div>
                    </Link>
                    <Link
                      to="/buying-guide"
                      className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2.5"
                    >
                      <ListChecks className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <div>
                        <span>Customer Buying Guide</span>
                        <span className="block text-[10px] text-slate-400 font-normal">20 questions & 10 red flags</span>
                      </div>
                    </Link>
                    <Link
                      to="/case-studies"
                      className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2.5"
                    >
                      <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <div>
                        <span>Verified Case Studies</span>
                        <span className="block text-[10px] text-slate-400 font-normal">Residential, industrial & high-rise</span>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/locations" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all">
              Locations (40+)
            </Link>
            <Link to="/gallery" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all">
              Gallery
            </Link>
            <Link to="/about" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-50 transition-all">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="flex items-center text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors"
            >
              <Phone className="w-4 h-4 mr-1.5 text-emerald-600" />
              {businessInfo.phone}
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="bg-slate-950 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md active:scale-95 cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
              style={{ top: isScrolled ? '65px' : '85px' }}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden relative z-50 shadow-soft-xl"
            >
              <div className="px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
                <Link to="/" className="block px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Home</Link>

                <div className="space-y-1">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                  >
                    <span>All 21 Services</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isServicesOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-4 pr-2 space-y-1 border-l-2 border-slate-100 ml-4 max-h-60 overflow-y-auto"
                      >
                        {servicesData.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className="block py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-50 rounded-lg"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setIsKnowledgeOpen(!isKnowledgeOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                  >
                    <span>Knowledge Base</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isKnowledgeOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isKnowledgeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-4 pr-2 space-y-1.5 border-l-2 border-slate-100 ml-4"
                      >
                        <Link to="/standards" className="block py-1 px-2 text-xs font-bold text-slate-700">Standards & Safety Guide</Link>
                        <Link to="/materials-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">Materials Comparison</Link>
                        <Link to="/pricing-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">Transparent Pricing Guide</Link>
                        <Link to="/buying-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">Customer Buying Guide</Link>
                        <Link to="/case-studies" className="block py-1 px-2 text-xs font-bold text-slate-700">Verified Case Studies</Link>
                        <Link to="/faq" className="block py-1 px-2 text-xs font-bold text-slate-700">Universal FAQ Master Base</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/locations" className="block px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Locations (40+ Areas)</Link>
                <Link to="/gallery" className="block px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Project Gallery</Link>
                <Link to="/about" className="block px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">About Us</Link>
                <Link to="/contact" className="block px-4 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl">Contact & Survey</Link>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="flex items-center justify-center space-x-2 py-3 bg-slate-100 rounded-2xl font-bold text-xs text-slate-700"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-bold text-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <button
                    onClick={() => { setIsOpen(false); onOpenQuoteModal(); }}
                    className="w-full py-3.5 bg-slate-950 text-white rounded-2xl font-bold text-xs hover:bg-slate-800 transition-colors shadow-soft-md cursor-pointer"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
