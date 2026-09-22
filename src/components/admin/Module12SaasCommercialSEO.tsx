import React, { useState } from 'react';
import { ComparisonTableRow } from '../../types';
import {
  DollarSign,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Award,
  ExternalLink,
  ShieldCheck,
  Save,
  Check,
  X
} from 'lucide-react';

interface Module12SaasCommercialSEOProps {
  comparisonRows: ComparisonTableRow[];
  onUpdateComparisonRows: (rows: ComparisonTableRow[]) => void;
}

export function Module12SaasCommercialSEO({
  comparisonRows,
  onUpdateComparisonRows
}: Module12SaasCommercialSEOProps) {
  const [rows, setRows] = useState<ComparisonTableRow[]>(comparisonRows);
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newOurValue, setNewOurValue] = useState('');
  const [newCompA, setNewCompA] = useState('');
  const [newCompB, setNewCompB] = useState('');
  const [saved, setSaved] = useState(false);

  // Commercial page meta states
  const [pricingTitle, setPricingTitle] = useState('Tasting Menus & Private Banquets Pricing | Margalla Hills');
  const [pricingMeta, setPricingMeta] = useState('Explore transparent 7-course degustation pricing, private alpine gazebo reservations, and corporate gala banquet packages in Islamabad.');
  const [featuresTitle, setFeaturesTitle] = useState('Luxury Hospitality Amenities & Gastronomic Terroir | Margalla Hills');
  const [featuresMeta, setFeaturesMeta] = useState('Panoramic mountain terraces at 1,500m, 800-bottle subterranean cellar, single-origin saffron feasts, and private helicopter landing access.');

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeature.trim() || !newOurValue.trim()) return;

    const newRowItem: ComparisonTableRow = {
      id: `comp-row-${Date.now()}`,
      feature: newFeature,
      margallaHills: newOurValue,
      competitorA: newCompA || 'Basic / None',
      competitorB: newCompB || 'Standard',
      highlight: true
    };

    const updated = [...rows, newRowItem];
    setRows(updated);
    onUpdateComparisonRows(updated);
    setIsAddingRow(false);
    setNewFeature('');
    setNewOurValue('');
    setNewCompA('');
    setNewCompB('');
  };

  const handleDeleteRow = (id: string) => {
    const updated = rows.filter((r) => r.id !== id);
    setRows(updated);
    onUpdateComparisonRows(updated);
  };

  const handleSaveAll = () => {
    onUpdateComparisonRows(rows);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Section 12 &bull; Commercial SEO &amp; Comparison Table Builder</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          High-Intent Conversion Pages &amp; Competitive Matrix
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-2xl">
          Optimize bottom-of-funnel pricing and features pages, and build rich interactive competitor comparison tables designed to capture high-converting search intent.
        </p>
      </div>

      {/* Pricing & Features Meta Control Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Page SEO */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Pricing &amp; Tasting Menus Page SEO</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">/tasting-menu</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Commercial Page Title Tag</label>
              <input
                type="text"
                value={pricingTitle}
                onChange={(e) => setPricingTitle(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Meta Description (High Conversion CTR)</label>
              <textarea
                rows={3}
                value={pricingMeta}
                onChange={(e) => setPricingMeta(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Features & Amenities SEO */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Amenities &amp; Private Dining Features SEO</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">/private-dining</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Features Page Title Tag</label>
              <input
                type="text"
                value={featuresTitle}
                onChange={(e) => setFeaturesTitle(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={featuresMeta}
                onChange={(e) => setFeaturesMeta(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table Builder */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Interactive Competitor Comparison Table Builder</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Rank for &quot;Margalla Hills vs Monal&quot; or &quot;Margalla Hills vs Serena&quot; comparison search queries.
            </p>
          </div>

          <button
            onClick={() => setIsAddingRow(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Comparison Feature</span>
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
              <tr>
                <th className="p-3.5">Feature / Criterion</th>
                <th className="p-3.5 text-emerald-400 font-bold">Margalla Hills (Our Sanctuary)</th>
                <th className="p-3.5">The Monal Islamabad</th>
                <th className="p-3.5">Highland Resort</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 font-sans">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-900/50 transition">
                  <td className="p-3.5 font-semibold text-white">{row.feature}</td>
                  <td className="p-3.5 font-semibold text-emerald-400 bg-emerald-950/20">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{row.margallaHills}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-neutral-300">{row.competitorA}</td>
                  <td className="p-3.5 text-neutral-400">{row.competitorB}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
          {saved ? (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Comparison matrix and commercial metadata saved successfully!</span>
            </span>
          ) : (
            <span className="text-xs text-neutral-500">Includes auto-generated Comparison Schema markup</span>
          )}

          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Commercial SEO &amp; Matrix</span>
          </button>
        </div>
      </div>

      {/* Modal: Add Comparison Row */}
      {isAddingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Add Comparison Matrix Feature</h3>
              <button
                onClick={() => setIsAddingRow(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRow} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Feature / Amenity Name</label>
                <input
                  type="text"
                  required
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g. Halal Grade 1 Saffron Certification"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-1">Margalla Hills Advantage</label>
                <input
                  type="text"
                  required
                  value={newOurValue}
                  onChange={(e) => setNewOurValue(e.target.value)}
                  placeholder="e.g. 100% Pampore Certified Single-Origin"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Competitor A (Monal)</label>
                  <input
                    type="text"
                    value={newCompA}
                    onChange={(e) => setNewCompA(e.target.value)}
                    placeholder="e.g. Commercial Powder Blend"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Competitor B (Highland)</label>
                  <input
                    type="text"
                    value={newCompB}
                    onChange={(e) => setNewCompB(e.target.value)}
                    placeholder="e.g. Standard Food Coloring"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddingRow(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 text-black font-bold rounded-xl cursor-pointer"
                >
                  Add Feature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
