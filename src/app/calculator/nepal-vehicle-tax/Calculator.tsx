'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Car, Bike, Info, ShieldCheck, AlertCircle } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

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

export default function NepalVehicleTaxCalculator() {
  const [state, setState] = useSyncState('nepal_vehicle_tax_v1', {
    vType: 'bike' as 'bike' | 'car',
    engineCC: 150,
    carType: 'private' as 'private' | 'public',
  });
  const { vType, engineCC, carType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    let baseTax = 0;
    let slab = '';
    if (vType === 'bike') {
      const found = BIKE_RATES.find(s => engineCC <= s.max);
      baseTax = found?.rate ?? 0;
      slab = found?.label ?? '';
    } else {
      const list = CAR_RATES[carType];
      const found = list.find(s => engineCC <= s.max);
      baseTax = found?.rate ?? 0;
      slab = found?.label ?? '';
    }
    const insuranceEst = vType === 'bike' ? 2200 : 8000;
    return { baseTax, total: baseTax + insuranceEst, insuranceEst, slab };
  }, [vType, engineCC, carType]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Vehicle Tax Calculator' }]}
      title="Nepal Vehicle Tax Calculator"
      description="Calculate your annual blue-book renewal tax for motorbikes and cars in Nepal. Based on the latest Bagmati Province tax slabs for FY 2081/82."
      icon={Car}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>Vehicle Type</label>
            <div className="grid grid-cols-2 gap-3">
              {([['bike', 'Motorbike'], ['car', 'Car / Jeep']] as const).map(([type, label]) => (
                <button key={type} onClick={() => update({ vType: type })}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${vType === type ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:bg-[#F8F9FA]'}`}>
                  {type === 'bike'
                    ? <Bike className={`w-8 h-8 ${vType === type ? 'text-[#1A73E8]' : 'text-[#9AA0A6]'}`} />
                    : <Car className={`w-8 h-8 ${vType === type ? 'text-[#1A73E8]' : 'text-[#9AA0A6]'}`} />}
                  <span className={`text-[10px] font-black uppercase ${vType === type ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Engine Capacity (CC)</label>
            <div className="relative">
              <input type="number" value={engineCC} min={1} max={10000}
                onChange={e => update({ engineCC: Number(e.target.value) })} className={inputCls} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">CC</span>
            </div>
          </div>

          {vType === 'car' && (
            <div className="space-y-2">
              <label className={labelCls}>Ownership Type</label>
              <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
                {(['private', 'public'] as const).map(t => (
                  <button key={t} onClick={() => update({ carType: t })}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${carType === t ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 p-3 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Rates based on <strong>Bagmati Province</strong> standard for FY 2081/82. Other provinces may differ slightly.</p>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Vehicle Tax
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Annual Government Tax</div>
            <div className="text-4xl font-black text-[#202124]">Rs. {results.baseTax.toLocaleString()}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">{engineCC}CC {vType} · {results.slab}</div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Cost Breakdown</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Government Tax</span>
                <span className="font-black">Rs. {results.baseTax.toLocaleString()}</span>
              </div>
              <div className="p-3 flex justify-between text-xs">
                <span className="text-[#5F6368]">Est. Third-Party Insurance</span>
                <span className="font-black">Rs. {results.insuranceEst.toLocaleString()}</span>
              </div>
              <div className="p-3 flex justify-between text-xs bg-[#F8F9FA]">
                <span className="font-bold text-[#202124]">Total Renewal Cost (est.)</span>
                <span className="font-black text-[#1A73E8]">Rs. {results.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#1A1A2E] text-white rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-[10px] font-black uppercase tracking-wider">Compliance Reminder</span>
            </div>
            <p className="text-[10px] text-white/70 leading-relaxed">Pay your renewal tax within the first <strong className="text-white">3 months</strong> of the new fiscal year (Shrawan–Ashwin) to avoid the <strong className="text-[#FF5252]">20% penalty</strong> fine.</p>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <AlertCircle className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Insurance estimate is approximate. Actual insurance premium depends on the insurer and vehicle age.</p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your vehicle type — Motorbike or Car/Jeep.",
          "Enter the engine capacity in CC (found in your blue book).",
          "For cars, select Private or Public ownership.",
          "View the government tax, insurance estimate, and total cost.",
          "Pay at your local revenue office (Rajaswa Karyalay) or via online banking."
        ]
      }}
      formula={{
        title: "Nepal Vehicle Tax Slabs",
        description: "Tax is determined by engine CC, vehicle type, and province. It is a flat annual fee, not a percentage.",
        raw: "Bike (up to 125cc): Rs. 3,000 | 126-150cc: Rs. 5,000\nCar Private (up to 1000cc): Rs. 22,000 | 1001-1500cc: Rs. 25,000\nLate payment penalty: +20% of base tax"
      }}
      faqs={[
        {
          question: "Where do I pay vehicle tax in Nepal?",
          answer: "You can pay at the District Revenue Office (Rajaswa Karyalay) in person, or through the NRB-approved online payment portals like Connect IPS and internet banking of major commercial banks."
        },
        {
          question: "What happens if I miss the 3-month deadline?",
          answer: "A 20% penalty is added to your base tax amount. For example, if your tax is Rs. 5,000, the total becomes Rs. 6,000. Further delays can result in additional fines and vehicle impoundment."
        }
      ]}
      sidebar={{
        title: "Nepal Finance Tools",
        links: [
          { label: "Property Tax", href: "/calculator/property-tax" },
          { label: "Nepal VAT", href: "/calculator/nepal-vat" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax" },
          { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" },
        ],
        banner: {
          title: "Stay Compliant",
          description: "Renew your vehicle tax on time to avoid penalties and legal issues.",
          image: "/images/vehicle-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Property Tax", href: "/calculator/property-tax" },
        { label: "Nepal VAT", href: "/calculator/nepal-vat" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax" }
      ]}
    />
  );
}
