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
    { name: 'Calculators', href: '/calculator' },
    { name: 'Solutions',   href: '/solutions' },
    { name: 'Resources',   href: '/blog' },
    { name: 'Pricing',     href: '/pricing' },
  ];

  if (path.startsWith('/math-tools')) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white text-[#202124] z-[200] select-none border-b border-[#f1f3f4] no-print">
        <div className="hp-container h-full flex items-center justify-between">
          
          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
               <Logo size="sm" />
            </Link>
            
            <div className="hidden md:flex items-center gap-1 h-14">
              {navLinks.map((link) => {
                const active = path === link.href || (link.href !== '/' && path.startsWith(link.href));
                const hasSub = ['Calculators', 'Solutions', 'Resources'].includes(link.name);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 h-14 flex items-center gap-1 text-[11px] font-black uppercase tracking-widest transition-all relative group/nav ${
                      active ? 'text-[#1A73E8]' : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    {link.name}
                    {hasSub && <ChevronRight className="w-3 h-3 rotate-90 text-[#9AA0A6] group-hover/nav:text-[#1A73E8] transition-colors" />}
                    {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1A73E8] rounded-t-full" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden md:block text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-[#1A73E8] transition-all">Sign In</button>
            <button className="hidden md:block px-5 py-2.5 bg-[#1A73E8] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Get Started</button>
            
            {/* Simple Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDark}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-[#1A73E8]"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
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
            © 2026 NepCalc — Built for Precision
          </div>
        </div>
      </aside>
    </>
  );
}
