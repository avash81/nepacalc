'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Sun, Moon, ChevronRight, History, Star } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [recent, setRecent] = useState<{ title: string; href: string }[]>([]);
  const [favs, setFavs] = useState<{ title: string; href: string }[]>([]);
  const path = usePathname();

  // Load Recent & Favs
  useEffect(() => {
    const loadData = () => {
      setRecent(JSON.parse(localStorage.getItem('cp_recent') || '[]'));
      setFavs(JSON.parse(localStorage.getItem('cp_favs') || '[]'));
    };
    loadData();
    window.addEventListener('cp_favs_updated', loadData);
    return () => window.removeEventListener('cp_favs_updated', loadData);
  }, [path]);

  // Dark Mode Toggle
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => setIsMenuOpen(false), [path]);

  const navLinks = [
    { name: 'Math Tools', href: '/math-tools' },
    { name: 'Directory', href: '/calculator' },
    { name: 'Financial', href: '/calculator/category/finance' },
    { name: 'Blog', href: '/blog' },
  ];

  if (path.startsWith('/math-tools')) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-11 bg-[#083366] text-white z-[200] select-none shadow-sm no-print">
        <div className="hp-container h-full flex items-center justify-between">
          
          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
               <span className="text-sm font-black tracking-tighter uppercase italic">Equaly</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1 h-11">
              {navLinks.map((link) => {
                const active = path === link.href || (link.href !== '/' && path.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 h-11 flex items-center text-[11px] font-black uppercase tracking-widest transition-all relative ${
                      active ? 'text-white bg-white/10' : 'text-blue-100/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            
            {/* Favorites Dropdown */}
            <div className="hidden lg:flex items-center h-11 group relative">
               <button className="flex items-center gap-1.5 px-3 h-full text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-white hover:bg-white/5 transition-all">
                  <Star className="w-3.5 h-3.5" />
                  <span>Favs</span>
               </button>
               <div className="absolute top-full right-0 w-64 bg-white border border-slate-200 shadow-xl rounded-b-xl overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200 cursor-default">
                  <div className="p-3 bg-slate-50 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">Your Saved Tools</div>
                  <div className="p-1 max-h-[300px] overflow-y-auto">
                     {favs.length > 0 ? favs.map((f, i) => (
                       <Link key={i} href={f.href} className="flex items-center gap-3 p-2.5 hover:bg-yellow-50 rounded-lg group/item transition-colors">
                          <Star className="w-4 h-4 text-slate-300 group-hover/item:text-yellow-500 transition-colors" />
                          <span className="text-[12px] font-bold text-slate-700 truncate">{f.title}</span>
                       </Link>
                     )) : (
                       <div className="p-4 text-center text-slate-400 italic text-[11px]">Click the star on any calculator to save it here.</div>
                     )}
                  </div>
               </div>
            </div>

            {/* Recently Used Dropdown (MDCalc Style) */}
            <div className="hidden lg:flex items-center h-11 group relative">
               <button className="flex items-center gap-1.5 px-3 h-full text-[10px] font-black uppercase tracking-widest text-blue-100/60 hover:text-white hover:bg-white/5 transition-all">
                  <History className="w-3.5 h-3.5" />
                  <span>Recent</span>
               </button>
               <div className="absolute top-full right-0 w-64 bg-white border border-slate-200 shadow-xl rounded-b-xl overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200 cursor-default">
                  <div className="p-3 bg-slate-50 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">Recently Used Tools</div>
                  <div className="p-1 max-h-[300px] overflow-y-auto">
                     {recent.length > 0 ? recent.map((r, i) => (
                       <Link key={i} href={r.href} className="flex items-center gap-3 p-2.5 hover:bg-blue-50 rounded-lg group/item transition-colors">
                          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-xs group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shrink-0">
                             {i + 1}
                          </div>
                          <span className="text-[12px] font-bold text-slate-700 truncate">{r.title}</span>
                       </Link>
                     )) : (
                       <div className="p-4 text-center text-slate-400 italic text-[11px]">No recent tools yet.</div>
                     )}
                  </div>
                  <div className="p-2 border-t border-slate-100 bg-slate-50">
                     <Link href="/calculator" className="block w-full py-2 text-center text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800">Browse Full Directory</Link>
                  </div>
               </div>
            </div>

            {/* Simple Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all group"
            >
              <Search className="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white">Search tools...</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDark}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-1.5 hover:bg-white/10 rounded-lg text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] animate-in fade-in duration-200" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--bg-surface)] z-[301] shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full uppercase tracking-widest font-black text-[10px]">
          <div className="p-4 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-page)]">
            <Logo size="sm" />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-[var(--bg-subtle)] rounded-lg text-[var(--text-muted)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {[
               { name: 'Math Tools', href: '/math-tools', icon: '✨' },
               { name: 'Directory', href: '/calculator', icon: '📁' },
               { name: 'Financial', href: '/calculator/category/finance', icon: '💰' },
               { name: 'Health', href: '/calculator/category/health', icon: '❤️' },
               { name: 'Blog', href: '/blog', icon: '📖' },
               { name: 'About', href: '/about', icon: 'ℹ️' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--primary-light)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg opacity-80 group-hover:opacity-100">{link.icon}</span>
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
          </div>

          <div className="p-6 border-t border-[var(--border)] text-center text-[var(--text-muted)] bg-[var(--bg-page)]">
            © 2026 Equaly — Built for Precision
          </div>
        </div>
      </aside>
    </>
  );
}
