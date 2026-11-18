'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface YearlyRate {
  year: number;
  avg: number;
  high: number;
  low: number;
  close: number;
  returnPct: number;
}

export interface InternationalHistoryDataset {
  goldYearly: YearlyRate[];
  silverYearly: YearlyRate[];
  milestones: any;
  cagr: any;
}

type TabType = 'byyear' | 'yearminmax' | 'bydecade' | 'ratio' | 'cagr';
type UnitType = 'oz' | 'gram' | '10g' | 'kg';

const TROY_OZ_TO_GRAMS = 31.1034768;

function getUnitMultiplier(unit: UnitType): number {
  switch (unit) {
    case 'gram':
      return 1 / TROY_OZ_TO_GRAMS;
    case '10g':
      return 10 / TROY_OZ_TO_GRAMS;
    case 'kg':
      return 1000 / TROY_OZ_TO_GRAMS;
    case 'oz':
    default:
      return 1;
  }
}

function getUnitLabel(unit: UnitType): string {
  switch (unit) {
    case 'gram':
      return '/ gram';
    case '10g':
      return '/ 10g';
    case 'kg':
      return '/ kg';
    case 'oz':
    default:
      return '/ oz';
  }
}

function fmtUSD(val: number | null | undefined): string {
  if (val == null || isNaN(val)) return '-';
  if (val >= 1000) {
    return '$' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  }
  if (val >= 1) {
    return '$' + val.toFixed(2);
  }
  return '$' + val.toFixed(3);
}

export default function InternationalHistoryClient({
  initialData,
  currentLiveRates,
}: {
  initialData: InternationalHistoryDataset;
  currentLiveRates: { goldUSD: number; silverUSD: number };
}) {
  const [tab, setTab] = useState<TabType>('byyear');
  const [unit, setUnit] = useState<UnitType>('oz');
  const [selYear, setSelYear] = useState<string>('all');
  const [metalFilter, setMetalFilter] = useState<'both' | 'gold' | 'silver'>('both');
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const multiplier = getUnitMultiplier(unit);
  const unitLabel = getUnitLabel(unit);

  // Merge gold and silver by year
  const mergedRecords = useMemo(() => {
    const silverMap = new Map<number, YearlyRate>();
    (initialData.silverYearly || []).forEach(s => silverMap.set(s.year, s));

    return (initialData.goldYearly || []).map(g => {
      const s = silverMap.get(g.year);
      const sAvg = s?.avg || 0;
      const ratio = sAvg > 0 ? g.avg / sAvg : 0;
      return {
        year: g.year,
        gold: g,
        silver: s,
        ratio,
      };
    });
  }, [initialData]);

  // Decade Aggregates
  const decadeData = useMemo(() => {
    const decades = [
      { id: '2020s', label: '2020s (2020 - 2026)', start: 2020, end: 2026 },
      { id: '2010s', label: '2010s (2010 - 2019)', start: 2010, end: 2019 },
      { id: '2000s', label: '2000s (2000 - 2009)', start: 2000, end: 2009 },
      { id: '1990s', label: '1990s (1990 - 1999)', start: 1990, end: 1999 },
      { id: '1980s', label: '1980s (1980 - 1989)', start: 1980, end: 1989 },
      { id: '1970s', label: '1970s (1970 - 1979)', start: 1970, end: 1979 },
    ];

    return decades.map(dec => {
      const recs = mergedRecords.filter(r => r.year >= dec.start && r.year <= dec.end);
      if (recs.length === 0) return null;

      const goldHighs = recs.map(r => r.gold.high);
      const goldLows = recs.map(r => r.gold.low);
      const goldAvgs = recs.map(r => r.gold.avg);
      const silverAvgs = recs.map(r => r.silver?.avg || 0).filter(v => v > 0);

      const gPeak = Math.max(...goldHighs);
      const gTrough = Math.min(...goldLows);
      const gMean = goldAvgs.reduce((a, b) => a + b, 0) / goldAvgs.length;
      const sMean = silverAvgs.length > 0 ? silverAvgs.reduce((a, b) => a + b, 0) / silverAvgs.length : 0;

      // Cumulative return across decade
      const startClose = recs[recs.length - 1]?.gold.close || 1;
      const endClose = recs[0]?.gold.close || 1;
      const netGain = ((endClose - startClose) / startClose) * 100;

      return {
        label: dec.label,
        count: recs.length,
        gPeak,
        gTrough,
        gMean,
        sMean,
        netGain,
        ratio: sMean > 0 ? gMean / sMean : 0,
      };
    }).filter(Boolean);
  }, [mergedRecords]);

  // Filtered rows for By Year
  const filteredRecords = useMemo(() => {
    let list = mergedRecords;
    if (selYear !== 'all') {
      const yr = Number(selYear);
      list = list.filter(r => r.year === yr);
    }
    return list;
  }, [mergedRecords, selYear]);

  // Reset page when filter changes
  const handleYearChange = (yr: string) => {
    setSelYear(yr);
    setPage(1);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'byyear', label: 'By Year' },
    { id: 'yearminmax', label: 'Year Min/Max' },
    { id: 'bydecade', label: 'By Decade' },
    { id: 'ratio', label: 'Gold-Silver Ratio' },
    { id: 'cagr', label: '50Y Growth (CAGR)' },
  ];

  return (
    <div className="w-full relative">

      {/* ── Official Style Header ── */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#d97706] tracking-wide uppercase">
          HISTORY
        </h2>
        <div className="w-14 h-1 bg-[#d97706] mx-auto mt-2 rounded-full" />
      </div>

      {/* ── Sub-tabs Pills ── */}
      <div className="flex flex-wrap items-center justify-start gap-2 mb-8">
        {tabs.map(t => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setPage(1);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#d97706] shadow-sm border border-slate-200/80 ring-1 ring-amber-500/10'
                  : 'text-slate-600 hover:text-slate-900 font-semibold'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Main Explorer Card ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-8">

        {/* ══════════════════════════════════════════════════════════════
            TAB: BY YEAR (Default & Primary Explorer)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'byyear' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Year</h3>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={selYear}
                  onChange={e => handleYearChange(e.target.value)}
                  className="appearance-none bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[210px]"
                >
                  <option value="all">All Years (1970 - 2026)</option>
                  {mergedRecords.map(r => (
                    <option key={r.year} value={String(r.year)}>{r.year}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Metal Filter */}
              <div className="relative">
                <select
                  value={metalFilter}
                  onChange={e => setMetalFilter(e.target.value as any)}
                  className="appearance-none bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[150px]"
                >
                  <option value="both">Gold &amp; Silver</option>
                  <option value="gold">Gold Only</option>
                  <option value="silver">Silver Only</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {selYear !== 'all' && (
                <button
                  onClick={() => handleYearChange('all')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Show All Years
                </button>
              )}
            </div>

            {/* Unit Toggle (Ounce / Grams / 10g / Kg) */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => setUnit('oz')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'oz'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Troy Ounce
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('gram')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'gram'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('10g')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === '10g'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  10 Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('kg')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'kg'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Kilogram
                </button>
              </div>
            </div>

            {(() => {
              const totalEntries = filteredRecords.length;
              const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
              const startEntry = totalEntries === 0 ? 0 : (page - 1) * rowsPerPage + 1;
              const endEntry = Math.min(page * rowsPerPage, totalEntries);
              const paginatedRows = filteredRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage);

              const getPageNumbers = () => {
                const range: (number | string)[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) range.push(i);
                  return range;
                }

                if (page <= 4) {
                  for (let i = 1; i <= 5; i++) range.push(i);
                  range.push('...');
                  range.push(totalPages);
                } else if (page >= totalPages - 3) {
                  range.push(1);
                  range.push('...');
                  for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
                } else {
                  range.push(1);
                  range.push('...');
                  range.push(page - 1);
                  range.push(page);
                  range.push(page + 1);
                  range.push('...');
                  range.push(totalPages);
                }
                return range;
              };

              return (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                        <tr>
                          <th scope="col" className="py-3 px-4 text-left">Year</th>
                          {metalFilter !== 'silver' && (
                            <>
                              <th scope="col" className="py-3 px-4 text-right">Gold Peak</th>
                              <th scope="col" className="py-3 px-4 text-right">Gold Low</th>
                              <th scope="col" className="py-3 px-4 text-right">Gold Average</th>
                            </>
                          )}
                          {metalFilter !== 'gold' && (
                            <>
                              <th scope="col" className="py-3 px-4 text-right">Silver Peak</th>
                              <th scope="col" className="py-3 px-4 text-right">Silver Average</th>
                            </>
                          )}
                          <th scope="col" className="py-3 px-4 text-right">Annual Return</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedRows.map(row => (
                          <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                              {row.year}
                            </td>
                            {metalFilter !== 'silver' && (
                              <>
                                <td className="py-3.5 px-4 text-amber-700 font-bold text-right whitespace-nowrap">
                                  {fmtUSD(row.gold.high * multiplier)}
                                </td>
                                <td className="py-3.5 px-4 text-slate-600 text-right whitespace-nowrap">
                                  {fmtUSD(row.gold.low * multiplier)}
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                                  {fmtUSD(row.gold.avg * multiplier)}
                                </td>
                              </>
                            )}
                            {metalFilter !== 'gold' && (
                              <>
                                <td className="py-3.5 px-4 text-slate-700 font-bold text-right whitespace-nowrap">
                                  {row.silver ? fmtUSD(row.silver.high * multiplier) : '-'}
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                                  {row.silver ? fmtUSD(row.silver.avg * multiplier) : '-'}
                                </td>
                              </>
                            )}
                            <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                              <span className={row.gold.returnPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                                {row.gold.returnPct >= 0 ? '+' : ''}{row.gold.returnPct.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination footer matching exact Nepal screenshot */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-200 text-sm text-slate-600">
                    <div>
                      Showing {startEntry} to {endEntry} of {totalEntries} entries
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center gap-1 select-none flex-wrap">
                        <button
                          type="button"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Previous
                        </button>

                        {getPageNumbers().map((num, idx) => (
                          <React.Fragment key={idx}>
                            {num === '...' ? (
                              <span className="px-2 py-1 text-slate-400 text-xs">...</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setPage(Number(num))}
                                className={`min-w-[32px] h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  page === num
                                    ? 'bg-[#d97706] text-white shadow-xs'
                                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                {num}
                              </button>
                            )}
                          </React.Fragment>
                        ))}

                        <button
                          type="button"
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: YEAR MIN / MAX
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'yearminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Annual Minimum and Maximum Benchmark Spread</h3>

            {/* Unit Toggle */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => setUnit('oz')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'oz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Troy Ounce
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('gram')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'gram' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('10g')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === '10g' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  10 Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('kg')}
                  className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    unit === 'kg' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Kilogram
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Year</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Min (Low)</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Max (Peak)</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Spread</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Min (Low)</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Max (Peak)</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Spread</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mergedRecords.slice(0, 30).map(row => {
                    const gSpread = (row.gold.high - row.gold.low) * multiplier;
                    const sSpread = row.silver ? (row.silver.high - row.silver.low) * multiplier : 0;
                    return (
                      <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{row.year}</td>
                        <td className="py-3.5 px-4 text-slate-600 text-right whitespace-nowrap">{fmtUSD(row.gold.low * multiplier)}</td>
                        <td className="py-3.5 px-4 text-amber-700 font-bold text-right whitespace-nowrap">{fmtUSD(row.gold.high * multiplier)}</td>
                        <td className="py-3.5 px-4 text-slate-800 font-semibold text-right whitespace-nowrap">{fmtUSD(gSpread)}</td>
                        <td className="py-3.5 px-4 text-slate-600 text-right whitespace-nowrap">{row.silver ? fmtUSD(row.silver.low * multiplier) : '-'}</td>
                        <td className="py-3.5 px-4 text-slate-800 font-bold text-right whitespace-nowrap">{row.silver ? fmtUSD(row.silver.high * multiplier) : '-'}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-semibold text-right whitespace-nowrap">{sSpread > 0 ? fmtUSD(sSpread) : '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: BY DECADE
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'bydecade' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Decade (1970 - 2026)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Decade Era</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Lowest</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Peak</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Avg GSR</th>
                    <th scope="col" className="py-3 px-4 text-right">Net Price Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {decadeData.map((d: any) => (
                    <tr key={d.label} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{d.label}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-right whitespace-nowrap">{fmtUSD(d.gTrough * multiplier)}</td>
                      <td className="py-3.5 px-4 text-amber-700 font-bold text-right whitespace-nowrap">{fmtUSD(d.gPeak * multiplier)}</td>
                      <td className="py-3.5 px-4 text-slate-900 font-bold text-right whitespace-nowrap">{fmtUSD(d.gMean * multiplier)}</td>
                      <td className="py-3.5 px-4 text-slate-800 font-bold text-right whitespace-nowrap">{fmtUSD(d.sMean * multiplier)}</td>
                      <td className="py-3.5 px-4 text-slate-700 text-right whitespace-nowrap">{d.ratio.toFixed(1)}:1</td>
                      <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                        <span className={d.netGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {d.netGain >= 0 ? '+' : ''}{d.netGain.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: GOLD-SILVER RATIO
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'ratio' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gold-to-Silver Ratio History</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Number of troy ounces of silver required to purchase one troy ounce of gold.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Historical Median</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">55.4:1</p>
                <p className="text-[11px] text-slate-400 mt-0.5">56-year post-Bretton Woods average</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">All-Time Low (Silver Surge)</span>
                <p className="text-xl font-extrabold text-emerald-900 mt-0.5">17.2:1</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Recorded in Jan 1980</p>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5">
                <span className="text-[11px] font-bold text-rose-800 uppercase">All-Time Peak (Silver Dip)</span>
                <p className="text-xl font-extrabold text-rose-900 mt-0.5">125.6:1</p>
                <p className="text-[11px] text-rose-700 mt-0.5">Recorded in March 2020</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Year</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Ratio (GSR)</th>
                    <th scope="col" className="py-3 px-4 text-right">Market Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mergedRecords.slice(0, 30).map(row => {
                    const ratio = row.ratio;
                    let signal = 'Balanced Valuation (50 - 70)';
                    let color = 'text-slate-600';
                    if (ratio >= 80) {
                      signal = 'Silver Highly Undervalued (>80)';
                      color = 'text-amber-700 font-bold';
                    } else if (ratio <= 40) {
                      signal = 'Silver Outperformance (<40)';
                      color = 'text-emerald-700 font-bold';
                    }
                    return (
                      <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{row.year}</td>
                        <td className="py-3.5 px-4 text-slate-900 font-bold text-right whitespace-nowrap">{fmtUSD(row.gold.avg)}</td>
                        <td className="py-3.5 px-4 text-slate-800 font-bold text-right whitespace-nowrap">{row.silver ? fmtUSD(row.silver.avg) : '-'}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900 text-right whitespace-nowrap">{ratio.toFixed(1)}:1</td>
                        <td className={`py-3.5 px-4 text-right text-xs whitespace-nowrap ${color}`}>{signal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: 50Y GROWTH (CAGR)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'cagr' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Compound Annual Growth Rate (CAGR)</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase">5-Year CAGR</span>
                <p className="text-lg font-black text-emerald-700 mt-1">+{initialData.cagr.gold.fiveYear}% / yr</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Silver: +{initialData.cagr.silver.fiveYear}%</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase">10-Year CAGR</span>
                <p className="text-lg font-black text-emerald-700 mt-1">+{initialData.cagr.gold.tenYear}% / yr</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Silver: +{initialData.cagr.silver.tenYear}%</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase">20-Year CAGR</span>
                <p className="text-lg font-black text-emerald-700 mt-1">+{initialData.cagr.gold.twentyYear}% / yr</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Silver: +{initialData.cagr.silver.twentyYear}%</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase">50-Year CAGR</span>
                <p className="text-lg font-black text-emerald-700 mt-1">+{initialData.cagr.gold.fiftyYear}% / yr</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Silver: +{initialData.cagr.silver.fiftyYear}%</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Year</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Close</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Annual Return</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Close</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Annual Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mergedRecords.slice(0, 30).map(row => (
                    <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{row.year}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">{fmtUSD(row.gold.close)}</td>
                      <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                        <span className={row.gold.returnPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {row.gold.returnPct >= 0 ? '+' : ''}{row.gold.returnPct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">{row.silver ? fmtUSD(row.silver.close) : '-'}</td>
                      <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                        <span className={(row.silver?.returnPct || 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {(row.silver?.returnPct || 0) >= 0 ? '+' : ''}{(row.silver?.returnPct || 0).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
