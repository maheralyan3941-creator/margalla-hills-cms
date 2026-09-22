import React, { useState } from 'react';
import { BacklinkItem } from '../../types';
import {
  Link2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  X,
  TrendingUp,
  Globe2,
  Download,
  UploadCloud,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Module7OffPageBacklinksProps {
  backlinks: BacklinkItem[];
  onAddBacklink: (bl: Omit<BacklinkItem, 'id' | 'dateAdded'>) => void;
  onUpdateBacklink: (id: string, updates: Partial<BacklinkItem>) => void;
  onDeleteBacklink: (id: string) => void;
}

export function Module7OffPageBacklinks({
  backlinks,
  onAddBacklink,
  onUpdateBacklink,
  onDeleteBacklink
}: Module7OffPageBacklinksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [editingItem, setEditingItem] = useState<BacklinkItem | null>(null);

  // Form states
  const [referringDomain, setReferringDomain] = useState('');
  const [sourceUrl, setSourceUrl] = useState('https://');
  const [targetPageUrl, setTargetPageUrl] = useState('https://margallahills.com/');
  const [anchorText, setAnchorText] = useState('');
  const [linkType, setLinkType] = useState<BacklinkItem['linkType']>('dofollow');
  const [domainRating, setDomainRating] = useState<number>(65);
  const [status, setStatus] = useState<BacklinkItem['status']>('Active');
  const [notes, setNotes] = useState('');

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Referring Domain', 'Source URL', 'Target Page', 'Anchor Text', 'Link Type', 'DA', 'Status', 'Date Added', 'Notes'];
    const rows = backlinks.map(b => [
      `"${b.referringDomain}"`,
      `"${b.sourceUrl}"`,
      `"${b.targetPageUrl}"`,
      `"${b.anchorText.replace(/"/g, '""')}"`,
      `"${b.linkType}"`,
      b.domainRating,
      `"${b.status}"`,
      `"${b.dateAdded}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `margalla_hills_backlinks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Disavow Generator Handler
  const handleDownloadDisavow = () => {
    const toxicOrLost = backlinks.filter(b => b.status === 'Lost' || b.status === 'Rejected');
    const lines = [
      '# Margalla Hills Restaurant & Resort - Google Search Console Disavow File',
      `# Exported on: ${new Date().toISOString()}`,
      '# Instructions: Upload this file at https://search.google.com/search-console/disavow-links',
      '',
      ...(toxicOrLost.length > 0
        ? toxicOrLost.map(b => `domain:${b.referringDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}`)
        : ['# No toxic or rejected links currently flagged. Sample entry below:', 'domain:spam-scraper-directory.xyz'])
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `disavow_links_${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk Import Handler
  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    const lines = bulkText.split('\n').map(l => l.trim()).filter(Boolean);
    let count = 0;

    lines.forEach(line => {
      // Allow CSV format: Domain, SourceURL, TargetURL, Anchor, DR, Type
      const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length >= 2) {
        const domain = parts[0] || 'external-site.com';
        const src = parts[1] || `https://${domain}`;
        const target = parts[2] || 'https://margallahills.com/';
        const anchor = parts[3] || 'Margalla Hills Restaurant';
        const dr = parseInt(parts[4], 10) || 50;
        const lType = (parts[5] as any) || 'dofollow';

        onAddBacklink({
          referringDomain: domain,
          sourceUrl: src,
          targetPageUrl: target,
          anchorText: anchor,
          domainRating: dr,
          linkType: ['dofollow', 'nofollow', 'sponsored', 'ugc'].includes(lType) ? lType : 'dofollow',
          status: 'Active',
          notes: 'Bulk imported link'
        });
        count++;
      } else if (line.startsWith('http://') || line.startsWith('https://')) {
        try {
          const urlObj = new URL(line);
          onAddBacklink({
            referringDomain: urlObj.hostname,
            sourceUrl: line,
            targetPageUrl: 'https://margallahills.com/',
            anchorText: 'Margalla Hills Resort',
            domainRating: 55,
            linkType: 'dofollow',
            status: 'Active',
            notes: 'Bulk URL import'
          });
          count++;
        } catch {
          // ignore invalid url
        }
      }
    });

    setBulkText('');
    setIsBulkModalOpen(false);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setReferringDomain('');
    setSourceUrl('https://');
    setTargetPageUrl('https://margallahills.com/');
    setAnchorText('Margalla Hills luxury dining');
    setLinkType('dofollow');
    setDomainRating(65);
    setStatus('Active');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: BacklinkItem) => {
    setEditingItem(item);
    setReferringDomain(item.referringDomain);
    setSourceUrl(item.sourceUrl);
    setTargetPageUrl(item.targetPageUrl);
    setAnchorText(item.anchorText);
    setLinkType(item.linkType);
    setDomainRating(item.domainRating);
    setStatus(item.status);
    setNotes(item.notes);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referringDomain.trim() || !sourceUrl.trim()) return;

    if (editingItem) {
      onUpdateBacklink(editingItem.id, {
        referringDomain,
        sourceUrl,
        targetPageUrl,
        anchorText,
        linkType,
        domainRating,
        status,
        notes
      });
    } else {
      onAddBacklink({
        referringDomain,
        sourceUrl,
        targetPageUrl,
        anchorText,
        linkType,
        domainRating,
        status,
        notes
      });
    }
    setIsModalOpen(false);
  };

  const filtered = backlinks.filter((b) => {
    const matchesSearch =
      b.referringDomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.anchorText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.sourceUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    const matchesType = selectedType === 'All' || b.linkType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const doFollowCount = backlinks.filter((b) => b.linkType === 'dofollow').length;
  const doFollowRatio = backlinks.length ? Math.round((doFollowCount / backlinks.length) * 100) : 0;
  const calculatedAvgDA = backlinks.length
    ? Math.round(backlinks.reduce((acc, b) => acc + (b.domainRating || 0), 0) / backlinks.length)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Link2 className="w-3.5 h-3.5" />
            <span>Section 7 &bull; Off-Page SEO &amp; Authority Link Building</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Authoritative Backlinks &amp; Referring Domains Tracker
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Log earned editorial links, PR press coverage, monitor anchor text diversity, and export Google Search Console Disavow files.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadDisavow}
            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-rose-400 border border-rose-500/30 font-mono font-semibold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Download Google Search Console Disavow file"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>GSC Disavow (.txt)</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-slate-200 border border-neutral-700 font-mono font-semibold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Export all backlinks to CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 font-mono font-semibold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Bulk Import</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Backlink</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Total Backlinks Logged</span>
          <span className="text-2xl font-serif font-bold text-white">{backlinks.length} Links</span>
        </div>
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Referring Domains</span>
          <span className="text-2xl font-serif font-bold text-emerald-400">
            {new Set(backlinks.map((b) => b.referringDomain)).size} Domains
          </span>
        </div>
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">DoFollow Ratio</span>
          <span className="text-2xl font-serif font-bold text-cyan-400">{doFollowRatio}% Clean</span>
        </div>
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Avg Referring Domain Rating (DR)</span>
          <span className="text-2xl font-serif font-bold text-purple-400">
            {calculatedAvgDA > 0 ? `DR ${calculatedAvgDA}` : 'DR 0 (No Links)'}
          </span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#121212] p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by referring domain, source URL, or anchor text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <span className="text-[10px] font-mono text-neutral-500 uppercase px-1">Status:</span>
            {['All', 'Active', 'Lost', 'Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <span className="text-[10px] font-mono text-neutral-500 uppercase px-1">Type:</span>
            {['All', 'dofollow', 'nofollow', 'sponsored', 'ugc'].map((tp) => (
              <button
                key={tp}
                onClick={() => setSelectedType(tp)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                  selectedType === tp
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backlinks Table */}
      <div className="bg-[#121212] rounded-2xl border border-neutral-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3.5">Referring Domain</th>
                <th className="p-3.5">Source URL &amp; Anchor Text</th>
                <th className="p-3.5">Target Landing Page</th>
                <th className="p-3.5 text-center">DA</th>
                <th className="p-3.5 text-center">Type</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/50 transition">
                  <td className="p-3.5 font-semibold text-white font-mono">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.referringDomain}</span>
                    </div>
                  </td>
                  <td className="p-3.5 space-y-1">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-300 hover:text-emerald-400 flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span className="truncate max-w-xs">{item.sourceUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <span className="text-[11px] text-neutral-400 font-medium block">
                      Anchor: &quot;<span className="text-white">{item.anchorText}</span>&quot;
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400 text-[11px]">
                    <a href={item.targetPageUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      {item.targetPageUrl}
                    </a>
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-purple-400">
                    DA {item.domainRating}
                  </td>
                  <td className="p-3.5 text-center font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.linkType === 'dofollow'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item.linkType}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        item.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-neutral-400 hover:text-white rounded cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove backlink from "${item.referringDomain}"?`)) {
                            onDeleteBacklink(item.id);
                          }
                        }}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Backlink */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingItem ? 'Edit Backlink Record' : 'Log New External Backlink'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Referring Domain</label>
                  <input
                    type="text"
                    required
                    value={referringDomain}
                    onChange={(e) => setReferringDomain(e.target.value)}
                    placeholder="e.g. dawn.com"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Domain Rating (DA)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={domainRating}
                    onChange={(e) => setDomainRating(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Source Article URL</label>
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://dawn.com/news/12345/top-restaurants"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Target Page URL</label>
                  <input
                    type="url"
                    required
                    value={targetPageUrl}
                    onChange={(e) => setTargetPageUrl(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Anchor Text</label>
                  <input
                    type="text"
                    required
                    value={anchorText}
                    onChange={(e) => setAnchorText(e.target.value)}
                    placeholder="e.g. Margalla Hills resort"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Link Rel Type</label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value as any)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="dofollow">dofollow (Passes PageRank)</option>
                    <option value="nofollow">nofollow</option>
                    <option value="sponsored">sponsored (Paid Media)</option>
                    <option value="ugc">ugc (Forum/Comments)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Lost">Lost (404/Removed)</option>
                    <option value="Pending">Pending Outreach</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Outreach &amp; Acquisition Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Editorial team contact, PR agency attribution..."
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold cursor-pointer"
                >
                  {editingItem ? 'Save Updates' : 'Log Backlink'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Bulk Import Backlinks */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Bulk Import Backlinks (CSV / URLs)
                </h3>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkImport} className="space-y-3 text-xs">
              <p className="text-neutral-400 leading-relaxed">
                Paste list of URLs (one per line) or CSV rows with columns:
                <br />
                <span className="font-mono text-emerald-400 text-[11px]">
                  Domain, SourceURL, TargetURL, AnchorText, DA, LinkType
                </span>
              </p>

              <textarea
                rows={7}
                required
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`nytimes.com, https://nytimes.com/travel/margalla, https://margallahills.com/, Luxury dining Islamabad, 94, dofollow\nbbc.com, https://bbc.com/features/wazwan, https://margallahills.com/menu, Wazwan feast, 92, dofollow\nhttps://tribune.com.pk/story/best-view-restaurants`}
                className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                <span className="text-[11px] text-neutral-500 font-mono">
                  {bulkText.split('\n').filter((l) => l.trim()).length} line(s) detected
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBulkModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Import All Links</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
