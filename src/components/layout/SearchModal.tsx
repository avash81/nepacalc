'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight } from 'lucide-react';
import { CALCULATORS, Calculator as CalcType } from '@/data/calculators';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalcType[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter logic
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
    ).slice(0, 8);
    setResults(filtered);
    setActiveIndex(0);
  }, [query]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % Math.max(results.length, 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + results.length) % Math.max(results.length, 1));
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        const c = results[activeIndex];
        router.push(c.slug.includes('/') ? `/${c.slug}/` : `/calculator/${c.slug}/`);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, results, activeIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-12 md:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center p-5 border-b border-slate-100 bg-white">
          <div className="hidden sm:block mr-4 scale-90">
            <Logo size="sm" theme="indigo" />
          </div>
          <Search className="w-6 h-6 text-slate-400 mr-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for any calculator (EMI, BMI, TDS...)"
            aria-label="Search all calculators and converters"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400"
          />
          <button 
            onClick={onClose}
            aria-label="Close search"
            className="ml-4 p-2 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 scrollbar-hide">
          {query && results.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="font-bold text-slate-900 text-lg">No results for &quot;{query}&quot;</p>
              <p className="text-slate-500 text-sm mt-1">Try keywords like &quot;tax&quot;, &quot;math&quot;, or &quot;health&quot;.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-2">
              {results.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    router.push(c.slug.includes('/') ? `/${c.slug}/` : `/calculator/${c.slug}/`);
                    onClose();
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${
                    i === activeIndex ? 'bg-indigo-600 shadow-lg shadow-indigo-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl shadow-sm text-2xl border transition-colors ${
                      i === activeIndex ? 'bg-white border-transparent' : 'bg-white border-slate-100'
                    }`}>
                      {typeof c.icon === 'string' ? c.icon : <Calculator className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className={`font-bold text-base transition-colors ${i === activeIndex ? 'text-white' : 'text-slate-900'}`}>{c.name}</div>
                      <div className={`text-[10px] uppercase tracking-widest font-black transition-colors ${i === activeIndex ? 'text-indigo-100' : 'text-slate-400'}`}>{c.category}</div>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all ${i === activeIndex ? 'text-white translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-4 px-3">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 mb-4">Trending Laboratory Tools</div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {CALCULATORS.filter(c => c.isHot).slice(0, 6).map(c => (
                   <button
                     key={c.id}
                     onClick={() => {
                        router.push(c.slug.includes('/') ? `/${c.slug}/` : `/calculator/${c.slug}/`);
                       onClose();
                     }}
                     className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left group"
                   >
                     <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-50 text-xl group-hover:scale-110 transition-transform">
                        {c.icon}
                     </div>
                     <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{c.name}</span>
                   </button>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <kbd className="px-1.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <kbd className="px-1.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm">↑↓</kbd>
                <span>Navigate</span>
              </div>
           </div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <kbd className="px-1.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm">esc</kbd>
             <span>Close</span>
           </div>
        </div>
      </div>
    </div>
  );
}

