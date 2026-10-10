'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { ArrowLeftRight, Scale, Check, Copy } from 'lucide-react';
import Link from 'next/link';

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

interface CalcState {
  value: string | number;
  from: string;
  to: string;
}

const DEFAULT_STATE: CalcState = {
  value: '',
  from: 'kg',
  to: 'tola',
};

function InteractiveWeightTable() {
  const [selectedUnit, setSelectedUnit] = useState<'kg' | 'g' | 'tola' | 'lb'>('kg');

  const tableData = useMemo(() => {
    switch (selectedUnit) {
      case 'kg':
        return {
          headers: ['Kilograms', 'Grams', 'Pounds', 'Nepal Tola'],
          rows: [
            { c1: '0.1',  c2: '100',    c3: '0.22046',  c4: '8.5735' },
            { c1: '0.25', c2: '250',    c3: '0.55116',  c4: '21.4338' },
            { c1: '0.5',  c2: '500',    c3: '1.10231',  c4: '42.8676' },
            { c1: '1',    c2: '1,000',  c3: '2.20462',  c4: '85.7353' },
            { c1: '2',    c2: '2,000',  c3: '4.40925',  c4: '171.4705' },
            { c1: '5',    c2: '5,000',  c3: '11.02311', c4: '428.6763' },
            { c1: '10',   c2: '10,000', c3: '22.04623', c4: '857.3526' },
          ]
        };
      case 'g':
        return {
          headers: ['Grams', 'Kilograms', 'Pounds', 'Nepal Tola'],
          rows: [
            { c1: '1',     c2: '0.001', c3: '0.00220', c4: '0.0857' },
            { c1: '10',    c2: '0.01',  c3: '0.02205', c4: '0.8574' },
            { c1: '50',    c2: '0.05',  c3: '0.11023', c4: '4.2868' },
            { c1: '100',   c2: '0.1',   c3: '0.22046', c4: '8.5735' },
            { c1: '250',   c2: '0.25',  c3: '0.55116', c4: '21.4338' },
            { c1: '500',   c2: '0.5',   c3: '1.10231', c4: '42.8676' },
            { c1: '1,000', c2: '1',     c3: '2.20462', c4: '85.7353' },
          ]
        };
      case 'tola':
        return {
          headers: ['Nepal Tola', 'Grams', 'Kilograms', 'Pounds'],
          rows: [
            { c1: '1',     c2: '11.6638',  c3: '0.01166', c4: '0.02572' },
            { c1: '5',     c2: '58.319',   c3: '0.05832', c4: '0.12857' },
            { c1: '10',    c2: '116.638',  c3: '0.11664', c4: '0.25714' },
            { c1: '50',    c2: '583.19',   c3: '0.58319', c4: '1.28570' },
            { c1: '100',   c2: '1,166.38', c3: '1.16638', c4: '2.57140' },
            { c1: '500',   c2: '5,831.9',  c3: '5.83190', c4: '12.85700' },
            { c1: '1,000', c2: '11,663.8', c3: '11.6638', c4: '25.71400' },
          ]
        };
      case 'lb':
        return {
          headers: ['Pounds', 'Kilograms', 'Grams', 'Nepal Tola'],
          rows: [
            { c1: '0.5', c2: '0.22680', c3: '226.8',   c4: '19.4444' },
            { c1: '1',   c2: '0.45359', c3: '453.6',   c4: '38.8889' },
            { c1: '2',   c2: '0.90718', c3: '907.2',   c4: '77.7778' },
            { c1: '5',   c2: '2.26796', c3: '2,268.0', c4: '194.4444' },
            { c1: '10',  c2: '4.53592', c3: '4,535.9', c4: '388.8889' },
            { c1: '20',  c2: '9.07185', c3: '9,071.9', c4: '777.7778' },
            { c1: '50',  c2: '22.6796', c3: '22,679.6',c4: '1,944.4444' },
          ]
        };
    }
  }, [selectedUnit]);

  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-1">Weight Conversion Table</h2>
      <p className="text-sm text-[#5F6368] mb-4">Select a base unit to view common conversion reference values.</p>

      {/* Radio Unit Selection */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
        {[
          { key: 'kg', label: 'Kilograms' },
          { key: 'g', label: 'Grams' },
          { key: 'tola', label: 'Tola' },
          { key: 'lb', label: 'Pounds' },
        ].map((unit) => (
          <label key={unit.key} className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#202124]">
            <input
              type="radio"
              name="tableUnit"
              value={unit.key}
              checked={selectedUnit === unit.key}
              onChange={() => setSelectedUnit(unit.key as any)}
              className="w-4 h-4 text-black focus:ring-black border-gray-300 cursor-pointer"
            />
            <span>{unit.label}</span>
          </label>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#DADCE0] rounded-lg mb-4">
        <table className="w-full text-sm border-collapse text-center">
          <thead>
            <tr className="bg-slate-50 border-b border-[#DADCE0]">
              {tableData.headers.map((h, idx) => (
                <th key={idx} scope="col" className="py-2.5 px-4 font-black text-[#202124] text-xs sm:text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F4]">
            {tableData.rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-[#202124] tabular-nums">{row.c1}</td>
                <td className="py-2.5 px-4 text-[#5F6368] tabular-nums">{row.c2}</td>
                <td className="py-2.5 px-4 text-[#5F6368] tabular-nums">{row.c3}</td>
                <td className="py-2.5 px-4 text-[#5F6368] tabular-nums">{row.c4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[#70757A]">
        Illustrative reference values using Nepal-standard 1 Tola = 11.6638 g.
      </p>
    </div>
  );
}

export default function WeightConverter() {
  const [state, setState] = useSyncState<CalcState>('weight_converter_v5', DEFAULT_STATE);
  const { value, from, to } = state;
  const [copied, setCopied] = useState(false);

  const numValue = useMemo(() => {
    if (value === '' || value === null || value === undefined) return 0;
    const n = Number(value);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [value]);

  const updateState = (u: Partial<CalcState>) => setState({ ...state, ...u });

  const rawTargetValue = useMemo(() => {
    if (numValue === 0 && value === '') return 0;
    return (numValue * UNITS[from].factor) / UNITS[to].factor;
  }, [numValue, from, to, value]);

  const resultStr = useMemo(() => {
    if (value === '' || numValue === 0) return '0';
    return rawTargetValue.toLocaleString(undefined, { maximumFractionDigits: 7 });
  }, [value, numValue, rawTargetValue]);

  const handleTargetChange = (valStr: string) => {
    if (valStr === '') {
      updateState({ value: '' });
      return;
    }
    const targetNum = Number(valStr);
    if (!isNaN(targetNum) && targetNum >= 0) {
      const sourceNum = (targetNum * UNITS[to].factor) / UNITS[from].factor;
      updateState({ value: Number(sourceNum.toFixed(6)) });
    }
  };

  const swap = () => { updateState({ from: to, to: from }); };

  const copyResult = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${value || 0} ${UNITS[from].short} = ${resultStr} ${UNITS[to].short}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const PRESETS = [
    { label: '1 kg to Tola',    val: 1,   f: 'kg',   t: 'tola' },
    { label: '0.5 kg to Tola',  val: 0.5, f: 'kg',   t: 'tola' },
    { label: '5 kg to Tola',    val: 5,   f: 'kg',   t: 'tola' },
    { label: '1 Tola to Grams', val: 1,   f: 'tola', t: 'g' },
    { label: '10 Tola to kg',   val: 10,  f: 'tola', t: 'kg' },
    { label: '1 kg to lbs',     val: 1,   f: 'kg',   t: 'lb' },
  ];

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
          <div className="space-y-3 w-full">
            {/* Quick Preset Chips */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] shrink-0">Quick:</span>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => updateState({ value: p.val, from: p.f, to: p.t })}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 text-[#3C4043] font-medium text-xs whitespace-nowrap transition-colors border border-[#DADCE0]"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Converter Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* FROM */}
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#DADCE0] rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors">
                <input
                  type="number"
                  value={value}
                  placeholder="Enter amount"
                  onChange={e => updateState({ value: e.target.value })}
                  min={0}
                  className="flex-1 min-w-0 bg-transparent font-mono text-lg font-bold text-[#202124] outline-none placeholder:text-[#DADCE0]"
                />
                <select
                  value={from}
                  onChange={e => updateState({ from: e.target.value })}
                  className="shrink-0 h-8 pl-2 pr-6 rounded border border-[#DADCE0] bg-slate-50 text-xs font-semibold text-[#202124] outline-none cursor-pointer appearance-none max-w-[150px] truncate"
                >
                  {Object.entries(UNITS).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>

              {/* Swap */}
              <button
                type="button"
                onClick={swap}
                title="Swap units"
                className="self-center h-8 w-8 shrink-0 rounded-full border border-[#DADCE0] bg-white hover:bg-slate-50 flex items-center justify-center transition-all text-[#5F6368]"
                aria-label="Swap units"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>

              {/* TO */}
              <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-[#DADCE0] rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors">
                <input
                  type="number"
                  value={value === '' ? '' : Number(rawTargetValue.toFixed(7))}
                  placeholder="Result"
                  onChange={e => handleTargetChange(e.target.value)}
                  min={0}
                  className="flex-1 min-w-0 bg-transparent font-mono text-lg font-bold text-[#202124] outline-none placeholder:text-[#DADCE0]"
                />
                <select
                  value={to}
                  onChange={e => updateState({ to: e.target.value })}
                  className="shrink-0 h-8 pl-2 pr-6 rounded border border-[#DADCE0] bg-white text-xs font-semibold text-[#202124] outline-none cursor-pointer appearance-none max-w-[150px] truncate"
                >
                  {Object.entries(UNITS).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Formula strip + Copy */}
            <div className="flex items-center justify-between text-xs text-[#70757A] px-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[#202124]">
                  {value || 0} {UNITS[from].short} = <strong className="font-mono">{resultStr} {UNITS[to].short}</strong>
                </span>
                <button
                  type="button"
                  onClick={copyResult}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5F6368] hover:text-[#202124] bg-white border border-[#DADCE0] rounded px-2 py-0.5 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <span className="font-mono text-[11px]">1 {UNITS[from].short} = {(UNITS[from].factor / UNITS[to].factor).toFixed(6)} {UNITS[to].short}</span>
            </div>

          </div>
        }
        details={
          <div className="space-y-6">

            {/* Interactive Weight Table (Radio Selectors) */}
            <InteractiveWeightTable />

            {/* 1. Direct Answer: How Many Tola Are in 1 kg? */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">How Many Tola Are in 1 kg?</h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                One kilogram is approximately <strong className="text-[#202124]">85.7353 Tola</strong> when using the Tola definition of 1 Tola = 11.6638 grams.
              </p>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
                The conversion depends on the Tola standard being used. This result uses the 11.6638-gram definition; other regional definitions may produce a different result.
              </p>

              <h3 className="text-base font-bold text-[#202124] mb-3">Kilograms to Tola Conversion Table</h3>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2">Kilograms (kg)</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2">Tola</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { kg: '0.1 kg', tola: '8.57354' },
                      { kg: '0.25 kg', tola: '21.43384' },
                      { kg: '0.5 kg', tola: '42.86768' },
                      { kg: '1 kg',   tola: '85.73535' },
                      { kg: '2 kg',   tola: '171.47070' },
                      { kg: '5 kg',   tola: '428.67676' },
                      { kg: '10 kg',  tola: '857.35352' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#202124] tabular-nums">{row.kg}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] tabular-nums">{row.tola}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Tola to Kilograms */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">How to Convert Tola to Kilograms</h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                To convert Tola to kilograms using the 11.6638-gram definition, multiply the number of Tola by 11.6638 and divide by 1,000.
              </p>
              <div className="bg-slate-50 border border-[#DADCE0] rounded-lg p-4 mb-6">
                <strong className="text-sm text-[#202124] block mb-1">Formula:</strong>
                <code className="text-sm text-[#202124]">Kilograms = (Tola * 11.6638) / 1,000</code>
              </div>
              
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg mb-4">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2">Tola</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2">Kilograms (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { tola: '1 Tola', kg: '0.0116638 kg' },
                      { tola: '10 Tola', kg: '0.116638 kg' },
                      { tola: '50 Tola', kg: '0.58319 kg' },
                      { tola: '100 Tola', kg: '1.16638 kg' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#202124] tabular-nums">{row.tola}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] tabular-nums">{row.kg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                These examples use the same Tola definition as the preceding table. Results may differ when another regional Tola standard is selected.
              </p>
            </div>

            {/* 3. Common Weight Conversions */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-4">Common Weight Conversions</h2>
              
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg mb-4">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2">Conversion</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider w-1/2 text-right">Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { c: '1 kilogram', e: '1,000 grams' },
                      { c: '1 kilogram', e: 'Approximately 2.20462 pounds' },
                      { c: '1 pound', e: '453.59237 grams' },
                      { c: '1 avoirdupois ounce', e: '28.349523125 grams' },
                      { c: '1 metric tonne', e: '1,000 kilograms' },
                      { c: '1 troy ounce', e: '31.1034768 grams' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#202124]">{row.c}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right">{row.e}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                An avoirdupois ounce is commonly used for everyday weight measurements. A troy ounce is used for precious metals. These units are different and should not be interchanged. See the NIST Guide to the SI for{' '}
                <a href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8" target="_blank" rel="noopener noreferrer" className="text-[#1967D2] hover:underline">conversion factors</a>
                {' '}for these and other commonly used measurement units.
              </p>
            </div>

            {/* 4. Precious-Metal and Jewelry Conversions */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">Precious-Metal and Jewelry Weight Conversion</h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
                Tola, grams, troy ounces, pennyweights, and carats are used in different precious-metal and gemstone contexts. The appropriate unit and Tola definition can vary by market, so confirm the applicable standard before using a conversion for a transaction.
              </p>
              
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg mb-6">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Tola</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Grams (g)</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Kilograms (kg)</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Troy ounces (ozt)</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Pennyweights (dwt)</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Carats (ct)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { tola: '1', g: '11.6638', kg: '0.0116638', ozt: '0.37499', dwt: '7.5', ct: '58.319' },
                      { tola: '5', g: '58.319', kg: '0.058319', ozt: '1.87497', dwt: '37.5', ct: '291.595' },
                      { tola: '10', g: '116.638', kg: '0.116638', ozt: '3.74994', dwt: '75', ct: '583.19' },
                      { tola: '50', g: '583.19', kg: '0.58319', ozt: '18.74970', dwt: '375', ct: '2,915.95' },
                      { tola: '100', g: '1,166.38', kg: '1.16638', ozt: '37.49940', dwt: '750', ct: '5,831.9' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.tola}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.g}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.kg}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.ozt}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.dwt}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.ct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="font-bold text-[#202124] mb-2 text-sm">Reference factors used in this table:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#5F6368] mb-8">
                <li>1 Tola = 11.6638 grams for the Tola definition shown.</li>
                <li>1 troy ounce = 31.1034768 grams.</li>
                <li>1 pennyweight = 1.55517384 grams.</li>
                <li>1 carat = 0.2 grams.</li>
              </ul>

              <h3 className="text-lg font-bold text-[#202124] mb-2">Gold and Silver Conversions</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                For dedicated gold and silver weight conversions, use the{' '}
                <Link href="/calculator/gold-converter/" className="text-[#1967D2] hover:underline">gold converter</Link>
                {' '}or the{' '}
                <Link href="/calculator/silver-converter/" className="text-[#1967D2] hover:underline">silver converter</Link>
                . These tools are designed specifically for precious-metal weights and use the same Tola standard as this converter.
              </p>
            </div>

            {/* 5. All Supported Weight Units */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">All Supported Weight Units</h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
                The converter supports all 15 units below in both conversion directions.
              </p>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#DADCE0]">
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider">Unit</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider">Symbol</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider">Category</th>
                      <th scope="col" className="py-2.5 px-4 font-black text-[#5F6368] uppercase text-[11px] tracking-wider text-right">Equivalent in grams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {[
                      { u: 'Microgram', s: 'µg', c: 'Metric', g: '0.000001' },
                      { u: 'Milligram', s: 'mg', c: 'Metric', g: '0.001' },
                      { u: 'Gram', s: 'g', c: 'Metric', g: '1' },
                      { u: 'Kilogram', s: 'kg', c: 'Metric', g: '1,000' },
                      { u: 'Metric tonne', s: 't', c: 'Metric', g: '1,000,000' },
                      { u: 'Grain', s: 'gr', c: 'Traditional', g: '0.06479891' },
                      { u: 'Carat', s: 'ct', c: 'Gemstone', g: '0.2' },
                      { u: 'Pennyweight', s: 'dwt', c: 'Precious metals', g: '1.55517384' },
                      { u: 'Tola using 11.6638 g definition', s: 'tola', c: 'Regional unit', g: '11.6638' },
                      { u: 'Avoirdupois ounce', s: 'oz', c: 'US / Imperial', g: '28.349523125' },
                      { u: 'Troy ounce', s: 'ozt', c: 'Precious metals', g: '31.1034768' },
                      { u: 'Pound', s: 'lb', c: 'US / Imperial', g: '453.59237' },
                      { u: 'Stone', s: 'st', c: 'Imperial', g: '6,350.29318' },
                      { u: 'US short ton', s: 'US ton', c: 'US customary', g: '907,184.74' },
                      { u: 'Imperial long ton', s: 'long ton', c: 'Imperial', g: '1,016,046.91' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#202124]">{row.u}</td>
                        <td className="py-2.5 px-4 text-[#5F6368]">{row.s}</td>
                        <td className="py-2.5 px-4 text-[#5F6368]">{row.c}</td>
                        <td className="py-2.5 px-4 font-semibold text-[#202124] text-right tabular-nums">{row.g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. How to Use the Weight Converter */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">How to Use the Weight Converter</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-[#5F6368] leading-relaxed">
                <li>Enter the amount you want to convert.</li>
                <li>Select the source unit and the target unit.</li>
                <li>Read the converted result.</li>
                <li>Use the swap control to reverse the selected units.</li>
                <li>If supported, enter a value directly into either amount field to convert in the opposite direction.</li>
                <li>To estimate precious-metal value, enter the applicable price per Tola in the estimator.</li>
              </ol>
            </div>

            {/* 7. Weight Conversion Formula */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">Weight Conversion Formula</h2>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                The converter can use grams as an internal base unit. To convert between two units, multiply the input value by the source unit's gram factor, then divide by the target unit's gram factor.
              </p>
              <div className="bg-slate-50 border border-[#DADCE0] rounded-lg p-3 mb-4">
                <code className="text-sm text-[#202124]">Result = (Input value * Source factor in grams) / Target factor in grams</code>
              </div>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-2">Examples using the relevant conversion factors:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F6368] leading-relaxed">
                <li>Kilograms to grams: multiply by 1,000.</li>
                <li>Kilograms to pounds: multiply by approximately 2.20462.</li>
                <li>Kilograms to Tola using the 11.6638-gram definition: divide 1,000 by 11.6638 to obtain approximately 85.73535 Tola per kilogram.</li>
              </ul>
            </div>

            {/* 8. Frequently Asked Questions */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">How many Tola are in 1 kg?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    One kilogram is approximately <strong className="text-[#202124]">85.7353 Tola</strong> when using a Tola definition of 11.6638 grams. The result may differ if a different regional Tola standard is used.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">How many grams are in 1 Tola?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    Using the 11.6638-gram Tola definition, <strong className="text-[#202124]">1 Tola = 11.6638 grams</strong>. Check which Tola standard applies when converting precious-metal weights.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">How do I convert kilograms to pounds?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                    Multiply the weight in kilograms by <strong className="text-[#202124]">2.20462262</strong> to convert it to pounds.
                  </p>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                    <strong className="text-[#202124]">Formula:</strong> Pounds = Kilograms * 2.20462262
                  </p>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    For example, 5 kg is approximately 11.0231 pounds.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">What is the difference between a troy ounce and an ounce?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    A standard avoirdupois ounce equals approximately <strong className="text-[#202124]">28.3495 grams</strong>, while a troy ounce equals approximately <strong className="text-[#202124]">31.1035 grams</strong>. Troy ounces are commonly used to measure precious metals such as gold and silver; avoirdupois ounces are used for everyday weight measurements.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">How many kilograms are in a metric tonne?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    One metric tonne equals <strong className="text-[#202124]">1,000 kilograms</strong>. For example, 2 metric tonnes equal 2,000 kg. A metric tonne is different from a US short ton and an Imperial long ton.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">Can I use this converter to estimate the value of silver by Tola?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    This converter can convert silver weight between supported units. For silver value in Nepal, check the current{' '}
                    <Link href="/market-rates/silver-price-nepal/" className="text-[#1967D2] hover:underline">silver price in Nepal</Link>
                    . For dedicated silver weight conversion, use the{' '}
                    <Link href="/calculator/silver-converter/" className="text-[#1967D2] hover:underline">silver converter</Link>.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">Is weight the same as mass?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    Not exactly. <strong className="text-[#202124]">Mass</strong> measures the amount of matter in an object, while <strong className="text-[#202124]">weight</strong> is the force of gravity acting on that mass. In everyday use, people often use &quot;weight&quot; to mean mass, and this converter converts{' '}
                    <a href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8" target="_blank" rel="noopener noreferrer" className="text-[#1967D2] hover:underline">mass units</a>
                    {' '}such as kilograms, grams, and pounds.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-4">Related Tools</h2>
              <ul className="space-y-2 text-sm text-[#5F6368]">
                <li>
                  <Link href="/calculator/gold-converter/" className="text-[#1967D2] font-semibold hover:underline">Gold Converter</Link>
                  {' '}&mdash; convert gold weight between grams, tola, troy ounces and more.
                </li>
                <li>
                  <Link href="/calculator/silver-converter/" className="text-[#1967D2] font-semibold hover:underline">Silver Converter</Link>
                  {' '}&mdash; convert silver weight using the same unit set.
                </li>
                <li>
                  <Link href="/market-rates/live-gold-price/" className="text-[#1967D2] font-semibold hover:underline">Live Gold Price</Link>
                  {' '}&mdash; view the current gold price in Nepal.
                </li>
                <li>
                  <Link href="/market-rates/silver-price-nepal/" className="text-[#1967D2] font-semibold hover:underline">Silver Price in Nepal</Link>
                  {' '}&mdash; view the current silver price per tola.
                </li>
                <li>
                  <Link href="/calculator/unit-converter/" className="text-[#1967D2] font-semibold hover:underline">Unit Converter</Link>
                  {' '}&mdash; explore additional unit conversions.
                </li>
                <li>
                  <Link href="/converters/" className="text-[#1967D2] font-semibold hover:underline">All Conversion Tools</Link>
                  {' '}&mdash; browse other available conversion tools.
                </li>
              </ul>
            </div>

          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
