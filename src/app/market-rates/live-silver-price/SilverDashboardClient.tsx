'use client';

import React from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import GoldConverter from '@/app/calculator/gold-converter/Calculator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins, Table, History, TrendingUp, ShieldCheck, BarChart3, Landmark, Activity, Info } from 'lucide-react';

export default function SilverDashboardClient() {
  const { rates, loading } = useLiveRates();

  if (loading || !rates?.silver) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const silver = rates.silver.tolaNPR;

  const tables = [
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (प्रति तोला)', rate: silver.current, unit: '1 Tola' },
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (१० ग्राम)', rate: Math.round(silver.current / 1.1664), unit: '10 Gram' },
  ];

  return (
    <MarketDashboardLayout
      title="Silver Price"
      description="Daily verified silver (Chandi) rates in Nepal. High-precision benchmarks based on international industrial spot markets and official FENEGOSIDA price mandates."
      liveRate={fmt(silver.current)}
      changePercent={silver.changePercent24h}
      lastUpdated={new Date().toLocaleDateString()}
      accentColor="#64748b"
      mainBoard={
        <div className="flex flex-col">
           {/* Chart Section */}
           <div className="p-8 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-slate-500" />
                    <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Silver Spot Market (XAG/USD)</h2>
                 </div>
              </div>
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
                 <TradingViewWidget 
                    symbol="OANDA:XAGUSD"
                    theme="light"
                    containerId="tv_chart_silver_main"
                 />
              </div>
           </div>

           {/* Table Section */}
           <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                 <Table className="w-4 h-4 text-slate-500" />
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
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-600 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
                Professional silver valuation including fine metals conversion and standard making charges.
              </p>
           </div>
           <GoldConverter initialAssetId="silver_tola" isEmbed={true} />
        </div>
      }
      seoSection={
         <div className="prose prose-slate max-w-none">
            <h2 className="text-[20px] font-black text-slate-900 mb-4 tracking-tighter">Nepal Silver Price Guide Today</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
               Silver prices in Nepal (locally known as **Chandi**) are heavily influenced by global industrial demand and the performance of the **USD/NPR** exchange pair. Unlike gold, silver is often traded in larger volumes for jewelry and traditional artifacts. Our live board provides the latest FENEGOSIDA benchmarks per tola and per 10 grams for the 2082/83 fiscal year.
            </p>
         </div>
      }
    />
  );
}

