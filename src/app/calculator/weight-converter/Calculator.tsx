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
  to: 'tola',
  goldPricePerTola: 150000, // NPR
};

export default function WeightConverter() {
  const [state, setState] = useSyncState('weight_converter_v2', DEFAULT_STATE);
  const { value, from, to, goldPricePerTola } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    if (isNaN(value) || value < 0) return '0';
    const r = (value * UNITS[from].factor) / UNITS[to].factor;
    return r.toLocaleString(undefined, { maximumFractionDigits: 7 });
  }, [value, from, to]);

  const goldValue = useMemo(() => {
    if (isNaN(value) || value < 0 || isNaN(goldPricePerTola) || goldPricePerTola < 0) return 0;
    // Current input converted to Tola
    const tolas = (value * UNITS[from].factor) / UNITS['tola'].factor;
    return tolas * goldPricePerTola;
  }, [value, from, goldPricePerTola]);

  const swap = () => { updateState({ from: to, to: from }); };

  return (
    <CalculatorErrorBoundary calculatorName="Weight Converter">
      <ModernCalcLayout hideH1={false}
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Weight Converter' }]}
        title="Weight Converter: Kg to Tola, Grams & Pounds"
        description="Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola."
        icon={Scale}
        inputs={
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-inner space-y-6">
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
                    className="sm:mt-6 h-12 w-12 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-indigo-500 hover:text-[#202124] hover:border-indigo-500 transition-all shadow-sm z-10 shrink-0 group">
                    <ArrowLeftRight className="w-5 h-5 text-slate-400 group-hover:text-[#202124] transition-colors" />
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
                { label: '1 kg equals', val: '85.7353 Tola' },
                { label: '1 Tola equals', val: '11.6638 g' },
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
            <div className="p-8 bg-indigo-600 rounded-lg text-center shadow-sm text-[#202124] relative overflow-hidden">
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

            <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-6 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Gem className="w-40 h-40 -mr-8 -mb-8" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 border-b border-[#dadce0] pb-4">
                        <div className="p-2 bg-amber-500/20 rounded-lg"><Gem className="w-5 h-5 text-amber-400" /></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">Gold Value Estimator</h3>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Rate (NPR per Tola)</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rs.</div>
                                <input type="number" value={goldPricePerTola} onChange={e => updateState({ goldPricePerTola: Number(e.target.value) })}
                                className="w-full h-12 pl-12 pr-4 bg-black/30 border border-[#dadce0] rounded-xl font-mono text-lg font-bold text-[#202124] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-[#dadce0] flex flex-col items-end">
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
            { label: 'Gold Converter', href: '/calculator/gold-converter/' },
            { label: 'Silver Converter', href: '/calculator/silver-converter/' },
            { label: 'Length Converter', href: '/calculator/length-converter/' },
            { label: 'Area Calculator', href: '/calculator/area-calculator/' },
            { label: 'Nepal Land Converter', href: '/calculator/nepal-land/' },
            { label: 'Universal Unit Converter', href: '/calculator/unit-converter/' }
          ],
        }}
                details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Weight Conversion: Kilograms, Pounds, Grams and Tola</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>Use this weight converter to convert kilograms, grams, pounds, ounces and Nepal-standard Tola. Enter a value, select the original and target units, and view the converted result.</p>
                <p>In Nepal, one Tola is equal to 11.6638 grams. Tola values can differ across regional standards, so confirm the applicable standard when converting precious-metal weights.</p>
                <h3 className="font-bold text-[#202124] mt-4">Common Weight Conversions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>1 kilogram = 1,000 grams</li>
                  <li>1 kilogram ≈ 2.20462 pounds</li>
                  <li>1 pound = 453.59237 grams</li>
                  <li>1 Nepal-standard Tola = 11.6638 grams</li>
                  <li>1 kilogram ≈ 85.7353 Nepal-standard Tola</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">How to Use the Weight Converter</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-[#5F6368] leading-relaxed">
                <li>Enter the weight you want to convert.</li>
                <li>Select the original unit in the From field.</li>
                <li>Select the target unit in the To field.</li>
                <li>Read the converted result.</li>
                <li>Use the swap control to reverse the conversion when needed.</li>
                <li>To estimate gold value, enter the applicable price per Tola in the Gold Value Estimator.</li>
              </ol>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Weight Conversion Formula</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>To convert a weight from one unit to another, multiply the original value by the appropriate conversion factor. For example:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kilograms to grams: multiply by 1,000.</li>
                  <li>Kilograms to pounds: multiply by approximately 2.20462.</li>
                  <li>Kilograms to Nepal-standard Tola: multiply by approximately 85.7353.</li>
                </ul>
                <p>For Nepal-standard Tola conversions, the calculation uses 1 Tola = 11.6638 grams.</p>
                <p className="font-bold text-[#202124] bg-slate-50 p-3 rounded border border-slate-200">Formula for kilograms to Tola:<br/>Tola = (kilograms × 1,000) ÷ 11.6638</p>

                  <h3 className="font-bold text-[#202124] mt-6 mb-2">How to Convert Tola to Kilograms</h3>
                  <p>To convert Nepal-standard Tola to kilograms, multiply the number of Tola by 11.6638 and divide by 1,000.</p>
                  <p>Examples:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>1 Tola = 0.0116638 kg</li>
                    <li>100 Tola = 1.16638 kg</li>
                  </ul>
                  <p>Use the calculator to convert other values in either direction.</p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">How Many Tola Are in 1 kg?</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>One kilogram is approximately <strong>85.7353 Nepal-standard Tola</strong>, using 1 Tola = 11.6638 grams.</p>
                <p>Examples:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>0.5 kg ≈ 42.8676 Tola</li>
                  <li>1 kg ≈ 85.7353 Tola</li>
                  <li>2 kg ≈ 171.4705 Tola</li>
                  <li>5 kg ≈ 428.6763 Tola</li>
                </ul>
                <p className="text-xs italic">These values use the Nepal-standard Tola. Other regional standards may produce different results.</p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Kilograms to Tola Conversion Chart</h2>
              <p className="text-sm text-[#5F6368] mb-4">The following values use the Nepal-standard conversion of 1 Tola = 11.6638 grams.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Kilograms</th>
                      <th className="py-3 px-4">Nepal-standard Tola (approx.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">0.1</td>
                      <td className="py-2 px-4">8.5735</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">0.25</td>
                      <td className="py-2 px-4">21.4338</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">0.5</td>
                      <td className="py-2 px-4">42.8676</td>
                    </tr>
                    <tr className="hover:bg-slate-50 text-indigo-700 font-bold bg-indigo-50/30">
                      <td className="py-2 px-4">1</td>
                      <td className="py-2 px-4">85.7353</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">171.4705</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">428.6763</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">857.3526</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-4">These values are rounded for display. Use the converter for other amounts.</p>
            </div>
          </div>
        }
        faqs={[
          {
            question: "How many Tola are in 1 kg?",
            answer: "One kilogram is approximately 85.7353 Nepal-standard Tola, using 1 Tola = 11.6638 grams."
          },
          {
            question: "How many grams are in 1 Tola?",
            answer: "One Nepal-standard Tola equals 11.6638 grams."
          },
          {
            question: "How do I convert kilograms to pounds?",
            answer: "Multiply the kilogram value by approximately 2.20462 to get pounds. For example, 1 kg is approximately 2.20462 lb."
          },
          {
            question: "What is the difference between an ounce and a fluid ounce?",
            answer: "An ounce is a unit of weight or mass, while a fluid ounce measures volume. They are not interchangeable."
          },
          {
            question: "How many kilograms are in a metric tonne?",
            answer: "One metric tonne equals 1,000 kilograms."
          },
          {
            question: "Can I use the estimator for silver?",
            answer: "Yes. Enter the applicable silver price per Tola to estimate value. Make sure the price and weight use the same Tola standard."
          },
          {
            question: "Is weight the same as mass?",
            answer: "Mass measures the amount of matter in an object. Weight is the force of gravity acting on that mass. In everyday use, the terms are often used interchangeably."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}


