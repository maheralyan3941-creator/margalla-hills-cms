import { SEOMetadata } from '../types';

export interface WineAllocation {
  id: string;
  slug: string;
  name: string;
  producer: string;
  vintage: string;
  region: string;
  country: string;
  grapeVarieties: string[];
  alcoholByVolume: string;
  criticScore: string;
  bottlePrice: number;
  glassPrice?: number;
  tastingNotes: string;
  pairingDish: { name: string; url: string; reason: string };
  cellarInventory: number;
  drinkingWindow: string;
  image: string;
  seo: SEOMetadata;
}

export const WINE_ALLOCATIONS: WineAllocation[] = [
  {
    id: 'wine-margaux-2010',
    slug: 'chateau-margaux-premier-grand-cru-2010',
    name: 'Château Margaux Premier Grand Cru Classé 2010',
    producer: 'Château Margaux',
    vintage: '2010',
    region: 'Margaux, Bordeaux',
    country: 'France',
    grapeVarieties: ['90% Cabernet Sauvignon', '7% Merlot', '1.5% Cabernet Franc', '1.5% Petit Verdot'],
    alcoholByVolume: '13.5%',
    criticScore: '99 Pts (Robert Parker / Wine Advocate)',
    bottlePrice: 1650,
    glassPrice: 340,
    tastingNotes: 'Extraordinary violet perfume, blackcurrant cassis, sandalwood, crushed graphite, and silky ultrafine tannins with a 60-second finish.',
    pairingDish: {
      name: 'Slow-Braised Lamb Shank Nihari',
      url: '/menu/mains/slow-braised-lamb-shank-nihari',
      reason: 'The velvety structured tannins and mineral precision cut through the 14-hour bone marrow reduction effortlessly.'
    },
    cellarInventory: 14,
    drinkingWindow: '2025 - 2060',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Château Margaux 2010 Premier Grand Cru Allocation | Saffron & Sage Cellar',
      metaDescription: 'Discover our rare allocation of Château Margaux 2010 (99 Pts). Explore sommelier tasting notes, vintage analysis, and lamb nihari pairings.',
      slug: 'chateau-margaux-premier-grand-cru-2010',
      focusKeyword: 'chateau margaux 2010 wine',
      secondaryKeywords: ['bordeaux premier grand cru', 'fine dining wine pairing', 'margaux 2010 sommelier notes'],
      canonicalUrl: '/wine/chateau-margaux-premier-grand-cru-2010',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Château Margaux 2010 Premier Grand Cru Classé',
      ogDescription: 'Subterranean cellar allocation of 2010 Château Margaux at Saffron & Sage.',
      ogImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  },
  {
    id: 'wine-drc-echezeaux-2017',
    slug: 'domaine-de-la-romanee-conti-echezeaux-2017',
    name: 'Domaine de la Romanée-Conti Échezeaux Grand Cru 2017',
    producer: 'Domaine de la Romanée-Conti (DRC)',
    vintage: '2017',
    region: 'Côte de Nuits, Burgundy',
    country: 'France',
    grapeVarieties: ['100% Pinot Noir'],
    alcoholByVolume: '13.0%',
    criticScore: '96 Pts (Allen Meadows / Burghound)',
    bottlePrice: 3200,
    tastingNotes: 'Transcendent wild wild strawberry, sous-bois, dried rose petals, blood orange zest, and ethereal lingering cardamom spice.',
    pairingDish: {
      name: 'Wild Morel & Saffron Risotto',
      url: '/menu/specialties/guchhi-morel-risotto',
      reason: 'The forest-floor truffle subtleties in DRC Pinot Noir resonate symphonically with wild Himalayan Guchhi mushrooms.'
    },
    cellarInventory: 6,
    drinkingWindow: '2024 - 2048',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'DRC Échezeaux Grand Cru 2017 Allocation | Saffron & Sage',
      metaDescription: 'Domaine de la Romanée-Conti Échezeaux 2017. Stored in temperature-controlled 55°F cellar vault. Sommelier tasting & morel pairing.',
      slug: 'domaine-de-la-romanee-conti-echezeaux-2017',
      focusKeyword: 'drc echezeaux 2017 burgundy',
      secondaryKeywords: ['domaine romanee conti allocation', 'grand cru burgundy wine list', 'pinot noir food pairing'],
      canonicalUrl: '/wine/domaine-de-la-romanee-conti-echezeaux-2017',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'DRC Échezeaux Grand Cru 2017 - Saffron & Sage Vault',
      ogDescription: 'Rare DRC allocation paired with Himalayan foraged wild morels.',
      ogImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  },
  {
    id: 'wine-sassicaia-2018',
    slug: 'sassicaia-tenuta-san-guido-2018',
    name: 'Tenuta San Guido Sassicaia Bolgheri Sassicaia 2018',
    producer: 'Tenuta San Guido',
    vintage: '2018',
    region: 'Bolgheri, Tuscany',
    country: 'Italy',
    grapeVarieties: ['85% Cabernet Sauvignon', '15% Cabernet Franc'],
    alcoholByVolume: '14.0%',
    criticScore: '97+ Pts (Wine Advocate / Monica Larner)',
    bottlePrice: 620,
    glassPrice: 125,
    tastingNotes: 'Black cherry liqueur, wild Mediterranean scrub (macchia), cured tobacco, cedar bark, and polished aristocratic minerality.',
    pairingDish: {
      name: 'Wagyu Short Rib Dum Pukht',
      url: '/menu/specialties/wagyu-short-rib-dum-pukht',
      reason: 'The Tuscan Cabernet structure cuts through rich A5 wagyu marbling with balsamic herbaceous precision.'
    },
    cellarInventory: 24,
    drinkingWindow: '2024 - 2050',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Tenuta San Guido Sassicaia 2018 Bolgheri | Saffron & Sage',
      metaDescription: 'Explore the legendary Super Tuscan Sassicaia 2018. Sommelier tasting profile, cellaring potential, and 72-hour wagyu short rib pairing.',
      slug: 'sassicaia-tenuta-san-guido-2018',
      focusKeyword: 'sassicaia 2018 super tuscan',
      secondaryKeywords: ['tenuta san guido bolgheri', 'italian luxury wine pairing', 'super tuscan wine list'],
      canonicalUrl: '/wine/sassicaia-tenuta-san-guido-2018',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Sassicaia 2018 Bolgheri - Sommelier Reserve',
      ogDescription: 'The pinnacle of Italian winemaking paired with 72-hour Wagyu Dum Pukht.',
      ogImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  },
  {
    id: 'wine-dom-perignon-p2-2004',
    slug: 'dom-perignon-vintage-p2-champagne-2004',
    name: 'Dom Pérignon Vintage Plénitude 2 (P2) Champagne 2004',
    producer: 'Moët & Chandon / Dom Pérignon',
    vintage: '2004',
    region: 'Épernay, Champagne',
    country: 'France',
    grapeVarieties: ['53% Pinot Noir', '47% Chardonnay'],
    alcoholByVolume: '12.5%',
    criticScore: '98 Pts (Antonio Galloni / Vinous)',
    bottlePrice: 850,
    glassPrice: 175,
    tastingNotes: 'Toasted brioche, candied citrus peel, smoky chalk minerality, iodine, dried apricot, and an electrifying saline surge.',
    pairingDish: {
      name: 'Breton Blue Lobster Saffron Bisque',
      url: '/menu/specialties/breton-lobster-saffron-bisque',
      reason: '16 years on lees gives P2 the autolytic richness required to elevate butter-poached Breton lobster and saffron.'
    },
    cellarInventory: 18,
    drinkingWindow: '2024 - 2045',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Dom Pérignon P2 2004 Champagne Plénitude | Saffron & Sage',
      metaDescription: 'Dom Pérignon Vintage P2 2004 Champagne. 16 years sur lattes aging. Sommelier notes and Breton blue lobster pairings.',
      slug: 'dom-perignon-vintage-p2-champagne-2004',
      focusKeyword: 'dom perignon p2 2004 champagne',
      secondaryKeywords: ['plenitude 2 tasting notes', 'luxury champagne fine dining', 'seafood champagne pairing'],
      canonicalUrl: '/wine/dom-perignon-vintage-p2-champagne-2004',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Dom Pérignon P2 2004 Plénitude Champagne',
      ogDescription: 'Experience 16 years of cellar lees maturation with rare Breton lobster bisque.',
      ogImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  },
  {
    id: 'wine-dyquem-2015',
    slug: 'chateau-dyquem-sauternes-premier-cru-2015',
    name: 'Château d’Yquem Sauternes Premier Cru Supérieur 2015',
    producer: 'Château d’Yquem',
    vintage: '2015',
    region: 'Sauternes, Bordeaux',
    country: 'France',
    grapeVarieties: ['75% Sémillon', '25% Sauvignon Blanc'],
    alcoholByVolume: '14.0%',
    criticScore: '100 Pts (Lisa Perrotti-Brown / The Wine Advocate)',
    bottlePrice: 980,
    glassPrice: 190,
    tastingNotes: 'Pure liquid gold: botrytized honey, saffron blossom, candied Seville orange, ginger confit, and unctuous balanced acidity.',
    pairingDish: {
      name: '24K Gold Saffron Shahi Tukda',
      url: '/menu/desserts/gold-saffron-shahi-tukda',
      reason: 'The saffron and candied apricot notes in Yquem mirror the saffron rabri and caramel brioche of our grand dessert.'
    },
    cellarInventory: 12,
    drinkingWindow: '2025 - 2085',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Château d’Yquem 2015 100-Point Sauternes Allocation | Saffron & Sage',
      metaDescription: 'Savor the 100-point perfect Château d’Yquem 2015 Sauternes. Botrytis nectar, saffron notes, and shahi tukda dessert symphony.',
      slug: 'chateau-dyquem-sauternes-premier-cru-2015',
      focusKeyword: 'chateau dyquem 2015 sauternes',
      secondaryKeywords: ['100 point dessert wine', 'premier cru superieur yquem', 'saffron dessert wine pairing'],
      canonicalUrl: '/wine/chateau-dyquem-sauternes-premier-cru-2015',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Château d’Yquem 2015 100 Pts Sauternes',
      ogDescription: 'The world’s greatest dessert wine paired with 24K Gold Saffron Shahi Tukda.',
      ogImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  },
  {
    id: 'wine-penfolds-grange-2016',
    slug: 'penfolds-grange-bin-95-shiraz-2016',
    name: 'Penfolds Grange Bin 95 Shiraz 2016',
    producer: 'Penfolds',
    vintage: '2016',
    region: 'South Australia (Barossa / McLaren Vale)',
    country: 'Australia',
    grapeVarieties: ['97% Shiraz', '3% Cabernet Sauvignon'],
    alcoholByVolume: '14.5%',
    criticScore: '100 Pts (Ken Gargett / World of Fine Wine)',
    bottlePrice: 1100,
    tastingNotes: 'Blackberry paste, dark mocha, Chinese five-spice, star anise, smoked charcuterie, and immense muscular velvet density.',
    pairingDish: {
      name: 'Wazwan Lamb Shank Rogan Josh',
      url: '/menu/specialties/wazwan-lamb-shank-rogan-josh',
      reason: 'The spicy anise-clove complexity and sheer power of Grange stands proudly against the Kashmiri dry-ginger and ratan jot aromatics.'
    },
    cellarInventory: 10,
    drinkingWindow: '2026 - 2065',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Penfolds Grange Bin 95 Shiraz 2016 | Saffron & Sage Wine Cellar',
      metaDescription: '100-Point Penfolds Grange 2016 Shiraz allocation. Intense Barossa terroir, spice aromatics, and lamb rogan josh sommelier pairings.',
      slug: 'penfolds-grange-bin-95-shiraz-2016',
      focusKeyword: 'penfolds grange 2016 shiraz',
      secondaryKeywords: ['australian iconic wine', 'bin 95 grange tasting notes', 'lamb curry wine pairing'],
      canonicalUrl: '/wine/penfolds-grange-bin-95-shiraz-2016',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Penfolds Grange 2016 Shiraz - 100 Pts Reserve',
      ogDescription: 'Australia’s flagship icon wine available in our subterranean vault.',
      ogImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'MenuItem',
      searchIntent: 'Commercial'
    }
  }
];
