'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { TrendingUp, PieChart, Info, BarChart3, LineChart } from 'lucide-react';

const DEFAULT_STATE = { 
  monthly: 5000, 
  rate: 12, 
  years: 10, 
  stepUp: 10 
};

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

export default function SIPCalculator() {
  const [state, setState] = useSyncState('sip_v4', DEFAULT_STATE);
  const { monthly, rate, years, stepUp } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

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
      badge="Wealth Builder"
      badgeColor="emerald"
      leftPanel={
        <div className="space-y-8">
          <ValidatedInput label="Monthly Investment (NPR)" value={monthly} onChange={v => updateState({ monthly: v })} min={500} max={100000} prefix="NPR" step={500} required withSlider />

          <div className="grid grid-cols-2 gap-6">
            <ValidatedInput label="Return Rate (p.a.)" value={rate} onChange={v => updateState({ rate: v })} min={1} max={30} suffix="%" step={0.5} required withSlider />
            <ValidatedInput label="Period (Years)" value={years} onChange={v => updateState({ years: v })} min={1} max={40} required withSlider />
          </div>

          <ValidatedInput label="Annual Step-Up (%)" value={stepUp} onChange={v => updateState({ stepUp: v })} min={0} max={50} suffix="%" hint="Increase investment each year" withSlider />

          <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
            <div className="px-8 py-4 bg-[var(--bg-surface)] border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <BarChart3 className="w-4 h-4 text-[var(--primary)]" />
                 <h3 className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest">Growth Schedule</h3>
              </div>
              <span className="text-[10px] font-bold text-[var(--text-muted)]">ANNUAL BREAKDOWN</span>
            </div>
            <div className="overflow-y-auto max-h-60 scrollbar-hide">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-slate-50 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    <th className="px-6 py-3 text-left">Year</th>
                    <th className="px-6 py-3 text-right">Total Invested</th>
                    <th className="px-6 py-3 text-right">Est. Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {result.schedule.map(row => (
                    <tr key={row.year} className="hover:bg-[var(--bg-subtle)] transition-colors">
                      <td className="px-6 py-4 font-black text-[var(--text-main)] text-xs">Year {row.year}</td>
                      <td className="px-6 py-4 text-right font-mono text-[11px] text-[var(--text-secondary)]">{fmt(row.invested)}</td>
                      <td className="px-6 py-4 text-right font-mono font-black text-xs text-[var(--primary)]">{fmt(row.balance)}</td>
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
          <div className="p-10 bg-white border border-[var(--border)] rounded-3xl text-center shadow-sm group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <TrendingUp className="w-40 h-40 text-[var(--primary)]" />
            </div>
            <div className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-4 tracking-widest relative z-10">Maturity Value at {years} Years</div>
            <div className="text-6xl font-black text-[var(--primary)] tracking-tighter mb-2 relative z-10 font-mono">NPR {fmt(result.fv)}</div>
            <div className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest bg-[var(--primary-light)] py-1.5 rounded-full inline-block px-6 relative z-10">
               Wealth Multiplier: {(result.fv / (result.totalInvested || 1)).toFixed(2)}x
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] flex justify-between items-center group">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shadow-sm"><LineChart className="w-5 h-5" /></div>
                  <div className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest">Investment Basis</div>
               </div>
               <span className="text-sm font-black text-[var(--text-main)]">NPR {fmt(result.totalInvested)}</span>
            </div>
            
            <div className="p-6 bg-white border-2 border-[var(--primary-light)] rounded-2xl flex justify-between items-center group">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] border border-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)] transition-colors shadow-sm"><TrendingUp className="w-5 h-5" /></div>
                  <div className="text-[10px] font-black uppercase text-[var(--primary)] tracking-widest font-mono">Total Profit</div>
               </div>
               <span className="text-sm font-black text-[var(--primary)]">+ NPR {fmt(result.returns)}</span>
            </div>
          </div>

          <div className="p-8 bg-white border border-[var(--border)] rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <div className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Asset Allocation</div>
               <PieChart className="w-4 h-4 text-[var(--text-muted)] opacity-30" />
            </div>
            <div className="h-6 flex overflow-hidden w-full rounded-full border-2 border-white shadow-inner bg-[var(--bg-subtle)]">
              <div className="bg-[var(--primary)] transition-all duration-1000 relative" style={{ width: `${invPct}%` }}>
                 <div className="absolute inset-0 bg-white/10 animate-pulse" />
              </div>
              <div className="bg-emerald-500 flex-1" />
            </div>
            <div className="flex justify-between mt-3 px-1">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Capital ({invPct.toFixed(0)}%)</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Gains ({(100 - invPct).toFixed(0)}%)</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
               </div>
            </div>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
             <div className="bg-[var(--bg-surface)] px-8 py-5 border-b border-[var(--border)] flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest">Market What-If Scenarios</h4>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--error)]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                </div>
             </div>
             <div className="p-2">
               <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                      <th className="p-4">Condition</th>
                      <th className="p-4 text-center">Rate</th>
                      <th className="p-4 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px]">
                    <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                      <td className="p-4">Conservative</td>
                      <td className="p-4 text-center text-[var(--error)]">{result.scenarios[0].rate}%</td>
                      <td className="p-4 text-right font-mono">{fmt(result.scenarios[0].fv)}</td>
                    </tr>
                    <tr className="bg-[var(--primary-light)]/50 text-[var(--primary)] font-black">
                      <td className="p-4">Target (Yours)</td>
                      <td className="p-4 text-center text-[var(--primary)]">{result.scenarios[1].rate}%</td>
                      <td className="p-4 text-right font-mono text-[var(--primary)]">{fmt(result.scenarios[1].fv)}</td>
                    </tr>
                    <tr className="text-[var(--text-secondary)]">
                      <td className="p-4">Aggressive</td>
                      <td className="p-4 text-center text-[var(--success)]">{result.scenarios[2].rate}%</td>
                      <td className="p-4 text-right font-mono">{fmt(result.scenarios[2].fv)}</td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is Rupee Cost Averaging?', answer: 'It is a technique where you invest a fixed amount of money at regular intervals. This means you buy more units when the NAV is low and fewer when it is high, bringing down the average cost over time.' },
          { question: 'How much should I step up annually?', answer: 'A common benchmark is 10%, aligning with average salary appraisals. This significantly combats inflation over long durations.' },
          { question: 'Is SIP better than Lumpsum?', answer: 'For most retail investors in Nepal, SIP is better as it removes the psychological risk of timing the highly volatile NEPSE index.' },
        ]} />
      }
    />
  );
}
