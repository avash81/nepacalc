'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Type, Copy, Check, Calendar, ArrowRightLeft, Sparkles, BookOpen } from 'lucide-react';

const MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];
const RMAP: Record<string, number> = {
  M: 1000, CM: 900, D: 500, CD: 400,
  C: 100, XC: 90, L: 50, XL: 40,
  X: 10, IX: 9, V: 5, IV: 4, I: 1
};

function toRomanWithSteps(num: number): { roman: string; steps: { value: number; symbol: string }[] } {
  if (isNaN(num) || num <= 0 || num > 3999) return { roman: '', steps: [] };
  let n = num;
  let roman = '';
  const steps: { value: number; symbol: string }[] = [];
  for (const [val, sym] of MAP) {
    while (n >= val) {
      roman += sym;
      steps.push({ value: val, symbol: sym });
      n -= val;
    }
  }
  return { roman, steps };
}

function fromRomanWithSteps(str: string): { number: number; steps: { value: number; symbol: string }[] } {
  const s = str.trim().toUpperCase();
  let r = 0;
  let i = 0;
  const steps: { value: number; symbol: string }[] = [];
  while (i < s.length) {
    const two = s[i] + (s[i + 1] || '');
    if (RMAP[two]) {
      r += RMAP[two];
      steps.push({ value: RMAP[two], symbol: two });
      i += 2;
    } else if (RMAP[s[i]]) {
      r += RMAP[s[i]];
      steps.push({ value: RMAP[s[i]], symbol: s[i] });
      i += 1;
    } else {
      return { number: 0, steps: [] };
    }
  }
  return { number: r, steps };
}

const REF = [
  { r: 'I', n: 1 }, { r: 'V', n: 5 }, { r: 'X', n: 10 },
  { r: 'L', n: 50 }, { r: 'C', n: 100 }, { r: 'D', n: 500 }, { r: 'M', n: 1000 }
];

export default function RomanNumeralsCalculator() {
  const [activeTab, setActiveTab] = useState<'number' | 'date'>('number');

  // Tab 1: Number state
  const [numberInput, setNumberInput] = useState('1994');
  const [romanInput, setRomanInput] = useState('MCMXCIV');
  const [copied, setCopied] = useState(false);

  // Tab 2: Date state
  const [day, setDay] = useState('24');
  const [month, setMonth] = useState('10');
  const [year, setYear] = useState('2024');
  const [dateFormat, setDateFormat] = useState<'DMY' | 'MDY' | 'YMD'>('DMY');
  const [delimiter, setDelimiter] = useState<'.' | '-' | '/' | ' · '>(' · ');

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNumberChange = (v: string) => {
    setNumberInput(v);
    const n = parseInt(v, 10);
    if (!isNaN(n) && n > 0 && n < 4000) {
      setRomanInput(toRomanWithSteps(n).roman);
    } else {
      setRomanInput('');
    }
  };

  const handleRomanChange = (v: string) => {
    const u = v.toUpperCase().replace(/[^IVXLCDM]/g, '');
    setRomanInput(u);
    const parsed = fromRomanWithSteps(u);
    if (parsed.number > 0 && parsed.number < 4000) {
      setNumberInput(String(parsed.number));
    } else {
      setNumberInput('');
    }
  };

  // Step-by-step breakdown derivation
  const numberBreakdown = useMemo(() => {
    const n = parseInt(numberInput, 10);
    if (!isNaN(n) && n > 0 && n < 4000) {
      return toRomanWithSteps(n);
    }
    return { roman: '', steps: [] };
  }, [numberInput]);

  // Date conversion calculation
  const dateResult = useMemo(() => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    const validD = !isNaN(d) && d >= 1 && d <= 31;
    const validM = !isNaN(m) && m >= 1 && m <= 12;
    const validY = !isNaN(y) && y >= 1 && y <= 3999;

    if (!validD || !validM || !validY) {
      return { romanDate: '', isValid: false };
    }

    const rD = toRomanWithSteps(d).roman;
    const rM = toRomanWithSteps(m).roman;
    const rY = toRomanWithSteps(y).roman;

    let romanDate = '';
    if (dateFormat === 'DMY') {
      romanDate = `${rD}${delimiter}${rM}${delimiter}${rY}`;
    } else if (dateFormat === 'MDY') {
      romanDate = `${rM}${delimiter}${rD}${delimiter}${rY}`;
    } else {
      romanDate = `${rY}${delimiter}${rM}${delimiter}${rD}`;
    }

    return { romanDate, rD, rM, rY, d, m, y, isValid: true };
  }, [day, month, year, dateFormat, delimiter]);

  return (
    <ModernCalcLayout
      hideH1={false}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Roman Numerals' }]}
      title="Roman Numerals Converter"
      description="Convert modern Arabic numbers to Roman numerals, convert dates to Roman numerals for tattoos or engravings, and view step-by-step mathematical additive expansions."
      icon={Type}
      inputs={
        <div className="space-y-6">
          {/* Mode Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('number')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'number'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              Number ↔ Roman
            </button>
            <button
              onClick={() => setActiveTab('date')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'date'
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Date to Roman (Tattoo/Gift)
            </button>
          </div>

          {activeTab === 'number' ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">Arabic Number (1–3999)</label>
                  <span className="text-xs text-slate-500 font-medium">Standard integer</span>
                </div>
                <input
                  type="number"
                  value={numberInput}
                  onChange={e => handleNumberChange(e.target.value)}
                  min={1}
                  max={3999}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
                  placeholder="e.g. 1994"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">↕ Bidirectional Sync</span>
                <div className="h-px flex-1 bg-slate-300" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-800">Roman Numeral</label>
                  <span className="text-xs text-slate-500 font-medium">Letters: I, V, X, L, C, D, M</span>
                </div>
                <input
                  type="text"
                  value={romanInput}
                  onChange={e => handleRomanChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black uppercase focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm placeholder:text-slate-300"
                  placeholder="e.g. MCMXCIV"
                />
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Enter Calendar Date</h3>
                <p className="text-xs text-slate-600">Great for anniversary tattoos, wedding plaques, watches, and graduations.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Day (1–31)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-mono text-center font-bold text-lg focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Month (1–12)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-mono text-center font-bold text-lg focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Year (1–3999)</label>
                  <input
                    type="number"
                    min={1}
                    max={3999}
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-mono text-center font-bold text-lg focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Order Format</label>
                  <select
                    value={dateFormat}
                    onChange={e => setDateFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:border-blue-500 outline-none"
                  >
                    <option value="DMY">Day - Month - Year (European/Nepali)</option>
                    <option value="MDY">Month - Day - Year (US)</option>
                    <option value="YMD">Year - Month - Day (ISO)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Separator</label>
                  <select
                    value={delimiter}
                    onChange={e => setDelimiter(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:border-blue-500 outline-none"
                  >
                    <option value=" · ">Middle Dot ( · ) (Tattoo Standard)</option>
                    <option value=".">Period (.)</option>
                    <option value="-">Hyphen (-)</option>
                    <option value="/">Slash (/)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Quick Roman Reference Key */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Fundamental Roman Numerals</h3>
            </div>
            <div className="grid grid-cols-7 divide-x divide-slate-100">
              {REF.map(({ r, n }) => (
                <button
                  key={r}
                  onClick={() => {
                    setActiveTab('number');
                    handleNumberChange(String(n));
                  }}
                  className="py-3 text-center hover:bg-blue-50 transition-colors group"
                >
                  <div className="text-base font-black text-slate-800 group-hover:text-blue-600 mb-0.5">{r}</div>
                  <div className="text-[11px] font-bold text-slate-500">{n}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className="p-8 bg-blue-600 rounded-2xl text-center shadow-md text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Type className="w-48 h-48 -mr-10 -mt-10 text-white" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
                {activeTab === 'number' ? 'Converted Roman Numeral' : 'Roman Numeral Date'}
              </div>

              {activeTab === 'number' ? (
                <>
                  <div className="text-4xl sm:text-6xl font-black tracking-tight font-mono break-all min-h-[4rem] flex items-center justify-center">
                    {romanInput || '—'}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="inline-block px-4 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 text-lg font-bold">
                      {numberInput ? `= ${numberInput}` : 'Enter a valid number'}
                    </div>
                    {romanInput && (
                      <button
                        onClick={() => handleCopy(romanInput)}
                        className="px-3.5 py-1.5 bg-white text-blue-700 rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-blue-50 transition-all shadow-sm"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl sm:text-5xl font-black tracking-tight font-mono break-all min-h-[4rem] flex items-center justify-center">
                    {dateResult.isValid ? dateResult.romanDate : 'Invalid Date'}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="inline-block px-4 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 text-sm font-bold">
                      {dateResult.isValid ? `${day}/${month}/${year}` : 'Check Day & Month'}
                    </div>
                    {dateResult.isValid && (
                      <button
                        onClick={() => handleCopy(dateResult.romanDate)}
                        className="px-3.5 py-1.5 bg-white text-blue-700 rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-blue-50 transition-all shadow-sm"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Step-by-Step Additive Breakdown */}
          {activeTab === 'number' && numberBreakdown.steps.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Additive Step-by-Step Breakdown</h3>
              </div>
              <p className="text-xs text-slate-600">
                Roman numerals are composed by decomposing the Arabic integer into descending powers:
              </p>
              <div className="flex flex-wrap gap-2 items-center text-sm font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">{numberInput} =</span>
                {numberBreakdown.steps.map((st, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-xs">
                      {st.symbol} ({st.value})
                    </span>
                    {idx < numberBreakdown.steps.length - 1 && <span className="text-slate-400">+</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Common Real-World Examples</h3>
              <span className="text-[11px] text-slate-400 font-medium">Click to load</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                [1, 'I', 'First / Single'],
                [4, 'IV', 'Subtractive 5 - 1'],
                [9, 'IX', 'Subtractive 10 - 1'],
                [40, 'XL', 'Subtractive 50 - 10'],
                [90, 'XC', 'Subtractive 100 - 10'],
                [400, 'CD', 'Subtractive 500 - 100'],
                [900, 'CM', 'Subtractive 1000 - 100'],
                [1994, 'MCMXCIV', 'Pop culture classic'],
                [2024, 'MMXXIV', 'Year 2024'],
                [2026, 'MMXXVI', 'Year 2026']
              ].map(([n, r, desc]) => (
                <button
                  key={n}
                  onClick={() => {
                    setActiveTab('number');
                    handleNumberChange(String(n));
                  }}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-700 w-12">{n}</span>
                    <span className="text-xs text-slate-500 font-medium">{desc}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600 font-mono bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {r}
                  </span>
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
          { label: 'Probability Calculator', href: '/calculator/probability/' },
          { label: 'Marks Needed Calculator', href: '/calculator/marks-needed/' },
          { label: 'Concrete Mix Calculator', href: '/calculator/concrete-mix/' }
        ],
      }}
      howToUse={{
        steps: [
          "Choose 'Number ↔ Roman' to convert any integer between 1 and 3,999 to its standard Roman numeral form, or type Roman letters into the lower field for instant reverse calculation.",
          "Choose 'Date to Roman' to generate formatted dates for tattoos, wedding rings, gifts, diplomas, or anniversary watches.",
          "Use the 1-click 'Copy' button to copy the resulting Roman string directly to your clipboard.",
          "Check the Additive Step-by-Step breakdown to see exactly which Roman letters correspond to thousands, hundreds, tens, and units."
        ]
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Ancient Rome's Number System: Additive & Subtractive Logic</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>Roman numerals originated in ancient Rome, derived from tally marks carved into wood or stone. The system uses 7 Latin letter symbols (I, V, X, L, C, D, M) to represent values using two mathematical rules: <strong className="text-[#202124]">additive notation</strong> (placing larger values before smaller ones to sum them) and <strong className="text-[#202124]">subtractive notation</strong> (placing a smaller value before a larger one to indicate subtraction). Our converter implements both rules with full bidirectional accuracy.</p>
              <p>Despite the dominance of Hindu-Arabic numerals (0–9) in modern mathematics, Roman numerals remain a living convention in film and television production copyright dates, clock and watch dials, book prefaces, sports competitions, anniversary gifts, and tattoo designs.</p>
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
          question: "How do I write a date in Roman numerals for a tattoo or engraving?",
          answer: "Switch to our 'Date to Roman' tab above. Select your day, month, and year. For example, October 24, 2024 is commonly written as XXIV · X · MMXXIV (Day · Month · Year) or X · XXIV · MMXXIV (Month · Day · Year). Middle dots (·) or slashes (/) are the preferred separators."
        },
        {
          question: "Why is the maximum number 3,999 in standard Roman notation?",
          answer: "The largest symbol is M (1,000). To write 4,000, you'd need MMMM, but the traditional rule prohibits more than 3 identical symbols consecutively. The extended system uses a vinculum (overline) to denote ×1,000, but standard keyboards cannot produce it, making 3,999 (MMMCMXCIX) the standard practical maximum."
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
          answer: "The Roman numeral system was a tally-based counting system, not a positional place-value numeral system. The concept of zero as a placeholder was developed by Indian mathematicians and later transmitted globally, long after Roman numerals were established."
        },
        {
          question: "What does MCMXCIX mean?",
          answer: "M = 1000, CM = 900, XC = 90, IX = 9. Total: 1000 + 900 + 90 + 9 = 1999. This is how the year 1999 is written in Roman numerals, as seen on many late-20th century buildings and film copyrights."
        }
      ]}
    />
  );
}
