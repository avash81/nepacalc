'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Divide, AlertTriangle, Lightbulb } from 'lucide-react';

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
      case '-': rN = num1 * d2, num2 * d1; rD = d1 * d2; break;
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
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions and mixed numbers. Get results automatically as simplified fractions, decimals, and percentages."
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
             <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Load Example Problem</label>
             <div className="grid grid-cols-3 gap-2">
                {[
                  { label:'½ + ⅓', w1:0,n1:1,d1:2, op:'+' as const, w2:0,n2:1,d2:3 },
                  { label:'¾ − ¼', w1:0,n1:3,d1:4, op:'-' as const, w2:0,n2:1,d2:4 },
                  { label:'1½ × ⅔', w1:1,n1:1,d1:2, op:'*' as const, w2:0,n2:2,d2:3 },
                ].map(ex => (
                  <button key={ex.label} onClick={() => { setW1(ex.w1);setN1(ex.n1);setD1(ex.d1);setOp(ex.op);setW2(ex.w2);setN2(ex.n2);setD2(ex.d2); }}
                    className="p-3 bg-white border border-[#DADCE0] rounded-lg text-center font-bold text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors">
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
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-6">Simplest Fraction Result</div>
                    <div className="flex flex-col items-center justify-center gap-2">
                       <div className="text-6xl font-black text-[#202124] border-b-4 border-[#202124] px-4 pb-2 min-w-[80px] text-center font-mono">{r.n}</div>
                       <div className="text-6xl font-black text-[#202124] px-4 pt-2 min-w-[80px] text-center font-mono">{r.d}</div>
                    </div>
                 </div>

                 {r.mixed.w !== 0 && (
                   <div className="p-6 flex flex-col items-center border-b border-[#DADCE0]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#E37400] mb-4">Mixed Number Equivalent</div>
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
                       <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A] mb-1">Decimal Form</div>
                       <div className="text-xl font-black text-[#1A73E8] font-mono">{r.dec}</div>
                    </div>
                    <div className="p-5 text-center bg-white hover:bg-[#F8F9FA] transition-colors">
                       <div className="text-[9px] font-bold uppercase tracking-wider text-[#70757A] mb-1">Percentage Form</div>
                       <div className="text-xl font-black text-[#188038] font-mono">{r.pct}%</div>
                    </div>
                 </div>
              </div>
              
              <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
                 <Lightbulb className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
                 <p className="text-[10px] text-[#202124] leading-relaxed">Fractions are automatically simplified to their lowest common terms using the Greatest Common Divisor (GCD) algorithm.</p>
              </div>
            </>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering Rational Numbers & Fraction Arithmetic</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In mathematics, a fraction represents a part of a whole or, more generally, any number of equal parts. It is fundamentally a division operation where the numerator (top number) is divided by the denominator (bottom number). Our <strong className="text-[#202124]">fraction calculator</strong> is designed not just to compute the final answer, but to process inputs exactly as they are taught in academic arithmetic, including seamless handling of mixed numbers and improper fractions.
              </p>
              <p>
                Unlike standard digital calculators that immediately convert fractions into floating-point decimals, often losing precision in cases involving infinite repeating decimals (like 1/3), this engine maintains exact rational arithmetic. It performs cross-multiplication, finds common denominators, and applies the Euclidean algorithm to guarantee the final <strong className="text-[#202124]">fraction simplified</strong> result is absolutely precise without rounding errors.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Algorithmic Mechanics of Simplification</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Euclidean Algorithm (GCD):</strong> To reduce a fraction to its lowest terms, the system calculates the Greatest Common Divisor (GCD) of both the numerator and denominator. For example, the result 24/36 shares a GCD of 12. Dividing both by 12 yields the irreducible fraction 2/3.</li>
              <li><strong className="text-[#188038]">Mixed Number Parsing:</strong> When a user inputs a whole number alongside a fraction (e.g., 2 1/4), the engine first converts it into an improper fraction. It multiplies the whole number by the denominator and adds the numerator (2 × 4 + 1 = 9), resulting in 9/4. This ensures multiplication and division operations remain mathematically sound.</li>
              <li><strong className="text-[#D93025]">Common Denominator Logic:</strong> For addition and subtraction, fractions must share a common base. The engine calculates the product of the two denominators (d1 × d2) to serve as a universal common base, cross-multiplies the numerators, performs the operation, and then simplifies the result.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Locate the first input block. If you have a mixed number, enter the integer in the 'Whole' box. Otherwise, leave it at 0.",
          "Enter the top number (Numerator) and bottom number (Denominator) for the first fraction.",
          "Select the desired mathematical operator: Addition (+), Subtraction (-), Multiplication (×), or Division (÷).",
          "Enter your second fraction (and whole number, if applicable) in the right-side input block.",
          "The calculator will instantly display the mathematically exact simplified fraction, alongside its decimal and percentage equivalents."
        ]
      }}
      formula={{
        title: "Fundamental Fraction Arithmetic",
        description: "The core mathematical theorems used by the computation engine.",
        raw: "1. Addition: (a/b) + (c/d) = (ad + bc) / bd\n2. Subtraction: (a/b), (c/d) = (ad, bc) / bd\n3. Multiplication: (a/b) × (c/d) = (ac) / (bd)\n4. Division: (a/b) ÷ (c/d) = (a/b) × (d/c) = (ad) / (bc)\n\nSimplification requires dividing the final numerator and denominator by their Greatest Common Divisor: GCD(Numerator, Denominator)."
      }}
      faqs={[
        {
          question: "How does the calculator simplify fractions?",
          answer: "It uses the Euclidean Algorithm to find the Greatest Common Divisor (GCD) between the numerator and denominator. It then divides both numbers by that GCD to reduce the fraction to its absolute simplest form."
        },
        {
          question: "Why is a denominator of zero invalid?",
          answer: "In mathematics, division by zero is strictly undefined. A fraction represents dividing a whole into equal parts; it is logically impossible to divide a whole into 'zero' parts."
        },
        {
          question: "What is an improper fraction vs a mixed number?",
          answer: "An improper fraction has a numerator that is larger than its denominator (e.g., 7/4). A mixed number expresses the same value as an integer plus a proper fraction (e.g., 1 3/4). This calculator automatically converts between both formats."
        },
        {
          question: "How does fraction division work?",
          answer: "To divide two fractions, the calculator uses the 'Keep-Change-Flip' rule. It keeps the first fraction, changes division to multiplication, flips the numerator and denominator of the second fraction (the reciprocal), and then multiplies straight across."
        },
        {
          question: "Why do decimals sometimes look different from fractions?",
          answer: "Some fractions, like 1/3, cannot be expressed as a finite decimal; they result in a repeating decimal (0.333...). While the decimal output is rounded for display, the fractional output remains 100% mathematically precise."
        },
        {
          question: "Does the calculator find the Least Common Multiple (LCM)?",
          answer: "While human students are taught to find the LCM for the lowest common denominator during addition, computational algorithms cross-multiply denominators (d1 × d2) to get a guaranteed common base, perform the math, and then simplify via GCD at the very end. The mathematical result is identical."
        }
      ]}
      sidebar={{ title: "Core Math Tools", links: [{ label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction" }, { label: "Percentage Calculator", href: "/calculator/percentage" }], banner: { title: "Math Foundation", description: "Mastering fractions is the key to algebra and higher-level mathematics.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction" }]}
    />
  );
}
