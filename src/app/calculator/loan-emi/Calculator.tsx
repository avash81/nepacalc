'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, PieChart, Info, Calendar, Target, Calculator, Table, Activity, Home, TrendingUp, DollarSign } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { safeCalculateEMI } from '@/utils/math/safeCalculations';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

const DEFAULT_STATE = { 
  principal: 1000000, 
  rate: 11.5, 
  tenure: 15, 
  method: 'reducing' as 'reducing' | 'flat', 
  fee: 1, 
  targetEmi: 15000,
  isReverse: false
};

function formatNPR(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

export default function LoanEMICalculator() {
  const [state, setState] = useSyncState('emi_v5', DEFAULT_STATE);
  const { principal, rate, tenure, method, targetEmi, isReverse } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let activePrincipal = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (isReverse) {
      activePrincipal = targetEmi * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    }

    const baseCalc = safeCalculateEMI(activePrincipal, rate, tenure, method);
    if (!baseCalc.success || !baseCalc.data) return { success: false };

    const baseEmi = baseCalc.data.emi;
    const totalInterest = baseCalc.data.totalInterest;

    const schedule = [];
    let balance = activePrincipal;
    for (let i = 1; i <= Math.min(12, n); i++) {
        const interest = balance * r;
        const principalPaid = baseEmi - interest;
        balance -= principalPaid;
        schedule.push({ month: i, interest, principal: principalPaid, balance: Math.max(0, balance) });
    }

    const fullSchedule = [];
    let fullBalance = activePrincipal;
    for (let i = 1; i <= n; i++) {
        const interest = fullBalance * r;
        const principalPaid = baseEmi - interest;
        fullBalance -= principalPaid;
        fullSchedule.push({ 
          month: i, 
          interest, 
          principal: principalPaid, 
          balance: Math.max(0, fullBalance),
          emi: baseEmi 
        });
    }

    return { 
      success: true, 
      activePrincipal,
      baseEmi, 
      totalInterest,
      totalPayment: activePrincipal + totalInterest,
      schedule,
      fullSchedule,
      totalMonths: n
    };
  }, [principal, rate, tenure, method, targetEmi, isReverse]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      slug="loan-emi"
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Loan EMI Calculator' }]}
      title={isReverse ? "Loan Affordability Calculator" : "Loan EMI Calculator"}
      description={isReverse 
        ? "Calculate the maximum loan amount you can afford based on your monthly repayment budget." 
        : "Professional EMI calculator for Home, Auto, and Personal loans in Nepal with amortization."
      }
      icon={Landmark}
      inputs={
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelCls}>Loan Principal (NPR)</label>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => updateState({ principal: Number(e.target.value) })}
                className={inputCls}
                placeholder="1,000,000"
              />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Interest Rate (% p.a.)</label>
              <input 
                type="number" 
                step="0.1"
                value={rate} 
                onChange={(e) => updateState({ rate: Number(e.target.value) })}
                className={inputCls}
                placeholder="11.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelCls}>Loan Tenure (Years)</label>
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => updateState({ tenure: Number(e.target.value) })}
                className={inputCls}
                placeholder="15"
              />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Repayment Method</label>
              <select 
                value={method} 
                onChange={(e) => updateState({ method: e.target.value as 'reducing' | 'flat' })}
                className={inputCls}
              >
                <option value="reducing">Reducing Balance</option>
                <option value="flat">Flat Rate</option>
              </select>
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Repayment
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result.success ? (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">{isReverse ? "Max Borrowing Capacity" : "Monthly Installment (EMI)"}</div>
                <div className="text-3xl font-black text-[#1A73E8]">{isReverse ? formatNPR(result.activePrincipal!) : formatNPR(result.baseEmi!)}</div>
                <div className="text-[9px] text-[#70757A] font-bold uppercase">{isReverse ? `At ${targetEmi}/mo budget` : `${tenure} years of repayment`}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Interest</div>
                   <div className="text-sm font-black text-[#D93025]">{formatNPR(result.totalInterest!)}</div>
                 </div>
                 <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
                   <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Payable</div>
                   <div className="text-sm font-black text-[#202124]">{formatNPR(result.totalPayment!)}</div>
                 </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10 opacity-30">
               <Activity className="w-10 h-10 mx-auto mb-2" />
               <p className="text-sm">Enter loan details to view report</p>
            </div>
          )}
        </div>
      }
      details={result.success && (
        <div className="space-y-10">
          {/* Main Visual Intelligence Cards (From Screenshots) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm flex flex-col">
               <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                 <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Early Repayment Schedule (1st Year)</span>
                 <Table className="w-3.5 h-3.5 text-[#1A73E8]" />
               </div>
               <div className="flex-1 overflow-y-auto max-h-[340px] custom-scrollbar">
                 <table className="w-full text-left border-collapse">
                   <thead className="sticky top-0 bg-[#F8F9FA] text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0] z-10">
                     <tr>
                       <th className="px-4 py-3">Month</th>
                       <th className="px-4 py-3 text-right">Principal</th>
                       <th className="px-4 py-3 text-right">Interest</th>
                       <th className="px-4 py-3 text-right">Balance</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#DADCE0]">
                     {result.schedule!.map((row) => (
                       <tr key={row.month} className="text-[11px] hover:bg-[#F8F9FA] transition-colors">
                         <td className="px-4 py-3 font-bold text-[#5F6368]">#{row.month}</td>
                         <td className="px-4 py-3 text-right text-[#188038] font-mono">{Math.round(row.principal).toLocaleString()}</td>
                         <td className="px-4 py-3 text-right text-[#D93025] font-mono">{Math.round(row.interest).toLocaleString()}</td>
                         <td className="px-4 py-3 text-right font-bold font-mono text-[#202124]">{Math.round(row.balance).toLocaleString()}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Loan Architecture Breakdown</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-[#70757A]">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]" /> Principal</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]" /> Interest</div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="h-[240px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: result.activePrincipal },
                          { name: 'Interest', value: result.totalInterest }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#188038" />
                        <Cell fill="#D93025" />
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatNPR(value)}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">Total Cost</span>
                     <span className="text-base font-black text-[#202124]">{formatNPR(result.totalPayment!)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-[#5F6368] uppercase">Principal</span>
                         <span className="text-[11px] font-black text-[#188038]">{((result.activePrincipal! / result.totalPayment!) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
                         <div className="h-full bg-[#188038]" style={{ width: `${(result.activePrincipal! / result.totalPayment!) * 100}%` }} />
                      </div>
                   </div>
                   <div className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-[#5F6368] uppercase">Interest</span>
                         <span className="text-[11px] font-black text-[#D93025]">{((result.totalInterest! / result.totalPayment!) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E8EAED] rounded-full overflow-hidden">
                         <div className="h-full bg-[#D93025]" style={{ width: `${(result.totalInterest! / result.totalPayment!) * 100}%` }} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repayment Trajectory (Bar Chart) - Restored from Screenshot */}
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-[#1A73E8] rounded-full" />
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Repayment Trajectory (Reducing Principal)</h3>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={result.schedule}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barSize={32}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10, fill: '#70757A', fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `M${val}`}
                  />
                  <YAxis 
                    tick={{ fontSize: 9, fill: '#70757A', fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${(val/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F1F3F4' }}
                    formatter={(value: number) => formatNPR(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px' }}
                  />
                  <Bar dataKey="principal" stackId="a" fill="#188038" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="interest" stackId="a" fill="#D93025" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Full Amortization Intelligence Table - Restored from Screenshot */}
          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Intelligence</h3>
             </div>
             <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F9FA] text-[10px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                      <th className="px-6 py-3 whitespace-nowrap">Period</th>
                      <th className="px-6 py-3 text-right whitespace-nowrap">EMI Portion</th>
                      <th className="px-6 py-3 text-right whitespace-nowrap">Principal</th>
                      <th className="px-6 py-3 text-right whitespace-nowrap">Interest</th>
                      <th className="px-6 py-3 text-right whitespace-nowrap">Outstanding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {result.fullSchedule!.map((row) => (
                      <tr key={row.month} className="text-[11px] hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-6 py-3 font-bold text-[#1A73E8] whitespace-nowrap">Month {row.month}</td>
                        <td className="px-6 py-3 text-right font-medium text-[#5F6368] whitespace-nowrap">{formatNPR(row.emi)}</td>
                        <td className="px-6 py-3 text-right font-bold text-[#188038] whitespace-nowrap">{formatNPR(row.principal)}</td>
                        <td className="px-6 py-3 text-right font-bold text-[#D93025] whitespace-nowrap">{formatNPR(row.interest)}</td>
                        <td className="px-6 py-3 text-right font-black text-[#202124] whitespace-nowrap">{formatNPR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          {/* Detailed Authority Guide Section (Placed Below Charts) */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <header className="border-b border-[#F1F3F4] pb-6">
              <h2 className="text-2xl font-black text-[#202124] leading-tight mb-3">
                The Definitive Guide to Bank Loans and EMI in Nepal (FY 2082/83)
              </h2>
              <p className="text-[13px] text-[#5F6368] leading-relaxed max-w-3xl">
                Taking out a loan is one of the most significant financial commitments a person in Nepal will make. 
                Whether you are building a house in Kathmandu, starting a business in Pokhara, or buying an Electric Vehicle (EV) 
                to navigate the city, understanding how your money is being moved is the first step toward financial freedom.
              </p>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-12">
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#202124] flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-sm font-black">1</span>
                    How Bank Loans Actually Work in Nepal
                  </h3>
                  <p className="text-[#5F6368] leading-relaxed">
                    In the Nepali banking ecosystem, "A" Class Commercial Banks (like Nabil Bank or Nepal Bank) operate 
                    under strict circulars issued by <strong className="text-[#202124]">Nepal Rastra Bank (NRB)</strong>. 
                    When you take a loan, you aren't just paying back the money; you are participating in a regulated financial 
                    contract where the interest rates are dynamic, not static.
                  </p>
                  
                  <div className="bg-[#F8F9FA] border-l-4 border-[#1A73E8] p-6 rounded-r-xl space-y-4">
                    <h4 className="text-[13px] font-black text-[#202124] uppercase tracking-wider">The "Base Rate + Premium" Model</h4>
                    <p className="text-sm text-[#5F6368]">
                      Unlike many Western countries where fixed-rate mortgages are common, Nepal primarily operates on a 
                      <strong className="text-[#202124]"> Floating Interest Rate</strong> system.
                    </p>
                    <ul className="space-y-3">
                      <li className="text-sm">
                        <strong className="text-[#1A73E8]">The Base Rate:</strong> This is the minimum rate at which a bank can lend. 
                        It changes every quarter (Poush, Chaitra, Ashadh, and Ashwin) based on the bank's cost of funds.
                      </li>
                      <li className="text-sm">
                        <strong className="text-[#1A73E8]">The Premium:</strong> This is the "extra" percentage the bank charges you 
                        based on your credit risk. This is usually fixed for the life of your loan.
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-[#DADCE0] text-[11px] font-bold text-[#188038] uppercase">
                       Crucial Advice: Negotiate the Premium, not the total rate. A 0.5% lower premium can save you lakhs.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#202124] flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-sm font-black">2</span>
                    Step-by-Step Guide: From Calculator to Cash-in-Hand
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: "Research", desc: "Use this EMI tool to find your Sweet Spot. Play with tenure to balance monthly costs vs total interest." },
                      { title: "Paper Trail", desc: "Prepare Nagarikta, 6 months bank statements, Lalpurja/Bluebook, and Mandatory IRD Tax Clearance." },
                      { title: "Negotiation", desc: "Visit the Credit Manager. Ask for the 'A' Class Rate and check processing fees (0.75% to 1.25%)." }
                    ].map((step, i) => (
                      <div key={i} className="p-5 border border-[#DADCE0] rounded-xl hover:border-[#1A73E8] transition-all group">
                        <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-2">Phase {i+1}</div>
                        <div className="text-sm font-bold text-[#202124] mb-2">{step.title}</div>
                        <p className="text-[12px] text-[#5F6368] leading-relaxed group-hover:text-[#202124] transition-colors">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#202124] flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-sm font-black">3</span>
                    What to Avoid: Common Pitfalls in Nepal
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FEEFC3] flex items-center justify-center text-[#E37400] font-black text-xs">A</div>
                       <div className="space-y-2">
                         <h4 className="text-sm font-black text-[#202124]">The "Flat Rate" Deception</h4>
                         <p className="text-[13px] text-[#5F6368] leading-relaxed">
                            Sahakaris might offer a 10% Flat Rate. It sounds better than a bank's 13% reducing rate, but it's a trap. 
                            A 10% Flat Rate is actually closer to an <strong className="text-[#D93025]">18% Reducing Rate</strong>. 
                            Always insist on reducing balance calculation.
                         </p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FEEFC3] flex items-center justify-center text-[#E37400] font-black text-xs">B</div>
                       <div className="space-y-2">
                         <h4 className="text-sm font-black text-[#202124]">The Over-Leverage Risk (DSTI Ratio)</h4>
                         <p className="text-[13px] text-[#5F6368] leading-relaxed">
                            NRB rules specify that your total EMIs should not exceed <strong className="text-[#202124]">50% to 60%</strong> of your 
                            verifiable monthly income. If you earn Rs. 1 Lakh and EMI is Rs. 70,000, your loan will likely be rejected.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#202124] text-white p-6 rounded-2xl space-y-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-full blur-[60px] opacity-10" />
                   <h3 className="text-sm font-bold border-b border-white/10 pb-2 relative z-10">Strategic Loan Planning</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Home Buyers (Ghar Karja)</h4>
                         <p className="text-[11px] text-slate-300 leading-relaxed">Long-term (15-25 years). A 0.25% rate difference can save the cost of a small car over 20 years.</p>
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">EV Buyers (Sawari Karja)</h4>
                         <p className="text-[11px] text-slate-300 leading-relaxed">NRB currently allows up to 80% financing for Electric Vehicles, vs 50% for petrol cars.</p>
                      </div>
                   </div>
                </div>

              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-4 h-4 text-[#1A73E8]" />
                    <h4 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Summary Checklist</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Negotiate the Premium (The bank's control point)",
                      "Verify Method is 'Reducing Balance'",
                      "Audit Processing & Valuation Fees",
                      "Check DSTI Ratio Compatibility",
                      "Analyze Pre-payment Clauses (1-2% fee)",
                      "Verify IRD Tax Clearance Validity"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-xs text-[#5F6368] items-start">
                        <div className="w-4 h-4 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#188038] flex-shrink-0 mt-0.5 font-black">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-[#F1F3F4]">
                     <p className="text-[10px] text-[#70757A] font-medium leading-relaxed">
                        Disclaimer: Based on Finance Act and NRB Directives 2082/83. Banking terms vary by institution. 
                        Consult a certified advisor.
                     </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>
      )}
      howToUse={{
        steps: [
          "Choose 'Direct EMI' if you know the loan amount you need.",
          "Choose 'Affordability' to find how much you can borrow with your monthly budget.",
          "Enter the annual interest rate (current bank rates in Nepal range from 9% to 14%).",
          "Set the tenure in years (Home loans typically go up to 15-20 years).",
          "Select 'Reducing Balance' for standard bank loans or 'Flat Rate' for some finance companies."
        ]
      }}
      formula={{
        title: "The Standard Amortization Formula",
        description: "Our Loan EMI Calculator uses the precise mathematical model recognized by global financial institutions and Nepal Rastra Bank.",
        raw: "E = [P × r × (1+r)^n] / [(1+r)^n - 1]\n\nVariables Explained:\n• P (Principal): The total sum borrowed.\n• r (Monthly Interest Rate): (Annual Rate / 12 / 100). E.g., 13.5% = 0.01125.\n• n (Tenure in Months): A 15-year loan has an n of 180.\n\nThis formula calculates the fixed monthly amount required to clear both principal and interest by the end of the tenure."
      }}
      faqs={[
        {
          question: "How often does my EMI change?",
          answer: "In a floating-rate system, banks review their Base Rate every 3 months. If the Base Rate goes up, banks usually keep your EMI the same but increase your loan tenure. If you want to keep the same tenure, you must request an EMI increase instead."
        },
        {
          question: "What is a 'Grace Period'?",
          answer: "Common in construction or agriculture loans, this is a period where you only pay the Interest and not the Principal. This is also called a Moratorium Period."
        },
        {
          question: "Does insurance matter for Nepali loans?",
          answer: "Yes. Every bank loan in Nepal requires the asset (house or car) to be insured with the bank as the beneficiary. Additionally, Credit Term Life Insurance is often mandatory to protect the family from debt."
        },
        {
          question: "Can I use my Gold as collateral?",
          answer: "Yes. Gold loans (Sun Karja) are common for short-term liquidity. You can estimate your collateral value using current gold rates before visiting the branch."
        },
        {
          question: "What is the DSTI ratio exactly?",
          answer: "The Debt Service to Income ratio is the percentage of your gross income that goes toward paying debt. NRB limits this to ensure borrowers are not over-leveraged and can maintain a basic standard of living."
        }
      ]}
      sidebar={{
        title: "Loan Toolkit",
        subtitle: "Financial Resources",
        links: [
          { label: "Home Loan Nepal", href: "/calculator/nepal-home-loan", icon: Home },
          { label: "Salary Calculator", href: "/calculator/nepal-salary", icon: Activity },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: DollarSign },
          { label: "Land Area Converter", href: "/calculator/nepal-land-area", icon: TrendingUp },
        ],
      }}
      relatedTools={[
        { label: "Home Loan", href: "/calculator/nepal-home-loan" },
        { label: "Salary Tool", href: "/calculator/nepal-salary" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
