'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Sigma, Target, Microscope, ShieldCheck, Activity } from 'lucide-react';

export default function ZScoreCalc() {
  const [x, setX]         = useState(85);
  const [mu, setMu]       = useState(70);
  const [sigma, setSigma] = useState(10);

  const z = useMemo(() => sigma === 0 ? 0 : (x - mu) / sigma, [x, mu, sigma]);

  const interpretation =
    Math.abs(z) < 1  ? 'Within ±1σ (Typical Center)' :
    Math.abs(z) < 2  ? 'Within ±2σ (95% Interval)' :
    Math.abs(z) < 3  ? 'Within ±3σ (99.7% Extreme)' :
    'Statistical Outlier (>±3σ)';

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-xl bg-white font-mono font-bold text-xl focus:border-[#1A73E8] outline-none transition-all shadow-sm";
  const labelCls = "text-[11px] font-black uppercase text-[#70757A] tracking-wider mb-2 block";

  return (
    <ModernCalcLayout 
      slug="z-score"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Z-Score Calculator' }]}
      title="Institutional Z-Score"
      description="Standardize your data with Gaussian normalization logic."
      icon={Sigma}
      inputs={
        <div className="space-y-6">
          <div className="space-y-6 p-6 bg-white border border-[#DADCE0] rounded-3xl shadow-sm">
            <div className="space-y-2">
              <label className={labelCls}>Observation (x)</label>
              <input type="number" value={x} onChange={e => setX(Number(e.target.value))} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelCls}>Mean (μ)</label>
                <input type="number" value={mu} onChange={e => setMu(Number(e.target.value))} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Std Dev (σ)</label>
                <input type="number" value={sigma} onChange={e => setSigma(Number(e.target.value))} min={0.001} className={inputCls} />
              </div>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-[#DADCE0] rounded-3xl text-center shadow-xl">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#1A73E8] mb-4">Computed Z-Score</div>
            <div className="text-7xl font-black text-[#202124] font-mono mb-4">{z.toFixed(4)}</div>
            <div className="inline-block px-6 py-2 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-xs font-black">
              {z > 0 ? `${z.toFixed(2)}σ Above Mean` : `${Math.abs(z).toFixed(2)}σ Below Mean`}
            </div>
          </div>

          <div className="p-6 bg-white border border-[#DADCE0] rounded-2xl border-l-8 border-l-[#1A73E8]">
            <div className="text-[9px] font-black uppercase text-slate-500 mb-1">Interpretation</div>
            <p className="text-lg font-black text-slate-900">{interpretation}</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Normalization</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Standardized for Gaussian modeling and academic research.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Standard Deviation", href: "/calculator/standard-deviation" },
        { label: "Statistics Plus", href: "/calculator/statistics-plus" },
        { label: "GPA Calculator", href: "/calculator/gpa" }
      ]}
    />
  );
}
