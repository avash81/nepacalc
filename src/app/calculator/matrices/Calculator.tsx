'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Grid3X3, Lightbulb, AlertCircle } from 'lucide-react';

export default function MatrixCalc() {
  const [size, setSize] = useState<2|3>(2);
  const [matrix, setMatrix] = useState<number[][]>([[1,0,0],[0,1,0],[0,0,1]]);

  const results = useMemo(() => {
    const m = matrix;
    if (size === 2) {
      const det = m[0][0]*m[1][1] - m[0][1]*m[1][0];
      const trace = m[0][0] + m[1][1];
      const inverse = det === 0 ? null : [
        [m[1][1]/det, -m[0][1]/det],
        [-m[1][0]/det, m[0][0]/det],
      ];
      return { det, trace, inverse };
    }
    const det = m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1]) - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0]) + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
    const trace = m[0][0]+m[1][1]+m[2][2];
    
    let inverse: number[][] | null = null;
    if (det !== 0) {
      const c = [
        [
          (m[1][1]*m[2][2] - m[1][2]*m[2][1]),
          -(m[1][0]*m[2][2] - m[1][2]*m[2][0]),
          (m[1][0]*m[2][1] - m[1][1]*m[2][0])
        ],
        [
          -(m[0][1]*m[2][2] - m[0][2]*m[2][1]),
          (m[0][0]*m[2][2] - m[0][2]*m[2][0]),
          -(m[0][0]*m[2][1] - m[0][1]*m[2][0])
        ],
        [
          (m[0][1]*m[1][2] - m[0][2]*m[1][1]),
          -(m[0][0]*m[1][2] - m[0][2]*m[1][0]),
          (m[0][0]*m[1][1] - m[0][1]*m[1][0])
        ]
      ];
      inverse = [
        [c[0][0]/det, c[1][0]/det, c[2][0]/det],
        [c[0][1]/det, c[1][1]/det, c[2][1]/det],
        [c[0][2]/det, c[1][2]/det, c[2][2]/det]
      ];
    }
    return { det, trace, inverse };
  }, [matrix, size]);

  const upd = (r: number, c: number, v: number) => {
    const n = matrix.map(row => [...row]);
    n[r][c] = v;
    setMatrix(n);
  };

  const inputC = "w-full h-14 text-center border border-[#DADCE0] rounded-md bg-white font-mono text-lg font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all shadow-inner";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Matrix Calculator' }]}
      title="Matrix Calculator"
      description="Compute determinant, trace, and inverse of 2×2 and 3×3 matrices. Essential tool for linear algebra, physics, and engineering students."
      icon={Grid3X3}
      inputs={
        <div className="space-y-6">
          <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            {([2,3] as const).map(s => (
              <button key={s} onClick={() => setSize(s)}
                className={`flex-1 py-3 text-xs font-bold uppercase rounded transition-all ${size === s ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                {s}×{s} Matrix
              </button>
            ))}
          </div>

          <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <div className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider mb-4">Enter Matrix Values</div>
            <div className="overflow-x-auto pb-2">
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${size}, minmax(70px, 1fr))` }}>
                {Array.from({ length: size }).map((_, r) =>
                  Array.from({ length: size }).map((_, c) => (
                    <input key={`${r}-${c}`} type="number" inputMode="decimal" value={matrix[r][c]}
                      onChange={e => upd(r, c, Number(e.target.value))}
                      className={inputC} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Load Quick Preset</label>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setMatrix([[1,0,0],[0,1,0],[0,0,1]])}
                className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-[#5F6368] hover:text-[#1A73E8] text-xs font-bold transition-all text-center">
                Identity Matrix (I)
              </button>
              <button onClick={() => setMatrix([[2,1,0],[1,3,1],[0,1,2]])}
                className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-[#5F6368] hover:text-[#1A73E8] text-xs font-bold transition-all text-center">
                Random Example
              </button>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 text-center shadow-sm relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] mb-2 relative z-10">Determinant |A|</div>
            <div className="text-6xl font-black text-[#1A73E8] tracking-tighter font-mono relative z-10">{results.det.toFixed(2).replace(/\.?0+$/, '')}</div>
            {results.det === 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FCE8E6] text-[#D93025] rounded text-xs font-bold uppercase tracking-wider relative z-10">
                 <AlertCircle className="w-3.5 h-3.5" /> Singular Matrix (No Inverse)
              </div>
            )}
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex justify-between items-center">
               <span className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Trace tr(A)</span>
               <span className="text-lg font-black font-mono text-[#188038]">{results.trace}</span>
            </div>
          </div>

          {results.inverse ? (
            <div className="bg-[#1A1A2E] border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-[#1A73E8] border-b border-[#1A73E8]">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-white">Inverse Matrix A⁻¹</h3>
              </div>
              <div className="p-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {results.inverse.map((row, r) => row.map((v, c) => (
                  <div key={`${r}-${c}`} className="p-3 bg-white/10 rounded border border-white/20 text-center font-mono font-bold text-sm text-white overflow-hidden text-ellipsis shadow-inner">
                    {Number.isInteger(v) ? v : v.toFixed(3)}
                  </div>
                )))}
              </div>
            </div>
          ) : (
            <div className="p-6 border border-[#DADCE0] border-dashed rounded-lg bg-[#F8F9FA] text-center">
               <p className="text-sm font-bold text-[#70757A]">Inverse matrix cannot be calculated when determinant is zero.</p>
            </div>
          )}

          <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex items-start gap-3">
             <Lightbulb className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-1">Determinant Formula</h5>
                <code className="text-xs font-mono font-bold text-[#202124]">
                  {size===2 ? '|A| = ad − bc' : '|A| = a(ei−fh) − b(di−fg) + c(dh−eg)'}
                </code>
             </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your matrix size (2x2 or 3x3) using the top toggle.", "Enter the numerical values into the matrix grid.", "The calculator will instantly compute the Determinant, Trace, and the Inverse matrix if it exists.", "Use the quick presets to quickly load an Identity matrix to test concepts."] }}
      formula={{ title: "Matrix Concepts", description: "Core linear algebra definitions.", raw: "Trace: The sum of the main diagonal elements (top-left to bottom-right).\n\nDeterminant: A scalar value that is a function of the entries of a square matrix.\n\nInverse: A matrix that, when multiplied by the original matrix, yields the identity matrix. It only exists if the determinant is non-zero." }}
      faqs={[
        { question: "What is a Singular Matrix?", answer: "A singular matrix is a square matrix that does not have an inverse. This occurs when its determinant is exactly zero." },
        { question: "Why is the trace important?", answer: "The trace is an invariant under changes of basis. In quantum mechanics and linear algebra, it equals the sum of the eigenvalues of the matrix." }
      ]}
      sidebar={{ title: "Algebra Tools", links: [{ label: "Linear Solver", href: "/calculator/linear-solver" }, { label: "Quadratic Formula", href: "/calculator/quadratic-formula" }], banner: { title: "Matrix Math", description: "Matrices are the mathematical foundation of 3D computer graphics.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Linear Solver", href: "/calculator/linear-solver" }]}
    />
  );
}
