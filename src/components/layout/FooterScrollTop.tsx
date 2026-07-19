'use client';
import { ArrowUp } from 'lucide-react';

export function FooterScrollTop() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="flex items-center gap-1.5 px-4 py-2 bg-[#161618] border border-[#2d2d35] text-[#bdc1c6] font-black uppercase text-[9px] tracking-widest rounded-full hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all duration-200 active:scale-95"
    >
      Top <ArrowUp className="w-3 h-3" />
    </button>
  );
}
