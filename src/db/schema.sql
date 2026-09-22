-- ==============================================================================
-- MARGALLA HILLS - NEON POSTGRESQL COMPLETE DATABASE SCHEMA
-- Compatible with Neon Serverless Postgres, Supabase, and Standard PostgreSQL
-- ==============================================================================

-- 1. Core Operational & Lead Tables
CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(64) NOT NULL,
    guests INTEGER DEFAULT 2,
    date DATE NOT NULL,
    time VARCHAR(32) NOT NULL,
    experience VARCHAR(128) DEFAULT 'Artisanal Dinner',
    location VARCHAR(128) DEFAULT 'Margalla Hills Flagship',
    notes TEXT,
    status VARCHAR(32) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS catering_inquiries (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    city VARCHAR(128) NOT NULL,
    event_type VARCHAR(128) DEFAULT 'Gala Dinner',
    guest_count INTEGER DEFAULT 50,
    event_date DATE,
    budget VARCHAR(64),
    dietary_notes TEXT,
    status VARCHAR(32) DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts_and_leads (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(64),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(64) DEFAULT 'website_footer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 2. COMPLETE SEO ADMIN PANEL TABLES (Neon PostgreSQL)
-- ==============================================================================

-- 2.1 Users & RBAC (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'SUPER_ADMIN', -- SUPER_ADMIN, ADMIN, EDITOR
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2.2 Keywords Table (Keyword Research Section)
CREATE TABLE IF NOT EXISTS keywords (
    id VARCHAR(64) PRIMARY KEY,
    cluster_name VARCHAR(128) DEFAULT 'General',
    keyword VARCHAR(255) NOT NULL,
    volume VARCHAR(64) DEFAULT '1.2k',
    kd INTEGER DEFAULT 25, -- Keyword Difficulty (0-100)
    intent VARCHAR(64) DEFAULT 'Commercial', -- Informational, Commercial, Transactional, Navigational
    target_page VARCHAR(255) DEFAULT '/',
    status VARCHAR(64) DEFAULT 'Targeted', -- Targeted, Ranking, Under Optimization, Ideation
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.3 Competitors Table (Competitor SEO Research Section)
CREATE TABLE IF NOT EXISTS competitors (
    id VARCHAR(64) PRIMARY KEY,
    competitor_name VARCHAR(255) NOT NULL,
    competitor_url VARCHAR(512) NOT NULL,
    ranking_keyword VARCHAR(255),
    target_page VARCHAR(255),
    estimated_rank INTEGER DEFAULT 3,
    their_strengths TEXT,
    content_gap_opportunity TEXT,
    backlinks_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.4 Posts & CMS Table (Content SEO & Topical Authority)
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(128) DEFAULT 'Gastronomy & Terroir',
    featured_image VARCHAR(512),
    image_alt_text VARCHAR(255),
    focus_keyword VARCHAR(255),
    seo_title VARCHAR(255),
    meta_description TEXT,
    canonical_url VARCHAR(512),
    schema_type VARCHAR(64) DEFAULT 'BlogPosting',
    search_intent VARCHAR(64) DEFAULT 'Informational',
    author_name VARCHAR(128) DEFAULT 'Chef Marcus Sterling',
    read_time_minutes INTEGER DEFAULT 6,
    status VARCHAR(32) DEFAULT 'published',
    faq_items JSONB DEFAULT '[]'::jsonb,
    entity_mentions JSONB DEFAULT '[]'::jsonb,
    internal_links JSONB DEFAULT '[]'::jsonb,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.5 Pages Table (On-Page SEO Manager for all website pages)
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(64) PRIMARY KEY,
    page_path VARCHAR(255) UNIQUE NOT NULL,
    page_name VARCHAR(255) NOT NULL,
    seo_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    canonical_url VARCHAR(512),
    h1_heading VARCHAR(255),
    h2_headings JSONB DEFAULT '[]'::jsonb,
    h3_headings JSONB DEFAULT '[]'::jsonb,
    image_alt_text VARCHAR(255),
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(512),
    schema_type VARCHAR(64) DEFAULT 'WebPage',
    search_intent VARCHAR(64) DEFAULT 'Commercial',
    robots_index BOOLEAN DEFAULT TRUE,
    robots_follow BOOLEAN DEFAULT TRUE,
    faq_section JSONB DEFAULT '[]'::jsonb,
    hreflang_tags JSONB DEFAULT '{"en": "", "en-pk": "", "ur": ""}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.6 301/302 Redirects Table (Technical SEO)
CREATE TABLE IF NOT EXISTS redirects (
    id VARCHAR(64) PRIMARY KEY,
    source VARCHAR(512) UNIQUE NOT NULL,
    destination VARCHAR(512) NOT NULL,
    type INTEGER DEFAULT 301,
    active BOOLEAN DEFAULT TRUE,
    hits INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP WITH TIME ZONE
);

-- 2.7 Backlinks Table (Off-Page SEO & Link Building Tracker)
CREATE TABLE IF NOT EXISTS backlinks (
    id VARCHAR(64) PRIMARY KEY,
    referring_domain VARCHAR(255) NOT NULL,
    source_url VARCHAR(512) NOT NULL,
    target_page_url VARCHAR(512) NOT NULL,
    anchor_text VARCHAR(255) NOT NULL,
    link_type VARCHAR(32) DEFAULT 'dofollow', -- dofollow, nofollow, sponsored, ugc
    domain_rating INTEGER DEFAULT 45,
    status VARCHAR(32) DEFAULT 'Active', -- Active, Lost, Pending, Rejected
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.8 Topic Clusters Table (Topical Authority & Semantic SEO)
CREATE TABLE IF NOT EXISTS topic_clusters (
    id VARCHAR(64) PRIMARY KEY,
    pillar_topic VARCHAR(255) NOT NULL,
    sub_topics JSONB DEFAULT '[]'::jsonb,
    target_url VARCHAR(255) NOT NULL,
    intent VARCHAR(64) DEFAULT 'Informational',
    status VARCHAR(64) DEFAULT 'Targeted',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.9 Local SEO & Google My Business Profile
CREATE TABLE IF NOT EXISTS local_seo (
    id VARCHAR(64) PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL DEFAULT 'Margalla Hills Luxury Dining & Resort',
    phone VARCHAR(64) DEFAULT '+92 329 4785579',
    email VARCHAR(255) DEFAULT 'concierge@margallahills.com',
    street_address VARCHAR(255) DEFAULT 'Pir Sohawa Road, Margalla Hills',
    city VARCHAR(128) DEFAULT 'Islamabad',
    state_province VARCHAR(128) DEFAULT 'Islamabad Capital Territory',
    postal_code VARCHAR(32) DEFAULT '44000',
    country VARCHAR(64) DEFAULT 'Pakistan',
    latitude NUMERIC(10, 6) DEFAULT 33.7483,
    longitude NUMERIC(10, 6) DEFAULT 73.0645,
    google_maps_url VARCHAR(512) DEFAULT 'https://maps.google.com/?q=Margalla+Hills+Islamabad',
    google_place_id VARCHAR(128) DEFAULT 'ChIJ4z_Margalla_Hills_PK',
    opening_hours JSONB DEFAULT '["Monday-Sunday: 12:00 PM - 12:00 AM"]'::jsonb,
    location_pages JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.10 Programmatic SEO & Large-Site Templates
CREATE TABLE IF NOT EXISTS programmatic_templates (
    id VARCHAR(64) PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    keyword_pattern VARCHAR(255) NOT NULL,
    city_list JSONB DEFAULT '[]'::jsonb,
    template_title VARCHAR(255) NOT NULL,
    template_meta_desc TEXT NOT NULL,
    generated_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.11 Analytics & Master Integration Settings
CREATE TABLE IF NOT EXISTS analytics_settings (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'primary_config',
    ga4_id VARCHAR(64) DEFAULT 'G-MARGALLA123',
    gsc_verification VARCHAR(255) DEFAULT 'google-site-verification=margalla_hills_seo_verified',
    facebook_pixel_id VARCHAR(64) DEFAULT 'FB-PIXEL-987654321',
    clarity_id VARCHAR(64) DEFAULT 'clarity_mgh_882',
    sitemap_auto_generate BOOLEAN DEFAULT TRUE,
    robots_txt_content TEXT DEFAULT 'User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://margallahills.com/sitemap.xml',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. High Performance Query Indexes
CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_pages_path ON pages(page_path);
CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects(source);
CREATE INDEX IF NOT EXISTS idx_backlinks_domain ON backlinks(referring_domain);
