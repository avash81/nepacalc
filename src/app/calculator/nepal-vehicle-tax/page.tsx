import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Vehicle Tax Calculator Nepal (2083/84) - Road Tax & Bluebook",
  description: "Calculate vehicle tax, bluebook renewal fees, road tax penalties and EV tax in Nepal using the latest 2083/84 rates and DOTM guidelines.",
  slug: 'nepal-vehicle-tax',
  keywords: [
    "Vehicle Tax Calculator Nepal",
    "Vehicle Tax Calculator",
    "Vehicle Tax in Nepal",
    "Vehicle Tax Nepal",
    "Nepal Vehicle Tax Calculator",
    "Vehicle Tax in Nepal 2083/84",
    "Bike Tax Calculator Nepal",
    "Bluebook Renew Calculator",
    "Bluebook Tax Calculator Nepal",
    "Road Tax Calculator",
    "Motorcycle Tax Calculator",
    "Car Tax Calculator Nepal",
    "Vehicle Tax Online Nepal",
    "Vehicle Tax Rate Nepal"
  ],
  ogImage: "https://nepacalc.com/assets/images/og-nepal-vehicle-tax-2083.jpg"
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Nepal", "item": "https://nepacalc.com/nepal/" },
      { "@type": "ListItem", "position": 3, "name": "Vehicle Tax", "item": "https://nepacalc.com/calculator/nepal-vehicle-tax/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vehicle Tax Calculator Nepal (2083/84)",
    "description": "Calculate vehicle tax, bluebook renewal fees, road tax penalties and EV tax in Nepal using the latest 2083/84 rates and DOTM guidelines.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/"
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vehicle Tax Calculator Nepal",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NPR"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Vehicle Tax Rates Nepal 2083/84",
    "description": "Official vehicle tax rates, bike tax rates, and EV tax rates in Nepal for FY 2083/84.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "Department of Transport Management (DOTM) Nepal"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How To Calculate Vehicle Tax In Nepal",
    "step": [
      { "@type": "HowToStep", "text": "Select vehicle category." },
      { "@type": "HowToStep", "text": "Enter engine capacity, motor power, seating capacity or load capacity." },
      { "@type": "HowToStep", "text": "Choose the renewal status." },
      { "@type": "HowToStep", "text": "Select delay period if renewal is overdue." },
      { "@type": "HowToStep", "text": "Review annual road tax, renewal charges, penalty amount, and view total payable amount." }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the tax on a Duke 200 in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "A Duke 200 falls into the 151-225 CC slab. The annual road tax is Rs. 6,500 plus a Rs. 300 mandatory renewal fee." }
      },
      {
        "@type": "Question",
        "name": "What is the tax on a Bullet 350 in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "A Bullet 350 falls into the 226-400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee." }
      },
      {
        "@type": "Question",
        "name": "What is the tax on a 400cc bike in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "A 400cc motorcycle falls into the 226-400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee." }
      },
      {
        "@type": "Question",
        "name": "How much is bike tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Bike tax depends on engine capacity. Motorcycles up to 125cc pay Rs. 3,000 annually, 150cc bikes pay Rs. 5,000, 225cc bikes pay Rs. 6,500, and larger motorcycles pay between Rs. 12,000 and Rs. 35,000." }
      },
      {
        "@type": "Question",
        "name": "How do I calculate vehicle tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax is calculated using engine capacity, motor power, seating capacity or carrying capacity depending on the vehicle category. This calculator automatically applies the latest 2083/84 tax rates." }
      },
      {
        "@type": "Question",
        "name": "What is the vehicle tax rate in Nepal for 2083/84?",
        "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax rates vary according to vehicle type and capacity. Motorcycles, cars, commercial vehicles and electric vehicles all have separate tax slabs under current provincial tax schedules." }
      },
      {
        "@type": "Question",
        "name": "How do I renew my bluebook in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can renew your bluebook by paying annual vehicle tax, renewal charges and maintaining valid insurance through the relevant Transport Management Office." }
      },
      {
        "@type": "Question",
        "name": "What is the penalty for late bluebook renewal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Late renewal penalties can range from 5% to 32% per year depending on how long the renewal remains overdue." }
      },
      {
        "@type": "Question",
        "name": "Can I calculate bike tax online in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax instantly." }
      },
      {
        "@type": "Question",
        "name": "How is EV tax calculated in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "EV tax is generally calculated using motor power measured in kilowatts (kW) and applicable provincial tax schedules." }
      },
      {
        "@type": "Question",
        "name": "Where can I pay vehicle tax in Nepal?",
        "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax can be paid through authorized Transport Management Offices and approved digital payment systems where available." }
      },
      {
        "@type": "Question",
        "name": "Can vehicle tax be paid online?",
        "acceptedAnswer": { "@type": "Answer", "text": "Online payment availability depends on the province and transport office system integration." }
      },
      {
        "@type": "Question",
        "name": "What happens if I do not renew my bluebook for several years?",
        "acceptedAnswer": { "@type": "Answer", "text": "Additional penalties may apply and tax liabilities can accumulate subject to applicable legal limits and provincial regulations." }
      },
      {
        "@type": "Question",
        "name": "Is vehicle tax different across Nepal's provinces?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Provincial governments may apply different vehicle tax schedules and fee structures." }
      }
    ]
  };

  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Calculator />

      {/* Main SEO Content Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124] mb-4">
            Vehicle Tax Calculator Nepal (2083/84)
          </h1>

          <div className="text-[13px] text-[#5f6368] font-medium mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="mb-1"><strong>Last Updated:</strong> FY 2083/84</p>
            <p className="mb-0"><strong>Data Sources:</strong> Department of Transport Management (DOTM), Provincial Transport Management Offices, Bagmati Province Fiscal Year 2083/84 Vehicle Tax Schedule.</p>
          </div>

          <p className="text-[#3c4043] leading-relaxed mb-8">
            Use this Vehicle Tax Calculator Nepal to calculate annual road tax, bluebook renewal charges, penalties and electric vehicle tax using the latest 2083/84 rates. The calculator supports motorcycles, scooters, cars, jeeps, buses, trucks and electric vehicles based on current Nepal transport tax regulations and TMIS data.
          </p>

          {/* AI Overview Targets */}
          <div className="bg-[#E8F0FE] p-5 rounded-xl mb-8 border border-[#c6dafe]">
            <h2 className="text-[#1A73E8] text-lg font-bold mb-3 mt-0">Vehicle Tax in Nepal 2083/84 - Quick Answer</h2>
            <p className="text-[#3c4043] font-medium mb-4">
              <strong>What is vehicle tax in Nepal?</strong><br/>
              Vehicle tax in Nepal is an annual road tax paid to maintain valid vehicle registration and bluebook status.
            </p>
            <p className="text-[#3c4043] font-medium mb-4">
              <strong>How much is bike tax in Nepal?</strong><br/>
              Bike tax depends on engine capacity. Motorcycles up to 125cc pay lower annual tax while higher-capacity motorcycles pay higher rates.
            </p>
            <p className="text-[#3c4043] font-medium mb-0">
              <strong>How do I renew my bluebook in Nepal?</strong><br/>
              Vehicle owners must pay annual road tax, renewal fees and maintain valid insurance before renewing their bluebook. Failure to renew on time may result in additional penalties and renewal charges.
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            Vehicle Tax in Nepal 2083/84
          </h2>
          <p className="text-[#3c4043] mb-6">
            Vehicle tax in Nepal is calculated based on vehicle category, engine capacity (CC), motor power (kW), seating capacity or carrying capacity. Vehicle owners must renew road tax annually to maintain valid registration and bluebook status under the Vehicle and Transport Management Act.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            Bike Tax Calculator Nepal
          </h2>
          <p className="text-[#3c4043] mb-4">
            If you own a motorcycle or scooter, the Bike Tax Calculator Nepal module estimates your exact due.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Vehicle Category</th>
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Annual Tax</th>
                </tr>
              </thead>
              <tbody className="text-[#3c4043]">
                <tr><td className="p-3 border border-slate-200">Up to 125 CC</td><td className="p-3 border border-slate-200">Rs. 3,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">126-150 CC</td><td className="p-3 border border-slate-200">Rs. 5,000</td></tr>
                <tr><td className="p-3 border border-slate-200">151-225 CC</td><td className="p-3 border border-slate-200">Rs. 6,500</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">226-400 CC</td><td className="p-3 border border-slate-200">Rs. 12,000</td></tr>
                <tr><td className="p-3 border border-slate-200">401-650 CC</td><td className="p-3 border border-slate-200">Rs. 25,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Above 650 CC</td><td className="p-3 border border-slate-200">Rs. 35,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#5f6368] text-sm italic mb-8">* Mandatory Renewal Fee: Rs. 300</p>

          <h3 className="text-lg sm:text-xl font-bold text-[#202124] mt-6 mb-3">
            Private Car, Jeep and Van Tax Rates
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Vehicle Category</th>
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Annual Tax</th>
                </tr>
              </thead>
              <tbody className="text-[#3c4043]">
                <tr><td className="p-3 border border-slate-200">Up to 1000 CC</td><td className="p-3 border border-slate-200">Rs. 22,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">1001-1500 CC</td><td className="p-3 border border-slate-200">Rs. 25,000</td></tr>
                <tr><td className="p-3 border border-slate-200">1501-2000 CC</td><td className="p-3 border border-slate-200">Rs. 27,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">2001-2500 CC</td><td className="p-3 border border-slate-200">Rs. 37,000</td></tr>
                <tr><td className="p-3 border border-slate-200">2501-3000 CC</td><td className="p-3 border border-slate-200">Rs. 50,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">3001-3500 CC</td><td className="p-3 border border-slate-200">Rs. 65,000</td></tr>
                <tr><td className="p-3 border border-slate-200">Above 3500 CC</td><td className="p-3 border border-slate-200">Rs. 70,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#5f6368] text-sm italic mb-8">* Mandatory Renewal Fee: Rs. 500</p>

          <h3 className="text-lg sm:text-xl font-bold text-[#202124] mt-6 mb-3">
            Electric Vehicle (EV) Tax Rates
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Motor Power</th>
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Annual Tax</th>
                </tr>
              </thead>
              <tbody className="text-[#3c4043]">
                <tr><td className="p-3 border border-slate-200">10-50 kW</td><td className="p-3 border border-slate-200">Rs. 5,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">51-125 kW</td><td className="p-3 border border-slate-200">Rs. 15,000</td></tr>
                <tr><td className="p-3 border border-slate-200">126-200 kW</td><td className="p-3 border border-slate-200">Rs. 20,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Above 200 kW</td><td className="p-3 border border-slate-200">Rs. 30,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#5f6368] text-sm italic mb-2">* Mandatory Renewal Fee: Rs. 300</p>
          <p className="text-[#3c4043] mb-8">Public and commercial EVs may qualify for reduced annual tax under applicable provincial rules.</p>

          <h3 className="text-lg sm:text-xl font-bold text-[#202124] mt-6 mb-3">
            Commercial Vehicle Tax Rates
          </h3>
          <p className="text-[#3c4043] mb-4">
            Commercial vehicles such as Taxis, Buses, Trucks, and Tractors have specific tax rates.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Vehicle Category</th>
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Annual Tax</th>
                </tr>
              </thead>
              <tbody className="text-[#3c4043]">
                <tr><td className="p-3 border border-slate-200">Taxi</td><td className="p-3 border border-slate-200">Rs. 4,000 - Rs. 6,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Microbus</td><td className="p-3 border border-slate-200">Rs. 8,000</td></tr>
                <tr><td className="p-3 border border-slate-200">Minibus</td><td className="p-3 border border-slate-200">Rs. 12,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Medium Bus</td><td className="p-3 border border-slate-200">Rs. 18,000</td></tr>
                <tr><td className="p-3 border border-slate-200">Large Bus</td><td className="p-3 border border-slate-200">Rs. 35,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Small Truck</td><td className="p-3 border border-slate-200">Rs. 10,000</td></tr>
                <tr><td className="p-3 border border-slate-200">Medium Truck</td><td className="p-3 border border-slate-200">Rs. 15,000</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">Heavy Truck</td><td className="p-3 border border-slate-200">Rs. 25,000</td></tr>
                <tr><td className="p-3 border border-slate-200">Large Goods Carrier</td><td className="p-3 border border-slate-200">Rs. 35,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            Bluebook Renewal Calculator Nepal
          </h2>
          <p className="text-[#3c4043] mb-4">
            The Bluebook Renewal Calculator helps vehicle owners estimate annual road tax, renewal charges and late penalties. Every registered vehicle in Nepal must renew its bluebook through the Department of Transport Management (DOTM) or authorized Transport Management Office.
          </p>
          <p className="text-[#3c4043] font-medium mb-2">For renewal you generally need:</p>
          <ul className="list-disc pl-6 text-[#3c4043] mb-8 space-y-1">
            <li>Vehicle bluebook</li>
            <li>Citizenship copy</li>
            <li>Valid insurance</li>
            <li>Applicable tax payment</li>
            <li>Renewal fee</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            How To Calculate Vehicle Tax In Nepal
          </h2>
          <ol className="list-decimal pl-6 text-[#3c4043] mb-8 space-y-2">
            <li>Select vehicle category.</li>
            <li>Enter engine capacity, motor power, seating capacity or load capacity.</li>
            <li>Choose the renewal status.</li>
            <li>Select delay period if renewal is overdue.</li>
            <li>Review annual road tax.</li>
            <li>Review renewal charges.</li>
            <li>Review penalty amount if applicable.</li>
            <li>View total payable amount.</li>
          </ol>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            Bluebook Renewal Fees and Penalties
          </h2>
          <p className="text-[#3c4043] mb-4">
            Nepal applies penalties when road tax and bluebook renewal are not completed within the required period.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Delay Period</th>
                  <th className="p-3 border border-slate-200 font-bold text-[#202124]">Penalty</th>
                </tr>
              </thead>
              <tbody className="text-[#3c4043]">
                <tr><td className="p-3 border border-slate-200">Within Grace Period</td><td className="p-3 border border-slate-200">No Penalty</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">1-30 Days After Grace</td><td className="p-3 border border-slate-200">5%</td></tr>
                <tr><td className="p-3 border border-slate-200">31-45 Days After Grace</td><td className="p-3 border border-slate-200">10%</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border border-slate-200">46 Days Until Fiscal Year End</td><td className="p-3 border border-slate-200">20%</td></tr>
                <tr><td className="p-3 border border-slate-200">1-4 Fiscal Years</td><td className="p-3 border border-slate-200">32% Per Year</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <h4 className="font-bold text-[#202124] mb-2">Important:</h4>
            <ul className="list-disc pl-5 text-[#3c4043] space-y-1 text-sm">
              <li>Vehicle tax liability is generally capped at four years for pending annual tax calculations.</li>
              <li>Penalties may vary depending on provincial implementation.</li>
              <li>Insurance remains mandatory during renewal.</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-8 mb-4 border-b pb-2">
            Electric Vehicle Tax and Import Duty in Nepal
          </h2>
          <p className="text-[#3c4043] mb-8">
            Electric vehicle taxation in Nepal is based primarily on motor power (kW). Import duties and infrastructure charges may also apply during vehicle importation depending on CIF valuation and prevailing fiscal policy. The Vehicle Tax Calculator Nepal can be used to estimate EV-related tax obligations under the current 2083/84 framework.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-10 mb-4 border-b pb-2">
            Related Nepal Calculators
          </h2>
          <ul className="list-disc pl-6 text-[#1A73E8] mb-10 space-y-2">
            <li><Link href="/calculator/loan-emi/" className="hover:underline">Auto Loan EMI Calculator</Link></li>
            <li><Link href="/calculator/nepal-salary/" className="hover:underline">Nepal Salary Tax Calculator</Link></li>
            <li><Link href="/calculator/tds-calculator/" className="hover:underline">TDS Calculator Nepal</Link></li>
            <li><Link href="/calculator/nea-bill/" className="hover:underline">NEA Bill Calculator</Link></li>
            <li><Link href="/calculator/gold-tax/" className="hover:underline">Gold Import Tax Calculator</Link></li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-[#202124] mt-10 mb-6 border-b pb-2">
            Vehicle Tax FAQ (2083/84)
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What is the tax on a Duke 200 in Nepal?</h3>
              <p className="text-[#3c4043]">A Duke 200 falls into the 151-225 CC slab. The annual road tax is Rs. 6,500 plus a Rs. 300 mandatory renewal fee.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What is the tax on a Bullet 350 in Nepal?</h3>
              <p className="text-[#3c4043]">A Bullet 350 falls into the 226-400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What is the tax on a 400cc bike in Nepal?</h3>
              <p className="text-[#3c4043]">A 400cc motorcycle falls into the 226-400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">How much is bike tax in Nepal?</h3>
              <p className="text-[#3c4043]">Bike tax depends on engine capacity. Motorcycles up to 125cc pay Rs. 3,000 annually, 150cc bikes pay Rs. 5,000, 225cc bikes pay Rs. 6,500, and larger motorcycles pay between Rs. 12,000 and Rs. 35,000.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">How do I calculate vehicle tax in Nepal?</h3>
              <p className="text-[#3c4043]">Vehicle tax is calculated using engine capacity, motor power, seating capacity or carrying capacity depending on the vehicle category. This calculator automatically applies the latest 2083/84 tax rates.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What is the vehicle tax rate in Nepal for 2083/84?</h3>
              <p className="text-[#3c4043]">Vehicle tax rates vary according to vehicle type and capacity. Motorcycles, cars, commercial vehicles and electric vehicles all have separate tax slabs under current provincial tax schedules.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">How do I renew my bluebook in Nepal?</h3>
              <p className="text-[#3c4043]">You can renew your bluebook by paying annual vehicle tax, renewal charges and maintaining valid insurance through the relevant Transport Management Office.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What is the penalty for late bluebook renewal?</h3>
              <p className="text-[#3c4043]">Late renewal penalties can range from 5% to 32% depending on how long the renewal remains overdue.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">Can I calculate bike tax online in Nepal?</h3>
              <p className="text-[#3c4043]">Yes. The Vehicle Tax Calculator Nepal allows you to estimate motorcycle and scooter road tax instantly.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">How is EV tax calculated in Nepal?</h3>
              <p className="text-[#3c4043]">EV tax is generally calculated using motor power measured in kilowatts (kW) and applicable provincial tax schedules.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">Where can I pay vehicle tax in Nepal?</h3>
              <p className="text-[#3c4043]">Vehicle tax can be paid through authorized Transport Management Offices and approved digital payment systems where available.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">Can vehicle tax be paid online?</h3>
              <p className="text-[#3c4043]">Online payment availability depends on the province and transport office system integration.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">What happens if I do not renew my bluebook for several years?</h3>
              <p className="text-[#3c4043]">Additional penalties may apply and tax liabilities can accumulate subject to applicable legal limits and provincial regulations.</p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#202124] mb-2">Is vehicle tax different across Nepal's provinces?</h3>
              <p className="text-[#3c4043]">Yes. Provincial governments may apply different vehicle tax schedules and fee structures.</p>
            </div>
          </div>
          
          {/* Entity Reinforcement */}
          <div className="sr-only">
            Vehicle Tax Calculator Nepal 2083 2084, Bike Tax Calculator Nepal, Bluebook Renewal Calculator Nepal, Vehicle Tax Rates Nepal, EV Tax Nepal. Department of Transport Management (DOTM), Transport Management Office, Bagmati Province, Vehicle and Transport Management Act, TMIS, Bluebook Renewal, Road Tax, Vehicle Registration, Fiscal Year 2083/84.
          </div>
        </article>
      </div>
    </div>
  );
}
