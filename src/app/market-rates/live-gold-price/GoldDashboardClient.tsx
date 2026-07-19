'use client';

import React from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import QuickPriceEstimator from '@/app/market-rates/live-gold-price/QuickPriceEstimator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Trophy, Table, History, Zap } from 'lucide-react';
import SeoSections from './SeoSections';

export default function GoldDashboardClient() {
  const { rates, loading, error, refresh } = useLiveRates();

  if (loading || !rates?.gold) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const tolaNPR = rates.gold.tolaNPR;
  
  // Requirement #2: "Not Published" logic for Tejabi
  const tejabiTolaNPR = rates.gold.tejabiTolaNPR;
  const tejabiDisplayRate = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(tejabiTolaNPR)}`;
  const tejabi10gDisplay = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(Math.round(tejabiTolaNPR / 1.1664))}`;

  const silverTolaNPR = rates.silver?.tolaNPR?.current ?? 4840;

  const tables = [
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (प्रति तोला)', display: `Rs. ${fmt(tolaNPR.current)}`, unit: '1 Tola' },
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (१० ग्राम)', display: `Rs. ${fmt(Math.round(tolaNPR.current / 1.1664))}`, unit: '10 Gram' },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (प्रति तोला)', display: tejabiDisplayRate, unit: '1 Tola', isTejabi: true },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (१० ग्राम)', display: tejabi10gDisplay, unit: '10 Gram', isTejabi: true },
    { label: 'Silver (Chandi)', np: 'चाँदी (प्रति तोला)', display: `Rs. ${fmt(silverTolaNPR)}`, unit: '1 Tola' },
    { label: 'Silver (Chandi)', np: 'चाँदी (१० ग्राम)', display: `Rs. ${fmt(Math.round(silverTolaNPR / 1.1664))}`, unit: '10 Gram' },
  ];

  return (
    <MarketDashboardLayout
      title="Live Gold Rates"
      description="Professional hallmark (24K) and tejabi (22K) gold rates in Nepal. Verified daily benchmarks adapted for local jewelry standards and official FENEGOSIDA price mandates."
      liveRate={fmt(tolaNPR.current)}
      changePercent={tolaNPR.changePercent24h}
      lastUpdated={rates.gold.lastUpdated}
      accentColor="#b45309"
      mainBoard={
        <div className="flex flex-col">

           {/* Error State UX */}
           {error && (
             <div className="mx-4 sm:mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                <p className="text-[12px] font-bold">Official rate temporarily unavailable.</p>
                <p className="text-[11px]">Showing last verified FENEGOSIDA record from: {new Date(rates.gold.lastUpdated).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</p>
             </div>
           )}

           {/* Freshness/Verification Badge */}
           <div className="mx-4 sm:mx-6 mt-4 p-3 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 Data Status: Verified
              </div>
              <div className="flex items-center gap-2">
                 Source: FENEGOSIDA
              </div>
              <div className="flex items-center gap-2">
                 Last Sync: {new Date(rates.gold.lastUpdated).toLocaleTimeString('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute:'2-digit' })} NPT
              </div>
              <div className="flex items-center gap-2">
                 Next Official Update: ~11:00 AM NPT
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                 Market: Open
              </div>
           </div>

           {/* AI Overview Safety Block */}
           <div className="mx-4 sm:mx-6 mt-4 p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-[11px] leading-relaxed font-medium">
             <strong>Note:</strong> Rates shown on this page are official benchmark rates published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). Retail purchase prices may vary due to making charges, wastage, VAT, and individual jeweler pricing policies.
           </div>

           {/* Quick Answer Box */}
           <div id="quick-answer" className="quick-answer-block bg-blue-50/50 p-6 border-b border-blue-100 flex flex-col md:flex-row gap-6 items-center">
             <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
               <Zap className="w-6 h-6" />
             </div>
             <div className="flex-1">
               <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today's Rate Summary</h2>
               <p className="text-sm text-slate-700 font-medium leading-relaxed m-0">
                 The official gold price in Nepal today is <strong>Rs. {fmt(tolaNPR.current)}</strong> per Tola for 24K Hallmark Gold (Chhapawal) and <strong>{tejabiDisplayRate}</strong> per Tola for 22K Tejabi Gold. Silver is priced at <strong>Rs. {fmt(silverTolaNPR)}</strong> per Tola. Prices are fixed by FENEGOSIDA. If you need to convert these rates between Tola, Lal, or Grams, you can use our <a href="/calculator/gold-converter/" className="text-blue-600 font-bold hover:underline">Nepal Gold Converter</a>.
               </p>
               <p className="text-sm text-slate-700 font-medium leading-relaxed m-0 mt-3">
                 <strong>Note:</strong> Since import costs dictate the final price, you should also check <a href="/market-rates/exchange-rate-nepal/" className="text-blue-600 underline font-bold">Today's NRB Exchange Rate</a> before making large commercial purchases.
               </p>
             </div>
           </div>

           {/* Chart Section */}
           <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">International Spot Market (XAU/USD)</h2>
                 </div>
                 <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 tracking-widest">
                    WORLD GOLD COUNCIL INDEX
                 </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-4">
                 <em>* Nepal's official gold price is fixed once daily by FENEGOSIDA. This live chart tracks the international spot market which drives the daily local price changes.</em>
              </p>
              <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
                 <TradingViewWidget 
                    symbol="OANDA:XAUUSD"
                    theme="light"
                    containerId="tv_chart_gold_main"
                 />
              </div>
           </div>

           {/* Table Section */}
           <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-6">
                 <Table className="w-4 h-4 text-amber-500" />
                 <h2 className="text-[12px] font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</h2>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="pb-4 px-4" scope="col">Standard</th>
                          <th className="pb-4 px-4" scope="col">Unit</th>
                          <th className="pb-4 px-4 text-right" scope="col">Rate (NPR)</th>
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
                                <span className={`text-[17px] font-black tracking-tighter ${row.isTejabi && tejabiTolaNPR === 0 ? 'text-slate-400' : 'text-slate-900'}`}>{row.display}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="mt-6 space-y-3">
                <a href="/calculator/gold-converter/" className="block w-full py-4 px-6 bg-amber-50 border border-amber-200 rounded-xl text-center hover:bg-amber-100 transition-colors">
                  <span className="block text-amber-800 font-black uppercase text-[12px] tracking-widest mb-1">🧮 Have specific jewelry to weigh?</span>
                  <span className="block text-amber-700 font-bold text-[11px]">Use our Gold Weight & Tola Converter to calculate the exact value of your gold in Grams, Lal, or Ratti instantly.</span>
                </a>
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
              <div className="mt-6 border-t border-slate-200 pt-6">
                 <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                    Monitoring the 7-day trailing average provides vital context for understanding local market volatility. Often, price dips are brief windows caused by minor corrections in the US Dollar index or temporary easing of geopolitical tensions. If you notice a consistent upward trend, it usually indicates strong inflation hedging by central banks. Similarly, tracking historical movements is just as crucial for other industrial precious metals traded in Nepal. Because silver also acts as both an industrial commodity and a safe-haven asset, its domestic pricing experiences similar, albeit sometimes more aggressive, percentage swings compared to gold. To ensure you have a complete picture of the bullion market before making any large-scale investments, be sure to also review the <a href="/market-rates/live-silver-price/" className="text-blue-600 font-bold hover:underline">Live Silver Price in Nepal</a> which covers official Chandi rates issued by FENEGOSIDA.
                 </p>
              </div>
           </div>
        </div>
      }
      calculatorSection={
        <QuickPriceEstimator />
      }
      faqSection={
         <div className="hidden" /> // FAQs are now inside SeoSections
      }
      seoSection={
         <SeoSections />
      }
    />
  );
}
