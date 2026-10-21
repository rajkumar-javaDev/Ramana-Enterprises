import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, MapPin, CheckCircle2, Shield, HeartHandshake, Phone, FileText } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { businessInfo } from '../data/businessInfo';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import MaterialSpecs from '../components/sections/MaterialSpecs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Testimonials from '../components/sections/Testimonials';

export default function AboutPage() {
  const { onOpenQuoteModal } = useOutletContext();

  const milestones = [
    { value: '12+', label: 'Years Experience', desc: 'Continuous excellence in netting systems' },
    { value: '15,000+', label: 'Installations', desc: 'Villas, apartments, and commercial projects' },
    { value: '10 Years', label: 'Garware Warranty', desc: 'Backed by authentic certificate of guarantee' },
    { value: '40+', label: 'Locations Served', desc: 'Covering Bengaluru & major Karnataka hubs' },
  ];

  return (
    <>
      <SEO
        title="About Ramana Safety Nets | 12+ Years of Safety Engineering in Bangalore"
        description="Learn about Ramana Safety Nets - Bangalore's most trusted name in safety nets and invisible grills. Authentic Garware HDPE materials, 15,000+ completed projects."
        canonicalUrl="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": businessInfo.name,
          "url": "https://www.ramanasafetynets.com",
          "logo": "https://www.ramanasafetynets.com/assets/ramana-logo.png",
          "foundingDate": "2012",
          "telephone": businessInfo.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": businessInfo.address.street,
            "addressLocality": businessInfo.address.city,
            "addressRegion": businessInfo.address.state,
            "postalCode": businessInfo.address.pincode,
            "addressCountry": "IN"
          }
        }}
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Our Heritage & Trust"
            title="Safeguarding Homes & Families Across Bangalore Since 2012"
            subtitle="Ramana Safety Nets was founded with a single mission: to provide the highest-grade, certified fall prevention and bird exclusion netting systems with absolute transparency and uncompromised craftsmanship."
          />

          {/* Milestones Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center space-y-1 shadow-soft-sm"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 block">
                  {m.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  {m.label}
                </span>
                <span className="text-[11px] text-slate-500 block pt-1">
                  {m.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/assets/services/balcony-safety-nets/hero.webp"
                  alt="Ramana Safety Nets Certified High-Rise Safety Net Installation in Bangalore"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 border border-white/80 shadow-soft-md flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-gold-600" />
                  <span>Garware Technical Partner</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Our Core Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Why Thousands of High-Rise Residents Choose Us
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In a market filled with counterfeit nylon cords and substandard hardware, Ramana Safety Nets strictly enforces original <strong>Garware High-Density Polyethylene</strong> netting and <strong>AISI 304/316 marine-grade stainless steel</strong> anchors.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Every member of our installation crew is certified in rope-access and high-altitude rigging, ensuring zero safety incidents during execution and lifetime structural stability for your balcony.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>100% Transparency — No hidden costs, no fake warranty claims</span>
                </div>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Same-day free doorstep survey with physical swatch samples</span>
                </div>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Non-intrusive micro-anchoring that protects your exterior wall tiles</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="inline-flex items-center px-5 py-3 bg-slate-950 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-soft-sm"
                >
                  <Phone className="w-3.5 h-3.5 mr-2 text-gold-400" />
                  Speak with Founder
                </a>
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center px-5 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-soft-sm cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 mr-2" />
                  Request Free Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <MaterialSpecs />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessTimeline />

      {/* Testimonials */}
      <Testimonials />
    </>
  );
}
