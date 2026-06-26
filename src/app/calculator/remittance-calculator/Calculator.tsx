'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { useLiveRates } from '@/hooks/useLiveRates';
import { 
  Globe, ArrowRightLeft, Landmark, Info, Wallet, RefreshCw, 
  Activity, Heart, DollarSign, ShieldCheck, TrendingUp, AlertCircle, 
  Receipt, Target, PieChart, Zap, ArrowRight, Scale, Table, ChevronRight
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
  { name: 'Western Union', fee: 5.0, type: 'percent', color: '#1A73E8' },
  { name: 'IME Remit', fee: 200, type: 'fixed', color: '#188038' },
  { name: 'Prabhu Remit', fee: 150, type: 'fixed', color: '#F29900' },
  { name: 'Wise', fee: 1.5, type: 'percent', color: '#D93025' },
];

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

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
      return { ...p, value: netNPR, feeNPR };
    }).sort((a, b) => b.value - a.value);
  }, [amount, activeRate]);

  const bestProvider = resultsData[0];

  return (
    <CalculatorErrorBoundary calculatorName="Remittance Calculator">
      <ModernCalcLayout
        slug="remittance-calculator"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Remittance' }]}
        title="Remittance"
        description="Optimize your international transfers to Nepal. Compare agency spreads, evaluate NRB institutional rates, and maximize your remittance yield with precision."
        icon={Globe}
        inputs={
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Source Currency</label>
                 <select 
                    value={currencyCode} 
                    onChange={(e) => update({ currencyCode: e.target.value })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                 >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>)}
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Transfer Amount ({currencyCode})</label>
                 <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => update({ amount: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Exchange Rate Protocol</label>
                 <div className="grid grid-cols-2 gap-3">
                    {['Live NRB', 'Manual Rate'].map(opt => (
                      <button 
                        key={opt} 
                        onClick={() => update({ useCustomRate: opt === 'Manual Rate' })}
                        className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${((opt === 'Manual Rate' && useCustomRate) || (opt === 'Live NRB' && !useCustomRate)) ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>

              {useCustomRate && (
                <div className="space-y-2 animate-in fade-in duration-300">
                   <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Custom Rate (1 {currencyCode} = NPR)</label>
                   <input 
                      type="number" 
                      value={customRate} 
                      onChange={e => update({ customRate: Number(e.target.value) })} 
                      className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                   />
                </div>
              )}

              <div className="p-4 bg-[#FFF9E6] border border-[#F29900] rounded-md flex gap-3">
                 <ShieldCheck className="w-5 h-5 text-[#F29900] shrink-0" />
                 <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                    Institutional Benefit: Formal remittance entitles you to a <span className="text-[#F29900] underline decoration-2">10% IPO Quota</span> and 1% extra interest on savings in Nepal.
                    <br/><br/>
                    Check the <a href="/market-rates/exchange-rate-nepal/" className="text-[#F29900] underline font-bold hover:text-[#B07000]">Live Exchange Rate Nepal</a> before transferring.
                 </p>
              </div>
            </div>
            <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
               Maximize Payout Yield
            </button>
          </div>
        }
        results={
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
               <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Highest Possible Payout</div>
               <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(bestProvider.value)}</div>
               <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Best via {bestProvider.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                  <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Exchange Rate</div>
                  <div className="text-lg font-black text-[#202124]">Rs. {activeRate.toFixed(2)}</div>
               </div>
               <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                  <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Service Fee Est.</div>
                  <div className="text-lg font-black text-[#D93025]">{formatNPR(bestProvider.feeNPR)}</div>
               </div>
            </div>

            <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
               <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Payout Retention Efficiency</span>
                  <span className="text-[11px] font-black text-[#188038]">{((bestProvider.value / (amount * activeRate)) * 100).toFixed(1)}%</span>
               </div>
               <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                  <div className="h-full bg-[#188038]" style={{ width: `${(bestProvider.value / (amount * activeRate)) * 100}%` }} />
               </div>
            </div>
          </div>
        }
        details={
          <div className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6">
                   <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                   <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Provider Comparison Matrix</h3>
                 </div>
                 <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={resultsData} barSize={32}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#5F6368'}} />
                          <YAxis hide />
                          <Tooltip 
                            formatter={(v: number) => formatNPR(v)} 
                            contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} 
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                             {resultsData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
               </div>

               <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-6">
                   <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                   <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Remittance Audit Intelligence</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Gross NPR Value</span>
                       <span className="text-sm font-black text-[#202124]">{formatNPR(amount * activeRate)}</span>
                    </div>
                    <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Median Agency Spread</span>
                       <span className="text-sm font-black text-[#1A73E8]">0.85%</span>
                    </div>
                    <div className="p-6 rounded-md bg-[#E8F0FE] border border-[#1A73E8] text-center">
                       <div className="text-[9px] font-black text-[#1A73E8] uppercase mb-1">Diaspora Strategy</div>
                       <p className="text-[11px] font-bold text-[#5F6368] leading-tight">
                          Sending via {bestProvider.name} preserves {((bestProvider.value / (amount * activeRate)) * 100).toFixed(2)}% of your hard-earned capital.
                       </p>
                    </div>
                 </div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-[#1A73E8]" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Agency Payout Ledger</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                      <th className="px-6 py-4 bg-white">Service Provider</th>
                      <th className="px-6 py-4 bg-white text-right">Fee (Est)</th>
                      <th className="px-6 py-4 bg-white text-right">Net NPR Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {resultsData.map((p, idx) => (
                      <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-6 py-4 font-bold text-[#3C4043]">{p.name}</td>
                        <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(p.feeNPR)}</td>
                        <td className="px-6 py-4 text-right font-black text-[#1A73E8]">{formatNPR(p.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Currency: Select the currency you are earning in (e.g., USD, AED, SAR).",
            "Amount: Enter the total amount you wish to transfer to Nepal.",
            "Rate: Select 'Live NRB' for market benchmarks or 'Manual' for agency-specific quotes.",
            "Comparison: Analyze the Provider Matrix to identify the highest payout efficiency.",
            "Audit: Review the Agency Ledger to see exactly how much is lost to service fees."
          ]
        }}
        formula={{
          title: "The Remittance Yield Calculus",
          description: "Institutional model for calculating the net realization of foreign earnings in Nepal.",
          raw: "Net NPR = (ForeignAmount × ExchangeRate) - ServiceFee",
          variables: [
            "Exchange Rate: The buying rate offered by the agency vs. NRB mid-rate",
            "Service Fee: Fixed or percentage-based charge for transaction processing",
            "Yield Efficiency: The percentage of gross value received by the beneficiary"
          ]
        }}
        faqs={[
          { question: "What is the 10% IPO quota for migrants?", answer: "The SEBON mandates 10% reservation in IPOs for Nepalis working abroad. To qualify, you must have a Remittance Saving Account and send funds via formal channels." },
          { question: "Is remittance income taxable in Nepal?", answer: "No, personal remittance sent to family members via formal banking channels is completely tax-free in Nepal." },
          { question: "Why do agencies have different rates?", answer: "Each agency (IME, WU, etc.) adds a 'spread' to the NRB mid-rate to cover their costs. This is why the rate you get is often lower than what you see on Google." },
          { question: "How can I get the highest rate?", answer: "Digital remittance apps like Wise often provide higher rates than traditional cash counters, though banks offer the best long-term interest benefits." }
        ]}
        sidebar={{
          title: "Diaspora Hub",
          subtitle: "Financial Suite",
          links: [
            { label: "Currency Converter", href: "/calculator/currency-converter/", icon: Globe },
            { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
            { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
            { label: "NRB Official", href: "https://nrb.org.np", icon: Landmark },
          ],
        }}
        relatedTools={[
          { label: "Currency Converter", href: "/calculator/currency-converter/" },
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

