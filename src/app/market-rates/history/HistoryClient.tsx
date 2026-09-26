'use client';

import React, { useState, useMemo } from 'react';

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

  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
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
  }, [records, metalFilter, dateFrom, dateTo, sortOrder]);

  const fmtNPR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(val);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
      
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
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Price / 10g</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600">Price / Tola</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Price / Gram*</th>
                <th scope="col" className="text-right px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Price / Kg*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRecords.map((r, i) => (
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

      <div className="mt-4 flex justify-between items-center text-xs text-slate-500 font-medium">
        <div>Showing {filteredRecords.length} records</div>
        <div>* Calculated equivalents</div>
      </div>
    </div>
  );
}
