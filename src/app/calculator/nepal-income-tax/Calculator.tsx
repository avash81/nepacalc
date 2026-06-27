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
  income: 0,
  bonus: 0,
  gender: 'male' as 'male' | 'female',
  isSSFContributor: true,
  ssfDeduction: 0,
  epfDeduction: 0,
  citDeduction: 0,
  lifeInsurance: 0,
  healthInsurance: 0,
  isMonthly: false,
  noOfMonths: 12
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_tax_v5', DEFAULT_STATE);
  const { income, bonus, gender, isSSFContributor, ssfDeduction, epfDeduction, citDeduction, lifeInsurance, healthInsurance, isMonthly, noOfMonths } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const annualGross = (income * (isMonthly ? noOfMonths : 1)) + bonus;

  const result = useMemo(() => {
    const insDeduction = Math.min(lifeInsurance, 40000);
    const healthInsDeduction = Math.min(healthInsurance, 20000);
    const citMax = Math.min(annualGross / 3, 500000);
    const actualCit = Math.min(citDeduction + ssfDeduction + epfDeduction, citMax);
    const totalDeductions = insDeduction + healthInsDeduction + actualCit;
    const taxableGross = Math.max(0, annualGross - totalDeductions);

    const calculation = calculateNepalIncomeTax(
      taxableGross,
      false, 
      isSSFContributor, 
      gender,
      0 // We apply SSF/EPF/CIT together manually in actualCit
    );

    return {
      ...calculation,
      totalDeductions,
      netAnnual: annualGross - calculation.totalTax,
      netMonthly: (annualGross - calculation.totalTax) / 12,
      annualGross
    };
  }, [annualGross, isSSFContributor, gender, lifeInsurance, citDeduction, healthInsurance]);

  return (
    <ModernCalcLayout
      slug="nepal-income-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Income Tax' }]}
      title="Nepal Income Tax Calculator (FY 2083/84)"
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
             
             {isMonthly && (
               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">No. of Months</label>
                 <input 
                    type="number" 
                    value={noOfMonths} 
                    onChange={(e) => update({ noOfMonths: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                 />
               </div>
             )}

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Bonus (NPR)</label>
                <input type="number" value={bonus} onChange={e => update({ bonus: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
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
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Social Security Fund (Annual)</label>
                <input type="number" value={ssfDeduction} onChange={e => update({ ssfDeduction: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Employees Provident Fund (Annual)</label>
                <input type="number" value={epfDeduction} onChange={e => update({ epfDeduction: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Citizen Investment Trust (Annual)</label>
                <input type="number" value={citDeduction} onChange={e => update({ citDeduction: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Life Insurance (Annual, max 40,000)</label>
                <input type="number" value={lifeInsurance} onChange={e => update({ lifeInsurance: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Medical Insurance (Annual, max 20,000)</label>
                <input type="number" value={healthInsurance} onChange={e => update({ healthInsurance: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Estimated Tax Breakdown</h3>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5F6368]">Total Gross Income</span>
                    <span className="font-bold text-[#202124]">{formatNPR(result.annualGross)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5F6368]">SSF + EPF + CIT (applied)</span>
                    <span className="font-bold text-[#188038]">- {formatNPR(Math.min(citDeduction + ssfDeduction + epfDeduction, Math.min(result.annualGross / 3, 500000)))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5F6368]">Life Insurance</span>
                    <span className="font-bold text-[#188038]">- {formatNPR(Math.min(lifeInsurance, 40000))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5F6368]">Medical Insurance</span>
                    <span className="font-bold text-[#188038]">- {formatNPR(Math.min(healthInsurance, 20000))}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-b border-[#DADCE0] py-3 my-2">
                    <span className="font-bold text-[#202124]">Total Deductions</span>
                    <span className="font-bold text-[#188038]">- {formatNPR(result.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#202124]">Net Assessable Income</span>
                    <span className="font-black text-[#202124]">{formatNPR(result.annualGross - result.totalDeductions)}</span>
                  </div>
               </div>
               <p className="mt-6 text-[9px] text-[#70757A] font-bold uppercase tracking-wider text-center">
                  Calculated using latest FY 2083/84 Tax Provisions. Max allowable limits applied automatically.
               </p>
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
                    <th className="px-6 py-4 bg-white text-right">Amount in Slab</th>
                    <th className="px-6 py-4 bg-white text-right">Rate</th>
                    <th className="px-6 py-4 bg-white text-right text-[#D93025]">Tax Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {result.breakdown.map((row, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{row.slabLabel}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">{formatNPR(row.taxableInSlab)}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">{row.rate}%</td>
                      <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(row.taxAmount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8F9FA] font-black">
                    <td className="px-6 py-4 text-[#202124]">Total Tax Liability</td>
                    <td className="px-6 py-4"></td>
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
          "Monthly vs Annual breakdowns"
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

