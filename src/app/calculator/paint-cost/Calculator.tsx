'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { PaintBucket, Ruler, DollarSign, Info } from 'lucide-react';

export default function PaintCostCalculator() {
  const [totalArea, setTotalArea] = useState<number>(500);
  const [numCoats, setNumCoats] = useState<number>(2);
  const [coveragePerLiter, setCoveragePerLiter] = useState<number>(10);
  const [pricePerLiter, setPricePerLiter] = useState<number>(450);

  const results = useMemo(() => {
    const totalPaintedArea = totalArea * numCoats;
    const litersNeeded = Math.ceil(totalPaintedArea / coveragePerLiter);
    const totalCost = litersNeeded * pricePerLiter;
    
    return {
      litersNeeded,
      totalCost,
      totalPaintedArea
    };
  }, [totalArea, numCoats, coveragePerLiter, pricePerLiter]);

  return (
    <CalculatorErrorBoundary calculatorName="Paint Cost">
      <CalculatorLayout
        title="Paint Cost Calculator"
        description="Calculate the exact amount of paint you need for your walls and the estimated cost for your renovation project."
        badge="Interior & DIY"
        badgeColor="indigo"
        category={{ label: 'Construction', href: '/calculator/category/construction' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-6">
                <ValidatedInput 
                    label="Total Wall Area (Sq. Ft)" 
                    value={totalArea} 
                    onChange={setTotalArea} 
                    min={1}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ValidatedInput 
                        label="Number of Coats" 
                        value={numCoats} 
                        onChange={setNumCoats} 
                        min={1}
                        max={5}
                    />
                    <ValidatedInput 
                        label="Price per Liter (NPR)" 
                        value={pricePerLiter} 
                        onChange={setPricePerLiter} 
                        min={1}
                    />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-xs text-center">
                   Standard coverage is about 100-120 sq. ft per liter for single coat.
                </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="p-8 border-b border-slate-50 text-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Estimated Total Cost</div>
                 <div className="text-5xl font-black text-slate-900 tracking-tighter">
                   NPR {results.totalCost.toLocaleString()}
                 </div>
              </div>
              
              <div className="p-8 bg-indigo-50/50 flex flex-col items-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/70 mb-4">Total Paint Required</div>
                 <div className="flex items-center gap-3">
                    <PaintBucket className="w-8 h-8 text-indigo-600" />
                    <span className="text-4xl font-black text-slate-900">{results.litersNeeded} Liters</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                    <div className="text-[10px] font-black uppercase text-emerald-600 mb-1">Effective Area</div>
                    <div className="text-lg font-black text-slate-800">{results.totalPaintedArea} ft²</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                    <div className="text-[10px] font-black uppercase text-blue-600 mb-1">Efficiency</div>
                    <div className="text-lg font-black text-slate-800">{coveragePerLiter} ft²/L</div>
                </div>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200 text-sm">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">How to Calculate Wall Area?</h2>
            <p>To get the most accurate estimate, measure the length and height of each wall you intend to paint. Multiply them to get the area of one wall. Repeat for all walls and add them up.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800">Subtract Openings</h3>
                <p className="text-slate-600 leading-relaxed italic">Tip: Don&apos;t forget to subtract the area of doors and windows! A standard door is about 21 sq. ft and a standard window is about 12 sq. ft.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl text-slate-600">
                <h3 className="text-lg font-bold text-slate-800">Why 2 coats?</h3>
                <p>One coat rarely provides an even color. Two coats ensure durability, better hiding of the previous color, and a professional finish.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
