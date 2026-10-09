import React, { useState, useMemo } from 'react';
import { EXPANDED_MENU_ITEMS } from '../data/expandedMenuItems';
import { BOTANICAL_INGREDIENTS } from '../data/botanicals';
import { WINE_ALLOCATIONS } from '../data/wineAllocations';
import { HERITAGE_ARTICLES } from '../data/heritageArticles';
import { CITIES_DATA } from '../data/citiesData';
import { SEOHead } from '../components/SEOHead';
import {
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Utensils,
  Wine,
  Leaf,
  BookOpen,
  MapPin,
  FileText,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface SitemapHubPageProps {
  navigate: (path: string) => void;
}

interface SiteURLItem {
  title: string;
  url: string;
  category: 'Core Pages' | 'Dishes & Recipes' | 'Wine Allocations' | 'Botanicals & Spices' | 'Heritage Essays' | 'Local Catering Cities' | 'Case Studies' | 'Blog Articles' | 'SEO Lab & Admin';
  description: string;
  priority: string;
  changefreq: string;
}

export function SitemapHubPage({ navigate }: SitemapHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Build the complete 100+ master index of all pages
  const allPages: SiteURLItem[] = useMemo(() => {
    const list: SiteURLItem[] = [
      // Core Flagship
      { title: 'Grand Flagship Homepage', url: '/', category: 'Core Pages', description: 'Editorial luxury dining overview, harvest story, chef table booking, and salon directory.', priority: '1.0', changefreq: 'daily' },
      { title: 'Full Artisanal Culinary Menu', url: '/menu', category: 'Core Pages', description: '30+ Kashmiri, Awadhi, and modern royal Indian dishes with dietary filters and live tasting notes.', priority: '0.95', changefreq: 'daily' },
      { title: 'The Saffron Symphony Tasting Degustation', url: '/tasting-menu', category: 'Core Pages', description: '7-Course and 10-Course grand saffron tasting degustation with Sommelier pairings.', priority: '0.9', changefreq: 'weekly' },
      { title: 'Subterranean Wine Cellar & Allocations', url: '/wine-cellar', category: 'Core Pages', description: '800-bottle subterranean temperature-controlled cellar vault and vintage allocations.', priority: '0.9', changefreq: 'weekly' },
      { title: 'Private Dining Salons & Chef’s Table', url: '/private-dining', category: 'Core Pages', description: 'Bespoke corporate banquets, VIP salon bookings, and private event packages.', priority: '0.85', changefreq: 'monthly' },
      { title: 'Location, Directions & Mountain Terraces', url: '/locations', category: 'Core Pages', description: 'Pir Sohawa Road, Trail 3 & 5 access, and scenic hilltop dining terraces in Islamabad.', priority: '0.85', changefreq: 'monthly' },
      { title: 'Heritage & Culinary Lineage', url: '/about', category: 'Core Pages', description: 'Executive Chef Marcus Sterling, Pampore farmer cooperatives, and harvest philosophy.', priority: '0.8', changefreq: 'monthly' },
      { title: 'Visual Gastronomy Gallery', url: '/gallery', category: 'Core Pages', description: 'High-resolution culinary photography and dining salon aesthetics.', priority: '0.75', changefreq: 'monthly' },
      { title: 'Reservations & Concierge Contact', url: '/contact', category: 'Core Pages', description: 'Table reservations, sommelier inquiries, and corporate banquet concierge.', priority: '0.8', changefreq: 'monthly' },
      { title: 'Ancestral Botanicals & Terroir Matrix', url: '/botanicals', category: 'Core Pages', description: 'Master directory of single-origin spices, chemical compounds, and elevations.', priority: '0.9', changefreq: 'weekly' },
      { title: 'Culinary Heritage & Food Science Archives', url: '/heritage', category: 'Core Pages', description: 'Historical essays documenting Wazwan rituals, Dum Pukht thermodynamics, and ethics.', priority: '0.9', changefreq: 'weekly' },
      { title: 'Empirical SEO Case Studies', url: '/case-studies', category: 'Core Pages', description: 'Technical benchmarks in local pack rankings, rich schema clicks, and organic growth.', priority: '0.85', changefreq: 'weekly' },
      { title: 'Journal & Culinary Insights', url: '/blog', category: 'Core Pages', description: 'Articles on saffron harvesting, Michelin inspector criteria, and spice extractions.', priority: '0.9', changefreq: 'daily' }
    ];

    // 30+ Menu Dishes
    EXPANDED_MENU_ITEMS.forEach(item => {
      list.push({
        title: `${item.name} (${item.category})`,
        url: `/menu/${item.category}/${item.slug}`,
        category: 'Dishes & Recipes',
        description: item.description,
        priority: '0.85',
        changefreq: 'weekly'
      });
    });

    // 8+ Botanicals
    BOTANICAL_INGREDIENTS.forEach(b => {
      list.push({
        title: `${b.name} (${b.botanicalName})`,
        url: `/botanicals/${b.slug}`,
        category: 'Botanicals & Spices',
        description: `${b.origin} (${b.elevation}). ${b.sensoryProfile}`,
        priority: '0.85',
        changefreq: 'weekly'
      });
    });

    // 6+ Wine Allocations
    WINE_ALLOCATIONS.forEach(w => {
      list.push({
        title: `${w.name} (${w.vintage})`,
        url: `/wine/${w.slug}`,
        category: 'Wine Allocations',
        description: `${w.criticScore} - ${w.region}, ${w.country}. ${w.tastingNotes}`,
        priority: '0.85',
        changefreq: 'weekly'
      });
    });

    // 4+ Heritage Articles
    HERITAGE_ARTICLES.forEach(a => {
      list.push({
        title: a.title,
        url: `/heritage/${a.slug}`,
        category: 'Heritage Essays',
        description: `${a.subtitle} (${a.readingTime})`,
        priority: '0.85',
        changefreq: 'monthly'
      });
    });

    // 25+ Programmatic Catering Cities
    Object.values(CITIES_DATA).forEach(c => {
      list.push({
        title: `Artisanal Saffron Catering in ${c.name} (${c.country})`,
        url: `/catering/${c.slug}`,
        category: 'Local Catering Cities',
        description: `Capacity ${c.guestCountCapacity}. ${c.localHighlights}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
    });

    // Case Study Detail Pages
    const caseStudySlugs = [
      { slug: 'manhattan-flagship-local-3pack-dominance', title: 'Local 3-Pack Rank Dominance: Manhattan Flagship' },
      { slug: 'schema-org-restaurant-menu-rich-snippets-ctr', title: 'JSON-LD Schema Implementation & Rich Snippet CTR' },
      { slug: 'programmatic-catering-landing-pages-scale', title: 'Programmatic Local Catering Scalability & Leads' }
    ];
    caseStudySlugs.forEach(cs => {
      list.push({
        title: `Case Study: ${cs.title}`,
        url: `/case-studies/${cs.slug}`,
        category: 'Case Studies',
        description: 'Hypothesis, technical execution benchmarks, verified metrics and schema audit.',
        priority: '0.8',
        changefreq: 'monthly'
      });
    });

    // Blog Post Detail Pages
    const blogSlugs = [
      { slug: 'art-of-saffron-harvesting-kashmir-pampore', title: 'The Sacred Art of Saffron Harvesting in Pampore' },
      { slug: 'secrets-of-14-hour-lamb-nihari-bone-marrow', title: 'Secrets of 14-Hour Lamb Shank Nihari Bone Marrow' },
      { slug: 'sommelier-wine-pairing-guide-spiced-gastronomy', title: 'Sommelier Guide to Pairing Grand Cru Wines with Spiced Dishes' },
      { slug: 'wood-fired-clay-tandoor-techniques-and-temperature-mastery', title: 'Wood-Fired Clay Tandoor Heat Mastery & Flatbread Physics' }
    ];
    blogSlugs.forEach(bp => {
      list.push({
        title: `Journal: ${bp.title}`,
        url: `/blog/${bp.slug}`,
        category: 'Blog Articles',
        description: 'Gastronomy editorial article with recipe breakdown, sommelier notes, and schema.',
        priority: '0.8',
        changefreq: 'monthly'
      });
    });

    return list;
  }, []);

  const filteredPages = useMemo(() => {
    return allPages.filter(page => {
      const matchesCat = selectedCategory === 'All' || page.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        page.title.toLowerCase().includes(q) ||
        page.url.toLowerCase().includes(q) ||
        page.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allPages, selectedCategory, searchQuery]);

  const categories = ['All', 'Core Pages', 'Dishes & Recipes', 'Wine Allocations', 'Botanicals & Spices', 'Heritage Essays', 'Local Catering Cities', 'Case Studies', 'Blog Articles', 'SEO Lab & Admin'];

  const sitemapSEO = {
    seoTitle: `Comprehensive HTML Sitemap Directory (100+ Pages) | Saffron & Sage`,
    metaDescription: `Navigate all ${allPages.length}+ pages across Saffron & Sage fine dining: 30+ artisan dishes, 25+ city catering hubs, Grand Cru wines, and botanical guides.`,
    slug: 'sitemap',
    focusKeyword: 'saffron and sage html sitemap',
    secondaryKeywords: ['complete restaurant index', 'culinary pages directory', 'fine dining website sitemap'],
    canonicalUrl: '/sitemap',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Comprehensive HTML Sitemap & Page Index (100+ Pages)',
    ogDescription: 'Complete directory of all culinary, wine, botanical, catering, and case study URLs.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'CollectionPage' as const,
    searchIntent: 'Informational' as const
  };

  const schemaSitemap = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Saffron & Sage Comprehensive HTML Sitemap Directory',
    description: `Complete navigational directory linking all ${allPages.length}+ indexable pages.`
  };

  const auditContent = `# Complete Saffron & Sage HTML Sitemap Directory
Indexed URLs: ${allPages.length}
${allPages.map(p => `- [${p.title}](${p.url}): ${p.description}`).join('\n')}`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12 selection:bg-amber-500 selection:text-black">
      <SEOHead
        seo={sitemapSEO}
        schemaData={schemaSitemap}
        contentForAudit={auditContent}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Architectural Index &bull; {allPages.length}+ Live URLs</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Comprehensive HTML Sitemap Directory
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Instant direct navigation to every artisanal dish, wine allocation, botanical guide, catering city, and technical SEO case study across our entire web ecosystem.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 text-xs font-mono text-slate-400">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline"
            >
              <span>View Dynamic XML Sitemap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline"
            >
              <span>View Robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search and Filters Strip */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 100+ pages (e.g. 'biryani', 'london', 'saffron', 'margaux', 'schema')..."
              className="w-full pl-12 pr-4 py-3.5 bg-black/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-black/60 text-slate-400 border border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Page Count Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
          <span>Showing <strong className="text-amber-400">{filteredPages.length}</strong> of {allPages.length} Total Registered Pages</span>
          <span>100% Crawlable &amp; Schema Validated</span>
        </div>

        {/* Sitemap Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPages.map((page, idx) => (
            <div
              key={idx}
              onClick={() => navigate(page.url)}
              className="group bg-[#111111] rounded-2xl border border-white/5 hover:border-amber-500/40 p-5 space-y-3 transition duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-amber-400">
                    {page.category}
                  </span>
                  <span className="text-slate-500">P: {page.priority}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition leading-snug">
                  {page.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {page.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-amber-400 transition">
                <span className="truncate max-w-[200px]">{page.url}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-16 bg-[#121212] rounded-3xl border border-white/5 space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-white">No Matching Pages Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search keywords or switching category filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-full bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
