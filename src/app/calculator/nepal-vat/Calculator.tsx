'use client';
import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { Receipt, Landmark } from 'lucide-react';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function NepalVATCalculator() {
  const [state, setState] = useSyncState('nepal_vat_v4', {
    mode: 'add' as 'add' | 'remove',
    amount: 1000,
    includeServiceCharge: false
  });
  const { mode, amount, includeServiceCharge } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const vatRate = 0.13;
    const scRate = 0.10;
    
    let baseAmount = 0, scAmount = 0, vatAmount = 0, final = 0;

    if (mode === 'add') {
      baseAmount = amount;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = (baseAmount + scAmount) * vatRate;
      final = baseAmount + scAmount + vatAmount;
    } else {
      final = amount;
      // Formula: Final = Base * (1 + scRate) * (1 + vatRate)
      // Base = Final / ((1+scRate) * (1+vatRate))
      const combinedMultiplier = includeServiceCharge ? (1 + scRate) * (1 + vatRate) : (1 + vatRate);
      baseAmount = final / combinedMultiplier;
      scAmount = includeServiceCharge ? baseAmount * scRate : 0;
      vatAmount = final - baseAmount - scAmount;
    }

    return { baseAmount, scAmount, vatAmount, final };
  }, [mode, amount, includeServiceCharge]);

  const PRESETS = [1000, 5000, 10000, 50000];

  return (
    <CalculatorLayout
      title="Nepal VAT Calculator (13%)"
      description="Instantly add or remove 13% VAT from any amount. Updated for Nepal FY 2082/83 tax rules and IRD standards."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-6">
          {/* Mode selector */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Calculation Mode</label>
              <div className="flex border border-[var(--border)] p-1 bg-[var(--bg-surface)]">
                {([{ id: 'add', label: 'Add VAT' }, { id: 'remove', label: 'Extract VAT' }] as const).map(m => (
                  <button key={m.id} onClick={() => update({ mode: m.id })}
                    className={`flex-1 py-3 text-xs font-bold uppercase transition-all ${mode === m.id ? 'bg-[var(--primary)] text-white shadow-md' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div 
              onClick={() => update({ includeServiceCharge: !includeServiceCharge })}
              className={`flex items-center justify-between p-4 border transition-all cursor-pointer group ${includeServiceCharge ? 'bg-amber-50 border-amber-200' : 'bg-[var(--bg-surface)] border-[var(--border)] hover:border-amber-100'}`}
            >
              <div className="flex gap-3 items-center">
                <Receipt className={`w-5 h-5 ${includeServiceCharge ? 'text-amber-600' : 'text-[var(--text-muted)]'}`} />
                <div>
                   <div className={`text-[11px] font-black uppercase tracking-wider ${includeServiceCharge ? 'text-amber-800' : 'text-[var(--text-main)]'}`}>Service Charge (10%)</div>
                   <div className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Standard Hospitality Rate</div>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${includeServiceCharge ? 'bg-amber-500' : 'bg-slate-200'}`}>
                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${includeServiceCharge ? 'left-6' : 'left-1'}`} />
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <ValidatedInput
            label={mode === 'add' ? 'Price (VAT Exclusive)' : 'Total Price (VAT Inclusive)'}
            value={amount} onChange={v => update({ amount: v })} min={0} prefix="Rs." required />

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Common Amounts</label>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map(v => (
                <button key={v} onClick={() => update({ amount: v })}
                  className={`py-3 text-[11px] font-bold border transition-all ${amount === v ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'}`}>
                  {fmt(v)}
                </button>
              ))}
            </div>
          </div>

          {/* Nepal VAT info */}
          <div className="p-5 bg-[var(--bg-subtle)] border border-[var(--border)] flex gap-3">
            <Landmark className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-black uppercase text-[var(--text-main)] mb-1">Nepal IRD Standard</div>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                Nepal&apos;s standard VAT rate is <strong>13%</strong>, applied to most goods and services under the VAT Act 2052. Essential goods like fresh food are exempt.
              </p>
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {/* Primary Result */}
          <div className="p-8 bg-white border border-[var(--border)] text-center">
            <div className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">
              {mode === 'add' ? 'Total (incl. VAT)' : 'Amount (excl. VAT)'}
            </div>
            <div className="text-6xl font-black text-[var(--primary)] tracking-tighter mb-2">
              Rs. {fmt(mode === 'add' ? r.final : r.baseAmount)}
            </div>
            <div className="text-xs font-bold text-[var(--text-secondary)] uppercase">
              {mode === 'add' ? 'Gross Price' : 'Net Price'}
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white border border-[var(--border)]">
            <div className="px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border)] flex justify-between">
              <h3 className="text-[11px] font-bold uppercase text-[var(--text-main)]">Pricing Breakdown</h3>
              <span className="text-[9px] font-black bg-[var(--primary)] text-white px-2 py-1 uppercase">Nepal Standard</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              <div className="px-4 py-4 flex justify-between">
                <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Base Amount (excl. Tax)</span>
                <span className="text-sm font-black text-[var(--text-main)] font-mono">Rs. {fmt(r.baseAmount)}</span>
              </div>
              {includeServiceCharge && (
                <div className="px-4 py-4 flex justify-between animate-in slide-in-from-top-1 duration-300">
                  <span className="text-[11px] font-bold uppercase text-amber-600">Service Charge (10%)</span>
                  <span className="text-sm font-black text-amber-700 font-mono">+ Rs. {fmt(r.scAmount)}</span>
                </div>
              )}
              <div className="px-4 py-4 flex justify-between">
                <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">VAT (13%)</span>
                <span className="text-sm font-black text-[var(--primary)] font-mono">+ Rs. {fmt(r.vatAmount)}</span>
              </div>
              <div className="px-4 py-5 flex justify-between bg-[var(--bg-subtle)]">
                <span className="text-[11px] font-black uppercase text-[var(--text-main)]">Final Total (incl. All)</span>
                <span className="text-xl font-black text-[var(--primary)] font-mono">Rs. {fmt(r.final)}</span>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-[var(--border)] text-center">
              <Receipt className="w-5 h-5 text-[var(--text-muted)] mx-auto mb-2" />
              <div className="text-[9px] font-black uppercase text-[var(--text-muted)] mb-1">Tax Method</div>
              <div className="text-[11px] font-black text-[var(--text-main)]">Nepal IRD</div>
            </div>
            <div className="p-5 bg-white border border-[var(--border)] text-center">
              <Landmark className="w-5 h-5 text-[var(--text-muted)] mx-auto mb-2" />
              <div className="text-[9px] font-black uppercase text-[var(--text-muted)] mb-1">Fiscal Year</div>
              <div className="text-[11px] font-black text-[var(--text-main)]">FY 2082/83</div>
            </div>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is Nepal\'s VAT rate?', answer: 'The standard VAT rate in Nepal is 13%, applied to most goods and services. Some essential items like unprocessed food and agricultural products are exempt.' },
          { question: 'How do I add VAT?', answer: 'Multiply the VAT-exclusive price by 1.13. Example: Rs. 1,000 + 13% VAT = Rs. 1,130.' },
          { question: 'How do I remove VAT from a total?', answer: 'Divide the VAT-inclusive amount by 1.13. Example: Rs. 1,130 ÷ 1.13 = Rs. 1,000 (net price).' },
          { question: 'Who needs to register for VAT in Nepal?', answer: 'Businesses with annual turnover exceeding Rs. 20 Lakh are required to register for VAT with the Inland Revenue Department (IRD).' },
        ]} />
      }
    />
  );
}
