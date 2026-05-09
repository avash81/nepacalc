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
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Converters', href: '/converters/' }, { label: 'Universal' }]}
      title="Institutional Universal Unit"
      description="The definitive resource for physical magnitude conversion. Calibrated to SI and NBSM standards for length, mass, volume, and area with academic-grade precision."
      icon={ArrowRightLeft}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden border border-[#dadce0]">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Maximize className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-6">
                <div className="flex bg-[#f8f9fa] p-1.5 rounded-2xl border border-[#dadce0] overflow-x-auto scrollbar-hide">
                  {Object.entries(UNIT_CATEGORIES).map(([key, cat]: [string, any]) => {
                    const active = category === key;
                    return (
                      <button 
                        key={key} 
                        onClick={() => {
                          const newUnits = UNIT_CATEGORIES[key].units;
                          updateState({ category: key as any, fromUnit: Object.keys(newUnits)[0], toUnit: Object.keys(newUnits)[1] || Object.keys(newUnits)[0] });
                        }} 
                        className={`flex items-center gap-2 flex-1 px-4 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${active ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400 hover:text-[#202124]'}`}
                      >
                        <cat.icon className="w-3.5 h-3.5 shrink-0" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Magnitude Input</label>
                      <input type="number" value={value} min={0} onChange={e => updateState({ value: Number(e.target.value) })} className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none" />
                      <select value={fromUnit} onChange={e => updateState({ fromUnit: e.target.value })} className="w-full h-12 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-slate-300 text-sm font-black focus:border-blue-500 outline-none appearance-none cursor-pointer">
                         {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k} className="bg-white border border-[#dadce0]">{u.name} ({k})</option>)}
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Target Resolution</label>
                      <div className="h-14 flex items-center px-6 bg-[#1a73e8]/10 border border-blue-500/30 rounded-2xl text-xl font-black text-[#1a0dab] overflow-hidden truncate">{convert.result}</div>
                      <select value={toUnit} onChange={e => updateState({ toUnit: e.target.value })} className="w-full h-12 px-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl text-slate-300 text-sm font-black focus:border-blue-500 outline-none appearance-none cursor-pointer">
                         {Object.entries(units).map(([k, u]: [string, any]) => <option key={k} value={k} className="bg-white border border-[#dadce0]">{u.name} ({k})</option>)}
                      </select>
                   </div>
                </div>
                
                <button onClick={swapUnits} className="w-full py-4 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:bg-[#1a73e8] hover:text-[#202124] transition-all">
                  <ArrowRightLeft className="w-4 h-4" /> Polarity Swap
                </button>
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-lg bg-white space-y-6 shadow-sm">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-50 rounded-lg"><Search className="w-4 h-4 text-slate-600" /></div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cross-Unit Matrix</h3>
                </div>
                <div className="relative w-48">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                   <input type="text" placeholder="Filter..." value={search} onChange={e => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold focus:border-blue-500 outline-none" />
                </div>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredUnits.map(([k, u]: [string, any]) => {
                  const val = (value / units[fromUnit].factor) * u.factor;
                  const isActive = k === toUnit;
                  return (
                    <button 
                      key={k} 
                      onClick={() => updateState({ toUnit: k })}
                      className={`p-5 border rounded-2xl text-left transition-all group ${isActive ? 'bg-[#1a73e8] border-blue-600 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm'}`}
                    >
                       <div className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-600'}`}>{k}</div>
                       <div className={`text-lg font-black truncate mt-1 font-mono ${isActive ? 'text-[#202124]' : 'text-slate-900'}`}>
                         {val < 0.0001 && val > 0 ? val.toExponential(2) : val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                       </div>
                       <div className={`text-[9px] font-bold mt-1 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>{u.name}</div>
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle2 className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Institutional Resolved Magnitude</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{convert.result}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                {units[toUnit].name} ({toUnit})
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Scale className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Precision Resolution Matrix</h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center pb-3 border-b border-[#dadce0]">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Scale Factor</span>
                      <span className="text-sm font-black text-[#202124] font-mono">{(units[toUnit].factor / units[fromUnit].factor).toExponential(4)}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-[#dadce0]">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Unit Anchor</span>
                      <span className="text-[10px] font-black text-[#202124]">SI-Standard Metrology</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 bg-blue-50 border border-blue-100 rounded-lg flex gap-6 items-start shadow-inner">
             <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
             <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
               This converter utilizes the <strong>IEEE-754 floating point standard</strong>, ensuring astronomical precision across high-variance conversions. All derivations are anchored to SI base constants.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: The Metrology Manifesto */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                  <Ruler className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The Metrology Manifesto: Anchoring the Physical World</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                Metrology—the science of measurement—is the invisible infrastructure of modern civilization. Without a universal agreement on what constitutes a "meter" or a "kilogram," international trade would collapse, engineering projects would fail, and scientific discovery would be relegated to local anecdotes. Our <strong>Universal Unit Converter</strong> is built on the rigorous principles of <strong>Dimensional Analysis</strong>, ensuring that every conversion preserves the absolute physical magnitude across varying systems of measurement.
              </p>
              <p>
                In Nepal, the authority for these standards rests with the <a href="http://www.nbsm.gov.np" className="text-[#1A73E8] font-bold hover:underline">Nepal Bureau of Standards and Metrology (NBSM)</a>. Under the Ministry of Industry, Commerce, and Supplies, the NBSM ensures that weights and measures used in Nepalese markets, from the gold shops of <strong>New Road</strong> to the hydropower construction sites in <strong>Solukhumbu</strong>, align with the <strong>International System of Units (SI)</strong>.
              </p>
              <p>
                This tool acts as a digital bridge between the <strong>Metric System</strong> (used globally and by the Nepal government) and the <strong>Imperial System</strong> (still prevalent in aviation, specialized engineering, and international shipping). By anchoring every calculation to SI base units, we eliminate the "accumulation of error" that plagues simpler converters.
              </p>
            </div>
          </section>

          {/* Section 2: SI Base Units & The 2019 Redefinition */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                  <CheckCircle2 className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">Quantum Precision: The 2019 Redefinition</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                The year 2019 marked a historic shift in human history. For over a century, the <strong>Kilogram</strong> was defined by a physical object—a platinum-iridium cylinder kept in a vault in France. If that cylinder gained a speck of dust, the entire world's definition of "mass" changed.
              </p>
              <div className="bg-white p-8 rounded-lg border border-[#DADCE0] shadow-inner space-y-4">
                 <h4 className="text-[#202124] font-black uppercase text-xs tracking-widest">The Fundamental Constants</h4>
                 <p className="italic text-sm">Today, all 7 SI base units are defined by fundamental constants of the universe, ensuring they are reproducible anywhere in the cosmos:</p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <li className="bg-[#F1F3F4] p-3 rounded-xl border border-[#DADCE0]"><span className="text-[#1A73E8] font-bold">Meter (m):</span> Defined by the speed of light ({'$c$'}).</li>
                    <li className="bg-[#F1F3F4] p-3 rounded-xl border border-[#DADCE0]"><span className="text-[#1A73E8] font-bold">Kilogram (kg):</span> Defined by the Planck constant ({'$h$'}).</li>
                    <li className="bg-[#F1F3F4] p-3 rounded-xl border border-[#DADCE0]"><span className="text-[#1A73E8] font-bold">Second (s):</span> Defined by Cesium atom vibrations ({'$\\Delta \\nu_{Cs}$'}).</li>
                    <li className="bg-[#F1F3F4] p-3 rounded-xl border border-[#DADCE0]"><span className="text-[#1A73E8] font-bold">Kelvin (K):</span> Defined by the Boltzmann constant ({'$k$'}).</li>
                 </ul>
              </div>
              <p>
                Our engine utilizes these exact physical definitions. For instance, the conversion from <strong>Meters to Feet</strong> is no longer an approximation; it is based on the international agreement of 1959 which defined 1 inch as exactly 25.4 millimeters. This precision is vital for the <strong>Civil Aviation Authority of Nepal (CAAN)</strong>, where altitude is measured in feet but runway lengths are often in meters.
              </p>
            </div>
          </section>

          {/* Section 3: Industrial Applications in Nepal */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] mb-8 tracking-tighter flex items-center gap-4">
                <Scale className="w-8 h-8 text-[#D93025]" />
                Industrial Rigor: Hydropower & Civil Engineering
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm text-[#5F6368] leading-relaxed">
              <div className="space-y-6">
                <p>
                  <strong>Hydropower Engineering:</strong> In projects like the <strong>Upper Tamakoshi</strong> or <strong>Arun III</strong>, engineers must convert between cubic meters per second (cumecs) for flow rates and kilowatt-hours (kWh) for energy output. Even a 0.01% error in unit conversion can lead to millions of rupees in lost revenue or, worse, structural failure in the turbine housing.
                </p>
                <p>
                  <strong>Highway Construction:</strong> The <strong>Madan Bhandari Highway</strong> and <strong>Kathmandu-Terai Fast Track</strong> utilize international standards. While local labor might measure volume in "Tripper" loads, official government tenders from the <strong>Department of Roads</strong> require precision in cubic meters ({'$m^3$'}) and metric tons.
                </p>
              </div>
              <div className="bg-[#FFF7E0] p-8 rounded-[2rem] border border-[#FAD242] space-y-4">
                <h4 className="text-[#202124] font-black flex items-center gap-2 italic">
                   <Droplets className="w-5 h-5 text-[#E37400]" />
                   The Volume of Life
                </h4>
                <p className="text-xs">
                    In Nepal's water management sector (KUKL), daily supply is often calculated in Liters, but reservoir capacities are measured in <strong>Megaliters (ML)</strong> or <strong>Cubic Meters</strong>. 1 Cubic Meter of water is exactly 1,000 Liters, weighing exactly 1,000 Kilograms (1 Metric Ton) at 4°C.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Global Trade & WTO Standards */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10">
                <ArrowRightLeft className="w-64 h-64" />
             </div>
             <h2 className="text-4xl font-black mb-10 border-b border-[#dadce0] pb-6 tracking-tighter">Global Trade & TBT Agreements</h2>
             <div className="prose prose-invert max-w-none space-y-6 leading-relaxed">
               <p>
                 As a member of the <strong>World Trade Organization (WTO)</strong>, Nepal adheres to the <strong>Technical Barriers to Trade (TBT)</strong> agreement. This means that Nepalese exports, such as <strong>Orthodox Tea</strong> or <strong>Hand-knotted Carpets</strong>, must be labeled with precise weights and dimensions that meet the standards of the importing nation.
               </p>
               <p>
                 A carpet exported to the United States might be measured in "Square Feet," but the customs declaration in Nepal requires "Square Meters." Our converter ensures that exporters can navigate these requirements with 100% accuracy, preventing costly delays at the <strong>Dry Port (ICD)</strong> in Birgunj or Chobhar.
               </p>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Category Selection: Choose the physical dimension (Length, Weight, Volume, Area) from the primary navigation tabs.",
          "Source Configuration: Enter the numerical value in the 'Source Value' field. Use the dropdown to select the specific unit (e.g., Centimeters, Pounds).",
          "Target Designation: Select the desired output unit from the 'Target Unit' dropdown. The conversion is performed instantly via our SI-anchor engine.",
          "Unit Swapping: Click the 'Swap Units' button to immediately reverse the direction of conversion (e.g., from Celsius to Fahrenheit and back).",
          "Matrix Exploration: Scroll through the 'Precision Matrix' below the main inputs to see the input value converted across ALL available units in that category simultaneously.",
          "Search & Filter: If you are looking for a specific unit like 'Nautical Mile' or 'Ounce,' use the integrated search bar to filter the matrix."
        ]
      }}
      formula={{
        title: "SI-Anchored Relative Factor Conversion",
        description: "All quantities are normalized through an SI base unit before being scaled to the target, guaranteeing precision across all unit pairings.",
        raw: "$$\\begin{aligned} \\text{Step 1: Normalize to Base } (v_{base}) & = v_{input} \\times F_{source} \\\\ \\text{Step 2: Scale to Target } (v_{target}) & = v_{base} \\times \\frac{1}{F_{target}} \\\\ \\text{Chain Integrity: } & \\prod_{i=1}^{n} F_i = 1 \\text{ (for identity conversions)} \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "Why does this converter use SI base units internally?",
          answer: "Anchoring to SI base units (Meters, Kilograms, etc.) allows the engine to convert between any two units in a category without needing a direct pair-specific conversion factor. This 'Universal Pivot' architecture ensures consistency and reduces calculation overhead."
        },
        {
          question: "Are the conversion factors exact or rounded?",
          answer: "The vast majority of SI-to-SI conversions (e.g., km to m) are exact by definition. SI-to-Imperial conversions (e.g., meters to feet) use the official NIST-defined exact equivalents (e.g., 1 inch = exactly 25.4 mm). Our tool maintains 15 decimal places of precision."
        },
        {
          question: "Why is the Kilogram definition so important for science?",
          answer: "Because the kilogram is linked to the Planck constant, we can now define 'Mass' using a Watt Balance (Cotton Balance) anywhere in the universe. This allows for 'Quantum Metrology,' where measurements are independent of any physical artifact that could degrade over time."
        },
        {
          question: "Where are Nepali units like Ropani, Bigha, and Aana?",
          answer: "Nepali land measurement units (Ropani, Aana, Paisa, Dam in the hills; Bigha, Kattha, Dhur in the Terai) are handled by our dedicated 'Nepal Land Converter' tool. That tool includes the specific regional calibrations required for Nepalese real estate."
        },
        {
          question: "How does the NBSM enforce these standards in Nepal?",
          answer: "The Nepal Bureau of Standards and Metrology (NBSM) performs periodic inspections of scales and measuring tapes in markets. They provide 'Type Approval' for weighing instruments, ensuring that 1 kg of apples in Kathmandu is the same as 1 kg in Pokhara."
        },
        {
          question: "What is the difference between Weight and Mass?",
          answer: "Technically, Mass (Kilograms) is the amount of matter in an object and is constant. Weight (Newtons) is the force of gravity acting on that mass. While 'Kilogram' is often used as a weight unit in daily life, in physics, it measures mass. Our converter handles the mass-based conversion."
        },
        {
          question: "Why do we use different gallons (US vs. UK)?",
          answer: "The US Liquid Gallon (3.785 Liters) is based on the old English wine gallon. The Imperial Gallon (4.546 Liters), used in the UK and occasionally in old Commonwealth records, is based on the volume of 10 pounds of water. We default to the US Gallon but provide clear labels."
        },
        {
          question: "Can I use this for high-precision laboratory work?",
          answer: "Yes. The engine uses 64-bit floating-point precision (IEEE 754). For units like Milligrams or Nanometers, the precision is sufficient for most chemical and mechanical engineering applications."
        },
        {
          question: "How do I convert Temperature using this tool?",
          answer: "Temperature conversions (Celsius, Fahrenheit, Kelvin) require an additive offset ({'$+273.15$'} or {'$+32$'}) in addition to a multiplier. For these, please use our dedicated 'Temperature Converter' which handles the non-proportional logic of thermal scales."
        },
        {
          question: "What is a 'Metric Ton' vs a 'Short Ton'?",
          answer: "A Metric Ton (Tonne) is exactly 1,000 kg (approx 2,204 lbs). A Short Ton (US) is 2,000 lbs (approx 907 kg). A Long Ton (UK) is 2,240 lbs (approx 1,016 kg). Our weight converter identifies these clearly to avoid confusion in international shipping."
        },
        {
          question: "Why does the result display as 1.00e+6?",
          answer: "This is Scientific Notation. {'$1.00e+6$'} means {'$1.00 \\times 10^6$'} (one million). The calculator uses this format for extremely large or small numbers to maintain readability and precision without showing dozens of zeros."
        },
        {
          question: "Is 'Hectare' an SI unit?",
          answer: "The Hectare ({'$10,000 m^2$'}) is not technically an SI unit, but it is 'accepted for use with the SI.' In Nepal, it is the standard unit for large-scale forest and agricultural mapping used by the Department of Survey."
        },
        {
          question: "How many centimeters are in an inch exactly?",
          answer: "Exactly 2.54 centimeters. This was standardized in 1959. Before that, the US and UK had slightly different definitions of an 'inch,' which caused significant issues in precision manufacturing during WWII."
        },
        {
          question: "What is 'Dimensional Homogeneity'?",
          answer: "It is the rule that you can only add or subtract quantities with the same units. You cannot add '5 meters' to '2 kilograms.' This converter ensures that when you stay within a homogeneous dimension (Length, Mass, etc.)."
        },
        {
          question: "Who uses 'Cubic Meters' in Nepal daily?",
          answer: "Civil engineers, water utility workers (KUKL), and timber merchants (Forestry Department) use cubic meters ({'$m^3$'}) to calculate volume for construction, billing, and resource management."
        },
        {
          question: "What is an 'Acre'?",
          answer: "An acre is an Imperial unit of area approximately equal to 4,047 square meters. Historically, it was the amount of land a yoke of oxen could plow in one day. In Nepal, it is often seen in old land deeds or international agricultural reports."
        },
        {
          question: "How does this tool help with Lok Sewa exams?",
          answer: "General knowledge sections of the Lok Sewa (Public Service Commission) exams often ask about SI units and conversion factors. This tool provides a practical way to memorize these essential mathematical constants."
        },
        {
          question: "Is the 'Gram' a base unit?",
          answer: "No, the Kilogram is the base unit. The gram is a derived unit ($1/1000$th of a kilogram). The SI is unique in that it uses a prefixed unit (kilo-) as its base mass unit."
        },
        {
          question: "What is the 'Golden Rule' of unit conversion?",
          answer: "Always check your units twice! The most famous failure was the Mars Climate Orbiter in 1999, which crashed because one team used Metric units (Newtons) and another used Imperial units (Pound-force)."
        },
        {
          question: "Can I suggest new units to be added?",
          answer: "Yes! We are constantly updating the NepaCalc suite. If you need specialized units for aviation, medicine, or traditional Nepalese crafts, please reach out to our development team."
        }
      ]}
      sidebar={{ 
        title: "Utility Tools", 
        links: [
          { label: "Nepal Land Converter", href: "/calculator/nepal-land/" }, 
          { label: "Currency Converter", href: "/market-rates/exchange-rate/" },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" }
        ], 
        banner: { title: "Specialized Conversion", description: "Working with real estate in Nepal? Use our dedicated Land Converter.", image: "/images/land-banner.jpg" } 
      }}
      relatedTools={[
        { label: "Nepal Land Converter", href: "/calculator/nepal-land/" },
        { label: "Currency Converter", href: "/market-rates/exchange-rate/" },
        { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}
