'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Calculator as CalcIcon, Droplets, Info } from 'lucide-react';

const GRADES = [
  { name: 'M5', ratio: [1, 5, 10], desc: '1:5:10' },
  { name: 'M7.5', ratio: [1, 4, 8], desc: '1:4:8' },
  { name: 'M10', ratio: [1, 3, 6], desc: '1:3:6' },
  { name: 'M15', ratio: [1, 2, 4], desc: '1:2:4' },
  { name: 'M20', ratio: [1, 1.5, 3], desc: '1:1.5:3 (Standard)' },
  { name: 'M25', ratio: [1, 1, 2], desc: '1:1:2' },
];

function fmt(n: number) { return n.toLocaleString('en-IN', { maximumFractionDigits: 3 }); }

const DEFAULT_STATE = { unit: 'm' as 'm' | 'ft', volume: 10, gradeName: 'M20', wastage: 5, dryFactor: 1.54 };

export default function ConcreteMixCalculator() {
  const [state, setState] = useSyncState('concrete_mix_v3', DEFAULT_STATE);
  const { unit, volume, gradeName, wastage, dryFactor } = state;

  const updateState = (u: Partial<typeof DEFAULT_STATE>) => setState({ ...state, ...u });
  const grade = useMemo(() => GRADES.find(g => g.name === gradeName) || GRADES[4], [gradeName]);

  const result = useMemo(() => {
    const totalVolume = volume * (1 + wastage / 100);
    const dryVolume = totalVolume * dryFactor;
    const sum = grade.ratio[0] + grade.ratio[1] + grade.ratio[2];
    
    const cementVol = (grade.ratio[0] / sum) * dryVolume;
    const cementBags = cementVol / 0.0347;
    const cementKg = cementBags * 50;

    const sandVol = (grade.ratio[1] / sum) * dryVolume;
    const sandCft = sandVol * 35.3147;

    const aggregateVol = (grade.ratio[2] / sum) * dryVolume;
    const aggregateCft = aggregateVol * 35.3147;

    return { cementBags, cementKg, sandVol, sandCft, aggregateVol, aggregateCft, dryVolume, totalVolume };
  }, [volume, grade, wastage, dryFactor]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Concrete Mixer' }]}
      title="Concrete Mix & Quantity Calculator"
      description="Professional civil engineering tool for estimating cement, sand, and aggregate requirements for various concrete grades (M5 to M25)."
      icon={Droplets}
      inputs={
        <div className="space-y-6">
          <div className="flex justify-end">
             <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
                {[ { id: 'm', l: 'Metric (m³)' }, { id: 'ft', l: 'Imperial (ft³)' } ].map(u => (
                  <button key={u.id} onClick={() => updateState({ unit: u.id as any })}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${unit === u.id ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                    {u.l}
                  </button>
                ))}
             </div>
          </div>

          <div>
             <label className={labelCls}>Total Wet Volume Required</label>
             <div className="relative">
                <input type="number" value={volume} min={0} onChange={e => updateState({ volume: Number(e.target.value) })} className={inputCls} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">{unit === 'm' ? 'm³' : 'ft³'}</span>
             </div>
          </div>

          <div className="space-y-3">
             <label className={labelCls}>Concrete Grade (Ratio)</label>
             <div className="grid grid-cols-2 gap-2">
                {GRADES.map(g => (
                  <button key={g.name} onClick={() => updateState({ gradeName: g.name })}
                    className={`p-3 border rounded-lg text-left transition-all ${gradeName === g.name ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                     <div className={`text-[11px] font-black uppercase ${gradeName === g.name ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{g.name}</div>
                     <div className="text-[9px] text-[#70757A] font-bold mt-0.5">{g.desc}</div>
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DADCE0]">
             <div><label className={labelCls}>Wastage (%)</label><input type="number" value={wastage} min={0} max={100} onChange={e => updateState({ wastage: Number(e.target.value) })} className={inputCls} /></div>
             <div><label className={labelCls}>Dry Volume Factor</label><input type="number" value={dryFactor} min={1} step={0.01} onChange={e => updateState({ dryFactor: Number(e.target.value) })} className={inputCls} /></div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <CalcIcon className="w-32 h-32 text-white" />
             </div>
             
             <div className="relative z-10 space-y-6">
                <div>
                   <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Cement Required</div>
                   <div className="text-5xl font-black text-white tracking-tighter flex items-baseline gap-2">
                     {fmt(Math.ceil(result.cementBags))} <span className="text-base text-white/50 uppercase tracking-widest">Bags</span>
                   </div>
                   <div className="text-[10px] text-[#70757A] font-bold uppercase mt-1 tracking-wider">Approx {fmt(result.cementKg)} kg</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                   <div>
                      <div className="text-[10px] font-bold text-[#E37400] uppercase tracking-wider mb-1">Sand</div>
                      <div className="text-2xl font-black text-white">{fmt(result.sandVol)} m³</div>
                      <div className="text-[9px] text-white/40 uppercase mt-0.5 font-bold">{fmt(result.sandCft)} cft</div>
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Aggregate</div>
                      <div className="text-2xl font-black text-white">{fmt(result.aggregateVol)} m³</div>
                      <div className="text-[9px] text-white/40 uppercase mt-0.5 font-bold">{fmt(result.aggregateCft)} cft</div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Calculation Parameters</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Wet Volume</span><span className="font-black text-[#202124]">{fmt(volume)} {unit === 'm' ? 'm³' : 'ft³'}</span></div>
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Dry Volume (Factor x1.54)</span><span className="font-black text-[#1A73E8]">{fmt(result.dryVolume)} {unit === 'm' ? 'm³' : 'ft³'}</span></div>
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Ratio Sum</span><span className="font-black text-[#202124]">{grade.ratio.reduce((a, b) => a + b, 0)}</span></div>
             </div>
          </div>

          <div className="flex gap-3 p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-relaxed">Wet concrete shrinks when dry materials are mixed with water. The Dry Volume Factor (typically 1.54) accounts for this compaction, ensuring you order enough raw materials.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering the Concrete Calculator Algorithm</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In civil engineering, accurate raw material estimation is paramount. A standard <strong className="text-[#202124]">concrete calculator</strong> must account for the physical compaction that occurs when water is added to dry materials. Our engine uses the industry-standard Dry Volume Factor of 1.54, which mathematically scales your wet volume requirement to ensure you purchase the correct amount of raw cement, sand, and aggregate.
              </p>
              <p>
                Whether you are searching for a highly precise <strong className="text-[#202124]">concrete calculater</strong> for a massive M25 slab or simply trying to figure out <strong className="text-[#202124]">how many bags of concrete in a yard</strong> for a small patio, this tool translates complex ratio mathematics into actionable purchase orders, converting theoretical m³ into exact 50kg bag counts.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Yield Mathematics & Pre-mixed Bags</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Volumetric Yields:</strong> A common homeowner question is: <strong className="text-[#202124]">1 80 lb bag of concrete how many yards</strong> does it cover? A standard 80 lb pre-mixed bag yields approximately 0.60 cubic feet. Since there are 27 cubic feet in a cubic yard, it takes exactly 45 bags (80 lbs each) to form one full cubic yard.</li>
              <li><strong className="text-[#188038]">Grade Ratios (M15 vs M20):</strong> The tool automatically recalculates the material split based on the grade. M20 (1:1.5:3) requires significantly more cement per cubic meter than an M15 (1:2:4) mix, directly impacting your budget.</li>
              <li><strong className="text-[#D93025]">The Wastage Buffer:</strong> Construction sites are prone to material loss during transit, mixing, and pouring. The calculator includes a customizable wastage parameter (defaulting to 5%) to ensure you do not run short mid-pour.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select your preferred measurement unit (Metric m³ or Imperial ft³).", "Enter the total wet volume of concrete required for your project.", "Select the concrete grade (M20 is standard for most residential construction).", "Adjust the wastage and dry factor if your site conditions require different tolerances."] }}
      formula={{ title: "Concrete Quantity Estimation", description: "Standard civil calculation method.", raw: "Dry Volume = Wet Volume × 1.54\nSum of Ratio = Cement + Sand + Aggregate\n\nCement Vol = (Cement Ratio / Sum) × Dry Volume\nCement Bags = Cement Vol / 0.0347 m³ (Standard 50kg bag)\n\nSand Vol = (Sand Ratio / Sum) × Dry Volume\nAggregate Vol = (Aggregate Ratio / Sum) × Dry Volume" }}
      faqs={[
        { question: "What does M20 concrete mean?", answer: "The 'M' stands for Mix, and '20' refers to the characteristic compressive strength of 20 N/mm² (megapascals) that the concrete achieves after 28 days of proper curing. M20 uses a 1:1.5:3 ratio (cement:sand:aggregate) and is the standard grade for most residential construction in Nepal including slabs, beams, and columns." },
        { question: "Why is the dry volume factor 1.54?", answer: "Dry materials (sand and aggregate) contain significant air void spaces between particles. When water is added, these voids fill and the mixture compacts — resulting in a wet volume that is 35–40% less than the dry ingredient volumes. The 1.54 factor compensates for this shrinkage: Dry Volume = Wet Volume × 1.54. Without this correction, you would under-order materials." },
        { question: "How many cement bags are needed for 1 cubic meter of M20 concrete?", answer: "For M20 (1:1.5:3) with a 1.54 dry factor: Cement = (1/5.5) × 1.54 = 0.28 m³ = 0.28/0.0347 = approximately 8.07 bags of 50kg cement. So you need approximately 8–9 bags of cement per cubic meter of M20 concrete, plus proportional sand and aggregate." },
        { question: "What is the difference between M15 and M20 concrete?", answer: "M15 (1:2:4) has a compressive strength of 15 N/mm² — used for minor structural elements, footings in stable soil, and non-structural purposes. M20 (1:1.5:3) is stronger at 20 N/mm² and is the minimum grade recommended by IS 456-2000 for reinforced concrete construction. M25 and above are used for bridges, industrial floors, and high-load structures." },
        { question: "What is the standard wastage percentage for concrete in Nepal?", answer: "For construction in Nepal, a 5% wastage factor is standard for normal site conditions (formwork spillage, surface losses). For challenging sites (steep terrain, small batches, hand mixing), 7–10% wastage may be more realistic. This calculator defaults to 5% but allows you to adjust it in the advanced settings." },
        { question: "Can I calculate concrete for foundations and footings?", answer: "Yes. Enter the total volume of the footing in cubic meters or cubic feet. For a simple rectangular footing: Volume = Length × Width × Depth. For example, a 1m × 1m × 0.3m footing requires 0.3 m³ of wet concrete. Select M20 for standard footings on stable soil, or M25 for footings on weak/expansive soil as per your engineer's specification." }
      ]}
      sidebar={{ title: "Civil Engineering", links: [{ label: "Brick Calculator", href: "/calculator/brick-calculator" }, { label: "Paint Estimator", href: "/calculator/paint-cost" }], banner: { title: "Mix Precision", description: "Always maintain the correct water-cement ratio to ensure structural integrity.", image: "/images/construction-banner.jpg" } }}
      relatedTools={[{ label: "Brick Calculator", href: "/calculator/brick-calculator" }, { label: "Paint Cost", href: "/calculator/paint-cost" }]}
    />
  );
}
