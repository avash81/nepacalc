'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Coins, TrendingUp, PiggyBank, ShieldCheck, Info } from 'lucide-react';

export default function BonusTaxCalculator() {
  const [state, setState] = useSyncState('bonus_tax_v2', {
    totalDividend: 10000,
    isBonusShare: false,
    shareQuantity: 100,
    bonusPercent: 10
  });

  const { totalDividend, isBonusShare, shareQuantity, bonusPercent } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    if (!isBonusShare) {
      const taxAmount = totalDividend * 0.05;
      const netDividend = totalDividend - taxAmount;
      return { taxAmount, netAmount: netDividend, type: 'Cash' };
    } else {
      // Bonus Share Tax Logic: Calculated on the par value (usually Rs 100)
      const bonusUnits = (shareQuantity * bonusPercent) / 100;
      const taxAmount = (bonusUnits * 100) * 0.05;
      return { bonusUnits, taxAmount, type: 'Bonus' };
    }
  }, [totalDividend, isBonusShare, shareQuantity, bonusPercent]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <CalculatorLayout
      title="Bonus & Dividend Console"
      description="Calculate tax on cash dividends and bonus shares for listed companies in Nepal. Standard 5% individual tax logic based on IRD 2081/82 mandates."
      category={{ label: 'NEPSE', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Dividend Type</label>
              <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl">
                 <button 
                   onClick={() => update({ isBonusShare: false })}
                   className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl transition-all ${!isBonusShare ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    <Coins className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Cash Dividend</span>
                 </button>
                 <button 
                   onClick={() => update({ isBonusShare: true })}
                   className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl transition-all ${isBonusShare ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Bonus Shares</span>
                 </button>
              </div>
           </div>

           {!isBonusShare ? (
             <ValidatedInput 
               label="Total Cash Dividend Declared" 
               value={totalDividend} 
               onChange={v => update({ totalDividend: v })} 
               prefix="Rs." 
               hint="Gross amount before 5% tax"
             />
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ValidatedInput 
                  label="Number of Shares Held" 
                  value={shareQuantity} 
                  onChange={v => update({ shareQuantity: v })} 
                  hint="Units in Demat"
                />
                <ValidatedInput 
                  label="Bonus Percentage (%)" 
                  value={bonusPercent} 
                  onChange={v => update({ bonusPercent: v })} 
                  suffix="%" 
                />
             </div>
           )}

           <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Statutory Tax Rate: 5%</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "For individual investors in Nepal, cash dividends and bonus shares are taxed at a flat **5%**. This is typically deducted by the company before distribution."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Tax Payable" 
            value={fmt(result.taxAmount)} 
            unit=" Rs." 
            color="indigo" 
            title="WHT Deduction"
            copyValue={`Dividend Tax to pay: Rs. ${result.taxAmount}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm italic">
             <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Investor Ledger</div>
                   <div className="text-xl font-black">{!isBonusShare ? 'Cash Payout' : `${(result as any).bonusUnits} Units`}</div>
                </div>
                <PiggyBank className="w-8 h-8 text-white opacity-40" />
             </div>
             <div className="p-6 divide-y divide-slate-100 italic">
                {!isBonusShare ? (
                  <>
                    <div className="py-4 flex justify-between items-center">
                       <span className="text-[11px] font-bold text-slate-500 uppercase">Gross Dividend</span>
                       <span className="text-sm font-black text-slate-900 font-mono italic">Rs. {fmt(totalDividend)}</span>
                    </div>
                    <div className="py-5 flex justify-between items-center bg-slate-50 -mx-6 px-6 italic">
                       <span className="text-[11px] font-black text-slate-900 uppercase italic">Net Cash in Bank</span>
                       <span className="text-xl font-black text-emerald-600 font-mono italic">Rs. {fmt(result.netAmount!)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-4 flex justify-between items-center">
                       <span className="text-[11px] font-bold text-slate-500 uppercase italic">Bonus Units to Receive</span>
                       <span className="text-sm font-black text-slate-900 font-mono italic">{(result as any).bonusUnits} Units</span>
                    </div>
                    <div className="py-4 flex justify-between items-center italic">
                       <span className="text-[11px] font-bold text-slate-400 uppercase italic">Face Value (Rs. 100/unit)</span>
                       <span className="text-sm font-black text-slate-400 font-mono italic">Rs. {fmt((result as any).bonusUnits * 100)}</span>
                    </div>
                  </>
                )}
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 italic">
             <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase italic italic">Portfolio Note</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic italic">
                   "Most companies now allow you to pay bonus share tax directly via connectIPS or manual bank deposit before the shares are credited to your Demat."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter italic">Dividend Tax Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-sm font-black text-slate-900 mb-2 italic underline underline-offset-4 decoration-2 decoration-emerald-200">The 5% Rule</h4>
                  <p className="text-[12px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-emerald-100 italic">In Nepal, dividends from listed companies are subject to a Final Withholding Tax of **5%** for individuals. This is different from the Capital Gains Tax (CGT) you pay when you sell shares.</p>
               </div>
               <div>
                  <h4 className="text-sm font-black text-slate-900 mb-2 italic underline underline-offset-4 decoration-2 decoration-emerald-200">Bonus Share Taxing</h4>
                  <p className="text-[12px] text-slate-600 leading-relaxed font-medium italic">Even though you don't receive cash, bonus shares are considered income. The tax is calculated as **5% of the Face Value** (usually Rs. 100) per unit of the bonus share issued to you.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
