'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, PieChart, Info, Calendar, Target, Calculator, Table, Activity, Home, TrendingUp, DollarSign, ShieldCheck, HelpCircle, FileText, Globe, Scale, Zap, ArrowRight, Wallet, History, ChevronRight } from 'lucide-react';
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

  return (
    <ModernCalcLayout
      slug="loan-emi"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/finance/' }, { label: 'Loan Calculator' }]}
      title={isReverse ? "Loan Affordability" : "Loan EMI"}
      description="The definitive resource for debt intelligence in Nepal. Calculate Equated Monthly Installments for Home, Auto, and Personal loans with high-precision NRB regulatory compliance auditing."
      icon={Landmark}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Loan Principal (NPR)</label>
               <input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => updateState({ principal: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Interest Rate (% P.A.)</label>
               <input 
                  type="number" 
                  step="0.1"
                  value={rate} 
                  onChange={(e) => updateState({ rate: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Loan Tenure (Years)</label>
               <input 
                  type="number" 
                  value={tenure} 
                  onChange={(e) => updateState({ tenure: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Repayment Method</label>
               <select 
                  value={method} 
                  onChange={(e) => updateState({ method: e.target.value as 'reducing' | 'flat' })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
               >
                  <option value="reducing">Reducing Balance</option>
                  <option value="flat">Flat Rate</option>
               </select>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Calculate Repayment
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          {result.success ? (
            <>
              <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
                 <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Monthly Installment (EMI)</div>
                 <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.baseEmi!)}</div>
                 <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">{tenure} Years of Repayment</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                    <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Total Interest</div>
                    <div className="text-lg font-black text-[#D93025]">{formatNPR(result.totalInterest!)}</div>
                 </div>
                 <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                    <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Total Payable</div>
                    <div className="text-lg font-black text-[#202124]">{formatNPR(result.totalPayment!)}</div>
                 </div>
              </div>
            </>
          ) : (
            <div className="p-10 text-center space-y-4">
               <Calculator className="w-12 h-12 mx-auto text-[#DADCE0]" />
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Awaiting Calculation</div>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-6">
          {result.success && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6">
                   <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                   <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Loan Architecture Breakdown</h3>
                 </div>
                 <div className="flex items-center justify-center gap-4 mb-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]"></div> Principal</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]"></div> Interest</div>
                 </div>
                 <div className="h-[240px] w-full relative mb-6">
                   <ResponsiveContainer width="100%" height="100%">
                     <RePieChart>
                       <Pie
                         data={[
                           { name: 'Principal Capital', value: result.activePrincipal },
                           { name: 'Interest Overhead', value: result.totalInterest }
                         ]}
                         cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                       >
                         <Cell fill="#188038" />
                         <Cell fill="#D93025" />
                       </Pie>
                       <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                     </RePieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Total Cost</span>
                      <span className="text-lg font-black text-[#202124]">{formatNPR(result.totalPayment!)}</span>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="border border-[#DADCE0] rounded-md p-3">
                       <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-bold text-[#5F6368] uppercase">Principal</span>
                          <span className="text-[11px] font-black text-[#188038]">{((result.activePrincipal! / result.totalPayment!) * 100).toFixed(1)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#188038]" style={{ width: `${(result.activePrincipal! / result.totalPayment!) * 100}%` }} />
                       </div>
                    </div>
                    <div className="border border-[#DADCE0] rounded-md p-3">
                       <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-bold text-[#5F6368] uppercase">Interest</span>
                          <span className="text-[11px] font-black text-[#D93025]">{((result.totalInterest! / result.totalPayment!) * 100).toFixed(1)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D93025]" style={{ width: `${(result.totalInterest! / result.totalPayment!) * 100}%` }} />
                       </div>
                    </div>
                 </div>
               </div>

               <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col">
                 <div className="flex items-center gap-2 mb-6">
                   <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                   <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Repayment Trajectory</h3>
                 </div>
                 <div className="flex-1 min-h-[280px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <ReBarChart data={result.schedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }} barSize={20}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DADCE0" />
                       <XAxis dataKey="month" tickFormatter={(v) => `M${v}`} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 'bold' }} />
                       <YAxis hide />
                       <Tooltip cursor={{ fill: '#F8F9FA' }} formatter={(value: number) => formatNPR(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                       <Bar dataKey="principal" stackId="a" fill="#188038" radius={[0, 0, 0, 0]} />
                       <Bar dataKey="interest" stackId="a" fill="#D93025" radius={[4, 4, 0, 0]} />
                     </ReBarChart>
                   </ResponsiveContainer>
                 </div>
                 <p className="text-[10px] text-[#70757A] font-medium mt-4 italic text-center">Visualizing the transition from interest-heavy to principal-heavy payments over the first 12 months.</p>
               </div>
             </div>
          )}

          {result.success && (
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#1A73E8]" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Table</h3>
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#70757A]">
                  Scroll to view all {result.totalMonths} months
                </div>
              </div>
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0] shadow-sm">
                      <th className="px-6 py-4 bg-white">Period</th>
                      <th className="px-6 py-4 bg-white text-right">EMI</th>
                      <th className="px-6 py-4 bg-white text-right text-[#188038]">Principal</th>
                      <th className="px-6 py-4 bg-white text-right text-[#D93025]">Interest</th>
                      <th className="px-6 py-4 bg-white text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4]">
                    {result.fullSchedule?.map((row) => (
                      <tr key={row.month} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1A73E8]">Month {row.month}</td>
                        <td className="px-6 py-4 text-right font-medium text-[#5F6368]">{formatNPR(row.emi)}</td>
                        <td className="px-6 py-4 text-right font-bold text-[#188038]">{formatNPR(row.principal)}</td>
                        <td className="px-6 py-4 text-right font-bold text-[#D93025]">{formatNPR(row.interest)}</td>
                        <td className="px-6 py-4 text-right font-black text-[#202124]">{formatNPR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      }
      relatedTools={[
        { label: "Home Loan Tool", href: "/calculator/home-loan/" },
        { label: "Vehicle Loan", href: "/calculator/auto-loan/" },
        { label: "Personal Loan", href: "/calculator/personal-loan/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}

