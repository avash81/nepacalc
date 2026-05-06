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
      <ModernCalcLayout hideH1={true}
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
          { label: 'Brick Calculator', href: '/calculator/brick-calculator/' },
            { label: 'Concrete Mix', href: '/calculator/concrete-mix/' },
            { label: 'Area Calculator', href: '/calculator/area-calculator/' },
            { label: 'Length Converter', href: '/calculator/length-converter/' },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Percentage Calc", href: "/calculator/percentage/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" }
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
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Paint Coverage Science: How Volume, Surface & Coats Interact</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>Accurate paint estimation is the difference between a seamless renovation and a frustrating mid-project color mismatch. Paint batches vary slightly between production runs, so running out mid-wall is a critical problem. Our <strong className="text-[#202124]">paint calculator</strong> uses the standard volumetric coverage formula (Area &divide; Coverage Rate = Liters) with ceiling rounding to ensure you always purchase enough paint without excessive waste.</p>
                <p>The key variable is <strong className="text-[#202124]">coverage rate</strong>, the area a given volume of paint covers at adequate opacity. This varies by paint quality (premium paints cover 10–15% more), wall texture, and application method. We recommend using the rate printed on your specific paint can for the most accurate estimate.</p>
              </div>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Factors Affecting Paint Coverage in Nepal's Climate</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Surface Porosity:</strong> Raw concrete and exposed brick (common in Nepal construction) are highly porous and may require a primer coat plus a 20–30% increase in paint volume compared to smooth, pre-painted drywall.</li>
                <li><strong className="text-[#188038]">Monsoon Humidity:</strong> High humidity during Nepal's monsoon season (June–September) extends drying time and can require thinner coats, potentially increasing the number of passes needed for full coverage.</li>
                <li><strong className="text-[#D93025]">Color Transition:</strong> Painting a light color over a dark wall (or vice versa) typically requires 3 coats instead of the standard 2 to achieve a uniform finish without bleed-through.</li>
              </ul>
            </div>
          </div>
        }
        faqs={[
          {
            question: "How much area does 1 liter of paint cover?",
            answer: "On average, 1 liter of standard acrylic emulsion paint covers about 100 to 120 square feet per coat. Premium paints may cover 130+ sq. ft. Rough or porous surfaces (like raw concrete or textured stucco) reduce coverage to 80–90 sq. ft. per liter. Always refer to the coverage rate on the paint can for precision."
          },
          {
            question: "Should I subtract windows and doors from my wall area?",
            answer: "Yes, for maximum accuracy. Measure each door (~21 sq. ft. average) and window (~15 sq. ft. average) and subtract their combined area from the total wall surface before entering the value into the calculator."
          },
          {
            question: "How many coats of paint do I typically need?",
            answer: "Standard interior painting: 2 coats. New/unprimed walls or drastic color changes: 3 coats. Exterior painting (sun and rain exposure): 2-3 coats with a primer. Using a primer as your first coat is recommended for all new construction."
          },
          {
            question: "Why does the calculator round up (ceiling function)?",
            answer: "We use ceiling rounding because you cannot purchase a fraction of a liter. If the calculation shows 11.2 liters, you need to buy 12 liters. Running short of paint mid-project risks color-match issues between different batches, so it's always better to buy slightly more."
          },
          {
            question: "What is primer and do I need to include it in this calculation?",
            answer: "Primer is a preparatory coating applied before the main paint to improve adhesion and reduce porosity. Primer typically has a lower coverage rate than finish paint (80–90 sq. ft. per liter). Run a separate calculation for the primer coat by setting 'Number of Coats' to 1 and adjusting the coverage rate accordingly."
          },
          {
            question: "What is the standard coverage for Berger, Asian, or Nippon paints sold in Nepal?",
            answer: "Most mid-range acrylic interior paints sold in Nepal (including Berger WeatherCoat, Asian Apcolite, and Nippon Vinilex) specify approximately 100–130 sq. ft. per liter at standard dilution. Check the back of the specific product can as coverage varies by product line (matt vs. silk vs. gloss)."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

