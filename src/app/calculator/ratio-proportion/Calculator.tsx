'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Scale } from 'lucide-react';

export default function RatioProportion() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [c, setC] = useState('10');
  const [d, setD] = useState('');

  const result = useMemo(() => {
    const na = parseFloat(a), nb = parseFloat(b), nc = parseFloat(c), nd = parseFloat(d);
    if (isNaN(na)) return { label: 'A', val: !isNaN(nb*nc/nd) ? ((nb*nc)/nd).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nb)) return { label: 'B', val: !isNaN(na*nd/nc) ? ((na*nd)/nc).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nc)) return { label: 'C', val: !isNaN(na*nd/nb) ? ((na*nd)/nb).toFixed(4).replace(/\.0000$/, '') : '?' };
    if (isNaN(nd)) return { label: 'D', val: !isNaN(nb*nc/na) ? ((nb*nc)/na).toFixed(4).replace(/\.0000$/, '') : '?' };
    return { label: '?', val: 'No unknown' };
  }, [a, b, c, d]);

  const boxCls = (v: string) => `h-16 w-full text-center text-3xl font-black font-mono border rounded-lg focus:ring-1 outline-none transition-all ${v === '' ? 'border-dashed border-blue-400 bg-blue-50/50 text-blue-600 placeholder-blue-300 focus:border-blue-500 focus:ring-blue-500' : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500 text-slate-900'}`;

  return (
    <ModernCalcLayout
      hideH1={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Ratio Calculator' }]}
      title="Ratio & Proportion Calculator"
      description="Solve proportions (A:B = C:D) for any unknown value by leaving exactly one field empty. Ideal for scaling recipes, maps, and geometric shapes."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              <strong>Smart Solver:</strong> Fill in three values and leave exactly one blank (?). The calculator uses cross-multiplication to find the missing value.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
            <div className="flex items-center gap-3 justify-center">
              <div className="space-y-1 flex-1">
                <label className="text-[10px] font-black uppercase text-slate-500 text-center block tracking-widest">Value A</label>
                <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="?" className={boxCls(a)} />
              </div>
              <span className="text-3xl font-black text-slate-400 pb-2">:</span>
              <div className="space-y-1 flex-1">
                <label className="text-[10px] font-black uppercase text-slate-500 text-center block tracking-widest">Value B</label>
                <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="?" className={boxCls(b)} />
              </div>
              <span className="text-3xl font-black text-blue-600 pb-2">=</span>
              <div className="space-y-1 flex-1">
                <label className="text-[10px] font-black uppercase text-slate-500 text-center block tracking-widest">Value C</label>
                <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="?" className={boxCls(c)} />
              </div>
              <span className="text-3xl font-black text-slate-400 pb-2">:</span>
              <div className="space-y-1 flex-1">
                <label className="text-[10px] font-black uppercase text-slate-500 text-center block tracking-widest">Value D</label>
                <input type="number" value={d} onChange={e => setD(e.target.value)} placeholder="?" className={boxCls(d)} />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Common Scenarios</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Recipe Scaling',  a:'2', b:'4', c:'6', d:'' },
                { label: 'Map Distance',     a:'1', b:'50000', c:'5', d:'' },
                { label: 'Test Grades',   a:'75', b:'100', c:'', d:'60' },
              ].map(ex => (
                <button key={ex.label} onClick={() => { setA(ex.a); setB(ex.b); setC(ex.c); setD(ex.d); }}
                  className="p-3 border border-slate-200 rounded-xl bg-white hover:border-blue-300 hover:bg-slate-50 text-center transition-all shadow-sm">
                  <span className="block text-sm font-bold text-slate-700 mb-1">{ex.label}</span>
                  <span className="text-[10px] font-mono text-slate-500">{ex.a}:{ex.b} = {ex.c||'?'}:{ex.d||'?'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
            <div className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Solved Value for {result.label}</div>
            <div className="text-5xl sm:text-7xl font-black text-blue-600 tracking-tighter font-mono mb-4">{result.val}</div>
            {result.val === 'No unknown' ? (
              <div className="text-xs font-bold text-rose-500 bg-rose-50 inline-block px-3 py-1 rounded">Leave exactly ONE field blank</div>
            ) : (
              <div className="inline-flex gap-2 items-center text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                <span>{a || result.val} : {b || result.val}</span>
                <span className="text-blue-500">=</span>
                <span>{c || result.val} : {d || result.val}</span>
              </div>
            )}
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
             <Scale className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
             <div>
                <div className="text-xs font-bold uppercase text-slate-600 mb-1 tracking-wider">Formula Used</div>
                <p className="text-sm text-slate-700 font-medium">Cross multiplication: <strong>A × D = B × C</strong></p>
             </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Related Math Calculators",
        links: [
          { label: 'Percentage Calculator', href: '/calculator/percentage' },
          { label: 'Fractions Calculator', href: '/calculator/fraction' },
          { label: 'Geometry 3D', href: '/calculator/geometry-3d' },
        ],
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Mathematical Theory of Proportional Scaling</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                A <strong className="text-[#202124]">ratio</strong> is a fundamental mathematical comparison between two quantities, expressing the relative size of one quantity compared to another. When two separate ratios are mathematically equal, they form a <strong className="text-[#202124]">proportion</strong> (A:B = C:D). Our ratio calculator is a specialized proportional engine designed to instantly solve the missing variable in any equivalent fractional relationship.
              </p>
              <p>
                This engine operates on the foundational algebraic law of cross-multiplication. Because proportional fractions are strictly equivalent (<code className="bg-[#F1F3F4] px-1 rounded text-[#D93025]">A/B = C/D</code>), the mathematical product of the extremes (A and D) must always equal the product of the means (B and C). By leveraging this unshakeable rule, the calculator instantly isolates and computes any single missing variable with floating-point precision, making it an essential tool for chemical mixtures, architectural scale models, and financial allocations.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Practical Applications of Proportions</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Geometric Scaling (Aspect Ratios):</strong> Used extensively in digital design and photography to maintain the integrity of an image when resizing. If an image is 1920x1080 (16:9), the calculator instantly determines the correct height if the width is reduced to 800 pixels.</li>
              <li><strong className="text-[#188038]">Cartographic Map Scaling:</strong> Crucial for translating physical world distances to a scaled map. If a map's scale is 1 inch to 50,000 inches, the engine instantly solves how far 3.5 inches on the paper represents in the real world.</li>
              <li><strong className="text-[#D93025]">Stoichiometry & Recipe Scaling:</strong> Essential for scaling up chemical reactions or culinary recipes proportionally without altering the fundamental physical state or flavor profile.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Establish your known ratio (e.g., Value A and Value B). These two numbers set the foundational proportion.",
          "Identify the one part of the target ratio you know (either Value C or Value D).",
          "Enter these three known numbers into the grid.",
          "Critically: Delete the number in the box you want to solve for so it displays a '?' symbol.",
          "The computational engine instantly cross-multiplies and solves for the empty box."
        ]
      }}
      formula={{
        title: "Cross-Multiplication Theorem",
        description: "The algebraic foundation of proportional equivalency.",
        raw: "Standard Form:\nA : B = C : D\n\nFractional Equivalency:\nA / B = C / D\n\nCross-Multiplication Isolation:\nA × D = B × C\n\nSolving for Unknowns:\nUnknown A = (B × C) / D\nUnknown B = (A × D) / C\nUnknown C = (A × D) / B\nUnknown D = (B × C) / A"
      }}
      faqs={[
        {
          question: "What is the mathematical difference between a ratio and a proportion?",
          answer: "A ratio strictly compares the size of two numbers (e.g., 2 apples to 3 oranges). A proportion is an algebraic equation stating that two independent ratios are exactly equivalent to each other (e.g., 2:3 = 4:6)."
        },
        {
          question: "How does the cross-multiplication formula actually work?",
          answer: "If A/B = C/D, then mathematically the extremes multiplied (A × D) must equal the means multiplied (B × C). If any one of these four variables is missing, standard algebra allows us to isolate it by dividing the known product by the remaining known variable."
        },
        {
          question: "Can I use decimals or fractions in a ratio?",
          answer: "Yes. While ratios are traditionally expressed as whole numbers, proportional mathematics works perfectly with decimals and fractions. Our engine utilizes floating-point arithmetic to process non-integers seamlessly."
        },
        {
          question: "Why do I get a '?' result?",
          answer: "The engine requires exactly three known variables to solve for the fourth. If you leave two boxes blank, the equation becomes unsolvable. If you fill all four boxes, there is no unknown to solve for."
        },
        {
          question: "What is an Aspect Ratio?",
          answer: "An aspect ratio describes the proportional relationship between the width and height of an image or screen. A standard HD television has an aspect ratio of 16:9, meaning for every 16 units of width, there must be exactly 9 units of height."
        },
        {
          question: "How do I calculate a three-part ratio (A:B:C)?",
          answer: "This specific calculator operates on two-part proportional equivalency (A:B = C:D). To calculate a three-part ratio, you must break the problem down into multiple independent two-part proportions and solve them sequentially."
        }
      ]}
    />
  );
}
