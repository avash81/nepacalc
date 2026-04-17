'use client';

import { useState, useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { ArrowRightLeft, Ruler, Scale, Droplets, Maximize, Search, Zap } from 'lucide-react';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';

const UNIT_CATEGORIES: any = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: {
      m: { name: 'Meter', factor: 1 },
      km: { name: 'Kilometer', factor: 0.001 },
      cm: { name: 'Centimeter', factor: 100 },
      mm: { name: 'Millimeter', factor: 1000 },
      mi: { name: 'Mile', factor: 0.000621371 },
      yd: { name: 'Yard', factor: 1.09361 },
      ft: { name: 'Foot', factor: 3.28084 },
      in: { name: 'Inch', factor: 39.3701 },
    },
  },
  weight: {
    name: 'Weight',
    icon: Scale,
    units: {
      kg: { name: 'Kilogram', factor: 1 },
      g: { name: 'Gram', factor: 1000 },
      mg: { name: 'Milligram', factor: 1000000 },
      lb: { name: 'Pound', factor: 2.20462 },
      oz: { name: 'Ounce', factor: 35.274 },
      ton: { name: 'Metric Ton', factor: 0.001 },
      stone: { name: 'Stone', factor: 0.157473 },
    },
  },
  volume: {
    name: 'Volume',
    icon: Droplets,
    units: {
      l: { name: 'Liter', factor: 1 },
      ml: { name: 'Milliliter', factor: 1000 },
      m3: { name: 'Cubic Meter', factor: 0.001 },
      gallon: { name: 'US Gallon', factor: 0.264172 },
      cup: { name: 'Cup', factor: 4.22675 },
    },
  },
  area: {
    name: 'Area',
    icon: Maximize,
    units: {
      sqm: { name: 'Sq Meter', factor: 1 },
      sqkm: { name: 'Sq Kilometer', factor: 0.000001 },
      hectare: { name: 'Hectare', factor: 0.0001 },
      acre: { name: 'Acre', factor: 0.000247105 },
      sqft: { name: 'Sq Foot', factor: 10.7639 },
    }
  }
};

const DEFAULT_STATE = {
  category: 'length' as keyof typeof UNIT_CATEGORIES,
  fromUnit: 'm',
  toUnit: 'km',
  value: 1,
};

export default function UnitConverter() {
  const [state, setState] = useSyncState('unit_conv_v3', DEFAULT_STATE);
  const [search, setSearch] = useState('');
  
  const { category, fromUnit, toUnit, value } = state;
  const units = UNIT_CATEGORIES[category].units;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const swapUnits = () => {
    updateState({ fromUnit: toUnit, toUnit: fromUnit });
  };

  const filteredUnits = useMemo(() => {
    return Object.entries(units).filter(([k, u]: [string, any]) => 
      u.name.toLowerCase().includes(search.toLowerCase()) || k.toLowerCase().includes(search.toLowerCase())
    );
  }, [units, search]);

  const convert = useMemo(() => {
    if (value < 0) return { result: '0', error: 'Negative values not supported' };

    const fromFactor = units[fromUnit]?.factor || 1;
    const toFactor = units[toUnit]?.factor || 1;
    
    const baseValue = value / fromFactor;
    const resultValue = baseValue * toFactor;

    return {
      result: resultValue < 0.000001 && resultValue > 0 ? resultValue.toExponential(4) : resultValue.toLocaleString(undefined, { maximumFractionDigits: 6 }),
      raw: resultValue,
      fromLabel: units[fromUnit]?.name || '',
      toLabel: units[toUnit]?.name || '',
      error: null
    };
  }, [value, fromUnit, toUnit, units]);

  return (
    <CalculatorErrorBoundary calculatorName="Unit Converter">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                 <Zap className="w-3 h-3 fill-indigo-600" />
                 Instant Unit Conversion
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                Unit <span className="text-indigo-600">Pro</span>
              </h1>
           </div>

           <div className="w-full md:w-auto flex bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200 overflow-x-auto overflow-hidden">
              {Object.entries(UNIT_CATEGORIES).map(([key, cat]: [string, any]) => {
                const Icon = cat.icon;
                const active = category === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      const newUnits = UNIT_CATEGORIES[key].units;
                      const newFrom = Object.keys(newUnits)[0];
                      const newTo = Object.keys(newUnits)[1] || newFrom;
                      updateState({ category: key as any, fromUnit: newFrom, toUnit: newTo });
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      active ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {cat.name}
                  </button>
                );
              })}
           </div>
        </div>

        {/* Converter Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/20 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
               {/* From */}
               <div className="space-y-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Source Value</div>
                  <ValidatedInput
                    label=""
                    variant="minimal"
                    value={value}
                    onChange={(v) => updateState({ value: v })}
                    placeholder="Enter amount"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => updateState({ fromUnit: e.target.value })}
                    className="w-full h-16 px-6 border-2 border-slate-50 hover:border-slate-100 rounded-[1.25rem] bg-slate-50 font-black text-slate-700 outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none shadow-sm"
                  >
                    {Object.entries(units).map(([k, u]: [string, any]) => (
                      <option key={k} value={k}>{u.name} ({k})</option>
                    ))}
                  </select>
               </div>

               {/* Interaction */}
               <button 
                  onClick={swapUnits}
                  className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white hover:scale-110 active:scale-95 transition-all mx-auto shadow-lg shadow-indigo-100"
                >
                  <ArrowRightLeft className="w-6 h-6 rotate-90 md:rotate-0" />
               </button>

               {/* To */}
               <div className="space-y-4 text-right">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Calculated Result</div>
                  <div className="h-20 flex items-center justify-end px-8 bg-indigo-50/50 border-2 border-indigo-100 rounded-3xl text-3xl font-black text-indigo-600 tracking-tighter">
                    {convert.result}
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => updateState({ toUnit: e.target.value })}
                    className="w-full h-16 px-6 border-2 border-slate-50 hover:border-slate-100 rounded-[1.25rem] bg-slate-50 font-black text-slate-700 outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none shadow-sm text-right"
                  >
                    {Object.entries(units).map(([k, u]: [string, any]) => (
                      <option key={k} value={k}>{u.name} ({k})</option>
                    ))}
                  </select>
               </div>
            </div>

            {/* Matrix View */}
            <div className="pt-12 border-t border-slate-50">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Conversion Matrix</div>
                  <div className="relative w-full sm:w-64">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Search Units..." 
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-300 transition-all"
                     />
                  </div>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredUnits.map(([k, u]: [string, any]) => {
                    const val = (value / units[fromUnit].factor) * u.factor;
                    const isActive = k === toUnit;
                    return (
                      <button 
                        key={k} 
                        onClick={() => updateState({ toUnit: k })}
                        className={`p-5 rounded-[1.5rem] border text-left transition-all group ${isActive ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100' : 'bg-slate-50 border-slate-50 hover:border-indigo-200 hover:bg-white'}`}
                      >
                         <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>{k}</div>
                         <div className={`text-lg font-black truncate ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                           {val < 0.0001 && val > 0 ? val.toExponential(2) : val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                         </div>
                         <div className={`text-[9px] font-bold ${isActive ? 'text-indigo-100' : 'text-slate-400 italic'}`}>{u.name}</div>
                      </button>
                    );
                  })}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <ResultCard
              label="Primary Result"
              value={convert.result}
              unit={` ${toUnit.toUpperCase()}`}
              color="blue"
              title="Conversion"
              copyValue={`${value} ${fromUnit} = ${convert.result} ${toUnit}`}
            />

            <div className="bg-slate-900 rounded-[2rem] p-8 space-y-6 text-white shadow-2xl">
               <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Technical Properties</div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Scale Factor</span>
                    <span className="text-xl font-black font-mono">{(units[toUnit].factor / units[fromUnit].factor).toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Unit Domain</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{String(category)}</span>
                  </div>
                  <div className="bg-indigo-600/20 rounded-xl p-4 border border-indigo-500/20">
                     <p className="text-[11px] text-indigo-200 font-medium leading-relaxed italic text-center">
                       High-precision IEEE-754 floating point standard applied for maximum accuracy.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12">
           <CalcFAQ
              faqs={[
                {
                  question: 'How accurate are these conversions?',
                  answer: 'We use high-precision floating point constants derived from standard scientific SI benchmarks. This ensures accuracy for most engineering and daily utility use cases.'
                },
                {
                  question: 'Does this converter support Nepal-specific units?',
                  answer: 'While this tool focuses on universal units (Metric/Imperial), we have a dedicated "Nepal Land Calculator" for specialized units like Ropani, Bigha, Kattha, and Dhur.'
                },
              ]}
           />
        </div>

      </div>
    </CalculatorErrorBoundary>
  );
}
