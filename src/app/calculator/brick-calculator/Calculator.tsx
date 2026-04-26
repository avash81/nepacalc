'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Grid, Hammer, AlertTriangle } from 'lucide-react';

export default function BrickCalculator() {
  const [length, setLength] = useState(10);
  const [height, setHeight] = useState(10);
  const [thickness, setThickness] = useState(9);
  const [brickL, setBrickL] = useState(9);
  const [brickW, setBrickW] = useState(4.5);
  const [brickH, setBrickH] = useState(3);
  const [mortar, setMortar] = useState(0.5);

  const result = useMemo(() => {
    const wallVol = length * 12 * height * 12 * thickness;
    const brickVol = (brickL + mortar) * (brickW + mortar) * (brickH + mortar);
    const numBricks = Math.ceil(wallVol / brickVol);
    const totalBricks = Math.ceil(numBricks * 1.05); // 5% wastage
    return { totalBricks, wallArea: length * height, wallVol: (wallVol / 1728).toFixed(2), numBricks };
  }, [length, height, thickness, brickL, brickW, brickH, mortar]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Brick Calculator' }]}
      title="Brick Calculator (Nepal)"
      description="Calculate the exact number of bricks required for your wall construction. Pre-configured with Nepal standard brick dimensions and 5% material wastage."
      icon={Grid}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className={labelCls}>Wall Length</label>
               <div className="relative">
                 <input type="number" value={length} min={0.1} onChange={e => setLength(Number(e.target.value))} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">ft</span>
               </div>
            </div>
            <div>
               <label className={labelCls}>Wall Height</label>
               <div className="relative">
                 <input type="number" value={height} min={0.1} onChange={e => setHeight(Number(e.target.value))} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">ft</span>
               </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelCls}>Wall Thickness Standard</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {[{ v: 9, l: '9 Inch (Double Layer)' }, { v: 4.5, l: '4.5 Inch (Single Layer)' }].map(opt => (
                <button key={opt.v} onClick={() => setThickness(opt.v)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${thickness === opt.v ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg space-y-4">
            <div className="text-[11px] font-bold uppercase text-[#202124] tracking-wider mb-2">Advanced: Brick Dimensions (inches)</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                 <label className="text-[10px] font-bold uppercase text-[#70757A] mb-1 block">Length</label>
                 <input type="number" value={brickL} min={1} onChange={e => setBrickL(Number(e.target.value))} className="w-full h-10 px-2 border border-[#DADCE0] rounded bg-white text-xs text-center focus:border-[#1A73E8] outline-none" />
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase text-[#70757A] mb-1 block">Width</label>
                 <input type="number" value={brickW} min={1} onChange={e => setBrickW(Number(e.target.value))} className="w-full h-10 px-2 border border-[#DADCE0] rounded bg-white text-xs text-center focus:border-[#1A73E8] outline-none" />
              </div>
              <div>
                 <label className="text-[10px] font-bold uppercase text-[#70757A] mb-1 block">Height</label>
                 <input type="number" value={brickH} min={1} onChange={e => setBrickH(Number(e.target.value))} className="w-full h-10 px-2 border border-[#DADCE0] rounded bg-white text-xs text-center focus:border-[#1A73E8] outline-none" />
              </div>
            </div>
            <div>
               <label className="text-[10px] font-bold uppercase text-[#70757A] mb-1 block">Mortar Joint Thickness (inches)</label>
               <input type="number" value={mortar} min={0} max={2} step={0.1} onChange={e => setMortar(Number(e.target.value))} className="w-full h-10 px-3 border border-[#DADCE0] rounded bg-white text-xs focus:border-[#1A73E8] outline-none" />
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Hammer className="w-24 h-24 text-[#E37400]" />
             </div>
             <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2 relative z-10">Total Bricks Required</div>
             <div className="text-5xl font-black text-[#E37400] tracking-tighter mb-2 relative z-10">{result.totalBricks.toLocaleString()}</div>
             <div className="text-[10px] font-bold text-[#E37400] uppercase bg-[#FFF7E0] inline-flex px-3 py-1 rounded relative z-10 tracking-wider">Includes 5% Wastage</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
                <span className="text-[10px] font-bold text-[#70757A] uppercase">Construction Specifications</span>
             </div>
             <div className="divide-y divide-[#DADCE0]">
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Wall Surface Area</span><span className="font-black">{result.wallArea} sq.ft</span></div>
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Total Wall Volume</span><span className="font-black text-[#1A73E8]">{result.wallVol} ft³</span></div>
                <div className="p-3 flex justify-between text-xs"><span className="text-[#5F6368]">Calculated Density</span><span className="font-black">{(result.numBricks / result.wallArea).toFixed(1)} Bricks / sq.ft</span></div>
                <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]"><span className="font-bold text-[#202124]">Base Bricks (No Wastage)</span><span className="font-black">{result.numBricks.toLocaleString()}</span></div>
             </div>
          </div>

          <div className="flex gap-3 p-4 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
             <AlertTriangle className="w-5 h-5 text-[#E37400] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-relaxed">This tool calculates standard solid brick requirements. For AAC blocks, hollow concrete blocks, or specialized materials, the dimensions and wastage ratios will differ significantly. Always confirm with your site engineer before ordering materials.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Masonry Estimation for Nepal</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Accurate material estimation is the cornerstone of cost-effective construction in Nepal. Our <strong className="text-[#202124]">brick calculator nepal</strong> engine is specifically calibrated to local manufacturing standards. By default, it processes the standard Nepalese brick dimensions (9" x 4.5" x 3") while mathematically accounting for the volumetric displacement of a standard 0.5-inch mortar joint.
              </p>
              <p>
                A frequent query among civil engineering students and contractors is <strong className="text-[#202124]">how many bricks in 1 square feet in nepal</strong>. Instead of relying on rough rules of thumb (which often ignore mortar ratios and site wastage), this tool runs a precise 3D volumetric analysis. It divides the total wall volume by the effective volume of a single brick (including its mortar shell) to prevent both material shortages and costly over-ordering.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Wall Thickness and Wastage Metrics</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Load-Bearing Structures (Double Layer):</strong> For exterior perimeters and primary load-bearing partitions, a <strong className="text-[#202124]">9 inch wall brick calculation</strong> is mandatory. This doubles the volumetric requirement and alters the mortar ratio, which the algorithm handles automatically.</li>
              <li><strong className="text-[#188038]">Partition Walls (Single Layer):</strong> Interior room dividers typically utilize a <strong className="text-[#202124]">4.5 inch wall brick calculation</strong>. Because the wall thickness equals the width of a single brick, the mathematical volume drops significantly, yielding higher area coverage per thousand bricks.</li>
              <li><strong className="text-[#D93025]">The 5% Wastage Mandate:</strong> Theoretical mathematics must account for real-world friction. During transport, unloading, and site cutting, breakage is inevitable. The calculator strictly applies a 5% inflation factor to the raw brick count to ensure you have enough unbroken materials to finish the span.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the total length and height of the wall in feet.", "Select whether the wall is single layer (4.5 inch) or double layer (9 inch).", "The tool uses standard Nepali brick dimensions (9x4.5x3 inches). You can modify this in the advanced section if using custom bricks.", "View the final estimate which automatically accounts for mortar joints and 5% breakage wastage."] }}
      formula={{ title: "Volume Constraint Formula", description: "Calculating total volume ratio.", raw: "Wall Volume = Length × Height × Thickness\nBrick Volume (with mortar) = (L + mortar) × (W + mortar) × (H + mortar)\nBase Bricks = Wall Volume / Brick Volume\nTotal Required = Base Bricks × 1.05 (5% Wastage)" }}
      faqs={[
        { question: "Why is mortar thickness included in the calculation?", answer: "Mortar takes up significant volume in a wall. A standard 0.5-inch mortar joint is applied to all brick faces, so each effective brick unit is 9.5\" × 5\" × 3.5\" instead of 9\" × 4.5\" × 3\". Without this adjustment, you would overestimate the brick count by 15–20%, leading to unnecessary material cost." },
        { question: "Can I use this for non-Nepali bricks or AAC blocks?", answer: "Yes. Expand the 'Advanced: Brick Dimensions' section and input the exact Length, Width, and Height in inches of your bricks. For AAC (Autoclaved Aerated Concrete) blocks, common sizes are 24\"×8\"×4\" or 24\"×8\"×6\". The mortar joint for AAC is typically just 0.125–0.25 inches (thin-bed mortar)." },
        { question: "How many bricks are needed for 1 square foot of wall in Nepal?", answer: "For a standard 4.5-inch (single layer) wall using 9×4.5×3 inch bricks with 0.5-inch mortar: approximately 5.5–6 bricks per square foot. For a 9-inch (double layer) wall: approximately 11–12 bricks per square foot. These figures include the standard 5% wastage factor." },
        { question: "What does the 5% wastage factor mean?", answer: "During brick delivery, unloading, and construction cutting (for corners, doors, windows), typically 3–7% of bricks get damaged or wasted. This calculator applies a conservative 5% overhead to the base count to ensure you order enough material to complete the project without interruption. For very large projects, consider using 7–10% wastage." },
        { question: "What is the difference between a 4.5-inch and 9-inch wall?", answer: "A 4.5-inch (single layer) wall uses bricks placed with their width (4.5\") as the wall thickness. Used for interior partitions — not load-bearing. A 9-inch (double layer) wall has bricks placed end-to-end, doubling the thickness. Required for all exterior walls and structural/load-bearing internal walls in Nepali construction standards." },
        { question: "How do I estimate the cost of bricks for my project?", answer: "As of 2025, standard Nepalese bricks cost approximately NPR 12–18 per brick (price varies by district). Multiply the total brick count from this calculator by the local market rate. For a typical 10×10 ft single-layer wall, you'd need ~600 bricks, costing around NPR 7,200–10,800 in materials alone, before mortar and labor." }
      ]}
      sidebar={{ title: "Construction Tools", links: [{ label: "Concrete Mix Calculator", href: "/calculator/concrete-mix" }, { label: "Paint Cost Estimator", href: "/calculator/paint-cost" }, { label: "Property Registration", href: "/calculator/property-registration" }], banner: { title: "Site Estimator", description: "Accurate material calculation prevents project delays and excess holding costs.", image: "/images/construction-banner.jpg" } }}
      relatedTools={[{ label: "Concrete Mix", href: "/calculator/concrete-mix" }, { label: "Paint Cost", href: "/calculator/paint-cost" }]}
    />
  );
}
