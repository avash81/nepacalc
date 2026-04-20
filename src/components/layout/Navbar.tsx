'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Search, Sun, Moon, ChevronRight, History, Star,
  Sparkles, Folder, Wallet, Heart, BookOpen, Info, Globe, Activity
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    { name: 'Nepal Specific', href: '/nepal' },
    { name: 'Finance & Tax', href: '/finance' },
    { name: 'Math Tools', href: '/math-tools' },
    { name: 'Converters', href: '/converters' },
    { name: 'Health', href: '/health' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'Market Rates', href: '/market-rates' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white text-[#202124] z-[200] select-none border-b border-[#e8eaed] no-print shadow-sm">
        <div className="hp-container h-full flex items-center justify-between">
          
          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-14">
            <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="NEPACALC Home">
               <Logo size="sm" theme="indigo" />
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 h-16">
              {navLinks.map((link) => {
                const active = path === link.href || (link.href !== '/' && path.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 h-full flex items-center text-[11px] font-black uppercase tracking-[0.12em] transition-all relative group/nav ${
                      active ? 'text-[#202124]' : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    {link.name}
                    {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#059669] rounded-t-full" />}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#059669] scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-center duration-300 rounded-t-full" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-6">

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors group"
              aria-label="Search Laboratory"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2.5 hover:bg-[#F1F3F4] rounded-full text-[#5F6368]"
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
      <aside className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white text-[#202124] z-[301] shadow-2xl transform transition-transform duration-300 ease-out border-l border-[#e8eaed] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full uppercase tracking-widest font-black text-[10px]">
          <div className="p-6 flex items-center justify-between border-b border-[#e8eaed] bg-[#f8f9fa]">
            <Logo size="sm" theme="indigo" />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-xl text-[#5F6368]" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {[
               { name: 'Nepal Specific', href: '/nepal', icon: <Star className="w-5 h-5" /> },
               { name: 'Finance & Tax', href: '/finance', icon: <Wallet className="w-5 h-5" /> },
               { name: 'Math Tools', href: '/math-tools', icon: <Sparkles className="w-5 h-5" /> },
               { name: 'Converters', href: '/converters', icon: <Globe className="w-5 h-5" /> },
               { name: 'Health & Fitness', href: '/health', icon: <Heart className="w-5 h-5" /> },
               { name: 'Engineering', href: '/engineering', icon: <Sparkles className="w-5 h-5" /> },
               { name: 'Market Rates', href: '/market-rates', icon: <Activity className="w-5 h-5" /> },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-all group border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#FFC107] opacity-80 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  <span className="tracking-[0.12em]">{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity text-[#FFC107]" />
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-[#e8eaed] text-center text-[9px] font-black uppercase tracking-[0.2em] bg-[#f8f9fa]">
            <div className="text-[#FFC107] mb-2 bg-black py-2 rounded-md mx-4">Nepal Academic Edition</div>
            <div className="text-[#5F6368]">© NEPACALC Laboratory</div>
          </div>
        </div>
      </aside>
    </>
  );
}
