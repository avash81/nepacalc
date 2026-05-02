import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { InstitutionalBlock } from '@/components/layout/InstitutionalBlock';
import { HomeHero } from './HomeHero';
import { RecentCalculators } from '@/components/layout/RecentCalculators';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Calculator NepaCalc Nepal',
  description:
    'Use free online calculators for math finance health conversions and more. Nepals best calculator site with 100 plus tools. Try NepaCalc now',
  keywords: [
    'online calculator', 'scientific calculator', 'graphing calculator',
    'maths solver', 'algebra solver', 'trigonometry calculator',
    'calculus calculator', 'nepal income tax calculator', 'EMI calculator',
    'GPA calculator', 'free online calculator', 'NepaCalc',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/',
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NepaCalc',
  url: 'https://nepacalc.com',
  logo: 'https://nepacalc.com/logo.png',
};

export default function HomePage() {
  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([organizationSchema]) 
        }} 
      />
      
      <div className="min-h-screen bg-[#F1F3F4]">
        <section className="pt-1 pb-8 border-b border-[#dadce0] bg-[#F1F3F4]">
          <div className="hp-container">
            <div className="mb-4 max-w-6xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight mb-2 leading-[1.1]">
                Free Online <span className="text-blue-600">Calculator</span> for Nepal.
              </h1>
              <p className="text-[13px] sm:text-sm text-slate-600 font-normal leading-relaxed max-w-4xl">
                Easy-to-use tools for tax, finance, health, and math. 80+ calculators for your daily needs.
              </p>
            </div>

            <HomeHero />
          </div>
        </section>
        
        <main className="hp-container py-6">
          <RecentCalculators />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {CATEGORIES.filter(c => c.id !== 'market').map(cat => (
              <div key={cat.id} className="bg-white p-4 border border-[#dadce0] rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col h-full min-h-[340px]">
                <Link href={cat.id === 'education' ? '/math-tools/' : cat.id === 'utility' ? '/converters/' : `/${cat.id}/`} className="block pb-2 mb-3">
                  <h2 className={`${cat.id === 'engineering' ? 'text-[#4361ee]' : 'text-[#1a73e8]'} text-[11px] font-black uppercase tracking-wider border-b border-[#f1f3f4] pb-2 hover:underline`}>
                    {cat.name}
                  </h2>
                </Link>
                <ul className="flex-grow">
                  {cat.calculators.slice(0, 8).map(calc => {
                    const href = calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`;
                    return (
                      <li key={calc.id}>
                        <Link 
                           href={href} 
                           className="text-[13px] text-[#3c4043] hover:text-[#1a73e8] hover:underline truncate flex items-center justify-between py-1.5 group"
                        >
                           <span className="truncate">{calc.name}</span>
                           {calc.isNew && (
                             <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[8px] font-black rounded uppercase tracking-tighter shrink-0">New</span>
                           )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 pt-2 border-t border-[#f1f3f4]">
                  <Link href={cat.id === 'education' ? '/math-tools/' : cat.id === 'utility' ? '/converters/' : `/${cat.id}/`} className="text-[9px] font-bold text-[#1a73e8] hover:underline uppercase tracking-widest flex items-center gap-1">
                    View All &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
             <InstitutionalBlock />
          </div>
        </main>
      </div>
    </>
  );
}
