'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowUpDown,
  RotateCcw,
  Copy,
  Check,
  Info,
  Calculator,
  ArrowRight
} from 'lucide-react';

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  pppFactor: number;       // World Bank private consumption PPP conversion factor (LCU per int'l $)
  exchangeRate: number;    // Market exchange rate (LCU per 1 USD)
  colIndex: number;        // Cost of Living index relative to USA (USA = 100)
  rentIndex: number;       // Rent index relative to USA (USA = 100)
  taxRate: number;         // Typical effective income tax estimate for median professional
}

export const COUNTRIES: CountryData[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', pppFactor: 1.0, exchangeRate: 1.0, colIndex: 100, rentIndex: 100, taxRate: 0.28 },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencySymbol: '₹', pppFactor: 23.0, exchangeRate: 86.8, colIndex: 24, rentIndex: 18, taxRate: 0.22 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', pppFactor: 0.72, exchangeRate: 0.79, colIndex: 76, rentIndex: 78, taxRate: 0.35 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€', pppFactor: 0.76, exchangeRate: 0.92, colIndex: 71, rentIndex: 58, taxRate: 0.40 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'CA$', pppFactor: 1.25, exchangeRate: 1.38, colIndex: 73, rentIndex: 68, taxRate: 0.32 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: 'A$', pppFactor: 1.45, exchangeRate: 1.55, colIndex: 78, rentIndex: 72, taxRate: 0.33 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', currencySymbol: 'AED', pppFactor: 2.22, exchangeRate: 3.67, colIndex: 66, rentIndex: 72, taxRate: 0.00 },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'QAR', currencySymbol: 'QR', pppFactor: 2.15, exchangeRate: 3.64, colIndex: 56, rentIndex: 54, taxRate: 0.00 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', currencySymbol: 'SAR', pppFactor: 2.45, exchangeRate: 3.75, colIndex: 55, rentIndex: 42, taxRate: 0.00 },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currency: 'KWD', currencySymbol: 'KD', pppFactor: 0.17, exchangeRate: 0.31, colIndex: 48, rentIndex: 38, taxRate: 0.00 },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', currency: 'BHD', currencySymbol: 'BD', pppFactor: 0.19, exchangeRate: 0.38, colIndex: 52, rentIndex: 40, taxRate: 0.00 },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', currency: 'OMR', currencySymbol: 'OMR', pppFactor: 0.21, exchangeRate: 0.38, colIndex: 46, rentIndex: 32, taxRate: 0.00 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', currencySymbol: 'S$', pppFactor: 0.88, exchangeRate: 1.32, colIndex: 84, rentIndex: 90, taxRate: 0.16 },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', currency: 'NPR', currencySymbol: 'Rs.', pppFactor: 36.5, exchangeRate: 139.0, colIndex: 22, rentIndex: 12, taxRate: 0.20 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currency: 'THB', currencySymbol: '฿', pppFactor: 13.8, exchangeRate: 34.5, colIndex: 38, rentIndex: 32, taxRate: 0.20 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', currencySymbol: '₱', pppFactor: 21.5, exchangeRate: 58.2, colIndex: 31, rentIndex: 22, taxRate: 0.22 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', currencySymbol: 'Rp', pppFactor: 4850, exchangeRate: 16200, colIndex: 27, rentIndex: 24, taxRate: 0.20 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', currencySymbol: 'RM', pppFactor: 1.65, exchangeRate: 4.45, colIndex: 36, rentIndex: 26, taxRate: 0.21 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', currency: 'VND', currencySymbol: '₫', pppFactor: 7800, exchangeRate: 25400, colIndex: 28, rentIndex: 23, taxRate: 0.20 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', currencySymbol: 'Rs', pppFactor: 72.0, exchangeRate: 278.0, colIndex: 19, rentIndex: 11, taxRate: 0.18 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', currencySymbol: '৳', pppFactor: 35.0, exchangeRate: 120.0, colIndex: 22, rentIndex: 13, taxRate: 0.18 },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', currency: 'LKR', currencySymbol: 'Rs', pppFactor: 95.0, exchangeRate: 295.0, colIndex: 26, rentIndex: 14, taxRate: 0.18 },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', currencySymbol: '¥', pppFactor: 4.18, exchangeRate: 7.24, colIndex: 36, rentIndex: 22, taxRate: 0.20 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥', pppFactor: 110.0, exchangeRate: 152.0, colIndex: 64, rentIndex: 52, taxRate: 0.28 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩', pppFactor: 890.0, exchangeRate: 1390.0, colIndex: 68, rentIndex: 48, taxRate: 0.25 },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€', pppFactor: 0.77, exchangeRate: 0.92, colIndex: 72, rentIndex: 59, taxRate: 0.38 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€', pppFactor: 0.69, exchangeRate: 0.92, colIndex: 62, rentIndex: 44, taxRate: 0.35 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€', pppFactor: 0.65, exchangeRate: 0.92, colIndex: 53, rentIndex: 46, taxRate: 0.30 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR', currencySymbol: '€', pppFactor: 0.60, exchangeRate: 0.92, colIndex: 49, rentIndex: 48, taxRate: 0.28 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€', pppFactor: 0.79, exchangeRate: 0.92, colIndex: 74, rentIndex: 70, taxRate: 0.42 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencySymbol: 'CHF', pppFactor: 1.15, exchangeRate: 0.89, colIndex: 122, rentIndex: 98, taxRate: 0.24 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'EUR', currencySymbol: '€', pppFactor: 0.84, exchangeRate: 0.92, colIndex: 79, rentIndex: 82, taxRate: 0.36 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN', currencySymbol: 'zł', pppFactor: 2.05, exchangeRate: 4.02, colIndex: 43, rentIndex: 38, taxRate: 0.24 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', currencySymbol: 'kr', pppFactor: 9.2, exchangeRate: 10.6, colIndex: 67, rentIndex: 50, taxRate: 0.38 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'NOK', currencySymbol: 'kr', pppFactor: 10.8, exchangeRate: 10.9, colIndex: 88, rentIndex: 62, taxRate: 0.36 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', currency: 'DKK', currencySymbol: 'kr.', pppFactor: 7.45, exchangeRate: 6.88, colIndex: 79, rentIndex: 58, taxRate: 0.38 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', currencySymbol: 'NZ$', pppFactor: 1.48, exchangeRate: 1.68, colIndex: 72, rentIndex: 65, taxRate: 0.30 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencySymbol: 'R$', pppFactor: 2.85, exchangeRate: 5.75, colIndex: 34, rentIndex: 25, taxRate: 0.22 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', currencySymbol: 'MX$', pppFactor: 10.4, exchangeRate: 18.5, colIndex: 36, rentIndex: 34, taxRate: 0.24 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', currency: 'COP', currencySymbol: 'COL$', pppFactor: 1450, exchangeRate: 4150, colIndex: 26, rentIndex: 22, taxRate: 0.20 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', currencySymbol: '₺', pppFactor: 12.5, exchangeRate: 36.2, colIndex: 33, rentIndex: 28, taxRate: 0.22 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencySymbol: 'R', pppFactor: 7.2, exchangeRate: 18.2, colIndex: 35, rentIndex: 25, taxRate: 0.26 },
];

export type SalaryFrequency = 'year' | 'month' | 'week' | 'hour';
export type TaxMode = 'gross' | 'net';
export type RemotePayModel = 'ppp' | 'hybrid';

export default function PPPSalaryClient() {
  const [fromCode, setFromCode] = useState<string>('US');
  const [toCode, setToCode] = useState<string>('NP');
  
  // Pre-populated default salary for instant rendering
  const [salaryInput, setSalaryInput] = useState<string>('50,000');
  const [frequency, setFrequency] = useState<SalaryFrequency>('year');
  const [taxMode, setTaxMode] = useState<TaxMode>('gross');
  const [payModel, setPayModel] = useState<RemotePayModel>('ppp');
  const [savingsInput, setSavingsInput] = useState<string>('');
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const fromCountry = useMemo(() => COUNTRIES.find(c => c.code === fromCode) || COUNTRIES[0], [fromCode]);
  const toCountry = useMemo(() => COUNTRIES.find(c => c.code === toCode) || COUNTRIES[1], [toCode]);

  // Numerical salary amount entered
  const parsedSalary = useMemo(() => {
    const raw = salaryInput.replace(/,/g, '').trim();
    if (!raw) return 0;
    const n = parseFloat(raw);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [salaryInput]);

  const hasSalary = parsedSalary > 0;

  // Annualized base salary according to frequency
  const annualBaseSalary = useMemo(() => {
    if (!hasSalary) return 0;
    switch (frequency) {
      case 'hour':
        return parsedSalary * 2080; // 40 hrs/wk * 52 wks
      case 'week':
        return parsedSalary * 52;
      case 'month':
        return parsedSalary * 12;
      case 'year':
      default:
        return parsedSalary;
    }
  }, [parsedSalary, frequency, hasSalary]);

  // Period divisor for display (converting annual amounts back to selected frequency)
  const frequencyDivisor = useMemo(() => {
    switch (frequency) {
      case 'hour':
        return 2080;
      case 'week':
        return 52;
      case 'month':
        return 12;
      case 'year':
      default:
        return 1;
    }
  }, [frequency]);

  const frequencyLabel = useMemo(() => {
    switch (frequency) {
      case 'hour':
        return 'hr';
      case 'week':
        return 'wk';
      case 'month':
        return 'mo';
      case 'year':
      default:
        return 'yr';
    }
  }, [frequency]);

  // Swap function
  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  // Reset to default empty states
  const handleReset = () => {
    setFromCode('US');
    setToCode('NP');
    setSalaryInput('');
    setFrequency('year');
    setTaxMode('gross');
    setPayModel('ppp');
    setSavingsInput('');
  };

  // Calculations
  const results = useMemo(() => {
    if (!hasSalary) {
      return {
        annualBaseSalary: 0,
        baseSalaryUSD: 0,
        displayBaseSalary: 0,
        pppEquivalentTargetLocal: 0,
        displayTargetLocal: 0,
        multiplier: 1,
        colDiffPercent: ((toCountry.colIndex - fromCountry.colIndex) / fromCountry.colIndex) * 100,
        rentDiffPercent: ((toCountry.rentIndex - fromCountry.rentIndex) / fromCountry.rentIndex) * 100,
        marketLocalIfSameUSD: 0,
        displayMarketLocal: 0,
        hybridTargetLocal: 0,
        displayHybridTargetLocal: 0,
        displayActiveTargetLocal: 0,
        fromTaxRate: fromCountry.taxRate,
        toTaxRate: toCountry.taxRate,
      };
    }

    // Adjust for tax mode if net is selected
    const salaryBaseAnnual = annualBaseSalary;
    const baseEffectiveRate = fromCountry.taxRate;
    const targetEffectiveRate = toCountry.taxRate;

    // 1. World Bank PPP Conversion:
    // Salary_Target (in Target Local Currency) = Salary_Base * (PPP_Target / PPP_Base)
    const rawPppEquivalentTargetLocal = salaryBaseAnnual * (toCountry.pppFactor / fromCountry.pppFactor);

    // If net mode is chosen: adjust to ensure post-tax take-home parity
    const pppEquivalentTargetLocal = taxMode === 'net'
      ? (rawPppEquivalentTargetLocal * (1 - baseEffectiveRate)) / Math.max(0.05, 1 - targetEffectiveRate)
      : rawPppEquivalentTargetLocal;

    // 2. Base salary in USD at market exchange rates:
    const baseSalaryUSD = salaryBaseAnnual / fromCountry.exchangeRate;

    // 3. Nominal Market Exchange Conversion (if cash is physically converted via bank forex):
    const marketLocalIfSameUSD = baseSalaryUSD * toCountry.exchangeRate;

    // 4. Hybrid 50/50 model: average of nominal market forex and local PPP equivalent
    const hybridTargetLocal = (pppEquivalentTargetLocal + marketLocalIfSameUSD) / 2;

    // Selected active display target based on pay model
    const activeTargetAnnual = payModel === 'hybrid' ? hybridTargetLocal : pppEquivalentTargetLocal;

    // 5. Purchasing Power Multiplier:
    // How many times further your origin salary goes if converted at forex and spent locally
    const effectiveUSDValueInTarget = marketLocalIfSameUSD / toCountry.pppFactor;
    const multiplier = baseSalaryUSD > 0 ? effectiveUSDValueInTarget / baseSalaryUSD : 1;

    // 6. Cost of Living & Rent difference percentages
    const colDiffPercent = ((toCountry.colIndex - fromCountry.colIndex) / fromCountry.colIndex) * 100;
    const rentDiffPercent = ((toCountry.rentIndex - fromCountry.rentIndex) / fromCountry.rentIndex) * 100;

    return {
      annualBaseSalary: salaryBaseAnnual,
      baseSalaryUSD,
      displayBaseSalary: parsedSalary,
      pppEquivalentTargetLocal,
      displayTargetLocal: pppEquivalentTargetLocal / frequencyDivisor,
      multiplier,
      colDiffPercent,
      rentDiffPercent,
      marketLocalIfSameUSD,
      displayMarketLocal: marketLocalIfSameUSD / frequencyDivisor,
      hybridTargetLocal,
      displayHybridTargetLocal: hybridTargetLocal / frequencyDivisor,
      displayActiveTargetLocal: activeTargetAnnual / frequencyDivisor,
      fromTaxRate: baseEffectiveRate,
      toTaxRate: targetEffectiveRate,
    };
  }, [annualBaseSalary, fromCountry, toCountry, hasSalary, parsedSalary, frequencyDivisor, taxMode, payModel]);

  // Copy Summary handler
  const handleCopy = () => {
    if (!hasSalary) return;
    const text = `NepaCalc PPP Salary Comparison:
Origin: ${fromCountry.name} (${fromCountry.currencySymbol}${parsedSalary.toLocaleString()} / ${frequencyLabel} ${taxMode.toUpperCase()})
Destination: ${toCountry.name}
Model: ${payModel === 'hybrid' ? '50/50 Hybrid Remote Model' : '100% Local PPP Target'}
Equivalent Salary: ${toCountry.currencySymbol}${Math.round(results.displayActiveTargetLocal).toLocaleString()} ${toCountry.currency} / ${frequencyLabel}
Nominal Market Forex Value: ${toCountry.currencySymbol}${Math.round(results.displayMarketLocal).toLocaleString()} ${toCountry.currency}
Purchasing Power Advantage: ${results.multiplier.toFixed(2)}x
Calculated at https://nepacalc.com/calculator/ppp-salary-converter/`;
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Dynamic quick pills tailored to fromCountry currency scale
  const quickAmounts = useMemo(() => {
    if (['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'NZD'].includes(fromCountry.currency)) {
      return frequency === 'hour'
        ? [25, 40, 60, 100]
        : frequency === 'month'
        ? [3000, 5000, 8000, 12000]
        : [35000, 50000, 75000, 100000];
    } else if (['NPR', 'INR', 'PKR', 'BDT', 'LKR'].includes(fromCountry.currency)) {
      return frequency === 'month'
        ? [30000, 50000, 100000, 200000]
        : [400000, 800000, 1500000, 2500000];
    } else if (['KWD', 'BHD', 'OMR'].includes(fromCountry.currency)) {
      return frequency === 'month'
        ? [300, 600, 1000, 1800]
        : [4000, 7500, 12000, 20000];
    } else if (['QAR', 'AED', 'SAR'].includes(fromCountry.currency)) {
      return frequency === 'month'
        ? [4000, 8000, 15000, 25000]
        : [50000, 100000, 180000, 300000];
    } else if (['JPY', 'KRW'].includes(fromCountry.currency)) {
      return frequency === 'month'
        ? [300000, 500000, 800000, 1200000]
        : [4000000, 6000000, 9000000, 15000000];
    }
    return [25000, 50000, 75000, 100000];
  }, [fromCountry.currency, frequency]);

  // Comparison Table rows (uses entered salary or baseline benchmark of $50k USD equivalent if empty)
  const comparisonRows = useMemo(() => {
    const baselineUSD = hasSalary ? results.baseSalaryUSD : 50000;
    const baselineOrigin = hasSalary ? annualBaseSalary : (50000 * fromCountry.exchangeRate);

    return COUNTRIES.map(c => {
      const rawEquivLocal = baselineOrigin * (c.pppFactor / fromCountry.pppFactor);
      const equivLocal = taxMode === 'net'
        ? (rawEquivLocal * (1 - fromCountry.taxRate)) / Math.max(0.05, 1 - c.taxRate)
        : rawEquivLocal;

      const equivUSD = equivLocal / c.exchangeRate;
      const colDiff = ((c.colIndex - fromCountry.colIndex) / fromCountry.colIndex) * 100;

      return {
        ...c,
        equivLocal,
        equivUSD,
        colDiff,
      };
    }).sort((a, b) => b.colIndex - a.colIndex);
  }, [hasSalary, results.baseSalaryUSD, annualBaseSalary, fromCountry, taxMode]);

  const displayedRows = showAllCountries ? comparisonRows : comparisonRows.slice(0, 10);

  // Digital nomad runway calculation
  const parsedSavings = useMemo(() => {
    const raw = savingsInput.replace(/,/g, '').trim();
    if (!raw) return 0;
    const n = parseFloat(raw);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [savingsInput]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-4 font-sans text-slate-800 font-modern-ui pb-28 sm:pb-16">
      
      {/* ── HEADER ── */}
      <div className="border-b border-slate-200 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Purchasing Power Parity (PPP) Salary Converter
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              World Bank PPP Data &amp; ICP Benchmarks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare true buying power between countries based on World Bank private consumption factors.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Reset calculator to defaults"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          {hasSalary && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition cursor-pointer"
              title="Copy calculation summary"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {/* ── TWO-COLUMN CORE CALCULATOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT COLUMN: SIMPLE & CLEAN INPUTS (2-COLOR SLATE / EMERALD) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Salary &amp; Location
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              WDI Series PA.NUS.PRVT.PP
            </span>
          </div>

          {/* Country Selection with Swap */}
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                From (Current Location)
              </label>
              <select
                aria-label="From Country"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-800 bg-white outline-none focus:border-slate-800 cursor-pointer truncate"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Origin and Destination"
                className="p-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition active:scale-95 cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                To (Destination)
              </label>
              <select
                aria-label="To Country"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold text-slate-800 bg-white outline-none focus:border-slate-800 cursor-pointer truncate"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary Amount Input with Distinct Segmented Flex Container */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Salary in {fromCountry.name}
              </label>
              
              {/* Frequency Selector */}
              <div className="inline-flex rounded-md bg-slate-100 p-0.5 text-xs font-medium">
                {(['year', 'month', 'week', 'hour'] as SalaryFrequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`px-2 py-0.5 rounded capitalize transition cursor-pointer ${
                      frequency === f
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Segmented Flex Input: Zero Overlap with Symbol or Placeholder */}
            <div className="flex rounded-lg border border-slate-300 focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 overflow-hidden bg-white">
              <span className="inline-flex items-center px-3 bg-slate-50 border-r border-slate-300 text-slate-600 font-bold text-sm select-none">
                {fromCountry.currencySymbol}
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={salaryInput}
                onFocus={(e) => e.target.select()}
                placeholder="Enter salary amount"
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  if (raw === '') {
                    setSalaryInput('');
                  } else {
                    setSalaryInput(Number(raw).toLocaleString('en-US'));
                  }
                }}
                className="w-full px-3 py-2 text-base font-bold text-slate-900 outline-none"
              />
              <span className="inline-flex items-center px-3 bg-slate-50 border-l border-slate-300 text-slate-600 font-bold text-xs select-none">
                {fromCountry.currency}
              </span>
            </div>

            {/* Dynamic Quick Pills */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium mt-2">
              <span className="text-[11px] text-slate-400">Quick:</span>
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSalaryInput(amt.toLocaleString('en-US'))}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition active:scale-95 cursor-pointer"
                >
                  {fromCountry.currencySymbol}{amt >= 1000000 ? `${(amt / 1000000).toFixed(1)}M` : amt >= 1000 ? `${(amt / 1000).toFixed(0)}k` : amt}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Toggles: Gross vs Net + Remote Pay Model */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Gross vs Net Toggle */}
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-600 block">Tax Basis:</span>
              <div className="inline-flex rounded-md bg-white border border-slate-200 p-0.5 w-full">
                <button
                  type="button"
                  onClick={() => setTaxMode('gross')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition cursor-pointer text-center ${
                    taxMode === 'gross' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pre-Tax (Gross)
                </button>
                <button
                  type="button"
                  onClick={() => setTaxMode('net')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition cursor-pointer text-center ${
                    taxMode === 'net' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  After-Tax (Net)
                </button>
              </div>
            </div>

            {/* Remote Pay Model */}
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-600 block">Compensation Model:</span>
              <div className="inline-flex rounded-md bg-white border border-slate-200 p-0.5 w-full">
                <button
                  type="button"
                  onClick={() => setPayModel('ppp')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition cursor-pointer text-center ${
                    payModel === 'ppp' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  100% Local PPP
                </button>
                <button
                  type="button"
                  onClick={() => setPayModel('hybrid')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition cursor-pointer text-center ${
                    payModel === 'hybrid' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  50/50 Hybrid
                </button>
              </div>
            </div>
          </div>

          {/* Simple Ratio Note */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Conversion factor: 1 {fromCountry.currency} corresponds to{' '}
              <strong className="text-slate-700">{(toCountry.pppFactor / fromCountry.pppFactor).toFixed(2)} {toCountry.currency}</strong> under World Bank private consumption parity.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: CLEAR & STRUCTURED RESULTS (2-COLOR SCHEME) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
          
          {!hasSalary ? (
            /* EMPTY STATE: PROMPT USER CLEANLY (NO Rs.0 OR MISLEADING 1.00x) */
            <div className="my-auto py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 mx-auto flex items-center justify-center">
                <Calculator className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Enter your salary to calculate purchasing power
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                See what equivalent local salary you need in {toCountry.flag} {toCountry.name} to maintain the same standard of living as {fromCountry.name}.
              </p>
              <div className="pt-2 inline-flex gap-2">
                <button
                  type="button"
                  onClick={() => setSalaryInput('50,000')}
                  className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer"
                >
                  Try $50,000 baseline
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE RESULTS STATE */
            <div className="space-y-3">
              {/* 1. PRIMARY RESULT: PPP EQUIVALENT SALARY */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                    {payModel === 'hybrid' ? '50/50 Hybrid Remote Pay Target' : `Purchasing Power Equivalent in ${toCountry.name}`}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                    {taxMode.toUpperCase()} BASIS
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
                    {toCountry.currencySymbol}
                    {Math.round(results.displayActiveTargetLocal).toLocaleString()} {toCountry.currency}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    / {frequencyLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  To match the living standard of earning{' '}
                  <strong className="text-slate-900">
                    {fromCountry.currencySymbol}{Math.round(results.displayBaseSalary).toLocaleString()} {fromCountry.currency}/{frequencyLabel}
                  </strong>{' '}
                  in {fromCountry.name}, you need{' '}
                  <strong className="text-emerald-900">
                    {toCountry.currencySymbol}{Math.round(results.displayActiveTargetLocal).toLocaleString()} {toCountry.currency}/{frequencyLabel}
                  </strong>{' '}
                  in {toCountry.name}.
                </p>

                {taxMode === 'net' && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-900 leading-snug">
                    <span className="font-semibold">After-Tax (Net) Parity Note:</span> Reflects an estimated effective tax rate of ~{Math.round(fromCountry.taxRate * 100)}% in {fromCountry.name} vs. ~{Math.round(toCountry.taxRate * 100)}% in {toCountry.name} for an unmarried single professional baseline.
                  </div>
                )}
              </div>

              {/* 2. TRANSPARENT DISTINCTION: PPP VS BANK MARKET FOREX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Local Lifestyle Equivalent (PPP)
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900">
                      WHAT YOU NEED
                    </span>
                  </div>
                  <div className="font-extrabold text-emerald-950 text-base mt-1">
                    {toCountry.currencySymbol}{Math.round(results.displayTargetLocal).toLocaleString()} {toCountry.currency}
                    <span className="text-xs font-normal text-emerald-800 ml-1">/ {frequencyLabel}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Amount needed locally to maintain the same standard of living.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                      Actual Bank / Forex Value (Market Rate)
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                      NOMINAL CASH
                    </span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-base mt-1">
                    {toCountry.currencySymbol}{Math.round(results.displayMarketLocal).toLocaleString()} {toCountry.currency}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ {frequencyLabel}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Direct conversion at bank forex rate (~{toCountry.exchangeRate} {toCountry.currency}/USD).
                  </p>
                </div>
              </div>

              {/* 3. FOUR KEY BENCHMARKS (CLEAN 2-COLOR DESIGN) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 block">Cost of Living</span>
                  <span className={`text-sm font-bold block ${results.colDiffPercent <= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {results.colDiffPercent <= 0 ? '' : '+'}{Math.round(results.colDiffPercent)}%
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {results.colDiffPercent <= 0 ? 'Cheaper living' : 'More expensive'}
                  </span>
                </div>

                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 block">Buying Advantage</span>
                  <span className={`text-sm font-bold block ${results.multiplier >= 1 ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {results.multiplier.toFixed(2)}x
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {results.multiplier >= 1 ? 'Greater buying power' : 'Lower buying power'}
                  </span>
                </div>

                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 block">Rent Benchmark</span>
                  <span className={`text-sm font-bold block ${results.rentDiffPercent <= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {results.rentDiffPercent <= 0 ? '' : '+'}{Math.round(results.rentDiffPercent)}%
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    Housing cost index
                  </span>
                </div>

                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 block">Est. Tax Range</span>
                  <span className="text-sm font-bold text-slate-800 block">
                    {toCountry.taxRate === 0 ? '0% Tax-Free' : `~${Math.round(toCountry.taxRate * 100)}%`}
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    Median professional
                  </span>
                </div>
              </div>

              {/* 4. REMOTE WORKER / EXPAT INSIGHT */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900">Remote Work Insight:</span>{' '}
                {payModel === 'hybrid' ? (
                  <span>
                    The 50/50 Hybrid compensation model averages the pure local PPP target ({toCountry.currencySymbol}{Math.round(results.displayTargetLocal).toLocaleString()}) and the raw market exchange conversion ({toCountry.currencySymbol}{Math.round(results.displayMarketLocal).toLocaleString()}) to ensure competitive global savings while respecting local living differences.
                  </span>
                ) : (
                  <span>
                    If you earn {fromCountry.currencySymbol}{Math.round(results.displayBaseSalary).toLocaleString()} {fromCountry.currency}/{frequencyLabel} and spend it while living in {toCountry.name}, your earnings carry approximately{' '}
                    <strong className="text-emerald-800 font-bold">{results.multiplier.toFixed(2)}x</strong> the local purchasing power of an equivalent domestic salary.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── METHODOLOGY & FORMULA CARD ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
        <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-emerald-700" />
          How Purchasing Power Parity (PPP) Is Calculated
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Purchasing Power Parity equalizes the purchasing power of different currencies by eliminating differences in price levels between countries. It reflects how many local currency units are needed to purchase the same standard basket of household goods and services.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-800 space-y-1">
          <div className="font-bold text-slate-900">World Bank PPP Formula:</div>
          <div>Equivalent Salary (B) = Base Salary (A) x [ PPP Factor (B) / PPP Factor (A) ]</div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            {fromCountry.name} to {toCountry.name} ratio:{' '}
            [{toCountry.pppFactor} / {fromCountry.pppFactor}] = {(toCountry.pppFactor / fromCountry.pppFactor).toFixed(4)}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="text-slate-400">Authoritative References:</span>
          <a
            href="https://www.worldbank.org/en/programs/icp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-900 underline"
          >
            World Bank International Comparison Program (ICP)
          </a>
          <span className="text-slate-300">|</span>
          <a
            href="https://data.worldbank.org/indicator/PA.NUS.PRVT.PP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-900 underline"
          >
            World Bank WDI Private Consumption PPP (PA.NUS.PRVT.PP)
          </a>
        </div>
      </div>

      {/* ── GLOBAL BENCHMARK COMPARISON TABLE (SCROLLABLE WITH OVERFLOW-X-AUTO) ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Equivalent Salary Across Global Destinations
            </h3>
            <p className="text-xs text-slate-500">
              {hasSalary
                ? `Based on ${fromCountry.flag} ${fromCountry.name} baseline of ${fromCountry.currencySymbol}${Math.round(results.displayBaseSalary).toLocaleString()} / ${frequencyLabel} (${taxMode.toUpperCase()})`
                : 'Illustrative benchmarks based on a $50,000 USD/year baseline.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAllCountries(!showAllCountries)}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition self-start sm:self-center cursor-pointer"
          >
            {showAllCountries ? 'Show Top 10 Only' : `Show All ${COUNTRIES.length} Countries →`}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                <th className="py-2.5 px-3 sticky left-0 bg-slate-50 z-10">Country</th>
                <th className="py-2.5 px-3 text-right">PPP Target (Local)</th>
                <th className="py-2.5 px-3 text-right">Forex Value (USD)</th>
                <th className="py-2.5 px-3 text-center">Cost Index</th>
                <th className="py-2.5 px-3 text-right">Est. Tax</th>
                <th className="py-2.5 px-3 text-right">Cost vs. Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {displayedRows.map((row) => {
                const isSelected = row.code === toCode;
                const isOrigin = row.code === fromCode;
                const displayDivisor = frequencyDivisor;

                return (
                  <tr
                    key={row.code}
                    onClick={() => setToCode(row.code)}
                    className={`cursor-pointer transition hover:bg-slate-50 ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : isOrigin ? 'bg-slate-100/60' : ''
                    }`}
                  >
                    <td className={`py-2.5 px-3 sticky left-0 z-10 flex items-center gap-1.5 ${
                      isSelected ? 'bg-emerald-50' : isOrigin ? 'bg-slate-100' : 'bg-white'
                    }`}>
                      <span className="text-sm">{row.flag}</span>
                      <span className="text-slate-900 truncate max-w-[140px] sm:max-w-none">{row.name}</span>
                      {isOrigin && <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-bold">Origin</span>}
                      {isSelected && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Target</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900 tabular-nums">
                      {row.currencySymbol}{Math.round(row.equivLocal / displayDivisor).toLocaleString()} {row.currency}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600 tabular-nums">
                      ${Math.round(row.equivUSD / displayDivisor).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-600 tabular-nums">{row.colIndex}</td>
                    <td className="py-2.5 px-3 text-right">
                      {row.taxRate === 0 ? (
                        <span className="text-emerald-700 font-bold">0% Tax-Free</span>
                      ) : (
                        `~${Math.round(row.taxRate * 100)}%`
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.colDiff <= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
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

      {/* ── DIGITAL NOMAD FINANCIAL RUNWAY CALCULATOR ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Digital Nomad Financial Runway Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Calculate how many months of living runway your liquid savings will provide across countries.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Savings (USD):</span>
            <div className="flex rounded-lg border border-slate-300 focus-within:border-slate-800 overflow-hidden bg-white">
              <span className="px-2.5 py-1 bg-slate-50 text-slate-500 font-bold text-xs select-none border-r border-slate-300">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={savingsInput}
                placeholder="e.g. 15,000"
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  if (raw === '') {
                    setSavingsInput('');
                  } else {
                    setSavingsInput(Number(raw).toLocaleString('en-US'));
                  }
                }}
                className="w-28 px-2 py-1 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
            <div className="inline-flex gap-1 text-xs">
              {[10000, 25000, 50000].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSavingsInput(s.toLocaleString('en-US'))}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition cursor-pointer"
                >
                  ${s / 1000}k
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {COUNTRIES.slice(0, 18).map((c) => {
            const monthlyCost = 3800 * (c.colIndex / 100);
            const activeSavings = parsedSavings > 0 ? parsedSavings : 15000;
            const months = (activeSavings / monthlyCost).toFixed(1);

            return (
              <div
                key={c.code}
                onClick={() => setToCode(c.code)}
                className={`p-2.5 rounded-lg border transition cursor-pointer ${
                  toCode === c.code 
                    ? 'border-emerald-500 bg-emerald-50/50' 
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span>{c.flag}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {parsedSavings > 0 ? `${months} mo` : `~${months} mo`}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1 truncate">{c.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~${Math.round(monthlyCost)}/mo</div>
              </div>
            );
          })}
        </div>

        {parsedSavings === 0 && (
          <p className="text-[11px] text-slate-400 italic text-right">
            Displaying estimated runway based on benchmark $15,000 savings cushion. Enter your savings above to customize.
          </p>
        )}
      </div>

    </div>
  );
}
