import Link from 'next/link';
import { NepalFlag } from '@/components/ui/NepalFlag';
import { Calculator } from '@/data/calculators';

interface Props {
  calc: Calculator;
  compact?: boolean;
}

export function CalculatorCard({ calc, compact = false }: Props) {
  return (
    <Link
      href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
      className={`
        group flex items-start gap-4 px-4 py-4 bg-white
        border border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:shadow-md transition-all
        cursor-pointer text-left no-underline h-full
        ${calc.isNepal ? 'border-l-4 border-l-red-500' : ''}
      `}
    >
      <span className="text-3xl leading-none flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
        {calc.icon}
      </span>
      <div>
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="text-[15px] font-bold text-[var(--primary)] tracking-tight group-hover:underline decoration-2 transition-colors">
            {calc.name}
          </h3>
          {calc.isNepal && <NepalFlag />}
          {calc.isNew && (
            <span className="bg-[#1A73E8] text-[#202124] text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
              NEW
            </span>
          )}
          {calc.isHot && (
            <span className="bg-[#D93025] text-[#202124] text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
              HOT
            </span>
          )}
        </div>
        {!compact && (
          <p className="text-[13px] text-gray-500 leading-snug">
            {calc.description}
          </p>
        )}
      </div>
    </Link>
  );
}

