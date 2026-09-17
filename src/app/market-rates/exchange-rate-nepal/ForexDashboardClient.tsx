'use client';

import React, { useState } from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import CurrencyConverter from '@/app/calculator/currency-converter/Calculator';
import { Landmark, Search, ArrowRightLeft, Globe2, TrendingDown, TrendingUp, ShieldCheck } from 'lucide-react';

interface NRBRate {
  iso3: string;
  name: string;
  unit: number;
  buy: number | null;
  sell: number | null;
  mid: number | null;
}

interface ForexData {
  nrb_date?: string;
  fetched_at?: string;
  nrb_rates?: NRBRate[];
  cross_rates?: Record<string, number>;
  // legacy shape support
  usd?: { current: number; changePercent24h: number };
  date?: string;
}

// Priority order for the exchange rate table (NRB official currencies)
const NRB_DISPLAY_ORDER = [
  { iso3: 'USD', flag: '🇺🇸' },
  { iso3: 'EUR', flag: '🇪🇺' },
  { iso3: 'GBP', flag: '🇬🇧' },
  { iso3: 'AUD', flag: '🇦🇺' },
  { iso3: 'CAD', flag: '🇨🇦' },
  { iso3: 'SGD', flag: '🇸🇬' },
  { iso3: 'JPY', flag: '🇯🇵' },
  { iso3: 'CHF', flag: '🇨🇭' },
  { iso3: 'CNY', flag: '🇨🇳' },
  { iso3: 'HKD', flag: '🇭🇰' },
  { iso3: 'SEK', flag: '🇸🇪' },
  { iso3: 'DKK', flag: '🇩🇰' },
  { iso3: 'AED', flag: '🇦🇪' },
  { iso3: 'QAR', flag: '🇶🇦' },
  { iso3: 'SAR', flag: '🇸🇦' },
  { iso3: 'KWD', flag: '🇰🇼' },
  { iso3: 'BHD', flag: '🇧🇭' },
  { iso3: 'OMR', flag: '🇴🇲' },
  { iso3: 'MYR', flag: '🇲🇾' },
  { iso3: 'KRW', flag: '🇰🇷' },
  { iso3: 'THB', flag: '🇹🇭' },
  { iso3: 'INR', flag: '🇮🇳' },
];

export default function ForexDashboardClient({ initialRates }: { initialRates?: any }) {
  const { rates, loading } = useLiveRates();
  const [search, setSearch] = useState('');

  // Determine best available data source
  const forexData: ForexData | null = (rates?.forex as unknown as ForexData) ?? null;

  // Build nrb_rates array from available sources
  let nrbRates: NRBRate[] = [];
  let nrbDate = '';
  let usdSell = 0;

  if (forexData?.nrb_rates && Array.isArray(forexData.nrb_rates)) {
    // New v3 format from live-rates.json
    nrbRates = forexData.nrb_rates;
    nrbDate  = forexData.nrb_date ?? '';
    const usd = nrbRates.find(r => r.iso3 === 'USD');
    usdSell = usd?.sell ?? usd?.mid ?? 0;
  } else if (initialRates?.nrb_rates) {
    // Build-time NRB data injected from page.tsx
    nrbRates = initialRates.nrb_rates;
    nrbDate  = initialRates.nrb_date ?? '';
    const usd = nrbRates.find(r => r.iso3 === 'USD');
    usdSell = usd?.sell ?? usd?.mid ?? 0;
  } else if (initialRates?.NPR) {
    // Legacy cross-rate fallback
    usdSell = initialRates.NPR;
    nrbDate = '';
  }

  const fmt2 = (n: number | null | undefined) =>
    n == null || n <= 0 ? '—' : n.toFixed(2);

  // Build the display list using NRB_DISPLAY_ORDER priority
  const rateMap = new Map(nrbRates.map(r => [r.iso3, r]));

  const displayList = NRB_DISPLAY_ORDER
    .map(({ iso3, flag }) => {
      const r = rateMap.get(iso3);
      return r ? { ...r, flag } : null;
    })
    .filter(Boolean) as (NRBRate & { flag: string })[];

  const filtered = displayList.filter(r =>
    r.iso3.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const dateDisplay = nrbDate
    ? new Date(nrbDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Loading…';

  return (
    <MarketDashboardLayout
      title="Foreign Exchange Rate"
      description="Official daily buying and selling rates against the Nepalese Rupee (NPR). Data sourced directly from Nepal Rastra Bank (NRB) official API — updated every banking day."
      liveRate={usdSell > 0 ? usdSell.toFixed(2) : '—'}
      changePercent={0}
      lastUpdated={dateDisplay}
      accentColor="#059669"
      mainBoard={
        <div className="flex flex-col">
          {/* Header — stacked on mobile, row on md+ */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-600/10">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">NRB Official Rate Board</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {nrbDate ? `Published: ${dateDisplay}` : 'Buy & Sell Rates against NPR'}
                </p>
              </div>
            </div>

            {/* Search — full-width on mobile, capped on desktop */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search currency…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* NRB official data badge */}
          <div className="px-6 sm:px-8 pt-3 pb-1 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
              Official NRB Rates — Real Buy &amp; Sell Spreads
            </span>
          </div>

          {/* Forex Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: '480px' }}>
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-4 pl-6 pr-4 sm:px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Currency</th>
                  <th className="py-4 px-3 sm:px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                  <th className="py-4 px-3 sm:px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Buying (Rs.)</th>
                  <th className="py-4 pl-3 pr-6 sm:px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Selling (Rs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400 text-sm">No currencies match your search.</td>
                  </tr>
                )}
                {filtered.map((r, i) => (
                  <tr key={r.iso3} className="group hover:bg-slate-50/40 transition-all" id={`${r.iso3.toLowerCase()}-to-npr`}>
                    <td className="py-4 pl-6 pr-4 sm:py-5 sm:px-8">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl leading-none grayscale-[0.2] group-hover:grayscale-0 transition-all">{r.flag}</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] sm:text-[14px] font-black text-slate-900 leading-tight">{r.iso3}</span>
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{r.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 sm:py-5 sm:px-8 text-[12px] font-black text-slate-500">
                      {r.unit === 1 ? '1' : `${r.unit}`}
                    </td>
                    <td className="py-4 px-3 sm:py-5 sm:px-8 text-right">
                      <span className={`text-[15px] sm:text-[17px] font-black tracking-tighter ${r.buy ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {fmt2(r.buy)}
                      </span>
                    </td>
                    <td className="py-4 pl-3 pr-6 sm:py-5 sm:px-8 text-right">
                      <span className={`text-[15px] sm:text-[17px] font-black tracking-tighter ${r.sell ? 'text-slate-900' : 'text-slate-400'}`}>
                        {fmt2(r.sell)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Source: Nepal Rastra Bank Official API
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              * Rates shown are official NRB reference rates. Retail bank counter and remittance rates may vary by 0.5–2%.
            </p>
          </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
            <ArrowRightLeft className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-[11px] leading-relaxed text-emerald-800 font-medium italic">
              Use our global converter below to instantly calculate cross-currency pairs against the current NPR benchmark.
            </p>
          </div>
          <CurrencyConverter isEmbed={true} />
        </div>
      }
    />
  );
}
