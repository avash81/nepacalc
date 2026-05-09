'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, FileText, CheckCircle2, Info, Receipt, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, TrendingUp, Wallet } from 'lucide-react';
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
        { name: 'Net Payout', val: netAmount, fill: '#10b981' },
        { name: 'TDS Withheld', val: tdsAmount, fill: '#ef4444' }
      ]
    };
  }, [amount, selectedRate]);

  return (
    <ModernCalcLayout
      slug="nepal-tds"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS"
      description="The definitive Tax Deducted at Source (TDS) engine for Nepal. Calibrated to the Income Tax Act 2058 with real-time VAT-conditional logic."
      icon={Landmark}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Payment Category</label>
                   <div className="grid grid-cols-2 gap-2">
                    {Object.entries(TDS_RATES).map(([id, info]) => (
                      <button
                        key={id}
                        onClick={() => updateState({ source: id })}
                        className={`px-3 py-3 rounded-xl border text-left transition-all ${source === id ? 'bg-[#1a73e8] border-blue-600 text-[#202124] shadow-sm' : 'bg-[#f8f9fa] border-[#dadce0] text-slate-400 hover:bg-white/10'}`}
                      >
                        <div className="text-[10px] font-black uppercase truncate">{info.label}</div>
                        <div className="text-[9px] font-bold opacity-60">{(info.rate * 100).toFixed(1)}% Base</div>
                      </button>
                    ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Gross Payment (NPR)</label>
                   <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => updateState({ amount: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Scale className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tax Status Modifiers</h3>
             </div>
             {TDS_RATES[source]?.isService && (
               <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <input 
                     type="checkbox" 
                     id="vat_reg_tds" 
                     checked={isVatRegistered} 
                     onChange={e => updateState({ isVatRegistered: e.target.checked })}
                     className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <label htmlFor="vat_reg_tds" className="text-[11px] font-black text-slate-700 uppercase leading-none cursor-pointer">Receiver is VAT Registered (1.5% Rate)</label>
               </div>
             )}
             <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed italic">
                Rule: {source === 'rent' ? "Municipal rent tax (10%) applies for corporate leases." : "Service TDS drops from 15% to 1.5% only with a valid VAT invoice."}
             </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark className="w-24 h-24 text-rose-600" /></div>
             <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.2em]">TDS Withholding Amount</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.tdsAmount)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Deposit to IRD via E-TDS
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Net to Party</div>
                <div className="text-xl font-black text-emerald-600">{formatNPR(result.netAmount)}</div>
             </div>
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Effective Rate</div>
                <div className="text-xl font-black text-slate-900">{result.rate}%</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Receipt className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Payout Integrity</h4>
                   <p className="text-2xl font-black">{((result.netAmount / amount) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(result.netAmount / amount) * 100}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Withholding Distribution</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Gross Pmt</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(amount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Rate Comparison Matrix</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(TDS_RATES).map(([id, info]) => ({ name: info.label.split(' ')[0], rate: info.rate * 100 }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                      />
                      <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-6 text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                  Visualizing statutory TDS rates across different payment buckets.
               </p>
            </div>
          </div>

          {/* TDS Encyclopedia - content body */}
          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The TDS Encyclopedia: Nepal’s Withholding Architecture</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Tax Deducted at Source (TDS) is a fundamental pillar of <strong>Nepal’s Income Tax Act, 2058</strong>. It serves as a mechanism for the government to collect revenue at the very point where income is generated. For businesses and institutions, acting as a "Withholding Agent" is a mandatory legal obligation. Our <strong>Institutional TDS Engine</strong> is calibrated to the latest <strong>Finance Act</strong> schedules for <strong>2081/82</strong>.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Resident vs Non-Resident Dynamics</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Most rates in this tool apply to <strong>Resident</strong> entities. Payments to non-residents (foreign companies without a permanent establishment in Nepal) are subject to a flat 25% TDS unless a double taxation avoidance agreement (DTAA) provides a lower rate.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Categorical Withholding: Rent, Service, and Interest</h3>
              <p>
                The rate of TDS is entirely dependent on the nature of the transaction. Classifying a payment incorrectly can lead to significant audit liabilities with the <strong>Inland Revenue Department (IRD)</strong>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">House Rent (10%)</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Mandatory for all corporate leases. Payments to individual landlords for business premises must withhold 10% which is then deposited to the local municipality or IRD.
                    </p>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Professional Services (1.5% / 15%)</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Consultancy and technical services face a binary choice: 1.5% if the provider is VAT-registered, or 15% if they are PAN-registered individuals or firms.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Final Withholding vs Advance Tax</h3>
              <p>
                Understanding the "Finality" of tax is crucial. Deductions like 5% on <strong>Dividends</strong> or <strong>Bank Interest</strong> are generally "Final Withholding," meaning the recipient has no further income tax liability on that specific income. Conversely, the 1.5% or 15% on consultancy is "Advance Tax," where the recipient can adjust the withheld amount against their final year-end tax bill.
              </p>
            </div>
          </section>

          {/* Withholding Integrity Guardrails - content body */}
          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-emerald-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-emerald-400 uppercase tracking-widest">Withholding Integrity Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Scale className="w-5 h-5" /> Periodic Filing</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Withheld amounts must be deposited to the IRD within 25 days of the following Nepalese month via the E-TDS portal.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Receipt className="w-5 h-5" /> PAN Verification</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Always verify the recipient's PAN before issuing payment. Payments above NPR 2,000 without a PAN are technically non-deductible for the payer.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> Audit Trails</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Keep E-TDS certificates and bank deposit slips for 6 years. These are the primary proof of compliance during IRD field audits.
                   </p>
                </div>
             </div>
          </section>
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
        raw: "$$TDS = Gross \\times Rate_{statutory}$$",
        latex: "Net = Gross - (Gross x Rate)"
      }}
      faqs={[
        { question: "What is the TDS rate for house rent in Nepal?", answer: "The current rate for house and land rent is 10%, applicable for corporate and business tenants." },
        { question: "When do I use 1.5% TDS for services?", answer: "Use 1.5% only when the service provider is VAT-registered and provides a valid VAT invoice. Otherwise, use 15%." },
        { question: "Is TDS calculated on the VAT amount?", answer: "No. TDS is always calculated strictly on the gross base amount before 13% VAT is added." },
        { question: "What is the TDS on bank interest?", answer: "For resident individuals, banks deduct a final withholding tax of 5% on interest earned from savings and fixed deposits." },
        { question: "What is the penalty for not depositing TDS on time?", answer: "Late deposits face a 15% per annum interest charge plus potential penalties from the IRD." },
        { question: "Do I need to deduct TDS on payments to individuals?", answer: "Yes, if you are a business or institution, you must deduct TDS even when paying individuals for services or rent." },
        { question: "What is the deadline for depositing TDS?", answer: "Withheld TDS must be deposited within 25 days of the following Nepalese month." },
        { question: "What is the TDS rate on dividends?", answer: "Dividends from listed companies in Nepal are subject to a final withholding tax of 5%." },
        { question: "Do IT freelancers have to pay TDS?", answer: "Banks deduct 5% TDS at the source for foreign currency payments received for service exports." },
        { question: "Can I get a refund of the TDS deducted from my payment?", answer: "If the TDS is 'Advance Tax' (like 1.5% or 15%), you can claim it as a credit against your final income tax. If it is 'Final Withholding,' it cannot be refunded." },
        { question: "What is an E-TDS certificate?", answer: "It is an electronic certificate generated from the IRD portal proving that tax was withheld and deposited against your PAN." },
        { question: "What is the TDS rate on meeting fees?", answer: "Meeting fees (Bharta) are subject to a flat 15% TDS in Nepal." },
        { question: "Is there TDS on vehicle rentals?", answer: "Yes, vehicle rentals are generally subject to 10% TDS, similar to house rent." },
        { question: "What is the TDS on consultancy for a non-resident?", answer: "Payments to non-residents for consultancy are generally subject to a 25% withholding tax unless a DTAA applies." },
        { question: "Do I need a PAN to receive payments in Nepal?", answer: "Yes, the government has made it mandatory to provide a PAN for any payment exceeding NPR 2,000 for service or rent." },
        { question: "How often do TDS rates change?", answer: "Rates are reviewed every year during the national budget announcement (Finance Act) in Jestha (May/June)." },
        { question: "What is the TDS on insurance commissions?", answer: "Insurance commissions are subject to 15% TDS in Nepal." },
        { question: "Can I deduct my business expenses from the TDS base?", answer: "No. TDS is calculated on the gross amount. You account for your expenses during your year-end income tax filing." },
        { question: "Who is responsible for paying TDS, the buyer or the seller?", answer: "The buyer (payer) is responsible for deducting the tax and depositing it to the government on behalf of the seller (receiver)." },
        { question: "Is this tool calibrated to the 2081/82 budget?", answer: "Yes, all rates are updated to reflect the latest Finance Act 2081 standards." }
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
