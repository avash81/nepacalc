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
