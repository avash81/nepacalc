'use client';

import { useState, useRef, useEffect } from 'react';
import * as math from 'mathjs';
import { Delete, Plus, Minus } from 'lucide-react';

interface MatrixDef {
  name: string;
  rows: number;
  cols: number;
  data: string[][];
}

interface EvaluationRecord {
  id: string;
  raw: string;
  result: string | string[][] | null;
  error: boolean;
}

export function MatrixApp() {
  const [matrices, setMatrices] = useState<MatrixDef[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  
  const tapeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll tape to bottom
  useEffect(() => {
    if (tapeRef.current) {
      tapeRef.current.scrollTop = tapeRef.current.scrollHeight;
    }
  }, [matrices, evaluations, currentInput]);

  const addMatrix = () => {
    const letters = 'ABCDEFGHIJKLMN';
    const nextName = letters[matrices.length] || `M${matrices.length}`;
    setMatrices(prev => [
      ...prev, 
      { name: nextName, rows: 2, cols: 2, data: [['', ''], ['', '']] }
    ]);
  };

  const updateMatrixSize = (name: string, type: 'rows' | 'cols', delta: number) => {
    setMatrices(prev => prev.map(m => {
       if (m.name !== name) return m;
       let newRows = m.rows;
       let newCols = m.cols;
       if (type === 'rows') newRows = Math.max(1, Math.min(newRows + delta, 6));
       if (type === 'cols') newCols = Math.max(1, Math.min(newCols + delta, 6));
       
       const newData = Array(newRows).fill(0).map((_, r) => 
          Array(newCols).fill(0).map((__, c) => m.data[r]?.[c] || '')
       );

       return { ...m, rows: newRows, cols: newCols, data: newData };
    }));
  };

  const updateMatrixCell = (name: string, r: number, c: number, val: string) => {
    // Basic validation to only allow numbers and . and -
    if (!/^-?\d*\.?\d*$/.test(val)) return;

    setMatrices(prev => prev.map(m => {
       if (m.name !== name) return m;
       const newData = [...m.data];
       newData[r] = [...newData[r]];
       newData[r][c] = val;
       return { ...m, data: newData };
    }));
  };

  const evaluateLine = () => {
    if (!currentInput.trim()) return;

    const newItem: EvaluationRecord = {
      id: Math.random().toString(36).substr(2, 9),
      raw: currentInput,
      result: null,
      error: false
    };

    try {
      // 1. Prepare Scope with Matrices
      const scope: Record<string, any> = {};
      
      // Load matrices into mathjs scope safely
      matrices.forEach(m => {
         const numericData = m.data.map(row => 
            row.map(cell => {
               const val = parseFloat(cell);
               return isNaN(val) ? 0 : val;
            })
         );
         scope[m.name] = math.matrix(numericData);
      });

      // 2. Custom Functions mapped to mathjs equivalents
      // desmos uses: det(A), inv(A), rref(A), transpose(A)
      // mathjs has: det(A), inv(A), transpose(A). RREF needs a custom JS bypass if needed, but we'll stick to mathjs native for safety.
      
      let sanitized = currentInput
         .replace(/inv\(/g, 'inv(')          // mathjs native
         .replace(/transpose\(/g, 'transpose(') // mathjs native
         // MathJS cross product uses cross(x,y)
         ;

      const res = math.evaluate(sanitized, scope);
      
      if (res && res.isResultSet) {
        // Handle result sets safely
         newItem.result = "Set Return";
      }
      else if (res && res.isMatrix) {
         // Format matrix return
         newItem.result = res.toArray().map((row: number[]) => 
            row.map((cell: number) => math.format(cell, { precision: 6 }))
         );
      } else if (typeof res === 'number') {
         newItem.result = math.format(res, { precision: 7 });
      } else {
         newItem.result = res?.toString() || 'Undefined';
      }

    } catch (e) {
      newItem.error = true;
      newItem.result = 'Invalid Dimension or Syntax';
    }

    setEvaluations(prev => [...prev, newItem]);
    setCurrentInput('');
  };

  // Dedicated Linear Algebra Keyboard
  const MatrixKeypad = () => {
    const defaultKeys = [
       { label: 'det', val: 'det(' },
       { label: 'inv', val: 'inv(' },
       { label: 'transpose', val: 'transpose(' },
       { label: 'DEL', action: 'DEL', bg: 'bg-slate-200' },
       { label: 'AC', action: 'AC', bg: 'bg-slate-200' },
       
       { label: '+', val: '+' },
       { label: '−', val: '-' },
       { label: '×', val: '*' },
       { label: '÷', val: '/' },
       { label: '=', action: 'EVAL', bg: 'bg-indigo-600 text-[#202124] border-indigo-700 hover:bg-indigo-700' },
    ];

    return (
      <div className="bg-slate-100 p-2 border-t border-slate-300 w-full shrink-0 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] relative z-20">
         <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <button 
              onClick={addMatrix}
              className="bg-white border border-slate-300 px-4 py-2 rounded text-indigo-700 font-bold hover:bg-indigo-50 shadow-sm transition-all"
            >
              + New Matrix
            </button>
            <div className="flex gap-1 overflow-x-auto pb-1 max-w-[50vw]">
               {matrices.map(m => (
                  <button 
                    key={m.name} 
                    onClick={() => setCurrentInput(p => p + m.name)}
                    className="w-10 h-10 bg-white border border-slate-300 rounded font-serif text-lg font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-center shrink-0 shadow-sm"
                  >
                    {m.name}
                  </button>
               ))}
            </div>
         </div>
         
         <div className="grid grid-cols-5 gap-2">
            {defaultKeys.map((k, i) => (
               <button 
                 key={i}
                 onClick={() => {
                   if (k.action === 'DEL') setCurrentInput(p => p.slice(0, -1));
                   else if (k.action === 'AC') setCurrentInput('');
                   else if (k.action === 'EVAL') evaluateLine();
                   else if (k.val) setCurrentInput(p => p + k.val);
                 }}
                 className={`h-12 flex items-center justify-center font-bold rounded border shadow-sm transition-colors text-sm sm:text-base ${k.bg || 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
               >
                 {k.label}
               </button>
            ))}
         </div>
         
         {/* Native Input Fallback for full hardware keyboard support */}
         <div className="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
            ( Hardware Keyboard Supported )
         </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col bg-[#fdfdfd] overflow-hidden relative">
      
      {/* Upper Context: The Tape */}
      <div 
        ref={tapeRef}
        className="flex-1 overflow-y-auto px-4 md:px-12 pt-8 pb-32 flex flex-col gap-6 scroll-smooth bg-white"
      >
         
         {/* 1. Matrix Definitions List */}
         {matrices.map(m => (
            <div key={m.name} className="flex flex-col md:flex-row items-center border border-indigo-100 bg-indigo-50/30 rounded-xl p-4 gap-6 group hover:border-indigo-300 transition-colors">
               <div className="flex flex-col items-center gap-2 border-r border-indigo-200 pr-6">
                  <div className="text-3xl font-serif text-indigo-900">{m.name} =</div>
                  <div className="flex gap-2">
                     <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">ROWS</span>
                     <button onClick={() => updateMatrixSize(m.name, 'rows', -1)} className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded hover:bg-indigo-50" aria-label="Decrease rows"><Minus className="w-3 h-3 text-indigo-700" /></button>
                     <span className="font-mono text-sm font-bold w-4 text-center text-indigo-900">{m.rows}</span>
                     <button onClick={() => updateMatrixSize(m.name, 'rows', 1)} className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded hover:bg-indigo-50" aria-label="Increase rows"><Plus className="w-3 h-3 text-indigo-700" /></button>
                  </div>
                  <div className="flex gap-2">
                     <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">COLS</span>
                     <button onClick={() => updateMatrixSize(m.name, 'cols', -1)} className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded hover:bg-indigo-50" aria-label="Decrease columns"><Minus className="w-3 h-3 text-indigo-700" /></button>
                     <span className="font-mono text-sm font-bold w-4 text-center text-indigo-900">{m.cols}</span>
                     <button onClick={() => updateMatrixSize(m.name, 'cols', 1)} className="w-6 h-6 flex items-center justify-center bg-white border border-indigo-200 rounded hover:bg-indigo-50" aria-label="Increase columns"><Plus className="w-3 h-3 text-indigo-700" /></button>
                  </div>
               </div>
               
               {/* Grid Inputs */}
               <div className="flex-1 flex justify-center w-full overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex flex-col gap-1.5 border-l-2 border-r-2 border-indigo-900 px-2 py-1">
                     {m.data.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1.5">
                           {row.map((cell, cIdx) => (
                              <input 
                                key={cIdx}
                                type="text"
                                value={cell}
                                onChange={(e) => updateMatrixCell(m.name, rIdx, cIdx, e.target.value)}
                                className="w-10 h-10 md:w-14 md:h-12 border border-slate-300 rounded bg-white text-center font-serif text-sm md:text-lg text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                placeholder="..."
                              />
                           ))}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         ))}

         {/* 2. Evaluation Results List */}
         {evaluations.map(ev => (
            <div key={ev.id} className="flex flex-col items-end gap-2 w-full border-b border-slate-50 pb-4">
               <div className="text-xl md:text-2xl text-slate-600 font-serif w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {ev.raw}
               </div>

               {Array.isArray(ev.result) ? (
                  <div className="flex border-l-[3px] border-r-[3px] border-slate-800 px-3 py-1 bg-slate-50/50 my-2">
                     <div className="flex flex-col gap-2">
                        {ev.result.map((row, i) => (
                           <div key={i} className="flex gap-4">
                              {row.map((cell, j) => (
                                 <div key={j} className="w-16 text-center font-bold text-slate-800 font-serif text-xl">{cell}</div>
                              ))}
                           </div>
                        ))}
                     </div>
                  </div>
               ) : (
                  <div className={`text-2xl md:text-4xl font-black w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide ${ev.error ? 'text-red-500' : 'text-slate-800'}`}>
                     {ev.error ? ev.result : `= ${ev.result}`}
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* Floating Current Input Field */}
      <div className="absolute left-0 right-0 px-4 md:px-12 pointer-events-none mb-[180px] sm:mb-[160px] bottom-0">
         <div className="flex justify-end items-center bg-white/90 backdrop-blur pb-4 pt-10 mask-gradient-top">
            <span className="text-3xl md:text-5xl font-serif text-indigo-900 tracking-wider">
               {currentInput}<span className="animate-blink font-sans font-light">|</span>
            </span>
         </div>
      </div>

      <MatrixKeypad />
      
      {/* Hidden Hardware Keyboard Binder */}
      <input 
         type="text" 
         className="absolute opacity-0 -z-10 focus:outline-none"
         autoFocus
         onChange={(e) => {
             // Basic regex blocking non math characters safely
             const v = e.target.value;
             if (/^[a-zA-Z0-9+\-*/(). ]*$/.test(v)) {
                setCurrentInput(v);
             }
         }}
         value={currentInput}
      />
    </div>
  );
}
