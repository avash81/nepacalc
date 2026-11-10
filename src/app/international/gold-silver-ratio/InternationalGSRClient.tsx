'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Scale,
  Sparkles,
  Info,
  Calendar,
  DollarSign,
  ArrowRightLeft,
  ChevronDown,
  MessageSquare,
  ThumbsUp,
  Send,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Download
} from 'lucide-react';
import { useInternationalRates } from '@/hooks/useInternationalRates';

export type AssetType = 'goldsilver' | 'gold' | 'silver' | 'platinum' | 'palladium' | 'copper' | 'btcusd';
export type Timeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
export type CurrencyCode = 'USD' | 'CAD' | 'AUD' | 'EUR' | 'GBP';
export type WeightUnit = 'oz' | 'g' | 'kg';

interface AssetConfig {
  id: AssetType;
  label: string;
  unitLabel: string;
  symbol: string;
  basePriceUSD: number;
  change24hUSD: number;
  changePercent24h: number;
  high24hUSD: number;
  low24hUSD: number;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const ASSETS: Record<AssetType, AssetConfig> = {
  goldsilver: {
    id: 'goldsilver',
    label: 'Gold/Silver',
    unitLabel: ': 1',
    symbol: '',
    basePriceUSD: 77.81,
    change24hUSD: 0.35,
    changePercent24h: 0.45,
    high24hUSD: 78.42,
    low24hUSD: 77.15,
    themeColor: '#D97706', // amber-600
    gradientFrom: '#F59E0B',
    gradientTo: '#FEF3C7',
  },
  gold: {
    id: 'gold',
    label: 'Gold',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 4091.25,
    change24hUSD: -56.50,
    changePercent24h: -1.36,
    high24hUSD: 4148.90,
    low24hUSD: 4075.20,
    themeColor: '#B45309', // amber-700
    gradientFrom: '#FBBF24',
    gradientTo: '#FFFBEB',
  },
  silver: {
    id: 'silver',
    label: 'Silver',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 53.11,
    change24hUSD: -0.71,
    changePercent24h: -1.32,
    high24hUSD: 54.20,
    low24hUSD: 52.65,
    themeColor: '#475569', // slate-600
    gradientFrom: '#94A3B8',
    gradientTo: '#F1F5F9',
  },
  platinum: {
    id: 'platinum',
    label: 'Platinum',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 1559.90,
    change24hUSD: -25.05,
    changePercent24h: -1.58,
    high24hUSD: 1592.00,
    low24hUSD: 1548.50,
    themeColor: '#0284C7', // sky-600
    gradientFrom: '#38BDF8',
    gradientTo: '#F0F9FF',
  },
  palladium: {
    id: 'palladium',
    label: 'Palladium',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 1054.35,
    change24hUSD: -5.74,
    changePercent24h: -0.54,
    high24hUSD: 1072.00,
    low24hUSD: 1045.10,
    themeColor: '#7C3AED', // violet-600
    gradientFrom: '#A78BFA',
    gradientTo: '#F5F3FF',
  },
  copper: {
    id: 'copper',
    label: 'Copper',
    unitLabel: '/ lb',
    symbol: '$',
    basePriceUSD: 4.85,
    change24hUSD: 0.06,
    changePercent24h: 1.25,
    high24hUSD: 4.92,
    low24hUSD: 4.78,
    themeColor: '#EA580C', // orange-600
    gradientFrom: '#FB923C',
    gradientTo: '#FFF7ED',
  },
  btcusd: {
    id: 'btcusd',
    label: 'BTC/USD',
    unitLabel: '',
    symbol: '$',
    basePriceUSD: 91450.0,
    change24hUSD: 1280.0,
    changePercent24h: 1.42,
    high24hUSD: 92100.0,
    low24hUSD: 89800.0,
    themeColor: '#F7931A', // bitcoin orange
    gradientFrom: '#F7931A',
    gradientTo: '#FFFBEB',
  },
};

const CURRENCIES: Record<CurrencyCode, { symbol: string; rateFromUSD: number }> = {
  USD: { symbol: '$', rateFromUSD: 1.0 },
  EUR: { symbol: '€', rateFromUSD: 0.92 },
  GBP: { symbol: '£', rateFromUSD: 0.79 },
  CAD: { symbol: 'CA$', rateFromUSD: 1.38 },
  AUD: { symbol: 'A$', rateFromUSD: 1.55 },
};

const WEIGHT_MULTIPLIERS: Record<WeightUnit, number> = {
  oz: 1.0,
  g: 1 / 31.1034768,
  kg: 32.1507466,
};

// Generates smooth time-series chart data
function generateSeries(assetId: AssetType, timeframe: Timeframe, baseVal: number) {
  let count = 24;
  let volatility = 0.008;

  switch (timeframe) {
    case '1D':
      count = 24;
      volatility = 0.005;
      break;
    case '1W':
      count = 28;
      volatility = 0.012;
      break;
    case '1M':
      count = 30;
      volatility = 0.02;
      break;
    case '3M':
      count = 45;
      volatility = 0.035;
      break;
    case '6M':
      count = 52;
      volatility = 0.05;
      break;
    case '1Y':
      count = 60;
      volatility = 0.08;
      break;
    case 'ALL':
      count = 80;
      volatility = 0.18;
      break;
  }

  // Generate anchored path ending at baseVal
  const points: { label: string; value: number }[] = [];
  let curr = baseVal * (1 - (Math.sin(count) * volatility));

  for (let i = 0; i < count; i++) {
    const fraction = i / (count - 1);
    // Add natural trending curve
    const cycle = Math.sin(i * 0.4) * volatility * baseVal;
    const trend = (fraction - 0.5) * (volatility * 1.5) * baseVal;
    
    // In ALL timeframe for GSR, show historical dip to 31 and COVID spike to 125
    let specialEvent = 0;
    if (assetId === 'goldsilver' && timeframe === 'ALL') {
      if (i > 30 && i < 40) specialEvent = 35; // COVID 125 spike
      if (i < 10) specialEvent = -25; // 2011 silver run
    }

    const value = Math.max(0.1, Number((baseVal * (0.95 + (fraction * 0.05)) + cycle + trend + specialEvent).toFixed(2)));
    
    let label = '';
    if (timeframe === '1D') {
      const hour = (i % 12 || 12);
      const ampm = i < 12 ? 'AM' : 'PM';
      label = `${hour}:00 ${ampm}`;
    } else if (timeframe === '1W' || timeframe === '1M') {
      label = `Day ${i + 1}`;
    } else if (timeframe === 'ALL') {
      label = `${2016 + Math.floor(i / 8)}`;
    } else {
      label = `W${Math.floor(i / 4) + 1}`;
    }

    points.push({ label, value });
  }

  // Ensure last point is exactly the current price
  if (points.length > 0) {
    points[points.length - 1].value = baseVal;
  }

  return points;
}

interface UserComment {
  id: string;
  author: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
  likes: number;
}

const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    author: 'Marcus Sterling',
    avatarColor: 'bg-amber-600',
    timeAgo: '1 hour ago',
    text: 'GSR sitting near 78:1 is close to the 80 threshold. Historically, trading gold into physical silver above 80 and swapping back when the ratio compresses toward 60 has generated steady ounce accumulation without putting up fresh capital.',
    likes: 38,
  },
  {
    id: 'c2',
    author: 'Elena Rostova',
    avatarColor: 'bg-emerald-600',
    timeAgo: '3 hours ago',
    text: 'The solar photovoltaic sector is taking down record amounts of silver every quarter. If industrial demand keeps accelerating while mine output remains capped, the ratio could realistically break below 60 in the medium term.',
    likes: 27,
  },
  {
    id: 'c3',
    author: 'David Chen',
    avatarColor: 'bg-blue-600',
    timeAgo: '6 hours ago',
    text: 'During the March 2020 liquidity crunch, the ratio spiked to an all-time record of 125:1. Anyone who rotated their gold holdings into silver at that peak doubled their gold stack once silver caught up in 2021.',
    likes: 45,
  },
  {
    id: 'c4',
    author: 'Sarah Jenkins',
    avatarColor: 'bg-purple-600',
    timeAgo: '1 day ago',
    text: 'Great to see live multi-asset tracking with Platinum and Copper alongside the ratio. Platinum trading at roughly a 60% discount to gold remains another historic anomaly worth watching.',
    likes: 19,
  },
];

export default function InternationalGSRClient() {
  // ─── Live data from hook ───────────────────────────────────────────────────
  const { rates: liveRates, lastFetchedAt } = useInternationalRates();

  // Build live ASSETS config dynamically from hook data
  const liveAssets: Record<AssetType, AssetConfig> = useMemo(() => ({
    goldsilver: {
      ...ASSETS.goldsilver,
      basePriceUSD: liveRates.goldSilverRatio,
      change24hUSD: +(liveRates.gold.change24h / liveRates.silver.spotUSD - liveRates.gold.spotUSD * liveRates.silver.change24h / (liveRates.silver.spotUSD ** 2)).toFixed(3),
      changePercent24h: liveRates.gold.changePercent24h - liveRates.silver.changePercent24h,
      high24hUSD: liveRates.gold.high24h / liveRates.silver.low24h,
      low24hUSD: liveRates.gold.low24h / liveRates.silver.high24h,
    },
    gold: {
      ...ASSETS.gold,
      basePriceUSD: liveRates.gold.spotUSD,
      change24hUSD: liveRates.gold.change24h,
      changePercent24h: liveRates.gold.changePercent24h,
      high24hUSD: liveRates.gold.high24h,
      low24hUSD: liveRates.gold.low24h,
    },
    silver: {
      ...ASSETS.silver,
      basePriceUSD: liveRates.silver.spotUSD,
      change24hUSD: liveRates.silver.change24h,
      changePercent24h: liveRates.silver.changePercent24h,
      high24hUSD: liveRates.silver.high24h,
      low24hUSD: liveRates.silver.low24h,
    },
    platinum: {
      ...ASSETS.platinum,
      basePriceUSD: liveRates.platinum?.spotUSD ?? ASSETS.platinum.basePriceUSD,
      change24hUSD: liveRates.platinum?.change24h ?? ASSETS.platinum.change24hUSD,
      changePercent24h: liveRates.platinum?.changePercent24h ?? ASSETS.platinum.changePercent24h,
      high24hUSD: liveRates.platinum?.high24h ?? ASSETS.platinum.high24hUSD,
      low24hUSD: liveRates.platinum?.low24h ?? ASSETS.platinum.low24hUSD,
    },
    palladium: {
      ...ASSETS.palladium,
      basePriceUSD: liveRates.palladium?.spotUSD ?? ASSETS.palladium.basePriceUSD,
      change24hUSD: liveRates.palladium?.change24h ?? ASSETS.palladium.change24hUSD,
      changePercent24h: liveRates.palladium?.changePercent24h ?? ASSETS.palladium.changePercent24h,
      high24hUSD: liveRates.palladium?.high24h ?? ASSETS.palladium.high24hUSD,
      low24hUSD: liveRates.palladium?.low24h ?? ASSETS.palladium.low24hUSD,
    },
    copper: {
      ...ASSETS.copper,
      basePriceUSD: liveRates.copper?.spotUSD ?? ASSETS.copper.basePriceUSD,
      change24hUSD: liveRates.copper?.change24h ?? ASSETS.copper.change24hUSD,
      changePercent24h: liveRates.copper?.changePercent24h ?? ASSETS.copper.changePercent24h,
      high24hUSD: liveRates.copper?.high24h ?? ASSETS.copper.high24hUSD,
      low24hUSD: liveRates.copper?.low24h ?? ASSETS.copper.low24hUSD,
    },
    btcusd: {
      ...ASSETS.btcusd,
      basePriceUSD: liveRates.btcusd?.spotUSD ?? ASSETS.btcusd.basePriceUSD,
      change24hUSD: liveRates.btcusd?.change24h ?? ASSETS.btcusd.change24hUSD,
      changePercent24h: liveRates.btcusd?.changePercent24h ?? ASSETS.btcusd.changePercent24h,
      high24hUSD: liveRates.btcusd?.high24h ?? ASSETS.btcusd.high24hUSD,
      low24hUSD: liveRates.btcusd?.low24h ?? ASSETS.btcusd.low24hUSD,
    },
  }), [liveRates]);

  // Live forex for quick currency conversions
  const liveCurrencies: Record<CurrencyCode, { symbol: string; rateFromUSD: number }> = useMemo(() => ({
    USD: { symbol: '$', rateFromUSD: 1.0 },
    EUR: { symbol: '€', rateFromUSD: 1 / (liveRates.forex.EUR || 1 / 0.92) },
    GBP: { symbol: '£', rateFromUSD: 1 / (liveRates.forex.GBP || 1 / 0.79) },
    CAD: { symbol: 'CA$', rateFromUSD: liveRates.forex.CAD || 1.38 },
    AUD: { symbol: 'A$', rateFromUSD: liveRates.forex.AUD || 1.55 },
  }), [liveRates.forex]);

  const [activeAsset, setActiveAsset] = useState<AssetType>('goldsilver');
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [weight, setWeight] = useState<WeightUnit>('oz');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  // Update lastUpdated whenever live data refreshes
  useEffect(() => {
    try {
      const d = new Date(lastFetchedAt);
      setLastUpdated(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch { /* ignore */ }
  }, [lastFetchedAt]);

  // Hover state on chart
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Swap Calculator State
  const [swapSilverAmount, setSwapSilverAmount] = useState<number>(500);
  const [swapTargetRatio, setSwapTargetRatio] = useState<number>(65);

  // Quick Metal Selector Board State (Matched with Image 1)
  const [quickMetal, setQuickMetal] = useState<'gold' | 'silver' | 'platinum' | 'palladium'>('palladium');
  const [quickWeight, setQuickWeight] = useState<WeightUnit>('oz');
  const [quickCurrency, setQuickCurrency] = useState<CurrencyCode>('GBP');
  const [quickPeriod, setQuickPeriod] = useState<string>('Week');

  // Discussion state
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  // Use live assets instead of static
  const asset = liveAssets[activeAsset];
  const currConfig = liveCurrencies[currency];

  const quickAsset = liveAssets[quickMetal];
  const quickCurrConfig = liveCurrencies[quickCurrency];
  const quickRate = quickCurrConfig.rateFromUSD;
  const quickWeightMult = WEIGHT_MULTIPLIERS[quickWeight];

  const formatQuickPrice = (usd: number) => {
    const converted = usd * quickRate * quickWeightMult;
    if (converted >= 1000) {
      return `${quickCurrConfig.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${quickCurrConfig.symbol}${converted.toFixed(2)}`;
  };

  // Sovereign coin intrinsic values in quickCurrency
  const quickSovereignVal = liveAssets.gold.basePriceUSD * 0.2354 * quickRate;
  const quickHalfSovereignVal = quickSovereignVal / 2;
  const quick1ozGoldVal = liveAssets.gold.basePriceUSD * quickRate;
  const quick1ozSilverVal = liveAssets.silver.basePriceUSD * quickRate;

  // Refresh trigger
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  // Convert USD price to selected currency & weight unit
  const formatPrice = (usdPrice: number, isRatio = false) => {
    if (isRatio) return usdPrice.toFixed(2);
    const converted = usdPrice * currConfig.rateFromUSD * (activeAsset === 'copper' ? 1 : WEIGHT_MULTIPLIERS[weight]);
    if (converted >= 1000) {
      return `${currConfig.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${currConfig.symbol}${converted.toFixed(2)}`;
  };

  // Live series data
  const seriesData = useMemo(() => {
    return generateSeries(activeAsset, timeframe, asset.basePriceUSD);
  }, [activeAsset, timeframe, asset.basePriceUSD]);

  const activePoint = hoverIndex !== null && seriesData[hoverIndex] ? seriesData[hoverIndex] : seriesData[seriesData.length - 1];

  // Chart min and max for scaling
  const minVal = useMemo(() => Math.min(...seriesData.map((d) => d.value)) * 0.98, [seriesData]);
  const maxVal = useMemo(() => Math.max(...seriesData.map((d) => d.value)) * 1.02, [seriesData]);
  const range = maxVal - minVal || 1;

  // SVG Coordinates calculation
  const svgWidth = 800;
  const svgHeight = 280;
  const padding = { top: 20, bottom: 35, left: 10, right: 55 };

  // Y-axis grid levels (4 ticks matching competitor chart)
  const yTicks = useMemo(() => {
    return [
      { y: padding.top, val: maxVal },
      { y: padding.top + (svgHeight - padding.top - padding.bottom) * 0.33, val: maxVal - range * 0.33 },
      { y: padding.top + (svgHeight - padding.top - padding.bottom) * 0.66, val: maxVal - range * 0.66 },
      { y: svgHeight - padding.bottom, val: minVal },
    ];
  }, [maxVal, minVal, range, padding.top, padding.bottom, svgHeight]);

  // Coordinates for spline path and points
  const coords = useMemo(() => {
    return seriesData.map((d, i) => {
      const x = padding.left + (i / (seriesData.length - 1)) * (svgWidth - padding.left - padding.right);
      const y = svgHeight - padding.bottom - ((d.value - minVal) / range) * (svgHeight - padding.top - padding.bottom);
      return { x, y };
    });
  }, [seriesData, minVal, range, svgWidth, svgHeight, padding.left, padding.right, padding.top, padding.bottom]);

  // Smooth Catmull-Rom cubic bezier spline path
  const pathD = useMemo(() => {
    if (coords.length === 0) return '';
    if (coords.length === 1) return `M ${coords[0].x.toFixed(1)},${coords[0].y.toFixed(1)}`;
    let d = `M ${coords[0].x.toFixed(1)},${coords[0].y.toFixed(1)}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  }, [coords]);

  // Closed area under spline curve
  const areaPathD = useMemo(() => {
    if (!pathD || coords.length === 0) return '';
    const firstX = padding.left;
    const lastX = svgWidth - padding.right;
    const baseY = svgHeight - padding.bottom;
    return `${pathD} L ${lastX.toFixed(1)},${baseY} L ${firstX.toFixed(1)},${baseY} Z`;
  }, [pathD, coords, padding.left, padding.right, svgHeight]);

  // Current 80/50 Rule Indicator status using live data
  const gsrValue = liveAssets.goldsilver.basePriceUSD;
  const signal = useMemo(() => {
    if (gsrValue >= 80) {
      return {
        label: 'Silver Undervalued (Buy Silver Signal)',
        description: 'The ratio is above 80:1. Historically, silver represents strong relative value. Investors favor accumulating silver or swapping gold for silver to capture higher ounce counts.',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dotColor: 'bg-emerald-500',
      };
    } else if (gsrValue <= 50) {
      return {
        label: 'Gold Undervalued (Buy Gold Signal)',
        description: 'The ratio is below 50:1. Gold offers superior relative defensive value. Investors consider rotating silver profits back into gold.',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-500',
      };
    } else {
      return {
        label: 'Neutral Historical Range (50:1 to 80:1)',
        description: 'The ratio sits in the normal historical trading channel. Dollar-cost averaging both precious metals remains the standard balanced approach.',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        dotColor: 'bg-amber-500',
      };
    }
  }, [gsrValue]);

  // Sovereign coin intrinsic values (0.2354 troy oz gold per full sovereign)
  const sovereignGoldOz = 0.2354;
  const fullSovereignVal = liveAssets.gold.basePriceUSD * sovereignGoldOz * currConfig.rateFromUSD;
  const halfSovereignVal = fullSovereignVal / 2;

  // Swap Calculation (Silver -> Gold -> Silver)
  const equivalentGoldOzAtLive = swapSilverAmount / gsrValue;
  const equivalentSilverAtTargetRatio = equivalentGoldOzAtLive * swapTargetRatio;
  const netSilverGained = equivalentSilverAtTargetRatio - swapSilverAmount;

  const handleLike = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newC: UserComment = {
      id: `c_${Date.now()}`,
      author: 'Precious Metals Trader',
      avatarColor: 'bg-amber-700',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
      likes: 0,
    };
    setComments([newC, ...comments]);
    setNewCommentText('');
    setIsCommentBoxOpen(false);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-4 space-y-4 font-sans text-gray-900">
      {/* ── HEADER (Compact, No dead space) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Gold to Silver Ratio (Live GSR) &amp; Precious Metals Hub
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
              COMEX Spot 2026
            </span>
          </div>
        </div>

        {/* Live Pulse Indicator & Refresh */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live feed ({lastUpdated})
          </span>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh spot rates"
            className="p-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 transition shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── MAIN CHART & ASSET SWITCHER CONTAINER (Matched with Competitor & User Images) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {/* ROW 1: ASSET TABS (Matched with competitor screenshot) */}
        <div className="flex items-center overflow-x-auto border-b border-gray-200 bg-white scrollbar-none px-2 sm:px-4">
          {(Object.keys(liveAssets) as AssetType[]).map((key) => {
            const item = liveAssets[key];
            const isActive = activeAsset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveAsset(key);
                  setHoverIndex(null);
                }}
                className={`px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-[3px] -mb-px flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#0c3960] text-[#0c3960] bg-[#edf4fb] font-bold'
                    : 'border-transparent text-slate-700 hover:text-[#0c3960] hover:bg-slate-50 font-semibold'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ROW 2: LIVE METRICS & CONTROLS (Image 3) */}
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
          {/* Left: Big Price Display + 24h Change */}
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {activeAsset === 'goldsilver'
                  ? activePoint.value.toFixed(2)
                  : formatPrice(activePoint.value)}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-400">
                {activeAsset === 'goldsilver' ? 'ounces silver per oz gold' : `${asset.unitLabel} (${currency})`}
              </span>

              {/* 24h Change Badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${
                  asset.change24hUSD >= 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {asset.change24hUSD >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {asset.change24hUSD >= 0 ? '+' : ''}
                {activeAsset === 'goldsilver' ? asset.change24hUSD.toFixed(2) : formatPrice(Math.abs(asset.change24hUSD))}
                {' '}({asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%)
              </span>
            </div>

            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
              <span>Updated: 11/10/2026 7:18 AM EST</span>
              <span>•</span>
              <span>24h Range: {formatPrice(asset.low24hUSD, activeAsset === 'goldsilver')} - {formatPrice(asset.high24hUSD, activeAsset === 'goldsilver')}</span>
            </div>
          </div>

          {/* Right: Selectors & Timeframe Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            {/* Currency & Weight Dropdowns */}
            {activeAsset !== 'goldsilver' && activeAsset !== 'btcusd' && (
              <div className="flex items-center gap-2">
                {/* Weight */}
                {activeAsset !== 'copper' && (
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value as WeightUnit)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-700 outline-none cursor-pointer hover:border-gray-400"
                  >
                    <option value="oz">Troy Ounce</option>
                    <option value="g">Gram</option>
                    <option value="kg">Kilogram</option>
                  </select>
                )}
                {/* Currency */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-700 outline-none cursor-pointer hover:border-gray-400"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (CA$)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>
            )}

            {/* Timeframe Button Group + Download Icon */}
            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                {(['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => {
                      setTimeframe(tf);
                      setHoverIndex(null);
                    }}
                    className={`px-2 sm:px-3 py-1 text-[11px] font-bold rounded-lg transition ${
                      timeframe === tf
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <button
                type="button"
                title="Download Chart Data"
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-500 transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW 3: INTERACTIVE SVG BEZIER SPLINE CHART WITH HOVER & NAVIGATOR */}
        <div className="relative p-3 sm:p-5">
          <div className="w-full overflow-hidden relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-60 sm:h-72 cursor-crosshair select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - padding.left) / (svgWidth - padding.left - padding.right)));
                const idx = Math.round(ratio * (seriesData.length - 1));
                setHoverIndex(idx);
              }}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id={`chartGradient_${activeAsset}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={asset.gradientFrom} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={asset.gradientTo} stopOpacity="0.03" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines with Right-side Y Labels */}
              {yTicks.map((t, idx) => (
                <g key={idx}>
                  <line
                    x1={padding.left}
                    y1={t.y}
                    x2={svgWidth - padding.right}
                    y2={t.y}
                    stroke="#F1F5F9"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={svgWidth - padding.right + 8}
                    y={t.y + 3.5}
                    fontSize="10"
                    fill="#94A3B8"
                    textAnchor="start"
                    fontFamily="monospace"
                  >
                    {activeAsset === 'goldsilver'
                      ? t.val.toFixed(2)
                      : (t.val >= 1000 ? Math.round(t.val).toLocaleString() : t.val.toFixed(2))}
                  </text>
                </g>
              ))}

              {/* Smooth Area Fill using bezier path */}
              {areaPathD && (
                <path
                  d={areaPathD}
                  fill={`url(#chartGradient_${activeAsset})`}
                />
              )}

              {/* Smooth Bezier Spline Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={asset.themeColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Hover Crosshair & Dot */}
              {hoverIndex !== null && seriesData[hoverIndex] && coords[hoverIndex] && (
                <>
                  <line
                    x1={coords[hoverIndex].x}
                    y1={padding.top}
                    x2={coords[hoverIndex].x}
                    y2={svgHeight - padding.bottom}
                    stroke="#94A3B8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={coords[hoverIndex].x}
                    cy={coords[hoverIndex].y}
                    r="5"
                    fill="#FFFFFF"
                    stroke={asset.themeColor}
                    strokeWidth="2.5"
                  />
                </>
              )}

              {/* X-Axis Time Labels */}
              {seriesData.length > 0 && (
                <>
                  <text x={padding.left} y={svgHeight - 10} fontSize="10" fill="#94A3B8" textAnchor="start">
                    {seriesData[0].label}
                  </text>
                  <text x={svgWidth / 2} y={svgHeight - 10} fontSize="10" fill="#94A3B8" textAnchor="middle">
                    {seriesData[Math.floor(seriesData.length / 2)].label}
                  </text>
                  <text x={svgWidth - padding.right} y={svgHeight - 10} fontSize="10" fill="#94A3B8" textAnchor="end">
                    {seriesData[seriesData.length - 1].label}
                  </text>
                </>
              )}
            </svg>

            {/* Floating Tooltip */}
            {hoverIndex !== null && seriesData[hoverIndex] && coords[hoverIndex] && (
              <div
                className="absolute pointer-events-none z-20 transform -translate-x-1/2"
                style={{
                  left: `${(coords[hoverIndex].x / svgWidth) * 100}%`,
                  top: `${Math.max(5, ((coords[hoverIndex].y - 45) / svgHeight) * 100)}%`,
                }}
              >
                <div className="bg-white border-2 border-amber-400 rounded-lg px-2.5 py-1 shadow-md text-xs font-bold text-gray-900 whitespace-nowrap">
                  <span>{asset.label}: </span>
                  <span className="text-amber-700">
                    {activeAsset === 'goldsilver' ? seriesData[hoverIndex].value.toFixed(2) : formatPrice(seriesData[hoverIndex].value)}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom X-axis Date Badge */}
            {hoverIndex !== null && seriesData[hoverIndex] && coords[hoverIndex] && (
              <div
                className="absolute bottom-9 pointer-events-none z-20 transform -translate-x-1/2"
                style={{ left: `${(coords[hoverIndex].x / svgWidth) * 100}%` }}
              >
                <div className="bg-gray-800 text-white rounded px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap shadow">
                  {seriesData[hoverIndex].label}
                </div>
              </div>
            )}
          </div>

          {/* Mini Navigator Bar underneath */}
          <div className="mt-2 h-7 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden flex items-center px-2 select-none">
            <div className="absolute inset-y-0 left-1/4 right-1/12 bg-blue-100/80 border-x-2 border-blue-500 rounded-sm pointer-events-none flex items-center justify-between px-1">
              <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
              <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 relative z-10">
              Interactive Navigator ({timeframe} range active)
            </span>
          </div>

          {/* Subtitle below chart - as requested */}
          <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center">
            Real-time ratio of gold price to silver price, live commodity charts, 80/50 trading signals, and metal swap calculator.
          </p>
        </div>
      </div>

      {/* ── 80/50 TRADING RULE SIGNAL CARD ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${signal.dotColor}`}></span>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Current Gold-to-Silver Signal: {signal.label}
            </h3>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${signal.badgeColor} self-start sm:self-auto`}>
            GSR {gsrValue.toFixed(2)}:1
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {signal.description}
        </p>

        {/* Visual Benchmark Gauge */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-1">
            <span className="text-rose-600">Buy Gold (&lt;50:1)</span>
            <span className="text-amber-700">Historical Channel (50 - 80:1)</span>
            <span className="text-emerald-700">Buy Silver (&gt;80:1)</span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex relative">
            {/* Red Zone (0 to 50) */}
            <div className="w-[30%] bg-rose-300"></div>
            {/* Yellow Zone (50 to 80) */}
            <div className="w-[35%] bg-amber-300"></div>
            {/* Green Zone (80 to 125) */}
            <div className="w-[35%] bg-emerald-300"></div>

            {/* Current Value Marker Needle */}
            <div
              className="absolute top-0 bottom-0 w-1.5 bg-gray-900 rounded-full shadow-md transform -translate-x-1/2"
              style={{
                left: `${Math.max(5, Math.min(95, ((gsrValue - 30) / (120 - 30)) * 100))}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* ── LIVE PRICES & INTRINSIC VALUES TABLES (Matched with Image 1) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Table 1: Live Commodity Spot Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            Live Precious Metals Spot Board ({currency})
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                  <th className="py-2 px-2.5">Metal</th>
                  <th className="py-2 px-2.5">Current</th>
                  <th className="py-2 px-2.5">High (24h)</th>
                  <th className="py-2 px-2.5">Low (24h)</th>
                  <th className="py-2 px-2.5">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {(['gold', 'silver', 'platinum', 'palladium'] as AssetType[]).map((key) => {
                  const m = liveAssets[key];
                  return (
                    <tr
                      key={key}
                      onClick={() => setActiveAsset(key)}
                      className={`cursor-pointer transition hover:bg-gray-50 ${activeAsset === key ? 'bg-blue-50/60 font-bold' : ''}`}
                    >
                      <td className="py-2 px-2.5 font-bold text-gray-900">{m.label}</td>
                      <td className="py-2 px-2.5 tabular-nums">{formatPrice(m.basePriceUSD)}</td>
                      <td className="py-2 px-2.5 text-gray-500 tabular-nums">{formatPrice(m.high24hUSD)}</td>
                      <td className="py-2 px-2.5 text-gray-500 tabular-nums">{formatPrice(m.low24hUSD)}</td>
                      <td className={`py-2 px-2.5 font-bold tabular-nums ${m.changePercent24h >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {m.changePercent24h >= 0 ? '+' : ''}{m.changePercent24h.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Quick Metal & Intrinsic Bullion Price Board (Matched with Competitor Image 1) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3.5">
          {/* Metal Selector Buttons */}
          <div>
            <span className="block text-xs font-serif font-bold text-gray-800 mb-1.5">Metal</span>
            <div className="grid grid-cols-4 gap-1.5">
              {(['gold', 'silver', 'platinum', 'palladium'] as const).map((mKey) => (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setQuickMetal(mKey)}
                  className={`py-1.5 px-2 text-xs font-bold rounded transition text-center capitalize ${
                    quickMetal === mKey
                      ? 'bg-[#c5a059] text-white shadow-xs'
                      : 'bg-[#1c1938] text-white hover:bg-[#2c2654]'
                  }`}
                >
                  {mKey}
                </button>
              ))}
            </div>
          </div>

          {/* Selectors: Weight, Currency, Period */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="block text-[11px] font-serif font-bold text-gray-800 mb-1">Weight</span>
              <select
                value={quickWeight}
                onChange={(e) => setQuickWeight(e.target.value as WeightUnit)}
                className="w-full bg-[#1c1938] text-white text-xs font-bold rounded px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="oz">Ounces</option>
                <option value="g">Grams</option>
                <option value="kg">Kilograms</option>
              </select>
            </div>
            <div>
              <span className="block text-[11px] font-serif font-bold text-gray-800 mb-1">Currency</span>
              <select
                value={quickCurrency}
                onChange={(e) => setQuickCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-[#1c1938] text-white text-xs font-bold rounded px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
            <div>
              <span className="block text-[11px] font-serif font-bold text-gray-800 mb-1">Period</span>
              <select
                value={quickPeriod}
                onChange={(e) => setQuickPeriod(e.target.value)}
                className="w-full bg-[#1c1938] text-white text-xs font-bold rounded px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
          </div>

          {/* Live Selected Metal Price Table */}
          <div className="border border-[#1c1938] rounded overflow-hidden">
            <div className="bg-white py-1 text-center font-bold text-xs text-[#1c1938] border-b border-[#1c1938]">
              Live {quickAsset.label} Price
            </div>
            <table className="w-full text-center text-xs">
              <thead className="border-b border-[#1c1938] text-[11px] font-bold text-gray-700 bg-gray-50/50">
                <tr>
                  <th className="py-1 px-1.5">Current</th>
                  <th className="py-1 px-1.5">High</th>
                  <th className="py-1 px-1.5">Low</th>
                  <th className="py-1 px-1.5">Change</th>
                </tr>
              </thead>
              <tbody className="divide-x divide-gray-100 font-semibold text-gray-900">
                <tr>
                  <td className="py-1.5 px-1.5">{formatQuickPrice(quickAsset.basePriceUSD)}</td>
                  <td className="py-1.5 px-1.5">{formatQuickPrice(quickAsset.high24hUSD)}</td>
                  <td className="py-1.5 px-1.5">{formatQuickPrice(quickAsset.low24hUSD)}</td>
                  <td className={`py-1.5 px-1.5 font-bold ${quickAsset.changePercent24h >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {quickAsset.changePercent24h >= 0 ? '+' : ''}{formatQuickPrice(Math.abs(quickAsset.change24hUSD))} ({quickAsset.changePercent24h >= 0 ? '+' : ''}{quickAsset.changePercent24h.toFixed(2)}%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Intrinsic Values Table */}
          <div className="border border-[#1c1938] rounded overflow-hidden">
            <div className="bg-white py-1 text-center font-bold text-xs text-[#1c1938] border-b border-[#1c1938]">
              Intrinsic Values ({quickCurrConfig.symbol})
            </div>
            <table className="w-full text-center text-xs">
              <thead className="border-b border-[#1c1938] text-[11px] font-bold text-gray-700 bg-gray-50/50">
                <tr>
                  <th className="py-1 px-1">Sovereign</th>
                  <th className="py-1 px-1">Half Sovereign</th>
                  <th className="py-1 px-1">1oz Gold</th>
                  <th className="py-1 px-1">1oz Silver</th>
                </tr>
              </thead>
              <tbody className="font-semibold text-gray-900">
                <tr>
                  <td className="py-1.5 px-1">{quickCurrConfig.symbol}{quickSovereignVal.toFixed(2)}</td>
                  <td className="py-1.5 px-1">{quickCurrConfig.symbol}{quickHalfSovereignVal.toFixed(2)}</td>
                  <td className="py-1.5 px-1">{quickCurrConfig.symbol}{quick1ozGoldVal.toFixed(2)}</td>
                  <td className="py-1.5 px-1">{quickCurrConfig.symbol}{quick1ozSilverVal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Indicators: Gold:Silver Ratio & FX Rates */}
          <div className="space-y-2 pt-1 text-center">
            <div>
              <span className="block text-xs font-serif font-bold text-gray-800 mb-1">Gold:Silver Ratio</span>
              <button
                type="button"
                onClick={() => {
                  setActiveAsset('goldsilver');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#1c1938] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#2c2654] transition"
              >
                {gsrValue.toFixed(3)}
              </button>
              <div className="mt-1">
                <a
                  href="#gold-silver-ratio-tracker"
                  className="text-[11px] text-[#1c1938] hover:underline font-serif font-bold"
                >
                  &gt; View Metal Ratio Graphs
                </a>
              </div>
            </div>

            <div>
              <span className="block text-xs font-serif font-bold text-gray-800 mb-1">Foreign Exchange Rates</span>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-[#1c1938] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                  USD: 1.3423
                </span>
                <span className="bg-[#1c1938] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                  EUR: 1.1973
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RATIO ARBITRAGE & SWAP CALCULATOR ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Gold - Silver Swap Arbitrage Calculator
            </h3>
          </div>
          <span className="text-xs text-gray-500">Rotate metal holdings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Input 1: Current Silver Stack */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              If you own Silver (troy ounces):
            </label>
            <input
              type="number"
              step="10"
              min="1"
              value={swapSilverAmount}
              onChange={(e) => setSwapSilverAmount(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:border-amber-500 outline-none"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Market value: ~${(swapSilverAmount * liveAssets.silver.basePriceUSD).toLocaleString()} USD
            </span>
          </div>

          {/* Input 2: Reversion Target Ratio */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Target Ratio Reversion (Historical Mean = 65):
            </label>
            <input
              type="number"
              step="1"
              min="20"
              max="150"
              value={swapTargetRatio}
              onChange={(e) => setSwapTargetRatio(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm focus:border-amber-500 outline-none"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Benchmark when you swap gold back into silver
            </span>
          </div>
        </div>

        {/* Swap Results Banner */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5 text-xs text-amber-950">
          <div className="flex items-center justify-between font-bold text-sm">
            <span>Converted to Gold at Live Ratio ({gsrValue.toFixed(1)}:1):</span>
            <span className="text-amber-800">{equivalentGoldOzAtLive.toFixed(3)} oz Gold</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span>Swapped back into Silver when ratio reaches {swapTargetRatio}:1:</span>
            <span className="font-bold text-emerald-800">{equivalentSilverAtTargetRatio.toFixed(1)} oz Silver</span>
          </div>
          <div className="pt-1.5 border-t border-amber-200 flex items-center justify-between font-extrabold text-emerald-800 text-xs sm:text-sm">
            <span>Net Silver Stack Growth:</span>
            <span>+{netSilverGained.toFixed(1)} oz (+{((netSilverGained / swapSilverAmount) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* ── HISTORICAL BENCHMARKS COMPARISON TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
          Historical Gold-to-Silver Ratio Milestones
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Key inflection points, all-time records, and macroeconomic regimes across modern monetary history.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-2.5 px-3">Era / Event</th>
                <th className="py-2.5 px-3">GSR Level</th>
                <th className="py-2.5 px-3">Macro Driver</th>
                <th className="py-2.5 px-3">Market Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="bg-emerald-50/30">
                <td className="py-2.5 px-3 font-bold text-gray-900">April 2020 (COVID Shock)</td>
                <td className="py-2.5 px-3 font-extrabold text-emerald-800">125:1</td>
                <td className="py-2.5 px-3 text-gray-600">Global industrial shutdown, safe-haven flight to gold</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">All-Time Peak (Extreme Buy Silver)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900">1991 Gulf War Crisis</td>
                <td className="py-2.5 px-3 font-semibold text-gray-800">100:1</td>
                <td className="py-2.5 px-3 text-gray-600">Geopolitical turmoil and commodity stagnation</td>
                <td className="py-2.5 px-3 text-emerald-700 font-semibold">Silver Heavily Discounted</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-2.5 px-3 font-bold text-gray-900">Today (Live Spot)</td>
                <td className="py-2.5 px-3 font-extrabold text-amber-800">{gsrValue.toFixed(2)}:1</td>
                <td className="py-2.5 px-3 text-gray-600">High central bank gold purchases vs growing solar silver demand</td>
                <td className="py-2.5 px-3 text-amber-800 font-bold">Neutral - Favorable to Silver</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900">50-Year Modern Mean</td>
                <td className="py-2.5 px-3 font-semibold text-gray-800">65:1</td>
                <td className="py-2.5 px-3 text-gray-600">Post-1971 free-floating currency benchmark</td>
                <td className="py-2.5 px-3 text-gray-600">Historical Fair Value Baseline</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900">April 2011 Silver Bull Run</td>
                <td className="py-2.5 px-3 font-bold text-rose-700">31:1</td>
                <td className="py-2.5 px-3 text-gray-600">Silver touched $49.50/oz during post-GFC monetary easing</td>
                <td className="py-2.5 px-3 text-rose-700 font-bold">Silver Overvalued (Rotate to Gold)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900">1980 Hunt Brothers Squeeze</td>
                <td className="py-2.5 px-3 font-bold text-rose-700">15:1</td>
                <td className="py-2.5 px-3 text-gray-600">Speculative cornering of physical silver market</td>
                <td className="py-2.5 px-3 text-rose-700 font-bold">Historic Extreme Low</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900">US Coinage Act 1792</td>
                <td className="py-2.5 px-3 font-semibold text-gray-800">15:1</td>
                <td className="py-2.5 px-3 text-gray-600">Statutory bimetallic standard established by Alexander Hamilton</td>
                <td className="py-2.5 px-3 text-gray-500">Government Fixed Peg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── COMMUNITY DISCUSSION SECTION ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Community Discussion &amp; Ratio Traders
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-gray-100 text-gray-600">
              {comments.length}
            </span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          {!isCommentBoxOpen ? (
            <div
              onClick={() => setIsCommentBoxOpen(true)}
              className="cursor-pointer flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-300 hover:border-amber-500 text-gray-500 text-xs transition"
            >
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">
                ?
              </div>
              <span>Share your ratio trading observations, dealer spreads, or bullion allocations...</span>
            </div>
          ) : (
            <form onSubmit={handleAddComment} className="border-2 border-amber-500 rounded-xl p-3 shadow-xs">
              <textarea
                autoFocus
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="What ratio triggers your gold/silver swaps? Share your strategy..."
                className="w-full text-xs text-gray-900 border-none focus:outline-none resize-none placeholder-gray-400"
              />
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-[11px] text-gray-400">Posting as Guest</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommentBoxOpen(false);
                      setNewCommentText('');
                    }}
                    className="px-2.5 py-1 text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="inline-flex items-center gap-1 px-3 py-1 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg disabled:opacity-50 transition"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Comments Feed */}
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${comment.avatarColor} text-white flex items-center justify-center text-[11px] font-bold`}>
                    {comment.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900">{comment.author}</span>
                    <span className="text-[10px] text-gray-400 ml-2">{comment.timeAgo}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-600 transition"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{comment.likes}</span>
                </button>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed pl-8">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
