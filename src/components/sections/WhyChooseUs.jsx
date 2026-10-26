import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, MapPin, BadgeCheck, Users, HardHat } from 'lucide-react';

const WhyChooseUs = () => {
  const pillars = [
    { icon: ShieldCheck, title: "Garware ISO Certified", desc: "Using 100% authentic Garware brand HDPE nets with UV protection." },
    { icon: Award, title: "12+ Years Experience", desc: "Over a decade of specialized expertise in net installation." },
    { icon: MapPin, title: "Free Site Survey", desc: "Complimentary doorstep inspection and exact measurements." },
    { icon: BadgeCheck, title: "Up to 10 Yrs Warranty", desc: "Official warranty letter provided on material and installation." },
    { icon: Users, title: "15,000+ Installations", desc: "Trusted by thousands of families and businesses in Bangalore." },
    { icon: HardHat, title: "Certified Technicians", desc: "Trained rope-access experts for safe, flawless execution." }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Raghavi Enterprises?</h2>
          <p className="text-lg text-slate-600">We don't just install nets; we engineer peace of mind using the industry's best materials and practices.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-600 group-hover:text-white"><Icon className="w-7 h-7" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
