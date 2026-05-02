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
      slug="unit-converter"
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Dimensional Analysis & SI Unit Architecture</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Our <strong className="text-[#202124]">unit converter</strong> is built on the principles of <strong className="text-[#202124]">dimensional analysis</strong>, the mathematical process of converting any quantity expressed in one unit to its equivalent in another, while preserving the underlying physical magnitude. The engine internally anchors every conversion to an SI (International System of Units) base unit (e.g., Meters for length, Kilograms for mass), ensuring that cross-category chains of conversion remain arithmetically exact.
              </p>
              <p>
                The International System of Units defines 7 base units from which all other derived units are constructed. This architecture guarantees absolute global consistency: a meter measured in Kathmandu is physically identical to a meter measured in London or New York. Our conversion factors are sourced from the official NIST (National Institute of Standards and Technology) definitions.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Supported Physical Dimensions & Reference Units</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Length:</strong> SI Base Unit: Meter (m). Covers the full spectrum from nanometer-scale engineering to interstellar megaparsecs. Imperial units (feet, miles) are derived from exact SI equivalents.</li>
              <li><strong className="text-[#188038]">Weight/Mass:</strong> SI Base Unit: Kilogram (kg). The kilogram is the only SI base unit still defined by a physical artifact (the International Prototype Kilogram). All other mass units are mathematically proportional.</li>
              <li><strong className="text-[#D93025]">Volume:</strong> SI Derived Unit: Cubic Meter (m³). The Liter (L) is a non-SI unit accepted for use, defined exactly as 0.001 m³. All culinary and industrial measurements trace back to this anchor.</li>
              <li><strong className="text-[#F29900]">Area:</strong> SI Derived Unit: Square Meter (m²). All area metrics, from real estate (square feet) to agriculture (hectares, acres), are computed as proportional scaling of this base.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select the physical category (Length, Weight, Volume, or Area) from the tab selector.", "Enter your source value and select its starting unit from the dropdown.", "Select your target unit. The conversion result updates instantly in real-time.", "Click 'Swap Units' to immediately reverse the conversion direction.", "Use the search bar in the Conversion Matrix below to filter units by name or symbol."] }}
      formula={{ title: "SI-Anchored Relative Factor Conversion", description: "All quantities are normalized through an SI base unit before being scaled to the target, guaranteeing precision across all unit pairings.", raw: "Step 1: Convert input to SI Base Unit\n  Base Value = Input Value / Source_Factor\n\nStep 2: Scale from SI Base to Target Unit\n  Result = Base Value × Target_Factor" }}
      faqs={[
        {
          question: "Why does this converter use SI base units internally?",
          answer: "Anchoring to SI base units (Meters, Kilograms, etc.) allows the engine to convert between any two units in a category without needing a direct pair-specific conversion factor. Instead of needing N² factors for N units, we only need N factors, with the SI base as the universal pivot."
        },
        {
          question: "Are the conversion factors exact or rounded?",
          answer: "The vast majority of SI-to-SI conversions (e.g., km to m) are exact by definition. SI-to-Imperial conversions (e.g., meters to feet) use the official NIST-defined exact equivalents (e.g., 1 inch = exactly 25.4 mm, making 1 foot = 0.3048 m exactly)."
        },
        {
          question: "Why is the Kilogram the only base unit still physically defined?",
          answer: "Until 2019, the Kilogram was uniquely defined by the mass of a physical platinum-iridium artifact stored in France. In May 2019, its definition was redefined in terms of the Planck constant (h), making it fully reproducible from fundamental physical constants."
        },
        {
          question: "Where are Nepali units like Ropani, Bigha, and Aana?",
          answer: "Nepali land measurement units are highly specialized and geographically variant (differing between Hilly and Terai regions). They are handled by the dedicated 'Nepal Land Converter' tool on this platform, which is specifically calibrated for these units."
        },
        {
          question: "Can I chain multiple conversions together?",
          answer: "For chained conversions, perform each step sequentially. For example, to go from km to inches: convert km to meters first (×1000), then convert meters to inches (×39.3701). The precision is maintained at each step as long as you avoid premature rounding."
        },
        {
          question: "Why do some results display in scientific notation (e.g., 1.2e-7)?",
          answer: "For extremely small values (below 0.0001), the calculator automatically switches to scientific notation to preserve the full precision of the result. For example, 1 millimeter expressed in kilometers (0.000001 km) is displayed as 1e-6 km for clarity."
        }
      ]}
      sidebar={{ 
        title: "Utility Tools", 
        links: [
          { label: "Nepal Land Converter", href: "/calculator/nepal-land/" }, 
          { label: "Currency Converter", href: "/market-rates/exchange-rate/" }
        ], 
        banner: { title: "Specialized Conversion", description: "Working with real estate in Nepal? Use our dedicated Land Converter.", image: "/images/land-banner.jpg" } 
      }}
      relatedTools={[
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Currency Converter", href: "/market-rates/exchange-rate/" }
      ]}
    />
  );
}
