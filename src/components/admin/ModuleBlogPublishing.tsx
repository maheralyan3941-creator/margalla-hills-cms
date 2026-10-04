import React, { useState, useEffect } from 'react';
import { BlogPost, BlogCategory } from '../../types';
import { api } from '../../lib/api';
import {
  Link2,
  BookmarkPlus,
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
  Layers,
  Tag,
  AlertCircle,
  Image as ImageIcon,
  Wand2,
  Heading1,
  Heading2,
  Heading3,
  List,
  Bold,
  Italic,
  X
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

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [category, setCategory] = useState('hospitality-seo');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [authorName, setAuthorName] = useState('SEO & Culinary Editorial Team');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Inner Image Dialog Modal state
  const [showInnerImageModal, setShowInnerImageModal] = useState(false);
  const [innerImageUrl, setInnerImageUrl] = useState('');
  const [innerImageAlt, setInnerImageAlt] = useState('');
  const [innerImageCaption, setInnerImageCaption] = useState('');

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

  // Helper to auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingPostId) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
      setMetaTitle(`${newTitle} | Margalla Hills`);
      if (!imageAltText) {
        setImageAltText(`${newTitle} - Margalla Hills`);
      }
    }
  };

  // Auto-detect and format headings from raw text (Word, Docs, WhatsApp copy-pastes)
  const formatHeadingsAutomatically = () => {
    if (!content.trim()) return;
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

      // Check if already markdown heading
      if (/^#{1,6}\s+/.test(trimmed)) {
        processed.push(line);
        continue;
      }

      // Numbered items like "1. Restaurant Name" or "1) Restaurant Name"
      const numberedMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)$/);
      if (numberedMatch && numberedMatch[2].length < 75 && !numberedMatch[2].endsWith('.')) {
        processed.push(`## ${trimmed}`);
        continue;
      }

      // Short standalone section labels
      const subHeadingKeywords = ['pros:', 'cons:', 'what to eat:', 'what to check:', 'best for:', 'atmosphere:', 'verdict:', 'highlights:', 'conclusion:'];
      const isSubHeading = subHeadingKeywords.some(k => trimmed.toLowerCase().startsWith(k));
      if (isSubHeading) {
        processed.push(`### ${trimmed}`);
        continue;
      }

      // Short title line without terminal punctuation
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
    if (showToast) showToast('Headings formatted with H2 & H3 tags!');
  };

  // Automatic smart internal and external link insertion for common high-ranking keywords
  const applyAutomaticLinkOptimization = () => {
    if (!content.trim()) return;
    let updated = content;

    const linkKeywords: { keyword: string; url: string; isExternal?: boolean }[] = [
      { keyword: 'fine dining menu', url: '/menu' },
      { keyword: 'our menu', url: '/menu' },
      { keyword: 'full menu', url: '/menu' },
      { keyword: 'tasting menu', url: '/tasting-menu' },
      { keyword: 'wine cellar', url: '/wine-cellar' },
      { keyword: 'private dining', url: '/private-dining' },
      { keyword: 'locations', url: '/locations' },
      { keyword: 'Islamabad restaurants', url: '/locations' },
      { keyword: 'Margalla Hills', url: '/' },
      { keyword: 'botanicals', url: '/botanicals' },
      { keyword: 'culinary heritage', url: '/heritage' },
      { keyword: 'reserve a table', url: '/contact' },
      { keyword: 'reservations', url: '/contact' },
      { keyword: 'contact concierge', url: '/contact' },
      { keyword: 'Google Maps Local Pack', url: 'https://support.google.com/business', isExternal: true },
      { keyword: 'Michelin Guide', url: 'https://guide.michelin.com', isExternal: true },
      { keyword: 'TripAdvisor', url: 'https://www.tripadvisor.com', isExternal: true }
    ];

    let count = 0;
    linkKeywords.forEach(({ keyword, url, isExternal }) => {
      const regex = new RegExp(`(?<!\\[|\\()\\b(${keyword})\\b(?![^\\[]*\\]|\\))`, 'i');
      if (regex.test(updated)) {
        updated = updated.replace(regex, (match) => {
          count++;
          return isExternal
            ? `[${match}](${url})`
            : `[${match}](${url})`;
        });
      }
    });

    setContent(updated);
    if (showToast) {
      showToast(count > 0 ? `Successfully linked ${count} keywords!` : 'Content already optimized with links.');
    }
  };

  const openNewPostForm = () => {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setTargetKeyword('');
    setMetaTitle('');
    setMetaDescription('');
    setCategory('hospitality-seo');
    setExcerpt('');
    setContent(`# Introduction\n\nWrite your high-ranking SEO article here targeting your primary keyword.\n\n## 1. Key Insights & Strategy\n\nAdd actionable content with relevant internal links.`);
    setFeaturedImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80');
    setImageAltText('');
    setAuthorName('SEO Content Specialist');
    setStatus('published');
    setFormError(null);
    setIsEditing(true);
  };

  const openEditPostForm = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setTargetKeyword(post.seo?.focusKeyword || '');
    setMetaTitle(post.seo?.seoTitle || post.title);
    setMetaDescription(post.seo?.metaDescription || post.excerpt);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setFeaturedImage(post.featuredImage || '');
    setImageAltText(post.imageAltText || `${post.title} - Margalla Hills`);
    setAuthorName(post.author.name || 'Editorial Team');
    setStatus(post.status === 'scheduled' ? 'draft' : post.status);
    setFormError(null);
    setIsEditing(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setFormError('Title and URL slug are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    const postPayload: Partial<BlogPost> = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: content,
      featuredImage: featuredImage.trim(),
      imageAltText: imageAltText.trim() || `${title.trim()} - Margalla Hills SEO Article`,
      category: category,
      tags: targetKeyword ? [targetKeyword, 'Margalla Hills', 'Islamabad Dining'] : ['Margalla Hills'],
      author: {
        name: authorName.trim(),
        role: 'SEO Contributor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      status: status,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTimeMinutes: Math.max(2, Math.ceil(content.split(/\s+/).length / 200)),
      seo: {
        seoTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        slug: slug.trim().toLowerCase(),
        focusKeyword: targetKeyword.trim(),
        secondaryKeywords: [],
        canonicalUrl: `/blog/${slug.trim().toLowerCase()}`,
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: metaTitle.trim() || title.trim(),
        ogDescription: metaDescription.trim() || excerpt.trim(),
        ogImage: featuredImage.trim(),
        schemaType: 'BlogPosting',
        searchIntent: 'Informational'
      }
    };

    try {
      if (editingPostId) {
        await api.updateBlogPost(editingPostId, postPayload);
        if (showToast) showToast(`Article "${title}" updated successfully!`);
      } else {
        await api.createBlogPost(postPayload);
        if (showToast) showToast(`New article "${title}" published live!`);
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
            <span>Google-Indexed SEO CMS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">
            Blog &amp; Knowledge Base Publishing
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
            Create high-ranking SEO publications, configure Google canonical URLs, automate heading structures, insert content images with ALT tags, and route keywords with internal links.
          </p>
        </div>

        <button
          onClick={openNewPostForm}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl transition flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write &amp; Publish New Article</span>
        </button>
      </div>

      {/* Editor Drawer / Form Modal */}
      {isEditing && (
        <div className="bg-[#121212] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit className="w-4 h-4 text-amber-400" />
                <span>{editingPostId ? 'Edit Article & SEO Directives' : 'Compose & Publish New SEO Article'}</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Every published post automatically injects schema JSON-LD, OpenGraph cards, and Google Index tags.
              </p>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="text-neutral-400 hover:text-white p-2 text-xs rounded-lg hover:bg-neutral-800 transition cursor-pointer"
            >
              ✕ Cancel
            </button>
          </div>

          {formError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSavePost} className="space-y-6">
            {/* Row 1: Title & Target Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Article Title (H1) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Top 10 Scenic Restaurants in Margalla Hills: Dining Above the Clouds"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  URL Slug (Permanent SEO Route) <span className="text-amber-400">*</span>
                </label>
                <div className="flex items-center bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs">
                  <span className="text-neutral-500 font-mono mr-1">/blog/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="top-10-scenic-restaurants-margalla-hills"
                    className="flex-1 bg-transparent text-white font-mono focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Target Keyword & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Primary Target Focus Keyword
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g., restaurants in margalla hills islamabad"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Category / Topic Silo
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="hospitality-seo">Restaurant &amp; Hospitality SEO</option>
                  <option value="local-seo">Local SEO &amp; Google Maps</option>
                  <option value="technical-seo">Schema &amp; Technical SEO</option>
                  <option value="keyword-research">Keyword Research &amp; Search Intent</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Meta Title & Meta Description (Google SERP Snippet) */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                  Google SERP Snippet Optimization
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">Live Search Preview</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-neutral-300 font-medium">Meta Title Tag</span>
                  <span className={`font-mono text-[10px] ${metaTitle.length > 60 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    {metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Compelling title displayed on Google search results"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-neutral-300 font-medium">Meta Description</span>
                  <span className={`font-mono text-[10px] ${metaDescription.length > 160 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    {metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Summary snippet with call-to-action shown under Google title"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Row 4: Cover Image & Alt Text & Author & Excerpt */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  Cover / Feature Image URL
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
                  <span>Image ALT Text (SEO)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Google Image SEO</span>
                </label>
                <input
                  type="text"
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  placeholder="e.g. Best Italian pasta and pizza in Kohsar Market Islamabad"
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
                  placeholder="e.g., Margalla Hills Culinary Critic"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Article Excerpt (Short Summary)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief 1-2 sentence preview for cards and index feeds..."
                className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Row 5: Full Article Content with Heading Automation, Inner Image, and Link Helpers */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Full Article Body (Markdown Supported)
                </label>

                {/* Automation Action Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={formatHeadingsAutomatically}
                    className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    title="Auto-detect plain text headings and convert into H2/H3 tags"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Auto-Format Headings (H2/H3)</span>
                  </button>

                  <button
                    type="button"
                    onClick={applyAutomaticLinkOptimization}
                    className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    title="Auto-link keywords like menu, reservation, locations, and Michelin guide"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-Pick Internal &amp; External Links</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowInnerImageModal(true)}
                    className="px-2.5 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    title="Insert content inner image with custom alt text"
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>+ Insert Inner Image</span>
                  </button>
                </div>
              </div>

              {/* Quick Markdown Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setContent(prev => prev + '\n\n## Main Heading (H2)\n')}
                  className="px-2.5 py-1 bg-black hover:bg-neutral-800 text-neutral-300 rounded font-semibold text-[11px] border border-neutral-800 flex items-center gap-1 cursor-pointer"
                >
                  <Heading2 className="w-3 h-3 text-amber-400" /> H2 Heading
                </button>
                <button
                  type="button"
                  onClick={() => setContent(prev => prev + '\n\n### Sub-Section (H3)\n')}
                  className="px-2.5 py-1 bg-black hover:bg-neutral-800 text-neutral-300 rounded font-semibold text-[11px] border border-neutral-800 flex items-center gap-1 cursor-pointer"
                >
                  <Heading3 className="w-3 h-3 text-emerald-400" /> H3 Heading
                </button>
                <button
                  type="button"
                  onClick={() => setContent(prev => prev + ' **Bold Text** ')}
                  className="px-2 py-1 bg-black hover:bg-neutral-800 text-neutral-300 rounded text-[11px] border border-neutral-800 cursor-pointer"
                >
                  <Bold className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(prev => prev + ' *Italic Text* ')}
                  className="px-2 py-1 bg-black hover:bg-neutral-800 text-neutral-300 rounded text-[11px] border border-neutral-800 cursor-pointer"
                >
                  <Italic className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setContent(prev => prev + '\n- Bullet point 1\n- Bullet point 2\n')}
                  className="px-2 py-1 bg-black hover:bg-neutral-800 text-neutral-300 rounded text-[11px] border border-neutral-800 cursor-pointer"
                >
                  <List className="w-3 h-3" />
                </button>

                <div className="h-4 w-px bg-neutral-800 mx-1" />

                {/* Quick Internal Linking Helper */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const anchor = prompt("Internal Link Text (e.g. Signature Charcoal BBQ):", "Our Signature Menu");
                      const target = prompt("Target URL path (e.g. /menu, /reservations, /about, /wine-cellar):", "/menu");
                      if (anchor && target) {
                        setContent((prev) => prev + ` [${anchor}](${target}) `);
                      }
                    }}
                    className="px-2 py-1 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 rounded text-[10px] font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    <Link2 className="w-3 h-3" /> + Custom Internal Link
                  </button>

                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const [url, title] = e.target.value.split("|");
                        setContent((prev) => prev + ` [${title}](${url}) `);
                        e.target.value = "";
                      }
                    }}
                    className="bg-black text-[10px] text-neutral-300 border border-neutral-800 rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="">Quick Presets...</option>
                    <option value="/menu|Fine Dining Menu">Menu (/menu)</option>
                    <option value="/contact|Reserve a Table">Reservations (/contact)</option>
                    <option value="/about|Our Hillside Heritage">About (/about)</option>
                    <option value="/wine-cellar|Grand Wine Cellar">Wine Cellar (/wine-cellar)</option>
                    <option value="/locations|Global Flagships">Locations (/locations)</option>
                    <option value="/botanicals|Artisan Spices">Botanicals (/botanicals)</option>
                  </select>
                </div>

                <div className="h-4 w-px bg-neutral-800 mx-1" />

                {/* Quick External Linking Helper */}
                <button
                  type="button"
                  onClick={() => {
                    const anchor = prompt("External Link Text (e.g. Michelin Guide or Forbes):", "Michelin Guide Review");
                    const url = prompt("External Target URL (must start with https://):", "https://");
                    if (anchor && url) {
                      setContent((prev) => prev + ` [${anchor}](${url}) `);
                    }
                  }}
                  className="px-2 py-1 bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-800/50 rounded text-[10px] font-medium transition cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> + External Link
                </button>
              </div>

              <textarea
                rows={14}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Article Heading&#10;&#10;Write or paste your article here. Use the 'Auto-Format Headings' button above to automatically convert pasted text into proper H2 & H3 structure!"
                className="w-full p-4 bg-black border border-neutral-800 rounded-xl text-xs text-neutral-200 font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            {/* Status & Submit Row */}
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
            placeholder="Search published articles by title, target URL slug, or keyword..."
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
              Click &quot;Write &amp; Publish New Article&quot; to launch your first SEO post with custom target URL and Google metadata.
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
                    {post.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {post.excerpt || post.seo?.metaDescription}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span>By {post.author.name}</span>
                    <span>&bull;</span>
                    <span>{new Date(post.publishedAt || '').toLocaleDateString()}</span>
                    <span>&bull;</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (onNavigateToPost) {
                        onNavigateToPost(`/blog/${post.slug}`);
                      } else {
                        window.open(`/blog/${post.slug}`, '_blank');
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
                    onClick={() => handleDeletePost(post.id, post.title)}
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

      {/* Inner Content Image Dialog Modal */}
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
                  const alt = innerImageAlt.trim() || title || 'Margalla Hills culinary post';
                  const captionMarkdown = innerImageCaption.trim() ? `\n*${innerImageCaption.trim()}*\n` : '';
                  const markdownImage = `\n\n![${alt}](${innerImageUrl.trim()})${captionMarkdown}\n\n`;
                  setContent((prev) => prev + markdownImage);
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
    </div>
  );
}
