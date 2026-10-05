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

  // Aggressive formatting logic to handle WhatsApp/Word pasted text merging issue
  const formattedContent = useMemo(() => {
    if (!post || !post.content) return '';
    const raw = post.content;
    const lines = raw.split('\n');
    const result: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        if (result.length > 0 && result[result.length - 1] !== '') {
          result.push('');
        }
        continue;
      }

      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('●') || trimmedLine.startsWith('▪')) {
        line = '- ' + trimmedLine.substring(1).trim();
      }

      const isHeading = /^#{1,6}\s+/.test(trimmedLine);
      const isList = /^[\-\*\+]\s+/.test(trimmedLine) || /^\d+[\.\)]\s+/.test(trimmedLine);
      const isTable = trimmedLine.startsWith('|');

      if (!isHeading && !isList && !isTable) {
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
        if (trimmedLine.length > 3 && trimmedLine.length < 65 && !trimmedLine.endsWith('.') && !trimmedLine.endsWith(',') && (i === 0 || lines[i - 1].trim() === '')) {
          result.push(`## ${trimmedLine}`);
          result.push('');
          continue;
        }
      }

      if (isHeading || isList || isTable) {
        result.push(line);
      } else {
        result.push(line);
        result.push(''); // Force paragraph space
      }
    }
    return result.join('\n');
  }, [post?.content]);

  const tableOfContents = useMemo(() => {
    if (!formattedContent) return [];
    const lines = formattedContent.split("\n");
    const toc: { text: string; level: number; id: string }[] = [];
    lines.forEach(line => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        toc.push({ text, level: 2, id: text.toLowerCase().replace(/[^\w]+/g, "-") });
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        toc.push({ text, level: 3, id: text.toLowerCase().replace(/[^\w]+/g, "-") });
      }
    });
    return toc;
  }, [formattedContent]);

  if (!post) {
    return (
      <div className="bg-[#0A0A0A] text-slate-300 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">Article Not Found</h1>
          <button onClick={() => navigate('/blog')} className="mt-6 px-5 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-xs cursor-pointer">Return to Blog</button>
        </div>
      </div>
    );
  }

  const safeTags = post.tags || [];
  const relatedPosts = posts.filter(p => p.id !== post.id && (p.category === post.category)).slice(0, 3);

  return (
    <div className="bg-[#0A0A0A] text-slate-300 min-h-screen py-10">
      <SEOHead seo={post.seo || { seoTitle: post.title, metaDescription: post.excerpt, slug: post.slug }} contentForAudit={post.content} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <li><button onClick={() => navigate('/')} className="hover:text-emerald-400">Home</button></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><button onClick={() => navigate('/blog')} className="hover:text-emerald-400">Blog</button></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-white font-semibold truncate max-w-xs">{post.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <main className="lg:col-span-8 space-y-8">
            <article className="bg-[#121212] rounded-3xl border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mb-4">
                <span className="px-3 py-1 bg-black/80 border border-white/10 text-emerald-400 rounded-md uppercase">{post.category}</span>
                <span>{post.publishedAt.split('T')[0]}</span>
                <span>&bull;</span>
                <span>{post.readTimeMinutes} min read</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{post.title}</h1>
              <p className="text-base text-slate-400 mb-8 border-b border-slate-800 pb-6">{post.excerpt}</p>

              <div className="my-8 rounded-2xl overflow-hidden border border-slate-800">
                <img src={post.featuredImage} alt={post.imageAltText || post.title} className="w-full h-80 sm:h-96 object-cover" />
              </div>

              <div className="prose prose-invert max-w-none">
                <Markdown
                  components={{
                    p: ({ children }) => <p className="mb-6 leading-relaxed text-slate-300 text-base sm:text-lg">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-3 text-slate-300">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-3 text-slate-300">{children}</ol>,
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    h2: ({ children }) => {
                      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
                      return <h2 id={id} className="font-serif text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 pb-2 border-b border-slate-800">{children}</h2>;
                    },
                    h3: ({ children }) => <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-400 mt-8 mb-4">{children}</h3>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-amber-400 pl-6 my-8 italic text-slate-200 bg-amber-400/5 py-4 rounded-r-xl">{children}</blockquote>,
                  }}
                >
                  {formattedContent}
                </Markdown>
              </div>

              {/* Author Box - Professional Author Muhammad Abid */}
              <div className="mt-16 p-8 bg-black/40 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" alt="Muhammad Abid" className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/30" />
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-white mb-1">Muhammad Abid</h4>
                  <p className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-3">Travel Writer & Storyteller</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Muhammad Abid is a travel writer and storyteller passionate about Islamabad, nature, and exploring the hidden gems of Pakistan. He writes practical travel guides, local insights, and inspiring stories about the Margalla Hills, outdoor adventures, and places worth discovering around Islamabad. Through his writing, Muhammad aims to help travelers discover Pakistan’s natural beauty and make the most of their journeys.
                  </p>
                </div>
              </div>
            </article>
          </main>

          <aside className="lg:col-span-4 space-y-8">
            {tableOfContents.length > 0 && (
              <div className="bg-[#121212] p-6 rounded-2xl border border-slate-800 sticky top-24 shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Table of Contents</h3>
                <nav className="space-y-3">
                  {tableOfContents.map((item, idx) => (
                    <button key={idx} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })} className={`block w-full text-left text-xs text-slate-400 hover:text-white transition ${item.level === 3 ? 'pl-4 opacity-70' : 'font-medium'}`}>
                      {item.level === 2 ? '• ' : '- '} {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}
            
            {relatedPosts.length > 0 && (
              <div className="bg-[#121212] p-6 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Related Publications</h3>
                <div className="space-y-4">
                  {relatedPosts.map((rPost) => (
                    <div key={rPost.id} onClick={() => navigate(`/blog/${rPost.slug}`)} className="group cursor-pointer flex gap-3 items-start">
                      <img src={rPost.featuredImage} alt={rPost.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800" />
                      <div>
                        <h4 className="font-serif text-xs font-bold text-white group-hover:text-emerald-400 transition line-clamp-2">{rPost.title}</h4>
                        <span className="text-[10px] text-slate-400 block mt-1">{rPost.publishedAt.split('T')[0]}</span>
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
