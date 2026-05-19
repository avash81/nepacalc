'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Car, Zap, Wallet, TrendingUp, Info, ShieldCheck, PieChart, Activity, History } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';

const DEFAULT_STATE = {
  vehicleType: 'ev' as 'ev' | 'fuel',
  vehiclePrice: 4000000,
  downPaymentPercent: 20,
  interestRate: 11.5,
  tenureYears: 7
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function AutoLoanCalculator() {
  const [state, setState] = useSyncState('auto_loan_v1', DEFAULT_STATE);
  const { vehicleType, vehiclePrice, downPaymentPercent, interestRate, tenureYears } = state;

  const update = (u: Partial<typeof state>) => {
    // Enforce NRB Rules on update
    if (u.vehicleType === 'fuel' && (!u.downPaymentPercent || u.downPaymentPercent < 50)) {
       u.downPaymentPercent = 50;
    }
    if (u.vehicleType === 'ev' && (!u.downPaymentPercent || u.downPaymentPercent < 20)) {
       u.downPaymentPercent = 20;
    }
    setState({ ...state, ...u });
  };

  const result = useMemo(() => {
    const downPaymentAmount = vehiclePrice * (downPaymentPercent / 100);
    const loanAmount = vehiclePrice - downPaymentAmount;
    
    const r = (interestRate / 100) / 12;
    const n = tenureYears * 12;
    
    let emi = 0;
    if (r > 0) {
      emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = loanAmount / n;
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanAmount;

    const pieData = [
      { name: 'Loan Principal', value: loanAmount },
      { name: 'Total Interest', value: totalInterest }
    ];

    return {
      loanAmount,
      downPaymentAmount,
      emi,
      totalPayment,
      totalInterest,
      pieData
    };
  }, [vehiclePrice, downPaymentPercent, interestRate, tenureYears]);

  return (
    <ModernCalcLayout
      slug="auto-loan"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Finance', href: '/finance/' }, { label: 'Auto Loan' }]}
      title="Nepal Auto Loan EMI Calculator 2083/84"
      description="Calculate EMI for fuel and electric vehicles in Nepal. Includes latest NRB down-payment mandates (50% for fuel, 20% for EV)."
      icon={Car}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Vehicle Category</label>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'fuel', label: 'Fuel Vehicle', icon: Car, rule: 'Min 50% Down' },
                    { id: 'ev', label: 'Electric (EV)', icon: Zap, rule: 'Min 20% Down' }
                  ].map(v => (
                    <button key={v.id} onClick={() => update({ vehicleType: v.id as any })} className={`h-16 px-4 rounded-md border text-left flex flex-col justify-center transition-all ${vehicleType === v.id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}>
                       <div className="flex justify-between items-center w-full mb-1">
                          <span className={`text-[11px] font-black uppercase ${vehicleType === v.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{v.label}</span>
                          <v.icon className={`w-3.5 h-3.5 ${vehicleType === v.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`} />
                       </div>
                       <p className={`text-[9px] font-bold uppercase ${vehicleType === v.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{v.rule}</p>
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Vehicle Price (NPR)</label>
                  <input type="number" value={vehiclePrice} onChange={e => update({ vehiclePrice: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Down Payment (%)</label>
                  <input type="number" min={vehicleType === 'fuel' ? 50 : 20} value={downPaymentPercent} onChange={e => update({ downPaymentPercent: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Interest Rate (% P.A.)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={e => update({ interestRate: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tenure (Years)</label>
                  <select value={tenureYears} onChange={e => update({ tenureYears: Number(e.target.value) })} className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer">
                     {[1, 2, 3, 4, 5, 6, 7].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
               </div>
            </div>

            <div className="p-4 bg-[#FFF9E6] border border-[#F29900] rounded-md flex gap-3 items-center">
               <ShieldCheck className="w-5 h-5 text-[#F29900] shrink-0" />
               <p className="text-[9px] text-[#202124] font-bold leading-relaxed uppercase">
                  NRB Directive: Maximum financing allowed is <span className="text-[#F29900]">{vehicleType === 'ev' ? '80%' : '50%'}</span> of the vehicle value for personal use.
               </p>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Monthly EMI</div>
             <div className="text-4xl font-black text-[#1A73E8] tracking-tight">{formatNPR(result.emi)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">At {interestRate}% for {tenureYears} Years</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Down Payment</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.downPaymentAmount)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Total Interest</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(result.totalInterest)}</div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-center">
             <div className="text-[10px] font-black text-[#5F6368] uppercase mb-1">Total Loan Amount</div>
             <div className="text-lg font-black text-[#1A73E8]">{formatNPR(result.loanAmount)}</div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Loan Capital Split</h3>
                </div>
                <div className="h-[240px] w-full relative mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={result.pieData}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                      >
                        <Cell fill="#188038" />
                        <Cell fill="#D93025" />
                      </Pie>
                      <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                     <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Total Cost</span>
                     <span className="text-lg font-black text-[#202124]">{formatNPR(result.totalPayment)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#188038]"></div> Principal</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D93025]"></div> Interest</div>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#F29900] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">NRB Auto Loan Mandates</h3>
                </div>
                <div className="space-y-4">
                   <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                      Nepal Rastra Bank enforces specific LTV (Loan-to-Value) ratios for vehicle financing to maintain financial stability.
                   </p>
                   <div className="space-y-2">
                      <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#202124] uppercase">Personal Fuel Cars</span>
                         <span className="text-[11px] font-black text-[#D93025]">50% Max Financing</span>
                      </div>
                      <div className="p-4 rounded-md bg-[#E6F4EA] border border-[#188038] flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#188038] uppercase">Electric Vehicles (EV)</span>
                         <span className="text-[11px] font-black text-[#188038]">80% Max Financing</span>
                      </div>
                      <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#202124] uppercase">Commercial Vehicles</span>
                         <span className="text-[11px] font-black text-[#202124]">70%-80% Case-by-Case</span>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the vehicle category (Fuel vs Electric) to auto-apply NRB rules.",
          "Enter the total vehicle price as per the dealer's quotation.",
          "Adjust your down payment. Note that minimums are 50% for fuel and 20% for EV.",
          "Set the bank's interest rate (usually Base Rate + 2-4% Premium).",
          "Select the tenure. Max auto loan tenure in Nepal is typically 7-8 years.",
          "Review the EMI and total interest payable before visiting the bank."
        ]
      }}
      formula={{
        title: "Standard EMI Logic",
        description: "Reducing balance EMI calculation used by Nepalese banks.",
        raw: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]",
        variables: [
          "P: Loan Amount (Price - Down Payment)",
          "r: Monthly Interest Rate (Annual Rate / 12 / 100)",
          "n: Total Number of Months (Years × 12)"
        ]
      }}
      faqs={[
        { question: "What is the maximum tenure for auto loans in Nepal?", answer: "For personal vehicles, most banks offer up to 7-8 years. For electric vehicles, some banks extend it slightly, but 7 years remains the standard benchmark." },
        { question: "Why is the down payment so high for fuel cars?", answer: "Nepal Rastra Bank maintains a 50% down payment rule for fuel-powered personal vehicles to discourage high luxury imports and manage liquidity." },
        { question: "Can I get 80% financing for a taxi or van?", answer: "Yes, commercial vehicles often qualify for higher financing ratios (70-80%) compared to personal fuel cars (50%)." }
      ]}
      sidebar={{
        title: "Loan Hub",
        links: [
          { label: "Loan EMI Tool", href: "/calculator/loan-emi/", icon: TrendingUp },
          { label: "Home Loan Calc", href: "/calculator/mortgage-calculator/", icon: Wallet },
          { label: "Loan Eligibility", href: "/calculator/nepal-loan-eligibility/", icon: ShieldCheck },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Loan EMI Calculator", href: "/calculator/loan-emi/" },
        { label: "Loan Eligibility", href: "/calculator/nepal-loan-eligibility/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" }
      ]}
    />
  );
}
