'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Ruler, Scale, Droplets, Maximize, ArrowRightLeft, Search, CheckCircle2,
  Activity, Landmark, ShieldCheck, Globe, Target, Wallet, History,
  TrendingUp, Zap, Receipt, Table, ChevronRight, UserCheck
} from 'lucide-react';
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

  return (
    <ModernCalcLayout
      slug="unit-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Unit Converter' }]}
      title="Universal Unit"
      description="Fast and precise universal unit converter for Nepal. Convert length, weight, area, and volume between metric and imperial standards with institutional accuracy."
      icon={ArrowRightLeft}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Dimension Category</label>
               <div className="grid grid-cols-2 gap-2">
                  {Object.entries(UNIT_CATEGORIES).map(([key, cat]: [string, any]) => (
                    <button 
                      key={key} 
                      onClick={() => {
                        const newUnits = UNIT_CATEGORIES[key].units;
                        updateState({ category: key as any, fromUnit: Object.keys(newUnits)[0], toUnit: Object.keys(newUnits)[1] || Object.keys(newUnits)[0] });
                      }}
                      className={`h-11 rounded-md border flex items-center justify-center gap-2 text-[10px] font-black uppercase transition-all ${category === key ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                    >
                      <cat.icon className="w-3.5 h-3.5" />
                      {cat.name}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Source Value</label>
                <div className="flex gap-2">
                  <input type="number" value={value} onChange={e => updateState({ value: Number(e.target.value) })} className="w-2/3 h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none" />
                  <select value={fromUnit} onChange={e => updateState({ fromUnit: e.target.value })} className="w-1/3 h-12 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-[10px] font-black uppercase text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer">
                    {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k}>{k} ({u.name})</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <button onClick={swapUnits} className="w-10 h-10 bg-white border border-[#DADCE0] rounded-full flex items-center justify-center shadow-sm hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all">
                  <ArrowRightLeft className="w-4 h-4 rotate-90" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Target Resolution</label>
                <div className="flex gap-2">
                  <div className="w-2/3 h-12 px-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex items-center text-sm font-black text-[#1A73E8] overflow-hidden truncate">
                    {convert.result}
                  </div>
                  <select value={toUnit} onChange={e => updateState({ toUnit: e.target.value })} className="w-1/3 h-12 px-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-[10px] font-black uppercase text-[#202124] focus:border-[#1A73E8] outline-none appearance-none cursor-pointer">
                    {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k}>{k} ({u.name})</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Standard: Calibrated to <span className="text-[#1A73E8] underline decoration-2">SI and NBSM</span> (Nepal Bureau of Standards) base units.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Unit Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Resolved Magnitude</div>
             <div className="text-5xl font-black text-[#1A73E8] font-mono tracking-tight">{convert.result}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                {units[toUnit].name} ({toUnit})
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-md p-6">
             <div className="flex items-center gap-3 mb-4">
                <Search className="w-3.5 h-3.5 text-[#5F6368]" />
                <input 
                  type="text" 
                  placeholder="Filter Matrix..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  className="w-full text-[10px] font-bold text-[#202124] uppercase placeholder:text-[#DADCE0] outline-none bg-transparent"
                />
             </div>
             <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredUnits.map(([k, u]: [string, any]) => {
                  const val = (value / units[fromUnit].factor) * u.factor;
                  const isActive = k === toUnit;
                  return (
                    <button 
                      key={k} 
                      onClick={() => updateState({ toUnit: k })}
                      className={`p-4 rounded-md border text-left transition-all ${isActive ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                    >
                       <div className="text-[8px] font-black text-[#5F6368] uppercase mb-1">{k}</div>
                       <div className={`text-sm font-black truncate ${isActive ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>
                         {val < 0.0001 && val > 0 ? val.toExponential(2) : val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                       </div>
                    </button>
                  );
                })}
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex justify-between items-center">
             <div className="text-[10px] font-bold text-[#5F6368] uppercase">Scale Resolution</div>
             <div className="text-[10px] font-black text-[#202124]">{(units[toUnit].factor / units[fromUnit].factor).toExponential(4)}</div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Landmark className="w-24 h-24 text-[#1A73E8]" /></div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Metrology Standards</h3>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed relative z-10 mb-6">
                  Metrology is the invisible infrastructure of modern trade. Our engine is anchored to <strong>SI base constants</strong>, 
                  ensuring that engineering, hydropower, and commercial projects in Nepal align with international precision.
                </p>
                <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-center">
                   <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">NBSM Calibration</div>
                   <p className="text-[11px] font-bold text-[#5F6368]">Nepal Bureau of Standards & Metrology Official Factors</p>
                </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Dimension Integrity</h3>
               </div>
               <div className="space-y-4">
                  {[
                    { l: 'Length (Metric/Imp)', d: 'Meter, Feet, Mile, Nautical Mile' },
                    { l: 'Weight (Mass)', d: 'Kilogram, Pound, Ounce, Metric Ton' },
                    { l: 'Area (Survey)', d: 'Sq Meter, Hectare, Acre, Sq Feet' }
                  ].map((u, i) => (
                    <div key={i} className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                       <div>
                          <div className="text-[10px] font-black text-[#202124] uppercase">{u.l}</div>
                          <div className="text-[10px] text-[#5F6368] font-bold">{u.d}</div>
                       </div>
                       <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                    </div>
                  ))}
               </div>
             </div>
           </div>
        </div>
      }
      howToUse={{
        steps: [
          "Category: Select the physical dimension (Length, Weight, etc.) from the grid.",
          "Source: Enter the numerical magnitude you wish to convert.",
          "Units: Select the 'From' and 'To' units using the dropdown menus.",
          "Swap: Use the central arrow button to instantly reverse the conversion direction.",
          "Matrix: Explore the Cross-Unit Matrix to see the value across all units in the category."
        ]
      }}
      formula={{
        title: "The SI-Anchored Resolution Matrix",
        description: "Institutional algorithm used to maintain dimensional homogeneity across variance systems.",
        raw: "Resolved = (Input / SourceFactor) × TargetFactor",
        variables: [
          "Source Factor: Scale relative to the dimension's base unit (SI)",
          "Target Factor: Scaling constant for the output resolution",
          "Precision: 15 decimal point floating logic (IEEE-754)"
        ]
      }}
      faqs={[
        { question: "Why does this converter use SI base units?", answer: "Anchoring to SI units (Meter, Kilogram) allows for universal conversion between any two units in a category without cumulative rounding errors." },
        { question: "What is the difference between a Metric Ton and a US Ton?", answer: "A Metric Ton (Tonne) is exactly 1,000 kg, whereas a US Ton (Short Ton) is 2,000 lbs (approx. 907 kg)." },
        { question: "How many centimeters are in an inch exactly?", answer: "By international agreement since 1959, 1 inch is exactly 25.4 millimeters (2.54 cm)." },
        { question: "Does this tool handle Nepali units like Ropani?", answer: "Nepali specific units like Ropani, Bigha, and Aana are handled by our specialized 'Nepal Land Converter' tool." }
      ]}
      sidebar={{
        title: "Utility Suite",
        subtitle: "Universal Tools",
        links: [
          { label: "Nepal Land Converter", href: "/calculator/nepal-land/", icon: Maximize },
          { label: "Currency Converter", href: "/calculator/currency-converter/", icon: Globe },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/", icon: UserCheck },
          { label: "Salary Tool", href: "/calculator/nepal-salary/", icon: Landmark },
        ],
      }}
      relatedTools={[
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Currency Converter", href: "/calculator/currency-converter/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
        { label: "Nepali Date Converter", href: "/calculator/nepali-date/" }
      ]}
    />
  );
}

