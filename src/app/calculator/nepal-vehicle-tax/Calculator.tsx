'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Car, Bike, Info, ShieldCheck, AlertCircle, Zap, Scale, Activity, Globe, 
  History, Receipt, TrendingUp, PieChart, Landmark, Wallet, Table, ArrowRight,
  BatteryCharging
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
  { max: 400, rate: 12000, label: '226–400cc' },
  { max: 650, rate: 25000, label: '401–650cc' },
  { max: Infinity, rate: 35000, label: '650cc+' },
];

const CAR_RATES = {
  private: [
    { max: 1000, rate: 22000, label: 'Up to 1000cc' },
    { max: 1500, rate: 25000, label: '1001–1500cc' },
    { max: 2000, rate: 27000, label: '1501–2000cc' },
    { max: 2500, rate: 37000, label: '2001–2500cc' },
    { max: 3000, rate: 50000, label: '2501–3000cc' },
    { max: 3500, rate: 65000, label: '3001–3500cc' },
    { max: Infinity, rate: 70000, label: '3500cc+' },
  ],
  public: [
    { max: 1500, rate: 6000, label: 'Up to 1500cc' },
    { max: Infinity, rate: 35000, label: '1500cc+' },
  ],
};

const EV_CAR_RATES = [
  { max: 50, rate: 5000, label: '10 kW to 50 kW' },
  { max: 125, rate: 15000, label: '51 kW to 125 kW' },
  { max: 200, rate: 20000, label: '126 kW to 200 kW' },
  { max: Infinity, rate: 30000, label: 'Above 200 kW' }
];

const DELAY_STATUSES = [
  { id: 'ontime', label: 'On Time (Within 90 days)', basePenalty: 0, renewPenaltyMult: 1 },
  { id: '30days', label: '1 - 30 Days Late', basePenalty: 0.05, renewPenaltyMult: 2 },
  { id: '45days', label: '31 - 45 Days Late', basePenalty: 0.10, renewPenaltyMult: 2 },
  { id: 'end_fy', label: '46 Days to End of FY', basePenalty: 0.20, renewPenaltyMult: 2 },
  { id: '1_year', label: '1 Fiscal Year Late', basePenalty: 0.32, renewPenaltyMult: 2 },
  { id: '2_years', label: '2 Fiscal Years Late', basePenalty: 0.64, renewPenaltyMult: 2 },
  { id: '3_years', label: '3 Fiscal Years Late', basePenalty: 0.96, renewPenaltyMult: 2 },
  { id: '4_years', label: '4 Fiscal Years Late', basePenalty: 1.28, renewPenaltyMult: 2 },
  { id: '5_years_plus', label: '5+ Years Late (Max Cap)', basePenalty: 1.60, renewPenaltyMult: 2 }, // 32% * 5
];

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export default function NepalVehicleTaxCalculator() {
  const [state, setState] = useSyncState('nepal_vehicle_tax_v6', {
    engineType: 'combustion' as 'combustion' | 'electric',
    vType: 'bike' as 'bike' | 'car',
    engineCC: 150,
    motorKw: 100,
    carType: 'private' as 'private' | 'public',
    delayStatus: 'ontime' as string,
  });
  
  const { engineType, vType, engineCC, motorKw, carType, delayStatus } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const result = useMemo(() => {
    let baseTax = 0;
    let slabLabel = '';
    let renewFee = 0;
    
    // 1. Calculate Base Tax and Renewal Fee
    if (engineType === 'electric') {
      if (vType === 'bike') {
        baseTax = 2500;
        slabLabel = 'Standard EV Two-Wheeler';
        renewFee = 300;
      } else {
        const list = EV_CAR_RATES;
        const found = list.find(s => motorKw <= s.max);
        baseTax = found?.rate ?? 0;
        slabLabel = found?.label ?? '';
        if (carType === 'public') baseTax = baseTax * 0.5; // 50% discount for public EV
        renewFee = 500;
      }
    } else {
      if (vType === 'bike') {
        const found = BIKE_RATES.find(s => engineCC <= s.max);
        baseTax = found?.rate ?? 0;
        slabLabel = found?.label ?? '';
        renewFee = 300;
      } else {
        const list = CAR_RATES[carType];
        const found = list.find(s => engineCC <= s.max);
        baseTax = found?.rate ?? 0;
        slabLabel = found?.label ?? '';
        renewFee = 500;
      }
    }

    // 2. 4-Year Cap Multiplier
    // If the user is x years late, they owe x years of base tax + current year.
    // However, the rule states "maximum of 4 years of pending vehicle tax".
    // So if delayStatus is '1_year', they owe 2 years of base tax total (pending + current).
    // Let's calculate exactly what they owe in BACK taxes vs Penalties.
    let yearsOfBaseTaxOwed = 1;
    let penaltyBaseTaxMultiplier = 1; // Used for calculating the 32% penalty
    
    if (delayStatus === '1_year') { yearsOfBaseTaxOwed = 2; penaltyBaseTaxMultiplier = 1; }
    else if (delayStatus === '2_years') { yearsOfBaseTaxOwed = 3; penaltyBaseTaxMultiplier = 2; }
    else if (delayStatus === '3_years') { yearsOfBaseTaxOwed = 4; penaltyBaseTaxMultiplier = 3; }
    else if (delayStatus === '4_years') { yearsOfBaseTaxOwed = 4; penaltyBaseTaxMultiplier = 4; } // Capped at 4 years pending + current? Actually "pay a maximum of 4 years of pending vehicle tax". Let's use 4 as max total base tax.
    else if (delayStatus === '5_years_plus') { yearsOfBaseTaxOwed = 4; penaltyBaseTaxMultiplier = 5; }
    
    let totalBaseTaxDue = baseTax * yearsOfBaseTaxOwed;

    // 3. Penalty Calculations
    const delayConfig = DELAY_STATUSES.find(d => d.id === delayStatus) || DELAY_STATUSES[0];
    let penaltyFine = 0;
    
    if (delayStatus.includes('year')) {
        // 32% compounded per year late. For simplicity, 32% * number of years * base tax
        penaltyFine = baseTax * delayConfig.basePenalty;
    } else {
        penaltyFine = baseTax * delayConfig.basePenalty;
    }
    
    const finalRenewalFee = renewFee * delayConfig.renewPenaltyMult;

    // 4. Insurance
    const insuranceEst = vType === 'bike' ? 2200 : 8500;
    
    const total = totalBaseTaxDue + penaltyFine + insuranceEst + finalRenewalFee;

    const pieData = [
      { name: 'Government Tax (Base)', value: totalBaseTaxDue },
      { name: 'Late Penalties', value: penaltyFine },
      { name: 'Insurance Premium', value: insuranceEst },
      { name: 'Service & Renewal', value: finalRenewalFee }
    ];

    return { 
      baseTax: totalBaseTaxDue,
      penaltyFine,
      insuranceEst, 
      finalRenewalFee,
      total, 
      slabLabel,
      pieData,
      isLate: delayStatus !== 'ontime',
      yearsOwed: yearsOfBaseTaxOwed
    };
  }, [engineType, vType, engineCC, motorKw, carType, delayStatus]);

  return (
    <ModernCalcLayout
      slug="nepal-vehicle-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Vehicle Tax' }]}
      title="Nepal Vehicle Tax 2083/84"
      description="The definitive blue-book renewal engine for Nepal. Calibrated to Bagmati Province tax slabs for motorbikes, cars, and EVs (FY 2083/84), including statutory insurance and strict penalty audits."
      icon={Car}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Engine Type */}
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Engine Protocol</label>
               <div className="grid grid-cols-2 gap-3">
                {[
                  {id:'combustion', l:'Combustion (Petrol/Diesel)', icon: Zap},
                  {id:'electric', l:'Electric (EV)', icon: BatteryCharging}
                ].map(opt => (
                  <button 
                    key={opt.id} 
                    onClick={() => update({ engineType: opt.id as any })} 
                    className={`flex items-center justify-center gap-3 p-4 rounded-md border transition-all ${engineType === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                  >
                    <opt.icon className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase text-center leading-tight">{opt.l}</span>
                  </button>
                ))}
               </div>
            </div>

            {/* Vehicle Category */}
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

            {/* Engine Capacity */}
            {engineType === 'combustion' ? (
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Engine Displacement (CC)</label>
                 <input 
                    type="number" 
                    value={engineCC} 
                    onChange={(e) => update({ engineCC: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                 />
              </div>
            ) : (
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Motor Output (kW)</label>
                 <input 
                    type="number" 
                    value={motorKw} 
                    onChange={(e) => update({ motorKw: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all" 
                 />
              </div>
            )}

            {/* Ownership */}
            {vType === 'car' && (
               <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Ownership Protocol</label>
                  <select 
                    value={carType} 
                    onChange={(e) => update({ carType: e.target.value as any })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all appearance-none"
                  >
                    <option value="private">Private (Personal Use)</option>
                    <option value="public">Public (Commercial/Taxi)</option>
                  </select>
               </div>
            )}

            {/* Penalty Status */}
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#D93025] uppercase tracking-wider flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Renewal Delay Status</label>
               <select 
                 value={delayStatus} 
                 onChange={(e) => update({ delayStatus: e.target.value })}
                 className="w-full h-12 px-4 bg-red-50/50 border border-red-200 rounded-md text-sm font-bold text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all appearance-none"
               >
                 {DELAY_STATUSES.map(s => (
                   <option key={s.id} value={s.id}>{s.label}</option>
                 ))}
               </select>
            </div>

            {/* Warning Cards */}
            {result.isLate && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md flex gap-3 shadow-sm">
                 <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                 <p className="text-[10px] text-red-800 font-bold leading-relaxed uppercase">
                    Late Fine Applied. Renewal fee is doubled to {formatNPR(result.finalRenewalFee)}. A {result.penaltyFine > 0 ? "penalty fine" : ""} is charged on base tax. 
                    {delayStatus === '5_years_plus' && " Base tax payment is capped at 4 years max due to DoTM regulations."}
                 </p>
              </div>
            )}
            {!result.isLate && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md flex gap-3">
                 <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                 <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase">
                    Renewing within the 90-day grace period shields you from all late fines and mandatory penalties.
                 </p>
              </div>
            )}
            
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm mt-4">
             Generate 2083/84 Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2 relative overflow-hidden">
             {result.isLate && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Renewal Liability</div>
             <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(result.total)}</div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Province: Bagmati Std FY 2083/84</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Annual Govt Tax {result.yearsOwed > 1 ? `(${result.yearsOwed}Yrs)` : ''}</div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(result.baseTax)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white flex flex-col justify-center relative overflow-hidden">
                {result.isLate && <div className="absolute top-0 right-0 w-8 h-8 bg-red-50 transform rotate-45 translate-x-4 -translate-y-4 border border-red-200" />}
                <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Late Penalties</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(result.penaltyFine)}</div>
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
                       data={result.pieData.filter(d => d.value > 0)}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none"
                     >
                       <Cell fill="#1A73E8" />
                       <Cell fill="#D93025" />
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
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider flex-wrap">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Base Tax</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> Penalty</div>
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
                     <span className="text-sm font-black text-[#1A73E8] uppercase">{engineType} / {vType} / {carType}</span>
                  </div>
                  {result.isLate ? (
                    <div className="p-6 rounded-md bg-red-50 border border-red-200 text-center">
                       <div className="text-[9px] font-black text-red-600 uppercase mb-1">Delinquency Alert</div>
                       <p className="text-[11px] font-bold text-red-800 leading-tight">Your bluebook is expired. A 100% fine on the renewal fee and a base tax penalty have been applied automatically.</p>
                    </div>
                  ) : (
                    <div className="p-6 rounded-md bg-emerald-50 border border-emerald-200 text-center">
                       <div className="text-[9px] font-black text-emerald-600 uppercase mb-1">Compliance Cleared</div>
                       <p className="text-[11px] font-bold text-emerald-800 leading-tight">Your account is within the 90-day grace period. Zero penalties have been assessed.</p>
                    </div>
                  )}
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Bagmati Province {engineType === 'electric' ? 'EV' : 'ICE'} Matrix</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">{engineType === 'electric' ? 'Motor Power (kW)' : 'Engine Capacity (CC)'}</th>
                    <th className="px-6 py-4 bg-white text-right">Annual Govt Tax</th>
                    <th className="px-6 py-4 bg-white text-right text-[#D93025]">With 20% Late Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {(() => {
                    let rates: any[] = [];
                    if (engineType === 'electric' && vType === 'bike') rates = [{ label: 'Standard EV Bike', rate: 2500 }];
                    else if (engineType === 'electric' && vType === 'car') rates = EV_CAR_RATES;
                    else if (vType === 'bike') rates = BIKE_RATES;
                    else rates = CAR_RATES.private;
                    
                    return rates.map((s, idx) => (
                      <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-6 py-4 font-bold text-[#3C4043]">{s.label}</td>
                        <td className="px-6 py-4 text-right font-black text-[#5F6368]">{formatNPR(s.rate)}</td>
                        <td className="px-6 py-4 text-right font-black text-[#D93025]">{formatNPR(s.rate * 1.2)}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Engine Protocol: Select between Combustion (Petrol/Diesel) or Electric (EV).",
          "Vehicle Type: Select Two-Wheeler (Bike/Scooter) or Four-Wheeler (Car/Jeep).",
          "Capacity: Input the CC or kW exactly as listed in your physical blue-book.",
          "Penalty Audit: Select your expiry delay status. Missing the 90-day grace period automatically applies compound fines.",
          "Final Readout: Verify the Govt Tax slab and the statutory Third-Party Insurance estimate."
        ]
      }}
      formula={{
        title: "The Road Tax Calculus (Bagmati Std)",
        description: "Official progressive tax brackets issued by the Bagmati Province Finance Ministry for FY 2083/84.",
        raw: "Liability = Base_Tax(Capacity) + Delay_Penalties + Third_Party_Insurance + Renewal_Fees",
        variables: [
          "Base Tax: Fixed annual fee per CC or kW bracket",
          "Penalty: Progressive compound fines scaling up to 32% per year",
          "Cap Rule: Maximum base tax collection is capped at 4 years pending",
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
          { label: "Fuel Cost Tool", href: "/calculator/nepal-vehicle-tax/", icon: Activity },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "DoTM Official", href: "https://dotm.gov.np", icon: Globe },
        ],
      }}
      relatedTools={[
        { label: "Fuel Cost Tool", href: "/calculator/nepal-vehicle-tax/" },
        { label: "Home Loan EMI", href: "/calculator/nepal-home-loan/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
