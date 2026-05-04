'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { ArrowLeftRight, Gem, Scale } from 'lucide-react';

const UNITS: Record<string, { name: string; factor: number }> = {
  kg:   { name: 'Kilogram (kg)',      factor: 1000 },
  g:    { name: 'Gram (g)',           factor: 1 },
  mg:   { name: 'Milligram (mg)',     factor: 0.001 },
  lb:   { name: 'Pound (lb)',         factor: 453.592 },
  oz:   { name: 'Ounce (oz)',         factor: 28.3495 },
  tola: { name: 'Tola (Nepal Gold)',  factor: 11.6638 },
  ton:  { name: 'Metric Ton',         factor: 1000000 },
};

const DEFAULT_STATE = {
  value: 1,
  from: 'kg',
  to: 'lb',
  goldPricePerTola: 150000, // NPR
};

export default function WeightConverter() {
  const [state, setState] = useSyncState('weight_converter_v2', DEFAULT_STATE);
  const { value, from, to, goldPricePerTola } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const r = (value * UNITS[from].factor) / UNITS[to].factor;
    return r.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, from, to]);

  const goldValue = useMemo(() => {
    // Current input converted to Tola
    const tolas = (value * UNITS[from].factor) / UNITS['tola'].factor;
    return tolas * goldPricePerTola;
  }, [value, from, goldPricePerTola]);

  const swap = () => { updateState({ from: to, to: from }); };

  return (
    <CalculatorErrorBoundary calculatorName="Weight Converter">
      <ModernCalcLayout hideH1={false}
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Weight Converter' }]}
        title="Weight & Mass Converter"
        description="Convert seamlessly between kilograms, pounds, grams, ounces, metric tons, and Nepal's unique gold Tola standard with high precision."
        icon={Scale}
        inputs={
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-inner space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Amount to Convert</label>
                  <input type="number" value={value} onChange={e => updateState({ value: Number(e.target.value) })} min={0}
                    className="w-full h-16 px-6 rounded-2xl border border-slate-300 bg-white font-mono text-3xl font-black text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center relative">
                  <div className="w-full space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From</label>
                    <div className="relative">
                        <select value={from} onChange={e => updateState({ from: e.target.value })}
                        className="w-full h-14 px-4 rounded-xl border border-slate-300 bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 cursor-pointer appearance-none">
                        {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>

                  <button onClick={swap}
                    className="sm:mt-6 h-12 w-12 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all shadow-sm z-10 shrink-0 group">
                    <ArrowLeftRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </button>

                  <div className="w-full space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To</label>
                    <div className="relative">
                        <select value={to} onChange={e => updateState({ to: e.target.value })}
                        className="w-full h-14 px-4 rounded-xl border border-slate-300 bg-white font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 cursor-pointer appearance-none">
                        {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex gap-4 items-start shadow-sm">
              <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                 <Gem className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-amber-800 mb-1">Nepal Gold Standard</div>
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  In Nepal and South Asia, precious metals are measured in Tola. <strong>1 Tola = exactly 11.6638 grams</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '1 kg equals', val: '2.2046 lb' },
                { label: '1 lb equals', val: '453.59 g' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</span>
                  <span className="block text-sm font-black text-indigo-600">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <div className="p-8 bg-indigo-600 rounded-3xl text-center shadow-lg text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                  <Scale className="w-48 h-48 -mr-10 -mt-10" />
                </div>
                <div className="relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Converted Result</div>
                    <div className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 font-mono break-all">{result}</div>
                    <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-bold border border-white/30 tracking-wider">
                        {UNITS[to].name}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
              <div className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Input Value</span>
                <span className="text-lg font-black text-slate-800">{value} {UNITS[from].name}</span>
              </div>
              <div className="p-5 flex justify-between items-center bg-indigo-50/30">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Multiplier Used</span>
                <span className="text-sm font-bold text-indigo-600 font-mono">
                  x {(UNITS[from].factor / UNITS[to].factor).toFixed(6)}
                </span>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Gem className="w-40 h-40 -mr-8 -mb-8" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <div className="p-2 bg-amber-500/20 rounded-lg"><Gem className="w-5 h-5 text-amber-400" /></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">Gold Value Estimator</h3>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Rate (NPR per Tola)</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rs.</div>
                                <input type="number" value={goldPricePerTola} onChange={e => updateState({ goldPricePerTola: Number(e.target.value) })}
                                className="w-full h-12 pl-12 pr-4 bg-black/30 border border-white/10 rounded-xl font-mono text-lg font-bold text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Estimated Value</span>
                            <span className="text-3xl font-black text-amber-400 tracking-tighter">NPR {goldValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        }
        sidebar={{
          title: "Related Calculators",
          links: [
          { label: 'BMI Calculator', href: '/calculator/bmi' },
            { label: 'Remittance Calculator', href: '/calculator/remittance-calculator' },
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
        ],
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Mass Metrology: Metric, Imperial & the Tola Standard</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  The world operates on two primary mass measurement systems in daily life. The <strong className="text-[#202124]">Metric (SI) system</strong>, anchored by the Kilogram, is the global scientific and commercial standard used by 195 countries. It is based on powers of 10, making scaling (grams to kilograms to metric tons) intuitive and computationally clean. Our <strong className="text-[#202124]">weight converter</strong> handles all conversions through a centralized Gram-based pivot for mathematical precision.
                </p>
                <p>
                  Uniquely for Nepal and South Asia, our tool also integrates the <strong className="text-[#202124]">Tola</strong>, a traditional precious metal measurement still universally used in jewelry markets across Nepal, India, and Pakistan. The Tola is now legally defined as exactly 11.6638 grams, bridging the traditional and modern worlds of mass measurement seamlessly.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Structural Differences Between Weight Systems</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Metric (SI) System:</strong> Powers of 10 architecture. 1 kg = 1,000 g = 1,000,000 mg. Used exclusively in all scientific, medical, and officially international commercial applications globally.</li>
                <li><strong className="text-[#188038]">Imperial System (UK/US):</strong> Non-decimal structure. 1 pound (lb) = 16 ounces (oz). 2,000 lbs = 1 short ton (US). Used commercially in the USA and in everyday UK life. All values are anchored to: 1 lb = exactly 453.59237 grams by international treaty.</li>
                <li><strong className="text-[#D93025]">The Tola (South Asian Standard):</strong> The Tola predates both modern systems, originating from the mass of a silver rupee coin during the Mughal era. Its current value of 11.6638 grams was standardized under British India. Today, all gold pricing in Nepal (e.g., 'price per tola') references this exact definition.</li>
              </ul>
            </div>
          </div>
        }
        faqs={[
          {
            question: "What exactly is a Tola and why is it used for gold in Nepal?",
            answer: "The Tola is a traditional South Asian unit of mass standardized as exactly 11.6638038 grams. It has been the universal precious metals standard in Nepal, India, and Pakistan for centuries because gold and silver merchants historically kept their scales calibrated in Tola. All gold prices quoted in Nepal (e.g., daily rates from the Nepal Gold & Silver Dealers' Association) are per Tola."
          },
          {
            question: "What is the difference between a weight ounce and a fluid ounce?",
            answer: "A weight ounce (oz) is a unit of mass (approximately 28.35 grams), used for weighing solids like food or precious metals. A fluid ounce (fl oz) is a unit of volume (approximately 29.57 mL), used for measuring liquids. They are completely different dimensions and should never be confused."
          },
          {
            question: "Why does 1 kilogram = 2.20462 pounds and not a round number?",
            answer: "Because the kilogram and pound systems were developed independently in different countries without a coordinated mathematical relationship. The exact equivalence (1 lb = 0.45359237 kg) was defined by international treaty in 1959 to standardize conversions globally."
          },
          {
            question: "How many kilograms is one metric ton?",
            answer: "One metric ton (tonne) is exactly 1,000 kilograms or 1,000,000 grams. This differs from the US Short Ton (2,000 lbs ≈ 907 kg) and the UK Long Ton (2,240 lbs ≈ 1,016 kg). The metric ton is the standard for international trade and scientific use."
          },
          {
            question: "Can I use the Gold Value Estimator for silver as well?",
            answer: "Yes. The estimator calculates the value of any entered weight at the rate you input per Tola. Simply enter the current silver price per Tola (available from the Nepal Gold & Silver Dealers' Association) to get an accurate silver valuation."
          },
          {
            question: "Is weight the same as mass?",
            answer: "Technically, no. Mass is the amount of matter in an object (measured in kg) and is constant everywhere in the universe. Weight is the gravitational force acting on that mass (measured in Newtons) and would differ on the Moon. However, in everyday usage, both terms are used interchangeably to refer to what a scale measures on Earth."
          }
        ]}
        howToUse={{
          steps: [
            "Enter the numerical weight or mass value you want to convert.",
            "Select the starting unit from the 'From' dropdown.",
            "Select your desired target unit from the 'To' dropdown.",
            "The result is displayed instantly in real-time.",
            "Use the Swap button to reverse the conversion direction.",
            "Input today's gold price per Tola (NPR) to estimate the precious metal value."
          ]
        }}
      />
    </CalculatorErrorBoundary>
  );
}

