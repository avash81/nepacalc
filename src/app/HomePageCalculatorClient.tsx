'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const LoadingSkeleton = () => (
  <div className="h-[600px] w-full bg-white border border-slate-200 rounded-[1.5rem] shadow-sm animate-pulse flex items-center justify-center">
     <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const AllInOneCalculator = dynamic(() => import('@/components/calculator/AllInOneCalculator'), { ssr: false, loading: LoadingSkeleton });
const AdvancedCalculator  = dynamic(() => import('@/components/calculator/AdvancedCalculator'), { ssr: false, loading: LoadingSkeleton });
const CustomGrapher       = dynamic(() => import('@/components/calculator/CustomGrapher'), { ssr: false, loading: () => <div className="h-full w-full bg-slate-50 animate-pulse" /> });

const PURPLE = '#5b5ea6';

export function HomePageCalculatorClient() {
  const [mounted,     setMounted]     = useState(false);
  const [expression,  setExpression]  = useState('');
  const [calcStyle,   setCalcStyle]   = useState<'google' | 'advanced'>('google');
  const calcRef = useRef<HTMLDivElement>(null);
  const [calcH,  setCalcH]  = useState<number | undefined>(undefined);

  useEffect(() => setMounted(true), []);

  /* Mirror calculator height → graph height */
  useEffect(() => {
    if (!calcRef.current) return;
    const obs = new ResizeObserver(entries => setCalcH(entries[0].contentRect.height));
    obs.observe(calcRef.current);
    return () => obs.disconnect();
  }, [mounted, calcStyle]);

  /* Removed mounted check to allow layout SSR */

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-3">

      {/* ── Style toggle ──────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 py-1">
        <p className="text-[12px] text-slate-600 font-medium mr-1">Calculator style:</p>
        {[
          { id: 'google',   label: '🔵 Scientific Calculator' },
          { id: 'advanced', label: '🟣 Advanced Graphing' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => { setCalcStyle(opt.id as 'google' | 'advanced'); setExpression(''); }}
            className="px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all"
            style={{
              background:   calcStyle === opt.id ? PURPLE     : '#F1F3F4',
              color:        calcStyle === opt.id ? '#ffffff'   : '#5f6368',
              border:       calcStyle === opt.id ? `1px solid ${PURPLE}` : '1px solid #DADCE0',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Calculator + Graph side-by-side ───────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Calculator — drives the height */}
        <div ref={calcRef} className="w-full lg:w-[46%] shrink-0">
          {calcStyle === 'google'
            ? <AllInOneCalculator onExpressionChange={setExpression} />
            : <AdvancedCalculator  onExpressionChange={setExpression} />
          }
        </div>

        {/* Graph — mirrors calculator height */}
        <div
          className="w-full lg:flex-1"
          style={{ height: calcH ? `${calcH}px` : '580px' }}
        >
          <CustomGrapher expression={expression} />
        </div>
      </div>
    </div>
  );
}
