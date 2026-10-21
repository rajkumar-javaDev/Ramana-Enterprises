import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Shield, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Award, value: '12+', label: 'Years Experience' },
    { icon: Users, value: '15,000+', label: 'Happy Customers' },
    { icon: Shield, value: '10 Yrs', label: 'Warranty Given' },
    { icon: MapPin, value: '40+', label: 'Locations Served' }
  ];
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/assets/services/balcony-safety-nets/hero.webp" alt="Ramana Safety Nets High-Rise Balcony Netting in Bangalore" className="w-full h-auto object-cover aspect-[4/5]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center space-x-2 mb-2"><Shield className="w-6 h-6 text-green-400" /><span className="font-semibold text-lg">Garware ISO Certified</span></div>
                <p className="text-white/80">Using only premium quality high-density polyethylene materials.</p>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-tl-3xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-br-3xl -z-10"></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium text-sm mb-6"><span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>About Ramana Safety Nets</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">Protecting Your Loved Ones With Premium Safety Solutions</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">Ramana Safety Nets is Bangalore's most trusted provider of specialized netting solutions. With over 12 years of industry expertise, we deliver flawless installations that combine maximum safety with aesthetic appeal.</p>
            <ul className="space-y-4 mb-10">
              {['Garware branded authentic ISO certified nets', 'Certified professional installation team', 'Free doorstep inspection and quotation', 'Customized solutions for unique requirements'].map((item, idx) => (
                <li key={idx} className="flex items-start"><CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0" /><span className="text-slate-700 font-medium">{item}</span></li>
              ))}
            </ul>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-slate-100">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="w-12 h-12 mx-auto bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-3"><Icon className="w-6 h-6" /></div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors">Learn More About Us<ArrowRight className="w-5 h-5 ml-2" /></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
