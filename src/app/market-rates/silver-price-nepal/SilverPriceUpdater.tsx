'use client';

import React, { useEffect } from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';

export default function SilverPriceUpdater() {
  const { rates } = useLiveRates();

  useEffect(() => {
    if (rates?.silver?.tolaNPR?.current) {
      const liveSilver = rates.silver.tolaNPR.current;
      const formattedPrice = `Rs. ${(liveSilver).toLocaleString('en-IN')}`;
      const newDesc = `Today's live silver price in Nepal from FENEGOSIDA: ${formattedPrice} per tola. Check the current Chandi rate per gram and kg.`;

      // 1. Update SEO Meta
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', newDesc);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', newDesc);
      
      // 2. Update JSON-LD
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        try {
          if (script.textContent && script.textContent.includes('Silver Price in Nepal Today')) {
            const schema = JSON.parse(script.textContent);
            let updated = false;
            if (schema['@graph']) {
              schema['@graph'].forEach((node: any) => {
                if (node['@type'] === 'WebPage' || node['@type'] === 'Article') {
                  node.description = newDesc;
                  updated = true;
                }
              });
            }
            if (updated) {
              script.textContent = JSON.stringify(schema);
            }
          }
        } catch(e) {}
      });

      // 3. Update DOM Prices
      const mainPrices = document.querySelectorAll('#silver-main-price');
      mainPrices.forEach(el => {
        el.textContent = `Rs. ${liveSilver.toLocaleString('en-IN')}`;
      });

      const gramPrice = document.getElementById('silver-gram-price');
      if (gramPrice) {
        gramPrice.textContent = `Rs. ${Math.round(liveSilver / 1.1664).toLocaleString('en-IN')}`;
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
