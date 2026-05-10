import React from 'react';
import { SEOContent } from './types';

export const nepalSpecificSEO: Record<string, SEOContent> = {
  'nepali-date': {
    title: "Nepali Date Converter | BS to AD & AD to BS Auditor",
    description: "The definitive systematic resource for Bikram Sambat (BS) and Anno Domini (AD) conversion in FY 2082/83. 1500+ words on calendar logic and historical auditing.",
    howToUse: {
      steps: [
        "1. Select Mode: Choose between BS to AD or AD to BS conversion.",
        "2. Input Date: Enter the Year, Month, and Day for the 2082/83 cycle.",
        "3. Precise Sync: The engine calculates the corresponding date in the other calendar system instantly.",
        "4. Tithi Audit: (Optional) View the lunar tithi and significant festivals for the selected date."
      ]
    },
    formula: {
      title: "The Calendar Delta Axiom",
      description: "Nepali BS dates are approximately 56.7 years ahead of Gregorian AD dates, with month lengths varying based on historical records.",
      raw: "BS = AD + 56 Years, 8 Months, 17 Days (Approx)",
      variables: ["BS = Bikram Sambat.", "AD = Anno Domini."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-orange-50 border-l-4 border-orange-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-orange-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Calendar Intelligence Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Precision in date conversion is an institutional requirement in Nepal. In <strong>FY 2082/83</strong>, aligning Bikram Sambat with Gregorian standards is essential for legal, financial, and cultural auditing.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is the difference between BS and AD?", answer: "Bikram Sambat (BS) is the official lunar-solar calendar of Nepal, while AD is the international standard." }
    ]
  },
  'momo-calorie-counter': {
    title: "Momo Calorie Counter | Nepal's Official Dumpling Nutrition Auditor",
    description: "The definitive institutional resource for Momo nutrition. 1500+ words on Buff vs Chicken vs Veg calorie slabs, dipping sauce impact, and health audits.",
    howToUse: {
      steps: [
        "1. Momo Type: Select variety.",
        "2. Preparation Style: Choose style.",
        "3. Quantity Entry: Input pieces."
      ]
    },
    formula: {
      title: "Momo Axiom",
      description: "Calories based on filling and style.",
      raw: "Cal = P x D",
      variables: ["P = Pieces", "D = Density"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-red-50 border-l-4 border-red-600 p-8 rounded-r-xl">
        <h2 className="text-red-700 font-black text-xs uppercase tracking-widest mb-3">Nutritional Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        The Momo is Nepal's cultural snack, but its nutritional profile varies wildly.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Buff Momo calories?", answer: "70 per piece." }
    ]
  },
  'gold-converter': {
    title: "Gold Price Converter Nepal | Tola, Lal & Gram Precision Auditor",
    description: "Convert gold units between Tola, Lal, and Grams with absolute precision.",
    howToUse: {
      steps: [
        "1. Unit Selection: Choose Tola, Lal, or Grams.",
        "2. Purity: Select 24k Hallmark or 22k Tejabi."
      ]
    },
    formula: {
      title: "Gold Axiom",
      description: "1 Tola = 11.6638 grams.",
      raw: "Value = (Weight x Rate) + Fees",
      variables: ["Weight = Mass", "Rate = Market price"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-amber-50 border-l-4 border-amber-600 p-8 rounded-r-xl">
        <h2 className="text-amber-700 font-black text-xs uppercase tracking-widest mb-3">Metallurgical Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Gold is Nepal's primary wealth preservation asset.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Grams in 1 Tola?", answer: "Precisely 11.6638 grams." }
    ]
  },
  'nepal-home-loan': {
    title: "Nepal Home Loan Calculator | NRB Real Estate & EMI Auditor",
    description: "Calculate home loan EMI for Nepal banks with institutional precision.",
    howToUse: {
      steps: [
        "1. Principal Entry: Input amount.",
        "2. Rate Calibration: Enter interest rate."
      ]
    },
    formula: {
      title: "Mortgage Axiom",
      description: "Standard Reducing Balance method.",
      raw: "EMI = P x R",
      variables: ["P = Principal", "R = Rate"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-widest mb-3">Real Estate Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Financing a home in Nepal requires navigating NRB guidelines.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "LTV in Nepal?", answer: "Usually 50% in Kathmandu Valley." }
    ]
  },
  'remittance-calculator': {
    title: "Remittance Calculator Nepal | Global Transfer & Exchange Auditor",
    description: "Calculate net remittance to Nepal with absolute precision.",
    howToUse: {
      steps: [
        "1. Currency Selection: Choose sending currency.",
        "2. Amount Entry: Input volume."
      ]
    },
    formula: {
      title: "Remittance Axiom",
      description: "Net remittance calculation.",
      raw: "Net NPR = (Amount x Rate) - Fees",
      variables: ["Rate = Exchange Rate"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-green-700 font-black text-xs uppercase tracking-widest mb-3">Financial Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Remittance is the lifeline of Nepal.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Extra 1% interest?", answer: "Yes." }
    ]
  },
  'solar-requirement': {
    title: "Solar Panel Requirement Calculator | Nepal Energy Crisis Lab",
    description: "Calculate your solar PV and battery needs for Nepal.",
    howToUse: {
      steps: [
        "1. Load Audit: List appliances.",
        "2. Usage Calibration: Define backup hours."
      ]
    },
    formula: {
      title: "Solar Axiom",
      description: "Solar sizing logic.",
      raw: "Solar Array (Wp) = (Wh / PSH) x 1.3",
      variables: ["PSH = Peak Sun Hours"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-orange-50 border-l-4 border-orange-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-orange-700 font-black text-xs uppercase tracking-widest mb-3">Renewable Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Optimize your solar investment.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Panels for 1kW?", answer: "Typically 3 to 4." }
    ]
  },
  'nepal-salary': {
    title: "Nepal Salary Calculator 2082/83 | Take-Home Pay Auditor",
    description: "Calculate your net monthly take-home salary in Nepal for FY 2082/83.",
    howToUse: {
      steps: [
        "1. Marital Status: Select Single or Married.",
        "2. Monthly Salary Entry: Input gross salary."
      ]
    },
    formula: {
      title: "Salary Axiom",
      description: "Progressive taxation.",
      raw: "Net = Gross - Tax - Deductions",
      variables: ["Tax based on IRD slabs"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-emerald-700 font-black text-xs uppercase tracking-widest mb-3">Payroll Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Navigate the complex tax slabs of FY 2082/83.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "What are the tax slabs?", answer: "1%, 10%, 20%, 30%, and 39%." }
    ]
  },
  'nepal-vat': {
    title: "Nepal VAT Calculator | 13% Value Added Tax Auditor",
    description: "Calculate VAT (inclusive/exclusive) for Nepal with institutional precision. 1500+ words on IRD VAT slabs, zero-rated exports, and billing compliance.",
    howToUse: {
      steps: [
        "1. Mode Selection: Choose 'Add VAT' or 'Remove VAT'.",
        "2. Amount Entry: Input the base or total amount.",
        "3. Rate Calibration: Default 13% applies."
      ]
    },
    formula: {
      title: "The VAT Axiom",
      description: "Standard 13% rate calculation.",
      raw: "VAT = Amount x 0.13",
      variables: ["Amount = Taxable Value"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-red-700 font-black text-xs uppercase tracking-widest mb-3">Taxation Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        VAT is the primary consumption tax in Nepal. Precision in calculation is mandatory for IRD compliance.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "What is the VAT rate in Nepal?", answer: "The standard rate is 13%." }
    ]
  },
  'property-tax': {
    title: "Nepal Property Tax Calculator | Malpot & Land Revenue Auditor",
    description: "Calculate local property tax (Bhumi Kar) & house tax in Nepal. 1500+ words on metropolitan valuation slabs and depreciation.",
    howToUse: {
      steps: [
        "1. Municipality Selection: Choose your local Palika.",
        "2. Land Area: Enter area in Aana/Paisa/Daam.",
        "3. Building Type: Select construction style."
      ]
    },
    formula: {
      title: "Municipal Valuation Axiom",
      description: "Tax = ProgressiveSlab(Land Value + Building Value - Depreciation).",
      raw: "Tax = Slab(V)",
      variables: ["V = Total Valuation"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-amber-50/50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Real Estate Compliance Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Property tax in Nepal is determined by the local Finance Bill. It factors in road access, construction type, and annual depreciation.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Is Property Tax the same as Land Tax?", answer: "No. Land Tax is for vacant land; Property Tax includes the building." }
    ]
  },
  'foreign-employment': {
    title: "Foreign Employment ROI Calculator | EPS & Manpower Auditor",
    description: "Calculate the exact ROI of working abroad from Nepal. 1500+ words on EPS Korea math, Manpower hidden costs, and remittance compounding strategies.",
    
    howToUse: {
      steps: [
        "1. Destination Selection: Choose the target country (e.g., South Korea (EPS), UAE, Qatar, Malaysia).",
        "2. Upfront Capital Input: Enter the total cost paid to the Manpower agency, medical tests, visa fees, and flight tickets.",
        "3. Financing Audit: If you took a loan for the upfront capital, enter the loan amount and the high-interest rate (often 24%+ from local lenders).",
        "4. Expected Salary Entry: Input your guaranteed monthly basic salary in the foreign currency.",
        "5. Living Expenses Calibration: Estimate your monthly living cost abroad (food, rent, transport) if not provided by the company.",
        "6. Net Savings Calculation: The system isolates your true disposable income (Salary - Living Cost - Loan EMI).",
        "7. Payback Period Output: View exactly how many months of labor it will take just to recover your initial investment.",
        "8. Long-term Wealth Strategy: Review the projected total savings at the end of your 2-year or 3-year contract."
      ]
    },
    
    formula: {
      title: "The Migrant Labor Wealth Axiom",
      description: "The true financial value of foreign employment is determined by subtracting upfront debt servicing and foreign living costs from the total contract earnings.",
      raw: "Net Contract Wealth = (Monthly Savings - Loan EMI) x Tenure - Upfront Capital",
      variables: [
        "Upfront Capital = Manpower Fees + Visa + Flights + Medicals.",
        "Monthly Savings = Basic Salary + Overtime - Foreign Living Expenses.",
        "Loan EMI = Monthly payment to local lenders (usually calculated using high-interest simple or compound rates).",
        "Payback Period = Upfront Capital / Monthly Savings.",
        "Net Contract Wealth = Total cash remitted to Nepal after all debts are cleared."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Migrant Economics Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Foreign employment is the economic backbone of Nepal, contributing to nearly a quarter of the national GDP through remittances. Yet, for the individual migrant worker, the financial reality is often obscured by hidden agency fees, predatory local lending rates, and the high cost of living in destination countries like the UAE or Malaysia. A promised salary of Rs. 1 Lakh per month can mathematically result in zero net savings if the upfront cost was financed at 36% interest. This professional <a href="/calculator/foreign-employment" className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors">Foreign Employment Auditor</a> provides a brutal, transparent breakdown of your true Return on Investment (ROI . By calculating your exact 'Payback Period' and debt-servicing limits, our engine ensures that your years of hard labor translate into actual generational wealth for your family back home.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Wealth Strategy: Do not let your remittance sit idle in a low-yield savings account. Audit how compounding your monthly transfers in our <a href="/calculator/sip-calculator" className="text-blue-700 hover:text-blue-900 underline font-bold transition-colors">SIP Lab</a> can double your total contract wealth.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: Foreign Employment ROI
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Manpower Agents</td>
        <td className="p-4">Overstates 'Gross' pay; hides debt interest.</td>
        <td className="p-4 text-blue-700 font-bold">Brutal ROI Audit</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Facebook Groups</td>
        <td className="p-4">Anecdotal advice; no mathematical modeling.</td>
        <td className="p-4 text-blue-700 font-bold">100% Mathematical Logic</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Generic ROI Apps</td>
        <td className="p-4">No local Nepal (DOFE/EPS context.</td>
        <td className="p-4 text-blue-700 font-bold">Nepal-Specific Compliance</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE UPFRONT DEBT TRAP
        ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Capital Cost: The Agency and The Lender
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The biggest variable in foreign employment is not how much you earn abroad, but how much you pay to get there. The 'Free Visa, Free Ticket' policy of the Nepal government is rarely enforced, leading to massive upfront capital requirements.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Expense Category</th>
        <th className="p-4 font-black text-slate-900 uppercase">Typical Cost (NPR </th>
        <th className="p-4 font-black text-slate-900 uppercase">The Financial Threat</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-red-700">Manpower / Broker Fees</td><td className="p-4">Rs. 1,00,000 - 3,00,000+</td><td className="p-4 font-bold">Unregulated. Often requires liquidating family assets.</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Pre-Departure Costs</td><td className="p-4">Rs. 25,000 - 50,000</td><td className="p-4">Medicals, Orientations, DOFE approvals.</td></tr>
        <tr><td className="p-4 font-bold text-orange-700">Predatory Loan Interest</td><td className="p-4">24% to 36% Annually</td><td className="p-4 font-bold text-red-700">Eats up the first 6-12 months of foreign salary.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: If you borrow Rs. 3 Lakhs at 36% interest from a local moneylender (Sahu your interest alone is Rs. 9,000 per month. If your foreign savings is only Rs. 30,000, nearly 30% of your labor is just paying interest.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: EPS KOREA VS MIDDLE EAST
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-blue-600">🇰🇷</span> The Golden Standard: The EPS Korea Math
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The Employment Permit System (EPS for South Korea is fundamentally different from the Middle East manpower model. It is a G2G (Government to Government process that eliminates broker fees, making it the most mathematically sound labor migration route from Nepal.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Low Upfront Cost:</strong> Total processing, including flights and training, is usually under Rs. 1 Lakh. No manpower agencies are involved.</li><li><strong>High Statutory Wage:</strong> The South Korean minimum wage guarantees earnings exceeding Rs. 2 Lakhs per month, legally mandated and protected.</li><li><strong>The Catch - Language Barrier:</strong> The barrier to entry is the TOPIK language test, which requires 6-12 months of dedicated study, representing an 'Opportunity Cost' of lost wages while studying in Nepal.</li><li><strong>Terminal ROI:</strong> An EPS worker completing a 4-year and 10-month contract routinely returns with Rs. 1 Crore+ in net savings, compared to the Rs. 15-20 Lakhs typical of a Gulf contract.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: HIDDEN COST OF LIVING ABROAD
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">🏙️</span> The Illusion of Gross Salary
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        A high salary means nothing if the cost of survival in the destination country consumes it. Before signing a contract, you must audit the 'Provided Facilities'.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Accommodation & Food:</strong> If the company provides housing and a food allowance, your 'Net Savings' approaches your 'Gross Salary'. If not, rent in Dubai or Doha will consume 30% of your paycheck.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Overtime Dependency:</strong> Many contracts show a low basic salary (e.g., 1000 AED with the promise of high overtime. If the company loses a project, overtime vanishes, and you cannot meet your loan EMI back home.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Remittance Exchange Rate:</strong> Your salary is paid in Riyals or Dirhams. The conversion rate to NPR fluctuates. The NPR peg to the Indian Rupee provides stability against Gulf currencies, but limits massive forex gains.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Always calculate your 'Payback Period'. If you pay Rs. 3 Lakhs to go abroad, and save Rs. 30,000 a month, your Payback Period is 10 months. This means for the first 10 months, you are working as an indentured servant just to return to 'Zero'. Only from Month 11 do you actually start making a profit. Check your family's financial stability during those first 10 months using our <a href="/calculator/savings" className="text-blue-400 underline font-bold">Emergency Fund Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Migration Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🏦</span> IPO Quota Advantage
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The Nepal Government now reserves a specific 10% quota in all Initial Public Offerings (IPOs for migrant workers who remit funds through formal banking channels. This is an instant wealth multiplier.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-500">💰</span> Remittance Premium
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Banks in Nepal are directed by the central bank (NRB) to provide an additional 1% interest rate on Fixed Deposits and Savings Accounts if the money is sourced from formal foreign remittance.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">🛡️</span> The DOFE Insurance
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Mandatory insurance via the Foreign Employment Board ensures that in case of death or severe disability abroad, the worker's family in Nepal receives compensation (up to Rs. 15 Lakhs+ . Never bypass the legal DOFE approval.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 7: CASE STUDY
        ========================================== */}
        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-blue-900 mb-4">
        Strategic Case Study: The UAE Security Guard Audit
        </h3>
        <p className="text-blue-900/70 text-sm leading-relaxed mb-8">
        A worker pays Rs. 2,50,000 to an agency. He borrows this at 24% annual interest. His UAE salary is 1,500 AED (approx. Rs. 54,000 . Food is not provided (costs 400 AED/month . The contract is 2 years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Reality Check</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Gross Salary:</span> <strong>Rs. 54,000</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Food/Living (400 AED :</span> <strong>- Rs. 14,400</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>True Savings (Remittance :</span> <span>Rs. 39,600</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">The 2-Year Contract Wealth</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Total Saved (24 Months :</span> <strong>Rs. 9,50,400</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Loan Repayment + Interest:</span> <strong>- Rs. 3,10,000</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-blue-700"><span>Net Wealth Generated:</span> <span>Rs. 6,40,400</span></div>
        
        
        
        <p className="text-xs text-blue-900/50 mt-8 italic text-center">
        Audit Observation: The worker spent 2 years away from his family to generate a total net wealth of Rs. 6.4 Lakhs. That is an effective profit of only Rs. 26,000 per month. If a similar job in Nepal pays Rs. 25,000, the foreign contract is mathematically a loss. Validate your potential using our <a href="/calculator/nepal-salary" className="text-blue-600 underline font-bold">Local Salary Auditor</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly factor in Department of Foreign Employment (DOFE) policies and current average Forex rates.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
        { 
        question: "What is the 'Free Visa, Free Ticket' rule in Nepal?", 
        answer: "The government mandates that for specific countries (like Malaysia and Gulf nations), manpower agencies cannot charge more than Rs. 10,000 as processing fees, and the employer must pay for the visa and flight. However, illegal under-the-table fees are still widely reported." 
        },
        { 
        question: "Is the EPS Korea route really cheaper?", 
        answer: "Yes. Because it is a direct Government-to-Government (G2G) system, there are no manpower broker fees. The total cost, including flights and training, is vastly lower than private manpower routes to Europe or the Gulf." 
        },
        { 
        question: "How do I calculate the Payback Period of my migration?", 
        answer: "Divide your total upfront cost (Loan + Agency Fees + Flights) by your expected monthly savings (Salary minus food/rent). If the answer is 12, it takes exactly one year of labor just to break even." 
        },
        { 
        question: "Why should I send money through Banks instead of Hundi?", 
        answer: "Sending via official channels (Banks/IME/Remit) gives you a 1% higher interest rate on deposits in Nepal, qualifies you for the 10% IPO migrant quota, and builds a legal financial history required for future loans or visas." 
        },
        { 
        question: "What happens if I break my contract and return early?", 
        answer: "If you return before the payback period, you will be in severe debt, as the local lender will continue to charge 24-36% interest. You also lose your legal work permit status and any end-of-service gratuity." 
        },
        { 
        question: "Does the basic salary include overtime?", 
        answer: "No. The basic salary is for standard working hours (usually 8 hours/day, 6 days/week). Overtime is calculated separately, usually at 1.25x or 1.5x the basic hourly rate, but it is never guaranteed." 
        },
        { 
        question: "What is the Foreign Employment Board (FEB) Welfare Fund?", 
        answer: "Before leaving Nepal, you must deposit a nominal fee (Rs. 1,500 - 2,500) into the FEB fund. This provides critical financial compensation to your family in the event of your death, injury, or legal trouble abroad." 
        },
        { 
        question: "Should I take a loan from a local moneylender (Sahu)?", 
        answer: "Avoid it if possible. Local moneylenders often charge 24% to 36% annual interest (Sajha/Byaj). Try to secure a 'Foreign Employment Loan' from a commercial or development bank in Nepal, which has regulated, much lower interest rates." 
        },
        ]
        },
        'kukl-bill': {
        title: "KUKL Water Bill Calculator | Kathmandu Utility Auditor",
        description: "Calculate your KUKL water bill with 50% sewage surcharge and late penalty logic. 1500+ words on pipe diameters and volumetric slabs.",
        howToUse: {
        steps: [
        "1. Pipe Diameter: Select connection size (e.g., 1/2 inch).",
        "2. Connection Status: Indicate if metered or unmetered.",
        "3. Volume Input: Enter liters or units."
        ]
        },
        formula: {
        title: "The Municipal Utility Axiom (KUKL Tariffs)",
        description: "Water billing in the Kathmandu Valley is a hybrid model comprising a fixed baseline fee up to a minimum volume, plus an escalating volumetric rate for excess usage, topped with a sewage tax.",
        raw: "Total Bill = [Minimum Fee + (Excess Volume) x Rate)] x (1 + Sewage Tax %) + Fines",
        variables: [
        "Minimum Fee = Fixed charge based on pipe diameter (e.g., Rs. 100 for a 1/2 inch pipe providing up to 10,000 Liters).",
        "Excess Volume = Total Consumption - Base Volume (e.g., Usage above 10,000 Liters).",
        "Sewage Surcharge = An automatic 50% added to the base water bill for homes connected to the public sewer system.",
        "Fines = Progressive penalties scaling from 0% to 50% based on the months delayed."
        ]
        },
        content: (
        <div className="space-y-12">
        <div className="bg-cyan-50/50 border-l-4 border-cyan-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-cyan-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Municipal Utility Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        In the Kathmandu Valley, water billing is managed by KUKL. The bill includes a 50% sewage surcharge and progressive late fines.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Why am I being charged when there is no water supply in my area?", 
        answer: "KUKL charges a 'Minimum Base Fee' (e.g., Rs. 100 for a 1/2 inch pipe) simply to maintain your active connection to the grid, regardless of whether water was actually supplied or consumed during that month." 
      },
      { 
        question: "What is the Sewage Surcharge (Dhal Kar)?", 
        answer: "If your house is connected to the municipal sewer system, KUKL automatically adds a 50% surcharge to your total water bill to cover the costs of waste processing and sewer maintenance." 
      },
      { 
        question: "How do I avoid the 50% Sewage Surcharge?", 
        answer: "If your property relies entirely on an independent Septic Tank and has no physical connection to the municipal sewer, you must submit a formal application to your local KUKL branch to have the surcharge officially removed." 
      },
      { 
        question: "What happens if my water meter is broken?", 
        answer: "If the meter is broken, illegible, or deliberately tampered with, KUKL immediately shifts you to the punitive 'Unmetered' tariff. For a standard residential house, this means paying a flat Rs. 780 per month until you pay to install a new meter." 
      },
      { 
        question: "When does the 50% late penalty apply?", 
        answer: "Progressive fines begin in the 3rd month (10%). By the 5th month of non-payment, the penalty maximizes at a flat 50% of the outstanding bill amount. This penalty remains until the entire balance is cleared." 
      },
      { 
        question: "How do I get the 3% early payment rebate?", 
        answer: "To qualify for the 3% discount on your total bill, you must pay the invoice within the first billing month (within 30 days of the meter reading date). This is easiest to achieve using digital wallets." 
      },
      { 
        question: "Can I pay my KUKL bill online?", 
        answer: "Yes, KUKL is fully integrated with digital payment gateways in Nepal. You can use your 'Connection No.' and 'Customer ID' to view and clear your dues via eSewa, Khalti, or your mobile banking app." 
      },
      { 
        question: "Does a 1-inch pipe cost more than a 1/2 inch pipe?", 
        answer: "Significantly more. A 1/2 inch pipe has a base fee of Rs. 100. A 1-inch pipe, considered a commercial-grade connection, has a base fee of Rs. 3,960. Never upgrade your pipe size unless your property absolutely requires commercial volume." 
      },
      { 
        question: "How many liters are in one KUKL 'Unit'?", 
        answer: "One unit on the KUKL meter is equivalent to 1,000 Liters (1 Cubic Meter). If your meter reading jumps by 10 units, you have consumed 10,000 Liters of water." 
      },
      { 
        question: "Will the Melamchi Water Supply change the billing rate?", 
        answer: "While the supply volume increases with Melamchi, the statutory tariff rates (per 1000L) remain determined by the KUKL board. High supply usually leads to high consumption, which pushes households into the expensive 'Excess Volumetric Rate' tier." 
      }
    ]
  },
  'nea-bill': {
    title: "NEA Bill Calculator 2082/83 | Nepal Electricity Bill Auditor",
    description: "Calculate your NEA electricity bill precisely for FY 2082/83. Includes 5A to 60A demand charges, progressive slab rates, and late payment fine logic.",
    
    howToUse: {
      steps: [
        "1. Phase & Ampere Selection: Identify your connection type (Single Phase or Three Phase) and meter capacity (e.g., 5A, 15A, 30A, 60A). This defines your fixed monthly demand charge.",
        "2. Reading Input: Enter your Previous Month's meter reading and Current Month's reading in KWh (Units).",
        "3. Volume Calculation: The system isolates your total consumed units (Current - Previous).",
        "4. Progressive Slab Audit: Observe how your consumption is divided into the NEA's progressive tiers (0-20, 21-30, 31-50, etc.), with higher units costing exponentially more.",
        "5. Fixed Charge Addition: The mandatory monthly service/demand charge is added based on your specific Ampere rating, even if your consumption is 0.",
        "6. Time of Day (ToD) Override (For 3-Phase): If applicable, input peak, off-peak, and normal hour usage for specialized industrial/commercial billing.",
        "7. Penalty/Rebate Synchronization: Input the payment date relative to the meter reading to apply the 2% early rebate or the 5% to 25% late fine.",
        "8. Payment Execution: Use the exact 'Total Payable Amount' to clear your dues via eSewa, Khalti, or the NEA official app."
      ]
    },
    
    formula: {
      title: "The NEA Energy Tariff Axiom",
      description: "Electricity billing in Nepal operates on a highly progressive slab system that penalizes high consumption while subsidizing basic energy needs for low-income households (Lifeline tariff).",
      raw: "Total Bill = Fixed Demand Charge + Σ (Units in Slab × Slab Rate) + Penalty/Rebate",
      variables: [
        "Fixed Demand Charge = Monthly fee based on Ampere capacity.",
        "Units in Slab = Consumed units allocated to specific progressive pricing tiers.",
        "Slab Rate = The cost per unit in that specific tier.",
        "Penalty/Rebate = Time-sensitive financial adjustments based on payment date."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-yellow-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Energy Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        NEA billing is based on a progressive slab system. Higher consumption leads to exponentially higher costs.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "How is the NEA fixed charge calculated?", 
        answer: "The fixed monthly charge depends strictly on the Ampere capacity of your meter (e.g., 5A, 15A, 30A). This is a mandatory maintenance fee you must pay even if your electricity consumption for the month is 0 units." 
      },
      { 
        question: "What is the 5 Ampere 'Lifeline' tariff?", 
        answer: "To subsidize low-income households, the NEA provides 20 units of free electricity per month to households with a basic 5A meter. They only have to pay the Rs. 30 fixed demand charge." 
      },
      { 
        question: "My landlord charges me Rs. 15 per unit from a sub-meter. Is this legal?", 
        answer: "No. The highest domestic slab rate under NEA rules is Rs. 11 per unit (for usage above 250 units). Charging a flat Rs. 15 per unit is illegal profiteering. The sub-meter reading should be processed through the NEA's progressive slab logic." 
      },
      { 
        question: "When does the 25% late fine apply?", 
        answer: "If you fail to pay your electricity bill within 40 days of the meter reading date, a massive 25% penalty is permanently added to the outstanding amount, and your line becomes eligible for physical disconnection." 
      },
      { 
        question: "How do I get the 2% discount on my electricity bill?", 
        answer: "You must pay your entire bill amount within the first 7 days following the meter reading date. The easiest way to secure this is by checking your SC No. on a digital wallet like eSewa or Khalti immediately after the month ends." 
      },
      { 
        question: "Can I run an Air Conditioner on a 5A meter?", 
        answer: "No. A 5A meter provides limited wattage capacity. Turning on a heavy appliance like an AC (typically 1500W+) or a large Geyser will trip the breaker or potentially burn the meter wiring. You need at least a 15A or 30A meter." 
      },
      { 
        question: "What does 'Three Phase' mean?", 
        answer: "Three Phase connections deliver higher voltage (400V vs 230V) and massive load capacity. They are required for industrial machinery, large commercial buildings, and high-capacity elevators. They operate under a completely different, much higher tariff structure." 
      },
      { 
        question: "What happens if my meter is broken or stopped?", 
        answer: "If the meter is found to be defective, the NEA will bill you based on your 'Average Consumption' of the past few months. You must apply to your local distribution center immediately to have the meter replaced to avoid arbitrary billing." 
      },
      { 
        question: "Are government taxes included in the NEA bill?", 
        answer: "No extra VAT is added to domestic electricity consumption. The calculated progressive amount is the final amount. However, for industrial and commercial users, specific municipal or regulatory taxes may apply." 
      },
      { 
        question: "Why did my bill suddenly double in the winter?", 
        answer: "Winter in Nepal requires water heating (geysers/immersion rods) and room heaters, which are the highest electricity-consuming appliances. Pushing your usage from 100 units to 200 units doesn't just double your bill; it pushes you into the expensive Rs. 10.00/unit progressive slab, causing exponential cost increases." 
      }
    ]
  },
  'property-registration': {
    title: "Property Registration Fee Calculator Nepal | Malpot Auditor",
    description: "Calculate land registry fees, service charges, and bagmati/local taxes for property transfer in Nepal.",
    howToUse: {
      steps: [
        "1. Location: Select Municipality type.",
        "2. Gender: Choose owner demographic (for rebates).",
        "3. Valuation: Enter the official Malpot valuation."
      ]
    },
    formula: {
      title: "Registry Axiom",
      description: "Fee = Valuation x (Registry Rate + Service Charge).",
      raw: "Fee = V x R",
      variables: ["V = Official Valuation"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-slate-700 font-black text-xs uppercase tracking-widest mb-3">Real Estate Registration Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Registering property in Nepal involves several layers of fees including the primary registration fee and local development taxes.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Women's rebate on land registry?", answer: "Yes, typically 25% to 50% depending on the location." }
    ]
  },
  'nepal-income-tax': {
    title: "Nepal Income Tax Calculator 2082/83 | IRD Compliance Auditor",
    description: "Calculate your annual income tax according to the latest IRD slabs for FY 2082/83.",
    howToUse: {
      steps: [
        "1. Income Source: Select Salary or Business.",
        "2. Deductions: Enter SSF, CIT, or Insurance premiums.",
        "3. Brackets: View your tax burden across progressive slabs."
      ]
    },
    formula: {
      title: "Income Tax Axiom",
      description: "Progressive taxing based on assessable income.",
      raw: "Tax = Σ (Income in Slab x Rate)",
      variables: ["Rates range from 1% to 39%"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-widest mb-3">Fiscal Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Stay compliant with the Inland Revenue Department (IRD) guidelines for the current fiscal year.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Maximum CIT deduction?", answer: "Rs. 3,00,000 or 1/3rd of income, whichever is lower." }
    ]
  },
  'nepal-provident-fund': {
    title: "EPF & CIT Calculator Nepal | Retirement Wealth Auditor",
    description: "Calculate your Employee Provident Fund (EPF) and Citizen Investment Trust (CIT) growth.",
    howToUse: {
      steps: [
        "1. Salary: Enter basic salary.",
        "2. Contribution: Set percentage for EPF/CIT."
      ]
    },
    formula: {
      title: "Retirement Axiom",
      description: "Compounded growth of monthly contributions.",
      raw: "Future Value = PMT x [((1+r)^n - 1) / r]",
      variables: ["r = Annual Interest Rate"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-widest mb-3">Retirement Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Audit your long-term wealth through statutory retirement funds in Nepal.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Interest rate on EPF?", answer: "Usually around 7% to 8% annually." }
    ]
  },
  'nepal-vehicle-tax': {
    title: "Nepal Vehicle Tax Calculator | Bluebook Renewal Auditor",
    description: "Calculate annual vehicle tax and insurance for bikes, cars, and commercial vehicles in Nepal.",
    howToUse: {
      steps: [
        "1. Category: Select Two-Wheeler or Four-Wheeler.",
        "2. CC/Capacity: Enter engine displacement.",
        "3. Province: Select your Bagmati/Gandaki/etc. registration."
      ]
    },
    formula: {
      title: "Vehicle Tax Axiom",
      description: "Fixed rates based on engine capacity.",
      raw: "Tax = Table(CC)",
      variables: ["CC = Cubic Capacity"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-gray-50 border-l-4 border-gray-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-gray-700 font-black text-xs uppercase tracking-widest mb-3">Automotive Compliance Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Annual Bluebook renewal involves state tax and mandatory third-party insurance.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Is insurance mandatory for renewal?", answer: "Yes, third-party insurance is a legal requirement." }
    ]
  },
  'nepse-wacc': {
    title: "NEPSE WACC Calculator | Share Market Profit/Loss Auditor",
    description: "Calculate Weighted Average Cost of Capital (WACC) for your NEPSE portfolio.",
    howToUse: {
      steps: [
        "1. Transactions: Enter buy price and quantities.",
        "2. Bonus/Right: Include adjustment shares.",
        "3. Final Cost: View your adjusted cost per share."
      ]
    },
    formula: {
      title: "WACC Axiom",
      description: "Weighted average of all purchase costs.",
      raw: "WACC = Total Cost / Total Quantity",
      variables: ["Includes broker commissions and DP fees"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-green-700 font-black text-xs uppercase tracking-widest mb-3">Capital Markets Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Accurate WACC is essential for calculating capital gains tax in Meroshare.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Does WACC include bonus shares?", answer: "Yes, at a base value of Rs. 100 usually." }
    ]
  },
  'nepse-bonus-tax': {
    title: "NEPSE Bonus & Right Tax Calculator | Dividend Auditor",
    description: "Calculate the 5% cash tax on bonus and right shares for Nepal stock market.",
    howToUse: {
      steps: [
        "1. Shares: Enter quantity.",
        "2. Tax: View payable amount."
      ]
    },
    formula: {
      title: "Dividend Tax Axiom",
      description: "5% flat tax on the face value of bonus shares.",
      raw: "Tax = Quantity x 100 x 0.05",
      variables: ["Face Value = Rs. 100"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-emerald-700 font-black text-xs uppercase tracking-widest mb-3">Dividend Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Audit your net dividend income after statutory tax deductions.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Tax rate for individuals?", answer: "5% on dividends." }
    ]
  },
  'gratuity-calculator': {
    title: "Nepal Gratuity Calculator | Labor Law Benefit Auditor",
    description: "Calculate your gratuity benefits as per the Nepal Labor Act.",
    howToUse: {
      steps: [
        "1. Tenure: Enter years of service.",
        "2. Salary: Input final basic salary."
      ]
    },
    formula: {
      title: "Gratuity Axiom",
      description: "8.33% of basic salary per month.",
      raw: "Gratuity = Years x Salary x (8.33/100)",
      variables: ["Statutory benefit"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-purple-700 font-black text-xs uppercase tracking-widest mb-3">Labor Benefit Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Ensure you receive your full legal benefits upon resignation or retirement.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Minimum service for gratuity?", answer: "Varies, but usually applicable from day one under new Labor Act." }
    ]
  },
  'see-gpa': {
    title: "SEE GPA Calculator | Nepal Grading & Non-Graded (NG) Auditor",
    description: "Calculate your exact Secondary Education Examination (SEE) GPA. 1500+ words on the 2082/83 NEB grading system, theoretical NG rules, and 35% thresholds.",
    
    howToUse: {
      steps: [
        "1. Subject Configuration: The calculator is pre-loaded with the standard 8 compulsory and optional subjects for the Class 10 curriculum.",
        "2. Theory vs. Practical Split: Enter your marks separately for Theory (usually out of 75) and Practical/Internal Assessment (usually out of 25).",
        "3. NG (Non-Graded) Audit: Ensure your Theory marks are strictly above 35% (at least 27 out of 75). If lower, the system will automatically flag the subject as 'NG'.",
        "4. Internal Validation: Ensure your Practical marks are above 40% (at least 10 out of 25) to pass the internal evaluation.",
        "5. Grade Point Calculation: The system converts your valid combined marks into Grade Points ranging from 0.0 to 4.0 (A+ to D).",
        "6. Credit Hour Weighting: The algorithm applies the specific credit hour weight of each subject to calculate your cumulative GPA.",
        "7. Final Output Verification: Review your final GPA. A GPA will NOT be generated if even a single subject carries an 'NG' status.",
        "8. Scholarship Strategy: Use the exact generated GPA to audit your eligibility for Class 11 Science/Management streams or CTEVT diplomas."
      ]
    },
    
    formula: {
      title: "The NEB Grading Axiom (Letter Grading Directive 2078)",
      description: "The National Examination Board (NEB) utilizes a credit-weighted grading system. Crucially, a student must secure independent passing thresholds in both theory and practical exams to receive a calculable grade.",
      raw: "Final GPA = Σ (Grade Point x Subject Credit Hours) / Total Credit Hours",
      variables: [
        "Theory Threshold = Must score ≥ 35%. Failing this results in 'NG' (Non-Graded), regardless of practical marks.",
        "Practical Threshold = Must score ≥ 40% in internal assessments.",
        "Total Mark = Theory + Practical (If thresholds are met).",
        "A+ = 90% to 100% (Grade Point 4.0).",
        "A = 80% to under 90% (Grade Point 3.6).",
        "B+ = 70% to under 80% (Grade Point 3.2)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Academic Grading Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The Secondary Education Examination (SEE) is the most critical academic gateway in Nepal, determining the trajectory of a student's higher secondary education and future career. Since the implementation of the <strong>Letter Grading Directive 2078</strong> by the <a href="https://neb.gov.np" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:text-indigo-900 underline font-semibold transition-colors">National Examination Board (NEB)</a>, the grading landscape has shifted from a total-marks approach to a strict threshold-based 'Non-Graded' (NG) system. Securing 90% in practicals means nothing if a student fails to cross the 35% barrier in theory. This professional <a href="/calculator/see-gpa" className="text-indigo-700 hover:text-indigo-900 underline font-bold transition-colors">SEE GPA & NG Auditor</a> provides absolute clarity for students and parents. By mathematically isolating theory and practical components, our engine reveals your true cumulative GPA and flags any 'NG' risks before the final transcript is printed.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Career Strategy: High GPA in SEE is the prerequisite for Science and Engineering streams. Model your future academic terminal value using our <a href="/calculator/see-gpa" className="text-indigo-700 hover:text-indigo-900 underline font-bold transition-colors">GPA Intelligence Lab</a>.
        </span>
        </p>
        </div>
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: SEE Grading Precision
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Local Result Sites</td>
        <td className="p-4">Only shows past results; no predictive math.</td>
        <td className="p-4 text-indigo-700 font-bold">Predictive GPA Audit</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Manual Grade Sheets</td>
        <td className="p-4">Confusing credit hour math; slow.</td>
        <td className="p-4 text-indigo-700 font-bold">Instant Credit Weighting</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Generic GPA Apps</td>
        <td className="p-4">No 'NG' (Non-Graded) 35% logic.</td>
        <td className="p-4 text-indigo-700 font-bold">Full NEB Compliance</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Binary Barrier: Understanding the 'NG' Logic
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The most significant change in the 2078 directive is the decoupling of Theory and Practical marks. Under the old system, a high practical score could 'save' a failing theory score. This is no longer possible.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Assessment Component</th>
        <th className="p-4 font-black text-slate-900 uppercase">Minimum Passing %</th>
        <th className="p-4 font-black text-slate-900 uppercase">The Fail Penalty</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-red-700">Theory (Written)</td><td className="p-4">35% (27/75)</td><td className="p-4 font-bold">Automatic 'NG' status. No GPA calculated.</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Practical / Internal</td><td className="p-4">40% (10/25)</td><td className="p-4">Disqualification from the subject.</td></tr>
        <tr><td className="p-4 font-bold text-emerald-700">Cumulative GPA</td><td className="p-4">N/A</td><td className="p-4 font-bold text-slate-900">Only generated if ALL 8 subjects are Grade-D or above.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: If you receive an 'NG' in even one subject, you are ineligible for admission into Class 11. You must sit for the 'Grade Improvement' (Supplementary) exam for that specific subject.
        </p>
        </div>
        </section>
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-indigo-600">📊</span> The Math of Excellence: Credit Hours
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Your final GPA is not a simple average of your marks. It is a 'Weighted Average' based on the Credit Hours allocated to each subject by the Curriculum Development Centre (CDC).
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Compulsory Subjects:</strong> English, Nepali, Mathematics, and Science carry the highest credit weights (typically 4.0 each).</li><li><strong>The 'A+' Illusion:</strong> Getting an A+ in a low-credit optional subject will not significantly boost your GPA if you have a C in a high-credit core subject like Mathematics.</li><li><strong>GP to GPA:</strong> Each grade (A+, A, B+, etc.) is assigned a Grade Point (4.0, 3.6, 3.2). The GPA is the sum of (GP x Credit Hour) divided by the total credit hours of the semester.</li>
        </ul>
        </div>
        </section>
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-indigo-400">🔄</span> The 'Rescue' Audit: Supplementary Exams
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        If you fall into the 'NG' zone, the NEB provides a narrow window for redemption. However, the rules are rigid and strictly audited.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Two-Subject Limit:</strong> You can only take the immediate grade improvement exam if you have an 'NG' in a maximum of TWO subjects.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Annual Wait Penalty:</strong> If you have an 'NG' in three or more subjects, you cannot take the supplementary exam. You must re-appear for ALL subjects in the next annual examination cycle.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Practical Persistence:</strong> If you pass the practical component but fail the theory, your practical marks are 'carried forward' to the supplementary exam. You only need to re-sit the written paper.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never leave a question blank. Since there is no negative marking in SEE, even a partial attempt can bridge the 2-mark gap between an 'NG' and a Grade D. If your SEE results are delayed, audit your age-eligibility for future civil service roles using our <a href="/calculator/lok-sewa-age" className="text-indigo-400 underline font-bold">Lok Sewa Lab</a>."
        </p></div>
        </div>
        
        </section>
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The 'Practical Trap' Audit
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A student scores 25/25 in Science practicals. They assume they only need 10 marks in theory to pass. In the theory paper, they score 24/75. Let's run the audit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Old System Math</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Practical:</span> <strong>25</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Theory:</span> <strong>24</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-green-700"><span>Total:</span> <span>49/100 (Grade C)</span></div>
        <div className="flex justify-between text-xs text-slate-400">Result: Passed</div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">New 2078 Directive Math</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Theory Score (24/75):</span> <strong>32%</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Required Theory Min:</span> <strong>35% (27)</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-black text-red-700"><span>Final Subject Status:</span> <span>NG (Non-Graded)</span></div>
        <div className="flex justify-between text-xs text-red-400 font-bold uppercase tracking-widest">Result: Disqualified</div>
        
        
        
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: Despite having a combined score of 49% (which used to be a pass) the student is now 'Non-Graded' because they failed the 35% theory barrier. This proves why focusing on written exams is more critical than ever. Plan your study hours using our <a href="/calculator/sleep" className="text-indigo-600 underline font-bold">Productivity & Sleep Lab</a>.
        </p>
        
        </section>
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly follow the National Examination Board (NEB) Letter Grading Directive 2078.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What exactly is 'NG' in the SEE result?", 
        answer: "NG stands for 'Non-Graded'. It replaces the old 'E' or 'Fail' system. It means you did not secure the minimum required threshold (35% in theory or 40% in practicals) to be assigned a calculable Grade Point." 
      },
      { 
        question: "How many marks do I need to pass the Theory exam?", 
        answer: "You must score a minimum of 35% in the written theory paper. For a standard 75-mark exam, this mathematically translates to 26.25 marks, which the NEB rounds up to 27 marks." 
      },
      { 
        question: "If I get an NG in one subject, what happens to my total GPA?", 
        answer: "Your cumulative GPA will not be calculated. The NEB will not print a final GPA on your transcript until you clear the 'NG' subject via a supplementary (grade improvement) exam." 
      },
      { 
        question: "Can I take admission in Class 11 with an NG on my transcript?", 
        answer: "No. The Ministry of Education strictly prohibits any higher secondary school or college from admitting a student who holds an 'NG' in any subject on their final SEE transcript." 
      },
      { 
        question: "How many subjects can I give the supplementary exam for?", 
        answer: "Under current NEB rules, you are allowed to sit for the immediate supplementary (Grade Improvement) exams for a maximum of TWO subjects in which you received an 'NG'." 
      },
      { 
        question: "What if I get NG in more than two subjects?", 
        answer: "If you receive an 'NG' in three or more subjects, you are ineligible for the immediate supplementary exams. You must wait for the next annual SEE cycle to re-appear for the exams." 
      },
      { 
        question: "Do practical marks help me pass the theory exam?", 
        answer: "Absolutely not. The new grading directive completely decouples theory and practicals. Even if you score 25/25 in practicals, scoring 25/75 in theory means you fail the theory component and receive an NG." 
      },
      { 
        question: "What GPA is required to study Science in +2?", 
        answer: "While government minimums require at least a 2.0 GPA, most reputed science colleges in Nepal set their own independent thresholds, typically requiring a 3.0+ GPA with high grades specifically in Science and Compulsory Math." 
      },
      { 
        question: "Is there an A++ grade?", 
        answer: "No. The highest possible grade in the NEB system is an A+, which corresponds to a Grade Point of 4.0 and is awarded for scoring between 90% and 100%." 
      },
      { 
        question: "Does this grading system apply to Class 11 and 12 as well?", 
        answer: "Yes. The NEB Letter Grading Directive 2078 applies universally across secondary education in Nepal, meaning Class 11 and 12 board exams utilize the exact same 35% theory / 40% practical threshold rules." 
      }
    ]
  },
  'lok-sewa-age': {
    title: "Lok Sewa Age Limit Calculator | PSC Eligibility Auditor",
    description: "Calculate your exact age for Nepal Lok Sewa Aayog exams. 1500+ words on PSC cut-offs, gender exemptions, and Kharidar/Subba/Officer age thresholds.",
    
    howToUse: {
      steps: [
        "1. Position Selection: Choose the civil service tier you are applying for (e.g., Non-Gazetted 2nd Class/Kharidar, Gazetted 3rd Class/Section Officer, or Technical fields like Engineering/Health).",
        "2. Demographic Input: Select your gender and physical ability status (Male, Female, Differently-Abled). The PSC grants massive age exemptions based on these parameters.",
        "3. Date of Birth Entry: Input your exact Date of Birth as printed on your Nepali Citizenship Certificate (Nagarikta) using the Bikram Sambat (B.S.) calendar.",
        "4. Application Deadline Entry: Input the final deadline date for form submission as published in the official Lok Sewa Aayog vacancy advertisement.",
        "5. Age Precision Math: The system calculates your exact age down to the day (Years, Months, Days).",
        "6. Threshold Validation: The algorithm cross-references your exact age against the strict lower boundary (e.g., must be 18 or 21) and the upper ceiling (e.g., max 35 or 40).",
        "7. Final Eligibility Verdict: Receive an immediate 'Eligible' or 'Disqualified' status. If you are disqualified by a single day, the system will flag the exact violation.",
        "8. Prior Service Exemption: If you are an already permanent civil servant applying for internal promotion, acknowledge the absolute lack of age limits for internal competitions."
      ]
    },
    
    formula: {
      title: "The PSC Demographic Eligibility Axiom",
      description: "The Public Service Commission (Lok Sewa Aayog) of Nepal utilizes a strict, binary age-gating system designed to ensure longevity in civil service while promoting gender and demographic inclusion.",
      raw: "Eligibility = (Target Age ≥ Minimum Threshold) AND (Target Age ≤ Maximum Ceiling)",
      variables: [
        "Target Age = Application Deadline Date - Citizenship Date of Birth (calculated in precise Years, Months, and Days).",
        "Minimum Threshold = 18 Years for Non-Gazetted (Kharidar, Subba). 21 Years for Gazetted (Section Officer, Engineering/Health).",
        "Maximum Ceiling (Male) = 35 Years for standard administrative posts.",
        "Maximum Ceiling (Female/Disabled) = 40 Years (A statutory 5-year extension to promote inclusion).",
        "Prior Service Ceiling = No age limit for current permanent government employees."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-rose-50/50 border-l-4 border-rose-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-rose-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Civil Service Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Securing a permanent position via the <a href="https://psc.gov.np" target="_blank" rel="noopener noreferrer" className="text-rose-700 hover:text-rose-900 underline font-semibold transition-colors">Public Service Commission (Lok Sewa Aayog </a> is the ultimate career milestone in Nepal. However, the path to the 'Jagir' is gate-kept by uncompromising age limits. Missing a deadline by a single day due to a misunderstood Bikram Sambat (B.S.) date calculation can permanently end a candidate's eligibility. Since the implementation of the <strong>Civil Service Act 2049</strong>, the government has enforced a strict binary age-ceiling, with progressive exemptions for women and differently-abled candidates. This professional <a href="/calculator/lok-sewa-age" className="text-rose-700 hover:text-rose-900 underline font-bold transition-colors">PSC Eligibility Auditor</a> eliminates the guesswork. By synchronizing your citizenship Date of Birth with official vacancy deadlines, our engine provides a definitive verdict on your eligibility status for Kharidar, Subba, and Officer tiers in FY 2082/83.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Career Strategy: If you are approaching the age limit, ensure your academic documents are audit-ready. Verify your GPA thresholds using our <a href="/calculator/see-gpa" className="text-rose-700 hover:text-rose-900 underline font-bold transition-colors">SEE & NEB Intelligence Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: PSC Age Precision
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Generic Age Apps</td>
        <td className="p-4">Only uses A.D.; fails on B.S. month lengths.</td>
        <td className="p-4 text-rose-700 font-bold">Native B.S. Date Math</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Facebook PSC Groups</td>
        <td className="p-4">Inaccurate advice on 'double-fee' deadlines.</td>
        <td className="p-4 text-rose-700 font-bold">Lock-to-Deadline Logic</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Tuition Centers</td>
        <td className="p-4">Mental math errors on leap-year B.S. cycles.</td>
        <td className="p-4 text-rose-700 font-bold">100% Binary Accuracy</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE DEMOGRAPHIC AGE SHIELD
        ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Inclusion Slabs: 35 vs 40 Years
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In a bid to modernize the Nepali bureaucracy and promote inclusion, the PSC applies different age ceilings based on the candidate's demographic profile.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Candidate Category</th>
        <th className="p-4 font-black text-slate-900 uppercase">Maximum Age Ceiling</th>
        <th className="p-4 font-black text-slate-900 uppercase">Legal Basis</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-slate-900">Male Candidates (Open </td><td className="p-4">35 Years</td><td className="p-4">Standard Civil Service Act rule.</td></tr>
        <tr><td className="p-4 font-bold text-rose-700">Female Candidates</td><td className="p-4 font-bold">40 Years</td><td className="p-4">Statutory 5-year extension for gender equity.</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Differently-Abled</td><td className="p-4 font-bold">40 Years</td><td className="p-4">Social security and inclusion provision.</td></tr>
        <tr><td className="p-4 font-bold text-emerald-700">Technical Posts (Health/Eng </td><td className="p-4">45 Years</td><td className="p-4">Extended ceiling for specialized professional tiers.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The age is locked as of the <strong>Last Date of Application</strong>. If the deadline is Baisakh 30 and you turn 36 on Jestha 1, you are eligible. If you turn 36 on Baisakh 30, you are disqualified.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: MINIMUM AGE THRESHOLDS
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-rose-600">🛡️</span> The Lower Boundary: 18 vs 21
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Just as there is an upper ceiling, there is a mandatory lower boundary for entering the government service.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Non-Gazetted (Kharidar/Subba :</strong> Candidates must have completed exactly 18 years of age. Even with a brilliant SEE/SLC result, a 17-year-old cannot legally apply.</li><li><strong>Gazetted (Section Officer :</strong> The officer tier requires a higher level of maturity and a Bachelor's degree. The minimum age is strictly 21 years.</li><li><strong>The 'Current Age' Trap:</strong> Many candidates assume that if they turn 21 next month, they can apply now. The PSC audits your age at the specific moment the vacancy closes.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: THE NO-LIMIT EXEMPTION
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-rose-400">🏛️</span> The 'Jagire' Shield: No Age Limits
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        One of the greatest benefits of entering the civil service early is the removal of future age-gating for internal promotions and competitions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Internal Competitions:</strong> If you are already a permanent (Sthayi employee, you can apply for higher-level officer posts even at age 50.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Career Longevity:</strong> Entering as a Kharidar at age 19 means 39 years of pensionable service, maximizing your retirement terminal value.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Contract (Karar Trap:</strong> Note that this 'No Age Limit' rule does NOT apply to contract workers. Only PSC-appointed permanent staff are exempt.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "If you are 34 years and 11 months old, this is your last 'Open' chance. Do not wait for the double-fee period to submit your form; the PSC servers often crash in the final hours. Once you secure the job, audit your future pension wealth using our <a href="/calculator/nepal-provident-fund" className="text-rose-400 underline font-bold">EPF & CIT Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-rose-50 border border-rose-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-rose-900 mb-4">
        Strategic Case Study: The "Double Fee" Misconception
        </h3>
        <p className="text-rose-900/70 text-sm leading-relaxed mb-8">
        A male candidate turns 35 years old on Baisakh 25. The official vacancy deadline for 'Normal Fee' is Baisakh 20, and the 'Double Fee' deadline is Baisakh 27. Is he eligible?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Candidate's Logic</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Age on Baisakh 20:</span> <strong>34 Years, 11 Months</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Age on Baisakh 27:</span> <strong>35 Years, 2 Days</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Assumption:</span> <span>Eligible if paying double fee.</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-rose-600 uppercase tracking-widest mb-4">The PSC Auditor's Verdict</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Statutory Age Lock:</span> <strong>Normal Fee Deadline (Baisakh 20 </strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Age at Lock:</span> <strong>34y 11m (Under 35 </strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-black text-emerald-700"><span>Final Status:</span> <span>ELIGIBLE</span></div>
        
        
        
        <p className="text-xs text-rose-900/50 mt-8 italic text-center">
        Audit Observation: The candidate is eligible because the PSC locks the age as of the <strong>Normal Fee Deadline</strong>. Even if he submits the form during the double-fee week when he is technically over 35, the system calculates his age retrospectively to Baisakh 20. Optimize your application timing using our <a href="/calculator/nepali-date" className="text-rose-600 underline font-bold">BS-AD Sync Lab</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly conform to the Nepal Civil Service Act and PSC Examination Regulations.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What does 'Not exceeding 35 years' mathematically mean?", 
        answer: "It means your maximum allowable age is 34 years, 11 months, and 29 days on the application deadline. The moment you hit exactly 35 years and 0 days, you are disqualified." 
      },
      { 
        question: "Is my age calculated based on the English (A.D.) or Nepali (B.S.) date?", 
        answer: "The Lok Sewa Aayog relies exclusively on the Nepali (Bikram Sambat) Date of Birth printed on your official Nepali Citizenship Certificate (Nagarikta)." 
      },
      { 
        question: "Does the Double Fee week give me an age extension?", 
        answer: "No. The PSC explicitly states that age eligibility is locked to the 'Normal Fee Deadline'. The 7-day double-fee period does not affect your age calculation either positively or negatively." 
      },
      { 
        question: "Why do female candidates get until age 40 to apply?", 
        answer: "To promote gender inclusion and correct historical imbalances in the male-dominated civil service, the Civil Service Act grants a statutory 5-year age extension for women." 
      },
      { 
        question: "Are there age limits for internal promotions?", 
        answer: "No. If you are already a permanent government employee appointed through the PSC, there is no age limit for applying to higher positions through internal competitive exams." 
      },
      { 
        question: "What is the age limit for Technical posts like Engineers or Doctors?", 
        answer: "Because these professions require extended years of university education, the PSC sets the upper limit at 40 years for technical/engineering posts and 45 years for health service posts (for both male and female candidates)." 
      },
      { 
        question: "Can I apply for Section Officer (Adhikrit) at age 20?", 
        answer: "No. The Gazetted 3rd Class (Section Officer) tier requires a minimum completion of 21 years of age. Even if you have completed your Bachelor's degree at 20, you must wait until your 21st birthday." 
      },
      { 
        question: "What if my citizenship only has a birth year, no month or day?", 
        answer: "If your citizenship certificate only states the year (e.g., 'Born in 2050 B.S.'), the PSC administratively considers your birth date as Baisakh 1st of that year for age calculation purposes." 
      },
      { 
        question: "Do temporary government contract workers get age exemptions?", 
        answer: "No. Only permanent civil servants appointed by the PSC receive the 'No Age Limit' exemption. Contract (Karar) workers must abide by the standard 35/40 year limits." 
      },
      { 
        question: "Are the age limits the same for Nepal Police and Army?", 
        answer: "Absolutely not. Security forces have their own distinct and much stricter regulations. For instance, the age limit to apply for a Police Inspector is typically capped around 25 years." 
      }
    ]
  },
  'nepal-land': {
    title: "Nepal Land Area Converter | Bigha-Katha & Ropani-Aana Auditor",
    description: "Convert Nepal land area measurements accurately. 1500+ words on Bigha-Katha-Dhur (Terai) to Ropani-Aana-Paisa (Hills), Square Feet conversions, and real estate valuation.",
    
    howToUse: {
      steps: [
        "1. Select Regional System: Choose your primary input system. The Terai system uses Bigha-Katha-Dhur-Kanwa, while the Hilly system uses Ropani-Aana-Paisa-Daam.",
        "2. Input the Values: Enter your land measurements. For example, if your land is '2 Aana 3 Paisa', enter 2 in the Aana field and 3 in the Paisa field.",
        "3. Universal Conversion: The engine instantly translates your input into the opposing regional system (e.g., converting Aana into Katha).",
        "4. Standardized Metrics Audit: The system simultaneously outputs the exact equivalent in standard global units: Square Feet (sq.ft), Square Meters (sq.m), and Acres.",
        "5. Fractional Precision Validation: Because land in Kathmandu is sold by the square foot, observe the decimal precision. 1 Aana is exactly 342.25 sq.ft. Never accept a rounding down to 342 sq.ft.",
        "6. Valuation Mapping: Use the resulting Square Feet output to calculate your total land valuation based on current local 'Aana' or 'Dhur' market rates.",
        "7. Blueprint Alignment: If you are an engineer or architect, use the Square Meter output to align with municipal building permit (Naksha Pass) requirements.",
        "8. Legal Verification: Ensure the numbers generated match the area written on your Land Ownership Certificate (Lalpurja) before executing any Malpot transaction."
      ]
    },
    
    formula: {
      title: "The Land Survey Department Axiom",
      description: "Nepal utilizes two distinct, non-decimal regional land measurement systems. The Department of Survey maintains strict legal conversions against the metric and imperial systems.",
      raw: "Standardization = (Regional Unit x Conversion Factor) = Base Square Feet",
      variables: [
        "Hilly System Base: 1 Ropani = 16 Aana. 1 Aana = 4 Paisa. 1 Paisa = 4 Daam.",
        "Hilly Conversion: 1 Aana = Exactly 342.25 sq.ft (31.79 sq.m). 1 Ropani = 5476 sq.ft.",
        "Terai System Base: 1 Bigha = 20 Katha. 1 Katha = 20 Dhur. 1 Dhur = 16 Kanwa.",
        "Terai Conversion: 1 Dhur = Exactly 182.25 sq.ft (16.93 sq.m). 1 Katha = 3645 sq.ft.",
        "Cross-System Equivalence: 1 Bigha = 13.31 Ropani (approx)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Real Estate Measurement Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Real estate in Nepal is governed by two archaic, deeply entrenched measurement systems: the Ropani-Aana system in the hilly regions (including Kathmandu Valley and the Bigha-Katha system in the Terai plains. In regions where a single 'Aana' of land can exceed Rs. 1 Crore (10 Million a calculation error of a few decimal points in Square Feet translates to millions of rupees in lost capital. Furthermore, the <a href="https://dos.gov.np" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 underline font-semibold transition-colors">Department of Survey (Napi Karyalaya </a> and the Land Revenue Office (Malpot mandate absolute precision when registering property ownership certificates (Lalpurja or approving municipal building blueprints. This professional <a href="/calculator/nepal-land" className="text-emerald-700 hover:text-emerald-900 underline font-bold transition-colors">Land Area Auditor</a> eradicates the opacity of broker negotiations. By providing exact conversions down to the 'Daam' and 'Kanwa' and translating them into globally recognized Square Feet and Square Meters, our engine guarantees mathematical dominance during property transactions.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Investment Strategy: Once your exact land area is validated, use the resulting valuation to calculate your borrowing capacity with our <a href="/calculator/nepal-home-loan" className="text-emerald-700 hover:text-emerald-900 underline font-bold transition-colors">Mortgage & Home Loan Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: Land Area Precision
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Broker Verbal Conversions</td>
        <td className="p-4">Rounds down sq.ft (Skims small fractions .</td>
        <td className="p-4 text-emerald-700 font-bold">Exact Decimal Audit</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Online Unit Converters</td>
        <td className="p-4">Generic sq.ft to sq.m; no Paisa/Daam logic.</td>
        <td className="p-4 text-emerald-700 font-bold">Native Lalpurja Math</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Manual Formula Sheets</td>
        <td className="p-4">Slow; high risk of mathematical error.</td>
        <td className="p-4 text-emerald-700 font-bold">Instant G2G Calibration</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE HILLY SYSTEM (ROPANI-AANA ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Kathmandu Standard: Ropani, Aana, Paisa, Daam
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Used primarily in Kathmandu Valley and hilly districts, this system is highly granular. Because land in the capital is exceptionally expensive, transactions frequently negotiate down to the 'Paisa' and 'Daam'.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Unit</th>
        <th className="p-4 font-black text-slate-900 uppercase">Internal Composition</th>
        <th className="p-4 font-black text-slate-900 uppercase">Exact Square Feet</th>
        <th className="p-4 font-black text-slate-900 uppercase">Square Meters</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-emerald-700">1 Ropani</td><td className="p-4">16 Aana</td><td className="p-4 font-bold">5476.00 sq.ft</td><td className="p-4">508.74 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">1 Aana</td><td className="p-4">4 Paisa</td><td className="p-4 font-bold">342.25 sq.ft</td><td className="p-4">31.80 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">1 Paisa</td><td className="p-4">4 Daam</td><td className="p-4 font-bold">85.56 sq.ft</td><td className="p-4">7.95 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-red-700">1 Daam</td><td className="p-4">Base Unit</td><td className="p-4 font-bold">21.39 sq.ft</td><td className="p-4">1.99 sq.m</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The standard dimensions of 1 Aana are theoretically defined as a 16 ft by 21.39 ft rectangle. If a broker tells you "1 Aana is 342 square feet," they are skimming 0.25 sq.ft. At Rs. 1 Crore per Aana, that 0.25 sq.ft is worth Rs. 7,300. Demand exact decimals.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE TERAI SYSTEM (BIGHA-KATHA ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-emerald-500">🌾</span> The Terai Expanse: Bigha, Katha, Dhur
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the southern plains (Terai agricultural and residential land is measured in much larger base units. The conversion scale here operates on a factor of 20.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Unit</th>
        <th className="p-4 font-black text-slate-900 uppercase">Internal Composition</th>
        <th className="p-4 font-black text-slate-900 uppercase">Exact Square Feet</th>
        <th className="p-4 font-black text-slate-900 uppercase">Square Meters</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-emerald-700">1 Bigha</td><td className="p-4">20 Katha</td><td className="p-4 font-bold">72,900 sq.ft</td><td className="p-4">6,772.63 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">1 Katha</td><td className="p-4">20 Dhur</td><td className="p-4 font-bold">3,645 sq.ft</td><td className="p-4">338.63 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">1 Dhur</td><td className="p-4">16 Kanwa</td><td className="p-4 font-bold">182.25 sq.ft</td><td className="p-4">16.93 sq.m</td></tr>
        </tbody>
        </table>
        </div>
        <p className="mt-4">
        <strong>The Ropani-Bigha Bridge:</strong> A common point of friction is investors from Kathmandu purchasing land in the Terai. It is vital to know that <strong>1 Bigha is substantially larger than 1 Ropani.</strong> In fact, 1 Bigha is mathematically equivalent to 13.31 Ropani.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: THE MUNICIPAL BLUEPRINT TRAP
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-emerald-400">🏗️</span> Naksha Pass: The FAR and Setback Mechanics
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        When you purchase land to build a house, you cannot build on 100% of the area. Municipalities enforce strict Floor Area Ratio (FAR) and setback rules, which are universally calculated in Square Meters, NOT Aana or Dhur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Ground Coverage Limits:</strong> In Kathmandu, typical residential zoning allows a maximum ground coverage of 70%. If you own 4 Aana (127.18 sq.m the maximum footprint of your house can only be 89 sq.m.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Setback Rule:</strong> You must leave a minimum of 5 feet (1.52 meters empty from your neighbor's boundary. If your land is extremely narrow, 5 feet on both sides might render the plot unbuildable.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Road Expansion Cut (MaapDanda :</strong> If your plot is adjacent to a non-standard road, the municipality will "cut" your land area to expand the road. Your Lalpurja may say 5 Aana, but your buildable area might only be 4 Aana.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never value a plot of land solely by its Lalpurja area. Always deduct the road setback (MaapDanda . A 3-Aana plot on an expanding main road might legally become a 2.5-Aana plot upon building permit approval, destroying your expected ROI. Protect your property investments by calculating long-term yields via our <a href="/calculator/property-tax" className="text-emerald-400 underline font-bold">Property Tax Auditor</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Real Estate Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-emerald-500">📄</span> Lalpurja Math
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The government ownership certificate (Lalpurja often lists the area in a combined format like 0-4-2-1 (Ropani-Aana-Paisa-Daam . This specifically means 0 Ropani, 4 Aana, 2 Paisa, and 1 Daam.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📏</span> Haath (Cubit Measurement
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        In rural Terai, locals measure land boundaries in 'Haath' (the length from the elbow to the tip of the middle finger . Legally, the government standardizes 1 Haath as exactly 1.5 feet (18 inches .
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">🏦</span> Bank Valuation Limits
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Banks will not provide a mortgage on land smaller than 2.5 Aana in Kathmandu or 8 Dhur in the Terai, as plots smaller than this are deemed legally unbuildable and therefore possess low collateral liquidation value.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 7: CASE STUDY
        ========================================== */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-emerald-900 mb-4">
        Strategic Case Study: The Fractional Arbitrage
        </h3>
        <p className="text-emerald-900/70 text-sm leading-relaxed mb-8">
        A buyer is purchasing a plot in Lalitpur. The broker verbally claims the plot is "exactly 4 Aana" and quotes a price of Rs. 60 Lakhs per Aana (Total: Rs. 2.40 Crore . However, the Lalpurja explicitly lists the area as 0-3-3-2 (3 Aana, 3 Paisa, 2 Daam .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Mathematical Truth</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Lalpurja Area:</span> <strong>3 Aana, 3 Paisa, 2 Daam</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>3 Aana in sq.ft:</span> <strong>1026.75 sq.ft</strong></div>
        
        
        
        <div className="flex justify-between"><span>3 Paisa in sq.ft:</span> <strong>256.68 sq.ft</strong></div>
        
        
        
        <div className="flex justify-between"><span>2 Daam in sq.ft:</span> <strong>42.78 sq.ft</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Total Exact Area:</span> <span>1326.21 sq.ft</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">The Financial Impact</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Actual Area in Decimal Aana:</span> <strong>3.875 Aana</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Broker's Verbal Claim:</span> <strong>4.00 Aana</strong></div>
        
        
        
        <div className="flex justify-between"><span>Area Deficit:</span> <strong>0.125 Aana (42.78 sq.ft </strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 text-red-700"><span>True Value (3.875 x 60L :</span> <span>Rs. 2,32,50,000</span></div>
        <div className="flex justify-between font-black text-emerald-800 pt-2"><span>Overpayment Averted:</span> <span>Rs. 7,50,000</span></div>
        
        
        
        <p className="text-xs text-emerald-900/50 mt-8 italic text-center">
        Audit Observation: By utilizing the calculator to convert the exact Lalpurja figures (0-3-3-2 into decimal Aana (3.875 the buyer prevents a Rs. 7.5 Lakh overpayment. Brokers frequently round up fractional land measurements to the nearest whole unit. Never pay for "verbal Aanas." If taking a loan for the true amount, structure your EMI using our <a href="/calculator/loan-emi" className="text-emerald-600 underline font-bold">EMI & Amortization Lab</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with the Survey Measurement Act (Napi Ain and the Department of Survey, Government of Nepal.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "How many Square Feet are in exactly 1 Aana?", 
        answer: "By government standard, 1 Aana is exactly 342.25 square feet. It is not 342 sq.ft. Always include the decimal during high-value real estate transactions." 
      },
      { 
        question: "What is the equivalent of 1 Katha in the Aana system?", 
        answer: "1 Katha (Terai system) is equivalent to 3,645 square feet. This roughly translates to 10.65 Aana in the Hilly system." 
      },
      { 
        question: "How is the area on the Lalpurja written?", 
        answer: "In the hills, it is written as a sequence: Ropani-Aana-Paisa-Daam (e.g., 1-4-2-1). In the Terai, it is written as Bigha-Katha-Dhur-Kanwa (e.g., 0-10-5-0). If a number is missing, it is represented as a zero." 
      },
      { 
        question: "Is 'Gaj' used in official Nepal documents?", 
        answer: "No. While 'Gaj' (Yard) is sometimes used colloquially (1 Gaj = 9 square feet), the Land Revenue Office only recognizes Aana/Ropani, Bigha/Katha, and Square Meters for legal documentation." 
      },
      { 
        question: "What is the minimum land size required to pass a house map in Kathmandu?", 
        answer: "Municipal rules vary slightly, but generally, you need a minimum of 2.5 Aana (855.62 sq.ft) of buildable land to pass a standard residential blueprint. The plot must also touch a formally recognized road." 
      },
      { 
        question: "Why does my Lalpurja area not match my actual physical land boundary?", 
        answer: "This is a common issue known as 'Napi Mistake'. It happens if neighbors encroach on boundaries, or if roads were expanded without updating the Lalpurja. The physical area measured by an Amin (surveyor) overrides theoretical documents." 
      },
      { 
        question: "How many Square Meters are in 1 Ropani?", 
        answer: "1 Ropani is equivalent to 508.74 Square Meters. This metric is crucial because all modern municipal engineering documents and tax assessments are processed in Square Meters." 
      },
      { 
        question: "What is the difference between carpet area and built-up area?", 
        answer: "While land is measured by plot boundaries, a house is measured differently. 'Carpet Area' is the usable floor space inside the walls. 'Built-up Area' includes the thickness of the walls and balconies." 
      },
      { 
        question: "How many Aana make 1 Bigha?", 
        answer: "1 Bigha (72,900 sq.ft) is mathematically equal to 213 Aana, or 13.31 Ropani." 
      },
      { 
        question: "Can I legally convert my Terai land document into Ropani?", 
        answer: "While you can mathematically convert the value, the legal Lalpurja will always utilize the system native to the geographical district. A Lalpurja in Biratnagar will always be issued in Bigha-Katha." 
      }
    ]
  },
  'nepal-stocks': {
    title: "NEPSE Share Calculator | Capital Gains & Broker Fee Auditor",
    description: "Calculate exact Nepal Stock Exchange (NEPSE) profits. 1500+ words detailing SEBON broker commissions, Rs. 25 DP charges, and the 5% vs 7.5% Capital Gains Tax (CGT).",
    
    howToUse: {
      steps: [
        "1. Transaction Type: Select whether you are executing a 'Buy' or a 'Sell' order. The cost structure differs entirely based on the transaction direction.",
        "2. Input Market Variables: Enter the exact Number of Shares (Quantity) and the Purchase/Sell Price per share.",
        "3. Regulatory Fees Integration: The system automatically calculates and adds the SEBON regulatory fee (0.015%) and the flat Rs. 25 Depository Participant (DP) charge.",
        "4. Sliding Broker Commission: The algorithm applies the exact broker commission slab based on your total transaction volume (ranging from 0.40% down to 0.27% for massive trades).",
        "5. Capital Gains Tax (CGT) Selection (For Sellers): If selling, declare your holding period. Select 'Short Term' (less than 365 days) for a 7.5% tax, or 'Long Term' (greater than 365 days) for a 5% tax.",
        "6. WACC Validation: Input your Weighted Average Cost of Capital (WACC) to ensure CGT is only applied to your net profit, not your gross sales revenue.",
        "7. Final Ledger Output: Review your 'Effective Buy Price' or 'Net Receivable Amount'. This is the exact capital that will be deducted from your bank account or deposited into it.",
        "8. Break-Even Analysis: Check the break-even price to know exactly how much the stock must rise for you to cover all broker and tax fees before realizing a Rs. 1 profit."
      ]
    },
    
    formula: {
      title: "The NEPSE Regulatory Transaction Axiom",
      description: "Trading on the Nepal Stock Exchange involves a layered fee structure enforced by SEBON, the broker, and the Inland Revenue Department (IRD).",
      raw: "Net Realized Capital = Gross Trade Volume ± (Broker Commission + SEBON Fee + DP Charge) - CGT",
      variables: [
        "Gross Trade Volume = Shares x Price per Share.",
        "SEBON Fee = A mandatory 0.015% levy on all transaction volumes.",
        "DP Charge = A flat Rs. 25 fee per stock transaction, regardless of volume.",
        "Broker Commission = Tiered: Up to Rs. 50K (0.40%), 50K-500K (0.37%), 500K-2M (0.34%), 2M-10M (0.30%), above 10M (0.27%).",
        "CGT (Capital Gains Tax) = Levied ONLY on Net Profit (Selling Price - WACC - Fees).",
        "Holding Threshold = Tax is 7.5% if held under 365 days. Drops to 5% if held over 365 days."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-sky-50/50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Financial Market Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The <a href="https://nepalstock.com.np" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-900 underline font-semibold transition-colors">Nepal Stock Exchange (NEPSE) </a> is heavily regulated by the Securities Board of Nepal (SEBON) . A severe mistake made by retail investors is confusing 'Gross Profit' with 'Net Realized Profit'. Buying a stock for Rs. 500 and selling it for Rs. 510 does not guarantee a Rs. 10 profit; the friction of sliding broker commissions, Rs. 25 flat DP charges, SEBON levies, and Capital Gains Tax (CGT) can quickly turn a theoretical profit into a mathematical loss. Furthermore, the Inland Revenue Department enforces a dual-tier CGT structure designed to penalize short-term speculation (7.5% tax while rewarding long-term holding (5% tax . This professional <a href="/calculator/nepal-stocks" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">NEPSE Broker & Tax Auditor</a> strips away the opacity of your TMS ledger. By simulating the exact SEBON transaction waterfall, our engine reveals your true break-even point and calculates the exact capital that will hit your bank account upon settlement.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Wealth Strategy: Once your stock profits are secured, analyze how quickly those returns will compound over a decade using our <a href="/calculator/cagr-calculator" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">CAGR & Compound Interest Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: THE BROKER COMMISSION SLIDING SCALE
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The Friction: SEBON Broker Commission Tiers
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Stock brokers in Nepal do not charge a flat fee. SEBON enforces a progressive, sliding scale designed to offer volume discounts to institutional investors while maintaining a higher percentage floor for retail traders.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Transaction Volume (Rs. </th>
        <th className="p-4 font-black text-slate-900 uppercase">Broker Commission Rate</th>
        <th className="p-4 font-black text-slate-900 uppercase">Impact on Retail Trader</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold">Up to Rs. 50,000</td><td className="p-4 font-bold text-red-700">0.40%</td><td className="p-4">Highest friction. Heavily impacts small capital.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 50,000 to Rs. 5,00,000</td><td className="p-4 font-bold text-orange-700">0.37%</td><td className="p-4">Standard retail trading bracket.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 5,00,000 to Rs. 20,00,000</td><td className="p-4 font-bold text-blue-700">0.34%</td><td className="p-4">High net-worth retail trades.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 20 Lakh to Rs. 1 Crore</td><td className="p-4 font-bold text-green-700">0.30%</td><td className="p-4">Institutional tier. Significant cost savings.</td></tr>
        <tr><td className="p-4 font-bold">Above Rs. 1 Crore</td><td className="p-4 font-bold text-emerald-700">0.27%</td><td className="p-4">Maximum volume discount (Whale tier .</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The broker commission is charged <strong>twice</strong> on a full trade cycle—once when you buy, and once again when you sell. Therefore, a 0.40% commission effectively costs you 0.80% in total friction just to enter and exit a position.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE FLAT FEES AND INVISIBLE LEVIES
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-sky-500">📉</span> The Invisible Ledger Drains
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Beyond the broker commission, every transaction (both buy and sell is subjected to two non-negotiable regulatory fees. If you execute a high volume of small trades (e.g., buying 10 shares of a cheap stock these flat fees will mathematically destroy your portfolio.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>The SEBON Fee (0.015% :</strong> The Securities Board of Nepal levies a microscopic 0.015% tax on the gross volume of every trade to fund regulatory oversight. While small, it scales infinitely with volume.</li><li><strong>The DP Charge (Rs. 25 :</strong> This is the deadliest fee for small investors. The Depository Participant (your demat provider charges a flat <strong>Rs. 25 per transaction</strong>.</li><li><strong>The Micro-Transaction Trap:</strong> If you buy 10 shares of a company at Rs. 200 (Total Rs. 2,000 the Rs. 25 DP charge represents a massive <strong>1.25% instant loss</strong> on your capital, before broker commissions are even applied.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: CAPITAL GAINS TAX (CGT) ALGORITHM
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-sky-400">🏛️</span> The IRD Tax Shield: 5% vs 7.5% CGT
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Capital Gains Tax is the final extraction from your profitable trades. The Inland Revenue Department (IRD) utilizes a holding-period mechanic to discourage day-trading and encourage long-term capital formation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Short-Term Speculation (7.5% :</strong> If you sell a stock less than 365 days from the date of purchase, the IRD classifies you as a speculator and taxes your net profit at 7.5%.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Long-Term Investment (5.0% :</strong> If you hold the stock for 365 days or more, you are rewarded with a reduced CGT rate of 5%. This 2.5% difference can equate to hundreds of thousands of rupees on large portfolios.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Taxed Only on Profit (WACC) :</strong> Crucially, CGT is only levied on your <em>Net Profit</em>. It is not a tax on revenue. If you sell at a loss (Selling Price is lower than your WACC the CGT is exactly 0%.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never sell a stock on Day 360 if you hold a massive profit. Waiting 5 more days drops your tax burden by 33%. Furthermore, always calculate your WACC immediately after receiving bonus shares or right shares, as they dramatically lower your average cost and exponentially increase your CGT liability. If reinvesting profits into real estate, validate the returns with our <a href="/calculator/sip-calculator/" className="text-sky-400 underline font-bold">ROI & Cash-on-Cash Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        NEPSE Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-sky-500">🧮</span> WACC Importance
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        WACC (Weighted Average Cost of Capital is mandatory before selling. If you forget to calculate WACC in your MeroShare account, the system legally assumes your cost price is Rs. 100, resulting in a maximum possible CGT penalty.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">💰</span> Bonus Share CGT
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        When a company issues Bonus Shares (dividend your average cost drops. However, when you sell those specific bonus shares, the holding period starts from the date they were listed, meaning they often trigger the 7.5% short-term tax.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">⚖️</span> Corporate CGT vs Retail
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The 5% and 7.5% CGT tiers apply strictly to individual retail investors. Institutional investors, mutual funds, and corporate trading firms face a flat 10% Capital Gains Tax on all stock market profits.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-sky-50 border border-sky-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-sky-900 mb-4">
        Strategic Case Study: The Rs. 20 Break-Even Trap
        </h3>
        <p className="text-sky-900/70 text-sm leading-relaxed mb-8">
        A retail trader buys 100 shares of a commercial bank at Rs. 300 (Total Rs. 30,000 . The stock price immediately jumps to Rs. 305. The trader assumes they have made a Rs. 500 profit and decides to sell within 3 days. Let's run the audit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Buying Ledger (Friction </h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Gross Buy Volume:</span> <strong>Rs. 30,000.00</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Broker Comm (0.40% :</span> <strong>+ Rs. 120.00</strong></div>
        
        
        
        <div className="flex justify-between"><span>SEBON (0.015% & DP:</span> <strong>+ Rs. 29.50</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>True Capital Deployed (WACC) :</span> <span>Rs. 30,149.50</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-4">The Selling Ledger (Collapse </h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Gross Sell Volume (at 305 :</span> <strong>Rs. 30,500.00</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Broker, SEBON & DP Fees:</span> <strong>- Rs. 151.58</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold"><span>Net Before Tax:</span> <span>Rs. 30,348.42</span></div>
        <div className="flex justify-between"><span>Taxable Profit:</span> <strong>Rs. 198.92</strong></div>
        
        
        
        <div className="flex justify-between text-red-700"><span>Short-Term CGT (7.5% :</span> <strong>- Rs. 14.92</strong></div>
        <div className="flex justify-between border-t pt-2 mt-2 font-black text-sky-800"><span>Final Net Profit:</span> <span>Rs. 184.00</span></div>
        
        
        
        <p className="text-xs text-sky-900/50 mt-8 italic text-center">
        Audit Observation: The trader believed they made Rs. 500. The reality is they made a trivial Rs. 184. The combined dual-friction of buying and selling destroyed 63% of their expected profit. This proves why high-frequency trading with small capital is mathematically destined to fail in NEPSE. Scale your long-term holding projections using our <a href="/calculator/sip-calculator" className="text-sky-600 underline font-bold">SIP Wealth Generator</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with SEBON regulations, NEPSE trading bylaws, and the Inland Revenue Department (IRD) capital gains directives.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is WACC and why do I have to calculate it?", 
        answer: "WACC (Weighted Average Cost of Capital) calculates your true average buying price, inclusive of all broker fees. You must calculate it in MeroShare before selling so the government knows exactly how much net profit to tax. If you skip this, you are taxed maximally." 
      },
      { 
        question: "Is the Capital Gains Tax (CGT) final in Nepal?", 
        answer: "Yes. For individual retail investors, the 5% or 7.5% CGT deducted by the broker is considered the 'final withholding tax'. You do not need to pay additional income tax on stock market profits during your annual tax return." 
      },
      { 
        question: "What is the Rs. 25 DP fee?", 
        answer: "The Depository Participant (DP) fee is a flat Rs. 25 charge levied every time shares are debited from or credited to your Demat account, regardless of whether you buy 1 share or 10,000 shares." 
      },
      { 
        question: "Do I pay tax if I sell my shares at a loss?", 
        answer: "No. Capital Gains Tax is only applied to profit. If your selling price (after deducting broker fees) is lower than your WACC, your profit is negative, and the CGT applied is exactly 0%." 
      },
      { 
        question: "How long does it take for the money to reach my bank account after selling?", 
        answer: "NEPSE follows a T+2 (Trade + 2 working days) settlement cycle. Brokers are legally required to deposit the net receivable amount into your linked bank account by the 3rd working day." 
      },
      { 
        question: "Can I negotiate the broker commission?", 
        answer: "No. The commission tiers (0.27% to 0.40%) are strictly hard-coded into the TMS software by SEBON. No broker has the legal authority to offer discounts or alter the rates." 
      },
      { 
        question: "What happens to the 365-day rule if I buy the same stock multiple times?", 
        answer: "The system uses the FIFO (First In, First Out) method. If you buy 100 shares in Jan and 100 shares in Dec, and then sell 100 shares next Feb, the system assumes you sold the Jan shares, granting you the 5% long-term tax rate." 
      },
      { 
        question: "Do I have to pay CGT on cash dividends?", 
        answer: "Cash dividends are taxed at a flat rate of 5% at the source. The company deducts this tax before depositing the remaining dividend directly into your bank account. It has nothing to do with broker CGT." 
      },
      { 
        question: "Why did my WACC suddenly decrease?", 
        answer: "If the company distributed Bonus Shares or Right Shares, your total number of shares increased without you deploying proportional capital. The system recalculates and lowers your average cost per share." 
      },
      { 
        question: "What is the SEBON fee used for?", 
        answer: "The 0.015% SEBON fee is a regulatory levy that funds the operations of the Securities Board of Nepal, ensuring market surveillance, fraud prevention, and system maintenance." 
      }
    ]
  },
  'nepal-tds': {
    title: "Nepal TDS Calculator | IRD Withholding Tax Auditor",
    description: "Calculate exact Tax Deducted at Source (TDS) for Nepal. 1500+ words on 1.5% contract tax, 5% rent/dividend tax, and the 15% professional service penalty.",
    
    howToUse: {
      steps: [
        "1. Income Category Selection: Identify the nature of the transaction. TDS rates vary drastically depending on whether the payment is for Rent (10%), Dividends (5%), Consulting (15%), or Goods Contracts (1.5%).",
        "2. Entity Status: Select whether the receiving party is a registered PAN/VAT entity or an unregistered individual. Unregistered entities often face higher penal TDS rates.",
        "3. Payment Input: Enter the Gross Invoice Amount (the total amount billed before tax).",
        "4. Value Added Tax (VAT) Flagging: If the invoice includes 13% VAT, ensure you separate the base amount. TDS is legally calculated on the Base Amount, NOT the VAT-inclusive amount.",
        "5. Tax Calculation: The system multiplies the base amount by the mandated IRD percentage tier.",
        "6. Net Payout Extraction: Review the 'Net Payable Amount'. This is the exact cash the business must deposit into the vendor's bank account.",
        "7. IRD Liability: The deducted TDS amount is a legal liability. It must be deposited to the Inland Revenue Department via the IRD portal by the 25th of the following Nepali month.",
        "8. Advance Tax Verification: Validate whether the deducted TDS is considered a 'Final Withholding Tax' (no more tax needed) or an 'Advance Tax' (adjusted during the fiscal year-end audit)."
      ]
    },
    
    formula: {
      title: "The IRD Withholding Axiom",
      description: "Tax Deducted at Source (TDS) is an anti-evasion mechanism where the payer is legally forced to act as a tax collector for the government before releasing funds to the payee.",
      raw: "Net Payment = Gross Invoice Amount - (Gross Invoice Amount x Statutory TDS %)",
      variables: [
        "Contract of Goods = 1.5% TDS (for VAT registered vendors).",
        "Consultancy / Professional Services = 15% TDS (e.g., IT contractors, auditors, engineers).",
        "Rent (Individual Landlord) = 10% TDS (Final withholding tax paid to local ward).",
        "Dividends / Interest = 5% TDS (Final withholding for individuals).",
        "Meeting Allowances / Windfall = 15% to 25% TDS.",
        "VAT Rule = If an invoice is Rs. 100 + Rs. 13 VAT, TDS is calculated strictly on the Rs. 100 base."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-red-50/50 border-l-4 border-red-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-red-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Corporate Tax Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        In Nepal, the burden of tax collection heavily relies on the Tax Deducted at Source (TDS mechanism enforced by the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900 underline font-semibold transition-colors">Inland Revenue Department (IRD) </a>. If a business pays a freelancer Rs. 1,00,000 for consulting services without deducting the mandatory 15% TDS, the IRD legally assumes the business committed tax evasion. During a fiscal audit, the business will be forced to pay the missing Rs. 15,000 out of its own pocket, plus compounding late fines and interest. For freelancers, consultants, and landlords, failing to understand TDS means you will unexpectedly receive significantly less money than you invoiced. This professional <a href="/calculator/nepal-tds" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">TDS Compliance Auditor</a> maps the exact withholding percentages across all commercial transactions. By mathematically separating the gross invoice from the net payout, our engine ensures businesses remain audit-compliant while protecting vendors from illegal over-deductions.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Corporate Strategy: Cash flow management is critical when 15% of your invoice is withheld by the government. Model your corporate liquidity reserves using our <a href="/calculator/nepal-salary" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">Payroll & Tax Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: THE HIERARCHICAL TDS MATRIX
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The IRD Matrix: Goods, Services, and Windfalls
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        TDS rates in Nepal are not uniform. The government applies low friction to standard commerce (goods but heavily taxes specialized services and passive income streams.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Nature of Payment</th>
        <th className="p-4 font-black text-slate-900 uppercase">TDS Rate</th>
        <th className="p-4 font-black text-slate-900 uppercase">Regulatory Application</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold">Contract for Goods / Procurement</td><td className="p-4 font-bold text-green-700">1.5%</td><td className="p-4">Standard business supplies. Must be VAT registered.</td></tr>
        <tr><td className="p-4 font-bold">Dividend / Bank Interest (Individual </td><td className="p-4 font-bold text-blue-700">5.0%</td><td className="p-4">Passive income. Treated as final withholding tax.</td></tr>
        <tr><td className="p-4 font-bold">Building / Land Rent (Individual </td><td className="p-4 font-bold text-orange-700">10.0%</td><td className="p-4">Paid to the local ward office, not the IRD.</td></tr>
        <tr><td className="p-4 font-bold">Consultancy / Professional Service</td><td className="p-4 font-bold text-red-700">15.0%</td><td className="p-4">Engineers, lawyers, freelancers, IT consultants.</td></tr>
        <tr><td className="p-4 font-bold">Windfall / Lottery Gains</td><td className="p-4 font-bold text-purple-700">25.0%</td><td className="p-4">Game shows, lotteries. Brutal final tax extraction.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: If a payment is made to a person or business that does NOT possess a PAN (Permanent Account Number the IRD mandates that TDS must be deducted at a punitive rate, often defaulting to 15% regardless of the goods/services provided.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: ADVANCE TAX VS FINAL WITHHOLDING
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-500">🛡️</span> Final Withholding vs Advance Tax
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        A major point of confusion for freelancers and investors is whether the deducted TDS means their tax obligations for the year are completely finished. The IRD categorizes TDS into two distinct legal states:
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Final Withholding Tax:</strong> If TDS is deducted on Bank Interest (5% Dividends (5% or Capital Gains (5%/7.5% this is the final extraction. You do not need to declare this income or pay additional taxes on it during your annual fiscal return.</li><li><strong>Advance Tax:</strong> The 15% TDS deducted from a consultant's invoice is NOT final. It is an "Advance Tax." At the end of the fiscal year, the consultant must calculate their total annual income, apply standard income tax slabs, and then subtract the 15% TDS already paid. If their total tax liability is higher, they must pay the difference. If lower, they can claim a refund (though rare in practice .</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE VAT INTERACTION
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-red-400">✖️</span> The VAT & TDS Mathematical Sequence
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        When an invoice includes the 13% Value Added Tax (VAT) calculating TDS incorrectly is the most common auditing failure in Nepali accounting. TDS must NEVER be calculated on the gross VAT-inclusive total.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Base Isolation:</strong> An IT company invoices Rs. 1,00,000 + Rs. 13,000 VAT (Total: Rs. 1,13,000 . The accountant must isolate the Rs. 1,00,000 base.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The TDS Strike:</strong> The 1.5% TDS is calculated ONLY on the Rs. 1,00,000 base. The deducted amount is Rs. 1,500.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Legal Payout:</strong> The paying company releases the remaining base (Rs. 98,500 PLUS the full VAT amount (Rs. 13,000 . The total cash paid to the IT company is Rs. 1,11,500.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "If your accountant calculates TDS on the VAT-inclusive amount, you are illegally withholding excess funds from the vendor. This will result in immediate rejection of the TDS return during IRD portal upload. Conversely, if you are a VAT-registered business, ensure your clients return your TDS certificates. Without certificates, you cannot claim the advance tax. Validate your gross margins using our <a href="/calculator/nepal-vat" className="text-red-400 underline font-bold">VAT Ledger Auditor</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Corporate Compliance Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-500">🏢</span> Rent TDS (Local Govt </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        By law, the 10% TDS deducted from house rent must be paid to the local Ward Office / Municipality, NOT the Inland Revenue Department. It is the sole jurisdiction of local government.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">⌛</span> The 25th Day Rule
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        If you deduct TDS in the month of Baishakh, you must deposit that money to the government portal by the 25th of Jestha. Failure to do so triggers a compounding 15% per annum penalty.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> E-TDS Certificate
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Deducting the tax is not enough. The business must generate an E-TDS certificate from the IRD portal and provide it to the vendor. The vendor uses this certificate to prove they have paid their taxes.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-red-50 border border-red-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-red-900 mb-4">
        Strategic Case Study: The Freelancer's 15% Shock
        </h3>
        <p className="text-red-900/70 text-sm leading-relaxed mb-8">
        A software developer secures a contract with a corporate firm for Rs. 2,00,000. They expect Rs. 2 Lakh to hit their bank account. However, because they are an independent consultant, the firm applies the statutory 15% Professional Services TDS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Payout Mechanics</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Gross Contract Value:</span> <strong>Rs. 2,00,000</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Professional TDS Rate:</span> <strong>15%</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>Amount Withheld by Firm:</span> <span>Rs. 30,000</span></div>
        <div className="flex justify-between font-black text-slate-900 pt-2"><span>Net Cash Transferred:</span> <span>Rs. 1,70,000</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">The Gross-Up Solution</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Target Net Required:</span> <strong>Rs. 2,00,000</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Gross-Up Formula:</span> <strong>Net / (1 - 0.15 </strong></div>
        
        
        
        <div className="flex justify-between"><span>New Invoiced Amount:</span> <strong>Rs. 2,35,294</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 text-red-700"><span>15% TDS on New Amount:</span> <span>- Rs. 35,294</span></div>
        <div className="flex justify-between font-black text-red-800 pt-2"><span>Achieved Net Payout:</span> <span>Rs. 2,00,000</span></div>
        
        
        
        <p className="text-xs text-red-900/50 mt-8 italic text-center">
        Audit Observation: Freelancers frequently absorb the 15% TDS as a loss because they fail to negotiate "Net of Tax." If you require exactly Rs. 2 Lakh to survive, you must mathematically "gross up" your invoice to Rs. 2,35,294. The company pays the Rs. 35K tax to the IRD, and you receive your full target amount. Structure your business revenue goals using our <a href="/calculator/sip-calculator/" className="text-red-600 underline font-bold">Financial Business Lab</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with the Income Tax Act 2058 (2002 and recent fiscal budget directives issued by the Inland Revenue Department (IRD) .
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Who is legally responsible for deducting TDS?", 
        answer: "The entity making the payment (the buyer or client) is legally responsible. If they fail to deduct TDS, the IRD will hold them liable for the tax amount, not the person who received the money." 
      },
      { 
        question: "Does TDS apply to individual freelancers without a PAN?", 
        answer: "Yes, and it is punitive. By law, payments exceeding Rs. 1,000 cannot be made to an individual without a PAN. If a company does so, they are usually forced to deduct a flat 15% to remain compliant during audits." 
      },
      { 
        question: "Is TDS calculated on the VAT amount?", 
        answer: "Never. TDS is calculated strictly on the base taxable amount. VAT is a consumer tax and must be passed through completely untouched." 
      },
      { 
        question: "What is a TDS Certificate?", 
        answer: "It is an official document generated from the IRD portal by the payer. It proves to the government that the payer deducted your tax and deposited it under your PAN. Without it, you cannot claim advance tax credit." 
      },
      { 
        question: "Why was 10% TDS deducted from my rent?", 
        answer: "The government mandates a 10% tax on building and land rent. If the landlord is an individual, this 10% is a final withholding tax and must be deposited at the local Ward Office by the tenant." 
      },
      { 
        question: "Can I get a refund if my TDS is higher than my actual tax liability?", 
        answer: "Yes, theoretically. Since 15% consultancy TDS is an 'Advance Tax', if your total year-end tax liability is less than the TDS already deducted, you can carry the credit forward to the next year or claim a refund (though the refund process is heavily scrutinized)." 
      },
      { 
        question: "What is the TDS rate on Bank Interest?", 
        answer: "For individual depositors, the TDS on fixed deposit and savings account interest is 5%. It is automatically deducted by the bank before crediting your account and is considered a final tax." 
      },
      { 
        question: "Do I have to deduct TDS on a Rs. 5,000 stationery purchase?", 
        answer: "No. The IRD generally exempts standard consumer goods purchases under a specific threshold (often Rs. 50,000 per invoice) from the 1.5% goods TDS, provided the supplier issues a valid PAN/VAT invoice." 
      },
      { 
        question: "What is the penalty for not depositing TDS on time?", 
        answer: "If TDS is not deposited by the 25th of the following month, the IRD imposes an immediate 15% per annum interest penalty on the outstanding amount, calculated daily." 
      },
      { 
        question: "Are foreign payments subject to TDS?", 
        answer: "Yes. Payments for software, royalties, or technical services to foreign entities are subject to heavy TDS (often 15%), unless a specific Double Taxation Avoidance Agreement (DTAA) exists with that country." 
      }
    ]
  },
  'nepal-attendance': {
    title: "Nepal University Attendance Calculator | 75% Exam Eligibility Auditor",
    description: "Calculate your mandatory class attendance for TU, KU, POU, and PU. 1500+ words on 75% thresholds, medical leaves, and internal marks auditing for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Total Classes Calibration: Input the total number of classes conducted or scheduled for the semester.",
        "2. Presence Entry: Input the number of classes you have physically attended or logged.",
        "3. Threshold Selection: Define the mandatory minimum percentage (Standard is 75% for most Nepali universities).",
        "4. Deficit Analysis: The engine calculates how many more classes you MUST attend to reach the safe zone.",
        "5. Bunk Logic: Determine how many upcoming classes you can safely miss without dropping below the threshold.",
        "6. Medical Leave Sync: Add any documented medical or institutional leaves to adjust your net presence.",
        "7. Internal Marks Audit: Review the correlation between attendance percentages and internal assessment grading.",
        "8. Exam Eligibility Verdict: Receive an immediate institutional status (Eligible or Disqualified)."
      ]
    },
    
    formula: {
      title: "The Academic Eligibility Axiom",
      description: "Attendance is calculated as a simple percentage of total conducted sessions, adjusted for institutional leave policies.",
      raw: "Attendance % = (Classes Attended / Total Classes Conducted) x 100",
      variables: [
        "Classes Attended = Physical presence or verified virtual logs.",
        "Total Classes Conducted = Total sessions scheduled by the department.",
        "Classes to Attend = [(Threshold x Total) / 100] - Attended.",
        "Safe Bunk Count = Attended - [(Threshold x Total) / 100]."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Academic Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        In the Nepali higher education ecosystem—governed by institutions like <strong>Tribhuvan University (TU) </strong>, <strong>Kathmandu University (KU) </strong>, and <strong>Pokhara University (POU) </strong>—the 75% attendance rule is not a suggestion; it is a rigid administrative barrier. Falling below this threshold results in being barred from final board examinations, regardless of academic merit or internal marks. This professional <a href="/calculator/nepal-attendance" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Attendance Auditor</a> is designed to give students absolute control over their eligibility status. By mathematically modeling future class schedules against current presence, our engine provides a predictive roadmap for semester success. Whether you are balancing work-study commitments or recovering from illness, our auditor ensures you remain in the "Safe Zone" for FY 2082/83.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Career Strategy: High attendance often correlates with higher internal marks and GPA. Model your academic terminal value using our <a href="/calculator/see-gpa" className="text-indigo-600 hover:text-indigo-800 underline font-bold transition-colors">GPA Intelligence Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: UNIVERSITY STANDARDS
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The 75% Benchmark: Institutional Breakdown
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Most universities in Nepal adhere to the University Grants Commission (UGC) guidelines, which mandate a minimum attendance for student validation.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">University</th>
        <th className="p-4 font-black text-slate-900 uppercase">Requirement</th>
        <th className="p-4 font-black text-slate-900 uppercase">Consequence of Failure</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-indigo-700">Tribhuvan University (TU) </td><td className="p-4 font-bold">70% - 80%</td><td className="p-4">Barred from Board Exams</td></tr>
        <tr><td className="p-4 font-bold text-sky-700">Kathmandu University (KU) </td><td className="p-4 font-bold">80%</td><td className="p-4">Non-eligibility for Grading</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Pokhara University (POU) </td><td className="p-4 font-bold">75%</td><td className="p-4">NC (Not Cleared Status</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">Purbanchal University</td><td className="p-4 font-bold">75%</td><td className="p-4">Administrative Hold</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Audit Note: While the official rule is 75%, many departments allow a 5-10% grace for medical emergencies, provided official documentation is submitted through the proper administrative channels.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: MEDICAL & LEAVE LOGISTICS
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-indigo-600">🛡️</span> Navigating Medical & Institutional Leaves
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Life in Nepal can be unpredictable. Universities recognize this through specific leave categories that can safeguard your eligibility.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Medical Leave:</strong> Requires a doctor's certificate from a recognized hospital. This usually allows the minimum requirement to drop to 60-65% in extreme cases.</li><li><strong>Institutional Duty:</strong> If you are representing your college in sports, debates, or workshops, these missed classes are often marked as 'Appeared' (Attendance given .</li><li><strong>Bereavement Leave:</strong> Typically a 13-day provision in Nepali institutions for immediate family rites, often handled with extreme administrative sensitivity.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE INTERNAL MARKS LINK
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-indigo-400">📊</span> Attendance as a Grading Variable
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        In modern semester systems, attendance isn't just about being allowed to sit for exams—it directly impacts your final GPA through internal assessments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Direct Weightage:</strong> Many subjects allocate 5-10% of total marks specifically for attendance consistency.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Halo Effect:</strong> High attendance indicates to professors that you are a serious candidate, which often results in more favorable subjective grading for viva and projects.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Peer Synergy:</strong> Constant presence allows for better collaboration in lab groups, leading to superior final project quality.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Think of your attendance as 'Equity' in your education. Once it drops below 75%, you lose the ability to participate in the final exam market. If you have been attending regularly but struggle with exams, audit your age-limits for government jobs using our <a href="/calculator/lok-sewa-age" className="text-indigo-400 underline font-bold">Lok Sewa Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Academic Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-indigo-500">🎓</span> 75% Rule Origin
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The rule was established to ensure that students engage with the practical and social elements of campus life, not just rote memorization of textbooks for exams.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🏫</span> Proxy Culture
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        While 'Proxy' attendance is common in some large TU colleges, modern biometric systems in private institutions are rapidly making manual rolls obsolete.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">🏃</span> The 'Safe Zone'
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Aiming for 85% provides a buffer for the final weeks of the semester, allowing you to miss classes for intensive self-study or unexpected emergencies.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The "Semester Rescue" Audit
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A student has attended 40 out of 60 classes. The total semester has 100 classes. They need 75% to appear in boards.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Current Status</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Total Scheduled:</span> <strong>100</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Current Presence:</span> <strong>40/60 (66%) </strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>Status:</span> <span>High Risk Zone</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Recovery Plan</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Target Required:</span> <strong>75 Classes</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Remaining Classes:</span> <strong>40</strong></div>
        
        
        
        <div className="flex justify-between"><span>Must Attend:</span> <strong>35 more</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-indigo-700"><span>Verdict:</span> <span>Recoverable</span></div>
        
        
        
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: The student can only miss 5 more classes out of the remaining 40. This leaves no room for leisure bunking. Prioritize your mental health during high-stress weeks using our <a href="/calculator/sleep" className="text-indigo-600 underline font-bold">Sleep Auditor</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Academic Audit: Last updated Baishakh 2083 (May 2026). Calculations are synchronized with UGC Nepal mandates and major university semester bylaws.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the minimum attendance required in Tribhuvan University?", 
        answer: "As per TU regulations, a student must have at least 70% to 80% attendance in each subject to be eligible to appear in the final board examination." 
      },
      { 
        question: "What happens if I have 74% attendance?", 
        answer: "Strictly speaking, you are disqualified. However, many colleges allow you to make up the deficit through extra assignments or by submitting a formal medical appeal to the Department Head." 
      },
      { 
        question: "Can medical leave cover my low attendance?", 
        answer: "Yes. If you have a legitimate medical emergency, you can submit a doctor's certificate. This usually allows the department to condone up to 10-15% of your absence." 
      },
      { 
        question: "How do I calculate how many classes I can miss?", 
        answer: "Multiply the total number of classes by 0.75. Subtract this number from your current attendance. If the result is positive, that is your 'Safe Bunk' count." 
      },
      { 
        question: "Does attendance affect my internal marks?", 
        answer: "Yes, in most semester systems, attendance is a direct component of your internal assessment (often worth 5 marks per subject)." 
      },
      { 
        question: "Is biometric attendance mandatory in Nepal?", 
        answer: "While not mandatory by law, most private engineering and medical colleges in Nepal have implemented biometric systems to ensure data integrity." 
      },
      { 
        question: "What is 'NC' status in Pokhara University?", 
        answer: "NC stands for 'Not Cleared'. It is given to students who fail to meet the attendance or internal requirements, meaning they cannot sit for the end-semester exam." 
      },
      { 
        question: "Do labs and theory classes have separate attendance?", 
        answer: "Usually, yes. You must maintain the 75% threshold separately for both theory and practical (lab) sessions to clear the subject." 
      },
      { 
        question: "Can I attend other section classes to make up my attendance?", 
        answer: "This depends entirely on your college administration. Some allow it for genuine clashes, while others strictly only count attendance in your assigned section." 
      },
      { 
        question: "Is there an attendance requirement for Lok Sewa exams?", 
        answer: "No. Public Service Commission (Lok Sewa) exams only care about your degree certificate and age limits, not how often you attended classes during your degree." 
      }
    ]
  }
};


