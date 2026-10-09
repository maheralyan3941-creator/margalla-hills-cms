import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Compass,
  Star,
  Globe,
  Search,
  CheckCircle,
  Copy,
  Check,
  Code,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Share2,
  MessageCircle,
  Tag
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { GLOBAL_LOCATIONS, GlobalLocation } from '../data/globalLocations';

interface LocationsPageProps {
  navigate: (path: string) => void;
}

export function LocationsPage({ navigate }: LocationsPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const locationsSEO = {
    seoTitle: 'Location, Pir Sohawa Road & Hiking Trail Access | Margalla Hills Restaurant Islamabad',
    metaDescription: 'Find directions, GPS coordinates, Trail 3 & 5 access, and hilltop parking for Margalla Hills Restaurant along Pir Sohawa Road, Islamabad.',
    slug: 'locations',
    focusKeyword: 'margalla hills restaurant islamabad location',
    secondaryKeywords: ['pir sohawa restaurant', 'daman-e-koh dining', 'margalla hills bbq restaurant', 'islamabad hilltop restaurant'],
    canonicalUrl: '/locations',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Location & Mountain Dining Access | Margalla Hills Islamabad',
    ogDescription: 'Find directions, GPS coordinates, Trail 3 & 5 access, and hilltop parking for Margalla Hills Restaurant along Pir Sohawa Road, Islamabad.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'LocalBusiness' as const,
    searchIntent: 'Navigational' as const
  };

  const regions = [
    'All',
    'Hilltop Terraces',
    'Pir Sohawa Road',
    'Margalla Ridge',
    'Twin Cities Delivery'
  ];

  const filteredLocations = useMemo(() => {
    return GLOBAL_LOCATIONS.filter((loc) => {
      const matchesRegion = selectedRegion === 'All' || loc.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        loc.city.toLowerCase().includes(q) ||
        loc.country.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q) ||
        loc.localSeoKeywords.some((k) => k.toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen">
      <SEOHead seo={locationsSEO} />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 overflow-hidden bg-gradient-to-b from-[#141416] via-[#0D0D0E] to-[#0A0A0A]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pir Sohawa Road &bull; Margalla Hills Islamabad</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Location, Directions &amp; Mountain Terraces
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Perched atop the pine-covered ridgelines along <strong className="text-emerald-400 font-semibold">Pir Sohawa Road, Islamabad</strong>, Margalla Hills offers breathtaking panoramic views of the federal capital, live charcoal barbecue, Shinwari karahi, and secluded family dining terraces.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-neutral-800 text-center">
              <span className="text-2xl font-serif font-bold text-amber-400 block">400+</span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Dishes &amp; BBQ</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-neutral-800 text-center">
              <span className="text-2xl font-serif font-bold text-emerald-400 block">Pir Sohawa</span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Margalla Ridge</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-neutral-800 text-center">
              <span className="text-2xl font-serif font-bold text-white block">Daily</span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">11:00 AM - 1:00 AM</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-neutral-800 text-center">
              <span className="text-2xl font-serif font-bold text-blue-400 block">Free</span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Valet Parking</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED RESTAURANT SANCTUARY: ISLAMABAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Hilltop Restaurant Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0e1c14] via-[#0f1412] to-[#0d0d0e] border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden group">
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-black font-bold text-[10px] font-mono uppercase tracking-wider rounded-full shadow-lg">
              Hilltop Flagship Sanctuary
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                <Compass className="w-4 h-4" />
                <span>Margalla Hills Ridge &bull; Islamabad</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-emerald-300 transition">
                Pir Sohawa Road Panoramic Restaurant
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Perched high on the pine ridgeline above Islamabad overlooking Daman-e-Koh and the city lights. Wood-fired clay tandoors, authentic live charcoal barbecue, Shinwari karahi, and private family pavilions.
              </p>

              <div className="space-y-2 text-xs text-neutral-400 font-mono pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-neutral-200">Pir Sohawa Road, Margalla Ridge, Islamabad, 44000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="tel:+923294785579" className="text-emerald-400 font-bold hover:underline">+92 329 4785579</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Daily: 11:00 AM - 1:00 AM (Dine-in, Open Air &amp; Takeaway)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-serif font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                >
                  Reserve Hillside Table
                </button>
                <a
                  href="https://wa.me/923294785579?text=Hello%20Margalla%20Hills%2C%20I%20want%20to%20reserve%20a%20table%20or%20get%20directions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-black/60 hover:bg-neutral-800 text-emerald-300 text-xs font-mono rounded-xl border border-emerald-700/50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Hiking Trails & Approach Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1c160e] via-[#14120f] to-[#0d0d0e] border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden group">
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-black font-bold text-[10px] font-mono uppercase tracking-wider rounded-full shadow-lg">
              Hiking Trail &amp; Road Access
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Trail 3 &bull; Trail 5 &bull; Scenic Road</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-300 transition">
                Scenic Mountain Drive &amp; Trailhead Approach
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Accessible via a smooth 25-minute drive from Sector F-6 and Islamabad Blue Area past Daman-e-Koh. Popular stop for hikers summiting from Trail 3 and Trail 5 looking for hot karahi and scenic refreshments.
              </p>

              <div className="space-y-2 text-xs text-neutral-400 font-mono pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-neutral-200">25 Mins from F-6 Markaz / Faisal Mosque via Pir Sohawa Rd</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href="tel:+92512821122" className="text-amber-400 font-bold hover:underline">+92 51 282 1122</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Ample Dedicated Parking with Valet Service</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/menu')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-serif font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                >
                  Explore 400+ Menu
                </button>
                <button
                  onClick={() => navigate('/deals')}
                  className="px-4 py-2.5 bg-black/60 hover:bg-neutral-800 text-neutral-300 text-xs font-mono rounded-xl border border-neutral-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Family Deals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trails, terraces, or directions (e.g. Trail 3, Pir Sohawa)..."
                className="w-full pl-10 pr-4 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* Results Count Badge */}
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Showing <strong className="text-white">{filteredLocations.length}</strong> of {GLOBAL_LOCATIONS.length} Sanctuaries in 50+ Countries
              </span>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'bg-black/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS GRID (50+ COUNTRIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredLocations.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-black/40 border border-neutral-800 space-y-3">
            <Globe className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-sm text-neutral-400">
              No sanctuaries found matching &quot;{searchQuery}&quot; in {selectedRegion}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                className="bg-[#111111] rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Image & Badges */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={loc.image}
                    alt={`${loc.city} ${loc.country} Luxury Restaurant`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 bg-black/80 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-mono rounded-full">
                      {loc.countryCode} &bull; {loc.country}
                    </span>
                    {loc.isGlobalFlagship && (
                      <span className="px-2.5 py-0.5 bg-amber-500 text-black font-bold text-[10px] font-mono rounded-full">
                        Global Flagship
                      </span>
                    )}
                    {loc.isHeritageSanctuary && (
                      <span className="px-2.5 py-0.5 bg-emerald-500 text-black font-bold text-[10px] font-mono rounded-full">
                        Heritage Sanctuary
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-mono text-amber-400 block">{loc.district}</span>
                    <h3 className="text-xl font-serif font-bold text-white truncate">
                      {loc.city}, {loc.country}
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 text-xs text-neutral-300 font-sans">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 text-neutral-400">{loc.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="hover:text-white font-mono text-xs">
                        {loc.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px] text-neutral-400">{loc.hours}</span>
                    </div>

                    {/* Features Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {loc.features.slice(0, 2).map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
                    <button
                      onClick={() => navigate('/contact')}
                      className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-serif font-bold rounded-xl transition cursor-pointer shadow"
                    >
                      Reserve Table
                    </button>

                    <a
                      href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                      title={`Call ${loc.city} branch`}
                      className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl border border-neutral-800 transition cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GLOBAL CONCIERGE ASSISTANCE BANNER */}
      <section className="bg-[#111111] border-t border-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
              <Compass className="w-4 h-4" />
              <span>Global Private Hire &amp; Diplomatic Enclaves</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Visiting Our Sanctuaries in 50+ Countries?
            </h3>
            <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
              Our international guest relations desk coordinates royal tables, private helicopter arrivals, custom Kashmiri Wazwan banquets, and dietary allocations across all global territories.
            </p>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-serif font-bold text-xs uppercase tracking-wider rounded-xl transition shrink-0 cursor-pointer shadow-md"
          >
            Contact Global Concierge
          </button>
        </div>
      </section>
    </div>
  );
}
