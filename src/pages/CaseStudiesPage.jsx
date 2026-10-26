import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, MapPin, CheckCircle2, ShieldCheck, FileText, Phone, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { caseStudiesData } from '../data/caseStudiesData';
import { businessInfo } from '../data/businessInfo';

export default function CaseStudiesPage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [selectedId, setSelectedId] = useState(caseStudiesData[0].id);

  const activeStudy = caseStudiesData.find(c => c.id === selectedId) || caseStudiesData[0];

  return (
    <>
      <SEO
        title="Documented Case Studies & Engineering Outcomes | Raghavi Enterprises"
        description="Verified case studies covering residential pigeon exclusion, high-rise luxury invisible grills, IS 11057 certified construction fall arrest, and warehouse rack netting in Bangalore."
        canonicalUrl="/case-studies"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Verified Engineering Outcomes"
            title="Real-World Case Studies & Performance Evidence"
            subtitle="Detailed technical case studies examining complex architectural constraints, certified installation processes, and multi-year verified outcomes."
          />

          {/* Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {caseStudiesData.map((study) => (
              <button
                key={study.id}
                onClick={() => setSelectedId(study.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedId === study.id
                    ? 'bg-slate-950 text-white shadow-soft-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {study.title.split(' ')[0]} {study.title.split(' ')[1]} {study.title.split(' ')[2]}...
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Case Study Detail */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-soft-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {activeStudy.category}
              </span>
              <span className="flex items-center text-xs font-bold text-slate-500">
                <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                {activeStudy.location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
              {activeStudy.title}
            </h2>
          </div>

          {/* Problem & Technical Constraints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-soft-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Problem Brief</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{activeStudy.problem}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-soft-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical & Site Constraints</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{activeStudy.technicalConstraints}</p>
            </div>
          </div>

          {/* Proposed Engineering System */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-soft-xl">
            <div className="flex items-center space-x-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Engineered Specification & Proposed System</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-semibold">
              {activeStudy.proposedSystem}
            </p>
          </div>

          {/* Installation Method Statement */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-slate-950">Step-by-Step Installation Method</h3>
            <div className="space-y-2.5">
              {activeStudy.installationProcess.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes, Limitations & Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-6 space-y-2">
              <h4 className="text-xs font-bold text-emerald-950 uppercase">Verified Outcome Metrics</h4>
              <p className="text-xs text-slate-800 leading-relaxed">{activeStudy.outcomeMetrics}</p>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 space-y-2">
              <h4 className="text-xs font-bold text-amber-950 uppercase">Disclosed Limitations</h4>
              <p className="text-xs text-slate-800 leading-relaxed">{activeStudy.limitations}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Ongoing Maintenance Plan</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{activeStudy.maintenancePlan}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Have a Similar Complex Requirement for Your Property?
          </h2>
          <p className="text-sm text-slate-600">
            From high-rise apartment balconies to multi-acre logistics facilities, our technical engineers deliver documented, verified protection systems.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Discuss With Engineer
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request Site Inspection
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
