'use client';
import { useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Type } from 'lucide-react';

const MAP: [number, string][] = [
  [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
  [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
  [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
];
const RMAP: Record<string,number> = { M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1 };

function toRoman(n: number): string {
  let r = ''; for (const [v,s] of MAP) { while (n >= v) { r += s; n -= v; } } return r;
}
function fromRoman(s: string): number {
  let r = 0, i = 0; s = s.toUpperCase();
  while (i < s.length) {
    const d = RMAP[s[i]+s[i+1]] ? (r += RMAP[s[i]+s[i+1]], 2) : (r += RMAP[s[i]] || 0, 1);
    i += d;
  } return r;
}

const REF = [{ r:'I',n:1 },{ r:'V',n:5 },{ r:'X',n:10 },{ r:'L',n:50 },{ r:'C',n:100 },{ r:'D',n:500 },{ r:'M',n:1000 }];

export default function RomanNumeralsCalculator() {
  const [number, setNumber] = useState('10');
  const [roman, setRoman]   = useState('X');

  const handleNum = (v: string) => {
    setNumber(v);
    const n = parseInt(v);
    setRoman(!isNaN(n) && n > 0 && n < 4000 ? toRoman(n) : '');
  };
  const handleRoman = (v: string) => {
    const u = v.toUpperCase(); setRoman(u);
    const n = fromRoman(u); if (n > 0) setNumber(String(n)); else setNumber('');
  };

  return (
    <ModernCalcLayout hideH1={false}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Roman Numerals' }]}
      title="Roman Numerals Converter"
      description="Convert modern Arabic numbers to Roman numerals and vice versa. Supports bidirectional conversion for numbers up to 3,999."
      icon={Type}
      inputs={
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Arabic Number (1–3999)</label>
              <input type="number" value={number} onChange={e => handleNum(e.target.value)} min={1} max={3999}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm" />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">↕ Bidirectional</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Roman Numeral</label>
              <input type="text" value={roman} onChange={e => handleRoman(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black uppercase focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm placeholder:text-slate-300" 
                placeholder="e.g. XIV" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Roman Symbol Reference</h3>
            </div>
            <div className="grid grid-cols-4 divide-x divide-y divide-slate-100">
              {REF.map(({ r, n }) => (
                <button key={r} onClick={() => handleNum(String(n))}
                  className="py-4 text-center hover:bg-blue-50 transition-colors group">
                  <div className="text-lg font-black text-slate-800 group-hover:text-blue-600 mb-1">{r}</div>
                  <div className="text-xs font-bold text-slate-500">{n}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1a73e8] rounded-2xl text-center shadow-sm text-[#202124] relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Type className="w-48 h-48 -mr-10 -mt-10" />
            </div>
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Conversion Result</div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter font-mono mb-4 break-all">{roman || ', '}</div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                <div className="text-xl font-bold">{number ? `= ${number}` : 'Invalid Input'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Quick Examples</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[[1,'I'],[4,'IV'],[9,'IX'],[40,'XL'],[90,'XC'],[400,'CD'],[900,'CM'],[2026,'MMXXVI']].map(([n,r]) => (
                <button key={n} onClick={() => handleNum(String(n))}
                  className="w-full px-5 py-3 flex justify-between hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-black text-slate-700">{n}</span>
                  <span className="text-sm font-bold text-blue-600 font-mono bg-blue-50 px-2 rounded">{r}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Text & Math Tools",
        links: [
          { label: 'Number to Words', href: '/calculator/number-to-words/' },
          { label: 'Word Counter', href: '/calculator/word-counter/' },
          { label: 'Simple Calculator', href: '/calculator/simple-calculator/' },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
        ],
      }}
      howToUse={{
        steps: [
          "To convert a modern number, type any integer between 1 and 3999 into the 'Arabic Number' field.",
          "To convert Roman numerals back to numbers, type valid Roman letters (I, V, X, L, C, D, M) into the 'Roman Numeral' field.",
          "The calculator is bidirectional, updating one field will instantly update the other."
        ]
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Ancient Rome's Number System: Additive & Subtractive Logic</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>Roman numerals originated in ancient Rome, derived from tally marks carved into wood or stone. The system uses 7 Latin letter symbols (I, V, X, L, C, D, M) to represent values using two mathematical rules: <strong className="text-[#202124]">additive notation</strong> (placing larger values before smaller ones to sum them) and <strong className="text-[#202124]">subtractive notation</strong> (placing a smaller value before a larger one to indicate subtraction). Our converter implements both rules with full bidirectional accuracy.</p>
              <p>Despite the dominance of Hindu-Arabic numerals (0–9) in all modern mathematics, Roman numerals remain a living convention in film/TV production credits, clock faces, book prefaces, sports events, and monarchical/papal succession naming.</p>
            </div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The 6 Subtractive Notation Rules</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">IV = 4 (not IIII):</strong> I before V subtracts 1 from 5.</li>
              <li><strong className="text-[#1A73E8]">IX = 9 (not VIIII):</strong> I before X subtracts 1 from 10.</li>
              <li><strong className="text-[#188038]">XL = 40 (not XXXX):</strong> X before L subtracts 10 from 50.</li>
              <li><strong className="text-[#188038]">XC = 90 (not LXXXX):</strong> X before C subtracts 10 from 100.</li>
              <li><strong className="text-[#D93025]">CD = 400 (not CCCC):</strong> C before D subtracts 100 from 500.</li>
              <li><strong className="text-[#D93025]">CM = 900 (not DCCCC):</strong> C before M subtracts 100 from 1000.</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "Why is the maximum number 3,999 in standard Roman notation?",
          answer: "The largest symbol is M (1,000). To write 4,000, you'd need MMMM, but the rule prohibits more than 3 identical symbols consecutively. The extended system uses a vinculum (overline) to denote ×1,000, but this is not typeable on standard keyboards. Thus, 3,999 (MMMCMXCIX) is the practical maximum."
        },
        {
          question: "How do subtractive notation rules work?",
          answer: "Only powers of 10 (I, X, C) can be used subtractively, and only before the next two higher values. I can precede V and X. X can precede L and C. C can precede D and M. Symbols V, L, and D are never used subtractively."
        },
        {
          question: "What year is MMXXVI in Roman numerals?",
          answer: "MM = 2000, XX = 20, VI = 6. Therefore MMXXVI = 2026. Our calculator confirms this instantly in the bidirectional input."
        },
        {
          question: "Why don't Roman numerals have a zero?",
          answer: "The Roman numeral system evolved from tally marks and was a counting system, not a positional numeral system. The concept of zero as a placeholder was developed independently by Indian mathematicians and introduced to Europe via Arab scholars in the Middle Ages, long after Roman numerals were established."
        },
        {
          question: "Where are Roman numerals still used today?",
          answer: "Common modern uses include: clock faces (I-XII), film and TV production years in credits (e.g., © MMXXVI), Super Bowl numbering (Super Bowl LVIII), royal succession (King Charles III), papal names (Pope Francis I), book preface page numbering, and movie/music sequel titling."
        },
        {
          question: "What does MCMXCIX mean?",
          answer: "M = 1000, CM = 900, XC = 90, IX = 9. Total: 1000 + 900 + 90 + 9 = 1999. This is how the year 1999 is written in Roman numerals, as seen on many late-20th century buildings and films."
        }
      ]}
    />
  );
}


