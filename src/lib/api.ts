import {
  User,
  MenuItem,
  MenuCategory,
  BlogPost,
  BlogCategory,
  CaseStudy,
  KeywordCluster,
  CompetitorResearch,
  BacklinkItem,
  SEOSettings,
  AnalyticsSummary,
  RedirectRule,
  SecurityIncident,
  Crawl404Log,
  SystemHealthReport,
  BackupSnapshot,
  BrokenLinkReport
} from '../types';

const TOKEN_KEY = 'seolab_auth_token';
const USER_KEY = 'seolab_user_cache';

export function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredUser(): User | null {
  try {
    const cached = sessionStorage.getItem(USER_KEY);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

export function setSession(token: string, user: User) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    // Clean any old localStorage entries to prevent unauthenticated direct access
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

export function clearSession() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: async (credentials: { email: string; password: string; twoFactorCode?: string }) => {
    const data = await request<{ token?: string; user?: User; expiresAt?: number; require2FA?: boolean; message?: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (data.token && data.user) {
      setSession(data.token, data.user);
    }
    return data;
  },

  register: async (credentials: { name: string; email: string; password: string }) => {
    const data = await request<{ token: string; user: User; expiresAt: number }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    setSession(data.token, data.user);
    return data;
  },

  googleLogin: async (data: { email: string; name?: string; username?: string }) => {
    const res = await request<{ token: string; user: User; expiresAt: number }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setSession(res.token, res.user);
    return res;
  },

  quickAdminLogin: async () => {
    const res = await request<{ token: string; user: User; expiresAt: number }>('/api/auth/quick-admin', {
      method: 'POST'
    });
    setSession(res.token, res.user);
    return res;
  },

  logout: async () => {
    try {
      await request('/api/auth/logout', { method: 'POST' });
    } finally {
      clearSession();
    }
  },

  getCurrentUser: async () => {
    return request<{ user: User }>('/api/auth/me');
  },

  // Users (Super Admin)
  getUsers: async () => request<User[]>('/api/users'),
  createUser: async (user: any) => request<User>('/api/users', { method: 'POST', body: JSON.stringify(user) }),
  updateUser: async (id: string, updates: any) => request<User>(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteUser: async (id: string) => request<{ success: boolean }>(`/api/users/${id}`, { method: 'DELETE' }),

  // Menu
  getMenuItems: async () => request<MenuItem[]>('/api/menu'),
  getMenuItemBySlug: async (slug: string) => request<MenuItem>(`/api/menu/${slug}`),
  createMenuItem: async (item: Partial<MenuItem>) => request<MenuItem>('/api/menu', { method: 'POST', body: JSON.stringify(item) }),
  updateMenuItem: async (id: string, updates: Partial<MenuItem>) => request<MenuItem>(`/api/menu/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteMenuItem: async (id: string) => request<{ success: boolean }>(`/api/menu/${id}`, { method: 'DELETE' }),

  // Menu Categories
  getMenuCategories: async () => request<MenuCategory[]>('/api/menu/categories'),
  createMenuCategory: async (cat: Partial<MenuCategory>) => request<MenuCategory>('/api/menu/categories', { method: 'POST', body: JSON.stringify(cat) }),
  updateMenuCategory: async (id: string, updates: Partial<MenuCategory>) => request<MenuCategory>(`/api/menu/categories/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteMenuCategory: async (id: string) => request<{ success: boolean }>(`/api/menu/categories/${id}`, { method: 'DELETE' }),

  // Blog
  getBlogPosts: async () => request<BlogPost[]>('/api/blog'),
  getBlogPostBySlug: async (slug: string) => request<BlogPost>(`/api/blog/${slug}`),
  createBlogPost: async (post: Partial<BlogPost>) => request<BlogPost>('/api/blog', { method: 'POST', body: JSON.stringify(post) }),
  updateBlogPost: async (id: string, updates: Partial<BlogPost>) => request<BlogPost>(`/api/blog/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteBlogPost: async (id: string) => request<{ success: boolean }>(`/api/blog/${id}`, { method: 'DELETE' }),
  getBlogCategories: async () => request<BlogCategory[]>('/api/blog/categories'),

  // Case Studies
  getCaseStudies: async () => request<CaseStudy[]>('/api/case-studies'),
  getCaseStudyBySlug: async (slug: string) => request<CaseStudy>(`/api/case-studies/${slug}`),
  createCaseStudy: async (cs: Partial<CaseStudy>) => request<CaseStudy>('/api/case-studies', { method: 'POST', body: JSON.stringify(cs) }),
  updateCaseStudy: async (id: string, updates: Partial<CaseStudy>) => request<CaseStudy>(`/api/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteCaseStudy: async (id: string) => request<{ success: boolean }>(`/api/case-studies/${id}`, { method: 'DELETE' }),

  // SEO & Research
  getSEOSettings: async () => request<SEOSettings>('/api/seo/settings'),
  updateSEOSettings: async (settings: Partial<SEOSettings>) => request<SEOSettings>('/api/seo/settings', { method: 'PUT', body: JSON.stringify(settings) }),

  getKeywordClusters: async () => request<KeywordCluster[]>('/api/seo/keyword-clusters'),
  createKeywordCluster: async (kc: Partial<KeywordCluster>) => request<KeywordCluster>('/api/seo/keyword-clusters', { method: 'POST', body: JSON.stringify(kc) }),
  updateKeywordCluster: async (id: string, updates: Partial<KeywordCluster>) => request<KeywordCluster>(`/api/seo/keyword-clusters/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteKeywordCluster: async (id: string) => request<{ success: boolean }>(`/api/seo/keyword-clusters/${id}`, { method: 'DELETE' }),

  getCompetitors: async () => request<CompetitorResearch[]>('/api/seo/competitors'),
  createCompetitor: async (comp: Partial<CompetitorResearch>) => request<CompetitorResearch>('/api/seo/competitors', { method: 'POST', body: JSON.stringify(comp) }),
  updateCompetitor: async (id: string, updates: Partial<CompetitorResearch>) => request<CompetitorResearch>(`/api/seo/competitors/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteCompetitor: async (id: string) => request<{ success: boolean }>(`/api/seo/competitors/${id}`, { method: 'DELETE' }),

  getBacklinks: async () => request<BacklinkItem[]>('/api/seo/backlinks'),
  createBacklink: async (bl: Partial<BacklinkItem>) => request<BacklinkItem>('/api/seo/backlinks', { method: 'POST', body: JSON.stringify(bl) }),
  updateBacklink: async (id: string, updates: Partial<BacklinkItem>) => request<BacklinkItem>(`/api/seo/backlinks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteBacklink: async (id: string) => request<{ success: boolean }>(`/api/seo/backlinks/${id}`, { method: 'DELETE' }),

  getRedirects: async () => request<RedirectRule[]>('/api/redirects'),
  createRedirect: async (rule: Partial<RedirectRule>) => request<RedirectRule>('/api/redirects', { method: 'POST', body: JSON.stringify(rule) }),
  updateRedirect: async (id: string, updates: Partial<RedirectRule>) => request<RedirectRule>(`/api/redirects/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteRedirect: async (id: string) => request<{ success: boolean }>(`/api/redirects/${id}`, { method: 'DELETE' }),

  getAnalytics: async () => request<AnalyticsSummary>('/api/seo/analytics'),

  // AI SEO Assistant
  getAISuggestions: async (type: string, input: Record<string, any>) =>
    request<any>('/api/seo/ai-suggest', {
      method: 'POST',
      body: JSON.stringify({ type, input })
    }),

  // Two-Factor Authentication (2FA)
  setup2FA: async () => request<{ secret: string; otpauthUrl: string; backupCodes: string[] }>('/api/auth/2fa/setup', { method: 'POST' }),
  verify2FA: async (code: string) => request<{ success: boolean; message: string }>('/api/auth/2fa/verify', { method: 'POST', body: JSON.stringify({ code }) }),
  disable2FA: async () => request<{ success: boolean; message: string }>('/api/auth/2fa/disable', { method: 'POST' }),

  // 404 Crawl Error Logs & Monitoring
  get404Logs: async () => request<Crawl404Log[]>('/api/admin/404-logs'),
  log404Error: async (url: string, referrer?: string) => request<{ success: boolean }>('/api/admin/404-logs', { method: 'POST', body: JSON.stringify({ url, referrer }) }),
  clear404Logs: async () => request<{ success: boolean }>('/api/admin/404-logs', { method: 'DELETE' }),

  // WAF & Cloud Armor Security Incidents
  getSecurityIncidents: async () => request<SecurityIncident[]>('/api/admin/security-incidents'),
  clearSecurityIncidents: async () => request<{ success: boolean }>('/api/admin/security-incidents', { method: 'DELETE' }),

  // System Health, Domain & SSL Audit
  getSystemHealth: async () => request<SystemHealthReport>('/api/admin/system/health'),
  runDNSCheck: async () => request<any>('/api/admin/system/dns-check'),

  // Neon PostgreSQL Backups & Point-in-Time Recovery
  getBackups: async () => request<BackupSnapshot[]>('/api/admin/system/backups'),
  createBackupSnapshot: async () => request<BackupSnapshot>('/api/admin/system/backup', { method: 'POST' }),

  // Broken Link Checker
  checkBrokenLinks: async () => request<BrokenLinkReport[]>('/api/admin/system/broken-links', { method: 'POST' }),

  // Cloud Run Scalability Config
  getCloudRunConfig: async () => request<any>('/api/admin/system/cloudrun')
};
