'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Plus, Trash2, ShieldCheck, BarChart3, Info } from 'lucide-react';

interface PurchaseCluster { id: string; qty: number; price: number; }

export default function WACCCalculator() {
  const [state, setState] = useSyncState('wacc_v1', {
    clusters: [ { id: '1', qty: 100, price: 1500 }, { id: '2', qty: 100, price: 1200 } ] as PurchaseCluster[]
  });
  const { clusters } = state;

  const results = useMemo(() => {
    let totalQty = 0; let totalInvestment = 0;
    clusters.forEach(c => { totalQty += c.qty; totalInvestment += c.qty * c.price; });
    const wacc = totalQty > 0 ? totalInvestment / totalQty : 0;
    return { wacc, totalQty, totalInvestment };
  }, [clusters]);

  const addCluster = () => setState({ ...state, clusters: [...clusters, { id: Math.random().toString(), qty: 0, price: 0 }] });
  const removeCluster = (id: string) => { if (clusters.length > 1) setState({ ...state, clusters: clusters.filter(c => c.id !== id) }); };
  const updateCluster = (id: string, field: 'qty'|'price', val: number) => setState({ ...state, clusters: clusters.map(c => c.id === id ? { ...c, [field]: val } : c) });

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const inputCls = "w-full h-10 px-3 border border-[#DADCE0] rounded bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[10px] font-bold uppercase text-[#70757A] tracking-wider block mb-1";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'WACC Calculator' }]}
      title="NEPSE WACC Calculator"
      description="Calculate the Weighted Average Cost of Capital (WACC) for your stock portfolio. Essential for accurate Meroshare tax declaration in Nepal."
      icon={BarChart3}
      inputs={
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Purchase Clusters</label>
            <button onClick={addCluster} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[10px] font-bold uppercase rounded transition-colors">
              <Plus className="w-3 h-3" /> Add Purchase
            </button>
          </div>

          <div className="space-y-4">
            {clusters.map((c, idx) => (
              <div key={c.id} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg relative group">
                <div className="absolute top-2 right-3 text-[9px] font-bold text-[#70757A] uppercase">Batch #{idx + 1}</div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className={labelCls}>Quantity</label>
                    <input type="number" value={c.qty} min={0} onChange={e => updateCluster(c.id, 'qty', Number(e.target.value))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Rate (NPR)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">Rs.</span>
                       <input type="number" value={c.price} min={0} onChange={e => updateCluster(c.id, 'price', Number(e.target.value))} className={`${inputCls} pl-8`} />
                    </div>
                  </div>
                </div>
                {clusters.length > 1 && (
                  <button onClick={() => removeCluster(c.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-[#FAD2CF] text-[#D93025] rounded-full flex items-center justify-center shadow-sm hover:bg-[#FCE8E6] transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#1A1A2E] text-white rounded-lg flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1">Meroshare Required</div>
              <p className="text-[11px] text-white/70 leading-tight">Updating WACC in 'My Purchase Update' is mandatory before executing a sell order via your broker.</p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg text-center space-y-1">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Average Portfolio Cost (WACC)</div>
             <div className="text-4xl font-black text-[#1A73E8]">Rs. {fmt(results.wacc)}</div>
             <div className="text-[9px] text-[#70757A] font-bold uppercase">Per Share Base Cost</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Inventory Summary</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center">
                   <span className="text-xs text-[#5F6368]">Total Units Held</span>
                   <span className="text-lg font-black text-[#202124]">{results.totalQty}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                   <span className="text-xs text-[#5F6368]">Total Capital Invested</span>
                   <span className="text-lg font-black text-[#188038]">Rs. {fmt(results.totalInvestment)}</span>
                </div>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
             <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-tight">If you received Bonus shares, add a new cluster with the bonus quantity and a rate of Rs. 0. This accurately averages down your portfolio cost.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Portfolio Averaging for CDSC Compliance</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the modern NEPSE trading ecosystem, maintaining an accurate baseline cost for your holdings is a mandatory compliance requirement. Our <strong className="text-[#202124]">wacc calculator nepal</strong> is engineered to perfectly mirror the internal CDSC algorithms used for your <strong className="text-[#202124]">meroshare wacc calculation</strong>. By establishing an exact mathematical baseline, it ensures you are not overpaying Capital Gains Tax (CGT) when executing a sell order.
              </p>
              <p>
                For active traders who accumulate stocks over time through Secondary Market buys, IPOs, or FPOs, computing the <strong className="text-[#202124]">average cost of shares nepal</strong> can become highly complex. This tool simplifies the process by allowing infinite "purchase clusters", dynamically weighting your exact capital outlay against your total held units.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Advanced Stock Averaging Logic</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Zero-Cost Adjustments:</strong> The most critical feature for long-term investors is the ability to <strong className="text-[#202124]">calculate wacc with bonus share</strong> issuance. Since bonus shares carry a functional acquisition cost of NPR 0, adding them to the cluster immediately and mathematically dilutes (lowers) your overall WACC, accurately reflecting your new profit threshold.</li>
              <li><strong className="text-[#188038]">Right Share Inclusions:</strong> Similarly, when subscribing to Right Shares (typically at NPR 100 par value), this engine treats them as a distinct purchase cluster, seamlessly averaging the nominal right share cost against your higher-priced secondary market acquisitions.</li>
              <li><strong className="text-[#D93025]">CGT Ramifications:</strong> As an essential <strong className="text-[#202124]">nepse portfolio tracker</strong> utility, remember that your finalized WACC directly dictates your taxable profit. A lower WACC mathematically yields a higher apparent profit, which increases your absolute CGT liability upon sale.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the Quantity and Purchase Price (Rate) for your first batch of stock acquisitions.",
          "If you bought the same stock again at a different price, click 'Add Purchase' to create a new cluster.",
          "For IPOs, input your allotted quantity with a Rate of exactly Rs. 100.",
          "For Bonus Shares, input the received bonus quantity and set the Rate to Rs. 0.",
          "The system instantly aggregates your total capital invested and divides it by the total units to reveal your exact WACC."
        ]
      }}
      formula={{
        title: "Meroshare WACC Algorithm",
        description: "The mathematical formula CDSC uses to average out your total expenditure over total volume.",
        raw: "WACC = Total Capital Invested / Total Number of Shares Held\n\nWhere:\nTotal Capital Invested = (Qty1 × Price1) + (Qty2 × Price2) + ...\n\n*Note: Bonus shares increase 'Total Number of Shares' but add 0 to 'Total Capital Invested'."
      }}
      faqs={[
        {
          question: "Why is updating my WACC mandatory in Meroshare?",
          answer: "The CDSC system requires a verified baseline cost to accurately calculate your Capital Gains Tax (CGT). If you attempt to sell shares through your broker without updating 'My Purchase Update' in Meroshare, the transaction will fail."
        },
        {
          question: "How do I calculate WACC for Bonus Shares?",
          answer: "Bonus shares are technically free. Add a new purchase cluster in the calculator, input the exact number of bonus shares you received, and set the Rate to 0. This will average down your WACC."
        },
        {
          question: "How do I calculate WACC for Right Shares?",
          answer: "Right shares usually have a fixed par value (almost always Rs. 100 in Nepal). Add a new purchase cluster with your Right Share quantity and set the Rate to 100."
        },
        {
          question: "Does the WACC include broker commission and SEBON fees?",
          answer: "In the CDSC Meroshare system, the exact WACC slightly incorporates the purchase broker commission and DP fees. Our calculator gives you the pure mathematical average, which may differ from the Meroshare final decimal by a fraction of a rupee."
        },
        {
          question: "What happens if I calculate WACC incorrectly?",
          answer: "If you artificially inflate your WACC to show lower profits, you are committing tax fraud. If your WACC is too low, you will end up paying higher Capital Gains Tax (CGT) than you actually owe."
        },
        {
          question: "Do I need to recalculate WACC after selling partial shares?",
          answer: "No. Selling shares does not change the average cost of the shares you still hold. WACC only changes when you ACQUIRE new shares of the same company at a different price point."
        }
      ]}
      sidebar={{ title: "Stock & Market Tools", links: [{ label: "NEPSE Bonus Tax", href: "/calculator/nepse-bonus-tax" }, { label: "Nepal CGT Calculator", href: "/calculator/nepal-tax-calculator" }], banner: { title: "Maximize Profit", description: "Accurate cost baselining ensures you don't overpay capital gains taxes.", image: "/images/nepse-banner.jpg" } }}
      relatedTools={[{ label: "Nepal CGT", href: "/calculator/nepal-tax-calculator" }, { label: "NEPSE Bonus Tax", href: "/calculator/nepse-bonus-tax" }]}
    />
  );
}
