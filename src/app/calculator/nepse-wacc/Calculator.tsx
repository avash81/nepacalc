'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { PieChart, TrendingUp, History, Info } from 'lucide-react';

const DEFAULT_STATE = {
  purchases: [
    { qty: 100, price: 500, type: 'buy' as 'buy' | 'bonus' | 'right' }
  ],
  investorType: 'individual' as 'individual' | 'institutional',
};

export default function NepseWACCCalculator() {
  const [state, setState] = useSyncState('nepse_wacc_v1', DEFAULT_STATE);
  const { purchases, investorType } = state;

  const updatePurchase = (idx: number, updates: any) => {
    const next = [...purchases];
    next[idx] = { ...next[idx], ...updates };
    setState({ ...state, purchases: next });
  };

  const addPurchase = () => {
    setState({ 
      ...state, 
      purchases: [...purchases, { qty: 10, price: 100, type: 'buy' }] 
    });
  };

  const removePurchase = (idx: number) => {
    setState({ 
      ...state, 
      purchases: purchases.filter((_, i) => i !== idx) 
    });
  };

  const results = useMemo(() => {
    let totalQty = 0;
    let totalCost = 0;

    purchases.forEach(p => {
      totalQty += p.qty;
      if (p.type === 'buy') {
        const brokerRate = 0.004; // Average broker rate 0.4%
        const sebonRate = 0.00015;
        const purchaseCost = p.qty * p.price;
        const totalFees = purchaseCost * (brokerRate + sebonRate) + 25; // DP charge 25
        totalCost += (purchaseCost + totalFees);
      } else if (p.type === 'right') {
        totalCost += (p.qty * 100); // Right shares cost 100
      }
      // Bonus shares cost 0 in WACC calculation
    });

    const wacc = totalQty > 0 ? totalCost / totalQty : 0;

    return { totalQty, totalCost, wacc };
  }, [purchases]);

  return (
    <CalculatorLayout
      title="NEPSE WACC & Tax Calculator"
      description="Calculate your Weighted Average Cost of Capital (WACC) for NEPSE shares. Helps you determine your exact profit and tax liability when selling."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Purchase History</h3>
            <button onClick={addPurchase} className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg uppercase hover:bg-emerald-700 transition-all">
              + Add Purchase
            </button>
          </div>

          <div className="space-y-4">
            {purchases.map((p, i) => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl relative shadow-sm">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Type</label>
                    <select 
                      value={p.type} 
                      onChange={e => updatePurchase(i, { type: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-200 rounded-xl font-bold text-xs outline-none bg-slate-50 focus:border-emerald-500"
                    >
                      <option value="buy">Purchase (Market)</option>
                      <option value="bonus">Bonus Share</option>
                      <option value="right">Right Share</option>
                    </select>
                  </div>
                  <ValidatedInput label="Quantity" value={p.qty} onChange={v => updatePurchase(i, { qty: v })} min={1} />
                </div>
                {p.type === 'buy' && (
                  <ValidatedInput label="Price (LTP)" value={p.price} onChange={v => updatePurchase(i, { price: v })} min={1} prefix="Rs." />
                )}
                
                {purchases.length > 1 && (
                  <button onClick={() => removePurchase(i)} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-rose-600 transition-all shadow-lg">
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
              Note: Bonus shares are calculated with a cost of Rs. 0, while Right shares are calculated at their face value of Rs. 100 for WACC purpose.
            </p>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
            <div className="p-10 border-b border-slate-50">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Calculated WACC</div>
               <div className="text-6xl font-black text-slate-900 tracking-tighter">
                 Rs. {results.wacc.toLocaleString(undefined, { maximumFractionDigits: 2 })}
               </div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Per Share Average Cost</div>
            </div>
            
            <div className="p-8 bg-slate-50/50 flex justify-around">
              <div className="text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Quantity</div>
                  <div className="text-xl font-black text-slate-900">{results.totalQty.toLocaleString()} Units</div>
              </div>
              <div className="w-px h-10 bg-slate-200 self-center" />
              <div className="text-center">
                  <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Cost</div>
                  <div className="text-xl font-black text-slate-900">Rs. {results.totalCost.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                <div>
                   <div className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-1">Estimated Tax Base</div>
                   <div className="text-xs text-emerald-700 font-medium">Selling above this price triggers CGT.</div>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
             </div>
             
             <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
                <div className="flex items-center gap-2">
                   <History className="w-4 h-4 text-emerald-400" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest">WACC Components</h4>
                </div>
                <div className="divide-y divide-slate-800">
                   <div className="py-3 flex justify-between text-xs">
                      <span className="text-slate-400">Buying Fees (est.)</span>
                      <span className="font-bold">0.4% + Rs. 25</span>
                   </div>
                   <div className="py-3 flex justify-between text-xs">
                      <span className="text-slate-400">Bonus Cost</span>
                      <span className="font-bold underline decoration-emerald-500 decoration-2">Rs. 0.00</span>
                   </div>
                   <div className="py-3 flex justify-between text-xs">
                      <span className="text-slate-400">Right Share Cost</span>
                      <span className="font-bold">Rs. 100.00</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is WACC in NEPSE?', answer: 'Weighted Average Cost of Capital (WACC) is the average price you paid for your shares, including broker commissions and charges. It is used to calculate the actual profit and tax when selling.' },
          { question: 'Why do bonus shares have zero cost?', answer: 'Under current Nepal tax rules for WACC calculation, bonus shares are considered to have a cost of zero, which lowers your total average cost and increases your taxable profit.' },
          { question: 'Is broker commission included?', answer: 'Yes, professional traders always include the 0.4% (avg) broker commission and DP charges in their WACC to know their true break-even point.' },
        ]} />
      }
    />
  );
}
