export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  twoFactorEnabled?: boolean;
}

export type SearchIntent = 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
export type SchemaType =
  | 'Restaurant'
  | 'LocalBusiness'
  | 'ItemPage'
  | 'Article'
  | 'BlogPosting'
  | 'BreadcrumbList'
  | 'WebSite'
  | 'FAQPage'
  | 'Organization'
  | 'Menu'
  | 'MenuItem'
  | 'Recipe'
  | 'AboutPage'
  | 'ContactPage'
  | 'ImageGallery'
  | 'CollectionPage'
  | 'Service'
  | 'TechArticle'
  | 'WebPage'
  | 'Blog';

export interface SEOMetadata {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  searchIntent: SearchIntent;
}

export type DietaryBadge = 'vegetarian' | 'vegan' | 'gluten_free' | 'chef_special' | 'spicy' | 'halal' | 'pescatarian' | 'dairy_free';

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  calories?: number;
  preparationTimeMinutes?: number;
  image: string;
  altText: string;
  dietary: DietaryBadge[];
  isFeatured: boolean;
  status: 'published' | 'draft';
  seo: SEOMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  coverImage?: string;
  imageAltText?: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  status?: 'published' | 'draft' | 'scheduled';
  publishedAt?: string;
  updatedAt?: string;
  readTimeMinutes?: number;
  relatedPostIds?: string[];
  seo?: SEOMetadata;
  focusKeyword?: string;
  metaDescription?: string;
  schemaType?: SchemaType;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  projectName: string;
  slug: string;
  summary: string;
  targetKeywords: string[];
  problem: string;
  strategy: string;
  actionsTaken: string[];
  results: {
    metric: string;
    before: string;
    after: string;
    change: string;
  }[];
  keyTakeaways: string[];
  screenshotUrl: string;
  date: string;
  published: boolean;
  seo: SEOMetadata;
}

export interface KeywordCluster {
  id: string;
  clusterName: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  intent: SearchIntent;
  volumeTier: 'High (10k+)' | 'Medium (1k-10k)' | 'Low (<1k)';
  difficulty: 'Easy (0-30)' | 'Medium (31-60)' | 'Hard (61+)';
  mappedPageUrl: string;
  notes: string;
  status: 'Targeted' | 'Ranking' | 'Under Optimization' | 'Ideation';
}

export interface CompetitorResearch {
  id: string;
  competitorName: string;
  competitorUrl: string;
  rankingKeyword: string;
  targetPage: string;
  estimatedRank: number;
  theirStrengths: string;
  contentGapOpportunity: string;
  ourCounterStrategy: string;
  updatedAt: string;
}

export interface BacklinkItem {
  id: string;
  referringDomain: string;
  sourceUrl: string;
  targetPageUrl: string;
  anchorText: string;
  linkType: 'dofollow' | 'nofollow' | 'sponsored' | 'ugc';
  domainRating: number;
  status: 'Active' | 'Lost' | 'Pending' | 'Rejected';
  notes: string;
  dateAdded: string;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  type: 301 | 302;
  active: boolean;
  hits: number;
  lastAccessed?: string;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  priceRange: string;
  cuisineType: string;
  openingHours: string[];
  googleMapsUrl: string;
  googlePlaceId: string;
}

export interface SEOSettings {
  siteName: string;
  siteUrl: string;
  tagline: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  businessInfo: BusinessInfo;
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  robotsTxtContent: string;
  redirects: RedirectRule[];
  isDemoNoticeEnabled: boolean;
}

export interface AnalyticsSummary {
  dateRange: string;
  totalClicks: number;
  totalImpressions: number;
  averageCtr: number;
  averagePosition: number;
  clickGrowthPercent: number;
  dailyData: { date: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topQueries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topPages: { url: string; clicks: number; impressions: number; ctr: number; position: number }[];
}

export interface SEOAuditResult {
  score: number;
  passed: string[];
  warnings: string[];
  errors: string[];
  wordCount: number;
  headingCounts: { h1: number; h2: number; h3: number; h4: number };
  keywordDensity: number;
  keywordCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  imagesWithAltCount: number;
  imagesWithoutAltCount: number;
  titleLength: number;
  descriptionLength: number;
}

// ==============================================================================
// 13 COMPLETE SEO ADMIN PANEL MODULE TYPES
// ==============================================================================

// Module 2: Keyword Research
export interface KeywordItem {
  id: string;
  clusterName: string;
  keyword: string;
  volume: string;
  kd: number; // Keyword Difficulty 0-100
  intent: SearchIntent;
  targetPage: string;
  status: 'Targeted' | 'Ranking' | 'Under Optimization' | 'Ideation';
  notes: string;
  createdAt: string;
}

// Module 3: Competitor SEO Research
export interface CompetitorSEOItem {
  id: string;
  competitorName: string;
  competitorUrl: string;
  rankingKeyword: string;
  targetPage: string;
  estimatedRank: number;
  theirStrengths: string;
  contentGapOpportunity: string;
  backlinksNote: string;
  updatedAt: string;
}

// Module 4: On-Page SEO Manager
export interface PageSEOItem {
  id: string;
  path: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  h1Heading: string;
  h2Headings: string[];
  h3Headings: string[];
  imageAltText: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  searchIntent: SearchIntent;
  robotsIndex: boolean;
  robotsFollow: boolean;
  faqSection: { question: string; answer: string }[];
  hreflangTags: { en: string; 'en-pk': string; ur: string };
  updatedAt: string;
}

// Module 5: Topical Authority & Entities
export interface TopicClusterItem {
  id: string;
  pillarTopic: string;
  subTopics: string[];
  targetUrl: string;
  intent: SearchIntent;
  status: 'Pillar Published' | 'Clustering in Progress' | 'Planned';
  notes: string;
}

export interface EntityTrackerItem {
  id: string;
  entityName: string;
  entityType: string;
  wikiUrl?: string;
  relevanceScore: number;
  associatedKeywords: string[];
  recognizedOccurrences: number;
}

// Module 8: Local SEO Profile
export interface LocalSEOProfile {
  businessName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  googlePlaceId: string;
  openingHours: string[];
  locationPages: { name: string; slug: string; targetKeyword: string; active: boolean }[];
}

// Module 9: Programmatic SEO Template
export interface ProgrammaticTemplate {
  id: string;
  templateName: string;
  keywordPattern: string; // e.g. "Best Fine Dining in {city}"
  cities: string[];
  templateTitle: string;
  templateMetaDesc: string;
  generatedCount: number;
}

// Module 11: Content Pruning
export interface PruningItem {
  id: string;
  url: string;
  title: string;
  monthlyImpressions: number;
  monthlyClicks: number;
  bounceRate: number;
  lastUpdated: string;
  status: 'active' | 'under_review' | 'redirected' | 'pruned';
  suggestedAction: 'Update Content' | '301 Redirect' | 'Add Canonical' | 'Noindex / Prune';
}

// Module 12: SaaS / Commercial SEO
export interface ComparisonTableRow {
  id: string;
  feature: string;
  margallaHills: string;
  competitorA: string;
  competitorB: string;
  highlight: boolean;
}

// Module 13: Master Analytics Integrations
export interface MasterAnalyticsConfig {
  ga4Id: string;
  googleSearchConsoleVerification: string;
  facebookPixelId: string;
  clarityId: string;
  sitemapAutoGenerate: boolean;
  robotsTxtContent: string;
}

// Live URL Indexing & Submission Hub
export interface IndexingSubmissionItem {
  id: string;
  url: string;
  submittedAt: string;
  methods: string[];
  status: 'Success' | 'Inspected' | 'Pending';
  responseNote?: string;
}

// Module 14: System Health, Security, & DevOps Hardening
export interface SecurityIncident {
  id: string;
  timestamp: string;
  ip: string;
  type: 'SQL_INJECTION' | 'XSS_ATTACK' | 'BRUTE_FORCE' | 'BAD_BOT' | 'RATE_LIMIT';
  path: string;
  payload: string;
  actionTaken: 'BLOCKED_403' | 'RATE_LIMITED_429' | 'IP_BANNED';
  userAgent?: string;
}

export interface Crawl404Log {
  id: string;
  url: string;
  referrer?: string;
  userAgent?: string;
  timestamp: string;
  count: number;
}

export interface BackupSnapshot {
  id: string;
  timestamp: string;
  sizeBytes: number;
  type: 'AUTOMATED_DAILY' | 'MANUAL_SNAPSHOT';
  status: 'COMPLETED' | 'IN_PROGRESS';
  pitrAvailable: boolean;
}

export interface SystemHealthReport {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C';
  domain: string;
  dnsStatus: 'VERIFIED' | 'PENDING' | 'ERROR';
  sslStatus: 'ACTIVE_AUTO_RENEW' | 'EXPIRING' | 'ERROR';
  sslIssuer: string;
  sslExpiresDays: number;
  hstsEnabled: boolean;
  cspEnabled: boolean;
  wafStatus: 'ACTIVE_SHIELD' | 'DISABLED';
  dbStatus: 'CONNECTED' | 'FALLBACK';
  dbType: 'Neon PostgreSQL' | 'In-Memory Cache';
  lastBackupTime: string;
  pitrWindowDays: number;
  totalProgrammaticPages: number;
  sitemapIndexedUrls: number;
  cloudRunConfig: {
    minInstances: number;
    maxInstances: number;
    concurrency: number;
    region: string;
  };
}

export interface BrokenLinkReport {
  url: string;
  parentPage: string;
  status: number;
  error?: string;
}

