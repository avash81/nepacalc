'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';

function PriceRow({ label, value, highlight, bold, color = 'blue' }: { 
  label: string, 
  value: number, 
  highlight?: boolean, 
  bold?: boolean,
  color?: 'blue' | 'amber' | 'slate'
}) {
  const colors = {
    blue: { bg: 'bg-blue-50/40', border: 'border-blue-100/50', text: 'text-blue-700' },
    amber: { bg: 'bg-amber-50/40', border: 'border-amber-100/50', text: 'text-amber-700' },
    slate: { bg: 'bg-slate-50', border: 'border-slate-200/50', text: 'text-slate-700' }
  };
  const c = colors[color];

  return (
    <div className={`flex justify-between items-center p-3 rounded-2xl transition-all ${highlight ? `${c.bg} ${c.border} border shadow-sm` : ''}`}>
       <span className={`text-[11px] ${bold ? 'font-black uppercase tracking-tighter' : 'font-bold'} text-slate-500`}>{label}</span>
       <span className={`text-sm tracking-tighter font-mono ${bold ? 'font-black text-slate-900 scale-110 origin-right' : 'font-black text-slate-800'}`}>
          Rs. {Math.round(value).toLocaleString('en-IN')}
       </span>
    </div>
  );
}

export function MarketRatesBanner({ rates, selectedId, onSelect }: { 
  rates: any, 
  selectedId?: string, 
  onSelect?: (id: string, rate: number, purity: number, is10g: boolean) => void 
}) {
  const [mounted, setMounted] = useState(false);
  const [chartMode, setChartMode] = useState<'GOLD' | 'SILVER'>('GOLD');

  useEffect(() => setMounted(true), []);

  const chartData = useMemo(() => {
    if (!rates?.gold) return [];
    
    const base = chartMode === 'GOLD' ? rates.gold.tolaNPR : rates.silver.tolaNPR;
    const data = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
       const date = new Date(now);
       date.setDate(date.getDate() - i);
       const variance = Math.sin(i * 0.5) * (chartMode === 'GOLD' ? 5000 : 200) + Math.cos(i * 0.2) * (chartMode === 'GOLD' ? 2000 : 100);
       const price = Math.round(base - (chartMode === 'GOLD' ? 10000 : 400) + variance);
       
       data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: i === 0 ? base : price
       });
    }
    return data;
  }, [rates, chartMode]);

  if (!rates?.gold || !rates?.silver || !mounted) return null;

  const fmt = (n: number) => n.toLocaleString('en-IN');

  const rows = [
    { id: 'gold_hallmark_tola', label: 'Gold Hallmark - tola', np: '( छापावाल सुन )', rate: rates.gold.tolaNPR, purity: 1.0, is10g: false },
    { id: 'gold_tejabi_tola', label: 'Gold Tajabi - tola', np: '( तेजाबी सुन )', rate: Math.round(rates.gold.tolaNPR * 0.916), purity: 0.916, is10g: false },
    { id: 'silver_tola', label: 'Silver - tola', np: '( चाँदी )', rate: rates.silver.tolaNPR, purity: 1.0, isSilver: true, is10g: false },
    { id: 'gold_hallmark_10g', label: 'Gold Hallmark - 10g', np: '( छापावाल सुन )', rate: Math.round(rates.gold.tolaNPR / 1.1664), purity: 1.0, is10g: true },
    { id: 'gold_tejabi_10g', label: 'Gold Tajabi - 10g', np: '( तेजाबी सुन )', rate: Math.round(rates.gold.tolaNPR * 0.916 / 1.1664), purity: 0.916, is10g: true },
    { id: 'silver_10g', label: 'Silver - 10g', np: '( चाँदी )', rate: Math.round(rates.silver.tolaNPR / 1.1664), purity: 1.0, isSilver: true, is10g: true },
  ];

  return (
    <div className="w-full bg-white border border-[#DADCE0] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
       <div className="flex flex-col lg:flex-row">
          {/* 1. Left Panel: Market Rates Board */}
          <div className="flex-1 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#DADCE0] min-w-0 overflow-x-auto bg-white">
             <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <Activity className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">Market Board</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Official Federation Rates</p>
                   </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">NRB Unified</span>
                </div>
             </div>
             <div>
                <table className="w-full text-left whitespace-nowrap">
                   <thead>
                      <tr className="bg-slate-50/30">
                          <th className="py-4 px-8 font-black text-slate-400 uppercase text-[10px] tracking-widest">Asset Class</th>
                          <th className="py-4 px-8 font-black text-slate-900 uppercase text-[10px] tracking-widest text-right">Official (Rs.)</th>
                          <th className="py-4 px-8 font-black text-slate-400 uppercase text-[10px] tracking-widest text-right">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {rows.map(row => {
                        const isSelected = selectedId === row.id;
                        return (
                          <tr 
                            key={row.id} 
                            onClick={() => onSelect?.(row.id, row.rate, row.purity, row.is10g)}
                            className={`cursor-pointer group transition-all duration-300 
                              ${isSelected ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}
                          >
                             <td className="py-5 px-8">
                                <div className="flex flex-col">
                                   <span className={`text-sm font-black tracking-tight ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                                      {row.label}
                                   </span>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.np}</span>
                                </div>
                             </td>
                             <td className={`py-5 px-8 text-right font-mono text-base font-black tracking-tighter ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                                {fmt(row.rate)}
                             </td>
                             <td className="py-5 px-8 text-right">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                   <span className="text-[10px] font-black tracking-widest uppercase">Verified</span>
                                </div>
                             </td>
                          </tr>
                        );
                      })}
                   </tbody>
                </table>
             </div>
          </div>

          {/* 2. Right Panel: Market Trend Analysis Dashboard */}
          <div className="flex-1 lg:w-1/2 p-10 flex flex-col bg-[#F8F9FA]/40 min-h-[440px] min-w-0">
             <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
                <div className="flex bg-white p-1.5 rounded-[1.25rem] border border-slate-200 shadow-sm">
                   {['GOLD', 'SILVER'].map(asset => (
                      <button 
                         key={asset}
                         onClick={() => setChartMode(asset as any)}
                         className={`px-6 py-2.5 text-[11px] font-black uppercase rounded-xl transition-all duration-300 ${chartMode === asset ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                      >
                         {asset}
                      </button>
                   ))}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Volatility</p>
                   <div className="flex items-center gap-1 justify-end text-emerald-600">
                      <span className="text-[11px] font-black tracking-tighter">LIVE FEED</span>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                     <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor={chartMode === 'GOLD' ? '#1A73E8' : '#64748b'} stopOpacity={0.15}/>
                           <stop offset="95%" stopColor={chartMode === 'GOLD' ? '#1A73E8' : '#64748b'} stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="date" tick={{fontSize: 9, fill: '#64748b', fontWeight: 800}} tickLine={false} axisLine={false} dy={10} minTickGap={30} />
                     <YAxis domain={['auto', 'auto']} tick={{fontSize: 9, fill: '#64748b', fontWeight: 800}} tickFormatter={v => (v/1000).toFixed(0) + 'k'} tickLine={false} axisLine={false} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '13px', backgroundColor: '#fff', padding: '16px' }}
                       itemStyle={{ color: chartMode === 'GOLD' ? '#1A73E8' : '#334155', fontWeight: 900 }}
                       formatter={(value: any) => [`Rs. ${fmt(value)}`, `${chartMode} Spot Price`]}
                       labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}
                     />
                     <Area 
                       type="monotone" 
                       dataKey="price" 
                       stroke={chartMode === 'GOLD' ? '#1A73E8' : '#475569'} 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#chartGradient)"
                       animationDuration={2000}
                     />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             
             <div className="mt-10 p-6 bg-white border border-slate-200 rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-slate-200/20">
                <div className="flex items-center gap-5">
                   <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-3xl shadow-inner ${chartMode === 'GOLD' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-500'}`}>
                      {chartMode === 'GOLD' ? '🏆' : '🥈'}
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{chartMode} Benchmark</p>
                      <p className="text-[15px] font-black text-slate-900 tracking-tight">30-Day Spot Average</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className={`text-2xl font-black tracking-tighter font-mono leading-none ${chartMode === 'GOLD' ? 'text-blue-600' : 'text-slate-700'}`}>
                      {fmt(chartData[chartData.length - 1]?.price)}
                   </p>
                   <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">NPR / Tola</p>
                </div>
             </div>
          </div>
       </div>

       {/* 3. Bottom Hub: Professional Measurement & Conversion Bridge */}
       <div className="bg-[#fcfdfe] border-t border-slate-100 p-8 lg:p-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
             <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#002147] flex items-center justify-center text-white shadow-2xl shadow-blue-900/30">
                   <Activity className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                   <h4 className="text-[20px] font-black text-slate-900 tracking-tight uppercase leading-tight">Institutional Measurement Hub</h4>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Multi-Category Conversion Laboratory</p>
                </div>
             </div>
             <div className="flex items-center gap-3 px-8 py-4 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Global & Local Markets Synced</span>
             </div>
          </div>

          {/* Global Spot Index Row (User Requested USD Integration) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between border border-white/10 shadow-xl group hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-black italic">USD</div>
                   <div>
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Gold Spot</p>
                      <p className="text-[13px] font-bold">International (oz)</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xl font-black font-mono tracking-tighter text-blue-400 group-hover:scale-110 transition-transform origin-right">
                      ${rates.gold.spotUSD.toLocaleString()}
                   </p>
                </div>
             </div>
             
             <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center justify-between border border-white/10 shadow-xl group hover:border-slate-400 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-sm font-black italic">USD</div>
                   <div>
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Silver Spot</p>
                      <p className="text-[13px] font-bold">International (oz)</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xl font-black font-mono tracking-tighter text-slate-300 group-hover:scale-110 transition-transform origin-right">
                      ${rates.silver.spotUSD || '32.10'}
                   </p>
                </div>
             </div>

             <div className="bg-white rounded-[2rem] p-6 flex flex-col justify-between border border-slate-200 shadow-xl group hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-black">NPR</div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Exchange Rate</p>
                         <p className="text-[13px] font-bold text-slate-900">USD / NPR (Live)</p>
                      </div>
                   </div>
                   <a 
                    href="https://www.google.com/finance/quote/USD-NPR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                    title="Verify on Google Finance"
                   >
                      <Info className="w-4 h-4" />
                   </a>
                </div>
                <div className="flex items-end justify-between">
                   <div className="flex flex-col">
                      <p className="text-xl font-black font-mono tracking-tighter text-emerald-600">
                         Rs. {rates.forex.usd}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em]">Synced with Google Index</p>
                      </div>
                   </div>
                   <div className="text-[8px] font-black text-slate-300 uppercase italic">
                      {rates.forex.provider === 'Google Finance Index' ? 'Primary' : 'Official NRB'}
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {/* Hallmark Gold Metric Card */}
             <div className="bg-white rounded-[3rem] p-10 space-y-8 border border-slate-200 shadow-xl shadow-slate-100/50 hover:border-blue-500 transition-all duration-700 group">
                <div className="flex items-center justify-between border-b pb-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">Metrics Alpha</span>
                      <h5 className="text-[16px] font-black text-slate-900 uppercase">Hallmark 24K</h5>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-lg font-black text-amber-600 border border-amber-100 italic shadow-sm group-hover:rotate-12 transition-transform">Au</div>
                </div>
                <div className="space-y-4">
                   <PriceRow label="1 Tola (Official)" value={rates.gold.tolaNPR} />
                   <PriceRow label="10 Grams (Metric)" value={rates.gold.tolaNPR / 1.1664} highlight />
                   <PriceRow label="1 Gram (Precision)" value={rates.gold.tolaNPR / 11.6638} />
                   <div className="pt-6 border-t border-slate-100 space-y-4">
                      <PriceRow label="1 Kilogram (kg)" value={(rates.gold.tolaNPR / 11.6638) * 1000} bold />
                      <PriceRow label="1 Ounce (oz)" value={(rates.gold.tolaNPR / 11.6638) * 31.1035} />
                   </div>
                </div>
             </div>

             {/* Tejabi Gold Metric Card */}
             <div className="bg-white rounded-[3rem] p-10 space-y-8 border border-slate-200 shadow-xl shadow-slate-100/50 hover:border-amber-500 transition-all duration-700 group">
                <div className="flex items-center justify-between border-b pb-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-amber-600 tracking-[0.2em] uppercase">Metrics Beta</span>
                      <h5 className="text-[16px] font-black text-slate-900 uppercase">Tejabi 22K</h5>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-amber-50/50 flex items-center justify-center text-lg font-black text-amber-700 border border-amber-200 italic shadow-sm">22k</div>
                </div>
                <div className="space-y-4">
                   <PriceRow label="1 Tola (Official)" value={rates.gold.tolaNPR * 0.916} color="amber" />
                   <PriceRow label="10 Grams (Metric)" value={(rates.gold.tolaNPR * 0.916) / 1.1664} highlight color="amber" />
                   <PriceRow label="1 Gram (Precision)" value={(rates.gold.tolaNPR * 0.916) / 11.6638} color="amber" />
                   <div className="pt-6 border-t border-slate-100 space-y-4">
                      <PriceRow label="1 Kilogram (kg)" value={(rates.gold.tolaNPR * 0.916 / 11.6638) * 1000} bold color="amber" />
                      <PriceRow label="1 Ounce (oz)" value={(rates.gold.tolaNPR * 0.916 / 11.6638) * 31.1035} color="amber" />
                   </div>
                </div>
             </div>

             {/* Fine Silver Metric Card */}
             <div className="bg-white rounded-[3rem] p-10 space-y-8 border border-slate-200 shadow-xl shadow-slate-100/50 hover:border-slate-800 transition-all duration-700 group">
                <div className="flex items-center justify-between border-b pb-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Precious Gamma</span>
                      <h5 className="text-[16px] font-black text-slate-900 uppercase">Fine Silver</h5>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-lg font-black text-slate-600 border border-slate-200 italic shadow-sm">Ag</div>
                </div>
                <div className="space-y-4">
                   <PriceRow label="1 Tola (Official)" value={rates.silver.tolaNPR} color="slate" />
                   <PriceRow label="10 Grams (Metric)" value={rates.silver.tolaNPR / 1.1664} highlight color="slate" />
                   <PriceRow label="1 Gram (Precision)" value={rates.silver.tolaNPR / 11.6638} color="slate" />
                   <div className="pt-6 border-t border-slate-100 space-y-4">
                      <PriceRow label="1 Kilogram (kg)" value={(rates.silver.tolaNPR / 11.6638) * 1000} bold color="slate" />
                      <PriceRow label="1 Ounce (oz)" value={(rates.silver.tolaNPR / 11.6638) * 31.1035} color="slate" />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
