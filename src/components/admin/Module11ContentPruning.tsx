import React, { useState } from 'react';
import { PruningItem } from '../../types';
import {
  Scissors,
  TrendingDown,
  RefreshCw,
  ArrowRightLeft,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface Module11ContentPruningProps {
  items: PruningItem[];
  onAction: (id: string, action: 'Update Content' | '301 Redirect' | 'Noindex / Prune') => void;
}

export function Module11ContentPruning({ items, onAction }: Module11ContentPruningProps) {
  const [pruningList, setPruningList] = useState<PruningItem[]>(items);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyAction = (
    item: PruningItem,
    action: 'Update Content' | '301 Redirect' | 'Noindex / Prune'
  ) => {
    let newStatus: PruningItem['status'] = 'under_review';
    if (action === '301 Redirect') newStatus = 'redirected';
    if (action === 'Noindex / Prune') newStatus = 'pruned';

    const updated = pruningList.map((p) =>
      p.id === item.id ? { ...p, status: newStatus, suggestedAction: action } : p
    );
    setPruningList(updated);
    onAction(item.id, action);

    setFeedback(`Executed action "${action}" on page ${item.url}. Crawl budget preserved.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const activePages = pruningList.filter((p) => p.status === 'active' || p.status === 'under_review').length;
  const prunedPages = pruningList.filter((p) => p.status === 'pruned' || p.status === 'redirected').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Scissors className="w-3.5 h-3.5" />
          <span>Section 11 &bull; Content Pruning &amp; Crawl Budget Optimization</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          Dead-Weight Content Audit &amp; Cleanup Engine
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-2xl">
          Identify zombie pages with zero search impressions and high bounce rates. Prune, 301 redirect, or refresh content to concentrate domain authority onto high-value URLs.
        </p>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Underperforming URLs</span>
          <span className="text-2xl font-serif font-bold text-amber-400">{items.length} Pages Flagged</span>
        </div>
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Pruned / Redirected</span>
          <span className="text-2xl font-serif font-bold text-emerald-400">{prunedPages} Cleaned</span>
        </div>
        <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 uppercase block">Crawl Budget Preserved</span>
          <span className="text-2xl font-serif font-bold text-cyan-400">+18% Efficiency</span>
        </div>
      </div>

      {/* Pruning Audit Table */}
      <div className="bg-[#121212] rounded-2xl border border-neutral-800 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3.5">Flagged Page URL &amp; Title</th>
                <th className="p-3.5 text-center">Monthly Impr.</th>
                <th className="p-3.5 text-center">Monthly Clicks</th>
                <th className="p-3.5 text-center">Bounce Rate</th>
                <th className="p-3.5 text-center">Last Updated</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {pruningList.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/50 transition">
                  <td className="p-3.5 space-y-1">
                    <span className="font-semibold text-white block">{item.title}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">{item.url}</span>
                  </td>
                  <td className="p-3.5 text-center font-mono text-neutral-400">
                    {item.monthlyImpressions}
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-rose-400">
                    {item.monthlyClicks} clicks
                  </td>
                  <td className="p-3.5 text-center font-mono text-amber-400">
                    {item.bounceRate}%
                  </td>
                  <td className="p-3.5 text-center font-mono text-neutral-500 text-[11px]">
                    {item.lastUpdated}
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        item.status === 'pruned'
                          ? 'bg-neutral-800 text-neutral-400'
                          : item.status === 'redirected'
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApplyAction(item, 'Update Content')}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] rounded-lg transition cursor-pointer flex items-center gap-1"
                        title="Rewrite & Refresh"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-400" />
                        <span>Update</span>
                      </button>

                      <button
                        onClick={() => handleApplyAction(item, '301 Redirect')}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] rounded-lg transition cursor-pointer flex items-center gap-1"
                        title="301 Redirect to relevant page"
                      >
                        <ArrowRightLeft className="w-3 h-3 text-cyan-400" />
                        <span>301 Redirect</span>
                      </button>

                      <button
                        onClick={() => handleApplyAction(item, 'Noindex / Prune')}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-rose-950/60 text-neutral-300 hover:text-rose-400 text-[11px] rounded-lg transition cursor-pointer flex items-center gap-1"
                        title="Set to Noindex"
                      >
                        <Trash2 className="w-3 h-3 text-rose-400" />
                        <span>Noindex</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
