import React, { useState } from 'react';
import { CompetitorSEOItem } from '../../types';
import {
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Target,
  Sparkles,
  Link2,
  TrendingDown,
  X
} from 'lucide-react';

interface Module3CompetitorResearchProps {
  competitors: CompetitorSEOItem[];
  onAddCompetitor: (comp: Omit<CompetitorSEOItem, 'id' | 'updatedAt'>) => void;
  onUpdateCompetitor: (id: string, updates: Partial<CompetitorSEOItem>) => void;
  onDeleteCompetitor: (id: string) => void;
}

export function Module3CompetitorResearch({
  competitors,
  onAddCompetitor,
  onUpdateCompetitor,
  onDeleteCompetitor
}: Module3CompetitorResearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CompetitorSEOItem | null>(null);

  // Form states
  const [competitorName, setCompetitorName] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('https://');
  const [rankingKeyword, setRankingKeyword] = useState('');
  const [targetPage, setTargetPage] = useState('');
  const [estimatedRank, setEstimatedRank] = useState<number>(3);
  const [theirStrengths, setTheirStrengths] = useState('');
  const [contentGapOpportunity, setContentGapOpportunity] = useState('');
  const [backlinksNote, setBacklinksNote] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setCompetitorName('');
    setCompetitorUrl('https://');
    setRankingKeyword('pir sohawa view restaurants');
    setTargetPage('/');
    setEstimatedRank(3);
    setTheirStrengths('');
    setContentGapOpportunity('');
    setBacklinksNote('DA 42 - 95 referring domains');
    setIsModalOpen(true);
  };

  const openEditModal = (item: CompetitorSEOItem) => {
    setEditingItem(item);
    setCompetitorName(item.competitorName);
    setCompetitorUrl(item.competitorUrl);
    setRankingKeyword(item.rankingKeyword);
    setTargetPage(item.targetPage);
    setEstimatedRank(item.estimatedRank);
    setTheirStrengths(item.theirStrengths);
    setContentGapOpportunity(item.contentGapOpportunity);
    setBacklinksNote(item.backlinksNote);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorName.trim() || !competitorUrl.trim()) return;

    if (editingItem) {
      onUpdateCompetitor(editingItem.id, {
        competitorName,
        competitorUrl,
        rankingKeyword,
        targetPage,
        estimatedRank,
        theirStrengths,
        contentGapOpportunity,
        backlinksNote
      });
    } else {
      onAddCompetitor({
        competitorName,
        competitorUrl,
        rankingKeyword,
        targetPage,
        estimatedRank,
        theirStrengths,
        contentGapOpportunity,
        backlinksNote
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Section 3 &bull; Competitor SEO &amp; Intelligence Benchmarking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Competitor URL &amp; Backlink Audit Lab
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Monitor rival hospitality brands, log their top ranking search keywords, manually audit their backlink moats, and execute content gap strategies.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competitor URL</span>
        </button>
      </div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitors.map((item) => (
          <div
            key={item.id}
            className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">{item.competitorName}</h3>
                  <a
                    href={item.competitorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 mt-0.5 font-mono"
                  >
                    <span>{item.competitorUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-mono font-bold text-xs shrink-0">
                  SERP #{item.estimatedRank}
                </span>
              </div>

              {/* Target Keyword */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Top Ranking Keyword</span>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  {item.rankingKeyword || 'N/A'}
                </span>
              </div>

              {/* Backlinks Note Box */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                  <Link2 className="w-3 h-3 text-emerald-400" />
                  Backlinks &amp; Domain Authority Note
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  {item.backlinksNote || 'No backlink notes logged.'}
                </p>
              </div>

              {/* Strengths & Content Gap */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-neutral-400 font-medium block">Their Strengths:</span>
                  <p className="text-neutral-300 mt-0.5">{item.theirStrengths || 'None recorded'}</p>
                </div>
                <div>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Margalla Hills Content Gap Opportunity:
                  </span>
                  <p className="text-neutral-300 mt-0.5">{item.contentGapOpportunity || 'None recorded'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
              <span className="text-[11px] text-neutral-500 font-mono">Updated: {item.updatedAt.split('T')[0]}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove competitor "${item.competitorName}"?`)) {
                      onDeleteCompetitor(item.id);
                    }
                  }}
                  className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add or Edit Competitor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingItem ? 'Edit Competitor Research' : 'Add New Competitor URL'}
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
                  <label className="block text-neutral-300 font-medium mb-1">Competitor Name</label>
                  <input
                    type="text"
                    required
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="e.g. Monal Restaurant"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Website URL</label>
                  <input
                    type="url"
                    required
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Their Top Ranking Keyword</label>
                  <input
                    type="text"
                    value={rankingKeyword}
                    onChange={(e) => setRankingKeyword(e.target.value)}
                    placeholder="e.g. best sunset view restaurant"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Estimated Google SERP Rank</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={estimatedRank}
                    onChange={(e) => setEstimatedRank(Number(e.target.value))}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Backlinks Manually Note Box (DA, Referring Domains, Key Links)
                </label>
                <textarea
                  rows={2}
                  value={backlinksNote}
                  onChange={(e) => setBacklinksNote(e.target.value)}
                  placeholder="e.g. DA 52 - 140 referring domains, featured on Dawn, Tripadvisor, Google Maps Top 3 pack..."
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Their Strengths</label>
                <input
                  type="text"
                  value={theirStrengths}
                  onChange={(e) => setTheirStrengths(e.target.value)}
                  placeholder="e.g. Massive brand search volume, established TripAdvisor reviews"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Content Gap &amp; Our Counter Strategy</label>
                <textarea
                  rows={2}
                  value={contentGapOpportunity}
                  onChange={(e) => setContentGapOpportunity(e.target.value)}
                  placeholder="e.g. They lack 400 culinary chapters, zero sommelier cellar schema, slow mobile speed..."
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition cursor-pointer"
                >
                  {editingItem ? 'Save Updates' : 'Add Competitor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
