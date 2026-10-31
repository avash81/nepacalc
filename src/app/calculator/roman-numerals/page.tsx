import { calcMeta } from '@/lib/calcMeta';
import RomanCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Roman Numerals Converter | Number & Date to Roman Numerals – NepaCalc",
  description: "Convert numbers (1–3,999) and calendar dates to Roman numerals, or translate Roman numerals back to numbers. Includes subtractive notation rules and step-by-step expansion.",
  slug: 'roman-numerals',
  keywords: ["roman numerals converter", "number to roman numeral", "date to roman numerals", "roman numeral tattoo date", "roman numeral chart", "IV IX XL CM translation", "roman numeral translator"],
});

const ROMAN_FAQS = [
  {
    question: "What are the 7 basic Roman numeral symbols?",
    answer: "The Roman system uses 7 Latin letter symbols: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, and M = 1,000. Every number from 1 to 3,999 is formed by combining these seven symbols using additive and subtractive rules."
  },
  {
    question: "How do subtractive notation rules work in Roman numerals?",
    answer: "When a smaller value symbol appears directly before a larger one, it is subtracted rather than added. There are exactly six standard subtractive pairs: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). Non-adjacent subtractive forms (like IL for 49 or IC for 99) are invalid; 49 is written as XLIX and 99 as XCIX."
  },
  {
    question: "How do I format a date in Roman numerals for a tattoo, watch, or wedding ring?",
    answer: "Dates are typically converted into Day, Month, and Year components separated by a middle dot (·), period (.), or slash (/). For example, October 24, 2024 is written as XXIV · X · MMXXIV (Day · Month · Year) or X · XXIV · MMXXIV (Month · Day · Year). Use our 'Date to Roman' tab above to preview and copy your exact date."
  },
  {
    question: "Why is 3,999 the standard maximum number in Roman numerals?",
    answer: "The largest standard letter is M (1,000). Classical Roman notation allows a maximum of three identical symbols in sequence (MMM = 3,000). To write 4,000, you would need MMMM, which violates the repetition rule. Extended systems historically used an overline (vinculum) to represent multiplication by 1,000, but 3,999 (MMMCMXCIX) remains the upper boundary for standard text."
  },
  {
    question: "Why isn't there a Roman numeral for zero?",
    answer: "Roman numerals developed as a physical tallying and counting system for commerce, trade, and inventory, not as a positional place-value mathematical system. The concept of zero as both a placeholder and an independent numerical value was developed later by Indian mathematicians and introduced to Europe centuries afterward."
  },
  {
    question: "What year is MMXXVI in Roman numerals?",
    answer: "MM = 2,000, XX = 20, and VI = 6. Summing these additive components gives 2000 + 20 + 6 = 2026."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Roman Numerals Converter"
        description="Convert numbers (1–3,999) and dates to Roman numerals with additive step-by-step expansions and subtractive pair validation."
        url="https://nepacalc.com/calculator/roman-numerals/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Roman Numerals Converter', item: 'https://nepacalc.com/calculator/roman-numerals/' }
        ]}
        faqs={ROMAN_FAQS}
      />

      <RomanCalculator />

      {/* Reference & Educational Content */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Symbol chart */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            The 7 Fundamental Roman Numeral Symbols
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Can Repeat?</th>
                  <th className="px-4 py-3">Repetition Rule</th>
                  <th className="px-4 py-3">Sample Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                {[
                  { sym: 'I', val: 1, repeat: 'Up to 3×', rule: 'Only before V and X', ex: 'III = 3, IV = 4' },
                  { sym: 'V', val: 5, repeat: 'Never', rule: 'Never repeated or subtracted', ex: 'V = 5 only' },
                  { sym: 'X', val: 10, repeat: 'Up to 3×', rule: 'Only before L and C', ex: 'XXX = 30, XL = 40' },
                  { sym: 'L', val: 50, repeat: 'Never', rule: 'Never repeated or subtracted', ex: 'L = 50 only' },
                  { sym: 'C', val: 100, repeat: 'Up to 3×', rule: 'Only before D and M', ex: 'CCC = 300, CD = 400' },
                  { sym: 'D', val: 500, repeat: 'Never', rule: 'Never repeated or subtracted', ex: 'D = 500 only' },
                  { sym: 'M', val: 1000, repeat: 'Up to 3×', rule: 'Maximum 3 in standard form', ex: 'MMM = 3000' },
                ].map(({ sym, val, repeat, rule, ex }) => (
                  <tr key={sym} className="hover:bg-[#fcfcfc]">
                    <td className="px-4 py-3 font-mono font-black text-lg text-blue-700">{sym}</td>
                    <td className="px-4 py-3 font-bold">{val.toLocaleString('en-US')}</td>
                    <td className={`px-4 py-3 font-bold ${repeat === 'Never' ? 'text-rose-600' : 'text-emerald-600'}`}>{repeat}</td>
                    <td className="px-4 py-3 text-[#5F6368]">{rule}</td>
                    <td className="px-4 py-3 font-mono text-slate-800 font-semibold">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Subtraction pairs */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-600 pl-3 mb-6">
            The 6 Valid Subtractive Combinations
          </h3>
          <p className="text-xs text-[#5F6368] leading-relaxed mb-4">
            In standard Roman notation, smaller symbols are subtracted only when placed immediately before the next two larger powers of 10 or 5. All other combinations (such as IL for 49 or XD for 490) are invalid.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { pair: 'IV', value: 4, rule: '5 − 1' },
              { pair: 'IX', value: 9, rule: '10 − 1' },
              { pair: 'XL', value: 40, rule: '50 − 10' },
              { pair: 'XC', value: 90, rule: '100 − 10' },
              { pair: 'CD', value: 400, rule: '500 − 100' },
              { pair: 'CM', value: 900, rule: '1000 − 100' },
            ].map(({ pair, value, rule }) => (
              <div key={pair} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center space-y-1">
                <div className="text-2xl font-black font-mono text-blue-700">{pair}</div>
                <div className="text-lg font-black text-[#202124]">= {value}</div>
                <div className="text-xs text-[#5F6368]">({rule})</div>
              </div>
            ))}
          </div>
        </section>

        {/* Date to Roman Numeral Guide */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-600 pl-3 mb-4">
            Writing Dates in Roman Numerals (Tattoos & Engravings)
          </h3>
          <div className="space-y-3 text-xs text-[#5F6368] leading-relaxed">
            <p>
              When engraving rings, watches, birth certificates, or designing anniversary tattoos, calendar dates are commonly represented in Day · Month · Year format using middle dots (·) or slashes (/) as visual dividers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-800 mb-1">Wedding / Anniversary Date:</div>
                <div className="font-mono text-blue-700 font-bold text-sm">October 24, 2024</div>
                <div className="font-mono text-slate-900 font-black text-base mt-1">XXIV · X · MMXXIV</div>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-800 mb-1">Graduation / Milestone Year:</div>
                <div className="font-mono text-blue-700 font-bold text-sm">June 15, 2026</div>
                <div className="font-mono text-slate-900 font-black text-base mt-1">XV · VI · MMXXVI</div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {ROMAN_FAQS.map((faq, i) => (
              <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
