'use client';

import { useState, useRef, useEffect } from 'react';
import * as math from 'mathjs';
import { VirtualKeypad } from './VirtualKeypad';

interface HistoryItem {
  id: string;
  raw: string;
  result: string | null;
  error: boolean;
}

interface ScientificAppProps {
  mode: 'scientific' | 'basic';
}

export function ScientificApp({ mode }: ScientificAppProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const tapeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll tape to bottom when history updates
  useEffect(() => {
    if (tapeRef.current) {
      tapeRef.current.scrollTop = tapeRef.current.scrollHeight;
    }
  }, [history, currentInput]);

  const handleInput = (val: string) => {
    setCurrentInput(prev => prev + val);
  };

  const handleAction = (action: 'DELETE' | 'CLEAR' | 'EVALUATE' | 'ANS') => {
    if (action === 'CLEAR') {
      setCurrentInput('');
    } else if (action === 'DELETE') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (action === 'ANS') {
      // Find last successful evaluation
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
        error: false
      };

      try {
        // Sanitize for mathjs
        const sanitized = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/');

        const res = math.evaluate(sanitized);
        
        // Format to prevent massive irrational trails natively
        newItem.result = typeof res === 'number' 
          ? math.format(res, { precision: 12 }) 
          : res.toString();

      } catch (err) {
        newItem.error = true;
        newItem.result = 'Error';
      }

      setHistory(prev => [...prev, newItem]);
      setCurrentInput(''); // Clear input ready for next equation
    }
  };

  // Allow physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't grab if user is typing in some specific form input field on another part of the page 
      // (not currently applicable but safe practice)
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'Enter') {
         e.preventDefault();
         handleAction('EVALUATE');
      } else if (e.key === 'Backspace') {
         handleAction('DELETE');
      } else if (e.key === 'Escape') {
         handleAction('CLEAR');
      } else if (e.key.length === 1 && /[0-9+\-*/().A-Za-z^]/.test(e.key)) {
         handleInput(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentInput, history]);

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col bg-[#fdfdfd] overflow-hidden relative">
      
      {/* Upper Context (55%): The History Tape */}
      <div 
        ref={tapeRef}
        className="flex-1 overflow-y-auto px-4 md:px-12 py-8 flex flex-col gap-6 scroll-smooth bg-white"
        style={{ paddingBottom: '120px' }} // Room for current input
      >
        {history.length === 0 && !currentInput && (
           <div className="flex-1 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-lg md:text-2xl opacity-50">
             Ready for Math.
           </div>
        )}

        {history.map(item => (
          <div key={item.id} className="flex flex-col items-end gap-1 w-full border-b border-slate-50 pb-4">
             <div className="text-xl md:text-2xl text-slate-600 font-serif w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide">
                {item.raw}
             </div>
             <div className={`text-2xl md:text-4xl font-black w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide ${item.error ? 'text-red-500' : 'text-[#1a4b8c]'}`}>
                {item.error ? 'Syntax Error' : `= ${item.result}`}
             </div>
          </div>
        ))}
      </div>

      {/* Floating Current Input Field */}
      <div 
         className="absolute left-0 right-0 px-4 md:px-12 pointer-events-none"
         style={{ bottom: mode === 'scientific' ? '320px' : '240px' }} // Hover above keypad dynamically
      >
         <div className="flex justify-end items-center bg-white/90 backdrop-blur pb-4 pt-10 mask-gradient-top">
            <span className="text-3xl md:text-5xl font-serif text-slate-800 tracking-wider">
               {currentInput}<span className="animate-blink font-sans font-light">|</span>
            </span>
         </div>
      </div>

      {/* Bottom Context (45%): The Virtual Keypad */}
      <div className="w-full shrink-0 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] relative z-20">
         <VirtualKeypad 
           mode={mode} 
           onInput={handleInput} 
           onAction={handleAction} 
         />
      </div>

    </div>
  );
}
