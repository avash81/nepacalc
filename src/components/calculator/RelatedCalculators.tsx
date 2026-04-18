import Link from 'next/link';
import { CALCULATORS, Calculator } from '@/data/calculators';

interface Props {
  currentSlug: string;
  category: string;
}

export default function RelatedCalculators({ currentSlug, category }: Props) {
  // Find other calculators in the same category, excluding the current one
  // Prioritize markers like isHot or isNew for the shuffle
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
    <section className="mt-12 border-t border-slate-800 pt-10">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-blue-500">Related</span> Professional Tools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((calc) => (
          <Link
            key={calc.id}
            href={`/calculator/${calc.slug}`}
            className="group p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {typeof calc.icon === 'string' ? calc.icon : '🧮'}
              </span>
              <div>
                <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {calc.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {calc.description}
                </p>
              </div>
            </div>
            <div className="text-slate-600 group-hover:text-blue-400 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
