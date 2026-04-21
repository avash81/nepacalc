'use client';

import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { LayoutGrid, ArrowRight, ShieldCheck, Globe, BrainCircuit } from 'lucide-react';

export default function DirectoryClient() {
  return (
    <CalcWrapper
      title="Tool Directory"
      description="The official index of NEPACALC's high-precision mathematical units and institutional tools."
      crumbs={[{ label: 'Directory' }]}
    >
      <div className="py-8 pb-12">
        {/* ── INSTITUTIONAL MASONRY GRID ────────────────────────── */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 text-slate-800 dark:text-slate-100">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="break-inside-avoid bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-2xl font-black">
                  {cat.id === 'nepal' ? (
                    <span className="text-[12px] font-black text-blue-600 dark:text-blue-400 tracking-tighter">NP</span>
                  ) : (
                    cat.icon
                  )}
                </div>
                <div>
                  <h2 className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-wider leading-tight">{cat.name}</h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">{cat.calculators.length} PRO UNITS</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {cat.calculators.map(calc => (
                  <Link 
                    key={calc.id} 
                    href={`/calculator/${calc.slug}`}
                    className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg grayscale group-hover:grayscale-0 transition-opacity opacity-40 group-hover:opacity-100">{calc.icon}</span>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calc.name}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CalcWrapper>
  );
}
