'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import Link from 'next/link';
import {
  Coins,
  Scale,
  Calculator,
  X,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Info,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  DollarSign,
  Plane,
  AlertTriangle,
} from 'lucide-react';
import { useInternationalRates } from '@/hooks/useInternationalRates';

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

// ─── Fixed Official UAE Peg ───
const AED_PER_USD = 3.6725;

// ─── Default FX rates (overridden by live hook) ───
const DEFAULT_FX = {
  INR: 25.50,  // AED per 1 INR (approximate)
  PKR: 75.80,
  BDT: 33.59,
  PHP: 17.05,
  USD: 1 / 3.6725,
};

// ─── Baseline Market Benchmark Rates (AED) ───
const GOLD_BENCHMARKS = [
  { karat: '24K Gold', purity: '99.9%', purityFactor: 1.0, gramAED: 495.75, highAED: 497.25, lowAED: 493.00, app: 'Investment Bars & TT Bars' },
  { karat: '22K Gold', purity: '91.6%', purityFactor: 0.9167, gramAED: 459.00, highAED: 460.50, lowAED: 456.50, app: 'Gold Souq Jewellery Standard' },
  { karat: '21K Gold', purity: '87.5%', purityFactor: 0.875, gramAED: 440.25, highAED: 441.50, lowAED: 437.75, app: 'Traditional Arabic Jewellery' },
  { karat: '18K Gold', purity: '75.0%', purityFactor: 0.75, gramAED: 377.25, highAED: 378.50, lowAED: 375.25, app: 'Diamond & Modern Designs' },
  { karat: '14K Gold', purity: '58.5%', purityFactor: 0.585, gramAED: 292.75, highAED: 295.25, lowAED: 291.50, app: 'Western & Mixed Alloy Pieces' },
];

const SILVER_BENCHMARKS = [
  {
    category: '999 Fine Silver',
    purity: '99.9%',
    gramAED: 6.23,
    tolaAED: 72.71,
    ozAED: 193.88,
    kgAED: 6233.43,
    app: 'Pure Investment Bars, Cast Coins, Bullion Storage',
  },
  {
    category: '925 Sterling',
    purity: '92.5%',
    gramAED: 5.77,
    tolaAED: 67.30,
    ozAED: 179.47,
    kgAED: 5765.90,
    app: 'Manufactured Jewellery & Silverware Base Value',
  },
];

const INTRADAY_SESSIONS = [
  { session: 'Morning Open', rate24k: 497.25, rate22k: 460.50, rate18k: 378.50, trend: 'Higher on Asia Spot Open', trendColor: 'text-emerald-700' },
  { session: 'Afternoon Update', rate24k: 493.00, rate22k: 456.50, rate18k: 375.25, trend: 'Softened (-0.85%)', trendColor: 'text-rose-600' },
  { session: 'Evening Current', rate24k: 495.75, rate22k: 459.00, rate18k: 377.25, trend: 'Rebounded +AED 2.75', trendColor: 'text-emerald-700' },
];

// 30-Day Historical Trend Data (for Hero Spline Charts)
const GOLD_30D_HISTORY = [
  { date: '10-01', price: 472.5 },
  { date: '10-08', price: 479.2 },
  { date: '10-15', price: 471.0 },
  { date: '10-27', price: 468.4 },
  { date: '11-03', price: 491.5 },
  { date: '11-10', price: 495.75 },
];

const SILVER_30D_HISTORY = [
  { date: '10-01', price: 5.60 },
  { date: '10-08', price: 5.68 },
  { date: '10-15', price: 5.42 },
  { date: '10-27', price: 5.15 },
  { date: '11-03', price: 6.10 },
  { date: '11-10', price: 6.23 },
];

export default function DubaiGoldClient({ initialData }: Props) {
  // ─── Live data via useInternationalRates hook ───
  const { rates: liveRates, lastFetchedAt } = useInternationalRates();

  // Derive live gold & silver spot in USD, then convert to AED
  // Gold: spot price / troy oz -> per gram -> multiply by AED/USD
  const TROY_OZ_TO_GRAMS = 31.1035;
  const liveGold24kGramAED = (liveRates.gold.spotUSD / TROY_OZ_TO_GRAMS) * AED_PER_USD;
  const liveSilverGramAED = (liveRates.silver.spotUSD / TROY_OZ_TO_GRAMS) * AED_PER_USD;

  // Live change deltas (per gram in AED)
  const liveGoldChangeAED = (liveRates.gold.change24h / TROY_OZ_TO_GRAMS) * AED_PER_USD;
  const liveSilverChangeAED = (liveRates.silver.change24h / TROY_OZ_TO_GRAMS) * AED_PER_USD;

  // Live 30d history (USD prices from international-rates.json, converted to AED/gram)
  const liveGoldHistory = liveRates.history30d.gold.map(d => ({
    date: d.date,
    price: (d.price / TROY_OZ_TO_GRAMS), // keep as USD/gram for chart (chart scales internally)
  }));
  const liveSilverHistory = liveRates.history30d.silver.map(d => ({
    date: d.date,
    price: (d.price / TROY_OZ_TO_GRAMS),
  }));

  // Live FX rates (Foreign currency units per 1 AED)
  // liveRates.forex is foreign units per 1 USD -> divide by AED_PER_USD for units per 1 AED
  const liveFX = {
    INR: (liveRates.forex.INR || DEFAULT_FX.INR * AED_PER_USD) / AED_PER_USD,
    PKR: (liveRates.forex.PKR || DEFAULT_FX.PKR * AED_PER_USD) / AED_PER_USD,
    BDT: (liveRates.forex.BDT || DEFAULT_FX.BDT * AED_PER_USD) / AED_PER_USD,
    PHP: (liveRates.forex.PHP || DEFAULT_FX.PHP * AED_PER_USD) / AED_PER_USD,
    USD: 1 / AED_PER_USD,
  };

  // Format last updated from live data
  const liveUpdatedText = (() => {
    try {
      const d = new Date(lastFetchedAt);
      return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })} | ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GST`;
    } catch { return '10 Nov 2026 | 2:30 pm GST'; }
  })();

  const [data, setData] = useState<DubaiRatesData>(initialData);
  const [currency, setCurrency] = useState<'AED' | 'USD'>('AED');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState(liveUpdatedText);
  const [showNotice, setShowNotice] = useState(false);

  // Update displayed timestamp when live data refreshes
  useEffect(() => {
    setLastRefreshedText(liveUpdatedText);
  }, [lastFetchedAt]);

  // Hero Unit Selection: strictly 'tola' | '10g' matching reference design
  const [heroUnit, setHeroUnit] = useState<'tola' | '10g'>('tola');

  // Flagship Modal Calculator State (Matched with Image 2)
  const [isModalCalculatorOpen, setIsModalCalculatorOpen] = useState(false);
  const [modalMetal, setModalMetal] = useState<'gold' | 'silver'>('gold');
  const [modalUnit, setModalUnit] = useState<'tola_lal' | 'tola' | '10g'>('tola_lal');
  const [modalKarat, setModalKarat] = useState<string>('24K Gold');
  const [modalTolaQty, setModalTolaQty] = useState<string>('1');
  const [modalLalQty, setModalLalQty] = useState<string>('0');
  const [modalSimpleQty, setModalSimpleQty] = useState<string>('1');

  // Supplementary Calculator Tab in Section D
  const [calcTab, setCalcTab] = useState<'jewellery' | 'melt' | 'silver' | 'vat'>('jewellery');

  // Calculator 1: Retail Jewellery Cost Estimator State
  const [jewelWeight, setJewelWeight] = useState<number>(15);
  const [jewelKarat, setJewelKarat] = useState<string>('22K Gold');
  const [jewelMakingPerGram, setJewelMakingPerGram] = useState<number>(25);
  const [jewelApplyVat, setJewelApplyVat] = useState<boolean>(true);

  // Calculator 2: Melt Value State
  const [meltWeight, setMeltWeight] = useState<number>(10);
  const [meltUnit, setMeltUnit] = useState<'gram' | 'tola' | 'oz' | 'kg'>('gram');
  const [meltKarat, setMeltKarat] = useState<string>('22K Gold');

  // Calculator 3: Silver Converter State
  const [silverWeight, setSilverWeight] = useState<number>(50);
  const [silverType, setSilverType] = useState<'999' | '925'>('999');

  // Calculator 4: Tourist VAT Refund State
  const [vatPurchaseAmount, setVatPurchaseAmount] = useState<number>(5000);

  // Unit Gram Multipliers
  const unitMultipliers: Record<string, { label: string; grams: number }> = {
    gram: { label: 'Per Gram', grams: 1 },
    '10g': { label: 'Per 10 Grams', grams: 10 },
    tola: { label: 'Per Tola', grams: 11.6638 },
    oz: { label: 'Per Troy Ounce', grams: 31.1035 },
  };

  const activeUnitInfo = unitMultipliers[heroUnit];

  // Refresh handler - triggers re-fetch and updates timestamp
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Bust cache by refetching
    fetch('/data/international-rates.json', { cache: 'no-store' })
      .then(r => r.json())
      .then(() => {
        const now = new Date();
        setLastRefreshedText(`${now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GST`);
        setIsRefreshing(false);
      })
      .catch(() => {
        const now = new Date();
        setLastRefreshedText(`${now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GST`);
        setIsRefreshing(false);
      });
  }, []);

  // Currency formatter
  const formatCur = (valAED: number) => {
    if (currency === 'USD') {
      const valUSD = valAED / AED_PER_USD;
      return `$${valUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `AED ${valAED.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ─── Live Hero Card Price Values (dynamic from hook) ───
  const gold24kGramRate = liveGold24kGramAED;
  const goldHeroPriceAED = gold24kGramRate * activeUnitInfo.grams;
  const goldHeroDeltaAED = Math.abs(liveGoldChangeAED) * activeUnitInfo.grams;

  const silverGramRate = liveSilverGramAED;
  const silverHeroPriceAED = silverGramRate * activeUnitInfo.grams;
  const silverHeroDeltaAED = Math.abs(liveSilverChangeAED) * activeUnitInfo.grams;

  // Live FX for diaspora section (AED per 1 unit foreign currency)
  const FX_RATES = liveFX;

  // ─── Dynamic GOLD_BENCHMARKS (derived from live 24K rate) ───
  const GOLD_BENCHMARKS_LIVE = [
    { karat: '24K Gold', purity: '99.9%', purityFactor: 1.0, gramAED: liveGold24kGramAED, highAED: liveGold24kGramAED * 1.003, lowAED: liveGold24kGramAED * 0.994, app: 'Investment Bars & TT Bars' },
    { karat: '22K Gold', purity: '91.6%', purityFactor: 0.9167, gramAED: liveGold24kGramAED * 0.9167, highAED: liveGold24kGramAED * 0.9167 * 1.003, lowAED: liveGold24kGramAED * 0.9167 * 0.994, app: 'Gold Souq Jewellery Standard' },
    { karat: '21K Gold', purity: '87.5%', purityFactor: 0.875, gramAED: liveGold24kGramAED * 0.875, highAED: liveGold24kGramAED * 0.875 * 1.003, lowAED: liveGold24kGramAED * 0.875 * 0.994, app: 'Traditional Arabic Jewellery' },
    { karat: '18K Gold', purity: '75.0%', purityFactor: 0.75, gramAED: liveGold24kGramAED * 0.75, highAED: liveGold24kGramAED * 0.75 * 1.003, lowAED: liveGold24kGramAED * 0.75 * 0.994, app: 'Diamond & Modern Designs' },
    { karat: '14K Gold', purity: '58.5%', purityFactor: 0.585, gramAED: liveGold24kGramAED * 0.585, highAED: liveGold24kGramAED * 0.585 * 1.003, lowAED: liveGold24kGramAED * 0.585 * 0.994, app: 'Western & Mixed Alloy Pieces' },
  ];

  // ─── Dynamic SILVER_BENCHMARKS ───
  const SILVER_BENCHMARKS_LIVE = [
    { category: '999 Fine Silver', purity: '99.9%', gramAED: liveSilverGramAED, tolaAED: liveSilverGramAED * 11.6638, ozAED: liveSilverGramAED * 31.1035, kgAED: liveSilverGramAED * 1000, app: 'Pure Investment Bars, Cast Coins, Bullion Storage' },
    { category: '925 Sterling', purity: '92.5%', gramAED: liveSilverGramAED * 0.925, tolaAED: liveSilverGramAED * 0.925 * 11.6638, ozAED: liveSilverGramAED * 0.925 * 31.1035, kgAED: liveSilverGramAED * 0.925 * 1000, app: 'Manufactured Jewellery & Silverware Base Value' },
  ];

  // ─── Modal Calculator Output Calculation (Image 2) ───
  const modalSelectedKarat = GOLD_BENCHMARKS_LIVE.find((b) => b.karat === modalKarat) || GOLD_BENCHMARKS_LIVE[0];
  const modalBaseGramRate = modalMetal === 'gold' ? modalSelectedKarat.gramAED : liveSilverGramAED;

  let modalTotalGrams = 0;
  if (modalUnit === 'tola_lal') {
    const tolas = parseFloat(modalTolaQty) || 0;
    const lals = parseFloat(modalLalQty) || 0;
    // 1 tola = 11.6638 grams; 1 tola = 100 lals (1 lal = 0.116638 grams)
    modalTotalGrams = tolas * 11.6638 + (lals / 100) * 11.6638;
  } else if (modalUnit === 'tola') {
    const tolas = parseFloat(modalSimpleQty) || 0;
    modalTotalGrams = tolas * 11.6638;
  } else if (modalUnit === '10g') {
    const units = parseFloat(modalSimpleQty) || 0;
    modalTotalGrams = units * 10;
  } else {
    // Grams
    modalTotalGrams = parseFloat(modalSimpleQty) || 0;
  }

  const modalTotalPriceAED = modalTotalGrams * modalBaseGramRate;
  const modalRatePerTolaAED = modalBaseGramRate * 11.6638;

  // ─── Supplementary Section D Calculations ───
  const selectedJewelBenchmark = GOLD_BENCHMARKS_LIVE.find((b) => b.karat === jewelKarat) || GOLD_BENCHMARKS_LIVE[1];
  const jewelRawMetalAED = jewelWeight * selectedJewelBenchmark.gramAED;
  const jewelTotalMakingAED = jewelWeight * jewelMakingPerGram;
  const jewelSubtotalAED = jewelRawMetalAED + jewelTotalMakingAED;
  const jewelVatAED = jewelApplyVat ? jewelSubtotalAED * 0.05 : 0;
  const jewelTotalAED = jewelSubtotalAED + jewelVatAED;

  const selectedMeltBenchmark = GOLD_BENCHMARKS_LIVE.find((b) => b.karat === meltKarat) || GOLD_BENCHMARKS_LIVE[1];
  const meltTotalGrams = meltWeight * (meltUnit === 'gram' ? 1 : meltUnit === 'tola' ? 11.6638 : meltUnit === 'oz' ? 31.1035 : 1000);
  const meltValueAED = meltTotalGrams * selectedMeltBenchmark.gramAED;
  const meltValueUSD = meltValueAED / AED_PER_USD;
  const meltValueINR = meltValueAED * FX_RATES.INR;
  const meltValuePKR = meltValueAED * FX_RATES.PKR;
  const meltValueBDT = meltValueAED * FX_RATES.BDT;
  const meltValuePHP = meltValueAED * FX_RATES.PHP;

  const silverRate = silverType === '999' ? 6.23 : 5.77;
  const silverValueAED = silverWeight * silverRate;
  const silverValueUSD = silverValueAED / AED_PER_USD;
  const silverValueINR = silverValueAED * FX_RATES.INR;

  const grossVatPaid = vatPurchaseAmount * 0.05;
  const planetRefundEligible = grossVatPaid * 0.85;
  const planetAdminFee = 4.80;
  const netVatRefund = Math.max(0, planetRefundEligible - planetAdminFee);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-4 font-sans text-gray-900 space-y-4">

      {/* ── FLAGSHIP HERO: TODAY'S GOLD & SILVER PRICE (Matched with Image 1) ── */}
      <div className="space-y-3">
        {/* Top Header Row with Unit Toggle, Calculate Button & Last Updated */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Today&apos;s Gold &amp; Silver Price in Dubai
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Per tola and per 10 grams in Dubai (AED)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Segmented Unit Toggle Pill (Tola, 10 g) - Exact match to Image 1 */}
            <div className="inline-flex p-1 bg-white border border-gray-300 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setHeroUnit('tola')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                  heroUnit === 'tola'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                Tola
              </button>
              <button
                type="button"
                onClick={() => setHeroUnit('10g')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                  heroUnit === '10g'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                10 g
              </button>
            </div>

            {/* Currency Toggle (AED / USD) */}
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setCurrency('AED')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  currency === 'AED' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AED
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  currency === 'USD' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                USD
              </button>
            </div>

            {/* Red Calculate CTA Button (Opens Price Calculator Modal - Image 2) */}
            <button
              type="button"
              onClick={() => setIsModalCalculatorOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate</span>
            </button>

            {/* Last Updated Timestamp & Refresh */}
            <div className="flex items-center gap-1 text-xs text-[#9A3412] font-semibold pl-1">
              <span>Last updated: {lastRefreshedText}</span>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="Refresh rates"
                className="p-1 rounded-full text-[#9A3412] hover:bg-amber-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Dual Hero Cards (Gold on Left, Silver on Right - Matched with Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Gold */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Gold (Hallmark / 24K)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">{activeUnitInfo.label}</span>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full border ${
                  liveRates.gold.changePercent24h >= 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {liveRates.gold.changePercent24h >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>
                  {liveRates.gold.changePercent24h >= 0 ? '+' : ''}
                  {liveRates.gold.changePercent24h.toFixed(1)}%
                </span>
              </span>
            </div>

            <div className="mb-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {formatCur(goldHeroPriceAED)}
              </div>
              <div
                className={`text-xs font-semibold mt-0.5 ${
                  liveGoldChangeAED >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {liveGoldChangeAED >= 0 ? 'Increase' : 'Decrease'} {formatCur(goldHeroDeltaAED)}
              </div>
            </div>

            {/* 30-day Trend Area Chart (Amber/Golden Spline) */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium text-gray-500 text-[11px]">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> 30-day trend
                </span>
                <span className="text-[10px] text-gray-400">DJG &amp; Spot Baseline</span>
              </div>
              <SimpleAreaChart
                data={liveGoldHistory}
                color="#D97706"
                gradientFrom="#F59E0B"
                unitMultiplier={activeUnitInfo.grams}
                currency={currency}
              />
            </div>
          </div>

          {/* Card 2: Silver */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Silver (.999 Fine)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">{activeUnitInfo.label}</span>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full border ${
                  liveRates.silver.changePercent24h >= 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {liveRates.silver.changePercent24h >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>
                  {liveRates.silver.changePercent24h >= 0 ? '+' : ''}
                  {liveRates.silver.changePercent24h.toFixed(1)}%
                </span>
              </span>
            </div>

            <div className="mb-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {formatCur(silverHeroPriceAED)}
              </div>
              <div
                className={`text-xs font-semibold mt-0.5 ${
                  liveSilverChangeAED >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {liveSilverChangeAED >= 0 ? 'Increase' : 'Decrease'} {formatCur(silverHeroDeltaAED)}
              </div>
            </div>

            {/* 30-day Trend Area Chart (Rose/Red Spline - Matched with Image 1) */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span className="flex items-center gap-1 font-medium text-gray-500 text-[11px]">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-500" /> 30-day trend
                </span>
                <span className="text-[10px] text-gray-400">Bullion Spot</span>
              </div>
              <SimpleAreaChart
                data={liveSilverHistory}
                color="#DC2626"
                gradientFrom="#EF4444"
                unitMultiplier={activeUnitInfo.grams}
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICE CALCULATOR POPUP MODAL (Managed Structure & Size) ── */}
      {isModalCalculatorOpen && (
        <div
          onClick={() => setIsModalCalculatorOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex min-h-full items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-5 my-auto"
          >
            {/* Top Drag Pill & Header */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Price Calculator
              </h3>
              <button
                type="button"
                onClick={() => setIsModalCalculatorOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Field 1: Metal Selector */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Metal</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModalMetal('gold')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs transition font-bold cursor-pointer ${
                      modalMetal === 'gold'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/20 shadow-xs'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5 text-[#B91C1C]" />
                    <span>Gold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalMetal('silver')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs transition font-bold cursor-pointer ${
                      modalMetal === 'silver'
                        ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/20 shadow-xs'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5 text-slate-600" />
                    <span>Silver</span>
                  </button>
                </div>
              </div>

              {/* Field 1b: Purity / Karat (When Gold is Selected) */}
              {modalMetal === 'gold' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Purity / Karat</label>
                  <div className="grid grid-cols-5 gap-1">
                    {GOLD_BENCHMARKS_LIVE.map((b) => {
                      const active = modalKarat === b.karat;
                      return (
                        <button
                          key={b.karat}
                          type="button"
                          onClick={() => setModalKarat(b.karat)}
                          className={`py-1 px-1 rounded-lg text-[11px] font-bold transition text-center cursor-pointer ${
                            active
                              ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/40 shadow-xs'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {b.karat.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Field 2: Unit Selector (Tola + Lal, Tola, 10 grams) */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Unit</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'tola_lal', label: 'Tola + Lal' },
                    { id: 'tola', label: 'Tola' },
                    { id: '10g', label: '10 grams' },
                  ].map((u) => {
                    const active = modalUnit === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setModalUnit(u.id as any)}
                        className={`py-1.5 px-1.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                          active
                            ? 'border-2 border-[#B91C1C] text-[#B91C1C] bg-red-50/20 shadow-xs'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {u.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 3: Quantity Input Fields */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Quantity</label>
                {modalUnit === 'tola_lal' ? (
                  <div className="space-y-0.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="block text-[11px] text-gray-500 font-semibold mb-0.5">Tola</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={modalTolaQty}
                          onChange={(e) => setModalTolaQty(e.target.value)}
                          className="w-full px-3 py-1.5 text-sm font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] text-gray-500 font-semibold mb-0.5">Lal (0 - 99)</span>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          step="1"
                          value={modalLalQty}
                          onChange={(e) => setModalLalQty(e.target.value)}
                          className="w-full px-3 py-1.5 text-sm font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 block pt-0.5">e.g. 2 Tola 5 Lal</span>
                  </div>
                ) : (
                  <div>
                    <span className="block text-[11px] text-gray-500 font-semibold mb-0.5">
                      {modalUnit === 'tola' ? 'Tola' : '10 grams'}
                    </span>
                    <input
                      type="number"
                      min="0.1"
                      step="any"
                      value={modalSimpleQty}
                      onChange={(e) => setModalSimpleQty(e.target.value)}
                      placeholder="Enter quantity..."
                      className="w-full px-3 py-1.5 text-sm font-bold text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:border-[#B91C1C]"
                    />
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {modalUnit === 'tola' ? 'e.g. 2 Tola' : 'e.g. 1 unit = 10 grams'}
                    </span>
                  </div>
                )}
              </div>

              {/* Field 4: Result Box */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3.5 text-center mt-2 space-y-0.5">
                <span className="block text-xs font-bold text-[#059669]">
                  Total Price
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#059669] tracking-tight py-0.5">
                  {formatCur(modalTotalPriceAED)}
                </div>
                <div className="text-[11px] font-semibold text-gray-500">
                  Rate: {formatCur(modalRatePerTolaAED)}/Tola
                </div>

                {/* Diaspora FX Quick Tags */}
                <div className="pt-1.5 border-t border-[#A7F3D0]/60 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-900 mt-1">
                  <span>≈ ₹{(modalTotalPriceAED * FX_RATES.INR).toLocaleString(undefined, { maximumFractionDigits: 0 })} INR</span>
                  <span>•</span>
                  <span>≈ ₨{(modalTotalPriceAED * FX_RATES.PKR).toLocaleString(undefined, { maximumFractionDigits: 0 })} PKR</span>
                  <span>•</span>
                  <span>≈ ${(modalTotalPriceAED / AED_PER_USD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION A: TODAY'S DUBAI GOLD RATES TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Today&apos;s Dubai Gold Rates by Purity ({currency})
            </h2>
            <p className="text-xs text-gray-500">
              Tracking daily gold rates in Dubai per gram, 10 grams, tola, troy ounce, and kilogram.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            Baseline: Retail Benchmark (Excl. Making &amp; VAT)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-bold bg-gray-50/70">
                <th className="py-2.5 px-3">Purity / Karat</th>
                <th className="py-2.5 px-3">Purity %</th>
                <th className="py-2.5 px-3 font-extrabold text-gray-900">Per Gram</th>
                <th className="py-2.5 px-3">Per 10 Grams</th>
                <th className="py-2.5 px-3">Per Tola</th>
                <th className="py-2.5 px-3">Per Troy Ounce</th>
                <th className="py-2.5 px-3">Per Kilogram</th>
                <th className="py-2.5 px-3 text-gray-500">Day High</th>
                <th className="py-2.5 px-3 text-gray-500">Day Low</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {GOLD_BENCHMARKS_LIVE.map((row) => (
                <tr key={row.karat} className="hover:bg-amber-50/30 transition">
                  <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-1.5">
                    <span>{row.karat}</span>
                    {row.karat === '22K Gold' && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">Souq Standard</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">{row.purity}</td>
                  <td className="py-2.5 px-3 font-black text-amber-900 text-sm tabular-nums">
                    {formatCur(row.gramAED)}
                  </td>
                  <td className="py-2.5 px-3 font-semibold tabular-nums">{formatCur(row.gramAED * 10)}</td>
                  <td className="py-2.5 px-3 tabular-nums">{formatCur(row.gramAED * 11.6638)}</td>
                  <td className="py-2.5 px-3 tabular-nums">{formatCur(row.gramAED * 31.1035)}</td>
                  <td className="py-2.5 px-3 tabular-nums">{formatCur(row.gramAED * 1000)}</td>
                  <td className="py-2.5 px-3 text-gray-500 tabular-nums">{formatCur(row.highAED)}</td>
                  <td className="py-2.5 px-3 text-gray-500 tabular-nums">{formatCur(row.lowAED)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-2">
          *Note: The board rates above reflect the baseline gold metal value (suggested retail jewellery benchmark). Final retail store purchases in the Dubai Gold Souq or shopping malls will include additional making charges (craftsmanship fees) and 5% UAE VAT on qualifying jewellery pieces.
        </p>

        {/* Intraday Gold Rate Updates Sub-table */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
            Intraday Gold Rate Updates (Morning, Afternoon, Evening)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                  <th className="py-2 px-3">Time Session</th>
                  <th className="py-2 px-3">24K Rate ({currency}/g)</th>
                  <th className="py-2 px-3">22K Rate ({currency}/g)</th>
                  <th className="py-2 px-3">18K Rate ({currency}/g)</th>
                  <th className="py-2 px-3">Market Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {INTRADAY_SESSIONS.map((s) => (
                  <tr key={s.session}>
                    <td className="py-2 px-3 font-bold text-gray-900">{s.session}</td>
                    <td className="py-2 px-3 font-semibold tabular-nums">{formatCur(s.rate24k)}</td>
                    <td className="py-2 px-3 font-semibold tabular-nums">{formatCur(s.rate22k)}</td>
                    <td className="py-2 px-3 font-semibold tabular-nums">{formatCur(s.rate18k)}</td>
                    <td className={`py-2 px-3 font-bold ${s.trendColor}`}>{s.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTION B: LIVE DUBAI SILVER RATES TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="border-b border-gray-100 pb-2">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Today&apos;s Dubai Silver Rates by Purity &amp; Weight ({currency})
          </h2>
          <p className="text-xs text-gray-500">
            Silver prices in the UAE tracked per gram, tola, ounce, and kilogram, distinguishing pure bullion from 925 sterling jewellery.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-bold bg-gray-50/70">
                <th className="py-2.5 px-3">Silver Category</th>
                <th className="py-2.5 px-3">Purity %</th>
                <th className="py-2.5 px-3 font-extrabold text-gray-900">Per Gram</th>
                <th className="py-2.5 px-3">Per Tola</th>
                <th className="py-2.5 px-3">Per Ounce</th>
                <th className="py-2.5 px-3">Per Kilogram</th>
                <th className="py-2.5 px-3">Market Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {SILVER_BENCHMARKS_LIVE.map((s) => (
                <tr key={s.category} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-bold text-gray-900">{s.category}</td>
                  <td className="py-2.5 px-3 text-gray-500">{s.purity}</td>
                  <td className="py-2.5 px-3 font-black text-slate-800 text-sm tabular-nums">
                    {formatCur(s.gramAED)}
                  </td>
                  <td className="py-2.5 px-3 font-semibold tabular-nums">{formatCur(s.tolaAED)}</td>
                  <td className="py-2.5 px-3 tabular-nums">{formatCur(s.ozAED)}</td>
                  <td className="py-2.5 px-3 tabular-nums font-bold text-slate-900">{formatCur(s.kgAED)}</td>
                  <td className="py-2.5 px-3 text-gray-600 text-[11px]">{s.app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-2">
          *Important Distinction: 999 Fine Silver represents raw spot market valuation. 925 Sterling Silver reflects raw melt content only; finished retail silver jewellery carries higher retail markup premiums relative to metal weight.
        </p>
      </div>

      {/* ── SECTION C: DUBAI GOLD RATES CONVERTED TO DIASPORA CURRENCIES (PER 10 GRAMS) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="border-b border-gray-100 pb-2">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Dubai Gold Rates Converted to Diaspora Currencies (Per 10 Grams)
          </h2>
          <p className="text-xs text-gray-500">
            The UAE Dirham (AED) is pegged to the US Dollar at 1 USD = 3.6725 AED. Major expat remittance currencies (INR, PKR, BDT, PHP) fluctuate independently on foreign exchange markets.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-bold bg-gray-50/70">
                <th className="py-2.5 px-3">Gold Karat</th>
                <th className="py-2.5 px-3 font-bold text-amber-900">Rate in AED</th>
                <th className="py-2.5 px-3">Indian Rupee (INR)*</th>
                <th className="py-2.5 px-3">Pakistani Rupee (PKR)*</th>
                <th className="py-2.5 px-3">Bangladeshi Taka (BDT)*</th>
                <th className="py-2.5 px-3">Philippine Peso (PHP)*</th>
                <th className="py-2.5 px-3">US Dollar (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {GOLD_BENCHMARKS_LIVE.slice(0, 4).map((bench) => {
                const aed10g = bench.gramAED * 10;
                const inr = aed10g * FX_RATES.INR;
                const pkr = aed10g * FX_RATES.PKR;
                const bdt = aed10g * FX_RATES.BDT;
                const php = aed10g * FX_RATES.PHP;
                const usd = aed10g / AED_PER_USD;
                return (
                  <tr key={bench.karat} className="hover:bg-amber-50/30 transition">
                    <td className="py-2.5 px-3 font-bold text-gray-900">{bench.karat}</td>
                    <td className="py-2.5 px-3 font-extrabold text-amber-900 tabular-nums">
                      AED {aed10g.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums font-semibold text-emerald-800">
                      ₹{inr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-gray-700">
                      ₨{pkr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-gray-700">
                      ৳{bdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-gray-700">
                      ₱{php.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums font-bold text-blue-900">
                      ${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 flex flex-wrap items-center justify-between gap-2">
          <span>
            *Live FX Rates: 1 AED = {FX_RATES.INR.toFixed(2)} INR | 1 AED = {FX_RATES.PKR.toFixed(2)} PKR | 1 AED = {FX_RATES.BDT.toFixed(2)} BDT | 1 AED = {FX_RATES.PHP.toFixed(2)} PHP | 1 USD = {AED_PER_USD} AED
          </span>
          <span className="font-semibold text-gray-600">Updated from Central Bank Peg &amp; Forex Spot</span>
        </div>
      </div>

      {/* ── SECTION D: DETAILED JEWELLERY & VAT ESTIMATOR SUITE ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="flex items-center overflow-x-auto border-b border-gray-200 bg-gray-50/80 px-2 sm:px-4">
          <button
            type="button"
            onClick={() => setCalcTab('jewellery')}
            className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-2 -mb-px flex items-center gap-1.5 font-bold ${
              calcTab === 'jewellery'
                ? 'border-amber-600 text-amber-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Retail Jewellery Cost Estimator</span>
          </button>
          <button
            type="button"
            onClick={() => setCalcTab('melt')}
            className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-2 -mb-px flex items-center gap-1.5 font-bold ${
              calcTab === 'melt'
                ? 'border-amber-600 text-amber-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Gold Melt Value Calculator</span>
          </button>
          <button
            type="button"
            onClick={() => setCalcTab('silver')}
            className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-2 -mb-px flex items-center gap-1.5 font-bold ${
              calcTab === 'silver'
                ? 'border-amber-600 text-amber-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-slate-600" />
            <span>Silver &amp; Sterling Value</span>
          </button>
          <button
            type="button"
            onClick={() => setCalcTab('vat')}
            className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-2 -mb-px flex items-center gap-1.5 font-bold ${
              calcTab === 'vat'
                ? 'border-amber-600 text-amber-800 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-emerald-600" />
            <span>Airport VAT Refund Calculator</span>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* TAB 1: RETAIL JEWELLERY COST ESTIMATOR */}
          {calcTab === 'jewellery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Dubai Retail Jewellery Cost Estimator
                  </h3>
                  <p className="text-xs text-gray-500">
                    Formula: Total = (Weight × Karat Rate) + (Weight × Making Charge) + 5% UAE VAT
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  Gold Souq &amp; Mall Pricing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Weight in Grams:</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={jewelWeight}
                    onChange={(e) => setJewelWeight(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-sm text-gray-900 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Gold Karat:</label>
                  <select
                    value={jewelKarat}
                    onChange={(e) => setJewelKarat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-xs text-gray-900 focus:border-amber-500 outline-none cursor-pointer"
                  >
                    {GOLD_BENCHMARKS_LIVE.map((b) => (
                      <option key={b.karat} value={b.karat}>
                        {b.karat} (AED {b.gramAED}/g)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Making Charge per Gram (AED):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="5"
                      max="150"
                      step="1"
                      value={jewelMakingPerGram}
                      onChange={(e) => setJewelMakingPerGram(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-sm text-gray-900 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">Typical Souq: AED 15 - 35/g</span>
                </div>
              </div>

              {/* VAT Checkbox */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <input
                  type="checkbox"
                  id="applyVat"
                  checked={jewelApplyVat}
                  onChange={(e) => setJewelApplyVat(e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="applyVat" className="text-gray-700 font-medium cursor-pointer">
                  Include 5% UAE VAT (Standard rate on finished jewellery)
                </label>
              </div>

              {/* Itemized Price Breakdown Result Card */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-gray-800 text-xs sm:text-sm border-b border-amber-200/60 pb-1.5 flex items-center justify-between">
                  <span>Itemized Bill Breakdown ({jewelWeight}g of {jewelKarat})</span>
                  <span className="text-amber-900 font-black text-sm sm:text-base">
                    AED {jewelTotalAED.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Raw Gold Metal Value:</span>
                    <span className="font-bold text-gray-900 text-xs">AED {jewelRawMetalAED.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Total Craftsmanship/Making:</span>
                    <span className="font-bold text-gray-900 text-xs">AED {jewelTotalMakingAED.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">UAE 5% VAT:</span>
                    <span className="font-bold text-gray-900 text-xs">AED {jewelVatAED.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Est. in USD ($):</span>
                    <span className="font-bold text-blue-900 text-xs">${(jewelTotalAED / AED_PER_USD).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOLD MELT VALUE CALCULATOR */}
          {calcTab === 'melt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Gold Melt Value &amp; Remittance Converter
                  </h3>
                  <p className="text-xs text-gray-500">
                    Formula: Baseline Price = Weight (grams) × Live Karat Rate (AED/g)
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Raw Bullion Value
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Weight:</label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={meltWeight}
                    onChange={(e) => setMeltWeight(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-sm text-gray-900 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Unit:</label>
                  <select
                    value={meltUnit}
                    onChange={(e) => setMeltUnit(e.target.value as 'gram' | 'tola' | 'oz' | 'kg')}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-xs text-gray-900 focus:border-amber-500 outline-none cursor-pointer"
                  >
                    <option value="gram">Grams (g)</option>
                    <option value="tola">Tola (11.66g)</option>
                    <option value="oz">Troy Ounces (31.10g)</option>
                    <option value="kg">Kilograms (kg)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Gold Karat:</label>
                  <select
                    value={meltKarat}
                    onChange={(e) => setMeltKarat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-xs text-gray-900 focus:border-amber-500 outline-none cursor-pointer"
                  >
                    {GOLD_BENCHMARKS_LIVE.map((b) => (
                      <option key={b.karat} value={b.karat}>
                        {b.karat} ({b.purity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                  <span className="font-bold text-emerald-950 text-sm">
                    Total Raw Gold Melt Value ({meltTotalGrams.toFixed(2)}g of {meltKarat}):
                  </span>
                  <span className="text-emerald-900 font-black text-lg">
                    AED {meltValueAED.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-semibold">
                  <div>
                    <span className="text-gray-500 block text-[11px]">US Dollar (USD):</span>
                    <span className="text-blue-900 font-bold text-xs">${meltValueUSD.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Indian Rupee (INR):</span>
                    <span className="text-emerald-800 font-bold text-xs">₹{meltValueINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Pakistani Rupee (PKR):</span>
                    <span className="text-gray-800 font-bold text-xs">₨{meltValuePKR.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Bangladeshi Taka (BDT):</span>
                    <span className="text-gray-800 font-bold text-xs">৳{meltValueBDT.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Philippine Peso (PHP):</span>
                    <span className="text-gray-800 font-bold text-xs">₱{meltValuePHP.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SILVER & STERLING VALUE CONVERTER */}
          {calcTab === 'silver' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Silver Melt Value &amp; Sterling Jewellery Converter
                </h3>
                <p className="text-xs text-gray-500">
                  Inputs: Weight (grams) and Silver Type (999 Fine Bullion vs 925 Sterling Jewellery)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Weight in Grams:</label>
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={silverWeight}
                    onChange={(e) => setSilverWeight(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-sm text-gray-900 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Silver Standard:</label>
                  <select
                    value={silverType}
                    onChange={(e) => setSilverType(e.target.value as '999' | '925')}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-xs text-gray-900 focus:border-amber-500 outline-none cursor-pointer"
                  >
                    <option value="999">999 Fine Silver (AED 6.23/g) - Investment Bullion</option>
                    <option value="925">925 Sterling Silver (AED 5.77/g) - Jewellery Standard</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-800 text-sm">
                    Estimated Melt Content Value ({silverWeight}g of {silverType === '999' ? '999 Fine' : '925 Sterling'}):
                  </span>
                  <span className="text-slate-900 font-black text-lg">
                    AED {silverValueAED.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-6 font-semibold pt-1">
                  <div>
                    <span className="text-gray-500 block text-[11px]">US Dollar (USD):</span>
                    <span className="text-blue-900 font-bold text-xs">${silverValueUSD.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Indian Rupee (INR):</span>
                    <span className="text-emerald-800 font-bold text-xs">₹{silverValueINR.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TOURIST VAT REFUND CALCULATOR */}
          {calcTab === 'vat' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  UAE Tourist VAT Refund Calculator (Planet Tax Free Scheme)
                </h3>
                <p className="text-xs text-gray-500">
                  Tourists leaving the UAE can claim an 85% refund of VAT paid on retail jewellery, minus a 4.80 AED admin tag fee.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Total Store Purchase Invoice (AED):
                  </label>
                  <input
                    type="number"
                    min="250"
                    step="100"
                    value={vatPurchaseAmount}
                    onChange={(e) => setVatPurchaseAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-sm text-gray-900 focus:border-amber-500 outline-none"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Minimum purchase: AED 250</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 block">Net Cash/Card Refund at Airport:</span>
                  <span className="text-2xl font-black text-emerald-800 block">
                    AED {netVatRefund.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    Gross VAT: AED {grossVatPaid.toFixed(2)} · Planet 85%: AED {planetRefundEligible.toFixed(2)} · Tag Fee: AED 4.80
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION E: DUBAI MARKET PRICE METHODOLOGY & COMPETITOR GAP ANALYSIS ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Dubai Market Price Methodology &amp; Competitor Gap Analysis
        </h2>

        <p>
          Transparency in pricing methodology is critical when tracking precious metals in the UAE. Unlike regional retail markets with wide dealer markups, the Dubai gold ecosystem adheres to standardized pricing layers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">1. International Spot Price</h3>
            <p className="text-gray-600 text-xs">
              Sourced from global bullion markets (LBMA benchmarks and COMEX futures). Reflects raw, unrefined gold traded in institutional wholesale volumes.
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">2. Dubai Suggested Retail Board Rate</h3>
            <p className="text-gray-600 text-xs">
              Published by industry bodies such as the Dubai Jewellery Group (DJG). This serves as the uniform benchmark rate displayed across electronic boards in retail shops across the Dubai Gold Souq, Deira, and shopping malls.
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">3. Indicative Calculated Purity Rate</h3>
            <p className="text-gray-600 text-xs">
              Mathematical derivatives of pure 24K gold (for example, 22K is calculated as 91.6% of pure 24K value, while 18K is 75.0%).
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">4. Final Retail Counter Price</h3>
            <p className="text-gray-600 text-xs">
              The actual out-of-pocket expense paid by consumers, which incorporates metal rate + negotiable making charges + 5% UAE VAT.
            </p>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2">
          Competitor Gap Analysis &amp; NepaCalc Advantage
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li>
            <strong>Dubai City of Gold (DJG):</strong> Offers official retail board rates but lacks multi-currency diaspora conversion matrices (INR, PKR), historical interactive charts, and itemized calculators.
          </li>
          <li>
            <strong>Gulf News &amp; Khaleej Times:</strong> Provide strong local updates and currency tables but suffer from heavy ad clutter, slow mobile loading times, and lack dynamic client-side making-charge calculators.
          </li>
          <li>
            <strong>LivePriceOfGold:</strong> Provides global unit coverage (tola, oz, kg) but lacks deep Dubai-specific localization, such as Dubai Gold Souq making charges, UAE FTA VAT rules, and consumer rights frameworks.
          </li>
          <li>
            <strong>Our Edge (NepaCalc):</strong> Combines official DJG retail board rates, live automated FX cross-rates, zero layout shift (CLS) mobile performance, and complete transparency on local legal and tax regulations.
          </li>
        </ul>
      </div>

      {/* ── SECTION F: LEGAL, TAX & REGULATORY COMPLIANCE GUIDE (UAE & DUBAI) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Legal, Tax &amp; Regulatory Compliance Guide (UAE &amp; Dubai)
        </h2>
        <p>
          Navigating the legal framework of buying gold and silver in Dubai ensures a safe, compliant, and cost-effective transaction.
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center justify-between">
              <span>1. UAE VAT Regulations on Precious Metals (Federal Tax Authority)</span>
              <a
                href="https://tax.gov.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Federal Tax Authority <ExternalLink className="w-3 h-3" />
              </a>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>
                <strong>Investment-Grade Precious Metals (0% Zero-Rated VAT):</strong> Under Federal Tax Authority (FTA) guidelines, supplies of gold, silver, and platinum with a purity of 99% or higher (999.9/999) that are in a tradable form accepted by international bullion markets (bars, ingots, cast coins) qualify for 0% Zero-Rated VAT.
              </li>
              <li>
                <strong>Retail Jewellery (Standard 5% VAT):</strong> Finished jewellery items (22K, 21K, 18K, 14K, and 925 sterling silver) are subject to the standard 5% VAT rate. VAT is applied to the combined total of the gold metal value and making charges.
              </li>
              <li>
                <strong>Cabinet Decision Note:</strong> Under Cabinet Decision No. (127) of 2024 (expanding Cabinet Decision No. 25 of 2018), Business-to-Business (B2B) wholesale transactions between VAT-registered traders utilize the Reverse Charge Mechanism (RCM), shifting VAT accounting to the buyer. Retail consumers pay standard 5% VAT at store checkout.
              </li>
              <li>
                <strong>Tourist VAT Refund Scheme:</strong> Eligible tourists visiting the UAE can claim a VAT refund (minus administrative fee) on retail gold jewellery purchases via Planet Payment validation terminals at UAE airports, provided items are exported within 90 days of purchase.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center justify-between">
              <span>2. Consumer Rights &amp; Shopping Protection in Dubai</span>
              <div className="flex gap-3 text-[11px]">
                <a
                  href="https://consumerrights.gov.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Consumer Rights Portal <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.moec.gov.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Ministry of Economy <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>
                <strong>Mandatory Itemized Invoice:</strong> Buyers have a legal right to receive a clear, written invoice detailing: (1) Date &amp; Store License Details, (2) Exact Weight in Grams, (3) Verified Purity (Karat), (4) Raw Metal Value, (5) Itemized Making Charges, and (6) 5% VAT.
              </li>
              <li>
                <strong>Purity Hallmarking (Dubai Municipality Bareeq System):</strong> Gold sold in Dubai is subject to rigorous purity testing and hallmarking under Dubai Municipality oversight. Look for official assay punch marks on jewellery pieces.
              </li>
              <li>
                <strong>Dispute Escalation:</strong> If a retail store refuses an itemized bill or misrepresents purity, consumers can log complaints directly with Dubai Consumer Protection.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center justify-between">
              <span>3. Anti-Money Laundering (AML) &amp; Identification Requirements</span>
              <a
                href="https://www.fiu.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                UAE FIU Guidelines <ExternalLink className="w-3 h-3" />
              </a>
            </h3>
            <p className="text-xs text-gray-600">
              <strong>Identification Thresholds:</strong> Showing a passport or Emirates ID is not mandatory for every minor cash jewellery purchase. However, under Financial Intelligence Unit (FIU) rules for Dealers in Precious Metals and Stones (DPMS), cash transactions exceeding AED 55,000 (approx. $15,000 USD) require mandatory Customer Due Diligence (CDD), verification of identity (Emirates ID/Passport), and source-of-funds documentation.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION G: FREQUENTLY ASKED QUESTIONS (PAA & AEO OPTIMIZED) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Frequently Asked Questions: Dubai Gold &amp; Silver Rates
        </h2>

        <div className="space-y-3 divide-y divide-gray-100 text-xs sm:text-sm">
          <div className="pt-2 first:pt-0">
            <h3 className="font-bold text-gray-900 mb-1">
              How much is 22K gold in Dubai today?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              Today&apos;s benchmark 22K gold rate in Dubai is AED 459.00 per gram. For 10 grams, the rate is AED 4,590.00, and 1 tola is AED 53,536.80. Final retail jewellery purchases will include additional making charges and 5% UAE VAT.
            </p>
          </div>

          <div className="pt-3">
            <h3 className="font-bold text-gray-900 mb-1">
              Is gold really cheaper in Dubai compared to India, UK, or USA?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              Dubai offers highly competitive gold pricing due to lower structural maker margins, high retail competition, zero import duties on raw bullion, and 0% VAT on investment-grade bars (99%+ purity). However, whether it is cheaper for an international traveler depends on currency conversion rates, negotiable making charges, tourist VAT refunds, and home-country import customs duty allowances (such as Indian Customs duty limits on gold baggage).
            </p>
          </div>

          <div className="pt-3">
            <h3 className="font-bold text-gray-900 mb-1">
              What are making charges on gold in Dubai, and are they negotiable?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              Making charges represent the craftsmanship fee for turning raw gold into jewellery. In Dubai, making charges typically range from AED 10 to AED 100+ per gram depending on design complexity, brand, and machine vs. hand work. Unlike the fixed gold rate, making charges are often negotiable at retail shops in the Dubai Gold Souq.
            </p>
          </div>

          <div className="pt-3">
            <h3 className="font-bold text-gray-900 mb-1">
              Do I need to show my passport or ID to buy gold in Dubai?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              For standard credit card or small cash purchases, routine store receipts are issued without mandatory ID checks. However, under UAE Anti-Money Laundering (AML) regulations, precious metals dealers are required to verify identification (Passport or Emirates ID) for cash transactions equal to or exceeding AED 55,000 (~$15,000 USD).
            </p>
          </div>

          <div className="pt-3">
            <h3 className="font-bold text-gray-900 mb-1">
              What is the difference between 24K, 22K, 21K, and 18K gold?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              The karat rating indicates gold purity: 24K (99.9% Pure) is pure gold ideal for investment bars; 22K (91.6% Pure) is standard for traditional Asian and Indian jewellery; 21K (87.5% Pure) is popular in Arabic and Middle Eastern designs; and 18K (75.0% Pure) is common in modern Western and diamond-studded jewellery.
            </p>
          </div>

          <div className="pt-3">
            <h3 className="font-bold text-gray-900 mb-1">
              How does VAT apply to gold and silver in Dubai?
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              Investment-grade gold and silver bars and coins with a purity of 99% or higher qualify for 0% Zero-Rated VAT under UAE FTA rules. All retail jewellery (22K, 21K, 18K, and 925 sterling silver) is subject to 5% VAT on the final sales value. Tourists can claim a VAT refund at departure under the Planet Tax Free scheme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Simple Area Chart Component (Matching Image 1 & NepaCalc Flagship) ───
interface ChartProps {
  data: { date: string; price: number }[];
  color: string;
  gradientFrom: string;
  unitMultiplier: number;
  currency: 'AED' | 'USD';
}

function SimpleAreaChart({ data, color, gradientFrom, unitMultiplier, currency }: ChartProps) {
  const gradientId = useId();

  const scaledData = data.map((d) => {
    let p = d.price * unitMultiplier;
    if (currency === 'USD') {
      p = p / AED_PER_USD;
    }
    return {
      ...d,
      displayPrice: p,
    };
  });

  const prices = scaledData.map((d) => d.displayPrice);
  const min = Math.min(...prices) * 0.985;
  const max = Math.max(...prices) * 1.015;

  const width = 460;
  const height = 150;
  const paddingLeft = 45;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 22;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = scaledData.map((d, i) => {
    const x = paddingLeft + (i / (scaledData.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.displayPrice - min) / (max - min || 1)) * chartHeight;
    return { x, y, ...d };
  });

  // Smooth bezier curve
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
    <div className="relative w-full select-none pt-1">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
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
              {t.val < 100 ? t.val.toFixed(1) : Math.round(t.val).toLocaleString('en-US')}
            </text>
          </g>
        ))}

        {/* Area Gradient */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Line Curve */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X Axis Date Labels */}
        {points.map((pt, idx) => (
          <text
            key={idx}
            x={pt.x}
            y={height - 4}
            textAnchor="middle"
            className="text-[9px] fill-gray-400 font-sans font-medium"
          >
            {pt.date}
          </text>
        ))}
      </svg>
    </div>
  );
}


