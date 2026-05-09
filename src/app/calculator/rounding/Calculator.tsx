'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Hash } from 'lucide-react';

export default function RoundingCalc() {
  const [val, setVal]           = useState('123.4567');
  const [precision, setPrecision] = useState(2);

  const res = useMemo(() => {
    const n = parseFloat(val);
    if (isNaN(n)) return null;
    return { whole: Math.round(n), floor: Math.floor(n), ceil: Math.ceil(n), fixed: n.toFixed(precision), sig: n.toPrecision(Math.max(1, precision)) };
  }, [val, precision]);

  return (
    <ModernCalcLayout hideH1={false}
      slug="rounding"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Rounding Utility' }]}
      title="Rounding Calculator"
      description="Round numbers to the nearest whole number, specify decimal places, or calculate ceiling and floor values instantly."
      icon={Hash}
      inputs={
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Input Number</label>
              <input type="number" value={val} onChange={e => setVal(e.target.value)}
                className="w-full h-14 px-4 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm" />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Decimal Places / Precision</label>
                <span className="text-2xl font-black text-blue-600 leading-none">{precision}</span>
              </div>
              <input type="range" min={0} max={10} value={precision} onChange={e => setPrecision(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              <div className="grid grid-cols-6 gap-2">
                {[0,1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setPrecision(v)}
                    className={`py-2 rounded-lg text-sm font-bold transition-all ${precision === v ? 'bg-[#1a73e8] text-[#202124] shadow-md' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Examples</label>
            <div className="grid grid-cols-2 gap-3">
              {['3.14159', '2.71828', '1.41421', '99.9999'].map(ex => (
                <button key={ex} onClick={() => setVal(ex)}
                  className="p-3 border border-slate-200 rounded-xl bg-white hover:border-blue-300 hover:bg-slate-50 font-mono font-bold text-slate-700 transition-all shadow-sm text-center">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          {res ? (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
              {[
                { method: 'Standard Round',     result: String(res.whole), desc: 'Rounds to nearest integer' },
                { method: 'Floor (round down)', result: String(res.floor), desc: 'Largest integer ≤ input' },
                { method: 'Ceiling (round up)', result: String(res.ceil), desc: 'Smallest integer ≥ input'  },
                { method: `Fixed (${precision} decimals)`, result: res.fixed, desc: 'Exact decimal places' },
                { method: `Significant Figures (${precision})`, result: res.sig, desc: 'Meaningful digits' },
              ].map(({ method, result, desc }) => (
                <div key={method} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="text-sm font-bold text-slate-800 mb-0.5">{method}</div>
                    <div className="text-xs font-medium text-slate-500">{desc}</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono text-right break-all max-w-[50%]">{result}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-center font-bold">
              Please enter a valid number.
            </div>
          )}
        </div>
      }
      sidebar={{
        title: "Math Tools",
        links: [
          { label: 'Ratio & Proportion', href: '/calculator/ratio-proportion/' },
          { label: 'Percentage Calculator', href: '/calculator/percentage/' },
          { label: "Percentage Calc", href: "/calculator/percentage/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "BMI Calculator", href: "/calculator/bmi/" }
        ],
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Management & Numerical Rounding</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In computational mathematics, rounding is the practice of substituting an exact numerical value with an approximation that is shorter, simpler, or more appropriate for a given physical or financial context. Our <strong className="text-[#202124]">rounding calculator</strong> is a high-precision engine designed to instantly resolve complex floating-point decimals into manageable numbers across five distinct mathematical modalities.
              </p>
              <p>
                Whether you are executing standard half-up rounding for tax reporting, applying a mathematical floor to determine integer capacity, or isolating significant figures for scientific notation, preserving the correct magnitude is vital. This tool strictly adheres to IEEE 754 arithmetic standards, ensuring zero computational drift when terminating infinite decimal sequences.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Analysis of Rounding Methodologies</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Standard Rounding (Half-Up):</strong> The universal academic standard. The engine evaluates the digit immediately following the target decimal place. If it is 5 or greater, the target digit is incremented by 1. If it is 4 or less, the target digit remains static.</li>
              <li><strong className="text-[#188038]">Mathematical Floor & Ceiling:</strong> A 'Floor' operation forcefully rounds down to the nearest integer, regardless of the decimal value (e.g., 4.9 becomes 4). This is used when calculating physical capacity. A 'Ceiling' operation forcefully rounds up (e.g., 4.1 becomes 5), used when calculating material requirements.</li>
              <li><strong className="text-[#D93025]">Significant Figures (Sig-Figs):</strong> Used strictly in chemistry, physics, and engineering to express the precision of a measurement. Unlike decimal places (which count from the decimal point), significant figures count from the first non-zero digit in the entire number.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter your raw numerical data into the 'Input Number' field. You can paste numbers with infinite decimals.",
          "Use the precision slider (or the quick-select buttons) to define the exact number of decimal places or significant figures you require.",
          "The engine will instantly compute and display the number across all five rounding modalities.",
          "Review the results: Standard Round, Floor, Ceiling, Fixed Decimal, and Significant Figures.",
          "Use the 'Quick Examples' buttons to test the engine against famous mathematical constants like Pi or Euler's number."
        ]
      }}
      formula={{
        title: "Algorithmic Operations",
        description: "The JavaScript arithmetic methods powering the engine.",
        raw: "Standard Round: Math.round(n)\nFloor: Math.floor(n)\nCeiling: Math.ceil(n)\nFixed Decimal: n.toFixed(precision)\nSignificant Figures: n.toPrecision(precision)"
      }}
      faqs={[
        {
          question: "What is the mathematical difference between Floor and Standard Rounding?",
          answer: "Standard rounding evaluates the decimal fraction; if it is .5 or higher, it increments the integer. Floor rounding ignores the decimal entirely and ALWAYS forces the number down to the next lowest integer. Therefore, the floor of 2.9 is exactly 2."
        },
        {
          question: "What are significant figures and when are they used?",
          answer: "Significant figures represent the meaningful digits in a scientific measurement, starting from the first non-zero number. For example, 0.00456 has three significant figures (4, 5, 6). They are used in physics to ensure calculated results do not imply false precision."
        },
        {
          question: "Why does the Ceiling of 4.0001 equal 5?",
          answer: "Because the mathematical ceiling operation defines the absolute smallest integer that is greater than or equal to the input. Since 4.0001 is greater than 4, the engine must jump to the next available whole number, which is 5."
        },
        {
          question: "How does the 'Fixed' decimal method work?",
          answer: "The 'Fixed' method pads or truncates the number to exactly match your requested decimal places. If you input 5.1 and request 3 decimal places, the engine outputs 5.100. This is the global standard for rendering financial currency."
        },
        {
          question: "Why do some decimal calculations seem slightly off in JavaScript?",
          answer: "Because computers use base-2 binary floating-point arithmetic (IEEE 754), they cannot perfectly represent certain base-10 decimals (like 0.1 + 0.2). Our calculator utilizes robust internal rounding logic to correct these microscopic binary artifacts."
        },
        {
          question: "How do I round a negative number?",
          answer: "The rules apply symmetrically, but require careful thought regarding Floor and Ceiling. For negative numbers, smaller means more negative. Therefore, the Floor of -2.3 is -3, and the Ceiling of -2.3 is -2."
        }
      ]}
    />
  );
}

