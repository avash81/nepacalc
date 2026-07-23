'use client';
import Link from 'next/link';

import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Scale, 
  RotateCcw,
  Coins, 
  Sparkles, 
  Calculator, 
  Clock, 
  ArrowRightLeft, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  DollarSign, 
  TrendingUp, 
  Info, 
  ShieldCheck,
  Award,
  Plus,
  Trash2,
  Wrench,
  BarChart3,
  History,
  ShoppingBag
} from 'lucide-react';

import { 
  SILVER_UNITS as GRAM_FACTORS, 
  SILVER_PURITY as PURITY_FACTORS, 
  HISTORICAL_RATES,
  formatters,
  ERRORS,
  validateInput
} from '@/utils/silverConstants';

const PRESETS = [
  { label: '1 Tola', weight: 1, unit: 'Tola' },
  { label: '5 Tola', weight: 5, unit: 'Tola' },
  { label: '10 Tola', weight: 10, unit: 'Tola' },
  { label: '10 Grams', weight: 10, unit: 'Gram' },
  { label: '50 Grams', weight: 50, unit: 'Gram' },
  { label: '100 Grams', weight: 100, unit: 'Gram' },
  { label: '1 Kg', weight: 1, unit: 'Kilogram' },
  { label: '1 Troy Oz', weight: 1, unit: 'Troy Ounce' },
  { label: '50 Lal', weight: 50, unit: 'Lal' },
];

interface BasketItem {
  id: string;
  name: string;
  weight: number;
  unit: string;
  purity: string;
}

export default function SilverCalculatorComponent() {
  const [activeTab, setActiveTab] = useState<string>('weight'); // 'weight' | 'value' | 'jewellery' | 'investment' | 'historical' | 'pro'

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const searchParams = new URLSearchParams(window.location.search);
      const mode = hash || searchParams.get('mode');
      if (mode && ['weight', 'value', 'jewellery', 'investment'].includes(mode)) {
        setActiveTab(mode);
      }
      if (searchParams.get('weight')) setWeight(Number(searchParams.get('weight')));
      if (searchParams.get('purity')) setPurityKey(searchParams.get('purity') as string);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${tab}`);
    }
  };
  
  // Universal Input State
  const [weight, setWeight] = useState<number | ''>(0);
  const [fromUnit, setFromUnit] = useState<string>('Tola');
  const [toUnit, setToUnit] = useState<string>('Gram');
  const [purityKey, setPurityKey] = useState<string>('999');
  const [silverRatePerTola, setSilverRatePerTola] = useState<number | ''>(0);
  
  // Jewellery Tab Inputs (Module 5)
  const [makingChargeType, setMakingChargeType] = useState<'fixed' | 'percent'>('percent');
  const [makingChargeValue, setMakingChargeValue] = useState<number | ''>(0);
  const [vatPercent, setVatPercent] = useState<number | ''>(0);
  
  // Buyback / Scrap Inputs (Module 6 & 12)
  const [buybackDiscount, setBuybackDiscount] = useState<number | ''>(0);
  
  // Investment / Reverse Budget Inputs (Module 3 & 7)
  const [budgetNpr, setBudgetNpr] = useState<number | ''>(0);
  
  // SIP Investment Inputs
  const [sipInitial, setSipInitial] = useState<number | ''>(0);
  const [sipRecurring, setSipRecurring] = useState<number | ''>(0);
  const [sipFrequency, setSipFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [sipDuration, setSipDuration] = useState<number | ''>(0);
  const [sipGrowth, setSipGrowth] = useState<number | ''>(0);
  // Historical Rate Inputs (Module 8)
  const [historicalYear, setHistoricalYear] = useState<string>('2080 (2 Years Ago)');

  // Manufacturing / Goldsmith Inputs (Module 13)
  const [targetPurity, setTargetPurity] = useState<number | ''>(925);

  // Multi-Item Basket State (Module 14)
  const [basket, setBasket] = useState<BasketItem[]>([
    { id: '1', name: 'Silver Ring', weight: 5, unit: 'Gram', purity: '925' },
    { id: '2', name: 'Silver Chain', weight: 25, unit: 'Gram', purity: '925' },
  ]);

  const [copied, setCopied] = useState<boolean>(false);

  // Calculations Engine (Gram Pivot)
  const math = useMemo(() => {
    const w = Number(weight) || 0;
    const rate = Number(silverRatePerTola) || 0;
    const makingVal = Number(makingChargeValue) || 0;
    const vat = Number(vatPercent) || 0;
    const buyback = Number(buybackDiscount) || 0;
    const budget = Number(budgetNpr) || 0;
    const tPurity = Number(targetPurity) || 925;

    const inputGrams = w * (GRAM_FACTORS[fromUnit] || 1);
    const targetFactor = GRAM_FACTORS[toUnit] || 1;
    const convertedVal = inputGrams / targetFactor;

    const purityObj = PURITY_FACTORS[purityKey] || PURITY_FACTORS['999'];
    const pureGrams = inputGrams * purityObj.factor;
    const alloyGrams = inputGrams - pureGrams;

    // Value calculations based on rate per Tola in NPR
    const totalTolas = inputGrams / GRAM_FACTORS['Tola'];
    const metalValueNpr = totalTolas * rate * purityObj.factor;

    // Jewellery making charge & VAT
    let makingChargeNpr = 0;
    if (makingChargeType === 'percent') {
      makingChargeNpr = (metalValueNpr * makingVal) / 100;
    } else {
      makingChargeNpr = makingVal;
    }
    const subtotalWithMaking = metalValueNpr + makingChargeNpr;
    const vatNpr = (subtotalWithMaking * vat) / 100;
    const finalJewelleryCostNpr = subtotalWithMaking + vatNpr;

    // Buyback / Scrap Calculation
    const buybackValueNpr = metalValueNpr * (1 - buyback / 100);

    // Multi-unit equivalent breakdown
    const breakdown = {
      grams: inputGrams,
      tolas: inputGrams / GRAM_FACTORS['Tola'],
      lals: inputGrams / GRAM_FACTORS['Lal'],
      aanas: inputGrams / GRAM_FACTORS['Aana'],
      rattis: inputGrams / GRAM_FACTORS['Ratti'],
      kgs: inputGrams / GRAM_FACTORS['Kilogram'],
      troyOz: inputGrams / GRAM_FACTORS['Troy Ounce'],
      oz: inputGrams / GRAM_FACTORS['Ounce'],
    };

    // Reverse Budget Calculations (Rs -> Weight)
    const budgetTolas = (rate > 0 && budget > 0) ? budget / rate : 0;
    const budgetGrams = budgetTolas * GRAM_FACTORS['Tola'];
    const budgetKgs = budgetGrams / 1000;
    const budgetTroyOz = budgetGrams / GRAM_FACTORS['Troy Ounce'];

    // Historical Value Comparison
    const pastRate = HISTORICAL_RATES[historicalYear] || 1400;
    const pastValueNpr = totalTolas * pastRate * purityObj.factor;
    const priceDifferenceNpr = metalValueNpr - pastValueNpr;
    const percentageReturn = pastValueNpr > 0 ? (priceDifferenceNpr / pastValueNpr) * 100 : 0;

    // Manufacturing / Goldsmith Calculation (Pure silver + copper alloy)
    // Target purity e.g. 925 means Pure / (Pure + Copper) = 0.925
    // Required Copper = PureGrams * (1 - tPurity/1000) / (tPurity/1000)
    const targetFactorDec = (tPurity || 925) / 1000;
    const requiredCopperGrams = targetFactorDec > 0 ? (pureGrams / targetFactorDec) - pureGrams : 0;
    const finalFinishedWeightGrams = pureGrams + requiredCopperGrams;

    // Silver SIP Investment Calculation
    const initInv = Number(sipInitial) || 0;
    const pmt = Number(sipRecurring) || 0;
    const dur = Number(sipDuration) || 0;
    const growth = Number(sipGrowth) || 0;
    
    // Convert to periods based on frequency
    const nPeriods = sipFrequency === 'monthly' ? dur * 12 : dur;
    const rRate = sipFrequency === 'monthly' ? (growth / 100) / 12 : (growth / 100);
    
    const sipTotalInvested = initInv + (pmt * nPeriods);
    let sipFutureValue = initInv;
    
    if (rRate === 0) {
      sipFutureValue = sipTotalInvested;
    } else {
      // Future Value of Initial + Future Value of Series (PMT)
      sipFutureValue = initInv * Math.pow(1 + rRate, nPeriods) + pmt * ((Math.pow(1 + rRate, nPeriods) - 1) / rRate) * (1 + rRate);
    }
    
    const sipProfit = sipFutureValue - sipTotalInvested;
    
    // Future estimated weight if they bought all that silver at the end (assuming rate grew by same %)
    const futureSilverRate = rate > 0 ? rate * Math.pow(1 + (growth / 100), dur) : 0;
    const sipFutureTolas = futureSilverRate > 0 ? sipFutureValue / futureSilverRate : 0;
    const sipFutureKgs = (sipFutureTolas * GRAM_FACTORS['Tola']) / 1000;

    // Multi-item basket total
    const basketTotalGrams = basket.reduce((acc, item) => acc + (item.weight * (GRAM_FACTORS[item.unit] || 1)), 0);
    const basketTotalTolas = basketTotalGrams / GRAM_FACTORS['Tola'];
    const basketTotalValueNpr = basket.reduce((acc, item) => {
      const g = item.weight * (GRAM_FACTORS[item.unit] || 1);
      const t = g / GRAM_FACTORS['Tola'];
      const p = PURITY_FACTORS[item.purity]?.factor || 1.0;
      return acc + (t * rate * p);
    }, 0);

    return {
      convertedVal,
      inputGrams,
      pureGrams,
      alloyGrams,
      totalTolas,
      metalValueNpr,
      makingChargeNpr,
      vatNpr,
      finalJewelleryCostNpr,
      buybackValueNpr,
      breakdown,
      reverse: {
        budgetTolas,
        budgetGrams,
        budgetKgs,
        budgetTroyOz,
      },
      historical: {
        pastRate,
        pastValueNpr,
        priceDifferenceNpr,
        percentageReturn,
      },
      manufacturing: {
        pureGrams,
        requiredCopperGrams,
        finalFinishedWeightGrams
      },
      sip: {
        totalInvested: sipTotalInvested,
        futureValue: sipFutureValue,
        profit: sipProfit,
        futureTolas: sipFutureTolas,
        futureKgs: sipFutureKgs
      },
      basket: {
        basketTotalGrams,
        basketTotalTolas,
        basketTotalValueNpr,
      }
    };
  }, [
    weight, fromUnit, toUnit, purityKey, silverRatePerTola, 
    makingChargeType, makingChargeValue, vatPercent, buybackDiscount,
    budgetNpr, historicalYear, targetPurity, basket,
    sipInitial, sipRecurring, sipFrequency, sipDuration, sipGrowth
  ]);

  const handleReset = () => {
    setWeight('');
    setSilverRatePerTola('');
    setMakingChargeValue('');
    setVatPercent('');
    setBuybackDiscount('');
    setBudgetNpr('');
    setTargetPurity(925);
    setBasket([]);
  };

  const handleCopy = () => {
    const text = `${weight} ${fromUnit} of ${PURITY_FACTORS[purityKey].name} = ${math.convertedVal.toFixed(4)} ${toUnit} (${math.breakdown.grams.toFixed(2)}g). Market Value: Rs. ${Math.round(math.metalValueNpr).toLocaleString()} NPR.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddBasketItem = () => {
    setBasket([...basket, {
      id: Date.now().toString(),
      name: `Item ${basket.length + 1}`,
      weight: 10,
      unit: 'Gram',
      purity: '925'
    }]);
  };

  const handleRemoveBasketItem = (id: string) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  return (
    <ModernCalcLayout
      slug="silver-converter"
      calculatorPosition="top"
      layout="split"
      fullWidth={true}
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Silver Converter Nepal' }
      ]}
      compactHeader={true}
      titleClassName="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight"
      title="Silver Converter Nepal: Convert Gram, Tola, Lal & Calculate Silver Value"
      description="Convert silver weights between Tola, Lal, Aana, Gram, Kg, and Troy Ounce. Includes live silver rates in NPR, 925 sterling purity adjustments, jewellery pricing, and investment valuation."
      icon={Coins}
      inputs={
        <div className="space-y-6">
          {/* Navigation Tabs (Phase 8 Modular Structure) */}
          <div className="flex flex-wrap gap-1.5 border-b border-[#DADCE0] pb-3 no-print">
            {[
              { id: 'weight', label: 'Weight Converter', icon: Scale },
              { id: 'value', label: 'Silver Value & Reverse', icon: DollarSign },
              { id: 'jewellery', label: 'Jewellery & Making', icon: ShoppingBag },
              { id: 'investment', label: 'Investment & Bulk', icon: BarChart3 },
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-md transition-all ${
                    isActive 
                      ? 'bg-[#1A73E8] text-white shadow-sm' 
                      : 'bg-[#F8F9FA] text-[#5F6368] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Weight Converter Mode (Default) */}
          {activeTab === 'weight' && (
            <div className="space-y-6">
              {/* Quick Preset Action Chips */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-bold uppercase text-[#70757A]">Quick Presets</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setWeight(p.weight);
                        setFromUnit(p.unit);
                      }}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] border border-[#DADCE0] rounded-full transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Converter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#F8F9FA] p-4 border border-[#DADCE0] rounded-lg">
                <div className="sm:col-span-5 space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#70757A]">Enter Weight</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                    className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#70757A]">From Unit</label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                  >
                    {Object.keys(GRAM_FACTORS).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-center pt-4 sm:pt-0">
                  <button
                    onClick={() => {
                      const temp = fromUnit;
                      setFromUnit(toUnit);
                      setToUnit(temp);
                    }}
                    title="Swap Units"
                    className="p-3 bg-white border border-[#DADCE0] rounded-full hover:bg-[#E8F0FE] hover:border-[#1A73E8] text-[#1A73E8] transition-all shadow-sm"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#70757A]">To Unit</label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                  >
                    {Object.keys(GRAM_FACTORS).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purity & Silver Rate Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#70757A]">Silver Purity Grade</label>
                  <select
                    value={purityKey}
                    onChange={(e) => setPurityKey(e.target.value)}
                    className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-semibold text-[#202124] focus:border-[#1A73E8] outline-none"
                  >
                    {Object.entries(PURITY_FACTORS).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#70757A]">Silver Rate (NPR / Tola)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm font-bold text-[#5F6368]">Rs.</span>
                    <input
                      type="number"
                      min="0"
                      value={silverRatePerTola}
                      onChange={(e) => setSilverRatePerTola(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-11 pl-12 pr-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Derived Market Rates */}
              <div className="bg-white border border-[#1A73E8]/20 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#1A73E8]" />
                  <h4 className="text-xs font-bold text-[#1A73E8] uppercase tracking-wider">Derived Market Rates</h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { label: 'Per Gram', val: (Number(silverRatePerTola) || 0) / GRAM_FACTORS['Tola'] },
                    { label: 'Per Lal', val: (Number(silverRatePerTola) || 0) / 100 },
                    { label: 'Per Aana', val: (Number(silverRatePerTola) || 0) / 16 },
                    { label: 'Per Kg', val: ((Number(silverRatePerTola) || 0) / GRAM_FACTORS['Tola']) * 1000 },
                    { label: 'Per Troy Oz', val: ((Number(silverRatePerTola) || 0) / GRAM_FACTORS['Tola']) * GRAM_FACTORS['Troy Ounce'] },
                  ].map(rate => (
                    <div key={rate.label} className="bg-[#F8F9FA] p-2 rounded border border-[#DADCE0] text-center">
                      <span className="block text-[9px] font-bold text-[#70757A] uppercase">{rate.label}</span>
                      <span className="block text-xs font-black text-[#202124]">Rs. {rate.val > 1000 ? Math.round(rate.val).toLocaleString() : rate.val.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset All Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 mt-6 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg text-sm font-bold text-red-600 flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-red-500" />
                <span>Reset All Fields</span>
              </button>
            </div>
          )}

          {/* TAB 2: Silver Value & Reverse Calculator */}
          {activeTab === 'value' && (
            <div className="space-y-6">
              <div className="bg-[#E8F0FE]/50 border border-[#1A73E8]/30 rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#1A73E8] flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" /> Reverse Calculation (Budget to Silver Weight)
                  </div>
                  <span className="text-[11px] text-[#5F6368] font-normal">How it works: Enter your total budget (e.g., Rs. 50,000) and we'll divide it by today's Silver Rate to tell you exactly how much pure silver you can buy.</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-[#70757A]">Enter Investment Budget (NPR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-sm font-bold text-[#5F6368]">Rs.</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={budgetNpr}
                        onChange={(e) => setBudgetNpr(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                        className="w-full h-11 pl-12 pr-4 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#DADCE0] rounded-md grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <span className="text-[10px] text-[#5F6368] font-bold uppercase block">Tolas</span>
                    <span className="text-base font-black text-[#1A73E8]">{math.reverse.budgetTolas.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5F6368] font-bold uppercase block">Grams</span>
                    <span className="text-base font-black text-[#202124]">{math.reverse.budgetGrams.toFixed(1)}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5F6368] font-bold uppercase block">Troy Oz</span>
                    <span className="text-base font-black text-[#202124]">{math.reverse.budgetTroyOz.toFixed(2)} oz</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5F6368] font-bold uppercase block">Kilograms</span>
                    <span className="text-base font-black text-[#202124]">{math.reverse.budgetKgs.toFixed(3)} kg</span>
                  </div>
                </div>
              </div>

              {/* Reset All Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 mt-6 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg text-sm font-bold text-red-600 flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-red-500" />
                <span>Reset All Fields</span>
              </button>
            </div>
          )}

          {/* TAB 3: Jewellery & Making Charge Mode */}
          {activeTab === 'jewellery' && (
            <div className="space-y-6">
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#1A73E8]" /> Jewellery Retail Cost & Making Charge Calculator
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#70757A]">Jewellery Weight</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                        className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                      />
                      <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold w-24 cursor-pointer focus:border-[#1A73E8] outline-none"
                      >
                        <option value="Gram">g</option>
                        <option value="Tola">Tola</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#70757A]">Making Charge</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={makingChargeValue}
                        onChange={(e) => setMakingChargeValue(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                        className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                      />
                      <select
                        value={makingChargeType}
                        onChange={(e) => setMakingChargeType(e.target.value as 'fixed' | 'percent')}
                        className="h-12 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold w-24 cursor-pointer focus:border-[#1A73E8] outline-none"
                      >
                        <option value="percent">%</option>
                        <option value="fixed">Rs</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2 lg:col-span-1 lg:mt-0">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#70757A]">VAT (%)</label>
                    <input
                      type="number"
                      min="0"
                      value={vatPercent}
                      onChange={(e) => setVatPercent(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                    />
                  </div>
                </div>

                {/* Jewellery Price Output Card */}
                <div className="p-4 bg-white border border-[#DADCE0] rounded-md space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1.5 text-xs text-[#5F6368]">
                    <span>Raw Metal Value ({weight} {fromUnit}):</span>
                    <span className="font-bold text-[#202124]">Rs. {Math.round(math.metalValueNpr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5 text-xs text-[#5F6368]">
                    <span>Making Charge:</span>
                    <span className="font-bold text-[#202124]">Rs. {Math.round(math.makingChargeNpr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5 text-xs text-[#5F6368]">
                    <span>VAT ({vatPercent}%):</span>
                    <span className="font-bold text-[#202124]">Rs. {Math.round(math.vatNpr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-[#1A73E8] text-base">
                    <span>Estimated Retail Price:</span>
                    <span>Rs. {Math.round(math.finalJewelleryCostNpr).toLocaleString()} NPR</span>
                  </div>
                </div>
              </div>

              {/* Multi-Item Jewellery Basket (Module 14) */}
              <div className="bg-white border border-[#DADCE0] rounded-lg p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase text-[#202124]">Multi-Item Jewellery Basket</h4>
                  <button
                    onClick={handleAddBasketItem}
                    className="text-xs font-bold text-[#1A73E8] flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {basket.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-[#F8F9FA] border rounded-md text-xs">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBasket(basket.map(i => i.id === item.id ? { ...i, name: val } : i));
                        }}
                        className="w-1/3 px-2 py-1 border rounded bg-white font-semibold"
                      />
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setBasket(basket.map(i => i.id === item.id ? { ...i, weight: val } : i));
                        }}
                        className="w-1/4 px-2 py-1 border rounded bg-white font-bold"
                      />
                      <select
                        value={item.unit}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBasket(basket.map(i => i.id === item.id ? { ...i, unit: val } : i));
                        }}
                        className="px-1 py-1 border rounded bg-white font-medium"
                      >
                        <option value="Gram">g</option>
                        <option value="Tola">Tola</option>
                      </select>
                      <button
                        onClick={() => handleRemoveBasketItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#E8F0FE] rounded-md flex justify-between items-center text-xs font-bold text-[#1A73E8]">
                  <span>Combined Basket Total ({basket.length} items):</span>
                  <span>{math.basket.basketTotalTolas.toFixed(2)} Tola ({math.basket.basketTotalGrams.toFixed(1)}g) &bull; Rs. {Math.round(math.basket.basketTotalValueNpr).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Investment & Bulk Bullion Mode (SIP) */}
          {activeTab === 'investment' && (
            <div className="space-y-6">
              <div className="bg-[#E8F0FE]/50 border border-[#1A73E8]/30 rounded-lg p-5 space-y-5">
                <h3 className="text-sm font-bold text-[#1A73E8] flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" /> Silver SIP & Investment Projection
                  </div>
                  <span className="text-[11px] text-[#5F6368] font-normal">Plan your long-term wealth by investing in physical silver regularly. We calculate the power of compounding based on historical silver returns.</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Initial Investment (NPR)</label>
                    <input
                      type="number"
                      min="0"
                      value={sipInitial}
                      onChange={(e) => setSipInitial(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Recurring Investment</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={sipRecurring}
                        onChange={(e) => setSipRecurring(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                        className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                      />
                      <select
                        value={sipFrequency}
                        onChange={(e) => setSipFrequency(e.target.value as 'monthly' | 'yearly')}
                        className="h-11 px-2 border border-[#DADCE0] rounded-md bg-white text-xs font-bold focus:border-[#1A73E8] outline-none"
                      >
                        <option value="monthly">/ Month</option>
                        <option value="yearly">/ Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Expected Silver Growth (%/yr)</label>
                    <input
                      type="number"
                      min="0"
                      value={sipGrowth}
                      onChange={(e) => setSipGrowth(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Investment Duration (Years)</label>
                    <input
                      type="number"
                      min="0"
                      value={sipDuration}
                      onChange={(e) => setSipDuration(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-base font-bold text-[#202124] focus:border-[#1A73E8] outline-none"
                    />
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#DADCE0] rounded-lg mt-4 shadow-sm">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A] mb-4">Investment Projection</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-[#5F6368] mb-1">Total Amount Invested</div>
                      <div className="text-lg font-bold text-[#202124]">Rs. {Math.round(math.sip.totalInvested).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#5F6368] mb-1">Total Profit Earned</div>
                      <div className="text-lg font-bold text-green-600">+ Rs. {Math.round(math.sip.profit).toLocaleString()}</div>
                    </div>
                    <div className="sm:col-span-2 pt-4 border-t border-[#DADCE0]">
                      <div className="text-xs text-[#5F6368] mb-1">Estimated Future Value (NPR)</div>
                      <div className="text-3xl font-black text-[#1A73E8]">Rs. {Math.round(math.sip.futureValue).toLocaleString()}</div>
                    </div>
                    <div className="sm:col-span-2 bg-[#F8F9FA] p-3 rounded text-sm text-[#5F6368] flex justify-between items-center">
                      <span>Estimated Silver Accumulated:</span>
                      <span className="font-bold text-[#202124]">{math.sip.futureTolas.toFixed(1)} Tola ({math.sip.futureKgs.toFixed(2)} kg)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: Historical Value Mode */}
          {activeTab === 'historical' && (
            <div className="space-y-6">
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                  <History className="w-4 h-4 text-[#1A73E8]" /> Historical Silver Value Comparison
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-[#70757A]">Select Historical Baseline Year</label>
                    <select
                      value={historicalYear}
                      onChange={(e) => setHistoricalYear(e.target.value)}
                      className="w-full h-11 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124]"
                    >
                      {Object.keys(HISTORICAL_RATES).map(yr => (
                        <option key={yr} value={yr}>{yr} (Rs. {HISTORICAL_RATES[yr]}/Tola)</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-[#70757A]">Current Weight Analyzed</label>
                    <div className="h-11 px-3 bg-white border border-[#DADCE0] rounded-md flex items-center text-sm font-bold text-[#202124]">
                      {weight} {fromUnit} ({math.totalTolas.toFixed(2)} Tolas)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#DADCE0] rounded-md space-y-2 text-xs">
                  <div className="flex justify-between border-b pb-1 text-[#5F6368]">
                    <span>Value in {historicalYear}:</span>
                    <span className="font-bold text-[#202124]">Rs. {Math.round(math.historical.pastValueNpr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-[#5F6368]">
                    <span>Value Today (@ Rs. {silverRatePerTola}/Tola):</span>
                    <span className="font-bold text-[#202124]">Rs. {Math.round(math.metalValueNpr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-bold text-green-600">
                    <span>Estimated Gain / Return:</span>
                    <span>+Rs. {Math.round(math.historical.priceDifferenceNpr).toLocaleString()} ({math.historical.percentageReturn.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Reset All Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 mt-6 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg text-sm font-bold text-red-600 flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-red-500" />
                <span>Reset All Fields</span>
              </button>
            </div>
          )}

          {/* TAB 6: Professional Tools — Workshop & Buyback */}
          {activeTab === 'pro' && (
            <div className="space-y-6">
              {/* Buyback / Scrap Estimator */}
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-5 space-y-3">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#1A73E8]" /> Dealer Buyback & Scrap Estimator
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#70757A]">Dealer Buyback Discount (%)</label>
                    <input
                      type="number"
                      value={buybackDiscount}
                      onChange={(e) => setBuybackDiscount(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-10 px-3 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124]"
                    />
                  </div>
                  <div className="p-2.5 bg-white border rounded-md text-xs font-bold text-[#202124] flex flex-col justify-center">
                    <span className="text-[10px] text-[#5F6368]">Estimated Receive:</span>
                    <span className="text-sm font-extrabold text-[#1A73E8]">Rs. {Math.round(math.buybackValueNpr).toLocaleString()} NPR</span>
                  </div>
                </div>
              </div>

              {/* Manufacturing Goldsmith Copper Alloy Mixer (Module 13) */}
              <div className="bg-white border border-[#DADCE0] rounded-lg p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#202124]">Goldsmith / Workshop Alloy Mixer</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#70757A]">Target Target Purity (e.g. 925)</label>
                    <input
                      type="number"
                      value={targetPurity}
                      onChange={(e) => setTargetPurity(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full h-10 px-3 border rounded-md font-bold text-sm bg-white"
                    />
                  </div>
                  <div className="p-2.5 bg-[#F8F9FA] border rounded-md text-xs space-y-1">
                    <div>Pure Silver Input: <strong>{math.pureGrams.toFixed(2)}g</strong></div>
                    <div>Copper Alloy Required to Add: <strong className="text-[#1A73E8]">{math.manufacturing.requiredCopperGrams.toFixed(2)}g</strong></div>
                    <div>Finished 925 Weight: <strong>{math.manufacturing.finalFinishedWeightGrams.toFixed(2)}g</strong></div>
                  </div>
                </div>
              </div>

              {/* Reset All Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 mt-6 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg text-sm font-bold text-red-600 flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-red-500" />
                <span>Reset All Fields</span>
              </button>
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-6">
          {/* Primary Result Display Card */}
          <div className="bg-[#1A73E8] text-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold opacity-90 border-b border-white/20 pb-2">
              <span>Primary Conversion Output</span>
              <span>Purity: {PURITY_FACTORS[purityKey].name.split(' ')[0]}</span>
            </div>

            <div className="text-center py-2">
              {activeTab === 'value' ? (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    Rs. {Number(budgetNpr).toLocaleString()} Equals
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {math.reverse.budgetGrams.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span className="text-xl font-bold ml-2 opacity-90">Gram</span>
                  </div>
                  <div className="text-sm font-bold opacity-90 mt-1">
                    ({math.reverse.budgetTolas.toFixed(2)} Tola)
                  </div>
                </>
              ) : activeTab === 'jewellery' ? (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    Final Jewellery Cost
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Rs. {Math.round(math.finalJewelleryCostNpr).toLocaleString()}
                  </div>
                  <div className="text-sm font-bold opacity-90 mt-1">
                    ({weight} {fromUnit} of {PURITY_FACTORS[purityKey].name.split(' ')[0]})
                  </div>
                </>
              ) : activeTab === 'historical' ? (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    Historical Return
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {math.historical.percentageReturn > 0 ? '+' : ''}{math.historical.percentageReturn.toFixed(1)}%
                  </div>
                  <div className="text-sm font-bold opacity-90 mt-1">
                    {math.historical.priceDifferenceNpr >= 0 ? 'Gain:' : 'Loss:'} Rs. {Math.round(math.historical.priceDifferenceNpr).toLocaleString()}
                  </div>
                </>
              ) : activeTab === 'investment' ? (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    Total Basket Value
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Rs. {Math.round(math.basket.basketTotalValueNpr).toLocaleString()}
                  </div>
                  <div className="text-sm font-bold opacity-90 mt-1">
                    ({math.basket.basketTotalGrams.toFixed(2)} g / {math.basket.basketTotalTolas.toFixed(2)} Tola)
                  </div>
                </>
              ) : activeTab === 'pro' ? (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    Required Alloy
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {math.manufacturing.requiredCopperGrams.toFixed(2)}
                    <span className="text-xl font-bold ml-2 opacity-90">Gram</span>
                  </div>
                  <div className="text-sm font-bold opacity-90 mt-1">
                    Finished Weight: {math.manufacturing.finalFinishedWeightGrams.toFixed(2)}g
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                    {weight} {fromUnit} Equals
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {math.convertedVal.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    <span className="text-xl font-bold ml-2 opacity-90">{toUnit}</span>
                  </div>
                </>
              )}
            </div>

            {/* Estimated Value Banner */}
            <div className="bg-white/10 p-3 rounded-md flex items-center justify-between text-sm">
              <span className="font-medium">Est. Value @ Rs. {silverRatePerTola}/Tola:</span>
              <span className="font-extrabold text-lg">Rs. {Math.round(math.metalValueNpr).toLocaleString()} NPR</span>
            </div>
          </div>

          {/* Action Bar (Copy) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2 px-3 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] rounded-md text-xs font-bold text-[#202124] flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#1A73E8]" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          {/* Multi-Unit Equivalent Breakdown Table */}
          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
            <div className="bg-[#F8F9FA] px-4 py-2.5 border-b border-[#DADCE0] flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Equivalent Weight Breakdown</h4>
              <span className="text-[10px] text-[#5F6368]">All units updated</span>
            </div>
            <div className="divide-y divide-[#DADCE0] text-xs">
              <div className="p-3 flex justify-between items-center">
                <span className="font-medium text-[#5F6368]">Tolas (Nepal Standard)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.tolas.toFixed(4)} Tola</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-[#F8F9FA]">
                <span className="font-medium text-[#5F6368]">Grams (Metric)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.grams.toFixed(4)} g</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="font-medium text-[#5F6368]">Lal (1/100 Tola)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.lals.toFixed(2)} Lal</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-[#F8F9FA]">
                <span className="font-medium text-[#5F6368]">Aana (1/16 Tola)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.aanas.toFixed(3)} Aana</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="font-medium text-[#5F6368]">Ratti (1/64 Tola)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.rattis.toFixed(3)} Ratti</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-[#F8F9FA]">
                <span className="font-medium text-[#5F6368]">Troy Ounces (Intl Trade)</span>
                <span className="font-bold text-[#202124]">{math.breakdown.troyOz.toFixed(4)} t oz</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="font-medium text-[#5F6368]">Kilograms</span>
                <span className="font-bold text-[#202124]">{math.breakdown.kgs.toFixed(5)} kg</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-[#E8F0FE] font-bold text-[#1A73E8]">
                <span>Pure Silver Net Weight ({PURITY_FACTORS[purityKey].factor * 100}%)</span>
                <span>{math.pureGrams.toFixed(2)} g</span>
              </div>
            </div>
          </div>

          {/* Live Silver Rate Compact Info Card */}
          <div className="mt-4">
            <Link 
              href="/market-rates/live-silver-price/"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white border border-[#DADCE0] hover:bg-[#E8F0FE] hover:border-[#1A73E8] hover:text-[#1A73E8] rounded-md text-xs font-bold text-[#202124] transition-all shadow-sm"
            >
              View Today's Live Silver Price →
            </Link>
          </div>
        </div>
      }
      details={
        <div className="space-y-12">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm space-y-10">

            {/* AI Quick Answer Box */}
            <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-lg p-5">
              <h2 className="font-bold text-[#1A73E8] mb-2 text-lg">Quick Answer: Silver Measurement Standards</h2>
              <p className="text-[#202124] text-base leading-relaxed">
                In Nepal, 1 Tola of silver equals exactly <strong>11.6638 grams</strong> (100 Lal, 16 Aana, or 64 Ratti) as standardized by FENEGOSIDA and the Nepal Bureau of Standards & Metrology (NBSM). Internationally, silver is traded in <strong>Troy Ounces</strong>, where 1 Troy Ounce equals <strong>31.1035 grams</strong> or approximately 2.6667 Tolas.
              </p>
              <p className="text-[#5F6368] text-sm mt-3">
                Last updated: July 2026 &bull; Measurements verified against official FENEGOSIDA and LBMA international standards.
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#202124] mb-4">Table of Contents</h2>
              <ul className="space-y-2 text-[#1A73E8] text-sm">
                <li><a href="#feature-summary" className="hover:underline">What This Silver Converter Can Calculate</a></li>
                <li><a href="#nepal-system" className="hover:underline">Nepal Traditional Silver Measurement System</a></li>
                <li><a href="#international-units" className="hover:underline">International Silver Measurement System</a></li>
                <li><a href="#conversion-chart" className="hover:underline">Silver Unit Conversion Chart</a></li>
                <li><a href="#formulas" className="hover:underline">Silver Conversion Formulas</a></li>
                <li><a href="#purity-guide" className="hover:underline">Silver Purity Guide (999 Fine vs 925 Sterling)</a></li>
                <li><a href="#jewellery-examples" className="hover:underline">Common Silver Jewellery & Ornament Weights</a></li>
                <li><a href="#value-calculator" className="hover:underline">Calculating Silver Market Value & Budget</a></li>
                <li><a href="#accuracy-matters" className="hover:underline">Why Accurate Silver Calculations Matter</a></li>
                <li><a href="#people-also-search-for" className="hover:underline">People Also Search For</a></li>
                <li><a href="#faq" className="hover:underline">Frequently Asked Questions</a></li>
              </ul>
            </nav>

            {/* Feature Summary */}
            <section id="feature-summary">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">What This Silver Converter Can Calculate</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Our multi-functional Silver Converter engine provides complete weight conversions, purity adjustments, and market value estimations across both traditional Nepali and global measurement standards:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li>Convert between Tola, Lal, Aana, Ratti, Gram, Kilogram, and Troy Ounce</li>
                <li>Calculate real-time silver value in Nepalese Rupees (NPR)</li>
                <li>Adjust calculations for purity grades: 999 Fine, 925 Sterling, and 800 Coin Silver</li>
                <li>Estimate jewellery weight, making charges, VAT, and net pure silver content</li>
                <li>Reverse calculate silver weight based on your investment budget</li>
                <li>Instant quick-preset conversion chips for bullion & jewellery</li>
                <li>Download, copy, or print complete calculation summaries</li>
                <li>Official standards verified by FENEGOSIDA & NBSM</li>
              </ul>
            </section>

            {/* Nepal Traditional Silver Measurement System */}
            <section id="nepal-system">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Nepal Traditional Silver Measurement System (Chandi Weight)</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                In Nepal, silver (popularly known as <em>Chandi</em>) is measured using the traditional South Asian bullion system recognized by FENEGOSIDA. Understanding these units ensures accurate jewellery pricing and investment trading. You can check all current market-rate tools at our <a href="/market-rates/" className="text-[#1A73E8] font-semibold hover:underline">Live Market Rates Hub</a>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">1 Tola</h3>
                  <p className="text-sm font-bold text-[#1A73E8] mb-2">= 11.6638 Grams</p>
                  <p className="text-xs text-[#5F6368]">Standard unit for silver coins, bars, and heavy ornaments in Nepal.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">1 Lal</h3>
                  <p className="text-sm font-bold text-[#1A73E8] mb-2">= 0.1166 Grams</p>
                  <p className="text-xs text-[#5F6368]">Used for small silver work. Exactly 100 Lal make 1 Tola.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">1 Aana</h3>
                  <p className="text-sm font-bold text-[#1A73E8] mb-2">= 0.7290 Grams</p>
                  <p className="text-xs text-[#5F6368]">Traditional sub-unit. Exactly 16 Aanas make 1 Tola.</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                  <h3 className="font-bold text-[#202124] mb-1">1 Ratti</h3>
                  <p className="text-sm font-bold text-[#1A73E8] mb-2">= 0.1822 Grams</p>
                  <p className="text-xs text-[#5F6368]">Gemstone & fine silver unit. Exactly 64 Ratti make 1 Tola.</p>
                </div>
              </div>
            </section>

            {/* International Silver Measurement System */}
            <section id="international-units">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">International Silver Measurement System</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Global silver commodity markets (such as LBMA and COMEX) trade silver in metric and troy units:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#5F6368] text-base">
                <li><strong>Gram (g):</strong> Metric unit commonly used for retail silver jewellery worldwide.</li>
                <li><strong>Troy Ounce (t oz):</strong> The global standard benchmark unit for precious metals. 1 Troy Ounce = 31.1035g (equivalent to approx 2.6667 Tolas).</li>
                <li><strong>Kilogram (kg):</strong> Industrial and institutional silver bar unit. 1 Kilogram = 1,000g = 85.7353 Tolas.</li>
                <li><strong>Avoirdupois Ounce (oz):</strong> Standard commercial ounce = 28.3495g (used for general goods, distinct from Troy Ounce).</li>
              </ul>
            </section>

            {/* Silver Conversion Chart */}
            <section id="conversion-chart">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Silver Unit Conversion Chart</h2>
              <div className="overflow-x-auto border border-[#DADCE0] rounded-lg">
                <table className="w-full text-left text-sm text-[#202124]">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] uppercase">
                    <tr>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0]">Unit</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0] border-l">Grams (g)</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0] border-l">Tolas</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0] border-l">Troy Ounces</th>
                      <th className="px-5 py-3 font-semibold border-b border-[#DADCE0] border-l">Primary Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-5 py-3 font-bold border-t border-[#DADCE0]">1 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">11.6638 g</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">1.0000 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">0.3750 t oz</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Nepal bullion & jewellery</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-5 py-3 font-bold border-t border-[#DADCE0]">10 Grams</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">10.0000 g</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">0.8574 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">0.3215 t oz</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Modern retail pricing</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-bold border-t border-[#DADCE0]">1 Troy Ounce</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">31.1035 g</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">2.6667 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">1.0000 t oz</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">International market rate</td>
                    </tr>
                    <tr className="bg-[#F8F9FA]">
                      <td className="px-5 py-3 font-bold border-t border-[#DADCE0]">50 Lal</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">5.8319 g</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">0.5000 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">0.1875 t oz</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Small silver coins/rings</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-bold border-t border-[#DADCE0]">1 Kilogram</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">1000.00 g</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">85.7353 Tola</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l font-mono">32.1507 t oz</td>
                      <td className="px-5 py-3 border-t border-[#DADCE0] border-l">Bulk silver bullion bars</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Silver Conversion Formulas */}
            <section id="formulas">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Silver Conversion Formulas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#DADCE0] rounded-lg p-4 bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-2">Tola to Grams</h3>
                  <div className="font-mono text-sm bg-white p-2.5 border rounded mb-2 text-[#1A73E8]">
                    Grams = Tolas &times; 11.6638
                  </div>
                  <p className="text-xs text-[#5F6368]">Example: 5 Tola &times; 11.6638 = 58.319 Grams</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4 bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-2">Grams to Tola</h3>
                  <div className="font-mono text-sm bg-white p-2.5 border rounded mb-2 text-[#1A73E8]">
                    Tolas = Grams &divide; 11.6638
                  </div>
                  <p className="text-xs text-[#5F6368]">Example: 50 Grams &divide; 11.6638 = 4.286 Tola</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-4 bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-2">Troy Ounce to Grams</h3>
                  <div className="font-mono text-sm bg-white p-2.5 border rounded mb-2 text-[#1A73E8]">
                    Grams = Troy Oz &times; 31.1035
                  </div>
                  <p className="text-xs text-[#5F6368]">Example: 2 t oz &times; 31.1035 = 62.207 Grams</p>
                </div>
              </div>
            </section>

            {/* Silver Purity Guide */}
            <section id="purity-guide">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Silver Purity Guide (999 Fine vs 925 Sterling)</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Not all silver items contain 100% pure silver. Alloy metals are added for strength and durability:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <span className="inline-block px-2.5 py-1 text-xs font-bold bg-[#E8F0FE] text-[#1A73E8] rounded mb-3">999 Fine Silver</span>
                  <h3 className="font-bold text-[#202124] mb-2">99.9% Pure Silver</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
                    Highest commercial purity. Soft and malleable, used almost exclusively for investment bullion bars and official minted silver coins.
                  </p>
                  <p className="text-xs font-mono text-[#5F6368]">10 Tola 999 = 116.64g pure silver</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <span className="inline-block px-2.5 py-1 text-xs font-bold bg-[#E8F0FE] text-[#1A73E8] rounded mb-3">925 Sterling Silver</span>
                  <h3 className="font-bold text-[#202124] mb-2">92.5% Pure Silver</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
                    The international jewellery standard. Mixed with 7.5% copper for structural strength in rings, chains, bracelets, and fine ornaments.
                  </p>
                  <p className="text-xs font-mono text-[#5F6368]">10 Tola 925 = 107.89g pure silver</p>
                </div>
                <div className="border border-[#DADCE0] rounded-lg p-5">
                  <span className="inline-block px-2.5 py-1 text-xs font-bold bg-[#E8F0FE] text-[#1A73E8] rounded mb-3">800 Jewellery Silver</span>
                  <h3 className="font-bold text-[#202124] mb-2">80.0% Pure Silver</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
                    Commonly used in Nepal for traditional heavy utensils, puja items, anklets (Payal), and decorative silver items requiring high rigidity.
                  </p>
                  <p className="text-xs font-mono text-[#5F6368]">10 Tola 800 = 93.31g pure silver</p>
                </div>
              </div>
            </section>

            {/* Common Silver Jewellery & Ornament Weights */}
            <section id="jewellery-examples">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Common Silver Jewellery & Ornament Weights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Silver Ring</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">Approx. 4 – 8 Grams (0.34 – 0.68 Tola)</p>
                  <p className="text-xs text-[#5F6368]">Usually crafted in 925 Sterling Silver.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Silver Chain / Necklace</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">Approx. 20 – 50 Grams (1.7 – 4.3 Tola)</p>
                  <p className="text-xs text-[#5F6368]">Varies by link thickness and length.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Silver Payal (Anklets)</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">Approx. 80 – 150 Grams (6.8 – 12.8 Tola)</p>
                  <p className="text-xs text-[#5F6368]">Crafted in 800 or 925 silver for durability.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Silver Puja Utensils</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">Approx. 150 – 500 Grams (12.8 – 42.8 Tola)</p>
                  <p className="text-xs text-[#5F6368]">Plates, bowls, and kalash items.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Minted Silver Coin</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">1 Tola (11.66g) or 10 Grams</p>
                  <p className="text-xs text-[#5F6368]">Standard 999 Fine Silver gift item.</p>
                </div>
                <div className="p-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
                  <h3 className="font-bold text-[#202124] mb-1">Silver Bullion Bar</h3>
                  <p className="text-sm font-semibold text-[#1A73E8] mb-1">1 Kilogram (85.73 Tola)</p>
                  <p className="text-xs text-[#5F6368]">Institutional investment grade 999.9 fine.</p>
                </div>
              </div>
            </section>

            {/* Calculating Silver Market Value */}
            <section id="value-calculator">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Calculating Silver Market Value & Budget</h2>
              <p className="text-[#5F6368] text-base leading-relaxed mb-4">
                Silver value in Nepal is calculated by taking the weight in Tolas and multiplying by today's FENEGOSIDA silver rate per Tola:
              </p>
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-5 space-y-3">
                <div className="font-mono text-sm text-[#1A73E8] font-bold">
                  Total Value (NPR) = (Weight in Grams &divide; 11.6638) &times; Silver Rate Per Tola &times; Purity %
                </div>
                <p className="text-sm text-[#5F6368]">
                  For exact daily market rates, check our dedicated <a href="/market-rates/live-silver-price/" className="text-[#1A73E8] underline font-semibold">Live Silver Price in Nepal</a> page. If you are converting precious metals alongside tax calculations, refer to the <a href="/calculator/gold-tax/" className="text-[#1A73E8] underline font-semibold">Nepal Customs & Gold Tax Calculator</a>.
                </p>
              </div>
            </section>

            {/* Why Accurate Silver Calculations Matter */}
            <section id="accuracy-matters">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">Why Accurate Silver Calculations Matter</h2>
              <p className="text-[#5F6368] text-base leading-relaxed">
                Accurate silver weight calculations are critical for buyers, jewellers, and investors across Nepal. Unlike general household goods, precious metal trades are calculated down to the decimal point in Lal and Grams. A small rounding discrepancy when converting 1 Kilogram of silver can result in a loss of multiple Tolas. Relying on an automated converter verified against official FENEGOSIDA and NBSM standards eliminates manual conversion errors, protects transaction fairness, and guarantees transparency when purchasing bullion or custom silver jewellery. For a complete view of precious metal markets, visit our <a href="/market-rates/" className="text-[#1A73E8] font-semibold hover:underline">Market Rates page</a>.
              </p>
            </section>

            {/* People Also Search For */}
            <section id="people-also-search-for">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-4">People Also Search For</h2>
              <ul className="flex flex-wrap gap-3 text-sm">
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/market-rates/live-silver-price/" className="hover:text-[#1A73E8]">Live Silver Price Nepal</a>
                </li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/calculator/gold-converter/" className="hover:text-[#1A73E8]">Gold Converter Nepal</a>
                </li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/calculator/gold-tax/" className="hover:text-[#1A73E8]">Customs & Gold Tax Calculator</a>
                </li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/calculator/nepali-date/" className="hover:text-[#1A73E8]">Nepali Date Converter</a>
                </li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/calculator/remittance-calculator/" className="hover:text-[#1A73E8]">Remittance Calculator</a>
                </li>
                <li className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-1 text-[#5F6368]">
                  <a href="/calculator/nepal-income-tax/" className="hover:text-[#1A73E8]">Nepal Income Tax Calculator</a>
                </li>
              </ul>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-[#1967D2] mb-6">Frequently Asked Questions (FAQ)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How many grams are in 1 Tola of silver in Nepal?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    One Tola of silver equals exactly <strong>11.6638 grams</strong> according to the official Nepal measurement standards established by NBSM and FENEGOSIDA.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How many Lal are in 1 Tola of silver?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    There are exactly <strong>100 Lal</strong> in 1 Tola of silver. Therefore, 1 Lal equals approximately 0.1166 grams.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How many Aana are in 1 Tola of silver?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    There are <strong>16 Aana</strong> in 1 Tola. Each Aana equals approximately 0.7290 grams of silver.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is 925 Sterling Silver?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    925 Sterling Silver contains 92.5% pure silver and 7.5% copper or other alloy metals to give the jewellery rigidity and strength.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">What is 999 Fine Silver?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    999 Fine Silver is 99.9% pure silver, which is the highest purity grade used for bullion investment bars and official coins.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How do I convert Troy Ounces to Tola?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    One Troy Ounce equals 31.1035 grams. To convert to Tola, divide 31.1035 by 11.6638, which yields approximately <strong>2.6667 Tolas</strong> per Troy Ounce.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How many Tolas are in 1 Kilogram of silver?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    One Kilogram (1,000 grams) of silver equals approximately <strong>85.7353 Tolas</strong>.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">How is silver price calculated in Nepal?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    Silver price in Nepal is calculated per Tola based on daily published FENEGOSIDA rates, adjusted for purity grade and jeweller making charges.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#202124] mb-2">Is the Silver Converter free to use?</h3>
                  <p className="text-[#5F6368] text-base leading-relaxed">
                    Yes, NepaCalc's Silver Converter is 100% free to use online with unlimited calculations, multi-unit breakdowns, and live price estimations.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      }
      sidebar={{
        title: 'Precious Metal Tools',
        subtitle: 'Bullion Utilities',
        links: [
          { label: 'Live Silver Price Nepal', href: '/market-rates/live-silver-price/', icon: TrendingUp },
          { label: 'Gold Converter Nepal', href: '/calculator/gold-converter/', icon: Coins },
          { label: 'Customs & Gold Tax', href: '/calculator/gold-tax/', icon: Award },
          { label: 'Live Gold Price Nepal', href: '/market-rates/live-gold-price/', icon: TrendingUp }
        ],
      }}
    />
  );
}
