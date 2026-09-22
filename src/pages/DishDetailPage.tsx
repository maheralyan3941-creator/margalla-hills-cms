import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { MenuItem } from '../types';
import { api } from '../lib/api';
import { Utensils, Sparkles, Clock, Flame, ArrowLeft, Check, ShieldCheck, Share2, Layers, ChevronRight, MessageCircle } from 'lucide-react';

interface DishDetailPageProps {
  slug: string;
  category?: string;
  navigate: (path: string) => void;
  menuItems?: MenuItem[];
}

export function DishDetailPage({ slug, category, navigate, menuItems: initialItems }: DishDetailPageProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialItems || []);
  const [dish, setDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      const found = initialItems.find(m => m.slug === slug);
      setDish(found || null);
    } else {
      api.getMenuItems().then(items => {
        setMenuItems(items);
        const found = items.find(m => m.slug === slug);
        setDish(found || null);
      }).catch(() => {});
    }
  }, [slug, initialItems]);

  if (!dish) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center bg-[#0A0A0A] text-slate-300 min-h-screen">
        <h1 className="font-serif italic text-3xl font-bold text-white">Culinary Item Not Found</h1>
        <p className="text-sm text-slate-400 mt-2">The requested menu item does not exist or has been modified.</p>
        <button
          onClick={() => navigate('/menu')}
          className="mt-6 px-5 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  const dishSEO = dish.seo || {
    seoTitle: `${dish.name} | Saffron & Sage Artisanal Kitchen`,
    metaDescription: dish.description,
    slug: dish.slug,
    focusKeyword: dish.name.toLowerCase(),
    secondaryKeywords: dish.ingredients,
    canonicalUrl: `/menu/${category}/${dish.slug}`,
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: dish.name,
    ogDescription: dish.description,
    ogImage: dish.image,
    schemaType: 'MenuItem' as const,
    searchIntent: 'Commercial' as const
  };

  const schemaDish = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: dish.name,
    description: dish.description,
    image: dish.image,
    offers: {
      '@type': 'Offer',
      price: dish.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    suitableForDiet: dish.dietary.map(d => `https://schema.org/${d === 'vegan' ? 'VeganDiet' : d === 'vegetarian' ? 'VegetarianDiet' : 'GlutenFreeDiet'}`),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${dish.calories || 500} calories`
    }
  };

  const relatedDishes = menuItems
    .filter(m => m.id !== dish.id && (m.category === dish.category || m.isFeatured))
    .slice(0, 3);

  const dishContentAudit = `# ${dish.name}
${dish.description}
## Artisanal Ingredients & Preparation
Handcrafted using single-origin spices, fresh aromatics, and traditional slow-cooking methods.
### Nutritional Profile & Dietary Accommodations
Calories: ${dish.calories || 'N/A'} kcal. Preparation Time: ${dish.preparationTimeMinutes || 20} minutes.
Certified ${dish.dietary.join(', ')}.`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10">
      <SEOHead
        seo={dishSEO}
        schemaData={schemaDish}
        contentForAudit={dishContentAudit}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (Crucial for Technical SEO) */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-emerald-400">Home</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/menu')} className="hover:text-emerald-400">Menu</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/menu')} className="capitalize hover:text-emerald-400">{category}</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-xs">{dish.name}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Dishes</span>
          </button>
        </div>

        {/* Main Dish Layout */}
        <div className="bg-[#121212] rounded-3xl border border-slate-800 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Dish Image */}
            <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[400px]">
              <img
                src={dish.image}
                alt={dish.altText || dish.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {dish.dietary.map((tag) => (
                  <span key={tag} className="text-xs font-bold uppercase px-3 py-1 rounded-lg bg-black/80 text-emerald-400 border border-white/10 backdrop-blur-xs">
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Dish Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">
                  <span className="text-emerald-400 font-bold">{dish.category}</span>
                  <span className="text-slate-500">/{dish.slug}</span>
                </div>

                <h1 className="font-serif italic text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {dish.name}
                </h1>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-emerald-400 font-mono">${dish.price.toFixed(2)}</span>
                  <span className="text-xs text-slate-500">Taxes &amp; Table Service included</span>
                </div>

                <p className="text-sm text-slate-300 mt-5 leading-relaxed">
                  {dish.description}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Prep Time: <strong className="text-white font-mono">{dish.preparationTimeMinutes || 20} mins</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span>Calories: <strong className="text-white font-mono">{dish.calories || 550} kcal</strong></span>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="mt-6">
                  <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-2.5">
                    Artisanal Ingredients &amp; Sourcing
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-[#0A0A0A] text-slate-300 px-3 py-1 rounded-lg border border-slate-800 font-mono">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/923294785579?text=${encodeURIComponent(`Hello Margalla Hills, I would like to order "${dish.name}" ($${dish.price.toFixed(2)}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold rounded-xl text-xs uppercase tracking-wider transition text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/menu')}
                  className="py-3.5 px-5 bg-[#0A0A0A] hover:bg-slate-800 text-slate-200 font-semibold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-amber-400" />
                  <span>Explore 400+ Dishes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {relatedDishes.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif italic text-2xl font-bold text-white">
                  Complementary Culinary Creations
                </h2>
                <p className="text-xs text-slate-400 mt-1">Recommended pairings crafted to elevate your dining experience.</p>
              </div>
              <button
                onClick={() => navigate('/menu')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                View all dishes &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDishes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/menu/${item.category}/${item.slug}`)}
                  className="group bg-[#121212] rounded-2xl overflow-hidden border border-slate-800 p-4 hover:border-emerald-500/50 hover:shadow-lg transition cursor-pointer flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.altText || item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 opacity-90"
                  />
                  <div>
                    <h3 className="font-serif italic text-sm font-bold text-white group-hover:text-emerald-400 transition">
                      {item.name}
                    </h3>
                    <div className="text-xs font-bold text-emerald-400 font-mono mt-1">${item.price.toFixed(2)}</div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase mt-0.5 block">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
