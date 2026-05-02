'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, TrendingDown, ShieldCheck, Info } from 'lucide-react';

const KTM_BANKS = [
  { name: 'NIC Asia Bank', base: 8.25, premium: '1.5, 3.5' },
  { name: 'Nabil Bank', base: 7.95, premium: '2.0, 4.0' },
  { name: 'Global IME', base: 8.40, premium: '1.0, 3.0' },
  { name: 'Everest Bank', base: 7.80, premium: '2.5, 5.0' },
  { name: 'Sanima Bank', base: 8.10, premium: '1.5, 3.0' },
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
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n), 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment, principal;

    return { emi, totalPayment, totalInterest };
  }, [principal, effectiveRate, tenureYears]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');
  
  const inputCls = "w-full h-12 pl-4 pr-12 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="nepal-home-loan"
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Definitive Home Loan Amortization Calculator for Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                When planning a real estate purchase in Nepal, relying on a generic <strong className="text-[#202124]">loan calculator home</strong> tool isn't enough to secure your financial future. The Nepalese banking sector, regulated by Nepal Rastra Bank (NRB), operates predominantly on a dynamic "Base Rate + Premium" model. Our advanced <strong className="text-[#202124]">loan amortization calculator</strong> is specifically engineered to model this local interest structure, allowing you to accurately project your Equated Monthly Installment (EMI) and visualize how your principal shrinks over time.
              </p>
              <p>
                Whether you are evaluating a <strong className="text-[#202124]">payment calculator home equity line</strong> for renovation, or assessing long-term residential financing for a new plot in Kathmandu, understanding your exact interest exposure is critical. Unlike fixed-rate structures common in Western markets, such as an <strong className="text-[#202124]">fha loan</strong> or tracking <strong className="text-[#202124]">current va home loan rates</strong> in the US, Nepal's floating rate mechanism requires a robust amortization engine to forecast potential long-term costs and navigate quarterly rate fluctuations.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Architecture of a Nepalese Mortgage</h3>
            <p className="text-sm text-[#5F6368] mb-4">A housing loan in Nepal consists of specific components that dictate your monthly financial commitment. Our calculator processes these variables to generate your amortization schedule.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#202124]">Loan Principal:</strong> The actual amount borrowed from the A-Class Commercial Bank or Development Bank. In Nepal, the Loan-to-Value (LTV) ratio typically caps at 60% within the Kathmandu Valley and 70% outside, meaning you must provide a substantial down payment.</li>
              <li><strong className="text-[#202124]">Base Rate:</strong> This is the minimum interest rate mandated by NRB, reflecting the bank's actual cost of funds. It fluctuates quarterly. By law, banks cannot lend below their Base Rate.</li>
              <li><strong className="text-[#202124]">Premium Rate:</strong> This is the profit margin the bank charges on top of the Base Rate. While the Base Rate fluctuates, the Premium is generally locked in during the loan agreement (though some banks review it annually). <span className="text-[#D93025] font-medium">Negotiating a lower premium is the single most effective way to reduce your lifetime loan cost.</span></li>
              <li><strong className="text-[#202124]">Tenure:</strong> The duration over which the loan must be repaid, typically ranging from 5 to 30 years depending on the borrower's age and income stability.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Costs Associated with Home Ownership</h3>
            <p className="text-sm text-[#5F6368] mb-4">Your EMI is the largest recurring cost, but prospective homeowners in Nepal must account for peripheral expenses that affect the total cost of ownership.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Processing Fees:</strong> Banks charge a one-time loan processing or management fee, typically ranging from 0.5% to 1.5% of the total approved loan amount.</li>
              <li><strong className="text-[#1A73E8]">Property Valuation (Engineer) Fees:</strong> Before loan approval, an NRB-certified engineer must evaluate the collateral property. This incurs a flat fee payable to the evaluator.</li>
              <li><strong className="text-[#1A73E8]">Insurance Premiums:</strong> Banks mandate comprehensive property insurance (against earthquake, fire, etc.) for the duration of the loan. The premium is calculated based on the building's valuation and must be renewed annually.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Early Repayment and Prepayment Strategies</h3>
            <p className="text-sm text-[#5F6368] mb-4">Most borrowers aim to clear their mortgage ahead of the scheduled tenure to save on the massive interest accumulation. Nepal Rastra Bank guidelines regulate how banks handle prepayment.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">Partial Prepayment:</strong> If you receive a bonus or sell an asset, injecting a lump sum into your loan principal drastically reduces future interest. However, banks may charge a "Prepayment Penalty" (often 1% to 2%) if the partial payment exceeds a certain percentage of the outstanding principal within a single fiscal year.</li>
              <li><strong className="text-[#188038]">Loan Swapping / Refinancing:</strong> If another bank's Base Rate drops significantly below your current bank's rate, you might consider swapping the loan. The new bank takes over the principal. Note that your current bank will likely levy a swap charge or exit fee.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the Total Principal Amount you wish to borrow from the bank.",
          "Find your bank's latest 'Base Rate' (published quarterly on their official website or national dailies) and enter it.",
          "Enter the 'Premium' percentage quoted by your loan officer. The effective interest rate is the sum of the Base Rate and Premium.",
          "Input your desired Repayment Tenure in years. Remember, longer tenures mean lower EMIs but significantly higher total interest paid.",
          "Review the generated EMI, the lifetime interest exposure, and the visual principal-vs-interest distribution bar."
        ]
      }}
      formula={{
        title: "The Standard EMI Amortization Formula",
        description: "The calculator uses the universal reducing-balance method to compute the exact monthly installment.",
        raw: "1. Effective Annual Rate (R) = Base Rate + Premium Rate\n2. Monthly Interest Rate (r) = (R / 100) / 12\n3. Total Number of Months (n) = Tenure in Years × 12\n\nEquated Monthly Installment (EMI) = [P × r × (1 + r)^n] / [(1 + r)^n - 1]\n\nWhere 'P' is the principal loan amount."
      }}
      faqs={[
        {
          question: "What is the Base Rate in Nepalese banking?",
          answer: "The Base Rate is the minimum interest rate formulated by Nepal Rastra Bank (NRB). It represents the actual cost incurred by the bank to acquire funds (deposits). Commercial banks are strictly prohibited from issuing loans at an interest rate lower than their declared Base Rate."
        },
        {
          question: "Why does my Home Loan EMI change every quarter?",
          answer: "Because most home loans in Nepal are 'floating rate' loans tied to the Base Rate. Banks recalculate and publish their Base Rates every quarter (Ashoj, Poush, Chaitra, Asadh). If the bank's cost of funds drops, the Base Rate drops, and your EMI (or loan tenure) will decrease. Conversely, if it rises, your EMI increases."
        },
        {
          question: "Can I negotiate a fixed interest rate for a Home Loan in Nepal?",
          answer: "Yes, NRB recently introduced guidelines allowing banks to offer fixed-rate loans for certain tenures (often up to 5 or 7 years). However, the bank takes on the interest rate risk, so fixed rates are usually quoted significantly higher than the current floating rate."
        },
        {
          question: "What happens if I want to pay off my loan early?",
          answer: "You can pay off your loan early (prepayment). However, if you are moving the loan to another bank (loan swap) or paying it off using an external loan before a specified period (usually 2 years), banks will charge a prepayment or swap penalty, typically ranging from 0.5% to 2% of the outstanding principal."
        },
        {
          question: "What is the maximum Loan-to-Value (LTV) ratio in Nepal?",
          answer: "As per NRB directives, the maximum LTV ratio for residential home loans inside the Kathmandu Valley is generally restricted to 50%, 60%. Outside the valley, banks may finance up to 70% of the property's 'Fair Market Value' as evaluated by their engineer."
        },
        {
          question: "Are there any tax benefits on Home Loans in Nepal?",
          answer: "Currently, Nepal does not offer the extensive tax deductions on home loan interest seen in countries like the US or India. Salaried individuals generally cannot deduct housing interest from their assessable income, making it even more crucial to secure the lowest possible premium."
        }
      ]}
      sidebar={{
        title: "Finance Tools",
        links: [
          { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
          { label: "Land Area Converter", href: "/calculator/nepal-land/" }
        ],
        banner: {
          title: "Compare Rates Carefully",
          description: "Even a 0.5% difference in your negotiated premium can save you lakhs of rupees over a 20-year loan tenure.",
          image: "/images/finance-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" },
        { label: "Land Area Converter", href: "/calculator/nepal-land/" }
      ]}
    />
  );
}
