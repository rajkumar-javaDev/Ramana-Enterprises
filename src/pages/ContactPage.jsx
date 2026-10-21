import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { businessInfo } from '../data/businessInfo';
import { locationsData } from '../data/locationsData';
import FAQSection from '../components/sections/FAQSection';

export default function ContactPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const topLocations = locationsData.slice(0, 16);

  return (
    <>
      <SEO
        title="Contact Ramana Safety Nets Bangalore | Free Doorstep Survey"
        description="Book a free on-site safety net measurement in Bangalore. Call +91 88844 42929 or WhatsApp us. Same-day inspection across Whitefield, HSR, Koramangala, and all areas."
        canonicalUrl="/contact"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Direct Helpline & Booking"
            title="Book Your Free Doorstep Safety Net Survey"
            subtitle="Get in touch with our certified netting experts in Bangalore. We provide same-day on-site measurement, exact estimation, and professional installation."
          />

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href={`tel:${businessInfo.phone}`}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-soft-md hover:border-slate-300 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors mb-3 shadow-soft-sm">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Consultation</span>
              <span className="text-base font-extrabold text-slate-950 mt-1">{businessInfo.phone}</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1">Available 7:00 AM – 9:00 PM</span>
            </a>

            <a
              href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-soft-md hover:border-slate-300 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-3 shadow-soft-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant WhatsApp</span>
              <span className="text-base font-extrabold text-slate-950 mt-1">Chat With Expert</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1">Instant Photo Quote Response</span>
            </a>

            <div
              onClick={onOpenQuoteModal}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-soft-md hover:border-slate-300 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-slate-950 transition-colors mb-3 shadow-soft-sm">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Doorstep Booking</span>
              <span className="text-base font-extrabold text-slate-950 mt-1">Request Free Survey</span>
              <span className="text-[11px] text-slate-500 font-semibold mt-1">100% Free • No Obligation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section & Map */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Head Office & Workshop
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Ramana Safety Nets Bangalore
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Office Address</h4>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {businessInfo.address.street}, {businessInfo.address.city}, {businessInfo.address.state} - {businessInfo.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Working Hours</h4>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {businessInfo.workingHours} (Open All 7 Days)
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Official Email</h4>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {businessInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Garware Authorized Installation Partner</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We maintain authentic Garware HDPE inventory in our central Bangalore hub, enabling rapid dispatch of certified ropes and stainless steel fixtures across all 40+ serving areas.
                </p>
              </div>
            </div>

            {/* Right Map Column */}
            <div className="lg:col-span-6">
              <div className="h-full min-h-[420px] rounded-3xl overflow-hidden shadow-soft-xl border border-slate-200 bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124411.02674488346!2d77.58983171358983!3d12.981880482596492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ramana Safety Nets Bangalore Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Areas List */}
      <section className="py-12 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-950">We Provide Same-Day Survey in These Bangalore Hubs</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {topLocations.map(loc => (
              <span
                key={loc.slug}
                className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-soft-sm"
              >
                {loc.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection limit={4} />
    </>
  );
}
