'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Download, Database, AlertCircle, Loader2 } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOLA_TO_GRAM = 11.664;
const GOLD_COLOR = '#d97706';
const SILVER_COLOR = '#64748b';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HistoricalRecord {
  id: string;
  date_ad: string;
  date_bs: string;
  day: string;
  metal_gold_fine_tola: number | null;
  metal_gold_fine_10g: number | null;
  metal_gold_tejabi_tola: number | null;
  metal_silver_tola: number | null;
  metal_silver_10g: number | null;
  status: string;
  source: string;
}

export interface DataMeta {
  source_name: string;
  source_url: string;
  currency: string;
  tola_to_gram: number;
  coverage_from_ad: string;
  coverage_to_ad: string;
  total_records: number;
  last_imported: string;
}

type Metal = 'gold' | 'silver';
type Unit = 'gram' | '10g' | 'tola' | 'kg';
type View = 'daily' | 'monthly' | 'week-minmax' | 'month-minmax' | 'year-minmax';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function convertFromTola(tola: number, unit: Unit): number {
  if (unit === 'tola') return tola;
  const perGram = tola / TOLA_TO_GRAM;
  if (unit === 'gram') return Math.round(perGram * 100) / 100;
  if (unit === '10g') return Math.round(perGram * 10 * 100) / 100;
  return Math.round(perGram * 1000 * 100) / 100;
}

function unitLabel(unit: Unit): string {
  return { gram: 'Per Gram', '10g': 'Per 10 Grams', tola: 'Per Tola', kg: 'Per Kilogram' }[unit];
}

function unitSuffix(unit: Unit): string {
  return { gram: '/g', '10g': '/10g', tola: '/tola', kg: '/kg' }[unit];
}

function fmtNPR(n: number | null): string {
  if (n === null) return '—';
  return 'Rs.\u00a0' + n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function getSourcePrice(rec: HistoricalRecord, metal: Metal): number | null {
  if (metal === 'gold') return rec.metal_gold_fine_tola;
  return rec.metal_silver_tola;
}

function getConvertedPrice(rec: HistoricalRecord, metal: Metal, unit: Unit): number | null {
  // prefer stored 10g value if unit is 10g and value is available
  if (unit === '10g') {
    const stored10g = metal === 'gold' ? rec.metal_gold_fine_10g : rec.metal_silver_10g;
    if (stored10g !== null) return stored10g;
  }
  const tola = getSourcePrice(rec, metal);
  if (tola === null) return null;
  return convertFromTola(tola, unit);
}

function getYearFromAD(date_ad: string): number {
  return parseInt(date_ad.slice(0, 4), 10);
}

function getMonthFromAD(date_ad: string): string {
  return date_ad.slice(0, 7); // "2026-09"
}

function formatMonthLabel(ym: string): string {
  const [y, m] = ym.split('-');
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function isoWeek(date_ad: string): string {
  const d = new Date(date_ad);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - day);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const wk = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${String(wk).padStart(2, '0')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SegBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-[12px] font-bold tracking-wide transition-all whitespace-nowrap ${
        active ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
      <Database className="w-10 h-10 opacity-40" />
      <p className="text-sm font-medium">No verified historical data is available for this period.</p>
    </div>
  );
}

function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-[12px]">
      <p className="font-bold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {fmtNPR(p.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
  records: HistoricalRecord[];
  meta: DataMeta;
}

export default function HistoryClient({ records, meta }: Props) {
  const [metal, setMetal] = useState<Metal>('gold');
  const [unit, setUnit] = useState<Unit>('tola');
  const [view, setView] = useState<View>('daily');

  // year derived from available records
  const availableYears = useMemo(() =>
    [...new Set(records.map(r => getYearFromAD(r.date_ad)))].sort((a, b) => b - a),
    [records]
  );
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] ?? new Date().getFullYear());

  // filter verified records by year
  const yearRecords = useMemo(() =>
    records.filter(r => r.status === 'verified' && getYearFromAD(r.date_ad) === selectedYear),
    [records, selectedYear]
  );

  // ── Daily data ───────────────────────────────────────────────────────────────
  const dailyRows = useMemo(() =>
    yearRecords
      .map(r => ({
        date_bs: r.date_bs,
        date_ad: r.date_ad,
        day: r.day,
        value: getConvertedPrice(r, metal, unit),
        tejabi: metal === 'gold' ? (r.metal_gold_tejabi_tola !== null ? convertFromTola(r.metal_gold_tejabi_tola, unit) : null) : undefined,
        source: r.source,
      }))
      .sort((a, b) => b.date_ad.localeCompare(a.date_ad)),
    [yearRecords, metal, unit]
  );

  // ── Chart data ───────────────────────────────────────────────────────────────
  const chartData = useMemo(() =>
    [...dailyRows].reverse().map(r => ({
      date: r.date_bs || r.date_ad,
      value: r.value,
    })),
    [dailyRows]
  );

  // ── Monthly aggregates ───────────────────────────────────────────────────────
  const monthlyRows = useMemo(() => {
    const groups: Record<string, number[]> = {};
    const groupDates: Record<string, string[]> = {};
    yearRecords.forEach(r => {
      const val = getConvertedPrice(r, metal, unit);
      if (val === null) return;
      const key = getMonthFromAD(r.date_ad);
      if (!groups[key]) { groups[key] = []; groupDates[key] = []; }
      groups[key].push(val);
      groupDates[key].push(r.date_ad);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])).map(([key, vals]) => {
      const sorted = [...vals];
      const dates = [...groupDates[key]].sort();
      const avg = Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
      const min = Math.min(...sorted);
      const max = Math.max(...sorted);
      const start = getConvertedPrice(
        yearRecords.find(r => r.date_ad === dates[0])!, metal, unit
      ) ?? 0;
      const end = getConvertedPrice(
        yearRecords.find(r => r.date_ad === dates[dates.length - 1])!, metal, unit
      ) ?? 0;
      return { month: formatMonthLabel(key), avg, min, max, start, end, change: end - start, changePct: ((end - start) / start * 100) };
    });
  }, [yearRecords, metal, unit]);

  // ── Week Min/Max ─────────────────────────────────────────────────────────────
  const weekMinMax = useMemo(() => {
    const groups: Record<string, { vals: number[]; dates: string[] }> = {};
    yearRecords.forEach(r => {
      const val = getConvertedPrice(r, metal, unit);
      if (val === null) return;
      const wk = isoWeek(r.date_ad);
      if (!groups[wk]) groups[wk] = { vals: [], dates: [] };
      groups[wk].vals.push(val);
      groups[wk].dates.push(r.date_ad);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])).map(([wk, { vals, dates }]) => {
      const sorted = dates.sort();
      const minIdx = vals.indexOf(Math.min(...vals));
      const maxIdx = vals.indexOf(Math.max(...vals));
      return {
        week: wk,
        start: sorted[0],
        end: sorted[sorted.length - 1],
        min: Math.min(...vals),
        minDate: dates[minIdx],
        max: Math.max(...vals),
        maxDate: dates[maxIdx],
        range: Math.max(...vals) - Math.min(...vals),
      };
    });
  }, [yearRecords, metal, unit]);

  // ── Month Min/Max ─────────────────────────────────────────────────────────────
  const monthMinMax = useMemo(() => {
    const groups: Record<string, { vals: number[]; dates: string[] }> = {};
    yearRecords.forEach(r => {
      const val = getConvertedPrice(r, metal, unit);
      if (val === null) return;
      const key = getMonthFromAD(r.date_ad);
      if (!groups[key]) groups[key] = { vals: [], dates: [] };
      groups[key].vals.push(val);
      groups[key].dates.push(r.date_ad);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])).map(([key, { vals, dates }]) => {
      const minIdx = vals.indexOf(Math.min(...vals));
      const maxIdx = vals.indexOf(Math.max(...vals));
      return {
        month: formatMonthLabel(key),
        min: Math.min(...vals),
        minDate: dates[minIdx],
        max: Math.max(...vals),
        maxDate: dates[maxIdx],
        range: Math.max(...vals) - Math.min(...vals),
      };
    });
  }, [yearRecords, metal, unit]);

  // ── Year Min/Max ──────────────────────────────────────────────────────────────
  const yearMinMax = useMemo(() => {
    const groups: Record<number, { vals: number[]; dates: string[] }> = {};
    records.filter(r => r.status === 'verified').forEach(r => {
      const val = getConvertedPrice(r, metal, unit);
      if (val === null) return;
      const yr = getYearFromAD(r.date_ad);
      if (!groups[yr]) groups[yr] = { vals: [], dates: [] };
      groups[yr].vals.push(val);
      groups[yr].dates.push(r.date_ad);
    });
    return Object.entries(groups)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([yr, { vals, dates }]) => {
        const minIdx = vals.indexOf(Math.min(...vals));
        const maxIdx = vals.indexOf(Math.max(...vals));
        return {
          year: Number(yr),
          min: Math.min(...vals),
          minDate: dates[minIdx],
          max: Math.max(...vals),
          maxDate: dates[maxIdx],
          range: Math.max(...vals) - Math.min(...vals),
        };
      });
  }, [records, metal, unit]);

  // ── Download helpers ──────────────────────────────────────────────────────────
  const downloadCSV = useCallback(() => {
    const rows = [
      ['date_ad', 'date_bs', 'day', 'metal', 'category', `price_${unit}`, 'currency', 'source'],
      ...dailyRows.map(r => [
        r.date_ad, r.date_bs, r.day, metal,
        metal === 'gold' ? 'fine_gold_9999' : 'silver',
        r.value ?? '',
        'NPR', r.source,
      ]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `nepacalc-${metal}-price-history-${selectedYear}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }, [dailyRows, metal, unit, selectedYear]);

  const downloadJSON = useCallback(() => {
    const payload = {
      meta: { source: meta.source_name, currency: 'NPR', unit, metal, year: selectedYear, generated_at: new Date().toISOString() },
      data: dailyRows.map(r => ({ date_ad: r.date_ad, date_bs: r.date_bs, day: r.day, value: r.value, source: r.source })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `nepacalc-${metal}-price-history-${selectedYear}.json`;
    a.click(); URL.revokeObjectURL(url);
  }, [dailyRows, meta, metal, unit, selectedYear]);

  // ── Titles ────────────────────────────────────────────────────────────────────
  const tableHeading = useMemo(() => {
    const m = metal === 'gold' ? 'Gold' : 'Silver';
    if (view === 'daily') return `Daily ${m} Price History`;
    if (view === 'monthly') return `Monthly ${m} Price History`;
    if (view === 'week-minmax') return `Weekly ${m} Price Min & Max`;
    if (view === 'month-minmax') return `Monthly ${m} Price Min & Max`;
    return `Yearly ${m} Price Min & Max`;
  }, [metal, view]);

  const accentColor = metal === 'gold' ? GOLD_COLOR : SILVER_COLOR;
  const accentBg = metal === 'gold' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200';
  const accentText = metal === 'gold' ? 'text-amber-700' : 'text-slate-600';

  return (
    <div className="space-y-6">

      {/* ── Metal Selector ────────────────────────────────────────────────────── */}
      <div className="flex gap-2" role="group" aria-label="Select metal">
        {(['gold', 'silver'] as Metal[]).map(m => (
          <button
            key={m}
            onClick={() => setMetal(m)}
            aria-pressed={metal === m}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-black tracking-wide uppercase transition-all border ${
              metal === m
                ? m === 'gold'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                  : 'bg-slate-700 text-white border-slate-700 shadow-md'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
            }`}
          >
            {m === 'gold' ? '🥇 Gold' : '🥈 Silver'}
          </button>
        ))}
      </div>

      {/* ── Dataset Header ────────────────────────────────────────────────────── */}
      <div className={`border rounded-xl p-4 text-[12px] font-medium ${accentBg}`}>
        <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2">
          {[
            ['Dataset', metal === 'gold' ? 'Gold Price History in Nepal' : 'Silver Price History in Nepal'],
            ['Category', metal === 'gold' ? 'Fine Gold (9999)' : 'Silver'],
            ['Calendar', 'AD (BS approximate)'],
            ['Currency', 'NPR'],
            ['Source', 'FENEGOSIDA'],
            ['Records', String(yearRecords.length)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className={`font-black uppercase tracking-widest text-[10px] ${accentText}`}>{k}</dt>
              <dd className="text-slate-700 mt-0.5">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── View Selector ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1 bg-slate-100 rounded-lg p-1" role="group" aria-label="Select view">
        {([
          ['daily', 'By Day'],
          ['monthly', 'By Month'],
          ['week-minmax', 'Week Min/Max'],
          ['month-minmax', 'Month Min/Max'],
          ['year-minmax', 'Year Min/Max'],
        ] as [View, string][]).map(([v, label]) => (
          <SegBtn key={v} active={view === v} onClick={() => setView(v)}>{label}</SegBtn>
        ))}
      </div>

      {/* ── Filter Row ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end gap-4">
        {view !== 'year-minmax' && (
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              aria-label="Select year"
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 outline-none"
            >
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Unit</label>
          <select
            value={unit}
            onChange={e => setUnit(e.target.value as Unit)}
            aria-label="Select unit"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-amber-400 outline-none"
          >
            {(['gram', '10g', 'tola', 'kg'] as Unit[]).map(u => (
              <option key={u} value={u}>{unitLabel(u)}</option>
            ))}
          </select>
        </div>

        {/* Download buttons */}
        <div className="ml-auto flex gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button
            onClick={downloadJSON}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5" /> JSON
          </button>
        </div>
      </div>

      {/* ── Chart ─────────────────────────────────────────────────────────────── */}
      {(view === 'daily' || view === 'monthly') && chartData.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h2 className="text-[13px] font-black text-slate-700 uppercase tracking-widest mb-4">
            Historical Price — {unitLabel(unit)} — {selectedYear}
          </h2>
          <p className="sr-only">
            Line chart showing {metal === 'gold' ? 'Fine Gold (9999)' : 'Silver'} price history
            in Nepal for {selectedYear}, {unitLabel(unit)}, sourced from FENEGOSIDA.
          </p>
          <div className="h-[260px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickFormatter={d => d.slice(5)}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                  width={42}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={accentColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  name={metal === 'gold' ? 'Fine Gold (NPR)' : 'Silver (NPR)'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── Table heading + context ───────────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-black text-slate-900 tracking-tight mb-1">{tableHeading}</h2>
        <p className="text-[12px] text-slate-500 font-medium mb-3">
          {metal === 'gold' ? 'Fine Gold (9999)' : 'Silver'} — NPR {unitSuffix(unit)} — {view === 'year-minmax' ? 'All years' : selectedYear}
        </p>

        {/* ── DAILY TABLE ─────────────────────────────────────────────────────── */}
        {view === 'daily' && (
          dailyRows.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm border-collapse min-w-[520px]">
                <caption className="sr-only">
                  {metal === 'gold' ? 'Gold' : 'Silver'} price history in Nepal, {unitLabel(unit)}, {selectedYear}
                </caption>
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Date</th>
                    <th scope="col" className="text-left px-3 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Day</th>
                    {metal === 'gold' ? (
                      <>
                        <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Fine Gold — NPR{unitSuffix(unit)}</th>
                        <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Tejabi Gold — NPR{unitSuffix(unit)}</th>
                      </>
                    ) : (
                      <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Silver — NPR{unitSuffix(unit)}</th>
                    )}
                    <th scope="col" className="text-center px-3 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dailyRows.map(r => (
                    <tr key={r.date_ad} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2.5 text-slate-700 font-medium tabular-nums whitespace-nowrap">
                        {r.date_bs || r.date_ad}
                        <span className="block text-[10px] text-slate-400 font-normal">{r.date_ad}</span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-500 text-[12px] whitespace-nowrap">{r.day}</td>
                      {metal === 'gold' ? (
                        <>
                          <td
                            className="px-4 py-2.5 text-right font-semibold tabular-nums text-slate-800"
                            data-value={r.value ?? 'null'}
                            data-unit="NPR"
                            data-weight-unit={unit}
                          >
                            {fmtNPR(r.value)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-slate-400">
                            {r.tejabi != null ? fmtNPR(r.tejabi) : '—'}
                          </td>
                        </>
                      ) : (
                        <td
                          className="px-4 py-2.5 text-right font-semibold tabular-nums text-slate-800"
                          data-value={r.value ?? 'null'}
                          data-unit="NPR"
                          data-weight-unit={unit}
                        >
                          {fmtNPR(r.value)}
                        </td>
                      )}
                      <td className="px-3 py-2.5 text-center text-[10px] text-slate-400 font-medium">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── MONTHLY TABLE ───────────────────────────────────────────────────── */}
        {view === 'monthly' && (
          monthlyRows.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm border-collapse min-w-[680px]">
                <caption className="sr-only">Monthly {metal} price history, {unitLabel(unit)}, {selectedYear}</caption>
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {['Month', 'Average', 'Minimum', 'Maximum', 'Start', 'End', 'Change', 'Change %'].map(h => (
                      <th key={h} scope="col" className={`${h === 'Month' ? 'text-left px-4' : 'text-right px-3'} py-3 text-[11px] font-black uppercase tracking-widest text-slate-500`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyRows.map(r => (
                    <tr key={r.month} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 font-medium text-slate-700 whitespace-nowrap">{r.month}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-800 font-semibold">{fmtNPR(r.avg)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-emerald-700 font-semibold">{fmtNPR(r.min)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-red-600 font-semibold">{fmtNPR(r.max)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">{fmtNPR(r.start)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">{fmtNPR(r.end)}</td>
                      <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${r.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {r.change >= 0 ? '+' : ''}{fmtNPR(r.change)}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums font-semibold text-[12px] ${r.changePct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {r.changePct >= 0 ? '+' : ''}{r.changePct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── WEEK MIN/MAX ────────────────────────────────────────────────────── */}
        {view === 'week-minmax' && (
          weekMinMax.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm border-collapse min-w-[680px]">
                <caption className="sr-only">Weekly {metal} price min & max, {selectedYear}</caption>
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {['Week', 'Start', 'End', 'Minimum', 'Min Date', 'Maximum', 'Max Date', 'Range'].map(h => (
                      <th key={h} scope="col" className={`${['Week', 'Start', 'End', 'Min Date', 'Max Date'].includes(h) ? 'text-left px-4' : 'text-right px-3'} py-3 text-[11px] font-black uppercase tracking-widest text-slate-500`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {weekMinMax.map(r => (
                    <tr key={r.week} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 text-slate-600 font-medium">{r.week}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.start}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.end}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-emerald-700 font-semibold">{fmtNPR(r.min)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.minDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-red-600 font-semibold">{fmtNPR(r.max)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.maxDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-700 font-semibold">{fmtNPR(r.range)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── MONTH MIN/MAX ───────────────────────────────────────────────────── */}
        {view === 'month-minmax' && (
          monthMinMax.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm border-collapse min-w-[560px]">
                <caption className="sr-only">Monthly {metal} price min & max, {selectedYear}</caption>
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {['Month', 'Minimum', 'Min Date', 'Maximum', 'Max Date', 'Range'].map(h => (
                      <th key={h} scope="col" className={`${['Month', 'Min Date', 'Max Date'].includes(h) ? 'text-left px-4' : 'text-right px-3'} py-3 text-[11px] font-black uppercase tracking-widest text-slate-500`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthMinMax.map(r => (
                    <tr key={r.month} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 font-medium text-slate-700">{r.month}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-emerald-700 font-semibold">{fmtNPR(r.min)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.minDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-red-600 font-semibold">{fmtNPR(r.max)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.maxDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-700 font-semibold">{fmtNPR(r.range)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── YEAR MIN/MAX ────────────────────────────────────────────────────── */}
        {view === 'year-minmax' && (
          yearMinMax.length === 0 ? <EmptyState /> : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm border-collapse min-w-[500px]">
                <caption className="sr-only">Yearly {metal} price min & max — all available years</caption>
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {['Year', 'Minimum', 'Min Date', 'Maximum', 'Max Date', 'Range'].map(h => (
                      <th key={h} scope="col" className={`${['Year', 'Min Date', 'Max Date'].includes(h) ? 'text-left px-4' : 'text-right px-3'} py-3 text-[11px] font-black uppercase tracking-widest text-slate-500`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearMinMax.map(r => (
                    <tr key={r.year} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 font-black text-slate-800">{r.year}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-emerald-700 font-semibold">{fmtNPR(r.min)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.minDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-red-600 font-semibold">{fmtNPR(r.max)}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[12px]">{r.maxDate}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-700 font-semibold">{fmtNPR(r.range)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* ── Methodology ───────────────────────────────────────────────────────── */}
      <details className="border border-slate-200 rounded-xl">
        <summary className="px-4 py-3 text-[12px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">
          Conversion Methodology
        </summary>
        <div className="px-4 pb-4 pt-2 text-[12px] text-slate-600 font-medium space-y-1">
          <p>1 Tola = 11.664 grams</p>
          <p>Per Gram = Per Tola ÷ 11.664</p>
          <p>Per 10 Grams = Per Gram × 10 (source value used when available)</p>
          <p>Per Kilogram = Per Gram × 1,000</p>
          <p className="text-slate-400 pt-1">Missing rates display as — and are never treated as zero. Holidays and non-trading days are excluded from min/max calculations.</p>
        </div>
      </details>
    </div>
  );
}
