'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, TrendingDown, ShieldCheck, Info } from 'lucide-react';

const KTM_BANKS = [
  { name: 'NIC Asia Bank', base: 8.25, premium: '1.5 - 3.5' },
  { name: 'Nabil Bank', base: 7.95, premium: '2.0 - 4.0' },
  { name: 'Global IME', base: 8.40, premium: '1.0 - 3.0' },
  { name: 'Everest Bank', base: 7.80, premium: '2.5 - 5.0' },
  { name: 'Sanima Bank', base: 8.10, premium: '1.5 - 3.0' },
];

export default function NepalHomeLoanCalculator() {
  const [state, setState] = useSyncState('nepal_home_loan_v2', {
    principal: 5000000,
    baseRate: 8.25,
    premium: 2.5,
    tenureYears: 15
  });

  const { principal, baseRate, premium, tenureYears } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const effectiveRate = baseRate + premium;

  const results = useMemo(() => {
    const r = effectiveRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    return { emi, totalPayment, totalInterest };
  }, [principal, effectiveRate, tenureYears]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');
  
  const inputCls = "w-full h-12 pl-4 pr-12 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Home Loan Calculator' }]}
      title="Nepal Institutional Home Loan"
      description="Professional banking EMI calculator for Nepal. Calculates using the 'Base Rate + Premium' model mandated by NRB for all commercial bank floating-rate loans."
      icon={Landmark}
      inputs={
        <div className="space-y-8">
          <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg shadow-sm space-y-6">
            <div>
              <label className={labelCls}>Loan Principal Amount</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">Rs.</span>
                 <input type="number" value={principal} onChange={e => update({ principal: Number(e.target.value) })} min={100000} className={`${inputCls} pl-10 pr-4 font-mono`} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                  <label className={labelCls}>Bank Base Rate</label>
                  <div className="relative">
                     <input type="number" value={baseRate} onChange={e => update({ baseRate: Number(e.target.value) })} step={0.01} className={inputCls} />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
                  </div>
               </div>
               <div>
                  <label className={labelCls}>Premium over Base</label>
                  <div className="relative">
                     <input type="number" value={premium} onChange={e => update({ premium: Number(e.target.value) })} step={0.25} className={inputCls} />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
                  </div>
               </div>
            </div>

            <div>
              <label className={labelCls}>Repayment Tenure (Years)</label>
              <div className="relative">
                 <input type="number" value={tenureYears} onChange={e => update({ tenureYears: Number(e.target.value) })} min={1} max={30} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Years</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden mt-6">
             <div className="px-5 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#1A73E8]" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#202124]">A-Class Benchmarks (2081/82)</h3>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                {KTM_BANKS.map(bank => (
                  <button key={bank.name} onClick={() => update({ baseRate: bank.base })}
                    className="w-full px-5 py-4 flex justify-between items-center hover:bg-[#F8F9FA] transition-colors text-left group">
                    <div>
                       <div className="text-[12px] font-bold text-[#202124]">{bank.name}</div>
                       <div className="text-[10px] text-[#70757A] font-medium">Premium: {bank.premium}%</div>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-black text-[#1A73E8] font-mono group-hover:underline">{bank.base}%</div>
                       <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A]">Base Rate</div>
                    </div>
                  </button>
                ))}
             </div>
          </div>

          <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[11px] text-[#202124] leading-relaxed font-medium">
               Base rates are updated quarterly by NRB. Fixed-rate home loans (up to 7 years) are also available at banks but typically carry a higher premium rate.
             </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] rounded-lg border border-[#DADCE0] overflow-hidden text-center shadow-sm relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
             
             <div className="p-8 relative z-10">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#8AB4F8] mb-4">Estimated Monthly Installment (EMI)</div>
               <div className="text-5xl font-black text-white tracking-tighter mb-2 font-mono">
                 {Math.round(results.emi).toLocaleString('en-IN')}
               </div>
               <div className="text-xs font-bold text-white/70 uppercase tracking-widest">NPR Per Month</div>
             </div>

             <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 relative z-10 bg-white/5">
                <div className="p-4">
                   <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1">Effective Rate</div>
                   <div className="text-lg font-black text-[#8AB4F8] font-mono">{effectiveRate.toFixed(2)}%</div>
                </div>
                <div className="p-4">
                   <div className="text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1">Total Savings</div>
                   <div className="text-lg font-black text-[#81C995] font-mono">---</div>
                </div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-5 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Interest Exposure</span>
                <TrendingDown className="w-4 h-4 text-[#D93025]" />
             </div>
             <div className="p-5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold">Total Interest Payable</span>
                   <span className="font-black text-[#D93025] font-mono">{fmt(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold">Total Repayment Amount</span>
                   <span className="font-black text-[#202124] font-mono">{fmt(results.totalPayment)}</span>
                </div>
                <div className="pt-4 border-t border-[#DADCE0]">
                   <div className="flex justify-between text-[9px] font-bold uppercase text-[#70757A] mb-2 tracking-wider">
                      <span>Principal</span>
                      <span>Interest</span>
                   </div>
                   <div className="h-2.5 bg-[#FCE8E6] rounded-full overflow-hidden flex">
                      <div className="bg-[#1A73E8] h-full transition-all duration-1000" style={{ width: `${(principal/results.totalPayment)*100}%` }} />
                   </div>
                </div>
             </div>
          </div>

          <div className="p-5 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg flex items-start gap-3">
             <ShieldCheck className="w-6 h-6 text-[#188038] shrink-0" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#188038] mb-1">Tax Benefit Eligibility</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed font-medium">
                   You may be eligible for an annual income tax deduction of up to <strong>Rs. 25,000</strong> under Nepal Inland Revenue Department (IRD) rules for interest paid on your primary residential home loan.
                </p>
             </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the total principal amount you wish to borrow.", "Check the latest Base Rate of your chosen bank (updated quarterly on their website).", "Enter the Premium rate quoted to you by the bank officer.", "Enter the loan tenure in years. Max tenure in Nepal is generally 25-30 years depending on borrower age."] }}
      formula={{ title: "EMI Formula", description: "Standard Amortization.", raw: "Effective Rate = Base Rate + Premium\nr = (Effective Rate / 100) / 12\nn = Tenure in Years × 12\n\nEMI = P × r × (1 + r)^n / ((1 + r)^n - 1)" }}
      faqs={[
        { question: "What is the Base Rate?", answer: "The Base Rate is the minimum interest rate mandated by Nepal Rastra Bank (NRB) below which commercial banks are not allowed to lend. It covers the bank's cost of funds." },
        { question: "Why does my EMI change every quarter?", answer: "Because your loan is tied to the Base Rate. If the bank's cost of funds changes, the Base Rate changes. Your premium remains fixed, but the Base Rate fluctuates." }
      ]}
      sidebar={{ title: "Finance Tools", links: [{ label: "Income Tax Calculator", href: "/calculator/income-tax" }, { label: "Remittance Calculator", href: "/calculator/remittance-calculator" }], banner: { title: "Compare Rates", description: "Even a 0.5% difference in premium can save you lakhs of rupees over a 20-year loan.", image: "/images/finance-banner.jpg" } }}
      relatedTools={[{ label: "Income Tax Calculator", href: "/calculator/income-tax" }]}
    />
  );
}
