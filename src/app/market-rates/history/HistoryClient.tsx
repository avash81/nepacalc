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
  source_type: string;
  source_document_id?: string;
  source_priority?: string;
  verification_status: string;
};

export default function HistoryClient({
  records,
}: {
  records: HistoricalRecord[];
}) {
  const [metalFilter, setMetalFilter] = useState<'all' | 'gold' | 'silver'>(
    'all'
  );
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<HistoricalRecord | null>(null);
  const rowsPerPage = 30;

  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
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
  }, [
    records,
    metalFilter,
    dateFrom,
    dateTo,
    sortOrder,
  ]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    metalFilter,
    dateFrom,
    dateTo,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRecords.length);
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const fmtNPR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(val);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
      {/* Main Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
        <div className="w-full md:w-auto">
          <label
            htmlFor="metalFilter"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Metal
          </label>
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
          <label
            htmlFor="dateFrom"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            From Date
          </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div className="w-full md:w-auto">
          <label
            htmlFor="dateTo"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            To Date
          </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full md:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div className="w-full md:w-auto ml-auto">
          <label
            htmlFor="sortOrder"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
          >
            Sort
          </label>
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
          <p className="text-slate-600 font-medium">
            No verified historical record is available for this selection.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm border-collapse min-w-[800px]">
            <caption className="sr-only">
              Historical Gold and Silver Price Table
            </caption>
            <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
              <tr>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600"
                >
                  Date (AD)
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600"
                >
                  Date (BS)
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600"
                >
                  Metal
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600"
                >
                  per 10g
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600"
                >
                  per Tola (11.66g)
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400"
                >
                  per Gram*
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400"
                >
                  per Kg*
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedRecords.map((r, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelectedRecord(r)}
                  className={`cursor-pointer transition-colors ${selectedRecord === r ? 'bg-amber-50 border-l-4 border-amber-400' : 'hover:bg-slate-50/60'}`}
                >
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">
                    {r.date_ad}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {r.date_bs}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${r.metal === 'gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {r.rate_type || r.source_category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900">
                    Rs {fmtNPR(r.source_rate_10g)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-bold text-slate-900">
                    Rs {fmtNPR(r.source_rate_tola)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">
                    Rs {fmtNPR(r.calculated_rate_gram)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-500">
                    Rs {fmtNPR(r.calculated_rate_kg)}
                  </td>
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
            Showing {startIndex + 1} to {endIndex} of {filteredRecords.length}{' '}
            entries
          </div>
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
                  onClick={() =>
                    typeof page === 'number' && setCurrentPage(page)
                  }
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
      {selectedRecord && (
        <div className="mt-8 p-5 bg-white border-2 border-amber-200 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide">
                Historical Conversion: {selectedRecord.metal === 'gold' ? 'Gold' : 'Silver'}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Rates as of {selectedRecord.date_ad} {selectedRecord.date_bs ? `(${selectedRecord.date_bs})` : ''}
              </p>
            </div>
            <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-slate-600 font-bold p-2 text-xl leading-none">&times;</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { unit: 'Gram', val: selectedRecord.calculated_rate_gram },
              { unit: '10 Grams', val: selectedRecord.source_rate_10g },
              { unit: 'Tola', val: selectedRecord.source_rate_tola },
              { unit: 'Ana', val: selectedRecord.source_rate_tola / 16 },
              { unit: 'Lal', val: selectedRecord.source_rate_tola / 160 },
              { unit: 'Kg', val: selectedRecord.calculated_rate_kg }
            ].map((c) => (
              <div key={c.unit} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{c.unit}</div>
                <div className="text-sm font-black text-slate-900">Rs {fmtNPR(c.val)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-right text-xs text-slate-400">
        * Calculated equivalents
      </div>
    </div>
  );
}
