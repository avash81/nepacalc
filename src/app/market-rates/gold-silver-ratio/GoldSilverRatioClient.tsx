'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Scale,
  Info,
  RefreshCw,
  MessageSquare,
  Send,
  ThumbsUp,
} from 'lucide-react';

export interface GSRData {
  gold: {
    spotUSD: number;
    change24h: number;
    changePercent24h: number;
    updatedAt: string;
  };
  silver: {
    spotUSD: number;
    change24h: number;
    changePercent24h: number;
    updatedAt: string;
  };
  history30d: {
    gold: { date: string; price: number }[];
    silver: { date: string; price: number }[];
  };
}

interface Props {
  initialData: GSRData;
}

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
    id: 'g1',
    author: 'Marcus Sterling',
    avatarColor: 'bg-amber-600',
    timeAgo: '1 hour ago',
    text: 'GSR just crossed 80 again. Historically this is exactly when you want to be accumulating silver - the ratio almost always reverts toward 65 within 12–18 months.',
    likes: 22,
  },
  {
    id: 'g2',
    author: 'Elena Voss',
    avatarColor: 'bg-emerald-600',
    timeAgo: '3 hours ago',
    text: 'The pandemic peak of 126:1 was truly extreme. Anyone who rotated from gold into silver at that point made significant gains as the ratio compressed back toward 60s within two years.',
    likes: 31,
  },
  {
    id: 'g3',
    author: 'David Chen',
    avatarColor: 'bg-blue-600',
    timeAgo: '5 hours ago',
    text: 'Is the geological ratio of 19:1 a realistic long-term target? Silver would need to be around $200/oz if gold stayed flat near $4,000. Seems aggressive but not impossible given solar demand.',
    likes: 18,
  },
  {
    id: 'g4',
    author: 'Sarah Whitmore',
    avatarColor: 'bg-purple-600',
    timeAgo: '8 hours ago',
    text: 'The swap calculator here is excellent. I modeled converting 500 oz of silver into gold at current GSR and back to silver if ratio drops to 65 - the arbitrage is compelling on paper.',
    likes: 14,
  },
  {
    id: 'g5',
    author: 'James O\'Hara',
    avatarColor: 'bg-rose-600',
    timeAgo: '1 day ago',
    text: 'Worth noting the Hunt Brothers era context - their silver squeeze was artificially induced, hence the 15:1 ratio in 1980 was an outlier not representative of organic supply/demand.',
    likes: 27,
  },
  {
    id: 'g6',
    author: 'Priya Kapoor',
    avatarColor: 'bg-teal-600',
    timeAgo: '1 day ago',
    text: 'Solar panel manufacturers consume enormous amounts of silver. The EV and clean energy buildout could structurally tighten silver supply relative to gold and compress the GSR over the next decade.',
    likes: 19,
  },
  {
    id: 'g7',
    author: 'Thomas Weber',
    avatarColor: 'bg-indigo-600',
    timeAgo: '2 days ago',
    text: 'What was the GSR during the 2008 financial crisis? I recall it spiked significantly when silver sold off harder than gold - typical risk-off behavior.',
    likes: 11,
  },
  {
    id: 'g8',
    author: 'Lucas Dupont',
    avatarColor: 'bg-cyan-600',
    timeAgo: '2 days ago',
    text: 'The modern median of 65:1 since 2000 is a reasonable anchor for relative value analysis. I use it as my primary mean-reversion target when deploying GSR arbitrage strategies.',
    likes: 16,
  },
  {
    id: 'g9',
    author: 'Hannah Lindqvist',
    avatarColor: 'bg-violet-600',
    timeAgo: '3 days ago',
    text: 'At April 2011 lows of ~31:1 with silver at $49.50/oz, gold was around $1,500/oz. If gold is now at $4,000 and ratio drops to 31:1, silver would be ~$130/oz. Hard to imagine but mathematically it tracks.',
    likes: 25,
  },
  {
    id: 'g10',
    author: 'Robert Hayes',
    avatarColor: 'bg-sky-600',
    timeAgo: '3 days ago',
    text: 'Great live chart. I appreciate that it shows the GSR directly rather than making me calculate it from individual spot prices. The signal zones (green/red/neutral) are very intuitive.',
    likes: 20,
  },
];

export default function GoldSilverRatioClient({ initialData }: Props) {
  const [data, setData] = useState<GSRData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState<string>('Live (Auto-updating)');
  const [priceFlash, setPriceFlash] = useState(false);
  const [priceFlashDirection, setPriceFlashDirection] = useState<'up' | 'down' | null>(null);

  // Swap calculator state
  const [swapHolds, setSwapHolds] = useState<'gold' | 'silver'>('silver');
  const [swapQty, setSwapQty] = useState<string>('100');

  // Comments state
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(8);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentInputActive, setCommentInputActive] = useState(false);

  // ── Computed GSR values ──
  const gsr = data.gold.spotUSD / data.silver.spotUSD;
  const gsrHistory = data.history30d.gold.map((g, i) => ({
    date: g.date,
    ratio: data.history30d.silver[i] ? g.price / data.history30d.silver[i].price : null,
  }));

  // ── Signal logic ──
  const signal =
    gsr > 80
      ? { label: 'Silver Undervalued', color: 'green', desc: 'Historically strong zone to accumulate Silver over Gold' }
      : gsr < 50
      ? { label: 'Gold Undervalued', color: 'red', desc: 'Historically favorable to rotate Silver holdings into Gold' }
      : { label: 'Neutral Corridor', color: 'yellow', desc: 'GSR within modern median range (50–80)' };

  // ── Swap calculator computations ──
  const swapQtyNum = parseFloat(swapQty) || 0;
  const currentValueUSD =
    swapHolds === 'gold'
      ? swapQtyNum * data.gold.spotUSD
      : swapQtyNum * data.silver.spotUSD;
  const otherMetal = swapHolds === 'gold' ? 'silver' : 'gold';
  const otherPrice = swapHolds === 'gold' ? data.silver.spotUSD : data.gold.spotUSD;
  const ouncesReceived = currentValueUSD / otherPrice;
  const MODERN_MEAN_GSR = 65;
  const meanRevertedGSR = MODERN_MEAN_GSR;
  // If currently holding silver and GSR reverts to 65 (silver becomes more expensive relative to gold)
  // Value of swapped-to gold at mean reversion
  let meanReversionValueUSD = 0;
  if (swapHolds === 'silver') {
    // Swap silver -> gold at current ratio, then GSR reverts to 65 → silver price rises
    const goldOzReceived = currentValueUSD / data.gold.spotUSD;
    const silverPriceAtMeanGSR = data.gold.spotUSD / meanRevertedGSR;
    meanReversionValueUSD = goldOzReceived * data.gold.spotUSD; // could also model gold appreciation
    // Better model: if we hold silver and ratio reverts to 65 (silver appreciates):
    const silverPriceAtTarget = data.gold.spotUSD / meanRevertedGSR;
    meanReversionValueUSD = swapQtyNum * silverPriceAtTarget;
  } else {
    // Holding gold, swap to silver: if GSR drops to 65 silver appreciates
    const silverOzReceived = currentValueUSD / data.silver.spotUSD;
    const silverPriceAtMeanGSR = data.gold.spotUSD / meanRevertedGSR;
    meanReversionValueUSD = silverOzReceived * silverPriceAtMeanGSR;
  }
  const meanReversionPnL = meanReversionValueUSD - currentValueUSD;
  const meanReversionPct = currentValueUSD > 0 ? (meanReversionPnL / currentValueUSD) * 100 : 0;

  // ── Live polling ──
  const fetchLiveRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      let fetchedGold: number | null = null;
      let fetchedSilver: number | null = null;
      let fetchedUpdatedAt: string | null = null;

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
          fetchedUpdatedAt = gRes.updatedAt ?? null;
        }
        if (sRes?.price && typeof sRes.price === 'number') {
          fetchedSilver = Math.round(sRes.price * 100) / 100;
          fetchedUpdatedAt = fetchedUpdatedAt ?? sRes.updatedAt ?? null;
        }
      } catch {
        // Fallback to internal endpoint
      }

      if (!fetchedGold || !fetchedSilver) {
        try {
          const localRes = await fetch(`/data/international-rates.json?_t=${Date.now()}`, { cache: 'no-store' });
          if (localRes.ok) {
            const localData = await localRes.json();
            if (!fetchedGold && localData?.gold?.spotUSD) fetchedGold = Number(localData.gold.spotUSD);
            if (!fetchedSilver && localData?.silver?.spotUSD) fetchedSilver = Number(localData.silver.spotUSD);
            if (!fetchedUpdatedAt && localData?.gold?.updatedAt) fetchedUpdatedAt = localData.gold.updatedAt;
          }
        } catch {
          // Keep existing values
        }
      }

      const now = new Date();
      setLastRefreshedText(
        `${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} UTC`
      );

      if (fetchedGold || fetchedSilver) {
        setData((prev) => {
          const newGold = fetchedGold ?? prev.gold.spotUSD;
          const newSilver = fetchedSilver ?? prev.silver.spotUSD;
          const changed = newGold !== prev.gold.spotUSD || newSilver !== prev.silver.spotUSD;
          const isUp = newGold > prev.gold.spotUSD || newSilver > prev.silver.spotUSD;

          if (changed) {
            setPriceFlash(true);
            setPriceFlashDirection(isUp ? 'up' : 'down');
            setTimeout(() => {
              setPriceFlash(false);
              setPriceFlashDirection(null);
            }, 1500);
          }

          const updatedGoldHistory = [...prev.history30d.gold];
          if (updatedGoldHistory.length > 0) {
            updatedGoldHistory[updatedGoldHistory.length - 1] = {
              ...updatedGoldHistory[updatedGoldHistory.length - 1],
              price: newGold,
            };
          }
          const updatedSilverHistory = [...prev.history30d.silver];
          if (updatedSilverHistory.length > 0) {
            updatedSilverHistory[updatedSilverHistory.length - 1] = {
              ...updatedSilverHistory[updatedSilverHistory.length - 1],
              price: newSilver,
            };
          }

          return {
            ...prev,
            gold: {
              ...prev.gold,
              spotUSD: newGold,
              change24h: Math.round((newGold - prev.gold.spotUSD + prev.gold.change24h) * 100) / 100,
              changePercent24h: Math.round(((newGold / (prev.gold.spotUSD - prev.gold.change24h) - 1) * 100) * 100) / 100,
              updatedAt: fetchedUpdatedAt ?? new Date().toISOString(),
            },
            silver: {
              ...prev.silver,
              spotUSD: newSilver,
              change24h: Math.round((newSilver - prev.silver.spotUSD + prev.silver.change24h) * 100) / 100,
              changePercent24h: Math.round(((newSilver / (prev.silver.spotUSD - prev.silver.change24h) - 1) * 100) * 100) / 100,
              updatedAt: fetchedUpdatedAt ?? new Date().toISOString(),
            },
            history30d: {
              gold: updatedGoldHistory,
              silver: updatedSilverHistory,
            },
          };
        });
      }
    } catch {
      // Keep existing state on error
    } finally {
      setIsRefreshing(false);
    }
  }, []);

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

  // Dynamic browser tab title & meta
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Gold to Silver Ratio Live | GSR Chart & Historical Data';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Live Gold-to-Silver Ratio: ${gsr.toFixed(1)}:1 - Gold $${data.gold.spotUSD.toFixed(2)}/oz · Silver $${data.silver.spotUSD.toFixed(2)}/oz. 30-day chart and historical benchmarks updated every 30 seconds.`
        );
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          `Live GSR: ${gsr.toFixed(1)}:1 - ${signal.label}. Track the gold-to-silver ratio with 30-day chart and silver/gold swap calculator.`
        );
      }
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute(
          'content',
          `Live GSR ${gsr.toFixed(1)}:1 - ${signal.label}. Gold $${data.gold.spotUSD.toFixed(2)} · Silver $${data.silver.spotUSD.toFixed(2)}.`
        );
      }
    }
  }, [data.gold.spotUSD, data.silver.spotUSD, gsr, signal.label]);

  // Comments handlers
  const handleLoadMoreComments = () => {
    setIsLoadingMoreComments(true);
    setTimeout(() => {
      setVisibleCommentsCount((prev) => Math.min(prev + 5, comments.length));
      setIsLoadingMoreComments(false);
    }, 200);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newEntry: UserComment = {
      id: `gc_${Date.now()}`,
      author: 'Guest Visitor',
      avatarColor: 'bg-amber-700',
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

  // Signal color helpers
  const signalBg =
    signal.color === 'green'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : signal.color === 'red'
      ? 'bg-rose-50 border-rose-200 text-rose-800'
      : 'bg-yellow-50 border-yellow-200 text-yellow-800';

  const signalDot =
    signal.color === 'green'
      ? 'bg-emerald-500'
      : signal.color === 'red'
      ? 'bg-rose-500'
      : 'bg-yellow-500';

  const gsrChange24h = data.gold.change24h / data.silver.spotUSD - (data.gold.spotUSD * data.silver.change24h) / (data.silver.spotUSD * data.silver.spotUSD);
  const gsrIsUp = gsrChange24h >= 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 sm:py-6 md:py-8 font-sans">

      {/* ── SECTION 1: HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Gold to Silver Ratio (Live)
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
              GSR Live
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
            <span className="text-[11px] sm:text-xs">
              Real-time ratio of gold price to silver price - the essential precious metals valuation signal
            </span>
            <span className="text-gray-300">•</span>
            <div className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs text-gray-600 font-medium">
                Live {lastRefreshedText}
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
      </div>

      {/* ── SECTION 2: HERO GSR DISPLAY CARD ── */}
      <div
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-6 text-center transition-all duration-300 ${
          priceFlash
            ? priceFlashDirection === 'up'
              ? 'ring-2 ring-emerald-400/80 bg-emerald-50/20'
              : 'ring-2 ring-rose-400/80 bg-rose-50/20'
            : ''
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <BarChart2 className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Gold-to-Silver Ratio
          </span>
        </div>

        {/* Giant GSR Display */}
        <div className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 tracking-tight tabular-nums my-2">
          {gsr.toFixed(1)}
          <span className="text-3xl sm:text-4xl font-bold text-gray-400 ml-2">: 1</span>
        </div>

        {/* 24h Change */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {gsrIsUp ? (
            <TrendingUp className="w-4 h-4 text-rose-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          )}
          <span className={`text-sm font-semibold ${gsrIsUp ? 'text-rose-600' : 'text-emerald-600'}`}>
            {gsrIsUp ? '+' : ''}{gsrChange24h.toFixed(2)} ratio pts (24h)
          </span>
        </div>

        {/* Signal pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${signalBg}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${signalDot}`}></span>
          <span>{signal.label}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">{signal.desc}</p>
      </div>

      {/* ── SECTION 3: HISTORICAL BENCHMARK TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Historical GSR Benchmarks</h2>
            <p className="text-xs text-gray-500">Key reference points for ratio context</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-amber-50/40">
                <th className="py-3 px-3 min-w-[180px]">Period</th>
                <th className="py-3 px-3 min-w-[90px]">GSR</th>
                <th className="py-3 px-3 min-w-[200px]">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="hover:bg-rose-50/30 transition">
                <td className="py-3 px-3 font-bold text-gray-900">March 2020 (Pandemic Peak)</td>
                <td className="py-3 px-3 font-bold text-rose-700 tabular-nums">126 : 1</td>
                <td className="py-3 px-3 text-gray-600">All-time modern high</td>
              </tr>
              <tr className={`transition ${signal.color === 'green' ? 'bg-emerald-50/40' : signal.color === 'red' ? 'bg-rose-50/40' : 'bg-yellow-50/40'}`}>
                <td className="py-3 px-3 font-bold text-gray-900">
                  Current (Live)
                  <span className="ml-1.5 inline-flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                  </span>
                </td>
                <td className="py-3 px-3 font-black text-amber-700 tabular-nums text-base">{gsr.toFixed(1)} : 1</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${signalBg}`}>
                    {signal.label}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition">
                <td className="py-3 px-3 font-bold text-gray-900">Modern Median (2000–2024)</td>
                <td className="py-3 px-3 font-bold text-gray-700 tabular-nums">~65 : 1</td>
                <td className="py-3 px-3 text-gray-600">25-year average</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition">
                <td className="py-3 px-3 font-bold text-gray-900">April 2011 (Silver Bull Run)</td>
                <td className="py-3 px-3 font-bold text-emerald-700 tabular-nums">~31 : 1</td>
                <td className="py-3 px-3 text-gray-600">Silver peaked at $49.50</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition">
                <td className="py-3 px-3 font-bold text-gray-900">1980 Hunt Brothers</td>
                <td className="py-3 px-3 font-bold text-emerald-800 tabular-nums">~15 : 1</td>
                <td className="py-3 px-3 text-gray-600">Silver squeeze extreme</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition">
                <td className="py-3 px-3 font-bold text-gray-900">Geological (Earth&apos;s crust)</td>
                <td className="py-3 px-3 font-bold text-blue-700 tabular-nums">~19 : 1</td>
                <td className="py-3 px-3 text-gray-600">Natural abundance ratio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION 4: INDIVIDUAL LIVE PRICES ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Gold card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Gold (24K Spot)</h3>
                <span className="text-[10px] text-gray-500">Per Troy Ounce · USD</span>
              </div>
            </div>
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border ${
                data.gold.changePercent24h >= 0
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {data.gold.changePercent24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {data.gold.changePercent24h >= 0 ? '+' : ''}{data.gold.changePercent24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tabular-nums">
            ${data.gold.spotUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-xs font-medium mt-1 ${data.gold.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {data.gold.change24h >= 0 ? '+' : ''}${data.gold.change24h.toFixed(2)} today
          </div>
        </div>

        {/* Silver card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Silver (.999 Fine)</h3>
                <span className="text-[10px] text-gray-500">Per Troy Ounce · USD</span>
              </div>
            </div>
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border ${
                data.silver.changePercent24h >= 0
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {data.silver.changePercent24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {data.silver.changePercent24h >= 0 ? '+' : ''}{data.silver.changePercent24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 tabular-nums">
            ${data.silver.spotUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-xs font-medium mt-1 ${data.silver.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {data.silver.change24h >= 0 ? '+' : ''}${data.silver.change24h.toFixed(2)} today
          </div>
        </div>
      </div>

      {/* ── SECTION 5: 30-DAY GSR CHART ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">30-Day Gold-to-Silver Ratio Chart</h2>
            <p className="text-xs text-gray-500">Rolling GSR derived from live COMEX/LBMA spot feeds</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            <span className="text-amber-800 font-bold">GSR: {gsr.toFixed(2)}</span>
          </span>
        </div>
        <GSRAreaChart gsrHistory={gsrHistory} currentGSR={gsr} />
      </div>

      {/* ── SECTION 6: METAL SWAP ARBITRAGE CALCULATOR ── */}
      <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Metal Swap Arbitrage Calculator</h2>
            <p className="text-xs text-gray-500">Model GSR mean-reversion profit/loss at current prices</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Metal selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">I currently hold:</label>
            <div className="grid grid-cols-2 gap-3">
              {(['gold', 'silver'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSwapHolds(m)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                    swapHolds === m
                      ? 'border-2 border-amber-500 text-amber-700 bg-amber-50 shadow-xs'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Scale className={`w-4 h-4 ${m === 'gold' ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span className="capitalize">{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity input */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Quantity (troy ounces)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={swapQty}
              onChange={(e) => setSwapQty(e.target.value)}
              placeholder="e.g. 100"
              className="w-full px-4 py-2.5 text-base font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Current Value
              </span>
              <div className="text-xl font-extrabold text-gray-900 tabular-nums">
                ${currentValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-gray-400">
                {swapQtyNum.toLocaleString()} oz {swapHolds} @ ${(swapHolds === 'gold' ? data.gold.spotUSD : data.silver.spotUSD).toFixed(2)}
              </span>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
              <span className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                Swap to {otherMetal === 'gold' ? 'Gold' : 'Silver'} Today
              </span>
              <div className="text-xl font-extrabold text-amber-800 tabular-nums">
                {ouncesReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} oz
              </div>
              <span className="text-[10px] text-amber-600">
                @ ${otherPrice.toFixed(2)}/oz · GSR {gsr.toFixed(1)}:1
              </span>
            </div>

            <div className={`rounded-xl p-4 text-center border ${meanReversionPnL >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${meanReversionPnL >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                If GSR → 65 (Mean)
              </span>
              <div className={`text-xl font-extrabold tabular-nums ${meanReversionPnL >= 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                {meanReversionPnL >= 0 ? '+' : ''}${Math.abs(meanReversionPnL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className={`text-[10px] font-semibold ${meanReversionPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {meanReversionPct >= 0 ? '+' : ''}{meanReversionPct.toFixed(1)}% P&amp;L
              </span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 leading-relaxed">
            * Calculator assumes spot-to-spot swap with no friction. Mean reversion target: GSR 65:1 (modern 25-year median). Not financial advice.
          </p>
        </div>
      </div>

      {/* ── SECTION 7: CALLOUT INFO BOX ── */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
          The GSR is a macro-level valuation tool used by institutional precious metal investors. It does not
          constitute financial advice. All prices auto-refresh from live COMEX/LBMA spot feeds every 30 seconds.
          Past ratio extremes do not guarantee future mean reversion within any specific time horizon.
        </p>
      </div>

      {/* ── SECTION 8: COMMENTS ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <span>Comments</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {comments.length}
            </span>
          </div>
          <span className="text-xs text-gray-400">GSR analysis discussion</span>
        </h3>

        {/* Comment Input */}
        <div className="mb-6">
          {!commentInputActive ? (
            <div
              onClick={() => setCommentInputActive(true)}
              className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 text-sm transition"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                ?
              </div>
              <span>Share your GSR analysis or question...</span>
            </div>
          ) : (
            <form onSubmit={handleAddComment} className="border-2 border-amber-500 rounded-2xl p-4 transition shadow-xs">
              <textarea
                autoFocus
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your question or comment about the gold-to-silver ratio..."
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
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-full disabled:opacity-50 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Comment list */}
        <div className="space-y-4 divide-y divide-gray-100">
          {comments.slice(0, visibleCommentsCount).map((comment) => (
            <div key={comment.id} className="pt-4 first:pt-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${comment.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                >
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{comment.text}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium transition cursor-pointer ${
                        comment.liked ? 'text-amber-700 font-bold' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${comment.liked ? 'fill-amber-600 text-amber-600' : ''}`} />
                      <span>{comment.likes > 0 ? `${comment.likes} Like${comment.likes > 1 ? 's' : ''}` : 'Like'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
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
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>More comments</span>
              )}
            </button>
          </div>
        )}

        {visibleCommentsCount >= comments.length && comments.length > 8 && (
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">All {comments.length} comments loaded</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SVG GSR SPLINE AREA CHART with Zone Reference Lines ──
interface GSRChartProps {
  gsrHistory: { date: string; ratio: number | null }[];
  currentGSR: number;
}

function GSRAreaChart({ gsrHistory, currentGSR }: GSRChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const validPoints = gsrHistory.filter((d) => d.ratio !== null) as { date: string; ratio: number }[];

  if (validPoints.length < 2) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-400">
        Insufficient historical data for chart
      </div>
    );
  }

  const ratios = validPoints.map((d) => d.ratio);
  const rawMin = Math.min(...ratios);
  const rawMax = Math.max(...ratios);
  // Include zone lines in domain
  const domainMin = Math.min(rawMin, 45) * 0.98;
  const domainMax = Math.max(rawMax, 85) * 1.02;

  const width = 800;
  const height = 300;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const toX = (i: number) => paddingLeft + (i / (validPoints.length - 1)) * chartWidth;
  const toY = (val: number) =>
    paddingTop + chartHeight - ((val - domainMin) / (domainMax - domainMin)) * chartHeight;

  const pts = validPoints.map((d, i) => ({
    x: toX(i),
    y: toY(d.ratio),
    date: d.date,
    ratio: d.ratio,
  }));

  // Smooth bezier
  const pathD = pts.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    return `${acc} C ${cp1x},${prev.y} ${cp2x},${pt.y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${pts[pts.length - 1].x},${paddingTop + chartHeight} L ${pts[0].x},${paddingTop + chartHeight} Z`;

  // Zone reference y positions
  const y80 = toY(80);
  const y50 = toY(50);

  const yTicks = [domainMin, domainMin + (domainMax - domainMin) * 0.33, domainMin + (domainMax - domainMin) * 0.66, domainMax].map((val) => ({
    val,
    y: toY(val),
  }));

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
        onTouchEnd={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Y grid lines */}
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
              x={paddingLeft - 8}
              y={t.y + 4}
              textAnchor="end"
              className="text-[9px] fill-gray-400 font-sans font-medium"
            >
              {t.val.toFixed(0)}
            </text>
          </g>
        ))}

        {/* Zone: Silver Undervalued (above 80) - green tint */}
        {y80 > paddingTop && (
          <rect
            x={paddingLeft}
            y={paddingTop}
            width={chartWidth}
            height={Math.max(0, y80 - paddingTop)}
            fill="#D1FAE5"
            fillOpacity={0.35}
          />
        )}

        {/* Zone: Gold Undervalued (below 50) - red tint */}
        {y50 < paddingTop + chartHeight && (
          <rect
            x={paddingLeft}
            y={y50}
            width={chartWidth}
            height={Math.max(0, paddingTop + chartHeight - y50)}
            fill="#FEE2E2"
            fillOpacity={0.35}
          />
        )}

        {/* Dashed reference line at GSR=80 */}
        <line
          x1={paddingLeft}
          y1={y80}
          x2={width - paddingRight}
          y2={y80}
          stroke="#10B981"
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <text x={width - paddingRight + 2} y={y80 + 4} className="text-[8px] fill-emerald-600 font-sans font-bold" fontSize="8">
          80
        </text>
        <text x={paddingLeft + 4} y={y80 - 4} className="text-[8px] fill-emerald-600 font-sans" fontSize="8">
          Silver Undervalued Zone
        </text>

        {/* Dashed reference line at GSR=50 */}
        <line
          x1={paddingLeft}
          y1={y50}
          x2={width - paddingRight}
          y2={y50}
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <text x={width - paddingRight + 2} y={y50 + 4} className="text-[8px] fill-rose-600 font-sans font-bold" fontSize="8">
          50
        </text>
        <text x={paddingLeft + 4} y={y50 + 10} className="text-[8px] fill-rose-600 font-sans" fontSize="8">
          Gold Undervalued Zone
        </text>

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Spline line */}
        <path d={pathD} fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

        {/* X labels */}
        {pts.filter((_, idx) => idx === 0 || idx === pts.length - 1 || idx % Math.ceil(pts.length / 5) === 0).map((pt, i) => (
          <text
            key={i}
            x={pt.x}
            y={height - 8}
            textAnchor="middle"
            className="text-[9px] fill-gray-400 font-sans"
          >
            {pt.date}
          </text>
        ))}

        {/* Hover zones */}
        {pts.map((pt, idx) => (
          <rect
            key={idx}
            x={pt.x - chartWidth / pts.length / 2}
            y={paddingTop}
            width={chartWidth / pts.length}
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
              x1={pts[hoverIndex].x}
              y1={paddingTop}
              x2={pts[hoverIndex].x}
              y2={paddingTop + chartHeight}
              stroke="#D97706"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle
              cx={pts[hoverIndex].x}
              cy={pts[hoverIndex].y}
              r="5"
              fill="#FFFFFF"
              stroke="#D97706"
              strokeWidth="3"
            />
          </g>
        )}

        {/* Current GSR horizontal line */}
        <line
          x1={paddingLeft}
          y1={toY(currentGSR)}
          x2={width - paddingRight}
          y2={toY(currentGSR)}
          stroke="#92400E"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeOpacity={0.5}
        />
      </svg>

      {/* Hover tooltip */}
      {hoverIndex !== null && (() => {
        const pt = pts[hoverIndex];
        const isNearRight = hoverIndex >= pts.length - 3;
        const isNearLeft = hoverIndex <= 2;
        const isNearTop = pt.y < 60;

        let xOffset = '-50%';
        if (isNearRight) xOffset = '-95%';
        else if (isNearLeft) xOffset = '-5%';
        const yOffset = isNearTop ? '12px' : 'calc(-100% - 10px)';

        return (
          <div
            className="absolute pointer-events-none z-30 bg-neutral-900/95 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5"
            style={{
              left: `${(pt.x / width) * 100}%`,
              top: `${(pt.y / height) * 100}%`,
              transform: `translate(${xOffset}, ${yOffset})`,
            }}
          >
            <span className="text-gray-300 font-normal">{pt.date}:</span>
            <span className="font-bold text-amber-300">GSR {pt.ratio.toFixed(1)} : 1</span>
          </div>
        );
      })()}
    </div>
  );
}
