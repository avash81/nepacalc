'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Percent, TrendingUp, Search, Layers, ArrowRightLeft, Info, Calculator, Activity, Target } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

type CalcMode = 'what_is' | 'what_percent' | 'original' | 'change' | 'add_sub';

const MODES = [
  { id: 'what_is', label: 'X% of Y', icon: Percent },
  { id: 'what_percent', label: 'X is ?% of Y', icon: Search },
  { id: 'original', label: 'X is Y% of ?', icon: Layers },
  { id: 'add_sub', label: 'Value ± %', icon: ArrowRightLeft },
  { id: 'change', label: '% Change', icon: TrendingUp },
] as const;

export default function PercentageCalculator() {
  const [state, setState] = useSyncState('percentage_v4', {
    mode: 'what_is' as CalcMode,
    num: 20,
    den: 500,
    initial: 100,
    final: 120
  });
  const { mode, num, den, initial, final } = state;

  const updateState = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const calc = useMemo(() => {
    let result = '', label = '', raw = 0, error: string | null = null;
    switch (mode) {
      case 'what_is':   raw = (num / 100) * den; result = raw.toLocaleString(); label = `${num}% of ${den}`; break;
      case 'what_percent': if (!den) { error = 'Division by zero'; break; } raw = (num / den) * 100; result = `${raw.toFixed(2)}%`; label = `${num} is ${raw.toFixed(2)}% of ${den}`; break;
      case 'original':  if (!num) { error = 'Percentage cannot be zero'; break; } raw = den / (num / 100); result = raw.toLocaleString(); label = `${den} is ${num}% of ${raw.toFixed(2)}`; break;
      case 'change':    if (!initial) { error = 'Initial cannot be zero'; break; } raw = ((final - initial) / initial) * 100; result = `${raw >= 0 ? '+' : ''}${raw.toFixed(2)}%`; label = `${raw >= 0 ? 'Increase' : 'Decrease'} from ${initial} → ${final}`; break;
      case 'add_sub':   raw = den + (num / 100) * den; result = raw.toLocaleString(); label = `${den} + ${num}% = ${result}`; break;
    }
    return { result, label, raw, error };
  }, [mode, num, den, initial, final]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Percentage Calculator' }]}
      title="Percentage Calculator"
      description="Calculate percentages, growth rates, original values, and common math problems instantly with precision."
      icon={Percent}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Calculation Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button 
                  key={m.id} 
                  onClick={() => updateState({ mode: m.id as CalcMode })}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${mode === m.id ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}
                >
                  <m.icon className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mode === 'change' ? (
              <>
                <div className="space-y-2">
                  <label className={labelCls}>Initial Value</label>
                  <input type="number" value={initial} onChange={e => updateState({ initial: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Final Value</label>
                  <input type="number" value={final} onChange={e => updateState({ final: Number(e.target.value) })} className={inputCls} />
                </div>
              </>
            ) : mode === 'add_sub' ? (
              <>
                <div className="space-y-2">
                  <label className={labelCls}>Base Value</label>
                  <input type="number" value={den} onChange={e => updateState({ den: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Percentage (%)</label>
                  <input type="number" value={num} onChange={e => updateState({ num: Number(e.target.value) })} className={inputCls} />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className={labelCls}>{mode === 'original' ? 'Percentage (%)' : 'Number (X)'}</label>
                  <input type="number" value={num} onChange={e => updateState({ num: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>{mode === 'original' ? 'Result Value' : 'Total (Y)'}</label>
                  <input type="number" value={den} onChange={e => updateState({ den: Number(e.target.value) })} className={inputCls} />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Quick Percentages</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[5, 10, 13, 15, 20, 25].map(v => (
                <button key={v} onClick={() => updateState({ num: v })}
                  className="py-2 text-[11px] font-bold border border-[#DADCE0] bg-white hover:bg-[#E8F0FE] hover:text-[#1A73E8] transition-all rounded"
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Result
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {calc.error ? (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-center">
              <Info className="w-8 h-8 mx-auto mb-2 text-[#D93025]" />
              <p className="text-sm font-bold text-[#D93025]">{calc.error}</p>
            </div>
          ) : (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Result</div>
                <div className={`text-5xl font-black ${mode === 'change' && calc.raw >= 0 ? 'text-[#188038]' : mode === 'change' ? 'text-[#D93025]' : 'text-[#202124]'}`}>
                  {calc.result}
                </div>
                <div className="text-[11px] text-[#70757A] font-bold uppercase tracking-tight">{calc.label}</div>
              </div>

              {mode === 'add_sub' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
                    <div className="text-[9px] font-bold text-[#70757A] uppercase">Subtract (-{num}%)</div>
                    <div className="text-sm font-black text-[#D93025]">{(den * (1 - num / 100)).toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
                    <div className="text-[9px] font-bold text-[#70757A] uppercase">Add (+{num}%)</div>
                    <div className="text-sm font-black text-[#188038]">{(den * (1 + num / 100)).toLocaleString()}</div>
                  </div>
                </div>
              )}

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm p-4">
                 <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] font-bold text-[#70757A] uppercase">Visual Representation</span>
                   <Activity className="w-3 h-3 text-[#1A73E8]" />
                 </div>
                 <div className="h-4 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                   <div 
                     className={`h-full transition-all duration-700 ${mode === 'change' && calc.raw < 0 ? 'bg-[#D93025]' : 'bg-[#1A73E8]'}`} 
                     style={{ width: `${Math.min(Math.abs(calc.raw), 100)}%` }}
                   />
                 </div>
                 <p className="text-[9px] text-[#70757A] mt-2 italic text-center">Scale reflects {Math.abs(calc.raw).toFixed(1)}% intensity</p>
              </div>

              <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
                <Target className="w-4 h-4 text-[#188038] shrink-0" />
                <p className="text-[10px] text-[#202124] leading-tight">Instant calculation with high floating-point precision.</p>
              </div>
            </>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Select the mode that matches your math problem (e.g., 'X% of Y' for common percentages).",
          "Enter your numbers in the input fields provided.",
          "Use 'Quick Percentages' for common rates like 5%, 10%, or 13% (VAT).",
          "For Percentage Change, enter the initial and final values to see the increase/decrease.",
          "Review the final result and the visual scale display."
        ]
      }}
      formula={{
        title: "Percentage Formulas",
        description: "Standard algebraic formulas used for each calculation mode.",
        raw: "X% of Y: (X / 100) × Y\n% Change: ((Final - Initial) / Initial) × 100\nOriginal Value: Y / (X / 100)"
      }}
      faqs={[
        {
          question: "How do I calculate a discount?",
          answer: "Use the 'Value ± %' mode. Enter the original price as the Base Value and the discount percentage. The 'Subtract' result will be your discounted price."
        },
        {
          question: "What is percentage change?",
          answer: "Percentage change measures the relative difference between an old value and a new value, expressed as a percentage of the old value."
        }
      ]}
      sidebar={{
        title: "Math Toolkit",
        links: [
          { label: "Fraction Calculator", href: "/calculator/fraction-calculator" },
          { label: "Ratio & Proportion", href: "/calculator/ratio-proportion" },
          { label: "Scientific Calculator", href: "/calculator/scientific-calculator" },
          { label: "GPA Calculator", href: "/calculator/gpa" },
        ],
        banner: {
          title: "Master Your Numbers",
          description: "From simple math to complex engineering, our toolkit covers all your calculation needs.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Fraction Calc", href: "/calculator/fraction-calculator" },
        { label: "Ratio Tool", href: "/calculator/ratio-proportion" },
        { label: "Scientific Calc", href: "/calculator/scientific-calculator" }
      ]}
    />
  );
}
