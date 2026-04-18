import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { ChevronRight, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators — BMI, BMR, Calories, Body Fat | NEPACALC',
  description: 'Free health calculators: BMI, BMR, Body Fat %, Daily Calories, Ideal Weight, Water Intake, Pregnancy Due Date, and more. Based on WHO standards.',
  keywords: ['bmi calculator nepal', 'bmr calculator', 'body fat calculator', 'calorie calculator', 'health tools nepal'],
  alternates: { canonical: 'https://nepacalc.com/health' },
};

export default function HealthPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'health')!;
  return (
    <CalcWrapper
      title="Health & Fitness"
      description={`${category.calculators.length} WHO-standard health and fitness calculators for body analysis and wellness planning.`}
      crumbs={[{ label: 'Health & Fitness Tools' }]}
    >
      <div className="py-8">
        <header className="mb-16 max-w-3xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl shadow-sm border border-gray-100">❤️</div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3">Health & Fitness</h1>
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-red-500 rounded-full" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{category.calculators.length} Wellness Tools</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">Professional health assessment tools based on WHO guidelines. Calculate BMI, BMR, body composition, calorie needs and more.</p>
        </header>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6"><Flame className="w-4 h-4 text-orange-500" /><h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Most Popular</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.calculators.filter(c => c.isHot).map(calc => (
              <Link key={calc.id} href={`/calculator/${calc.slug}`} className="group bg-white border border-red-100 rounded-[2rem] p-6 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/5 transition-all relative overflow-hidden">
                <div className="absolute top-3 right-3"><span className="text-[8px] font-black uppercase tracking-widest bg-red-500 text-white px-2 py-1 rounded-full">HOT</span></div>
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform mb-4">{calc.icon}</div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1.5 group-hover:text-red-600 transition-colors">{calc.name}</h3>
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
