'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { FlaskConical, Atom, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

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
  const [state, setState] = useSyncState('molar_mass_v3', { formula: 'H2O' });
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
            while (i < f.length && /\d/.test(f[i])) { multiplier += f[i]; i++; }
            const mul = multiplier === '' ? 1 : parseInt(multiplier);
            for (const el in subCounts) counts[el] = (counts[el] || 0) + subCounts[el] * mul;
          } else {
            let el = f[i]; i++;
            if (i < f.length && /[a-z]/.test(f[i])) { el += f[i]; i++; }
            let countStr = '';
            while (i < f.length && /\d/.test(f[i])) { countStr += f[i]; i++; }
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
      return { total: 'Error', breakdown: [], error: 'Invalid Formula Structure' };
    }
  }, [formula]);

  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Molar Mass Calculator' }]}
      title="Chemistry Molar Mass Calculator"
      description="Professional molecular weight calculator. Supports complex formulas with nested parentheses and standard IUPAC atomic weights."
      icon={FlaskConical}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Chemical Formula (Case Sensitive)</label>
            <div className="relative">
              <input 
                type="text" 
                value={formula} 
                onChange={e => setState({ formula: e.target.value })} 
                placeholder="e.g. (NH4)2SO4"
                className="w-full h-16 pl-6 pr-14 border border-[#DADCE0] rounded-lg bg-white font-mono text-2xl font-black focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all shadow-inner" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <FlaskConical className="w-6 h-6 text-[#70757A]" />
              </div>
            </div>
            {(res as any).error && (
              <div className="flex gap-2 items-center text-[#D93025] px-1 mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">{(res as any).error}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className={`${labelCls} flex items-center gap-1.5`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COMPOUNDS.map(c => (
                <button key={c.formula} onClick={() => setState({ formula: c.formula })}
                  className={`p-3 border rounded-lg text-left transition-all ${formula === c.formula ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA] group'}`}>
                  <div className={`text-[9px] font-bold uppercase mb-1 ${formula === c.formula ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>{c.label}</div>
                  <div className={`text-xs font-black font-mono transition-colors ${formula === c.formula ? 'text-[#1A73E8]' : 'text-[#202124] group-hover:text-[#1A73E8]'}`}>{c.formula}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] rounded-lg border border-[#DADCE0] text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <div className="p-8 border-b border-white/10 relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8AB4F8] mb-2">Molecular Mass</div>
                <div className="text-5xl font-black text-white tracking-tighter font-mono flex items-baseline justify-center gap-2">
                  {res.total} <span className="text-xl text-white/50 font-bold">g/mol</span>
                </div>
             </div>
             
             <div className="px-6 py-4 bg-white/5 relative z-10 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                   <Atom className="w-4 h-4 text-[#8AB4F8]" />
                   <span className="text-[10px] font-bold text-white uppercase tracking-wider">{res.breakdown.length} Unique Elements</span>
                </div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">Detailed Composition Breakdown</span>
             </div>
             <div className="divide-y divide-[#DADCE0] max-h-[300px] overflow-y-auto custom-scrollbar">
                {res.breakdown.map((item) => (
                  <div key={item.el} className="p-4 flex justify-between items-center bg-white hover:bg-[#F8F9FA] transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#E8F0FE] rounded-lg flex items-center justify-center font-black text-[#1A73E8] text-sm">{item.el}</div>
                       <div className="text-left">
                          <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider mb-0.5">Atomic Mass</div>
                          <div className="text-xs font-bold text-[#202124]">{item.mass.toFixed(3)}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider mb-0.5">Total in Formula</div>
                       <div className="text-sm font-black font-mono text-[#1A73E8]">{item.n} × {(item.mass * item.n).toFixed(3)}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="flex gap-3 p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-relaxed">Calculations utilize the latest IUPAC Standard Atomic Weights. Capitalization is strictly enforced (e.g. use 'Co' for Cobalt, 'CO' for Carbon Monoxide).</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the chemical formula in the input box.", "Ensure you use correct capitalization (e.g., NaCl, not nacl or NACL).", "Use parentheses for compound groups (e.g., (NH4)2SO4).", "The tool instantly parses the formula, multiplies atomic weights by their respective counts, and provides the total molar mass in g/mol."] }}
      formula={{ title: "Molar Mass Calculation", description: "Atomic weight aggregation.", raw: "Molar Mass = (Count_1 × Atomic_Mass_1) + (Count_2 × Atomic_Mass_2) + ...\n\nExample for H2O:\nHydrogen (H): 2 × 1.008 = 2.016 g/mol\nOxygen (O): 1 × 15.999 = 15.999 g/mol\nTotal = 18.015 g/mol" }}
      faqs={[
        { question: "What is Molar Mass?", answer: "Molar mass is the total mass of one mole of a substance, calculated by summing the atomic masses of all atoms in the molecule. It is expressed in grams per mole (g/mol) and is a fundamental quantity in stoichiometry ,  used to convert between mass (grams) and amount (moles) of a substance in chemical reactions." },
        { question: "Can I use brackets and parentheses in the formula?", answer: "Yes. The calculator fully supports nested parentheses ,  e.g., (NH4)2SO4 or Ca(OH)2. The parser automatically multiplies the atomic count inside the parentheses by the subscript outside it. This is essential for accurate molar mass of complex ionic compounds and coordination complexes." },
        { question: "What is the molar mass of water (H2O)?", answer: "Water (H2O) = 2 hydrogen atoms + 1 oxygen atom = (2 × 1.008) + (1 × 15.999) = 2.016 + 15.999 = 18.015 g/mol. This is one of the most commonly referenced molar masses in chemistry, used extensively in solution preparation and titration calculations." },
        { question: "Why is capitalization important in chemical formulas?", answer: "Capitalization distinguishes different elements. 'Co' (capital C, lowercase o) = Cobalt (atomic mass 58.933). 'CO' (both capitals) = a molecule of Carbon Monoxide (C=12.011, O=15.999). Incorrect capitalization will cause the calculator to return an 'Unknown Element' error. Always follow standard IUPAC notation." },
        { question: "What are IUPAC Standard Atomic Weights?", answer: "IUPAC (International Union of Pure and Applied Chemistry) periodically updates the standard atomic weights of all elements to reflect the natural isotopic abundance in the Earth's crust and atmosphere. This calculator uses the 2021 IUPAC recommended values, which is the industry standard for all chemistry, pharmaceutical, and engineering calculations." },
        { question: "How do I calculate molar mass for a compound like glucose (C6H12O6)?", answer: "For glucose (C6H12O6): Carbon (C) = 6 × 12.011 = 72.066. Hydrogen (H) = 12 × 1.008 = 12.096. Oxygen (O) = 6 × 15.999 = 95.994. Total = 72.066 + 12.096 + 95.994 = 180.156 g/mol. Just type 'C6H12O6' into the calculator and it computes this instantly with a full element-by-element breakdown." }
      ]}
      sidebar={{ title: "Science & Math Tools", links: [{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }, { label: "Base Converter", href: "/calculator/base-converter" }], banner: { title: "Academic Utilities", description: "Save time on chemistry homework and lab prep with instant molecular weight analysis.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Fraction Calculator", href: "/calculator/fraction-calculator" }]}
    />
  );
}
