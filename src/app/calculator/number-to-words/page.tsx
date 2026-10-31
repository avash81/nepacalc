import { calcMeta } from '@/lib/calcMeta';
import NumberToWordsCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Number to Words Converter | Lakh & Crore Cheque Writer – NepaCalc",
  description: "Convert numbers and currency to words in English and Nepali (Devanagari). Features South Asian (Lakh/Crore) and International (Million/Billion) formatting with Paisa support for bank cheques.",
  slug: 'number-to-words',
  keywords: ["number to words converter nepal", "lakh crore in words", "cheque amount in words nepal", "convert digits to words nepali", "rupees in words cheque writer", "south asian numbering system"],
});

const WORDS_FAQS = [
  {
    question: "How should I write an amount in words on a bank cheque in Nepal?",
    answer: "On a Nepali bank cheque, write the amount in words starting with 'Rupees' (or 'रुपैयाँ') and always terminate with 'Only' (or 'मात्र'). For example: 'Rupees One Lakh Twenty-Five Thousand and Fifty Paisa Only'. This legal convention prevents unauthorized text insertion after your entry."
  },
  {
    question: "What is the difference between Lakh/Crore and Million/Billion?",
    answer: "The South Asian system groups digits in sets of two after the first thousand (1,00,000 = 1 Lakh; 1,00,00,000 = 1 Crore). The International system groups digits in continuous sets of three (100,000 = One Hundred Thousand; 1,000,000 = 1 Million; 1,000,000,000 = 1 Billion). 10 Lakhs equals 1 Million, and 1 Crore equals 10 Million."
  },
  {
    question: "How are fractional amounts and decimals (Paisa) written?",
    answer: "Decimals represent Paisa in Nepal and India (1 Rupee = 100 Paisa). An amount like 1,500.75 is written as 'Rupees One Thousand Five Hundred and Seventy-Five Paisa Only' or alternatively 'and 75/100 Only'. Our converter provides exact Paisa wording automatically."
  },
  {
    question: "How many Crores make 1 Arab and 1 Billion?",
    answer: "100 Crores equal 1 Arab (1,00,00,00,000 in South Asian notation), which is identical to 1 Billion in the International system (1,000,000,000). While official government budgets often cite 'Arab', businesses commonly use '100 Crore'."
  },
  {
    question: "Why does the Nepali cheque system write numbers as 12,34,567 instead of 1,234,567?",
    answer: "The placement of commas reflects the linguistic structure of South Asian languages. The rightmost three digits represent hundreds and thousands, after which every two digits designate higher powers: Thousands (हजार), Lakhs (लाख), and Crores (करोड)."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Number to Words Converter"
        description="Convert numbers to words in English and Nepali Devanagari using South Asian Lakh/Crore and International systems for cheques and legal documents."
        url="https://nepacalc.com/calculator/number-to-words/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Converters', item: 'https://nepacalc.com/converters/' },
          { name: 'Number to Words', item: 'https://nepacalc.com/calculator/number-to-words/' }
        ]}
        faqs={WORDS_FAQS}
      />

      <NumberToWordsCalculator />

      {/* Practical Guide & Numbering Systems Comparison */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Cheque Writing Standards in Nepal */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Best Practices for Writing Cheques in Nepal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#5F6368]">
            <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-1.5">
              <div className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                Always End with 'Only'
              </div>
              <p className="leading-relaxed">
                Add 'Only' or 'मात्र' immediately following the last word. This prevents anyone from adding unauthorized suffixes (e.g., adding 'and fifty thousand' to an existing cheque).
              </p>
            </div>
            <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-1.5">
              <div className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                Start at the Extreme Left
              </div>
              <p className="leading-relaxed">
                Begin writing right after the printed "Rupees / रुपैयाँ" line without leaving blank gaps where extra words could be inserted fraudulently.
              </p>
            </div>
            <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-1.5">
              <div className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
                Prefix & Suffix Figures
              </div>
              <p className="leading-relaxed">
                In the numerical box, prefix with 'Rs.' and conclude with '/-' (e.g. <code>Rs. 50,000/-</code>) to block additional digits from being appended.
              </p>
            </div>
          </div>
        </section>

        {/* Equivalence Reference Table */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-600 pl-3 mb-6">
            South Asian vs. International Number Scale
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Numeric Value</th>
                  <th className="px-4 py-3">South Asian Scale</th>
                  <th className="px-4 py-3">International Scale</th>
                  <th className="px-4 py-3">Nepali Script</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">1,000</td><td className="px-4 py-3">One Thousand</td><td className="px-4 py-3">One Thousand</td><td className="px-4 py-3 font-bold text-slate-800">एक हजार</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">10,000</td><td className="px-4 py-3">Ten Thousand</td><td className="px-4 py-3">Ten Thousand</td><td className="px-4 py-3 font-bold text-slate-800">दश हजार</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">1,00,000</td><td className="px-4 py-3 font-bold text-blue-700">One Lakh</td><td className="px-4 py-3">One Hundred Thousand</td><td className="px-4 py-3 font-bold text-slate-800">एक लाख</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">10,00,000</td><td className="px-4 py-3 font-bold text-blue-700">Ten Lakhs</td><td className="px-4 py-3 font-bold text-emerald-700">One Million</td><td className="px-4 py-3 font-bold text-slate-800">दश लाख</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">1,00,00,000</td><td className="px-4 py-3 font-bold text-blue-700">One Crore</td><td className="px-4 py-3 font-bold text-emerald-700">Ten Million</td><td className="px-4 py-3 font-bold text-slate-800">एक करोड</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">10,00,00,000</td><td className="px-4 py-3 font-bold text-blue-700">Ten Crores</td><td className="px-4 py-3 font-bold text-emerald-700">One Hundred Million</td><td className="px-4 py-3 font-bold text-slate-800">दश करोड</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold">1,00,00,00,000</td><td className="px-4 py-3 font-bold text-blue-700">One Arab (100 Crores)</td><td className="px-4 py-3 font-bold text-purple-700">One Billion</td><td className="px-4 py-3 font-bold text-slate-800">एक अरब</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {WORDS_FAQS.map((faq, i) => (
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
