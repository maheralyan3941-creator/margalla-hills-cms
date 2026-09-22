import { SEOMetadata } from '../types';

export interface HeritageArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  author: { name: string; role: string; avatar: string };
  publishedDate: string;
  coverImage: string;
  summary: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
  relatedDishes: { name: string; url: string }[];
  seo: SEOMetadata;
}

export const HERITAGE_ARTICLES: HeritageArticle[] = [
  {
    id: 'heritage-wazwan',
    slug: 'wazwan-royal-banquet-tradition',
    title: 'The 36-Course Wazwan: Kashmir’s Royal Culinary Symphony',
    subtitle: 'From Samarkand to Srinagar: The ancestral craft of the Master Vasta and the sacred copper trami.',
    readingTime: '8 min read',
    author: {
      name: 'Chef Marcus Sterling & Ustad Ghulam Nabi',
      role: 'Culinary Historian & Master Vasta',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '2026-08-15',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    summary: 'An intimate exploration into the legendary Kashmiri royal banquet tradition where meat is hand-pounded on walnut logs and simmered in hammered copper degs.',
    sections: [
      {
        heading: 'Origins in the 14th-Century Silk Road Migration',
        body: 'When Timur invaded Central Asia in 1398, over 1,700 artisans, weavers, and royal cooks migrated across the Hindu Kush into the fertile Kashmir Valley. The descendants of these court chefs, known today as the Vasta, preserved an unbroken chain of thirty-six distinct meat dishes seasoned with mountain dried fennel, wild ratan jot, and single-origin saffron.'
      },
      {
        heading: 'The Sacred Trami and Ritual Feasting',
        body: 'A true Wazwan is never served on individual plates. Guests sit in groups of four around a heavy, tin-lined engraved copper platter called a trami. The feast begins with the ritual washing of hands using a mobile copper basin (tash-t-nari), followed by the presentation of seekh kebabs, tabak maaz, and methi maaz resting atop fragrant basmati.'
      },
      {
        heading: 'Mastery of Spice Extractions Over Wood Fire',
        body: 'Unlike modern fast cooking, Wazwan chefs reject powdered food colorings and heavy onions. The deep ruby hue of Rogan Josh comes entirely from the lipid extraction of alpine Ratan Jot (alkanet root) in hot ghee, while the silken texture of Goshtaba comes from hours of hand-beating meat with walnut wooden mallets until cell membranes break into velvety protein emulsions.'
      }
    ],
    keyTakeaways: [
      'Authentic Wazwan involves 36 distinct culinary courses cooked over dried fruitwood fires.',
      'Meat is hand-pounded on walnut logs rather than machine ground, creating a micro-emulsion.',
      'Ruby color is achieved naturally via alpine Ratan Jot extraction in clarified butter.',
      'Diners share from an engraved copper trami to foster unity and shared community gratitude.'
    ],
    relatedDishes: [
      { name: 'Wazwan Lamb Shank Rogan Josh', url: '/menu/specialties/wazwan-lamb-shank-rogan-josh' },
      { name: 'Kashmiri Saffron Sheermal', url: '/menu/breads/kashmiri-saffron-sheermal' }
    ],
    seo: {
      seoTitle: 'The 36-Course Kashmiri Wazwan Tradition & History | Saffron & Sage',
      metaDescription: 'Discover the ancient Kashmiri royal banquet: Wazwan. Learn about the Master Vasta, hand-pounded meat techniques, copper degs, and single-origin saffron traditions.',
      slug: 'wazwan-royal-banquet-tradition',
      focusKeyword: 'kashmiri wazwan royal banquet',
      secondaryKeywords: ['36 course wazwan history', 'rogan josh ratan jot', 'traditional kashmiri feast'],
      canonicalUrl: '/heritage/wazwan-royal-banquet-tradition',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'The 36-Course Wazwan: Kashmir’s Royal Culinary Symphony',
      ogDescription: 'From 14th-century Central Asian courts to modern Michelin gastronomy.',
      ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'heritage-dum-pukht',
    slug: 'dum-pukht-clay-pot-slow-cooking',
    title: 'Dum Pukht: The Science of Sealing Flavor with Clay and Dough',
    subtitle: 'How 18th-century Awadhi royalty harnessed steam pressure physics to tenderize short ribs and concentrate saffron volatile oils.',
    readingTime: '7 min read',
    author: {
      name: 'Dr. Ayesha Al-Mansoor & Chef Marcus Sterling',
      role: 'Gastronomy Physicist & Executive Chef',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '2026-08-20',
    coverImage: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    summary: 'Dum Pukht literally means "to breathe and cook". Discover how sealing handi pots with whole-wheat dough traps essential aromatic terpenes.',
    sections: [
      {
        heading: 'The Famine of Awadh and the Invention of Dum',
        body: 'During the 1784 famine in Awadh, Nawab Asaf-ud-Daula initiated the construction of the Bara Imambara to provide work for his citizens. Massive cauldrons of meat and rice were sealed with dough to cook continuously over gentle embers so workers were fed day and night. When the Nawab smelled the intoxicating aromas escaping the broken seals, he ordered court chefs to refine the technique into an aristocratic art.'
      },
      {
        heading: 'Thermodynamics of Enclosed Steam Pressure',
        body: 'In conventional open or covered pots, delicate floral terpenes such as safranal (from saffron) and cineole (from cardamom) volatilize and escape into the kitchen air. By applying an airtight seal of kneaded dough (purdah) around heavy brass or terracotta vessels, internal steam pressure rises gently, forcing moisture and aromatics deep into connective collagen without boiling fibers apart.'
      },
      {
        heading: 'Modern Adaptation: 72-Hour Wagyu Dum Pukht',
        body: 'At Saffron & Sage, we combine ancient terracotta handis with precision convection thermodynamics. A5 Wagyu short ribs are seasoned with Pippali long pepper, single-origin saffron, and marrow stock, then sealed and gently braised for 72 hours until the beef dissolves at the touch of a spoon.'
      }
    ],
    keyTakeaways: [
      'Dum Pukht means "air-steamed cooking" from Persian "dum" (breath) and "pukht" (cooked).',
      'The dough seal (purdah) prevents volatile aroma terpenes from escaping into the atmosphere.',
      'Gentle convection pressure converts tough collagen into gelatinous umami juices without burning.',
      'Saffron blossoms preserve 95% more color and floral fragrance inside a sealed dum handi.'
    ],
    relatedDishes: [
      { name: '72-Hour Wagyu Short Rib Dum Pukht', url: '/menu/specialties/wagyu-short-rib-dum-pukht' },
      { name: 'Royal Kashmiri Saffron Biryani', url: '/menu/specialties/royal-saffron-biryani' }
    ],
    seo: {
      seoTitle: 'Dum Pukht Slow Cooking Science & History | Saffron & Sage',
      metaDescription: 'Explore the thermodynamic science and Awadhi history of Dum Pukht clay-pot cooking. Why sealing pots with dough concentrates saffron & collagen.',
      slug: 'dum-pukht-clay-pot-slow-cooking',
      focusKeyword: 'dum pukht slow cooking history',
      secondaryKeywords: ['awadhi dum cooking science', 'clay handi sealed biryani', 'wagyu dum pukht technique'],
      canonicalUrl: '/heritage/dum-pukht-clay-pot-slow-cooking',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Dum Pukht: The Science of Sealing Flavor with Clay and Dough',
      ogDescription: 'How 18th-century royal physics transformed slow-cooking into high art.',
      ogImage: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'heritage-pampore-farmers',
    slug: 'ethical-farmer-cooperatives-pampore',
    title: 'The Saffron Keepers of Pampore: Ethical Direct Trade in the Valley',
    subtitle: 'Behind our zero-middleman partnership with 42 multi-generational family farms in Kashmir.',
    readingTime: '6 min read',
    author: {
      name: 'Marcus Sterling & Bashir Ahmad Bhat',
      role: 'Executive Chef & Lead Cooperative Elder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '2026-08-10',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Why commercial saffron is frequently adulterated, and how Saffron & Sage pays 350% above market commodities to guarantee purity and community prosperity.',
    sections: [
      {
        heading: 'The 75,000 Blossom Mathematics of One Pound of Saffron',
        body: 'Each purple Crocus sativus blossom contains exactly three slender crimson stigmas. To produce just one single pound of pure dried saffron, farmers must hand-pick approximately 75,000 flowers in the brief morning window between dawn and sunrise before direct sunlight breaks down the fragile crocin pigments.'
      },
      {
        heading: 'Fighting Global Saffron Adulteration',
        body: 'An estimated 60% of commercial saffron sold in international markets is cut with dyed corn silk, safflower petals, or sprayed with heavy chemical syrups to increase weight. Saffron & Sage commissions independent HPLC laboratory testing for every batch, confirming a minimum Crocin score of 240+ Units (exceeding ISO 3632 Category I standards).'
      },
      {
        heading: 'Empowering Kashmiri Village Infrastructure',
        body: 'By establishing direct pre-harvest contracts, we eliminate predatory regional middlemen. Our cooperative profits fund winter heating infrastructure, solar-powered drip irrigation for the karewa soils, and educational scholarships for village children across the Pampore district.'
      }
    ],
    keyTakeaways: [
      'It requires 75,000 hand-picked blossoms at dawn to yield one pound of pure Mongra saffron.',
      'Saffron & Sage conducts independent HPLC testing to verify pure 240+ Crocin potency.',
      'Our direct trade model pays 350% above commodity floor prices to 42 farming families.',
      'Cooperative revenues build solar irrigation and village schools in Pampore.'
    ],
    relatedDishes: [
      { name: 'Royal Kashmiri Saffron Biryani', url: '/menu/specialties/royal-saffron-biryani' },
      { name: '24K Gold Saffron Shahi Tukda', url: '/menu/desserts/gold-saffron-shahi-tukda' }
    ],
    seo: {
      seoTitle: 'Ethical Saffron Farming & Pampore Cooperatives | Saffron & Sage',
      metaDescription: 'Learn how Saffron & Sage partners directly with 42 Kashmiri family farms in Pampore, ensuring pure HPLC-tested Grade A Mongra saffron and fair living wages.',
      slug: 'ethical-farmer-cooperatives-pampore',
      focusKeyword: 'ethical kashmir saffron farmers',
      secondaryKeywords: ['pampore saffron cooperative', 'crocus sativus direct trade', 'pure kashmiri saffron testing'],
      canonicalUrl: '/heritage/ethical-farmer-cooperatives-pampore',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'The Saffron Keepers of Pampore: Ethical Direct Trade',
      ogDescription: 'Discover our zero-middleman fair trade cooperative in Kashmir.',
      ogImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'heritage-cellar-pairing',
    slug: 'sommelier-cellar-aging-guide',
    title: 'Pairing Grand Cru Vintages with High-Spiced Aromatic Gastronomy',
    subtitle: 'Demystifying the myth that fine wine clashes with chili, saffron, and tandoori charcoal.',
    readingTime: '9 min read',
    author: {
      name: 'Elena Rostova, Master Sommelier',
      role: 'Head of Cellars & Beverage Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '2026-08-01',
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Master Sommelier Elena Rostova shares the chemical principles behind balancing high-tannin Bordeaux, aged Burgundy, and saline Champagne with complex Indian aromatics.',
    sections: [
      {
        heading: 'The Tannin and Capsaicin Friction Matrix',
        body: 'Conventional wine wisdom cautions against serving high-tannin reds with spicy foods because capsaicin accentuates alcohol heat and creates an unpleasantly bitter astringency. However, when dishes are formulated with clarified butter (ghee) and dairy fat matrices, the lipid layer coats taste receptors, allowing aged Cabernet tannins (such as our 2010 Margaux) to bind harmoniously with roasted lamb proteins.'
      },
      {
        heading: 'The Power of Autolytic Champagne with Saffron',
        body: 'Vintage Champagne with extended lees aging (such as Dom Pérignon P2 2004) contains high concentrations of savory glutamates and toasted brioche aromatics. When paired with saffron-poached lobster bisque, the saline acidity cuts through rich cream while amplifying the botanical floral notes of Pampore crocin.'
      },
      {
        heading: 'Subterranean Vault Temperature & Decanting Protocols',
        body: 'Our cellar maintains a strict 55°F (12.8°C) temperature and 70% humidity. Before service, high-vintage Barolo and Bordeaux allocations undergo a 90-minute hyper-aeration decanting ritual in hand-blown Zalto carafes to ensure aromatics unlock fully alongside wood-fired dishes.'
      }
    ],
    keyTakeaways: [
      'Ghee and lipid emulsions tame capsaicin heat, making aged Grand Cru pairing a triumph.',
      'Extended-lees Champagne provides natural glutamates that mirror umami-rich saffron dishes.',
      'Decanting 90 minutes prior to service releases tight tertiary aromas for optimal pairing.',
      'Our 800-bottle subterranean cellar is kept at an exacting 55°F and 70% humidity.'
    ],
    relatedDishes: [
      { name: 'Breton Blue Lobster Saffron Bisque', url: '/menu/specialties/breton-lobster-saffron-bisque' },
      { name: 'Château Margaux 2010 Allocation', url: '/wine/chateau-margaux-premier-grand-cru-2010' }
    ],
    seo: {
      seoTitle: 'Sommelier Wine Pairing Guide for Spiced Cuisine | Saffron & Sage',
      metaDescription: 'Master Sommelier insights on pairing Grand Cru Bordeaux, Burgundy, and Vintage Champagne with aromatic saffron, cardamom, and clay-tandoor dishes.',
      slug: 'sommelier-cellar-aging-guide',
      focusKeyword: 'pairing fine wine with indian food',
      secondaryKeywords: ['sommelier guide spiced food', 'grand cru wine pairing', 'bordeaux with lamb curry'],
      canonicalUrl: '/heritage/sommelier-cellar-aging-guide',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Pairing Grand Cru Vintages with Spiced Gastronomy',
      ogDescription: 'Master Sommelier guide on pairing luxury wine with Kashmiri spices.',
      ogImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  }
];
