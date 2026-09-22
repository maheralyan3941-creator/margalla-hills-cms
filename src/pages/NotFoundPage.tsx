import React, { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Utensils, Home, Search, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export function NotFoundPage({ navigate }: NotFoundPageProps) {
  useEffect(() => {
    // Log 404 crawl occurrence to server monitoring
    const currentPath = window.location.pathname || window.location.hash || '/';
    api.log404Error(currentPath, document.referrer).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 flex items-center justify-center p-4">
      <SEOHead
        seo={{
          seoTitle: '404 - Page Not Found | Saffron & Sage Artisanal Kitchen',
          metaDescription: 'The requested page could not be located. Browse our artisanal menu or return to the culinary homepage.',
          slug: '404',
          robotsIndex: false,
          robotsFollow: true
        }}
      />

      <div className="max-w-md w-full text-center space-y-6 bg-[#121212] p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-black/80 border border-slate-800 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <Utensils className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">HTTP 404 Response</span>
          <h1 className="font-serif text-3xl font-bold text-white">Culinary Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The link you followed may have been updated or moved. You can preserve search equity by visiting our active categories below.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full py-3 bg-[#0A0A0A] hover:bg-slate-900 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition border border-slate-800 cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-emerald-400" />
            <span>Browse Full Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
