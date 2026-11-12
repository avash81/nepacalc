'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingDown,
  Scale,
  PieChart,
  ShieldCheck,
  ChevronDown,
  ArrowRightLeft,
  CheckCircle2,
  Info,
  Calendar,
  Building2,
  HelpCircle
} from 'lucide-react';
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
  const [grossAnnual, setGrossAnnual] = useState<number>(85000);
  const [hourlyRate, setHourlyRate] = useState<number>(40);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);

  const [stateCode, setStateCode] = useState<string>('TX');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [payFrequency, setPayFrequency] = useState<PayFrequency>('biweekly');

  const [k401Contribution, setK401Contribution] = useState<number>(0);
  const [healthInsuranceAnnual, setHealthInsuranceAnnual] = useState<number>(0);
  const [hsaAnnual, setHsaAnnual] = useState<number>(0);

  const [compareStateCode, setCompareStateCode] = useState<string>('CA');

  const annualGross = useMemo(() => {
    if (payType === 'salary') {
      return Math.max(0, grossAnnual);
    } else {
      const regularPay = hourlyRate * hoursPerWeek * 52;
      const overtimePay = hourlyRate * 1.5 * overtimeHours * 52;
      return Math.max(0, regularPay + overtimePay);
    }
  }, [payType, grossAnnual, hourlyRate, hoursPerWeek, overtimeHours]);

  const calculateTaxesForState = (targetGross: number, sCode: string, fStatus: FilingStatus) => {
    const stateRule = US_STATES[sCode] || US_STATES.TX;

    const ficaWageBase = Math.max(0, targetGross - healthInsuranceAnnual - hsaAnnual);
    const fitWageBase = Math.max(0, ficaWageBase - k401Contribution);
    const sitWageBase = sCode === 'CA' || sCode === 'NJ'
      ? Math.max(0, targetGross - healthInsuranceAnnual - k401Contribution)
      : fitWageBase;

    const socialSecurityTax = Math.min(ficaWageBase, FICA_RULES.socialSecurityWageCap) * FICA_RULES.socialSecurityRate;
    const baseMedicareTax = ficaWageBase * FICA_RULES.medicareRate;
    const additionalMedicareTax = ficaWageBase > FICA_RULES.additionalMedicareWithholdingThreshold
      ? (ficaWageBase - FICA_RULES.additionalMedicareWithholdingThreshold) * FICA_RULES.additionalMedicareRate
      : 0;
    const totalMedicareTax = baseMedicareTax + additionalMedicareTax;
    const totalFica = socialSecurityTax + totalMedicareTax;

    const standardDeduction = FEDERAL_STANDARD_DEDUCTION[fStatus];
    const federalTaxableIncome = Math.max(0, fitWageBase - standardDeduction);
    let federalTax = 0;
    let prevLimit = 0;
    const brackets = FEDERAL_BRACKETS[fStatus];

    for (const b of brackets) {
      if (federalTaxableIncome > prevLimit) {
        const taxableInBracket = Math.min(federalTaxableIncome, b.upTo) - prevLimit;
        federalTax += taxableInBracket * b.rate;
        prevLimit = b.upTo;
      } else {
        break;
      }
    }

    let stateTax = 0;
    if (stateRule.type === 'flat' && stateRule.flatRate) {
      stateTax = sitWageBase * stateRule.flatRate;
    } else if (stateRule.type === 'graduated' && stateRule.brackets) {
      let stPrev = 0;
      for (const sb of stateRule.brackets) {
        const threshold = fStatus === 'married_joint' ? sb.thresholdMarried : sb.thresholdSingle;
        if (sitWageBase > stPrev) {
          const taxableInTier = Math.min(sitWageBase, threshold) - stPrev;
          stateTax += taxableInTier * sb.rate;
          stPrev = threshold;
        } else {
          break;
        }
      }
    }

    let sdiTax = 0;
    if (stateRule.sdiRate) {
      sdiTax = targetGross * stateRule.sdiRate;
    }

    const totalDeductions = k401Contribution + healthInsuranceAnnual + hsaAnnual;
    const totalTaxes = federalTax + totalFica + stateTax + sdiTax;
    const netAnnual = Math.max(0, targetGross - totalTaxes - totalDeductions);

    return {
      gross: targetGross,
      federalTax,
      socialSecurityTax,
      medicareTax: totalMedicareTax,
      totalFica,
      stateTax,
      sdiTax,
      totalTaxes,
      totalDeductions,
      netAnnual,
      effectiveTaxRate: targetGross > 0 ? (totalTaxes / targetGross) * 100 : 0,
      stateName: stateRule.name,
    };
  };

  const primaryResult = useMemo(() => {
    return calculateTaxesForState(annualGross, stateCode, filingStatus);
  }, [annualGross, stateCode, filingStatus, k401Contribution, healthInsuranceAnnual, hsaAnnual]);

  const compareResult = useMemo(() => {
    return calculateTaxesForState(annualGross, compareStateCode, filingStatus);
  }, [annualGross, compareStateCode, filingStatus, k401Contribution, healthInsuranceAnnual, hsaAnnual]);

  const periods = PAY_PERIODS[payFrequency];
  const perPaycheckNet = primaryResult.netAnnual / periods;
  const perPaycheckGross = primaryResult.gross / periods;
  const perPaycheckFed = primaryResult.federalTax / periods;
  const perPaycheckFica = primaryResult.totalFica / periods;
  const perPaycheckState = (primaryResult.stateTax + primaryResult.sdiTax) / periods;

  const fmt = (num: number) => {
    return '$' + Math.round(num).toLocaleString('en-US');
  };

  const fmtExact = (num: number) => {
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-3 space-y-4 font-sans text-gray-900 font-modern-ui">
      {/* ── TOP HEADER ── */}
      <div className="border-b border-gray-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              US Paycheck &amp; Take-Home Salary Calculator
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              IRS 2026 Updated
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Instant net take-home pay estimate after Federal Income Tax, FICA (Social Security &amp; Medicare), and State taxes.
          </p>
        </div>
      </div>

      {/* ── MAIN INTERACTIVE CALCULATOR (Prominently Placed at the Top) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* LEFT COLUMN: SIMPLE & CLEAR INPUTS */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Your Earnings &amp; Location
            </h2>
            <div className="inline-flex p-0.5 bg-gray-100 rounded-lg border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setPayType('salary')}
                className={`px-3 py-1 font-bold rounded-md transition ${
                  payType === 'salary' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Salary
              </button>
              <button
                type="button"
                onClick={() => setPayType('hourly')}
                className={`px-3 py-1 font-bold rounded-md transition ${
                  payType === 'hourly' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Hourly
              </button>
            </div>
          </div>

          {payType === 'salary' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Annual Gross Salary ($/Year)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={grossAnnual}
                  onChange={(e) => setGrossAnnual(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-base font-extrabold text-gray-900 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Hourly Rate ($/hr)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-gray-400 font-bold text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Hours / Week
                </label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 outline-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                State (Work Location)
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 bg-gray-50 outline-none cursor-pointer"
              >
                {Object.keys(US_STATES).map((sc) => (
                  <option key={sc} value={sc}>
                    {US_STATES[sc].name} ({sc}) {US_STATES[sc].type === 'none' ? '- 0% Tax' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 bg-gray-50 outline-none cursor-pointer"
              >
                <option value="single">Single</option>
                <option value="married_joint">Married Filing Jointly</option>
                <option value="head_of_household">Head of Household</option>
                <option value="married_separate">Married Filing Separately</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
              Your Pay Frequency
            </label>
            <div className="grid grid-cols-4 gap-1 text-center">
              {(['weekly', 'biweekly', 'semimonthly', 'monthly'] as PayFrequency[]).map((pf) => (
                <button
                  key={pf}
                  type="button"
                  onClick={() => setPayFrequency(pf)}
                  className={`py-1.5 text-[11px] font-bold rounded-md border transition capitalize ${
                    payFrequency === pf
                      ? 'bg-[#0f2942] text-white border-[#0f2942]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pf === 'semimonthly' ? 'Semi-Mo' : pf}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide flex items-center justify-between">
              <span>Pre-Tax Benefit Deductions (Annual)</span>
              <span className="text-[10px] text-gray-400 font-normal">Optional</span>
            </span>

            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">401(k) / Year</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  placeholder="$0"
                  value={k401Contribution || ''}
                  onChange={(e) => setK401Contribution(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2 py-1 text-xs font-medium border border-gray-200 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Health Ins / Yr</label>
                <input
                  type="number"
                  min="0"
                  step="200"
                  placeholder="$0"
                  value={healthInsuranceAnnual || ''}
                  onChange={(e) => setHealthInsuranceAnnual(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2 py-1 text-xs font-medium border border-gray-200 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">HSA / Year</label>
                <input
                  type="number"
                  min="0"
                  step="200"
                  placeholder="$0"
                  value={hsaAnnual || ''}
                  onChange={(e) => setHsaAnnual(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2 py-1 text-xs font-medium border border-gray-200 rounded-md outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HERO RESULTS (THE MAIN EVENT) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Net Pay Summary ({payFrequency.toUpperCase()} &bull; {primaryResult.stateName})
              </span>
              <span className="text-xs font-extrabold text-slate-700">
                Effective Tax Rate: {primaryResult.effectiveTaxRate.toFixed(1)}%
              </span>
            </div>

            <div className="my-3 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 block uppercase tracking-wide">
                  Your Net Take-Home Pay
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
                  {fmtExact(perPaycheckNet)}
                </span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">
                  per {payFrequency} paycheck ({periods} paychecks per year)
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block font-medium">Annual Net Total</span>
                <span className="text-lg sm:text-xl font-extrabold text-gray-900 block">
                  {fmt(primaryResult.netAnnual)}
                </span>
                <span className="text-[11px] text-gray-400">
                  from {fmt(primaryResult.gross)} gross
                </span>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span>Income Distribution</span>
                <span>Taxes: {fmt(primaryResult.totalTaxes)} ({primaryResult.effectiveTaxRate.toFixed(1)}%)</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${(primaryResult.netAnnual / primaryResult.gross) * 100}%` }}
                  className="bg-emerald-500 transition-all duration-300"
                  title={`Take-Home Pay: ${fmt(primaryResult.netAnnual)}`}
                />
                <div
                  style={{ width: `${(primaryResult.federalTax / primaryResult.gross) * 100}%` }}
                  className="bg-blue-600 transition-all duration-300"
                  title={`Federal Tax: ${fmt(primaryResult.federalTax)}`}
                />
                <div
                  style={{ width: `${(primaryResult.totalFica / primaryResult.gross) * 100}%` }}
                  className="bg-amber-500 transition-all duration-300"
                  title={`FICA: ${fmt(primaryResult.totalFica)}`}
                />
                <div
                  style={{ width: `${((primaryResult.stateTax + primaryResult.sdiTax) / primaryResult.gross) * 100}%` }}
                  className="bg-purple-600 transition-all duration-300"
                  title={`State & Disability Tax: ${fmt(primaryResult.stateTax + primaryResult.sdiTax)}`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Take-Home ({((primaryResult.netAnnual / primaryResult.gross) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Federal ({((primaryResult.federalTax / primaryResult.gross) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  FICA ({((primaryResult.totalFica / primaryResult.gross) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  State ({(((primaryResult.stateTax + primaryResult.sdiTax) / primaryResult.gross) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold">
                    <th className="py-2 px-3">Tax Component</th>
                    <th className="py-2 px-3 text-right">Per {payFrequency.slice(0, 1).toUpperCase() + payFrequency.slice(1)}</th>
                    <th className="py-2 px-3 text-right">Annual Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slate-800">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-900">Gross Salary</td>
                    <td className="py-2 px-3 text-right font-bold tabular-nums">{fmtExact(perPaycheckGross)}</td>
                    <td className="py-2 px-3 text-right font-bold tabular-nums">{fmt(primaryResult.gross)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      Federal Income Tax
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">-{fmtExact(perPaycheckFed)}</td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">-{fmt(primaryResult.federalTax)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Social Security (6.2%)
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      -{fmtExact(primaryResult.socialSecurityTax / periods)}
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      -{fmt(primaryResult.socialSecurityTax)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Medicare (1.45%)
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      -{fmtExact(primaryResult.medicareTax / periods)}
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      -{fmt(primaryResult.medicareTax)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      {primaryResult.stateName} Income Tax
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      {primaryResult.stateTax > 0 ? `-${fmtExact(primaryResult.stateTax / periods)}` : '$0.00 (0%)'}
                    </td>
                    <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                      {primaryResult.stateTax > 0 ? `-${fmt(primaryResult.stateTax)}` : '$0 (No State Tax)'}
                    </td>
                  </tr>
                  {primaryResult.sdiTax > 0 && (
                    <tr>
                      <td className="py-2 px-3 text-gray-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                        State Disability Insurance (SDI)
                      </td>
                      <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                        -{fmtExact(primaryResult.sdiTax / periods)}
                      </td>
                      <td className="py-2 px-3 text-right text-rose-600 font-semibold tabular-nums">
                        -{fmt(primaryResult.sdiTax)}
                      </td>
                    </tr>
                  )}
                  {primaryResult.totalDeductions > 0 && (
                    <tr className="bg-slate-50/60">
                      <td className="py-2 px-3 text-gray-600">Pre-Tax Benefits (401k/HSA/Health)</td>
                      <td className="py-2 px-3 text-right text-gray-600 font-semibold tabular-nums">
                        -{fmtExact(primaryResult.totalDeductions / periods)}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600 font-semibold tabular-nums">
                        -{fmt(primaryResult.totalDeductions)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-emerald-50 font-bold border-t-2 border-emerald-300">
                    <td className="py-2.5 px-3 text-emerald-950 font-extrabold text-sm">Net Take-Home Pay</td>
                    <td className="py-2.5 px-3 text-right text-emerald-800 font-black text-sm tabular-nums">
                      {fmtExact(perPaycheckNet)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-800 font-black text-sm tabular-nums">
                      {fmt(primaryResult.netAnnual)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL PAY FREQUENCIES SUMMARY TABLE ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-2">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-blue-600" />
          Complete Take-Home Pay Breakdown Across All Pay Frequencies
        </h3>
        <p className="text-[11px] text-gray-500">
          Compare your net paycheck amount whether you are paid weekly, bi-weekly, semi-monthly, or monthly.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                <th className="py-2 px-3">Frequency</th>
                <th className="py-2 px-3">Paychecks / Year</th>
                <th className="py-2 px-3 text-right">Gross Pay</th>
                <th className="py-2 px-3 text-right">Federal Tax</th>
                <th className="py-2 px-3 text-right">FICA (SS+Med)</th>
                <th className="py-2 px-3 text-right">State Tax</th>
                <th className="py-2 px-3 text-right text-emerald-900 font-extrabold bg-emerald-50/50">Net Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {[
                { name: 'Annually', count: 1 },
                { name: 'Monthly', count: 12 },
                { name: 'Semi-Monthly (2x/mo)', count: 24 },
                { name: 'Bi-Weekly (Every 2 wks)', count: 26 },
                { name: 'Weekly', count: 52 },
                { name: 'Hourly (2,080 hrs)', count: 2080 },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-slate-50 transition">
                  <td className="py-2 px-3 font-bold text-gray-900">{row.name}</td>
                  <td className="py-2 px-3 text-gray-500">{row.count}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{fmtExact(primaryResult.gross / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-{fmtExact(primaryResult.federalTax / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">-{fmtExact(primaryResult.totalFica / row.count)}</td>
                  <td className="py-2 px-3 text-right text-rose-600 tabular-nums">
                    -{fmtExact((primaryResult.stateTax + primaryResult.sdiTax) / row.count)}
                  </td>
                  <td className="py-2 px-3 text-right font-black text-emerald-700 bg-emerald-50/40 tabular-nums">
                    {fmtExact(primaryResult.netAnnual / row.count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── STATE-TO-STATE RELOCATION COMPARISON MODULE ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-gray-100 pb-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-purple-600" />
              State-to-State Relocation Tax Comparison
            </h3>
            <p className="text-[11px] text-gray-500">
              See exactly how much your take-home pay changes if you move between states on the exact same salary.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Compare with:</span>
            <select
              value={compareStateCode}
              onChange={(e) => setCompareStateCode(e.target.value)}
              className="text-xs font-bold border border-gray-300 rounded-md py-1 px-2 bg-gray-50"
            >
              {Object.keys(US_STATES).map((sc) => (
                <option key={sc} value={sc}>
                  {US_STATES[sc].name} ({sc})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-800">{primaryResult.stateName} ({stateCode})</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Current</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-gray-500">Annual Net Take-Home:</span>
              <span className="text-lg font-black text-emerald-800 tabular-nums">{fmt(primaryResult.netAnnual)}</span>
            </div>
            <div className="text-[11px] text-gray-500 space-y-0.5 pt-1 border-t border-slate-200">
              <div className="flex justify-between">
                <span>State Income Tax:</span>
                <span className="font-semibold text-gray-700">{fmt(primaryResult.stateTax + primaryResult.sdiTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Effective Total Tax Rate:</span>
                <span className="font-semibold text-gray-700">{primaryResult.effectiveTaxRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-purple-950">{compareResult.stateName} ({compareStateCode})</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900">Comparison</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-gray-500">Annual Net Take-Home:</span>
              <span className="text-lg font-black text-purple-900 tabular-nums">{fmt(compareResult.netAnnual)}</span>
            </div>
            <div className="text-[11px] text-gray-500 space-y-0.5 pt-1 border-t border-purple-200">
              <div className="flex justify-between">
                <span>State Income Tax:</span>
                <span className="font-semibold text-gray-700">{fmt(compareResult.stateTax + compareResult.sdiTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Effective Total Tax Rate:</span>
                <span className="font-semibold text-gray-700">{compareResult.effectiveTaxRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-gray-200 bg-amber-50/60 flex items-center justify-between text-xs">
          <span className="font-bold text-gray-800">
            Net Difference between {primaryResult.stateName} and {compareResult.stateName}:
          </span>
          <span className="font-black text-sm text-slate-900 tabular-nums">
            {fmt(Math.abs(primaryResult.netAnnual - compareResult.netAnnual))} / year{' '}
            <span className="text-xs font-normal text-gray-500">
              ({fmt(Math.abs(primaryResult.netAnnual - compareResult.netAnnual) / 12)}/mo)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
