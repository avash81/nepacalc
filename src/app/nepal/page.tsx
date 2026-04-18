import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepal Specific Calculators — Free Tax, EMI, NEPSE, SEE GPA Tools | NEPACALC',
  description: 'All 23 official Nepal-specific calculators: Income Tax 2082/83, Loan EMI, NEPSE WACC, SEE GPA, Vehicle Tax, Remittance, Gold Price, and more. Free, accurate, institutional-grade.',
  keywords: ['nepal calculator', 'income tax calculator nepal', 'nepse calculator', 'see gpa calculator', 'nepal specific tools', 'tds calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/nepal' },
  openGraph: {
    title: 'Nepal Specific Calculators — NEPACALC',
    description: 'The most complete suite of Nepal financial, legal, and educational calculators. 23 tools updated for FY 2082/83.',
    url: 'https://nepacalc.com/nepal',
  }
};

export default function NepalPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'nepal')!;

  return (
    <CalcWrapper
      title="🇳🇵 Nepal Specific"
      description={`Official suite of ${category.calculators.length} institutional-grade calculators for Nepal. Updated for FY 2082/83.`}
      crumbs={[{ label: 'Nepal Specific Tools' }]}
    >
      <div className="py-8">
        <header className="mb-16 max-w-3xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl shadow-sm border border-gray-100">
              🇳🇵
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3">Nepal Calculators</h1>
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  {category.calculators.length} Tools · FY 2082/83 Updated
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
            The most comprehensive Nepal-specific financial, legal, and educational calculator suite. Every tool is verified against official Nepal Rastra Bank (NRB), IRD, and regulatory guidelines.
          </p>
        </header>

        {/* Hot Tools Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-4 h-4 text-orange-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Most Used Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.calculators.filter(c => c.isHot).map(calc => (
              <Link
                key={calc.id}
                href={`/calculator/${calc.slug}`}
                className="group bg-white border border-orange-100 rounded-[2rem] p-6 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] font-black uppercase tracking-widest bg-orange-500 text-white px-2 py-1 rounded-full">HOT</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {calc.icon}
                  </div>
                </div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-orange-600 transition-colors">{calc.name}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* New Tools Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-4 h-4 text-blue-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">New Additions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.calculators.filter(c => c.isNew && !c.isHot).map(calc => (
              <Link
                key={calc.id}
                href={`/calculator/${calc.slug}`}
                className="group bg-white border border-blue-50 rounded-[2rem] p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] font-black uppercase tracking-widest bg-blue-500 text-white px-2 py-1 rounded-full">NEW</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {calc.icon}
                  </div>
                </div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-blue-600 transition-colors">{calc.name}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* All Tools Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">All Nepal Calculators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.calculators.map(calc => (
              <Link
                key={calc.id}
                href={`/calculator/${calc.slug}`}
                className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-slate-900 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {calc.icon}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-slate-900 transform group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-slate-900 transition-colors">{calc.name}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">{calc.description}</p>
                {(calc.isHot || calc.isNew) && (
                  <div className="mt-3 flex gap-1.5">
                    {calc.isHot && <span className="text-[8px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase">Hot</span>}
                    {calc.isNew && <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">New</span>}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Block */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em] mb-6">Institutional Authority: Nepal Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div>
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">NRB Compliant</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">All rates and formulas verified against Nepal Rastra Bank circulars and the latest IRD fiscal year mandates.</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Live Data</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">The Remittance and Gold calculators pull real-time rates from the NRB forex API and global gold markets.</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Zero Ads</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">No popup ads. No paywalls. Every tool is completely free and runs entirely in your browser for complete privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </CalcWrapper>
  );
}
