'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { ArrowLeftRight, Gem, Scale, Check, Copy } from 'lucide-react';

const UNITS: Record<string, { name: string; short: string; factor: number }> = {
  kg:     { name: 'Kilogram (kg)',       short: 'kg',   factor: 1000 },
  g:      { name: 'Gram (g)',            short: 'g',    factor: 1 },
  mg:     { name: 'Milligram (mg)',      short: 'mg',   factor: 0.001 },
  ug:     { name: 'Microgram (µg)',      short: 'µg',   factor: 0.000001 },
  t:      { name: 'Metric Tonne (t)',    short: 't',    factor: 1000000 },
  lb:     { name: 'Pound (lb)',          short: 'lb',   factor: 453.59237 },
  oz:     { name: 'Ounce (oz)',          short: 'oz',   factor: 28.349523125 },
  st:     { name: 'Stone (st)',          short: 'st',   factor: 6350.29318 },
  ton_us: { name: 'US Short Ton',        short: 'US t', factor: 907184.74 },
  ton_uk: { name: 'Imperial Long Ton',   short: 'UK t', factor: 1016046.9088 },
  tola:   { name: 'Nepal Tola',         short: 'tola', factor: 11.6638 },
  ozt:    { name: 'Troy Ounce (ozt)',    short: 'ozt',  factor: 31.1034768 },
  dwt:    { name: 'Pennyweight (dwt)',   short: 'dwt',  factor: 1.55517384 },
  ct:     { name: 'Carat (ct)',          short: 'ct',   factor: 0.2 },
  gr:     { name: 'Grain (gr)',          short: 'gr',   factor: 0.06479891 },
};

const DEFAULT_STATE = {
  value: 1,
  from: 'kg',
  to: 'tola',
  goldPricePerTola: 150000,
};

export default function WeightConverter() {
  const [state, setState] = useSyncState('weight_converter_v2', DEFAULT_STATE);
  const { value, from, to, goldPricePerTola } = state;
  const [copied, setCopied] = useState(false);
  const [tableTab, setTableTab] = useState<'kg' | 'g' | 'tola' | 'lb'>('kg');

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const rawTargetValue = useMemo(() => {
    if (isNaN(value) || value < 0) return 0;
    return (value * UNITS[from].factor) / UNITS[to].factor;
  }, [value, from, to]);

  const resultStr = useMemo(() => {
    if (isNaN(value) || value < 0) return '0';
    return rawTargetValue.toLocaleString(undefined, { maximumFractionDigits: 7 });
  }, [value, rawTargetValue]);

  const handleTargetChange = (valStr: string) => {
    if (valStr === '') { updateState({ value: 0 }); return; }
    const targetNum = Number(valStr);
    if (!isNaN(targetNum) && targetNum >= 0) {
      const sourceNum = (targetNum * UNITS[to].factor) / UNITS[from].factor;
      updateState({ value: Number(sourceNum.toFixed(6)) });
    }
  };

  const goldValue = useMemo(() => {
    if (isNaN(value) || value < 0 || isNaN(goldPricePerTola) || goldPricePerTola < 0) return 0;
    return ((value * UNITS[from].factor) / UNITS['tola'].factor) * goldPricePerTola;
  }, [value, from, goldPricePerTola]);

  const currentTolas = useMemo(() => {
    if (isNaN(value) || value < 0) return 0;
    return (value * UNITS[from].factor) / UNITS['tola'].factor;
  }, [value, from]);

  const swap = () => { updateState({ from: to, to: from }); };

  const copyResult = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${value} ${UNITS[from].name} = ${resultStr} ${UNITS[to].name}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const PRESETS = [
    { label: '1 kg → Tola',    val: 1,   f: 'kg',   t: 'tola' },
    { label: '0.5 kg → Tola',  val: 0.5, f: 'kg',   t: 'tola' },
    { label: '5 kg → Tola',    val: 5,   f: 'kg',   t: 'tola' },
    { label: '1 Tola → Grams', val: 1,   f: 'tola', t: 'g' },
    { label: '10 Tola → kg',   val: 10,  f: 'tola', t: 'kg' },
    { label: '1 kg → lbs',     val: 1,   f: 'kg',   t: 'lb' },
  ];

  // ── Validated table data (all values cross-checked via Node.js) ─────────────
  const TABLE_DATA = {
    kg: [
      { base: '0.1 kg',  g: '100',     lb: '0.22046',  tola: '8.57354'  },
      { base: '0.25 kg', g: '250',     lb: '0.55116',  tola: '21.43384' },
      { base: '0.5 kg',  g: '500',     lb: '1.10231',  tola: '42.86768' },
      { base: '1 kg',    g: '1,000',   lb: '2.20462',  tola: '85.73535' },
      { base: '2 kg',    g: '2,000',   lb: '4.40925',  tola: '171.4707' },
      { base: '5 kg',    g: '5,000',   lb: '11.02311', tola: '428.67676'},
      { base: '10 kg',   g: '10,000',  lb: '22.04623', tola: '857.35352'},
    ],
    g: [
      { base: '1 g',     kg: '0.001', oz: '0.03527',  tola: '0.08574'  },
      { base: '10 g',    kg: '0.01',  oz: '0.35274',  tola: '0.85735'  },
      { base: '100 g',   kg: '0.1',   oz: '3.52740',  tola: '8.57354'  },
      { base: '500 g',   kg: '0.5',   oz: '17.63698', tola: '42.86768' },
      { base: '1,000 g', kg: '1',     oz: '35.27396', tola: '85.73535' },
    ],
    tola: [
      { base: '1 tola',   g: '11.6638',   kg: '0.011664', oz: '0.41143'  },
      { base: '5 tola',   g: '58.319',    kg: '0.058319', oz: '2.05714'  },
      { base: '10 tola',  g: '116.638',   kg: '0.116638', oz: '4.11428'  },
      { base: '50 tola',  g: '583.19',    kg: '0.58319',  oz: '20.57142' },
      { base: '100 tola', g: '1,166.38',  kg: '1.16638',  oz: '41.14284' },
    ],
    lb: [
      { base: '0.5 lb', kg: '0.226796', g: '226.796',   oz: '8'   },
      { base: '1 lb',   kg: '0.453592', g: '453.592',   oz: '16'  },
      { base: '2 lb',   kg: '0.907185', g: '907.185',   oz: '32'  },
      { base: '5 lb',   kg: '2.267962', g: '2,267.962', oz: '80'  },
      { base: '10 lb',  kg: '4.535924', g: '4,535.924', oz: '160' },
    ],
  };

  const TAB_DEFS: { key: 'kg' | 'g' | 'tola' | 'lb'; label: string }[] = [
    { key: 'kg',   label: 'Kilograms' },
    { key: 'g',    label: 'Grams' },
    { key: 'tola', label: 'Nepal Tola' },
    { key: 'lb',   label: 'Pounds' },
  ];

  const TABLE_COLS: Record<string, { header: string; field: string; base?: boolean }[]> = {
    kg:   [
      { header: 'Kilograms',      field: 'base', base: true },
      { header: 'Grams (g)',      field: 'g' },
      { header: 'Pounds (lb)',    field: 'lb' },
      { header: 'Nepal Tola',    field: 'tola' },
    ],
    g:    [
      { header: 'Grams',          field: 'base', base: true },
      { header: 'Kilograms (kg)', field: 'kg' },
      { header: 'Ounces (oz)',    field: 'oz' },
      { header: 'Nepal Tola',    field: 'tola' },
    ],
    tola: [
      { header: 'Nepal Tola',    field: 'base', base: true },
      { header: 'Grams (g)',      field: 'g' },
      { header: 'Kilograms (kg)', field: 'kg' },
      { header: 'Ounces (oz)',    field: 'oz' },
    ],
    lb:   [
      { header: 'Pounds',         field: 'base', base: true },
      { header: 'Kilograms (kg)', field: 'kg' },
      { header: 'Grams (g)',      field: 'g' },
      { header: 'Ounces (oz)',    field: 'oz' },
    ],
  };

  return (
    <CalculatorErrorBoundary calculatorName="Weight Converter">
      <ModernCalcLayout
        hideH1={false}
        fullWidth={true}
        results={undefined}
        crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Weight Converter' }]}
        title="Weight Converter: Kg to Tola, Grams & Pounds"
        description="Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola."
        icon={Scale}
        inputs={
          <div className="space-y-5 w-full">
            {/* Quick Preset Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs border-b border-[#F1F3F4] mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] shrink-0">Quick:</span>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => updateState({ value: p.val, from: p.f, to: p.t })}
                  className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-[#3C4043] font-medium text-xs whitespace-nowrap transition-colors border border-[#DADCE0]"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Dual-Interactive Converter Card */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* FROM */}
                <div className="w-full flex-1 border border-[#DADCE0] focus-within:border-gray-400 rounded-lg p-4 transition-all bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368]">From Amount</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={value === 0 ? '' : value}
                      placeholder="0"
                      onChange={e => updateState({ value: e.target.value === '' ? 0 : Number(e.target.value) })}
                      min={0}
                      className="w-full flex-1 bg-transparent font-mono text-2xl sm:text-3xl font-bold text-[#202124] outline-none min-w-[50px]"
                    />
                    <div className="relative shrink-0 w-[140px] sm:w-[180px]">
                      <select
                        value={from}
                        onChange={e => updateState({ from: e.target.value })}
                        className="w-full h-11 pl-3 pr-8 rounded border border-[#DADCE0] bg-slate-50 text-sm font-semibold text-[#202124] outline-none cursor-pointer appearance-none truncate"
                      >
                        {Object.entries(UNITS).map(([k, v]) => (
                          <option key={k} value={k}>{v.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368] text-xs">▼</div>
                    </div>
                  </div>
                </div>

                {/* Swap */}
                <div className="flex justify-center shrink-0">
                  <button
                    type="button"
                    onClick={swap}
                    title="Swap conversion units"
                    className="h-10 w-10 rounded-full border border-[#DADCE0] bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all text-[#5F6368]"
                    aria-label="Swap units"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* TO */}
                <div className="w-full flex-1 border border-[#DADCE0] focus-within:border-gray-400 rounded-lg p-4 transition-all bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368]">Converted Result</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={rawTargetValue === 0 ? '' : Number(rawTargetValue.toFixed(7))}
                      placeholder="0"
                      onChange={e => handleTargetChange(e.target.value)}
                      min={0}
                      className="w-full flex-1 bg-transparent font-mono text-2xl sm:text-3xl font-bold text-[#202124] outline-none min-w-[50px]"
                    />
                    <div className="relative shrink-0 w-[140px] sm:w-[180px]">
                      <select
                        value={to}
                        onChange={e => updateState({ to: e.target.value })}
                        className="w-full h-11 pl-3 pr-8 rounded border border-[#DADCE0] bg-white text-sm font-semibold text-[#202124] outline-none cursor-pointer appearance-none truncate"
                      >
                        {Object.entries(UNITS).map(([k, v]) => (
                          <option key={k} value={k}>{v.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368] text-xs">▼</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula strip + Copy */}
              <div className="pt-4 border-t border-[#F1F3F4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-medium text-[#202124]">
                    {value} {UNITS[from].name} = <strong className="font-mono text-indigo-600">{resultStr} {UNITS[to].name}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={copyResult}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5F6368] hover:text-[#202124] bg-white border border-[#DADCE0] rounded px-2.5 py-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs font-mono text-[#70757A]">
                  Multiplier: × {(UNITS[from].factor / UNITS[to].factor).toFixed(6)}
                </div>
              </div>
            </div>

            {/* Nepal Gold Standard + Gold Value Estimator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white border border-[#DADCE0] rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 rounded text-amber-600 shrink-0">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] mb-1">Nepal Gold Standard</h3>
                    <p className="text-xs text-[#5F6368] leading-relaxed">
                      In Nepal, precious metals follow the official legal standard: <strong>1 Tola = 11.6638 g</strong>.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F3F4]">
                  <div>
                    <span className="block text-[10px] font-bold text-[#70757A] uppercase tracking-wider mb-0.5">1 kg equals</span>
                    <span className="block text-sm font-semibold text-[#202124]">85.7353 Tola</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#70757A] uppercase tracking-wider mb-0.5">1 Tola equals</span>
                    <span className="block text-sm font-semibold text-[#202124]">11.6638 g</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#DADCE0] rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#F1F3F4] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded text-green-600">
                      <Scale className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#202124]">Value Estimator</span>
                  </div>
                  <span className="text-[11px] text-[#5F6368] font-medium bg-slate-50 px-2 py-0.5 rounded border border-[#DADCE0]">
                    {currentTolas.toFixed(2)} Tola
                  </span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] block">Gold/Silver Price (NPR per Tola)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#70757A]">Rs.</span>
                    <input
                      type="number"
                      value={goldPricePerTola === 0 ? '' : goldPricePerTola}
                      onChange={e => updateState({ goldPricePerTola: e.target.value === '' ? 0 : Number(e.target.value) })}
                      className="w-full h-10 pl-10 pr-3 rounded border border-[#DADCE0] text-sm font-medium font-mono text-[#202124] focus:border-gray-400 outline-none transition-colors"
                      placeholder="150000"
                      min={0}
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-[#F1F3F4] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368]">Estimated Value</span>
                  <span className="text-lg font-bold text-[#202124] font-mono">
                    NPR {goldValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
        sidebar={{
          title: "Related Calculators",
          links: [
            { label: 'Gold Converter',          href: '/calculator/gold-converter/' },
            { label: 'Silver Converter',         href: '/calculator/silver-converter/' },
            { label: 'Length Converter',         href: '/calculator/length-converter/' },
            { label: 'Area Calculator',          href: '/calculator/area-calculator/' },
            { label: 'Nepal Land Converter',     href: '/calculator/nepal-land/' },
            { label: 'Universal Unit Converter', href: '/calculator/unit-converter/' },
          ],
        }}
        details={
          <div className="space-y-6">

            {/* ═══════════════════════════════════════════════
                SECTION 1 — About this converter (quick facts)
                What it does, key standard, why Tola matters.
                First thing a user reads after using the tool.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-3">Weight Converter — Kilograms, Pounds, Grams and Tola</h2>
              <div className="space-y-3 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  This weight converter supports 15 units across metric, imperial and precious-metal standards.
                  Enter any value, pick the source and target units, and the result appears instantly.
                  Typing in the result box converts in reverse — no swap needed.
                </p>
                <p>
                  In Nepal, the legal precious-metal standard is set by FENEGOSIDA:
                  <strong className="text-[#202124]"> 1 Tola = exactly 11.6638 grams</strong>.
                  This differs from the Pakistan and Indian Tola standards; always confirm the applicable standard before a gold or silver transaction.
                </p>
                <ul className="list-none space-y-1 pt-1">
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 kilogram = 1,000 grams</li>
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 kilogram ≈ 2.20462 pounds</li>
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 pound = 453.59237 grams</li>
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 Nepal-standard Tola = 11.6638 grams</li>
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 kilogram ≈ 85.7353 Nepal-standard Tola</li>
                  <li className="flex gap-2"><span className="text-indigo-600 font-bold shrink-0">›</span>1 troy ounce = 31.1034768 g (≠ avoirdupois ounce = 28.349523125 g)</li>
                </ul>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 2 — How to use (step-by-step)
                Placed here so new users can read it right
                after they see what the tool does.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-3">How to Use the Weight Converter</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-[#5F6368] leading-relaxed">
                <li>Enter the weight value in the <strong className="text-[#202124]">From Amount</strong> box on the left.</li>
                <li>Select the source unit from the dropdown beside it (e.g. <em>Kilogram</em>).</li>
                <li>Select the target unit on the right (e.g. <em>Nepal Tola</em>). The result updates instantly.</li>
                <li>To reverse the conversion, type directly into the result box — it recalculates automatically.</li>
                <li>Use the <strong className="text-[#202124]">⇆ Swap</strong> button to flip both units at once.</li>
                <li>Use the quick preset chips (1 kg → Tola, 1 Tola → Grams…) to jump to common searches.</li>
                <li>To estimate gold or silver value, enter the current price per Tola in the <strong className="text-[#202124]">Gold Value Estimator</strong> card.</li>
              </ol>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 3 — Conversion formula
                Explains the maths. Builds trust for SEO
                and helps users who want to verify results.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-3">Weight Conversion Formula</h2>
              <div className="space-y-3 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  All conversions use grams as the internal base unit.
                  Each unit has a fixed gram factor. To convert unit A to unit B:
                </p>
                <p className="font-mono bg-slate-50 border border-slate-200 rounded-lg p-3 text-[#202124] text-xs">
                  result = (value × factor_A) ÷ factor_B
                </p>
                <p>Common examples:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kilograms → grams: multiply by <strong className="text-[#202124]">1,000</strong></li>
                  <li>Kilograms → pounds: multiply by <strong className="text-[#202124]">2.20462</strong></li>
                  <li>Kilograms → Nepal Tola: multiply by <strong className="text-[#202124]">85.7353</strong> (= 1,000 ÷ 11.6638)</li>
                </ul>

                <h3 className="font-bold text-[#202124] pt-3">How to Convert Tola to Kilograms</h3>
                <p>
                  Multiply the number of Tola by <strong className="text-[#202124]">11.6638</strong>, then divide by 1,000.
                </p>
                <p className="font-mono bg-slate-50 border border-slate-200 rounded-lg p-3 text-[#202124] text-xs">
                  kg = (Tola × 11.6638) ÷ 1,000
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>1 Tola = 0.0116638 kg</li>
                  <li>10 Tola = 0.116638 kg</li>
                  <li>100 Tola = 1.16638 kg</li>
                </ul>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 4 — How many Tola in 1 kg?
                High-traffic search query answered directly.
                Positioned before the table so Google AI
                can extract a direct answer quickly.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-3">How Many Tola Are in 1 kg?</h2>
              <div className="space-y-3 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  One kilogram equals <strong className="text-[#202124]">85.7353 Nepal-standard Tola</strong>,
                  calculated using 1 Tola = 11.6638 grams (FENEGOSIDA standard).
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>0.1 kg = 8.57354 Tola</li>
                  <li>0.5 kg = 42.86768 Tola</li>
                  <li>1 kg = 85.73535 Tola</li>
                  <li>2 kg = 171.4707 Tola</li>
                  <li>5 kg = 428.67676 Tola</li>
                  <li>10 kg = 857.35352 Tola</li>
                </ul>
                <p className="text-xs italic text-[#9AA0A6]">
                  These values use the Nepal/FENEGOSIDA Tola standard. Results differ under Pakistan or Indian Tola standards.
                </p>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 5 — Interactive tabbed conversion table
                The main reference table. Tabs keep it compact.
                Semantic HTML for Google AI Overview extraction.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#F8F9FA]">
                <h2 className="text-lg font-black text-[#202124]">Common Weight Conversion Table</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">Click a unit to see its conversions. Values use the Nepal-standard Tola (11.6638 g).</p>
              </div>

              {/* Tab pills */}
              <div className="flex flex-wrap gap-2 px-5 pt-4 pb-2">
                {TAB_DEFS.map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setTableTab(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      tableTab === tab.key
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow'
                        : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700'
                    }`}
                    aria-pressed={tableTab === tab.key}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto px-5 pb-5">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#DADCE0]">
                      {TABLE_COLS[tableTab].map(col => (
                        <th
                          key={col.field}
                          scope="col"
                          className={`py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider ${
                            col.base ? 'text-indigo-700' : 'text-[#5F6368]'
                          }`}
                        >
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {(TABLE_DATA[tableTab] as Record<string, string>[]).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        {TABLE_COLS[tableTab].map(col => (
                          <td
                            key={col.field}
                            className={`py-2.5 px-3 tabular-nums ${
                              col.base ? 'font-black text-indigo-700' : 'font-semibold text-[#202124]'
                            }`}
                          >
                            {row[col.field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-[#9AA0A6] mt-3">
                  All values validated against exact conversion factors. 1 Nepal Tola = 11.6638 g (FENEGOSIDA). 1 oz (avoirdupois) = 28.349523125 g.
                </p>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 6 — Precious metals & jewelry table
                Nepal Tola × troy oz × pennyweight × carat.
                Placed after the common table; serves gold/
                silver/jewelry audiences specifically.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#FFFDF7]">
                <h2 className="text-lg font-black text-[#202124]">Precious Metal & Jewelry Weight Conversion</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">
                  Nepal Tola, troy ounce, pennyweight and carat — units used for gold, silver and gemstones.
                  Note: troy ounce (31.1034768 g) ≠ avoirdupois ounce (28.349523125 g).
                </p>
              </div>
              <div className="overflow-x-auto px-5 pb-5 pt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-amber-700">Nepal Tola</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Grams (g)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Kilograms (kg)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Troy Ounce (ozt)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Pennyweight (dwt)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Carats (ct)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { tola: '1',   g: '11.6638',  kg: '0.011664', ozt: '0.375',    dwt: '7.5',      ct: '58.319'    },
                      { tola: '5',   g: '58.319',   kg: '0.058319', ozt: '1.875',    dwt: '37.5',     ct: '291.595'   },
                      { tola: '10',  g: '116.638',  kg: '0.116638', ozt: '3.75',     dwt: '75',       ct: '583.19'    },
                      { tola: '50',  g: '583.19',   kg: '0.58319',  ozt: '18.75',    dwt: '375',      ct: '2,915.95'  },
                      { tola: '100', g: '1,166.38', kg: '1.16638',  ozt: '37.5',     dwt: '750',      ct: '5,831.9'   },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-2.5 px-3 font-black text-amber-700 tabular-nums">{row.tola}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#202124] tabular-nums">{row.g}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#202124] tabular-nums">{row.kg}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#202124] tabular-nums">{row.ozt}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#202124] tabular-nums">{row.dwt}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#202124] tabular-nums">{row.ct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-[#9AA0A6] mt-3">
                  1 Nepal Tola = 11.6638 g · 1 Troy oz (ozt) = 31.1034768 g · 1 Pennyweight (dwt) = 1.55517384 g · 1 Carat (ct) = 0.2 g.
                </p>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════
                SECTION 7 — Complete unit reference table
                All 15 units with abbreviation, category and
                gram factor. Placed last — a comprehensive
                reference for curious readers and AI bots.
            ════════════════════════════════════════════════ */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#F8F9FA]">
                <h2 className="text-lg font-black text-[#202124]">All 15 Supported Units — Complete Reference</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">Every unit in this calculator with its abbreviation, category and exact gram equivalent.</p>
              </div>
              <div className="overflow-x-auto px-5 pb-5 pt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#202124]">Unit Name</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Symbol</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Category</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">= Grams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { name: 'Microgram',            abbr: 'µg',    cat: 'Metric',          g: '0.000001'     },
                      { name: 'Milligram',             abbr: 'mg',    cat: 'Metric',          g: '0.001'        },
                      { name: 'Gram',                  abbr: 'g',     cat: 'Metric',          g: '1'            },
                      { name: 'Kilogram',              abbr: 'kg',    cat: 'Metric',          g: '1,000'        },
                      { name: 'Metric Tonne',          abbr: 't',     cat: 'Metric',          g: '1,000,000'    },
                      { name: 'Grain',                 abbr: 'gr',    cat: 'Traditional',     g: '0.06479891'   },
                      { name: 'Carat',                 abbr: 'ct',    cat: 'Gemstone',        g: '0.2'          },
                      { name: 'Pennyweight',           abbr: 'dwt',   cat: 'Precious metals', g: '1.55517384'   },
                      { name: 'Nepal Tola (FENEGOSIDA)', abbr: 'tola', cat: 'Nepal standard', g: '11.6638'      },
                      { name: 'Ounce (avoirdupois)',   abbr: 'oz',    cat: 'Imperial / US',   g: '28.349523125' },
                      { name: 'Troy Ounce',            abbr: 'ozt',   cat: 'Precious metals', g: '31.1034768'   },
                      { name: 'Pound',                 abbr: 'lb',    cat: 'Imperial / US',   g: '453.59237'    },
                      { name: 'Stone',                 abbr: 'st',    cat: 'Imperial',        g: '6,350.29318'  },
                      { name: 'US Short Ton',          abbr: 'US t',  cat: 'US customary',    g: '907,184.74'   },
                      { name: 'Imperial Long Ton',     abbr: 'UK t',  cat: 'Imperial',        g: '1,016,046.91' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-[#202124]">{row.name}</td>
                        <td className="py-2.5 px-3 font-mono text-xs font-bold text-indigo-700">{row.abbr}</td>
                        <td className="py-2.5 px-3 text-[#5F6368] text-xs">{row.cat}</td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#202124] tabular-nums">{row.g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-[#9AA0A6] mt-3">
                  Nepal Tola uses the FENEGOSIDA standard (11.6638 g). Troy ounce and avoirdupois ounce have different factors — they must not be interchanged.
                </p>
              </div>
            </div>

          </div>
        }
        faqs={[
          {
            question: "How many Tola are in 1 kg?",
            answer: "One kilogram equals approximately 85.7353 Nepal-standard Tola, calculated using 1 Tola = 11.6638 grams (FENEGOSIDA standard)."
          },
          {
            question: "How many grams are in 1 Tola?",
            answer: "One Nepal-standard Tola equals exactly 11.6638 grams under the FENEGOSIDA standard used in Nepal."
          },
          {
            question: "How do I convert kilograms to pounds?",
            answer: "Multiply the kilogram value by 2.20462 to get pounds. For example, 1 kg = 2.20462 lb, and 5 kg = 11.02311 lb."
          },
          {
            question: "What is the difference between a troy ounce and an ounce?",
            answer: "A troy ounce (ozt) equals 31.1034768 grams and is used for precious metals such as gold and silver. An ordinary (avoirdupois) ounce equals 28.349523125 grams and is used for everyday weight. They are not interchangeable."
          },
          {
            question: "How many kilograms are in a metric tonne?",
            answer: "One metric tonne equals 1,000 kilograms, or 1,000,000 grams."
          },
          {
            question: "Can I use this to estimate the value of silver by Tola?",
            answer: "Yes. Enter the current silver price per Tola in the Gold Value Estimator card, then enter the weight in the converter. Make sure the price and weight both use the Nepal Tola standard (11.6638 g)."
          },
          {
            question: "Is weight the same as mass?",
            answer: "In physics, mass measures the amount of matter in an object while weight is the force of gravity on that mass. In everyday practical use — including this converter — the two terms are used interchangeably."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
