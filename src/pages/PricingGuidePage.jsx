import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, AlertCircle, Phone, FileText, ShieldCheck, MapPin, ArrowRight, DollarSign, Layers } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { pricingFactors } from '../data/pricingFactorsData';
import { businessInfo } from '../data/businessInfo';

export default function PricingGuidePage() {
  const { onOpenQuoteModal } = useOutletContext();

  const priceDrivers = [
    {
      driver: "1. Material Specification & Grade",
      effect: "100% Virgin Garware HDPE vs recycled plastic; AISI 316 Marine Grade stainless steel vs commercial 202 wire directly affects raw material longevity and anti-rust performance."
    },
    {
      driver: "2. Mesh Aperture & Twine Thickness",
      effect: "Finer micro-mesh (15mm–25mm) and multi-ply braided cords (up to 36-ply / 3.0mm) utilize higher polymer yarn mass per square meter than commodity nets."
    },
    {
      driver: "3. Balcony Geometry & Obstacles",
      effect: "Curved balustrades, circular pillars, duct shaft pipe penetrations, and custom zippered HVAC access hatches require intricate manual tailoring."
    },
    {
      driver: "4. High-Altitude Access & Rigging Gear",
      effect: "Installing on 10th to 30th floor high-rise exteriors requires certified dual-rope rappelling rigs, safety harnesses, and specialized anchor rigging."
    },
    {
      driver: "5. Structural Anchoring Substrate",
      effect: "Solid RCC concrete beams accept standard stainless expansion anchors. Difficult granite cladding, hollow clay blocks, or glass requires specialized chemical anchors or clamps."
    },
    {
      driver: "6. Wind Shear & Lake-Corridor Exposure",
      effect: "High-wind balconies (e.g. facing Bellandur, Hebbal, or Sarjapur lakes) require reinforced stainless steel boundary cables and denser fastener spacing."
    },
    {
      driver: "7. Fire-Retardant Classification (NFPA 701)",
      effect: "Construction and industrial projects requiring certified flame-retardant debris screens carry testing and additive documentation costs."
    },
    {
      driver: "8. Statutory Engineering & Drop Testing",
      effect: "Industrial personnel fall-arrest projects (IS 11057 / EN 1263) require formal method statements, calculations, and on-site 400 lb drop testing."
    },
    {
      driver: "9. Documented Written Warranty & AMC",
      effect: "Official 8 to 10-year warranty certificates backed by manufacturer batch tracking and complimentary re-tensioning support."
    },
    {
      driver: "10. All-Inclusive Tax, Labor & Cleanup",
      effect: "Transparent quotations include drilling, silicone weatherproofing, certified labor, debris cleanup, and statutory GST."
    }
  ];

  return (
    <>
      <SEO
        title="Transparent Safety Net Pricing Guide | Bangalore Cost Factors & Formula"
        description="Understand how safety net and invisible grill pricing is calculated in Bangalore. 10-component formula, retail market realities, high-rise access, and why online rate cards differ from project quotes."
        canonicalUrl="/pricing-guide"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Transparent Estimation Policy"
            title="Safety Net & Invisible Grill Pricing Framework"
            subtitle="Understand every factor that influences your project quotation — with zero hidden charges, transparent material breakdowns, and 100% free doorstep measurements across Bangalore."
          />

          {/* Mathematical Formula Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-soft-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block">
              10-Component Verified Project Cost Formula
            </span>
            <div className="p-4 sm:p-5 bg-white/10 rounded-2xl font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto">
              {pricingFactors.formula}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Online marketplace listings advertising flat rates (e.g. ₹90–₹280/sq.ft for invisible grills or ₹1.2–₹3/sq.ft for raw agricultural netting) do not include high-altitude rope rigging, structural stainless steel fasteners, corner lacing, tax, or written warranties. We provide exact, all-inclusive quotations after a free physical site survey.
            </p>
          </div>
        </div>
      </section>

      {/* Ten Core Price Determinants */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              Estimation Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              The 10 Primary Price Drivers in Safety Net Installations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Every project quote is calculated with complete transparency across these ten engineering dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {priceDrivers.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2 hover:shadow-soft-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-950">{item.driver}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bengaluru City Drivers */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
              Local Variables
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Bengaluru City Installation Variables
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Specific environmental and architectural factors that affect installation execution in Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingFactors.bengaluruDrivers.map((driver, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2.5 shadow-soft-sm"
              >
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs sm:text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{driver.factor}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{driver.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Get an Exact, Transparent Quotation for Your Home
          </h2>
          <p className="text-sm text-slate-600">
            Zero guess work, zero hidden charges. Schedule a free site visit anywhere in Bangalore today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Call for Estimate
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Book Free Site Measurement
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
