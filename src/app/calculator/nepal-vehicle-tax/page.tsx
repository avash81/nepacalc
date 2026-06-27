import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Vehicle Tax Calculator Nepal (2083/84) – Bike, Car & Bluebook Renewal Tax",
  description: "Calculate vehicle tax in Nepal using the latest 2083/84 rates. Estimate motorcycle road tax, car tax, bluebook renewal charges, EV road tax, EV import duty and CIIF. Based on Bagmati Province Finance Act and DoTM guidelines.",
  slug: 'nepal-vehicle-tax',
  keywords: [
    "Vehicle Tax Calculator Nepal",
    "Vehicle Tax Calculator",
    "Vehicle Tax in Nepal",
    "Vehicle Tax Nepal",
    "Nepal Vehicle Tax Calculator",
    "Motorcycle Road Tax Nepal",
    "Bluebook Renewal Calculator Nepal",
    "Bluebook Tax Calculator Nepal",
    "Vehicle Tax 2083/84",
    "Vehicle Tax Calculator Nepal 2083/84",
    "Road Tax Calculator Nepal",
    "Private Car Road Tax Nepal",
    "Commercial Vehicle Tax Nepal",
    "Electric Vehicle Tax Nepal",
    "EV Import Duty Nepal",
    "Bluebook Renewal Charges Nepal",
    "EV Tax Nepal 2083/84",
    "EV Import Tax Nepal",
    "Clean Infrastructure Investment Fee Nepal",
    "CIIF Nepal",
    "vehicle tax 2083 84",
    "vehicle tax in nepal 2083 84",
    "duke 200 tax in nepal",
    "bullet 350 tax in nepal",
    "150 cc bike tax in nepal",
    "400cc tax in nepal",
    "Honda Shine tax Nepal",
    "Pulsar 150 tax Nepal",
    "Royal Enfield tax Nepal",
    "BYD Atto 3 tax Nepal",
    "MG ZS EV tax Nepal",
    "Scooter tax calculator Nepal",
    "Bluebook tax calculator Nepal"
  ],
  ogImage: "https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp"
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/" },
      { "@type": "ListItem", "position": 3, "name": "Vehicle Tax Calculator Nepal", "item": "https://nepacalc.com/calculator/nepal-vehicle-tax/" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vehicle Tax Calculator Nepal (2083/84)",
    "description": "Calculate vehicle tax, bike tax, bluebook renewal fees, EV road tax and EV import duty in Nepal using FY 2083/84 rates.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".quick-answer", ".vehicle-tax-summary"]
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "name": "Vehicle Tax Calculator Nepal",
    "description": "Calculate Nepal vehicle tax, bluebook renewal fees, EV import duty, insurance estimates and late penalties for FY 2083/84.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nepal Vehicle Tax Rates 2083/84",
    "description": "Official vehicle tax slabs used in Nepal Vehicle Tax Calculator for motorcycles, cars, electric vehicles and commercial vehicles in Nepal.",
    "url": "https://nepacalc.com/calculator/nepal-vehicle-tax/",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "Department of Transport Management (DOTM) Nepal"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Vehicle Tax Calculator Nepal (2083/84)",
    "author": {
      "@type": "Organization",
      "name": "NepaCalc"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Renew Bluebook in Nepal",
    "description": "Step-by-step guide to renewing your vehicle bluebook at a Transport Management Office in Nepal.",
    "step": [
      { "@type": "HowToStep", "name": "Pay Annual Road Tax", "text": "Pay your annual road tax at the Provincial Transport Management Office or online via eSewa, Khalti, ConnectIPS or the Nagarik App." },
      { "@type": "HowToStep", "name": "Get Bluebook Renewal Fee Receipt", "text": "Pay the mandatory annual renewal fee (Rs. 300 for bikes, Rs. 500 for four-wheelers)." },
      { "@type": "HowToStep", "name": "Get Third-party Insurance Certificate", "text": "Obtain a valid third-party insurance certificate from a Beema Samiti regulated insurer." },
      { "@type": "HowToStep", "name": "Get Pollution Certificate", "text": "Get your vehicle's pollution check certificate from an authorised pollution testing centre." },
      { "@type": "HowToStep", "name": "Visit Transport Management Office", "text": "Bring original bluebook, citizenship copy, insurance certificate, pollution certificate and tax payment receipts to your local Yatayat Karyalaya." },
      { "@type": "HowToStep", "name": "Collect Renewal Stamp", "text": "Collect the physical renewal stamp on your bluebook from the TMO." }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the vehicle tax in Nepal for FY 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act." } },
      { "@type": "Question", "name": "How much is EV road tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Annual EV road tax in Nepal for FY 2083/84: 10–50 kW pays Rs. 5,000, 51–125 kW pays Rs. 15,000, 126–200 kW pays Rs. 20,000, and above 200 kW pays Rs. 30,000 annually. Public and commercial EVs receive a 50% statutory discount. Note: this is the annual road tax (Bluebook renewal) and is separate from EV import duties." } },
      { "@type": "Question", "name": "What changed in EV taxation under Budget 2083/84?", "acceptedAnswer": { "@type": "Answer", "text": "The Budget 2083/84 made a major change: Excise Duty on EVs is now 0%. A new Clean Infrastructure Investment Fee (CIIF) was introduced, which is value-based (applied on CIF value). Customs Duty remains at 20% of CIF value. This replaced the previous excise-based structure." } },
      { "@type": "Question", "name": "What is the Clean Infrastructure Investment Fee (CIIF)?", "acceptedAnswer": { "@type": "Answer", "text": "The Clean Infrastructure Investment Fee (CIIF) is a value-based fee introduced in Budget 2083/84 for EV imports. It replaces the previous excise duty structure. The applicable percentage depends on the imported vehicle's CIF value: 2.5% for up to Rs. 20 lakh, 7.5% for Rs. 20–30 lakh, 15% for Rs. 30–40 lakh, 70% for Rs. 40–50 lakh, and 112.5% above Rs. 50 lakh." } },
      { "@type": "Question", "name": "Is EV import duty different from Bluebook renewal tax?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EV Import Duty is a one-time tax paid when the vehicle is imported into Nepal. It includes Customs Duty (20% of CIF) and the Clean Infrastructure Investment Fee. Bluebook renewal tax (annual road tax) is paid every year and is based on motor power (kW). These are two completely separate taxes." } },
      { "@type": "Question", "name": "How is vehicle tax calculated in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Vehicle tax in Nepal is calculated based on engine capacity (CC) for combustion vehicles or motor power (kW) for EVs. The annual tax amount is determined by the applicable slab under the Bagmati Province Finance Act. Add the renewal fee (Rs. 300–500), third-party insurance, pollution certificate, and any late penalty to get your total Bluebook renewal cost." } },
      { "@type": "Question", "name": "What is the tax on a Duke 200 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax for a Duke 200 in Nepal is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a Bullet 350 in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 mandatory renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84." } },
      { "@type": "Question", "name": "What is the tax on a 150cc bike in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Most 150cc motorcycles fall under the 126–150 CC slab and pay Rs. 5,000 annual road tax plus renewal charges." } },
      { "@type": "Question", "name": "How much is bike tax in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "Bike tax in Nepal for FY 2083/84 ranges from Rs. 3,000 for motorcycles up to 125cc, Rs. 5,000 for 150cc bikes, Rs. 6,500 for 225cc bikes, Rs. 12,000 for bikes up to 400cc, Rs. 25,000 for bikes up to 650cc, and Rs. 35,000 for motorcycles above 650cc. A mandatory renewal fee of Rs. 300 applies to all categories." } },
      { "@type": "Question", "name": "How do I renew my bluebook in Nepal?", "acceptedAnswer": { "@type": "Answer", "text": "To renew your bluebook in Nepal, pay your annual road tax at your local Transport Management Office (Yatayat Karyalaya) or online via eSewa, Khalti, MyPay, ConnectIPS or the Nagarik App. Present a valid third-party insurance certificate, pollution check certificate, and your original bluebook. Pay the mandatory renewal fee. Collect the physical renewal stamp from the TMO." } },
      { "@type": "Question", "name": "What is the penalty for late bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "After the 90-day grace period: 5% for 1–30 days late, 10% for 31–45 days late, 20% for 46 days to end of fiscal year. For multi-year delays: 32% per year compounding, capped at 4 fiscal years. The renewal fee also doubles after the grace period expires." } },
      { "@type": "Question", "name": "Does vehicle tax differ by province?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. This calculator uses Bagmati Province FY 2083/84 rates. Bagmati Province (Kathmandu) generally applies higher rates than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya." } },
      { "@type": "Question", "name": "How can I check my vehicle tax online?", "acceptedAnswer": { "@type": "Answer", "text": "You can estimate your vehicle tax online using the Nepal Vehicle Tax Calculator on this page. For official records, visit the Transport Management Information System (TMIS) at dotm.gov.np or your provincial transport office portal." } },
      { "@type": "Question", "name": "Can I pay vehicle tax through eSewa?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. In many provinces including Bagmati, vehicle tax can be paid online through eSewa. After payment, you must still visit the TMO to collect the physical bluebook renewal stamp." } },
      { "@type": "Question", "name": "Can I pay vehicle tax using Khalti?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Khalti is an accepted payment method for vehicle tax in many provinces. After online payment, visit the local Yatayat Karyalaya with payment proof to get your bluebook stamped." } },
      { "@type": "Question", "name": "Can I renew bluebook after 4 years?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but penalties are heavy. DoTM caps the back-tax at 4 fiscal years, with a 32% penalty per year compounding on the base road tax. The renewal fee also doubles. All pending taxes and penalties must be cleared before renewal is processed." } },
      { "@type": "Question", "name": "How is EV road tax different from EV import duty?", "acceptedAnswer": { "@type": "Answer", "text": "EV road tax (annual Bluebook renewal) is a recurring annual tax based on motor power (kW) and is paid at the Transport Management Office every year. EV import duty is a one-time customs charge paid when the vehicle enters Nepal, calculated on the CIF value and comprising Customs Duty (20%) plus the Clean Infrastructure Investment Fee (CIIF)." } },
      { "@type": "Question", "name": "Can I transfer vehicle ownership with unpaid tax?", "acceptedAnswer": { "@type": "Answer", "text": "No. The Department of Transport Management (DOTM) requires a fully clean tax record before approving a Naam Sari (vehicle ownership transfer). All pending road tax, penalties and renewal charges must be cleared before ownership can be legally transferred to a new owner." } },
      { "@type": "Question", "name": "Is third-party insurance mandatory for bluebook renewal?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles in Nepal. The TMO (Yatayat Karyalaya) will not process your bluebook renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars." } },
      { "@type": "Question", "name": "Is vehicle tax different across Nepal's provinces?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each of Nepal's seven provincial governments sets its own vehicle tax rates through annual Finance Acts. Bagmati Province (Kathmandu) generally applies a higher baseline than provinces like Koshi or Madhesh. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at dotm.gov.np." } }
    ]
  };

  return (
    <>
      <link rel="canonical" href="https://nepacalc.com/calculator/nepal-vehicle-tax/" />
      <meta property="og:title" content="Vehicle Tax Calculator Nepal (2083/84)" />
      <meta property="og:description" content="Calculate vehicle tax, bluebook renewal charges, EV road tax and EV import duty in Nepal using latest FY 2083/84 rates." />
      <meta property="og:image" content="https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp" />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vehicle Tax Calculator Nepal (2083/84)" />
      <meta name="twitter:description" content="Calculate vehicle tax, bluebook renewal charges, EV road tax and EV import duty in Nepal using latest FY 2083/84 rates." />
      <meta name="twitter:image" content="https://nepacalc.com/assets/images/vehicle-tax-calculator-nepal-2083-84.webp" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h1 className="sr-only">Vehicle Tax Calculator Nepal (2083/84)</h1>

      <Calculator />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          
          {/* ── Badges ── */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">FY 2083/84 Budget Update</span>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Bagmati Province</span>
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Official DoTM-based Rates</span>
            <span className="text-sm text-slate-600 font-medium">Last reviewed: Ashadh 2083 (June 2026) using the latest Department of Transport Management (DoTM) and Bagmati Province Finance Act.</span>
          </div>

          <p className="text-lg leading-relaxed mb-10">
            Calculate vehicle tax, bluebook renewal charges, road tax penalties and electric vehicle tax using the latest Nepal vehicle tax rates for FY 2083/84. This Vehicle Tax Calculator Nepal supports motorcycles, scooters, cars, jeeps, buses, trucks and EVs using guidelines set by the <a href="https://www.dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Transport Management (DOTM)</a> and the Bagmati Province Finance Act. If you are a salaried employee or business owner, use our <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Calculator</Link> to estimate your annual income tax liability alongside your vehicle ownership costs.
          </p>

          {/* ── Table of Contents ── */}
          <div className="bg-slate-50 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="list-none pl-0 space-y-2 text-blue-600 font-medium">
              <li><a href="#whats-new" className="hover:underline">What's New in Vehicle Tax 2083/84?</a></li>
              <li><a href="#quick-answer" className="hover:underline">Vehicle Tax In Nepal 2083/84 — Quick Reference</a></li>
              <li><a href="#annual-road-tax" className="hover:underline">Annual Vehicle Tax (Bluebook Renewal)</a></li>
              <li><a href="#how-calculated" className="hover:underline">How Vehicle Tax Works in Nepal</a></li>
              <li><a href="#popular-searches" className="hover:underline">Popular Vehicle Tax Searches</a></li>
              <li><a href="#bike-tax" className="hover:underline">Motorcycle Road Tax Nepal</a></li>
              <li><a href="#car-tax" className="hover:underline">Private Car Road Tax Nepal</a></li>
              <li><a href="#ev-annual-tax" className="hover:underline">Electric Vehicle Tax Nepal (Annual)</a></li>
              <li><a href="#ev-import-tax" className="hover:underline">EV Import Tax Nepal (2083/84)</a></li>
              <li><a href="#commercial-tax" className="hover:underline">Commercial Vehicle Tax Nepal</a></li>
              <li><a href="#province-note" className="hover:underline">Vehicle Tax by Province</a></li>
              <li><a href="#bluebook-renewal" className="hover:underline">Bluebook Renewal Cost Breakdown</a></li>
              <li><a href="#penalty" className="hover:underline">Late Penalty Explained</a></li>
              <li><a href="#payment-locations" className="hover:underline">Where Can I Pay Vehicle Tax?</a></li>
              <li><a href="#faq" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* ── What's New ── */}
          <h2 id="whats-new" className="text-2xl font-black text-slate-900 mt-10 mb-6">What's New in Vehicle Tax 2083/84?</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <p className="mb-3">The Government of Nepal introduced several vehicle taxation updates for FY 2083/84. While annual provincial road tax slabs remain largely unchanged for motorcycles and private vehicles, major changes were made to electric vehicle imports.</p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Excise Duty on EVs: 0%</strong> — Excise duty has been completely removed for electric vehicles.</li>
              <li><strong>Clean Infrastructure Investment Fee (CIIF)</strong> — A new value-based fee now applies to EV imports based on the vehicle's CIF value, replacing the previous excise-based structure.</li>
              <li><strong>Customs Duty: 20%</strong> — Flat customs duty on the CIF value remains applicable for EV imports.</li>
              <li><strong>Annual Road Tax Slabs</strong> — Motorcycle and private car annual road tax slabs remain unchanged for FY 2083/84.</li>
            </ul>
            <p className="mt-3">This calculator reflects the latest Bagmati Province vehicle tax rates together with current EV import regulations under Budget 2083/84.</p>
          </div>

          {/* ── Quick Answer ── */}
          <h2 id="quick-answer" className="text-2xl font-black text-slate-900 mt-12 mb-6">Vehicle Tax In Nepal 2083/84 — Quick Reference</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 quick-answer">
            <ul className="list-disc pl-4 space-y-2">
              <li>Motorcycle road tax starts from <strong>Rs. 3,000</strong> per year (up to 125cc).</li>
              <li>Private cars with engine capacity up to 1000 CC pay <strong>Rs. 22,000</strong> annually under Bagmati Province rates.</li>
              <li>Annual EV road tax starts from <strong>Rs. 5,000</strong>, while import charges depend on CIF value and the applicable Clean Infrastructure Investment Fee.</li>
              <li>Bluebook renewal requires valid third-party insurance and a pollution certificate.</li>
              <li>After the 90-day grace period, late renewal penalties start at 5% and can reach 32% per year.</li>
              <li>Vehicle tax rates differ across Nepal's seven provinces. This calculator uses Bagmati Province rates.</li>
            </ul>
          </div>

          {/* ── Two Different Taxes Separation ── */}
          <h2 id="annual-road-tax" className="text-2xl font-black text-slate-900 mt-12 mb-4">Annual Vehicle Tax (Bluebook Renewal)</h2>
          <div className="vehicle-tax-summary mb-6">
            <p className="mb-3">Annual Vehicle Tax is the recurring yearly tax that every vehicle owner in Nepal must pay to renew their bluebook (Vehicle Registration Certificate). It is collected by provincial governments and is based on vehicle type, engine capacity (CC) or motor power (kW).</p>
            <p className="mb-3">This is <strong>not</strong> the same as EV import duty. Annual road tax applies to all registered vehicles — petrol, diesel and electric — every fiscal year.</p>
          </div>

          {/* ── How Vehicle Tax Works ── */}
          <h2 id="how-calculated" className="text-2xl font-black text-slate-900 mt-12 mb-6">How Vehicle Tax Works in Nepal</h2>
          <div className="vehicle-tax-summary mb-8">
            <p className="mb-4">Vehicle owners in Nepal pay the following costs during each annual bluebook renewal:</p>
            <div className="bg-slate-50 p-5 rounded-lg font-mono text-sm space-y-2 mb-4">
              <p>1. Annual Road Tax → Based on CC / kW / Seats / Tonnes</p>
              <p>2. Bluebook Renewal Fee → Rs. 300 (bikes) / Rs. 500 (four-wheelers)</p>
              <p>3. Third-party Insurance → Approx. Rs. 2,200–8,000 depending on vehicle</p>
              <p>4. Pollution Certificate → Approx. Rs. 400</p>
              <p>5. Late Penalty (if applicable) → 5% to 32% per year after 90-day grace period</p>
              <p className="font-bold mt-2">Total Renewal Cost = All of the above combined</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm space-y-4">
              <p><strong>Formula:</strong><br />Annual Vehicle Tax = Base Road Tax + Renewal Fee + Penalty (if applicable)</p>
              <p><strong>For overdue renewals:</strong><br />Total Payable = Annual Tax × Pending Years (max 4) + Penalty + Renewal Charges</p>
            </div>
          </div>

          {/* ── Popular Searches ── */}
          <h2 id="popular-searches" className="text-2xl font-black text-slate-900 mt-12 mb-6">Popular Vehicle Tax Searches in Nepal</h2>
          <p className="mb-4 text-slate-600">These are the most commonly searched vehicle tax queries. Use the calculator above to get the exact amount for your vehicle.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 not-prose">

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="font-bold text-base text-slate-900 mb-1">🏍️ Motorcycles</h3>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>Honda Shine (125cc) → Rs. 3,000</li>
                <li>Honda Unicorn (150cc) → Rs. 5,000</li>
                <li>Pulsar 150 / FZ → Rs. 5,000</li>
                <li>Pulsar NS200 / Apache RTR → Rs. 6,500</li>
                <li>Yamaha FZ (149cc) → Rs. 5,000</li>
                <li>Ntorq / Activa / Scooty → Rs. 3,000</li>
                <li>Suzuki Access (125cc) → Rs. 3,000</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="font-bold text-base text-slate-900 mb-1">🏍️ Mid & Large Bikes</h3>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>Duke 200 / Duke 250 → Rs. 6,500</li>
                <li>Duke 390 → Rs. 12,000</li>
                <li>Royal Enfield Classic 350 → Rs. 12,000</li>
                <li>Royal Enfield Hunter 350 → Rs. 12,000</li>
                <li>KTM Duke 250 → Rs. 6,500</li>
                <li>Himalayan 411 → Rs. 12,000</li>
                <li>Interceptor 650 → Rs. 25,000</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="font-bold text-base text-slate-900 mb-1">🚗 Cars (Annual Tax)</h3>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>Hyundai Venue (1197cc) → Rs. 25,000</li>
                <li>Hyundai Creta (1497cc) → Rs. 25,000</li>
                <li>Suzuki Brezza (1462cc) → Rs. 25,000</li>
                <li>Toyota Hilux (2755cc) → Rs. 50,000</li>
                <li>Mahindra Scorpio (2179cc) → Rs. 37,000</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="font-bold text-base text-slate-900 mb-1">⚡ EVs (Annual Road Tax)</h3>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>BYD Atto 3 (150 kW) → Rs. 20,000</li>
                <li>MG ZS EV (105 kW) → Rs. 15,000</li>
                <li>Hyundai Ioniq 5 (225 kW) → Rs. 30,000</li>
                <li>Nexon EV (127 kW) → Rs. 20,000</li>
                <li>E-Scooter / E-Bike → Rs. 2,500</li>
              </ul>
            </div>

          </div>

          {/* ── Bike Tax Table ── */}
          <h2 id="bike-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Motorcycle Road Tax Nepal (FY 2083/84)</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Engine Capacity</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Road Tax</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Common Bikes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to 125 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 3,000</td><td className="py-2 px-4 border-b text-slate-500">Activa, Ntorq, Honda Shine</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">126–150 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 5,000</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Pulsar 150, FZ, Unicorn</td></tr>
                <tr><td className="py-2 px-4 border-b">151–225 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 6,500</td><td className="py-2 px-4 border-b text-slate-500">Duke 200, Apache RTR 200</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">226–400 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 12,000</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Duke 390, RE Classic 350, Himalayan</td></tr>
                <tr><td className="py-2 px-4 border-b">401–650 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 25,000</td><td className="py-2 px-4 border-b text-slate-500">Interceptor 650</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Above 650 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 35,000</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Superbikes</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 text-sm mt-3">If you own an electric vehicle, estimate your charging costs using the <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline">NEA Bill Calculator</Link>.</p>
          </div>

          {/* ── Car Tax ── */}
          <h2 id="car-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Private Car Road Tax Nepal (FY 2083/84)</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Engine Capacity</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Road Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to 1000 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 22,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">1001–1500 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 25,000</td></tr>
                <tr><td className="py-2 px-4 border-b">1501–2000 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 27,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">2001–2500 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 37,000</td></tr>
                <tr><td className="py-2 px-4 border-b">2501–3000 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 50,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">3001–3500 CC</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 65,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Above 3500 CC</td><td className="py-2 px-4 border-b font-bold">Rs. 70,000</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 text-sm mt-3">If you are financing your vehicle, estimate repayments with the <Link href="/calculator/nepal-home-loan/" className="text-blue-600 hover:underline">Home Loan EMI Calculator</Link> or <Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">Loan EMI Calculator</Link>.</p>
          </div>

          {/* ── EV Annual Road Tax ── */}
          <h2 id="ev-annual-tax" className="text-2xl font-black text-slate-900 mt-12 mb-4">Electric Vehicle Tax Nepal — Annual Road Tax</h2>
          <p className="mb-4 text-slate-600">Annual road tax for electric vehicles is calculated based on motor power (kW). This is the recurring Bluebook renewal tax paid every year — it is <strong>separate from</strong> EV import duties. If you charge your EV at home, check the <Link href="/electricity/nepal-unit-price/" className="text-blue-600 hover:underline">Electricity Unit Price in Nepal</Link> to estimate your running costs.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Motor Power</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Road Tax</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">E-Bike / E-Scooter (flat)</td><td className="py-2 px-4 border-b font-bold">Rs. 2,500</td><td className="py-2 px-4 border-b text-slate-500">All electric two-wheelers</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">10–50 kW</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 5,000</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Compact EVs</td></tr>
                <tr><td className="py-2 px-4 border-b">51–125 kW</td><td className="py-2 px-4 border-b font-bold">Rs. 15,000</td><td className="py-2 px-4 border-b text-slate-500">Mid-range EVs (MG ZS EV)</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">126–200 kW</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 20,000</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">BYD Atto 3, Nexon EV</td></tr>
                <tr><td className="py-2 px-4 border-b">Above 200 kW</td><td className="py-2 px-4 border-b font-bold">Rs. 30,000</td><td className="py-2 px-4 border-b text-slate-500">Premium EVs (Ioniq 5)</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 text-sm">Note: Public and commercial EVs receive a 50% statutory discount on annual road tax.</p>
          </div>

          {/* ── EV Import Tax ── */}
          <h2 id="ev-import-tax" className="text-2xl font-black text-slate-900 mt-12 mb-4">EV Import Tax Nepal (2083/84)</h2>
          <p className="mb-4">FY 2083/84 introduced a major change to electric vehicle taxation in Nepal. Instead of calculating import taxes primarily using motor power (kW), the Government introduced a value-based import system for electric vehicles. The EV Import Duty Calculator on this page estimates customs duty and the Clean Infrastructure Investment Fee (CIIF) using the latest budget structure.</p>
          <p className="mb-4">If you are importing an EV, check the <Link href="/market-rates/exchange-rate-nepal/" className="text-blue-600 hover:underline">Live USD to NPR Exchange Rate</Link> before calculating your CIF costs, since most EV invoices are denominated in USD.</p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">What Changed in Budget 2083/84?</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Tax Component</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">FY 2083/84</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Customs Duty</td><td className="py-2 px-4 border-b font-bold text-orange-600">20% of CIF Value</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Excise Duty</td><td className="py-2 px-4 border-b bg-slate-50 font-bold text-green-600">0% (Abolished)</td></tr>
                <tr><td className="py-2 px-4 border-b">Clean Infrastructure Investment Fee (CIIF)</td><td className="py-2 px-4 border-b font-bold text-blue-600">Value-Based (Tiered)</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">VAT</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Applicable</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Clean Infrastructure Investment Fee (CIIF) Tiers</h3>
          <p className="mb-4">The Clean Infrastructure Investment Fee replaces the previous EV excise-based structure. The applicable percentage depends on the imported vehicle's CIF value.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">CIF Value (NPR)</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Customs Duty</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">CIIF Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Up to Rs. 20 Lakh</td><td className="py-2 px-4 border-b">20%</td><td className="py-2 px-4 border-b font-bold text-green-600">2.5%</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Rs. 20–30 Lakh</td><td className="py-2 px-4 border-b bg-slate-50">20%</td><td className="py-2 px-4 border-b bg-slate-50 font-bold text-orange-500">7.5%</td></tr>
                <tr><td className="py-2 px-4 border-b">Rs. 30–40 Lakh</td><td className="py-2 px-4 border-b">20%</td><td className="py-2 px-4 border-b font-bold text-orange-600">15%</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Rs. 40–50 Lakh</td><td className="py-2 px-4 border-b bg-slate-50">20%</td><td className="py-2 px-4 border-b bg-slate-50 font-bold text-red-600">70%</td></tr>
                <tr><td className="py-2 px-4 border-b">Above Rs. 50 Lakh</td><td className="py-2 px-4 border-b">20%</td><td className="py-2 px-4 border-b font-bold text-red-700">112.5%</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 text-sm mt-2">Note: CIIF is applied on the full CIF value. Excise duty is 0% for EVs under Budget 2083/84. VAT is applicable and dealer margins are additional.</p>
          </div>

          {/* ── Commercial Vehicle ── */}
          <h2 id="commercial-tax" className="text-2xl font-black text-slate-900 mt-12 mb-6">Commercial Vehicle Tax Nepal</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Vehicle Category</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Annual Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Taxi (up to 1500 CC)</td><td className="py-2 px-4 border-b font-bold">Rs. 4,000 – Rs. 6,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Microbus (1–14 seats)</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 8,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Minibus (15–25 seats)</td><td className="py-2 px-4 border-b font-bold">Rs. 12,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Medium Bus (26–35 seats)</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 18,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Large Bus (36+ seats)</td><td className="py-2 px-4 border-b font-bold">Rs. 35,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Small Truck (up to 3 tonnes)</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 10,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Medium Truck (3–5 tonnes)</td><td className="py-2 px-4 border-b font-bold">Rs. 15,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Heavy Goods (5–10 tonnes)</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 25,000</td></tr>
                <tr><td className="py-2 px-4 border-b">Heavy Truck / Lorry (above 10 tonnes)</td><td className="py-2 px-4 border-b font-bold">Rs. 35,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Agricultural Tractor / Three-Wheeler</td><td className="py-2 px-4 border-b bg-slate-50 font-bold">Rs. 3,000</td></tr>
              </tbody>
            </table>
            <p className="text-slate-600 text-sm">Note: Commercial vehicle operators should be aware that certain payments in the transport sector may be subject to TDS. Use our <Link href="/calculator/nepal-tds/" className="text-blue-600 hover:underline">Nepal TDS Calculator</Link> to verify withholding obligations.</p>
          </div>

          {/* ── Province Note ── */}
          <h2 id="province-note" className="text-2xl font-black text-slate-900 mt-12 mb-4">Vehicle Tax by Province</h2>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-8">
            <p className="mb-2">Vehicle tax in Nepal is administered by provincial governments. Each of Nepal's seven provinces sets its own annual road tax rates through Finance Acts.</p>
            <p className="mb-2">This calculator currently uses <strong>Bagmati Province FY 2083/84 rates</strong>, which apply to vehicles registered in Kathmandu, Lalitpur, Bhaktapur and other districts within Bagmati Province.</p>
            <p>Other provinces such as Koshi, Madhesh, Gandaki, Lumbini, Karnali and Sudurpashchim may have slightly different renewal amounts. Vehicle owners outside Bagmati should verify their exact rates at their local Yatayat Karyalaya or at <a href="https://dotm.gov.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dotm.gov.np</a>.</p>
          </div>

          {/* ── Bluebook Renewal Cost Breakdown ── */}
          <h2 id="bluebook-renewal" className="text-2xl font-black text-slate-900 mt-12 mb-4">Bluebook Renewal Cost Breakdown</h2>
          <p className="mb-4">The total Bluebook renewal cost in Nepal consists of multiple components. The calculator combines all of these automatically:</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Component</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Description</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Approx. Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b font-medium">Annual Road Tax</td><td className="py-2 px-4 border-b text-slate-500">Government provincial tax by CC/kW</td><td className="py-2 px-4 border-b">Rs. 3,000–70,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50 font-medium">Renewal Fee</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Mandatory annual bluebook renewal charge</td><td className="py-2 px-4 border-b bg-slate-50">Rs. 300–500</td></tr>
                <tr><td className="py-2 px-4 border-b font-medium">Third-party Insurance</td><td className="py-2 px-4 border-b text-slate-500">Legally mandatory Beema Samiti insurance</td><td className="py-2 px-4 border-b">Rs. 2,200–8,000</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50 font-medium">Pollution Certificate</td><td className="py-2 px-4 border-b bg-slate-50 text-slate-500">Emission test at authorised centre</td><td className="py-2 px-4 border-b bg-slate-50">Approx. Rs. 400</td></tr>
                <tr><td className="py-2 px-4 border-b font-medium">Late Penalty</td><td className="py-2 px-4 border-b text-slate-500">Only if renewal is past 90-day grace period</td><td className="py-2 px-4 border-b">5% to 32% per year</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4">Required documents for Bluebook renewal:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>✔ Original Bluebook (Vehicle Registration Certificate)</li>
            <li>✔ Citizenship Copy</li>
            <li>✔ Valid Third-party Insurance Certificate</li>
            <li>✔ Pollution Certificate</li>
            <li>✔ Previous Tax Clearance (if applicable)</li>
            <li>✔ Annual Renewal Fee Payment Receipt</li>
          </ul>

          {/* ── Penalty Breakdown ── */}
          <h2 id="penalty" className="text-2xl font-black text-slate-900 mt-12 mb-4">Late Penalty for Bluebook Renewal — Explained</h2>
          <p className="mb-4">After the 90-day grace period from the fiscal year start, late renewal penalties apply progressively:</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-slate-200 mb-2">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Delay Period</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Penalty on Base Tax</th>
                  <th className="py-3 px-4 border-b text-left font-bold text-slate-700">Renewal Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-2 px-4 border-b">Within 90-day grace period</td><td className="py-2 px-4 border-b text-green-600 font-bold">No Penalty</td><td className="py-2 px-4 border-b">Standard rate</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">1–30 days past grace</td><td className="py-2 px-4 border-b bg-slate-50 text-orange-500 font-bold">5%</td><td className="py-2 px-4 border-b bg-slate-50">Doubled</td></tr>
                <tr><td className="py-2 px-4 border-b">31–45 days past grace</td><td className="py-2 px-4 border-b text-orange-600 font-bold">10%</td><td className="py-2 px-4 border-b">Doubled</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">46 days to fiscal year end</td><td className="py-2 px-4 border-b bg-slate-50 text-red-500 font-bold">20%</td><td className="py-2 px-4 border-b bg-slate-50">Doubled</td></tr>
                <tr><td className="py-2 px-4 border-b">1 full fiscal year late</td><td className="py-2 px-4 border-b text-red-600 font-bold">32% per year</td><td className="py-2 px-4 border-b">Doubled</td></tr>
                <tr><td className="py-2 px-4 border-b bg-slate-50">Maximum (4+ years)</td><td className="py-2 px-4 border-b bg-slate-50 text-red-700 font-bold">Capped at 4 fiscal years</td><td className="py-2 px-4 border-b bg-slate-50">Doubled</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── Payment Locations ── */}
          <h2 id="payment-locations" className="text-2xl font-black text-slate-900 mt-12 mb-4">Where Can I Pay Vehicle Tax in Nepal?</h2>
          <p className="mb-4">Vehicle tax in Nepal can be paid through:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provincial Transport Management Offices (Yatayat Karyalaya)</li>
            <li>Department of Transport Management (DOTM)</li>
            <li>Authorized banks and financial institutions</li>
            <li>eSewa (where available)</li>
            <li>Khalti (where available)</li>
            <li>ConnectIPS (where available)</li>
            <li>Nagarik App (Government-promoted digital payment)</li>
          </ul>
          <p className="mb-8 italic text-slate-500">Availability may vary by province. After online payment, you must still visit the local Yatayat Karyalaya to collect the physical bluebook renewal stamp.</p>

          {/* ── Internal Links (Contextual) ── */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-6 mb-8 not-prose">
            <h3 className="font-bold text-slate-900 mb-3 text-base">Related Tools</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>🔌 If you own an electric vehicle, estimate your charging costs using the <Link href="/calculator/nea-bill/" className="text-blue-600 font-bold hover:underline">NEA Bill Calculator</Link>.</li>
              <li>💱 If you are importing an EV, check the <Link href="/market-rates/exchange-rate-nepal/" className="text-blue-600 font-bold hover:underline">USD to NPR Exchange Rate</Link> before calculating CIF costs.</li>
              <li>🏦 If you're financing your vehicle, estimate repayments with the <Link href="/calculator/nepal-home-loan/" className="text-blue-600 font-bold hover:underline">Home Loan EMI Calculator</Link> or <Link href="/calculator/loan-emi/" className="text-blue-600 font-bold hover:underline">Loan EMI Calculator</Link>.</li>
              <li>🏠 If purchasing property alongside your vehicle, calculate taxes using the <Link href="/calculator/property-tax/" className="text-blue-600 font-bold hover:underline">Property Tax Calculator</Link>.</li>
              <li>💼 If you're budgeting your annual income, use the <Link href="/calculator/nepal-salary/" className="text-blue-600 font-bold hover:underline">Nepal Salary Calculator</Link> and <Link href="/calculator/nepal-income-tax/" className="text-blue-600 font-bold hover:underline">Nepal Income Tax Calculator</Link>.</li>
            </ul>
          </div>

          {/* ── FAQ Section ── */}
          <h2 id="faq" className="text-2xl font-black text-slate-900 mt-16 mb-8 pt-8 border-t">Vehicle Tax FAQ (2083/84)</h2>
          <div className="space-y-6 mb-12">
            <div><h3 className="font-bold text-lg text-slate-900">What is the vehicle tax in Nepal for FY 2083/84?</h3><p className="text-slate-600 mt-1">For FY 2083/84, motorcycles pay Rs. 3,000–35,000 depending on engine CC. Private cars pay Rs. 22,000–70,000 depending on CC. Electric vehicles pay Rs. 5,000–30,000 based on motor power (kW). Commercial vehicles are assessed by seating capacity or carrying weight under the Bagmati Province Finance Act.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How much is EV road tax in Nepal?</h3><p className="text-slate-600 mt-1">Annual EV road tax starts from Rs. 5,000 for 10–50 kW vehicles, Rs. 15,000 for 51–125 kW, Rs. 20,000 for 126–200 kW, and Rs. 30,000 above 200 kW. This is the annual Bluebook renewal tax and is separate from EV import duties.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What changed in EV taxation under Budget 2083/84?</h3><p className="text-slate-600 mt-1">The Budget 2083/84 abolished Excise Duty on EVs (now 0%) and introduced a new Clean Infrastructure Investment Fee (CIIF) which is value-based on the CIF value of the imported vehicle. Customs Duty remains at 20%.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the Clean Infrastructure Investment Fee (CIIF)?</h3><p className="text-slate-600 mt-1">The CIIF is a value-based fee on EV imports introduced in Budget 2083/84. It ranges from 2.5% (up to Rs. 20 lakh CIF) to 112.5% (above Rs. 50 lakh CIF). It replaced the previous excise duty structure for EVs.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Is EV import duty different from Bluebook renewal tax?</h3><p className="text-slate-600 mt-1">Yes. EV import duty is a one-time charge paid when importing the vehicle (Customs Duty + CIIF). Bluebook renewal tax is a recurring annual road tax based on motor power (kW), paid every year.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a Duke 200 in Nepal?</h3><p className="text-slate-600 mt-1">A KTM Duke 200 has a 199cc engine, placing it in the 151–225 CC slab. The annual road tax is Rs. 6,500 plus a mandatory renewal fee of Rs. 300, totalling Rs. 6,800 before insurance for FY 2083/84.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the tax on a Bullet 350 in Nepal?</h3><p className="text-slate-600 mt-1">A Royal Enfield Bullet 350 has a 349cc engine, placing it in the 226–400 CC slab. The annual road tax is Rs. 12,000 plus a Rs. 300 renewal fee, totalling Rs. 12,300 before insurance for FY 2083/84.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How do I calculate vehicle tax in Nepal?</h3><p className="text-slate-600 mt-1">Vehicle tax is calculated using engine capacity (CC) for combustion vehicles or motor power (kW) for EVs. Select your vehicle category, enter the capacity, and apply the FY 2083/84 Bagmati Province slab rate. Add renewal fee, third-party insurance, and pollution check to get the total Bluebook renewal cost.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How can I check my vehicle tax online?</h3><p className="text-slate-600 mt-1">You can estimate vehicle tax using the Nepal Vehicle Tax Calculator on this page. For official records, visit dotm.gov.np or your provincial transport office portal.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I pay vehicle tax through eSewa?</h3><p className="text-slate-600 mt-1">Yes. eSewa is an accepted payment method for vehicle tax in many provinces. After payment, visit the local Yatayat Karyalaya with payment proof to get your bluebook stamped.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I pay vehicle tax using Khalti?</h3><p className="text-slate-600 mt-1">Yes. Khalti is also accepted in many provinces. After online payment, visit the TMO with payment confirmation to receive the physical renewal stamp on your bluebook.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I renew bluebook after 4 years?</h3><p className="text-slate-600 mt-1">Yes, but penalties compound at 32% per year and DoTM caps back-tax at 4 fiscal years. The renewal fee also doubles. All pending taxes and penalties must be cleared before the renewal is processed.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Does vehicle tax differ by province?</h3><p className="text-slate-600 mt-1">Yes. Each of Nepal's seven provinces sets its own rates. This calculator uses Bagmati Province FY 2083/84 rates. Owners outside Bagmati should verify their rates at their local Yatayat Karyalaya.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">What is the penalty for late bluebook renewal?</h3><p className="text-slate-600 mt-1">After the 90-day grace period: 5% for 1–30 days late, 10% for 31–45 days late, 20% for 46 days to fiscal year end, and 32% per year compounding for multi-year delays — capped at 4 fiscal years.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Can I transfer vehicle ownership with unpaid tax?</h3><p className="text-slate-600 mt-1">No. The DOTM requires a fully clean tax record before approving a Naam Sari (ownership transfer). All pending road tax, penalties and renewal charges must be cleared first.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">Is third-party insurance mandatory for bluebook renewal?</h3><p className="text-slate-600 mt-1">Yes. Third-party insurance regulated by Beema Samiti is legally mandatory for all vehicles. The TMO will not process your renewal without a valid insurance certificate. Annual premiums are approximately Rs. 2,200 for motorcycles and Rs. 4,500–8,000 for private cars. Use our <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Calculator</Link> to understand your disposable income for budgeting these annual costs.</p></div>
            <div><h3 className="font-bold text-lg text-slate-900">How is EV road tax different from EV import duty?</h3><p className="text-slate-600 mt-1">EV road tax is the annual Bluebook renewal tax paid every year based on motor power (kW). EV import duty is a one-time customs charge paid when the vehicle enters Nepal, including Customs Duty (20% of CIF) and the Clean Infrastructure Investment Fee (CIIF).</p></div>
          </div>

          {/* ── Official Government References ── */}
          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-4">Official Government References</h2>
          <p className="mb-4">This calculator uses vehicle tax schedules published by:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><a href="https://www.dotm.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Transport Management (DoTM)</a></li>
            <li>Bagmati Province Finance Act FY 2083/84</li>
            <li><a href="https://www.mof.gov.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ministry of Finance Nepal</a> — Finance Act 2083/84</li>
            <li>Customs Tariff 2083/84 (Nepal Customs)</li>
            <li>Transport Management Information System (TMIS) Nepal</li>
          </ul>

          {/* ── Disclaimer ── */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 text-sm text-slate-600 border border-slate-200">
            <p className="mb-2">This calculator is maintained and updated using publicly available data from the Department of Transport Management (DoTM) and provincial transport offices. Rates are reviewed whenever new fiscal year tax schedules are published.</p>
            <p><strong>Last reviewed:</strong> Ashadh 2083 (June 2026) using the latest Department of Transport Management (DoTM) and Bagmati Province Finance Act.</p>
          </div>

          <div className="sr-only">
            Vehicle Tax Calculator Nepal. Motorcycle Road Tax Nepal. Bluebook Renewal Calculator Nepal. Department of Transport Management. DOTM Nepal. Bagmati Province Vehicle Tax. Vehicle Tax 2083/84. EV Import Tax Nepal. Clean Infrastructure Investment Fee Nepal. CIIF Nepal. Private Car Road Tax Nepal. Commercial Vehicle Tax Nepal. Electric Vehicle Tax Nepal. Bluebook Renewal Charges Nepal.
          </div>

        </div>
      </div>
    </>
  );
}
