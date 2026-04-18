'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';

export function MarketRatesBanner({ rates, selectedId, onSelect }: { 
  rates: any, 
  selectedId?: string, 
  onSelect?: (id: string, rate: number, purity: number, is10g: boolean) => void 
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chartData = useMemo(() => {
    if (!rates?.gold) return [];
    
    // Stable pseudo-random data generation based on base price
    // This prevents hydration mismatches since the sequence is now deterministic
    const base = rates.gold.tolaNPR;
    const data = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
       const date = new Date(now);
       date.setDate(date.getDate() - i);
       
       // Deterministic "random" movement based on index and base rate
       const variance = Math.sin(i * 0.5) * 5000 + Math.cos(i * 0.2) * 2000;
       const price = Math.round(base - 10000 + variance);
       
       data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: i === 0 ? base : price
       });
    }
    return data;
  }, [rates?.gold?.tolaNPR]);

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
    <div className="w-full bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row">
       <div className="flex-1 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#DADCE0] min-w-0 overflow-x-auto">
          <div className="px-5 py-3 border-b border-[#DADCE0] flex items-center justify-between">
             <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-[#1A73E8] tracking-widest">
                <Activity className="w-3.5 h-3.5" /> Market Rates Board
             </div>
             <span className="text-[10px] text-slate-500 font-medium italic">
                Click a row to select asset
             </span>
          </div>
          <div className="min-w-min">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                   <tr className="border-b border-slate-100">
                       <th className="py-3 px-5 font-bold text-slate-500 uppercase text-[9px] tracking-widest">Asset Class</th>
                       <th className="py-3 px-5 font-bold text-slate-500 uppercase text-[9px] tracking-widest text-right">NP Official</th>
                       <th className="py-3 px-5 font-bold text-slate-500 uppercase text-[9px] tracking-widest text-right">Intl Price</th>
                   </tr>
                </thead>
                <tbody>
                   {rows.map(row => {
                     const isSelected = selectedId === row.id;
                     const intlRate = row.isSilver ? rates.silver.tolaInternationalNPR : rates.gold.tolaInternationalNPR;
                     const adjustedIntl = row.is10g ? Math.round((intlRate * row.purity) / 1.1664) : Math.round(intlRate * row.purity);

                     return (
                       <tr 
                         key={row.id} 
                         onClick={() => onSelect?.(row.id, row.rate, row.purity, row.is10g)}
                         className={`cursor-pointer transition-all duration-200 border-b border-slate-50 
                           ${isSelected ? 'bg-emerald-50 border-emerald-100' : 'hover:bg-slate-50'}`}
                       >
                          <td className="py-3.5 px-5">
                             <div className="flex items-center gap-2">
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                <span className={`${isSelected ? 'text-emerald-900 font-bold' : 'text-slate-700 font-medium'}`}>
                                   {row.label} <span className="text-slate-400 font-normal ml-1">{row.np}</span>
                                </span>
                             </div>
                          </td>
                          <td className={`py-3.5 px-5 text-right font-black ${isSelected ? 'text-emerald-600' : 'text-slate-900'}`}>
                             Nrs. {fmt(row.rate)}
                          </td>
                          <td className="py-3.5 px-5 text-right text-slate-400">
                             Nrs. {fmt(adjustedIntl)}
                          </td>
                       </tr>
                     );
                   })}
                </tbody>
             </table>
          </div>
       </div>

       <div className="flex-1 lg:w-1/2 p-6 flex flex-col bg-[#F8F9FA]/40 min-h-[300px] min-w-0">
          <h3 className="text-sm font-light text-[#1A73E8] tracking-widest uppercase text-center mb-6 border-b border-[#E8EAED] pb-3">GOLD HALMARK - TOLA</h3>
          <div className="flex-1 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="date" tick={{fontSize: 10, fill: '#5F6368'}} tickLine={false} axisLine={true} stroke="#E8EAED" dy={10} minTickGap={20} />
                  <YAxis domain={['auto', 'auto']} tick={{fontSize: 10, fill: '#5F6368'}} tickFormatter={v => (v/1000).toFixed(0) + 'k'} tickLine={false} axisLine={true} stroke="#E8EAED" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#1A73E8' }}
                    formatter={(value: any) => [`Rs. ${fmt(value)}`, 'Price']}
                    labelStyle={{ color: '#5F6368', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#1A73E8" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#fff', stroke: '#1A73E8', strokeWidth: 2 }} />
               </LineChart>
             </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
}
