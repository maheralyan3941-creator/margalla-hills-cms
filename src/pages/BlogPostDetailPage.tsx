import React, { useMemo, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { SEOHead } from '../components/SEOHead';
import { BlogPost } from '../types';
import { api } from '../lib/api';
import { Clock, Calendar, ArrowLeft, Tag, User, Share2, ChevronRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface BlogPostDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  posts?: BlogPost[];
}

export function BlogPostDetailPage({ slug, navigate, posts: initialPosts }: BlogPostDetailPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      const found = initialPosts.find(p => p.slug === slug);
      setPost(found || null);
    } else {
      api.getBlogPosts().then(allPosts => {
        setPosts(allPosts);
        const found = allPosts.find(p => p.slug === slug);
        setPost(found || null);
      }).catch(() => {});
    }
  }, [slug, initialPosts]);

  if (!post) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">Article Not Found</h1>
          <p className="text-sm text-slate-400 mt-2">The requested SEO publication does not exist or has been relocated.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs cursor-pointer"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  const postSEO = post.seo || {
    seoTitle: `${post.title} | Saffron & Sage SEO Lab`,
    metaDescription: post.excerpt,
    slug: post.slug,
    focusKeyword: post.tags[0] || 'restaurant seo',
    secondaryKeywords: post.tags,
    canonicalUrl: `/blog/${post.slug}`,
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogImage: post.featuredImage,
    schemaType: 'Article' as const,
    searchIntent: 'Informational' as const
  };

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saffron & Sage Artisanal Kitchen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${post.slug}`
    }
  };

  const relatedPosts = posts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  // Table of Contents generator from Markdown H2 and H3
  const tableOfContents = useMemo(() => {
    const lines = post.content.split('\n');
    const toc: { text: string; level: number; id: string }[] = [];
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        toc.push({ text, level: 2, id: text.toLowerCase().replace(/[^\w]+/g, '-') });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        toc.push({ text, level: 3, id: text.toLowerCase().replace(/[^\w]+/g, '-') });
      }
    });
    return toc;
  }, [post.content]);

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10">
      <SEOHead
        seo={postSEO}
        schemaData={schemaArticle}
        contentForAudit={post.content}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-emerald-400 cursor-pointer">Home</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/blog')} className="hover:text-emerald-400 cursor-pointer">Blog</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/blog')} className="capitalize hover:text-emerald-400 cursor-pointer">{post.category}</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-xs">{post.title}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-8">
            <article className="bg-[#121212] rounded-3xl border border-slate-800 shadow-sm p-6 sm:p-10 lg:p-12">
              {/* Category & Date Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mb-4">
                <span className="px-3 py-1 bg-black/80 border border-white/10 text-emerald-400 rounded-md font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Published: {post.publishedAt.split('T')[0]}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> {post.readTimeMinutes} min read
                </span>
              </div>

              {/* Title & Excerpt */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              <p className="text-base text-slate-400 mt-4 leading-relaxed font-sans pb-6 border-b border-slate-800">
                {post.excerpt}
              </p>

              {/* Featured Image */}
              <div className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
                <img
                  src={post.featuredImage}
                  alt={post.imageAltText || post.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
                {post.imageAltText && (
                  <div className="px-4 py-2 bg-[#0A0A0A] text-[11px] text-slate-400 font-mono border-t border-slate-800 flex items-center justify-between">
                    <span>ALT Text: {post.imageAltText}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> SEO Optimized
                    </span>
                  </div>
                )}
              </div>

              {/* Markdown Content Body */}
              <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-white prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-sm prose-li:text-slate-300 prose-strong:text-white prose-a:text-emerald-400 hover:prose-a:underline">
                <Markdown>{post.content}</Markdown>
              </div>

              {/* Article Tags */}
              <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase font-mono mr-2">Target Keywords:</span>
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-[#0A0A0A] text-slate-300 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-400" /> {tag}
                  </span>
                ))}
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 bg-[#0A0A0A] rounded-2xl border border-slate-800 flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.author.name}</h4>
                  <p className="text-xs text-emerald-400 font-medium">{post.author.role}</p>
                  <p className="text-xs text-slate-400 mt-1">Specialist in modern Technical SEO architecture and structured data integration.</p>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents Box */}
            {tableOfContents.length > 0 && (
              <div className="bg-[#121212] p-6 rounded-2xl border border-slate-800 shadow-sm sticky top-24">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Table of Contents
                </h3>
                <nav className="space-y-2 text-xs">
                  {tableOfContents.map((item, idx) => (
                    <div
                      key={idx}
                      className={`text-slate-400 hover:text-emerald-400 font-medium transition cursor-default ${
                        item.level === 3 ? 'pl-4 text-slate-500' : ''
                      }`}
                    >
                      {item.level === 2 ? '• ' : '- '} {item.text}
                    </div>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-serif font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow"
                  >
                    <span>Reserve Dining Experience</span>
                  </button>
                </div>
              </div>
            )}

            {/* Related Publications */}
            {relatedPosts.length > 0 && (
              <div className="bg-[#121212] p-6 rounded-2xl border border-slate-800 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
                  Related Publications
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.id}
                      onClick={() => navigate(`/blog/${rPost.slug}`)}
                      className="group cursor-pointer flex gap-3 items-start"
                    >
                      <img
                        src={rPost.featuredImage}
                        alt={rPost.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800 group-hover:opacity-90"
                      />
                      <div>
                        <h4 className="font-serif text-xs font-bold text-white group-hover:text-emerald-400 transition line-clamp-2">
                          {rPost.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block mt-1">
                          {rPost.publishedAt.split('T')[0]} &bull; {rPost.readTimeMinutes}m read
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
