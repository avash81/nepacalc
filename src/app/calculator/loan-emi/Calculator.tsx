'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, PieChart, Info, Calendar, Target, Calculator, Table, Activity, Home, TrendingUp, DollarSign, ShieldCheck, HelpCircle, FileText, Globe, Scale } from 'lucide-react';
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
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/financial/' }, { label: 'Loan Calculator' }]}
      title={isReverse ? "Loan Affordability Calculator" : "Loan Calculator"}
      description="Professional EMI calculator for Home, Auto, and Personal loans with full amortization schedules."
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
        <div className="space-y-8">
          {/* Main Visual Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-5 bg-[#1A73E8] rounded-full" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Repayment Trajectory</h3>
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
              <div className="mt-4 pt-4 border-t border-[#F1F3F4] text-[10px] text-[#5F6368] leading-relaxed italic">
                Visualizing the transition from interest-heavy to principal-heavy payments over the first 12 months.
              </div>
            </div>
          </div>

          {/* Full Amortization Table */}
          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm flex flex-col">
             <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Activity className="w-4 h-4 text-[#1A73E8]" />
                   <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Table</h3>
                </div>
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Scroll to view all {result.totalMonths} months</span>
             </div>
             <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
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

        </div>
      )}
      howToUse={{
        steps: [
          "Enter your Principal loan amount.",
          "Set the Annual Interest Rate (%) provided by your lender.",
          "Choose the Tenure in years.",
          "Verify the repayment method (Reducing vs Flat).",
          "Analyze your charts and amortization schedule."
        ]
      }}
      formula={{
        title: "Loan EMI Formula",
        description: "The mathematical standard for equated monthly installments. This formula ensures that you pay a fixed amount every month while your interest is calculated on the reducing principal balance.",
        raw: "EMI [E] = [P x r x (1+r)^n] / [(1+r)^n - 1]\n\nP: Principal (Loan Amount)\nr: Monthly Interest (Annual / 12 / 100)\nn: Tenure in months"
      }}

      sidebar={{
        title: "NepaCalc Tools",
        subtitle: "Professional Resources",
        links: [
          { label: "Home Loan Calculator", href: "/calculator/mortgage", icon: Home },
          { label: "Vehicle Loan Tool", href: "/calculator/auto-loan", icon: TrendingUp },
          { label: "Salary Tool", href: "/calculator/salary", icon: Activity },
          { label: "Tax Intelligence", href: "/calculator/tax", icon: DollarSign },
        ],
      }}
      relatedTools={[
        { label: "Mortgage Tool", href: "/calculator/mortgage" },
        { label: "Auto Loan", href: "/calculator/auto-loan" },
        { label: "Personal Loan", href: "/calculator/personal-loan" }
      ]}
    />
  );
}
