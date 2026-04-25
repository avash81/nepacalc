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
      <ModernCalcLayout
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
          ],
        }}
        howToUse={{
          steps: [
            "Enter the numerical weight or mass value you want to convert.",
            "Select the starting unit from the 'From' dropdown.",
            "Select your desired target unit from the 'To' dropdown.",
            "The calculator will instantly display the converted result.",
            "Use the 'Swap' button (arrows) to quickly reverse the conversion direction.",
            "If you are converting gold or silver, you can input today's market rate in the Gold Value Estimator to see its total worth."
          ]
        }}
        faqs={[
          {
            question: "What is a Tola?",
            answer: "The Tola is a traditional South Asian unit of mass, now standardized as exactly 11.6638038 grams. It is the standard unit used for weighing and pricing gold and silver in countries like Nepal, India, and Pakistan."
          },
          {
            question: "What is the difference between an ounce and a fluid ounce?",
            answer: "An ounce (oz) is a unit of weight or mass (used for solids), while a fluid ounce (fl oz) is a unit of volume (used for liquids). This calculator converts standard weight ounces. 1 pound equals 16 weight ounces."
          }
        ]}
        seoContent={
          <div>
            <h2>Understanding Weight and Mass Conversions</h2>
            <p>Whether you are cooking, traveling, dealing with international shipping, or buying jewelry, understanding how to convert weight is an essential skill. The world primarily uses two systems: the Metric system (kilograms, grams) and the Imperial system (pounds, ounces).</p>

            <h2>Measurement Guide: Mass & Weight</h2>
            <p className="font-medium">
              Accurate <strong>mass determination</strong> is a pillar of international trade, scientific research, and daily consumer life in Nepal.
            </p>
            <p>
              Our <strong>Gravimetric Analysis Laboratory</strong> provides the precision required for high-stakes conversions. Whether you are a merchant in Nepal converting <strong>kilograms to metric tons</strong> for freight or a cook converting grams to ounces, our engine applies internationally verified mass constants to ensure every conversion is flawless and instantaneous.
            </p>
            
            <h3>Metric vs. Imperial System</h3>
            <p>The <strong>Metric system</strong> is based on multiples of 10, making it incredibly easy to scale. For instance, there are 1,000 milligrams in a gram, and 1,000 grams in a kilogram. It is the standard system used in science and by almost every country globally.</p>
            <p>The <strong>Imperial system</strong> is used primarily in the United States and a few other nations. In this system, 16 ounces make up a pound, and 2,000 pounds make up a ton. Converting between Metric and Imperial requires specific multiplication factors (e.g., 1 kg = 2.20462 lbs).</p>
            
            <h3>The South Asian Tola</h3>
            <p>If you are buying gold or silver in Nepal, India, or Pakistan, you will encounter the <strong>Tola</strong>. Historically based on the weight of 100 Ratti seeds, the Tola was officially standardized under British rule to exactly 180 troy grains, which equals <strong>11.6638 grams</strong>. Our calculator features a dedicated Tola conversion tool alongside a live market value estimator, making it the perfect tool for jewelry shoppers.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
