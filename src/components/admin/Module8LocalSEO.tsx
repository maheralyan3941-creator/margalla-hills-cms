import React, { useState } from 'react';
import { LocalSEOProfile } from '../../types';
import {
  MapPin,
  Save,
  Clock,
  Phone,
  Mail,
  Compass,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Globe2,
  Sparkles
} from 'lucide-react';

interface Module8LocalSEOProps {
  localProfile: LocalSEOProfile;
  onUpdateLocalSEO: (profile: LocalSEOProfile) => void;
}

export function Module8LocalSEO({ localProfile, onUpdateLocalSEO }: Module8LocalSEOProps) {
  const [profile, setProfile] = useState<LocalSEOProfile>(localProfile);
  const [saved, setSaved] = useState(false);

  // New location page modal
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [newLocName, setNewLocName] = useState('');
  const [newLocSlug, setNewLocSlug] = useState('');
  const [newLocKeyword, setNewLocKeyword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLocalSEO(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddLocationPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocName.trim() || !newLocSlug.trim()) return;

    const updatedPages = [
      ...profile.locationPages,
      {
        name: newLocName,
        slug: newLocSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        targetKeyword: newLocKeyword || `fine dining ${newLocName.toLowerCase()}`,
        active: true
      }
    ];

    const updatedProfile = { ...profile, locationPages: updatedPages };
    setProfile(updatedProfile);
    onUpdateLocalSEO(updatedProfile);
    setIsAddLocationOpen(false);
    setNewLocName('');
    setNewLocSlug('');
    setNewLocKeyword('');
  };

  const handleDeleteLocationPage = (index: number) => {
    const updatedPages = profile.locationPages.filter((_, i) => i !== index);
    const updatedProfile = { ...profile, locationPages: updatedPages };
    setProfile(updatedProfile);
    onUpdateLocalSEO(updatedProfile);
  };

  const handleToggleLocationPage = (index: number) => {
    const updatedPages = [...profile.locationPages];
    updatedPages[index].active = !updatedPages[index].active;
    const updatedProfile = { ...profile, locationPages: updatedPages };
    setProfile(updatedProfile);
    onUpdateLocalSEO(updatedProfile);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Section 8 &bull; Local SEO &amp; Google Business Profile Optimization</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          NAP Consistency &amp; Multi-City Location Pages
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-2xl">
          Lock in your Google Business Profile (GMB) Name, Address, and Phone (NAP) across all search engines and scale high-ranking hyper-local landing pages.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Google Business Profile (GMB) Card */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Google Business Profile (GMB) Verified Information</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Exact details published to Google Maps Local 3-Pack</p>
            </div>
            <a
              href={profile.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1.5"
            >
              <span>View Live Google Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Official Business Name</label>
              <input
                type="text"
                required
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Official Phone Number (International)</label>
              <input
                type="tel"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-neutral-300 font-medium mb-1">Street Address</label>
              <input
                type="text"
                required
                value={profile.streetAddress}
                onChange={(e) => setProfile({ ...profile, streetAddress: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">City / Locality</label>
              <input
                type="text"
                required
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">State / Federal Territory</label>
              <input
                type="text"
                required
                value={profile.stateProvince}
                onChange={(e) => setProfile({ ...profile, stateProvince: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Postal / ZIP Code</label>
              <input
                type="text"
                required
                value={profile.postalCode}
                onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Country</label>
              <input
                type="text"
                required
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Geocoordinates */}
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Latitude Coordinate</label>
              <input
                type="number"
                step="any"
                value={profile.latitude}
                onChange={(e) => setProfile({ ...profile, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Longitude Coordinate</label>
              <input
                type="number"
                step="any"
                value={profile.longitude}
                onChange={(e) => setProfile({ ...profile, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Weekly Operating Hours</span>
            </span>
            <div className="space-y-1.5">
              {profile.openingHours.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => {
                      const updated = [...profile.openingHours];
                      updated[i] = e.target.value;
                      setProfile({ ...profile, openingHours: updated });
                    }}
                    className="flex-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Pages Manager */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Multi-Region &amp; Sub-Location Landing Pages</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Target high-intent local queries across neighboring districts (Rawalpindi, Murree, DHA, Pir Sohawa)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddLocationOpen(true)}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Location Page</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.locationPages.map((loc, idx) => (
              <div
                key={idx}
                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xs text-white">{loc.name}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        loc.active
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      {loc.active ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">/locations/{loc.slug}</div>
                  <div className="text-[11px] text-neutral-400">
                    Target KW: <span className="text-neutral-200">{loc.targetKeyword}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleLocationPage(idx)}
                    className="text-[11px] text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {loc.active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLocationPage(idx)}
                    className="p-1 text-neutral-400 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Local SEO Profile and Location Pages updated successfully!</span>
            </span>
          ) : (
            <span className="text-xs text-neutral-500">Google My Business NAP synced with schema markup</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Update Local SEO</span>
          </button>
        </div>
      </form>

      {/* Modal: Add Location Page */}
      {isAddLocationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-white">Add New Location Landing Page</h3>

            <form onSubmit={handleAddLocationPage} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Region / City Name</label>
                <input
                  type="text"
                  required
                  value={newLocName}
                  onChange={(e) => {
                    setNewLocName(e.target.value);
                    if (!newLocSlug) {
                      setNewLocSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Abbottabad &amp; Nathiagali"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={newLocSlug}
                  onChange={(e) => setNewLocSlug(e.target.value)}
                  placeholder="abbottabad-nathiagali"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Target Keyword Focus</label>
                <input
                  type="text"
                  value={newLocKeyword}
                  onChange={(e) => setNewLocKeyword(e.target.value)}
                  placeholder="e.g. luxury dining nathiagali hill resort"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLocationOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 text-black font-bold rounded-xl cursor-pointer"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
