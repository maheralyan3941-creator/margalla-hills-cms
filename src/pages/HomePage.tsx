import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { MenuItem } from '../types';
import { api } from '../lib/api';
import { EXPANDED_CATEGORIES, EXPANDED_MENU_ITEMS } from '../data/expandedMenuItems';
import {
  Utensils,
  UtensilsCrossed,
  Sparkles,
  CalendarCheck,
  MapPin,
  ChevronRight,
  Flame,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Tag,
  Clock,
  Users,
  Star,
  Award,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
  featuredDishes?: MenuItem[];
}

export function HomePage({ navigate }: HomePageProps) {
  const [allDishes, setAllDishes] = useState<MenuItem[]>(EXPANDED_MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('deals');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    api.getMenuItems()
      .then(items => {
        if (items && items.length > 0) setAllDishes(items);
      })
      .catch(() => {});
  }, []);

  const homeSEO = {
    seoTitle: 'Margalla Hills | Luxury Dining, 400+ Dishes & Value Deals Under $15',
    metaDescription: 'Welcome to Margalla Hills Restaurant & Resort, Islamabad. Over 400+ fresh dishes, charcoal BBQ, handis, pizzas, and exclusive deals under $15 with panoramic mountain views.',
    slug: '',
    focusKeyword: 'margalla hills restaurant',
    secondaryKeywords: ['margalla hills dining', 'best food islamabad under 15', 'islamabad hillside restaurant'],
    canonicalUrl: '/',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Margalla Hills | Luxury Hilltop Dining & Resort',
    ogDescription: 'Panoramic Margalla views, 400+ dishes under $15, live charcoal BBQ, and exclusive family deals.',
    ogImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Restaurant' as const,
    searchIntent: 'Navigational' as const
  };

  const schemaRestaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Margalla Hills Restaurant & Resort',
    description: 'Premier hilltop dining destination in Islamabad featuring over 400+ authentic dishes, live charcoal BBQ, fresh handis, and family deals under $15.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    servesCuisine: ['Pakistani Desi Karahi', 'Charcoal BBQ', 'Continental Steaks', 'Wood-Fired Pizza', 'Fast Food'],
    priceRange: '$$ (All dishes $15 max)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pir Sohawa Road, Margalla Hills',
      addressLocality: 'Islamabad',
      addressRegion: 'ICT',
      postalCode: '44000',
      addressCountry: 'PK'
    },
    telephone: '+92512800000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '01:00'
      }
    ],
    menu: '/menu'
  };

  const diningZones = [
    {
      name: 'Hilltop Panoramic Terrace',
      description: 'Open-air dining overlooking the sparkling night lights of Islamabad and surrounding Margalla peaks.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      capacity: '120 Guests'
    },
    {
      name: 'Executive Family Gazebos',
      description: 'Private enclosed wooden gazebos nestled amidst pine trees for relaxed family gatherings.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      capacity: '8 to 16 Guests'
    },
    {
      name: 'Royal Heritage Indoor Hall',
      description: 'Climate-controlled luxury lounge with traditional artisanal craftsmanship and ambient lighting.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      capacity: '90 Guests'
    },
    {
      name: 'Sunset Lawn Deck',
      description: 'Expansive natural grassy lawn with live acoustic evenings and live open BBQ counters.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      capacity: '150 Guests'
    }
  ];

  const faqs = [
    {
      q: 'Are all dishes and deals really capped under $15?',
      a: 'Yes! At Margalla Hills, our entire menu of 400+ dishes — including our hearty family feast platters, mutton handis, steaks, and pizzas — is strictly priced at or below $15, giving you exceptional value for money.'
    },
    {
      q: 'How can I order food or exclusive deals?',
      a: 'Simply click the green WhatsApp button next to any dish or combo deal. Your order inquiry is sent directly to our official WhatsApp desk for instant confirmation.'
    },
    {
      q: 'Is outdoor seating available for scenic sunset views?',
      a: 'Yes! We have an expansive Hilltop Panoramic Terrace with breathtaking sunset views over Islamabad.'
    },
    {
      q: 'Do you offer family-friendly private seating?',
      a: 'Absolutely. We feature private family gazebos, an indoor luxury lounge, and open lawns with safe play spaces for children.'
    }
  ];

  // Top deals to showcase
  const dealsList = allDishes.filter(d => d.category === 'deals').slice(0, 6);
  const currentCategoryDishes = allDishes.filter(d => d.category === activeCategory).slice(0, 8);

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen selection:bg-amber-500 selection:text-black">
      <SEOHead seo={homeSEO} schemaData={schemaRestaurant} />

      {/* 2. Hero Section - Simple, Clean text under Margalla Hills */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Margalla Hills Hilltop Dining"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-7">
          {/* Simple Clean Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Islamabad's Premier Hilltop Dining &bull; Fresh Flavors &bull; 400+ Dishes</span>
          </div>

          {/* Clean Margalla Hills Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-4xl mx-auto leading-none">
            Margalla Hills
          </h1>

          {/* Simple, Non-Heavy Subtitle under Margalla Hills */}
          <p className="text-lg sm:text-2xl font-serif italic text-amber-300 font-normal max-w-2xl mx-auto">
            Luxury Dining, Fresh Mountain Flavors &amp; Panoramic Views
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
            Welcome to Margalla Hills Restaurant &amp; Resort in Islamabad. Enjoy over 400+ fresh dishes, sizzling charcoal BBQ, authentic handis, pizzas, and special value deals — all strictly capped under $15 with picturesque hilltop scenery.
          </p>

          {/* Action CTAs: Explore Menu and View Deals */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-serif font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl transition-all shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center gap-3 cursor-pointer hover:scale-105 border-2 border-amber-300"
            >
              <Utensils className="w-5 h-5 text-black" />
              <span>EXPLORE 400+ DISHES MENU</span>
            </button>

            <button
              onClick={() => navigate('/deals')}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900/90 hover:bg-neutral-800 border-2 border-amber-500/50 hover:border-amber-400 text-amber-300 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <Tag className="w-5 h-5 text-amber-400" />
              <span>VIEW DEALS (UNDER $15)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 🔥 Top Value Deals Showcase (All Under $15) */}
      <section className="py-20 border-b border-neutral-800 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest mb-1.5">
                <Tag className="w-4 h-4" />
                <span>Chef Curated Value Deals</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Exclusive Deals &amp; Combos (Max $15)
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Generous portions designed for families, couples, and food lovers — guaranteed premium quality at unbeatable prices.
              </p>
            </div>

            <button
              onClick={() => navigate('/deals')}
              className="px-5 py-2.5 rounded-full border border-neutral-700 hover:border-amber-400 text-neutral-300 hover:text-white text-xs uppercase tracking-widest font-serif transition shrink-0 flex items-center gap-2"
            >
              <span>Explore All 20+ Deals</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealsList.map((deal) => (
              <div
                key={deal.id}
                className="bg-[#141414] rounded-2xl border border-neutral-800 hover:border-amber-500/50 p-5 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-black/85 text-amber-400 font-mono font-bold text-sm border border-amber-500/40 shadow-md">
                      ${deal.price.toFixed(2)}
                    </div>
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-amber-500 text-black font-mono font-bold text-[10px] uppercase">
                      Special Value Deal
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition mb-2">
                    {deal.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                    {deal.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {deal.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    Max Rate: Under $15
                  </span>
                  <a
                    href={`https://wa.me/923294785579?text=${encodeURIComponent(`Hello Margalla Hills, I would like to order / reserve the "${deal.name}" ($${deal.price.toFixed(2)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Order Deal on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 🍽️ 400+ Dishes Interactive Menu Explorer */}
      <section className="py-20 border-b border-neutral-800 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Utensils className="w-4 h-4" />
              <span>Full Hillside Culinary Menu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Over 400+ Fresh Dishes
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              From clay-pot mutton handis and live charcoal BBQ to stone-baked pizzas and artisan steaks — every single dish is capped at $15 maximum!
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
            {EXPANDED_CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.slug
                    ? 'bg-amber-500 text-black shadow-lg scale-105'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentCategoryDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => navigate(`/menu/${dish.category}/${dish.slug}`)}
                className="bg-[#121212] rounded-2xl border border-neutral-800 hover:border-amber-500/50 p-4 flex flex-col justify-between hover:shadow-xl transition-all group cursor-pointer"
              >
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/85 text-amber-400 font-mono font-bold text-xs border border-amber-500/30">
                      ${dish.price.toFixed(2)}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-amber-500 uppercase block mb-1">
                    {dish.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-1 mb-1">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <span className="text-neutral-500 font-mono text-[11px]">
                    {dish.preparationTimeMinutes || 20}m prep
                  </span>
                  <a
                    href={`https://wa.me/923294785579?text=${encodeURIComponent(`Hello Margalla Hills, I would like to order "${dish.name}" ($${dish.price.toFixed(2)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-[11px] rounded-lg flex items-center gap-1.5 transition shadow-sm cursor-pointer hover:scale-105"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/menu')}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-serif font-bold text-xs uppercase tracking-widest rounded-full transition shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Complete 400+ Dishes Menu Catalog</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Margalla Hills Scenic Dining Zones */}
      <section className="py-20 border-b border-neutral-800 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>Hillside Atmospheres</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Scenic Dining Zones
            </h2>
            <p className="text-neutral-400 text-xs">
              Choose your ideal dining ambiance overlooking the breathtaking Margalla peaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diningZones.map((zone, idx) => (
              <div
                key={idx}
                className="bg-[#141414] rounded-2xl border border-neutral-800 overflow-hidden group hover:border-amber-500/50 transition-all"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-amber-400 font-mono text-[10px] font-bold">
                    {zone.capacity}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guest Reviews & Reputation */}
      <section className="py-20 border-b border-neutral-800 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-amber-400 text-xs font-mono uppercase tracking-widest block">Guest Experiences</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Loved by Families &amp; Food Enthusiasts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] p-6 rounded-2xl border border-neutral-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                "The Balochi Karahi and live BBQ platter were extraordinary. Sitting on the terrace at sunset with the Islamabad skyline view is an experience like no other!"
              </p>
              <div className="pt-3 border-t border-neutral-800">
                <span className="font-bold text-white text-xs block">Hamza Tariq</span>
                <span className="text-[10px] text-neutral-500 font-mono uppercase">Family Dinner &bull; Islamabad</span>
              </div>
            </div>

            <div className="bg-[#141414] p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-lg">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                "Finding 400+ dishes on a menu where literally everything is under $15 is incredible. The Margalla Hillside Sunset Deal was massive and delicious."
              </p>
              <div className="pt-3 border-t border-neutral-800">
                <span className="font-bold text-white text-xs block">Dr. Ayesha Malik</span>
                <span className="text-[10px] text-amber-400 font-mono uppercase">Weekend Brunch &bull; Rawalpindi</span>
              </div>
            </div>

            <div className="bg-[#141414] p-6 rounded-2xl border border-neutral-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                "Direct table reservation through WhatsApp was super fast. Staff had our outdoor gazebo ready right when we arrived. Top-notch service!"
              </p>
              <div className="pt-3 border-t border-neutral-800">
                <span className="font-bold text-white text-xs block">Usman Qureshi</span>
                <span className="text-[10px] text-neutral-500 font-mono uppercase">Corporate Event &bull; Islamabad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="py-20 border-b border-neutral-800 bg-[#0F0F0F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-amber-400 text-xs font-mono uppercase tracking-widest block">Inquiries</span>
            <h2 className="font-serif text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = activeFaqIndex === i;
              return (
                <div
                  key={i}
                  className="bg-[#141414] border border-neutral-800 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-sm text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Food & Deals Final Showcase */}
      <section className="py-16 bg-gradient-to-b from-[#0F0F0F] to-[#080808] text-center border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Over 400+ Handcrafted Dishes &bull; Guaranteed Under $15</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            Craving Fresh Hillside Flavors?
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto">
            Explore our extensive 400+ dish menu catalog or indulge in chef-curated family deals, charcoal BBQ, and clay-pot handis.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-serif font-black text-sm uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2.5 border border-amber-300 cursor-pointer hover:scale-105"
            >
              <UtensilsCrossed className="w-5 h-5 text-black" />
              <span>EXPLORE COMPLETE MENU</span>
            </button>

            <button
              onClick={() => navigate('/deals')}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-serif font-bold text-sm uppercase tracking-wider rounded-xl transition border border-amber-500/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <Tag className="w-5 h-5 text-amber-400" />
              <span>EXPLORE VALUE DEALS</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
