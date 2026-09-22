import { SEOMetadata } from '../types';

export interface BotanicalIngredient {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  origin: string;
  elevation: string;
  harvestSeason: string;
  sensoryProfile: string;
  chemicalCompounds: string[];
  culinaryUsage: string;
  curatedDishes: { name: string; url: string }[];
  history: string;
  sourcingEthics: string;
  image: string;
  seo: SEOMetadata;
}

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'bot-kashmiri-saffron',
    slug: 'kashmiri-mongra-saffron',
    name: 'Single-Origin Kashmiri Mongra Saffron',
    botanicalName: 'Crocus sativus var. kashmiriensis',
    origin: 'Pampore Plateau, Kashmir Valley',
    elevation: '5,300 Feet (1,615 Meters)',
    harvestSeason: 'Late Autumn (October - November, Dawn Harvest)',
    sensoryProfile: 'Intense sweet hay, floral honey, metallic crimson depth, warm earthy persistence',
    chemicalCompounds: ['Crocin (>240 units, deep color)', 'Safranal (aroma)', 'Picrocrocin (flavor)'],
    culinaryUsage: 'Infused in royal biryanis, slow-braised gravies, delicate kehwa teas, and shahi tukda desserts.',
    curatedDishes: [
      { name: 'Royal Kashmiri Saffron Biryani', url: '/menu/specialties/royal-saffron-biryani' },
      { name: '24K Gold Saffron Shahi Tukda', url: '/menu/desserts/gold-saffron-shahi-tukda' },
      { name: 'Royal Kehwa Saffron Tea', url: '/menu/beverages/royal-kehwa-saffron-tea' }
    ],
    history: 'Cultivated on the high lacustrine plateaus (karewas) of Kashmir for over two millennia. Mentioned in ancient Ayurvedic and Sanskrit treatises as Kumkuma, prized by Mughal royal courts.',
    sourcingEthics: 'Direct fair-trade partnership with Pampore farmer cooperatives, guaranteeing 100% pure Grade-A Mongra (stigma tops only) without style or stamens.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Kashmiri Mongra Saffron Terroir & Botanical Guide | Saffron & Sage',
      metaDescription: 'Discover single-origin Kashmiri Mongra Saffron from Pampore (5,300 ft elevation). Learn about crocin potency, harvesting ethics, and royal culinary applications.',
      slug: 'kashmiri-mongra-saffron',
      focusKeyword: 'kashmiri mongra saffron',
      secondaryKeywords: ['pampore saffron harvest', 'crocus sativus kashmir', 'pure grade a saffron'],
      canonicalUrl: '/botanicals/kashmiri-mongra-saffron',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Kashmiri Mongra Saffron Botanical Terroir Guide',
      ogDescription: 'Single-origin Pampore saffron harvested at dawn. Learn why Kashmiri saffron commands the world’s highest culinary esteem.',
      ogImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-himalayan-guchhi',
    slug: 'himalayan-guchhi-morels',
    name: 'Wild Himalayan Guchhi (Black Morels)',
    botanicalName: 'Morchella conica / Morchella esculenta',
    origin: 'Pine & Deodar Forests of Gulmarg & Pir Panjal',
    elevation: '7,500 - 9,500 Feet',
    harvestSeason: 'Early Spring (March - May, Post Snowmelt)',
    sensoryProfile: 'Intense wood smoke, forest floor musk, rich roasted umami, porous honeycomb texture',
    chemicalCompounds: ['Glutamic Acid', 'Oct-1-en-3-ol (Forest aroma)', 'Vitamin D2'],
    culinaryUsage: 'Featured in Guchhi Morel Risotto, Shahi Korma stuffing, and slow-simmered bone marrow reductions.',
    curatedDishes: [
      { name: 'Wild Morel & Saffron Risotto', url: '/menu/specialties/guchhi-morel-risotto' },
      { name: 'Wild Morel Shahi Korma', url: '/menu/mains/wild-morel-shahi-korma' }
    ],
    history: 'Foraged by nomadic Gujjar tribes across steep Himalayan ridges. These wild mushrooms cannot be commercially cultivated and are dried on cedar string lines.',
    sourcingEthics: 'Sustained foraging practices leaving root mycelium intact, paying direct premium wages to local tribal harvesters.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Himalayan Guchhi Morel Mushrooms Guide | Saffron & Sage Terroir',
      metaDescription: 'Explore the rare wild Himalayan Guchhi (Black Morel) foraged in Kashmir pine forests at 8,000 ft. Botanical insights, umami chemistry & gourmet recipes.',
      slug: 'himalayan-guchhi-morels',
      focusKeyword: 'himalayan guchhi morels',
      secondaryKeywords: ['wild kashmir morel mushrooms', 'guchhi mushroom recipe', 'morchella conica kashmir'],
      canonicalUrl: '/botanicals/himalayan-guchhi-morels',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Himalayan Guchhi Morel Mushrooms | Rare Botanical Guide',
      ogDescription: 'Wild-foraged black morels from high Himalayan cedar forests. Explore the world’s most coveted forest mushroom.',
      ogImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-norcia-truffle',
    slug: 'norcia-black-winter-truffle',
    name: 'Norcia Black Winter Truffle',
    botanicalName: 'Tuber melanosporum',
    origin: 'Norcia, Umbria & Piedmont Foothills, Italy',
    elevation: '1,800 - 3,200 Feet',
    harvestSeason: 'Winter (December - March)',
    sensoryProfile: 'Damp autumn earth, roasted hazelnuts, dark cocoa, musky oak sweetness',
    chemicalCompounds: ['Dimethyl sulfide', 'Androstenol', '2-Methylbutanal'],
    culinaryUsage: 'Shaved over clay-oven smoked paneer tikka, kulcha flatbreads, and slow-simmered Dal Bukhara.',
    curatedDishes: [
      { name: 'Smoked Truffle Paneer Tikka', url: '/menu/starters/smoked-truffle-paneer' },
      { name: 'Truffle & Goat Cheese Kulcha', url: '/menu/breads/truffle-goat-cheese-kulcha' },
      { name: 'Black Truffle Dal Bukhara', url: '/menu/mains/black-truffle-dal-bukhara' }
    ],
    history: 'Hunted for centuries in central Italy using trained Lagotto Romagnolo truffle hounds under ancient oak and hazel groves.',
    sourcingEthics: 'Certified DOCG Umbrian harvest flown directly within 48 hours of extraction.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Norcia Black Winter Truffle Botanical Profile | Saffron & Sage',
      metaDescription: 'Discover how authentic Italian Tuber melanosporum from Norcia elevates our clay-oven tandoori starters and artisanal kulchas.',
      slug: 'norcia-black-winter-truffle',
      focusKeyword: 'norcia black winter truffle',
      secondaryKeywords: ['tuber melanosporum culinary', 'gourmet truffle paneer', 'italian winter truffle pairings'],
      canonicalUrl: '/botanicals/norcia-black-winter-truffle',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Norcia Black Winter Truffle | Culinary Botanical Guide',
      ogDescription: 'Certified Umbrian winter truffles integrated with ancient tandoori fire techniques.',
      ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-mysore-cardamom',
    slug: 'mysore-green-cardamom',
    name: 'Mysore Alleppey Bold Green Cardamom',
    botanicalName: 'Elettaria cardamomum var. mysorensis',
    origin: 'Cardamom Hills, Western Ghats Rainforest',
    elevation: '3,000 - 4,500 Feet',
    harvestSeason: 'September - February',
    sensoryProfile: 'Bright camphor, refreshing menthol, eucalyptus sweetness, floral citrus top notes',
    chemicalCompounds: ['1,8-Cineole', 'Terpinyl acetate', 'Limonene'],
    culinaryUsage: 'Essential in cardamom rose tres leches, slow-cooked nihari aromatics, and royal rabri infusions.',
    curatedDishes: [
      { name: 'Cardamom & Rose Velvet Tres Leches', url: '/menu/desserts/cardamom-rose-tres-leches' },
      { name: 'Slow-Braised Lamb Shank Nihari', url: '/menu/mains/slow-braised-lamb-shank-nihari' }
    ],
    history: 'Known as the Queen of Spices, indigenous to the tropical evergreen rainforests of southwest India.',
    sourcingEthics: 'Selected 8mm+ Extra Bold hand-graded pods from certified rainforest alliance estates.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Mysore Green Cardamom Botanical Profile | Saffron & Sage',
      metaDescription: 'Learn about 8mm bold green cardamom pods from the Western Ghats. Discover its essential oils, aroma chemistry, and heritage desserts.',
      slug: 'mysore-green-cardamom',
      focusKeyword: 'mysore green cardamom',
      secondaryKeywords: ['alleppey bold cardamom', 'queen of spices', 'cardamom aroma chemistry'],
      canonicalUrl: '/botanicals/mysore-green-cardamom',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Mysore Green Cardamom Terroir Guide',
      ogDescription: 'The Queen of Spices: Extra Bold green cardamom and its role in royal gastronomy.',
      ogImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-ratan-jot',
    slug: 'kashmiri-ratan-jot',
    name: 'Wild Kashmiri Ratan Jot (Alkanet Root)',
    botanicalName: 'Alkanna tinctoria / Arnebia benthamii',
    origin: 'Alpine Meadows of Sonamarg & Drass',
    elevation: '9,000 - 11,000 Feet',
    harvestSeason: 'Late Summer',
    sensoryProfile: 'Mild earthy herbal undertone, lipid-soluble vibrant ruby-crimson tint',
    chemicalCompounds: ['Alkannin', 'Shikonin derivatives', 'Flavonoids'],
    culinaryUsage: 'Extracted in warm clarified butter (ghee) to give authentic Rogan Josh its signature jewel-like crimson color without artificial food dyes.',
    curatedDishes: [
      { name: 'Wazwan Lamb Shank Rogan Josh', url: '/menu/specialties/wazwan-lamb-shank-rogan-josh' }
    ],
    history: 'The secret ancestral herb of royal Kashmiri Wazwan master chefs (Vastas) for over five centuries.',
    sourcingEthics: 'Responsibly harvested wild alpine root collected with forest authority permits.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Kashmiri Ratan Jot (Alkanet Root) Guide | Saffron & Sage',
      metaDescription: 'Discover the ancient alpine herb Ratan Jot that creates the legendary ruby color of authentic Kashmiri Rogan Josh.',
      slug: 'kashmiri-ratan-jot',
      focusKeyword: 'kashmiri ratan jot',
      secondaryKeywords: ['alkanet root rogan josh', 'natural ruby spice oil', 'wazwan spices'],
      canonicalUrl: '/botanicals/kashmiri-ratan-jot',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Kashmiri Ratan Jot (Alkanet Root) Terroir & History',
      ogDescription: 'The ancient botanical secret behind Kashmiri Wazwan’s jewel-toned crimson gravies.',
      ogImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-pippali',
    slug: 'pippali-long-pepper',
    name: 'Meghalaya Pippali (Long Pepper)',
    botanicalName: 'Piper retrofractum / Piper longum',
    origin: 'Khasi Hills Rainforest, Meghalaya',
    elevation: '2,500 - 4,000 Feet',
    harvestSeason: 'Winter Harvest',
    sensoryProfile: 'Complex sweet heat, gingerbread, clove warmth, gentle numbing finish',
    chemicalCompounds: ['Piperine (high density)', 'Piperlongumine', 'Sylvatine'],
    culinaryUsage: 'Ground fresh into our 14-hour lamb nihari and Awadhi kebab spice reductions.',
    curatedDishes: [
      { name: 'Slow-Braised Lamb Shank Nihari', url: '/menu/mains/slow-braised-lamb-shank-nihari' },
      { name: 'Awadhi Royal Galouti Kebab', url: '/menu/starters/awadhi-galouti-kebab-sheermal' }
    ],
    history: 'The original pepper of antiquity, favored by Roman emperors and ancient Indian culinary masters long before black peppercorns gained dominance.',
    sourcingEthics: 'Shade-grown in sacred Khasi tribal forest groves without synthetic pesticides.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Meghalaya Pippali Long Pepper Botanical Guide | Saffron & Sage',
      metaDescription: 'Explore ancient Pippali (Long Pepper) from Meghalaya. Sweet peppery warmth, digestive botanicals & slow-braised nihari spice profiles.',
      slug: 'pippali-long-pepper',
      focusKeyword: 'pippali long pepper',
      secondaryKeywords: ['piper longum spice', 'ancient indian pepper', 'nihari spice blend'],
      canonicalUrl: '/botanicals/pippali-long-pepper',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Pippali Long Pepper | Ancient Heritage Spice',
      ogDescription: 'Rediscover the sweet, complex heat of ancient Indian long pepper in modern fine dining.',
      ogImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-damascus-rose',
    slug: 'damascus-rose-water',
    name: 'Kashmiri Organic Damascus Rose Water',
    botanicalName: 'Rosa damascena',
    origin: 'Pari Mahal Rose Gardens, Srinagar',
    elevation: '5,200 Feet',
    harvestSeason: 'May - June (Pre-Sunrise Floral Plucking)',
    sensoryProfile: 'Velvety floral sweetness, honeyed rose petal aroma, calming botanical finish',
    chemicalCompounds: ['Geraniol', 'Citronellol', 'Phenethyl alcohol'],
    culinaryUsage: 'Subtly infused in cardamom tres leches, royal saffron kehwa, and artisanal botanical cocktails.',
    curatedDishes: [
      { name: 'Cardamom & Rose Velvet Tres Leches', url: '/menu/desserts/cardamom-rose-tres-leches' },
      { name: 'Saffron Rose Botanical Sherbet', url: '/menu/beverages/saffron-rose-botanical-sherbet' }
    ],
    history: 'Steam-distilled in traditional copper alembics (deg-bhapka) dating back to 16th-century Persian-Kashmiri court perfumeries.',
    sourcingEthics: 'Organically grown pesticide-free heirloom rose varieties hand-picked at dawn before dew evaporates.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Organic Damascus Rose Distillation Guide | Saffron & Sage Terroir',
      metaDescription: 'Discover the ancient hydro-distillation of Kashmiri Rosa damascena petals in traditional copper degs for Michelin-standard desserts & sherbets.',
      slug: 'damascus-rose-water',
      focusKeyword: 'organic damascus rose water',
      secondaryKeywords: ['kashmiri rose water distillation', 'rosa damascena culinary', 'floral gastronomy'],
      canonicalUrl: '/botanicals/damascus-rose-water',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Damascus Rose Hydro-Distillation & Floral Gastronomy',
      ogDescription: 'Copper alembic distillation of pre-dawn Kashmiri roses for elevated desserts.',
      ogImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  },
  {
    id: 'bot-nagori-methi',
    slug: 'nagori-fenugreek-leaves',
    name: 'Nagori Sun-Cured Kasuri Methi (Fenugreek)',
    botanicalName: 'Trigonella foenum-graecum',
    origin: 'Nagaur, Rajasthan',
    elevation: '1,000 Feet (Arid desert terroir)',
    harvestSeason: 'Winter Harvest (January - March)',
    sensoryProfile: 'Toasted maple, bittersweet walnut, warm hay aroma, rich gravy emulsifier',
    chemicalCompounds: ['Sotolon (maple aroma)', 'Trigonelline', '4-Hydroxyisoleucine'],
    culinaryUsage: 'Crushed between palms over Butter Chicken Grand Reserve, Dal Bukhara, and Paneer Lababdar.',
    curatedDishes: [
      { name: 'Smoked Butter Chicken Grand Reserve', url: '/menu/mains/smoked-butter-chicken-reserve' },
      { name: 'Paneer Lababdar Heirloom Tomato', url: '/menu/mains/paneer-lababdar-heirloom-tomato' }
    ],
    history: 'Sun-dried on clean muslin sheets in the dry desert breezes of Nagaur, developing legendary aroma concentration.',
    sourcingEthics: 'Small-batch heritage farmer harvest with zero artificial drying or sulfur treatment.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    seo: {
      seoTitle: 'Nagori Kasuri Methi Fenugreek Terroir Guide | Saffron & Sage',
      metaDescription: 'Explore authentic sun-cured Nagori fenugreek leaves (kasuri methi). Sotolon chemistry, aroma profiles, and royal curry finishes.',
      slug: 'nagori-fenugreek-leaves',
      focusKeyword: 'nagori kasuri methi',
      secondaryKeywords: ['fenugreek aroma sotolon', 'royal butter chicken spices', 'sun cured kasuri methi'],
      canonicalUrl: '/botanicals/nagori-fenugreek-leaves',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Nagori Kasuri Methi | Desert Terroir & Fenugreek Science',
      ogDescription: 'Sun-cured desert fenugreek leaves that provide the aromatic backbone of Michelin-level butter gravies.',
      ogImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Article',
      searchIntent: 'Informational'
    }
  }
];
