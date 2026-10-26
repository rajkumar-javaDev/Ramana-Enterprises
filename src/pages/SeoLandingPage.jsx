import React, { useState } from 'react';
import { useParams, useOutletContext, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  MapPin,
  Wrench,
  ChevronDown,
  Star,
  ZoomIn,
  Check
} from 'lucide-react';
import SEO from '../components/common/SEO';
import LightboxModal from '../components/common/LightboxModal';
import { businessInfo } from '../data/businessInfo';
import {
  resolveSeoPageBySlug,
  generateUniqueFaqsForSeoPage,
  prioritySeoUrlGroups
} from '../data/seoPagesData';

export default function SeoLandingPage({ overrideSlug }) {
  const { seoSlug } = useParams();
  const { onOpenQuoteModal } = useOutletContext();
  const activeSlug = overrideSlug || seoSlug;

  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const pageData = resolveSeoPageBySlug(activeSlug);

  if (!pageData) {
    return <Navigate to="/services" replace />;
  }

  const {
    slug,
    title,
    metaDescription,
    h1,
    breadcrumbCategory,
    breadcrumbLabel,
    baseService,
    variant,
    location,
    locationDisplay = 'Hospet',
    images,
    reviews,
    canonicalUrl,
    comparisonTable,
    verdict,
    summary
  } = pageData;

  const faqs = generateUniqueFaqsForSeoPage(pageData);
  const serviceName = variant ? variant.displayName : breadcrumbLabel;
  const singularName = variant ? variant.singularName : breadcrumbLabel;
  const landmarks =
    location?.landmarks ||
    'College Road, Station Road, Patel Nagar, Basaveshwara Badavane, Amaravathi, TB Dam Road, Chittawadagi, Ranipet, MJ Nagar, Nehrunagar, and Hampi Road';

  const allLightboxImages = [images.hero, ...images.gallery];

  const handleOpenLightbox = (index) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    const text = `Hi Raghavi Enterprises! Please call me back regarding ${h1}. Name: ${callbackName || 'Customer'}, Phone: ${callbackPhone}`;
    window.open(`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setCallbackSent(true);
  };

  const siteUrl = 'https://www.raghavisafetynets.com';
  const fullPageUrl = `${siteUrl}${canonicalUrl}`;

  // Comprehensive Schema.org @graph (LocalBusiness, Organization, WebSite, Service, FAQPage, BreadcrumbList, ImageObject)
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: businessInfo.name,
        alternateName: 'Raghavi Safety Nets',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/assets/raghavi-logo.png`
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: businessInfo.phone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Kannada', 'Hindi', 'Telugu']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${businessInfo.name} - Safety Nets & Invisible Grills in Hospet`,
        publisher: { '@id': `${siteUrl}/#organization` }
      },
      {
        '@type': 'ImageObject',
        '@id': `${fullPageUrl}#primaryimage`,
        url: `${siteUrl}${images.hero.url}`,
        contentUrl: `${siteUrl}${images.hero.url}`,
        caption: images.hero.alt,
        name: images.hero.title,
        representativeOfPage: true
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullPageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${siteUrl}/services`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: breadcrumbCategory,
            item: `${siteUrl}/services/${baseService.slug}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: breadcrumbLabel,
            item: fullPageUrl
          }
        ]
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${fullPageUrl}#localbusiness`,
        name: `${businessInfo.name} - ${serviceName} in ${locationDisplay}`,
        image: `${siteUrl}${images.hero.url}`,
        url: fullPageUrl,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: landmarks,
          addressLocality: locationDisplay,
          addressRegion: 'Karnataka',
          postalCode: businessInfo.address.pincode,
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location?.lat || businessInfo.address.latitude,
          longitude: location?.lng || businessInfo.address.longitude
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '07:00',
          closes: '21:00'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '485',
          bestRating: '5'
        },
        review: reviews.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
          reviewBody: r.text
        }))
      },
      {
        '@type': 'Service',
        '@id': `${fullPageUrl}#service`,
        name: h1,
        serviceType: serviceName,
        provider: { '@id': `${fullPageUrl}#localbusiness` },
        areaServed: [
          'Hospet',
          'Hosapete',
          'Hampi',
          'Munirabad',
          'Kamalapura',
          'Sandur',
          'Toranagallu',
          'Mariyammanahalli',
          'Gangavathi',
          'Koppal',
          'Kampli',
          'Kudligi',
          'Ballari'
        ].map((city) => ({ '@type': 'City', name: city })),
        description: metaDescription,
        image: `${siteUrl}${images.hero.url}`
      },
      {
        '@type': 'FAQPage',
        '@id': `${fullPageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title={title}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        image={images.hero.url}
        schema={pageSchema}
      />

      {/* 1. HERO & BREADCRUMB NAVIGATION */}
      <section className="relative bg-gradient-to-b from-[#f4f9ff] to-white pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation (Home > Services > Service > Location) */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6 font-semibold">
            <Link to="/" className="hover:text-[#00274c] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[#00274c] transition-colors">Services</Link>
            <span>/</span>
            <Link to={`/services/${baseService.slug}`} className="hover:text-[#00274c] transition-colors">
              {breadcrumbCategory}
            </Link>
            <span>/</span>
            <span className="text-[#00274c] font-extrabold">{breadcrumbLabel}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Image with Image SEO (Filename, Alt, Title, WebP) */}
            <div className="lg:col-span-6 order-1">
              <div
                onClick={() => handleOpenLightbox(0)}
                className="group relative w-full h-[300px] sm:h-[390px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 cursor-pointer"
              >
                <img
                  src={images.hero.url}
                  alt={images.hero.alt}
                  title={images.hero.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#00274c] border border-white/80 shadow-md flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-[#21893c]" />
                  <span>Garware UV Certified • 5–10 Yr Warranty</span>
                </div>
                <div className="absolute top-4 right-4 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-white flex items-center">
                  <ZoomIn className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  <span>Click to Zoom</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl text-slate-900 border border-slate-200 text-xs shadow-md">
                  <span className="text-[#21893c] font-extrabold block">Same-Day Free Doorstep Survey in {locationDisplay}</span>
                  <span className="text-[11px] text-slate-600">Starting at {variant?.priceRange || '₹14 – ₹32 per sq.ft.'} • Zero Hidden Costs</span>
                </div>
              </div>
            </div>

            {/* Single H1 Heading & Primary CTAs */}
            <div className="lg:col-span-6 order-2 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#21893c] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Priority Hub: {locationDisplay} & Vijayanagara Belt</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>4.9/5 Rated (1,250+ Local Reviews)</span>
                </span>
              </div>

              {/* ONLY ONE H1 ON THE PAGE */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00274c] tracking-tight leading-tight">
                {h1}
              </h1>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {summary ||
                  `Looking for trusted, long-lasting ${serviceName} in ${locationDisplay}? Raghavi Enterprises provides ${variant?.focusAngle?.toLowerCase() || 'professional safety net and invisible grill solutions'}, ${variant?.uniqueHook || 'installed by certified technicians with rust-proof stainless steel hardware'}. We serve all residential layouts, apartments, resorts, and commercial buildings across ${locationDisplay}, Hampi, Munirabad, Kamalapura, Sandur, Toranagallu, Gangavathi, Koppal, Kampli, and Ballari.`}
              </p>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] shrink-0" />
                  <span>Free Laser Site Measurement</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] shrink-0" />
                  <span>2-Hour Same-Day Fitting</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] shrink-0" />
                  <span>Rust-Proof SS Hardware</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] shrink-0" />
                  <span>5–10 Years Written Warranty</span>
                </div>
              </div>

              {/* 4 Conversion CTAs: Call Now, WhatsApp, Get Free Quote, Request Callback */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center justify-center space-x-2 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-[#00274c] hover:bg-[#001d38] shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Raghavi Enterprises! I need a free doorstep survey and quote for ${h1}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-[#21893c] hover:bg-[#196d2f] shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="flex items-center justify-center space-x-2 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-[#00274c] bg-amber-400 hover:bg-amber-300 shadow-md transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Free Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE SERVICE & IN-DEPTH LOCAL EXPLANATION (H2 & H3) */}
      <section className="py-14 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
                About {serviceName} in {locationDisplay} – Complete Technical & Local Guide
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Property owners in <strong>{locationDisplay}</strong> face a distinct combination of architectural and environmental demands. From high-temperature summer UV exposure exceeding 40°C across Vijayanagara and Ballari districts to seasonal monsoon gusts near the Tungabhadra reservoir belt, ordinary low-grade plastic ropes degrade, sag, and snap within a single season. At <strong>Raghavi Enterprises</strong>, our <strong>{serviceName}</strong> are engineered specifically for {locationDisplay}&apos;s residential apartments, independent duplex houses, heritage homestays, commercial complexes, and industrial townships.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Whether your property is located near <em>{landmarks}</em>, or in neighboring hubs like <strong>Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Mariyammanahalli, Gangavathi, Koppal, Kampli, Kudligi, or Ballari</strong>, our field technicians perform a precision laser survey before recommending the exact twine gauge, mesh aperture, or stainless cable diameter required for your span.
              </p>

              <h3 className="text-xl font-bold text-[#00274c] pt-2">
                How Our {serviceName} Solve Real Problems for {locationDisplay} Families
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Unprotected balconies, utility shafts, and open windows create three immediate risks: accidental fall hazards for curious toddlers and pets, persistent feral pigeon nesting behind AC outdoor condensers, and aggressive monkey intrusions near green belts and canal corridors. Our {serviceName.toLowerCase()} provide a permanent, non-intrusive physical barrier ({variant?.meshSpec || 'high-tenacity UV-stabilized Garware HDPE & stainless cable mesh'}) that preserves 97% of your natural daylight and cross-ventilation while delivering <strong>{variant?.loadSpec || 'up to 180–300 kg impact containment'}</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-base font-extrabold text-[#00274c]">100% Climate-Calibrated Durability</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Extruded with Ciba UV-stabilizer masterbatch and hydrophobic co-polymers so the mesh never turns brittle in {locationDisplay}&apos;s dry summer heat or absorbs water during heavy monsoon downpours.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-base font-extrabold text-[#00274c]">Damage-Free Structural Anchoring</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We drill strictly into load-bearing RCC concrete lintels or mortar joints—never through fragile vitrified floor tiles or waterproofing membranes—and seal every fastener with weatherproof silicone.
                  </p>
                </div>
              </div>
            </div>

            {/* Instant Callback Request Card (Requirement #13 & #25) */}
            <div className="lg:col-span-4 bg-[#00274c] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                  Instant Doorstep Dispatch
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Request a Free Callback in {locationDisplay}
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Enter your phone number below. Our {locationDisplay} supervisor will call you within 10 minutes to schedule your free site measurement.
                </p>
              </div>

              {callbackSent ? (
                <div className="p-4 rounded-2xl bg-emerald-600/30 border border-emerald-400 text-xs font-bold text-emerald-100 space-y-1">
                  <p>Thank you! Opening WhatsApp to confirm your priority callback in {locationDisplay}.</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-blue-100 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g., Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-100 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="+91 70190 66339"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#21893c] hover:bg-[#1b7432] text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    Request Immediate Callback →
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-white/15 space-y-2 text-xs text-blue-100">
                <div className="flex items-center justify-between">
                  <span>Direct Helpline:</span>
                  <a href={`tel:${businessInfo.phone}`} className="font-extrabold text-amber-400 hover:underline">
                    {businessInfo.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Working Hours:</span>
                  <span className="font-bold text-white">{businessInfo.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARISON TABLE OR PRICING & MATERIAL SPECIFICATION MATRIX */}
      <section className="py-14 lg:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {comparisonTable ? (
            <>
              <div className="max-w-3xl">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Side-by-Side Technical Matrix
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c] mt-2">
                  {breadcrumbLabel}: Detailed Specification & Cost Comparison
                </h2>
              </div>
              <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#00274c] text-white text-xs sm:text-sm">
                      {comparisonTable.headers.map((h, idx) => (
                        <th key={idx} className="p-4 sm:p-5 font-extrabold border-b border-slate-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                    {comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50">
                        <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/60">{row[0]}</td>
                        <td className="p-4 sm:p-5 font-semibold text-emerald-950">{row[1]}</td>
                        <td className="p-4 sm:p-5 text-slate-600">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {verdict && (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 leading-relaxed">
                  <strong className="font-extrabold text-[#21893c] block mb-1">Expert Engineering Verdict for Hospet Homes:</strong>
                  {verdict}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="max-w-3xl">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Transparent Pricing & Materials
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c] mt-2">
                  {serviceName} Price in {locationDisplay} & Material Specifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  All rates below include original UV-stabilized netting/cables, rust-proof stainless steel perimeter hardware, and certified installation across {locationDisplay}.
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#00274c] text-white text-xs sm:text-sm">
                      <th className="p-4 sm:p-5 font-extrabold">Grade / Specification Variant</th>
                      <th className="p-4 sm:p-5 font-extrabold">Mesh / Twine / Cable Spec</th>
                      <th className="p-4 sm:p-5 font-extrabold">Breaking Load & Hardware</th>
                      <th className="p-4 sm:p-5 font-extrabold">Price in {locationDisplay}</th>
                      <th className="p-4 sm:p-5 font-extrabold">Warranty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Standard Residential Grade ({serviceName})</td>
                      <td className="p-4 sm:p-5">{variant?.meshSpec || '1.5mm–2.0mm Garware UV HDPE (25mm–30mm mesh)'}</td>
                      <td className="p-4 sm:p-5">50–120 kg • Stainless Hooks + 2mm Border Wire</td>
                      <td className="p-4 sm:p-5 font-extrabold text-[#21893c]">{variant?.priceRange || '₹15 – ₹24 / sq.ft.'}</td>
                      <td className="p-4 sm:p-5 font-semibold">5 Years Written</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-emerald-50/30">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Heavy-Duty High-Rise / Child & Monkey Grade</td>
                      <td className="p-4 sm:p-5">2.5mm–3.5mm Braided Co-Polymer HDPE / Nylon</td>
                      <td className="p-4 sm:p-5">{variant?.loadSpec || '180–300 kg'} • 6mm Expansion Bolts + Turnbuckles</td>
                      <td className="p-4 sm:p-5 font-extrabold text-[#21893c]">₹22 – ₹45 / sq.ft.</td>
                      <td className="p-4 sm:p-5 font-semibold">8–10 Years Written</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Architectural Invisible Grill / Industrial Spec</td>
                      <td className="p-4 sm:p-5">2.0mm–3.0mm Nylon-Coated Marine Stainless Cable / IS 11057</td>
                      <td className="p-4 sm:p-5">300+ kg Tensile Load • Powder-Coated Track Profiles</td>
                      <td className="p-4 sm:p-5 font-extrabold text-[#21893c]">₹135 – ₹220 / sq.ft.</td>
                      <td className="p-4 sm:p-5 font-semibold">10–15 Years Written</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. BENEFITS, FEATURES & APPLICATIONS (H2 & H3) */}
      <section className="py-14 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Key Benefits */}
            <div className="space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Homeowner Advantages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
                Key Benefits of Installing {serviceName} in {locationDisplay}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every installation is tailored to your balcony or building geometry, delivering immediate safety and hygiene improvements without altering your facade appearance:
              </p>
              <div className="space-y-3">
                {(baseService.features || [
                  '100% Protection against accidental falls for children, toddlers, and household pets',
                  'Complete exclusion of feral pigeons, droppings, nesting debris, and bird mites',
                  'UV-stabilized Virgin Garware polymer chemistry rated for 42°C+ summer heat',
                  'Rust-proof stainless steel eye-bolts, turnbuckles, and perimeter wire framing',
                  'Zero obstruction to natural sunlight, panoramic views, and cross-ventilation breeze',
                  'Fast 2-to-3 hour dust-free installation with 5 to 10 years official warranty'
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-5 h-5 text-[#21893c] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications & Where We Install */}
            <div className="space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00274c] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Residential & Commercial Use Cases
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
                Applications of {serviceName} Across {locationDisplay}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our rigging teams customize mounting brackets for every structural substrate in {locationDisplay} ({variant?.applicationFocus || 'balconies, windows, ducts, and industrial sheds'}):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[#00274c]">Apartment Balconies & Sit-Outs</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Floor-to-ceiling or parapet-to-ceiling enclosures in multi-storey flats across {locationDisplay}, keeping children safe and pigeons out.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[#00274c]">Independent Houses & Villas</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Heavy-duty terrace, verandah, and internal duplex staircase protection against monkeys, birds, and toddler fall hazards.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[#00274c]">Utility Ducts & AC Ledges</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sealing dark plumbing shafts, bathroom exhaust wells, and external split-AC compressor ledges where pigeons habitually nest.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <h3 className="text-sm font-extrabold text-[#00274c]">Hotels, Hospitals & Warehouses</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-span hygiene netting and fall-arrest barriers for Hampi resorts, APMC grain godowns, schools, and Toranagallu industrial units.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORIGINAL INSTALLATION IMAGES GALLERY (Zero Same-Page Duplicates + Full Image SEO) */}
      {images.gallery.length > 0 && (
        <section className="py-14 lg:py-16 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Original On-Site Photos
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c] mt-2">
                  Recent {serviceName} Installations in {locationDisplay} & Nearby Areas
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Authentic project photographs showing our stainless steel anchor spacing, perimeter wire tensioning, and clean finish.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs w-fit">
                {images.gallery.length} Verified Installation Angles
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {images.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenLightbox(idx + 1)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    title={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white text-[11px] font-semibold leading-snug">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. STEP-BY-STEP REAL INSTALLATION PROCESS & MAINTENANCE GUIDE */}
      <section className="py-14 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 5-Step Installation Process */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00274c] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Standard Operating Procedure
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
                Our 5-Step {singularName} Installation Process in {locationDisplay}
              </h2>
              <div className="space-y-3">
                {[
                  {
                    step: 'Step 1: Free Doorstep Laser Survey & Substrate Audit',
                    desc: `Our ${locationDisplay} technician inspects your concrete lintels, parapet walls, or railing frames, measures exact square footage, and shows physical Garware net & Invisible Grill cable samples.`
                  },
                  {
                    step: 'Step 2: 12-Inch Precision Drilling & Silicone Sealing',
                    desc: 'Using depth-controlled 6mm–8mm masonry bits, we drill at 1-foot intervals along the structural perimeter, insert virgin nylon expansion plugs, and seal every point against rainwater seepage.'
                  },
                  {
                    step: 'Step 3: Rust-Proof Stainless Steel Wire Frame Rigging',
                    desc: 'We thread a continuous high-tensile stainless steel perimeter guide cable through the forged eye-bolts and tension it using barrel turnbuckles for a rigid outer boundary.'
                  },
                  {
                    step: 'Step 4: Custom Tailoring & Zero-Gap Perimeter Lacing',
                    desc: `The ${serviceName.toLowerCase()} are stretched evenly across the span, custom-cut around AC copper pipes and drainage lines, and double-knotted to the steel border cable.`
                  },
                  {
                    step: 'Step 5: Pull-Load Safety Audit & Warranty Handover',
                    desc: 'We perform a multi-point pull-tension check to verify zero edge gaps, vacuum any drilling dust, and issue your official 5 to 10-year written warranty card.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3.5">
                    <span className="w-7 h-7 rounded-xl bg-[#00274c] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{item.step}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips, Maintenance Guide & Recent Installations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h2 className="text-xl font-extrabold text-[#00274c] flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#21893c]" />
                  <span>Maintenance Guide & Safety Tips</span>
                </h2>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h3 className="font-bold text-slate-900">1. Routine 6-Month Water Rinse</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Because our HDPE nets and nylon-jacketed steel cables are hydrophobic, simply spray them with normal tap water during monsoon or post-summer to remove airborne dust.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">2. Avoid Sharp Blade Contact</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      When moving furniture, ladders, or split-AC outdoor units on the balcony, avoid pressing sharp sheet-metal edges or box cutters against the tensioned strands.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">3. Annual Anchor & Turnbuckle Check</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Inspect perimeter eye-bolts after major exterior building painting or plumbing work. If technicians ever unhook a section for AC servicing, call us for a quick re-tensioning check.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#21893c]">
                  EEAT Verified Track Record
                </span>
                <h2 className="text-xl font-extrabold text-[#00274c]">
                  Why Choose Raghavi Enterprises in {locationDisplay}?
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#21893c] shrink-0" />
                    <span><strong>12+ Years Experience</strong> & 15,000+ Completed Installations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#21893c] shrink-0" />
                    <span><strong>Original Garware Material</strong> with Batch UV Certification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#21893c] shrink-0" />
                    <span><strong>Same-Day Service</strong> in {locationDisplay}, Hampi, Koppal & Ballari</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#21893c] shrink-0" />
                    <span><strong>5 to 10 Years Written Warranty</strong> on Netting & Hardware</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GENUINE CUSTOMER REVIEWS & GOOGLE BUSINESS PROFILE INTEGRATION */}
      <section className="py-14 lg:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Verified Local Testimonials
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c] mt-2">
                Customer Reviews for {serviceName} in {locationDisplay} & Nearby Towns
              </h2>
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 font-extrabold">4.9 / 5.0 Google Rating</strong>
                <span className="text-slate-500 block">Raghavi Enterprises • {businessInfo.workingHours}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Verified Installation
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-extrabold text-slate-900">{rev.name}</p>
                  <p className="text-[11px] text-slate-500">{rev.role} • {rev.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 10 UNIQUE FAQS SECTION (Requirement #11) */}
      <section className="py-14 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              10 Page-Specific FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
              Frequently Asked Questions About {h1}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-extrabold text-[#00274c] pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFaqIdx === idx ? 'rotate-180 text-[#21893c]' : ''
                    }`}
                  />
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
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
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

      {/* 9. INTERNAL LINKING HUB: SERVICE AREAS, NEAR ME, PRICE, COMPARISONS & GUIDES */}
      <section className="py-14 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00274c] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Complete Local SEO & Service Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
              Explore Related Services, Nearby Towns & Buying Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide same-day doorstep installation across Hospet, Hampi, Munirabad, Kamalapura, Sandur, Toranagallu, Gangavathi, Koppal, Kampli, Kudligi, and Ballari.
            </p>
          </div>

          {/* Priority Hospet Services Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00274c]">
              Main Safety Net & Invisible Grill Services in Hospet
            </h3>
            <div className="flex flex-wrap gap-2">
              {prioritySeoUrlGroups.mainHospetServices.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    item.slug === slug
                      ? 'bg-[#21893c] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-[#00274c] hover:text-[#00274c]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Nearby Locations Around Hosapete Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#00274c]">
              Nearby Service Areas Around Hosapete (Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Koppal, Ballari)
            </h3>
            <div className="flex flex-wrap gap-2">
              {prioritySeoUrlGroups.nearbyLocationServicePages.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    item.slug === slug
                      ? 'bg-[#21893c] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-[#21893c] hover:text-[#21893c]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Near Me, Price, Comparison & Informational Guides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-extrabold text-[#00274c]">&ldquo;Near Me&rdquo; Quick Dispatch Pages</h3>
              <div className="flex flex-wrap gap-1.5">
                {prioritySeoUrlGroups.nearMeHospetPages.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}`}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#21893c] hover:border-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-extrabold text-[#00274c]">Price Guides & Material Comparisons</h3>
              <div className="flex flex-wrap gap-1.5">
                {[...prioritySeoUrlGroups.highSearchIntentPages, ...prioritySeoUrlGroups.comparisonPages].map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}`}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#00274c] hover:border-blue-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-extrabold text-[#00274c]">Expert Homeowner & Bird Safety Guides</h3>
              <div className="flex flex-wrap gap-1.5">
                {prioritySeoUrlGroups.informationalPages.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}`}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#21893c] hover:border-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={allLightboxImages.map((img, idx) => ({
          image: img.url,
          title: img.title || `${serviceName} - Photo ${idx + 1}`,
          category: serviceName,
          alt: img.alt
        }))}
        currentIndex={lightboxIdx}
        onNavigate={(newIdx) => setLightboxIdx(newIdx)}
      />
    </>
  );
}
