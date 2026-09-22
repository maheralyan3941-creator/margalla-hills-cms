import React, { useState } from 'react';
import { PageSEOItem, SchemaType } from '../../types';
import {
  FileText,
  Save,
  Globe2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Share2,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

interface Module4OnPageSEOProps {
  pages: PageSEOItem[];
  onUpdatePage: (id: string, updates: Partial<PageSEOItem>) => void;
}

export function Module4OnPageSEO({ pages, onUpdatePage }: Module4OnPageSEOProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || 'page-home');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  // Local form state
  const [seoTitle, setSeoTitle] = useState(currentPage?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(currentPage?.metaDescription || '');
  const [slug, setSlug] = useState(currentPage?.slug || '');
  const [canonicalUrl, setCanonicalUrl] = useState(currentPage?.canonicalUrl || '');
  const [h1Heading, setH1Heading] = useState(currentPage?.h1Heading || '');
  const [h2Headings, setH2Headings] = useState<string[]>(currentPage?.h2Headings || []);
  const [h3Headings, setH3Headings] = useState<string[]>(currentPage?.h3Headings || []);
  const [imageAltText, setImageAltText] = useState(currentPage?.imageAltText || '');
  const [ogTitle, setOgTitle] = useState(currentPage?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(currentPage?.ogDescription || '');
  const [ogImage, setOgImage] = useState(currentPage?.ogImage || '');
  const [schemaType, setSchemaType] = useState<SchemaType>(currentPage?.schemaType || 'Restaurant');
  const [robotsIndex, setRobotsIndex] = useState(currentPage?.robotsIndex ?? true);
  const [robotsFollow, setRobotsFollow] = useState(currentPage?.robotsFollow ?? true);

  // Sync state when selected page changes
  const handleSelectPage = (id: string) => {
    setSelectedPageId(id);
    const p = pages.find((page) => page.id === id);
    if (p) {
      setSeoTitle(p.seoTitle);
      setMetaDescription(p.metaDescription);
      setSlug(p.slug);
      setCanonicalUrl(p.canonicalUrl);
      setH1Heading(p.h1Heading);
      setH2Headings([...p.h2Headings]);
      setH3Headings([...p.h3Headings]);
      setImageAltText(p.imageAltText);
      setOgTitle(p.ogTitle);
      setOgDescription(p.ogDescription);
      setOgImage(p.ogImage);
      setSchemaType(p.schemaType);
      setRobotsIndex(p.robotsIndex);
      setRobotsFollow(p.robotsFollow);
      setSaveSuccess(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePage(selectedPageId, {
      seoTitle,
      metaDescription,
      slug,
      canonicalUrl,
      h1Heading,
      h2Headings,
      h3Headings,
      imageAltText,
      ogTitle,
      ogDescription,
      ogImage,
      schemaType,
      robotsIndex,
      robotsFollow,
      updatedAt: new Date().toISOString()
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Heading manager helpers
  const handleAddH2 = () => setH2Headings([...h2Headings, 'New Sub-Section Heading']);
  const handleUpdateH2 = (index: number, val: string) => {
    const updated = [...h2Headings];
    updated[index] = val;
    setH2Headings(updated);
  };
  const handleDeleteH2 = (index: number) => {
    setH2Headings(h2Headings.filter((_, i) => i !== index));
  };

  const handleAddH3 = () => setH3Headings([...h3Headings, 'Supporting Point Heading']);
  const handleUpdateH3 = (index: number, val: string) => {
    const updated = [...h3Headings];
    updated[index] = val;
    setH3Headings(updated);
  };
  const handleDeleteH3 = (index: number) => {
    setH3Headings(h3Headings.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Section 4 &bull; Full On-Page SEO &amp; Rich Schema Manager</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Page-Level Metadata, Headings &amp; Social Graph
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Optimize Meta Titles, Descriptions, H1-H6 headings, OpenGraph previews, canonical tags, and structured data schemas.
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

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Google SERP Live Snippet Preview Box */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Google SERP Search Result Preview (Desktop &amp; Mobile)</span>
            </h3>
            <span className="text-[11px] font-mono text-neutral-400">Real-time Simulation</span>
          </div>

          <div className="p-4 bg-black/70 rounded-xl border border-neutral-800 space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">M</span>
              <span className="text-neutral-300 font-mono">{canonicalUrl || 'https://margallahills.com' + (slug ? `/${slug}` : '')}</span>
            </div>
            <div className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
              {seoTitle || 'Page Title Tag'}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
              {metaDescription || 'Meta description text snippet will appear here on Google search result pages...'}
            </p>
          </div>
        </div>

        {/* Title, Description & Canonical Grid */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
          <h3 className="font-serif text-base font-bold text-white border-b border-neutral-800 pb-3">
            Core Metadata &amp; URLs
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* Title Tag */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="text-neutral-300 font-medium">Page Title Tag (Recommended: 50-60 chars)</label>
                <span className={`font-mono font-bold ${seoTitle.length > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {seoTitle.length} / 60 characters
                </span>
              </div>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Margalla Hills | Luxury Dining, Scenic Heritage & Resort Islamabad"
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="text-neutral-300 font-medium">Meta Description (Recommended: 140-160 chars)</label>
                <span className={`font-mono font-bold ${metaDescription.length > 160 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {metaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Experience extraordinary Michelin-caliber fine dining perched high above Islamabad..."
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              />
            </div>

            {/* Slug & Canonical */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. menu, compendium, tasting-menu"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Canonical URL</label>
                <input
                  type="url"
                  required
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://margallahills.com/menu"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* H1 to H6 Headings Manager */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-white">H1 to H6 Headings Architecture</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Enforce clean semantic heading hierarchy for Googlebot crawlability</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400 font-bold">
              1x H1 Verified
            </span>
          </div>

          {/* Primary H1 */}
          <div>
            <label className="text-xs text-neutral-300 font-medium flex items-center gap-1.5 mb-1.5">
              <Heading1 className="w-4 h-4 text-emerald-400" />
              <span>Primary H1 Heading (Single Unique Heading per Page)</span>
            </label>
            <input
              type="text"
              required
              value={h1Heading}
              onChange={(e) => setH1Heading(e.target.value)}
              className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-serif font-bold text-base"
            />
          </div>

          {/* H2 Headings List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Heading2 className="w-4 h-4 text-cyan-400" />
                <span>H2 Section Headings ({h2Headings.length})</span>
              </label>
              <button
                type="button"
                onClick={handleAddH2}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add H2</span>
              </button>
            </div>
            {h2Headings.map((h2, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={h2}
                  onChange={(e) => handleUpdateH2(idx, e.target.value)}
                  className="flex-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteH2(idx)}
                  className="p-2 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* H3 Headings List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Heading3 className="w-4 h-4 text-amber-400" />
                <span>H3 Sub-Section Headings ({h3Headings.length})</span>
              </label>
              <button
                type="button"
                onClick={handleAddH3}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add H3</span>
              </button>
            </div>
            {h3Headings.map((h3, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={h3}
                  onChange={(e) => handleUpdateH3(idx, e.target.value)}
                  className="flex-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteH3(idx)}
                  className="p-2 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Alt Text & OpenGraph (OG) Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Alt Text */}
          <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Image Alt Text (Accessibility &amp; Image SEO)</span>
            </h3>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">
                Primary Featured Image Descriptive Alt Text
              </label>
              <input
                type="text"
                value={imageAltText}
                onChange={(e) => setImageAltText(e.target.value)}
                placeholder="Margalla Hills Islamabad luxury restaurant panoramic balcony at twilight"
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Ensures Google Images indexes your dishes and dining panoramas.
              </p>
            </div>

            {ogImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800">
                <img
                  src={ogImage}
                  alt={imageAltText}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/80 text-[10px] text-neutral-300 font-mono">
                  Alt: {imageAltText}
                </span>
              </div>
            )}
          </div>

          {/* Social OpenGraph Tags */}
          <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>OpenGraph (OG) &amp; Twitter Cards</span>
            </h3>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">OG Title</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">OG Description</label>
              <textarea
                rows={2}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">OG Image URL</label>
              <input
                type="url"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Schema Type Select & Robots Directives */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Structured Data Schema Type &amp; Robots Directives</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">Schema.org Entity Type</label>
              <select
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value as SchemaType)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
              >
                <option value="Restaurant">Restaurant (Default)</option>
                <option value="LocalBusiness">LocalBusiness</option>
                <option value="FoodEstablishment">FoodEstablishment</option>
                <option value="Menu">Menu (Culinary Collection)</option>
                <option value="Article">Article (Compendium Chapter)</option>
                <option value="FAQPage">FAQPage</option>
                <option value="ItemPage">ItemPage</option>
                <option value="WebPage">WebPage</option>
              </select>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsIndex}
                  onChange={(e) => setRobotsIndex(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <span>Allow Googlebot Indexing (index)</span>
              </label>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <span>Allow Follow Links (follow)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-neutral-900/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-800 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {saveSuccess ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>On-Page SEO changes successfully saved and applied to site!</span>
              </span>
            ) : (
              <span className="text-neutral-400">Ready to publish on-page changes for: {currentPage?.name}</span>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Update On-Page SEO</span>
          </button>
        </div>
      </form>
    </div>
  );
}
