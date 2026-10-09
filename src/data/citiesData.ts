export interface CityCateringData {
  slug: string;
  name: string;
  region: string;
  country: string;
  heroImage: string;
  guestCountCapacity: string;
  popularVenues: string[];
  localHighlights: string;
  privateSommelierService: boolean;
  liveTandoorAvailable: boolean;
  faqList: { q: string; a: string }[];
}

export const CITIES_DATA: Record<string, CityCateringData> = {
  'new-york': {
    slug: 'new-york',
    name: 'New York City',
    region: 'NY',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 500+ Guests',
    popularVenues: ['Manhattan Rooftop Salons', 'The Glasshouses Chelsea', 'Brooklyn Navy Yard Lofts', 'Hudson Yards Private Galleries'],
    localHighlights: 'Rapid temperature-controlled delivery vans across Manhattan, Brooklyn, and Tri-State with white-glove sommelier service and live saffron carving carts.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'How far in advance should we book artisanal catering in NYC?', a: 'For prime weekend dates and luxury corporate galas in Manhattan, we recommend reserving 4 to 8 weeks in advance.' },
      { q: 'Can Saffron & Sage accommodate gluten-free and vegan guests in New York?', a: 'Yes, over 70% of our Himalayan culinary menu is naturally gluten-free or can be customized with separate vegan prep stations.' }
    ]
  },
  'manhattan': {
    slug: 'manhattan',
    name: 'Manhattan & Tribeca',
    region: 'NY',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '15 to 300 Guests',
    popularVenues: ['Tribeca Penthouse Terraces', 'Upper East Side Townhomes', 'SoHo Art Foundations'],
    localHighlights: 'VIP penthouse dining with personal executive chefs, copper tandoor stations, and Grand Cru Bordeaux vintage pairings.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you provide private chefs for Upper East Side and Tribeca residences?', a: 'Yes, our Michelin-trained culinary team arrives on-site with all necessary tableware, vintage decanters, and fresh ingredients.' }
    ]
  },
  'brooklyn': {
    slug: 'brooklyn',
    name: 'Brooklyn & DUMBO',
    region: 'NY',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '30 to 450 Guests',
    popularVenues: ['DUMBO Waterfront Lofts', 'Greenpoint Historical Warehouses', 'Williamsburg Rooftops'],
    localHighlights: 'Modern artisanal banquets paired with craft botanical elixirs, live flatbread baking, and wood-fired tandoor carts.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you cater waterfront wedding receptions in Brooklyn?', a: 'We specialize in waterfront wedding receptions with comprehensive bar, food, and staffing support.' }
    ]
  },
  'london': {
    slug: 'london',
    name: 'London Metropolitan',
    region: 'Greater London',
    country: 'United Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 500+ Guests',
    popularVenues: ['Mayfair Private Mansions', 'Kensington Palace Gardens', 'Covent Garden Atriums'],
    localHighlights: 'Refined royal Kashmiri banqueting with British seasonal pasture-raised meats and sommelier wine cellaring.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Are your London catering menus certified Halal?', a: 'Yes, all our pasture-raised lamb and poultry cuts adhere strictly to certified halal sourcing and separate preparation.' }
    ]
  },
  'mayfair': {
    slug: 'mayfair',
    name: 'Mayfair & Belgravia',
    region: 'London',
    country: 'United Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '12 to 200 Guests',
    popularVenues: ['Berkeley Square Private Salons', 'Grosvenor Square Townhouses', 'Belgravia Mews Residences'],
    localHighlights: 'Ultra-exclusive private dining service featuring 24K Gold Saffron dishes and rare Burgundy Premier Cru allocations.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you offer discrete non-disclosure catering for high-profile clients in Mayfair?', a: 'Yes, our entire hospitality and culinary brigade operates under strict confidentiality protocols.' }
    ]
  },
  'kensington': {
    slug: 'kensington',
    name: 'Kensington & Chelsea',
    region: 'London',
    country: 'United Kingdom',
    heroImage: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 350 Guests',
    popularVenues: ['Chelsea Old Town Hall', 'Kensington Roof Gardens', 'Holland Park Private Pavilions'],
    localHighlights: 'Botanical garden banquets, heirloom saffron tea ceremonies, and 7-course tasting menus for diplomats and private collectors.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you provide floral tablescaping and cutlery matching the saffron aesthetic?', a: 'Yes, our luxury event styling team supplies custom gold-rimmed porcelain, linen, and hand-blown glassware.' }
    ]
  },
  'islamabad': {
    slug: 'islamabad',
    name: 'Islamabad Federal Capital',
    region: 'ICT',
    country: 'Pakistan',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '30 to 800+ Guests',
    popularVenues: ['Diplomatic Enclave Residences', 'F-6 / F-7 Markaz Terraces', 'Margalla Ridge Private Pavilions'],
    localHighlights: 'Opulent royal saffron feasts, live charcoal barbecue stations, clay-pot Shinwari karahi, and scenic hilltop pavilions.',
    privateSommelierService: false,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you offer on-site catering across Islamabad and Diplomatic Enclave?', a: 'Yes, our culinary brigade provides full on-site live BBQ, clay handi stations, and luxury banquet presentation.' }
    ]
  },
  'rawalpindi': {
    slug: 'rawalpindi',
    name: 'Rawalpindi & Bahria Town',
    region: 'Punjab',
    country: 'Pakistan',
    heroImage: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 500 Guests',
    popularVenues: ['Bahria Town Banquets', 'DHA Phase 2 Lawns', 'Saddar Executive Mansions'],
    localHighlights: 'Executive wedding banquets, VIP corporate dinners, and live seekh kebab and sajji charcoal stations.',
    privateSommelierService: false,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'How quickly can you organize an executive banquet in Rawalpindi?', a: 'With 48 hours notice, our mobile banquet team can mobilize full bespoke banqueting across the Twin Cities.' }
    ]
  },
  'murree': {
    slug: 'murree',
    name: 'Murree & Bhurban Hills',
    region: 'Punjab',
    country: 'Pakistan',
    heroImage: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 600 Guests',
    popularVenues: ['Bhurban Private Chalets', 'Mall Road Historical Estates', 'Patriata Pine Lodges'],
    localHighlights: 'Mountain pine-smoke charcoal barbecue, piping hot mutton karahi, and high-altitude tea & kahwa ceremonies.',
    privateSommelierService: false,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you cater private retreats and family celebrations in Murree?', a: 'Yes, we provide full thermal-insulated transportation and live on-site chefs for hill-station private retreats.' }
    ]
  },
  'beverly-hills': {
    slug: 'beverly-hills',
    name: 'Beverly Hills & Bel Air',
    region: 'CA',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 400 Guests',
    popularVenues: ['Rodeo Drive Private Rooftops', 'Bel Air Estate Lawns', 'Beverly Hills Historic Villas'],
    localHighlights: 'Hollywood awards season dinners, clean organic saffron creations, and biodynamic Napa Valley cellar pairings.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you cater Hollywood awards season after-parties in Beverly Hills?', a: 'Yes, we are a preferred culinary partner for film studio galas, VIP greenrooms, and private estate parties.' }
    ]
  },
  'los-angeles': {
    slug: 'los-angeles',
    name: 'Los Angeles Metropolitan',
    region: 'CA',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '30 to 600 Guests',
    popularVenues: ['Malibu Cliffside Estates', 'DTLA Industrial Lofts', 'Santa Monica Beach Clubs'],
    localHighlights: 'Coastal fine dining, wood-fired avocado chaat stations, and organic Californian produce infused with Kashmiri aromatics.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you provide plant-based tasting menus for Los Angeles events?', a: 'Yes, we offer fully vegan and plant-forward 5-course degustation experiences.' }
    ]
  },
  'san-francisco': {
    slug: 'san-francisco',
    name: 'San Francisco & Silicon Valley',
    region: 'CA',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 450+ Guests',
    popularVenues: ['Presidio Officers Club', 'Napa Valley Vineyards', 'Silicon Valley Tech Campuses'],
    localHighlights: 'Organic farm-to-table saffron pairings with Northern California produce and boutique vineyard wine selections.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you offer corporate tech campus catering in San Francisco?', a: 'Yes, we provide recurring executive dining, product launch catering, and full-service banquet operations across the Bay Area.' }
    ]
  },
  'chicago': {
    slug: 'chicago',
    name: 'Chicago Metropolitan',
    region: 'IL',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '30 to 600+ Guests',
    popularVenues: ['West Loop Historic Warehouses', 'Lincoln Park Conservatories', 'Michigan Avenue Ballrooms'],
    localHighlights: 'Hearty slow-simmered Kashmiri lamb shanks, clay tandoor banquets, and winter warming saffron teas.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you cater winter indoor events in Chicago?', a: 'Our custom thermal banquet carts ensure all biryanis and clay-tandoor dishes remain piping hot upon arrival.' }
    ]
  },
  'austin': {
    slug: 'austin',
    name: 'Austin',
    region: 'TX',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 400+ Guests',
    popularVenues: ['Hill Country Ranches', 'Downtown Austin Event Spaces', 'East Austin Studios'],
    localHighlights: 'Live hardwood charcoal tandoor grilling stations and smoky Kashmiri BBQ fusion for outdoor receptions.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you provide live cooking stations for Austin outdoor weddings?', a: 'Yes, our mobile charcoal tandoor carts bring live naan baking and smoky kebab grilling directly to your venue.' }
    ]
  },
  'miami': {
    slug: 'miami',
    name: 'Miami & South Beach',
    region: 'FL',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 550 Guests',
    popularVenues: ['Star Island Private Docks', 'Brickell Rooftop Lounges', 'Design District Art Atriums'],
    localHighlights: 'Tropical coastal spice infusions, Chilean sea bass moilee, chilled saffron elixirs, and poolside luxury catering.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you provide outdoor poolside catering in Miami?', a: 'Yes, we are equipped for open-air beachfront and poolside banquet service with chilled botanical cocktail bars.' }
    ]
  },
  'toronto': {
    slug: 'toronto',
    name: 'Toronto & Yorkville',
    region: 'ON',
    country: 'Canada',
    heroImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 450 Guests',
    popularVenues: ['Yorkville Private Salons', 'Distillery District Historic Venues', 'King West Rooftops'],
    localHighlights: 'Multi-cultural gourmet banquets, Ontario farm lamb reductions, and winter truffle kulcha service.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you handle full-service wedding receptions across the GTA?', a: 'Yes, we provide full culinary brigades, bar staff, and equipment rentals throughout the Greater Toronto Area.' }
    ]
  },
  'paris': {
    slug: 'paris',
    name: 'Paris & Île-de-France',
    region: 'Île-de-France',
    country: 'France',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '15 to 300 Guests',
    popularVenues: ['Hôtel Particulier 8th Arrondissement', 'Seine River Luxury Barges', 'Marais Art Galleries'],
    localHighlights: 'French haute gastronomy techniques intertwined with ancestral Kashmiri spice braising and Grand Cru Champagne service.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you provide French-speaking sommeliers for Parisian dinners?', a: 'Our European team includes certified French sommeliers fluent in English and French.' }
    ]
  },
  'singapore': {
    slug: 'singapore',
    name: 'Singapore',
    region: 'Central Region',
    country: 'Singapore',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 500 Guests',
    popularVenues: ['Marina Bay Penthouse Suites', 'Sentosa Cove Waterfront Villas', 'Dempsey Hill Colonial Bungalows'],
    localHighlights: 'Peranakan and Himalayan spice convergence, Breton blue lobster feasts, and tropical saffron elixirs.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Are your Singapore banquets compliant with Halal dietary standards?', a: 'All chicken and lamb cuts in Singapore are sourced from certified Halal abattoirs with dedicated prep.' }
    ]
  },
  'tokyo': {
    slug: 'tokyo',
    name: 'Tokyo',
    region: 'Kanto',
    country: 'Japan',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '10 to 250 Guests',
    popularVenues: ['Ginza Private Dining Salons', 'Roppongi Hills Sky Lounges', 'Omotesando Design Studios'],
    localHighlights: 'A5 Miyazaki Wagyu Dum Pukht, Hokkaido scallops with Pampore saffron, and Japanese fine dining precision.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you pair rare Japanese sake with your saffron tasting menus?', a: 'Yes, our sake sommelier pairs Junmai Daiginjo vintages alongside Kashmiri spice creations.' }
    ]
  },
  'sydney': {
    slug: 'sydney',
    name: 'Sydney & New South Wales',
    region: 'NSW',
    country: 'Australia',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '25 to 500 Guests',
    popularVenues: ['Sydney Harbour Waterfront Mansions', 'Barangaroo Rooftop Salons', 'Hunter Valley Estates'],
    localHighlights: 'Coastal Australian seafood, Tasmanian lamb rogan josh, and Penfolds Grange vintage sommelier pairings.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you cater private yacht dinners on Sydney Harbour?', a: 'Yes, we provide specialized marine catering for chartered superyachts cruising Sydney Harbour.' }
    ]
  },
  'doha': {
    slug: 'doha',
    name: 'Doha & The Pearl',
    region: 'Ad Dawhah',
    country: 'Qatar',
    heroImage: 'https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '30 to 700 Guests',
    popularVenues: ['The Pearl Waterfront Palaces', 'Lusail Executive Towers', 'Katara Cultural Village Salons'],
    localHighlights: 'Grand Arabian Gulf royal banquets, whole roasted saffron lamb, and 24K gold dessert centerpieces.',
    privateSommelierService: false,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you cater large traditional royal majlis banquets in Doha?', a: 'Yes, we have extensive experience serving multi-table royal banquets for over 500 guests.' }
    ]
  },
  'geneva': {
    slug: 'geneva',
    name: 'Geneva & Lake Léman',
    region: 'Canton of Geneva',
    country: 'Switzerland',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '15 to 300 Guests',
    popularVenues: ['Lakefront Châteaux', 'Old Town Private Mansions', 'Cologny Diplomatic Residences'],
    localHighlights: 'Diplomatic private banquets, alpine Guchhi morel risottos, and Swiss-French cellar pairings.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you host private diplomatic dinners with security clearance in Geneva?', a: 'Our staff is experienced in diplomatic protocol, embargoed event guidelines, and state dinner security.' }
    ]
  },
  'mumbai': {
    slug: 'mumbai',
    name: 'Mumbai & South Bombay',
    region: 'Maharashtra',
    country: 'India',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '50 to 1000+ Guests',
    popularVenues: ['Colaba Seafront Mansions', 'Bandra Kurla Complex Galas', 'Alibaug Waterfront Estates'],
    localHighlights: 'Grand ancestral Kashmiri Wazwan feasts, Awadhi dum pukht biryanis, and live charcoal tandoor brigades.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you cater multi-day destination weddings in Mumbai and Alibaug?', a: 'Yes, our master Wazwan and modern culinary teams manage entire 3-to-5 day royal wedding banquets.' }
    ]
  },
  'boston': {
    slug: 'boston',
    name: 'Boston & Beacon Hill',
    region: 'MA',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 350 Guests',
    popularVenues: ['Beacon Hill Historic Mansions', 'Seaport District Rooftops', 'Back Bay Private Clubs'],
    localHighlights: 'New England seafood infused with saffron bisque, academic faculty banquets, and autumn warming spiced braises.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Can you provide private dining for university and institutional banquets in Boston?', a: 'Yes, we frequently partner with Harvard, MIT, and corporate institutions for luxury private dinners.' }
    ]
  },
  'seattle': {
    slug: 'seattle',
    name: 'Seattle & Pacific Northwest',
    region: 'WA',
    country: 'USA',
    heroImage: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=1200&q=80',
    guestCountCapacity: '20 to 400 Guests',
    popularVenues: ['Puget Sound Waterfront Homes', 'Pioneer Square Loft Spaces', 'Woodinville Wine Country'],
    localHighlights: 'Wild Pacific Northwest salmon with saffron moilee sauce, foraged morel dishes, and local biodynamic wines.',
    privateSommelierService: true,
    liveTandoorAvailable: true,
    faqList: [
      { q: 'Do you incorporate local Washington State mushrooms and seafood?', a: 'Yes, we combine regional wild ingredients with our single-origin Kashmiri spices.' }
    ]
  }
};
