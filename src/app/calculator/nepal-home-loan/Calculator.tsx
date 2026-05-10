'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Landmark, TrendingDown, ShieldCheck, Info, Wallet, Zap, Scale, 
  Activity, Globe, History, Receipt, Target, PieChart, ArrowRight,
  Home, Building2, Briefcase, Calculator, ChevronRight, Table
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const KTM_BANKS = [
  { name: 'Nabil Bank', base: 7.95, premium: '1.5 - 3.5', icon: Building2 },
  { name: 'Standard Chartered', base: 7.50, premium: '2.0 - 4.0', icon: Landmark },
  { name: 'Global IME', base: 8.40, premium: '1.0 - 3.0', icon: Briefcase },
  { name: 'Everest Bank', base: 7.80, premium: '2.5 - 5.0', icon: Building2 },
  { name: 'Sanima Bank', base: 8.10, premium: '1.5 - 3.0', icon: Landmark },
];

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalHomeLoanCalculator() {
  const [state, setState] = useSyncState('nepal_home_loan_v5', {
    principal: 5000000,
    baseRate: 8.25,
    premium: 2.5,
    tenureYears: 15
  });

  const { principal, baseRate, premium, tenureYears } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const effectiveRate = baseRate + premium;

  const results = useMemo(() => {
    const r = effectiveRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    const pieData = [
      { name: 'Principal Capital', value: principal },
      { name: 'Interest Overhead', value: totalInterest }
    ];

    // Amortization Schedule
    const fullSchedule = [];
    let balance = principal;
    for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principalPaid = emi - interest;
        balance -= principalPaid;
        fullSchedule.push({ 
          month: i, 
          interest, 
          principal: principalPaid, 
          balance: Math.max(0, balance),
          emi: emi 
        });
    }

    // Chart Summary (First 12 months)
    const chartSummary = fullSchedule.slice(0, 12);

    return { emi, totalPayment, totalInterest, pieData, fullSchedule, chartSummary, totalMonths: n };
  }, [principal, effectiveRate, tenureYears]);

  return (
    <ModernCalcLayout
      slug="nepal-home-loan"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Home Loan' }]}
      title="Nepal Home Loan"
      description="The definitive real estate debt auditing engine for Nepal. Calibrated to NRB 'Base Rate + Premium' models with cascaded amortization and tax shield analytics."
      icon={Home}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Loan Principal (NPR)</label>
               <input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => update({ principal: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Base Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={baseRate} 
                    onChange={e => update({ baseRate: Number(e.target.value) })} 
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Premium (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={premium} 
                    onChange={e => update({ premium: Number(e.target.value) })} 
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                  />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Loan Tenure ({tenureYears} Years)</label>
               <input 
                 type="range" 
                 min="1" 
                 max="30" 
                 value={tenureYears} 
                 onChange={(e) => update({ tenureYears: Number(e.target.value) })}
                 className="w-full h-2 bg-[#F1F3F4] rounded-lg appearance-none cursor-pointer accent-[#1A73E8]"
               />
               <div className="flex justify-between text-[10px] font-bold text-[#70757A] uppercase">
                  <span>1 Year</span>
                  <span>30 Years</span>
               </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DADCE0] space-y-4">
             <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Bank Benchmarks (Base Rate)</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {KTM_BANKS.map(bank => (
                  <button 
                    key={bank.name} 
                    onClick={() => update({ baseRate: bank.base })}
                    className="flex items-center justify-between p-3 rounded-md border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <bank.icon className="w-4 h-4 text-[#5F6368] group-hover:text-[#1A73E8]" />
                      <span className="text-[11px] font-bold text-[#3C4043] truncate">{bank.name}</span>
                    </div>
                    <span className="text-[11px] font-black text-[#1A73E8]">{bank.base}%</span>
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Monthly Installment (EMI)</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(results.emi)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">{tenureYears} Years at {effectiveRate.toFixed(2)}% APR</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Total Interest</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(results.totalInterest)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Total Payable</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(results.totalPayment)}</div>
             </div>
          </div>
          
          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase">Loan to Interest Ratio</span>
                <span className="text-[11px] font-black text-[#202124]">{((principal / results.totalPayment) * 100).toFixed(1)}% Equity</span>
             </div>
             <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: `${(principal / results.totalPayment) * 100}%` }} />
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
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Mortgage Architecture</h3>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]"></div> Principal</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]"></div> Interest</div>
              </div>
              <div className="h-[240px] w-full relative mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={results.pieData}
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
                   <span className="text-lg font-black text-[#202124]">{formatNPR(results.totalPayment)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Initial 12-Month Trajectory</h3>
              </div>
              <div className="flex-1 min-h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartSummary} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DADCE0" />
                    <XAxis dataKey="month" tickFormatter={(v) => `M${v}`} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#5F6368', fontWeight: 'bold' }} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: '#F8F9FA' }} formatter={(value: number) => formatNPR(value)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: 'bold' }} />
                    <Bar dataKey="principal" stackId="a" fill="#188038" />
                    <Bar dataKey="interest" stackId="a" fill="#D93025" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-[#70757A] font-medium mt-4 italic text-center uppercase tracking-tighter">Early payments are interest-heavy. Prepaying principal saves significant capital.</p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Schedule</h3>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#70757A]">
                {results.totalMonths} Scheduled Payments
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
                  {results.fullSchedule.map((row) => (
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
        </div>
      }
      howToUse={{
        steps: [
          "Principal: Enter the total home loan amount approved by your bank.",
          "Base Rate: Select a bank benchmark or enter the current NRB-mandated base rate.",
          "Premium: Input the fixed margin percentage quoted in your offer letter.",
          "Tenure: Set the duration (typically 15-20 years for Nepalese housing loans).",
          "Audit: Analyze the amortization table to see how interest drops over time."
        ]
      }}
      formula={{
        title: "The Mortgage Calculus (Reducing Balance)",
        description: "The official mathematical framework used by all A-class commercial banks in Nepal for Equated Monthly Installments.",
        raw: "$$EMI = [P \\times r \\times (1 + r)^n] / [(1 + r)^n - 1]$$",
        variables: [
          "P = Principal Loan Amount",
          "r = Monthly Interest Rate (Annual Rate / 12 / 100)",
          "n = Total Number of Months (Years × 12)"
        ]
      }}
      faqs={[
        { question: "What is the 'Base Rate' in Nepal?", answer: "The Base Rate is the minimum interest rate a bank can charge, reflecting their internal cost of funds. Banks are prohibited by NRB from lending below this rate." },
        { question: "What is the 'Premium' in my loan?", answer: "Premium is the negotiable profit margin the bank adds to the Base Rate. Once signed, it usually remains fixed even if the Base Rate changes." },
        { question: "How often does my home loan EMI change?", answer: "In Nepal, banks update their Base Rate every quarter. If the Base Rate changes, your loan tenure is usually adjusted first. If the tenure hits a cap, your EMI amount will increase." },
        { question: "What is the maximum tenure for a home loan?", answer: "Commercial banks in Nepal typically offer up to 20-25 years, provided the loan is settled before the borrower's retirement age (usually 65-70)." }
      ]}
      sidebar={{
        title: "Nepal Housing Hub",
        subtitle: "Real Estate Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Briefcase },
          { label: "Land Converter", href: "/calculator/nepal-land/", icon: Globe },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "NRB Official", href: "https://nrb.org.np", icon: Landmark },
        ],
      }}
      relatedTools={[
        { label: "Loan EMI Tool", href: "/calculator/loan-emi/" },
        { label: "Land Area Converter", href: "/calculator/nepal-land/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}

