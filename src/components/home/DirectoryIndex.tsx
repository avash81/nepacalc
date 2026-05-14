import React from 'react';
import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';

export function DirectoryIndex() {
  return (
    <section className="py-12 border-t border-slate-200 mt-16 bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#202124] tracking-tight uppercase">Platform Laboratory Index</h2>
          <p className="text-sm text-slate-500 font-medium italic">Complete institutional directory of 90+ high-precision computational nodes.</p>
        </div>
        <Link href="/directory/" className="px-5 py-2 bg-[#F8F9FA] border border-[#DADCE0] rounded-full text-[11px] font-black uppercase tracking-widest text-[#202124] hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all">
          Visual Directory &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="space-y-4">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] border-b border-blue-50 pb-2 mb-4">
              {cat.name} ({cat.calculators.length})
            </h3>
            <ul className="grid grid-cols-1 gap-y-2">
              {cat.calculators.sort((a,b) => a.name.localeCompare(b.name)).map(calc => (
                <li key={calc.id}>
                  <Link 
                    href={calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`}
                    className="text-[13px] text-[#5F6368] hover:text-[#1A73E8] hover:underline transition-colors block py-0.5"
                  >
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
