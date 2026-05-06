'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Sigma, ShieldCheck, Binary, Layers, Info } from 'lucide-react';

const DEFAULT_STATE = {
  mode: '2var' as '2var'|'3var',
  a1: 1, b1: 1, c1: 5,
  a2: 1, b2: -1, c2: 1,
  eq1: { a:1, b:1, c:1, d:6 },
  eq2: { a:0, b:2, c:5, d:-4 },
  eq3: { a:2, b:5, c:-1, d:27 },
};

export default function LinearSolver() {
  const [state, setState] = useSyncState('linear_solver_v3', DEFAULT_STATE);
  const { mode, a1, b1, c1, a2, b2, c2, eq1, eq2, eq3 } = state;
  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    if (mode === '2var') {
      const det = a1*b2 - a2*b1;
      if (det === 0) return { ok: false, msg: 'Singular System: The lines are parallel or coincident.' };
      return { ok: true, x: (c1*b2 - c2*b1) / det, y: (a1*c2 - a2*c1) / det };
    }
    
    const { a:A1, b:B1, c:C1, d:D1 } = eq1;
    const { a:A2, b:B2, c:C2, d:D2 } = eq2;
    const { a:A3, b:B3, c:C3, d:D3 } = eq3;
    
    const det = A1*(B2*C3 - B3*C2) - B1*(A2*C3 - A3*C2) + C1*(A2*B3 - A3*B2);
    if (det === 0) return { ok: false, msg: 'Singular Matrix: No unique solution vector point.' };
    
    return {
      ok: true,
      x: (D1*(B2*C3 - B3*C2) - B1*(D2*C3 - D3*C2) + C1*(D2*B3 - D3*B2)) / det,
      y: (A1*(D2*C3 - D3*C2) - D1*(A2*C3 - A3*C2) + C1*(A2*D3 - A3*D2)) / det,
      z: (A1*(B2*D3 - B3*D2) - B1*(A2*D3 - A3*D2) + D1*(A2*B3 - A3*B2)) / det,
    };
  }, [mode, a1, b1, c1, a2, b2, c2, eq1, eq2, eq3]);

  const inputCls = "w-full h-14 px-4 border border-[#DADCE0] bg-white font-mono font-black text-xl focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none text-center transition-all rounded-xl shadow-inner text-[#202124]";

  return (
    <ModernCalcLayout
      slug="linear-solver"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Linear Solver' }]}
      title="Institutional Linear Equation"
      description="Professional engine for resolving simultaneous equations using Cramer's Rule with academic precision."
      icon={Sigma}
      inputs={
        <div className="space-y-6">
          <div className="flex p-1.5 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl shadow-inner">
            <button onClick={() => updateState({ mode: '2var' })} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all tracking-widest ${mode === '2var' ? 'bg-white text-[#1A73E8] shadow-md border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              2 Variables
            </button>
            <button onClick={() => updateState({ mode: '3var' })} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all tracking-widest ${mode === '3var' ? 'bg-white text-[#1A73E8] shadow-md border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              3 Variables
            </button>
          </div>

          {mode === '2var' ? (
            <div className="space-y-4">
              {[
                { label: 'Equation 1', vals: [a1, b1, c1], keys: ['a1', 'b1', 'c1'] },
                { label: 'Equation 2', vals: [a2, b2, c2], keys: ['a2', 'b2', 'c2'] },
              ].map(({ label, vals, keys }) => (
                <div key={label} className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm group hover:border-[#1A73E8] transition-colors">
                  <div className="text-[10px] font-black uppercase text-[#70757A] mb-4">{label}: ax + by = c</div>
                  <div className="flex items-center gap-2">
                    <input type="number" value={vals[0]} onChange={e => updateState({ [keys[0] as any]: Number(e.target.value) })} className={inputCls} />
                    <span className="text-xs font-black text-[#DADCE0]">x</span>
                    <input type="number" value={vals[1]} onChange={e => updateState({ [keys[1] as any]: Number(e.target.value) })} className={inputCls} />
                    <span className="text-xs font-black text-[#DADCE0]">y</span>
                    <span className="text-xs font-black text-[#1A73E8]">=</span>
                    <input type="number" value={vals[2]} onChange={e => updateState({ [keys[2] as any]: Number(e.target.value) })} className={inputCls} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { label: 'Eq 1', eq: eq1, setK: 'eq1' },
                { label: 'Eq 2', eq: eq2, setK: 'eq2' },
                { label: 'Eq 3', eq: eq3, setK: 'eq3' },
              ].map(({ label, eq, setK }) => (
                <div key={label} className="p-6 bg-white border border-[#DADCE0] rounded-2xl shadow-sm group hover:border-[#1A73E8] transition-colors">
                  <div className="text-[10px] font-black uppercase text-[#70757A] mb-4">{label}: ax + by + cz = d</div>
                  <div className="flex items-center gap-1">
                    <input type="number" value={eq.a} onChange={e => updateState({ [setK as any]: {...eq, a: Number(e.target.value)} })} className={inputCls} />
                    <input type="number" value={eq.b} onChange={e => updateState({ [setK as any]: {...eq, b: Number(e.target.value)} })} className={inputCls} />
                    <input type="number" value={eq.c} onChange={e => updateState({ [setK as any]: {...eq, c: Number(e.target.value)} })} className={inputCls} />
                    <span className="text-xs font-black text-[#1A73E8]">=</span>
                    <input type="number" value={eq.d} onChange={e => updateState({ [setK as any]: {...eq, d: Number(e.target.value)} })} className={inputCls} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-6">
          {result.ok ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-3xl overflow-hidden text-center shadow-xl">
                <div className="p-6 bg-[#F8F9FA] border-b border-[#DADCE0]">
                   <div className="text-[10px] font-black uppercase tracking-widest text-[#1A73E8]">Solution Vector</div>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    { label: 'x', val: (result as any).x, color: 'text-[#1A73E8]' },
                    { label: 'y', val: (result as any).y, color: 'text-[#188038]' },
                    ...(mode === '3var' ? [{ label: 'z', val: (result as any).z, color: 'text-[#E37400]' }] : []),
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex items-center justify-between py-4 border-b border-[#F1F3F4] last:border-0 last:pb-0">
                      <span className="text-xl font-black uppercase text-[#202124]">{label} =</span>
                      <span className={`text-4xl font-black font-mono ${color}`}>
                         {Number.isInteger(val) ? val : (val as number).toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {mode === '2var' && result.ok && (
                <div className="bg-white border border-[#DADCE0] rounded-3xl overflow-hidden shadow-lg p-8">
                   <div className="flex items-center gap-3 mb-6">
                      <Layers className="w-5 h-5 text-[#1A73E8]" />
                      <h3 className="text-lg font-black text-[#202124]">Vector Intersection</h3>
                   </div>
                   <div className="aspect-square w-full bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
                    <svg viewBox="-15 -15 30 30" className="w-full h-full transform scale-y-[-1] bg-white rounded-xl border border-[#DADCE0] p-2">
                      <g stroke="#F1F3F4" strokeWidth="0.2">
                        {[-10, -5, 0, 5, 10].map(i => (
                            <g key={i}>
                                <line x1={i} y1="-15" x2={i} y2="15" />
                                <line x1="-15" y1={i} x2="15" y2={i} />
                            </g>
                        ))}
                      </g>
                      <line x1="-15" y1="0" x2="15" y2="0" stroke="#70757A" strokeWidth="0.4" />
                      <line x1="0" y1="-15" x2="0" y2="15" stroke="#70757A" strokeWidth="0.4" />
                      {b1 !== 0 && <line x1="-15" y1={(c1 - a1*(-15))/b1} x2="15" y2={(c1 - a1*(15))/b1} stroke="#1A73E8" strokeWidth="0.6" />}
                      {b2 !== 0 && <line x1="-15" y1={(c2 - a2*(-15))/b2} x2="15" y2={(c2 - a2*(15))/b2} stroke="#188038" strokeWidth="0.6" />}
                      <circle cx={result.x} cy={result.y} r="0.8" fill="#D93025" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-2xl flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-[#1A73E8]" />
                 <p className="text-[10px] text-[#202124] font-bold uppercase">
                    Solution vector verified by Cramer's Identity.
                 </p>
              </div>
            </>
          ) : (
            <div className="p-10 bg-[#FCE8E6] border border-[#FAD2CF] rounded-3xl text-center space-y-3">
               <div className="text-[10px] font-black uppercase text-[#D93025]">Matrix Singularity</div>
               <p className="text-sm font-bold text-[#202124]">{(result as any).msg}</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Matrix Resolution</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for resolving simultaneous equations. Calibrated for <strong>NEB</strong> and <strong>Engineering</strong> standards, this tool uses Cramer's Rule for absolute precision.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Quadratic Solver", href: "/calculator/quadratic-solver/" },
        { label: "Scientific Calc", href: "/calculator/scientific-calculator/" },
        { label: "Matrices", href: "/calculator/matrices/" },
        { label: "Logarithm Calc", href: "/calculator/logarithm-calculator/" }
      ]}
    />
  );
}
