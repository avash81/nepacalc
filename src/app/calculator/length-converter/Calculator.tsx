'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ArrowLeftRight, Ruler } from 'lucide-react';

const UNITS: Record<string, { name: string; factor: number }> = {
  m:    { name: 'Meter (m)',          factor: 1        },
  km:   { name: 'Kilometer (km)',     factor: 1000     },
  cm:   { name: 'Centimeter (cm)',    factor: 0.01     },
  mm:   { name: 'Millimeter (mm)',    factor: 0.001    },
  mile: { name: 'Mile (mi)',          factor: 1609.34  },
  yard: { name: 'Yard (yd)',          factor: 0.9144   },
  foot: { name: 'Foot (ft)',          factor: 0.3048   },
  inch: { name: 'Inch (in)',          factor: 0.0254   },
};

const QUICK = [
  { label: '1 Kilometer to Meters', f: 'km', t: 'm', v: 1 },
  { label: '1 Mile to Kilometers',  f: 'mile', t: 'km', v: 1 },
  { label: '1 Foot to Inches',      f: 'foot', t: 'inch', v: 1 },
  { label: '1 Meter to Feet',       f: 'm', t: 'foot', v: 1 },
];

export default function LengthConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('km');
  const [to, setTo] = useState('m');

  const result = useMemo(() => {
    const r = (value * UNITS[from].factor) / UNITS[to].factor;
    return r.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, from, to]);

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  const inputCls = "w-full h-14 px-4 border border-[#DADCE0] rounded-lg bg-white text-lg font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const selectCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] text-sm font-bold focus:border-[#1A73E8] outline-none transition-all cursor-pointer text-[#202124]";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Length Converter' }]}
      title="Length & Distance Converter"
      description="Convert seamlessly between meters, kilometers, miles, feet, inches and more with engineering-grade decimal precision."
      icon={Ruler}
      inputs={
        <div className="space-y-6">
          <div>
            <label className={labelCls}>Value to Convert</label>
            <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} min={0} className={`${inputCls} font-mono text-2xl`} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className={labelCls}>From Unit</label>
              <select value={from} onChange={e => setFrom(e.target.value)} className={selectCls}>
                {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
            
            <button onClick={swap} className="mt-6 w-12 h-12 shrink-0 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center hover:bg-[#1A73E8] hover:text-white transition-colors border border-[#C5D9F7] shadow-sm">
              <ArrowLeftRight className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <label className={labelCls}>To Unit</label>
              <select value={to} onChange={e => setTo(e.target.value)} className={selectCls}>
                {Object.entries(UNITS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#DADCE0]">
            <label className={labelCls}>Quick Pre-set Conversions</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUICK.map(q => (
                <button key={q.label} onClick={() => { setValue(q.v); setFrom(q.f); setTo(q.t); }}
                  className="p-4 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-left transition-all group flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">{q.label}</span>
                  <span className="text-sm font-black font-mono text-[#1A73E8] group-hover:underline">
                    {((q.v * UNITS[q.f].factor) / UNITS[q.t].factor).toFixed(4)} {q.t}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] rounded-lg border border-[#DADCE0] p-8 text-center relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <div className="text-[10px] font-bold uppercase tracking-wider text-[#8AB4F8] mb-2 relative z-10">Converted Result</div>
             <div className="text-5xl font-black text-white tracking-tighter mb-2 font-mono break-all relative z-10">{result}</div>
             <div className="text-xs font-bold text-white/70 uppercase tracking-widest relative z-10 bg-white/5 inline-flex px-3 py-1 rounded">
               {UNITS[to].name}
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Conversion Metrics</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold uppercase tracking-wider">Original Input</span>
                   <span className="font-black text-[#202124]">{value} {UNITS[from].name}</span>
                </div>
                <div className="p-4 flex justify-between items-center text-xs">
                   <span className="text-[#5F6368] font-bold uppercase tracking-wider">Multiplication Factor</span>
                   <span className="font-black font-mono text-[#1A73E8]">{(UNITS[from].factor / UNITS[to].factor).toFixed(6)}</span>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the numerical length or distance value you wish to convert.", "Select the starting unit from the 'From' dropdown.", "Select the desired unit from the 'To' dropdown.", "Use the swap button to instantly reverse the conversion direction."] }}
      formula={{ title: "Conversion Algorithm", description: "Standardized SI Base scaling.", raw: "All length metrics are first converted internally to the SI standard Base Unit (Meters), then multiplied by the inverse factor of the target unit.\n\nResult = (Input × From_Base_Factor) / To_Base_Factor" }}
      faqs={[
        { question: "What is an SI Unit?", answer: "The International System of Units (SI) is the modern form of the metric system. For length, the standard base unit is the Meter (m)." },
        { question: "Why is the factor decimal long?", answer: "Imperial units (miles, feet, inches) do not convert to metric (meters) using clean round numbers. For instance, 1 inch is precisely defined as exactly 25.4 millimeters." }
      ]}
      sidebar={{ title: "Conversion Tools", links: [{ label: "Weight Converter", href: "/calculator/weight-converter" }, { label: "Temperature Converter", href: "/calculator/temperature-converter" }], banner: { title: "Global Standards", description: "Only three countries in the world still officially use the Imperial system.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Weight Converter", href: "/calculator/weight-converter" }]}
    />
  );
}
