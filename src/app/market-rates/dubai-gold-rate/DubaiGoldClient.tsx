'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import {
  Coins,
  Calculator,
  X,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  MessageSquare,
  Heart,
  Send,
  Info,
} from 'lucide-react';

// ─── Official UAE Central Bank fixed AED/USD peg - never changes ───
const AED_PER_USD = 3.6725;

// ─── Dubai Gold Purity Definitions ───
const DUBAI_PURITIES: Record<string, { name: string; purity: number; desc: string }> = {
  '24K': { name: '24 Karat (999 Fine)', purity: 1.0000, desc: 'Investment bars, kilobars, 10-tola TT bars' },
  '22K': { name: '22 Karat (916)', purity: 0.9167, desc: 'Most popular: Dubai Gold Souk jewelry standard' },
  '21K': { name: '21 Karat (875)', purity: 0.8750, desc: 'Traditional Arab, Emirati & regional jewelry' },
  '18K': { name: '18 Karat (750)', purity: 0.7500, desc: 'Modern diamond-set jewelry, lightweight designs' },
  '14K': { name: '14 Karat (583)', purity: 0.5833, desc: 'Western-style jewelry, mixed metal alloys' },
};

// ─── Customs Allowance Table Data ───
const CUSTOMS_ALLOWANCES = [
  { country: '🇮🇳 India (Male)', allowance: '20g / INR 50,000 max', notes: 'NRI abroad > 1 year' },
  { country: '🇮🇳 India (Female)', allowance: '40g / INR 1,00,000 max', notes: 'NRI abroad > 1 year' },
  { country: '🇺🇸 USA', allowance: '$800 personal exemption', notes: 'Investment bullion duty-free' },
  { country: '🇬🇧 UK', allowance: '£390 personal allowance', notes: ' - ' },
  { country: '🇳🇵 Nepal', allowance: '50g duty-free', notes: 'Up to 100g with customs duty' },
  { country: '🇵🇰 Pakistan', allowance: '50g', notes: 'Worn jewelry exempt' },
  { country: '🇸🇦 Saudi Arabia', allowance: '250g', notes: 'For personal use' },
];

export interface DubaiRatesData {
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
  initialData: DubaiRatesData;
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
    id: 'dc1',
    author: 'Ravi Sharma',
    avatarColor: 'bg-amber-600',
    timeAgo: '1 hour ago',
    text: 'Bought 50g of 22K gold at the Dubai Gold Souk today. The rate was spot-on with this site - making charges were only 8% at the shop I visited in Deira.',
    likes: 14,
  },
  {
    id: 'dc2',
    author: 'Fatima Al-Rashid',
    avatarColor: 'bg-emerald-600',
    timeAgo: '3 hours ago',
    text: 'Is the DGJG (Dubai Gold & Jewellery Group) morning fixing price always aligned with the LBMA PM fix from the previous London session?',
    likes: 9,
  },
  {
    id: 'dc3',
    author: 'Pradeep Nair',
    avatarColor: 'bg-blue-600',
    timeAgo: '5 hours ago',
    text: 'Confirmed with Planet Tax Free at Terminal 3 - the VAT refund kiosk processes claims within 15 minutes for purchases above AED 250. 85% back is a great deal.',
    likes: 21,
  },
  {
    id: 'dc4',
    author: 'Anjali Menon',
    avatarColor: 'bg-rose-600',
    timeAgo: '1 day ago',
    text: 'What is the typical making charge for 22K gold bangles in Dubai Gold Souk vs. Kerala? Dubai is definitely lower, usually 8–12% vs. 15–20% back home.',
    likes: 17,
  },
  {
    id: 'dc5',
    author: 'Khalid Ibrahim',
    avatarColor: 'bg-purple-600',
    timeAgo: '1 day ago',
    text: 'The AED peg to USD at exactly 3.6725 means gold prices in Dubai are extremely transparent and predictable. No currency risk on the AED side.',
    likes: 11,
  },
  {
    id: 'dc6',
    author: 'Meera Pillai',
    avatarColor: 'bg-teal-600',
    timeAgo: '2 days ago',
    text: 'Is 21K gold available throughout the Gold Souk or only at specific shops catering to Emirati customers? I found great pieces in Deira targeting Gulf buyers.',
    likes: 8,
  },
  {
    id: 'dc7',
    author: 'Rohan Kapoor',
    avatarColor: 'bg-indigo-600',
    timeAgo: '2 days ago',
    text: 'Brought 18g of 22K gold from Dubai to India last month - declared at customs and paid duty on only 2g excess. The 20g limit for men is strictly enforced.',
    likes: 23,
  },
  {
    id: 'dc8',
    author: 'Suresh Nambiar',
    avatarColor: 'bg-orange-600',
    timeAgo: '3 days ago',
    text: 'The Dubai Gold Souk has over 300 retailers in Deira. Prices are almost identical across shops since they all use the DGJG fixed rate - bargain on making charges instead.',
    likes: 19,
  },
  {
    id: 'dc9',
    author: 'Leila Karimi',
    avatarColor: 'bg-cyan-600',
    timeAgo: '3 days ago',
    text: 'Investment bars (24K, 999 fine) in Dubai are VAT-exempt. Bought a 10-tola TT bar from a certified dealer at the Gold Souk - no VAT applied at all.',
    likes: 16,
  },
  {
    id: 'dc10',
    author: 'Deepak Verma',
    avatarColor: 'bg-violet-600',
    timeAgo: '4 days ago',
    text: 'Is 22K gold from Dubai hallmarked and certified? Most reputable souk dealers will provide a certificate of purity. Always ask for the hallmark stamp.',
    likes: 12,
  },
  {
    id: 'dc11',
    author: 'Nadia Hassan',
    avatarColor: 'bg-amber-700',
    timeAgo: '5 days ago',
    text: 'For Nepali workers in Dubai - gold is significantly cheaper than buying in Nepal. Even with customs duty at TIA, the total cost is usually 10–15% lower.',
    likes: 28,
  },
  {
    id: 'dc12',
    author: 'Vinod Kutty',
    avatarColor: 'bg-sky-600',
    timeAgo: '5 days ago',
    text: 'This site\'s real-time AED price calculations are perfect. The AED per gram for 22K matches exactly what I see on the Gold Souk price boards on my phone.',
    likes: 31,
  },
];

export default function DubaiGoldClient({ initialData }: Props) {
  // Live dynamic state
  const [data, setData] = useState<DubaiRatesData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);
  const [priceFlashDirection, setPriceFlashDirection] = useState<'up' | 'down' | null>(null);
  const [lastRefreshedText, setLastRefreshedText] = useState<string>('Live (Auto-updating)');

  // Currency toggle: AED or USD
  const [currency, setCurrency] = useState<'AED' | 'USD'>('AED');

  // VAT Refund Calculator state
  const [vatPurchaseAED, setVatPurchaseAED] = useState<string>('5000');
  const [isInvestmentGold, setIsInvestmentGold] = useState(false);

  // Making Charges Estimator state
  const [makingPct, setMakingPct] = useState<number>(10);
  const [makingGrams, setMakingGrams] = useState<string>('10');
  const [makingKarat, setMakingKarat] = useState<keyof typeof DUBAI_PURITIES>('22K');

  // Comments state
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(10);
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

  // Conversion helpers
  const toAED = (usd: number) => usd * AED_PER_USD;

  const formatAED = (val: number) =>
    `د.إ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatUSD = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatCurrency = (usdVal: number) =>
    currency === 'AED' ? formatAED(toAED(usdVal)) : formatUSD(usdVal);

  // Live Auto-Update Poller - dual API sources
  const fetchLiveRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      let fetchedGold: number | null = null;
      let fetchedSilver: number | null = null;
      let fetchedUpdatedAt: string | null = null;

      // 1. Try public real-time gold-api.com feed (with timeout guard)
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

      // 2. If primary external feed unavailable, fetch same-origin static data
      if (!fetchedGold || !fetchedSilver) {
        try {
          const localRes = await fetch(`/data/international-rates.json?_t=${Date.now()}`, {
            cache: 'no-store',
          });
          if (localRes.ok) {
            const localData = await localRes.json();
            if (!fetchedGold && localData?.gold?.spotUSD) {
              fetchedGold = Number(localData.gold.spotUSD);
            }
            if (!fetchedSilver && localData?.silver?.spotUSD) {
              fetchedSilver = Number(localData.silver.spotUSD);
            }
            if (!fetchedUpdatedAt && localData?.gold?.updatedAt) {
              fetchedUpdatedAt = localData.gold.updatedAt;
            }
          }
        } catch {
          // Keep existing values
        }
      }

      const now = new Date();
      setLastRefreshedText(
        `${now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })} UTC`
      );

      if (fetchedGold || fetchedSilver) {
        setData((prev) => {
          const newGoldPrice = fetchedGold ?? prev.gold.spotUSD;
          const newSilverPrice = fetchedSilver ?? prev.silver.spotUSD;

          const isPriceChanged =
            newGoldPrice !== prev.gold.spotUSD || newSilverPrice !== prev.silver.spotUSD;
          const isUp =
            newGoldPrice > prev.gold.spotUSD || newSilverPrice > prev.silver.spotUSD;

          if (isPriceChanged) {
            setPriceFlash(true);
            setPriceFlashDirection(isUp ? 'up' : 'down');
            setTimeout(() => {
              setPriceFlash(false);
              setPriceFlashDirection(null);
            }, 1500);
          }

          const goldChange = Math.round((newGoldPrice - prev.gold.prevClose) * 100) / 100;
          const goldPercent =
            Math.round(((goldChange / prev.gold.prevClose) * 100) * 100) / 100;

          const silverChange = Math.round((newSilverPrice - prev.silver.prevClose) * 100) / 100;
          const silverPercent =
            Math.round(((silverChange / prev.silver.prevClose) * 100) * 100) / 100;

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

  // Poll every 30 seconds & refresh on window focus
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

  // Keep browser tab title synced
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Dubai Gold Rate Today 24K 22K | AED & USD Price Per Gram';

      const gold24kGramUSD = data.gold.spotUSD / 31.1034768;
      const gold24kGramAED = gold24kGramUSD * AED_PER_USD;
      const gold22kGramAED = gold24kGramUSD * 0.9167 * AED_PER_USD;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Live Dubai 24K gold: د.إ${gold24kGramAED.toFixed(2)}/g ($${gold24kGramUSD.toFixed(2)}/g). 22K: د.إ${gold22kGramAED.toFixed(2)}/g. Real-time AED & USD with VAT refund and customs guide.`
        );
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          `Live Dubai 24K gold: د.إ${gold24kGramAED.toFixed(2)}/g ($${gold24kGramUSD.toFixed(2)}/g). 22K, 21K, 18K rates with VAT refund calculator.`
        );
      }

      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute(
          'content',
          `Dubai 24K gold: د.إ${gold24kGramAED.toFixed(2)}/g today. Live 22K, 21K, 18K rates in AED & USD.`
        );
      }
    }
  }, [data.gold.spotUSD]);

  // Derived price values
  const gold24kGramUSD = data.gold.spotUSD / 31.1034768;
  const gold22kGramUSD = gold24kGramUSD * 0.9167;
  const gold24kGramAED = gold24kGramUSD * AED_PER_USD;
  const gold22kGramAED = gold22kGramUSD * AED_PER_USD;

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newEntry: UserComment = {
      id: `dc_${Date.now()}`,
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

  // VAT calculator derived values
  const vatPurchaseNum = parseFloat(vatPurchaseAED) || 0;
  const vatPaid = vatPurchaseNum * 0.05;
  const vatRefundGross = vatPaid * 0.85;
  const vatAdminFee = 4.80;
  const vatRefundNet = Math.max(0, vatRefundGross - vatAdminFee);

  // Making charges estimator derived values
  const makingGramsNum = parseFloat(makingGrams) || 0;
  const makingPurity = DUBAI_PURITIES[makingKarat].purity;
  const rawGoldValueUSD = (data.gold.spotUSD / 31.1034768) * makingPurity * makingGramsNum;
  const rawGoldValueAED = rawGoldValueUSD * AED_PER_USD;
  const makingFeeAED = rawGoldValueAED * (makingPct / 100);
  const totalCounterPriceAED = rawGoldValueAED + makingFeeAED;
  const totalCounterPriceUSD = rawGoldValueUSD * (1 + makingPct / 100);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 sm:py-6 md:py-8 font-sans">

      {/* ── TOP SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Dubai Gold Rate Today (AED &amp; USD)
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Tax-Free
            </span>
          </div>

          {/* Subtitle & Live Meta Status Strip */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
            <span className="text-[11px] sm:text-xs">
              Live 24K, 22K, 21K &amp; 18K Dubai gold prices in UAE Dirham (AED) and US Dollars (USD) · Updated from COMEX/LBMA spot
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

      {/* ── CURRENCY TOGGLE ── */}
      <div className="flex items-center gap-2 mb-5 p-1.5 bg-gray-50/90 rounded-2xl border border-gray-200/90 shadow-2xs w-fit">
        {(['AED', 'USD'] as const).map((cur) => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer ${
              currency === cur
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
            }`}
          >
            {cur === 'AED' ? 'AED (د.إ)' : 'USD ($)'}
          </button>
        ))}
      </div>

      {/* ── DUAL HERO PRICE CARDS (24K & 22K) ── */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          Dubai Gold Price - 24K &amp; 22K Per Gram
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* 24K GOLD CARD */}
          <div
            className={`bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
              priceFlash
                ? priceFlashDirection === 'up'
                  ? 'ring-2 ring-emerald-400/80 bg-emerald-50/20'
                  : 'ring-2 ring-rose-400/80 bg-rose-50/20'
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3.5 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                    24K Gold - 1 Gram in {currency}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-gray-500">
                    999 Fine · Investment Standard
                  </span>
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
                <span>
                  {data.gold.changePercent24h >= 0
                    ? `+${data.gold.changePercent24h}%`
                    : `${data.gold.changePercent24h}%`}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight transition-all">
                {currency === 'AED' ? formatAED(gold24kGramAED) : formatUSD(gold24kGramUSD)}
              </div>
              <div className="text-xs font-medium mt-1 text-gray-500">Per gram · 24 Karat</div>
            </div>

            {/* 30-Day Trend Chart */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1 font-medium text-gray-500">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> 30-day trend
                </span>
                <span className="text-[11px] text-gray-400">COMEX/LBMA Spot</span>
              </div>
              <SimpleAreaChart
                data={data.history30d.gold}
                color="#D97706"
                gradientFrom="#D97706"
                gradientTo="#FDE68A"
                currency={currency}
              />
            </div>
          </div>

          {/* 22K GOLD CARD */}
          <div
            className={`bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
              priceFlash
                ? priceFlashDirection === 'up'
                  ? 'ring-2 ring-emerald-400/80 bg-emerald-50/20'
                  : 'ring-2 ring-rose-400/80 bg-rose-50/20'
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3.5 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs shrink-0">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight truncate">
                    22K Gold - 1 Gram in {currency}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-gray-500">
                    916 Hallmark · Gold Souk Standard
                  </span>
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
                <span>
                  {data.gold.changePercent24h >= 0
                    ? `+${data.gold.changePercent24h}%`
                    : `${data.gold.changePercent24h}%`}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl md:text-4xl font-extrabold text-amber-700 tracking-tight transition-all">
                {currency === 'AED' ? formatAED(gold22kGramAED) : formatUSD(gold22kGramUSD)}
              </div>
              <div className="text-xs font-medium mt-1 text-gray-500">Per gram · 22 Karat (Most Popular)</div>
            </div>

            {/* 30-Day Trend Chart (22K - derived from 24K history × 0.9167) */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1 font-medium text-gray-500">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> 30-day trend
                </span>
                <span className="text-[11px] text-gray-400">22K = 24K × 0.9167</span>
              </div>
              <SimpleAreaChart
                data={data.history30d.gold.map((d) => ({ ...d, price: d.price * 0.9167 }))}
                color="#B45309"
                gradientFrom="#B45309"
                gradientTo="#FCD34D"
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK ANSWER PARAGRAPH ── */}
      <div id="quick-answer" className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm mb-8">
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          <strong className="text-gray-900 font-bold">Quick Answer:</strong> Today&apos;s 24K gold
          price in Dubai is{' '}
          <strong className="text-gray-900 font-bold">
            {formatAED(gold24kGramAED)} per gram
          </strong>{' '}
          (or{' '}
          <strong className="text-gray-900 font-bold">${gold24kGramUSD.toFixed(2)} USD per gram</strong>
          ). The 22K gold rate in Dubai today is{' '}
          <strong className="text-gray-900 font-bold">
            {formatAED(gold22kGramAED)} per gram
          </strong>
          . Dubai gold prices are based on live COMEX spot rates converted at the fixed AED peg of{' '}
          <strong className="text-gray-900 font-bold">3.6725</strong>. The{' '}
          <strong className="text-gray-900 font-bold">Dubai Gold Souk</strong> in Deira offers prices
          very close to spot benchmark with low making charges (typically 5–15%), making it one of
          the world&apos;s most competitive gold markets.
        </p>

        <div className="pt-4 border-t border-gray-100 space-y-2 mt-4">
          <h2 className="text-xl font-bold text-gray-900">Dubai Gold Prices by Karat &amp; Weight</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            All Dubai gold prices below are calculated from live COMEX/LBMA spot benchmarks and
            converted to UAE Dirhams (AED) at the official fixed peg of 3.6725 AED per USD. Toggle
            between AED and USD using the currency button above. Prices auto-refresh every 30 seconds.
          </p>
        </div>
      </div>

      {/* ── FULL DUBAI GOLD PRICE TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Dubai Gold Price Table (All Karats &amp; Weights)
              </h3>
              <p className="text-xs text-gray-500">
                Showing in {currency} · Updated every 30 seconds · 1 Tola = 11.6638 g · 1 Troy Oz = 31.1035 g
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            <span className="text-amber-800 font-bold">
              24K Spot: {currency === 'AED' ? formatAED(toAED(data.gold.spotUSD)) : formatUSD(data.gold.spotUSD)} / oz
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-amber-50/40">
                <th className="py-3 px-3 min-w-[150px]">Karat / Purity</th>
                <th className="py-3 px-3 min-w-[100px]">1 Gram</th>
                <th className="py-3 px-3 min-w-[100px]">5 Grams</th>
                <th className="py-3 px-3 min-w-[100px]">10 Grams</th>
                <th className="py-3 px-3 min-w-[110px]">100 Grams</th>
                <th className="py-3 px-3 min-w-[100px]">1 KG</th>
                <th className="py-3 px-3 min-w-[120px]">1 Tola (11.66g)</th>
                <th className="py-3 px-3 min-w-[110px]">1 Troy Oz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {(Object.keys(DUBAI_PURITIES) as (keyof typeof DUBAI_PURITIES)[]).map((k) => {
                const item = DUBAI_PURITIES[k];
                const gRateUSD = (data.gold.spotUSD * item.purity) / 31.1034768;
                const gRate = currency === 'AED' ? gRateUSD * AED_PER_USD : gRateUSD;
                const sym = currency === 'AED' ? 'د.إ' : '$';
                const fmt = (v: number) =>
                  `${sym}${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                return (
                  <tr key={k} className="hover:bg-amber-50/30 transition group">
                    <td className="py-3 px-3 font-bold text-gray-900">
                      <span className="block">{item.name}</span>
                      <span className="text-[10px] font-normal text-gray-400">{item.desc}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900 tabular-nums">
                      {fmt(gRate)}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      {fmt(gRate * 5)}
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium tabular-nums">
                      {fmt(gRate * 10)}
                    </td>
                    <td className="py-3 px-3 text-gray-700 tabular-nums">
                      {fmt(gRate * 100)}
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium tabular-nums">
                      {fmt(gRate * 1000)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-amber-700 tabular-nums">
                      {fmt(gRate * 11.6638)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-800 tabular-nums">
                      {fmt(gRate * 31.1034768)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
          Prices auto-refresh every 30 seconds from live global spot feeds. AED/USD peg: 3.6725 (fixed). 1 Troy Oz = 31.1035 g · 1 Tola = 11.6638 g
        </p>
      </div>

      {/* ── TOURIST VAT REFUND CALCULATOR ── */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-5 sm:p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-100">
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Tourist VAT Refund Calculator</h3>
            <p className="text-xs text-amber-700 font-medium">
              5% VAT on jewelry · 85% tourist refund via Planet Tax Free · AED 4.80 admin fee
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Purchase input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Total Jewelry Purchase (AED)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={vatPurchaseAED}
              onChange={(e) => setVatPurchaseAED(e.target.value)}
              placeholder="Enter purchase amount in AED..."
              className="w-full max-w-xs px-3.5 py-2 text-sm font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Investment gold checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={isInvestmentGold}
              onChange={(e) => setIsInvestmentGold(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-600"
            />
            <span className="text-sm text-gray-700 font-medium">
              Gold purity ≥ 99% (Investment bars - VAT Exempt)
            </span>
          </label>

          {/* Results */}
          {isInvestmentGold ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold text-lg">✓</span>
              <div>
                <p className="text-sm font-bold text-emerald-800">
                  Investment gold (≥99% purity) is 0% VAT - fully exempt under UAE FTA rules.
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  24K gold bars and kilobars purchased in Dubai carry zero VAT. No refund claim required.
                </p>
              </div>
            </div>
          ) : vatPurchaseNum > 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT Paid (5%)</span>
                <span className="font-bold text-gray-900">{formatAED(vatPaid)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tourist Refund (85%)</span>
                <span className="font-bold text-emerald-700">{formatAED(vatRefundGross)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Planet Tax Free Admin Fee</span>
                <span className="font-medium text-rose-600">− {formatAED(vatAdminFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-amber-200 pt-2 mt-2">
                <span className="text-gray-900">Net Saving (Refund)</span>
                <span className="text-emerald-700">{formatAED(vatRefundNet)}</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
              Enter your purchase amount above to calculate the VAT refund.
            </div>
          )}

          {/* Info note */}
          <div className="flex items-start gap-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Refund available at Planet Tax Free kiosks at Dubai International Airport (DXB) Terminal 1, 2, and 3.
              Minimum purchase of AED 250 required. Original receipts must be presented.
            </p>
          </div>
        </div>
      </div>

      {/* ── MAKING CHARGES (MASNOOIYA) ESTIMATOR ── */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Making Charges Estimator (Masnooiya)</h3>
            <p className="text-xs text-slate-600 font-medium">
              Estimate the counter price of jewelry including gold value + making fee
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Karat selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Karat</label>
            <select
              value={makingKarat}
              onChange={(e) => setMakingKarat(e.target.value as keyof typeof DUBAI_PURITIES)}
              className="w-full px-3 py-2 text-sm font-semibold text-gray-900 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 bg-white"
            >
              {Object.entries(DUBAI_PURITIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Weight input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Weight (grams)</label>
            <input
              type="number"
              min="0"
              step="any"
              value={makingGrams}
              onChange={(e) => setMakingGrams(e.target.value)}
              placeholder="e.g. 10"
              className="w-full px-3 py-2 text-sm font-bold text-gray-900 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Making % slider */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Making Fee: <span className="text-amber-700">{makingPct}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={makingPct}
              onChange={(e) => setMakingPct(Number(e.target.value))}
              className="w-full h-2 rounded-lg accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5% (Souk min)</span>
              <span>25% (High-end)</span>
            </div>
          </div>
        </div>

        {makingGramsNum > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Raw Gold Value ({makingKarat})</span>
              <span className="font-bold text-gray-900">
                {formatAED(rawGoldValueAED)} / {formatUSD(rawGoldValueUSD)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Making Charges ({makingPct}%)</span>
              <span className="font-medium text-amber-700">+ {formatAED(makingFeeAED)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2 mt-2">
              <span className="text-gray-900">Total Counter Price</span>
              <span className="text-amber-700">
                {formatAED(totalCounterPriceAED)}{' '}
                <span className="text-sm text-gray-500">/ {formatUSD(totalCounterPriceUSD)}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── COUNTRY CUSTOMS ALLOWANCE TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Gold Import Customs Allowances by Country
            </h3>
            <p className="text-xs text-gray-500">Duty-free personal import limits from Dubai</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-blue-50/30">
                <th className="py-3 px-3 min-w-[160px]">Country</th>
                <th className="py-3 px-3 min-w-[180px]">Duty-Free Allowance</th>
                <th className="py-3 px-3 min-w-[200px]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {CUSTOMS_ALLOWANCES.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/20 transition">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.country}</td>
                  <td className="py-3 px-3 text-gray-700 font-semibold">{row.allowance}</td>
                  <td className="py-3 px-3 text-gray-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
          Allowances are for personal use and subject to change. Always verify with the destination country customs authority before travel.
        </p>
      </div>

      {/* ── CALLOUT NOTE ── */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
          Dubai gold prices represent live COMEX/LBMA spot benchmarks converted at the UAE Central Bank official AED/USD peg of 3.6725. Actual Gold Souk counter prices may include dealer premiums and making charges (Masnooiya). Always compare prices at multiple shops for large purchases.
        </p>
      </div>

      {/* ── COMMENTS SECTION ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <span>Comments</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {comments.length}
            </span>
          </div>
          <span className="text-xs text-gray-400">Dubai Gold Discussion</span>
        </h3>

        {/* Comment Input Box */}
        <div className="mb-6">
          {!commentInputActive ? (
            <div
              onClick={() => setCommentInputActive(true)}
              className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-full border border-gray-300 hover:border-amber-500 text-gray-500 text-sm transition"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                ?
              </div>
              <span>Share your Dubai gold shopping experience or question...</span>
            </div>
          ) : (
            <form
              onSubmit={handleAddComment}
              className="border-2 border-amber-500 rounded-2xl p-4 transition shadow-xs"
            >
              <textarea
                autoFocus
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your question or comment about Dubai gold prices, VAT refunds, Gold Souk tips..."
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
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-full disabled:opacity-50 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Comments List */}
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
                        comment.liked ? 'text-amber-600 font-bold' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${comment.liked ? 'fill-amber-600 text-amber-600' : ''}`}
                      />
                      <span>
                        {comment.likes > 0 ? `${comment.likes} Like${comment.likes > 1 ? 's' : ''}` : 'Reply'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Comments Button */}
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
                  <span>Loading comments...</span>
                </>
              ) : (
                <span>More comments</span>
              )}
            </button>
          </div>
        )}

        {/* All comments loaded */}
        {visibleCommentsCount >= comments.length && comments.length > 10 && (
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">All {comments.length} comments loaded</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SVG SPLINE AREA CHART (matches InternationalGoldClient pattern) ──
interface ChartProps {
  data: { date: string; price: number }[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  currency: 'AED' | 'USD';
}

function SimpleAreaChart({ data, color, gradientFrom, currency }: ChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Convert spot oz prices to per-gram, then to selected currency
  const scaledData = data.map((d) => ({
    ...d,
    displayPrice: currency === 'AED'
      ? (d.price / 31.1034768) * AED_PER_USD
      : d.price / 31.1034768,
  }));

  const prices = scaledData.map((d) => d.displayPrice);
  const min = Math.min(...prices) * 0.985;
  const max = Math.max(...prices) * 1.015;

  const width = 480;
  const height = 150;
  const paddingLeft = 52;
  const paddingRight = 10;
  const paddingTop = 22;
  const paddingBottom = 22;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = scaledData.map((d, i) => {
    const x = paddingLeft + (i / (scaledData.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.displayPrice - min) / (max - min)) * chartHeight;
    return { x, y, ...d };
  });

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

  const sym = currency === 'AED' ? 'د.إ' : '$';

  return (
    <div className="relative w-full select-none pt-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
        onTouchEnd={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.28} />
            <stop offset="100%" stopColor={gradientFrom} stopOpacity={0.0} />
          </linearGradient>
        </defs>

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
              x={paddingLeft - 4}
              y={t.y + 3.5}
              textAnchor="end"
              className="text-[9px] fill-gray-400 font-sans font-medium"
            >
              {sym}{t.val < 100 ? t.val.toFixed(1) : Math.round(t.val).toLocaleString('en-US')}
            </text>
          </g>
        ))}

        <path d={areaD} fill={`url(#${gradientId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

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
        if (isNearRight) xOffset = '-95%';
        else if (isNearLeft) xOffset = '-5%';

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
            <span className="font-bold text-white">
              {sym}{pt.displayPrice.toFixed(2)} {currency}
            </span>
          </div>
        );
      })()}
    </div>
  );
}
