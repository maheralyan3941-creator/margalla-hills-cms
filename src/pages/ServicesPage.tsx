import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { 
  Utensils, 
  Users, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  Flame, 
  Award, 
  ShieldCheck, 
  Clock, 
  Building2, 
  HeartHandshake, 
  Coffee,
  ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export function ServicesPage({ navigate }: ServicesPageProps) {
  const [guestCount, setGuestCount] = useState<number>(50);
  const [eventType, setEventType] = useState<string>('corporate');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['live_bbq', 'sound_system']);

  const services = [
    {
      id: 'hilltop-dining',
      title: 'Scenic Hilltop Dining & Family Terraces',
      tag: 'Most Popular',
      desc: 'Dine high above Islamabad with breathtaking views of the city lights and mountain breeze. Over 400 authentic Pakistani, Shinwari Karahi, live charcoal BBQ, and continental specialties.',
      features: [
        'Open-air mountain breeze terrace seating',
        'Over 400 freshly prepared dishes & family platters',
        'Dedicated family privacy areas & children play zone',
        'Live instrumental and ambient acoustic atmosphere'
      ],
      price: 'Starting from $6 / person (PKR 1,650)',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      actionText: 'Reserve Table',
      actionPath: '/contact'
    },
    {
      id: 'corporate-banquets',
      title: 'Corporate Dinners & Diplomatic Banquets',
      tag: 'Executive Choice',
      desc: 'Host high-profile seminars, executive board dinners, diplomat retreats, and tech team celebrations with full audio-visual support, projector screens, and bespoke buffet spreads.',
      features: [
        'Executive air-conditioned hall with 4K AV projection',
        'Custom corporate buffets & multi-course executive menus',
        'Dedicated event coordinator and VIP hospitality staff',
        'Official corporate GST invoices and flexible billing'
      ],
      price: 'Custom packages from $12 / guest',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      actionText: 'Inquire Corporate Booking',
      actionPath: '/contact'
    },
    {
      id: 'luxury-wedding-catering',
      title: 'Wedding & Engagement Banquet Catering',
      tag: 'Premium Luxury',
      desc: 'Turn your Mehndi, Barat, Walima, or Qawwali night into an unforgettable celebration. Full-scale on-site or off-site catering across Islamabad, Rawalpindi, and scenic Margalla lawns.',
      features: [
        'Live Shinwari wok stations & charcoal Sigri BBQ counters',
        'Traditional Kashmiri saffron Chai & artisanal dessert carts',
        'Royal marquee setups, floral arches, and thematic cutlery',
        'Comprehensive service staff, uniformed butlers, and managers'
      ],
      price: 'Tailored wedding menus from $14 / guest',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      actionText: 'Get Wedding Proposal',
      actionPath: '/contact'
    },
    {
      id: 'private-vip-terraces',
      title: 'Private VIP Gazebos & Candlelight Dinners',
      tag: 'Exclusive VIP',
      desc: 'Secluded hilltop gazebos designed for anniversaries, private family gatherings, and romantic sunset dinners with panoramic valley views and personal butler service.',
      features: [
        '100% private secluded terrace overlooking Islamabad city lights',
        'Personal butler & dedicated executive chef service',
        'Customized candle-lit table decor and floral arrangements',
        'Personalized dessert presentation with sparklers'
      ],
      price: 'VIP Terrace reservation: $35 fixed + a la carte',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      actionText: 'Book VIP Terrace',
      actionPath: '/private-dining'
    },
    {
      id: 'live-bbq-catering',
      title: 'Live On-Site Charcoal BBQ & Wok Stations',
      tag: 'Live Culinary Show',
      desc: 'Bring the iconic Margalla Hills aroma to your home or farm house! Our master grill-masters arrive with charcoal pits and copper woks to grill fresh skewers right in front of your guests.',
      features: [
        'Live charcoal Sigri grills, sajji pits, and Balochi tikka',
        'Shinwari sheep fat & organic tomato dum karahi woks',
        'Freshly baked tandoori naan and garlic kulchas on wheels',
        'Zero-hassle setup and complete post-event cleanup'
      ],
      price: 'Per-head packages starting from $9 / person',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      actionText: 'Book Live BBQ Station',
      actionPath: '/contact'
    },
    {
      id: 'hiking-sunset-hightea',
      title: 'Trail 3 & 5 Hikers Breakfast & Sunset High-Tea',
      tag: 'Outdoor Adventure',
      desc: 'Recharge after conquering the famous Margalla Trail 3 or Trail 5! Enjoy fresh organic herbal teas, mountain honey parathas, artisanal sandwiches, and hot kahwa as the sun sets over the ridge.',
      features: [
        'Early morning 7:00 AM breakfast for weekend trail hikers',
        'Fresh pomegranate juice, lassi, and organic wild honey',
        'Panoramic high-tea tier platters from 4:00 PM to 7:00 PM',
        'Secure gear storage and clean mountain spring refresh zone'
      ],
      price: 'High-Tea Platter for Two: $14 (PKR 3,900)',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      actionText: 'Explore Deals & Menus',
      actionPath: '/deals'
    }
  ];

  // Pricing calculation helper
  const baseRate = eventType === 'corporate' ? 12 : eventType === 'wedding' ? 15 : 9;
  const addonCost = selectedAddons.length * 2.5;
  const estimatedCost = guestCount * (baseRate + addonCost);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const seoData = {
    seoTitle: 'Hospitality & Catering Services | Margalla Hills Islamabad',
    metaDescription: 'Explore premier hospitality services at Margalla Hills: Hilltop dining, corporate dinners, luxury wedding catering, VIP gazebos, and live BBQ stations in Islamabad.',
    slug: 'services',
    focusKeyword: 'margalla hills catering services',
    secondaryKeywords: ['islamabad corporate dinner catering', 'wedding catering islamabad', 'private dining margalla hills'],
    canonicalUrl: '/services',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Margalla Hills Luxury Hospitality & Catering Services',
    ogDescription: 'Comprehensive event, catering, and dining solutions on the scenic Margalla Ridge in Islamabad.',
    ogImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Service' as const,
    searchIntent: 'Commercial' as const
  };

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen">
      <SEOHead seo={seoData} />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-neutral-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Hospitality &amp; Event Solutions</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
              Hospitality Services Crafted for Unforgettable Moments
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              From diplomatic banquets and corporate galas to dream weddings and intimate hilltop candlelight dinners, Margalla Hills provides complete turnkey culinary excellence across Islamabad and Rawalpindi.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-lime-400/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Service / Inquire</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <a
                href="https://wa.me/923294785579?text=Hello%20Margalla%20Hills,%20I%20want%20to%20inquire%20about%20your%20catering%20and%20event%20services."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-lime-400/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-lime-400/30 text-lime-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {srv.tag}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {srv.desc}
                  </p>

                  <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                      Included Amenities
                    </span>
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="p-3 bg-black/50 border border-neutral-800 rounded-xl text-center">
                  <span className="text-[11px] font-mono text-lime-300 font-semibold">
                    {srv.price}
                  </span>
                </div>
                <button
                  onClick={() => navigate(srv.actionPath)}
                  className="w-full py-3 bg-neutral-800 hover:bg-lime-400 hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{srv.actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Catering & Event Estimator */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Budget Estimator</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Calculate Your Event or Banquet Package
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Select your event type, expected guest count, and custom live stations. Transparent pricing with zero hidden charges.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Event Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'corporate', label: 'Corporate Dinner', icon: Building2 },
                      { id: 'wedding', label: 'Wedding / Walima', icon: HeartHandshake },
                      { id: 'bbq', label: 'Live BBQ Party', icon: Flame }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEventType(item.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          eventType === item.id
                            ? 'bg-lime-400/10 border-lime-400 text-lime-400'
                            : 'bg-black/40 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      Estimated Guests: <span className="text-white font-mono font-bold text-sm">{guestCount} Persons</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-lime-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                    <span>20 Guests</span>
                    <span>250 Guests</span>
                    <span>500+ Guests</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Optional Live Add-ons
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'live_bbq', label: 'Live Sigri BBQ' },
                      { id: 'sound_system', label: 'Bose Audio System' },
                      { id: 'kashmiri_chai', label: 'Kashmiri Chai & Baklava' },
                      { id: 'valet', label: 'Dedicated Valet Crew' },
                      { id: 'floral', label: 'Hillside Floral Arch' },
                      { id: 'drone_shots', label: 'Photo & Drone Shoot' }
                    ].map((addon) => {
                      const active = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                            active
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                              : 'bg-black/30 border-neutral-800 text-neutral-400'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-neutral-600'}`} />
                          <span>{addon.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Quote Card */}
            <div className="lg:col-span-5 bg-black border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold">
                Estimated Turnkey Package
              </span>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-lime-400 font-mono">
                  ${estimatedCost.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  Approx. PKR {(estimatedCost * 278).toLocaleString()}
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-left text-xs space-y-1.5 text-neutral-300">
                <div className="flex justify-between">
                  <span>Guest Base ({guestCount} pax):</span>
                  <span className="font-mono text-white">${guestCount * baseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Live Add-ons ({selectedAddons.length}):</span>
                  <span className="font-mono text-white">${guestCount * addonCost}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-1 text-lime-400 font-semibold">
                  <span>Per Head Avg:</span>
                  <span className="font-mono">${baseRate + addonCost} / person</span>
                </div>
              </div>

              <a
                href={`https://wa.me/923294785579?text=Hello%20Margalla%20Hills,%20I%20calculated%20an%20estimate%20for%20a%20${eventType}%20event%20with%20${guestCount}%20guests%20and%20addons%20(${selectedAddons.join(',%20')}).%20Approx%20quote:%20$${estimatedCost}.%20Please%20confirm%20date%20availability.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>Confirm This Package on WhatsApp</span>
              </a>
              <p className="text-[10px] text-neutral-500 leading-relaxed">
                Includes setup, service captains, cutlery, buffet tables, and mountain cleanup. Custom tasting sessions available upon confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
