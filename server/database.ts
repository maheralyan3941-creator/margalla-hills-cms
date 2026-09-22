import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  User,
  MenuItem,
  MenuCategory,
  BlogPost,
  BlogCategory,
  CaseStudy,
  KeywordCluster,
  CompetitorResearch,
  BacklinkItem,
  RedirectRule,
  SEOSettings,
  AnalyticsSummary
} from '../src/types';
import { EXPANDED_CATEGORIES, EXPANDED_MENU_ITEMS } from '../src/data/expandedMenuItems';

interface DatabaseSchema {
  users: (User & { passwordHash: string })[];
  menuItems: MenuItem[];
  menuCategories: MenuCategory[];
  blogPosts: BlogPost[];
  blogCategories: BlogCategory[];
  caseStudies: CaseStudy[];
  keywordClusters: KeywordCluster[];
  competitors: CompetitorResearch[];
  backlinks: BacklinkItem[];
  seoSettings: SEOSettings;
  analytics: AnalyticsSummary;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'server', 'data.json');

// Helper to generate seed users with bcrypt hashed passwords
function getInitialSeedData(): DatabaseSchema {
  const salt = bcrypt.genSaltSync(10);
  const saffronAdminHash = bcrypt.hashSync('Admin@123456', salt);
  const saffronChefHash = bcrypt.hashSync('Chef@123456', salt);
  const saffronEditorHash = bcrypt.hashSync('Editor@123456', salt);
  const defaultPasswordHash = bcrypt.hashSync('AdminPass123!', salt);
  const editorPasswordHash = bcrypt.hashSync('EditorPass123!', salt);

  const initialUsers = [
    {
      "id": "usr-margalla-superadmin",
      "name": "Margalla Hills (Super Admin)",
      "email": "admin@margallahills.com",
      "role": "SUPER_ADMIN" as const,
      "status": "active" as const,
      "createdAt": "2026-01-10T09:00:00Z",
      "lastLogin": "2026-08-31T02:00:00Z",
      "passwordHash": saffronAdminHash
    },
    {
      id: 'usr-saffron-superadmin',
      name: 'Dr. Sarah Vance (Super Admin)',
      email: 'admin@saffronandsage.com',
      role: 'SUPER_ADMIN' as const,
      status: 'active' as const,
      createdAt: '2026-01-10T09:00:00Z',
      lastLogin: '2026-08-31T02:00:00Z',
      passwordHash: saffronAdminHash
    },
    {
      id: 'usr-saffron-chef',
      name: 'Chef Marcus Sterling (Executive Chef)',
      email: 'marcus@saffronandsage.com',
      role: 'ADMIN' as const,
      status: 'active' as const,
      createdAt: '2026-01-12T10:00:00Z',
      lastLogin: '2026-08-30T16:00:00Z',
      passwordHash: saffronChefHash
    },
    {
      id: 'usr-saffron-editor',
      name: 'Elena Rostova (SEO Content Editor)',
      email: 'editor@saffronandsage.com',
      role: 'EDITOR' as const,
      status: 'active' as const,
      createdAt: '2026-01-15T12:00:00Z',
      lastLogin: '2026-08-30T18:00:00Z',
      passwordHash: saffronEditorHash
    },
    {
      id: 'usr-superadmin',
      name: 'SEO Lab Super Admin',
      email: 'superadmin@seolab.dev',
      role: 'SUPER_ADMIN' as const,
      status: 'active' as const,
      createdAt: '2026-01-15T09:00:00Z',
      lastLogin: '2026-08-30T14:20:00Z',
      passwordHash: defaultPasswordHash
    },
    {
      id: 'usr-admin',
      name: 'Alex Rivera (Content Lead)',
      email: 'admin@seolab.dev',
      role: 'ADMIN' as const,
      status: 'active' as const,
      createdAt: '2026-02-01T10:30:00Z',
      lastLogin: '2026-08-29T11:15:00Z',
      passwordHash: defaultPasswordHash
    },
    {
      id: 'usr-editor',
      name: 'SEO Writer Editor',
      email: 'editor@seolab.dev',
      role: 'EDITOR' as const,
      status: 'active' as const,
      createdAt: '2026-03-10T12:00:00Z',
      lastLogin: '2026-08-28T16:45:00Z',
      passwordHash: editorPasswordHash
    }
  ];

  const initialMenuCategories: MenuCategory[] = EXPANDED_CATEGORIES;
  const initialMenuItems: MenuItem[] = EXPANDED_MENU_ITEMS;

  const initialBlogCategories: BlogCategory[] = [
    {
      id: 'bcat-local-seo',
      name: 'Local SEO & Google Maps',
      slug: 'local-seo',
      description: 'Mastering proximity ranking, Google Business Profile optimization, and local citation architecture.'
    },
    {
      id: 'bcat-schema-technical',
      name: 'Schema & Technical SEO',
      slug: 'technical-seo',
      description: 'Structured data implementation, JSON-LD schemas, crawl budgeting, and Core Web Vitals engineering.'
    },
    {
      id: 'bcat-keyword-intent',
      name: 'Keyword Research & Search Intent',
      slug: 'keyword-research',
      description: 'Search intent classification, long-tail clustering, and topical authority frameworks.'
    },
    {
      id: 'bcat-culinary-seo',
      name: 'Restaurant & Hospitality SEO',
      slug: 'hospitality-seo',
      description: 'Strategies for menu indexing, dining search queries, programmatic catering pages, and food blogging.'
    }
  ];

  const initialBlogPosts: BlogPost[] = [
    {
      id: 'post-local-seo-guide-2026',
      title: 'The Comprehensive Restaurant Local SEO Guide: Dominating Google Local Pack in 2026',
      slug: 'restaurant-local-seo-guide',
      excerpt: 'Learn how modern hospitality venues capture high-intent diners with optimized Google Business Profiles, localized menu schema, and consistent NAP signals.',
      content: `# The Comprehensive Restaurant Local SEO Guide: Dominating Google Local Pack

When hungry diners search for **"best saffron biryani near me"** or **"romantic dinner in downtown"**, over 70% of clicks land on the top three Google Local Pack results.

For any hospitality business, capturing this hyper-local traffic is the highest-converting digital channel available.

---

## 1. What Determines Local Search Ranking?

Google's local algorithm evaluates three foundational pillars:

1. **Relevance**: How precisely your website and business category match the searcher's query intent.
2. **Distance**: The physical proximity of your business address to the user's GPS coordinates or geo-modified query.
3. **Prominence**: How authoritative, trustworthy, and well-reviewed your venue appears across the web (citations, backlinks, and brand mentions).

---

## 2. On-Page Local SEO Foundations

To signal geo-relevance to search engine crawlers:

- **Embed Structured NAP Data**: Place your exact Name, Address, and Phone number in the site footer wrapped in \`Restaurant\` schema.
- **Dedicated Neighborhood Pages**: If catering to multiple districts, create tailored landing pages detailing local dining amenities.
- **Optimized Menu Headings**: Use descriptive H2 and H3 tags like \`## Artisanal Saffron Specialties in Downtown\`.

---

## 3. Implementing JSON-LD Restaurant Schema

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Saffron & Sage Artisanal Kitchen",
  "servesCuisine": "Modern Indian & Himalayan",
  "priceRange": "$$"
}
\`\`\`

By deploying clean structured data, Google understands your dining category and operating hours without ambiguity.

---

## 4. Summary & Action Steps

- Audit your site for broken internal links and crawl errors.
- Sync your Google Business Profile categories with your primary menu categories.
- Test your pages regularly with Google's Rich Results Test tool.`,
      featuredImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      imageAltText: 'Modern dining room interior highlighting local restaurant SEO atmosphere and table settings',
      category: 'local-seo',
      tags: ['Local SEO', 'Google Maps', 'Restaurant Marketing', 'NAP Citations'],
      author: {
        name: 'Dr. Sarah Vance',
        role: 'Head of SEO Strategy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      status: 'published',
      publishedAt: '2026-03-01T08:00:00Z',
      updatedAt: '2026-08-20T10:30:00Z',
      readTimeMinutes: 6,
      relatedPostIds: ['post-schema-markup-culinary', 'post-search-intent-demystified'],
      seo: {
        seoTitle: 'The Complete Restaurant Local SEO Guide (2026 Blueprint)',
        metaDescription: 'Master local SEO for restaurants: learn Google Maps ranking factors, GBP optimization, local citations, and on-page geo signals to attract high-intent diners.',
        slug: 'restaurant-local-seo-guide',
        focusKeyword: 'restaurant local seo',
        secondaryKeywords: ['google maps restaurant ranking', 'local pack seo', 'restaurant seo strategy'],
        canonicalUrl: '/blog/restaurant-local-seo-guide',
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: 'The Complete Restaurant Local SEO Guide for 2026',
        ogDescription: 'Step-by-step masterclass on ranking your culinary business in Google Local Pack.',
        ogImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        schemaType: 'Article',
        searchIntent: 'Informational'
      }
    },
    {
      id: 'post-schema-markup-culinary',
      title: 'Schema Markup for Food & Beverage: Unlocking Rich Snippets and FoodEstablishment Markup',
      slug: 'schema-markup-culinary-rich-snippets',
      excerpt: 'Explore how Schema.org FoodEstablishment, MenuItem, and Recipe structured data enable price tags, dish images, and nutritional rich snippets directly in Google SERP.',
      content: `# Schema Markup for Food & Beverage: Unlocking Rich Snippets

Structured data is the language search engines speak to comprehend web content without guesswork.

When you markup food items with \`MenuItem\` and \`Recipe\` schema, search engines can display rich snippets featuring pricing, prep time, and dietary labels directly on search result pages.

---

## Why Rich Results Matter for Click-Through Rates (CTR)

Standard search snippets show only a blue title and two lines of gray snippet text.

In contrast, **Rich Snippets** deliver:
- Visual dish thumbnails
- Price ranges ($ or exact dollar amounts)
- Dietary badges (Gluten-Free, Vegan, Vegetarian)
- Breadcrumb navigation paths

Studies show structured snippets can increase organic CTR by **20% to 35%** over plain text listings.

---

## Key Schema Types for Culinary Portals

1. **Restaurant / FoodEstablishment**: Signals operating hours, address, phone number, and price range.
2. **MenuItem**: Connects specific dishes to menus, including name, description, and currency price.
3. **BreadcrumbList**: Clarifies the URL hierarchy (Home > Menu > Starters > Dish Name).
4. **Article / BlogPosting**: Marks editorial guides and case studies for Google Discover and Search feeds.

---

## Validating Your Structured Data

Always validate your JSON-LD with:
- Google Rich Results Test
- Schema.org Validator
- Live SEO Lab Inspector in this portal's Admin panel!`,
      featuredImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      imageAltText: 'Gourmet dish presentation demonstrating visual rich snippet schema potential for culinary SEO',
      category: 'technical-seo',
      tags: ['Schema Markup', 'JSON-LD', 'Rich Snippets', 'Technical SEO'],
      author: {
        name: 'Alex Rivera',
        role: 'Technical SEO Architect',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      },
      status: 'published',
      publishedAt: '2026-04-10T09:30:00Z',
      updatedAt: '2026-08-25T14:15:00Z',
      readTimeMinutes: 7,
      relatedPostIds: ['post-local-seo-guide-2026', 'post-search-intent-demystified'],
      seo: {
        seoTitle: 'Schema Markup for Food & Beverage Websites | Rich Snippet Tutorial',
        metaDescription: 'Step-by-step guide to implementing Schema.org FoodEstablishment, MenuItem, and BreadcrumbList JSON-LD structured data for higher CTR in Google SERPs.',
        slug: 'schema-markup-culinary-rich-snippets',
        focusKeyword: 'restaurant schema markup',
        secondaryKeywords: ['menu item schema', 'food establishment structured data', 'rich snippets json-ld'],
        canonicalUrl: '/blog/schema-markup-culinary-rich-snippets',
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: 'Schema Markup for Food & Beverage Websites',
        ogDescription: 'Unlock rich snippets and interactive search cards with structured JSON-LD.',
        ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        schemaType: 'Article',
        searchIntent: 'Informational'
      }
    },
    {
      id: 'post-search-intent-demystified',
      title: 'Search Intent Demystified: Mapping User Journeys from Culinary Curiosity to Table Reservation',
      slug: 'search-intent-culinary-user-journeys',
      excerpt: 'How to classify keywords across Informational, Commercial Investigation, Transactional, and Navigational search intents to maximize conversions.',
      content: `# Search Intent Demystified: Mapping the User Journey

Search intent (also known as *user intent*) represents the primary goal a user has when typing a query into a search engine.

Creating content that matches the exact intent Google expects for a keyword is the single most important ranking signal in modern SEO.

---

## The Four Universal Search Intent Types

### 1. Informational Intent
- **What it is**: The user wants to learn or understand a topic.
- **Example Queries**: *"What is grade A saffron?"*, *"How is biryani cooked?"*, *"Difference between nihari and rogan josh"*.
- **Content Format**: In-depth blog guides, recipe breakdowns, step-by-step tutorials.

### 2. Commercial Investigation
- **What it is**: The user is comparing options, looking for recommendations, or reading reviews before making a purchase decision.
- **Example Queries**: *"Best saffron biryani in city"*, *"Top artisanal Indian restaurants"*, *"Healthy gluten free dining options"*.
- **Content Format**: Curated lists, dish feature comparisons, chef signature highlights.

### 3. Transactional Intent
- **What it is**: The user is prepared to make a reservation, place an order, or book catering immediately.
- **Example Queries**: *"Book table Saffron and Sage"*, *"Order saffron biryani online"*, *"Wedding catering quote"*.
- **Content Format**: Menu checkout pages, reservation forms, streamlined CTA buttons.

### 4. Navigational Intent
- **What it is**: The user is searching for a specific brand or specific website page.
- **Example Queries**: *"Saffron and Sage menu"*, *"Saffron and Sage contact number"*.
- **Content Format**: Clear homepage, branded about page, direct menu URL.

---

## Intent Mismatch: The #1 Reason Pages Don't Rank

If Google displays recipe blog posts for a keyword, publishing a commercial sales page for that keyword will rarely rank on page 1. Always inspect the live SERP to confirm what content format Google currently rewards!`,
      featuredImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
      imageAltText: 'Culinary research and user journey mapping notebook with organic ingredients',
      category: 'keyword-research',
      tags: ['Search Intent', 'Keyword Research', 'Conversion Rate', 'On-Page SEO'],
      author: {
        name: 'Elena Rostova',
        role: 'SEO Content Specialist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
      },
      status: 'published',
      publishedAt: '2026-05-05T11:00:00Z',
      updatedAt: '2026-08-28T09:00:00Z',
      readTimeMinutes: 5,
      relatedPostIds: ['post-local-seo-guide-2026', 'post-schema-markup-culinary'],
      seo: {
        seoTitle: 'Search Intent Demystified: Master SEO Keyword Intent Mapping',
        metaDescription: 'Learn how to classify informational, commercial, transactional, and navigational search intent to build content that ranks and converts searchers into diners.',
        slug: 'search-intent-culinary-user-journeys',
        focusKeyword: 'search intent seo',
        secondaryKeywords: ['keyword intent classification', 'user intent search engine', 'informational vs transactional keywords'],
        canonicalUrl: '/blog/search-intent-culinary-user-journeys',
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: 'Search Intent Demystified - Complete SEO Playbook',
        ogDescription: 'Map user journeys from curious queries to high-converting reservations.',
        ogImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        schemaType: 'Article',
        searchIntent: 'Informational'
      }
    }
  ];

  const initialCaseStudies: CaseStudy[] = [
    {
      id: 'cs-heritage-dining-growth',
      projectName: 'Local Pack Domination: 320% Organic Boost for Heritage Dining via Hyperlocal Content & Schema',
      slug: 'local-pack-domination-heritage-dining',
      summary: 'A 6-month full-funnel SEO experiment targeting high-intent dining keywords through structured data, menu optimization, and regional keyword clusters.',
      targetKeywords: ['best biryani downtown', 'artisanal dining experience', 'tandoori starters near me', 'gourmet catering'],
      problem: 'The restaurant had excellent culinary craftsmanship but near-zero organic search visibility. High Google Ads cost per click ($4.80) was unsustainable, and their digital menu was trapped inside un-indexable PDF files.',
      strategy: 'We transformed the static PDF menu into clean semantic HTML with dedicated slug URLs, deployed JSON-LD MenuItem and Restaurant structured data, and launched an educational food blog targeting long-tail queries.',
      actionsTaken: [
        'Converted 24 PDF menu items into crawlable static and dynamic HTML pages with unique canonical URLs.',
        'Injected complete Schema.org Restaurant and MenuItem JSON-LD on all food pages.',
        'Targeted 18 long-tail culinary search clusters with in-depth informational articles.',
        'Optimized internal anchor text to link high-intent blog posts directly to dish ordering and reservation landing pages.',
        'Configured dynamic XML Sitemap and automated schema validation tools.'
      ],
      results: [
        { metric: 'Monthly Organic Clicks', before: '420 clicks/mo', after: '1,840 clicks/mo', change: '+338%' },
        { metric: 'Google Local Pack Rank (Downtown)', before: '#18 (Page 2)', after: '#2 (Page 1)', change: '+16 positions' },
        { metric: 'Direct Table Inquiries via Organic', before: '14 inquiries/mo', after: '86 inquiries/mo', change: '+514%' },
        { metric: 'Average SERP CTR', before: '1.4%', after: '4.8%', change: '+242%' }
      ],
      keyTakeaways: [
        'Never lock menus in PDFs—individual HTML dish pages with rich schema unlock high-converting long-tail traffic.',
        'Internal links from informational blog articles to commercial dish pages transfer topical authority seamlessly.',
        'Real-time on-page SEO audits ensure every newly published page adheres strictly to optimal title, meta, and heading standards.'
      ],
      screenshotUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      date: '2026-06-15',
      published: true,
      seo: {
        seoTitle: 'SEO Case Study: 320% Organic Growth for Artisanal Restaurant',
        metaDescription: 'Read how we achieved +338% organic clicks and #2 Google Maps ranking using structured data, HTML menus, and search intent targeting.',
        slug: 'local-pack-domination-heritage-dining',
        focusKeyword: 'restaurant seo case study',
        secondaryKeywords: ['organic traffic growth case study', 'restaurant local seo results'],
        canonicalUrl: '/case-studies/local-pack-domination-heritage-dining',
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: 'Restaurant SEO Case Study: +320% Organic Boost',
        ogDescription: 'Real results from structured schema, HTML menus, and keyword clustering.',
        ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        schemaType: 'Article',
        searchIntent: 'Commercial'
      }
    }
  ];

  const initialKeywordClusters: KeywordCluster[] = [
    {
      id: 'kc-1',
      clusterName: 'Saffron Biryani & Specialties',
      primaryKeyword: 'saffron biryani',
      supportingKeywords: ['kashmiri chicken biryani', 'authentic saffron rice', 'best saffron biryani in town', 'pampore saffron cuisine'],
      intent: 'Commercial',
      volumeTier: 'Medium (1k-10k)',
      difficulty: 'Medium (31-60)',
      mappedPageUrl: '/menu/specialties/royal-saffron-biryani',
      notes: 'High commercial purchase intent; supports direct dish reservation and takeaway orders.',
      status: 'Ranking'
    },
    {
      id: 'kc-2',
      clusterName: 'Restaurant Local SEO & Marketing',
      primaryKeyword: 'restaurant local seo',
      supportingKeywords: ['google maps restaurant ranking', 'local pack seo for food', 'restaurant citation audit', 'restaurant gbp optimization'],
      intent: 'Informational',
      volumeTier: 'High (10k+)',
      difficulty: 'Medium (31-60)',
      mappedPageUrl: '/blog/restaurant-local-seo-guide',
      notes: 'B2B educational cluster attracting restaurateurs and agency professionals.',
      status: 'Ranking'
    },
    {
      id: 'kc-3',
      clusterName: 'Culinary Schema & Structured Data',
      primaryKeyword: 'restaurant schema markup',
      supportingKeywords: ['menu item schema generator', 'foodestablishment json-ld', 'rich snippets for recipes', 'restaurant structured data'],
      intent: 'Informational',
      volumeTier: 'Medium (1k-10k)',
      difficulty: 'Easy (0-30)',
      mappedPageUrl: '/blog/schema-markup-culinary-rich-snippets',
      notes: 'Technical SEO cluster with rapid ranking potential due to low domain competition.',
      status: 'Ranking'
    },
    {
      id: 'kc-4',
      clusterName: 'Search Intent & SEO Strategy',
      primaryKeyword: 'search intent seo',
      supportingKeywords: ['keyword intent classification', 'commercial vs informational intent', 'user search intent mapping'],
      intent: 'Informational',
      volumeTier: 'High (10k+)',
      difficulty: 'Hard (61+)',
      mappedPageUrl: '/blog/search-intent-culinary-user-journeys',
      notes: 'Competitive conceptual keyword cluster; built to demonstrate topical authority.',
      status: 'Under Optimization'
    },
    {
      id: 'kc-5',
      clusterName: 'Gourmet Catering & Private Events',
      primaryKeyword: 'artisanal wedding catering',
      supportingKeywords: ['luxury food catering', 'corporate dinner catering', 'private chef tasting events', 'botanical cocktail catering'],
      intent: 'Transactional',
      volumeTier: 'Medium (1k-10k)',
      difficulty: 'Medium (31-60)',
      mappedPageUrl: '/catering/new-york',
      notes: 'High average order value ($2,500+). Programmatic landing pages target major metropolitan districts.',
      status: 'Targeted'
    }
  ];

  const initialCompetitors: CompetitorResearch[] = [
    {
      id: 'comp-1',
      competitorName: 'Heritage Spice Bistro',
      competitorUrl: 'https://example-competitor-spice.com',
      rankingKeyword: 'authentic kashmiri dining',
      targetPage: '/menu/kashmiri-specials',
      estimatedRank: 3,
      theirStrengths: 'Old domain age (8 years), high backlink count from local newspapers.',
      contentGapOpportunity: 'Their menu has zero structured schema markup and thin 20-word dish descriptions.',
      ourCounterStrategy: 'Publish comprehensive ingredient sourcing stories with full Schema.org MenuItem markup and high-res photography.',
      updatedAt: '2026-08-15'
    },
    {
      id: 'comp-2',
      competitorName: 'The Saffron Table',
      competitorUrl: 'https://example-saffrontable.com',
      rankingKeyword: 'best saffron biryani downtown',
      targetPage: '/biryani-specialties',
      estimatedRank: 1,
      theirStrengths: '250+ Google customer reviews mentioning the keyword "biryani".',
      contentGapOpportunity: 'Lacks nutritional breakdown, slow mobile load time (3.8s LCP), no vegan/gluten-free filters.',
      ourCounterStrategy: 'Optimize Core Web Vitals to sub-1.2s LCP, add dietary filter taxonomy, and build dedicated long-tail dish pages.',
      updatedAt: '2026-08-22'
    }
  ];

  const initialBacklinks: BacklinkItem[] = [
    {
      id: 'bl-1',
      referringDomain: 'culinarytrendsweekly.com',
      sourceUrl: 'https://culinarytrendsweekly.com/articles/the-rise-of-botanical-saffron-flavors',
      targetPageUrl: '/menu/specialties/royal-saffron-biryani',
      anchorText: 'artisanal saffron biryani craftsmanship',
      linkType: 'dofollow',
      domainRating: 64,
      status: 'Active',
      notes: 'Editorial feature link in an in-depth article analyzing modern Himalayan spice pairings.',
      dateAdded: '2026-04-12'
    },
    {
      id: 'bl-2',
      referringDomain: 'seojournalinsights.org',
      sourceUrl: 'https://seojournalinsights.org/local-seo-schema-teardown',
      targetPageUrl: '/blog/schema-markup-culinary-rich-snippets',
      anchorText: 'food establishment structured data breakdown',
      linkType: 'dofollow',
      domainRating: 78,
      status: 'Active',
      notes: 'Cited as a gold-standard reference for JSON-LD schema implementation.',
      dateAdded: '2026-05-18'
    },
    {
      id: 'bl-3',
      referringDomain: 'downtowndiningguide.net',
      sourceUrl: 'https://downtowndiningguide.net/top-romantic-dinner-spots',
      targetPageUrl: '/about',
      anchorText: 'Saffron & Sage Kitchen',
      linkType: 'nofollow',
      domainRating: 45,
      status: 'Active',
      notes: 'Local restaurant directory inclusion under artisanal dining category.',
      dateAdded: '2026-06-02'
    }
  ];

  const initialSEOSettings: SEOSettings = {
    siteName: 'Saffron & Sage Artisanal Kitchen',
    siteUrl: 'https://saffronandsage.seolab.dev',
    tagline: 'Modern Culinary Excellence & SEO Practice Laboratory',
    defaultMetaDescription: 'Saffron & Sage is a modern artisanal culinary showcase and interactive SEO practice laboratory. Explore heritage recipes, structured data schemas, and SEO experiments.',
    defaultOgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    businessInfo: {
      name: 'Saffron & Sage Artisanal Kitchen (Demo Laboratory)',
      legalName: 'Saffron & Sage Culinary Arts & SEO Lab Ltd.',
      tagline: 'Modern Culinary Experience & SEO Benchmarking Platform',
      address: {
        street: '450 Heritage Spice Way, Suite 100',
        city: 'Metropolis',
        state: 'NY',
        postalCode: '10001',
        country: 'US'
      },
      phone: '+1 (555) 839-7361',
      email: 'hello@saffronandsage.seolab.dev',
      priceRange: '$$',
      cuisineType: 'Modern Himalayan & Artisanal Indian',
      openingHours: [
        'Mo-Th 12:00-22:00',
        'Fr-Sa 12:00-23:00',
        'Su 12:00-21:00'
      ],
      googleMapsUrl: 'https://maps.google.com/?q=Saffron+Sage+Artisanal+Kitchen',
      googlePlaceId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    },
    googleAnalyticsId: 'G-SEO98234LAB',
    googleSearchConsoleVerification: 'google-site-verification=gsc_seolab_benchmarking_token_2026',
    robotsTxtContent: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://saffronandsage.seolab.dev/sitemap.xml`,
    redirects: [
      {
        id: 'red-1',
        source: '/old-menu.pdf',
        destination: '/menu',
        type: 301,
        active: true,
        hits: 142,
        lastAccessed: '2026-08-30T10:00:00Z'
      },
      {
        id: 'red-2',
        source: '/blog/local-seo-tips',
        destination: '/blog/restaurant-local-seo-guide',
        type: 301,
        active: true,
        hits: 89,
        lastAccessed: '2026-08-29T16:20:00Z'
      }
    ],
    isDemoNoticeEnabled: true
  };

  const initialAnalytics: AnalyticsSummary = {
    dateRange: 'Last 28 Days',
    totalClicks: 2460,
    totalImpressions: 48900,
    averageCtr: 5.03,
    averagePosition: 8.4,
    clickGrowthPercent: 24.8,
    dailyData: [
      { date: '2026-08-03', clicks: 65, impressions: 1420, ctr: 4.58, position: 9.1 },
      { date: '2026-08-06', clicks: 78, impressions: 1540, ctr: 5.06, position: 8.8 },
      { date: '2026-08-09', clicks: 82, impressions: 1680, ctr: 4.88, position: 8.7 },
      { date: '2026-08-12', clicks: 94, impressions: 1790, ctr: 5.25, position: 8.5 },
      { date: '2026-08-15', clicks: 88, impressions: 1720, ctr: 5.12, position: 8.4 },
      { date: '2026-08-18', clicks: 104, impressions: 1910, ctr: 5.45, position: 8.2 },
      { date: '2026-08-21', clicks: 112, impressions: 2050, ctr: 5.46, position: 8.0 },
      { date: '2026-08-24', clicks: 128, impressions: 2280, ctr: 5.61, position: 7.9 },
      { date: '2026-08-27', clicks: 135, impressions: 2410, ctr: 5.60, position: 7.8 },
      { date: '2026-08-30', clicks: 148, impressions: 2600, ctr: 5.69, position: 7.6 }
    ],
    topQueries: [
      { query: 'saffron biryani', clicks: 420, impressions: 4800, ctr: 8.75, position: 2.1 },
      { query: 'restaurant local seo', clicks: 380, impressions: 6200, ctr: 6.13, position: 3.4 },
      { query: 'restaurant schema markup', clicks: 290, impressions: 3900, ctr: 7.44, position: 1.8 },
      { query: 'truffle paneer tikka', clicks: 215, impressions: 2800, ctr: 7.68, position: 2.4 },
      { query: 'search intent seo', clicks: 185, impressions: 8400, ctr: 2.20, position: 8.6 },
      { query: 'slow cooked lamb nihari', clicks: 160, impressions: 1950, ctr: 8.21, position: 2.9 },
      { query: 'vegan avocado chaat recipe', clicks: 120, impressions: 1800, ctr: 6.67, position: 4.1 },
      { query: 'rose cardamom tres leches', clicks: 95, impressions: 1400, ctr: 6.79, position: 3.2 }
    ],
    topPages: [
      { url: '/menu/specialties/royal-saffron-biryani', clicks: 540, impressions: 6800, ctr: 7.94, position: 2.3 },
      { url: '/blog/restaurant-local-seo-guide', clicks: 460, impressions: 7200, ctr: 6.39, position: 3.2 },
      { url: '/blog/schema-markup-culinary-rich-snippets', clicks: 380, impressions: 4900, ctr: 7.76, position: 2.1 },
      { url: '/menu', clicks: 310, impressions: 5800, ctr: 5.34, position: 4.5 },
      { url: '/case-studies/local-pack-domination-heritage-dining', clicks: 220, impressions: 3200, ctr: 6.88, position: 3.8 },
      { url: '/catering/new-york', clicks: 185, impressions: 4100, ctr: 4.51, position: 6.2 },
      { url: '/about', clicks: 140, impressions: 3800, ctr: 3.68, position: 7.4 }
    ]
  };

  return {
    users: initialUsers,
    menuItems: initialMenuItems,
    menuCategories: initialMenuCategories,
    blogPosts: initialBlogPosts,
    blogCategories: initialBlogCategories,
    caseStudies: initialCaseStudies,
    keywordClusters: initialKeywordClusters,
    competitors: initialCompetitors,
    backlinks: initialBacklinks,
    seoSettings: initialSEOSettings,
    analytics: initialAnalytics
  };
}

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      const serverDir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE_PATH)) {
        const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const parsed: DatabaseSchema = JSON.parse(raw);
        
        // Ensure default seed users are always present and up-to-date with working credentials
        const seed = getInitialSeedData();
        if (!parsed.users || parsed.users.length === 0) {
          parsed.users = seed.users;
        } else {
          for (const seedUser of seed.users) {
            const existingIdx = parsed.users.findIndex(u => u.email.toLowerCase() === seedUser.email.toLowerCase());
            if (existingIdx === -1) {
              parsed.users.push(seedUser);
            } else {
              // Ensure active status and working password hash
              parsed.users[existingIdx].passwordHash = seedUser.passwordHash;
              parsed.users[existingIdx].status = 'active';
              parsed.users[existingIdx].role = seedUser.role;
            }
          }
        }

        // Ensure expanded categories and dishes are safely initialized without overwriting user edits
        if (!parsed.menuCategories || parsed.menuCategories.length === 0) {
          parsed.menuCategories = seed.menuCategories;
        }
        if (!parsed.menuItems) {
          parsed.menuItems = [];
        }
        for (const seedItem of seed.menuItems) {
          const exists = parsed.menuItems.some(m => m.id === seedItem.id || m.slug === seedItem.slug);
          if (!exists) {
            parsed.menuItems.push(seedItem);
          }
        }
        this.saveDataDirect(parsed);
        return parsed;
      }
    } catch (err) {
      console.error('Error loading data.json, falling back to seed:', err);
    }

    const seed = getInitialSeedData();
    this.saveDataDirect(seed);
    return seed;
  }

  private saveDataDirect(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data.json:', err);
    }
  }

  public save() {
    this.saveDataDirect(this.data);
  }

  // Users
  public getUsers() {
    return this.data.users.map(({ passwordHash, ...user }) => user);
  }

  public getUserByEmail(email: string) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string) {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(userData: Omit<User, 'id' | 'createdAt'> & { password: string }) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(userData.password, salt);
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      createdAt: new Date().toISOString(),
      passwordHash
    };
    this.data.users.push(newUser);
    this.save();
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  }

  public updateUser(id: string, updates: Partial<User> & { password?: string }) {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;

    if (updates.name !== undefined) user.name = updates.name;
    if (updates.email !== undefined) user.email = updates.email;
    if (updates.role !== undefined) user.role = updates.role;
    if (updates.status !== undefined) user.status = updates.status;
    if (updates.lastLogin !== undefined) user.lastLogin = updates.lastLogin;

    if (updates.password) {
      const salt = bcrypt.genSaltSync(10);
      user.passwordHash = bcrypt.hashSync(updates.password, salt);
    }

    this.save();
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  public deleteUser(id: string) {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.data.users.splice(index, 1);
    this.save();
    return true;
  }

  // Menu Items
  public getMenuItems() {
    return this.data.menuItems;
  }

  public getMenuItemBySlug(slug: string) {
    return this.data.menuItems.find(m => m.slug === slug);
  }

  public getMenuItemById(id: string) {
    return this.data.menuItems.find(m => m.id === id);
  }

  public createMenuItem(item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) {
    const newItem: MenuItem = {
      ...item,
      id: `dish-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.menuItems.push(newItem);
    this.save();
    return newItem;
  }

  public updateMenuItem(id: string, updates: Partial<MenuItem>) {
    const index = this.data.menuItems.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.data.menuItems[index] = {
      ...this.data.menuItems[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.menuItems[index];
  }

  public deleteMenuItem(id: string) {
    const index = this.data.menuItems.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.data.menuItems.splice(index, 1);
    this.save();
    return true;
  }

  // Menu Categories
  public getMenuCategories() {
    return this.data.menuCategories;
  }

  public createMenuCategory(cat: Omit<MenuCategory, 'id'>) {
    const newCat: MenuCategory = { ...cat, id: `cat-${Date.now()}` };
    this.data.menuCategories.push(newCat);
    this.save();
    return newCat;
  }

  public updateMenuCategory(id: string, updates: Partial<MenuCategory>) {
    const index = this.data.menuCategories.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.menuCategories[index] = { ...this.data.menuCategories[index], ...updates };
    this.save();
    return this.data.menuCategories[index];
  }

  public deleteMenuCategory(id: string) {
    const index = this.data.menuCategories.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.data.menuCategories.splice(index, 1);
    this.save();
    return true;
  }

  // Blog Posts
  public getBlogPosts() {
    return this.data.blogPosts;
  }

  public getBlogPostBySlug(slug: string) {
    return this.data.blogPosts.find(p => p.slug === slug);
  }

  public getBlogPostById(id: string) {
    return this.data.blogPosts.find(p => p.id === id);
  }

  public createBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'> & { publishedAt?: string }) {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      publishedAt: post.publishedAt || now,
      updatedAt: now
    };
    this.data.blogPosts.unshift(newPost);
    this.save();
    return newPost;
  }

  public updateBlogPost(id: string, updates: Partial<BlogPost>) {
    const index = this.data.blogPosts.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.blogPosts[index] = {
      ...this.data.blogPosts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.blogPosts[index];
  }

  public deleteBlogPost(id: string) {
    const index = this.data.blogPosts.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.data.blogPosts.splice(index, 1);
    this.save();
    return true;
  }

  // Blog Categories
  public getBlogCategories() {
    return this.data.blogCategories;
  }

  // Case Studies
  public getCaseStudies() {
    return this.data.caseStudies;
  }

  public getCaseStudyBySlug(slug: string) {
    return this.data.caseStudies.find(cs => cs.slug === slug);
  }

  public createCaseStudy(cs: Omit<CaseStudy, 'id'>) {
    const newCs: CaseStudy = { ...cs, id: `cs-${Date.now()}` };
    this.data.caseStudies.unshift(newCs);
    this.save();
    return newCs;
  }

  public updateCaseStudy(id: string, updates: Partial<CaseStudy>) {
    const index = this.data.caseStudies.findIndex(cs => cs.id === id);
    if (index === -1) return null;
    this.data.caseStudies[index] = { ...this.data.caseStudies[index], ...updates };
    this.save();
    return this.data.caseStudies[index];
  }

  public deleteCaseStudy(id: string) {
    const index = this.data.caseStudies.findIndex(cs => cs.id === id);
    if (index === -1) return false;
    this.data.caseStudies.splice(index, 1);
    this.save();
    return true;
  }

  // Keyword Clusters
  public getKeywordClusters() {
    return this.data.keywordClusters;
  }

  public createKeywordCluster(cluster: Omit<KeywordCluster, 'id'>) {
    const newCluster: KeywordCluster = { ...cluster, id: `kc-${Date.now()}` };
    this.data.keywordClusters.push(newCluster);
    this.save();
    return newCluster;
  }

  public updateKeywordCluster(id: string, updates: Partial<KeywordCluster>) {
    const index = this.data.keywordClusters.findIndex(k => k.id === id);
    if (index === -1) return null;
    this.data.keywordClusters[index] = { ...this.data.keywordClusters[index], ...updates };
    this.save();
    return this.data.keywordClusters[index];
  }

  public deleteKeywordCluster(id: string) {
    const index = this.data.keywordClusters.findIndex(k => k.id === id);
    if (index === -1) return false;
    this.data.keywordClusters.splice(index, 1);
    this.save();
    return true;
  }

  // Competitor Research
  public getCompetitors() {
    return this.data.competitors;
  }

  public createCompetitor(comp: Omit<CompetitorResearch, 'id'>) {
    const newComp: CompetitorResearch = { ...comp, id: `comp-${Date.now()}` };
    this.data.competitors.push(newComp);
    this.save();
    return newComp;
  }

  public updateCompetitor(id: string, updates: Partial<CompetitorResearch>) {
    const index = this.data.competitors.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.competitors[index] = { ...this.data.competitors[index], ...updates };
    this.save();
    return this.data.competitors[index];
  }

  public deleteCompetitor(id: string) {
    const index = this.data.competitors.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.data.competitors.splice(index, 1);
    this.save();
    return true;
  }

  // Backlinks
  public getBacklinks() {
    return this.data.backlinks;
  }

  public createBacklink(bl: Omit<BacklinkItem, 'id'>) {
    const newBl: BacklinkItem = { ...bl, id: `bl-${Date.now()}` };
    this.data.backlinks.push(newBl);
    this.save();
    return newBl;
  }

  public updateBacklink(id: string, updates: Partial<BacklinkItem>) {
    const index = this.data.backlinks.findIndex(b => b.id === id);
    if (index === -1) return null;
    this.data.backlinks[index] = { ...this.data.backlinks[index], ...updates };
    this.save();
    return this.data.backlinks[index];
  }

  public deleteBacklink(id: string) {
    const index = this.data.backlinks.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.data.backlinks.splice(index, 1);
    this.save();
    return true;
  }

  // SEO Settings
  public getSEOSettings() {
    return this.data.seoSettings;
  }

  public updateSEOSettings(updates: Partial<SEOSettings>) {
    this.data.seoSettings = {
      ...this.data.seoSettings,
      ...updates
    };
    this.save();
    return this.data.seoSettings;
  }

  // Redirects
  public getRedirects() {
    return this.data.seoSettings.redirects || [];
  }

  public createRedirect(rule: Omit<RedirectRule, 'id' | 'hits'>) {
    const newRule: RedirectRule = {
      ...rule,
      id: `red-${Date.now()}`,
      hits: 0
    };
    if (!this.data.seoSettings.redirects) this.data.seoSettings.redirects = [];
    this.data.seoSettings.redirects.push(newRule);
    this.save();
    return newRule;
  }

  public updateRedirect(id: string, updates: Partial<RedirectRule>) {
    const redirects = this.data.seoSettings.redirects || [];
    const index = redirects.findIndex(r => r.id === id);
    if (index === -1) return null;
    redirects[index] = { ...redirects[index], ...updates };
    this.save();
    return redirects[index];
  }

  public deleteRedirect(id: string) {
    const redirects = this.data.seoSettings.redirects || [];
    const index = redirects.findIndex(r => r.id === id);
    if (index === -1) return false;
    redirects.splice(index, 1);
    this.save();
    return true;
  }

  public incrementRedirectHit(id: string) {
    const redirects = this.data.seoSettings.redirects || [];
    const rule = redirects.find(r => r.id === id);
    if (rule) {
      rule.hits = (rule.hits || 0) + 1;
      rule.lastAccessed = new Date().toISOString();
      this.save();
    }
  }

  // Analytics
  public getAnalytics() {
    return this.data.analytics;
  }
}

export const db = new DatabaseManager();
