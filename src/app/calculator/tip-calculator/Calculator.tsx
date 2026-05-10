'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Users, UtensilsCrossed, Info, Percent, ShoppingBag } from 'lucide-react';
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
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><UtensilsCrossed className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Total Bill (NPR)</label>
                   <input 
                      type="number" 
                      value={bill} 
                      onChange={(e) => update({ bill: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Tip Percentage</label>
                      <span className="text-[10px] font-black text-[#1a0dab]">{tipPercent}%</span>
                   </div>
                   <input 
                      type="range" 
                      min={0} 
                      max={30} 
                      value={tipPercent} 
                      onChange={(e) => update({ tipPercent: Number(e.target.value) })}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Number of People</label>
                   <div className="flex gap-4 items-center">
                      <button onClick={() => update({ people: Math.max(1, people - 1) })} className="w-12 h-12 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-xl font-black">-</button>
                      <div className="flex-1 h-12 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex items-center justify-center text-xl font-black">{people}</div>
                      <button onClick={() => update({ people: people + 1 })} className="w-12 h-12 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-xl font-black">+</button>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-lg bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Percent className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Standards</h3>
             </div>
             <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map(v => (
                  <button 
                    key={v} 
                    onClick={() => update({ tipPercent: v })}
                    className={`py-3 text-[10px] font-black uppercase rounded-xl transition-all ${tipPercent === v ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400 bg-slate-50 border border-slate-100 hover:bg-white'}`}
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
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Users className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Each Person Pays</div>
             <div className="text-5xl font-black tracking-tighter text-slate-900 font-mono uppercase">{fmt(r.perPerson)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Split {people} {people === 1 ? 'way' : 'ways'}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Total Tip</div>
                <div className="text-xl font-black text-slate-900">{fmt(r.totalTip)}</div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-blue-600 uppercase">Total Bill</div>
                <div className="text-xl font-black text-blue-600">{fmt(r.totalBill)}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><ShoppingBag className="w-24 h-24 text-emerald-500" /></div>
             <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-4 bg-emerald-400 rounded-full" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Hospitality Note</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-bold tracking-tighter">
                   {tipPercent >= 10 ? 'Standard institutional tipping applied. This aligns with Kathmandu hospitality norms.' : 'Minimal tip selected. Tipping remains optional but appreciated in tourist hubs.'}
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
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Bill Composition</h3>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Original Amount</span>
                    <span className="text-xl font-black text-slate-900">{fmt(bill)}</span>
                 </div>
                 <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a73e8] rounded-full" style={{ width: `${(bill / r.totalBill) * 100}%` }} />
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-emerald-600 uppercase">Total Tip</span>
                    <span className="text-xl font-black text-emerald-600">{fmt(r.totalTip)}</span>
                 </div>
                 <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(r.totalTip / r.totalBill) * 100}%` }} />
                 </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><Users className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight text-emerald-400 uppercase tracking-widest">Individual Burden</h3>
               <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-tighter mb-8">
                  Splitting the bill evenly ensures social transparency. In Nepal, "going Dutch" is common among urban professionals and students.
               </p>
               <div className="p-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
                  <div className="text-[9px] font-black text-emerald-400 uppercase mb-2 tracking-widest">Each Person Owed</div>
                  <div className="text-3xl font-black text-[#202124]">{fmt(r.perPerson)}</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">Inclusive of {tipPercent}% Tip</div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <UtensilsCrossed className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Percent className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Tip Encyclopedia: Dining Etiquette in Nepal</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Tipping in <strong>Nepal</strong> is a nuanced practice that has evolved with the growth of tourism and the urban restaurant scene. Unlike North America, it is not mandatory but acts as a gesture of appreciation for quality service.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">The "Service Charge" Context</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Many upscale restaurants in Kathmandu already include a <strong>10% Service Charge</strong> and <strong>13% VAT</strong>. If these are already on your bill, an additional tip is purely voluntary and typically smaller (around 5%).
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Tipping Guidelines by Scenario</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Casual Dining & Cafes</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Rounding up to the nearest Rs. 50 or Rs. 100 is standard. For a Rs. 1,420 bill, leaving Rs. 1,500 is considered a polite gesture.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Trekking & Guides</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      For trekking staff, tips are a significant part of their seasonal income. It is customary to provide a group tip at the end of the journey, typically 10-15% of the total guide/porter fees.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. The Math of Splitting</h3>
              <p>
                Our tool uses <strong>equal division logic</strong>. For complex bills where items differ significantly in price, we recommend calculating the total tip percentage first, then applying that percentage to each individual's subtotal.
              </p>
            </div>
          </section>
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
      sidebar={{ title: "Daily Tools", links: [{ label: "VAT Calculator", href: "/calculator/nepal-vat/" }, { label: "Discount Calc", href: "/calculator/discount-calculator/" }, { label: "Currency Converter", href: "/calculator/currency-converter/" }, { label: "Percentage Tool", href: "/calculator/percentage/" }], banner: { title: "Dining Smart", description: "Always check if service charge is already included before adding a tip at restaurants.", image: "/images/dining-banner.jpg" } }}
      relatedTools={[{ label: "VAT Calculator", href: "/calculator/nepal-vat/" }, { label: "Discount Calc", href: "/calculator/discount-calculator/" }, { label: "Percentage", href: "/calculator/percentage/" }]}
    />
  );
}

