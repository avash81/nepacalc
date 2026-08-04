import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nepal Budget 2083/84 (2026/27) — Summary & Analysis | NepaCalc',
  description: "Complete sector-wise summary and analysis of Nepal's Budget for Fiscal Year 2083/84. Covers changes in Income Tax slabs, VAT, Excise Duties, and allocations.",
  keywords: ['Nepal Budget 2083/84', 'Nepal Budget Summary 2026', 'Income Tax Slab Nepal 2083', 'Nepal VAT amendments', 'Nepal Excise duty changes', 'Capital Gains Tax Nepal', 'NepaCalc Budget'],
  alternates: {
    canonical: 'https://nepacalc.com/nepal-budget/',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      "name": "Nepal",
      "item": "https://nepacalc.com/nepal/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Nepal Budget 2083/84 Summary",
      "item": "https://nepacalc.com/nepal-budget/"
    }
  ]
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Nepal Budget 2083/84 — Summary & Sector-Wise Analysis",
  "description": "Complete sector-wise summary and analysis of Nepal's Budget for Fiscal Year 2083/84.",
  "author": {
    "@type": "Organization",
    "name": "NepaCalc"
  },
  "publisher": {
    "@type": "Organization",
    "name": "NepaCalc",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nepacalc.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://nepacalc.com/nepal-budget/"
  }
};

export default function NepalBudgetPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/nepal/" className="hover:text-blue-600 transition-colors">Nepal Tools</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">Budget 2083/84</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            NEPAL BUDGET 2083/84 <br className="hidden md:block"/>
            <span className="text-blue-600">SUMMARY & SECTOR-WISE ANALYSIS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
            Sectors covered: Tourism | Agriculture | Education | Technology & Innovation | Infrastructure | Energy | Industry & Manufacturing
          </p>
        </div>

        {/* Content Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          
          {/* Main Article */}
          <article className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 text-gray-800 leading-relaxed">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">CONTENTS</h2>
            <p className="font-bold mb-2">A. Collection and Application Summary</p>
            <p className="font-bold mb-2">B. Major Highlights</p>
            <p className="font-bold mb-4">C. Sector Wise Summary</p>
            <ol className="list-decimal list-inside space-y-1 mb-10 text-gray-700">
              <li>Information Technology</li>
              <li>Health & Education</li>
              <li>Transportation & Ride Sharing</li>
              <li>Agriculture, Food & Beverages</li>
              <li>Capital Market & Real Estate</li>
              <li>Energy & Manpower</li>
              <li>Amendments in Income Tax Act</li>
              <li>Amendments in Value Added Tax</li>
              <li>Excise Rate Changes</li>
              <li>Tax Reliefs & Concessions</li>
            </ol>

            <hr className="my-10" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">BUDGET COMPARISON (CY VS PY)</h2>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue & Financing Sources</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">SN</th>
                    <th className="px-4 py-3 text-left font-semibold">Source</th>
                    <th className="px-4 py-3 text-left font-semibold">NPR (Billion) 2083/84</th>
                    <th className="px-4 py-3 text-left font-semibold">NPR (Billion) 2082/83</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">Tax Revenue</td><td className="px-4 py-2">1405.31 (66%)</td><td className="px-4 py-2">1315.00 (67%)</td></tr>
                  <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">Loans & Borrowings</td><td className="px-4 py-2">657.29 (31%)</td><td className="px-4 py-2">595.66 (30%)</td></tr>
                  <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">Foreign Grant</td><td className="px-4 py-2">61.74 (3%)</td><td className="px-4 py-2">53.45 (3%)</td></tr>
                  <tr className="bg-gray-50 font-bold"><td className="px-4 py-2"></td><td className="px-4 py-2">Total</td><td className="px-4 py-2">2124.34</td><td className="px-4 py-2">1964.11</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Expenditure & Financing Applications</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">SN</th>
                    <th className="px-4 py-3 text-left font-semibold">Application</th>
                    <th className="px-4 py-3 text-left font-semibold">NPR (Billion) 2083/84</th>
                    <th className="px-4 py-3 text-left font-semibold">NPR (Billion) 2082/83</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">Recurring Expenditure</td><td className="px-4 py-2">1270.58 (60%)</td><td className="px-4 py-2">1180.98 (60%)</td></tr>
                  <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">Capital Expenditure</td><td className="px-4 py-2">431.11 (20%)</td><td className="px-4 py-2">407.89 (21%)</td></tr>
                  <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">Debt Financing</td><td className="px-4 py-2">422.65 (20%)</td><td className="px-4 py-2">375.24 (19%)</td></tr>
                  <tr className="bg-gray-50 font-bold"><td className="px-4 py-2"></td><td className="px-4 py-2">Total</td><td className="px-4 py-2">2124.34</td><td className="px-4 py-2">1964.11</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Expected Economic Growth & Inflation</h3>
            <div className="overflow-x-auto mb-10">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Particulars</th>
                    <th className="px-4 py-3 text-left font-semibold">2083/84 (Expected)</th>
                    <th className="px-4 py-3 text-left font-semibold">Current (2082/83 End)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Economic Growth (%)</td><td className="px-4 py-2">7%</td><td className="px-4 py-2">4.61%</td></tr>
                  <tr><td className="px-4 py-2">Inflation (%)</td><td className="px-4 py-2">6%</td><td className="px-4 py-2">5.44%</td></tr>
                </tbody>
              </table>
            </div>

            <hr className="my-10" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">SECTOR WISE BUDGET ALLOCATION</h2>
            <p className="italic text-gray-500 mb-4">*(Amount in Billion NPR)*</p>
            <div className="overflow-x-auto mb-10">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Sector</th>
                    <th className="px-4 py-3 text-left font-semibold">2083/84</th>
                    <th className="px-4 py-3 text-left font-semibold">2082/83</th>
                    <th className="px-4 py-3 text-left font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Science Technology and Innovation</td><td className="px-4 py-2">4</td><td className="px-4 py-2">–</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                  <tr><td className="px-4 py-2">Industry, Commerce, & Supply</td><td className="px-4 py-2">8</td><td className="px-4 py-2">10</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Labour, Employment and Social Security</td><td className="px-4 py-2">4</td><td className="px-4 py-2">4</td><td className="px-4 py-2 text-gray-500">–</td></tr>
                  <tr><td className="px-4 py-2">Civil Aviation</td><td className="px-4 py-2">3</td><td className="px-4 py-2">–</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                  <tr><td className="px-4 py-2">Culture and Tourism</td><td className="px-4 py-2">7</td><td className="px-4 py-2">13</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Forest, Environment and Climate</td><td className="px-4 py-2">12</td><td className="px-4 py-2">19</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Agriculture and Livestock Development</td><td className="px-4 py-2">47</td><td className="px-4 py-2">58</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Women, Children, Gender and Sexual Minorities</td><td className="px-4 py-2">2</td><td className="px-4 py-2">2</td><td className="px-4 py-2 text-gray-500">–</td></tr>
                  <tr><td className="px-4 py-2">Health</td><td className="px-4 py-2">102</td><td className="px-4 py-2">96</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                  <tr><td className="px-4 py-2">Education</td><td className="px-4 py-2">218</td><td className="px-4 py-2">211</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                  <tr><td className="px-4 py-2">Sports</td><td className="px-4 py-2">4</td><td className="px-4 py-2">6</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Information and Communication</td><td className="px-4 py-2">6</td><td className="px-4 py-2">8</td><td className="px-4 py-2 text-red-600">↓</td></tr>
                  <tr><td className="px-4 py-2">Energy Generation, Distribution and Transmission</td><td className="px-4 py-2">86</td><td className="px-4 py-2">86</td><td className="px-4 py-2 text-gray-500">–</td></tr>
                  <tr><td className="px-4 py-2">Water Supply and Sanitation</td><td className="px-4 py-2">37</td><td className="px-4 py-2">34</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                  <tr><td className="px-4 py-2">Road & Urban Infrastructure Development</td><td className="px-4 py-2">286</td><td className="px-4 py-2">118</td><td className="px-4 py-2 text-green-600">↑</td></tr>
                </tbody>
              </table>
            </div>

            <hr className="my-10" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">MAJOR BUDGET HIGHLIGHTS</h2>
            <ul className="list-decimal list-outside ml-5 space-y-4 mb-10">
              <li>The income tax exemption limit has been raised to <strong>Rs. 10,00,000 (Ten Lakh Rupees)</strong> for individuals, with the maximum rate of personal income tax reduced to <strong>29%</strong> from the previous 39%.</li>
              <li>Government has allocated <strong>Rs. 20,00,00,000 (20 Arba Rupees)</strong> for initial estimated savings. This amount is expected to be generated from the deduction of ministries from previous 22 to now 18; 31 entities to be abolished, 6 merged, 6 transferred, and 18 restructured.</li>
              <li>VAT to be levied <strong>@5%</strong> on electricity consumption over 50 units and on ride-sharing platforms. A high-level advisory committee is to be constituted to study and recommend a multi-VAT rate in the context of Nepal.</li>
              <li>The tax audit period has been fixed at <strong>3 years</strong> (reduced from the previous 4 years). An AI-driven e-assessment system is to be developed for risk-based investigation and audits.</li>
              <li>Excise duty abolished on <strong>360 goods</strong>; custom duty reduced on <strong>273 types of raw materials</strong>, reducing custom duty tiers from 11 to 7. Various custom point taxes have been consolidated into a single <strong>Green Tax</strong>.</li>
              <li>Third-party vehicle insurance raised to <strong>Rs. 1 million</strong>. Customs duties on electric vehicles to be levied on an <strong>ad-valorem basis</strong>, replacing the peak-power-capacity system.</li>
              <li>Businesses with annual transactions above <strong>Rs. 10,00,00,000 (10 Crore Rupees)</strong> issuing electronic invoices must be mandatorily linked to the <strong>Central Billing Monitoring System (CBMS)</strong>.</li>
              <li>The initial salary scale of public servants increased by <strong>10%</strong>, plus a performance-based monthly incentive allowance of <strong>10%</strong> of the revised salary — a probable net remuneration increase of approximately <strong>21%</strong>.</li>
              <li>Capital Gains Tax on sale of securities clarified as final withholding tax, with rates increased:
                <ul className="list-disc list-inside mt-2 ml-4">
                  <li>Within 1 year: 5% → <strong>7.5%</strong></li>
                  <li>After 1 year: 7.5% → <strong>10%</strong></li>
                  <li>Real estate remains subject to the <strong>5-year</strong> holding period rule.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">1. INFORMATION TECHNOLOGY</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10">
              <li>Nepal's first <strong>Sovereign AI Computer Center</strong> to be established at <strong>Syuchatar, Kathmandu</strong>.</li>
              <li>Special fellowship for <strong>15 Nepali AI researchers</strong> abroad to return home.</li>
              <li>Minimum <strong>1%</strong> of Capital Budget allocated for Science & Research for the first time in this budget.</li>
              <li><strong>Nagarik App</strong> to be developed with more than <strong>a dozen (12+)</strong> new features for government service.</li>
              <li>Government to sell shares of <strong>Nepal Telecom</strong> from its current holding of <strong>91% to 66%</strong>; divestment funds to be used to develop Nepal into a regional technology hub.</li>
              <li><strong>Digital Service Tax (DST) = 2%</strong> on sales amount received by non-residents through:
                <ul className="list-[circle] list-inside mt-2 ml-4">
                  <li>Electronic service provided to users in Nepal</li>
                  <li>Sales of data collected from Nepal</li>
                </ul>
              </li>
              <li><strong>Exceptions:</strong>
                <ol className="list-decimal list-inside mt-2 ml-4">
                  <li>Annual transactions up to <strong>30 lakhs</strong></li>
                  <li>Person residing in Nepal uses digital interface for business purpose and earns revenue</li>
                </ol>
              </li>
              <li><strong>Annual Filing</strong> to be done within <strong>3 months</strong> of end of FY to avoid:
                <ul className="list-[circle] list-inside mt-2 ml-4">
                  <li>Penalty of <strong>0.1% p.a.</strong></li>
                  <li>Interest of <strong>15% p.a.</strong></li>
                  <li>Concealment/understatement fine of <strong>50%</strong> of the amount</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">2. HEALTH & EDUCATION</h2>
            <h3 className="font-bold text-lg mb-2">Major Points</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li>Total education budget: <strong>Rs. 218.30 Billion</strong></li>
              <li>Total Health Budget: <strong>Rs. 96.43 Billion</strong></li>
              <li><strong>Rs. 8.60 Billion</strong> allocated for scholarships</li>
              <li>Significant increase in seats for Medicine, Nursing and IT</li>
              <li>AI and Ed-Tech to be used in school education</li>
              <li>Paid internship system to be institutionalized</li>
              <li>Target: <strong>45%</strong> completion rate up to Grade 12</li>
              <li>Internet access in <strong>75%</strong> of educational institutions</li>
              <li>Foreign universities encouraged to operate campuses in Nepal</li>
            </ul>
            
            <h3 className="font-bold text-lg mb-2">Education & Health Equity Fee</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li><strong>3%</strong> fee levied on all categories of fees and service charges collected by private educational institutions.</li>
              <li><strong>3%</strong> fee levied on all categories of service fees collected by private health institutions.</li>
              <li>Tax return to be filed within <strong>25 days</strong> of each trimester.</li>
            </ul>

            <h3 className="font-bold text-lg mb-2">Other Provisions</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10">
              <li>Education Service Fee of <strong>3%</strong> to be levied on foreign currency exchange for tuition fees for students travelling abroad.</li>
              <li>Income earned by universities established and operating in Nepal through their main objective is now <strong>Exempt from Tax</strong>.</li>
              <li>Night duty allowance for nurses in public health facilities <strong>doubled</strong> — from <strong>Rs. 150</strong> to <strong>Rs. 300</strong> per night.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">3. AGRICULTURE, FOOD & BEVERAGES</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li><strong>Rs. 32.46 Billion</strong> allocated for fertilizer procurement.</li>
              <li>Up to <strong>40%</strong> incentive grant for commercial farmers (minimum Rs. 2 crore investment).</li>
              <li>Start-up support for <strong>1,000 youth</strong> in agriculture & livestock.</li>
              <li><strong>'Green Urea' fertilizer industry</strong> to be established.</li>
              <li><strong>No tax</strong> on windfall gain income (e.g., prizes, awards) for agriculture purposes.</li>
            </ul>

            <h3 className="font-bold text-lg mb-2">Liquor Industry</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10">
              <li>Permitted alcohol volume variation: <strong>0.5%</strong> (reduced from 1%).</li>
              <li><strong>Health Risk Surcharge</strong> (treated as excise duty) levied on tobacco/nicotine goods and liquor.</li>
              <li><strong>Electronic Track & Trace System</strong> implemented.</li>
              <li>Non-compliance penalty: Fine of <strong>200%</strong> of claimed amount or <strong>Rs. 100,000</strong>.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">4. TRANSPORTATION</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li><strong>Advance Tax on ride-sharing = 1%</strong> on payments to drivers/service providers.</li>
              <li><strong>VAT on ride-sharing = 5% (Reverse Charge)</strong> imposed on ride-sharing services via Nepal-based platforms.</li>
              <li><strong>Vehicle Confiscation:</strong> Hired vehicles can be confiscated for excise offences if committed with the owner's knowledge. Goods-carrying vehicles generally cannot be confiscated unless ownership is unclaimed.</li>
            </ul>
            
            <h3 className="font-bold text-lg mb-2">Annual Tax Rate for Vehicle on Hire (Highlights)</h3>
            <div className="overflow-x-auto mb-10">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Type of Vehicle</th>
                    <th className="px-4 py-3 text-left font-semibold">Rate (Per Year)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Car, Jeep, Van, Microbus (Up to 1300cc)</td><td className="px-4 py-2">Rs. 6,500</td></tr>
                  <tr><td className="px-4 py-2">Car, Jeep, Van (1301cc–2000cc)</td><td className="px-4 py-2">Rs. 7,000</td></tr>
                  <tr><td className="px-4 py-2">Truck, Bus</td><td className="px-4 py-2">Rs. 12,500</td></tr>
                  <tr><td className="px-4 py-2">Electronic Vehicle (Up to 50kW)</td><td className="px-4 py-2">Rs. 4,000</td></tr>
                  <tr><td className="px-4 py-2">Two-Wheeler Vehicle</td><td className="px-4 py-2">Rs. 3,000</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">5. CAPITAL MARKET & REAL ESTATE</h2>
            <ul className="list-decimal list-outside ml-5 space-y-2 mb-10">
              <li>Capital gains advance tax rates increased by <strong>2.5 percentage points</strong> on disposal of shares and non-business chargeable assets.</li>
              <li>New concessional <strong>2.5%</strong> rate for involuntary government acquisition.</li>
              <li>Exemption from capital gains tax when donating property to government.</li>
              <li>Capital Gain Taxes on disposal of shares and real estate clarified as <strong>final withholding tax</strong> under <strong>Section 92</strong>.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">6. AMENDMENTS IN INCOME TAX</h2>
            
            <h3 className="font-bold text-lg mb-2">Safe Harbor & Transfer Pricing</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li><strong>Safe Harbor Rule:</strong> Simplifies transactions for taxpayers with annual controlled transactions up to <strong>Rs. 1 billion</strong>.</li>
              <li><strong>Advance Pricing Agreement (APA):</strong> Nepal introduces the APA mechanism for the first time, fixing transfer pricing in advance.</li>
            </ul>

            <h3 className="font-bold text-lg mb-2">Deduction & Threshold Changes</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
              <li>Maximum deductible donation limit to tax-exempt entities increased from <strong>Rs. 1,00,000 to Rs. 3,00,000</strong>.</li>
              <li>Deduction allowed for <strong>Corporate Social Responsibility (CSR)</strong>, up to 1% of total taxable income.</li>
              <li><strong>Cash expenses exceeding Rs. 25,000 per transaction</strong> are non-deductible (replaces previous 50,000 limit).</li>
            </ul>

            <h3 className="font-bold text-lg mb-2">Income Tax Slab Changes</h3>
            <div className="overflow-x-auto mb-10">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Income Range</th>
                    <th className="px-4 py-3 text-left font-semibold">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Up to Rs 10,00,000</td><td className="px-4 py-2">1%</td></tr>
                  <tr><td className="px-4 py-2">Rs. 10,00,001 – Rs. 15,00,000</td><td className="px-4 py-2">10%</td></tr>
                  <tr><td className="px-4 py-2">Rs. 15,00,001 – Rs. 25,00,000</td><td className="px-4 py-2">20%</td></tr>
                  <tr><td className="px-4 py-2">Rs. 25,00,001 – Rs. 40,00,000</td><td className="px-4 py-2">27%</td></tr>
                  <tr><td className="px-4 py-2">Above Rs. 40,00,001</td><td className="px-4 py-2">29% (27% + 2% Surcharge)</td></tr>
                </tbody>
              </table>
              <p className="text-sm italic mt-2 text-gray-500">*1% tax shall not be levied on pension income, contributions to SSF, and income of sole proprietorship firms.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">7. AMENDMENTS IN VALUE ADDED TAX (VAT)</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10">
              <li><strong>Digital Invoices:</strong> Stricter measures; Department may mandate CBMS registration and digital invoicing.</li>
              <li><strong>Digital Payment Rebate:</strong> Consumers making digital payments on notified goods/services get an <strong>immediate rebate of 10%</strong> of the tax amount.</li>
              <li>Rs. <strong>5 lakh fine</strong> for using software capable of deleting/modifying invoice data. General violation fine increased from Rs. 1,000 to <strong>Rs. 10,000</strong>.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">8. TAX RELIEFS & CONCESSIONS</h2>
            <ul className="list-disc list-outside ml-5 space-y-4 mb-10">
              <li><strong>Sec 26/27 — Destroyed Business Stock:</strong> Uninsured stock destroyed during the Gen-Z Movement can be claimed as COGS. 50% customs/excise exemption on goods imported to restart operations.</li>
              <li><strong>Sec 34 — Post-Clearance Audit:</strong> Unpaid customs/VAT assessed under post-clearance audit can be settled by paying the full assessed amount by Poush 2083 — all penalties waived.</li>
              <li><strong>Sec 40 — PAN Regularisation:</strong> Unregistered persons can get a PAN, file returns for 2079/80–2082/83, pay tax, and have all fees/interest waived.</li>
              <li><strong>Sec 41/44/45 — VAT/Tax Settlement:</strong> Taxpayers with outstanding VAT/Tax balances can settle by depositing the tax plus a 1% additional fee by Poush 2083 to receive a 100% waiver of penalties, interest, and charges.</li>
            </ul>

            <p className="italic text-gray-500 text-sm mt-10 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              End of document. Please refer to the prevailing Income Tax Act, VAT Act, and related regulations for complete legal details.
            </p>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 mt-8 lg:mt-0 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Related Tools & Calculators
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Income Tax Slab 2083/84</p>
                      <p className="text-xs text-gray-500">Calculate updated taxes</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/nepal-salary/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Salary Calculator</p>
                      <p className="text-xs text-gray-500">Net salary & PF/CIT</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/property-tax/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Property Tax Calculator</p>
                      <p className="text-xs text-gray-500">Land & building tax</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/nepal-vehicle-tax/" className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Vehicle Tax Calculator</p>
                      <p className="text-xs text-gray-500">Annual bagmati tax</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">Disclaimer</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                This summary is intended for informational purposes only. While every effort has been made to ensure accuracy, please refer to the official Income Tax Act, VAT Act, and government notifications for complete legal definitions and current implementations.
              </p>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}
