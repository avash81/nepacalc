'use client';

import { CALCULATORS } from '@/data/calculators';
import { PillarCard } from '@/components/calculator/PillarCard';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { useLiveRates } from '@/hooks/useLiveRates';
import Link from 'next/link';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TAGS: Record<string, string> = {
  'market-rates/live-gold-price': 'PRECIOUS METALS',
  'market-rates/remittance': 'REMITTANCE',
  'market-rates/exchange-rate': 'FOREX',
  'market-rates/live-silver-price': 'PRECIOUS METALS',
};

export default function MarketRatesPillarPage() {
  const { rates, loading } = useLiveRates();
  const marketTools = CALCULATORS.filter(c => c.category === 'market');

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com/' },
          { name: 'Market Rates', item: 'https://NepaCalc.com/market-rates/' }
        ]}
      />
      <CalcWrapper
        title="Live Market Rates"
        description="Real-time gold, silver, forex, and remittance rates for Nepal. Synchronized with NRB and FENEGOSIDA data feeds."
        crumbs={[{ label: 'Market Rates' }]}
      >
        <div className="py-4 space-y-6">
          <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
            Track live commodity benchmarks and the official <Link href="/market-rates/exchange-rate-nepal/" className="text-[#1a0dab] underline font-bold hover:text-[#174ea6]">Foreign Exchange Rate Nepal</Link> as published by Nepal Rastra Bank.
          </p>
          {/* Live Rate Ticker */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {loading || !rates ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-[#f8f9fa] rounded-xl animate-pulse border border-[#dadce0]" />
              ))
            ) : (
              <>
                <RateTile label="Gold 24K" value={rates.gold.tolaNPR.current} change={rates.gold.tolaNPR.changePercent24h} href="/market-rates/live-gold-price/" />
                <RateTile label="Gold 22K" value={Math.round(rates.gold.tolaNPR.current * 0.916)} change={rates.gold.tolaNPR.changePercent24h} href="/market-rates/live-gold-price/" />
                <RateTile label="Silver" value={rates.silver.tolaNPR.current} change={rates.silver.tolaNPR.changePercent24h} href="/market-rates/live-silver-price/" />
                <RateTile label="USD/NPR" value={rates.forex.usd.current} change={rates.forex.usd.changePercent24h} href="/market-rates/exchange-rate-nepal/" isForex />
              </>
            )}
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTools.map(calc => (
              <PillarCard
                key={calc.id}
                slug={calc.slug}
                icon={calc.icon}
                name={calc.name}
                description={calc.description}
                tag={TAGS[calc.slug]}
                isNew={calc.isNew}
                isHot={calc.isHot}
              />
            ))}
          </div>
        </div>
      </CalcWrapper>
    </>
  );
}

function RateTile({ label, value, change, href, isForex }: any) {
  const isUp = parseFloat(change) >= 0;
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
          {isForex ? value.toFixed(2) : value.toLocaleString()}
        </span>
      </div>
      <span className="text-[10px] text-[#5f6368] mt-1">Per Tola · Live</span>
    </Link>
  );
}

