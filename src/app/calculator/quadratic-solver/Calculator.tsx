'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { FunctionSquare, Binary, Activity, Lightbulb } from 'lucide-react';
import { solveQuadratic } from '@/utils/math/safeCalculations';

const DEFAULT_STATE = {
  a: 1,
  b: -5,
  c: 6,
};

export default function QuadraticSolver() {
  const [state, setState] = useSyncState('quadratic_solver_v4', DEFAULT_STATE);
  const { a, b, c } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const result = useMemo(() => {
    return solveQuadratic(a, b, c);
  }, [a, b, c]);

  // Graphing logic
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

  const inputCls = "w-full h-12 text-center border border-[#DADCE0] rounded-md bg-white font-mono text-lg font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all shadow-inner";

  return (
    <ModernCalcLayout hideH1={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Quadratic Equation Solver' }]}
      title="Quadratic Equation Solver"
      description="Calculate the roots of any quadratic equation. Instantly compute the discriminant, identify real or complex roots, and visualize the parabolic curve."
      icon={FunctionSquare}
      inputs={
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
             <div className="inline-block px-8 py-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] shadow-inner text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#70757A] mb-1">Standard Form Equation</div>
                <span className="text-2xl sm:text-3xl font-black text-[#1A73E8] font-mono tracking-tighter">
                   {a}x² {b >= 0 ? '+' : '−'} {Math.abs(b)}x {c >= 0 ? '+' : '−'} {Math.abs(c)} = 0
                </span>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider text-center block">Coefficient A</label>
              <input type="number" value={a} onChange={e => updateState({ a: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider text-center block">Coefficient B</label>
              <input type="number" value={b} onChange={e => updateState({ b: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider text-center block">Constant C</label>
              <input type="number" value={c} onChange={e => updateState({ c: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#F1F3F4]">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Algebraic Presets</label>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => updateState({ a: 1, b: -5, c: 6 })} className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all text-xs font-bold font-mono">x² − 5x + 6 = 0</button>
              <button onClick={() => updateState({ a: 1, b: 2, c: 5 })} className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all text-xs font-bold font-mono">x² + 2x + 5 = 0</button>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {result.success && result.data ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden shadow-sm">
                 <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Mathematical Roots</span>
                    <Binary className="w-4 h-4 text-[#1A73E8]" />
                 </div>
                 <div className="divide-y divide-[#DADCE0]">
                    {result.data.roots.map((root, i) => (
                      <div key={i} className="p-6 text-center">
                         <div className="text-xs font-bold text-[#70757A] mb-2 font-mono">Root x{i + 1}</div>
                         <div className="text-3xl font-black text-[#202124] font-mono tracking-tighter break-all">{root.display}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#E8F0FE] p-4 rounded-lg border border-[#C5D9F7] text-center">
                    <div className="text-[9px] font-bold uppercase text-[#1A73E8] tracking-wider mb-1">Discriminant (Δ)</div>
                    <div className="text-lg font-black text-[#1A73E8] font-mono">{result.data.discriminant}</div>
                 </div>
                 <div className="bg-[#E6F4EA] p-4 rounded-lg border border-[#CEEAD6] text-center">
                    <div className="text-[9px] font-bold uppercase text-[#188038] tracking-wider mb-1">Root Nature</div>
                    <div className="text-sm font-black text-[#188038] truncate">
                      {result.data.discriminant > 0 ? 'Distinct Real' : result.data.discriminant === 0 ? 'Repeated Real' : 'Complex Pair'}
                    </div>
                 </div>
              </div>

              {a !== 0 && (
                <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Parabola Visualization</div>
                      <Activity className="w-4 h-4 text-[#1A73E8]" />
                   </div>
                   <div className="aspect-[16/9] bg-[#F8F9FA] border border-[#DADCE0] rounded-lg overflow-hidden relative group">
                      <svg viewBox="0 0 100 100" className="w-full h-full p-4 overflow-visible">
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#DADCE0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="#DADCE0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <circle cx="50" cy="50" r="1.5" fill="#D93025" />
                        <polyline
                          points={graphData}
                          fill="none"
                          stroke="#1A73E8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-[#70757A] uppercase bg-white/80 px-2 py-1 rounded">
                        Vertex: ({(-b / (2 * a)).toFixed(2)}, {(result.data.discriminant / (-4 * a)).toFixed(2)})
                      </div>
                   </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-center space-y-2">
              <p className="font-black uppercase tracking-widest text-[#D93025] text-[10px]">Mathematical Error</p>
              <p className="text-xs font-bold text-[#D93025]">{result.error}</p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Algebraic Resolution of Quadratic Polynomials</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In mathematics, a quadratic equation is a second-degree polynomial equation. The prefix "quad" signifies that the variable is squared (raised to the power of 2). Geometrically, this equation plots a U-shaped curve known as a <strong className="text-[#202124]">parabola</strong>. Solving a quadratic equation determines its "roots"—the exact coordinate locations where the parabolic curve crosses the horizontal x-axis.
              </p>
              <p>
                Our computational <strong className="text-[#202124]">quadratic formula calculator</strong> utilizes the standard universal formula to provide exact root derivations. Unlike traditional factoring methods (which fail on equations with non-integer roots), the quadratic formula analytically parses the equation's coefficients to yield the precise geometric intersections, even evaluating complex (imaginary) numbers seamlessly.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Understanding The Discriminant (Δ)</h3>
            <p className="text-sm text-[#5F6368] mb-3">
              The nature of the parabolic curve is dictated entirely by a sub-formula known as the Discriminant (b² - 4ac). This number "discriminates" between the three possible geometric realities:
            </p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Positive Discriminant (Δ &gt; 0):</strong> The parabola crosses the x-axis twice. The equation possesses two distinct, real mathematical roots.</li>
              <li><strong className="text-[#188038]">Zero Discriminant (Δ = 0):</strong> The parabola perfectly kisses the x-axis with its vertex. The equation possesses exactly one distinct, repeated real root.</li>
              <li><strong className="text-[#D93025]">Negative Discriminant (Δ &lt; 0):</strong> The parabola "floats" above or below the x-axis, never touching it. The roots do not exist in real Cartesian space; they are defined entirely by Complex/Imaginary numbers (<span className="italic">i</span>).</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Ensure your equation is organized into standard form: ax² + bx + c = 0.",
          "Input the integer or decimal coefficient for A (the x² multiplier). Note: 'a' cannot be 0, otherwise it is just a linear equation.",
          "Input the coefficients for B and C. If your equation is missing a term, enter 0.",
          "The engine instantly calculates the Discriminant to determine root feasibility.",
          "Review the exact roots and explore the interactive Parabola Visualization map."
        ]
      }}
      formula={{
        title: "The Quadratic Formula",
        description: "The universal analytic algebraic solution.",
        raw: "Standard Form:\nax² + bx + c = 0\n\nThe Formula:\nx = (-b ± √(b² - 4ac)) / 2a\n\nThe Discriminant (Δ):\nΔ = b² - 4ac\n\nThe Parabola Vertex:\nx = -b / 2a\ny = -Δ / 4a"
      }}
      faqs={[
        {
          question: "What happens if coefficient 'a' is zero?",
          answer: "If 'a' is exactly zero, the x² term is eliminated. The equation mathematically ceases to be quadratic and becomes a standard linear equation (bx + c = 0). The engine will return an error."
        },
        {
          question: "What are 'Complex Pair' roots?",
          answer: "When the discriminant is negative, taking the square root requires calculating the root of a negative number, which is impossible in real mathematics. Thus, the solution utilizes 'i' (imaginary numbers). These always occur in conjugate pairs."
        },
        {
          question: "How do I calculate the highest or lowest point of the curve?",
          answer: "That point is called the vertex. The exact x-coordinate is found using (-b / 2a). If 'a' is positive, the parabola opens upwards and the vertex is the absolute minimum. If 'a' is negative, it opens downwards and the vertex is the peak."
        },
        {
          question: "Why use the formula instead of factoring?",
          answer: "Factoring is a mental shortcut that only works effectively when roots are clean, whole numbers. The quadratic formula is an analytical sledgehammer that solves 100% of quadratic equations, regardless of how messy the decimals or fractions get."
        },
        {
          question: "What does the 'c' constant represent on the graph?",
          answer: "The 'c' term dictates exactly where the parabola intersects the vertical y-axis. Regardless of the 'a' or 'b' values, the curve will always cross the y-axis at the coordinate (0, c)."
        },
        {
          question: "Why does a zero discriminant only have one root?",
          answer: "Mathematically, the formula uses a ± (plus or minus) sign. If the discriminant is zero, you are adding and subtracting zero, which results in the exact same number. Geometrically, it means the tip of the U-curve perfectly balances on the x-axis."
        }
      ]}
      sidebar={{
        title: "Algebra toolkit",
        links: [
          { label: "Linear Equation Solver", href: "/calculator/linear-solver" },
          { label: "Matrix Calculator", href: "/calculator/matrices" },
          { label: "Fraction Calculator", href: "/calculator/fraction-calculator" },
        ],
        banner: {
          title: "Graphing Reality",
          description: "Quadratic equations model the physical trajectory of objects, from thrown baseballs to rocket launches.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Linear Solver", href: "/calculator/linear-solver" },
        { label: "Matrices", href: "/calculator/matrices" }
      ]}
    />
  );
}

