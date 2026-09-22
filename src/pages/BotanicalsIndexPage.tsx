import React from 'react';
import { BOTANICAL_INGREDIENTS } from '../data/botanicals';
import { SEOHead } from '../components/SEOHead';
import { Leaf, Sparkles, Mountain, ArrowRight, ChevronRight, Compass, ShieldCheck } from 'lucide-react';

interface BotanicalsIndexPageProps {
  navigate: (path: string) => void;
}

export function BotanicalsIndexPage({ navigate }: BotanicalsIndexPageProps) {
  const seo = {
    seoTitle: 'Himalayan Botanicals & Single-Origin Spices Terroir Matrix | Saffron & Sage',
    metaDescription: 'Explore our library of single-origin spices and rare botanicals: Kashmiri Mongra Saffron, Wild Guchhi Morels, Norcia Truffles, and Meghalaya Long Pepper.',
    slug: 'botanicals',
    focusKeyword: 'himalayan botanicals spices terroir',
    secondaryKeywords: ['single origin spices fine dining', 'kashmiri saffron terroir', 'wild guchhi morel guide'],
    canonicalUrl: '/botanicals',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Himalayan Botanicals & Terroir Matrix - Saffron & Sage',
    ogDescription: 'Comprehensive guide to ancient botanicals, high-altitude spice harvesting, and flavor chemistry.',
    ogImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'CollectionPage' as const,
    searchIntent: 'Informational' as const
  };

  const schemaCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Himalayan Botanicals & Terroir Matrix',
    description: 'Ancestral single-origin botanicals and high-potency spices from Kashmir and the Himalayas.',
    hasPart: BOTANICAL_INGREDIENTS.map(b => ({
      '@type': 'DefinedTerm',
      name: b.name,
      termCode: b.botanicalName,
      url: `https://saffronandsage.com/botanicals/${b.slug}`
    }))
  };

  const auditContent = `# Himalayan Botanicals & Single-Origin Terroir Matrix
Explore the scientific and ancestral heritage of single-origin spices.
${BOTANICAL_INGREDIENTS.map(b => `## ${b.name} (${b.botanicalName})\n${b.sensoryProfile} Origin: ${b.origin}. Elevation: ${b.elevation}.`).join('\n\n')}`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={seo}
        schemaData={schemaCollection}
        contentForAudit={auditContent}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Leaf className="w-3.5 h-3.5" />
            <span>Single-Origin Botanical Archive</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Ancestral Terroir &amp; Botanical Matrix
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Every dish in our kitchen is anchored by high-potency, single-origin botanicals harvested from high lacustrine plateaus, wild pine ridges, and ancient spice forests.
          </p>
        </div>

        {/* Botanicals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOTANICAL_INGREDIENTS.map((botanical) => (
            <div
              key={botanical.id}
              onClick={() => navigate(`/botanicals/${botanical.slug}`)}
              className="group bg-[#121212] rounded-3xl border border-white/5 hover:border-amber-500/40 p-6 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 border border-white/5">
                  <img
                    src={botanical.image}
                    alt={botanical.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full text-[10px] font-mono text-amber-400 border border-amber-500/20">
                    {botanical.elevation}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-amber-400/90 font-serif italic block">
                    {botanical.botanicalName}
                  </span>
                  <h2 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition mt-1">
                    {botanical.name}
                  </h2>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {botanical.sensoryProfile}
                </p>

                {/* Key compounds */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {botanical.chemicalCompounds.slice(0, 2).map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[10px] font-mono text-slate-300">
                      {comp.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-400">
                <span>View Full Terroir Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
