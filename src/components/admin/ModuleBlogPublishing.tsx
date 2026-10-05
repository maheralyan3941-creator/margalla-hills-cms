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

  // Form Fields - Updated to Muhammad Abid
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
  const [authorName, setAuthorName] = useState('Muhammad Abid');
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
          return isExternal ? `[${match}](${url})` : `[${match}](${url})`;
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
    setContent(`# Introduction\n\nWrite your high-ranking SEO article here.\n\n## 1. Key Insights\n\nAdd content here.`);
    setFeaturedImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80');
    setImageAltText('');
    setAuthorName('Muhammad Abid');
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
    setAuthorName(post.author.name || 'Muhammad Abid');
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
      imageAltText: imageAltText.trim() || `${title.trim()} - Margalla Hills`,
      category: category,
      tags: targetKeyword ? [targetKeyword, 'Margalla Hills'] : ['Margalla Hills'],
      author: {
        name: authorName.trim(),
        role: 'Travel Writer & Storyteller',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
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
        if (showToast) showToast(`Article updated successfully!`);
      } else {
        await api.createBlogPost(postPayload);
        if (showToast) showToast(`Article published live!`);
      }
      setIsEditing(false);
      await fetchPosts();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!window.confirm(`Delete "${postTitle}"?`)) return;
    try {
      await api.deleteBlogPost(id);
      if (showToast) showToast(`Article removed.`);
      await fetchPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete.');
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#181612] p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>SEO CMS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">Blog Publishing</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">Create and manage high-ranking SEO publications.</p>
        </div>
        <button onClick={openNewPostForm} className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shrink-0">
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {isEditing && (
        <div className="bg-[#121212] p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Edit className="w-4 h-4 text-amber-400" /> <span>{editingPostId ? 'Edit Article' : 'New Article'}</span></h3>
            <button onClick={() => setIsEditing(false)} className="text-neutral-400 hover:text-white p-2 text-xs rounded-lg hover:bg-neutral-800 transition cursor-pointer">✕ Cancel</button>
          </div>

          <form onSubmit={handleSavePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Title (H1) *</label>
                <input type="text" required value={title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">URL Slug *</label>
                <div className="flex items-center bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs">
                  <span className="text-neutral-500 font-mono">/blog/</span>
                  <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} className="flex-1 bg-transparent text-white font-mono focus:outline-none ml-1" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Target Focus Keyword</label>
                <input type="text" value={targetKeyword} onChange={(e) => setTargetKeyword(e.target.value)} className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3.5 py-2.5 bg-black border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none">
                  <option value="hospitality-seo">Hospitality SEO</option>
                  <option value="local-seo">Local SEO</option>
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <label className="text-xs font-semibold text-neutral-300">Content Body (Markdown)</label>
                 <div className="flex gap-2">
                   <button type="button" onClick={formatHeadingsAutomatically} className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded text-[10px] hover:bg-amber-500/20 cursor-pointer">Auto-Headings</button>
                   <button type="button" onClick={() => setShowInnerImageModal(true)} className="px-2 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded text-[10px] hover:bg-sky-500/20 cursor-pointer">+ Image</button>
                 </div>
               </div>
               <textarea rows={12} value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-4 bg-black border border-neutral-800 rounded-xl text-xs text-neutral-200 font-mono focus:border-amber-400 focus:outline-none leading-relaxed" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-neutral-400">Status:</span>
                <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                  <button type="button" onClick={() => setStatus('published')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${status === 'published' ? 'bg-emerald-500 text-black' : 'text-neutral-400'}`}>Live</button>
                  <button type="button" onClick={() => setStatus('draft')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${status === 'draft' ? 'bg-amber-400 text-black' : 'text-neutral-400'}`}>Draft</button>
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-neutral-900 text-neutral-300 text-xs rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-400 text-black font-extrabold text-xs rounded-xl transition shadow-lg cursor-pointer disabled:opacity-50">
                  {saving ? 'Saving...' : 'Publish Article'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg">
        <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 text-xs font-semibold text-neutral-400">All Articles ({filteredPosts.length})</div>
        {loading ? <div className="p-8 text-center text-xs text-neutral-500">Loading...</div> : 
          <div className="divide-y divide-neutral-800/60">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-4 sm:p-5 hover:bg-neutral-900/40 transition flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'}`}>{post.status}</span>
                    <span className="text-[10px] text-amber-400 font-mono">/blog/{post.slug}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{post.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onNavigateToPost?.(`/blog/${post.slug}`)} className="p-2 bg-neutral-900 text-emerald-400 rounded-lg border border-neutral-800 cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => openEditPostForm(post)} className="p-2 bg-neutral-900 text-amber-400 rounded-lg border border-neutral-800 cursor-pointer"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDeletePost(post.id, post.title)} className="p-2 bg-neutral-900 text-rose-400 rounded-lg border border-neutral-800 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>

      {showInnerImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-neutral-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-white font-bold text-sm">Insert Image</h3>
            <div className="space-y-3">
              <input type="url" value={innerImageUrl} onChange={(e) => setInnerImageUrl(e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white" />
              <input type="text" value={innerImageAlt} onChange={(e) => setInnerImageAlt(e.target.value)} placeholder="ALT Text (SEO)" className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-white" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowInnerImageModal(false)} className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-xl text-xs font-medium cursor-pointer">Cancel</button>
              <button onClick={() => { setContent(p => p + `\n\n![${innerImageAlt}](${innerImageUrl})\n\n`); setShowInnerImageModal(false); }} className="px-5 py-2 bg-sky-500 text-black rounded-xl text-xs font-bold cursor-pointer">Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
