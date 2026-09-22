import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Award, Heart, Users, MapPin, CheckCircle, Utensils, Sparkles, Compass, Flame, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export function AboutPage({ navigate }: AboutPageProps) {
  const aboutSEO = {
    seoTitle: 'About Us & Culinary Heritage | Margalla Hills Islamabad',
    metaDescription: 'Discover the story of Margalla Hills: Islamabad premier luxury hilltop restaurant & resort, authentic charcoal BBQ, Shinwari karahi traditions, and master culinary craft.',
    slug: 'about',
    focusKeyword: 'about margalla hills islamabad',
    secondaryKeywords: ['margalla hills restaurant history', 'hilltop dining islamabad', 'shinwari karahi masters margalla'],
    canonicalUrl: '/about',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'About Margalla Hills Luxury Restaurant & Resort',
    ogDescription: 'Panoramic mountain ridge dining, authentic Pakistani live grill sciences, and hospitality excellence in Islamabad.',
    ogImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'AboutPage' as const,
    searchIntent: 'Informational' as const
  };

  const schemaAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Margalla Hills Luxury Dining & Resort',
    description: 'High-altitude gastronomy, live charcoal grill masters, and authentic Pakistani culinary heritage overlooking Islamabad.',
    mainEntity: {
      '@type': 'Restaurant',
      name: 'Margalla Hills Restaurant & Resort',
      servesCuisine: 'Authentic Pakistani, Shinwari, Live BBQ, Continental',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Margalla Ridge Highway, Trail 3 Summit',
        addressLocality: 'Islamabad',
        addressCountry: 'PK'
      }
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen py-16">
      <SEOHead
        seo={aboutSEO}
        schemaData={schemaAbout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-semibold tracking-wider uppercase font-sans">
            <Heart className="w-3.5 h-3.5" />
            <span>Hospitality &bull; Mountain Heritage &bull; Gastronomy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            The Pinnacle of Hilltop Gastronomy in Islamabad
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed font-sans font-light">
            Perched atop the lush Margalla Ridge, Margalla Hills was established with a clear commitment: bringing the finest Pakistani culinary arts, live charcoal barbecue, and royal hospitality together with breathtaking views of the capital city.
          </p>
        </div>

        {/* Dual Pillar Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-bold text-[#CCFF00] uppercase tracking-[0.25em] font-sans">
              Authentic Mountain Traditions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-snug">
              Live Charcoal Sigri Grills &amp; Shinwari Clay-Pot Heritage
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              Every dish at Margalla Hills is cooked over live fruitwood charcoals and seasoned with mountain herbs sourced from the Khyber valleys and Kashmir foothills. Our Shinwari Karahis rely strictly on organic mutton, ripe Peshawari tomatoes, green chilies, and rendered lamb fat—without artificial tenderizers or adulterated pastes.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              From our morning high-tea overlooking morning fog to twilight dinners with Islamabad city lights glittering 1,000 meters below, we create moments that remain etched in memory.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[#121417] rounded-2xl border border-neutral-800">
                <div className="text-3xl font-serif font-bold text-[#CCFF00]">400+</div>
                <div className="text-xs text-neutral-400 mt-1">Fresh Culinary Creations</div>
              </div>
              <div className="p-5 bg-[#121417] rounded-2xl border border-neutral-800">
                <div className="text-3xl font-serif font-bold text-[#CCFF00]">100%</div>
                <div className="text-xs text-neutral-400 mt-1">Live Fruitwood Barbecue</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 bg-[#121417]">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Panoramic mountain dining terrace at Margalla Hills"
              className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Executive Culinary Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 bg-[#121417] rounded-3xl border border-neutral-800/80">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Executive Chef Tariq Shinwari"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>Master Culinary Direction</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Executive Chef Tariq Shinwari
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              With over 24 years of master craftsmanship leading top banquet kitchens and traditional barbecue pits across Peshawar, Lahore, and Islamabad, Chef Tariq ensures absolute consistency, fiery aromatic excellence, and unmatched hygiene across all 400+ recipes.
            </p>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              "True Pakistani cuisine is not about overwhelming sauces—it is about respecting the primal heat of wood coals, fresh meat cuts, and the purity of real butter and whole roasted cumin."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Punjab Food Authority Grade-A Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Prime Minister Hospitality Delegation Chef</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Himalayan Mountain Spice Guild Member</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Over 1,500+ Luxury Banquets Curated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Trust & Hospitality Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#121417] border border-neutral-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Uncompromising Hygiene</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Strict cold-chain logistics for premium meats, filtered mountain spring water stations, and stainless-steel prep zones meeting ISO 22000 standards.
            </p>
          </div>

          <div className="p-8 bg-[#121417] border border-neutral-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Tailored Hospitality</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Whether reserving a private gazebo for an anniversary or hosting a 500-guest corporate tech summit, our event coordinators handle every detail.
            </p>
          </div>

          <div className="p-8 bg-[#121417] border border-neutral-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Trail Access &amp; Valet</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Convenient vehicle approach via Margalla Ridge Road, dedicated 150-car secure parking, complimentary valet, and direct Trail 3 / Trail 5 connection.
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-neutral-800 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Experience the Ridge First-Hand
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Book your table or plan your corporate dinner with our reservation concierges today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all cursor-pointer"
            >
              Book Table &amp; Events
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer"
            >
              Explore Full Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
