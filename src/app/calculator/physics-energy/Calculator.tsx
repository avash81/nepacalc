'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Zap } from 'lucide-react';

export default function EnergyCalc() {
  const [eVal, setE] = useState('');
  const [mVal, setM] = useState('2');
  const [vVal, setV] = useState('10');

  const res = useMemo(() => {
    const e = parseFloat(eVal), m = parseFloat(mVal), v = parseFloat(vVal);
    if (isNaN(e) && !isNaN(m) && !isNaN(v)) return { label: 'Kinetic Energy (KE)', val: (0.5 * m * v * v).toFixed(4).replace(/\.0000$/, ''), unit: 'J' };
    if (isNaN(m) && !isNaN(e) && !isNaN(v)) return { label: 'Mass (m)', val: ((2 * e) / (v * v)).toFixed(4).replace(/\.0000$/, ''), unit: 'kg' };
    if (isNaN(v) && !isNaN(e) && !isNaN(m)) return { label: 'Velocity (v)', val: Math.sqrt((2 * e) / m).toFixed(4).replace(/\.0000$/, ''), unit: 'm/s' };
    return null;
  }, [eVal, mVal, vVal]);

  const inputCls = (empty: boolean) =>
    `w-full px-4 py-3 rounded-lg border font-mono text-xl transition-all outline-none ${empty ? 'border-dashed border-blue-400 bg-blue-50/50 placeholder-blue-300 focus:border-blue-500 focus:bg-blue-50 focus:ring-1 focus:ring-blue-500 text-blue-900' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900'}`;

  return (
    <ModernCalcLayout hideH1={true}
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Energy Calculator' }]}
      title="Kinetic Energy Calculator"
      description="Calculate kinetic energy (KE = ½mv²), mass, or velocity. Leave exactly one field blank to solve for it automatically."
      icon={Zap}
      inputs={
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              <strong>Smart Solver:</strong> Fill in any two values and leave the third one blank (?). The calculator will automatically solve for the missing variable.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Kinetic Energy ,  E (Joules)</label>
              <input type="number" value={eVal} onChange={e => setE(e.target.value)} placeholder="? (leave blank to solve)" className={inputCls(eVal === '')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Mass ,  m (kg)</label>
              <input type="number" value={mVal} onChange={e => setM(e.target.value)} placeholder="? (leave blank to solve)" className={inputCls(mVal === '')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Velocity ,  v (m/s)</label>
              <input type="number" value={vVal} onChange={e => setV(e.target.value)} placeholder="? (leave blank to solve)" className={inputCls(vVal === '')} />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500">Real World Examples</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Thrown Ball',   e:'', m:'0.15',  v:'40' },
                { label: 'Moving Car', e:'', m:'1500', v:'30' },
                { label: 'Sprinting Human',           e:'', m:'70', v:'8' },
              ].map(ex => (
                <button key={ex.label} onClick={() => { setE(ex.e); setM(ex.m); setV(ex.v); }}
                  className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 hover:border-blue-200 text-center transition-all shadow-sm">
                  <span className="block text-sm font-bold text-slate-800">{ex.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-xl text-center shadow-inner relative overflow-hidden">
            <Zap className="absolute -right-4 -top-4 w-32 h-32 text-blue-600/5 rotate-12" />
            <div className="relative z-10">
              {res ? (
                <>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Solved: {res.label}</div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-black text-slate-900 tracking-tighter font-mono mb-2">{res.val}</div>
                    <div className="text-lg font-bold text-slate-500">{res.unit}</div>
                  </div>
                </>
              ) : (
                <div className="text-base font-medium text-slate-400 py-8">Leave exactly ONE field blank to solve.</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
               <span className="text-xs font-bold text-slate-500 uppercase">Input Summary</span>
               <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">KE = ½mv²</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { l: 'Energy (E)', v: eVal || '?', u: 'Joules (J)' },
                { l: 'Mass (m)',   v: mVal || '?', u: 'Kilograms (kg)' },
                { l: 'Velocity (v)', v: vVal || '?', u: 'Meters/sec (m/s)' },
              ].map(({ l, v, u }) => (
                <div key={l} className="p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">{l}</span>
                  <div className="text-right">
                    <span className={`text-sm font-bold font-mono ${v === '?' ? 'text-blue-600' : 'text-slate-900'}`}>{v}</span>
                    <span className="text-xs text-slate-400 ml-1">{u}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Physics Calculators",
        links: [
          { label: 'Force & Work', href: '/calculator/physics-force' },
          { label: 'Math Geometry', href: '/calculator/geometry-3d' },
          { label: 'Scientific', href: '/calculator/scientific-calculator' },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" }
        ],
      }}
      howToUse={{
        steps: [
          "Determine which variable you want to solve for: Energy (E), Mass (m), or Velocity (v).",
          "Delete the value in the input field of the variable you want to solve for, leaving it blank (it will show a '?').",
          "Enter the known values into the remaining two input fields.",
          "The calculator automatically rearranges the formula and computes the exact value for the blank field."
        ]
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Classical Mechanics: The Kinetic Energy Theorem</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                <strong className="text-[#202124]">Kinetic energy (KE)</strong> is the energy possessed by any object in motion. Formally defined by the Work-Energy Theorem, KE is the net work required to accelerate an object of mass <em>m</em> from rest to velocity <em>v</em>. Our <strong className="text-[#202124]">kinetic energy calculator</strong> implements the full algebraic system, allowing you to solve for any one of the three variables (E, m, or v) by leaving its field blank.
              </p>
              <p>
                The most critical insight from the formula <strong className="text-[#202124]">KE = ½mv²</strong> is the quadratic relationship with velocity: doubling velocity does not double energy, it <strong className="text-[#202124]">quadruples</strong> it. This non-linear scaling has profound real-world implications in vehicle safety, projectile physics, and structural engineering, where impact forces at high speeds are exponentially more destructive.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Real-World Kinetic Energy Applications</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Vehicle Safety (Crash Physics):</strong> A car at 60 km/h has 4× the kinetic energy of the same car at 30 km/h. This quadratic relationship is why high-speed collisions are exponentially more fatal, braking distance also scales with v², not v.</li>
              <li><strong className="text-[#188038]">Renewable Energy (Wind Turbines):</strong> A wind turbine's power output scales with the cube of wind velocity (since power = energy/time, and KE ∝ v²). Doubling wind speed produces 8× the energy, the primary reason turbine placement is so critical.</li>
              <li><strong className="text-[#D93025]">Projectile & Ballistic Physics:</strong> The terminal kinetic energy of a bullet or projectile upon impact determines penetration depth and structural damage. Forensic engineers use KE calculations to reconstruct accident and ballistic scenarios.</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "What is the unit of Kinetic Energy and why?",
          answer: "Kinetic Energy is measured in Joules (J). One Joule is defined as the energy transferred when a force of one Newton is applied through one meter of displacement (1 J = 1 N·m = 1 kg·m²/s²). It is named after physicist James Prescott Joule."
        },
        {
          question: "Why does doubling velocity quadruple the kinetic energy?",
          answer: "Because kinetic energy is proportional to v² (velocity squared). If you substitute 2v into the formula: KE = ½m(2v)² = ½m(4v²) = 4 × ½mv². This quadratic relationship is why speed limits in physics and road safety are so critical."
        },
        {
          question: "How do I use this calculator to find velocity from kinetic energy?",
          answer: "Clear the Velocity (v) input field, leaving it blank (you will see a '?' placeholder). Enter the known Energy (E) in Joules and Mass (m) in kilograms. The calculator will automatically rearrange the formula to v = √(2E/m) and compute the result."
        },
        {
          question: "What is the difference between Kinetic Energy and Potential Energy?",
          answer: "Kinetic Energy is the energy of motion (an object currently moving). Potential Energy is stored energy due to position or state (e.g., a ball held at height has gravitational PE). The Law of Conservation of Energy states that the total energy (KE + PE) in a closed system remains constant, as KE increases, PE decreases, and vice versa."
        },
        {
          question: "Does this formula apply to relativistic speeds (near speed of light)?",
          answer: "No. The formula KE = ½mv² is the Newtonian (classical) approximation, valid only for speeds significantly below the speed of light (~3×10⁸ m/s). At relativistic speeds, Einstein's special relativity formula must be used: KE = (γ-1)mc², where γ is the Lorentz factor."
        },
        {
          question: "What is the kinetic energy of a moving car in Nepal at highway speed?",
          answer: "A typical car (~1,500 kg) traveling at 80 km/h (22.2 m/s) has a kinetic energy of: KE = ½ × 1500 × (22.2)² ≈ 370,000 Joules (370 kJ). This energy must be fully dissipated by the braking system to bring the vehicle to a stop."
        }
      ]}
    />
  );
}

