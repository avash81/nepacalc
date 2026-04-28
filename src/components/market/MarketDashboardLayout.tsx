'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, RefreshCw, Landmark, Activity, Info, TrendingUp } from 'lucide-react';

interface MarketDashboardLayoutProps {
  title: string;
  description: string;
  liveRate: string | number;
  changeAmount?: string | number;
  changePercent?: string | number;
  lastUpdated?: string;
  mainBoard: React.ReactNode;
  rightBoard?: React.ReactNode;
  calculatorSection?: React.ReactNode;
  faqSection?: React.ReactNode;
  seoSection?: React.ReactNode;
  accentColor?: string;
}

export function MarketDashboardLayout({
  title,
  description,
  liveRate,
  changeAmount,
  changePercent,
  lastUpdated,
  mainBoard,
  rightBoard,
  calculatorSection,
  faqSection,
  seoSection,
  accentColor = '#2563eb'
}: MarketDashboardLayoutProps) {
  const isPositive = Number(changePercent || 0) >= 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Header & Billboard */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-8">
            <button 
              type="button"
              onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/market-rates')}
              className="flex items-center gap-1 hover:text-[#1A73E8] text-[#5F6368] border-r border-[#DADCE0] pr-3 mr-1 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              BACK
            </button>
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/market-rates" className="hover:text-blue-600 transition-colors">Market Rates</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">{title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>Live Authority Feed</span>
              </div>
              <h1 className="text-[28px] sm:text-[42px] font-black text-slate-900 tracking-tighter leading-none">
                {title} <span className="text-slate-300">in Nepal Today</span>
              </h1>
              <p className="text-[14px] text-slate-500 max-w-2xl font-medium leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2">
              <div className="flex items-baseline gap-4">
                 <div className="text-[42px] sm:text-[54px] font-black tracking-tighter text-slate-900 leading-none">
                   <span className="text-[24px] mr-1 font-bold text-slate-400">Rs.</span>{liveRate}
                 </div>
                 {changePercent !== undefined && (
                    <div className={`px-3 py-1.5 rounded-full text-[13px] font-black flex items-center gap-1.5 ${isPositive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                       <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                       {isPositive ? '+' : ''}{changePercent}%
                    </div>
                 )}
              </div>
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
                 <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-[spin_3s_linear_infinite]" />
                    <span>Updated {lastUpdated || 'Real-time'}</span>
                 </div>
                 <span className="opacity-30">•</span>
                 <div className="flex items-center gap-1.5">
                    <Landmark className="w-3 h-3" />
                    <span>FENEGOSIDA Verified</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Primary Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Board Area (Table / Chart) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
               {mainBoard}
            </div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-600/10">
                 <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 opacity-60" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Market Signal</span>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Steady Uptrend</h3>
                 <p className="text-[13px] text-white/70 leading-relaxed font-normal">
                   Domestic rates are currently reflecting steady international spot price recovery adjusted for recent NPR-USD shifts.
                 </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-900/10">
                 <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 opacity-60" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-60">FENEGOSIDA Benchmark</span>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Nepal Standard</h3>
                 <p className="text-[13px] text-white/70 leading-relaxed font-normal">
                   Every price quoted is inclusive of 20% import duty and the baseline federation operating commission.
                 </p>
              </div>
            </div>

            {/* Content Section (SEO & Descriptions) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 space-y-8">
               {seoSection}
               {faqSection}
            </div>
          </div>

          {/* Right Board / Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Interactive Tool / Calculator */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm sticky top-24">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                 <h3 className="text-[11px] font-black uppercase tracking-[.2em] text-slate-800">Calculation Engine</h3>
              </div>
              <div className="p-6">
                 {calculatorSection || <div className="text-slate-400 italic text-[11px]">Calculator tool placeholder...</div>}
              </div>
            </div>

            {/* Secondary Tickers / Related Links */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-2">Related Indices</h4>
              {rightBoard}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
