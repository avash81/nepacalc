'use client';

import { Delete, Eraser, MoveLeft, ChevronRight, Activity, Percent } from 'lucide-react';
import { useState } from 'react';

interface VirtualKeypadProps {
  mode: 'scientific' | 'basic';
  onInput: (val: string) => void;
  onAction: (action: 'DELETE' | 'CLEAR' | 'EVALUATE' | 'ANS' | 'TOGGLE_UNIT') => void;
}

export function VirtualKeypad({ mode, onInput, onAction }: VirtualKeypadProps) {
  
  const engineeringMain = [
    // Pillar 1: Trigonometry
    { label: 'sin', val: 'sin(' },
    { label: 'cos', val: 'cos(' },
    { label: 'tan', val: 'tan(' },
    { label: 'asin', val: 'asin(' },
    { label: 'acos', val: 'acos(' },
    
    // Pillar 2: Numpad 7-9
    { label: '7', val: '7', type: 'num' },
    { label: '8', val: '8', type: 'num' },
    { label: '9', val: '9', type: 'num' },
    { label: '÷', val: '÷', type: 'op' },
    { label: 'AC', action: 'CLEAR', type: 'util' },

    // Pillar 1: Hyperbolic
    { label: 'sinh', val: 'sinh(' },
    { label: 'cosh', val: 'cosh(' },
    { label: 'tanh', val: 'tanh(' },
    { label: 'atan', val: 'atan(' },
    { label: 'hypot', val: 'hypot(' },

    // Pillar 2: Numpad 4-6
    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '×', val: '×', type: 'op' },
    { label: 'DEL', action: 'DELETE', type: 'util' },

    // Pillar 1: Advanced Math
    { label: 'log', val: 'log10(' },
    { label: 'ln', val: 'log(' },
    { label: 'e', val: 'e', type: 'const' },
    { label: 'π', val: 'π', type: 'const' },
    { label: 'ans', action: 'ANS', type: 'util' },

    // Pillar 2: Numpad 1-3
    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
    { label: '−', val: '-', type: 'op' },
    { label: '(', val: '(' },

    // Pillar 1: Powers & Roots
    { label: 'x^y', val: '^' },
    { label: 'x²', val: '^2' },
    { label: 'x³', val: '^3' },
    { label: '√', val: 'sqrt(' },
    { label: '∛', val: 'cbrt(' },

    // Pillar 2: Numpad 0 & Dot
    { label: '0', val: '0', type: 'num' },
    { label: '.', val: '.', type: 'num' },
    { label: '%', val: '%', type: 'op' },
    { label: '+', val: '+', type: 'op' },
    { label: ')', val: ')' },

    // Pillar 3: Engineering Actions
    { label: '1/x', val: '1/(' },
    { label: 'abs', val: 'abs(' },
    { label: 'n!', val: '!' },
    { label: 'exp', val: 'exp(' },
    { label: 'mod', val: 'mod(' },
    { label: 'rand', val: 'random()' },
    { label: 'DEG | RAD', action: 'TOGGLE_UNIT', type: 'util', span: 'col-span-2' },
    { label: '=', action: 'EVALUATE', bg: 'bg-[#1a4b8c] text-white hover:bg-[#123564] border-[#0a2347]', span: 'col-span-2' },
  ];

  const basicNumpad = [
    { label: 'AC', action: 'CLEAR', type: 'util' },
    { label: 'DEL', action: 'DELETE', type: 'util' },
    { label: '%', val: '%', type: 'op' },
    { label: '÷', val: '/', type: 'op' },

    { label: '7', val: '7', type: 'num' },
    { label: '8', val: '8', type: 'num' },
    { label: '9', val: '9', type: 'num' },
    { label: '×', val: '*', type: 'op' },

    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '−', val: '-', type: 'op' },

    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
    { label: '+', val: '+', type: 'op' },

    { label: '0', val: '0', type: 'num', span: 'col-span-2' },
    { label: '.', val: '.', type: 'num' },
    { label: '=', action: 'EVALUATE', bg: 'bg-[#1a4b8c] text-white hover:bg-[#123564]' },
  ];

  const renderKey = (key: any, i: number) => {
    let className = "flex items-center justify-center font-bold text-[11px] md:text-sm rounded-xl shadow-sm transition-all active:scale-95 border ";
    
    if (key.span) className += ` ${key.span} `;
    
    if (key.bg) {
       className += ` ${key.bg} `;
    } else if (key.type === 'num') {
       className += "bg-white text-slate-800 border-slate-200 hover:bg-slate-50";
    } else if (key.type === 'op') {
       className += "bg-slate-100 text-[#1a4b8c] border-slate-200 hover:bg-slate-200/50 hover:border-slate-300";
    } else if (key.type === 'util') {
       className += "bg-[#F8F9FA] text-[#FFC107] border-slate-200 hover:bg-black hover:text-[#FFC107] font-black uppercase text-[10px] tracking-widest";
    } else if (key.type === 'const') {
       className += "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100";
    } else {
       className += "bg-white text-slate-500 border-slate-50 hover:bg-slate-50 font-serif italic";
    }

    return (
      <button
         key={i}
         className={className}
         onClick={(e) => {
            e.preventDefault();
            if (key.action) onAction(key.action as any);
            else if (key.val !== undefined) onInput(key.val);
         }}
      >
        {key.label}
      </button>
    );
  };

  if (mode === 'basic') {
    return (
      <div className="grid grid-cols-4 gap-2 md:gap-3 h-[380px] sm:h-[450px] p-4 bg-white/50 backdrop-blur-xl">
        {basicNumpad.map((key, i) => renderKey(key, i))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 bg-white/50 backdrop-blur-xl p-2 md:p-4 border-t border-slate-100">
      
      {/* 🔢 EXPANSIVE ENGINEERING GRID */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 md:gap-2 h-[420px] md:h-[300px]">
         {engineeringMain.map((key, i) => renderKey(key, i))}
      </div>

    </div>
  );
}
