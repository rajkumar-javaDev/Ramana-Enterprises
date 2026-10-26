import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronDown,
  BookOpen,
  Scale,
  FileText,
  ShieldCheck,
  ListChecks,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-soft-md">
      {/* TIER 1: Royal Navy & Leaf Green Utility Top Bar (White + Royal Navy Dual-Tone Identity) */}
      <div
        className={cn(
          'bg-gradient-to-r from-[#00274c] via-[#054a91] to-[#00274c] text-white transition-all duration-300 overflow-hidden border-b border-white/10',
          isScrolled ? 'max-h-0 py-0 opacity-0 border-none' : 'max-h-10 py-1.5 opacity-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] sm:text-xs font-medium">
          <div className="flex items-center space-x-3 sm:space-x-5">
            <span className="inline-flex items-center font-bold text-[#8ce3a1] tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#52cd71]" />
              RAGHAVI ENTERPRISES
            </span>
            <span className="hidden md:inline-flex items-center text-blue-100/90">
              <CheckCircle2 className="w-3 h-3 mr-1 text-[#52cd71]" />
              IS 11057 & Garware Certified Netting
            </span>
            <span className="hidden lg:inline-flex items-center text-blue-100/90">
              <Clock className="w-3 h-3 mr-1 text-sky-300" />
              Same-Day Free Doorstep Inspection Across Bangalore
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="hidden sm:inline text-blue-200 font-semibold">
              www.raghavisafetynets.com
            </span>
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center font-bold text-white bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors"
            >
              <Phone className="w-3 h-3 mr-1 text-[#52cd71]" />
              {businessInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* TIER 2: Crisp White + Royal Blue Accent Main Header */}
      <div
        className={cn(
          'bg-white/98 backdrop-blur-md transition-all duration-300 border-b-2 border-[#054a91]/15',
          isScrolled ? 'py-1.5 shadow-soft-lg' : 'py-2.5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo + Raghavi Enterprises Identity */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="relative flex items-center justify-center bg-white rounded-xl p-0.5 border border-blue-100 shadow-sm group-hover:border-[#054a91]/40 transition-all">
                <img
                  src="/assets/raghavi-logo.png"
                  alt="Raghavi Enterprises - Safety Nets For A Safer Tomorrow"
                  className={cn(
                    'w-auto object-contain transition-all duration-300',
                    isScrolled ? 'h-[46px] sm:h-[52px]' : 'h-[54px] sm:h-[62px] lg:h-[66px]'
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-[#00274c] leading-none">
                  RAGHAVI <span className="text-[#21893c]">ENTERPRISES</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-[#054a91] uppercase mt-1">
                  Safety Nets For A Safer Tomorrow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center bg-[#f0f7ff] px-2 py-1 rounded-2xl border border-blue-100/80 space-x-0.5">
              <Link
                to="/"
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-xl transition-all',
                  isActive('/')
                    ? 'bg-[#00274c] text-white shadow-sm'
                    : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                )}
              >
                Home
              </Link>

              {/* Services Dropdown (21 Services) */}
              <div className="relative" onMouseLeave={() => setIsServicesOpen(false)}>
                <button
                  className={cn(
                    'flex items-center px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer',
                    location.pathname.startsWith('/services')
                      ? 'bg-[#00274c] text-white shadow-sm'
                      : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                  )}
                  onMouseEnter={() => setIsServicesOpen(true)}
                >
                  21 Safety Services
                  <ChevronDown
                    className={cn('w-3.5 h-3.5 ml-1 transition-transform', isServicesOpen && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-[600px] bg-white shadow-soft-xl rounded-2xl p-5 border-2 border-[#054a91]/15 mt-1.5 grid grid-cols-2 gap-x-5 gap-y-1.5 z-50 max-h-[75vh] overflow-y-auto"
                    >
                      <div className="col-span-2 pb-2.5 mb-2 border-b border-blue-100 flex items-center justify-between bg-[#f0f7ff] -mx-5 -mt-5 px-5 py-3 rounded-t-xl">
                        <span className="text-xs font-extrabold text-[#00274c] uppercase tracking-wider flex items-center">
                          <ShieldCheck className="w-4 h-4 mr-1.5 text-[#21893c]" />
                          Raghavi Certified Netting Solutions (21)
                        </span>
                        <Link
                          to="/services"
                          className="text-xs font-extrabold text-[#054a91] hover:text-[#21893c] flex items-center"
                        >
                          Explore All <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </div>
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate">{service.title}</span>
                          <span className="text-[10px] font-bold text-[#21893c] opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Knowledge Base Dropdown */}
              <div className="relative" onMouseLeave={() => setIsKnowledgeOpen(false)}>
                <button
                  className="flex items-center px-3.5 py-2 text-xs font-bold text-[#00274c] hover:bg-white hover:text-[#054a91] rounded-xl transition-all cursor-pointer"
                  onMouseEnter={() => setIsKnowledgeOpen(true)}
                >
                  Technical Hub
                  <ChevronDown
                    className={cn('w-3.5 h-3.5 ml-1 transition-transform', isKnowledgeOpen && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {isKnowledgeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-80 bg-white shadow-soft-xl rounded-2xl p-3 border-2 border-[#054a91]/15 mt-1.5 space-y-1 z-50"
                    >
                      <Link
                        to="/standards"
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-xl transition-colors flex items-center space-x-2.5"
                      >
                        <BookOpen className="w-4 h-4 text-[#21893c] flex-shrink-0" />
                        <div>
                          <span>Standards & Safety Guide</span>
                          <span className="block text-[10px] text-slate-400 font-normal">IS 11057, EN 1263 & OSHA</span>
                        </div>
                      </Link>
                      <Link
                        to="/materials-guide"
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-xl transition-colors flex items-center space-x-2.5"
                      >
                        <Scale className="w-4 h-4 text-[#054a91] flex-shrink-0" />
                        <div>
                          <span>Materials Comparison Matrix</span>
                          <span className="block text-[10px] text-slate-400 font-normal">HDPE vs Nylon vs Invisible Grills</span>
                        </div>
                      </Link>
                      <Link
                        to="/pricing-guide"
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-xl transition-colors flex items-center space-x-2.5"
                      >
                        <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <div>
                          <span>Transparent Pricing Guide</span>
                          <span className="block text-[10px] text-slate-400 font-normal">10-factor cost formula</span>
                        </div>
                      </Link>
                      <Link
                        to="/buying-guide"
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-xl transition-colors flex items-center space-x-2.5"
                      >
                        <ListChecks className="w-4 h-4 text-[#21893c] flex-shrink-0" />
                        <div>
                          <span>Customer Buying Guide</span>
                          <span className="block text-[10px] text-slate-400 font-normal">20 questions & 10 red flags</span>
                        </div>
                      </Link>
                      <Link
                        to="/case-studies"
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-xl transition-colors flex items-center space-x-2.5"
                      >
                        <Building2 className="w-4 h-4 text-[#054a91] flex-shrink-0" />
                        <div>
                          <span>Verified Case Studies</span>
                          <span className="block text-[10px] text-slate-400 font-normal">Residential, industrial & high-rise</span>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/locations"
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-xl transition-all',
                  isActive('/locations')
                    ? 'bg-[#00274c] text-white shadow-sm'
                    : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                )}
              >
                Locations
              </Link>
              <Link
                to="/gallery"
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-xl transition-all',
                  isActive('/gallery')
                    ? 'bg-[#00274c] text-white shadow-sm'
                    : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                )}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-xl transition-all',
                  isActive('/about')
                    ? 'bg-[#00274c] text-white shadow-sm'
                    : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                )}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-xl transition-all',
                  isActive('/contact')
                    ? 'bg-[#00274c] text-white shadow-sm'
                    : 'text-[#00274c] hover:bg-white hover:text-[#054a91]'
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <a
                href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#1d6d32] bg-[#f1fcf3] hover:bg-[#def8e3] border border-[#bef0c9] transition-all"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#21893c]" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={onOpenQuoteModal}
                className="bg-gradient-to-r from-[#00274c] to-[#054a91] hover:from-[#054a91] hover:to-[#00274c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-soft-md active:scale-95 cursor-pointer flex items-center space-x-1.5"
              >
                <span>Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8ce3a1]" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2.5 text-[#00274c] bg-[#f0f7ff] hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
              className="fixed inset-0 bg-[#00274c]/30 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setIsOpen(false)}
              style={{ top: isScrolled ? '64px' : '98px' }}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden bg-white border-t border-blue-100 overflow-hidden relative z-50 shadow-soft-xl"
            >
              <div className="px-4 py-5 space-y-2.5 max-h-[80vh] overflow-y-auto">
                <Link
                  to="/"
                  className="block px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                >
                  Home
                </Link>

                <div className="space-y-1">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                  >
                    <span>All 21 Safety Services</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isServicesOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-4 pr-2 space-y-1 border-l-2 border-[#054a91]/30 ml-4 max-h-60 overflow-y-auto"
                      >
                        {servicesData.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className="block py-1.5 px-2 text-xs font-semibold text-slate-600 hover:text-[#00274c] hover:bg-[#f0f7ff] rounded-lg"
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
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                  >
                    <span>Technical Knowledge Hub</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isKnowledgeOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {isKnowledgeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-4 pr-2 space-y-1.5 border-l-2 border-[#21893c]/40 ml-4"
                      >
                        <Link to="/standards" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Standards & Safety Guide
                        </Link>
                        <Link to="/materials-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Materials Comparison
                        </Link>
                        <Link to="/pricing-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Transparent Pricing Guide
                        </Link>
                        <Link to="/buying-guide" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Customer Buying Guide
                        </Link>
                        <Link to="/case-studies" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Verified Case Studies
                        </Link>
                        <Link to="/faq" className="block py-1 px-2 text-xs font-bold text-slate-700">
                          Universal FAQ Master Base
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/locations"
                  className="block px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                >
                  Locations (40+ Areas)
                </Link>
                <Link
                  to="/gallery"
                  className="block px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                >
                  Project Gallery
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                >
                  About Raghavi Enterprises
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2.5 text-sm font-bold text-[#00274c] hover:bg-[#f0f7ff] rounded-xl"
                >
                  Contact & Free Survey
                </Link>

                <div className="pt-3 border-t border-blue-100 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-[#f0f7ff] rounded-xl font-bold text-xs text-[#00274c] border border-blue-200"
                    >
                      <Phone className="w-4 h-4 text-[#054a91]" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 py-2.5 bg-[#f1fcf3] text-[#1d6d32] rounded-xl font-bold text-xs border border-[#bef0c9]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenQuoteModal();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#00274c] to-[#054a91] text-white rounded-xl font-bold text-xs shadow-soft-md cursor-pointer"
                  >
                    Request Free Doorstep Quote
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
