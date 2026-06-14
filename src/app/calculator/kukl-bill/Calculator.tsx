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
      title="KUKL Water Bill 2083/84"
      description="Calculate your KUKL water bill instantly. Enter your meter reading and pipe size to get your Water Charge + Sewerage Charge breakdown for FY 2083/84."
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
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Calculate My Water Bill
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

          <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-start">
             <ShieldCheck className="w-5 h-5 text-[#188038] shrink-0 mt-0.5" />
             <div>
               <p className="text-[11px] font-bold text-[#202124] mb-0.5">How your bill is calculated</p>
               <p className="text-[9px] text-[#5F6368] font-medium leading-relaxed">KUKL automatically adds a 50% sewerage fee on top of your water charge. This pays for Kathmandu Valley's wastewater system. Minimum charges apply even for low usage months.</p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                  <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Bill Breakdown</h3>
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
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Compared to Minimum Bill</h3>
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
      howToUse={{ steps: [] }}
      formula={{ title: "", description: "", raw: "", variables: [] }}
      faqs={[]}
      sidebar={{ title: "", subtitle: "", links: [] }}
      relatedTools={[]}
    />
  );
}

