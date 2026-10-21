import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { servicesData } from '../../data/servicesData';

const QuickQuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', location: '', message: '' });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => { window.removeEventListener('keydown', handleEscape); document.body.style.overflow = 'unset'; };
  }, [isOpen, onClose]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi, I need a quote for Safety Nets.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Location:* ${formData.location}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${businessInfo.whatsappNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, y: 100, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.95 }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div><h2 className="text-2xl font-bold text-slate-800">Get Free Quote</h2><p className="text-slate-500 text-sm mt-1">Fill the form and we'll reply instantly on WhatsApp</p></div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="+91 98765 43210" /></div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Needed</label>
                    <select name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white">
                      <option value="">Select a service...</option>
                      {servicesData.map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Location / Area</label><input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="e.g., Whitefield, Bangalore" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Additional Message (Optional)</label><textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none" placeholder="Any specific requirements..."></textarea></div>
                  <button type="submit" className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-green-200 mt-6">
                    <MessageCircle className="w-5 h-5" /><span>Send on WhatsApp</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
export default QuickQuoteModal;
