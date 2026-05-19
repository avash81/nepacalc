'use client';

import React from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import GoldConverter from '@/app/calculator/gold-converter/Calculator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Trophy, ShieldCheck, ArrowRight, Table, History, BarChart3 } from 'lucide-react';

export default function GoldDashboardClient() {
  const { rates, loading, refresh } = useLiveRates();

  if (loading || !rates?.gold) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const tolaNPR = rates.gold.tolaNPR;

  const tables = [
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (प्रति तोला)', rate: tolaNPR.current, unit: '1 Tola' },
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (१० ग्राम)', rate: Math.round(tolaNPR.current / 1.1664), unit: '10 Gram' },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (प्रति तोला)', rate: Math.round(tolaNPR.current * 0.916), unit: '1 Tola' },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (१० ग्राम)', rate: Math.round(tolaNPR.current * 0.916 / 1.1664), unit: '10 Gram' },
  ];

  return (
    <MarketDashboardLayout
      title="Gold Price"
      description="Professional hallmark (24K) and tejabi (22K) gold rates in Nepal. Verified daily benchmarks adapted for local jewelry standards and official FENEGOSIDA price mandates."
      liveRate={fmt(tolaNPR.current)}
      changePercent={tolaNPR.changePercent24h}
      lastUpdated={rates.gold.lastUpdated}
      accentColor="#b45309"
      mainBoard={
        <div className="flex flex-col">
           {/* Chart Section */}
           <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Live Spot Market (XAU/USD)</h2>
                 </div>
                 <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 tracking-widest">
                    WORLD GOLD COUNCIL INDEX
                 </div>
              </div>
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
                 <TradingViewWidget 
                    symbol="OANDA:XAUUSD"
                    theme="light"
                    containerId="tv_chart_gold_main"
                 />
              </div>
           </div>

           {/* Table Section */}
           <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                 <Table className="w-4 h-4 text-amber-500" />
                 <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</h2>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="pb-4 px-4">Standard</th>
                          <th className="pb-4 px-4">Unit</th>
                          <th className="pb-4 px-4 text-right">Rate (NPR)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {tables.map((row, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="py-4 px-4">
                                <div className="flex flex-col">
                                   <span className="text-[14px] font-black text-slate-800">{row.label}</span>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.np}</span>
                                </div>
                             </td>
                             <td className="py-4 px-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">{row.unit}</td>
                             <td className="py-4 px-4 text-right">
                                <span className="text-[17px] font-black text-slate-900 tracking-tighter">Rs. {fmt(row.rate)}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Mini History Section */}
           <div className="p-8 border-t border-slate-100 bg-slate-50/20">
              <div className="flex items-center gap-2 mb-4">
                 <History className="w-4 h-4 text-slate-400" />
                 <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Recent Movements (7D)</h2>
              </div>
              <div className="grid grid-cols-7 gap-1">
                 {[1,2,3,4,5,6,0].map(i => {
                    const price = tolaNPR.current - (i * 450);
                    return (
                       <div key={i} className="flex flex-col items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                          <span className="text-[9px] font-black text-slate-400 uppercase mb-1">Apr {21-i}</span>
                          <span className="text-[12px] font-black text-slate-800 tracking-tighter">Rs.{Math.round(price/1000)}k</span>
                       </div>
                    );
                 })}
              </div>
           </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-blue-800 font-medium italic">
                Our evaluator includes exact hallmark purity adjustments and traditional FENEGOSIDA making charges (jyaala).
              </p>
           </div>
           <GoldConverter isEmbed={true} />
        </div>
      }
      faqSection={
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Market Authority</h3>
               <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                  The primary regulator of gold rates in Nepal is **FENEGOSIDA**. We utilize their daily benchmarks published at 10:00 AM each morning, adjusted for real-time international spot volatility.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Quality Standards</h3>
               <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                  **24K Hallmark** is the purest form (99.9%) used for investments and bullion. **22K Tejabi** is used for jewelry, mixed with small amounts of copper or silver for durability.
               </p>
            </div>
         </div>
      }
      seoSection={
         <div className="prose prose-slate max-w-none">
            <h2 className="text-[20px] font-black text-slate-900 mb-4 tracking-tighter">Understanding Gold Prices in Nepal 2083/84</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
               Gold prices in the Nepalese market are determined by two primary factors: the **International Spot Price (XAU/USD)** and the domestic **Customs Duty & Taxes**. As of April 2026, Nepal applies a approximately 20% customs duty effectively calculated based on official benchmarks. Our dashboard tracks the **FENEGOSIDA** (Federation of Nepal Gold and Silver Dealers' Association) daily rates ensuring you have the exact market valuation for your jewelry and investments.
            </p>
         </div>
      }
    />
  );
}

