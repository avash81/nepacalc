'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as math from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Solve';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { FunctionSquare, History as HistoryIcon, Trash2, Settings2, Zap, BrainCircuit, Sigma, ChevronRight, Calculator, Info } from 'lucide-react';

interface CalculationResult {
  id: string;
  expression: string;
  operation: 'Derivation' | 'Integration' | 'Simplify' | 'Solve';
  result: string;
  latex: string;
  steps?: { label: string; formula: string }[];
  timestamp: Date;
}

export function CalculusApp() {
  const [expression, setExpression] = useState('');
  const [operation, setOperation] = useState<'Derivation' | 'Integration' | 'Simplify' | 'Solve'>('Derivation');
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [isError, setIsError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const toLatex = (expr: string) => {
    try {
      return nerdamer(expr).toTeX();
    } catch (e) {
      return expr;
    }
  };

  const performCalculation = useCallback(() => {
    if (!expression.trim()) return;

    const id = Math.random().toString(36).substr(2, 9);
    let result = '';
    let latex = '';
    let steps: { label: string; formula: string }[] = [];

    try {
      if (operation === 'Derivation') {
        const d = math.derivative(expression, 'x');
        result = d.toString();
        latex = toLatex(result);
        steps = [
          { label: 'Evaluation Target', formula: `\\frac{d}{dx} (${toLatex(expression)})` },
          { label: 'Applying Differentiation Rules', formula: latex }
        ];
      } else if (operation === 'Integration') {
        const i = nerdamer(`integrate(${expression}, x)`);
        result = i.toString();
        latex = `${i.toTeX()} + C`;
        steps = [
          { label: 'Indefinite Integral', formula: `\\int (${toLatex(expression)}) \\, dx` },
          { label: 'Resulting Anti-derivative', formula: latex }
        ];
      } else if (operation === 'Simplify') {
        const s = math.simplify(expression);
        result = s.toString();
        latex = toLatex(result);
        steps = [
          { label: 'Original Polynomial', formula: toLatex(expression) },
          { label: 'Simplified Form', formula: latex }
        ];
      } else if (operation === 'Solve') {
        const eq = expression.includes('=') ? expression : `${expression} = 0`;
        const sol = nerdamer.solve(eq, 'x');
        result = sol.toString();
        latex = `x = ${toLatex(result)}`;
        steps = [
          { label: 'Solving for Variable x', formula: toLatex(eq) },
          { label: 'Roots Found', formula: latex }
        ];
      }

      setHistory(prev => [...prev, {
        id,
        expression,
        operation,
        result,
        latex,
        steps,
        timestamp: new Date()
      }]);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    }
  }, [expression, operation]);

  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden relative border-x border-slate-100 shadow-2xl h-full">
      
      {/* 🧪 LABORATORY HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#0a0a0a] text-white z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]">
            <BrainCircuit className="w-4 h-4 text-[#FFC107]" /> Calculus Laboratory v4.0
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex bg-white/5 rounded-lg p-1">
             {(['Derivation', 'Integration', 'Simplify', 'Solve'] as const).map(op => (
               <button
                 key={op}
                 onClick={() => setOperation(op)}
                 className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${operation === op ? 'bg-[#FFC107] text-black shadow-lg shadow-yellow-500/20 scale-105' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
               >
                 {op}
               </button>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold opacity-60 uppercase tracking-widest">
          <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Mode: Symbolic Engine
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#F8F9FA]">
        
        {/* 📚 SOLUTION HISTORY TAPE */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8 scroll-smooth" ref={scrollRef}>
          <div className="flex justify-between items-center sticky top-0 bg-[#F8F9FA]/80 backdrop-blur-md z-10 pb-4 border-b border-black/5">
             <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
               <HistoryIcon className="w-3 h-3" /> Universal Solution Queue
             </span>
             {history.length > 0 && (
               <button onClick={() => setHistory([])} className="p-2 hover:bg-red-50 text-red-400 rounded-lg group transition-colors">
                 <Trash2 className="w-4 h-4 group-active:scale-90" />
               </button>
             )}
          </div>

          {history.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20 opacity-30">
               <div className="w-20 h-20 rounded-[2.5rem] bg-white flex items-center justify-center mb-6 shadow-sm">
                  <FunctionSquare className="w-10 h-10 text-slate-400" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Awaiting Signal Input</p>
            </div>
          )}

          {history.map(item => (
            <div key={item.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-350 active:scale-[0.99] transition-all">
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FFC107] bg-black px-3 py-1 rounded-full">
                           {item.operation}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.timestamp.toLocaleTimeString()}</span>
                     </div>
                     <div className="mt-4">
                        <InlineMath math={toLatex(item.expression)} />
                     </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FFC107]">
                     {item.operation === 'Integration' ? <Sigma className="w-6 h-6" /> : <FunctionSquare className="w-6 h-6" />}
                  </div>
               </div>

               <div className="space-y-6 mb-10">
                  {item.steps?.map((step, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-[#FFC107]" /> {step.label}
                       </span>
                       <div className="pl-5 overflow-x-auto scrollbar-hide">
                          <InlineMath math={step.formula} />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="bg-[#fcf8e8] rounded-3xl p-8 border border-[#FFC107]/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                     <Zap className="w-20 h-20 fill-black text-black" />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#8a6d3b] mb-4">Institutional Result</div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 break-all overflow-x-auto scrollbar-hide">
                     <BlockMath math={item.latex} />
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* 🔡 UNIVERSAL PALETTE & INPUT */}
        <div className="w-full lg:w-[450px] bg-white border-l border-slate-100 flex flex-col p-8 shadow-2xl z-20">
           <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                 <Calculator className="w-4 h-4" /> Entry Console
              </span>
           </div>

           <div className="flex-1 flex flex-col gap-6">
              <div className="relative">
                 <textarea 
                   rows={3}
                   value={expression}
                   onChange={(e) => setExpression(e.target.value)}
                   placeholder={`Enter your function... (e.g. x^2 * sin(x))`}
                   className={`w-full bg-[#f8f9fa] border-2 ${isError ? 'border-red-100' : 'border-transparent focus:border-[#FFC107]'} rounded-[2rem] p-8 text-xl font-bold text-slate-800 placeholder:text-slate-200 outline-none transition-all resize-none shadow-inner`}
                 />
                 <button 
                   onClick={performCalculation}
                   className="absolute bottom-6 right-6 bg-black text-white px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-3 shadow-2xl"
                 >
                   Process <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                 </button>
              </div>

              {/* 🔢 UNIVERSAL SYMBOL PALETTE */}
              <div className="grid grid-cols-4 gap-3">
                 {[
                   { label: 'd/dx', val: 'diff(' }, { label: '∫', val: 'int(' }, { label: 'lim', val: 'limit(' }, { label: 'Σ', val: 'sum(' },
                   { label: 'x²', val: '^2' }, { label: 'xⁿ', val: '^' }, { label: '√', val: 'sqrt(' }, { label: '/', val: '/' },
                   { label: 'sin', val: 'sin(' }, { label: 'cos', val: 'cos(' }, { label: 'tan', val: 'tan(' }, { label: 'ln', val: 'log(' },
                   { label: 'π', val: 'pi' }, { label: 'e', val: 'e' }, { label: '∞', val: 'inf' }, { label: '(', val: '(' }
                 ].map(sym => (
                   <button 
                     key={sym.label}
                     onClick={() => setExpression(prev => prev + sym.val)}
                     className="h-14 bg-[#F8F9FA] hover:bg-[#FFC107] border border-slate-100 rounded-2xl text-[11px] font-black text-slate-600 hover:text-black transition-all active:scale-90"
                   >
                     {sym.label === '/' ? '÷' : sym.label}
                   </button>
                 ))}
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex gap-4">
                 <Info className="w-5 h-5 text-[#1a4b8c] shrink-0" />
                 <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-widest">
                    Tip: Use **x** as the primary variable. For equations, use **=** to trigger the solving kernel.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
