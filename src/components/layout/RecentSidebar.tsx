'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, ChevronRight } from 'lucide-react';

interface RecentItem {
  label: string;
  href: string;
}

export function RecentSidebar() {
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const history = JSON.parse(localStorage.getItem('cp_recent') || '[]');
    setRecent(history.slice(0, 5)); // Only show top 5 in sidebar
  }, []);

  if (!mounted || recent.length === 0) return null;

  return (
    <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 bg-white border-b border-[#DADCE0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-3.5 h-3.5 text-[#1A73E8]" />
          <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-wider">Recently Viewed</h2>
        </div>
      </div>
      <div className="p-3 space-y-1">
        {recent.map((item, idx) => (
          <Link key={idx} href={item.href} className="flex items-center gap-3 p-2 rounded-md hover:bg-[#F8F9FA] transition-all group">
            <div className="w-6 h-6 rounded bg-[#F1F3F4] group-hover:bg-[#E8F0FE] flex items-center justify-center transition-colors">
              <ChevronRight className="w-3 h-3 text-[#5F6368] group-hover:text-[#1A73E8]" />
            </div>
            <span className="text-[12px] font-bold text-[#3C4043] group-hover:text-[#1A73E8] truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
