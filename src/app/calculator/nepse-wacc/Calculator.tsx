'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  Plus, Trash2, TrendingUp, Receipt, Wallet, Globe, Target, Calculator as CalcIcon, Percent, AlertCircle, FileText
} from 'lucide-react';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

type BatchType = 'ipo' | 'fpo' | 'secondary' | 'bonus' | 'right' | 'auction';

interface PurchaseBatch { 
  id: string; 
  type: BatchType; 
  qty: number; 
  price: number; 
  bonusRatioPercent: number; 
  rightRatioPercent: number;
}

function formatNPR(n: number) { 
  return 'Rs. ' + n.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }); 
}

function formatInt(n: number) {
  return Math.floor(n).toLocaleString('en-IN');
}

function calculateBrokerCommission(amount: number): number {
  if (amount <= 50000) return amount * 0.0040;
  if (amount <= 500000) return amount * 0.0037;
  if (amount <= 2000000) return amount * 0.0034;
  if (amount <= 10000000) return amount * 0.0030;
  return amount * 0.0027;
}

function calculateActualCost(qty: number, price: number, type: BatchType): { totalCost: number, broker: number, sebon: number, dp: number } {
  if (type === 'bonus') return { totalCost: 0, broker: 0, sebon: 0, dp: 0 };
  
  let principal = qty * price;
  
  if (type === 'ipo' || type === 'fpo' || type === 'right') {
     // Standard MeroShare WACC usually just adds the principal cost for primary markets.
     // Some platforms may add DP charge, but MeroShare WACC formula is strictly based on face value/issue price.
     return { totalCost: principal, broker: 0, sebon: 0, dp: 0 };
  }
  
  if (type === 'secondary' || type === 'auction') {
    let broker = calculateBrokerCommission(principal);
    let sebon = principal * 0.00015; // 0.015%
    let dp = 25;
    return { totalCost: principal + broker + sebon + dp, broker, sebon, dp };
  }
  
  return { totalCost: principal, broker: 0, sebon: 0, dp: 0 };
}

export default function WACCCalculator() {
  const [state, setState] = useSyncState('nepse_wacc_v6', {
    batches: [ 
      { id: '1', type: 'secondary', qty: 100, price: 500, bonusRatioPercent: 0, rightRatioPercent: 0 } 
    ] as PurchaseBatch[],
    currentLTP: 600,
    sellQty: 100,
    sellingPrice: 600,
    cgtRate: 0.05 // 5% default
  });

  const { batches, currentLTP, sellQty, sellingPrice, cgtRate } = state;

  const result = useMemo(() => {
    let accumulatedQty = 0;
    let accumulatedInvestment = 0;
    let processedBatches: (PurchaseBatch & { calculatedQty: number, calculatedCost: number, accumulatedQty: number, accumulatedInvestment: number })[] = [];

    batches.forEach(batch => {
        let calculatedQty = batch.qty;
        let calculatedCost = 0;

        if (batch.type === 'bonus') {
            calculatedQty = Math.floor(accumulatedQty * (batch.bonusRatioPercent / 100));
            calculatedCost = 0; 
        } else if (batch.type === 'right') {
            calculatedQty = Math.floor(accumulatedQty * (batch.rightRatioPercent / 100));
            calculatedCost = calculatedQty * batch.price;
        } else {
            const costData = calculateActualCost(batch.qty, batch.price, batch.type);
            calculatedCost = costData.totalCost;
        }
        
        accumulatedQty += calculatedQty;
        accumulatedInvestment += calculatedCost;
        
        processedBatches.push({
           ...batch,
           calculatedQty,
           calculatedCost,
           accumulatedQty,
           accumulatedInvestment
        });
    });

    const wacc = accumulatedQty > 0 ? accumulatedInvestment / accumulatedQty : 0;
    const marketValue = accumulatedQty * currentLTP;
    const profit = marketValue - accumulatedInvestment;

    // Sell Calculation
    const effectiveSellQty = Math.min(accumulatedQty, sellQty);
    const sellPrincipal = effectiveSellQty * sellingPrice;
    const sellBroker = calculateBrokerCommission(sellPrincipal);
    const sellSebon = sellPrincipal * 0.00015;
    const sellDp = 25;
    const netSellAmount = sellPrincipal - sellBroker - sellSebon - sellDp;
    
    const costBasis = effectiveSellQty * wacc;
    const sellProfit = netSellAmount - costBasis;
    const cgtAmount = sellProfit > 0 ? sellProfit * cgtRate : 0;
    const netReceivable = netSellAmount - cgtAmount;

    // Visuals
    const batchData = processedBatches.map((c, i) => ({
      name: `Batch ${i+1} (${c.type.toUpperCase()})`,
      value: c.calculatedCost,
      fill: ['#1A73E8', '#188038', '#fbbf24', '#D93025', '#8b5cf6', '#0ea5e9'][i % 6]
    })).filter(d => d.value > 0);

    return { 
      wacc, totalQty: accumulatedQty, totalInvestment: accumulatedInvestment, marketValue, profit, 
      processedBatches, batchData,
      sell: { effectiveSellQty, sellPrincipal, sellBroker, sellSebon, sellDp, netSellAmount, costBasis, sellProfit, cgtAmount, netReceivable }
    };
  }, [batches, currentLTP, sellQty, sellingPrice, cgtRate]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });
  
  const addBatch = () => update({ 
    batches: [...batches, { id: Math.random().toString(), type: 'secondary', qty: 0, price: 0, bonusRatioPercent: 0, rightRatioPercent: 0 }] 
  });
  
  const removeBatch = (id: string) => { 
    if (batches.length > 1) update({ batches: batches.filter(c => c.id !== id) }); 
  };
  
  const updateBatch = (id: string, field: keyof PurchaseBatch, val: any) => {
    update({ batches: batches.map(c => c.id === id ? { ...c, [field]: val } : c) });
  };

  const getBatchLabel = (type: string) => {
    switch(type) {
      case 'secondary': return 'Secondary Market';
      case 'ipo': return 'IPO';
      case 'fpo': return 'FPO';
      case 'bonus': return 'Bonus Share';
      case 'right': return 'Right Share';
      case 'auction': return 'Auction';
      default: return type;
    }
  };

  return (
    <ModernCalcLayout
      slug="nepse-wacc"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'WACC Calculator' }]}
      title="NEPSE WACC & Capital Gain Calculator"
      description="The definitive NEPSE investment tracking engine. Automatically calculate MeroShare WACC, adjust for bonus/rights shares, factor in exact SEBON broker commissions, and estimate net capital gains."
      icon={Target}
      inputs={
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <CalcIcon className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Transaction Builder</h3>
             </div>
             <button 
               onClick={addBatch}
               className="h-9 px-4 bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1A73E8] text-[10px] font-black uppercase rounded-md transition-all flex items-center gap-2"
             >
                <Plus className="w-3 h-3" /> Add Batch
             </button>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
             {batches.map((c, idx) => (
                <div key={c.id} className="p-4 bg-white border border-[#DADCE0] rounded-md relative group transition-all hover:border-[#1A73E8] shadow-sm">
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3 w-full">
                        <span className="text-[9px] font-black text-[#1A73E8] uppercase tracking-wider bg-[#E8F0FE] px-2 py-1 rounded">Batch #{idx+1}</span>
                        <select 
                          value={c.type} 
                          onChange={e => updateBatch(c.id, 'type', e.target.value)}
                          className="text-xs font-bold bg-transparent text-slate-700 outline-none cursor-pointer hover:text-[#1A73E8] flex-1"
                        >
                          <option value="secondary">Secondary Market</option>
                          <option value="ipo">IPO (Initial Public Offering)</option>
                          <option value="fpo">FPO</option>
                          <option value="auction">Auction Shares</option>
                          <option value="bonus">Bonus Shares</option>
                          <option value="right">Right Shares</option>
                        </select>
                      </div>
                      
                      {batches.length > 1 && (
                        <button onClick={() => removeBatch(c.id)} className="p-1.5 hover:bg-rose-50 rounded-md text-rose-600 transition-colors shrink-0 ml-2">
                           <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3 pt-2">
                      {c.type === 'bonus' ? (
                        <>
                          <div className="space-y-1 col-span-2">
                             <label className="text-[9px] font-black text-[#5F6368] uppercase">Bonus Ratio (%)</label>
                             <div className="relative">
                               <input type="number" value={c.bonusRatioPercent} onChange={e => updateBatch(c.id, 'bonusRatioPercent', Number(e.target.value))} className="w-full h-10 pl-3 pr-8 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="e.g. 15 for 15%" />
                               <Percent className="w-3.5 h-3.5 absolute right-3 top-3 text-[#5F6368]" />
                             </div>
                             <p className="text-[10px] text-blue-600 mt-1">Calculated Kitta: {result.processedBatches[idx]?.calculatedQty || 0} (from previous batches)</p>
                          </div>
                        </>
                      ) : c.type === 'right' ? (
                        <>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-[#5F6368] uppercase">Right Ratio (%)</label>
                             <div className="relative">
                               <input type="number" value={c.rightRatioPercent} onChange={e => updateBatch(c.id, 'rightRatioPercent', Number(e.target.value))} className="w-full h-10 pl-3 pr-8 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="e.g. 50 for 1:0.5" />
                               <Percent className="w-3.5 h-3.5 absolute right-3 top-3 text-[#5F6368]" />
                             </div>
                             <p className="text-[10px] text-blue-600 mt-1">Calculated Kitta: {result.processedBatches[idx]?.calculatedQty || 0}</p>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-[#5F6368] uppercase">Issue Price</label>
                             <input type="number" value={c.price} onChange={e => updateBatch(c.id, 'price', Number(e.target.value))} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="Usually 100" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-[#5F6368] uppercase">Quantity</label>
                             <input type="number" value={c.qty} onChange={e => updateBatch(c.id, 'qty', Number(e.target.value))} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="Units" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-[#5F6368] uppercase">Purchase Rate</label>
                             <input type="number" value={c.price} onChange={e => updateBatch(c.id, 'price', Number(e.target.value))} className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" placeholder="Price" />
                          </div>
                          {(c.type === 'secondary' || c.type === 'auction') && result.processedBatches[idx]?.calculatedCost > 0 && (
                             <div className="col-span-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex justify-between">
                               <span>Includes Broker Fee, SEBON & DP</span>
                               <span className="font-bold text-slate-700">Actual Cost: {formatNPR(result.processedBatches[idx].calculatedCost)}</span>
                             </div>
                          )}
                        </>
                      )}
                   </div>
                </div>
             ))}
          </div>

          <div className="pt-6 border-t border-[#DADCE0] space-y-4 bg-[#F8F9FA] p-4 rounded-xl">
             <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A73E8]">Sell & Tax Scenario</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
               <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-[#5F6368] uppercase">Sell Quantity</label>
                  <input type="number" value={sellQty} onChange={e => update({ sellQty: Number(e.target.value) })} className="w-full h-10 px-3 bg-white border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" />
               </div>
               <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-[#5F6368] uppercase">Selling Price (LTP)</label>
                  <input type="number" value={sellingPrice} onChange={e => update({ sellingPrice: Number(e.target.value), currentLTP: Number(e.target.value) })} className="w-full h-10 px-3 bg-white border border-[#DADCE0] rounded text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" />
               </div>
             </div>

             <div className="space-y-2 pt-2 border-t border-[#DADCE0]">
                <label className="text-[9px] font-black text-[#5F6368] uppercase block">Capital Gain Tax (CGT) Rate</label>
                <div className="flex gap-3">
                   <button 
                     onClick={() => update({ cgtRate: 0.05 })}
                     className={`flex-1 h-9 rounded-md text-xs font-bold transition-colors ${cgtRate === 0.05 ? 'bg-[#1A73E8] text-white' : 'bg-white border border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                   >
                     5% (Long Term)
                   </button>
                   <button 
                     onClick={() => update({ cgtRate: 0.075 })}
                     className={`flex-1 h-9 rounded-md text-xs font-bold transition-colors ${cgtRate === 0.075 ? 'bg-[#1A73E8] text-white' : 'bg-white border border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'}`}
                   >
                     7.5% (Short Term)
                   </button>
                </div>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-start">
          
          <div className="bg-[#E8F0FE] rounded-xl p-6 text-center space-y-2 border border-blue-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                <FileText className="w-16 h-16 text-blue-900" />
             </div>
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider relative z-10 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3"/> MeroShare Target WACC</div>
             <div className="text-4xl font-black text-[#1A73E8] relative z-10">Rs. {result.wacc.toFixed(2)}</div>
             <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-200 relative z-10">
                <div>
                   <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Total Kitta</div>
                   <div className="text-lg font-bold text-slate-800">{formatInt(result.totalQty)}</div>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Total Investment</div>
                   <div className="text-lg font-bold text-slate-800">{formatNPR(result.totalInvestment)}</div>
                </div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-sm space-y-4">
             <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-100">
                <Wallet className="w-4 h-4 text-green-600" />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800">Sell Calculation & Profit</h3>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500">Gross Sell Amount</span>
                   <span className="font-bold text-slate-800">{formatNPR(result.sell.sellPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-500 flex items-center gap-1">Broker Commission <span className="text-[9px] bg-slate-100 px-1 rounded text-slate-400">Tiered</span></span>
                   <span className="font-bold text-rose-500">-{formatNPR(result.sell.sellBroker)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-500">SEBON Fee + DP</span>
                   <span className="font-bold text-rose-500">-{formatNPR(result.sell.sellSebon + result.sell.sellDp)}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm">
                   <span className="font-bold text-slate-600">Net Sell Amount</span>
                   <span className="font-bold text-slate-800">{formatNPR(result.sell.netSellAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500">WACC Cost Basis</span>
                   <span className="font-bold text-slate-800">{formatNPR(result.sell.costBasis)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-slate-600">Gross Profit / Loss</span>
                   <span className={`font-black ${result.sell.sellProfit >= 0 ? 'text-[#188038]' : 'text-[#D93025]'}`}>
                      {formatNPR(result.sell.sellProfit)}
                   </span>
                </div>

                {result.sell.sellProfit > 0 && (
                   <div className="flex justify-between items-center text-xs bg-rose-50 p-2 rounded">
                      <span className="text-rose-700 font-bold flex items-center gap-1">CGT ({cgtRate * 100}%)</span>
                      <span className="font-bold text-rose-700">-{formatNPR(result.sell.cgtAmount)}</span>
                   </div>
                )}

                <div className="pt-3 border-t-2 border-slate-800 flex justify-between items-center">
                   <span className="font-black text-slate-900 uppercase tracking-wide">Net Receivable</span>
                   <span className="text-xl font-black text-[#1A73E8]">
                      {formatNPR(result.sell.netReceivable)}
                   </span>
                </div>
             </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Portfolio Hub",
        subtitle: "NEPSE Auditing",
        links: [
          { label: "Trading Engine", href: "/calculator/nepal-stocks/", icon: TrendingUp },
          { label: "Bonus Tax Tool", href: "/calculator/nepse-bonus-tax/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Meroshare Portal", href: "https://meroshare.cdsc.com.np", icon: Globe },
        ],
      }}
    />
  );
}
