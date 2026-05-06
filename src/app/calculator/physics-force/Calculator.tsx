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
    <ModernCalcLayout hideH1={true}
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
          { label: 'Kinetic Energy', href: '/calculator/physics-energy/' },
          { label: 'Geometry Calculator', href: '/calculator/geometry-3d/' },
          { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Age Calculator", href: "/calculator/age-calculator/" }
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Newtonian Mechanics: The Four Fundamental Equations</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Isaac Newton's laws of classical mechanics, published in his <em>Principia Mathematica</em> (1687), form the bedrock of all macroscopic physics and engineering. Our <strong className="text-[#202124]">physics calculator</strong> consolidates the four most foundational derived equations into a single precision engine: Newton's Second Law (Force), the Work-Energy theorem (Work), the rate of energy transfer (Power), and the surface concentration of force (Pressure).
              </p>
              <p>
                Every equation in this tool operates within the International System of Units (SI), ensuring that inputs and outputs are directly compatible with all global physics, engineering, and academic standards. The engine performs exact floating-point arithmetic, displaying results to 4 decimal places before stripping trailing zeros for clarity.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Deep Dive: The Four Physical Laws</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Force (F = ma):</strong> Newton's Second Law. A net force applied to an object produces an acceleration proportional to the force and inversely proportional to the object's mass. 1 Newton = 1 kg·m/s². Example: pushing a 10 kg box with 20 N of force produces 2 m/s² of acceleration.</li>
              <li><strong className="text-[#188038]">Work (W = Fd):</strong> Energy transferred to or from an object via an applied force over a displacement. Only the component of force parallel to displacement does work. 1 Joule = 1 N·m. Example: lifting a 10 N box by 3 meters requires 30 J of work.</li>
              <li><strong className="text-[#D93025]">Power (P = W/t):</strong> The rate at which energy is transferred or work is done. A 100W light bulb consumes 100 Joules of energy per second. Human peak mechanical power output is approximately 1-2 kilowatts during intense bursts.</li>
              <li><strong className="text-[#F29900]">Pressure (P = F/A):</strong> Force distributed over an area. This is why sharp needles pierce skin with minimal force (tiny area = massive pressure) while snowshoes prevent sinking (large area = minimal pressure).</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "What is the SI unit of Force and what does it represent?",
          answer: "The SI unit of force is the Newton (N), named after Isaac Newton. One Newton is defined as the force required to accelerate a mass of 1 kilogram at a rate of 1 meter per second squared (1 N = 1 kg·m/s²). Earth's gravity exerts approximately 9.81 N on a 1 kg object."
        },
        {
          question: "What is the difference between Work and Energy?",
          answer: "In physics, Work is the process of energy transfer, it describes an action (applying force over distance). Energy is the capacity to do work. Work done ON a system increases its energy; work done BY a system decreases it. Both are measured in Joules, making them numerically equivalent despite being conceptually distinct."
        },
        {
          question: "What is the difference between Power and Energy?",
          answer: "Energy (Joules) is the total amount of work done or transferred. Power (Watts) is the rate at which that energy is used. A 100W motor running for 10 seconds uses the same energy (1000 J) as a 1000W motor running for 1 second, but they have very different power ratings."
        },
        {
          question: "Why does Pressure depend on Area and not just Force?",
          answer: "Pressure measures how concentrated a force is. The same 100 N force applied to a 1 cm² area creates 1 MPa of pressure, enough to pierce metal. Applied to a 100 cm² area, it creates only 10 kPa, barely enough to dent foam. This principle is used in hydraulic presses, needles, and pneumatic systems."
        },
        {
          question: "What is a Joule in everyday terms?",
          answer: "One Joule is roughly the energy needed to lift a 100-gram apple 1 meter upward against gravity. A 2,000-calorie daily diet provides about 8,400,000 Joules of energy. A single AA battery stores approximately 10,000 Joules."
        },
        {
          question: "Can I use this calculator for rotational motion?",
          answer: "No. This calculator covers linear (translational) Newtonian mechanics. For rotational mechanics, the analogous formulas are: Torque (τ = Iα), Rotational Work (W = τθ), and Rotational Power (P = τω), where I is moment of inertia, α is angular acceleration, θ is angle, and ω is angular velocity."
        }
      ]}
    />
  );
}

