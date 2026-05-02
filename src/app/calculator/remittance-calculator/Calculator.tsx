'use client';

import { useMemo } from 'react';

import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';

import { Globe, ArrowRightLeft, Landmark, Info, Wallet, RefreshCw, Activity, Heart, DollarSign } from 'lucide-react';

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
      const netNPR = grossNPR, feeNPR;
      return { ...p, netNPR, feeNPR };
    });
  }, [amount, activeRate]);

  const bestProvider = [...results].sort((a, b) => b.netNPR, a.netNPR)[0];

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

  return (
    <CalculatorErrorBoundary calculatorName="Remittance Calculator">
      <ModernCalcLayout hideH1={false}
        crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Remittance Calculator' }]}
        title="Global Remittance Tracker"
        description="High-authority comparison engine for exchange rates and remittance fees, ensuring the Nepalese diaspora maximizes their family's income."
        icon={DollarSign}
        inputs={
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
                            className="bg-transparent text-xl font-black outline-none border-b border-white/20 pb-1 mt-1 cursor-pointer hover:border-blue-400 transition-all w-full"
                          >
                            {CURRENCIES.map(c => <option key={c.code} value={c.code} className="bg-slate-900">{c.code}, {c.name}</option>)}
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
        results={
          <div className="space-y-6">
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

            <div className="p-6 bg-indigo-600 rounded-3xl text-center shadow-lg text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Highest In-Hand</div>
                <div className="text-4xl font-black tracking-tighter font-mono">Rs. {fmt(bestProvider.netNPR)}</div>
            </div>

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
                  Note: <strong>Remittance Service Charges</strong> vary by amount. Always verify current service fees at the counter.
              </p>
            </div>
          </div>
        }
        details={
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-4">Official Exchange Rate & Transfer Analytics</h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  Maximizing the value of your hard-earned foreign income requires more than a simple currency conversion. Our <strong className="text-slate-900">remittance calculator nepal</strong> is engineered to provide precise, real-time analytics based on the official Nepal Rastra Bank (NRB) buying rates. It allows the diaspora to project the exact Net NPR their families will receive by comparing various provider fees.
                </p>
                <p>
                  As an authoritative <strong className="text-slate-900">nrb exchange rate calculator</strong>, this tool dynamically accounts for both flat-fee providers (like IME or Prabhu) and percentage-based agencies (like Wise). This ensures that when you <strong className="text-slate-900">send money to nepal</strong>, you are mathematically optimized for the lowest possible friction cost, keeping more money in your family's hands.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">The Strategic Value of Formal Remittance</h3>
              <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                <li><strong className="text-blue-600">The 10% IPO Advantage:</strong> Utilizing formal banking channels unlocks the mandatory 10% <strong className="text-slate-900">remittance ipo quota nepal</strong>. This state-mandated incentive reserves a highly lucrative share block exclusively for migrant workers, significantly amplifying your long-term wealth creation beyond standard interest rates.</li>
                <li><strong className="text-emerald-600">Premium Interest Rates:</strong> Banks in Nepal are instructed by the NRB to provide a minimum 1% premium interest rate on Fixed Deposits and Savings accounts explicitly funded through formal <strong className="text-slate-900">foreign employment remittance</strong> channels.</li>
                <li><strong className="text-rose-600">Hundi Risk Matrix:</strong> Illegal shadow-banking (Hundi) may sometimes advertise slightly higher spot rates, but it disqualifies the sender from the IPO quota, the 1% interest premium, and social security benefits, while carrying severe legal risks under anti-money laundering (AML) laws.</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Understanding NRB Buying vs. Selling Rates</h3>
              <p className="text-sm text-slate-600 mb-4">When checking exchange rates, you will always see two numbers: Buying and Selling. It is crucial to know which one applies to you.</p>
              <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                <li><strong className="text-slate-900">Buying Rate (What you get):</strong> This is the rate at which the bank "buys" foreign currency from you. If you are sending USD or Gulf currencies to Nepal, the bank buys that currency and gives your family NPR. Therefore, <strong className="text-slate-900">remittance calculations always use the Buying Rate.</strong></li>
                <li><strong className="text-slate-900">Selling Rate (What you pay):</strong> This is the rate at which the bank "sells" foreign currency. You only look at this rate if you are in Nepal and need to buy USD to travel abroad or pay for an international university fee.</li>
              </ul>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Select your sending currency (e.g., USD, SAR, MYR) from the dropdown list.",
            "Enter the total amount of foreign currency you wish to remit to Nepal.",
            "Toggle between 'Live NRB' rates (for USD) or manual rates if you received a specific quote from your local exchange house.",
            "Compare the net NPR received across different service providers in the Service Provider Index.",
            "The tool automatically identifies the 'Best' provider based on the highest net payout after deducting specific provider fees."
          ]
        }}
        formula={{
          title: "Remittance Math",
          description: "Calculating the exact payout requires factoring in the provider's specific fee structure.",
          raw: "Gross NPR = Foreign Amount × NRB Buying Rate\n\nIf Flat Fee: Net Payout = Gross NPR, Fixed Fee Amount\nIf Percentage Fee: Net Payout = Gross NPR, (Gross NPR × Fee %)"
        }}
        faqs={[
          {
            question: "Why is the IPO quota important for remittances?",
            answer: "The 10% IPO quota is a significant wealth-building benefit. The Securities Board of Nepal (SEBON) mandates that 10% of all public share issues be reserved for Nepalese migrant workers who send money through formal channels. This guarantees share allotment in highly oversubscribed IPOs."
          },
          {
            question: "Do different remittance agencies offer different exchange rates?",
            answer: "Yes. While the Nepal Rastra Bank (NRB) sets the official reference rate, commercial agencies (like IME, Prabhu, or Western Union) add their own margin. This is why you must compare the final 'Net Payout' rather than just the advertised exchange rate."
          },
          {
            question: "What is Hundi and why should I avoid it?",
            answer: "Hundi is an illegal, unregulated money transfer system. Using Hundi is a financial crime in Nepal. Furthermore, money received via Hundi is not recognized as formal remittance, meaning your family cannot claim the 1% extra bank interest or apply for the 10% IPO quota."
          },
          {
            question: "Should I look at the Buying Rate or Selling Rate?",
            answer: "When you are sending money to Nepal, you must always look at the Buying Rate. This is the rate at which Nepalese banks will 'buy' your foreign currency to give your family Nepalese Rupees."
          },
          {
            question: "Is there tax on remittance income in Nepal?",
            answer: "No. The Government of Nepal does not levy income tax on personal remittance sent by migrant workers to their families, provided the money comes through legal banking or recognized remittance channels."
          },
          {
            question: "Why do some providers charge a percentage while others charge a flat fee?",
            answer: "Digital-first providers (like Wise) often charge a percentage fee, which is cheaper for small amounts. Traditional physical agencies (like Western Union) often charge a flat fee or tiered flat fees, which can be more cost-effective when sending very large sums."
          }
        ]}
        sidebar={{
          title: "Related Financial Tools",
          links: [
            { label: 'Income Tax Calc', href: '/calculator/nepal-income-tax/' },
            { label: 'Salary Calculator', href: '/calculator/nepal-salary/' },
            { label: 'Exchange Rates', href: '/exchange-rates/' },
          ],
        }}
      />
    </CalculatorErrorBoundary>
  );
}

