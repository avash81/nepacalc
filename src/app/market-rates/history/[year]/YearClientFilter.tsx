'use client';

import React, { useState, useEffect } from 'react';

export default function YearClientFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const rows = document.querySelectorAll('tr.history-row');
    rows.forEach((row) => {
      const htmlRow = row as HTMLElement;
      const dateAd = htmlRow.getAttribute('data-date-ad') || '';
      const dateBs = htmlRow.getAttribute('data-date-bs') || '';
      
      const match = dateAd.includes(searchTerm) || dateBs.includes(searchTerm);
      if (match) {
        htmlRow.style.display = '';
      } else {
        htmlRow.style.display = 'none';
      }
    });
  }, [searchTerm]);

  return (
    <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl max-w-sm">
      <label htmlFor="history-search" className="block text-sm font-bold text-slate-700 mb-2">Search by Date</label>
      <input
        id="history-search"
        type="text"
        placeholder="e.g., 2026-10-04 or 2083"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  );
}
