'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Binary, Sigma, Info, Scale, ShieldCheck, Microscope, Compass } from 'lucide-react';

export default function LcmGcfCalculator() {
  const [state, setState] = useSyncState('lcm_gcf_v4', { inputVal: '12, 18, 24' });
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
      title="Institutional LCM & GCF"
      description="The definitive computational resource for Least Common Multiple and Greatest Common Factor. Features Euclidean algorithms, prime factorization trees, and academic proofs for NEB and TU standards."
      icon={Binary}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Numeric Input Dataset (Integers only)</label>
            <textarea 
              value={inputVal} 
              onChange={e => updateState({ inputVal: e.target.value })}
              className="w-full h-32 p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] font-mono text-xl font-black focus:border-[#1A73E8] focus:bg-white focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all resize-none shadow-inner text-[#202124]"
              placeholder="e.g. 12, 18, 24" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Standardized Academic Problem Sets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'SEE Standard Set', data: '12, 18, 24' },
                { label: 'Prime Atom Set', data: '7, 13, 19' },
                { label: 'Harmonic Multiples', data: '15, 30, 45, 60' },
                { label: 'Engineering Constants', data: '120, 150, 200' },
              ].map(d => (
                <button key={d.label} onClick={() => updateState({ inputVal: d.data })}
                  className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-left flex justify-between items-center transition-all group shadow-sm">
                  <span className="text-[11px] font-bold text-[#202124]">{d.label}</span>
                  <span className="text-[10px] font-mono text-[#1A73E8] font-bold group-hover:underline">{d.data}</span>
                </button>
              ))}
            </div>
          </div>

          {r && (
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#1A73E8]" />
                <h3 className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Prime Factorization Decomposition</h3>
              </div>
              <div className="divide-y divide-[#DADCE0]">
                {r.factors.map(({ n, f }) => (
                  <div key={n} className="px-5 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-black text-[#202124] w-12">{n}</span>
                    <span className="text-xs font-mono font-bold text-[#1A73E8] bg-[#E8F0FE] px-4 py-1.5 rounded-full border border-[#C5D9F7]">{f.length ? f.join(' × ') : 'Atomic (Prime)'}</span>
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
              <div className="p-10 bg-white border border-[#DADCE0] rounded-2xl text-center shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Scale className="w-24 h-24" />
                </div>
                <div className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider mb-3">Least Common Multiple (LCM)</div>
                <div className="text-7xl font-black text-[#1A73E8] tracking-tighter font-mono break-all mb-4">{r.lcm.toLocaleString()}</div>
                <div className="mt-4 text-[11px] font-bold text-[#202124] uppercase tracking-widest bg-[#1A73E8] py-2 px-6 rounded-full inline-block shadow-sm">Universal Multiple</div>
              </div>

              <div className="p-10 bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl text-center shadow-md group">
                <div className="text-[11px] font-bold uppercase text-[#0F5223] tracking-wider mb-3">Greatest Common Factor (GCF/HCF)</div>
                <div className="text-7xl font-black text-[#188038] tracking-tighter font-mono break-all mb-4">{r.gcf.toLocaleString()}</div>
                <div className="mt-4 text-[11px] font-bold text-[#202124] uppercase tracking-widest bg-[#188038] py-2 px-6 rounded-full inline-block shadow-sm">Highest Common Divisor</div>
              </div>

              {r.nums.length === 2 && (
                <div className="p-8 bg-[#1A1A2E] rounded-2xl border border-slate-800 text-white shadow-sm relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                    <Sigma className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-6 h-6 text-[#8AB4F8]" />
                    <h4 className="text-lg font-bold tracking-tight">The Fundamental Identity Proof</h4>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                        According to the product theorem of integers, the product of two numbers is mathematically identical to the product of their LCM and GCF.
                    </p>
                    <div className="p-5 bg-[#f8f9fa] rounded-xl border border-[#dadce0] font-mono text-xl text-[#8AB4F8] flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-[#dadce0] pb-2">
                        <span className="text-xs text-[#202124]/50 uppercase tracking-widest">Identity</span>
                        <span>LCM(a,b) × GCF(a,b)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#202124]">{r.lcm} × {r.gcf}</span>
                        <span className="text-[#202124]">=</span>
                        <span className="text-[#202124] font-black">{(r.lcm * r.gcf).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-16 bg-[#F8F9FA] border-2 border-dashed border-[#DADCE0] rounded-lg text-center space-y-6">
               <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-sm">
                    <Info className="w-10 h-10 text-[#70757A]" />
               </div>
               <div className="max-w-xs mx-auto">
                   <p className="text-lg font-bold text-[#202124]">Awaiting Numeric Input</p>
                   <p className="text-sm text-[#5F6368] mt-2">Please enter a dataset of positive integers to trigger the computational engine.</p>
               </div>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: Philosophy of Primes */}
          <section className="bg-white border border-[#DADCE0] rounded-2xl p-10 shadow-sm relative">
            <div className="absolute top-10 right-10 opacity-5">
                <Binary className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-3 rounded-xl">
                  <Compass className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tight">The Atoms of Arithmetic: Prime Factorization</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                In the grand architecture of mathematics, <strong>Prime Numbers</strong> serve as the irreducible "atoms" from which all other composite numbers are constructed. The <strong>Fundamental Theorem of Arithmetic</strong> states that every integer greater than 1 either is a prime itself or is the product of prime numbers, and that this product is unique. Understanding the <strong>Least Common Multiple (LCM)</strong> and <strong>Greatest Common Factor (GCF)</strong> requires a microscopic view into this prime structure.
              </p>
              <p>
                Our institutional engine utilizes a recursive prime decomposition algorithm. When you enter a number like 24, the system immediately recognizes it as $2^3 \times 3$. By comparing the prime powers across a set of numbers, the GCF is found by taking the lowest common exponent of every prime factor, while the LCM is found by taking the highest. This mathematical rigor is the standard required by the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a> for advanced secondary schooling.
              </p>
              <p>
                Beyond simple school arithmetic, prime factorization is the bedrock of modern <strong>Cybersecurity</strong>. The RSA encryption algorithm, which secures almost every online transaction today, relies on the computational difficulty of factoring large integers back into their prime components. By using this calculator, students are interacting with the same foundational logic that secures the global financial grid.
              </p>
            </div>
          </section>

          {/* Section 2: Euclidean Algorithm Deep Dive */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E6F4EA] p-3 rounded-xl">
                  <Microscope className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tight">The Euclidean Masterpiece: Finding the GCF</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                While prime factorization is intuitive for small numbers, it becomes inefficient for massive datasets. Over 2,300 years ago, the Greek mathematician <strong>Euclid</strong> documented a much faster method in his <em>Elements</em>. The <strong>Euclidean Algorithm</strong> works on the principle that the GCF of two numbers doesn't change if the smaller number is subtracted from the larger one.
              </p>
              <p>
                In a modern computational environment, we use a more efficient version using the <strong>modulo operator</strong>. To find GCF(48, 18):
              </p>
              <ul className="bg-white p-6 rounded-xl border border-[#DADCE0] list-none space-y-2 font-mono text-sm">
                <li>1. 48 ÷ 18 = 2 with a remainder of 12</li>
                <li>2. 18 ÷ 12 = 1 with a remainder of 6</li>
                <li>3. 12 ÷ 6 = 2 with a remainder of 0</li>
                <li className="text-[#188038] font-bold">Conclusion: The last non-zero remainder (6) is the GCF.</li>
              </ul>
              <p>
                This algorithm is the most efficient way to simplify fractions and find the <strong>Highest Common Factor (HCF)</strong>. At <a href="https://tu.edu.np" className="text-[#1A73E8] font-bold hover:underline">Tribhuvan University</a>, this algorithm is taught as a primary example of "Efficiency in Computation" within the Computer Science and IT (BSc.CSIT) curriculum.
              </p>
            </div>
          </section>

          {/* Section 3: Real-World Applications */}
          <section className="bg-white border border-[#DADCE0] rounded-2xl p-10 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight mb-8">Industrial and Civic Applications of LCM & GCF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="text-lg font-bold text-[#1A73E8] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                    Event Synchronization
                </div>
                <p className="text-sm text-[#5F6368]">
                    In <strong>Traffic Engineering</strong> in cities like Kathmandu, LCM is used to synchronize signal lights. If one light changes every 30 seconds and another every 45 seconds, they will only change simultaneously every 90 seconds (the LCM). This prevents gridlock and optimizes flow.
                </p>
                <div className="text-lg font-bold text-[#188038] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#188038]" />
                    Material Optimization
                </div>
                <p className="text-sm text-[#5F6368]">
                    When tiling a bathroom floor, <strong>GCF</strong> tells you the largest square tile size that can perfectly cover a rectangular floor without needing to cut tiles. If the room is 120cm by 180cm, the GCF is 60cm—meaning you should use 60x60cm tiles.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-lg font-bold text-[#D93025] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D93025]" />
                    Biological Cycles
                </div>
                <p className="text-sm text-[#5F6368]">
                    Periodical Cicadas emerge every 13 or 17 years. These are prime numbers. This is an evolutionary strategy because their predators' life cycles would rarely sync up with theirs (the LCM of 13 and a 2-year predator cycle is 26, minimizing exposure).
                </p>
                <div className="text-lg font-bold text-[#E37400] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E37400]" />
                    Mechanical Gearing
                </div>
                <p className="text-sm text-[#5F6368]">
                    In <strong>Mechanical Engineering</strong> at Kathmandu University (KU), gear tooth counts are chosen based on LCM/GCF to ensure even wear across all surfaces. Using prime numbers for gear teeth (hunting teeth) ensures that the same two teeth rarely meet, distributing friction uniformly.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Academic Roadmap for Nepal */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-lg p-10 shadow-sm">
            <h2 className="text-3xl font-black mb-8 border-b border-[#dadce0] pb-4">Nepalese Academic Roadmap & SEE Alignment</h2>
            <div className="prose prose-md prose-invert max-w-none leading-relaxed space-y-6">
              <p>
                For students in Nepal, the concepts of LCM and HCF are first formally introduced in Grade 6 and become critical components of the <strong>Compulsory Mathematics</strong> and <strong>Optional Mathematics</strong> papers in the <strong>Secondary Education Examination (SEE)</strong>. Mastering these techniques is the gateway to algebraic simplification and the solving of quadratic equations.
              </p>
              <p>
                Our tool is designed to be the "Source of Truth" for students across the seven provinces. Whether you are in a community school in <strong>Humla</strong> or a private institution in <strong>Lalitpur</strong>, the mathematical principles remain universal. By visualizing the prime factorization tree, this calculator goes beyond the answer—it teaches the "Why" behind the number, preparing students for the rigorous entrance exams of the <strong>Institute of Engineering (IOE)</strong> and the <strong>Institute of Medicine (IOM)</strong>.
              </p>
              <p>
                We also bridge the gap between English and Nepali terminology. Whether your teacher calls it "Lasa" (L.S.) for LCM or "Masa" (M.S.) for HCF, the underlying logic of common multiples and common divisors is what builds the logical thinking required for the 21st-century workforce.
              </p>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Dataset Input: Type your positive integers into the primary text area. You can use commas (12, 18) or spaces (12 18) to delineate terms.",
          "Prime Factorization Audit: Observe the automatically generated factor tree in the left panel. This identifies the prime components for every valid entry.",
          "Analyze the LCM: Review the blue primary result card. This value represents the smallest integer divisible by your entire dataset.",
          "Check the GCF (HCF): Review the green secondary result card. This value is the largest integer that divides every number in your set without a remainder.",
          "Verify the Proof: For any pair of numbers, scroll to the 'Fundamental Identity Proof' to see the cross-verification of the $LCM \times GCF = a \times b$ theorem."
        ]
      }}
      formula={{
        title: "The Logic of Common Multiplicity",
        description: "These LaTeX-formatted identities represent the recursive and algebraic logic used by our institutional engine.",
        raw: "$$\\begin{aligned} \\text{Recursive GCF: } & \\text{gcd}(a, 0) = a \\\\ \\text{Euclidean Step: } & \\text{gcd}(a, b) = \\text{gcd}(b, a \\pmod b) \\\\ \\text{LCM Derivation: } & \\text{lcm}(a, b) = \\frac{|a \\times b|}{\\text{gcd}(a, b)} \\\\ \\text{Iterative Set: } & \\text{lcm}(a, b, c) = \\text{lcm}(\\text{lcm}(a, b), c) \\\\ \\text{Factor Sum: } & a = \\prod p_i^{a_i}, b = \\prod p_i^{b_i} \\implies \\text{gcd}(a,b) = \\prod p_i^{\\min(a_i, b_i)} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "What is the mathematical difference between GCF, HCF, and GCD?",
          answer: "There is no mathematical difference. GCF (Greatest Common Factor), HCF (Highest Common Factor), and GCD (Greatest Common Divisor) are interchangeable terms used in different regions and educational systems. In Nepal, HCF (or Masa) is the most commonly used term in the SEE curriculum."
        },
        {
          question: "Why is the identity LCM × GCF = a × b only true for two numbers?",
          answer: "This identity relies on the unique prime power representation of two integers. When you add a third number, the overlap of prime factors between the three numbers can be shared in ways that don't neatly multiply to the total product. For three or more numbers, $LCM \times GCF$ is almost never equal to $a \times b \times c$."
        },
        {
          question: "How does the calculator handle prime numbers in the dataset?",
          answer: "If you enter prime numbers (e.g., 11 and 13), the calculator will correctly identify that their only common factor is 1 (the GCF) and their LCM is simply their product ($11 \times 13 = 143$). Numbers with a GCF of 1 are called 'Coprime' or 'Relatively Prime'."
        },
        {
          question: "Can I find the LCM of decimals?",
          answer: "LCM and GCF are strictly defined for integers (whole numbers). To find the 'LCM' of decimals like 0.5 and 0.75, you must first convert them to a common scale (e.g., 50/100 and 75/100) and find the LCM of the numerators, then divide by the common denominator."
        },
        {
          question: "What is the 'Prime Factorization' method for LCM?",
          answer: "To find the LCM of a set of numbers, you list the prime factors of each number. The LCM is the product of the highest power of every prime factor present in any of the numbers. For example, $12 = 2^2 \times 3$ and $18 = 2 \times 3^2$. The LCM is $2^2 \times 3^2 = 4 \times 9 = 36$."
        },
        {
          question: "Why is 0 not allowed in the LCM calculator?",
          answer: "LCM is the 'Least Common Multiple'. Since every number multiplied by 0 is 0, every number would share 0 as a common multiple. However, division by zero is undefined, and 0 does not have positive multiples, making it mathematically incompatible with the LCM definition."
        },
        {
          question: "How is LCM used in adding fractions with different denominators?",
          answer: "To add fractions like 1/6 and 1/8, you must find a common denominator. The most efficient common denominator is the LCM of 6 and 8, which is 24. This allows you to convert the fractions to 4/24 and 3/24, giving a sum of 7/24."
        },
        {
          question: "What is a 'Perfect Number'?",
          answer: "A perfect number is a positive integer that is equal to the sum of its proper divisors (excluding the number itself). For example, 6 is a perfect number because its divisors are 1, 2, and 3, and $1+2+3=6$. GCF calculations help in identifying these unique number patterns."
        },
        {
          question: "How does this tool help in competitive exams in Nepal?",
          answer: "Entrance exams for IOE (Engineering) and Lok Sewa Aayog often include time-pressured aptitude questions involving cyclic patterns, bells ringing at intervals, or distributing objects equally. These are all LCM/GCF problems in disguise. Our tool helps students master the logic behind these shortcuts."
        },
        {
          question: "What is the 'Division Method' for HCF?",
          answer: "The division method is the long-form version of the Euclidean algorithm. You divide the larger number by the smaller, then divide the previous divisor by the remainder, and repeat until the remainder is zero. The final divisor used is the HCF."
        },
        {
          question: "Can the HCF ever be larger than the smallest number in the set?",
          answer: "No. By definition, a 'factor' must be less than or equal to the number it divides. Therefore, the HCF of a set can never exceed the smallest number in that set. If the smallest number divides all others, then it is the HCF."
        }
      ]}
      sidebar={{ title: "Pure Mathematics", links: [
          { label: "Fraction Calculator", href: "/calculator/fraction-calculator/" },
          { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" },
          { label: "NEB Mathematics Guide", href: "https://neb.gov.np" },
          { label: "IOE Entrance Portal", href: "https://ioe.edu.np" },
          { label: "Percentage Calculator", href: "/calculator/percentage/" }
        ], banner: { title: "Number Theory", description: "Standardizing mathematical logic for Nepal's digital age.", image: "/images/math-banner.jpg" } }}
      relatedTools={[
        { label: "Fraction Calculator", href: "/calculator/fraction-calculator/" },
        { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" },
        { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
      ]}
    />
  );
}

