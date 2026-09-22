import { useEffect } from 'react';
import { MasterAnalyticsConfig } from '../types';
import { INITIAL_ANALYTICS_SETTINGS } from '../data/mockSEOData';

export function getStoredAnalyticsConfig(): MasterAnalyticsConfig {
  try {
    const raw = localStorage.getItem('mh_seo_analytics_config');
    if (raw) {
      return { ...INITIAL_ANALYTICS_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return INITIAL_ANALYTICS_SETTINGS;
}

export function saveStoredAnalyticsConfig(cfg: MasterAnalyticsConfig) {
  try {
    localStorage.setItem('mh_seo_analytics_config', JSON.stringify(cfg));
  } catch {
    // ignore
  }
}

/**
 * Route meta dictionary for automatic title, description, and OpenGraph tags
 */
const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'Margalla Hills | Hilltop Dining, 400+ Dishes & Deals Under $15',
    desc: 'Margalla Hills luxury hilltop restaurant and resort in Islamabad, featuring over 400+ dishes under $15, authentic charcoal BBQ, desi karahi, and exclusive value deals.'
  },
  '/menu': {
    title: '400+ Complete Menu | Charcoal BBQ, Shinwari Karahi & Deals | Margalla Hills',
    desc: 'Explore over 400 authentic Pakistani, Continental, BBQ, and Shinwari Karahi specialties with panoramic Margalla Ridge views.'
  },
  '/deals': {
    title: 'Hillside Family & Couple Deals Under $15 | Margalla Hills Islamabad',
    desc: 'Save on our premier feast platters, barbecue combos, and high-tea packages with complimentary hilltop sunset views.'
  },
  '/tasting-menu': {
    title: 'Executive Chef Tasting Menu | Margalla Hills Luxury Experience',
    desc: 'An authentic multi-course gastronomic journey across Wazwan rituals, Dum Pukht, and saffron-infused delicacies.'
  },
  '/private-dining': {
    title: 'Private Dining & Executive Terraces | Margalla Hills Islamabad',
    desc: 'Reserve secluded VIP terraces, diplomatic banquets, and candlelight dinner tables overlooking Islamabad city lights.'
  },
  '/locations': {
    title: 'Locations, Hiking Trails & Panoramic Views | Margalla Hills Resort',
    desc: 'Detailed directions, Trail 3 & Trail 5 approach, GPS coordinates, and parking details for Margalla Hills Restaurant.'
  },
  '/heritage': {
    title: 'Culinary Heritage & Food Science Archives | Margalla Hills',
    desc: 'Historical essays documenting Wazwan rituals, Dum Pukht thermodynamics, and ethics of Himalayan saffron sourcing.'
  },
  '/blog': {
    title: 'Gastronomy Journal & Hillside Stories | Margalla Hills Restaurant',
    desc: 'Articles on saffron harvesting, wood-fire barbecue sciences, and culinary guides to Islamabad dining.'
  },
  '/case-studies': {
    title: 'Empirical SEO Case Studies & Technical Audits | Margalla Hills',
    desc: 'Technical benchmarks in local pack rankings, rich schema clicks, and organic search growth for gastronomy.'
  },
  '/about': {
    title: 'About Us & Mountain Culinary Heritage | Margalla Hills Islamabad',
    desc: 'The story of Margalla Hills: premier luxury hilltop dining, authentic fruitwood charcoal BBQ, Shinwari karahi heritage, and executive chef team.'
  },
  '/services': {
    title: 'Hospitality, Catering & Banquet Services | Margalla Hills Islamabad',
    desc: 'Comprehensive event and catering solutions: scenic hilltop dining, corporate banquets, royal wedding catering, and on-site live BBQ stations.'
  },
  '/contact': {
    title: 'Table Reservations & Event Booking | Margalla Hills Islamabad',
    desc: 'Book your table or event at Margalla Hills. Reserve online or connect directly via WhatsApp for instant VIP reservations.'
  },
  '/sitemap': {
    title: 'Search Engine Index & Complete Site Directory | Margalla Hills',
    desc: 'HTML sitemap directory indexing all 400+ dishes, culinary chapters, locations, and gastronomy archives.'
  },
  '/seo-lab': {
    title: 'SEO Practice Laboratory | Live Schema & SERP Testing | Margalla Hills',
    desc: 'Interactive SEO sandbox for schema testing, Core Web Vitals audit, and Google SERP simulator.'
  },
  '/admin': {
    title: 'Executive SEO & CMS Control Panel | Margalla Hills',
    desc: 'Secure administrative dashboard for managing keywords, metadata, backlinks, and search engine parameters.'
  }
};

/**
 * Hook to inject dynamic SEO tags into the document <head> on route transitions
 */
export function useSEORuntime(currentPath: string) {
  useEffect(() => {
    const config = getStoredAnalyticsConfig();

    // 1. Determine Title & Description
    let meta = ROUTE_META[currentPath];
    if (!meta) {
      if (currentPath.startsWith('/menu/')) {
        const dishSlug = currentPath.split('/').pop()?.replace(/-/g, ' ') || 'Specialty Dish';
        meta = {
          title: `${dishSlug.charAt(0).toUpperCase() + dishSlug.slice(1)} | Margalla Hills Menu`,
          desc: `Enjoy authentic ${dishSlug} prepared with live charcoal and mountain spices at Margalla Hills Islamabad.`
        };
      } else if (currentPath.startsWith('/catering/')) {
        const city = currentPath.replace('/catering/', '').replace(/-/g, ' ');
        meta = {
          title: `Luxury Catering in ${city.toUpperCase()} | Margalla Hills Banquets`,
          desc: `Premium corporate and wedding catering packages in ${city} curated by Margalla Hills culinary masters.`
        };
      } else {
        meta = {
          title: 'Margalla Hills | Hilltop Dining & Resort Islamabad',
          desc: 'Luxury hilltop dining in Islamabad with 400+ dishes, authentic barbecue, and family deals.'
        };
      }
    }

    // Set Document Title
    document.title = meta.title;

    // Helper: update or create meta tag
    const setMeta = (nameAttr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('name', 'description', meta.desc);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.desc);
    setMeta('property', 'og:url', window.location.href);

    // 2. Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + currentPath;

    // 3. Google Search Console Verification Meta Tag
    if (config.googleSearchConsoleVerification) {
      // Clean verification token if user entered full tag or key=val
      let token = config.googleSearchConsoleVerification.trim();
      const match = token.match(/content=["']?([^"']+)["']?/);
      if (match) {
        token = match[1];
      } else if (token.includes('=')) {
        token = token.split('=')[1];
      }

      if (token) {
        setMeta('name', 'google-site-verification', token);
      }
    }

    // 4. Google Analytics 4 (GA4) Tag
    if (config.ga4Id && config.ga4Id.startsWith('G-') && config.ga4Id !== 'G-MARGALLA1234') {
      const existingScript = document.getElementById('ga4-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'ga4-inline-script';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.ga4Id}', { page_path: window.location.pathname });
        `;
        document.head.appendChild(inlineScript);
      } else if ((window as any).gtag) {
        (window as any).gtag('config', config.ga4Id, { page_path: currentPath });
      }
    }
  }, [currentPath]);
}
