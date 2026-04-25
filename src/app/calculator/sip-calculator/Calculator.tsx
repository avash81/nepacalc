'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, PieChart, Info, BarChart3, LineChart, Target, Calculator, Table, Activity, DollarSign } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart as ReAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

const DEFAULT_STATE = { 
  monthly: 5000, 
  rate: 12, 
  years: 10, 
  stepUp: 10 
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }
function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function SIPCalculator() {
  const [state, setState] = useSyncState('sip_v5', DEFAULT_STATE);
  const { monthly, rate, years, stepUp } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const s = stepUp / 100;
    let fv = 0, totalInvested = 0, currentMonthly = monthly;
    const schedule: { year: number; invested: number; returns: number; balance: number; yearlyInvested: number }[] = [];
    
    for (let year = 1; year <= years; year++) {
      let yearlyInvested = 0;
      for (let m = 1; m <= 12; m++) { 
        fv = (fv + currentMonthly) * (1 + r); 
        totalInvested += currentMonthly; 
        yearlyInvested += currentMonthly;
      }
      schedule.push({ 
        year, 
        invested: totalInvested, 
        returns: fv - totalInvested, 
        balance: fv,
        yearlyInvested
      });
      currentMonthly = currentMonthly * (1 + s);
    }
    return { 
      success: true,
      fv, 
      totalInvested, 
      returns: fv - totalInvested, 
      schedule 
    };
  }, [monthly, rate, years, stepUp]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="sip-calculator"
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'SIP Calculator' }]}
      title="SIP Investment Calculator"
      description="Plan your wealth with Systematic Investment Plans (SIP) and annual step-ups for maximum growth in Nepal's mutual funds."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Monthly Investment (NPR)</label>
            <div className="relative">
              <input 
                type="number" 
                value={monthly} 
                onChange={e => updateState({ monthly: Number(e.target.value) })} 
                className={inputCls} 
                placeholder="5000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A] font-bold">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Return Rate (p.a.)</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1"
                  value={rate} 
                  onChange={e => updateState({ rate: Number(e.target.value) })} 
                  className={inputCls} 
                  placeholder="12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A] font-bold">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Period (Years)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={years} 
                  onChange={e => updateState({ years: Number(e.target.value) })} 
                  className={inputCls} 
                  placeholder="10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A] font-bold">YRS</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Annual Step-Up (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={stepUp} 
                onChange={e => updateState({ stepUp: Number(e.target.value) })} 
                className={inputCls} 
                placeholder="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A] font-bold">%</span>
            </div>
            <p className="text-[10px] text-[#70757A]">Increase your monthly investment by this % every year.</p>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Returns
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result.success ? (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Maturity Value</div>
                <div className="text-3xl font-black text-[#1A73E8]">{formatNPR(result.fv)}</div>
                <div className="text-[9px] text-[#70757A] font-bold uppercase">After {years} years of investing</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Invested</div>
                   <div className="text-sm font-black text-[#202124]">{formatNPR(result.totalInvested)}</div>
                 </div>
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Gains</div>
                   <div className="text-sm font-black text-[#188038]">+{formatNPR(result.returns)}</div>
                 </div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg mt-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#F29900]" />
                  <span className="text-[11px] font-bold text-[#202124] uppercase">Wealth Multiplier</span>
                </div>
                <span className="text-sm font-black text-[#F29900]">{(result.fv / (result.totalInvested || 1)).toFixed(2)}x</span>
              </div>
            </>
          ) : (
            <div className="text-center py-10 opacity-30">
               <Activity className="w-10 h-10 mx-auto mb-2" />
               <p className="text-sm">Enter SIP details to view projection</p>
            </div>
          )}
        </div>
      }
      details={result.success && (
        <div className="space-y-8">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Table replacing old growth projection */}
            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm flex flex-col">
               <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                 <span className="text-[10px] font-bold text-[#70757A] uppercase">Wealth Accumulation Schedule</span>
                 <Table className="w-3.5 h-3.5 text-[#1A73E8]" />
               </div>
               <div className="flex-1 overflow-y-auto max-h-[340px]">
                 <table className="w-full text-left">
                   <thead className="sticky top-0 bg-[#F8F9FA] text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                     <tr>
                       <th className="px-4 py-3">Year</th>
                       <th className="px-4 py-3 text-right">Invested</th>
                       <th className="px-4 py-3 text-right">Returns</th>
                       <th className="px-4 py-3 text-right">Corpus</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#DADCE0]">
                     {result.schedule.map((row) => (
                       <tr key={row.year} className="text-[11px] hover:bg-[#F8F9FA] transition-colors">
                         <td className="px-4 py-3 font-bold text-[#5F6368]">Yr {row.year}</td>
                         <td className="px-4 py-3 text-right text-[#202124] font-mono">{fmt(row.invested)}</td>
                         <td className="px-4 py-3 text-right text-[#188038] font-mono">{fmt(row.returns)}</td>
                         <td className="px-4 py-3 text-right font-black font-mono text-[#1A73E8]">{fmt(row.balance)}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Pie Chart Analysis */}
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Corpus Breakdown</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-[#70757A]">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1A73E8]" /> Invested</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]" /> Gains</div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="h-[240px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Total Invested', value: result.totalInvested },
                          { name: 'Total Gains', value: result.returns }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#1A73E8" />
                        <Cell fill="#188038" />
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatNPR(value)}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">Total Wealth</span>
                     <span className="text-base font-black text-[#202124]">{formatNPR(result.fv)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-[#5F6368] uppercase">Invested</span>
                         <span className="text-[11px] font-black text-[#1A73E8]">{((result.totalInvested / result.fv) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
                         <div className="h-full bg-[#1A73E8]" style={{ width: `${(result.totalInvested / result.fv) * 100}%` }} />
                      </div>
                   </div>
                   <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-[#5F6368] uppercase">Gains</span>
                         <span className="text-[11px] font-black text-[#188038]">{((result.returns / result.fv) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
                         <div className="h-full bg-[#188038]" style={{ width: `${(result.returns / result.fv) * 100}%` }} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area Chart Projection */}
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-[#1A73E8] rounded-full" />
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Investment Growth Trajectory</h3>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReAreaChart
                  data={result.schedule}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#188038" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#188038" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 10, fill: '#70757A', fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `Yr ${val}`}
                  />
                  <YAxis 
                    tick={{ fontSize: 9, fill: '#70757A', fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${(val/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatNPR(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="balance" name="Total Wealth" stroke="#188038" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                  <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#1A73E8" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" />
                </ReAreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm mt-8">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering Systematic Investments in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In the evolving Nepalese capital market, Systematic Investment Plans (SIP) offered by mutual funds regulated by the Securities Board of Nepal (SEBON) have become the premier wealth accumulation vehicle for retail investors. Our <strong className="text-[#202124]">sip calculator nepal</strong> is designed to project long-term capital appreciation by modeling regular capital injections against expected annualized market returns, factoring in the critical mechanics of Rupee Cost Averaging.
              </p>
              <p>
                Unlike static fixed deposits, a <strong className="text-[#202124]">mutual fund sip nepal</strong> thrives on market volatility. By mathematically maintaining a constant investment cadence, investors accumulate more units when the NEPSE index is low and fewer when it is high. This engine also integrates advanced Step-Up algorithms, allowing you to model a <strong className="text-[#202124]">step up sip calculator</strong> scenario where your investment amounts grow synchronously with your annual salary increments.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Mechanics of Wealth Compounding</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Compound Interest Engine:</strong> The algorithm calculates Future Value (FV) using discrete monthly compounding formulas. Every generated return is automatically reinvested into the principal pool, triggering a snowball effect where you earn "interest on your interest" over extended 10 to 20-year horizons.</li>
              <li><strong className="text-[#188038]">The Step-Up Multiplier:</strong> Incorporating an annual step-up (e.g., a 10% yearly increase in your monthly SIP) dramatically alters the maturity trajectory. This mitigates long-term inflation impacts and significantly boosts the final corpus without straining your initial monthly cash flow constraints.</li>
              <li><strong className="text-[#D93025]">SEBON Tax Implications:</strong> While the gross maturity value is calculated here, investors must account for Capital Gains Tax (CGT) upon redemption. Under current Inland Revenue Department (IRD) directives, mutual fund capital gains are subject to specific CGT slabs (typically 5% for long-term holdings), which will slightly adjust your net-in-hand realization.</li>
            </ul>
          </div>
        </div>
      )}
      howToUse={{
        steps: [
          "Enter your initial Monthly SIP amount.",
          "Set your expected annual return rate (average for mutual funds is 10-15% in Nepal).",
          "Choose your investment time horizon in years (longer horizons maximize compounding).",
          "Optional: Set an 'Annual Step-Up %' to reflect yearly salary increments. This dramatically increases final wealth.",
          "Review the maturity value, area charts, and corpus breakdown to understand your wealth trajectory."
        ]
      }}
      formula={{
        title: "SIP Calculation Formula & Derivation",
        description: "The calculator uses the future value of an annuity due formula, adapted for monthly contributions. When Step-Up is active, the formula recalculates the PMT (payment) annually.",
        raw: "FV = P × ({[1 + i]^n - 1} / i) × (1 + i)\n\nVariables Explained:\n• P: Periodic SIP Amount (e.g., Rs. 5000)\n• i: Periodic Interest Rate (Annual Rate / 12 / 100)\n• n: Total Number of Months\n\nFor Step-Up SIPs, the formula is executed iteratively for each year, adjusting 'P' by the Step-Up percentage: P_new = P_old * (1 + StepUp_Rate)."
      }}
      faqs={[
        {
          question: "What is an SIP Step-Up and why is it important?",
          answer: "Step-up SIP allows you to increase your monthly investment by a fixed percentage every year (e.g., matching a 10% salary hike). This combats inflation and significantly boosts your final corpus due to accelerated compounding in the later years."
        },
        {
          question: "Are returns from SIP guaranteed in Nepal?",
          answer: "No, mutual fund and stock market investments in Nepal (NEPSE) are subject to market risks. The SIP return rates used here are estimates based on historical market performance for planning purposes."
        },
        {
          question: "Is SIP better than Lumpsum investing?",
          answer: "SIP is often preferred for retail investors as it averages out the cost of investment (Rupee Cost Averaging). You buy more units when the market is down and fewer when it is up, reducing the risk of timing the market incorrectly."
        },
        {
          question: "What is Rupee Cost Averaging?",
          answer: "Rupee cost averaging is a strategy where you invest a fixed amount regularly, regardless of the share/unit price. It inherently forces you to buy cheaper units during market dips, lowering your average cost per unit over time."
        },
        {
          question: "Are mutual fund returns in Nepal taxable?",
          answer: "Yes, under Inland Revenue Department (IRD) rules, capital gains from mutual funds are subject to Capital Gains Tax (CGT). Currently, for individual investors, the CGT is generally 5% for long-term investments (held > 1 year)."
        },
        {
          question: "Can I stop or pause my SIP anytime?",
          answer: "Yes, most open-ended mutual funds in Nepal allow you to pause, stop, or redeem your SIP units at any time, providing high liquidity compared to fixed deposits, though exit loads may apply if redeemed too early."
        }
      ]}
      sidebar={{
        title: "Investment Toolkit",
        links: [
          { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator" },
          { label: "FD Calculator (Nepal)", href: "/calculator/fd-calculator" },
          { label: "SWP Calculator", href: "/calculator/swp-calculator" },
          { label: "Retirement Planner", href: "/calculator/retirement" },
        ],
        banner: {
          title: "Build Generational Wealth",
          description: "Even small amounts invested consistently via SIP can grow into substantial wealth over 15-20 years.",
          image: "/images/investment-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator" },
        { label: "FD Calculator", href: "/calculator/fd-calculator" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}

