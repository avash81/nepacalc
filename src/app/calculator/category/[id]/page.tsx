import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PhysicalCalculatorGuide } from '@/components/education/PhysicalCalculatorGuide';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = CATEGORIES.find(c => c.id === params.id);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} Calculators & Tools — NEPACALC`,
    description: `Official collection of ${category.calculators.length} professional tools for ${category.name.toLowerCase()}. Free high-precision institutional units.`,
  };
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = CATEGORIES.find(c => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <CalcWrapper
      title={category.name}
      description={`Official collection of ${category.calculators.length} professional tools designed for high-precision institutional requirements.`}
      crumbs={[{ label: 'Directory', href: '/directory' }, { label: category.name }]}
    >
      <div className="py-8">
        <header className="mb-16 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-sm border border-gray-100 dark:border-gray-800">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-4">{category.name}</h1>
              <div className="flex items-center gap-4">
                 <div className="h-1 w-12 bg-blue-600 rounded-full" />
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                   {category.calculators.length} PRO UNITS VERIFIED
                 </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.calculators.map((calc) => (
            <Link 
              key={calc.id} 
              href={`/calculator/${calc.slug}`}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {calc.icon}
                 </div>
                 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{calc.name}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold line-clamp-2">{calc.description}</p>
            </Link>
          ))}
        </div>

        {/* SEO Content Block */}
        <div className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-900">
           <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.4em] mb-8">Institutional Scope: {category.name}</h2>
           <div className="max-w-3xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
                Our {category.name} collection features {category.calculators.length} specialized tools designed specifically for high-accuracy requirements. 
                Every calculator in this category follows international standards and Nepal government regulations where applicable. 
                Latest fiscal mandates and regulatory updates are applied across all relevant financial and legal tools.
              </p>
           </div>
        </div>

        {/* PHYSICAL CALCULATOR GUIDE (Only for Education) */}
        {params.id === 'education' && <PhysicalCalculatorGuide />}
      </div>
    </CalcWrapper>
  );
}


export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    id: cat.id,
  }));
}
