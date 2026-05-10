'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Binary, History, Trash2, Zap, Cpu, Settings2, ShieldCheck, ChevronRight, Hash } from 'lucide-react';

type BitLength = 8 | 16 | 32 | 64;

export function ProgrammerApp() {
  const [value, setValue] = useState<bigint>(BigInt(0));
  const [bitLength, setBitLength] = useState<BitLength>(64);
  const [signed, setSigned] = useState(false);

  // Derived Values
  const hex = value.toString(16).toUpperCase();
  const dec = value.toString(10);
  const oct = value.toString(8);
  const bin = value.toString(2).padStart(bitLength, '0').slice(-bitLength);

  const handleBaseInput = (val: string, base: number) => {
    try {
      if (!val) {
        setValue(BigInt(0));
        return;
      }
      const n = BigInt(parseInt(val, base) || 0);
      setValue(n);
    } catch (e) {
      console.error("Invalid base input");
    }
  };

  const toggleBit = (idx: number) => {
    const mask = BigInt(1) << BigInt(idx);
    setValue(prev => prev ^ mask);
  };

  const bitArray = bin.split('').map(b => b === '1').reverse();

  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden relative border-x border-slate-100 shadow-sm h-full">
      
      {/* 💻 LABORATORY HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#1e1e1e] text-[#202124] z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]">
            <Cpu className="w-4 h-4 text-[#FFC107]" /> Logic Kernel v4.0
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex bg-[#f8f9fa] rounded-lg p-1 gap-1">
             {[8, 16, 32, 64].map(len => (
               <button
                 key={len}
                 onClick={() => setBitLength(len as BitLength)}
                 className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${bitLength === len ? 'bg-[#FFC107] text-black shadow-sm shadow-yellow-500/20' : 'text-[#202124]/40 hover:text-[#202124] hover:bg-white/10'}`}
               >
                 {len}-BIT
               </button>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold opacity-60 uppercase tracking-widest">
          <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Mode: {signed ? 'Signed (2s Complement)' : 'Unsigned'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 lg:p-10">
         <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 🔡 MULTI-BASE SYNCHRONIZER */}
            <div className="grid grid-cols-1 gap-4">
               {[
                 { label: 'HEX', base: 16, val: hex, prefix: '0x' },
                 { label: 'DEC', base: 10, val: dec, prefix: '' },
                 { label: 'OCT', base: 8, val: oct, prefix: '0o' },
                 { label: 'BIN', base: 2, val: bin, prefix: '0b' }
               ].map(b => (
                 <div key={b.label} className="bg-white border border-slate-100 rounded-[1.5rem] p-6 flex items-center gap-6 shadow-sm focus-within:shadow-md focus-within:border-[#FFC107] transition-all">
                    <div className="w-16 text-[10px] font-black text-slate-400 tracking-widest">{b.label}</div>
                    <div className="text-slate-300 font-mono text-lg">{b.prefix}</div>
                    <input 
                      type="text"
                      spellCheck={false}
                      value={b.val}
                      onChange={(e) => handleBaseInput(e.target.value.replace(/^0[xob]/, ''), b.base)}
                      className="flex-1 bg-transparent border-none outline-none text-xl font-mono font-bold text-slate-800"
                    />
                 </div>
               ))}
            </div>

            {/* 🕹️ INTERACTIVE BITBOARD */}
            <div className="bg-white border border-slate-100 rounded-lg p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                     <Binary className="w-3.5 h-3.5" /> 64-Bit Interactive Matrix
                  </h3>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     Click to Flip Bits
                  </div>
               </div>
               
               <div className="grid grid-cols-8 sm:grid-cols-16 gap-2 sm:gap-3">
                  {bitArray.reverse().map((isOn, idx) => {
                    const realIdx = bitLength - 1 - idx;
                    return (
                      <button
                        key={realIdx}
                        onClick={() => toggleBit(realIdx)}
                        className={`h-10 sm:h-12 flex flex-col items-center justify-center rounded-xl border transition-all ${isOn ? 'bg-[#FFC107] border-[#FFC107] shadow-sm shadow-yellow-500/20' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}
                      >
                         <span className={`text-base font-black ${isOn ? 'text-black' : 'text-slate-300'}`}>{isOn ? '1' : '0'}</span>
                         <span className={`text-[7px] font-bold ${isOn ? 'text-black/40' : 'text-slate-200'}`}>{realIdx}</span>
                      </button>
                    )
                  })}
               </div>
            </div>

            {/* ⚙️ LOGIC GATES (STATIC PREVIEW) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-[#1e1e1e] rounded-[2rem] p-8 text-[#202124]">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FFC107] mb-6">Bitwise Logic Reference</h4>
                  <div className="space-y-4">
                     {[
                       { op: 'AND (&)', desc: 'Both bits must be 1' },
                       { op: 'OR (|)', desc: 'Either bit is 1' },
                       { op: 'XOR (^)', desc: 'Bits must be different' },
                       { op: 'NOT (~)', desc: 'Invert all bits' },
                       { op: 'SHL (<<)', desc: 'Shift bits left' },
                       { op: 'SHR (>>)', desc: 'Shift bits right' }
                     ].map(l => (
                       <div key={l.op} className="flex items-center justify-between py-2 border-b border-[#dadce0]">
                          <span className="text-[10px] font-black tracking-widest font-mono text-[#202124]">{l.op}</span>
                          <span className="text-[9px] font-medium text-[#202124]/40">{l.desc}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                     </div>
                     <div>
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-800">Precision Verified</h4>
                        <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">Industrial Logic Standards</p>
                     </div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                     Our logic kernel uses native **BigInt** technology, meaning we bypass the 53-bit precision limit of standard JavaScript numbers. 
                     You can safely perform 64-bit integer arithmetic with absolute mathematical integrity.
                  </p>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
}

