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
  
  // Default inputs empty
  const [salaryInput, setSalaryInput] = useState<string>('');
  
  // Hourly Mode Inputs
  const [hourlyInput, setHourlyInput] = useState<string>('');
  const [regularHoursInput, setRegularHoursInput] = useState<string>('40');
  const [overtimeHoursInput, setOvertimeHoursInput] = useState<string>('0');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<string>('1.5');
  const [weeksPerYearInput, setWeeksPerYearInput] = useState<string>('52');

  const [stateCode, setStateCode] = useState<string>('TX');
  const [comparisonStateCode, setComparisonStateCode] = useState<string>('CA');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('biweekly');

  // Advanced W-4 & Deduction Options
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [ficaExempt, setFicaExempt] = useState<boolean>(false); // F-1/J-1 or exempt public employee
  const [w4MultipleJobs, setW4MultipleJobs] = useState<boolean>(false); // W-4 Step 2(c)
  const [dependentsCredits, setDependentsCredits] = useState<string>(''); // W-4 Step 3
  const [otherIncomeInput, setOtherIncomeInput] = useState<string>(''); // W-4 Step 4(a)
  const [extraDeductionsInput, setExtraDeductionsInput] = useState<string>(''); // W-4 Step 4(b)
  const [extraWithholdingInput, setExtraWithholdingInput] = useState<string>(''); // W-4 Step 4(c)

  // Pre-tax and Post-tax benefit deductions
  const [k401Input, setK401Input] = useState<string>('');
  const [healthInsInput, setHealthInsInput] = useState<string>('');
  const [hsaInput, setHsaInput] = useState<string>('');
  const [postTaxInput, setPostTaxInput] = useState<string>(''); // Roth 401(k), garnishments

  // Copy notification state
  const [copied, setCopied] = useState<boolean>(false);

  // Compute Gross Earnings
  const { grossAnnual, regularGrossAnnual, overtimeGrossAnnual } = useMemo(() => {
    if (payType === 'salary') {
      const parsed = parseFloat(salaryInput.replace(/,/g, ''));
      const gross = isNaN(parsed) || parsed < 0 ? 0 : parsed;
      return { grossAnnual: gross, regularGrossAnnual: gross, overtimeGrossAnnual: 0 };
    } else {
      const hr = parseFloat(hourlyInput.replace(/,/g, '')) || 0;
      const regHrs = parseFloat(regularHoursInput.replace(/,/g, '')) || 0;
      const otHrs = parseFloat(overtimeHoursInput.replace(/,/g, '')) || 0;
      const otMult = parseFloat(overtimeMultiplier) || 1.5;
      const wks = parseFloat(weeksPerYearInput.replace(/,/g, '')) || 52;

      const regAnnual = Math.max(0, hr * regHrs * wks);
      const otAnnual = Math.max(0, hr * otMult * otHrs * wks);
      const total = regAnnual + otAnnual;
      return { grossAnnual: total, regularGrossAnnual: regAnnual, overtimeGrossAnnual: otAnnual };
    }
  }, [payType, salaryInput, hourlyInput, regularHoursInput, overtimeHoursInput, overtimeMultiplier, weeksPerYearInput]);

  // Benefit Deductions
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

  const postTaxAnnual = useMemo(() => {
    const val = parseFloat(postTaxInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [postTaxInput]);

  // W-4 Adjustments
  const dependentCreditsAnnual = useMemo(() => {
    const val = parseFloat(dependentsCredits.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [dependentsCredits]);

  const otherIncomeAnnual = useMemo(() => {
    const val = parseFloat(otherIncomeInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [otherIncomeInput]);

  const extraDeductionsAnnual = useMemo(() => {
    const val = parseFloat(extraDeductionsInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [extraDeductionsInput]);

  const extraWithholdingPerCheck = useMemo(() => {
    const val = parseFloat(extraWithholdingInput.replace(/,/g, ''));
    return isNaN(val) || val < 0 ? 0 : val;
  }, [extraWithholdingInput]);

  // Tax calculation helper for any given state
  const computeTaxes = (targetStateCode: string) => {
    const targetStateRule = US_STATES[targetStateCode] || US_STATES.TX;
    let baseStandardDeduction = FEDERAL_STANDARD_DEDUCTION[filingStatus];
    
    // W-4 Step 2 adjustment: If multiple jobs box checked, standard deduction is split/adjusted
    if (w4MultipleJobs && filingStatus === 'married_joint') {
      baseStandardDeduction = FEDERAL_STANDARD_DEDUCTION.single; // Standard W-4 two-earner adjustment
    }

    // 1. Wage Bases with Proper Pre-Tax Segregation
    // Section 125 health insurance & qualifying payroll HSA reduce FICA + FIT + SIT
    const ficaWageBase = Math.max(0, grossAnnual - healthInsAnnual - hsaAnnual);
    
    // Traditional 401(k) reduces FIT + SIT, but NOT FICA
    // W-4 Step 4(a) adds other non-job income; Step 4(b) adds extra deductions
    const adjustedGrossForFit = Math.max(0, ficaWageBase - k401Annual + otherIncomeAnnual - extraDeductionsAnnual);
    
    // In CA and NJ, HSA contributions are taxable at the state level
    const sitWageBase = targetStateCode === 'CA' || targetStateCode === 'NJ'
      ? Math.max(0, grossAnnual - healthInsAnnual - k401Annual)
      : Math.max(0, ficaWageBase - k401Annual);

    // 2. FICA Taxes (Social Security & Medicare)
    const ssTax = ficaExempt ? 0 : Math.min(ficaWageBase, FICA_RULES.socialSecurityWageCap) * FICA_RULES.socialSecurityRate;
    const baseMedTax = ficaExempt ? 0 : ficaWageBase * FICA_RULES.medicareRate;
    // Additional Medicare Surtax (0.9% on wages exceeding filing status threshold: Single/HoH $200k, MFJ $250k, MFS $125k)
    const addMedThreshold = FICA_RULES.additionalMedicareLiabilityThresholds[filingStatus] || 200000;
    const addMedTax = (!ficaExempt && ficaWageBase > addMedThreshold)
      ? (ficaWageBase - addMedThreshold) * FICA_RULES.additionalMedicareRate
      : 0;
    const totalMedTax = baseMedTax + addMedTax;
    const ficaTotal = ssTax + totalMedTax;

    // 3. Federal Income Tax (with IRS percentage brackets & W-4 Step 3 credits)
    const federalTaxable = Math.max(0, adjustedGrossForFit - baseStandardDeduction);
    let tentativeFedTax = 0;
    let prevLimit = 0;
    let marginalRate = 0;
    const brackets = FEDERAL_BRACKETS[filingStatus];

    for (const b of brackets) {
      if (federalTaxable > prevLimit) {
        const taxableChunk = Math.min(federalTaxable, b.upTo) - prevLimit;
        tentativeFedTax += taxableChunk * b.rate;
        marginalRate = b.rate * 100;
        prevLimit = b.upTo;
      } else {
        break;
      }
    }

    const periodsCount = PAY_PERIODS[payFrequency];
    const extraWithholdingAnnual = extraWithholdingPerCheck * periodsCount;
    // Puerto Rico (PR) residents pay PR Hacienda taxes and FICA, but are exempt from US federal income tax on PR-sourced income (IRC Sec 933)
    const fedTax = targetStateCode === 'PR' ? 0 : Math.max(0, tentativeFedTax - dependentCreditsAnnual + extraWithholdingAnnual);

    // 4. State Income Tax
    let sTax = 0;
    if (targetStateRule.type === 'flat' && targetStateRule.flatRate) {
      sTax = sitWageBase * targetStateRule.flatRate;
    } else if (targetStateRule.type === 'graduated' && targetStateRule.brackets) {
      let stPrev = 0;
      for (const sb of targetStateRule.brackets) {
        const threshold = filingStatus === 'married_joint' ? sb.thresholdMarried : sb.thresholdSingle;
        if (sitWageBase > stPrev) {
          const taxableInTier = Math.min(sitWageBase, threshold) - stPrev;
          sTax += taxableInTier * sb.rate;
          stPrev = threshold;
        } else {
          break;
        }
      }
    }

    // State Disability Insurance (CA SDI 1.3% with no wage ceiling in 2026)
    const sdi = targetStateRule.sdiRate ? grossAnnual * targetStateRule.sdiRate : 0;
    const totalPreTaxDeductions = k401Annual + healthInsAnnual + hsaAnnual;
    const totalTaxObligation = fedTax + ficaTotal + sTax + sdi;
    const totalAllDeductions = totalTaxObligation + totalPreTaxDeductions + postTaxAnnual;
    const net = Math.max(0, grossAnnual - totalAllDeductions);
    const effRate = grossAnnual > 0 ? (totalTaxObligation / grossAnnual) * 100 : 0;

    return {
      stateRule: targetStateRule,
      ficaWageBase,
      sitWageBase,
      socialSecurityTax: ssTax,
      baseMedicareTax: baseMedTax,
      additionalMedicareTax: addMedTax,
      totalMedicareTax: totalMedTax,
      totalFica: ficaTotal,
      federalTax: fedTax,
      marginalBracket: marginalRate,
      stateTax: sTax,
      sdiTax: sdi,
      totalTaxes: totalTaxObligation,
      totalPreTax: totalPreTaxDeductions,
      totalPostTax: postTaxAnnual,
      totalDeductions: totalAllDeductions,
      netAnnual: net,
      effectiveRate: effRate,
    };
  };

  const primary = computeTaxes(stateCode);
  const comparison = computeTaxes(comparisonStateCode);

  const periods = PAY_PERIODS[payFrequency];
  const netPerCheck = periods > 0 ? primary.netAnnual / periods : 0;
  const grossPerCheck = periods > 0 ? grossAnnual / periods : 0;
  const fedPerCheck = periods > 0 ? primary.federalTax / periods : 0;
  const ssPerCheck = periods > 0 ? primary.socialSecurityTax / periods : 0;
  const medPerCheck = periods > 0 ? primary.totalMedicareTax / periods : 0;
  const statePerCheck = periods > 0 ? (primary.stateTax + primary.sdiTax) / periods : 0;
  const preTaxPerCheck = periods > 0 ? primary.totalPreTax / periods : 0;
  const postTaxPerCheck = periods > 0 ? primary.totalPostTax / periods : 0;

  // Formatting helpers
  const fmt = (val: number) => '$' + Math.round(val).toLocaleString('en-US');
  const fmtExact = (val: number) => {
    const safe = Math.abs(val) < 0.005 ? 0 : val;
    return '$' + safe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const fmtDeduction = (val: number) => {
    if (Math.abs(val) < 0.005) return '$0.00';
    return `-${fmtExact(val)}`;
  };

  // Reset to default
  const handleReset = () => {
    setPayType('salary');
    setSalaryInput('');
    setHourlyInput('');
    setRegularHoursInput('40');
    setOvertimeHoursInput('0');
    setOvertimeMultiplier('1.5');
    setWeeksPerYearInput('52');
    setStateCode('TX');
    setComparisonStateCode('CA');
    setFilingStatus('single');
    setPayFrequency('biweekly');
    setShowAdvanced(false);
    setFicaExempt(false);
    setW4MultipleJobs(false);
    setDependentsCredits('');
    setOtherIncomeInput('');
    setExtraDeductionsInput('');
    setExtraWithholdingInput('');
    setK401Input('');
    setHealthInsInput('');
    setHsaInput('');
    setPostTaxInput('');
  };

  // Percentages for visual distribution bar
  const pctTakeHome = grossAnnual > 0 ? Math.max(0, (primary.netAnnual / grossAnnual) * 100) : 0;
  const pctFederal = grossAnnual > 0 ? Math.max(0, (primary.federalTax / grossAnnual) * 100) : 0;
  const pctFica = grossAnnual > 0 ? Math.max(0, (primary.totalFica / grossAnnual) * 100) : 0;
  const pctState = grossAnnual > 0 ? Math.max(0, ((primary.stateTax + primary.sdiTax) / grossAnnual) * 100) : 0;
  const pctBenefits = grossAnnual > 0 ? Math.max(0, ((primary.totalPreTax + primary.totalPostTax) / grossAnnual) * 100) : 0;

  // Copy Summary handler
  const handleCopy = () => {
    const text = `NepaCalc US Paycheck Summary (2026):
Gross Earnings: ${fmt(grossAnnual)}/yr (${fmtExact(grossPerCheck)}/${payFrequency})
Estimated Net Take-Home: ${fmtExact(netPerCheck)}/${payFrequency} (${fmt(primary.netAnnual)}/yr)
Effective Tax Rate: ${primary.effectiveRate.toFixed(1)}% | Marginal Bracket: ${primary.marginalBracket}%
State: ${primary.stateRule.name} | Filing Status: ${filingStatus}
Calculated at https://nepacalc.com/calculator/us-paycheck-calculator/`;
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 pb-28 sm:pb-16 space-y-4 font-sans text-slate-800 font-modern-ui">
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
            onClick={handleReset}
            className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition cursor-pointer"
            title="Reset calculator to defaults"
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
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  payType === 'salary' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual Salary
              </button>
              <button
                type="button"
                onClick={() => setPayType('hourly')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  payType === 'hourly' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly Rate
              </button>
            </div>
          </div>

          {/* Salary or Hourly Mode Input */}
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
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    if (raw === '') {
                      setSalaryInput('');
                    } else {
                      setSalaryInput(Number(raw).toLocaleString('en-US'));
                    }
                  }}
                  className="w-full px-3 py-2 text-base font-bold text-slate-900 outline-none"
                  placeholder="e.g. 75,000"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-500 font-medium">Quick:</span>
                {[50000, 75000, 100000, 150000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSalaryInput(val.toLocaleString('en-US'))}
                    className="text-xs px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                  >
                    ${val >= 1000 ? `${val / 1000}k` : val}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hourly Wage Rate
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
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => setHourlyInput(e.target.value)}
                      className="w-full px-2.5 py-2 text-sm font-bold text-slate-900 outline-none"
                      placeholder="e.g. 35"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Regular Hours / Wk
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    value={regularHoursInput}
                    onChange={(e) => setRegularHoursInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 outline-none focus:border-slate-800"
                    placeholder="40"
                  />
                </div>
              </div>

              {/* Overtime & Weeks Worked Inputs */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                    Overtime Hrs/Wk
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={overtimeHoursInput}
                    onChange={(e) => setOvertimeHoursInput(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-900 bg-white outline-none focus:border-slate-800"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                    OT Multiplier
                  </label>
                  <select
                    value={overtimeMultiplier}
                    onChange={(e) => setOvertimeMultiplier(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-900 bg-white outline-none focus:border-slate-800"
                  >
                    <option value="1.5">1.5× (Time &amp; a Half)</option>
                    <option value="2.0">2.0× (Double Time)</option>
                    <option value="1.0">1.0× (Straight Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                    Weeks / Year
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={weeksPerYearInput}
                    onChange={(e) => setWeeksPerYearInput(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-900 bg-white outline-none focus:border-slate-800"
                    placeholder="52"
                  />
                </div>
              </div>

              {overtimeGrossAnnual > 0 && (
                <div className="flex justify-between text-[11px] text-slate-600 px-1">
                  <span>Regular: <strong>{fmt(regularGrossAnnual)}</strong></span>
                  <span>Overtime: <strong className="text-amber-800">+{fmt(overtimeGrossAnnual)}</strong></span>
                  <span>Total Gross: <strong className="text-slate-900">{fmt(grossAnnual)}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* State and Filing Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State (Work Location)
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 bg-white outline-none focus:border-slate-800 cursor-pointer"
              >
                {Object.keys(US_STATES).map((sc) => (
                  <option key={sc} value={sc}>
                    {US_STATES[sc].label || US_STATES[sc].name}
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
                  className={`py-1.5 px-2 text-xs font-semibold rounded-md border text-center transition capitalize cursor-pointer ${
                    payFrequency === pf
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pf === 'semimonthly' ? 'Semi-Mo' : pf}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced W-4 & Pre/Post-Tax Accordion */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{showAdvanced ? '− Hide' : '+ Show'} Advanced W-4 &amp; Pre-Tax Deductions</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Pre-Tax Deductions (Annual)</span>
                  <span className="text-[10px] text-slate-500">Lowers taxable income</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      401(k) / 403(b) ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      value={k401Input}
                      onChange={(e) => setK401Input(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      Health Ins. ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="200"
                      placeholder="0"
                      value={healthInsInput}
                      onChange={(e) => setHealthInsInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      HSA / FSA ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="200"
                      placeholder="0"
                      value={hsaInput}
                      onChange={(e) => setHsaInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="border-b border-slate-200 pb-1.5 pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Form W-4 Withholding Options</span>
                  <span className="text-[10px] text-slate-500">IRS Pub 15-T</span>
                </div>
                
                {/* W-4 Step 2(c) Multiple Jobs & FICA Exemption */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={w4MultipleJobs}
                      onChange={(e) => setW4MultipleJobs(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>Step 2(c): Multiple Jobs or Spouse Works</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={ficaExempt}
                      onChange={(e) => setFicaExempt(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-3.5 w-3.5"
                    />
                    <span>FICA Exempt (e.g., F-1/J-1 student visa or exempt state/local position)</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      Step 3: Dependent Credits ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      value={dependentsCredits}
                      onChange={(e) => setDependentsCredits(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      Step 4(c): Extra Withholding ($/check)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="25"
                      placeholder="0"
                      value={extraWithholdingInput}
                      onChange={(e) => setExtraWithholdingInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      Step 4(a): Other Income ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      value={otherIncomeInput}
                      onChange={(e) => setOtherIncomeInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 block mb-0.5">
                      Post-Tax Deductions ($/yr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="Roth 401k, etc."
                      value={postTaxInput}
                      onChange={(e) => setPostTaxInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded bg-white outline-none"
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
              {grossAnnual > 0 && (
                <div className="text-right space-x-2">
                  <span className="text-slate-500 font-medium">
                    Effective: <strong className="text-slate-800">{primary.effectiveRate.toFixed(1)}%</strong>
                  </span>
                  {primary.marginalBracket > 0 && (
                    <span className="text-slate-500 font-medium">
                      Marginal: <strong className="text-slate-800">{primary.marginalBracket}%</strong>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Empty State Prompt */}
            {grossAnnual === 0 ? (
              <div className="my-3 p-6 bg-white border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center gap-2">
                <span className="text-2xl">💵</span>
                <p className="text-sm font-semibold text-slate-700">Enter your salary to see results</p>
                <p className="text-xs text-slate-400">Type an amount on the left or tap a quick-select pill to calculate your take-home pay instantly.</p>
              </div>
            ) : (
              <>
            {/* Hero Net Display */}
            <div className="my-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">
                    Estimated Net Pay ({payFrequency})
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-700 tracking-tight mt-0.5">
                    {fmtExact(netPerCheck)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition cursor-pointer"
                  title="Copy calculation summary"
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>

              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between border-t border-slate-100 pt-1.5">
                <span>Annual Net: <strong className="text-slate-800">{fmt(primary.netAnnual)}</strong></span>
                <span>Gross: <strong className="text-slate-800">{fmt(grossAnnual)}</strong></span>
              </div>

              {/* Visual Distribution Stacked Bar */}
              {grossAnnual > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Income Distribution
                  </span>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${pctTakeHome}%` }}
                      className="bg-emerald-500 transition-all duration-300"
                      title={`Take-Home: ${pctTakeHome.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${pctFederal}%` }}
                      className="bg-rose-500 transition-all duration-300"
                      title={`Federal Tax: ${pctFederal.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${pctFica}%` }}
                      className="bg-amber-500 transition-all duration-300"
                      title={`FICA: ${pctFica.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${pctState}%` }}
                      className="bg-purple-500 transition-all duration-300"
                      title={`State Tax: ${pctState.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${pctBenefits}%` }}
                      className="bg-blue-400 transition-all duration-300"
                      title={`Benefits / Deductions: ${pctBenefits.toFixed(1)}%`}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500 pt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Net: {pctTakeHome.toFixed(0)}%
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Fed: {pctFederal.toFixed(0)}%
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> FICA: {pctFica.toFixed(0)}%
                    </span>
                    {pctState > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-purple-500" /> State: {pctState.toFixed(0)}%
                      </span>
                    )}
                    {pctBenefits > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400" /> Benefits: {pctBenefits.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Deductions Breakdown Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-50 px-3 py-1.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
                <span>Deduction Item</span>
                <span>Per Check</span>
              </div>
              <div className="divide-y divide-slate-100 font-medium">
                <div className="px-3 py-1.5 flex justify-between">
                  <span className="text-slate-600">Federal Income Tax</span>
                  <span className="font-semibold text-rose-600">{fmtDeduction(fedPerCheck)}</span>
                </div>
                <div className="px-3 py-1.5 flex justify-between">
                  <span className="text-slate-600">Social Security (6.2%)</span>
                  <span className="font-semibold text-rose-600">{fmtDeduction(ssPerCheck)}</span>
                </div>
                <div className="px-3 py-1.5 flex justify-between">
                  <span className="text-slate-600">Medicare (1.45%)</span>
                  <span className="font-semibold text-rose-600">{fmtDeduction(medPerCheck)}</span>
                </div>
                <div className="px-3 py-1.5 flex justify-between">
                  <span className="text-slate-600">{primary.stateRule.name} State Tax</span>
                  <span className="font-semibold text-slate-700">
                    {primary.stateTax > 0 ? fmtDeduction(primary.stateTax / periods) : '$0.00 (0%)'}
                  </span>
                </div>
                {primary.sdiTax > 0 && (
                  <div className="px-3 py-1.5 flex justify-between">
                    <span className="text-slate-600">State Disability (SDI 1.3%)</span>
                    <span className="font-semibold text-rose-600">{fmtDeduction(primary.sdiTax / periods)}</span>
                  </div>
                )}
                {primary.totalPreTax > 0 && (
                  <div className="px-3 py-1.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Pre-Tax Benefits (401k/HSA/Health)</span>
                    <span className="font-semibold text-slate-700">{fmtDeduction(preTaxPerCheck)}</span>
                  </div>
                )}
                {primary.totalPostTax > 0 && (
                  <div className="px-3 py-1.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Post-Tax Deductions</span>
                    <span className="font-semibold text-slate-700">{fmtDeduction(postTaxPerCheck)}</span>
                  </div>
                )}
                <div className="px-3 py-2 flex justify-between bg-emerald-50/60 font-bold border-t border-slate-200">
                  <span className="text-emerald-950 font-bold">Net Check</span>
                  <span className="text-emerald-800 font-extrabold">{fmtExact(netPerCheck)}</span>
                </div>
              </div>
            </div>
              </>
            )}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Estimated take-home pay under IRS Publication 15-T and 2026 Social Security cap ($184,500).
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
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">{fmtDeduction(primary.federalTax / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">{fmtDeduction(primary.totalFica / row.count)}</td>
                  <td className="py-2 px-3 text-right text-slate-600 tabular-nums">
                    {(primary.stateTax + primary.sdiTax) > 0 ? fmtDeduction((primary.stateTax + primary.sdiTax) / row.count) : '$0.00'}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700 bg-emerald-50/30 tabular-nums">
                    {fmtExact(primary.netAnnual / row.count)}
                  </td>
                </tr>
              ))}
              {/* Hourly equivalent reference row */}
              <tr className="bg-slate-50/80 border-t-2 border-slate-200 hover:bg-slate-100">
                <td className="py-2 px-3 font-semibold text-slate-500 italic text-[11px]">Hourly Equiv. (2,080 hrs/yr)</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-500 text-[11px]">{fmtExact(grossAnnual / 2080)}</td>
                <td className="py-2 px-3 text-right text-rose-400 tabular-nums text-[11px]">{fmtDeduction(primary.federalTax / 2080)}</td>
                <td className="py-2 px-3 text-right text-rose-400 tabular-nums text-[11px]">{fmtDeduction(primary.totalFica / 2080)}</td>
                <td className="py-2 px-3 text-right text-slate-400 tabular-nums text-[11px]">
                  {(primary.stateTax + primary.sdiTax) > 0 ? fmtDeduction((primary.stateTax + primary.sdiTax) / 2080) : '$0.00'}
                </td>
                <td className="py-2 px-3 text-right font-bold text-emerald-600 bg-emerald-50/20 tabular-nums text-[11px]">
                  {fmtExact(primary.netAnnual / 2080)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── INTERACTIVE STATE-TO-STATE RELOCATION COMPARISON ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              State-to-State Relocation Tax Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Compare take-home pay in {primary.stateRule.name} vs. another state on {fmt(grossAnnual)} salary.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Compare with:</span>
            <select
              value={comparisonStateCode}
              onChange={(e) => setComparisonStateCode(e.target.value)}
              className="px-2.5 py-1 text-xs font-semibold border border-slate-300 rounded-md bg-white text-slate-800 outline-none cursor-pointer"
            >
              {Object.keys(US_STATES).map((sc) => (
                <option key={sc} value={sc}>
                  {US_STATES[sc].label || US_STATES[sc].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">{primary.stateRule.name} Take-Home</span>
            <span className="text-base font-bold text-slate-900 block">{fmt(primary.netAnnual)} / yr</span>
            <span className="text-[11px] text-slate-500">State Tax + SDI: {fmt(primary.stateTax + primary.sdiTax)}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">{comparison.stateRule.name} Take-Home</span>
            <span className="text-base font-bold text-slate-900 block">{fmt(comparison.netAnnual)} / yr</span>
            <span className="text-[11px] text-slate-500">State Tax + SDI: {fmt(comparison.stateTax + comparison.sdiTax)}</span>
          </div>

          <div className={`p-3 rounded-lg border ${
            primary.netAnnual >= comparison.netAnnual 
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50/60 border-rose-200 text-rose-950'
          }`}>
            <span className="text-[11px] font-semibold block mb-0.5">Net Difference</span>
            <span className="text-base font-extrabold block">
              {primary.netAnnual >= comparison.netAnnual ? '+' : '-'}
              {fmt(Math.abs(primary.netAnnual - comparison.netAnnual))} / yr
            </span>
            <span className="text-[11px] opacity-80">
              {primary.netAnnual >= comparison.netAnnual
                ? `${primary.stateRule.name} leaves you with more net income`
                : `${comparison.stateRule.name} leaves you with more net income`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
