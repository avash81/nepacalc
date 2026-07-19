'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronRight, Star, Sparkles, Globe, Wallet, Heart, Activity } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import dynamic from 'next/dynamic';

const SearchModal = dynamic(() => import('./SearchModal').then(mod => mod.SearchModal), { ssr: false });

export function NavbarActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const path = usePathname();

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

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-[#5F6368] bg-[#F1F3F4] hover:bg-[#e8eaed] rounded-full transition-all group border border-transparent hover:border-[#dadce0] shadow-sm"
          aria-label="Search Laboratory"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform text-[#1a73e8]" />
          <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-[#202124]">Search Tools</span>
          <kbd className="hidden md:flex h-5 items-center gap-1 rounded border border-[#dadce0] bg-white px-1.5 font-mono text-[10px] font-medium text-[#70757a] opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
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

      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] animate-in fade-in duration-200" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white text-[#202124] z-[301] shadow-sm transform transition-transform duration-300 ease-out border-l border-[#e8eaed] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col h-full uppercase tracking-widest font-black text-[10px]" aria-label="Mobile Navigation">
          <div className="p-6 flex items-center justify-between border-b border-[#e8eaed] bg-[#f8f9fa]">
            <Logo size="sm" theme="indigo" />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-xl text-[#5F6368]" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {[
               { name: 'Nepal Specific', href: '/nepal/', icon: <Star className="w-5 h-5" /> },
               { name: 'Finance & Tax', href: '/finance/', icon: <Wallet className="w-5 h-5" /> },
               { name: 'Math Tools', href: '/math-tools/', icon: <Sparkles className="w-5 h-5" /> },
               { name: 'Converters', href: '/converters/', icon: <Globe className="w-5 h-5" /> },
               { name: 'Health & Fitness', href: '/health/', icon: <Heart className="w-5 h-5" /> },
               { name: 'Engineering', href: '/engineering/', icon: <Sparkles className="w-5 h-5" /> },
               { name: 'Market Rates', href: '/market-rates/', icon: <Activity className="w-5 h-5" /> },
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
            <div className="text-[#5F6368]">© NepaCalc Laboratory</div>
          </div>
        </nav>
      </aside>
    </>
  );
}
