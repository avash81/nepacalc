'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Shapes, Square, Circle, Triangle, Box, HelpCircle } from 'lucide-react';

const SHAPES = [
  { id: 'square', name: 'Square', icon: <Square className="w-4 h-4" /> },
  { id: 'rectangle', name: 'Rectangle', icon: <Box className="w-4 h-4" /> },
  { id: 'circle', name: 'Circle', icon: <Circle className="w-4 h-4" /> },
  { id: 'triangle', name: 'Triangle', icon: <Triangle className="w-4 h-4" /> },
  { id: 'trapezoid', name: 'Trapezoid', icon: <Shapes className="w-4 h-4" /> },
];

export default function AreaCalculator() {
  const [shape, setShape] = useState('square');
  const [params, setParams] = useState<Record<string, number>>({
    side: 0,
    width: 0,
    height: 0,
    radius: 0,
    base: 0,
    base2: 0,
  });

  const updateParam = (key: string, val: number) => {
    setParams(prev => ({ ...prev, [key]: val }));
  };

  const result = useMemo(() => {
    switch (shape) {
      case 'square':
        return { area: params.side ** 2, formula: 'side²' };
      case 'rectangle':
        return { area: params.width * params.height, formula: 'width × height' };
      case 'circle':
        return { area: Math.PI * (params.radius ** 2), formula: 'π × radius²' };
      case 'triangle':
        return { area: 0.5 * params.base * params.height, formula: '½ × base × height' };
      case 'trapezoid':
        return { area: 0.5 * (params.base + params.base2) * params.height, formula: '½ × (base1 + base2) × height' };
      default:
        return { area: 0, formula: '' };
    }
  }, [shape, params]);

  return (
    <CalculatorErrorBoundary calculatorName="Area Calculator">
      <CalculatorLayout
        title="Area Calculator"
        description="Calculate the area of various 2D shapes with precision and clear formulas."
        badge="Geometry"
        badgeColor="blue"
        category={{ label: 'Math & Education', href: '/calculator/category/education' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Shape</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-xs font-bold ${
                      shape === s.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                  >
                    {s.icon}
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              {shape === 'square' && (
                <ValidatedInput label="Side Length" value={params.side} onChange={(v) => updateParam('side', v)} min={0} />
              )}
              {shape === 'rectangle' && (
                <>
                  <ValidatedInput label="Width" value={params.width} onChange={(v) => updateParam('width', v)} min={0} />
                  <ValidatedInput label="Height" value={params.height} onChange={(v) => updateParam('height', v)} min={0} />
                </>
              )}
              {shape === 'circle' && (
                <ValidatedInput label="Radius" value={params.radius} onChange={(v) => updateParam('radius', v)} min={0} />
              )}
              {shape === 'triangle' && (
                <>
                  <ValidatedInput label="Base" value={params.base} onChange={(v) => updateParam('base', v)} min={0} />
                  <ValidatedInput label="Height" value={params.height} onChange={(v) => updateParam('height', v)} min={0} />
                </>
              )}
              {shape === 'trapezoid' && (
                <>
                  <ValidatedInput label="Base 1 (Top)" value={params.base} onChange={(v) => updateParam('base', v)} min={0} />
                  <ValidatedInput label="Base 2 (Bottom)" value={params.base2} onChange={(v) => updateParam('base2', v)} min={0} />
                  <ValidatedInput label="Height" value={params.height} onChange={(v) => updateParam('height', v)} min={0} />
                </>
              )}
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="relative z-10">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/70 mb-2">Calculated Area</div>
                 <div className="text-5xl font-black text-slate-900 tracking-tighter mb-2">
                   {result.area.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                 </div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                   Formula: {result.formula}
                 </div>
               </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-100 space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                 <HelpCircle className="w-3.5 h-3.5" /> Quick Tips
               </h4>
               <ul className="space-y-3 text-xs text-slate-600 font-medium leading-relaxed">
                 <li className="flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                   Ensure all units (cm, m, inches) are the same for accurate results.
                 </li>
                 <li className="flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                   Resulting area is always in square units (e.g., m²).
                 </li>
               </ul>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Understanding Area Calculations</h2>
            <p>Area measures the size of a surface. Our tool helps you calculate technical dimensions for construction, landscaping, or academic homework with precision.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Why Area Matters?</h3>
                <p className="text-sm text-slate-600">Whether you are buying carpet for a room or seeds for a lawn, knowing the exact area prevents waste and saves money.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Unit Conversions</h3>
                <p className="text-sm text-slate-600">1 square meter = 10.764 square feet. 1 hectare = 10,000 square meters.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
