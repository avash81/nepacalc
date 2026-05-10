'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  TrendingUp, ShieldCheck, AlertTriangle, Info, Wallet, Zap, Scale, Activity, Globe, 
  History, Receipt, Target, PieChart, Landmark, Table, ArrowRight 
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepseBonusTaxCalculator() {
  const [state, setState] = useSyncState('nepse_tax_v5', {
    bonusShares: 50, cashDividend: 500, faceValue: 100,
    investorType: 'individual' as 'individual' | 'institutional',
  });
  const { bonusShares, cashDividend, faceValue, investorType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const taxRate = 0.05;
    const bonusTaxAmount = (bonusShares * faceValue) * taxRate;
    const cashTaxAmount = cashDividend * taxRate;
    const totalTax = bonusTaxAmount + cashTaxAmount;
    const totalDividendValue = (bonusShares * faceValue) + cashDividend;
    const netPayable = totalDividendValue - totalTax;

    const pieData = [
      { name: 'Net Dividend Value', value: netPayable },
      { name: 'Bonus Share Tax', value: bonusTaxAmount },
      { name: 'Cash Dividend Tax', value: cashTaxAmount }
    ];

    return { 
      bonusTaxAmount, 
      cashTaxAmount, 
      totalTax, 
      totalDividendValue, 
      netPayable,
      pieData
    };
  }, [bonusShares, cashDividend, faceValue]);

  return (
    <ModernCalcLayout
      slug="nepse-bonus-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Bonus Tax' }]}
      title="NEPSE Bonus Tax"
      description="The definitive dividend auditing engine for Nepal. Calculate 5% withholding tax (WHT) on bonus shares and cash distributions with IRD statutory compliance."
      icon={Receipt}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Investor Protocol</label>
               <div className="grid grid-cols-2 gap-3">
                {['individual', 'institutional'].map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => update({ investorType: opt as any })} 
                    className={`h-11 rounded-md border text-[11px] font-black uppercase transition-all ${investorType === opt ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    {opt}
                  </button>
                ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Bonus Units</label>
                  <input type="number" value={bonusShares} onChange={e => update({ bonusShares: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Face Value (Rs)</label>
                  <input type="number" value={faceValue} onChange={e => update({ faceValue: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Cash Dividend (NPR)</label>
               <input 
                  type="number" 
                  value={cashDividend} 
                  onChange={(e) => update({ cashDividend: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Listed Companies: <span className="text-[#1A73E8] underline decoration-2">5.0% Fixed WHT</span>. Individuals are exempt from further taxation on this income.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Tax Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2 border border-[#1A73E8]/20">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Tax Withheld (5%)</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.totalTax)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Final Withholding Tax (WHT)</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Net Value Gain</div>
                <div className="text-lg font-black text-[#188038]">{formatNPR(result.netPayable)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Gross Dividend</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.totalDividendValue)}</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Yield Retention Efficiency</span>
                <span className="text-[11px] font-black text-[#188038]">{((result.netPayable / result.totalDividendValue) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: `${(result.netPayable / result.totalDividendValue) * 100}%` }} />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Dividend Burden Audit</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData.filter(d => d.value > 0)}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#188038" />
                       <Cell fill="#D93025" />
                       <Cell fill="#1A73E8" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Gain</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.totalDividendValue)}</span>
                 </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#188038]"></div> Net In-Hand</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> Bonus Tax</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Cash Tax</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Regulatory Ledger</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Bonus Share Tax (at Rs. 100)</span>
                     <span className="text-sm font-black text-rose-600">{formatNPR(result.bonusTaxAmount)}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Cash Dividend Tax</span>
                     <span className="text-sm font-black text-rose-600">{formatNPR(result.cashTaxAmount)}</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#FFF9E6] border border-[#F29900] text-center">
                     <div className="text-[9px] font-black text-[#F29900] uppercase mb-1">Out-of-Pocket Warning</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">
                        If cash dividend is less than bonus tax, you must manually deposit Rs. {Math.max(0, result.bonusTaxAmount - cashDividend).toLocaleString()} to the company bank account.
                     </p>
                  </div>
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Dividend Tax Matrix (Institutional)</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">Distribution Type</th>
                    <th className="px-6 py-4 bg-white text-right">Individual (5%)</th>
                    <th className="px-6 py-4 bg-white text-right">Institutional (15%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {[
                    { n: 'Bonus Shares', v: bonusShares * faceValue },
                    { n: 'Cash Dividend', v: cashDividend }
                  ].map((u, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{u.n}</td>
                      <td className="px-6 py-4 text-right font-black text-[#1A73E8]">{formatNPR(u.v * 0.05)}</td>
                      <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(u.v * 0.15)}</td>
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
          "Units: Enter the total number of bonus shares declared by the company.",
          "Face Value: Use Rs. 100 for equity shares and Rs. 10 for Mutual Fund units.",
          "Cash: Input the gross cash dividend amount (before any deductions).",
          "Audit: Review the 'Bonus Share Tax' to see if your cash dividend covers the liability.",
          "Deposit: If the cash dividend is insufficient, use the 'Out-of-Pocket' alert to determine the deposit amount."
        ]
      }}
      formula={{
        title: "The Dividend Withholding Axiom",
        description: "Official IRD formulation for NEPSE corporate action taxation (Income Tax Act 2058).",
        raw: "Total Tax = (BonusUnits × FaceValue × 0.05) + (GrossCash × 0.05)",
        variables: [
          "Face Value: Statutory price used for tax base (usually Rs. 100)",
          "WHT Rate: Fixed 5% for individual residents of Nepal",
          "Tax Neutral: When Cash Dividend ≥ Bonus Tax Liability"
        ]
      }}
      faqs={[
        { question: "What is the tax rate on NEPSE dividends?", answer: "The standard rate for individual investors is 5% for both bonus shares and cash dividends." },
        { question: "Are bonus shares taxed on their market price?", answer: "No, bonus shares are taxed based on their Face Value (typically Rs. 100), not their secondary market price (LTP)." },
        { question: "What happens if a company gives no cash dividend to cover bonus tax?", answer: "The investor must manually deposit the 5% tax amount to the company's bank account before bonus shares are released to their DEMAT." },
        { question: "Is dividend tax a final withholding tax?", answer: "Yes, for individual retail investors in Nepal, the 5% WHT is a final tax and does not need to be included in your annual income tax return." }
      ]}
      sidebar={{
        title: "NEPSE Intelligence",
        subtitle: "Corporate Actions",
        links: [
          { label: "Trading Calculator", href: "/calculator/nepal-stocks/", icon: TrendingUp },
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "CDSC Portal", href: "https://meroshare.cdsc.com.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "NEPSE Trading", href: "/calculator/nepal-stocks/" },
        { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

