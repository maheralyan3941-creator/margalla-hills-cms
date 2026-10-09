import React, { useState } from 'react';
import { ProgrammaticTemplate } from '../../types';
import {
  Sparkles,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Eye,
  Zap,
  Globe2,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Module9ProgrammaticSEOProps {
  templates: ProgrammaticTemplate[];
  onGeneratePages: (templateId: string, count: number) => void;
}

export function Module9ProgrammaticSEO({ templates, onGeneratePages }: Module9ProgrammaticSEOProps) {
  const [csvContent, setCsvContent] = useState('');
  const [parsedRows, setParsedRows] = useState<Array<{ keyword: string; city: string; slug: string }>>([]);
  const [csvSuccess, setCsvSuccess] = useState(false);

  // Template builder state
  const [keywordPattern, setKeywordPattern] = useState('Bespoke Culinary Catering');
  const [citiesList, setCitiesList] = useState(
    'Islamabad\nRawalpindi\nLahore\nKarachi\nPeshawar\nMurree\nFaisalabad\nSialkot\nAbbottabad\nWah Cantt\nGujranwala'
  );
  const [titleTemplate, setTitleTemplate] = useState('{keyword} in {city} | Margalla Hills Luxury Banquets');
  const [metaTemplate, setMetaTemplate] = useState(
    'Discover award-winning {keyword} and 7-course Michelin-caliber saffron feasts by Margalla Hills in {city}.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);

  // Parse CSV input
  const handleParseCsv = () => {
    if (!csvContent.trim()) return;
    const lines = csvContent.split('\n').map((l) => l.trim()).filter(Boolean);
    const rows = lines.map((line) => {
      const parts = line.split(',');
      const kw = parts[0]?.trim() || 'Luxury Dining';
      const city = parts[1]?.trim() || 'Islamabad';
      const slug = `${kw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      return { keyword: kw, city, slug };
    });
    setParsedRows(rows);
    setCsvSuccess(true);
  };

  const handleGenerateBatch = () => {
    setIsGenerating(true);
    setGenerationDone(false);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationDone(true);
      if (templates[0]) {
        onGeneratePages(templates[0].id, parsedRows.length || 15);
      }
    }, 1200);
  };

  const citiesArray = citiesList.split('\n').map((c) => c.trim()).filter(Boolean);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Section 9 &bull; Programmatic SEO &amp; Scalable Large-Site Automation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          CSV Bulk Generator &amp; [Keyword] + [City] Matrix
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-2xl">
          Scale thousands of programmatic landing pages across major metropolitan cities without touching a single line of code. Auto-generates unique titles, meta descriptions, and slugs.
        </p>
      </div>

      {/* Grid: CSV Bulk Upload & Interactive Template Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section A: CSV Drag & Drop / Paste */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Bulk CSV Uploader / Paste Box</span>
            </h3>
            <span className="text-[11px] font-mono text-neutral-400">Format: Keyword, City</span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Paste or drag a CSV list of target keywords and cities. The engine automatically expands them into indexed landing pages with matching XML sitemap entries.
          </p>

          <textarea
            rows={5}
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            placeholder={'Michelin Tasting Menu, Islamabad\nSaffron Wedding Catering, Rawalpindi\nDiplomatic Enclave Banquet, Lahore\nMountain View Dining, Murree Hills'}
            className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white font-mono placeholder-neutral-600 focus:outline-none focus:border-emerald-500 leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleParseCsv}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5 font-medium"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Parse CSV Rows</span>
            </button>

            {parsedRows.length > 0 && (
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {parsedRows.length} Pages Parsed
              </span>
            )}
          </div>

          {parsedRows.length > 0 && (
            <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-2 max-h-44 overflow-y-auto text-xs font-mono">
              {parsedRows.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] text-neutral-300">
                  <span className="text-white font-semibold">{r.keyword} ({r.city})</span>
                  <span className="text-emerald-400">/programmatic/{r.slug}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section B: Template Generator */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>[Keyword] + [City] Matrix Generator</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">Variable Engine</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Target Base Keyword</label>
              <input
                type="text"
                value={keywordPattern}
                onChange={(e) => setKeywordPattern(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Target Cities / Geographic Markets (1 per line)
              </label>
              <textarea
                rows={4}
                value={citiesList}
                onChange={(e) => setCitiesList(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Title Tag Dynamic Template</label>
              <input
                type="text"
                value={titleTemplate}
                onChange={(e) => setTitleTemplate(e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview of Dynamic Output */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Live Generated Programmatic Pages Preview</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Simulating dynamic variables `{'{keyword}'}` and `{'{city}'}` across {citiesArray.length} target markets.
            </p>
          </div>

          <button
            onClick={handleGenerateBatch}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Deploying to XML Sitemap...' : `Generate & Index All ${citiesArray.length} Pages`}</span>
          </button>
        </div>

        {generationDone && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Successfully generated and appended {citiesArray.length} programmatic landing pages to /sitemap.xml!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {citiesArray.slice(0, 6).map((city, idx) => {
            const compiledTitle = titleTemplate.replace('{keyword}', keywordPattern).replace('{city}', city);
            const compiledMeta = metaTemplate.replace('{keyword}', keywordPattern).replace('{city}', city);
            const slug = `${keywordPattern.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

            return (
              <div key={idx} className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="text-cyan-400 font-semibold">{city}</span>
                  <span>/programmatic/{slug}</span>
                </div>
                <h4 className="font-semibold text-xs text-white leading-snug">{compiledTitle}</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">{compiledMeta}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
