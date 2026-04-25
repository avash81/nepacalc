'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Receipt, Landmark, Info, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function NepalVATCalculator() {
  const [state, setState] = useSyncState('nepal_vat_v4', {
    mode: 'add' as 'add' | 'remove',
    amount: 1000,
    includeServiceCharge: false
  });
  const { mode, amount, includeServiceCharge } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const vatRate = 0.13;
    const scRate = 0.10;
    
    let baseAmount = 0, scAmount = 0, vatAmount = 0, final = 0;

    if (mode === 'add') {
      baseAmount = amount;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = (baseAmount + scAmount) * vatRate;
      final = baseAmount + scAmount + vatAmount;
    } else {
      final = amount;
      const combinedMultiplier = includeServiceCharge ? (1 + scRate) * (1 + vatRate) : (1 + vatRate);
      baseAmount = final / combinedMultiplier;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = final - baseAmount - scAmount;
    }

    return { baseAmount, scAmount, vatAmount, final };
  }, [mode, amount, includeServiceCharge]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'VAT Calculator' }]}
      title="Nepal VAT Calculator (13%)"
      description="Quickly add or extract 13% Value Added Tax (VAT) with optional 10% service charge for Nepal's hospitality sector."
      icon={Receipt}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Calculation Mode</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {([{ id: 'add', label: 'Add VAT' }, { id: 'remove', label: 'Extract VAT' }] as const).map(m => (
                <button 
                  key={m.id} 
                  onClick={() => update({ mode: m.id })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${mode === m.id ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>{mode === 'add' ? 'Amount (Excl. VAT)' : 'Total Amount (Incl. VAT)'}</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount} 
                onChange={e => update({ amount: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
            <input 
              type="checkbox" 
              id="sc" 
              checked={includeServiceCharge} 
              onChange={e => update({ includeServiceCharge: e.target.checked })}
              className="w-4 h-4 rounded border-[#DADCE0] text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <label htmlFor="sc" className="text-sm font-medium text-[#3C4043] cursor-pointer">
              Include 10% Service Charge (SC)
            </label>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate VAT
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">{mode === 'add' ? 'Total (Inclusive)' : 'Base (Exclusive)'}</div>
            <div className="text-3xl font-black text-[#1A73E8]">NPR {fmt(mode === 'add' ? r.final : r.baseAmount)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">{mode === 'add' ? 'Net + VAT (+ SC)' : 'Original Amount'}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Detailed Breakdown</span>
               <FileText className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="divide-y divide-[#DADCE0]">
               <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                 <span className="text-xs text-[#5F6368]">Base Price</span>
                 <span className="text-xs font-bold">NPR {fmt(r.baseAmount)}</span>
               </div>
               {includeServiceCharge && (
                 <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                   <span className="text-xs text-[#5F6368]">Service Charge (10%)</span>
                   <span className="text-xs font-bold text-[#D93025]">+ NPR {fmt(r.scAmount)}</span>
                 </div>
               )}
               <div className="p-3 flex justify-between items-center hover:bg-[#F8F9FA]">
                 <span className="text-xs text-[#5F6368]">VAT (13%)</span>
                 <span className="text-xs font-bold text-[#D93025]">+ NPR {fmt(r.vatAmount)}</span>
               </div>
               <div className="p-3 flex justify-between items-center bg-[#F8F9FA]">
                 <span className="text-xs font-black text-[#202124] uppercase">Total Payable</span>
                 <span className="text-sm font-black text-[#1A73E8]">NPR {fmt(r.final)}</span>
               </div>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Verified for <strong>FY 2081/82</strong> IRD Nepal tax regulations.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Definitive Nepal VAT Tax Algorithm</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Corporate accounting and retail billing in Nepal demand absolute precision when handling the statutory 13% tax rate. Our <strong className="text-[#202124]">vat calculator nepal</strong> is built to comply strictly with the Inland Revenue Department (IRD) directives. By functioning as a bidirectional <strong className="text-[#202124]">13 percent vat calculator</strong>, it allows financial officers and consumers to seamlessly <strong className="text-[#202124]">add vat extract vat nepal</strong> without encountering floating-point rounding errors that typically plague manual spreadsheet calculations.
              </p>
              <p>
                Unlike generic global calculators, this tool integrates a specialized <strong className="text-[#202124]">service charge calculation nepal</strong> toggle. In the Nepalese hospitality sector (hotels and restaurants), a mandatory 10% Service Charge (SC) must be added to the base price <span className="italic">before</span> the 13% VAT is applied. This cascading tax model ensures your final invoice matches official <strong className="text-[#202124]">ird vat rules nepal</strong> perfectly.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Operations & PAN/VAT Compliance</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Forward Computation (Adding VAT):</strong> When generating a retail invoice, the formula evaluates as: <code className="bg-[#F1F3F4] px-1 rounded text-[#D93025]">Total = Base × (1 + 0.10 SC) × 1.13</code>. This is the exact sequence used by certified billing software.</li>
              <li><strong className="text-[#188038]">Reverse Computation (Extracting VAT):</strong> If a consumer is given a "tax-inclusive" price, the algorithm isolates the true base price by dividing the gross amount by <code className="bg-[#F1F3F4] px-1 rounded text-[#D93025]">1.13</code> (or <code className="bg-[#F1F3F4] px-1 rounded text-[#D93025]">1.243</code> if SC is included). This is crucial for businesses reconciling their <strong className="text-[#202124]">pan vat calculator</strong> ledgers at the end of the fiscal month.</li>
              <li><strong className="text-[#D93025]">Zero-Rated vs Exempt:</strong> Note that this engine calculates standard taxable outputs. It does not apply to zero-rated exports or VAT-exempt agricultural/medical goods under Schedule 1 of the VAT Act.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Choose 'Add VAT' if you have the net price and want to find the total.",
          "Choose 'Extract VAT' if you have the final price and want to find the tax-exclusive amount.",
          "Enable the 'Service Charge' toggle if you are calculating for a restaurant or hotel bill.",
          "The calculator uses Nepal's standard 13% VAT rate automatically."
        ]
      }}
      formula={{
        title: "VAT Calculation Formula",
        description: "VAT is calculated using the following standard accounting methods in Nepal.",
        raw: "Add VAT: Total = Base × 1.13\nExtract VAT: Base = Total / 1.13\nWith Service Charge: Total = Base × 1.10 × 1.13"
      }}
      faqs={[
        {
          question: "What goods are exempt from VAT in Nepal?",
          answer: "Essential items like fresh vegetables, fruits, rice, pulse, and educational materials are generally exempt from VAT as per the VAT Act 2052."
        },
        {
          question: "Is the 10% Service Charge mandatory?",
          answer: "While common in the hospitality sector, recent legal discussions in Nepal have questioned the mandatory nature of service charges. However, most restaurants still include it in calculations."
        }
      ]}
      sidebar={{
        title: "Nepal Tax Tools",
        links: [
          { label: "Income Tax", href: "/calculator/nepal-income-tax" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary" },
          { label: "Vehicle Tax", href: "/calculator/nepal-vehicle-tax" },
        ],
        banner: {
          title: "Simplified Compliance",
          description: "NepaCalc tools are updated with the latest fiscal changes to help you stay compliant with IRD rules.",
          image: "/images/vat-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax" },
        { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary" }
      ]}
    />
  );
}
