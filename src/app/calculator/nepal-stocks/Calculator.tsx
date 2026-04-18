'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateNEPSEReturn } from '@/utils/math/country-rules/nepal';
import { TrendingUp, BarChart3, ShieldCheck, Info, ShoppingCart } from 'lucide-react';

export default function NEPSECalculator() {
  const [state, setState] = useSyncState('nepse_v1', {
    qty: 100,
    buyPrice: 1500,
    sellPrice: 1800,
    holdingDays: 400,
    investorType: 'individual' as 'individual' | 'institutional'
  });

  const { qty, buyPrice, sellPrice, holdingDays, investorType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    return calculateNEPSEReturn(qty, buyPrice, sellPrice, holdingDays, investorType);
  }, [qty, buyPrice, sellPrice, holdingDays, investorType]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <CalculatorLayout
      title="NEPSE Profit & CGT Calculator"
      description="Professional trading calculator for Nepal Stock Exchange. Calculate net profit after broker commissions (Jestha 2081 tiers), SEBON fees, and CGT."
      category={{ label: 'Finance & NEPSE', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Share Quantity" 
                value={qty} 
                onChange={v => update({ qty: v })} 
                min={1} 
                hint="Total units traded"
              />
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Investor Category</label>
                 <div className="flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-xl">
                    {(['individual', 'institutional'] as const).map(type => (
                       <button 
                         key={type} 
                         onClick={() => update({ investorType: type })}
                         className={`flex-1 py-2 text-[10px] font-black uppercase transition-all rounded-lg ${investorType === type ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                       >
                         {type}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <ValidatedInput 
                label="Buying Price (NPR)" 
                value={buyPrice} 
                onChange={v => update({ buyPrice: v })} 
                prefix="Rs."
              />
              <ValidatedInput 
                label="Selling Price (NPR)" 
                value={sellPrice} 
                onChange={v => update({ sellPrice: v })} 
                prefix="Rs."
              />
           </div>

           <div className="pt-6 border-t border-[var(--border)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Holding Period Logic</h3>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Day Count: {holdingDays} Days</div>
              </div>
              
              <div className="p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl overflow-hidden flex">
                 {[
                   { days: 30, label: 'Short-term (< 1yr)', rate: '7.5% CGT' },
                   { days: 400, label: 'Long-term (≥ 1yr)', rate: '5% CGT' }
                 ].map(period => (
                    <button 
                      key={period.label}
                      onClick={() => update({ holdingDays: period.days })}
                      className={`flex-1 p-4 text-left transition-all group ${holdingDays === period.days || (holdingDays >= 365 && period.days === 400) || (holdingDays < 365 && period.days === 30) ? 'bg-white shadow-md' : 'hover:bg-slate-100'}`}
                    >
                       <div className="text-[10px] font-black text-slate-900 uppercase mb-0.5">{period.label}</div>
                       <div className={`text-[11px] font-black ${holdingDays === period.days || (holdingDays >= 365 && period.days === 400) || (holdingDays < 365 && period.days === 30) ? 'text-emerald-600' : 'text-slate-400'}`}>{period.rate}</div>
                    </button>
                 ))}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Note: Holding period is tracked per stock script in the NEPSE secondary market for tax calculation.</p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Net Profit After Tax" 
            value={fmt(result.netProfit)} 
            unit=" Rs." 
            color={result.netProfit >= 0 ? 'emerald' : 'red'} 
            title="Trading Outcome"
            copyValue={`ROI: ${result.roi}%, Net Profit: Rs. ${result.netProfit}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
             <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Trade Summary</div>
                   <div className="text-lg font-black">{qty} Units @ Rs. {sellPrice}</div>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
             </div>
             <div className="p-6 divide-y divide-slate-100 italic">
                <div className="py-4 flex justify-between items-center text-[11px] font-bold">
                   <span className="text-slate-500 italic">Total Purchase Cost (Broker + SEBON)</span>
                   <span className="text-slate-900 font-mono italic">Rs. {fmt(result.totalCost)}</span>
                </div>
                <div className="py-4 flex justify-between items-center text-[11px] font-bold">
                   <span className="text-slate-500 italic">Net Sell Proceeds (After Broker)</span>
                   <span className="text-slate-900 font-mono italic">Rs. {fmt(result.netSellProceeds)}</span>
                </div>
                <div className="py-4 flex justify-between items-center text-[11px] font-bold">
                   <span className="text-rose-600 italic">Capital Gains Tax (CGT)</span>
                   <span className="text-rose-600 font-mono italic">- Rs. {fmt(result.cgtAmount)}</span>
                </div>
                <div className="py-5 flex justify-between items-center">
                   <span className="text-[11px] font-black text-slate-900 uppercase">ROI (Return on Investment)</span>
                   <span className={`text-xl font-black font-mono ${result.roi >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{result.roi}%</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
             <BarChart3 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase">Commission Note</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic">
                   "Updated with **Jestha 2081 (May 2024)** broker tiers. Commissions range from 0.36% for small trades down to 0.243% for trades over NPR 1 Crore."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter">The NEPSE Investor Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 underline underline-offset-4 decoration-2 decoration-emerald-200">The 365-Day Threshold</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">In Nepal, the tax system rewards long-term investors. If you sell a stock after holding it for **365 days or more**, your profit is taxed at **5%**. If you sell within a year, it is considered speculative and taxed at **7.5%**.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 underline underline-offset-4 decoration-2 decoration-emerald-200">WACC vs Buy Price</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">When calculating profit for tax, NEPSE uses the **Weighted Average Cost of Capital (WACC)**. If you bought the same stock multiple times at different prices, the system averages them out. This calculator uses a simple buy/sell comparison for profit estimation.</p>
                  </div>
               </div>
            </div>
         </div>
      }
    />
  );
}
