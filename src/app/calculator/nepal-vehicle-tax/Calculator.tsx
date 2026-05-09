'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Car, Bike, Info, ShieldCheck, AlertCircle, Zap, Scale, Activity, Globe, History, Receipt, TrendingUp, PieChart, Landmark, Wallet } from 'lucide-react';
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

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

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
    return { 
      baseTax, 
      insuranceEst, 
      renewalFee,
      total: baseTax + insuranceEst + renewalFee, 
      slabLabel,
      chartData: [
        { name: 'Govt Tax', val: baseTax, fill: '#3b82f6' },
        { name: 'Insurance', val: insuranceEst, fill: '#10b981' },
        { name: 'Renewal Fee', val: renewalFee, fill: '#fbbf24' }
      ]
    };
  }, [vType, engineCC, carType]);

  return (
    <ModernCalcLayout
      slug="nepal-vehicle-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Vehicle Tax' }]}
      title="Nepal Vehicle Tax"
      description="The authoritative blue-book renewal engine for Nepal. Calibrated to Bagmati Province tax slabs for motorbikes and cars, including statutory insurance audits."
      icon={Car}
      inputs={
        <div className="space-y-8">
          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] space-y-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-40 h-40" /></div>
             <div className="relative z-10 grid grid-cols-1 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Vehicle Category</label>
                   <div className="grid grid-cols-2 gap-3">
                    {[
                      {id:'bike', l:'Two-Wheeler', icon: Bike},
                      {id:'car', l:'Four-Wheeler', icon: Car}
                    ].map(opt => (
                      <button key={opt.id} onClick={() => update({ vType: opt.id as any })} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${vType === opt.id ? 'bg-[#1a73e8] border-blue-600 text-[#202124] shadow-sm' : 'bg-[#f8f9fa] border-[#dadce0] text-slate-400 hover:bg-white/10'}`}>
                        <opt.icon className="w-6 h-6" />
                        <span className="text-[9px] font-black uppercase">{opt.l}</span>
                      </button>
                    ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Engine Displacement (CC)</label>
                   <input 
                      type="number" 
                      value={engineCC} 
                      onChange={(e) => update({ engineCC: Number(e.target.value) })}
                      className="w-full h-14 px-6 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl text-xl font-black text-[#202124] focus:border-blue-500 outline-none transition-all" 
                   />
                </div>
                {vType === 'car' && (
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a0dab]">Ownership Protocol</label>
                      <div className="flex p-1 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                        {['private', 'public'].map(opt => (
                          <button key={opt} onClick={() => update({ carType: opt as any })} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${carType === opt ? 'bg-[#1a73e8] text-[#202124] shadow-sm' : 'text-slate-400'}`}>{opt}</button>
                        ))}
                      </div>
                   </div>
                )}
             </div>
          </div>

          <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><ShieldCheck className="w-4 h-4 text-blue-600" /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Provincial Standards</h3>
             </div>
             <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">
                Currently calibrated for <span className="text-blue-600 underline decoration-2">Bagmati Province</span>.
             </p>
             <div className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-[10px] text-amber-800 font-bold leading-tight">
                   Renew within <span className="underline">90 days</span> of expiry to avoid a 20% fine on the base tax.
                </p>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Receipt className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Total Renewal Liability</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">{formatNPR(result.total)}</div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                Govt Tax + Insurance + Fees
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-slate-400 uppercase">Annual Govt Tax</div>
                <div className="text-xl font-black text-slate-900">{formatNPR(result.baseTax)}</div>
             </div>
             <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1">
                <div className="text-[9px] font-black text-emerald-600 uppercase">Insurance Est.</div>
                <div className="text-xl font-black text-emerald-600">{formatNPR(result.insuranceEst)}</div>
             </div>
          </div>

          <div className="p-8 bg-white border border-[#dadce0] rounded-lg text-[#202124] shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Scale className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Tax Slab Density</h4>
                   <p className="text-2xl font-black">{result.slabLabel}</p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   Bagmati Std
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Activity className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-[#1a73e8] rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Renewal Cost Composition</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={result.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {result.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => formatNPR(v)}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Total Liability</span>
                   <span className="text-lg font-black text-slate-900">{formatNPR(result.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-[#202124] rounded-lg p-10 shadow-sm relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><TrendingUp className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">CC-Based Progression</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vType === 'bike' ? BIKE_RATES : CAR_RATES.private}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="label" hide />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                         formatter={(v: number) => formatNPR(v)}
                      />
                      <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-6 text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                  Visualizing statutory tax brackets for the current fiscal year.
               </p>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Vehicle Tax Encyclopedia: Nepal's Provincial Standard</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Vehicle Taxation in <strong>Nepal</strong> is a decentralized fiscal levy administered by the <strong>Provincial Governments</strong>. While the <strong>Department of Transport Management (DoTM)</strong> manages registration, the annual revenue (Road Tax) is collected based on engine capacity (CC) or motor wattage (kW). For the fiscal year <strong>2081/82</strong>, <strong>Bagmati Province</strong> remains the benchmark for progressive vehicle taxation.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-lg flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">Province-Wide Variation</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      Vehicles registered in Bagmati Province face higher rates compared to provinces like Karnali or Sudurpashchim. Ensure your blue-book registration location matches our Bagmati-calibrated engine logic.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. The CC Matrix: Engine Capacity Brackets</h3>
              <p>
                Government tax for combustion engine vehicles is calculated as a flat annual fee based on CC tiers. For two-wheelers, the slabs range from NPR 3,000 to NPR 35,000. For private four-wheelers, the entry-level bracket (up to 1000cc) starts at NPR 22,000.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Motorbike Slabs (Sample)</h4>
                    <div className="text-[10px] space-y-2 text-slate-500 font-bold uppercase">
                       <div className="flex justify-between border-b pb-1"><span>Up to 125cc</span><span>Rs. 3,000</span></div>
                       <div className="flex justify-between border-b pb-1"><span>151cc to 225cc</span><span>Rs. 6,500</span></div>
                       <div className="flex justify-between border-b pb-1"><span>Above 650cc</span><span>Rs. 35,000</span></div>
                    </div>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Electric Vehicle (EV) Incentives</h4>
                    <p className="text-[11px] font-medium leading-relaxed">
                      To promote sustainable transit, Nepal offers massive rebates for EVs. Tax for electric cars is based on <strong>kW (Kilowatts)</strong> and is generally 50-80% lower than their petrol counterparts.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Renewal Compliance & Penalty Framework</h3>
              <p>
                A vehicle's tax must be renewed every fiscal year. The "Grace Period" is usually the first three months of the new fiscal year (Shrawan 1 to Ashwin 30). Missing this deadline triggers a mandatory <strong>20% penalty</strong> on the base tax. Beyond one year of non-payment, additional monthly interest and fine increments apply.
              </p>
            </div>
          </section>

          <section className="bg-white border border-[#dadce0] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><History className="w-64 h-64 text-emerald-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-emerald-400 uppercase tracking-widest">Vehicle Compliance Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Scale className="w-5 h-5" /> Third-Party Bima</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Mandatory under the Motor Vehicles Act. You cannot renew your blue-book tax without a valid Third-Party Insurance certificate.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Activity className="w-5 h-5" /> Pollution Check</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Vehicles in Kathmandu must pass the annual pollution test and display the "Green Sticker" for legal operation.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> Blue-Book Seal</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Ensure the revenue office stamps and updates your physical blue-book. Digital payments must be reconciled with physical stamps at the transport office.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Vehicle Selection: Choose between Motorbike or Car/Jeep.",
          "CC Entry: Input the engine capacity exactly as written in your Blue-Book.",
          "Ownership: For cars, specify Private or Public use.",
          "Review Results: Analyze the government tax vs insurance breakdown.",
          "Compliance: Ensure you renew before the Ashwin 30 deadline to avoid penalties."
        ]
      }}
      formula={{
        title: "Statutory Road Tax Algorithm",
        description: "Fixed provincial slabs based on engine displacement (CC).",
        raw: "$$Total Liability = Base Tax (CC) + Insurance + Renewal Fees$$",
        latex: "Liability = Tax_{Slab} + Insurance_{Premium} + 500"
      }}
      faqs={[
        { question: "Where can I pay my vehicle tax in Nepal?", answer: "Tax can be paid at provincial revenue offices (Rajaswa Karyalay) or through digital portals like ConnectIPS and eSewa, which must then be reconciled with a physical stamp in your blue-book." },
        { question: "What is the penalty for late renewal?", answer: "A flat 20% penalty is added to the base road tax if the renewal is not completed within the first three months of the fiscal year (by Ashwin end)." },
        { question: "Is Third-Party Insurance mandatory for renewal?", answer: "Yes, under the Motor Vehicle and Transport Management Act, you cannot pay your annual road tax without a valid Third-Party Insurance policy certificate." },
        { question: "How is EV (Electric Vehicle) tax calculated?", answer: "EV tax is based on motor power in Kilowatts (kW) rather than engine displacement (CC). Tax rates for EVs are significantly lower than petrol/diesel vehicles to promote green transit." },
        { question: "What documents are required for blue-book renewal?", answer: "You must present the original Blue-Book, a valid Third-Party or Comprehensive Insurance policy, and the previous year's tax payment receipt." },
        { question: "Do different provinces have different tax rates?", answer: "Yes. Each of the seven provinces sets its own annual vehicle tax slabs. Bagmati Province typically has the highest rates compared to other provinces." },
        { question: "Is this calculator updated for FY 2081/82?", answer: "Yes, this engine is calibrated to the latest Bagmati Province Finance Bill standards and current statutory insurance premium estimates." }
      ]}
      sidebar={{
        title: "Auto Hub",
        subtitle: "Tax & Insurance",
        links: [
          { label: "Petrol Cost Tool", href: "/calculator/fuel-cost/", icon: Activity },
          { label: "EMI Calculator", href: "/calculator/loan-emi/", icon: Wallet },
          { label: "DoTM Portal", href: "https://dotm.gov.np", icon: Globe },
          { label: "Vehicle Tax Guide", href: "/blog/nepal-vehicle-tax-guide/", icon: History },
        ],
      }}
      relatedTools={[
        { label: "Fuel Cost Tool", href: "/calculator/fuel-cost/" },
        { label: "Loan EMI", href: "/calculator/loan-emi/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
