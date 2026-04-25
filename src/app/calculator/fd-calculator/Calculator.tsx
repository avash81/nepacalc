'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Banknote, TrendingUp, Info, Shield, PiggyBank } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

const COMP_OPTIONS = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 },
];

export default function FDCalculator() {
  const [state, setState] = useSyncState('fd_v4', { principal: 100000, rate: 10, time: 1, compounding: 4 });
  const { principal, rate, time, compounding } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const amount = principal * Math.pow(1 + rate / 100 / compounding, compounding * time);
    const interest = amount - principal;
    return { maturity: amount, interest, pctGrowth: ((interest / principal) * 100).toFixed(1) };
  }, [principal, rate, time, compounding]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Fixed Deposit Calculator' }]}
      title="Fixed Deposit (FD) Calculator"
      description="Calculate FD maturity amount and interest earned with Nepal bank compounding rates. Supports quarterly, monthly, and yearly compounding."
      icon={Banknote}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Principal Amount</label>
            <div className="relative">
              <input type="number" value={principal} onChange={e => update({ principal: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Annual Interest Rate</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[6, 8, 10, 12].map(v => (
                <button key={v} onClick={() => update({ rate: v })}
                  className={`py-2 text-xs font-black border rounded-md transition-all ${rate === v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {v}%
                </button>
              ))}
            </div>
            <div className="relative">
              <input type="number" step={0.5} value={rate} onChange={e => update({ rate: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">% p.a.</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>FD Duration</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[{ l: '6mo', v: 0.5 }, { l: '1yr', v: 1 }, { l: '2yr', v: 2 }, { l: '5yr', v: 5 }].map(p => (
                <button key={p.l} onClick={() => update({ time: p.v })}
                  className={`py-2 text-xs font-black border rounded-md transition-all ${time === p.v ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {p.l}
                </button>
              ))}
            </div>
            <div className="relative">
              <input type="number" step={0.5} value={time} onChange={e => update({ time: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">years</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {COMP_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => update({ compounding: opt.value })}
                  className={`py-2.5 text-xs font-bold border rounded-md transition-all ${compounding === opt.value ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Maturity
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Maturity Amount</div>
            <div className="text-3xl font-black text-[#1A73E8]">{fmt(r.maturity)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">Grows {r.pctGrowth}% over {time} year{time !== 1 ? 's' : ''}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Principal</div>
              <div className="text-sm font-black">{fmt(principal)}</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Interest Earned</div>
              <div className="text-sm font-black text-[#188038]">+{fmt(r.interest)}</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#DADCE0] rounded-lg flex justify-between items-center">
            <span className="text-[11px] font-bold text-[#70757A] uppercase">Compounding</span>
            <span className="text-sm font-black">{COMP_OPTIONS.find(c => c.value === compounding)?.label}</span>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight"><strong>TDS Note:</strong> FD interest in Nepal is subject to <strong>5% withholding tax</strong> deducted at source by the bank.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Optimizing Fixed Deposit Returns in Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Fixed Deposits (Muddati Khata) remain the foundation of risk-free capital preservation in Nepal's banking sector. Our advanced <strong className="text-[#202124]">fd calculator nepal</strong> is engineered to replicate the exact compounding algorithms utilized by 'A' class commercial banks and national financial institutions, allowing you to project precise maturity values against current <strong className="text-[#202124]">fixed deposit interest rates nepal</strong>.
              </p>
              <p>
                Unlike simple interest vehicles, modern FD accounts accelerate wealth generation through compounding. Depending on the banking institution and specific promotional schemes, interest may be reinvested on a monthly, quarterly, or annual basis. This calculator dynamically adjusts the Annual Percentage Yield (APY) based on your selected frequency, ensuring your projections align perfectly with institutional payouts.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Mechanics of Term Deposits</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Quarterly Compounding Dominance:</strong> The overwhelming majority of Nepalese banks employ quarterly compounding (4 compounding periods per year). Mathematically, this yields a slightly higher effective annual rate than nominal rates, compounding your interest at the end of Ashoj, Poush, Chaitra, and Asadh.</li>
              <li><strong className="text-[#188038]">The 5% TDS Mandate:</strong> As mandated by the Inland Revenue Department (IRD), all interest generated from personal fixed deposits is subject to a 5% Tax Deducted at Source (<strong className="text-[#202124]">tds on fixed deposit</strong>). While this calculator models the gross compounding trajectory, investors must deduct this 5% withholding tax to determine absolute net-in-hand maturity.</li>
              <li><strong className="text-[#D93025]">Liquidity & Penalty Considerations:</strong> Premature withdrawal of a fixed deposit in Nepal generally incurs a penalty (often a 1-2% reduction from the contracted rate). Borrowing against the FD (up to 90% of the principal) is usually a more mathematically sound strategy if short-term liquidity is required.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter your FD deposit amount (Principal).", "Select or type your bank's annual interest rate.", "Set the FD duration using presets or a custom value.", "Choose the compounding frequency (most Nepal banks use Quarterly).", "Review maturity amount and interest breakdown."] }}
      formula={{ title: "FD Compound Interest", description: "FD uses compound interest formula with varying compounding frequencies.", raw: "A = P × (1 + r/n)^(n×t)\nWhere P = Principal, r = rate, n = compounding frequency, t = years" }}
      faqs={[
        { question: "What is the best compounding frequency for FD in Nepal?", answer: "Most commercial banks in Nepal compound interest quarterly (4×/year). Some banks offer monthly compounding for special FD schemes, which yields slightly more." },
        { question: "Is FD interest taxable in Nepal?", answer: "Yes. A 5% Tax Deducted at Source (TDS) is applied on FD interest income in Nepal, deducted automatically by the bank." }
      ]}
      sidebar={{ title: "Investment Tools", links: [{ label: "Compound Interest", href: "/calculator/compound-interest" }, { label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "Simple Interest", href: "/calculator/simple-interest" }, { label: "Nepal TDS", href: "/calculator/nepal-tds-calculator" }], banner: { title: "Grow Your Savings", description: "FDs are one of Nepal's safest investment options. Compare rates across BFIs before locking in.", image: "/images/fd-banner.jpg" } }}
      relatedTools={[{ label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "Compound Interest", href: "/calculator/compound-interest" }, { label: "TDS Tool", href: "/calculator/nepal-tds-calculator" }]}
    />
  );
}
