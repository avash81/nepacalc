'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Globe, RefreshCcw, AlertCircle, CheckCircle2, ArrowUpDown, Landmark, Zap, ShieldCheck, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function formatNPR(n: number) {
  return new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR', minimumFractionDigits: 2 }).format(n);
}

// ── NRB official 22 currencies with the correct INR per-unit rate (per 1 INR) ──
const NRB_FALLBACK: Record<string, number> = {
  USD: 153.84, INR: 1.6015, EUR: 170.0, GBP: 201.0,
  AUD: 102.0, CAD: 112.0, CHF: 176.0, SGD: 116.0, JPY: 1.04,
  CNY: 21.5, HKD: 19.7, SEK: 14.7, DKK: 22.5,
  AED: 41.89, QAR: 42.3, SAR: 41.0, KWD: 499.0, BHD: 407.0, OMR: 399.0,
  MYR: 35.8, KRW: 0.112, THB: 4.5,
};

// Source badge per currency — NRB official or indicative cross-rate
const NRB_OFFICIAL_CODES = new Set([
  'USD','INR','EUR','GBP','CHF','AUD','CAD','SGD','JPY','CNY',
  'SAR','QAR','THB','AED','MYR','KRW','SEK','DKK','HKD','KWD','BHD','OMR'
]);

const CURRENCY_META: Record<string, { label: string; flag: string; unit: number }> = {
  USD: { label: 'US Dollar',          flag: '🇺🇸', unit: 1   },
  INR: { label: 'Indian Rupee',       flag: '🇮🇳', unit: 1   },
  EUR: { label: 'Euro',               flag: '🇪🇺', unit: 1   },
  GBP: { label: 'British Pound',      flag: '🇬🇧', unit: 1   },
  AUD: { label: 'Australian Dollar',  flag: '🇦🇺', unit: 1   },
  CAD: { label: 'Canadian Dollar',    flag: '🇨🇦', unit: 1   },
  CHF: { label: 'Swiss Franc',        flag: '🇨🇭', unit: 1   },
  SGD: { label: 'Singapore Dollar',   flag: '🇸🇬', unit: 1   },
  JPY: { label: 'Japanese Yen',       flag: '🇯🇵', unit: 10  },
  CNY: { label: 'Chinese Yuan',       flag: '🇨🇳', unit: 1   },
  HKD: { label: 'Hong Kong Dollar',   flag: '🇭🇰', unit: 1   },
  SEK: { label: 'Swedish Krona',      flag: '🇸🇪', unit: 1   },
  DKK: { label: 'Danish Krone',       flag: '🇩🇰', unit: 1   },
  AED: { label: 'UAE Dirham',         flag: '🇦🇪', unit: 1   },
  QAR: { label: 'Qatari Riyal',       flag: '🇶🇦', unit: 1   },
  SAR: { label: 'Saudi Riyal',        flag: '🇸🇦', unit: 1   },
  KWD: { label: 'Kuwaiti Dinar',      flag: '🇰🇼', unit: 1   },
  BHD: { label: 'Bahraini Dinar',     flag: '🇧🇭', unit: 1   },
  OMR: { label: 'Omani Rial',         flag: '🇴🇲', unit: 1   },
  MYR: { label: 'Malaysian Ringgit',  flag: '🇲🇾', unit: 1   },
  KRW: { label: 'South Korean Won',   flag: '🇰🇷', unit: 100 },
  THB: { label: 'Thai Baht',          flag: '🇹🇭', unit: 1   },
  // Extended cross-rate currencies
  ZAR: { label: 'South African Rand', flag: '🇿🇦', unit: 1   },
  NZD: { label: 'New Zealand Dollar', flag: '🇳🇿', unit: 1   },
  NOK: { label: 'Norwegian Krone',    flag: '🇳🇴', unit: 1   },
  PKR: { label: 'Pakistani Rupee',    flag: '🇵🇰', unit: 100 },
  BDT: { label: 'Bangladeshi Taka',   flag: '🇧🇩', unit: 1   },
  LKR: { label: 'Sri Lankan Rupee',   flag: '🇱🇰', unit: 100 },
  PHP: { label: 'Philippine Peso',    flag: '🇵🇭', unit: 1   },
  IDR: { label: 'Indonesian Rupiah',  flag: '🇮🇩', unit: 100 },
  TRY: { label: 'Turkish Lira',       flag: '🇹🇷', unit: 1   },
  BRL: { label: 'Brazilian Real',     flag: '🇧🇷', unit: 1   },
  MXN: { label: 'Mexican Peso',       flag: '🇲🇽', unit: 1   },
  TWD: { label: 'Taiwan Dollar',      flag: '🇹🇼', unit: 1   },
  VND: { label: 'Vietnamese Dong',    flag: '🇻🇳', unit: 100 },
  RUB: { label: 'Russian Ruble',      flag: '🇷🇺', unit: 1   },
};

const QUICK_SELECT = ['USD', 'INR', 'AED', 'QAR', 'SAR', 'GBP'];

const CACHE_KEY = 'NepaCalc_forex_v3';
const CACHE_TTL = 30 * 60 * 1000;

export default function CurrencyCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [state, setState] = useSyncState('currency_v8', { fromCurrency: 'USD', amount: 100 });
  const { fromCurrency, amount } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const [rates, setRates]       = useState<Record<string, number>>(NRB_FALLBACK);
  const [nrbDate, setNrbDate]   = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isLive, setIsLive]     = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reversed, setReversed] = useState(false); // NPR → foreign when true
  const [currencySearch, setCurrencySearch] = useState('');

  const loadRates = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const c = JSON.parse(cached);
          if (Date.now() - c.fetchedAt < CACHE_TTL) {
            setRates(c.rates); setNrbDate(c.nrbDate ?? null);
            setFetchedAt(c.fetchedAt); setIsLive(true); return;
          }
        }
      } catch {}
    }
    setIsLoading(true);
    try {
      // Fetch from our own pre-built NRB+cross forex JSON
      const res = await fetch('/data/forex-rates.json');
      if (!res.ok) throw new Error('forex-rates.json not available');
      const json = await res.json();

      const merged: Record<string, number> = {};

      // Load cross_rates (150+ currencies, NPR per 1 unit)
      if (json.cross_rates) {
        Object.entries(json.cross_rates as Record<string, number>).forEach(([code, val]) => {
          if (val > 0) merged[code] = val;
        });
      }

      // Override with NRB official mid rates for the 22 currencies
      if (json.nrb_rates && Array.isArray(json.nrb_rates)) {
        json.nrb_rates.forEach((r: any) => {
          if (r.iso3 && r.mid && r.mid > 0) {
            // mid is already per-unit (mid / unit done in fetch-forex.js)
            merged[r.iso3] = r.mid;
          }
        });
        // INR: NRB publishes per 100 INR. cross_rates already divides by unit in v3.
        // Ensure we have it correctly as per 1 INR
        const inrNrb = json.nrb_rates.find((r: any) => r.iso3 === 'INR');
        if (inrNrb?.mid) {
          merged['INR'] = parseFloat((inrNrb.mid / 100).toFixed(6));
        }
      }

      const now = Date.now();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: merged, nrbDate: json.nrb_date ?? null, fetchedAt: now }));
      setRates(merged);
      setNrbDate(json.nrb_date ?? null);
      setFetchedAt(now);
      setIsLive(true);
    } catch {
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadRates(); }, [loadRates]);

  // Conversion logic — supports normal (foreign → NPR) and reversed (NPR → foreign)
  const results = useMemo(() => {
    const ratePerUnit = rates[fromCurrency] ?? NRB_FALLBACK[fromCurrency] ?? 1;
    const meta = CURRENCY_META[fromCurrency];
    const unit = meta?.unit ?? 1;

    if (reversed) {
      // amount is in NPR, convert to foreign
      const foreign = amount / ratePerUnit;
      return { display: `${foreign.toFixed(4)} ${fromCurrency}`, ratePerUnit };
    } else {
      const npr = amount * ratePerUnit;
      return { display: formatNPR(npr), ratePerUnit };
    }
  }, [fromCurrency, amount, rates, reversed]);

  const isNRBOfficial = NRB_OFFICIAL_CODES.has(fromCurrency);
  const lastUpdatedStr = fetchedAt
    ? new Intl.DateTimeFormat('en-NP', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(fetchedAt))
    : null;

  // Filtered catalog for search
  const filteredCatalog = Object.entries(CURRENCY_META).filter(([code, meta]) =>
    !currencySearch ||
    code.toLowerCase().includes(currencySearch.toLowerCase()) ||
    meta.label.toLowerCase().includes(currencySearch.toLowerCase())
  );

  if (isEmbed) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="embed-amount" className="text-[10px] font-black uppercase tracking-wider text-[#5F6368]">
            Convert {fromCurrency} to NPR
          </label>
          <input
            id="embed-amount"
            type="number"
            value={amount}
            onChange={e => update({ amount: Number(e.target.value) })}
            className="w-full h-11 px-4 border border-[#DADCE0] rounded-lg text-sm font-bold bg-[#F8F9FA] focus:bg-white focus:border-[#1A73E8] outline-none transition-all"
          />
        </div>
        <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl text-center shadow-sm">
          <div className="text-[9px] font-black text-[#1A73E8] uppercase tracking-widest mb-1">Equivalent NPR</div>
          <div className="text-2xl font-black text-[#202124] tracking-tighter font-mono">
            {formatNPR((rates[fromCurrency] ?? NRB_FALLBACK[fromCurrency] ?? 1) * amount)}
          </div>
          <div className="mt-1 text-[8px] font-black text-[#5F6368] uppercase">
            {isNRBOfficial ? '✅ NRB Official Rate' : 'Indicative Rate'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="currency-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Currency Converter' }]}
      title="Currency Converter Nepal"
      description="Convert 150+ world currencies to NPR (Nepalese Rupee) using official Nepal Rastra Bank (NRB) rates for major currencies and international cross-rates for the rest."
      icon={Globe}
      inputs={
        <div className="space-y-5">
          {/* Amount input + Swap button */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">
              {reversed ? 'Amount in NPR' : `Amount in ${fromCurrency}`}
            </label>
            <div className="relative flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={e => update({ amount: Number(e.target.value) })}
                className="flex-1 h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
              />
              <button
                onClick={() => setReversed(v => !v)}
                title={reversed ? 'Switch to foreign → NPR' : 'Switch to NPR → foreign'}
                className={`h-12 w-12 flex items-center justify-center rounded-md border transition-all ${reversed ? 'bg-[#1A73E8] border-[#1A73E8] text-white' : 'bg-white border-[#DADCE0] text-[#1A73E8] hover:border-[#1A73E8]'}`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-[#5F6368] font-medium">
              {reversed ? `↩ Tap ⇅ to convert ${fromCurrency} → NPR instead` : '↩ Tap ⇅ to reverse: NPR → foreign currency'}
            </p>
          </div>

          {/* Quick currency selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Quick Select</label>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_SELECT.map(code => (
                <button
                  key={code}
                  onClick={() => update({ fromCurrency: code })}
                  className={`h-16 flex flex-col items-center justify-center rounded-md border transition-all ${fromCurrency === code ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                >
                  <span className="text-xl leading-none mb-1">{CURRENCY_META[code]?.flag}</span>
                  <span className="text-[10px] font-black uppercase">{code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Full catalog with search */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">All Currencies (150+)</label>
            <input
              type="text"
              placeholder="Search currency code or name…"
              value={currencySearch}
              onChange={e => setCurrencySearch(e.target.value)}
              className="w-full h-9 px-3 border border-[#DADCE0] rounded-md text-[12px] bg-[#F8F9FA] focus:bg-white focus:border-[#1A73E8] outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-1.5 max-h-[200px] overflow-y-auto pr-1">
              {filteredCatalog.map(([code, meta]) => (
                <button
                  key={code}
                  onClick={() => update({ fromCurrency: code })}
                  className={`h-12 px-2 border rounded-md text-left flex items-center gap-2 transition-all ${fromCurrency === code ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                >
                  <span className="text-xl leading-none shrink-0">{meta.flag}</span>
                  <div className="overflow-hidden flex flex-col justify-center min-w-0">
                    <div className={`text-[10px] font-black uppercase leading-tight ${fromCurrency === code ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{code}</div>
                    <div className={`text-[8px] font-bold uppercase truncate ${fromCurrency === code ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{meta.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-5 h-full flex flex-col justify-center">
          {/* Main result */}
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">
              {reversed ? `${amount} NPR =` : `${amount} ${fromCurrency} =`}
            </div>
            <div className="text-4xl font-black text-[#1A73E8] tracking-tight break-all">{results.display}</div>
            <div className="flex justify-center mt-2 gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border shadow-sm ${isNRBOfficial ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                {isNRBOfficial ? '✅ NRB Official' : '〰 Indicative Rate'}
              </span>
            </div>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`border rounded-md p-3 text-center transition-colors ${isLive ? 'border-[#188038] bg-[#E6F4EA]' : 'border-[#F29900] bg-[#FFF9E6]'}`}>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-[9px] font-bold uppercase tracking-wider ${isLive ? 'text-[#188038]' : 'text-[#F29900]'}`}>Data Source</div>
                <button onClick={() => loadRates(true)} disabled={isLoading} className="hover:opacity-70 transition-opacity">
                  <RefreshCcw className={`w-3 h-3 ${isLive ? 'text-[#188038]' : 'text-[#F29900]'} ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className={`text-sm font-black ${isLive ? 'text-[#188038]' : 'text-[#F29900]'}`}>{isLive ? 'NRB Live' : 'Fallback'}</div>
              <div className="text-[8px] font-bold text-[#5F6368] uppercase mt-0.5">
                {nrbDate ? `NRB: ${nrbDate}` : lastUpdatedStr ?? '—'}
              </div>
            </div>
            <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-white">
              <div className="text-[9px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Exchange Rate</div>
              <div className="text-sm font-black text-[#1A73E8]">
                1 {fromCurrency} = {results.ratePerUnit.toFixed(4)} NPR
              </div>
              <div className="text-[8px] font-bold text-[#5F6368] uppercase mt-0.5">Per unit</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-2 items-start">
            <ShieldCheck className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
            <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
              NRB official rates for {Array.from(NRB_OFFICIAL_CODES).join(', ')}. All other currencies use international mid-market cross-rates.
              Bank counter rates may differ by 0.5–2.5%. For remittance, see{' '}
              <a href="/market-rates/remittance/" className="text-[#1A73E8] underline">Remittance Board</a>.
            </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Top Remittance Corridors</h3>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={['USD','AED','QAR','SAR','KWD','GBP','AUD','MYR'].map(c => ({ code: c, rate: parseFloat((rates[c] ?? NRB_FALLBACK[c] ?? 0).toFixed(2)) }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                    <XAxis dataKey="code" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#5F6368' }} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: '#F8F9FA' }}
                      content={({ active, payload }) => active && payload?.length ? (
                        <div className="bg-[#202124] text-white p-2 rounded shadow-sm border border-[#5F6368]">
                          <p className="text-[9px] font-bold uppercase text-[#5F6368] mb-0.5">{payload[0].payload.code}</p>
                          <p className="text-sm font-black">{payload[0].value} NPR</p>
                        </div>
                      ) : null}
                    />
                    <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                      {['USD','AED','QAR','SAR','KWD','GBP','AUD','MYR'].map((code, i) => (
                        <Cell key={i} fill={code === fromCurrency ? '#1A73E8' : '#DADCE0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">NRB Peg Info</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#5F6368] uppercase">INR Fixed Peg</span>
                    <span className="text-base font-black text-[#188038]">100 INR = 160 NPR</span>
                  </div>
                  <p className="text-[9px] text-[#5F6368] leading-relaxed mt-1">
                    NRB official: Buy 160.00 / Sell 160.15. Pegged since 1993.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['USD', 'US Dollar'], ['AED', 'UAE Dirham'], ['QAR', 'Qatari Riyal'], ['SAR', 'Saudi Riyal']].map(([code, name]) => (
                    <div key={code} className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-center">
                      <div className="text-[8px] font-bold text-[#5F6368] uppercase mb-0.5">{CURRENCY_META[code]?.flag} {code}</div>
                      <div className="text-sm font-black text-[#202124]">{(rates[code] ?? NRB_FALLBACK[code] ?? 0).toFixed(2)}</div>
                      <div className="text-[7px] text-[#5F6368] uppercase">NPR per 1 {code}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the amount you want to convert in the top field.",
          "Quick Select: tap USD, INR, AED, QAR, SAR, or GBP for the most common Nepal remittance currencies.",
          "Use the ⇅ button to flip: convert NPR → foreign currency instead.",
          "Search 150+ currencies by code or name in the catalog below.",
          "A green ✅ NRB Official badge confirms the rate is from Nepal Rastra Bank directly."
        ]
      }}
      formula={{
        title: "Conversion Formula",
        description: "NPR value = Amount × Official NRB Rate (or international cross-rate)",
        raw: "NPR = Amount × Rate_per_unit",
        variables: [
          "NRB Official Rate: Published daily by Nepal Rastra Bank for 22 currencies",
          "INR Peg: 100 INR = 160.00 NPR (buy) / 160.15 NPR (sell)",
          "Cross Rate: Derived from USD base rate for 130+ additional currencies"
        ]
      }}
      faqs={[
        { question: "Why is the bank rate different from this tool?", answer: "Banks include a spread on buying and selling rates. This tool provides the official NRB mid-market reference rates for the 22 NRB currencies and indicative rates for the rest." },
        { question: "Is the INR-NPR peg permanent?", answer: "The peg has been maintained since 1993. The official NRB buy rate is 100 INR = 160.00 NPR and sell rate is 100 INR = 160.15 NPR." },
        { question: "Which currencies are official NRB rates?", answer: `The following are official NRB rates: ${Array.from(NRB_OFFICIAL_CODES).join(', ')}. All other currencies use indicative international cross-rates.` },
        { question: "How often are rates updated?", answer: "Rates are fetched from the NRB official API every banking day. Cross-rates are refreshed every 30 minutes from the international forex API." },
        { question: "Does this include remittance fees?", answer: "No, this is a pure currency conversion tool. For remittance rates, visit our Remittance Board." }
      ]}
      sidebar={{
        title: "Financial Hub",
        subtitle: "Monetary Tools",
        links: [
          { label: "Exchange Rate Nepal", href: "/market-rates/exchange-rate-nepal/", icon: Landmark },
          { label: "Remittance Board", href: "/market-rates/remittance/", icon: Globe },
          { label: "Nepal Rastra Bank", href: "https://nrb.org.np", icon: ShieldCheck },
        ],
      }}
      relatedTools={[
        { label: "NRB Exchange Rate", href: "/market-rates/exchange-rate-nepal/" },
        { label: "Remittance Board", href: "/market-rates/remittance/" },
        { label: "Gold Converter", href: "/calculator/gold-converter/" }
      ]}
    />
  );
}
