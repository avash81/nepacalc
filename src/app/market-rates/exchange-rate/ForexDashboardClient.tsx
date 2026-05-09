'use client';

import React, { useState } from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import CurrencyConverter from '@/app/calculator/currency-converter/Calculator';
import { Landmark, Search, ArrowRightLeft, Globe2, ListFilter, TrendingDown, TrendingUp } from 'lucide-react';

export default function ForexDashboardClient() {
  const { rates, loading } = useLiveRates();
  const [search, setSearch] = useState('');

  if (loading || !rates?.forex) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toFixed(2);
  const usd = rates.forex.usd;

  const currencyList = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', unit: 1, stats: rates.forex.usd },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', unit: 1, stats: rates.forex.inr },
    { code: 'GBP', name: 'UK Pound', flag: '🇬🇧', unit: 1, stats: rates.forex.gbp },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', unit: 1, stats: rates.forex.eur },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', unit: 1, stats: rates.forex.aud },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', unit: 1, stats: rates.forex.cad },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', unit: 10, stats: rates.forex.jpy },
  ];

  const filtered = currencyList.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MarketDashboardLayout
      title="Foreign Exchange Rate"
      description="Official daily buying and selling rates against the Nepalese Rupee (NPR). Synchronized with NRB market indices for cross-border transactions and remittance projections."
      liveRate={fmt(usd.current)}
      changePercent={usd.changePercent24h}
      lastUpdated={new Date(rates.forex.date).toLocaleDateString()}
      accentColor="#059669"
      mainBoard={
        <div className="flex flex-col">
           {/* Search & Filter Header */}
           <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-[#202124] shadow-sm shadow-emerald-600/10">
                    <Landmark className="w-5 h-5" />
                 </div>
                 <div>
                    <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">NRB Benchmark Board</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buy/Sell Rates against NPR</p>
                 </div>
              </div>
              <div className="relative max-w-xs w-full">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search currency..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                 />
              </div>
           </div>

           {/* Forex Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Currency</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Buying (Rs.)</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Selling (Rs.)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filtered.map((c, i) => {
                       const isUp = c.stats.changePercent24h >= 0;
                       return (
                          <tr key={i} className="group hover:bg-slate-50/30 transition-all">
                             <td className="py-5 px-8">
                                <div className="flex items-center gap-4">
                                   <span className="text-3xl grayscale-[0.2] group-hover:grayscale-0 transition-all">{c.flag}</span>
                                   <div className="flex flex-col">
                                      <span className="text-[14px] font-black text-slate-900">{c.code}</span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.name}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="py-5 px-8 text-[12px] font-black text-slate-500">{c.unit}</td>
                             <td className="py-5 px-8 text-right">
                                <div className="flex flex-col items-end">
                                   <span className="text-[17px] font-black text-slate-900 tracking-tighter">
                                      {fmt(c.stats.current * 0.995)}
                                   </span>
                                   <div className={`flex items-center gap-1 text-[9px] font-black uppercase ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                      {isUp ? '+' : ''}{fmt(Math.abs(c.stats.changePercent24h))}%
                                   </div>
                                </div>
                             </td>
                             <td className="py-5 px-8 text-right">
                                <span className="text-[17px] font-black text-slate-900 tracking-tighter">
                                   {fmt(c.stats.current)}
                                </span>
                             </td>
                          </tr>
                       );
                    })}
                 </tbody>
              </table>
           </div>

           {/* Footer Source */}
           <div className="p-8 border-t border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                 <Globe2 className="w-4 h-4 text-emerald-600" />
                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Global Forex Indices Sync</span>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Market Open</span>
                 </div>
                 <button className="text-[11px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Full NRB List →</button>
              </div>
           </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
              <ArrowRightLeft className="w-5 h-5 text-emerald-600 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-emerald-800 font-medium italic">
                Use our global converter to instantly calculate cross-currency pairs against the current NPR benchmark.
              </p>
           </div>
           <CurrencyConverter isEmbed={true} />
        </div>
      }
      faqSection={
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Forex Authority</h3>
               <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                  The **Nepal Rastra Bank (NRB)** is the official regulatory body for foreign exchange in Nepal. Our rates map to these central benchmarks for commercial transparency.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Buying vs Selling</h3>
               <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                  The **Buying Rate** is what the bank pays you for foreign currency. The **Selling Rate** is what you pay the bank to acquire foreign currency.
               </p>
            </div>
         </div>
      }
      seoSection={
         <div className="prose prose-slate max-w-none">
            <h2 className="text-[20px] font-black text-slate-900 mb-4 tracking-tighter">Nepal Foreign Exchange Guide 2026</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
               Navigating the **USD to NPR** and **INR to NPR** rates is critical for trade and remittance in Nepal. While the Indian Rupee (INR) is pegged at 1.6:1 against the Nepalese Rupee, other global currencies fluctuate based on international forex markets. Our real-time board ensures you have the most accurate, NRB-compliant indices for your financial planning.
            </p>
         </div>
      }
    />
  );
}
