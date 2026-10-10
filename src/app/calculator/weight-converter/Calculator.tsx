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
  goldPricePerTola: 150000, // NPR
};

export default function WeightConverter() {
  const [state, setState] = useSyncState('weight_converter_v2', DEFAULT_STATE);
  const { value, from, to, goldPricePerTola } = state;
  const [copied, setCopied] = useState(false);
  const [tableTab, setTableTab] = useState<'kg' | 'g' | 'tola' | 'lb'>('kg');

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  // Calculation for the target (To) unit
  const rawTargetValue = useMemo(() => {
    if (isNaN(value) || value < 0) return 0;
    return (value * UNITS[from].factor) / UNITS[to].factor;
  }, [value, from, to]);

  const resultStr = useMemo(() => {
    if (isNaN(value) || value < 0) return '0';
    return rawTargetValue.toLocaleString(undefined, { maximumFractionDigits: 7 });
  }, [value, rawTargetValue]);

  // When user types directly into the Target box (bidirectional conversion)
  const handleTargetChange = (valStr: string) => {
    if (valStr === '') {
      updateState({ value: 0 });
      return;
    }
    const targetNum = Number(valStr);
    if (!isNaN(targetNum) && targetNum >= 0) {
      const sourceNum = (targetNum * UNITS[to].factor) / UNITS[from].factor;
      updateState({ value: Number(sourceNum.toFixed(6)) });
    }
  };

  const goldValue = useMemo(() => {
    if (isNaN(value) || value < 0 || isNaN(goldPricePerTola) || goldPricePerTola < 0) return 0;
    const tolas = (value * UNITS[from].factor) / UNITS['tola'].factor;
    return tolas * goldPricePerTola;
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
    { label: '1 kg → Tola', val: 1, f: 'kg', t: 'tola' },
    { label: '0.5 kg → Tola', val: 0.5, f: 'kg', t: 'tola' },
    { label: '5 kg → Tola', val: 5, f: 'kg', t: 'tola' },
    { label: '1 Tola → Grams', val: 1, f: 'tola', t: 'g' },
    { label: '10 Tola → kg', val: 10, f: 'tola', t: 'kg' },
    { label: '1 kg → lbs', val: 1, f: 'kg', t: 'lb' },
  ];

  // ── Pre-computed table data (validated against UNITS factors) ─────────────
  const TABLE_DATA = {
    kg: [
      { base: '0.1 kg',  g: '100',      lb: '0.22046', tola: '8.5735' },
      { base: '0.25 kg', g: '250',      lb: '0.55116', tola: '21.4338' },
      { base: '0.5 kg',  g: '500',      lb: '1.10231', tola: '42.8677' },
      { base: '1 kg',    g: '1,000',    lb: '2.20462', tola: '85.7353' },
      { base: '2 kg',    g: '2,000',    lb: '4.40925', tola: '171.4707' },
      { base: '5 kg',    g: '5,000',    lb: '11.02311', tola: '428.6768' },
      { base: '10 kg',   g: '10,000',   lb: '22.04623', tola: '857.3535' },
    ],
    g: [
      { base: '1 g',     kg: '0.001',   oz: '0.03527',  tola: '0.08574' },
      { base: '10 g',    kg: '0.01',    oz: '0.35274',  tola: '0.85735' },
      { base: '100 g',   kg: '0.1',     oz: '3.52740',  tola: '8.57354' },
      { base: '500 g',   kg: '0.5',     oz: '17.63698', tola: '42.86768' },
      { base: '1,000 g', kg: '1',       oz: '35.27396', tola: '85.73535' },
    ],
    tola: [
      { base: '1 tola',   g: '11.6638',   kg: '0.011664',  oz: '0.41143' },
      { base: '5 tola',   g: '58.319',    kg: '0.058319',  oz: '2.05714' },
      { base: '10 tola',  g: '116.638',   kg: '0.116638',  oz: '4.11428' },
      { base: '50 tola',  g: '583.19',    kg: '0.58319',   oz: '20.57142' },
      { base: '100 tola', g: '1,166.38',  kg: '1.16638',   oz: '41.14284' },
    ],
    lb: [
      { base: '0.5 lb', kg: '0.226796', g: '226.796',  oz: '8' },
      { base: '1 lb',   kg: '0.453592', g: '453.592',  oz: '16' },
      { base: '2 lb',   kg: '0.907185', g: '907.185',  oz: '32' },
      { base: '5 lb',   kg: '2.267962', g: '2,267.962', oz: '80' },
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
      { header: 'Kilograms',          field: 'base', base: true },
      { header: 'Grams (g)',          field: 'g' },
      { header: 'Pounds (lb)',        field: 'lb' },
      { header: 'Nepal Tola',        field: 'tola' },
    ],
    g:    [
      { header: 'Grams',              field: 'base', base: true },
      { header: 'Kilograms (kg)',     field: 'kg' },
      { header: 'Ounces (oz)',        field: 'oz' },
      { header: 'Nepal Tola',        field: 'tola' },
    ],
    tola: [
      { header: 'Nepal Tola',        field: 'base', base: true },
      { header: 'Grams (g)',          field: 'g' },
      { header: 'Kilograms (kg)',     field: 'kg' },
      { header: 'Ounces (oz)',        field: 'oz' },
    ],
    lb:   [
      { header: 'Pounds',             field: 'base', base: true },
      { header: 'Kilograms (kg)',     field: 'kg' },
      { header: 'Grams (g)',          field: 'g' },
      { header: 'Ounces (oz)',        field: 'oz' },
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
          <div className="space-y-4 w-full">
            {/* Quick Conversion Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] shrink-0 mr-1">
                Quick:
              </span>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => updateState({ value: p.val, from: p.f, to: p.t })}
                  className="px-2.5 py-1 rounded-full bg-[#F1F3F4] hover:bg-[#E8F0FE] hover:text-[#1A73E8] text-[#3C4043] font-semibold text-xs whitespace-nowrap transition-colors border border-transparent hover:border-[#BFDBFE]"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Unified 100% Wide Dual-Interactive Converter Card */}
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 sm:gap-4 items-center">
                {/* Box 1: FROM Input */}
                <div className="bg-white border-2 border-[#DADCE0] focus-within:border-[#1A73E8] rounded-xl p-3 sm:p-4 shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368]">
                      From Amount
                    </label>
                    <span className="text-[10px] font-bold text-[#70757A] uppercase">
                      {UNITS[from].short}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={value === 0 ? '' : value}
                      placeholder="0"
                      onChange={e => updateState({ value: e.target.value === '' ? 0 : Number(e.target.value) })}
                      min={0}
                      className="w-full bg-transparent font-mono text-2xl sm:text-3xl font-extrabold text-[#202124] outline-none"
                    />
                    <div className="relative shrink-0 w-36 sm:w-44">
                      <select
                        value={from}
                        onChange={e => updateState({ from: e.target.value })}
                        className="w-full h-10 pl-3 pr-7 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] text-xs sm:text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none cursor-pointer appearance-none truncate"
                      >
                        {Object.entries(UNITS).map(([k, v]) => (
                          <option key={k} value={k}>{v.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368] text-xs">▼</div>
                    </div>
                  </div>
                </div>

                {/* Center Swap Button */}
                <div className="flex justify-center -my-1 md:my-0">
                  <button
                    type="button"
                    onClick={swap}
                    title="Swap conversion units"
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#DADCE0] bg-white hover:bg-[#E8F0FE] hover:border-[#1A73E8] hover:text-[#1A73E8] flex items-center justify-center transition-all shadow-sm text-[#5F6368] group"
                    aria-label="Swap units"
                  >
                    <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>

                {/* Box 2: TO (Result & Interactive Target) */}
                <div className="bg-[#E8F0FE]/70 border-2 border-[#1A73E8] rounded-xl p-3 sm:p-4 shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1967D2]">
                      Converted Result
                    </label>
                    <span className="text-[10px] font-bold text-[#1967D2] uppercase">
                      {UNITS[to].short}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={rawTargetValue === 0 ? '' : Number(rawTargetValue.toFixed(7))}
                      placeholder="0"
                      onChange={e => handleTargetChange(e.target.value)}
                      min={0}
                      className="w-full bg-transparent font-mono text-2xl sm:text-3xl font-extrabold text-[#1967D2] outline-none"
                    />
                    <div className="relative shrink-0 w-36 sm:w-44">
                      <select
                        value={to}
                        onChange={e => updateState({ to: e.target.value })}
                        className="w-full h-10 pl-3 pr-7 rounded-lg border border-[#BFDBFE] bg-white text-xs sm:text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none cursor-pointer appearance-none truncate"
                      >
                        {Object.entries(UNITS).map(([k, v]) => (
                          <option key={k} value={k}>{v.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368] text-xs">▼</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Formula Strip & Quick Copy Action */}
              <div className="pt-3 border-t border-[#DADCE0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#202124] text-sm">
                    {value} {UNITS[from].name} = <span className="text-[#1A73E8] font-mono">{resultStr} {UNITS[to].name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={copyResult}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5F6368] hover:text-[#1A73E8] bg-white border border-[#DADCE0] rounded px-2 py-0.5 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[11px] font-mono text-[#70757A]">
                  Multiplier: × {(UNITS[from].factor / UNITS[to].factor).toFixed(6)}
                </div>
              </div>
            </div>

            {/* Secondary 2-Column Responsive Row (Nepal Gold Standard + Gold Value Estimator) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card A: Nepal Gold Standard & Reference Ratios */}
              <div className="bg-[#FFFDF7] border border-[#FDE68A] rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-700 shrink-0 mt-0.5">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                      Nepal Gold Standard (FENEGOSIDA)
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      In Nepal, precious metals follow the official legal standard: <strong>1 Tola = exactly 11.6638 grams</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60">
                  <div className="p-2 bg-white/90 border border-amber-200/80 rounded-lg text-center">
                    <span className="block text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">1 kg equals</span>
                    <span className="block text-sm font-black text-[#202124]">85.7353 Tola</span>
                  </div>
                  <div className="p-2 bg-white/90 border border-amber-200/80 rounded-lg text-center">
                    <span className="block text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">1 Tola equals</span>
                    <span className="block text-sm font-black text-[#202124]">11.6638 g</span>
                  </div>
                </div>
              </div>

              {/* Card B: Gold Value Estimator */}
              <div className="bg-white border border-[#DADCE0] rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#F1F3F4] pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 bg-amber-50 rounded text-amber-600">
                      <Gem className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#202124]">
                      Gold Value Estimator
                    </span>
                  </div>
                  <span className="text-[10px] text-[#70757A] font-semibold bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#DADCE0]">
                    {currentTolas.toFixed(2)} Tola
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] block">
                    Gold Price (NPR per Tola)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Rs.</span>
                    <input
                      type="number"
                      value={goldPricePerTola === 0 ? '' : goldPricePerTola}
                      onChange={e => updateState({ goldPricePerTola: e.target.value === '' ? 0 : Number(e.target.value) })}
                      className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#DADCE0] text-sm font-bold font-mono text-[#202124] focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      placeholder="150000"
                      min={0}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F3F4] flex items-baseline justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">
                    Estimated Value
                  </span>
                  <span className="text-base sm:text-lg font-black text-amber-700 tracking-tight font-mono">
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
            { label: 'Gold Converter', href: '/calculator/gold-converter/' },
            { label: 'Silver Converter', href: '/calculator/silver-converter/' },
            { label: 'Length Converter', href: '/calculator/length-converter/' },
            { label: 'Area Calculator', href: '/calculator/area-calculator/' },
            { label: 'Nepal Land Converter', href: '/calculator/nepal-land/' },
            { label: 'Universal Unit Converter', href: '/calculator/unit-converter/' }
          ],
        }}
        details={
          <div className="space-y-6">

            {/* ── TABLE 1: Interactive Tabbed Common Conversions ── */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#F8F9FA]">
                <h2 className="text-lg font-black text-[#202124]">Common Weight Conversion Table</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">Select a unit to view its conversions.</p>
              </div>

              {/* Tab Pills */}
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

              {/* Active Table */}
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
                              col.base
                                ? 'font-black text-indigo-700'
                                : 'font-semibold text-[#202124]'
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
                  Values rounded for display. 1 Nepal Tola = 11.6638 g (FENEGOSIDA standard).
                </p>
              </div>
            </div>

            {/* ── TABLE 2: Precious Metal & Jewelry Reference ── */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#FFFDF7]">
                <h2 className="text-lg font-black text-[#202124]">Precious Metal & Jewelry Weight Reference</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">Nepal Tola, troy ounce, pennyweight, carat — used for gold, silver and gemstones.</p>
              </div>
              <div className="overflow-x-auto px-5 pb-5 pt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-amber-700">Nepal Tola</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Grams (g)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Kilograms (kg)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Troy Oz (ozt)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Pennyweight (dwt)</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Carats (ct)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { tola: '1',   g: '11.6638',  kg: '0.011664', ozt: '0.37513', dwt: '7.50251', ct: '58.319' },
                      { tola: '5',   g: '58.319',   kg: '0.058319', ozt: '1.87564', dwt: '37.5128', ct: '291.595' },
                      { tola: '10',  g: '116.638',  kg: '0.116638', ozt: '3.75128', dwt: '75.0256', ct: '583.19' },
                      { tola: '50',  g: '583.19',   kg: '0.58319',  ozt: '18.7564', dwt: '375.128', ct: '2,915.95' },
                      { tola: '100', g: '1,166.38', kg: '1.16638',  ozt: '37.5128', dwt: '750.256', ct: '5,831.9' },
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
                  1 Nepal Tola = 11.6638 g · 1 Troy oz (ozt) = 31.1034768 g · 1 Pennyweight = 1.55517384 g · 1 Carat = 0.2 g.
                  Troy ounce differs from avoirdupois ounce (28.349523125 g).
                </p>
              </div>
            </div>

            {/* ── TABLE 3: Complete Unit Reference ── */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#DADCE0] bg-[#F8F9FA]">
                <h2 className="text-lg font-black text-[#202124]">All Supported Units — Reference Table</h2>
                <p className="text-xs text-[#5F6368] mt-0.5">All 15 units supported by this calculator, with their gram equivalents.</p>
              </div>
              <div className="overflow-x-auto px-5 pb-5 pt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#202124]">Unit Name</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Abbreviation</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Category</th>
                      <th scope="col" className="py-2.5 px-3 text-left text-[11px] font-black uppercase tracking-wider text-[#5F6368]">Grams Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { name: 'Microgram',       abbr: 'µg',    cat: 'Metric',          g: '0.000001' },
                      { name: 'Milligram',        abbr: 'mg',    cat: 'Metric',          g: '0.001' },
                      { name: 'Gram',             abbr: 'g',     cat: 'Metric',          g: '1' },
                      { name: 'Kilogram',         abbr: 'kg',    cat: 'Metric',          g: '1,000' },
                      { name: 'Metric Tonne',     abbr: 't',     cat: 'Metric',          g: '1,000,000' },
                      { name: 'Grain',            abbr: 'gr',    cat: 'Traditional',     g: '0.06479891' },
                      { name: 'Carat',            abbr: 'ct',    cat: 'Gemstone',        g: '0.2' },
                      { name: 'Pennyweight',      abbr: 'dwt',   cat: 'Precious metals', g: '1.55517384' },
                      { name: 'Ounce (avoirdupois)', abbr: 'oz', cat: 'Imperial/US',     g: '28.349523125' },
                      { name: 'Troy Ounce',       abbr: 'ozt',   cat: 'Precious metals', g: '31.1034768' },
                      { name: 'Nepal Tola',      abbr: 'tola',  cat: 'Nepal standard',  g: '11.6638' },
                      { name: 'Pound',            abbr: 'lb',    cat: 'Imperial/US',     g: '453.59237' },
                      { name: 'Stone',            abbr: 'st',    cat: 'Imperial',        g: '6,350.29318' },
                      { name: 'US Short Ton',     abbr: 'US t',  cat: 'US customary',    g: '907,184.74' },
                      { name: 'Imperial Long Ton',abbr: 'UK t',  cat: 'Imperial',        g: '1,016,046.91' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-[#202124]">{row.name}</td>
                        <td className="py-2.5 px-3 font-mono text-xs font-bold text-indigo-700">{row.abbr}</td>
                        <td className="py-2.5 px-3 text-[#5F6368]">{row.cat}</td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#202124] tabular-nums">{row.g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-[#9AA0A6] mt-3">
                  Nepal Tola uses the FENEGOSIDA standard (11.6638 g). Troy ounce and avoirdupois ounce have different factors — do not interchange them.
                </p>
              </div>
            </div>

            {/* ── Editorial Content (kept from before) ── */}
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
