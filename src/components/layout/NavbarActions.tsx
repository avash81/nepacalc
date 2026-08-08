'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronRight, Star, Sparkles, Globe, Wallet, Heart, Activity } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useRouter } from 'next/navigation';
import { CALCULATORS, Calculator as CalcType } from '@/data/calculators';

export function NavbarActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalcType[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const path = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const isHomepage = path === '/';

  useEffect(() => setIsMenuOpen(false), [path]);
  useEffect(() => { setQuery(''); setIsSearchOpen(false); }, [path]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = CALCULATORS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.keywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 6);
    setResults(filtered);
    setActiveIndex(0);
    setIsSearchOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(p => (p + 1) % results.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(p => (p - 1 + results.length) % results.length); }
    else if (e.key === 'Enter' && results[activeIndex]) {
      const s = results[activeIndex];
      router.push(s.slug.includes('/') ? `/${s.slug}/` : `/calculator/${s.slug}/`);
      setIsSearchOpen(false); setQuery('');
    } else if (e.key === 'Escape') setIsSearchOpen(false);
  };

  const goTo = (calc: CalcType) => {
    router.push(calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`);
    setIsSearchOpen(false); setQuery('');
  };

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Navbar Search — hidden on homepage */}
        {!isHomepage && (
          <div ref={searchRef} className="relative block mr-2">
            <div className="flex items-center bg-white/10 hover:bg-white/20 focus-within:bg-white rounded-full border border-white/20 focus-within:border-white/60 transition-all duration-200 group w-[140px] sm:w-[180px] lg:w-[240px]">
              <Search className="w-4 h-4 ml-3 text-white/70 group-focus-within:text-[#0d6e6a] shrink-0" />
              <input
                type="text"
                placeholder="Search calculators..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full h-9 pl-2 pr-3 bg-transparent text-white placeholder:text-white/60 text-[13px] font-medium focus:text-[#202124] focus:placeholder:text-[#9aa0a6] focus:outline-none transition-colors rounded-full"
              />
            </div>

            {/* Dropdown results */}
            {isSearchOpen && results.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#dadce0] rounded-xl shadow-lg overflow-hidden z-[500]">
                <div className="p-1.5">
                  {results.map((calc, i) => (
                    <button
                      key={calc.id}
                      onClick={() => goTo(calc)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        i === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-[#202124] hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg w-7 text-center shrink-0">{typeof calc.icon === 'string' ? calc.icon : '🛠️'}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-[13px] leading-tight truncate">{calc.name}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">{calc.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 bg-[#f8f9fa] border-t border-[#dadce0] text-[10px] font-bold text-[#70757a] uppercase tracking-wider text-center">
                  100+ calculators on NepaCalc
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2.5 hover:bg-white/10 rounded-full text-white"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

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

          {/* Mobile search removed from here per user request, it is now in the header */}

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
