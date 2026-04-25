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
    <ModernCalcLayout
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
                    className={`py-2 rounded-lg text-sm font-bold transition-all ${precision === v ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'}`}>
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
          { label: 'Ratio & Proportion', href: '/calculator/ratio-proportion' },
          { label: 'Percentage Calculator', href: '/calculator/percentage' },
        ],
      }}
      howToUse={{
        steps: [
          "Enter the number you want to round in the 'Input Number' field.",
          "Use the slider or the quick-select buttons to set your desired decimal precision.",
          "The calculator will instantly generate multiple rounding types (Standard, Floor, Ceiling, Fixed decimal, and Significant Figures)."
        ]
      }}
      faqs={[
        {
          question: "What is the difference between Floor and Standard Rounding?",
          answer: "Standard rounding looks at the fractional part: if it is .5 or higher, it rounds up; if it is less than .5, it rounds down. Floor rounding ALWAYS rounds down to the next lowest whole number, regardless of the decimal value. For example, the floor of 2.9 is 2."
        },
        {
          question: "What are significant figures?",
          answer: "Significant figures are the meaningful digits in a number. For example, 0.00456 has three significant figures (4, 5, and 6) because leading zeros are just placeholders."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding Number Rounding</h2>
          <p>Rounding numbers makes them simpler and easier to use while keeping their value close to what it was. This is especially useful in finance, science, and everyday math where extreme precision (like having 10 decimal places) isn't necessary or practical.</p>

          <h2>Precision Guide: Numerical Rounding</h2>
          <p className="font-medium">
            In <strong>mathematics and data analysis</strong>, maintaining the correct level of precision is vital for the integrity of your results.
          </p>
          <p>
            Our <strong>Numerical Precision Laboratory</strong> provides a robust interface for managing decimal approximations. Whether you are a student in Nepal simplifying physics problems or a professional preparing <strong>financial statements</strong>, our engine applies standard rounding laws with absolute consistency, ensuring your data is both accurate and presentation-ready.
          </p>
          
          <h3>Common Rounding Methods</h3>
          <ul>
            <li><strong>Standard Rounding:</strong> The most common method. You look at the digit to the right of your target rounding place. If it's 5 or more, you round up. If it's 4 or less, you round down (keep the number the same). For example, rounding 3.14159 to two decimal places gives 3.14.</li>
            <li><strong>Ceiling (Round Up):</strong> This method always rounds the number UP to the nearest integer, no matter what the decimal is. The ceiling of 4.1 is 5.</li>
            <li><strong>Floor (Round Down):</strong> This method always rounds the number DOWN to the nearest integer. The floor of 4.9 is 4.</li>
          </ul>
          
          <h3>When to Use Different Rounding Types</h3>
          <p>If you are calculating currency, you almost always round to exactly two decimal places (Fixed Rounding). If you are estimating how many full buses you need for 100 students and a bus holds 30, 100/30 = 3.33, but you must use the Ceiling method to realize you need 4 buses. Conversely, if you are calculating how many complete items you can buy with a set amount of money, you use the Floor method.</p>
        </div>
      }
    />
  );
}
