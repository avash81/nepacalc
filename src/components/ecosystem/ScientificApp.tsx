'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import { VirtualKeypad } from './VirtualKeypad';
import { History as HistoryIcon, Trash2, Delete, Calculator as CalculatorIcon, Settings2, Zap } from 'lucide-react';

interface HistoryItem {
  id: string;
  raw: string;
  result: string | null;
  error: boolean;
  timestamp: Date;
}

export function ScientificApp({ mode }: { mode: 'scientific' | 'basic' }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [angleUnit, setAngleUnit] = useState<'deg' | 'rad'>('deg');
  const tapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tapeRef.current) {
      tapeRef.current.scrollTop = tapeRef.current.scrollHeight;
    }
  }, [history]);

  const handleInput = useCallback((val: string) => {
    setIsError(false);
    setCurrentInput(prev => prev + val);
  }, []);

  const handleAction = useCallback((action: 'DELETE' | 'CLEAR' | 'EVALUATE' | 'ANS' | 'TOGGLE_UNIT') => {
    setIsError(false);
    
    if (action === 'TOGGLE_UNIT') {
      setAngleUnit(prev => prev === 'deg' ? 'rad' : 'deg');
    } else if (action === 'CLEAR') {
      setCurrentInput('');
    } else if (action === 'DELETE') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (action === 'ANS') {
      const lastSuccess = [...history].reverse().find(h => !h.error && h.result !== null);
      if (lastSuccess) {
        setCurrentInput(prev => prev + lastSuccess.result);
      }
    } else if (action === 'EVALUATE') {
      if (!currentInput.trim()) return;

      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        raw: currentInput,
        result: null,
        error: false,
        timestamp: new Date()
      };

      try {
        // Engineering Recalibration: Handle degrees by wrapping trig functions
        let sanitized = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'pi')
          .replace(/e/g, 'e');

        if (angleUnit === 'deg') {
           // Casio-style degree transformation for trig functions
           sanitized = sanitized.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, (match, func, args) => {
              if (func.startsWith('a')) return `${func}(${args}) * (180 / pi)`; // Inverse trig returns deg
              return `${func}((${args}) * (pi / 180))`; // Standard trig takes rad
           });
        }

        const res = math.evaluate(sanitized);
        newItem.result = typeof res === 'number' 
          ? math.format(res, { precision: 12, lowerExp: -12, upperExp: 12 }) 
          : res.toString();
        
        setCurrentInput(newItem.result as string);
      } catch (err) {
        newItem.error = true;
        newItem.result = 'Invalid Operation';
        setIsError(true);
      }

      setHistory(prev => [...prev, newItem]);
    }
  }, [currentInput, history, angleUnit]);

  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden relative border-x border-slate-100 shadow-2xl h-full">
      
      {/* 🔬 ENGINEERING STATUS BAR */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#1a4b8c] text-white z-30">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
               <Settings2 className="w-3 h-3 text-[#FFC107]" /> Engineering Mode
            </span>
            <div className="h-3 w-[1px] bg-white/20" />
            <button 
               onClick={() => handleAction('TOGGLE_UNIT')}
               className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded transition-all ${angleUnit === 'deg' ? 'bg-[#FFC107] text-black shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
               DEG
            </button>
            <button 
               onClick={() => handleAction('TOGGLE_UNIT')}
               className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded transition-all ${angleUnit === 'rad' ? 'bg-[#FFC107] text-black shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
               RAD
            </button>
         </div>
         <div className="flex items-center gap-2 text-[9px] font-bold opacity-60 uppercase tracking-widest">
            <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Precision: 12-DIGIT
         </div>
      </div>

      {/* 📊 HISTORY TAPE SECTION */}
      <div 
        ref={tapeRef}
        className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-[#f8f9fa] scroll-smooth"
      >
        <div className="flex justify-between items-center sticky top-0 bg-[#f8f9fa]/80 backdrop-blur-sm z-10 pb-4 border-b border-black/5">
           <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a4b8c]">
             <HistoryIcon className="w-3 h-3" /> Laboratory Tape
           </span>
           {history.length > 0 && (
             <button onClick={() => setHistory([])} className="p-2 hover:bg-red-50 text-red-400 rounded-lg">
               <Trash2 className="w-4 h-4" />
             </button>
           )}
        </div>

        {history.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 py-20">
             <CalculatorIcon className="w-16 h-16 mb-4 text-[#1a4b8c]" />
             <p className="text-xs font-black uppercase tracking-widest text-[#1a4b8c]">Awaiting Engineering Signal</p>
          </div>
        )}

        {history.map(item => (
          <div key={item.id} className="flex flex-col items-end gap-2 animate-in slide-in-from-right-4 duration-300">
             <div className="text-sm text-slate-400 font-medium tracking-wide">{item.raw}</div>
             <div className={`text-2xl md:text-3xl font-black ${item.error ? 'text-red-500' : 'text-[#1a4b8c]'} flex items-center gap-3`}>
                <span className="text-slate-200 text-lg font-normal">=</span>
                {item.result}
             </div>
          </div>
        ))}
      </div>

      {/* 💻 ENGINE DISPLAY */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 py-8 flex flex-col items-end relative shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
         <div className="text-right w-full overflow-hidden">
            <div className={`text-4xl md:text-6xl font-black tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide pb-2 ${isError ? 'text-red-500' : 'text-slate-900'}`}>
               {currentInput || '0'}<span className="w-1 h-10 md:h-14 bg-[#FFC107] inline-block align-middle ml-1 animate-pulse" />
            </div>
         </div>
      </div>

      {/* 🔡 ENGINEERING KEYPAD */}
      <div className="shrink-0 bg-[#f1f3f5] p-1 md:p-3 relative z-20">
         <VirtualKeypad 
           mode={mode} 
           onInput={handleInput} 
           onAction={handleAction as any} 
         />
      </div>

    </div>
  );
}
