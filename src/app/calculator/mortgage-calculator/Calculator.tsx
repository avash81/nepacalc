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
      howToUse={{ steps: ["Enter the total home/property price.", "Set the down payment percentage (Nepal banks require 20-25% minimum).", "Enter the current home loan interest rate from your bank.", "Select the loan tenure in years.", "Add annual property tax and insurance if known.", "Review total monthly cost including all components."] }}
      formula={{ title: "Mortgage EMI Formula", description: "Standard reducing-balance EMI formula used by all Nepalese banks.", raw: "EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]\nWhere P = Loan Amount, r = Monthly Rate, n = Total Months" }}
      faqs={[
        { question: "What is the minimum down payment for home loans in Nepal?", answer: "Most commercial banks in Nepal require a minimum down payment of 20-25% of the property value. NRB regulations cap home loans at 60% LTV (Loan-to-Value) for residential properties in some categories." },
        { question: "Are home loan rates fixed or floating in Nepal?", answer: "Most Nepal BFI home loans use a floating rate linked to the base rate. Rates are typically reviewed quarterly and can change over the loan tenure." }
      ]}
      sidebar={{ title: "Finance Tools", links: [{ label: "Loan EMI", href: "/calculator/loan-emi" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Property Registration", href: "/calculator/property-registration" }, { label: "Savings Calc", href: "/calculator/savings" }], banner: { title: "Home Ownership", description: "Plan your mortgage wisely — total interest paid can exceed the property value over long tenures.", image: "/images/home-banner.jpg" } }}
      relatedTools={[{ label: "Loan EMI", href: "/calculator/loan-emi" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Savings", href: "/calculator/savings" }]}
    />
  );
}
