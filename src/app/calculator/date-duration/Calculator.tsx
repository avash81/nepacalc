'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Clock, Copy, Printer, Share2, ArrowLeftRight, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// ─── Timezone-safe date helpers ──────────────────────────────────────────────
// Always work with local calendar year/month/day — never UTC shift.

function parseDate(s: string): Date | null {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  if (isNaN(dt.getTime())) return null;
  return dt;
}

function toISO(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function todayISO(): string { return toISO(new Date()); }

function addDays(dt: Date, n: number): Date {
  const r = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);
  return r;
}

// ─── Preset date ranges ───────────────────────────────────────────────────────
function getPreset(key: string): { start: string; end: string } {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();

  switch (key) {
    case 'today':
      return { start: todayISO(), end: todayISO() };
    case 'yesterday': {
      const yest = toISO(new Date(y, m, d - 1));
      return { start: yest, end: yest };
    }
    case 'last7':
      return { start: toISO(new Date(y, m, d - 6)), end: todayISO() };
    case 'thisMonth':
      return {
        start: toISO(new Date(y, m, 1)),
        end: toISO(new Date(y, m + 1, 0)),
      };
    case 'prevMonth':
      return {
        start: toISO(new Date(y, m - 1, 1)),
        end: toISO(new Date(y, m, 0)),
      };
    case 'thisYear':
      return { start: `${y}-01-01`, end: `${y}-12-31` };
    case 'prevYear':
      return { start: `${y - 1}-01-01`, end: `${y - 1}-12-31` };
    default:
      return { start: todayISO(), end: todayISO() };
  }
}

// ─── Core calculation (timezone-safe) ────────────────────────────────────────
function calcDiff(startISO: string, endISO: string, inclusive: boolean) {
  const s = parseDate(startISO);
  const e = parseDate(endISO);
  if (!s || !e) return null;

  const isReversed = s > e;
  const lo = isReversed ? new Date(e.getTime()) : new Date(s.getTime());
  const hi = isReversed ? new Date(s.getTime()) : new Date(e.getTime());

  // elapsed days using midnight-to-midnight local calendar arithmetic
  const loMs = Date.UTC(lo.getFullYear(), lo.getMonth(), lo.getDate());
  const hiMs = Date.UTC(hi.getFullYear(), hi.getMonth(), hi.getDate());
  const totalDays = Math.round((hiMs - loMs) / 86_400_000) + (inclusive ? 1 : 0);

  // Calendar duration (y/m/d breakdown) — on non-inclusive base
  let yrs = hi.getFullYear() - lo.getFullYear();
  let mos = hi.getMonth() - lo.getMonth();
  let dys = hi.getDate() - lo.getDate() + (inclusive ? 1 : 0);
  if (dys < 0) { mos -= 1; dys += new Date(hi.getFullYear(), hi.getMonth(), 0).getDate(); }
  if (mos < 0) { yrs -= 1; mos += 12; }

  // Business / weekend / leap-day count (loop over actual days)
  let businessDays = 0, weekendDays = 0, leapDays = 0;
  const effectiveHi = inclusive ? new Date(hi.getFullYear(), hi.getMonth(), hi.getDate() + 1) : hi;
  for (
    let cur = new Date(lo.getFullYear(), lo.getMonth(), lo.getDate());
    cur < effectiveHi;
    cur = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1)
  ) {
    const dow = cur.getDay();
    if (dow === 0 || dow === 6) weekendDays++; else businessDays++;
    if (cur.getMonth() === 1 && cur.getDate() === 29) leapDays++;
  }

  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;

  return {
    totalDays,
    yrs, mos, dys,
    weeks, remDays,
    hours: totalDays * 24,
    minutes: totalDays * 1_440,
    seconds: totalDays * 86_400,
    businessDays,
    weekendDays,
    leapDays,
    isReversed,
    loISO: toISO(lo),
    hiISO: toISO(hi),
  };
}

// ─── Format helpers ───────────────────────────────────────────────────────────
function fmtDate(iso: string): string {
  const d = parseDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtCalDuration(y: number, m: number, d: number): string {
  const parts: string[] = [];
  parts.push(`${y} ${y === 1 ? 'Year' : 'Years'}`);
  parts.push(`${m} ${m === 1 ? 'Month' : 'Months'}`);
  parts.push(`${d} ${d === 1 ? 'Day' : 'Days'}`);
  return parts.join('  ');
}

function fmtWeeks(weeks: number, rem: number): string {
  if (rem === 0) return `${weeks.toLocaleString()} weeks`;
  return `${weeks.toLocaleString()} weeks ${rem} ${rem === 1 ? 'day' : 'days'}`;
}

// ─── Chip button ─────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors whitespace-nowrap
        ${active
          ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
          : 'bg-white text-[#5F6368] border-[#DADCE0] hover:border-[#1A73E8] hover:text-[#1A73E8]'
        }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

// ─── Checkbox toggle ──────────────────────────────────────────────────────────
function Toggle({
  checked, onChange, label, helper,
}: { checked: boolean; onChange: () => void; label: string; helper: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none group">
      <div
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all
          ${checked ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white group-hover:border-[#1A73E8]'}`}
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && onChange()}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 9" fill="none">
            <path d="M1 4l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <span className="text-sm font-semibold text-[#202124]">{label}</span>
        <p className="text-[11px] text-[#70757A] mt-0.5">{helper}</p>
      </div>
    </label>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const PRESETS = [
  { key: 'today',     label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7',     label: 'Last 7 Days' },
  { key: 'thisMonth', label: 'This Month' },
  { key: 'prevMonth', label: 'Previous Month' },
  { key: 'thisYear',  label: 'This Year' },
  { key: 'prevYear',  label: 'Previous Year' },
] as const;

export default function DateDuration() {
  const [start, setStart] = useState('2025-01-01');
  const [end, setEnd]     = useState('2025-12-31');
  const [includeEnd, setIncludeEnd] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>('thisYear');
  const [showMoreResults, setShowMoreResults] = useState(false);
    const [copied, setCopied] = useState(false);

  // Hydrate from URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const ps = p.get('start'), pe = p.get('end');
    if (ps && parseDate(ps)) { setStart(ps); setActivePreset(null); }
    if (pe && parseDate(pe)) { setEnd(pe);   setActivePreset(null); }
    if (p.get('inclusive') === '1') setIncludeEnd(true);
  }, []);

  const diff = useMemo(
    () => calcDiff(start, end, includeEnd),
    [start, end, includeEnd],
  );

  const applyPreset = useCallback((key: string) => {
    const r = getPreset(key);
    setStart(r.start);
    setEnd(r.end);
    setActivePreset(key);
  }, []);

  const swapDates = () => {
    setStart(end);
    setEnd(start);
    setActivePreset(null);
  };

  const reset = () => {
    const r = getPreset('thisYear');
    setStart(r.start);
    setEnd(r.end);
    setIncludeEnd(false);
    setActivePreset('thisYear');
    setShowMoreResults(false);
  };

  const handleDateChange = (field: 'start' | 'end', val: string) => {
    if (field === 'start') setStart(val); else setEnd(val);
    setActivePreset(null);
  };

  // Copy result as readable text
  const copyResult = async () => {
    if (!diff) return;
    const lines = [
      'Date Duration',
      '',
      `Start Date: ${fmtDate(diff.loISO)}`,
      `End Date:   ${fmtDate(diff.hiISO)}`,
      includeEnd ? 'Counting: inclusive (both dates counted)' : 'Counting: standard (elapsed days)',
      '',
      `Total Calendar Days: ${diff.totalDays.toLocaleString()}`,
      `Calendar Duration:   ${fmtCalDuration(diff.yrs, diff.mos, diff.dys)}`,
      `Weeks:               ${fmtWeeks(diff.weeks, diff.remDays)}`,
      '',
      `Hours:               ${diff.hours.toLocaleString()}`,
      `Minutes:             ${diff.minutes.toLocaleString()}`,
      `Seconds:             ${diff.seconds.toLocaleString()}`,
      '',
      `Business Days:       ${diff.businessDays.toLocaleString()} (weekends excluded)`,
      `Weekend Days:        ${diff.weekendDays.toLocaleString()}`,
    ];
    await navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share URL with state encoded
  const shareUrl = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('start', start);
    url.searchParams.set('end', end);
    if (includeEnd) url.searchParams.set('inclusive', '1');
    else url.searchParams.delete('inclusive');
    navigator.clipboard.writeText(url.toString());
    alert('Link copied to clipboard');
  };

  // ─── Inputs panel ──────────────────────────────────────────────────────────
  const inputsPanel = (
    <div className="space-y-5 pb-2">

      {/* Quick presets */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#70757A] mb-2">Quick Dates</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ key, label }) => (
            <Chip
              key={key}
              label={label}
              active={activePreset === key}
              onClick={() => applyPreset(key)}
            />
          ))}
        </div>
      </div>

      {/* Date inputs with swap */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        {/* Start Date */}
        <div className="space-y-1">
          <label htmlFor="dd-start" className="text-[11px] font-bold uppercase tracking-widest text-[#70757A]">
            Start Date
          </label>
          <input
            id="dd-start"
            type="date"
            value={start}
            onChange={e => handleDateChange('start', e.target.value)}
            aria-label="Start Date"
            className="w-full h-11 px-3 border border-[#DADCE0] rounded-lg bg-white text-sm font-semibold text-[#202124] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 outline-none transition-all"
          />
        </div>

        {/* Swap button */}
        <div className="flex items-end justify-center pb-0.5">
          <button
            type="button"
            onClick={swapDates}
            aria-label="Swap start and end dates"
            title="Swap start and end dates"
            className="w-10 h-11 flex items-center justify-center rounded-lg border border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <label htmlFor="dd-end" className="text-[11px] font-bold uppercase tracking-widest text-[#70757A]">
            End Date
          </label>
          <input
            id="dd-end"
            type="date"
            value={end}
            onChange={e => handleDateChange('end', e.target.value)}
            aria-label="End Date"
            className="w-full h-11 px-3 border border-[#DADCE0] rounded-lg bg-white text-sm font-semibold text-[#202124] focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Include end date */}
      <Toggle
        checked={includeEnd}
        onChange={() => setIncludeEnd(v => !v)}
        label="Include end date"
        helper="Count both the start date and end date."
      />

      {/* Reset */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={reset}
          aria-label="Reset calculator"
          className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold text-[#5F6368] border border-[#DADCE0] rounded-lg bg-white hover:bg-[#F8F9FA] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  );

  // ─── Results panel ──────────────────────────────────────────────────────────
  const resultsPanel = (
    <div className="space-y-4 printable-result" role="region" aria-label="Calculation results">
      {!diff ? (
        <div className="h-32 flex flex-col items-center justify-center text-[#70757A] gap-2">
          <Calendar className="w-8 h-8 opacity-30" />
          <p className="text-sm">Enter valid dates above.</p>
        </div>
      ) : (
        <>
          {/* Reversed dates notice */}
          {diff.isReversed && (
            <div className="bg-[#FFF8E1] border border-[#F9AB00] rounded-lg px-4 py-2.5 flex items-start gap-2.5 text-sm text-[#202124]">
              <span className="text-[#F9AB00] font-bold mt-0.5">⚠</span>
              <span>End date is earlier than start date. Showing duration from the earlier date. Use <strong>⇄</strong> to swap.</span>
            </div>
          )}

          {/* ── PRIMARY RESULT ── */}
          <div className="bg-[#1A73E8] rounded-xl px-6 py-5 text-white text-center">
            <div
              className="text-5xl sm:text-6xl font-black tracking-tight tabular-nums leading-none"
              aria-label={`${diff.totalDays} total calendar days`}
            >
              {diff.totalDays.toLocaleString()}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mt-2 opacity-75">
              Total Calendar Days
            </div>
            {includeEnd && (
              <div className="mt-1.5 text-[11px] opacity-60">Inclusive — both dates counted</div>
            )}
          </div>

          {/* ── CALCULATION TRANSPARENCY ── */}
          <div className="px-4 py-3 bg-[#FAFAFA] border border-[#DADCE0] rounded-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#70757A] mb-2">How the result is calculated</p>
            <p className="font-mono text-sm text-[#202124]">
              {fmtDate(diff.hiISO)} − {fmtDate(diff.loISO)} = {(diff.totalDays - (includeEnd ? 1 : 0)).toLocaleString()} days
            </p>
            {includeEnd && (
              <p className="font-mono text-sm text-[#1A73E8] mt-1">
                {(diff.totalDays - 1).toLocaleString()} + 1 = {diff.totalDays.toLocaleString()} days
                <span className="font-sans text-[10px] text-[#70757A] ml-2 not-italic">(include end date)</span>
              </p>
            )}
          </div>

          {/* ── CALENDAR DURATION ── */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg px-5 py-4 text-center">
            <div className="text-xl font-bold text-[#202124] tracking-wide">
              {fmtCalDuration(diff.yrs, diff.mos, diff.dys)}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#70757A] mt-1">
              Calendar Duration
            </div>
          </div>

          {/* ── WEEKS ── */}
          <div className="bg-white border border-[#DADCE0] rounded-lg px-5 py-3 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#70757A]">Weeks</span>
            <span className="text-base font-bold text-[#202124]">{fmtWeeks(diff.weeks, diff.remDays)}</span>
          </div>

          {/* ── MORE RESULTS ── */}
          <div className="border border-[#DADCE0] rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowMoreResults(v => !v)}
              aria-expanded={showMoreResults}
              aria-controls="more-results-panel"
              className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[11px] font-bold uppercase tracking-widest text-[#5F6368] transition-colors"
            >
              More Results
              {showMoreResults ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMoreResults && (
              <div id="more-results-panel" className="px-4 py-3 bg-white space-y-3">
                {/* Hours / Minutes / Seconds */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Hours',   value: diff.hours.toLocaleString() },
                    { label: 'Minutes', value: diff.minutes.toLocaleString() },
                    { label: 'Seconds', value: diff.seconds.toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3 text-center">
                      <div className="text-sm font-black text-[#202124] tabular-nums break-all">{value}</div>
                      <div className="text-[9px] font-bold uppercase text-[#70757A] mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Business / Weekend days */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-lg p-3 text-center">
                    <div className="text-lg font-black text-[#16a34a] tabular-nums">
                      {diff.businessDays.toLocaleString()}
                    </div>
                    <div className="text-[9px] font-bold uppercase text-[#16a34a] mt-0.5">Business Days</div>
                    <div className="text-[9px] text-[#6b7280] mt-0.5">Weekdays only</div>
                  </div>
                  <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3 text-center">
                    <div className="text-lg font-black text-[#202124] tabular-nums">
                      {diff.weekendDays.toLocaleString()}
                    </div>
                    <div className="text-[9px] font-bold uppercase text-[#70757A] mt-0.5">Weekend Days</div>
                  </div>
                </div>

                {/* Leap days (only if nonzero) */}
                {diff.leapDays > 0 && (
                  <div className="text-xs text-[#5F6368] px-1">
                    Includes {diff.leapDays} leap {diff.leapDays === 1 ? 'day' : 'days'} (Feb 29).
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── DATE RANGE ── */}
          <div className="border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Date Range</p>
            </div>
            <div className="px-4 py-3 bg-white">
              <div className="flex items-center gap-3 text-sm text-[#202124]">
                <span className="font-semibold text-[#1A73E8]">{fmtDate(diff.loISO)}</span>
                <div className="flex-1 relative h-2 bg-[#E8F0FE] rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-[#1A73E8] rounded-full w-full" />
                </div>
                <span className="font-semibold text-[#1A73E8]">{fmtDate(diff.hiISO)}</span>
              </div>
              <p className="text-center text-[11px] text-[#70757A] mt-1.5">
                {diff.totalDays.toLocaleString()} {diff.totalDays === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* ── ACTIONS ── */}
          <div className="grid grid-cols-3 gap-2 no-print">
            <button
              type="button"
              onClick={copyResult}
              aria-label="Copy result to clipboard"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#202124] text-[12px] font-semibold transition-colors"
            >
              <Copy className="w-3.5 h-3.5 shrink-0" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print or save as PDF"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#202124] text-[12px] font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={shareUrl}
              aria-label="Copy shareable link"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#202124] text-[12px] font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>Share</span>
            </button>
          </div>
        </>
      )}
    </div>
  );

  // ─── Supporting content ──────────────────────────────────────────────────────
  const detailsPanel = (
    <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-8 items-start">
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm space-y-8 min-w-0">

        {/* 1. Direct Answer */}
        <section id="days-between-dates">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">How Many Days Are Between Two Dates?</h2>
          <p className="text-[#202124] text-sm leading-relaxed">
            Enter a start date and an end date above. The calculator subtracts the start date from the end date to give the elapsed number of calendar days. Turn on <strong>Include end date</strong> when both dates should be counted.
          </p>
        </section>


        {/* 2. What it calculates */}
        <section id="what-it-calculates">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">What Does This Date Duration Calculator Calculate?</h2>
          <p className="text-[#5F6368] text-sm leading-relaxed mb-3">
            This calculator finds the duration between two calendar dates and can show the result in days, weeks, months, years, hours, minutes and seconds. It can also count business days when that option is enabled.
          </p>
          <ul className="space-y-1.5 text-sm text-[#5F6368]">
            <li><strong className="text-[#202124]">Days:</strong> Total calendar days between the dates.</li>
            <li><strong className="text-[#202124]">Weeks:</strong> The duration expressed in weeks.</li>
            <li><strong className="text-[#202124]">Months and years:</strong> Calendar-based duration between the selected dates.</li>
            <li><strong className="text-[#202124]">Hours, minutes and seconds:</strong> Equivalent duration based on the calculated days.</li>
            <li><strong className="text-[#202124]">Business days:</strong> Weekdays counted, weekends excluded.</li>
          </ul>
        </section>

        {/* 3. How to use */}
        <section id="how-to-use">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">How to Use the Date Duration Calculator</h2>
          <ol className="space-y-1.5 text-sm text-[#5F6368] list-decimal pl-5">
            <li>Select the <strong className="text-[#202124]">Start Date</strong>.</li>
            <li>Select the <strong className="text-[#202124]">End Date</strong>.</li>
            <li>Turn on <strong className="text-[#202124]">Include end date</strong> if both dates should be counted.</li>
            <li>Review the result. The primary number is Total Calendar Days.</li>
            <li>Use <strong className="text-[#202124]">⇄</strong> to swap dates if they are reversed.</li>
          </ol>
        </section>

        {/* 4. Inclusive vs Exclusive */}
        <section id="inclusive-exclusive">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">Inclusive vs. Exclusive Date Counting</h2>
          <p className="text-[#5F6368] text-sm leading-relaxed mb-3">
            Standard elapsed counting measures the time from the start date to the end date. Inclusive counting includes both the start date and the end date.
          </p>
          <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA] text-[#5F6368] text-[11px] uppercase">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left font-semibold border-b border-[#DADCE0]">Dates</th>
                  <th scope="col" className="px-4 py-2 text-right font-semibold border-b border-[#DADCE0] border-l">Standard</th>
                  <th scope="col" className="px-4 py-2 text-right font-semibold border-b border-[#DADCE0] border-l">Inclusive</th>
                </tr>
              </thead>
              <tbody className="text-[#202124]">
                <tr>
                  <td className="px-4 py-2 border-t border-[#DADCE0]">July 1 to July 5</td>
                  <td className="px-4 py-2 border-t border-[#DADCE0] border-l text-right font-mono">4 days</td>
                  <td className="px-4 py-2 border-t border-[#DADCE0] border-l text-right font-mono">5 days</td>
                </tr>
                <tr className="bg-[#F8F9FA]">
                  <td className="px-4 py-2 border-t border-[#DADCE0]">January 1 to January 1</td>
                  <td className="px-4 py-2 border-t border-[#DADCE0] border-l text-right font-mono">0 days</td>
                  <td className="px-4 py-2 border-t border-[#DADCE0] border-l text-right font-mono">1 day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Leap Years */}
        <section id="leap-years">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">Leap Years and Date Duration</h2>
          <p className="text-[#5F6368] text-sm leading-relaxed">
            Date durations can cross leap years, which contain 366 days instead of 365. The calculator uses the actual calendar dates when determining the duration, so February&nbsp;29 is included when it falls within the selected date range.
          </p>
        </section>

        {/* 6. Business Days */}
        <section id="business-days">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">Calendar Days vs. Business Days</h2>
          <p className="text-[#5F6368] text-sm leading-relaxed">
            Calendar days include every day in the date range. Business-day calculations count weekdays only and exclude Saturdays and Sundays. Public holidays are not excluded, as holiday rules vary by country and region.
          </p>
        </section>

        {/* 7. Examples */}
        <section id="examples">
          <h2 className="text-lg font-bold text-[#1967D2] mb-3">Date Duration Examples</h2>
          <div className="space-y-2">
            {[
              {
                title: 'Short range — same month',
                range: 'July 1, 2025 to July 5, 2025',
                lines: ['Standard: 4 days', 'Inclusive: 5 days'],
              },
              {
                title: 'Full calendar year',
                range: 'January 1, 2025 to January 1, 2026',
                lines: ['Elapsed: 365 days'],
              },
              {
                title: 'Leap year range',
                range: 'January 1, 2024 to January 1, 2025',
                lines: ['Elapsed: 366 days (2024 is a leap year)'],
              },
            ].map(ex => (
              <div key={ex.title} className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg px-4 py-3">
                <p className="font-semibold text-[#202124] text-sm">{ex.title}</p>
                <p className="font-mono text-[11px] text-[#5F6368] mt-0.5">{ex.range}</p>
                {ex.lines.map(l => (
                  <p key={l} className="font-mono text-[11px] text-[#1A73E8] mt-0.5">{l}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Excel */}
        <section id="excel">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">How to Calculate Days Between Dates in Excel</h2>
          <p className="text-[#5F6368] text-sm mb-3">If the start date is in A2 and the end date is in B2:</p>
          <div className="space-y-1.5">
            {[
              { code: '=B2-A2',             desc: 'Simple subtraction' },
              { code: '=DAYS(B2,A2)',        desc: 'DAYS function' },
              { code: '=DATEDIF(A2,B2,"d")', desc: 'DATEDIF — elapsed days' },
              { code: '=NETWORKDAYS(A2,B2)', desc: 'Weekdays only' },
            ].map(({ code, desc }) => (
              <div key={code} className="flex items-center gap-3 bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-2">
                <code className="font-mono text-sm text-[#1A73E8] font-bold shrink-0">{code}</code>
                <span className="text-[11px] text-[#70757A]">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Common Mistakes */}
        <section id="common-mistakes">
          <h2 className="text-lg font-bold text-[#1967D2] mb-2">Common Date Duration Mistakes</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-[#5F6368]">
            <li>Confusing elapsed days with inclusive day counting.</li>
            <li>Forgetting that leap years can contain 366 days.</li>
            <li>Assuming every month has the same number of days.</li>
            <li>Treating business days as the same as calendar days.</li>
            <li>Reversing the start and end dates.</li>
          </ul>
        </section>

        {/* 10. FAQ */}
        <section id="faq">
          <h2 className="text-lg font-bold text-[#1967D2] mb-4">Date Duration Calculator FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I calculate the number of days between two dates?',
                a: 'Subtract the start date from the end date. For example, July 1 to July 5 is 4 elapsed days. Enable Include end date when both dates should be counted.',
              },
              {
                q: 'Does the calculator include leap years?',
                a: 'Yes. Date ranges use the actual calendar dates, including February 29 during leap years.',
              },
              {
                q: 'Does the calculator count weekends?',
                a: 'Calendar-day results include weekends. Business-day results count weekdays only and exclude weekends.',
              },
              {
                q: 'What is the difference between inclusive and exclusive dates?',
                a: 'Standard elapsed counting measures the time between the dates. Inclusive counting includes both the start date and end date.',
              },
              {
                q: 'Can I calculate business days between two dates?',
                a: 'Yes. Expand More Results to see Business Days — weekdays only, weekends excluded.',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-[#202124] text-sm mb-1">{q}</h3>
                <p className="text-[#5F6368] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Related calculators */}
        <section id="related">
          <h2 className="text-lg font-bold text-[#1967D2] mb-3">Related Date Calculators</h2>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'Age Calculator', href: '/calculator/age-calculator/', desc: 'Calculate exact age from a birth date.' },
              { label: 'Nepali Date Converter', href: '/calculator/nepali-date/', desc: 'Convert between BS and AD calendar dates.' },
              { label: 'Pregnancy Due Date Calculator', href: '/calculator/pregnancy-due-date/', desc: 'Estimate delivery date from last period.' },
            ].map(({ label, href, desc }) => (
              <li key={href}>
                <Link href={href} className="font-semibold text-[#1A73E8] hover:underline">{label}</Link>
                <span className="text-[#5F6368]"> — {desc}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* TOC — desktop only */}
      <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto" aria-label="Page contents">
        <p className="text-[10px] font-black text-[#70757A] uppercase tracking-widest mb-3">Contents</p>
        <ol className="space-y-1 border-l-2 border-[#DADCE0] pl-0">
          {[
            ['#days-between-dates', 'Days Between Dates'],
            ['#what-it-calculates', 'What It Calculates'],
            ['#how-to-use', 'How to Use'],
            ['#inclusive-exclusive', 'Inclusive vs. Exclusive'],
            ['#leap-years', 'Leap Years'],
            ['#business-days', 'Business Days'],
            ['#examples', 'Examples'],
            ['#excel', 'Excel Formulas'],
            ['#common-mistakes', 'Common Mistakes'],
            ['#faq', 'FAQ'],
            ['#related', 'Related Calculators'],
          ].map(([href, label], i) => (
            <li key={href}>
              <a
                href={href}
                className="flex items-center gap-2 pl-3 py-1 -ml-px text-[12px] text-[#5F6368] hover:text-[#1A73E8] border-l-2 border-transparent hover:border-[#1A73E8] transition-colors"
              >
                <span className="font-mono text-[9px] text-[#DADCE0]">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <ModernCalcLayout
      slug="date-duration"
      layout="stacked"
      compactHeader={true}
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Date Duration Calculator' },
      ]}
      title="Date Duration Calculator – Days Between Dates"
      description="Calculate the time between two dates in days, weeks, months and years."
      icon={Calendar}
      inputs={inputsPanel}
      results={resultsPanel}
      details={detailsPanel}
      sidebar={{
        title: 'Date & Time Tools',
        links: [
          { label: 'Age Calculator',         href: '/calculator/age-calculator/',        icon: Calendar },
          { label: 'Nepali Date Converter',   href: '/calculator/nepali-date/',           icon: Calendar },
          { label: 'Pregnancy Due Date',      href: '/calculator/pregnancy-due-date/',    icon: Calendar },
          { label: 'Lok Sewa Age',            href: '/calculator/lok-sewa-age/',          icon: Clock },
          { label: 'Citizenship Age',         href: '/calculator/nepal-citizenship-age/', icon: Clock },
        ],
      }}
    />
  );
}
