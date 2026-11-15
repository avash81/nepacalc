'use client';
import React, { useState, useEffect } from 'react';

export default function YearClientFilter({ children }: { children?: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [unit, setUnit] = useState<'gram' | 'tola'>('gram');
  const rowsPerPage = 20;

  // Toggle Gram / Tola across headers and cell values
  useEffect(() => {
    const thGold = document.getElementById('th-gold');
    const thSilver = document.getElementById('th-silver');
    if (thGold) {
      thGold.textContent = unit === 'tola' ? 'Fine Gold (per Tola)' : 'Fine Gold (per 10g)';
    }
    if (thSilver) {
      thSilver.textContent = unit === 'tola' ? 'Silver (per Tola)' : 'Silver (per 10g)';
    }

    const tolaEls = document.querySelectorAll('.unit-tola');
    const gramEls = document.querySelectorAll('.unit-gram');

    tolaEls.forEach(el => {
      (el as HTMLElement).style.display = unit === 'tola' ? 'inline' : 'none';
    });
    gramEls.forEach(el => {
      (el as HTMLElement).style.display = unit === 'gram' ? 'inline' : 'none';
    });
  }, [unit]);

  useEffect(() => {
    const rows = document.querySelectorAll('tr.history-row');
    let matchingRows: HTMLElement[] = [];
    
    rows.forEach((row) => {
      const htmlRow = row as HTMLElement;
      const dateAd = htmlRow.getAttribute('data-date-ad') || '';
      const dateBs = htmlRow.getAttribute('data-date-bs') || '';
      
      const match = dateAd.includes(searchTerm) || dateBs.includes(searchTerm);
      if (match) {
        matchingRows.push(htmlRow);
      } else {
        htmlRow.style.display = 'none';
      }
    });

    setTotalEntries(matchingRows.length);
    const maxPage = Math.max(1, Math.ceil(matchingRows.length / rowsPerPage));
    if (currentPage > maxPage) {
        setCurrentPage(1); // reset if filtering reduces pages
        return; // the state update will re-run useEffect
    }

    matchingRows.forEach((row, idx) => {
       if (idx >= (currentPage - 1) * rowsPerPage && idx < currentPage * rowsPerPage) {
           row.style.display = '';
       } else {
           row.style.display = 'none';
       }
    });
  }, [searchTerm, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  // generate page numbers like [1, 2, '...', 5, 6, 7, '...', 24]
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
    }
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');
    
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Search by date */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex-1 max-w-md shadow-sm">
          <label htmlFor="history-search" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Search by Date
          </label>
          <div className="flex gap-2">
            <input
              id="history-search"
              type="text"
              placeholder="e.g., 2026-10-04 or 2083"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="date"
              aria-label="Select date from calendar"
              value={searchTerm.match(/^\d{4}-\d{2}-\d{2}$/) ? searchTerm : ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              title="Choose a specific A.D. date"
            />
          </div>
        </div>

        {/* Grams / Tola Toggle matching main pillar page */}
        <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/60 shadow-inner self-start sm:self-center">
          <button
            type="button"
            onClick={() => setUnit('gram')}
            className={`px-7 py-2 rounded-full text-sm font-bold transition-all ${
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
            className={`px-7 py-2 rounded-full text-sm font-bold transition-all ${
              unit === 'tola'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`}
          >
            Tola
          </button>
        </div>
      </div>
      
      {children}

      {/* Pagination Controls */}
      {totalEntries > rowsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 text-sm text-slate-600">
          <div className="mb-4 sm:mb-0">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {getPageNumbers().map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === 'number' && setCurrentPage(p)}
                disabled={p === '...'}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  p === currentPage 
                    ? 'bg-slate-100 border-slate-300 font-bold text-slate-900' 
                    : p === '...' 
                      ? 'border-transparent text-slate-400 cursor-default' 
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
