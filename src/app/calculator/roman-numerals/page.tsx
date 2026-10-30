import { calcMeta } from '@/lib/calcMeta';
import RomanCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Roman Numerals Converter | Number ↔ Roman Numeral Translator – NepaCalc",
  description: "Convert any number (1–3,999) to Roman numerals or translate Roman numerals back to numbers. Instant two-way conversion with subtraction rule applied automatically.",
  slug: 'roman-numerals',
  keywords: ["roman numerals converter", "number to roman numeral", "roman numeral to number", "roman numeral date", "roman numeral chart", "IV IX XL CM translation"],
});

const ROMAN_FAQS = [
  {
    question: "What are the 7 basic Roman numeral symbols?",
    answer: "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Every number from 1 to 3,999 can be written by combining these seven symbols using the addition and subtraction rules."
  },
  {
    question: "How does the subtraction rule work in Roman numerals?",
    answer: "When a smaller numeral appears directly before a larger one, it is subtracted. The six valid subtractive pairs are: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900). No other combinations follow this rule — for example, IC for 99 is not valid; the correct form is XCIX."
  },
  {
    question: "What is 2025 in Roman numerals?",
    answer: "2025 in Roman numerals is MMXXV. This breaks down as MM (2000) + XX (20) + V (5) = 2025."
  },
  {
    question: "What is the largest number that standard Roman numerals can represent?",
    answer: "Standard Roman numerals go up to 3,999 written as MMMCMXCIX. The system cannot represent zero or negative numbers, and numbers above 3,999 traditionally required a vinculum (overbar) to multiply by 1,000."
  },
  {
    question: "Where are Roman numerals still used today in Nepal?",
    answer: "Roman numerals appear on analog clock faces, chapter headings in academic and legal documents (Chapter I, II, III), school grade levels (Class I through XII), carved dates on monuments and building cornerstones, and sub-section numbering in Acts of Parliament."
  },
  {
    question: "Can the same symbol appear more than three times in a row?",
    answer: "No. The standard rules do not allow the same numeral to be repeated more than three times consecutively. Instead of IIII for 4, you write IV. This rule applies to I, X, C, and M. V, L, and D can never be repeated."
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Roman Numerals Converter"
        description="Convert any number (1–3,999) to Roman numerals or translate Roman numerals back to numbers. Instant two-way conversion."
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

      {/* Content section — server rendered */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Symbol chart */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
            Roman Numeral Symbol Chart
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Can Repeat?</th>
                  <th className="px-4 py-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                {[
                  { sym: 'I', val: 1, repeat: 'Up to 3×', ex: 'III = 3' },
                  { sym: 'V', val: 5, repeat: 'Never', ex: 'V = 5 only' },
                  { sym: 'X', val: 10, repeat: 'Up to 3×', ex: 'XXX = 30' },
                  { sym: 'L', val: 50, repeat: 'Never', ex: 'L = 50 only' },
                  { sym: 'C', val: 100, repeat: 'Up to 3×', ex: 'CCC = 300' },
                  { sym: 'D', val: 500, repeat: 'Never', ex: 'D = 500 only' },
                  { sym: 'M', val: 1000, repeat: 'Up to 3×', ex: 'MMM = 3000' },
                ].map(({ sym, val, repeat, ex }) => (
                  <tr key={sym} className="hover:bg-[#fcfcfc]">
                    <td className="px-4 py-3 font-mono font-black text-lg text-blue-700">{sym}</td>
                    <td className="px-4 py-3 font-bold">{val.toLocaleString('en-IN')}</td>
                    <td className={`px-4 py-3 font-bold ${repeat === 'Never' ? 'text-red-600' : 'text-emerald-600'}`}>{repeat}</td>
                    <td className="px-4 py-3 font-mono text-[#5F6368]">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Subtraction pairs */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
            The 6 Valid Subtractive Pairs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { pair: 'IV', value: 4, rule: '5 − 1' },
              { pair: 'IX', value: 9, rule: '10 − 1' },
              { pair: 'XL', value: 40, rule: '50 − 10' },
              { pair: 'XC', value: 90, rule: '100 − 10' },
              { pair: 'CD', value: 400, rule: '500 − 100' },
              { pair: 'CM', value: 900, rule: '1000 − 100' },
            ].map(({ pair, value, rule }) => (
              <div key={pair} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center">
                <div className="text-2xl font-black font-mono text-blue-700 mb-1">{pair}</div>
                <div className="text-lg font-black text-[#202124]">= {value}</div>
                <div className="text-xs text-[#5F6368] mt-1">({rule})</div>
              </div>
            ))}
          </div>
        </section>

        {/* Common numbers quick reference */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
            Common Numbers in Roman Numerals
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Roman</th>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Roman</th>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Roman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3">1</td><td className="px-4 py-3 font-mono font-bold">I</td><td className="px-4 py-3">10</td><td className="px-4 py-3 font-mono font-bold">X</td><td className="px-4 py-3">100</td><td className="px-4 py-3 font-mono font-bold">C</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3">4</td><td className="px-4 py-3 font-mono font-bold">IV</td><td className="px-4 py-3">40</td><td className="px-4 py-3 font-mono font-bold">XL</td><td className="px-4 py-3">400</td><td className="px-4 py-3 font-mono font-bold">CD</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3">5</td><td className="px-4 py-3 font-mono font-bold">V</td><td className="px-4 py-3">50</td><td className="px-4 py-3 font-mono font-bold">L</td><td className="px-4 py-3">500</td><td className="px-4 py-3 font-mono font-bold">D</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3">9</td><td className="px-4 py-3 font-mono font-bold">IX</td><td className="px-4 py-3">90</td><td className="px-4 py-3 font-mono font-bold">XC</td><td className="px-4 py-3">900</td><td className="px-4 py-3 font-mono font-bold">CM</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3">2025</td><td className="px-4 py-3 font-mono font-bold">MMXXV</td><td className="px-4 py-3">2024</td><td className="px-4 py-3 font-mono font-bold">MMXXIV</td><td className="px-4 py-3">3999</td><td className="px-4 py-3 font-mono font-bold">MMMCMXCIX</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
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
