'use client';
import React, { useState, useEffect } from 'react';

export default function YearClientFilter({ children }: { children?: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const rowsPerPage = 20;

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
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl max-w-lg">
        <label htmlFor="history-search" className="block text-sm font-bold text-slate-700 mb-2">Search by Date</label>
        <div className="flex gap-3">
          <input
            id="history-search"
            type="text"
            placeholder="e.g., 2026-10-04 or 2083"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="date"
            aria-label="Select date from calendar"
            value={searchTerm.match(/^\d{4}-\d{2}-\d{2}$/) ? searchTerm : ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            title="Choose a specific A.D. date"
          />
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
