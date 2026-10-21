import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Sun, Palette, Ruler, Weight } from 'lucide-react';

const MaterialSpecs = () => {
  const specs = [
    { icon: Shield, name: "Material Base", value: "100% Virgin Garware HDPE Nylon", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Ruler, name: "Mesh Sizes", value: "20mm to 50mm (Customizable)", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Zap, name: "Twine Thickness", value: "1.2mm to 4.0mm (15–36 ply)", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Weight, name: "Breaking Strength", value: "Up to 500 kg drop test rating", color: "text-red-600", bg: "bg-red-50" },
    { icon: Sun, name: "UV Resistance", value: "Double UV coated for tropical sun", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: Palette, name: "Colors Available", value: "Transparent, White, Green, Black", color: "text-violet-600", bg: "bg-violet-50" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mb-4">
            Technical Specifications
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">Premium Quality Guaranteed</h2>
          <p className="text-base text-slate-500">
            We use only industry-leading Garware-certified materials that undergo rigorous testing to ensure your absolute safety.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {specs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center space-x-4 hover:shadow-soft-md hover:border-slate-300 transition-all"
              >
                <div className={`w-12 h-12 ${spec.bg} rounded-xl flex items-center justify-center ${spec.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{spec.name}</h4>
                  <p className="text-sm text-slate-900 font-bold">{spec.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialSpecs;
