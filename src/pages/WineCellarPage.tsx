import React, { useState } from 'react';
import { Wine, Award, Sparkles, GlassWater, Compass, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface WineCellarPageProps {
  navigate: (path: string) => void;
}

export function WineCellarPage({ navigate }: WineCellarPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'champagne' | 'bordeaux' | 'burgundy' | 'botanicals'>('champagne');

  const wineSEO = {
    seoTitle: 'Sommelier Wine Cellar & Artisanal Mixology | Saffron & Sage',
    metaDescription: 'Explore our 800-bottle subterranean wine cellar, featuring rare biodynamic vintages, Grand Crus, and botanical zero-proof saffron elixirs.',
    slug: 'wine-cellar',
    focusKeyword: 'fine dining wine cellar',
    secondaryKeywords: ['sommelier wine list', 'grand cru pairings', 'artisanal saffron cocktails'],
    canonicalUrl: '/wine-cellar',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Sommelier Wine Cellar & Artisanal Mixology | Saffron & Sage',
    ogDescription: 'A world-class cellar curated to complement the complex aromatics of Himalayan saffron and slow clay-pot gastronomy.',
    ogImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'ItemPage' as const,
    searchIntent: 'Commercial' as const
  };

  const cellarCollections = {
    champagne: [
      { name: 'NV Krug Grand Cuvée 170th Edition', region: 'Reims, Champagne, France', price: '$420', notes: 'Toasted brioche, roasted hazelnut, dried citrus, vibrant minerality.' },
      { name: '2013 Dom Pérignon Vintage Brut', region: 'Épernay, Champagne, France', price: '$480', notes: 'Smoky gunflint, white peach, cocoa powder, crystalline finish.' },
      { name: 'NV Billecart-Salmon Brut Rosé', region: 'Mareuil-sur-Aÿ, France', price: '$220', notes: 'Wild strawberries, redcurrant, subtle spice and persistent bead.' },
      { name: '2012 Louis Roederer Cristal Millésimé', region: 'Reims, Champagne, France', price: '$750', notes: 'Silky chalk texture, candied lemon zest, white truffles.' }
    ],
    bordeaux: [
      { name: '2015 Château Margaux Premier Grand Cru Classé', region: 'Margaux, Bordeaux', price: '$1,450', notes: 'Violets, blackcurrant crème, cigar box, seamless velvety tannins.' },
      { name: '2016 Château Pontet-Canet Grand Cru', region: 'Pauillac, Bordeaux', price: '$380', notes: 'Biodynamic viticulture, blackberry compote, graphite, crushed stones.' },
      { name: '2018 Château Haut-Brion 1er Grand Cru', region: 'Pessac-Léognan, Bordeaux', price: '$1,200', notes: 'Smoked herbs, espresso bean, warm cassis, lingering noble length.' },
      { name: '2017 Château d\'Yquem Premier Cru Supérieur', region: 'Sauternes, Bordeaux', price: '$650', notes: 'Candied apricots, saffron honey, bitter orange marmalade.' }
    ],
    burgundy: [
      { name: '2020 Domaine Leflaive Puligny-Montrachet', region: 'Côte de Beaune, Burgundy', price: '$390', notes: 'White blossom, crushed flint, toasted almond, laser precision.' },
      { name: '2019 Domaine de la Romanée-Conti Grands Échézeaux', region: 'Côte de Nuits, Burgundy', price: '$3,800', notes: 'Rose petals, forest floor, wild dark cherry, ethereal weightless depth.' },
      { name: '2021 Louis Latour Corton-Charlemagne Grand Cru', region: 'Aloxe-Corton, Burgundy', price: '$440', notes: 'Yellow apple, vanilla bean, buttery brioche, salted butter finish.' },
      { name: '2018 Domaine Armand Rousseau Gevrey-Chambertin', region: 'Côte de Nuits, Burgundy', price: '$890', notes: 'Crushed raspberries, dried herbs, game, fine silk tannins.' }
    ],
    botanicals: [
      { name: 'Kashmiri Golden Silk Old Fashioned', region: 'House Signature Cocktail', price: '$26', notes: 'Small-batch bourbon infused with toasted Kashmiri saffron, smoked orange peel, and cardamom bitters.' },
      { name: 'The Himalayan Empress Gin & Sage', region: 'Artisanal Mixology', price: '$24', notes: 'Botanical Himalayan gin, wild mountain sage syrup, clarified lime, gold leaf dust.' },
      { name: 'Noor-e-Zaffran (Zero Proof / Alcohol Free)', region: 'Artisanal Botanical Elixir', price: '$18', notes: 'Distilled mountain botanicals, blooming saffron tisane, wild honey, and effervescent sparkling water.' },
      { name: 'Pomegranate & Cardamom Velvet Fizz', region: 'Artisanal Botanical Elixir', price: '$18', notes: 'Cold-pressed wild pomegranate, roasted green cardamom smoke, Meyer lemon foam.' }
    ]
  };

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen">
      <SEOHead seo={wineSEO} />

      {/* Hero Banner */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=80"
            alt="Sommelier Wine Cellar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif tracking-widest uppercase">
            <Wine className="w-3.5 h-3.5" />
            <span>The Subterranean Vault</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            Sommelier Wine Cellar &amp; Reserve Vintages
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Housing over 800 curated labels from legendary grand cru terroirs and biodynamic mountain vineyards, specifically harmonized with aromatic Himalayan cuisine.
          </p>

          {/* Category Tabs */}
          <div className="pt-6 flex flex-wrap justify-center gap-3">
            {[
              { id: 'champagne', label: 'Grand Champagne & Sparkling' },
              { id: 'bordeaux', label: 'Bordeaux & Rare Reds' },
              { id: 'burgundy', label: 'Burgundy & Grand Crus' },
              { id: 'botanicals', label: 'Artisanal Cocktails & Zero-Proof' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Wine List Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {cellarCollections[selectedCategory].map((bottle, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#111111] rounded-2xl border border-neutral-800/80 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {bottle.name}
                  </h3>
                </div>
                <div className="text-xs text-amber-400 font-mono">{bottle.region}</div>
                <p className="text-xs text-neutral-400 max-w-xl font-sans mt-1">
                  {bottle.notes}
                </p>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <div className="text-lg sm:text-xl font-serif font-bold text-amber-400">
                  {bottle.price}
                </div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Bottle Service</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sommelier Consultation Note */}
        <div className="mt-16 p-8 bg-[#121212] rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif text-xl font-bold text-white">
              Private Cellar Tastings &amp; Bespoke Pairings
            </h4>
            <p className="text-xs text-neutral-400 max-w-xl">
              Head Sommelier Laurent Dumont is available for personalized vintage cellar tours, blind tasting flights, and bespoke corporate pairings.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-serif font-bold text-xs uppercase tracking-widest rounded-full shrink-0 shadow-lg cursor-pointer"
          >
            Inquire with Sommelier
          </button>
        </div>
      </section>
    </div>
  );
}
