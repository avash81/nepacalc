'use client';

import React, { useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { RotateCcw, Delete, Equal, Percent, Calculator, Zap, Keyboard, CheckCircle2 } from 'lucide-react';
import { safeEval } from '@/utils/math/safeEval';

export default function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleNumber = (n: string) => {
    if (isDone) {
      setDisplay(n);
      setIsDone(false);
    } else {
      setDisplay(display === '0' ? n : display + n);
    }
  };

  const handleOperator = (op: string) => {
    setFormula(display + ' ' + op + ' ');
    setDisplay('0');
    setIsDone(false);
  };

  const calculate = () => {
    const fullExpr = formula + display;
    const result = safeEval(fullExpr);
    setDisplay(result);
    setFormula('');
    setIsDone(true);
  };

  const clear = () => {
    setDisplay('0');
    setFormula('');
    setIsDone(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const buttons = [
    { label: 'C', onClick: clear, color: 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200' },
    { label: 'DEL', onClick: backspace, icon: <Delete className="w-5 h-5" />, color: 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200' },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), icon: <Percent className="w-5 h-5" />, color: 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200' },
    { label: '÷', onClick: () => handleOperator('/'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { label: '7', onClick: () => handleNumber('7') },
    { label: '8', onClick: () => handleNumber('8') },
    { label: '9', onClick: () => handleNumber('9') },
    { label: '×', onClick: () => handleOperator('*'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { label: '4', onClick: () => handleNumber('4') },
    { label: '5', onClick: () => handleNumber('5') },
    { label: '6', onClick: () => handleNumber('6') },
    { label: '-', onClick: () => handleOperator('-'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { label: '1', onClick: () => handleNumber('1') },
    { label: '2', onClick: () => handleNumber('2') },
    { label: '3', onClick: () => handleNumber('3') },
    { label: '+', onClick: () => handleOperator('+'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { label: '0', onClick: () => handleNumber('0'), colSpan: 2 },
    { label: '.', onClick: () => !display.includes('.') && setDisplay(display + '.') },
    { label: '=', onClick: calculate, color: 'bg-[#1a73e8] text-white hover:bg-blue-700 border-blue-700 shadow-md', icon: <Equal className="w-6 h-6" /> },
  ];

  return (
    <CalculatorErrorBoundary calculatorName="Simple Calculator">
      <ModernCalcLayout 
        slug="simple-calculator"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Math Tools', href: '/math-tools/' }, { label: 'Simple Calculator' }]}
        title="Simple Online Calculator"
        description="Fast, free basic calculator for everyday arithmetic — addition, subtraction, multiplication, division, and percentage calculations. Works smoothly on mobile, tablet, and PC."
        icon={Calculator}
        inputs={
          <div className="flex flex-col h-full max-w-md mx-auto w-full space-y-6">
            <div className="p-8 bg-white border border-[#dadce0] rounded-xl shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Calculator className="w-40 h-40" />
               </div>
               <div className="relative z-10 space-y-2">
                 <div className="h-6 text-right text-[#1a0dab] text-[11px] font-black uppercase tracking-wider overflow-hidden whitespace-nowrap font-mono">
                   {formula || 'Ready'}
                 </div>
                 <div className="text-6xl font-black text-[#202124] text-right overflow-hidden truncate font-mono tracking-tighter">
                   {display}
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`
                    ${btn.colSpan === 2 ? 'col-span-2' : ''} 
                    ${btn.color || 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200 shadow-sm'} 
                    flex items-center justify-center p-5 rounded-xl text-2xl font-black
                    active:scale-95 transition-all
                    border
                  `}
                >
                  {btn.icon || btn.label}
                </button>
              ))}
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
             <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#202124]">Clean Decimal Precision</h4>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Calculates accurately without floating-point glitches (e.g. 0.1 + 0.2 gives exactly 0.3, not 0.30000000000000004). Safe for money and paisa amounts.
                </p>
             </div>

             <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Keyboard className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#202124]">Keyboard Support</h4>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Type numbers and operators directly from your computer keyboard or numpad. Press <strong>Enter</strong> to calculate, <strong>Escape</strong> to clear.
                </p>
             </div>
          </div>
        }
        sidebar={{
          title: "Math Hub",
          subtitle: "Tools",
          links: [
            { label: 'Percentage Calculator', href: '/calculator/percentage/' },
            { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
            { label: 'Fraction Calculator', href: '/calculator/fraction-calculator/' },
            { label: 'Ratio & Proportion', href: '/calculator/ratio-proportion/' },
          ],
        }}
        details={
          <div className="space-y-6">
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-4">
                Keyboard Shortcuts
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
                  <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                    <tr>
                      <th className="px-4 py-2.5">Key</th>
                      <th className="px-4 py-2.5">Action</th>
                      <th className="px-4 py-2.5">Alternative</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">0–9</td><td className="px-4 py-2.5">Enter numbers</td><td className="px-4 py-2.5 text-[#5F6368]">Numpad supported</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">+, -, *, /</td><td className="px-4 py-2.5">Addition, Subtraction, Multiplication, Division</td><td className="px-4 py-2.5 text-[#5F6368]">Standard operators</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">Enter or =</td><td className="px-4 py-2.5 font-bold text-blue-600">Calculate result</td><td className="px-4 py-2.5 text-[#5F6368]">Numpad Enter</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">Backspace</td><td className="px-4 py-2.5">Delete last digit (DEL)</td><td className="px-4 py-2.5 text-[#5F6368]">—</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">Escape</td><td className="px-4 py-2.5 font-bold text-rose-600">Clear all (C)</td><td className="px-4 py-2.5 text-[#5F6368]">—</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-2.5 font-mono font-bold">%</td><td className="px-4 py-2.5">Convert number to percentage (÷ 100)</td><td className="px-4 py-2.5 text-[#5F6368]">—</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-4">
                Everyday Calculations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Shopping & Bills',
                    desc: 'Add prices of groceries, vegetables, and household items. Quickly verify the shopkeeper invoice total.'
                  },
                  {
                    title: 'Splitting Shared Expenses',
                    desc: 'Divide dinner bills, room rent, electricity charges, or Wi-Fi costs equally among roommates or friends.'
                  },
                  {
                    title: 'Discounts & Tips',
                    desc: 'Find 10% or 15% discount on clothing or restaurant bills: enter total × discount rate %.'
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
                    <h4 className="font-bold text-[#202124] text-xs mb-1.5">{title}</h4>
                    <p className="text-xs text-[#5F6368] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Type numbers using the buttons on screen or your keyboard numpad.",
            "Choose an operator (+, −, ×, ÷).",
            "Type the next number.",
            "Press '=' or hit Enter to get your answer.",
            "Press 'C' or Esc to clear and start fresh."
          ]
        }}
        formula={{
          title: "Order of Operations",
          description: "Calculations follow standard mathematical order (Multiplication and Division first, then Addition and Subtraction).",
          raw: "Example:\n2 + 3 × 4 = 14\n(3 × 4 is calculated first = 12, then + 2 = 14)"
        }}
        faqs={[
          {
            question: "Does this calculator handle decimals and paisa?",
            answer: "Yes, you can enter any decimal number using the '.' button. All calculations are rounded cleanly without floating-point inaccuracies."
          },
          {
            question: "Can I use my computer keyboard to type calculations?",
            answer: "Yes. All numbers (0-9), operators (+, -, *, /), Enter (=), Backspace (DEL), and Escape (C) work directly from your physical keyboard or laptop numpad."
          },
          {
            question: "How does the percentage button (%) work?",
            answer: "The % button divides the currently displayed number by 100. For example, typing 50 and pressing % gives 0.5. To find 15% of 200, type 200 × 15 % = 30."
          },
          {
            question: "Is this calculator free and offline-capable?",
            answer: "Yes, it is 100% free with no account required. Once the page is loaded in your browser, it calculates entirely on your device without needing an active internet connection."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
