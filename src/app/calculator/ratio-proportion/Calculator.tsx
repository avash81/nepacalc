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
      howToUse={{
        steps: [
          "Identify the known ratio (e.g., A and B).",
          "Identify the one part of the target ratio you know (e.g., C or D).",
          "Enter these three numbers into the corresponding boxes.",
          "Clear the box for the value you want to find so it shows '?'.",
          "The calculator automatically cross-multiplies and solves for the blank box."
        ]
      }}
      faqs={[
        {
          question: "What is a proportion?",
          answer: "A proportion is a mathematical statement equating two ratios. When we write A:B = C:D, we are saying that the relationship between A and B is exactly the same as the relationship between C and D."
        },
        {
          question: "How does cross-multiplication work?",
          answer: "If A/B = C/D, then mathematically A × D must equal B × C. If one of these variables is missing, you can isolate it. For example, if D is missing, D = (B × C) / A."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding Ratios and Proportions</h2>
          <p>Ratios and proportions are fundamental mathematical concepts used to compare quantities and scale them accurately. Whether you are baking, reading a map, or mixing chemicals, understanding proportions ensures you maintain the correct balance between different ingredients or dimensions.</p>
          
          <h3>What is a Ratio?</h3>
          <p>A ratio is simply a comparison of two numbers indicating how many times the first number contains the second. It can be written with a colon (A:B), as a fraction (A/B), or in words ("A to B"). For example, if a recipe calls for 2 cups of flour for every 1 cup of sugar, the ratio of flour to sugar is 2:1.</p>
          
          <h3>What is a Proportion?</h3>
          <p>A proportion is an equation stating that two ratios are equal. The format is <strong>A:B = C:D</strong> (read as "A is to B as C is to D"). If you know that a car travels 100 miles on 4 gallons of gas, you have the ratio 100:4. If you want to know how far it can travel on 10 gallons, you set up the proportion: 100:4 = X:10. Using this calculator, you would enter A=100, B=4, C=blank, D=10, and it would solve for X (250 miles).</p>
          
          <h3>Real-World Applications</h3>
          <ul>
            <li><strong>Recipe Scaling:</strong> Easily scale a recipe up or down. If a recipe for 4 people requires 200g of pasta, how much is needed for 6 people? (4:200 = 6:X)</li>
            <li><strong>Map Reading:</strong> Determine actual distances using the map's scale. If a map's scale is 1 inch = 5 miles, how far is 3.5 inches on the map? (1:5 = 3.5:X)</li>
            <li><strong>Photography and Screens:</strong> Resizing images to maintain aspect ratios (like 16:9 or 4:3) so the image does not stretch or warp.</li>
          </ul>
        </div>
      }
    />
  );
}
