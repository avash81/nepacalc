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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Number Theory: Understanding LCM and GCF</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In fundamental number theory, understanding the relationships between integers relies heavily on two primary metrics: the Least Common Multiple (LCM) and the Greatest Common Factor (GCF), also known as the Highest Common Factor (HCF). Our <strong className="text-[#202124]">lcm and gcf calculator</strong> is designed not only to output the final mathematical result but to expose the underlying prime factorization mechanics that drive these calculations.
              </p>
              <p>
                The <strong className="text-[#202124]">Greatest Common Factor</strong> is the largest positive integer that divides each of the numbers without leaving a remainder. It is the building block for simplifying fractions. Conversely, the <strong className="text-[#202124]">Least Common Multiple</strong> is the smallest positive integer that is uniformly divisible by each of the numbers in the set. LCM is critical when finding common denominators in fraction arithmetic or aligning cyclic schedules.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Algorithmic Computation Methods</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Euclidean Algorithm:</strong> To compute the GCF rapidly, this calculator utilizes the Euclidean Algorithm. Instead of factoring both numbers (which is computationally expensive for large integers), it recursively divides the larger number by the smaller number until the remainder is zero. The last non-zero remainder is the definitive GCF.</li>
              <li><strong className="text-[#188038]">The LCM Identity:</strong> Once the GCF is established, calculating the LCM for two numbers is a direct algebraic derivation: <code className="bg-[#F1F3F4] px-1 rounded">LCM(a,b) = (|a × b|) / GCF(a,b)</code>. This method guarantees absolute precision without needing to generate long lists of multiples.</li>
              <li><strong className="text-[#D93025]">Prime Factorization Decomposition:</strong> The calculator also breaks down every input integer into its fundamental prime components. According to the Fundamental Theorem of Arithmetic, every integer greater than 1 is either a prime itself or can be uniquely represented as a product of prime numbers. The visual breakdown helps students cross-verify the LCM/GCF logically.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your numbers in the large text area. You can separate them using commas or spaces.",
          "As you type, the engine instantly computes the Least Common Multiple (LCM) in the blue card.",
          "The Greatest Common Factor (GCF/HCF) is displayed simultaneously in the green card.",
          "Check the left panel to view the exact Prime Factorization tree for every valid integer you entered.",
          "If you entered exactly two numbers, review the 'Mathematical Identity Proof' block to see how the numbers geometrically relate."
        ]
      }}
      formula={{
        title: "Euclidean Algorithm & LCM Derivation",
        description: "The core recursive logic used by computational engines.",
        raw: "GCF Calculation (Recursive):\nGCF(a, 0) = a\nGCF(a, b) = GCF(b, a mod b)\n\nLCM Calculation:\nLCM(a, b) = (a × b) / GCF(a, b)\n\nIterative Application (for multiple inputs):\nLCM(a, b, c) = LCM(LCM(a, b), c)"
      }}
      faqs={[
        {
          question: "What is the difference between GCF and HCF?",
          answer: "There is absolutely no mathematical difference. Greatest Common Factor (GCF) and Highest Common Factor (HCF) are simply regional naming variations for the exact same mathematical concept."
        },
        {
          question: "Why does the mathematical proof block only appear for two numbers?",
          answer: "The identity theorem stating that 'LCM(a,b) × GCF(a,b) = a × b' is strictly true only for a pair of numbers. If you apply this rule to three or more numbers, the algebra breaks down and the equation is no longer valid."
        },
        {
          question: "How does the calculator handle prime numbers?",
          answer: "If you input a set of prime numbers (e.g., 7, 13, 19), the calculator will immediately identify that they have no common divisors other than 1. Thus, their GCF will be 1, and their LCM will simply be the product of all the numbers."
        },
        {
          question: "What is Prime Factorization?",
          answer: "Prime factorization is the process of breaking a composite number down into the set of prime numbers that, when multiplied together, yield the original number. For example, the prime factorization of 12 is 2 × 2 × 3."
        },
        {
          question: "Can I calculate the LCM of negative numbers?",
          answer: "Mathematically, the LCM and GCF are defined exclusively for positive integers. Our algorithm automatically filters out negative inputs and non-integers (decimals) to ensure mathematical integrity."
        },
        {
          question: "Why is the LCM used in adding fractions?",
          answer: "To add fractions with different denominators (like 1/4 and 1/6), you must find a common base. The LCM of the denominators (which is 12) provides the smallest, most efficient common base (the Lowest Common Denominator) to perform the addition."
        }
      ]}
      sidebar={{ title: "Pure Mathematics", links: [{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }, { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction" }], banner: { title: "Math Fact", description: "Prime factorization is the foundation of modern cryptography.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }]}
    />
  );
}
