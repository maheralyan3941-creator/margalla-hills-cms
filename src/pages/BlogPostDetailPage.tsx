import React, { useMemo, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SEOHead } from '../components/SEOHead';
import { BlogPost } from '../types';
import { api } from '../lib/api';
import { cleanAndFormatPastedHtml, isHtmlContent } from '../lib/richTextCleaner';
import { Clock, Calendar, ArrowLeft, Tag, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

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

  // Check if content is HTML from rich text / Google Docs paste
  const isHtml = useMemo(() => {
    if (!post?.content) return false;
    return isHtmlContent(post.content);
  }, [post?.content]);

  // Cleaned and enhanced HTML for direct rendering
  const processedHtmlContent = useMemo(() => {
    if (!post || !post.content || !isHtml) return '';
    const cleaned = cleanAndFormatPastedHtml(post.content);
    // Assign unique IDs to H2 and H3 tags for smooth table-of-contents scrolling
    return cleaned.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, inner) => {
      if (/id=/i.test(attrs)) return match;
      const plainText = inner.replace(/<[^>]+>/g, '').trim();
      const id = plainText.toLowerCase().replace(/[^\w]+/g, '-');
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    });
  }, [post?.content, isHtml]);

  // Smart formatted content fallback: if user pasted plain text without markdown hashes, detect headings automatically
  const formattedContent = useMemo(() => {
    if (!post || !post.content || isHtml) return '';
    const raw = post.content;
    const lines = raw.split('\n');
    const result: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmedLine = line.trim();

      // Skip truly empty lines but use them to push a break
      if (!trimmedLine) {
        if (result.length > 0 && result[result.length - 1] !== '') {
          result.push('');
        }
        continue;
      }

      // Normalize bullet characters like • to standard markdown bullet -
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('●') || trimmedLine.startsWith('▪')) {
        line = '- ' + trimmedLine.substring(1).trim();
      }

      const isHeading = /^#{1,6}\s+/.test(trimmedLine);
      const isList = /^[\-\*\+]\s+/.test(trimmedLine) || /^\d+[\.\)]\s+/.test(trimmedLine);
      const isTable = trimmedLine.startsWith('|');

      // Auto-heading detection for plain text
      if (!isHeading && !isList && !isTable) {
        // Numbered items like 1. Tuscany Courtyard or 1) Tuscany Courtyard or "5 Tested Best..."
        if (/^\d+[\.\)]\s+/.test(trimmedLine) && trimmedLine.length < 80 && !trimmedLine.endsWith('.')) {
          result.push(`## ${trimmedLine}`);
          result.push('');
          continue;
        }

        const subHeadingKeywords = ['pros:', 'cons:', 'what to eat:', 'what to check:', 'best for:', 'atmosphere:', 'verdict:', 'highlights:', 'conclusion:'];
        if (subHeadingKeywords.some(k => trimmedLine.toLowerCase().startsWith(k))) {
          result.push(`### ${trimmedLine}`);
          result.push('');
          continue;
        }

        if (
          trimmedLine.length > 3 &&
          trimmedLine.length < 65 &&
          !trimmedLine.endsWith('.') &&
          !trimmedLine.endsWith(',') &&
          (i === 0 || lines[i - 1].trim() === '')
        ) {
          result.push(`## ${trimmedLine}`);
          result.push('');
          continue;
        }
      }

      // If it's a structural element, just push it
      if (isHeading || isList || isTable) {
        result.push(line);
      } else {
        result.push(line);
        result.push(''); 
      }
    }
    return result.join('\n');
  }, [post?.content, isHtml]);

  // Table of Contents generator from HTML and Markdown H2 and H3
  const tableOfContents = useMemo(() => {
    if (!post || !post.content) return [];
    const toc: { text: string; level: number; id: string }[] = [];

    if (isHtml) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');
      headings.forEach((h) => {
        const text = h.textContent?.trim() || '';
        if (text) {
          const level = h.tagName.toLowerCase() === 'h2' ? 2 : 3;
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          toc.push({ text, level, id });
        }
      });
      return toc;
    }

    if (formattedContent) {
      const lines = formattedContent.split("\n");
      lines.forEach(line => {
        if (line.startsWith("## ")) {
          const text = line.replace("## ", "").trim();
          toc.push({ text, level: 2, id: text.toLowerCase().replace(/[^\w]+/g, "-") });
        } else if (line.startsWith("### ")) {
          const text = line.replace("### ", "").trim();
          toc.push({ text, level: 3, id: text.toLowerCase().replace(/[^\w]+/g, "-") });
        }
      });
    }

    return toc;
  }, [post?.content, isHtml, formattedContent]);

  if (!post) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">Article Not Found</h1>
          <p className="text-sm text-slate-400 mt-2">The requested publication does not exist or has been relocated.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl text-xs cursor-pointer"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  const safeTags = post.tags || [];

  // Problem 1: Priority for separate database fields: h1_title, seo_title, meta_desc
  const displayH1 = post.h1_title || post.title;
  const displaySeoTitle = post.seo_title || post.seo?.seoTitle || post.title;
  const displayMetaDesc = post.meta_desc || post.seo?.metaDescription || post.metaDescription || post.excerpt;

  const postSEO = post.seo ? {
    ...post.seo,
    seoTitle: `${displaySeoTitle} | Margalla Hills`,
    metaDescription: displayMetaDesc,
    ogTitle: displaySeoTitle,
    ogDescription: displayMetaDesc
  } : {
    seoTitle: `${displaySeoTitle} | Margalla Hills`,
    metaDescription: displayMetaDesc,
    slug: post.slug,
    focusKeyword: safeTags[0] || 'margalla hills dining',
    secondaryKeywords: safeTags,
    canonicalUrl: `/blog/${post.slug}`,
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: displaySeoTitle,
    ogDescription: displayMetaDesc,
    ogImage: post.featuredImage,
    schemaType: 'Article' as const,
    searchIntent: 'Informational' as const
  };

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayH1,
    description: displayMetaDesc,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Muhammad Abid',
      jobTitle: 'Travel Writer & Storyteller'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Margalla Hills Luxury Dining',
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
    .filter(p => p.id !== post.id && (p.category === post.category || (p.tags && p.tags.some(t => safeTags.includes(t)))))
    .slice(0, 3);

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
              <button onClick={() => navigate('/')} className="hover:text-amber-400 cursor-pointer">Home</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/blog')} className="hover:text-amber-400 cursor-pointer">Blog</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li>
              <button onClick={() => navigate('/blog')} className="capitalize hover:text-amber-400 cursor-pointer">{post.category}</button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-600" /></li>
            <li className="text-white font-semibold truncate max-w-xs">{displayH1}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content Container */}
          <main className="lg:col-span-8 space-y-8">
            <article className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 lg:p-12">
              {/* Category & Date Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono mb-4">
                <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-md font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> Published: {post.publishedAt?.split('T')[0]}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> {post.readTimeMinutes || 5} min read
                </span>
              </div>

              {/* PROBLEM 1: H1 Title displayed as <h1 class="text-4xl font-bold"> at top */}
              <h1 className="text-4xl font-bold font-serif text-black leading-tight mb-4">
                {displayH1}
              </h1>

              {/* Excerpt / Meta Description */}
              <p className="text-base text-slate-600 leading-relaxed font-sans pb-6 border-b border-slate-200 mb-6">
                {displayMetaDesc}
              </p>

              {/* Featured Cover Image */}
              {post.featuredImage && (
                <div className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                  <img
                    src={post.featuredImage}
                    alt={post.imageAltText || displayH1}
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  {post.imageAltText && (
                    <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-600 font-mono border-t border-slate-200 flex items-center justify-between">
                      <span>ALT: {post.imageAltText}</span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> SEO Optimized
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 
                PROBLEM 2, 3, 4, 5 & FINAL CSS:
                Rendered inside .article-content where:
                - h1 is 32px 800 black
                - h2 is 24px 800 black
                - h3 is 18px 700
                - p is 16px line-height 1.8
                - strong/b is font-weight 700 black
                - ul is disc dots with 28px left margin
                - ol is decimal
                - a is color #1a73e8 and underline
              */}
              {isHtml ? (
                <div
                  className="article-content font-sans"
                  dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                />
              ) : (
                <div className="article-content font-sans">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ node, children, ...props }) => {
                        const text = String(children || '');
                        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                        return <h2 id={id} {...props}>{children}</h2>;
                      },
                      h3: ({ node, children, ...props }) => {
                        const text = String(children || '');
                        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                        return <h3 id={id} {...props}>{children}</h3>;
                      },
                      a: ({ node, href, children, ...props }) => {
                        const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
                        return (
                          <a
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            onClick={(e) => {
                              if (!isExternal && href?.startsWith('/')) {
                                e.preventDefault();
                                navigate(href);
                              }
                            }}
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      }
                    }}
                  >
                    {formattedContent}
                  </Markdown>
                </div>
              )}

              {/* Article Keywords / Tags */}
              {safeTags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase font-mono mr-2">Target Keywords:</span>
                  {safeTags.map((tag, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-300 flex items-center gap-1 font-medium">
                      <Tag className="w-3 h-3 text-amber-600" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Box - Professional Author Muhammad Abid */}
              <div className="mt-14 p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
                  alt="Muhammad Abid"
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div className="text-center sm:text-left">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1">AUTHOR</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1 flex items-center justify-center sm:justify-start gap-2">
                    <span>Muhammad Abid</span>
                    <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-bold">Verified</span>
                  </h4>
                  <p className="text-xs text-amber-700 font-mono font-semibold uppercase tracking-wider mb-3">Travel Writer &amp; Storyteller</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    &ldquo;Muhammad Abid is a travel writer and storyteller passionate about Islamabad, nature, and exploring the hidden gems of Pakistan. He writes practical travel guides, local insights, and inspiring stories about the Margalla Hills, outdoor adventures, and places worth discovering around Islamabad. Through his writing, Muhammad aims to help travelers discover Pakistan’s natural beauty and make the most of their journeys.&rdquo;
                  </p>
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
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Table of Contents
                </h3>
                <nav className="space-y-2 text-xs">
                  {tableOfContents.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`block w-full text-left text-slate-400 hover:text-amber-400 font-medium transition cursor-pointer ${
                        item.level === 3 ? 'pl-4 text-slate-500 hover:text-amber-300' : ''
                      }`}
                    >
                      {item.level === 2 ? '• ' : '- '} {item.text}
                    </button>
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
              <div className="bg-[#121212] p-6 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
                  Related Guides &amp; Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map(rPost => (
                    <div
                      key={rPost.id}
                      onClick={() => navigate(`/blog/${rPost.slug}`)}
                      className="group flex gap-3 cursor-pointer items-start"
                    >
                      {rPost.featuredImage && (
                        <img
                          src={rPost.featuredImage}
                          alt={rPost.title}
                          className="w-16 h-14 object-cover rounded-xl border border-slate-800 shrink-0 group-hover:border-amber-400 transition"
                        />
                      )}
                      <div>
                        <h4 className="font-serif text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-2">
                          {rPost.h1_title || rPost.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block mt-1">
                          {rPost.publishedAt?.split('T')[0]} &bull; {rPost.readTimeMinutes || 5}m read
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
