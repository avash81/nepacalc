'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Globe, Grid, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from './SearchModal';

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith('/math-tools')) return null;

  const tabs = [
    { name: 'Home',   icon: Home,     path: '/' },
    { name: 'Search', icon: Search,   isSearch: true },
    { name: 'Nepal',  icon: Globe,    path: '/calculator/nepal-income-tax', isSpecial: true },
    { name: 'Tools',  icon: Grid,     path: '/directory' },
    { name: 'Blog',   icon: BookOpen, path: '/blog' },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-[150] px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] no-print">
      <div className="flex justify-around items-center h-14 relative">
        {tabs.map((tab) => {
          const Icon = typeof tab.icon === 'string' ? null : tab.icon;
          const isActive = pathname === tab.path;
          
          return (
            <Link 
              key={tab.name} 
              href={tab.path || '#'}
              onClick={(e) => {
                 if (tab.isSearch) {
                    e.preventDefault();
                    setIsSearchOpen(true);
                 }
              }}
              className={`flex flex-col items-center justify-center flex-1 transition-all relative ${isActive ? 'text-[var(--primary)]' : 'text-slate-500'}`}
            >
              <div className={`transition-all duration-300 ${tab.isSpecial ? 'bg-[var(--primary)] text-white -mt-7 shadow-lg w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white active:scale-95' : 'p-1'}`}>
                {tab.isSpecial ? (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 21h1v-7.15c.67.24 1.34.42 2 .57V21h1v-6.38c.67.12 1.34.2 2 .25V21h1v-6.08c1.34.05 2.68.04 4-.04V21h1v-6.38c1.34-.14 2.68-.42 4-.82V21h1V4.85C16.34 2.8 13.68 1.95 11 2.3c-2.68.35-5.34 1.2-8 3.25V21h1z" />
                  </svg>
                ) : Icon ? (
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                ) : null}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-0.5 transition-colors ${tab.isSpecial ? 'text-[var(--primary)]' : isActive ? 'text-[var(--primary)]' : 'text-slate-500'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
