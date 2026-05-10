'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, Calculator, Activity, Landmark, ShieldCheck, Zap, History, Target, PieChart, Info, BarChart3 } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart as ReAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart as ReBarChart, Bar
} from 'recharts';
import { TIER1_SEO_CONTENT } from '@/data/seo-content';

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
    const m = Number(monthly);
    const ra = Number(rate);
    const y = Number(years);
    const su = Number(stepUp);
    if (!m || !ra || !y || m <= 0 || ra <= 0 || y <= 0) return { success: false as const };

    const r = ra / 12 / 100;
    const s = su / 100;
    let fv = 0, totalInvested = 0, currentMonthly = m;
    const schedule: { year: number; invested: number; returns: number; balance: number; yearlyInvested: number }[] = [];
    const monthlySchedule: { month: number; invested: number; gains: number }[] = [];
    
    let runningFv = 0, runningInvested = 0, tempMonthly = m;
    for (let year = 1; year <= y; year++) {
      let yearlyInvested = 0;
      for (let mo = 1; mo <= 12; mo++) { 
        fv = (fv + currentMonthly) * (1 + r); 
        totalInvested += currentMonthly; 
        yearlyInvested += currentMonthly;
        // first 12 months for bar chart
        if (year === 1) {
          runningInvested += currentMonthly;
          runningFv = (runningFv + currentMonthly) * (1 + r);
          monthlySchedule.push({ month: mo, invested: runningInvested, gains: runningFv - runningInvested });
        }
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
      success: true as const,
      fv, 
      totalInvested, 
      returns: fv - totalInvested, 
      schedule,
      monthlySchedule
    };
  }, [monthly, rate, years, stepUp]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="sip-calculator"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/finance/' }, { label: 'SIP Calculator' }]}
      title="SIP Investment Calculator"
      description="Plan your wealth with Systematic Investment Plans (SIP) and annual step-ups for maximum growth in Nepal's mutual funds."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Returns
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result.success ? (
            <>
              <div className="p-6 bg-[#f8f9fa] border border-[#DADCE0] rounded-lg text-center">
                <div className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider mb-2">Estimated Maturity Value</div>
                <div className="text-4xl font-black text-[#202124] tracking-tight">{formatNPR(result.fv)}</div>
                <div className="text-[10px] text-[#5F6368] font-medium mt-2">After {years} Years of Investing</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                 <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-white col-span-3 sm:col-span-1">
                   <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Total Invested</div>
                   <div className="text-base font-black text-[#202124]">{formatNPR(result.totalInvested)}</div>
                 </div>
                 <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-white col-span-3 sm:col-span-1">
                   <div className="text-[9px] font-bold text-[#188038] uppercase tracking-wider mb-1">Total Gains</div>
                   <div className="text-base font-black text-[#188038]">+{formatNPR(result.returns)}</div>
                 </div>
                 <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-[#FFF7E0] col-span-3 sm:col-span-1">
                   <div className="text-[9px] font-bold text-[#F29900] uppercase tracking-wider mb-1">Wealth Multiplier</div>
                   <div className="text-base font-black text-[#F29900]">{(result.fv / result.totalInvested).toFixed(2)}x</div>
                 </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 border border-[#DADCE0] rounded-md bg-white">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Principal</div>
                  <div className="h-2 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A73E8]" style={{ width: `${(result.totalInvested / result.fv) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[11px] font-black text-[#1A73E8]">{((result.totalInvested / result.fv) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 border border-[#DADCE0] rounded-md bg-white">
                <div className="w-1.5 h-4 bg-[#188038] rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Gains</div>
                  <div className="h-2 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#188038]" style={{ width: `${(result.returns / result.fv) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[11px] font-black text-[#188038]">{((result.returns / result.fv) * 100).toFixed(1)}%</span>
              </div>
            </>
          ) : (
            <div className="p-10 text-center space-y-4">
               <Calculator className="w-12 h-12 mx-auto text-[#DADCE0]" />
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Enter SIP Details to View Projection</div>
            </div>
          )}
        </div>
      }
      details={result.success && (
        <div className="space-y-6">

          {/* Row 1: Pie + Stacked Bar Chart (matches loan-emi exactly) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: Donut Pie Chart + Progress Bars */}
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Corpus Architecture Breakdown</h3>
              </div>
              <div className="flex items-center justify-center gap-6 mb-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]" /> Invested</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]" /> Gains</div>
              </div>

              <div className="h-[240px] w-full relative mb-5">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Total Invested', value: result.totalInvested },
                        { name: 'Total Gains', value: result.returns }
                      ]}
                      cx="50%" cy="50%"
                      innerRadius={65} outerRadius={95}
                      paddingAngle={3} dataKey="value" stroke="none"
                    >
                      <Cell fill="#188038" />
                      <Cell fill="#D93025" />
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatNPR(value)}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Total Corpus</span>
                  <span className="text-base font-black text-[#202124]">{formatNPR(result.fv)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#DADCE0] rounded-md p-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase">Invested</span>
                    <span className="text-[11px] font-black text-[#188038]">{((result.totalInvested / result.fv) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#188038]" style={{ width: `${(result.totalInvested / result.fv) * 100}%` }} />
                  </div>
                </div>
                <div className="border border-[#DADCE0] rounded-md p-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase">Gains</span>
                    <span className="text-[11px] font-black text-[#D93025]">{((result.returns / result.fv) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D93025]" style={{ width: `${(result.returns / result.fv) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Stacked Bar Chart M1-M12 */}
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Compounding Trajectory</h3>
              </div>
              <div className="flex items-center justify-center gap-6 mb-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]" /> Invested</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]" /> Gains</div>
              </div>
              <div className="flex-1 min-h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={result.monthlySchedule} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} stackOffset="sign">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#5F6368', fontWeight: 'bold' }} axisLine={false} tickLine={false} tickFormatter={(v) => `M${v}`} />
                    <YAxis tick={{ fontSize: 9, fill: '#5F6368', fontWeight: 'bold' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => formatNPR(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                    <Bar dataKey="invested" name="Invested" stackId="a" fill="#188038" />
                    <Bar dataKey="gains" name="Gains" stackId="a" fill="#D93025" radius={[3, 3, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-[#70757A] italic text-center mt-4">Visualizing the transition from investment-heavy to gains-heavy growth over the first 12 months.</p>
            </div>
          </div>

          {/* Row 2: Full-width Area Chart */}
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
              <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Investment Growth Trajectory</h3>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReAreaChart data={result.schedule} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sipColorWealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#188038" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#188038" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="sipColorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DADCE0" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 'bold' }} axisLine={false} tickLine={false} tickFormatter={(val) => `Yr ${val}`} />
                  <YAxis tick={{ fontSize: 9, fill: '#5F6368', fontWeight: 'bold' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} />
                  <Tooltip cursor={{ fill: '#F8F9FA' }} formatter={(value: number) => formatNPR(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="balance" name="Total Wealth" stroke="#188038" strokeWidth={3} fillOpacity={1} fill="url(#sipColorWealth)" />
                  <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#1A73E8" strokeWidth={2} fillOpacity={1} fill="url(#sipColorInvested)" />
                </ReAreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 3: Full Amortization Table */}
          <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Table</h3>
              </div>
              <span className="text-[10px] font-bold text-[#70757A] uppercase bg-[#E8EAED] px-2 py-0.5 rounded">Scroll to view all {years} years</span>
            </div>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#F8F9FA] z-10">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#5F6368] border-b border-[#DADCE0]">Period</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#5F6368] border-b border-[#DADCE0] text-right">Monthly SIP</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#188038] border-b border-[#DADCE0] text-right">Total Invested</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#D93025] border-b border-[#DADCE0] text-right">Total Gains</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#5F6368] border-b border-[#DADCE0] text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADCE0] bg-white">
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-3 text-[11px] font-bold text-[#1A73E8]">Year {row.year}</td>
                      <td className="px-6 py-3 text-[12px] font-medium text-[#202124] text-right font-mono">{formatNPR(row.yearlyInvested / 12)}</td>
                      <td className="px-6 py-3 text-[12px] font-medium text-[#188038] text-right font-mono">{formatNPR(row.invested)}</td>
                      <td className="px-6 py-3 text-[12px] font-medium text-[#D93025] text-right font-mono">{formatNPR(row.returns)}</td>
                      <td className="px-6 py-3 text-[12px] font-black text-[#202124] text-right font-mono">{formatNPR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      sidebar={{
        title: "Investment Toolkit",
        links: [
          { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator/", icon: Zap },
          { label: "FD Calculator (Nepal)", href: "/calculator/fd-calculator/", icon: Landmark },
          { label: "SWP Calculator", href: "/calculator/swp-calculator/", icon: History },
          { label: "Retirement Planner", href: "/calculator/retirement/", icon: Target },
        ],
        banner: {
          title: "Build Generational Wealth",
          description: "Even small amounts invested consistently via SIP can grow into substantial wealth over 15-20 years.",
          image: "/images/investment-banner.jpg"
        }
      }}
      howToUse={TIER1_SEO_CONTENT['sip-calculator'].howToUse}
      formula={TIER1_SEO_CONTENT['sip-calculator'].formula}
      faqs={TIER1_SEO_CONTENT['sip-calculator'].faqs}
      relatedTools={[
        { label: "Lumpsum Calculator", href: "/calculator/lumpsum-calculator/" },
        { label: "FD Calculator", href: "/calculator/fd-calculator/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}



