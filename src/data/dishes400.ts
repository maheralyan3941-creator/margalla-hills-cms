import { MenuItem, MenuCategory } from '../types';

export const ALL_CATEGORIES: MenuCategory[] = [
  {
    id: 'cat-deals',
    name: '🔥 Special Deals & Combos',
    slug: 'deals',
    description: 'Chef crafted super-saver family, couple, and solo feast deals — all guaranteed under $15!',
    displayOrder: 1
  },
  {
    id: 'cat-karahi',
    name: '🥘 Desi Karahi & Handi',
    slug: 'karahi',
    description: 'Fresh mutton, chicken, and beef karahis simmered in clay pots with ginger, green chilies, and pure butter.',
    displayOrder: 2
  },
  {
    id: 'cat-bbq',
    name: '🍢 Live Charcoal BBQ & Grills',
    slug: 'bbq',
    description: 'Tender skewers, spicy boti, malai tikka, and succulent seekh kebabs grilled live over olive-wood coals.',
    displayOrder: 3
  },
  {
    id: 'cat-biryani',
    name: '🍚 Biryani, Pulao & Rice',
    slug: 'biryani',
    description: 'Fragrant aged Himalayan basmati rice layered with slow-cooked meat, saffron, and whole spices.',
    displayOrder: 4
  },
  {
    id: 'cat-starters',
    name: '🥟 Starters, Soups & Appetizers',
    slug: 'starters',
    description: 'Crispy finger bites, hot and sour soups, tandoori wings, and fresh botanical salads.',
    displayOrder: 5
  },
  {
    id: 'cat-burgers',
    name: '🍔 Gourmet Burgers & Sandwiches',
    slug: 'burgers',
    description: 'Crispy zinger chicken, smashed beef patties, club sandwiches, and loaded gourmet wraps.',
    displayOrder: 6
  },
  {
    id: 'cat-pizzas',
    name: '🍕 Wood-Fired & Stone-Baked Pizzas',
    slug: 'pizzas',
    description: 'Hand-tossed artisan dough with rich marinara, imported mozzarella, and savory toppings.',
    displayOrder: 7
  },
  {
    id: 'cat-steaks',
    name: '🥩 Sizzling Steaks & Pastas',
    slug: 'steaks',
    description: 'Tender beef and chicken steaks with black pepper sauce, plus creamy fettuccine and penne pastas.',
    displayOrder: 8
  },
  {
    id: 'cat-chinese',
    name: '🥢 Chinese & Pan-Asian Wok',
    slug: 'chinese',
    description: 'Fiery wok-tossed chowmein, crispy chicken manchurian, szechuan bowls, and steamed dumplings.',
    displayOrder: 9
  },
  {
    id: 'cat-breads',
    name: '🫓 Fresh Tandoori Naans & Rotis',
    slug: 'breads',
    description: 'Hot out of the tandoor — garlic naan, roghani naan, kalonji roti, and cheese-stuffed bread.',
    displayOrder: 10
  },
  {
    id: 'cat-desserts',
    name: '🍨 Desserts & Sweet Delights',
    slug: 'desserts',
    description: 'Warm gulab jamun, pistachio kulfi, sizzling brownie, and saffron infused kheer.',
    displayOrder: 11
  },
  {
    id: 'cat-beverages',
    name: '🍹 Mocktails, Kehwa & Shakes',
    slug: 'beverages',
    description: 'Peshawari green kehwa, minted lemonade, seasonal fruit smoothies, and traditional sweet lassi.',
    displayOrder: 12
  }
];

// Helper to generate slug
const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface RawDish {
  name: string;
  category: string;
  price: number; // strictly <= 15
  description: string;
  ingredients: string[];
  dietary?: ('halal' | 'chef_special' | 'spicy' | 'vegetarian' | 'gluten_free')[];
  image: string;
}

const RAW_DEALS: RawDish[] = [
  {
    name: 'Margalla Hillside Sunset Feast Deal',
    category: 'deals',
    price: 14.50,
    description: 'Half Chicken Karahi + 2 Seekh Kebabs + 2 Roghani Naans + Fresh Mint Raita + Salad. Perfect couple dinner!',
    ingredients: ['Chicken Karahi', 'Seekh Kebab', 'Roghani Naan', 'Mint Raita', 'Salad'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Solo Executive Burger Combo',
    category: 'deals',
    price: 7.99,
    description: 'Crispy Double Zinger Burger + Large French Fries + Chilled Soft Drink + Garlic Mayo Dip.',
    ingredients: ['Crispy Chicken Fillet', 'Sesame Bun', 'Potato Fries', 'Garlic Mayo', 'Soft Drink'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'BBQ Lovers Mega Platter Deal',
    category: 'deals',
    price: 13.99,
    description: '4pcs Chicken Malai Boti + 2 Beef Seekh Kebabs + 1 Chicken Tikka Quarter + 2 Tandoori Parathas + Chutney.',
    ingredients: ['Malai Boti', 'Beef Seekh Kebab', 'Chicken Tikka', 'Paratha', 'Plum Chutney'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Family Stone-Baked Pizza Feast',
    category: 'deals',
    price: 14.99,
    description: '13-Inch Large Chicken Fajita Pizza + 6pcs Crispy Spicy Wings + 1.5L Soft Drink + Dip.',
    ingredients: ['Pizza Crust', 'Mozzarella', 'Fajita Chicken', 'Hot Wings', 'Dip Sauce'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Royal Biryani & Tikka Duo Deal',
    category: 'deals',
    price: 11.50,
    description: 'Full Matka Dum Biryani + 1 Quarter Chicken Tikka + Fresh Raita + Shami Kebab + Cold Drink.',
    ingredients: ['Basmati Rice', 'Chicken Tikka', 'Shami Kebab', 'Mint Raita', 'Beverage'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Pan-Asian Wok Lovers Combo',
    category: 'deals',
    price: 12.00,
    description: 'Chicken Manchurian Gravy + Egg Fried Rice Bowl + Chicken Chowmein Plate + 2 Spring Rolls.',
    ingredients: ['Chicken Manchurian', 'Egg Fried Rice', 'Noodles Chowmein', 'Vegetable Rolls'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Student Pocket Friendly Lunch Deal',
    category: 'deals',
    price: 4.99,
    description: 'Chicken Tikka Garlic Mayo Paratha Roll + French Fries Box + 250ml Chilled Soda.',
    ingredients: ['Tikka Paratha Roll', 'Fries', 'Garlic Mayo', 'Soft Drink'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mutton Shinwari Quick Treat',
    category: 'deals',
    price: 14.99,
    description: 'Single Portion Fresh Mutton Shinwari Karahi (pure salt, fat & green chilies) + 2 Tandoori Rotis + Kehwa.',
    ingredients: ['Fresh Mutton', 'Green Chilies', 'Black Pepper', 'Tandoori Roti', 'Peshawari Kehwa'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sizzling Pepper Steak Combo',
    category: 'deals',
    price: 13.50,
    description: 'Tender Grilled Chicken Steak with Cracked Black Pepper Sauce + Mashed Potatoes + Sauteed Veggies + Drink.',
    ingredients: ['Chicken Breast Steak', 'Pepper Sauce', 'Mashed Potato', 'Veggies', 'Drink'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Desi Nashta Sunday Brunch Deal',
    category: 'deals',
    price: 6.50,
    description: '3 Fresh Puris + Shahi Halwa + Spiced Lahori Chana + Achar + 1 Cup Hot Karak Kashmiri Chai.',
    ingredients: ['Crispy Puris', 'Suji Halwa', 'Lahori Chana', 'Pickle', 'Kashmiri Chai'],
    dietary: ['vegetarian', 'halal'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Crispy Broast Dinner Deal',
    category: 'deals',
    price: 8.50,
    description: '2pcs Golden Crispy Fried Chicken Broast + Butter Bun + Fries + Coleslaw + Signature Spicy Dip.',
    ingredients: ['Fried Chicken', 'Butter Bun', 'Coleslaw', 'Fries', 'Chili Garlic Dip'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Charcoal Sajji Hillside Special',
    category: 'deals',
    price: 14.80,
    description: 'Half Chicken Balochi Sajji stuffed with seasoned rice, served with raita and mint chutney.',
    ingredients: ['Whole Sajji Chicken', 'Spiced Rice', 'Lemon Pepper Rub', 'Mint Chutney'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cheese Lover Burger Duo',
    category: 'deals',
    price: 9.99,
    description: '2 Single Gourmet Cheese Burgers (Smash Beef or Crispy Chicken) + Loaded Cheese Fries + 2 Drinks.',
    ingredients: ['Beef/Chicken Patty', 'Cheddar Cheese', 'Brioche Bun', 'Cheese Fries', 'Soft Drinks'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Szechuan Dragon Feast Deal',
    category: 'deals',
    price: 12.99,
    description: 'Spicy Dragon Chicken + Garlic Butter Rice + 4 Crispy Fried Dumplings + 2 Cold Teas.',
    ingredients: ['Dragon Chicken', 'Garlic Rice', 'Crispy Dumplings', 'Iced Tea'],
    dietary: ['spicy', 'halal'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Twin Hillside Pizza Deal',
    category: 'deals',
    price: 14.00,
    description: 'Two 10-Inch Medium Pizzas (Choose Tikka & Pepperoni) + Garlic Bread Slices + 1L Soft Drink.',
    ingredients: ['Medium Pizzas', 'Garlic Bread', 'Mozzarella', 'Soft Drink'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fettuccine Alfredo & Wings Combo',
    category: 'deals',
    price: 11.99,
    description: 'Creamy Parmesan Fettuccine Alfredo with Grilled Chicken Strips + 4 Buffalo Wings + Garlic Bread.',
    ingredients: ['Fettuccine Pasta', 'Parmesan Cream', 'Grilled Chicken', 'Buffalo Wings'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kababish Family Box',
    category: 'deals',
    price: 14.20,
    description: '6pcs Reshmi Kebabs + 4pcs Bihari Boti + 3 Roghani Naans + Zeera Raita + Salad.',
    ingredients: ['Reshmi Kebab', 'Bihari Boti', 'Roghani Naan', 'Zeera Raita'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Butter Chicken & Garlic Naan Feast',
    category: 'deals',
    price: 10.99,
    description: 'Creamy Velvety Murgh Makhani Butter Chicken + 2 Fresh Garlic Naans + Jeera Rice Bowl.',
    ingredients: ['Tandoori Chicken', 'Tomato Butter Cream', 'Garlic Naan', 'Jeera Rice'],
    dietary: ['chef_special', 'halal'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sunset Chai & Samosa High-Tea Deal',
    category: 'deals',
    price: 5.50,
    description: '4 Gourmet Crispy Beef/Veg Samosas + Mint & Plum Chutneys + 2 Cups Mountain Cardamom Kehwa/Tea.',
    ingredients: ['Crispy Samosa', 'Chutneys', 'Cardamom Tea', 'Crispy Nimco'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sweet Tooth Trio Combo',
    category: 'deals',
    price: 7.50,
    description: 'Warm Chocolate Fudge Brownie with Vanilla Ice Cream + 2 Shahi Gulab Jamun + 1 Cup Cappuccino.',
    ingredients: ['Chocolate Brownie', 'Vanilla Scoop', 'Gulab Jamun', 'Cappuccino'],
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper to expand catalog into 400+ distinct menu items
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
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
  'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
];

interface GeneratorCategoryConfig {
  category: string;
  count: number;
  minPrice: number;
  maxPrice: number;
  itemBases: string[];
  styles: string[];
  accompaniments: string[];
  defaultDietary: ('halal' | 'chef_special' | 'spicy' | 'vegetarian' | 'gluten_free')[];
}

const CATEGORY_GENERATOR_CONFIGS: GeneratorCategoryConfig[] = [
  {
    category: 'karahi',
    count: 45,
    minPrice: 7.99,
    maxPrice: 14.99, // Max <= 15
    itemBases: [
      'Chicken Karahi', 'Mutton Shinwari', 'Beef Karahi', 'Chicken White Handi', 'Makhni Handi',
      'Balochi Karahi', 'Peshawari Namkeen Karahi', 'Achari Chicken Handi', 'Paneer Handi',
      'Desi Murgh Karahi', 'Charsi Karahi', 'Dum Pukht Handi', 'Kashmiri Rogan Josh Handi',
      'Methi Chicken Handi', 'Ginger Garlic Chicken Karahi', 'Black Pepper Handi'
    ],
    styles: ['Clay Pot Slow-Cooked', 'Fresh Tomato & Green Chili', 'Butter & Cream Infused', 'Charcoal Simmered', 'Wok Stirred with Ginger Julian', 'Royal Mughlai Spiced'],
    accompaniments: ['Fresh Ginger & Coriander', 'Desi Ghee Glaze', 'Roasted Cumin & Black Pepper', 'Green Chili Slices', 'Grated Paneer'],
    defaultDietary: ['halal', 'chef_special']
  },
  {
    category: 'bbq',
    count: 50,
    minPrice: 5.50,
    maxPrice: 14.50, // Max <= 15
    itemBases: [
      'Chicken Malai Boti', 'Beef Seekh Kebab', 'Chicken Seekh Kebab', 'Chicken Tikka Breast', 'Chicken Tikka Leg',
      'Mutton Chops', 'Bihari Boti Skewer', 'Reshmi Kebab', 'Afghani Boti', 'Fish Tikka',
      'Tangdi Kebab', 'Hariyali Chicken Boti', 'Kastoori Boti', 'Peshawari Chapli Kebab',
      'Sajji Half Chicken', 'Smoked Lamb Tikka', 'Charcoal Grilled Wings'
    ],
    styles: ['Live Olive-Wood Grilled', 'Yogurt & Cream Marinated', 'Papaya Tenderized', 'Clay Oven Roasted', 'Fresh Mustard Glazed', 'Crushed Pepper Spiced'],
    accompaniments: ['Mint Plum Chutney', 'Onion Rings & Lemon', 'Puri Paratha', 'Garlic Mayo', 'Roasted Green Pepper'],
    defaultDietary: ['halal']
  },
  {
    category: 'biryani',
    count: 40,
    minPrice: 4.50,
    maxPrice: 12.00, // Max <= 15
    itemBases: [
      'Kashmiri Saffron Biryani', 'Chicken Dum Biryani', 'Beef Matka Biryani', 'Mutton Yakhni Pulao',
      'Kabuli Pulao with Raisins', 'Sindhi Spicy Biryani', 'Hyderabadi Kachhi Biryani', 'Tikka Biryani',
      'Fish Biryani', 'Vegetable Dum Biryani', 'Egg Biryani', 'Paneer Tikka Biryani', 'Bihari Biryani'
    ],
    styles: ['Sealed Dough Dum Pukht', 'Golden Saffron Layered', 'Caramelized Onion & Prune Infused', 'Almond & Raisin Studded', 'Wood Fire Steamed'],
    accompaniments: ['Zeera Raita', 'Fresh Kachumber Salad', 'Crispy Fried Shallots', 'Hard Boiled Egg', 'Roasted Cashews'],
    defaultDietary: ['halal']
  },
  {
    category: 'starters',
    count: 40,
    minPrice: 2.99,
    maxPrice: 7.50, // Max <= 15
    itemBases: [
      'Hot & Sour Chicken Soup', 'Chicken Corn Soup', 'Crispy Finger Fish', 'Dynamite Prawns',
      'Chicken Spring Rolls', 'Vegetable Tempura Samosas', 'Honey BBQ Wings', 'Buffalo Hot Wings',
      'Dahi Bhalla Bowl', 'Pani Puri Shot Platter', 'Loaded Nachos with Cheese', 'Chicken Cheese Sticks',
      'Hummus with Warm Pita', 'Greek Salad with Feta', 'Russian Cream Salad'
    ],
    styles: ['Golden Crispy Fried', 'Freshly Simmered', 'Tossed in Spicy Mayo', 'Wood Hearth Toasted', 'Botanical Herb Dressed'],
    accompaniments: ['Sweet Chili Dip', 'Garlic Mayo', 'Mint Chutney', 'Crispy Tortilla Crisps', 'Lemon Wedges'],
    defaultDietary: ['halal']
  },
  {
    category: 'burgers',
    count: 35,
    minPrice: 4.50,
    maxPrice: 9.99, // Max <= 15
    itemBases: [
      'Classic Smashed Beef Burger', 'Crispy Zinger Crunch Burger', 'Double Decker Cheese Burger',
      'Mushroom Swiss Beef Burger', 'Grilled Chicken Jalapeno Burger', 'BBQ Pulled Chicken Burger',
      'Spicy Peri-Peri Burger', 'Fish Fillet Tartar Burger', 'Crispy Veggie Patty Burger',
      'Margalla Hillside Club Sandwich', 'Chicken Tikka Grilled Sandwich', 'Philly Beef Steak Sandwich'
    ],
    styles: ['Brioche Bun Toasted', 'Double Cheddar Melted', 'Crispy Panko Crusted', 'Smoked BBQ Glazed', 'Triple Deck Layered'],
    accompaniments: ['Crinkle Cut French Fries', 'Coleslaw Salad', 'Pickled Jalapenos', 'Special Secret Sauce', 'Garlic Dip'],
    defaultDietary: ['halal']
  },
  {
    category: 'pizzas',
    count: 40,
    minPrice: 6.99,
    maxPrice: 13.99, // Max <= 15
    itemBases: [
      'Chicken Fajita Pizza', 'Chicken Tikka Pizza', 'Beef Pepperoni Pizza', 'Margherita Classic',
      'BBQ Supreme Chicken Pizza', 'Four Cheese Formaggi Pizza', 'Spicy Mexican Jalapeno Pizza',
      'Smoked Sausage Delight', 'Veggie Paradise Pizza', 'Pineapple Chicken Hawaiian Pizza',
      'Cheese Stuffed Crust Pizza', 'Peri-Peri Flame Pizza'
    ],
    styles: ['Wood-Fired Stone Baked', 'Hand-Tossed Sourdough', 'Deep Dish Pan Baked', 'Thin Crust Italian', 'Double Mozzarella Layered'],
    accompaniments: ['Oregano & Red Chili Flakes', 'Garlic Herb Butter Dip', 'Ranch Sauce', 'Pickled Olives', 'Fresh Basil Leaves'],
    defaultDietary: ['halal']
  },
  {
    category: 'steaks',
    count: 35,
    minPrice: 8.99,
    maxPrice: 14.99, // Max <= 15
    itemBases: [
      'Cracked Black Pepper Chicken Steak', 'Mushroom Cream Sauce Steak', 'Sizzling Beef Tenderloin Steak',
      'Tarragon Herb Chicken Steak', 'Mexican Spicy Salsa Steak', 'Twin Medallion Sizzler',
      'Fettuccine Alfredo with Chicken', 'Penne Arrabbiata with Garlic Bread', 'Creamy Pesto Pasta',
      'Macaroni & Cheese Gratin', 'Lasagna Bolognese Baked'
    ],
    styles: ['Cast-Iron Pan Seared', 'Rich Demi-Glace Bathed', 'Al Dente Cream Tossed', 'Mozzarella Broiled', 'Sizzling Platter Served'],
    accompaniments: ['Creamy Mashed Potatoes', 'Herb Sauteed Vegetables', 'Crisp Garlic Bread', 'French Fries', 'Cracked Pepper Gravy'],
    defaultDietary: ['halal']
  },
  {
    category: 'chinese',
    count: 45,
    minPrice: 5.99,
    maxPrice: 12.99, // Max <= 15
    itemBases: [
      'Chicken Manchurian', 'Kung Pao Chicken with Peanuts', 'Szechuan Hot Chili Chicken',
      'Black Pepper Beef Slices', 'Sweet & Sour Chicken with Pineapple', 'Chicken Shashlik on Skewer',
      'Crispy Beef Chili Dry', 'Chicken Chowmein Noodles', 'Singaporean Rice Bowl',
      'Egg Fried Rice', 'Garlic Butter Wok Rice', 'Steamed Chicken Dumplings', 'Dragon Wings Wok Glazed'
    ],
    styles: ['Flaming Wok Tossed', 'Crispy Golden Glazed', 'Sesame & Ginger Infused', 'Sweet & Tangy Glazed', 'Steamed Bamboo Basket'],
    accompaniments: ['Chili Garlic Sauce', 'Soy Vinegar Dip', 'Prawn Crackers', 'Pickled Cucumber', 'Crispy Wonton Strips'],
    defaultDietary: ['halal']
  },
  {
    category: 'breads',
    count: 25,
    minPrice: 0.99,
    maxPrice: 2.50, // Max <= 15
    itemBases: [
      'Plain Tandoori Roti', 'Khamiri Roti', 'Roghani Naan with Sesame', 'Garlic Butter Naan',
      'Cheese Stuffed Naan', 'Aloo Kulcha with Cumin', 'Kalonji Black Seed Naan', 'Tandoori Paratha',
      'Laccha Butter Paratha', 'Keema Stuffed Naan', 'Besan Ki Roti'
    ],
    styles: ['Clay Tandoor Baked', 'Pure Desi Ghee Brushed', 'Toasted Sesame Crusted', 'Melted Cheddar Stuffed', 'Flaky Hand Rolled'],
    accompaniments: ['Desi Butter Pat', 'Mint Yogurt Raita', 'Mixed Achar', 'Green Chili Garnish'],
    defaultDietary: ['vegetarian', 'halal']
  },
  {
    category: 'desserts',
    count: 35,
    minPrice: 2.50,
    maxPrice: 6.99, // Max <= 15
    itemBases: [
      'Shahi Gulab Jamun (Warm with Sugar Syrup)', 'Pistachio Kulfi on a Stick', 'Kashmiri Kheer with Silver Leaf',
      'Warm Chocolate Sizzling Brownie with Vanilla Scoop', 'Nutella Stuffed Crepe', 'New York Baked Cheesecake Slice',
      'Molten Chocolate Lava Cake', 'Caramel Bread Pudding', 'Ras Malai in Saffron Milk',
      'Gajar Ka Halwa with Khoya', 'Matka Kulfi Falooda Bowl'
    ],
    styles: ['Warm & Syrup Soaked', 'Hand Churned Frozen', 'Rich Belgian Cocoa Infused', 'Cardamom & Milk Simmered', 'Fresh Berry Garnished'],
    accompaniments: ['Crushed Pistachios & Almonds', 'Vanilla Bean Ice Cream', 'Chocolate Fudge Drizzle', 'Edible Silver Leaf', 'Rose Petals'],
    defaultDietary: ['vegetarian']
  },
  {
    category: 'beverages',
    count: 30,
    minPrice: 1.50,
    maxPrice: 4.50, // Max <= 15
    itemBases: [
      'Margalla Mountain Mint Lemonade', 'Traditional Sweet Punjab Lassi', 'Salted Jeera Lassi',
      'Peshawari Green Cardamom Kehwa', 'Pink Kashmiri Karak Chai', 'Fresh Seasonal Mango Shake',
      'Cold Coffee with Vanilla Ice Cream', 'Blue Lagoon Citrus Fizz', 'Virgin Strawberry Mojito',
      'Fresh Pressed Orange Juice', 'Iced Lemon Peach Tea', 'Oreo Thick Shake'
    ],
    styles: ['Freshly Blended with Ice', 'Clay Pot Brewed', 'Botanical Infused', 'Chilled & Frothy', 'Hand Pressed'],
    accompaniments: ['Fresh Mint Sprig', 'Crushed Ice Frost', 'Sliced Lime Wheel', 'Cardamom Pods', 'Sugar Cane Swizzle'],
    defaultDietary: ['vegetarian']
  }
];

// Build the full 400+ dishes array
function generateFullMenu(): MenuItem[] {
  const items: MenuItem[] = [];
  let currentId = 1;

  // 1. Add All Deals First (Deals are super important, requested by user!)
  for (const deal of RAW_DEALS) {
    const slug = toSlug(deal.name);
    items.push({
      id: `dish-deal-${currentId++}`,
      name: deal.name,
      slug,
      category: 'deals',
      price: Math.min(deal.price, 15.00),
      description: deal.description,
      ingredients: deal.ingredients,
      calories: 750 + (currentId % 200),
      preparationTimeMinutes: 20,
      image: deal.image,
      altText: `${deal.name} under $15 at Margalla Hills Restaurant`,
      dietary: deal.dietary || ['halal'],
      isFeatured: true,
      status: 'published',
      createdAt: '2026-03-01T12:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z',
      seo: {
        seoTitle: `${deal.name} | Margalla Hills Value Deals Under $15`,
        metaDescription: `${deal.description} Best dining value deal in Islamabad under $15.`,
        slug,
        focusKeyword: deal.name.toLowerCase(),
        secondaryKeywords: ['margalla hills deals', 'restaurant deals islamabad', 'food deals under 15 dollars'],
        canonicalUrl: `/menu/deals/${slug}`,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: `${deal.name} - Exclusive Deal under $15`,
        ogDescription: deal.description,
        ogImage: deal.image,
        schemaType: 'MenuItem',
        searchIntent: 'Commercial'
      }
    });
  }

  // 2. Generate categories items
  for (const cfg of CATEGORY_GENERATOR_CONFIGS) {
    for (let i = 0; i < cfg.count; i++) {
      const baseName = cfg.itemBases[i % cfg.itemBases.length];
      const style = cfg.styles[(i + 1) % cfg.styles.length];
      const accompaniment = cfg.accompaniments[(i + 2) % cfg.accompaniments.length];
      
      // Determine distinct name
      const variantNumber = Math.floor(i / cfg.itemBases.length) + 1;
      const finalName = variantNumber === 1 
        ? `${baseName} (${style})`
        : `${baseName} Special - ${style} with ${accompaniment}`;

      const slug = toSlug(finalName) + `-${currentId}`;
      const step = (cfg.maxPrice - cfg.minPrice) / cfg.count;
      let calculatedPrice = Number((cfg.minPrice + (i * step)).toFixed(2));
      // STRICT HARD CAP at $15 max as instructed by user
      if (calculatedPrice > 15.00) calculatedPrice = 14.99;
      if (calculatedPrice < 0.99) calculatedPrice = 1.50;

      const img = FOOD_IMAGES[(currentId + i) % FOOD_IMAGES.length];

      items.push({
        id: `dish-${cfg.category}-${currentId++}`,
        name: finalName,
        slug,
        category: cfg.category,
        price: calculatedPrice,
        description: `${style} preparation of ${baseName}. Garnished with ${accompaniment} for authentic flavor.`,
        ingredients: [baseName, accompaniment, 'Himalayan Pink Salt', 'House Herbs & Spices', 'Pure Cooking Medium'],
        calories: 320 + ((i * 17) % 550),
        preparationTimeMinutes: 15 + ((i * 3) % 25),
        image: img,
        altText: `${finalName} at Margalla Hills Resort Islamabad`,
        dietary: cfg.defaultDietary,
        isFeatured: i < 3,
        status: 'published',
        createdAt: '2026-03-01T12:00:00Z',
        updatedAt: '2026-09-01T12:00:00Z',
        seo: {
          seoTitle: `${finalName} | Margalla Hills Menu`,
          metaDescription: `Enjoy authentic ${finalName} priced at $${calculatedPrice} at Margalla Hills Restaurant Islamabad.`,
          slug,
          focusKeyword: baseName.toLowerCase(),
          secondaryKeywords: ['margalla hills menu', `${baseName.toLowerCase()} islamabad`, 'best food islamabad'],
          canonicalUrl: `/menu/${cfg.category}/${slug}`,
          robotsIndex: true,
          robotsFollow: true,
          ogTitle: finalName,
          ogDescription: `Authentic ${finalName} for $${calculatedPrice} at Margalla Hills.`,
          ogImage: img,
          schemaType: 'MenuItem',
          searchIntent: 'Commercial'
        }
      });
    }
  }

  return items;
}

export const DISHES_400_PLUS: MenuItem[] = generateFullMenu();
export const TOTAL_DISHES_COUNT = DISHES_400_PLUS.length;
