'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import {
  Car, Bike, ShieldCheck, AlertCircle, Zap, Activity, Globe,
  Landmark, Wallet, Table, BatteryCharging, Truck, Bus,
  Tractor, Package
} from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import {
  PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

// ─── 2083/84 RATE CONSTANTS ───────────────────────────────────────────────────

const BIKE_RATES = [
  { max: 125,      rate: 3000,  label: 'Up to 125cc (Activa, Ntorq, Splendor)' },
  { max: 150,      rate: 5000,  label: '126–150cc (Pulsar 150, FZ)' },
  { max: 225,      rate: 6500,  label: '151–225cc (Apache, Bullet 350)' },
  { max: 400,      rate: 12000, label: '226–400cc (Duke 250/390, Himalayan)' },
  { max: 650,      rate: 25000, label: '401–650cc (Interceptor 650)' },
  { max: Infinity, rate: 35000, label: '651cc+ (Superbikes)' },
];

const CAR_PRIVATE_RATES = [
  { max: 1000,     rate: 22000, label: 'Up to 1000cc' },
  { max: 1500,     rate: 25000, label: '1001–1500cc' },
  { max: 2000,     rate: 27000, label: '1501–2000cc' },
  { max: 2500,     rate: 37000, label: '2001–2500cc' },
  { max: 3000,     rate: 50000, label: '2501–3000cc' },
  { max: 3500,     rate: 65000, label: '3001–3500cc' },
  { max: Infinity, rate: 70000, label: '3500cc+' },
];

const CAR_PUBLIC_RATES = [
  { max: 1500,     rate: 4000,  label: 'Up to 1500cc (Taxi)' },
  { max: Infinity, rate: 6000,  label: '1500cc+ (Taxi/Commercial)' },
];

// Bus/Microbus – taxed by number of seats
const BUS_RATES = [
  { max: 14,       rate: 8000,  label: '1–14 Seats (Microbus)' },
  { max: 25,       rate: 12000, label: '15–25 Seats (Minibus)' },
  { max: 35,       rate: 18000, label: '26–35 Seats (Medium Bus)' },
  { max: Infinity, rate: 35000, label: '36+ Seats (Large Bus)' },
];

// Truck/Lorry – taxed by weight capacity (metric tonnes)
const TRUCK_RATES = [
  { max: 3,        rate: 10000, label: 'Up to 3 Tonnes' },
  { max: 5,        rate: 15000, label: '3–5 Tonnes' },
  { max: 10,       rate: 25000, label: '5–10 Tonnes' },
  { max: Infinity, rate: 35000, label: '10+ Tonnes' },
];

// EV Annual Road Tax – by motor output kW
const EV_BIKE_RATE  = 2500;  // flat for all e-scooters / e-bikes
const EV_CAR_RATES  = [
  { max: 50,       rate: 5000,  label: '10 kW to 50 kW' },
  { max: 125,      rate: 15000, label: '51 kW to 125 kW' },
  { max: 200,      rate: 20000, label: '126 kW to 200 kW' },
  { max: Infinity, rate: 30000, label: 'Above 200 kW' },
];

// EV Import CIF Clean Infrastructure Investment Fee tiers
const CIF_TIERS = [
  { maxLakh: 20,       feeRate: 0.025,  label: 'Up to Rs. 20 Lakh',           customsRate: 0.20 },
  { maxLakh: 30,       feeRate: 0.075,  label: 'Rs. 20 Lakh to Rs. 30 Lakh',  customsRate: 0.20 },
  { maxLakh: 40,       feeRate: 0.15,   label: 'Rs. 30 Lakh to Rs. 40 Lakh',  customsRate: 0.20 },
  { maxLakh: 50,       feeRate: 0.70,   label: 'Rs. 40 Lakh to Rs. 50 Lakh',  customsRate: 0.20 },
  { maxLakh: Infinity, feeRate: 1.125,  label: 'Above Rs. 50 Lakh',           customsRate: 0.20 },
];

// Progressive delay penalty config
const DELAY_STATUSES = [
  { id: 'ontime',       label: 'On Time (Within 90-Day Grace)',  basePenalty: 0,    renewMult: 1, yearsBack: 0 },
  { id: '30days',       label: '1–30 Days Past Grace Period',    basePenalty: 0.05, renewMult: 2, yearsBack: 0 },
  { id: '45days',       label: '31–45 Days Past Grace Period',   basePenalty: 0.10, renewMult: 2, yearsBack: 0 },
  { id: 'end_fy',       label: '46 Days to End of Fiscal Year',  basePenalty: 0.20, renewMult: 2, yearsBack: 0 },
  { id: '1_year',       label: '1 Full Fiscal Year Late',        basePenalty: 0.32, renewMult: 2, yearsBack: 1 },
  { id: '2_years',      label: '2 Fiscal Years Late',            basePenalty: 0.64, renewMult: 2, yearsBack: 2 },
  { id: '3_years',      label: '3 Fiscal Years Late',            basePenalty: 0.96, renewMult: 2, yearsBack: 3 },
  { id: '4_years',      label: '4 Fiscal Years Late',            basePenalty: 1.28, renewMult: 2, yearsBack: 4 },
  { id: '5_years_plus', label: '5+ Years Late (4-Yr Cap Applies)', basePenalty: 1.60, renewMult: 2, yearsBack: 4 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatNPR(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

function formatLakh(n: number) {
  return 'Rs. ' + n.toFixed(2) + ' Lakh';
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

type CalcMode   = 'renewal' | 'ev_import';
type EngineType = 'combustion' | 'electric';
type VehicleCategory = 'bike' | 'car_private' | 'car_public' | 'bus' | 'truck' | 'agri';

export default function NepalVehicleTaxCalculator() {
  const [state, setState] = useSyncState('nepal_vehicle_tax_v7', {
    calcMode:    'renewal'    as CalcMode,
    engineType:  'combustion' as EngineType,
    vCategory:   'bike'       as VehicleCategory,
    engineCC:    150,
    motorKw:     100,
    seats:       20,
    weightTon:   5,
    cifLakh:     35,
    delayStatus: 'ontime',
  });

  const {
    calcMode, engineType, vCategory,
    engineCC, motorKw, seats, weightTon, cifLakh, delayStatus,
  } = state;

  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  // ── RENEWAL MATH ──────────────────────────────────────────────────────────
  const renewalResult = useMemo(() => {
    let baseTax   = 0;
    let slabLabel = '';
    let renewFee  = 300;

    if (engineType === 'electric') {
      if (vCategory === 'bike') {
        baseTax   = EV_BIKE_RATE;
        slabLabel = 'Standard EV Two-Wheeler';
        renewFee  = 300;
      } else {
        const found = EV_CAR_RATES.find(s => motorKw <= s.max);
        baseTax   = found?.rate ?? 0;
        slabLabel = found?.label ?? '';
        renewFee  = 500;
        // 50% discount for public EVs
        if (vCategory === 'car_public') baseTax = baseTax * 0.5;
      }
    } else {
      switch (vCategory) {
        case 'bike': {
          const f = BIKE_RATES.find(s => engineCC <= s.max);
          baseTax = f?.rate ?? 0; slabLabel = f?.label ?? ''; renewFee = 300;
          break;
        }
        case 'car_private': {
          const f = CAR_PRIVATE_RATES.find(s => engineCC <= s.max);
          baseTax = f?.rate ?? 0; slabLabel = f?.label ?? ''; renewFee = 500;
          break;
        }
        case 'car_public': {
          const f = CAR_PUBLIC_RATES.find(s => engineCC <= s.max);
          baseTax = f?.rate ?? 0; slabLabel = f?.label ?? ''; renewFee = 500;
          break;
        }
        case 'bus': {
          const f = BUS_RATES.find(s => seats <= s.max);
          baseTax = f?.rate ?? 0; slabLabel = f?.label ?? ''; renewFee = 500;
          break;
        }
        case 'truck': {
          const f = TRUCK_RATES.find(s => weightTon <= s.max);
          baseTax = f?.rate ?? 0; slabLabel = f?.label ?? ''; renewFee = 500;
          break;
        }
        case 'agri': {
          baseTax = 3000; slabLabel = 'Agricultural / Three-Wheeler'; renewFee = 300;
          break;
        }
      }
    }

    const delayConfig  = DELAY_STATUSES.find(d => d.id === delayStatus) || DELAY_STATUSES[0];
    // 4-Year Cap: back taxes capped at 4 years regardless of actual delay
    const yearsOwed    = Math.min(1 + delayConfig.yearsBack, 4);
    const totalBaseTax = baseTax * yearsOwed;
    const penaltyFine  = baseTax * delayConfig.basePenalty;
    const finalRenew   = renewFee * delayConfig.renewMult;
    const insuranceEst = ['bike', 'agri'].includes(vCategory) ? 2200 : 8500;
    const total        = totalBaseTax + penaltyFine + insuranceEst + finalRenew;
    const isLate       = delayStatus !== 'ontime';

    const pieData = [
      { name: 'Govt Base Tax',     value: totalBaseTax },
      { name: 'Late Penalties',    value: penaltyFine  },
      { name: 'Insurance Premium', value: insuranceEst },
      { name: 'Renewal Fee',       value: finalRenew   },
    ];

    return { baseTax: totalBaseTax, penaltyFine, insuranceEst, finalRenew, total, slabLabel, pieData, isLate, yearsOwed, renewFee };
  }, [engineType, vCategory, engineCC, motorKw, seats, weightTon, delayStatus]);

  // ── EV IMPORT / CIF MATH ──────────────────────────────────────────────────
  const cifResult = useMemo(() => {
    const cifNPR    = cifLakh * 100000;
    const tier      = CIF_TIERS.find(t => cifLakh <= t.maxLakh) || CIF_TIERS[CIF_TIERS.length - 1];
    const customs   = cifNPR * tier.customsRate;         // flat 20%
    const cleanFee  = cifNPR * tier.feeRate;             // progressive clean infrastructure levy
    const landedEst = cifNPR + customs + cleanFee;

    const pieData = [
      { name: 'CIF Value',                    value: cifNPR   },
      { name: 'Customs Duty (20%)',           value: customs  },
      { name: 'Clean Infrastructure Levy',    value: cleanFee },
    ];

    return { cifNPR, customs, cleanFee, landedEst, tier, pieData };
  }, [cifLakh]);

  // ── VEHICLE CATEGORY OPTIONS ───────────────────────────────────────────────
  const allCategories = [
    { id: 'bike',       label: 'Two-Wheeler',        sub: 'Bike / Scooter',        icon: Bike,    evAllowed: true },
    { id: 'car_private',label: 'Four-Wheeler',       sub: 'Private Car / Jeep',    icon: Car,     evAllowed: true },
    { id: 'car_public', label: 'Taxi / Commercial',  sub: 'Public Four-Wheeler',   icon: Car,     evAllowed: true },
    { id: 'bus',        label: 'Bus / Microbus',     sub: 'Passenger Transport',   icon: Bus,     evAllowed: false },
    { id: 'truck',      label: 'Truck / Lorry',      sub: 'Goods / Cargo',         icon: Truck,   evAllowed: false },
    { id: 'agri',       label: 'Agricultural',       sub: 'Tractor / Three-Wheeler',icon: Tractor, evAllowed: false },
  ];

  const visibleCategories = engineType === 'electric'
    ? allCategories.filter(c => c.evAllowed)
    : allCategories;

  const PIE_COLORS = ['#1A73E8', '#D93025', '#188038', '#fbbf24', '#9b59b6'];

  return (
    <ModernCalcLayout
      slug="nepal-vehicle-tax"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Vehicle Tax' }]}
      title="Nepal Vehicle Tax 2083/84"
      description="The definitive blue-book renewal engine for Nepal. Calculate annual road tax for all vehicle types — bikes, cars, buses, trucks, and EVs — plus EV import duties using the 2083/84 CIF model."
      icon={Car}
      inputs={
        <div className="space-y-6">

          {/* ── MASTER MODE TOGGLE ─────────────────────────────────── */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Calculator Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'renewal',   label: 'Annual Bluebook Renewal',   icon: Table },
                { id: 'ev_import', label: 'EV Import Duty (CIF)',       icon: BatteryCharging },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => update({ calcMode: opt.id as CalcMode })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-md border transition-all ${calcMode === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                >
                  <opt.icon className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-black uppercase text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {calcMode === 'renewal' ? (
            <>
              {/* ── ENGINE PROTOCOL ──────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Engine Protocol</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'combustion', label: 'Combustion (Petrol/Diesel)', icon: Zap },
                    { id: 'electric',   label: 'Electric (EV)',               icon: BatteryCharging },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => update({ engineType: opt.id as EngineType, vCategory: 'bike' })}
                      className={`flex items-center justify-center gap-2 p-4 rounded-md border transition-all ${engineType === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                    >
                      <opt.icon className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-black uppercase text-center leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── VEHICLE CATEGORY GRID ────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Vehicle Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {visibleCategories.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => update({ vCategory: opt.id as VehicleCategory })}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-md border transition-all ${vCategory === opt.id ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-[#1A73E8]'}`}
                    >
                      <opt.icon className="w-5 h-5" />
                      <span className="text-[9px] font-black uppercase text-center leading-tight">{opt.label}</span>
                      <span className="text-[8px] font-bold text-center leading-tight opacity-60">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── DYNAMIC CAPACITY INPUT ───────────────────────────── */}
              {vCategory === 'bus' ? (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Number of Passenger Seats</label>
                  <input
                    type="number" min={1} value={seats}
                    onChange={e => update({ seats: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                  />
                </div>
              ) : vCategory === 'truck' ? (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Weight Capacity (Metric Tonnes)</label>
                  <input
                    type="number" min={0.5} step={0.5} value={weightTon}
                    onChange={e => update({ weightTon: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                  />
                </div>
              ) : vCategory === 'agri' ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-[10px] text-amber-800 font-bold uppercase">Tractors, power tillers, and three-wheelers (e.g., Tempo) pay a flat annual road tax of Rs. 3,000.</p>
                </div>
              ) : engineType === 'electric' ? (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Motor Output (kW)</label>
                  <input
                    type="number" min={1} value={motorKw}
                    onChange={e => update({ motorKw: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Engine Displacement (CC)</label>
                  <input
                    type="number" min={1} value={engineCC}
                    onChange={e => update({ engineCC: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                  />
                </div>
              )}

              {/* ── PENALTY / DELAY STATUS ───────────────────────────── */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#D93025] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Bluebook Renewal Delay Status
                </label>
                <select
                  value={delayStatus}
                  onChange={e => update({ delayStatus: e.target.value })}
                  className="w-full h-12 px-4 bg-red-50/50 border border-red-200 rounded-md text-sm font-bold text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all appearance-none"
                >
                  {DELAY_STATUSES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* ── CONTEXTUAL ALERT ─────────────────────────────────── */}
              {renewalResult.isLate ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-800 font-bold leading-relaxed uppercase">
                    Late fine applied. Renewal fee doubled to {formatNPR(renewalResult.finalRenew)}.
                    {delayStatus === '5_years_plus' && ' Base tax capped at 4 years under DoTM regulations.'}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald-800 font-bold leading-relaxed uppercase">
                    Within the 90-day grace period. No penalties applied.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* ── EV IMPORT CIF MODE ────────────────────────────────── */
            <>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-[10px] text-blue-800 font-bold uppercase leading-relaxed">
                  As per Budget Prastab 2083/84: New EVs are subject to a flat 20% customs duty on CIF value plus a progressive Clean Infrastructure Investment Fee. Excise duty is fully abolished.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Vehicle CIF Value (in Lakhs NPR)</label>
                <input
                  type="number" min={1} step={0.5} value={cifLakh}
                  onChange={e => update({ cifLakh: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
                />
                <p className="text-[10px] text-[#5F6368] font-bold">Enter the CIF value shown on the import invoice in Lakhs. (e.g., 35 = Rs. 35,00,000)</p>
              </div>
            </>
          )}

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Generate 2083/84 Report
          </button>
        </div>
      }
      results={
        calcMode === 'renewal' ? (
          <div className="space-y-5 h-full flex flex-col justify-center">
            <div className={`rounded-lg p-8 text-center space-y-2 relative overflow-hidden ${renewalResult.isLate ? 'bg-red-50 border border-red-200' : 'bg-[#E8F0FE]'}`}>
              {renewalResult.isLate && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
              <div className={`text-[10px] font-bold uppercase tracking-wider ${renewalResult.isLate ? 'text-red-700' : 'text-[#1A73E8]'}`}>Total Renewal Liability</div>
              <div className={`text-4xl font-black ${renewalResult.isLate ? 'text-red-700' : 'text-[#1A73E8]'}`}>{formatNPR(renewalResult.total)}</div>
              <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Province: Bagmati Std FY 2083/84</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">
                  Govt Tax {renewalResult.yearsOwed > 1 ? `(${renewalResult.yearsOwed} Yrs)` : ''}
                </div>
                <div className="text-lg font-black text-[#202124]">{formatNPR(renewalResult.baseTax)}</div>
              </div>
              <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#D93025] uppercase tracking-wider mb-1">Late Penalties</div>
                <div className="text-lg font-black text-[#D93025]">{formatNPR(renewalResult.penaltyFine)}</div>
              </div>
              <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#188038] uppercase tracking-wider mb-1">Insurance Est.</div>
                <div className="text-lg font-black text-[#188038]">{formatNPR(renewalResult.insuranceEst)}</div>
              </div>
              <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Renewal Fee</div>
                <div className="text-lg font-black text-[#5F6368]">{formatNPR(renewalResult.finalRenew)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5 h-full flex flex-col justify-center">
            <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
              <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Estimated Landed Cost</div>
              <div className="text-4xl font-black text-[#1A73E8]">{formatNPR(cifResult.landedEst)}</div>
              <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">CIF Tier: {cifResult.tier.label}</div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="border border-[#DADCE0] rounded-md p-4 flex justify-between items-center bg-white">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase">CIF Invoice Value</span>
                <span className="text-sm font-black text-[#202124]">{formatNPR(cifResult.cifNPR)}</span>
              </div>
              <div className="border border-[#DADCE0] rounded-md p-4 flex justify-between items-center bg-white">
                <span className="text-[10px] font-bold text-[#D93025] uppercase">Customs Duty (Flat 20%)</span>
                <span className="text-sm font-black text-[#D93025]">{formatNPR(cifResult.customs)}</span>
              </div>
              <div className="border border-amber-300 rounded-md p-4 flex justify-between items-center bg-amber-50">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Clean Infrastructure Fee</span>
                <span className="text-sm font-black text-amber-800">{formatNPR(cifResult.cleanFee)}</span>
              </div>
            </div>
          </div>
        )
      }
      details={
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Liability Composition</h3>
              </div>
              <div className="h-[220px] w-full relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={(calcMode === 'renewal' ? renewalResult.pieData : cifResult.pieData).filter(d => d.value > 0)}
                      cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none"
                    >
                      {PIE_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatNPR(v)} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-bold text-[#5F6368] uppercase">Total</span>
                  <span className="text-base font-black text-[#202124]">{formatNPR(calcMode === 'renewal' ? renewalResult.total : cifResult.landedEst)}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-[9px] font-bold text-[#5F6368] uppercase">
                {(calcMode === 'renewal' ? renewalResult.pieData : cifResult.pieData).filter(d => d.value > 0).map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Slab Reference */}
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Active Slab Details</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#5F6368] uppercase">Mode</span>
                  <span className="text-xs font-black text-[#1A73E8] uppercase">{calcMode === 'renewal' ? 'Bluebook Renewal' : 'EV Import CIF'}</span>
                </div>
                {calcMode === 'renewal' && (
                  <>
                    <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#5F6368] uppercase">Tax Slab</span>
                      <span className="text-xs font-black text-[#202124]">{renewalResult.slabLabel}</span>
                    </div>
                    <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#5F6368] uppercase">Vehicle Type</span>
                      <span className="text-xs font-black text-[#1A73E8] uppercase">{engineType} / {vCategory.replace('_', ' ')}</span>
                    </div>
                    {renewalResult.isLate ? (
                      <div className="p-4 rounded-md bg-red-50 border border-red-200 text-center">
                        <div className="text-[9px] font-black text-red-600 uppercase mb-1">Delinquency Alert</div>
                        <p className="text-[10px] font-bold text-red-800 leading-tight">Bluebook expired. 100% fine on renewal fee applied. Penalty charged on base tax. Max 4-year cap enforced if applicable.</p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-center">
                        <div className="text-[9px] font-black text-emerald-600 uppercase mb-1">Compliance Cleared</div>
                        <p className="text-[10px] font-bold text-emerald-800 leading-tight">Within 90-day grace window. Zero penalties applied.</p>
                      </div>
                    )}
                  </>
                )}
                {calcMode === 'ev_import' && (
                  <>
                    <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#5F6368] uppercase">CIF Tier</span>
                      <span className="text-xs font-black text-[#202124]">{cifResult.tier.label}</span>
                    </div>
                    <div className="p-3 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#5F6368] uppercase">Infrastructure Fee Rate</span>
                      <span className="text-xs font-black text-amber-700">{(cifResult.tier.feeRate * 100).toFixed(1)}% of CIF</span>
                    </div>
                    <div className="p-4 rounded-md bg-blue-50 border border-blue-200 text-center">
                      <div className="text-[9px] font-black text-blue-700 uppercase mb-1">Note</div>
                      <p className="text-[10px] font-bold text-blue-800 leading-tight">Excise duty is 0% for EVs under Budget 2083/84. This estimate excludes dealer margins and local VAT.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Full Rate Matrix Table */}
          <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] bg-[#F8F9FA] flex items-center gap-2">
              <Table className="w-4 h-4 text-[#1A73E8]" />
              <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">
                {calcMode === 'renewal'
                  ? `Bagmati Province Tax Matrix – ${engineType === 'electric' ? 'EV kW Slabs' : vCategory.replace('_', ' ').toUpperCase()} (FY 2083/84)`
                  : 'EV Import CIF Clean Infrastructure Fee Tiers (FY 2083/84)'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    {calcMode === 'renewal' ? (
                      <>
                        <th className="px-5 py-3 bg-white">
                          {vCategory === 'bus' ? 'Seats' : vCategory === 'truck' ? 'Weight (Tons)' : engineType === 'electric' ? 'Motor (kW)' : 'Engine (CC)'}
                        </th>
                        <th className="px-5 py-3 bg-white text-right">Annual Tax</th>
                        <th className="px-5 py-3 bg-white text-right text-[#D93025]">+20% Fine</th>
                      </>
                    ) : (
                      <>
                        <th className="px-5 py-3 bg-white">CIF Value Range</th>
                        <th className="px-5 py-3 bg-white text-right">Customs Duty</th>
                        <th className="px-5 py-3 bg-white text-right">Infrastructure Fee Rate</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {calcMode === 'renewal' ? (() => {
                    let rates: { label: string; rate: number }[] = [];
                    if (engineType === 'electric') {
                      if (vCategory === 'bike') rates = [{ label: 'Standard EV Bike/Scooter', rate: EV_BIKE_RATE }];
                      else rates = EV_CAR_RATES;
                    } else if (vCategory === 'bike')        rates = BIKE_RATES;
                    else if (vCategory === 'car_private')   rates = CAR_PRIVATE_RATES;
                    else if (vCategory === 'car_public')    rates = CAR_PUBLIC_RATES;
                    else if (vCategory === 'bus')           rates = BUS_RATES;
                    else if (vCategory === 'truck')         rates = TRUCK_RATES;
                    else rates = [{ label: 'Agricultural / Three-Wheeler', rate: 3000 }];
                    return rates.map((s, i) => (
                      <tr key={i} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                        <td className="px-5 py-3 font-bold text-[#3C4043]">{s.label}</td>
                        <td className="px-5 py-3 text-right font-black text-[#5F6368]">{formatNPR(s.rate)}</td>
                        <td className="px-5 py-3 text-right font-black text-[#D93025]">{formatNPR(s.rate * 1.2)}</td>
                      </tr>
                    ));
                  })() : CIF_TIERS.map((t, i) => (
                    <tr key={i} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-5 py-3 font-bold text-[#3C4043]">{t.label}</td>
                      <td className="px-5 py-3 text-right font-black text-[#D93025]">20% of CIF</td>
                      <td className="px-5 py-3 text-right font-black text-amber-700">{(t.feeRate * 100).toFixed(1)}%</td>
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
          "Select Calculator Mode: Choose 'Annual Bluebook Renewal' for road tax, or 'EV Import Duty (CIF)' for import duty estimation.",
          "Engine Protocol: For renewals, select Combustion or Electric. Commercial vehicles (Bus, Truck) are always combustion.",
          "Vehicle Category: Pick from Two-Wheeler, Car (Private), Taxi, Bus/Microbus, Truck, or Agricultural.",
          "Enter Capacity: Input CC, kW, Seats, or Tonnes depending on the vehicle type selected.",
          "Delay Status: Select how late your renewal is. The 4-year legal cap is enforced automatically for 5+ year delays.",
          "EV Import: Enter the CIF invoice value in Lakhs to calculate flat 20% customs duty and the Clean Infrastructure Fee."
        ]
      }}
      formula={{
        title: "Vehicle Tax & EV Import Calculus (2083/84)",
        description: "Official Bagmati Province progressive slabs plus DoTM penalty rules and 2083/84 EV import valuation matrix.",
        raw: "Annual: Liability = Base_Tax(CC|kW|Seats|Tons) × Years_Owed(max 4) + Penalty(32%/yr) + Insurance + Renewal_Fee\nEV Import: Landed Cost = CIF + (CIF × 20%) + Clean_Infrastructure_Fee(tiered)",
        variables: [
          "Base Tax: Fixed annual fee per bracket (CC / kW / Seats / Tons)",
          "Penalty: Progressive 5%→10%→20%→32%/yr compound fine after grace period",
          "4-Year Cap: DoTM regulation caps pending base tax at 4 fiscal years maximum",
          "CIF Customs: Flat 20% across all EVs (excise abolished in 2083/84)",
          "Clean Infrastructure Fee: Tiered 2.5% to 112.5% based on vehicle CIF value"
        ]
      }}
      faqs={[
        { question: "How is bus or microbus tax calculated in Nepal?", answer: "Bus and microbus annual road tax is determined by the total number of registered passenger seats, not engine CC. A 14-seat microbus pays approximately Rs. 8,000 per year under Bagmati Province rates for FY 2083/84." },
        { question: "What is the EV import duty structure for 2083/84?", answer: "Under Budget 2083/84, all imported passenger EVs face a flat 20% customs duty on the CIF (Cost, Insurance & Freight) value. Excise duty has been completely abolished. A tiered Clean Infrastructure Investment Fee (2.5% to 112.5% of CIF) is also applied based on vehicle valuation." },
        { question: "What happens if I do not renew my bluebook for over 5 years?", answer: "You will face heavy financial penalties, but under DoTM's 4-year cap regulation, you are only liable to pay a maximum of 4 years of pending base vehicle tax. However, the 32% per year compounding late fine still applies across all 4 years. Extended delinquency will blacklist your vehicle in the TMIS database." },
        { question: "Do public or rental EVs get a discount on road tax?", answer: "Yes. Public electric vehicles and registered green rental fleets receive a 50% discount on the standard annual EV road tax slabs, making eco-friendly conversions highly profitable for commercial transport operators." }
      ]}
      sidebar={{
        title: "Auto Hub Nepal",
        subtitle: "Compliance Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Wallet },
          { label: "Income Tax Tool",   href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "DoTM Official",     href: "https://dotm.gov.np", icon: Globe },
          { label: "Activity Monitor",  href: "/calculator/nepal-vehicle-tax/", icon: Activity },
        ],
      }}
      relatedTools={[
        { label: "Home Loan EMI",    href: "/calculator/nepal-home-loan/" },
        { label: "Salary Calculator",href: "/calculator/nepal-salary/" },
        { label: "Income Tax",       href: "/calculator/nepal-income-tax/" },
        { label: "Gold Tax",         href: "/calculator/gold-tax/" },
      ]}
    />
  );
}
