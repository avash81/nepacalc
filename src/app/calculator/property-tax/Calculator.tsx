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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering the Property Tax Framework in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Selling real estate involves strict regulatory overhead. Our <strong className="text-[#202124]">nepal property tax calculator</strong> is engineered to parse the exact mandates of the Inland Revenue Department (IRD). Unlike a standard income <strong className="text-[#202124]">tax calculator 2024</strong> or <strong className="text-[#202124]">tax calculator 2025</strong>, the Capital Gains Tax (CGT) on property is an exclusive levy triggered only during the transfer of ownership at the Malpot (Land Revenue) office.
              </p>
              <p>
                The fundamental logic dictating the <strong className="text-[#202124]">capital gains tax nepal</strong> rate relies entirely on the holding period. Rather than applying a blanket percentage, the algorithm calculates whether the asset was held for a short-term duration (&lt; 5 years) or a long-term duration (≥ 5 years). This dynamic <strong className="text-[#202124]">cgt on property sale nepal</strong> logic mathematically mirrors the exact ledger calculations performed by government tax officers.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Deductions & Exemptions</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Net Taxable Profit:</strong> A critical error users make is calculating tax on the gross selling price. As a definitive <strong className="text-[#202124]">land tax calculator nepal</strong>, this tool strictly subtracts the original cost price and legally verified deductible expenses from the final selling price before applying the multiplier.</li>
              <li><strong className="text-[#188038]">The Rs. 10 Lakh Exemption:</strong> To protect lower-income citizens, the algorithm enforces a hard Boolean check. If the gross selling transaction evaluates to less than NPR 1,000,000, the effective <strong className="text-[#202124]">property tax rate nepal</strong> is immediately reduced to 0%.</li>
              <li><strong className="text-[#D93025]">Negative Gain Immunity:</strong> If the asset depreciates and the transaction results in a mathematical loss (Selling Price &lt; Cost Price), the CGT liability is nullified. Note, however, that you must provide sufficient proof of original cost to the Malpot office to claim a negative gain.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the final Selling Price. Ensure this matches the amount you will officially declare on the Lalpurja transfer document at the Malpot office.",
          "Enter the Original Cost Price. This is what you originally paid to acquire the property.",
          "Input Deductible Expenses. This includes previous registration fees, documented renovation costs, or taxes already paid during ownership.",
          "Select the holding period (Less than 5 Years or More than 5 Years) to determine the accurate CGT tier (7.5% vs 5%).",
          "Review the 'Taxable Profit' to ensure your gain is calculated correctly before the tax multiplier is applied."
        ]
      }}
      formula={{
        title: "Capital Gains Tax (CGT) Accounting Logic",
        description: "CGT is levied strictly on the net profit (gain) generated from the sale, not the gross transaction value.",
        raw: "1. Calculate Taxable Profit:\n   Profit = Selling Price - (Cost Price + Deductible Expenses)\n\n2. Apply Holding Period Multiplier:\n   If Held ≥ 5 Years: CGT Amount = Profit × 5%\n   If Held < 5 Years: CGT Amount = Profit × 7.5%\n\n3. Evaluate Exemption Constraint:\n   If Selling Price < 1,000,000 NPR, CGT Amount = 0."
      }}
      faqs={[
        {
          question: "What is the Capital Gains Tax (CGT) rate for property in Nepal?",
          answer: "As per the current fiscal laws in Nepal, the CGT rate is 5% if you have held the property for more than 5 years. If you sell the property within 5 years of acquiring it, the rate increases to 7.5%."
        },
        {
          question: "Is property tax calculated on the total selling price?",
          answer: "No. Capital Gains Tax is calculated strictly on the 'profit' or 'capital gain.' You must subtract your original purchase price and any allowable expenses from the final selling price to find the taxable amount."
        },
        {
          question: "What expenses can be deducted to lower the taxable profit?",
          answer: "You can deduct the original purchase price, any registration fees paid during your initial purchase, documented and officially receipted renovation or construction costs, and localized land taxes paid during your ownership period."
        },
        {
          question: "Are there any exemptions to the property CGT in Nepal?",
          answer: "Yes. If the total selling price of the property is less than Rs. 10,00,000 (10 Lakhs), the transaction is fully exempt from Capital Gains Tax."
        },
        {
          question: "Where and when do I pay the Capital Gains Tax?",
          answer: "The CGT must be paid at the Land Revenue Office (Malpot Karyalaya) during the official transfer of the property deed (Pass). The transfer cannot be finalized until the tax voucher is cleared."
        },
        {
          question: "What happens if I sell the property at a loss?",
          answer: "If your selling price is lower than your original cost price (resulting in a negative gain), you have zero taxable profit and therefore no Capital Gains Tax liability. However, you still have to pay standard registration processing fees."
        }
      ]}
      sidebar={{ title: "Real Estate Tools", links: [{ label: "Property Registration", href: "/calculator/property-registration/" }, { label: "Mortgage Calc", href: "/calculator/mortgage-calculator/" }, { label: "Nepal Land", href: "/calculator/nepal-land/" }, { label: "Income Tax", href: "/calculator/nepal-income-tax/" }], banner: { title: "Plan Your Sale", description: "Factor in CGT before finalizing any property deal. It directly impacts your net proceeds.", image: "/images/property-banner.jpg" } }}
      relatedTools={[{ label: "Property Registration", href: "/calculator/property-registration/" }, { label: "Mortgage", href: "/calculator/mortgage-calculator/" }, { label: "Income Tax", href: "/calculator/nepal-income-tax/" }]}
    />
  );
}
