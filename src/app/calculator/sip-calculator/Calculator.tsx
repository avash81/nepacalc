'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TrendingUp } from 'lucide-react';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

const DEFAULT = { monthly: 5000, rate: 12, years: 10, stepUp: 10 };

export default function SIPCalculator() {
  const [state, setState] = useLocalStorage('cp-sip-state', DEFAULT);
  const { monthly, rate, years, stepUp } = state;
  const update = (k: keyof typeof DEFAULT, v: number) => setState({ ...state, [k]: v });

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const s = stepUp / 100;
    let fv = 0, totalInvested = 0, currentMonthly = monthly;
    const schedule: { year: number; invested: number; returns: number; balance: number }[] = [];
    for (let year = 1; year <= years; year++) {
      for (let m = 1; m <= 12; m++) { fv = (fv + currentMonthly) * (1 + r); totalInvested += currentMonthly; }
      schedule.push({ year, invested: totalInvested, returns: fv - totalInvested, balance: fv });
      currentMonthly = currentMonthly * (1 + s);
    }
    const returns = fv - totalInvested;
    const wealthGainedPct = totalInvested > 0 ? (returns / totalInvested) * 100 : 0;
    
    // What-If Scenarios (LibreOffice Style)
    const baseP = monthly;
    const n = years * 12;
    const calcScenario = (scenarioRate: number) => {
        let scFv = 0, scInv = 0, scM = baseP;
        const sr = scenarioRate / 12 / 100;
        const sStep = stepUp / 100;
        for (let year = 1; year <= years; year++) {
          for (let m = 1; m <= 12; m++) { scFv = (scFv + scM) * (1 + sr); scInv += scM; }
          scM = scM * (1 + sStep);
        }
        return { rate: scenarioRate, fv: scFv };
    };

    const scenarios = [
      calcScenario(Math.max(1, rate - 4)),
      calcScenario(rate), // Current
      calcScenario(rate + 4)
    ];

    return { fv, totalInvested, returns, wealthGainedPct, schedule, scenarios };
  }, [monthly, rate, years, stepUp]);

  const invPct = result.fv > 0 ? (result.totalInvested / result.fv) * 100 : 0;

  return (
    <CalculatorLayout
      title="SIP Investment Calculator"
      description="Calculate Systematic Investment Plan (SIP) returns with annual step-up. Ideal for Nepal mutual fund and NEPSE portfolio planning."
      category={{ label: 'Finance', href: '/calculator/category/finance' }}
      leftPanel={
        <div className="space-y-6">
          <ValidatedInput label="Monthly Investment (NPR)" value={monthly} onChange={v => update('monthly', v)} min={500} max={100000} prefix="NPR" step={500} required withSlider />

          <div className="grid grid-cols-2 gap-4">
            <ValidatedInput label="Expected Return Rate (p.a.)" value={rate} onChange={v => update('rate', v)} min={1} max={30} suffix="%" step={0.5} required withSlider />
            <ValidatedInput label="Time Period (Years)" value={years} onChange={v => update('years', v)} min={1} max={40} required withSlider />
          </div>

          <ValidatedInput label="Annual Step-Up (%)" value={stepUp} onChange={v => update('stepUp', v)} min={0} max={50} suffix="%" hint="Increase your SIP amount each year" withSlider />

          {/* Monthly Presets */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Quick Monthly Amounts</label>
            <div className="grid grid-cols-4 gap-2">
              {[1000, 5000, 10000, 25000].map(v => (
                <button key={v} onClick={() => update('monthly', v)}
                  className={`py-3 text-[11px] font-bold border transition-all ${monthly === v ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'}`}>
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Year Schedule (compact) */}
          <div className="bg-white border border-[var(--border)]">
            <div className="px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border)]">
              <h3 className="text-[11px] font-bold uppercase text-[var(--text-main)]">Yearly Growth Schedule</h3>
            </div>
            <div className="overflow-y-auto overflow-x-auto max-h-48">
              <table className="w-full min-w-[300px]">
                <thead>
                  <tr className="bg-[var(--bg-surface)] border-b border-[var(--border)] text-[10px] text-[var(--text-muted)] font-black uppercase">
                    <th className="px-3 py-2 text-left">Year</th>
                    <th className="px-3 py-2 text-right">Invested</th>
                    <th className="px-3 py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map(row => (
                    <tr key={row.year} className="border-b border-[var(--border)] hover:bg-[var(--bg-surface)]">
                      <td className="px-3 py-2 font-bold text-[var(--text-secondary)] text-[11px]">{row.year}</td>
                      <td className="px-3 py-2 text-right font-mono text-[11px] text-[var(--text-secondary)]">{fmt(row.invested)}</td>
                      <td className="px-3 py-2 text-right font-mono font-black text-[11px] text-[var(--primary)]">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {/* Future Value Hero */}
          <div className="p-8 bg-white border border-[var(--border)] text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
              <div className="text-xs font-bold uppercase text-[var(--text-muted)]">Estimated Future Value</div>
            </div>
            <div className="text-5xl font-black text-[#006600] tracking-tighter mb-2">NPR {fmt(result.fv)}</div>
            <div className="text-xs font-bold text-[var(--text-secondary)] uppercase">Wealth gained {result.wealthGainedPct.toFixed(1)}%</div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Total Invested</span>
              <span className="text-sm font-black text-[var(--text-main)]">NPR {fmt(result.totalInvested)}</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Est. Returns</span>
              <span className="text-sm font-black text-[#006600]">+ NPR {fmt(result.returns)}</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Duration</span>
              <span className="text-sm font-black text-[var(--text-main)]">{years} years</span>
            </div>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] flex justify-between">
              <span className="text-[11px] font-bold uppercase text-[var(--text-secondary)]">Annual Step-Up</span>
              <span className="text-sm font-black text-[var(--text-main)]">{stepUp}%/yr</span>
            </div>
          </div>

          {/* Split bar */}
          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border)]">
            <div className="flex justify-between text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2">
              <span>Principal ({invPct.toFixed(0)}%)</span>
              <span>Returns ({(100 - invPct).toFixed(0)}%)</span>
            </div>
            <div className="h-4 flex overflow-hidden w-full">
              <div className="bg-[var(--primary)] transition-all duration-700" style={{ width: `${invPct}%` }} />
              <div className="bg-[#006600] flex-1" />
            </div>
          </div>

          {/* What-If Scenario Compare (LibreOffice Style) */}
          <div className="bg-white border border-[var(--border)] overflow-hidden">
             <div className="bg-indigo-50 px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase text-indigo-900 tracking-widest">What-If Scenarios</h4>
                <span className="text-[9px] font-bold tracking-widest text-indigo-700 uppercase bg-indigo-100 px-2 py-0.5 rounded-full">Comparison</span>
             </div>
             <table className="w-full text-left table-fixed">
                <thead>
                   <tr className="bg-[var(--bg-surface)] border-b border-[var(--border)] text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                      <th className="p-3 w-1/3">Market</th>
                      <th className="p-3 w-1/3 border-l border-[var(--border)]">Return Rate</th>
                      <th className="p-3 w-1/3 border-l border-[var(--border)] text-right">Maturity Value</th>
                   </tr>
                </thead>
                <tbody className="text-[11px] font-bold text-[var(--text-secondary)]">
                   <tr className="border-b border-[var(--border)] hover:bg-[var(--bg-subtle)]">
                      <td className="p-3 text-red-600">Conservative</td>
                      <td className="p-3 border-l border-[var(--border)]">{result.scenarios[0].rate}%</td>
                      <td className="p-3 border-l border-[var(--border)] text-right">{fmt(result.scenarios[0].fv)}</td>
                   </tr>
                   <tr className="border-b border-[var(--border)] hover:bg-[var(--bg-subtle)] bg-[var(--primary-light)]">
                      <td className="p-3 text-[var(--primary)]">Expected (Yours)</td>
                      <td className="p-3 border-l border-[var(--border)] font-black text-[var(--primary)]">{result.scenarios[1].rate}%</td>
                      <td className="p-3 border-l border-[var(--border)] font-black text-right text-[var(--primary)]">{fmt(result.scenarios[1].fv)}</td>
                   </tr>
                   <tr className="hover:bg-[var(--bg-subtle)]">
                      <td className="p-3 text-green-600">Aggressive</td>
                      <td className="p-3 border-l border-[var(--border)]">{result.scenarios[2].rate}%</td>
                      <td className="p-3 border-l border-[var(--border)] text-right">{fmt(result.scenarios[2].fv)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="p-4 bg-[var(--bg-subtle)] border border-[var(--border)]">
            <p className="text-[11px] text-[var(--text-secondary)] italic mb-1">Estimates assume beginning-of-month deposits (Annuity Due).</p>
            <p className="text-[11px] text-[var(--text-secondary)] italic">Actual mutual fund returns may vary.</p>
          </div>
        </div>
      }
      faqSection={
         <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
             <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">Demystifying Systematic Investment Plans (SIP) in Nepal</h2>
             
             <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">A Systematic Investment Plan (SIP) is a highly disciplined investment methodology offered by Mutual Funds managed under the jurisdiction of the Securities Board of Nepal (SEBON). It allows individual retail investors to incrementally invest a fixed mathematical amount in a mutual fund scheme automatically at regular intervals (monthly, quarterly, or semi-annually).</p>
             
             <h3 className="text-xl font-black text-slate-900 mt-8 mb-4">The Magic of Compounding in NEPSE</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-4">Einstein allegedly called compound interest the &quot;Eighth Wonder of the World.&quot; In the context of the Nepalese Stock Exchange (NEPSE), SIP relies on two core mathematical mechanisms that systematically dismantle market risk:</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 mt-4">
               <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-lg">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">1. Rupee Cost Averaging</h4>
                 <p className="text-xs text-slate-600 leading-relaxed">Because you invest a static fixed amount consistently, you purchase more mutual fund Nav (Net Asset Value) units when the NEPSE index crashes, and fewer units when the market rallies. This automatically lowers the average cost per unit over a 5-10 year horizon, entirely removing the psychological stress of &quot;timing&quot; the volatile Nepalese market.</p>
               </div>
               <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-lg">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">2. Exponential Compounding</h4>
                 <p className="text-xs text-slate-600 leading-relaxed">Unlike a standard fixed deposit (FD), mutual fund capital gains and dividends are reinvested back into purchasing more units of the fund. As your total unit count balloons, future percentage yields are calculated against a massively larger capital base. (Interest earning interest).</p>
               </div>
             </div>

             <h3 className="text-xl font-black text-slate-900 mt-8 mb-4">What is a Step-Up SIP?</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-4">A standard SIP keeps the monthly investment static (e.g., NPR 5,000 every month for 10 years). However, standard economic inflation in Nepal heavily depreciates that NPR 5,000 over time. Furthermore, as an individual, your corporate salary and disposable income theoretically increase annually.</p>
             
             <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 mt-6 mb-10">
               <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-1">The Step-Up Strategy</h4>
               <p className="text-xs text-indigo-800 leading-relaxed">A &quot;Step-Up SIP&quot; systematically forces you to increase your monthly contribution by a fixed percentage (usually 5% to 10%) every single year. By anchoring your SIP growth to your annual salary appraisal, a 10% Step-Up SIP historically generates almost <strong>40% to 60% more total corpus</strong> at maturity compared to a static flat SIP.</p>
             </div>
           </div>
      }
    />
  );
}
