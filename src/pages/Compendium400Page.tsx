import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { COMPENDIUM_400_ITEMS, CompendiumItem } from '../data/compendium400';
import {
  BookOpen,
  Search,
  Filter,
  Sparkles,
  ArrowUp,
  MessageCircle,
  MapPin,
  Wine,
  Tag,
  ChevronRight,
  Flame,
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface Compendium400PageProps {
  navigate: (path: string) => void;
}

export function Compendium400Page({ navigate }: Compendium400PageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');
  const [currentScrollPage, setCurrentScrollPage] = useState<number>(1);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Filtered 400 items
  const filteredItems = useMemo(() => {
    return COMPENDIUM_400_ITEMS.filter(item => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.originRegion.toLowerCase().includes(q) ||
        `page ${item.pageNumber}`.includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current visible slice
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Infinite scroll observer: when scrolling near bottom, load next batch
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 20, filteredItems.length));
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [filteredItems.length]);

  // Track active scroll page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const approxPage = Math.min(
        400,
        Math.max(1, Math.floor((scrollPos / (document.body.scrollHeight || 10000)) * 400) + 1)
      );
      setCurrentScrollPage(approxPage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= 400) {
      if (pageNum > visibleCount) {
        setVisibleCount(Math.min(pageNum + 10, 400));
      }
      setTimeout(() => {
        const el = document.getElementById(`chapter-${pageNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const categories = [
    { key: 'ALL', label: 'All 400 Pages', count: 400 },
    { key: 'Artisanal Gastronomy', label: 'Gastronomy (80)', count: 80 },
    { key: 'Sommelier Cellar', label: 'Wine Cellar (80)', count: 80 },
    { key: 'Sacred Botanicals', label: 'Botanicals (80)', count: 80 },
    { key: 'Royal Global Catering', label: 'Global Catering (80)', count: 80 },
    { key: 'Chef Degustation Masterclass', label: 'Chef Masterclasses (80)', count: 80 }
  ];

  const handleWhatsAppItem = (item: CompendiumItem) => {
    const text = `Hello Saffron & Sage Concierge, I am inquiring about ${item.title} (Page ${item.pageNumber} - ${item.price}) from the 400 Chapters Compendium.`;
    const url = `https://wa.me/923294785579?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const seo = {
    seoTitle: 'The 400 Culinary Chapters Compendium | Endless Gastronomy Scroll | Saffron & Sage',
    metaDescription: 'Explore 400 distinct pages of Michelin gastronomy, rare vintage wines, Pampore saffron botanicals, and royal banquet catering across 50 global cities.',
    canonicalUrl: '/compendium',
    focusKeyword: '400 culinary pages saffron fine dining'
  };

  return (
    <div className="min-h-screen bg-[#070707] text-slate-200 font-sans selection:bg-amber-500 selection:text-black pb-28">
      <SEOHead seo={seo} />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 bg-gradient-to-b from-[#111111] to-[#070707] overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top,#d97706,transparent_60%)]" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Grand Gastronomy Compendium &bull; 400 Consecutive Pages</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            The 400 Culinary Chapters
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Scroll continuously through 400 dedicated chapters of Michelin-inspired gastronomy,
            subterranean Grand Cru cellar allocations, Himalayan single-origin botanicals,
            and royal imperial banquets spanning 50+ global metropolises.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-amber-400">Total Archive</span>
              <span className="text-xl font-bold font-serif text-white">400 Pages</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-emerald-400">Order Channel</span>
              <span className="text-xl font-bold font-serif text-white">WhatsApp</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-amber-400">Global Cities</span>
              <span className="text-xl font-bold font-serif text-white">50+ Hubs</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-amber-400">Cellar Reserves</span>
              <span className="text-xl font-bold font-serif text-white">800 Bottles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Navigation & Filter Bar */}
      <section className="sticky top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Jump to Page */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search in 400 pages..."
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <form onSubmit={handleJumpToPage} className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="400"
                value={jumpPageInput}
                onChange={e => setJumpPageInput(e.target.value)}
                placeholder="Jump # (1-400)"
                className="w-24 px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-center font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-full text-xs font-mono font-bold transition border border-amber-500/30"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating Scroll Indicator Badge */}
      <div className="fixed top-24 right-4 z-40 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-mono text-amber-400">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
        <span>Live Scroll: Page {currentScrollPage} / 400</span>
      </div>

      {/* 400 Pages Scrolling Stream */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-xs font-mono text-neutral-500 mb-6 flex items-center justify-between">
          <span>Showing {displayedItems.length} of {filteredItems.length} Available Culinary Pages</span>
          <span className="text-amber-400">Continuous Infinite Scroll Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map(item => (
            <article
              key={item.id}
              id={item.id}
              className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* Image & Header with Chapter Badge */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Chapter / Page Number Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-lg">
                    Page #{item.pageNumber} of 400
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-neutral-950/80 text-[10px] font-mono uppercase tracking-wider text-neutral-300 border border-neutral-800">
                    {item.category.replace('Masterclass', '').replace('Degustation', '')}
                  </div>

                  {/* Region & Price Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-300 flex items-center gap-1 drop-shadow-md">
                      <MapPin className="w-3 h-3 text-amber-400" /> {item.originRegion}
                    </span>
                    <span className="text-amber-400 font-bold drop-shadow-md bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 block">
                      {item.subheading}
                    </span>
                    <h2 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-neutral-800/80 text-[11px] text-neutral-300 flex items-start gap-2">
                    <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item.pairing}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-neutral-800/50 mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleWhatsAppItem(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)] transition cursor-pointer"
                  title="Inquire or Book on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Infinite Scroll Observer Target */}
        <div ref={loaderRef} className="py-12 text-center">
          {displayedItems.length < filteredItems.length ? (
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono text-neutral-400">
                Scrolling to load next chapters... ({displayedItems.length} / {filteredItems.length} loaded)
              </p>
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 40, filteredItems.length))}
                className="px-5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition cursor-pointer"
              >
                Load Next 40 Chapters Instantly
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 max-w-lg mx-auto space-y-2">
              <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-white">End of 400 Culinary Chapters</h3>
              <p className="text-xs text-neutral-400">
                You have reached the end of our complete 400-page Gastronomy Archives.
                Contact our VIP Concierge directly on WhatsApp for custom reservations and orders.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold font-mono text-xs rounded-full hover:bg-amber-400 transition"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to Top
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
