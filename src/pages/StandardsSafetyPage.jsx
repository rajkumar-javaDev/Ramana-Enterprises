import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, CheckCircle2, FileText, Phone, ArrowRight, ShieldAlert, Award, BookOpen, Wrench, FileCheck, Layers, HardHat } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { safetyClassification, standardsBaseline } from '../data/standardsData';
import { problemsPreventionData } from '../data/problemsPreventionData';
import { businessInfo } from '../data/businessInfo';

export default function StandardsSafetyPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [activeTab, setActiveTab] = useState('standards');

  const complianceDocuments = [
    "1. Official Manufacturer Product Data Sheet (Technical Specs)",
    "2. Raw Material Polymer Declaration (100% Virgin HDPE / Polyamide)",
    "3. Accredited Laboratory Tensile & Breaking Load Test Report",
    "4. Batch & Lot Traceability Label on Netting Panels",
    "5. Accelerated Weathering & UV-Stabilization Test Evidence",
    "6. NFPA 701 Fire-Propagation Test Certificate (when specified)",
    "7. Installation Method Statement & Risk Assessment (HIRA)",
    "8. Anchor & Fastener Pull-Out Load Calculations",
    "9. High-Altitude Rigging & Rope-Access Technician Competency Cards",
    "10. Dynamic Drop-Test Report (IS 11057 / OSHA 400 lb Sandbag)",
    "11. Pre-Use Site Inspection & Handover Checklist",
    "12. Written Certificate of Warranty with Explicit Exclusions",
    "13. Post-Installation Maintenance & Re-Tensioning Protocol Sheet"
  ];

  return (
    <>
      <SEO
        title="Safety Classification & Standards Master Reference | IS 11057 & OSHA"
        description="Authoritative technical standards baseline: IS 11057:1984, EN 1263-1/2, OSHA 1926.502, IS 4912, IS 13415, 13 compliance documents, and critical failure mode prevention."
        canonicalUrl="/standards"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Engineering Standards & Compliance"
            title="Safety Classification & Technical Standards Baseline"
            subtitle="The authoritative engineering baseline for safety nets, bird exclusion, invisible grills, and construction fall protection systems in India."
          />

          {/* Critical Disclaimer Alert Box */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-soft-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-amber-950">
                  Critical Safety Separation Directive
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  A pigeon net, residential balcony net, or decorative invisible grill must <strong>NEVER</strong> be marketed, specified, or relied upon as a certified personnel fall-arrest system. Certified worker fall-arrest systems must comply strictly with <strong>IS 11057:1984</strong>, <strong>EN 1263-1/2</strong>, and <strong>OSHA 29 CFR 1926.502</strong>, featuring dynamic drop-test verification and 5,000 lb (22 kN) minimum rated border ropes.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-10">
            <button
              onClick={() => setActiveTab('standards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'standards' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Statutory Standards
            </button>
            <button
              onClick={() => setActiveTab('classification')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'classification' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Safety Classification Matrix
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'problems' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Failure Modes & Prevention (11)
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'compliance' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              13 Compliance Documents
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: Statutory Standards Baseline */}
          {activeTab === 'standards' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
                  Official Statutory Standards
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Indian & International Standards Baseline</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">Every installation is aligned with recognized Indian and global safety codes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standardsBaseline.map((std) => (
                  <div key={std.code} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-soft-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-extrabold">{std.code}</span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase">{std.organization}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-950 leading-snug">{std.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{std.scope}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Key Compliance Criteria</span>
                      <p className="text-xs font-semibold text-slate-800">{std.keyCriteria}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* EN 1263-1 Systems Deep Dive */}
              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto space-y-4 shadow-soft-xl">
                <div className="flex items-center space-x-2 text-gold-400 font-bold text-sm">
                  <HardHat className="w-5 h-5" />
                  <span>EN 1263-1 Construction Safety Net Systems (S, T, U, V)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-xs font-extrabold text-gold-400 block">System S</span>
                    <span className="text-xs font-bold text-white block mt-1">Horizontal Border-Rope Net</span>
                    <span className="text-[11px] text-slate-300 block mt-1">Installed under ceiling/roof work with heavy border rope.</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-xs font-extrabold text-gold-400 block">System T</span>
                    <span className="text-xs font-bold text-white block mt-1">Console Cantilever Net</span>
                    <span className="text-[11px] text-slate-300 block mt-1">Bracket-supported outrigger net catching edge falls.</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-xs font-extrabold text-gold-400 block">System U</span>
                    <span className="text-xs font-bold text-white block mt-1">Vertical Scaffolding Net</span>
                    <span className="text-[11px] text-slate-300 block mt-1">Fixed vertically to scaffold frames to prevent lateral drops.</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <span className="text-xs font-extrabold text-gold-400 block">System V</span>
                    <span className="text-xs font-bold text-white block mt-1">Gallows-Supported Net</span>
                    <span className="text-[11px] text-slate-300 block mt-1">Vertical net attached to upper gallows outriggers.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Classification Matrix */}
          {activeTab === 'classification' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Systematic Differentiation
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Product Family Safety Classification</h3>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-soft-md">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 text-white font-bold">
                      <th className="p-4 sm:p-5">Service Family</th>
                      <th className="p-4 sm:p-5">Primary Purpose</th>
                      <th className="p-4 sm:p-5">Can it be marketed as Personnel Fall Protection?</th>
                      <th className="p-4 sm:p-5">Main Technical Concern</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {safetyClassification.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 sm:p-5 font-bold text-slate-950 whitespace-nowrap">{item.family}</td>
                        <td className="p-4 sm:p-5 text-slate-700">{item.purpose}</td>
                        <td className="p-4 sm:p-5">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.canMarketAsFallProtection.includes('Yes') 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : item.canMarketAsFallProtection.includes('Only') || item.canMarketAsFallProtection.includes('Depends')
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {item.canMarketAsFallProtection}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-slate-600 leading-relaxed">{item.mainConcern}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Failure Modes & Prevention (11) */}
          {activeTab === 'problems' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
                  Failure Modes Analysis
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">11 Common Installation Failures & Engineering Preventions</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Understanding root causes prevents premature net tearing, anchor pull-outs, and bird entry.</p>
              </div>

              <div className="space-y-4">
                {problemsPreventionData.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 hover:shadow-soft-md transition-all">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-950">{item.problem}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="bg-red-50/50 p-4 rounded-2xl border border-red-200/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 block mb-1">Root Cause</span>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.rootCause}</p>
                      </div>
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">Engineering Prevention</span>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">{item.prevention}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: 13 Compliance Documents Checklist */}
          {activeTab === 'compliance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Quality Audit Documentation
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">13 Essential Compliance Documents Checklist</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">For tender submittals, enterprise projects, and residential audits, demand these documents.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-soft-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {complianceDocuments.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start space-x-3 shadow-soft-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Need Certified Technical Documentation for Your Project?
          </h2>
          <p className="text-sm text-slate-600">
            We provide full material declarations, batch test reports, and site method statements across Bangalore.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Speak With Technical Lead
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request Compliance Dossier
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
