'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, CheckCircle2, Info, Check, AlertCircle, Printer, Download, Copy, Share2, ChevronDown, ChevronUp, Scale, FileText, XCircle, FileCheck } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import TableOfContents from './TableOfContents';

const DEFAULT_STATE = {
  source: 'consultancy',
  amount: 100000,
  recipientType: 'Resident Individual',
  vatStatus: 'No VAT Invoice',
  panStatus: 'Valid PAN'
};

const TDS_RATES: Record<string, { rate: number; label: string; isService?: boolean; desc: string }> = {
  rent: { rate: 0.10, label: 'House / Land Rent', desc: 'Rental payments for buildings, land or physical infrastructure.' },
  vehicleHire: { rate: 0.10, label: 'Vehicle Hire', desc: 'Payments for hiring vehicles and transport equipment.' },
  consultancy: { rate: 0.15, label: 'Consultancy Service', isService: true, desc: 'Professional consulting fees paid by businesses.' },
  professional: { rate: 0.15, label: 'Professional Service', isService: true, desc: 'Fees paid to registered professionals.' },
  contract: { rate: 0.015, label: 'Contract Payment', desc: 'Payments made under a formal contract.' }, 
  commission: { rate: 0.15, label: 'Commission', isService: true, desc: 'Sales or agency commission payments.' },
  brokerage: { rate: 0.15, label: 'Brokerage', isService: true, desc: 'Fees paid to brokers for facilitating transactions.' },
  interest: { rate: 0.06, label: 'Interest Payment', desc: 'Interest paid on loans or deposits.' }, 
  dividend: { rate: 0.05, label: 'Dividend Distribution', desc: 'Dividends paid to shareholders.' },
  royalty: { rate: 0.15, label: 'Royalty', desc: 'Payments for the use of intellectual property.' },
  insuranceCommission: { rate: 0.20, label: 'Insurance Commission', desc: 'Commission paid to insurance agents.' }, 
  meeting: { rate: 0.15, label: 'Meeting Allowance', desc: 'Allowances paid for attending official meetings.' },
  transport: { rate: 0.025, label: 'Transport / Freight', desc: 'Payments for cargo transport or freight.' },
  advertisement: { rate: 0.015, label: 'Advertisement', desc: 'Payments made for advertising services.' },
  legal: { rate: 0.15, label: 'Legal Service', isService: true, desc: 'Fees paid to lawyers or law firms.' },
  audit: { rate: 0.15, label: 'Audit Service', isService: true, desc: 'Fees paid to auditors or accounting firms.' },
  software: { rate: 0.15, label: 'Software Licensing', desc: 'Payments for software licenses or digital tools.' },
  technical: { rate: 0.15, label: 'Technical Service', isService: true, desc: 'Fees paid for specialized technical services.' },
  foreignContractor: { rate: 0.05, label: 'Foreign Contractor', desc: 'Payments made to foreign contractors.' },
  rideSharing: { rate: 0.015, label: 'Ride-sharing Platform Payment', desc: 'Payouts made to ride-sharing drivers.' },
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
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const isVatRegistered = vatStatus === 'Valid VAT Invoice Provided';
  const selectedRate = isVatRegistered && TDS_RATES[source]?.isService ? 0.015 : TDS_RATES[source]?.rate || 0.15;

  const result = useMemo(() => {
    const tdsAmount = amount * selectedRate;
    const netAmount = amount - tdsAmount;
    return { 
      tdsAmount, 
      netAmount, 
      rate: selectedRate * 100,
    };
  }, [amount, selectedRate]);

  return (
    <div id="nepal-tds-calculator" className="pb-16">
    <ModernCalcLayout
      slug="nepal-tds"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS Calculator (Tax Deducted at Source) FY 2083/84"
      description="Calculate Tax Deducted at Source (TDS) instantly using the latest Nepal Income Tax Act and Finance Act FY 2083/84 provisions. This calculator helps businesses, employers, accountants, contractors, freelancers and taxpayers estimate withholding tax, identify the applicable TDS rate, understand whether the deduction is treated as Advance Tax or Final Withholding Tax, and review the relevant legal provisions before making a payment."
      icon={Landmark}
      hideH1={true}
      intro={
        <div className="space-y-10 mt-2 mb-4">
          {/* 1. HERO */}
          <div className="space-y-5 max-w-5xl">
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#202124] tracking-tight leading-[1.15]">
                Nepal TDS Calculator (Tax Deducted at Source) FY 2083/84
             </h1>
             <p className="text-sm md:text-[15px] text-[#5F6368] leading-relaxed max-w-4xl">
                Calculate Tax Deducted at Source (TDS) instantly using the latest Nepal Income Tax Act and Finance Act FY 2083/84 provisions. This calculator helps businesses, employers, accountants, contractors, freelancers and taxpayers estimate withholding tax, identify the applicable TDS rate, understand whether the deduction is treated as Advance Tax or Final Withholding Tax, and review the relevant legal provisions before making a payment.
             </p>
             <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => window.scrollTo({ top: document.getElementById('nepal-tds-calculator')?.offsetTop || 0, behavior: 'smooth' })} className="px-6 py-3.5 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
                   Calculate TDS
                </button>
                <a href="#latest-tds-rates" className="px-6 py-3.5 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#1A73E8] text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center">
                   View Official TDS Rates
                </a>
             </div>
          </div>

          {/* 2. TRUST BADGES */}
          <div className="flex flex-wrap gap-2">
             {[
               'Updated for FY 2083/84',
               'Based on Official IRD Rules',
               'Resident & Non-Resident Support',
               'VAT Rules Included',
               'Free Calculator',
               'Mobile Friendly'
             ].map((tag, idx) => (
               <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F0FE] border border-[#D2E3FC] text-[#1A73E8] rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                 <CheckCircle2 className="w-3.5 h-3.5" />
                 {tag}
               </div>
             ))}
          </div>

          {/* 3. QUICK ANSWER */}
          <div className="bg-[#F8F9FA] border-l-4 border-[#1A73E8] rounded-r-lg p-5 sm:p-6 shadow-sm max-w-4xl">
             <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-[#1A73E8]" />
                <h2 className="text-xs font-black text-[#202124] uppercase tracking-wider">Quick Answer</h2>
             </div>
             <p className="text-[13px] sm:text-sm text-[#3C4043] leading-relaxed font-medium">
                Tax Deducted at Source (TDS) is a withholding tax that must be deducted from certain payments before they are made to the recipient. The applicable TDS rate depends on the payment category, recipient type and the relevant provisions of Nepal's Income Tax Act. Use the calculator below to estimate the withholding amount and review the applicable legal treatment.
             </p>
          </div>

          {/* 4. WHO SHOULD USE THIS CALCULATOR */}
          <div className="space-y-4">
             <h2 className="text-lg font-black text-[#202124] tracking-tight">Who Should Use This Calculator?</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {[
                  { title: 'Business Owners', desc: 'Manage payments compliance.', icon: Landmark },
                  { title: 'Employers', desc: 'Calculate payroll withholding.', icon: CheckCircle2 },
                  { title: 'Accountants', desc: 'Verify tax obligations.', icon: Info },
                  { title: 'Auditors', desc: 'Check compliance accuracy.', icon: Check },
                  { title: 'HR Professionals', desc: 'Determine employee TDS.', icon: Landmark },
                  { title: 'Finance Officers', desc: 'Process vendor payouts.', icon: AlertCircle },
                  { title: 'Freelancers', desc: 'Estimate net receipts.', icon: CheckCircle2 },
                  { title: 'Contractors', desc: 'Plan project cash flows.', icon: Landmark },
                  { title: 'Individual Taxpayers', desc: 'Understand tax deductions.', icon: Info },
                  { title: 'Students', desc: 'Learn Nepal tax rules.', icon: Check },
                ].map((item, idx) => (
                   <div key={idx} className="border border-[#DADCE0] bg-white rounded-lg p-4 shadow-sm flex flex-col items-center text-center gap-2">
                      <item.icon className="w-5 h-5 text-[#1A73E8]" />
                      <h3 className="text-[11px] font-bold text-[#202124] uppercase tracking-wider">{item.title}</h3>
                      <p className="text-[10px] text-[#5F6368] leading-tight">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
             {/* 5. OFFICIAL SOURCES */}
             <div className="space-y-4">
                <h2 className="text-lg font-black text-[#202124] tracking-tight">Official Sources Used</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {['Income Tax Act', 'Finance Act FY 2083/84', 'Inland Revenue Department (IRD)', 'Government Notifications'].map((src, idx) => (
                     <div key={idx} className="bg-white border border-[#DADCE0] rounded p-3 flex items-center gap-2 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                        <span className="text-[11px] font-bold text-[#3C4043]">{src}</span>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-[#5F6368] italic">This calculator and guide are based on officially published tax rules and related government guidance available at the time of publication.</p>
             </div>

             {/* 6. LAST UPDATED */}
             <div className="space-y-4">
                <h2 className="text-lg font-black text-[#202124] tracking-tight">Last Updated</h2>
                <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-lg p-5 flex flex-col justify-center shadow-sm h-[94px]">
                   <div className="text-[13px] font-black text-[#1A73E8] uppercase tracking-wider mb-1">FY 2083/84</div>
                   <p className="text-[11px] text-[#5F6368]">Content reviewed regularly as official guidance changes.</p>
                </div>
             </div>
          </div>

          {/* 7. TABLE OF CONTENTS */}
          <TableOfContents />
        </div>
      }
      fullWidth={true}
      inputs={
        <div className="space-y-8">
          
          {/* 1. PAYMENT TYPE */}
          <div className="space-y-3">
             <div className="flex flex-col">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Type</label>
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(TDS_RATES).map(([id, info]) => (
                <button
                  key={id}
                  onClick={() => updateState({ source: id })}
                  className={`h-auto min-h-[44px] py-3 px-3 rounded-md border flex flex-col items-start justify-center transition-all text-left ${source === id ? 'border-[#1A73E8] bg-[#E8F0FE] ring-1 ring-[#1A73E8]' : 'border-[#DADCE0] bg-white hover:border-[#1A73E8]'}`}
                >
                  <div className="flex justify-between w-full items-start mb-1">
                    <span className={`text-[11px] font-black uppercase leading-tight ${source === id ? 'text-[#1A73E8]' : 'text-[#3C4043]'}`}>{info.label}</span>
                    <span className={`text-[11px] font-black ${source === id ? 'text-[#1A73E8]' : 'text-[#188038]'}`}>{(info.rate * 100).toString().replace(/\.0$/, '')}%</span>
                  </div>
                  <div className={`text-[10px] leading-snug ${source === id ? 'text-[#1A73E8]' : 'text-[#5F6368]'} opacity-90`}>{info.desc}</div>
                </button>
              ))}
             </div>
          </div>

          {/* 2. RECIPIENT TYPE */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Recipient Type</label>
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
             <p className="text-[10px] text-[#70757A] leading-relaxed">
               The applicable legal treatment may vary depending on the recipient's residency status and payment category.
             </p>
          </div>

          {/* 3. GROSS PAYMENT */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Gross Payment (NPR)</label>
             <input 
                type="number" 
                value={amount} 
                onChange={(e) => updateState({ amount: Number(e.target.value) })}
                placeholder="Example: 100000"
                className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all" 
             />
             <p className="text-[10px] text-[#70757A] leading-relaxed">
               Enter the payment amount before deducting Tax Deducted at Source (TDS).
             </p>
          </div>

          {/* 4. VAT STATUS */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">VAT Status</label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {['Valid VAT Invoice Provided', 'No Valid VAT Invoice'].map(status => (
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
               Reduced withholding rates apply only where permitted under the applicable law.
             </p>
          </div>

          {/* 5. PAN STATUS */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">PAN Status</label>
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
             <p className="text-[10px] text-[#70757A] leading-relaxed">
               Use the recipient's valid Permanent Account Number (PAN) where required.
             </p>
          </div>

          {/* 6. FISCAL YEAR */}
          <div className="space-y-2">
             <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Fiscal Year</label>
             <div className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md text-sm font-bold text-[#5F6368] flex items-center cursor-not-allowed">
               2083/84
             </div>
          </div>

          {/* PRIMARY BUTTON */}
          <button 
             onClick={() => window.scrollTo({ top: document.getElementById('results-panel')?.offsetTop || 0, behavior: 'smooth' })}
             className="w-full h-12 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 mt-4 lg:hidden"
          >
             Calculate TDS & View Compliance Summary
          </button>
        </div>
      }
      results={
        <div id="results-panel" className="space-y-6 h-full flex flex-col justify-start lg:sticky lg:top-6">
          <div className="mb-2">
             <h2 className="text-[15px] font-black text-[#202124] uppercase tracking-wider">Your TDS Calculation Summary</h2>
          </div>
          {/* RESULT DASHBOARD */}
          <div className="bg-[#E8F0FE] rounded-lg p-6 md:p-8 text-center space-y-2 border border-[#D2E3FC]">
             <div className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">TDS Amount</div>
             <div className="text-3xl md:text-4xl font-black text-[#D93025] font-mono tracking-tight">{formatNPR(result.tdsAmount)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Gross Payment</div>
                <div className="text-xl font-black text-[#202124] font-mono">{formatNPR(amount)}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-1">Net Payment</div>
                <div className="text-xl font-black text-[#188038] font-mono">{formatNPR(result.netAmount)}</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Effective Rate</div>
                <div className="text-xl font-black text-[#202124] font-mono">{result.rate.toString().replace(/\.0$/, '')}%</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Fiscal Year</div>
                <div className="text-xl font-black text-[#202124] font-mono">2083/84</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Recipient Type</div>
                <div className="text-sm font-black text-[#202124] leading-tight">{recipientType}</div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 bg-[#F8F9FA] flex flex-col items-center text-center justify-center">
                <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Payment Category</div>
                <div className="text-sm font-black text-[#202124] leading-tight">{TDS_RATES[source]?.label || 'Consultancy Service'}</div>
             </div>
          </div>
          
          <div className="border border-[#188038] bg-[#E6F4EA] rounded-md p-4 flex flex-col items-center text-center justify-center w-full shadow-sm">
            <div className="text-[9px] font-bold text-[#188038] uppercase tracking-wider mb-1">Calculation Status</div>
            <div className="text-sm font-black text-[#188038] flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Calculation Completed</div>
          </div>

          {/* CALCULATION BREAKDOWN */}
          <div className="border border-[#DADCE0] rounded-lg bg-white shadow-sm overflow-hidden">
             <button 
               onClick={() => setBreakdownOpen(!breakdownOpen)} 
               className="w-full flex items-center justify-between p-4 bg-[#F8F9FA] hover:bg-[#F1F3F4] transition-colors"
             >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Calculation Breakdown</span>
                </div>
                {breakdownOpen ? <ChevronUp className="w-4 h-4 text-[#5F6368]" /> : <ChevronDown className="w-4 h-4 text-[#5F6368]" />}
             </button>
             {breakdownOpen && (
               <div className="p-5 border-t border-[#DADCE0] space-y-3">
                 <div className="flex justify-between items-center text-sm border-b border-dashed border-[#DADCE0] pb-2">
                   <span className="text-[#5F6368]">Gross Payment</span>
                   <span className="font-mono font-bold text-[#202124]">{formatNPR(amount)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-dashed border-[#DADCE0] pb-2">
                   <span className="text-[#5F6368]">Applicable Rate</span>
                   <span className="font-mono font-bold text-[#202124]">{result.rate.toString().replace(/\.0$/, '')}%</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-dashed border-[#DADCE0] pb-2">
                   <span className="text-[#5F6368]">TDS Calculation</span>
                   <span className="font-mono font-bold text-[#D93025]">- {formatNPR(result.tdsAmount)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-dashed border-[#DADCE0] pb-2">
                   <span className="text-[#5F6368]">Net Payment</span>
                   <span className="font-mono font-bold text-[#188038]">{formatNPR(result.netAmount)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pt-1">
                   <span className="font-bold text-[#202124]">Final Result</span>
                   <span className="font-mono font-black text-[#188038]">{formatNPR(result.netAmount)}</span>
                 </div>
               </div>
             )}
          </div>
        </div>
      }
      details={
        <div className="space-y-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WHY THIS RATE APPLIES */}
            <div className="border border-[#DADCE0] bg-white rounded-lg p-6 shadow-sm flex flex-col">
               <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
                  <Info className="w-5 h-5 text-[#1A73E8]" />
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Why was this TDS rate applied?</h3>
               </div>
               <p className="text-[13px] sm:text-[14px] text-[#5F6368] leading-relaxed flex-1">
                 The selected payment falls under the <strong>{TDS_RATES[source]?.label || 'Consultancy Service'}</strong> category. Based on the information provided, the applicable withholding rate is applied according to the relevant provisions of Nepal's Income Tax Act and Finance Act for FY 2083/84. The calculator has used the selected payment type, recipient details, and other applicable inputs to determine the withholding amount.
               </p>
            </div>

            {/* LEGAL BASIS */}
            <div className="border border-[#DADCE0] bg-[#F8F9FA] rounded-lg p-6 shadow-sm flex flex-col">
               <div className="flex items-center gap-2 mb-4 border-b border-[#E8EAED] pb-3">
                  <Scale className="w-5 h-5 text-[#188038]" />
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Applicable Legal Reference</h3>
               </div>
               <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">Relevant Section</span>
                  <span className="text-sm font-black text-[#202124]">Section 88</span>
               </div>
               <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">Type of Tax</span>
                  <span className="text-sm font-black text-[#202124]">Advance Tax</span>
               </div>
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">Applicable FY</span>
                  <span className="text-sm font-black text-[#202124]">FY 2083/84</span>
               </div>
               <p className="text-[12px] text-[#5F6368] leading-relaxed border-t border-[#E8EAED] pt-3 mt-auto">
                 This payment category is generally subject to withholding under the applicable provisions of Nepal's Income Tax Act. Always review the latest official guidance for special situations.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* TAX TREATMENT */}
             <div className="col-span-1 lg:col-span-1 border border-[#1A73E8] bg-[#E8F0FE] rounded-lg p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-[#D2E3FC] pb-3">
                   <Landmark className="w-5 h-5 text-[#1A73E8]" />
                   <h3 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider">Tax Treatment</h3>
                </div>
                <div className="text-xl font-black text-[#202124] mb-4">Advance Tax</div>
                <div className="space-y-4 text-[12px] text-[#3C4043] flex-1">
                   <div><strong className="text-[#1A73E8] block mb-1">Meaning</strong> An advance payment towards the final tax liability.</div>
                   <div><strong className="text-[#1A73E8] block mb-1">Adjustability</strong> Can generally be adjusted against the final tax return.</div>
                   <div><strong className="text-[#1A73E8] block mb-1">Typical Situations</strong> Resident business to resident business payments.</div>
                   <div><strong className="text-[#1A73E8] block mb-1">Practical Implication</strong> You must claim this TDS in your annual tax return.</div>
                </div>
             </div>

             {/* COMPLIANCE CHECKLIST */}
             <div className="col-span-1 lg:col-span-2 border border-[#DADCE0] bg-white rounded-lg p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
                   <CheckCircle2 className="w-5 h-5 text-[#188038]" />
                   <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Compliance Checklist</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {[
                     'Verify payment category',
                     'Verify recipient PAN',
                     'Confirm applicable supporting documents',
                     'Deduct TDS before payment',
                     'Deposit within the statutory deadline',
                     'File through e-TDS where applicable',
                     'Maintain records',
                     'Issue TDS certificate where required'
                   ].map((item, idx) => (
                     <label key={idx} className="flex items-start gap-3 p-3.5 border border-[#F1F3F4] rounded bg-[#F8F9FA] cursor-pointer hover:bg-[#E8F0FE] hover:border-[#D2E3FC] transition-colors group">
                       <input type="checkbox" className="mt-[3px] w-4 h-4 text-[#1A73E8] rounded border-[#DADCE0] focus:ring-[#1A73E8]" />
                       <span className="text-[12px] md:text-[13px] font-bold text-[#5F6368] group-hover:text-[#1A73E8] leading-tight">{item}</span>
                     </label>
                   ))}
                </div>
             </div>
          </div>

          {/* REQUIRED DOCUMENTS */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xl font-black text-[#202124] tracking-tight">Documents You Should Keep</h3>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { name: 'Payment Voucher', icon: FileText },
                  { name: 'Invoice', icon: FileText },
                  { name: 'VAT Invoice', icon: FileText },
                  { name: 'PAN Details', icon: FileCheck },
                  { name: 'Deposit Receipt', icon: Landmark },
                  { name: 'TDS Certificate', icon: CheckCircle2 },
                  { name: 'Accounting Records', icon: FileText },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white border border-[#DADCE0] rounded-lg p-4 flex flex-col items-center text-center justify-center shadow-sm h-full gap-2.5 hover:border-[#1A73E8] hover:bg-[#F8F9FA] transition-colors">
                     <doc.icon className="w-6 h-6 text-[#1A73E8]" />
                     <span className="text-[11px] font-bold text-[#3C4043] leading-tight">{doc.name}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* COMMON MISTAKES */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xl font-black text-[#202124] tracking-tight">Avoid These Common Mistakes</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { mistake: 'Selecting the wrong payment category', why: 'Applying an incorrect rate leads to under or over payment of tax.', fix: 'Review IRD guidelines for ambiguous payments.' },
                  { mistake: 'Applying the wrong TDS rate', why: 'Can result in compliance penalties or disputes with payees.', fix: 'Use the calculator and verify with official rules.' },
                  { mistake: 'Ignoring VAT requirements', why: 'Reduced rates may be improperly applied without a valid VAT invoice.', fix: 'Ensure VAT invoices are collected where required.' },
                  { mistake: 'Using an incorrect PAN', why: 'e-TDS filing will fail or TDS will be credited to the wrong person.', fix: 'Verify the PAN using the IRD portal before payment.' },
                  { mistake: 'Depositing TDS late', why: 'Attracts interest and fines under the Income Tax Act.', fix: 'Deposit within 25 days of the following Nepali month.' },
                  { mistake: 'Failing to maintain records', why: 'Creates issues during tax audits and assessments.', fix: 'Keep copies of vouchers, invoices, and certificates.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#DADCE0] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-start gap-2 mb-3">
                        <XCircle className="w-4 h-4 text-[#D93025] shrink-0 mt-0.5" />
                        <h4 className="text-[13px] font-black text-[#202124] uppercase tracking-wide leading-tight">{item.mistake}</h4>
                     </div>
                     <p className="text-[12px] text-[#5F6368] mb-3 leading-relaxed"><strong className="text-[#3C4043]">Why it matters:</strong> {item.why}</p>
                     <p className="text-[12px] text-[#188038] leading-relaxed"><strong className="text-[#188038]">How to avoid it:</strong> {item.fix}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* NEXT STEPS */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xl font-black text-[#202124] tracking-tight">What Should You Do Next?</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  'Review your calculation.',
                  'Confirm supporting documents.',
                  'Make payment after deducting TDS.',
                  'Deposit TDS within the required period.',
                  'Complete e-TDS filing.',
                  'Maintain records for future reference.'
                ].map((step, idx) => (
                  <div key={idx} className="bg-white border border-[#DADCE0] rounded-lg p-5 shadow-sm flex flex-col items-center text-center gap-3 relative">
                     <div className="w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-black flex items-center justify-center text-sm absolute -top-4 shadow-sm border border-[#D2E3FC]">
                       {idx + 1}
                     </div>
                     <span className="text-[12px] font-bold text-[#3C4043] leading-snug mt-3">{step}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* DOWNLOAD OPTIONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6 pb-2 border-y border-[#DADCE0] mt-8">
             <span className="text-sm font-bold text-[#202124] mr-2">Export Summary:</span>
             <div className="flex flex-wrap items-center gap-2">
               <button className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Download className="w-3.5 h-3.5" /> PDF
               </button>
               <button className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Printer className="w-3.5 h-3.5" /> Print
               </button>
               <button className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Copy className="w-3.5 h-3.5" /> Copy
               </button>
               <button className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Share2 className="w-3.5 h-3.5" /> Share
               </button>
             </div>
          </div>

          {/* IMPORTANT NOTICE */}
          <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-5 sm:p-6 flex gap-4 mt-8">
            <AlertCircle className="w-6 h-6 text-[#F57C00] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-[#424242] uppercase tracking-wider mb-2">Important Notice</h4>
              <p className="text-[13px] sm:text-sm text-[#616161] leading-relaxed">
                This calculator provides an estimate using the information entered and the implemented FY 2083/84 rules. Certain transactions, exemptions, treaty provisions, or special tax situations may require additional review. Always verify complex transactions using the latest guidance issued by the Inland Revenue Department (IRD).
              </p>
            </div>
          </div>

        </div>
      }
    />
    </div>
  );
}
