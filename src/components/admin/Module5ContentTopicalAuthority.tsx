import React, { useState } from 'react';
import { BlogPost, TopicClusterItem, EntityTrackerItem, PageSEOItem } from '../../types';
import {
  Layers,
  FileEdit,
  Network,
  HelpCircle,
  BrainCircuit,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Sparkles,
  Link2,
  CheckCircle2,
  Code2,
  X
} from 'lucide-react';

interface Module5ContentTopicalAuthorityProps {
  posts?: BlogPost[];
  topicClusters: TopicClusterItem[];
  entities: EntityTrackerItem[];
  pages?: PageSEOItem[];
  onAddPost?: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdatePost?: (id: string, updates: Partial<BlogPost>) => void;
  onDeletePost?: (id: string) => void;
  onAddTopicCluster: (cluster: Omit<TopicClusterItem, 'id'>) => void;
  onUpdateTopicCluster?: (id: string, updates: Partial<TopicClusterItem>) => void;
  onDeleteTopicCluster: (id: string) => void;
  onAddEntity?: (entity: Omit<EntityTrackerItem, 'id'>) => void;
  onDeleteEntity?: (id: string) => void;
  onUpdatePageFAQ?: (pageId: string, faqs: { question: string; answer: string }[]) => void;
}

export function Module5ContentTopicalAuthority({
  posts = [],
  topicClusters,
  entities,
  pages = [],
  onAddPost = () => {},
  onUpdatePost = () => {},
  onDeletePost = () => {},
  onAddTopicCluster,
  onUpdateTopicCluster,
  onDeleteTopicCluster,
  onAddEntity = () => {},
  onDeleteEntity = () => {},
  onUpdatePageFAQ = () => {}
}: Module5ContentTopicalAuthorityProps) {
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'clusters' | 'internalLinks' | 'faqs' | 'entities'>('posts');

  // Blog Post Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Gastronomy');
  const [postFocusKeyword, setPostFocusKeyword] = useState('Margalla Hills fine dining');
  const [postMetaDesc, setPostMetaDesc] = useState('');

  // Topic Cluster Modal State
  const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
  const [pillarTopic, setPillarTopic] = useState('');
  const [targetUrl, setTargetUrl] = useState('/menu');
  const [subTopicsInput, setSubTopicsInput] = useState('');
  const [clusterNotes, setClusterNotes] = useState('');

  // Internal Linking Simulator State
  const [draftContent, setDraftContent] = useState(
    'Perched 1,500 meters above Islamabad, Margalla Hills features an extraordinary tasting menu inspired by wild Himalayan morels and pure Kashmiri saffron. Our sommelier cellar houses over 800 vintages, complemented by our continuous 400 culinary chapters compendium.'
  );

  // FAQ Page selection state
  const [selectedFaqPageId, setSelectedFaqPageId] = useState<string>(pages[0]?.id || 'page-home');
  const currentFaqPage = pages.find((p) => p.id === selectedFaqPageId) || pages[0];
  const [faqList, setFaqList] = useState<{ question: string; answer: string }[]>(currentFaqPage?.faqSection || []);

  const handleSelectFaqPage = (id: string) => {
    setSelectedFaqPageId(id);
    const p = pages.find((page) => page.id === id);
    if (p) {
      setFaqList(p.faqSection || []);
    }
  };

  const handleAddFaq = () => {
    setFaqList([...faqList, { question: 'New Question?', answer: 'Detailed comprehensive answer here.' }]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };

  const handleDeleteFaq = (index: number) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const handleSaveFaqs = () => {
    onUpdatePageFAQ(selectedFaqPageId, faqList);
    alert('FAQs updated and JSON-LD FAQPage Schema refreshed for Google rich snippets!');
  };

  // Internal Link Detection logic
  const internalLinkDictionary = [
    { term: 'Margalla Hills', url: '/', anchor: 'Margalla Hills Luxury Sanctuary' },
    { term: 'tasting menu', url: '/tasting-menu', anchor: '7-course degustation tasting menu' },
    { term: 'Kashmiri saffron', url: '/botanicals/kashmiri-mongra-saffron', anchor: 'Grade 1 Kashmiri Mongra saffron' },
    { term: 'sommelier cellar', url: '/wine-cellar', anchor: 'Subterranean 800-bottle sommelier cellar' },
    { term: 'compendium', url: '/compendium', anchor: '400 Culinary Chapters Compendium' },
    { term: 'Islamabad', url: '/locations', anchor: 'Islamabad Flagship Dining' }
  ];

  const detectedLinks = internalLinkDictionary.filter((item) =>
    draftContent.toLowerCase().includes(item.term.toLowerCase())
  );

  // Post Submission
  const handleOpenPostModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setPostTitle(post.title);
      setPostSlug(post.slug);
      setPostExcerpt(post.excerpt);
      setPostContent(post.content);
      setPostCategory(post.category);
      setPostFocusKeyword(post.focusKeyword || 'Margalla Hills dining');
      setPostMetaDesc(post.metaDescription || '');
    } else {
      setEditingPost(null);
      setPostTitle('');
      setPostSlug('');
      setPostExcerpt('');
      setPostContent('');
      setPostCategory('Gastronomy');
      setPostFocusKeyword('Margalla Hills dining');
      setPostMetaDesc('');
    }
    setIsPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    if (editingPost) {
      onUpdatePost(editingPost.id, {
        title: postTitle,
        slug: postSlug || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: postExcerpt,
        content: postContent,
        category: postCategory,
        focusKeyword: postFocusKeyword,
        metaDescription: postMetaDesc
      });
    } else {
      onAddPost({
        title: postTitle,
        slug: postSlug || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: postExcerpt,
        content: postContent,
        category: postCategory,
        author: {
          name: 'Executive Chef Marcus Sterling',
          role: 'Culinary Director',
          avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80'
        },
        publishedAt: new Date().toISOString().split('T')[0],
        coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        tags: ['Heritage', 'Margalla Hills', 'Gastronomy'],
        focusKeyword: postFocusKeyword,
        metaDescription: postMetaDesc,
        readTimeMinutes: Math.max(2, Math.ceil(postContent.split(' ').length / 180)),
        schemaType: 'Article'
      });
    }
    setIsPostModalOpen(false);
  };

  // Cluster Submission
  const handleCreateCluster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarTopic.trim()) return;

    const subTopicsArray = subTopicsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddTopicCluster({
      pillarTopic,
      subTopics: subTopicsArray.length ? subTopicsArray : ['Foundational Guide', 'Advanced Science'],
      targetUrl,
      intent: 'Informational',
      status: 'Pillar Published',
      notes: clusterNotes
    });

    setIsClusterModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Section 5 &bull; Content SEO, Topical Authority &amp; Semantic Entities</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          Topical Domination &amp; Knowledge Graph Engine
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 max-w-3xl">
          Publish CMS blog articles, structure pillar-cluster topic architectures, automate internal link recommendations, generate FAQ rich snippet schemas, and track semantic entity mentions.
        </p>

        {/* Sub-tab pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 border-t border-neutral-800 pt-4">
          <button
            onClick={() => setActiveSubTab('posts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
              activeSubTab === 'posts'
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Blog / CMS Articles ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('clusters')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
              activeSubTab === 'clusters'
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Topic Cluster Builder ({topicClusters.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('internalLinks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
              activeSubTab === 'internalLinks'
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Internal Link Suggester</span>
          </button>

          <button
            onClick={() => setActiveSubTab('faqs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
              activeSubTab === 'faqs'
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ Rich Snippet Builder</span>
          </button>

          <button
            onClick={() => setActiveSubTab('entities')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
              activeSubTab === 'entities'
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Entity Mention Tracker ({entities.length})</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Blog / CMS System */}
      {activeSubTab === 'posts' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-neutral-800">
            <div>
              <h3 className="font-serif text-base font-bold text-white">CMS Editorial Posts &amp; Guides</h3>
              <p className="text-xs text-neutral-400">Manage authoritative content for organic keyword rankings</p>
            </div>
            <button
              onClick={() => handleOpenPostModal()}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-emerald-400 font-bold border border-neutral-800">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif text-sm font-bold text-white line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-neutral-500">
                      <span>Focus KW:</span>
                      <span className="text-cyan-400 font-semibold">{post.focusKeyword || 'Margalla Hills'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenPostModal(post)}
                      className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded-lg cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete post "${post.title}"?`)) onDeletePost(post.id);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 bg-neutral-900 rounded-lg cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Topic Cluster Builder */}
      {activeSubTab === 'clusters' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-neutral-800">
            <div>
              <h3 className="font-serif text-base font-bold text-white">Hub &amp; Spoke Topic Cluster Builder</h3>
              <p className="text-xs text-neutral-400">Interlink Pillar Pages with supporting Cluster Spoke content to build domain authority</p>
            </div>
            <button
              onClick={() => {
                setPillarTopic('');
                setTargetUrl('/menu');
                setSubTopicsInput('');
                setClusterNotes('');
                setIsClusterModalOpen(true);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>New Topic Cluster</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-[#121212] p-5 rounded-2xl border border-neutral-800 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
                      PILLAR HUB
                    </span>
                    <button
                      onClick={() => onDeleteTopicCluster(cluster.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif text-base font-bold text-white">{cluster.pillarTopic}</h4>
                  <a
                    href={cluster.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-emerald-400 hover:underline block"
                  >
                    Target: {cluster.targetUrl}
                  </a>

                  {/* Subtopics branches */}
                  <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Sub-Topics / Spoke Branches ({cluster.subTopics.length}):
                    </span>
                    <ul className="space-y-1">
                      {cluster.subTopics.map((sub, idx) => (
                        <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
                  <span className="font-semibold text-neutral-300">Status:</span> {cluster.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Internal Linking Suggestions */}
      {activeSubTab === 'internalLinks' && (
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5 animate-in fade-in">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Smart Internal Link Recommendation Engine</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Type or paste article content. The engine scans your text against your site architecture to recommend contextual internal links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-300">Content Draft Workspace</label>
              <textarea
                rows={8}
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-400">
                  Auto-Detected Opportunities ({detectedLinks.length})
                </span>
                <span className="text-[11px] font-mono text-emerald-400">100% Crawlable Links</span>
              </div>

              <div className="space-y-2">
                {detectedLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{link.term}</span>
                        <span className="text-neutral-500">&rarr;</span>
                        <span className="text-emerald-400 font-mono text-[11px]">{link.url}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 font-sans">
                        Recommended Anchor: &quot;{link.anchor}&quot;
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const linkTag = `<a href="${link.url}">${link.term}</a>`;
                        navigator.clipboard.writeText(linkTag);
                        alert(`Copied HTML anchor: ${linkTag}`);
                      }}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition cursor-pointer text-[11px] shrink-0"
                    >
                      Copy Link Tag
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: FAQ Section Builder */}
      {activeSubTab === 'faqs' && (
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>FAQ Section Manager &amp; Rich Results Schema</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Add structured Question &amp; Answer pairs to any page. Generates valid JSON-LD FAQPage markup for Google SERP drop-down carousels.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedFaqPageId}
                onChange={(e) => handleSelectFaqPage(e.target.value)}
                className="p-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.path || '/'})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddFaq}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => (
              <div key={idx} className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                    placeholder="Question (e.g. Do you cater private events in Islamabad?)"
                    className="flex-1 p-2 bg-black/50 border border-neutral-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-2 text-neutral-400 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                  placeholder="Answer text that Google SERP will expand for users..."
                  className="w-full p-2 bg-black/50 border border-neutral-800 rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3 border-t border-neutral-800">
            <button
              onClick={handleSaveFaqs}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save &amp; Generate FAQPage Schema</span>
            </button>
          </div>
        </div>
      )}

      {/* SubTab 5: Entity Mention Tracker */}
      {activeSubTab === 'entities' && (
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-lg space-y-5 animate-in fade-in">
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              <span>Semantic SEO &amp; Knowledge Graph Entity Tracker</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Google uses entities rather than just strings. Track how strongly your domain is associated with verified Wikipedia / Wikidata knowledge graph nodes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="p-3">Entity Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Relevance Score</th>
                  <th className="p-3 text-center">Site Occurrences</th>
                  <th className="p-3">Associated Keywords</th>
                  <th className="p-3 text-right">Knowledge Graph Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 font-sans">
                {entities.map((ent) => (
                  <tr key={ent.id} className="hover:bg-neutral-900/50 transition">
                    <td className="p-3 font-semibold text-white">{ent.entityName}</td>
                    <td className="p-3 text-neutral-400 font-mono text-[11px]">{ent.entityType}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono border border-emerald-500/30">
                        {ent.relevanceScore}%
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-cyan-400 font-bold">
                      {ent.recognizedOccurrences}
                    </td>
                    <td className="p-3 text-neutral-300">
                      <div className="flex flex-wrap gap-1">
                        {ent.associatedKeywords.map((kw, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono">
                      {ent.wikiUrl ? (
                        <a
                          href={ent.wikiUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline flex items-center justify-end gap-1 text-[11px]"
                        >
                          <span>Wikidata</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-neutral-600">Local Entity</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create or Edit Article */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingPost ? 'Edit Blog Article' : 'Create New SEO Article'}
              </h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. The Untold Secrets of Kashmiri Saffron"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-serif font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                    placeholder="untold-secrets-kashmiri-saffron"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Primary Focus Keyword</label>
                  <input
                    type="text"
                    value={postFocusKeyword}
                    onChange={(e) => setPostFocusKeyword(e.target.value)}
                    placeholder="e.g. kashmiri saffron dining"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-semibold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Gastronomy">Gastronomy</option>
                    <option value="Terroir">Terroir</option>
                    <option value="Sommelier">Sommelier</option>
                    <option value="Heritage">Heritage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Excerpt / Teaser</label>
                <textarea
                  rows={2}
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  placeholder="Summary for search card listings..."
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Full Article Content (Markdown)</label>
                <textarea
                  rows={6}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write the full guide here..."
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold cursor-pointer"
                >
                  {editingPost ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Topic Cluster */}
      {isClusterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Create Topic Cluster Hub</h3>
              <button
                onClick={() => setIsClusterModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCluster} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Main Pillar Topic</label>
                <input
                  type="text"
                  required
                  value={pillarTopic}
                  onChange={(e) => setPillarTopic(e.target.value)}
                  placeholder="e.g. Himalayan Foraging &amp; Organic Mountain Herbs"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Target Landing Page URL</label>
                <input
                  type="text"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="/botanicals or /menu"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Sub-Topics / Spoke Branches (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={subTopicsInput}
                  onChange={(e) => setSubTopicsInput(e.target.value)}
                  placeholder={'Wild Pine Forest Mushroom Foraging Guide\nAlpine Herbal Tea Distillation\nMedicinal Properties of Himalayan Herbs'}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsClusterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold cursor-pointer"
                >
                  Create Cluster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
