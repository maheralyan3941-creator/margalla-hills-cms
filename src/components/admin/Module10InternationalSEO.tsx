import React, { useState } from 'react';
import { PageSEOItem } from '../../types';
import {
  Globe,
  Save,
  CheckCircle2,
  Copy,
  Code2,
  ExternalLink,
  Languages,
  Sparkles
} from 'lucide-react';

interface Module10InternationalSEOProps {
  pages: PageSEOItem[];
  onUpdateHreflang: (pageId: string, tags: { en: string; 'en-pk': string; ur: string }) => void;
}

export function Module10InternationalSEO({ pages, onUpdateHreflang }: Module10InternationalSEOProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || 'page-home');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  const [enUrl, setEnUrl] = useState(currentPage?.hreflangTags?.en || 'https://margallahills.com/');
  const [enPkUrl, setEnPkUrl] = useState(currentPage?.hreflangTags?.['en-pk'] || 'https://margallahills.com/en-pk/');
  const [urUrl, setUrUrl] = useState(currentPage?.hreflangTags?.ur || 'https://margallahills.com/ur/');

  const handleSelectPage = (id: string) => {
    setSelectedPageId(id);
    const p = pages.find((page) => page.id === id);
    if (p) {
      setEnUrl(p.hreflangTags?.en || `https://margallahills.com${p.path}`);
      setEnPkUrl(p.hreflangTags?.['en-pk'] || `https://margallahills.com/en-pk${p.path}`);
      setUrUrl(p.hreflangTags?.ur || `https://margallahills.com/ur${p.path}`);
      setSaved(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHreflang(selectedPageId, {
      en: enUrl,
      'en-pk': enPkUrl,
      ur: urUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const generatedHtmlSnippet = `<!-- Google Multilingual Hreflang Alternate Links -->
<link rel="alternate" hreflang="en" href="${enUrl}" />
<link rel="alternate" hreflang="en-pk" href="${enPkUrl}" />
<link rel="alternate" hreflang="ur-PK" href="${urUrl}" />
<link rel="alternate" hreflang="x-default" href="${enUrl}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtmlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Section 10 &bull; International SEO &amp; Multi-Language Hreflang</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Hreflang Tags &amp; Geo-Targeting Manager
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Target global luxury travelers, overseas Pakistanis, and domestic diners with valid `hreflang` alternate links without cross-language duplicate content penalties.
          </p>
        </div>

        {/* Page Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-neutral-400 font-mono hidden sm:inline">Active Page:</label>
          <select
            value={selectedPageId}
            onChange={(e) => handleSelectPage(e.target.value)}
            className="p-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-emerald-400 font-mono font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.path || '/'})
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hreflang URLs Card */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
          <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-400" />
                <span>Configured Language &amp; Regional Alternate URLs</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Targeting global English, Pakistani English, and Urdu language locales
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-neutral-900 text-[11px] font-mono text-emerald-400 border border-neutral-800">
              ISO 639-1 Compliant
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* 1. English Global (en) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-neutral-300 font-semibold flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                    hreflang=&quot;en&quot;
                  </span>
                  <span>English (Global &amp; Default International Fallback)</span>
                </label>
                <span className="text-neutral-500 font-mono text-[11px]">x-default mapped</span>
              </div>
              <input
                type="url"
                required
                value={enUrl}
                onChange={(e) => setEnUrl(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 2. English Pakistan (en-pk) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-neutral-300 font-semibold flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                    hreflang=&quot;en-pk&quot;
                  </span>
                  <span>English (Pakistan Regional Target)</span>
                </label>
                <span className="text-emerald-400 font-mono text-[11px]">Local Currency &amp; Timings</span>
              </div>
              <input
                type="url"
                required
                value={enPkUrl}
                onChange={(e) => setEnPkUrl(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 3. Urdu (ur / ur-PK) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-neutral-300 font-semibold flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                    hreflang=&quot;ur-PK&quot;
                  </span>
                  <span>Urdu (Pakistan / اردو زبان)</span>
                </label>
                <span className="text-cyan-400 font-mono text-[11px]">RTL Native Rendering</span>
              </div>
              <input
                type="url"
                required
                value={urUrl}
                onChange={(e) => setUrUrl(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Live Generated HTML Code Preview */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Live Generated &lt;head&gt; HTML Snippet</span>
            </h3>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy HTML'}</span>
            </button>
          </div>

          <div className="p-4 bg-black/80 rounded-xl border border-neutral-800 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
            <pre>{generatedHtmlSnippet}</pre>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hreflang tags saved and injected into HTML &lt;head&gt; for {currentPage?.name}!</span>
            </span>
          ) : (
            <span className="text-xs text-neutral-500">Googlebot International Crawl Ready</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Deploy Hreflang Tags</span>
          </button>
        </div>
      </form>
    </div>
  );
}
