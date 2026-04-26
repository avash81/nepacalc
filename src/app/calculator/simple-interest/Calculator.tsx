'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, Landmark, PieChart, Info, Calendar, Target, Calculator, Activity } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

const TIME_PRESETS = [
  { label: '1 Year', value: 1 },
  { label: '2 Years', value: 2 },
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
];

const RATE_PRESETS = [7, 8, 10, 12];

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
    return { interest, total };
  }, [principal, time, rate]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Simple Interest' }]}
      title="Simple Interest Calculator"
      description="Calculate basic interest on loans and savings using the standard (P × R × T) / 100 formula. Quick and easy tool for financial planning."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Principal Amount</label>
            <div className="relative">
              <input 
                type="number" 
                value={principal} 
                onChange={e => update({ principal: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Annual Rate (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={rate} 
                  onChange={e => update({ rate: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Time (Years)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={time} 
                  onChange={e => update({ time: Number(e.target.value) })} 
                  className={inputCls} 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">yrs</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Quick Time Periods</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIME_PRESETS.map(p => (
                <button 
                  key={p.value} 
                  onClick={() => update({ time: p.value })}
                  className={`py-2 text-[10px] font-bold uppercase border rounded-md transition-all ${time === p.value ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Common Nepal Bank Rates</label>
            <div className="grid grid-cols-4 gap-2">
              {RATE_PRESETS.map(r => (
                <button 
                  key={r} 
                  onClick={() => update({ rate: r })}
                  className={`py-2 text-[10px] font-bold uppercase border rounded-md transition-all ${rate === r ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Interest
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Maturity Value</div>
            <div className="text-3xl font-black text-[#1A73E8]">{fmt(result.total)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Principal + Interest after {time} years</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Principal Amount</div>
               <div className="text-sm font-black text-[#202124]">{fmt(principal)}</div>
             </div>
             <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center space-y-1">
               <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Interest</div>
               <div className="text-sm font-black text-[#188038]">+ {fmt(result.interest)}</div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden p-4 space-y-3 shadow-sm">
             <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold text-[#70757A] uppercase">Growth Summary</span>
               <Activity className="w-3 h-3 text-[#1A73E8]" />
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-[#5F6368]">Total Growth (%)</span>
               <span className="font-black text-[#188038]">{((result.interest / principal) * 100).toFixed(1)}%</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-[#5F6368]">Monthly Interest</span>
               <span className="font-bold">{fmt(result.interest / (time * 12))}</span>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#F29900] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Simple interest does not compound. The interest is always calculated on the initial principal only.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Understanding Simple Interest in Financial Planning</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Simple interest remains the most fundamental building block of financial literacy. Unlike complex compounding models, our <strong className="text-[#202124]">simple interest calculator</strong> utilizes the standard linear formula to project growth where the principal remains static. This is essential for evaluating short-term credit facilities, pawnshop valuations, and certain types of treasury instruments where interest is paid out rather than reinvested.
              </p>
              <p>
                In the Nepalese market, while most commercial banks (A-Class) utilize compounding for savings, many local <strong>Cooperatives (Sahakari)</strong> and informal lending arrangements still rely on simple interest for quick calculations. This tool provides a professional-grade audit for such transactions, ensuring that both lenders and borrowers have a clear, mathematically verified understanding of their total liability over time.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Practical Applications & Linear Growth</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The P×R×T Formula:</strong> The core logic represents the direct relationship between Principal (P), Rate (R), and Time (T). Because the interest doesn't earn further interest, the growth is linear, making it easy to predict exactly how much you will owe or earn at any point in the future.</li>
              <li><strong className="text-[#188038]">Informal Lending & Sahakari:</strong> Many small-scale businesses in Nepal utilize "Month-to-Month" simple interest for working capital. This <strong className="text-[#202124]">si calculator</strong> allows you to input these rates (often expressed as percentages per month) to see the long-term annual impact.</li>
              <li><strong className="text-[#D93025]">Academic & Curriculum Support:</strong> For students following the CDC Nepal curriculum, this tool serves as a verification engine for mathematical problems involving simple interest, providing step-by-step clarity on how the total maturity value is derived from the base interest.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter the initial Principal Amount. This is the amount you are investing or borrowing.",
          "Input the Annual Interest Rate (%). Ensure this is the yearly rate, not the monthly rate.",
          "Set the Time period in years. For months, use a decimal (e.g., 6 months = 0.5 years).",
          "Use the 'Quick Presets' to instantly set common time periods or standard Nepal bank rates.",
          "Review the total maturity value and analyze the Growth Summary to understand your total percentage gain."
        ]
      }}
      formula={{
        title: "Simple Interest (SI) Mathematical Logic",
        description: "The most basic way to calculate interest, where the principal remains constant over the entire period.",
        raw: "Simple Interest (I) = (P × R × T) / 100\nTotal Amount (A) = P + I\n\nWhere:\nP = Principal Amount\nR = Annual Rate of Interest (%)\nT = Time Period (in Years)"
      }}
      faqs={[
        {
          question: "When is simple interest typically used instead of compound interest?",
          answer: "Simple interest is often used for short-term personal loans, auto loans, and basic savings accounts where interest is not reinvested into the principal balance. It is also common in informal lending."
        },
        {
          question: "How do I calculate interest for months instead of years?",
          answer: "Since the standard formula uses 'Years', you must divide the number of months by 12. For example, 6 months becomes 0.5 years, and 3 months becomes 0.25 years."
        },
        {
          question: "Does the interest generated earn interest itself?",
          answer: "No. That is the defining difference between simple and compound interest. In simple interest, the principal remains static, meaning you earn the exact same flat amount of interest every single year."
        },
        {
          question: "How do Cooperatives (Sahakaris) in Nepal calculate interest?",
          answer: "Many Sahakaris use a flat simple interest method for short-term business loans, calculating the total interest upfront for the entire loan period, which is then divided into equal installments."
        },
        {
          question: "If I borrow Rs. 100,000 at 10% for 2 years, how much do I owe?",
          answer: "Using the formula (100,000 × 10 × 2) / 100, the total interest is Rs. 20,000. Therefore, your total repayment amount (Principal + Interest) would be Rs. 120,000."
        },
        {
          question: "Why do banks prefer compound interest over simple interest?",
          answer: "Banks prefer compounding because it allows money to grow exponentially. For borrowers, it means they owe more over time if they don't pay. For savers, it means their wealth grows faster as their interest earns interest."
        }
      ]}
      sidebar={{
        title: "Financial Suite",
        links: [
          { label: "Compound Interest", href: "/calculator/compound-interest" },
          { label: "FD Calculator", href: "/calculator/fd-calculator" },
          { label: "Loan EMI tool", href: "/calculator/loan-emi" },
          { label: "SIP Calculator", href: "/calculator/sip-calculator" },
        ],
        banner: {
          title: "Grow Your Wealth",
          description: "Understanding interest is the first step toward financial freedom. Compare simple vs compound growth today.",
          image: "/images/wealth-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Compound Interest", href: "/calculator/compound-interest" },
        { label: "FD Calculator", href: "/calculator/fd-calculator" },
        { label: "Loan EMI", href: "/calculator/loan-emi" }
      ]}
    />
  );
}
