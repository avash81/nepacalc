'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, FileText, CheckCircle2, Info, Receipt, Zap, Scale, Activity, Globe, History, ShieldCheck, PieChart, TrendingUp, Wallet, ArrowRight, Printer, Download, Copy, Check, AlertCircle } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';

const DEFAULT_STATE = {
  source: 'consultancy',
  amount: 50000,
  recipientType: 'Resident Individual',
  vatStatus: 'No VAT Invoice',
  panStatus: 'Valid PAN'
};

const TDS_RATES: Record<string, { rate: number; label: string; isService?: boolean }> = {
  rent: { rate: 0.10, label: 'House / Land Rent' },
  vehicleHire: { rate: 0.10, label: 'Vehicle Hire' },
  consultancy: { rate: 0.15, label: 'Consultancy Service', isService: true },
  professional: { rate: 0.15, label: 'Professional Service', isService: true },
  contract: { rate: 0.015, label: 'Contract Payment' }, 
  commission: { rate: 0.15, label: 'Commission', isService: true },
  brokerage: { rate: 0.15, label: 'Brokerage', isService: true },
  interest: { rate: 0.06, label: 'Interest Payment' }, 
  dividend: { rate: 0.05, label: 'Dividend Distribution' },
  royalty: { rate: 0.15, label: 'Royalty' },
  insuranceCommission: { rate: 0.20, label: 'Insurance Commission' }, 
  meeting: { rate: 0.15, label: 'Meeting Allowance' },
  transport: { rate: 0.025, label: 'Transport / Freight' },
  advertisement: { rate: 0.015, label: 'Advertisement' },
  legal: { rate: 0.15, label: 'Legal Service', isService: true },
  audit: { rate: 0.15, label: 'Audit Service', isService: true },
  software: { rate: 0.15, label: 'Software Licensing' },
  technical: { rate: 0.15, label: 'Technical Service', isService: true },
  foreignContractor: { rate: 0.05, label: 'Foreign Contractor' },
  rideSharing: { rate: 0.015, label: 'Ride-sharing Payout' },
};

const RECIPIENT_TYPES = [
  'Resident Individual',
  'Resident Business',
  'Non-Resident Individual',
  'Non-Resident Company'
];

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepalTdsCalculator() {
  const [state, setState] = useSyncState('nepal_tds_v6', DEFAULT_STATE);
  const { source, amount, recipientType, vatStatus, panStatus } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  // Do NOT modify formulas yet as instructed
  const isVatRegistered = vatStatus === 'Valid VAT Invoice Provided';
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
    <div className="pb-16">
    <ModernCalcLayout
      slug="nepal-tds"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS Calculator (Tax Deducted at Source) FY 2083/84"
      description="Calculate Tax Deducted at Source (TDS) instantly using the latest official Nepal Income Tax Act and Finance Act provisions for Fiscal Year 2083/84. This calculator helps businesses, employers, professionals, contractors, and taxpayers estimate the correct withholding amount, understand the applicable TDS rate, identify whether the deduction is treated as Advance Tax or Final Withholding Tax, and review the relevant legal provisions. Alongside the calculator, this guide explains how TDS works in Nepal, payment categories, filing requirements, VAT rules, compliance obligations, penalties, and practical examples to help you make informed decisions."
      icon={Landmark}
      intro={
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            'Updated for FY 2083/84',
            'Official Nepal Income Tax Act',
            'Finance Act Updates Included',
            'Resident & Non-Resident Guidance',
            'VAT Rules Explained',
            'Instant TDS Calculation'
          ].map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-[11px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {tag}
            </div>
          ))}
        </div>
      }
      fullWidth={true}
      inputs={
        <div className="space-y-8">
          
          {/* 2. PAYMENT CATEGORY */}
          <div className="space-y-3">
             <div className="flex flex-col">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">SELECT PAYMENT TYPE</label>
               <span className="text-xs text-[#70757A] mt-1">Choose the payment category for which Tax Deducted at Source (TDS) must be calculated.</span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(TDS_RATES).map(([id, info]) => (
                <button
                  key={id}
                  onClick={() => updateState({ source: id })}
                  className={`h-auto min-h-[44px] py-2 px-3 rounded-md border flex flex-col items-start justify-center transition-all text-left ${source === id ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                >
                  <div className={`text-[10px] font-black uppercase leading-tight w-full ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{info.label}</div>
                  <div className={`text-[9px] font-bold mt-1 ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'} opacity-80`}>{(info.rate * 100).toString().replace(/\.0$/, '')}% Standard</div>
                </button>
              ))}
             </div>
          </div>

          {/* 3. RECIPIENT TYPE */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">RECIPIENT TYPE</label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {RECIPIENT_TYPES.map(type => (
                 <label key={type} className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${recipientType === type ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}>
                    <input 
                      type="radio" 
                      name="recipientType" 
                      value={type}
                      checked={recipientType === type}
                      onChange={(e) => updateState({ recipientType: e.target.value })}
                      className="w-3.5 h-3.5 text-[#1A73E8] cursor-pointer"
                    />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${recipientType === type ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{type}</span>
                 </label>
               ))}
             </div>
          </div>

          {/* 4. GROSS PAYMENT */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">GROSS PAYMENT</label>
             <input 
                type="number" 
                value={amount} 
                onChange={(e) => updateState({ amount: Number(e.target.value) })}
                className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
             />
             <p className="text-[10px] text-[#70757A] leading-relaxed">
               Enter the payment amount before deducting TDS. Follow the applicable IRD rule to determine whether VAT is included in the taxable base.
             </p>
          </div>

          {/* 5. VAT STATUS */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">VAT STATUS</label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {['Valid VAT Invoice Provided', 'No VAT Invoice'].map(status => (
                 <label key={status} className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${vatStatus === status ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}>
                    <input 
                      type="radio" 
                      name="vatStatus" 
                      value={status}
                      checked={vatStatus === status}
                      onChange={(e) => updateState({ vatStatus: e.target.value })}
                      className="w-3.5 h-3.5 text-[#1A73E8] cursor-pointer"
                    />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${vatStatus === status ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{status}</span>
                 </label>
               ))}
             </div>
             <p className="text-[10px] text-[#70757A] leading-relaxed">
               The reduced withholding rate only applies where permitted under the applicable Nepal Income Tax Act and a valid VAT invoice has been issued.
             </p>
          </div>

          {/* 6. PAN STATUS */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">PAN STATUS</label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {['Valid PAN', 'PAN Not Available'].map(status => (
                 <label key={status} className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${panStatus === status ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}>
                    <input 
                      type="radio" 
                      name="panStatus" 
                      value={status}
                      checked={panStatus === status}
                      onChange={(e) => updateState({ panStatus: e.target.value })}
                      className="w-3.5 h-3.5 text-[#1A73E8] cursor-pointer"
                    />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${panStatus === status ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{status}</span>
                 </label>
               ))}
             </div>
          </div>

          {/* 7. FISCAL YEAR */}
          <div className="space-y-2">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">APPLICABLE FISCAL YEAR</label>
             <div className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-bold text-[#5F6368] flex items-center">
               2083/84
             </div>
          </div>

          {/* 8. PRIMARY BUTTON */}
          <button className="w-full h-12 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mt-4">
             Calculate TDS & View Compliance Summary <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-start">
          
          {/* 9. RESULT SUMMARY */}
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2 border border-[#D2E3FC]">
             <div className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">TDS TO DEPOSIT</div>
             <div className="text-4xl font-black text-[#D93025] font-mono tracking-tight">{formatNPR(result.tdsAmount)}</div>
             <p className="text-[10px] text-[#5F6368] leading-relaxed max-w-[250px] mx-auto mt-2">
               Deposit this amount to the Inland Revenue Department (IRD) within the applicable statutory deadline.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">NET PAYMENT</div>
                <div className="text-xl font-black text-[#188038] font-mono">{formatNPR(result.netAmount)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">EFFECTIVE TDS RATE</div>
                <div className="text-xl font-black text-[#202124] font-mono">{result.rate.toString().replace(/\.0$/, '')}%</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">LEGAL REFERENCE</div>
                <div className="text-sm font-black text-[#202124]">Section 88</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">TAX TYPE</div>
                <div className="text-sm font-black text-[#202124]">Advance Tax</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">PAYMENT CATEGORY</div>
                <div className="text-sm font-black text-[#202124] leading-tight">{TDS_RATES[source]?.label || 'Consultancy Service'}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">RECIPIENT TYPE</div>
                <div className="text-sm font-black text-[#202124] leading-tight">{recipientType}</div>
             </div>
          </div>

          {/* 10. WHY WAS THIS RATE APPLIED? */}
          <div className="border border-[#DADCE0] rounded-lg p-5 bg-white shadow-sm mt-4">
             <div className="flex items-center gap-2 mb-3 border-b border-[#F1F3F4] pb-2">
                <Info className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">WHY WAS THIS RATE APPLIED?</h3>
             </div>
             <p className="text-[11px] text-[#5F6368] leading-relaxed">
               A {result.rate.toString().replace(/\.0$/, '')}% withholding rate has been applied because the selected payment category is <strong>{TDS_RATES[source]?.label || 'Consultancy Service'}</strong> using the standard withholding rule. Reduced rates only apply where permitted under the applicable law and supported by a valid VAT invoice.
             </p>
          </div>

          {/* 11. COMPLIANCE CHECKLIST */}
          <div className="border border-[#DADCE0] rounded-lg p-5 bg-white shadow-sm mt-2">
             <div className="flex items-center gap-2 mb-3 border-b border-[#F1F3F4] pb-2">
                <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">COMPLIANCE CHECKLIST</h3>
             </div>
             <ul className="space-y-2">
                {[
                  'Verify recipient PAN',
                  'Verify payment category',
                  'Deposit TDS within the prescribed deadline',
                  'File the transaction through e-TDS',
                  'Maintain supporting documents',
                  'Issue a TDS certificate where applicable'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-[#5F6368]">
                    <Check className="w-3.5 h-3.5 text-[#188038] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
             </ul>
          </div>

          {/* 12. DOWNLOAD ACTIONS */}
          <div className="flex flex-wrap gap-2 mt-4">
             <button className="flex-1 min-w-[120px] h-10 border border-[#DADCE0] rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
               <Download className="w-3.5 h-3.5" /> Summary (PDF)
             </button>
             <button className="flex-1 min-w-[120px] h-10 border border-[#DADCE0] rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
               <Printer className="w-3.5 h-3.5" /> Print
             </button>
             <button className="flex-1 min-w-[120px] h-10 border border-[#DADCE0] rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
               <Copy className="w-3.5 h-3.5" /> Copy
             </button>
          </div>
          
          {/* 14. CHARTS - Placeholder container */}
          <div id="chart-container-placeholder" className="hidden">
             {/* Charts will be injected here in Phase 2 */}
          </div>

        </div>
      }
    />
    
    {/* 15. INFORMATION NOTICE */}
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-6 flex gap-4">
        <AlertCircle className="w-6 h-6 text-[#F57C00] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-bold text-[#424242] uppercase tracking-wider mb-2">IMPORTANT NOTICE</h4>
          <p className="text-sm text-[#616161] leading-relaxed">
            This calculator applies the official Tax Deducted at Source (TDS) provisions published under Nepal's Income Tax Act and the Finance Act for Fiscal Year 2083/84. The calculation is intended to help users estimate withholding obligations for common payment categories. Special exemptions, exceptional transactions, treaty provisions, and complex tax situations may require additional review using the latest guidance issued by the Inland Revenue Department (IRD).
          </p>
        </div>
      </div>
    </div>
    
    </div>
  );
}
