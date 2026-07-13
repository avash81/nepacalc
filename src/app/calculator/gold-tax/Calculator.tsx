'use client';
import { useMemo, useState, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Wallet, Receipt, TrendingUp, Info, ShieldCheck, Gem, ShoppingCart, History, Table } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';

const DEFAULT_STATE = {
  weight: 1,
  unit: 'tola' as 'tola' | 'gram',
  marketRate: 150000,
  makingChargePercent: 10,
  isLive: true
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function GoldTaxCalculator() {
  const { rates, loading } = useLiveRates();
  const [state, setState] = useSyncState('gold_tax_v1', DEFAULT_STATE);
  const { weight, unit, marketRate, makingChargePercent, isLive } = state;

  useEffect(() => {
    if (isLive && rates?.gold?.tolaNPR?.current) {
      update({ marketRate: rates.gold.tolaNPR.current });
    }
  }, [rates, isLive]);

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const basePrice = weight * marketRate;
    const makingCharge = basePrice * (makingChargePercent / 100);
    const subtotal = basePrice + makingCharge;
    const vat = subtotal * 0.13;
    const total = subtotal + vat;

    return {
      basePrice,
      makingCharge,
      subtotal,
      vat,
      total,
      effectiveRate: total / weight
    };
  }, [weight, marketRate, makingChargePercent]);

  return (
    <ModernCalcLayout
      slug="gold-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Market Rates', href: '/market-rates/' }, { label: 'Gold Tax' }]}
      title="Gold Tax Calculator Nepal 2083/84"
      description="Calculate the final billing price of gold jewelry in Nepal. Includes 13% VAT and making charges as per FENEGOSIDA standards."
      icon={Gem}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Weight & Unit</label>
               <div className="flex gap-2">
                  <input type="number" value={weight} onChange={(e) => update({ weight: Number(e.target.value) })} className="flex-1 h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
                  <select value={unit} onChange={(e) => update({ unit: e.target.value as any })} className="w-32 h-12 px-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] outline-none">
                     <option value="tola">Tola</option>
                     <option value="gram">Gram</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Market Rate (per {unit})</label>
                  <button onClick={() => update({ isLive: !isLive })} className={`text-[9px] font-black uppercase px-2 py-1 rounded ${isLive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                     {isLive ? 'Live Feed Active' : 'Manual Entry'}
                  </button>
               </div>
               <input type="number" value={marketRate} disabled={isLive} onChange={(e) => update({ marketRate: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all disabled:bg-[#F1F3F4]" />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Making Charges (%)</label>
               <input type="range" min="1" max="25" step="0.5" value={makingChargePercent} onChange={(e) => update({ makingChargePercent: Number(e.target.value) })} className="w-full h-2 bg-[#E8F0FE] rounded-lg appearance-none cursor-pointer accent-[#1A73E8]" />
               <div className="flex justify-between text-[10px] font-bold text-[#5F6368] mt-1">
                  <span>1% (Simple)</span>
                  <span className="text-[#1A73E8]">{makingChargePercent}% Selected</span>
                  <span>25% (Intricate)</span>
               </div>
            </div>

            <div className="p-4 bg-[#FFF9E6] border border-[#F29900] rounded-md flex gap-3">
               <Receipt className="w-5 h-5 text-[#F29900] shrink-0" />
               <p className="text-[10px] text-[#202124] font-bold leading-relaxed uppercase">
                  Statutory Rule: 13% VAT is applied on the <span className="text-[#F29900]">Subtotal</span> (Base Price + Making Charges) as per Nepal IRD guidelines.
               </p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#1A1A2E] rounded-lg p-10 text-center space-y-2 shadow-lg">
             <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Total Billing Amount</div>
             <div className="text-5xl font-black text-white tracking-tight">{formatNPR(result.total)}</div>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inclusive of 13% VAT</div>
          </div>

          <div className="space-y-3">
             {[
               { l: 'Gold Base Price', v: result.basePrice, c: 'text-[#202124]' },
               { l: `Making Charges (${makingChargePercent}%)`, v: result.makingCharge, c: 'text-[#5F6368]' },
               { l: 'Subtotal', v: result.subtotal, c: 'text-[#202124] font-black' },
               { l: 'VAT (13%)', v: result.vat, c: 'text-[#D93025]' }
             ].map((row, i) => (
               <div key={i} className="flex justify-between items-center p-3 border-b border-[#F1F3F4]">
                  <span className="text-[10px] font-bold text-[#5F6368] uppercase">{row.l}</span>
                  <span className={`text-sm font-bold ${row.c}`}>{formatNPR(row.v)}</span>
               </div>
             ))}
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] text-center">
             <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1 text-center">Effective Rate per {unit}</div>
             <div className="text-lg font-black text-[#202124]">{formatNPR(result.effectiveRate)}</div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#F29900] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Tax Components</h3>
                </div>
                <div className="space-y-6">
                   <div>
                      <h4 className="text-xs font-black text-[#202124] mb-2 uppercase">13% Value Added Tax (VAT)</h4>
                      <p className="text-sm text-[#5F6368] leading-relaxed">
                         In Nepal, luxury goods including Gold and Silver jewelry attract a flat 13% VAT. This is calculated after adding making charges to the base gold rate.
                      </p>
                   </div>
                   <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                      <h4 className="text-[10px] font-black text-[#202124] uppercase mb-1">Making Charges</h4>
                      <p className="text-[11px] text-[#5F6368]">Typically ranges from 8% to 15% in Nepal depending on the jewelry design complexity.</p>
                   </div>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#F29900] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Billing Transparency</h3>
                </div>
                <div className="space-y-4">
                   <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                      Always ask for a formal VAT bill when purchasing gold in Nepal. It ensures the purity of the gold and provides legal protection for resale. Before buying, you can also use our <a href="/calculator/gold-converter/" className="text-[#1A73E8] hover:underline font-bold">Gold Unit Converter</a> to verify the jeweler's weight calculations, and check our <a href="/blog/nepal-gold-price-analysis-2083/" className="text-[#1A73E8] hover:underline font-bold">Nepal Gold Price Analysis 2083</a> to understand current market trends.
                   </p>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-md bg-[#E6F4EA] border border-[#188038] flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#188038] uppercase tracking-wider">Hallmark Certified</span>
                         <ShieldCheck className="w-5 h-5 text-[#188038]" />
                      </div>
                      <div className="p-4 rounded-md bg-[#E8F0FE] border border-[#1A73E8] flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#1A73E8] uppercase tracking-wider">FENEGOSIDA Rates</span>
                         <TrendingUp className="w-5 h-5 text-[#1A73E8]" />
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the weight of the gold in Tola or Grams.",
          "The tool fetches the live market rate from FENEGOSIDA automatically.",
          "Adjust the Making Charge percentage based on the jewelry's design.",
          "The tool calculates VAT (13%) on the subtotal.",
          "Review the final billing amount and the effective rate per unit."
        ]
      }}
      formula={{
        title: "Jewelry Billing Formula",
        description: "Official calculation method used by jewelers in Nepal.",
        raw: "Total = (Base Price + Making Charges) × 1.13",
        variables: [
          "Base Price = Weight × Market Rate",
          "Making Charges = Base Price × Percentage",
          "1.13 = Inclusive of 13% VAT"
        ]
      }}
      faqs={[
        { question: "Is making charge taxable in Nepal?", answer: "Yes, 13% VAT is applied on the total sum of the gold price and the making charges." },
        { question: "What is the standard making charge in Nepal?", answer: "It usually starts from 8% for simple items like rings and can go up to 18-20% for complex bridal jewelry." },
        { question: "How much gold can I bring from abroad to Nepal?", answer: "NRIs can bring up to 50 grams of gold jewelry duty-free. For amounts above this, heavy import duties apply at the airport." }
      ]}
      sidebar={{
        title: "Market Hub",
        links: [
          { label: "Live Gold Rate", href: "/market-rates/live-gold-price/", icon: Gem },
          { label: "Live Silver Rate", href: "/market-rates/live-silver-price/", icon: TrendingUp },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
        ],
      }}
      relatedTools={[
        { label: "Gold Price Nepal", href: "/market-rates/live-gold-price/" },
        { label: "Silver Price Nepal", href: "/market-rates/live-silver-price/" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" }
      ]}
    />
  );
}
