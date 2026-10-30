'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Droplets, Ruler, Box, Truck, CheckCircle2 } from 'lucide-react';

const GRADES = [
  { name: 'M5', ratio: [1, 5, 10], desc: '1:5:10', strength: '5 N/mm²', use: 'Lean / foundation base' },
  { name: 'M7.5', ratio: [1, 4, 8], desc: '1:4:8', strength: '7.5 N/mm²', use: 'Plain concrete, masonry' },
  { name: 'M10', ratio: [1, 3, 6], desc: '1:3:6', strength: '10 N/mm²', use: 'Patios, flooring' },
  { name: 'M15', ratio: [1, 2, 4], desc: '1:2:4', strength: '15 N/mm²', use: 'Pathways, plinths' },
  { name: 'M20', ratio: [1, 1.5, 3], desc: '1:1.5:3 (Standard)', strength: '20 N/mm²', use: 'Slabs, beams (residential)' },
  { name: 'M25', ratio: [1, 1, 2], desc: '1:1:2', strength: '25 N/mm²', use: 'Columns, heavy load' },
];

function fmt(n: number, maxDec = 1) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: maxDec });
}

interface State {
  calcMode: 'dimensions' | 'volume';
  dimUnit: 'feet' | 'meter';
  length: number;
  width: number;
  thickness: number;
  quantity: number;
  volumeVal: number;
  volumeUnit: 'm3' | 'cft';
  gradeName: string;
  wastage: number;
}

const DEFAULT_STATE: State = {
  calcMode: 'dimensions',
  dimUnit: 'feet',
  length: 30,
  width: 20,
  thickness: 4,      // 4 inches in feet mode, or 0.1m in meter mode
  quantity: 1,
  volumeVal: 10,
  volumeUnit: 'cft',
  gradeName: 'M20',
  wastage: 5,
};

export default function ConcreteMixCalculator() {
  const [state, setState] = useSyncState('concrete_mix_v4', DEFAULT_STATE);
  const { calcMode, dimUnit, length, width, thickness, quantity, volumeVal, volumeUnit, gradeName, wastage } = state;

  const updateState = (u: Partial<State>) => setState({ ...state, ...u });
  const grade = useMemo(() => GRADES.find(g => g.name === gradeName) || GRADES[4], [gradeName]);

  // Compute wet volume in both m3 and CFT
  const { wetVolM3, wetVolCft } = useMemo(() => {
    let m3 = 0;
    let cft = 0;

    if (calcMode === 'dimensions') {
      const qty = Math.max(1, quantity || 1);
      if (dimUnit === 'feet') {
        // Length(ft) * Width(ft) * Thickness(inches / 12) * qty
        const tInFeet = (thickness || 0) / 12;
        cft = (length || 0) * (width || 0) * tInFeet * qty;
        m3 = cft / 35.3147;
      } else {
        // Length(m) * Width(m) * Thickness(cm / 100) * qty
        const tInMeters = (thickness || 0) / 100;
        m3 = (length || 0) * (width || 0) * tInMeters * qty;
        cft = m3 * 35.3147;
      }
    } else {
      if (volumeUnit === 'm3') {
        m3 = volumeVal || 0;
        cft = m3 * 35.3147;
      } else {
        cft = volumeVal || 0;
        m3 = cft / 35.3147;
      }
    }

    return { wetVolM3: m3, wetVolCft: cft };
  }, [calcMode, dimUnit, length, width, thickness, quantity, volumeVal, volumeUnit]);

  // Apply dry volume factor (1.54) & wastage
  const result = useMemo(() => {
    const wastageFactor = 1 + (wastage || 0) / 100;
    const totalWetM3 = wetVolM3 * wastageFactor;
    const dryVolM3 = totalWetM3 * 1.54; // Standard dry volume factor
    const dryVolCft = dryVolM3 * 35.3147;

    const sumRatios = grade.ratio[0] + grade.ratio[1] + grade.ratio[2];

    // Cement
    // 1 bag = 50 kg = 0.03472 m³ (approx 1.226 CFT)
    const cementVolM3 = (grade.ratio[0] / sumRatios) * dryVolM3;
    const cementBags = cementVolM3 / 0.03472;
    const cementKg = cementBags * 50;

    // Sand
    const sandVolM3 = (grade.ratio[1] / sumRatios) * dryVolM3;
    const sandCft = sandVolM3 * 35.3147;
    const sandTractors = sandCft / 100; // ~100 CFT per standard tractor trolley in Nepal
    const sandTippers = sandCft / 300;   // ~300 CFT per tipper truck

    // Aggregate
    const aggregateVolM3 = (grade.ratio[2] / sumRatios) * dryVolM3;
    const aggregateCft = aggregateVolM3 * 35.3147;
    const aggregateTractors = aggregateCft / 100;
    const aggregateTippers = aggregateCft / 300;

    // Water: water-cement ratio ~0.50 (approx 25 liters per 50kg bag)
    const waterLiters = cementBags * 25;

    return {
      wetVolM3,
      wetVolCft,
      dryVolM3,
      dryVolCft,
      cementBags: Math.max(0, cementBags),
      cementKg: Math.max(0, cementKg),
      sandCft: Math.max(0, sandCft),
      sandVolM3: Math.max(0, sandVolM3),
      sandTractors: Math.max(0, sandTractors),
      sandTippers: Math.max(0, sandTippers),
      aggregateCft: Math.max(0, aggregateCft),
      aggregateVolM3: Math.max(0, aggregateVolM3),
      aggregateTractors: Math.max(0, aggregateTractors),
      aggregateTippers: Math.max(0, aggregateTippers),
      waterLiters: Math.max(0, waterLiters),
    };
  }, [wetVolM3, grade, wastage]);

  const inputCls = "w-full h-11 px-3 border border-[#DADCE0] rounded-lg bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#5F6368] tracking-wider block mb-1";

  return (
    <ModernCalcLayout
      slug="concrete-mix"
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Concrete Mix Calculator' }]}
      title="Concrete Mix Calculator (Cement, Sand & Aggregate)"
      description="Calculate exact cement bags (50kg), sand (CFT & tractor loads), aggregate, and water for slabs, columns, and beams across all grades (M5–M25)."
      icon={Droplets}
      inputs={
        <div className="space-y-6">

          {/* Mode Switcher: Dimensions vs Direct Volume */}
          <div className="flex bg-[#F1F3F4] p-1 rounded-xl">
            <button
              onClick={() => updateState({ calcMode: 'dimensions' })}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${calcMode === 'dimensions' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}
            >
              <Ruler className="w-3.5 h-3.5" /> Dimensions (L × W × T)
            </button>
            <button
              onClick={() => updateState({ calcMode: 'volume' })}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${calcMode === 'volume' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}
            >
              <Box className="w-3.5 h-3.5" /> Direct Total Volume
            </button>
          </div>

          {/* Dimensions Mode */}
          {calcMode === 'dimensions' ? (
            <div className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#DADCE0]">
                <span className="text-xs font-bold text-[#202124]">Structure Dimensions</span>
                <div className="flex bg-white border border-[#DADCE0] rounded-lg p-0.5">
                  <button
                    onClick={() => updateState({ dimUnit: 'feet', thickness: dimUnit === 'meter' ? 4 : thickness })}
                    className={`px-3 py-1 text-[10px] font-bold rounded ${dimUnit === 'feet' ? 'bg-[#1A73E8] text-white' : 'text-[#5F6368]'}`}
                  >
                    Feet & Inches
                  </button>
                  <button
                    onClick={() => updateState({ dimUnit: 'meter', thickness: dimUnit === 'feet' ? 10 : thickness })}
                    className={`px-3 py-1 text-[10px] font-bold rounded ${dimUnit === 'meter' ? 'bg-[#1A73E8] text-white' : 'text-[#5F6368]'}`}
                  >
                    Meters & CM
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Length ({dimUnit === 'feet' ? 'Feet' : 'Meters'})</label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={length}
                    onChange={e => updateState({ length: Number(e.target.value) })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Width ({dimUnit === 'feet' ? 'Feet' : 'Meters'})</label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={width}
                    onChange={e => updateState({ width: Number(e.target.value) })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Thickness / Depth ({dimUnit === 'feet' ? 'Inches' : 'CM'})</label>
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={thickness}
                    onChange={e => updateState({ thickness: Number(e.target.value) })}
                    className={inputCls}
                  />
                  <p className="text-[10px] text-[#5F6368] mt-1">{dimUnit === 'feet' ? 'Standard residential slab is 4 to 5 inches' : 'Standard slab is 10 to 12.5 cm'}</p>
                </div>
                <div>
                  <label className={labelCls}>Quantity (Count)</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e => updateState({ quantity: Math.max(1, Number(e.target.value)) })}
                    className={inputCls}
                  />
                  <p className="text-[10px] text-[#5F6368] mt-1">Number of identical slabs, columns, or footings</p>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-[#DADCE0] rounded-lg flex justify-between items-center text-xs">
                <span className="text-[#5F6368] font-medium">Calculated Wet Volume:</span>
                <span className="font-mono font-bold text-[#1A73E8]">{fmt(wetVolCft)} CFT ({fmt(wetVolM3, 2)} m³)</span>
              </div>
            </div>
          ) : (
            /* Direct Volume Mode */
            <div className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl space-y-4">
              <label className={labelCls}>Total Wet Concrete Volume</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0.1}
                  step={0.5}
                  value={volumeVal}
                  onChange={e => updateState({ volumeVal: Number(e.target.value) })}
                  className={inputCls}
                />
                <select
                  value={volumeUnit}
                  onChange={e => updateState({ volumeUnit: e.target.value as any })}
                  className="h-11 px-3 border border-[#DADCE0] rounded-lg bg-white text-xs font-bold text-[#202124] outline-none"
                >
                  <option value="cft">Cubic Feet (CFT)</option>
                  <option value="m3">Cubic Meters (m³)</option>
                </select>
              </div>
            </div>
          )}

          {/* Concrete Grade Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={labelCls}>Concrete Mix Grade</label>
              <span className="text-xs font-bold text-[#1A73E8]">{grade.desc}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GRADES.map(g => (
                <button
                  key={g.name}
                  onClick={() => updateState({ gradeName: g.name })}
                  className={`p-2.5 border rounded-xl text-center transition-all ${gradeName === g.name ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8] shadow-sm' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-[#F8F9FA]'}`}
                >
                  <div className="text-xs font-black">{g.name}</div>
                  <div className="text-[10px] opacity-75">{g.strength}</div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#5F6368]">{grade.use}</p>
          </div>

          {/* Wastage Preset Pills */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className={labelCls}>Wastage Allowance</label>
              <span className="text-xs font-bold text-[#202124]">{wastage}%</span>
            </div>
            <div className="flex gap-2">
              {[3, 5, 8, 10].map(w => (
                <button
                  key={w}
                  onClick={() => updateState({ wastage: w })}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${wastage === w ? 'bg-white border-[#1A73E8] text-[#1A73E8] shadow-sm' : 'bg-[#F8F9FA] border-[#DADCE0] text-[#5F6368] hover:bg-white'}`}
                >
                  {w}%
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#70757A]">3-5% for flat machine-mixed slabs; 8-10% for hand mixing or rough trenches.</p>
          </div>

        </div>
      }
      results={
        <div className="space-y-4">

          {/* Cement Hero Card */}
          <div className="p-6 bg-white border border-[#DADCE0] rounded-xl text-center shadow-sm relative overflow-hidden">
             <div className="text-xs font-bold text-[#1A73E8] uppercase tracking-wider mb-2">Total Cement Required</div>
             <div className="text-5xl lg:text-6xl font-black text-emerald-700 tracking-tight font-mono">
               {Math.ceil(result.cementBags)} <span className="text-2xl text-[#202124]">Bags</span>
             </div>
             <p className="text-xs text-[#5F6368] mt-2 font-medium">
               {fmt(result.cementKg)} kg total (Standard 50kg OPC/PPC bags)
             </p>
             <div className="mt-3 inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full">
               Dry Factor 1.54 Applied + {wastage}% Wastage
             </div>
          </div>

          {/* Sand & Aggregate Cards */}
          <div className="grid grid-cols-2 gap-3">
             <div className="p-4 bg-white border border-[#DADCE0] rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Sand (Fine Aggregate)</div>
                <div className="text-2xl font-black text-[#202124] font-mono">{fmt(result.sandCft)} <span className="text-xs">CFT</span></div>
                <div className="text-[11px] text-[#5F6368] font-medium">{fmt(result.sandVolM3, 2)} m³</div>
                <div className="pt-2 border-t border-[#F1F3F4] text-xs font-bold text-[#1A73E8] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> ≈ {fmt(result.sandTractors, 2)} Tractors
                </div>
             </div>

             <div className="p-4 bg-white border border-[#DADCE0] rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Gravel (Coarse Aggregate)</div>
                <div className="text-2xl font-black text-[#202124] font-mono">{fmt(result.aggregateCft)} <span className="text-xs">CFT</span></div>
                <div className="text-[11px] text-[#5F6368] font-medium">{fmt(result.aggregateVolM3, 2)} m³</div>
                <div className="pt-2 border-t border-[#F1F3F4] text-xs font-bold text-[#1A73E8] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> ≈ {fmt(result.aggregateTractors, 2)} Tractors
                </div>
             </div>
          </div>

          {/* Water & Batching Summary */}
          <div className="p-4 bg-white border border-[#DADCE0] rounded-xl space-y-3">
             <div className="flex justify-between items-center text-xs">
                <span className="text-[#5F6368] font-medium flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" /> Mixing Water:
                </span>
                <span className="font-bold text-[#202124]">{fmt(result.waterLiters, 0)} Liters (W/C ~0.50)</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-[#5F6368] font-medium">Wet Volume Required:</span>
                <span className="font-bold text-[#202124]">{fmt(result.wetVolCft)} CFT ({fmt(result.wetVolM3, 2)} m³)</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-[#5F6368] font-medium">Dry Volume to Order (1.54×):</span>
                <span className="font-bold text-emerald-700">{fmt(result.dryVolCft)} CFT ({fmt(result.dryVolM3, 2)} m³)</span>
             </div>
             <div className="flex justify-between items-center text-xs pt-2 border-t border-[#F1F3F4]">
                <span className="text-[#5F6368] font-medium">Tractor Trolley Reference:</span>
                <span className="font-bold text-[#70757A]">1 Tractor ≈ 100 CFT | 1 Tipper ≈ 300 CFT</span>
             </div>
          </div>

        </div>
      }
      details={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider">How to Order Materials in Nepal</h3>
             </div>
             <p className="text-xs text-[#5F6368] leading-relaxed mb-3">
                When purchasing building materials in Nepal, cement is sold per <strong>50 kg sack</strong> (OPC for structural elements, PPC for plaster/brickwork). Sand and coarse aggregate (Rodi) are typically quoted in <strong>CFT (Cubic Feet)</strong> or by the <strong>tractor load (approximately 100 to 110 CFT per standard trolley)</strong>.
             </p>
             <p className="text-xs text-[#5F6368] leading-relaxed">
                Always ensure sand is washed river sand (free from silt) and aggregate is clean crushed stone (20mm down for slabs and 40mm for mass concrete foundations).
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Brick Calculator", href: "/calculator/brick-calculator/" },
        { label: "Paint Cost Calculator", href: "/calculator/paint-cost/" },
        { label: "Nepal Land Converter", href: "/calculator/area-calculator/" }
      ]}
    />
  );
}
