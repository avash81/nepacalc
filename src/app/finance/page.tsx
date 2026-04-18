import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { ChevronRight, Star, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance & Tax Calculators — EMI, SIP, CAGR, FD | NEPACALC',
  description: 'Free finance calculators: Loan EMI, SIP Investment, Compound Interest, CAGR, Fixed Deposit, Currency Converter and more. Professional-grade tools for Nepali investors.',
  keywords: ['emi calculator nepal', 'sip calculator', 'loan calculator', 'compound interest calculator', 'fd calculator nepal'],
  alternates: { canonical: 'https://nepacalc.com/finance' },
};

export default function FinancePillarPage() {
  const category = CATEGORIES.find(c => c.id === 'finance')!;
  return (
    <CalcWrapper
      title="Finance & Tax"
      description={`${category.calculators.length} professional finance and banking calculators for investment planning and loan management.`}
      crumbs={[{ label: 'Finance & Tax Tools' }]}
    >
      <div className="py-8">
        <header className="mb-16 max-w-3xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl shadow-sm border border-gray-100">💰</div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3">Finance & Tax</h1>
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{category.calculators.length} Professional Tools</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">Calculate EMIs, plan investments, compare interest rates and project wealth growth with precision-engineered financial tools.</p>
        </header>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6"><Flame className="w-4 h-4 text-orange-500" /><h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Most Popular</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.calculators.filter(c => c.isHot).map(calc => (
              <Link key={calc.id} href={`/calculator/${calc.slug}`} className="group bg-white border border-orange-100 rounded-[2rem] p-6 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 transition-all relative overflow-hidden">
                <div className="absolute top-3 right-3"><span className="text-[8px] font-black uppercase tracking-widest bg-orange-500 text-white px-2 py-1 rounded-full">HOT</span></div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform mb-4">{calc.icon}</div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-orange-600 transition-colors">{calc.name}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {category.calculators.map(calc => (
            <Link key={calc.id} href={`/calculator/${calc.slug}`} className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-slate-900 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{calc.icon}</div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-slate-900 transform group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-slate-900 transition-colors">{calc.name}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium line-clamp-2">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </CalcWrapper>
  );
}
