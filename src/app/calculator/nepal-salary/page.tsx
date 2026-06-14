import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Salary Calculator Nepal (FY 2083/84) | Income Tax, TDS & SSF Calculator",
  description: "Calculate salary tax in Nepal using the latest FY 2083/84 IRD tax slabs. Includes SSF, CIT, EPF deductions, TDS calculations, and net take-home salary estimates.",
  slug: 'nepal-salary',
  canonical: 'https://nepacalc.com/calculator/nepal-salary/',
  keywords: [
    "salary calculator nepal", 
    "income tax calculator nepal", 
    "salary tax calculator nepal", 
    "ird tax calculator", 
    "tax calculator nepal", 
    "tds calculator nepal", 
    "ssf calculator nepal", 
    "net salary calculator nepal"
  ]
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#software",
      "name": "Salary Calculator Nepal",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript.",
      "description": "High-precision financial utility designed to compute net salary payouts, statutory payroll deductions, and progressive income tax withholdings in Nepal.",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "NPR"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#webapp",
      "name": "Salary Calculator Nepal (FY 2083/84)",
      "url": "https://nepacalc.com/calculator/nepal-salary/",
      "applicationCategory": "FinancialApplication"
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#howto",
      "name": "How to Calculate Salary Tax in Nepal",
      "description": "Step-by-step guide to calculating personal income tax, TDS liabilities, and net take-home salary according to Inland Revenue Department rules.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Determine Gross Income",
          "text": "Combine your monthly base salary, performance bonuses, allowances, and taxable benefits to find your total gross annual salary."
        },
        {
          "@type": "HowToStep",
          "name": "Deduct Pre-Tax Contributions",
          "text": "Subtract eligible contributions made to the Social Security Fund (SSF), Citizen Investment Trust (CIT), and Employees Provident Fund (EPF) up to legal maximum limits."
        },
        {
          "@type": "HowToStep",
          "name": "Apply Unified Tax Slabs",
          "text": "Distribute your remaining net taxable income across the unified progressive marginal tax brackets starting at 1% up to Rs. 10 Lakhs and capping at 29%."
        },
        {
          "@type": "HowToStep",
          "name": "Apply Gender Rebates",
          "text": "If applicable, deduct the flat 10% female employee tax rebate from your calculated total annual tax liability."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Net Monthly Pay",
          "text": "Divide your remaining annual tax by 12 to find your monthly TDS, then subtract this tax along with your retirement deductions from your gross salary to determine your final net take-home pay."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/nepal-salary/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate salary tax in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Find your gross annual income, subtract pre-tax deductions like SSF or CIT up to allowed caps, map the remaining balance to progressive IRD slabs, apply any eligible rebates, and divide the total annual liability by 12."
          }
        },
        {
          "@type": "Question",
          "name": "What is the current salary tax rate in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nepal utilizes progressive brackets of 1%, 10%, 20%, 27%, and 29% based on the individual's annual assessable income."
          }
        },
        {
          "@type": "Question",
          "name": "Does SSF reduce income tax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, contributions reduce taxable baseline income. Enrolled workers also get a 0% rate on their first Rs. 10 Lakh income bracket instead of paying the standard 1% social security tax."
          }
        },
        {
          "@type": "Question",
          "name": "How much CIT contribution is tax deductible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CIT deposits are tax-deductible up to an annual limit of Rs. 5,00,000 or one-third of total assessable compensation, whichever is less."
          }
        },
        {
          "@type": "Question",
          "name": "What is my take-home salary after tax?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Take-home salary equals gross compensation minus all pre-tax retirement plan contributions and monthly tax withholdings (TDS)."
          }
        },
        {
          "@type": "Question",
          "name": "What are the latest income tax slabs in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The unified table charges 1% up to Rs. 10 Lakhs, 10% up to Rs. 15 Lakhs, 20% up to Rs. 25 Lakhs, 27% up to Rs. 40 Lakhs, and 29% on everything above."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator based on IRD tax slabs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this engine is kept completely up-to-date with rules set by the Inland Revenue Department of Nepal."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
      
      <Calculator />
    </div>
  );
}
