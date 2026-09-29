import React, { useState, useEffect, Suspense, lazy } from 'react';
import { api, getStoredUser, clearSession } from './lib/api';
import { User } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSEORuntime } from './lib/seoRuntime';

// Critical Homepage for lightning fast mobile First Contentful Paint
import { HomePage } from './pages/HomePage';

// Lazy-load sub-pages so mobile devices download ONLY initial landing bundle
const MenuPage = lazy(() => import('./pages/MenuPage').then(m => ({ default: m.MenuPage })));
const DishDetailPage = lazy(() => import('./pages/DishDetailPage').then(m => ({ default: m.DishDetailPage })));
const TastingMenuPage = lazy(() => import('./pages/TastingMenuPage').then(m => ({ default: m.TastingMenuPage })));
const WineCellarPage = lazy(() => import('./pages/WineCellarPage').then(m => ({ default: m.WineCellarPage })));
const WineDetailPage = lazy(() => import('./pages/WineDetailPage').then(m => ({ default: m.WineDetailPage })));
const PrivateDiningPage = lazy(() => import('./pages/PrivateDiningPage').then(m => ({ default: m.PrivateDiningPage })));
const LocationsPage = lazy(() => import('./pages/LocationsPage').then(m => ({ default: m.LocationsPage })));
const BotanicalsIndexPage = lazy(() => import('./pages/BotanicalsIndexPage').then(m => ({ default: m.BotanicalsIndexPage })));
const BotanicalDetailPage = lazy(() => import('./pages/BotanicalDetailPage').then(m => ({ default: m.BotanicalDetailPage })));
const HeritageIndexPage = lazy(() => import('./pages/HeritageIndexPage').then(m => ({ default: m.HeritageIndexPage })));
const HeritageDetailPage = lazy(() => import('./pages/HeritageDetailPage').then(m => ({ default: m.HeritageDetailPage })));
const BlogListPage = lazy(() => import('./pages/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPostDetailPage = lazy(() => import('./pages/BlogPostDetailPage').then(m => ({ default: m.BlogPostDetailPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const SitemapHubPage = lazy(() => import('./pages/SitemapHubPage').then(m => ({ default: m.SitemapHubPage })));
const ProgrammaticCateringPage = lazy(() => import('./pages/ProgrammaticCateringPage').then(m => ({ default: m.ProgrammaticCateringPage })));
const Compendium400Page = lazy(() => import('./pages/Compendium400Page').then(m => ({ default: m.Compendium400Page })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center py-20">
    <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser());

  useSEORuntime(currentPath);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    api.getCurrentUser()
      .then(res => {
        if (res && res.user) setCurrentUser(res.user);
        else setCurrentUser(null);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    navigate('/admin');
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    navigate('/');
  };

  const renderContent = () => {
    const path = currentPath;

    if (path === '/' || path === '') {
      return <HomePage navigate={navigate} />;
    }

    return (
      <Suspense fallback={<PageLoader />}>
        {(() => {
          if (path === '/menu') return <MenuPage navigate={navigate} />;
          if (path === '/tasting-menu') return <TastingMenuPage navigate={navigate} />;
          if (path === '/deals') return <MenuPage navigate={navigate} initialCategory="deals" />;
          if (path === '/wine-cellar') return <WineCellarPage navigate={navigate} />;
          if (path.startsWith('/wine/')) {
            const slug = path.replace('/wine/', '');
            return <WineDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/botanicals') return <BotanicalsIndexPage navigate={navigate} />;
          if (path.startsWith('/botanicals/')) {
            const slug = path.replace('/botanicals/', '');
            return <BotanicalDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/heritage') return <HeritageIndexPage navigate={navigate} />;
          if (path.startsWith('/heritage/')) {
            const slug = path.replace('/heritage/', '');
            return <HeritageDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/compendium' || path === '/400-pages' || path === '/400-chapters') {
            return <Compendium400Page navigate={navigate} />;
          }
          if (path === '/sitemap') return <SitemapHubPage navigate={navigate} />;
          if (path === '/services' || path === '/catering') return <ServicesPage navigate={navigate} />;
          if (path === '/private-dining') return <PrivateDiningPage navigate={navigate} />;
          if (path === '/locations') return <LocationsPage navigate={navigate} />;
          if (path.startsWith('/locations/')) {
            const citySlug = path.replace('/locations/', '');
            return <ProgrammaticCateringPage citySlug={citySlug} navigate={navigate} />;
          }
          if (path.startsWith('/menu/')) {
            const parts = path.replace('/menu/', '').split('/');
            const slug = parts[parts.length - 1];
            if (slug) return <DishDetailPage slug={slug} navigate={navigate} />;
            return <MenuPage navigate={navigate} />;
          }
          if (path.startsWith('/dish/')) {
            const slug = path.replace('/dish/', '');
            return <DishDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/blog') return <BlogListPage navigate={navigate} />;
          if (path.startsWith('/blog/')) {
            const slug = path.replace('/blog/', '');
            return <BlogPostDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/case-studies') return <CaseStudiesPage navigate={navigate} />;
          if (path.startsWith('/case-studies/')) {
            const slug = path.replace('/case-studies/', '');
            return <CaseStudyDetailPage slug={slug} navigate={navigate} />;
          }
          if (path === '/gallery') return <GalleryPage navigate={navigate} />;
          if (path === '/about') return <AboutPage navigate={navigate} />;
          if (path === '/contact') return <ContactPage navigate={navigate} />;
          if (path.startsWith('/catering/')) {
            const citySlug = path.replace('/catering/', '');
            return <ProgrammaticCateringPage citySlug={citySlug} navigate={navigate} />;
          }
          if (path === '/seo-lab' || path === '/seo-academy' || path === '/signup' || path === '/register' || path === '/login' || path.startsWith('/admin')) {
            if (!currentUser) return <AdminLoginPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
            return <AdminDashboardPage currentUser={currentUser} onLogout={handleLogout} navigate={navigate} />;
          }
          return <NotFoundPage navigate={navigate} />;
        })()}
      </Suspense>
    );
  };

  const isAdminView = currentPath.startsWith('/admin') && currentUser;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col font-sans text-slate-200 bg-[#0A0A0A] selection:bg-amber-500 selection:text-black">
        {!isAdminView && <DemoNoticeBanner />}
        {!isAdminView && <Navbar currentPath={currentPath} navigate={navigate} />}
        <main className="flex-1 bg-[#0A0A0A]">
          {renderContent()}
        </main>
        {!isAdminView && <Footer navigate={navigate} />}
      </div>
    </ErrorBoundary>
  );
}
