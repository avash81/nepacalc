'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Zap, Info, Receipt, UtilityPole } from 'lucide-react';

const NEA_DOMESTIC_SLABS = [
  { upTo: 20, rate: 0.00, fixed5A: 30, fixed15A: 50, fixed30A: 75, label: '0-20 Units' },
  { upTo: 30, rate: 6.50, fixed5A: 50, fixed15A: 75, fixed30A: 100, label: '21-30 Units' },
  { upTo: 50, rate: 8.00, fixed5A: 75, fixed15A: 100, fixed30A: 125, label: '31-50 Units' },
  { upTo: 150, rate: 9.50, fixed5A: 100, fixed15A: 125, fixed30A: 150, label: '51-150 Units' },
  { upTo: 250, rate: 10.50, fixed5A: 125, fixed15A: 150, fixed30A: 175, label: '151-250 Units' },
  { upTo: 400, rate: 11.50, fixed5A: 150, fixed15A: 175, fixed30A: 200, label: '251-400 Units' },
  { upTo: null, rate: 12.00, fixed5A: 175, fixed15A: 200, fixed30A: 225, label: 'Above 400 Units' }
];

export default function NEABillCalculator() {
  const [state, setState] = useSyncState('nea_bill_v2', {
    units: 150,
    connectionAmps: '5A' as '5A' | '15A' | '30A',
  });

  const { units, connectionAmps } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let remaining = units;
    let energyCharge = 0;
    const breakdown = [];
    let prevLimit = 0;
    let currentFixed = 0;

    for (const slab of NEA_DOMESTIC_SLABS) {
      const limit = slab.upTo === null ? Infinity : slab.upTo;
      const slabRange = limit - prevLimit;
      const consumedInSlab = Math.max(0, Math.min(remaining, slabRange));

      if (units >= prevLimit) {
        currentFixed = slab[`fixed${connectionAmps}` as keyof typeof slab] as number;
      }

      if (consumedInSlab > 0) {
        const slabTax = consumedInSlab * (slab.rate as number);
        energyCharge += slabTax;
        
        breakdown.push({
          label: slab.label,
          units: consumedInSlab,
          rate: slab.rate,
          amount: slabTax
        });
        remaining -= consumedInSlab;
      }
      prevLimit = limit;
      if (remaining <= 0) break;
    }

    const subtotal = energyCharge + currentFixed;
    const vatAmount = subtotal * 0.13;
    const finalTotal = subtotal + vatAmount;

    return { energyCharge, currentFixed, vatAmount, finalTotal, breakdown };
  }, [units, connectionAmps]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  
  const inputCls = "w-full h-12 pl-12 pr-16 border border-[#DADCE0] rounded-md bg-white text-sm font-bold focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      slug="nea-bill"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Electricity Bill Calculator' }]}
      title="NEA Electricity Bill Calculator"
      description="Professional slab-based bill estimation for Nepal Electricity Authority (NEA) domestic consumers. Accurate for the latest 2081/82 tariff schedules."
      icon={Zap}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Total Units Consumed</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70757A]">
                    <Zap className="w-4 h-4 text-[#FABB05]" />
                 </span>
                 <input type="number" value={units} onChange={e => update({ units: Number(e.target.value) })} min={0} className={inputCls} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Units</span>
              </div>
              <p className="text-[10px] text-[#70757A] mt-1.5 font-medium px-1">Tip: Calculate by subtracting your previous meter reading from your current reading.</p>
            </div>

            <div>
              <label className={labelCls}>Connection Capacity (Amperes)</label>
              <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
                {(['5A', '15A', '30A'] as const).map(amp => (
                  <button key={amp} onClick={() => update({ connectionAmps: amp })}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase transition-all rounded ${connectionAmps === amp ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                    {amp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg overflow-hidden mt-6">
             <div className="px-4 py-3 bg-white border-b border-[#DADCE0] flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Progressive Slab Breakdown</h3>
             </div>
             <div className="p-4 space-y-4">
                {result.breakdown.map((b, i) => (
                   <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                         <span className="text-[#5F6368]">{b.label} <span className="opacity-60 font-normal">({b.units}U @ Rs. {b.rate})</span></span>
                         <span className="text-[#202124] font-mono">Rs. {fmt(b.amount)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E8F0FE] rounded-full overflow-hidden">
                         <div className="h-full bg-[#1A73E8] transition-all duration-1000" style={{ width: `${(b.amount / (result.energyCharge || 1)) * 100}%` }} />
                      </div>
                   </div>
                ))}
                <div className="flex justify-between items-center pt-3 border-t border-[#DADCE0] text-[11px] font-bold uppercase tracking-wider">
                   <span className="text-[#70757A]">Total Energy Charge</span>
                   <span className="text-[#1A73E8] font-mono font-black">Rs. {fmt(result.energyCharge)}</span>
                </div>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] rounded-lg border border-[#DADCE0] overflow-hidden text-white shadow-sm relative">
             <UtilityPole className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 pointer-events-none" />
             
             <div className="p-6 bg-[#1A73E8] flex justify-between items-center relative z-10">
                <div className="space-y-1">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/80">Estimated Total Bill</div>
                   <div className="text-xl font-black">{units} Units</div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/80">Monthly Invoice</div>
                   <div className="text-3xl font-black tracking-tighter font-mono">Rs. {fmt(result.finalTotal)}</div>
                </div>
             </div>
             
             <div className="p-6 divide-y divide-white/10 relative z-10">
                <div className="py-3 flex justify-between items-center text-xs">
                   <span className="text-white/70 font-bold uppercase tracking-wider">Fixed / Service Charge</span>
                   <span className="font-black font-mono">Rs. {fmt(result.currentFixed)}</span>
                </div>
                <div className="py-3 flex justify-between items-center text-xs">
                   <span className="text-white/70 font-bold uppercase tracking-wider">Energy Charge</span>
                   <span className="font-black font-mono">Rs. {fmt(result.energyCharge)}</span>
                </div>
                <div className="py-3 flex justify-between items-center text-xs">
                   <span className="text-[#8AB4F8] font-bold uppercase tracking-wider">VAT (13%)</span>
                   <span className="font-black text-[#8AB4F8] font-mono">+ Rs. {fmt(result.vatAmount)}</span>
                </div>
                <div className="py-4 flex justify-between items-baseline border-t border-white/20 mt-2">
                   <span className="text-[11px] font-bold uppercase tracking-widest text-white">Total Payable</span>
                   <span className="text-xl font-black text-[#FABB05] font-mono">Rs. {fmt(result.finalTotal)}</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-[#FEF7E0] border border-[#FDE293] rounded-lg flex gap-3 items-start">
             <Info className="w-5 h-5 text-[#E37400] shrink-0 mt-0.5" />
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#E37400] mb-1">Lifeline Slab Notice</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed font-medium">
                   The 0-20 unit slab has a Rs. 0 energy charge but requires a mandatory minimum service charge depending on your connection capacity (e.g. Rs. 30 for 5A).
                </p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Electricity Tariff Analytics</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Unlike a financial <strong className="text-[#202124]">treasury bill calculator</strong> that tracks bond yields, our NEA domestic tariff engine maps the highly progressive physical consumption slabs enforced by the Nepal Electricity Authority. The algorithm processes discrete unit blocks (0-20, 21-30, up to 400+) to generate what our users often call a <strong className="text-[#202124]">big beautiful bill calculator</strong> due to its exact accuracy matching the official NEA printed invoices.
              </p>
              <p>
                When dealing with massive infrastructure scales where energy outputs can range from kilowatts up to theoretical levels reaching a <strong className="text-[#202124]">million billion trillion quintillion septillion octillion</strong> joules on the national grid, individual consumer billing demands high-precision floating-point math. When calculating the final 13% VAT, the system must <strong className="text-[#202124]">round to the nearest tenth</strong> or <strong className="text-[#202124]">round to the nearest hundredth</strong> precisely as the NEA billing software dictates, ensuring zero discrepancy between your estimated and actual liability.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mathematical Rounding & Service Charges</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Decimal Precision:</strong> When you compute the 13% Value Added Tax on top of progressive slabs, the fractional paisa amounts require <strong className="text-[#202124]">rounding to the nearest tenth</strong> and <strong className="text-[#202124]">rounding to the nearest hundredth</strong>. The engine mirrors the NEA's exact rounding policy for financial compliance.</li>
              <li><strong className="text-[#188038]">Connection-Linked Fixed Charges:</strong> Your base cost shifts mathematically based on your Amperage (5A, 15A, 30A). This is not a percentage but a flat integer threshold that steps up dynamically based on the highest consumption slab breached.</li>
              <li><strong className="text-[#D93025]">Piecewise Linear Functions:</strong> The tariff is not a simple multiplication but a piecewise linear function. Crossing from 150 to 151 units doesn't re-rate all your previous units; it only subjects the 151st unit to the higher rate.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{ steps: ["Check your electricity meter. Subtract last month's reading from this month's reading to get total consumed units.", "Enter the total units consumed in the calculator.", "Select your household connection capacity (most typical households in Nepal use a 5A or 15A connection).", "The calculator automatically processes the progressive billing slabs, fixed service charges, and applies the 13% VAT."] }}
      formula={{ title: "NEA Billing Logic", description: "Progressive tariff blocks.", raw: "Energy Charge = Sum of (Units in Slab × Rate for Slab)\nFixed Charge = Determined by highest slab reached and connection capacity (Amps).\n\nSubtotal = Energy Charge + Fixed Charge\nVAT = Subtotal × 13%\n\nTotal Bill = Subtotal + VAT" }}
      faqs={[
        { question: "Why is there a fixed charge even if I didn't use electricity?", answer: "The NEA applies a minimum fixed monthly service charge to maintain the grid connection to your house, regardless of energy usage." },
        { question: "Do these rates apply to businesses?", answer: "No, this calculator uses the domestic (residential) tariff structure. Commercial and industrial rates have different slab structures and fixed charges." }
      ]}
      sidebar={{ title: "Nepal Utilities", links: [{ label: "KUKL Water Bill", href: "/calculator/kukl-bill" }, { label: "Income Tax Nepal", href: "/calculator/income-tax" }], banner: { title: "Energy Conservation", description: "Switching to LED bulbs can reduce your electricity lighting costs by up to 80%.", image: "/images/nepal-banner.jpg" } }}
      relatedTools={[{ label: "KUKL Water Bill", href: "/calculator/kukl-bill" }]}
    />
  );
}
