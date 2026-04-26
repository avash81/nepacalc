'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Calculator, TrendingUp } from 'lucide-react';

// Heavy bundles: only load AFTER user clicks "Launch Calculator"
const AllInOneCalculator = dynamic(() => import('@/components/calculator/AllInOneCalculator'), { ssr: false });
const AdvancedCalculator  = dynamic(() => import('@/components/calculator/AdvancedCalculator'),  { ssr: false });
const CustomGrapher       = dynamic(() => import('@/components/calculator/CustomGrapher'),        { ssr: false });

const PURPLE = '#5b5ea6';

// Lightweight placeholder shown BEFORE user interaction — zero JS cost
function CalcPlaceholder({ onActivate }: { onActivate: () => void }) {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-3">
      <div
        className="w-full h-[420px] lg:h-[560px] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-6 cursor-pointer group hover:border-blue-300 hover:shadow-md transition-all duration-300"
        onClick={onActivate}
        role="button"
        aria-label="Launch Calculator"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5b5ea6] to-[#3b3e8a] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <Calculator className="w-10 h-10 text-white" />
        </div>
        <div className="text-center space-y-2 px-4">
          <p className="text-lg font-black text-[#202124] tracking-tight">Scientific & Graphing Calculator</p>
          <p className="text-sm text-slate-500 font-medium">Click to launch — Deg/Rad · Trig · Graphing Engine</p>
        </div>
        <button
          className="px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-100"
          style={{ background: PURPLE }}
        >
          Launch Calculator
        </button>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>80+ Tools</span>
          <span>•</span>
          <span>Free Forever</span>
          <span>•</span>
          <span>No Ads</span>
        </div>
      </div>
    </div>
  );
}

export function HomePageCalculatorClient() {
  const [activated,   setActivated]   = useState(false);
  const [expression,  setExpression]  = useState('');
  const [calcStyle,   setCalcStyle]   = useState<'google' | 'advanced'>('google');
  const calcRef = useRef<HTMLDivElement>(null);
  const [calcH,  setCalcH]  = useState<number | undefined>(undefined);

  // Mirror calculator height → graph height
  useEffect(() => {
    if (!calcRef.current || !activated) return;
    const obs = new ResizeObserver(entries => setCalcH(entries[0].contentRect.height));
    obs.observe(calcRef.current);
    return () => obs.disconnect();
  }, [activated, calcStyle]);

  // Show placeholder until user clicks
  if (!activated) {
    return <CalcPlaceholder onActivate={() => setActivated(true)} />;
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-3">

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
