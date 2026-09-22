import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface WhatsAppFloatingProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppFloating({
  phoneNumber = '923294785579',
  defaultMessage = 'Hello Margalla Hills, I would like to order or reserve a table.'
}: WhatsAppFloatingProps) {
  const handleDirectWhatsAppClick = () => {
    const encoded = encodeURIComponent(defaultMessage);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      <button
        id="direct-whatsapp-floating-btn"
        onClick={handleDirectWhatsAppClick}
        className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_25px_rgba(37,211,102,0.55)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.75)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 border-2 border-white/20"
        title="Order & Inquiries on WhatsApp"
        aria-label="Order on WhatsApp"
      >
        {/* Animated WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-black/40" />
        </div>

        {/* Text Details - No Raw Phone Number */}
        <div className="text-left flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-950 font-black leading-none flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-900 animate-pulse" />
            INSTANT DESK
          </span>
          <span className="text-sm font-extrabold tracking-tight text-white drop-shadow-xs leading-tight">
            Order via WhatsApp
          </span>
        </div>

        {/* Direct Arrow / Send indicator */}
        <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
          <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
}
