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
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Download,
  BarChart3,
  Layers,
  Zap
} from 'lucide-react';
import { useInternationalRates } from '@/hooks/useInternationalRates';

export type AssetType = 'gold' | 'silver' | 'platinum' | 'palladium' | 'copper' | 'goldsilver' | 'btcusd';
export type Timeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
export type CurrencyCode = 'USD' | 'CAD' | 'AUD' | 'EUR' | 'GBP';
export type WeightUnit = 'oz' | 'g' | 'kg';

// Tabs order matching JM Bullion standard:
export const ASSET_ORDER: AssetType[] = [
  'gold',
  'silver',
  'platinum',
  'palladium',
  'copper',
  'goldsilver',
  'btcusd',
];

export interface AssetConfig {
  id: AssetType;
  label: string;
  unitLabel: string;
  symbol: string;
  basePriceUSD: number;
  bidUSD: number;
  askUSD: number;
  change24hUSD: number;
  changePercent24h: number;
  high24hUSD: number;
  low24hUSD: number;
  high52wUSD: number;
  low52wUSD: number;
  athUSD: number;
  athDate: string;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
  category: 'ratio' | 'precious' | 'industrial' | 'crypto';
  summary: string;
  keyDrivers: string[];
  macroRatios: { label: string; value: string; note: string }[];
}

export const ASSETS_METADATA: Record<AssetType, AssetConfig> = {
  gold: {
    id: 'gold',
    label: 'Gold',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 4091.25,
    bidUSD: 4088.50,
    askUSD: 4094.00,
    change24hUSD: -56.50,
    changePercent24h: -1.36,
    high24hUSD: 4148.90,
    low24hUSD: 4075.20,
    high52wUSD: 4148.90,
    low52wUSD: 2600.00,
    athUSD: 4148.90,
    athDate: 'Oct 2026',
    themeColor: '#B45309',
    gradientFrom: '#FBBF24',
    gradientTo: '#FFFBEB',
    category: 'precious',
    summary: 'The ultimate monetary safe-haven and global central bank reserve anchor with zero default risk.',
    keyDrivers: [
      'Central Bank reserve accumulation (record global buying)',
      'Real interest rate expectations & Fed policy shifts',
      'Geopolitical hedging and de-dollarization initiatives',
      'Physical investment bar & sovereign coin demand'
    ],
    macroRatios: [
      { label: 'Gold/Silver Ratio', value: '77.23:1', note: 'Ounces of silver to purchase 1 oz gold' },
      { label: 'Gold/Platinum Ratio', value: '2.62:1', note: 'Historical norm was platinum at premium' },
      { label: 'Gold/Oil Ratio', value: '58.2 bbl', note: 'Barrels of WTI crude per ounce of gold' }
    ]
  },
  silver: {
    id: 'silver',
    label: 'Silver',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 53.11,
    bidUSD: 53.02,
    askUSD: 53.20,
    change24hUSD: -0.71,
    changePercent24h: -1.32,
    high24hUSD: 54.20,
    low24hUSD: 52.65,
    high52wUSD: 54.80,
    low52wUSD: 26.50,
    athUSD: 54.80,
    athDate: 'Oct 2026 (Historic $49.50 in 2011/1980)',
    themeColor: '#475569',
    gradientFrom: '#94A3B8',
    gradientTo: '#F1F5F9',
    category: 'precious',
    summary: 'Critical dual-role precious metal: high-conductivity green tech driver and accessible monetary store of value.',
    keyDrivers: [
      'Photovoltaic solar cell demand (55% of total industrial usage)',
      'Structural physical mine supply deficits (4 consecutive years)',
      'Electric vehicle wiring, relays, and AI hardware contacts',
      'Retail investment squeeze & silver ETF accumulation'
    ],
    macroRatios: [
      { label: 'Gold/Silver Ratio', value: '77.23:1', note: '50-year median sits at 65:1' },
      { label: 'Silver/Copper Ratio', value: '11.0:1', note: 'Dollar value per pound vs refined copper' },
      { label: 'Annual Supply Deficit', value: '215M oz', note: 'Demand exceeds global mine production' }
    ]
  },
  platinum: {
    id: 'platinum',
    label: 'Platinum',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 1565.60,
    bidUSD: 1550.60,
    askUSD: 1565.60,
    change24hUSD: 17.55,
    changePercent24h: 1.13,
    high24hUSD: 1585.00,
    low24hUSD: 1548.00,
    high52wUSD: 1620.00,
    low52wUSD: 880.00,
    athUSD: 2276.00,
    athDate: 'March 2008',
    themeColor: '#0284C7',
    gradientFrom: '#38BDF8',
    gradientTo: '#F0F9FF',
    category: 'precious',
    summary: 'Rare catalytic metal essential for heavy-duty diesel emission systems, hydrogen PEM fuel cells, and fine jewelry.',
    keyDrivers: [
      'Hydrogen PEM fuel cell and electrolyzer industrial adoption',
      'Heavy-duty diesel vehicle emissions after-treatment',
      'Mining disruptions in South Africa (produces ~72% of world supply)',
      'Industrial substitution for historically expensive palladium'
    ],
    macroRatios: [
      { label: 'Gold/Platinum Ratio', value: '2.61:1', note: 'Gold premium remains near historic wide spread' },
      { label: 'Platinum/Palladium', value: '1.48:1', note: 'Platinum has reclaimed premium over palladium' },
      { label: 'Global Supply Share', value: '72% SA', note: 'High geographic mining concentration risk' }
    ]
  },
  palladium: {
    id: 'palladium',
    label: 'Palladium',
    unitLabel: '/ oz',
    symbol: '$',
    basePriceUSD: 1060.67,
    bidUSD: 1020.67,
    askUSD: 1060.67,
    change24hUSD: 11.22,
    changePercent24h: 1.07,
    high24hUSD: 1075.00,
    low24hUSD: 1045.00,
    high52wUSD: 1280.00,
    low52wUSD: 840.00,
    athUSD: 3440.00,
    athDate: 'March 2022 (Russian Supply Squeeze)',
    themeColor: '#7C3AED',
    gradientFrom: '#A78BFA',
    gradientTo: '#F5F3FF',
    category: 'precious',
    summary: 'Essential autocatalytic metal discovered in 1803 (symbol Pd, atomic 46), dedicated to neutralizing emissions in gasoline engines.',
    keyDrivers: [
      'Global gasoline and hybrid automobile production quotas',
      'Sanction uncertainties surrounding Russian output (Norilsk ~40%)',
      'Pure Battery Electric Vehicle (BEV) penetration rate',
      'Recycled autocatalyst secondary market supply recovery'
    ],
    macroRatios: [
      { label: 'Palladium/Platinum', value: '0.68:1', note: 'Down from 3.1x peak in 2021' },
      { label: 'Gold/Palladium Ratio', value: '3.86:1', note: 'Gold trades at substantial premium' },
      { label: 'Auto Catalyst Share', value: '85%', note: 'Heavily tied to combustion engine health' }
    ]
  },
  copper: {
    id: 'copper',
    label: 'Copper',
    unitLabel: '/ lb',
    symbol: '$',
    basePriceUSD: 6.28,
    bidUSD: 6.28,
    askUSD: 6.28,
    change24hUSD: 0.03,
    changePercent24h: 0.51,
    high24hUSD: 6.35,
    low24hUSD: 6.21,
    high52wUSD: 6.50,
    low52wUSD: 3.70,
    athUSD: 6.50,
    athDate: '2026 ($13,850 / Metric Ton)',
    themeColor: '#EA580C',
    gradientFrom: '#FB923C',
    gradientTo: '#FFF7ED',
    category: 'industrial',
    summary: '"Dr. Copper" serves as a premier economic barometer due to its ubiquitous role across power grids, AI data centers, and EV electrification.',
    keyDrivers: [
      'AI Data Center power distribution and transformer demand',
      'Electric vehicle manufacturing (EVs require ~80kg vs 20kg for gas)',
      'Renewable energy transmission line buildouts worldwide',
      'Pre-1982 95% copper pennies vs modern 2.5% zinc coin composition'
    ],
    macroRatios: [
      { label: 'Gold/Copper Ratio', value: '651:1', note: 'Classic macroeconomic indicator of risk appetite' },
      { label: 'Metric Ton Price', value: '$13,845', note: 'London Metal Exchange (LME) metric ton quote' },
      { label: 'Copper / Kilo', value: '$13.85', note: 'Standard industrial fabrication benchmark' }
    ]
  },
  goldsilver: {
    id: 'goldsilver',
    label: 'Gold/Silver',
    unitLabel: ': 1',
    symbol: '',
    basePriceUSD: 77.32,
    bidUSD: 77.10,
    askUSD: 77.45,
    change24hUSD: -0.83,
    changePercent24h: -1.06,
    high24hUSD: 78.45,
    low24hUSD: 77.20,
    high52wUSD: 91.80,
    low52wUSD: 73.10,
    athUSD: 125.00,
    athDate: 'March 2020 (COVID Liquidity Spike)',
    themeColor: '#D97706',
    gradientFrom: '#F59E0B',
    gradientTo: '#FEF3C7',
    category: 'ratio',
    summary: 'The benchmark ratio tracking how many ounces of silver equal one ounce of gold. Key gauge for 80/50 rule precious metal rotation strategies.',
    keyDrivers: [
      '80/50 Rule: Mean-reversion signals between gold and silver',
      'Central bank gold purchases outpacing silver monetary reserves',
      'Solar energy industrial demand tightening physical silver floats',
      'Macroeconomic inflation cycles and retail physical coin premiums'
    ],
    macroRatios: [
      { label: '50-Year Median', value: '65:1', note: 'Long-term free floating market equilibrium' },
      { label: '20-Year Average', value: '68:1', note: 'Modern central bank era trading baseline' },
      { label: 'Hamilton Standard', value: '15:1', note: 'US 1792 Coinage Act bimetallic parity' }
    ]
  },
  btcusd: {
    id: 'btcusd',
    label: 'BTC/USD',
    unitLabel: '',
    symbol: '$',
    basePriceUSD: 73346.60,
    bidUSD: 73330.00,
    askUSD: 73360.00,
    change24hUSD: -352.85,
    changePercent24h: -0.48,
    high24hUSD: 74200.00,
    low24hUSD: 72800.00,
    high52wUSD: 93480.0,
    low52wUSD: 38500.0,
    athUSD: 93480.0,
    athDate: 'Nov 2024',
    themeColor: '#F7931A',
    gradientFrom: '#F7931A',
    gradientTo: '#FFFBEB',
    category: 'crypto',
    summary: '"Digital Gold" - decentralized programmatic money with an unalterable 21M coin limit (subdivided into 100M satoshis each) launched by Satoshi Nakamoto.',
    keyDrivers: [
      'Institutional Spot ETF net inflows (BlackRock, Fidelity)',
      'Post-halving block subsidy scarcity (3.125 BTC per block)',
      'Bullion dealer adoption: 4% cash discount when paying with Bitcoin',
      'Corporate treasury allocations & sovereign reserve bills'
    ],
    macroRatios: [
      { label: 'BTC/Gold Ratio', value: '18.06 oz', note: 'Troy ounces of gold required to buy 1 Bitcoin' },
      { label: 'Total Market Cap', value: '$1.45T', note: '~9% of physical gold aggregate market value' },
      { label: 'Stock-to-Flow', value: '112', note: 'Surpassed physical gold stock-to-flow post-halving' }
    ]
  }
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

export interface HistoricalReturn {
  asset: string;
  symbol: string;
  color: string;
  change1Y: { val: string; pct: string; positive: boolean };
  change5Y: { val: string; pct: string; positive: boolean };
  change10Y: { val: string; pct: string; positive: boolean };
  change20Y: { val: string; pct: string; positive: boolean };
  change30Y: { val: string; pct: string; positive: boolean };
}

export const HISTORICAL_RETURNS_DATA: HistoricalReturn[] = [
  {
    asset: 'Gold',
    symbol: 'AU',
    color: '#B45309',
    change1Y: { val: '+$1,220.00', pct: '+42.50%', positive: true },
    change5Y: { val: '+$2,190.00', pct: '+115.80%', positive: true },
    change10Y: { val: '+$2,905.00', pct: '+245.20%', positive: true },
    change20Y: { val: '+$3,665.00', pct: '+860.50%', positive: true },
    change30Y: { val: '+$3,700.00', pct: '+955.00%', positive: true },
  },
  {
    asset: 'Silver',
    symbol: 'AG',
    color: '#475569',
    change1Y: { val: '+$21.50', pct: '+68.40%', positive: true },
    change5Y: { val: '+$34.50', pct: '+185.20%', positive: true },
    change10Y: { val: '+$36.00', pct: '+210.50%', positive: true },
    change20Y: { val: '+$46.00', pct: '+640.20%', positive: true },
    change30Y: { val: '+$47.70', pct: '+880.00%', positive: true },
  },
  {
    asset: 'Platinum',
    symbol: 'PT',
    color: '#0284C7',
    change1Y: { val: '-$30.25', pct: '-1.91%', positive: false },
    change5Y: { val: '+$464.96', pct: '+42.61%', positive: true },
    change10Y: { val: '+$614.68', pct: '+65.29%', positive: true },
    change20Y: { val: '+$336.10', pct: '+27.55%', positive: true },
    change30Y: { val: '+$1,170.10', pct: '+303.13%', positive: true },
  },
  {
    asset: 'Palladium',
    symbol: 'PD',
    color: '#7C3AED',
    change1Y: { val: '-$408.20', pct: '-28.19%', positive: false },
    change5Y: { val: '-$1,022.97', pct: '-49.59%', positive: false },
    change10Y: { val: '+$363.80', pct: '+53.80%', positive: true },
    change20Y: { val: '+$706.55', pct: '+211.86%', positive: true },
    change30Y: { val: '+$923.05', pct: '+788.93%', positive: true },
  },
  {
    asset: 'Copper',
    symbol: 'CU',
    color: '#EA580C',
    change1Y: { val: '+$0.95/lb', pct: '+18.50%', positive: true },
    change5Y: { val: '+$2.45/lb', pct: '+64.20%', positive: true },
    change10Y: { val: '+$3.32/lb', pct: '+112.00%', positive: true },
    change20Y: { val: '+$4.65/lb', pct: '+285.40%', positive: true },
    change30Y: { val: '+$5.05/lb', pct: '+410.20%', positive: true },
  },
  {
    asset: 'Bitcoin (BTC)',
    symbol: 'BTC',
    color: '#F7931A',
    change1Y: { val: '+$38,800', pct: '+112.50%', positive: true },
    change5Y: { val: '+$64,200', pct: '+820.00%', positive: true },
    change10Y: { val: '+$73,000', pct: '+24,500%', positive: true },
    change20Y: { val: 'Inception 2009', pct: 'N/A', positive: true },
    change30Y: { val: 'Inception 2009', pct: 'N/A', positive: true },
  },
];

export const BTC_VS_METALS_COMPARISON = [
  {
    feature: 'Profit Potential & Upside',
    bitcoin: 'Asymmetric exponential upside driven by viral network adoption and fixed 21M limit.',
    metals: 'Steady, defensive capital preservation with lower drawdowns matching long-term inflation.',
  },
  {
    feature: 'Reliability & Track Record',
    bitcoin: '15+ years of algorithmic uptime and programmatic consensus (since Jan 2009).',
    metals: '5,000+ years of universal civilization trust as unassailable money and global central bank reserve.',
  },
  {
    feature: 'Self-Custody & Counterparty Risk',
    bitcoin: 'Cryptographic private key storage; eliminates institutional intermediaries and confiscation risk.',
    metals: 'Zero counterparty risk; physical bars and coins can be stored completely off-grid.',
  },
  {
    feature: 'Physical Tangibility',
    bitcoin: 'Intangible digital ledger; completely dependent on internet connection and electrical power grids.',
    metals: 'Physical commodity you can hold in your hand; unaffected by EMP, server outages, or grid downtime.',
  },
  {
    feature: 'Universal Borderless Portability',
    bitcoin: 'Transferable across international borders in minutes with a smartphone and minimal network fee.',
    metals: 'Heavy and conspicuous to transport internationally; subject to customs declarations and flight weight limits.',
  },
  {
    feature: 'Bullion Purchase Synergy',
    bitcoin: 'Top bullion dealers accept Bitcoin directly and offer a 3% to 4% cash discount over credit cards.',
    metals: 'Hard assets often acquired as a natural profit-taking hedge following major cryptocurrency bull runs.',
  },
];

// Generates high-density, realistic intraday time-series data matching JM Bullion charts
function generateSeries(assetId: AssetType, timeframe: Timeframe, baseVal: number, change24h: number) {
  let count = 48;
  let volatility = 0.008;

  switch (timeframe) {
    case '1D':
      count = 60;
      volatility = 0.004;
      break;
    case '1W':
      count = 42;
      volatility = 0.012;
      break;
    case '1M':
      count = 30;
      volatility = 0.022;
      break;
    case '3M':
      count = 45;
      volatility = 0.038;
      break;
    case '6M':
      count = 52;
      volatility = 0.055;
      break;
    case '1Y':
      count = 60;
      volatility = 0.085;
      break;
    case 'ALL':
      count = 80;
      volatility = 0.18;
      break;
  }

  const points: { label: string; value: number }[] = [];

  for (let i = 0; i < count; i++) {
    const fraction = i / (count - 1);

    // Realistic market wave patterns
    let cycle = Math.sin(i * 0.35) * volatility * baseVal;
    let secondary = Math.cos(i * 0.18) * (volatility * 0.6) * baseVal;
    let trend = (fraction - 0.5) * (volatility * 1.8) * baseVal;

    // Replicate the exact intraday waveform from JM Bullion screenshot for Gold/Silver
    if (assetId === 'goldsilver' && timeframe === '1D') {
      if (i < 10) {
        cycle = Math.sin(i * 0.4) * 0.25 - 0.15;
      } else if (i >= 10 && i < 25) {
        cycle = 0.45 + Math.sin(i * 0.5) * 0.35;
      } else if (i >= 25 && i < 45) {
        cycle = 0.95 + Math.sin(i * 0.3) * 0.25;
      } else {
        cycle = 0.70 - (i - 45) * 0.055;
      }
    }

    // Historical milestone markers for ALL timeframe
    let specialEvent = 0;
    if (timeframe === 'ALL') {
      if (assetId === 'goldsilver') {
        if (i > 35 && i < 48) specialEvent = 38; // 2020 COVID 125 spike
        if (i < 12) specialEvent = -26; // 2011 silver run
      } else if (assetId === 'palladium') {
        if (i > 45 && i < 58) specialEvent = 1400; // 2022 Russian supply spike ($3440)
      } else if (assetId === 'copper') {
        if (i > 65) specialEvent = 0.8; // 2024 AI data center demand run ($5.20)
      }
    }

    const unrounded = baseVal + cycle + secondary + trend + specialEvent;
    const value = Math.max(0.01, Number(unrounded.toFixed(assetId === 'copper' || assetId === 'goldsilver' ? 2 : 2)));

    let label = '';
    if (timeframe === '1D') {
      const minutesTotal = Math.floor(fraction * 24 * 60);
      const hours = Math.floor(minutesTotal / 60);
      const minutes = minutesTotal % 60;
      const ampm = hours < 12 ? 'AM' : 'PM';
      const displayHours = hours % 12 || 12;
      const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
      label = `${displayHours}:${formattedMin} ${ampm}`;
    } else if (timeframe === '1W') {
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      label = dayNames[Math.floor(fraction * 6.99)];
    } else if (timeframe === '1M') {
      label = `Day ${i + 1}`;
    } else if (timeframe === 'ALL') {
      label = `${2016 + Math.floor(fraction * 10)}`;
    } else {
      label = `W${Math.floor(i / 4) + 1}`;
    }

    points.push({ label, value });
  }

  // Pin the final point strictly to current live baseVal
  if (points.length > 0) {
    points[points.length - 1].value = baseVal;
  }

  return points;
}

// Route: /international/gold-silver-ratio/ (and asset-specific routes)
export const ASSET_SLUG_MAP: Record<AssetType, string> = {
  gold: '/market-rates/international-gold-silver/',
  silver: '/market-rates/international-gold-silver/',
  platinum: '/international/platinum/',
  palladium: '/international/palladium/',
  copper: '/international/copper/',
  goldsilver: '/international/gold-silver-ratio/',
  btcusd: '/international/bitcoin/',
};

interface InternationalGSRClientProps {
  initialAsset?: AssetType;
}

export default function InternationalGSRClient({ initialAsset = 'goldsilver' }: InternationalGSRClientProps) {
  const { rates: liveRates, lastFetchedAt } = useInternationalRates();

  // Dynamically populated assets with live data
  const liveAssets: Record<AssetType, AssetConfig> = useMemo(() => ({
    gold: {
      ...ASSETS_METADATA.gold,
      basePriceUSD: liveRates.gold.spotUSD,
      bidUSD: liveRates.gold.spotUSD * 0.999,
      askUSD: liveRates.gold.spotUSD * 1.001,
      change24hUSD: liveRates.gold.change24h,
      changePercent24h: liveRates.gold.changePercent24h,
      high24hUSD: liveRates.gold.high24h,
      low24hUSD: liveRates.gold.low24h,
    },
    silver: {
      ...ASSETS_METADATA.silver,
      basePriceUSD: liveRates.silver.spotUSD,
      bidUSD: liveRates.silver.spotUSD * 0.998,
      askUSD: liveRates.silver.spotUSD * 1.002,
      change24hUSD: liveRates.silver.change24h,
      changePercent24h: liveRates.silver.changePercent24h,
      high24hUSD: liveRates.silver.high24h,
      low24hUSD: liveRates.silver.low24h,
    },
    platinum: {
      ...ASSETS_METADATA.platinum,
      basePriceUSD: liveRates.platinum?.spotUSD ?? ASSETS_METADATA.platinum.basePriceUSD,
      bidUSD: (liveRates.platinum?.spotUSD ?? ASSETS_METADATA.platinum.basePriceUSD) * 0.998,
      askUSD: (liveRates.platinum?.spotUSD ?? ASSETS_METADATA.platinum.basePriceUSD) * 1.002,
      change24hUSD: liveRates.platinum?.change24h ?? ASSETS_METADATA.platinum.change24hUSD,
      changePercent24h: liveRates.platinum?.changePercent24h ?? ASSETS_METADATA.platinum.changePercent24h,
      high24hUSD: liveRates.platinum?.high24h ?? ASSETS_METADATA.platinum.high24hUSD,
      low24hUSD: liveRates.platinum?.low24h ?? ASSETS_METADATA.platinum.low24hUSD,
    },
    palladium: {
      ...ASSETS_METADATA.palladium,
      basePriceUSD: liveRates.palladium?.spotUSD ?? ASSETS_METADATA.palladium.basePriceUSD,
      bidUSD: (liveRates.palladium?.spotUSD ?? ASSETS_METADATA.palladium.basePriceUSD) * 0.997,
      askUSD: (liveRates.palladium?.spotUSD ?? ASSETS_METADATA.palladium.basePriceUSD) * 1.003,
      change24hUSD: liveRates.palladium?.change24h ?? ASSETS_METADATA.palladium.change24hUSD,
      changePercent24h: liveRates.palladium?.changePercent24h ?? ASSETS_METADATA.palladium.changePercent24h,
      high24hUSD: liveRates.palladium?.high24h ?? ASSETS_METADATA.palladium.high24hUSD,
      low24hUSD: liveRates.palladium?.low24h ?? ASSETS_METADATA.palladium.low24hUSD,
    },
    copper: {
      ...ASSETS_METADATA.copper,
      basePriceUSD: liveRates.copper?.spotUSD ?? ASSETS_METADATA.copper.basePriceUSD,
      bidUSD: (liveRates.copper?.spotUSD ?? ASSETS_METADATA.copper.basePriceUSD) * 0.998,
      askUSD: (liveRates.copper?.spotUSD ?? ASSETS_METADATA.copper.basePriceUSD) * 1.002,
      change24hUSD: liveRates.copper?.change24h ?? ASSETS_METADATA.copper.change24hUSD,
      changePercent24h: liveRates.copper?.changePercent24h ?? ASSETS_METADATA.copper.changePercent24h,
      high24hUSD: liveRates.copper?.high24h ?? ASSETS_METADATA.copper.high24hUSD,
      low24hUSD: liveRates.copper?.low24h ?? ASSETS_METADATA.copper.low24hUSD,
    },
    goldsilver: {
      ...ASSETS_METADATA.goldsilver,
      basePriceUSD: liveRates.goldSilverRatio,
      bidUSD: liveRates.goldSilverRatio * 0.999,
      askUSD: liveRates.goldSilverRatio * 1.001,
      change24hUSD: +(liveRates.gold.change24h / liveRates.silver.spotUSD - (liveRates.gold.spotUSD * liveRates.silver.change24h) / (liveRates.silver.spotUSD ** 2)).toFixed(2),
      changePercent24h: +(liveRates.gold.changePercent24h - liveRates.silver.changePercent24h).toFixed(2),
      high24hUSD: +(liveRates.gold.high24h / liveRates.silver.low24h).toFixed(2),
      low24hUSD: +(liveRates.gold.low24h / liveRates.silver.high24h).toFixed(2),
    },
    btcusd: {
      ...ASSETS_METADATA.btcusd,
      basePriceUSD: liveRates.btcusd?.spotUSD ?? ASSETS_METADATA.btcusd.basePriceUSD,
      bidUSD: (liveRates.btcusd?.spotUSD ?? ASSETS_METADATA.btcusd.basePriceUSD) * 0.9998,
      askUSD: (liveRates.btcusd?.spotUSD ?? ASSETS_METADATA.btcusd.basePriceUSD) * 1.0002,
      change24hUSD: liveRates.btcusd?.change24h ?? ASSETS_METADATA.btcusd.change24hUSD,
      changePercent24h: liveRates.btcusd?.changePercent24h ?? ASSETS_METADATA.btcusd.changePercent24h,
      high24hUSD: liveRates.btcusd?.high24h ?? ASSETS_METADATA.btcusd.high24hUSD,
      low24hUSD: liveRates.btcusd?.low24h ?? ASSETS_METADATA.btcusd.low24hUSD,
    },
  }), [liveRates]);

  const liveCurrencies: Record<CurrencyCode, { symbol: string; rateFromUSD: number }> = useMemo(() => ({
    USD: { symbol: '$', rateFromUSD: 1.0 },
    EUR: { symbol: '€', rateFromUSD: 1 / (liveRates.forex.EUR || 1 / 0.92) },
    GBP: { symbol: '£', rateFromUSD: 1 / (liveRates.forex.GBP || 1 / 0.79) },
    CAD: { symbol: 'CA$', rateFromUSD: liveRates.forex.CAD || 1.38 },
    AUD: { symbol: 'A$', rateFromUSD: liveRates.forex.AUD || 1.55 },
  }), [liveRates.forex]);

  const [activeAsset, setActiveAsset] = useState<AssetType>(initialAsset);
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [weight, setWeight] = useState<WeightUnit>('oz');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Swap Arbitrage Calculator State
  const [swapSilverAmount, setSwapSilverAmount] = useState<number>(500);
  const [swapTargetRatio, setSwapTargetRatio] = useState<number>(65);

  useEffect(() => {
    try {
      const d = new Date(lastFetchedAt);
      setLastUpdated(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch { /* ignore */ }
  }, [lastFetchedAt]);

  const asset = liveAssets[activeAsset];
  const currConfig = liveCurrencies[currency];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  const formatPrice = (usdPrice: number, isRatio = false) => {
    if (isRatio || activeAsset === 'goldsilver') {
      return usdPrice.toFixed(2);
    }
    const mult = activeAsset === 'copper' ? 1 : WEIGHT_MULTIPLIERS[weight];
    const converted = usdPrice * currConfig.rateFromUSD * mult;
    if (converted >= 1000) {
      return `${currConfig.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${currConfig.symbol}${converted.toFixed(2)}`;
  };

  // High-density series data
  const seriesData = useMemo(() => {
    return generateSeries(activeAsset, timeframe, asset.basePriceUSD, asset.change24hUSD);
  }, [activeAsset, timeframe, asset.basePriceUSD, asset.change24hUSD]);

  const activePoint = hoverIndex !== null && seriesData[hoverIndex] ? seriesData[hoverIndex] : seriesData[seriesData.length - 1];

  const minVal = useMemo(() => Math.min(...seriesData.map((d) => d.value)) * 0.995, [seriesData]);
  const maxVal = useMemo(() => Math.max(...seriesData.map((d) => d.value)) * 1.005, [seriesData]);
  const range = maxVal - minVal || 1;

  const svgWidth = 850;
  const svgHeight = 300;
  const padding = { top: 25, bottom: 40, left: 15, right: 65 };

  // Y-axis grid levels (5 ticks matching professional financial charts)
  const yTicks = useMemo(() => {
    return [0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
      const y = padding.top + (svgHeight - padding.top - padding.bottom) * (1 - frac);
      const val = minVal + range * frac;
      return { y, val };
    });
  }, [maxVal, minVal, range, padding.top, padding.bottom, svgHeight]);

  const coords = useMemo(() => {
    return seriesData.map((d, i) => {
      const x = padding.left + (i / (seriesData.length - 1)) * (svgWidth - padding.left - padding.right);
      const y = svgHeight - padding.bottom - ((d.value - minVal) / range) * (svgHeight - padding.top - padding.bottom);
      return { x, y };
    });
  }, [seriesData, minVal, range, svgWidth, svgHeight, padding.left, padding.right, padding.top, padding.bottom]);

  // Smooth cubic spline path
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

  // Download CSV handler
  const handleDownloadCSV = () => {
    const headers = ['Timestamp', 'Asset', 'Value', 'Timeframe'];
    const rows = seriesData.map((d) => [d.label, asset.label, d.value, timeframe]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${asset.id}_${timeframe}_chart_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Current 80/50 Rule Indicator status using live GSR
  const gsrValue = liveAssets.goldsilver.basePriceUSD;
  const signal = useMemo(() => {
    if (gsrValue >= 80) {
      return {
        label: 'Silver Undervalued (Buy Silver Signal)',
        description: 'The ratio is above 80:1. Historically, silver represents asymmetric upside relative to gold. Investors accumulate silver or rotate gold ounces into silver stacks.',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dotColor: 'bg-emerald-500',
      };
    } else if (gsrValue <= 50) {
      return {
        label: 'Gold Undervalued (Buy Gold Signal)',
        description: 'The ratio is below 50:1. Gold offers superior defensive value. Investors rotate accumulated silver profits back into gold bars and coins.',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-500',
      };
    } else {
      return {
        label: 'Neutral Historical Range (50:1 to 80:1)',
        description: 'The ratio sits in its normal modern trading channel. Balanced accumulation or dollar-cost averaging in both metals remains standard practice.',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        dotColor: 'bg-amber-500',
      };
    }
  }, [gsrValue]);

  // Arbitrage swap calculations
  const equivalentGoldOzAtLive = swapSilverAmount / gsrValue;
  const equivalentSilverAtTargetRatio = equivalentGoldOzAtLive * swapTargetRatio;
  const netSilverGained = equivalentSilverAtTargetRatio - swapSilverAmount;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 space-y-4 font-sans text-gray-900 font-modern-ui">
      {/* ── HEADER (Clean, Compact, No Dead Space) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {activeAsset === 'goldsilver'
                ? 'Precious Metals & Gold-to-Silver Ratio Live Hub'
                : activeAsset === 'btcusd'
                ? 'Live Bitcoin Spot Price & Real-Time Chart (BTC/USD)'
                : `Live ${asset.label} Price & Real-Time Spot Chart`}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
              {activeAsset === 'btcusd' ? 'Coinbase / Binance Live' : activeAsset === 'copper' ? 'COMEX / LME Live' : 'COMEX / LBMA Live'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {activeAsset === 'goldsilver'
              ? 'Real-time interactive spot charts, cross-commodity valuation ratios, and macroeconomic benchmarks.'
              : `Real-time interactive spot charts, bid/ask spreads, and technical market analytics for ${asset.label}.`}
          </p>
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

      {/* ── MAIN INTERACTIVE CHART (1:1 Layout Matched with JM Bullion) ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* ROW 1: ASSET TABS (Ordered exactly as JM Bullion) */}
        <div className="flex items-center overflow-x-auto border-b border-gray-200 bg-white scrollbar-none px-2 sm:px-4">
          {ASSET_ORDER.map((key) => {
            const item = liveAssets[key];
            const isActive = activeAsset === key;
            const targetHref = ASSET_SLUG_MAP[key];
            return (
              <Link
                key={key}
                href={targetHref}
                onClick={() => {
                  setActiveAsset(key);
                  setHoverIndex(null);
                }}
                className={`px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition border-b-[3px] -mb-px flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#0c3960] text-[#0c3960] bg-[#edf4fb]/70 font-bold'
                    : 'border-transparent text-slate-700 hover:text-[#0c3960] hover:bg-slate-50 font-semibold'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* ROW 2: LIVE METRICS & CONTROLS (Matched with JM Bullion Image) */}
        <div className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100">
          {/* Left: Big Price Display + 24h Change */}
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {activeAsset === 'goldsilver'
                  ? activePoint.value.toFixed(2)
                  : formatPrice(activePoint.value)}
              </span>

              {/* 24h Change Badge */}
              <span
                className={`inline-flex items-center gap-1 font-bold text-sm sm:text-base ${
                  asset.change24hUSD >= 0 ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {asset.change24hUSD >= 0 ? '+' : ''}
                {activeAsset === 'goldsilver' ? asset.change24hUSD.toFixed(2) : asset.change24hUSD.toFixed(2)}
                {' '}
                ({asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%)
              </span>
            </div>

            <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2">
              <span>{lastUpdated} EST</span>
              <span>•</span>
              <span>
                Day Range: {formatPrice(asset.low24hUSD, activeAsset === 'goldsilver')} - {formatPrice(asset.high24hUSD, activeAsset === 'goldsilver')}
              </span>
            </div>
          </div>

          {/* Right: Selectors & Timeframe Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            {/* Currency & Weight Dropdowns */}
            {activeAsset !== 'goldsilver' && activeAsset !== 'btcusd' && (
              <div className="flex items-center gap-1.5">
                {activeAsset !== 'copper' && (
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value as WeightUnit)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-400"
                  >
                    <option value="oz">Troy Ounce</option>
                    <option value="g">Gram</option>
                    <option value="kg">Kilogram</option>
                  </select>
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-400"
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
            <div className="flex items-center gap-1.5">
              <div className="inline-flex p-0.5 bg-gray-100 rounded-lg border border-gray-200">
                {(['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => {
                      setTimeframe(tf);
                      setHoverIndex(null);
                    }}
                    className={`px-2 sm:px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                      timeframe === tf
                        ? 'bg-white text-gray-900 shadow-2xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleDownloadCSV}
                title="Download CSV Chart Data"
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW 3: INTERACTIVE SVG BEZIER SPLINE CHART WITH HOVER */}
        <div className="relative p-2.5 sm:p-4">
          <div className="w-full overflow-hidden relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-64 sm:h-80 cursor-crosshair select-none"
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
                  <stop offset="0%" stopColor={asset.gradientFrom} stopOpacity="0.38" />
                  <stop offset="100%" stopColor={asset.gradientTo} stopOpacity="0.02" />
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
                    r="4.5"
                    fill="#FFFFFF"
                    stroke={asset.themeColor}
                    strokeWidth="2.5"
                  />
                </>
              )}

              {/* X-Axis Time Labels (Distributed evenly) */}
              {seriesData.length > 0 && (
                <>
                  <text x={padding.left} y={svgHeight - 12} fontSize="10" fill="#94A3B8" textAnchor="start">
                    {seriesData[0].label}
                  </text>
                  <text x={svgWidth * 0.25} y={svgHeight - 12} fontSize="10" fill="#94A3B8" textAnchor="middle">
                    {seriesData[Math.floor(seriesData.length * 0.25)].label}
                  </text>
                  <text x={svgWidth * 0.5} y={svgHeight - 12} fontSize="10" fill="#94A3B8" textAnchor="middle">
                    {seriesData[Math.floor(seriesData.length * 0.5)].label}
                  </text>
                  <text x={svgWidth * 0.75} y={svgHeight - 12} fontSize="10" fill="#94A3B8" textAnchor="middle">
                    {seriesData[Math.floor(seriesData.length * 0.75)].label}
                  </text>
                  <text x={svgWidth - padding.right} y={svgHeight - 12} fontSize="10" fill="#94A3B8" textAnchor="end">
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

          {/* Interactive Range Navigator Slider (thumbnail view) */}
          <div className="mt-2 h-7 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden flex items-center px-2 select-none">
            <div className="absolute inset-y-0 left-1/6 right-1/12 bg-amber-100/70 border-x-2 border-amber-500 rounded-sm pointer-events-none flex items-center justify-between px-1">
              <span className="w-1 h-3 bg-amber-600 rounded-full"></span>
              <span className="w-1 h-3 bg-amber-600 rounded-full"></span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 relative z-10">
              Interactive Range Navigator ({timeframe} range selected)
            </span>
          </div>
        </div>
      </div>

      {/* ── ASSET INTELLIGENCE & BENCHMARK METRICS (Extracted from JM Bullion Pages) ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-gray-100 pb-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              {asset.label} Market Intelligence &amp; Key Trading Stats
            </h2>
            <p className="text-[11px] text-gray-500">{asset.summary}</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 self-start sm:self-auto">
            Category: {asset.category.toUpperCase()}
          </span>
        </div>

        {/* 6-Grid Key Trading Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">Bid Price</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5 tabular-nums">
              {formatPrice(asset.bidUSD)}
            </span>
            <span className="text-[9px] text-gray-500">Sell-to-dealer</span>
          </div>

          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">Ask Price</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5 tabular-nums">
              {formatPrice(asset.askUSD)}
            </span>
            <span className="text-[9px] text-gray-500">Buy-from-dealer</span>
          </div>

          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">24h Day Range</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5 tabular-nums truncate">
              {formatPrice(asset.low24hUSD)} - {formatPrice(asset.high24hUSD)}
            </span>
            <span className="text-[9px] text-gray-500">Intraday volatility</span>
          </div>

          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">52-Week Range</span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 block mt-0.5 tabular-nums truncate">
              {formatPrice(asset.low52wUSD)} - {formatPrice(asset.high52wUSD)}
            </span>
            <span className="text-[9px] text-gray-500">1-Year trading channel</span>
          </div>

          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">All-Time High (ATH)</span>
            <span className="text-xs sm:text-sm font-bold text-amber-700 block mt-0.5 tabular-nums">
              {formatPrice(asset.athUSD)}
            </span>
            <span className="text-[9px] text-gray-500 truncate block">{asset.athDate}</span>
          </div>

          <div className="p-2.5 rounded-lg border border-gray-200 bg-slate-50/60">
            <span className="block text-[10px] text-gray-400 font-semibold uppercase">Key Macro Ratio</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 block mt-0.5">
              {asset.macroRatios[0]?.value || 'N/A'}
            </span>
            <span className="text-[9px] text-gray-500 truncate block">{asset.macroRatios[0]?.label || ''}</span>
          </div>
        </div>

        {/* Fundamental Market Drivers for this Asset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-gray-900 block mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Primary Supply &amp; Demand Catalysts
            </span>
            <ul className="space-y-1 text-xs text-gray-600">
              {asset.keyDrivers.map((driver, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-gray-900 block mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Comparative Macro Valuation Metrics
            </span>
            <div className="space-y-1.5">
              {asset.macroRatios.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5 border-b border-gray-200/60 last:border-none">
                  <div>
                    <span className="font-semibold text-gray-800">{r.label}:</span>{' '}
                    <span className="text-[11px] text-gray-500">({r.note})</span>
                  </div>
                  <span className="font-bold text-gray-900 tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 80/50 TRADING RULE SIGNAL CARD (When Gold/Silver is active) ── */}
      {(activeAsset === 'goldsilver' || activeAsset === 'gold' || activeAsset === 'silver') && (
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${signal.dotColor}`}></span>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Current Gold-to-Silver Valuation Signal: {signal.label}
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${signal.badgeColor} self-start sm:self-auto`}>
            GSR {gsrValue.toFixed(2)}:1
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
          {signal.description}
        </p>

        {/* Visual Benchmark Gauge */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
            <span className="text-rose-600">Buy Gold (&lt;50:1)</span>
            <span className="text-amber-700">Historical Channel (50 - 80:1)</span>
            <span className="text-emerald-700">Buy Silver (&gt;80:1)</span>
          </div>
          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden flex relative">
            <div className="w-[30%] bg-rose-300"></div>
            <div className="w-[35%] bg-amber-300"></div>
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
      )}

      {/* ── LIVE PRECIOUS METALS SPOT BOARD & INTRINSIC VALUES DUAL WIDGET ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* LEFT COLUMN: LIVE PRECIOUS METALS SPOT BOARD (USD) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700">
                Live Precious Metals Spot Board (USD)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                COMEX Live
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/70">
                    <th className="py-2 px-2.5">Metal</th>
                    <th className="py-2 px-2.5 text-right">Current</th>
                    <th className="py-2 px-2.5 text-right">High (24h)</th>
                    <th className="py-2 px-2.5 text-right">Low (24h)</th>
                    <th className="py-2 px-2.5 text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {(['gold', 'silver', 'platinum', 'palladium'] as AssetType[]).map((mKey) => {
                    const item = liveAssets[mKey];
                    const isSelected = activeAsset === mKey;
                    return (
                      <tr
                        key={mKey}
                        onClick={() => setActiveAsset(mKey)}
                        className={`cursor-pointer transition hover:bg-slate-50 ${isSelected ? 'bg-amber-50/60 font-bold' : ''}`}
                      >
                        <td className="py-2.5 px-2.5 font-bold text-gray-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.themeColor }}></span>
                          <span>{item.label}</span>
                        </td>
                        <td className="py-2.5 px-2.5 tabular-nums text-right font-extrabold text-gray-900">
                          ${item.basePriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-2.5 tabular-nums text-right text-gray-500 text-[11px]">
                          ${item.high24hUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-2.5 tabular-nums text-right text-gray-500 text-[11px]">
                          ${item.low24hUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className={`py-2.5 px-2.5 tabular-nums text-right font-bold ${item.changePercent24h >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {item.changePercent24h >= 0 ? '+' : ''}{item.changePercent24h.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span>Prices quoted per troy ounce in USD</span>
            <span className="font-semibold text-slate-600">Click any row to switch chart</span>
          </p>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE BULLION INTRINSIC VALUES CALCULATOR */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-3">
          {/* Metal Selection Tabs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Metal</span>
              <span className="text-[11px] text-gray-400">Select active metal</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['gold', 'silver', 'platinum', 'palladium'] as AssetType[]).map((mKey) => {
                const isActive = activeAsset === mKey;
                return (
                  <button
                    key={mKey}
                    type="button"
                    onClick={() => setActiveAsset(mKey)}
                    className={`py-2 px-2 text-xs font-bold rounded-md transition text-center ${
                      isActive
                        ? 'bg-[#0f2942] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {liveAssets[mKey].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit, Currency & Timeframe Selector Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Weight Unit</label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value as WeightUnit)}
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="oz">Troy Ounces (oz)</option>
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Period</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as Timeframe)}
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-md py-1.5 px-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="1D">Day (1D)</option>
                <option value="1W">Week (1W)</option>
                <option value="1M">Month (1M)</option>
                <option value="1Y">Year (1Y)</option>
                <option value="ALL">All Time</option>
              </select>
            </div>
          </div>

          {/* Live Metal Summary Table */}
          {(() => {
            const mAsset = ['gold', 'silver', 'platinum', 'palladium'].includes(activeAsset)
              ? liveAssets[activeAsset]
              : liveAssets.gold;
            const unitMultiplier = weight === 'g' ? 1 / 31.1034768 : weight === 'kg' ? 32.1507466 : 1;
            const convertedCurrent = mAsset.basePriceUSD * currConfig.rateFromUSD * unitMultiplier;
            const convertedHigh = mAsset.high24hUSD * currConfig.rateFromUSD * unitMultiplier;
            const convertedLow = mAsset.low24hUSD * currConfig.rateFromUSD * unitMultiplier;
            const convertedChange = mAsset.change24hUSD * currConfig.rateFromUSD * unitMultiplier;

            // Intrinsic coin/bar values:
            // Sovereign: 7.322g gold fine (0.2354 oz)
            // Half Sovereign: 3.661g gold fine (0.1177 oz)
            // 1oz Gold
            // 1oz Silver
            const gbpRate = liveCurrencies.GBP.rateFromUSD;
            const sovereignIntrinsic = (liveAssets.gold.basePriceUSD * 0.2354) * gbpRate;
            const halfSovereignIntrinsic = (liveAssets.gold.basePriceUSD * 0.1177) * gbpRate;
            const oneOzGoldIntrinsic = liveAssets.gold.basePriceUSD * gbpRate;
            const oneOzSilverIntrinsic = liveAssets.silver.basePriceUSD * gbpRate;

            return (
              <div className="space-y-2.5">
                {/* Active Metal Price Box */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-3 py-1.5 text-center font-bold text-xs text-slate-800 border-b border-slate-200">
                    Live {mAsset.label} Price ({currConfig.symbol}/{weight})
                  </div>
                  <div className="grid grid-cols-4 text-center divide-x divide-slate-100 text-xs py-2 bg-white">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Current</span>
                      <span className="font-extrabold text-slate-900 tabular-nums text-sm">
                        {currConfig.symbol}{convertedCurrent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">High</span>
                      <span className="font-semibold text-slate-700 tabular-nums">
                        {currConfig.symbol}{convertedHigh.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Low</span>
                      <span className="font-semibold text-slate-700 tabular-nums">
                        {currConfig.symbol}{convertedLow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Change</span>
                      <span className={`font-bold tabular-nums ${mAsset.changePercent24h >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {convertedChange >= 0 ? '+' : ''}{currConfig.symbol}{convertedChange.toFixed(2)} ({mAsset.changePercent24h >= 0 ? '+' : ''}{mAsset.changePercent24h.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Intrinsic Bullion Coin Values */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-3 py-1.5 text-center font-bold text-xs text-slate-800 border-b border-slate-200">
                    Intrinsic Values (£ GBP Melt Standard)
                  </div>
                  <div className="grid grid-cols-4 text-center divide-x divide-slate-100 text-xs py-2 bg-white">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Sovereign</span>
                      <span className="font-bold text-slate-900 tabular-nums text-xs sm:text-sm">
                        £{sovereignIntrinsic.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Half Sovereign</span>
                      <span className="font-bold text-slate-900 tabular-nums text-xs sm:text-sm">
                        £{halfSovereignIntrinsic.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">1oz Gold</span>
                      <span className="font-bold text-slate-900 tabular-nums text-xs sm:text-sm">
                        £{oneOzGoldIntrinsic.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">1oz Silver</span>
                      <span className="font-bold text-slate-900 tabular-nums text-xs sm:text-sm">
                        £{oneOzSilverIntrinsic.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Macro Ratio & FX Quick Ticker */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700">Gold:Silver Ratio:</span>
                    <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs border border-slate-200">
                      {liveAssets.goldsilver.basePriceUSD.toFixed(3)}
                    </span>
                    <Link
                      href="/international/gold-silver-ratio/"
                      className="text-[11px] text-[#0c3960] hover:underline font-semibold ml-1"
                    >
                      &gt; View Metal Ratio Graphs
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-500">Foreign Exchange:</span>
                    <span className="font-mono text-[11px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded">
                      USD: {(1 / (liveRates.forex.GBP || 0.79)).toFixed(4)}
                    </span>
                    <span className="font-mono text-[11px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded">
                      EUR: {((1 / (liveRates.forex.GBP || 0.79)) * (liveRates.forex.EUR || 0.92)).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── CROSS-ASSET MASTER BOARD TABLE ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Live Precious &amp; Industrial Commodity Board ({currency})
            </h3>
            <p className="text-[11px] text-gray-500">
              Cross-asset pricing, 24-hour ranges, and 52-week highs extracted from COMEX, LME, and spot exchanges.
            </p>
          </div>
          <span className="text-[10px] font-semibold text-gray-400">Click any row to switch chart</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-2 px-2.5">Asset</th>
                <th className="py-2 px-2.5">Current Spot</th>
                <th className="py-2 px-2.5">Bid / Ask</th>
                <th className="py-2 px-2.5">24h Day Range</th>
                <th className="py-2 px-2.5">52-Week Range</th>
                <th className="py-2 px-2.5">24h Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {ASSET_ORDER.map((key) => {
                const item = liveAssets[key];
                const isSelected = activeAsset === key;
                return (
                  <tr
                    key={key}
                    onClick={() => setActiveAsset(key)}
                    className={`cursor-pointer transition hover:bg-gray-50 ${isSelected ? 'bg-amber-50/50 font-bold' : ''}`}
                  >
                    <td className="py-2 px-2.5 font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.themeColor }}></span>
                      <span>{item.label}</span>
                      {isSelected && <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-bold">Active</span>}
                    </td>
                    <td className="py-2 px-2.5 tabular-nums text-gray-900 font-bold">
                      {formatPrice(item.basePriceUSD, key === 'goldsilver')} {key === 'goldsilver' ? ': 1' : ''}
                    </td>
                    <td className="py-2 px-2.5 tabular-nums text-gray-500 text-[11px]">
                      {formatPrice(item.bidUSD, key === 'goldsilver')} / {formatPrice(item.askUSD, key === 'goldsilver')}
                    </td>
                    <td className="py-2 px-2.5 tabular-nums text-gray-500 text-[11px]">
                      {formatPrice(item.low24hUSD, key === 'goldsilver')} - {formatPrice(item.high24hUSD, key === 'goldsilver')}
                    </td>
                    <td className="py-2 px-2.5 tabular-nums text-gray-500 text-[11px]">
                      {formatPrice(item.low52wUSD, key === 'goldsilver')} - {formatPrice(item.high52wUSD, key === 'goldsilver')}
                    </td>
                    <td className={`py-2 px-2.5 font-bold tabular-nums ${item.changePercent24h >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {item.changePercent24h >= 0 ? '+' : ''}{item.changePercent24h.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MULTI-UNIT VALUATION BREAKDOWN (Per Oz, Gram, Kilo, Pound) ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-gray-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-600" />
              {asset.label} Multi-Unit Weight Valuation Matrix ({currency})
            </h3>
            <p className="text-[11px] text-gray-500">
              Live standard unit conversions based on official COMEX, LBMA, and LME specifications.
            </p>
          </div>
          <span className="text-[10px] font-semibold text-gray-400">
            Selected Currency: {currency}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {activeAsset === 'goldsilver' ? (
            <>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-amber-50/50">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Ratio per Troy Ounce</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-800 block mt-0.5 tabular-nums">
                  {gsrValue.toFixed(2)} : 1
                </span>
                <span className="text-[10px] text-gray-500">1 oz Gold = {gsrValue.toFixed(2)} oz Silver</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Per 100 Grams</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {(gsrValue * 100).toLocaleString(undefined, { maximumFractionDigits: 0 })} g
                </span>
                <span className="text-[10px] text-gray-400">100g Gold equivalent in Silver</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Per Kilogram (1,000g)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {gsrValue.toFixed(2)} kg
                </span>
                <span className="text-[10px] text-gray-400">1 kg Gold equivalent in Silver</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Per Tola (11.66g)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {gsrValue.toFixed(2)} tolas
                </span>
                <span className="text-[10px] text-gray-400">South Asian bullion unit parity</span>
              </div>
            </>
          ) : activeAsset === 'btcusd' ? (
            <>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-amber-50/50">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">1 Bitcoin (BTC)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD)}
                </span>
                <span className="text-[10px] text-gray-500">Whole coin price</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">1 Satoshi (1/100M)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {currConfig.symbol}{( (asset.basePriceUSD * currConfig.rateFromUSD) / 100000000 ).toFixed(6)}
                </span>
                <span className="text-[10px] text-gray-400">Smallest BTC unit</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Gold Equivalent</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-800 block mt-0.5 tabular-nums">
                  {(asset.basePriceUSD / liveAssets.gold.basePriceUSD).toFixed(2)} oz Gold
                </span>
                <span className="text-[10px] text-gray-400">Gold ounces per 1 BTC</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Silver Equivalent</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-800 block mt-0.5 tabular-nums">
                  {(asset.basePriceUSD / liveAssets.silver.basePriceUSD).toFixed(0)} oz Silver
                </span>
                <span className="text-[10px] text-gray-400">Silver ounces per 1 BTC</span>
              </div>
            </>
          ) : activeAsset === 'copper' ? (
            <>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-amber-50/50">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Pound (lb)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD)}
                </span>
                <span className="text-[10px] text-gray-500">COMEX spot standard</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Ounce (oz)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD / 16)}
                </span>
                <span className="text-[10px] text-gray-400">1 oz copper round benchmark</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Kilogram</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD * 2.20462)}
                </span>
                <span className="text-[10px] text-gray-400">Metric fabrication benchmark</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Metric Ton (MT)</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD * 2204.62)}
                </span>
                <span className="text-[10px] text-gray-400">LME commercial lot size</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-amber-50/50">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Troy Ounce</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD)}
                </span>
                <span className="text-[10px] text-gray-500">31.1035 grams standard</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Gram</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD / 31.1034768)}
                </span>
                <span className="text-[10px] text-gray-400">Retail jewelry metric unit</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per 10 Grams</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice((asset.basePriceUSD / 31.1034768) * 10)}
                </span>
                <span className="text-[10px] text-gray-400">Standard Asian investment bar</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/80">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">Price per Kilogram</span>
                <span className="text-sm sm:text-base font-extrabold text-gray-900 block mt-0.5 tabular-nums">
                  {formatPrice(asset.basePriceUSD * 32.1507466)}
                </span>
                <span className="text-[10px] text-gray-400">1,000 grams cast bar</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── HISTORICAL MULTI-YEAR PERFORMANCE MATRIX (1Y, 5Y, 10Y, 20Y, 30Y from JM Bullion) ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Historical Precious Metals &amp; Asset Performance Matrix
            </h3>
            <p className="text-[11px] text-gray-500">
              Long-term multi-decade price changes and compound capital growth benchmarks (1 Year to 30 Years).
            </p>
          </div>
          <span className="text-[10px] font-semibold text-gray-400">USD Baseline Returns</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-2 px-2.5">Commodity / Asset</th>
                <th className="py-2 px-2.5">1 Year Return</th>
                <th className="py-2 px-2.5">5 Years Return</th>
                <th className="py-2 px-2.5">10 Years Return</th>
                <th className="py-2 px-2.5">20 Years Return</th>
                <th className="py-2 px-2.5">30 Years Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {HISTORICAL_RETURNS_DATA.map((row) => (
                <tr key={row.asset} className="hover:bg-gray-50 transition">
                  <td className="py-2.5 px-2.5 font-bold text-gray-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }}></span>
                    <span>{row.asset}</span>
                    <span className="text-[10px] text-gray-400 font-normal">({row.symbol})</span>
                  </td>
                  <td className="py-2.5 px-2.5 tabular-nums">
                    <span className={`font-bold block ${row.change1Y.positive ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.change1Y.pct}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{row.change1Y.val}</span>
                  </td>
                  <td className="py-2.5 px-2.5 tabular-nums">
                    <span className={`font-bold block ${row.change5Y.positive ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.change5Y.pct}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{row.change5Y.val}</span>
                  </td>
                  <td className="py-2.5 px-2.5 tabular-nums">
                    <span className={`font-bold block ${row.change10Y.positive ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.change10Y.pct}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{row.change10Y.val}</span>
                  </td>
                  <td className="py-2.5 px-2.5 tabular-nums">
                    <span className={`font-bold block ${row.change20Y.positive ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.change20Y.pct}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{row.change20Y.val}</span>
                  </td>
                  <td className="py-2.5 px-2.5 tabular-nums">
                    <span className={`font-bold block ${row.change30Y.positive ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.change30Y.pct}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{row.change30Y.val}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BITCOIN VS PHYSICAL PRECIOUS METALS HEAD-TO-HEAD COMPARISON ── */}
      {(activeAsset === 'btcusd' || activeAsset === 'goldsilver') && (
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Comparing Investments: Bitcoin (&quot;Digital Gold&quot;) vs. Physical Precious Metals
            </h3>
            <p className="text-[11px] text-gray-500">
              Understanding why modern investors allocate across both cryptographic digital money and tangible bullion.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
            Bullion Cash Discount: 3% - 4%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Benefits of Physical Precious Metals</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>5,000-Year Track Record:</strong> Proven store of value across every monetary collapse and regime change in human history.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Absolute Off-Grid Tangibility:</strong> Can be held physically in private possession with zero electricity or internet required.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Industrial Floor Demand:</strong> Unmatched electrical conductivity and solar PV demand guarantee persistent real-world consumption.</span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F7931A]"></span>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Benefits of Bitcoin (&quot;Digital Gold&quot;)</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Strict 21M Hard Cap:</strong> Programmatically enforced mathematical scarcity divided into 100M satoshis with zero dilution.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Frictionless Global Portability:</strong> Billions of dollars can be transferred across international borders in minutes with minimal network fees.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Bullion Dealer Discounts:</strong> Leading international precious metals mints offer 3% to 4% invoice discounts for Bitcoin payments.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Feature Table */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                <th className="py-2 px-3 w-1/4">Key Dimension</th>
                <th className="py-2 px-3 w-3/8 text-orange-950 bg-orange-50/40">Bitcoin (BTC)</th>
                <th className="py-2 px-3 w-3/8 text-amber-950 bg-amber-50/40">Physical Precious Metals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BTC_VS_METALS_COMPARISON.map((comp, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-900">{comp.feature}</td>
                  <td className="py-2 px-3 text-gray-700 bg-orange-50/20">{comp.bitcoin}</td>
                  <td className="py-2 px-3 text-gray-700 bg-amber-50/20">{comp.metals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* ── RATIO ARBITRAGE & SWAP CALCULATOR ── */}
      {(activeAsset === 'goldsilver' || activeAsset === 'gold' || activeAsset === 'silver') && (
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center gap-1.5">
            <ArrowRightLeft className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              Gold - Silver Ratio Swap Arbitrage Calculator
            </h3>
          </div>
          <span className="text-[11px] text-gray-500">Rotate metal holdings to compound ounces</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 font-bold text-gray-900 text-sm focus:border-amber-500 outline-none"
            />
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              Market value: ~${(swapSilverAmount * liveAssets.silver.basePriceUSD).toLocaleString()} USD
            </span>
          </div>

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
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 font-bold text-gray-900 text-sm focus:border-amber-500 outline-none"
            />
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              Benchmark when swapping gold back into silver
            </span>
          </div>
        </div>

        {/* Swap Results Banner */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1 text-xs text-amber-950">
          <div className="flex items-center justify-between font-bold text-xs">
            <span>Converted to Gold at Live Ratio ({gsrValue.toFixed(1)}:1):</span>
            <span className="text-amber-800">{equivalentGoldOzAtLive.toFixed(3)} oz Gold</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span>Swapped back into Silver when ratio reaches {swapTargetRatio}:1:</span>
            <span className="font-bold text-emerald-800">{equivalentSilverAtTargetRatio.toFixed(1)} oz Silver</span>
          </div>
          <div className="pt-1 border-t border-amber-200 flex items-center justify-between font-extrabold text-emerald-800 text-xs">
            <span>Net Silver Stack Growth:</span>
            <span>+{netSilverGained.toFixed(1)} oz (+{((netSilverGained / swapSilverAmount) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>
      )}

      {/* ── HISTORICAL BENCHMARKS COMPARISON TABLE ── */}
      {(activeAsset === 'goldsilver' || activeAsset === 'gold' || activeAsset === 'silver') && (
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-4 shadow-2xs">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
          Historical Gold-to-Silver Ratio Milestones &amp; Macro Regimes
        </h3>
        <p className="text-[11px] text-gray-500 mb-2.5">
          Key inflection points, all-time records, and macroeconomic regimes across modern monetary history.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/60">
                <th className="py-2 px-2.5">Era / Event</th>
                <th className="py-2 px-2.5">GSR Level</th>
                <th className="py-2 px-2.5">Macro Driver</th>
                <th className="py-2 px-2.5">Market Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="bg-emerald-50/30">
                <td className="py-2 px-2.5 font-bold text-gray-900">April 2020 (COVID Shock)</td>
                <td className="py-2 px-2.5 font-extrabold text-emerald-800">125:1</td>
                <td className="py-2 px-2.5 text-gray-600">Global industrial shutdown, safe-haven flight to gold</td>
                <td className="py-2 px-2.5 text-emerald-700 font-bold">All-Time Peak (Extreme Buy Silver)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-bold text-gray-900">1991 Gulf War Crisis</td>
                <td className="py-2 px-2.5 font-semibold text-gray-800">100:1</td>
                <td className="py-2 px-2.5 text-gray-600">Geopolitical turmoil and commodity stagnation</td>
                <td className="py-2 px-2.5 text-emerald-700 font-semibold">Silver Heavily Discounted</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-2 px-2.5 font-bold text-gray-900">Today (Live Spot)</td>
                <td className="py-2 px-2.5 font-extrabold text-amber-800">{gsrValue.toFixed(2)}:1</td>
                <td className="py-2 px-2.5 text-gray-600">Central bank gold purchases vs growing solar silver demand</td>
                <td className="py-2 px-2.5 text-amber-800 font-bold">Neutral - Favorable to Silver</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-bold text-gray-900">50-Year Modern Mean</td>
                <td className="py-2 px-2.5 font-semibold text-gray-800">65:1</td>
                <td className="py-2.5 px-3 text-gray-600">Post-1971 free-floating currency benchmark</td>
                <td className="py-2 px-2.5 text-gray-600">Historical Fair Value Baseline</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-bold text-gray-900">April 2011 Silver Bull Run</td>
                <td className="py-2 px-2.5 font-bold text-rose-700">31:1</td>
                <td className="py-2 px-2.5 text-gray-600">Silver touched $49.50/oz during post-GFC monetary easing</td>
                <td className="py-2 px-2.5 text-rose-700 font-bold">Silver Overvalued (Rotate to Gold)</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-bold text-gray-900">1980 Hunt Brothers Squeeze</td>
                <td className="py-2 px-2.5 font-bold text-rose-700">15:1</td>
                <td className="py-2 px-2.5 text-gray-600">Speculative cornering of physical silver market</td>
                <td className="py-2 px-2.5 text-rose-700 font-bold">Historic Extreme Low</td>
              </tr>
              <tr>
                <td className="py-2 px-2.5 font-bold text-gray-900">US Coinage Act 1792</td>
                <td className="py-2 px-2.5 font-semibold text-gray-800">15:1</td>
                <td className="py-2 px-2.5 text-gray-600">Statutory bimetallic standard established by Alexander Hamilton</td>
                <td className="py-2 px-2.5 text-gray-500">Government Fixed Peg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
