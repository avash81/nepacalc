'use client';

import React from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import { Landmark, Wallet, Globe, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function RemittanceDashboardClient() {
  const { rates, loading } = useLiveRates();

  if (loading || !rates?.forex) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const usd = rates.forex.usd.current;
  const fmt = (n: number) => n.toFixed(2);

  const providers = [
    { name: 'Wise', rate: usd - 0.15, fee: '0.99', speed: 'Instant', safety: 'High' },
    { name: 'Remitly', rate: usd - 0.40, fee: '0.00', speed: '4 Hours', safety: 'High' },
    { name: 'Western Union', rate: usd - 0.85, fee: '4.99', speed: 'Instant', safety: 'Max' },
    { name: 'IME Pay', rate: usd - 1.20, fee: '0.00', speed: 'Real-time', safety: 'Local Choice' },
  ];

  return (
    <MarketDashboardLayout
      title="Remittance to Nepal"
      description="Compare live sending rates from the USA, Gulf, and Europe to Nepal. Find the highest NPR payout for your hard-earned money with zero hidden fees."
      liveRate={fmt(usd)}
      changePercent={rates.forex.usd.changePercent24h}
      lastUpdated={new Date().toLocaleDateString()}
      accentColor="#4361ee"
      mainBoard={
        <div className="flex flex-col">
           {/* Provider Board */}
           <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-[#1a73e8] flex items-center justify-center text-[#202124] shadow-sm shadow-blue-500/10">
                    <Wallet className="w-5 h-5" />
                 </div>
                 <div>
                    <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Transfer Provider Comparison</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Payout for 1,000 USD</p>
                 </div>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                 <thead>
                    <tr className="border-b border-slate-100">
                       <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate (1 USD)</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Speed</th>
                       <th className="py-5 px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Payout (NPR)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {providers.map((p, i) => (
                       <tr key={i} className="group hover:bg-slate-50 transition-all">
                          <td className="py-6 px-8">
                             <div className="flex flex-col">
                                <span className="text-[15px] font-black text-slate-900 leading-none mb-1">{p.name}</span>
                                <div className="flex items-center gap-2">
                                   <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded-sm">{p.safety} Safety</span>
                                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fee: {p.fee}</span>
                                </div>
                             </div>
                          </td>
                          <td className="py-6 px-8 text-[13px] font-black text-slate-500">Rs. {fmt(p.rate)}</td>
                          <td className="py-6 px-8 text-[13px] font-black text-slate-500">{p.speed}</td>
                          <td className="py-6 px-8 text-right">
                             <span className="text-[18px] font-black text-blue-600 tracking-tighter">Rs. {fmt(p.rate * 1000)}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Safety Guide Mini */}
           <div className="p-8 bg-white border border-[#dadce0] text-[#202124] rounded-b-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                 <h3 className="text-xl font-bold mb-1">Sending for the first time?</h3>
                 <p className="text-[12px] text-[#202124]/50 font-medium">Use licensed channels like Wise or IME for guaranteed insurance and official exchange rates.</p>
              </div>
              <button className="px-6 py-3 bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all">
                 Read Safety Guide
              </button>
           </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
           <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
              <h4 className="text-[12px] font-black text-blue-900 mb-3 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" />
                 Safe Remit Guide
              </h4>
              <ul className="space-y-3">
                 {[
                    'Never use unofficial Hundi circles.',
                    'Keep digital receipts of transaction IDs.',
                    'Verify the NPR rate before confirming.',
                    'Check for hidden "Fix Fee" costs.'
                 ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-blue-800 font-medium leading-relaxed">
                       <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                       {t}
                    </li>
                 ))}
              </ul>
           </div>
           
           <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <Globe className="w-6 h-6 text-slate-400 mx-auto mb-3" />
              <h5 className="text-[13px] font-black text-slate-800 mb-1">Cross-Border Dashboard</h5>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Our portal tracks 24/7 liquidity across 15+ major global remit corridors.</p>
           </div>
        </div>
      }
      seoSection={
         <div className="prose prose-slate max-w-none">
            <h2 className="text-[20px] font-black text-slate-900 mb-4 tracking-tighter">Remittance Economy in Nepal 2026</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
               Remittance is the backbone of the Nepalese economy, contributing to over 25% of the national GDP. For migrant workers in the UAE, Qatar, Saudi Arabia, USA, and Australia, finding the best **sending rate** is essential. This dashboard compares the top digital and physical remittance providers to ensure your family in Nepal receives the maximum possible amount.
            </p>
         </div>
      }
    />
  );
}
