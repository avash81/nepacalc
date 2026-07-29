'use client';

import React from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';
import QuickPriceEstimator from '@/app/market-rates/live-gold-price/QuickPriceEstimator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Trophy, Table, History, Zap, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SeoSections from './SeoSections';

export default function GoldDashboardClient() {
  const { rates, loading, error } = useLiveRates();

  if (loading || !rates?.gold) {
     return <div className="min-h-[400px] bg-slate-50 flex items-center justify-center rounded-2xl">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
     </div>;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const tolaNPR = rates.gold.tolaNPR;
  
  const tejabiTolaNPR = rates.gold.tejabiTolaNPR;
  const tejabiDisplayRate = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(tejabiTolaNPR)}`;
  const tejabi10gDisplay = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(Math.round(tejabiTolaNPR / 1.1664))}`;
  const silverTolaNPR = rates.silver?.tolaNPR?.current ?? 4840;

  const tables = [
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (प्रति तोला)', display: `Rs. ${fmt(tolaNPR.current)}`, unit: '1 Tola' },
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (१० ग्राम)', display: `Rs. ${fmt(Math.round(tolaNPR.current / 1.1664))}`, unit: '10 Gram' },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (प्रति तोला)', display: tejabiDisplayRate, unit: '1 Tola', isTejabi: true },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (१० ग्राम)', display: tejabi10gDisplay, unit: '10 Gram', isTejabi: true },
    { label: 'Silver (Chandi)', np: 'चाँदी (प्रति तोला)', display: `Rs. ${fmt(silverTolaNPR)}`, unit: '1 Tola' },
    { label: 'Silver (Chandi)', np: 'चाँदी (१० ग्राम)', display: `Rs. ${fmt(Math.round(silverTolaNPR / 1.1664))}`, unit: '10 Gram' },
  ];

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      
      {/* Custom Header: Breadcrumbs + H1 (Left) & Big Live Price (Right) */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 border-b border-slate-200 pb-6">
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <button 
              onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
            >
              <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </button>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
              <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
              <span className="text-slate-300">/</span>
              <Link href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#202124] font-bold">Gold Price</span>
            </nav>
          </div>
          {/* H1 & Description */}
          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-2">
            Gold Price in Nepal Today – Live 24K, 22K &amp; Silver Rates
          </h1>
          <p className="text-[#5f6368] text-base font-medium leading-relaxed max-w-xl">
            Check today's official gold and silver prices in Nepal based on FENEGOSIDA benchmarks.
          </p>
        </div>

        {/* Big Live Price Box */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-5 shadow-sm min-w-[280px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Live Market Feed</span>
            </div>
            <span className="text-xs font-medium text-slate-500">Official 24K Hallmark Rate</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-xl font-bold text-slate-400">Rs.</span>
            <span className="text-4xl font-black tracking-tighter text-slate-900">{fmt(tolaNPR.current)}</span>
          </div>
          {tolaNPR.changePercent24h !== undefined && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">24H Change</span>
              <div className={`px-2 py-0.5 rounded text-xs font-black flex items-center gap-1 ${tolaNPR.changePercent24h >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {tolaNPR.changePercent24h >= 0 ? '+' : ''}{tolaNPR.changePercent24h}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Graph */}
      <div id="market-chart" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 scroll-mt-24">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">International Spot Market (XAU/USD)</h2>
          </div>
          <div className="hidden sm:block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 tracking-widest">
            WORLD GOLD COUNCIL INDEX
          </div>
        </div>
        <div className="p-6">
          <p className="text-[12px] text-slate-600 mb-4 font-medium">
            * Nepal's official gold price is fixed once daily by FENEGOSIDA. This live chart tracks the international spot market which drives the daily local price changes.
          </p>
          <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden relative">
            <TradingViewWidget 
              symbol="OANDA:XAUUSD"
              theme="light"
              containerId="tv_chart_gold_main"
            />
          </div>
        </div>
      </div>

      {/* 3. Data Status Block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            <p className="text-[12px] font-bold">Official rate temporarily unavailable.</p>
            <p className="text-[11px]">Showing last verified FENEGOSIDA record from: {new Date(rates.gold.lastUpdated).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[11px] font-black uppercase tracking-widest text-slate-600 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Data Status: Verified
          </div>
          <div>Source: FENEGOSIDA</div>
          <div>Last Sync: {new Date(rates.gold.lastUpdated).toLocaleTimeString('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute:'2-digit' })} NPT</div>
          <div>Next Official Update: ~11:00 AM NPT</div>
          <div className="text-green-600">Market: Open</div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-[13px] leading-relaxed font-medium">
          <strong>Note:</strong> Rates shown on this page are official benchmark rates published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). Retail purchase prices may vary due to making charges, wastage, VAT, and individual jeweler pricing policies.
        </div>
      </div>

      {/* 4. Live Gold Price Summary */}
      <div id="quick-answer" className="bg-blue-50/50 rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Live Gold Price Summary</h2>
          <p className="text-[15px] text-slate-700 font-medium leading-relaxed mb-6">
            The official gold price in Nepal today is <strong>Rs. {fmt(tolaNPR.current)}</strong> per Tola for 24K Hallmark Gold (Chhapawal) and <strong>{tejabiDisplayRate}</strong> per Tola for 22K Tejabi Gold. Silver is priced at <strong>Rs. {fmt(silverTolaNPR)}</strong> per Tola. Prices are fixed by FENEGOSIDA.
          </p>

          {/* Quick Price Snapshot */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <div className="text-[11px] font-black text-amber-700 uppercase tracking-widest mb-3">Today&apos;s Official Gold Price Snapshot</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-amber-100 text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">24K Hallmark</div>
                <div className="text-lg font-black text-slate-900">Rs. {fmt(tolaNPR.current)}</div>
                <div className="text-[10px] text-slate-500 font-medium">per Tola</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100 text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">22K Tejabi</div>
                <div className="text-lg font-black text-slate-900">{tejabiTolaNPR === 0 ? 'N/A' : `Rs. ${fmt(tejabiTolaNPR)}`}</div>
                <div className="text-[10px] text-slate-500 font-medium">per Tola</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100 text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Silver</div>
                <div className="text-lg font-black text-slate-900">Rs. {fmt(silverTolaNPR)}</div>
                <div className="text-[10px] text-slate-500 font-medium">per Tola</div>
              </div>
            </div>
            <div className="text-[10px] text-amber-600 font-bold mt-3">Updated daily from FENEGOSIDA. Official source: <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer" className="underline">fenegosida.org</a> &nbsp;·&nbsp; <a href="/calculator/gold-converter/" className="underline">Gold Value Calculator →</a></div>
          </div>

          {/* Live Conversion Table */}
          <div className="bg-white p-5 rounded-xl border border-blue-100 mb-6">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Today&apos;s Gold Price by Unit (24K Hallmark)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="py-2 pr-4">Unit</th>
                    <th className="py-2 text-right">Today&apos;s Value</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { unit: '1 Tola', divisor: 1 },
                    { unit: '10 Gram', divisor: 1.1664 },
                    { unit: '1 Gram', divisor: 11.664 },
                    { unit: '1 Lal (1/8 Tola)', divisor: 8 },
                    { unit: '1 Aana (1/16 Tola)', divisor: 16 },
                    { unit: '100 Gram', divisor: 0.11664 },
                    { unit: '1 Kg', divisor: 0.011664 },
                  ].map(({ unit, divisor }) => (
                    <tr key={unit} className="hover:bg-slate-50">
                      <td className="py-2 pr-4 font-bold text-slate-700">{unit}</td>
                      <td className="py-2 text-right font-black text-slate-900">Rs. {fmt(Math.round(tolaNPR.current / divisor))}</td>
                      <td className="py-2 pl-3"><a href="/calculator/gold-converter/" className="text-[10px] text-blue-600 font-bold hover:underline">Convert →</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[14px] text-slate-700 font-medium leading-relaxed m-0">
            <strong>Note:</strong> Since import costs dictate the final price, you should also use our <a href="/calculator/gold-converter/" className="text-blue-600 underline font-bold">Gold Value Calculator</a> to estimate the exact value of any weight of gold at today&apos;s official rate.
          </p>
        </div>
      </div>

      {/* 4.5 Table of Contents */}
      <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
          <ul className="list-none pl-0 space-y-1.5 text-blue-600 font-medium text-[14px]">
            <li><a href="#quick-answer-block" className="hover:underline">Quick Answer</a></li>
            <li><a href="#gold-at-a-glance" className="hover:underline">Today&apos;s Gold Price at a Glance</a></li>
            <li><a href="#gold-conversion-table" className="hover:underline">Gold Price Conversion Table</a></li>
            <li><a href="#gold-price-calculator-info" className="hover:underline">Gold Price Calculator</a></li>
            <li><a href="#live-price" className="hover:underline">Nepal Benchmark Rates</a></li>
            <li><a href="#calculator" className="hover:underline">Quick Valuation Calculator</a></li>
            <li><a href="#market-highlights" className="hover:underline">Market Highlights &amp; Price Change</a></li>
          </ul>
          <ul className="list-none pl-0 space-y-1.5 text-blue-600 font-medium text-[14px]">
            <li><a href="#ai-summary" className="hover:underline">Market Intelligence</a></li>
            <li><a href="#how-its-calculated" className="hover:underline">How Gold Prices Are Calculated</a></li>
            <li><a href="#jewellery-pricing" className="hover:underline">What Affects Jewellery Prices?</a></li>
            <li><a href="#gold-vs-silver" className="hover:underline">Gold vs Silver Investment</a></li>
            <li><a href="#gold-milestones" className="hover:underline">Historic Price Milestones</a></li>
            <li><a href="#useful-gold-tools" className="hover:underline">Useful Gold Tools</a></li>
            <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
          </ul>
        </div>
      </div>

      {/* 1. Live Price Table (Moved here) */}
      <div id="live-price" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 scroll-mt-24">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Table className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</h2>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="py-3 px-6" scope="col">Standard</th>
                <th className="py-3 px-6" scope="col">Unit</th>
                <th className="py-3 px-6 text-right" scope="col">Rate (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tables.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-slate-800">{row.label}</span>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{row.np}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[12px] font-black text-slate-500 uppercase tracking-widest">{row.unit}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`text-[17px] font-black tracking-tighter ${row.isTejabi && tejabiTolaNPR === 0 ? 'text-slate-400' : 'text-slate-900'}`}>{row.display}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculator Integration */}
      <div id="calculator" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 scroll-mt-24">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="text-[13px] font-black uppercase tracking-[.2em] text-slate-800">Quick Valuation Calculator</h3>
        </div>
        <div className="p-6">
          <QuickPriceEstimator />
        </div>
      </div>

      {/* Market Highlights & Price Change Summary */}
      <div id="market-highlights" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Today's Market Highlights */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Today&apos;s Market Highlights</div>
          <ul className="space-y-2.5">
            <li className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 font-medium">24K Gold (24H)</span>
              <span className={`font-black px-2 py-0.5 rounded text-xs ${(tolaNPR.changePercent24h ?? 0) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {(tolaNPR.changePercent24h ?? 0) >= 0 ? '▲' : '▼'} {Math.abs(tolaNPR.changePercent24h ?? 0)}%
              </span>
            </li>
            <li className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 font-medium">Silver (24H)</span>
              <span className="font-black px-2 py-0.5 rounded text-xs bg-slate-50 text-slate-600">See live board</span>
            </li>
            <li className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 font-medium">International Spot</span>
              <span className="font-black text-slate-800">XAU/USD Live</span>
            </li>
            <li className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 font-medium">Exchange Rate</span>
              <span className="font-black text-blue-600"><a href="/market-rates/exchange-rate-nepal/" className="hover:underline">NRB Rate →</a></span>
            </li>
            <li className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 font-medium">Data Source</span>
              <span className="font-black text-slate-800">FENEGOSIDA</span>
            </li>
          </ul>
        </div>

        {/* Price Change Summary */}
        <div id="price-change" className="scroll-mt-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Price Change Summary (24K Hallmark)</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="pb-2 text-left">Period</th>
                <th className="pb-2 text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { period: 'Today', note: 'vs. yesterday' },
                { period: '7 Days', note: 'weekly trend' },
                { period: '30 Days', note: 'monthly trend' },
                { period: '90 Days', note: 'quarterly trend' },
                { period: '1 Year', note: 'annual trend' },
              ].map(({ period, note }) => (
                <tr key={period}>
                  <td className="py-2">
                    <div className="font-bold text-slate-700">{period}</div>
                    <div className="text-[10px] text-slate-400">{note}</div>
                  </td>
                  <td className="py-2 text-right">
                    {period === 'Today' && tolaNPR.changePercent24h !== undefined ? (
                      <span className={`font-black text-sm ${tolaNPR.changePercent24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {tolaNPR.changePercent24h >= 0 ? '+' : ''}{tolaNPR.changePercent24h}%
                      </span>
                    ) : (
                      <a href="#gold-price-history" className="text-[11px] text-blue-600 font-bold hover:underline">See history →</a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SEO Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
        <SeoSections rates={rates} fmt={fmt} />
      </div>

    </div>
  );
}
