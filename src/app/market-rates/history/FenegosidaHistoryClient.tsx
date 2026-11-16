'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import NepaliDate from 'nepali-date-converter';

// ── Types ──────────────────────────────────────────────────────────────────────
interface DayRecord {
  date: string;
  date_bs: string | null;
  gold_tola: number | null;
  gold_10g: number | null;
  silver_tola: number | null;
  silver_10g: number | null;
}

interface MonthlyRecord {
  year_bs: number;
  month_bs: number;
  month_name: string;
  ad_start_date: string;
  days_in_month: number;
  daily_count?: number;
  month_minmax: {
    gold_tola?: { min: number; max: number };
    gold_10g?: { min: number; max: number };
    silver_tola?: { min: number; max: number };
    silver_10g?: { min: number; max: number };
  };
  daily_records: Array<{
    date_ad: string;
    gold_tola?: number;
    gold_10g?: number;
    silver_tola?: number;
    silver_10g?: number;
  }>;
}

interface YearData {
  year_bs: number;
  year_minmax: {
    gold_tola?: { min: number; max: number };
    gold_10g?: { min: number; max: number };
    silver_tola?: { min: number; max: number };
    silver_10g?: { min: number; max: number };
  };
  months: Record<string, MonthlyRecord>;
}

type TabType = 'byday' | 'bymonth' | 'weekminmax' | 'monthminmax' | 'yearminmax';
type UnitType = 'gram' | 'tola';

const BS_MONTH_NAMES_NP = [
  'बैशाख','जेठ','असार','श्रावण','भाद्र','असोज','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत'
];
const BS_MONTHS_EN = [
  'Baishakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'
];
const BS_YEARS = Array.from({ length: 14 }, (_, i) => 2070 + i).reverse(); // 2083 → 2070

const fmtNPR = (v: number | null | undefined) =>
  v == null || isNaN(v) ? '—' : 'NPR ' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(v);

// Convert AD date to Nepali Bikram Sambat string matching official format: "असोज 15, 2083"
function formatNepaliDateBS(dateAd: string): string {
  try {
    const d = new Date(dateAd);
    if (isNaN(d.getTime())) return dateAd;
    const np = new NepaliDate(d);
    const bs = np.getBS();
    const mName = BS_MONTH_NAMES_NP[bs.month] || '';
    return `${mName} ${bs.date}, ${bs.year}`;
  } catch {
    return dateAd;
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function FenegosidaHistoryClient({
  dailyHistory: initialDailyHistory,
  encodedPayload,
}: {
  dailyHistory: DayRecord[];
  encodedPayload: string;
}) {
  const [tab, setTab] = useState<TabType>('byday');
  const [unit, setUnit] = useState<UnitType>('gram'); // Default to Grams matching user screenshot
  const [dailyHistory, setDailyHistory] = useState<DayRecord[]>(initialDailyHistory);
  const [dailyPage, setDailyPage] = useState(1);
  const rowsPerPage = 30;

  // Dynamic real-time fetch to keep prices updated dynamically
  useEffect(() => {
    fetch('/data/daily-history.json')
      .then(res => res.json())
      .then((liveHistory: DayRecord[]) => {
        if (Array.isArray(liveHistory) && liveHistory.length > 0) {
          setDailyHistory(prev => {
            const map = new Map<string, DayRecord>();
            // Keep all historical records (2013 to today)
            prev.forEach(r => map.set(r.date, r));
            // Overlay any newly published live rates
            liveHistory.forEach(r => {
              const existing = map.get(r.date);
              map.set(r.date, {
                ...existing,
                ...r,
                date: r.date,
                gold_tola: r.gold_tola ?? (r as any).gold ?? existing?.gold_tola ?? null,
                silver_tola: r.silver_tola ?? (r as any).silver ?? existing?.silver_tola ?? null,
              });
            });
            return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
          });
        }
      })
      .catch(() => {});
  }, []);

  // Decode obfuscated payload in client memory only
  const monthlyData = useMemo<Record<string, YearData>>(() => {
    try {
      if (!encodedPayload) return {};
      const decodedStr = typeof window !== 'undefined'
        ? window.atob(encodedPayload)
        : Buffer.from(encodedPayload, 'base64').toString('utf8');
      const raw = JSON.parse(decodedStr);
      const result: Record<string, YearData> = {};

      for (const yr of Object.keys(raw)) {
        const y = raw[yr];
        result[yr] = {
          year_bs: Number(yr),
          year_minmax: {
            gold_tola: { min: y.ymm[0], max: y.ymm[1] },
            gold_10g: { min: y.ymm[2], max: y.ymm[3] },
            silver_tola: { min: y.ymm[4], max: y.ymm[5] },
            silver_10g: { min: y.ymm[6], max: y.ymm[7] },
          },
          months: {}
        };
        for (const mo of Object.keys(y.m)) {
          const m = y.m[mo];
          result[yr].months[mo] = {
            year_bs: Number(yr),
            month_bs: Number(mo),
            month_name: BS_MONTHS_EN[Number(mo) - 1],
            ad_start_date: m.d[0] ? m.d[0][0] : '',
            days_in_month: m.d.length,
            daily_count: m.d.length,
            month_minmax: {
              gold_tola: { min: m.mmm[0], max: m.mmm[1] },
              gold_10g: { min: m.mmm[2], max: m.mmm[3] },
              silver_tola: { min: m.mmm[4], max: m.mmm[5] },
              silver_10g: { min: m.mmm[6], max: m.mmm[7] },
            },
            daily_records: (m.d || []).map((row: any) => ({
              date_ad: row[0],
              gold_tola: row[1],
              gold_10g: row[2],
              silver_tola: row[3],
              silver_10g: row[4],
            }))
          };
        }
      }
      return result;
    } catch {
      return {};
    }
  }, [encodedPayload]);

  // By Month filters (Default 2083 Kartik matching user screenshot)
  const [selYear, setSelYear] = useState(2083);
  const [selMonth, setSelMonth] = useState(7); // कार्तिक
  const [monthResult, setMonthResult] = useState<MonthlyRecord | null>(null);

  // Month Min/Max filters
  const [mmYear, setMmYear] = useState(2083);
  const [mmMonth, setMmMonth] = useState(7);
  const [mmResult, setMmResult] = useState<{ month: MonthlyRecord } | null>(null);

  // Year Min/Max filters
  const [ymYear, setYmYear] = useState(2083);
  const [ymResult, setYmResult] = useState<YearData | null>(null);

  // Week Min/Max filters
  const [wmYear, setWmYear] = useState(2083);
  const [wmMonth, setWmMonth] = useState(7);
  const [wmWeek, setWmWeek] = useState('latest');
  const [weekResult, setWeekResult] = useState<DayRecord[] | null>(null);

  // Handlers
  const handleByMonthSearch = useCallback((year: number, month: number) => {
    const yr = monthlyData[String(year)];
    if (!yr) return setMonthResult(null);
    const mo = yr.months[String(month)];
    setMonthResult(mo ?? null);
  }, [monthlyData]);

  const handleMmSearch = useCallback((year: number, month: number) => {
    const yr = monthlyData[String(year)];
    if (!yr) return setMmResult(null);
    const mo = yr.months[String(month)];
    if (!mo) return setMmResult(null);
    setMmResult({ month: mo });
  }, [monthlyData]);

  const handleYmSearch = useCallback((year: number) => {
    const yr = monthlyData[String(year)];
    setYmResult(yr ?? null);
  }, [monthlyData]);

  const handleWeekSearch = useCallback((year: number, month: number, week: string) => {
    if (week === 'latest') {
      setWeekResult(dailyHistory.slice(0, 7));
      return;
    }
    const yr = monthlyData[String(year)];
    if (!yr) {
      setWeekResult(null);
      return;
    }
    const mo = yr.months[String(month)];
    if (!mo || !mo.daily_records || mo.daily_records.length === 0) {
      setWeekResult(null);
      return;
    }

    const weekMap: Record<string, [number, number]> = {
      w1: [1, 7],
      w2: [8, 14],
      w3: [15, 21],
      w4: [22, 28],
      w5: [29, 32],
    };
    const range = weekMap[week] || [1, 32];
    const sorted = [...mo.daily_records].sort((a, b) => a.date_ad.localeCompare(b.date_ad));

    const filtered = sorted.filter((r, idx) => {
      try {
        const d = new Date(r.date_ad);
        const np = new NepaliDate(d);
        const bsDay = np.getBS().date;
        return bsDay >= range[0] && bsDay <= range[1];
      } catch {
        const sliceIdx = idx + 1;
        return sliceIdx >= range[0] && sliceIdx <= range[1];
      }
    });

    const dayRecords: DayRecord[] = filtered.map(r => ({
      date: r.date_ad,
      date_bs: null,
      gold_tola: r.gold_tola ?? null,
      gold_10g: r.gold_10g ?? null,
      silver_tola: r.silver_tola ?? null,
      silver_10g: r.silver_10g ?? null,
    }));

    setWeekResult(dayRecords.length > 0 ? dayRecords : null);
  }, [monthlyData, dailyHistory]);

  // Load initial data
  useEffect(() => {
    if (Object.keys(monthlyData).length > 0) {
      handleByMonthSearch(selYear, selMonth);
    }
  }, [monthlyData, selYear, selMonth, handleByMonthSearch]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'byday', label: 'By Day' },
    { id: 'bymonth', label: 'By Month' },
    { id: 'weekminmax', label: 'Week Min/Max' },
    { id: 'monthminmax', label: 'Month Min/Max' },
    { id: 'yearminmax', label: 'Year Min/Max' },
  ];

  return (
    <div className="w-full relative">

      {/* ── Official FENEGOSIDA Style Header ── */}
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
                if (t.id === 'weekminmax') handleWeekSearch(wmYear, wmMonth, wmWeek);
                if (t.id === 'monthminmax') handleMmSearch(mmYear, mmMonth);
                if (t.id === 'yearminmax') handleYmSearch(ymYear);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all ${
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
            TAB: BY MONTH (Default & Primary Explorer)
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'bymonth' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Month</h3>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={selYear}
                  onChange={e => setSelYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[100px]"
                >
                  {BS_YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              {/* Month Dropdown in Nepali */}
              <div className="relative">
                <select
                  value={selMonth}
                  onChange={e => setSelMonth(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[120px]"
                >
                  {BS_MONTH_NAMES_NP.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{name}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>

              {/* Search Button */}
              <button
                onClick={() => handleByMonthSearch(selYear, selMonth)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {/* Grams / Tola Toggle */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner">
                <button
                  type="button"
                  onClick={() => setUnit('gram')}
                  className={`px-7 py-1.5 rounded-full text-sm font-bold transition-all ${
                    unit === 'gram'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('tola')}
                  className={`px-7 py-1.5 rounded-full text-sm font-bold transition-all ${
                    unit === 'tola'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Tola
                </button>
              </div>
            </div>

            {/* Official Data Table */}
            {monthResult ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="border-b border-slate-200 text-xs font-bold text-slate-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-left">Date (B.S.)</th>
                      <th scope="col" className="py-3 px-4 text-left">Date (A.D.)</th>
                      <th scope="col" className="py-3 px-4 text-right">Fine Gold (9999)</th>
                      <th scope="col" className="py-3 px-4 text-right">Silver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(monthResult.daily_records || []).map((row, i) => {
                      const goldVal = unit === 'tola' ? row.gold_tola : row.gold_10g;
                      const silverVal = unit === 'tola' ? row.silver_tola : row.silver_10g;
                      return (
                        <tr key={row.date_ad || i} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                            {formatNepaliDateBS(row.date_ad)}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-sm whitespace-nowrap">
                            {row.date_ad}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                            {fmtNPR(goldVal)}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                            {fmtNPR(silverVal)}
                          </td>
                        </tr>
                      );
                    })}
                    {(!monthResult.daily_records || monthResult.daily_records.length === 0) && (
                      <tr>
                        <td colSpan={4} className="py-8 px-4 text-center text-slate-400">
                          No verified trading records available for this month.
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
            TAB: BY DAY
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'byday' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Rate History by Day</h3>
            
            {/* Grams / Tola Toggle */}
            <div className="flex justify-center my-6">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner">
                <button
                  type="button"
                  onClick={() => setUnit('gram')}
                  className={`px-7 py-1.5 rounded-full text-sm font-bold transition-all ${
                    unit === 'gram'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Grams
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('tola')}
                  className={`px-7 py-1.5 rounded-full text-sm font-bold transition-all ${
                    unit === 'tola'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  Tola
                </button>
              </div>
            </div>

            {(() => {
              const totalEntries = dailyHistory.length;
              const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
              const startEntry = totalEntries === 0 ? 0 : (dailyPage - 1) * rowsPerPage + 1;
              const endEntry = Math.min(dailyPage * rowsPerPage, totalEntries);
              const paginatedRows = dailyHistory.slice((dailyPage - 1) * rowsPerPage, dailyPage * rowsPerPage);

              const getPageNumbers = () => {
                const range: (number | string)[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) range.push(i);
                  return range;
                }

                if (dailyPage <= 4) {
                  for (let i = 1; i <= 5; i++) range.push(i);
                  range.push('...');
                  range.push(totalPages);
                } else if (dailyPage >= totalPages - 3) {
                  range.push(1);
                  range.push('...');
                  for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
                } else {
                  range.push(1);
                  range.push('...');
                  range.push(dailyPage - 1);
                  range.push(dailyPage);
                  range.push(dailyPage + 1);
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
                          <th scope="col" className="py-3 px-4 text-left">Date (B.S.)</th>
                          <th scope="col" className="py-3 px-4 text-left">Date (A.D.)</th>
                          <th scope="col" className="py-3 px-4 text-right">Fine Gold (9999)</th>
                          <th scope="col" className="py-3 px-4 text-right">Silver</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedRows.map(row => (
                          <tr key={row.date} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                              {row.date_bs || formatNepaliDateBS(row.date)}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{row.date}</td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                              {fmtNPR(unit === 'tola' ? row.gold_tola : row.gold_10g)}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                              {fmtNPR(unit === 'tola' ? row.silver_tola : row.silver_10g)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination footer matching exact user screenshot */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-200 text-sm text-slate-600">
                    <div>
                      Showing {startEntry} to {endEntry} of {totalEntries} entries
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center gap-1 select-none flex-wrap">
                        <button
                          type="button"
                          onClick={() => setDailyPage(p => Math.max(1, p - 1))}
                          disabled={dailyPage === 1}
                          className="px-2.5 py-1 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>

                        {getPageNumbers().map((p, idx) => {
                          if (p === '...') {
                            return (
                              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400">
                                ...
                              </span>
                            );
                          }

                          const pageNum = Number(p);
                          const isActive = pageNum === dailyPage;

                          return (
                            <button
                              key={`page-${pageNum}`}
                              type="button"
                              onClick={() => setDailyPage(pageNum)}
                              className={`min-w-[32px] h-8 px-2 text-sm rounded transition-all ${
                                isActive
                                  ? 'bg-gradient-to-b from-white to-slate-100 border border-slate-300 font-bold text-slate-900 shadow-sm'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => setDailyPage(p => Math.min(totalPages, p + 1))}
                          disabled={dailyPage === totalPages}
                          className="px-2.5 py-1 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
            TAB: WEEK MIN/MAX
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'weekminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Week [Maximum to Minimum]</h3>

            {(() => {
              const weekRecords = (weekResult && weekResult.length > 0) ? weekResult : dailyHistory.slice(0, 7);
              const goldTolas = weekRecords.map(r => r.gold_tola).filter((v): v is number => v != null);
              const gold10gs  = weekRecords.map(r => r.gold_10g).filter((v): v is number => v != null);
              const silvTolas = weekRecords.map(r => r.silver_tola).filter((v): v is number => v != null);
              const silv10gs  = weekRecords.map(r => r.silver_10g).filter((v): v is number => v != null);

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Per 1 Tola */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Tola</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={goldTolas.length ? Math.min(...goldTolas) : null}
                      max={goldTolas.length ? Math.max(...goldTolas) : null}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={silvTolas.length ? Math.min(...silvTolas) : null}
                      max={silvTolas.length ? Math.max(...silvTolas) : null}
                    />
                  </div>
                  {/* Per 10 Grams */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={gold10gs.length ? Math.min(...gold10gs) : null}
                      max={gold10gs.length ? Math.max(...gold10gs) : null}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={silv10gs.length ? Math.min(...silv10gs) : null}
                      max={silv10gs.length ? Math.max(...silv10gs) : null}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: MONTH MIN/MAX
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'monthminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Month [Maximum to Minimum]</h3>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative">
                <select
                  value={mmYear}
                  onChange={e => setMmYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[100px]"
                >
                  {BS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>
              <div className="relative">
                <select
                  value={mmMonth}
                  onChange={e => setMmMonth(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[120px]"
                >
                  {BS_MONTH_NAMES_NP.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{name}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>
              <button
                onClick={() => handleMmSearch(mmYear, mmMonth)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {mmResult ? (() => {
              const records = mmResult.month.daily_records || [];
              let maxGT: any = null, minGT: any = null;
              let maxG10: any = null, minG10: any = null;
              let maxST: any = null, minST: any = null;
              let maxS10: any = null, minS10: any = null;

              records.forEach(r => {
                if (r.gold_tola != null) {
                  if (!maxGT || r.gold_tola > maxGT.gold_tola) maxGT = r;
                  if (!minGT || r.gold_tola < minGT.gold_tola) minGT = r;
                }
                if (r.gold_10g != null) {
                  if (!maxG10 || r.gold_10g > maxG10.gold_10g) maxG10 = r;
                  if (!minG10 || r.gold_10g < minG10.gold_10g) minG10 = r;
                }
                if (r.silver_tola != null) {
                  if (!maxST || r.silver_tola > maxST.silver_tola) maxST = r;
                  if (!minST || r.silver_tola < minST.silver_tola) minST = r;
                }
                if (r.silver_10g != null) {
                  if (!maxS10 || r.silver_10g > maxS10.silver_10g) maxS10 = r;
                  if (!minS10 || r.silver_10g < minS10.silver_10g) minS10 = r;
                }
              });

              const fmtMDate = (r: any) => r ? `${formatNepaliDateBS(r.date_ad)} (${r.date_ad})` : '';

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Tola</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={mmResult.month.month_minmax.gold_tola?.min}
                      max={mmResult.month.month_minmax.gold_tola?.max}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={mmResult.month.month_minmax.silver_tola?.min}
                      max={mmResult.month.month_minmax.silver_tola?.max}
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={mmResult.month.month_minmax.gold_10g?.min}
                      max={mmResult.month.month_minmax.gold_10g?.max}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={mmResult.month.month_minmax.silver_10g?.min}
                      max={mmResult.month.month_minmax.silver_10g?.max}
                    />
                  </div>
                </div>
              );
            })() : (
              <p className="text-slate-400 text-sm text-center py-8">Select year and month then click Search.</p>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: YEAR MIN/MAX
        ══════════════════════════════════════════════════════════════ */}
        {tab === 'yearminmax' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5">Rate History by Year [Maximum to Minimum]</h3>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative">
                <select
                  value={ymYear}
                  onChange={e => setYmYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer min-w-[100px]"
                >
                  {BS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <span className="absolute right-3 top-3 pointer-events-none text-xs text-slate-400">▼</span>
              </div>
              <button
                onClick={() => handleYmSearch(ymYear)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>

            {ymResult ? (() => {
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 1 Tola</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={ymResult.year_minmax.gold_tola?.min}
                      max={ymResult.year_minmax.gold_tola?.max}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={ymResult.year_minmax.silver_tola?.min}
                      max={ymResult.year_minmax.silver_tola?.max}
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Per 10 Grams</h4>
                    <MinMaxCard
                      label="Fine Gold (9999)"
                      min={ymResult.year_minmax.gold_10g?.min}
                      max={ymResult.year_minmax.gold_10g?.max}
                    />
                    <MinMaxCard
                      label="Silver"
                      min={ymResult.year_minmax.silver_10g?.min}
                      max={ymResult.year_minmax.silver_10g?.max}
                    />
                  </div>
                </div>
              );
            })() : (
              <p className="text-slate-400 text-sm text-center py-8">Select a year then click Search.</p>
            )}
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
        className="fixed bottom-6 right-6 w-11 h-11 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-30 font-bold text-lg"
        aria-label="Scroll to top"
      >
        ↑
      </button>

    </div>
  );
}

// ── Reusable Min/Max Card with Green Up and Red Down Arrows ─────────────────────
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
          <div className="font-extrabold text-slate-900 text-sm">{fmtNPR(max ?? null)}</div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
          <span className="text-base leading-none font-black text-rose-500">↓</span>
          <span>Min</span>
        </span>
        <div className="text-right">
          <div className="font-extrabold text-slate-900 text-sm">{fmtNPR(min ?? null)}</div>
        </div>
      </div>
    </div>
  );
}
