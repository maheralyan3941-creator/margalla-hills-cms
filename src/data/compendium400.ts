// ============================================================================
// 400 CULINARY CHAPTERS COMPENDIUM - SAFFRON & SAGE
// 400 Full Distinct Gastronomic Pages & Continuous Scrolling Archives
// ============================================================================

export interface CompendiumItem {
  pageNumber: number;
  id: string;
  title: string;
  category: 'Artisanal Gastronomy' | 'Sommelier Cellar' | 'Sacred Botanicals' | 'Royal Global Catering' | 'Chef Degustation Masterclass';
  subheading: string;
  description: string;
  originRegion: string;
  pairing: string;
  price: string;
  image: string;
  tags: string[];
}

const LUXURY_IMAGES = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80'
];

const DISH_CORE_NAMES = [
  'Pampore Saffron Infused Biryani with Gold Leaf',
  'Slow-Braised 48-Hour Wagyu Shank Nihari',
  'Smoked Himalayan Morel Truffle Dumplings',
  'Charcoal Roasted Royal Poussin in Mace & Cardamom',
  'Wild Scottish Langoustines in Saffron Bisque',
  'Wood-Fired Kashmiri Claypot Kokur Korma',
  'Persian Barberry & Pistachio Crusted Duck Breast',
  'Handmade Saffron Sheermal with Cultured A2 Butter',
  'Subterranean Dry-Aged Venison with Juniper Emulsion',
  'Pan-Seared Line-Caught Turbot with Fermented Citrus',
  'Heritage Black Lentil Dal simmered for 36 Hours',
  'Himalayan Pine Nut Risotto with Aged Parmesan Foam',
  'Royal Saffron Pistachio Kulfi with Rose Petal Snow',
  'Smoked Aubergine Bharta with Charred Shallots & Ghee',
  'Pan-Roasted Quail with Pomegranate Molasses Glaze',
  'Caramelized White Chocolate & Saffron Ganache Tart'
];

const WINE_CORE_NAMES = [
  'Domaine de la Romanée-Conti Grand Cru 2017 Allocation',
  'Château Margaux Premier Grand Cru Classé 2010 Vintage',
  'Tenuta San Guido Sassicaia Bolgheri 2016 Reserve',
  'Vega Sicilia Único Ribera del Duero 2011 Magnum',
  'Château dYquem Sauternes Premier Cru Supérieur 2015',
  'Dom Pérignon P2 Plénitude Brut Rosé 2004',
  'Gaja Barbaresco Sorì San Lorenzo 2015 Piedmont',
  'Krug Clos dAmbonnay Blanc de Noirs Brut 2002',
  'Penfolds Grange Bin 95 Shiraz 2014 South Australia',
  'Opus One Oakville Napa Valley Cabernet Blend 2018',
  'Louis Roederer Cristal Millésimé 2013 Champagne',
  'Egon Müller Scharzhofberger Riesling Auslese 2017'
];

const BOTANICAL_CORE_NAMES = [
  'Triple-Inspected Grade-A Pampore Red Gold Saffron',
  'Sun-Dried Black Cardamom from Sikkim Forest High Valleys',
  'Smoked Kashmiri Kashmiri Chili Threads',
  'Wild Forest Mace Arils from Kerala Foothills',
  'Aromatic Damascus Rose Distillate & Hydro-Sol',
  'Green Cardamom Pods from Alleppey Spice Highlands',
  'High-Altitude Himalayan Juniper Berries',
  'Aged Ceylon Cinnamon Quills from Galle Plantations',
  'Hand-Harvested Persian Wild Dried Sumac Berries',
  'Organic Persian Fenugreek Leaves & Dried Citrus',
  'Cold-Extracted Sandalwood & Amber Essence Blend',
  'Wild Foraged Morel Mushrooms from Pir Panjal Range'
];

const CITY_CATERING_NAMES = [
  'Manhattan Central Park Penthouse Gala Catering',
  'Mayfair & Knightsbridge London Diplomatic Banquet',
  'Margalla Hills Pine Ridge Open-Air Sky Lounge Banquet',
  'Beverly Hills Bel Air Celebrity Estate Soirée',
  'Parisian 8th Arrondissement Haute Gastronomy Feast',
  'Tokyo Ginza High-Roller Private Salon Banquet',
  'Singapore Marina Bay Sands Sovereign Dinner',
  'Monaco Port Hercules Superyacht Saffron Service',
  'Zurich Paradeplatz Private Banking Summit Dinner',
  'Milan Via Montenapoleone Fashion Week Catering',
  'Hong Kong Victoria Peak Executive Tasting Soirée',
  'Riyadh Al Diriyah Royal Wedding Saffron Catering',
  'Sydney Harbour Sovereign Dining Pavillion Event',
  'Chicago Gold Coast Private Cellar Degustation',
  'Toronto Yorkville Heritage Gastronomy Banquet',
  'Doha The Pearl VIP Imperial Saffron Dining Service'
];

const CHEF_TECHNIQUES = [
  'Master Degustation: 14-Hour Copper Degh Steam Infusion',
  'Chef Sterling Secret: Cryo-Freezing Pampore Saffron Stigmas',
  'Cellar Alchemy: Ultrasonic Saffron Decanting Process',
  'Wood-Fired Technique: Sheesham Charcoal Embers Roasting',
  'Fermentation Lab: 90-Day Lacto-Fermented Spiced Plums',
  'Pastry Atelier: 24-Karat Hand-Applied Gold Leaf Confection',
  'Emulsion Science: Bone Marrow & Saffron Velouté Clarification',
  'Aromatics: Rosewood Smoke Cloche Presentation at Table'
];

const REGIONS = [
  'Pampore, Kashmir Valley',
  'Bordeaux, France',
  'Bhakkar, Punjab',
  'Kyoto, Japan',
  'Piedmont, Italy',
  'Mayfair, London',
  'Manhattan, New York',
  'Damascus, Syria',
  'Ribera del Duero, Spain',
  'Oaxaca, Mexico',
  'Highland Himalayas',
  'Napa Valley, California',
  'Margalla National Park Ridgeline',
  'Reims, Champagne'
];

export function generate400Compendium(): CompendiumItem[] {
  const items: CompendiumItem[] = [];

  for (let page = 1; page <= 400; page++) {
    const categoryIndex = (page - 1) % 5;
    let category: CompendiumItem['category'];
    let title = '';
    let subheading = '';
    let description = '';
    let pairing = '';
    let price = '$45';
    let region = REGIONS[(page * 3) % REGIONS.length];

    if (categoryIndex === 0) {
      category = 'Artisanal Gastronomy';
      const dish = DISH_CORE_NAMES[(page - 1) % DISH_CORE_NAMES.length];
      title = `Chapter ${page}: ${dish}`;
      subheading = 'Signature Pampore Saffron & Claypot Gastronomy';
      description = `Crafted under Chapter ${page} standards, this dish marries centuries-old Mogul royal cooking techniques with modern Michelin-level precision, simmered gently in heritage earthenware pots.`;
      pairing = 'Paired with 2015 Premier Cru Bordeaux or Organic Saffron Cardamom Elixir';
      price = `$${38 + ((page * 7) % 65)}`;
    } else if (categoryIndex === 1) {
      category = 'Sommelier Cellar';
      const wine = WINE_CORE_NAMES[(page - 1) % WINE_CORE_NAMES.length];
      title = `Chapter ${page}: ${wine}`;
      subheading = 'Subterranean Vault Allocation & Vintage Sommelier Selection';
      description = `Archived in our temperature-controlled 800-bottle cellar, this rare bottle showcases extraordinary terroir character with velvet tannins, subtle spice, and lingering minerality.`;
      pairing = 'Exclusively paired with slow-braised cuts and aged sheep’s milk cheeses';
      price = `$${120 + ((page * 19) % 380)}`;
    } else if (categoryIndex === 2) {
      category = 'Sacred Botanicals';
      const spice = BOTANICAL_CORE_NAMES[(page - 1) % BOTANICAL_CORE_NAMES.length];
      title = `Chapter ${page}: ${spice}`;
      subheading = 'Single-Origin Terroir & Botanical Alchemy Archive';
      description = `Documented in Chapter ${page} of our spice compendium, this botanical element is sustainably sourced from family co-operatives and preserved in airtight violet glass to retain volatile essential oils.`;
      pairing = 'Integral to our 7-course degustation reductions and bespoke zero-proof infusions';
      price = `$${25 + ((page * 5) % 45)}`;
    } else if (categoryIndex === 3) {
      category = 'Royal Global Catering';
      const city = CITY_CATERING_NAMES[(page - 1) % CITY_CATERING_NAMES.length];
      title = `Chapter ${page}: ${city}`;
      subheading = 'Full-Service Artisanal Banquet & Private Flight Catering';
      description = `Serving high-net-worth galas, diplomatic gatherings, and intimate family milestone dinners with on-site master chefs, silver cloche service, and complete bespoke tabletop styling.`;
      pairing = 'Includes custom paired sommelier flight and bespoke printed menu cards';
      price = `$${175 + ((page * 23) % 450)} / guest`;
    } else {
      category = 'Chef Degustation Masterclass';
      const tech = CHEF_TECHNIQUES[(page - 1) % CHEF_TECHNIQUES.length];
      title = `Chapter ${page}: ${tech}`;
      subheading = 'Executive Chef Marcus Sterling Culinary Philosophy';
      description = `An intricate study in sensory elevation: combining exact thermal precision with ancestral wisdom to draw out the floral crocin compounds from Pampore saffron stigmas.`;
      pairing = 'Tasted during the 9th course of our Symphony of Pampore Degustation';
      price = `$${85 + ((page * 11) % 110)}`;
    }

    const image = LUXURY_IMAGES[(page - 1) % LUXURY_IMAGES.length];

    items.push({
      pageNumber: page,
      id: `chapter-${page}`,
      title,
      category,
      subheading,
      description,
      originRegion: region,
      pairing,
      price,
      image,
      tags: [category, region.split(',')[0], 'Chapter ' + page, 'Direct WhatsApp Order']
    });
  }

  return items;
}

export const COMPENDIUM_400_ITEMS = generate400Compendium();
