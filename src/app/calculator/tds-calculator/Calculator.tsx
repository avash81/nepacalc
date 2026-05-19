'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Receipt, Wallet, Gavel, Info, ShieldCheck, Activity, PieChart, TrendingUp } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';

const TDS_CATEGORIES = [
  { id: 'professional', label: 'Professional/Consultancy', rate: 15, desc: 'Technical services and consultancy' },
  { id: 'rent', label: 'House/Land Rent', rate: 10, desc: 'Rental payments for property' },
  { id: 'interest', label: 'Interest (BFI)', rate: 5, desc: 'Interest on savings and FD' },
  { id: 'meeting', label: 'Meeting Fees', rate: 15, desc: 'Allowances and meeting fees' },
  { id: 'commission', label: 'Commission', rate: 15, desc: 'Standard business commissions' },
  { id: 'windfall', label: 'Windfall Gain', rate: 25, desc: 'Lottery, prizes, and awards' }
];

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function TDSCalculator() {
  const [state, setState] = useSyncState('tds_v1', {
    amount: 100000,
    categoryId: 'professional'
  });
  const { amount, categoryId } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const category = TDS_CATEGORIES.find(c => c.id === categoryId) || TDS_CATEGORIES[0];

  const result = useMemo(() => {
    const tdsAmount = amount * (category.rate / 100);
    const netAmount = amount - tdsAmount;

    const pieData = [
      { name: 'Net Amount', value: netAmount },
      { name: 'TDS (Tax)', value: tdsAmount }
    ];

    return {
      tdsAmount,
      netAmount,
      pieData
    };
  }, [amount, category]);

  return (
    <ModernCalcLayout
      slug="tds-calculator"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS Calculator 2083/84"
      description="Calculate Tax Deducted at Source (TDS) for various service categories in Nepal as per IRD standards for FY 2083/84."
      icon={Receipt}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Payment Amount (NPR)</label>
               <input 
                 type="number" 
                 value={amount} 
                 onChange={e => update({ amount: Number(e.target.value) })} 
                 className="w-full h-14 px-6 bg-white border border-[#DADCE0] rounded-xl text-xl font-black text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">TDS Category (IRD Standards)</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TDS_CATEGORIES.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => update({ categoryId: c.id })}
                      className={`p-4 rounded-md border text-left transition-all ${categoryId === c.id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                    >
                       <div className="flex justify-between items-center mb-1">
                          <span className={`text-[10px] font-black uppercase ${categoryId === c.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{c.label}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${categoryId === c.id ? 'bg-[#1A73E8] text-white' : 'bg-[#F8F9FA] text-[#5F6368] border border-[#DADCE0]'}`}>{c.rate}%</span>
                       </div>
                       <p className={`text-[9px] font-bold uppercase ${categoryId === c.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{c.desc}</p>
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
               <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
               <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Compliance: These rates are based on the latest Inland Revenue Department (IRD) directives for FY 2083/84.
               </p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">TDS Amount to Deduct</div>
             <div className="text-4xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.tdsAmount)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase border border-[#DADCE0] text-[#5F6368] shadow-sm">
                   {category.rate}% of {formatNPR(amount)}
                </span>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-[#202124]" />
                <span className="text-[10px] font-black text-[#202124] uppercase tracking-wider">Net Payment Summary</span>
             </div>
             <div className="p-6 text-center space-y-2">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Amount After TDS (Net)</div>
                <div className="text-3xl font-black text-[#188038]">{formatNPR(result.netAmount)}</div>
                <p className="text-[9px] text-[#5F6368] font-bold uppercase tracking-widest mt-2">Ready for Disbursement</p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Tax Architecture</h3>
                </div>
                <div className="h-[240px] w-full relative mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={result.pieData}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#188038" />
                        <Cell fill="#1A73E8" />
                      </Pie>
                      <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                     <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Total</span>
                     <span className="text-lg font-black text-[#202124]">{formatNPR(amount)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]"></div> Net Pay</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1A73E8]"></div> TDS</div>
                </div>
             </div>

             <div className="bg-[#1A1A2E] text-white rounded-lg p-10 shadow-sm flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Gavel className="w-40 h-40" /></div>
                <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-blue-400">Legal Provisions</h3>
                <div className="space-y-4 relative z-10">
                   <div className="p-4 rounded-md bg-white/5 border border-white/10">
                      <h4 className="text-[10px] font-black uppercase text-blue-400 mb-1">Mandatory Deduction</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                         Under the Income Tax Act of Nepal, the person or organization responsible for payment must deduct tax at source and deposit it into the government revenue account within 25 days of the following month.
                      </p>
                   </div>
                   <div className="p-4 rounded-md bg-white/5 border border-white/10">
                      <h4 className="text-[10px] font-black uppercase text-blue-400 mb-1">E-TDS Filings</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                         Deducted amounts must be updated on the IRD portal via E-TDS. This ensures the recipient gets credit for the tax paid when filing their annual income tax returns.
                      </p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the Gross Amount (total agreed payment before any deductions).",
          "Select the appropriate TDS category based on the nature of the service or payment.",
          "Check the system-applied TDS percentage (e.g., 15% for consulting, 10% for rent).",
          "Review the 'TDS Amount to Deduct' which must be paid to the government.",
          "The 'Net Amount' is what should be paid to the service provider or individual."
        ]
      }}
      formula={{
        title: "TDS Computation",
        description: "Tax Deducted at Source (TDS) is a withholding tax applied at the point of origin of income.",
        raw: "TDS = Gross Payment × (TDS Rate / 100)",
        variables: [
          "Gross Payment: Total amount before any tax or other deductions",
          "TDS Rate: Varies by category as mandated by the Income Tax Act"
        ]
      }}
      faqs={[
        { question: "What is the TDS rate for rent in Nepal?", answer: "Currently, the TDS rate for house or land rent is 10%. This must be deposited into the local government's revenue account." },
        { question: "Is TDS required for payments under 5,000?", answer: "For certain categories like consultancy, if the total payment to a single person does not exceed Rs. 5,000 in a year, TDS might not be mandatory, but it's best practice to verify with current IRD circulars." },
        { question: "How do I get a TDS certificate?", answer: "Organizations must provide a 'Tax Deduction Certificate' or ensure the amount is visible on your IRD PAN ledger through E-TDS filing." }
      ]}
      sidebar={{
        title: "Tax Hub",
        links: [
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Receipt },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/", icon: Gavel },
          { label: "Salary Tool", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "CGT Tool", href: "/calculator/property-tax/", icon: ShieldCheck },
        ],
      }}
      relatedTools={[
        { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" }
      ]}
    />
  );
}
