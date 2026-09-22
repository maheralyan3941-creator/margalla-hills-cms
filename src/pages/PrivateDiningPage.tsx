import React from 'react';
import { Users, Award, CalendarCheck, Utensils, Sparkles, CheckCircle, ChevronRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface PrivateDiningPageProps {
  navigate: (path: string) => void;
}

export function PrivateDiningPage({ navigate }: PrivateDiningPageProps) {
  const privateDiningSEO = {
    seoTitle: 'Private Dining Salons & Chef\'s Table Banquets | Saffron & Sage',
    metaDescription: 'Host exclusive private dining events, executive gala dinners, and celebratory receptions in our bespoke salons accommodating 8 to 80 guests.',
    slug: 'private-dining',
    focusKeyword: 'private dining room fine dining',
    secondaryKeywords: ['luxury corporate dinners', 'chefs table private booking', 'michelin private events'],
    canonicalUrl: '/private-dining',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Private Dining Salons & Chef\'s Table | Saffron & Sage',
    ogDescription: 'Bespoke private spaces with dedicated sommelier service, custom tasting menus, and private terrace views.',
    ogImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'ItemPage' as const,
    searchIntent: 'Commercial' as const
  };

  const salons = [
    {
      name: 'The Kashmiri Gold Salon',
      capacity: 'Up to 14 Guests Seated',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'An intimate, sound-isolated sanctuary adorned with handcrafted copper wall installations, antique Himalayan rugs, and dedicated sommelier decanting station.',
      features: ['Dedicated Chef & Sommelier Brigade', 'Custom 8-Course Tasting Menu', 'Bespoke Table Floral Styling', 'Private Pre-Dinner Cocktail Foyer']
    },
    {
      name: 'The Royal Himalayan Pavilion',
      capacity: 'Up to 36 Guests Seated &bull; 50 Cocktail',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      description: 'Featuring soaring ceiling vaults, floor-to-ceiling glass wine walls, and customizable audio-visual capability for executive summit dinners.',
      features: ['Full AV & Presentation Capabilities', 'Private Outdoor Heated Terrace', 'Custom Printed Commemorative Menus', 'Sommelier Champagne Greeting']
    },
    {
      name: 'The Executive Chef\'s Table',
      capacity: 'Up to 8 Guests Seated',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      description: 'Front-row glass partition looking directly into the high-heat tandoor and copper simmering stations. Chef Marcus Sterling introduces each dish tableside.',
      features: ['Interactive Kitchen Observation', 'Off-Menu Secret Test Dishes', 'Rare Vintage Cellar Flight Included', 'Signed Commemorative Apron & Menu']
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen">
      <SEOHead seo={privateDiningSEO} />

      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
            alt="Private Dining Salon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Exclusive Gatherings</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            Private Dining Salons &amp; Banquets
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Elevate executive milestones, intimate weddings, and celebratory family banquets with world-class bespoke hospitality, private sommeliers, and tailor-made menus.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all cursor-pointer hover:scale-105"
            >
              Inquire for Private Event
            </button>
          </div>
        </div>
      </section>

      {/* Salons Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {salons.map((salon, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 bg-[#111111] rounded-3xl border border-neutral-800/80 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="space-y-5">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  {salon.capacity}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {salon.name}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {salon.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-mono">Salon Amenities &amp; Services:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {salon.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-serif uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Request Booking Availability
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl h-80">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
