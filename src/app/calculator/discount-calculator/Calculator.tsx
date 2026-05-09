'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Tag, ShoppingBag, Percent, Info, Zap } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function DiscountCalculator() {
  const [state, setState] = useSyncState('discount_v4', { price: 1000, discount: 20 });
  const { price, discount } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const savings = (price * discount) / 100;
    const final = price - savings;
    return { savings, final };
  }, [price, discount]);

  const isHotDeal = discount >= 50;
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="discount-calculator"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Retail Tools', href: '/retail/' }, { label: 'Discount Calculator' }]}
      title="Discount Calculator"
      description="Determine final purchase prices and total savings across retail and wholesale cycles in Nepal."
      icon={Tag}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Tag className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Original MRP (NPR)</label>
                   <input 
                      type="number" 
                      value={price} 
                      onChange={(e) => update({ price: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Discount (%)</label>
                      <span className="text-[10px] font-black text-[#1a0dab]">{discount}% OFF</span>
                   </div>
                   <input 
                      type="range" 
                      min={0} 
                      max={100} 
                      value={discount} 
                      onChange={(e) => update({ discount: Number(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                   />
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Zap className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quick Presets</h3>
             </div>
             <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 75].map(v => (
                  <button 
                    key={v} 
                    onClick={() => update({ discount: v })}
                    className={`py-3 text-[10px] font-black uppercase rounded-lg transition-all ${discount === v ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400 bg-slate-50 border border-slate-100 hover:bg-white'}`}
                  >
                    {v}%
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><ShoppingBag className="w-24 h-24 text-emerald-600" /></div>
             <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Final Purchase Price</div>
             <div className="text-5xl font-black tracking-tighter text-slate-900 font-mono uppercase">Rs. {fmt(r.final)}</div>
             <div className="px-5 py-2 bg-emerald-50 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-emerald-600">
                You Save Rs. {fmt(r.savings)}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Original MRP</div>
                <div className="text-xl font-black text-slate-900">Rs. {fmt(price)}</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-blue-600 uppercase">Deal Rating</div>
                <div className="text-xl font-black text-blue-600">{isHotDeal ? '🔥 HOT' : '✓ GOOD'}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Percent className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-4 bg-emerald-400 rounded-full" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Consumer Logic</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-bold tracking-tighter">
                   {isHotDeal ? 'Premium clearance-level discount detected. This represents peak value for Nepalese retail cycles.' : 'Standard retail discount applied. Ideal for bulk budgeting and monthly household planning.'}
                </p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Percent className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Savings Audit</h3>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Original Cost</span>
                    <span className="text-xl font-black text-slate-900">Rs. {fmt(price)}</span>
                 </div>
                 <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a73e8] rounded-full" style={{ width: `${100 - discount}%` }} />
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-emerald-600 uppercase">Net Savings</span>
                    <span className="text-xl font-black text-emerald-600">Rs. {fmt(r.savings)}</span>
                 </div>
                 <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${discount}%` }} />
                 </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShoppingBag className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight text-emerald-400 uppercase tracking-widest">Market Psychology</h3>
               <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-tighter mb-8">
                  In Nepal, the "Discount" label is often a precursor to Dashain, Tihar, and New Year sales. Understanding the net impact on your wallet is the first step toward institutional-grade household budgeting.
               </p>
               <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
                  <div className="text-[9px] font-black text-emerald-400 uppercase mb-2 tracking-widest">Value Retention</div>
                  <div className="text-3xl font-black text-[#202124]">{100 - discount}%</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">Cost of Acquisition</div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Tag className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Percent className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Discount Encyclopedia: Consumer Optimization</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                A <strong>Discount</strong> is a reduction in the basic price of a good or service. While it appears simple, the mathematics of discounting involves understanding <strong>percentage points</strong>, <strong>effective price floors</strong>, and the impact of mandatory taxes like <strong>VAT</strong> in Nepal.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">The "Net-VAT" Nuance</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      In the Nepalese retail landscape, discounts are typically applied to the <strong>Maximum Retail Price (MRP)</strong> before the 13% VAT is calculated (if not already included). This distinction is critical for large-ticket items like electronics and automobiles where the tax component is substantial.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Types of Discounts in Nepal</h3>
              <p>
                From <strong>Cash Discounts</strong> (deductions for immediate payment) to <strong>Trade Discounts</strong> (given by wholesalers to retailers), the goal is always to incentivize a transaction. In local supermarkets like Bhat-Bhateni or Big Mart, "Buy 1 Get 1" (BOGO) is mathematically equivalent to a <strong>50% discount</strong> on each item.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">The "Flat" Trap</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      "Flat 50% Off" is often more transparent than "Up to 70% Off." The latter usually implies that only select, low-value items carry the maximum discount, while popular items remain closer to the MRP.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Effective Savings</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Always calculate the <strong>per-unit cost</strong>. A 10% discount on a bulk pack might offer lower effective savings than a 25% discount on individual units during a clearance cycle.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Psychology of Pricing</h3>
              <p>
                Retailers use <strong>Charity Pricing</strong> (ending in .99 or .95) to make prices seem significantly lower. A discount that brings a price from Rs. 1005 to Rs. 995 feels larger than it is because of the "left-digit effect." This tool helps you bypass that psychological trigger by showing the raw, unvarnished savings amount.
              </p>
            </div>
          </section>
        </div>
      }
      howToUse={{ steps: ["Enter the original MRP of the product.", "Enter the discount percentage offered.", "Use Quick Presets for common sale percentages.", "View the final discounted price and your total savings."] }}
      formula={{ title: "Discount Formula", description: "Simple percentage reduction applied to the original price.", raw: "Savings = Price × (Discount% / 100)\nFinal Price = Price − Savings" }}
      faqs={[
        { question: "How do I calculate 20% off a price?", answer: "Multiply the price by 0.20 to find the discount amount, then subtract from original. Example: Rs.1000 × 0.20 = Rs.200 discount → Rs.800 final price. This tool does that instantly for any price and percentage combination." },
        { question: "What is a good discount percentage?", answer: "1–10% is a small discount (common in loyalty programs). 10–30% is a standard retail sale. 30–50% is a strong promotional discount. Above 50% is clearance or festival pricing (like Dashain/Tihar sales). Genuine discounts above 70% on non-clearance items are rare and may indicate inflated original prices." },
        { question: "What is the difference between discount and VAT in Nepal?", answer: "A discount reduces the price before VAT is applied. In Nepal, VAT is 13%. So if an item costs Rs.1000 with 20% discount: discounted price = Rs.800, then VAT = Rs.104, final = Rs.904. The discount should be applied first, then VAT calculated on the discounted price." },
        { question: "How do I calculate the original price from a discounted price?", answer: "Use the reverse formula: Original Price = Final Price / (1 − Discount%). Example: If you paid Rs.800 after a 20% discount, the original price was Rs.800 / 0.80 = Rs.1000. This is useful when only the sale price is labeled." },
        { question: "What is a 'flat discount' vs a 'percentage discount'?", answer: "A flat discount is a fixed amount off the price (e.g., Rs.200 off). A percentage discount scales with the price (e.g., 20% off). This calculator works with percentage discounts. For flat discounts, simply subtract the discount amount from the original price directly." },
        { question: "How do stacked discounts work (discount on a discount)?", answer: "Stacked discounts are not additive. A 20% discount followed by another 10% discount does not equal 30% off. Instead: Price after first discount = Price × 0.80, then apply second: × 0.90. Total = Price × 0.72, so actual effective discount is 28%, not 30%. Run this calculator twice for stacked scenarios." }
      ]}
      sidebar={{ title: "Shopping Tools", links: [{ label: "VAT Calculator", href: "/calculator/nepal-vat/" }, { label: "Percentage Tool", href: "/calculator/percentage/" }, { label: "Tip Calculator", href: "/calculator/tip-calculator/" }, { label: "Currency Converter", href: "/calculator/currency-converter/" }], banner: { title: "Smart Shopping", description: "Always calculate your actual savings before making bulk purchase decisions.", image: "/images/shop-banner.jpg" } }}
      relatedTools={[{ label: "VAT Calculator", href: "/calculator/nepal-vat/" }, { label: "Percentage", href: "/calculator/percentage/" }, { label: "Tip Calculator", href: "/calculator/tip-calculator/" }]}
    />
  );
}
