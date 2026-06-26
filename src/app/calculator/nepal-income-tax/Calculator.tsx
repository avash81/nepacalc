'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Receipt, TrendingDown, Info, ShieldCheck, ArrowRightLeft, PieChart, Landmark, Scale, Zap, Activity, Globe, History, ChevronRight, HelpCircle, Table } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const DEFAULT_STATE = {
  income: 1200000,
  married: false,
  gender: 'male' as 'male' | 'female',
  isSSFContributor: true,
  lifeInsurance: 40000,
  citDeduction: 0,
  healthInsurance: 0,
  isMonthly: false
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_tax_v5', DEFAULT_STATE);
  const { income, married, gender, isSSFContributor, lifeInsurance, citDeduction, healthInsurance, isMonthly } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const annualGross = isMonthly ? income * 12 : income;

  const result = useMemo(() => {
    const insDeduction = Math.min(lifeInsurance, 40000);
    const healthInsDeduction = Math.min(healthInsurance, 20000);
    const citMax = Math.min(annualGross / 3, 500000);
    const actualCit = Math.min(citDeduction, citMax);
    const totalDeductions = insDeduction + healthInsDeduction + actualCit;
    const taxableGross = Math.max(0, annualGross - totalDeductions);

    const calculation = calculateNepalIncomeTax(
      taxableGross,
      married, 
      isSSFContributor, 
      gender
    );

    return {
      ...calculation,
      totalDeductions,
      netAnnual: annualGross - calculation.totalTax,
      netMonthly: (annualGross - calculation.totalTax) / 12,
      annualGross
    };
  }, [annualGross, married, isSSFContributor, gender, lifeInsurance, citDeduction, healthInsurance]);

  return (
    <ModernCalcLayout
      slug="nepal-income-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Income Tax' }]}
      title="Nepal Income Tax Calculator 2083/84 — Salary Tax & IRD Slabs"
      description="The authoritative fiscal engine for Nepalese salary earners. Calculate tax liability with IRD-standard slabs (FY 2083/84), SSF SST-waivers, and Female Tax Credit auditing."
      icon={Wallet}
      relatedTools={[
        { label: "Salary Calculator (Net Pay)", href: "/calculator/nepal-salary/" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" },
        { label: "Provident Fund", href: "/calculator/nepal-provident-fund/" }
      ]}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="space-y-2">
               <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">{isMonthly ? "Monthly Salary (NPR)" : "Annual Income (NPR)"}</label>
                  <button onClick={() => update({ isMonthly: !isMonthly })} className="text-[9px] font-bold uppercase text-[#1A73E8] hover:underline transition-colors">
                     Switch to {isMonthly ? "Annual" : "Monthly"}
                  </button>
               </div>
               <input 
                  type="number" 
                  value={income} 
                  onChange={(e) => update({ income: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
             </div>
             
             <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Marital Status</label>
               <select 
                  value={married ? 'married' : 'single'} 
                  onChange={(e) => update({ married: e.target.value === 'married' })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
               >
                  <option value="single">Single Status</option>
                  <option value="married">Married (Couple) Status</option>
               </select>
             </div>

             <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gender</label>
               <select 
                  value={gender} 
                  onChange={(e) => update({ gender: e.target.value as 'male' | 'female' })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
               >
                  <option value="male">Male</option>
                  <option value="female">Female (10% Rebate Eligibility)</option>
               </select>
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Life Insurance (Annual)</label>
                <input type="number" value={lifeInsurance} onChange={e => update({ lifeInsurance: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">CIT/EPF/SSF Contribution</label>
                <input type="number" value={citDeduction} onChange={e => update({ citDeduction: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2 flex items-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                     type="checkbox" 
                     checked={isSSFContributor} 
                     onChange={e => update({ isSSFContributor: e.target.checked })}
                     className="w-5 h-5 rounded border-[#DADCE0] text-[#1A73E8] focus:ring-[#1A73E8]" 
                  />
                  <span className="text-[11px] font-bold text-[#202124] uppercase tracking-wider">SSF Contributor (1% SST Waiver)</span>
                </label>
             </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Tax Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Net Take-Home Pay ({isMonthly ? 'Monthly' : 'Annual'})</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(isMonthly ? result.netMonthly : result.netAnnual)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Efficiency: {(100 - result.effectiveRate).toFixed(1)}% Retained</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Total Tax</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(isMonthly ? result.totalTax/12 : result.totalTax)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Effective Rate</div>
                <div className="text-lg font-black text-[#202124]">{result.effectiveRate}%</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
              <Globe className="w-5 h-5 text-[#188038] shrink-0" />
              <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                 Expatriate & Remittance Tax: If your salary is paid in foreign currency, refer to the <a href="/market-rates/exchange-rate-nepal/" className="text-[#1A73E8] underline font-bold">USD to NPR Exchange Rate</a> for accurate NPR tax calculation on payday.
              </p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Tax Slab Distribution</h3>
               </div>
               <div className="h-[240px] w-full mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={result.breakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={30}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DADCE0" />
                     <XAxis dataKey="slabLabel" hide />
                     <YAxis hide />
                     <Tooltip cursor={{ fill: '#F8F9FA' }} formatter={(value: number) => formatNPR(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                     <Bar dataKey="taxAmount" fill="#D93025" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-[9px] text-[#70757A] font-bold uppercase text-center tracking-wider">Visualizing the progressive tax impact across IRD slabs.</p>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#188038] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Income Shield Audit</h3>
               </div>
               <div className="space-y-6">
                  <div className="p-6 rounded-md bg-[#F8F9FA] border border-[#DADCE0]">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Tax-Exempt Portion</span>
                        <span className="text-xl font-black text-[#188038]">{(( (result.annualGross - result.taxableIncome) / result.annualGross ) * 100).toFixed(0)}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-[#E8F0FE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#188038]" style={{ width: `${( (result.annualGross - result.taxableIncome) / result.annualGross ) * 100}%` }} />
                     </div>
                     <p className="mt-4 text-[9px] text-[#5F6368] leading-relaxed uppercase tracking-widest font-bold">
                        Deductions and non-taxable slabs effectively shield this portion of your income.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-md bg-white border border-[#DADCE0]">
                        <div className="text-[9px] text-[#5F6368] uppercase font-bold mb-1">Deduction Relief</div>
                        <div className="text-sm font-black text-[#202124]">{formatNPR(result.totalDeductions)}</div>
                     </div>
                     <div className="p-4 rounded-md bg-white border border-[#DADCE0]">
                        <div className="text-[9px] text-[#5F6368] uppercase font-bold mb-1">Monthly SST/Tax</div>
                        <div className="text-sm font-black text-[#D93025]">{formatNPR(result.totalTax / 12)}</div>
                     </div>
                  </div>
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Progressive Slab Breakdown</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">Taxable Slab (NPR)</th>
                    <th className="px-6 py-4 bg-white text-right">Rate</th>
                    <th className="px-6 py-4 bg-white text-right text-[#D93025]">Tax Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {result.breakdown.map((row, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{row.slabLabel}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">{row.rate}%</td>
                      <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(row.taxAmount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8F9FA] font-black">
                    <td className="px-6 py-4 text-[#202124]">Total Tax Liability</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-right text-[#D93025]">{formatNPR(result.totalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Nepal Income Tax Calculator 2083/84",
        "url": "https://nepacalc.com/calculator/nepal-income-tax/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Calculate Nepal income tax for FY 2083/84. Enter salary to get slab-wise breakdown, SSF waiver, EPF/CIT deductions, female 10% rebate and net take-home pay.",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "NPR"
        },
        "featureList": [
          "Nepal income tax slab 2083/84",
          "SSF waiver calculation",
          "Female 10% tax rebate",
          "EPF and CIT deduction support",
          "Married vs single filer",
          "Monthly TDS output"
        ],
        "isAccessibleForFree": true,
        "publisher": {
          "@type": "Organization",
          "name": "NepaCalc",
          "url": "https://nepacalc.com"
        }
      }}
    />
  );
}

