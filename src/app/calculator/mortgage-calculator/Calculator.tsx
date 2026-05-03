'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Home, Info, DollarSign } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function MortgageCalculator() {
  const [state, setState] = useSyncState('mortgage_v4', {
    pPrice: 15000000, downPercent: 25, rate: 12.5, years: 15, taxRate: 1.2, insurance: 50000
  });
  const { pPrice, downPercent, rate, years, taxRate, insurance } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const downAmt = pPrice * (downPercent / 100);
    const loan = pPrice - downAmt;
    const i = (rate / 100) / 12, n = years * 12;
    const pAndI = (loan * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const mTax = (pPrice * (taxRate / 100)) / 12;
    const mInsurance = insurance / 12;
    return { loan, downAmt, pAndI, mTax, mInsurance, monthlyTotal: pAndI + mTax + mInsurance, totalPaid: (pAndI * n), totalInterest: (pAndI * n) - loan };
  }, [pPrice, downPercent, rate, years, taxRate, insurance]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Mortgage Calculator' }]}
      title="Mortgage Calculator"
      description="Calculate full monthly mortgage payment including Principal & Interest, property tax, and insurance. Based on Nepal bank home loan rates."
      icon={Home}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Home Price (NPR)</label>
            <div className="relative">
              <input type="number" value={pPrice} min={100000} step={100000}
                onChange={e => update({ pPrice: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Down Payment (%)</label>
              <div className="relative">
                <input type="number" value={downPercent} min={0} max={100}
                  onChange={e => update({ downPercent: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Interest Rate (%)</label>
              <div className="relative">
                <input type="number" value={rate} min={1} max={30} step={0.1}
                  onChange={e => update({ rate: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Loan Tenure</label>
              <select value={years} onChange={e => update({ years: Number(e.target.value) })}
                className={inputCls}>
                {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} Years</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Annual Property Tax (%)</label>
              <div className="relative">
                <input type="number" value={taxRate} min={0} max={5} step={0.1}
                  onChange={e => update({ taxRate: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Annual Insurance (NPR)</label>
            <input type="number" value={insurance} min={0} step={5000}
              onChange={e => update({ insurance: Number(e.target.value) })} className={inputCls} />
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Mortgage
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Monthly Payment</div>
            <div className="text-3xl font-black text-[#1A73E8]">{fmt(r.monthlyTotal)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Principal & Interest + Tax + Insurance</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Monthly Breakdown</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Principal & Interest</span>
                <span className="font-black text-[#1A73E8]">{fmt(r.pAndI)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Property Tax /mo</span>
                <span className="font-black text-[#F29900]">{fmt(r.mTax)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Insurance /mo</span>
                <span className="font-black">{fmt(r.mInsurance)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Loan Amount</span>
                <span className="font-black">{fmt(r.loan)} ({100 - downPercent}%)</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Down Payment</span>
                <span className="font-black">{fmt(r.downAmt)} ({downPercent}%)</span>
              </div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]">
                <span className="font-bold text-[#202124]">Total Interest Over {years} yrs</span>
                <span className="font-black text-[#D93025]">{fmt(r.totalInterest)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Nepal home loan rates typically range 11–14% p.a. (floating). Confirm with your BFI before committing.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Navigating Nepal's Mortgage & Real Estate Market</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Purchasing residential property in Nepal requires strict adherence to banking regulations and a deep understanding of amortization mechanics. Our comprehensive <strong className="text-[#202124]">mortgage calculator nepal</strong> goes beyond standard EMI equations by integrating holistic homeownership costs, including mandated insurance premiums and local municipal property taxes.
              </p>
              <p>
                A critical factor in real estate financing is the <strong className="text-[#202124]">nrb ltv ratio</strong> (Loan-to-Value). Currently, the Nepal Rastra Bank (NRB) strictly regulates the maximum permissible loan amount against real estate collateral, often capping residential home loans at specific percentages (e.g., 50% to 70%) depending on the property location (inside vs. outside Kathmandu Valley). An accurate <strong className="text-[#202124]">home loan emi</strong> projection must account for this required upfront equity (down payment) to ensure bank compliance.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Mechanics of Mortgage Amortization</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Reducing Balance Principle:</strong> Nepal's banking sector operates entirely on reducing balance amortization for long-term mortgages. This means your interest burden is calculated strictly on the remaining principal each month. Early in a 15-year tenure, your monthly EMI heavily services the interest component; however, this ratio flips mathematically in the later years.</li>
              <li><strong className="text-[#188038]">Total Cost of Ownership Matrix:</strong> Many borrowers fail to account for hidden holding costs. This calculator integrates local <strong className="text-[#202124]">property tax calculator</strong> metrics and annual fire/earthquake insurance mandates. When these variables are amortized into a single monthly figure, you gain an institutional-grade view of your actual monthly liquidity requirements.</li>
              <li><strong className="text-[#D93025]">Base Rate Volatility:</strong> Mortgage rates in Nepal are rarely fixed. They are calculated as the bank's Base Rate plus a fixed premium. Because the Base Rate fluctuates quarterly based on the bank's cost of funds, your total interest paid can vary significantly. Borrowers should run this simulation using historical high and low interest rate margins to stress-test their affordability.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the total negotiated Home Price in NPR. This is the absolute cost of the property.",
          "Set the Down Payment percentage. In Nepal, banks generally require at least a 30-40% down payment (equating to a 60-70% Loan-to-Value limit).",
          "Input the Annual Interest Rate provided by your commercial bank (Base Rate + Premium).",
          "Select your desired Loan Tenure. Standard residential home loans in Nepal range from 10 to 25 years.",
          "Add your estimated Annual Property Tax percentage and Annual Home Insurance cost. These are amortized into your monthly total.",
          "Review the Total Monthly Payment, which combines your bank EMI, monthly tax reserve, and monthly insurance reserve."
        ]
      }}
      formula={{
        title: "Comprehensive Mortgage Formula",
        description: "Calculates the exact monthly financial obligation including P&I, Tax, and Insurance.",
        raw: "1. EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]\n2. Monthly Tax = (Property Value × Annual Tax Rate) / 12\n3. Monthly Insurance = Annual Insurance Premium / 12\n\nTotal Monthly Payment = EMI + Monthly Tax + Monthly Insurance"
      }}
      faqs={[
        {
          question: "What is the minimum down payment required in Nepal?",
          answer: "Inside the Kathmandu valley, Nepal Rastra Bank (NRB) generally restricts home loans to a 50%, 60% Loan-to-Value (LTV) ratio, meaning you need a 40% to 50% down payment. Outside the valley, you can often secure up to 70% LTV, requiring a 30% down payment."
        },
        {
          question: "Why should I include property tax and insurance in this calculator?",
          answer: "While you pay the bank for Principal and Interest, you must also pay municipal property taxes annually and maintain mandatory fire/earthquake insurance. Factoring these into a monthly 'reserve' gives you a true picture of your monthly housing affordability."
        },
        {
          question: "Are mortgage rates in Nepal fixed or floating?",
          answer: "The vast majority of home loans in Nepal are floating rate, tied to the bank's Base Rate. However, some banks offer fixed-rate packages for terms up to 5 or 7 years, after which they revert to the floating Base Rate + Premium model."
        },
        {
          question: "How is the total interest calculated over 15 years?",
          answer: "We use standard reducing-balance amortization. Each month, the interest is calculated on the remaining principal. As you pay down the principal, the interest portion of your EMI decreases, and the principal repayment portion increases."
        },
        {
          question: "Does this calculator account for processing fees?",
          answer: "No. Banks generally charge a 0.5% to 1.5% upfront Loan Processing Fee, along with engineering valuation and CIC (Credit Information Center) charges. You must pay these out-of-pocket during the loan approval phase."
        },
        {
          question: "Can I pay off my mortgage early to save on interest?",
          answer: "Yes, making lump-sum prepayment injections directly reduces your principal, massively cutting down your lifetime interest burden. However, commercial banks may charge a 1% to 2% prepayment penalty depending on the terms of your offer letter."
        }
      ]}
      sidebar={{ title: "Finance Tools", links: [{ label: "Loan EMI", href: "/calculator/loan-emi" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Property Registration", href: "/calculator/property-registration" }, { label: "Savings Calc", href: "/calculator/savings" }], banner: { title: "Home Ownership", description: "Plan your mortgage wisely ,  total interest paid can exceed the property value over long tenures.", image: "/images/home-banner.jpg" } }}
      relatedTools={[{ label: "Loan EMI", href: "/calculator/loan-emi" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Savings", href: "/calculator/savings" }]}
    />
  );
}
