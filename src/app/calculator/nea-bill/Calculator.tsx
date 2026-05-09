'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Zap, Info, Receipt, UtilityPole, Building2, History, Compass, 
  Landmark, Lightbulb, ExternalLink, Sigma, HelpCircle, Activity, 
  CreditCard, Clock, Ruler, ShieldCheck, Target, Globe, ArrowRight, PieChart 
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

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NEABillCalculator() {
  const [units, setUnits] = useState(150);
  const [connectionAmps, setConnectionAmps] = useState<'5A' | '15A' | '30A' | '60A'>('5A');
  const [paymentWindow, setPaymentWindow] = useState<number>(1); // 1: 8-15

  const result = useMemo(() => {
    let remaining = units;
    let energyCharge = 0;
    const breakdownData: any[] = [];
    let prevLimit = 0;

    // Slab 1 Logic
    const slab1 = TARIFF_SLABS[0];
    const consumedSlab1 = Math.max(0, Math.min(units, 20));
    let slab1Rate = (slab1.energyBase as any)[connectionAmps] || 0;
    if (connectionAmps === '5A' && units > 20) slab1Rate = 3.00;

    if (consumedSlab1 > 0) {
      const amount = consumedSlab1 * slab1Rate;
      energyCharge += amount;
      breakdownData.push({ name: '0-20', val: amount, units: consumedSlab1, fill: '#3b82f6' });
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
        breakdownData.push({ name: slab.label, val: amount, units: consumed, fill: ['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'][i-1] });
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
      { name: 'Energy', val: energyCharge, fill: '#3b82f6' },
      { name: 'Fixed', val: fixedCharge, fill: '#fbbf24' },
      { name: 'VAT', val: vat, fill: '#ef4444' }
    ].filter(d => d.val > 0);

    return { energyCharge, fixedCharge, vat, baseTotal, adjustment, finalTotal, breakdownData, pieData };
  }, [units, connectionAmps, paymentWindow]);

  return (
    <ModernCalcLayout
      slug="nea-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'NEA Bill' }]}
      title="NEA Bill"
      description="The definitive utility auditing engine for Nepal. Calculate monthly electricity bills with 100% precision based on NEA 2081/82 progressive tariff slabs."
      icon={Zap}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Consumption Amperage</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5A', '15A', '30A', '60A'].map(opt => (
                    <button key={opt} onClick={() => setConnectionAmps(opt as any)} className={`py-2 text-[10px] font-bold border rounded transition-all ${connectionAmps === opt ? 'bg-[#1A73E8] border-[#1A73E8] text-[#202124] shadow-sm' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#1A73E8]'}`}>{opt}</button>
                  ))}
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Monthly Units (kWh)</label>
                <input 
                   type="number" 
                   value={units} 
                   onChange={(e) => setUnits(Number(e.target.value))}
                   className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-lg font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                />
             </div>
          </div>

          <div className="space-y-2 pt-2">
             <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Payment Window</label>
             <select 
                value={paymentWindow} 
                onChange={(e) => setPaymentWindow(Number(e.target.value))}
                className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
             >
                <option value={0}>1-7 Days (2% Digital Rebate)</option>
                <option value={1}>8-15 Days (Standard Window)</option>
                <option value={2}>16-30 Days (5% Penalty)</option>
                <option value={3}>31-40 Days (10% Penalty)</option>
                <option value={4}>41-60 Days (25% Penalty)</option>
             </select>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Payable Amount</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.finalTotal)}</div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">Inclusive of VAT & Fixed Charges</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-white border border-[#DADCE0] rounded-md text-center space-y-1">
                <div className="text-[9px] font-bold text-[#70757A] uppercase">Energy Cost</div>
                <div className="text-xl font-black text-[#202124]">{formatNPR(result.energyCharge)}</div>
             </div>
             <div className={`p-5 border rounded-md text-center space-y-1 ${result.adjustment < 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                <div className={`text-[9px] font-bold uppercase ${result.adjustment < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {result.adjustment < 0 ? 'Digital Rebate' : 'Late Penalty'}
                </div>
                <div className={`text-xl font-black ${result.adjustment < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {formatNPR(result.adjustment)}
                </div>
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
                  <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Slab Utilization Bar</h3>
               </div>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.breakdownData} barSize={24}>
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
          "Consumption: Enter the total units (kWh) consumed for the month.",
          "Capacity: Select your meter amperage (5A, 15A, etc.) as listed on your bill.",
          "Timeline: Select the payment window to calculate digital rebates or late penalties.",
          "Audit: Review the 'Effective Rate' to understand your cost per unit.",
          "Slabs: Analyze the 'Slab Utilization' bar to see which consumption block is most expensive."
        ]
      }}
      formula={{
        title: "The Progressive Billing Calculus",
        description: "Official piecewise algorithm for energy consumption in Nepal.",
        raw: "$$Total = \\sum (Slab_{Units} \\times Rate) + Fixed + VAT + Adjustment$$",
        latex: "Bill = (U1xR1 + U2xR2 + ...) + Fixed + 13%VAT \pm Fine/Rebate"
      }}
      faqs={[
        { question: "How much is 1 unit of electricity in Nepal?", answer: "The rate is progressive for residential meters. For a 5A connection, it starts at Rs. 3 per unit (0-20 units) and reaches Rs. 11 for high consumption (251+ units)." },
        { question: "What is the penalty for late NEA bill payment?", answer: "A 5% penalty applies after 15 days, 10% after 30 days, and a massive 25% penalty is applied if paid after 40 days of the meter reading." },
        { question: "Is the first 20 units free for everyone?", answer: "No. It is only heavily subsidized for 5A residential meters. Even with zero consumption, a mandatory Rs. 30 service charge is applied." },
        { question: "How is the 2% rebate calculated?", answer: "If you pay your bill within 7 days of the meter reading date, a 2% discount is applied to the total amount (inclusive of VAT)." },
        { question: "What is the service charge for a 15A meter?", answer: "The fixed monthly charge for a 15A meter ranges from Rs. 50 to Rs. 175, depending on your consumption slab for that month." },
        { question: "What happens if I don't pay for 60 days?", answer: "NEA reserves the right to disconnect the service line and black-list the customer until all dues, penalties, and reconnection fees are cleared." },
        { question: "Is this updated for the 2081/82 tariffs?", answer: "Yes, this engine uses the latest progressive tariff slabs and service charge mandates issued by the Electricity Regulatory Commission (ERC)." }
      ]}
      sidebar={{
        title: "Utility Hub",
        subtitle: "Nepal Energy",
        links: [
          { label: "KUKL Water Bill", href: "/calculator/kukl-bill/", icon: Activity },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/", icon: Globe },
          { label: "Solar Requirement", href: "/calculator/solar-requirement/", icon: Lightbulb },
          { label: "NEA Official", href: "https://nea.org.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "KUKL Water Bill", href: "/calculator/kukl-bill/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" },
        { label: "Solar Requirement", href: "/calculator/solar-requirement/" }
      ]}
    />
  );
}
