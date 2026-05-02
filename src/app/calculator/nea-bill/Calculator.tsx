'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Zap, Info, Receipt, UtilityPole, Building2, History, Compass, Landmark, Lightbulb, ExternalLink, Sigma, HelpCircle, Activity, CreditCard, Clock, Ruler } from 'lucide-react';
import { GoogleResultCard, GoogleSubCard, GoogleTip } from '@/components/ui/ResultCard';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Link from 'next/link';

// Updated Tariff Data (2082/83) based on official logic
const TARIFF_SLABS = [
  { upTo: 20, rates: { '5A': 30, '15A': 50, '30A': 75, '60A': 125 }, energyBase: { '5A': 0.00, '15A': 4.00, '30A': 5.00, '60A': 6.00 }, energyCrossed: 3.00, label: '0-20 Units' },
  { upTo: 30, rates: { '5A': 50, '15A': 75, '30A': 100, '60A': 125 }, energy: 6.50, label: '21-30 Units' },
  { upTo: 50, rates: { '5A': 50, '15A': 75, '30A': 100, '60A': 125 }, energy: 8.00, label: '31-50 Units' },
  { upTo: 150, rates: { '5A': 75, '15A': 100, '30A': 125, '60A': 150 }, energy: 9.50, label: '51-150 Units' },
  { upTo: 250, rates: { '5A': 100, '15A': 125, '30A': 150, '60A': 200 }, energy: 9.50, label: '151-250 Units' },
  { upTo: null, rates: { '5A': 150, '15A': 175, '30A': 200, '60A': 250 }, energy: 11.00, label: '251+ Units' }
];

const inputCls = "w-full h-10 px-3 border border-[#DADCE0] rounded bg-white text-xs font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
const labelCls = "text-[10px] font-bold uppercase text-[#70757A] tracking-wider block mb-1";

function InputGroup({ title, icon: Icon, colorCls, children }: any) {
  return (
    <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
      <div className={`px-4 py-2 flex items-center gap-2 ${colorCls}`}>
        <Icon className="w-3 h-3 opacity-80" />
        <h3 className="text-[10px] font-bold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-4 grid grid-cols-1 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function NEABillCalculator() {
  const [units, setUnits] = useState(150);
  const [connectionAmps, setConnectionAmps] = useState<'5A' | '15A' | '30A' | '60A'>('5A');
  const [paymentWindow, setPaymentWindow] = useState<number>(1); // 1: 8-15
  const [isManualAdjustment, setIsManualAdjustment] = useState(false);
  const [manualAmount, setManualAmount] = useState(0);

  const result = useMemo(() => {
    let remaining = units;
    let energyCharge = 0;
    const breakdown = [];
    let prevLimit = 0;
    let currentFixed = 0;

    const slab1 = TARIFF_SLABS[0];
    const consumedSlab1 = Math.max(0, Math.min(units, 20));
    
    // Type-safe extraction of rates
    let slab1Rate = 0;
    if ('energyBase' in slab1 && slab1.energyBase) {
      slab1Rate = (slab1.energyBase as any)[connectionAmps] || 0;
    }
    
    if (connectionAmps === '5A' && units > 20 && 'energyCrossed' in slab1) {
      slab1Rate = (slab1 as any).energyCrossed || 0;
    }

    if (consumedSlab1 > 0) {
      const amount = consumedSlab1 * slab1Rate;
      energyCharge += amount;
      breakdown.push({ label: slab1.label, units: consumedSlab1, rate: slab1Rate, amount });
      remaining -= consumedSlab1;
    }
    prevLimit = 20;

    for (let i = 1; i < TARIFF_SLABS.length; i++) {
      const slab = TARIFF_SLABS[i];
      const limit = slab.upTo === null ? Infinity : slab.upTo;
      const slabRange = limit - prevLimit;
      const consumed = Math.max(0, Math.min(remaining, slabRange));

      if (consumed > 0) {
        const rate = slab.energy || 0;
        const amount = consumed * rate;
        energyCharge += amount;
        breakdown.push({ label: slab.label, units: consumed, rate, amount });
        remaining -= consumed;
      }
      prevLimit = limit;
      if (remaining <= 0) break;
    }

    const bracketSlab = TARIFF_SLABS.find((s) => s.upTo === null || units <= s.upTo) || TARIFF_SLABS[TARIFF_SLABS.length - 1];
    currentFixed = bracketSlab.rates[connectionAmps as keyof typeof bracketSlab.rates] || 0;

    const subtotal = energyCharge + currentFixed;
    const vatAmount = subtotal * 0.13;
    const baseTotal = subtotal + vatAmount;

    // Penalty / Rebate Logic
    let adjustment = 0;
    let adjustmentType: 'rebate' | 'penalty' | 'none' = 'none';
    
    if (isManualAdjustment) {
      adjustment = manualAmount;
      adjustmentType = manualAmount < 0 ? 'rebate' : (manualAmount > 0 ? 'penalty' : 'none');
    } else {
      if (paymentWindow === 0) {
        adjustment = -(baseTotal * 0.02);
        adjustmentType = 'rebate';
      } else if (paymentWindow === 2) {
        adjustment = (baseTotal * 0.05);
        adjustmentType = 'penalty';
      } else if (paymentWindow === 3) {
        adjustment = (baseTotal * 0.10);
        adjustmentType = 'penalty';
      } else if (paymentWindow === 4) {
        adjustment = (baseTotal * 0.25);
        adjustmentType = 'penalty';
      }
    }

    const finalTotal = baseTotal + adjustment;

    return { energyCharge, currentFixed, vatAmount, baseTotal, adjustment, adjustmentType, finalTotal, breakdown };
  }, [units, connectionAmps, paymentWindow, isManualAdjustment, manualAmount]);

  const fmt = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ModernCalcLayout
      slug="nea-bill"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'NEA Bill' }]}
      title="NEA Bill Calculator: Current Electricity Tariffs & Fine Guide"
      description="Calculate your Nepal electricity bill online. Get the exact 20 unit price, 40 unit cost, and all NEA tariff slabs for 2082/83. Includes fine calculation."
      icon={Zap}
      relatedTools={[
        { label: 'KUKL Water Bill', href: '/calculator/kukl-bill/' },
        { label: 'Income Tax 2082/83', href: '/calculator/nepal-income-tax/' },
        { label: 'Salary Calculator', href: '/calculator/nepal-salary/' },
        { label: 'VAT Calculator', href: '/calculator/nepal-vat/' },
        { label: 'Vehicle Tax', href: '/calculator/nepal-vehicle-tax/' }
      ]}
      seoContent={<></>}
      inputs={
        <div className="space-y-6">
          <InputGroup title="Meter Consumption Details" icon={Zap} colorCls="bg-[#E8F0FE] text-[#1A73E8] border-b border-[#C5D9F7]">
             <div>
                <label className={labelCls}>Units Consumed (kWh)</label>
                <input type="number" value={units} onChange={e => setUnits(Number(e.target.value))} min={0} className={inputCls} placeholder="0" />
             </div>
             <div>
                <label className={labelCls}>Connection Amperage</label>
                <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg overflow-x-auto">
                   {(['5A', '15A', '30A', '60A'] as const).map(amp => (
                     <button key={amp} onClick={() => setConnectionAmps(amp)}
                       className={`flex-1 py-1.5 px-3 text-[10px] font-bold uppercase transition-all rounded whitespace-nowrap ${connectionAmps === amp ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
                       {amp}
                     </button>
                   ))}
                </div>
             </div>
          </InputGroup>

          <InputGroup title="Payment & Fine Calculation" icon={Clock} colorCls="bg-amber-50 text-amber-700 border-b border-amber-100">
             <div className={`${isManualAdjustment ? 'col-span-4' : 'col-span-2'} flex flex-col gap-3`}>
                <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-1">
                   <label className="text-[10px] font-black uppercase text-amber-900">Adjustment Mode</label>
                   <button 
                    onClick={() => setIsManualAdjustment(!isManualAdjustment)}
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${isManualAdjustment ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-800'}`}
                   >
                     {isManualAdjustment ? 'Manual Input' : 'Auto Calculate'}
                   </button>
                </div>

                {!isManualAdjustment ? (
                   <div>
                      <label className={labelCls}>When are you paying?</label>
                      <select 
                        value={paymentWindow} 
                        onChange={(e) => setPaymentWindow(Number(e.target.value))}
                        className={inputCls}
                      >
                        <option value={0}>1-7 Days (2% Rebate)</option>
                        <option value={1}>8-15 Days (No Penalty)</option>
                        <option value={2}>16-30 Days (5% Penalty)</option>
                        <option value={3}>31-40 Days (10% Penalty)</option>
                        <option value={4}>41-60 Days (25% Penalty)</option>
                      </select>
                   </div>
                ) : (
                   <div className="grid grid-cols-1 gap-3">
                      <div>
                         <label className={labelCls}>Manual Fine/Rebate (Rs.)</label>
                         <input 
                            type="number" 
                            value={manualAmount} 
                            onChange={e => setManualAmount(Number(e.target.value))} 
                            className={inputCls} 
                            placeholder="Enter fine or -rebate" 
                         />
                         <p className="text-[8px] text-amber-600 font-bold uppercase mt-1">Use negative value for rebates (e.g. -50)</p>
                      </div>
                   </div>
                )}
             </div>
          </InputGroup>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
             <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Receipt className="w-3 h-3 text-[#1A73E8]" />
                <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#70757A]">Slab Distribution breakdown</h3>
             </div>
             <div className="p-4 space-y-3">
                {result.breakdown.map((b, i) => (
                   <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-[#5F6368]">{b.label} <span className="opacity-60 font-normal">({b.units}U @ {b.rate})</span></span>
                      <span className="text-[#202124]">Rs. {fmt(b.amount)}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <GoogleResultCard 
            title="Total Payable Amount"
            value={fmt(result.finalTotal)}
            badge={`${units} Units | ${connectionAmps} Meter`}
          />

          <div className="grid grid-cols-2 gap-4">
            <GoogleSubCard 
              title="Base Bill (Inc. VAT)"
              value={`Rs. ${fmt(result.baseTotal)}`}
              label="Standard Charge"
            />
            <GoogleSubCard 
              title={result.adjustmentType === 'rebate' ? 'Rebate Applied' : 'Fine / Penalty'}
              value={`${result.adjustmentType === 'rebate' ? '-' : ''}Rs. ${fmt(Math.abs(result.adjustment))}`}
              label={result.adjustmentType === 'none' ? 'No adjustment' : `${result.adjustmentType} calculated`}
              color={result.adjustmentType === 'rebate' ? '#188038' : (result.adjustmentType === 'penalty' ? '#D93025' : '#202124')}
              borderAccent={result.adjustmentType !== 'none'}
            />
          </div>

          <GoogleTip 
            title="Payment Alert"
            tip={paymentWindow === 4 
              ? "Warning: Your bill is over 41 days old. You are at high risk of line disconnection."
              : "Pay via NEA App, eSewa, or Khalti to get instant digital receipts."}
          />
        </div>
      }
      details={
        <div className="space-y-10 text-left">
           {/* 0. Definition Snippet (Moved from Top) */}
           <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm border-l-4 border-l-blue-600">
             <h2 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">What is the NEA Bill Calculator?</h2>
             <p className="text-[13px] text-[#5F6368] leading-relaxed">
               The <strong>NEA Bill Calculator</strong> is a digital utility tool used to estimate monthly electricity costs in Nepal based on current Nepal Electricity Authority tariff slabs. It calculates total payable amounts by processing units consumed through progressive slabs (e.g., 0-20, 21-30 units), adding fixed service charges and the mandatory 13% VAT.
             </p>
           </div>

           {/* 1. Primary Calculation Guide */}
           <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#202124] tracking-tight leading-tight">
                   How to Calculate Your <span className="text-blue-600">NEA Electricity Bill</span> in Nepal
                </h2>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Official NEA Logic 2082 Alignment</p>
              </div>
            </div>
            <div className="space-y-5 text-xs text-[#5F6368] leading-relaxed">
              <p>
                Managing electricity expenses is a core part of household budgeting in Nepal. The <strong>Nepal Electricity Authority (NEA)</strong> employs a progressive tariff system where the cost per unit increases as your consumption rises. This is designed to promote energy conservation while providing a "Lifeline" for low-consumption households.
              </p>
              <p>
                Our <strong>NEA Bill Calculator</strong> is precision-engineered to replicate the official billing logic. From the 20-unit free threshold for 5A meters to the complex piecewise slabs for industrial-grade loads, this tool ensures you have a zero margin of error when matching your digital statement or paper receipt.
              </p>
            </div>
          </div>

          {/* 2. Historical & Efficiency Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <History className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Evolution of Billing</h3>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Traditionally, electricity was billed at flat rates, but the shift to progressive slabs has allowed the NEA to cross-subsidize low-income families. Modern digital meters and the <strong>Public Access Model (PAM)</strong> now allow for real-time tracking via the NEA app. The current system prioritizes induction cooking, offering discounted rates for higher slabs to reduce LPG imports.
              </p>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Selection & Efficiency</h3>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Choosing the right Amperage (5A, 15A, or 30A) is critical. A 5A meter is best for light loads but will trip with an induction cooker. Upgrading to 15A increases your base Fixed Charge but allows for modern appliances. To minimize costs, aim to stay within the 0-20 or 21-50 unit blocks by using LED lighting and energy-star rated electronics.
              </p>
            </div>
          </div>

          {/* 3. NEA Billing Roadmap */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm ring-1 ring-blue-50">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                   <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-[#202124]">NEA Billing Roadmap (Essential Steps)</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: '01', title: 'Meter Reading', desc: 'Subtract previous reading from current total units.' },
                  { id: '02', title: 'Slab Mapping', desc: 'Distribute units into progressive tariff slabs.' },
                  { id: '03', title: 'Tax Injection', desc: 'Apply mandatory 13% VAT and Fixed Charges.' },
                  { id: '04', title: 'Payment', desc: 'Use NEA App, eSewa, or Khalti for rebates.' }
                ].map(step => (
                  <div key={step.id} className="relative pl-8 border-l-2 border-blue-100 last:border-0 sm:border-l-0 sm:pl-0 sm:pt-4 sm:border-t-2">
                    <div className="absolute left-0 top-0 sm:relative text-sm font-black text-blue-600 mb-1">{step.id}</div>
                    <h4 className="text-[15px] font-black uppercase tracking-wider text-[#202124] mb-1.5">{step.title}</h4>
                    <p className="text-[13px] text-[#5F6368] leading-snug font-medium">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* 4. Strategic Billing Optimization & Meter Mastery */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Landmark className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight">Strategic Billing Optimization</h3>
            </div>
            <div className="space-y-8 text-xs text-[#5F6368] leading-relaxed">
               <div className="space-y-3">
                  <h4 className="text-sm font-black text-[#202124] uppercase">1. The Induction Cooking Revolution (LPG vs. Electric)</h4>
                  <p>
                    With the rising cost of LPG gas cylinders in Nepal, switching to <strong>Electric Induction Cooking</strong> has become the single most effective way to reduce household energy bills. Based on 2082/83 tariffs, induction cooking is approximately <strong>40% cheaper</strong> than using gas. For a standard family of four, moving from the 21-50 unit slab to the 51-150 unit slab via induction actually results in a lower overall utility cost compared to the combined cost of electricity and a gas cylinder.
                  </p>
               </div>

               <div className="space-y-3">
                  <h4 className="text-sm font-black text-[#202124] uppercase">2. Understanding TOD (Time of Day) Billing</h4>
                  <p>
                    For larger domestic loads and industrial connections (over 15A or specialized meters), NEA offers <strong>Time of Day (TOD)</strong> billing. This divides the day into Peak (5 PM to 9 PM), Off-Peak (11 PM to 5 AM), and Normal hours. If you have a TOD meter, running heavy appliances like washing machines or charging electric vehicles during <strong>Off-Peak hours</strong> can reduce your energy rate by up to 25%.
                  </p>
               </div>

               <div className="space-y-3">
                  <h4 className="text-sm font-black text-[#202124] uppercase">3. Late Payment Penalty & Disconnection Schedule</h4>
                  <p>
                    The NEA is strict regarding payment timelines. Paying within <strong>7 days</strong> of the meter reading grants you a <strong>2% rebate</strong>. However, if you delay, the penalties escalate rapidly:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
                     <li className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                        <div className="font-black text-emerald-700">2% Rebate</div>
                        <div className="text-[9px]">1-7 Days</div>
                     </li>
                     <li className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <div className="font-black text-slate-700">No Penalty</div>
                        <div className="text-[9px]">8-15 Days</div>
                     </li>
                     <li className="p-3 bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl text-center">
                        <div className="font-black text-amber-700">5% Penalty</div>
                        <div className="text-[9px]">16-30 Days</div>
                     </li>
                     <li className="p-3 bg-[#FFF1F2] border border-[#FFE4E6] rounded-xl text-center">
                        <div className="font-black text-rose-700">10% Penalty</div>
                        <div className="text-[9px]">31-40 Days</div>
                     </li>
                     <li className="p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-center">
                        <div className="font-black text-red-700">25% Penalty</div>
                        <div className="text-[9px]">41+ Days</div>
                     </li>
                  </ul>
                  <p className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-900 font-bold text-center">
                    Note: Failure to pay by the 41st day results in immediate line disconnection without further notice.
                  </p>
               </div>

               <div className="space-y-3 pt-4 border-t border-[#DADCE0]">
                  <h4 className="text-sm font-black text-[#202124] uppercase">4. Pro Tip: Reading your Digital Meter</h4>
                  <p>
                    Modern digital meters in Nepal rotate through several screens. To verify your current bill, wait for the screen that shows <strong>"Total kWh"</strong> (usually the 3rd or 4th screen). If your meter has a push button, pressing it will cycle through the Date, Time, Voltage, and finally the Total Units. Always cross-check this number with the "Current Reading" on your NEA receipt to ensure zero billing errors.
                  </p>
               </div>
            </div>
          </div>

          {/* 5. Technical Measurement Deep Dive */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                <Sigma className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight">Technical Billing System</h3>
             </div>
             
             <div className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">1. Threshold Logic (5A)</h4>
                      <p className="text-xs text-[#5F6368] leading-relaxed">The "Free" status of the first 20 units is only applicable if the total consumption remains at or below 20 units. Once you hit 21 units, a base rate is applied.</p>
                      <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#DADCE0] text-center overflow-x-auto">
                        <BlockMath math="Units \le 20 \implies Cost = Rs.\ 0" />
                        <BlockMath math="Units > 20 \implies Slab\ 1 = 20 \times Rs.\ 3.00" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">2. Slab-Based Tax Math</h4>
                      <p className="text-xs text-[#5F6368] leading-relaxed">The final bill includes the sum of piecewise energy costs plus the service charge, all subject to a flat 13% VAT.</p>
                      <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#DADCE0] text-center overflow-x-auto">
                        <BlockMath math="Subtotal = \Sigma(Slab_{units} \times Rate) + Fixed" />
                        <BlockMath math="Final = Subtotal \times 1.13" />
                      </div>
                   </div>
                </div>

                <div className="border-t border-[#DADCE0] pt-8">
                   <h4 className="text-sm font-black text-[#202124] mb-4">Tariff Snapshot: Per Unit Rates</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {[
                        { u: '21-30 Slab', v: 'Rs. 6.50' },
                        { u: '31-50 Slab', v: 'Rs. 8.00' },
                        { u: '51-150 Slab', v: 'Rs. 9.50' },
                        { u: '251+ Slab', v: 'Rs. 11.00' }
                      ].map(row => (
                        <div key={row.u} className="p-3 bg-white border border-[#DADCE0] rounded-xl">
                           <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">{row.u}</div>
                           <div className="text-xs font-bold text-[#202124]">{row.v}</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Check your meter and subtract the previous reading from the current reading.",
          "Enter total units and select your Amperage capacity.",
          "Review the breakdown of slab-wise energy charges.",
          "Pay early (within 7 days) to claim your 2% rebate."
        ]
      }}
      formula={{
        title: "NEA Formula",
        description: "Official piecewise logic with 13% VAT injection.",
        raw: "Total = [(Energy + Fixed) * 1.13]"
      }}
      faqs={[
        {
          question: "How much does 40 units of electricity cost in Nepal?",
          answer: "For a standard 5A residential meter, 40 units cost approximately Rs. 288.15. This includes Rs. 60 (first 20 units at Rs. 3), Rs. 65 (21-30 slab), Rs. 80 (31-40 units), a Rs. 50 service charge, and 13% VAT."
        },
        {
          question: "Is the first 20 units of electricity actually free?",
          answer: "Yes, but only for 5A residential meters that consume exactly 20 units or less. In this case, you pay only the Rs. 30 minimum charge. If you use 21 units or more, the first 20 units are billed at a rate of Rs. 3.00 each."
        },
        {
          question: "What is the penalty for late payment of NEA bills?",
          answer: "The penalty depends on the number of days past your meter reading date: 1-7 days grants a 2% rebate; 16-30 days incurs a 5% penalty; 31-40 days incurs a 10% penalty; and 41+ days results in a 25% penalty plus potential disconnection."
        },
        {
          question: "How can I pay my NEA bill online in Nepal?",
          answer: "You can pay your NEA bill through digital wallets like eSewa, Khalti, or IME Pay. Additionally, most commercial bank apps support NEA utility payments. Simply enter your SC Number and Customer ID found on your physical bill."
        },
        {
          question: "What are the fixed service charges for 15A, 30A, and 60A meters?",
          answer: "For residential connections using 151+ units, fixed charges are: 15A (Rs. 125), 30A (Rs. 150), and 60A (Rs. 200). These are mandatory service fees added to your energy consumption cost."
        }
      ]}
    />
  );
}
