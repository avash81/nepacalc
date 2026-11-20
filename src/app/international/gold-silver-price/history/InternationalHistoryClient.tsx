'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ChevronDown, Search, Loader2 } from 'lucide-react';

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

type TabType =
  | 'daily'
  | 'bymonth'
  | 'weekminmax'
  | 'monthminmax'
  | 'yearminmax'
  | 'byyear'
  | 'bydecade'
  | 'ratio'
  | 'cagr';

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

const MONTH_NAMES_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatMonthLabel(mStr: string): string {
  if (!mStr) return '-';
  const parts = mStr.split('M');
  if (parts.length === 2) {
    const yr = parts[0];
    const mIdx = parseInt(parts[1], 10) - 1;
    const mName = MONTH_NAMES_FULL[mIdx] || parts[1];
    return `${mName} ${yr}`;
  }
  return mStr;
}

export default function InternationalHistoryClient({
  initialData,
  currentLiveRates,
}: {
  initialData: InternationalHistoryDataset;
  currentLiveRates: { goldUSD: number; silverUSD: number };
}) {
  // Default to By Day (Daily) matching Nepal page screenshot
  const [tab, setTab] = useState<TabType>('daily');
  const [unit, setUnit] = useState<UnitType>('oz');
  const [selYear, setSelYear] = useState<string>('all');
  const [metalFilter, setMetalFilter] = useState<'both' | 'gold' | 'silver'>('both');
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  // ── Daily Tab State ──
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [dailyLoading, setDailyLoading] = useState(false);
  const [dailyYear, setDailyYear] = useState<string>('2026');
  const [dailySearch, setDailySearch] = useState<string>('');
  const [dailyPage, setDailyPage] = useState(1);
  const dailyRowsPerPage = 25;

  // Load daily rates whenever on daily, weekminmax, monthminmax, or bymonth
  useEffect(() => {
    if (['daily', 'weekminmax', 'monthminmax', 'bymonth'].includes(tab) && dailyData.length === 0 && !dailyLoading) {
      setDailyLoading(true);
      fetch('/data/international-daily-rates.json')
        .then(res => res.json())
        .then(json => {
          if (json && json.data) {
            setDailyData(json.data);
          }
        })
        .catch(err => console.error('Failed to load daily rates:', err))
        .finally(() => setDailyLoading(false));
    }
  }, [tab, dailyData.length, dailyLoading]);

  const availableDailyYears = useMemo(() => {
    const setYears = new Set<number>();
    dailyData.forEach(r => { if (r.year) setYears.add(r.year); });
    const sorted = Array.from(setYears).sort((a, b) => b - a);
    return sorted.length > 0 ? sorted : [2026, 2025, 2024, 2023, 2022, 2021, 2020];
  }, [dailyData]);

  const filteredDaily = useMemo(() => {
    let list = dailyData;
    if (dailyYear !== 'all') {
      const yr = parseInt(dailyYear, 10);
      list = list.filter(r => r.year === yr);
    }
    if (dailySearch.trim()) {
      const q = dailySearch.trim().toLowerCase();
      list = list.filter(r => r.date && r.date.toLowerCase().includes(q));
    }
    return list;
  }, [dailyData, dailyYear, dailySearch]);

  const totalDailyPages = Math.ceil(filteredDaily.length / dailyRowsPerPage) || 1;
  const pagedDaily = useMemo(() => {
    const start = (dailyPage - 1) * dailyRowsPerPage;
    return filteredDaily.slice(start, start + dailyRowsPerPage);
  }, [filteredDaily, dailyPage]);

  const handleDailyYearChange = (yr: string) => {
    setDailyYear(yr);
    setDailyPage(1);
  };

  // ── Monthly Data & Filters ──
  const [bmYear, setBmYear] = useState<number>(2026);
  const [bmMonth, setBmMonth] = useState<number>(11);
  const [bmResult, setBmResult] = useState<{
    year: number;
    month: number;
    records: any[];
  } | null>(null);

  const handleByMonthSearch = (yr: number, mo: number) => {
    const padMonth = String(mo).padStart(2, '0');
    const monthKey = `${yr}-${padMonth}`;
    const recs = dailyData.filter(r => r.year === yr && r.month === monthKey);
    setBmResult({
      year: yr,
      month: mo,
      records: recs,
    });
  };

  useEffect(() => {
    if (dailyData.length > 0 && !bmResult) {
      handleByMonthSearch(bmYear, bmMonth);
    }
  }, [dailyData, bmResult]);

  // ── Week Min/Max Calculation (Last 7 Trading Days) ──
  const weekData = useMemo(() => {
    if (!dailyData || dailyData.length === 0) return null;
    const recs = dailyData.slice(0, 7);
    const goldHighs = recs.map(r => r.gold_high || r.gold).filter(Boolean);
    const goldLows = recs.map(r => r.gold_low || r.gold).filter(Boolean);
    const silverHighs = recs.map(r => r.silver_high || r.silver).filter(Boolean);
    const silverLows = recs.map(r => r.silver_low || r.silver).filter(Boolean);

    return {
      goldMax: Math.max(...goldHighs),
      goldMin: Math.min(...goldLows),
      silverMax: Math.max(...silverHighs),
      silverMin: Math.min(...silverLows),
      startDate: recs[recs.length - 1]?.date,
      endDate: recs[0]?.date,
    };
  }, [dailyData]);

  // ── Month Min/Max State ──
  const [mmYear, setMmYear] = useState<number>(2026);
  const [mmMonth, setMmMonth] = useState<number>(11);
  const [mmResult, setMmResult] = useState<{
    year: number;
    month: number;
    goldMax: number;
    goldMin: number;
    silverMax: number;
    silverMin: number;
    count: number;
  } | null>(null);

  const handleMmSearch = (yr: number, mo: number) => {
    const padMonth = String(mo).padStart(2, '0');
    const monthKey = `${yr}-${padMonth}`;
    const recs = dailyData.filter(r => r.year === yr && r.month === monthKey);

    if (recs.length > 0) {
      const gH = recs.map(r => r.gold_high || r.gold).filter(Boolean);
      const gL = recs.map(r => r.gold_low || r.gold).filter(Boolean);
      const sH = recs.map(r => r.silver_high || r.silver).filter(Boolean);
      const sL = recs.map(r => r.silver_low || r.silver).filter(Boolean);
      setMmResult({
        year: yr,
        month: mo,
        goldMax: Math.max(...gH),
        goldMin: Math.min(...gL),
        silverMax: Math.max(...sH),
        silverMin: Math.min(...sL),
        count: recs.length,
      });
    } else {
      setMmResult(null);
    }
  };

  useEffect(() => {
    if (dailyData.length > 0 && !mmResult) {
      handleMmSearch(mmYear, mmMonth);
    }
  }, [dailyData, mmResult]);

  // ── Year Min/Max State (1970 - 2026) ──
  const [ymYear, setYmYear] = useState<number>(2026);
  const [ymResult, setYmResult] = useState<{
    year: number;
    goldHigh: number;
    goldLow: number;
    silverHigh: number;
    silverLow: number;
    returnPct: number;
  } | null>(() => {
    const g = (initialData.goldYearly || []).find(r => r.year === 2026);
    const s = (initialData.silverYearly || []).find(r => r.year === 2026);
    return g ? {
      year: 2026,
      goldHigh: g.high,
      goldLow: g.low,
      silverHigh: s?.high || 0,
      silverLow: s?.low || 0,
      returnPct: g.returnPct,
    } : null;
  });

  const handleYmSearch = (yr: number) => {
    const g = (initialData.goldYearly || []).find(r => r.year === yr);
    const s = (initialData.silverYearly || []).find(r => r.year === yr);
    if (g) {
      setYmResult({
        year: yr,
        goldHigh: g.high,
        goldLow: g.low,
        silverHigh: s?.high || 0,
        silverLow: s?.low || 0,
        returnPct: g.returnPct,
      });
    } else {
      setYmResult(null);
    }
  };

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

  // Tabs matching Nepal history sequence exactly: By Day, By Month, Week Min/Max, Month Min/Max, Year Min/Max
  const tabs: { id: TabType; label: string }[] = [
    { id: 'daily', label: 'By Day' },
    { id: 'bymonth', label: 'By Month' },
    { id: 'weekminmax', label: 'Week Min/Max' },
    { id: 'monthminmax', label: 'Month Min/Max' },
    { id: 'yearminmax', label: 'Year Min/Max' },
    { id: 'byyear', label: 'By Year' },
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

      {/* ── Sub-tabs Pills (Matching Nepal layout exactly) ── */}
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
            TAB 1: BY DAY (Daily Rates 2000 - 2026)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'daily' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Daily Gold &amp; Silver Rates (COMEX Benchmark)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official daily trading sessions (2000 - 2026). Continuous electronic COMEX futures in USD.
                </p>
              </div>
              <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {filteredDaily.length.toLocaleString()} Trading Days
              </span>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="relative">
                <select
                  value={dailyYear}
                  onChange={e => handleDailyYearChange(e.target.value)}
                  className="appearance-none bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[170px]"
                >
                  <option value="all">All Years (2000 - 2026)</option>
                  {availableDailyYears.map(yr => (
                    <option key={yr} value={String(yr)}>Year {yr}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter by date (e.g. 2026-11)..."
                  value={dailySearch}
                  onChange={e => {
                    setDailySearch(e.target.value);
                    setDailyPage(1);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {(dailyYear !== 'all' || dailySearch) && (
                <button
                  type="button"
                  onClick={() => {
                    setDailyYear('all');
                    setDailySearch('');
                    setDailyPage(1);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Unit Toggle */}
            <div className="flex justify-center my-5">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner flex-wrap justify-center">
                {(['oz', 'gram', '10g', 'kg'] as UnitType[]).map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      unit === u
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 font-semibold'
                    }`}
                  >
                    {u === 'oz' ? 'Troy Ounce' : u === 'gram' ? 'Grams' : u === '10g' ? '10 Grams' : 'Kilogram'}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {dailyLoading && (
              <div className="py-16 text-center">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700">Loading daily COMEX historical sessions...</p>
                <p className="text-xs text-slate-400 mt-1">Extracting 6,586 trading records</p>
              </div>
            )}

            {/* Daily Table */}
            {!dailyLoading && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-slate-50/75">
                      <th scope="col" className="py-3 px-4 text-left">Trading Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Gold Close {unitLabel}</th>
                      <th scope="col" className="py-3 px-4 text-right">Gold High / Low</th>
                      <th scope="col" className="py-3 px-4 text-right">Silver Close {unitLabel}</th>
                      <th scope="col" className="py-3 px-4 text-right">Silver High / Low</th>
                      <th scope="col" className="py-3 px-4 text-right">Gold-Silver Ratio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {pagedDaily.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                          No daily trading sessions match your search criteria.
                        </td>
                      </tr>
                    ) : (
                      pagedDaily.map((row, idx) => {
                        const gClose = row.gold ? fmtUSD(row.gold * multiplier) : '-';
                        const gHigh = row.gold_high ? fmtUSD(row.gold_high * multiplier) : '-';
                        const gLow = row.gold_low ? fmtUSD(row.gold_low * multiplier) : '-';
                        const sClose = row.silver ? fmtUSD(row.silver * multiplier) : '-';
                        const sHigh = row.silver_high ? fmtUSD(row.silver_high * multiplier) : '-';
                        const sLow = row.silver_low ? fmtUSD(row.silver_low * multiplier) : '-';
                        const ratioStr = row.ratio ? `${row.ratio.toFixed(2)}:1` : '-';

                        return (
                          <tr key={row.date || idx} className="hover:bg-amber-50/20 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                              {row.date}
                            </td>
                            <td className="py-3 px-4 font-bold text-amber-950 text-right whitespace-nowrap">
                              {gClose}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-right whitespace-nowrap text-xs">
                              <span className="text-emerald-700 font-semibold">{gHigh}</span>
                              <span className="mx-1 text-slate-300">/</span>
                              <span className="text-rose-700 font-semibold">{gLow}</span>
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800 text-right whitespace-nowrap">
                              {sClose}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-right whitespace-nowrap text-xs">
                              <span className="text-emerald-700 font-semibold">{sHigh}</span>
                              <span className="mx-1 text-slate-300">/</span>
                              <span className="text-rose-700 font-semibold">{sLow}</span>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap font-semibold text-slate-700">
                              {ratioStr}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalDailyPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div>
                      Showing{' '}
                      <span className="font-bold text-slate-900">
                        {Math.min(filteredDaily.length, (dailyPage - 1) * dailyRowsPerPage + 1)}
                      </span>
                      {' '}to{' '}
                      <span className="font-bold text-slate-900">
                        {Math.min(filteredDaily.length, dailyPage * dailyRowsPerPage)}
                      </span>
                      {' '}of{' '}
                      <span className="font-bold text-slate-900">{filteredDaily.length.toLocaleString()}</span>
                      {' '}sessions
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDailyPage(p => Math.max(1, p - 1))}
                        disabled={dailyPage === 1}
                        className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Previous
                      </button>

                      <span className="px-3 py-1.5 text-xs font-bold text-slate-800">
                        Page {dailyPage} of {totalDailyPages}
                      </span>

                      <button
                        type="button"
                        onClick={() => setDailyPage(p => Math.min(totalDailyPages, p + 1))}
                        disabled={dailyPage === totalDailyPages}
                        className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: BY MONTH (Matching Nepal Image 3)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'bymonth' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Month</h3>

            {/* Filter Controls (Year + Month + Search button matching Nepal Image 3) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative">
                <select
                  value={bmYear}
                  onChange={e => setBmYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[110px]"
                >
                  {Array.from({ length: 27 }, (_, i) => 2026 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              <div className="relative">
                <select
                  value={bmMonth}
                  onChange={e => setBmMonth(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[140px]"
                >
                  {MONTH_NAMES_FULL.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{name}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              <button
                onClick={() => handleByMonthSearch(bmYear, bmMonth)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner">
                {(['oz', '10g', 'gram'] as UnitType[]).map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`px-7 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                      unit === u
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 font-semibold'
                    }`}
                  >
                    {u === 'oz' ? 'Troy Ounce' : u === '10g' ? '10 Grams' : 'Grams'}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Daily Table */}
            {bmResult ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="border-b border-slate-200 text-xs font-bold text-slate-700 bg-slate-50/75">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-left">Trading Date</th>
                      <th scope="col" className="py-3 px-4 text-right">Fine Gold (24K) {unitLabel}</th>
                      <th scope="col" className="py-3 px-4 text-right">Gold High / Low</th>
                      <th scope="col" className="py-3 px-4 text-right">Silver (999) {unitLabel}</th>
                      <th scope="col" className="py-3 px-4 text-right">Silver High / Low</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {(bmResult.records || []).map((row, i) => {
                      const gClose = row.gold ? fmtUSD(row.gold * multiplier) : '-';
                      const gHigh = row.gold_high ? fmtUSD(row.gold_high * multiplier) : '-';
                      const gLow = row.gold_low ? fmtUSD(row.gold_low * multiplier) : '-';
                      const sClose = row.silver ? fmtUSD(row.silver * multiplier) : '-';
                      const sHigh = row.silver_high ? fmtUSD(row.silver_high * multiplier) : '-';
                      const sLow = row.silver_low ? fmtUSD(row.silver_low * multiplier) : '-';

                      return (
                        <tr key={row.date || i} className="hover:bg-amber-50/20 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-amber-950 text-right whitespace-nowrap">
                            {gClose}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-right whitespace-nowrap text-xs">
                            <span className="text-emerald-700 font-semibold">{gHigh}</span>
                            <span className="mx-1 text-slate-300">/</span>
                            <span className="text-rose-700 font-semibold">{gLow}</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800 text-right whitespace-nowrap">
                            {sClose}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-right whitespace-nowrap text-xs">
                            <span className="text-emerald-700 font-semibold">{sHigh}</span>
                            <span className="mx-1 text-slate-300">/</span>
                            <span className="text-rose-700 font-semibold">{sLow}</span>
                          </td>
                        </tr>
                      );
                    })}
                    {(!bmResult.records || bmResult.records.length === 0) && (
                      <tr>
                        <td colSpan={5} className="py-8 px-4 text-center text-slate-400">
                          No verified daily trading sessions recorded for {MONTH_NAMES_FULL[bmMonth - 1]} {bmYear}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-400 text-sm text-center py-8">Select a year and month then click Search.</p>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: WEEK MIN/MAX (Matching Nepal Image 4)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'weekminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Rate History by Week [Maximum to Minimum]</h3>
            {weekData && (
              <p className="text-xs text-slate-500 mb-6">
                Active trading sessions window: <span className="font-semibold text-slate-700">{weekData.startDate}</span> to <span className="font-semibold text-slate-700">{weekData.endDate}</span>
              </p>
            )}

            {weekData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Per 1 Troy Ounce */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Troy Ounce</h4>
                  <MinMaxCard
                    label="Fine Gold (9999 / 24K)"
                    min={weekData.goldMin}
                    max={weekData.goldMax}
                  />
                  <MinMaxCard
                    label="Silver (999 Pure)"
                    min={weekData.silverMin}
                    max={weekData.silverMax}
                  />
                </div>

                {/* Per 10 Grams */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                  <MinMaxCard
                    label="Fine Gold (9999 / 24K)"
                    min={weekData.goldMin ? (weekData.goldMin / TROY_OZ_TO_GRAMS) * 10 : null}
                    max={weekData.goldMax ? (weekData.goldMax / TROY_OZ_TO_GRAMS) * 10 : null}
                  />
                  <MinMaxCard
                    label="Silver (999 Pure)"
                    min={weekData.silverMin ? (weekData.silverMin / TROY_OZ_TO_GRAMS) * 10 : null}
                    max={weekData.silverMax ? (weekData.silverMax / TROY_OZ_TO_GRAMS) * 10 : null}
                  />
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">Loading weekly session benchmarks...</div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: MONTH MIN/MAX (Matching Nepal Image 5)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'monthminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Month [Maximum to Minimum]</h3>

            {/* Filter Controls (Year + Month + Search button) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative">
                <select
                  value={mmYear}
                  onChange={e => setMmYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[110px]"
                >
                  {Array.from({ length: 27 }, (_, i) => 2026 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              <div className="relative">
                <select
                  value={mmMonth}
                  onChange={e => setMmMonth(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[140px]"
                >
                  {MONTH_NAMES_FULL.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{name}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              <button
                onClick={() => handleMmSearch(mmYear, mmMonth)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {/* Min / Max Cards (Two Columns: Per 1 Troy Ounce and Per 10 Grams) */}
            {mmResult ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Troy Ounce</h4>
                  <MinMaxCard
                    label="Fine Gold (9999 / 24K)"
                    min={mmResult.goldMin}
                    max={mmResult.goldMax}
                  />
                  <MinMaxCard
                    label="Silver (999 Pure)"
                    min={mmResult.silverMin}
                    max={mmResult.silverMax}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                  <MinMaxCard
                    label="Fine Gold (9999 / 24K)"
                    min={mmResult.goldMin ? (mmResult.goldMin / TROY_OZ_TO_GRAMS) * 10 : null}
                    max={mmResult.goldMax ? (mmResult.goldMax / TROY_OZ_TO_GRAMS) * 10 : null}
                  />
                  <MinMaxCard
                    label="Silver (999 Pure)"
                    min={mmResult.silverMin ? (mmResult.silverMin / TROY_OZ_TO_GRAMS) * 10 : null}
                    max={mmResult.silverMax ? (mmResult.silverMax / TROY_OZ_TO_GRAMS) * 10 : null}
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm text-center py-8">Select a year and month then click Search.</p>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 5: YEAR MIN/MAX (Matching Nepal Image 6)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'yearminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Year [Maximum to Minimum]</h3>

            {/* Filter Controls (Year + Search button) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative">
                <select
                  value={ymYear}
                  onChange={e => setYmYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[120px]"
                >
                  {Array.from({ length: 57 }, (_, i) => 2026 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              <button
                onClick={() => handleYmSearch(ymYear)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {/* Min / Max Cards (Two Columns: Per 1 Troy Ounce and Per 10 Grams) */}
            {ymResult ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Troy Ounce</h4>
                    <MinMaxCard
                      label="Fine Gold (9999 / 24K)"
                      min={ymResult.goldLow}
                      max={ymResult.goldHigh}
                    />
                    <MinMaxCard
                      label="Silver (999 Pure)"
                      min={ymResult.silverLow}
                      max={ymResult.silverHigh}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                    <MinMaxCard
                      label="Fine Gold (9999 / 24K)"
                      min={ymResult.goldLow ? (ymResult.goldLow / TROY_OZ_TO_GRAMS) * 10 : null}
                      max={ymResult.goldHigh ? (ymResult.goldHigh / TROY_OZ_TO_GRAMS) * 10 : null}
                    />
                    <MinMaxCard
                      label="Silver (999 Pure)"
                      min={ymResult.silverLow ? (ymResult.silverLow / TROY_OZ_TO_GRAMS) * 10 : null}
                      max={ymResult.silverHigh ? (ymResult.silverHigh / TROY_OZ_TO_GRAMS) * 10 : null}
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Gold Trading Spread: </span>
                    <span className="font-bold text-slate-900">{fmtUSD(ymResult.goldHigh - ymResult.goldLow)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Annual Return: </span>
                    <span className={`font-bold ${ymResult.returnPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {ymResult.returnPct >= 0 ? '+' : ''}{ymResult.returnPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm text-center py-8">Select a year then click Search.</p>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 6: BY YEAR (Annual Historical Rates 1970 - 2026)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'byyear' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Year</h3>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
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
                  type="button"
                  onClick={() => handleYearChange('all')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Unit Toggle */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner flex-wrap justify-center">
                {(['oz', 'gram', '10g', 'kg'] as UnitType[]).map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`px-5 sm:px-7 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      unit === u
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 font-semibold'
                    }`}
                  >
                    {u === 'oz' ? 'Troy Ounce' : u === 'gram' ? 'Grams' : u === '10g' ? '10 Grams' : 'Kilogram'}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const totalEntries = filteredRecords.length;
              const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
              const startIdx = (page - 1) * rowsPerPage;
              const paginatedRows = filteredRecords.slice(startIdx, startIdx + rowsPerPage);
              const startEntry = totalEntries === 0 ? 0 : startIdx + 1;
              const endEntry = Math.min(startIdx + rowsPerPage, totalEntries);

              const getPageNumbers = () => {
                const nums: (number | string)[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) nums.push(i);
                } else {
                  nums.push(1);
                  if (page > 3) nums.push('...');
                  const s = Math.max(2, page - 1);
                  const e = Math.min(totalPages - 1, page + 1);
                  for (let i = s; i <= e; i++) nums.push(i);
                  if (page < totalPages - 2) nums.push('...');
                  nums.push(totalPages);
                }
                return nums;
              };

              return (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider bg-slate-50/75">
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

                  {/* Pagination footer */}
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
            TAB 7: BY DECADE
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'bydecade' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Precious Metals Performance by Decade</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider bg-slate-50/75">
                    <th scope="col" className="py-3 px-4 text-left">Decade</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Peak</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Low</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Mean</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Mean</th>
                    <th scope="col" className="py-3 px-4 text-right">Mean Ratio</th>
                    <th scope="col" className="py-3 px-4 text-right">Decade Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {decadeData.map((dec: any) => (
                    <tr key={dec.label} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{dec.label}</td>
                      <td className="py-3.5 px-4 text-amber-700 font-bold text-right whitespace-nowrap">{fmtUSD(dec.gPeak)}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-right whitespace-nowrap">{fmtUSD(dec.gTrough)}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">{fmtUSD(dec.gMean)}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">{fmtUSD(dec.sMean)}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 text-right whitespace-nowrap">{dec.ratio.toFixed(1)}:1</td>
                      <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap">
                        <span className={dec.netGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {dec.netGain >= 0 ? '+' : ''}{dec.netGain.toFixed(1)}%
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
            TAB 8: GOLD-SILVER RATIO
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'ratio' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Gold-to-Silver Ratio (GSR) History</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase">Current GSR Spot</span>
                <p className="text-2xl font-black text-amber-700 mt-1">
                  {(currentLiveRates.goldUSD / currentLiveRates.silverUSD).toFixed(1)}:1
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Ounces of silver to purchase 1 oz of gold</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase">50-Year Median Ratio</span>
                <p className="text-2xl font-black text-slate-800 mt-1">64.5:1</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Historical central equilibrium</p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase">All-Time Peak Ratio</span>
                <p className="text-2xl font-black text-slate-800 mt-1">125.1:1</p>
                <p className="text-[11px] text-slate-400 mt-0.5">March 2020 liquidity peak</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700 bg-slate-50/75">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Year</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Average</th>
                    <th scope="col" className="py-3 px-4 text-right">Ratio (GSR)</th>
                    <th scope="col" className="py-3 px-4 text-right">Market Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
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
            TAB 9: 50Y GROWTH (CAGR)
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
                <thead className="border-b border-slate-200 text-xs font-bold text-slate-700 bg-slate-50/75">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left">Year</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Close</th>
                    <th scope="col" className="py-3 px-4 text-right">Gold Annual Return</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Close</th>
                    <th scope="col" className="py-3 px-4 text-right">Silver Annual Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
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

      {/* ── Scroll to Top Floating Button (matching user screenshot) ── */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-6 right-6 w-11 h-11 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-30 font-bold text-lg cursor-pointer"
        aria-label="Scroll to top"
      >
        ↑
      </button>

    </div>
  );
}

// ── Reusable Min/Max Card with Green Up and Red Down Arrows (Matching Nepal exactly) ──
function MinMaxCard({
  label,
  min,
  max,
}: {
  label: string;
  min?: number | null;
  max?: number | null;
}) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-700 mb-4">{label}</p>
      
      <div className="flex justify-between items-center py-2 border-b border-slate-100">
        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
          <span className="text-base leading-none font-black text-emerald-500">↑</span>
          <span>Max</span>
        </span>
        <div className="text-right">
          <div className="font-extrabold text-slate-900 text-sm">{fmtUSD(max)}</div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
          <span className="text-base leading-none font-black text-rose-500">↓</span>
          <span>Min</span>
        </span>
        <div className="text-right">
          <div className="font-extrabold text-slate-900 text-sm">{fmtUSD(min)}</div>
        </div>
      </div>
    </div>
  );
}
