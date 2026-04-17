'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Search, Sun, Moon, ChevronRight, History, Star,
  Sparkles, Folder, Wallet, Heart, BookOpen, Info 
} from 'lucide-react';
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
    { name: 'Directory',  href: '/calculator' },
    { name: 'Financial',  href: '/calculator/category/finance' },
    { name: 'Health',     href: '/calculator/category/health' },
    { name: 'Blog',       href: '/blog' },
    { name: 'About',      href: '/about' },
  ];

  if (path.startsWith('/math-tools')) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#002147] text-white z-[200] select-none border-b border-[#D4AF37]/30 no-print shadow-xl">
        <div className="hp-container h-full flex items-center justify-between">
          
          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="hover:opacity-90 transition-opacity" aria-label="NEPACALC Home">
               <Logo size="sm" isWhite={true} />
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 h-16">
              {navLinks.map((link) => {
                const active = path === link.href || (link.href !== '/' && path.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 h-full flex items-center text-[10.5px] font-black uppercase tracking-[0.15em] transition-all relative group/nav ${
                      active ? 'text-[#D4AF37]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {active && <div className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#D4AF37] rounded-t-full shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />}
                    <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#D4AF37] scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-center duration-300 rounded-t-full" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 px-4 py-1.5 border-r border-white/10 mr-2">
               <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">Academic Edition</span>
            </div>
            
            {/* Simple Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all text-white"
              aria-label="Search laboratory"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 hover:bg-white/10 rounded-xl transition-all text-white hover:text-[#D4AF37]"
              aria-label="Toggle theme"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-xl text-white"
              aria-label="Open menu"
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
      <aside className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#002147] text-white z-[301] shadow-2xl transform transition-transform duration-300 ease-out border-l border-[#D4AF37]/30 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full uppercase tracking-widest font-black text-[10px]">
          <div className="p-6 flex items-center justify-between border-b border-white/10 bg-[#001a38]">
            <Logo size="sm" isWhite={true} />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-xl text-white" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {[
               { name: 'Math Tools', href: '/math-tools', icon: <Sparkles className="w-5 h-5" /> },
               { name: 'Directory', href: '/calculator', icon: <Folder className="w-5 h-5" /> },
               { name: 'Financial', href: '/calculator/category/finance', icon: <Wallet className="w-5 h-5" /> },
               { name: 'Health', href: '/calculator/category/health', icon: <Heart className="w-5 h-5" /> },
               { name: 'Blog', href: '/blog', icon: <BookOpen className="w-5 h-5" /> },
               { name: 'About', href: '/about', icon: <Info className="w-5 h-5" /> },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 text-white/70 hover:text-[#D4AF37] transition-all group border border-transparent hover:border-[#D4AF37]/20"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  <span className="tracking-[0.15em]">{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-white/10 text-center text-[9px] font-black uppercase tracking-[0.2em] bg-[#001a38]">
            <div className="text-[#D4AF37] mb-2">NEPAL ACADEMIC EDITION</div>
            <div className="text-white/40">© 2026 NEPACALC Laboratory</div>
          </div>
        </div>
      </aside>
    </>
  );
}
