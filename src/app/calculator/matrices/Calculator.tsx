'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Grid3X3, AlertCircle, ShieldCheck, Sigma, Layers, Info } from 'lucide-react';

export default function MatrixCalc() {
  const [size, setSize] = useState<2 | 3>(2);
  const [matrix, setMatrix] = useState<number[][]>([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

  const results = useMemo(() => {
    const m = matrix;
    if (size === 2) {
      const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      const trace = m[0][0] + m[1][1];
      const inverse = det === 0 ? null : [
        [m[1][1] / det, -m[0][1] / det],
        [-m[1][0] / det, m[0][0] / det],
      ];
      return { det, trace, inverse };
    }
    const det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    const trace = m[0][0] + m[1][1] + m[2][2];

    let inverse: number[][] | null = null;
    if (det !== 0) {
      const c = [
        [
          (m[1][1] * m[2][2] - m[1][2] * m[2][1]),
          -(m[1][0] * m[2][2] - m[1][2] * m[2][0]),
          (m[1][0] * m[2][1] - m[1][1] * m[2][0])
        ],
        [
          -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
          (m[0][0] * m[2][2] - m[0][2] * m[2][0]),
          -(m[0][0] * m[2][1] - m[0][1] * m[2][0])
        ],
        [
          (m[0][1] * m[1][2] - m[0][2] * m[1][1]),
          -(m[0][0] * m[1][2] - m[0][2] * m[1][0]),
          (m[0][0] * m[1][1] - m[0][1] * m[1][0])
        ]
      ];
      inverse = [
        [c[0][0] / det, c[1][0] / det, c[2][0] / det],
        [c[0][1] / det, c[1][1] / det, c[2][1] / det],
        [c[0][2] / det, c[1][2] / det, c[2][2] / det]
      ];
    }
    return { det, trace, inverse };
  }, [matrix, size]);

  const upd = (r: number, c: number, v: number) => {
    const n = matrix.map(row => [...row]);
    n[r][c] = v;
    setMatrix(n);
  };

  const inputC = "w-full h-16 text-center border border-[#DADCE0] rounded-2xl bg-white font-mono text-2xl font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all shadow-inner text-[#202124]";

  return (
    <ModernCalcLayout
      slug="matrices"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Matrix Calculator' }]}
      title="Institutional Matrix"
      description="Professional resource for matrix algebra. Compute determinants, traces, and inverses for 2x2 and 3x3 systems."
      icon={Grid3X3}
      inputs={
        <div className="space-y-8">
          <div className="flex p-1.5 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl shadow-inner">
            {([2, 3] as const).map(s => (
              <button key={s} onClick={() => setSize(s)}
                className={`flex-1 py-4 text-[10px] font-black uppercase rounded-xl transition-all tracking-widest ${size === s ? 'bg-white text-[#1A73E8] shadow-md border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                {s}×{s} Array
              </button>
            ))}
          </div>

          <div className="p-6 bg-white border border-[#DADCE0] rounded-lg shadow-sm relative group">
            <div className="text-[10px] font-black uppercase text-[#70757A] mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                Matrix Buffer (A)
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${size}, minmax(60px, 1fr))` }}>
              {Array.from({ length: size }).map((_, r) =>
                Array.from({ length: size }).map((_, c) => (
                  <input key={`${r}-${c}`} type="number" value={matrix[r][c]}
                    onChange={e => upd(r, c, Number(e.target.value))}
                    className={inputC} />
                ))
              )}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-10 text-center shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#70757A] mb-4">Matrix Determinant (|A|)</div>
            <div className="text-6xl font-black text-[#1A73E8] tracking-tighter font-mono">
                {results.det.toFixed(2).replace(/\.?0+$/, '')}
            </div>
            {results.det === 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FCE8E6] text-[#D93025] rounded-full text-[10px] font-black uppercase">
                 <AlertCircle className="w-3.5 h-3.5" /> Singular Matrix
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl shadow-sm">
               <div className="text-[10px] font-black uppercase text-[#70757A] mb-1">Matrix Trace</div>
               <div className="text-3xl font-black text-[#188038] font-mono">{results.trace}</div>
            </div>
            <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl shadow-sm">
               <div className="text-[10px] font-black uppercase text-[#70757A] mb-1">Size</div>
               <div className="text-3xl font-black text-[#1A73E8] font-mono">{size}×{size}</div>
            </div>
          </div>

          {results.inverse ? (
            <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
              <div className="px-8 py-4 bg-white border border-[#dadce0] border-b border-slate-800">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1a0dab]">Analytic Inverse (A⁻¹)</h3>
              </div>
              <div className="p-8 grid gap-3" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {results.inverse.map((row, r) => row.map((v, i) => (
                  <div key={`${r}-${i}`} className="p-4 bg-white border border-[#dadce0] rounded-xl border border-[#dadce0] text-center">
                    <div className="font-mono font-black text-sm text-[#202124]">
                      {Math.abs(v) < 1e-10 ? '0' : Number.isInteger(v) ? v : v.toFixed(3)}
                    </div>
                  </div>
                )))}
              </div>
            </div>
          ) : (
            <div className="p-10 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] text-center">
               <p className="text-[10px] font-black text-[#70757A] uppercase">Non-Invertible</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Institutional Matrix Resolution</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                Professional engine for matrix algebra calibrated for NEB and Engineering standards.
             </p>
          </div>
        </div>
      }
      relatedTools={[
        { label: "Linear Solver", href: "/calculator/linear-solver/" },
        { label: "Scientific Calc", href: "/calculator/scientific-calculator/" },
        { label: "Quadratic Solver", href: "/calculator/quadratic-solver/" }
      ]}
    />
  );
}

