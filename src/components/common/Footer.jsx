import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Globe, Camera, Play, ArrowUpRight, MessageCircle, ShieldCheck, Scale, FileText, BookOpen, ListChecks, Building2 } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { servicesData } from '../../data/servicesData';
import { locationsData } from '../../data/locationsData';

const Footer = () => {
  const topLocations = locationsData.slice(0, 12);

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="block">
              <img
                src="/assets/ramana-logo.png"
                alt={businessInfo.name}
                className="h-[65px] w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ramana Safety Nets is Bangalore's leading provider of authentic Garware HDPE safety nets, 316 marine-grade invisible grills, and structural barrier systems. {businessInfo.experienceYears}+ years of technical expertise, 15,000+ completed installations, and strict adherence to Indian Standards.
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {businessInfo.tagline}
            </p>

            {/* Knowledge Base Fast Links */}
            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                to="/standards"
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                IS 11057 & Standards
              </Link>
              <Link
                to="/materials-guide"
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                HDPE vs Nylon vs SS316
              </Link>
              <Link
                to="/pricing-guide"
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                Pricing Framework
              </Link>
              <Link
                to="/buying-guide"
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                Buying Guide & Red Flags
              </Link>
              <Link
                to="/case-studies"
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                Verified Case Studies
              </Link>
            </div>
          </div>

          {/* 21 Core Services */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Core Services</h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs text-slate-600 hover:text-slate-950 transition-colors flex items-center group"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Bengaluru Locations */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Serving Areas</h3>
            <ul className="space-y-2">
              {topLocations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    to={`/location/${loc.slug}`}
                    className="text-xs text-slate-600 hover:text-slate-950 transition-colors block"
                  >
                    Safety Nets {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/locations"
              className="text-xs font-bold text-emerald-600 mt-3 inline-flex items-center hover:underline"
            >
              All 40+ Locations →
            </Link>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Direct Contact</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="text-xs text-slate-700 font-bold hover:text-slate-950 block">
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 shrink-0" />
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  WhatsApp Chat (Instant)
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 shrink-0" />
                <span className="text-xs text-slate-600 leading-relaxed">
                  {businessInfo.address.street}, {businessInfo.address.city}, {businessInfo.address.state} - {businessInfo.address.pincode}
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-emerald-600 mt-0.5 mr-2.5 shrink-0" />
                <span className="text-xs text-slate-600">{businessInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved. IS 11057 / EN 1263 / OSHA Compliant Rigging.
          </p>
          <div className="flex flex-wrap items-center space-x-5 text-xs text-slate-400">
            <Link to="/standards" className="hover:text-slate-700 transition-colors">Standards</Link>
            <Link to="/materials-guide" className="hover:text-slate-700 transition-colors">Materials Guide</Link>
            <Link to="/pricing-guide" className="hover:text-slate-700 transition-colors">Pricing</Link>
            <Link to="/buying-guide" className="hover:text-slate-700 transition-colors">Buying Guide</Link>
            <Link to="/case-studies" className="hover:text-slate-700 transition-colors">Case Studies</Link>
            <Link to="/faq" className="hover:text-slate-700 transition-colors">FAQ</Link>
            <Link to="/gallery" className="hover:text-slate-700 transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-slate-700 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-slate-700 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
