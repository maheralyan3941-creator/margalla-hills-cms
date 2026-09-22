import React from 'react';
import { 
  UtensilsCrossed, 
  CalendarDays
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  userRole?: string | null;
}

interface NavLinkItem {
  name: string;
  path: string;
  badge?: string;
  highlight?: boolean;
}

export function Navbar({ currentPath, navigate }: NavbarProps) {
  const handleNav = (path: string) => {
    navigate(path);
  };

  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals & Offers', path: '/deals' },
    { name: 'Services', path: '/services', badge: 'VIP' },
    { name: 'Locations', path: '/locations' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Desktop & Mobile Main Header Row */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-500 rounded-xl flex items-center justify-center text-black font-bold shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <div>
              <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors block leading-tight">
                Margalla Hills
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-wider block">
                Luxury Dining &amp; Catering
              </span>
            </div>
          </div>

          {/* Desktop Direct Nav Bar */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-400 shadow-sm font-bold'
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono leading-none ${
                      isActive 
                        ? 'bg-black/20 text-black font-bold' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNav('/contact')}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
          </div>

        </div>

        {/* Mobile Always-Visible Direct Navigation Row (No 3 lines / No hamburger) */}
        <div className="lg:hidden pb-2.5 pt-0.5 overflow-x-auto no-scrollbar scroll-smooth">
          <nav className="flex items-center gap-1.5 min-w-max">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1 border shadow-xs ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'bg-neutral-900/90 text-neutral-300 hover:text-white border-neutral-800 active:bg-neutral-800'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`px-1 py-0.2 rounded text-[8px] font-mono leading-none ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </header>
  );
}
