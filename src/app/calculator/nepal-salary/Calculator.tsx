'use client';
import { useMemo, useState, useCallback, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import {
  Wallet, Landmark, Scale, Receipt, ChevronDown, ChevronUp,
  ShieldCheck, Download, Printer, Copy, Check, Info, TrendingUp, Share2, Lightbulb
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalSalary, FiscalYear, SalaryAllowances, SalaryDeductions } from '@/utils/math/country-rules/nepal';
import {
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

type RetirementType = 'none' | 'cit' | 'pf';

const DEFAULT_STATE = {
  salary: 80000,
  isAnnualFrequency: false,
  isMarried: false,
  isSSFContributor: true,
  retirementType: 'none' as RetirementType,
  retirementMonthlyAmount: 0,
  gender: 'male' as 'male' | 'female',
  annualBonus: 0,
  fiscalYear: '2083/84' as FiscalYear,
  allowances: { housing: 0, transport: 0, communication: 0, meal: 0, other: 0 } as SalaryAllowances,
  deductions: { lifeInsurance: 0, healthInsurance: 0, buildingInsurance: 0, donation: 0, education: 0, other: 0 } as SalaryDeductions,
};

function formatNPR(n: number) {
  if (isNaN(n) || !isFinite(n)) return 'Rs. 0';
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}
function formatPct(n: number) {
  return n.toFixed(2) + '%';
}

export default function NepalSalaryCalculator() {
  const [state, setState] = useSyncState('salary_v8_2083', DEFAULT_STATE);
  const [showAllowances, setShowAllowances] = useState(false);
  const [showDeductions, setShowDeductions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');
  // Phase 5 state
  const [compareMode, setCompareMode] = useState(false);
  const [compareSalary, setCompareSalary] = useState(150000);
  const printRef = useRef<HTMLDivElement>(null);

  const update = useCallback((u: Partial<typeof state>) => setState({ ...state, ...u }), [state, setState]);
  const updateAllowance = (key: keyof SalaryAllowances, val: number) =>
    update({ allowances: { ...state.allowances, [key]: Math.max(0, val) } });
  const updateDeduction = (key: keyof SalaryDeductions, val: number) =>
    update({ deductions: { ...state.deductions, [key]: Math.max(0, val) } });

  const errors = useMemo(() => {
    const e: string[] = [];
    if (!state.salary || state.salary <= 0) e.push('Salary must be greater than zero.');
    if (state.salary < 0) e.push('Salary cannot be negative.');
    if (state.retirementType !== 'none' && state.retirementMonthlyAmount >= state.salary)
      e.push('Retirement contribution cannot exceed monthly salary.');
    return e;
  }, [state.salary, state.retirementType, state.retirementMonthlyAmount]);

  const result = useMemo(() => {
    if (errors.length > 0 || state.salary <= 0) return null;
    return calculateNepalSalary(
      state.salary, state.isAnnualFrequency, state.isSSFContributor,
      state.retirementType, state.retirementMonthlyAmount,
      state.gender, state.annualBonus, state.allowances, state.deductions, state.isMarried, state.fiscalYear
    );
  }, [state, errors]);

  const pieData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'Take-Home', value: result.monthly.net },
      { name: 'Income Tax', value: result.monthly.tax },
      { name: 'Employee SSF', value: result.monthly.ssf_employee },
      { name: 'Retirement', value: result.monthly.retirement_contribution },
    ].filter(d => d.value > 0);
  }, [result]);

  const handleCopy = () => {
    if (!result) return;
    const text = `Nepal Salary Calculation Summary (${state.fiscalYear})\nGross Monthly Salary: ${formatNPR(result.monthly.gross)}\nEmployee SSF (11%): ${formatNPR(result.monthly.ssf_employee)}\nEmployer SSF (20%): ${formatNPR(result.monthly.ssf_employer)}\nCIT/PF Contribution: ${formatNPR(result.monthly.retirement_contribution)}\nAnnual Taxable Income: ${formatNPR(result.annual.taxableIncome)}\nAnnual Income Tax: ${formatNPR(result.annual.tax)}\nMonthly Income Tax: ${formatNPR(result.monthly.tax)}\nMonthly Take-Home Salary: ${formatNPR(result.monthly.net)}\nAnnual Take-Home Salary: ${formatNPR(result.annual.net)}\nEmployer Total Cost (CTC): ${formatNPR(result.monthly.ctc)}/month\nEffective Tax Rate: ${formatPct(result.effectiveRate)}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const handlePrint = () => window.print();

  // Phase 5: Share handlers
  const handleShareWhatsApp = () => {
    if (!result) return;
    const text = encodeURIComponent(`Nepal Salary Tax Calculation (FY ${state.fiscalYear})\nGross: ${formatNPR(result.monthly.gross)}/mo\nTax: ${formatNPR(result.monthly.tax)}/mo\nTake-Home: ${formatNPR(result.monthly.net)}/mo\nEffective Rate: ${formatPct(result.effectiveRate)}\nCalculate yours: https://nepacalc.com/calculator/nepal-salary/`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };
  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://nepacalc.com/calculator/nepal-salary/')}`, '_blank');
  };
  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://nepacalc.com/calculator/nepal-salary/';
    navigator.clipboard.writeText(url).then(() => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); });
  };

  // Phase 5: Comparison salary result
  const compareResult = useMemo(() => {
    if (!compareMode || compareSalary <= 0) return null;
    return calculateNepalSalary(
      compareSalary, false, state.isSSFContributor,
      state.retirementType, state.retirementMonthlyAmount,
      state.gender, 0, { housing:0,transport:0,communication:0,meal:0,other:0 },
      { lifeInsurance:0,healthInsurance:0,buildingInsurance:0,donation:0,education:0,other:0 },
      state.isMarried, state.fiscalYear
    );
  }, [compareMode, compareSalary, state.isSSFContributor, state.retirementType, state.retirementMonthlyAmount, state.gender, state.isMarried, state.fiscalYear]);

  // Phase 5: Growth simulation (5%, 10%, 20% increments)
  const growthSims = useMemo(() => {
    if (!result || !state.salary) return [];
    return [5, 10, 20].map(pct => {
      const newSalary = state.salary * (1 + pct / 100);
      const sim = calculateNepalSalary(
        newSalary, state.isAnnualFrequency, state.isSSFContributor,
        state.retirementType, state.retirementMonthlyAmount,
        state.gender, state.annualBonus, state.allowances, state.deductions, state.isMarried, state.fiscalYear
      );
      return { pct, newSalary, tax: sim.monthly.tax, net: sim.monthly.net, rate: sim.effectiveRate,
               taxDelta: sim.monthly.tax - result.monthly.tax, netDelta: sim.monthly.net - result.monthly.net };
    });
  }, [result, state]);

  // Phase 5: Tax saving tips
  const taxTips = useMemo(() => {
    if (!result) return [];
    const tips: { icon: string; title: string; tip: string }[] = [];
    if (!state.isSSFContributor)
      tips.push({ icon: '🛡️', title: 'Enrol in SSF', tip: 'SSF contributors get an 11% deduction on taxable income plus a 1% social security tax waiver on the first Rs. 10,00,000. This can meaningfully reduce your income tax.' });
    if (state.retirementType === 'none')
      tips.push({ icon: '🏦', title: 'Consider CIT or PF', tip: 'CIT and Provident Fund contributions reduce your annual taxable income (combined with SSF, capped at one-third of salary or Rs. 5,00,000).' });
    if (result.annual.taxableIncome > 1000000 && state.deductions.lifeInsurance === 0)
      tips.push({ icon: '❤️', title: 'Life Insurance Deduction', tip: "Life insurance premiums are deductible up to Rs. 40,000 per year. Check whether your premiums qualify under Nepal's Income Tax Act." });
    if (state.deductions.buildingInsurance === 0)
      tips.push({ icon: '🏠', title: 'Residential Building Insurance', tip: 'Residential building insurance premiums are now deductible up to Rs. 10,000 per year under the FY 2083/84 Finance Act.' });
    if (state.deductions.education === 0)
      tips.push({ icon: '🎓', title: 'Education Deduction (New FY 2083/84)', tip: 'Tuition paid is deductible at 25% of annual tuition (maximum Rs. 25,000) under the new FY 2083/84 deduction rules.' });
    if (state.deductions.donation === 0 && result.annual.taxableIncome > 2000000)
      tips.push({ icon: '🎁', title: 'Approved Donation Deduction', tip: 'Donations to approved organizations are deductible up to Rs. 3,00,000 (FY 2083/84 limit). Verify eligibility with the recipient organization.' });
    return tips.slice(0, 4);
  }, [result, state]);

  const PIE_COLORS = ['#188038', '#D93025', '#1A73E8', '#F29900'];

  const inputPanel = (
    <div className="space-y-5">
      {/* FY Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Financial Year</label>
        <select
          value={state.fiscalYear}
          onChange={e => update({ fiscalYear: e.target.value as FiscalYear })}
          className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer"
        >
          <option value="2083/84">FY 2083/84 (Current)</option>
          <option value="2082/83">FY 2082/83</option>
          <option value="2081/82">FY 2081/82</option>
        </select>
      </div>

      {/* Salary & Frequency */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1.5">
          <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">
            {state.isAnnualFrequency ? 'Annual Gross Salary (NPR)' : 'Monthly Gross Salary (NPR)'}
          </label>
          <input
            type="number" min={0}
            value={state.salary}
            onChange={e => update({ salary: Math.max(0, Number(e.target.value)) })}
            className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Frequency</label>
          <select
            value={state.isAnnualFrequency ? 'annual' : 'monthly'}
            onChange={e => update({ isAnnualFrequency: e.target.value === 'annual' })}
            className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
      </div>

      {/* Gender and Marital Status */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            {(['male', 'female'] as const).map(g => (
              <button key={g} onClick={() => update({ gender: g })}
                className={`h-10 rounded-md text-xs font-black uppercase transition-all border ${state.gender === g ? 'bg-[#1A73E8] text-white border-[#1A73E8]' : 'bg-white text-[#5F6368] border-[#DADCE0] hover:border-[#1A73E8]'}`}>
                {g === 'male' ? 'Male' : 'Female (10% Rebate)'}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Marital Status</label>
          <div className="grid grid-cols-2 gap-2">
            {[false, true].map(m => (
              <button key={m ? 'married' : 'unmarried'} onClick={() => update({ isMarried: m })}
                className={`h-10 rounded-md text-xs font-black uppercase transition-all border ${state.isMarried === m ? 'bg-[#1A73E8] text-white border-[#1A73E8]' : 'bg-white text-[#5F6368] border-[#DADCE0] hover:border-[#1A73E8]'}`}>
                {m ? 'Married' : 'Unmarried'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SSF */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-[#DADCE0] pb-1.5">
          <ShieldCheck className="w-4 h-4 text-[#1A73E8]" />
          <span className="text-[11px] font-black uppercase tracking-widest text-[#202124]">Social Security Fund (SSF)</span>
        </div>
        <label className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all ${state.isSSFContributor ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
          <div>
            <p className={`text-[11px] font-black uppercase ${state.isSSFContributor ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>SSF Enrolled</p>
            <p className="text-[9px] font-bold text-[#5F6368] mt-0.5">Employee 11% · Employer 20% · Total 31%</p>
            <p className="text-[9px] text-emerald-600 font-bold mt-0.5">Employee contribution reduces your taxable income</p>
          </div>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${state.isSSFContributor ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0]'}`}>
            {state.isSSFContributor && <Check className="w-3 h-3 text-white" />}
          </div>
          <input type="checkbox" className="hidden" checked={state.isSSFContributor} onChange={() => update({ isSSFContributor: !state.isSSFContributor })} />
        </label>
      </div>

      {/* Retirement Contribution */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-[#DADCE0] pb-1.5">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#202124]">Retirement Contribution</span>
        </div>
        <select
          value={state.retirementType}
          onChange={e => update({ retirementType: e.target.value as RetirementType })}
          className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none appearance-none"
        >
          <option value="none">None</option>
          <option value="cit">Citizen Investment Trust (CIT)</option>
          <option value="pf">Provident Fund (PF)</option>
        </select>
        {state.retirementType !== 'none' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly Contribution (NPR)</label>
            <input
              type="number" min={0}
              value={state.retirementMonthlyAmount}
              onChange={e => update({ retirementMonthlyAmount: Math.max(0, Number(e.target.value)) })}
              className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
            />
          </div>
        )}
      </div>

      {/* Annual Bonus */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Annual Bonus (NPR)</label>
        <input
          type="number" min={0}
          value={state.annualBonus}
          onChange={e => update({ annualBonus: Math.max(0, Number(e.target.value)) })}
          placeholder="0: Dashain, Festival, Performance Bonus"
          className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none placeholder-[#9AA0A6]"
        />
      </div>

      {/* Taxable Allowances accordion */}
      <div className="border border-[#DADCE0] rounded-md overflow-hidden">
        <button
          onClick={() => setShowAllowances(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F9FA] hover:bg-[#F1F3F4] transition-colors"
        >
          <span className="text-[11px] font-black uppercase tracking-wider text-[#202124]">Taxable Allowances (Monthly)</span>
          {showAllowances ? <ChevronUp className="w-4 h-4 text-[#5F6368]" /> : <ChevronDown className="w-4 h-4 text-[#5F6368]" />}
        </button>
        {showAllowances && (
          <div className="p-4 grid grid-cols-1 gap-3 bg-white">
            {([
              ['housing', 'Housing Allowance'],
              ['transport', 'Transport Allowance'],
              ['communication', 'Communication Allowance'],
              ['meal', 'Meal Allowance'],
              ['other', 'Other Taxable Benefits'],
            ] as [keyof SalaryAllowances, string][]).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">{label}</label>
                <input
                  type="number" min={0}
                  value={state.allowances[key]}
                  onChange={e => updateAllowance(key, Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Deductions accordion */}
      <div className="border border-[#DADCE0] rounded-md overflow-hidden">
        <button
          onClick={() => setShowDeductions(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F9FA] hover:bg-[#F1F3F4] transition-colors"
        >
          <span className="text-[11px] font-black uppercase tracking-wider text-[#202124]">Approved Deductions (Annual)</span>
          {showDeductions ? <ChevronUp className="w-4 h-4 text-[#5F6368]" /> : <ChevronDown className="w-4 h-4 text-[#5F6368]" />}
        </button>
        {showDeductions && (
          <div className="p-4 space-y-3 bg-white">
            {([
              ['lifeInsurance', 'Life Insurance Premium', 'Max Rs. 40,000'],
              ['healthInsurance', 'Health Insurance Premium', 'Max Rs. 20,000'],
              ['buildingInsurance', 'Residential Building Insurance', 'Max Rs. 10,000'],
              ['donation', 'Donation (Approved)', 'Max Rs. 3,00,000'],
              ['education', 'Annual Tuition Paid', 'Deduction: 25% (max Rs. 25,000)'],
              ['other', 'Other Approved Deductions', ''],
            ] as [keyof SalaryDeductions, string, string][]).map(([key, label, note]) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                  {label} {note && <span className="text-emerald-600 normal-case font-normal">- {note}</span>}
                </label>
                <input
                  type="number" min={0}
                  value={state.deductions[key]}
                  onChange={e => updateDeduction(key, Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md space-y-1">
          {errors.map((e, i) => <p key={i} className="text-xs text-red-700 font-bold">⚠ {e}</p>)}
        </div>
      )}
    </div>
  );

  const resultsPanel = result ? (
    <div className="space-y-4">
      {/* Hero card */}
      <div className="bg-[#E8F0FE] rounded-xl p-6 text-center space-y-1">
        <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Monthly Take-Home Salary</div>
        <div className="text-5xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.monthly.net)}</div>
        <div className="flex justify-center gap-2 mt-2 flex-wrap">
          <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-[#5F6368] border border-[#DADCE0]">
            Effective Tax Rate: {formatPct(result.effectiveRate)}
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-[#5F6368] border border-[#DADCE0]">
            Marginal Tax Rate: {(() => {
              const slabs = result.taxBreakdown.filter(s => s.taxAmount > 0);
              return slabs.length > 0 ? slabs[slabs.length - 1].rate + '%' : '0%';
            })()}
          </span>
          {state.gender === 'female' && (
            <span className="px-3 py-1 bg-blue-50 rounded-full text-[10px] font-black text-blue-700 border border-blue-200">10% Female Rebate Applied</span>
          )}
        </div>
      </div>

      {/* Summary ledger */}
      <div className="bg-white border border-[#DADCE0] rounded-xl p-5 space-y-2.5 shadow-sm overflow-x-auto">
        <p className="text-[11px] font-black text-[#202124] uppercase tracking-wider border-b border-[#F1F3F4] pb-2">Salary Calculation Summary</p>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-[10px] text-[#5F6368] uppercase tracking-wider border-b border-[#F1F3F4]">
              <th className="font-bold py-2">Description</th>
              <th className="font-bold py-2 text-right">Monthly</th>
              <th className="font-bold py-2 text-right">Annual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F4]">
            {[
              { label: 'Gross Salary', m: result.monthly.gross, a: result.annual.gross, color: 'text-[#202124]' },
              { label: 'Employee SSF (11%)', m: result.monthly.ssf_employee, a: result.annual.ssf_employee, color: 'text-orange-600' },
              { label: 'Employer SSF (20%) CTC', m: result.monthly.ssf_employer, a: result.annual.ssf_employer, color: 'text-emerald-600' },
              ...(state.retirementType !== 'none' ? [{ label: `${state.retirementType.toUpperCase()} Contribution`, m: result.monthly.retirement_contribution, a: result.annual.retirement_contribution, color: 'text-blue-600' }] : []),
              { label: 'Taxable Income', m: result.annual.taxableIncome / 12, a: result.annual.taxableIncome, color: 'text-[#202124]' },
              { label: 'Income Tax', m: result.monthly.tax, a: result.annual.tax, color: 'text-red-600' },
              { label: 'Take-Home Salary', m: result.monthly.net, a: result.annual.net, color: 'text-emerald-700 font-black text-base' },
              { label: 'Employer Total Cost (CTC)', m: result.monthly.ctc, a: result.annual.ctc, color: 'text-purple-700' },
            ].map((row, i) => (
              <tr key={i}>
                <td className="py-2.5 text-[#5F6368] font-bold text-xs">{row.label}</td>
                <td className={`py-2.5 text-right font-black ${row.color}`}>{formatNPR(row.m)}</td>
                <td className={`py-2.5 text-right font-black ${row.color}`}>{formatNPR(row.a)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slab-wise tax breakdown */}
      {result.taxBreakdown.length > 0 && (
        <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-black text-[#202124] uppercase tracking-wider border-b border-[#F1F3F4] pb-2 mb-3">Tax Slab Breakdown (Annual)</p>
          <div className="space-y-2">
            {result.taxBreakdown.map((slab, i) => (
              <div key={i} className={`flex justify-between items-center text-xs p-2.5 rounded-md ${slab.taxAmount < 0 ? 'bg-blue-50 text-blue-700' : slab.rate === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F8F9FA] text-[#202124]'}`}>
                <div>
                  <span className="font-black">{slab.slabLabel}</span>
                  {slab.rate !== 0 && slab.rate !== -10 && <span className="ml-2 opacity-60">@ {slab.rate}%</span>}
                </div>
                <span className="font-black">{slab.taxAmount < 0 ? '−' : ''}{formatNPR(Math.abs(slab.taxAmount))}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-sm p-3 bg-[#202124] text-white rounded-md font-black">
              <span>Total Annual Income Tax</span>
              <span>{formatNPR(result.annual.tax)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Last Updated: FY 2083/84 Finance Act: Government of Nepal</span>
      </div>

      {/* Export row */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-[#DADCE0] text-[10px] font-black text-[#5F6368] hover:bg-[#F8F9FA] transition-colors uppercase">
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-[#DADCE0] text-[10px] font-black text-[#5F6368] hover:bg-[#F8F9FA] transition-colors uppercase">
          <Printer className="w-3 h-3" />
          Print
        </button>
        <button onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-[#DADCE0] text-[10px] font-black text-[#5F6368] hover:bg-[#F8F9FA] transition-colors uppercase">
          <Download className="w-3 h-3" />
          PDF
        </button>
      </div>

      {/* Share row */}
      <div>
        <p className="text-[9px] font-black text-[#9AA0A6] uppercase tracking-wider mb-1.5">Share Result</p>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1.5 h-9 rounded-md bg-emerald-500 text-white text-[10px] font-black hover:bg-emerald-600 transition-colors">
            <Share2 className="w-3 h-3" /> WhatsApp
          </button>
          <button onClick={handleShareFacebook}
            className="flex items-center justify-center gap-1.5 h-9 rounded-md bg-blue-600 text-white text-[10px] font-black hover:bg-blue-700 transition-colors">
            <Share2 className="w-3 h-3" /> Facebook
          </button>
          <button onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 h-9 rounded-md border border-[#DADCE0] text-[10px] font-black text-[#5F6368] hover:bg-[#F8F9FA] transition-colors">
            {linkCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            {linkCopied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Assumptions */}
      <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-md text-[10px] text-slate-500">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <p><strong>Assumptions:</strong> Resident Individual · FY {state.fiscalYear} Income Tax Rates · Progressive Annual Tax Calculation · Monthly Salary Converted to Annual · Standard Approved Deductions Only.</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-64 text-[#5F6368] text-sm font-bold">
      Enter a valid salary to see results.
    </div>
  );

  const detailsPanel = result ? (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
            <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
            <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Payroll Distribution</h3>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[9px] font-bold text-[#5F6368] uppercase">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Waterfall breakdown */}
        <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
            <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
            <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Calculation Flow (Monthly)</h3>
          </div>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'Gross Monthly Salary', value: result.monthly.gross, type: 'gross' },
              { label: '− Employee SSF (11%)', value: result.monthly.ssf_employee, type: 'deduct' },
              ...(state.retirementType !== 'none' ? [{ label: `− ${state.retirementType.toUpperCase()} Contribution`, value: result.monthly.retirement_contribution, type: 'deduct' }] : []),
              { label: '− Estimated Monthly Tax', value: result.monthly.tax, type: 'tax' },
              { label: '= Monthly Take-Home Salary', value: result.monthly.net, type: 'net' },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between px-3 py-2 rounded ${row.type === 'net' ? 'bg-emerald-600 text-white font-black' : row.type === 'tax' ? 'bg-red-50 text-red-700' : row.type === 'deduct' ? 'bg-orange-50 text-orange-700' : 'bg-[#F8F9FA] text-[#202124]'}`}>
                <span className="font-bold">{row.label}</span>
                <span className="font-black">{formatNPR(row.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase 5: Salary Comparison ─────────────────────────── */}
      <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1A73E8]" />
            <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Salary Comparison</h3>
          </div>
          <button onClick={() => setCompareMode(v => !v)}
            className={`text-[10px] font-black px-3 py-1 rounded-full border transition-all ${compareMode ? 'bg-[#1A73E8] text-white border-[#1A73E8]' : 'border-[#DADCE0] text-[#5F6368] hover:bg-[#F8F9FA]'}`}>
            {compareMode ? 'On' : 'Compare'}
          </button>
        </div>
        {compareMode && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#5F6368] uppercase tracking-wider">Second Monthly Salary (NPR)</label>
              <input type="number" min={0} value={compareSalary}
                onChange={e => setCompareSalary(Math.max(0, Number(e.target.value)))}
                className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-2.5 text-left font-black">Metric</th>
                    <th className="p-2.5 text-right font-black">Salary A<br/><span className="font-normal opacity-75">{formatNPR(result.monthly.gross)}/mo</span></th>
                    <th className="p-2.5 text-right font-black">Salary B<br/><span className="font-normal opacity-75">{compareResult ? formatNPR(compareResult.monthly.gross) : '—'}/mo</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Monthly Tax', result.monthly.tax, compareResult?.monthly.tax],
                    ['Take-Home', result.monthly.net, compareResult?.monthly.net],
                    ['Effective Rate', null, null],
                    ['Employer CTC', result.monthly.ctc, compareResult?.monthly.ctc],
                  ].map(([label, a, b], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2.5 font-bold text-slate-600">{String(label)}</td>
                      <td className="p-2.5 text-right font-black text-slate-900">
                        {label === 'Effective Rate' ? formatPct(result.effectiveRate) : formatNPR(Number(a))}
                      </td>
                      <td className="p-2.5 text-right font-black text-blue-700">
                        {compareResult ? (label === 'Effective Rate' ? formatPct(compareResult.effectiveRate) : formatNPR(Number(b))) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!compareMode && (
          <p className="text-xs text-[#9AA0A6] text-center py-2">Enable comparison to view two salaries side by side.</p>
        )}
      </div>

      {/* ── Phase 5: Growth Simulation ─────────────────────────── */}
      {growthSims.length > 0 && (
        <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Salary Growth Simulation</h3>
          </div>
          <p className="text-[10px] text-[#5F6368] mb-4">If your salary increases, here is how your estimated monthly tax and take-home salary would change:</p>
          <div className="space-y-2">
            {growthSims.map(({ pct, newSalary, tax, net, rate, taxDelta, netDelta }) => (
              <div key={pct} className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                <span className="text-[10px] font-black bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">+{pct}%</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-slate-800">{formatNPR(newSalary)}/month</p>
                  <p className="text-[9px] text-slate-500">Tax: {formatNPR(tax)} (+{formatNPR(taxDelta)}) · Take-Home: {formatNPR(net)} (+{formatNPR(netDelta)}) · Rate: {formatPct(rate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Phase 5: Tax Saving Tips ────────────────────────────── */}
      {taxTips.length > 0 && (
        <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Tax Saving Suggestions</h3>
          </div>
          <p className="text-[9px] text-[#9AA0A6] mb-3">Informational only — not financial advice. Consult your employer or a tax professional.</p>
          <div className="space-y-3">
            {taxTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-100 rounded-lg">
                <span className="text-lg shrink-0">{tip.icon}</span>
                <div>
                  <p className="text-xs font-black text-amber-900 mb-0.5">{tip.title}</p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Legal disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 mt-6">
        <strong>Disclaimer:</strong> This calculator provides an estimate based on the latest Government of Nepal FY {state.fiscalYear} Income Tax Act and Finance Act provisions. Individual tax liabilities may vary depending on personal circumstances, applicable deductions, employment status, and future IRD amendments. Verify with your employer or tax advisor.
      </div>
    </div>
  ) : null;

  return (
    <ModernCalcLayout
      slug="nepal-salary"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Salary Calculator' }]}
      title="Nepal Salary Tax Calculator (FY 2083/84)"
      hideH1={true}
      description="Calculate your Nepal salary tax instantly using the latest FY 2083/84 income tax rates announced by the Government of Nepal. Enter your monthly salary to receive an accurate breakdown of income tax, Social Security Fund (SSF), Citizen Investment Trust (CIT), employer contribution, take-home salary and total employer cost."
      icon={Wallet}
      relatedTools={[
        { label: 'Nepal Income Tax Slabs', href: '/calculator/nepal-income-tax/' },
        { label: 'TDS Calculator', href: '/calculator/nepal-tds/' },
        { label: 'Provident Fund Calculator', href: '/calculator/nepal-provident-fund/' },
        { label: 'VAT Calculator', href: '/calculator/nepal-vat/' },
      ]}
      inputs={inputPanel}
      results={resultsPanel}
      details={detailsPanel}
      sidebar={{
        title: 'Salary Hub Nepal',
        subtitle: 'Compliance Tools',
        links: [
          { label: 'Nepal Income Tax Slabs', href: '/calculator/nepal-income-tax/', icon: Wallet },
          { label: 'TDS Calculator', href: '/calculator/nepal-tds/', icon: Scale },
          { label: 'Provident Fund Calculator', href: '/calculator/nepal-provident-fund/', icon: Receipt },
          { label: 'Labor Act 2074', href: 'https://moless.gov.np', icon: Landmark },
        ],
      }}
      faqs={[]}
      seoContent={null}
    />
  );
}
