'use client';

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { RotateCcw, Delete, Equal, Minus, Plus, X, Divide, Percent } from 'lucide-react';
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
    { label: 'C', onClick: clear, color: 'text-rose-500' },
    { label: 'DEL', onClick: backspace, icon: <Delete className="w-5 h-5" /> },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), icon: <Percent className="w-5 h-5" /> },
    { label: '÷', onClick: () => handleOperator('/'), color: 'text-blue-600' },
    { label: '7', onClick: () => handleNumber('7') },
    { label: '8', onClick: () => handleNumber('8') },
    { label: '9', onClick: () => handleNumber('9') },
    { label: '×', onClick: () => handleOperator('*'), color: 'text-blue-600' },
    { label: '4', onClick: () => handleNumber('4') },
    { label: '5', onClick: () => handleNumber('5') },
    { label: '6', onClick: () => handleNumber('6') },
    { label: '-', onClick: () => handleOperator('-'), color: 'text-blue-600' },
    { label: '1', onClick: () => handleNumber('1') },
    { label: '2', onClick: () => handleNumber('2') },
    { label: '3', onClick: () => handleNumber('3') },
    { label: '+', onClick: () => handleOperator('+'), color: 'text-blue-600' },
    { label: '0', onClick: () => handleNumber('0'), colSpan: 2 },
    { label: '.', onClick: () => !display.includes('.') && setDisplay(display + '.') },
    { label: '=', onClick: calculate, color: 'bg-blue-600 text-white', icon: <Equal className="w-6 h-6" /> },
  ];

  return (
    <CalculatorErrorBoundary calculatorName="Simple Calculator">
      <CalculatorLayout
        title="Simple Online Calculator"
        description="A fast, clean, and responsive calculator for your daily mathematical needs."
        badge="Essentials"
        badgeColor="purple"
        category={{ label: 'Mathematics', href: '/calculator/category/mathematics' }}
        leftPanel={
          <div className="flex flex-col h-full max-w-md mx-auto">
            <div className="bg-slate-900 rounded-3xl p-6 mb-6 shadow-2xl border border-slate-800">
               <div className="h-6 text-right text-slate-500 text-sm font-medium overflow-hidden whitespace-nowrap">
                 {formula}
               </div>
               <div className="text-5xl font-black text-white text-right mt-2 overflow-hidden truncate">
                 {display}
               </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`
                    ${btn.colSpan === 2 ? 'col-span-2' : ''} 
                    ${btn.color || 'bg-white text-slate-700'} 
                    flex items-center justify-center p-5 rounded-2xl text-xl font-bold shadow-sm 
                    hover:scale-[0.98] active:scale-95 transition-all
                    border border-slate-100/50
                  `}
                >
                  {btn.icon || btn.label}
                </button>
              ))}
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6">
             <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 mb-4 text-blue-600">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Recent Updates</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We&apos;ve improved the scientific precision of our calculator and added responsive support for mobile devices.
                </p>
             </div>

             <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 mb-2">Did you know?</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  You can use keyboard shortcuts! (Coming soon in v4.1)
                </p>
             </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
                <div>
                   <h3 className="text-lg font-bold text-slate-900">Precision</h3>
                   <p className="text-sm text-slate-600">Calculates up to 8 decimal places for maximum accuracy in simple math.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-slate-900">Mobile First</h3>
                   <p className="text-sm text-slate-600">Designed with large touch targets for easy use on any smartphone or tablet.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-slate-900">Privacy</h3>
                   <p className="text-sm text-slate-600">Your calculations are performed client-side and never leave your device.</p>
                </div>
             </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
