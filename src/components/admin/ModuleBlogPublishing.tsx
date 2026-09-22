import React, { useState, useEffect } from 'react';
import { BlogPost, BlogCategory } from '../../types';
import { api } from '../../lib/api';
import {
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
  AlertCircle
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
  const [authorName, setAuthorName] = useState('SEO & Culinary Editorial Team');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
      if (!metaTitle) setMetaTitle(newTitle);
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
      imageAltText: `${title} - Margalla Hills SEO Article`,
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
            <span>Live CMS & Content Publisher</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Real Blog &amp; Article Publisher
          </h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
            Publish real, search-optimized articles that go live immediately on <code className="text-amber-400">/blog</code> and individual target URLs to drive organic Google traffic.
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
                Configure your target URL, focus keyword, meta snippet, and rich article content.
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
            {/* Row 1: Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Top 10 Scenic Restaurants in Margalla Hills Islamabad"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Target URL Slug (Live Path) *
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-neutral-900 border border-r-0 border-neutral-800 rounded-l-xl text-neutral-500 font-mono text-xs">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="top-scenic-restaurants-margalla-hills"
                    className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-r-xl text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Focus Keyword & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Primary Target Keyword
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g., restaurants in margalla hills islamabad"
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="hospitality-seo">Restaurant &amp; Hospitality SEO</option>
                  <option value="local-seo">Local SEO &amp; Google Maps</option>
                  <option value="technical-seo">Technical SEO &amp; Schema</option>
                  <option value="culinary-heritage">Culinary Heritage &amp; Dining Guides</option>
                  <option value="events-catering">VIP Dining &amp; Private Events</option>
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

            {/* Row 4: Cover Image & Author & Excerpt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Cover Image URL
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

            {/* Row 5: Full Article Content (Markdown) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Full Article Body (Markdown Supported)
                </label>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
                  <span>Supports ## Headings, **bold**, lists, code</span>
                </div>
              </div>
              <textarea
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Article Heading&#10;&#10;Write your deep-dive article here..."
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
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
    </div>
  );
}
