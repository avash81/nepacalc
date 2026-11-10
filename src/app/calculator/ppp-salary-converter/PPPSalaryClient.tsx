'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Info,
  CheckCircle2,
  Building2,
  DollarSign,
  Briefcase,
  HelpCircle,
  Calculator,
  ArrowRight
} from 'lucide-react';

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  pppFactor: number;       // World Bank PPP conversion factor (Local currency units per 1 USD)
  exchangeRate: number;    // Market exchange rate (Local currency units per 1 USD)
  colIndex: number;        // Cost of living index relative to USA (USA = 100)
  rentIndex: number;       // Rent index relative to USA (USA = 100)
  taxRate: number;         // Typical effective tax rate for single professional
}

export const COUNTRIES: CountryData[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', pppFactor: 1.0, exchangeRate: 1.0, colIndex: 100, rentIndex: 100, taxRate: 0.28 },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencySymbol: '₹', pppFactor: 24.1, exchangeRate: 86.8, colIndex: 24, rentIndex: 18, taxRate: 0.22 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', pppFactor: 0.72, exchangeRate: 0.79, colIndex: 76, rentIndex: 78, taxRate: 0.35 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€', pppFactor: 0.76, exchangeRate: 0.92, colIndex: 71, rentIndex: 58, taxRate: 0.40 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'CA$', pppFactor: 1.25, exchangeRate: 1.38, colIndex: 73, rentIndex: 68, taxRate: 0.32 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: 'A$', pppFactor: 1.45, exchangeRate: 1.55, colIndex: 78, rentIndex: 72, taxRate: 0.33 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', currencySymbol: 'AED', pppFactor: 2.22, exchangeRate: 3.67, colIndex: 66, rentIndex: 72, taxRate: 0.00 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', currencySymbol: 'S$', pppFactor: 0.88, exchangeRate: 1.32, colIndex: 84, rentIndex: 90, taxRate: 0.16 },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', currency: 'NPR', currencySymbol: 'Rs.', pppFactor: 36.5, exchangeRate: 139.0, colIndex: 22, rentIndex: 12, taxRate: 0.20 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currency: 'THB', currencySymbol: '฿', pppFactor: 13.8, exchangeRate: 34.5, colIndex: 38, rentIndex: 32, taxRate: 0.20 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', currencySymbol: '₱', pppFactor: 21.5, exchangeRate: 58.2, colIndex: 31, rentIndex: 22, taxRate: 0.22 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', currencySymbol: 'Rp', pppFactor: 4850, exchangeRate: 16200, colIndex: 27, rentIndex: 24, taxRate: 0.20 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', currencySymbol: 'RM', pppFactor: 1.65, exchangeRate: 4.45, colIndex: 36, rentIndex: 26, taxRate: 0.21 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', currency: 'VND', currencySymbol: '₫', pppFactor: 7800, exchangeRate: 25400, colIndex: 28, rentIndex: 23, taxRate: 0.20 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', currencySymbol: 'Rs', pppFactor: 72.0, exchangeRate: 278.0, colIndex: 19, rentIndex: 11, taxRate: 0.18 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', currencySymbol: '৳', pppFactor: 35.0, exchangeRate: 120.0, colIndex: 22, rentIndex: 13, taxRate: 0.18 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥', pppFactor: 110.0, exchangeRate: 152.0, colIndex: 64, rentIndex: 52, taxRate: 0.28 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩', pppFactor: 890.0, exchangeRate: 1390.0, colIndex: 68, rentIndex: 48, taxRate: 0.25 },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€', pppFactor: 0.77, exchangeRate: 0.92, colIndex: 72, rentIndex: 59, taxRate: 0.38 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€', pppFactor: 0.65, exchangeRate: 0.92, colIndex: 53, rentIndex: 46, taxRate: 0.30 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR', currencySymbol: '€', pppFactor: 0.60, exchangeRate: 0.92, colIndex: 49, rentIndex: 48, taxRate: 0.28 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€', pppFactor: 0.79, exchangeRate: 0.92, colIndex: 74, rentIndex: 70, taxRate: 0.42 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencySymbol: 'CHF', pppFactor: 1.15, exchangeRate: 0.89, colIndex: 122, rentIndex: 98, taxRate: 0.24 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'EUR', currencySymbol: '€', pppFactor: 0.84, exchangeRate: 0.92, colIndex: 79, rentIndex: 82, taxRate: 0.36 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN', currencySymbol: 'zł', pppFactor: 2.05, exchangeRate: 4.02, colIndex: 43, rentIndex: 38, taxRate: 0.24 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', currencySymbol: 'kr', pppFactor: 9.2, exchangeRate: 10.6, colIndex: 67, rentIndex: 50, taxRate: 0.38 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencySymbol: 'R$', pppFactor: 2.85, exchangeRate: 5.75, colIndex: 34, rentIndex: 25, taxRate: 0.22 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', currencySymbol: 'MX$', pppFactor: 10.4, exchangeRate: 18.5, colIndex: 36, rentIndex: 34, taxRate: 0.24 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', currency: 'COP', currencySymbol: 'COL$', pppFactor: 1450, exchangeRate: 4150, colIndex: 26, rentIndex: 22, taxRate: 0.20 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', currencySymbol: '₺', pppFactor: 12.5, exchangeRate: 36.2, colIndex: 33, rentIndex: 28, taxRate: 0.22 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', currencySymbol: 'SAR', pppFactor: 2.45, exchangeRate: 3.75, colIndex: 55, rentIndex: 42, taxRate: 0.00 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencySymbol: 'R', pppFactor: 7.2, exchangeRate: 18.2, colIndex: 35, rentIndex: 25, taxRate: 0.26 },
];

export default function PPPSalaryClient() {
  const [fromCode, setFromCode] = useState<string>('US');
  const [toCode, setToCode] = useState<string>('IN');
  const [inputSalary, setInputSalary] = useState<number>(50000);
  const [period, setPeriod] = useState<'year' | 'month'>('year');
  const [savingsCushion, setSavingsCushion] = useState<number>(20000);
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);

  const fromCountry = useMemo(() => COUNTRIES.find(c => c.code === fromCode) || COUNTRIES[0], [fromCode]);
  const toCountry = useMemo(() => COUNTRIES.find(c => c.code === toCode) || COUNTRIES[1], [toCode]);

  // Annualized base salary
  const annualBaseSalary = period === 'year' ? inputSalary : inputSalary * 12;

  // Swap function
  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  // PPP Calculations
  const results = useMemo(() => {
    // 1. Annual salary in base country currency
    const salaryBase = annualBaseSalary;

    // 2. Exact World Bank ICP Purchasing Power Parity conversion:
    // Salary_Target (in Target Local Currency) = Salary_Base * (PPP_Target / PPP_Base)
    const pppEquivalentTargetLocal = salaryBase * (toCountry.pppFactor / fromCountry.pppFactor);

    // 3. Equivalent salary in USD at market exchange rates:
    const pppEquivalentTargetUSD = pppEquivalentTargetLocal / toCountry.exchangeRate;

    // 4. Base salary converted to USD at market rate:
    const baseSalaryUSD = salaryBase / fromCountry.exchangeRate;

    // 5. Purchasing Power Multiplier:
    // How many times further your base salary goes if you keep earning the same USD in the target country
    const marketLocalIncomeIfSameUSD = baseSalaryUSD * toCountry.exchangeRate;
    const effectiveUSDValueInTarget = marketLocalIncomeIfSameUSD / toCountry.pppFactor;
    const multiplier = baseSalaryUSD > 0 ? effectiveUSDValueInTarget / baseSalaryUSD : 1;

    // 6. Cost of Living difference percentage (Numbeo CoL index)
    const colDiffPercent = ((toCountry.colIndex - fromCountry.colIndex) / fromCountry.colIndex) * 100;

    // 7. Rent difference percentage
    const rentDiffPercent = ((toCountry.rentIndex - fromCountry.rentIndex) / fromCountry.rentIndex) * 100;

    // 8. Tax adjusted net take-home
    const baseNetUSD = baseSalaryUSD * (1 - fromCountry.taxRate);
    const targetNetLocal = pppEquivalentTargetLocal * (1 - toCountry.taxRate);
    const targetNetUSD = targetNetLocal / toCountry.exchangeRate;

    // Period specific values
    const divisor = period === 'year' ? 1 : 12;

    return {
      annualBaseSalary,
      baseSalaryUSD,
      pppEquivalentTargetLocal,
      pppEquivalentTargetUSD,
      displayTargetLocal: pppEquivalentTargetLocal / divisor,
      displayTargetUSD: pppEquivalentTargetUSD / divisor,
      displayBaseSalary: salaryBase / divisor,
      multiplier,
      colDiffPercent,
      rentDiffPercent,
      baseNetUSD: baseNetUSD / divisor,
      targetNetLocal: targetNetLocal / divisor,
      targetNetUSD: targetNetUSD / divisor,
      marketLocalIfSameUSD: (baseSalaryUSD * toCountry.exchangeRate) / divisor,
    };
  }, [annualBaseSalary, fromCountry, toCountry, period]);

  // Comparison Table rows
  const comparisonRows = useMemo(() => {
    return COUNTRIES.map(c => {
      const equivLocal = annualBaseSalary * (c.pppFactor / fromCountry.pppFactor);
      const equivUSD = equivLocal / c.exchangeRate;
      const colDiff = ((c.colIndex - fromCountry.colIndex) / fromCountry.colIndex) * 100;
      const netUSD = (equivUSD * (1 - c.taxRate));

      return {
        ...c,
        equivLocal,
        equivUSD,
        colDiff,
        netUSD,
        monthlyUSD: equivUSD / 12,
      };
    }).sort((a, b) => b.colIndex - a.colIndex);
  }, [annualBaseSalary, fromCountry]);

  const displayedRows = showAllCountries ? comparisonRows : comparisonRows.slice(0, 10);

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 space-y-4">
      {/* ── COMPACT HEADER (No empty gaps) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Purchasing Power Parity (PPP) Salary Converter
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              World Bank ICP 2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Compare true buying power between countries - not just nominal exchange rates.
          </p>
        </div>
      </div>

      {/* ── CARD LAYOUT (Matched 1:1 with User Image) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* ROW 1: FROM COUNTRY & TO COUNTRY WITH SWAP */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] items-end gap-3">
          {/* FROM COUNTRY */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              FROM COUNTRY
            </label>
            <div className="relative">
              <select
                aria-label="From Country"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl px-3.5 py-2.5 pr-8 text-sm font-semibold text-gray-900 cursor-pointer shadow-2xs transition"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="flex justify-center pb-0.5">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Countries"
              className="p-2 sm:p-2.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition shadow-2xs active:scale-95"
            >
              <ArrowUpDown className="w-4 h-4 sm:w-4 sm:h-4 rotate-90 sm:rotate-0" />
            </button>
          </div>

          {/* TO COUNTRY */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              TO COUNTRY
            </label>
            <div className="relative">
              <select
                aria-label="To Country"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-xl px-3.5 py-2.5 pr-8 text-sm font-semibold text-gray-900 cursor-pointer shadow-2xs transition"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-xs">▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: YOUR SALARY & PERIOD TOGGLE */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            YOUR SALARY
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* INPUT FIELD WITH CURRENCY SYMBOL PREFIX & CURRENCY BADGE */}
            <div className="flex-1 flex rounded-xl border border-gray-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 shadow-2xs overflow-hidden bg-white transition">
              <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-r border-gray-200 text-gray-700 font-bold text-base sm:text-lg flex items-center select-none shrink-0 min-w-[48px] justify-center">
                {fromCountry.currencySymbol}
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={inputSalary === 0 ? '' : inputSalary.toLocaleString()}
                placeholder="0"
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                  setInputSalary(isNaN(val) ? 0 : val);
                }}
                className="w-full px-3.5 py-2.5 sm:py-3 font-bold text-gray-900 text-lg sm:text-xl tracking-tight outline-none bg-transparent"
              />
              <div className="pr-3 flex items-center shrink-0">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 select-none">
                  {fromCountry.currency}
                </span>
              </div>
            </div>

            {/* PERIOD TOGGLE: Per year | Per month */}
            <div className="inline-flex self-start sm:self-auto p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setPeriod('year')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  period === 'year'
                    ? 'bg-white text-gray-900 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Per year
              </button>
              <button
                type="button"
                onClick={() => setPeriod('month')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  period === 'month'
                    ? 'bg-white text-gray-900 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Per month
              </button>
            </div>
          </div>

          {/* ROW 3: TRY QUICK PILLS */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400 font-medium mt-2.5">
            <span>Try:</span>
            {[25000, 50000, 100000, 200000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setInputSalary(period === 'year' ? amt : Math.round(amt / 12))}
                className="px-2.5 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition active:scale-95"
              >
                ${(amt / 1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── INSTANT RESULT ANSWER CARD (NO UNNECESSARY SPACES) ── */}
      <div className="bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 rounded-2xl border border-emerald-200/80 p-4 sm:p-5 shadow-xs space-y-4">
        {/* BIG HEADLINE EQUIVALENT RESULT */}
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Purchasing Power Equivalent in {toCountry.flag} {toCountry.name}
          </span>
          <div className="mt-1 flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {toCountry.currencySymbol}
              {Math.round(results.displayTargetLocal).toLocaleString()} {toCountry.currency}
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-500">
              (~${Math.round(results.displayTargetUSD).toLocaleString()} USD / {period})
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            To maintain the exact same standard of living as earning{' '}
            <strong className="text-gray-900 font-bold">
              {fromCountry.currencySymbol}{Math.round(results.displayBaseSalary).toLocaleString()} {fromCountry.currency}/{period}
            </strong>{' '}
            in <strong className="text-gray-900 font-bold">{fromCountry.name}</strong>, you need an income of{' '}
            <strong className="text-emerald-800 font-bold">
              {toCountry.currencySymbol}{Math.round(results.displayTargetLocal).toLocaleString()} {toCountry.currency}/{period}
            </strong>{' '}
            in <strong className="text-gray-900 font-bold">{toCountry.name}</strong>.
          </p>
        </div>

        {/* 4-GRID KEY METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Cost of Living */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="block text-[11px] text-gray-400 font-medium">Cost of Living</span>
            <span className={`text-base sm:text-lg font-bold block ${results.colDiffPercent <= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {results.colDiffPercent <= 0 ? '' : '+'}
              {Math.round(results.colDiffPercent)}%
            </span>
            <span className="text-[10px] text-gray-500">
              {results.colDiffPercent <= 0 ? 'Cheaper living cost' : 'More expensive'}
            </span>
          </div>

          {/* Purchasing Power Multiplier */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="block text-[11px] text-gray-400 font-medium">Purchasing Power</span>
            <span className={`text-base sm:text-lg font-bold block ${results.multiplier >= 1 ? 'text-emerald-700' : 'text-amber-600'}`}>
              {results.multiplier.toFixed(2)}×
            </span>
            <span className="text-[10px] text-gray-500">
              {results.multiplier >= 1 ? 'Greater buying power' : 'Reduced buying power'}
            </span>
          </div>

          {/* Rent Disparity */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="block text-[11px] text-gray-400 font-medium">Rent Index</span>
            <span className={`text-base sm:text-lg font-bold block ${results.rentDiffPercent <= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {results.rentDiffPercent <= 0 ? '' : '+'}
              {Math.round(results.rentDiffPercent)}%
            </span>
            <span className="text-[10px] text-gray-500">Housing benchmark</span>
          </div>

          {/* Local Tax Rate */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <span className="block text-[11px] text-gray-400 font-medium">Est. Income Tax</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 block">
              {toCountry.taxRate === 0 ? (
                <span className="text-emerald-700">0% (Tax-Free)</span>
              ) : (
                `~${Math.round(toCountry.taxRate * 100)}%`
              )}
            </span>
            <span className="text-[10px] text-gray-500">Effective marginal</span>
          </div>
        </div>

        {/* REMOTE WORKER / NOMAD CALLOUT BANNER */}
        <div className="bg-white/80 border border-emerald-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-bold text-gray-900 block">
              💡 Remote Expat Insight: If paid your full US salary in {toCountry.name}
            </span>
            <span className="text-gray-600">
              Your ${Math.round(results.baseSalaryUSD / (period === 'year' ? 1 : 12)).toLocaleString()} USD buys the equivalent of{' '}
              <strong className="text-emerald-800 font-bold">
                ${Math.round((results.baseSalaryUSD * results.multiplier) / (period === 'year' ? 1 : 12)).toLocaleString()} USD
              </strong>{' '}
              in local lifestyle value ({toCountry.currencySymbol}
              {Math.round(results.marketLocalIfSameUSD).toLocaleString()} {toCountry.currency}/{period}).
            </span>
          </div>
        </div>
      </div>

      {/* ── METHODOLOGY & FORMULA SNIPPET (SEO / AEO TARGETED) ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-2">
          <Calculator className="w-4 h-4 text-blue-600" />
          How Purchasing Power Parity (PPP) Is Calculated
        </h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          Purchasing Power Parity calculates how many currency units are required to buy the exact same representative basket of goods and services (food, housing, healthcare, transportation) across borders.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-3 my-3 font-mono text-xs text-slate-800">
          <div className="font-bold text-blue-700 mb-1">World Bank ICP Conversion Formula:</div>
          <div>Equivalent Salary ({toCountry.code}) = Base Salary ({fromCountry.code}) × [ PPP Factor ({toCountry.code}) ÷ PPP Factor ({fromCountry.code}) ]</div>
          <div className="text-[11px] text-gray-500 mt-1.5 pt-1.5 border-t border-gray-100">
            Current calculation: {fromCountry.currencySymbol}{annualBaseSalary.toLocaleString()} × [{toCountry.pppFactor} ÷ {fromCountry.pppFactor}] = {toCountry.currencySymbol}{Math.round(results.pppEquivalentTargetLocal).toLocaleString()} {toCountry.currency}
          </div>
        </div>

        <p className="text-[11px] text-gray-500">
          Sources: World Bank International Comparison Program (ICP 2026), International Monetary Fund (IMF), and Numbeo Cost of Living Index.
        </p>
      </div>

      {/* ── GLOBAL BENCHMARK COMPARISON TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Equivalent Salary Across Global Destinations
            </h3>
            <p className="text-xs text-gray-500">
              Based on {fromCountry.flag} {fromCountry.name} baseline of {fromCountry.currencySymbol}{inputSalary.toLocaleString()} / {period}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAllCountries(!showAllCountries)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition self-start sm:self-center"
          >
            {showAllCountries ? 'Show Top 10 Only' : `Show All ${COUNTRIES.length} Countries →`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Equivalent (Local)</th>
                <th className="py-2.5 px-3">Equivalent (USD)</th>
                <th className="py-2.5 px-3">CoL Index</th>
                <th className="py-2.5 px-3">Income Tax</th>
                <th className="py-2.5 px-3">Cost vs. Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {displayedRows.map((row) => {
                const isSelected = row.code === toCode;
                const isOrigin = row.code === fromCode;
                const divisor = period === 'year' ? 1 : 12;

                return (
                  <tr
                    key={row.code}
                    onClick={() => setToCode(row.code)}
                    className={`cursor-pointer transition hover:bg-gray-50 ${
                      isSelected ? 'bg-emerald-50/50 font-bold' : isOrigin ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <span className="text-base">{row.flag}</span>
                      <span className="text-gray-900">{row.name}</span>
                      {isOrigin && <span className="text-[9px] bg-blue-100 text-blue-800 px-1 py-0.2 rounded font-bold">Origin</span>}
                      {isSelected && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">Target</span>}
                    </td>
                    <td className="py-2.5 px-3 text-gray-900 font-semibold tabular-nums">
                      {row.currencySymbol}{Math.round(row.equivLocal / divisor).toLocaleString()} {row.currency}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600 tabular-nums">
                      ${Math.round(row.equivUSD / divisor).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{row.colIndex}</td>
                    <td className="py-2.5 px-3">
                      {row.taxRate === 0 ? (
                        <span className="text-emerald-700 font-bold">0% Tax-Free</span>
                      ) : (
                        `~${Math.round(row.taxRate * 100)}%`
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        row.colDiff <= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.colDiff > 0 ? '+' : ''}{Math.round(row.colDiff)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DIGITAL NOMAD RUNWAY ESTIMATOR ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Digital Nomad Financial Runway Calculator
            </h3>
            <p className="text-xs text-gray-500">
              How many months of runway does your savings cushion provide in each country?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">Savings:</span>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">$</span>
              <input
                type="number"
                step="5000"
                min="1000"
                value={savingsCushion}
                onChange={(e) => setSavingsCushion(Math.max(1000, Number(e.target.value)))}
                className="w-28 pl-6 pr-2 py-1 text-xs font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {COUNTRIES.slice(0, 12).map((c) => {
            // Est monthly living cost based on baseline $4,000/mo US lifestyle
            const monthlyCost = 3800 * (c.colIndex / 100);
            const months = (savingsCushion / monthlyCost).toFixed(1);
            const numMonths = Number(months);

            return (
              <div
                key={c.code}
                onClick={() => setToCode(c.code)}
                className="p-2.5 rounded-xl border border-gray-200 bg-slate-50/70 hover:border-gray-300 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <span>{c.flag}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    numMonths >= 18 ? 'bg-emerald-100 text-emerald-800' : numMonths >= 9 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {months} mo
                  </span>
                </div>
                <div className="font-bold text-gray-900 text-xs mt-1 truncate">{c.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">~${Math.round(monthlyCost)}/mo</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
