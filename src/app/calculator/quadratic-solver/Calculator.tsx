'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { FunctionSquare, Binary, Activity, Target, ShieldCheck, Sigma } from 'lucide-react';
import { solveQuadratic } from '@/utils/math/safeCalculations';

const DEFAULT_STATE = { a: 1, b: -5, c: 6 };

export default function QuadraticSolver() {
  const [state, setState] = useSyncState('quadratic_solver_v4', DEFAULT_STATE);
  const { a, b, c } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...updates });

  const result = useMemo(() => solveQuadratic(a, b, c), [a, b, c]);

  const graphData = useMemo(() => {
    if (a === 0) return '';
    const points: string[] = [];
    const h = -b / (2 * a);
    const k = (a * h * h) + (b * h) + c;
    const range = 10;
    const step = 0.5;
    for (let xNum = h - range; xNum <= h + range; xNum += step) {
      const yNum = (a * xNum * xNum) + (b * xNum) + c;
      const sx = 50 + (xNum - h) * (100 / (range * 2));
      const sy = 50 - (yNum - k) * (100 / (range * 2));
      points.push(`${sx},${sy}`);
    }
    return points.join(' ');
  }, [a, b, c]);

  const inputCls = "w-full h-16 text-center border border-[#DADCE0] rounded-2xl bg-white font-mono text-3xl font-black focus:border-[#1A73E8] outline-none transition-all shadow-inner text-[#202124]";

  return (
    <ModernCalcLayout 
      slug="quadratic-solver"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Quadratic Solver' }]}
      title="Institutional Quadratic Equation"
      description="Calculate real and complex roots, analyze the discriminant, and visualize parabolic vertices."
      icon={FunctionSquare}
      inputs={
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
             <div className="px-8 py-4 bg-white rounded-lg border border-[#DADCE0] shadow-sm text-center">
                <span className="text-2xl font-black text-[#202124] font-mono">
                   {a}x² {b >= 0 ? '+' : '−'} {Math.abs(b)}x {c >= 0 ? '+' : '−'} {Math.abs(c)} = 0
                </span>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input type="number" value={a} onChange={e => updateState({ a: Number(e.target.value) })} className={inputCls} />
            <input type="number" value={b} onChange={e => updateState({ b: Number(e.target.value) })} className={inputCls} />
            <input type="number" value={c} onChange={e => updateState({ c: Number(e.target.value) })} className={inputCls} />
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {result.success && result.data ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
                 <div className="divide-y divide-[#F1F3F4]">
                    {result.data.roots.map((root, i) => (
                      <div key={i} className="p-8 text-center">
                         <div className="text-[10px] font-black text-[#70757A] mb-2 uppercase">Root x{i+1}</div>
                         <div className="text-5xl font-black text-[#202124] font-mono">{root.display}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl">
                    <div className="text-[10px] font-black uppercase text-[#70757A] mb-1">Discriminant (Δ)</div>
                    <div className="text-2xl font-black font-mono">{result.data.discriminant}</div>
                 </div>
                 <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl">
                    <div className="text-[10px] font-black uppercase text-[#70757A] mb-1">Nature</div>
                    <div className="text-sm font-black text-[#188038] uppercase">
                      {result.data.discriminant > 0 ? 'Distinct Real' : result.data.discriminant === 0 ? 'Repeated Real' : 'Complex Pair'}
                    </div>
                 </div>
              </div>
            </>
          ) : (
            <div className="p-10 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-center">
               <p className="text-sm font-bold text-[#D93025]">{result.error}</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Quadratic Solver</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Calibrated for university-level engineering and academic research.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Linear Solver", href: "/calculator/linear-solver/" },
        { label: "Scientific Calc", href: "/calculator/scientific-calculator/" },
        { label: "Matrices", href: "/calculator/matrices/" }
      ]}
    />
  );
}

