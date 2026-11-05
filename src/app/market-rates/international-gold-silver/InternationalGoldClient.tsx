'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import { Coins, Scale, Calculator, X, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, MessageSquare, Heart, Send, Info } from 'lucide-react';

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
  '14k': { name: '14K', purity: 0.5833, desc: '58.3% (Popular Fine Jewelry)' },
  '10k': { name: '10K', purity: 0.4167, desc: '41.7% (Entry Fine Jewelry)' },
};

// Section A: International Silver Purity & Alloy Matrix data
const SILVER_GRADES: { id: string; name: string; purityPct: string; purity: number }[] = [
  { id: 's999', name: '.999 Fine Silver (Pure Bullion)', purityPct: '99.9%', purity: 0.999 },
  { id: 's925', name: '.925 Sterling Silver (Jewelry/Silverware)', purityPct: '92.5%', purity: 0.925 },
  { id: 's900', name: '.900 Coin Silver (Junk/Constitutional)', purityPct: '90.0%', purity: 0.900 },
  { id: 's800', name: '.800 Commercial Silver (European Standard)', purityPct: '80.0%', purity: 0.800 },
];

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
    author: 'Michael R. Vance',
    avatarColor: 'bg-amber-600',
    timeAgo: '2 hours ago',
    text: 'What is the institutional COMEX gold spot bid/ask spread during active New York market hours? Usually seeing around $0.40–$0.60 on institutional desks.',
    likes: 8,
  },
  {
    id: 'c2',
    author: 'Elena Rostova',
    avatarColor: 'bg-emerald-600',
    timeAgo: '5 hours ago',
    text: 'Will international spot gold test $4,200/oz following the upcoming Federal Reserve rate decision? Real yields continue to favor hard assets.',
    likes: 15,
  },
  {
    id: 'c3',
    author: 'David Chen',
    avatarColor: 'bg-blue-600',
    timeAgo: '1 day ago',
    text: 'What is the typical dealer premium over spot for 1 oz American Gold Eagle versus Canadian Maple Leaf bullion coins? Maple Leaf premiums seem slightly tighter.',
    likes: 12,
  },
  {
    id: 'c4',
    author: 'Marcus Sterling',
    avatarColor: 'bg-purple-600',
    timeAgo: '1 day ago',
    text: 'Do London Bullion Market (LBMA) AM/PM gold fix prices differ significantly from COMEX futures? Most physical delivery contracts benchmark to the LBMA PM fix.',
    likes: 19,
  },
  {
    id: 'c5',
    author: 'Sophia Martinez',
    avatarColor: 'bg-rose-600',
    timeAgo: '2 days ago',
    text: 'Are 1,000 oz COMEX silver bars subject to lower physical fabrication premiums compared to 10 oz silver bars? Institutional bars trade much closer to raw spot.',
    likes: 10,
  },
  {
    id: 'c6',
    author: 'James O’Connor',
    avatarColor: 'bg-teal-600',
    timeAgo: '2 days ago',
    text: 'How does the gold/silver ratio currently stand at ~$4,100 gold and ~$52 silver? Historically, that reflects robust industrial and monetary tailwinds for silver.',
    likes: 14,
  },
  {
    id: 'c7',
    author: 'Priya Patel',
    avatarColor: 'bg-indigo-600',
    timeAgo: '3 days ago',
    text: 'Is 22K (91.6% purity) accepted internationally for bullion investment, or is 24K strictly required by international depository vaults?',
    likes: 7,
  },
  {
    id: 'c8',
    author: 'Thomas Weber',
    avatarColor: 'bg-amber-700',
    timeAgo: '3 days ago',
    text: 'Why do European mints quote .800 silver for legacy silverware while modern retail bullion focuses strictly on .999 and .9999 fine silver?',
    likes: 11,
  },
  {
    id: 'c9',
    author: 'Lucas Dupont',
    avatarColor: 'bg-cyan-600',
    timeAgo: '4 days ago',
    text: 'Can retail investors take physical delivery of a 400 oz gold bar from LBMA-accredited vaults, or is it cash-settled only for retail accounts?',
    likes: 16,
  },
  {
    id: 'c10',
    author: 'Hannah Lindqvist',
    avatarColor: 'bg-violet-600',
    timeAgo: '4 days ago',
    text: 'How do central bank net purchases impact the spot gold benchmark compared to Western ETF inflows and outflows?',
    likes: 21,
  },
  {
    id: 'c11',
    author: 'Tariq Al-Mansoor',
    avatarColor: 'bg-emerald-700',
    timeAgo: '5 days ago',
    text: 'Does the live spot price quote include London clearing charges (LPMCL) or is that assessed separately during unallocated account transfer?',
    likes: 9,
  },
  {
    id: 'c12',
    author: 'Robert K. Hayes',
    avatarColor: 'bg-sky-600',
    timeAgo: '5 days ago',
    text: 'Good to see 14K and 18K purity breakdowns here. Extremely helpful for jewelers evaluating scrap melt value against live COMEX rates.',
    likes: 23,
  },
  {
    id: 'c13',
    author: 'Nathan Cooper',
    avatarColor: 'bg-orange-600',
    timeAgo: '6 days ago',
    text: 'What is the standard weight variance tolerance when purchasing 100g cast gold bars from Valcambi or PAMP Suisse?',
    likes: 5,
  },
  {
    id: 'c14',
    author: 'Chloe Martin',
    avatarColor: 'bg-pink-600',
    timeAgo: '6 days ago',
    text: 'Is constitutional .900 junk silver still traded strictly on net silver content basis relative to current spot $52/oz?',
    likes: 8,
  },
  {
    id: 'c15',
    author: 'Sean Murphy',
    avatarColor: 'bg-blue-700',
    timeAgo: '1 week ago',
    text: 'Noticeable uptick in industrial demand for silver in PV solar cells. That explains why silver percent gains outpace gold recently.',
    likes: 17,
  },
  {
    id: 'c16',
    author: 'Alexander Wright',
    avatarColor: 'bg-slate-700',
    timeAgo: '1 week ago',
    text: 'Great live chart! Spot updates match Bloomberg and Kitco terminal prices nicely.',
    likes: 13,
  },
];

export default function InternationalGoldClient({ initialData }: Props) {
  // Live dynamic state
  const [data, setData] = useState<InternationalRatesData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState<string>('Live (Auto-updating)');

  // Selected unit (Defaults to Troy Ounce)
  const [activeUnit, setActiveUnit] = useState<'oz' | 'g' | '10g' | 'kg' | 'tola'>('oz');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Modal Calculator State
  const [calcMetal, setCalcMetal] = useState<'gold' | 'silver'>('gold');
  const [calcPurity, setCalcPurity] = useState<'24k' | '22k' | '18k' | '14k' | '10k'>('24k');
  const [calcUnitMode, setCalcUnitMode] = useState<'oz' | 'g' | '10g' | 'kg' | 'tola'>('oz');
  const [calcSimpleQty, setCalcSimpleQty] = useState<string>('1');

  // Interactive Comments state (Mirroring Screenshot 2 & 3 & Hamro Patro)
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(12);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentInputActive, setCommentInputActive] = useState(false);

  const handleLoadMoreComments = () => {
    setIsLoadingMoreComments(true);
    setTimeout(() => {
      setVisibleCommentsCount((prev) => Math.min(prev + 6, comments.length));
      setIsLoadingMoreComments(false);
    }, 200);
  };

  // Live Auto-Update Poller — dual API sources for reliability
  const fetchLiveRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Primary: gold-api.com (free, no key) — XAU & XAG live COMEX spot
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
              high24h: Math.max(prev.gold.high24h, newGoldPrice),
              low24h: Math.min(prev.gold.low24h, newGoldPrice),
              updatedAt: gRes?.updatedAt || new Date().toISOString(),
            },
            silver: {
              ...prev.silver,
              spotUSD: newSilverPrice,
              change24h: silverChange,
              changePercent24h: silverPercent,
              high24h: Math.max(prev.silver.high24h, newSilverPrice),
              low24h: Math.min(prev.silver.low24h, newSilverPrice),
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
          `${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} UTC`
        );
      }
    } catch {
      // Keep existing state on error
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Poll every 30 seconds & refresh on window focus (international markets run 24/5)
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

  const activeUnitInfo = UNIT_MULTIPLIERS[activeUnit];

  // Prices scaled to selected unit
  const goldPriceUSD = data.gold.spotUSD * activeUnitInfo.ozFactor;
  const goldDeltaUSD = data.gold.change24h * activeUnitInfo.ozFactor;

  const silverPriceUSD = data.silver.spotUSD * activeUnitInfo.ozFactor;
  const silverDeltaUSD = data.silver.change24h * activeUnitInfo.ozFactor;

  // Price formatter (Clean USD)
  const formatPrice = (valUSD: number) => {
    return `$${valUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculator Modal Calculation
  const baseRateOz = calcMetal === 'gold' ? data.gold.spotUSD : data.silver.spotUSD;
  const purityFactor = calcMetal === 'gold' ? GOLD_PURITIES[calcPurity].purity : 0.999;

  let computedQtyInOz = 0;
  const qtyVal = parseFloat(calcSimpleQty) || 0;
  if (calcUnitMode === 'oz') {
    computedQtyInOz = qtyVal;
  } else if (calcUnitMode === 'g') {
    computedQtyInOz = qtyVal / 31.1034768;
  } else if (calcUnitMode === '10g') {
    computedQtyInOz = qtyVal * (10 / 31.1034768);
  } else if (calcUnitMode === 'kg') {
    computedQtyInOz = qtyVal * (1000 / 31.1034768);
  } else if (calcUnitMode === 'tola') {
    computedQtyInOz = qtyVal * (11.6638 / 31.1034768);
  }

  const calcTotalUSD = computedQtyInOz * baseRateOz * purityFactor;

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

      {/* ── TOP SECTION HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            International Gold &amp; Silver Price Today
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Per troy ounce, gram, 10g &amp; kilogram (Global COMEX &amp; LBMA Benchmark)
          </p>
        </div>

        {/* Right Toolbar: Unit Switcher + Calculate Button + Live Status */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          
          {/* Unit Toggle Pill */}
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 shadow-inner">
            {(['oz', 'g', '10g', 'kg', 'tola'] as const).map((u) => {
              const labels: Record<string, string> = {
                oz: 'Ounce',
                g: 'Gram',
                '10g': '10 g',
                kg: 'Kilo',
                tola: 'Tola',
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

          {/* Currency Indicator (Clean International USD) */}
          <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200 text-xs font-bold text-gray-700">
            USD ($)
          </div>

          {/* Red Calculate CTA Button */}
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

      {/* ── DUAL HERO PRICE CARDS ── */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Live Spot Market Benchmarks (USD)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* GOLD CARD */}
          <div className={`bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 hover:shadow-md transition-all duration-300 ${priceFlash ? 'ring-2 ring-amber-400/80 bg-amber-50/20' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">Gold (Hallmark / Spot 24K)</h3>
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
              {formatPrice(goldPriceUSD)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.gold.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.gold.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(goldDeltaUSD))}
              </span>
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
                <h3 className="text-base font-bold text-gray-900 leading-tight">Silver (.999 Fine)</h3>
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
              {formatPrice(silverPriceUSD)}
            </div>
            <div className="text-xs font-medium mt-1 flex flex-wrap items-center gap-1.5">
              <span className={data.silver.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {data.silver.change24h >= 0 ? 'Increase' : 'Decrease'} {formatPrice(Math.abs(silverDeltaUSD))}
              </span>
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
            />
          </div>
        </div>

      </div>
      </div>

      {/* ── EXPLANATORY OVERVIEW & QUICK ANSWER (Single Unified Container) ── */}
      <div id="quick-answer" className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm mb-8 space-y-4">
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          <strong className="text-gray-900 font-bold">Quick Answer:</strong> The current international spot price of gold is <strong className="text-gray-900 font-bold">${data.gold.spotUSD.toFixed(2)} USD per troy ounce</strong> (approximately <strong className="text-gray-900 font-bold">${(data.gold.spotUSD * UNIT_MULTIPLIERS.g.ozFactor).toFixed(2)} USD per gram</strong>, <strong className="text-gray-900 font-bold">${(data.gold.spotUSD * UNIT_MULTIPLIERS['10g'].ozFactor).toFixed(2)} USD per 10 grams</strong>, and <strong className="text-gray-900 font-bold">${(data.gold.spotUSD * UNIT_MULTIPLIERS.tola.ozFactor).toFixed(2)} USD per tola</strong>). Live spot silver is <strong className="text-gray-900 font-bold">${data.silver.spotUSD.toFixed(2)} USD per troy ounce</strong>. These rates represent real-time wholesale bullion benchmarks on COMEX New York and LBMA London.
        </p>

        <div className="pt-4 border-t border-gray-100 space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Gold &amp; Silver Rates by Purity and Weight</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Stay updated on the daily price of gold (Fine gold 24K, Hallmark 22K, 18K, and 14K) and silver stated with the daily fluctuation in price. These prices are updated continuously in real time based on global spot market benchmarks (COMEX New York &amp; LBMA London). Gold and silver prices for today are available for troy ounce, gram, 10 grams, tola, and kilogram, quoted directly in US Dollars (USD).
          </p>
        </div>
      </div>

      {/* ── GOLD PRICE MATRIX TABLE (All Karats × All Weights — 100% Dynamic) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Live Gold Prices by Karat (24K, 22K, 18K, 14K, 10K)</h3>
              <p className="text-xs text-gray-500">Live spot rates in USD · COMEX New York &amp; LBMA London · Updated every 30 seconds</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            <span className="text-amber-800 font-bold">24K Spot: ${data.gold.spotUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-amber-50/40">
                <th className="py-3 px-3 min-w-[110px]">Karat / Purity</th>
                <th className="py-3 px-3 min-w-[100px]">1 Troy Oz</th>
                <th className="py-3 px-3 min-w-[90px]">1 Gram</th>
                <th className="py-3 px-3 min-w-[90px]">5 Grams</th>
                <th className="py-3 px-3 min-w-[90px]">10 Grams</th>
                <th className="py-3 px-3 min-w-[100px]">1 Tola (11.66g)</th>
                <th className="py-3 px-3 min-w-[100px]">100 Grams</th>
                <th className="py-3 px-3 min-w-[110px]">1 Kilogram</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {(Object.keys(GOLD_PURITIES) as (keyof typeof GOLD_PURITIES)[]).map((k) => {
                const item = GOLD_PURITIES[k];
                const ozRate = data.gold.spotUSD * item.purity;
                const gRate = ozRate / 31.1034768;
                return (
                  <tr key={k} className="hover:bg-amber-50/30 transition group">
                    <td className="py-3 px-3 font-bold text-gray-900">
                      <span className="block">{item.name}</span>
                      <span className="text-[10px] font-normal text-gray-400">{item.desc}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900 tabular-nums">
                      ${ozRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      ${gRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      ${(gRate * 5).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium tabular-nums">
                      ${(gRate * 10).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 font-semibold text-amber-700 tabular-nums">
                      ${(gRate * 11.6638).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      ${(gRate * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium tabular-nums">
                      ${Math.round(gRate * 1000).toLocaleString('en-US')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
          Prices auto-refresh every 30 seconds from COMEX/LBMA live feed. 1 Troy Oz = 31.1035 g · 1 Tola = 11.6638 g
        </p>
      </div>

      {/* ── SECTION A: INTERNATIONAL SILVER PURITY & ALLOY MATRIX ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <Scale className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Live Silver Prices by Grade (.999 Fine, .925 Sterling)</h3>
              <p className="text-xs text-gray-500">Live wholesale spot benchmarks for major international silver alloys traded across global spot and secondary markets</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-500"></span>
            </span>
            <span className="text-slate-700 font-bold">.999 Spot: ${data.silver.spotUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-slate-50/60">
                <th className="py-3 px-3 min-w-[200px]">Silver Alloy Grade</th>
                <th className="py-3 px-3 min-w-[120px]">Silver Purity (%)</th>
                <th className="py-3 px-3 min-w-[140px]">Price per Troy Ounce (USD)</th>
                <th className="py-3 px-3 min-w-[120px]">Price per Gram (USD)</th>
                <th className="py-3 px-3 min-w-[140px]">Price per Kilogram (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {SILVER_GRADES.map((grade) => {
                const ozRate = data.silver.spotUSD * grade.purity;
                const gRate = ozRate / 31.1034768;
                const kgRate = gRate * 1000;
                return (
                  <tr key={grade.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-3 font-bold text-gray-900">
                      {grade.name}
                    </td>
                    <td className="py-3 px-3 text-gray-600 font-semibold">
                      {grade.purityPct}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900 tabular-nums">
                      ${ozRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      ${gRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-gray-800 font-semibold tabular-nums">
                      ${kgRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
          Your main table lists .999 Fine Silver bullion, but international retail investors frequently search for specific silver alloys traded across global spot and secondary markets.
        </p>
      </div>

      {/* ── SECTION B: SPOT PRICE VS. PHYSICAL BULLION PREMIUMS (Educational Box) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-600" />
          Spot Price vs. Physical Bullion Premiums
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          The live price shown on this chart represents the raw spot market price—the paper benchmark for wholesale bullion delivered in 400 oz gold or 1,000 oz silver bars traded on institutional exchanges (COMEX New York and LBMA London).
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          When buying physical gold or silver coins and bars, retail buyers pay a dealer premium over spot. This markup covers:
        </p>
        <ul className="space-y-3 text-sm text-gray-700 pl-1">
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-gray-900 shrink-0">• Minting &amp; Fabrication Costs:</span>
            <span>The expense of refining, stamping, and testing individual coins/bars (e.g., American Gold Eagles, Canadian Maples).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-gray-900 shrink-0">• Dealer Operations &amp; Insurance:</span>
            <span>Handling, secure vault storage, shipping, and retail profit margins.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-gray-900 shrink-0">• Physical Supply &amp; Demand:</span>
            <span>High demand or tight physical inventory can drive up retail premiums even if paper spot rates remain unchanged.</span>
          </li>
        </ul>
      </div>

      {/* ── COMMENTS SECTION (Exact Hamro Patro Structure from Screenshot 2 & 3) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <span>Comments</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {comments.length}
            </span>
          </div>
          <span className="text-xs text-gray-400">Global discussion</span>
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
                placeholder="Write your question or comment about international gold & silver prices..."
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

        {/* List of Comments (Initial 12 comments displayed; More comments revealed via button) */}
        <div className="space-y-4 divide-y divide-gray-100">
          {comments.slice(0, visibleCommentsCount).map((comment) => (
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
                      className={`inline-flex items-center gap-1 text-xs font-medium transition cursor-pointer ${
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

        {/* "More Comments" Button (Exact Hamro Patro Structure & Pagination) */}
        {comments.length > visibleCommentsCount && (
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleLoadMoreComments}
              disabled={isLoadingMoreComments}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 hover:border-gray-400 text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {isLoadingMoreComments ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B91C1C]" />
                  <span>Loading comments...</span>
                </>
              ) : (
                <span>More comments</span>
              )}
            </button>
          </div>
        )}

        {/* All comments loaded confirmation */}
        {visibleCommentsCount >= comments.length && comments.length > 12 && (
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">All {comments.length} comments loaded</span>
          </div>
        )}
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

              {/* Field 2: Unit (Troy Ounce, Gram, 10g, Kilo, Tola) */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Unit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'oz', label: 'Troy Ounce' },
                    { id: 'g', label: 'Grams' },
                    { id: '10g', label: '10 grams' },
                    { id: 'kg', label: 'Kilogram' },
                    { id: 'tola', label: 'Tola' },
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

              {/* Field 3: Quantity Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Quantity ({calcUnitMode === 'oz' ? 'Troy Ounce' : calcUnitMode === 'g' ? 'Grams' : calcUnitMode === '10g' ? '10g units' : calcUnitMode === 'kg' ? 'Kilograms' : 'Tolas'})
                </label>
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

              {/* Field 4: Result Box (Clean Mint Green Container in USD) */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 text-center mt-3">
                <span className="block text-xs font-bold text-[#059669] uppercase tracking-wider">
                  Total Price
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] my-1 tracking-tight">
                  ${calcTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Rate: ${(baseRateOz * (calcUnitMode === 'tola' ? 11.6638 / 31.1034768 : calcUnitMode === '10g' ? 10 / 31.1034768 : calcUnitMode === 'g' ? 1 / 31.1034768 : calcUnitMode === 'kg' ? 1000 / 31.1034768 : 1) * purityFactor).toFixed(2)} USD / unit · Real-time COMEX / LBMA Benchmark
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

// ── SVG SPLINE AREA CHART (Exact Visual Match to Hamro Patro 30-Day Trend in USD) ──
interface ChartProps {
  data: { date: string; price: number }[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  unitFactor: number;
}

function SimpleAreaChart({ data, color, gradientFrom, unitFactor }: ChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const scaledData = data.map((d) => ({
    ...d,
    displayPrice: d.price * unitFactor,
  }));

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
              ${t.val < 100 ? t.val.toFixed(1) : Math.round(t.val).toLocaleString('en-US')}
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
            {points[hoverIndex].date}: ${points[hoverIndex].displayPrice.toFixed(2)} USD
          </span>
        </div>
      )}
    </div>
  );
}
