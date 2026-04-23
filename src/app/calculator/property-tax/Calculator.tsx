'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Home, Gavel, FileCheck, Info } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

export default function PropertyTaxCalculator() {
  const [state, setState] = useSyncState('property_tax_v1', {
    sellingPrice: 5000000, costPrice: 3500000, expenses: 100000,
    holdingPeriod: 'moreThanFive' as 'moreThanFive' | 'lessThanFive',
  });
  const { sellingPrice, costPrice, expenses, holdingPeriod } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const profit = sellingPrice - costPrice - expenses;
    if (sellingPrice < 1000000) return { profit: Math.max(0, profit), taxRate: 0, taxAmount: 0, exempt: true };
    if (profit <= 0) return { profit: 0, taxRate: 0, taxAmount: 0, exempt: false };
    const taxRate = holdingPeriod === 'moreThanFive' ? 0.05 : 0.075;
    return { profit, taxRate, taxAmount: profit * taxRate, exempt: false };
  }, [sellingPrice, costPrice, expenses, holdingPeriod]);

  const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Capital Gains Tax (CGT)' }]}
      title="Property Capital Gains Tax (CGT)"
      description="Calculate 5% or 7.5% CGT on property sale profit in Nepal based on holding period. Based on Nepal Income Tax Act FY 2081/82 mandates."
      icon={Home}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Selling Price (Rs.)</label>
              <input type="number" value={sellingPrice} onChange={e => update({ sellingPrice: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Original Cost Price (Rs.)</label>
              <input type="number" value={costPrice} onChange={e => update({ costPrice: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Deductible Expenses (Rs.)</label>
            <input type="number" value={expenses} onChange={e => update({ expenses: Number(e.target.value) })} className={inputCls} />
            <p className="text-[9px] text-[#70757A]">Registry fees, taxes paid, improvements</p>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>How long was the property held?</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ id: 'moreThanFive', label: 'More than 5 Years', rate: '5%', desc: 'Long-term' },
                { id: 'lessThanFive', label: 'Less than 5 Years', rate: '7.5%', desc: 'Short-term' }].map(m => (
                <button key={m.id} onClick={() => update({ holdingPeriod: m.id as any })}
                  className={`p-4 rounded-lg border text-left transition-all ${holdingPeriod === m.id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white'}`}>
                  <div className="flex justify-between mb-1">
                    <span className={`text-[11px] font-black ${holdingPeriod === m.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{m.label}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${holdingPeriod === m.id ? 'bg-[#1A73E8] text-white' : 'bg-[#F1F3F4] text-[#5F6368]'}`}>{m.rate}</span>
                  </div>
                  <p className="text-[9px] text-[#70757A]">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
          {result.exempt && (
            <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-start">
              <FileCheck className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#188038] font-bold">Exemption: Selling price below Rs. 10,00,000 is exempt from Capital Gains Tax.</p>
            </div>
          )}
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors">Calculate CGT</button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`p-6 rounded-lg border text-center space-y-1 ${result.exempt ? 'bg-[#E6F4EA] border-[#CEEAD6]' : 'bg-[#FCE8E6] border-[#FAD2CF]'}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${result.exempt ? 'text-[#188038]' : 'text-[#D93025]'}`}>Capital Gains Tax Payable</div>
            <div className={`text-4xl font-black ${result.exempt ? 'text-[#188038]' : 'text-[#D93025]'}`}>{fmt(result.taxAmount)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">{result.exempt ? 'Exempt Transaction' : `${(result.taxRate * 100).toFixed(1)}% on Net Profit`}</div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
              <Gavel className="w-3 h-3 text-[#D93025]" />
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Tax Calculation</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Selling Price</span><span className="font-black">{fmt(sellingPrice)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Cost Price + Expenses</span><span className="font-black">− {fmt(costPrice + expenses)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Taxable Profit (Gain)</span><span className="font-black">{fmt(result.profit)}</span></div>
              <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Tax Rate</span><span className="font-black text-[#D93025]">{(result.taxRate * 100).toFixed(1)}%</span></div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]"><span className="font-bold text-[#202124]">Final CGT Payable</span><span className="font-black text-[#D93025]">{fmt(result.taxAmount)}</span></div>
            </div>
          </div>
          <div className="flex gap-2 p-3 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">CGT is paid at the Malpok office during registration. Tax is on profit (gain), not on total selling price.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the selling price (declared on Lalpurja).", "Enter the original purchase price and any deductible expenses.", "Select how long you held the property.", "Review the taxable gain and CGT amount."] }}
      formula={{ title: "Nepal Property CGT", description: "Tax applies on net profit. Rate depends on holding period.", raw: "Profit = Selling Price − Cost Price − Expenses\nCGT (5+ years held) = Profit × 5%\nCGT (< 5 years held) = Profit × 7.5%\nExemption: Selling price < Rs. 10,00,000" }}
      faqs={[
        { question: "What is the CGT rate for property in Nepal?", answer: "5% if held more than 5 years, 7.5% if held less than 5 years. Properties sold for under Rs. 10 lakh are fully exempt." },
        { question: "What expenses can be deducted?", answer: "Deductible expenses include the original purchase price, previous registration fees, renovation costs with receipts, and taxes paid during ownership." }
      ]}
      sidebar={{ title: "Real Estate Tools", links: [{ label: "Property Registration", href: "/calculator/property-registration" }, { label: "Mortgage Calc", href: "/calculator/mortgage-calculator" }, { label: "Nepal Land", href: "/calculator/nepal-land" }, { label: "Income Tax", href: "/calculator/nepal-income-tax" }], banner: { title: "Plan Your Sale", description: "Factor in CGT before finalizing any property deal. It directly impacts your net proceeds.", image: "/images/property-banner.jpg" } }}
      relatedTools={[{ label: "Property Registration", href: "/calculator/property-registration" }, { label: "Mortgage", href: "/calculator/mortgage-calculator" }, { label: "Income Tax", href: "/calculator/nepal-income-tax" }]}
    />
  );
}
