'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Divide, AlertTriangle, Lightbulb, BookOpen, GraduationCap, History, Ruler } from 'lucide-react';

export default function FractionCalculator() {
  const [w1, setW1] = useState(0); const [n1, setN1] = useState(1); const [d1, setD1] = useState(2);
  const [w2, setW2] = useState(0); const [n2, setN2] = useState(1); const [d2, setD2] = useState(3);
  const [op, setOp] = useState<'+'|'-'|'*'|'/'>('+');

  const r = useMemo(() => {
    if (d1 === 0 || d2 === 0) return { error: 'Denominator cannot be zero', n:0, d:1, mixed:{w:0,n:0,d:1}, dec:'0', pct:'0' };
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const num1 = w1 * d1 + n1, num2 = w2 * d2 + n2;
    let rN = 0, rD = 1;
    switch(op) {
      case '+': rN = num1 * d2 + num2 * d1; rD = d1 * d2; break;
      case '-': rN = num1 * d2 - num2 * d1; rD = d1 * d2; break;
      case '*': rN = num1 * num2; rD = d1 * d2; break;
      case '/': rN = num1 * d2; rD = d1 * num2; break;
    }
    if (rD === 0) return { error: 'Division by zero resulting in undefined denominator', n:0, d:1, mixed:{w:0,n:0,d:1}, dec:'0', pct:'0' };
    
    const g = Math.abs(gcd(rN, rD));
    const sN = rN / g, sD = rD / g;
    const whole = Math.floor(Math.abs(sN) / Math.abs(sD)) * (sN * sD < 0 ? -1 : 1);
    const decVal = rN / rD;
    
    return { 
      n: sN, d: sD, 
      mixed: { w: whole, n: Math.abs(sN) % Math.abs(sD), d: Math.abs(sD) }, 
      dec: decVal.toFixed(6).replace(/\.?0+$/, ''), 
      pct: (decVal * 100).toFixed(2).replace(/\.?0+$/, ''), 
      error: null 
    };
  }, [w1, n1, d1, w2, n2, d2, op]);

  const inCls = "w-16 h-12 text-center border border-[#DADCE0] rounded bg-white font-mono text-lg font-black focus:border-[#1A73E8] outline-none transition-all";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Fraction Calculator' }]}
      title="Professional Fraction Calculator &"
      description="The definitive resource for fraction arithmetic. Add, subtract, multiply, and divide fractions and mixed numbers with absolute precision. Designed for Nepalese academic standards."
      icon={Divide}
      inputs={
        <div className="space-y-6">
          <div className="p-8 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="text-[9px] font-bold uppercase text-[#70757A] mb-1">Whole</div>
                <input type="number" value={w1} onChange={e=>setW1(Number(e.target.value))} className={inCls} />
              </div>
              <div className="flex flex-col items-center gap-1.5 ml-2 mt-4">
                <input type="number" value={n1} onChange={e=>setN1(Number(e.target.value))} className={inCls} />
                <div className="w-16 h-0.5 bg-[#202124]" />
                <input type="number" value={d1} onChange={e=>setD1(Number(e.target.value))} className={inCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mt-4 md:mt-4">
              {(['+', '-', '*', '/'] as const).map(o => (
                <button key={o} onClick={() => setOp(o)}
                  className={`w-12 h-12 font-black text-2xl rounded transition-all flex items-center justify-center ${op === o ? 'bg-[#1A73E8] text-white shadow-md' : 'bg-white border border-[#DADCE0] text-[#70757A] hover:bg-[#E8F0FE] hover:text-[#1A73E8] hover:border-[#1A73E8]'}`}>
                  {o === '*' ? '×' : o === '/' ? '÷' : o}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="text-[9px] font-bold uppercase text-[#70757A] mb-1">Whole</div>
                <input type="number" value={w2} onChange={e=>setW2(Number(e.target.value))} className={inCls} />
              </div>
              <div className="flex flex-col items-center gap-1.5 ml-2 mt-4">
                <input type="number" value={n2} onChange={e=>setN2(Number(e.target.value))} className={inCls} />
                <div className="w-16 h-0.5 bg-[#202124]" />
                <input type="number" value={d2} onChange={e=>setD2(Number(e.target.value))} className={inCls} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Institutional Practice Problems</label>
             <div className="grid grid-cols-3 gap-2">
                {[
                  { label:'SEE Basic (½ + ⅓)', w1:0,n1:1,d1:2, op:'+' as const, w2:0,n2:1,d2:3 },
                  { label:'NEB Algebra (¾ − ¼)', w1:0,n1:3,d1:4, op:'-' as const, w2:0,n2:1,d2:4 },
                  { label:'Applied Math (1½ × ⅔)', w1:1,n1:1,d1:2, op:'*' as const, w2:0,n2:2,d2:3 },
                ].map(ex => (
                  <button key={ex.label} onClick={() => { setW1(ex.w1);setN1(ex.n1);setD1(ex.d1);setOp(ex.op);setW2(ex.w2);setN2(ex.n2);setD2(ex.d2); }}
                    className="p-3 bg-white border border-[#DADCE0] rounded-lg text-center font-bold text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors text-xs">
                    {ex.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {r.error ? (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg flex items-start gap-3 text-[#D93025]">
               <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
               <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">Mathematical Error</h4>
                  <p className="text-xs font-medium">{r.error}</p>
               </div>
            </div>
          ) : (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
                 <div className="p-8 border-b border-[#DADCE0] text-center bg-[#F8F9FA]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-6">Irreducible Fraction Form</div>
                    <div className="flex flex-col items-center justify-center gap-2">
                       <div className="text-6xl font-black text-[#202124] border-b-4 border-[#202124] px-4 pb-2 min-w-[80px] text-center font-mono">{r.n}</div>
                       <div className="text-6xl font-black text-[#202124] px-4 pt-2 min-w-[80px] text-center font-mono">{r.d}</div>
                    </div>
                 </div>

                 {r.mixed.w !== 0 && (
                   <div className="p-6 flex flex-col items-center border-b border-[#DADCE0]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#E37400] mb-4">Academic Mixed Number</div>
                      <div className="flex items-center gap-3">
                         <span className="text-5xl font-black text-[#202124] font-mono">{r.mixed.w}</span>
                         {r.mixed.n !== 0 && (
                            <div className="flex flex-col items-center">
                               <div className="text-2xl font-black text-[#5F6368] border-b-2 border-[#5F6368] px-2 font-mono">{r.mixed.n}</div>
                               <div className="text-2xl font-black text-[#5F6368] px-2 font-mono">{r.mixed.d}</div>
                            </div>
                         )}
                      </div>
                   </div>
                 )}

                 <div className="grid grid-cols-2 divide-x divide-[#DADCE0]">
                    <div className="p-5 text-center bg-white hover:bg-[#F8F9FA] transition-colors">
                       <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A] mb-1">Scientific Decimal</div>
                       <div className="text-xl font-black text-[#1A73E8] font-mono">{r.dec}</div>
                    </div>
                    <div className="p-5 text-center bg-white hover:bg-[#F8F9FA] transition-colors">
                       <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A] mb-1">Percentage Representation</div>
                       <div className="text-xl font-black text-[#188038] font-mono">{r.pct}%</div>
                    </div>
                 </div>
              </div>
              
              <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
                 <Lightbulb className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
                 <p className="text-[10px] text-[#202124] leading-relaxed"><strong>Note:</strong> We apply the Euclidean algorithm for GCD simplification to ensure your results match the highest academic rigorousness required by TU and NEB examinations.</p>
              </div>
            </>
          )}
        </div>
      }
      details={
        <div className="space-y-12">
          {/* Section 1: History and Evolution */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-8 h-8 text-[#1A73E8]" />
              <h2 className="text-2xl font-black text-[#202124]">The History and Evolution of Fractional Mathematics</h2>
            </div>
            <div className="prose prose-sm text-[#5F6368] max-w-none leading-relaxed space-y-4">
              <p>
                The concept of the "fraction" (from the Latin <em>fractio</em>, meaning "breaking") has been the cornerstone of human progress for over 4,000 years. The ancient Egyptians were the first to document a formal system of fractions, primarily using unit fractions (fractions with a numerator of 1). They utilized the "Eye of Horus" system to represent fractions of grain and land, where each part of the eye symbol represented a specific power of two.
              </p>
              <p>
                As civilizations evolved, so did the complexity of their rational numbers. The Greeks, led by Pythagoras and later Euclid, laid the geometric foundations of ratios. However, it was the Indian mathematicians who introduced the modern notation we recognize today—placing one number over another. The Arab mathematicians later added the "vinculum" (the horizontal bar) during the Middle Ages, creating the visual representation that every modern student now learns in the primary curriculum.
              </p>
              <p>
                In the context of Nepal, traditional measurement systems have always relied heavily on fractional logic. Whether it is the allocation of land in <strong>Ropani, Aana, Paisa, and Dam</strong> or the division of weights in <strong>Dharni and Pau</strong>, the ability to calculate "parts of a whole" is deeply embedded in the cultural and economic history of the Kathmandu Valley and the broader Himalayan region.
              </p>
            </div>
          </section>

          {/* Section 2: Mathematical Taxonomy */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[#188038]" />
              <h2 className="text-2xl font-black text-[#202124]">A Taxonomy of Rational Numbers: Types of Fractions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#202124] border-b-2 border-[#188038] pb-1 inline-block">1. Simple and Proper Fractions</h3>
                <p className="text-[#5F6368]">
                  A <strong>Proper Fraction</strong> is the most common form, where the numerator is strictly less than the denominator (e.g., 2/3, 5/8). These always represent a value less than 1. In academic terms, these are the "building blocks" of probability and statistics.
                </p>
                <h3 className="text-lg font-bold text-[#202124] border-b-2 border-[#188038] pb-1 inline-block">2. Improper Fractions</h3>
                <p className="text-[#5F6368]">
                  An <strong>Improper Fraction</strong> occurs when the numerator is equal to or greater than the denominator (e.g., 7/4, 11/5). These represent values of 1 or more. While mathematically sound, they are often converted into mixed numbers for better human readability.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#202124] border-b-2 border-[#188038] pb-1 inline-block">3. Mixed Numbers</h3>
                <p className="text-[#5F6368]">
                  A <strong>Mixed Number</strong> combines a whole number and a proper fraction (e.g., 1¾). This is the standard for real-world measurements like "2 and a half kilometers." Our calculator specializes in converting between improper and mixed forms instantly.
                </p>
                <h3 className="text-lg font-bold text-[#202124] border-b-2 border-[#188038] pb-1 inline-block">4. Complex and Continued Fractions</h3>
                <p className="text-[#5F6368]">
                  Advanced mathematics utilizes <strong>Complex Fractions</strong> (where the numerator or denominator itself is a fraction) and <strong>Continued Fractions</strong> (infinite nested fractions used to approximate irrational numbers like π or the Golden Ratio).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Algorithmic Deep Dive */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-[#D93025]" />
              <h2 className="text-2xl font-black text-[#202124]">Algorithmic Deep Dive: The Logic of the Engine</h2>
            </div>
            <div className="space-y-8 text-sm text-[#5F6368]">
              <div className="border-l-4 border-[#1A73E8] pl-6 py-2">
                <h4 className="font-bold text-[#202124] mb-2 uppercase tracking-widest text-xs">Addition & Subtraction (The LCD Rule)</h4>
                <p>
                  To add 1/4 and 1/6, the engine doesn't just multiply 4x6. It finds the <strong>Least Common Denominator (LCD)</strong>. By identifying the Least Common Multiple of 4 and 6 (which is 12), the engine converts 1/4 to 3/12 and 1/6 to 2/12. The final result, 5/12, is then simplified using the Greatest Common Divisor (GCD). This ensures that we never lose precision, unlike floating-point arithmetic.
                </p>
              </div>
              <div className="border-l-4 border-[#188038] pl-6 py-2">
                <h4 className="font-bold text-[#202124] mb-2 uppercase tracking-widest text-xs">Multiplication (Linear Scaling)</h4>
                <p>
                  Multiplication is the most straightforward operation: (a/b) * (c/d) = (ac)/(bd). However, our institutional engine performs <strong>Cross-Simplification</strong> before the final multiplication. If you multiply 4/9 by 3/8, the engine recognizes that 4 and 8 share a factor, as do 3 and 9. It simplifies the problem to 1/3 * 1/2 = 1/6 before you even see the result.
                </p>
              </div>
              <div className="border-l-4 border-[#E37400] pl-6 py-2">
                <h4 className="font-bold text-[#202124] mb-2 uppercase tracking-widest text-xs">Division (The Reciprocal Theorem)</h4>
                <p>
                  Division by a fraction is identical to multiplication by its inverse. This is known as the "Keep-Change-Flip" rule. Mathematically: (a/b) ÷ (c/d) = (a/b) * (d/c). The engine treats division as a transformation of the second term, ensuring that division by zero is caught and flagged as a mathematical impossibility.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Nepalese Academic Applications */}
          <section className="bg-[#1A1A2E] text-white rounded-xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Ruler className="w-8 h-8 text-[#8AB4F8]" />
              <h2 className="text-2xl font-black">Applications in the Nepalese Institutional Framework</h2>
            </div>
            <div className="space-y-6 text-sm text-[#8AB4F8] leading-relaxed">
              <p>
                For students under the <a href="https://neb.gov.np" className="underline decoration-[#1A73E8] hover:text-white transition-all">National Examination Board (NEB)</a>, fractions are not just a topic in Grade 6-10 math; they are the foundation of Science and Economics. In Chemistry, stoichiometry relies entirely on fractional molar ratios. In Physics, the laws of lenses and resistances use reciprocals (1/f = 1/u + 1/v).
              </p>
              <p>
                In the professional sphere, Nepalese civil engineers and architects use fractional scaling for blueprints. Even in the financial sector, calculating <strong>Bonus Shares and Right Shares</strong> at the Nepal Stock Exchange (NEPSE) requires precise fractional arithmetic. A 1:10 bonus share is fundamentally a fractional increase in capital.
              </p>
              <p>
                At the university level (TU, KU, PoU), understanding fractions is the prerequisite for <strong>Calculus</strong>. The derivative of a function is defined as a limit of a fractional ratio (dy/dx). Without a "Source of Truth" for fraction calculation, advanced engineering mathematics becomes inaccessible. This tool serves as that foundational anchor for Nepalese academic excellence.
              </p>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Determine your Input Mode: If your calculation involves a whole number (e.g., 3½), enter '3' in the 'Whole' box. For simple fractions (e.g., 2/3), leave the 'Whole' box as 0.",
          "Populate the First Term: Enter the numerator and denominator for your starting fraction. Ensure the denominator is never zero.",
          "Select your Mathematical Operator: Tap one of the central buttons to choose between Addition, Subtraction, Multiplication, or Division.",
          "Populate the Second Term: Enter the details for your second fraction or mixed number on the right-hand side of the operator.",
          "Analyze the Comprehensive Output: Our engine instantly renders the 'Irreducible Form' (simplest fraction), the 'Mixed Number Equivalent', and scientific decimal/percentage values."
        ]
      }}
      formula={{
        title: "The Formal Logic of Rational Arithmetic",
        description: "These LaTeX-formatted theorems represent the algorithmic foundation of our institutional-grade engine.",
        raw: "$$\\begin{aligned} \\text{Proper Form: } & \\frac{n}{d} \\text{ where } n < d \\\\ \\text{Mixed to Improper: } & w\\frac{n}{d} = \\frac{(w \\times d) + n}{d} \\\\ \\text{Summation Rule: } & \\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd} \\\\ \\text{Reciprocal Division: } & \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\times d}{b \\times c} \\\\ \\text{Simplification: } & \\frac{n}{\\text{gcd}(n,d)} \\Big/ \\frac{d}{\\text{gcd}(n,d)} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "What is the Greatest Common Divisor (GCD) and why is it used?",
          answer: "The GCD (also known as the Greatest Common Factor) is the largest integer that divides both the numerator and denominator without a remainder. Our calculator uses the Euclidean algorithm to find the GCD and divide both terms by it, ensuring the result is in its 'Simplest' or 'Irreducible' form. This is a critical step in SEE and NEB mathematics exams."
        },
        {
          question: "How does the calculator handle negative fractions?",
          answer: "Negative fractions are fully supported. The engine follows standard algebraic rules: a negative divided by a positive (or vice versa) results in a negative value. For mixed numbers, the entire value is treated as negative. For example, -1½ is interpreted as -(1 + ½)."
        },
        {
          question: "Why is 1/0 considered a mathematical error?",
          answer: "In the field of rational numbers, division by zero is strictly undefined. A fraction represents dividing a whole into 'd' equal parts. Logically, you cannot divide something into zero parts. In calculus, as the denominator approaches zero, the value tends toward infinity, but in arithmetic, it remains an error."
        },
        {
          question: "What is the difference between a Ratio and a Fraction?",
          answer: "While related, a fraction represents a part-to-whole relationship (e.g., 1 out of 4 slices of pizza), whereas a ratio often compares one part to another part (e.g., 1 slice for me, 3 slices for you, or 1:3). This calculator focuses on the arithmetic of fractions."
        },
        {
          question: "Can this tool solve complex fractions (fractions within fractions)?",
          answer: "Currently, this tool is optimized for two-term arithmetic. To solve complex fractions like (1/2) / (3/4), simply use the division operator. The engine will treat it as a rational division problem and provide the simplified result (2/3)."
        },
        {
          question: "How do I convert a percentage back into a fraction?",
          answer: "A percentage is just a fraction with a denominator of 100. For example, 75% is 75/100. To simplify this using our tool, enter 75 as the numerator and 100 as the denominator with a '0' whole number. The engine will instantly provide the simplified '3/4' result."
        },
        {
          question: "What are 'Equivalencies' in fractions?",
          answer: "Equivalent fractions are different fractions that represent the same numerical value, such as 1/2, 2/4, and 50/100. Our engine always defaults to the 'Irreducible' form (the simplest equivalent) to maintain academic standards."
        },
        {
          question: "How are fractions used in computer science?",
          answer: "Computers struggle with fractions because they use binary (base-2). This often leads to 'floating-point errors' where 0.1 + 0.2 doesn't exactly equal 0.3. Mathematical engines like ours use 'Rational Arithmetic' libraries to store numbers as integer pairs (numerator/denominator) to maintain 100% accuracy."
        },
        {
          question: "Is there a limit to the size of numbers I can enter?",
          answer: "The engine utilizes 64-bit integer precision. While you can enter very large numbers, extremely massive integers might reach the limits of the browser's JavaScript engine (Number.MAX_SAFE_INTEGER). For standard academic and engineering use, the precision is more than sufficient."
        },
        {
          question: "How does this tool help with the NEB syllabus?",
          answer: "The NEB (Class 11/12) syllabus in Nepal requires students to master partial fractions and rational functions. This tool provides the foundational check for basic arithmetic, allowing students to verify their steps when solving complex algebraic identities."
        }
      ]}
      sidebar={{ title: "Institutional Resources", links: [
          { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" },
          { label: "Percentage Calculator", href: "/calculator/percentage/" },
          { label: "NEB Mathematics Curriculum", href: "https://neb.gov.np" },
          { label: "TU Entrance Syllabus", href: "https://tu.edu.np" },
          { label: "SEE Result Checker", href: "/calculator/see-gpa/" }
        ], banner: { title: "Academic Excellence", description: "Standardizing the tools used by Nepal's next generation of engineers and scientists.", image: "/images/math-banner.jpg" } }}
      relatedTools={[
        { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "BMI Calculator", href: "/calculator/bmi/" }
      ]}
    />
  );
}
