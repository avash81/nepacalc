import { Info } from 'lucide-react';
import { useState } from 'react';
import { IncomeTaxInputs } from '@/utils/math/country-rules/nepal-income-tax/types';

interface Props {
  state: IncomeTaxInputs;
  update: (updates: Partial<IncomeTaxInputs>) => void;
  isMonthly: boolean;
  setIsMonthly: (val: boolean) => void;
}

const INCOME_TYPES = [
  'Salary Income',
  'Business Income',
  'Professional Income',
  'Freelance Income',
  'Rental Income',
  'Mixed Income',
] as const;

export function IncomeTaxForm({ state, update, isMonthly, setIsMonthly }: Props) {
  const [incomeType, setIncomeType] = useState<string>('Salary Income');

  const InputGroup = ({ label, helper, value, onChange }: any) => (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">{label}</label>
        {helper && (
          <div className="group relative cursor-help">
            <Info className="w-3.5 h-3.5 text-[#1A73E8]" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-52 p-2 bg-[#202124] text-white text-[11px] rounded shadow-lg z-10 text-center pointer-events-none">
              {helper}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#202124]"></div>
            </div>
          </div>
        )}
      </div>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden flex flex-col gap-6 p-6">

      {/* SECTION 0: INCOME TYPE */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">Income Type</h3>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#5F6368] uppercase tracking-wider block mb-1">Select Income Type</label>
          <select
            value={incomeType}
            onChange={(e) => setIncomeType(e.target.value)}
            className="w-full h-11 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer"
          >
            {INCOME_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <p className="text-[11px] text-[#5F6368] mt-1">
            {incomeType === 'Salary Income' && 'For salaried employees. Include basic salary and allowances below.'}
            {incomeType === 'Business Income' && 'For sole proprietors and individual business owners.'}
            {incomeType === 'Professional Income' && 'For consultants, doctors, lawyers, chartered accountants.'}
            {incomeType === 'Freelance Income' && 'For freelancers, developers, designers, content creators.'}
            {incomeType === 'Rental Income' && 'For income from residential or commercial property rental.'}
            {incomeType === 'Mixed Income' && 'For combined income from multiple sources.'}
          </p>
        </div>
      </div>

      {/* SECTION 1: INCOME */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">1. Primary Income</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">
                {isMonthly ? 'Monthly' : 'Annual'} Taxable Income
              </label>
              <button onClick={() => setIsMonthly(!isMonthly)} className="text-[10px] font-bold uppercase text-[#1A73E8] hover:underline">
                Switch to {isMonthly ? 'Annual' : 'Monthly'}
              </button>
            </div>
            <input
              type="number"
              value={state.annualSalary}
              onChange={(e) => update({ annualSalary: Number(e.target.value) })}
              className="w-full h-11 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-black text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>
          <InputGroup
            label="Other Taxable Income (Annual)"
            value={state.annualBonus}
            onChange={(v: number) => update({ annualBonus: v })}
            helper="Includes bonus, freelance income, rental income, professional fees, commission, allowances and other taxable earnings"
          />
        </div>
      </div>

      {/* SECTION 2: RETIREMENT */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">2. Retirement Contributions (Annual)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputGroup label="SSF" value={state.ssfContribution} onChange={(v: number) => update({ ssfContribution: v })} helper="11% Employee + 20% Employer (if applicable)" />
          <InputGroup label="EPF" value={state.epfContribution} onChange={(v: number) => update({ epfContribution: v })} helper="Employee Provident Fund (usually 10% + 10%)" />
          <InputGroup label="CIT" value={state.citContribution} onChange={(v: number) => update({ citContribution: v })} helper="Citizen Investment Trust voluntary contribution" />
        </div>
      </div>

      {/* SECTION 3: INSURANCE */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">3. Insurance Premiums (Annual)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputGroup label="Life Insurance" value={state.lifeInsurance} onChange={(v: number) => update({ lifeInsurance: v })} helper="Max allowable deduction: Rs. 40,000" />
          <InputGroup label="Health Insurance" value={state.medicalInsurance} onChange={(v: number) => update({ medicalInsurance: v })} helper="Max allowable deduction: Rs. 20,000" />
          <InputGroup label="Building Insurance" value={state.buildingInsurance} onChange={(v: number) => update({ buildingInsurance: v })} helper="Max allowable deduction: Rs. 10,000" />
        </div>
      </div>

      {/* SECTION 4: OTHER DEDUCTIONS */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">4. Other Deductions (Annual)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputGroup label="Education Fee" value={state.educationFee} onChange={(v: number) => update({ educationFee: v })} helper="Lower of 25% of tuition paid or Rs. 25,000" />
          <InputGroup label="Donation" value={state.donation} onChange={(v: number) => update({ donation: v })} helper="Max allowable deduction: Rs. 300,000 to approved institutions" />
          <InputGroup label="CSR" value={state.csr} onChange={(v: number) => update({ csr: v })} helper="Corporate Social Responsibility — up to 1% of taxable income" />
        </div>
      </div>

      {/* SECTION 5: SETTINGS */}
      <div>
        <h3 className="text-sm font-black text-[#202124] border-b border-[#DADCE0] pb-2 mb-4">5. Tax Settings</h3>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={state.gender === 'female'} onChange={(e) => update({ gender: e.target.checked ? 'female' : 'male' })} className="w-4 h-4 text-[#1A73E8]" />
            <span className="text-sm font-medium text-[#3C4043]">Female (10% Rebate)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={state.isSSFContributor} onChange={(e) => update({ isSSFContributor: e.target.checked })} className="w-4 h-4 text-[#1A73E8]" />
            <span className="text-sm font-medium text-[#3C4043]">SSF Contributor</span>
            <Info className="w-3.5 h-3.5 text-[#5F6368] group-hover:text-[#1A73E8]" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={state.enforceLimits} onChange={(e) => update({ enforceLimits: e.target.checked })} className="w-4 h-4 text-[#1A73E8]" />
            <span className="text-sm font-medium text-[#3C4043]">Enforce Govt Caps</span>
            <Info className="w-3.5 h-3.5 text-[#5F6368] group-hover:text-[#1A73E8]" />
          </label>
        </div>
      </div>

    </div>
  );
}
