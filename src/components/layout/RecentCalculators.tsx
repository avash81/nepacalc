'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, X, ChevronRight } from 'lucide-react';

interface RecentItem {
  label: string;
  href: string;
}

export function RecentCalculators() {
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const history = JSON.parse(localStorage.getItem('cp_recent') || '[]');
    setRecent(history);
  }, []);

  const removeItem = (href: string) => {
    const newRecent = recent.filter(item => item.href !== href);
    setRecent(newRecent);
    localStorage.setItem('cp_recent', JSON.stringify(newRecent));
  };

  if (!mounted || recent.length === 0) return null;

  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <History className="w-4 h-4 text-[#1A73E8]" />
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#202124]">Recently Used Calculators</h2>
        </div>
        <span className="text-[9px] font-bold text-[#70757A] uppercase bg-white px-2 py-0.5 border border-[#DADCE0] rounded-full">Your Session Data</span>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {recent.map((item, idx) => (
            <div key={idx} className="group relative">
              <Link
                href={item.href}
                prefetch={false}
                className="flex items-center gap-2 pl-3 pr-8 py-2 bg-white border border-[#DADCE0] rounded-full text-[12px] font-bold text-[#3C4043] hover:bg-[#E8F0FE] hover:text-[#1A73E8] hover:border-[#1A73E8] transition-all"
              >
                <ChevronRight className="w-3 h-3 text-[#DADCE0] group-hover:text-[#1A73E8]" />
                <span className="truncate max-w-[150px]">{item.label}</span>
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); removeItem(item.href); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#D93025] hover:text-[#202124] text-[#70757A] opacity-0 group-hover:opacity-100 transition-all"
                title="Remove from history"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

