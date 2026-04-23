'use client';

import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';

import { Globe, ArrowRightLeft, Landmark, Info, Wallet, RefreshCw, Activity } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', rate: 133.50, flag: '🇺🇸' },
  { code: 'SAR', name: 'Saudi Riyal', rate: 35.60, flag: '🇸🇦' },
  { code: 'QAR', name: 'Qatar Riyal', rate: 36.65, flag: '🇶🇦' },
  { code: 'AED', name: 'UAE Dirham', rate: 36.35, flag: '🇦🇪' },
  { code: 'MYR', name: 'Malaysian Ringgit', rate: 28.10, flag: '🇲🇾' },
  { code: 'JPY', name: 'Japanese Yen (10)', rate: 8.85, flag: '🇯🇵' },
  { code: 'KRW', name: 'Korean Won (100)', rate: 9.75, flag: '🇰🇷' },
  { code: 'AUD', name: 'Australian Dollar', rate: 87.20, flag: '🇦🇺' },
  { code: 'GBP', name: 'British Pound', rate: 168.40, flag: '🇬🇧' },
];

const PROVIDERS = [
  { name: 'Western Union', fee: 5.0, type: 'percent' },
  { name: 'IME Remit', fee: 200, type: 'fixed' },
  { name: 'Prabhu Remit', fee: 150, type: 'fixed' },
  { name: 'Wise (Total Fee)', fee: 1.5, type: 'percent' },
];

export default function RemittanceCalculator() {
  const { rates, loading, refresh } = useLiveRates();
  
  const [state, setState] = useSyncState('remit_v1', {
    amount: 1000,
    currencyCode: 'USD',
    customRate: 133.50,
    useCustomRate: false,
    useLiveNRB: true
  }, { persistent: true, debounce: 300, syncToUrl: false });

  const { amount, currencyCode, customRate, useCustomRate, useLiveNRB } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  
  // Resolve base rate: Prefer Live if USD and enabled
  const nrbRate = (currencyCode === 'USD' && useLiveNRB && rates?.forex?.usd) 
    ? rates.forex.usd.current 
    : currency.rate;

  const activeRate = useCustomRate ? customRate : nrbRate;

  const results = useMemo(() => {
    return PROVIDERS.map(p => {
      const grossNPR = amount * activeRate;
      const feeNPR = p.type === 'percent' ? (grossNPR * p.fee) / 100 : p.fee;
      const netNPR = grossNPR - feeNPR;
      return { ...p, netNPR, feeNPR };
    });
  }, [amount, activeRate]);

  const bestProvider = [...results].sort((a, b) => b.netNPR - a.netNPR)[0];

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <CalculatorLayout
      hideHeader={true}
      title="Remittance Rate Converter"
      description="Convert foreign currency earnings into NPR. Compare Western Union, IME, and Local rates to maximize your family's remittance income."
      category={{ label: 'Market Rates', href: '/market-rates' }}
      leftPanel={
        <div className="space-y-8">
           <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Globe className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center px-1">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <span className="text-xl">{currency.flag}</span>
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Source Currency</h3>
                        <select 
                          value={currencyCode} 
                          onChange={e => update({ currencyCode: e.target.value })}
                          className="bg-transparent text-xl font-black outline-none border-b border-white/20 pb-1 mt-1 cursor-pointer hover:border-blue-400 transition-all"
                        >
                          {CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-slate-900">{c.code} - {c.name}</option>)}
                        </select>
                      </div>
                   </div>
                </div>

                <ValidatedInput 
                  label={`Transfer Amount (${currencyCode})`} 
                  value={amount} 
                  onChange={v => update({ amount: v })} 
                  variant="minimal" 
                />
              </div>
           </div>

           {useCustomRate && (
             <div className="p-6 bg-blue-50 border border-blue-200 rounded-3xl animate-in fade-in slide-in-from-top-4">
                <ValidatedInput 
                  label="Manual Agency Rate (NPR)" 
                  value={customRate} 
                  onChange={v => update({ customRate: v })} 
                  prefix="Rs."
                  hint="Remittance counters often vary by ±Rs. 1.50 from official NRB rates."
                />
             </div>
           )}

           <div className="p-6 border border-slate-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                 <Landmark className="w-4 h-4 text-slate-400" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Institutional Guidance</h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Exchange rates in Nepal are regulated by <strong>Nepal Rastra Bank (NRB)</strong>. While agencies like IME or Western Union may offer different rates, they are typically based on the NRB buying rate with a fixed margin.
              </p>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {/* Market Price Box - Moved to Right Side */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Exchange Standard</h3>
               </div>
               {currencyCode === 'USD' && (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${useLiveNRB ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-slate-200 border-slate-300 text-slate-600'}`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${useLiveNRB ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                     {loading ? 'Syncing...' : useLiveNRB ? 'Live NRB' : 'Static'}
                  </div>
               )}
            </div>

            <div className="flex items-end justify-between">
               <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Base Buying Rate</div>
                  <div className="text-2xl font-black text-slate-900 tracking-tighter">Rs. {fmt(activeRate)}</div>
               </div>
               <div className="flex flex-col gap-1.5 items-end">
                  <button 
                    onClick={() => update({ useCustomRate: !useCustomRate })}
                    className="text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                  >
                    {useCustomRate ? 'Use NRB' : 'Edit Rate'}
                  </button>
               </div>
            </div>
            <div className="text-[10px] font-medium text-slate-500 leading-tight">
               Calculated per 1 {currencyCode}.
            </div>
          </div>

          <ResultCard 
            label="Highest In-Hand (NPR)" 
            value={fmt(bestProvider.netNPR)} 
            unit=" Rs." 
            color="blue" 
            title="Max Remittance"
            copyValue={`Rs. ${bestProvider.netNPR}`}
          />

          <div className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Provider Index</h3>
             </div>
             
             <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
                {results.map((r, i) => (
                  <div key={i} className="p-3.5 flex justify-between items-center hover:bg-slate-50 transition-colors group">
                    <div>
                       <div className="text-[11px] font-black text-slate-900 flex items-center gap-2">
                          {r.name}
                          {r.name === bestProvider.name && <span className="text-[7px] bg-green-500 text-white px-1.5 py-0.5 rounded uppercase font-black">Best</span>}
                       </div>
                       <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-tighter">Fee: Rs. {fmt(r.feeNPR)}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[13px] font-black text-slate-900 font-mono">Rs. {fmt(r.netNPR)}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
             <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-amber-800 font-medium leading-relaxed italic">
                Note: <strong>Remittance Service Charges</strong> vary by amount. For example, Western Union often charges a percentage, while IME has fixed slabs. Always verify current service fees at the counter.
             </p>
          </div>
        </div>
      }
    />
  );
}
