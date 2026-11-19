'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import { Coins, Scale, Calculator, X, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, Info, ShieldCheck, Award } from 'lucide-react';

export interface InternationalRatesData {
  gold: {
    spotUSD: number;
    change24h: number;
    changePercent24h: number;
    prevClose: number;
    high24h: number;
    low24h: number;
    updatedAt: string;
  };
  silver: {
    spotUSD: number;
    change24h: number;
    changePercent24h: number;
    prevClose: number;
    high24h: number;
    low24h: number;
    updatedAt: string;
  };
  history30d: {
    gold: { date: string; price: number }[];
    silver: { date: string; price: number }[];
  };
  usdNprRate?: number;
  published_at?: string;
}

export interface CountryUnit {
  id: string;
  label: string;
  shortLabel: string;
  ozFactor: number;
}

export interface CountryPurity {
  id: string;
  name: string;
  purity: number;
  desc: string;
}

export interface PopularItem {
  name: string;
  metal: 'gold' | 'silver';
  weight: string;
  purity: string;
  ozFactor: number;
  purityFactor: number;
  taxNote: string;
}

export interface CountryGoldConfig {
  code: string;              // 'uk' | 'ca' | 'au' | 'de' | 'fr' | 'nl'
  countryName: string;       // 'United Kingdom' | 'Canada' | 'Australia' | 'Germany' | 'France' | 'Netherlands'
  shortName: string;         // 'UK' | 'Canada' | 'Australia' | 'Germany' | 'France' | 'Netherlands'
  currencyCode: string;      // 'GBP' | 'CAD' | 'AUD' | 'EUR'
  currencySymbol: string;    // '£' | 'C$' | 'A$' | '€'
  defaultUsdRate: number;    // 1 USD = X local currency (e.g. 0.7586 for GBP)
  marketBadge: string;       // 'London Bullion (LBMA)' | 'TSX / Canadian Spot' | 'Perth Mint / ASX' | 'Frankfurt Spot' | 'Paris Euronext / BdF' | 'Amsterdam / DNB'
  goldCardTitle: string;     // e.g. 'Gold (24ct / Hallmark)'
  silverCardTitle: string;   // e.g. 'Silver (.999 Fine)'
  subtitle: string;          // e.g. 'Per troy ounce, gram and sovereign • Live London bullion spot'
  units: CountryUnit[];
  purities: CountryPurity[];
  popularItems: PopularItem[];
  regulatoryNotes: {
    authority: string;
    vatGstRule: string;
    cgtTaxRule: string;
  };
}

interface Props {
  config: CountryGoldConfig;
  initialData: InternationalRatesData;
}

export default function CountryGoldClient({ config, initialData }: Props) {
  const [data, setData] = useState<InternationalRatesData>(initialData);
  const [fxRate, setFxRate] = useState<number>(config.defaultUsdRate);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState<string>('Live (Auto-updating)');

  // Selected unit toggle
  const [activeUnit, setActiveUnit] = useState<string>(config.units[0]?.id || 'oz');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Modal Calculator State
  const [calcMetal, setCalcMetal] = useState<'gold' | 'silver'>('gold');
  const [calcPurity, setCalcPurity] = useState<string>(config.purities[0]?.id || '24k');
  const [calcUnitMode, setCalcUnitMode] = useState<string>(config.units[0]?.id || 'oz');
  const [calcSimpleQty, setCalcSimpleQty] = useState<string>('1');

  // Fetch live FX rates from open currency API or local forex data
  const updateFxRate = useCallback(async () => {
    try {
      // 1. Try real-time open exchange rates feed
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store', signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          const targetRate = json?.rates?.[config.currencyCode];
          if (targetRate && typeof targetRate === 'number' && targetRate > 0) {
            setFxRate(targetRate);
            return;
          }
        }
      } catch {
        // Fallback to internal rates
      }

      // 2. Fallback to same-origin /data/forex-rates.json
      const res = await fetch(`/data/forex-rates.json?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const cross = json?.cross_rates;
        if (cross && cross.USD) {
          const usdNpr = cross.USD;
          const targetNpr = cross[config.currencyCode];
          if (usdNpr && targetNpr && targetNpr > 0) {
            const calculatedRate = usdNpr / targetNpr;
            setFxRate(calculatedRate);
          }
        }
      }
    } catch {
      // Keep existing or default FX rate on error
    }
  }, [config.currencyCode]);

  // Live Auto-Update Poller for Precious Metals
  const fetchLiveRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      let fetchedGold: number | null = null;
      let fetchedSilver: number | null = null;
      let fetchedUpdatedAt: string | null = null;

      // 1. Try public real-time gold-api.com feed
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const [gRes, sRes] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store', signal: controller.signal })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store', signal: controller.signal })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);
        clearTimeout(timeoutId);

        if (gRes?.price && typeof gRes.price === 'number') {
          fetchedGold = Math.round(gRes.price * 100) / 100;
          fetchedUpdatedAt = gRes.updatedAt;
        }
        if (sRes?.price && typeof sRes.price === 'number') {
          fetchedSilver = Math.round(sRes.price * 100) / 100;
          fetchedUpdatedAt = fetchedUpdatedAt || sRes.updatedAt;
        }
      } catch {
        // Fallback to internal endpoint
      }

      // 2. If primary external feed was unavailable or partial, fetch same-origin static data
      if (!fetchedGold || !fetchedSilver) {
        try {
          const localRes = await fetch(`/data/international-rates.json?_t=${Date.now()}`, { cache: 'no-store' });
          if (localRes.ok) {
            const localData = await localRes.json();
            if (localData?.gold?.spotUSD) {
              fetchedGold = localData.gold.spotUSD;
              fetchedUpdatedAt = localData.gold.updatedAt;
            }
            if (localData?.silver?.spotUSD) {
              fetchedSilver = localData.silver.spotUSD;
              fetchedUpdatedAt = fetchedUpdatedAt || localData.silver.updatedAt;
            }
          }
        } catch {
          // Keep current state
        }
      }

      if (fetchedGold && fetchedSilver) {
        const newGoldPrice = fetchedGold;
        const newSilverPrice = fetchedSilver;

        setData((prev) => {
          const goldChange = prev.gold.prevClose ? Math.round((newGoldPrice - prev.gold.prevClose) * 100) / 100 : prev.gold.change24h;
          const goldPercent = prev.gold.prevClose ? Math.round(((newGoldPrice - prev.gold.prevClose) / prev.gold.prevClose) * 10000) / 100 : prev.gold.changePercent24h;

          const silverChange = prev.silver.prevClose ? Math.round((newSilverPrice - prev.silver.prevClose) * 100) / 100 : prev.silver.change24h;
          const silverPercent = prev.silver.prevClose ? Math.round(((newSilverPrice - prev.silver.prevClose) / prev.silver.prevClose) * 10000) / 100 : prev.silver.changePercent24h;

          return {
            ...prev,
            gold: {
              ...prev.gold,
              spotUSD: newGoldPrice,
              change24h: goldChange,
              changePercent24h: goldPercent,
              high24h: Math.max(prev.gold.high24h, newGoldPrice),
              low24h: Math.min(prev.gold.low24h, newGoldPrice),
              updatedAt: fetchedUpdatedAt || new Date().toISOString(),
            },
            silver: {
              ...prev.silver,
              spotUSD: newSilverPrice,
              change24h: silverChange,
              changePercent24h: silverPercent,
              high24h: Math.max(prev.silver.high24h, newSilverPrice),
              low24h: Math.min(prev.silver.low24h, newSilverPrice),
              updatedAt: fetchedUpdatedAt || new Date().toISOString(),
            },
          };
        });

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastRefreshedText(`${timeStr} UTC`);
      }
    } catch {
      // Keep current state
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    updateFxRate();
    fetchLiveRates();
    const intervalId = setInterval(() => {
      fetchLiveRates();
      updateFxRate();
    }, 30_000);
    const onFocus = () => {
      fetchLiveRates();
      updateFxRate();
    };
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchLiveRates, updateFxRate]);

  // Keep browser tab title synced dynamically with live prices
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const gFmt = (data.gold.spotUSD * fxRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const sFmt = (data.silver.spotUSD * fxRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.title = `Gold Price Today ${config.shortName} (${config.currencySymbol} ${gFmt}/oz) | Silver ${config.currencySymbol} ${sFmt}`;
    }
  }, [data.gold.spotUSD, data.silver.spotUSD, fxRate, config.shortName, config.currencySymbol]);

  // Selected Unit Info
  const activeUnitInfo = config.units.find((u) => u.id === activeUnit) || config.units[0];

  // Spot prices in local currency
  const goldOzLocal = data.gold.spotUSD * fxRate;
  const silverOzLocal = data.silver.spotUSD * fxRate;

  const goldPriceLocal = goldOzLocal * activeUnitInfo.ozFactor;
  const goldDeltaLocal = (data.gold.change24h * fxRate) * activeUnitInfo.ozFactor;

  const silverPriceLocal = silverOzLocal * activeUnitInfo.ozFactor;
  const silverDeltaLocal = (data.silver.change24h * fxRate) * activeUnitInfo.ozFactor;

  // Price formatter in local currency
  const formatPrice = (val: number) => {
    return `${config.currencySymbol} ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculator Modal Calculation
  const baseRateLocalOz = calcMetal === 'gold' ? goldOzLocal : silverOzLocal;
  const selectedPurityObj = config.purities.find((p) => p.id === calcPurity) || config.purities[0];
  const purityFactor = calcMetal === 'gold' ? selectedPurityObj.purity : 0.999;
  const calcUnitObj = config.units.find((u) => u.id === calcUnitMode) || config.units[0];

  const qtyVal = parseFloat(calcSimpleQty) || 0;
  const calcTotalLocal = qtyVal * calcUnitObj.ozFactor * baseRateLocalOz * purityFactor;
  const calcRatePerUnit = baseRateLocalOz * calcUnitObj.ozFactor * purityFactor;

  // Chart data scaled to local currency
  const goldChartData = data.history30d.gold.map((pt) => ({
    date: pt.date,
    price: pt.price * fxRate,
  }));

  const silverChartData = data.history30d.silver.map((pt) => ({
    date: pt.date,
    price: pt.price * fxRate,
  }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 sm:py-6 md:py-8 font-sans font-modern-ui">

      {/* ── TOP SECTION HEADER (Compact Hamro Patro Style - Zero Wasted Space) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Today&apos;s Gold &amp; Silver Price ({config.shortName})
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
              {config.currencyCode} Spot
            </span>
          </div>

          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>{config.subtitle}</span>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Gold &amp; silver calculator
            </button>
          </div>
        </div>

        {/* Compact Right Controls: Unit pills + Red Calculate button + Last updated */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Unit Toggle Pills */}
          <div className="inline-flex items-center p-0.5 bg-gray-100 rounded-lg border border-gray-200 overflow-x-auto scrollbar-none">
            {config.units.map((u) => {
              const active = activeUnit === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setActiveUnit(u.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  {u.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Red Calculate Button */}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculate</span>
          </button>

          {/* Last updated timestamp with live pulsing dot & refresh icon */}
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-gray-500 pl-1">
            <span>Last updated: {lastRefreshedText}</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <button
              onClick={fetchLiveRates}
              disabled={isRefreshing}
              title="Refresh live prices"
              className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── DUAL HERO PRICE CARDS (Immediately Below Top Bar) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        
        {/* GOLD CARD */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-3.5 gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                  {config.goldCardTitle}
                </h2>
                <span className="text-[11px] sm:text-xs text-gray-500">{activeUnitInfo.label}</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full border shrink-0 ${
                data.gold.changePercent24h >= 0
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                  : 'bg-rose-50 text-rose-700 border-rose-200/60'
              }`}
            >
              {data.gold.changePercent24h >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span>{data.gold.changePercent24h >= 0 ? `+${data.gold.changePercent24h}%` : `${data.gold.changePercent24h}%`}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight transition-all">
              {formatPrice(goldPriceLocal)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.gold.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.gold.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(goldDeltaLocal))}
              </span>
            </div>

            {/* Quick Live Stats: Bid / Ask / Day Range in local currency */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-[11px]">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Bid</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {((data.gold.spotUSD - 0.40) * fxRate * activeUnitInfo.ozFactor).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Ask</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {((data.gold.spotUSD + 0.40) * fxRate * activeUnitInfo.ozFactor).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Day Range</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {(data.gold.low24h * fxRate * activeUnitInfo.ozFactor).toFixed(0)} - {config.currencySymbol} {(data.gold.high24h * fxRate * activeUnitInfo.ozFactor).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* 30-Day Trend Area Chart (Amber Gradient) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1 font-medium text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> 30-day trend
              </span>
              <span className="text-[11px] text-gray-400">{config.marketBadge}</span>
            </div>
            <SimpleAreaChart 
              data={goldChartData} 
              color="#EAB308" 
              gradientFrom="#EAB308" 
              gradientTo="#FEF08A" 
              unitFactor={activeUnitInfo.ozFactor}
              currencySymbol={config.currencySymbol}
            />
          </div>
        </div>

        {/* SILVER CARD */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-3.5 gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs shrink-0">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                  {config.silverCardTitle}
                </h2>
                <span className="text-[11px] sm:text-xs text-gray-500">{activeUnitInfo.label}</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full border shrink-0 ${
                data.silver.changePercent24h >= 0
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                  : 'bg-rose-50 text-rose-700 border-rose-200/60'
              }`}
            >
              {data.silver.changePercent24h >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span>{data.silver.changePercent24h >= 0 ? `+${data.silver.changePercent24h}%` : `${data.silver.changePercent24h}%`}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight transition-all">
              {formatPrice(silverPriceLocal)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.silver.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.silver.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(silverDeltaLocal))}
              </span>
            </div>

            {/* Quick Live Stats: Bid / Ask / Day Range in local currency */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-[11px]">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Bid</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {((data.silver.spotUSD - 0.05) * fxRate * activeUnitInfo.ozFactor).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Ask</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {((data.silver.spotUSD + 0.05) * fxRate * activeUnitInfo.ozFactor).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Day Range</span>
                <span className="font-bold text-gray-800">{config.currencySymbol} {(data.silver.low24h * fxRate * activeUnitInfo.ozFactor).toFixed(2)} - {config.currencySymbol} {(data.silver.high24h * fxRate * activeUnitInfo.ozFactor).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 30-Day Trend Area Chart (Red/Crimson Gradient) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1 font-medium text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 text-red-500" /> 30-day trend
              </span>
              <span className="text-[11px] text-gray-400">{config.marketBadge}</span>
            </div>
            <SimpleAreaChart 
              data={silverChartData} 
              color="#DC2626" 
              gradientFrom="#DC2626" 
              gradientTo="#FCA5A5" 
              unitFactor={activeUnitInfo.ozFactor}
              currencySymbol={config.currencySymbol}
            />
          </div>
        </div>

      </div>

      {/* ── EXPLANATORY OVERVIEW & QUICK ANSWER CONTAINER ── */}
      <div id="quick-answer" className="bg-gradient-to-r from-amber-50/70 via-white to-slate-50 border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-xs mb-8 space-y-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
            Live {config.countryName} Bullion Summary • Real-Time Quick Answer
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          <strong className="text-gray-900 font-bold">Quick Answer:</strong> As of today, the live institutional gold spot price in {config.countryName} is <strong className="text-gray-900 font-bold">{formatPrice(goldOzLocal)} per troy ounce</strong> (approximately <strong className="text-gray-900 font-bold">{formatPrice(goldOzLocal / 31.1034768)}/g</strong> for pure gold, <strong className="text-gray-900 font-bold">{formatPrice((goldOzLocal * 10) / 31.1034768)}</strong> per 10 grams, and <strong className="text-gray-900 font-bold">{formatPrice((goldOzLocal * 1000) / 31.1034768)}</strong> per kilogram). Live spot silver trades at <strong className="text-gray-900 font-bold">{formatPrice(silverOzLocal)} per troy ounce</strong> (approximately <strong className="text-gray-900 font-bold">{formatPrice(silverOzLocal / 31.1034768)}/g</strong>). The current Gold-to-Silver ratio is <strong className="text-gray-900 font-bold">{(data.gold.spotUSD / (data.silver.spotUSD || 1)).toFixed(1)}:1</strong>.
        </p>

        {/* Regulatory & Tax Pill Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-amber-100/80 text-xs">
          <div className="bg-white/80 border border-amber-200/70 rounded-xl p-3">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Assay &amp; Mint Standard</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              {config.regulatoryNotes.authority}
            </p>
          </div>

          <div className="bg-white/80 border border-amber-200/70 rounded-xl p-3">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>VAT / GST Exemption</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              {config.regulatoryNotes.vatGstRule}
            </p>
          </div>

          <div className="bg-white/80 border border-amber-200/70 rounded-xl p-3">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Capital Gains Tax Rules</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              {config.regulatoryNotes.cgtTaxRule}
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION: GOLD PRICES BY PURITY MATRIX ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Gold Rates by Purity ({config.shortName})
              </h2>
              <p className="text-xs text-gray-500">Live spot rates in {config.currencyCode} · Updated continuously</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <span className="text-amber-800 font-bold">Pure Bullion Spot: {formatPrice(goldOzLocal)} / oz</span>
          </div>
        </div>

        {/* Purity Matrix Table */}
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/70">
                <th className="py-2.5 px-3">Purity / Karat</th>
                <th className="py-2.5 px-3">Fineness</th>
                <th className="py-2.5 px-3">Per Gram</th>
                <th className="py-2.5 px-3">Per 10 Grams</th>
                <th className="py-2.5 px-3">Per Troy Ounce</th>
                <th className="py-2.5 px-3">Per Kilogram</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {config.purities.map((p) => {
                const perGram = (goldOzLocal / 31.1034768) * p.purity;
                const per10g = perGram * 10;
                const perOz = goldOzLocal * p.purity;
                const perKg = perGram * 1000;
                return (
                  <tr key={p.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-2.5 px-3 font-bold text-gray-900">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{p.desc}</div>
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{(p.purity * 100).toFixed(1)}%</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-900">{formatPrice(perGram)}</td>
                    <td className="py-2.5 px-3">{formatPrice(per10g)}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{formatPrice(perOz)}</td>
                    <td className="py-2.5 px-3">{formatPrice(perKg)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION: POPULAR BULLION COINS & BARS ── */}
      {config.popularItems && config.popularItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <Award className="w-4 h-4 text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Popular Bullion Coins &amp; Bars in {config.countryName}
              </h2>
              <p className="text-xs text-gray-500">Benchmark melt value based on live {config.currencyCode} spot rates</p>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/70">
                  <th className="py-2.5 px-3">Coin / Bar</th>
                  <th className="py-2.5 px-3">Gross Weight</th>
                  <th className="py-2.5 px-3">Fineness</th>
                  <th className="py-2.5 px-3">Intrinsic Melt Value</th>
                  <th className="py-2.5 px-3">Tax Treatment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {config.popularItems.map((item, idx) => {
                  const baseRate = item.metal === 'gold' ? goldOzLocal : silverOzLocal;
                  const meltVal = baseRate * item.ozFactor * item.purityFactor;
                  return (
                    <tr key={idx} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 px-3 font-bold text-gray-900">{item.name}</td>
                      <td className="py-2.5 px-3 text-gray-600">{item.weight}</td>
                      <td className="py-2.5 px-3 text-gray-600">{item.purity}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">{formatPrice(meltVal)}</td>
                      <td className="py-2.5 px-3 text-gray-500 text-[11px]">{item.taxNote}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PRICE CALCULATOR POPUP MODAL (Exact Hamro Patro Structure) ── */}
      {isCalculatorOpen && (
        <div
          onClick={() => setIsCalculatorOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-5 max-h-[95vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Price Calculator ({config.shortName})
              </h3>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Field 1: Metal Toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Metal
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcMetal('gold')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm transition font-bold cursor-pointer ${
                      calcMetal === 'gold'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/20 shadow-xs'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Coins className="w-4 h-4 text-[#B91C1C]" />
                    <span>Gold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMetal('silver')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm transition font-bold cursor-pointer ${
                      calcMetal === 'silver'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/20 shadow-xs'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-slate-500" />
                    <span>Silver</span>
                  </button>
                </div>
              </div>

              {/* Field 2: Unit Toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Unit
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {config.units.map((u) => {
                    const active = calcUnitMode === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setCalcUnitMode(u.id)}
                        className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
                          active
                            ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/40 shadow-xs'
                            : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {u.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 2b: Purity (when Gold is selected) */}
              {calcMetal === 'gold' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Purity / Karat
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {config.purities.map((p) => {
                      const active = calcPurity === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setCalcPurity(p.id)}
                          className={`py-1.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
                            active
                              ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/40 shadow-xs'
                              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Field 3: Quantity Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Quantity ({calcUnitObj.label})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={calcSimpleQty}
                  onChange={(e) => setCalcSimpleQty(e.target.value)}
                  placeholder="Enter quantity..."
                  className="w-full px-3.5 py-2 text-sm sm:text-base font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              {/* Field 4: Result Box (Light Green box matching Image 5) */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 text-center mt-2">
                <span className="block text-[11px] font-bold text-[#059669] uppercase tracking-wider">
                  Total Price
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#059669] my-0.5 tracking-tight">
                  {formatPrice(calcTotalLocal)} {config.currencyCode}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Rate: {formatPrice(calcRatePerUnit)} {config.currencyCode} / unit · Real-time Benchmark
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCalculatorOpen(false)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── SIMPLE AREA CHART COMPONENT (Inline SVG with Smooth Bezier & Gradient Fill) ──
interface ChartPoint {
  date: string;
  price: number;
}

interface SimpleAreaChartProps {
  data: ChartPoint[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  unitFactor: number;
  currencySymbol: string;
}

function SimpleAreaChart({ data, color, gradientFrom, gradientTo, unitFactor, currencySymbol }: SimpleAreaChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const uid = useId();
  const gradientId = `grad-${uid.replace(/:/g, '')}`;

  if (!data || data.length === 0) {
    return <div className="h-44 flex items-center justify-center text-xs text-gray-400">Loading historical trend...</div>;
  }

  const width = 500;
  const height = 175;
  const paddingLeft = 10;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const prices = data.map((d) => d.price * unitFactor);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + (1 - (d.price * unitFactor - minPrice) / priceRange) * chartHeight;
    return {
      x,
      y,
      price: d.price * unitFactor,
      date: d.date,
    };
  });

  // Generate smooth cubic bezier curve
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = (curr.x + next.x) / 2;
    pathD += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-36 sm:h-44 overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.45" />
            <stop offset="70%" stopColor={gradientTo} stopOpacity="0.10" />
            <stop offset="100%" stopColor={gradientTo} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Subtle horizontal grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = paddingTop + pct * chartHeight;
          return (
            <line
              key={i}
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          );
        })}

        {/* Gradient fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Spline curve stroke */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* X date labels */}
        {points.filter((_, idx) => idx % 6 === 0 || idx === points.length - 1).map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={height - 6}
            textAnchor="middle"
            className="text-[9px] fill-gray-400 font-sans"
          >
            {pt.date}
          </text>
        ))}

        {/* Hover detection regions */}
        {points.map((pt, idx) => (
          <rect
            key={idx}
            x={pt.x - chartWidth / points.length / 2}
            y={paddingTop}
            width={chartWidth / points.length}
            height={chartHeight}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoverIndex(idx)}
            onTouchStart={() => setHoverIndex(idx)}
          />
        ))}

        {hoverIndex !== null && (
          <g>
            <line
              x1={points[hoverIndex].x}
              y1={paddingTop}
              x2={points[hoverIndex].x}
              y2={paddingTop + chartHeight}
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle
              cx={points[hoverIndex].x}
              cy={points[hoverIndex].y}
              r="4.5"
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="3"
            />
          </g>
        )}
      </svg>

      {/* Hover Tooltip */}
      {hoverIndex !== null && (() => {
        const pt = points[hoverIndex];
        const isNearTop = pt.y < 56;
        const isNearRight = hoverIndex >= points.length - 4;
        const isNearLeft = hoverIndex <= 2;

        let xOffset = '-50%';
        if (isNearRight) {
          xOffset = '-95%';
        } else if (isNearLeft) {
          xOffset = '-5%';
        }

        const yOffset = isNearTop ? '12px' : 'calc(-100% - 10px)';

        return (
          <div
            className="absolute pointer-events-none z-30 bg-neutral-900/95 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5 transition-transform duration-75"
            style={{
              left: `${(pt.x / width) * 100}%`,
              top: `${(pt.y / height) * 100}%`,
              transform: `translate(${xOffset}, ${yOffset})`,
            }}
          >
            <span className="text-gray-300 font-normal">{pt.date}:</span>
            <span className="font-bold text-white">{currencySymbol} {pt.price.toFixed(2)}</span>
          </div>
        );
      })()}
    </div>
  );
}
