'use client';
import PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';

import React from 'react';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Coins } from 'lucide-react';

export default function SilverChartClient() {
  return (
    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-slate-500" />
          <div className="text-[13px] font-black uppercase tracking-widest text-slate-900">
            International Spot Market (XAG/USD)
          </div>
        </div>
        <div className="px-2 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 tracking-widest">
          WORLD SILVER INDEX
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mb-4">
        <em>* Nepal&apos;s official silver price is fixed once daily by FENEGOSIDA. This live chart tracks the international spot market which drives the daily local price changes.</em>
      </p>
      {/* Full-width chart — widget is now in page-level right sidebar */}
      <div className="w-full h-[340px] md:h-[400px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative">
        <TradingViewWidget
          symbol="OANDA:XAGUSD"
          theme="light"
          containerId="tv_chart_silver_main"
          chartStyle="3"
          interval="D"
        />
      </div>
    </div>
  );
}
