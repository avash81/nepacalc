'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { TrendingUp, PieChart, Info, AlertTriangle, ShieldCheck, Wallet, Receipt } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';

const DEFAULT_STATE = {
  bonusShares: 50,
  cashDividend: 500,
  faceValue: 100,
  investorType: 'individual' as 'individual' | 'institutional',
};

export default function NepseBonusTaxCalculator() {
  const [state, setState] = useSyncState('nepse_tax_v3', DEFAULT_STATE);
  const { bonusShares, cashDividend, faceValue, investorType } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const results = useMemo(() => {
    const taxRate = 0.05;
    const bonusTaxAmount = (bonusShares * faceValue) * taxRate;
    const cashTaxAmount = cashDividend * taxRate;
    const totalTax = bonusTaxAmount + cashTaxAmount;

    return {
      bonusTaxAmount,
      cashTaxAmount,
      totalTax,
      totalDividendValue: (bonusShares * faceValue) + cashDividend,
      taxRatePercent: taxRate * 100
    };
  }, [bonusShares, cashDividend, faceValue]);

  const formatNPR = (n: number) =>
    new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <CalculatorErrorBoundary calculatorName="NEPSE Bonus Tax">
      <CalculatorLayout
        title="NEPSE Dividend Tax"
        description="Calculate dividend withholding tax for bonus shares and cash distributions according to Nepal Income Tax Act (FY 2082/83)."
        badge="NEPSE Tool"
        badgeColor="emerald"
        category={{ label: 'Finance', href: '/calculator/category/finance' }}
        leftPanel={
          <div className="space-y-8">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4 items-center">
               <Info className="w-5 h-5 text-emerald-600 shrink-0" />
               <p className="text-[11px] text-emerald-800 leading-relaxed font-bold uppercase tracking-wide">
                 Official Tax Rate: 5% (Listed Companies)
               </p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Investor Classification</label>
              <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
                {(['individual', 'institutional'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => updateState({ investorType: t })}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      investorType === t 
                        ? 'bg-white text-emerald-600 shadow-md transform scale-[1.02]' 
                        : 'text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ValidatedInput label="Bonus Shares Received" value={bonusShares} onChange={(v) => updateState({ bonusShares: v })} min={0} />
              <ValidatedInput label="Face Value (NPR)" value={faceValue} onChange={(v) => updateState({ faceValue: v })} min={1} hint="Standard base is NPR 100" />
            </div>

            <ValidatedInput label="Gross Cash Dividend" value={cashDividend} onChange={(v) => updateState({ cashDividend: v })} min={0} prefix="NPR" />
          </div>
        }
        rightPanel={
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden text-center transition-all hover:shadow-2xl">
              <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-3">Total Tax Liability</div>
                 <div className="text-6xl font-black text-slate-900 tracking-tighter">
                   {formatNPR(results.totalTax)}
                 </div>
              </div>
              
              <div className="p-8 bg-white flex justify-around items-center">
                <div className="flex flex-col items-center">
                    <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Bonus Tax</div>
                    <div className="text-lg font-black text-slate-800">{formatNPR(results.bonusTaxAmount)}</div>
                </div>
                <div className="w-px h-12 bg-slate-100" />
                <div className="flex flex-col items-center">
                    <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Cash Tax</div>
                    <div className="text-lg font-black text-slate-800">{formatNPR(results.cashTaxAmount)}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Wallet className="w-32 h-32" />
                </div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Withholding Context</h3>
                </div>
                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Gross Dividend Value</span>
                        <span className="font-black text-emerald-400 text-lg">{formatNPR(results.totalDividendValue)}</span>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Net Payable (In-Hand)</span>
                        <span className="font-black text-white text-lg">{formatNPR(results.totalDividendValue - results.totalTax)}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 items-center">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 leading-relaxed font-bold uppercase">
                  Verify final WHT with CDSC or your DP broker.
                </p>
            </div>
          </div>
        }
        faqSection={
          <CalcFAQ faqs={[
            { question: 'Is Bonus Share taxed on Market Price?', answer: 'No. In Nepal, bonus shares are taxed at 5% of their Face Value (usually Rs. 100), not the current market price (LTP).' },
            { question: 'How is the tax paid?', answer: 'Usually, the company deducts the tax amount from your cash dividend. If you only receive bonus shares, you may have to pay the tax through your broker.' },
          ]} />
        }
      />
    </CalculatorErrorBoundary>
  );
}
