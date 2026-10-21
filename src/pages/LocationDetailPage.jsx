import React from 'react';
import { useParams, useOutletContext, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, FileText, CheckCircle2, ShieldCheck, ArrowRight, Shield } from 'lucide-react';
import SEO from '../components/common/SEO';
import { locationsData } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import FAQSection from '../components/sections/FAQSection';

export default function LocationDetailPage() {
  const { locationSlug } = useParams();
  const { onOpenQuoteModal } = useOutletContext();

  const location = locationsData.find(loc => loc.slug === locationSlug);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const nearbyLocations = locationsData.filter(l => l.slug !== location.slug && l.city === location.city).slice(0, 6);

  return (
    <>
      <SEO
        title={`Safety Nets in ${location.name}, ${location.city} | Free Doorstep Survey`}
        description={`Top-rated safety net installation in ${location.name}, ${location.city}. Balcony nets, pigeon nets, invisible grills, child safety nets with up to 10 years warranty. Call ${businessInfo.phone}.`}
        canonicalUrl={`/location/${location.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Ramana Safety Nets - ${location.name}`,
          "telephone": businessInfo.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `${location.name}, ${businessInfo.address.street}`,
            "addressLocality": location.city,
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": location.lat,
            "longitude": location.lng
          }
        }}
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-slate-900 transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{location.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Serving {location.name} & Surrounding Areas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Safety Net Installation Services in {location.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {location.description} We offer specialized balcony safety nets, pigeon exclusion netting, stainless steel invisible grills, and toddler fall protection systems customized for high-rise apartments, villas, and commercial properties in {location.name}.
              </p>

              {/* Service Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Doorstep Visit in {location.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Garware ISO Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Up to 10 Yrs Warranty</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 shadow-soft-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {location.name} Team</span>
                </a>
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Ramana Safety Nets! I need safety net installation at ${location.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-soft-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-soft-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-gold-600" />
                  <span>Get Free Quote</span>
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-md space-y-5">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-950">Book Free Survey in {location.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Same-day technician visit with physical material samples</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Exact laser measurement for flawless fit</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Check sample mesh strength & UV coating</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Zero obligation estimate with written warranty</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md cursor-pointer"
                >
                  Schedule Site Survey in {location.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available in this Location */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3">
              Safety Net Services Available in {location.name}
            </h2>
            <p className="text-sm text-slate-600">
              All services are delivered by certified in-house rope access technicians with original Garware materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 6).map(service => (
              <div key={service.slug} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col group">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-1">{service.title} in {location.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{service.shortDescription}</p>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="py-12 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-950">Nearby Areas We Also Cover</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyLocations.map(loc => (
                <Link
                  key={loc.slug}
                  to={`/location/${loc.slug}`}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:border-slate-300 transition-all shadow-soft-sm"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessTimeline />

      {/* FAQ */}
      <FAQSection limit={4} />
    </>
  );
}
