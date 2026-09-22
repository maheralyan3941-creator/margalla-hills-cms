import React, { useState, useEffect } from 'react';
import { api, getStoredUser, clearSession } from './lib/api';
import { User } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSEORuntime } from './lib/seoRuntime';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { DishDetailPage } from './pages/DishDetailPage';
import { TastingMenuPage } from './pages/TastingMenuPage';
import { WineCellarPage } from './pages/WineCellarPage';
import { WineDetailPage } from './pages/WineDetailPage';
import { PrivateDiningPage } from './pages/PrivateDiningPage';
import { LocationsPage } from './pages/LocationsPage';
import { BotanicalsIndexPage } from './pages/BotanicalsIndexPage';
import { BotanicalDetailPage } from './pages/BotanicalDetailPage';
import { HeritageIndexPage } from './pages/HeritageIndexPage';
import { HeritageDetailPage } from './pages/HeritageDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { SitemapHubPage } from './pages/SitemapHubPage';
import { ProgrammaticCateringPage } from './pages/ProgrammaticCateringPage';
import { Compendium400Page } from './pages/Compendium400Page';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser());

  // Dynamic SEO head tags and tracking runtime
  useSEORuntime(currentPath);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Verify stored session with backend on load
  useEffect(() => {
    api.getCurrentUser()
      .then(res => {
        if (res && res.user) setCurrentUser(res.user);
      })
      .catch(() => {
        // session expired or invalid
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

  // Route Dispatcher
  const renderContent = () => {
    const path = currentPath;

    // Homepage
    if (path === '/' || path === '') {
      return <HomePage navigate={navigate} />;
    }

    // Menu list
    if (path === '/menu') {
      return <MenuPage navigate={navigate} />;
    }

    // Tasting Menu
    if (path === '/tasting-menu') {
      return <TastingMenuPage navigate={navigate} />;
    }

    // Hillside Deals & Combos
    if (path === '/deals') {
      return <MenuPage navigate={navigate} initialCategory="deals" />;
    }

    // Wine Cellar
    if (path === '/wine-cellar') {
      return <WineCellarPage navigate={navigate} />;
    }

    // Wine Allocation Detail: /wine/:slug
    if (path.startsWith('/wine/')) {
      const slug = path.replace('/wine/', '');
      return <WineDetailPage slug={slug} navigate={navigate} />;
    }

    // Botanicals & Spices Index
    if (path === '/botanicals') {
      return <BotanicalsIndexPage navigate={navigate} />;
    }

    // Botanical Detail: /botanicals/:slug
    if (path.startsWith('/botanicals/')) {
      const slug = path.replace('/botanicals/', '');
      return <BotanicalDetailPage slug={slug} navigate={navigate} />;
    }

    // Heritage Articles Index
    if (path === '/heritage') {
      return <HeritageIndexPage navigate={navigate} />;
    }

    // Heritage Article Detail: /heritage/:slug
    if (path.startsWith('/heritage/')) {
      const slug = path.replace('/heritage/', '');
      return <HeritageDetailPage slug={slug} navigate={navigate} />;
    }

    // 400 Chapters Gastronomy Compendium (Endless Scroll)
    if (path === '/compendium' || path === '/400-pages' || path === '/400-chapters') {
      return <Compendium400Page navigate={navigate} />;
    }

    // HTML Sitemap Directory
    if (path === '/sitemap') {
      return <SitemapHubPage navigate={navigate} />;
    }

    // Services Page
    if (path === '/services' || path === '/catering') {
      return <ServicesPage navigate={navigate} />;
    }

    // Private Dining
    if (path === '/private-dining') {
      return <PrivateDiningPage navigate={navigate} />;
    }

    // Locations
    if (path === '/locations') {
      return <LocationsPage navigate={navigate} />;
    }

    if (path.startsWith('/locations/')) {
      const citySlug = path.replace('/locations/', '');
      return <ProgrammaticCateringPage citySlug={citySlug} navigate={navigate} />;
    }

    // Dish Detail: /menu/:category/:slug or /dish/:slug
    if (path.startsWith('/menu/')) {
      const parts = path.replace('/menu/', '').split('/');
      const slug = parts[parts.length - 1];
      if (slug) {
        return <DishDetailPage slug={slug} navigate={navigate} />;
      }
      return <MenuPage navigate={navigate} />;
    }

    if (path.startsWith('/dish/')) {
      const slug = path.replace('/dish/', '');
      return <DishDetailPage slug={slug} navigate={navigate} />;
    }

    // Blog list
    if (path === '/blog') {
      return <BlogListPage navigate={navigate} />;
    }

    // Blog Post Detail: /blog/:slug
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostDetailPage slug={slug} navigate={navigate} />;
    }

    // Case Studies list
    if (path === '/case-studies') {
      return <CaseStudiesPage navigate={navigate} />;
    }

    // Case Study Detail: /case-studies/:slug
    if (path.startsWith('/case-studies/')) {
      const slug = path.replace('/case-studies/', '');
      return <CaseStudyDetailPage slug={slug} navigate={navigate} />;
    }

    // Gallery
    if (path === '/gallery') {
      return <GalleryPage navigate={navigate} />;
    }

    // About
    if (path === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    // Contact & Reservations
    if (path === '/contact') {
      return <ContactPage navigate={navigate} />;
    }

    // Programmatic Local Catering: /catering/:city
    if (path.startsWith('/catering/')) {
      const citySlug = path.replace('/catering/', '');
      return <ProgrammaticCateringPage citySlug={citySlug} navigate={navigate} />;
    }

    // SEO Practice Laboratory & Academy (Protected inside Admin Panel)
    if (path === '/seo-lab' || path === '/seo-academy') {
      if (!currentUser) {
        return <AdminLoginPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
      }
      return (
        <AdminDashboardPage
          currentUser={currentUser}
          onLogout={handleLogout}
          navigate={navigate}
        />
      );
    }

    // Sign Up & Log In Routes
    if (path === '/signup' || path === '/register' || path === '/login') {
      if (!currentUser) {
        return <AdminLoginPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
      }
      return (
        <AdminDashboardPage
          currentUser={currentUser}
          onLogout={handleLogout}
          navigate={navigate}
        />
      );
    }

    // Admin CMS & SEO Control Panel (Accessible via direct /admin path)
    if (path.startsWith('/admin')) {
      if (!currentUser) {
        return <AdminLoginPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
      }
      return (
        <AdminDashboardPage
          currentUser={currentUser}
          onLogout={handleLogout}
          navigate={navigate}
        />
      );
    }

    // Fallback 404
    return <NotFoundPage navigate={navigate} />;
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
