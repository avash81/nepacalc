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
      slug="nepal-tds"
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
            <p className="text-sm text-[#5F6368] mb-4">The withholding rate is entirely dependent on the nature of the transaction. Accurately classifying the payment is critical to avoid IRD penalties during annual audits.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Professional Services:</strong> Standard <strong className="text-[#202124]">consultancy tds nepal</strong> is fixed at 15%. This rate must be withheld by the paying institution unless the consultant presents a valid VAT registration, which dramatically reduces the withholding requirement to 1.5%.</li>
              <li><strong className="text-[#1A73E8]">Investment Yields:</strong> When executing a <strong className="text-[#202124]">dividend tds nepal 2081</strong> calculation, the algorithm applies a flat 5% final withholding tax. This signifies that the recipient has no further income tax liability on that specific dividend payout.</li>
              <li><strong className="text-[#1A73E8]">Rent (House & Land):</strong> Rental payments made by businesses to landlords are subject to a 10% TDS. It is important to note that individuals paying rent for personal residential use do not need to withhold this tax.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">TDS Thresholds and Exemption Limits</h3>
            <p className="text-sm text-[#5F6368] mb-4">Not all transactions require withholding. The IRD specifies minimum thresholds to ease the accounting burden on micro-transactions.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">Contract Payments:</strong> If a payment for a contract or procurement is less than Rs. 50,000, TDS is generally not required to be withheld. However, if multiple payments to the same vendor exceed this threshold cumulatively over the fiscal year, TDS must be deducted.</li>
              <li><strong className="text-[#188038]">Final vs. Advance Withholding:</strong> Some TDS deductions (like the 5% on dividends or bank interest) are considered 'final.' You do not need to file a tax return declaring them. Conversely, the 1.5% or 15% withheld on consultancy is 'advance tax,' meaning the consultant must file a year-end return and can adjust the withheld amount against their final tax liability.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the specific category of your payment (e.g., Rent, Consultancy, Dividend, Commission). Selecting the wrong category will result in an inaccurate withholding rate.",
          "Enter the total Gross Payment Amount. This must be the base amount before any secondary taxes (like VAT) are added.",
          "If paying for a service (Consultancy, Commission, Brokerage), check if the receiving party is VAT Registered. If yes, toggle the checkbox to reduce the TDS rate from 15% to 1.5%.",
          "Deduct the 'TDS Amount' generated by the calculator from your payment.",
          "Disburse the 'Net Payable' amount to the receiving party and deposit the withheld TDS to the Inland Revenue Department (IRD) within 25 days."
        ]
      }}
      formula={{
        title: "TDS Mathematical Logic",
        description: "TDS is strictly calculated on the Gross Base Amount, excluding any Value Added Tax (VAT).",
        raw: "1. Identify Base Rate based on Income Tax Act 2058 Schedule 1.\n2. Apply VAT conditional modifier (if applicable to service).\n\nTDS Withheld = Gross Amount × Applicable Rate (%)\nNet Payment to Party = Gross Amount - TDS Withheld\n\nNote: If the party charges VAT, the final invoice total will be: (Gross Amount + 13% VAT) - TDS Withheld."
      }}
      faqs={[
        {
          question: "When should I use the 1.5% TDS rate instead of 15%?",
          answer: "As per the IRD guidelines, if you are paying for professional services, consultancy, or commissions to an individual or firm that is legally registered for Value Added Tax (VAT) and provides a VAT invoice, you must withhold only 1.5% TDS. If they only have a PAN (Personal Account Number), you must withhold 15%."
        },
        {
          question: "Is TDS calculated on the total bill amount including VAT?",
          answer: "No. TDS is always calculated strictly on the Gross Base Amount before the 13% VAT is added. For example, on a base bill of Rs. 100,000 with 13% VAT, the invoice total is Rs. 113,000. Your 1.5% TDS (Rs. 1,500) is calculated on the Rs. 100,000 base, not the 113,000."
        },
        {
          question: "What is the TDS rate for house rent in Nepal?",
          answer: "The current TDS rate for house and land rent is 10%. This applies when corporate entities or businesses pay rent to a landlord. Personal residential renters are not required to deduct TDS."
        },
        {
          question: "What happens if I forget to deduct TDS?",
          answer: "If you fail to deduct TDS or fail to deposit it to the IRD within 25 days of the following Nepalese month, the IRD will disallow that expense from your company's P&L statement during tax assessment. You will also be liable for a 15% per annum interest penalty on the un-withheld amount."
        },
        {
          question: "Do I need to deduct TDS for payments below Rs. 50,000?",
          answer: "Generally, for single procurement or contract payments below Rs. 50,000, TDS is not required. However, if you split invoices to intentionally stay below this limit, or if aggregate payments to the same vendor exceed the threshold in a fiscal year, TDS becomes mandatory."
        },
        {
          question: "How do I deposit the withheld TDS in Nepal?",
          answer: "You must deposit the withheld TDS through the IRD's online Taxpayer Portal. You generate a transaction voucher (E-TDS) specifying the PAN of the party you withheld from, and then pay the amount through connected banking channels like ConnectIPS or direct bank deposit."
        }
      ]}
      sidebar={{
        title: "Nepal Tax Tools",
        links: [
          { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" },
          { label: "VAT Calculator", href: "/calculator/nepal-vat/" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
          { label: "Vehicle Tax Nepal", href: "/calculator/nepal-vehicle-tax/" },
        ],
        banner: {
          title: "Stay Tax Compliant",
          description: "Follow IRD Nepal's latest guidelines to avoid massive penalties and late fees on your corporate payments.",
          image: "/images/nepal-tax-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "VAT Calculator", href: "/calculator/nepal-vat/" }
      ]}
    />
  );
}
