import React from 'react';
import { WINE_ALLOCATIONS, WineAllocation } from '../data/wineAllocations';
import { SEOHead } from '../components/SEOHead';
import { ChevronRight, Award, Wine, ShieldCheck, Thermometer, GlassWater, ArrowRight, DollarSign, Calendar } from 'lucide-react';

interface WineDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export function WineDetailPage({ slug, navigate }: WineDetailPageProps) {
  const wine: WineAllocation | undefined = WINE_ALLOCATIONS.find(w => w.slug === slug);

  if (!wine) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-24 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <Wine className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-white">Wine Allocation Not Found</h1>
          <p className="text-sm text-slate-400">The vintage allocation you requested is currently not listed in our live cellar catalog.</p>
          <button
            onClick={() => navigate('/wine-cellar')}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition"
          >
            Explore Wine Cellar
          </button>
        </div>
      </div>
    );
  }

  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: wine.name,
    image: wine.image,
    description: wine.tastingNotes,
    brand: {
      '@type': 'Brand',
      name: wine.producer
    },
    offers: {
      '@type': 'Offer',
      price: wine.bottlePrice,
      priceCurrency: 'USD',
      availability: wine.cellarInventory > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };

  const auditContent = `# ${wine.name} (${wine.vintage})
Producer: ${wine.producer}. Region: ${wine.region}, ${wine.country}.
Critic Score: ${wine.criticScore}. ABV: ${wine.alcoholByVolume}.
## Sommelier Tasting Notes
${wine.tastingNotes}
## Curated Food Pairing
${wine.pairingDish.name} - ${wine.pairingDish.reason}
## Drinking Window & Cellar Notes
Optimal drinking window: ${wine.drinkingWindow}. Stored at 55°F subterranean cellar vault.`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={wine.seo}
        schemaData={schemaProduct}
        contentForAudit={auditContent}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-amber-400 cursor-pointer">Home</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><button onClick={() => navigate('/wine-cellar')} className="hover:text-amber-400 cursor-pointer">Wine Cellar</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{wine.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <Wine className="w-3.5 h-3.5" />
                <span>Grand Cru Cellar Allocation</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {wine.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 bg-black/60 rounded border border-white/10 text-emerald-400 font-bold">
                  {wine.criticScore}
                </span>
                <span>{wine.region}, {wine.country}</span>
                <span>&bull;</span>
                <span>ABV: {wine.alcoholByVolume}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-2 font-serif italic">
                "{wine.tastingNotes}"
              </p>

              {/* Price & Cellar Status */}
              <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Bottle Allocation</span>
                  <span className="text-2xl font-serif font-bold text-amber-400">${wine.bottlePrice}</span>
                </div>
                {wine.glassPrice && (
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Coravin Glass (5 oz)</span>
                    <span className="text-xl font-serif font-bold text-slate-200">${wine.glassPrice}</span>
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Vault Stock</span>
                  <span className="text-sm font-mono text-emerald-400 font-semibold">{wine.cellarInventory} Bottles Remaining</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-300 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-amber-400">Cellar Vault 55°F</span>
                  <span className="text-slate-400">Zalto Crystal Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Wine Characteristics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Grapes & Terroir */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Wine className="w-5 h-5 text-amber-500" />
                <span>Grape Assemblage &amp; Viticulture</span>
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {wine.grapeVarieties.map((grape, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-slate-200">
                    {grape}
                  </span>
                ))}
              </div>
            </div>

            {/* Sommelier Pairing Dish */}
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                Master Sommelier Culinary Pairing
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                {wine.pairingDish.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {wine.pairingDish.reason}
              </p>
              <button
                onClick={() => navigate(wine.pairingDish.url)}
                className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold cursor-pointer pt-2"
              >
                <span>View Dish Preparation &amp; Ingredients</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-amber-400 font-mono">
                Cellar Specs
              </h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Vintage</span>
                  <span className="text-white font-bold">{wine.vintage}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Drinking Window</span>
                  <span className="text-emerald-400 font-bold">{wine.drinkingWindow}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Vault Temp</span>
                  <span className="text-white">55°F / 12.8°C</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Decanting Time</span>
                  <span className="text-amber-400 font-bold">60 - 90 Min</span>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase">Other Cellar Allocations</h4>
              <div className="space-y-2 text-xs font-mono">
                {WINE_ALLOCATIONS.filter(w => w.slug !== slug).slice(0, 4).map((other) => (
                  <button
                    key={other.id}
                    onClick={() => navigate(`/wine/${other.slug}`)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-black/40 text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{other.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
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
