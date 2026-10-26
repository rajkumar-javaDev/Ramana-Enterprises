import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { businessInfo } from '../../data/businessInfo';

const homepageServiceSlugs = [
  'nylon-safety-nets',
  'balcony-safety-nets',
  'children-safety-nets',
  'pigeon-safety-nets',
  'invisible-grills',
  'duct-area-safety-nets'
];

const ServicesGrid = ({ limit, onOpenQuoteModal }) => {
  const displayServices = limit
    ? homepageServiceSlugs.map(slug => servicesData.find(s => s.slug === slug)).filter(Boolean).slice(0, limit)
    : servicesData;
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm mb-4">Our Services</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Safety Net Solutions</h2>
          <p className="text-lg text-slate-600">Explore our wide range of premium safety nets designed for residential, commercial, and industrial needs.</p>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <motion.div key={service.slug} variants={item} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group flex flex-col h-full">
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-video">
                <img src={service.image} alt={`${service.title} by Raghavi Enterprises Bangalore`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 mb-4 text-sm line-clamp-2">{service.shortDescription}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" /><span className="text-slate-600">{feature}</span></li>
                  ))}
                </ul>
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <Link to={`/services/${service.slug}`} className="flex items-center justify-center py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Details <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  <a href={`https://wa.me/${businessInfo.whatsappNumber}?text=Hi, I want to know more about ${service.title}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"><MessageCircle className="w-4 h-4 mr-1" /> Enquire</a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {limit && (
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">View All Services<ArrowRight className="w-5 h-5 ml-2" /></Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default ServicesGrid;
