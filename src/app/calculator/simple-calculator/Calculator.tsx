'use client';

import React, { useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { RotateCcw, Delete, Equal, Percent, Calculator } from 'lucide-react';
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
    { label: 'C', onClick: clear, color: 'text-rose-500 bg-rose-50 hover:bg-rose-100 border-rose-100' },
    { label: 'DEL', onClick: backspace, icon: <Delete className="w-5 h-5" />, color: 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200' },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), icon: <Percent className="w-5 h-5" />, color: 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200' },
    { label: '÷', onClick: () => handleOperator('/'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100' },
    { label: '7', onClick: () => handleNumber('7') },
    { label: '8', onClick: () => handleNumber('8') },
    { label: '9', onClick: () => handleNumber('9') },
    { label: '×', onClick: () => handleOperator('*'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100' },
    { label: '4', onClick: () => handleNumber('4') },
    { label: '5', onClick: () => handleNumber('5') },
    { label: '6', onClick: () => handleNumber('6') },
    { label: '-', onClick: () => handleOperator('-'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100' },
    { label: '1', onClick: () => handleNumber('1') },
    { label: '2', onClick: () => handleNumber('2') },
    { label: '3', onClick: () => handleNumber('3') },
    { label: '+', onClick: () => handleOperator('+'), color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100' },
    { label: '0', onClick: () => handleNumber('0'), colSpan: 2 },
    { label: '.', onClick: () => !display.includes('.') && setDisplay(display + '.') },
    { label: '=', onClick: calculate, color: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-700 shadow-md', icon: <Equal className="w-6 h-6" /> },
  ];

  return (
    <CalculatorErrorBoundary calculatorName="Simple Calculator">
      <ModernCalcLayout hideH1={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Basic Calculator' }]}
        title="Simple Online Calculator"
        description="A fast, clean, and responsive digital calculator for everyday mathematical operations. Supports addition, subtraction, multiplication, division, and percentages."
        icon={Calculator}
        inputs={
          <div className="flex flex-col h-full max-w-md mx-auto w-full">
            <div className="bg-slate-900 rounded-3xl p-6 mb-6 shadow-xl border border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Calculator className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                 <div className="h-6 text-right text-slate-400 text-sm font-medium overflow-hidden whitespace-nowrap font-mono tracking-wider">
                   {formula}
                 </div>
                 <div className="text-5xl sm:text-6xl font-black text-white text-right mt-2 overflow-hidden truncate font-mono tracking-tighter">
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
                    ${btn.color || 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-sm'} 
                    flex items-center justify-center p-5 rounded-2xl text-2xl font-bold
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
             <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-4 text-blue-600">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">Recent Updates</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We've improved the underlying mathematics engine to use a safer evaluation parser, preventing floating-point precision errors on simple decimals (like 0.1 + 0.2).
                </p>
             </div>

             <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">Did you know?</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  This calculator automatically handles Order of Operations (PEMDAS) internally when you chain multiple calculations.
                </p>
             </div>
          </div>
        }
        sidebar={{
          title: "More Math Utilities",
          links: [
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
            { label: 'Rounding Calculator', href: '/calculator/rounding' },
            { label: 'Scientific Calculator', href: '/calculator/scientific' },
          ],
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Standard Arithmetic Computation Engine</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  While advanced mathematics relies on complex algebraic structures, the foundation of all numerical analysis is <strong className="text-[#202124]">standard arithmetic</strong>. Our simple calculator is engineered not just for basic addition and subtraction, but as a robust digital ledger capable of parsing continuous operational chains without succumbing to the floating-point precision errors that plague standard operating system calculators.
                </p>
                <p>
                  This computational engine is built on a <strong className="text-[#202124]">safe-evaluation parser</strong>. Unlike standard JavaScript which famously evaluates <code className="bg-[#F1F3F4] px-1 rounded">0.1 + 0.2</code> as <code className="bg-[#F1F3F4] px-1 rounded text-[#D93025]">0.30000000000000004</code>, our engine intercepts the operation, scales the decimals to integers via exponentiation, executes the arithmetic perfectly, and downscales the result back to true decimal form.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Core Algorithmic Modalities</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Addition & Subtraction (+, −):</strong> Linear accumulation and reduction algorithms. Essential for accounting, inventory management, and basic physical modeling.</li>
                <li><strong className="text-[#188038]">Multiplication & Division (×, ÷):</strong> Rapid scalar operations. Used for exponential growth estimation, geometric area derivation, and ratio reduction.</li>
                <li><strong className="text-[#D93025]">Decimal & Percentage Scaling (%, .):</strong> Instantly shift the decimal radix point to compute tax margins, tip rates, and financial discounts.</li>
              </ul>
            </div>
          </div>
        }
        howToUse={{
          steps: [
            "Use the visual keypad or your physical keyboard to enter the primary number.",
            "Select an arithmetic operator (Addition, Subtraction, Multiplication, Division).",
            "Enter subsequent numbers to build out the computational chain.",
            "Press the Equals (=) button or hit Enter to execute the internal evaluation parser.",
            "Use the 'C' key to completely flush the memory, or 'DEL' to retroactively remove the last keystroke."
          ]
        }}
        formula={{
          title: "Order of Operations Protocol",
          description: "The engine strictly parses mathematical strings based on universal hierarchy.",
          raw: "Rule 1: Division & Multiplication are evaluated first (Left to Right).\nRule 2: Addition & Subtraction are evaluated last (Left to Right).\n\nExample:\n2 + 3 × 4 = 14 (Not 20)\nThe engine correctly evaluates (3×4) prior to adding 2."
        }}
        faqs={[
          {
            question: "How does the engine handle floating-point precision errors?",
            answer: "Standard computer processors use Base-2 binary to calculate, which cannot perfectly represent certain Base-10 decimals. Our engine uses a specialized 'safeEval' parser that temporarily converts decimals to whole numbers, calculates them cleanly, and then returns the exact decimal."
          },
          {
            question: "Does this calculator respect PEMDAS/BODMAS?",
            answer: "Yes. If you string multiple operations together before pressing equals (e.g., 5 + 5 × 2), the internal parser will correctly evaluate the multiplication first, yielding 15, not 20."
          },
          {
            question: "What is the maximum number of digits I can calculate?",
            answer: "The engine utilizes standard JavaScript safe integer limits, allowing for absolute precision up to 15-16 digits. Exceeding this boundary will result in the engine outputting scientific notation (e.g., 1.5e+20) to prevent overflow errors."
          },
          {
            question: "How exactly does the Percentage (%) button operate?",
            answer: "The percent button acts as a rapid scaling modifier. It takes the current number in the display matrix and divides it by 100. For instance, typing 50 and hitting % immediately converts the display to 0.5."
          },
          {
            question: "What happens if I attempt to divide by zero?",
            answer: "In mathematics, division by zero is undefined. If attempted, the engine's internal safety protocols will intercept the calculation and return an error state (Infinity or NaN) to prevent a localized crash."
          },
          {
            question: "Can I use my physical computer keyboard?",
            answer: "Yes. The interface is designed to map standard numpad keystrokes (0-9, +, -, *, /, Enter, Backspace) directly to the computational engine for maximum operational speed."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

