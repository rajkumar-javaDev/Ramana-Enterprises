import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { businessInfo } from '../../data/businessInfo';

const ContactSection = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 bg-white border-t border-slate-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">Get in Touch</h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Need a safety net installed? Contact us for a free site inspection and instant quote. We respond immediately!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="flex items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Call Us Directly</h4>
                  <a href={`tel:${businessInfo.phone}`} className="text-lg text-slate-600 hover:text-emerald-600 block font-semibold">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Chat with Us →
                  </a>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Email Address</h4>
                  <a href={`mailto:${businessInfo.email}`} className="text-base text-slate-600 hover:text-emerald-600">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Office Location</h4>
                  <p className="text-base text-slate-600">
                    {businessInfo.address.street}, {businessInfo.address.city}, {businessInfo.address.state} - {businessInfo.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">Working Hours</h4>
                  <p className="text-base text-slate-600">{businessInfo.workingHours}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 shadow-soft-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-soft-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <button
                onClick={onOpenQuoteModal}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-soft-sm transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-gold-600" />
                <span>Get Quote</span>
              </button>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[400px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden shadow-soft-xl border border-slate-200"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124411.02674488346!2d77.58983171358983!3d12.981880482596492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${businessInfo.name} - ${businessInfo.address.city} Location`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
