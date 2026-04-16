import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { HomePageCalculatorClient } from './HomePageCalculatorClient';

export default function HomePage() {
  return (
    <>
      <JsonLd type="website" />
      <JsonLd type="organization" />
      
      <div className="min-h-screen bg-white font-sans antialiased text-[14px]">
        {/* 1. Interactive Command Center - Isolated Client Island */}
        <section className="pt-24 sm:pt-32 pb-4 sm:pb-8 border-b border-slate-100 bg-white relative overflow-hidden">
          <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-10 flex flex-col items-center">
            <div className="text-center mb-6 md:mb-8 relative z-10 w-full max-w-[800px]">
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tighter leading-tight">
                 Precision Financial <span className="text-blue-600 block sm:inline">Calculators</span>
               </h1>
               <p className="text-slate-500 text-base sm:text-lg font-medium tracking-tight mb-4">Access Nepal&apos;s most reliable suite of financial, tax, and professional utility calculators.</p>
            </div>
            
            <div className="w-full relative z-10">
              <HomePageCalculatorClient />
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* 2. Calculator Directory - High-Precision Server Component Rendering */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-6 pb-4 sm:pt-8 sm:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 border-b-2 border-slate-100 pb-5 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Calculator Directory</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Browse 75+ Professional Tools — 100% Mobile Optimized</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shrink-0 shadow-sm inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Verified Nepal Specific Data
            </span>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-8 space-y-12">
            {CATEGORIES.map(cat => (
              <section key={cat.id} className="break-inside-avoid">
                 <div className="flex flex-col gap-3 group mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-2xl group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:shadow-lg transition-all duration-300">
                      {cat.icon}
                    </div>
                    <Link href={`/calculator/category/${cat.id}`}>
                      <h3 className="text-[18px] font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight leading-tight">
                        {cat.name}
                      </h3>
                    </Link>
                 </div>

                 <nav>
                    <ul className="space-y-2.5">
                      {cat.calculators
                        .sort((a, b) => ((b.isHot ? 2 : 0) + (b.isNew ? 1 : 0)) - ((a.isHot ? 2 : 0) + (a.isNew ? 1 : 0)))
                        .slice(0, 10)
                        .map(calc => (
                          <li key={calc.id} className="flex items-center gap-2">
                            <Link
                              href={`/calculator/${calc.slug}`}
                              className="text-[14px] text-slate-700 hover:text-blue-600 font-semibold leading-snug flex-1 transition-colors duration-200 hover:underline underline-offset-2"
                            >
                              {calc.name}
                            </Link>
                            {calc.isHot && (
                              <span className="text-[9px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight shrink-0 shadow-sm shadow-orange-500/20">HOT</span>
                            )}
                            {!calc.isHot && calc.isNew && (
                              <span className="text-[9px] font-black bg-blue-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight shrink-0 shadow-sm shadow-blue-500/20">NEW</span>
                            )}
                          </li>
                        ))}
                      {cat.calculators.length > 10 && (
                        <li className="pt-3 border-t border-slate-100 mt-2">
                          <Link
                             href={`/calculator/category/${cat.id}`}
                             className="inline-flex items-center gap-1.5 mt-1 px-4 py-2 text-[12px] font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-xl transition-all w-max"
                          >
                             View all {cat.calculators.length} tools <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                          </Link>
                        </li>
                      )}
                    </ul>
                 </nav>
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
