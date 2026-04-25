'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateKUKLBill } from '@/utils/math/country-rules/nepal';
import { Droplets, Waves, Info, MapPin } from 'lucide-react';

export default function KUKLCalculator() {
  const [state, setState] = useSyncState('kukl_v2', { units: 15, pipeSize: '0.5' as '0.5' | '0.75' });
  const { units, pipeSize } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => calculateKUKLBill(units, pipeSize), [units, pipeSize]);
  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  const inputCls = "w-full h-12 pl-12 pr-14 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'KUKL Water Bill' }]}
      title="KUKL Water Bill Calculator"
      description="Estimate your monthly water bill from Kathmandu Upatyaka Khanepani Limited (KUKL). Automatically calculates slab-based charges and the mandatory 50% sewerage tax."
      icon={Droplets}
      inputs={
        <div className="space-y-6">
           <div className="space-y-4">
              <div>
                 <label className={labelCls}>Total Monthly Consumption</label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70757A]">
                       <Droplets className="w-4 h-4" />
                    </span>
                    <input type="number" value={units} min={0} onChange={e => update({ units: Number(e.target.value) })} className={inputCls} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Units</span>
                 </div>
                 <p className="text-[10px] text-[#70757A] mt-1.5 font-bold px-1">Note: 1 Unit = 1,000 Liters</p>
              </div>

              <div>
                 <label className={labelCls}>Pipe Connection Size</label>
                 <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
                    {(['0.5', '0.75'] as const).map(size => (
                       <button key={size} onClick={() => update({ pipeSize: size })}
                         className={`flex-1 py-2 text-[11px] font-black uppercase transition-all rounded ${pipeSize === size ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                         {size} Inch
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-5 bg-[#F8F9FA] rounded-lg border border-[#DADCE0] space-y-2">
              <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-[#1A73E8]" />
                 <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#202124]">Kathmandu Valley Base Logic</h3>
              </div>
              <p className="text-[11px] text-[#5F6368] leading-relaxed">
                The minimum monthly charge covers up to <strong>10 Units (10,000 Liters)</strong>. Any consumption above this threshold is charged at a progressive volumetric rate per extra unit.
              </p>
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] rounded-lg overflow-hidden border border-[#DADCE0]">
             <div className="p-6 bg-[#1A73E8] flex justify-between items-center relative overflow-hidden">
                <div className="relative z-10 space-y-1">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Estimated Monthly Invoice</div>
                   <div className="text-xl font-black text-white">{units} Units ({units * 1000}L)</div>
                </div>
                <Droplets className="w-12 h-12 text-white/20 absolute -right-2 -bottom-2" />
             </div>
             
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                   <span className="text-xs text-white/70 uppercase tracking-wider font-bold">Water Consumption Charge</span>
                   <span className="text-sm font-black text-white font-mono">Rs. {fmt(result.waterCharge)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                   <div className="flex items-center gap-2">
                      <Waves className="w-3.5 h-3.5 text-[#8AB4F8]" />
                      <span className="text-xs text-[#8AB4F8] uppercase tracking-wider font-bold">Sewerage Tax (50%)</span>
                   </div>
                   <span className="text-sm font-black text-[#8AB4F8] font-mono">+ Rs. {fmt(result.sewerageTax)}</span>
                </div>
                <div className="pt-2 flex justify-between items-baseline">
                   <span className="text-[11px] font-bold text-white uppercase tracking-wider">Final Total Bill</span>
                   <span className="text-4xl font-black text-white tracking-tighter font-mono">Rs. {fmt(result.totalBill)}</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex gap-3 items-start">
             <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-relaxed font-bold">
               A standard 50% Sewerage Charge is added automatically to your total water consumption amount. This covers city-wide drainage and waste management services across the valley.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Decoding KUKL Water Tariffs</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Navigating monthly utilities in the Kathmandu Valley requires understanding the specific tariff structures set by Kathmandu Upatyaka Khanepani Limited. Our <strong className="text-[#202124]">kukl water bill calculation nepal</strong> engine is designed to instantly parse these fixed and variable costs. Whether you are using a standard 0.5-inch residential connection or a high-capacity 0.75-inch pipe, the algorithm automatically maps your meter units against the exact <strong className="text-[#202124]">kukl tariff rate 2081</strong> limits.
              </p>
              <p>
                Unlike standard power utilities, water billing includes mandatory civic overheads. Before you attempt a <strong className="text-[#202124]">khanepani bill check online</strong>, this tool allows you to pre-audit your expected invoice by projecting both the baseline water consumption charge and the strictly enforced <strong className="text-[#202124]">sewerage tax nepal water bill</strong> additions.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Billing Architecture</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Volumetric Minimums:</strong> The KUKL matrix establishes a base protection floor. For 0.5-inch connections, the minimum monthly charge covers up to 10,000 liters (10 units). Dropping below this usage does not reduce the base fee.</li>
              <li><strong className="text-[#188038]">The 50% Sewerage Mandate:</strong> The most significant friction cost in the final bill is the civic sewerage tax. The algorithm strictly applies a mathematical 50% multiplier to the raw water charge to account for city drainage maintenance.</li>
              <li><strong className="text-[#D93025]">Pipe Capacity Penalties:</strong> Upgrading from a 0.5-inch to a 0.75-inch connection fundamentally alters the base matrix. The minimum charge floor rises exponentially to account for the increased volumetric flow potential, regardless of actual usage.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Check your KUKL water meter and find the total units consumed for the month.", "Select your pipe connection size (most residential homes use 0.5 Inch).", "The calculator instantly computes your base charge, extra unit charge, and the mandatory sewerage tax.", "Note: 1 Unit on the meter equals 1,000 liters of water."] }}
      formula={{ title: "KUKL Tariff Structure (0.5 Inch)", description: "Based on official KUKL rates.", raw: "Minimum Charge (Up to 10 Units) = Rs. 100\nExtra Unit Rate (Above 10) = ~Rs. 32 per unit\n\nBase Water Charge = Minimum Charge + (Extra Units × Rate)\nSewerage Tax = Base Water Charge × 50%\n\nTotal Bill = Base Water Charge + Sewerage Tax" }}
      faqs={[
        { question: "Why is the bill so high even with low usage?", answer: "Because of the mandatory 50% sewerage tax. Even if you use only the minimum 10 units (Rs. 100), your final bill will be Rs. 150." },
        { question: "What if my meter is broken?", answer: "KUKL will charge you an average bill based on your historical usage until the meter is replaced." }
      ]}
      sidebar={{ title: "Nepal Utilities", links: [{ label: "NEA Electricity Bill", href: "/calculator/nea-bill" }, { label: "Income Tax Calculator", href: "/calculator/income-tax" }], banner: { title: "Save Water", description: "Promptly repair leaks. A dripping tap wastes over 5,000 liters a year.", image: "/images/nepal-banner.jpg" } }}
      relatedTools={[{ label: "NEA Electricity Bill", href: "/calculator/nea-bill" }]}
    />
  );
}
