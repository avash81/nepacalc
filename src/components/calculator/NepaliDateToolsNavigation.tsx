'use client';
import Link from 'next/link';

interface NepaliDateToolsNavigationProps {
  currentPage: 'single' | 'bulk';
}

export function NepaliDateToolsNavigation({ currentPage }: NepaliDateToolsNavigationProps) {
  return (
    <div className="mb-6 bg-white border border-slate-200 rounded-xl overflow-hidden p-1.5 flex gap-1 sm:flex-row flex-col max-w-[420px]">
      <Link 
        href="/calculator/nepali-date/"
        className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 'single' 
            ? 'bg-[#0d6e6a] text-white shadow-sm' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        Nepali Date Converter
      </Link>
      <Link 
        href="/calculator/nepali-date/bulk/"
        className={`flex-1 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 'bulk' 
            ? 'bg-[#0d6e6a] text-white shadow-sm' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        Bulk Date Converter
      </Link>
    </div>
  );
}
