'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Car, Bike, Info, ShieldCheck, AlertCircle, Zap, Scale, Activity, Globe, 
  History, Receipt, TrendingUp, PieChart, Landmark, Wallet, Table, ArrowRight
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const BIKE_RATES = [
  { max: 125, rate: 3000, label: 'Up to 125cc' },
  { max: 150, rate: 5000, label: '126–150cc' },
  { max: 225, rate: 6500, label: '151–225cc' },
  { max: 400, rate: 11000, label: '226–400cc' },
  { max: 650, rate: 20000, label: '401–650cc' },
  { max: Infinity, rate: 35000, label: '650cc+' },
];

const CAR_RATES = {
  private: [
    { max: 1000, rate: 22000, label: 'Up to 1000cc' },
    { max: 1500, rate: 25000, label: '1001–1500cc' },
    { max: 2000, rate: 34000, label: '1501–2000cc' },
    { max: 2500, rate: 43000, label: '2001–2500cc' },
    { max: 2900, rate: 56000, label: '2501–2900cc' },
    { max: Infinity, rate: 65000, label: '2900cc+' },
  ],
  public: [
    { max: 1000, rate: 2500, label: 'Up to 1000cc' },
    { max: 1500, rate: 3500, label: '1001–1500cc' },
    { max: Infinity, rate: 5000, label: '1500cc+' },
  ],
};

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalVehicleTaxCalculator() {
  const [state, setState] = useSyncState('nepal_vehicle_tax_v5', {
    vType: 'bike' as 'bike' | 'car',
    engineCC: 150,
    carType: 'private' as 'private' | 'public',
  });
  const { vType, engineCC, carType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let baseTax = 0;
    let slabLabel = '';
    if (vType === 'bike') {
      const found = BIKE_RATES.find(s => engineCC <= s.max);
      baseTax = found?.rate ?? 0;
      slabLabel = found?.label ?? '';
    } else {
      const list = CAR_RATES[carType];
      const found = list.find(s => engineCC <= s.max);
      baseTax = found?.rate ?? 0;
      slabLabel = found?.label ?? '';
    }
    const insuranceEst = vType === 'bike' ? 2200 : 8500;
    const renewalFee = 500; // Standard Bluebook renewal fee
    
    const pieData = [
      { name: 'Government Tax', value: baseTax },
      { name: 'Insurance Premium', value: insuranceEst },
      { name: 'Service Charges', value: renewalFee }
    ];

    return { 
      baseTax, 
      insuranceEst, 
      renewalFee,
      total: baseTax + insuranceEst + renewalFee, 
      slabLabel,
      pieData
    };
  }, [vType, engineCC, carType]);

  return (
    <ModernCalcLayout
      slug="nepal-vehicle-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Vehicle Tax' }]}
      title="Nepal Vehicle Tax"
      description="The definitive blue-book renewal engine for Nepal. Calibrated to Bagmati Province tax slabs for motorbikes and cars (FY 2083/84), including statutory insurance audits."
      icon={Car}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Vehicle Category</label>
               <div className="grid grid-cols-2 gap-3">
                {[
                  {id:'bike', l:'Two-Wheeler', icon: Bike},
                  {id:'car', l:'Four-Wheeler', icon: Car}
                ].map(opt => (
                  <button 
                    key={opt.id} 
                    onClick={() => update({ vType: opt.id as any })} 
                    className={`flex items-center justify-center gap-3 p-4 rounded-md border transition-all ${vType === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    <opt.icon className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase">{opt.l}</span>
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Engine Displacement (CC)</label>
               <input 
                  type="number" 
                  value={engineCC} 
                  onChange={(e) => update({ engineCC: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
               />
            </div>

            {vType === 'car' && (
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Ownership Protocol</label>
                  <select 
                    value={carType} 
                    onChange={(e) => update({ carType: e.target.value as any })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  >
                    <option value="private">Private (Personal)</option>
                    <option value="public">Public (Commercial)</option>
                  </select>
               </div>
            )}

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex gap-3">
               <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
               <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase">
                  Renew within <span className="underline decoration-2">90 days</span> of expiry to avoid a mandatory 20% penalty on the base government tax.
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Renewal Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Renewal Liability</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.total)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Province: Bagmati Std FY 2083/84</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Annual Govt Tax</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.baseTax)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Insurance Est.</div>
                <div className="text-lg font-black text-[#188038]">{formatNPR(result.insuranceEst)}</div>
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
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Liability Composition</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={result.pieData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#1A73E8" />
                       <Cell fill="#188038" />
                       <Cell fill="#fbbf24" />
                     </Pie>
                     <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">Grand Total</span>
                    <span className="text-lg font-black text-[#202124]">{formatNPR(result.total)}</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Tax</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#188038]"></div> Insurance</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div> Fees</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Slab Utilization Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase">Active Tax Slab</span>
                     <span className="text-sm font-black text-[#202124]">{result.slabLabel}</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase">Vehicle Protocol</span>
                     <span className="text-sm font-black text-[#1A73E8] uppercase">{vType} / {carType}</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#FFF9E6] border border-[#F29900] text-center">
                     <div className="text-[9px] font-black text-[#F29900] uppercase mb-1">Compliance Alert</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">Missing the Ashwin 30 deadline triggers a mandatory 20% fine on the base tax.</p>
                  </div>
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Bagmati Province Tax Matrix (FY 2083/84)</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">Engine Capacity (CC)</th>
                    <th className="px-6 py-4 bg-white text-right">Annual Govt Tax</th>
                    <th className="px-6 py-4 bg-white text-right text-[#D93025]">With 20% Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {(vType === 'bike' ? BIKE_RATES : CAR_RATES.private).map((s, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{s.label}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">{formatNPR(s.rate)}</td>
                      <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(s.rate * 1.2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Vehicle Type: Select between Two-Wheeler (Bike/Scooter) or Four-Wheeler (Car/Jeep).",
          "Engine CC: Input the displacement cubic centimeters exactly as listed in your blue-book.",
          "Ownership: For cars, select 'Private' for personal use or 'Public' for commercial/taxi use.",
          "Audit: Review the Govt Tax slab and the statutory Third-Party Insurance estimate.",
          "Deadline: Ensure renewal within the first 3 months of the fiscal year to avoid penalties."
        ]
      }}
      formula={{
        title: "The Road Tax Calculus (Bagmati Std)",
        description: "Official progressive tax brackets issued by the Bagmati Province Finance Ministry.",
        raw: "Liability = Base_Tax(CC_Slab) + Third_Party_Insurance + Service_Fees",
        variables: [
          "Base Tax: Fixed annual fee per CC bracket",
          "Penalty: 20% flat increase if renewed after Ashwin 30",
          "Insurance: Statutory premium mandatory for registration"
        ]
      }}
      faqs={[
        { question: "Where can I pay my vehicle tax in Nepal?", answer: "Tax can be paid at the Transport Management Office (Yatayat Karyalaya) of your registered province. Most provinces now allow online payment through portals like ConnectIPS or eSewa." },
        { question: "What is the penalty for late blue-book renewal?", answer: "A 20% penalty is applied to the base government tax if not renewed within the first three months of the fiscal year (usually by Ashwin end)." },
        { question: "How often should I renew my vehicle tax?", answer: "Road tax must be paid annually. The fiscal year starts in mid-July (Shrawan 1), and you have until mid-October (Ashwin end) to pay without a fine." },
        { question: "Is Third-Party Insurance mandatory for renewal?", answer: "Yes. You cannot pay your annual road tax without presenting a valid Third-Party Insurance policy certificate." }
      ]}
      sidebar={{
        title: "Auto Hub Nepal",
        subtitle: "Compliance Tools",
        links: [
          { label: "Fuel Cost Tool", href: "/calculator/nepal-vehicle-tax", icon: Activity },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "DoTM Official", href: "https://dotm.gov.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Fuel Cost Tool", href: "/calculator/nepal-vehicle-tax" },
        { label: "Home Loan EMI", href: "/calculator/nepal-home-loan/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}

