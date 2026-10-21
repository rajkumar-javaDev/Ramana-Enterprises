import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';

const FloatingCTA = ({ onOpenQuoteModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center">
        <a href={`tel:${businessInfo.phone}`} className="flex-1 flex flex-col items-center justify-center py-3 text-green-600 hover:bg-green-50 transition-colors">
          <Phone className="w-5 h-5 mb-1" /><span className="text-[10px] font-semibold uppercase tracking-wide">Call</span>
        </a>
        <div className="w-px h-10 bg-slate-200"></div>
        <a href={`https://wa.me/${businessInfo.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center py-3 text-green-500 hover:bg-green-50 transition-colors">
          <MessageCircle className="w-5 h-5 mb-1" /><span className="text-[10px] font-semibold uppercase tracking-wide">WhatsApp</span>
        </a>
        <div className="w-px h-10 bg-slate-200"></div>
        <button onClick={onOpenQuoteModal} className="flex-1 flex flex-col items-center justify-center py-3 text-amber-500 hover:bg-amber-50 transition-colors">
          <FileText className="w-5 h-5 mb-1" /><span className="text-[10px] font-semibold uppercase tracking-wide">Quote</span>
        </button>
      </div>
    </div>
  );
};
export default FloatingCTA;
