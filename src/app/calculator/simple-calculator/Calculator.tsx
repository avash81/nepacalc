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
      <ModernCalcLayout
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
        howToUse={{
          steps: [
            "Click or tap the numbers to input your first value.",
            "Select an operation (+, -, ×, ÷).",
            "Input your second value.",
            "Press the '=' button to see your result.",
            "Use the 'C' button to clear the entire calculation, or 'DEL' to remove the last typed digit."
          ]
        }}
        faqs={[
          {
            question: "How does the percentage (%) button work?",
            answer: "The percent button divides the current display number by 100. For example, if you type 50 and press %, it becomes 0.5."
          },
          {
            question: "Is there a limit to how large a number I can calculate?",
            answer: "The calculator supports up to standard JavaScript safe integer limits (up to 16 digits of precision). Beyond that, it will utilize scientific notation (e.g., 1.5e+20)."
          }
        ]}
        seoContent={
          <div>
            <h2>The Essential Online Calculator</h2>
            <p>Our simple online calculator is designed to provide a clean, distraction-free environment for everyday mathematical tasks. Whether you are balancing a checkbook, calculating a quick tip at a restaurant, or helping with basic homework, this tool provides instant, accurate results without the clutter of advanced scientific functions.</p>

            <h2>Utility Guide: Standard Arithmetic</h2>
            <p className="font-medium">
              Sometimes, the most powerful tool is the <strong>simplest one</strong>. Whether you are balancing daily expenses or double-checking a retail invoice, a reliable basic calculator is an essential utility.
            </p>
            <p>
              Our <strong>Standard Calculation Laboratory</strong> provides a clean, distraction-free environment for your daily arithmetic. Designed to follow the <strong>BODMAS order of operations</strong>, our engine ensures that even simple equations are handled with the same rigor and precision as our most advanced engineering tools.
            </p>
            
            <h3>Core Functions</h3>
            <ul>
              <li><strong>Addition (+):</strong> Combine two or more numbers together.</li>
              <li><strong>Subtraction (-):</strong> Find the difference between numbers.</li>
              <li><strong>Multiplication (×):</strong> Scale numbers rapidly.</li>
              <li><strong>Division (÷):</strong> Split amounts into equal parts.</li>
            </ul>
            
            <h3>Why Use a Web Calculator?</h3>
            <p>While most smartphones have built-in calculators, accessing a web-based calculator is often faster when you are already working on a computer. It integrates seamlessly into your workflow, allowing you to quickly copy and paste values from spreadsheets, emails, or financial documents directly into the interface.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
