import React from 'react';
import { BOTANICAL_INGREDIENTS, BotanicalIngredient } from '../data/botanicals';
import { SEOHead } from '../components/SEOHead';
import { ChevronRight, Sparkles, Mountain, Compass, Award, ArrowRight, BookOpen, Leaf, ShieldCheck, Thermometer } from 'lucide-react';

interface BotanicalDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export function BotanicalDetailPage({ slug, navigate }: BotanicalDetailPageProps) {
  const botanical: BotanicalIngredient | undefined = BOTANICAL_INGREDIENTS.find(b => b.slug === slug);

  if (!botanical) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-24 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <Leaf className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-white">Botanical Terroir Not Found</h1>
          <p className="text-sm text-slate-400">The spice or botanical profile you requested does not exist in our heritage database.</p>
          <button
            onClick={() => navigate('/botanicals')}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition"
          >
            Explore All Botanicals
          </button>
        </div>
      </div>
    );
  }

  const schemaDefinedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: botanical.name,
    termCode: botanical.botanicalName,
    description: botanical.sensoryProfile,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Saffron & Sage Himalayan Terroir Matrix'
    }
  };

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: botanical.seo.seoTitle,
    description: botanical.seo.metaDescription,
    image: botanical.image,
    author: {
      '@type': 'Person',
      name: 'Chef Marcus Sterling'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saffron & Sage Artisanal Kitchen'
    }
  };

  const auditContent = `# ${botanical.name} (${botanical.botanicalName})
${botanical.sensoryProfile}
## Terroir & Geographic Origin
Origin: ${botanical.origin} at ${botanical.elevation}. Harvest: ${botanical.harvestSeason}.
## Chemical Potency & Key Compounds
${botanical.chemicalCompounds.join(', ')}
## Culinary Usage & Recipes
${botanical.culinaryUsage}
## Sourcing Ethics & Fair Trade
${botanical.sourcingEthics}`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={botanical.seo}
        schemaData={[schemaDefinedTerm, schemaArticle]}
        contentForAudit={auditContent}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-amber-400 cursor-pointer">Home</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><button onClick={() => navigate('/botanicals')} className="hover:text-amber-400 cursor-pointer">Botanicals & Spices</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold">{botanical.name}</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#141414] to-[#0D0D0D] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <Leaf className="w-3.5 h-3.5" />
                <span>Ancestral Terroir Profile</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                {botanical.name}
              </h1>

              <p className="text-base text-amber-400/90 font-serif italic">
                {botanical.botanicalName}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {botanical.sensoryProfile}
              </p>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 font-mono text-xs">
                <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-slate-500 block text-[10px] uppercase">Origin</span>
                  <span className="text-white font-medium">{botanical.origin}</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-slate-500 block text-[10px] uppercase">Elevation</span>
                  <span className="text-amber-400 font-medium">{botanical.elevation}</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px] uppercase">Harvest</span>
                  <span className="text-emerald-400 font-medium">{botanical.harvestSeason}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
                <img
                  src={botanical.image}
                  alt={botanical.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-300 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-amber-400 font-semibold">100% Single-Origin</span>
                  <span className="text-slate-400">HPLC Lab Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Body Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* History & Cultivation */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>Historical Lineage & Cultivation</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {botanical.history}
              </p>
            </div>

            {/* Chemical & Active Compounds */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Active Terpenes & Chemical Chemistry</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                {botanical.chemicalCompounds.map((comp, idx) => (
                  <div key={idx} className="p-3.5 bg-black/50 rounded-xl border border-amber-500/20 text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing Ethics */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Direct Farmer Partnerships & Ethics</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {botanical.sourcingEthics}
              </p>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Featured In Our Kitchen */}
            <div className="bg-[#141414] border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider text-amber-400">
                Featured Dishes In Our Menu
              </h3>
              <p className="text-xs text-slate-400">
                Taste this botanical ingredient prepared live in our kitchen:
              </p>
              <div className="space-y-2 pt-2">
                {botanical.curatedDishes.map((dish, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(dish.url)}
                    className="w-full text-left p-3 rounded-xl bg-black/60 border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 transition group flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs text-white font-medium group-hover:text-amber-400 transition">{dish.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Culinary Master Navigation */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Other Terroir Profiles</h3>
              <div className="space-y-2 text-xs font-mono">
                {BOTANICAL_INGREDIENTS.filter(b => b.slug !== slug).map((other) => (
                  <button
                    key={other.id}
                    onClick={() => navigate(`/botanicals/${other.slug}`)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-black/40 text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{other.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
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
