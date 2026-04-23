'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { format } from 'date-fns';
import { Calendar, Truck, ShoppingCart, ToggleLeft, ToggleRight, Info } from 'lucide-react';

type Mode = 'delivery' | 'order';
type Unit = 'days' | 'weeks' | 'months';

export default function LeadTimeCalculator() {
  const [mode, setMode] = useState<Mode>('delivery');
  const [baseDate, setBaseDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [leadTime, setLeadTime] = useState<string>('5');
  const [unit, setUnit] = useState<Unit>('days');
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(true);

  const res = useMemo(() => {
    let targetDate: Date | null = null;
    let calculationMethod = '';
    const parsedLeadTime = parseFloat(leadTime);

    if (!isNaN(parsedLeadTime) && baseDate) {
      const [year, month, day] = baseDate.split('-').map(Number);
      targetDate = new Date(year, month - 1, day);
      
      if (excludeWeekends && unit === 'days') {
        let daysCounter = 0;
        const step = mode === 'delivery' ? 1 : -1;
        while (daysCounter < parsedLeadTime) {
          targetDate.setDate(targetDate.getDate() + step);
          if (targetDate.getDay() !== 0 && targetDate.getDay() !== 6) daysCounter++;
        }
        calculationMethod = `Counted ${parsedLeadTime} business days ${mode === 'delivery' ? 'forward' : 'backward'}, skipping weekends.`;
      } else {
        const step = mode === 'delivery' ? 1 : -1;
        if (unit === 'days') {
          targetDate.setDate(targetDate.getDate() + (parsedLeadTime * step));
          calculationMethod = `Added standard elapsed calendar days.`;
        } else if (unit === 'weeks') {
          targetDate.setDate(targetDate.getDate() + (parsedLeadTime * 7 * step));
          calculationMethod = `Added elapsed weeks.`;
        } else if (unit === 'months') {
          targetDate.setMonth(targetDate.getMonth() + (parsedLeadTime * step));
          calculationMethod = `Adjusted calendar months.`;
        }
      }
    }
    return { targetDate, calculationMethod };
  }, [mode, baseDate, leadTime, unit, excludeWeekends]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'Lead Time Calculator' }]}
      title="Lead Time Calculator"
      description="Calculate expected delivery schedules or required order dates based on logistics lead time metrics. Automatically handles weekend exclusions."
      icon={Calendar}
      inputs={
        <div className="space-y-6">
          <div className="flex p-1 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <button onClick={() => setMode('delivery')} className={`flex-1 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 rounded transition-all ${mode === 'delivery' ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              <Truck className="w-4 h-4" /> Expected Delivery
            </button>
            <button onClick={() => setMode('order')} className={`flex-1 py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 rounded transition-all ${mode === 'order' ? 'bg-white text-[#1A73E8] shadow-sm border border-[#DADCE0]' : 'text-[#70757A] hover:bg-[#E8F0FE]'}`}>
              <ShoppingCart className="w-4 h-4" /> Order By Date
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelCls}>{mode === 'delivery' ? 'Order Placement Date' : 'Target Need-By Date'}</label>
              <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Lead Time Required</label>
              <div className="flex gap-2">
                <input type="number" min="0" step="1" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} className={inputCls} placeholder="e.g. 5" />
                <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="w-1/3 h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] outline-none">
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            {unit === 'days' && (
              <button onClick={() => setExcludeWeekends(!excludeWeekends)} className={`w-full p-4 border rounded-lg flex items-center justify-between transition-colors ${excludeWeekends ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-[#F8F9FA] border-[#DADCE0]'}`}>
                 <div className="text-left">
                    <div className={`text-sm font-bold ${excludeWeekends ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>Business Days Only</div>
                    <div className="text-[11px] text-[#70757A] mt-0.5">Skip Saturdays & Sundays in calculation</div>
                 </div>
                 {excludeWeekends ? <ToggleRight className="w-8 h-8 text-[#1A73E8]" /> : <ToggleLeft className="w-8 h-8 text-[#DADCE0]" />}
              </button>
            )}
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {res.targetDate ? (
            <>
              <div className="bg-white border border-[#DADCE0] rounded-lg p-8 text-center relative overflow-hidden shadow-sm">
                 <Calendar className="absolute top-0 right-0 p-4 w-24 h-24 text-[#F8F9FA] pointer-events-none" />
                 <h3 className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider mb-2 relative z-10">
                   {mode === 'delivery' ? 'Expected Arrival Date' : 'Order Must Be Placed By'}
                 </h3>
                 <div className="text-4xl font-black text-[#1A73E8] tracking-tighter mb-4 relative z-10">
                   {format(res.targetDate, 'MMMM d, yyyy')}
                 </div>
                 <div className="text-[11px] font-bold text-[#202124] bg-[#F8F9FA] py-2 px-4 rounded border border-[#DADCE0] inline-block relative z-10">
                   {format(res.targetDate, 'EEEE')}
                 </div>
              </div>

              <div className="p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg flex gap-3 items-start">
                 <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
                 <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-1">Calculation Context</h5>
                    <p className="text-[11px] text-[#202124] leading-relaxed font-medium">
                      {res.calculationMethod}
                    </p>
                 </div>
              </div>
            </>
          ) : (
            <div className="p-8 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-center">
               <p className="text-sm font-bold text-[#70757A]">Please enter a valid lead time to calculate the target date.</p>
            </div>
          )}
        </div>
      }
      howToUse={{ steps: ["Select your mode: Find when an order will arrive (Delivery) or find when you need to order to hit a deadline (Order).", "Enter your base reference date.", "Enter the lead time (time taken by supplier) and select the unit (days, weeks, months).", "If using days, toggle whether to count only business days (skips weekends) or all calendar days."] }}
      formula={{ title: "Lead Time Calculation Logic", description: "Gregorian calendar arithmetic.", raw: "Forward Mode:\nTarget Date = Start Date + Lead Time\n\nBackward Mode:\nRequired Order Date = Deadline Date - Lead Time\n\nBusiness Day Mode:\nIterates day by day, ignoring index 0 (Sunday) and 6 (Saturday)." }}
      faqs={[
        { question: "What is Lead Time?", answer: "Lead time is the latency between the initiation and execution of a process. In supply chain management, it is the time between placing an order and receiving it." },
        { question: "Does it account for public holidays?", answer: "No. The business day calculator specifically removes weekends (Saturdays and Sundays). You will need to manually add additional days if your lead time spans across known local holidays." }
      ]}
      sidebar={{ title: "Logistics Tools", links: [{ label: "Number Base Converter", href: "/calculator/base-converter" }, { label: "Standard Deviation", href: "/calculator/standard-deviation" }], banner: { title: "Supply Chain", description: "Accurate lead time tracking prevents stockouts and overstocking.", image: "/images/finance-banner.jpg" } }}
      relatedTools={[{ label: "Standard Deviation", href: "/calculator/standard-deviation" }]}
    />
  );
}
