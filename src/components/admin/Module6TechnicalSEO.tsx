import React, { useState } from 'react';
import { RedirectRule } from '../../types';
import {
  Settings,
  FileCode,
  ArrowRightLeft,
  Code2,
  Zap,
  CheckCircle2,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Save,
  Sparkles
} from 'lucide-react';

interface Module6TechnicalSEOProps {
  redirects: RedirectRule[];
  onAddRedirect: (rule: Omit<RedirectRule, 'id' | 'hits' | 'lastAccessed'>) => void;
  onDeleteRedirect: (id: string) => void;
  robotsTxtContent: string;
  onUpdateRobotsTxt: (content: string) => void;
  sitemapAutoGenerate: boolean;
  onToggleSitemap: (val: boolean) => void;
}

export function Module6TechnicalSEO({
  redirects,
  onAddRedirect,
  onDeleteRedirect,
  robotsTxtContent,
  onUpdateRobotsTxt,
  sitemapAutoGenerate,
  onToggleSitemap
}: Module6TechnicalSEOProps) {
  const [robotsDraft, setRobotsDraft] = useState(robotsTxtContent);
  const [robotsSaved, setRobotsSaved] = useState(false);

  // 301 Redirect form
  const [sourceUrl, setSourceUrl] = useState('');
  const [destUrl, setDestUrl] = useState('');
  const [redirectType, setRedirectType] = useState<301 | 302>(301);

  // Schema Generator states
  const [selectedSchemaType, setSelectedSchemaType] = useState<'Restaurant' | 'Article' | 'Product' | 'FAQPage'>('Restaurant');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [autoInjected, setAutoInjected] = useState(true);

  // Sample parameters for Schema Generator
  const [schemaName, setSchemaName] = useState('Margalla Hills Luxury Dining');
  const [schemaDesc, setSchemaDesc] = useState('Michelin-caliber culinary resort perched atop the Margalla Hills in Islamabad.');
  const [schemaPrice, setSchemaPrice] = useState('$$$$');

  const handleSaveRobots = () => {
    onUpdateRobotsTxt(robotsDraft);
    setRobotsSaved(true);
    setTimeout(() => setRobotsSaved(false), 2500);
  };

  const handleCreateRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrl.trim() || !destUrl.trim()) return;

    onAddRedirect({
      source: sourceUrl.startsWith('/') ? sourceUrl : `/${sourceUrl}`,
      destination: destUrl.startsWith('/') || destUrl.startsWith('http') ? destUrl : `/${destUrl}`,
      type: redirectType,
      active: true
    });

    setSourceUrl('');
    setDestUrl('');
  };

  // Dynamic generated JSON-LD Schema
  const getGeneratedSchemaJson = () => {
    if (selectedSchemaType === 'Restaurant') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: schemaName,
          description: schemaDesc,
          image: 'https://margallahills.com/og-image.jpg',
          telephone: '+92 51 2800000',
          priceRange: schemaPrice,
          servesCuisine: ['Himalayan', 'Contemporary Kashmiri', 'Fine Dining'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Mile 9, Pir Sohawa Road',
            addressLocality: 'Islamabad',
            postalCode: '44000',
            addressCountry: 'PK'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 33.74832,
            longitude: 73.06451
          },
          hasMenu: 'https://margallahills.com/menu'
        },
        null,
        2
      );
    }
    if (selectedSchemaType === 'Article') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: schemaName,
          description: schemaDesc,
          author: {
            '@type': 'Person',
            name: 'Executive Chef Marcus Sterling'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Margalla Hills Gastronomy Group',
            logo: {
              '@type': 'ImageObject',
              url: 'https://margallahills.com/logo.png'
            }
          },
          datePublished: '2026-09-01T08:00:00Z'
        },
        null,
        2
      );
    }
    if (selectedSchemaType === 'Product') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: schemaName,
          description: schemaDesc,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'PKR',
            price: '8500',
            availability: 'https://schema.org/InStock'
          }
        },
        null,
        2
      );
    }
    // FAQPage
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Margalla Hills open for sunset dining?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, our open-air panoramic terraces welcome guests from 12:00 PM to midnight with prior reservation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I reserve the private sommelier cellar table?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Private cellar tastings can be booked 48 hours in advance via our concierge desk on WhatsApp or online booking.'
            }
          }
        ]
      },
      null,
      2
    );
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(getGeneratedSchemaJson());
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Section 6 &bull; Technical SEO Infrastructure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          Sitemap, Robots.txt, 301 Redirects &amp; Schema Generator
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-2xl">
          Automate XML sitemap generation for 400+ URLs, manage live robots.txt directives, configure HTTP 301 permanent redirects, and generate schema rich snippets.
        </p>
      </div>

      {/* Row 1: Sitemap & Robots.txt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sitemap.xml Auto-Generation Switch */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Dynamic XML Sitemap Generator</span>
              </h3>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>/sitemap.xml</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              When enabled, your dynamic XML sitemap instantly updates as new dishes, 400 compendium chapters, and programmatic city landing pages are created.
            </p>

            <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Auto-Sync XML Sitemap</span>
                <span className="text-[11px] text-neutral-400">
                  {sitemapAutoGenerate ? 'Active &bull; Auto-pinging Google Search Console' : 'Paused'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sitemapAutoGenerate}
                  onChange={(e) => onToggleSitemap(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-neutral-800/80 text-[11px] font-mono text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>Total URLs Included:</span>
                <span className="text-emerald-400 font-bold">482 URLs</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="text-white">Live Real-time</span>
              </div>
              <div className="flex justify-between">
                <span>Google Ping Status:</span>
                <span className="text-emerald-400">HTTP 200 OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* robots.txt Direct Editor */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Live robots.txt Direct Editor</span>
            </h3>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>/robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <textarea
            rows={6}
            value={robotsDraft}
            onChange={(e) => setRobotsDraft(e.target.value)}
            className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center justify-between">
            {robotsSaved ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live robots.txt updated!</span>
              </span>
            ) : (
              <span className="text-[11px] text-neutral-500 font-mono">Changes apply to Googlebot immediately</span>
            )}
            <button
              onClick={handleSaveRobots}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Apply robots.txt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: 301 Redirect Manager */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <span>301 / 302 Redirect Manager (Prevent 404s &amp; Preserve Link Equity)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Redirect retired URLs or promotional campaigns directly without editing server nginx configurations.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {redirects.length} Active Rules
          </span>
        </div>

        {/* Add Redirect Form */}
        <form onSubmit={handleCreateRedirect} className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1">Old URL Source Path</label>
            <input
              type="text"
              required
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="/old-dish-url"
              className="w-full p-2 bg-black/60 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Destination Target</label>
            <input
              type="text"
              required
              value={destUrl}
              onChange={(e) => setDestUrl(e.target.value)}
              placeholder="/menu or https://..."
              className="w-full p-2 bg-black/60 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">HTTP Status</label>
            <select
              value={redirectType}
              onChange={(e) => setRedirectType(Number(e.target.value) as 301 | 302)}
              className="w-full p-2 bg-black/60 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value={301}>301 (Permanent Moved)</option>
              <option value={302}>302 (Temporary Found)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Redirect Rule</span>
            </button>
          </div>
        </form>

        {/* Redirects Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3">Source URL Path</th>
                <th className="p-3">Destination Target</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Hits Tracked</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 font-mono">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-900/50 transition">
                  <td className="p-3 text-rose-300 font-medium">{r.source}</td>
                  <td className="p-3 text-emerald-400">{r.destination}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-bold">
                      {r.type}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-neutral-300">{r.hits || 0} hits</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onDeleteRedirect(r.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                      title="Delete Rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Schema Markup Generator */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Interactive Schema Markup Generator (JSON-LD)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Generate valid Schema.org structured data to win Google Rich Results, star ratings, and knowledge panels.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSchemaType('Restaurant')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedSchemaType === 'Restaurant'
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setSelectedSchemaType('Article')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedSchemaType === 'Article'
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Article
            </button>
            <button
              onClick={() => setSelectedSchemaType('Product')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedSchemaType === 'Product'
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Product / Dish
            </button>
            <button
              onClick={() => setSelectedSchemaType('FAQPage')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedSchemaType === 'FAQPage'
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              FAQPage
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Controls */}
          <div className="space-y-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Entity / Item Name</label>
              <input
                type="text"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                className="w-full p-2 bg-black/60 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Entity Description</label>
              <textarea
                rows={3}
                value={schemaDesc}
                onChange={(e) => setSchemaDesc(e.target.value)}
                className="w-full p-2 bg-black/60 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  type="checkbox"
                  checked={autoInjected}
                  onChange={(e) => setAutoInjected(e.target.checked)}
                  className="accent-purple-500 w-4 h-4 rounded cursor-pointer"
                />
                <span>Auto-Inject into &lt;head&gt; HTML</span>
              </label>

              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Google Rich Results Test</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Generated Code Block */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black/80 p-4 font-mono text-[11px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-400">
              <span>application/ld+json</span>
              <button
                onClick={handleCopySchema}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded flex items-center gap-1 cursor-pointer transition"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedSchema ? 'Copied!' : 'Copy Schema'}</span>
              </button>
            </div>
            <pre className="text-emerald-400 overflow-x-auto max-h-60 leading-relaxed">
              {getGeneratedSchemaJson()}
            </pre>
          </div>
        </div>
      </div>

      {/* Row 4: Page Speed & Core Web Vitals Optimization Tips */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Page Speed &amp; Core Web Vitals Optimization Playbook</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Mobile Optimized</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="font-bold text-emerald-400 font-mono">1. LCP (Largest Contentful Paint)</span>
            <p className="text-neutral-300 leading-relaxed">
              Margalla Hills uses modern pre-compressed WebP hero banners and lazy-loads sub-fold imagery with priority hints on first paint.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">Current Score: 1.1s (Target: &lt;2.5s)</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="font-bold text-cyan-400 font-mono">2. INP (Interaction to Next Paint)</span>
            <p className="text-neutral-300 leading-relaxed">
              Zero blocking heavy third-party tracking scripts in initial viewport. Dynamic modules hydrate asynchronously for instant touch responsiveness.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">Current Score: 18ms (Target: &lt;200ms)</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="font-bold text-amber-400 font-mono">3. CLS (Cumulative Layout Shift)</span>
            <p className="text-neutral-300 leading-relaxed">
              All dish images, cards, and video containers specify rigid aspect ratios, preventing layout jank while infinite scrolling the 400 compendium.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">Current Score: 0.01 (Target: &lt;0.1)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
