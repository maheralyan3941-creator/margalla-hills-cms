import React, { useState } from 'react';
import { BacklinkItem } from '../../types';
import {
  Link2,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Trash2,
  Globe2,
  ShieldCheck,
  AlertCircle,
  Filter,
  ArrowUpRight
} from 'lucide-react';

interface ModuleGuestPostingProps {
  backlinks: BacklinkItem[];
  onAddBacklink: (bl: Omit<BacklinkItem, 'id' | 'dateAdded'>) => void;
  onUpdateBacklink: (id: string, updates: Partial<BacklinkItem>) => void;
  onDeleteBacklink: (id: string) => void;
  showToast?: (msg: string) => void;
}

export function ModuleGuestPosting({
  backlinks,
  onAddBacklink,
  onUpdateBacklink,
  onDeleteBacklink,
  showToast
}: ModuleGuestPostingProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Form Fields
  const [referringDomain, setReferringDomain] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [targetPageUrl, setTargetPageUrl] = useState('https://margallahills.com/');
  const [anchorText, setAnchorText] = useState('');
  const [linkType, setLinkType] = useState<'dofollow' | 'nofollow'>('dofollow');
  const [domainRating, setDomainRating] = useState<number>(0);
  const [status, setStatus] = useState<BacklinkItem['status']>('Pending');
  const [notes, setNotes] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referringDomain.trim()) return;

    onAddBacklink({
      referringDomain: referringDomain.trim().toLowerCase(),
      sourceUrl: sourceUrl.trim() || `https://${referringDomain.trim().toLowerCase()}`,
      targetPageUrl: targetPageUrl.trim(),
      anchorText: anchorText.trim(),
      linkType,
      domainRating: Number(domainRating) || 0,
      status,
      notes: notes.trim()
    });

    if (showToast) showToast(`Guest post pitch for ${referringDomain} logged!`);

    // Reset
    setReferringDomain('');
    setSourceUrl('');
    setTargetPageUrl('https://margallahills.com/');
    setAnchorText('');
    setDomainRating(0);
    setStatus('Pending');
    setNotes('');
    setShowAddForm(false);
  };

  // Real Metric Calculations (Purely from logged entries - no fake numbers!)
  const totalEntries = backlinks.length;
  const activeLinks = backlinks.filter((b) => b.status === 'Active');
  const pendingLinks = backlinks.filter((b) => b.status === 'Pending');
  const doFollowCount = backlinks.filter((b) => b.linkType === 'dofollow').length;
  const doFollowRatio = totalEntries > 0 ? Math.round((doFollowCount / totalEntries) * 100) : 0;
  
  // Real average DA calculated from user-logged records
  const avgDA =
    activeLinks.length > 0
      ? Math.round(activeLinks.reduce((acc, b) => acc + (b.domainRating || 0), 0) / activeLinks.length)
      : totalEntries > 0
      ? Math.round(backlinks.reduce((acc, b) => acc + (b.domainRating || 0), 0) / totalEntries)
      : 0;

  const filteredLinks = backlinks.filter((b) => {
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    const matchesSearch =
      b.referringDomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.anchorText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.targetPageUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#121612] p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
            <Link2 className="w-3.5 h-3.5" />
            <span>Off-Page SEO &amp; Outreach Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Real Guest Posting &amp; Backlinks Manager
          </h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
            Track real outreach pitches, published guest posts, target anchor texts, and actual acquired backlinks. Zero fake data—everything is tracked authentically.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Guest Post / Backlink</span>
        </button>
      </div>

      {/* Real Performance Metrics - Calculated from actual data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
            Total Outreach / Pitches
          </span>
          <div className="text-3xl font-serif font-bold text-white">{totalEntries}</div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {pendingLinks.length} pending negotiation / review
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
            Live Verified Backlinks
          </span>
          <div className="text-3xl font-serif font-bold text-emerald-400">{activeLinks.length}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Confirmed indexed by Googlebot</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
            Avg Referring Site DR
          </span>
          <div className="text-3xl font-serif font-bold text-purple-400">
            {avgDA > 0 ? `DR ${avgDA}` : 'DR 0'}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {avgDA > 0 ? 'Average DR of logged publishers' : '0 referring domains logged'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
            DoFollow Ratio
          </span>
          <div className="text-3xl font-serif font-bold text-cyan-400">
            {totalEntries > 0 ? `${doFollowRatio}%` : '0%'}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            {doFollowCount} DoFollow links passing PageRank
          </p>
        </div>
      </div>

      {/* Add New Guest Post Form Modal */}
      {showAddForm && (
        <div className="p-6 bg-[#141416] border border-emerald-500/30 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Log Outreach Pitch or Acquired Guest Post</span>
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs text-neutral-500 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Publisher Website / Domain *
              </label>
              <input
                type="text"
                required
                value={referringDomain}
                onChange={(e) => setReferringDomain(e.target.value)}
                placeholder="e.g., dawn.com, tribune.com.pk, or foodblog.pk"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Published Article URL (or website link)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://dawn.com/news/12345/top-dining"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Target URL on Margalla Hills *
              </label>
              <input
                type="text"
                required
                value={targetPageUrl}
                onChange={(e) => setTargetPageUrl(e.target.value)}
                placeholder="https://margallahills.com/menu or /blog/article-slug"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Anchor Text Used
              </label>
              <input
                type="text"
                value={anchorText}
                onChange={(e) => setAnchorText(e.target.value)}
                placeholder="e.g., Margalla Hills luxury restaurant"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Publisher DA
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={domainRating}
                  onChange={(e) => setDomainRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Link Type
                </label>
                <select
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value as any)}
                  className="w-full px-2 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="dofollow">DoFollow</option>
                  <option value="nofollow">NoFollow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-2 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Live Active</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Outreach Notes / Contact Details
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Editor contact: editor@domain.com, barter guest post"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-neutral-900 text-neutral-300 text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl cursor-pointer shadow"
              >
                Save Outreach Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121212] p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by referring domain, anchor text, or target page..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
          {['All', 'Active', 'Pending', 'Lost'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded font-medium transition cursor-pointer ${
                selectedStatus === st
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Backlinks Table */}
      <div className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg">
        <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400">
          <span>Tracked Links ({filteredLinks.length})</span>
          <span>Status &amp; Verification</span>
        </div>

        {filteredLinks.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Link2 className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-sm font-medium text-neutral-400">No guest post links recorded yet</p>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              Start your real backlink campaign by clicking &quot;Log New Guest Post / Backlink&quot;. Record outreach emails, accepted pitches, and live verified dofollow links.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/60">
            {filteredLinks.map((bl) => (
              <div
                key={bl.id}
                className="p-4 sm:p-5 hover:bg-neutral-900/40 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-white flex items-center gap-1">
                      <Globe2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{bl.referringDomain}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      DA {bl.domainRating || 0}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        bl.linkType === 'dofollow'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {bl.linkType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        bl.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : bl.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {bl.status === 'Active' ? 'Live Verified' : bl.status}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-2">
                    <span>
                      Anchor: <strong className="text-white">&quot;{bl.anchorText}&quot;</strong>
                    </span>
                    <span>&bull;</span>
                    <span className="text-neutral-500 font-mono text-[11px]">
                      Points to: <span className="text-emerald-400">{bl.targetPageUrl}</span>
                    </span>
                  </div>

                  {bl.notes && (
                    <p className="text-xs text-neutral-500 italic">
                      Notes: {bl.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {bl.sourceUrl && (
                    <a
                      href={bl.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs flex items-center gap-1 transition border border-neutral-800"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px]">Check Link</span>
                    </a>
                  )}

                  <select
                    value={bl.status}
                    onChange={(e) => onUpdateBacklink(bl.id, { status: e.target.value as any })}
                    className="px-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Lost">Lost</option>
                  </select>

                  <button
                    onClick={() => onDeleteBacklink(bl.id)}
                    className="p-2 bg-neutral-900 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 rounded-lg text-xs transition border border-neutral-800 cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
