'use client';
import { useMemo, useState } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Landmark, CheckCircle2, Info, Check, AlertCircle, Printer, Download, Copy, Share2, ChevronDown, ChevronUp, Scale, FileText, XCircle, FileCheck } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import TableOfContents from './TableOfContents';

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#webpage",
      "url": "https://nepacalc.com/calculator/nepal-tds/",
      "name": "Nepal TDS Calculator 2083/84 | Official IRD TDS Rates & Tax Deducted at Source Guide",
      "headline": "Nepal TDS Calculator 2083/84",
      "description": "Calculate Nepal Tax Deducted at Source (TDS) instantly using official FY 2083/84 withholding tax rates. Covers rent, consultancy, contracts, commission, dividend, interest, royalty, insurance commission, examples, legal guidance, compliance and FAQs.",
      "inLanguage": "en-NP",
      "isPartOf": {
        "@id": "https://nepacalc.com/#website"
      },
      "about": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#article"
      },
      "breadcrumb": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#primaryimage"
      },
      "datePublished": "2026-01-01",
      "dateModified": "2026-07-25"
    },
    {
      "@type": "ImageObject",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#primaryimage",
      "url": "https://nepacalc.com/images/calculators/nepal-tds-calculator.webp",
      "contentUrl": "https://nepacalc.com/images/calculators/nepal-tds-calculator.webp",
      "width": 1200,
      "height": 630,
      "caption": "Nepal TDS Calculator FY 2083/84"
    },
    {
      "@type": "Article",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#article",
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#webpage"
      },
      "headline": "Nepal TDS Calculator 2083/84 | Official IRD TDS Rates & Tax Deducted at Source Guide",
      "alternativeHeadline": "Official Nepal TDS Guide FY 2083/84",
      "description": "Complete Nepal Tax Deducted at Source (TDS) guide covering official FY 2083/84 withholding rates, payment categories, legal references, examples, compliance requirements, FAQs and an interactive TDS calculator.",
      "image": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#primaryimage"
      },
      "author": {
        "@id": "https://nepacalc.com/#organization"
      },
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "datePublished": "2026-01-01",
      "dateModified": "2026-07-25",
      "inLanguage": "en-NP",
      "articleSection": [
        "Tax Calculator",
        "Income Tax",
        "Tax Deducted at Source",
        "Nepal Tax Guide",
        "Finance"
      ],
      "keywords": [
        "Nepal TDS Calculator",
        "TDS Calculator Nepal",
        "Tax Deducted at Source Nepal",
        "IRD TDS Rates",
        "Withholding Tax Nepal",
        "TDS on Rent Nepal",
        "TDS on Consultancy Nepal",
        "Dividend TDS Nepal",
        "Interest TDS Nepal",
        "Nepal Finance Act 2083/84"
      ],
      "about": [
        {
          "@type": "Thing",
          "name": "Tax Deducted at Source"
        },
        {
          "@type": "Thing",
          "name": "Income Tax Act Nepal"
        },
        {
          "@type": "Thing",
          "name": "Inland Revenue Department"
        },
        {
          "@type": "Thing",
          "name": "Withholding Tax"
        }
      ],
      "mentions": [
        {
          "@type": "Thing",
          "name": "Rent"
        },
        {
          "@type": "Thing",
          "name": "Consultancy"
        },
        {
          "@type": "Thing",
          "name": "Contract Payments"
        },
        {
          "@type": "Thing",
          "name": "Dividend"
        },
        {
          "@type": "Thing",
          "name": "Interest"
        },
        {
          "@type": "Thing",
          "name": "Royalty"
        },
        {
          "@type": "Thing",
          "name": "Insurance Commission"
        },
        {
          "@type": "Thing",
          "name": "Commission"
        }
      ],
      "isAccessibleForFree": true
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nepacalc.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://nepacalc.com/calculator/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Finance Calculators",
          "item": "https://nepacalc.com/directory/finance/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Nepal TDS Calculator",
          "item": "https://nepacalc.com/calculator/nepal-tds/"
        }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#webapplication",
      "name": "Nepal TDS Calculator",
      "alternateName": "Nepal Tax Deducted at Source Calculator",
      "url": "https://nepacalc.com/calculator/nepal-tds/",
      "applicationCategory": "FinanceApplication",
      "applicationSubCategory": "Tax Calculator",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Works in all modern browsers.",
      "inLanguage": "en-NP",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "NPR"
      },
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#webpage"
      },
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "image": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#primaryimage"
      },
      "description": "Calculate Nepal Tax Deducted at Source (TDS) using official FY 2083/84 withholding tax rates. Supports rent, consultancy, contracts, commission, brokerage, dividend, interest, royalty, insurance commission, meeting allowance and other supported payment categories with instant calculation and compliance guidance.",
      "featureList": [
        "Official FY 2083/84 TDS Rates",
        "Instant TDS Calculation",
        "Net Payment Calculation",
        "Effective TDS Rate",
        "Resident and Non-Resident Guidance",
        "VAT Rule Support",
        "Worked Examples",
        "Industry Guide",
        "Compliance Guide",
        "Penalty Information",
        "Official Payment Category Directory",
        "Frequently Asked Questions"
      ],
      "softwareVersion": "2083.84",
      "about": [
        {
          "@type": "Thing",
          "name": "Tax Deducted at Source"
        },
        {
          "@type": "Thing",
          "name": "Withholding Tax"
        },
        {
          "@type": "Thing",
          "name": "Income Tax"
        },
        {
          "@type": "Thing",
          "name": "Finance Act FY 2083/84"
        },
        {
          "@type": "Thing",
          "name": "Inland Revenue Department"
        }
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": [
          "Employers",
          "Accountants",
          "Auditors",
          "Businesses",
          "Tax Professionals",
          "Contractors",
          "Consultants",
          "Government Offices",
          "NGOs",
          "Financial Institutions"
        ]
      },
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://nepacalc.com/calculator/nepal-tds/"
        },
        "name": "Calculate Nepal TDS"
      },
      "mainEntity": {
        "@type": "FinancialProduct",
        "name": "Nepal Tax Deducted at Source Calculation"
      },
      "keywords": [
        "Nepal TDS Calculator",
        "TDS Calculator Nepal",
        "Tax Deducted at Source Nepal",
        "Withholding Tax Nepal",
        "IRD TDS Rates",
        "Rent TDS Nepal",
        "Consultancy TDS",
        "Contract Payment TDS",
        "Dividend TDS",
        "Interest TDS",
        "Royalty TDS",
        "Insurance Commission TDS",
        "Meeting Allowance TDS",
        "Finance Act 2083/84"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#faq",
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#webpage"
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Tax Deducted at Source (TDS) in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tax Deducted at Source (TDS) is a withholding tax collected at the time a payment is made. The payer deducts the applicable amount and deposits it with Nepal's Inland Revenue Department (IRD) on behalf of the recipient."
          }
        },
        {
          "@type": "Question",
          "name": "What is the TDS rate for house rent in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "House and land rent is generally subject to a 10% TDS. The applicable tax treatment depends on the recipient and the relevant provisions of the Income Tax Act."
          }
        },
        {
          "@type": "Question",
          "name": "When is 1.5% TDS used for consultancy services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Certain consultancy and service payments may qualify for a 1.5% withholding rate when the applicable statutory conditions are satisfied. Otherwise, the standard withholding treatment applies."
          }
        },
        {
          "@type": "Question",
          "name": "Is TDS calculated on the VAT amount?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Under the implemented calculator logic, TDS is calculated on the taxable payment amount before VAT is added."
          }
        },
        {
          "@type": "Question",
          "name": "When must TDS be deposited to the IRD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Withheld TDS must generally be deposited within the statutory deadline prescribed under Nepal's tax laws. Businesses should always verify the current filing schedule issued by the IRD."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if TDS is not deposited on time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Late deposits may result in interest, penalties, or other consequences under the applicable provisions of Nepal's Income Tax Act and related legislation."
          }
        },
        {
          "@type": "Question",
          "name": "Does this calculator support FY 2083/84 TDS rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This calculator has been designed around the supported FY 2083/84 withholding tax rates and payment categories described on this page."
          }
        },
        {
          "@type": "Question",
          "name": "Can businesses use this calculator for compliance planning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The calculator can be used to estimate withholding tax for supported payment categories. However, users should always verify the applicable law and official IRD guidance before making tax decisions."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Nepal TDS Calculator free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The Nepal TDS Calculator on NepaCalc is free to use and is intended to help individuals, businesses, accountants, employers and finance professionals estimate Tax Deducted at Source (TDS) for supported payment categories."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/nepal-tds/#howto",
      "name": "How to Calculate Tax Deducted at Source (TDS) in Nepal",
      "description": "Learn how to calculate Nepal Tax Deducted at Source (TDS) using the official FY 2083/84 withholding tax rates with the NepaCalc Nepal TDS Calculator.",
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/nepal-tds/#webpage"
      },
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "NPR",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "NepaCalc Nepal TDS Calculator"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select the Payment Category",
          "text": "Choose the payment category such as Rent, Consultancy, Contract, Commission, Dividend, Interest, Royalty, Insurance Commission, Brokerage or Meeting Allowance."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose the Recipient Type",
          "text": "Select the appropriate recipient type or payment option required by the calculator."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Enter the Gross Payment Amount",
          "text": "Input the total payment amount in Nepalese Rupees (NPR)."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Apply VAT Option (if applicable)",
          "text": "If the selected payment category requires VAT consideration, choose the appropriate VAT option."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Review the Results",
          "text": "The calculator instantly displays the applicable TDS amount, net payment, and effective withholding rate based on the selected payment category."
        }
      ]
    }
  ]
};



const DEFAULT_STATE = {
  mode: 'official',
  source: 'consultancy',
  customRate: 0,
  amount: 0,
  fiscalYear: '2083/84',
  recipientType: 'Resident Individual',
  vatStatus: 'No Valid VAT Invoice',
  panStatus: 'Valid PAN'
};

// ── Fiscal-year-aware rate overrides ─────────────────────────────
// 2083/84 is the current/default; older years may differ for some categories.
// Only categories with known changes are listed here; rest fall through to the base.
const FY_OVERRIDES: Record<string, Partial<Record<string, number>>> = {
  '2083/84': {},          // Current year — base rates apply
  '2082/83': {
    insuranceCommission: 0.15,   // was 15% before FY 2083/84
    rideSharing: 0.015,
  },
  '2081/82': {
    insuranceCommission: 0.15,
    interest: 0.05,              // was 5% before FY 2082/83
    rideSharing: 0.015,
  },
  '2080/81': {
    insuranceCommission: 0.15,
    interest: 0.05,
    contract: 0.015,
    rideSharing: 0.015,
  },
};

const FISCAL_YEARS = ['2083/84', '2082/83', '2081/82', '2080/81'];

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
  const [state, setState] = useSyncState('nepal_tds_v7', DEFAULT_STATE);
  const { mode, source, customRate, amount, recipientType, vatStatus, panStatus } = state;
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const isVatRegistered = vatStatus === 'Valid VAT Invoice Provided';

  // Resolve rate: fiscal-year override takes precedence over base rate
  const fyOverride = FY_OVERRIDES[state.fiscalYear] ?? {};
  const baseRate = TDS_RATES[source]?.rate ?? 0.15;
  const fyRate = fyOverride[source] !== undefined ? fyOverride[source]! : baseRate;
  const selectedRate = mode === 'custom'
    ? (customRate || 0) / 100
    : (isVatRegistered && TDS_RATES[source]?.isService ? 0.015 : fyRate);

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
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Finance Calculators', href: '/directory/finance/' },
        { label: 'Nepal TDS Calculator' }
      ]}
      customSchema={schemaGraph}
      title="Nepal TDS Calculator"
      titleClassName="text-xl md:text-2xl font-black text-[#202124] tracking-tight leading-tight mb-2"
      compactHeader={true}
      description="Calculate Tax Deducted at Source (TDS) instantly using the latest Nepal Income Tax Act and Finance Act FY 2083/84 provisions. This calculator helps businesses, employers, accountants, contractors, freelancers and taxpayers estimate withholding tax, identify the applicable TDS rate, understand whether the deduction is treated as Advance Tax or Final Withholding Tax, and review the relevant legal provisions before making a payment."
      icon={Landmark}
      hideH1={false}
      fullWidth={true}
      inputs={
        <div className="space-y-8">
          
          {/* 1. PAYMENT TYPE */}
          <div className="space-y-4">
             <div className="flex flex-col">
               <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider mb-2">Calculation Method</label>
               <div className="flex gap-2 p-1 bg-[#F1F3F4] rounded-md">
                 <button onClick={() => updateState({ mode: 'official' })} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${state.mode === 'official' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:bg-[#E8EAED]'}`}>Official Categories</button>
                 <button onClick={() => updateState({ mode: 'custom' })} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${state.mode === 'custom' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:bg-[#E8EAED]'}`}>Manual Rate</button>
               </div>
             </div>

             {state.mode === 'official' ? (
               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Category</label>
                 <div className="relative">
                   <select 
                     value={source} 
                     onChange={(e) => updateState({ source: e.target.value })}
                     className="w-full h-12 px-4 appearance-none bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all cursor-pointer"
                   >
                     {Object.entries(TDS_RATES).map(([id, info]) => (
                       <option key={id} value={id}>
                         {info.label} ({(info.rate * 100).toString().replace(/\.0$/, '')}%)
                       </option>
                     ))}
                   </select>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368]">
                     <ChevronDown className="w-4 h-4" />
                   </div>
                 </div>
                 <p className="text-[10px] text-[#70757A] leading-relaxed">
                   {TDS_RATES[source]?.desc}
                 </p>
               </div>
             ) : (
               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Custom TDS Rate (%)</label>
                 <div className="relative">
                   <input 
                     type="number" 
                     value={state.customRate || ''} 
                     onChange={(e) => updateState({ customRate: Number(e.target.value) })}
                     placeholder="Example: 15"
                     className="w-full h-12 px-4 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all pr-8" 
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-bold text-[#5F6368]">%</div>
                 </div>
                 <p className="text-[10px] text-[#70757A] leading-relaxed">
                   Enter your custom percentage manually.
                 </p>
               </div>
             )}
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
             <div className="relative">
               <select
                 value={state.fiscalYear}
                 onChange={(e) => updateState({ fiscalYear: e.target.value })}
                 className="w-full h-12 px-4 appearance-none bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all cursor-pointer"
               >
                 {FISCAL_YEARS.map(fy => (
                   <option key={fy} value={fy}>
                     {fy}{fy === '2083/84' ? ' (Current)' : ''}
                   </option>
                 ))}
               </select>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6368]">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
             </div>
             {state.fiscalYear !== '2083/84' && (
               <p className="text-[9px] text-[#F57C00] font-bold uppercase tracking-wider flex items-center gap-1">
                 ⚠ Historical rates for {state.fiscalYear} — some rates may differ from current year
               </p>
             )}
          </div>

          {/* PRIMARY BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
             <button 
                onClick={() => updateState({ mode: 'official', source: 'consultancy', customRate: 15, amount: 0, recipientType: 'Resident Individual', vatStatus: 'No Valid VAT Invoice', panStatus: 'Valid PAN' })}
                className="flex-1 h-12 bg-white border border-[#DADCE0] text-[#5F6368] hover:bg-[#F8F9FA] hover:text-[#202124] text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
             >
                Clear
             </button>
             <button 
                onClick={() => window.scrollTo({ top: document.getElementById('results-panel')?.offsetTop || 0, behavior: 'smooth' })}
                className="flex-1 h-12 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 lg:hidden"
             >
                Calculate TDS & View Compliance Summary
             </button>
          </div>
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
                <div className="text-xl font-black text-[#202124] font-mono">{state.fiscalYear}</div>
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

          {/* EXPORT SUMMARY */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
             <span className="text-[11px] font-black text-[#5F6368] uppercase tracking-widest mr-1">Export Summary:</span>
             <div className="flex flex-wrap items-center gap-2">
               <button onClick={() => { try { window.print(); } catch(e){} }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Download className="w-3 h-3" /> PDF
               </button>
               <button onClick={() => { try { window.print(); } catch(e){} }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Printer className="w-3 h-3" /> Print
               </button>
               <button onClick={() => { const text = `Nepal TDS Calculation\nGross Payment: ${formatNPR(amount)}\nApplicable Rate: ${result.rate.toString().replace(/\.0$/, '')}%\nTDS Calculation: -${formatNPR(result.tdsAmount)}\nNet Payment: ${formatNPR(result.netAmount)}`; navigator.clipboard?.writeText(text).catch(()=>{}); }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Copy className="w-3 h-3" /> Copy
               </button>
               <button onClick={() => { if(navigator.share) { navigator.share({ title: 'Nepal TDS Calculator', url: window.location.href }).catch(()=>{}); } else { navigator.clipboard?.writeText(window.location.href).catch(()=>{}); } }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                 <Share2 className="w-3 h-3" /> Share
               </button>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8 mt-6">
          <div className="space-y-10 mt-2 mb-4">
             {/* 1. HERO DESCRIPTION */}
             <div className="space-y-5 max-w-5xl">
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
                <div id="official-references" className="space-y-4 scroll-mt-24">
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

          {/* PHASE 14: VISUAL AUTHORITY — TDS DIAGRAMS */}
          <div className="space-y-8 pt-6">
            <h3 className="text-xl font-black text-[#202124] tracking-tight">TDS Visual Guides</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Diagram 1: TDS Decision Tree */}
              <div className="border border-[#DADCE0] bg-white rounded-xl p-6 shadow-sm">
                <div className="text-[10px] font-black text-[#1A73E8] uppercase tracking-widest mb-4">Diagram 1 — TDS Decision Tree</div>
                <div className="flex flex-col items-center gap-0 text-center text-[11px] font-bold text-[#202124]">
                  <div className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg w-full">START</div>
                  <div className="w-0.5 h-5 bg-[#DADCE0]" />
                  <div className="bg-[#E8F0FE] border border-[#D2E3FC] px-3 py-2 rounded-lg w-full text-[#1A73E8]">What are you paying?</div>
                  <div className="grid grid-cols-3 gap-1 w-full my-2 text-[9px]">
                    {['Rent','Consultancy','Contract','Commission','Dividend','Interest','Royalty','Insurance','Meeting'].map((c,i) => (
                      <div key={i} className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-1 py-1 text-[#5F6368]">{c}</div>
                    ))}
                  </div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="bg-[#E8F0FE] border border-[#D2E3FC] px-3 py-2 rounded-lg w-full text-[#1A73E8]">Select Recipient</div>
                  <div className="grid grid-cols-2 gap-1 w-full my-2 text-[9px]">
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-2 py-1 text-[#5F6368]">Resident</div>
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-2 py-1 text-[#5F6368]">Non-Resident</div>
                  </div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="bg-[#E8F0FE] border border-[#D2E3FC] px-3 py-2 rounded-lg w-full text-[#1A73E8]">Check VAT Rule</div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="bg-[#FFF8E1] border border-[#FFE082] px-3 py-2 rounded-lg w-full text-[#F57C00]">Applicable Rate</div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="bg-[#E6F4EA] border border-[#A8D5B5] px-3 py-2 rounded-lg w-full text-[#188038]">Calculate TDS</div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="bg-[#188038] text-white px-4 py-2 rounded-lg w-full">Net Payment</div>
                </div>
              </div>

              {/* Diagram 2: Compliance Timeline */}
              <div className="border border-[#DADCE0] bg-white rounded-xl p-6 shadow-sm">
                <div className="text-[10px] font-black text-[#188038] uppercase tracking-widest mb-4">Diagram 2 — TDS Compliance Timeline</div>
                <div className="flex flex-col gap-0">
                  {[
                    { step: 'Invoice Received', color: 'bg-[#1A73E8] text-white' },
                    { step: 'Verify PAN', color: 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]' },
                    { step: 'Verify Category', color: 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]' },
                    { step: 'Calculate TDS', color: 'bg-[#FFF8E1] text-[#F57C00] border border-[#FFE082]' },
                    { step: 'Pay Vendor', color: 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]' },
                    { step: 'Deposit TDS (by 25th)', color: 'bg-[#FFF8E1] text-[#D93025] border border-[#F9DEDC]' },
                    { step: 'File e-TDS Return', color: 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]' },
                    { step: 'Issue TDS Certificate', color: 'bg-[#E6F4EA] text-[#188038] border border-[#A8D5B5]' },
                    { step: 'Archive Records', color: 'bg-[#188038] text-white' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`${item.color} text-[11px] font-black px-4 py-2 rounded-lg w-full text-center`}>{item.step}</div>
                      {i < 8 && <div className="w-0.5 h-4 bg-[#DADCE0]" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagram 3: Advance vs Final Tax */}
              <div className="border border-[#DADCE0] bg-white rounded-xl p-6 shadow-sm">
                <div className="text-[10px] font-black text-[#F57C00] uppercase tracking-widest mb-4">Diagram 3 — Advance Tax vs Final Tax</div>
                <div className="flex flex-col items-center gap-0 text-center text-[11px] font-bold text-[#202124]">
                  <div className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg w-full">Payment Made</div>
                  <div className="w-0.5 h-5 bg-[#DADCE0]" />
                  <div className="bg-[#FFF8E1] border border-[#FFE082] px-3 py-2 rounded-lg w-full text-[#F57C00]">Is it Final Withholding under law?</div>
                  <div className="w-0.5 h-4 bg-[#DADCE0]" />
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-0">
                      <div className="bg-[#D93025] text-white px-2 py-1.5 rounded-lg w-full text-[10px]">YES → Final Tax</div>
                      <div className="w-0.5 h-4 bg-[#DADCE0]" />
                      <div className="bg-[#F9DEDC] border border-[#F9DEDC] text-[#D93025] px-2 py-2 rounded-lg w-full text-[10px]">Tax obligation satisfied. No further return required.</div>
                      <div className="w-0.5 h-4 bg-[#DADCE0]" />
                      <div className="bg-[#D93025] text-white px-2 py-1.5 rounded-lg w-full text-[10px]">Done ✓</div>
                    </div>
                    <div className="flex flex-col items-center gap-0">
                      <div className="bg-[#188038] text-white px-2 py-1.5 rounded-lg w-full text-[10px]">NO → Advance Tax</div>
                      <div className="w-0.5 h-4 bg-[#DADCE0]" />
                      <div className="bg-[#E6F4EA] border border-[#A8D5B5] text-[#188038] px-2 py-2 rounded-lg w-full text-[10px]">Credit claimable in annual tax return.</div>
                      <div className="w-0.5 h-4 bg-[#DADCE0]" />
                      <div className="bg-[#188038] text-white px-2 py-1.5 rounded-lg w-full text-[10px]">Claim Credit ✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 16 / 18: SMART RESULT ANALYSIS + SMART WARNINGS */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-black text-[#202124] tracking-tight">Smart Result Analysis</h3>
            <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#E8F0FE] border-b border-[#D2E3FC] px-6 py-3">
                <span className="text-[11px] font-black text-[#1A73E8] uppercase tracking-widest">Calculation Summary for {TDS_RATES[source]?.label}</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Payment Category', value: TDS_RATES[source]?.label || '—' },
                    { label: 'Applicable Rate', value: `${result.rate.toString().replace(/\.0$/, '')}%` },
                    { label: 'TDS Amount', value: formatNPR(result.tdsAmount), highlight: true },
                    { label: 'Net Payment', value: formatNPR(result.netAmount) },
                  ].map((item, idx) => (
                    <div key={idx} className={`rounded-lg p-4 text-center border ${item.highlight ? 'bg-[#FFF8E1] border-[#FFE082]' : 'bg-[#F8F9FA] border-[#DADCE0]'}`}>
                      <div className="text-[9px] font-black text-[#5F6368] uppercase tracking-widest mb-1">{item.label}</div>
                      <div className={`text-sm font-black ${item.highlight ? 'text-[#D93025]' : 'text-[#202124]'} font-mono`}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#F1F3F4] pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#5F6368] font-bold">Tax Type</span>
                      <span className="font-black text-[#202124]">{['dividend','insuranceCommission','interest'].includes(source) ? 'Final Withholding Tax' : 'Advance Tax'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#5F6368] font-bold">Legal Basis</span>
                      <span className="font-black text-[#202124]">Income Tax Act, Section 88</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#5F6368] font-bold">Deposit Deadline</span>
                      <span className="font-black text-[#D93025]">By 25th of following month</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#5F6368] font-bold">Fiscal Year</span>
                      <span className="font-black text-[#202124]">FY 2083/84</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest mb-2">Required Documents</div>
                    {['Invoice / Bill', 'Valid PAN of Recipient', 'Payment Agreement', 'Payment Voucher', 'TDS Deposit Receipt'].map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#3C4043]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Warnings */}
            {amount >= 1000000 && (
              <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-5 flex gap-4">
                <AlertCircle className="w-6 h-6 text-[#F57C00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#F57C00] uppercase tracking-wider mb-2">⚠ Large Transaction Alert</h4>
                  <p className="text-[12px] text-[#616161] mb-3">This is a high-value transaction. Please verify before processing:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Recipient PAN is valid', 'Written agreement exists', 'Correct payment category selected', 'Supporting documents collected'].map((w, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#3C4043]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] shrink-0" /> {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {TDS_RATES[source]?.isService && vatStatus !== 'Valid VAT Invoice Provided' && (
              <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-xl p-5 flex gap-4">
                <Info className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">VAT Reminder</h4>
                  <p className="text-[12px] text-[#3C4043] leading-relaxed">
                    This payment category qualifies for a reduced withholding rate when a valid VAT invoice is provided. Have you confirmed the VAT status of this vendor before processing payment?
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 15: INTERACTIVE FEATURES — ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6 pb-2 border-y border-[#DADCE0] mt-8">
            <span className="text-sm font-bold text-[#202124] mr-2">Export & Share:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => { try { window.print(); } catch(e){} }} className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button onClick={() => { const text = `Nepal TDS Calculation FY 2083/84\nCategory: ${TDS_RATES[source]?.label}\nGross: ${formatNPR(amount)}\nTDS Rate: ${result.rate}%\nTDS Amount: ${formatNPR(result.tdsAmount)}\nNet Payment: ${formatNPR(result.netAmount)}`; navigator.clipboard?.writeText(text).catch(()=>{}); }} className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <Copy className="w-3.5 h-3.5" /> Copy Results
              </button>
              <button onClick={() => { const subject = `Nepal TDS Calculation – ${TDS_RATES[source]?.label}`; const body = `Nepal TDS Calculation FY 2083/84%0ACategory: ${TDS_RATES[source]?.label}%0AGross: ${formatNPR(amount)}%0ATDS Rate: ${result.rate}%25%0ATDS Amount: ${formatNPR(result.tdsAmount)}%0ANet Payment: ${formatNPR(result.netAmount)}`; window.location.href = `mailto:?subject=${subject}&body=${body}`; }} className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" /> Email
              </button>
              <button onClick={() => { const url = `${window.location.origin}${window.location.pathname}?cat=${source}&amt=${amount}&rec=${encodeURIComponent(recipientType)}&vat=${encodeURIComponent(vatStatus)}`; navigator.clipboard?.writeText(url).catch(()=>{}); }} className="h-10 px-4 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" /> Share Link
              </button>
              <button onClick={() => { const data = { category: TDS_RATES[source]?.label, grossAmount: amount, tdsRate: result.rate, tdsAmount: result.tdsAmount, netPayment: result.netAmount, fiscalYear: '2083/84', generatedAt: new Date().toISOString() }; const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `tds-calculation-${source}.json`; a.click(); }} className="h-10 px-4 border border-[#1A73E8] bg-[#E8F0FE] rounded flex items-center justify-center gap-2 hover:bg-[#D2E3FC] transition-colors text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          {/* PHASE 19: RELATED TOOLS */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-black text-[#202124] tracking-tight">Related Nepal Tax Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { name: 'Nepal Income Tax', slug: '/calculator/nepal-income-tax/', icon: '📋' },
                { name: 'Nepal Salary Calculator', slug: '/calculator/nepal-salary/', icon: '💼' },
                { name: 'Nepal VAT Calculator', slug: '/calculator/nepal-vat/', icon: '🧾' },
                { name: 'SSF Calculator', slug: '/calculator/nepal-provident-fund/', icon: '🛡️' },
                { name: 'NEA Bill Calculator', slug: '/calculator/nea-bill/', icon: '⚡' },
                { name: 'Loan EMI Calculator', slug: '/calculator/loan-emi/', icon: '🏦' },
                { name: 'Nepal Vehicle Tax', slug: '/calculator/nepal-vehicle-tax/', icon: '🚗' },
                { name: 'Property Tax', slug: '/calculator/property-tax/', icon: '🏠' },
                { name: 'Dividend Calculator', slug: '/calculator/nepal-stocks/', icon: '📈' },
                { name: 'TDS Calculator (Old)', slug: '/calculator/tds-calculator/', icon: '🔢' },
              ].map((tool, idx) => (
                <a key={idx} href={tool.slug} className="border border-[#DADCE0] bg-white rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-[#1A73E8] hover:bg-[#E8F0FE] hover:shadow-sm transition-all group">
                  <span className="text-xl">{tool.icon}</span>
                  <span className="text-[10px] font-bold text-[#3C4043] group-hover:text-[#1A73E8] leading-tight">{tool.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* PHASE 20: E-E-A-T AUTHORITY FOOTER */}
          <div className="border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm mt-8">
            <div className="bg-[#202124] px-6 py-5">
              <div className="flex items-center gap-3 mb-2">
                <Landmark className="w-5 h-5 text-white" />
                <h3 className="text-[13px] font-black text-white uppercase tracking-widest">About This Calculator</h3>
              </div>
              <p className="text-[12px] text-[#9AA0A6] leading-relaxed">
                This calculator has been developed to estimate Tax Deducted at Source (TDS) for supported FY 2083/84 payment categories in Nepal. It is based on the Income Tax Act, 2058 (2002), the applicable Finance Act for FY 2083/84, the Income Tax Rules, and publicly available guidance issued by the Inland Revenue Department (IRD).
              </p>
            </div>
            <div className="bg-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest mb-3">Last Reviewed</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[12px] text-[#3C4043]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
                      Fiscal Year: 2083/84
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#3C4043]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
                      July 2026
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest mb-3">Reviewed Against</div>
                  <div className="space-y-1.5">
                    {['Income Tax Act, 2058 (2002)', 'Finance Act FY 2083/84', 'Income Tax Rules', 'Official IRD Publications'].map((src, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12px] text-[#3C4043]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" /> {src}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#5F6368] uppercase tracking-widest mb-3">Update Policy</div>
                  <p className="text-[11px] text-[#5F6368] leading-relaxed">
                    This page is reviewed after each annual Finance Act and whenever significant IRD guidance affects the withholding categories or calculation logic. The calculator is an educational and estimation tool and should not be treated as legal, tax, or accounting advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    />
    </div>
  );
}
