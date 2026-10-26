import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Scale, FileText, Phone, Grid, Layers } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { comparisonsData } from '../data/comparisonsData';
import { businessInfo } from '../data/businessInfo';

export default function MaterialComparisonsPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [activeId, setActiveId] = useState(comparisonsData[0].id);

  const activeComparison = comparisonsData.find(c => c.id === activeId) || comparisonsData[0];

  const meshSelectionGuide = [
    {
      app: "Pigeon Exclusion",
      mesh: "19mm – 25mm (3/4 – 1 inch)",
      rule: "Must be smaller than pigeon body-entry cross-section (approx 35mm). Ensure tight perimeter sealing around wall contours."
    },
    {
      app: "Small Bird (Sparrow / Myna)",
      mesh: "15mm – 20mm micro-mesh",
      rule: "Fine aperture prevents sparrows from penetrating ventilation louvres while avoiding bird entanglement."
    },
    {
      app: "Child & Toddler Balcony Net",
      mesh: "25mm – 30mm tight square grid",
      rule: "Prevents toddler hands/feet from gaining footholds or passing toys through. Must not create climbing ladder rungs."
    },
    {
      app: "Monkey Protection Net",
      mesh: "40mm heavy-gauge cordage",
      rule: "Thick 3.0mm–4.0mm braided twine prevents biting and clawing; supported with perimeter steel wire rigging."
    },
    {
      app: "Cricket Practice & Sports",
      mesh: "30mm (Cricket) / 40mm (Tennis) / 100mm (Football)",
      rule: "Sized strictly to retain target ball velocities (up to 150 km/h) while minimizing wind-drag on tall outdoor poles."
    },
    {
      app: "Scaffolding Debris Netting",
      mesh: "Fine knitted mesh (80–250 GSM)",
      rule: "Sized to catch falling mortar, plaster splatters, and small tools. Zero personnel fall-arrest rating."
    },
    {
      app: "Construction Fall-Arrest Net",
      mesh: "100mm outer net + 20mm debris overlay",
      rule: "Complies with IS 11057 / EN 1263 / OSHA limits (max 6 x 6 in / 36 sq.in opening) with 5,000 lb border ropes."
    }
  ];

  return (
    <>
      <SEO
        title="Technical Material Comparisons | HDPE vs Nylon vs Invisible Grills"
        description="Authoritative material selection guide: Garware HDPE vs Nylon, Invisible Grill Cable Specifications, Mesh Aperture Selection Table, and Knotted vs Knotless comparisons."
        canonicalUrl="/materials-guide"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Engineering Material Guide"
            title="Technical Material & Systems Comparison Matrix"
            subtitle="Transparent, evidence-based comparisons to help architects, apartment associations, and homeowners select the exact material specification for their project."
          />

          {/* Quick Selection Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {comparisonsData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeId === item.id
                    ? 'bg-slate-950 text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Comparison Card */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              Detailed Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {activeComparison.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {activeComparison.tagline}
            </p>
          </div>

          {/* Side by Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Option A */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-soft-sm">
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Option A</span>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">{activeComparison.optionA.name}</h3>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Advantages & Strengths</span>
                  <ul className="space-y-2">
                    {activeComparison.optionA.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Limitations & Cautions</span>
                  <ul className="space-y-2">
                    {activeComparison.optionA.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600">
                        <XCircle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 bg-white/60 p-3.5 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Best Suited Application</span>
                <p className="text-xs font-bold text-slate-900">{activeComparison.optionA.bestFor}</p>
              </div>
            </div>

            {/* Option B */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-soft-sm">
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Option B</span>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">{activeComparison.optionB.name}</h3>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Advantages & Strengths</span>
                  <ul className="space-y-2">
                    {activeComparison.optionB.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Limitations & Cautions</span>
                  <ul className="space-y-2">
                    {activeComparison.optionB.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600">
                        <XCircle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 bg-white/60 p-3.5 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Best Suited Application</span>
                <p className="text-xs font-bold text-slate-900">{activeComparison.optionB.bestFor}</p>
              </div>
            </div>
          </div>

          {/* Expert Technical Verdict */}
          <div className="max-w-5xl mx-auto bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-soft-xl">
            <div className="flex items-center space-x-2 text-gold-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Technical Engineering Recommendation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {activeComparison.verdict}
            </p>
          </div>
        </div>
      </section>

      {/* Mesh Aperture Selection Guide */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
              Aperture Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Mesh-Size Selection Matrix</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Choosing the right aperture based on target hazard, wind resistance, and visibility.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-soft-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-950 text-white font-bold">
                  <th className="p-4 sm:p-5">Application</th>
                  <th className="p-4 sm:p-5">Typical Mesh Aperture</th>
                  <th className="p-4 sm:p-5">Engineering Design Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {meshSelectionGuide.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-950 whitespace-nowrap">{item.app}</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-800">{item.mesh}</td>
                    <td className="p-4 sm:p-5 text-slate-600 leading-relaxed">{item.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Unsure Which Material Best Fits Your Balcony or Site?
          </h2>
          <p className="text-sm text-slate-600">
            Request a free doorstep inspection in Bangalore. Our technician carries physical swatch samples of HDPE, Nylon, and Invisible Grill cables for your direct evaluation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Call Specialist
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Book Material Inspection
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
