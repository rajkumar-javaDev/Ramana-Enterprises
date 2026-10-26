import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { MapPin, ArrowRight, Phone, ShieldCheck, Star } from 'lucide-react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import GallerySection from '../components/sections/GallerySection';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Testimonials from '../components/sections/Testimonials';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';
import MaterialSpecs from '../components/sections/MaterialSpecs';
import { priorityTargetLocations, coreServiceKeywords } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { businessInfo } from '../data/businessInfo';
import { prioritySeoUrlGroups } from '../data/seoPagesData';

export default function HomePage() {
  const { onOpenQuoteModal } = useOutletContext();
  const hospetPriorityZone = priorityTargetLocations.filter((l) => l.region === 'Hosapete Priority Zone');
  const otherKarnatakaHubs = priorityTargetLocations.filter((l) => l.region !== 'Hosapete Priority Zone');

  return (
    <>
      <SEO
        title="#1 Safety Nets in Hosapete (Hospet), Ballari, Koppal, Hubballi, Bengaluru & Karnataka"
        description={`Raghavi Enterprises (raghavisafetynets.com) - #1 Safety Net & Invisible Grill Installation in Hosapete (Hospet), Hampi, Kamalapura, Munirabad, Sandur, Toranagallu, Mariyammanahalli, Gangavathi, Koppal, Ballari (Bellary), Hubballi, Dharwad, Bengaluru & all Karnataka. Balcony nets, pigeon nets, monkey nets, bird spikes, children safety nets, cricket nets. Call ${businessInfo.phone}.`}
        canonicalUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.raghavisafetynets.com/#website",
              "name": "Raghavi Enterprises - Raghavi Safety Nets",
              "url": "https://www.raghavisafetynets.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.raghavisafetynets.com/locations?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "HomeAndConstructionBusiness",
              "@id": "https://www.raghavisafetynets.com/#localbusiness",
              "name": "Raghavi Enterprises (Raghavi Safety Nets)",
              "url": "https://www.raghavisafetynets.com",
              "logo": "https://www.raghavisafetynets.com/assets/raghavi-logo.png",
              "image": "https://www.raghavisafetynets.com/assets/services/balcony-safety-nets/hero.webp",
              "telephone": businessInfo.phone,
              "email": businessInfo.email,
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": businessInfo.address.street,
                "addressLocality": "Hosapete (Hospet)",
                "addressRegion": "Karnataka",
                "postalCode": "583201",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 15.2689,
                "longitude": 76.3909
              },
              "areaServed": priorityTargetLocations.map((loc) => ({
                "@type": "City",
                "name": loc.name
              })),
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Safety Nets & Invisible Grill Installation Services",
                "itemListElement": servicesData.map((s) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": s.title,
                    "url": `https://www.raghavisafetynets.com/services/${s.slug}`
                  }
                }))
              }
            }
          ]
        }}
      />

      {/* Hero Carousel */}
      <HeroSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* Services Grid - Limited to 6 for homepage */}
      <ServicesGrid limit={6} onOpenQuoteModal={onOpenQuoteModal} />

      {/* Priority Regional Coverage Section: Hosapete & All 42 Target Cities */}
      <section className="py-14 bg-gradient-to-b from-[#f0f7ff] to-white border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-[#21893c] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Priority #1 Regional Coverage</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00274c] tracking-tight">
              #1 Safety Nets in <span className="text-[#21893c]">Hosapete (Hospet)</span> & Across Karnataka
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Express same-day free doorstep survey and installation across our main priority hub in <strong>Hosapete (Hospet)</strong>, surrounding Vijayanagara & Ballari-Koppal towns, and all major cities across Karnataka.
            </p>
          </div>

          {/* Tier 1: Hosapete & Nearby Priority Belt */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#054a91]/20 shadow-soft-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#21893c]" />
                <h3 className="text-base sm:text-lg font-extrabold text-[#00274c]">
                  Main Priority Hub: Hosapete (Hospet) & Nearby Towns (Same-Day 2-Hour Service)
                </h3>
              </div>
              <a
                href={`tel:${businessInfo.phone}`}
                className="inline-flex items-center text-xs font-extrabold text-[#21893c] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                <span>Call Hosapete Team: {businessInfo.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {hospetPriorityZone.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/location/${loc.slug}`}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f8fbff] hover:bg-[#00274c] text-[#00274c] hover:text-white border border-blue-200/80 transition-all group shadow-2xs"
                >
                  <span className="text-xs font-extrabold truncate">{loc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#21893c] group-hover:text-white shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tier 2: All Major Karnataka Cities */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-extrabold text-[#00274c]">
                All Karnataka Cities & District Hubs We Serve
              </h3>
              <Link
                to="/locations"
                className="text-xs font-extrabold text-[#054a91] hover:text-[#21893c] inline-flex items-center"
              >
                <span>View All 70+ Locations</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {otherKarnatakaHubs.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/location/${loc.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#21893c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all"
                >
                  Safety Nets in {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* High-Intent SEO Landing Pages Bar */}
          <div className="pt-2 space-y-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00274c] text-center mb-2.5">
                Priority Hospet Safety Net & Invisible Grill Services (Click for Local Specs & Price)
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {prioritySeoUrlGroups.mainHospetServices.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}`}
                    className="px-2.5 py-1 bg-white hover:bg-[#00274c] border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#21893c] text-center mb-2.5">
                Nearby Towns Around Hosapete, &ldquo;Near Me&rdquo; Searches, Price Guides & Comparisons
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  ...prioritySeoUrlGroups.nearbyLocationServicePages,
                  ...prioritySeoUrlGroups.nearMeHospetPages.slice(0, 7),
                  ...prioritySeoUrlGroups.highSearchIntentPages,
                  ...prioritySeoUrlGroups.comparisonPages,
                  ...prioritySeoUrlGroups.informationalPages
                ].map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${item.slug}`}
                    className="px-2.5 py-1 bg-white hover:bg-[#21893c] border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Material Specifications */}
      <MaterialSpecs />

      {/* Our Process */}
      <ProcessTimeline />

      {/* Gallery - Limited to 6 for homepage */}
      <GallerySection limit={6} />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ - Limited items for homepage */}
      <FAQSection limit={4} />

      {/* Contact Section */}
      <ContactSection onOpenQuoteModal={onOpenQuoteModal} />
    </>
  );
}
