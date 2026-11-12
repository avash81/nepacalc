'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FilingStatus,
  PayFrequency,
  FICA_RULES,
  FEDERAL_STANDARD_DEDUCTION,
  FEDERAL_BRACKETS,
  US_STATES,
  PAY_PERIODS
} from './taxData';

export default function USPaycheckClient() {
  const [payType, setPayType] = useState<'salary' | 'hourly'>('salary');
  
  // Default to $75,000 so the calculator shows meaningful figures on first load:
  const [salaryInput, setSalaryInput] = useState<string>('75,000');
  const [hourlyInput, setHourlyInput] = useState<string>('');
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState<string>('40');

  const [stateCode, setStateCode] = useState<string>('TX');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('biweekly');

  // Advanced W-4 & Deduction Options Toggle
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [dependentsCredits, setDependentsCredits] = useState<string>(''); // W-4 Step 3
  const [k401Input, setK401Input] = useState<string>('');
  const [healthInsInput, setHealthInsInput] = useState<string>('');
  const [hsaInput, setHsaInput] = useState<string>('');

  // Parse raw numbers safely
  const grossAnnual = useMemo(() => {
    if (payType === 'salary') {
      const parsed = parseFloat(salaryInput.replace(/,/g, ''));
      return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    } else {
      const parsedHourly = parseFloat(hourlyInput.replace(/,/g, ''));
      const parsedHours = parseFloat(hoursPerWeekInput.replace(/,/g, ''));
      const hr = isNaN(parsedHourly) || parsedHourly < 0 ? 0 : parsedHourly;
      const hpw = isNaN(parsedHours) || parsedHours < 0 ? 0 : parsedHours;
      return hr * hpw * 52;
    }
  }, [payType, salaryInput, hourlyInput, hoursPerWeekInput]);

  const k401Annual = useMemo(() => {
    const val = parseFloat(k401Input.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [k401Input]);

  const healthInsAnnual = useMemo(() => {
    const val = parseFloat(healthInsInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [healthInsInput]);

  const hsaAnnual = useMemo(() => {
    const val = parseFloat(hsaInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [hsaInput]);

  const dependentCreditsAnnual = useMemo(() => {
    const val = parseFloat(dependentsCredits.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [dependentsCredits]);

  // Tax calculations
  const stateRule = US_STATES[stateCode] || US_STATES.TX;
  const standardDeduction = FEDERAL_STANDARD_DEDUCTION[filingStatus];

  // 1. Wage Bases with Proper Pre-Tax Segregation
  // Section 125 health insurance & qualifying payroll HSA reduce FICA + FIT + SIT
  const ficaWageBase = Math.max(0, grossAnnual - healthInsAnnual - hsaAnnual);
  // Traditional 401(k) reduces FIT + SIT, but NOT FICA
  const fitWageBase = Math.max(0, ficaWageBase - k401Annual);
  // In CA and NJ, HSA is taxable at state level
  const sitWageBase = stateCode === 'CA' || stateCode === 'NJ'
    ? Math.max(0, grossAnnual - healthInsAnnual - k401Annual)
    : fitWageBase;

  // 2. FICA Taxes (Social Security & Medicare)
  const socialSecurityTax = Math.min(ficaWageBase, FICA_RULES.socialSecurityWageCap) * FICA_RULES.socialSecurityRate;
  const baseMedicareTax = ficaWageBase * FICA_RULES.medicareRate;
  // Additional Medicare tax (employer withholding threshold at $200k)
  const additionalMedicareTax = ficaWageBase > FICA_RULES.additionalMedicareWithholdingThreshold
    ? (ficaWageBase - FICA_RULES.additionalMedicareWithholdingThreshold) * FICA_RULES.additionalMedicareRate
    : 0;
  const totalMedicareTax = baseMedicareTax + additionalMedicareTax;
  const totalFica = socialSecurityTax + totalMedicareTax;

  // 3. Federal Income Tax Calculation (with W-4 credits)
  const federalTaxable = Math.max(0, fitWageBase - standardDeduction);
  let tentativeFederalTax = 0;
  let prevLimit = 0;
  let marginalBracket = 0;
  const brackets = FEDERAL_BRACKETS[filingStatus];

  for (const b of brackets) {
    if (federalTaxable > prevLimit) {
      const taxableChunk = Math.min(federalTaxable, b.upTo) - prevLimit;
      tentativeFederalTax += taxableChunk * b.rate;
      marginalBracket = b.rate * 100;
      prevLimit = b.upTo;
    } else {
      break;
    }
  }

  // Subtract W-4 Step 3 Dependent Credits
  const federalTax = Math.max(0, tentativeFederalTax - dependentCreditsAnnual);

  // 4. State Income Tax
  let stateTax = 0;
  if (stateRule.type === 'flat' && stateRule.flatRate) {
    stateTax = sitWageBase * stateRule.flatRate;
  } else if (stateRule.type === 'graduated' && stateRule.brackets) {
    let stPrev = 0;
    for (const sb of stateRule.brackets) {
      const threshold = filingStatus === 'married_joint' ? sb.thresholdMarried : sb.thresholdSingle;
      if (sitWageBase > stPrev) {
        const taxableInTier = Math.min(sitWageBase, threshold) - stPrev;
        stateTax += taxableInTier * sb.rate;
        stPrev = threshold;
      } else {
        break;
      }
    }
  }

  // California SDI (1.3% with no wage ceiling in 2026)
  const sdiTax = stateRule.sdiRate ? grossAnnual * stateRule.sdiRate : 0;
  const totalDeductions = k401Annual + healthInsAnnual + hsaAnnual;
  const totalTaxes = federalTax + totalFica + stateTax + sdiTax;
  const netAnnual = Math.max(0, grossAnnual - totalTaxes - totalDeductions);
  const effectiveRate = grossAnnual > 0 ? (totalTaxes / grossAnnual) * 100 : 0;

  const periods = PAY_PERIODS[payFrequency];
  const netPerCheck = periods > 0 ? netAnnual / periods : 0;
  const grossPerCheck = periods > 0 ? grossAnnual / periods : 0;
  const fedPerCheck = periods > 0 ? federalTax / periods : 0;
  const ficaPerCheck = periods > 0 ? totalFica / periods : 0;
  const statePerCheck = periods > 0 ? (stateTax + sdiTax) / periods : 0;
  const deductionsPerCheck = periods > 0 ? totalDeductions / periods : 0;

  const fmt = (val: number) => {
    return '$' + Math.round(val).toLocaleString('en-US');
  };

  const fmtExact = (val: number) => {
    // Prevent -$0.00 by snapping tiny negatives to 0
    const safe = Math.abs(val) < 0.005 ? 0 : val;
    return '$' + safe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Show empty state when no salary entered
  const hasInput = grossAnnual > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-4 font-sans text-slate-800 font-modern-ui">
      {/* ── HEADER ── */}
      <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Paycheck Calculator
          </h1>
          <p className="text-xs text-slate-500">
            Estimated take-home pay after federal, FICA, and state taxes. Results are estimates only.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setSalaryInput('75,000');
              setHourlyInput('');
              setHoursPerWeekInput('40');
              setStateCode('TX');
              setFilingStatus('single');
              setPayFrequency('biweekly');
              setShowAdvanced(false);
              setDependentsCredits('');
              setK401Input('');
              setHealthInsInput('');
              setHsaInput('');
            }}
            className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
          >
            Reset
          </button>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Tax Year 2026
          </span>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN CALCULATOR CARD ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        
        {/* LEFT COLUMN: SIMPLE INPUTS */}
        <div className="md:col-span-6 p-5 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Salary Details
            </span>
            {/* Toggle */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPayType('salary')}
                className={`px-3 py-1 rounded-md transition ${
                  payType === 'salary' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual Salary
              </button>
              <button
                type="button"
                onClick={() => setPayType('hourly')}
                className={`px-3 py-1 rounded-md transition ${
                  payType === 'hourly' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly Rate
              </button>
            </div>
          </div>

          {/* Gross Input - Addon Prefix (Zero overlapping) */}
          {payType === 'salary' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Gross Salary
              </label>
              <div className="flex rounded-lg border border-slate-300 focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 overflow-hidden bg-white">
                <span className="inline-flex items-center px-3.5 bg-slate-50 border-r border-slate-300 text-slate-500 font-bold text-sm select-none">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={salaryInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    if (raw === '') {
                      setSalaryInput('');
                    } else {
                      setSalaryInput(Number(raw).toLocaleString('en-US'));
                    }
                  }}
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 outline-none"
                  placeholder="0"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hourly Rate
                </label>
                <div className="flex rounded-lg border border-slate-300 focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 overflow-hidden bg-white">
                  <span className="inline-flex items-center px-3 bg-slate-50 border-r border-slate-300 text-slate-500 font-bold text-sm select-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={hourlyInput}
                    onChange={(e) => setHourlyInput(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold text-slate-900 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hours / Week
                </label>
                <input
                  type="number"
                  min="0"
                  max="80"
                  value={hoursPerWeekInput}
                  onChange={(e) => setHoursPerWeekInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 outline-none focus:border-slate-800"
                  placeholder="40"
                />
              </div>
            </div>
          )}

          {/* State and Filing Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 bg-white outline-none focus:border-slate-800 cursor-pointer"
              >
                {Object.keys(US_STATES).map((sc) => (
                  <option key={sc} value={sc}>
                    {US_STATES[sc].name} {US_STATES[sc].type === 'none' ? '(0% tax)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 bg-white outline-none focus:border-slate-800 cursor-pointer"
              >
                <option value="single">Single</option>
                <option value="married_joint">Married Filing Jointly</option>
                <option value="head_of_household">Head of Household</option>
                <option value="married_separate">Married Filing Separately</option>
              </select>
            </div>
          </div>

          {/* Pay Frequency Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pay Frequency
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['weekly', 'biweekly', 'semimonthly', 'monthly'] as PayFrequency[]).map((pf) => (
                <button
                  key={pf}
                  type="button"
                  onClick={() => setPayFrequency(pf)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border text-center transition capitalize ${
                    payFrequency === pf
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pf === 'semimonthly' ? 'Semi-Mo' : pf}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Advanced W-4 & Pre-Tax Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>{showAdvanced ? '− Hide' : '+ Show'} Advanced W-4 &amp; Pre-Tax Deductions</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                      401(k) Contribution ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      value={k401Input}
                      onChange={(e) => setK401Input(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                      Health Insurance ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="200"
                      placeholder="0"
                      value={healthInsInput}
                      onChange={(e) => setHealthInsInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                      HSA Contribution ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="200"
                      placeholder="0"
                      value={hsaInput}
                      onChange={(e) => setHsaInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                      W-4 Dependent Credits ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      value={dependentsCredits}
                      onChange={(e) => setDependentsCredits(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CLEAR TAKE-HOME RESULTS */}
        <div className="md:col-span-6 p-5 bg-slate-50/50 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-600">
                Take-Home Pay
              </span>
              <div className="text-right space-x-2">
                <span className="text-slate-500 font-medium">
                  Effective tax rate: <strong className="text-slate-800">{effectiveRate.toFixed(1)}%</strong>
                </span>
                {marginalBracket > 0 && (
                  <span className="text-slate-500 font-medium">
                    Marginal: <strong className="text-slate-800">{marginalBracket}%</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Hero Net Display */}
            <div className="my-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-xs text-slate-500 block font-medium">
                Estimated Net Pay ({payFrequency})
              </span>
              <div className="text-3xl font-extrabold text-emerald-700 tracking-tight mt-0.5">
                {fmtExact(netPerCheck)}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center justify-between border-t border-slate-100 pt-1.5">
                <span>Annual Net: <strong className="text-slate-800">{fmt(netAnnual)}</strong></span>
                <span>Gross: <strong className="text-slate-800">{fmt(grossAnnual)}</strong></span>
              </div>
            </div>

            {/* Simple Breakdown Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-50 px-3 py-1.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
                <span>Deduction</span>
                <span>Per Check</span>
              </div>
              <div className="divide-y divide-slate-100 font-medium">
                <div className="px-3 py-2 flex justify-between">
                  <span className="text-slate-600">Federal Income Tax</span>
                  <span className="font-semibold text-rose-600">{fedPerCheck > 0 ? `-${fmtExact(fedPerCheck)}` : fmtExact(0)}</span>
                </div>
                <div className="px-3 py-2 flex justify-between">
                  <span className="text-slate-600">Social Security (6.2%)</span>
                  <span className="font-semibold text-rose-600">{socialSecurityTax > 0 ? `-${fmtExact(socialSecurityTax / periods)}` : fmtExact(0)}</span>
                </div>
                <div className="px-3 py-2 flex justify-between">
                  <span className="text-slate-600">Medicare (1.45%)</span>
                  <span className="font-semibold text-rose-600">{totalMedicareTax > 0 ? `-${fmtExact(totalMedicareTax / periods)}` : fmtExact(0)}</span>
                </div>
                <div className="px-3 py-2 flex justify-between">
                  <span className="text-slate-600">{stateRule.name} Tax</span>
                  <span className="font-semibold text-slate-700">
                    {stateTax > 0 ? `-${fmtExact(statePerCheck)}` : '$0.00 (0%)'}
                  </span>
                </div>
                {sdiTax > 0 && (
                  <div className="px-3 py-2 flex justify-between">
                    <span className="text-slate-600">State Disability (SDI)</span>
                    <span className="font-semibold text-rose-600">-{fmtExact(sdiTax / periods)}</span>
                  </div>
                )}                {totalDeductions > 0 && (
                  <div className="px-3 py-2 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Pre-Tax Deductions (401k/Ins)</span>
                    <span className="font-semibold text-slate-700">-{fmtExact(deductionsPerCheck)}</span>
                  </div>
                )}
                <div className="px-3 py-2.5 flex justify-between bg-emerald-50/60 font-bold border-t border-slate-200">
                  <span className="text-emerald-950 font-bold">Net Check</span>
                  <span className="text-emerald-800 font-extrabold">{fmtExact(netPerCheck)}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Estimated take-home pay under IRS Publication 15-T. Results are estimates only - actual paycheck amounts may vary based on W-4 elections, employer-specific payroll treatment, and local taxes not reflected here. 2026 Social Security cap: $184,500.
          </p>
        </div>
      </div>

      {/* ── ALL-FREQUENCIES TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-slate-900">
          Take-Home Pay by Pay Frequency
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2 px-3">Frequency</th>
                <th className="py-2 px-3 text-right">Gross Pay</th>
                <th className="py-2 px-3 text-right">Federal Tax</th>
                <th className="py-2 px-3 text-right">FICA</th>
                <th className="py-2 px-3 text-right">State Tax</th>
                <th className="py-2 px-3 text-right font-bold text-emerald-800 bg-emerald-50/50">Take-Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {[
                { name: 'Annual Total', count: 1 },
                { name: 'Monthly', count: 12 },
                { name: 'Semi-Monthly (2x/mo)', count: 24 },
                { name: 'Bi-Weekly (Every 2 wks)', count: 26 },
                { name: 'Weekly', count: 52 },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-slate-900">{row.name}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{fmtExact(grossAnnual / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-{fmtExact(federalTax / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-{fmtExact(totalFica / row.count)}</td>
                  <td className="py-2 px-3 text-right text-slate-600 tabular-nums">
                    {(stateTax + sdiTax) > 0 ? `-${fmtExact((stateTax + sdiTax) / row.count)}` : fmtExact(0)}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700 bg-emerald-50/30 tabular-nums">
                    {fmtExact(netAnnual / row.count)}
                  </td>
                </tr>
              ))}
              {/* Hourly equivalent — shown as a separate reference row, not a pay frequency */}
              <tr className="bg-slate-50/80 border-t-2 border-slate-200 hover:bg-slate-100">
                <td className="py-2 px-3 font-semibold text-slate-500 italic text-[11px]">Hourly Equiv. (2,080 hrs/yr)</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-500 text-[11px]">{fmtExact(grossAnnual / 2080)}</td>
                <td className="py-2 px-3 text-right text-rose-400 tabular-nums text-[11px]">-{fmtExact(federalTax / 2080)}</td>
                <td className="py-2 px-3 text-right text-rose-400 tabular-nums text-[11px]">-{fmtExact(totalFica / 2080)}</td>
                <td className="py-2 px-3 text-right text-slate-400 tabular-nums text-[11px]">
                  {(stateTax + sdiTax) > 0 ? `-${fmtExact((stateTax + sdiTax) / 2080)}` : fmtExact(0)}
                </td>
                <td className="py-2 px-3 text-right font-bold text-emerald-600 bg-emerald-50/20 tabular-nums text-[11px]">
                  {fmtExact(netAnnual / 2080)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
