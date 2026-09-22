import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Camera, Image as ImageIcon, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface GalleryPageProps {
  navigate: (path: string) => void;
}

export function GalleryPage({ navigate }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryItems = [
    {
      id: 'g1',
      title: 'Royal Kashmiri Saffron Biryani',
      category: 'signature',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
      altText: 'Aged long-grain basmati biryani garnished with fried onions, mint, and pure saffron milk infusion',
      caption: 'Slow-cooked in sealed clay pot (dum technique) with single-origin Kashmiri saffron.'
    },
    {
      id: 'g2',
      title: 'Clay-Tandoor Truffle Paneer Tikka',
      category: 'starters',
      imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
      altText: 'Charcoal-grilled artisanal paneer cubes seasoned with winter black truffle and roasted cumin',
      caption: 'Smoked over hardwood charcoal and finished with wild Himalayan herbs.'
    },
    {
      id: 'g3',
      title: 'Slow-Braised Lamb Shank Nihari',
      category: 'curries',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      altText: 'Tender pasture-raised lamb shank simmered for 12 hours with whole spices, ginger juliennes, and lime',
      caption: 'Velvety gravy reduced with 21 traditional aromatic whole spices.'
    },
    {
      id: 'g4',
      title: 'Pampore Golden Saffron Milk Gelato',
      category: 'desserts',
      imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1000&q=80',
      altText: 'Artisanal saffron gelato infused with green cardamom, roasted pistachios, and organic honey',
      caption: 'Churned fresh daily with whole milk and steeped saffron threads.'
    },
    {
      id: 'g5',
      title: 'Heirloom Spice Toasting & Grinding',
      category: 'kitchen',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
      altText: 'Whole star anise, green cardamom pods, cinnamon bark, and saffron stigmas on stone grinding surface',
      caption: 'Hand-toasted spices ground fresh before every cooking service.'
    },
    {
      id: 'g6',
      title: 'Artisanal Dining Atmosphere',
      category: 'atmosphere',
      imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
      altText: 'Warm amber-lit artisanal dining room with handcrafted wooden tables and Himalayan stone accents',
      caption: 'Warm ambient lighting designed for an intimate culinary immersion.'
    }
  ];

  const filtered = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.category === selectedCategory);

  const gallerySEO = {
    seoTitle: 'Culinary Photography & Visual Showcase | Saffron & Sage',
    metaDescription: 'Browse our high-resolution gallery of single-origin saffron dishes, charcoal tandoor starters, and dining ambiance—optimized with image SEO metadata.',
    slug: 'gallery',
    focusKeyword: 'culinary photography saffron',
    secondaryKeywords: ['restaurant image seo', 'food photography gallery', 'artisan dish showcase'],
    canonicalUrl: '/gallery',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Culinary Photography & Visual Showcase - Saffron & Sage',
    ogDescription: 'Explore high-resolution imagery with descriptive ALT text and ImageGallery schema.',
    ogImage: galleryItems[0].imageUrl,
    schemaType: 'ImageGallery' as const,
    searchIntent: 'Informational' as const
  };

  const schemaGallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Saffron & Sage Culinary Visual Showcase',
    description: 'High-resolution gastronomic photography with semantic ALT metadata.',
    image: galleryItems.map(item => ({
      '@type': 'ImageObject',
      name: item.title,
      caption: item.caption,
      contentUrl: item.imageUrl,
      description: item.altText
    }))
  };

  const galleryAudit = `# Culinary Photography & Visual Showcase
Every image in our gallery is engineered for Google Image Search with descriptive ALT tags and semantic JSON-LD ImageGallery schema.
## High-Resolution Gastronomic Imagery
Discover the vibrant golden hues of Pampore saffron and the rich textures of charcoal tandoor cooking.`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12">
      <SEOHead
        seo={gallerySEO}
        schemaData={schemaGallery}
        contentForAudit={galleryAudit}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <Camera className="w-3.5 h-3.5" />
            <span>Image SEO &bull; Semantic Visual Schema</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Gastronomic Visual Showcase
          </h1>
          <p className="text-base text-slate-400 mt-3 leading-relaxed">
            High-resolution culinary photography demonstrating descriptive ALT text, Google Image indexing guidelines, and ImageGallery structured data.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { label: 'All Photos', value: 'all' },
            { label: 'Signatures', value: 'signature' },
            { label: 'Tandoor & Starters', value: 'starters' },
            { label: 'Curries', value: 'curries' },
            { label: 'Desserts', value: 'desserts' },
            { label: 'Spice Craft', value: 'kitchen' },
            { label: 'Ambiance', value: 'atmosphere' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === tab.value
                  ? 'bg-emerald-500 text-black font-bold shadow-xs'
                  : 'bg-[#121212] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group bg-[#121212] rounded-2xl overflow-hidden border border-slate-800 shadow-xs hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-xs text-emerald-400 border border-white/10 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif italic text-base font-bold text-white group-hover:text-emerald-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Technical ALT Inspector Box */}
              <div className="p-4 bg-[#0A0A0A] border-t border-slate-800 text-[11px] font-mono text-slate-500 space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-bold flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ALT Tag:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Accessible</span>
                </div>
                <p className="text-slate-400 line-clamp-2 italic font-sans text-xs">
                  "{item.altText}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
