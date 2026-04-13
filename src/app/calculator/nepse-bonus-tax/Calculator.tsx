'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { TrendingUp, PieChart, Info, AlertTriangle } from 'lucide-react';

export default function NepseBonusTaxCalculator() {
  const [bonusShares, setBonusShares] = useState<number>(0);
  const [cashDividend, setCashDividend] = useState<number>(0);
  const [faceValue, setFaceValue] = useState<number>(100);
  const [investorType, setInvestorType] = useState<'individual' | 'institutional'>('individual');

  const results = useMemo(() => {
    // Individual tax rate for dividends in Nepal is generally 5%
    // Institutional is usually 15%, but for many companies it's 5% final. 
    // We will use 5% for Individual and 15% for institutional as per basic IT Act 2058.
    const taxRate = investorType === 'individual' ? 0.05 : 0.15;
    
    // Bonus Share Tax: Taxed on the face value of the bonus shares received
    const bonusTaxAmount = (bonusShares * faceValue) * taxRate;
    
    // Cash Dividend Tax: Taxed on the gross cash amount
    const cashTaxAmount = cashDividend * taxRate;
    
    const totalTax = bonusTaxAmount + cashTaxAmount;

    return {
      bonusTaxAmount,
      cashTaxAmount,
      totalTax,
      taxRatePercent: taxRate * 100
    };
  }, [bonusShares, cashDividend, faceValue, investorType]);

  return (
    <CalculatorErrorBoundary calculatorName="NEPSE Bonus Tax">
      <CalculatorLayout
        title="NEPSE Bonus & Dividend Tax Calculator"
        description="Calculate the tax payable on your bonus shares and cash dividends in the Nepal Stock Market (NEPSE)."
        badge="NEPSE Tools"
        badgeColor="green"
        category={{ label: 'Finance & Tax', href: '/calculator/category/finance' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Investor Type</label>
              <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
                {(['individual', 'institutional'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setInvestorType(t)}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      investorType === t 
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
                        : 'text-slate-400'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput 
                label="Number of Bonus Shares" 
                value={bonusShares} 
                onChange={setBonusShares} 
                min={0}
                placeholder="e.g. 50"
              />
              <ValidatedInput 
                label="Face Value (NPR)" 
                value={faceValue} 
                onChange={setFaceValue} 
                min={1}
                placeholder="Usually 100"
              />
            </div>

            <ValidatedInput 
              label="Gross Cash Dividend (NPR)" 
              value={cashDividend} 
              onChange={setCashDividend} 
              min={0}
              placeholder="Total cash dividend before tax"
            />
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 text-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-2">Total Tax Payable</div>
                 <div className="text-5xl font-black text-slate-900 tracking-tighter">
                   NPR {results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                 </div>
              </div>
              
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">On Bonus</div>
                    <div className="text-lg font-black text-slate-900">NPR {results.bonusTaxAmount.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">On Cash</div>
                    <div className="text-lg font-black text-slate-900">NPR {results.cashTaxAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-600 rounded-3xl text-white">
                <div className="flex items-center gap-3 mb-4">
                    <PieChart className="w-5 h-5 text-blue-200" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Investment Summary</h4>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold text-blue-100">
                        <span>Tax Rate</span>
                        <span className="text-white">{results.taxRatePercent}%</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-blue-100">
                        <span>Bonus Worth (Face Value)</span>
                        <span className="text-white">NPR {(bonusShares * faceValue).toLocaleString()}</span>
                    </div>
                </div>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Understanding Dividend Tax in Nepal</h2>
            
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 my-8">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                    <div>
                        <h4 className="text-sm font-black text-amber-900 uppercase tracking-wide mb-2">Important Note on WACC</h4>
                        <p className="text-sm text-amber-800 leading-relaxed">Starting from FY 2080/81, the government has introduced changes regarding WACC. However, for most individual investors, the 5% final withholding tax still applies to distributed profits as dividends.</p>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800">1. How is Bonus Share Tax calculated?</h3>
            <p className="text-sm text-slate-600">In Nepal, when a company issues bonus shares, the tax is not calculated on the current market price (LTP). Instead, it is calculated on the <strong>Face Value</strong> (usually NPR 100). The current rate for individuals is 5%.</p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">2. Do I need to pay this manually?</h3>
            <p className="text-sm text-slate-600">Often, the company will deduct the required tax from your cash dividend to cover the tax on bonus shares. If the cash dividend is insufficient, you may need to deposit the amount or it will be shown as a liability in your portfolio.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
