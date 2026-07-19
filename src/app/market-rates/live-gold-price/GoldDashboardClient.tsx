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
          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-2 lowercase first-letter:uppercase">
            Gold Price in Nepal Today
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

      {/* 4. Today's Rate Summary & Explanation */}
      <div id="quick-answer" className="bg-blue-50/50 rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Today's Rate Summary</h2>
          <p className="text-[15px] text-slate-700 font-medium leading-relaxed mb-6">
            The official gold price in Nepal today is <strong>Rs. {fmt(tolaNPR.current)}</strong> per Tola for 24K Hallmark Gold (Chhapawal) and <strong>{tejabiDisplayRate}</strong> per Tola for 22K Tejabi Gold. Silver is priced at <strong>Rs. {fmt(silverTolaNPR)}</strong> per Tola. Prices are fixed by FENEGOSIDA.
          </p>
          <div className="bg-white p-5 rounded-xl border border-blue-100 mb-6">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Common Gold Price Conversions</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] text-blue-700 font-medium">
              <li><a href="/calculator/gold-converter/" className="hover:underline flex items-center gap-2">• 1 Tola Gold Price</a></li>
              <li><a href="/calculator/gold-converter/" className="hover:underline flex items-center gap-2">• 10 Gram Gold Price</a></li>
              <li><a href="/calculator/gold-converter/" className="hover:underline flex items-center gap-2">• 1 Gram Gold Price</a></li>
              <li><a href="/calculator/gold-converter/" className="hover:underline flex items-center gap-2">• 1 Lal Gold Price</a></li>
              <li><a href="/calculator/gold-converter/" className="hover:underline flex items-center gap-2">• 1 Aana Gold Price</a></li>
            </ul>
          </div>
          <p className="text-[14px] text-slate-700 font-medium leading-relaxed m-0">
            <strong>Note:</strong> Since import costs dictate the final price, you should also check <a href="/market-rates/exchange-rate-nepal/" className="text-blue-600 underline font-bold">Today's NRB Exchange Rate</a> before making large commercial purchases.
          </p>
        </div>
      </div>

      {/* 4.5 Table of Contents */}
      <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
        <ul className="list-none pl-0 space-y-2 text-blue-600 font-medium">
          <li><a href="#live-price" className="hover:underline">Nepal Benchmark Rates</a></li>
          <li><a href="#calculator" className="hover:underline">Quick Valuation Calculator</a></li>
          <li><a href="#ai-summary" className="hover:underline">Market Intelligence &amp; AI Summary</a></li>
          <li><a href="#how-its-calculated" className="hover:underline">How Gold Prices Are Calculated in Nepal</a></li>
          <li><a href="#gold-price-history" className="hover:underline">Historical Records &amp; Yearly Data</a></li>
          <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
          <li><a href="#archives" className="hover:underline">FENEGOSIDA Archives &amp; Notices</a></li>
        </ul>
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

      {/* 5. Table of Content & SEO Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
        <SeoSections />
      </div>

    </div>
  );
}
