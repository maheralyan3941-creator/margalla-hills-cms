import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { SEOHead } from '../components/SEOHead';
import { CaseStudy } from '../types';
import { api } from '../lib/api';
import { ArrowLeft, CheckCircle2, ChevronRight, TrendingUp, Layers, Sparkles } from 'lucide-react';

interface CaseStudyDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  caseStudies?: CaseStudy[];
}

export function CaseStudyDetailPage({ slug, navigate, caseStudies: initialStudies }: CaseStudyDetailPageProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialStudies || []);
  const [cs, setCs] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (initialStudies && initialStudies.length > 0) {
      const found = initialStudies.find(c => c.slug === slug);
      setCs(found || null);
    } else {
      api.getCaseStudies().then(allStudies => {
        setCaseStudies(allStudies);
        const found = allStudies.find(c => c.slug === slug);
        setCs(found || null);
      }).catch(() => {});
    }
  }, [slug, initialStudies]);

  if (!cs) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">Case Study Not Found</h1>
          <p className="text-sm text-slate-400 mt-2">The requested SEO experiment does not exist.</p>
          <button
            onClick={() => navigate('/case-studies')}
            className="mt-6 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs cursor-pointer"
          >
            Return to Case Studies
          </button>
        </div>
      </div>
    );
  }

  const caseSEO = {
    seoTitle: `${cs.projectName} | SEO Benchmark Case Study`,
    metaDescription: cs.summary,
    slug: `case-studies/${cs.slug}`,
    focusKeyword: cs.targetKeywords[0] || 'local seo experiment',
    secondaryKeywords: cs.targetKeywords,
    canonicalUrl: `/case-studies/${cs.slug}`,
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: cs.projectName,
    ogDescription: cs.summary,
    ogImage: cs.screenshotUrl,
    schemaType: 'Article' as const,
    searchIntent: 'Commercial' as const
  };

  const schemaCaseStudy = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.projectName,
    description: cs.summary,
    image: cs.screenshotUrl,
    datePublished: cs.date,
    author: {
      '@type': 'Organization',
      name: 'Saffron & Sage Technical SEO Research Group'
    }
  };

  const auditContent = `# ${cs.projectName}
${cs.summary}
## Problem
${cs.problem}
## Strategy
${cs.strategy}
## Key Takeaways
${cs.keyTakeaways.join('\n')}`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10">
      <SEOHead
        seo={caseSEO}
        schemaData={schemaCaseStudy}
        contentForAudit={auditContent}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-emerald-400 cursor-pointer">Home</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><button onClick={() => navigate('/case-studies')} className="hover:text-emerald-400 cursor-pointer">Case Studies</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-xs">{cs.projectName}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/case-studies')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-[#121212] rounded-3xl border border-slate-800 shadow-sm p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-3 py-1 bg-black/80 border border-white/10 text-emerald-400 rounded-md font-semibold">
                Experiment
              </span>
              <span>Date: {cs.date}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              {cs.projectName}
            </h1>

            <p className="text-base text-slate-400 leading-relaxed font-sans pt-2">
              {cs.summary}
            </p>
          </div>

          {/* Key Metric Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-[#0A0A0A] text-white rounded-2xl border border-slate-800">
            {cs.results.map((res, i) => (
              <div key={i} className="p-4 bg-[#121212] rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">{res.metric}</div>
                <div className="text-3xl font-bold text-emerald-400 mt-1 font-mono">{res.change}</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">{res.before} &rarr; {res.after}</div>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-sm">
            <img
              src={cs.screenshotUrl}
              alt={cs.projectName}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Problem & Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono mb-2">
                The Initial Challenge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.problem}
              </p>
            </div>

            <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
                Experiment Strategy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.strategy}
              </p>
            </div>
          </div>

          {/* Actions Taken */}
          <div className="pt-4 space-y-3">
            <h2 className="font-serif text-2xl font-bold text-white">
              Actions Taken &amp; Implementation Details
            </h2>
            <ul className="space-y-2">
              {cs.actionsTaken.map((act, i) => (
                <li key={i} className="p-3 bg-[#0A0A0A] rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-emerald-500/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Actionable SEO Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {cs.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
