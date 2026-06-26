'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { NeaBillSEO } from './seo';
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
  const today = new Date().toISOString().split('T')[0];
  const [units, setUnits] = useState(150);
  const [connectionAmps, setConnectionAmps] = useState<'5A' | '15A' | '30A' | '60A'>('5A');
  const [billingDate, setBillingDate] = useState<string>(today);
  const [paymentDate, setPaymentDate] = useState<string>(today);

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

    let vatableEnergyCharge = 0;

    for (let i = 1; i < TARIFF_SLABS.length; i++) {
      const slab = TARIFF_SLABS[i];
      const limit = slab.upTo === null ? Infinity : slab.upTo;
      const slabRange = limit - prevLimit;
      const consumed = Math.max(0, Math.min(remaining, slabRange));

      if (consumed > 0) {
        const rate = slab.energy || 0;
        const amount = consumed * rate;
        energyCharge += amount;
        
        if (prevLimit >= 50) {
          vatableEnergyCharge += amount;
        }

        slabBreakdown.push({ label: slab.label, amount, units: consumed, rate });
        remaining -= consumed;
      }
      prevLimit = limit;
      if (remaining <= 0) break;
    }

    const bracketSlab = TARIFF_SLABS.find((s) => s.upTo === null || units <= s.upTo) || TARIFF_SLABS[TARIFF_SLABS.length - 1];
    const fixedCharge = (bracketSlab.rates as any)[connectionAmps] || 0;
    const subtotal = energyCharge + fixedCharge;
    
    // FY 2083/84 Update: 5% VAT applied ONLY to the energy charge of consumption exceeding 50 units
    const vat = vatableEnergyCharge * 0.05;
    const baseTotal = subtotal + vat;

    const bDate = new Date(billingDate);
    const pDate = new Date(paymentDate);
    const diffTime = pDate.getTime() - bDate.getTime();
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    let paymentWindow = 1;
    if (diffDays <= 7) paymentWindow = 0;
    else if (diffDays <= 15) paymentWindow = 1;
    else if (diffDays <= 30) paymentWindow = 2;
    else if (diffDays <= 40) paymentWindow = 3;
    else paymentWindow = 4;

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

    return { energyCharge, fixedCharge, vat, baseTotal, adjustment, finalTotal, slabBreakdown, pieData, diffDays };
  }, [units, connectionAmps, billingDate, paymentDate]);

  return (
    <ModernCalcLayout
      slug="nea-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Electricity Bill' }]}
      title="NEA Bill Calculator"
      description="The NEA Bill Calculator helps you calculate your Nepal Electricity Authority electricity bill using the latest 2083/84 tariff rates. Enter your electricity consumption to get an instant breakdown of unit charges, service charges, VAT and total bill amount."
      icon={Zap}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label htmlFor="consumed-units-field" className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Monthly Consumption (Units/kWh)</label>
               <input 
                  id="consumed-units-field"
                  type="number" 
                  aria-required="true"
                  placeholder="e.g. 150"
                  value={units} 
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
               <div className="flex flex-wrap gap-2 mt-2">
                 {[20, 50, 100, 200, 300].map(val => (
                   <button 
                     key={val} 
                     onClick={() => setUnits(val)}
                     className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
                   >
                     {val} units
                   </button>
                 ))}
               </div>
               <div className="pt-2">
                 <p className="text-[11px] text-[#5F6368] leading-relaxed">
                   <strong>Note:</strong> As per the FY 2083/84 budget, electricity consumption up to 50 units per month is VAT-exempt. A 5% VAT is applied only to usage exceeding 50 units.
                 </p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label htmlFor="meter-capacity-field" className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Meter Capacity (Ampere)</label>
                  <input
                    id="meter-capacity-field"
                    type="number"
                    aria-required="true"
                    value={connectionAmps.replace('A', '')}
                    min={1}
                    step={1}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v <= 5) setConnectionAmps('5A');
                      else if (v <= 15) setConnectionAmps('15A');
                      else if (v <= 30) setConnectionAmps('30A');
                      else setConnectionAmps('60A');
                    }}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                  />
                  <p className="text-[10px] text-[#5F6368]">Standard tiers: 5A · 15A · 30A · 60A</p>
               </div>
               <div className="space-y-2">
                  <label htmlFor="billing-date-field" className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Meter Reading Date</label>
                  <input 
                    id="billing-date-field"
                    type="date"
                    aria-required="true"
                    value={billingDate} 
                    onChange={(e) => setBillingDate(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  />
               </div>
               <div className="space-y-2">
                  <label htmlFor="payment-date-field" className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Estimated Payment Date</label>
                  <input 
                    id="payment-date-field"
                    type="date"
                    aria-required="true"
                    value={paymentDate} 
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  />
               </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[#5F6368] bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
               <Clock className="w-4 h-4 text-[#1A73E8]" />
               <span>
                 Payment window: <strong className="text-[#202124]">{result.diffDays} Days</strong>. 
                 {result.diffDays <= 7 && <span className="text-emerald-600 ml-1">Qualifies for 2% Early Rebate.</span>}
                 {result.diffDays > 7 && result.diffDays <= 15 && <span className="text-gray-600 ml-1">Standard Rate. No fine.</span>}
                 {result.diffDays > 15 && result.diffDays <= 30 && <span className="text-rose-600 ml-1">5% Late Fine applied.</span>}
                 {result.diffDays > 30 && result.diffDays <= 40 && <span className="text-rose-600 ml-1">10% Late Fine applied.</span>}
                 {result.diffDays > 40 && <span className="text-rose-600 ml-1">25% Late Fine applied. Disconnection risk.</span>}
               </span>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Calculate Utility Bill
          </button>

          {/* ── Official NEA Bill Lookup Card ── */}
          <div className="border border-[#DADCE0] rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-[#003087] px-4 py-3 flex items-center gap-3">
              <Landmark className="w-4 h-4 text-white flex-shrink-0" />
              <div>
                <p className="text-white text-[11px] font-black uppercase tracking-wider leading-none">Check NEA Bill Online</p>
                <p className="text-[#93C5FD] text-[9px] mt-0.5">Computerized Billing and Network Division, NEA</p>
              </div>
            </div>
            <div className="p-4">
              <a
                href="https://www.neabilling.com/viewonline/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-10 bg-[#003087] hover:bg-[#001f5e] text-white text-[11px] font-black uppercase tracking-wider rounded-md transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Statement on NEA Portal
              </a>
            </div>
          </div>
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
           <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3 items-center">
              <Zap className="w-5 h-5 text-[#fbbf24] shrink-0" />
              <p className="text-[9px] text-[#5F6368] font-bold leading-relaxed uppercase">
                 Macroeconomic Context: Nepal's electricity generation costs (especially imports during dry seasons) are influenced by the <a href="/market-rates/exchange-rate-nepal/" className="text-[#1A73E8] underline font-bold">Exchange Rate Nepal</a>.
              </p>
           </div>
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
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">NEA 2083/84 Tariff Audit</h3>
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
      faqs={[
        {
          question: "How do I calculate my NEA bill?",
          answer: "Enter the number of electricity units consumed and the calculator will automatically apply the latest NEA tariff rates, service charges and VAT to estimate your monthly electricity bill."
        },
        {
          question: "What is the current NEA electricity rate in Nepal?",
          answer: "NEA uses a slab-based tariff system where electricity rates vary based on monthly consumption and connection type. Higher consumption levels are charged at different rates according to the latest Nepal Electricity Authority tariff structure."
        },
        {
          question: "What is the price of 1 unit electricity in Nepal?",
          answer: "The price of 1 unit of electricity in Nepal depends on the applicable NEA consumption slab. The rate per unit increases progressively as electricity usage increases."
        },
        {
          question: "What are the NEA tariff rates for 2083/84?",
          answer: "The NEA tariff rates for 2083/84 include slab-based energy charges, service charges and applicable VAT. This calculator uses the latest available tariff structure for accurate bill estimation."
        }
      ]}
      seoContent={NeaBillSEO}
      customSchema={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
              { "@type": "ListItem", "position": 2, "name": "Nepal Specific", "item": "https://nepacalc.com/nepal/" },
              { "@type": "ListItem", "position": 3, "name": "Electricity Bill", "item": "https://nepacalc.com/calculator/nea-bill/" }
            ]
          },
          {
            "@type": "Organization",
            "name": "NepaCalc",
            "url": "https://nepacalc.com",
            "logo": "https://nepacalc.com/logo.png",
            "sameAs": ["https://www.facebook.com/nepacalc"]
          },
          {
            "@type": "WebApplication",
            "@id": "https://nepacalc.com/calculator/nea-bill/#webapp",
            "url": "https://nepacalc.com/calculator/nea-bill/",
            "name": "NepaCalc NEA Electricity Bill Calculator",
            "applicationCategory": "FinancialApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5 and JavaScript support.",
            "description": "An interactive utility bill estimator designed to calculate progressive Nepal Electricity Authority slab fees, fixed charges, and conditional VAT frameworks.",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "NPR"
            }
          },
          {
            "@type": "FAQPage",
            "@id": "https://nepacalc.com/calculator/nea-bill/#faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I calculate my NEA bill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enter the number of electricity units consumed and the calculator will automatically apply the latest NEA tariff rates, service charges and VAT to estimate your monthly electricity bill."
                }
              },
              {
                "@type": "Question",
                "name": "What is the current NEA electricity rate in Nepal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NEA uses a slab-based tariff system where electricity rates vary based on monthly consumption and connection type. Higher consumption levels are charged at different rates according to the latest Nepal Electricity Authority tariff structure."
                }
              },
              {
                "@type": "Question",
                "name": "What is the price of 1 unit electricity in Nepal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The price of 1 unit of electricity in Nepal depends on the applicable NEA consumption slab. The rate per unit increases progressively as electricity usage increases."
                }
              },
              {
                "@type": "Question",
                "name": "What are the NEA tariff rates for 2083/84?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The NEA tariff rates for 2083/84 include slab-based energy charges, service charges and applicable VAT. This calculator uses the latest available tariff structure for accurate bill estimation."
                }
              }
            ]
          }
        ]
      }}
      sidebar={{
        title: "Utility Hub",
        subtitle: "Nepal Infrastructure",
        links: [
          { label: "Electricity Unit Price Guide", href: "/electricity/nepal-unit-price/", icon: Zap },
          { label: "Official NEA Tariff Rates", href: "/electricity/nea-tariff-rates/", icon: Table },
          { label: "KUKL Water Bill", href: "/calculator/kukl-bill/", icon: Activity },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/", icon: Globe },
          { label: "Solar Requirement", href: "/calculator/solar-requirement/", icon: Lightbulb },
        ],
      }}
      relatedTools={[
        { label: "⚡ Electricity Unit Price Guide", href: "/electricity/nepal-unit-price/" },
        { label: "📊 Official NEA Tariff Rates", href: "/electricity/nea-tariff-rates/" },
        { label: "KUKL Water Bill", href: "/calculator/kukl-bill/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" },
        { label: "Solar Requirement", href: "/calculator/solar-requirement/" }
      ]}
    />
  );
}

