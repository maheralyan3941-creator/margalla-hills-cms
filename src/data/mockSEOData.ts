import {
  KeywordItem,
  CompetitorSEOItem,
  PageSEOItem,
  TopicClusterItem,
  EntityTrackerItem,
  LocalSEOProfile,
  ProgrammaticTemplate,
  PruningItem,
  ComparisonTableRow,
  MasterAnalyticsConfig,
  BacklinkItem,
  RedirectRule
} from '../types';

/**
 * Initial seed data for Margalla Hills Complete SEO Admin Panel
 * Allows full out-of-the-box SEO management without touching code.
 */

export const INITIAL_KEYWORDS: KeywordItem[] = [
  {
    id: 'kw-1',
    clusterName: 'Luxury Dining Islamabad',
    keyword: 'best fine dining in islamabad',
    volume: '18.2k',
    kd: 38,
    intent: 'Commercial',
    targetPage: '/menu',
    status: 'Ranking',
    notes: 'Primary revenue keyword, current rank #1 on Google Pakistan',
    createdAt: '2026-01-15'
  },
  {
    id: 'kw-2',
    clusterName: 'Margalla Hills Tourism',
    keyword: 'restaurants in margalla hills islamabad',
    volume: '24.5k',
    kd: 32,
    intent: 'Navigational',
    targetPage: '/',
    status: 'Ranking',
    notes: 'High organic footfall from Islamabad & Rawalpindi tourists',
    createdAt: '2026-01-18'
  },
  {
    id: 'kw-3',
    clusterName: 'Saffron Gastronomy',
    keyword: 'artisanal kashmiri saffron cuisine',
    volume: '4.8k',
    kd: 19,
    intent: 'Informational',
    targetPage: '/botanicals/kashmiri-mongra-saffron',
    status: 'Ranking',
    notes: 'Low difficulty, high brand authority and topical moat',
    createdAt: '2026-01-20'
  },
  {
    id: 'kw-4',
    clusterName: 'Private Events',
    keyword: 'luxury corporate event catering islamabad',
    volume: '6.2k',
    kd: 27,
    intent: 'Transactional',
    targetPage: '/private-dining',
    status: 'Targeted',
    notes: 'High contract value B2B inquiries for diplomatic enclave',
    createdAt: '2026-01-22'
  },
  {
    id: 'kw-5',
    clusterName: 'Sommelier & Cellar',
    keyword: 'exclusive wine cellar tasting menu pakistan',
    volume: '3.1k',
    kd: 15,
    intent: 'Commercial',
    targetPage: '/wine-cellar',
    status: 'Under Optimization',
    notes: 'Unique niche, 800-bottle cellar ranking advantage',
    createdAt: '2026-02-01'
  },
  {
    id: 'kw-6',
    clusterName: 'Culinary Compendium',
    keyword: 'heritage mountain cuisine history himalayas',
    volume: '8.4k',
    kd: 22,
    intent: 'Informational',
    targetPage: '/compendium',
    status: 'Ranking',
    notes: 'Supported by 400 culinary chapters infinite scroll',
    createdAt: '2026-02-10'
  }
];

export const INITIAL_COMPETITORS: CompetitorSEOItem[] = [
  {
    id: 'comp-1',
    competitorName: 'The Monal Restaurant Islamabad',
    competitorUrl: 'https://themonal.com',
    rankingKeyword: 'pir sohawa view restaurants',
    targetPage: 'https://themonal.com/dine',
    estimatedRank: 2,
    theirStrengths: 'Heavy local brand recognition and high organic search volume',
    contentGapOpportunity: 'Lacks Michelin-caliber culinary curation, wine cellar schema, and deep botanical stories',
    backlinksNote: 'DA 48 - Backlinks from Dawn, Tribune, Geo News, Tripadvisor Top Pick',
    updatedAt: '2026-08-28'
  },
  {
    id: 'comp-2',
    competitorName: 'Highland Country Club & Resort',
    competitorUrl: 'https://highlandresort.com.pk',
    rankingKeyword: 'luxury resort dining islamabad hills',
    targetPage: 'https://highlandresort.com.pk/dining',
    estimatedRank: 4,
    theirStrengths: 'Strong local map pack presence and wedding packages',
    contentGapOpportunity: 'Weak on-page technical SEO, missing FAQ schema, slow mobile page speed (>3.8s)',
    backlinksNote: 'DA 36 - 120 referring domains, mostly directory listings and local tour operators',
    updatedAt: '2026-08-30'
  },
  {
    id: 'comp-3',
    competitorName: 'Serena Hotel Islamabad - Dawat',
    competitorUrl: 'https://serenahotels.com/serena-islamabad/dining',
    rankingKeyword: 'five star pakistani fine dining islamabad',
    targetPage: 'https://serenahotels.com/dawat',
    estimatedRank: 3,
    theirStrengths: 'Huge corporate domain authority (DA 68) with global hotel brand trust',
    contentGapOpportunity: 'Generic corporate structure, lacks individual dish schema, zero programmatic pages',
    backlinksNote: 'DA 68 - Booking.com, Forbes Travel Guide, Conde Nast Traveler',
    updatedAt: '2026-09-01'
  }
];

export const INITIAL_PAGES_SEO: PageSEOItem[] = [
  {
    id: 'page-home',
    path: '/',
    name: 'Home / Flagship Sanctuary',
    seoTitle: 'Margalla Hills | Luxury Dining, Scenic Heritage & Resort Islamabad',
    metaDescription: 'Experience extraordinary Michelin-caliber fine dining perched high above Islamabad in the Margalla Hills. Artisanal Kashmiri saffron, Himalayan morels, and scenic resort.',
    slug: '',
    canonicalUrl: 'https://margallahills.com/',
    h1Heading: 'Margalla Hills: Fine Dining & Scenic Heritage Sanctuary',
    h2Headings: ['Artisanal Gastronomy & Terroir', '800-Bottle Subterranean Sommelier Cellar', 'Himalayan Botanicals & Rare Spices'],
    h3Headings: ['Kashmiri Mongra Saffron Symphony', 'Slow-Braised Highland Lamb', '400 Chapters Compendium'],
    imageAltText: 'Margalla Hills Islamabad luxury restaurant panoramic balcony at twilight',
    ogTitle: 'Margalla Hills | Scenic Fine Dining Sanctuary Islamabad',
    ogDescription: 'Panoramic alpine views, single-origin saffron gastronomy, and luxury mountain hospitality.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Restaurant',
    searchIntent: 'Commercial',
    robotsIndex: true,
    robotsFollow: true,
    faqSection: [
      {
        question: 'Where is Margalla Hills Restaurant located?',
        answer: 'Margalla Hills is located atop Pir Sohawa Road in the Margalla Hills National Park, offering breathtaking panoramic vistas of Islamabad.'
      },
      {
        question: 'Do you require prior reservation?',
        answer: 'Yes, reservations are recommended for evening dining, private pavilions, and the 7-course tasting menu.'
      }
    ],
    hreflangTags: {
      en: 'https://margallahills.com/',
      'en-pk': 'https://margallahills.com/en-pk/',
      ur: 'https://margallahills.com/ur/'
    },
    updatedAt: '2026-09-01'
  },
  {
    id: 'page-menu',
    path: '/menu',
    name: 'Artisanal A La Carte Menu',
    seoTitle: 'Artisanal Menu (30+ Dishes) | Margalla Hills Fine Dining',
    metaDescription: 'Explore over 30 chef-crafted heirloom recipes, wood-fired Kashmiri saffron breads, Himalayan black truffles, and slow-braised mountain delicacies.',
    slug: 'menu',
    canonicalUrl: 'https://margallahills.com/menu',
    h1Heading: 'A La Carte Culinary Symphony: 30+ Heirloom Masterpieces',
    h2Headings: ['Signature Saffron Entrees', 'Himalayan Terroir Botanicals', 'Wood-Fired Tandoor & Breads'],
    h3Headings: ['Dum Pukht Kashmiri Biryani', 'Kullu Trout en Papillote', 'Saffron Cardamom Kulfi'],
    imageAltText: 'Chef plating Kashmiri saffron spiced lamb chops with botanical microgreens',
    ogTitle: 'Artisanal Menu (30+ Dishes) | Margalla Hills',
    ogDescription: 'Experience 30+ culinary masterpieces blending centuries-old Mughal traditions with modern gastronomic precision.',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Menu',
    searchIntent: 'Commercial',
    robotsIndex: true,
    robotsFollow: true,
    faqSection: [
      {
        question: 'Are all meats 100% Halal certified?',
        answer: 'All our meats are certified 100% Halal, free-range, and ethically sourced from organic mountain pastures.'
      }
    ],
    hreflangTags: {
      en: 'https://margallahills.com/menu',
      'en-pk': 'https://margallahills.com/en-pk/menu',
      ur: 'https://margallahills.com/ur/menu'
    },
    updatedAt: '2026-08-30'
  },
  {
    id: 'page-compendium',
    path: '/compendium',
    name: '400 Culinary Chapters',
    seoTitle: 'The 400 Culinary Chapters Compendium | Margalla Hills Heritage',
    metaDescription: 'An infinite scroll gastronomic anthology documenting 400 culinary chapters, spice histories, botanical sciences, and royal Himalayan kitchen secrets.',
    slug: 'compendium',
    canonicalUrl: 'https://margallahills.com/compendium',
    h1Heading: 'The Grand Compendium: 400 Continuous Culinary Chapters',
    h2Headings: ['Chronicles of Himalayan Spices', 'Fire, Clay & Ancient Fermentations', 'Royal Gastronomy of the North'],
    h3Headings: ['The Golden Threads of Pampore', 'Wild Mountain Foraging', 'Subterranean Vintage Preservation'],
    imageAltText: 'Ancient hand-bound culinary book with saffron threads and botanical herbs',
    ogTitle: '400 Culinary Chapters | Margalla Hills',
    ogDescription: '400 curated gastronomic chronicles exploring alpine flora, royal feasts, and heritage cooking methods.',
    ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Article',
    searchIntent: 'Informational',
    robotsIndex: true,
    robotsFollow: true,
    faqSection: [
      {
        question: 'What is the 400 Chapters Compendium?',
        answer: 'It is an authoritative living digital archive detailing 400 distinct recipes, terroir profiles, and food science insights.'
      }
    ],
    hreflangTags: {
      en: 'https://margallahills.com/compendium',
      'en-pk': 'https://margallahills.com/en-pk/compendium',
      ur: 'https://margallahills.com/ur/compendium'
    },
    updatedAt: '2026-09-02'
  }
];

export const INITIAL_PAGE_SEO = INITIAL_PAGES_SEO;

export const INITIAL_TOPIC_CLUSTERS: TopicClusterItem[] = [
  {
    id: 'cluster-1',
    pillarTopic: 'Himalayan & Kashmiri Saffron Terroir',
    subTopics: [
      'Mongra Grade 1 Saffron Harvesting Science',
      'Crocin, Picrocrocin & Safranal Bioavailability in Cooking',
      'Traditional Pampore Farmer Cooperative Ethics',
      'How to Distinguish Pure Saffron from Adulterated Threads'
    ],
    targetUrl: '/botanicals/kashmiri-mongra-saffron',
    intent: 'Informational',
    status: 'Pillar Published',
    notes: 'High semantic relevance for Google E-E-A-T score'
  },
  {
    id: 'cluster-2',
    pillarTopic: 'Subterranean Sommelier Cellar & Vintage Allocation',
    subTopics: [
      'Bordeaux Premier Grand Cru Humidity Stabilization',
      'Non-Alcoholic Botanical Wine Fermentations',
      'Pairing Bold Himalayan Spices with Aged Tannins',
      'Cellar Architecture at 1,500m Altitude in Margalla Hills'
    ],
    targetUrl: '/wine-cellar',
    intent: 'Commercial',
    status: 'Clustering in Progress',
    notes: 'Attracts high-net-worth connoisseurs and diplomatic guests'
  },
  {
    id: 'cluster-3',
    pillarTopic: 'Scenic Mountain Hospitality & Destination Dining',
    subTopics: [
      'Top Sunset Dining Viewpoints in Margalla Hills',
      'Private Gazebo Dining for Anniversaries & VIP Gatherings',
      'Seasonal Weather & Best Times to Dine Above the Clouds',
      'Helipad and Luxury Chauffeur Access Guide'
    ],
    targetUrl: '/private-dining',
    intent: 'Navigational',
    status: 'Pillar Published',
    notes: 'Targets location-based intent across Islamabad & Rawalpindi'
  }
];

export const INITIAL_ENTITIES: EntityTrackerItem[] = [
  {
    id: 'ent-1',
    entityName: 'Margalla Hills National Park',
    entityType: 'Place / Protected Area',
    wikiUrl: 'https://en.wikipedia.org/wiki/Margalla_Hills_National_Park',
    relevanceScore: 98,
    associatedKeywords: ['Margalla Hills', 'Pir Sohawa', 'Islamabad wildlife', 'Himalayan foothills'],
    recognizedOccurrences: 42
  },
  {
    id: 'ent-2',
    entityName: 'Pir Sohawa',
    entityType: 'Geographical Point of Interest',
    wikiUrl: 'https://en.wikipedia.org/wiki/Pir_Sohawa',
    relevanceScore: 95,
    associatedKeywords: ['Pir Sohawa Road', 'panoramic view', 'mountain ridge'],
    recognizedOccurrences: 38
  },
  {
    id: 'ent-3',
    entityName: 'Crocus sativus (Kashmiri Saffron)',
    entityType: 'Botanical Flora / Spice',
    wikiUrl: 'https://en.wikipedia.org/wiki/Saffron',
    relevanceScore: 92,
    associatedKeywords: ['Mongra saffron', 'stigmas', 'crocin', 'Pampore'],
    recognizedOccurrences: 56
  },
  {
    id: 'ent-4',
    entityName: 'Morchella esculenta (Himalayan Guchhi Morel)',
    entityType: 'Wild Fungus / Gourmet Delicacy',
    wikiUrl: 'https://en.wikipedia.org/wiki/Morchella_esculenta',
    relevanceScore: 89,
    associatedKeywords: ['black morels', 'pine forest foraging', 'earthy umami'],
    recognizedOccurrences: 27
  },
  {
    id: 'ent-5',
    entityName: 'Michelin Guide Gastronomy Standard',
    entityType: 'Organization / Culinary Benchmark',
    wikiUrl: 'https://en.wikipedia.org/wiki/Michelin_Guide',
    relevanceScore: 88,
    associatedKeywords: ['Michelin selected', 'tasting menu', 'sommelier', 'degustation'],
    recognizedOccurrences: 34
  }
];

export const INITIAL_LOCAL_SEO: LocalSEOProfile = {
  businessName: 'Margalla Hills Luxury Dining & Heritage Resort',
  phone: '+92 51 2800000',
  email: 'concierge@margallahills.com',
  streetAddress: 'Mile 9, Pir Sohawa Road, Margalla Hills',
  city: 'Islamabad',
  stateProvince: 'Islamabad Capital Territory',
  postalCode: '44000',
  country: 'Pakistan',
  latitude: 33.74832,
  longitude: 73.06451,
  googleMapsUrl: 'https://maps.google.com/?q=Margalla+Hills+Islamabad',
  googlePlaceId: 'ChIJ4z_Margalla_Hills_PK_ISB',
  openingHours: [
    'Monday - Thursday: 12:00 PM - 11:30 PM',
    'Friday: 01:00 PM - 12:30 AM',
    'Saturday - Sunday: 11:30 AM - 12:30 AM'
  ],
  locationPages: [
    { name: 'Islamabad Capital Territory (Flagship)', slug: 'islamabad', targetKeyword: 'luxury restaurant islamabad', active: true },
    { name: 'Rawalpindi Cantonment & Bahria', slug: 'rawalpindi', targetKeyword: 'fine dining rawalpindi', active: true },
    { name: 'Pir Sohawa Heights & Monal Ridge', slug: 'pir-sohawa', targetKeyword: 'restaurants in pir sohawa', active: true },
    { name: 'DHA Islamabad & Civic Centre', slug: 'dha-islamabad', targetKeyword: 'gourmet catering dha islamabad', active: true },
    { name: 'Murree Foothills & Galyat Ridge', slug: 'murree', targetKeyword: 'resort dining murree hills', active: true }
  ]
};

export const INITIAL_PROGRAMMATIC_TEMPLATES: ProgrammaticTemplate[] = [
  {
    id: 'prog-1',
    templateName: 'City Catering & VIP Gastronomy Hubs',
    keywordPattern: 'Luxury {keyword} in {city}',
    cities: [
      'Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar',
      'Multan', 'Faisalabad', 'Sialkot', 'Murree', 'Dubai',
      'Doha', 'London', 'New York'
    ],
    templateTitle: 'Luxury Dining & Artisanal Catering in {city} | Margalla Hills',
    templateMetaDesc: 'Discover bespoke culinary banquets, single-origin saffron feasts, and five-star hospitality services by Margalla Hills in {city}.',
    generatedCount: 25
  },
  {
    id: 'prog-2',
    templateName: 'Bespoke Wedding & Gala Pavilions',
    keywordPattern: 'Artisanal Wedding Banquet {keyword} for {city}',
    cities: [
      'Islamabad', 'Rawalpindi', 'Chak Shahzad', 'DHA Phase 2', 'Bahria Town'
    ],
    templateTitle: 'Royal Wedding & Gala Catering in {city} | Margalla Hills',
    templateMetaDesc: 'Curated 7-course wedding banquets with live botanical cooking stations in {city}.',
    generatedCount: 15
  }
];

export const INITIAL_PRUNING_ITEMS: PruningItem[] = [
  {
    id: 'prune-1',
    url: '/promo/new-year-2024-discount',
    title: 'New Year 2024 Early Bird Tasting Voucher',
    monthlyImpressions: 12,
    monthlyClicks: 0,
    bounceRate: 92,
    lastUpdated: '2024-01-05',
    status: 'under_review',
    suggestedAction: '301 Redirect'
  },
  {
    id: 'prune-2',
    url: '/events/spring-2023-tea-festival',
    title: 'Spring 2023 Himalayan Herbal Tea Showcase',
    monthlyImpressions: 28,
    monthlyClicks: 1,
    bounceRate: 88,
    lastUpdated: '2023-04-12',
    status: 'under_review',
    suggestedAction: 'Update Content'
  },
  {
    id: 'prune-3',
    url: '/tags/winter-specials-old',
    title: 'Archive: Winter Specials 2022',
    monthlyImpressions: 4,
    monthlyClicks: 0,
    bounceRate: 100,
    lastUpdated: '2022-12-01',
    status: 'under_review',
    suggestedAction: 'Noindex / Prune'
  }
];

export const INITIAL_COMPARISON_ROWS: ComparisonTableRow[] = [
  {
    id: 'comp-row-1',
    feature: 'Single-Origin Kashmiri Saffron Certification (ISO 3632)',
    margallaHills: 'Grade 1 Mongra (Pampore Certified)',
    competitorA: 'Commercial Grade Blend',
    competitorB: 'Synthetic Food Coloring',
    highlight: true
  },
  {
    id: 'comp-row-2',
    feature: 'Altitude & Panoramic Vistas',
    margallaHills: '1,500m Above Sea Level (360° Mountain Views)',
    competitorA: 'City Center Ground Level',
    competitorB: 'Partial Hill View',
    highlight: true
  },
  {
    id: 'comp-row-3',
    feature: 'Subterranean Sommelier Cellar',
    margallaHills: '800-Bottle Climate-Controlled Cellar',
    competitorA: 'Standard Bar Menu',
    competitorB: 'None',
    highlight: true
  },
  {
    id: 'comp-row-4',
    feature: 'Continuous Culinary Compendium',
    margallaHills: '400 Live Interactive Chapters',
    competitorA: '1-Page PDF Menu',
    competitorB: 'Static Menu Board',
    highlight: true
  },
  {
    id: 'comp-row-5',
    feature: 'Structured Data & Schema Rich Snippets',
    margallaHills: '100% JSON-LD Automated (Restaurant + Menu + FAQ)',
    competitorA: 'Basic Meta Tags only',
    competitorB: 'None',
    highlight: true
  }
];

export const INITIAL_ANALYTICS_SETTINGS: MasterAnalyticsConfig = {
  ga4Id: 'G-MARGALLA1234',
  googleSearchConsoleVerification: 'google-site-verification=margalla_hills_seo_verified_master',
  facebookPixelId: 'FB-PIXEL-987654321',
  clarityId: 'clarity_mgh_882',
  sitemapAutoGenerate: true,
  robotsTxtContent: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://margallahills.com/sitemap.xml`
};

export const INITIAL_BACKLINKS: BacklinkItem[] = [];

export const INITIAL_REDIRECTS: RedirectRule[] = [
  {
    id: 'red-1',
    source: '/old-menu',
    destination: '/menu',
    type: 301,
    active: true,
    hits: 248,
    lastAccessed: '2026-09-02T18:30:00Z'
  },
  {
    id: 'red-2',
    source: '/saffron-story',
    destination: '/botanicals/kashmiri-mongra-saffron',
    type: 301,
    active: true,
    hits: 412,
    lastAccessed: '2026-09-02T20:15:00Z'
  },
  {
    id: 'red-3',
    source: '/book-table',
    destination: '/#reserve',
    type: 301,
    active: true,
    hits: 689,
    lastAccessed: '2026-09-02T21:40:00Z'
  }
];
