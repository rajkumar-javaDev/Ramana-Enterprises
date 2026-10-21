import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Phone, MessageCircle, FileText, ArrowRight, Shield, Award, MapPin, AlertCircle, Wrench, ChevronDown, ListChecks, HelpCircle, Layers, Building2, Eye, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import LightboxModal from './LightboxModal';
import { businessInfo } from '../../data/businessInfo';
import { servicesData } from '../../data/servicesData';
import { locationsData } from '../../data/locationsData';
import serviceImagesManifest from '../../data/serviceImagesManifest.json';
import Testimonials from '../sections/Testimonials';

export default function ServicePageTemplate({ service, onOpenQuoteModal }) {
  if (!service) return null;

  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const manifestData = serviceImagesManifest[service.slug] || serviceImagesManifest[service.id] || {};
  const serviceImages = (manifestData.images && manifestData.images.length > 0)
    ? manifestData.images
    : [{ url: service.image, thumbUrl: service.image, alt: `${service.title} in Bangalore`, index: 1 }];

  const currentDisplayImg = serviceImages[activeImgIdx] || serviceImages[0];

  const otherServices = servicesData.filter(s => s.slug !== service.slug).slice(0, 3);
  const popularLocations = locationsData.slice(0, 12);

  const substrates = [
    { name: "RCC Concrete Beams / Slabs", status: "Optimal", method: "6mm Hammer drill + 304/316 SS expansion anchor hooks with weatherproof silicone seal." },
    { name: "Solid Brick / Masonry", status: "Approved", method: "High-grade nylon wall plugs with continuous stainless perimeter guide wire lacing." },
    { name: "Structural Steel / MS Railings", status: "Approved", method: "Non-corrosive stainless steel clamps or welded eyelet fasteners with anti-rust primer." },
    { name: "Polished Wood / Banisters", status: "Approved", method: "Non-invasive high-tensile nylon binding straps or concealed rubberized bracket clamps." },
    { name: "Glass Balustrade Perimeter", status: "Specialized", method: "Anchored strictly into surrounding concrete frame; zero drilling into cosmetic glass panels." }
  ];

  const standardSOP = [
    "Step 1: Physical on-site laser measurement and hazard identification.",
    "Step 2: Structural substrate check and marking of 1-foot anchor intervals.",
    "Step 3: Precision drilling with dust extraction and silicone-sealed anchor insertion.",
    "Step 4: Perimeter steel wire rigging and tensioning to prevent sag over spans.",
    "Step 5: Custom mesh tailoring, pipe penetration sealing, and final pull-load audit."
  ];

  const handleOpenLightbox = (index) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title={`${service.title} in Bangalore | Technical Specs & Free Survey`}
        description={`${service.shortDescription} Genuine Garware materials, up to 10 years warranty, same-day doorstep measurement across Bangalore. Call ${businessInfo.phone}.`}
        canonicalUrl={`/services/${service.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "category": service.category || "Safety Netting",
          "provider": {
            "@type": "LocalBusiness",
            "name": businessInfo.name,
            "telephone": businessInfo.phone,
            "image": `https://www.ramanasafetynets.com${currentDisplayImg.url}`,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": businessInfo.address.street,
              "addressLocality": businessInfo.address.city,
              "addressRegion": businessInfo.address.state,
              "postalCode": businessInfo.address.pincode,
              "addressCountry": "IN"
            }
          },
          "areaServed": "Bangalore",
          "description": service.shortDescription
        }}
      />

      {/* Hero Banner */}
      <section className="relative bg-white pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-slate-900 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive Image Gallery Hero (Left Desktop / Top Mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 order-1 space-y-3"
            >
              {/* Main Active Image with Zoom on Click */}
              <div
                onClick={() => handleOpenLightbox(activeImgIdx)}
                className="group relative w-full h-[300px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-soft-xl border border-slate-200 bg-slate-100 cursor-pointer"
              >
                <img
                  src={currentDisplayImg.url}
                  alt={currentDisplayImg.alt || `${service.title} installation in Bangalore`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Top-left Warranty Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 border border-white/80 shadow-soft-md flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-gold-600" />
                  <span>{service.warranty || "Garware Certified"}</span>
                </div>

                {/* Top-right Zoom Prompt */}
                <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-white border border-white/20 shadow-soft-md flex items-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 mr-1 text-gold-400" />
                  <span>Click to Zoom</span>
                </div>

                {/* Bottom-right Survey Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-slate-950 border border-white/80 text-xs font-semibold shadow-soft-md">
                  <span className="text-gold-600 font-bold block">100% Free Doorstep Survey</span>
                  <span className="text-[10px] text-slate-500">Same-Day Installation in Bangalore</span>
                </div>
              </div>

              {/* Thumbnails Row (if multiple images available) */}
              {serviceImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {serviceImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative flex-shrink-0 w-16 sm:w-20 h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImgIdx === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-600/30 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                      aria-label={`View photo angle ${idx + 1}`}
                    >
                      <img
                        src={img.thumbUrl || img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Content Second */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 order-2 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block text-xs font-bold text-gold-700 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  {service.category || "Garware Authentic Quality"}
                </span>
                {service.safetyClass && (
                  <span className="inline-block text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {service.safetyClass}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {service.title} in Bangalore
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDescription || service.shortDescription}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Free Doorstep Measurement</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Certified High-Rise Riggers</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 shadow-soft-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call Expert</span>
                </a>
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Ramana Safety Nets! I want a free survey for ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-soft-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-soft-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-gold-600" />
                  <span>Get Free Quote</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Classification & Compliance Notice */}
      <section className="py-8 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Safety Classification & Technical Boundary
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Intended Function:</strong> {service.safetyClass} • <strong>Personnel Fall-Arrest Status:</strong> {service.canMarketAsFallProtection}
                </p>
              </div>
            </div>

            {service.standards && (
              <div className="flex flex-wrap gap-1.5">
                {service.standards.map((std, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold">
                    {std}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Features & Technical Specifications */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Features List */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Engineered Advantages
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Why Choose Our {service.title}?
                </h2>
              </div>
              <div className="space-y-3">
                {service.features && service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs Card */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-md space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-950">Technical Specifications</h3>
                  <p className="text-xs text-slate-500 mt-1">Calibrated data sheet for {service.title}</p>
                </div>

                {service.specs && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.specs.material && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Material Base</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.material}</span>
                      </div>
                    )}
                    {service.specs.meshSize && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Mesh Aperture</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.meshSize}</span>
                      </div>
                    )}
                    {(service.specs.twineThickness || service.specs.cableThickness) && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Twine / Cable Diameter</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.twineThickness || service.specs.cableThickness}</span>
                      </div>
                    )}
                    {service.specs.breakingLoad && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Breaking Load Rating</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.breakingLoad}</span>
                      </div>
                    )}
                    {service.specs.colorOptions && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Color Options</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.colorOptions}</span>
                      </div>
                    )}
                    {service.specs.uvProtection && (
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">UV Stabilization</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{service.specs.uvProtection}</span>
                      </div>
                    )}
                  </div>
                )}

                {service.maintenance && (
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 uppercase flex items-center">
                      <Wrench className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      Maintenance & Care Protocol
                    </span>
                    <p className="text-xs text-slate-600"><strong>Routine Check:</strong> {service.maintenance.inspection}</p>
                    <p className="text-xs text-slate-600"><strong>Cleaning:</strong> {service.maintenance.cleaning}</p>
                    <p className="text-xs text-slate-600"><strong>Replacement Trigger:</strong> {service.maintenance.replaceTrigger}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md cursor-pointer"
                  >
                    Request Free Site Inspection for {service.title}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Real Project Installation Gallery Showcase */}
      {serviceImages.length > 0 && (
        <section className="py-16 bg-slate-50/70 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Verified Project Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Recent {service.title} Project Gallery in Bangalore
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  Actual on-site installation photographs showing anchor detailing, neat tensioning, and aesthetic high-rise containment.
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-600 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-soft-xs w-fit flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Showing <strong className="text-slate-950 font-bold">{serviceImages.length} High-Res Photos</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {serviceImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft-xl transition-all cursor-pointer"
                >
                  <img
                    src={img.thumbUrl || img.url}
                    alt={img.alt || `${service.title} Bangalore installation angle ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md inline-block w-fit mb-1">
                      View {idx + 1}
                    </span>
                    <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                      {img.alt}
                    </p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft-sm">
                    <Eye className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Substrate & Fixing Compatibility Grid */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
              Structural Substrate Compatibility
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Anchoring & Mounting Methods</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We engineer substrate-specific anchors to prevent tile cracking, plaster spalling, or loose fixings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {substrates.map((sub, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2.5 shadow-soft-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-950">{sub.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{sub.method}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Installation SOP */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              Quality Assurance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">5-Step Installation Method Statement</h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {standardSOP.map((stepText, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center space-x-3.5">
                <span className="w-7 h-7 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{stepText}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
                Service Specific FAQs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Frequently Asked Questions on {service.title}
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-soft-sm">
                  <button
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-950 pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaqIdx === idx ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaqIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Serving Locations Bar */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-950">We Install {service.title} Across Bangalore</h3>
            <p className="text-xs text-slate-500">Same-day doorstep measurement available in all key zones</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {popularLocations.map(loc => (
              <Link
                key={loc.slug}
                to={`/location/${loc.slug}`}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:border-slate-300 transition-all shadow-soft-sm"
              >
                {loc.name}
              </Link>
            ))}
            <Link
              to="/locations"
              className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all"
            >
              View All 40+ Locations →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Other Safety Solutions You May Need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map(item => (
              <div key={item.slug} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col group">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.shortDescription}</p>
                  </div>
                  <Link
                    to={`/services/${item.slug}`}
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

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Fullscreen Lightbox Modal for Service Photos */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={serviceImages.map((img, idx) => ({
          image: img.url,
          title: `${service.title} - Installation Photo ${idx + 1}`,
          category: service.category || "Safety Solutions",
          alt: img.alt
        }))}
        currentIndex={lightboxIdx}
        onNavigate={(newIdx) => setLightboxIdx(newIdx)}
      />
    </>
  );
}
