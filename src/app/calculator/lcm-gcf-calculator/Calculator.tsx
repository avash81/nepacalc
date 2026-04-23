'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Binary, Sigma, Info } from 'lucide-react';

export default function LcmGcfCalculator() {
  const [state, setState] = useSyncState('lcm_gcf_v3', { inputVal: '12, 18, 24' });
  const { inputVal } = state;
  const updateState = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const arr = inputVal.split(/[,\s]+/).map(s => parseInt(s)).filter(n => !isNaN(n) && n > 0);
    if (arr.length === 0) return null;
    const gcd2 = (a: number, b: number): number => b === 0 ? a : gcd2(b, a % b);
    const lcm2 = (a: number, b: number) => (a * b) / gcd2(a, b);
    const getPF = (n: number) => {
      let d = 2; const f = []; let t = n;
      while (t > 1) { while (t % d === 0) { f.push(d); t /= d; } d++; if (d * d > t) { if (t > 1) f.push(t); break; } }
      return f;
    };
    let gcf = arr[0], lcm = arr[0];
    for (let i = 1; i < arr.length; i++) { gcf = gcd2(gcf, arr[i]); lcm = lcm2(lcm, arr[i]); }
    return { lcm, gcf, nums: arr, factors: arr.map(n => ({ n, f: getPF(n) })) };
  }, [inputVal]);

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'LCM GCF Calculator' }]}
      title="LCM & GCF Calculator"
      description="Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF) for any set of numbers, complete with prime factorization steps."
      icon={Binary}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Enter Numbers (comma separated)</label>
            <textarea 
              value={inputVal} 
              onChange={e => updateState({ inputVal: e.target.value })}
              className="w-full h-32 p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] font-mono text-xl font-black focus:border-[#1A73E8] focus:bg-white focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all resize-none shadow-inner text-[#202124]"
              placeholder="e.g. 12, 18, 24" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Quick Practice Sets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Standard Set', data: '12, 18, 24' },
                { label: 'Primes Only', data: '7, 13, 19' },
                { label: 'Multiples', data: '15, 30, 45, 60' },
                { label: 'Large Ints', data: '120, 150, 200' },
              ].map(d => (
                <button key={d.label} onClick={() => updateState({ inputVal: d.data })}
                  className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-left flex justify-between items-center transition-all group">
                  <span className="text-[11px] font-bold text-[#202124]">{d.label}</span>
                  <span className="text-[10px] font-mono text-[#1A73E8] font-bold group-hover:underline">{d.data}</span>
                </button>
              ))}
            </div>
          </div>

          {r && (
            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Binary className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider">Prime Factorization</h3>
              </div>
              <div className="divide-y divide-[#DADCE0]">
                {r.factors.map(({ n, f }) => (
                  <div key={n} className="px-4 py-3 flex justify-between items-center">
                    <span className="text-sm font-black text-[#202124] w-12">{n}</span>
                    <span className="text-xs font-mono font-bold text-[#1A73E8] bg-[#E8F0FE] px-3 py-1 rounded">{f.length ? f.join(' × ') : 'Prime'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-6">
          {r ? (
            <>
              <div className="p-8 bg-white border border-[#DADCE0] rounded-lg text-center shadow-sm">
                <div className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider mb-2">Least Common Multiple</div>
                <div className="text-6xl font-black text-[#1A73E8] tracking-tighter font-mono break-all">{r.lcm.toLocaleString()}</div>
                <div className="mt-4 text-[10px] font-bold text-[#1A73E8] uppercase tracking-widest bg-[#E8F0FE] py-1 px-3 rounded inline-block">LCM</div>
              </div>

              <div className="p-8 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg text-center shadow-sm">
                <div className="text-[10px] font-bold uppercase text-[#0F5223] tracking-wider mb-2">Greatest Common Factor</div>
                <div className="text-6xl font-black text-[#188038] tracking-tighter font-mono break-all">{r.gcf.toLocaleString()}</div>
                <div className="mt-4 text-[10px] font-bold text-[#188038] uppercase tracking-widest bg-white/50 py-1 px-3 rounded inline-block">GCF / HCF</div>
              </div>

              {r.nums.length === 2 && (
                <div className="p-6 bg-[#1A1A2E] rounded-lg border border-[#DADCE0] text-white space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sigma className="w-4 h-4 text-[#8AB4F8]" />
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/70">Mathematical Identity Proof</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-white/50">LCM(a,b) × GCF(a,b) = a × b</p>
                    <div className="p-3 bg-white/10 rounded border border-white/20 font-mono text-sm text-[#8AB4F8] flex flex-wrap gap-2 items-center">
                      <span>{r.lcm} × {r.gcf}</span>
                      <span className="text-white">=</span>
                      <span className="text-white font-black">{(r.lcm * r.gcf).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-10 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center space-y-3">
               <Info className="w-8 h-8 text-[#70757A] mx-auto" />
               <p className="text-sm font-bold text-[#70757A]">Awaiting input... enter numbers separated by commas to begin calculation.</p>
            </div>
          )}
        </div>
      }
      howToUse={{ steps: ["Enter two or more positive numbers in the input box, separated by commas or spaces.", "The calculator instantly processes the data as you type.", "View the Least Common Multiple (LCM) at the top.", "View the Greatest Common Factor (GCF/HCF) immediately below.", "Check the prime factorization breakdown on the left to understand how the numbers are composed."] }}
      formula={{ title: "Euclidean Algorithm", description: "Standard recursive logic for GCF.", raw: "GCF(a, 0) = a\nGCF(a, b) = GCF(b, a mod b)\n\nLCM Calculation:\nLCM(a, b) = (a × b) / GCF(a, b)\n\nFor multiple numbers, the algorithm is applied iteratively: LCM(a,b,c) = LCM(LCM(a,b), c)." }}
      faqs={[
        { question: "What is the difference between GCF and HCF?", answer: "Nothing. Greatest Common Factor (GCF) and Highest Common Factor (HCF) are two different names for the exact same mathematical concept." },
        { question: "Why does the mathematical proof only show for two numbers?", answer: "The identity rule 'LCM × GCF = Product of Numbers' is strictly true only for two numbers. It mathematically breaks down when applied to three or more numbers." }
      ]}
      sidebar={{ title: "Pure Mathematics", links: [{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }, { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction" }], banner: { title: "Math Fact", description: "Prime factorization is the foundation of modern cryptography.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }]}
    />
  );
}
