'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Terminal, Cpu, Braces } from 'lucide-react';

interface ConversionResult { dec: string; bin: string; hex: string; oct: string; char: string | null; logic: { and: string; or: string; xor: string }; }
interface ErrorResult { error: string; }
type BaseResult = ConversionResult | ErrorResult | null;

export default function BaseConverter() {
  const [val, setVal] = useState('255');
  const [val2, setVal2] = useState('0');
  const [base, setBase] = useState<number>(10);

  const res = useMemo<BaseResult>(() => {
    if (val.length > 64) return { error: 'Input too long (max 64 chars)' };
    if (!val.trim()) return null;
    try {
      const cleanVal = val.trim();
      const decStr = base === 16 ? `0x${cleanVal}` : base === 8 ? `0o${cleanVal}` : base === 2 ? `0b${cleanVal}` : cleanVal;
      const dec = BigInt(decStr);
      const char = Number(dec) <= 126 && Number(dec) >= 32 ? String.fromCharCode(Number(dec)) : null;
      const paddedBin = dec.toString(2).padStart(8, '0');
      let logic = { and: '0', or: '0', xor: '0' };
      try {
        const d2 = BigInt(val2);
        logic = { and: (dec & d2).toString(10), or: (dec | d2).toString(10), xor: (dec ^ d2).toString(10) };
      } catch { /* ignore */ }
      return { dec: dec.toString(10), bin: paddedBin, hex: dec.toString(16).toUpperCase(), oct: dec.toString(8), char, logic };
    } catch { return { error: 'Invalid input for selected base' }; }
  }, [val, val2, base]);

  const d = useMemo(() => {
    if (res && 'dec' in res) { const r = res as ConversionResult; return { dec: r.dec, bin: r.bin, hex: r.hex, oct: r.oct, char: r.char, logic: r.logic }; }
    return { dec: '—', bin: '—', hex: '—', oct: '—', char: null, logic: { and: '0', or: '0', xor: '0' } };
  }, [res]);

  const BASES = [{ id: 10, l: 'Decimal' }, { id: 2, l: 'Binary' }, { id: 16, l: 'Hex' }, { id: 8, l: 'Octal' }];

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Base Converter' }]}
      title="Number Base Converter"
      description="Convert numbers instantly between Decimal, Binary, Hexadecimal, and Octal formats. Includes bitwise logic operations and ASCII preview."
      icon={Braces}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Input Base System</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {BASES.map(b => (
                <button key={b.id} onClick={() => setBase(b.id)} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${base === b.id ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {b.l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelCls}>Enter {BASES.find(b => b.id === base)?.l} Value</label>
            <input type="text" value={val} onChange={e => setVal(e.target.value.toUpperCase())} maxLength={64} className={`${inputCls} font-mono text-lg tracking-widest uppercase`} placeholder="255" />
            {res && 'error' in res && <p className="text-[10px] text-[#D93025] font-bold mt-1 px-1">{(res as ErrorResult).error}</p>}
          </div>

          <div className="space-y-3">
            <label className={labelCls}>Common Value Presets</label>
            <div className="grid grid-cols-4 gap-2">
              {['255', '1024', '65535', '16777215'].map(pv => (
                <button key={pv} onClick={() => { setBase(10); setVal(pv); }} className="py-2 bg-white border border-[#DADCE0] text-[#70757A] rounded font-mono text-[10px] font-bold hover:bg-[#F8F9FA] transition-colors">{parseInt(pv).toLocaleString()}</button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg space-y-4">
             <label className={labelCls}>Bitwise Logic Test (Operand 2)</label>
             <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className={inputCls} placeholder="Enter Decimal Operand 2" />
             
             <div className="grid grid-cols-3 gap-2">
               {[['AND', d.logic.and], ['OR', d.logic.or], ['XOR', d.logic.xor]].map(([op, v]) => (
                 <div key={op} className="bg-white border border-[#DADCE0] rounded p-2 text-center">
                    <div className="text-[9px] font-bold text-[#70757A] uppercase mb-1">{op}</div>
                    <div className="text-sm font-black text-[#1A73E8] font-mono">{v}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          {[
            { l: 'Binary (Base 2)', v: d.bin, color: 'text-[#1A73E8]', bg: 'bg-[#E8F0FE]', border: 'border-[#C5D9F7]' },
            { l: 'Hexadecimal (Base 16)', v: d.hex !== '—' ? `0x${d.hex}` : '—', color: 'text-[#E37400]', bg: 'bg-[#FFF7E0]', border: 'border-[#FEEFC3]' },
            { l: 'Octal (Base 8)', v: d.oct, color: 'text-[#188038]', bg: 'bg-[#E6F4EA]', border: 'border-[#CEEAD6]' },
            { l: 'Decimal (Base 10)', v: d.dec, color: 'text-[#202124]', bg: 'bg-white', border: 'border-[#DADCE0]' },
          ].map(item => (
            <div key={item.l} className={`p-5 ${item.bg} border ${item.border} rounded-lg flex flex-col gap-1`}>
               <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">{item.l}</span>
               <span className={`text-lg sm:text-xl font-black font-mono tracking-tight break-all ${item.color}`}>{item.v}</span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center flex flex-col items-center justify-center gap-2">
              <Terminal className="w-5 h-5 text-[#70757A]" />
              <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider">ASCII Char</div>
              <div className="text-2xl font-black text-[#1A73E8] font-mono">{d.char || '—'}</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center flex flex-col items-center justify-center gap-2">
              <Cpu className="w-5 h-5 text-[#70757A]" />
              <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider">Memory Size</div>
              <div className="text-2xl font-black text-[#188038] font-mono">{d.hex !== '—' ? Math.ceil(d.hex.length / 2) : '0'}b</div>
            </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your starting numeral system (Decimal, Binary, Hex, or Octal).", "Input the value to convert. The system automatically rejects invalid characters for that base.", "All output bases update instantly.", "Optional: Test bitwise operations (AND, OR, XOR) against a secondary decimal value."] }}
      formula={{ title: "Base Mathematics", description: "Standard radix conversions.", raw: "Base 10 (Decimal): Standard human counting (0-9)\nBase 2 (Binary): Computer logical bits (0-1)\nBase 16 (Hexadecimal): Byte shorthand (0-9, A-F)\nBase 8 (Octal): Older computing shorthand (0-7)" }}
      faqs={[
        { question: "Why is Hexadecimal important?", answer: "Hexadecimal (Base 16) is a very compact way to represent binary data. One hex digit perfectly represents 4 binary bits (a nibble). It is standard in programming for color codes and memory addresses." },
        { question: "What does the Memory Size mean?", answer: "Memory size estimates the minimum number of bytes required to store the entered number in a computer's RAM, calculated based on the hexadecimal length." }
      ]}
      sidebar={{ title: "Computer Science", links: [{ label: "Number to Words", href: "/calculator/number-to-words" }, { label: "Password Generator", href: "/calculator/password-generator" }], banner: { title: "Programmer Setup", description: "Use Hex and Binary for bitmasking and flag configuration.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Number to Words", href: "/calculator/number-to-words" }]}
    />
  );
}
