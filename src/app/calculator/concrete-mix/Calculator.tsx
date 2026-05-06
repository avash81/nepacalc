'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Droplets, Info, Calculator as CalcIcon } from 'lucide-react';

const GRADES = [
  { name: 'M5', ratio: [1, 5, 10], desc: '1:5:10' },
  { name: 'M7.5', ratio: [1, 4, 8], desc: '1:4:8' },
  { name: 'M10', ratio: [1, 3, 6], desc: '1:3:6' },
  { name: 'M15', ratio: [1, 2, 4], desc: '1:2:4' },
  { name: 'M20', ratio: [1, 1.5, 3], desc: '1:1.5:3 (Standard)' },
  { name: 'M25', ratio: [1, 1, 2], desc: '1:1:2' },
];

function fmt(n: number) { return n.toLocaleString('en-IN', { maximumFractionDigits: 2 }); }

const DEFAULT_STATE = { unit: 'm' as 'm' | 'ft', volume: 10, gradeName: 'M20', wastage: 5, dryFactor: 1.54 };

export default function ConcreteMixCalculator() {
  const [state, setState] = useSyncState('concrete_mix_v3', DEFAULT_STATE);
  const { unit, volume, gradeName, wastage, dryFactor } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });
  const grade = useMemo(() => GRADES.find(g => g.name === gradeName) || GRADES[4], [gradeName]);

  const result = useMemo(() => {
    const totalVolume = volume * (1 + wastage / 100);
    const dryVolume = totalVolume * dryFactor;
    const sum = grade.ratio[0] + grade.ratio[1] + grade.ratio[2];
    
    const cementVol = (grade.ratio[0] / sum) * dryVolume;
    const cementBags = cementVol / 0.0347;
    const cementKg = cementBags * 50;

    const sandVol = (grade.ratio[1] / sum) * dryVolume;
    const sandCft = sandVol * 35.3147;

    const aggregateVol = (grade.ratio[2] / sum) * dryVolume;
    const aggregateCft = aggregateVol * 35.3147;

    return { cementBags, cementKg, sandVol, sandCft, aggregateVol, aggregateCft, dryVolume, totalVolume };
  }, [volume, grade, wastage, dryFactor]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-lg bg-white text-sm font-bold focus:border-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[10px] font-black uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="concrete-mix"
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Concrete Mixer' }]}
      title="Concrete Mix Calculator"
      description="Estimate cement, sand, and aggregate requirements for various concrete grades (M5 to M25)."
      icon={Droplets}
      inputs={
        <div className="space-y-6">
          <div className="flex justify-end">
             <div className="flex bg-[#F1F3F4] p-1 rounded-xl">
                {['m', 'ft'].map(u => (
                  <button key={u} onClick={() => updateState({ unit: u as any })}
                    className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${unit === u ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                    {u === 'm' ? 'Metric' : 'Imperial'}
                  </button>
                ))}
             </div>
          </div>

          <div>
             <label className={labelCls}>Wet Volume Required</label>
             <div className="relative">
                <input type="number" value={volume} onChange={e => updateState({ volume: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#70757A]">{unit === 'm' ? 'm³' : 'ft³'}</span>
             </div>
          </div>

          <div className="space-y-3">
             <label className={labelCls}>Concrete Grade</label>
             <div className="grid grid-cols-3 gap-2">
                {GRADES.map(g => (
                  <button key={g.name} onClick={() => updateState({ gradeName: g.name })}
                    className={`p-3 border rounded-xl text-center transition-all ${gradeName === g.name ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#70757A]'}`}>
                     <div className="text-[11px] font-black">{g.name}</div>
                  </button>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-[#DADCE0] rounded-3xl text-center shadow-xl">
             <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-4">Cement Requirement</div>
             <div className="text-6xl font-black text-[#188038] tracking-tighter">{Math.ceil(result.cementBags)} <span className="text-xl">Bags</span></div>
             <p className="text-[10px] font-bold text-[#70757A] mt-2 uppercase">Total {fmt(result.cementKg)} KG</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl">
                <div className="text-[10px] font-black text-[#E37400] uppercase mb-2">Sand Volume</div>
                <div className="text-xl font-black">{fmt(result.sandVol)} m³</div>
                <div className="text-[9px] font-bold text-[#70757A]">{fmt(result.sandCft)} CFT</div>
             </div>
             <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl">
                <div className="text-[10px] font-black text-[#188038] uppercase mb-2">Aggregate</div>
                <div className="text-xl font-black">{fmt(result.aggregateVol)} m³</div>
                <div className="text-[9px] font-bold text-[#70757A]">{fmt(result.aggregateCft)} CFT</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Mix Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Professional civil engineering tool for estimating material requirements with high precision.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Brick Calculator", href: "/calculator/brick-calculator/" },
        { label: "Paint Estimator", href: "/calculator/paint-cost/" },
        { label: "Age Calculator", href: "/calculator/age-calculator/" }
      ]}
    />
  );
}
