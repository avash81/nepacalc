'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Activity, ArrowRight, Gauge, Zap, Compass } from 'lucide-react';

type MechanicsMode = 'fma' | 'work' | 'power' | 'pressure';

// Mode 1: Newton's Law (F = ma) solve targets
type FmaTarget = 'force' | 'mass' | 'accel';

export default function ForceCalc() {
  const [mode, setMode] = useState<MechanicsMode>('fma');

  // F = ma state
  const [fmaTarget, setFmaTarget] = useState<FmaTarget>('force');
  const [mass, setMass] = useState('10'); // kg
  const [accel, setAccel] = useState('9.8'); // m/s²
  const [force, setForce] = useState('98'); // N

  // Work state: W = F * d
  const [workForce, setWorkForce] = useState('50'); // N
  const [distance, setDistance] = useState('5'); // m

  // Power state: P = W / t
  const [powerWork, setPowerWork] = useState('250'); // J
  const [time, setTime] = useState('5'); // s

  // Pressure state: P = F / A
  const [pressForce, setPressForce] = useState('500'); // N
  const [area, setArea] = useState('0.05'); // m²

  // Quick gravity presets for acceleration
  const setGravityPreset = (val: string) => {
    setAccel(val);
  };

  // Calculations
  const result = useMemo(() => {
    if (mode === 'fma') {
      const m = parseFloat(mass);
      const a = parseFloat(accel);
      const f = parseFloat(force);

      if (fmaTarget === 'force') {
        if (isNaN(m) || isNaN(a)) return null;
        const val = m * a;
        const kn = val / 1000;
        const lbf = val * 0.224809;
        return {
          primary: `${val.toFixed(2).replace(/\.00$/, '')} N`,
          val,
          unit: 'Newtons (N)',
          equation: `F = m × a = ${m} kg × ${a} m/s² = ${val.toFixed(2)} N`,
          subValues: [
            { label: 'Kilonewtons (kN)', val: `${kn.toFixed(4).replace(/\.?0+$/, '')} kN` },
            { label: 'Pound-force (lbf)', val: `${lbf.toFixed(2)} lbf` },
            { label: 'Dynes', val: `${(val * 1e5).toLocaleString('en-US')} dyn` },
          ]
        };
      } else if (fmaTarget === 'mass') {
        if (isNaN(f) || isNaN(a) || a === 0) return null;
        const val = f / a;
        const g = val * 1000;
        const lbs = val * 2.20462;
        return {
          primary: `${val.toFixed(2).replace(/\.00$/, '')} kg`,
          val,
          unit: 'Kilograms (kg)',
          equation: `m = F / a = ${f} N ÷ ${a} m/s² = ${val.toFixed(2)} kg`,
          subValues: [
            { label: 'Grams (g)', val: `${g.toFixed(1)} g` },
            { label: 'Pounds (lbs)', val: `${lbs.toFixed(2)} lbs` },
          ]
        };
      } else {
        // accel
        if (isNaN(f) || isNaN(m) || m === 0) return null;
        const val = f / m;
        const ft_s2 = val * 3.28084;
        const g_force = val / 9.80665;
        return {
          primary: `${val.toFixed(2).replace(/\.00$/, '')} m/s²`,
          val,
          unit: 'Meters per second² (m/s²)',
          equation: `a = F / m = ${f} N ÷ ${m} kg = ${val.toFixed(2)} m/s²`,
          subValues: [
            { label: 'Feet per second²', val: `${ft_s2.toFixed(2)} ft/s²` },
            { label: 'Earth G-Force', val: `${g_force.toFixed(2)} g` },
          ]
        };
      }
    } else if (mode === 'work') {
      const f = parseFloat(workForce);
      const d = parseFloat(distance);
      if (isNaN(f) || isNaN(d)) return null;
      const w = f * d;
      return {
        primary: `${w.toFixed(2).replace(/\.00$/, '')} J`,
        val: w,
        unit: 'Joules (J)',
        equation: `W = F × d = ${f} N × ${d} m = ${w.toFixed(2)} J`,
        subValues: [
          { label: 'Kilojoules (kJ)', val: `${(w / 1000).toFixed(3)} kJ` },
          { label: 'Calories (cal)', val: `${(w / 4.184).toFixed(2)} cal` },
          { label: 'Foot-pounds (ft·lb)', val: `${(w * 0.737562).toFixed(2)} ft·lb` },
        ]
      };
    } else if (mode === 'power') {
      const w = parseFloat(powerWork);
      const t = parseFloat(time);
      if (isNaN(w) || isNaN(t) || t === 0) return null;
      const p = w / t;
      return {
        primary: `${p.toFixed(2).replace(/\.00$/, '')} W`,
        val: p,
        unit: 'Watts (W)',
        equation: `P = W / t = ${w} J ÷ ${t} s = ${p.toFixed(2)} W`,
        subValues: [
          { label: 'Kilowatts (kW)', val: `${(p / 1000).toFixed(3)} kW` },
          { label: 'Horsepower (hp)', val: `${(p / 745.7).toFixed(2)} hp` },
          { label: 'Joules per second', val: `${p.toFixed(1)} J/s` },
        ]
      };
    } else {
      // pressure
      const f = parseFloat(pressForce);
      const a = parseFloat(area);
      if (isNaN(f) || isNaN(a) || a === 0) return null;
      const pr = f / a;
      return {
        primary: `${pr.toFixed(2).replace(/\.00$/, '')} Pa`,
        val: pr,
        unit: 'Pascals (N/m²)',
        equation: `P = F / A = ${f} N ÷ ${a} m² = ${pr.toFixed(2)} Pa`,
        subValues: [
          { label: 'Kilopascals (kPa)', val: `${(pr / 1000).toFixed(2)} kPa` },
          { label: 'Bar', val: `${(pr / 100000).toFixed(4)} bar` },
          { label: 'PSI (lbs/in²)', val: `${(pr * 0.000145038).toFixed(3)} psi` },
        ]
      };
    }
  }, [mode, fmaTarget, mass, accel, force, workForce, distance, powerWork, time, pressForce, area]);

  const inputCls = "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white font-mono text-lg font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm";
  const labelCls = "text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1";

  return (
    <ModernCalcLayout
      hideH1={false}
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Physics Force Calculator' }]}
      title="Physics Force & Mechanics Calculator"
      description="Calculate Force (F = ma), Mass, Acceleration, Work (W = Fd), Power (P = W/t), and Pressure (P = F/A) with SI unit conversions."
      icon={Activity}
      inputs={
        <div className="space-y-6">
          {/* Main Mode Tabs */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Mechanics Target Formula
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'fma', label: 'Force (F = ma)', desc: 'Newton 2nd Law' },
                { key: 'work', label: 'Work (W = Fd)', desc: 'Force × Distance' },
                { key: 'power', label: 'Power (P = W/t)', desc: 'Work ÷ Time' },
                { key: 'pressure', label: 'Pressure (P = F/A)', desc: 'Force ÷ Area' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key as MechanicsMode)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    mode === tab.key
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">{tab.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{tab.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mode 1: F = ma */}
          {mode === 'fma' && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 mb-1.5 block">What do you want to solve for?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'force', label: 'Force (F)' },
                    { key: 'mass', label: 'Mass (m)' },
                    { key: 'accel', label: 'Acceleration (a)' },
                  ].map(t => (
                    <button
                      key={t.key}
                      onClick={() => setFmaTarget(t.key as FmaTarget)}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                        fmaTarget === t.key
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {fmaTarget === 'force' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelCls}>Mass (m)</label>
                    <div className="relative">
                      <input type="number" step="any" value={mass} onChange={e => setMass(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">kg</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Acceleration (a)</label>
                    <div className="relative">
                      <input type="number" step="any" value={accel} onChange={e => setAccel(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">m/s²</span>
                    </div>
                  </div>
                </div>
              )}

              {fmaTarget === 'mass' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelCls}>Force (F)</label>
                    <div className="relative">
                      <input type="number" step="any" value={force} onChange={e => setForce(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">N</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Acceleration (a)</label>
                    <div className="relative">
                      <input type="number" step="any" value={accel} onChange={e => setAccel(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">m/s²</span>
                    </div>
                  </div>
                </div>
              )}

              {fmaTarget === 'accel' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelCls}>Force (F)</label>
                    <div className="relative">
                      <input type="number" step="any" value={force} onChange={e => setForce(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">N</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls}>Mass (m)</label>
                    <div className="relative">
                      <input type="number" step="any" value={mass} onChange={e => setMass(e.target.value)} className={inputCls} />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">kg</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Gravity Presets */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Quick Acceleration Presets</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Earth Gravity (9.81 m/s²)', val: '9.80665' },
                    { label: 'Moon Gravity (1.62 m/s²)', val: '1.62' },
                    { label: 'Mars Gravity (3.72 m/s²)', val: '3.72' },
                    { label: 'Car 0-100 in 6s (4.63 m/s²)', val: '4.63' },
                  ].map(p => (
                    <button
                      key={p.label}
                      onClick={() => setGravityPreset(p.val)}
                      className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-300 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Work (W = F * d) */}
          {mode === 'work' && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Force Applied (F)</label>
                  <div className="relative">
                    <input type="number" step="any" value={workForce} onChange={e => setWorkForce(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">N</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Displacement (d)</label>
                  <div className="relative">
                    <input type="number" step="any" value={distance} onChange={e => setDistance(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">m</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Assumes force is aligned with the direction of movement (cos θ = 1).</p>
            </div>
          )}

          {/* Mode 3: Power (P = W / t) */}
          {mode === 'power' && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Work Done / Energy (W)</label>
                  <div className="relative">
                    <input type="number" step="any" value={powerWork} onChange={e => setPowerWork(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">J</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Time Elapsed (t)</label>
                  <div className="relative">
                    <input type="number" step="any" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">seconds</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Power is the rate of energy transfer. 1 Watt = 1 Joule per second.</p>
            </div>
          )}

          {/* Mode 4: Pressure (P = F / A) */}
          {mode === 'pressure' && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={labelCls}>Normal Force (F)</label>
                  <div className="relative">
                    <input type="number" step="any" value={pressForce} onChange={e => setPressForce(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">N</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Contact Surface Area (A)</label>
                  <div className="relative">
                    <input type="number" step="any" value={area} onChange={e => setArea(e.target.value)} className={inputCls} />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">m²</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">1 m² = 10,000 cm². Smaller contact area produces vastly higher pressure.</p>
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-5">
          {/* Hero Result Card */}
          <div className="p-7 bg-blue-600 text-white rounded-2xl shadow-md text-center relative overflow-hidden">
            <Gauge className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
            <div className="relative z-10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Calculated {mode === 'fma' ? fmaTarget.toUpperCase() : mode.toUpperCase()}
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight">
                {result ? result.primary : '—'}
              </div>
              <div className="text-xs text-blue-100 font-medium">
                {result ? result.unit : 'Enter positive numbers'}
              </div>
            </div>
          </div>

          {/* Equation Breakdown */}
          {result && (
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Formula Substitution</span>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm font-bold text-slate-800 break-all">
                {result.equation}
              </div>
            </div>
          )}

          {/* Alternative Units */}
          {result && result.subValues.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Equivalent Units</span>
              </div>
              <div className="divide-y divide-slate-100">
                {result.subValues.map(sub => (
                  <div key={sub.label} className="p-3.5 flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-medium">{sub.label}</span>
                    <span className="font-mono font-bold text-slate-900">{sub.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      sidebar={{
        title: "Related Physics Tools",
        links: [
          { label: 'Kinetic Energy (E = ½mv²)', href: '/calculator/physics-energy/' },
          { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
          { label: 'Unit Converter', href: '/calculator/unit-converter/' },
          { label: 'Simple Calculator', href: '/calculator/simple-calculator/' },
          { label: 'Probability Calculator', href: '/calculator/probability/' },
        ],
      }}
      howToUse={{
        steps: [
          "Select the equation: Newton's Second Law (F = ma), Work (W = Fd), Power (P = W/t), or Pressure (P = F/A).",
          "For Force, choose whether to calculate Force, Mass, or Acceleration.",
          "Enter your values in standard SI units (kilograms, meters, seconds, Newtons).",
          "Use the Quick Acceleration Presets to test Earth, Moon, or Mars gravity.",
          "Review the primary result alongside automatic unit conversions (kN, lbf, dynes, horsepower, PSI)."
        ]
      }}
    />
  );
}
