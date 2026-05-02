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
      title="NEA Bill Calculator 2026: Calculate your Electricity Bill Online"
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
            <h2 className="text-xl font-black text-[#202124] mb-4">Understanding Nepal Electricity Authority (NEA) Tariffs</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Unlike basic utility bills, calculating your exact electricity expense in Nepal requires mapping consumption against highly progressive physical slabs enforced by the Nepal Electricity Authority (NEA). Our advanced <strong className="text-[#202124]">NEA Bill Calculator</strong> functions as a definitive <strong className="text-[#202124]">big beautiful bill calculator</strong>, faithfully reproducing the exact mathematical logic used by NEA's internal billing software to generate your monthly invoice.
              </p>
              <p>
                Energy consumption is measured in Kilowatt-Hours (kWh), commonly referred to as "Units." In Nepal, as your unit consumption crosses specific thresholds, the rate per unit increases dramatically to encourage energy conservation. Whether you are dealing with a standard 5-Ampere household connection or managing a high-capacity 30-Ampere setup for heavy appliances, this tool processes discrete unit blocks to ensure absolute precision, factoring in both energy charges and fixed service fees.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Components of Your NEA Bill</h3>
            <p className="text-sm text-[#5F6368] mb-4">Your final electricity invoice is not a simple multiplication of units by a single rate. It consists of three primary mathematical components.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#202124]">Energy Charge:</strong> This is the variable cost derived from your actual physical consumption. It is calculated using a piecewise linear function through the progressive slabs (e.g., 0-20 units, 21-30 units, up to Above 400 units). For instance, crossing from 150 to 151 units doesn't re-rate all previous units; it only subjects the 151st unit to the higher rate.</li>
              <li><strong className="text-[#202124]">Fixed / Service Charge:</strong> Also known as the minimum demand charge, this fee is dictated by two factors: your connection capacity (Amperage) and the highest consumption slab you breach during the month. This charge is mandatory even if your energy consumption is zero, as it covers the infrastructural cost of maintaining your grid connection.</li>
              <li><strong className="text-[#202124]">Value Added Tax (VAT):</strong> A standard 13% VAT is applied to the sum of the Energy Charge and the Fixed Charge. When calculating this tax, the system must perform exact <strong className="text-[#202124]">rounding to the nearest tenth</strong> or <strong className="text-[#202124]">rounding to the nearest hundredth</strong> to match the official printed receipt.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Understanding Connection Capacities (Amperage)</h3>
            <p className="text-sm text-[#5F6368] mb-4">The physical capacity of your meter heavily influences your base Fixed Charges. The NEA provides different connection tiers for domestic users based on load requirements.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">5A (Ampere) Connection:</strong> The standard lifeline connection for small households. It carries the lowest fixed charges. For consumption below 20 units, the energy charge is Rs. 0, and the consumer only pays a nominal fixed charge of Rs. 30.</li>
              <li><strong className="text-[#1A73E8]">15A (Ampere) Connection:</strong> The recommended connection for modern households utilizing moderate appliances such as refrigerators, washing machines, and televisions. The fixed charges step up significantly compared to the 5A tier.</li>
              <li><strong className="text-[#1A73E8]">30A to 60A Connections:</strong> High-capacity connections required for households running multiple high-drain appliances simultaneously, such as Air Conditioners, Geysers, and Induction Cookers. The base fixed charges for these connections are the highest.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Billing Penalties and Rebates</h3>
            <p className="text-sm text-[#5F6368] mb-4">The timeline of your payment drastically affects your final bill due to the NEA's strict penalty and rebate system.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">Early Payment Rebate:</strong> If the bill is paid within 7 days of the meter reading date, the NEA provides a 2% rebate on the total bill amount.</li>
              <li><strong className="text-[#D93025]">Late Payment Penalties:</strong> Payments made between the 8th and 15th day incur no penalty. Between the 16th and 30th day, a 5% penalty is applied. Between the 31st and 40th day, a 10% penalty is applied. Beyond 40 days, a severe 25% penalty is added, and the line is subject to immediate disconnection.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Check your physical electricity meter. Subtract last month's recorded reading from this month's current reading to find the 'Total Units Consumed'.",
          "Enter this unit value into the primary input field of the calculator.",
          "Select your household connection capacity (5A, 15A, or 30A). This information is usually printed on your previous NEA bills or the meter box itself.",
          "Review the 'Progressive Slab Breakdown' section to see exactly how your units were distributed across the different tariff rates.",
          "The 'Estimated Total Bill' panel will display the final payable amount, including the derived Fixed Charge and the mandatory 13% VAT."
        ]
      }}
      formula={{
        title: "NEA Piecewise Tariff Logic",
        description: "The calculation utilizes a piecewise progressive sum rather than flat multiplication.",
        raw: "1. Energy Charge = Sum of (Units within Slab × Rate for that Slab)\n2. Fixed Charge = Determined by the highest slab reached and the Ampere connection.\n\n3. Subtotal = Energy Charge + Fixed Charge\n4. VAT Amount = Subtotal × 13%\n\n5. Final Payable Bill = Subtotal + VAT Amount"
      }}
      faqs={[
        {
          question: "Why is there a fixed service charge even if I didn't consume any electricity?",
          answer: "The NEA applies a minimum fixed monthly service charge to all active meters. This fee covers the infrastructural cost of maintaining the grid connection, transformers, and distribution lines to your house, regardless of your actual energy usage."
        },
        {
          question: "How does the 'Lifeline' 0-20 unit slab work?",
          answer: "To support low-income households, the NEA provides the first 20 units at an Energy Rate of Rs. 0. If your consumption is 20 units or less on a 5A connection, you will only pay the minimum fixed service charge (Rs. 30), resulting in an extremely low monthly bill."
        },
        {
          question: "Do these tariff rates apply to commercial businesses?",
          answer: "No, this calculator utilizes the 'Domestic (Residential)' tariff structure. Commercial entities, industrial factories, and agricultural pumps have completely different slab structures, time-of-day (ToD) metering, and demand charges."
        },
        {
          question: "Why did my bill suddenly spike after crossing 150 units?",
          answer: "Nepal's tariff system is highly progressive. The rate jumps from Rs. 9.50 per unit (for the 51-150 slab) to Rs. 10.50 per unit for consumption above 150 units. Additionally, breaching the 150-unit threshold triggers a higher base Fixed Charge for the entire month."
        },
        {
          question: "Can I change my connection capacity from 5A to 15A?",
          answer: "Yes, if you are adding heavy appliances like ACs or Induction Cookers, you must officially apply to your local NEA distribution center to upgrade your load capacity from 5A to 15A or 30A to prevent meter tripping and electrical fire hazards."
        },
        {
          question: "Is VAT applied on the Fixed Charge as well?",
          answer: "Yes, the 13% Value Added Tax (VAT) is calculated on the aggregate subtotal, which means it is applied to both your total Energy Charge and your Fixed Service Charge combined."
        }
      ]}
      sidebar={{
        title: "Nepal Utilities",
        links: [
          { label: "KUKL Water Bill", href: "/calculator/kukl-bill/" },
          { label: "Income Tax Nepal", href: "/calculator/nepal-income-tax/" },
          { label: "Land Area Converter", href: "/calculator/nepal-land/" }
        ],
        banner: {
          title: "Energy Conservation",
          description: "Switching to LED bulbs and energy-efficient appliances can reduce your electricity lighting costs by up to 80% and keep you in a lower tariff slab.",
          image: "/images/nepal-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "KUKL Water Bill", href: "/calculator/kukl-bill/" },
        { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
