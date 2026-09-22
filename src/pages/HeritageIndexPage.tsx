import React from 'react';
import { HERITAGE_ARTICLES } from '../data/heritageArticles';
import { SEOHead } from '../components/SEOHead';
import { BookOpen, Flame, ArrowRight, Clock, User, Sparkles } from 'lucide-react';

interface HeritageIndexPageProps {
  navigate: (path: string) => void;
}

export function HeritageIndexPage({ navigate }: HeritageIndexPageProps) {
  const seo = {
    seoTitle: 'Culinary Heritage, Dum Pukht Science & Wazwan History | Saffron & Sage',
    metaDescription: 'Explore the ancestral culinary traditions of Kashmir and Awadh: 36-course royal Wazwan, Dum Pukht thermodynamics, and ethical saffron farming.',
    slug: 'heritage',
    focusKeyword: 'culinary heritage kashmiri gastronomy',
    secondaryKeywords: ['dum pukht history', 'wazwan banquet tradition', 'sommelier spiced wine pairing'],
    canonicalUrl: '/heritage',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Culinary Heritage & Gastronomy Archives - Saffron & Sage',
    ogDescription: 'Historical essays and scientific principles behind ancient royal Indian techniques.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'CollectionPage' as const,
    searchIntent: 'Informational' as const
  };

  const schemaCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Culinary Heritage & Gastronomy Archives',
    description: 'Essays documenting the history, chemistry, and techniques of Himalayan and Awadhi royal gastronomy.',
    hasPart: HERITAGE_ARTICLES.map(a => ({
      '@type': 'Article',
      headline: a.title,
      url: `https://saffronandsage.com/heritage/${a.slug}`
    }))
  };

  const auditContent = `# Culinary Heritage & Gastronomy Archives
Explore historical essays documenting ancient cooking traditions.
${HERITAGE_ARTICLES.map(a => `## ${a.title}\n${a.subtitle}\n${a.summary}`).join('\n\n')}`;

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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Gastronomic Knowledge Library</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Culinary Heritage &amp; Food Science Archives
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Documented research on the thermodynamics of dough-sealed clay pots, multi-generational saffron farming cooperatives, and centuries-old royal banquet rituals.
          </p>
        </div>

        {/* Heritage Articles List */}
        <div className="space-y-8">
          {HERITAGE_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/heritage/${article.slug}`)}
              className="group bg-[#121212] rounded-3xl border border-white/5 hover:border-amber-500/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                      Archival Essay
                    </span>
                    <span>{article.readingTime}</span>
                    <span>&bull;</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-400 font-serif italic">
                    {article.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-400">
                    <span>Read Full Historical Document</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden aspect-16/10 border border-white/10 relative shadow-xl">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
