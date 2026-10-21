import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Wrench, ShieldCheck } from 'lucide-react';

const ProcessTimeline = () => {
  const steps = [
    { icon: Phone, title: "1. Contact & Inquiry", desc: "Call or WhatsApp us with your requirement. Get instant guidance and tentative estimate." },
    { icon: MapPin, title: "2. Free Site Survey", desc: "Our experts visit your location for exact measurements and suggest the best solution." },
    { icon: Wrench, title: "3. Quick Installation", desc: "Certified technicians install the nets safely, usually completing within 2-4 hours." },
    { icon: ShieldCheck, title: "4. Quality Check", desc: "Final inspection, handover, and provision of the official warranty document." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Simple 4-Step Process</h2>
          <p className="text-lg text-slate-600">From your first call to final installation, we ensure a smooth, hassle-free experience.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center shadow-lg mb-6 group hover:border-green-500 transition-colors duration-300"><Icon className="w-8 h-8 text-green-600" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProcessTimeline;
