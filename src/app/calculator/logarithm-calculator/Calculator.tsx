'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Calculator as CalcIcon, AlertTriangle, Lightbulb } from 'lucide-react';

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
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Logarithm Calculator' }]}
      title="Logarithm Calculator"
      description="Calculate the logarithm of any number with any base. Easily compute log10, natural log (ln), log2, and custom bases using the mathematical change-of-base rule."
      icon={CalcIcon}
      inputs={
        <div className="space-y-6">
          <div className="p-8 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg flex items-center justify-center gap-4 relative shadow-inner">
            <span className="text-4xl font-black text-[#5F6368] tracking-tighter">log</span>
            
            <div className="flex flex-col mt-6">
              <input type="number" value={base} onChange={e => updateState({ base: Number(e.target.value) })} min={0.001} step={0.1}
                className="w-20 h-10 text-center border border-[#DADCE0] rounded bg-white font-mono text-sm font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none shadow-sm text-[#1A73E8]" />
              <div className="text-[9px] font-bold text-[#70757A] uppercase mt-1 text-center tracking-wider">Base</div>
            </div>

            <span className="text-4xl font-light text-[#DADCE0]">(</span>
            
            <div className="flex flex-col -mt-2">
              <input type="number" value={number} onChange={e => updateState({ number: Number(e.target.value) })} min={0.001}
                className="w-32 h-14 text-center border-2 border-[#DADCE0] rounded bg-white font-mono text-xl font-black focus:border-[#1A73E8] outline-none shadow-sm text-[#202124]" />
              <div className="text-[9px] font-bold text-[#70757A] uppercase mt-1 text-center tracking-wider">Number</div>
            </div>

            <span className="text-4xl font-light text-[#DADCE0]">)</span>
            <span className="text-4xl font-black text-[#5F6368] ml-2">=</span>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_BASES.map(({ label, base: b }) => (
                <button key={label} onClick={() => updateState({ base: b })}
                  className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-left flex justify-between items-center transition-all group">
                  <span className="text-[11px] font-bold text-[#202124]">{label}</span>
                  <span className="text-[10px] font-black font-mono text-[#1A73E8] group-hover:underline bg-[#E8F0FE] px-2 py-0.5 rounded">{b === Math.E ? 'e ≈ 2.718' : b}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {results ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden text-center shadow-sm">
                <div className="p-6 bg-[#F8F9FA] border-b border-[#DADCE0]">
                   <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Custom Base Result</div>
                </div>
                <div className="p-8">
                   <div className="text-xs font-bold uppercase text-[#70757A] mb-3 font-mono">log<sub>{base === Math.E ? 'e' : base}</sub>({number})</div>
                   <div className="text-5xl font-black text-[#1A73E8] tracking-tighter font-mono break-all">{results.logB.toFixed(6).replace(/\.?0+$/, '')}</div>
                </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
                 <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                    <span className="text-[10px] font-bold text-[#70757A] uppercase">Standard Computations</span>
                 </div>
                 <div className="divide-y divide-[#DADCE0]">
                    {[
                      { label: 'log₁₀ (Common Logarithm)', val: results.log10 },
                      { label: 'ln (Natural Logarithm)',   val: results.ln    },
                      { label: 'log₂ (Binary Logarithm)',  val: results.log2  },
                    ].map(({ label, val }) => (
                      <div key={label} className="p-4 flex justify-between items-center text-xs hover:bg-[#F8F9FA] transition-colors">
                         <span className="text-[#5F6368] font-bold tracking-wider">{label}</span>
                         <span className="font-black text-[#202124] font-mono">{val.toFixed(6).replace(/\.?0+$/, '')}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
                 <Lightbulb className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
                 <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-1">Change of Base Formula</h5>
                    <code className="text-[11px] font-mono text-[#202124] font-bold">log_b(x) = ln(x) / ln(b)</code>
                 </div>
              </div>
            </>
          ) : (
             <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg flex items-start gap-3 text-[#D93025]">
               <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
               <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">Domain Error</h4>
                  <p className="text-xs font-medium">Logarithms are only defined for strictly positive real numbers. The base must be greater than 0 and cannot equal 1.</p>
               </div>
            </div>
          )}
        </div>
      }
      howToUse={{ steps: ["Enter the numerical base (the small subscript number). For common log, use 10.", "Enter the argument number (the main number in the parentheses).", "The tool instantly computes the log value up to 6 decimal places of precision.", "View the standard log10, ln, and log2 conversions automatically provided below."] }}
      formula={{ title: "Logarithm Definition", description: "Inverse of exponentiation.", raw: "If b^y = x, then log_b(x) = y\n\nConditions:\nx > 0 (Number must be positive)\nb > 0 and b ≠ 1 (Base must be positive and not 1)" }}
      faqs={[
        { question: "What is the Natural Log (ln)?", answer: "The natural logarithm uses the mathematical constant 'e' (approx. 2.718) as its base. It is widely used in calculus and compound interest calculations." },
        { question: "Why can't the base be 1?", answer: "Because 1 raised to any power is always 1. You can never solve the equation 1^y = x unless x is also 1, making it a mathematically useless base for logarithms." }
      ]}
      sidebar={{ title: "Advanced Math", links: [{ label: "Linear Solver", href: "/calculator/linear-solver" }, { label: "Quadratic Formula", href: "/calculator/quadratic-formula" }], banner: { title: "Exponential Growth", description: "Logarithms help scientists scale down massive numbers, like earthquake magnitudes.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Linear Solver", href: "/calculator/linear-solver" }]}
    />
  );
}
