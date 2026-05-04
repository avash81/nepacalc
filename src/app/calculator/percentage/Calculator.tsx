'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Percent, TrendingUp, Search, Layers, ArrowRightLeft, Info, Calculator, Activity, Target, Landmark, GraduationCap, History, Globe } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type CalcMode = 'what_is' | 'what_percent' | 'original' | 'change' | 'add_sub';

const MODES = [
  { id: 'what_is', label: 'X% of Y', icon: Percent },
  { id: 'what_percent', label: 'X is ?% of Y', icon: Search },
  { id: 'original', label: 'X is Y% of ?', icon: Layers },
  { id: 'add_sub', label: 'Value ± %', icon: ArrowRightLeft },
  { id: 'change', label: '% Change', icon: TrendingUp },
] as const;

export default function PercentageCalculator() {
  const [state, setState] = useSyncState('percentage_v5', {
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

  const chartData = useMemo(() => {
    if (mode === 'what_is') return [{ name: 'Part', value: (num / 100) * den }, { name: 'Remaining', value: den - (num / 100) * den }];
    if (mode === 'what_percent') return [{ name: 'Subject (X)', value: num }, { name: 'Rest', value: Math.max(0, den - num) }];
    return [];
  }, [mode, num, den]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="percentage"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Math Tools', href: '/math-tools/' }, { label: 'Percentage' }]}
      title="Institutional Percentage"
      description="The definitive resource for proportional mathematics. Calculate percentages, growth rates, original values, and VAT adjustments with academic precision for SEE, NEB, and Nepalese financial standards."
      icon={Percent}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Percent className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Computational Methodology</label>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                     {MODES.map((m) => (
                       <button 
                         key={m.id} 
                         onClick={() => updateState({ mode: m.id as CalcMode })}
                         className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all text-center ${mode === m.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                       >
                         <m.icon className="w-4 h-4" />
                         <span className="text-[9px] font-black uppercase tracking-tighter">{m.label.split(' ')[0]}</span>
                       </button>
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  {mode === 'change' ? (
                    <>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Initial Value</label>
                          <input type="number" value={initial} onChange={e => updateState({ initial: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Final Value</label>
                          <input type="number" value={final} onChange={e => updateState({ final: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                    </>
                  ) : mode === 'add_sub' ? (
                    <>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Base Principal</label>
                          <input type="number" value={den} onChange={e => updateState({ den: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Adjustment (%)</label>
                          <input type="number" value={num} onChange={e => updateState({ num: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                    </>
                  ) : (
                    <>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{mode === 'original' ? 'Percentage (%)' : 'Subject (X)'}</label>
                          <input type="number" value={num} onChange={e => updateState({ num: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{mode === 'original' ? 'Resulting Value' : 'Total (Y)'}</label>
                          <input type="number" value={den} onChange={e => updateState({ den: Number(e.target.value) })} 
                            className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                       </div>
                    </>
                  )}
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2.5rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Target className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quick Presets</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {[5, 10, 13, 15, 20, 25].map(v => (
                  <button key={v} onClick={() => updateState({ num: v })}
                    className={`px-5 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${num === v ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 bg-slate-50 border border-slate-100 hover:bg-white'}`}
                  >
                    {v === 13 ? 'VAT (13%)' : `${v}%`}
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {calc.error ? (
            <div className="p-10 bg-rose-50 border border-rose-100 rounded-[2.5rem] text-center space-y-2">
               <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Logic Constraint</div>
               <div className="text-xl font-black text-rose-900 uppercase tracking-tighter">{calc.error}</div>
            </div>
          ) : (
            <>
              <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Percent className="w-24 h-24 text-blue-600" /></div>
                 <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Computed Result</div>
                 <div className={`text-5xl font-black tracking-tighter font-mono uppercase ${mode === 'change' && calc.raw >= 0 ? 'text-emerald-600' : mode === 'change' ? 'text-rose-600' : 'text-slate-900'}`}>
                    {calc.result}
                 </div>
                 <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                    {calc.label}
                 </div>
              </div>

              {mode === 'add_sub' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl space-y-1">
                    <div className="text-[9px] font-black text-rose-600 uppercase">Subtracted (-{num}%)</div>
                    <div className="text-xl font-black text-rose-900">{(den * (1 - num / 100)).toLocaleString()}</div>
                  </div>
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-1">
                    <div className="text-[9px] font-black text-emerald-600 uppercase">Augmented (+{num}%)</div>
                    <div className="text-xl font-black text-emerald-900">{(den * (1 + num / 100)).toLocaleString()}</div>
                  </div>
                </div>
              )}

              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Activity className="w-24 h-24 text-blue-500" /></div>
                 <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-4 bg-blue-400 rounded-full" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Institutional Logic</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-bold tracking-tighter">
                       Standardized proportional analysis calibrated for academic verification (SEE/NEB) and financial auditing in the Nepalese landscape.
                    </p>
                 </div>
              </div>
            </>
          )}
        </div>
      }
      details={
        <div className="space-y-12">
          {(mode === 'what_is' || mode === 'what_percent') && !calc.error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5"><Percent className="w-20 h-20 text-blue-600" /></div>
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Distribution Audit</h3>
                  </div>
                  <div className="h-[240px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                       <RePieChart>
                          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={10} dataKey="value" stroke="none">
                             <Cell fill="#3b82f6" />
                             <Cell fill="#f1f5f9" />
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                          />
                       </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-[9px] font-black text-slate-400 uppercase">Part (X)</span>
                       <span className="text-xl font-black text-blue-600">{((chartData[0].value / (chartData[0].value + chartData[1].value)) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
               </div>

               <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute -bottom-12 -right-12 opacity-10"><Target className="w-64 h-64 text-emerald-500" /></div>
                  <h3 className="text-2xl font-black mb-6 tracking-tight text-emerald-400 uppercase tracking-widest">Magnitude Breakdown</h3>
                  <div className="space-y-4">
                     {chartData.map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <span className="text-[10px] font-black text-slate-400 uppercase">{d.name}</span>
                           <span className="text-xl font-black text-white">{d.value.toLocaleString()}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Percent className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Percentage Encyclopedia: Proportional Mastery</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                A <strong>Percentage</strong> is a way of expressing a number as a fraction of 100. It is derived from the Latin "per centum," meaning "by the hundred." In modern finance and academics, percentages are the universal language for measuring growth, taxes, and performance.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Landmark className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Nepalese Fiscal Context</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      From the 13% standard <strong>VAT</strong> to the variable <strong>TDS</strong> rates for services, percentage calculations underpin the entire Nepalese tax system. This tool provides preset buttons for common institutional rates to ensure compliance accuracy.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Understanding the 5 Core Methodologies</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <strong className="text-blue-600 block mb-1">X% of Y:</strong> Basic portion calculation. Useful for calculating tax amounts or interest.
                </li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <strong className="text-blue-600 block mb-1">X is ?% of Y:</strong> Finding the proportion. Used in academic grading (marks scored vs total marks).
                </li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <strong className="text-blue-600 block mb-1">% Change:</strong> Measuring growth or decline. Essential for tracking NEPSE stock performance.
                </li>
                <li className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <strong className="text-blue-600 block mb-1">Value Recovery:</strong> Finding the original amount before a percentage was applied (Reverse VAT).
                </li>
              </ul>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Academic Application (SEE/NEB)</h3>
              <p>
                In the Nepalese education system, GPA calculation relies heavily on percentage-to-grade mapping. For instance, a score of 85% is typically converted to a 3.6 GPA. This tool allows students to quickly verify their raw percentages before grade conversion.
              </p>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Select Methodology: Use the grid to choose between percentage of value, growth rates, or base value recovery.",
          "Data Entry: Enter the known variables. Use the 'Quick Presets' for standard tax rates like 13% VAT or 5% TDS.",
          "Interpret Primary Result: The main card displays the result in high-contrast typography.",
          "Visual Validation: Consult the Pie Chart to see the part-to-whole relationship graphically.",
          "Institutional Verification: Use the 'Statistical Variance' bar to understand the magnitude of change relative to 100%."
        ]
      }}
      formula={{
        title: "The Algebraic Identities of Proportions",
        description: "The mathematical foundations of our computational engine.",
        raw: "$$P = \\frac{X}{Y} \\times 100 \\quad | \\quad V_{adj} = V_{base} \\times (1 \\pm \\frac{r}{100})$$",
        latex: "P = \\frac{X}{Y} \\times 100 \\quad | \\quad V_{adj} = V_{base} \\times (1 \\pm \\frac{r}{100})"
      }}
      faqs={[
        { question: "How do I back-calculate the base price before 13% VAT?", answer: "Use the 'Original Value' mode. Enter the VAT-inclusive price as the 'Post-Percentage Result' and 113 as the 'Percentage'. The engine will divide by 1.13 to find the taxable base amount." },
        { question: "What is the 5% tax benefit for IT exporters in Nepal?", answer: "Under current Finance Acts, IT service exporters enjoy a reduced income tax rate (often 5% final TDS). You can calculate this tax liability using our 'X% of Y' mode with 5 as the percentage." },
        { question: "How do I calculate the percentage change in NEPSE stock prices?", answer: "Use the '% Change' mode. Enter the closing price of the previous trading day as 'Initial' and the current price as 'Final'. The tool will identify the growth or decline vector." },
        { question: "What is the 'Rule of 72' in finance?", answer: "Divide 72 by your annual interest rate to estimate how many years it will take to double your investment. For example, at 6% interest, your money doubles in 12 years." },
        { question: "How are percentages used in the SEE grading system?", answer: "Raw marks in subjects are converted to percentages to determine Grade Points (GP). Generally, a score of 90% or above is required for an A+ grade (4.0 GP)." },
        { question: "How do I calculate 15% TDS on consultancy services?", answer: "Use the 'X% of Y' mode. Enter 15 in the percentage field and your gross invoice amount as the population to find the exact tax to be withheld." },
        { question: "Is this tool suitable for Lok Sewa IQ preparation?", answer: "Yes, this engine follows the institutional standards for proportional logic and is the ideal resource for verifying manual aptitude calculations for PSC exams." }
      ]}
      sidebar={{
        title: "Math Resources",
        subtitle: "Proportional Logic",
        links: [
          { label: "Fraction Calculator", href: "/calculator/fraction-calculator", icon: Layers },
          { label: "Ratio & Proportion", href: "/calculator/ratio-proportion", icon: Search },
          { label: "Scientific Calc", href: "/calculator/scientific-calculator", icon: Calculator },
          { label: "SEE GPA Tool", href: "/calculator/see-gpa", icon: GraduationCap },
        ],
      }}
      relatedTools={[
        { label: "Fraction Calculator", href: "/calculator/fraction-calculator" },
        { label: "Ratio Tool", href: "/calculator/ratio-proportion" },
        { label: "Scientific Calculator", href: "/calculator/scientific-calculator" }
      ]}
    />
  );
}
