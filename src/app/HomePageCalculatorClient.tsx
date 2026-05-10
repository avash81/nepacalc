import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const AllInOneCalculator = dynamic(() => import('@/components/calculator/AllInOneCalculator'), { ssr: false });
const AdvancedCalculator  = dynamic(() => import('@/components/calculator/AdvancedCalculator'),  { ssr: false });
const CustomGrapher       = dynamic(() => import('@/components/calculator/CustomGrapher'),        { ssr: false });

const PURPLE = '#5b5ea6';

export default function HomePageCalculatorClient() {
  const [expression,  setExpression]  = useState('');
  const [calcStyle,   setCalcStyle]   = useState<'google' | 'advanced'>('google');
  const calcRef = useRef<HTMLDivElement>(null);
  const [calcH,  setCalcH]  = useState<number | undefined>(undefined);

  // Mirror calculator height → graph height
  useEffect(() => {
    if (!calcRef.current) return;
    const obs = new ResizeObserver(entries => setCalcH(entries[0].contentRect.height));
    obs.observe(calcRef.current);
    return () => obs.disconnect();
  }, [calcStyle]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-3 animate-fade-in">

      {/* Style toggle */}
      <div className="flex items-center justify-center gap-2 py-1">
        <p className="text-[12px] text-slate-600 font-medium mr-1">Calculator mode:</p>
        {[
          { id: 'google',   label: 'Scientific' },
          { id: 'advanced', label: 'Graphing' },
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

      {/* Calculator + Graph side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div ref={calcRef} className="w-full lg:w-[46%] shrink-0">
          {calcStyle === 'google'
            ? <AllInOneCalculator onExpressionChange={setExpression} />
            : <AdvancedCalculator  onExpressionChange={setExpression} />
          }
        </div>
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

