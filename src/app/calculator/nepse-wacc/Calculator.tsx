'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { BarChart3, Plus, Trash2, Calculator as CalcIcon, ShieldCheck, Info } from 'lucide-react';

interface PurchaseCluster {
  id: string;
  qty: number;
  price: number;
}

export default function WACCCalculator() {
  const [state, setState] = useSyncState('wacc_v1', {
    clusters: [
      { id: '1', qty: 100, price: 1500 },
      { id: '2', qty: 100, price: 1200 }
    ] as PurchaseCluster[]
  });

  const { clusters } = state;

  const results = useMemo(() => {
    let totalQty = 0;
    let totalInvestment = 0;
    
    clusters.forEach(c => {
      totalQty += c.qty;
      totalInvestment += c.qty * c.price;
    });

    const wacc = totalQty > 0 ? totalInvestment / totalQty : 0;
    return { wacc, totalQty, totalInvestment };
  }, [clusters]);

  const addCluster = () => {
    setState({
      ...state,
      clusters: [...clusters, { id: Math.random().toString(), qty: 0, price: 0 }]
    });
  };

  const removeCluster = (id: string) => {
    if (clusters.length <= 1) return;
    setState({
      ...state,
      clusters: clusters.filter(c => c.id !== id)
    });
  };

  const updateCluster = (id: string, field: 'qty' | 'price', val: number) => {
    setState({
      ...state,
      clusters: clusters.map(c => c.id === id ? { ...c, [field]: val } : c)
    });
  };

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <CalculatorLayout
      title="NEPSE WACC Analyzer"
      description="Calculate the Weighted Average Cost of Capital (WACC) for your stock portfolio. Essential for accurate tax declaration and CGT (Capital Gains Tax) logic in Nepal."
      category={{ label: 'NEPSE', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Stock Purchase Clusters</label>
                 <button 
                   onClick={addCluster}
                   className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
                 >
                    <Plus className="w-3 h-3" /> Add Purchase
                 </button>
              </div>

              <div className="space-y-4">
                 {clusters.map((c, idx) => (
                    <div key={c.id} className="p-6 bg-white border border-[var(--border)] rounded-2xl shadow-sm relative group">
                       <div className="absolute top-4 right-4 text-[10px] font-black text-slate-300">Cluster #{idx + 1}</div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <ValidatedInput 
                            label="Quantity" 
                            value={c.qty} 
                            onChange={v => updateCluster(c.id, 'qty', v)} 
                            min={0}
                          />
                          <ValidatedInput 
                            label="Rate (NPR)" 
                            value={c.price} 
                            onChange={v => updateCluster(c.id, 'price', v)} 
                            min={0}
                            prefix="Rs."
                          />
                       </div>
                       {clusters.length > 1 && (
                          <button 
                            onClick={() => removeCluster(c.id)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-rose-100 text-rose-500 rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       )}
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Meroshare Compliance</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic italic">
                "WACC calculation is mandatory before selling any shares in Nepal. Meroshare requires you to 'My Purchase Update' where you must confirm the WACC."
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Calculated Portfolio WACC" 
            value={fmt(results.wacc)} 
            unit=" Rs." 
            color="indigo" 
            title="Portfolio Baseline"
            copyValue={`My NEPSE WACC is Rs. ${results.wacc}`}
          />

          <div className="bg-white border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm italic">
             <div className="p-6 bg-slate-800 text-white flex justify-between items-center">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Inventory Ledger</div>
                   <div className="text-xl font-black">{results.totalQty} Units</div>
                </div>
                <CalcIcon className="w-8 h-8 text-indigo-400 opacity-40" />
             </div>
             <div className="p-6 divide-y divide-slate-100 italic">
                <div className="py-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase italic">Total Invested Principal</span>
                   <span className="text-sm font-black text-slate-900 font-mono italic">Rs. {fmt(results.totalInvestment)}</span>
                </div>
                <div className="py-5 bg-slate-50 -mx-6 px-6 italic">
                   <span className="text-[11px] font-black text-slate-900 uppercase italic underline underline-offset-4 decoration-2 decoration-indigo-200">Weighted Average Price</span>
                   <span className="text-xl font-black text-indigo-600 font-mono italic">Rs. {fmt(results.wacc)}</span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 italic">
             <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-900 uppercase italic italic">Investor Tip</h5>
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed italic italic">
                   "If you receive bonus shares, your WACC will decrease because the bonus units are added with a cost of Rs. 0. This lowers your average portfolio cost."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter italic">Demystifying NEPSE WACC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic underline underline-offset-4 decoration-2 decoration-indigo-200">Why is WACC important?</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic underline underline-offset-4 decoration-2 decoration-indigo-200">The government calculates your Capital Gains Tax (CGT) based on the profit you make over your WACC. A lower WACC leads to higher taxable profit, while a higher WACC reduces your tax liability.</p>
               </div>
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 italic underline underline-offset-4 decoration-2 decoration-indigo-200">Does WACC include Broker fees?</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">Technically, per IRD rules, you can add your SEBON and Broker commissions into the cost of purchase, slightly increasing your WACC and reducing your net taxable profit. However, most Meroshare users use only the net rate for simplicity.</p>
               </div>
            </div>
         </div>
      }
    />
  );
}
