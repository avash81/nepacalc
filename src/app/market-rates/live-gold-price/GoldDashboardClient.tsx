'use client';

import React, { useEffect } from 'react';
import { useLiveRates } from '@/hooks/useLiveRates';
import QuickPriceEstimator from '@/app/market-rates/live-gold-price/QuickPriceEstimator';
import TradingViewWidget from '@/components/market/TradingViewWidget';
import { Trophy, Table, History, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MobileCollapsible from '@/components/ui/MobileCollapsible';

import SeoSections from './SeoSections';
import { HilltopAds300x250 } from '@/components/ads/HilltopAds300x250';
import PricePerformanceWidget from '@/components/widgets/PricePerformanceWidget';


const renderToc = (items: any[]) => {
  return items.reduce((acc, entry, idx) => {
    if (entry.divider) {
      acc.push(<div key={"div-"+idx} style={{ height: "1px", background: "#e8eaed", margin: "8px 0" }} />);
      return acc;
    }
    const num = String(acc.filter((n: any) => n && !(n.key?.startsWith("div-"))).length + 1).padStart(2, "0");
    acc.push(
      <li key={entry.id}>
        <a
          href={"#"+entry.id}
          className="hover:!text-[#1a73e8] hover:!border-l-[#1a73e8]"
          style={{
            display: "block",
            padding: "6px 0 6px 14px",
            fontSize: "0.82rem",
            color: "#5f6368",
            textDecoration: "none",
            borderLeft: "2px solid transparent",
            marginLeft: "-2px",
            lineHeight: 1.3,
            transition: "color 0.15s, border-color 0.15s",
          }}
        >
          <span style={{
            fontFamily: "monospace",
            fontSize: "0.67rem",
            color: "#b59a00",
            marginRight: "5px",
            fontWeight: 700,
          }}>{num}</span>
          {entry.label}
        </a>
      </li>
    );
    return acc;
  }, []);
};

const tocItems: { id?: string; label?: string; divider?: boolean }[] = [
  { id: 'todays-gold-price', label: "Today's Gold Price" },
  { id: 'gold-price-calculator', label: "Gold Price Calculator" },
  { id: 'live-price', label: "Nepal Benchmark Gold Rates" },
  { divider: true },
  { id: 'how-its-calculated', label: "How Gold Prices Are Calculated in Nepal" },
  { id: 'jewellery-pricing', label: "What Affects Gold Prices and Jewellery Prices?" },
  { id: 'buying-guide', label: "Before Buying Gold in Nepal" },
  { id: 'compare-gold-silver', label: "Compare Gold and Silver Prices in Nepal" },
  { id: 'gold-vs-silver', label: "Gold vs Silver Investment in Nepal" },
  { divider: true },
  { id: 'gold-price-history', label: "Gold Price History in Nepal" },
  { id: 'historical-datasets', label: "Available Gold and Silver Historical Datasets" },
  { id: 'gold-milestones', label: "Historic Gold Price Milestones in Nepal" },
  { id: 'who-updates-prices', label: "Who Updates Gold Prices in Nepal?" },
  { divider: true },
  { id: 'faq', label: "Frequently Asked Questions" },
  { id: 'archives', label: "FENEGOSIDA Archives & Reports" },
  { id: 'glossary', label: "Understanding Today's Gold Rate Terms" },
  { id: 'useful-gold-tools', label: "Useful Gold Tools" },
  { id: 'related-market-rates', label: "Related Market Rates & Tools" },
  { id: 'people-also-search', label: "People Also Search" },
  { divider: true },
  { id: 'why-trust', label: "Why Trust This Gold Price Data?" },
  { id: 'editorial-review', label: "Editorial Review & Data Governance" },
  { id: 'official-references', label: "Official Market References" },
];

interface GoldDashboardClientProps {
  /** Build-time 24K gold price (per Tola, NPR) from live-rates.json — seeds first render */
  initialGold?: number;
  /** Build-time silver price (per Tola, NPR) from live-rates.json — seeds first render */
  initialSilver?: number;
  /** Build-time rate date string (YYYY-MM-DD) from live-rates.json */
  initialDate?: string;
}

export default function GoldDashboardClient({ initialGold, initialSilver, initialDate }: GoldDashboardClientProps = {}) {
  const { rates, loading, error } = useLiveRates();


  useEffect(() => {
    if (rates?.gold?.tolaNPR?.current) {
      const livePrice = rates.gold.tolaNPR.current;
      const formattedPrice = `Rs. ${livePrice.toLocaleString('en-IN')}`;
      const newDesc = `Today's live gold price in Nepal from FENEGOSIDA: 24K Hallmark ${formattedPrice} per tola. Check 22K Tejabi, silver, history and gold calculator.`;
      
      // Dynamically update the meta description for client-side crawlers
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', newDesc);
      
      // Dynamically update open graph tags
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', newDesc);
      
      // Update JSON-LD schema
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        try {
          if (script.textContent && script.textContent.includes('Gold Price in Nepal Today')) {
            const schema = JSON.parse(script.textContent);
            let updated = false;
            if (schema.webpage) {
              schema.webpage.description = newDesc;
              updated = true;
            }
            if (schema.article) {
              schema.article.description = newDesc;
              updated = true;
            }
            if (updated) {
              script.textContent = JSON.stringify(schema);
            }
          }
        } catch(e) {}
      });
    }
  }, [rates]);

  // If still loading but we have build-time seed prices, render a lightweight placeholder
  // that Googlebot's renderer can index with the correct prices.
  // The full interactive dashboard replaces this once the live fetch completes.
  if (loading || !rates?.gold) {
    if (initialGold) {
      const fmtSeed = (n: number) => n.toLocaleString('en-IN');
      return (
        <div className="min-h-[200px] p-6">
          <div className="flex flex-wrap gap-6 items-start mb-6">
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 min-w-[240px]">
              <div className="text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-1">24K Hallmark Gold · Per Tola</div>
              <div className="text-3xl font-black text-slate-900">Rs. {fmtSeed(initialGold)}</div>
              {initialSilver && (
                <div className="mt-2 text-sm text-slate-600">Silver: <strong>Rs. {fmtSeed(initialSilver)}</strong> /Tola</div>
              )}
              {initialDate && (
                <div className="mt-1 text-xs text-slate-500">Rate date: {new Date(initialDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              )}
            </div>
          </div>
          <div className="h-1 w-24 bg-amber-200 rounded animate-pulse" />
        </div>
      );
    }
    return (
      <div className="min-h-[400px] bg-slate-50 flex items-center justify-center rounded-2xl">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const tolaNPR = rates.gold.tolaNPR;
  
  const tejabiTolaNPR = rates.gold.tejabiTolaNPR;
  const tejabiDisplayRate = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(tejabiTolaNPR)}`;
  const tejabi10gDisplay = tejabiTolaNPR === 0 ? "Not Published" : `Rs. ${fmt(Math.round(tejabiTolaNPR / 1.1664))}`;
  // Silver fallback: initialSilver from build-time is more accurate than the old 4840 constant
  const silverTolaNPR = rates.silver?.tolaNPR?.current ?? initialSilver ?? 4965;

  const tables = [
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (प्रति तोला)', display: `Rs. ${fmt(tolaNPR.current)}`, unit: '1 Tola' },
    { label: '24K Hallmark Gold', np: 'छापावाल सुन (१० ग्राम)', display: `Rs. ${fmt(Math.round(tolaNPR.current / 1.1664))}`, unit: '10 Gram' },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (प्रति तोला)', display: tejabiDisplayRate, unit: '1 Tola', isTejabi: true },
    { label: '22K Tejabi Gold', np: 'तेजाबी सुन (१० ग्राम)', display: tejabi10gDisplay, unit: '10 Gram', isTejabi: true },
    { label: 'Silver (Chandi)', np: 'चाँदी (प्रति तोला)', display: `Rs. ${fmt(silverTolaNPR)}`, unit: '1 Tola' },
    { label: 'Silver (Chandi)', np: 'चाँदी (१० ग्राम)', display: `Rs. ${fmt(Math.round(silverTolaNPR / 1.1664))}`, unit: '10 Gram' },
  ];

  return (
    <div className="max-w-[1400px] lg:ml-0 lg:mr-auto pb-12">
      <style dangerouslySetInnerHTML={{ __html: `
.nb-toc-mobile{display:block;margin-bottom:14px;}
.nb-toc-mobile details{border:2px solid #006845;background:#f0faf5;border-radius:10px;box-shadow:0 4px 6px -1px rgba(0,104,69,0.12),0 2px 4px -2px rgba(0,104,69,0.08);transition:all 0.2s;}
.nb-toc-mobile summary{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#006845;padding:14px 18px;cursor:pointer;user-select:none;list-style:none;display:flex;justify-content:space-between;align-items:center;font-weight:800;}
.nb-toc-mobile summary::after{content:'▼';font-size:0.6rem;transition:transform 0.2s;color:#006845;}
.nb-toc-mobile details[open] summary::after{transform:rotate(180deg);}
.nb-toc-mobile ol{list-style:none;margin:0;padding:0 18px 18px;columns:1;}
.nb-toc-mobile li{break-inside:avoid;margin-bottom:8px;}
.nb-toc-mobile a{display:block;font-size:0.875rem;color:#006845;text-decoration:none;line-height:1.4;font-weight:600;}
.nb-toc-mobile a:hover{color:#004d32;text-decoration:underline;}
.nb-toc-mobile .nb-toc-num{font-family:ui-monospace,SFMono-Regular,monospace;font-size:0.7rem;color:#00a36b;margin-right:8px;font-weight:700;}
`}} />
      {/* Page-level layout */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 items-start">
      {/* === MAIN === */}
      <div className="min-w-0">
      
      {/* Custom Header: H1 + Breadcrumb are now server-rendered in page.tsx so */}
      {/* Googlebot sees them in raw HTML. This client-side copy is hidden to avoid */}
      {/* a duplicate H1 while preserving the live price box on the right. */}

      {/* 3. Data Status Block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        {/* Stale data warning — shown when live fetch failed and we're using last verified value */}
        {!rates.gold.isFresh && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <span className="text-amber-600 text-lg">⚠️</span>
            <div>
              <p className="text-[12px] font-bold text-amber-800">Showing last verified FENEGOSIDA rate</p>
              <p className="text-[11px] text-amber-700">Official rate as of {rates.gold.dataDate}. Today&apos;s rate will appear once FENEGOSIDA publishes (~11 AM NPT).</p>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800">
            <p className="text-[12px] font-bold">Live connection unavailable.</p>
            <p className="text-[11px]">Displaying last verified FENEGOSIDA record from {rates.gold.dataDate}.</p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[11px] font-black uppercase tracking-widest text-slate-600 mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${rates.gold.isFresh ? 'bg-green-500' : 'bg-amber-400'}`}></div>
            {rates.gold.isFresh ? 'Live · Today' : 'Last Verified'}
          </div>
          <div>Source: FENEGOSIDA</div>
          <div>Rate Date: {rates.gold.dataDate}</div>
          <div>Next Update: ~11:00 AM NPT</div>
          <div className={rates.gold.isFresh ? 'text-green-600' : 'text-amber-600'}>
            {rates.gold.isFresh ? 'Fresh ✓' : 'Cached'}
          </div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-[13px] leading-relaxed font-medium">
          <strong>Note:</strong> Rates shown on this page are official benchmark rates published by the Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA). Retail purchase prices may vary due to making charges, wastage, VAT, and individual jeweler pricing policies.
        </div>
      </div>

      {/* Inserted Chart Block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-[12px] text-slate-600 mb-4 font-medium">
              * Nepal's official gold price is fixed once daily by FENEGOSIDA. This live chart tracks the international spot market which drives the daily local price changes.
            </p>
            <div className="w-full h-[400px] md:h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden relative mb-6 lg:mb-0">
                <TradingViewWidget
                  symbol="OANDA:XAUUSD"
                  theme="light"
                  containerId="tv_chart_gold_main"
                />
              </div>
          </div>

      {/* TOC - Collapsible dropdown, placed directly below the chart */}
      <div className="nb-toc-mobile mb-6">
        <details id="gold-mobile-toc">
          <summary>TABLE OF CONTENTS — {tocItems.filter(i => !i.divider).length} SECTIONS</summary>
          <ol>
            {(() => { let n=0; return tocItems.map((entry, idx) => {
              if (entry.divider) return <div key={"div-"+idx} className="nb-toc-divider" />;
              n++;
              const num = String(n).padStart(2,'0');
              return (
                <li key={entry.id}>
                  <a href={"#"+entry.id} onClick={() => {
                    const d = document.getElementById('gold-mobile-toc') as HTMLDetailsElement | null;
                    if (d) d.open = false;
                  }}>
                    <span className="nb-toc-num">{num}</span>
                    {entry.label}
                  </a>
                </li>
              );
            }); })()}
          </ol>
        </details>
      </div>

      {/* 4. Live Gold Price Summary */}
      <div id="quick-answer" className="bg-blue-50/50 rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 mb-6">
        <div className="flex-1">
          <h2 id="todays-gold-price" className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Today's Gold Price</h2>
          <p className="text-[15px] text-slate-700 font-medium leading-relaxed mb-6">
            The official gold price in Nepal today is <strong>Rs. {fmt(tolaNPR.current)}</strong> per Tola for 24K Hallmark Gold (Chhapawal) and <strong>{tejabiDisplayRate}</strong> per Tola for 22K Tejabi Gold. Silver is priced at <strong>Rs. {fmt(silverTolaNPR)}</strong> per Tola. Prices are fixed by FENEGOSIDA.
          </p>

          {/* Quick Price Snapshot */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 mb-6">
            <div className="text-[11px] font-black text-amber-700 uppercase tracking-widest mb-3">Today&apos;s Official Gold Price Snapshot</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-amber-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:mb-1">24K Hallmark</div>
                <div className="flex flex-col sm:items-center">
                  <div className="text-base sm:text-lg font-black text-slate-900">Rs. {fmt(tolaNPR.current)}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium sm:mt-0.5">per Tola</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:mb-1">22K Tejabi</div>
                <div className="flex flex-col sm:items-center">
                  <div className="text-base sm:text-lg font-black text-slate-900">{tejabiDisplayRate}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium sm:mt-0.5">per Tola</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:mb-1">Silver</div>
                <div className="flex flex-col sm:items-center">
                  <div className="text-base sm:text-lg font-black text-slate-900">Rs. {fmt(silverTolaNPR)}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium sm:mt-0.5">per Tola</div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/50 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-x-4 items-start sm:items-center text-[10px] font-bold text-amber-800">
              <div className="w-full sm:w-auto">Updated daily from FENEGOSIDA</div>
              <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline">Gold Value Calculator →</a>
              <a href="/market-rates/silver-price-nepal/" className="text-blue-600 hover:underline">Live Silver Price →</a>
              <div className="w-full sm:w-auto mt-1 sm:mt-0 opacity-70">
                Source: <span className="font-semibold text-slate-700">FENEGOSIDA</span>
              </div>
            </div>
          </div>

          {/* Live Conversion Table */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-blue-100 mb-6">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Today&apos;s Gold Price by Unit (24K Hallmark)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="py-2 pr-2 sm:pr-4">Unit</th>
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
                      <td className="py-2 pr-2 sm:pr-4 font-bold text-slate-700 whitespace-nowrap">{unit}</td>
                      <td className="py-2 text-right font-black text-slate-900">Rs. {fmt(Math.round(tolaNPR.current / divisor))}</td>
                      <td className="py-2 pl-2 sm:pl-3 whitespace-nowrap"><a href="/calculator/gold-converter/" className="text-[10px] text-blue-600 font-bold hover:underline">Convert →</a></td>
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


<section id="quick-answer-block" className="scroll-mt-24 bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-3">Quick Answer</h3>
        <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
          Today&apos;s official gold price in Nepal is published daily by <strong>FENEGOSIDA</strong> and reflects international gold prices (LBMA), USD/NPR exchange rates set by <strong>Nepal Rastra Bank</strong>, customs duties, and local market conditions. The live benchmark rates shown on this page include <strong>Hallmark Gold (24K)</strong>, <strong>Tejabi Gold (22K)</strong>, and <strong>Silver</strong>, along with historical trends and an official gold value calculator.
        </p>
      </section>

<section id="gold-at-a-glance" className="scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">Today&apos;s Gold Price at a Glance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Hallmark Gold (24K)', value: tolaNPR.current ? `Rs. ${fmt(tolaNPR.current)}` : '—', sub: 'per Tola' },
            { label: 'Tejabi Gold (22K)', value: tejabiTolaNPR && tejabiTolaNPR > 0 ? `Rs. ${fmt(tejabiTolaNPR)}` : 'Not Published', sub: 'per Tola' },
            { label: 'Silver (Chandi)', value: silverTolaNPR ? `Rs. ${fmt(silverTolaNPR)}` : '—', sub: 'per Tola' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</div>
              <div className="text-2xl font-black text-slate-900">{value}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">{sub} · FENEGOSIDA</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Today's Movement", value: rates?.gold?.tolaNPR ? 'See live board above' : '—' },
              { label: 'Weekly Movement', value: 'See price history below' },
              { label: 'Monthly High', value: (rates?.gold?.tolaNPR as any)?.high52w ? `Rs. ${fmt((rates.gold.tolaNPR as any).high52w)}` : 'See history' },
              { label: 'Monthly Low', value: (rates?.gold?.tolaNPR as any)?.low52w ? `Rs. ${fmt((rates.gold.tolaNPR as any).low52w)}` : 'See history' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-sm font-bold text-slate-700">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

<section id="gold-conversion-table" className="scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">Gold Price Conversion Table</h3>
        <p className="text-[14px] text-slate-600 font-medium mb-5 leading-relaxed">
          Today&apos;s <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline font-bold">Gold Price Calculator</a> automatically converts the official FENEGOSIDA rate into every common unit. Use this as a quick reference for 1 gram, 5 gram, 10 gram, Lal, Aana, half Tola, and Tola gold prices in Nepal today.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="py-3 px-5">Unit</th>
                <th className="py-3 px-5 text-right">24K Hallmark</th>
                <th className="py-3 px-5 text-right">22K Tejabi</th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { unit: '1 Gram', divisor: 11.664 },
                { unit: '5 Gram', divisor: 11.664 / 5 },
                { unit: '10 Gram', divisor: 1.1664 },
                { unit: '1 Lal (1/8 Tola)', divisor: 8 },
                { unit: '1 Aana (1/16 Tola)', divisor: 16 },
                { unit: 'Half Tola (½ Tola)', divisor: 2 },
                { unit: '1 Tola', divisor: 1 },
                { unit: '5 Tola', divisor: 0.2 },
                { unit: '10 Tola', divisor: 0.1 },
                { unit: '100 Gram', divisor: 0.11664 },
              ].map(({ unit, divisor }) => (
                <tr key={unit} className="hover:bg-slate-50">
                  <td className="py-3 px-5 font-bold text-slate-700">{unit}</td>
                  <td className="py-3 px-5 text-right font-black text-slate-900">
                    {tolaNPR.current ? `Rs. ${fmt(Math.round(tolaNPR.current / divisor))}` : '—'}
                  </td>
                  <td className="py-3 px-5 text-right font-medium text-slate-600">
                    {tejabiTolaNPR && tejabiTolaNPR > 0 ? `Rs. ${fmt(Math.round(tejabiTolaNPR / divisor))}` : '—'}
                  </td>
                  <td className="py-3 px-5">
                    <a href="/calculator/gold-converter/" className="text-[10px] text-blue-600 font-bold hover:underline whitespace-nowrap">Convert →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mt-3">Based on today&apos;s FENEGOSIDA benchmark. 1 Tola = 11.6638 grams. For advanced conversion, use our <a href="/calculator/gold-converter/" className="text-blue-600 hover:underline font-bold">Gold Value Calculator</a>.</p>
      </section>

      <h2 id="gold-price-calculator" className="text-2xl font-black text-slate-900 tracking-tighter mb-4 scroll-mt-24">Gold Price Calculator</h2>
      {/* Calculator Integration */}
      <div id="calculator" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 scroll-mt-24">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="text-[13px] font-black uppercase tracking-[.2em] text-slate-800">Quick Valuation Calculator</h3>
        </div>
        <div className="p-6">
          <QuickPriceEstimator />
        </div>
      </div>

      {/* 1. Live Price Table (Moved here) */}
      <div id="live-price" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 scroll-mt-24">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Table className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Gold Rates</h2>
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

      {/* HilltopAds 300×250 — test zone between rate table and calculator */}
      <div className="flex justify-center my-6 no-print">
        <HilltopAds300x250 />
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
      <div>
        <main className="nb-main min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
            <SeoSections rates={rates} fmt={fmt} />
          </div>
        </main>
      </div>
      </div>
      {/* === SIDEBAR === */}
      <aside className="hidden lg:block pb-6 pr-1" style={{ position: 'sticky', top: '96px', alignSelf: 'start', zIndex: 20, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', scrollbarWidth: 'thin' }}>
        {(() => {
          // Historical reference prices from FENEGOSIDA daily-history.json
          // UPDATE these whenever the 30-day reference drifts by more than ~2%.
          // Last updated: 2026-08-24
          const GOLD_30D = 308200;  // 2026-07-31 FENEGOSIDA daily rate
          const GOLD_6M  = 272000;  // 2026-02-24 FENEGOSIDA daily rate
          const GOLD_1Y  = 250000;  // 2025-08-24 FENEGOSIDA daily rate
          const GOLD_5Y  = 140000;  // 2021-08-24 approximate
          const GOLD_20Y = 16000;   // 2006-08-24 approximate
          const current  = tolaNPR.current;

          const calcRow = (period: string, ref: number) => {
            const amount = current - ref;
            const pct    = (amount / ref) * 100;
            const sign   = amount >= 0 ? '+' : '';
            return { period, priceTola: ref, amount: Math.round(amount), percent: `${sign}${pct.toFixed(2)}%`, isNegative: amount < 0 };
          };

          return (
            <PricePerformanceWidget
              asset="Gold"
              source="FENEGOSIDA"
              rows={[
                {
                  period: 'Today',
                  priceTola: current,
                  amount: tolaNPR.change24h != null ? Math.round(tolaNPR.change24h) : 0,
                  percent: tolaNPR.changePercent24h != null ? `${tolaNPR.changePercent24h >= 0 ? '+' : ''}${tolaNPR.changePercent24h.toFixed(2)}%` : '—',
                  isNegative: (tolaNPR.changePercent24h ?? 0) < 0,
                },
                calcRow('30 Days',  GOLD_30D),
                calcRow('6 Months', GOLD_6M),
                calcRow('1 Year',   GOLD_1Y),
                calcRow('5 Year',   GOLD_5Y),
                calcRow('20 Year',  GOLD_20Y),
              ]}
            />
          );
        })()}
      </aside>
      </div>
    </div>
  );
}




