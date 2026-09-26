'use client';

import React, { useState, useMemo, useEffect } from 'react';

type HistoricalRecord = {
  date_ad: string;
  date_bs: string;
  day: string;
  metal: string;
  source_category: string;
  source_rate_10g: number;
  source_rate_tola: number;
  calculated_rate_gram: number;
  calculated_rate_kg: number;
  source_type: string;
  verification_status: string;
};

export default function HistoryClient({ records }: { records: HistoricalRecord[] }) {
  const [metalFilter, setMetalFilter] = useState<'all' | 'gold' | 'silver'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 30;

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    records.forEach(r => {
      const bsYear = r.date_bs.split('-')[0];
      const adYear = r.date_ad.split('-')[0];
      years.add(`${bsYear}/${adYear}`);
    });
    return Array.from(years).sort().reverse();
  }, [records]);

  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Default to first year if 'All' is not desired, but 'All' is safer for initial state
  // Let's set it to the latest year by default on mount if available
  useEffect(() => {
    if (availableYears.length > 0 && selectedYear === 'All') {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears]);

  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
        if (selectedYear !== 'All') {
          const bsYear = r.date_bs.split('-')[0];
          const adYear = r.date_ad.split('-')[0];
          if (`${bsYear}/${adYear}` !== selectedYear) return false;
        }
        if (metalFilter !== 'all' && r.metal !== metalFilter) return false;
        if (dateFrom && r.date_ad < dateFrom) return false;
        if (dateTo && r.date_ad > dateTo) return false;
        return true;
      })
      .sort((a, b) => {
        // Sort by date then by metal for deterministic order
        const dateA = a.date_ad;
        const dateB = b.date_ad;
        if (dateA !== dateB) {
           if (sortOrder === 'desc') return dateA < dateB ? 1 : -1;
           return dateA > dateB ? 1 : -1;
        }
        return a.metal.localeCompare(b.metal);
      });
  }, [records, metalFilter, dateFrom, dateTo, sortOrder, selectedYear]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [metalFilter, dateFrom, dateTo, sortOrder, selectedYear]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRecords.length);
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const fmtNPR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(val);

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

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
      
      {/* Year Tabs */}
      <div className="flex flex-wrap gap-1 mb-4 border-b border-slate-300">
        <button
          onClick={() => setSelectedYear('All')}
          className={`px-4 py-2.5 text-sm font-medium rounded-t-md border border-b-0 transition-colors ${
            selectedYear === 'All' 
              ? 'bg-white border-slate-300 text-slate-900 -mb-px' 
              : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          All Years
        </button>
        {availableYears.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-md border border-b-0 transition-colors ${
              selectedYear === year 
                ? 'bg-white border-slate-300 text-slate-900 -mb-px' 
                : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 mb-1">
          {selectedYear === 'All' ? 'Gold & Silver Rate History' : `Gold & Silver Rate History ${selectedYear}`}
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          Verified historical records available for selected dates. Additional dates will be added as source records are validated.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
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
          <p className="text-slate-600 font-medium">No verified historical record is available for this selection.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm border-collapse min-w-[800px]">
            <caption className="sr-only">Historical Gold and Silver Price Table</caption>
            <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
              <tr>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Date (AD)</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Date (BS)</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Day</th>
                <th scope="col" className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Metal</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">per 10g</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">per Tola (11.66g)</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">per Gram*</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">per Kg*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedRecords.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{r.date_ad}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.date_bs}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{r.day}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${r.metal === 'gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                      {r.source_category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">रू {fmtNPR(r.source_rate_10g)}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-bold text-slate-900">रू {fmtNPR(r.source_rate_tola)}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">रू {fmtNPR(r.calculated_rate_gram)}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">रू {fmtNPR(r.calculated_rate_kg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {filteredRecords.length > 0 && (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 font-medium">
          <div>
            Showing {startIndex + 1} to {endIndex} of {filteredRecords.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
      <div className="mt-2 text-right text-xs text-slate-400">
        * Calculated equivalents
      </div>
    </div>
  );
}
