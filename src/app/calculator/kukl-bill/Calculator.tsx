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
  const [state, setState] = useSyncState('kukl_institutional_v5', { 
    units: 15, 
    pipeSize: '0.5' as '0.5' | '0.75' 
  });
  const { units, pipeSize } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    const raw = calculateKUKLBill(units, pipeSize);
    
    const pieData = [
      { name: 'Water Charge', val: raw.waterCharge, fill: '#3b82f6' },
      { name: 'Sewerage (50%)', val: raw.sewerageTax, fill: '#60a5fa' }
    ];

    const chartData = [
      { name: 'Min (10kL)', val: pipeSize === '0.5' ? 150 : 2000 },
      { name: 'Current', val: raw.totalBill }
    ];

    return { ...raw, pieData, chartData };
  }, [units, pipeSize]);

  const inputBlock = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Pipe Connection Size</label>
            <div className="grid grid-cols-2 gap-2">
             {['0.5', '0.75'].map(size => (
               <button key={size} onClick={() => update({ pipeSize: size as any })} className={`py-2 text-[10px] font-bold border rounded transition-all ${pipeSize === size ? 'bg-[#1A73E8] border-[#1A73E8] text-[#202124] shadow-sm' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}>{size} Inch</button>
             ))}
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Consumption (Units / kL)</label>
            <input 
               type="number" 
               value={units} 
               onChange={(e) => update({ units: Number(e.target.value) })}
               className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
            />
            <p className="text-[9px] text-[#70757A] font-bold uppercase tracking-tighter">1 Unit = 1,000 Liters</p>
         </div>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="kukl-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'KUKL Bill' }]}
      title="KUKL Water Bill"
      description="The definitive utility auditing engine for Kathmandu Valley. Calculate KUKL water bills with 100% precision, including volumetric charges and the 50% sewerage tax."
      icon={Droplets}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Payable Bill</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.totalBill)}</div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">Inclusive of 50% Sewerage Tax</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white border border-[#DADCE0] rounded-md text-center space-y-1">
                <div className="text-[9px] font-bold text-[#70757A] uppercase">Water Charge</div>
                <div className="text-xl font-black text-[#202124]">{formatNPR(result.waterCharge)}</div>
             </div>
             <div className="p-5 bg-[#E8F0FE] border border-[#DADCE0] rounded-md text-center space-y-1">
                <div className="text-[9px] font-bold text-[#1A73E8] uppercase">Sewerage (50%)</div>
                <div className="text-xl font-black text-[#1A73E8]">{formatNPR(result.sewerageTax)}</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
               <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                  <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Bill Composition Audit</h3>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="h-[200px] w-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie data={result.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="val" stroke="none">
                          {result.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                     {result.pieData.map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded border border-[#DADCE0]">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }} />
                              <span className="text-[11px] font-bold text-[#5F6368] uppercase">{d.name}</span>
                           </div>
                           <span className="text-[11px] font-black text-[#202124]">{formatNPR(d.val)}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
               <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                  <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Volume Scaling Bar</h3>
               </div>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#70757A', fontWeight: 700}} />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px' }} formatter={(v: number) => formatNPR(v)} />
                      <Bar dataKey="val" fill="#1A73E8" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
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
        raw: "$$Total = (BaseCharge + ExtraUnits \\times Rate) \\times 1.50$$",
        latex: "Bill = (Fixed + Volumetric) \times 1.50"
      }}
      faqs={[
        { question: "How much is 1 unit of water in Kathmandu?", answer: "1 Unit is defined as 1,000 Liters (1 Cubic Meter). For a 0.5-inch connection, the first 10 units are covered under the base charge, with extra units billed at approx. Rs. 32 each." },
        { question: "Why is my KUKL bill 50% higher than the water charge?", answer: "KUKL adds a mandatory 50% Sewerage Charge to every bill to fund the maintenance of the valley's wastewater and drainage infrastructure." },
        { question: "What is the minimum bill for a 0.5 inch connection?", answer: "The minimum monthly bill is Rs. 150, which includes the Rs. 100 base water charge for up to 10,000 liters and the Rs. 50 sewerage tax." },
        { question: "How do I pay my KUKL bill online?", answer: "You can pay via eSewa, Khalti, or bank apps by searching for 'KUKL' and entering your CAN (Customer Account Number)." },
        { question: "What is 'Average Billing'?", answer: "If your meter is inaccessible or broken, KUKL calculates your bill based on a 3-6 month historical average. It is advisable to keep your meter accessible for accurate reading." },
        { question: "What is the penalty for late payment?", answer: "KUKL applies progressive surcharges (10% to 25%) if the bill is not paid within the designated grace period printed on your receipt." },
        { question: "Is this updated for the 2081/82 fiscal year?", answer: "Yes, this engine uses the latest volumetric slabs and sewerage multiplier currently mandated for Kathmandu Valley residents." }
      ]}
      sidebar={{
        title: "Utility Hub",
        subtitle: "Nepal Water",
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
