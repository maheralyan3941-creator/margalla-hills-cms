import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CITIES_DATA, CityCateringData } from '../data/citiesData';
import {
  MapPin,
  Users,
  Utensils,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  Award,
  Sparkles,
  ArrowRight,
  Building,
  Flame,
  Wine,
  Calendar
} from 'lucide-react';

interface ProgrammaticCateringPageProps {
  citySlug: string;
  navigate: (path: string) => void;
}

export function ProgrammaticCateringPage({ citySlug, navigate }: ProgrammaticCateringPageProps) {
  const city: CityCateringData = CITIES_DATA[citySlug] || CITIES_DATA['new-york'];

  const cateringSEO = {
    seoTitle: `Artisanal Saffron Event Catering in ${city.name} | Saffron & Sage`,
    metaDescription: `Premier Himalayan and royal Kashmiri catering in ${city.name} (${city.country}). Wood-fired tandoor carts, saffron biryanis & sommelier service for ${city.guestCountCapacity}.`,
    slug: `catering/${city.slug}`,
    focusKeyword: `saffron catering ${city.name.toLowerCase()}`,
    secondaryKeywords: [
      `gourmet event catering ${city.name.toLowerCase()}`,
      `luxury wedding catering ${city.name.toLowerCase()}`,
      `corporate dining ${city.name.toLowerCase()}`,
      `private chef ${city.name.toLowerCase()}`
    ],
    canonicalUrl: `/catering/${city.slug}`,
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: `Artisanal Saffron Catering in ${city.name} - Saffron & Sage`,
    ogDescription: `Luxury culinary catering in ${city.name}. Bespoke menus, live tandoor stations, and private sommelier service.`,
    ogImage: city.heroImage,
    schemaType: 'Service' as const,
    searchIntent: 'Transactional' as const
  };

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Artisanal Himalayan & Saffron Event Catering',
    provider: {
      '@type': 'Restaurant',
      name: 'Saffron & Sage Artisanal Kitchen'
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'Country',
        name: city.country
      }
    },
    description: `Full-service luxury banquet and event catering in ${city.name} featuring single-origin Kashmiri saffron dishes.`
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqList.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const auditContent = `# Artisanal Saffron Catering in ${city.name} (${city.country})
Full-service catering for luxury weddings, corporate banquets, and private dinner parties in ${city.name}.
Guest Capacity: ${city.guestCountCapacity}.
## Local Operations & Venues
${city.localHighlights}
Popular Local Venues: ${city.popularVenues.join(', ')}
## Frequently Asked Questions
${city.faqList.map(f => `### ${f.q}\n${f.a}`).join('\n')}`;

  const allCityEntries = Object.values(CITIES_DATA);

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={cateringSEO}
        schemaData={[schemaService, schemaFAQ]}
        contentForAudit={auditContent}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-amber-400 cursor-pointer">Home</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><button onClick={() => navigate('/locations')} className="hover:text-amber-400 cursor-pointer">Locations &amp; Catering</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold">{city.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Metropolitan Event Catering &bull; {city.country}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Artisanal Saffron Catering in {city.name}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed">
                {city.localHighlights}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-slate-500 block text-[10px] uppercase">Capacity</span>
                  <span className="text-amber-400 font-semibold">{city.guestCountCapacity}</span>
                </div>
                <div className="p-3.5 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-slate-500 block text-[10px] uppercase">Live Tandoor</span>
                  <span className="text-emerald-400 font-semibold">{city.liveTandoorAvailable ? 'Available' : 'On Request'}</span>
                </div>
                <div className="p-3.5 bg-black/60 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px] uppercase">Sommelier</span>
                  <span className="text-white font-semibold">{city.privateSommelierService ? 'Grand Cru Service' : 'Curated Mocktails'}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3.5 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Request {city.name} Catering Proposal
                </button>
                <button
                  onClick={() => navigate('/menu')}
                  className="px-6 py-3.5 rounded-full bg-black/60 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition cursor-pointer"
                >
                  View Banquet Dishes
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
                <img
                  src={city.heroImage}
                  alt={`Saffron catering in ${city.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-300 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-amber-400 font-semibold">{city.name} Logistics Hub</span>
                  <span className="text-slate-400">White-Glove Staffing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Venues & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Preferred Venues */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-500" />
                <span>Featured Partner Venues in {city.name}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Our culinary brigades operate with established staging protocols at premier luxury venues across {city.name}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {city.popularVenues.map((venue, idx) => (
                  <div key={idx} className="p-3.5 bg-black/50 rounded-xl border border-white/5 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-medium">{venue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-serif font-bold text-white">
                Frequently Asked Questions &bull; {city.name}
              </h2>
              <div className="space-y-4">
                {city.faqList.map((faq, i) => (
                  <div key={i} className="p-4 bg-black/50 rounded-xl border border-white/5 space-y-2">
                    <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: All Other Catering Cities */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider text-amber-400">
                Global Catering Hubs (25+ Cities)
              </h3>
              <p className="text-xs text-slate-400">
                Select another metropolitan region for local banquet logistics:
              </p>
              <div className="max-h-[400px] overflow-y-auto space-y-1.5 pr-1 font-mono text-xs scrollbar-thin">
                {allCityEntries.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => navigate(`/catering/${c.slug}`)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between cursor-pointer ${
                      c.slug === city.slug
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-black/40 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] opacity-70">{c.region}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
