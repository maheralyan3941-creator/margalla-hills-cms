import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CaseStudy } from '../types';
import { api } from '../lib/api';
import { TrendingUp, ArrowRight, CheckCircle2, ChevronRight, BarChart3, Layers } from 'lucide-react';

interface CaseStudiesPageProps {
  navigate: (path: string) => void;
  caseStudies?: CaseStudy[];
}

export function CaseStudiesPage({ navigate, caseStudies: initialStudies }: CaseStudiesPageProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialStudies || []);

  useEffect(() => {
    if (!initialStudies || initialStudies.length === 0) {
      api.getCaseStudies().then(setCaseStudies).catch(() => {});
    }
  }, [initialStudies]);

  const caseSEO = {
    seoTitle: 'SEO Experiments & Empirical Case Studies | Saffron & Sage Lab',
    metaDescription: 'Documented technical SEO case studies with before/after organic impressions, local 3-pack rankings, and schema click-through analysis.',
    slug: 'case-studies',
    focusKeyword: 'restaurant seo case study',
    secondaryKeywords: ['local pack 3-pack experiment', 'schema ctr growth case study', 'technical seo benchmarks'],
    canonicalUrl: '/case-studies',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'SEO Experiments & Empirical Case Studies - Saffron & Sage Lab',
    ogDescription: 'Real-world data on schema structured data, local pack rankings, and CTR improvements.',
    ogImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'CollectionPage' as const,
    searchIntent: 'Commercial' as const
  };

  const schemaCaseStudies = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SEO Experiments & Empirical Case Studies',
    description: 'Documented empirical benchmarks in local restaurant SEO, rich snippet implementation, and organic growth.'
  };

  const caseContentAudit = `# SEO Experiments & Empirical Case Studies
Explore documented experiments testing ranking hypotheses in modern search algorithms.
## Documented SEO Benchmarks
Each case study includes hypothesis formulations, technical execution strategies, and verified metrics.`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12">
      <SEOHead
        seo={caseSEO}
        schemaData={schemaCaseStudies}
        contentForAudit={caseContentAudit}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Empirical Benchmarks &bull; Search Proof</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Documented SEO Experiments
          </h1>
          <p className="text-base text-slate-400 mt-3 leading-relaxed">
            Real data on how schema markup, keyword clustering, and technical speed directly accelerate local search rankings and organic conversions.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              onClick={() => navigate(`/case-studies/${cs.slug}`)}
              className="group bg-[#121212] rounded-3xl border border-slate-800 shadow-sm hover:shadow-[0_0_30px_rgba(0,0,0,0.7)] hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="px-3 py-1 bg-black/80 border border-white/10 text-emerald-400 rounded-md font-semibold">
                      Experiment
                    </span>
                    <span>Date: {cs.date}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition">
                    {cs.projectName}
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {cs.summary}
                  </p>

                  {/* Results preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {cs.results.map((res, i) => (
                      <div key={i} className="p-3 bg-[#0A0A0A] rounded-xl border border-slate-800">
                        <div className="text-[11px] text-slate-400">{res.metric}</div>
                        <div className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">{res.change}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{res.before} &rarr; {res.after}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Methodology &amp; Takeaways</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 lg:h-72 rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={cs.screenshotUrl}
                    alt={cs.projectName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
