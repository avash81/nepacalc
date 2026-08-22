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
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-6 items-start">
        <div className="w-full h-[340px] md:h-[400px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative mb-6 lg:mb-0">
          <TradingViewWidget 
            symbol="OANDA:XAGUSD"
            theme="light"
            containerId="tv_chart_silver_main"
            chartStyle="3"
            interval="D"
          />
        </div>
        <div style={{ position: 'sticky', top: '96px', alignSelf: 'start', zIndex: 10 }}>
          <PricePerformanceWidget
            asset="Silver"
            source="FENEGOSIDA · NPR per Tola"
            rows={[
              { period: 'Today', price: '4,985', amount: '+50', percent: '+1.01%', isNegative: false },
              { period: '30 Days', price: '4,785', amount: '+200', percent: '+4.18%', isNegative: false },
              { period: '6 Months', price: '5,135', amount: '-150', percent: '-2.92%', isNegative: true },
              { period: '1 Year', price: '4,185', amount: '+800', percent: '+19.11%', isNegative: false },
              { period: '5 Year', price: '1,485', amount: '+3,500', percent: '+235.69%', isNegative: false },
              { period: '20 Years', price: '485', amount: '+4,500', percent: '+927.83%', isNegative: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
}



