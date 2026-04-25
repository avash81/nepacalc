'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ShieldCheck, TrendingUp, Info, Wallet, Landmark } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalPFCalculator() {
  const [state, setState] = useSyncState('nepal_pf_v3', { basic: 50000, years: 10, rate: 8 });
  const { basic, years, rate } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const monthlyPF = basic * 0.20;
    const annualGratuity = basic * 0.0833 * 12;
    const monthlyRate = rate / 100 / 12;
    let totalPF = 0;
    for (let i = 0; i < years * 12; i++) { totalPF = (totalPF + monthlyPF) * (1 + monthlyRate); }
    const totalGratuity = annualGratuity * years;
    return { monthlyPF, totalPF, totalGratuity, total: totalPF + totalGratuity };
  }, [basic, years, rate]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  const rules = [
    ['Employee Contribution', '10% of basic'],
    ['Employer Contribution', '10% of basic'],
    ['Total Monthly PF', '20% of basic'],
    ['Gratuity Rate', '8.33%/month'],
  ];

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Provident Fund (EPF)' }]}
      title="Nepal PF & Gratuity Calculator"
      description="Calculate accumulated Provident Fund (EPF) and Gratuity under Nepal Labor Act 2074. Shows total retirement corpus with compound interest."
      icon={ShieldCheck}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Monthly Basic Salary</label>
            <div className="relative">
              <input type="number" value={basic} onChange={e => update({ basic: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Service Years</label>
              <input type="number" value={years} min={1} max={40} onChange={e => update({ years: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>PF Interest Rate</label>
              <div className="relative">
                <input type="number" value={rate} min={1} max={20} step={0.5} onChange={e => update({ rate: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Nepal Labor Act 2074 — PF Rules</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              {rules.map(([l, v]) => (
                <div key={l} className="px-4 py-2.5 flex justify-between">
                  <span className="text-[11px] text-[#5F6368]">{l}</span>
                  <span className="text-[11px] font-black text-[#1A73E8]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124]">Monthly PF deduction: <strong>{fmt(r.monthlyPF)}</strong> (employee + employer)</p>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Retirement Fund
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Retirement Corpus</div>
            <div className="text-3xl font-black text-[#188038]">{fmt(r.total)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">After {years} years of service</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
              <Wallet className="w-3 h-3 text-[#1A73E8]" />
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Breakdown</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Accumulated PF (with interest)</span>
                <span className="font-black text-[#1A73E8]">{fmt(r.totalPF)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Total Gratuity (8.33%)</span>
                <span className="font-black text-[#188038]">{fmt(r.totalGratuity)}</span>
              </div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]">
                <span className="font-bold text-[#202124] uppercase">Monthly PF Contribution</span>
                <span className="font-black">{fmt(r.monthlyPF)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Landmark className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">PF interest rate is set by the government annually. Current rate is approximately 8.5% p.a. Verify with EPFO or your employer.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision EPF & Retirement Corpus Analytics</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Building a robust financial foundation requires accurate long-term forecasting. Our <strong className="text-[#202124]">provident fund calculator nepal</strong> is specifically modeled around the statutory requirements established by the <strong className="text-[#202124]">labor act 2074 provident fund</strong> mandates. It calculates the exact monthly accumulation generated by the mandatory 10% employee deduction matched by a 10% employer contribution (totaling 20% of your Basic Salary).
              </p>
              <p>
                Unlike basic interest estimators, this <strong className="text-[#202124]">epf nepal calculator</strong> isolates your Provident Fund corpus from your Gratuity entitlement. By applying compound interest algorithms based on the prevailing <strong className="text-[#202124]">pf interest rate nepal</strong> (typically fluctuating between 8% and 9%), it provides a highly realistic <strong className="text-[#202124]">retirement fund calculation nepal</strong> over your total projected years of service.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Structure of Your PF Account</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Continuous Compounding:</strong> EPF (Karmachari Sanchaya Kosh) accrues interest on a monthly compounding basis. This means the interest generated in Month 1 is added to the principal to generate higher interest in Month 2, creating an exponential growth curve over a 20+ year career.</li>
              <li><strong className="text-[#188038]">Gratuity Separation:</strong> While PF is a mutual contribution model, Gratuity is solely an employer liability calculated at exactly 8.33% of your monthly basic salary. Our tool computes both streams simultaneously but displays them distinctly in the breakdown to match official HR ledgers.</li>
              <li><strong className="text-[#D93025]">Basic Salary Dependency:</strong> Both EPF and Gratuity are mathematically anchored <span className="italic">only</span> to the Basic Salary. Dashain bonuses, travel allowances, and medical stipends are strictly excluded from this calculation base.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your Monthly Basic Salary (not gross — exclude allowances).",
          "Enter your total years of planned service.",
          "Set the PF Interest Rate (typically 8–9% in Nepal).",
          "Review the breakdown showing PF corpus vs Gratuity separately.",
          "Use this to plan your total retirement benefit package."
        ]
      }}
      formula={{
        title: "Nepal PF Calculation",
        description: "PF accumulates with compound interest monthly. Gratuity is a straight-line calculation.",
        raw: "Monthly PF = Basic × 20% (10% employee + 10% employer)\nPF Corpus = Monthly PF compounded monthly at rate%\nGratuity = Basic × 8.33% × 12 × Years"
      }}
      faqs={[
        {
          question: "What is the difference between EPF and SSF in Nepal?",
          answer: "EPF (Employee Provident Fund) is the traditional government-managed fund. SSF (Social Security Fund) is a newer unified fund that covers PF, gratuity, medical, and accident insurance in one scheme."
        },
        {
          question: "Can I withdraw my PF before retirement?",
          answer: "Yes, partial withdrawals are allowed for specific purposes (housing, medical) under EPF rules. However, SSF has different and generally stricter withdrawal conditions."
        }
      ]}
      sidebar={{
        title: "HR & Retirement Tools",
        links: [
          { label: "Gratuity Calculator", href: "/calculator/gratuity-calculator" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax" },
          { label: "SIP Calculator", href: "/calculator/sip-calculator" },
        ],
        banner: {
          title: "Plan Your Retirement",
          description: "Starting PF contributions early and maintaining service continuity significantly boosts your retirement corpus.",
          image: "/images/retire-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Gratuity Calc", href: "/calculator/gratuity-calculator" },
        { label: "Nepal Salary", href: "/calculator/nepal-salary" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
