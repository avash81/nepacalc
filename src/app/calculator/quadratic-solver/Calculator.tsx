'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { FunctionSquare, Binary, Sigma, Info, Activity } from 'lucide-react';

import { solveQuadratic } from '@/utils/math/safeCalculations';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';

const DEFAULT_STATE = {
  a: 1,
  b: -5,
  c: 6,
};

export default function QuadraticSolver() {
  const [state, setState] = useSyncState('quadratic_solver_v3', DEFAULT_STATE);
  const { a, b, c } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const result = useMemo(() => {
    return solveQuadratic(a, b, c);
  }, [a, b, c]);

  const applyPreset = (pa: number, pb: number, pc: number) => {
    updateState({ a: pa, b: pb, c: pc });
  };

  // Graphing logic
  const graphData = useMemo(() => {
    const points: string[] = [];
    const h = -b / (2 * a);
    const k = (a * h * h) + (b * h) + c;
    const range = 10;
    const step = 0.5;
    
    for (let xNum = h - range; xNum <= h + range; xNum += step) {
      const yNum = (a * xNum * xNum) + (b * xNum) + c;
      // Map to 100x100 SVG space
      const sx = 50 + (xNum - h) * (100 / (range * 2));
      const sy = 50 - (yNum - k) * (100 / (range * 2));
      points.push(`${sx},${sy}`);
    }
    return points.join(' ');
  }, [a, b, c]);

  return (
    <CalculatorErrorBoundary calculatorName="Quadratic Solver">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-purple-100 mb-2">
             <Activity className="w-3 h-3 animate-pulse" />
             Interactive Graphing
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight">
            Quadratic <span className="text-purple-600">Solver</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-500 font-medium leading-relaxed">
             Solve <span className="font-mono italic font-bold text-gray-900">ax² + bx + c = 0</span> with step-by-step discriminant analysis and visual curve plotting.
          </p>
        </div>

        {/* Eq Display */}
        <div className="flex justify-center">
            <div className="inline-block px-10 py-5 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 shadow-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl font-black text-purple-600 font-mono tracking-tighter italic relative z-10">
                {a}x² {b >= 0 ? '+' : '−'} {Math.abs(b)}x {c >= 0 ? '+' : '−'} {Math.abs(c)} = 0
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ValidatedInput label="Coeff. a" value={a} onChange={(v) => updateState({ a: v })} required hint="x² multiplier" />
                <ValidatedInput label="Coeff. b" value={b} onChange={(v) => updateState({ b: v })} required hint="x multiplier" />
                <ValidatedInput label="Coeff. c" value={c} onChange={(v) => updateState({ c: v })} required hint="constant" />
              </div>
            </div>

            {/* Visual Graph Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg shadow-gray-200/10">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sigma className="w-5 h-5 text-purple-600" />
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Parabola Visualization</h3>
                  </div>
                  <div className="text-[10px] font-bold text-purple-500 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-100">Relative Curve</div>
               </div>
               
               <div className="aspect-[16/9] bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative group">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-10 overflow-visible">
                    {/* Grid */}
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="0.2" strokeDasharray="1,1" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="0.2" strokeDasharray="1,1" />
                    
                    {/* Vertex point */}
                    <circle cx="50" cy="50" r="1.5" fill="#a855f7" className="animate-bounce" />
                    
                    {/* Parabola Path */}
                    <polyline
                      points={graphData}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute bottom-4 left-6 flex gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /> Vertex</span>
                    <span>∪ Trend</span>
                  </div>
               </div>
            </div>

            {result.success && result.data && (
              <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white space-y-6">
                 <div className="flex items-center gap-2">
                    <Binary className="w-5 h-5 text-purple-400" />
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mathematical Steps</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Step 1: Discriminant</p>
                        <p className="text-lg font-black font-mono">Δ = {result.data.discriminant}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Step 2: Nature</p>
                        <p className="text-sm font-bold truncate">
                            {result.data.discriminant > 0 ? 'Distinct Real' : result.data.discriminant === 0 ? 'Repeated Real' : 'Complex Pair'}
                        </p>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            {result.success && result.data ? (
              <>
                <ResultCard
                  label="Root x₁"
                  value={result.data.roots[0].display}
                  color="purple"
                  title="Primary Point"
                  copyValue={`x1 = ${result.data.roots[0].display}`}
                />

                {result.data.roots.length > 1 && (
                  <ResultCard
                    label="Root x₂"
                    value={result.data.roots[1].display}
                    color="purple"
                    title="Secondary Point"
                    copyValue={`x2 = ${result.data.roots[1].display}`}
                  />
                )}

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 space-y-4 shadow-sm">
                   {[
                     { l: 'Parabola', v: a > 0 ? 'Concave Up (∪)' : 'Concave Down (∩)' },
                     { l: 'Vertex', v: `(${(-b / (2 * a)).toFixed(2)}, ${(result.data.discriminant / (-4 * a)).toFixed(2)})` },
                     { l: 'Y-Intercept', v: `(0, ${c})` },
                   ].map(item => (
                     <div key={item.l} className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-gray-400 uppercase tracking-widest">{item.l}</span>
                        <span className="font-black text-gray-900 uppercase tracking-widest">{item.v}</span>
                     </div>
                   ))}
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-[2rem] space-y-4">
                   <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Algebraic Presets</h4>
                   <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => applyPreset(1, -5, 6)} className="text-[10px] p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all font-bold">x²−5x+6</button>
                      <button onClick={() => applyPreset(1, 2, 5)} className="text-[10px] p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all font-bold">x²+2x+5</button>
                   </div>
                </div>
              </>
            ) : (
              <div className="p-8 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] text-rose-600 text-center space-y-2">
                <p className="font-black uppercase tracking-widest text-xs tracking-tighter">Coefficient Error</p>
                <p className="text-sm font-bold">{result.error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8">
           <CalcFAQ
              faqs={[
                { question: 'What is the "Vertex"?', answer: 'The vertex is the peak or lowest point of the parabola, given by x = -b/2a.' },
              ]}
           />
        </div>
      </div>
    </CalculatorErrorBoundary>
  );
}
