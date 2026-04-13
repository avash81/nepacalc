'use client';

import { Delete } from 'lucide-react';
import { useState } from 'react';

interface VirtualKeypadProps {
  mode: 'scientific' | 'basic';
  onInput: (val: string) => void;
  onAction: (action: 'DELETE' | 'CLEAR' | 'EVALUATE' | 'ANS') => void;
}

export function VirtualKeypad({ mode, onInput, onAction }: VirtualKeypadProps) {
  const [tab, setTab] = useState<'main' | 'func' | 'abc'>('main');

  const scientificMain = [
    { label: 'x^y', val: '^' },
    { label: '√', val: 'sqrt(' },
    { label: 'π', val: 'pi' },
    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
    { label: '÷', val: '/', type: 'op' },

    { label: 'a^2', val: '^2' },
    { label: 'e', val: 'e' },
    { label: '|x|', val: 'abs(' },
    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '×', val: '*', type: 'op' },

    { label: '<', val: '', type: 'nav' }, // Simplified
    { label: '>', val: '', type: 'nav' },
    { label: 'ans', action: 'ANS' },
    { label: '7', val: '7', type: 'num' },
    { label: '8', val: '8', type: 'num' },
    { label: '9', val: '9', type: 'num' },
    { label: '−', val: '-', type: 'op' },

    { label: '(', val: '(' },
    { label: ')', val: ')' },
    { label: ',', val: ',' },
    { label: '0', val: '0', type: 'num' },
    { label: '.', val: '.', type: 'num' },
    { label: '=', action: 'EVALUATE', bg: 'bg-[#1a4b8c] text-white hover:bg-[#143a6e] border border-[#102d55]' },
    { label: '+', val: '+', type: 'op' },
  ];

  const basicNumpad = [
    { label: '7', val: '7', type: 'num' },
    { label: '8', val: '8', type: 'num' },
    { label: '9', val: '9', type: 'num' },
    { label: '÷', val: '/', type: 'op' },

    { label: '4', val: '4', type: 'num' },
    { label: '5', val: '5', type: 'num' },
    { label: '6', val: '6', type: 'num' },
    { label: '×', val: '*', type: 'op' },

    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
    { label: '−', val: '-', type: 'op' },

    { label: '0', val: '0', type: 'num' },
    { label: '.', val: '.', type: 'num' },
    { label: '=', action: 'EVALUATE', bg: 'bg-[#1a4b8c] text-white hover:bg-[#143a6e] border border-[#102d55]' },
    { label: '+', val: '+', type: 'op' },
  ];
  
  const funcPad = [
    { label: 'sin', val: 'sin(' },
    { label: 'cos', val: 'cos(' },
    { label: 'tan', val: 'tan(' },
    { label: 'sec', val: 'sec(' },
    { label: 'csc', val: 'csc(' },
    { label: 'cot', val: 'cot(' },
    { label: 'arcsin', val: 'asin(' },
    { label: 'arccos', val: 'acos(' },
    { label: 'arctan', val: 'atan(' },
    { label: 'log', val: 'log10(' },
    { label: 'ln', val: 'log(' },
    { label: '!', val: '!' },
  ];

  const renderKey = (key: any, i: number) => {
    // Style logic adhering to Equaly thematic patterns (Slate & Blue)
    let className = "flex items-center justify-center font-bold text-base md:text-xl rounded shadow-sm select-none transition-colors border p-1 md:p-2 ";
    
    if (key.bg) {
       className += key.bg;
    }
    // Number keys are stark white with soft borders
    else if (key.type === 'num') {
       className += "bg-white text-slate-800 border-slate-200 hover:bg-slate-50";
    }
    // Operator keys are soft blue-gray
    else if (key.type === 'op') {
       className += "bg-slate-100 text-blue-800 border-slate-200 hover:bg-slate-200/70";
    }
    // Other functions are deeper slate
    else {
       className += "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 font-serif";
    }

    return (
      <button
         key={i}
         className={className}
         onClick={() => {
            if (key.action) onAction(key.action as any);
            else if (key.val) onInput(key.val);
         }}
      >
        {key.label}
      </button>
    );
  };

  if (mode === 'basic') {
     return (
        <div className="w-full bg-[#e6e8ec] p-4 flex flex-col gap-2">
           <div className="flex justify-end gap-2 mb-2">
              <button 
                onClick={() => onAction('CLEAR')}
                className="px-6 py-2 bg-slate-200 text-slate-600 font-bold rounded shadow-sm border border-slate-300 hover:bg-slate-300 transition-colors"
              >
                 AC
              </button>
              <button 
                onClick={() => onAction('DELETE')}
                className="px-6 py-2 bg-slate-200 text-slate-600 font-bold rounded shadow-sm border border-slate-300 hover:bg-slate-300 transition-colors flex flex-col items-center justify-center"
              >
                 <Delete className="w-5 h-5 mb-0.5" />
              </button>
           </div>
           <div className="grid grid-cols-4 gap-2 h-full min-h-[220px]">
              {basicNumpad.map((key, i) => renderKey(key, i))}
           </div>
        </div>
     );
  }

  // Scientific Mode
  return (
    <div className="w-full bg-[#f1f3f5] p-2 sm:p-4 flex flex-col gap-2 relative border-t border-slate-300">
       
       {/* Top Row: Tabs and Utility */}
       <div className="flex justify-between items-center mb-1">
          <div className="flex bg-slate-200 rounded p-1 border border-slate-300">
             <button 
                onClick={() => setTab('main')}
                className={`px-3 sm:px-6 py-1.5 text-xs sm:text-sm font-bold rounded transition-colors ${tab === 'main' ? 'bg-white shadow text-[#1a4b8c]' : 'text-slate-600 hover:bg-slate-300/50'}`}
             >
                Main
             </button>
             <button 
                onClick={() => setTab('func')}
                className={`px-3 sm:px-6 py-1.5 text-xs sm:text-sm font-bold rounded transition-colors ${tab === 'func' ? 'bg-white shadow text-[#1a4b8c]' : 'text-slate-600 hover:bg-slate-300/50'}`}
             >
                func
             </button>
          </div>
          
          <div className="flex gap-2">
             <button 
               onClick={() => onAction('CLEAR')}
               className="w-[60px] sm:w-[80px] h-10 bg-slate-200 text-slate-600 font-bold rounded shadow-sm border border-slate-300 hover:bg-slate-300 transition-colors text-sm"
             >
                CLEAR
             </button>
             <button 
               onClick={() => onAction('DELETE')}
               className="w-[60px] sm:w-[80px] h-10 bg-slate-200 text-slate-600 font-bold rounded shadow-sm border border-slate-300 hover:bg-slate-300 transition-colors flex items-center justify-center"
               title="Backspace"
             >
                <Delete className="w-5 h-5" />
             </button>
          </div>
       </div>

       {/* Scientific Grid */}
       {tab === 'main' && (
         <div className="grid grid-cols-7 grid-rows-4 gap-1.5 sm:gap-2 h-[220px] sm:h-[300px]">
            {scientificMain.map((key, i) => renderKey(key, i))}
         </div>
       )}

       {tab === 'func' && (
         <div className="grid grid-cols-6 grid-rows-2 gap-1.5 sm:gap-2 h-[220px] sm:h-[300px] content-start">
            {funcPad.map((key, i) => renderKey(key, i))}
         </div>
       )}
    </div>
  );
}
