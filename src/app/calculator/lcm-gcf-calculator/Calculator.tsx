'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { Binary, ListChecks, Sigma, Info } from 'lucide-react';

const DEFAULT_STATE = {
  inputVal: '12, 18, 24',
};

export default function LcmGcfCalculator() {
  const [state, setState] = useSyncState('lcm_gcf_v2', DEFAULT_STATE);
  const { inputVal } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const arr = inputVal.split(/[,\s]+/).map(s => parseInt(s)).filter(n => !isNaN(n) && n > 0);
    if (arr.length === 0) return null;
    const gcd2 = (a: number, b: number): number => b === 0 ? a : gcd2(b, a % b);
    const lcm2 = (a: number, b: number) => (a * b) / gcd2(a, b);
    const getPF = (n: number) => {
      let d = 2; const f = []; let t = n;
      while (t > 1) { while (t % d === 0) { f.push(d); t /= d; } d++; if (d*d > t) { if (t > 1) f.push(t); break; } }
      return f;
    };
    let gcf = arr[0], lcm = arr[0];
    for (let i = 1; i < arr.length; i++) { gcf = gcd2(gcf, arr[i]); lcm = lcm2(lcm, arr[i]); }
    return { lcm, gcf, nums: arr, factors: arr.map(n => ({ n, f: getPF(n) })) };
  }, [inputVal]);

  return (
    <CalculatorLayout
      title="LCM & GCF Calculator"
      description="Calculate the Least Common Multiple and Greatest Common Factor for any set of numbers with full prime factorization steps."
      category={{ label: 'Mathematics', href: '/calculator/category/math' }}
      leftPanel={
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Enter Numbers (comma separated)</label>
            <textarea 
              value={inputVal} 
              onChange={e => updateState({ inputVal: e.target.value })}
              className="w-full h-32 p-6 border-2 border-slate-100 rounded-3xl bg-slate-50 font-mono text-xl font-bold focus:border-blue-500 focus:bg-white outline-none transition-all resize-none shadow-inner"
              placeholder="e.g. 12, 18, 24" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Quick Practice Sets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Standard Set', data: '12, 18, 24' },
                { label: 'Primes Only', data: '7, 13, 19' },
                { label: 'Multiples', data: '15, 30, 45, 60' },
                { label: 'Large Ints', data: '120, 150, 200' },
              ].map(d => (
                <button key={d.label} onClick={() => updateState({ inputVal: d.data })}
                  className="p-4 border border-slate-100 bg-white rounded-2xl hover:border-blue-500 hover:shadow-md text-left flex justify-between items-center transition-all group">
                  <span className="text-[11px] font-bold text-slate-700">{d.label}</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold opacity-60 group-hover:opacity-100">{d.data}</span>
                </button>
              ))}
            </div>
          </div>

          {r && (
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                <Binary className="w-4 h-4 text-blue-600" />
                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Prime Factors</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {r.factors.map(({ n, f }) => (
                  <div key={n} className="px-6 py-4 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-black text-slate-900">{n}</span>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{f.join(' × ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          {r ? (
            <>
              <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-lg shadow-blue-500/5 group">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Least Common Multiple</div>
                <div className="text-7xl font-black text-blue-600 tracking-tighter font-mono group-hover:scale-105 transition-transform">{r.lcm.toLocaleString()}</div>
                <div className="mt-4 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] bg-blue-50 py-1 rounded-full inline-block px-4">LCM</div>
              </div>

              <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center shadow-lg shadow-emerald-500/5 group border-b-8 border-b-emerald-50">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Greatest Common Factor</div>
                <div className="text-7xl font-black text-emerald-600 tracking-tighter font-mono group-hover:scale-105 transition-transform">{r.gcf.toLocaleString()}</div>
                <div className="mt-4 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] bg-emerald-50 py-1 rounded-full inline-block px-4">GCF / HCF</div>
              </div>

              {r.nums.length === 2 && (
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sigma className="w-4 h-4 text-blue-400" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mathematical Proof</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-300">LCM(a,b) × GCF(a,b) = a × b</p>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 font-mono text-xs text-blue-400">
                      {r.lcm} × {r.gcf} = <span className="text-white font-black">{(r.lcm * r.gcf).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-10 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] text-center space-y-3">
               <Info className="w-8 h-8 text-amber-500 mx-auto" />
               <p className="text-sm font-bold text-amber-700">Awaiting input... enter numbers to begin calculation.</p>
            </div>
          )}
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'How is LCM calculated?', answer: 'LCM is found by identifying the largest multiple shared by all given numbers. Mathmatically, it is (a*b)/GCF(a,b).' },
          { question: 'What is the GCF?', answer: 'The Greatest Common Factor is the largest positive integer that divides each of the integers without a remainder.' },
        ]} />
      }
    />
  );
}
