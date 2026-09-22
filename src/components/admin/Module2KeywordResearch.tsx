import React, { useState } from 'react';
import { KeywordItem, SearchIntent } from '../../types';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  Target,
  FileSpreadsheet,
  Check,
  X,
  Sparkles,
  Layers
} from 'lucide-react';

interface Module2KeywordResearchProps {
  keywords: KeywordItem[];
  onAddKeyword: (kw: Omit<KeywordItem, 'id' | 'createdAt'>) => void;
  onUpdateKeyword: (id: string, updates: Partial<KeywordItem>) => void;
  onDeleteKeyword: (id: string) => void;
}

export function Module2KeywordResearch({
  keywords,
  onAddKeyword,
  onUpdateKeyword,
  onDeleteKeyword
}: Module2KeywordResearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KeywordItem | null>(null);

  // Form states
  const [keyword, setKeyword] = useState('');
  const [clusterName, setClusterName] = useState('Luxury Dining Islamabad');
  const [volume, setVolume] = useState('12.5k');
  const [kd, setKd] = useState<number>(25);
  const [intent, setIntent] = useState<SearchIntent>('Commercial');
  const [targetPage, setTargetPage] = useState('/menu');
  const [status, setStatus] = useState<KeywordItem['status']>('Targeted');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setKeyword('');
    setClusterName('Luxury Dining Islamabad');
    setVolume('10k');
    setKd(28);
    setIntent('Commercial');
    setTargetPage('/menu');
    setStatus('Targeted');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: KeywordItem) => {
    setEditingItem(item);
    setKeyword(item.keyword);
    setClusterName(item.clusterName);
    setVolume(item.volume);
    setKd(item.kd);
    setIntent(item.intent);
    setTargetPage(item.targetPage);
    setStatus(item.status);
    setNotes(item.notes);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    if (editingItem) {
      onUpdateKeyword(editingItem.id, {
        keyword,
        clusterName,
        volume,
        kd,
        intent,
        targetPage,
        status,
        notes
      });
    } else {
      onAddKeyword({
        keyword,
        clusterName,
        volume,
        kd,
        intent,
        targetPage,
        status,
        notes
      });
    }
    setIsModalOpen(false);
  };

  const filteredKeywords = keywords.filter((item) => {
    const matchesSearch =
      item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clusterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetPage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = selectedIntent === 'All' || item.intent === selectedIntent;
    return matchesSearch && matchesIntent;
  });

  const getKdColor = (score: number) => {
    if (score < 30) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score < 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getIntentBadge = (type: SearchIntent) => {
    switch (type) {
      case 'Commercial':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Transactional':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Informational':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Navigational':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Search className="w-3.5 h-3.5" />
            <span>Section 2 &bull; Keyword Research &amp; Target Allocation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            High-Value Keyword Intelligence
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Track search volume, keyword difficulty (KD), user search intent, and assign target URL landing pages.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Keyword</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#121212] p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keyword, cluster name, or target page (e.g. 'saffron', '/menu')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Commercial', 'Informational', 'Transactional', 'Navigational'].map((intentOpt) => (
            <button
              key={intentOpt}
              onClick={() => setSelectedIntent(intentOpt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer border ${
                selectedIntent === intentOpt
                  ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {intentOpt}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-[#121212] rounded-2xl border border-neutral-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/80 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3.5">Keyword</th>
                <th className="p-3.5">Cluster / Topic</th>
                <th className="p-3.5 text-center">Volume</th>
                <th className="p-3.5 text-center">KD (Diff)</th>
                <th className="p-3.5 text-center">Intent</th>
                <th className="p-3.5">Assigned Target Page</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {filteredKeywords.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/50 transition">
                  <td className="p-3.5 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.keyword}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-neutral-300">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                      {item.clusterName}
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-cyan-400">
                    {item.volume}
                  </td>
                  <td className="p-3.5 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded border font-bold text-[10px] ${getKdColor(item.kd)}`}>
                      {item.kd}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${getIntentBadge(item.intent)}`}>
                      {item.intent}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <a
                      href={item.targetPage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline font-mono text-[11px]"
                    >
                      {item.targetPage}
                    </a>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-800 text-neutral-300">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition cursor-pointer"
                        title="Edit Keyword"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete keyword "${item.keyword}"?`)) {
                            onDeleteKeyword(item.id);
                          }
                        }}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded transition cursor-pointer"
                        title="Delete Keyword"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredKeywords.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-500">
                    No keywords found matching criteria. Click &quot;Add New Keyword&quot; to insert one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Keyword */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingItem ? 'Edit Target Keyword' : 'Add New SEO Keyword'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Target Keyword String</label>
                <input
                  type="text"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. best sunset view restaurant margalla hills"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Cluster / Pillar</label>
                  <input
                    type="text"
                    value={clusterName}
                    onChange={(e) => setClusterName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Monthly Search Volume</label>
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="e.g. 15.2k"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">KD: {kd}% (Difficulty)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={kd}
                    onChange={(e) => setKd(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Search Intent</label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value as SearchIntent)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Informational">Informational</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Assigned Target Page</label>
                  <input
                    type="text"
                    value={targetPage}
                    onChange={(e) => setTargetPage(e.target.value)}
                    placeholder="e.g. /menu, /tasting-menu, /"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Targeted">Targeted</option>
                    <option value="Ranking">Ranking</option>
                    <option value="Under Optimization">Under Optimization</option>
                    <option value="Ideation">Ideation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Strategy &amp; Optimization Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes on anchor text, internal linking, or search intent satisfaction..."
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
                  {editingItem ? 'Save Changes' : 'Add Keyword'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
