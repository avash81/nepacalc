'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { CALCULATORS, Calculator as CalcType } from '@/data/calculators';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant: 'navbar' | 'hero';
  onExpandChange?: (expanded: boolean) => void;
}

export function SearchBar({ variant, onExpandChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalcType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mobile navbar expansion state
  const [isExpanded, setIsExpanded] = useState(false);
  
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();

    const scored = CALCULATORS
      .map(c => {
        const name = c.name.toLowerCase();
        const cat  = c.category.toLowerCase();
        const kws  = c.keywords?.map(k => k.toLowerCase()) ?? [];

        let score = 0;
        if (name === q)                     score = 100; // exact
        else if (name.startsWith(q))        score = 80;  // name starts with query
        else if (name.includes(q))          score = 60;  // name contains query
        else if (kws.some(k => k.startsWith(q))) score = 40; // keyword starts
        else if (cat.includes(q))           score = 30;  // category
        else if (kws.some(k => k.includes(q)))  score = 20; // keyword contains

        return { calc: c, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ calc }) => calc);

    setResults(scored);
    setActiveIndex(0);
    setIsOpen(true);
  }, [query]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus when mobile search expands
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      if (isOpen) setIsOpen(false);
      else if (isExpanded) {
        setIsExpanded(false);
        // Do not clear typed query on close per spec
      }
    }
  };

  const handleSubmit = () => {
    if (results[activeIndex]) {
      const selected = results[activeIndex];
      router.push(selected.slug.includes('/') ? `/${selected.slug}/` : `/calculator/${selected.slug}/`);
      setIsOpen(false);
      setIsExpanded(false);
      setQuery('');
    } else if (query.trim()) {
       // Optional fallback if no suggestion selected
       router.push(`/search?q=${encodeURIComponent(query.trim())}`);
       setIsOpen(false);
       setIsExpanded(false);
    }
  };

  const goTo = (calc: CalcType) => {
    router.push(calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`);
    setIsOpen(false);
    setIsExpanded(false);
    setQuery('');
  };

  const isNavbar = variant === 'navbar';

  return (
    <div 
      ref={searchRef} 
      className={`relative group ${isNavbar ? 'flex items-center' : 'w-full'}`}
    >
      {/* 
        NAVBAR VARIANT
      */}
      {isNavbar && (
        <>
          {/* Desktop/Tablet Pill (Hidden on Mobile <768px unless expanded is handled separately, but we'll use CSS to hide the input portion) */}
          <div className={`hidden md:flex items-center bg-white rounded-full p-1 border border-transparent focus-within:ring-2 focus-within:ring-white/40 shadow-sm transition-all duration-300 w-[180px] lg:w-[240px]`}>
            <button 
              onClick={handleSubmit}
              aria-label="Search"
              className="w-8 h-8 rounded-full bg-[#0E5C52] flex items-center justify-center text-white shrink-0 hover:bg-[#0a453d] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0E5C52]"
            >
              <Search size={16} strokeWidth={2.5} />
            </button>
            <input
              ref={isExpanded ? null : inputRef}
              type="text"
              aria-label="Search calculators"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full h-8 pl-3 pr-2 bg-transparent text-[#1a1a1a] placeholder:text-[#8a8a8a] text-[14px] font-medium focus:outline-none appearance-none"
            />
          </div>

          {/* Mobile Icon-Only Trigger (<768px) */}
          {!isExpanded && (
            <button 
              onClick={() => { setIsExpanded(true); onExpandChange?.(true); }}
              aria-label="Search"
              className="md:hidden w-10 h-10 rounded-full bg-[#0E5C52] flex items-center justify-center text-white shadow-sm hover:bg-[#0a453d] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0E5C52]"
            >
              <Search size={18} strokeWidth={2.5} />
            </button>
          )}

          {/* Mobile Expanded — inline pill, stays between logo and hamburger */}
          {isExpanded && (
            <div className="md:hidden flex items-center bg-white rounded-full p-1 shadow-lg w-full animate-in fade-in duration-150">
              <button 
                onClick={handleSubmit}
                aria-label="Search"
                className="w-8 h-8 rounded-full bg-[#0E5C52] flex items-center justify-center text-white shrink-0"
              >
                <Search size={16} strokeWidth={2.5} />
              </button>
              <input
                ref={inputRef}
                type="text"
                aria-label="Search calculators"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full min-w-0 h-8 pl-2 pr-1 bg-transparent text-[#1a1a1a] placeholder:text-[#8a8a8a] text-[14px] font-medium focus:outline-none appearance-none"
              />
              <button 
                onClick={() => { setIsExpanded(false); onExpandChange?.(false); }}
                aria-label="Close search"
                className="w-8 h-8 flex items-center justify-center text-[#8a8a8a] hover:text-[#1a1a1a] shrink-0"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          )}
        </>
      )}

      {/* 
        HERO VARIANT
      */}
      {!isNavbar && (
        <div className={`relative flex items-center bg-white border border-[#E0E0E0] rounded-full w-full max-w-[560px] mx-auto py-1 pr-1 pl-5 transition-all duration-300 focus-within:border-[#0E5C52] focus-within:shadow-[0_0_0_2px_rgba(14,92,82,0.2)] ${isOpen ? 'border-[#0E5C52] shadow-[0_0_0_2px_rgba(14,92,82,0.2)]' : 'hover:shadow-md'}`}>
          <input
            ref={inputRef}
            type="text"
            aria-label="Search calculators"
            placeholder="Find calculators..."
            className="flex-1 bg-transparent border-none outline-none text-[#1a1a1a] placeholder:text-[#8a8a8a] text-[15px] focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none appearance-none min-w-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            aria-label="Search"
            className="w-10 h-10 rounded-full bg-[#0E5C52] flex items-center justify-center text-white shrink-0 cursor-pointer border-none focus:outline-none"
          >
            <Search size={20} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* DROPDOWN RESULTS (Shared for both variants) */}
      {isOpen && results.length > 0 && (
        <div className={`absolute left-0 right-0 bg-white border border-[#dadce0] rounded-2xl shadow-xl overflow-hidden z-[400] animate-in fade-in slide-in-from-top-2 duration-200 ${isNavbar && isExpanded ? 'fixed top-16 mx-4 w-auto shadow-2xl' : 'top-full mt-2 w-full max-w-2xl mx-auto'}`}>
          <div className="p-2">
            <div className="px-4 py-2 text-[10px] font-black text-[#5f6368] uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={12} className="text-amber-500" />
              Suggested Tools
            </div>
            <div className="grid gap-1">
              {results.map((calc, i) => (
                <button
                  key={calc.id}
                  onClick={() => goTo(calc)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all text-left ${
                    i === activeIndex ? 'bg-[#0E5C52]/5 text-[#0E5C52]' : 'text-[#1a1a1a] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 text-xl shrink-0">
                      {typeof calc.icon === 'string' ? (calc.icon || '🛠️') : <Calculator size={20} />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[14px] leading-tight truncate">{calc.name}</div>
                      <div className="text-[10px] uppercase tracking-widest font-black opacity-50 truncate">{calc.category}</div>
                    </div>
                  </div>
                  <ArrowRight size={18} className={`shrink-0 transition-transform duration-300 ${i === activeIndex ? 'translate-x-1 opacity-100 text-[#0E5C52]' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 bg-[#f8f9fa] border-t border-[#dadce0] text-[10px] font-black text-[#70757a] uppercase tracking-widest text-center">
            100+ calculators on NepaCalc
          </div>
        </div>
      )}
    </div>
  );
}
