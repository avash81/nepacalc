'use client';
import { useState, useMemo } from 'react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { Calculator, Info, Ruler } from 'lucide-react';

const GRADES = [
  { name: 'M5', ratio: [1, 5, 10], desc: '1:5:10 (Cement:Sand:Aggregate)' },
  { name: 'M7.5', ratio: [1, 4, 8], desc: '1:4:8' },
  { name: 'M10', ratio: [1, 3, 6], desc: '1:3:6' },
  { name: 'M15', ratio: [1, 2, 4], desc: '1:2:4' },
  { name: 'M20', ratio: [1, 1.5, 3], desc: '1:1.5:3 (Standard)' },
  { name: 'M25', ratio: [1, 1, 2], desc: '1:1:2' },
];

function fmt(n: number) {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 3 });
}

import { useSyncState } from '@/hooks/useSyncState';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';

const DEFAULT_STATE = {
  unit: 'm' as 'm' | 'ft',
  volume: 10,
  gradeName: 'M20',
  wastage: 5,
  dryFactor: 1.54,
};

export default function ConcreteMixCalculator() {
  const [state, setState] = useSyncState('concrete_mix_v2', DEFAULT_STATE);
  const { unit, volume, gradeName, wastage, dryFactor } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const grade = useMemo(() => GRADES.find(g => g.name === gradeName) || GRADES[4], [gradeName]);

  const result = useMemo(() => {
    const totalVolume = volume * (1 + wastage / 100);
    const dryVolume = totalVolume * dryFactor;
    
    // Sum of ratio = 1 + sand + aggregate
    const sum = grade.ratio[0] + grade.ratio[1] + grade.ratio[2];
    
    // Cement calculation
    const cementVol = (grade.ratio[0] / sum) * dryVolume;
    const cementBags = cementVol / 0.0347; // 1 Bag = 0.0347 m3 approx
    const cementKg = cementBags * 50;

    // Sand calculation
    const sandVol = (grade.ratio[1] / sum) * dryVolume;
    const sandCft = sandVol * 35.3147;

    // Aggregate calculation
    const aggregateVol = (grade.ratio[2] / sum) * dryVolume;
    const aggregateCft = aggregateVol * 35.3147;

    return { 
      cementBags, 
      cementKg, 
      sandVol, 
      sandCft, 
      aggregateVol, 
      aggregateCft,
      dryVolume,
      totalVolume
    };
  }, [volume, grade, wastage, dryFactor]);

  return (
    <CalculatorLayout
      title="Concrete Mix & Quantity Calculator"
      description="Professional civil engineering tool for estimating cement, sand, and aggregate requirements for various concrete grades (M5 to M25)."
      category={{ label: 'Education & Engineering', href: '/calculator/category/education' }}
      leftPanel={
        <div className="space-y-8">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            {[
              { id: 'm', l: 'Metric (m³)' },
              { id: 'ft', l: 'Imperial (ft³)' },
            ].map(u => (
              <button key={u.id}
                onClick={() => updateState({ unit: u.id as any })}
                className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${unit === u.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
              >
                {u.l}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <ValidatedInput 
              label={`Total Wet Volume (${unit === 'm' ? 'm³' : 'ft³'})`} 
              value={volume} 
              onChange={v => updateState({ volume: v })} 
              min={0}
              suffix={unit === 'm' ? 'm³' : 'ft³'}
            />

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5" /> Select Concrete Grade
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {GRADES.map(g => (
                  <button
                    key={g.name}
                    onClick={() => updateState({ gradeName: g.name })}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${gradeName === g.name ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="text-sm font-black text-gray-900">{g.name}</div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase mt-1">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <ValidatedInput label="Wastage (%)" value={wastage} onChange={v => updateState({ wastage: v })} min={0} max={100} />
               <ValidatedInput label="Dry Factor" value={dryFactor} onChange={v => updateState({ dryFactor: v })} step={0.01} min={1} />
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
               <Calculator className="w-24 h-24" />
            </div>
            <div className="relative z-10">
               <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Estimated Material</div>
               
               <div className="space-y-10">
                 <div>
                   <div className="text-6xl font-black text-white flex items-baseline gap-3 tracking-tighter">
                     {fmt(Math.ceil(result.cementBags))} <span className="text-sm font-bold text-blue-400/50 uppercase tracking-widest">Bags</span>
                   </div>
                   <div className="text-[10px] text-gray-500 font-black uppercase mt-2">Cement Required (approx {fmt(result.cementKg)} kg)</div>
                 </div>

                 <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                       <div className="text-2xl font-black text-white">{fmt(result.sandVol)} m³</div>
                       <div className="text-[9px] text-orange-400 font-bold uppercase mt-1 tracking-widest">Sand ({fmt(result.sandCft)} cft)</div>
                    </div>
                    <div>
                       <div className="text-2xl font-black text-white">{fmt(result.aggregateVol)} m³</div>
                       <div className="text-[9px] text-emerald-400 font-bold uppercase mt-1 tracking-widest">Aggregate ({fmt(result.aggregateCft)} cft)</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
             {[
               { l: 'Wet Volume', v: `${fmt(volume)} ${unit === 'm' ? 'm³' : 'ft³'}` },
               { l: 'Dry Volume', v: `${fmt(result.dryVolume)} ${unit === 'm' ? 'm³' : 'ft³'}` },
               { l: 'Ratio Sum', v: grade.ratio.reduce((a, b) => a + b, 0).toString() },
             ].map(i => (
               <div key={i.l} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">{i.l}</span>
                  <span className="text-slate-900">{i.v}</span>
               </div>
             ))}
          </div>
        </div>
      }

      faqSection={
        <CalcFAQ faqs={[
          {
            question: 'What is Dry Volume Factor in concrete?',
            answer: 'When water is added to dry cement, sand, and aggregate, the air voids are filled and the volume decreases. To get 1m³ of wet concrete, you need approx 1.54m³ of dry ingredients. This 1.54 is the dry volume factor.'
          },
          {
            question: 'What is M20 concrete mix ratio?',
            answer: 'M20 is a nominal mix where "M" stands for Mix and "20" represents the characteristic compressive strength after 28 days in N/mm². The standard ratio is 1 : 1.5 : 3 (Cement : Sand : Aggregate).'
          }
        ]} />
      }
    />
  );
}
