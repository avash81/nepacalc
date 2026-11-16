'use client';

import React, { useState } from 'react';
import NepaliDate from 'nepali-date-converter';

interface YearRecord {
  date_ad: string;
  date_bs?: string | null;
  gold_tola: number | null;
  gold_10g: number | null;
  silver_tola: number | null;
  silver_10g: number | null;
}

interface YearClientFilterProps {
  year: string;
  data: YearRecord[];
}

const BS_MONTH_NAMES_NP = [
  'बैशाख','जेठ','असार','श्रावण','भाद्र','असोज','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत'
];

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

const fmtNPR = (v: number | null | undefined) =>
  v == null || isNaN(v) ? '—' : 'NPR ' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(v);

export default function YearClientFilter({ year, data: initialData }: YearClientFilterProps) {
  const [data, setData] = useState<YearRecord[]>(initialData);
  const [unit, setUnit] = useState<'gram' | 'tola'>('gram');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 30;

  // Real-time dynamic fetch: overlay today's newly published rate live in the browser
  React.useEffect(() => {
    if (year === '2026' || year === new Date().getFullYear().toString()) {
      fetch('/data/daily-history.json')
        .then((res) => res.json())
        .then((liveHistory: any[]) => {
          if (Array.isArray(liveHistory) && liveHistory.length > 0) {
            const currentYearEntries = liveHistory.filter((r) => r.date && r.date.startsWith(year));
            if (currentYearEntries.length > 0) {
              setData((prev) => {
                const map = new Map<string, YearRecord>();
                prev.forEach((r) => map.set(r.date_ad, r));
                const tolaInGrams = 11.6638;
                currentYearEntries.forEach((r) => {
                  const existing = map.get(r.date);
                  const gTola = r.gold_tola ?? r.gold ?? existing?.gold_tola ?? null;
                  const sTola = r.silver_tola ?? r.silver ?? existing?.silver_tola ?? null;
                  map.set(r.date, {
                    date_ad: r.date,
                    date_bs: r.date_bs || existing?.date_bs || null,
                    gold_tola: gTola,
                    gold_10g: r.gold_10g || (gTola ? Math.round((gTola / tolaInGrams) * 10) : null),
                    silver_tola: sTola,
                    silver_10g: r.silver_10g || (sTola ? Math.round((sTola / tolaInGrams) * 10) : null),
                  });
                });
                return Array.from(map.values()).sort((a, b) => b.date_ad.localeCompare(a.date_ad));
              });
            }
          }
        })
        .catch(() => {});
    }
  }, [year]);

  const totalEntries = data.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const paginatedRows = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getPageNumbers = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) range.push(i);
      range.push('...');
      range.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      range.push(1);
      range.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      range.push('...');
      range.push(currentPage - 1);
      range.push(currentPage);
      range.push(currentPage + 1);
      range.push('...');
      range.push(totalPages);
    }
    return range;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Rate History by Day ({year})</h3>

        {/* Grams / Tola Toggle matching exact history page format */}
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

        {/* Table matching exact history page columns & styling */}
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
              {paginatedRows.map((row) => (
                <tr key={row.date_ad} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {formatNepaliDateBS(row.date_ad)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{row.date_ad}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                    {fmtNPR(unit === 'tola' ? row.gold_tola : row.gold_10g)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                    {fmtNPR(unit === 'tola' ? row.silver_tola : row.silver_10g)}
                  </td>
                </tr>
              ))}
              {paginatedRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No historical records available for {year}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer matching exact history page format */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-200 text-sm text-slate-600">
          <div>
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1 select-none flex-wrap">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
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
                const isActive = pageNum === currentPage;

                return (
                  <button
                    key={`page-${pageNum}`}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
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
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
