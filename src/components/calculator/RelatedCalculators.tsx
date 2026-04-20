import Link from 'next/link';
import { CALCULATORS, Calculator as CalculatorType } from '@/data/calculators';
import { 
  Calculator, 
  Scale, 
  Ruler, 
  Banknote, 
  Clock, 
  PercentSquare, 
  TrendingUp, 
  Landmark, 
  Activity, 
  Building2, 
  Globe, 
  Binary, 
  GraduationCap, 
  BookOpen, 
  HeartPulse,
  Trees,
  Zap,
  BookMarked
} from 'lucide-react';

interface Props {
  currentSlug: string;
  category: string;
}

const getIconForSlug = (slug: string, category: string) => {
  const s = slug.toLowerCase();
  
  // Health
  if (s.includes('bmi') || s.includes('fat') || s.includes('weight')) return <Activity className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('calorie') || s.includes('water') || s.includes('sleep')) return <HeartPulse className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  
  // Finance & Tax
  if (s.includes('tax') || s.includes('vat')) return <Landmark className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('emi') || s.includes('loan') || s.includes('mortgage')) return <Building2 className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('currency') || s.includes('remittance') || s.includes('salary') || s.includes('finance')) return <Banknote className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('sip') || s.includes('compound') || s.includes('cagr') || s.includes('nepse') || s.includes('stock')) return <TrendingUp className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  
  // Education
  if (s.includes('gpa') || s.includes('cgpa')) return <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('attendance') || s.includes('marks')) return <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('physics') || s.includes('chemistry') || s.includes('science')) return <Zap className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('fraction') || s.includes('percentage') || s.includes('ratio') || s.includes('math')) return <PercentSquare className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  
  // Converters & Utility
  if (s.includes('length') || s.includes('area') || s.includes('land') || s.includes('distance')) return <Ruler className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('mass')) return <Scale className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('date') || s.includes('age') || s.includes('time')) return <Clock className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('base') || s.includes('binary') || s.includes('hex')) return <Binary className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (s.includes('unit') || s.includes('convert')) return <Globe className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  
  // Generic Fallbacks by Category
  if (category === 'nepal') return <Trees className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (category === 'finance') return <Landmark className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (category === 'education') return <BookMarked className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  if (category === 'utility') return <Globe className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
  
  return <Calculator className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />;
}

export default function RelatedCalculators({ currentSlug, category }: Props) {
  const related = CALCULATORS.filter(
    (c) => c.category === category && c.slug !== currentSlug
  )
    .sort((a, b) => {
      if (a.isHot && !b.isHot) return -1;
      if (!a.isHot && b.isHot) return 1;
      return 0;
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200/60">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            <span className="text-blue-600">Related</span> Professional Tools
          </h2>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Discover more verified Nepal calculators</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {related.map((calc) => (
          <Link
            key={calc.id}
            href={`/calculator/${calc.slug}`}
            className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 shadow-sm">
                {calc.icon ? calc.icon : getIconForSlug(calc.slug, calc.category)}
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-[12px] tracking-tight">
                  {calc.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {calc.description || `Professional ${calc.name} utility.`}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
