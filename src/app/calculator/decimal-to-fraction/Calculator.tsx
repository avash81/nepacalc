'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Hash, Divide, ArrowRight, Lightbulb } from 'lucide-react';

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export default function DecimalToFraction() {
  const [decimal, setDecimal] = useState<number>(0.75);

  const result = useMemo(() => {
    if (decimal === 0) return { n: 0, d: 1, mixed: null };
    
    const isNegative = decimal < 0;
    const absDec = Math.abs(decimal);
    
    // Check if it's a whole number
    if (Number.isInteger(absDec)) {
        return { 
            n: isNegative ? -absDec : absDec, 
            d: 1, 
            mixed: null 
        };
    }

    const s = absDec.toString();
    const decimalPlaces = s.includes('.') ? s.split('.')[1].length : 0;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = Math.round(absDec * denominator);
    
    const common = gcd(numerator, denominator);
    const sn = (isNegative ? -1 : 1) * (numerator / common);
    const sd = denominator / common;

    // Mixed number version
    const whole = Math.floor(Math.abs(sn) / sd);
    const remainder = Math.abs(sn) % sd;
    const mixed = whole > 0 && remainder > 0 ? {
        whole: isNegative ? -whole : whole,
        n: remainder,
        d: sd
    } : null;

    return { n: sn, d: sd, mixed };
  }, [decimal]);

  return (
    <CalculatorErrorBoundary calculatorName="Decimal to Fraction">
      <CalculatorLayout
        title="Decimal to Fraction"
        description="Convert decimal numbers to simplified fractions and mixed numbers instantly."
        badge="Pure Math"
        badgeColor="orange"
        category={{ label: 'Math & Education', href: '/calculator/category/education' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-6">
                <ValidatedInput 
                    label="Enter Decimal Number" 
                    value={decimal} 
                    onChange={setDecimal} 
                    step={0.01}
                    placeholder="e.g. 0.375"
                />
                
                <div className="grid grid-cols-2 gap-4">
                    {[0.25, 0.5, 0.75, 1.25, 0.333, 0.666].map(val => (
                        <button
                            key={val}
                            onClick={() => setDecimal(val)}
                            className="py-2 px-4 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all"
                        >
                            {val}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="p-8 border-b border-slate-50 flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/70 mb-6">Simplest Fraction</div>
                <div className="flex items-center gap-6">
                   <div className="text-4xl font-light text-slate-300">{decimal}</div>
                   <ArrowRight className="w-5 h-5 text-slate-300" />
                   <div className="flex flex-col items-center">
                      <div className="text-3xl font-black text-slate-900 border-b-2 border-slate-900 px-2 min-w-[40px] text-center">{result.n}</div>
                      <div className="text-3xl font-black text-slate-900 px-2 min-w-[40px] text-center">{result.d}</div>
                   </div>
                </div>
              </div>

              {result.mixed && (
                <div className="p-8 bg-slate-50/50 flex flex-col items-center">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/70 mb-4">Mixed Number</div>
                   <div className="flex items-center gap-2">
                      <span className="text-4xl font-black text-slate-900">{result.mixed.whole}</span>
                      <div className="flex flex-col items-center">
                         <div className="text-xl font-black text-slate-600 border-b border-slate-600 px-1">{result.mixed.n}</div>
                         <div className="text-xl font-black text-slate-600 px-1">{result.mixed.d}</div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                 <Lightbulb className="w-4 h-4" /> How to do it manually?
               </h4>
               <ol className="space-y-3 text-[11px] text-blue-800 font-bold leading-relaxed">
                 <li>1. Count the decimals (e.g., 0.75 has 2).</li>
                 <li>2. Write the number over 1 followed by that many zeros (75/100).</li>
                 <li>3. Find the greatest common divisor (GCD) and simplify (75/25 = 3, 100/25 = 4).</li>
               </ol>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Understanding Decimals and Fractions</h2>
            <p>Every terminating decimal can be written as a fraction. Fractions are often more precise for engineering and construction tasks where measuring tape markings are used.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
