'use client';
import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Shapes, 
  Square, 
  Circle, 
  Triangle, 
  Box, 
  HelpCircle, 
  Ruler, 
  Layers, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

type ShapeType = 'square' | 'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'ellipse';
type LinearUnit = 'm' | 'cm' | 'mm' | 'ft' | 'in' | 'yd' | 'km' | 'mi';
type TriangleMode = 'base_height' | 'three_sides';
type CircleMode = 'radius' | 'diameter';

interface UnitDef {
  id: LinearUnit;
  label: string;
  symbol: string;
  toMeters: number;
}

const UNITS: UnitDef[] = [
  { id: 'm', label: 'Meters (m)', symbol: 'm', toMeters: 1 },
  { id: 'ft', label: 'Feet (ft)', symbol: 'ft', toMeters: 0.3048 },
  { id: 'cm', label: 'Centimeters (cm)', symbol: 'cm', toMeters: 0.01 },
  { id: 'in', label: 'Inches (in)', symbol: 'in', toMeters: 0.0254 },
  { id: 'yd', label: 'Yards (yd)', symbol: 'yd', toMeters: 0.9144 },
  { id: 'mm', label: 'Millimeters (mm)', symbol: 'mm', toMeters: 0.001 },
  { id: 'km', label: 'Kilometers (km)', symbol: 'km', toMeters: 1000 },
  { id: 'mi', label: 'Miles (mi)', symbol: 'mi', toMeters: 1609.344 },
];

const SHAPES: { id: ShapeType; name: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'rectangle', name: 'Rectangle', icon: <Box className="w-4 h-4" />, desc: 'Length × Width' },
  { id: 'square', name: 'Square', icon: <Square className="w-4 h-4" />, desc: 'Side²' },
  { id: 'circle', name: 'Circle', icon: <Circle className="w-4 h-4" />, desc: 'π × r²' },
  { id: 'triangle', name: 'Triangle', icon: <Triangle className="w-4 h-4" />, desc: '½ × b × h or Heron\'s' },
  { id: 'trapezoid', name: 'Trapezoid', icon: <Shapes className="w-4 h-4" />, desc: '½ × (a + b) × h' },
  { id: 'parallelogram', name: 'Parallelogram', icon: <Layers className="w-4 h-4" />, desc: 'Base × Height' },
  { id: 'rhombus', name: 'Rhombus', icon: <Maximize2 className="w-4 h-4" />, desc: '½ × d₁ × d₂' },
  { id: 'ellipse', name: 'Ellipse', icon: <Circle className="w-4 h-4 scale-x-125" />, desc: 'π × a × b' },
];

export default function AreaCalculator() {
  const [shape, setShape] = useState<ShapeType>('rectangle');
  const [unit, setUnit] = useState<LinearUnit>('m');
  const [circleMode, setCircleMode] = useState<CircleMode>('radius');
  const [triangleMode, setTriangleMode] = useState<TriangleMode>('base_height');

  // Dimension parameters
  const [params, setParams] = useState<Record<string, number>>({
    length: 10,
    width: 6,
    side: 8,
    radius: 5,
    diameter: 10,
    base: 10,
    height: 6,
    sideA: 7,
    sideB: 8,
    sideC: 9,
    base2: 6,
    diag1: 12,
    diag2: 8,
    semiMajor: 8,
    semiMinor: 5,
  });

  // Net Area Cut-out subtraction toggle
  const [enableCutout, setEnableCutout] = useState(false);
  const [cutoutArea, setCutoutArea] = useState<number>(0);

  const updateParam = (key: string, val: number) => {
    setParams(prev => ({ ...prev, [key]: Math.max(0, val) }));
  };

  const unitDef = UNITS.find(u => u.id === unit) || UNITS[0];

  // Calculation Logic
  const calc = useMemo(() => {
    let rawArea = 0;
    let formulaStr = '';
    let stepStr = '';
    let perimeter: number | null = null;
    let perimeterFormula = '';
    let errorMsg: string | null = null;

    const sym = unitDef.symbol;

    switch (shape) {
      case 'square': {
        const s = params.side || 0;
        rawArea = s * s;
        formulaStr = 'Area = side²';
        stepStr = `${s} ${sym} × ${s} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        perimeter = 4 * s;
        perimeterFormula = `4 × ${s} = ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        break;
      }
      case 'rectangle': {
        const l = params.length || 0;
        const w = params.width || 0;
        rawArea = l * w;
        formulaStr = 'Area = length × width';
        stepStr = `${l} ${sym} × ${w} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        perimeter = 2 * (l + w);
        perimeterFormula = `2 × (${l} + ${w}) = ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        break;
      }
      case 'circle': {
        let r = params.radius || 0;
        if (circleMode === 'diameter') {
          const d = params.diameter || 0;
          r = d / 2;
          rawArea = Math.PI * r * r;
          formulaStr = 'Area = (π × d²) / 4';
          stepStr = `(π × ${d}²) / 4 = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
          perimeter = Math.PI * d;
          perimeterFormula = `π × ${d} = ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        } else {
          rawArea = Math.PI * r * r;
          formulaStr = 'Area = π × radius²';
          stepStr = `π × (${r} ${sym})² = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
          perimeter = 2 * Math.PI * r;
          perimeterFormula = `2 × π × ${r} = ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        }
        break;
      }
      case 'triangle': {
        if (triangleMode === 'base_height') {
          const b = params.base || 0;
          const h = params.height || 0;
          rawArea = 0.5 * b * h;
          formulaStr = 'Area = ½ × base × height';
          stepStr = `0.5 × ${b} ${sym} × ${h} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        } else {
          const a = params.sideA || 0;
          const b = params.sideB || 0;
          const c = params.sideC || 0;
          // Triangle inequality validation
          if (a + b <= c || a + c <= b || b + c <= a) {
            errorMsg = 'Invalid triangle: The sum of any two sides must be strictly greater than the third side.';
            rawArea = 0;
            formulaStr = "Heron's Formula: √[s(s - a)(s - b)(s - c)]";
            stepStr = 'Sides do not form a valid geometric triangle';
          } else {
            const s = (a + b + c) / 2;
            const radicand = s * (s - a) * (s - b) * (s - c);
            rawArea = Math.sqrt(Math.max(0, radicand));
            formulaStr = "Heron's Formula: √[s(s - a)(s - b)(s - c)]";
            stepStr = `Semi-perimeter s = ${s} ${sym}. Area = √[${s} × ${s - a} × ${s - b} × ${s - c}] = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
            perimeter = a + b + c;
            perimeterFormula = `${a} + ${b} + ${c} = ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
          }
        }
        break;
      }
      case 'trapezoid': {
        const a = params.base || 0;
        const b = params.base2 || 0;
        const h = params.height || 0;
        rawArea = 0.5 * (a + b) * h;
        formulaStr = 'Area = ½ × (Base₁ + Base₂) × height';
        stepStr = `0.5 × (${a} + ${b}) × ${h} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        break;
      }
      case 'parallelogram': {
        const b = params.base || 0;
        const h = params.height || 0;
        rawArea = b * h;
        formulaStr = 'Area = base × height';
        stepStr = `${b} ${sym} × ${h} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        break;
      }
      case 'rhombus': {
        const d1 = params.diag1 || 0;
        const d2 = params.diag2 || 0;
        rawArea = 0.5 * d1 * d2;
        formulaStr = 'Area = ½ × d₁ × d₂';
        stepStr = `0.5 × ${d1} ${sym} × ${d2} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        // Perimeter via Pythagoras: 4 * sqrt((d1/2)^2 + (d2/2)^2)
        const sideLen = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
        perimeter = 4 * sideLen;
        perimeterFormula = `4 × √[(${d1}/2)² + (${d2}/2)²] ≈ ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        break;
      }
      case 'ellipse': {
        const a = params.semiMajor || 0;
        const b = params.semiMinor || 0;
        rawArea = Math.PI * a * b;
        formulaStr = 'Area = π × a × b';
        stepStr = `π × ${a} ${sym} × ${b} ${sym} = ${rawArea.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${sym}²`;
        // Ramanujan approximation for ellipse perimeter
        const h = ((a - b) ** 2) / ((a + b) ** 2);
        perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        perimeterFormula = `Ramanujan Approx ≈ ${perimeter.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${sym}`;
        break;
      }
    }

    // Apply cut-out subtraction if active
    const netArea = enableCutout ? Math.max(0, rawArea - cutoutArea) : rawArea;

    // Convert to standard square meters
    const toM = unitDef.toMeters;
    const areaInSqMeters = netArea * (toM * toM);
    const totalSqFt = areaInSqMeters * 10.7639104167097;

    // Multi-unit conversions
    const conversions = {
      sqMeters: areaInSqMeters,
      sqFeet: totalSqFt,
      sqYards: areaInSqMeters * 1.1959900463,
      sqInches: areaInSqMeters * 1550.0031000062,
      sqCm: areaInSqMeters * 10000,
      acres: areaInSqMeters / 4046.8564224,
      hectares: areaInSqMeters / 10000,
      sqMiles: areaInSqMeters / 2589988.110336,
      sqKm: areaInSqMeters / 1000000,
    };

    // Nepali Land Decomposition (Ropani & Bigha)
    const ropani = Math.floor(totalSqFt / 5476);
    let rem = totalSqFt % 5476;
    const aana = Math.floor(rem / 342.25);
    rem = rem % 342.25;
    const paisa = Math.floor(rem / 85.5625);
    rem = rem % 85.5625;
    const daam = Number((rem / 21.390625).toFixed(2));
    const totalAana = (totalSqFt / 342.25).toFixed(3);

    const bigha = Math.floor(totalSqFt / 72900);
    let bRem = totalSqFt % 72900;
    const kattha = Math.floor(bRem / 3645);
    bRem = bRem % 3645;
    const dhur = Number((bRem / 182.25).toFixed(2));

    return {
      rawArea,
      netArea,
      formulaStr,
      stepStr,
      perimeter,
      perimeterFormula,
      errorMsg,
      conversions,
      nepalLand: {
        ropani,
        aana,
        paisa,
        daam,
        totalAana,
        bigha,
        kattha,
        dhur,
      }
    };
  }, [shape, unit, params, circleMode, triangleMode, enableCutout, cutoutArea, unitDef]);

  const inputCls = "w-full h-11 px-3.5 border border-[#DADCE0] rounded-lg bg-white text-sm font-semibold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#5F6368] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="area-calculator"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Area Calculator' },
      ]}
      title="Area Calculator: Find the Area of Any Shape Online"
      description="Find the area of squares, rectangles, circles, triangles, trapezoids, parallelograms, rhombuses, and ellipses. Instant results in m², sq ft, acres, hectares, and more."
      icon={Shapes}
      relatedTools={[
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Circumference Calculator", href: "/calculator/circumference-calculator/" },
        { label: "Unit Converter", href: "/calculator/unit-converter/" },
        { label: "3D Geometry & Volume", href: "/calculator/geometry-3d/" },
        { label: "Percentage Calculator", href: "/calculator/percentage/" }
      ]}
      inputs={
        <div className="space-y-6">
          {/* Step 1: Shape Selector */}
          <div className="space-y-2.5">
            <label className={labelCls}>Step 1: Select Geometric Shape</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    shape === s.id
                      ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1967D2] shadow-xs'
                      : 'bg-white border-[#DADCE0] text-[#3C4043] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={shape === s.id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}>{s.icon}</span>
                    <span className="text-xs font-bold">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-[#70757A]">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Linear Unit Selection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className={labelCls}>Step 2: Measurement Unit</label>
              <span className="text-xs text-[#5F6368] font-medium">All inputs will use this unit</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {UNITS.map(u => (
                <button
                  key={u.id}
                  onClick={() => setUnit(u.id)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all text-center cursor-pointer ${
                    unit === u.id
                      ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                      : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'
                  }`}
                >
                  {u.symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DADCE0]" />

          {/* Step 3: Shape Specific Inputs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className={labelCls}>Step 3: Enter Dimensions</label>
              <span className="text-xs font-semibold text-[#1A73E8]">Unit: {unitDef.label}</span>
            </div>

            {/* Square inputs */}
            {shape === 'square' && (
              <div>
                <label className={labelCls}>Side Length ({unitDef.symbol})</label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={params.side || ''}
                  onChange={e => updateParam('side', parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  placeholder="e.g. 10"
                />
              </div>
            )}

            {/* Rectangle inputs */}
            {shape === 'rectangle' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Length ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.length || ''}
                    onChange={e => updateParam('length', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 14"
                  />
                </div>
                <div>
                  <label className={labelCls}>Width ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.width || ''}
                    onChange={e => updateParam('width', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 12"
                  />
                </div>
              </div>
            )}

            {/* Circle inputs */}
            {shape === 'circle' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-1 bg-[#F1F3F4] rounded-lg w-fit">
                  <button
                    onClick={() => setCircleMode('radius')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      circleMode === 'radius' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-[#5F6368]'
                    }`}
                  >
                    Use Radius (r)
                  </button>
                  <button
                    onClick={() => setCircleMode('diameter')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      circleMode === 'diameter' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-[#5F6368]'
                    }`}
                  >
                    Use Diameter (d)
                  </button>
                </div>

                {circleMode === 'radius' ? (
                  <div>
                    <label className={labelCls}>Radius ({unitDef.symbol})</label>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={params.radius || ''}
                      onChange={e => updateParam('radius', parseFloat(e.target.value) || 0)}
                      className={inputCls}
                      placeholder="e.g. 5"
                    />
                  </div>
                ) : (
                  <div>
                    <label className={labelCls}>Diameter ({unitDef.symbol})</label>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={params.diameter || ''}
                      onChange={e => updateParam('diameter', parseFloat(e.target.value) || 0)}
                      className={inputCls}
                      placeholder="e.g. 10"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Triangle inputs */}
            {shape === 'triangle' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-1 bg-[#F1F3F4] rounded-lg w-fit">
                  <button
                    onClick={() => setTriangleMode('base_height')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      triangleMode === 'base_height' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-[#5F6368]'
                    }`}
                  >
                    Base & Height
                  </button>
                  <button
                    onClick={() => setTriangleMode('three_sides')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      triangleMode === 'three_sides' ? 'bg-white text-[#1A73E8] shadow-xs' : 'text-[#5F6368]'
                    }`}
                  >
                    3 Sides (Heron&apos;s Formula)
                  </button>
                </div>

                {triangleMode === 'base_height' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Base Length ({unitDef.symbol})</label>
                      <input
                        type="number"
                        min={0}
                        step="any"
                        value={params.base || ''}
                        onChange={e => updateParam('base', parseFloat(e.target.value) || 0)}
                        className={inputCls}
                        placeholder="e.g. 10"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Perpendicular Height ({unitDef.symbol})</label>
                      <input
                        type="number"
                        min={0}
                        step="any"
                        value={params.height || ''}
                        onChange={e => updateParam('height', parseFloat(e.target.value) || 0)}
                        className={inputCls}
                        placeholder="e.g. 6"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelCls}>Side A ({unitDef.symbol})</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={params.sideA || ''}
                          onChange={e => updateParam('sideA', parseFloat(e.target.value) || 0)}
                          className={inputCls}
                          placeholder="e.g. 7"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Side B ({unitDef.symbol})</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={params.sideB || ''}
                          onChange={e => updateParam('sideB', parseFloat(e.target.value) || 0)}
                          className={inputCls}
                          placeholder="e.g. 8"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Side C ({unitDef.symbol})</label>
                        <input
                          type="number"
                          min={0}
                          step="any"
                          value={params.sideC || ''}
                          onChange={e => updateParam('sideC', parseFloat(e.target.value) || 0)}
                          className={inputCls}
                          placeholder="e.g. 9"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-[#5F6368] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0 text-[#1A73E8]" />
                      Heron&apos;s formula calculates the exact area of any scalene or irregular triangle from its 3 boundaries.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Trapezoid inputs */}
            {shape === 'trapezoid' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Base 1 (Top) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.base || ''}
                    onChange={e => updateParam('base', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 10"
                  />
                </div>
                <div>
                  <label className={labelCls}>Base 2 (Bottom) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.base2 || ''}
                    onChange={e => updateParam('base2', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 16"
                  />
                </div>
                <div>
                  <label className={labelCls}>Height ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.height || ''}
                    onChange={e => updateParam('height', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 6"
                  />
                </div>
              </div>
            )}

            {/* Parallelogram inputs */}
            {shape === 'parallelogram' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Base Length ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.base || ''}
                    onChange={e => updateParam('base', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 12"
                  />
                </div>
                <div>
                  <label className={labelCls}>Perpendicular Height ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.height || ''}
                    onChange={e => updateParam('height', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 7"
                  />
                </div>
              </div>
            )}

            {/* Rhombus inputs */}
            {shape === 'rhombus' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Diagonal 1 (d₁) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.diag1 || ''}
                    onChange={e => updateParam('diag1', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 12"
                  />
                </div>
                <div>
                  <label className={labelCls}>Diagonal 2 (d₂) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.diag2 || ''}
                    onChange={e => updateParam('diag2', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 8"
                  />
                </div>
              </div>
            )}

            {/* Ellipse inputs */}
            {shape === 'ellipse' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Semi-Major Axis (a) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.semiMajor || ''}
                    onChange={e => updateParam('semiMajor', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 8"
                  />
                </div>
                <div>
                  <label className={labelCls}>Semi-Minor Axis (b) ({unitDef.symbol})</label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={params.semiMinor || ''}
                    onChange={e => updateParam('semiMinor', parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Optional Net Area Cut-out Subtraction */}
          <div className="pt-4 border-t border-[#DADCE0]">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#202124]">
                <input
                  type="checkbox"
                  checked={enableCutout}
                  onChange={e => setEnableCutout(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1A73E8] focus:ring-[#1A73E8] border-[#DADCE0]"
                />
                Subtract interior cut-outs (doors, windows, voids)
              </label>
              {enableCutout && (
                <span className="text-[11px] text-[#1A73E8] font-bold">Net Area Mode</span>
              )}
            </div>

            {enableCutout && (
              <div className="mt-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className={labelCls}>Total Cut-Out Area ({unitDef.symbol}²)</label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={cutoutArea || ''}
                  onChange={e => setCutoutArea(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  placeholder={`e.g. 2.5 ${unitDef.symbol}² (for doors or windows)`}
                />
                <p className="text-[11px] text-[#5F6368]">
                  This area will be subtracted from the gross geometric surface area.
                </p>
              </div>
            )}
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {/* Error validation banner if triangle is invalid */}
          {calc.errorMsg ? (
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Geometric Inequality Error</h4>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">{calc.errorMsg}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Primary Surface Area Card */}
              <div className="p-6 sm:p-8 bg-[#E8F0FE] border border-[#C2E7FF] rounded-2xl text-center relative overflow-hidden">
                <div className="text-[11px] font-black text-[#1A73E8] uppercase tracking-widest mb-1">
                  {enableCutout ? 'Calculated Net Usable Area' : 'Calculated Surface Area'}
                </div>
                <div className="text-4xl sm:text-5xl font-black text-[#1967D2] tracking-tight my-2">
                  {calc.netArea.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  <span className="text-xl sm:text-2xl font-bold ml-1.5 text-[#5F6368]">{unitDef.symbol}²</span>
                </div>
                <div className="text-xs font-semibold text-[#5F6368] max-w-md mx-auto">
                  Applied Formula: <code className="font-mono text-[#1967D2]">{calc.formulaStr}</code>
                </div>

                {enableCutout && (
                  <div className="mt-3 pt-3 border-t border-blue-200/60 flex justify-center gap-6 text-xs text-[#5F6368]">
                    <span>Gross Area: <strong>{calc.rawArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unitDef.symbol}²</strong></span>
                    <span>Cut-outs: <strong>-{cutoutArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unitDef.symbol}²</strong></span>
                  </div>
                )}
              </div>

              {/* Step by step arithmetic breakdown */}
              <div className="bg-white border border-[#DADCE0] rounded-xl p-4 shadow-xs">
                <div className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E3E]" /> Step-by-Step Calculation
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#202124] bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] overflow-x-auto whitespace-pre">
                  {calc.stepStr}
                </p>
                {calc.perimeter !== null && (
                  <div className="mt-3 flex items-center justify-between text-xs text-[#5F6368] pt-2 border-t border-[#F1F3F4]">
                    <span>Perimeter / Boundary:</span>
                    <span className="font-bold text-[#202124]">{calc.perimeterFormula}</span>
                  </div>
                )}
              </div>

              {/* Multi-Unit Conversions Grid */}
              <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-xs">
                <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#202124] uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-3.5 h-3.5 text-[#1A73E8]" /> Instant Multi-Unit Equivalents
                  </span>
                  <span className="text-[10px] text-[#5F6368]">Exact area conversions</span>
                </div>
                <div className="divide-y divide-[#F1F3F4] text-xs">
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Square Meters (m²)</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.sqMeters.toLocaleString(undefined, { maximumFractionDigits: 4 })} m²</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Square Feet (sq ft)</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.sqFeet.toLocaleString(undefined, { maximumFractionDigits: 2 })} ft²</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Square Yards (sq yd)</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.sqYards.toLocaleString(undefined, { maximumFractionDigits: 3 })} yd²</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Square Inches (sq in)</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.sqInches.toLocaleString(undefined, { maximumFractionDigits: 1 })} in²</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Acres</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.acres.toLocaleString(undefined, { maximumFractionDigits: 5 })} ac</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Hectares</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.hectares.toLocaleString(undefined, { maximumFractionDigits: 5 })} ha</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50">
                    <span className="font-medium text-[#5F6368]">Square Miles (sq mi)</span>
                    <span className="font-bold text-[#202124]">{calc.conversions.sqMiles.toLocaleString(undefined, { maximumFractionDigits: 7 })} mi²</span>
                  </div>
                </div>
              </div>

              {/* Regional Land Units: collapsible for Nepal / South Asia users */}
              <details className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-xs">
                <summary className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between cursor-pointer select-none list-none">
                  <span className="text-[11px] font-black text-[#202124] uppercase tracking-wider">
                    Regional Land Units: Ropani · Bigha · Kattha
                  </span>
                  <span className="text-[11px] text-[#1A73E8] font-bold whitespace-nowrap">Nepal / South Asia ▾</span>
                </summary>
                <div className="p-4 space-y-3">
                  <p className="text-[11px] text-[#5F6368] leading-relaxed">
                    Traditional land measurement units used in Nepal and parts of South Asia. Use the{' '}
                    <Link href="/calculator/nepal-land/" className="text-[#1A73E8] font-bold hover:underline">Nepal Land Converter</Link> for a full multi-tier breakdown.
                  </p>
                  <div className="p-3 bg-[#FEF7E0] border border-[#FEEFC3] rounded-lg">
                    <div className="text-[10px] uppercase font-bold text-[#B06000] tracking-wider mb-0.5">
                      Ropani System (Hills / Kathmandu Valley)
                    </div>
                    <div className="text-sm font-black text-[#202124]">
                      {calc.nepalLand.ropani} Ropani · {calc.nepalLand.aana} Aana · {calc.nepalLand.paisa} Paisa · {calc.nepalLand.daam} Daam
                    </div>
                    <div className="text-xs text-[#5F6368] mt-1">
                      Total: <strong className="text-[#202124]">{calc.nepalLand.totalAana} Aana</strong>
                    </div>
                  </div>
                  <div className="p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg">
                    <div className="text-[10px] uppercase font-bold text-[#137333] tracking-wider mb-0.5">
                      Bigha System (Terai / Plains)
                    </div>
                    <div className="text-sm font-black text-[#202124]">
                      {calc.nepalLand.bigha} Bigha · {calc.nepalLand.kattha} Kattha · {calc.nepalLand.dhur} Dhur
                    </div>
                  </div>
                </div>
              </details>
            </>
          )}

          {/* Quick Guidance Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-[#5F6368] leading-relaxed">
            <strong className="text-[#202124] flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#1A73E8]" /> Measurement Tip
            </strong>
            Always verify that all input measurements share the same dimension scale. If measuring irregular plots, use triangulation (dividing the polygon into triangles) to calculate total surface area without distortion.
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#202124]">How to Calculate Area for Common Shapes</h3>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Area represents the extent of a two-dimensional surface enclosed by a perimeter boundary. Depending on the geometric characteristics of the shape, use the following standard equations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
                <strong className="text-[#202124] block mb-1">Square & Rectangle:</strong>
                Multiply length by width. For a square, multiply side by side (A = s²).
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
                <strong className="text-[#202124] block mb-1">Circle:</strong>
                Multiply Pi (π ≈ 3.14159) by the radius squared (A = πr²).
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
                <strong className="text-[#202124] block mb-1">Triangle:</strong>
                Multiply half of the base by the perpendicular height (A = ½ × b × h).
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
                <strong className="text-[#202124] block mb-1">Trapezoid:</strong>
                Average the parallel top and bottom bases, then multiply by height (A = ½ × (a + b) × h).
              </div>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the shape from the top grid (Square, Rectangle, Circle, Triangle, Trapezoid, Parallelogram, Rhombus, or Ellipse).",
          "Choose your measurement unit (meters, feet, centimeters, inches, yards, kilometers, or miles).",
          "Enter known dimensions in the input fields. For circles, toggle between radius and diameter.",
          "Check the primary area result card, applied formula, and step-by-step arithmetic.",
          "Review the live multi-unit conversion table to see equivalents in square feet, square meters, acres, hectares, and square miles.",
          "For land plots, check the multi-unit table for acres, hectares, and square miles. Expand the Regional Land Units section for Ropani, Aana, and Bigha measurements (Nepal / South Asia)."
        ]
      }}
      formula={{
        title: "Standard 2D Geometric Area Formulas",
        description: "Standard mathematical formulas for calculating two-dimensional surface areas.",
        raw: "Square: A = s²\nRectangle: A = l × w\nCircle: A = π × r² = (π × d²) / 4\nTriangle: A = ½ × b × h  (or Heron's: √[s(s-a)(s-b)(s-c)])\nTrapezoid: A = ½ × (a + b) × h\nParallelogram: A = b × h\nRhombus: A = ½ × d₁ × d₂\nEllipse: A = π × a × b"
      }}
      faqs={[
        {
          question: "How do I calculate the area of a room or floor?",
          answer: "Measure the length and width of the room in feet or meters. Multiply the length by the width to get the square footage (or square meters). For example, a 12 ft by 14 ft bedroom has an area of 168 square feet (15.61 m²). If tiling, add 10% for cutting waste."
        },
        {
          question: "How do I calculate the area of an irregular plot or field?",
          answer: "Divide the irregular parcel into non-overlapping triangles. Measure the three side lengths of each triangle and apply Heron's formula (A = √[s(s-a)(s-b)(s-c)]) to calculate each triangle's area, then sum them together for the total land area."
        },
        {
          question: "How do I convert square meters (m²) to square feet (sq ft)?",
          answer: "1 square meter equals exactly 10.7639 square feet. To convert square meters to square feet, multiply by 10.7639. To convert square feet to square meters, divide by 10.7639."
        },
        {
          question: "How many square feet are in 1 acre?",
          answer: "One acre equals exactly 43,560 square feet (4,046.86 m² or 0.4047 hectares). It is the standard land unit in the US, UK, Canada, and parts of South Asia, roughly the area of a standard football field."
        },
        {
          question: "What is the difference between an acre and a hectare?",
          answer: "A hectare equals 10,000 square meters (107,639 sq ft or 2.471 acres), the international standard in Europe, Australia, and most of Asia. An acre (43,560 sq ft) is preferred in the US, UK, and Canada. Both appear automatically in the multi-unit results table above."
        },
        {
          question: "What is Heron's Formula for triangle area?",
          answer: "Heron's formula calculates the area of a triangle when all 3 side lengths (a, b, c) are known without needing perpendicular height. First calculate semi-perimeter s = (a + b + c) / 2. Then Area = √[s × (s - a) × (s - b) × (s - c)]."
        },
        {
          question: "How is net area calculated for wall painting?",
          answer: "Net wall area equals total gross wall area (2 × (Length + Width) × Height) minus openings for doors and windows. This gives the exact paintable surface area to estimate paint gallons or liters."
        }
      ]}
      sidebar={{
        title: "Related Geometry Tools",
        links: [
          { label: "Nepal Land Area Converter", href: "/calculator/nepal-land/" },
          { label: "Circumference Calculator", href: "/calculator/circumference-calculator/" },
          { label: "Unit Converter", href: "/calculator/unit-converter/" },
          { label: "3D Geometry & Volume", href: "/calculator/geometry-3d/" },
          { label: "Square Footage / Construction", href: "/calculator/construction-calculator/" }
        ],
        banner: {
          title: "Geometry Solver",
          description: "Instantly solve surface area, perimeter, and boundary dimensions for any geometric figure.",
          image: "/images/math-banner.jpg"
        }
      }}
    />
  );
}
