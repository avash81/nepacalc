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
    <ModernCalcLayout
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
          <div className="p-8 bg-blue-600 rounded-2xl text-center shadow-lg text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Type className="w-48 h-48 -mr-10 -mt-10" />
            </div>
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Conversion Result</div>
              <div className="text-5xl sm:text-7xl font-black tracking-tighter font-mono mb-4 break-all">{roman || '—'}</div>
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
              {[[1,'I'],[4,'IV'],[9,'IX'],[40,'XL'],[90,'XC'],[400,'CD'],[900,'CM'],[2024,'MMXXIV']].map(([n,r]) => (
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
          { label: 'Number to Words', href: '/calculator/number-to-words' },
          { label: 'Word Counter', href: '/calculator/word-counter' },
          { label: 'Simple Calculator', href: '/calculator/simple-calculator' },
        ],
      }}
      howToUse={{
        steps: [
          "To convert a modern number, type any integer between 1 and 3999 into the 'Arabic Number' field.",
          "To convert Roman numerals back to numbers, type valid Roman letters (I, V, X, L, C, D, M) into the 'Roman Numeral' field.",
          "The calculator is bidirectional—updating one field will instantly update the other."
        ]
      }}
      faqs={[
        {
          question: "Why is the limit 3,999?",
          answer: "In standard Roman numerals, the largest individual symbol is M (1000). To represent 4,000 and above, standard notation requires a line drawn over the symbol (vinculum) to indicate multiplication by 1,000, which cannot be easily typed on a standard keyboard."
        },
        {
          question: "How do subtractive notation rules work?",
          answer: "Normally, symbols are placed from largest to smallest and added together (e.g., VI = 5 + 1 = 6). However, to avoid four identical characters in a row, subtractive notation is used. A smaller symbol placed before a larger one is subtracted (e.g., IV = 5 - 1 = 4)."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding Roman Numerals</h2>
          <p>Roman numerals originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages. Numbers in this system are represented by combinations of letters from the Latin alphabet. Today, they are still widely used for clock faces, book chapters, movie sequels, and formal naming.</p>
          
          <h3>The Core Symbols</h3>
          <p>The Roman numeral system is based on seven core symbols:</p>
          <ul>
            <li><strong>I</strong> = 1</li>
            <li><strong>V</strong> = 5</li>
            <li><strong>X</strong> = 10</li>
            <li><strong>L</strong> = 50</li>
            <li><strong>C</strong> = 100</li>
            <li><strong>D</strong> = 500</li>
            <li><strong>M</strong> = 1000</li>
          </ul>
          
          <h3>Rules of Roman Numerals</h3>
          <p>Reading and writing Roman numerals requires following a few basic rules:</p>
          <ol>
            <li><strong>Addition:</strong> When a larger symbol is followed by a smaller symbol, you add their values. For example, <strong>XII</strong> is 10 + 1 + 1 = 12.</li>
            <li><strong>Subtraction:</strong> To prevent placing four of the same character in a row (like IIII for 4), a smaller symbol placed before a larger one means subtraction. Therefore, <strong>IV</strong> is 5 - 1 = 4, and <strong>IX</strong> is 10 - 1 = 9.</li>
            <li><strong>Repetition Limit:</strong> You cannot put more than three identical symbols together. For instance, 30 is <strong>XXX</strong>, but 40 is <strong>XL</strong>, not XXXX.</li>
            <li><strong>V, L, and D are never subtracted.</strong> Only powers of 10 (I, X, C) can be used as subtractive modifiers.</li>
          </ol>
          
          <h3>Modern Usage</h3>
          <p>While Arabic numerals (0-9) replaced Roman numerals in mathematics and everyday use due to the lack of a zero concept and the difficulty of calculating with letters, Roman numerals still carry a sense of formality and tradition. You will often see them used to denote centuries (the XX Century), Super Bowls (Super Bowl LVIII), and monarchs (King Charles III).</p>
        </div>
      }
    />
  );
}
