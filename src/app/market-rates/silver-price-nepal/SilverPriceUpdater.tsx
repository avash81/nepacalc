'use client';

import React, { useEffect } from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';

export default function SilverPriceUpdater() {
  const { rates } = useLiveRates();

  useEffect(() => {
    if (rates?.silver?.tolaNPR?.current) {
      const liveSilver = rates.silver.tolaNPR.current;
      // 1. Update DOM Prices
      const mainPrices = document.querySelectorAll('#silver-main-price');
      mainPrices.forEach(el => {
        el.textContent = `Rs. ${liveSilver.toLocaleString('en-IN')}`;
      });

      const gramPrice = document.getElementById('silver-gram-price');
      if (gramPrice) {
        const live10g = rates.silver.tenGramNPR || Math.round(liveSilver / 1.1664);
        gramPrice.textContent = `Rs. ${live10g.toLocaleString('en-IN')}`;
      }
      
      // Update the 24H change
      if (rates.silver.tolaNPR.changePercent24h !== undefined) {
         const changePct = rates.silver.tolaNPR.changePercent24h;
         const pctEl = document.getElementById('silver-main-percent');
         if (pctEl) {
            pctEl.textContent = `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`;
            pctEl.className = `px-2 py-0.5 rounded text-xs font-black flex items-center gap-1 ${changePct >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`;
         }
      }
    }
  }, [rates]);

  return null;
}
