import React from 'react';
import { useParams, useOutletContext, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Tag } from 'lucide-react';
import SEO from '../components/common/SEO';
import { locationsData, findLocationBySlug, priorityTargetLocations, getKeywordsForLocation } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import FAQSection from '../components/sections/FAQSection';

export default function LocationDetailPage() {
  const { locationSlug } = useParams();
  const { onOpenQuoteModal } = useOutletContext();

  const location = findLocationBySlug(locationSlug);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const locationKeywords = getKeywordsForLocation(location.name);
  const priorityBelt = priorityTargetLocations.filter((l) => l.slug !== location.slug);

  const locationFaqs = [
    {
      question: `How fast can Raghavi Enterprises install safety nets in ${location.name}?`,
      answer: `Our local technician team in ${location.name} (${location.city}) provides same-day free doorstep measurement and completes most residential balcony safety net, pigeon net, and invisible grill installations within 2 to 4 hours.`
    },
    {
      question: `What types of safety nets and invisible grills are available in ${location.name}?`,
      answer: `In ${location.name}, we install all 19+ safety solutions including Balcony Safety Nets, Pigeon & Anti-Bird Nets, Heavy-Duty Monkey Protection Nets, Modern Invisible Grills, Children & Toddler Safety Nets, Cricket Practice Nets, Box Cricket Turf Enclosures, Coconut Tree Catch Nets, Mosquito Mesh Doors, Duct Area Nets, and IS 11057 Construction Safety Nets.`
    },
    {
      question: `Which areas and landmarks in ${location.name} do you cover?`,
      answer: `We cover every ward, layout, township, and industrial zone across ${location.name}${location.landmarks ? `, including ${location.landmarks}` : ''} and all surrounding villages and towns.`
    },
    {
      question: `Do you provide a warranty on safety nets installed in ${location.name}?`,
      answer: `Yes! Every installation in ${location.name} uses original UV-stabilized Garware HDPE/Nylon nets and rust-proof rust-proof stainless steel anchor hooks backed by an official 5 to 10-year written warranty.`
    }
  ];

  return (
    <>
      <SEO
        title={`#1 Safety Nets in ${location.name} | Balcony, Pigeon, Monkey Nets & Invisible Grills`}
        description={`Best Safety Net Installation in ${location.name} (${location.city}) by Raghavi Enterprises. Balcony safety nets, pigeon nets, monkey protection nets, Invisible Grills, cricket practice nets & mosquito mesh in ${location.name}. Free same-day survey: ${businessInfo.phone}.`}
        keywords={locationKeywords.join(', ')}
        canonicalUrl={`/location/${location.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HomeAndConstructionBusiness",
              "@id": `https://www.raghavisafetynets.com/location/${location.slug}#business`,
              "name": `Raghavi Enterprises - Safety Nets in ${location.name}`,
              "url": `https://www.raghavisafetynets.com/location/${location.slug}`,
              "telephone": businessInfo.phone,
              "email": businessInfo.email,
              "image": "https://www.raghavisafetynets.com/assets/raghavi-logo.png",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": location.landmarks || location.name,
                "addressLocality": location.name,
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": location.lat,
                "longitude": location.lng
              },
              "areaServed": {
                "@type": "City",
                "name": location.name
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "420",
                "bestRating": "5"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": locationFaqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer
                }
              }))
            }
          ]
        }}
      />

      {/* Hero Header */}
      <section className="py-10 lg:py-14 bg-gradient-to-b from-[#f0f7ff] to-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 font-medium">
            <Link to="/" className="hover:text-[#00274c] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-[#00274c] transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-[#00274c] font-bold">{location.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#21893c]/10 text-[#21893c] rounded-full border border-[#21893c]/25 text-xs font-extrabold">
                <MapPin className="w-3.5 h-3.5" />
                <span>#1 Priority Service Hub in {location.name} ({location.city})</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00274c] tracking-tight leading-tight">
                Best Safety Nets & Invisible Grills in <span className="text-[#21893c]">{location.name}</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {location.description}
              </p>

              {location.landmarks && (
                <div className="p-4 rounded-2xl bg-white border border-blue-200/80 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#054a91] block mb-1">
                    Local Areas & Landmarks Covered in {location.name}:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {location.landmarks}
                  </p>
                </div>
              )}

              {/* Service Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#00274c] bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] flex-shrink-0" />
                  <span>Same-Day Visit in {location.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#00274c] bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] flex-shrink-0" />
                  <span>Original Garware ISO Nets</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#00274c] bg-white p-3 rounded-xl border border-blue-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#21893c] flex-shrink-0" />
                  <span>Up to 10 Yrs Warranty</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-[#00274c] hover:bg-[#054a91] shadow-soft-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#4ade80]" />
                  <span>Call {location.name} Team</span>
                </a>
                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Raghavi Enterprises! I need safety net installation in ${location.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-white bg-[#21893c] hover:bg-[#196d2f] shadow-soft-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-[#00274c] bg-white hover:bg-blue-50 border-2 border-[#054a91]/20 shadow-soft-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#054a91]" />
                  <span>Get Free Quote</span>
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#054a91]/15 shadow-soft-xl space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#21893c] bg-[#21893c]/10 px-2.5 py-0.5 rounded-md mb-1.5">
                    100% Free Doorstep Inspection
                  </span>
                  <h2 className="text-xl font-extrabold text-[#00274c]">Book Free Survey in {location.name}</h2>
                  <p className="text-xs text-slate-500 mt-1">Our local {location.name} technician brings physical Garware net & Invisible Grill samples to your doorstep</p>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#21893c] mt-0.5 flex-shrink-0" />
                    <span>Exact laser measurement for balconies, ducts & windows in {location.name}</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#21893c] mt-0.5 flex-shrink-0" />
                    <span>Inspect 1.5mm to 3.5mm UV-stabilized mesh & rust-proof stainless steel hardware</span>
                  </li>
                  <li className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#21893c] mt-0.5 flex-shrink-0" />
                    <span>Transparent per sq.ft rate with official 10-year warranty card</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3.5 bg-[#00274c] text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-[#054a91] transition-all shadow-soft-md cursor-pointer"
                >
                  Schedule Free Site Survey in {location.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 19 Services Available in this Location */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#054a91] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
              Complete Service Catalog in {location.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c] mb-3">
              All {servicesData.length} Safety Net & Invisible Grill Services in {location.name}
            </h2>
            <p className="text-sm text-slate-600">
              No matter what safety net or bird protection service you search for in {location.name}, Raghavi Enterprises delivers same-day installation with authentic Garware materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft-sm hover:shadow-soft-lg hover:border-[#054a91]/30 transition-all flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={`${service.title} in ${location.name} - Raghavi Enterprises`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#00274c] shadow-xs">
                    {service.warranty}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#00274c] mb-1 group-hover:text-[#21893c] transition-colors">
                      {service.title} in {location.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-xs font-bold text-[#054a91] hover:text-[#21893c] transition-colors"
                    >
                      <span>Specs & Photos</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <button
                      onClick={onOpenQuoteModal}
                      className="text-[11px] font-bold text-white bg-[#21893c] hover:bg-[#196d2f] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Book in {location.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-Specific FAQs */}
      <section className="py-14 bg-[#f8fbff] border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00274c]">
              Frequently Asked Questions — Safety Nets in {location.name}
            </h2>
          </div>
          <div className="space-y-4">
            {locationFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 border border-blue-100 shadow-xs space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#00274c]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Search Keywords & SEO Tags for this Location */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-[#21893c]" />
            <h2 className="text-base sm:text-lg font-extrabold text-[#00274c]">
              Popular Safety Net Searches in {location.name} ({location.city})
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {locationKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Regional Network Cross-Links */}
      <section className="py-12 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-extrabold text-[#00274c]">
              Our Priority Service Network Across Hosapete, Vijayanagara & Karnataka
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click any city or town below to view local safety net installation services
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {priorityBelt.map((loc) => (
              <Link
                key={loc.slug}
                to={`/location/${loc.slug}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  loc.region === 'Hosapete Priority Zone'
                    ? 'bg-[#00274c] text-white hover:bg-[#21893c]'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-[#00274c] hover:border-blue-300'
                }`}
              >
                Safety Nets in {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessTimeline />

      {/* FAQ */}
      <FAQSection limit={4} />
    </>
  );
}
