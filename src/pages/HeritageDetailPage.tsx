import React from 'react';
import { HERITAGE_ARTICLES, HeritageArticle } from '../data/heritageArticles';
import { SEOHead } from '../components/SEOHead';
import { ChevronRight, BookOpen, Clock, Calendar, User, ArrowRight, CheckCircle2, Flame } from 'lucide-react';

interface HeritageDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export function HeritageDetailPage({ slug, navigate }: HeritageDetailPageProps) {
  const article: HeritageArticle | undefined = HERITAGE_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-24 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <BookOpen className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-white">Heritage Essay Not Found</h1>
          <p className="text-sm text-slate-400">The culinary essay you requested is currently being curated in our library archives.</p>
          <button
            onClick={() => navigate('/heritage')}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition"
          >
            Explore Heritage Archives
          </button>
        </div>
      </div>
    );
  }

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    alternativeHeadline: article.subtitle,
    description: article.summary,
    image: article.coverImage,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saffron & Sage Gastronomy Archives'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://saffronandsage.com/heritage/${article.slug}`
    }
  };

  const auditContent = `# ${article.title}
${article.subtitle}
${article.summary}
${article.sections.map(s => `## ${s.heading}\n${s.body}`).join('\n\n')}
## Key Takeaways
${article.keyTakeaways.join('\n')}`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={article.seo}
        schemaData={schemaArticle}
        contentForAudit={auditContent}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-amber-400 cursor-pointer">Home</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li><button onClick={() => navigate('/heritage')} className="hover:text-amber-400 cursor-pointer">Culinary Heritage</button></li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>Culinary Heritage Essay</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-slate-300 font-serif italic leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
              />
              <div>
                <span className="text-white font-semibold block">{article.author.name}</span>
                <span className="text-slate-500 text-[11px]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 aspect-16/9 relative shadow-2xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Executive Summary */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-slate-200 text-base leading-relaxed font-serif">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-xs block font-mono mb-2">
            Archival Abstract
          </span>
          {article.summary}
        </div>

        {/* Body Content Sections */}
        <div className="space-y-10">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Key Takeaways Card */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Key Historical Insights</span>
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Dishes in Restaurant */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-serif font-bold text-white">Experience This Culinary Tradition</h4>
            <p className="text-xs text-slate-400 mt-1">Savor the dishes inspired by this essay prepared live in our kitchen:</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {article.relatedDishes.map((dish, i) => (
                <button
                  key={i}
                  onClick={() => navigate(dish.url)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 transition cursor-pointer"
                >
                  {dish.name} &rarr;
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-3 rounded-full bg-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition shrink-0 cursor-pointer"
          >
            Explore Full Menu
          </button>
        </div>
      </div>
    </div>
  );
}
