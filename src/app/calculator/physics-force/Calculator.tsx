'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Activity } from 'lucide-react';

type Mode = 'force' | 'work' | 'power' | 'pressure';

const MODES: { key: Mode; label: string; formula: string; l1: string; l2: string; u: string }[] = [
  { key: 'force',    label: 'Force',    formula: 'F = m × a', l1: 'Mass (kg)',    l2: 'Acceleration (m/s²)', u: 'N'  },
  { key: 'work',     label: 'Work',     formula: 'W = F × d', l1: 'Force (N)',    l2: 'Distance (m)',         u: 'J'  },
  { key: 'power',    label: 'Power',    formula: 'P = W / t', l1: 'Work (J)',     l2: 'Time (s)',             u: 'W'  },
  { key: 'pressure', label: 'Pressure', formula: 'P = F / A', l1: 'Force (N)',    l2: 'Area (m²)',            u: 'Pa' },
];

export default function ForceCalc() {
  const [mode, setMode] = useState<Mode>('force');
  const [v1, setV1] = useState('10');
  const [v2, setV2] = useState('2');

  const res = useMemo(() => {
    const n1 = parseFloat(v1), n2 = parseFloat(v2);
    if (isNaN(n1) || isNaN(n2)) return null;
    const m = MODES.find(m => m.key === mode)!;
    const val = ['force','work'].includes(mode) ? n1 * n2 : n1 / n2;
    return { val: val.toFixed(4).replace(/\.0000$/, ''), unit: m.u, formula: m.formula };
  }, [v1, v2, mode]);

  const current = MODES.find(m => m.key === mode)!;

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Physics Force Calculator' }]}
      title="Physics Force & Work Calculator"
      description="Calculate Newtonian mechanics including Force (F=ma), Work (W=Fd), Power (P=W/t), and Pressure (P=F/A)."
      icon={Activity}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Calculation Target</label>
            <div className="grid grid-cols-2 gap-3">
              {MODES.map(m => (
                <button key={m.key} onClick={() => setMode(m.key)}
                  className={`py-3 px-4 rounded-lg flex flex-col items-center justify-center border transition-all ${mode === m.key ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  <span className="font-bold text-sm">{m.label}</span>
                  <span className={`text-[10px] font-mono mt-1 ${mode === m.key ? 'text-blue-200' : 'text-slate-400'}`}>{m.formula}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">{current.l1}</label>
              <input type="number" value={v1} onChange={e => setV1(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 font-mono text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">{current.l2}</label>
              <input type="number" value={v2} onChange={e => setV2(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 font-mono text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-xl text-center shadow-inner">
            <div className="text-xs font-bold uppercase text-blue-600 mb-2">{current.label} Result</div>
            {res ? (
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-black text-slate-900 tracking-tighter font-mono mb-1">{res.val}</div>
                <div className="text-lg font-bold text-slate-500">{res.unit}</div>
              </div>
            ) : (
              <div className="text-base font-medium text-slate-400 py-4">Enter valid numerical values</div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
               <span className="text-xs font-bold text-slate-500 uppercase">Input Summary</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { label: current.l1.split('(')[0].trim(), val: `${v1} ${current.l1.split('(')[1]?.replace(')','') || ''}` },
                { label: current.l2.split('(')[0].trim(), val: `${v2} ${current.l2.split('(')[1]?.replace(')','') || ''}` },
                { label: 'Equation Used', val: current.formula }
              ].map(({ label, val }) => (
                <div key={label} className="p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                  <span className="text-sm font-bold font-mono text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Physics & Engineering",
        links: [
          { label: 'Kinetic Energy', href: '/calculator/physics-energy' },
          { label: 'Geometry Calculator', href: '/calculator/geometry-3d' },
          { label: 'Scientific Calculator', href: '/calculator/scientific-calculator' },
        ],
      }}
      howToUse={{
        steps: [
          "Select the physical property you want to calculate: Force, Work, Power, or Pressure.",
          "Note the formula displayed for the selected property (e.g., F = m × a).",
          "Enter the first parameter in the specified unit (e.g., Mass in kg).",
          "Enter the second parameter in the specified unit (e.g., Acceleration in m/s²).",
          "The calculation updates instantly and displays the correct SI unit (Newtons, Joules, Watts, or Pascals)."
        ]
      }}
      seoContent={
        <div>
          <h2>Understanding Classical Mechanics and Force</h2>
          <p>Classical mechanics, heavily influenced by Sir Isaac Newton, forms the foundation of our understanding of how objects move and interact. This calculator simplifies the four most common physical quantities encountered in introductory physics and engineering.</p>
          
          <h3>1. Force (Newton's Second Law)</h3>
          <p>Newton's Second Law states that the force acting on an object is equal to the mass of that object times its acceleration (<strong>F = ma</strong>). Force is a vector quantity, meaning it has both magnitude and direction. It is measured in Newtons (N), where 1 N = 1 kg·m/s².</p>
          
          <h3>2. Work (Energy Transfer)</h3>
          <p>In physics, work is done when a force acts upon an object causing a displacement (<strong>W = Fd</strong>). If you push a heavy box, the work done is the force you applied multiplied by the distance the box moved. It is measured in Joules (J).</p>
          
          <h3>3. Power (Rate of Work)</h3>
          <p>Power measures how quickly work is done or energy is transferred (<strong>P = W/t</strong>). A high-power engine does the same amount of work in less time than a low-power engine. Power is measured in Watts (W), where 1 W = 1 Joule per second.</p>
          
          <h3>4. Pressure (Force over Area)</h3>
          <p>Pressure is defined as the physical force exerted on an object per unit area (<strong>P = F/A</strong>). This explains why a sharp knife cuts better than a dull one—the same force is concentrated over a much smaller area, creating immense pressure. It is measured in Pascals (Pa), where 1 Pa = 1 N/m².</p>
        </div>
      }
    />
  );
}
