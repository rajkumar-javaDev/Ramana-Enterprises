import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, AlertTriangle, CheckCircle2, ShieldCheck, FileText, Phone, ArrowRight, ListChecks, Award, Search, XCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import { buyerQuestions, redFlags, preInstallationWorkflow, competitorScoringCriteria } from '../data/buyingGuideData';
import { businessInfo } from '../data/businessInfo';

export default function CustomerGuidePage() {
  const { onOpenQuoteModal } = useOutletContext();
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <>
      <SEO
        title="Safety Net & Invisible Grill Customer Buying Guide | 20 Questions & Red Flags"
        description="The ultimate consumer and enterprise buying guide for safety nets and invisible grills. 20 crucial questions to ask, 10 red flags to avoid, 9-step pre-installation workflow, and competitor evaluation criteria."
        canonicalUrl="/buying-guide"
      />

      {/* Hero Header */}
      <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText="Consumer & Enterprise Due Diligence"
            title="The Definitive Customer Buying & Quality Guide"
            subtitle="Everything you must verify before hiring a safety net installer or invisible grill contractor in Bangalore — including engineering questions, common vendor traps, and standard operating procedures."
          />

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'questions' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              20 Buyer Questions
            </button>
            <button
              onClick={() => setActiveTab('redflags')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'redflags' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              10 Red Flags to Avoid
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'workflow' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              9-Step Pre-Installation SOP
            </button>
            <button
              onClick={() => setActiveTab('scoring')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'scoring' ? 'bg-slate-950 text-white shadow-soft-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              15-Point Vendor Scoring
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: 20 Questions */}
          {activeTab === 'questions' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h3 className="text-2xl font-extrabold text-slate-950">20 Essential Questions Every Buyer Must Ask</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Use this checklist during your on-site measurement to evaluate the contractor's technical competency.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {buyerQuestions.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2 hover:shadow-soft-md transition-all">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-950">{item.q}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed"><strong className="text-emerald-700">Why it matters:</strong> {item.why}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Red Flags */}
          {activeTab === 'redflags' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200 inline-block mb-2">
                  Cautionary Guidance
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950">10 Red Flags When Choosing a Safety Net Vendor</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Never compromise on balcony safety. Beware of these deceptive market practices.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {redFlags.map((flag, idx) => (
                  <div key={idx} className="bg-red-50/40 border border-red-200/80 rounded-3xl p-6 space-y-2.5">
                    <div className="flex items-center space-x-2 text-red-950 font-bold text-sm">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span>{flag.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{flag.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: 9-Step SOP Workflow */}
          {activeTab === 'workflow' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Standard Operating Procedure
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950">Universal 9-Step Pre-Installation Quality Protocol</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Every Raghavi Enterprises installation strictly adheres to this 9-step quality lifecycle.</p>
              </div>

              <div className="space-y-4">
                {preInstallationWorkflow.map((item) => (
                  <div key={item.step} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-950">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: Competitor Scoring Criteria */}
          {activeTab === 'scoring' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 max-w-5xl mx-auto"
            >
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block mb-2">
                  Quality Audit Matrix
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950">15-Point Contractor Competency Evaluation Sheet</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Score any safety net contractor on a 1-to-5 scale across these fifteen objective criteria.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-soft-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {competitorScoringCriteria.map((criterion, idx) => (
                    <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center space-x-2 text-xs font-bold text-slate-800 shadow-soft-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{criterion}</span>
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
            Schedule a Certified Quality Site Survey Today
          </h2>
          <p className="text-sm text-slate-600">
            Experience our 9-step quality protocol firsthand with a 100% free doorstep survey anywhere in Bangalore.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="inline-flex items-center px-6 py-3.5 bg-slate-950 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-soft-md"
            >
              <Phone className="w-4 h-4 mr-2 text-gold-400" />
              Call Technical Lead
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-soft-md cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Book Free Quality Survey
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
