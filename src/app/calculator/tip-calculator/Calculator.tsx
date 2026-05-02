'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Users, UtensilsCrossed, Info } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function TipCalculator() {
  const [state, setState] = useSyncState('tip_v4', { bill: 1500, tipPercent: 10, people: 2 });
  const { bill, tipPercent, people } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const totalTip = (bill * tipPercent) / 100;
    const totalBill = bill + totalTip;
    const perPerson = people > 0 ? totalBill / people : 0;
    const tipPerPerson = people > 0 ? totalTip / people : 0;
    return { totalTip, totalBill, perPerson, tipPerPerson };
  }, [bill, tipPercent, people]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Tip Calculator' }]}
      title="Tip & Bill Split Calculator"
      description="Calculate tip amounts and split bills evenly among any group. Perfect for restaurants, cafes, and group dining in Nepal."
      icon={UtensilsCrossed}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Total Bill Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">NPR</span>
              <input type="number" value={bill} min={0} onChange={e => update({ bill: Number(e.target.value) })} className={`${inputCls} pl-12`} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Tip Percentage</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{tipPercent}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map(v => (
                <button key={v} onClick={() => update({ tipPercent: v })}
                  className={`py-2.5 text-xs font-black border rounded-md transition-all ${tipPercent === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}%
                </button>
              ))}
            </div>
            <input type="range" min={0} max={30} step={1} value={tipPercent}
              onChange={e => update({ tipPercent: Number(e.target.value) })}
              className="w-full accent-[#1A73E8] mt-1" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Number of People</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{people} {people === 1 ? 'person' : 'people'}</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map(v => (
                <button key={v} onClick={() => update({ people: v })}
                  className={`py-2 text-xs font-black border rounded-md transition-all ${people === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}
                </button>
              ))}
            </div>
            <input type="number" value={people} min={1}
              onChange={e => update({ people: Math.max(1, Number(e.target.value)) })} className={inputCls} />
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Split Bill
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-[#1A73E8]" />
              <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Each Person Pays</span>
            </div>
            <div className="text-4xl font-black text-[#1A73E8]">{fmt(r.perPerson)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Split {people} {people === 1 ? 'way' : 'ways'}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Full Breakdown</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Original Bill</span>
                <span className="font-black">{fmt(bill)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Total Tip ({tipPercent}%)</span>
                <span className="font-black text-[#188038]">+ {fmt(r.totalTip)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]">
                <span className="font-bold text-[#202124]">Total Bill + Tip</span>
                <span className="font-black text-[#1A73E8]">{fmt(r.totalBill)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Tip Per Person</span>
                <span className="font-black">{fmt(r.tipPerPerson)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">In Nepal, tipping is optional but appreciated ,  10% is standard at restaurants in Kathmandu.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the total restaurant bill amount.", "Select a tip percentage using the preset buttons or the slider.", "Choose the number of people splitting the bill.", "View the per-person amount including tip."] }}
      formula={{ title: "Tip & Split Formula", description: "Simple percentage-based tip with equal division.", raw: "Total Tip = Bill × (Tip% / 100)\nTotal = Bill + Total Tip\nPer Person = Total / Number of People" }}
      faqs={[
        { question: "Is tipping customary in Nepal?", answer: "Tipping is not mandatory in Nepal but is increasingly appreciated, especially in tourist areas. 10% is considered a standard tip at mid-range to upscale restaurants in Kathmandu, Pokhara, and Chitwan. For local dhabas and budget eateries, rounding up the bill is common. For trekking guides and porters, tipping is a significant part of their income." },
        { question: "Does VAT affect the tip calculation?", answer: "In Nepal, restaurants charge 13% VAT and some also add a 10% service charge. If these are included in your bill, our calculator computes the tip on the full displayed amount. If you want to tip on the pre-tax subtotal only, subtract VAT (÷1.13) from the bill before entering it." },
        { question: "What is the standard tip for restaurant service in Nepal?", answer: "5% is minimal acknowledgment of service. 10% is the standard for satisfactory service. 15% is generous, appropriate for excellent service. 20%+ is exceptional ,  usually reserved for high-end dining with outstanding service. In casual street food settings, tipping is rare but always appreciated." },
        { question: "How do I split a bill unevenly (not equal shares)?", answer: "This calculator handles equal splits only. For unequal splits (e.g., different items ordered), calculate the full tip total using this tool, then manually divide amounts based on each person's share. A useful method: each person pays their item subtotal plus the same tip percentage." },
        { question: "Should I tip on the pre-discount or post-discount price?", answer: "Etiquette generally suggests tipping based on the pre-discount (original) price, since the server's service quality is the same regardless of discounts or coupons used. However, in Nepal where tipping norms are still evolving, tipping on the final price you pay is perfectly acceptable." },
        { question: "What is a service charge and is it the same as a tip?", answer: "A service charge is a mandatory fee added by the restaurant (typically 10% in upscale Kathmandu restaurants). It goes to the restaurant and may or may not be distributed to staff. A tip is a voluntary, direct payment to service staff. Always check your bill ,  if a 10% service charge is already included, a small additional tip (5%) is sufficient, not another 10%." }
      ]}
      sidebar={{ title: "Daily Tools", links: [{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Discount Calc", href: "/calculator/discount-calculator" }, { label: "Currency Converter", href: "/calculator/currency-converter" }, { label: "Percentage Tool", href: "/calculator/percentage" }], banner: { title: "Dining Smart", description: "Always check if service charge is already included before adding a tip at restaurants.", image: "/images/dining-banner.jpg" } }}
      relatedTools={[{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Discount Calc", href: "/calculator/discount-calculator" }, { label: "Percentage", href: "/calculator/percentage" }]}
    />
  );
}
