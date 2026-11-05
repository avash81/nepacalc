'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import { Coins, Scale, Calculator, X, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, MessageSquare, Heart, Send } from 'lucide-react';

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
  usdNprRate: number;
  published_at?: string;
}

interface Props {
  initialData: InternationalRatesData;
}

// Unit multipliers relative to 1 Troy Ounce (31.1034768 grams)
const UNIT_MULTIPLIERS: Record<string, { label: string; shortLabel: string; ozFactor: number }> = {
  tola: { label: 'Per Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  '10g': { label: 'Per 10 Grams', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
  oz: { label: 'Per Troy Ounce', shortLabel: 'Ounce', ozFactor: 1 },
  g: { label: 'Per Gram', shortLabel: 'Gram', ozFactor: 1 / 31.1034768 },
  kg: { label: 'Per Kilogram', shortLabel: 'Kilo', ozFactor: 1000 / 31.1034768 },
};

// Purities for Gold
const GOLD_PURITIES: Record<string, { name: string; purity: number; desc: string }> = {
  '24k': { name: '24K', purity: 0.999, desc: '99.9% Pure (Investment Bullion)' },
  '22k': { name: '22K', purity: 0.9167, desc: '91.6% (Hallmark Jewelry)' },
  '18k': { name: '18K', purity: 0.750, desc: '75.0% (Diamond & Fine Jewelry)' },
  '14k': { name: '14K', purity: 0.5833, desc: '58.3% (Popular US Jewelry)' },
  '10k': { name: '10K', purity: 0.4167, desc: '41.7% (Entry Fine Jewelry)' },
};

interface UserComment {
  id: string;
  author: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
  likes: number;
  liked?: boolean;
}

const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    author: 'Santosh Kumar Kushwaha',
    avatarColor: 'bg-amber-600',
    timeAgo: '4 days ago',
    text: 'What is the spot gold bid and ask spread in the USA market right now?',
    likes: 3,
  },
  {
    id: 'c2',
    author: 'Yubaraj Tiwari',
    avatarColor: 'bg-emerald-600',
    timeAgo: '5 days ago',
    text: 'Will US spot gold prices drop after the Federal Reserve interest rate announcement?',
    likes: 5,
  },
  {
    id: 'c3',
    author: 'Divang Pokharel',
    avatarColor: 'bg-blue-600',
    timeAgo: '13 weeks ago',
    text: 'Can anyone explain how 1 tola is converted from troy ounces in US dollars?',
    likes: 8,
  },
  {
    id: 'c4',
    author: 'AG FAMILY',
    avatarColor: 'bg-purple-600',
    timeAgo: '15 weeks ago',
    text: 'Please show 10 grams and 1 aana gold price in USA dollars with live exchange conversion.',
    likes: 12,
  },
];

export default function InternationalGoldClient({ initialData }: Props) {
  // Live dynamic state
  const [data, setData] = useState<InternationalRatesData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState<string>('Live (Auto-updating)');

  // Selected unit (Defaults to Tola & 10g as in Hamro Patro, with Ounce/Gram toggles)
  const [activeUnit, setActiveUnit] = useState<'tola' | '10g' | 'oz' | 'g' | 'kg'>('oz');
  const [currency, setCurrency] = useState<'USD' | 'NPR'>('USD');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Modal Calculator State (Mirroring Screenshot 4)
  const [calcMetal, setCalcMetal] = useState<'gold' | 'silver'>('gold');
  const [calcPurity, setCalcPurity] = useState<'24k' | '22k' | '18k' | '14k' | '10k'>('24k');
  const [calcUnitMode, setCalcUnitMode] = useState<'tola_lal' | 'tola' | '10g' | 'oz' | 'g'>('oz');
  const [calcTola, setCalcTola] = useState<string>('1');
  const [calcLal, setCalcLal] = useState<string>('0');
  const [calcSimpleQty, setCalcSimpleQty] = useState<string>('1');

  // Interactive Comments state (Mirroring Screenshot 2 & 3)
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentInputActive, setCommentInputActive] = useState(false);

  // Live Auto-Update Poller
  const fetchLiveRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [gRes, sRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);

      if (gRes?.price || sRes?.price) {
        setData((prev) => {
          const newGoldPrice = gRes?.price ? Math.round(gRes.price * 100) / 100 : prev.gold.spotUSD;
          const newSilverPrice = sRes?.price ? Math.round(sRes.price * 100) / 100 : prev.silver.spotUSD;

          const goldChange = Math.round((newGoldPrice - prev.gold.prevClose) * 100) / 100;
          const goldPercent = Math.round(((goldChange / prev.gold.prevClose) * 100) * 100) / 100;

          const silverChange = Math.round((newSilverPrice - prev.silver.prevClose) * 100) / 100;
          const silverPercent = Math.round(((silverChange / prev.silver.prevClose) * 100) * 100) / 100;

          const updatedGoldHistory = [...prev.history30d.gold];
          if (updatedGoldHistory.length > 0) {
            updatedGoldHistory[updatedGoldHistory.length - 1] = {
              ...updatedGoldHistory[updatedGoldHistory.length - 1],
              price: newGoldPrice,
            };
          }

          const updatedSilverHistory = [...prev.history30d.silver];
          if (updatedSilverHistory.length > 0) {
            updatedSilverHistory[updatedSilverHistory.length - 1] = {
              ...updatedSilverHistory[updatedSilverHistory.length - 1],
              price: newSilverPrice,
            };
          }

          return {
            ...prev,
            gold: {
              ...prev.gold,
              spotUSD: newGoldPrice,
              change24h: goldChange,
              changePercent24h: goldPercent,
              updatedAt: gRes?.updatedAt || new Date().toISOString(),
            },
            silver: {
              ...prev.silver,
              spotUSD: newSilverPrice,
              change24h: silverChange,
              changePercent24h: silverPercent,
              updatedAt: sRes?.updatedAt || new Date().toISOString(),
            },
            history30d: {
              gold: updatedGoldHistory,
              silver: updatedSilverHistory,
            },
          };
        });

        // Trigger subtle flash animation on price change
        setPriceFlash(true);
        setTimeout(() => setPriceFlash(false), 1200);

        const now = new Date();
        setLastRefreshedText(
          `${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} (Live)`
        );
      }
    } catch {
      // Keep state
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Poll every 30 seconds & on window focus
  useEffect(() => {
    fetchLiveRates();
    const intervalId = setInterval(fetchLiveRates, 30_000);
    const onFocus = () => fetchLiveRates();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchLiveRates]);

  const usdNprRate = data.usdNprRate || 151.93;
  const activeUnitInfo = UNIT_MULTIPLIERS[activeUnit];

  // Prices scaled to selected unit
  const goldPriceUSD = data.gold.spotUSD * activeUnitInfo.ozFactor;
  const goldDeltaUSD = data.gold.change24h * activeUnitInfo.ozFactor;

  const silverPriceUSD = data.silver.spotUSD * activeUnitInfo.ozFactor;
  const silverDeltaUSD = data.silver.change24h * activeUnitInfo.ozFactor;

  // Price formatter
  const formatPrice = (valUSD: number, inCurrency: 'USD' | 'NPR') => {
    if (inCurrency === 'NPR') {
      const valNPR = valUSD * usdNprRate;
      return `Rs ${Math.round(valNPR).toLocaleString('en-IN')}`;
    }
    return `$${valUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculator Modal Calculation
  const baseRateOz = calcMetal === 'gold' ? data.gold.spotUSD : data.silver.spotUSD;
  const purityFactor = calcMetal === 'gold' ? GOLD_PURITIES[calcPurity].purity : 0.999;

  let computedQtyInOz = 0;
  if (calcUnitMode === 'tola_lal') {
    const tolaVal = parseFloat(calcTola) || 0;
    const lalVal = parseFloat(calcLal) || 0;
    const totalTolas = tolaVal + lalVal / 100;
    computedQtyInOz = totalTolas * (11.6638 / 31.1034768);
  } else if (calcUnitMode === 'tola') {
    const tolaVal = parseFloat(calcSimpleQty) || 0;
    computedQtyInOz = tolaVal * (11.6638 / 31.1034768);
  } else if (calcUnitMode === '10g') {
    const tensVal = parseFloat(calcSimpleQty) || 0;
    computedQtyInOz = tensVal * (10 / 31.1034768);
  } else if (calcUnitMode === 'oz') {
    const ozVal = parseFloat(calcSimpleQty) || 0;
    computedQtyInOz = ozVal;
  } else if (calcUnitMode === 'g') {
    const gVal = parseFloat(calcSimpleQty) || 0;
    computedQtyInOz = gVal / 31.1034768;
  }

  const calcTotalUSD = computedQtyInOz * baseRateOz * purityFactor;
  const calcTotalNPR = calcTotalUSD * usdNprRate;

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newEntry: UserComment = {
      id: `c_${Date.now()}`,
      author: 'Guest Visitor',
      avatarColor: 'bg-red-600',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
      likes: 0,
    };

    setComments([newEntry, ...comments]);
    setNewCommentText('');
    setCommentInputActive(false);
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const liked = !c.liked;
          return { ...c, liked, likes: liked ? c.likes + 1 : c.likes - 1 };
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 font-sans">

      {/* ── TOP SECTION HEADER (Exact Hamro Patro Layout from Screenshot 1 & 5) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Today&apos;s Gold &amp; Silver Price
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Per tola, 10 grams &amp; troy ounce (USA Spot Market Benchmark)
          </p>
        </div>

        {/* Right Toolbar: Unit Switcher + Calculate Button + Live Status */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          
          {/* Unit Toggle Pill (Matching Hamro Patro [Tola] [10 g] + US [Ounce] [Gram]) */}
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 shadow-inner">
            {(['oz', 'tola', '10g', 'g'] as const).map((u) => {
              const labels: Record<string, string> = {
                oz: 'Ounce',
                tola: 'Tola',
                '10g': '10 g',
                g: 'Gram',
              };
              const active = activeUnit === u;
              return (
                <button
                  key={u}
                  onClick={() => setActiveUnit(u)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150 ${
                    active
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                  }`}
                >
                  {labels[u]}
                </button>
              );
            })}
          </div>

          {/* Currency Toggle Pills */}
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setCurrency('USD')}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-full transition ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('NPR')}
              className={`text-xs font-bold px-2.5 py-1.5 rounded-full transition ${
                currency === 'NPR'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              NPR (Rs)
            </button>
          </div>

          {/* Red Calculate CTA Button (Exact Match of Screenshot 1 & 5) */}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition active:scale-95"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate</span>
          </button>

          {/* Live Indicator & Force Refresh Trigger */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap pl-1">
            <span>Last updated: {lastRefreshedText}</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            <button
              onClick={fetchLiveRates}
              disabled={isRefreshing}
              title="Refresh live prices"
              className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* ── DUAL HERO PRICE CARDS (Exact 2-Column Grid from Screenshot 1 & 5) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* GOLD CARD */}
        <div className={`bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 hover:shadow-md transition-all duration-300 ${priceFlash ? 'ring-2 ring-amber-400/80 bg-amber-50/20' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">Gold (Hallmark / Spot 24K)</h2>
                <span className="text-xs text-gray-500">{activeUnitInfo.label}</span>
              </div>
            </div>
            
            <div
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
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
              {formatPrice(goldPriceUSD, currency)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.gold.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.gold.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(goldDeltaUSD), currency)}
              </span>
              {currency === 'USD' && (
                <span className="text-gray-400">· (≈ Rs {Math.round(goldPriceUSD * usdNprRate).toLocaleString('en-IN')})</span>
              )}
            </div>
          </div>

          {/* 30-Day Trend Area Chart (Amber Gradient) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1 font-medium text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> 30-day trend
              </span>
              <span className="text-[11px] text-gray-400">COMEX/LBMA Spot</span>
            </div>
            <SimpleAreaChart 
              data={data.history30d.gold} 
              color="#EAB308" 
              gradientFrom="#EAB308" 
              gradientTo="#FEF08A" 
              unitFactor={activeUnitInfo.ozFactor}
              currency={currency}
              usdNprRate={usdNprRate}
            />
          </div>
        </div>

        {/* SILVER CARD */}
        <div className={`bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 hover:shadow-md transition-all duration-300 ${priceFlash ? 'ring-2 ring-red-400/80 bg-red-50/20' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">Silver (.999 Fine)</h2>
                <span className="text-xs text-gray-500">{activeUnitInfo.label}</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
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
              {formatPrice(silverPriceUSD, currency)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.silver.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.silver.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(silverDeltaUSD), currency)}
              </span>
              {currency === 'USD' && (
                <span className="text-gray-400">· (≈ Rs {Math.round(silverPriceUSD * usdNprRate).toLocaleString('en-IN')})</span>
              )}
            </div>
          </div>

          {/* 30-Day Trend Area Chart (Crimson Red Gradient matching Screenshot 1 & 5) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1 font-medium text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 text-red-500" /> 30-day trend
              </span>
              <span className="text-[11px] text-gray-400">Global Spot</span>
            </div>
            <SimpleAreaChart 
              data={data.history30d.silver} 
              color="#DC2626" 
              gradientFrom="#DC2626" 
              gradientTo="#FCA5A5" 
              unitFactor={activeUnitInfo.ozFactor}
              currency={currency}
              usdNprRate={usdNprRate}
            />
          </div>
        </div>

      </div>

      {/* ── EXPLANATORY OVERVIEW (Matching Screenshot 2 Section) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">USA Gold &amp; Silver Price</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Stay updated on the daily price of gold (Fine gold 24K, Hallmark 22K, 18K, and 14K) and silver stated with the daily fluctuation in price. These prices are updated continuously in real time based on US spot market benchmarks (COMEX New York &amp; LBMA London). Gold and silver prices for today are available for troy ounce, gram, 10 grams, tola, and kilogram, calculated in US Dollars and converted to Nepali Rupees at official exchange rates.
        </p>
      </div>

      {/* ── SPOT PRICE MATRIX TABLE (Purities × Weights in USD & NPR) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Spot Gold &amp; Silver Price Table by Weight &amp; Karat</h3>
            <p className="text-xs text-gray-500">Wholesale bullion rates in US Dollars (USD) and converted Nepali Rupees (NPR)</p>
          </div>
          <div className="inline-flex text-xs font-semibold bg-gray-100 p-1 rounded-lg">
            <span className="px-2 py-1 bg-white text-gray-900 rounded shadow-xs font-bold">1 USD = Rs {usdNprRate.toFixed(2)}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/70">
                <th className="py-3 px-3">Karat / Purity</th>
                <th className="py-3 px-3">1 Troy Ounce</th>
                <th className="py-3 px-3">1 Gram</th>
                <th className="py-3 px-3">10 Grams</th>
                <th className="py-3 px-3">1 Tola (11.66g)</th>
                <th className="py-3 px-3">1 Kilogram</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {(Object.keys(GOLD_PURITIES) as (keyof typeof GOLD_PURITIES)[]).map((k) => {
                const item = GOLD_PURITIES[k];
                const ozRateUSD = data.gold.spotUSD * item.purity;
                return (
                  <tr key={k} className="hover:bg-amber-50/30 transition">
                    <td className="py-3 px-3 font-bold text-gray-900 flex flex-col">
                      <span>Gold {item.name}</span>
                      <span className="text-[11px] font-normal text-gray-400">{item.desc}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      <div>${ozRateUSD.toFixed(2)}</div>
                      <div className="text-[11px] text-gray-400">Rs {Math.round(ozRateUSD * usdNprRate).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      <div>${(ozRateUSD / 31.1034768).toFixed(2)}</div>
                      <div className="text-[11px] text-gray-400">Rs {Math.round((ozRateUSD / 31.1034768) * usdNprRate).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-800 font-medium">
                      <div>${((ozRateUSD / 31.1034768) * 10).toFixed(2)}</div>
                      <div className="text-[11px] text-gray-400">Rs {Math.round(((ozRateUSD / 31.1034768) * 10) * usdNprRate).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-800 font-semibold text-amber-700">
                      <div>${((ozRateUSD / 31.1034768) * 11.6638).toFixed(2)}</div>
                      <div className="text-[11px] text-gray-400">Rs {Math.round(((ozRateUSD / 31.1034768) * 11.6638) * usdNprRate).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-800">
                      <div>${((ozRateUSD / 31.1034768) * 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                      <div className="text-[11px] text-gray-400">Rs {Math.round(((ozRateUSD / 31.1034768) * 1000) * usdNprRate).toLocaleString('en-IN')}</div>
                    </td>
                  </tr>
                );
              })}
              {/* Silver Row */}
              <tr className="hover:bg-slate-50 transition bg-slate-50/40">
                <td className="py-3 px-3 font-bold text-gray-900 flex flex-col">
                  <span>Silver (.999 Fine)</span>
                  <span className="text-[11px] font-normal text-gray-400">Pure Bullion</span>
                </td>
                <td className="py-3 px-3 font-semibold text-gray-900">
                  <div>${data.silver.spotUSD.toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400">Rs {Math.round(data.silver.spotUSD * usdNprRate).toLocaleString('en-IN')}</div>
                </td>
                <td className="py-3 px-3 text-gray-800">
                  <div>${(data.silver.spotUSD / 31.1034768).toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400">Rs {Math.round((data.silver.spotUSD / 31.1034768) * usdNprRate).toLocaleString('en-IN')}</div>
                </td>
                <td className="py-3 px-3 text-gray-800">
                  <div>${((data.silver.spotUSD / 31.1034768) * 10).toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400">Rs {Math.round(((data.silver.spotUSD / 31.1034768) * 10) * usdNprRate).toLocaleString('en-IN')}</div>
                </td>
                <td className="py-3 px-3 text-gray-800 font-semibold text-slate-700">
                  <div>${((data.silver.spotUSD / 31.1034768) * 11.6638).toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400">Rs {Math.round(((data.silver.spotUSD / 31.1034768) * 11.6638) * usdNprRate).toLocaleString('en-IN')}</div>
                </td>
                <td className="py-3 px-3 text-gray-800">
                  <div>${((data.silver.spotUSD / 31.1034768) * 1000).toFixed(2)}</div>
                  <div className="text-[11px] text-gray-400">Rs {Math.round(((data.silver.spotUSD / 31.1034768) * 1000) * usdNprRate).toLocaleString('en-IN')}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── COMMENTS SECTION (Exact Hamro Patro Structure from Screenshot 2 & 3) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-red-600" />
          Comments
        </h3>

        {/* Comment Input Box (Red Outline on Active/Focus) */}
        <div className="mb-6">
          {!commentInputActive ? (
            <div
              onClick={() => setCommentInputActive(true)}
              className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-full border border-gray-300 hover:border-red-500 text-gray-500 text-sm transition"
            >
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                ?
              </div>
              <span>Sign in to write a comment...</span>
            </div>
          ) : (
            <form onSubmit={handleAddComment} className="border-2 border-[#B91C1C] rounded-2xl p-4 transition shadow-xs">
              <textarea
                autoFocus
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your question or comment about US gold & silver prices..."
                className="w-full text-sm text-gray-900 border-none focus:outline-none resize-none placeholder-gray-400"
              />
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">Posting as Guest</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCommentInputActive(false);
                      setNewCommentText('');
                    }}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-full disabled:opacity-50 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* List of Comments */}
        <div className="space-y-4 divide-y divide-gray-100">
          {comments.map((comment) => (
            <div key={comment.id} className="pt-4 first:pt-0">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full ${comment.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium transition ${
                        comment.liked ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${comment.liked ? 'fill-red-600 text-red-600' : ''}`} />
                      <span>{comment.likes > 0 ? `${comment.likes} Like${comment.likes > 1 ? 's' : ''}` : 'Reply'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "More Comments" Button (Exact Match of Screenshot 3) */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-xs"
          >
            More comments
          </button>
        </div>
      </div>

      {/* ── PRICE CALCULATOR POPUP MODAL (Exact Copy-Paste of Screenshot 4) ── */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Price Calculator
              </h3>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Field 1: Metal (Exact Red-Outlined Toggle from Screenshot 4) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Metal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcMetal('gold')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm transition font-bold ${
                      calcMetal === 'gold'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-white shadow-xs'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Coins className="w-4 h-4 text-[#B91C1C]" />
                    <span>Gold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMetal('silver')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm transition font-bold ${
                      calcMetal === 'silver'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-white shadow-xs'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-slate-500" />
                    <span>Silver</span>
                  </button>
                </div>
              </div>

              {/* Field 2: Unit (Exact Radios: Tola+Lal, Tola, 10g, Ounce, Gram) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Unit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tola_lal', label: 'Tola + Lal' },
                    { id: 'tola', label: 'Tola' },
                    { id: '10g', label: '10 grams' },
                    { id: 'oz', label: 'Troy Ounce' },
                    { id: 'g', label: 'Grams' },
                  ].map((u) => {
                    const active = calcUnitMode === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setCalcUnitMode(u.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center ${
                          active
                            ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-white shadow-xs'
                            : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {u.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 2b: Purity (When Gold is Selected) */}
              {calcMetal === 'gold' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Purity / Karat
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(Object.keys(GOLD_PURITIES) as (keyof typeof GOLD_PURITIES)[]).map((k) => {
                      const active = calcPurity === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setCalcPurity(k as any)}
                          className={`py-1.5 px-1 rounded-lg text-xs font-bold transition text-center ${
                            active
                              ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/40'
                              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {GOLD_PURITIES[k].name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Field 3: Quantity Input (Screenshot 4: Tola + Lal side-by-side or Single Qty) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Quantity
                </label>
                {calcUnitMode === 'tola_lal' ? (
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] text-gray-400 mb-1">Tola</span>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={calcTola}
                          onChange={(e) => setCalcTola(e.target.value)}
                          className="w-full px-3 py-2 text-base font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] text-gray-400 mb-1">Lal (0-99)</span>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          step="any"
                          value={calcLal}
                          onChange={(e) => setCalcLal(e.target.value)}
                          className="w-full px-3 py-2 text-base font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                    </div>
                    <span className="block text-[11px] text-gray-400 mt-1">e.g. 2 Tola 5 Lal</span>
                  </div>
                ) : (
                  <div>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={calcSimpleQty}
                      onChange={(e) => setCalcSimpleQty(e.target.value)}
                      placeholder="Enter quantity..."
                      className="w-full px-4 py-2.5 text-base font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                    />
                    <span className="block text-[11px] text-gray-400 mt-1">e.g. 1, 2.5, 10</span>
                  </div>
                )}
              </div>

              {/* Field 4: Result Box (Exact Mint Green Container from Screenshot 4) */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 text-center mt-3">
                <span className="block text-xs font-bold text-[#059669] uppercase tracking-wider">
                  Total Price
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] my-1 tracking-tight">
                  ${calcTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm font-bold text-gray-700">
                  ≈ Rs {Math.round(calcTotalNPR).toLocaleString('en-IN')} NPR
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Rate: ${(baseRateOz * (calcUnitMode === 'tola_lal' || calcUnitMode === 'tola' ? 11.6638 / 31.1034768 : calcUnitMode === '10g' ? 10 / 31.1034768 : calcUnitMode === 'g' ? 1 / 31.1034768 : 1) * purityFactor).toFixed(2)} / unit · (1 USD = Rs {usdNprRate.toFixed(2)})
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCalculatorOpen(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
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

// ── SVG SPLINE AREA CHART (Exact Visual Match to Hamro Patro 30-Day Trend) ──
interface ChartProps {
  data: { date: string; price: number }[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  unitFactor: number;
  currency: 'USD' | 'NPR';
  usdNprRate: number;
}

function SimpleAreaChart({ data, color, gradientFrom, unitFactor, currency, usdNprRate }: ChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const scaledData = data.map((d) => {
    const pUSD = d.price * unitFactor;
    const finalPrice = currency === 'NPR' ? pUSD * usdNprRate : pUSD;
    return { ...d, displayPrice: finalPrice };
  });

  const prices = scaledData.map((d) => d.displayPrice);
  const min = Math.min(...prices) * 0.985;
  const max = Math.max(...prices) * 1.015;

  const width = 480;
  const height = 150;
  const paddingLeft = 45;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = scaledData.map((d, i) => {
    const x = paddingLeft + (i / (scaledData.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.displayPrice - min) / (max - min)) * chartHeight;
    return { x, y, ...d };
  });

  // Construct smooth bezier curve
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${paddingTop + chartHeight} L ${points[0].x},${paddingTop + chartHeight} Z`;

  const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = min + pct * (max - min);
    const y = paddingTop + chartHeight - pct * chartHeight;
    return { val, y };
  });

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.28} />
            <stop offset="100%" stopColor={gradientFrom} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Dotted Grid lines & Y tick numbers */}
        {yTicks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={paddingLeft}
              y1={t.y}
              x2={width - paddingRight}
              y2={t.y}
              stroke="#F3F4F6"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 6}
              y={t.y + 3.5}
              textAnchor="end"
              className="text-[9px] fill-gray-400 font-sans font-medium"
            >
              {currency === 'NPR'
                ? Math.round(t.val).toLocaleString('en-IN')
                : `$${t.val < 100 ? t.val.toFixed(1) : Math.round(t.val)}`}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Spline curve stroke */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* X date labels */}
        {points.filter((_, idx) => idx % 3 === 0 || idx === points.length - 1).map((pt, i) => (
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

        {/* Hover detection */}
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
      {hoverIndex !== null && (
        <div
          className="absolute pointer-events-none bg-neutral-900 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-full transition-all"
          style={{
            left: `${(points[hoverIndex].x / width) * 100}%`,
            top: `${(points[hoverIndex].y / height) * 100 - 8}%`,
          }}
        >
          <span>
            {points[hoverIndex].date}: {currency === 'NPR' ? `Rs ${Math.round(points[hoverIndex].displayPrice).toLocaleString('en-IN')}` : `$${points[hoverIndex].displayPrice.toFixed(2)}`}
          </span>
        </div>
      )}
    </div>
  );
}
