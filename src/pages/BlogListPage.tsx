import React, { useState, useMemo, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { BlogPost, BlogCategory } from '../types';
import { api } from '../lib/api';
import { Search, BookOpen, Clock, ChevronRight, Sparkles, Tag, User } from 'lucide-react';

interface BlogListPageProps {
  navigate: (path: string) => void;
  posts?: BlogPost[];
  categories?: BlogCategory[];
}

export function BlogListPage({ navigate, posts: initialPosts, categories: initialCats }: BlogListPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [categories, setCategories] = useState<BlogCategory[]>(initialCats || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      api.getBlogPosts().then(setPosts).catch(() => {});
    }
    if (!initialCats || initialCats.length === 0) {
      api.getBlogCategories().then(setCategories).catch(() => {});
    }
  }, [initialPosts, initialCats]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.status !== 'published') return false;
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const tags = post.tags || [];
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const blogSEO = {
    seoTitle: 'SEO & Culinary Knowledge Base | Saffron & Sage Lab',
    metaDescription: 'In-depth guides on Restaurant SEO, local pack ranking, schema optimization, and artisanal gastronomy insights.',
    slug: 'blog',
    focusKeyword: 'restaurant seo guide',
    secondaryKeywords: ['local seo hospitality', 'structured data restaurant', 'culinary content marketing'],
    canonicalUrl: '/blog',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'SEO & Culinary Knowledge Base - Saffron & Sage',
    ogDescription: 'Actionable SEO case studies and gastronomy articles.',
    ogImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Blog' as const,
    searchIntent: 'Informational' as const
  };

  const schemaBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Saffron & Sage SEO & Culinary Blog',
    description: 'Expert analysis on modern technical SEO, local pack dominance, and artisanal culinary arts.',
    url: '/blog'
  };

  const blogContentAudit = `# SEO & Culinary Knowledge Base
Master the art of high-ranking restaurant SEO through real-world experiments and technical architecture.
## Recent Guides & Industry Research
Explore our comprehensive collection of actionable tutorials covering schema markup, keyword clustering, and local pack ranking.
### Educational SEO Lab
All articles include live on-page metadata auditing and structured JSON-LD schemas.`;

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-12">
      <SEOHead
        seo={blogSEO}
        schemaData={schemaBlog}
        contentForAudit={blogContentAudit}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <BookOpen className="w-3.5 h-3.5" />
            <span>Informational Search Intent &bull; Topical Authority</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            SEO &amp; Culinary Knowledge Base
          </h1>
          <p className="text-base text-slate-400 mt-3 leading-relaxed">
            Practical tutorials and enterprise benchmarks on local pack domination, structured data schemas, and high-converting restaurant marketing.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-[#121212] p-4 sm:p-6 rounded-2xl border border-slate-800 mb-10 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials, schema guides, keywords..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0A0A0A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'bg-[#0A0A0A] text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : 'bg-[#0A0A0A] text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#121212] rounded-2xl border border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No publications matched your query</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting search keywords or category filters.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-emerald-500 text-black text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => {
                  const cleanSlug = (post.slug || '').replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
                  navigate(`/blog/${cleanSlug}`);
                }}
                className="bg-[#121212] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 shadow-sm hover:shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.imageAltText || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider font-mono">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-mono">
                      <span>{post.publishedAt.split('T')[0]}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" /> {post.readTimeMinutes} min read
                      </span>
                    </div>

                    <h2 className="font-serif text-lg font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                      {post.h1_title || post.title}
                    </h2>

                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                      {post.meta_desc || post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {(post.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-[#0A0A0A] text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5 text-emerald-400" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'}
                      alt={post.author?.name || 'Muhammad Abid'}
                      className="w-6 h-6 rounded-full object-cover border border-slate-700"
                    />
                    <span className="font-medium text-slate-300">{post.author?.name || 'Muhammad Abid'}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
