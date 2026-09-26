'use client';

import React, { useState, useMemo, useEffect } from 'react';

type HistoricalRecord = {
  date_ad: string;
  date_bs: string;
  day: string;
  metal: string;
  source_category: string;
  rate_type?: string;
  source_rate_10g: number;
  source_rate_tola: number;
  calculated_rate_gram: number;
  calculated_rate_kg: number;
  currency: string;
  source_name: string;
  source_priority: string;
  verification_status: string;
  source_url?: string;
  flag_reason?: string;
};

export default function HistoryClient({
  records,
}: {
  records: HistoricalRecord[];
}) {
  const [metalFilter, setMetalFilter] = useState<'all' | 'gold' | 'silver'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 30;

  // Selected date for Answer Box & Unit Converter
  const latestDate = useMemo(() => {
    if (!records.length) return '';
    return records[0].date_ad;
  }, [records]);

  const [selectedDate, setSelectedDate] = useState<string>(latestDate || '');

  useEffect(() => {
    if (latestDate && !selectedDate) {
      setSelectedDate(latestDate);
    }
  }, [latestDate, selectedDate]);

  // Filtered dataset
  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        if (metalFilter !== 'all' && r.metal !== metalFilter) return false;
        if (dateFrom && r.date_ad < dateFrom) return false;
        if (dateTo && r.date_ad > dateTo) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = a.date_ad;
        const dateB = b.date_ad;
        if (dateA !== dateB) {
          return sortOrder === 'desc' ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
        }
        return a.metal.localeCompare(b.metal);
      });
  }, [records, metalFilter, dateFrom, dateTo, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [metalFilter, dateFrom, dateTo, sortOrder]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRecords.length);
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const fmtNPR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(val);

  // Selected Date Records for Answer Box & Converter
  const selectedDateRecords = useMemo(() => {
    if (!selectedDate) return [];
    return records.filter((r) => r.date_ad === selectedDate);
  }, [records, selectedDate]);


  const getPageNumbers = () => {
    const pages = [];
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
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</span>;
      case 'corroborated':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">Corroborated</span>;
      case 'secondary-only':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">Secondary-only</span>;
      case 'conflict':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">Conflict</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  // Helper to format date as '25 September 2026'
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'Select Date';
    try {
      return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(selectedDate));
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  const directAnswerGold = selectedDateRecords.find(r => r.metal === 'gold');
  const directAnswerSilver = selectedDateRecords.find(r => r.metal === 'silver');

  return (
    <div className="space-y-8">
      {/* ── Table Heading ── */}
      <div className="max-w-4xl">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2">
          Historical Gold and Silver Price Table
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          View available rates by date. Source prices are shown per tola and per 10 grams. Per gram and per kilogram values are calculated equivalents using 1 tola = 11.664 grams.
        </p>
      </div>

      {/* ── 1. SELECTED-DATE ANSWER BOX ── */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Gold and Silver Prices on {formattedSelectedDate}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select any date in the table or date picker below to view rates for that day.
            </p>
          </div>
          <div className="shrink-0">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {selectedDateRecords.length === 0 ? (
          <p className="text-sm text-slate-600 font-medium py-2">
            No verified historical record is currently available for this date. NepaCalc does not estimate or interpolate missing historical rates.
          </p>
        ) : (
          <div>
            {directAnswerGold && directAnswerSilver && (
              <p className="text-sm text-slate-700 font-medium bg-slate-50 p-4 border border-slate-200 rounded-lg mb-4">
                Historical rate for {formattedSelectedDate}: Gold was NPR {fmtNPR(directAnswerGold.source_rate_tola)} per tola and silver was NPR {fmtNPR(directAnswerSilver.source_rate_tola)} per tola in the available {directAnswerGold.verification_status === 'verified' ? 'verified FENEGOSIDA' : 'historical'} records.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateRecords.map((r, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  {/* Metal — Rate Type */}
                  <div className="mb-3">

                  <span className="text-sm font-black text-slate-900">
                    {r.metal === 'gold' ? 'Gold' : 'Silver'}
                  </span>
                  {(r.rate_type || r.source_category) && (
                    <span className="text-sm font-normal text-slate-500 ml-1">
                      : {r.rate_type || r.source_category}
                    </span>
                  )}
                </div>
                {/* Prices */}
                <div className="space-y-1 text-sm font-bold text-slate-900">
                  <div>NPR {fmtNPR(r.source_rate_tola)} <span className="text-xs font-medium text-slate-500">per tola</span></div>
                  <div>NPR {fmtNPR(r.source_rate_10g)} <span className="text-xs font-medium text-slate-500">per 10 grams</span></div>
                </div>
                {/* Source + Status */}
                <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-1 text-xs font-medium text-slate-500">
                  <div>Source: <strong className="text-slate-700">{r.source_name}</strong></div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">Status: {statusBadge(r.verification_status)}</span>
                    <span className="text-slate-400">BS: {r.date_bs || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 2. MAIN TABLE & FILTERS ── */}
      <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">


        {/* Main Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
          <div className="w-full md:w-auto">
            <label htmlFor="metalFilter" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Metal</label>
            <select
              id="metalFilter"
              value={metalFilter}
              onChange={(e) => setMetalFilter(e.target.value as any)}
              className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Metals</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <label htmlFor="dateFrom" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">From Date</label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <label htmlFor="dateTo" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">To Date</label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div className="w-full md:w-auto ml-auto">
            <label htmlFor="sortOrder" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Sort</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600 font-medium text-sm">
              No historical record is available for this selection. NepaCalc does not estimate missing values.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm border-collapse min-w-[900px]">
              <caption className="sr-only">Historical Gold and Silver Price Table</caption>
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
                <tr>
                  <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Date (AD)</th>
                  <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">BS Date</th>
                  <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Metal / Rate Type</th>
                  <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Per Tola</th>
                  <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Per 10g</th>
                  <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Per Gram*</th>
                  <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Per Kg*</th>
                  <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Source</th>
                  <th scope="col" className="text-center px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedRecords.map((r, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedDate(r.date_ad)}
                    className={`cursor-pointer transition-colors ${selectedDate === r.date_ad ? 'bg-amber-50/80 border-l-4 border-amber-400' : 'hover:bg-slate-50/60'}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{r.date_ad}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.date_bs || 'N/A'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${r.metal === 'gold' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-800'}`}>
                        {r.rate_type || r.source_category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-bold text-slate-900">Rs {fmtNPR(r.source_rate_tola)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-800">Rs {fmtNPR(r.source_rate_10g)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">Rs {fmtNPR(r.calculated_rate_gram)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">Rs {fmtNPR(r.calculated_rate_kg)}</td>
                    <td className="px-4 py-3 text-left font-medium text-slate-700 whitespace-nowrap">{r.source_name}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">{statusBadge(r.verification_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Asterisk explanation */}
        <div className="mt-3 text-xs text-slate-500 font-medium">
          * Per gram and per kilogram values are calculated equivalents using 1 tola = 11.664 grams.
        </div>

        {/* Pagination Footer */}
        {filteredRecords.length > 0 && (
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 font-medium pt-2">
            <div>Showing {startIndex + 1} to {endIndex} of {filteredRecords.length} entries</div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    disabled={page === '...'}
                    className={`px-3 py-1 min-w-[32px] text-center border-y border-r first:border-l border-slate-300 transition-colors
                      ${page === currentPage ? 'bg-slate-100 font-bold text-slate-900' : 'bg-white hover:bg-slate-50 text-slate-600'}
                      ${page === '...' ? 'cursor-default border-none bg-transparent hover:bg-transparent' : ''}
                    `}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
