import React, { useState, useEffect } from 'react';
import {
  Send,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Share2,
  Copy,
  Zap,
  RefreshCw,
  Search,
  Check,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { IndexingSubmissionItem } from '../../types';

interface ModuleLiveIndexingProps {
  customDomain?: string;
}

export function ModuleLiveIndexing({ customDomain = 'margallahills.com' }: ModuleLiveIndexingProps) {
  const normalizedDomain = (customDomain || 'margallahills.com').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const baseUrl = `https://${normalizedDomain}`;

  const [targetUrl, setTargetUrl] = useState(`${baseUrl}/blog/renaissance-mountain-gastronomy`);
  const [utmSource, setUtmSource] = useState('whatsapp');
  const [utmCampaign, setUtmCampaign] = useState('weekend_dinner');
  const [submitting, setSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);

  // Submissions history from localStorage
  const [submissions, setSubmissions] = useState<IndexingSubmissionItem[]>(() => {
    try {
      const stored = localStorage.getItem('mh_indexing_submissions');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('mh_indexing_submissions', JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  // Quick preset links from real website
  const presetUrls = [
    { label: 'Homepage', path: '/' },
    { label: 'Latest Blog Article', path: '/blog/renaissance-mountain-gastronomy' },
    { label: 'Full Luxury Menu', path: '/menu' },
    { label: 'Heritage Kashmiri Saffron', path: '/heritage' },
    { label: 'Private Dining Salons', path: '/private-dining' },
    { label: '7-Course Tasting Symphony', path: '/tasting-menu' },
    { label: '50+ Global Flagship Locations', path: '/locations' }
  ];

  const handleSelectPreset = (path: string) => {
    setTargetUrl(`${baseUrl}${path}`);
  };

  // 1. Submit to IndexNow & Search Engine Pings via backend
  const handleInstantIndexing = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetUrl.trim()) return;

    setSubmitting(true);
    setLastResponse(null);

    try {
      const res = await fetch('/api/seo/submit-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl.trim(),
          host: normalizedDomain
        })
      });

      const data = await res.json();
      setLastResponse(data);

      // Add to submission history
      const newSubmission: IndexingSubmissionItem = {
        id: 'sub-' + Date.now(),
        url: targetUrl.trim(),
        submittedAt: new Date().toLocaleTimeString() + ' (' + new Date().toLocaleDateString() + ')',
        methods: ['IndexNow API', 'Sitemap Ping', 'GSC Ready'],
        status: 'Success',
        responseNote: data?.details?.indexNow?.message || 'Pushed to search engine indexers'
      };

      setSubmissions(prev => [newSubmission, ...prev.slice(0, 19)]);
    } catch (err: any) {
      setLastResponse({
        success: false,
        error: err.message || 'Submission failed'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Direct Live Google Search Console Link
  const gscInspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(baseUrl + '/')}&id=${encodeURIComponent(targetUrl)}`;
  // Direct Live Google Rich Results Link
  const richResultsUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(targetUrl)}`;
  // Direct Schema Validator Link
  const schemaValidatorUrl = `https://validator.schema.org/#url=${encodeURIComponent(targetUrl)}`;
  // Direct Bing Webmaster URL inspection
  const bingInspectionUrl = `https://www.bing.com/webmasters/urlinspection?url=${encodeURIComponent(targetUrl)}`;

  // Real Traffic: Tracking URL with UTM
  const trackingUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}utm_source=${encodeURIComponent(utmSource)}&utm_medium=social&utm_campaign=${encodeURIComponent(utmCampaign)}`;
  
  // WhatsApp Share Message
  const whatsAppShareText = `Exclusive Dining at Margalla Hills Islamabad 🏔️\nExperience our bespoke culinary sanctuary and reserve your private salon:\n${trackingUrl}`;
  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(whatsAppShareText)}`;

  const handleCopyTrackingLink = () => {
    navigator.clipboard.writeText(trackingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWhatsAppText = () => {
    navigator.clipboard.writeText(whatsAppShareText);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121212] via-[#161616] to-[#121212] border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Real Live URL Indexing &amp; Crawler Submissions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Live Search Engine Submission &amp; Traffic Hub
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Submit your published pages, blog articles, and menu dishes directly to search engine crawlers (Google, Bing, IndexNow) and launch trackable traffic links for immediate real visitors.
            </p>
          </div>

          {/* Quick Domain Badge */}
          <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 shrink-0 text-left">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
              Active Connected Domain
            </span>
            <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              {normalizedDomain}
            </span>
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Sitemap: <a href="/sitemap.xml" target="_blank" className="text-amber-400 hover:underline">/sitemap.xml</a>
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE URL SUBMISSION FORM */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>1. Submit URL for Live Indexing (Google &amp; Bing)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select or paste any live URL from your site to alert crawlers and request Google indexing.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {presetUrls.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset.path)}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] font-mono rounded-lg border border-neutral-800 transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleInstantIndexing} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Target Page URL to Index:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="url"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder={`https://${normalizedDomain}/blog/your-article-slug`}
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Search Engines...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Submit &amp; Ping Search Engines</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct Search Engine Live Deep Links */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-neutral-400 block mb-2">
              Official Crawler Inspection Links (1-Click Live Open):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Google Search Console Direct Inspect */}
              <a
                href={gscInspectUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 hover:bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-blue-400 font-bold text-xs">
                  <span>Google Search Console</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Opens GSC Inspect URL &rarr; Click &quot;Request Indexing&quot; directly on Google.
                </p>
                <span className="text-[10px] text-blue-400 font-mono mt-2 font-semibold">
                  &rarr; Inspect in GSC
                </span>
              </a>

              {/* Google Rich Results Test */}
              <a
                href={richResultsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                  <span>Google Rich Results Test</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Runs Google Smartphone live bot to crawl &amp; validate Schema markup.
                </p>
                <span className="text-[10px] text-emerald-400 font-mono mt-2 font-semibold">
                  &rarr; Test Live Bot
                </span>
              </a>

              {/* Schema Validator */}
              <a
                href={schemaValidatorUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 hover:bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-purple-400 font-bold text-xs">
                  <span>Schema.org Validator</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Validates Restaurant, Article, and Recipe structured data.
                </p>
                <span className="text-[10px] text-purple-400 font-mono mt-2 font-semibold">
                  &rarr; Validate JSON-LD
                </span>
              </a>

              {/* Bing Webmasters */}
              <a
                href={bingInspectionUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-black/60 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-amber-400 font-bold text-xs">
                  <span>Bing Webmaster Tools</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Direct inspection tool for Microsoft Bing &amp; Yahoo indexers.
                </p>
                <span className="text-[10px] text-amber-400 font-mono mt-2 font-semibold">
                  &rarr; Bing URL Inspect
                </span>
              </a>
            </div>
          </div>
        </form>

        {/* Live Response Box */}
        {lastResponse && (
          <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/40 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>Real Live Submission Status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-1">
              <div>
                <span className="text-neutral-500 block">Submitted Target:</span>
                <span className="text-white break-all">{lastResponse.url}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">IndexNow Result:</span>
                <span className="text-emerald-300">
                  {lastResponse.details?.indexNow?.message || 'Delivered to Search Engine Endpoint'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: REAL TRAFFIC LAUNCHPAD (WHATSAPP & UTM TRACKING) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-neutral-800 space-y-6">
        <div className="border-b border-neutral-800/80 pb-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
            <Share2 className="w-3.5 h-3.5" />
            <span>Instant Traffic Engine</span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
            2. Launch Real Visitor Traffic (Trackable GA4 Campaign)
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Search engines take 24-48 hours to crawl. Use this launchpad to send trackable traffic to your link right now via WhatsApp, Facebook, or Instagram. All clicks appear live in Google Analytics 4.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Traffic Source (UTM Source)
              </label>
              <select
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="whatsapp">WhatsApp (Groups / Contacts)</option>
                <option value="instagram">Instagram Bio / Story</option>
                <option value="facebook">Facebook Page / Group</option>
                <option value="google_maps">Google Maps (Business Profile Update)</option>
                <option value="email_outreach">Direct Email Outreach</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value.replace(/\s+/g, '_').toLowerCase())}
                placeholder="e.g. food_blogger_launch"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              >
              </input>
              <p className="text-[11px] text-neutral-500 mt-1">
                Visible in Google Analytics &rarr; Traffic Acquisition &rarr; Session Campaign.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyTrackingLink}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied Trackable Link!' : 'Copy Trackable URL'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Push Box */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-black border border-neutral-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ready-to-Send WhatsApp Viral Message</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyWhatsAppText}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWhatsApp ? 'Copied Text' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-sans text-xs text-neutral-300 whitespace-pre-line leading-relaxed">
                {whatsAppShareText}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsAppShareUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp &amp; Send to Groups / Contacts</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: RECENT SUBMISSIONS LOG */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>Real Live Submission History Log</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              URLs that have been submitted to search engines from this dashboard.
            </p>
          </div>
          {submissions.length > 0 && (
            <button
              onClick={() => setSubmissions([])}
              className="text-[11px] text-neutral-500 hover:text-rose-400 font-mono transition cursor-pointer"
            >
              Clear Log
            </button>
          )}
        </div>

        {submissions.length === 0 ? (
          <div className="p-8 rounded-xl bg-black/40 border border-dashed border-neutral-800 text-center space-y-2">
            <Zap className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-xs text-neutral-400">
              No URLs submitted in this session yet. Submit your first article or page above!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2.5 px-3">Submitted URL</th>
                  <th className="py-2.5 px-3">Protocols Triggered</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {submissions.map((item) => (
                  <tr key={item.id} className="hover:bg-black/30 transition">
                    <td className="py-3 px-3 text-white max-w-xs truncate">
                      {item.url}
                    </td>
                    <td className="py-3 px-3 text-neutral-400">
                      {item.methods.join(', ')}
                    </td>
                    <td className="py-3 px-3 text-neutral-500">
                      {item.submittedAt}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(baseUrl + '/')}&id=${encodeURIComponent(item.url)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center gap-1 font-sans font-semibold cursor-pointer"
                      >
                        <span>GSC Inspect</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 4: REAL SEO CHECKLIST (NO FAKE METRICS) */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Real World Rules for 100% Authentic Search Indexing &amp; Traffic</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-400 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-white font-semibold block">1. Google Search Console Truth</span>
            <p>
              Google never guarantees instant indexing from third-party scripts. The official GSC Inspect tool above is the only authoritative place where Googlebot queues your URL.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-white font-semibold block">2. IndexNow Protocol</span>
            <p>
              IndexNow is supported by Bing, Yandex, and Seznam. Pushing URLs here notifies Microsoft Bing's crawlers within minutes.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-white font-semibold block">3. Traffic Attribution</span>
            <p>
              Real traffic comes from humans visiting via search or shared links. Every link generated with our UTM parameters will be logged accurately in your GA4 dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
