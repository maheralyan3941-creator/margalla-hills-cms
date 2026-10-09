import React from 'react';
import { UtensilsCrossed, MapPin, Phone, Clock, Award, MessageCircle, Tag, Globe, Sparkles, Building2 } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#080808] text-neutral-400 pt-16 pb-10 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Islamabad Hillside Highlight Bar */}
        <div className="mb-12 p-6 rounded-2xl bg-[#0e1014] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-mono font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Hilltop Scenic Dining &bull; Margalla Hills Islamabad</span>
            </div>
            <p className="text-xs text-neutral-300">
              Perched atop the scenic Margalla Ridge along <strong>Pir Sohawa Road, Islamabad</strong> &bull; Authentic charcoal BBQ, Shinwari karahi, handi specialties, and breathtaking sunset views over the capital.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/locations')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table Reservations</span>
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
                  Hilltop Dining &bull; Islamabad
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Premier mountain restaurant in Islamabad featuring 400+ authentic culinary dishes, live charcoal barbecue, Shinwari karahi, and scenic panoramic dining overlooking Islamabad.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-serif">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pir Sohawa Road &bull; Islamabad, Pakistan</span>
            </div>
          </div>

          {/* Menus & Locations */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4 font-mono">
              Menus &amp; Specialties
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/menu')} className="hover:text-amber-400 transition cursor-pointer text-amber-400 font-medium">
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
                <button onClick={() => navigate('/locations')} className="hover:text-amber-400 transition cursor-pointer text-neutral-400">
                  Location &amp; Hiking Trail Approaches
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
                  Banquet Hall &amp; Wedding Catering
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tasting-menu')} className="hover:text-amber-400 transition cursor-pointer">
                  Executive Chef Tasting Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-amber-400 transition cursor-pointer">
                  Restaurant Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-amber-400 transition cursor-pointer text-neutral-400">
                  Gastronomy Blog &amp; Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4 font-mono">
              Location &amp; Contact
            </h4>
            
            <div className="p-3 bg-neutral-950 rounded-xl border border-emerald-500/30 space-y-1.5">
              <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase block">
                Margalla Hills Restaurant &bull; Islamabad
              </span>
              <p className="text-[11px] text-neutral-300">Pir Sohawa Road, Margalla Ridge, Islamabad, Pakistan</p>
              <div className="pt-1 space-y-1">
                <a
                  href="https://wa.me/923294785579?text=Hello%20Margalla%20Hills%2C%20I%20would%20like%20to%20reserve%20a%20table%20or%20order%20food."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-mono text-xs hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>WhatsApp: +92 329 4785579</span>
                </a>
                <a href="tel:+92512821122" className="text-amber-400 font-mono text-xs hover:underline block">
                  Landline: +92 51 282 1122
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Margalla Hills Restaurant &amp; Resort. Pir Sohawa Road, Islamabad, Pakistan.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => navigate('/locations')} className="hover:text-amber-400 transition">Location Map</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/about')} className="hover:text-amber-400 transition">About Us</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/menu')} className="hover:text-neutral-300 transition">Menu (400+)</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/blog')} className="hover:text-amber-400 transition">Blog</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
