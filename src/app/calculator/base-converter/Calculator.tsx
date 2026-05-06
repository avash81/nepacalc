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
    return { dec: ', ', bin: ', ', hex: ', ', oct: ', ', char: null, logic: { and: '0', or: '0', xor: '0' } };
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
            { l: 'Binary (Base 2)', v: d.bin, icon: Cpu },
            { l: 'Hexadecimal (Base 16)', v: d.hex !== ', ' ? `0x${d.hex}` : ', ', icon: Terminal },
            { l: 'Octal (Base 8)', v: d.oct, icon: Braces },
            { l: 'Decimal (Base 10)', v: d.dec, icon: Terminal },
          ].map(item => (
            <div key={item.l} className="p-5 bg-white border border-[#DADCE0] rounded-lg flex flex-col gap-1 shadow-sm">
               <div className="flex items-center gap-2 mb-1">
                  <item.icon className="w-3.5 h-3.5 text-[#70757A]" />
                  <span className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">{item.l}</span>
               </div>
               <span className="text-xl font-black font-mono tracking-tight break-all text-[#202124]">{item.v}</span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center flex flex-col items-center justify-center gap-2">
              <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider">ASCII Character</div>
              <div className="text-2xl font-black text-[#1A73E8] font-mono">{d.char || ', '}</div>
            </div>
            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center flex flex-col items-center justify-center gap-2">
              <div className="text-[9px] font-bold uppercase text-[#70757A] tracking-wider">Memory Footprint</div>
              <div className="text-2xl font-black text-[#1A73E8] font-mono">{d.hex !== ', ' ? Math.ceil(d.hex.length / 2) : '0'} Byte(s)</div>
            </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Radix Transformation Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for multi-base numeral transformations. This tool provides high-precision conversion between 
                <strong> Binary</strong>, <strong>Decimal</strong>, <strong>Hexadecimal</strong>, and <strong>Octal</strong> systems. 
                Designed for systems engineering and computer science pedagogy, it includes bitwise logic verification and memory footprint analysis.
             </p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your starting numeral system (Decimal, Binary, Hex, or Octal).", "Input the value to convert. The system automatically rejects invalid characters for that base.", "All output bases update instantly.", "Optional: Test bitwise operations (AND, OR, XOR) against a secondary decimal value."] }}
      formula={{ title: "Base Mathematics", description: "Standard radix conversions.", raw: "Base 10 (Decimal): Standard human counting (0-9)\nBase 2 (Binary): Computer logical bits (0-1)\nBase 16 (Hexadecimal): Byte shorthand (0-9, A-F)\nBase 8 (Octal): Older computing shorthand (0-7)" }}
      faqs={[
        { question: "Why is Hexadecimal important in programming?", answer: "Hexadecimal (Base 16) is a compact representation of binary data. One hex digit perfectly represents 4 binary bits (a nibble), and two hex digits represent one byte. It is the standard in programming for: color codes (#FF5733), memory addresses (0x7FFE), CPU registers, and network MAC addresses." },
        { question: "What does the Memory Size output mean?", answer: "Memory size estimates the minimum number of bytes required to store the entered number in a computer's RAM. It is calculated from the hexadecimal digit length ,  every 2 hex digits represent 1 byte. For example, the number 255 = 0xFF requires 1 byte. 65535 = 0xFFFF requires 2 bytes." },
        { question: "How does Binary (Base 2) relate to computer hardware?", answer: "Binary is the native language of all digital electronics. Each binary digit (bit) corresponds to a transistor state: 0 = off, 1 = on. Modern CPUs process 64 bits simultaneously (64-bit architecture). All images, audio, and text files are ultimately stored as combinations of 0s and 1s at the hardware level." },
        { question: "What are bitwise AND, OR, and XOR operations used for?", answer: "Bitwise operations work on individual bits: AND (both bits must be 1 → result 1) is used for masking/filtering. OR (at least one bit is 1 → result 1) is used for setting flags. XOR (exactly one bit is 1 → result 1) is used for toggling bits, checksums, and encryption. They are fundamental in systems programming, embedded development, and network protocols." },
        { question: "What is Octal (Base 8) used for?", answer: "Octal was widely used in early computing and is still relevant today for Unix/Linux file permissions. The permission string 'rwxr-xr-x' equals octal 755: owner=7 (rwx=111), group=5 (r-x=101), others=5 (r-x=101). Understanding octal is essential for system administration in Linux environments." },
        { question: "What is ASCII and why does this converter show it?", answer: "ASCII (American Standard Code for Information Interchange) maps numbers 32–126 to printable characters. For example, decimal 65 = 'A', 97 = 'a', 48 = '0'. This converter shows the ASCII character when the decimal value is between 32 and 126, which is useful for understanding character encoding in programming and data processing." }
      ]}
      sidebar={{ title: "Computer Science", links: [
          { label: "Number to Words", href: "/calculator/number-to-words/" }, { label: "Password Generator", href: "/calculator/password-generator/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
        ], banner: { title: "Programmer Setup", description: "Use Hex and Binary for bitmasking and flag configuration.", image: "/images/math-banner.jpg" } }}
      relatedTools={[
        { label: "Number to Words", href: "/calculator/number-to-words/" },
        { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
      ]}
    />
  );
}
