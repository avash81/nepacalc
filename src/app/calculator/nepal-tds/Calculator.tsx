'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, FileText, CheckCircle2, Info, Receipt, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const DEFAULT_STATE = {
  source: 'rent',
  amount: 50000,
  isVatRegistered: false,
};

const TDS_RATES: Record<string, { rate: number; label: string; isService?: boolean }> = {
  rent: { rate: 0.10, label: 'House/Land Rent' },
  consultancy: { rate: 0.15, label: 'Consultancy Service', isService: true },
  interest: { rate: 0.05, label: 'Interest Payment' },
  commission: { rate: 0.15, label: 'Commission', isService: true },
  meeting: { rate: 0.15, label: 'Meeting Fees' },
  dividend: { rate: 0.05, label: 'Dividend' },
  brokerage: { rate: 0.15, label: 'Brokerage', isService: true },
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalTdsCalculator() {
  const [state, setState] = useSyncState('nepal_tds_v5', DEFAULT_STATE);
  const { source, amount, isVatRegistered } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const selectedRate = isVatRegistered && TDS_RATES[source]?.isService ? 0.015 : TDS_RATES[source]?.rate || 0.15;

  const result = useMemo(() => {
    const tdsAmount = amount * selectedRate;
    const netAmount = amount - tdsAmount;
    return { 
      tdsAmount, 
      netAmount, 
      rate: selectedRate * 100,
      chartData: [
        { name: 'Net Payout', val: netAmount, fill: '#188038' },
        { name: 'TDS Withheld', val: tdsAmount, fill: '#D93025' }
      ]
    };
  }, [amount, selectedRate]);

  return (
    <ModernCalcLayout
      slug="nepal-tds"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS"
      description="The definitive Tax Deducted at Source (TDS) engine for Nepal. Calibrated to the Income Tax Act 2058 with real-time VAT-conditional logic."
      icon={Landmark}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Category</label>
               <div className="grid grid-cols-2 gap-3">
                {Object.entries(TDS_RATES).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => updateState({ source: id })}
                    className={`h-auto min-h-[44px] py-2 px-3 rounded-md border flex flex-col items-start justify-center transition-all ${source === id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                  >
                    <div className={`text-[11px] font-black uppercase truncate w-full text-left ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{info.label}</div>
                    <div className={`text-[9px] font-bold ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'} opacity-80`}>{(info.rate * 100).toFixed(1)}% Base</div>
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Payment (NPR)</label>
               <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => updateState({ amount: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
            </div>

            {TDS_RATES[source]?.isService && (
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Status Modifiers</label>
                 <div 
                    onClick={() => updateState({ isVatRegistered: !isVatRegistered })}
                    className={`cursor-pointer border rounded-md p-4 transition-all flex items-start gap-3 ${isVatRegistered ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:border-[#1A73E8]'}`}
                 >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${isVatRegistered ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                       {isVatRegistered && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                       <div className={`text-xs font-bold uppercase tracking-wider ${isVatRegistered ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>Receiver is VAT Registered</div>
                       <div className="text-[10px] text-[#5F6368] mt-1 leading-relaxed">Reduces service TDS rate from 15% to 1.5%. Requires a valid VAT invoice.</div>
                    </div>
                 </div>
              </div>
            )}

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Rule: {source === 'rent' ? "Municipal rent tax (10%) applies for corporate leases." : TDS_RATES[source]?.isService ? "Service TDS drops from 15% to 1.5% only with a valid VAT invoice." : "Fixed percentage final withholding."}
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate TDS Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">TDS Withholding Amount</div>
             <div className="text-5xl font-black text-[#D93025] font-mono tracking-tight">{formatNPR(result.tdsAmount)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#D93025] uppercase border border-[#FCE8E6] shadow-sm">
                   Deposit to IRD via E-TDS
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Net to Party</div>
                <div className="text-lg font-black text-[#188038] font-mono">{formatNPR(result.netAmount)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-[#F8F9FA]">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Effective Rate</div>
                <div className="text-lg font-black text-[#202124] font-mono">{result.rate}%</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Payout Integrity</span>
                <span className="text-[11px] font-black text-[#188038]">{((result.netAmount / amount) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: `${(result.netAmount / amount) * 100}%` }} />
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Withholding Distribution</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.chartData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="val" stroke="none"
                     >
                       {result.chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Pmt</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(amount)}</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#188038]"></div> Net Payout</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> TDS Withheld</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Rate Comparison Matrix</h3>
               </div>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(TDS_RATES).map(([id, info]) => ({ name: info.label.split(' ')[0], rate: info.rate * 100 }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#5F6368', fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#202124', border: 'none', color: '#fff', fontSize: '10px', borderRadius: '4px' }}
                         cursor={{fill: '#F8F9FA'}}
                      />
                      <Bar dataKey="rate" fill="#1A73E8" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-4 text-[9px] text-[#5F6368] leading-relaxed uppercase tracking-widest font-black text-center">
                  Visualizing statutory TDS rates across different payment buckets.
               </p>
             </div>
           </div>
           
           <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] tracking-tight uppercase border-b border-[#F1F3F4] pb-4 mb-6">Withholding Integrity Guardrails</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#188038] uppercase"><Scale className="w-4 h-4" /> Periodic Filing</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       Withheld amounts must be deposited to the IRD within 25 days of the following Nepalese month via the E-TDS portal.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#D93025] uppercase"><Receipt className="w-4 h-4" /> PAN Verification</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       Verify the recipient's PAN before issuing payment. Payments above NPR 2,000 without a PAN are technically non-deductible for the payer.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-[11px] font-black flex items-center gap-2 text-[#1A73E8] uppercase"><ShieldCheck className="w-4 h-4" /> Audit Trails</h4>
                    <p className="text-[11px] text-[#5F6368] leading-relaxed">
                       Keep E-TDS certificates and bank deposit slips for 6 years. These are primary proof of compliance during IRD field audits.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Category selection: Choose the nature of the payment (Rent, Dividend, Consultancy, etc.).",
          "Gross Amount: Input the total payment amount before any tax deductions.",
          "VAT Toggle: If paying for services, check if the provider is VAT-registered to apply the 1.5% rate.",
          "Results Audit: Review the TDS Withheld amount and the Net Payout for the party.",
          "Compliance: Deposit the withheld tax to the IRD using the recipient's PAN."
        ]
      }}
      formula={{
        title: "The Withholding Axiom",
        description: "Statutory algorithm for point-of-source taxation in Nepal.",
        raw: "TDS = Gross × Rate_statutory",
        variables: [
          "Net Payout = Gross - TDS",
          "Rent: 10% on gross rent",
          "Service: 15% (PAN only) or 1.5% (with VAT invoice)"
        ]
      }}
      faqs={[
        { question: "What is the TDS rate for house rent in Nepal?", answer: "The current rate for house and land rent is 10%, applicable for corporate and business tenants." },
        { question: "When do I use 1.5% TDS for services?", answer: "Use 1.5% only when the service provider is VAT-registered and provides a valid VAT invoice. Otherwise, use 15%." },
        { question: "Is TDS calculated on the VAT amount?", answer: "No. TDS is always calculated strictly on the gross base amount before 13% VAT is added." },
        { question: "What is the TDS on bank interest?", answer: "For resident individuals, banks deduct a final withholding tax of 5% on interest earned from savings and fixed deposits." },
        { question: "What is the penalty for not depositing TDS on time?", answer: "Late deposits face a 15% per annum interest charge plus potential penalties from the IRD." },
        { question: "Do I need to deduct TDS on payments to individuals?", answer: "Yes, if you are a business or institution, you must deduct TDS even when paying individuals for services or rent." },
        { question: "What is the deadline for depositing TDS?", answer: "Withheld TDS must be deposited within 25 days of the following Nepalese month." },
        { question: "What is the TDS rate on dividends?", answer: "Dividends from listed companies in Nepal are subject to a final withholding tax of 5%." }
      ]}
      sidebar={{
        title: "Tax Hub",
        subtitle: "Compliance & Strategy",
        links: [
          { label: "VAT Calculator", href: "/calculator/nepal-vat/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Activity },
          { label: "IRD Portal", href: "https://ird.gov.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

