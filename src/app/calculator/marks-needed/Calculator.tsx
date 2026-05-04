'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { GraduationCap, Info } from 'lucide-react';

export default function MarksNeededCalculator() {
  const [current, setCurrent] = useState(60);
  const [target, setTarget] = useState(75);
  const [weight, setWeight] = useState(40);

  const r = useMemo(() => {
    const finalNeeded = (target - current * (1 - weight / 100)) / (weight / 100);
    return Math.max(0, finalNeeded);
  }, [current, target, weight]);

  const isImpossible = r > 100;
  
  const WEIGHT_PRESETS = [20, 30, 40, 50, 60];
  const TARGET_PRESETS = [50, 60, 65, 75, 80];

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="marks-needed"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Target Grade Calculator' }]}
      title="Final Grade Calculator"
      description="Calculate exactly what you need to score on your final exam to reach your target overall class grade."
      icon={GraduationCap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <div>
              <label className={labelCls}>Current Grade (%)</label>
              <div className="relative">
                 <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Target Overall Grade (%)</label>
              <div className="relative">
                 <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Final Exam Weight (%)</label>
              <div className="relative">
                 <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} min={0} max={100} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className={labelCls}>Target Grade Presets</label>
              <div className="flex flex-wrap gap-2">
                {TARGET_PRESETS.map(v => (
                  <button key={v} onClick={() => setTarget(v)}
                    className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${target === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Exam Weight Presets</label>
              <div className="flex flex-wrap gap-2">
                {WEIGHT_PRESETS.map(v => (
                  <button key={v} onClick={() => setWeight(v)}
                    className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${weight === v ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE] bg-[#F8F9FA] border-[#DADCE0]'}`}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`border rounded-lg text-center p-8 relative overflow-hidden shadow-sm ${isImpossible ? 'bg-[#FCE8E6] border-[#FAD2CF]' : 'bg-white border-[#DADCE0]'}`}>
            <GraduationCap className={`absolute top-0 right-0 p-4 w-32 h-32 opacity-5 pointer-events-none ${isImpossible ? 'text-[#D93025]' : 'text-[#1A73E8]'}`} />
            
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 relative z-10 ${isImpossible ? 'text-[#D93025]' : 'text-[#70757A]'}`}>
               Required Score on Final
            </div>
            
            <div className={`text-6xl font-black tracking-tighter mb-4 font-mono relative z-10 ${isImpossible ? 'text-[#D93025]' : r <= 70 ? 'text-[#188038]' : 'text-[#1A73E8]'}`}>
              {r.toFixed(1)}<span className="text-3xl ml-1">%</span>
            </div>
            
            <div className={`inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded relative z-10 ${isImpossible ? 'bg-[#D93025] text-white' : r <= 60 ? 'bg-[#E6F4EA] text-[#188038]' : r <= 80 ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#FEF7E0] text-[#E37400]'}`}>
              {isImpossible ? 'Mathematically Impossible' : r <= 60 ? 'Very Easy' : r <= 80 ? 'Achievable' : 'Challenging'}
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Academic Summary</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold tracking-wider">Current Grade Weight</span>
                   <span className="font-black text-[#202124]">{(100 - weight)}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold tracking-wider">Current Grade Value</span>
                   <span className="font-black text-[#202124]">{current}%</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs bg-[#E8F0FE]">
                   <span className="text-[#1A73E8] font-bold tracking-wider">Desired Final Grade</span>
                   <span className="font-black text-[#1A73E8]">{target}%</span>
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Grade Mapping</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Strategic exam planning for semester systems. Calibrated for <strong>TU</strong>, <strong>KU</strong>, and <strong>PU</strong> standards.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "SEE GPA Calculator", href: "/calculator/see-gpa" },
        { label: "Percentage Calc", href: "/calculator/percentage/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
      ]}
    />
  );
}
