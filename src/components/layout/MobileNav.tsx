'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Globe, Grid, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from './SearchModal';

const tabs = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Nepal', path: '/nepal/', icon: Globe },
  { name: 'Calculators', path: '/calculator/', icon: Grid },
  { name: 'Guide', path: '/guide/', icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

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
              className={`flex flex-col items-center justify-center flex-1 transition-all relative ${isActive ? 'text-[var(--primary)]' : 'text-slate-500'}`}
            >
              <div className="p-1 transition-all duration-300">
                {Icon && <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-0.5 transition-colors ${isActive ? 'text-[var(--primary)]' : 'text-slate-500'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
    </>
  );
}

