'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Ruler, Scale, Droplets, Maximize, ArrowRightLeft, Search, CheckCircle2 } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const UNIT_CATEGORIES: any = {
  length: {
    name: 'Length', icon: Ruler,
    units: {
      m: { name: 'Meter', factor: 1 }, km: { name: 'Kilometer', factor: 0.001 },
      cm: { name: 'Centimeter', factor: 100 }, mm: { name: 'Millimeter', factor: 1000 },
      mi: { name: 'Mile', factor: 0.000621371 }, yd: { name: 'Yard', factor: 1.09361 },
      ft: { name: 'Foot', factor: 3.28084 }, in: { name: 'Inch', factor: 39.3701 },
    },
  },
  weight: {
    name: 'Weight', icon: Scale,
    units: {
      kg: { name: 'Kilogram', factor: 1 }, g: { name: 'Gram', factor: 1000 },
      mg: { name: 'Milligram', factor: 1000000 }, lb: { name: 'Pound', factor: 2.20462 },
      oz: { name: 'Ounce', factor: 35.274 }, ton: { name: 'Metric Ton', factor: 0.001 },
    },
  },
  volume: {
    name: 'Volume', icon: Droplets,
    units: {
      l: { name: 'Liter', factor: 1 }, ml: { name: 'Milliliter', factor: 1000 },
      m3: { name: 'Cubic Meter', factor: 0.001 }, gallon: { name: 'US Gallon', factor: 0.264172 },
      cup: { name: 'Cup', factor: 4.22675 },
    },
  },
  area: {
    name: 'Area', icon: Maximize,
    units: {
      sqm: { name: 'Sq Meter', factor: 1 }, sqkm: { name: 'Sq Kilometer', factor: 0.000001 },
      hectare: { name: 'Hectare', factor: 0.0001 }, acre: { name: 'Acre', factor: 0.000247105 },
      sqft: { name: 'Sq Foot', factor: 10.7639 },
    }
  }
};

const DEFAULT_STATE = { category: 'length' as keyof typeof UNIT_CATEGORIES, fromUnit: 'm', toUnit: 'km', value: 1 };

export default function UnitConverter() {
  const [state, setState] = useSyncState('unit_conv_v3', DEFAULT_STATE);
  const [search, setSearch] = useState('');
  
  const { category, fromUnit, toUnit, value } = state;
  const units = UNIT_CATEGORIES[category].units;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...updates });
  const swapUnits = () => updateState({ fromUnit: toUnit, toUnit: fromUnit });

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
      raw: resultValue
    };
  }, [value, fromUnit, toUnit, units]);

  const selectCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer";
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Universal Unit Converter' }]}
      title="Universal Unit Converter"
      description="Professional, high-precision converter for length, weight, volume, and area. Instantly swap between Metric and Imperial systems."
      icon={ArrowRightLeft}
      inputs={
        <div className="space-y-6">
          <div className="flex bg-[#F1F3F4] p-1 rounded-lg overflow-x-auto scrollbar-hide">
            {Object.entries(UNIT_CATEGORIES).map(([key, cat]: [string, any]) => {
              const active = category === key;
              return (
                <button key={key} onClick={() => {
                  const newUnits = UNIT_CATEGORIES[key].units;
                  updateState({ category: key as any, fromUnit: Object.keys(newUnits)[0], toUnit: Object.keys(newUnits)[1] || Object.keys(newUnits)[0] });
                }} className={`flex items-center gap-1.5 flex-1 px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${active ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  <cat.icon className={`w-3.5 h-3.5 ${active ? 'text-[#1A73E8]' : 'text-[#70757A]'}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Source Value</label>
                   <input type="number" value={value} min={0} onChange={e => updateState({ value: Number(e.target.value) })} className={inputCls} />
                   <select value={fromUnit} onChange={e => updateState({ fromUnit: e.target.value })} className={selectCls}>
                      {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k}>{u.name} ({k})</option>)}
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Target Unit</label>
                   <div className="h-12 flex items-center px-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-black text-[#1A73E8]">{convert.result}</div>
                   <select value={toUnit} onChange={e => updateState({ toUnit: e.target.value })} className={selectCls}>
                      {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k}>{u.name} ({k})</option>)}
                   </select>
                </div>
             </div>
             
             <button onClick={swapUnits} className="w-full py-2 bg-white border border-[#DADCE0] rounded-md flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors">
               <ArrowRightLeft className="w-3.5 h-3.5" /> Swap Units
             </button>
          </div>

          <div className="pt-4 border-t border-[#DADCE0] space-y-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#70757A]" />
                <input type="text" placeholder="Search conversion matrix..." value={search} onChange={e => setSearch(e.target.value)} className={`${inputCls} pl-9`} />
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredUnits.map(([k, u]: [string, any]) => {
                  const val = (value / units[fromUnit].factor) * u.factor;
                  const isActive = k === toUnit;
                  return (
                    <button key={k} onClick={() => updateState({ toUnit: k })}
                      className={`p-3 border rounded-lg text-left transition-all ${isActive ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                       <div className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>{k}</div>
                       <div className={`text-sm font-black truncate mt-1 ${isActive ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>
                         {val < 0.0001 && val > 0 ? val.toExponential(2) : val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                       </div>
                       <div className="text-[9px] text-[#70757A] mt-0.5">{u.name}</div>
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg text-center text-white space-y-1">
             <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Converted Value</div>
             <div className="text-4xl font-black text-white">{convert.result}</div>
             <div className="text-[11px] text-white/60 font-bold uppercase">{toUnit} / {units[toUnit].name}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Precision Matrix</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-4 flex justify-between items-center">
                   <span className="text-xs text-[#5F6368]">Relative Scale Factor</span>
                   <span className="text-sm font-black text-[#202124] font-mono">{(units[toUnit].factor / units[fromUnit].factor).toFixed(6)}</span>
                </div>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-start">
             <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#188038] leading-tight">Calculations utilize IEEE-754 floating point standard ensuring maximal accuracy across high-variance conversions.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select the physical category you want to convert (e.g. Length, Weight).", "Set your starting value and select its unit.", "Select your target unit. The conversion is instant.", "Alternatively, use the matrix below to see all unit conversions for your base value at a glance."] }}
      formula={{ title: "Conversion Engine", description: "Standard relative factor alignment.", raw: "Base Metric Value = Input Value / Input Factor\nResult Value = Base Metric Value × Target Factor" }}
      faqs={[
        { question: "Where is Ropani, Bigha, or Aana?", answer: "Nepali land measurement units are highly specialized and vary between the Terai and Hilly regions. We have built a dedicated 'Nepal Land Converter' specifically for these metrics." }
      ]}
      sidebar={{ title: "Utility Tools", links: [{ label: "Nepal Land Converter", href: "/calculator/nepal-land" }, { label: "Currency Converter", href: "/calculator/currency-converter" }], banner: { title: "Specialized Conversion", description: "Working with real estate in Nepal? Use our dedicated Land Converter.", image: "/images/land-banner.jpg" } }}
      relatedTools={[{ label: "Nepal Land Converter", href: "/calculator/nepal-land" }]}
    />
  );
}
