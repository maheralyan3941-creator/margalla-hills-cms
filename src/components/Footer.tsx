import React from 'react';
import { UtensilsCrossed, MapPin, Phone, Clock, Award, MessageCircle, Tag, Globe, Sparkles, Building2 } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#080808] text-neutral-400 pt-16 pb-10 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Global Locations Bar */}
        <div className="mb-12 p-6 rounded-2xl bg-[#0e1014] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-mono font-semibold">
              <Globe className="w-4 h-4" />
              <span>Worldwide Fine Dining Network Across 50+ Countries</span>
            </div>
            <p className="text-xs text-neutral-300">
              Primary Global Flagship in <strong>Downtown Dubai, UAE</strong> &bull; Heritage Mountain Sanctuary in <strong>Margalla Hills Islamabad</strong> &bull; International branches in London, New York, Tokyo, Paris, Riyadh, Singapore &amp; 45+ more.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/locations')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View All 50+ Countries</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Reservations</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Culinary Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-serif font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                <UtensilsCrossed className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight block leading-none">
                  Margalla Hills
                </span>
                <span className="text-[10px] tracking-[0.22em] text-amber-400 uppercase block mt-1 font-medium font-mono">
                  Dubai HQ &bull; Global Sanctuaries
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Global fine dining luxury group with 400+ authentic dishes, live charcoal BBQ, royal Kashmiri Wazwan, and single-origin saffron gastronomy across 50+ international branches.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400/90 font-serif">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Global Flagship in Dubai &bull; Islamabad Mountain Sanctuary</span>
            </div>
          </div>

          {/* Menus & Global Locations */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4 font-mono">
              Menus &amp; Global Directory
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/locations')} className="text-amber-400 hover:text-amber-300 font-semibold transition cursor-pointer flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>50+ Countries Branch Directory</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-amber-400 transition cursor-pointer">
                  Complete 400+ Dishes Menu Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu/bbq')} className="hover:text-amber-400 transition cursor-pointer">
                  Live Charcoal BBQ &amp; Seekh Kebabs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/menu/karahi')} className="hover:text-amber-400 transition cursor-pointer">
                  Desi Clay-Pot Karahi &amp; Shinwari Handis
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/deals')} className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>Hillside Value Deals (Under $15)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/compendium')} className="hover:text-amber-400 transition cursor-pointer text-neutral-400">
                  400 Chapters Gastronomy Compendium
                </button>
              </li>
            </ul>
          </div>

          {/* Hospitality & Private Events */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4 font-mono">
              Private Dining &amp; Events
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/private-dining')} className="text-amber-400 hover:text-amber-300 font-semibold transition cursor-pointer flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Skyline &amp; Hilltop Gazebos</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-amber-400 transition cursor-pointer">
                  Diplomatic Banquets &amp; Royal Catering
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tasting-menu')} className="hover:text-amber-400 transition cursor-pointer">
                  Royal Saffron Tasting Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/wine-cellar')} className="hover:text-amber-400 transition cursor-pointer">
                  Artisanal Botanicals &amp; Rare Tea Cellar
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-amber-400 transition cursor-pointer">
                  Sanctuary Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-amber-400 transition cursor-pointer text-neutral-400">
                  Concierge &amp; Private Hire
                </button>
              </li>
            </ul>
          </div>

          {/* Dual Headquarters Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4 font-mono">
              Dual Headquarters
            </h4>
            
            {/* Dubai HQ */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-amber-500/30 space-y-1">
              <span className="text-amber-400 font-bold font-mono text-[10px] uppercase block">
                Dubai Global Flagship (UAE)
              </span>
              <p className="text-[11px] text-neutral-300">Sheikh Mohammed bin Rashid Blvd, Downtown Dubai</p>
              <a href="tel:+97145558921" className="text-amber-400 font-mono text-xs hover:underline block">
                Phone: +971 4 555 8921
              </a>
            </div>

            {/* Islamabad Heritage */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                Islamabad Mountain Sanctuary (PK)
              </span>
              <p className="text-[11px] text-neutral-300">Pir Sohawa Road &amp; Daman-e-Koh, Margalla Hills</p>
              <a
                href="https://wa.me/923294785579?text=Hello%20Margalla%20Hills%2C%20I%20would%20like%20to%20reserve%20a%20table%20or%20order%20food."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-mono text-xs hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp: +92 329 4785579</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Margalla Hills Global Group. Dubai HQ &bull; Islamabad Heritage &bull; 50+ Country Branches.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => navigate('/locations')} className="hover:text-amber-400 transition">50+ Countries</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/about')} className="hover:text-amber-400 transition">About Heritage</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/menu')} className="hover:text-neutral-300 transition">Menu (400+)</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
