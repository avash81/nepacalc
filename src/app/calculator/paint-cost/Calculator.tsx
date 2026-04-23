'use client';

import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { PaintBucket } from 'lucide-react';

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
      <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Paint Calculator' }]}
        title="Paint Cost Estimator"
        description="Calculate the exact volume of paint needed for your walls and get an accurate cost estimate for your interior or exterior painting project."
        icon={PaintBucket}
        inputs={
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
            
            <ValidatedInput 
                label="Coverage (Sq. Ft per Liter)" 
                value={coveragePerLiter} 
                onChange={setCoveragePerLiter} 
                min={1}
            />

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
               <strong>Tip:</strong> Standard paint coverage is about 100-120 sq. ft per liter for a single coat. Primer typically covers less area.
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <div className="overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100 text-center bg-slate-50">
                 <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Estimated Total Cost</div>
                 <div className="text-4xl font-black text-slate-900">
                   NPR {results.totalCost.toLocaleString()}
                 </div>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                 <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Total Paint Required</div>
                 <div className="flex items-center gap-3">
                    <PaintBucket className="w-6 h-6 text-blue-600" />
                    <span className="text-3xl font-black text-slate-900">{results.litersNeeded} Liters</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-medium text-slate-500 mb-1">Effective Area (All Coats)</div>
                    <div className="text-lg font-bold text-slate-900">{results.totalPaintedArea.toLocaleString()} sq.ft</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-xs font-medium text-slate-500 mb-1">Efficiency Factor</div>
                    <div className="text-lg font-bold text-slate-900">{coveragePerLiter} sq.ft/L</div>
                </div>
            </div>
          </div>
        }
        sidebar={{
          title: "Construction Tools",
          links: [
            { label: 'Brick Calculator', href: '/calculator/brick-calculator' },
            { label: 'Concrete Mix', href: '/calculator/concrete-mix' },
            { label: 'Area Calculator', href: '/calculator/area-calculator' },
            { label: 'Length Converter', href: '/calculator/length-converter' },
          ],
        }}
        howToUse={{
          steps: [
            "Measure the height and width of your walls to find the total square footage (Area = Height × Width). Subtract the area of doors and windows.",
            "Enter the 'Total Wall Area' into the calculator.",
            "Select the number of coats you plan to apply. Darker colors or new walls typically require 2-3 coats.",
            "Input the cost per liter of the paint you wish to buy.",
            "Adjust the coverage value if your paint brand specifies a different coverage rate (usually found on the paint can)."
          ]
        }}
        formula={{
          title: "Paint Calculation Formula",
          description: "The formula to calculate the number of paint liters needed is based on the total surface area and the paint's coverage rating.",
          raw: "Total Area (All Coats) = Wall Area × Number of Coats\nLiters Needed = Ceiling(Total Area / Coverage per Liter)\nTotal Cost = Liters Needed × Price per Liter"
        }}
        faqs={[
          {
            question: "How much area does 1 liter of paint cover?",
            answer: "On average, 1 liter of standard acrylic emulsion paint covers about 100 to 120 square feet for a single coat. However, rough surfaces or highly porous walls may absorb more paint, reducing coverage to 80-90 square feet per liter."
          },
          {
            question: "Should I subtract doors and windows?",
            answer: "Yes, to get an accurate estimate, you should calculate the area of doors and windows and subtract it from your total wall area before using the calculator. An average door is about 21 sq. ft., and an average window is 15 sq. ft."
          }
        ]}
        seoContent={
          <div>
            <h2>How to Estimate Paint Required for Your Home</h2>
            <p>Estimating the right amount of paint is essential for any renovation or construction project. Buying too little paint leads to frustrating mid-project delays and potential color-matching issues across different batches. Buying too much wastes money and leaves you with hazardous materials to dispose of. This calculator ensures you purchase the exact quantity needed.</p>
            
            <h3>Understanding Paint Coverage</h3>
            <p>Paint coverage refers to how much area a specific volume of paint can cover effectively. This metric is usually printed on the paint can. Several factors affect coverage:</p>
            <ul>
              <li><strong>Surface Texture:</strong> Smooth, primed drywall requires less paint than porous surfaces like raw stucco or textured concrete.</li>
              <li><strong>Paint Quality:</strong> Premium paints have higher volume solids, meaning they cover better and require fewer coats.</li>
              <li><strong>Application Method:</strong> Spraying paint uses more volume than rolling, as some paint is lost to overspray.</li>
            </ul>
            
            <h3>Why Multiple Coats Are Necessary</h3>
            <p>A single coat of paint rarely provides adequate protection or a uniform finish. Here is why multiple coats are standard practice:</p>
            <ul>
              <li><strong>First Coat (Primer/Base):</strong> Seals the wall and provides a uniform surface for the topcoat to adhere to.</li>
              <li><strong>Second Coat (Topcoat):</strong> Develops the true color, sheen, and durability of the paint.</li>
              <li><strong>Third Coat:</strong> Often required when making drastic color changes (e.g., painting a light color over a dark wall).</li>
            </ul>
            <p>Always calculate your paint volume based on the total number of coats you intend to apply.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
