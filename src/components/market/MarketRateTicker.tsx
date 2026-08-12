'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useLiveRates } from '@/hooks/useLiveRates';

function RateTile({ label, value, change, href, isForex }: {
  label: string;
  value: number;
  change: number | string;
  href: string;
  isForex?: boolean;
}) {
  const isUp = parseFloat(String(change)) >= 0;
  return (
    <Link href={href} className="bg-white border border-[#dadce0] rounded-xl p-4 flex flex-col justify-between hover:shadow-md hover:border-[#c5c9d0] transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#5f6368]">{label}</span>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isUp ? '+' : ''}{change}%
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[11px] font-bold text-[#5f6368]">Rs.</span>
        <span className="text-[18px] font-black text-[#202124] tracking-tight">
          {isForex ? Number(value).toFixed(2) : Number(value).toLocaleString()}
        </span>
      </div>
      <span className="text-[10px] text-[#5f6368] mt-1">{isForex ? 'Base Rate' : 'Per Tola · Updated Daily'}</span>
    </Link>
  );
}

export function MarketRateTicker() {
  const { rates, loading } = useLiveRates();

  if (loading || !rates) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-[#f8f9fa] rounded-xl animate-pulse border border-[#dadce0]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <RateTile label="Gold 24K" value={rates.gold.tolaNPR.current} change={rates.gold.tolaNPR.changePercent24h} href="/market-rates/live-gold-price/" />
      <RateTile label="Gold 22K" value={Math.round(rates.gold.tolaNPR.current * 0.916)} change={rates.gold.tolaNPR.changePercent24h} href="/market-rates/live-gold-price/" />
      <RateTile label="Silver" value={rates.silver.tolaNPR.current} change={rates.silver.tolaNPR.changePercent24h} href="/market-rates/live-silver-price/" />
      <RateTile label="USD/NPR" value={rates.forex.usd.current} change={rates.forex.usd.changePercent24h} href="/market-rates/exchange-rate-nepal/" isForex />
    </div>
  );
}
