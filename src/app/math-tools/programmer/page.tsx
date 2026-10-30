import { ProgrammerApp } from '@/components/ecosystem/ProgrammerApp';
import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Programmer Calculator | Hex, Binary, Octal, Decimal & Bitwise – NepaCalc",
  description: "64-bit programmer calculator with base conversion (Hex, Bin, Oct, Dec), bitwise AND/OR/XOR/NOT operations, and bit-shift tools. Essential for software developers and CS students in Nepal.",
  slug: 'math-tools/programmer',
  keywords: ["programmer calculator", "hex to decimal converter", "binary calculator", "bitwise operations calculator", "base converter online", "hex bin oct dec nepal"],
});

const PROGRAMMER_FAQS = [
  {
    question: "How do I convert a decimal number to hexadecimal?",
    answer: "Type the decimal number in the DEC field. The HEX, BIN, and OCT equivalents update instantly. For example, 255 (decimal) = FF (hex) = 11111111 (binary) = 377 (octal)."
  },
  {
    question: "What does the AND bitwise operation do?",
    answer: "AND compares each bit position in two numbers. The result bit is 1 only if both input bits are 1. Example: 0b1010 AND 0b1100 = 0b1000 (decimal 8). Used in networking for subnet mask operations."
  },
  {
    question: "What is OR used for in programming?",
    answer: "OR sets a result bit to 1 if either input bit is 1. Example: 0b1010 OR 0b1100 = 0b1110 (decimal 14). Commonly used to set specific bits in a flags variable without affecting others."
  },
  {
    question: "What does XOR do and where is it used?",
    answer: "XOR (Exclusive OR) outputs 1 when the bits differ. 0b1010 XOR 0b1100 = 0b0110 (decimal 6). XOR is used in encryption, checksums, and the classic in-place variable swap algorithm."
  },
  {
    question: "What is a left shift (<<) operation?",
    answer: "Left shift moves all bits to the left by N positions, filling with zeros on the right. This is equivalent to multiplying by 2^N. For example, 5 << 2 = 20 (same as 5 × 4)."
  },
  {
    question: "Why does this calculator work in 64-bit mode?",
    answer: "64-bit mode matches modern CPU architectures (AMD64, ARM64) and covers the full range of integers used in most programming languages — from 0 to 2^64−1 for unsigned, or −2^63 to 2^63−1 for signed integers."
  },
];

export default function ProgrammerPage() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Programmer Calculator"
        description="64-bit programmer calculator with base conversion (Hex, Bin, Oct, Dec), bitwise AND/OR/XOR/NOT operations, and bit-shift tools."
        url="https://nepacalc.com/math-tools/programmer/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Programmer Calculator', item: 'https://nepacalc.com/math-tools/programmer/' }
        ]}
        faqs={PROGRAMMER_FAQS}
      />
      <div className="w-full h-full flex flex-col bg-white overflow-hidden">
        <h1 className="sr-only">Programmer Calculator – 64-Bit Base Converter & Bitwise Operations</h1>
        <ProgrammerApp />
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Intro */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#202124] mb-4">Programmer Calculator – Base Converter & Bitwise Logic</h2>
          <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
            This tool performs two core tasks used in software development and computer science: <strong>base conversion</strong> between
            Decimal, Hexadecimal, Binary, and Octal, and <strong>bitwise logic operations</strong> (AND, OR, XOR, NOT, left shift, right shift)
            in 64-bit precision. Values update live across all number bases as you type.
          </p>
          <p className="text-sm text-[#5F6368] leading-relaxed">
            Useful for working with memory addresses, bitmask flags, network subnets, color codes, assembly instructions,
            and any low-level programming task where you need to see a number in multiple bases simultaneously.
          </p>
        </section>

        {/* Number systems reference */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
            Number Base Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Base</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Digits Used</th>
                  <th className="px-4 py-3">Prefix</th>
                  <th className="px-4 py-3">Example (255)</th>
                  <th className="px-4 py-3">Common Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold text-blue-600">10</td><td className="px-4 py-3 font-medium">Decimal</td><td className="px-4 py-3 font-mono">0–9</td><td className="px-4 py-3 font-mono text-[#5F6368]">—</td><td className="px-4 py-3 font-mono font-bold">255</td><td className="px-4 py-3 text-[#5F6368]">Human arithmetic, prices</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold text-emerald-600">16</td><td className="px-4 py-3 font-medium">Hexadecimal</td><td className="px-4 py-3 font-mono">0–9, A–F</td><td className="px-4 py-3 font-mono text-[#5F6368]">0x</td><td className="px-4 py-3 font-mono font-bold">0xFF</td><td className="px-4 py-3 text-[#5F6368]">Memory addresses, colors (#RRGGBB)</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold text-red-600">2</td><td className="px-4 py-3 font-medium">Binary</td><td className="px-4 py-3 font-mono">0, 1</td><td className="px-4 py-3 font-mono text-[#5F6368]">0b</td><td className="px-4 py-3 font-mono font-bold">0b11111111</td><td className="px-4 py-3 text-[#5F6368]">Bitmask flags, CPU instructions</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-mono font-bold text-orange-600">8</td><td className="px-4 py-3 font-medium">Octal</td><td className="px-4 py-3 font-mono">0–7</td><td className="px-4 py-3 font-mono text-[#5F6368]">0o</td><td className="px-4 py-3 font-mono font-bold">0o377</td><td className="px-4 py-3 text-[#5F6368]">Unix file permissions (chmod 755)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bitwise operations */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
            Bitwise Operations Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Operation</th>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Rule</th>
                  <th className="px-4 py-3">Example (binary)</th>
                  <th className="px-4 py-3">Result (dec)</th>
                  <th className="px-4 py-3">Real-World Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">AND</td><td className="px-4 py-3 font-mono font-bold text-blue-600">&</td><td className="px-4 py-3 text-[#5F6368]">1 only if both bits are 1</td><td className="px-4 py-3 font-mono">1010 & 1100</td><td className="px-4 py-3 font-bold">8</td><td className="px-4 py-3 text-[#5F6368]">Subnet mask, bit clearing</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">OR</td><td className="px-4 py-3 font-mono font-bold text-emerald-600">|</td><td className="px-4 py-3 text-[#5F6368]">1 if either bit is 1</td><td className="px-4 py-3 font-mono">1010 | 1100</td><td className="px-4 py-3 font-bold">14</td><td className="px-4 py-3 text-[#5F6368]">Setting permission flags</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">XOR</td><td className="px-4 py-3 font-mono font-bold text-purple-600">^</td><td className="px-4 py-3 text-[#5F6368]">1 only if bits differ</td><td className="px-4 py-3 font-mono">1010 ^ 1100</td><td className="px-4 py-3 font-bold">6</td><td className="px-4 py-3 text-[#5F6368]">Encryption, checksums, swap</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">NOT</td><td className="px-4 py-3 font-mono font-bold text-red-600">~</td><td className="px-4 py-3 text-[#5F6368]">Flips every bit</td><td className="px-4 py-3 font-mono">~0000 1010</td><td className="px-4 py-3 font-bold">−11</td><td className="px-4 py-3 text-[#5F6368]">Two&apos;s complement, bit inversion</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Left Shift</td><td className="px-4 py-3 font-mono font-bold text-orange-600">&lt;&lt;</td><td className="px-4 py-3 text-[#5F6368]">Shift bits left, fill 0s right</td><td className="px-4 py-3 font-mono">5 &lt;&lt; 2</td><td className="px-4 py-3 font-bold">20</td><td className="px-4 py-3 text-[#5F6368]">Fast multiply by power of 2</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Right Shift</td><td className="px-4 py-3 font-mono font-bold text-orange-600">&gt;&gt;</td><td className="px-4 py-3 text-[#5F6368]">Shift bits right, fill 0s left</td><td className="px-4 py-3 font-mono">20 &gt;&gt; 2</td><td className="px-4 py-3 font-bold">5</td><td className="px-4 py-3 text-[#5F6368]">Fast divide by power of 2</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
            Practical Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Web Color Codes',
                body: 'CSS colors like #1A73E8 are hex. Convert to decimal to get R=26, G=115, B=232 for use in CSS rgb() or rgba() functions.',
              },
              {
                title: 'Unix File Permissions',
                body: 'chmod 755 is octal 111 101 101. Convert to binary to see exact read/write/execute bits for owner, group, and others.',
              },
              {
                title: 'Network Subnets',
                body: 'A subnet mask of 255.255.255.0 is 0xFFFFFF00 in hex and 11111111.11111111.11111111.00000000 in binary — AND with IP address to get the network address.',
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
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {PROGRAMMER_FAQS.map((faq, i) => (
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
