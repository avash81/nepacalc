'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Calculator as CalcIcon, Zap, ShieldCheck, Binary, Info } from 'lucide-react';

export default function LogarithmCalculator() {
  const [state, setState] = useSyncState('log_calc_v3', { base: 10, number: 100 });
  const { base, number } = state;
  const updateState = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    if (number <= 0 || base <= 0 || base === 1) return null;
    return { 
      logB: Math.log(number) / Math.log(base),
      log10: Math.log10(number),
      ln: Math.log(number),
      log2: Math.log2(number)
    };
  }, [base, number]);

  const QUICK_BASES = [
    { label: 'log₁₀ (Common)', base: 10 },
    { label: 'ln (Natural, e)', base: Math.E },
    { label: 'log₂ (Binary)',  base: 2 },
    { label: 'log₁₆ (Hex)',    base: 16 },
  ];

  return (
    <ModernCalcLayout
      slug="logarithm-calculator"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Logarithm Calculator' }]}
      title="Institutional Logarithm"
      description="Calculate common (log10), natural (ln), and binary (log2) logarithms with precision."
      icon={CalcIcon}
      inputs={
        <div className="space-y-6">
          <div className="p-8 bg-white border border-[#DADCE0] rounded-3xl flex items-center justify-center gap-4 shadow-xl">
            <span className="text-4xl font-black text-[#5F6368]">log</span>
            <div className="flex flex-col mt-6">
              <input type="number" value={base} onChange={e => updateState({ base: Number(e.target.value) })}
                className="w-20 h-10 text-center border border-[#DADCE0] rounded-xl bg-[#F8F9FA] font-mono text-sm font-black focus:border-[#1A73E8] outline-none" />
              <div className="text-[8px] font-black text-[#70757A] uppercase mt-1 text-center">Base</div>
            </div>
            <span className="text-4xl font-light text-[#DADCE0]">(</span>
            <div className="flex flex-col">
              <input type="number" value={number} onChange={e => updateState({ number: Number(e.target.value) })}
                className="w-32 h-16 text-center border-2 border-[#DADCE0] rounded-2xl bg-white font-mono text-3xl font-black focus:border-[#1A73E8] outline-none shadow-sm" />
              <div className="text-[8px] font-black text-[#70757A] uppercase mt-1 text-center">Number</div>
            </div>
            <span className="text-4xl font-light text-[#DADCE0]">)</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {QUICK_BASES.map(({ label, base: b }) => (
              <button key={label} onClick={() => updateState({ base: b })}
                className={`p-4 border rounded-2xl text-center transition-all ${base === b ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-lg' : 'bg-white hover:bg-[#F8F9FA]'}`}>
                <div className="text-[10px] font-black uppercase">{label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {results ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-3xl overflow-hidden text-center shadow-2xl">
                <div className="p-10">
                   <div className="text-[10px] font-black uppercase text-[#70757A] mb-4">Result (base {base.toFixed(2)})</div>
                   <div className="text-6xl font-black text-[#1A73E8] tracking-tighter font-mono">{results.logB.toFixed(6).replace(/\.?0+$/, '')}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {[
                    { l: 'log₁₀', v: results.log10 },
                    { l: 'ln', v: results.ln },
                    { l: 'log₂', v: results.log2 },
                 ].map(o => (
                    <div key={o.l} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                        <div className="text-[9px] font-black uppercase text-slate-500 mb-1">{o.l}</div>
                        <div className="text-sm font-black font-mono">{o.v.toFixed(4)}</div>
                    </div>
                 ))}
              </div>
            </>
          ) : (
             <div className="p-10 bg-[#FCE8E6] border border-[#FAD2CF] rounded-3xl text-center">
                <p className="text-sm font-bold text-[#D93025]">Domain Violation: Base must be {'>'} 0 and ≠ 1. Number must be {'>'} 0.</p>
             </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Logarithm Engine</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Calibrated for professional STEM benchmarks.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Scientific Calc", href: "/calculator/scientific-calculator" },
        { label: "Quadratic Solver", href: "/calculator/quadratic-solver" }
      ]}
    />
  );
}
