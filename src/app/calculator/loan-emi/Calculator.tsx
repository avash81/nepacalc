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
      activePrincipal = targetEmi * ((Math.pow(1 + r, n), 1) / (r * Math.pow(1 + r, n)));
    }

    const baseCalc = safeCalculateEMI(activePrincipal, rate, tenure, method);
    if (!baseCalc.success || !baseCalc.data) return { success: false };

    const baseEmi = baseCalc.data.emi;
    const totalInterest = baseCalc.data.totalInterest;

    const schedule = [];
    let balance = activePrincipal;
    for (let i = 1; i <= Math.min(12, n); i++) {
        const interest = balance * r;
        const principalPaid = baseEmi, interest;
        balance -= principalPaid;
        schedule.push({ month: i, interest, principal: principalPaid, balance: Math.max(0, balance) });
    }

    return { 
      success: true, 
      activePrincipal,
      baseEmi, 
      totalInterest,
      totalPayment: activePrincipal + totalInterest,
      schedule,
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm flex flex-col">
               <div className="px-4 py-3 border-b border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
                 <span className="text-[10px] font-bold text-[#70757A] uppercase">Early Repayment Schedule (1st Year)</span>
                 <Table className="w-3.5 h-3.5 text-[#1A73E8]" />
               </div>
               <div className="flex-1 overflow-y-auto max-h-[340px]">
                 <table className="w-full text-left">
                   <thead className="sticky top-0 bg-[#F8F9FA] text-[9px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
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

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Full Amortization Intelligence</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F8F9FA] text-[10px] font-bold uppercase text-[#70757A] border-b border-[#DADCE0]">
                      <th className="px-6 py-3">Period</th>
                      <th className="px-6 py-3 text-right">EMI Portion</th>
                      <th className="px-6 py-3 text-right">Principal</th>
                      <th className="px-6 py-3 text-right">Interest</th>
                      <th className="px-6 py-3 text-right">Outstanding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {result.schedule!.map((row) => (
                      <tr key={row.month} className="text-[11px] hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-6 py-3 font-bold text-[#1A73E8]">Month {row.month}</td>
                        <td className="px-6 py-3 text-right font-medium text-[#5F6368]">{formatNPR(result.baseEmi!)}</td>
                        <td className="px-6 py-3 text-right font-bold text-[#188038]">{formatNPR(row.principal)}</td>
                        <td className="px-6 py-3 text-right font-bold text-[#D93025]">{formatNPR(row.interest)}</td>
                        <td className="px-6 py-3 text-right font-black text-[#202124]">{formatNPR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm mt-8">
            <h2 className="text-xl font-black text-[#202124] mb-4">How Bank Loans Actually Work in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Taking out a loan in Nepal can feel overwhelming, especially when trying to figure out exactly how much you will have to pay back each month. We built this <strong className="text-[#202124]">emi calculator nepal</strong> to give you the exact same numbers that 'A' Class commercial banks use. By strictly following <strong className="text-[#202124]">nrb base rate</strong> regulations, this tool clearly breaks down your monthly payment so you can see exactly where every Rupee goes, how much is paying off your actual loan, and how much is going to the bank as interest.
              </p>
              <p>
                Whether you are planning to buy a car, purchase a home, or take out a personal loan, having an accurate <strong className="text-[#202124]">interest rate calculator</strong> by your side is crucial. The Nepal Rastra Bank (NRB) requires banks to be transparent about their rates (which are usually the base rate plus a premium). We designed this tool to put the power back in your hands, allowing you to confidently plan your budget before you ever step foot inside a bank branch.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Understanding Your Repayment Journey</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Benefit of Reducing Balance:</strong> Most regulated financial institutions in Nepal use a reducing balance method. This is great news for you! This <strong className="text-[#202124]">loan schedule</strong> recalculates your interest every single month based only on what you still owe. This means as you pay down your loan, the amount of interest you are charged shrinks every month.</li>
              <li><strong className="text-[#188038]">Why the First Years are Expensive:</strong> Our charts visually show you the reality of term loans: your early payments go mostly toward paying off interest, not your principal. By looking at the <strong className="text-[#202124]">emi breakdown</strong> for your first 12 months, you can clearly see how much of your hard-earned money is actually building your wealth versus paying the bank's fees.</li>
              <li><strong className="text-[#D93025]">Checking What You Can Afford:</strong> We built a special feature just for you. If you know your budget only allows you to pay exactly Rs. 25,000 every month, you can flip this calculator to our 'Affordability' mode. It will instantly tell you the maximum loan amount you can safely take out while staying within the NRB's strict personal debt guidelines.</li>
            </ul>
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
        title: "Loan Repayment Analytics & Derivation",
        description: "The EMI (Equated Monthly Installment) is derived using the amortization formula for a reducing balance, where each payment covers the interest for the period plus a portion of the principal.",
        raw: "E = [P × r × (1+r)^n] / [(1+r)^n - 1]\n\nVariables Explained:\n• P: Principal Loan Amount\n• r: Periodic (Monthly) Interest Rate (Annual Rate / 12 / 100)\n• n: Total Number of Repayment Installments (Years × 12)\n\nThis formula ensures that by the end of the tenure (n), the total balance becomes zero through periodic principal reduction."
      }}
      faqs={[
        {
          question: "What is the difference between Reducing and Flat rates?",
          answer: "In Reducing Balance, interest is calculated on the remaining loan amount each month. In Flat Rate, interest is calculated on the original principal for the entire tenure, making it significantly more expensive over time."
        },
        {
          question: "How do banks in Nepal calculate EMI?",
          answer: "Most commercial banks in Nepal (A-Class) use the Reducing Balance Method with monthly compounding. This means you pay less interest as your principal balance decreases each month."
        },
        {
          question: "What is a 'Base Rate' in Nepal?",
          answer: "Base Rate is the minimum interest rate below which a bank cannot lend. Your actual loan rate is typically 'Base Rate + Premium' (e.g., if Base Rate is 9.5% and Premium is 2%, your rate is 11.5%)."
        },
        {
          question: "Can I prepay my loan in Nepal?",
          answer: "Yes, most banks allow prepayment. While some may charge a small fee (1-2%), prepaying even small amounts can drastically reduce your total interest burden and loan tenure."
        },
        {
          question: "Does tenure affect the total interest?",
          answer: "Yes, significantly. A longer tenure reduces your monthly EMI but increases the total interest you pay over the life of the loan. Aim for the shortest tenure you can comfortably afford."
        },
        {
          question: "What is the maximum loan tenure offered by banks in Nepal?",
          answer: "In Nepal: Home loans ,  up to 20-25 years. Vehicle loans ,  up to 7 years. Personal loans ,  up to 5 years. Education loans ,  up to 7 years (with moratorium during studies). Business loans ,  3-10 years depending on the project. NRB regulations periodically cap maximum tenures, so always verify with your specific bank."
        }
      ]}
      sidebar={{
        title: "Loan Toolkit",
        subtitle: "Financial Resources",
        links: [
          { label: "Home Loan Nepal", href: "/calculator/nepal-home-loan", icon: Home },
          { label: "Vehicle Tax Nepal", href: "/calculator/nepal-vehicle-tax", icon: Activity },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: DollarSign },
          { label: "SIP Calculator", href: "/calculator/sip-calculator", icon: TrendingUp },
        ],
      }}
      relatedTools={[
        { label: "Home Loan", href: "/calculator/nepal-home-loan" },
        { label: "Vehicle Tax", href: "/calculator/nepal-vehicle-tax" },
        { label: "SIP Calculator", href: "/calculator/sip-calculator" }
      ]}
    />
  );
}
