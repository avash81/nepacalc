'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, Landmark, PieChart, Info, Calendar, Target, Calculator, Activity, Zap, ShieldCheck, Globe, Scale, ArrowRight, Wallet, History, ChevronRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function fmt(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

const TIME_PRESETS = [
  { label: '1 Year', value: 1 },
  { label: '2 Years', value: 2 },
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
];

export default function SimpleInterestCalculator() {
  const [state, setState] = useSyncState('simple_interest_v4', {
    principal: 100000,
    rate: 10,
    time: 1
  });
  const { principal, rate, time } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const interest = (principal * time * rate) / 100;
    const total = principal + interest;
    
    // Comparison data: Simple vs Compound (Annually)
    const comparisonData = Array.from({ length: Math.min(time, 10) }, (_, i) => {
      const yr = i + 1;
      const simpleBal = principal + (principal * yr * rate) / 100;
      const compoundBal = principal * Math.pow(1 + rate / 100, yr);
      return {
        year: `Year ${yr}`,
        simple: Math.round(simpleBal),
        compound: Math.round(compoundBal),
        gap: Math.round(compoundBal - simpleBal)
      };
    });

    return { interest, total, comparisonData };
  }, [principal, time, rate]);

  return (
    <ModernCalcLayout
      slug="simple-interest"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Financial', href: '/financial/' }, { label: 'Simple Interest' }]}
      title="Simple Interest"
      description="The authoritative engine for linear interest calculations. Audit 'Tamasuk' informal lending, Sahakari credit lines, and standard P×R×T financial products with institutional precision."
      icon={TrendingUp}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Principal Capital (NPR)</label>
                   <input 
                      type="number" 
                      value={principal} 
                      onChange={(e) => update({ principal: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Annual Rate (%)</label>
                      <input 
                         type="number" 
                         step="0.1"
                         value={rate} 
                         onChange={(e) => update({ rate: Number(e.target.value) })}
                         className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Time (Years)</label>
                      <input 
                         type="number" 
                         value={time} 
                         onChange={(e) => update({ time: Number(e.target.value) })}
                         className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white focus:border-blue-500 outline-none transition-all" 
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><Calendar className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quick Period Audit</h3>
             </div>
             <div className="grid grid-cols-2 gap-2">
                {TIME_PRESETS.map(p => (
                  <button 
                    key={p.value} 
                    onClick={() => update({ time: p.value })}
                    className={`py-3 text-[10px] font-black uppercase border rounded-xl transition-all ${time === p.value ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}
                  >
                    {p.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Activity className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Total Maturity Value</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{fmt(result.total)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Linear Projection after {time} Years
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Principal Seed</div>
                <div className="text-xl font-black text-slate-900">{fmt(principal)}</div>
             </div>
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-1">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Interest Gained</div>
                <div className="text-xl font-black text-emerald-600">+ {fmt(result.interest)}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><TrendingUp className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Growth Yield</h4>
                   <p className="text-2xl font-black">{((result.interest / principal) * 100).toFixed(1)}%</p>
                </div>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (result.interest / principal) * 100)}%` }} />
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><BarChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Simple vs Compound Gap</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <Tooltip 
                      formatter={(v: number) => fmt(v)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="simple" name="Simple" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="compound" name="Compound" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-400 italic mt-4 text-center font-bold">
                Visualizing the widening 'Opportunity Gap' if interest is not reinvested.
              </p>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><PieChart className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Asset Composition</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Initial Principal', value: principal },
                          { name: 'Interest Component', value: result.interest }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={10}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#FFFFFF33" />
                        <Cell fill="#34D399" />
                      </Pie>
                      <Tooltip 
                         formatter={(v: number) => fmt(v)}
                         contentStyle={{ borderRadius: '12px', backgroundColor: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
               </div>
               <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-medium">Principal Core</span>
                     <span className="font-black text-slate-200">{((principal / result.total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-emerald-400 font-medium italic">Interest Accumulation</span>
                     <span className="font-black text-emerald-400">{((result.interest / result.total) * 100).toFixed(1)}%</span>
                  </div>
               </div>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Simple Interest Encyclopedia: Linear Debt Dynamics</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Simple Interest is the most fundamental mechanism of financial calculation, characterized by its <strong>linear growth</strong> trajectory. Unlike compounding models where interest earns interest, simple interest (SI) remains calculated solely on the original principal. This engine utilizes the standard high-precision formula <strong>(P × R × T) / 100</strong> to provide institutional audits for informal and short-term credit facilities in Nepal.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Informal Lending (Tamasuk) Audits</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      In Nepal, informal lending arrangements between individuals often use "Sawa" (Principal) and "Byaj" (Interest) logic based on simple interest. This tool serves as a professional-grade "Byaj Calculator" to verify Tamasuk agreements, ensuring that interest rates do not exceed legal caps set by the <strong>National Civil Code (Muluki Ain)</strong>.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Linear Growth vs. Exponential Opportunity</h3>
              <p>
                In a linear model, the interest gained in Year 1 is identical to the interest gained in Year 20. This makes it highly predictable for short-term bridging loans. However, for long-term wealth preservation, simple interest creates a significant "Opportunity Gap"—the difference between linear growth and the exponential curve of compounding.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">SI Use Cases</h4>
                    <div className="text-[10px] space-y-2 text-slate-500 font-bold uppercase">
                       <div className="flex justify-between border-b pb-1"><span>Short-term Credit</span><span>Linear</span></div>
                       <div className="flex justify-between border-b pb-1"><span>Pawnshop Loans</span><span>Static</span></div>
                       <div className="flex justify-between border-b pb-1"><span>CDC Nepal Curriculum</span><span>Academic</span></div>
                    </div>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Institutional Thresholds</h4>
                    <div className="text-[10px] space-y-2 text-slate-500 font-bold uppercase">
                       <div className="flex justify-between border-b pb-1"><span>Legal Cap (Muluki Ain)</span><span>10% (Informal)</span></div>
                       <div className="flex justify-between border-b pb-1"><span>Sahakari Interest</span><span>Varies</span></div>
                       <div className="flex justify-between border-b pb-1"><span>Penalty Interest</span><span>Flat</span></div>
                    </div>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. The Muluki Ain & Interest Regulation</h3>
              <p>
                According to the <strong>National Civil (Code) Act 2074</strong> of Nepal, the maximum interest rate that can be charged on informal personal loans is capped at 10% per annum. Any agreement charging above this rate is technically non-enforceable in a court of law. This calculator helps citizens audit their loan agreements against these regulatory standards.
              </p>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-blue-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-blue-400 uppercase tracking-widest">Informal Credit Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-blue-400"><ShieldCheck className="w-5 h-5" /> Legal Enforceability</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Ensure your Tamasuk mentions the exact interest rate. If no rate is mentioned, Nepalese law often assumes a default simple interest rate for court proceedings.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-blue-400"><History className="w-5 h-5" /> Interest Payouts</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Simple interest is ideal for retirees or bond-holders who need a fixed "Byaj" payout every period to cover living expenses without affecting the principal.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-blue-400"><Wallet className="w-5 h-5" /> TDS Verification</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Interest from banks is subject to 5% TDS. For informal loans, ensure you calculate the 'Net Payout' after any agreed-upon local tax or service fee.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Enter Principal: The initial loan or deposit amount (Sawa).",
          "Input Rate: The annual interest percentage (%) agreed upon.",
          "Set Time: The duration in years. For months, use (months/12).",
          "Analyze Growth: Review the total maturity value and compare it against compounding alternatives.",
          "Audit Agreement: Use the results to verify 'Tamasuk' or Sahakari loan documents."
        ]
      }}
      formula={{
        title: "The Linear Interest Axiom",
        description: "The mathematical standard for non-compounding growth.",
        raw: "$$I = \frac{P \cdot R \cdot T}{100}$$",
        latex: "I = (P x R x T) / 100"
      }}
      faqs={[
        { question: "What is the legal interest cap on informal loans in Nepal?", answer: "According to the National Civil Code (Muluki Ain), the interest rate on informal personal loans is capped at 10% per annum." },
        { question: "Is simple interest better than compound interest?", answer: "For a borrower, simple interest is generally cheaper as you don't pay 'interest on interest'. For a saver, compounding is superior for wealth building." },
        { question: "How do I calculate interest for 6 months?", answer: "Since the formula uses 'Years', use 0.5 for 6 months (6/12). For 3 months, use 0.25." },
        { question: "What is 'Tamasuk'?", answer: "A Tamasuk is a legally binding informal loan agreement in Nepal that specifies the principal (Sawa), interest rate (Byaj), and repayment timeline." },
        { question: "Do banks use simple interest?", answer: "Most banks use simple interest for short-term loans or specific fixed-income products, but they usually compound interest on savings and home loans." },
        { question: "What is the difference between Sawa and Byaj?", answer: "Sawa refers to the Principal (the original amount), and Byaj refers to the Interest (the cost of borrowing)." },
        { question: "Does this include TDS?", answer: "This is a gross calculator. In Nepal, interest from BFIs is subject to a 5% Tax Deducted at Source (TDS)." },
        { question: "Can I use this for Sahakari (Cooperative) loans?", answer: "Yes, many Sahakaris use simple interest or flat rates for short-term working capital loans." },
        { question: "What happens if I don't pay the interest?", answer: "In a simple interest model, unpaid interest usually doesn't earn interest itself, but it accumulates as a debt liability." },
        { question: "How does the Rule of 72 apply here?", answer: "The Rule of 72 is for compounding. In simple interest, the time to double is simply 100 divided by the rate (e.g., 10% doubles in 10 years)." },
        { question: "Is penalty interest simple or compound?", answer: "In most Nepalese contracts, penalty interest for late payments is calculated as a flat simple interest on the overdue amount." },
        { question: "What is the 'Principal Core'?", answer: "It is the percentage of the final maturity value that was your original investment." },
        { question: "What is 'Muluki Ain'?", answer: "It is the National Civil Code of Nepal which regulates civil matters including property, contracts, and informal lending." },
        { question: "Who is a 'Lender' (Sahur)?", answer: "In an informal context, the person who provides the principal amount." },
        { question: "Who is a 'Borrower' (Asami)?", answer: "The person who receives the principal and agrees to pay it back with interest." },
        { question: "Can interest be higher than the principal in Nepal?", answer: "Historically, laws in Nepal (Damdupat) often prevented interest from exceeding the original principal in informal settings, though modern contracts vary." },
        { question: "What is a 'Flat Rate'?", answer: "A common term in Nepal for simple interest calculated on the full principal for the entire loan duration." },
        { question: "How often should interest be paid?", answer: "It depends on the contract; it could be monthly, quarterly, or as a lump sum at the end (Maturity)." },
        { question: "What is the TDS rate for cooperatives?", answer: "It is generally the same as banks (5%), but you should verify with the specific Sahakari's tax status." },
        { question: "Is this calculator legally valid in court?", answer: "This is a mathematical tool. While accurate, legal disputes require certified audits by registered professionals." }
      ]}
      sidebar={{
        title: "Credit Suite",
        subtitle: "Lending Hub",
        links: [
          { label: "Compound Interest", href: "/calculator/compound-interest/", icon: TrendingUp },
          { label: "Loan EMI tool", href: "/calculator/loan-emi/", icon: Landmark },
          { label: "FD Calculator", href: "/calculator/fd-calculator/", icon: Target },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Wallet },
        ],
      }}
      relatedTools={[
        { label: "Compound Interest", href: "/calculator/compound-interest/" },
        { label: "Loan EMI", href: "/calculator/loan-emi/" },
        { label: "FD Calculator", href: "/calculator/fd-calculator/" }
      ]}
    />
  );
}
