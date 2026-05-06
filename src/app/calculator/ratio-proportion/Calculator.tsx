'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Scale, TrendingUp, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Target, Binary, Award, BoxSelect } from 'lucide-react';

export default function RatioProportion() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [c, setC] = useState('10');
  const [d, setD] = useState('');

  const result = useMemo(() => {
    const na = parseFloat(a), nb = parseFloat(b), nc = parseFloat(c), nd = parseFloat(d);
    if (isNaN(na)) return { label: 'A', val: !isNaN(nb*nc/nd) ? ((nb*nc)/nd).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nb)) return { label: 'B', val: !isNaN(na*nd/nc) ? ((na*nd)/nc).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nc)) return { label: 'C', val: !isNaN(na*nd/nb) ? ((na*nd)/nb).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nd)) return { label: 'D', val: !isNaN(nb*nc/na) ? ((nb*nc)/na).toFixed(4).replace(/\.0000$/, '') : '?' };
    return { label: '?', val: 'No unknown' };
  }, [a, b, c, d]);

  const boxCls = (v: string) => `h-20 w-full text-center text-4xl font-black font-mono border rounded-2xl focus:ring-1 outline-none transition-all ${v === '' ? 'border-dashed border-[#1A73E8] bg-[#E8F0FE]/30 text-[#1A73E8] placeholder-[#1A73E8]/40 focus:border-[#1A73E8] focus:ring-[#1A73E8]' : 'border-[#DADCE0] bg-white focus:border-[#1A73E8] focus:ring-[#1A73E8] text-[#202124]'}`;

  return (
    <ModernCalcLayout
      slug="ratio-proportion"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Ratio Calculator' }]}
      title="Institutional Ratio & Proportion"
      description="The definitive engine for equivalent ratios and algebraic scaling. Solve proportions (A:B = C:D) with precision. Fully aligned with NEB standards, engineering scaling, and financial analytics."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="p-6 bg-white border border-[#DADCE0] rounded-3xl shadow-sm space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-[#1A73E8]" />
                <span className="text-[11px] font-black uppercase text-[#202124] tracking-widest">Interactive Solving Matrix</span>
             </div>
             <div className="grid grid-cols-11 gap-2 items-center">
                <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-bold text-[#70757A] text-center block uppercase tracking-tighter">Value A</label>
                    <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="?" className={boxCls(a)} />
                </div>
                <div className="col-span-1 text-center text-4xl font-black text-[#DADCE0] pb-1">:</div>
                <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-bold text-[#70757A] text-center block uppercase tracking-tighter">Value B</label>
                    <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="?" className={boxCls(b)} />
                </div>
                <div className="col-span-1 text-center text-5xl font-black text-[#1A73E8] pb-2">=</div>
                <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-bold text-[#70757A] text-center block uppercase tracking-tighter">Value C</label>
                    <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="?" className={boxCls(c)} />
                </div>
                <div className="col-span-1 text-center text-4xl font-black text-[#DADCE0] pb-1">:</div>
                <div className="col-span-2 space-y-2">
                    <label className="text-[9px] font-bold text-[#70757A] text-center block uppercase tracking-tighter">Value D</label>
                    <input type="number" value={d} onChange={e => setD(e.target.value)} placeholder="?" className={boxCls(d)} />
                </div>
             </div>
             <p className="text-[10px] text-[#70757A] italic text-center font-medium mt-4">Leave exactly one field empty to trigger the cross-multiplication engine.</p>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#F1F3F4]">
            <label className="text-[10px] font-black uppercase text-[#70757A] tracking-[0.2em]">Institutional Scaling Presets</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Recipe Doubling',  a:'1', b:'2', c:'3.5', d:'' },
                { label: 'Topological Map (1:50k)',     a:'1', b:'50000', c:'12', d:'' },
                { label: 'Screen Aspect (16:9)',   a:'16', b:'9', c:'1920', d:'' },
              ].map(ex => (
                <button key={ex.label} onClick={() => { setA(ex.a); setB(ex.b); setC(ex.c); setD(ex.d); }}
                  className="p-4 border border-[#DADCE0] rounded-2xl bg-white hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-center transition-all shadow-sm group">
                  <span className="block text-[11px] font-black text-[#202124] mb-2 uppercase tracking-tight group-hover:text-[#1A73E8]">{ex.label}</span>
                  <span className="text-[10px] font-mono text-[#70757A] bg-[#F1F3F4] px-2 py-0.5 rounded">{ex.a}:{ex.b} = {ex.c||'?'}:{ex.d||'?'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-12 bg-white border border-[#DADCE0] rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BoxSelect className="w-32 h-32" />
            </div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#1A73E8] mb-6">Equivalency Value for {result.label}</div>
            <div className="text-8xl lg:text-9xl font-black text-[#202124] tracking-tighter font-mono mb-8">{result.val}</div>
            {result.val === 'No unknown' ? (
              <div className="text-[10px] font-black text-[#D93025] bg-[#FCE8E6] inline-block px-6 py-2 rounded-full border border-[#D93025]/10">Logic Error: Populate 3 of 4 variables</div>
            ) : (
              <div className="inline-flex gap-4 items-center text-xs font-black text-[#202124] bg-[#F8F9FA] px-8 py-4 rounded-3xl border border-[#DADCE0] shadow-sm">
                <span>{a || result.val} : {b || result.val}</span>
                <span className="text-[#1A73E8] text-xl">≡</span>
                <span>{c || result.val} : {d || result.val}</span>
              </div>
            )}
          </div>

          <div className="p-6 bg-[#E8F0FE] border border-[#C5D9F7] rounded-3xl flex items-center gap-4 shadow-sm">
             <Scale className="w-6 h-6 text-[#1A73E8] shrink-0" />
             <div>
                <div className="text-[10px] font-black uppercase text-[#1A73E8] mb-1 tracking-widest">Cross-Multiplication Theorem</div>
                <p className="text-xs text-[#202124] font-bold">Algebraic Identity: $A \times D = B \times C$</p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: The Philosophy of Relationship */}
          <section className="bg-white border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <History className="w-64 h-64" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                  <Landmark className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">Harmony in Numbers: The Foundation of Proportion</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                In the grand architecture of the universe, ratios are the invisible threads that maintain balance and harmony. A <strong>Ratio</strong> is a mathematical comparison of two quantities, expressing how many times one number contains another. When two ratios are identical in value, they form a <strong>Proportion</strong> ($A:B = C:D$). This concept is the cornerstone of scaling, whether it is the biological proportions of the human body or the structural scaling of a skyscraper.
              </p>
              <p>
                In the Nepalese context, understanding ratios is vital for everything from the ancient <strong>Vastu Shastra</strong> principles used in temple architecture (like the pagoda style of <strong>Patan Durbar Square</strong>) to the modern engineering blueprints of the <strong>Upper Tamakoshi Hydropower Project</strong>. Proportions allow engineers to translate a 1:100 scale drawing into a massive physical structure without losing mathematical integrity.
              </p>
              <p>
                Our <strong>Institutional Ratio & Proportion Encyclopedia</strong> is designed to act as the primary solving engine for students and professionals. Aligned with the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">NEB (National Examination Board)</a> secondary curriculum, it provides the "Scientific Benchmark" for solving complex algebraic equivalencies instantly.
              </p>
            </div>
          </section>

          {/* Section 2: Geometric Similitude */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                  <Microscope className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The Cross-Multiplication Identity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
              <div className="space-y-6">
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#1A73E8] pl-5 mb-4">The Equality of Means and Extremes</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        In any true proportion, the product of the "extremes" ($A$ and $D$) must equal the product of the "means" ($B$ and $C$). This is the fundamental theorem that allows us to solve for an unknown variable. If you are resizing an image to 800px width while keeping a 16:9 aspect ratio, the engine solves $16:9 = 800:x$ by calculating $(9 \times 800) / 16 = 450$.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#188038] pl-5 mb-4">Topological Map Scaling</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        For trekkers in the <strong>Annapurna Circuit</strong> or <strong>Everest Base Camp</strong>, map scaling is a life skill. A standard topological map with a 1:50,000 scale means 1 cm on the map equals 50,000 cm (500 meters) on the ground. Proportional math allows you to accurately predict walking distances between altitude markers.
                    </p>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-inner border border-[#DADCE0] space-y-6">
                    <h4 className="text-lg font-black text-[#202124]">Algebraic Permutations</h4>
                    <ul className="space-y-4 text-[#5F6368] font-mono text-xs">
                        <li className="flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0]">
                            <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                            <span>Solve $A = (B \times C) / D$</span>
                        </li>
                        <li className="flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0]">
                            <div className="w-2 h-2 rounded-full bg-[#188038]" />
                            <span>Solve $B = (A \times D) / C$</span>
                        </li>
                        <li className="flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0]">
                            <div className="w-2 h-2 rounded-full bg-[#D93025]" />
                            <span>Solve $C = (A \times D) / B$</span>
                        </li>
                        <li className="flex items-center gap-3 bg-[#F8F9FA] p-3 rounded-xl border border-[#DADCE0]">
                            <div className="w-2 h-2 rounded-full bg-[#E37400]" />
                            <span>Solve $D = (B \times C) / A$</span>
                        </li>
                    </ul>
                </div>
            </div>
          </section>

          {/* Section 3: Academic Significance */}
          <section className="bg-white border border-[#DADCE0] rounded-[2.5rem] p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FEF7E0] p-4 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-[#F29900]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Institutional Alignment: NEB and TU Engineering</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                Ratio and Proportion are foundational chapters in the <strong>Compulsory Mathematics</strong> syllabus of the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">NEB</a> Grade 10 examination (SEE). The concept is further expanded in Grade 11/12 through <strong>Coordinate Geometry</strong> and <strong>Trigonometry</strong>, where ratios like Sine, Cosine, and Tangent define the relationships between sides of a triangle.
              </p>
              <p>
                At the university level, specifically at the <strong>Institute of Engineering (IOE), Pulchowk</strong>, ratios are used in "Strength of Materials" to calculate the Poisson's ratio and in "Fluid Mechanics" for the Reynolds number. In <strong>Business Studies (BBS/BBA)</strong>, "Ratio Analysis" is the primary method for evaluating the liquidity and profitability of a company by comparing assets to liabilities.
              </p>
              <p>
                Our tool serves as a "Mathematical Ledger," allowing students to verify their complex multi-step problems instantly. Whether solving for the unknown variable in a chemistry mixture or determining the currency exchange value for the <strong>Nepal Rastra Bank</strong> daily rates, our engine provides absolute precision.
              </p>
            </div>
          </section>

          {/* Section 4: Real-World Scenarios */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 opacity-10">
                <TrendingUp className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black mb-10 border-b border-white/10 pb-6 tracking-tighter">Industrial Topology & Practical Utility</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#1A73E8] shrink-0" />
                        <p>
                            <strong>Culinary Scaling:</strong> Chefs in Kathmandu's boutique hotels use proportions to scale recipes for 100+ guests while maintaining the exact flavor profile of a 4-person dish. If 200g of flour serves 4, how much for 150?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#188038] shrink-0" />
                        <p>
                            <strong>Pharmacy & Medicine:</strong> Dosage calculations are purely proportional. If a 10ml solution contains 500mg of medicine, how many ml are needed for a 750mg dose? Precision in these ratios is a life-critical skill.
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md">
                    <h4 className="text-white font-black mb-4 flex items-center gap-2">
                         <Award className="w-5 h-5 text-[#8AB4F8]" />
                         Geometric Harmonics
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        Proportions preserve the "Visual Soul" of an object when its size is modified across dimensions.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                             <div className="text-[10px] font-bold text-white uppercase mb-1">Standard HD</div>
                             <div className="text-xs font-mono font-black text-[#8AB4F8]">16 : 9</div>
                         </div>
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                             <div className="text-[10px] font-bold text-white uppercase mb-1">Golden Ratio</div>
                             <div className="text-xs font-mono font-black text-[#8AB4F8]">1.618 : 1</div>
                         </div>
                    </div>
                </div>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Establish the Known Ratio: Enter the two numbers ($A$ and $B$) that form your established benchmark ratio.",
          "Identify the Unknown Variable: Enter the one number you know from the second ratio ($C$ or $D$) and leave the target field blank (?).",
          "Algebraic Processing: Our engine automatically identifies the empty field and applies the corresponding cross-multiplication identity.",
          "Review the Result: The bold result panel displays the solved value with up to 4 decimal points of precision.",
          "Equivalency Verification: Consult the bottom result card to see the two ratios expressed as an equivalent identity ($A:B = C:D$)."
        ]
      }}
      formula={{
        title: "The Proportional Identity Algorithm",
        description: "The following LaTeX identities represent the algorithmic foundations of our institutional-grade ratio engine.",
        raw: "$$\\begin{aligned} \\text{Standard Form: } & A : B = C : D \\\\ \\text{Fractional Form: } & \\frac{A}{B} = \\frac{C}{D} \\\\ \\text{Cross-Product: } & A \\times D = B \\times C \\\\ \\text{Inverse Scaling: } & C = \\frac{A \\times D}{B} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "What is the mathematical difference between a ratio and a proportion?",
          answer: "A ratio is a comparison of two quantities (e.g., 2 parts water to 1 part rice). A proportion is an equation that states two ratios are exactly equivalent (e.g., 2:1 = 10:5)."
        },
        {
          question: "How does 'Cross-Multiplication' work in this calculator?",
          answer: "If A/B = C/D, then mathematically $A \times D = B \times C$. If any one of these is unknown, we can find it by multiplying the two numbers that are diagonally opposite and dividing by the third number."
        },
        {
          question: "Can I use decimals in my ratios?",
          answer: "Yes. While school math often uses whole numbers, real-world proportions (like map scales or chemistry dosages) frequently use decimals. Our engine handles floating-point numbers with 100% precision."
        },
        {
          question: "Why do I get 'No unknown' as a result?",
          answer: "This happens if you fill in all four fields. The calculator needs one blank field to solve. To get a result, delete one number so a '?' appears in its place."
        },
        {
          question: "How is ratio used in the Nepal Stock Exchange (NEPSE)?",
          answer: "Investors use 'Price-to-Earnings' (P/E) ratios to determine if a stock is overvalued. By comparing the stock price to the company's earnings, they can see the relative cost of the investment."
        },
        {
          question: "What is an Aspect Ratio for screens?",
          answer: "An aspect ratio is the proportional relationship between width and height. For example, 16:9 means for every 16 units of width, there are 9 units of height. This ensures images aren't stretched or squashed."
        },
        {
          question: "How do I scale a map from 1:50,000 to real-world km?",
          answer: "Set $A=1$, $B=50000$. If you measure $10cm$ on the map, set $C=10$. The result for $D$ will be $500,000cm$, which you can convert to $5km$."
        },
        {
          question: "What is the 'Golden Ratio'?",
          answer: "The Golden Ratio is approximately 1.618:1. It is a proportion found in nature, art, and architecture that is considered aesthetically perfect. You can use this tool to calculate Golden Ratio dimensions for any base value."
        },
        {
          question: "Can I solve a ratio with three parts (A:B:C)?",
          answer: "This tool solves two-part proportions. To solve a three-part ratio, break it into two separate proportions (e.g., solve A:B, then use that result to solve B:C)."
        },
        {
          question: "How is this used in SEE Grade 10 Math?",
          answer: "SEE exams frequently feature 'Proportionality' problems in Geometry and Arithmetic. This tool helps students verify their answers for 'Direct' and 'Inverse' variation problems."
        },
        {
          question: "Is there a limit to how large the numbers can be?",
          answer: "Our engine uses 64-bit floating point precision, meaning it can handle numbers in the billions without losing accuracy. Perfect for macroeconomic scaling or demographic analysis."
        },
        {
          question: "What is 'Inverse Proportion'?",
          answer: "An inverse proportion is where one value increases as the other decreases (e.g., more workers = less time). This tool is designed for 'Direct Proportion'. For inverse variation, you must manually invert one of the ratios before inputting."
        }
      ]}
      sidebar={{
        title: "Institutional Resources",
        links: [
          { label: "Percentage Calculator", href: "/calculator/percentage/" },
          { label: "NEB Math Portal", href: "https://neb.gov.np" },
          { label: "NSO Nepal (Statistics)", href: "https://cbs.gov.np" },
          { label: "GPA Calculator", href: "/calculator/gpa/" },
          { label: "Statistics Plus", href: "/calculator/statistics-plus/" },
        ],
        banner: {
          title: "Mathematical Excellence",
          description: "Providing the gold standard for scaling tools in the Nepalese educational ecosystem.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Percentage Calc", href: "/calculator/percentage/" },
        { label: "Fraction Calc", href: "/calculator/fraction-calculator/" },
        { label: "GPA Calculator", href: "/calculator/gpa/" },
        { label: "Geometry 3D", href: "/calculator/geometry-3d/" }
      ]}
    />
  );
}
