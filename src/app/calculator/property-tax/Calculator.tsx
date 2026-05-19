'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Home, Gavel, FileCheck, Info, ShieldCheck, Activity, Map, Landmark } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

export default function PropertyTaxCalculator() {
  const [state, setState] = useSyncState('property_tax_v2', {
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

  return (
    <ModernCalcLayout
      slug="property-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Capital Gains Tax' }]}
      title="Nepal Property Tax & Capital Gains (CGT) Calculator 2083/84"
      description="Calculate 5% or 7.5% CGT on property sale profit in Nepal based on holding period. Engineered to match Nepal Inland Revenue Department (IRD) mandates for FY 2083/84."
      icon={Home}
      relatedTools={[
        { label: "Property Registration", href: "/calculator/property-registration/" },
        { label: "Home Loan Calculator", href: "/calculator/mortgage-calculator/" },
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" }
      ]}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Selling Price (NPR)</label>
                <input 
                  type="number" 
                  value={sellingPrice} 
                  onChange={e => update({ sellingPrice: Number(e.target.value) })} 
                  className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Original Cost Price (NPR)</label>
                <input 
                  type="number" 
                  value={costPrice} 
                  onChange={e => update({ costPrice: Number(e.target.value) })} 
                  className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Deductible Expenses (NPR)</label>
              <input 
                type="number" 
                value={expenses} 
                onChange={e => update({ expenses: Number(e.target.value) })} 
                className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] outline-none transition-all" 
              />
              <p className="text-[9px] text-[#5F6368] font-bold uppercase tracking-wider mt-1">Registry fees, taxes paid, documented improvements</p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">How long was the property held?</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: 'moreThanFive', label: 'More than 5 Years', rate: '5%', desc: 'Long-term' },
                  { id: 'lessThanFive', label: 'Less than 5 Years', rate: '7.5%', desc: 'Short-term' }].map(m => (
                  <button 
                    key={m.id} 
                    onClick={() => update({ holdingPeriod: m.id as any })}
                    className={`h-16 px-4 rounded-md border text-left flex flex-col justify-center transition-all ${holdingPeriod === m.id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                  >
                    <div className="flex justify-between items-center w-full mb-1">
                      <span className={`text-[11px] font-black uppercase ${holdingPeriod === m.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{m.label}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${holdingPeriod === m.id ? 'bg-[#1A73E8] text-white' : 'bg-[#F8F9FA] text-[#5F6368] border border-[#DADCE0]'}`}>{m.rate}</span>
                    </div>
                    <p className={`text-[9px] uppercase font-bold ${holdingPeriod === m.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {result.exempt && (
              <div className="flex gap-3 p-4 bg-[#E6F4EA] border border-[#188038] rounded-md items-start">
                <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
                <p className="text-[10px] text-[#188038] font-bold leading-relaxed uppercase">
                  Statutory Exemption: Selling price below Rs. 10,00,000 is fully exempt from Capital Gains Tax.
                </p>
              </div>
            )}
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate CGT Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className={`rounded-lg p-10 text-center space-y-2 ${result.exempt ? 'bg-[#E6F4EA]' : 'bg-[#E8F0FE]'}`}>
             <div className={`text-[10px] font-bold uppercase tracking-wider ${result.exempt ? 'text-[#188038]' : 'text-[#1A73E8]'}`}>Capital Gains Tax Payable</div>
             <div className={`text-5xl font-black tracking-tight ${result.exempt ? 'text-[#188038]' : 'text-[#1A73E8]'}`}>{fmt(result.taxAmount)}</div>
             <div className="flex justify-center mt-2">
                <span className={`px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase border shadow-sm ${result.exempt ? 'text-[#188038] border-[#CEEAD6]' : 'text-[#5F6368] border-[#DADCE0]'}`}>
                   {result.exempt ? 'Exempt Transaction' : `${(result.taxRate * 100).toFixed(1)}% on Net Profit`}
                </span>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-lg overflow-hidden bg-white">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Gavel className="w-3.5 h-3.5 text-[#202124]" />
                <span className="text-[10px] font-black text-[#202124] uppercase tracking-wider">Tax Calculation Ledger</span>
             </div>
             <div className="divide-y divide-[#F1F3F4] p-2">
                <div className="p-3 flex justify-between items-center rounded hover:bg-[#F8F9FA] transition-colors">
                   <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Selling Price</span>
                   <span className="text-sm font-black text-[#202124]">{fmt(sellingPrice)}</span>
                </div>
                <div className="p-3 flex justify-between items-center rounded hover:bg-[#F8F9FA] transition-colors">
                   <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Cost + Expenses</span>
                   <span className="text-sm font-black text-[#D93025]">− {fmt(costPrice + expenses)}</span>
                </div>
                <div className="p-3 flex justify-between items-center rounded bg-[#F8F9FA] border border-[#DADCE0]">
                   <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">Taxable Profit (Gain)</span>
                   <span className="text-sm font-black text-[#1A73E8]">{fmt(result.profit)}</span>
                </div>
                <div className="p-3 flex justify-between items-center rounded hover:bg-[#F8F9FA] transition-colors">
                   <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Rate Multiplier</span>
                   <span className="text-sm font-black text-[#D93025]">{(result.taxRate * 100).toFixed(1)}%</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
             <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                Compliance Protocol: CGT must be cleared at the Malpok office during registration. Tax is strictly levied on net profit (gain), not the gross selling price.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Landmark className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Property Tax Framework</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  Selling real estate involves strict regulatory overhead. Our engine parses the exact mandates of the Inland Revenue Department (IRD). The Capital Gains Tax (CGT) on property is an exclusive levy triggered only during the transfer of ownership at the Malpot (Land Revenue) office.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-center">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">Duration Trigger</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Logic relies strictly on holding period (Short-term vs Long-term).</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Mathematical Exemptions</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-[10px] font-black text-[#1A73E8] uppercase">Net Taxable Profit</span>
                     </div>
                     <p className="text-[10px] font-bold text-[#5F6368]">
                        This tool strictly subtracts original cost and legally verified deductible expenses from the final selling price before applying the tax multiplier.
                     </p>
                  </div>
                  <div className="p-4 rounded-md bg-[#E6F4EA] border border-[#188038] flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#188038]" />
                        <span className="text-[10px] font-black text-[#188038] uppercase">The Rs. 10 Lakh Rule</span>
                     </div>
                     <p className="text-[10px] font-bold text-[#188038]">
                        If the gross selling transaction evaluates to less than NPR 1,000,000, the effective CGT is reduced to 0%.
                     </p>
                  </div>
                  <div className="p-4 rounded-md bg-[#FCE8E6] border border-[#D93025] flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#D93025]" />
                        <span className="text-[10px] font-black text-[#D93025] uppercase">Negative Gain Immunity</span>
                     </div>
                     <p className="text-[10px] font-bold text-[#D93025]">
                        If transaction results in a loss (Selling Price &lt; Cost Price), the CGT liability is nullified (0).
                     </p>
                  </div>
               </div>
             </div>
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
        raw: "CGT Amount = Profit × TaxRate",
        variables: [
          "Profit: Selling Price - (Cost Price + Deductible Expenses)",
          "Long-term (≥ 5 Years): TaxRate = 5%",
          "Short-term (< 5 Years): TaxRate = 7.5%",
          "Exemption: If Selling Price < 1,000,000, CGT Amount = 0"
        ]
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
      sidebar={{
        title: "Real Estate Hub",
        subtitle: "Property Calculators",
        links: [
          { label: "Property Registration", href: "/calculator/property-registration/", icon: Map },
          { label: "Mortgage Calc", href: "/calculator/mortgage-calculator/", icon: Landmark },
          { label: "Nepal Land", href: "/calculator/nepal-land/", icon: Activity },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/", icon: ShieldCheck },
        ],
      }}
    />
  );
}

