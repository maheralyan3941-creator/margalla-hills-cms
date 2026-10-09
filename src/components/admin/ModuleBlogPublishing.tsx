import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, BlogCategory } from '../../types';
import { api } from '../../lib/api';
import {
  cleanAndFormatPastedHtml,
  convertPlainTextToStructuredHtml,
  extractMetadataFromHtml,
  isHtmlContent
} from '../../lib/richTextCleaner';
import { convertHtmlToMarkdown, convertPlainTextToMarkdown, ParsedDocResult } from '../../lib/docsConverter';
import {
  Link2,
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Globe2,
  Sparkles,
  Search,
  ExternalLink,
  ArrowRight,
  Clock,
  Tag,
  AlertCircle,
  Image as ImageIcon,
  Wand2,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Bold,
  Italic,
  X,
  ClipboardPaste,
  Table as TableIcon,
  Code2
} from 'lucide-react';

interface ModuleBlogPublishingProps {
  onNavigateToPost?: (slug: string) => void;
  showToast?: (msg: string) => void;
}

export function ModuleBlogPublishing({ onNavigateToPost, showToast }: ModuleBlogPublishingProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Editor Modal / Drawer state
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // PROBLEM 1: 3 Separate Database Fields
  const [h1Title, setH1Title] = useState(''); // h1_title (for big heading on page)
  const [seoTitle, setSeoTitle] = useState(''); // seo_title (for Google title tag, target 60 chars)
  const [metaDesc, setMetaDesc] = useState(''); // meta_desc (for meta description, target 150 chars)

  // Additional Post Metadata
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [category, setCategory] = useState('hospitality-seo');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [authorName, setAuthorName] = useState('Muhammad Abid');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Editor Mode: 'visual' (WYSIWYG Rich Text) vs 'code' (HTML / Markdown Source)
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const visualEditorRef = useRef<HTMLDivElement>(null);

  // Inner Image Dialog Modal state
  const [showInnerImageModal, setShowInnerImageModal] = useState(false);
  const [innerImageUrl, setInnerImageUrl] = useState('');
  const [innerImageAlt, setInnerImageAlt] = useState('');
  const [innerImageCaption, setInnerImageCaption] = useState('');

  // Docs / Word Import Modal state
  const [showDocsImportModal, setShowDocsImportModal] = useState(false);
  const [docsImportRaw, setDocsImportRaw] = useState('');
  const [docsParsedStats, setDocsParsedStats] = useState<ParsedDocResult | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogPosts();
      setPosts(data || []);
      const cats = await api.getBlogCategories();
      setCategories(cats || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Synchronize visual editor when content state changes or editor mode toggles
  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== content) {
        visualEditorRef.current.innerHTML = content || '';
      }
    }
  }, [editorMode, isEditing]);

  // Handle H1 Title input and auto-fill URL slug and SEO Title if empty
  const handleH1TitleChange = (newH1: string) => {
    setH1Title(newH1);
    setTitle(newH1);
    if (!editingPostId) {
      const generatedSlug = newH1
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
      if (!seoTitle) setSeoTitle(newH1.substring(0, 60));
    }
  };

  // Handle Meta Description input and sync excerpt if empty
  const handleMetaDescChange = (newDesc: string) => {
    setMetaDesc(newDesc);
    if (!excerpt) setExcerpt(newDesc);
  };

  // ========================================================
  // PROBLEM 2: PASTE FORMATTING (Main Issue)
  // MUST read e.clipboardData.getData('text/html') not text/plain
  // Then insert using insertHTML. Allow and preserve:
  // h1, h2, h3, p, strong, b, ul, ol, li, a, em, br
  // Convert <b> to <strong>. Headings -> H2/H3. Bullets -> dots.
  // ========================================================
  const handleVisualEditorPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');

    let formatted = '';
    if (html && html.trim().length > 0) {
      // Process rich HTML directly from Google Docs / Word / Browser
      formatted = cleanAndFormatPastedHtml(html);
    } else if (plainText && plainText.trim().length > 0) {
      formatted = convertPlainTextToStructuredHtml(plainText);
    }

    if (formatted) {
      // Execute insertHTML at current cursor position
      document.execCommand('insertHTML', false, formatted);

      // Immediately sync state with editor's innerHTML
      if (visualEditorRef.current) {
        const updatedHtml = visualEditorRef.current.innerHTML;
        setContent(updatedHtml);
      }

      // Automatically auto-extract H1, Meta Description, Slug & Image if not yet populated
      const extracted = extractMetadataFromHtml(formatted);
      if (!h1Title && extracted.h1Title) {
        handleH1TitleChange(extracted.h1Title);
      }
      if (!metaDesc && extracted.metaDesc) {
        handleMetaDescChange(extracted.metaDesc);
      }
      if (!featuredImage && extracted.firstImage) {
        setFeaturedImage(extracted.firstImage);
      }

      if (showToast) {
        showToast('Google Doc formatted! Headings, bold, bullet points & blue links preserved.');
      }
    }
  };

  // Code View paste handler for text area mode
  const handleCodeTextareaPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const html = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');

    if (html && html.trim().length > 0) {
      e.preventDefault();
      const formatted = cleanAndFormatPastedHtml(html);
      const target = e.currentTarget;
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const newContent = content.substring(0, start) + formatted + content.substring(end);
      setContent(newContent);

      const extracted = extractMetadataFromHtml(formatted);
      if (!h1Title && extracted.h1Title) handleH1TitleChange(extracted.h1Title);
      if (!metaDesc && extracted.metaDesc) handleMetaDescChange(extracted.metaDesc);
      if (!featuredImage && extracted.firstImage) setFeaturedImage(extracted.firstImage);

      if (showToast) {
        showToast('Pasted HTML formatted and inserted!');
      }
    }
  };

  // Rich Text ExecCommand helper
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (visualEditorRef.current) {
      setContent(visualEditorRef.current.innerHTML);
    }
  };

  // Insert Table helper
  const insertHtmlTableHelper = () => {
    const tableHtml = `
      <table class="w-full my-4 border-collapse border border-slate-300">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-300 p-2 font-bold text-left">Feature / Detail</th>
            <th class="border border-slate-300 p-2 font-bold text-left">Description</th>
            <th class="border border-slate-300 p-2 font-bold text-left">Rating / Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 p-2">Location</td>
            <td class="border border-slate-300 p-2">Margalla Hills, Islamabad</td>
            <td class="border border-slate-300 p-2">5/5</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Cuisine Speciality</td>
            <td class="border border-slate-300 p-2">Artisanal Fine Dining & Himalayan Botanicals</td>
            <td class="border border-slate-300 p-2">Premium</td>
          </tr>
        </tbody>
      </table>
    `;

    if (editorMode === 'visual') {
      execCmd('insertHTML', tableHtml);
    } else {
      setContent(prev => prev + '\n\n' + tableHtml + '\n\n');
    }
    if (showToast) showToast('Clean table structure inserted!');
  };

  // Auto-detect and format headings from raw text
  const formatHeadingsAutomatically = () => {
    if (!content.trim()) return;

    if (isHtmlContent(content)) {
      const cleaned = cleanAndFormatPastedHtml(content);
      setContent(cleaned);
      if (visualEditorRef.current) {
        visualEditorRef.current.innerHTML = cleaned;
      }
    } else {
      const lines = content.split('\n');
      const processed: string[] = [];
      let insideCode = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
          insideCode = !insideCode;
          processed.push(line);
          continue;
        }
        if (insideCode) {
          processed.push(line);
          continue;
        }

        if (/^#{1,6}\s+/.test(trimmed)) {
          processed.push(line);
          continue;
        }

        const numberedMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)$/);
        if (numberedMatch && numberedMatch[2].length < 75 && !numberedMatch[2].endsWith('.')) {
          processed.push(`## ${trimmed}`);
          continue;
        }

        const subHeadingKeywords = ['pros:', 'cons:', 'what to eat:', 'what to check:', 'best for:', 'atmosphere:', 'verdict:', 'highlights:', 'conclusion:'];
        const isSubHeading = subHeadingKeywords.some(k => trimmed.toLowerCase().startsWith(k));
        if (isSubHeading) {
          processed.push(`### ${trimmed}`);
          continue;
        }

        if (
          trimmed.length > 3 &&
          trimmed.length < 65 &&
          !trimmed.endsWith('.') &&
          !trimmed.endsWith(',') &&
          !trimmed.endsWith(';') &&
          (i === 0 || lines[i - 1].trim() === '')
        ) {
          processed.push(`## ${trimmed}`);
          continue;
        }

        processed.push(line);
      }

      setContent(processed.join('\n'));
    }

    if (showToast) showToast('Headings formatted with H2 & H3 tags!');
  };

  // Automatic smart internal and external link insertion for common high-ranking keywords
  const applyAutomaticLinkOptimization = () => {
    if (!content.trim()) return;
    let updated = content;

    const linkKeywords: { keyword: string; url: string; isExternal?: boolean }[] = [
      { keyword: 'dining restaurants in Islamabad', url: '/locations' },
      { keyword: 'restaurants in Islamabad', url: '/locations' },
      { keyword: 'fine dining menu', url: '/menu' },
      { keyword: 'our menu', url: '/menu' },
      { keyword: 'tasting menu', url: '/tasting-menu' },
      { keyword: 'wine cellar', url: '/wine-cellar' },
      { keyword: 'private dining', url: '/private-dining' },
      { keyword: 'Margalla Hills', url: '/' },
      { keyword: 'reserve a table', url: '/contact' },
      { keyword: 'reservations', url: '/contact' },
      { keyword: 'botanicals', url: '/botanicals' },
      { keyword: 'culinary heritage', url: '/heritage' },
      { keyword: 'Google Maps Local Pack', url: 'https://support.google.com/business', isExternal: true },
      { keyword: 'Michelin Guide', url: 'https://guide.michelin.com', isExternal: true }
    ];

    let count = 0;
    const isHtml = isHtmlContent(updated);

    linkKeywords.forEach(({ keyword, url, isExternal }) => {
      if (isHtml) {
        // Regex to match keyword not already inside an <a> tag
        const regex = new RegExp(`(?<!<a[^>]*>)\\b(${keyword})\\b(?![^<]*<\\/a>)`, 'i');
        if (regex.test(updated)) {
          updated = updated.replace(regex, (match) => {
            count++;
            const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `<a href="${url}"${targetAttr}>${match}</a>`;
          });
        }
      } else {
        const regex = new RegExp(`(?<!\\[|\\()\\b(${keyword})\\b(?![^\\[]*\\]|\\))`, 'i');
        if (regex.test(updated)) {
          updated = updated.replace(regex, (match) => {
            count++;
            return `[${match}](${url})`;
          });
        }
      }
    });

    setContent(updated);
    if (editorMode === 'visual' && visualEditorRef.current) {
      visualEditorRef.current.innerHTML = updated;
    }
    if (showToast) {
      showToast(count > 0 ? `Successfully linked ${count} keywords with blue links!` : 'Links already optimized.');
    }
  };

  const openNewPostForm = () => {
    setEditingPostId(null);
    setH1Title('');
    setSeoTitle('');
    setMetaDesc('');
    setTitle('');
    setSlug('');
    setTargetKeyword('');
    setCategory('hospitality-seo');
    setExcerpt('');
    setContent('');
    setFeaturedImage('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80');
    setImageAltText('');
    setAuthorName('Muhammad Abid');
    setStatus('published');
    setEditorMode('visual');
    setFormError(null);
    setIsEditing(true);
  };

  const openEditPostForm = (post: BlogPost) => {
    setEditingPostId(post.id);
    setH1Title(post.h1_title || post.title);
    setSeoTitle(post.seo_title || post.seo?.seoTitle || post.title);
    setMetaDesc(post.meta_desc || post.seo?.metaDescription || post.metaDescription || post.excerpt);
    setTitle(post.title || post.h1_title || '');
    setSlug(post.slug);
    setTargetKeyword(post.seo?.focusKeyword || post.tags?.[0] || '');
    setCategory(post.category);
    setExcerpt(post.excerpt || post.meta_desc || '');
    setContent(post.content);
    setFeaturedImage(post.featuredImage || '');
    setImageAltText(post.imageAltText || `${post.title} - Margalla Hills`);
    setAuthorName(post.author?.name || 'Muhammad Abid');
    setStatus(post.status === 'scheduled' ? 'draft' : post.status || 'published');
    setEditorMode('visual');
    setFormError(null);
    setIsEditing(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalH1 = h1Title.trim() || title.trim();
    const finalSlug = slug
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\/[^\/]+/i, '')
      .replace(/^\/?blog\/?/i, '')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-');

    if (!finalH1 || !finalSlug) {
      setFormError('H1 Title and URL slug are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    // Get current HTML from editor if visual
    const finalContent = editorMode === 'visual' && visualEditorRef.current
      ? visualEditorRef.current.innerHTML
      : content;

    const postPayload: Partial<BlogPost> = {
      // Problem 1: Explicit 3 separate database fields
      h1_title: finalH1,
      seo_title: seoTitle.trim() || finalH1,
      meta_desc: metaDesc.trim() || excerpt.trim(),

      title: finalH1,
      slug: finalSlug,
      excerpt: excerpt.trim() || metaDesc.trim(),
      content: finalContent,
      featuredImage: featuredImage.trim(),
      imageAltText: imageAltText.trim() || `${finalH1} - Margalla Hills`,
      category: category,
      tags: targetKeyword ? [targetKeyword, 'Margalla Hills', 'Islamabad Dining'] : ['Margalla Hills'],
      author: {
        name: authorName.trim() || 'Muhammad Abid',
        role: 'Travel Writer & Storyteller',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
      },
      status: status,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTimeMinutes: Math.max(2, Math.ceil(finalContent.split(/\s+/).length / 200)),
      seo: {
        seoTitle: seoTitle.trim() || finalH1,
        metaDescription: metaDesc.trim() || excerpt.trim(),
        slug: finalSlug,
        focusKeyword: targetKeyword.trim(),
        secondaryKeywords: [],
        canonicalUrl: `/blog/${finalSlug}`,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: seoTitle.trim() || finalH1,
        ogDescription: metaDesc.trim() || excerpt.trim(),
        ogImage: featuredImage.trim(),
        schemaType: 'BlogPosting',
        searchIntent: 'Informational'
      }
    };

    try {
      if (editingPostId) {
        await api.updateBlogPost(editingPostId, postPayload);
        if (showToast) showToast(`Article "${finalH1}" updated successfully! (/blog/${finalSlug})`);
      } else {
        await api.createBlogPost(postPayload);
        if (showToast) showToast(`New article "${finalH1}" published live at /blog/${finalSlug}!`);
      }
      setIsEditing(false);
      await fetchPosts();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save post. Please check backend connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"? This will remove it from the live website.`)) {
      return;
    }
    try {
      await api.deleteBlogPost(id);
      if (showToast) showToast(`Article "${postTitle}" removed.`);
      await fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete post.');
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch =
      (p.h1_title && p.h1_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.seo?.focusKeyword && p.seo.focusKeyword.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#181612] p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Live CMS & Content Publisher</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Real Blog &amp; Article Publisher
          </h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
            Publish real, search-optimized articles that go live immediately on <code className="text-amber-400">/blog</code>. Fully supports direct Google Docs paste with bullet dots, bold text, H2/H3 headings, and blue links.
          </p>
        </div>

        <button
          onClick={openNewPostForm}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write &amp; Publish New Article</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {isEditing && (
        <div className="bg-[#121214] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{editingPostId ? 'Edit Article & Target SEO' : 'Create & Publish New SEO Article'}</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Configure separate H1 heading, Google SEO Title (60 chars), SERP Meta Description (150 chars), and rich content.
              </p>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {formError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSavePost} className="space-y-6">
            {/* PROBLEM 1: 3 Separate Database Fields Form Block */}
            <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  Three Essential Database Fields (H1 &bull; SEO Title &bull; Meta Desc)
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">Title 60 chars &bull; Meta 150 chars</span>
              </div>

              {/* Field 1: h1_title */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="font-semibold text-white flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-amber-400 text-black rounded text-[10px] font-bold">FIELD 1</span>
                    H1 Title (<code className="text-amber-400 font-mono">h1_title</code>) — Big Heading on Page <span className="text-amber-400">*</span>
                  </label>
                  <span className="font-mono text-[11px] text-neutral-400">
                    Displays as &lt;h1 class=&quot;text-4xl font-bold&quot;&gt;
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={h1Title}
                  onChange={(e) => handleH1TitleChange(e.target.value)}
                  placeholder="e.g. 5 Tested Best Restaurants in Islamabad for Fine Dining"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Field 2: seo_title */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-semibold text-white flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-sky-400 text-black rounded text-[10px] font-bold">FIELD 2</span>
                      SEO Title (<code className="text-sky-400 font-mono">seo_title</code>) — Google Title Tag
                    </label>
                    <span className={`font-mono text-[10px] ${seoTitle.length > 60 ? 'text-amber-400 font-semibold' : seoTitle.length >= 40 ? 'text-emerald-400 font-medium' : 'text-neutral-500'}`}>
                      {seoTitle.length}/60 chars {seoTitle.length > 60 ? '(Max 60)' : ''}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="e.g. 5 Best Restaurants in Islamabad | Margalla Hills"
                    className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Target URL Slug (Live Website Path) <span className="text-amber-400">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-neutral-900 border border-r-0 border-neutral-800 rounded-l-xl text-neutral-500 font-mono text-xs">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/^https?:\/\/[^\/]+/i, '')
                          .replace(/^\/?blog\/?/i, '')
                          .replace(/^\/+/, '');
                        setSlug(val);
                      }}
                      placeholder="best-restaurants-islamabad"
                      className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-r-xl text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Field 3: meta_desc */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="font-semibold text-white flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-emerald-400 text-black rounded text-[10px] font-bold">FIELD 3</span>
                    Meta Description (<code className="text-emerald-400 font-mono">meta_desc</code>) — Google SERP Snippet
                  </label>
                  <span className={`font-mono text-[10px] ${metaDesc.length > 150 ? 'text-amber-400 font-semibold' : metaDesc.length >= 120 ? 'text-emerald-400 font-medium' : 'text-neutral-500'}`}>
                    {metaDesc.length}/150 chars {metaDesc.length > 150 ? '(Target 150 max)' : ''}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={metaDesc}
                  onChange={(e) => handleMetaDescChange(e.target.value)}
                  placeholder="Compelling meta description with target keywords shown under Google search results (approx 150 characters)..."
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Row: Keywords & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Focus Keyword (SEO Target)
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g., dining restaurants in islamabad"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Article Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="hospitality-seo">Restaurant &amp; Hospitality SEO</option>
                  <option value="local-seo">Local SEO &amp; Google Maps</option>
                  <option value="culinary-heritage">Culinary Heritage &amp; Dining Guides</option>
                  <option value="technical-seo">Technical SEO &amp; Schema</option>
                  <option value="events-catering">VIP Dining &amp; Private Events</option>
                </select>
              </div>
            </div>

            {/* Row: Featured Image, Alt Text, and Author */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center justify-between">
                  <span>Image ALT Text</span>
                  <span className="text-[10px] text-emerald-400 font-mono">SEO ALT</span>
                </label>
                <input
                  type="text"
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  placeholder="e.g. Best dining restaurants in Islamabad"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Muhammad Abid"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* PROBLEM 2, 3, 4, 5: Rich Text Editor Container */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Article Content Body</span>
                  </label>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-semibold">
                    Google Docs Auto-Formatting Ready
                  </span>
                </div>

                {/* View Mode Toggle: Visual vs Code */}
                <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode !== 'visual') {
                        setEditorMode('visual');
                        setTimeout(() => {
                          if (visualEditorRef.current) {
                            visualEditorRef.current.innerHTML = content;
                          }
                        }, 50);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      editorMode === 'visual'
                        ? 'bg-amber-400 text-black shadow font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visual Rich Editor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode !== 'code') {
                        if (visualEditorRef.current) {
                          setContent(visualEditorRef.current.innerHTML);
                        }
                        setEditorMode('code');
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      editorMode === 'code'
                        ? 'bg-neutral-800 text-white shadow font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>HTML / Code View</span>
                  </button>
                </div>
              </div>

              {/* Rich Text Editor Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs shadow-sm">
                {/* Heading 2 */}
                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<h2>')}
                  className="px-2.5 py-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg font-bold text-[11px] border border-neutral-800 flex items-center gap-1 cursor-pointer transition"
                  title="Make H2 Heading (24px bold)"
                >
                  <Heading2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>H2</span>
                </button>

                {/* Heading 3 */}
                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<h3>')}
                  className="px-2.5 py-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg font-bold text-[11px] border border-neutral-800 flex items-center gap-1 cursor-pointer transition"
                  title="Make H3 Sub-heading (18px bold)"
                >
                  <Heading3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>H3 (FAQ)</span>
                </button>

                {/* Paragraph */}
                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<p>')}
                  className="px-2 py-1.5 bg-black hover:bg-neutral-800 text-neutral-300 rounded-lg text-[11px] border border-neutral-800 cursor-pointer transition font-mono"
                  title="Normal Paragraph text"
                >
                  P
                </button>

                <div className="h-4 w-px bg-neutral-800 mx-1" />

                {/* Bold */}
                <button
                  type="button"
                  onClick={() => execCmd('bold')}
                  className="p-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg text-[11px] border border-neutral-800 cursor-pointer transition font-bold"
                  title="Bold (Strong)"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>

                {/* Italic */}
                <button
                  type="button"
                  onClick={() => execCmd('italic')}
                  className="p-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg text-[11px] border border-neutral-800 cursor-pointer transition"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>

                {/* Bullet List (Dots) */}
                <button
                  type="button"
                  onClick={() => execCmd('insertUnorderedList')}
                  className="p-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg text-[11px] border border-neutral-800 cursor-pointer transition"
                  title="Bullet List with Dots (Pros/Cons)"
                >
                  <List className="w-3.5 h-3.5 text-amber-400" />
                </button>

                {/* Numbered List */}
                <button
                  type="button"
                  onClick={() => execCmd('insertOrderedList')}
                  className="p-1.5 bg-black hover:bg-neutral-800 text-neutral-200 rounded-lg text-[11px] border border-neutral-800 cursor-pointer transition"
                  title="Numbered List"
                >
                  <ListOrdered className="w-3.5 h-3.5 text-sky-400" />
                </button>

                <div className="h-4 w-px bg-neutral-800 mx-1" />

                {/* Insert Blue Link */}
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter link URL (e.g., /locations, /menu or https://...):', 'https://');
                    if (url) {
                      execCmd('createLink', url);
                    }
                  }}
                  className="px-2.5 py-1 bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-800/40 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="Add working Blue Link"
                >
                  <Link2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>+ Blue Link</span>
                </button>

                {/* Insert Clean Table */}
                <button
                  type="button"
                  onClick={insertHtmlTableHelper}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="Insert Table structure"
                >
                  <TableIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Table</span>
                </button>

                {/* Insert Image */}
                <button
                  type="button"
                  onClick={() => setShowInnerImageModal(true)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="Insert Inner Image"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Image</span>
                </button>

                <div className="h-4 w-px bg-neutral-800 mx-1" />

                {/* Auto Format Headings */}
                <button
                  type="button"
                  onClick={formatHeadingsAutomatically}
                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="Automatically convert '5 Tested Best...', 'Final Thoughts...' to H2 and FAQs to H3"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Auto-Format Headings</span>
                </button>

                {/* Auto-Pick Internal & External Links */}
                <button
                  type="button"
                  onClick={applyAutomaticLinkOptimization}
                  className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="Auto-link keywords like 'dining restaurants in Islamabad', 'menu', 'reservations'"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Link Keywords</span>
                </button>

                {/* Dedicated Google Docs Paste Modal */}
                <button
                  type="button"
                  onClick={() => {
                    setDocsImportRaw('');
                    setDocsParsedStats(null);
                    setShowDocsImportModal(true);
                  }}
                  className="ml-auto px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-lg text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  title="Paste Google Docs or Word with visual metadata extraction"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>📋 Docs Import Assistant</span>
                </button>
              </div>

              {/* PROBLEM 2: The Main Rich Text Editor Canvas */}
              {editorMode === 'visual' ? (
                <div className="relative">
                  <div
                    ref={visualEditorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onPaste={handleVisualEditorPaste}
                    onInput={() => {
                      if (visualEditorRef.current) {
                        setContent(visualEditorRef.current.innerHTML);
                      }
                    }}
                    className="article-content bg-white text-slate-900 p-6 sm:p-8 rounded-xl min-h-[380px] max-h-[700px] overflow-y-auto border border-neutral-700 outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed shadow-inner font-sans selection:bg-amber-200 selection:text-black"
                  />
                  {!content && (
                    <div className="absolute top-8 left-8 text-slate-400 pointer-events-none text-sm select-none">
                      <p className="font-semibold text-slate-500 mb-1">Click here and press Ctrl+V to paste directly from Google Docs...</p>
                      <p className="text-xs text-slate-400">All headings (H2/H3), bold text, bullet lists (Pros/Cons), and working blue links will be preserved instantly.</p>
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  rows={16}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onPaste={handleCodeTextareaPaste}
                  placeholder="Paste or write your raw HTML or Markdown content here..."
                  className="w-full p-4 bg-black border border-neutral-800 rounded-xl text-xs text-neutral-200 font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              )}

              <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 font-mono">
                <span>
                  Paste mode: <strong className="text-emerald-400 font-bold">HTML &amp; Rich Text Preservation Active</strong>
                </span>
                <span>
                  Allowed tags: <code className="text-amber-400">h1, h2, h3, p, strong, ul, ol, li, a, em, table</code>
                </span>
              </div>
            </div>

            {/* Publishing Status & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-neutral-400">Publishing Status:</span>
                <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      status === 'published'
                        ? 'bg-emerald-500 text-black shadow font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live Published</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      status === 'draft'
                        ? 'bg-amber-400 text-black shadow font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Draft</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50"
                >
                  <span>{saving ? 'Publishing...' : status === 'published' ? 'Publish Live Article' : 'Save Draft'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Published Posts Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121212] p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search published articles by H1 title, target URL slug, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
          {(['all', 'published', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md capitalize font-medium transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg">
        <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400">
          <span>All Articles ({filteredPosts.length})</span>
          <span>Target URL &amp; Status</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-neutral-500">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-sm font-medium text-neutral-400">No articles found</p>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Click &quot;Write &amp; Publish New Article&quot; to publish your first post with Google Docs formatting preservation.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/60">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 hover:bg-neutral-900/40 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        post.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono">
                      /blog/{post.slug}
                    </span>
                    {post.seo?.focusKeyword && (
                      <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 text-[10px] font-mono border border-neutral-800 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-amber-400" />
                        <span>KW: {post.seo.focusKeyword}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white hover:text-amber-400 transition">
                    {post.h1_title || post.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {post.meta_desc || post.excerpt || post.seo?.metaDescription}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span>By {post.author?.name || 'Muhammad Abid'}</span>
                    <span>&bull;</span>
                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}</span>
                    <span>&bull;</span>
                    <span>{post.readTimeMinutes || 5} min read</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const cleanSlug = (post.slug || '').replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
                      const targetUrl = `/blog/${cleanSlug}`;
                      if (onNavigateToPost) {
                        onNavigateToPost(cleanSlug);
                      } else {
                        window.location.href = targetUrl;
                      }
                    }}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs flex items-center gap-1 transition cursor-pointer border border-neutral-800"
                    title="View Live Article on Website"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">View Live</span>
                  </button>

                  <button
                    onClick={() => openEditPostForm(post)}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 rounded-lg text-xs flex items-center gap-1 transition cursor-pointer border border-neutral-800"
                    title="Edit Content & SEO"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeletePost(post.id, post.h1_title || post.title)}
                    className="p-2 bg-neutral-900 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-400 rounded-lg text-xs transition cursor-pointer border border-neutral-800"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inner Image Dialog Modal */}
      {showInnerImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-neutral-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ImageIcon className="w-4 h-4 text-sky-400" />
                <span>Insert Inner Image with SEO ALT Text</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowInnerImageModal(false);
                  setInnerImageUrl('');
                  setInnerImageAlt('');
                  setInnerImageCaption('');
                }}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Image Source URL (Web Link)
                </label>
                <input
                  type="url"
                  value={innerImageUrl}
                  onChange={(e) => setInnerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or https://..."
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                  <span>Image ALT Text (Critical for Google SEO)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Descriptive</span>
                </label>
                <input
                  type="text"
                  value={innerImageAlt}
                  onChange={(e) => setInnerImageAlt(e.target.value)}
                  placeholder="e.g. Cozy interior dining table with candles at Margalla Hills"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Optional Caption / Title
                </label>
                <input
                  type="text"
                  value={innerImageCaption}
                  onChange={(e) => setInnerImageCaption(e.target.value)}
                  placeholder="e.g. Signature hillside seating arrangement"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              {innerImageUrl && (
                <div className="p-2 bg-black rounded-xl border border-neutral-800 flex items-center gap-3">
                  <img
                    src={innerImageUrl}
                    alt={innerImageAlt || 'Preview'}
                    className="w-16 h-12 rounded-lg object-cover border border-neutral-700"
                    onError={(e) => { (e.target as any).style.display = 'none'; }}
                  />
                  <div className="text-[11px] text-neutral-400 truncate">
                    <span className="text-white font-medium block truncate">{innerImageAlt || 'No alt text provided'}</span>
                    <span className="text-neutral-500 font-mono text-[10px]">Ready to insert</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setShowInnerImageModal(false);
                  setInnerImageUrl('');
                  setInnerImageAlt('');
                  setInnerImageCaption('');
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!innerImageUrl.trim()}
                onClick={() => {
                  const alt = innerImageAlt.trim() || h1Title || 'Margalla Hills article image';
                  const imgTag = `<img src="${innerImageUrl.trim()}" alt="${alt}" class="w-full rounded-2xl my-6 border border-slate-300" />`;
                  if (editorMode === 'visual') {
                    execCmd('insertHTML', imgTag);
                  } else {
                    setContent((prev) => prev + '\n\n' + imgTag + '\n\n');
                  }
                  setShowInnerImageModal(false);
                  setInnerImageUrl('');
                  setInnerImageAlt('');
                  setInnerImageCaption('');
                  if (showToast) showToast('Inner image inserted into article body!');
                }}
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black rounded-xl text-xs font-bold cursor-pointer transition shadow"
              >
                Insert into Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Docs & Word Smart Import Modal */}
      {showDocsImportModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 shrink-0">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ClipboardPaste className="w-4 h-4 text-amber-400" />
                <span>Smart Paste from Google Docs &bull; Auto-Format Everything</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDocsImportModal(false);
                  setDocsImportRaw('');
                  setDocsParsedStats(null);
                }}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              <p className="text-xs text-neutral-400 leading-relaxed">
                Copy from <strong>Google Docs</strong> (Ctrl+A, Ctrl+C) and paste below. All <strong>headings, bold lines, bullet points, and blue links</strong> are preserved permanently without losing formatting.
              </p>

              {/* Editable paste container */}
              <div
                contentEditable
                suppressContentEditableWarning
                onPaste={(e) => {
                  e.preventDefault();
                  const html = e.clipboardData.getData('text/html');
                  const text = e.clipboardData.getData('text/plain');
                  if (html && html.trim().length > 0) {
                    const cleaned = cleanAndFormatPastedHtml(html);
                    const res = convertHtmlToMarkdown(html);
                    setDocsImportRaw(cleaned);
                    setDocsParsedStats(res);
                  } else if (text) {
                    const structured = convertPlainTextToStructuredHtml(text);
                    const res = convertPlainTextToMarkdown(text);
                    setDocsImportRaw(structured);
                    setDocsParsedStats(res);
                  }
                }}
                className="w-full min-h-[140px] max-h-[200px] overflow-y-auto p-4 bg-black border-2 border-dashed border-amber-500/40 hover:border-amber-400 focus:border-amber-400 rounded-xl text-xs text-neutral-200 focus:outline-none flex flex-col justify-center items-center cursor-text transition text-center"
              >
                {!docsImportRaw ? (
                  <div className="pointer-events-none py-6 space-y-1">
                    <ClipboardPaste className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-pulse" />
                    <span className="font-bold text-white text-sm block">Click here and press Ctrl + V to Paste</span>
                    <span className="text-[11px] text-neutral-400 block">Tables, bullet lists, internal links &amp; headings are automatically preserved!</span>
                  </div>
                ) : (
                  <div className="text-left w-full font-mono text-[11px] whitespace-pre-wrap select-all">
                    {docsImportRaw.substring(0, 500)}...
                  </div>
                )}
              </div>

              {/* Conversion Stats / Detected Metadata */}
              {docsParsedStats && (
                <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Content Converted Successfully
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px]">
                      {docsParsedStats.tablesCount} Tables | {docsParsedStats.linksCount} Links | {docsParsedStats.headingsCount} Headings
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {docsParsedStats.extractedTitle && (
                      <div className="p-2.5 bg-black rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 font-mono block">Detected H1 Title:</span>
                        <span className="text-white font-medium line-clamp-1">{docsParsedStats.extractedTitle}</span>
                      </div>
                    )}
                    {docsParsedStats.extractedSlug && (
                      <div className="p-2.5 bg-black rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 font-mono block">Generated URL Slug:</span>
                        <span className="text-amber-400 font-mono text-[11px] line-clamp-1">/blog/{docsParsedStats.extractedSlug}</span>
                      </div>
                    )}
                    {docsParsedStats.extractedMetaDescription && (
                      <div className="sm:col-span-2 p-2.5 bg-black rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 font-mono block">Meta Description (Target ~150 chars):</span>
                        <span className="text-neutral-300 line-clamp-2 text-[11px]">{docsParsedStats.extractedMetaDescription}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowDocsImportModal(false);
                  setDocsImportRaw('');
                  setDocsParsedStats(null);
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!docsImportRaw}
                onClick={() => {
                  setContent(prev => (prev ? prev + '\n\n' + docsImportRaw : docsImportRaw));
                  if (visualEditorRef.current) {
                    visualEditorRef.current.innerHTML = (content ? content + '\n\n' + docsImportRaw : docsImportRaw);
                  }
                  setShowDocsImportModal(false);
                  if (showToast) showToast('Content added to article body!');
                }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                Insert Content Only
              </button>

              <button
                type="button"
                disabled={!docsImportRaw}
                onClick={() => {
                  setContent(docsImportRaw);
                  if (visualEditorRef.current) {
                    visualEditorRef.current.innerHTML = docsImportRaw;
                  }
                  if (docsParsedStats) {
                    if (docsParsedStats.extractedTitle) {
                      handleH1TitleChange(docsParsedStats.extractedTitle.substring(0, 70));
                    }
                    if (docsParsedStats.extractedSlug) {
                      setSlug(docsParsedStats.extractedSlug);
                    }
                    if (docsParsedStats.extractedMetaDescription) {
                      handleMetaDescChange(docsParsedStats.extractedMetaDescription.substring(0, 150));
                    }
                    if (docsParsedStats.extractedFirstImage) {
                      setFeaturedImage(docsParsedStats.extractedFirstImage);
                    }
                  }
                  setShowDocsImportModal(false);
                  setDocsImportRaw('');
                  setDocsParsedStats(null);
                  if (showToast) showToast('🎉 All fields (H1, Slug, Meta 150 & Content) populated!');
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-extrabold cursor-pointer transition shadow disabled:opacity-50"
              >
                Apply All (Auto-Fill H1, Slug, Meta 150 &amp; Content)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
