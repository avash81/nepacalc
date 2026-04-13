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
      href={`/calculator/${calc.slug}`}
      className={`
        group flex items-start gap-4 px-5 py-6 bg-white
        border border-[#E5E7EB] hover:border-blue-300 hover:shadow-sm transition-all
        cursor-pointer text-left no-underline h-full
        ${calc.isNepal ? 'border-l-4 border-l-red-500' : ''}
      `}
    >
      <span className="text-3xl leading-none flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
        {calc.icon}
      </span>
      <div>
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="text-[15px] font-bold text-[#0000CC] tracking-tight group-hover:text-blue-600 transition-colors">
            {calc.name}
          </h3>
          {calc.isNepal && <NepalFlag />}
          {calc.isNew && (
            <span className="bg-[#1E3A8A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              NEW
            </span>
          )}
          {calc.isHot && (
            <span className="bg-[#1E3A8A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
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
