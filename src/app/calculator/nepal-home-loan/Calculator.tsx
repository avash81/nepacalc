'use client';
import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Landmark, TrendingDown, ShieldCheck, Info, Wallet, Zap, Scale, 
  Activity, Globe, History, Receipt, Target, PieChart, ArrowRight,
  Home, Building2, Briefcase, Calculator, ChevronRight
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

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

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
      { name: 'Principal', val: principal, fill: '#3b82f6' },
      { name: 'Interest', val: totalInterest, fill: '#ef4444' }
    ];

    // Simple amortization projection for chart
    const projectionData = Array.from({ length: 11 }, (_, i) => {
      const year = Math.round((tenureYears / 10) * i);
      const months = year * 12;
      const remainingBalance = principal * ((Math.pow(1 + r, n) - Math.pow(1 + r, months)) / (Math.pow(1 + r, n) - 1));
      return {
        year: `Yr ${year}`,
        balance: Math.round(remainingBalance),
        paid: Math.round(principal - remainingBalance)
      };
    });

    return { emi, totalPayment, totalInterest, pieData, projectionData };
  }, [principal, effectiveRate, tenureYears]);

  return (
    <ModernCalcLayout
      slug="nepal-home-loan"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Home Loan' }]}
      title="Nepal Home Loan"
      description="The authoritative mortgage auditing engine for Nepal. Calibrated to NRB 'Base Rate + Premium' models with cascading amortization and tax shield analytics."
      icon={Home}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Home className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Loan Principal (NPR)</label>
                   <input 
                      type="number" 
                      value={principal} 
                      onChange={(e) => update({ principal: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Base Rate (%)</label>
                      <input type="number" step="0.01" value={baseRate} onChange={e => update({ baseRate: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Premium (%)</label>
                      <input type="number" step="0.1" value={premium} onChange={e => update({ premium: Number(e.target.value) })} className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" />
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Tenure (Years)</label>
                   <div className="relative">
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        value={tenureYears} 
                        onChange={(e) => update({ tenureYears: Number(e.target.value) })}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <span>1 Year</span>
                         <span className="text-blue-400">{tenureYears} Years</span>
                         <span>30 Years</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2.5rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Landmark className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Commercial Benchmarks</h3>
             </div>
             <div className="divide-y divide-slate-100">
                {KTM_BANKS.map(bank => (
                  <button key={bank.name} onClick={() => update({ baseRate: bank.base })}
                    className="w-full py-4 flex justify-between items-center hover:bg-slate-50 transition-all group text-left rounded-2xl px-4">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <bank.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                       </div>
                       <div>
                          <div className="text-[11px] font-black text-slate-900 uppercase">{bank.name}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Prem: {bank.premium}%</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-black text-blue-600 font-mono group-hover:scale-110 transition-transform">{bank.base}%</div>
                       <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">Base Rate</div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Home className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Monthly Installment (EMI)</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(results.emi)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Estimated Monthly Commitment
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-rose-600 uppercase">Total Interest</div>
                <div className="text-xl font-black text-rose-600">{formatNPR(results.totalInterest)}</div>
             </div>
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Effective Rate</div>
                <div className="text-xl font-black text-slate-900">{(baseRate + premium).toFixed(2)}%</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><ShieldCheck className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Principal Retention</h4>
                   <p className="text-2xl font-black">{((principal / results.totalPayment) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(principal / results.totalPayment) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Interest Payload Audit</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={results.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {results.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Gross Repayment</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(results.totalPayment)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-5"><Activity className="w-64 h-64 text-[#1A73E8]" /></div>
               <h3 className="text-base font-black mb-6 tracking-tight text-[#202124] uppercase">Amortization Trajectory</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#70757A', fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #DADCE0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', color: '#202124', fontSize: '10px' }}
                         formatter={(v: number) => formatNPR(v)}
                      />
                      <Area type="monotone" dataKey="paid" stroke="#1A73E8" fillOpacity={1} fill="url(#colorPaid)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-6 text-[9px] text-[#70757A] leading-relaxed uppercase tracking-widest font-bold">
                  Visualizing equity growth (Principal Paid) over the loan tenure.
               </p>
            </div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Mortgage Governance Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for real estate financing in Nepal. Calibrated against Nepal Rastra Bank's 
                <strong> Base Rate + Premium</strong> framework, this tool provides a high-precision verification of 
                monthly installment burdens, effective interest yields, and overall debt trajectories for commercial housing loans.
             </p>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
             <div className="absolute -bottom-12 -right-12 opacity-5"><ShieldCheck className="w-64 h-64 text-[#1A73E8]" /></div>
             <h3 className="text-sm font-black mb-8 tracking-widest text-[#202124] uppercase">Integrity Guardrails</h3>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><Scale className="w-4 h-4 text-[#1A73E8]" /> Debt Service Ratio</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      Your total EMIs (including other loans) should ideally not exceed 50-60% of your verifiable monthly income to maintain financial health.
                   </p>
                </div>
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><Receipt className="w-4 h-4 text-[#1A73E8]" /> Prepayment Penalty</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      NRB allows banks to charge a prepayment fee if you settle the loan within 2 years. After 2 years, many banks offer zero-cost prepayment.
                   </p>
                </div>
                <div className="p-5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                   <h4 className="text-[11px] font-bold flex items-center gap-2 text-[#70757A] uppercase tracking-wider mb-2"><ShieldCheck className="w-4 h-4 text-[#188038]" /> Tax Shield</h4>
                   <p className="text-[10px] text-[#5F6368] leading-relaxed font-medium">
                      While limited, certain corporate professionals can claim interest expenses if the property is used as a registered home-office or rental asset.
                   </p>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Principal: Enter the total loan amount requested from the bank.",
          "Benchmarks: Select a bank from our 'Commercial Benchmarks' to auto-populate the latest Base Rate.",
          "Premium: Input the premium percentage quoted in your loan offer letter.",
          "Tenure: Use the slider to adjust the repayment duration (up to 30 years).",
          "Audit: Review the 'Interest Payload' pie chart to see how much of your total payment is interest."
        ]
      }}
      formula={{
        title: "The Standard Reducing-Balance Calculus",
        description: "Standard mathematical model for EMI calculation in the Nepalese banking sector.",
        raw: "$$EMI = [P \\times r \\times (1 + r)^n] / [(1 + r)^n - 1]$$",
        latex: "EMI = (Principal x Rate x (1+Rate)^n) / ((1+Rate)^n - 1)"
      }}
      faqs={[
        { question: "What is the 'Base Rate' in Nepal?", answer: "It is the minimum interest rate mandated by NRB, reflecting the bank's cost of funds. Banks cannot lend below this rate." },
        { question: "How much down payment do I need in Kathmandu?", answer: "For residential loans, you generally need a 40-50% down payment as the LTV ratio is capped at 50-60% by NRB." },
        { question: "Can I switch banks for a lower interest rate?", answer: "Yes, this is called a 'Loan Swap'. However, you must account for the new bank's processing fees and your current bank's swap charges." },
        { question: "Does this include the processing fee?", answer: "This calculator focuses on EMI and Interest. Processing fees (usually 0.75%) are one-time costs paid during loan approval." },
        { question: "Is home loan interest tax-deductible in Nepal?", answer: "For general salaried individuals, it is not directly deductible. However, it can be adjusted if the property generates rental income." },
        { question: "What is the maximum tenure for a home loan?", answer: "Most commercial banks in Nepal offer a maximum tenure of 20 to 30 years, subject to the borrower's retirement age." },
        { question: "What is 'Premium' in a housing loan?", answer: "Premium is the fixed profit margin the bank adds to the Base Rate. It is the only negotiable part of your interest rate." },
        { question: "How often does the Base Rate change?", answer: "Banks are required to update and publish their Base Rates every quarter (every 3 months)." },
        { question: "What is distress value in property valuation?", answer: "It is the value the bank expects to receive if the property is sold quickly in an auction, usually 15-20% lower than market value." },
        { question: "Can I take a loan for land purchase only?", answer: "Yes, but NRB often classifies 'Land Purchase' as a higher risk, potentially leading to lower LTV ratios compared to home construction." },
        { question: "What is the age limit for home loans?", answer: "Typically, the loan tenure must end before the borrower reaches 65-70 years of age." },
        { question: "Do I need a guarantor for a home loan?", answer: "Yes, most banks in Nepal require at least one personal guarantor (usually a family member) for the loan." },
        { question: "What is an 'Offer Letter'?", answer: "It is a formal document from the bank stating the approved loan amount, interest rate, premium, and all associated terms." },
        { question: "Is insurance mandatory for home loans?", answer: "Yes, comprehensive property insurance is mandatory to protect the bank's collateral against natural disasters." },
        { question: "Can I pay extra every month to reduce my principal?", answer: "Yes, many banks allow 'Accelerated Repayment'. Always check if there are caps on extra payments per year." },
        { question: "What documents are required for a home loan?", answer: "Standard docs include Lalpurja, Blueprints, Tax Clearance, Salary Certificates, and Property Valuation reports." },
        { question: "What is the 'CIC' report?", answer: "It is the Credit Information Center report that banks use to check your previous loan repayment history and creditworthiness." },
        { question: "Can NRB change the LTV ratio?", answer: "Yes, NRB adjusts the LTV ratio periodically through the Monetary Policy to control real estate bubbles." },
        { question: "Who pays for the valuation engineer?", answer: "The borrower is responsible for paying the valuation fees directly to the bank-assigned engineer." },
        { question: "Is this tool updated for 2081/82?", answer: "Yes, it follows the latest NRB directives and commercial bank base rate standards for the current fiscal year." }
      ]}
      sidebar={{
        title: "Finance Hub",
        subtitle: "Nepal Mortgages",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary", icon: Briefcase },
          { label: "Land Converter", href: "/calculator/nepal-land", icon: Globe },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: Wallet },
          { label: "NRB Official", href: "https://nrb.org.np", icon: Landmark },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary" },
        { label: "Land Converter", href: "/calculator/nepal-land" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
