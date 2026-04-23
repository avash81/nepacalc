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
            <p className="text-[10px] text-[#202124] leading-tight">In Nepal, tipping is optional but appreciated — 10% is standard at restaurants in Kathmandu.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the total restaurant bill amount.", "Select a tip percentage using the preset buttons or the slider.", "Choose the number of people splitting the bill.", "View the per-person amount including tip."] }}
      formula={{ title: "Tip & Split Formula", description: "Simple percentage-based tip with equal division.", raw: "Total Tip = Bill × (Tip% / 100)\nTotal = Bill + Total Tip\nPer Person = Total / Number of People" }}
      faqs={[
        { question: "Is tipping customary in Nepal?", answer: "Tipping is not mandatory in Nepal, but it is appreciated, especially in tourist areas. 10% is a standard tip at mid-range to high-end restaurants in Kathmandu and Pokhara." },
        { question: "Does VAT affect the tip calculation?", answer: "If your bill already includes 13% VAT, the tip shown is calculated on the full amount including VAT. Some diners prefer to tip only on the pre-VAT subtotal." }
      ]}
      sidebar={{ title: "Daily Tools", links: [{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Discount Calc", href: "/calculator/discount-calculator" }, { label: "Currency Converter", href: "/calculator/currency-converter" }, { label: "Percentage Tool", href: "/calculator/percentage" }], banner: { title: "Dining Smart", description: "Always check if service charge is already included before adding a tip at restaurants.", image: "/images/dining-banner.jpg" } }}
      relatedTools={[{ label: "VAT Calculator", href: "/calculator/nepal-vat" }, { label: "Discount Calc", href: "/calculator/discount-calculator" }, { label: "Percentage", href: "/calculator/percentage" }]}
    />
  );
}
