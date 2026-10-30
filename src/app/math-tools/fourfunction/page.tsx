import { ScientificApp } from '@/components/ecosystem/ScientificApp';
import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Basic 4-Function Calculator Online | Free Arithmetic Tool – NepaCalc",
  description: "Free online basic calculator for addition, subtraction, multiplication, and division. Supports decimals, percentage, memory functions, and keyboard input. BODMAS compliant.",
  slug: 'math-tools/fourfunction',
  keywords: ["basic calculator online", "4 function calculator", "arithmetic calculator nepal", "simple calculator", "bodmas calculator", "free online calculator nepal"],
});

const FOURFUNCTION_FAQS = [
  {
    question: "Does this calculator follow BODMAS order of operations?",
    answer: "Yes. Unlike a physical left-to-right till calculator, NepaCalc's basic calculator correctly applies BODMAS — Brackets, Orders, Division, Multiplication, Addition, Subtraction. So 2 + 3 × 4 gives 14, not 20."
  },
  {
    question: "Can I use my keyboard to type calculations?",
    answer: "Yes. On desktop or laptop, type numbers and operators (+, -, *, /) directly from your keyboard or numpad. Press Enter to get the result — much faster than clicking buttons for long calculations."
  },
  {
    question: "How do the M+, M−, MR, and MC memory buttons work?",
    answer: "M+ adds the current display value to memory. M− subtracts it from memory. MR recalls whatever is stored back to the display. MC clears the memory. Most useful when you have multiple sub-totals to add into a running grand total."
  },
  {
    question: "Does this calculator handle paisa (decimal Rupees)?",
    answer: "Yes — full decimal support. Enter values like 245.50 or 1499.99 directly. Useful for grocery bills, electricity meter charges, or daily expense tracking in Nepali Rupees."
  },
  {
    question: "How does the percentage (%) button work?",
    answer: "To find 13% VAT on Rs. 5,000 — type 5000 × 13 % and the calculator shows Rs. 650. Press + to add it directly and get the VAT-inclusive total of Rs. 5,650."
  },
];

export default function FourFunctionPage() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Basic 4-Function Calculator"
        description="Free online basic calculator for addition, subtraction, multiplication, and division. Supports decimals, percentage, memory functions, and keyboard input."
        url="https://nepacalc.com/math-tools/fourfunction/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: '4-Function Calculator', item: 'https://nepacalc.com/math-tools/fourfunction/' }
        ]}
        faqs={FOURFUNCTION_FAQS}
      />
      <div className="flex flex-col bg-slate-50 overflow-y-auto">
        <div className="flex-shrink-0" style={{ minHeight: '80vh' }}>
          <h1 className="sr-only">Basic 4-Function Calculator – Add, Subtract, Multiply, Divide</h1>
          <ScientificApp mode="basic" />
        </div>

        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          {/* What it does */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#202124] mb-4">Basic 4-Function Calculator</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
              This calculator handles the four core arithmetic operations — <strong>addition</strong>, <strong>subtraction</strong>,{' '}
              <strong>multiplication</strong>, and <strong>division</strong> — along with percentage, decimal support, and memory
              functions (M+, M−, MR, MC). It follows BODMAS, so chained expressions give mathematically correct results.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Type directly from your keyboard on desktop (numpad supported). On mobile, the large button layout works cleanly
              with one hand.
            </p>
          </section>

          {/* Operation quick reference */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-teal-500 pl-3 mb-6">
              Operation Quick Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
                <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3">Operation</th>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Keyboard Key</th>
                    <th className="px-4 py-3">Example</th>
                    <th className="px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                  <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Addition</td><td className="px-4 py-3 font-mono text-teal-600 font-bold">+</td><td className="px-4 py-3 font-mono">+</td><td className="px-4 py-3 font-mono">1,250 + 780</td><td className="px-4 py-3 font-bold">2,030</td></tr>
                  <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Subtraction</td><td className="px-4 py-3 font-mono text-teal-600 font-bold">−</td><td className="px-4 py-3 font-mono">-</td><td className="px-4 py-3 font-mono">5,000 − 1,349</td><td className="px-4 py-3 font-bold">3,651</td></tr>
                  <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Multiplication</td><td className="px-4 py-3 font-mono text-teal-600 font-bold">×</td><td className="px-4 py-3 font-mono">*</td><td className="px-4 py-3 font-mono">12 × 450</td><td className="px-4 py-3 font-bold">5,400</td></tr>
                  <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Division</td><td className="px-4 py-3 font-mono text-teal-600 font-bold">÷</td><td className="px-4 py-3 font-mono">/</td><td className="px-4 py-3 font-mono">8,400 ÷ 4</td><td className="px-4 py-3 font-bold">2,100</td></tr>
                  <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Percentage</td><td className="px-4 py-3 font-mono text-teal-600 font-bold">%</td><td className="px-4 py-3 font-mono">%</td><td className="px-4 py-3 font-mono">5,000 × 13 %</td><td className="px-4 py-3 font-bold">650</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Memory functions */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
              Memory Functions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'M+', desc: 'Adds the current display value to memory.' },
                { key: 'M−', desc: 'Subtracts the current display value from memory.' },
                { key: 'MR', desc: 'Recalls the stored memory value to the display.' },
                { key: 'MC', desc: 'Clears memory entirely. Resets to zero.' },
              ].map(({ key, desc }) => (
                <div key={key} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center">
                  <div className="text-lg font-black font-mono text-[#1A73E8] mb-2">{key}</div>
                  <p className="text-xs text-[#5F6368] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#5F6368] mt-4 leading-relaxed bg-[#F8F9FA] rounded-md p-3 border border-[#DADCE0]">
              <strong>Example:</strong> Calculate Rs. 1,200 (sub-total A) → press M+. Calculate Rs. 3,450 (sub-total B) → press M+.
              Press MR to display Rs. 4,650 grand total.
            </p>
          </section>

          {/* Everyday use cases */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
              Common Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Grocery & Kirana Bills',
                  body: 'Add item prices, apply 13% VAT using the % button, then subtract a discount coupon. Divide the total among multiple people paying together.',
                },
                {
                  title: 'Monthly Household Budget',
                  body: 'Add rent + electricity + water + internet + groceries. Subtract from monthly income to see what remains. No spreadsheet required.',
                },
                {
                  title: 'Primary School Homework',
                  body: 'Verify Class 1–5 homework answers. Check multiplication table results and division remainders instantly to catch errors before submission.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                  <h4 className="font-bold text-[#202124] text-sm mb-2">{title}</h4>
                  <p className="text-xs text-[#5F6368] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {FOURFUNCTION_FAQS.map((faq, i) => (
                <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                  <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
