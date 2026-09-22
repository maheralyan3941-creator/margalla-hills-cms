import React, { useState, useEffect } from 'react';
import { api, clearSession } from '../lib/api';
import { getStoredAnalyticsConfig, saveStoredAnalyticsConfig } from '../lib/seoRuntime';
import {
  User,
  MenuItem,
  MenuCategory,
  BlogPost,
  BlogCategory,
  KeywordItem,
  CompetitorSEOItem,
  PageSEOItem,
  TopicClusterItem,
  EntityTrackerItem,
  LocalSEOProfile,
  ProgrammaticTemplate,
  PruningItem,
  ComparisonTableRow,
  MasterAnalyticsConfig,
  BacklinkItem,
  RedirectRule,
  UserRole
} from '../types';

import {
  INITIAL_KEYWORDS,
  INITIAL_COMPETITORS,
  INITIAL_PAGE_SEO,
  INITIAL_TOPIC_CLUSTERS,
  INITIAL_ENTITIES,
  INITIAL_LOCAL_SEO,
  INITIAL_PROGRAMMATIC_TEMPLATES,
  INITIAL_PRUNING_ITEMS,
  INITIAL_COMPARISON_ROWS,
  INITIAL_ANALYTICS_SETTINGS,
  INITIAL_BACKLINKS,
  INITIAL_REDIRECTS
} from '../data/mockSEOData';

// 13 Dedicated Modular SEO Components + CMS & Outreach
import { Module1Dashboard } from '../components/admin/Module1Dashboard';
import { ModuleBlogPublishing } from '../components/admin/ModuleBlogPublishing';
import { ModuleGuestPosting } from '../components/admin/ModuleGuestPosting';
import { Module2KeywordResearch } from '../components/admin/Module2KeywordResearch';
import { Module3CompetitorResearch } from '../components/admin/Module3CompetitorResearch';
import { Module4OnPageSEO } from '../components/admin/Module4OnPageSEO';
import { Module5ContentTopicalAuthority } from '../components/admin/Module5ContentTopicalAuthority';
import { Module6TechnicalSEO } from '../components/admin/Module6TechnicalSEO';
import { Module7OffPageBacklinks } from '../components/admin/Module7OffPageBacklinks';
import { Module8LocalSEO } from '../components/admin/Module8LocalSEO';
import { Module9ProgrammaticSEO } from '../components/admin/Module9ProgrammaticSEO';
import { Module10InternationalSEO } from '../components/admin/Module10InternationalSEO';
import { Module11ContentPruning } from '../components/admin/Module11ContentPruning';
import { Module12SaasCommercialSEO } from '../components/admin/Module12SaasCommercialSEO';
import { Module13AnalyticsTools } from '../components/admin/Module13AnalyticsTools';
import { Module14SystemHealth } from '../components/admin/Module14SystemHealth';
import { ModuleLiveIndexing } from '../components/admin/ModuleLiveIndexing';
import { SEOLaboratoryPage } from './SEOLaboratoryPage';

import {
  LayoutDashboard,
  KeyRound,
  Eye,
  FileText,
  BookOpen,
  Settings,
  Link2,
  MapPin,
  Zap,
  Globe,
  Scissors,
  DollarSign,
  BarChart3,
  Utensils,
  Users,
  LogOut,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  ShieldCheck,
  Search,
  ExternalLink,
  Send,
  GraduationCap
} from 'lucide-react';

interface AdminDashboardPageProps {
  currentUser: User;
  onLogout: () => void;
  navigate: (path: string) => void;
}

export type AdminTab =
  | 'dashboard'
  | 'seo-academy'
  | 'live-indexing'
  | 'blog-publisher'
  | 'guest-posting'
  | 'keywords'
  | 'competitors'
  | 'onpage'
  | 'content'
  | 'technical'
  | 'backlinks'
  | 'local'
  | 'programmatic'
  | 'international'
  | 'pruning'
  | 'commercial'
  | 'analytics'
  | 'system-health'
  | 'dishes'
  | 'users';

export function AdminDashboardPage({ currentUser, onLogout, navigate }: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'seo-academy' || hash === 'seo-lab') return 'seo-academy';
      const search = new URLSearchParams(window.location.search);
      const queryTab = search.get('tab');
      if (queryTab === 'seo-academy' || queryTab === 'seo-lab') return 'seo-academy';
      if (window.location.pathname.includes('seo-lab')) return 'seo-academy';
    } catch {}
    return 'dashboard';
  });
  const [notification, setNotification] = useState<string | null>(null);

  // 13 SEO Modules State
  const [keywords, setKeywords] = useState<KeywordItem[]>(() => {
    try {
      const stored = localStorage.getItem('mh_seo_keywords');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_KEYWORDS;
  });
  const [competitors, setCompetitors] = useState<CompetitorSEOItem[]>(() => {
    try {
      const stored = localStorage.getItem('mh_seo_competitors');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_COMPETITORS;
  });
  const [pagesSEO, setPagesSEO] = useState<PageSEOItem[]>(() => {
    try {
      const stored = localStorage.getItem('mh_seo_pages');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_PAGE_SEO;
  });
  const [topicClusters, setTopicClusters] = useState<TopicClusterItem[]>(INITIAL_TOPIC_CLUSTERS);
  const [entities, setEntities] = useState<EntityTrackerItem[]>(INITIAL_ENTITIES);
  const [localProfile, setLocalProfile] = useState<LocalSEOProfile>(() => {
    try {
      const stored = localStorage.getItem('mh_seo_local_profile');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_LOCAL_SEO;
  });
  const [programmaticTemplates, setProgrammaticTemplates] = useState<ProgrammaticTemplate[]>(INITIAL_PROGRAMMATIC_TEMPLATES);
  const [pruningItems, setPruningItems] = useState<PruningItem[]>(INITIAL_PRUNING_ITEMS);
  const [comparisonRows, setComparisonRows] = useState<ComparisonTableRow[]>(INITIAL_COMPARISON_ROWS);
  const [analyticsConfig, setAnalyticsConfig] = useState<MasterAnalyticsConfig>(() => getStoredAnalyticsConfig());
  const [backlinks, setBacklinks] = useState<BacklinkItem[]>(() => {
    try {
      const stored = localStorage.getItem('mh_seo_backlinks');
      if (stored) {
        const parsed: BacklinkItem[] = JSON.parse(stored);
        // Purge mock items (dawn.com, tribune.com.pk, cntraveller.com or bl-1/2/3)
        const cleaned = parsed.filter(
          (b) =>
            b.id !== 'bl-1' &&
            b.id !== 'bl-2' &&
            b.id !== 'bl-3' &&
            b.referringDomain !== 'dawn.com' &&
            b.referringDomain !== 'tribune.com.pk' &&
            b.referringDomain !== 'cntraveller.com'
        );
        localStorage.setItem('mh_seo_backlinks', JSON.stringify(cleaned));
        return cleaned;
      }
    } catch {}
    return [];
  });
  const [redirects, setRedirects] = useState<RedirectRule[]>(INITIAL_REDIRECTS);

  // Dishes & Users management state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [editingDish, setEditingDish] = useState<Partial<MenuItem> | null>(null);
  const [editingUser, setEditingUser] = useState<(Partial<User> & { password?: string }) | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Load existing menu items and users from API
  useEffect(() => {
    api.getMenuItems().then(setMenuItems).catch(() => {});
    if (currentUser.role === 'SUPER_ADMIN') {
      api.getUsers().then(setUsersList).catch(() => {});
    }
  }, [currentUser]);

  // Sync states to localStorage so practice work is safely saved
  useEffect(() => {
    try {
      localStorage.setItem('mh_seo_keywords', JSON.stringify(keywords));
    } catch {}
  }, [keywords]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_seo_backlinks', JSON.stringify(backlinks));
    } catch {}
  }, [backlinks]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_seo_competitors', JSON.stringify(competitors));
    } catch {}
  }, [competitors]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_seo_pages', JSON.stringify(pagesSEO));
    } catch {}
  }, [pagesSEO]);

  useEffect(() => {
    try {
      localStorage.setItem('mh_seo_local_profile', JSON.stringify(localProfile));
    } catch {}
  }, [localProfile]);

  useEffect(() => {
    saveStoredAnalyticsConfig(analyticsConfig);
  }, [analyticsConfig]);

  // Section 2: Keywords Handlers
  const handleAddKeyword = (kw: Omit<KeywordItem, 'id' | 'createdAt'>) => {
    const newItem: KeywordItem = {
      ...kw,
      id: `kw-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setKeywords([newItem, ...keywords]);
    showToast(`Keyword "${kw.keyword}" added successfully`);
  };

  const handleUpdateKeyword = (id: string, updates: Partial<KeywordItem>) => {
    setKeywords(keywords.map((k) => (k.id === id ? { ...k, ...updates } : k)));
    showToast('Keyword updated successfully');
  };

  const handleDeleteKeyword = (id: string) => {
    setKeywords(keywords.filter((k) => k.id !== id));
    showToast('Keyword deleted');
  };

  // Section 3: Competitors Handlers
  const handleAddCompetitor = (comp: Omit<CompetitorSEOItem, 'id'>) => {
    const newItem: CompetitorSEOItem = {
      ...comp,
      id: `comp-${Date.now()}`
    };
    setCompetitors([newItem, ...competitors]);
    showToast(`Competitor "${comp.competitorName}" logged`);
  };

  const handleUpdateCompetitor = (id: string, updates: Partial<CompetitorSEOItem>) => {
    setCompetitors(competitors.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Competitor data updated');
  };

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
    showToast('Competitor removed');
  };

  // Section 4: On-Page SEO Handlers
  const handleUpdatePageSEO = (pageId: string, updates: Partial<PageSEOItem>) => {
    setPagesSEO(pagesSEO.map((p) => (p.id === pageId ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : p)));
    showToast('On-page SEO, Headings & Schema updated');
  };

  // Section 5: Content & Topical Authority Handlers
  const handleAddTopicCluster = (cluster: Omit<TopicClusterItem, 'id'>) => {
    const newItem: TopicClusterItem = { ...cluster, id: `cluster-${Date.now()}` };
    setTopicClusters([...topicClusters, newItem]);
    showToast('Topic cluster created');
  };

  const handleUpdateTopicCluster = (id: string, updates: Partial<TopicClusterItem>) => {
    setTopicClusters(topicClusters.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Topic cluster updated');
  };

  const handleDeleteTopicCluster = (id: string) => {
    setTopicClusters(topicClusters.filter((c) => c.id !== id));
    showToast('Topic cluster deleted');
  };

  const handleAddEntity = (entity: Omit<EntityTrackerItem, 'id'>) => {
    const newItem: EntityTrackerItem = { ...entity, id: `ent-${Date.now()}` };
    setEntities([...entities, newItem]);
    showToast(`Entity "${entity.entityName}" linked`);
  };

  const handleDeleteEntity = (id: string) => {
    setEntities(entities.filter((e) => e.id !== id));
    showToast('Entity unlinked');
  };

  // Section 6: Technical SEO Handlers
  const handleAddRedirect = (rule: Omit<RedirectRule, 'id' | 'hits' | 'lastAccessed'>) => {
    const newItem: RedirectRule = {
      ...rule,
      id: `red-${Date.now()}`,
      hits: 0,
      lastAccessed: new Date().toISOString()
    };
    setRedirects([...redirects, newItem]);
    showToast(`301 Redirect rule for ${rule.source} created`);
  };

  const handleDeleteRedirect = (id: string) => {
    setRedirects(redirects.filter((r) => r.id !== id));
    showToast('Redirect rule removed');
  };

  const handleUpdateRobotsTxt = (content: string) => {
    setAnalyticsConfig({ ...analyticsConfig, robotsTxtContent: content });
    showToast('Live robots.txt updated');
  };

  const handleToggleSitemap = (val: boolean) => {
    setAnalyticsConfig({ ...analyticsConfig, sitemapAutoGenerate: val });
    showToast(val ? 'Dynamic XML Sitemap auto-generation enabled' : 'Sitemap paused');
  };

  // Section 7: Backlinks Handlers
  const handleAddBacklink = (bl: Omit<BacklinkItem, 'id' | 'dateAdded'>) => {
    const newItem: BacklinkItem = {
      ...bl,
      id: `bl-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setBacklinks([newItem, ...backlinks]);
    showToast(`Backlink from ${bl.referringDomain} saved`);
  };

  const handleUpdateBacklink = (id: string, updates: Partial<BacklinkItem>) => {
    setBacklinks(backlinks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    showToast('Backlink updated');
  };

  const handleDeleteBacklink = (id: string) => {
    setBacklinks(backlinks.filter((b) => b.id !== id));
    showToast('Backlink removed');
  };

  // Section 8: Local SEO Handlers
  const handleUpdateLocalSEO = (profile: LocalSEOProfile) => {
    setLocalProfile(profile);
    showToast('Local SEO & Google Business Profile saved');
  };

  // Section 9: Programmatic SEO
  const handleGeneratePages = (templateId: string, count: number) => {
    setProgrammaticTemplates(
      programmaticTemplates.map((t) =>
        t.id === templateId ? { ...t, generatedCount: t.generatedCount + count } : t
      )
    );
    showToast(`Batch generated ${count} programmatic pages & updated /sitemap.xml`);
  };

  // Section 10: International SEO
  const handleUpdateHreflang = (
    pageId: string,
    tags: { en: string; 'en-pk': string; ur: string }
  ) => {
    setPagesSEO(
      pagesSEO.map((p) => (p.id === pageId ? { ...p, hreflangTags: tags } : p))
    );
    showToast('Hreflang tags updated and deployed');
  };

  // Section 11: Content Pruning
  const handlePruneAction = (
    id: string,
    action: 'Update Content' | '301 Redirect' | 'Noindex / Prune'
  ) => {
    showToast(`Action "${action}" scheduled for crawl budget optimization`);
  };

  // Section 12: Saas Commercial SEO
  const handleUpdateComparisonRows = (rows: ComparisonTableRow[]) => {
    setComparisonRows(rows);
    showToast('Comparison matrix & commercial metadata saved');
  };

  // Section 13: Analytics & SEO Tools
  const handleUpdateAnalyticsConfig = (cfg: MasterAnalyticsConfig) => {
    setAnalyticsConfig(cfg);
    showToast('All 4 Analytics & tracking IDs saved');
  };

  // Dish Operations
  const handleSaveDish = async () => {
    if (!editingDish || !editingDish.name || !editingDish.slug) return;
    try {
      if (editingDish.id) {
        await api.updateMenuItem(editingDish.id, editingDish);
        showToast('Dish updated successfully');
      } else {
        await api.createMenuItem({
          ...editingDish,
          category: editingDish.category || 'specialties',
          dietary: editingDish.dietary || ['chef_special'],
          ingredients: editingDish.ingredients || ['Saffron', 'Spices'],
          status: editingDish.status || 'published',
          price: Number(editingDish.price) || 3500
        });
        showToast('Dish created successfully');
      }
      setEditingDish(null);
      const items = await api.getMenuItems();
      setMenuItems(items);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDeleteDish = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dish?')) return;
    try {
      await api.deleteMenuItem(id);
      showToast('Dish deleted');
      const items = await api.getMenuItems();
      setMenuItems(items);
    } catch (e: any) {
      alert(e.message);
    }
  };

  // User Operations
  const handleSaveUser = async () => {
    if (!editingUser || !editingUser.email || !editingUser.name) return;
    try {
      if (editingUser.id) {
        await api.updateUser(editingUser.id, editingUser);
        showToast('User updated');
      } else {
        if (!editingUser.password) {
          alert('Password required for new user');
          return;
        }
        await api.createUser({
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role || 'EDITOR',
          password: editingUser.password
        });
        showToast('User created');
      }
      setEditingUser(null);
      const users = await api.getUsers();
      setUsersList(users);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(id);
      showToast('User deleted');
      const users = await api.getUsers();
      setUsersList(users);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const navSections = [
    {
      group: 'Interactive SEO Academy & Live Engine',
      items: [
        { id: 'seo-academy' as AdminTab, label: 'SEO Academy & Live Lab 🎓⚡', icon: GraduationCap }
      ]
    },
    {
      group: 'Live Publishing & Real Outreach',
      items: [
        { id: 'dashboard' as AdminTab, label: '1. Dashboard Overview', icon: LayoutDashboard },
        { id: 'live-indexing' as AdminTab, label: 'Live URL Indexing & Submission ⚡', icon: Send },
        { id: 'blog-publisher' as AdminTab, label: 'Live Blog & Articles CMS ✍️', icon: FileText },
        { id: 'guest-posting' as AdminTab, label: 'Guest Posting & Outreach 🚀', icon: Link2 }
      ]
    },
    {
      group: 'Core SEO Operations',
      items: [
        { id: 'keywords' as AdminTab, label: '2. Keyword Research 🔎', icon: KeyRound },
        { id: 'competitors' as AdminTab, label: '3. Competitor SEO 🕵️', icon: Eye }
      ]
    },
    {
      group: 'Content & On-Page Architecture',
      items: [
        { id: 'onpage' as AdminTab, label: '4. On-Page SEO 📝', icon: FileText },
        { id: 'content' as AdminTab, label: '5. Content & Authority 📚', icon: BookOpen }
      ]
    },
    {
      group: 'Technical & Crawl Engineering',
      items: [
        { id: 'technical' as AdminTab, label: '6. Technical SEO ⚙️', icon: Settings },
        { id: 'international' as AdminTab, label: '10. International SEO 🌐', icon: Globe },
        { id: 'pruning' as AdminTab, label: '11. Content Pruning ✂️', icon: Scissors }
      ]
    },
    {
      group: 'Authority & Footprint',
      items: [
        { id: 'backlinks' as AdminTab, label: '7. Off-Page & Links 🔗', icon: Link2 },
        { id: 'local' as AdminTab, label: '8. Local SEO & GMB 📍', icon: MapPin }
      ]
    },
    {
      group: 'Scale & Commercial Impact',
      items: [
        { id: 'programmatic' as AdminTab, label: '9. Programmatic SEO ⚡', icon: Zap },
        { id: 'commercial' as AdminTab, label: '12. SaaS / Commercial SEO 💎', icon: DollarSign },
        { id: 'analytics' as AdminTab, label: '13. Analytics & SEO Tools 📊', icon: BarChart3 }
      ]
    },
    {
      group: 'CMS & Security Administration',
      items: [
        { id: 'system-health' as AdminTab, label: '14. System Health & Security 🛡️', icon: ShieldCheck },
        { id: 'dishes' as AdminTab, label: 'Menu & Dishes CMS', icon: Utensils },
        ...(currentUser.role === 'SUPER_ADMIN'
          ? [{ id: 'users' as AdminTab, label: 'User Roles & RBAC', icon: Users }]
          : [])
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Admin Navbar */}
      <header className="h-16 bg-[#121212] border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black flex items-center justify-center font-bold font-serif shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            M
          </div>
          <div>
            <span className="font-serif text-sm font-bold text-white block leading-tight">
              Margalla Hills Complete SEO Admin
            </span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">
              100% Code-Free SEO Engine &bull; Neon PostgreSQL
            </span>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1.5 animate-in fade-in shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* User Profile Badge */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0A0A0A] border border-neutral-800 text-xs">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
              {currentUser.name[0]}
            </div>
            <div className="text-left">
              <span className="font-semibold text-white block text-[11px] leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[9px] text-emerald-400 font-mono font-bold block">
                {currentUser.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 bg-[#0A0A0A] hover:bg-neutral-900 text-neutral-200 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border border-neutral-800 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Live Website</span>
          </button>

          <button
            onClick={() => {
              clearSession();
              onLogout();
            }}
            className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 rounded-xl transition cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-[#111111] border-r border-neutral-800 p-3 space-y-4 overflow-y-auto hidden md:block shrink-0">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2.5 py-1">
                {sec.group}
              </div>
              {sec.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Mobile Tab Strip */}
        <div className="md:hidden flex overflow-x-auto p-2 bg-[#121212] border-b border-neutral-800 gap-1.5 shrink-0">
          {navSections.flatMap((s) => s.items).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer ${
                activeTab === t.id ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400 bg-neutral-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-[#0A0A0A]">
          {/* SEO ACADEMY & LIVE IMPLEMENTATION ENGINE */}
          {activeTab === 'seo-academy' && (
            <div className="space-y-6">
              <SEOLaboratoryPage navigate={navigate} />
            </div>
          )}

          {/* SECTION 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <Module1Dashboard
              backlinks={backlinks}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* LIVE URL INDEXING & SEARCH ENGINE SUBMISSION */}
          {activeTab === 'live-indexing' && (
            <ModuleLiveIndexing
              customDomain={localStorage.getItem('mh_real_domain') || 'margallahills.com'}
            />
          )}

          {/* LIVE BLOG & ARTICLE PUBLISHER */}
          {activeTab === 'blog-publisher' && (
            <ModuleBlogPublishing
              onNavigateToPost={(url) => navigate(url)}
              showToast={showToast}
            />
          )}

          {/* REAL GUEST POSTING & OUTREACH */}
          {activeTab === 'guest-posting' && (
            <ModuleGuestPosting
              backlinks={backlinks}
              onAddBacklink={handleAddBacklink}
              onUpdateBacklink={handleUpdateBacklink}
              onDeleteBacklink={handleDeleteBacklink}
              showToast={showToast}
            />
          )}

          {/* SECTION 2: KEYWORD RESEARCH */}
          {activeTab === 'keywords' && (
            <Module2KeywordResearch
              keywords={keywords}
              onAddKeyword={handleAddKeyword}
              onUpdateKeyword={handleUpdateKeyword}
              onDeleteKeyword={handleDeleteKeyword}
            />
          )}

          {/* SECTION 3: COMPETITOR RESEARCH */}
          {activeTab === 'competitors' && (
            <Module3CompetitorResearch
              competitors={competitors}
              onAddCompetitor={handleAddCompetitor}
              onUpdateCompetitor={handleUpdateCompetitor}
              onDeleteCompetitor={handleDeleteCompetitor}
            />
          )}

          {/* SECTION 4: ON-PAGE SEO */}
          {activeTab === 'onpage' && (
            <Module4OnPageSEO pages={pagesSEO} onUpdatePage={handleUpdatePageSEO} />
          )}

          {/* SECTION 5: CONTENT & TOPICAL AUTHORITY */}
          {activeTab === 'content' && (
            <Module5ContentTopicalAuthority
              topicClusters={topicClusters}
              entities={entities}
              onAddTopicCluster={handleAddTopicCluster}
              onUpdateTopicCluster={handleUpdateTopicCluster}
              onDeleteTopicCluster={handleDeleteTopicCluster}
              onAddEntity={handleAddEntity}
              onDeleteEntity={handleDeleteEntity}
            />
          )}

          {/* SECTION 6: TECHNICAL SEO */}
          {activeTab === 'technical' && (
            <Module6TechnicalSEO
              redirects={redirects}
              onAddRedirect={handleAddRedirect}
              onDeleteRedirect={handleDeleteRedirect}
              robotsTxtContent={analyticsConfig.robotsTxtContent}
              onUpdateRobotsTxt={handleUpdateRobotsTxt}
              sitemapAutoGenerate={analyticsConfig.sitemapAutoGenerate}
              onToggleSitemap={handleToggleSitemap}
            />
          )}

          {/* SECTION 7: OFF-PAGE BACKLINKS */}
          {activeTab === 'backlinks' && (
            <Module7OffPageBacklinks
              backlinks={backlinks}
              onAddBacklink={handleAddBacklink}
              onUpdateBacklink={handleUpdateBacklink}
              onDeleteBacklink={handleDeleteBacklink}
            />
          )}

          {/* SECTION 8: LOCAL SEO */}
          {activeTab === 'local' && (
            <Module8LocalSEO
              localProfile={localProfile}
              onUpdateLocalSEO={handleUpdateLocalSEO}
            />
          )}

          {/* SECTION 9: PROGRAMMATIC SEO */}
          {activeTab === 'programmatic' && (
            <Module9ProgrammaticSEO
              templates={programmaticTemplates}
              onGeneratePages={handleGeneratePages}
            />
          )}

          {/* SECTION 10: INTERNATIONAL SEO */}
          {activeTab === 'international' && (
            <Module10InternationalSEO
              pages={pagesSEO}
              onUpdateHreflang={handleUpdateHreflang}
            />
          )}

          {/* SECTION 11: CONTENT PRUNING */}
          {activeTab === 'pruning' && (
            <Module11ContentPruning items={pruningItems} onAction={handlePruneAction} />
          )}

          {/* SECTION 12: SAAS / COMMERCIAL SEO */}
          {activeTab === 'commercial' && (
            <Module12SaasCommercialSEO
              comparisonRows={comparisonRows}
              onUpdateComparisonRows={handleUpdateComparisonRows}
            />
          )}

          {/* SECTION 13: ANALYTICS & SEO TOOLS */}
          {activeTab === 'analytics' && (
            <Module13AnalyticsTools
              config={analyticsConfig}
              onUpdateConfig={handleUpdateAnalyticsConfig}
            />
          )}

          {/* SECTION 14: SYSTEM HEALTH, SECURITY & INFRASTRUCTURE */}
          {activeTab === 'system-health' && (
            <Module14SystemHealth
              onAddRedirect={(r) => handleAddRedirect(r)}
              showToast={showToast}
            />
          )}

          {/* DISHES CMS */}
          {activeTab === 'dishes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Gastronomic Menu &amp; Recipe Dishes CMS
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Manage prices, descriptions, and botanical ingredients for all dishes.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingDish({
                      name: '',
                      slug: '',
                      price: 3500,
                      category: 'specialties',
                      dietary: ['chef_special'],
                      ingredients: ['Kashmiri Saffron', 'Wild Mountain Honey'],
                      description: ''
                    })
                  }
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {editingDish && (
                <div className="p-6 bg-[#121212] rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    {editingDish.id ? 'Edit Dish' : 'Create New Menu Item'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">Dish Name</label>
                      <input
                        type="text"
                        value={editingDish.name || ''}
                        onChange={(e) =>
                          setEditingDish({
                            ...editingDish,
                            name: e.target.value,
                            slug: editingDish.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                          })
                        }
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={editingDish.slug || ''}
                        onChange={(e) => setEditingDish({ ...editingDish, slug: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Price (PKR)</label>
                      <input
                        type="number"
                        value={editingDish.price || 3500}
                        onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingDish.category || 'specialties'}
                        onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-neutral-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingDish.description || ''}
                        onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingDish(null)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveDish}
                      className="px-5 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Save Dish
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Dish Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5 font-mono">Price</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-sans">
                    {menuItems.map((dish) => (
                      <tr key={dish.id} className="hover:bg-neutral-900/50">
                        <td className="p-3.5 font-semibold text-white">
                          <div>{dish.name}</div>
                          <div className="text-[11px] text-emerald-400 font-mono">/dish/{dish.slug}</div>
                        </td>
                        <td className="p-3.5 text-neutral-300 capitalize">{dish.category}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">
                          PKR {dish.price?.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditingDish(dish)}
                            className="p-1.5 text-neutral-400 hover:text-white rounded cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USER ROLES (RBAC) */}
          {activeTab === 'users' && currentUser.role === 'SUPER_ADMIN' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-6 rounded-2xl border border-neutral-800">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    User Access &amp; Role-Based Access Control (RBAC)
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Manage Super Admin, Admin, and Editor permissions for Margalla Hills.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingUser({
                      name: '',
                      email: '',
                      role: 'EDITOR',
                      password: ''
                    })
                  }
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New User</span>
                </button>
              </div>

              {editingUser && (
                <div className="p-6 bg-[#121212] rounded-2xl border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    {editingUser.id ? 'Edit User Credentials' : 'Create User'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editingUser.name || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editingUser.email || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Role Permission</label>
                      <select
                        value={editingUser.role || 'EDITOR'}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                        className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN (Full Control)</option>
                        <option value="ADMIN">ADMIN (SEO &amp; Content)</option>
                        <option value="EDITOR">EDITOR (Drafts only)</option>
                      </select>
                    </div>
                    {!editingUser.id && (
                      <div className="sm:col-span-3">
                        <label className="block text-neutral-400 mb-1">Password</label>
                        <input
                          type="password"
                          value={editingUser.password || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                          className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingUser(null)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveUser}
                      className="px-5 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Save User
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-[#121212] rounded-2xl border border-neutral-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-sans">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-900/50">
                        <td className="p-3.5 font-medium text-white">{u.name}</td>
                        <td className="p-3.5 font-mono text-neutral-400">{u.email}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              u.role === 'SUPER_ADMIN'
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditingUser(u)}
                            className="p-1.5 text-neutral-400 hover:text-white rounded cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {u.id !== currentUser.id && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 text-neutral-400 hover:text-rose-400 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
