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

export default function HistoricalData() {
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
          rawPrice: d.gold,
        }));
        setRawDailyData(mapped);

        const groups: Record<string, number[]> = {};
        data.forEach((d: any) => {
          const key = d.date.slice(0, 7);
          if (!groups[key]) groups[key] = [];
          groups[key].push(d.gold);
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
    { year: 2083, maxTola: 316700, minTola: 285000, max10g: 271525, min10g: 244340, source: 'FENEGOSIDA' },
    { year: 2082, maxTola: 286000, minTola: 250000, max10g: 245200, min10g: 214300, source: 'FENEGOSIDA' },
    { year: 2081, maxTola: 250000, minTola: 180000, max10g: 214300, min10g: 154300, source: 'FENEGOSIDA' },
    { year: 2080, maxTola: 180000, minTola: 150000, max10g: 154300, min10g: 128600, source: 'FENEGOSIDA' },
    { year: 2079, maxTola: 150000, minTola: 120000, max10g: 128600, min10g: 102800, source: 'FENEGOSIDA' },
    { year: 2078, maxTola: 120000, minTola: 100000, max10g: 102800, min10g: 85700, source: 'FENEGOSIDA' },
    { year: 2077, maxTola: 99800, minTola: 100400, max10g: 85560, min10g: 86070, source: 'FENEGOSIDA', anomaly: true },
    { year: 2076, maxTola: 85000, minTola: 70000, max10g: 72870, min10g: 60010, source: 'FENEGOSIDA' },
    { year: 2075, maxTola: 70000, minTola: 58000, max10g: 60010, min10g: 49720, source: 'FENEGOSIDA' },
    { year: 2074, maxTola: 58000, minTola: 53000, max10g: 49720, min10g: 45440, source: 'FENEGOSIDA' },
    { year: 2073, maxTola: 53000, minTola: 48000, max10g: 45440, min10g: 41150, source: 'FENEGOSIDA' },
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
              ? 'bg-amber-500 text-white shadow-sm'
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
      <section id="gold-price-history" className="scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
          Gold Price History in Nepal
        </h2>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" />
            Historical Records (Fine Gold)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Highest Recorded Price</span>
              <span className="block text-2xl font-black text-slate-900 tracking-tighter">Rs. {fmt(currentYearData.maxTola)} <span className="text-sm font-medium text-slate-500">per tola</span></span>
              <span className="block text-xs text-slate-500 mt-1 font-medium">Occurred in 2083 (2026 AD)</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Year ({currentYearData.year}) Average</span>
              <span className="block text-2xl font-black text-slate-900 tracking-tighter">Rs. {fmt(Math.round(currentYearAvg))} <span className="text-sm font-medium text-slate-500">per tola</span></span>
              <span className="block text-xs text-slate-500 mt-1 font-medium">Dynamically calculated from historical dataset</span>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-4 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            Over the past decade, the price of gold in Nepal has seen a significant upward trend, driven by international spot price volatility, inflation, and adjustments in the USD/NPR exchange rate.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Historical Record Methodology
            </h4>
            <p className="text-xs text-blue-800 font-medium m-0 leading-relaxed">
              Official historical values are stored exactly as published by the Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA). We apply no normalization, no correction, and no third-party data replacement.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-1">Historical Archive Disclaimer</p>
          <p className="text-[13px] text-amber-800 leading-relaxed font-medium">
            Historical records are reproduced exactly as published by FENEGOSIDA. Certain historical entries may contain apparent inconsistencies in published maximum and minimum values.
          </p>
        </div>

        <div className="flex border-b border-slate-200 mb-6">
          {(['yearly', 'monthly', 'daily'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-amber-500 text-amber-700'
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
                  <th className="py-4 px-4 text-right" scope="col">Max (10g)</th>
                  <th className="py-4 px-4 text-right" scope="col">Min (10g)</th>
                  <th className="py-4 px-4 text-right" scope="col">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4"><span className="text-[14px] font-black text-slate-900">{row.year}</span></td>
                    <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-slate-700">Rs. {fmt(row.maxTola)}</span></td>
                    <td className="py-4 px-4 text-right"><span className="text-[13px] font-bold text-slate-700">Rs. {fmt(row.minTola)}</span></td>
                    <td className="py-4 px-4 text-right text-[12px] font-medium text-slate-500">Rs. {fmt(row.max10g)}</td>
                    <td className="py-4 px-4 text-right text-[12px] font-medium text-slate-500">Rs. {fmt(row.min10g)}</td>
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
                      <th className="py-4 px-4 text-right" scope="col">Gold Price ({unitLabel(unitMode)})</th>
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

        <div className="mt-4 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 font-medium leading-relaxed m-0">
            <strong>Historical Note (2077):</strong> Published exactly as provided by FENEGOSIDA. Contains an apparent inconsistency in max/min spread.
          </p>
        </div>
      </section>

      <section id="historical-datasets" className="pt-8 border-t border-slate-200">
        <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-6">
          Available Gold and Silver Historical Datasets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Gold Price History Dataset', coverage: '2073–2083', type: 'Daily / Monthly / Yearly' },
            { title: 'Silver Price History Dataset', coverage: '2073–2083', type: 'Daily / Monthly / Yearly' },
            { title: 'Monthly Gold Dataset', coverage: '2080–2083', type: 'Monthly Aggregate' },
            { title: 'Annual Gold & Silver Dataset', coverage: '2073–2083', type: 'Yearly Aggregate' },
          ].map((ds) => (
            <div key={ds.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{ds.title}</h3>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-b border-slate-50 pb-2">
                  <span>Source:</span>
                  <span className="font-bold text-slate-800">FENEGOSIDA</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-b border-slate-50 pb-2">
                  <span>Coverage:</span>
                  <span className="text-slate-800">{ds.coverage}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-b border-slate-50 pb-2">
                  <span>Updated:</span>
                  <span className="text-slate-800">Dynamic</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-b border-slate-50 pb-2">
                  <span>Format:</span>
                  <span className="text-slate-800">{ds.type}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button disabled aria-label={`Download ${ds.title} as CSV (Coming Soon)`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 text-slate-400 text-[11px] font-bold tracking-widest uppercase rounded-lg border border-slate-200 cursor-not-allowed">
                  <Download className="w-3 h-3" /> CSV (Soon)
                </button>
                <button disabled aria-label={`Download ${ds.title} as JSON (Coming Soon)`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 text-slate-400 text-[11px] font-bold tracking-widest uppercase rounded-lg border border-slate-200 cursor-not-allowed">
                  <Download className="w-3 h-3" /> JSON (Soon)
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-slate-100/50 border border-slate-200 rounded-xl text-center">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-1">Dataset Export Integrity Rule</p>
          <p className="text-[12px] text-slate-500 font-medium">Downloaded CSV/JSON/Excel exports must preserve official FENEGOSIDA values exactly as stored. No normalization, rounding, inferred values, estimated values, corrected anomalies, or third-party replacements are permitted.</p>
        </div>
      </section>
    </div>
  );
}
