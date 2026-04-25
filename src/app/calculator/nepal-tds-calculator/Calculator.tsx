'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, FileText, CheckCircle2, Info, Receipt } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

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

export default function NepalTdsCalculator() {
  const [state, setState] = useSyncState('nepal_tds_v2', DEFAULT_STATE);
  const { source, amount, isVatRegistered } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const selectedRate = isVatRegistered && TDS_RATES[source]?.isService ? 0.015 : TDS_RATES[source]?.rate || 0.15;

  const result = useMemo(() => {
    const tdsAmount = amount * selectedRate;
    const netAmount = amount - tdsAmount;
    return { tdsAmount, netAmount, rate: selectedRate * 100 };
  }, [amount, selectedRate]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'TDS Calculator' }]}
      title="Nepal TDS Calculator"
      description="Calculate Tax Deducted at Source (TDS) as per Nepal's Income Tax Act 2058."
      icon={Landmark}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Payment Category</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(TDS_RATES).map(([id, info]) => (
                <button
                  key={id}
                  onClick={() => updateState({ source: id })}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-left ${
                    source === id 
                      ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' 
                      : 'bg-white border-[#DADCE0] text-[#3C4043] hover:border-[#1A73E8]'
                  }`}
                >
                  <span className="text-[13px] font-bold">{info.label}</span>
                  <span className={`text-[10px] font-black ${source === id ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>
                      {(info.rate * 100).toFixed(1)}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Gross Payment Amount</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount} 
                onChange={e => updateState({ amount: Number(e.target.value) })} 
                className={inputCls} 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70757A]">NPR</span>
            </div>
          </div>

          {TDS_RATES[source]?.isService && (
            <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
              <input 
                type="checkbox" 
                id="vat-reg" 
                checked={isVatRegistered}
                onChange={(e) => updateState({ isVatRegistered: e.target.checked })}
                className="w-4 h-4 rounded border-[#DADCE0] text-[#1A73E8] focus:ring-[#1A73E8]"
              />
              <label htmlFor="vat-reg" className="text-sm font-medium text-[#3C4043] cursor-pointer">
                Receiver is VAT Registered (1.5% TDS)
              </label>
            </div>
          )}

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate TDS
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-center space-y-1">
              <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider">TDS Amount</div>
              <div className="text-3xl font-black text-[#D93025]">NPR {result.tdsAmount.toLocaleString()}</div>
            </div>
            
            <div className="p-6 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg text-center space-y-1">
              <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider">Net Payable</div>
              <div className="text-3xl font-black text-[#188038]">NPR {result.netAmount.toLocaleString()}</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3">
             <div className="flex items-center gap-2 mb-1">
               <Receipt className="w-4 h-4 text-[#1A73E8]" />
               <span className="text-[11px] font-bold text-[#202124] uppercase">Summary</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-[#5F6368]">Rate Applied</span>
               <span className="font-bold text-[#202124]">{result.rate}%</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-[#5F6368]">Base Amount</span>
               <span className="font-bold text-[#202124]">NPR {amount.toLocaleString()}</span>
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg">
            <Info className="w-4 h-4 text-[#F29900] shrink-0" />
            <p className="text-[10px] text-[#202124] leading-tight">Deposit this amount to IRD within 25 days of the next month.</p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Precision Tax Deducted at Source (TDS) Analytics</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Compliance with the Inland Revenue Department (IRD) requires exact withholding tax calculations on all corporate and institutional payments. Our <strong className="text-[#202124]">tds calculator nepal</strong> is engineered to parse the latest <strong className="text-[#202124]">tds rate in nepal</strong> schedules set by the Income Tax Act 2058. It mathematically computes the exact withholding amount before disbursing net payments to vendors, landlords, and consultants.
              </p>
              <p>
                The platform dynamically adjusts to piecewise regulatory logic. For example, when calculating <strong className="text-[#202124]">rent tds nepal</strong>, the system applies a strict 10% multiplier. However, for professional services, the engine branches its logic based on the recipient's tax status, enforcing a 1.5% rate for VAT-registered firms while defaulting to 15% for non-registered entities.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Category-Specific Rate Matrix (FY 2081/82)</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Professional Services:</strong> Standard <strong className="text-[#202124]">consultancy tds nepal</strong> is fixed at 15%. This rate must be withheld by the paying institution unless the consultant presents a valid VAT registration, which dramatically reduces the withholding requirement to 1.5%.</li>
              <li><strong className="text-[#188038]">Investment Yields:</strong> When executing a <strong className="text-[#202124]">dividend tds nepal 2081</strong> calculation, the algorithm applies a flat 5% final withholding tax. This signifies that the recipient has no further income tax liability on that specific dividend payout.</li>
              <li><strong className="text-[#D93025]">Gross Evaluation:</strong> A critical accounting rule enforced by this engine is that TDS is strictly calculated on the <span className="italic">Gross Amount excluding VAT</span>. The calculator assumes the input amount is the pure base price before any secondary taxes are added.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the type of payment you are making (Rent, Consultancy, Dividend, etc.)",
          "Enter the total gross amount before any tax deduction.",
          "If the payment is for a service and the receiver is VAT registered, check the VAT box for a reduced rate of 1.5%.",
          "Deduct the 'TDS Amount' from your payment and pay the 'Net Payable' to the party."
        ]
      }}
      formula={{
        title: "TDS Calculation Rule",
        description: "TDS is calculated on the gross amount before VAT. The rate is determined by the nature of payment defined by IRD Nepal.",
        raw: "TDS Amount = Gross Amount × Applicable TDS Rate\nNet Payment = Gross Amount - TDS Amount"
      }}
      faqs={[
        {
          question: "When should I use 1.5% TDS for services?",
          answer: "As per the latest Nepal budget and IRD guidelines, services provided by a VAT-registered person/firm are subject to a reduced 1.5% TDS instead of the standard 15%."
        },
        {
          question: "What is the TDS rate for house rent in Nepal?",
          answer: "The current TDS rate for house and land rent is 10% for both individuals and businesses."
        },
        {
          question: "How do I deposit TDS in Nepal?",
          answer: "You can deposit TDS through the IRD's online portal (Taxpayer Portal) by generating a Voucher (E-TDS) and paying through banks or ConnectIPS."
        }
      ]}
      sidebar={{
        title: "Nepal Tax Tools",
        links: [
          { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax" },
          { label: "VAT Calculator", href: "/calculator/nepal-vat" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary" },
          { label: "Vehicle Tax Nepal", href: "/calculator/nepal-vehicle-tax" },
        ],
        banner: {
          title: "Stay Tax Compliant",
          description: "Follow IRD Nepal's latest guidelines to avoid penalties and late fees on your payments.",
          image: "/images/nepal-tax-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat" }
      ]}
    />
  );
}
