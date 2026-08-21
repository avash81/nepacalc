'use client';

import React, { useState, useEffect } from 'react';
import { Download, Database, Info, AlertTriangle, History, TrendingUp, TrendingDown, Minus } from 'lucide-react';

type UnitMode = 'tola' | '10g' | 'kg';

const TOLA_TO_GRAM = 11.6638;

function convertPrice(tolaPrize: number, unit: UnitMode): number {
  if (unit === 'tola') return tolaPrize;
  if (unit === '10g') return Math.round((tolaPrize / TOLA_TO_GRAM) * 10);
  return Math.round((tolaPrize / TOLA_TO_GRAM) * 1000);
}

function unitLabel(unit: UnitMode): string {
  if (unit === 'tola') return 'Per Tola';
  if (unit === '10g') return 'Per 10g';
  return 'Per kg';
}

export default function SilverHistoricalData() {
  const [activeTab, setActiveTab] = useState<'yearly' | 'monthly' | 'daily'>('yearly');
  const [unitMode, setUnitMode] = useState<UnitMode>('tola');
  const [rawDailyData, setRawDailyData] = useState<{ date: string; rawPrice: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; high: number; low: number; avg: number; days: number }[]>([]);

  useEffect(() => {
    fetch('/data/daily-history.json')
      .then(res => res.json())
      .then((data: any[]) => {
        const mapped = data.slice(0, 14).map((d: any) => ({
          date: new Date(d.date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          rawPrice: d.silver,
        }));
        setRawDailyData(mapped);

        const groups: Record<string, number[]> = {};
        data.forEach((d: any) => {
          const key = d.date.slice(0, 7);
          if (!groups[key]) groups[key] = [];
          groups[key].push(d.silver);
        });
        const monthly = Object.entries(groups)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([key, prices]) => {
            const [y, m] = key.split('-');
            const monthName = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            return {
              month: monthName,
              high: Math.max(...prices),
              low: Math.min(...prices),
              avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
              days: prices.length,
            };
          });
        setMonthlyData(monthly);
      })
      .catch(console.error);
  }, []);

  const yearlyData = [
    { year: 2083, maxTola: 5000, minTola: 4000, source: 'FENEGOSIDA' },
    { year: 2082, maxTola: 0, minTola: 0, source: 'FENEGOSIDA' },
    { year: 2081, maxTola: 0, minTola: 0, source: 'FENEGOSIDA' },
  ];

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const currentYearData = yearlyData[0];
  const currentYearAvg = (currentYearData.maxTola + currentYearData.minTola) / 2;

  const UnitToggle = () => (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 mb-4">
      {(['tola', '10g', 'kg'] as UnitMode[]).map(u => (
        <button
          key={u}
          onClick={() => setUnitMode(u)}
          className={`px-4 py-1.5 rounded-md text-[12px] font-bold tracking-wide transition-all ${
            unitMode === u
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {unitLabel(u)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-12">
      <section className="mb-12">
        <h2 id="silver-price-history" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6 scroll-mt-24">
          Silver Price History in Nepal
        </h2>

        <div className="flex border-b border-slate-200 mb-6">
          {(['yearly', 'monthly', 'daily'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-slate-800 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab} History
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {activeTab === 'yearly' && (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="py-4 px-4" scope="col">Year</th>
                  <th className="py-4 px-4 text-right" scope="col">Max (Tola)</th>
                  <th className="py-4 px-4 text-right" scope="col">Min (Tola)</th>
                  <th className="py-4 px-4 text-right" scope="col">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4"><span className="text-[14px] font-black text-slate-900">{row.year}</span></td>
                    <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-slate-700">Rs. {fmt(row.maxTola)}</span></td>
                    <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-slate-700">Rs. {fmt(row.minTola)}</span></td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-black tracking-widest bg-slate-100 text-slate-600 uppercase">
                        {row.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'monthly' && (
            <div>
              <div className="px-4 pt-4"><UnitToggle /></div>
              {monthlyData.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="py-4 px-4" scope="col">Month</th>
                      <th className="py-4 px-4 text-right" scope="col">High ({unitLabel(unitMode)})</th>
                      <th className="py-4 px-4 text-right" scope="col">Low ({unitLabel(unitMode)})</th>
                      <th className="py-4 px-4 text-right" scope="col">Avg ({unitLabel(unitMode)})</th>
                      <th className="py-4 px-4 text-right" scope="col">Days</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {monthlyData.map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4"><span className="text-[14px] font-black text-slate-900">{row.month}</span></td>
                        <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-emerald-700">Rs. {fmt(convertPrice(row.high, unitMode))}</span></td>
                        <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-red-600">Rs. {fmt(convertPrice(row.low, unitMode))}</span></td>
                        <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-slate-700">Rs. {fmt(convertPrice(row.avg, unitMode))}</span></td>
                        <td className="py-4 px-4 text-right text-[12px] font-medium text-slate-400">{row.days}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-400 font-medium text-sm">
                  <Database className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                  <p>Loading monthly summary...</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'daily' && (
            <div>
              <div className="px-4 pt-4"><UnitToggle /></div>
              {rawDailyData.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="py-4 px-4" scope="col">Date</th>
                      <th className="py-4 px-4 text-right" scope="col">Silver Price ({unitLabel(unitMode)})</th>
                      <th className="py-4 px-4 text-right" scope="col">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rawDailyData.map((row, i) => {
                      const displayPrice = convertPrice(row.rawPrice, unitMode);
                      const prevRaw = rawDailyData[i + 1]?.rawPrice;
                      const change = prevRaw != null ? convertPrice(row.rawPrice, unitMode) - convertPrice(prevRaw, unitMode) : null;
                      const isUp = change != null && change > 0;
                      const isDown = change != null && change < 0;
                      return (
                        <tr key={row.date} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4"><span className="text-[14px] font-black text-slate-900">{row.date}</span></td>
                          <td className="py-4 px-4 text-right"><span className="text-[14px] font-bold text-slate-800">Rs. {fmt(displayPrice)}</span></td>
                          <td className="py-4 px-4 text-right">
                            {change === null ? (
                              <span className="text-[12px] text-slate-400 font-medium">—</span>
                            ) : change === 0 ? (
                              <span className="inline-flex items-center justify-end gap-1 text-[12px] font-bold text-slate-400 w-full">
                                <Minus className="w-3 h-3" /> 0
                              </span>
                            ) : isUp ? (
                              <span className="inline-flex items-center justify-end gap-1 text-[12px] font-bold text-emerald-600 w-full">
                                <TrendingUp className="w-3.5 h-3.5" /> +{fmt(change)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-end gap-1 text-[12px] font-bold text-red-500 w-full">
                                <TrendingDown className="w-3.5 h-3.5" /> {fmt(change)}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  <Database className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                  <p>Loading daily prices...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



