'use client';

import React, { useState, useMemo, useEffect } from 'react';

type HistoricalRecord = {
  date_ad: string;
  date_bs: string | null;
  metal: string;
  rate_type: string;
  source_per_tola: number | null;
  source_per_10g: number | null;
  calculated_per_gram: number | null;
  calculated_per_kg: number | null;
  source: string;
  source_url?: string;
  status: string;
};

export default function HistoryClient({ records }: { records: HistoricalRecord[] }) {
  const [metalFilter, setMetalFilter] = useState<'all' | 'Gold' | 'Silver'>('all');
  const [rateTypeFilter, setRateTypeFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('Verified');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;
  const [selectedDate, setSelectedDate] = useState<string>('');

  const rateTypes = useMemo(() => Array.from(new Set(records.map(r => r.rate_type))), [records]);
  const sources = useMemo(() => Array.from(new Set(records.map(r => r.source))), [records]);
  const statuses = useMemo(() => Array.from(new Set(records.map(r => r.status))), [records]);

  useEffect(() => {
    if (records.length > 0 && !selectedDate) {
      const latestVerified = records.find(r => r.status === 'Verified');
      if (latestVerified) setSelectedDate(latestVerified.date_ad);
    }
  }, [records, selectedDate]);

  const selectedDateRecords = useMemo(() => {
    if (!selectedDate) return [];
    return records.filter(r => r.date_ad === selectedDate);
  }, [records, selectedDate]);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (metalFilter !== 'all' && r.metal.toLowerCase() !== metalFilter.toLowerCase()) return false;
      if (rateTypeFilter !== 'all' && r.rate_type !== rateTypeFilter) return false;
      if (sourceFilter !== 'all' && r.source !== sourceFilter) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (dateFrom && r.date_ad < dateFrom) return false;
      if (dateTo && r.date_ad > dateTo) return false;
      return true;
    }).sort((a, b) => {
      const dA = new Date(a.date_ad).getTime();
      const dB = new Date(b.date_ad).getTime();
      return sortOrder === 'newest' ? dB - dA : dA - dB;
    });
  }, [records, metalFilter, rateTypeFilter, sourceFilter, statusFilter, dateFrom, dateTo, sortOrder]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const currentRecords = filteredRecords.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const fmtNPR = (num: number | null) => {
    if (num === null || num === undefined) return 'N/A';
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);
  };

  const getPagination = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const statusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</span>;
      case 'corroborated':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">Corroborated</span>;
      case 'secondary-only':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">Secondary-only</span>;
      case 'conflict':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">Conflict</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'Select Date';
    try {
      return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(selectedDate));
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  const directAnswerGold = selectedDateRecords.find(r => r.metal.toLowerCase() === 'gold');
  const directAnswerSilver = selectedDateRecords.find(r => r.metal.toLowerCase() === 'silver');

  return (
    <div className="space-y-8">

      {/* ── 1. SELECTED-DATE ANSWER BOX ── */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-4">
          Gold and Silver Prices on {formattedSelectedDate}
        </h2>
        <div className="mb-4">
          <label htmlFor="selectedDateInput" className="sr-only">Select Date</label>
          <input
            id="selectedDateInput"
            type="date"
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {selectedDateRecords.length === 0 ? (
          <p className="text-sm text-slate-600 font-medium py-2">
            No verified historical record is currently available for this date. NepaCalc does not estimate or interpolate missing historical rates.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gold Answer Card */}
            {directAnswerGold ? (
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-1">Gold</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4">{directAnswerGold.rate_type}</p>
                <div className="space-y-2">
                  <div className="text-2xl font-black text-amber-700">
                    NPR {fmtNPR(directAnswerGold.source_per_tola)}
                    <span className="text-sm font-semibold text-slate-500 ml-1">per tola</span>
                  </div>
                  <div className="text-lg font-bold text-slate-700">
                    NPR {fmtNPR(directAnswerGold.source_per_10g)}
                    <span className="text-sm font-semibold text-slate-500 ml-1">per 10 grams</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    NPR {fmtNPR(directAnswerGold.calculated_per_gram)} per gram
                    <span className="text-xs text-slate-400 ml-1">(calculated)</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600 grid grid-cols-2 gap-2">
                  <div><span className="text-slate-400 block mb-0.5">Source</span>{directAnswerGold.source}</div>
                  <div><span className="text-slate-400 block mb-0.5">Status</span>{statusBadge(directAnswerGold.status)}</div>
                  <div className="col-span-2 mt-1"><span className="text-slate-400">BS Date: </span>{directAnswerGold.date_bs || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-center">
                <p className="text-sm text-slate-500">No gold record available for this date.</p>
              </div>
            )}

            {/* Silver Answer Card */}
            {directAnswerSilver ? (
              <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-1">Silver</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4">{directAnswerSilver.rate_type}</p>
                <div className="space-y-2">
                  <div className="text-2xl font-black text-slate-700">
                    NPR {fmtNPR(directAnswerSilver.source_per_tola)}
                    <span className="text-sm font-semibold text-slate-500 ml-1">per tola</span>
                  </div>
                  <div className="text-lg font-bold text-slate-600">
                    NPR {fmtNPR(directAnswerSilver.source_per_10g)}
                    <span className="text-sm font-semibold text-slate-500 ml-1">per 10 grams</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    NPR {fmtNPR(directAnswerSilver.calculated_per_gram)} per gram
                    <span className="text-xs text-slate-400 ml-1">(calculated)</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600 grid grid-cols-2 gap-2">
                  <div><span className="text-slate-400 block mb-0.5">Source</span>{directAnswerSilver.source}</div>
                  <div><span className="text-slate-400 block mb-0.5">Status</span>{statusBadge(directAnswerSilver.status)}</div>
                  <div className="col-span-2 mt-1"><span className="text-slate-400">BS Date: </span>{directAnswerSilver.date_bs || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-center">
                <p className="text-sm text-slate-500">No silver record available for this date.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 2. TABLE INTRO ── */}
      <div className="max-w-4xl">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-3">
          Historical Gold and Silver Price Table
        </h2>
        <p className="text-sm text-slate-700 font-medium leading-relaxed mb-2">
          View available historical gold and silver rates by date. Source-published prices are shown per tola and per 10 grams. Per-gram and per-kilogram values are calculated equivalents using 1 tola = 11.664 grams and are clearly distinguished from source values.
        </p>
      </div>

      {/* ── 3. MAIN TABLE & FILTERS ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

        {/* Filters Row */}
        <div className="p-4 md:p-6 border-b border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end">
            <div>
              <label htmlFor="metalFilter" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Metal</label>
              <select id="metalFilter" value={metalFilter} onChange={(e) => { setMetalFilter(e.target.value as 'all' | 'Gold' | 'Silver'); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>
            </div>
            <div>
              <label htmlFor="rateTypeFilter" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Rate Type</label>
              <select id="rateTypeFilter" value={rateTypeFilter} onChange={(e) => { setRateTypeFilter(e.target.value); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All</option>
                {rateTypes.map(rt => <option key={rt} value={rt}>{rt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="dateFrom" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">From Date</label>
              <input type="date" id="dateFrom" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label htmlFor="dateTo" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">To Date</label>
              <input type="date" id="dateTo" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label htmlFor="sourceFilter" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Source</label>
              <select id="sourceFilter" value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All</option>
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Status</label>
              <select id="statusFilter" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400">
                <option value="all">All</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Sort</label>
              <select id="sortOrder" value={sortOrder} onChange={(e) => { setSortOrder(e.target.value as 'newest' | 'oldest'); setCurrentPage(1); }} className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-400">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Showing {filteredRecords.length === 0 ? 0 : Math.min((currentPage - 1) * rowsPerPage + 1, filteredRecords.length)}–{Math.min(currentPage * rowsPerPage, filteredRecords.length)} of {filteredRecords.length} {statusFilter === 'all' ? 'available' : statusFilter.toLowerCase()} records
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Date (AD)</th>
                <th className="px-4 py-3 whitespace-nowrap">Date (BS)</th>
                <th className="px-4 py-3 whitespace-nowrap">Metal</th>
                <th className="px-4 py-3 whitespace-nowrap">Rate Type</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Per Tola (NPR)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Per 10g (NPR)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right border-l border-slate-200">Per Gram*</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Per Kg*</th>
                <th className="px-4 py-3 whitespace-nowrap">Source</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentRecords.map((r, idx) => (
                <tr
                  key={`${r.date_ad}-${r.metal}-${idx}`}
                  className="hover:bg-amber-50/40 transition-colors"
                >
                  <td
                    className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap cursor-pointer hover:text-amber-700 hover:underline"
                    onClick={() => setSelectedDate(r.date_ad)}
                    title="Click to view full details for this date"
                  >
                    {r.date_ad}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{r.date_bs || 'N/A'}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-800 whitespace-nowrap">{r.metal}</td>
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{r.rate_type}</td>
                  <td className="px-4 py-2.5 font-bold text-amber-700 text-right whitespace-nowrap">{fmtNPR(r.source_per_tola)}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-700 text-right whitespace-nowrap">{fmtNPR(r.source_per_10g)}</td>
                  <td className="px-4 py-2.5 text-slate-500 text-right whitespace-nowrap border-l border-slate-100">{fmtNPR(r.calculated_per_gram)}</td>
                  <td className="px-4 py-2.5 text-slate-500 text-right whitespace-nowrap">{fmtNPR(r.calculated_per_kg)}</td>
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">
                    {r.source_url ? (
                      <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{r.source}</a>
                    ) : r.source}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">{statusBadge(r.status)}</td>
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-slate-500 text-sm">
                    No historical records found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footnote */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] text-slate-400 font-medium">* Per gram and per kg values are calculated equivalents (1 tola = 11.664 grams), not source-published prices.</p>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-40">
              Previous
            </button>
            <div className="flex flex-wrap items-center gap-1">
              {getPagination().map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof p === 'number' && setCurrentPage(p)}
                  disabled={p === '...'}
                  className={`px-2.5 py-1 text-xs font-bold rounded min-w-[28px] transition-colors ${
                    currentPage === p
                      ? 'bg-amber-500 text-white'
                      : p === '...'
                      ? 'text-slate-400 cursor-default'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-40">
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
