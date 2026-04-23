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
    <ModernCalcLayout
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
              <label className="text-sm font-bold text-slate-800">Kinetic Energy — E (Joules)</label>
              <input type="number" value={eVal} onChange={e => setE(e.target.value)} placeholder="? (leave blank to solve)" className={inputCls(eVal === '')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Mass — m (kg)</label>
              <input type="number" value={mVal} onChange={e => setM(e.target.value)} placeholder="? (leave blank to solve)" className={inputCls(mVal === '')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Velocity — v (m/s)</label>
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
      seoContent={
        <div>
          <h2>Understanding Kinetic Energy</h2>
          <p>Kinetic energy is the energy that an object possesses due to its motion. It is defined as the work needed to accelerate a body of a given mass from rest to its stated velocity. Having gained this energy during its acceleration, the body maintains this kinetic energy unless its speed changes.</p>
          
          <h3>The Formula: KE = ½mv²</h3>
          <p>The standard equation for kinetic energy in classical mechanics is <strong>KE = ½mv²</strong>, where:</p>
          <ul>
            <li><strong>KE (Kinetic Energy):</strong> Measured in Joules (J). One Joule is the energy transferred when applying a force of one Newton through a distance of one meter.</li>
            <li><strong>m (Mass):</strong> Measured in kilograms (kg).</li>
            <li><strong>v (Velocity):</strong> The speed of the object in a specific direction, measured in meters per second (m/s).</li>
          </ul>
          
          <h3>The Non-Linear Effect of Velocity</h3>
          <p>Looking at the formula, you'll notice that velocity is squared (v²). This has profound implications in physics and real-world safety. If you double the mass of an object, its kinetic energy doubles (a linear relationship). However, if you <strong>double the velocity</strong> of an object, its kinetic energy <strong>quadruples</strong>.</p>
          <p>This explains why car accidents at high speeds are exponentially more destructive than at low speeds. A car traveling at 60 mph has four times the kinetic energy (and requires four times the braking distance) as the same car traveling at 30 mph.</p>
          
          <h3>Applications in Engineering</h3>
          <p>Understanding kinetic energy is crucial in various fields: calculating the impact force of a projectile, designing braking systems for vehicles and rollercoasters, and converting motion into electricity via wind or hydroelectric turbines.</p>
        </div>
      }
    />
  );
}
