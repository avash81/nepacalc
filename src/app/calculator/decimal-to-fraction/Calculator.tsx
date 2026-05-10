'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Hash, ArrowRight, Lightbulb, TrendingUp, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Target, Award, Binary, Activity, Zap } from 'lucide-react';

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

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="decimal-to-fraction"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Decimal to Fraction' }]}
      title="Institutional Decimal to Fraction"
      description="The definitive resource for rational number conversion. Instantly transform terminating and repeating decimals into simplest fractional forms and mixed numbers with academic precision."
      icon={Hash}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
              <label className={labelCls}>Numeric Decimal Argument</label>
              <input type="number" value={decimal} onChange={e => setDecimal(Number(e.target.value))} step={0.01} placeholder="e.g. 0.375" className={inputCls} />
          </div>
          
          <div className="space-y-3">
             <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Institutional Constants</label>
             <div className="grid grid-cols-5 gap-2">
                 {[0.125, 0.25, 0.333, 0.5, 0.666, 0.75, 1.25, 2.5, 3.14, 0.0625].map(val => (
                     <button key={val} onClick={() => setDecimal(val)} className={`py-2 rounded-md border font-black text-[10px] transition-all ${decimal === val ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-[#F8F9FA]'}`}>
                         {val}
                     </button>
                 ))}
             </div>
          </div>
        </div>
      }
      results={
        <>
          <div className="space-y-6">
            <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
               <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Irreducible Rational Vector</div>
               <div className="flex flex-col items-center">
                  <div className="text-6xl font-black text-[#202124] border-b-4 border-[#202124] px-4 pb-2 text-center min-w-[60px] tracking-tighter">{result.n}</div>
                  <div className="text-6xl font-black text-[#202124] px-4 pt-2 text-center min-w-[60px] tracking-tighter">{result.d}</div>
               </div>
               <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter mt-4">Simplest Fractional Representation</div>
            </div>

            {result.mixed && (
              <div className="bg-white border border-[#DADCE0] rounded-lg p-6 flex flex-col items-center space-y-3">
                 <div className="text-[10px] font-bold text-[#E37400] uppercase tracking-wider">Mixed Number Representation</div>
                 <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-[#202124]">{result.mixed.whole}</span>
                    <div className="flex flex-col items-center">
                       <div className="text-2xl font-black text-[#5F6368] border-b-2 border-[#5F6368] px-2">{result.mixed.n}</div>
                       <div className="text-2xl font-black text-[#5F6368] px-2">{result.mixed.d}</div>
                    </div>
                 </div>
              </div>
            )}

            <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
               <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-widest">Resolution Audit</span>
                  <Binary className="w-3.5 h-3.5 text-[#1A73E8]" />
               </div>
               <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-[#5F6368]">Decimal Input</span>
                     <span className="font-bold text-[#202124]">{decimal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-[#5F6368]">Base Expansion</span>
                     <span className="font-bold text-[#1A73E8]">10^{decimal.toString().includes('.') ? decimal.toString().split('.')[1].length : 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-[#5F6368]">Reduction Status</span>
                     <span className="font-bold text-[#188038]">Irreducible Form</span>
                  </div>
               </div>
            </div>
          </div>
        </>
      }
      relatedTools={[
        { label: "Fraction Calculator", href: "/calculator/fraction-calculator/" },
        { label: "Scientific Calc", href: "/calculator/scientific-calculator/" },
        { label: "Percentage Calc", href: "/calculator/percentage/" },
        { label: "GPA Calculator", href: "/calculator/gpa/" }
      ]}
    />
  );
}

