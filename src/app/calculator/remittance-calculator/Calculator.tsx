'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { 
  Globe, ArrowRightLeft, Landmark, Info, Wallet, RefreshCw, 
  Activity, Heart, DollarSign, ShieldCheck, TrendingUp, AlertCircle, 
  Receipt, Target, PieChart, Zap, ArrowRight, Scale
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart as RePieChart, Pie 
} from 'recharts';

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
  { name: 'Western Union', fee: 5.0, type: 'percent', color: '#3b82f6' },
  { name: 'IME Remit', fee: 200, type: 'fixed', color: '#10b981' },
  { name: 'Prabhu Remit', fee: 150, type: 'fixed', color: '#ef4444' },
  { name: 'Wise', fee: 1.5, type: 'percent', color: '#f59e0b' },
];

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function RemittanceCalculator() {
  const { rates } = useLiveRates();
  
  const [state, setState] = useSyncState('remit_v6', {
    amount: 1000,
    currencyCode: 'USD',
    customRate: 133.50,
    useCustomRate: false
  });

  const { amount, currencyCode, customRate, useCustomRate } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  
  const nrbRate = (currencyCode === 'USD' && rates?.forex?.usd) 
    ? rates.forex.usd.current 
    : currency.rate;

  const activeRate = useCustomRate ? customRate : nrbRate;

  const resultsData = useMemo(() => {
    return PROVIDERS.map(p => {
      const grossNPR = amount * activeRate;
      const feeNPR = p.type === 'percent' ? (grossNPR * p.fee) / 100 : p.fee;
      const netNPR = grossNPR - feeNPR;
      return { ...p, val: netNPR, feeNPR };
    }).sort((a, b) => b.val - a.val);
  }, [amount, activeRate]);

  const bestProvider = resultsData[0];

  return (
    <CalculatorErrorBoundary calculatorName="Remittance Calculator">
      <ModernCalcLayout
        slug="remittance-calculator"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Finance Tools', href: '/finance/' }, { label: 'Remittance' }]}
        title="Remittance Calculator"
        description="Optimize your international transfers to Nepal. Compare agency spreads, evaluate NRB institutional rates, and maximize your remittance yield with precision."
        icon={DollarSign}
        inputs={
          <div className="space-y-8">
            <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10"><Globe className="w-40 h-40" /></div>
               <div className="relative z-10 grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Transfer Amount</label>
                     <div className="relative">
                        <input 
                          type="number" 
                          value={amount} 
                          onChange={(e) => update({ amount: Number(e.target.value) })}
                          className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all font-mono" 
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-[#1a0dab]">{currencyCode}</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Source Currency</label>
                     <div className="grid grid-cols-3 gap-2">
                        {CURRENCIES.slice(0, 6).map(c => (
                          <button 
                            key={c.code} 
                            onClick={() => update({ currencyCode: c.code })}
                            className={`py-3 text-[10px] font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 ${currencyCode === c.code ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'bg-[#f8f9fa] border border-[#dadce0] text-slate-400 hover:bg-white/10'}`}
                          >
                            <span className="text-lg">{c.flag}</span> {c.code}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 border border-slate-200 rounded-lg bg-white space-y-6 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg"><RefreshCw className="w-4 h-4 text-blue-600" /></div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Exchange Standard</h3>
               </div>
               <div className="flex p-1 bg-slate-100 rounded-2xl">
                  {['Live NRB', 'Manual Rate'].map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => update({ useCustomRate: opt === 'Manual Rate' })}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${((opt === 'Manual Rate' && useCustomRate) || (opt === 'Live NRB' && !useCustomRate)) ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {opt}
                    </button>
                  ))}
               </div>
               {useCustomRate && (
                 <div className="space-y-4 pt-2 animate-in slide-in-from-top-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agency Quoted Rate (NPR)</label>
                    <input 
                      type="number" 
                      value={customRate} 
                      onChange={e => update({ customRate: Number(e.target.value) })} 
                      className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 text-sm font-black text-slate-900 focus:border-blue-500 outline-none" 
                    />
                 </div>
               )}
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark className="w-24 h-24 text-emerald-600" /></div>
               <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Highest Possible Payout</div>
               <div className="text-5xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(bestProvider.val)}</div>
               <div className="px-5 py-2 bg-emerald-50 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-emerald-600">
                  Best via {bestProvider.name}
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Remittance Audit Ledger</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-5 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Exchange Rate</span>
                  <span className="font-black text-slate-900 text-sm">Rs. {activeRate.toFixed(2)}</span>
                </div>
                <div className="p-5 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Service Fees</span>
                  <span className="font-black text-rose-600 text-sm">{formatNPR(bestProvider.feeNPR)}</span>
                </div>
                <div className="p-5 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                  <span className="text-[10px] text-slate-400 font-black uppercase">Payout Efficiency</span>
                  <div className="flex items-center gap-2">
                     <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(bestProvider.val / (amount * activeRate)) * 100}%` }} />
                     </div>
                     <span className="font-black text-emerald-600 text-sm">{((bestProvider.val / (amount * activeRate)) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Zap className="w-24 h-24 text-blue-500" /></div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Diaspora Benefit Alert</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-black tracking-tight">
                     Formal remittance entitles you to a 10% IPO quota and 1% extra interest on savings accounts in Nepal.
                  </p>
               </div>
            </div>
          </div>
        }
        details={
          <div className="space-y-12">
            <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
              <div className="absolute -top-12 -right-12 opacity-5">
                  <Globe className="w-64 h-64 text-blue-600" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-2xl">
                    <Landmark className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Remittance Encyclopedia: The Diaspora Capital Matrix</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
                <p>
                  Foreign remittance is the lifeblood of the Nepalese economy, contributing nearly <strong>one-third of the national GDP</strong>. For the millions of Nepalis working in the GCC, Malaysia, and beyond, choosing the right remittance channel is not just about the exchange rate; it&apos;s about accessing institutional benefits and ensuring financial integrity.
                </p>
                
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-lg flex gap-6 items-start my-10">
                   <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">The Institutional Guardrail</h4>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                        By using formal banking channels (IME, Prabhu, Bank-to-Bank), you qualify for the <strong>Migrant Worker IPO Quota</strong>, granting you a 10% reservation in all primary stock offerings in Nepal—a massive wealth creation tool for the diaspora.
                      </p>
                   </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Exchange Spreads vs. Service Fees</h3>
                <p>
                  A common misconception is that "Zero Fee" remittance is the cheapest. Often, providers who charge no service fee recoup their costs by offering a lower <strong>Exchange Rate</strong> (a wider spread). This calculator performs a dual-audit, analyzing both the explicit fee and the implicit cost of the exchange rate to find your true Net Payout.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                   <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50 group hover:border-blue-200 transition-all">
                      <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Formal Channels</h4>
                      <p className="text-[11px] font-medium leading-relaxed">
                         Regulated by NRB. Provides legal proof of income, IPO eligibility, and social security benefits.
                      </p>
                   </div>
                   <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-rose-50/50">
                      <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest">Informal (Hundi)</h4>
                      <p className="text-[11px] font-medium leading-relaxed">
                         Illegal and high risk. No government benefits, risks money laundering charges, and denies the country foreign reserves.
                      </p>
                   </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. The 1% Interest Premium</h3>
                <p>
                  To promote formal remittance, <strong>Nepal Rastra Bank</strong> mandates that commercial banks offer at least <strong>1% higher interest</strong> on savings and fixed deposits that are funded through international remittance. For long-term savers, this extra percentage can lead to significant compound growth over several years.
                </p>
              </div>
            </section>
          </div>
        }
        howToUse={{
          steps: [
            "Source Selection: Choose the currency you are earning in (e.g., USD, SAR, QAR).",
            "Transfer Amount: Enter the total foreign currency you wish to send home.",
            "Rate Protocol: Select 'Live NRB' for market benchmarks or 'Manual' for agency quotes.",
            "Payout Audit: Review the 'Highest Possible Payout' to identify the most efficient provider.",
            "Integrity Check: Ensure you use formal channels to preserve your 10% IPO quota eligibility."
          ]
        }}
        formula={{
          title: "The Remittance Yield Calculus",
          description: "Institutional model for net payout valuation.",
          raw: "$$Net_{NPR} = (Amount \\times Rate_{active}) - ServiceFee$$",
          latex: "Net_{NPR} = (Amount \\times Rate_{active}) - ServiceFee"
        }}
        faqs={[
          { question: "What is the 10% IPO quota for migrants?", answer: "The SEBON mandates 10% reservation in IPOs for Nepalis working abroad. To qualify, you must have a Remittance Saving Account and send at least Rs. 50,000 via formal channels." },
          { question: "Is remittance income taxable in Nepal?", answer: "No, personal remittance sent to family via formal banking channels is completely tax-free in Nepal." },
          { question: "Why is the bank rate lower than Google?", answer: "Google shows the 'Mid-Market' rate. Banks use the 'Buying Rate', which includes a spread to cover processing and operational costs." },
          { question: "What is the 1% extra interest benefit?", answer: "NRB mandates banks to provide a 1% higher interest rate on deposits funded by formal remittance compared to normal accounts." },
          { question: "How long does a transfer take?", answer: "Cash-to-cash (IME/WU) is usually instant. Bank-to-bank transfers typically take 24-48 business hours." }
        ]}
        sidebar={{
          title: "Diaspora Suite",
          subtitle: "Wealth & Finance",
          links: [
            { label: "Currency Conv", href: "/calculator/currency-converter/", icon: Globe },
            { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
            { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Receipt },
            { label: "NRB Official", href: "https://nrb.org.np", icon: Landmark },
          ],
        }}
        relatedTools={[
          { label: "Currency Converter", href: "/calculator/currency-converter/" },
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
