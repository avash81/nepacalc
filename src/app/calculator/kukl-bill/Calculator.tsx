'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateKUKLBill } from '@/utils/math/country-rules/nepal';
import { 
  Droplets, Waves, Info, MapPin, Zap, Activity, Globe, 
  History, Scale, PieChart, Receipt, ArrowRight, Landmark, ShieldCheck, Target, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function KUKLCalculator() {
  const [state, setState] = useSyncState('kukl_institutional_v6', { 
    units: 15, 
    pipeSize: '0.5' as '0.5' | '0.75' 
  });
  const { units, pipeSize } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const raw = calculateKUKLBill(units, pipeSize);
    
    const pieData = [
      { name: 'Water Charge', val: raw.waterCharge, fill: '#1A73E8' },
      { name: 'Sewerage (50%)', val: raw.sewerageTax, fill: '#8AB4F8' }
    ];

    const chartData = [
      { name: 'Min (10kL)', val: pipeSize === '0.5' ? 150 : 2000 },
      { name: 'Current', val: raw.totalBill }
    ];

    return { ...raw, pieData, chartData };
  }, [units, pipeSize]);

  return (
    <ModernCalcLayout
      slug="kukl-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'KUKL Bill' }]}
      title="KUKL Water Bill"
      description="The definitive utility auditing engine for Kathmandu Valley. Calculate KUKL water bills with 100% precision, including volumetric charges and the 50% sewerage tax."
      icon={Droplets}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Pipe Connection Size</label>
                <div className="grid grid-cols-2 gap-2">
                 {['0.5', '0.75'].map(size => (
                   <button 
                     key={size} 
                     onClick={() => update({ pipeSize: size as any })} 
                     className={`h-12 text-[11px] font-black border rounded-md transition-all ${pipeSize === size ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}
                   >
                     {size} Inch
                   </button>
                 ))}
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Consumption (Units / kL)</label>
                <div className="relative">
                  <input 
                     type="number" 
                     value={units} 
                     onChange={(e) => update({ units: Number(e.target.value) })}
                     className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#1A73E8]">Units</span>
                </div>
                <p className="text-[9px] text-[#5F6368] font-bold uppercase tracking-wider mt-1">1 Unit = 1,000 Liters</p>
             </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Utility Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] border border-[#DADCE0] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Payable Bill</div>
             <div className="text-5xl font-black tracking-tight text-[#1A73E8]">{formatNPR(result.totalBill)}</div>
             <div className="flex justify-center mt-2">
               <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                 Inclusive of 50% Sewerage Tax
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Water Charge</div>
                <div className="text-xl font-black text-[#202124]">{formatNPR(result.waterCharge)}</div>
             </div>
             <div className="border border-[#1A73E8] rounded-md p-4 text-center bg-[#E8F0FE] shadow-sm">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Sewerage (50%)</div>
                <div className="text-xl font-black text-[#1A73E8]">{formatNPR(result.sewerageTax)}</div>
             </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0" />
             <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                Compliance Protocol: KUKL applies a strict 50% tax on the base water charge to fund municipal sewerage infrastructure. Minimum billing slabs apply.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Bill Composition Audit</h3>
               </div>
               <div className="h-[200px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie data={result.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="val" stroke="none">
                       {result.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                     </Pie>
                     <Tooltip cursor={{ fill: '#F8F9FA' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} formatter={(v: number) => formatNPR(v)} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Total</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.totalBill)}</span>
                 </div>
               </div>
               <div className="space-y-3 w-full">
                  {result.pieData.map((d, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-md border border-[#DADCE0]">
                        <div className="flex items-center gap-2">
                           <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                           <span className="text-[10px] font-bold text-[#5F6368] uppercase">{d.name}</span>
                        </div>
                        <span className="text-sm font-black text-[#202124]">{formatNPR(d.val)}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Volume Scaling Bar</h3>
               </div>
               <div className="h-[240px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#5F6368', fontWeight: 700}} />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: '#F8F9FA' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} formatter={(v: number) => formatNPR(v)} />
                      <Bar dataKey="val" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-4 p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-center">
                  <p className="text-[10px] text-[#5F6368] font-bold uppercase">
                    Compares current bill with minimum statutory charges.
                  </p>
               </div>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Connection: Select your pipe gauge (0.5 inch is standard for residential).",
          "Consumption: Enter the total units consumed (1 unit = 1,000L).",
          "Audit: Review the split between Water Charge and Sewerage Tax.",
          "Payment: Use digital wallets for real-time receipt generation.",
          "Optimization: Check for leaks if your units exceed 25 per month for a family of four."
        ]
      }}
      formula={{
        title: "The KUKL Volumetric Calculus",
        description: "Official KUKL tariff logic with mandatory sewerage multiplier.",
        raw: "Bill = (Fixed + Volumetric) × 1.50",
        variables: [
          "Fixed: Minimum base charge for first 10,000 liters",
          "Volumetric: Charge for units consumed beyond the base allowance",
          "Multiplier: 50% additional sewerage tax applied to total water charge"
        ]
      }}
      faqs={[
        { question: "How much is 1 unit of water in Kathmandu?", answer: "1 Unit is defined as 1,000 Liters (1 Cubic Meter). For a 0.5-inch connection, the first 10 units are covered under the base charge, with extra units billed at approx. Rs. 32 each." },
        { question: "Why is my KUKL bill 50% higher than the water charge?", answer: "KUKL adds a mandatory 50% Sewerage Charge to every bill to fund the maintenance of the valley's wastewater and drainage infrastructure." },
        { question: "What is the minimum bill for a 0.5 inch connection?", answer: "The minimum monthly bill is Rs. 150, which includes the Rs. 100 base water charge for up to 10,000 liters and the Rs. 50 sewerage tax." },
        { question: "How do I pay my KUKL bill online?", answer: "You can pay via eSewa, Khalti, or bank apps by searching for 'KUKL' and entering your CAN (Customer Account Number)." },
        { question: "What is 'Average Billing'?", answer: "If your meter is inaccessible or broken, KUKL calculates your bill based on a 3-6 month historical average. It is advisable to keep your meter accessible for accurate reading." },
        { question: "What is the penalty for late payment?", answer: "KUKL applies progressive surcharges (10% to 25%) if the bill is not paid within the designated grace period printed on your receipt." }
      ]}
      sidebar={{
        title: "Utility Hub",
        subtitle: "Nepal Utilities",
        links: [
          { label: "NEA Electricity Bill", href: "/calculator/nea-bill/", icon: Zap },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "KUKL Official", href: "https://kathmanduwater.org", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "NEA Electricity Bill", href: "/calculator/nea-bill/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" }
      ]}
    />
  );
}

