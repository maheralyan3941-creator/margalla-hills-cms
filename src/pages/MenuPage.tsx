import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { MenuItem, MenuCategory } from '../types';
import { api } from '../lib/api';
import { EXPANDED_CATEGORIES, EXPANDED_MENU_ITEMS } from '../data/expandedMenuItems';
import {
  Utensils,
  Search,
  Filter,
  Sparkles,
  ChevronRight,
  Wine,
  Clock,
  Flame,
  X,
  Plus,
  CheckCircle2,
  CalendarCheck,
  Award,
  Layers,
  ChefHat,
  MessageCircle
} from 'lucide-react';

interface MenuPageProps {
  navigate: (path: string) => void;
  initialCategory?: string;
}

export function MenuPage({ navigate, initialCategory = 'all' }: MenuPageProps) {
  const [categories, setCategories] = useState<MenuCategory[]>(EXPANDED_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(EXPANDED_MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalDish, setActiveModalDish] = useState<MenuItem | null>(null);

  // 4-Course Custom Feast Curator state
  const [curatedStarter, setCuratedStarter] = useState<MenuItem | null>(null);
  const [curatedMain, setCuratedMain] = useState<MenuItem | null>(null);
  const [curatedBread, setCuratedBread] = useState<MenuItem | null>(null);
  const [curatedDessert, setCuratedDessert] = useState<MenuItem | null>(null);

  useEffect(() => {
    api.getMenuCategories()
      .then(cats => {
        if (cats && cats.length > 0) setCategories(cats);
      })
      .catch(() => {});

    api.getMenuItems()
      .then(items => {
        if (items && items.length > 0) setMenuItems(items);
      })
      .catch(() => {});
  }, []);

  const filteredItems = menuItems.filter(item => {
    if (item.status !== 'published') return false;

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (selectedDietary !== 'all') {
      if (!item.dietary || !item.dietary.includes(selectedDietary as any)) {
        return false;
      }
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIngredients) return false;
    }

    return true;
  });

  const menuSEO = {
    seoTitle: 'Artisanal Culinary Menu | Saffron & Sage Michelin Selected',
    metaDescription: 'Explore over 30 artisanal dishes infused with single-origin Kashmiri saffron, pasture-raised meats, wood-fired naan, and hand-churned desserts.',
    slug: 'menu',
    focusKeyword: 'fine dining saffron menu',
    secondaryKeywords: ['kashmiri saffron biryani', 'tasting menu items', 'gourmet indian starters'],
    canonicalUrl: '/menu',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Artisanal Culinary Menu | Saffron & Sage',
    ogDescription: 'Single-origin Pampore saffron, heritage recipes, and sommelier wine pairings.',
    ogImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Menu' as const,
    searchIntent: 'Commercial' as const
  };

  const schemaMenu = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Saffron & Sage Artisanal Culinary Menu',
    description: 'Comprehensive dining menu featuring single-origin Kashmiri saffron specialties, starters, mains, breads, and confectionery.',
    hasMenuSection: categories.map(cat => ({
      '@type': 'MenuSection',
      name: cat.name,
      description: cat.description,
      hasMenuItem: menuItems
        .filter(m => m.category === cat.slug && m.status === 'published')
        .map(dish => ({
          '@type': 'MenuItem',
          name: dish.name,
          description: dish.description,
          offers: {
            '@type': 'Offer',
            price: dish.price,
            priceCurrency: 'USD'
          }
        }))
    }))
  };

  const calculateCuratedTotal = () => {
    let sum = 0;
    if (curatedStarter) sum += curatedStarter.price;
    if (curatedMain) sum += curatedMain.price;
    if (curatedBread) sum += curatedBread.price;
    if (curatedDessert) sum += curatedDessert.price;
    return sum;
  };

  return (
    <div className="bg-[#0A0A0A] text-neutral-200 min-h-screen selection:bg-amber-500 selection:text-black py-12">
      <SEOHead seo={menuSEO} schemaData={schemaMenu} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/70 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>30+ Artisanal Heritage Dishes</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Artisanal Culinary Menu
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Every creation at Saffron &amp; Sage is crafted with single-origin Kashmiri Mongra saffron, pasture-raised proteins, and hand-ground botanical aromatics. Click any dish to view its origin story, full ingredients, and sommelier pairing.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-[#111111] p-5 sm:p-7 rounded-3xl border border-neutral-800 shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search dishes, saffron, morels, truffles, ingredients..."
                className="w-full pl-11 pr-4 py-3 bg-[#0A0A0A] border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-neutral-400 font-mono shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> Diet:
              </span>
              {[
                { label: 'All', value: 'all' },
                { label: "Chef's Special", value: 'chef_special' },
                { label: 'Halal', value: 'halal' },
                { label: 'Gluten-Free', value: 'gluten_free' },
                { label: 'Vegetarian', value: 'vegetarian' },
                { label: 'Vegan', value: 'vegan' },
                { label: 'Pescatarian', value: 'pescatarian' }
              ].map(d => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDietary(d.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition whitespace-nowrap ${
                    selectedDietary === d.value
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'bg-[#0A0A0A] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-neutral-800/80 pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-serif uppercase tracking-wider transition shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-neutral-100 text-black font-bold shadow-md'
                  : 'bg-[#0A0A0A] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              All Categories ({menuItems.filter(m => m.status === 'published').length})
            </button>
            {categories.map(cat => {
              const count = menuItems.filter(m => m.category === cat.slug && m.status === 'published').length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-serif uppercase tracking-wider transition shrink-0 ${
                    selectedCategory === cat.slug
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'bg-[#0A0A0A] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-3xl border border-neutral-800 p-8 space-y-4">
            <Utensils className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white">No dishes match your specific search criteria</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Try resetting dietary filters or clearing your ingredient search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-amber-500 text-black text-xs font-serif font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(dish => (
              <div
                key={dish.id}
                className="group bg-[#111111] rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setActiveModalDish(dish)}
                    className="relative h-64 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.altText || dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold font-mono text-amber-400 border border-amber-500/30 shadow-md">
                      ${dish.price.toFixed(2)}
                    </div>
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {dish.dietary.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/85 text-amber-300 border border-white/10 backdrop-blur-md"
                        >
                          {tag.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-2 uppercase">
                      <span>{dish.category}</span>
                      <span>{dish.calories ? `${dish.calories} kcal` : 'Chef Handcrafted'}</span>
                    </div>

                    <h3
                      onClick={() => setActiveModalDish(dish)}
                      className="font-serif italic text-xl font-bold text-white group-hover:text-amber-400 transition cursor-pointer"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-1.5">
                      {dish.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#1A1A1A] text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-800"
                        >
                          {ing}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-[10px] text-neutral-500 self-center">
                          +{dish.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-800/60 mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
                  <button
                    onClick={() => setActiveModalDish(dish)}
                    className="font-serif text-neutral-300 hover:text-amber-400 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Quick Notes</span>
                  </button>
                  <a
                    href={`https://wa.me/923294785579?text=${encodeURIComponent(`Hello Margalla Hills, I would like to order "${dish.name}" ($${dish.price.toFixed(2)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2 px-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer hover:scale-105"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4-Course Custom Feast Curator Module */}
        <div className="bg-[#121212] border border-amber-500/30 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <ChefHat className="w-4 h-4" />
              <span>Interactive Dining Builder</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Curate Your Bespoke 4-Course Feast
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Design your personalized dinner combination from our starters, royal mains, tandoor flatbreads, and confectionery desserts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter Slot */}
            <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">1. Artisanal Starter</span>
              {curatedStarter ? (
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{curatedStarter.name}</h4>
                  <span className="text-xs text-amber-400 font-mono block mt-1">${curatedStarter.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCuratedStarter(null)}
                    className="mt-2 text-[10px] text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-neutral-500">Select a starter from the menu</p>
                  <select
                    onChange={e => {
                      const item = menuItems.find(m => m.id === e.target.value);
                      if (item) setCuratedStarter(item);
                    }}
                    className="w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-300 outline-none"
                  >
                    <option value="">Choose Starter...</option>
                    {menuItems.filter(m => m.category === 'starters').map(m => (
                      <option key={m.id} value={m.id}>{m.name} (${m.price})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Main Slot */}
            <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">2. Royal Entrée</span>
              {curatedMain ? (
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{curatedMain.name}</h4>
                  <span className="text-xs text-amber-400 font-mono block mt-1">${curatedMain.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCuratedMain(null)}
                    className="mt-2 text-[10px] text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-neutral-500">Select a main curry or specialty</p>
                  <select
                    onChange={e => {
                      const item = menuItems.find(m => m.id === e.target.value);
                      if (item) setCuratedMain(item);
                    }}
                    className="w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-300 outline-none"
                  >
                    <option value="">Choose Main...</option>
                    {menuItems.filter(m => m.category === 'mains' || m.category === 'specialties').map(m => (
                      <option key={m.id} value={m.id}>{m.name} (${m.price})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Bread Slot */}
            <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">3. Tandoor Bread</span>
              {curatedBread ? (
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{curatedBread.name}</h4>
                  <span className="text-xs text-amber-400 font-mono block mt-1">${curatedBread.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCuratedBread(null)}
                    className="mt-2 text-[10px] text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-neutral-500">Select a leavened flatbread</p>
                  <select
                    onChange={e => {
                      const item = menuItems.find(m => m.id === e.target.value);
                      if (item) setCuratedBread(item);
                    }}
                    className="w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-300 outline-none"
                  >
                    <option value="">Choose Bread...</option>
                    {menuItems.filter(m => m.category === 'breads').map(m => (
                      <option key={m.id} value={m.id}>{m.name} (${m.price})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Dessert Slot */}
            <div className="bg-[#0A0A0A] p-5 rounded-2xl border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">4. Confectionery</span>
              {curatedDessert ? (
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{curatedDessert.name}</h4>
                  <span className="text-xs text-amber-400 font-mono block mt-1">${curatedDessert.price.toFixed(2)}</span>
                  <button
                    onClick={() => setCuratedDessert(null)}
                    className="mt-2 text-[10px] text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-neutral-500">Select a dessert or gelato</p>
                  <select
                    onChange={e => {
                      const item = menuItems.find(m => m.id === e.target.value);
                      if (item) setCuratedDessert(item);
                    }}
                    className="w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-300 outline-none"
                  >
                    <option value="">Choose Dessert...</option>
                    {menuItems.filter(m => m.category === 'desserts').map(m => (
                      <option key={m.id} value={m.id}>{m.name} (${m.price})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Curated Summary */}
          <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400 block">Curated 4-Course Total</span>
              <span className="font-serif text-3xl font-bold text-amber-400">
                ${calculateCuratedTotal().toFixed(2)}
              </span>
            </div>
            <a
              href={`https://wa.me/923294785579?text=${encodeURIComponent(
                `Hello Margalla Hills, I would like to order this Curated 4-Course Feast ($${calculateCuratedTotal().toFixed(2)}):\n` +
                `- Starter: ${curatedStarter?.name || 'Chef Choice'}\n` +
                `- Main: ${curatedMain?.name || 'Chef Choice'}\n` +
                `- Bread: ${curatedBread?.name || 'Chef Choice'}\n` +
                `- Dessert: ${curatedDessert?.name || 'Chef Choice'}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order Curated Feast on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {activeModalDish && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-amber-500/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalDish(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-64 sm:h-72 relative">
              <img
                src={activeModalDish.image}
                alt={activeModalDish.altText || activeModalDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold bg-black/80 px-3 py-1 rounded-full border border-amber-500/30">
                  {activeModalDish.category}
                </span>
                <span className="text-lg font-serif font-bold text-amber-400 bg-black/80 px-3 py-1 rounded-full border border-amber-500/30">
                  ${activeModalDish.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-white">
                  {activeModalDish.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                  {activeModalDish.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-[#0A0A0A] p-4 rounded-xl border border-neutral-800">
                <div>
                  <span className="text-neutral-500 font-mono text-[10px] uppercase block">Prep Time</span>
                  <span className="text-white font-medium">{activeModalDish.preparationTimeMinutes || 20} Minutes</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono text-[10px] uppercase block">Calories</span>
                  <span className="text-white font-medium">{activeModalDish.calories || 450} kcal</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-amber-400 block mb-2 font-semibold">
                  Handcrafted Ingredients:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalDish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#1A1A1A] text-neutral-200 px-2.5 py-1 rounded-md border border-neutral-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const d = activeModalDish;
                    setActiveModalDish(null);
                    navigate(`/menu/${d.category}/${d.slug}`);
                  }}
                  className="text-xs font-serif font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View Dedicated Dish Page &amp; SEO Notes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`https://wa.me/923294785579?text=${encodeURIComponent(`Hello Margalla Hills, I would like to order "${activeModalDish.name}" ($${activeModalDish.price.toFixed(2)}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
