'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, FileText, CheckCircle2, Info, Receipt, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const DEFAULT_STATE = {
  source: 'rent',
  amount: 50000,
  isVatRegistered: false,
};

const TDS_RATES: Record<string, { rate: number; label: string; isService?: boolean }> = {
  rent: { rate: 0.10, label: 'House/Land Rent' },
  consultancy: { rate: 0.15, label: 'Consultancy Service', isService: true },
  interest: { rate: 0.05, label: 'Interest Payment' },
  commission: { rate: 0.15, label: 'Commission', isService: true },
  meeting: { rate: 0.15, label: 'Meeting Fees' },
  dividend: { rate: 0.05, label: 'Dividend' },
  brokerage: { rate: 0.15, label: 'Brokerage', isService: true },
};

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalTdsCalculator() {
  const [state, setState] = useSyncState('nepal_tds_v5', DEFAULT_STATE);
  const { source, amount, isVatRegistered } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const selectedRate = isVatRegistered && TDS_RATES[source]?.isService ? 0.015 : TDS_RATES[source]?.rate || 0.15;

  const result = useMemo(() => {
    const tdsAmount = amount * selectedRate;
    const netAmount = amount - tdsAmount;
    return { 
      tdsAmount, 
      netAmount, 
      rate: selectedRate * 100,
      chartData: [
        { name: 'Net Payout', val: netAmount, fill: '#188038' },
        { name: 'TDS Withheld', val: tdsAmount, fill: '#D93025' }
      ]
    };
  }, [amount, selectedRate]);

  return (
    <ModernCalcLayout
      slug="nepal-tds"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS"
      description="The definitive Tax Deducted at Source (TDS) engine for Nepal. Calibrated to the Income Tax Act 2058 with real-time VAT-conditional logic."
      icon={Landmark}
      fullWidth={true}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Category</label>
               <div className="grid grid-cols-2 gap-3">
                {Object.entries(TDS_RATES).map(([id, info]) => (
                  <button
                    key={id}
                    onClick={() => updateState({ source: id })}
                    className={`h-auto min-h-[44px] py-2 px-3 rounded-md border flex flex-col items-start justify-center transition-all ${source === id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                  >
                    <div className={`text-[11px] font-black uppercase truncate w-full text-left ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{info.label}</div>
                    <div className={`text-[9px] font-bold ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'} opacity-80`}>{(info.rate * 100).toFixed(1)}% Base</div>
                  </button>
                ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Payment (NPR)</label>
               <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => updateState({ amount: Number(e.target.value) })}
                  className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
               />
            </div>

            {TDS_RATES[source]?.isService && (
              <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Status Modifiers</label>
                 <div 
                    onClick={() => updateState({ isVatRegistered: !isVatRegistered })}
                    className={`cursor-pointer border rounded-md p-4 transition-all flex items-start gap-3 ${isVatRegistered ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:border-[#1A73E8]'}`}
                 >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${isVatRegistered ? 'bg-[#1A73E8] border-[#1A73E8]' : 'border-[#DADCE0] bg-white'}`}>
                       {isVatRegistered && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                       <div className={`text-xs font-bold uppercase tracking-wider ${isVatRegistered ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>Receiver is VAT Registered</div>
                       <div className="text-[10px] text-[#5F6368] mt-1 leading-relaxed">Reduces service TDS rate from 15% to 1.5%. Requires a valid VAT invoice.</div>
                    </div>
                 </div>
              </div>
            )}

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md flex gap-3">
               <ShieldCheck className="w-5 h-5 text-[#1A73E8] shrink-0" />
               <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
                  Institutional Rule: {source === 'rent' ? "Municipal rent tax (10%) applies for corporate leases." : TDS_RATES[source]?.isService ? "Service TDS drops from 15% to 1.5% only with a valid VAT invoice." : "Fixed percentage final withholding."}
               </p>
            </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate TDS Audit
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">TDS Withholding Amount</div>
             <div className="text-5xl font-black text-[#D93025] font-mono tracking-tight">{formatNPR(result.tdsAmount)}</div>
             <div className="flex justify-center mt-2">
                <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-[#D93025] uppercase border border-[#FCE8E6] shadow-sm">
                   Deposit to IRD via E-TDS
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Net to Party</div>
                <div className="text-lg font-black text-[#188038] font-mono">{formatNPR(result.netAmount)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-[#F8F9FA]">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Effective Rate</div>
                <div className="text-lg font-black text-[#202124] font-mono">{result.rate}%</div>
             </div>
          </div>

          <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA]">
             <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Payout Integrity</span>
                <span className="text-[11px] font-black text-[#188038]">{((result.netAmount / amount) * 100).toFixed(1)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
                <div className="h-full bg-[#188038]" style={{ width: `${(result.netAmount / amount) * 100}%` }} />
             </div>
          </div>
        </div>
      }
    />
  );
}

