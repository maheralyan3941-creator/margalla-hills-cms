import React, { useEffect, useState } from 'react';
import { SEOMetadata } from '../types';
import { CheckCircle, AlertTriangle, XCircle, Code, Eye, Layers } from 'lucide-react';
import { calculateSEOAudit, estimateTitlePixelWidth } from '../lib/seoAnalyzer';

interface SEOHeadProps {
  seo: Partial<SEOMetadata>;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
  schemaData?: Record<string, any>;
  contentForAudit?: string;
}

export function SEOHead({
  seo,
  defaultTitle = 'Margalla Hills | Luxury Dining & Hilltop Restaurant Islamabad',
  defaultDescription = 'Margalla Hills luxury hilltop restaurant in Islamabad featuring authentic charcoal BBQ, Shinwari karahi, Continental cuisine, and scenic panoramic views.',
  defaultImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  schemaData,
  contentForAudit = ''
}: SEOHeadProps) {
  const [showInspector, setShowInspector] = useState(false);

  const title = seo.seoTitle || defaultTitle;
  const description = seo.metaDescription || defaultDescription;
  const canonical = seo.canonicalUrl ? `${window.location.origin}${seo.canonicalUrl.startsWith('/') ? '' : '/'}${seo.canonicalUrl}` : window.location.href;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || defaultImage;
  const robots = `${seo.robotsIndex !== false ? 'index' : 'follow'}, ${seo.robotsFollow !== false ? 'follow' : 'nofollow'}`;

  // Generate fallback schema if none provided
  const finalSchema = schemaData || {
    '@context': 'https://schema.org',
    '@type': seo.schemaType || 'WebPage',
    name: title,
    description: description,
    url: canonical
  };

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('robots', robots);
    setMeta('og:title', ogTitle, true);
    setMeta('og:description', ogDescription, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', seo.schemaType === 'Article' ? 'article' : 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle);
    setMeta('twitter:description', ogDescription);
    setMeta('twitter:image', ogImage);

    // 3. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Clean and inject appropriate Pakistan & Global hreflang Tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    const hreflangTargets = [
      { lang: 'x-default', href: canonical },
      { lang: 'en-pk', href: `${canonical}${canonical.includes('?') ? '&' : '?'}geo=pk` },
      { lang: 'ur-pk', href: `${canonical}${canonical.includes('?') ? '&' : '?'}geo=pk&hl=ur` },
      { lang: 'en', href: canonical }
    ];
    hreflangTargets.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });

    // 5. Inject or Update JSON-LD Script
    let script = document.getElementById('structured-data-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(finalSchema, null, 2);
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, robots, finalSchema]);

  const audit = calculateSEOAudit(contentForAudit, {
    seoTitle: title,
    metaDescription: description,
    slug: seo.slug || '',
    focusKeyword: seo.focusKeyword || '',
    secondaryKeywords: seo.secondaryKeywords || [],
    canonicalUrl: canonical,
    robotsIndex: seo.robotsIndex !== false,
    robotsFollow: seo.robotsFollow !== false,
    ogTitle,
    ogDescription,
    ogImage,
    schemaType: seo.schemaType || 'WebSite',
    searchIntent: seo.searchIntent || 'Informational'
  });

  const pixelWidth = estimateTitlePixelWidth(title);

  return null;
}
