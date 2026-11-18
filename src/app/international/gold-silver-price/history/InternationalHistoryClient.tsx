'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export interface YearlyRecord {
  year: number;
  avg: number;
  high: number;
  low: number;
  close: number;
  returnPct: number;
}

export interface InternationalHistoricalData {
  meta: {
    title: string;
    currency: string;
    baseUnit: string;
    sources: string;
    lastUpdated: string;
  };
  milestones: {
    gold: {
      allTimeHigh: { price: number; year: number; date: string; context: string };
      peak2024: { price: number; year: number; date: string; context: string };
      peak2020: { price: number; year: number; date: string; context: string };
      peak2011: { price: number; year: number; date: string; context: string };
      peak1980: { price: number; year: number; date: string; context: string };
      nixonShock1971: { price: number; year: number; date: string; context: string };
    };
    silver: {
      allTimeHigh: { price: number; year: number; date: string; context: string };
      peak2011: { price: number; year: number; date: string; context: string };
      peak1980: { price: number; year: number; date: string; context: string };
      historicLow1971: { price: number; year: number; date: string; context: string };
    };
    goldSilverRatio: {
      historicalAverage: number;
      allTimePeak: number;
      allTimePeakDate: string;
      allTimeLow: number;
      allTimeLowDate: string;
      current: number;
    };
  };
  cagr: {
    gold: { fiveYear: number; tenYear: number; twentyYear: number; fiftyYear: number };
    silver: { fiveYear: number; tenYear: number; twentyYear: number; fiftyYear: number };
  };
  goldYearly: YearlyRecord[];
  silverYearly: YearlyRecord[];
}

interface Props {
  initialData: InternationalHistoricalData;
  currentLiveRates?: {
    goldUSD: number;
    silverUSD: number;
  };
}

export default function InternationalHistoryClient({ initialData, currentLiveRates }: Props) {
  const [selectedMetal, setSelectedMetal] = useState<'gold' | 'silver'>('gold');
  const [selectedUnit, setSelectedUnit] = useState<'oz' | 'g' | 'kg'>('oz');
  const [selectedRange, setSelectedRange] = useState<'all' | '50y' | '20y' | '10y' | '5y'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'year' | 'avg' | 'high' | 'returnPct'>('year');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [hoveredPoint, setHoveredPoint] = useState<YearlyRecord | null>(null);

  // Unit conversion multipliers relative to 1 Troy Ounce (31.1034768 grams)
  const unitFactor = useMemo(() => {
    if (selectedUnit === 'g') return 1 / 31.1034768;
    if (selectedUnit === 'kg') return 1000 / 31.1034768;
    return 1;
  }, [selectedUnit]);

  const unitLabel = selectedUnit === 'oz' ? '/ oz' : selectedUnit === 'g' ? '/ g' : '/ kg';

  // Raw dataset for selected metal
  const activeDataset = selectedMetal === 'gold' ? initialData.goldYearly : initialData.silverYearly;

  // Filter by timeframe
  const rangeFilteredData = useMemo(() => {
    if (selectedRange === '5y') return activeDataset.filter((r) => r.year >= 2021);
    if (selectedRange === '10y') return activeDataset.filter((r) => r.year >= 2016);
    if (selectedRange === '20y') return activeDataset.filter((r) => r.year >= 2006);
    if (selectedRange === '50y') return activeDataset.filter((r) => r.year >= 1976);
    return activeDataset;
  }, [activeDataset, selectedRange]);

  // Search filter and sort
  const processedTableData = useMemo(() => {
    let list = [...rangeFilteredData];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((r) => String(r.year).includes(q));
    }
    list.sort((a, b) => {
      let diff = 0;
      if (sortField === 'year') diff = a.year - b.year;
      else if (sortField === 'avg') diff = a.avg - b.avg;
      else if (sortField === 'high') diff = a.high - b.high;
      else if (sortField === 'returnPct') diff = a.returnPct - b.returnPct;
      return sortDirection === 'desc' ? -diff : diff;
    });
    return list;
  }, [rangeFilteredData, searchQuery, sortField, sortDirection]);

  // High, Low, and Average for the selected filtered window
  const summaryStats = useMemo(() => {
    if (rangeFilteredData.length === 0) return { maxHigh: 0, minLow: 0, overallAvg: 0 };
    let maxHigh = 0;
    let minLow = Infinity;
    let sum = 0;
    rangeFilteredData.forEach((r) => {
      if (r.high > maxHigh) maxHigh = r.high;
      if (r.low < minLow) minLow = r.low;
      sum += r.avg;
    });
    return {
      maxHigh: maxHigh * unitFactor,
      minLow: minLow * unitFactor,
      overallAvg: (sum / rangeFilteredData.length) * unitFactor,
    };
  }, [rangeFilteredData, unitFactor]);

  const handleSort = (field: 'year' | 'avg' | 'high' | 'returnPct') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // SVG Chart points calculation (chronological order from oldest to newest)
  const chartPoints = useMemo(() => {
    const chronological = [...rangeFilteredData].sort((a, b) => a.year - b.year);
    if (chronological.length < 2) return [];

    const prices = chronological.map((r) => r.avg * unitFactor);
    const minP = Math.min(...prices) * 0.95;
    const maxP = Math.max(...prices) * 1.05;
    const rangeP = maxP - minP || 1;

    const width = 800;
    const height = 240;
    const paddingX = 40;
    const paddingY = 24;

    const innerW = width - paddingX * 2;
    const innerH = height - paddingY * 2;

    return chronological.map((r, i) => {
      const x = paddingX + (i / (chronological.length - 1)) * innerW;
      const price = r.avg * unitFactor;
      const y = paddingY + innerH - ((price - minP) / rangeP) * innerH;
      return { x, y, record: r, convertedPrice: price };
    });
  }, [rangeFilteredData, unitFactor]);

  const svgPathD = useMemo(() => {
    if (chartPoints.length < 2) return '';
    return chartPoints.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [chartPoints]);

  const svgAreaD = useMemo(() => {
    if (chartPoints.length < 2) return '';
    const firstX = chartPoints[0].x;
    const lastX = chartPoints[chartPoints.length - 1].x;
    return `${svgPathD} L ${lastX} 220 L ${firstX} 220 Z`;
  }, [chartPoints, svgPathD]);

  const formatPrice = (val: number) => {
    if (val >= 1000) {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (val >= 1) {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${val.toFixed(3)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-6 md:py-8 font-sans font-modern-ui">

      {/* ── TOP HEADER WITH LIVE RATE CHIPS & SIBLING LINKS ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              1970 - 2026 Historical Archive
            </span>
            <span className="text-xs text-gray-500 font-medium">COMEX &amp; LBMA Benchmark Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Gold &amp; Silver Price History (1970 - 2026)
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Explore 56+ years of official gold and silver historical spot rates in USD. Analyze multi-decade bull runs, annual high and low prices, the gold-silver ratio, and macroeconomic inflection points.
          </p>
        </div>

        {/* Live Spot Quick Links */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <Link
            href="/international/gold-silver-price/"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-gray-300 shadow-xs transition"
          >
            <span>Live Spot Dashboard</span>
            <span className="text-blue-600 font-bold">→</span>
          </Link>
          <Link
            href="/market-rates/gold-silver-ratio/"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-gray-300 shadow-xs transition"
          >
            <span>GSR Ratio</span>
            <span className="text-amber-600 font-bold">→</span>
          </Link>
        </div>
      </div>

      {/* ── CONTROL TOOLBAR (Metal Selector, Unit Selector, Timeframe Filter) ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Metal Selector (Gold vs Silver) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Metal:</span>
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedMetal('gold')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedMetal === 'gold'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gold (24K / Spot)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMetal('silver')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedMetal === 'silver'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Silver (.999 Fine)
              </button>
            </div>
          </div>

          {/* Unit Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unit:</span>
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              {(['oz', 'g', 'kg'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setSelectedUnit(unit)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedUnit === unit
                      ? 'bg-white text-gray-900 shadow-xs border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {unit === 'oz' ? 'Troy Oz' : unit === 'g' ? 'Gram' : 'Kilogram'}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Period:</span>
            <div className="inline-flex bg-gray-100 p-1 rounded-xl flex-wrap">
              {[
                { id: 'all', label: 'All (1970 - 2026)' },
                { id: '50y', label: '50Y' },
                { id: '20y', label: '20Y' },
                { id: '10y', label: '10Y' },
                { id: '5y', label: '5Y' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRange(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedRange === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Period Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-200">
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Period Peak High</span>
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              {formatPrice(summaryStats.maxHigh)} {unitLabel}
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-200">
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Period Low</span>
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              {formatPrice(summaryStats.minLow)} {unitLabel}
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-200">
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Period Average</span>
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              {formatPrice(summaryStats.overallAvg)} {unitLabel}
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-200">
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">10-Year CAGR</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-700">
              +{selectedMetal === 'gold' ? initialData.cagr.gold.tenYear : initialData.cagr.silver.tenYear}% / yr
            </span>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE MULTI-YEAR SVG CHART ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {selectedMetal === 'gold' ? 'Historical Gold Price Chart' : 'Historical Silver Price Chart'} (USD {unitLabel})
            </h2>
            <p className="text-xs text-gray-500">
              Annual average benchmark price curve across {rangeFilteredData.length} recorded market years.
            </p>
          </div>
          {hoveredPoint && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-lg text-xs font-semibold">
              <span className="text-gray-300">Year {hoveredPoint.year}:</span>
              <span className="font-extrabold text-amber-300">
                {formatPrice(hoveredPoint.avg * unitFactor)} {unitLabel}
              </span>
              <span className={hoveredPoint.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                ({hoveredPoint.returnPct >= 0 ? '+' : ''}{hoveredPoint.returnPct.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>

        {/* SVG Container */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox="0 0 800 240"
            className="w-full h-48 sm:h-64 select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradientGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="chartGradientSilver" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#64748B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="40" y1="40" x2="760" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="100" x2="760" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="160" x2="760" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="220" x2="760" y2="220" stroke="#CBD5E1" strokeWidth="1" />

            {/* Area Fill */}
            {svgAreaD && (
              <path
                d={svgAreaD}
                fill={selectedMetal === 'gold' ? 'url(#chartGradientGold)' : 'url(#chartGradientSilver)'}
              />
            )}

            {/* Trend Line */}
            {svgPathD && (
              <path
                d={svgPathD}
                fill="none"
                stroke={selectedMetal === 'gold' ? '#D97706' : '#475569'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Dots */}
            {chartPoints.map((pt) => (
              <g
                key={pt.record.year}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint(pt.record)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  className={
                    hoveredPoint?.year === pt.record.year
                      ? 'fill-red-600 stroke-white stroke-2'
                      : selectedMetal === 'gold'
                      ? 'fill-amber-600 stroke-white stroke-1'
                      : 'fill-slate-700 stroke-white stroke-1'
                  }
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Horizontal Axis Year Labels */}
        <div className="flex justify-between items-center text-[10px] text-gray-500 px-6 mt-1 font-semibold">
          <span>{rangeFilteredData[rangeFilteredData.length - 1]?.year || 1970}</span>
          {rangeFilteredData.length > 20 && <span>1995</span>}
          {rangeFilteredData.length > 15 && <span>2010</span>}
          {rangeFilteredData.length > 8 && <span>2020</span>}
          <span>2026 (Live)</span>
        </div>
      </div>

      {/* ── SORTABLE & SEARCHABLE YEAR-BY-YEAR DATA TABLE ── */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden mb-8">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Annual Price History Table ({selectedMetal === 'gold' ? 'Gold' : 'Silver'} - USD {unitLabel})
            </h3>
            <p className="text-xs text-gray-500">
              Click any column heading to sort. Showing {processedTableData.length} recorded market years.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              placeholder="Search year (e.g. 2024)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-gray-900 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-gray-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th
                  scope="col"
                  onClick={() => handleSort('year')}
                  className="px-4 py-3 cursor-pointer hover:bg-slate-100 transition select-none"
                >
                  <span className="flex items-center gap-1">
                    Year {sortField === 'year' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </span>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('avg')}
                  className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Annual Avg {sortField === 'avg' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </span>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('high')}
                  className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Year High (Peak) {sortField === 'high' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </span>
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Year Low
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Year Close
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('returnPct')}
                  className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 transition select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Annual Return {sortField === 'returnPct' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {processedTableData.map((row) => {
                const isPositive = row.returnPct >= 0;
                return (
                  <tr
                    key={row.year}
                    className="hover:bg-amber-50/40 transition-colors"
                  >
                    <td className="px-4 py-2.5 font-bold text-gray-900">
                      <span className="flex items-center gap-1.5">
                        {row.year}
                        {row.year === 2026 && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 uppercase">
                            YTD
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-gray-900 tabular-nums">
                      {formatPrice(row.avg * unitFactor)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-emerald-800 tabular-nums">
                      {formatPrice(row.high * unitFactor)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-600 tabular-nums">
                      {formatPrice(row.low * unitFactor)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-gray-800 tabular-nums">
                      {formatPrice(row.close * unitFactor)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {isPositive ? '+' : ''}{row.returnPct.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

