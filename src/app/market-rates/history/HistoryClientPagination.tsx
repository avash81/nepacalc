'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HistoryClientPaginationProps {
  children: React.ReactNode;
  defaultRowsPerPage?: number;
}

export default function HistoryClientPagination({
  children,
  defaultRowsPerPage = 30,
}: HistoryClientPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const rowsPerPage = defaultRowsPerPage;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = document.querySelectorAll<HTMLTableRowElement>('tr.history-data-row');
    if (!rows.length) return;

    setTotalEntries(rows.length);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    rows.forEach((row, idx) => {
      if (idx >= startIndex && idx < endIndex) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }, [currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  // Generate page numbers: [1, 2, 3, 4, 5, '...', 68]
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {/* The Table (Server-rendered inside children for complete search engine bot indexing) */}
      {children}

      {/* Pagination Footer matching standard data-table design */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-sm text-slate-600 border-t border-slate-200">
        <div>
          Showing {startEntry} to {endEntry} of {totalEntries.toLocaleString()} entries
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 flex-wrap">
            {/* Previous */}
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-xs text-slate-400 select-none"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = Number(p);
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`min-w-[28px] h-7 px-2 text-xs font-semibold rounded transition-all ${
                    isActive
                      ? 'bg-slate-100 border border-slate-300 font-bold text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
