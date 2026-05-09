'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, ShieldCheck, AlertTriangle, Info, Wallet, Zap, Scale, Activity, Globe, History, Receipt, Target, PieChart, Landmark } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

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

    return { 
      bonusTaxAmount, 
      cashTaxAmount, 
      totalTax, 
      totalDividendValue, 
      netPayable,
      chartData: [
        { name: 'Net Value', val: Math.max(0, netPayable), fill: '#10b981' },
        { name: 'Bonus Tax', val: bonusTaxAmount, fill: '#ef4444' },
        { name: 'Cash Tax', val: cashTaxAmount, fill: '#3b82f6' }
      ]
    };
  }, [bonusShares, cashDividend, faceValue]);

  return (
    <ModernCalcLayout
      slug="nepse-bonus-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Share Tax' }]}
      title="NEPSE Dividend"
      description="The definitive withholding engine for Nepal's stock market. Calculate dividend tax on bonus shares and cash distributions with IRD statutory compliance."
      icon={TrendingUp}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Investor Protocol</label>
                   <div className="flex p-1 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                    {['individual', 'institutional'].map(opt => (
                      <button key={opt} onClick={() => update({ investorType: opt as any })} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${investorType === opt ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400'}`}>{opt}</button>
                    ))}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-[#1a0dab]">Bonus Shares</label>
                      <input type="number" value={bonusShares} onChange={e => update({ bonusShares: Number(e.target.value) })} className="w-full h-12 px-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] font-black" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-[#1a0dab]">Face Value (Rs)</label>
                      <input type="number" value={faceValue} onChange={e => update({ faceValue: Number(e.target.value) })} className="w-full h-12 px-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-[#202124] font-black" />
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Gross Cash Dividend (NPR)</label>
                   <input 
                      type="number" 
                      value={cashDividend} 
                      onChange={(e) => update({ cashDividend: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Statutory Tax Shield</h3>
             </div>
             <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">
                Listed Companies: <span className="text-blue-600 underline decoration-2">5.0% Fixed WHT</span>.
             </p>
             <div className="flex gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <Info className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-[10px] text-emerald-800 font-bold leading-tight">
                   Mutual Funds are exempt from WHT on dividends received from portfolio companies.
                </p>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp className="w-24 h-24 text-rose-600" /></div>
             <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em]">Total Tax Withheld (5%)</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.totalTax)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Final Withholding Tax (WHT)
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Net Value Gain</div>
                <div className="text-xl font-black text-emerald-600">{formatNPR(result.netPayable)}</div>
             </div>
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Gross Dividend</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(result.totalDividendValue)}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Wallet className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Yield Integrity</h4>
                   <p className="text-2xl font-black">{((result.netPayable / result.totalDividendValue) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(result.netPayable / result.totalDividendValue) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Dividend Burden Audit</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.chartData.filter(d => d.val > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.chartData.filter(d => d.val > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Gross Gain</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(result.totalDividendValue)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Bonus vs Cash Logic</h3>
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#dadce0]">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bonus Share Tax</span>
                        <span className="text-xl font-black text-emerald-400">{formatNPR(result.bonusTaxAmount)}</span>
                     </div>
                     <p className="text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                        Calculated on Face Value (Rs. 100), not Market Price.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                        <div className="text-[9px] text-slate-400 uppercase font-black mb-1">Cash Tax</div>
                        <div className="text-sm font-black">{formatNPR(result.cashTaxAmount)}</div>
                     </div>
                     <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                        <div className="text-[9px] text-slate-400 uppercase font-black mb-1">WHT Status</div>
                        <div className="text-sm font-black text-emerald-400 uppercase">Final</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The NEPSE Dividend Encyclopedia: Navigating Tax & Capital</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                In the <strong>Nepal Stock Exchange (NEPSE)</strong>, dividends are the primary mechanism for distributing corporate surplus. Governed by the <strong>Income Tax Act, 2058</strong>, these distributions are subject to a flat <strong>5% Withholding Tax (WHT)</strong>. Understanding the interplay between bonus shares, cash dividends, and the resulting tax liability is essential for long-term portfolio management.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Face Value Taxation</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Crucially, bonus shares are taxed based on their <strong>Face Value</strong> (usually NPR 100), not their current market price (LTP). This statutory rule significantly lowers the tax burden for premium stocks trading at high multiples.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Bonus Share Tax: The Out-of-Pocket Risk</h3>
              <p>
                When a company issues bonus shares without an accompanying cash dividend, the investor must manually deposit the 5% WHT to the company's designated bank account before the shares are credited to their DEMAT. Our <strong>Institutional Engine</strong> calculates this exact amount to prevent delays in share receipt.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Cash Covered Bonus</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Investor-friendly companies declare a cash dividend equal to 5% of the bonus share value to cover the tax liability, making the distribution "Tax Neutral" for the holder.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Final Withholding</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      For individuals, the 5% WHT is a <strong>Final Tax</strong>. It does not need to be added to your annual taxable income or declared in your IRD returns.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Capital Gains vs. Dividend Tax</h3>
              <p>
                While dividends are taxed at 5%, the <strong>Capital Gains Tax (CGT)</strong> on the sale of shares is progressive based on holding period. For individuals, a gain on shares held for over 365 days is taxed at 5%, while short-term gains (under 365 days) are taxed at 7.5%.
              </p>
            </div>
          </section>

          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-emerald-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-emerald-400 uppercase tracking-widest">Portfolio Integrity Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Target className="w-5 h-5" /> Book Closure</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Only shareholders listed in the company registry as of the Book Closure date are eligible for dividends. Ensure T+2 settlement time.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Receipt className="w-5 h-5" /> WACC Audit</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Bonus shares lower your <strong>Weighted Average Cost of Capital (WACC)</strong>. Update your cost basis in MeroShare immediately after shares are credited.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> Institutional Rates</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Institutional investors (Companies) may face 15% TDS on dividends, which is treated as an advance tax against corporate liability.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Investor Type: Select 'Individual' for 5% WHT logic.",
          "Bonus Shares: Enter the number of new shares you are receiving.",
          "Face Value: Standard is Rs. 100 for shares and Rs. 10 for Mutual Funds.",
          "Cash Dividend: Enter any gross cash amount declared alongside.",
          "Audit: Review the 'Total Tax Liability' to see the exact withholding amount."
        ]
      }}
      formula={{
        title: "The Dividend Withholding Axiom",
        description: "Official IRD formulation for NEPSE corporate actions.",
        raw: "$$Total Tax = (Shares \\times FaceValue \\times 0.05) + (Cash \\times 0.05)$$",
        latex: "Tax = (Bonus \\times 100 \\times 0.05) + (Cash \\times 0.05)"
      }}
      faqs={[
        { question: "What is the tax rate on NEPSE dividends?", answer: "The standard rate for individual investors is 5% for both bonus shares and cash dividends." },
        { question: "Are bonus shares taxed on their market price?", answer: "No, bonus shares are taxed based on their Face Value (typically Rs. 100), not their secondary market price (LTP)." },
        { question: "What is the dividend tax for Mutual Funds?", answer: "Mutual funds are exempt from paying tax on dividends they receive. However, unit holders pay 5% when the fund distributes its own dividends." },
        { question: "Is dividend tax a final withholding tax?", answer: "Yes, for individual retail investors in Nepal, the 5% WHT is a final tax and does not need to be included in your annual income tax return." },
        { question: "What happens if a company gives no cash dividend to cover bonus tax?", answer: "The investor must manually deposit the 5% tax amount to the company's bank account before bonus shares are released to their DEMAT." },
        { question: "What is the Face Value for Mutual Fund units?", answer: "Most mutual fund units in Nepal have a face value of Rs. 10, compared to Rs. 100 for equity shares." },
        { question: "Does the dividend tax change if I am a long-term investor?", answer: "No, unlike Capital Gains Tax (CGT), the dividend tax rate is a flat 5% regardless of your holding period." },
        { question: "How is cash dividend tax deducted?", answer: "The company automatically deducts 5% from the gross cash amount and credits the remaining 95% to your bank account." },
        { question: "Who sets the dividend tax rate in Nepal?", answer: "The Ministry of Finance sets the rates through the annual Finance Act/Budget announcement." },
        { question: "What is 'Tax Neutral' dividend?", answer: "It refers to a distribution where the company provides enough cash dividend to exactly cover the tax liability of the bonus shares." },
        { question: "Can I claim a refund for dividend tax?", answer: "Since it is a final withholding tax for individuals, it generally cannot be claimed as a refund or credit against other taxes." },
        { question: "What is the tax for institutional investors?", answer: "Institutional investors (except mutual funds) typically face 15% TDS on dividends, which is adjustable against their total corporate tax." },
        { question: "How long does it take for bonus shares to hit my DEMAT?", answer: "It usually takes 1-3 months after the AGM and book closure, provided the tax has been settled (either via cash cover or manual deposit)." },
        { question: "Do I have to pay tax on right shares?", answer: "Right shares themselves are not taxed at the time of issuance (as you pay face value for them), but any subsequent gain on sale is subject to CGT." },
        { question: "Is the dividend tax the same for private companies?", answer: "No, dividends from private (unlisted) companies may be subject to different rates and declaration rules." },
        { question: "What is the CGT rate for individual share investors?", answer: "It is 5% for long-term (held > 365 days) and 7.5% for short-term (held < 365 days) capital gains." },
        { question: "What is WACC in NEPSE?", answer: "Weighted Average Cost of Capital (WACC) is your average purchase price per share, which is used to calculate your CGT upon sale." },
        { question: "Does this calculator handle corporate surcharges?", answer: "For individuals, dividend tax is a flat 5% without surcharges. High earners may face surcharges on total taxable income, but dividends are final." },
        { question: "What is the 'Holding Period' for bonus shares?", answer: "For CGT purposes, the holding period of bonus shares starts from the date of the book closure announcement." },
        { question: "Is this tool updated for FY 2081/82?", answer: "Yes, it reflects the latest 5% WHT standard as per the current Finance Act." }
      ]}
      sidebar={{
        title: "NEPSE Hub",
        subtitle: "Tax & Compliance",
        links: [
          { label: "WACC Calculator", href: "/calculator/nepse-wacc/", icon: Target },
          { label: "Trading Calculator", href: "/calculator/nepal-stocks/", icon: Activity },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "CDSC Portal", href: "https://meroshare.cdsc.com.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "WACC Calculator", href: "/calculator/nepse-wacc/" },
        { label: "Trading Tool", href: "/calculator/nepal-stocks/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
