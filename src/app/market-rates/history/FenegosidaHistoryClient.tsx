'use client';

import React, { useState, useEffect, useCallback } from 'react';

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
type UnitType = 'tola' | 'gram';

const BS_MONTH_NAMES_NP = [
  'बैशाख','जेठ','असार','श्रावण','भाद्र','असोज','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत'
];
const BS_MONTHS_EN = [
  'Baishakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'
];
const BS_YEARS = Array.from({ length: 14 }, (_, i) => 2070 + i).reverse(); // 2083 → 2070

const fmtNPR = (v: number | null | undefined) =>
  v == null ? '—' : 'NPR ' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(v);

// ── Component ──────────────────────────────────────────────────────────────────
export default function FenegosidaHistoryClient({
  dailyHistory,
  monthlyData,
}: {
  dailyHistory: DayRecord[];
  monthlyData: Record<string, YearData>;
}) {
  const [tab, setTab] = useState<TabType>('bymonth');
  const [unit, setUnit] = useState<UnitType>('tola');

  // By Month filters
  const [selYear, setSelYear] = useState(2083);
  const [selMonth, setSelMonth] = useState(7); // Kartik
  const [monthResult, setMonthResult] = useState<MonthlyRecord | null>(null);

  // Month Min/Max filters
  const [mmYear, setMmYear] = useState(2083);
  const [mmMonth, setMmMonth] = useState(7);
  const [mmResult, setMmResult] = useState<{ month: MonthlyRecord } | null>(null);

  // Year Min/Max filters
  const [ymYear, setYmYear] = useState(2083);
  const [ymResult, setYmResult] = useState<YearData | null>(null);

  // Week Min/Max state (derived from daily)
  const [weekResult, setWeekResult] = useState<DayRecord[] | null>(null);

  // Load initial data
  useEffect(() => {
    handleByMonthSearch(selYear, selMonth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ──
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

  const handleWeekSearch = useCallback(() => {
    // Last 7 trading days from daily history
    setWeekResult(dailyHistory.slice(0, 7));
  }, [dailyHistory]);

  // ── Tab content ──
  const tabs: { id: TabType; label: string }[] = [
    { id: 'byday', label: 'By Day' },
    { id: 'bymonth', label: 'By Month' },
    { id: 'weekminmax', label: 'Week Min/Max' },
    { id: 'monthminmax', label: 'Month Min/Max' },
    { id: 'yearminmax', label: 'Year Min/Max' },
  ];

  const goldKey = unit === 'tola' ? 'gold_tola' : 'gold_10g';
  const silverKey = unit === 'tola' ? 'silver_tola' : 'silver_10g';
  const unitLabel = unit === 'tola' ? '1 Tola' : '10 Grams';

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">

      {/* ── Title ── */}
      <div className="text-center mb-8">
        <div className="text-3xl font-black text-amber-700 uppercase tracking-widest">HISTORY</div>
        <div className="w-12 h-1 bg-amber-600 mx-auto mt-2 rounded" />
      </div>

      {/* ── Tabs ── */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              if (t.id === 'weekminmax') handleWeekSearch();
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-t transition-colors ${
              tab === t.id
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Unit Toggle (Grams / Tola) ── */}
      {(tab === 'bymonth' || tab === 'byday') && (
        <div className="flex justify-center mb-5">
          <div className="inline-flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setUnit('gram')}
              className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${unit === 'gram' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-amber-700'}`}
            >
              Grams
            </button>
            <button
              onClick={() => setUnit('tola')}
              className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${unit === 'tola' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-amber-700'}`}
            >
              Tola
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB: BY DAY
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'byday' && (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800">Rate History by Day</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing last {dailyHistory.length} trading days — per {unitLabel}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Date (B.S.)</th>
                  <th className="px-4 py-3">Date (A.D.)</th>
                  <th className="px-4 py-3 text-right">Fine Gold (9999)</th>
                  <th className="px-4 py-3 text-right">Silver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dailyHistory.map(row => (
                  <tr key={row.date} className="hover:bg-amber-50/40">
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{row.date_bs || '—'}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-2.5 font-bold text-amber-700 text-right whitespace-nowrap">
                      {fmtNPR(unit === 'tola' ? row.gold_tola : row.gold_10g)}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-slate-600 text-right whitespace-nowrap">
                      {fmtNPR(unit === 'tola' ? row.silver_tola : row.silver_10g)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB: BY MONTH
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'bymonth' && (
        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <h2 className="text-base font-bold text-slate-800 mb-4">Rate History by Month</h2>
            <div className="flex flex-wrap gap-3 items-end">
              {/* Year */}
              <select
                value={selYear}
                onChange={e => setSelYear(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {BS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {/* Month */}
              <select
                value={selMonth}
                onChange={e => setSelMonth(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {BS_MONTH_NAMES_NP.map((name, i) => (
                  <option key={i + 1} value={i + 1}>{name}</option>
                ))}
              </select>
              <button
                onClick={() => handleByMonthSearch(selYear, selMonth)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                🔍 Search
              </button>
            </div>
          </div>

          {monthResult ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 text-xs text-slate-500">
                {monthResult.year_bs} {BS_MONTHS_EN[monthResult.month_bs - 1]} — {monthResult.daily_count ?? monthResult.daily_records?.length} trading days — per {unitLabel}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Date (B.S.)</th>
                      <th className="px-4 py-3 text-right">Fine Gold (9999)</th>
                      <th className="px-4 py-3 text-right">Silver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(monthResult.daily_records || []).map((row, i) => {
                      const goldVal = unit === 'tola' ? row.gold_tola : row.gold_10g;
                      const silverVal = unit === 'tola' ? row.silver_tola : row.silver_10g;
                      return (
                        <tr key={row.date_ad || i} className="hover:bg-amber-50/40">
                          <td className="px-4 py-2.5 text-slate-700 whitespace-nowrap">{row.date_ad}</td>
                          <td className="px-4 py-2.5 font-bold text-amber-700 text-right whitespace-nowrap">{fmtNPR(goldVal)}</td>
                          <td className="px-4 py-2.5 font-bold text-slate-600 text-right whitespace-nowrap">{fmtNPR(silverVal)}</td>
                        </tr>
                      );
                    })}
                    {(!monthResult.daily_records || monthResult.daily_records.length === 0) && (
                      <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">No data available for this month.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-8">Select a year and month then click Search.</p>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB: WEEK MIN/MAX
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'weekminmax' && (
        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Week Min/Max (Last 7 Trading Days)</h2>
            </div>
            {weekResult && weekResult.length > 0 ? (() => {
              const goldTolas = weekResult.map(r => r.gold_tola).filter(Boolean) as number[];
              const gold10gs  = weekResult.map(r => r.gold_10g).filter(Boolean) as number[];
              const silvTolas = weekResult.map(r => r.silver_tola).filter(Boolean) as number[];
              const silv10gs  = weekResult.map(r => r.silver_10g).filter(Boolean) as number[];
              return (
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Per 1 Tola */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black uppercase text-slate-500 mb-2">Per 1 Tola</h3>
                    <MinMaxCard label="Fine Gold (9999)" min={Math.min(...goldTolas)} max={Math.max(...goldTolas)} />
                    <MinMaxCard label="Silver" min={Math.min(...silvTolas)} max={Math.max(...silvTolas)} />
                  </div>
                  {/* Per 10 Grams */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-black uppercase text-slate-500 mb-2">Per 10 Grams</h3>
                    <MinMaxCard label="Fine Gold (9999)" min={Math.min(...gold10gs)} max={Math.max(...gold10gs)} />
                    <MinMaxCard label="Silver" min={Math.min(...silv10gs)} max={Math.max(...silv10gs)} />
                  </div>
                </div>
              );
            })() : (
              <p className="p-6 text-slate-400 text-sm text-center">Loading week data…</p>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB: MONTH MIN/MAX
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'monthminmax' && (
        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <h2 className="text-base font-bold text-slate-800 mb-4">Rate History by Month [Maximum to Minimum]</h2>
            <div className="flex flex-wrap gap-3 items-end">
              <select
                value={mmYear}
                onChange={e => setMmYear(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {BS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select
                value={mmMonth}
                onChange={e => setMmMonth(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {BS_MONTH_NAMES_NP.map((name, i) => (
                  <option key={i + 1} value={i + 1}>{name}</option>
                ))}
              </select>
              <button
                onClick={() => handleMmSearch(mmYear, mmMonth)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                🔍 Search
              </button>
            </div>
          </div>

          {mmResult ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Per 1 Tola */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase text-slate-500 mb-1">Per 1 Tola</h3>
                <MinMaxCard label="Silver" min={mmResult.month.month_minmax.silver_tola?.min} max={mmResult.month.month_minmax.silver_tola?.max} />
                <MinMaxCard label="Fine Gold (9999)" min={mmResult.month.month_minmax.gold_tola?.min} max={mmResult.month.month_minmax.gold_tola?.max} />
              </div>
              {/* Per 10 Grams */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase text-slate-500 mb-1">Per 10 Grams</h3>
                <MinMaxCard label="Silver" min={mmResult.month.month_minmax.silver_10g?.min} max={mmResult.month.month_minmax.silver_10g?.max} />
                <MinMaxCard label="Fine Gold (9999)" min={mmResult.month.month_minmax.gold_10g?.min} max={mmResult.month.month_minmax.gold_10g?.max} />
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-8">Select year and month then click Search.</p>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          TAB: YEAR MIN/MAX
      ══════════════════════════════════════════════════════════════ */}
      {tab === 'yearminmax' && (
        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
            <h2 className="text-base font-bold text-slate-800 mb-4">Rate History by Year [Maximum to Minimum]</h2>
            <div className="flex flex-wrap gap-3 items-end">
              <select
                value={ymYear}
                onChange={e => setYmYear(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {BS_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button
                onClick={() => handleYmSearch(ymYear)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                🔍 Search
              </button>
            </div>
          </div>

          {ymResult ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Per 1 Tola */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase text-slate-500 mb-1">Per 1 Tola</h3>
                <MinMaxCard label="Silver" min={ymResult.year_minmax.silver_tola?.min} max={ymResult.year_minmax.silver_tola?.max} />
                <MinMaxCard label="Fine Gold (9999)" min={ymResult.year_minmax.gold_tola?.min} max={ymResult.year_minmax.gold_tola?.max} />
              </div>
              {/* Per 10 Grams */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase text-slate-500 mb-1">Per 10 Grams</h3>
                <MinMaxCard label="Silver" min={ymResult.year_minmax.silver_10g?.min} max={ymResult.year_minmax.silver_10g?.max} />
                <MinMaxCard label="Fine Gold (9999)" min={ymResult.year_minmax.gold_10g?.min} max={ymResult.year_minmax.gold_10g?.max} />
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-8">Select a year then click Search.</p>
          )}
        </section>
      )}
    </div>
  );
}

// ── Reusable Min/Max card ──────────────────────────────────────────────────────
function MinMaxCard({ label, min, max }: { label: string; min?: number | null; max?: number | null }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-700 mb-3">{label}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
          <span className="text-emerald-500">↑</span> Max
        </span>
        <span className="font-bold text-slate-800">{fmtNPR(max ?? null)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-1 text-xs text-rose-700 font-semibold">
          <span className="text-rose-500">↓</span> Min
        </span>
        <span className="font-bold text-slate-800">{fmtNPR(min ?? null)}</span>
      </div>
    </div>
  );
}
