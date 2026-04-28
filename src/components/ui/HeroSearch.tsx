'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { CALCULATORS, Calculator as CalcType } from '@/data/calculators';
import { useRouter } from 'next/navigation';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalcType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = CALCULATORS.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q) ||
      c.keywords?.some(k => k.toLowerCase().includes(q))
    ).slice(0, 6);
    setResults(filtered);
    setActiveIndex(0);
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[activeIndex]) {
      const selected = results[activeIndex];
      router.push(selected.slug.includes('/') ? `/${selected.slug}/` : `/calculator/${selected.slug}/`);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl group">
      <div className={`relative flex items-center transition-all duration-300 ${isOpen ? 'ring-4 ring-blue-500/10' : ''}`}>
        <div className="absolute left-8 text-blue-600 group-focus-within:scale-110 transition-transform">
          <Search size={28} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="What do you want to calculate today? (e.g. Income Tax, BMI, GPA...)"
          className="w-full h-20 pl-20 pr-8 bg-white border-2 border-[#dadce0] rounded-2xl text-[18px] font-medium text-[#202124] placeholder:text-[#5f6368] focus:border-blue-600 focus:outline-none shadow-lg transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded-lg text-[10px] font-black text-[#5f6368] uppercase tracking-widest">
           Press <span className="text-blue-600">Enter</span> to find
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-[#dadce0] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="px-4 py-2 text-[10px] font-black text-[#5f6368] uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={12} className="text-amber-500" />
              Suggested Laboratory Tools
            </div>
            <div className="grid gap-1">
              {results.map((calc, i) => (
                <button
                  key={calc.id}
                  onClick={() => router.push(calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all text-left ${
                    i === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-[#202124] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 text-xl">
                      {typeof calc.icon === 'string' ? (calc.icon || '🛠️') : <Calculator size={20} />}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] leading-tight">{calc.name}</div>
                      <div className="text-[10px] uppercase tracking-widest font-black opacity-50">{calc.category}</div>
                    </div>
                  </div>
                  <ArrowRight size={18} className={`transition-transform duration-300 ${i === activeIndex ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 bg-[#f8f9fa] border-t border-[#dadce0] text-[10px] font-black text-[#70757a] uppercase tracking-widest text-center">
            Refining precision across 80+ scientific models
          </div>
        </div>
      )}
    </div>
  );
}
