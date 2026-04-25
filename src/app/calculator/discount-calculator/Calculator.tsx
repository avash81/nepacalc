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
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Discount Calculator' }]}
      title="Discount & Sale Calculator"
      description="Calculate the final sale price after any percentage discount. See exact savings, deal ratings, and compare multiple offers instantly."
      icon={Tag}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Original Price / MRP</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A] font-bold">Rs.</span>
              <input type="number" value={price} onChange={e => update({ price: Number(e.target.value) })} className={`${inputCls} pl-10`} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Discount Percentage</label>
            <div className="relative">
              <input type="number" value={discount} min={0} max={100} onChange={e => update({ discount: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Quick Presets</label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 25, 50].map(v => (
                <button key={v} onClick={() => update({ discount: v })}
                  className={`py-2.5 text-xs font-black border rounded-md transition-all ${discount === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
            <div className="flex justify-between text-[11px] font-bold uppercase text-[#70757A]">
              <span>Discount Applied</span><span>{discount}%</span>
            </div>
            <div className="h-3 bg-white rounded-full w-full overflow-hidden border border-[#DADCE0]">
              <div className="h-full bg-[#1A73E8] rounded-full transition-all duration-500" style={{ width: `${Math.min(discount, 100)}%` }} />
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Savings
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Final Price (You Pay)</div>
            <div className="text-4xl font-black text-[#188038]">Rs. {fmt(r.final)}</div>
            <div className="text-[11px] font-black text-[#D93025] uppercase tracking-tight">You save Rs. {fmt(r.savings)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Original Price</div>
              <div className="text-sm font-black text-[#202124]">Rs. {fmt(price)}</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Amount Saved</div>
              <div className="text-sm font-black text-[#D93025]">Rs. {fmt(r.savings)}</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#DADCE0] rounded-lg flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase text-[#70757A]">Deal Rating</span>
            <span className={`text-sm font-black ${isHotDeal ? 'text-[#D93025]' : 'text-[#1A73E8]'}`}>
              {isHotDeal ? '🔥 HOT DEAL' : '✓ GOOD SAVE'}
            </span>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <ShoppingBag className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">
              {isHotDeal ? 'Premium clearance-level discount. Excellent value!' : 'Standard retail discount. Good for budget planning.'}
            </p>
          </div>
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
      sidebar={{ title: "Shopping Tools", links: [{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Percentage Tool", href: "/calculator/percentage" }, { label: "Tip Calculator", href: "/calculator/tip-calculator" }, { label: "Currency Converter", href: "/calculator/currency-converter" }], banner: { title: "Smart Shopping", description: "Always calculate your actual savings before making bulk purchase decisions.", image: "/images/shop-banner.jpg" } }}
      relatedTools={[{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Percentage", href: "/calculator/percentage" }, { label: "Tip Calculator", href: "/calculator/tip-calculator" }]}
    />
  );
}
