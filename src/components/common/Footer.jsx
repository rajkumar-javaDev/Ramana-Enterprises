import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, MessageCircle, Globe } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { servicesData } from '../../data/servicesData';
import { priorityTargetLocations } from '../../data/locationsData';

const Footer = () => {
  const topLocations = priorityTargetLocations.slice(0, 15);

  return (
    <footer className="bg-gradient-to-b from-white to-[#f0f7ff] border-t-2 border-[#054a91]/15 pt-14 pb-8 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3">
              <img
                src="/assets/raghavi-logo.png"
                alt={businessInfo.name}
                className="h-[64px] w-auto object-contain rounded-xl bg-white p-1 border border-blue-100 shadow-xs"
              />
              <div>
                <span className="block text-lg font-extrabold text-[#00274c] leading-none">
                  RAGHAVI <span className="text-[#21893c]">ENTERPRISES</span>
                </span>
                <span className="block text-[10px] font-bold tracking-widest text-[#054a91] uppercase mt-1">
                  {businessInfo.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Raghavi Enterprises (raghavisafetynets.com) is the #1 trusted provider of authentic Garware HDPE safety nets, pigeon & monkey protection nets, and modern invisible grills in <strong>Hosapete (Hospet), Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Gangavathi, Koppal, Ballari, Hubballi, Dharwad, Bengaluru</strong> & across Karnataka.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#054a91] bg-white px-3 py-1.5 rounded-xl border border-blue-200/70">
              <Globe className="w-3.5 h-3.5 text-[#21893c]" />
              <span>www.raghavisafetynets.com</span>
            </div>

            {/* Knowledge Base Fast Links */}
            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                to="/standards"
                className="px-3 py-1.5 bg-white border border-blue-200/80 rounded-xl text-[11px] font-bold text-[#00274c] hover:bg-[#00274c] hover:text-white transition-colors"
              >
                IS 11057 & Standards
              </Link>
              <Link
                to="/materials-guide"
                className="px-3 py-1.5 bg-white border border-blue-200/80 rounded-xl text-[11px] font-bold text-[#00274c] hover:bg-[#00274c] hover:text-white transition-colors"
              >
                HDPE vs Nylon vs Invisible Grills
              </Link>
              <Link
                to="/pricing-guide"
                className="px-3 py-1.5 bg-white border border-blue-200/80 rounded-xl text-[11px] font-bold text-[#00274c] hover:bg-[#00274c] hover:text-white transition-colors"
              >
                Pricing Framework
              </Link>
              <Link
                to="/buying-guide"
                className="px-3 py-1.5 bg-white border border-blue-200/80 rounded-xl text-[11px] font-bold text-[#00274c] hover:bg-[#00274c] hover:text-white transition-colors"
              >
                Buying Guide & Red Flags
              </Link>
              <Link
                to="/case-studies"
                className="px-3 py-1.5 bg-white border border-blue-200/80 rounded-xl text-[11px] font-bold text-[#00274c] hover:bg-[#00274c] hover:text-white transition-colors"
              >
                Verified Case Studies
              </Link>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-extrabold text-[#00274c] uppercase tracking-wider mb-4">Core Services</h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs text-slate-600 hover:text-[#00274c] transition-colors flex items-center group"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#21893c] flex-shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Priority Locations (Hosapete & Nearby First) */}
          <div>
            <h3 className="text-xs font-extrabold text-[#00274c] uppercase tracking-wider mb-4">Priority Locations</h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {topLocations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    to={`/location/${loc.slug}`}
                    className="text-xs text-slate-600 hover:text-[#00274c] transition-colors block font-medium"
                  >
                    Safety Nets in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/locations"
              className="text-xs font-bold text-[#21893c] mt-3 inline-flex items-center hover:underline"
            >
              All 70+ Locations →
            </Link>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-extrabold text-[#00274c] uppercase tracking-wider mb-4">Direct Contact</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-[#054a91] mt-0.5 mr-2.5 shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="text-xs text-[#00274c] font-bold hover:text-[#21893c] block">
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-4 h-4 text-[#21893c] mt-0.5 mr-2.5 shrink-0" />
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#21893c] font-bold hover:underline"
                >
                  WhatsApp Chat (Instant)
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-[#054a91] mt-0.5 mr-2.5 shrink-0" />
                <span className="text-xs text-slate-600 leading-relaxed">
                  {businessInfo.address.street}, {businessInfo.address.state} - {businessInfo.address.pincode}
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-[#21893c] mt-0.5 mr-2.5 shrink-0" />
                <span className="text-xs text-slate-600">{businessInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Full Regional SEO Directory Links */}
        <div className="py-5 border-t border-blue-200/60">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00274c] mb-2.5">
            Service Coverage Across Hosapete (Hospet), Vijayanagara, Ballari, Koppal, Hubballi, Bengaluru & Karnataka:
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {priorityTargetLocations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/location/${loc.slug}`}
                className="text-[11px] text-slate-600 hover:text-[#21893c] hover:underline transition-colors"
              >
                Safety Nets {loc.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {businessInfo.name} (raghavisafetynets.com). All rights reserved. Serving Hosapete & All Karnataka.
          </p>
          <div className="flex flex-wrap items-center space-x-5 text-xs text-slate-500">
            <Link to="/standards" className="hover:text-[#00274c] transition-colors">Standards</Link>
            <Link to="/materials-guide" className="hover:text-[#00274c] transition-colors">Materials Guide</Link>
            <Link to="/pricing-guide" className="hover:text-[#00274c] transition-colors">Pricing</Link>
            <Link to="/buying-guide" className="hover:text-[#00274c] transition-colors">Buying Guide</Link>
            <Link to="/case-studies" className="hover:text-[#00274c] transition-colors">Case Studies</Link>
            <Link to="/faq" className="hover:text-[#00274c] transition-colors">FAQ</Link>
            <Link to="/gallery" className="hover:text-[#00274c] transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-[#00274c] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#00274c] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
