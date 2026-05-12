'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Zap, Info, Receipt, UtilityPole, Building2, History, Compass, 
  Landmark, Lightbulb, ExternalLink, Sigma, HelpCircle, Activity, 
  CreditCard, Clock, Ruler, ShieldCheck, Target, Globe, ArrowRight, PieChart, Table
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart as RePieChart, Pie 
} from 'recharts';

const TARIFF_SLABS = [
  { upTo: 20, rates: { '5A': 30, '15A': 50, '30A': 75, '60A': 125 }, energyBase: { '5A': 0.00, '15A': 4.00, '30A': 5.00, '60A': 6.00 }, energyCrossed: 3.00, label: '0-20 Units' },
  { upTo: 30, rates: { '5A': 50, '15A': 75, '30A': 100, '60A': 125 }, energy: 6.50, label: '21-30 Units' },
  { upTo: 50, rates: { '5A': 50, '15A': 75, '30A': 100, '60A': 125 }, energy: 8.00, label: '31-50 Units' },
  { upTo: 150, rates: { '5A': 75, '15A': 100, '30A': 125, '60A': 150 }, energy: 9.50, label: '51-150 Units' },
  { upTo: 250, rates: { '5A': 100, '15A': 125, '30A': 150, '60A': 200 }, energy: 9.50, label: '151-250 Units' },
  { upTo: null, rates: { '5A': 150, '15A': 175, '30A': 200, '60A': 250 }, energy: 11.00, label: '251+ Units' }
];

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NEABillCalculator() {
  const [units, setUnits] = useState(150);
  const [connectionAmps, setConnectionAmps] = useState<'5A' | '15A' | '30A' | '60A'>('5A');
  const [paymentWindow, setPaymentWindow] = useState<number>(1); // 1: 8-15

  const result = useMemo(() => {
    let remaining = units;
    let energyCharge = 0;
    const slabBreakdown: any[] = [];
    let prevLimit = 0;

    // Slab 1 Logic
    const slab1 = TARIFF_SLABS[0];
    const consumedSlab1 = Math.max(0, Math.min(units, 20));
    let slab1Rate = (slab1.energyBase as any)[connectionAmps] || 0;
    if (connectionAmps === '5A' && units > 20) slab1Rate = 3.00;

    if (consumedSlab1 > 0) {
      const amount = consumedSlab1 * slab1Rate;
      energyCharge += amount;
      slabBreakdown.push({ label: '0-20 Units', amount, units: consumedSlab1, rate: slab1Rate });
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
        slabBreakdown.push({ label: slab.label, amount, units: consumed, rate });
        remaining -= consumed;
      }
      prevLimit = limit;
      if (remaining <= 0) break;
    }

    const bracketSlab = TARIFF_SLABS.find((s) => s.upTo === null || units <= s.upTo) || TARIFF_SLABS[TARIFF_SLABS.length - 1];
    const fixedCharge = (bracketSlab.rates as any)[connectionAmps] || 0;
    const subtotal = energyCharge + fixedCharge;
    const vat = subtotal * 0.13;
    const baseTotal = subtotal + vat;

    let adjustment = 0;
    if (paymentWindow === 0) adjustment = -(baseTotal * 0.02);
    else if (paymentWindow === 2) adjustment = (baseTotal * 0.05);
    else if (paymentWindow === 3) adjustment = (baseTotal * 0.10);
    else if (paymentWindow === 4) adjustment = (baseTotal * 0.25);

    const finalTotal = baseTotal + adjustment;

    const pieData = [
      { name: 'Energy Consumption', value: energyCharge },
      { name: 'Fixed Service Charge', value: fixedCharge },
      { name: 'VAT (13%)', value: vat }
    ].filter(d => d.value > 0);

    return { energyCharge, fixedCharge, vat, baseTotal, adjustment, finalTotal, slabBreakdown, pieData };
  }, [units, connectionAmps, paymentWindow]);

  return (
    <ModernCalcLayout
      slug="nea-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Electricity Bill' }]}
      title="NEA Bill"
      description="The definitive utility auditing engine for Nepal. Calculate monthly electricity bills with 100% precision based on NEA 2082/83 progressive tariff slabs."
      icon={Zap}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly Consumption (Units/kWh)</label>
               <input 
                  type="number" 
                  value={units} 
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Meter Capacity</label>
                  <select 
                    value={connectionAmps} 
                    onChange={(e) => setConnectionAmps(e.target.value as any)}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  >
                    <option value="5A">5 Ampere (Residential)</option>
                    <option value="15A">15 Ampere</option>
                    <option value="30A">30 Ampere</option>
                    <option value="60A">60 Ampere</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Window</label>
                  <select 
                    value={paymentWindow} 
                    onChange={(e) => setPaymentWindow(Number(e.target.value))}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  >
                    <option value={0}>1-7 Days (2% Digital Rebate)</option>
                    <option value={1}>8-15 Days (Standard)</option>
                    <option value={2}>16-30 Days (5% Fine)</option>
                    <option value={3}>31-40 Days (10% Fine)</option>
                    <option value={4}>41+ Days (25% Fine)</option>
                  </select>
               </div>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Calculate Utility Bill
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Payable Amount</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.finalTotal)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Effective Rate: {(result.finalTotal / Math.max(1, units)).toFixed(2)} / Unit</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Energy Charge</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.energyCharge)}</div>
             </div>
             <div className={`border rounded-md p-4 text-center ${result.adjustment < 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                <div className={`text-[10px] font-bold uppercase mb-1 ${result.adjustment < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {result.adjustment < 0 ? 'Rebate' : 'Fine'}
                </div>
                <div className={`text-lg font-black ${result.adjustment < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {formatNPR(result.adjustment)}
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Bill Composition</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#1A73E8" />
                       <Cell fill="#fbbf24" />
                       <Cell fill="#D93025" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Subtotal</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.baseTotal)}</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Energy</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div> Fixed</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> VAT</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Progressive Slabs</h3>
               </div>
               <div className="space-y-3">
                  {result.slabBreakdown.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0]">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-[#5F6368] uppercase">{s.label}</span>
                          <span className="text-[11px] font-black text-[#202124]">{formatNPR(s.amount)}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] text-[#70757A]">{s.units} Units consumed</span>
                          <span className="text-[9px] font-bold text-[#1A73E8]">@ Rs. {s.rate} / Unit</span>
                       </div>
                    </div>
                  ))}
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">NEA 2082/83 Tariff Audit</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">Consumption Block</th>
                    <th className="px-6 py-4 bg-white text-right">Fixed Charge</th>
                    <th className="px-6 py-4 bg-white text-right">Energy Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {TARIFF_SLABS.map((s, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{s.label}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">Rs. {(s.rates as any)[connectionAmps]}</td>
                      <td className="px-6 py-4 text-right font-black text-[#1A73E8]">Rs. {s.energy || (s.energyBase as any)[connectionAmps] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      customSchema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "NEA Electricity Bill Calculator Nepal 2082/83",
        "url": "https://nepacalc.com/calculator/nea-bill/",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Calculate your Nepal Electricity Authority (NEA) bill for FY 2082/83. Support for all meter capacities (5A to 60A), digital rebates, and late payment fines.",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "NPR"
        },
        "publisher": {
          "@type": "Organization",
          "name": "NepaCalc",
          "url": "https://nepacalc.com"
        }
      }}
      sidebar={{
        title: "Utility Hub",
        subtitle: "Nepal Infrastructure",
        links: [
          { label: "KUKL Water Bill", href: "/calculator/kukl-bill/", icon: Activity },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/", icon: Globe },
          { label: "Solar Requirement", href: "/calculator/solar-requirement/", icon: Lightbulb },
          { label: "NEA Official", href: "https://nea.org.np", icon: Landmark },
        ],
      }}
      relatedTools={[
        { label: "KUKL Water Bill", href: "/calculator/kukl-bill/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" },
        { label: "Solar Requirement", href: "/calculator/solar-requirement/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

