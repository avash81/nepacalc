'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Landmark, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function NepalTdsCalculator() {
  const [source, setSource] = useState('rent');
  const [amount, setAmount] = useState<number>(50000);
  const [isVatRegistered, setIsVatRegistered] = useState(false);

  // Updated TDS rates for 2082/83 (Current context)
  const TDS_RATES: Record<string, { rate: number; label: string }> = {
    rent: { rate: 0.10, label: 'House/Land Rent' },
    consultancy: { rate: 0.15, label: 'Consultancy Service' },
    interest: { rate: 0.05, label: 'Interest Payment' },
    service_vat: { rate: 0.015, label: 'Service (VAT Registered)' },
    commission: { rate: 0.15, label: 'Commission' },
    meeting: { rate: 0.15, label: 'Meeting Fees' },
    dividend: { rate: 0.05, label: 'Dividend' },
    brokerage: { rate: 0.15, label: 'Brokerage' },
  };

  const selectedRate = isVatRegistered && source === 'consultancy' ? 0.015 : TDS_RATES[source]?.rate || 0.15;

  const results = useMemo(() => {
    const tdsAmount = amount * selectedRate;
    const netAmount = amount - tdsAmount;
    return { tdsAmount, netAmount, rate: selectedRate * 100 };
  }, [amount, selectedRate]);

  return (
    <CalculatorErrorBoundary calculatorName="Nepal TDS">
      <CalculatorLayout
        title="Nepal TDS Calculator"
        description="Calculate Tax Deducted at Source (TDS) for various payments in Nepal as per Income Tax Act 2058 and latest amendments."
        badge="Nepal Tax"
        badgeColor="red"
        category={{ label: 'Nepal Sanchar', href: '/calculator/category/nepal' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Payment Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(TDS_RATES).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => {
                        setSource(id);
                        if (id === 'service_vat') setIsVatRegistered(true);
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                      source === id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-xs font-bold">{info.label}</span>
                    <span className={`text-[10px] font-black ${source === id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {(info.rate * 100).toFixed(1)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <ValidatedInput 
               label="Total Payment Amount (NPR)" 
               value={amount} 
               onChange={setAmount} 
               min={0}
               placeholder="Enter gross amount before tax"
            />

            {source === 'consultancy' && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <input 
                        type="checkbox" 
                        id="vat-reg" 
                        checked={isVatRegistered}
                        onChange={(e) => setIsVatRegistered(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="vat-reg" className="text-xs font-bold text-amber-900 cursor-pointer">
                        Is the service provider VAT registered? (Reduces TDS to 1.5%)
                    </label>
                </div>
            )}
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
              <div className="p-8 border-b border-slate-50">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-2">TDS to be Deducted</div>
                 <div className="text-5xl font-black text-slate-900 tracking-tighter">
                   NPR {results.tdsAmount.toLocaleString()}
                 </div>
              </div>
              <div className="p-8 bg-slate-50/50">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-2">Net Payment (After TDS)</div>
                 <div className="text-3xl font-black text-slate-900">
                   NPR {results.netAmount.toLocaleString()}
                 </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl space-y-4">
               <div className="flex items-center gap-3 text-blue-400 mb-2">
                 <FileText className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Rule Summary</h4>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Payment Category</span>
                    <span className="text-white font-bold">{TDS_RATES[source].label}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Applicable TDS Rate</span>
                    <span className="text-white font-black">{results.rate}%</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">E-TDS Requirement</span>
                    <span className="text-emerald-400 font-bold">Mandatory</span>
                 </div>
               </div>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">TDS (Tax Deducted at Source) in Nepal</h2>
            <p>TDS is a mechanism introduced by the Inland Revenue Department to collect tax at the very source of income. It is the responsibility of the payer to deduct the tax and deposit it to the IRD.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800">Rent TDS</h3>
                <p className="text-sm text-slate-600 leading-relaxed">As of FY 2082/83, the TDS on house rent is 10% for individuals. This must be deposited through the e-TDS system on the IRD portal.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800">Due Dates</h3>
                <p className="text-sm text-slate-600 leading-relaxed">TDS must be deposited within 25 days of the end of the month in which the payment was made to avoid penalties and interest (Section 117, 118, 119 of the Income Tax Act).</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
