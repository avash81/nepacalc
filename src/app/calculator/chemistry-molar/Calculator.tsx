'use client';
import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { FlaskConical, Atom, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const ELEMENTS: Record<string, number> = {
  'H': 1.008, 'He': 4.002, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011, 'N': 14.007, 'O': 15.999,
  'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.065,
  'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996,
  'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38, 'Ga': 69.723, 'Ge': 72.630,
  'As': 74.922, 'Se': 78.96, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
  'Nb': 92.906, 'Mo': 95.96, 'Tc': 98, 'Ru': 101.07, 'Rh': 102.906, 'Pd': 106.42, 'Ag': 107.868, 'Cd': 112.411,
  'In': 114.818, 'Sn': 118.710, 'Sb': 121.760, 'Te': 127.60, 'I': 126.904, 'Xe': 131.293, 'Cs': 132.905, 'Ba': 137.327,
  'La': 138.905, 'Ce': 140.116, 'Pr': 140.908, 'Nd': 144.242, 'Pm': 145, 'Sm': 150.36, 'Eu': 151.964, 'Gd': 157.25,
  'Tb': 158.925, 'Dy': 162.500, 'Ho': 164.930, 'Er': 167.259, 'Tm': 168.934, 'Yb': 173.054, 'Lu': 174.967, 'Hf': 178.49,
  'Ta': 180.948, 'W': 183.84, 'Re': 186.207, 'Os': 190.23, 'Ir': 192.217, 'Pt': 195.084, 'Au': 196.967, 'Hg': 200.592,
  'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.980, 'Po': 209, 'At': 210, 'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.038,
  'Pa': 231.036, 'U': 238.029, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247, 'Cf': 251, 'Es': 252, 'Fm': 257,
  'Md': 258, 'No': 259, 'Lr': 262, 'Rf': 267, 'Db': 270, 'Sg': 271, 'Bh': 270, 'Hs': 277, 'Mt': 276, 'Ds': 281, 'Rg': 280,
  'Cn': 285, 'Nh': 284, 'Fl': 289, 'Mc': 288, 'Lv': 293, 'Ts': 294, 'Og': 294
};

const COMPOUNDS = [
  { label: 'Water', formula: 'H2O' },
  { label: 'Salt', formula: 'NaCl' },
  { label: 'Glucose', formula: 'C6H12O6' },
  { label: 'Ammonium Sulfate', formula: '(NH4)2SO4' },
  { label: 'Sulfuric Acid', formula: 'H2SO4' },
  { label: 'Caffeine', formula: 'C8H10N4O2' },
];

export default function MolarMassCalc() {
  const [state, setState] = useSyncState('molar_mass_v2', { formula: 'H2O' });
  const { formula } = state;

  const res = useMemo(() => {
    try {
      let i = 0;
      const f = formula.replace(/\s/g, '');

      function parseGroup(): Record<string, number> {
        const counts: Record<string, number> = {};
        while (i < f.length && f[i] !== ')') {
          if (f[i] === '(') {
            i++;
            const subCounts = parseGroup();
            if (f[i] === ')') i++;
            let multiplier = '';
            while (i < f.length && /\d/.test(f[i])) {
              multiplier += f[i];
              i++;
            }
            const mul = multiplier === '' ? 1 : parseInt(multiplier);
            for (const el in subCounts) {
              counts[el] = (counts[el] || 0) + subCounts[el] * mul;
            }
          } else {
            let el = f[i];
            i++;
            if (i < f.length && /[a-z]/.test(f[i])) {
              el += f[i];
              i++;
            }
            let countStr = '';
            while (i < f.length && /\d/.test(f[i])) {
              countStr += f[i];
              i++;
            }
            const count = countStr === '' ? 1 : parseInt(countStr);
            counts[el] = (counts[el] || 0) + count;
          }
        }
        return counts;
      }

      const totalCounts = parseGroup();
      let total = 0;
      const breakdown: { el: string; mass: number; n: number }[] = [];
      let unknownElement = null;

      for (const el in totalCounts) {
        const mass = ELEMENTS[el];
        if (mass) {
          total += mass * totalCounts[el];
          breakdown.push({ el, mass, n: totalCounts[el] });
        } else {
          unknownElement = el;
        }
      }

      if (unknownElement) return { total: 'Error', breakdown: [], error: `Unknown Element: ${unknownElement}` };
      if (breakdown.length === 0) return { total: '0.000', breakdown: [] };

      return { total: total.toFixed(3), breakdown: breakdown.sort((a,b) => b.n * b.mass - a.n * a.mass) };
    } catch (e) {
      return { total: 'Error', breakdown: [], error: 'Invalid Formula' };
    }
  }, [formula]);

  return (
    <CalculatorLayout
      title="Chemistry Molar Mass"
      description="Professional molecular weight calculator supporting complex formulas with nested parentheses and hydration."
      badge="Academic"
      badgeColor="indigo"
      category={{ label: 'Science', href: '/calculator/category/science' }}
      leftPanel={
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Chemical Formula</label>
            <div className="relative">
              <input 
                type="text" 
                value={formula} 
                onChange={e => setState({ formula: e.target.value })} 
                placeholder="e.g. (NH4)2SO4"
                className="w-full h-20 px-8 border-2 border-slate-100 rounded-3xl bg-slate-50 font-mono text-4xl font-black focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-inner" 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <FlaskConical className="w-8 h-8 text-slate-200" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">Support Case Sensitive symbols e.g., NaCl, (NH4)2SO4</p>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Quick Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COMPOUNDS.map(c => (
                <button 
                  key={c.formula} 
                  onClick={() => setState({ formula: c.formula })}
                  className={`p-4 rounded-2xl border transition-all text-left ${formula === c.formula ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-300 group'}`}
                >
                  <div className={`text-[9px] font-black uppercase mb-1 ${formula === c.formula ? 'text-indigo-200' : 'text-slate-400'}`}>{c.label}</div>
                  <div className={`text-xs font-black font-mono transition-colors ${formula === c.formula ? 'text-white' : 'text-indigo-600 group-hover:text-indigo-700'}`}>{c.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {(res as any).error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 items-center text-rose-600 animate-in fade-in zoom-in">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wide">{(res as any).error}</span>
            </div>
          )}
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-indigo-50 shadow-sm overflow-hidden text-center transition-all hover:shadow-xl hover:translate-y-[-4px]">
            <div className="p-10 border-b border-indigo-50">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-3">Molecular Mass</div>
               <div className="text-6xl font-black text-slate-900 tracking-tighter font-mono flex items-center justify-center gap-2">
                 {res.total} <span className="text-xl text-slate-400 font-bold">g/mol</span>
               </div>
            </div>
            
            <div className="p-8 bg-indigo-50/30 flex justify-center gap-8">
               <div className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-indigo-500" />
                  <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">{res.breakdown.length} Elements</span>
               </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 mb-2">Detailed Composition</h4>
            {res.breakdown.map((item) => (
              <div key={item.el} className="group p-4 bg-white border border-slate-100 rounded-2xl flex justify-between items-center transition-all hover:border-indigo-200 hover:shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center font-black text-indigo-600 text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">{item.el}</div>
                   <div className="text-left">
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Atomic Mass</div>
                      <div className="text-xs font-bold text-slate-700">{item.mass.toFixed(3)}</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Total in Formula</div>
                   <div className="text-sm font-black font-mono text-indigo-600">{item.n} × {(item.mass * item.n).toFixed(3)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
              <div className="flex gap-4 items-start">
                  <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    This calculator uses the latest <strong className="text-white">IUPAC Standard Atomic Weights</strong>. Molar mass is essential for stoichiometry and solution preparation in analytical chemistry.
                  </p>
              </div>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'Does it support parentheses?', answer: 'Yes! You can enter complex formulas like (NH4)2SO4 or hydrated crystals like CuSO4.5H2O (entered as CuSO4(H2O)5).' },
          { question: 'Is it case sensitive?', answer: 'Absolutely. Element symbols must match the periodic table. Na represents Sodium, whereas NA or na will trigger an error.' },
          { question: 'How do I enter water of hydration?', answer: 'For CuSO4 · 5H2O, enter it as CuSO4(H2O)5. The parentheses correctly treat the molecule groups.' },
        ]} />
      }
    />
  );
}
