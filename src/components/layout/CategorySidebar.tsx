'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/data/calculators';

const PILLAR_LINKS: Record<string, string> = {
  market: '/market-rates',
  nepal: '/nepal',
  finance: '/finance',
  health: '/health',
  utility: '/converters',
  education: '/math-tools',
  engineering: '/engineering'
};

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-10 no-print">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="space-y-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#202124] border-b border-[#dadce0] pb-2">
            <Link href={PILLAR_LINKS[cat.id] || '/'} className="hover:text-blue-600 transition-colors">
              {cat.name}
            </Link>
          </h3>
          <ul className="space-y-2">
            {cat.calculators.slice(0, 4).map((calc) => {
              const calcPath = calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`;
              const isActive = pathname === calcPath;
              return (
                <li key={calc.id}>
                  <Link 
                    href={calcPath}
                    className={`text-[13px] font-semibold block transition-colors ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-[#5f6368] hover:text-blue-600 hover:underline'
                    }`}
                  >
                    {calc.name}
                  </Link>
                </li>
              );
            })}
            {cat.calculators.length > 4 && (
               <li>
                 <Link 
                   href={PILLAR_LINKS[cat.id] || '/'}
                   className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline mt-2 inline-block"
                 >
                   View All {cat.name} &rarr;
                 </Link>
               </li>
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}
