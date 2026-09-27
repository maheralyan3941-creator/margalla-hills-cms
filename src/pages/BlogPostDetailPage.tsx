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

  // CRITICAL: Table of Contents generator must ALWAYS run before any conditional return!
  const tableOfContents = useMemo(() => {
    if (!post || !post.content) return [];
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
  }, [post?.content]);

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
      name: 'Margalla Hills Artisanal Kitchen',
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

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10">
      <SEOHead
        seo={postSEO}
        schemaData={schemaArticle}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              {post.category.replace(/-/g, ' ')}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTimeMinutes} min read
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-neutral-700"
            />
            <div>
              <div className="text-sm font-semibold text-white">{post.author.name}</div>
              <div className="text-xs text-slate-400">{post.author.role}</div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src={post.featuredImage}
              alt={post.imageAltText || post.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <div className="mb-10 p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Table of Contents</span>
            </div>
            <ul className="space-y-2 text-xs">
              {tableOfContents.map((item, idx) => (
                <li key={idx} className={item.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    className="text-slate-400 hover:text-amber-400 transition"
                  >
                    • {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Markdown */}
        <div className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
          <Markdown>{post.content}</Markdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((t, i) => (
              <span key={i} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-slate-400">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-800">
            <h3 className="text-lg font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/blog/${rp.slug}`)}
                  className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 hover:border-amber-500/40 transition cursor-pointer"
                >
                  <div className="text-xs text-amber-400 font-mono mb-1">{rp.category}</div>
                  <h4 className="text-xs font-semibold text-white line-clamp-2">{rp.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
