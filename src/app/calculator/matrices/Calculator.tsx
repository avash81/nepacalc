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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Advanced Matrix Algebra & Linear Transformations</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In linear algebra, a matrix is a rectangular array of numbers arranged in rows and columns that represents a linear transformation in multi-dimensional space. Our <strong className="text-[#202124]">matrix calculator</strong> is an advanced computational tool designed to evaluate the foundational scalar properties and inverses of square matrices (2x2 and 3x3), which are heavily utilized in computer graphics, quantum mechanics, and cryptography.
              </p>
              <p>
                The calculator instantly computes the <strong className="text-[#202124]">Determinant (|A|)</strong>, a scaling factor representing how much a transformation expands or compresses space; the <strong className="text-[#202124]">Trace (tr A)</strong>, the sum of the main diagonal elements; and the <strong className="text-[#202124]">Inverse Matrix (A⁻¹)</strong>, which mathematically reverses the linear transformation applied by the original matrix.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Computational Algorithms Used</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Determinant Expansion:</strong> For 2x2 matrices, the determinant is calculated simply as (ad, bc). For 3x3 matrices, the engine utilizes the <span className="italic">Rule of Sarrus</span> or Laplace expansion, expanding minors along the first row to calculate the absolute scalar volume multiplier.</li>
              <li><strong className="text-[#188038]">Inverse via Adjugate Matrix:</strong> To find the inverse, the engine calculates the matrix of cofactors, transposes it to form the adjugate matrix, and then divides every resulting term by the original determinant. This ensures exact, analytic fractional outputs where possible.</li>
              <li><strong className="text-[#D93025]">Singularity Detection:</strong> If the calculated determinant is exactly zero, the matrix is mathematically "Singular". The engine will immediately flag this state, halting the inverse calculation, as a zero determinant implies the transformation collapses space into a lower dimension (e.g., a 3D space flattened into a 2D plane), rendering it mathematically irreversible.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the dimensionality of your square matrix using the top toggle (2x2 or 3x3).",
          "Input your numerical values into the grid. The calculator supports negative numbers and decimals.",
          "As you type, the engine evaluates the grid instantly. The Determinant and Trace will appear on the right.",
          "If the determinant is non-zero, the Inverse Matrix block will populate. If it is zero, a 'Singular Matrix' warning will appear.",
          "Use the 'Quick Preset' buttons to instantly load common arrays like the Identity Matrix for testing."
        ]
      }}
      formula={{
        title: "Matrix Theorems & Rules",
        description: "The core algebraic definitions defining the engine's behavior.",
        raw: "1. Trace (tr A): Sum of main diagonal elements (a + e + i)\n\n2. Determinant (2x2): |A| = (ad, bc)\n\n3. Determinant (3x3): |A| = a(ei, fh), b(di, fg) + c(dh, eg)\n\n4. Matrix Inverse (A⁻¹): (1 / |A|) × Adjugate(A)\n\n*Condition: A matrix A is invertible if and only if |A| ≠ 0."
      }}
      faqs={[
        {
          question: "What does the Determinant actually mean geometrically?",
          answer: "Geometrically, the determinant represents the volume scaling factor of a linear transformation. If a 3x3 matrix has a determinant of 5, it means applying that matrix to any 3D object will stretch its volume to be exactly 5 times larger."
        },
        {
          question: "What is a Singular Matrix?",
          answer: "A singular matrix is a square matrix whose determinant is exactly zero. Because finding the inverse requires dividing by the determinant, a singular matrix mathematically cannot have an inverse."
        },
        {
          question: "Why do I get an inverse error when the determinant is zero?",
          answer: "A determinant of zero means the transformation has 'squished' the space into a lower dimension (like flattening a 3D cube into a 2D square). Once flattened, you lose spatial information, meaning you cannot mathematically 'reverse' the process to get the cube back."
        },
        {
          question: "What is the Identity Matrix?",
          answer: "The Identity Matrix (usually denoted as I) is a square matrix with 1s on the main diagonal and 0s everywhere else. It acts like the number '1' in matrix algebra; multiplying any matrix by the Identity Matrix leaves it unchanged."
        },
        {
          question: "What is the significance of the Trace?",
          answer: "The trace is the sum of the main diagonal elements. In advanced linear algebra and quantum mechanics, the trace is incredibly important because it is 'invariant', meaning even if you change the basis of the matrix, the trace remains exactly the same."
        },
        {
          question: "Does this calculator handle matrix multiplication?",
          answer: "This specific tool is optimized for analyzing the properties of a single square matrix (Determinant, Trace, Inverse). Solving multiple equations using matrices should be done in our Linear Equation Solver tool."
        }
      ]}
      sidebar={{ title: "Algebra Tools", links: [{ label: "Linear Solver", href: "/calculator/linear-solver" }, { label: "Quadratic Formula", href: "/calculator/quadratic-formula" }], banner: { title: "Matrix Math", description: "Matrices are the mathematical foundation of 3D computer graphics.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Linear Solver", href: "/calculator/linear-solver" }]}
    />
  );
}
