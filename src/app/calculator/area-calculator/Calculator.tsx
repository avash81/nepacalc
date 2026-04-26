'use client';
import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Shapes, Square, Circle, Triangle, Box, HelpCircle } from 'lucide-react';

const SHAPES = [
  { id: 'square', name: 'Square', icon: <Square className="w-3.5 h-3.5" /> },
  { id: 'rectangle', name: 'Rectangle', icon: <Box className="w-3.5 h-3.5" /> },
  { id: 'circle', name: 'Circle', icon: <Circle className="w-3.5 h-3.5" /> },
  { id: 'triangle', name: 'Triangle', icon: <Triangle className="w-3.5 h-3.5" /> },
  { id: 'trapezoid', name: 'Trapezoid', icon: <Shapes className="w-3.5 h-3.5" /> },
];

export default function AreaCalculator() {
  const [shape, setShape] = useState('square');
  const [params, setParams] = useState<Record<string, number>>({ side: 0, width: 0, height: 0, radius: 0, base: 0, base2: 0 });

  const updateParam = (key: string, val: number) => setParams(prev => ({ ...prev, [key]: val }));

  const result = useMemo(() => {
    switch (shape) {
      case 'square': return { area: params.side ** 2, formula: 'side²' };
      case 'rectangle': return { area: params.width * params.height, formula: 'width × height' };
      case 'circle': return { area: Math.PI * (params.radius ** 2), formula: 'π × radius²' };
      case 'triangle': return { area: 0.5 * params.base * params.height, formula: '½ × base × height' };
      case 'trapezoid': return { area: 0.5 * (params.base + params.base2) * params.height, formula: '½ × (base1 + base2) × height' };
      default: return { area: 0, formula: '' };
    }
  }, [shape, params]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Area Calculator' }]}
      title="Area Calculator"
      description="Calculate the exact area of geometric 2D shapes including Squares, Rectangles, Circles, Triangles, and Trapezoids."
      icon={Shapes}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Select Shape</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SHAPES.map((s) => (
                <button key={s.id} onClick={() => setShape(s.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border transition-all ${shape === s.id ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#70757A] hover:bg-[#F8F9FA]'}`}>
                  {s.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#DADCE0]">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shape === 'square' && (
                  <div><label className={labelCls}>Side Length</label><input type="number" value={params.side} min={0} onChange={e => updateParam('side', Number(e.target.value))} className={inputCls} /></div>
                )}
                {shape === 'rectangle' && (
                  <>
                    <div><label className={labelCls}>Width</label><input type="number" value={params.width} min={0} onChange={e => updateParam('width', Number(e.target.value))} className={inputCls} /></div>
                    <div><label className={labelCls}>Height</label><input type="number" value={params.height} min={0} onChange={e => updateParam('height', Number(e.target.value))} className={inputCls} /></div>
                  </>
                )}
                {shape === 'circle' && (
                  <div><label className={labelCls}>Radius</label><input type="number" value={params.radius} min={0} onChange={e => updateParam('radius', Number(e.target.value))} className={inputCls} /></div>
                )}
                {shape === 'triangle' && (
                  <>
                    <div><label className={labelCls}>Base</label><input type="number" value={params.base} min={0} onChange={e => updateParam('base', Number(e.target.value))} className={inputCls} /></div>
                    <div><label className={labelCls}>Height</label><input type="number" value={params.height} min={0} onChange={e => updateParam('height', Number(e.target.value))} className={inputCls} /></div>
                  </>
                )}
                {shape === 'trapezoid' && (
                  <>
                    <div><label className={labelCls}>Base 1 (Top)</label><input type="number" value={params.base} min={0} onChange={e => updateParam('base', Number(e.target.value))} className={inputCls} /></div>
                    <div><label className={labelCls}>Base 2 (Bottom)</label><input type="number" value={params.base2} min={0} onChange={e => updateParam('base2', Number(e.target.value))} className={inputCls} /></div>
                    <div className="sm:col-span-2"><label className={labelCls}>Height</label><input type="number" value={params.height} min={0} onChange={e => updateParam('height', Number(e.target.value))} className={inputCls} /></div>
                  </>
                )}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2 relative z-10">Calculated Area</div>
             <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4 relative z-10">{result.area.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase bg-[#E8F0FE] inline-flex px-3 py-1 rounded relative z-10 tracking-wider">Formula: {result.formula}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-5 space-y-3">
             <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] flex items-center gap-2">
               <HelpCircle className="w-3.5 h-3.5" /> Measurement Context
             </h4>
             <ul className="space-y-2 text-xs text-[#202124] leading-relaxed">
               <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0" />Ensure all units (cm, m, inches) are identical before calculating.</li>
               <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0" />The final area is always represented in "square units" (e.g. square meters, square feet).</li>
             </ul>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering Geometric Surface Calculations</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Surface area is one of the most fundamental measurements in both theoretical mathematics and practical engineering. Our <strong className="text-[#202124]">area calculator</strong> is an all-in-one geometry engine designed to compute the exact footprint of 2D shapes. Whether you are a student solving a geometry proof or a contractor in Kathmandu estimating the number of tiles required for a project, precision is non-negotiable.
              </p>
              <p>
                A common pitfall in surface calculation is unit inconsistency. This <strong className="text-[#202124]">shape area calculator</strong> assumes that all inputs are provided in the same linear unit (e.g., all meters or all feet). The resulting output will always be in "square units," which represents the total 2D space occupied by the shape on a flat plane.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Shape-Specific Mathematical Insights</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Circles & The Pi Constant:</strong> Calculating the <strong>area of a circle</strong> requires the irrational number Pi (~3.14159). Our engine uses a high-precision constant to ensure that for everything from piping diameter to circular architectural elements, your results are mathematically robust.</li>
              <li><strong className="text-[#188038]">Triangles & Trapezoids:</strong> These shapes are frequently encountered in irregular land plots in Nepal. Using the <strong>base and height method</strong>, we provide a quick way to decompose complex 2D landscapes into manageable geometric segments.</li>
              <li><strong className="text-[#D93025]">Practical Application:</strong> In construction and tailoring, area estimation directly correlates to cost. By using a <strong>standard area formula</strong> for rectangles and squares, users can minimize waste and optimize material procurement, saving significant resources in long-term projects.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select the 2D shape you want to analyze from the toggle grid.", "Enter the required dimensions (side, radius, base, height).", "The area calculates instantly based on standard geometric formulas."] }}
      formula={{ title: "Geometric Area Formulas", description: "Standard surface area formulas.", raw: "Square: Area = side × side\nRectangle: Area = width × height\nCircle: Area = π × radius²\nTriangle: Area = 0.5 × base × height\nTrapezoid: Area = 0.5 × (base1 + base2) × height" }}
      faqs={[
        { question: "What is area and how is it measured?", answer: "Area is the quantity that expresses the total 2D space enclosed by a shape, measured in square units (e.g., m², cm², ft²). If you measure in meters, your area is in square meters. If in feet, it's square feet. Always ensure all input dimensions use the same unit before calculating." },
        { question: "How do I calculate the area of a circle?", answer: "The area of a circle is π × radius². For example, a circle with radius 7 cm has an area of 3.14159 × 49 = 153.94 cm². This formula is derived from the fundamental relationship between a circle's circumference and its radius (C = 2πr)." },
        { question: "What is the difference between area and perimeter?", answer: "Area is the space inside a 2D shape (measured in square units). Perimeter is the total length of the boundary of the shape (measured in linear units). For a 5×3 rectangle: area = 15 m², perimeter = 16 m. They measure completely different properties of the same shape." },
        { question: "How do I convert between square meters and square feet?", answer: "1 square meter = 10.764 square feet. To convert m² to ft², multiply by 10.764. To convert ft² to m², divide by 10.764. For land measurement in Nepal, 1 Aana = 342.25 sq.ft = 31.8 m², and 1 Ropani = 5,476 sq.ft = 508.7 m²." },
        { question: "How is area used in construction in Nepal?", answer: "In Nepal, area calculations are critical for: (1) estimating tiles needed for a floor (total floor area ÷ tile area), (2) paint estimation (wall area), (3) land valuation (Aana, Ropani, Bigha), and (4) concrete or brick estimations. Contractors use area as the base unit for nearly all material procurement." },
        { question: "What is a trapezoid and when is the formula used?", answer: "A trapezoid (also called trapezium) is a 4-sided shape with exactly one pair of parallel sides (called the bases). The area formula is: ½ × (base1 + base2) × height. This shape commonly appears in land plots with one sloped boundary, making this formula essential for irregular plot area estimation in Nepal." }
      ]}
      sidebar={{ title: "Math & Education Tools", links: [{ label: "Unit Converter", href: "/calculator/unit-converter" }, { label: "Percentage Calculator", href: "/calculator/percentage" }], banner: { title: "Geometry Solver", description: "Quickly determine the 2D surface footprint of any primary shape.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Unit Converter", href: "/calculator/unit-converter" }]}
    />
  );
}
