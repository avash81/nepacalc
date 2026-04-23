'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Sigma, Lightbulb } from 'lucide-react';

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
      if (det === 0) return { ok: false, msg: 'No unique solution. The lines are either parallel (no intersection) or exactly the same line (infinite solutions).' };
      return { ok: true, x: (c1*b2 - c2*b1) / det, y: (a1*c2 - a2*c1) / det };
    }
    
    const { a:A1, b:B1, c:C1, d:D1 } = eq1;
    const { a:A2, b:B2, c:C2, d:D2 } = eq2;
    const { a:A3, b:B3, c:C3, d:D3 } = eq3;
    
    const det = A1*(B2*C3 - B3*C2) - B1*(A2*C3 - A3*C2) + C1*(A2*B3 - A3*B2);
    if (det === 0) return { ok: false, msg: 'Singular system. The planes do not intersect at a single unique point (no solution or infinite solutions).' };
    
    return {
      ok: true,
      x: (D1*(B2*C3 - B3*C2) - B1*(D2*C3 - D3*C2) + C1*(D2*B3 - D3*B2)) / det,
      y: (A1*(D2*C3 - D3*C2) - D1*(A2*C3 - A3*C2) + C1*(A2*D3 - A3*D2)) / det,
      z: (A1*(B2*D3 - B3*D2) - B1*(A2*D3 - A3*D2) + D1*(A2*B3 - A3*B2)) / det,
    };
  }, [mode, a1, b1, c1, a2, b2, c2, eq1, eq2, eq3]);

  const inputCls = "w-full h-12 px-3 border border-[#DADCE0] bg-white font-mono font-bold text-sm focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none text-center transition-all rounded";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Linear Equations Solver' }]}
      title="Linear Equation Solver"
      description="Solve systems of 2 or 3 simultaneous linear equations using Cramer's Rule. Instantly find exact x, y, and z intersection vectors."
      icon={Sigma}
      inputs={
        <div className="space-y-6">
          <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <button onClick={() => updateState({ mode: '2var' })} className={`flex-1 py-3 text-xs font-bold uppercase rounded transition-all ${mode === '2var' ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              2 Variables (X, Y)
            </button>
            <button onClick={() => updateState({ mode: '3var' })} className={`flex-1 py-3 text-xs font-bold uppercase rounded transition-all ${mode === '3var' ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              3 Variables (X, Y, Z)
            </button>
          </div>

          {mode === '2var' ? (
            <div className="space-y-4">
              {[
                { label: 'Equation 1', vals: [a1, b1, c1], keys: ['a1', 'b1', 'c1'] },
                { label: 'Equation 2', vals: [a2, b2, c2], keys: ['a2', 'b2', 'c2'] },
              ].map(({ label, vals, keys }) => (
                <div key={label} className="p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
                  <div className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider mb-3">{label}: ax + by = c</div>
                  <div className="flex items-center gap-3">
                    <input type="number" value={vals[0]} onChange={e => updateState({ [keys[0] as any]: Number(e.target.value) })} className={inputCls} />
                    <span className="text-sm font-black text-[#202124]">x +</span>
                    <input type="number" value={vals[1]} onChange={e => updateState({ [keys[1] as any]: Number(e.target.value) })} className={inputCls} />
                    <span className="text-sm font-black text-[#202124]">y =</span>
                    <input type="number" value={vals[2]} onChange={e => updateState({ [keys[2] as any]: Number(e.target.value) })} className={inputCls} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { label: 'Equation 1', eq: eq1, setK: 'eq1' },
                { label: 'Equation 2', eq: eq2, setK: 'eq2' },
                { label: 'Equation 3', eq: eq3, setK: 'eq3' },
              ].map(({ label, eq, setK }) => (
                <div key={label} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
                  <div className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider mb-2">{label}: ax + by + cz = d</div>
                  <div className="flex items-center gap-2">
                    <input type="number" value={eq.a} onChange={e => updateState({ [setK as any]: {...eq, a: Number(e.target.value)} })} className={inputCls} />
                    <span className="text-xs font-black text-[#202124]">x</span>
                    <input type="number" value={eq.b} onChange={e => updateState({ [setK as any]: {...eq, b: Number(e.target.value)} })} className={inputCls} />
                    <span className="text-xs font-black text-[#202124]">y</span>
                    <input type="number" value={eq.c} onChange={e => updateState({ [setK as any]: {...eq, c: Number(e.target.value)} })} className={inputCls} />
                    <span className="text-xs font-black text-[#202124]">z =</span>
                    <input type="number" value={eq.d} onChange={e => updateState({ [setK as any]: {...eq, d: Number(e.target.value)} })} className={inputCls} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg">
            <div className="text-[10px] font-bold uppercase text-[#1A73E8] tracking-wider mb-1">Algorithmic Method Used</div>
            <code className="text-xs font-mono font-bold text-[#202124]">Cramer&apos;s Rule (Determinant Matrices)</code>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {result.ok ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden text-center shadow-sm">
                <div className="p-6 bg-[#F8F9FA] border-b border-[#DADCE0]">
                   <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Solution Vector</div>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: 'x', val: (result as any).x, color: 'text-[#1A73E8]' },
                    { label: 'y', val: (result as any).y, color: 'text-[#188038]' },
                    ...(mode === '3var' ? [{ label: 'z', val: (result as any).z, color: 'text-[#E37400]' }] : []),
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex items-center justify-between pb-3 border-b border-[#DADCE0] last:border-0 last:pb-0">
                      <span className="text-sm font-black uppercase text-[#70757A]">{label} =</span>
                      <span className={`text-4xl font-black font-mono tracking-tighter break-all ${color}`}>
                         {Number.isInteger(val) ? val : (val as number).toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {mode === '2var' && result.ok && (
                <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
                  <div className="p-4 bg-[#F8F9FA] border-b border-[#DADCE0] text-center">
                     <div className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Visual Intersection Map</div>
                  </div>
                  <div className="aspect-[4/3] w-full bg-[#E8F0FE] relative overflow-hidden flex items-center justify-center p-4">
                    <svg viewBox="-15 -15 30 30" className="w-full h-full transform scale-y-[-1] drop-shadow-sm bg-white rounded border border-[#C5D9F7]">
                      {/* Grid */}
                      <g stroke="#F8F9FA" strokeWidth="0.5">
                        {[-10, -5, 5, 10].map(i => <line key={`x${i}`} x1={i} y1="-15" x2={i} y2="15" />)}
                        {[-10, -5, 5, 10].map(i => <line key={`y${i}`} x1="-15" y1={i} x2="15" y2={i} />)}
                      </g>
                      {/* Axes */}
                      <line x1="-15" y1="0" x2="15" y2="0" stroke="#DADCE0" strokeWidth="0.8" />
                      <line x1="0" y1="-15" x2="0" y2="15" stroke="#DADCE0" strokeWidth="0.8" />
                      
                      {/* Equation 1 Line */}
                      {b1 !== 0 && (
                        <line x1="-15" y1={(c1 - a1*(-15))/b1} x2="15" y2={(c1 - a1*(15))/b1} stroke="#1A73E8" strokeWidth="0.5" />
                      )}
                      {/* Equation 2 Line */}
                      {b2 !== 0 && (
                        <line x1="-15" y1={(c2 - a2*(-15))/b2} x2="15" y2={(c2 - a2*(15))/b2} stroke="#188038" strokeWidth="0.5" />
                      )}
                      
                      {/* Intersection Node */}
                      <circle cx={result.x} cy={result.y} r="0.8" fill="#D93025" />
                      <circle cx={result.x} cy={result.y} r="1.5" fill="#D93025" opacity="0.2" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex gap-3 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg items-start">
                 <Lightbulb className="w-5 h-5 text-[#E37400] shrink-0 mt-0.5" />
                 <p className="text-[10px] text-[#202124] leading-relaxed">
                   The solution vector represents the exact mathematical point of intersection where all lines (or planes) meet in space.
                 </p>
              </div>
            </>
          ) : (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-[#D93025]">
               <h4 className="text-[11px] font-bold uppercase tracking-wider mb-2">Singular Matrix Error</h4>
               <p className="text-xs font-medium">{(result as any).msg}</p>
            </div>
          )}
        </div>
      }
      howToUse={{ steps: ["Select the system size (2 variables or 3 variables).", "Input the coefficients (a, b, c) and the constant (d) for each linear equation.", "The system will instantly evaluate the determinant matrix.", "If a unique solution exists, the exact X, Y (and Z) coordinates will be displayed."] }}
      formula={{ title: "Cramer's Rule", description: "Determinant matrix methodology.", raw: "For 2 variables (ax + by = c):\nΔ = (a1 × b2) - (a2 × b1)\nΔx = (c1 × b2) - (c2 × b1)\nΔy = (a1 × c2) - (a2 × c1)\n\nx = Δx / Δ\ny = Δy / Δ\n\nIf Δ = 0, the system is singular (no unique solution)." }}
      faqs={[
        { question: "What does 'Singular Matrix' mean?", answer: "A singular matrix means the equations are not independent. Geometrically, this means the lines are either perfectly parallel (never touch) or are the exact same line (infinite points of contact)." },
        { question: "How accurate are the fractional results?", answer: "Calculations are performed using double-precision floating-point format. For visual clarity, outputs are rounded to 4 decimal places if they are not whole numbers." }
      ]}
      sidebar={{ title: "Algebra Utilities", links: [{ label: "Quadratic Formula", href: "/calculator/quadratic-formula" }, { label: "Logarithm Calculator", href: "/calculator/logarithm-calculator" }], banner: { title: "Geometry In Algebra", description: "Solving linear equations is the same as finding where lines cross on a graph.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Quadratic Formula", href: "/calculator/quadratic-formula" }]}
    />
  );
}
