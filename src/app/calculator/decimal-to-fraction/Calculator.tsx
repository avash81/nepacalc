'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Hash, ArrowRight, Lightbulb } from 'lucide-react';

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export default function DecimalToFraction() {
  const [decimal, setDecimal] = useState<number>(0.75);

  const result = useMemo(() => {
    if (decimal === 0 || isNaN(decimal)) return { n: 0, d: 1, mixed: null };
    
    const isNegative = decimal < 0;
    const absDec = Math.abs(decimal);
    
    if (Number.isInteger(absDec)) return { n: isNegative ? -absDec : absDec, d: 1, mixed: null };

    const s = absDec.toString();
    const decimalPlaces = s.includes('.') ? s.split('.')[1].length : 0;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = Math.round(absDec * denominator);
    
    const common = gcd(numerator, denominator);
    const sn = (isNegative ? -1 : 1) * (numerator / common);
    const sd = denominator / common;

    const whole = Math.floor(Math.abs(sn) / sd);
    const remainder = Math.abs(sn) % sd;
    const mixed = whole > 0 && remainder > 0 ? { whole: isNegative ? -whole : whole, n: remainder, d: sd } : null;

    return { n: sn, d: sd, mixed };
  }, [decimal]);

  const inputCls = "w-full h-16 px-6 border-2 border-[#DADCE0] rounded-lg bg-white text-2xl font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all font-mono";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-2";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Decimal to Fraction' }]}
      title="Decimal to Fraction Converter"
      description="Instantly convert any decimal number into its simplest fractional form and mixed number equivalent. Highly precise for repeating and standard decimals."
      icon={Hash}
      inputs={
        <div className="space-y-8">
          <div>
              <label className={labelCls}>Enter Decimal Number</label>
              <input type="number" value={decimal} onChange={e => setDecimal(Number(e.target.value))} step={0.01} placeholder="e.g. 0.375" className={inputCls} />
          </div>
          
          <div className="space-y-3">
             <label className={labelCls}>Quick Presets</label>
             <div className="grid grid-cols-3 gap-3">
                 {[0.125, 0.25, 0.333, 0.5, 0.666, 0.75, 1.25, 2.5, 3.14].map(val => (
                     <button key={val} onClick={() => setDecimal(val)} className="py-3 rounded-lg border border-[#DADCE0] bg-white text-[#5F6368] font-black font-mono text-xs hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all">{val}</button>
                 ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#DADCE0] overflow-hidden">
             <div className="p-8 border-b border-[#DADCE0] text-center bg-[#F8F9FA]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-6">Simplest Fraction</div>
                <div className="flex items-center justify-center gap-6">
                   <div className="text-4xl font-light text-[#70757A]">{decimal}</div>
                   <ArrowRight className="w-6 h-6 text-[#DADCE0]" />
                   <div className="flex flex-col items-center">
                      <div className="text-5xl font-black text-[#202124] border-b-4 border-[#202124] px-3 pb-1 min-w-[60px] text-center">{result.n}</div>
                      <div className="text-5xl font-black text-[#202124] px-3 pt-1 min-w-[60px] text-center">{result.d}</div>
                   </div>
                </div>
             </div>

             {result.mixed && (
               <div className="p-8 flex flex-col items-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#E37400] mb-4">Mixed Number Equivalent</div>
                  <div className="flex items-center gap-3">
                     <span className="text-5xl font-black text-[#202124]">{result.mixed.whole}</span>
                     <div className="flex flex-col items-center">
                        <div className="text-2xl font-black text-[#5F6368] border-b-2 border-[#5F6368] px-2">{result.mixed.n}</div>
                        <div className="text-2xl font-black text-[#5F6368] px-2">{result.mixed.d}</div>
                     </div>
                  </div>
               </div>
             )}
          </div>

          <div className="p-5 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg space-y-3">
             <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A73E8] flex items-center gap-2">
               <Lightbulb className="w-4 h-4" /> Manual Conversion Logic
             </h4>
             <ol className="space-y-2 text-xs text-[#202124] font-medium leading-relaxed pl-1">
               <li>1. Count the number of decimal places (e.g. 0.375 has 3 places).</li>
               <li>2. Write the decimal over 1 followed by that many zeros (375 / 1000).</li>
               <li>3. Find the Greatest Common Divisor (GCD). In this case, GCD is 125.</li>
               <li>4. Divide numerator and denominator by the GCD (375÷125 = 3, 1000÷125 = 8). Result: 3/8.</li>
             </ol>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the decimal value into the main input field.", "Alternatively, tap one of the common presets to instantly see its fractional equivalent.", "The calculator will display both the simplest improper fraction and the mixed number (if applicable)."] }}
      formula={{ title: "Fraction Simplification Algorithm", description: "Euclidean algorithm for GCD.", raw: "Let D = decimal\nN = D × 10^places\nDen = 10^places\n\nGCD = gcd(N, Den)\nSimplified Numerator = N / GCD\nSimplified Denominator = Den / GCD" }}
      faqs={[
        { question: "What is a Mixed Number?", answer: "A mixed number combines a whole number and a proper fraction. For example, 1.5 is written as 1 1/2 as a mixed number, or 3/2 as an improper fraction." },
        { question: "How does it handle negative numbers?", answer: "Negative decimals are fully supported. The negative sign is applied to the final simplified numerator or the whole number portion of the mixed number." }
      ]}
      sidebar={{ title: "Pure Mathematics", links: [{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }, { label: "Standard Deviation", href: "/calculator/standard-deviation" }], banner: { title: "Math Basics", description: "Understanding fractions is crucial for advanced calculus and algebra.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }]}
    />
  );
}
