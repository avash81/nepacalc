'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MarketDashboardLayout } from '@/components/market/MarketDashboardLayout';
import { Wallet, Globe, ArrowRight, ShieldCheck, MapPin, RefreshCcw } from 'lucide-react';

interface NRBRate { iso3: string; name: string; unit: number; buy: number | null; sell: number | null; mid: number | null; }
interface ForexData { nrb_date?: string; nrb_rates?: NRBRate[]; cross_rates?: Record<string, number>; }

// Top remittance corridors for Nepali workers — ordered by volume
const CORRIDORS = [
  { iso3: 'AED', country: 'UAE',          flag: '🇦🇪', context: 'Dubai, Abu Dhabi, Sharjah' },
  { iso3: 'QAR', country: 'Qatar',         flag: '🇶🇦', context: 'Doha, Al Rayyan' },
  { iso3: 'SAR', country: 'Saudi Arabia',  flag: '🇸🇦', context: 'Riyadh, Jeddah, Dammam' },
  { iso3: 'KWD', country: 'Kuwait',        flag: '🇰🇼', context: 'Kuwait City, Salmiya' },
  { iso3: 'BHD', country: 'Bahrain',       flag: '🇧🇭', context: 'Manama, Riffa' },
  { iso3: 'MYR', country: 'Malaysia',      flag: '🇲🇾', context: 'Kuala Lumpur, Penang' },
  { iso3: 'KRW', country: 'South Korea',   flag: '🇰🇷', context: 'Seoul, Busan, Incheon' },
  { iso3: 'USD', country: 'USA',           flag: '🇺🇸', context: 'New York, Texas, Virginia' },
  { iso3: 'GBP', country: 'UK',            flag: '🇬🇧', context: 'London, Birmingham, Leeds' },
  { iso3: 'AUD', country: 'Australia',     flag: '🇦🇺', context: 'Sydney, Melbourne, Brisbane' },
  { iso3: 'EUR', country: 'Europe',        flag: '🇪🇺', context: 'Germany, Portugal, Finland' },
  { iso3: 'JPY', country: 'Japan',         flag: '🇯🇵', context: 'Tokyo, Osaka, Nagoya' },
  { iso3: 'CAD', country: 'Canada',        flag: '🇨🇦', context: 'Toronto, Vancouver, Calgary' },
];

// Fallback rates in NPR per 1 unit (or per unit as per NRB)
const FALLBACK: Record<string, number> = {
  AED: 41.89, QAR: 42.3, SAR: 41.0, KWD: 499.0, BHD: 407.0,
  MYR: 35.8, KRW: 0.112, USD: 153.84, GBP: 201.0, AUD: 102.0,
  EUR: 170.0, JPY: 1.04, CAD: 112.0,
};

const CACHE_KEY = 'NepaCalc_remittance_v2';
const CACHE_TTL = 30 * 60 * 1000;

export default function RemittanceDashboardClient({ initialRates }: { initialRates?: any }) {
  const [rateMap, setRateMap] = useState<Record<string, { buy: number | null; sell: number | null; mid: number }>>({});
  const [nrbDate, setNrbDate] = useState<string>('');
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState(1000);

  const buildRateMap = useCallback((data: ForexData) => {
    const map: Record<string, { buy: number | null; sell: number | null; mid: number }> = {};
    if (data.nrb_rates && Array.isArray(data.nrb_rates)) {
      data.nrb_rates.forEach(r => {
        if (r.iso3 && r.mid) {
          map[r.iso3] = {
            buy:  r.buy  ? parseFloat((r.buy  / r.unit).toFixed(4)) : null,
            sell: r.sell ? parseFloat((r.sell / r.unit).toFixed(4)) : null,
            mid:  parseFloat((r.mid / r.unit).toFixed(4)),
          };
        }
      });
    }
    // Fill any missing corridors from cross_rates
    CORRIDORS.forEach(c => {
      if (!map[c.iso3] && data.cross_rates?.[c.iso3]) {
        map[c.iso3] = { buy: null, sell: null, mid: data.cross_rates[c.iso3] };
      }
    });
    return map;
  }, []);

  const loadRates = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const c = JSON.parse(cached);
          if (Date.now() - c.fetchedAt < CACHE_TTL) {
            setRateMap(c.rateMap); setNrbDate(c.nrbDate ?? ''); setIsLive(true); return;
          }
        }
      } catch {}
    }

    // Try initial server-side data first
    if (initialRates?.nrb_rates && !forceRefresh) {
      const m = buildRateMap(initialRates);
      setRateMap(m); setNrbDate(initialRates.nrb_date ?? ''); setIsLive(true);
    }

    setIsLoading(true);
    try {
      const res = await fetch('/data/forex-rates.json');
      if (!res.ok) throw new Error('forex-rates.json unavailable');
      const json: ForexData = await res.json();
      const m = buildRateMap(json);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ rateMap: m, nrbDate: json.nrb_date ?? '', fetchedAt: Date.now() }));
      setRateMap(m); setNrbDate(json.nrb_date ?? ''); setIsLive(true);
    } catch {
      // Use fallback rates
      const fallbackMap: Record<string, { buy: number | null; sell: number | null; mid: number }> = {};
      Object.entries(FALLBACK).forEach(([code, mid]) => { fallbackMap[code] = { buy: null, sell: null, mid }; });
      setRateMap(fallbackMap); setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }, [initialRates, buildRateMap]);

  useEffect(() => { loadRates(); }, [loadRates]);

  const fmt2 = (n: number | null) => n == null ? '—' : n.toFixed(2);
  const fmtPayout = (n: number | null, amount: number) => n == null ? '—' : `Rs. ${(n * amount).toLocaleString('en-NP', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const usdMid = rateMap['USD']?.mid ?? FALLBACK['USD'];
  const nrbDateDisplay = nrbDate
    ? new Date(nrbDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <MarketDashboardLayout
      title="Remittance to Nepal"
      description="Official NRB-based exchange rate board for the top Nepal remittance corridors. Sending money from UAE, Qatar, Saudi, Kuwait, Malaysia, Korea, USA, UK, or Australia? Find the exact NPR rate."
      liveRate={usdMid.toFixed(2)}
      changePercent={0}
      lastUpdated={isLive && nrbDate ? `NRB: ${nrbDateDisplay}` : 'Cached rates'}
      accentColor="#4361ee"
      mainBoard={
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-[#4361ee] flex items-center justify-center shadow-sm shadow-blue-500/10">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Nepal Remittance Corridor Board</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Official NRB buy rates — Updated {isLive ? nrbDateDisplay : 'from cache'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">Send amount:</label>
                <input
                  type="number"
                  value={sendAmount}
                  min={1}
                  onChange={e => setSendAmount(Math.max(1, Number(e.target.value)))}
                  className="w-24 h-8 px-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <button
                onClick={() => loadRates(true)}
                disabled={isLoading}
                className="h-8 w-8 flex items-center justify-center border border-slate-200 rounded-lg hover:border-blue-500 transition-all"
                title="Refresh rates"
              >
                <RefreshCcw className={`w-4 h-4 text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* NRB official badge */}
          <div className="px-6 sm:px-8 pt-3 pb-1 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
              Official NRB Reference Rates — Real Buying Rates shown
            </span>
          </div>

          {/* Corridor table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: '540px' }}>
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-4 pl-6 pr-3 sm:px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Corridor</th>
                  <th className="py-4 px-3 sm:px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">NRB Buy</th>
                  <th className="py-4 px-3 sm:px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">NRB Sell</th>
                  <th className="py-4 pl-3 pr-6 sm:px-8 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">
                    NPR for {sendAmount.toLocaleString()}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CORRIDORS.map(c => {
                  const r = rateMap[c.iso3];
                  const mid = r?.mid ?? FALLBACK[c.iso3] ?? 0;
                  const buy = r?.buy ?? null;
                  const sell = r?.sell ?? null;
                  return (
                    <tr key={c.iso3} className="group hover:bg-slate-50/40 transition-all" id={`${c.iso3.toLowerCase()}-to-npr`}>
                      <td className="py-4 pl-6 pr-3 sm:py-5 sm:px-8">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl sm:text-3xl leading-none mt-0.5 grayscale-[0.2] group-hover:grayscale-0 transition-all">{c.flag}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-black text-slate-900 leading-tight">{c.country}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.iso3}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-slate-300 shrink-0" />
                              <span className="text-[8px] text-slate-400 font-medium truncate">{c.context}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 sm:py-5 sm:px-8 text-right">
                        <span className={`text-[14px] sm:text-[15px] font-black tracking-tighter ${buy ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {buy != null ? buy.toFixed(4) : fmt2(mid)}
                        </span>
                      </td>
                      <td className="py-4 px-3 sm:py-5 sm:px-8 text-right">
                        <span className={`text-[14px] sm:text-[15px] font-black tracking-tighter ${sell ? 'text-slate-800' : 'text-slate-400'}`}>
                          {sell != null ? sell.toFixed(4) : '—'}
                        </span>
                      </td>
                      <td className="py-4 pl-3 pr-6 sm:py-5 sm:px-8 text-right">
                        <span className="text-[16px] sm:text-[18px] font-black text-blue-600 tracking-tighter">
                          {fmtPayout(mid, sendAmount)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer disclaimer */}
          <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                * Buying rate (NPR payout you receive) and Selling rate (NPR you pay when buying foreign currency) are official NRB reference rates.
                Your actual remittance provider (IME, Prabhu, Western Union, etc.) may apply a 0.5%–1.5% margin on these rates.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="/market-rates/exchange-rate-nepal/"
                className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline whitespace-nowrap"
              >
                Full NRB Rate Board →
              </a>
            </div>
          </div>
        </div>
      }
      calculatorSection={
        <div className="space-y-5">
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
            <h4 className="text-[12px] font-black text-blue-900 mb-3 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Safe Remittance Guide
            </h4>
            <ul className="space-y-2.5">
              {[
                'Only use licensed remittance providers: IME, Prabhu Money, Western Union, Wise.',
                'Never use unofficial Hundi channels — no legal protection.',
                'Always verify the NPR rate before confirming the transfer.',
                'Keep your digital transaction receipt (ID) until the money arrives.',
                'Compare providers — rates vary by 0.5% to 2% above the NRB baseline.',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-blue-800 font-medium leading-relaxed">
                  <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
            <Globe className="w-5 h-5 text-slate-400 mx-auto mb-2" />
            <h5 className="text-[12px] font-black text-slate-800 mb-1">Currency Converter</h5>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-3">
              Need to convert a specific amount? Use our full converter for 150+ currencies.
            </p>
            <a
              href="/calculator/currency-converter/"
              className="inline-block px-4 py-2 bg-[#1a73e8] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all"
            >
              Open Converter →
            </a>
          </div>
        </div>
      }
      seoSection={
        <div className="prose prose-slate max-w-none space-y-6">
          <h2 className="text-[20px] font-black text-slate-900 tracking-tighter" id="remittance-nepal-2084">
            Nepal Remittance Rates 2026 (NRB Official)
          </h2>
          <p className="text-[14px] text-slate-600 leading-relaxed">
            Remittance contributes over 25% of Nepal&apos;s GDP. This board shows official Nepal Rastra Bank (NRB) buying rates — the exact rate at which Nepali banks purchase foreign currency remitted from abroad. Your actual payout through a licensed remittance provider will be within 0.5%–1.5% of these official benchmark rates.
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="aed-to-npr">🇦🇪 UAE (AED) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            The UAE is Nepal&apos;s largest remittance source. The official NRB buy rate for 1 AED is shown in the table above.
            Over 1.5 million Nepali workers send money home from Dubai, Abu Dhabi, and Sharjah every month.
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="qar-to-npr">🇶🇦 Qatar (QAR) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Qatar employs hundreds of thousands of Nepali workers, especially in construction and hospitality.
            The official NRB buy rate for Qatari Riyal (QAR) to Nepalese Rupee (NPR) is shown in the table above.
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="sar-to-npr">🇸🇦 Saudi Arabia (SAR) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Saudi Arabia is one of Nepal&apos;s top remittance corridors. The NRB official SAR to NPR rate covers workers in Riyadh, Jeddah, and Dammam.
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="kwd-to-npr">🇰🇼 Kuwait (KWD) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            The Kuwaiti Dinar is one of the world&apos;s highest-value currencies. 1 KWD = approximately{' '}
            {(rateMap['KWD']?.sell ?? FALLBACK['KWD']).toFixed(2)} NPR (NRB official sell rate).
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="myr-to-npr">🇲🇾 Malaysia (MYR) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Malaysia is a major destination for Nepali workers in manufacturing and construction sectors.
            The current NRB buy rate for 1 MYR is shown in the table above.
          </p>

          <h3 className="text-[17px] font-black text-slate-900" id="krw-to-npr">🇰🇷 South Korea (KRW) to Nepal Remittance</h3>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            South Korea employs Nepali workers under the Employment Permit System (EPS). The NRB publishes KRW rates per 100 units.
            The NRB buy rate per 100 KRW is shown in the table above.
          </p>
        </div>
      }
    />
  );
}
