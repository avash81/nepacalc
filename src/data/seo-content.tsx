import React from 'react';

export interface SEOBlock {
  title: string;
  description: string;
  content: React.ReactNode;
  faqs: { question: string; answer: string }[];
}

export const TIER1_SEO_CONTENT: Record<string, SEOBlock> = {
  'nepal-income-tax': {
    title: "Income Tax Calculator Nepal FY 2081/82 (2024/2025)",
    description: "Calculate your net salary and income tax slabs in Nepal for the fiscal year 2081/82. Includes SSF, insurance, and female rebate calculations.",
    content: (
      <>
        <h2>How Income Tax Works in Nepal (FY 2081/82)</h2>
        <p>
          Managing your finances starts with understanding your tax obligations. In Nepal, the Inland Revenue Department (IRD) sets income tax slabs annually. For the fiscal year 2081/82, the tax system remains progressive, meaning higher earners pay a larger percentage of their income in tax.
        </p>
        
        <h3>Income Tax Slabs for FY 2081/82</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Taxable Income Slab</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Individual (Single)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Couple (Married)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">First Slab (1% SST*)</td>
                <td className="border border-[#dadce0] px-4 py-2">Up to Rs. 5,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2">Up to Rs. 6,00,000</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Next Rs. 2,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">10%</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">10%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Next Rs. 3,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">20%</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">20%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Rs. 10L to Rs. 20L</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">30%</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">30%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Rs. 20L to Rs. 50L</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">36%</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">36%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Above Rs. 50,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">39%</td>
                <td className="border border-[#dadce0] px-4 py-2 text-center">39%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] text-[#5f6368] mt-2">*1% Social Security Tax is waived for SSF contributors.</p>
        </div>

        <h2>Example: 8 Lakh Salary Breakdown</h2>
        <p>
          If your annual income is Rs. 8,00,000 and you are an individual taxpayer:
          1. The first 5 Lakhs are taxed at 1% (Rs. 5,000).
          2. The next 2 Lakhs (5L to 7L) are taxed at 10% (Rs. 20,000).
          3. The remaining 1 Lakh (7L to 8L) is taxed at 20% (Rs. 20,000).
          Total Tax: Rs. 45,000.
        </p>

        <h2>IRD Tax Calculator & Tax Refunds in Nepal</h2>
        <p>
          This IRD Tax Calculator is essential for salaried employees in Nepal, business owners calculating their personal income tax, and HR professionals managing payroll. It accurately follows the latest Inland Revenue Department (IRD) directives.
        </p>
        <p className="mt-4">
          <strong>Tax Refund Calculator Nepal:</strong> If too much TDS (Tax Deducted at Source) was deducted from your salary or investment income throughout the year, you might be eligible for a tax refund from the IRD. By calculating your exact annual tax liability here and comparing it to what was actually deducted, you can easily find out if you are owed a refund when filing your D03 return!
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is the 1% social security tax mandatory?",
        answer: "Yes, for salaried individuals, but it is waived if you are contributing to the Social Security Fund (SSF)."
      },
      {
        question: "How does the female tax rebate work in Nepal?",
        answer: "Female taxpayers who only have 'remuneration income' are entitled to a 10% rebate on their total calculated income tax."
      },
      {
        question: "What are the deductible expenses for income tax?",
        answer: "You can deduct life insurance premiums (up to Rs. 40,000), health insurance (up to Rs. 20,000), and contributions to provident funds or CIT (up to 1/3 of income or Rs. 3,00,000)."
      },
      {
        question: "Is there a penalty for late tax filing in Nepal?",
        answer: "Yes, the Inland Revenue Department (IRD) imposes interest and late fees if you fail to file your tax return (D01/D03) within the designated deadline (usually Ashwin end)."
      },
      {
        question: "Can I deduct my home loan interest from taxable income?",
        answer: "No, currently the Nepal tax law does not allow individuals to deduct home loan interest from their taxable income, unlike in some other countries."
      },
      {
        question: "How is tax calculated for part-time or freelance work in Nepal?",
        answer: "Freelance or consultancy income is generally subject to a 15% TDS (Tax Deducted at Source) in Nepal, which is treated as an advance tax against your total annual liability."
      }
    ]
  },
  'loan-emi': {
    title: "EMI Calculator Nepal | Loan Intelligence & Amortization Laboratory",
    description: "Expert-grade EMI calculator for Home, Auto, and Personal loans in Nepal. Detailed amortization analytics, loan taxonomy, and creditworthiness guides.",
    content: (
      <>
        <div className="bg-[#f8f9fa] border-l-4 border-[#1a73e8] p-6 mb-8 rounded-r-xl">
          <h2 className="text-xl font-black text-[#202124] mb-2 mt-0">Numerical Analytics Laboratory: Loan Intelligence</h2>
          <p className="text-sm text-[#5f6368] mb-0 italic">
            Advanced computational engine designed for the Nepalese financial landscape, providing institutional-grade clarity on debt servicing and amortization trajectories.
          </p>
        </div>

        <h2>Structural Breakdown: How the EMI Engine Works</h2>
        <p>
          The Equated Monthly Installment (EMI) is a mathematical construct designed to amortize a debt over a fixed period. Our engine uses the <strong>Standard Reducing Balance Model</strong>, which is the primary structure used by all A-Class Commercial Banks in Nepal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
           <div className="bg-white border border-[#dadce0] p-6 rounded-xl shadow-sm">
              <h3 className="text-[#1a73e8] font-black mt-0 uppercase text-xs tracking-widest mb-4">The Mathematical Core</h3>
              <div className="bg-[#f8f9fa] p-4 rounded font-mono text-[13px] border border-[#dadce0] mb-4">
                 EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
              </div>
              <p className="text-[11px] leading-relaxed text-[#5f6368]">
                 This formula ensures that while the total EMI remains constant, the <strong>Interest Portion</strong> decreases every month as the <strong>Principal Balance</strong> reduces, while the <strong>Principal Portion</strong> increases.
              </p>
           </div>
           <div className="bg-white border border-[#dadce0] p-6 rounded-xl shadow-sm">
              <h3 className="text-[#1a73e8] font-black mt-0 uppercase text-xs tracking-widest mb-4">How it Helps You</h3>
              <ul className="text-[11px] space-y-2 text-[#5f6368] list-none p-0">
                 <li className="flex gap-2"><strong>1. Budgeting:</strong> Know exactly how much disposable income remains.</li>
                 <li className="flex gap-2"><strong>2. Loan Comparison:</strong> Compare different banks' "Base Rate + Premium" offers.</li>
                 <li className="flex gap-2"><strong>3. Tenure Optimization:</strong> See how increasing tenure reduces EMI but spikes interest.</li>
              </ul>
           </div>
        </div>

        <h2>EMI Intelligence Matrix: Principal vs Tenure Impact</h2>
        <p>
          Understanding the sensitivity of your EMI to the loan duration is critical for long-term financial health. Below is a simulation for a <strong>Rs. 5,000,000 (50 Lakh)</strong> loan at a <strong>12%</strong> interest rate:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-xs">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-3 text-left">Tenure</th>
                <th className="border border-[#dadce0] px-4 py-3 text-right">Monthly EMI</th>
                <th className="border border-[#dadce0] px-4 py-3 text-right">Total Interest</th>
                <th className="border border-[#dadce0] px-4 py-3 text-right">Interest as % of Loan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-3 font-bold">5 Years</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 1,11,222</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 16,73,332</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right text-[#188038]">33.4%</td>
              </tr>
              <tr className="bg-[#fcfcfc]">
                <td className="border border-[#dadce0] px-4 py-3 font-bold">10 Years</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 71,735</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 36,08,202</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right text-[#f9ab00]">72.1%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-3 font-bold">15 Years</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 60,008</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 58,01,440</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right text-[#d93025]">116.0%</td>
              </tr>
              <tr className="bg-[#fcfcfc]">
                <td className="border border-[#dadce0] px-4 py-3 font-bold">20 Years</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 55,054</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right">Rs. 82,12,960</td>
                <td className="border border-[#dadce0] px-4 py-3 text-right text-red-700 font-black">164.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Advanced Derivation: Components of Your Payment</h2>
        <h3>1. The Principal (P)</h3>
        <p>
          This is the actual amount you borrow. Every month, a portion of your EMI goes toward reducing this balance. In the early years of a long-term loan, this portion is surprisingly small.
        </p>

        <h3>2. The Interest Rate (r)</h3>
        <p>
          Calculated as <code>(Annual Rate / 12 / 100)</code>. For example, a 12% annual rate becomes 0.01 per month. This is the fee charged by the bank for the privilege of using their capital.
        </p>

        <h3>3. The Tenure (n)</h3>
        <p>
          The total number of months. A 15-year loan has <code>15 x 12 = 180</code> installments.
        </p>

        <div className="bg-[#e8f0fe] p-6 rounded-xl my-8 border border-[#1a73e8]">
           <h3 className="text-[#1967d2] font-black mt-0 text-sm mb-3">Expert Insight: The DTI Ratio for Nepal</h3>
           <p className="text-xs leading-relaxed text-[#3c4043] mb-0">
              When using this calculator, aim for a <strong>Debt-to-Income (DTI) ratio</strong> of less than <strong>50%</strong>. Banks in Nepal evaluate your EMI affordability based on your net verifiable monthly income. If your salary is Rs. 100,000, your total EMIs (including existing ones) should ideally stay below Rs. 50,000 to ensure a high probability of loan approval.
           </p>
        </div>

        <h2>Comparison Taxonomy: Secured vs Unsecured</h2>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Feature</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Secured Loans</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Unsecured Loans</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Collateral</td>
                <td className="border border-[#dadce0] px-4 py-2">Required (Real Estate, Gold)</td>
                <td className="border border-[#dadce0] px-4 py-2">Not Required</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Interest Rate</td>
                <td className="border border-[#dadce0] px-4 py-2">Lower (Base Rate + 2-4%)</td>
                <td className="border border-[#dadce0] px-4 py-2">Higher (Base Rate + 5-7%)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Examples</td>
                <td className="border border-[#dadce0] px-4 py-2">Home Loan, Auto Loan</td>
                <td className="border border-[#dadce0] px-4 py-3">Personal Loan, Credit Card</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Final Strategy: Reducing Total Interest</h2>
        <p>
          The most effective way to help your future self is by making <strong>Partial Prepayments</strong>. By paying even an extra Rs. 5,000 per month against the principal, you can save years of payments and lakhs in interest. Use this structural breakdown to plan your journey toward a debt-free life in Nepal.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How does the Base Rate system work in Nepal?",
        answer: "Banks calculate their minimum lending rate (Base Rate) based on their cost of funds. They then add a 'premium' (e.g., Base Rate + 2%) to determine your final interest rate."
      },
      {
        question: "What is the DTI ratio required by banks?",
        answer: "Most banks in Nepal prefer a Debt-to-Income (DTI) ratio of below 50%, meaning your total monthly EMIs should not exceed half of your verified monthly income."
      },
      {
        question: "Is it better to choose a longer tenure?",
        answer: "A longer tenure makes the EMI affordable but significantly increases the total interest. It is best to choose the shortest tenure your budget can comfortably accommodate."
      },
      {
        question: "How do prepayments affect my loan EMI?",
        answer: "Prepayments reduce the principal balance directly. This usually allows you to either reduce your monthly EMI amount or shorten the remaining loan tenure, saving you interest."
      },
      {
        question: "Can I use this calculator for a business loan in Nepal?",
        answer: "Yes, while business loans often have different terms, the basic monthly EMI calculation using the reducing balance method remains the same as shown here."
      },
      {
        question: "What is a 'Floating' interest rate in Nepal?",
        answer: "Most loans in Nepal are on a floating rate, meaning the interest changes when the bank's Base Rate changes (usually reviewed every quarter by the NRB)."
      }
    ]
  },
  'nea-bill': {
    title: "NEA Bill Calculator 2081 | Nepal Electricity Authority Bill Online",
    description: "Calculate your Nepal Electricity Authority (NEA) bill online based on current 2081 tariff rates. Support for domestic and commercial meters.",
    content: (
      <>
        <h2>How to Calculate Your NEA Electricity Bill in Nepal</h2>
        <p>
          The Nepal Electricity Authority (NEA) uses a slab-based pricing system for domestic consumers. Your bill consists of three main components: a fixed minimum charge (Energy Charge), a per-unit rate that increases with consumption, and a service charge based on your meter capacity (Ampere).
        </p>
        
        <h3>NEA Domestic Tariff Slabs (Current)</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Consumption (Units)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Energy Charge (NPR)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Minimum Charge (NPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">0 - 20 Units</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 0.00 (Energy)</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 30.00</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">21 - 30 Units</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 6.50 / Unit</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 50.00</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">31 - 50 Units</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 8.00 / Unit</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 75.00</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Above 400 Units</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 12.00 / Unit</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 250.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Tips to Reduce Your Electricity Bill</h2>
        <ul>
          <li><strong>Switch to LED:</strong> LED bulbs use up to 80% less energy than traditional incandescent bulbs.</li>
          <li><strong>Monitor Heavy Appliances:</strong> Water heaters, irons, and refrigerators are the biggest energy consumers.</li>
          <li><strong>Check your Meter Capacity:</strong> If you have a 30 Ampere meter but only use small appliances, you might be paying a higher fixed charge unnecessarily.</li>
        </ul>

        <h2>Using the Online NEA Calculator</h2>
        <p>
          Instead of manually calculating complex slabs, simply enter your 'Current Reading' and 'Previous Reading' (or total units consumed) and select your meter capacity. Our tool will instantly calculate the total amount including all service charges and taxes.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the minimum charge for NEA bill?",
        answer: "The minimum charge depends on your meter capacity (Ampere). For 5A, it is generally Rs. 30 for the first 20 units."
      },
      {
        question: "How can I pay my NEA bill online?",
        answer: "You can pay your bill through digital wallets like eSewa, Khalti, or through your mobile banking app once you know the amount."
      },
      {
        question: "What happens if I pay the NEA bill late?",
        answer: "NEA charges a penalty (usually 2% to 5%) if the bill is not paid within the due date mentioned on your bill."
      }
    ]
  },
  'nepali-date': {
    title: "Nepali Date Converter | AD to BS & BS to AD Online",
    description: "Accurate Nepali Date Converter for Bikram Sambat (BS) and Gregorian Calendar (AD). Convert dates of birth, events, and official documents instantly.",
    content: (
      <>
        <h2>The Importance of Date Conversion in Nepal</h2>
        <p>
          Nepal officially uses the Bikram Sambat (BS) calendar, which is approximately 56 years and 8 months ahead of the Gregorian Calendar (AD). Whether you are filling out a citizenship form, applying for a driving license, or checking a public holiday, converting between BS and AD is a daily necessity.
        </p>
        
        <h3>Bikram Sambat (BS) Months & Seasons</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">BS Month</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">AD Start (Approx)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Season (Ritu)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Baisakh</td>
                <td className="border border-[#dadce0] px-4 py-2">Mid-April</td>
                <td className="border border-[#dadce0] px-4 py-2">Basanta (Spring)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Srawan</td>
                <td className="border border-[#dadce0] px-4 py-2">Mid-July</td>
                <td className="border border-[#dadce0] px-4 py-2">Barsa (Monsoon)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Kartik</td>
                <td className="border border-[#dadce0] px-4 py-2">Mid-October</td>
                <td className="border border-[#dadce0] px-4 py-2">Sharad (Autumn)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Magh</td>
                <td className="border border-[#dadce0] px-4 py-2">Mid-January</td>
                <td className="border border-[#dadce0] px-4 py-2">Shishir (Winter)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>When do you need a Date Converter?</h2>
        <ul>
          <li><strong>Visa Applications:</strong> Most international visa forms require your date of birth in AD.</li>
          <li><strong>Educational Certificates:</strong> SEE and +2 certificates often list dates in BS.</li>
          <li><strong>History & Documentation:</strong> Historical events in Nepal are recorded in BS.</li>
        </ul>

        <h2>Accurate Conversion with NepaCalc</h2>
        <p>
          Our converter uses a high-precision algorithm based on official Nepali Panchanga data. It supports conversions from as early as 1975 BS to 2100 BS, ensuring you get the correct day of the week and corresponding date every time.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How many years ahead is BS from AD?",
        answer: "Bikram Sambat (BS) is approximately 56.7 years ahead of the Gregorian Calendar (AD)."
      },
      {
        question: "Why do Nepali months have different days every year?",
        answer: "The Nepali calendar is a lunisolar calendar where month lengths are determined by the time the sun stays in each zodiac sign, leading to variations between 29 and 32 days."
      },
      {
        question: "Is this date converter accurate for old dates?",
        answer: "Yes, our tool is mapped against historical calendars to ensure accuracy for citizenship and educational document conversions."
      }
    ]
  },
  'see-gpa': {
    title: "SEE GPA Calculator 2081 | Secondary Education Examination Nepal",
    description: "Calculate your SEE GPA online based on the latest 2081 grading system in Nepal. Convert marks to grades for all subjects instantly.",
    content: (
      <>
        <h2>How is SEE GPA Calculated in Nepal (New System)?</h2>
        <p>
          The Secondary Education Examination (SEE) in Nepal uses a Grade Point Average (GPA) system to evaluate student performance. Under the new 2081/2082 grading guidelines, students must achieve a minimum of 35% in theoretical exams to pass and be eligible for Grade 11.
        </p>
        
        <h3>SEE Grading Table (Official)</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Score Range</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Grade</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Grade Point</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Performance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">90% and above</td>
                <td className="border border-[#dadce0] px-4 py-2 font-bold text-green-700">A+</td>
                <td className="border border-[#dadce0] px-4 py-2">4.0</td>
                <td className="border border-[#dadce0] px-4 py-2 text-green-700">Outstanding</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">80% - 89.9%</td>
                <td className="border border-[#dadce0] px-4 py-2 font-bold text-green-600">A</td>
                <td className="border border-[#dadce0] px-4 py-2">3.6</td>
                <td className="border border-[#dadce0] px-4 py-2 text-green-600">Excellent</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">70% - 79.9%</td>
                <td className="border border-[#dadce0] px-4 py-2 font-bold">B+</td>
                <td className="border border-[#dadce0] px-4 py-2">3.2</td>
                <td className="border border-[#dadce0] px-4 py-2">Very Good</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 text-red-600">Below 35%</td>
                <td className="border border-[#dadce0] px-4 py-2 font-bold text-red-600">NG</td>
                <td className="border border-[#dadce0] px-4 py-2">0.0</td>
                <td className="border border-[#dadce0] px-4 py-2 text-red-600">Non-Graded</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Understanding the NG (Non-Graded) System</h2>
        <p>
          Unlike the previous system where students could pass with a lower aggregate, the new system requires a minimum 'D' grade (35%) in every subject's theoretical portion. If a student fails to achieve this, they are marked 'NG' and must participate in grade increment exams.
        </p>

        <h2>How to use the SEE GPA Calculator</h2>
        <p>
          Simply enter your marks for each subject (Math, Science, English, etc.). Our tool accounts for the credit hours of each subject to give you a weighted GPA. This is the most accurate way to estimate your official result before the NEB releases the grade sheets.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the minimum marks to pass SEE?",
        answer: "You need at least 35% in theory exams to avoid an NG (Non-Graded) result."
      },
      {
        question: "How many credit hours are there in SEE?",
        answer: "Most major subjects carry 4 credit hours, while optional and practical-heavy subjects may vary."
      },
      {
        question: "Can I convert GPA to percentage?",
        answer: "Yes, a general rule of thumb is GPA x 25 = Percentage, though this is an approximation and official transcripts should be used for formal purposes."
      }
    ]
  },
  'nepal-salary': {
    title: "Net Salary Calculator Nepal | Take-Home Pay Estimator",
    description: "Calculate your monthly take-home salary in Nepal after taxes, SSF, and insurance deductions. Updated for the latest 2081/82 tax slabs.",
    content: (
      <>
        <h2>Calculate Your Take-Home Salary in Nepal</h2>
        <p>
          Understanding your net pay is crucial for budgeting. In Nepal, your 'Gross Salary' is what is written in your contract, but your 'Net Salary' or 'Take-Home Pay' is what actually lands in your bank account after mandatory deductions.
        </p>
        
        <h3>Salary Deduction Comparison Table</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Deduction Type</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">With SSF</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Without SSF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Social Security Tax (SST)</td>
                <td className="border border-[#dadce0] px-4 py-2 text-green-700 font-bold">Exempt (0%)</td>
                <td className="border border-[#dadce0] px-4 py-2">1% (on 1st Slab)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Employee Contribution</td>
                <td className="border border-[#dadce0] px-4 py-2">11% of Basic</td>
                <td className="border border-[#dadce0] px-4 py-2">10% (Provident Fund)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Employer Contribution</td>
                <td className="border border-[#dadce0] px-4 py-2">20% of Basic</td>
                <td className="border border-[#dadce0] px-4 py-2">10% (Provident Fund)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Insurance Coverage</td>
                <td className="border border-[#dadce0] px-4 py-2 text-green-700">Included</td>
                <td className="border border-[#dadce0] px-4 py-2 text-red-600">Not Included</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>The Benefit of Social Security Fund (SSF)</h2>
        <p>
          Employees contributing to the SSF benefit from medical insurance, accident insurance, and dependent security. Moreover, the 1% Social Security Tax on the first income slab (Rs. 5L/6L) is waived for SSF contributors, providing a direct financial saving.
        </p>

        <h2>Using the Salary Tool for Negotiation</h2>
        <p>
          When negotiating a new job offer in Nepal, always ask whether the offered salary is 'Gross' or 'Net'. Use our calculator to see exactly how much you will receive after the government takes its share.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is SSF mandatory in Nepal?",
        answer: "Yes, the Social Security Act makes it mandatory for all formal sector employers and employees to register and contribute to the SSF."
      },
      {
        question: "What is the difference between EPF and SSF?",
        answer: "EPF (Employees' Provident Fund) is primarily a retirement savings scheme, whereas SSF (Social Security Fund) provides broader insurance coverage including medical, maternity, and disability benefits."
      },
      {
        question: "How is Dashain bonus taxed?",
        answer: "The Dashain bonus is added to your annual income and taxed according to your applicable income tax slabs."
      }
    ]
  },
  'nepal-stocks': {
    title: "NEPSE Stock Calculator | Buy & Sell Commission Calculator Nepal",
    description: "Calculate NEPSE stock transaction costs including SEBON commission, DP fee, and CGT for individuals and companies in Nepal.",
    content: (
      <>
        <h2>NEPSE Transaction Cost Breakdown</h2>
        <p>
          Investing in the Nepal Stock Exchange (NEPSE) involves more than just the share price. Every buy and sell order incurs various fees that eat into your profits. Knowing these costs upfront helps you make better trading decisions.
        </p>
        
        <h3>NEPSE Broker Commission Slabs</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Transaction Amount</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Commission Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Up to Rs. 50,000</td>
                <td className="border border-[#dadce0] px-4 py-2">0.40%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 50,001 to Rs. 5,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2">0.37%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 5,00,001 to Rs. 20,00,000</td>
                <td className="border border-[#dadce0] px-4 py-2">0.34%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 20,00,001 to Rs. 1 Crore</td>
                <td className="border border-[#dadce0] px-4 py-2">0.30%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Above Rs. 1 Crore</td>
                <td className="border border-[#dadce0] px-4 py-2">0.27%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Fees When Selling Stocks (Capital Gains Tax)</h3>
        <p>
          When selling, you must also pay Capital Gains Tax (CGT) on your profit. 
          - <strong>5% CGT:</strong> For long-term investors (holding more than 365 days).
          - <strong>7.5% CGT:</strong> For short-term traders (holding less than 365 days).
        </p>

        <h2>How to calculate WACC?</h2>
        <p>
          WACC (Weighted Average Cost of Capital) is essential in Nepal for calculating your profit. It includes the purchase price plus the commissions paid. You must calculate and declare your WACC in the MeroShare portal before selling shares to ensure correct CGT calculation.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the broker commission for NEPSE?",
        answer: "Broker commissions in Nepal are slab-based, ranging from 0.40% for small trades down to 0.27% for trades above Rs. 1 Crore."
      },
      {
        question: "How much is the DP fee per company?",
        answer: "The Depository Participant (DP) fee is a flat Rs. 25 per company per day, regardless of how many shares you sell of that company."
      },
      {
        question: "What is the Capital Gains Tax (CGT) rate?",
        answer: "For individual investors, CGT is 5% if you hold shares for more than a year (long-term) and 7.5% if you sell within a year (short-term)."
      },
      {
        question: "What is SEBON commission?",
        answer: "SEBON (Securities Board of Nepal) charges a flat 0.015% on the total transaction amount as a regulatory fee."
      },
      {
        question: "Do I have to pay tax if I sell at a loss?",
        answer: "No, Capital Gains Tax is only applied to the profit. If you sell at a loss, you don't pay CGT, but you still pay broker commission and DP fees."
      },
      {
        question: "How is the purchase cost calculated in WACC?",
        answer: "The purchase cost includes the price you paid for the shares plus the broker commission and SEBON fee paid during the purchase."
      }
    ]
  },
  'nepal-land': {
    title: "Nepal Land Measurement Calculator | Ropani & Bigha Converter",
    description: "Convert land units in Nepal between Ropani, Aana, Paisa, Dam (Hilly) and Bigha, Kattha, Dhur (Terai). Support for Square Feet and Square Meters.",
    content: (
      <>
        <h2>Nepal Land Measurement Systems Explained</h2>
        <p>
          Nepal uses two distinct systems for land measurement depending on the geography. In the Hilly regions (including Kathmandu), the <strong>Ropani-Aana</strong> system is used, while in the Terai regions, the <strong>Bigha-Kattha</strong> system is the standard.
        </p>
        
        <h3>Conversion Table: Hilly vs. Terai vs. Metric</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Unit</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Equivalent (Sq. Ft)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Equivalent (Sq. Mtr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-bold">1 Ropani</td>
                <td className="border border-[#dadce0] px-4 py-2">5,476 sq. ft.</td>
                <td className="border border-[#dadce0] px-4 py-2">508.72 sq. m.</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-bold">1 Bigha</td>
                <td className="border border-[#dadce0] px-4 py-2">72,900 sq. ft.</td>
                <td className="border border-[#dadce0] px-4 py-2">6,772.63 sq. m.</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-bold">1 Aana</td>
                <td className="border border-[#dadce0] px-4 py-2">342.25 sq. ft.</td>
                <td className="border border-[#dadce0] px-4 py-2">31.80 sq. m.</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-bold">1 Kattha</td>
                <td className="border border-[#dadce0] px-4 py-2">3,645 sq. ft.</td>
                <td className="border border-[#dadce0] px-4 py-2">338.63 sq. m.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Why is accurate conversion important?</h2>
        <p>
          Real estate prices in Nepal are soaring, and even a few square feet can mean a difference of lakhs of rupees. When buying or selling land, always convert official 'Lalpurja' measurements into square feet to verify the actual usable area.
        </p>

        <h2>Using the NepaCalc Land Tool</h2>
        <p>
          Our calculator allows you to enter land units in any format and instantly converts them to all other Nepalese and International units (Sq. Ft, Sq. Mtr). This is the most comprehensive tool for real estate agents, engineers, and home buyers in Nepal.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How many square feet are in 1 Ropani?",
        answer: "There are exactly 5,476 square feet in 1 Ropani."
      },
      {
        question: "How many Aana make 1 Kattha?",
        answer: "1 Kattha is approximately equal to 10.65 Aana."
      },
      {
        question: "Is the measurement system different in Kathmandu?",
        answer: "No, Kathmandu follows the Ropani-Aana system common to the hilly regions of Nepal."
      }
    ]
  },
  'nepal-vehicle-tax': {
    title: "Nepal Vehicle Tax Calculator 2081 | Bluebook Renewal Fee",
    description: "Calculate annual vehicle tax and bluebook renewal fees for cars, bikes, and heavy vehicles in Nepal for FY 2081/82.",
    content: (
      <>
        <h2>Blue Book Renew Price in Nepal (2081/82 Update)</h2>
        <p>
          Every vehicle owner in Nepal must pay an annual tax to the provincial government to renew their bluebook. The exact <strong>blue book renew price in Nepal</strong> depends on your vehicle type, engine capacity (CC), and the province where it is registered (e.g., Bagmati, Gandaki, Lumbini). 
        </p>
        <p className="mt-2">
          Use our calculator below to instantly find out your exact blue book renewal cost before visiting the Yatayat office.
        </p>
        
        <h3>Bike Tax Slabs (Bagmati Province 2081/82)</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Engine Capacity (CC)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Annual Tax (NPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Up to 125 CC</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 3,000</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">126 CC to 160 CC</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 5,000</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">161 CC to 250 CC</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 9,000</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">251 CC to 400 CC</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 11,000</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2">Above 401 CC</td>
                <td className="border border-[#dadce0] px-4 py-2">Rs. 20,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Insurance and Renewal Fees</h2>
        <p>
          In addition to the vehicle tax, you must also pay for <strong>Third-Party Insurance</strong> (mandatory) and a small renewal fee (around Rs. 200 - 500). If you fail to renew your bluebook on time, heavy penalties (up to 32% per year) can be applied.
        </p>

        <h2>Electric Vehicle (EV) Tax Benefits</h2>
        <p>
          To promote green energy, the Nepal government offers significantly lower annual taxes for electric vehicles compared to petrol or diesel vehicles. Some provinces even offer temporary tax waivers for new EV registrations.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the penalty for late bluebook renewal?",
        answer: "Penalties start after a 3-month grace period and can reach up to 32% of the tax amount for long delays."
      },
      {
        question: "Can I pay vehicle tax online in Nepal?",
        answer: "Yes, you can pay through the Transport Management Information System (TMIS) portal or via digital wallets in most provinces."
      },
      {
        question: "Does vehicle tax vary by province?",
        answer: "Yes, each province has its own Finance Act which sets the annual vehicle tax rates, though they are generally similar across the country."
      }
    ]
  },
  'nepal-home-loan': {
    title: "Nepal Home Loan Calculator | Housing Loan Eligibility & EMI",
    description: "Calculate your home loan eligibility and monthly EMI for housing loans in Nepal. Compare bank interest rates and plan your dream home.",
    content: (
      <>
        <h2>Planning Your Home Loan in Nepal</h2>
        <p>
          Buying a home is the biggest investment for most Nepalese families. Banks in Nepal typically offer home loans for up to 15 to 20 years. The maximum loan amount is usually limited to 50% to 70% of the property's fair market value.
        </p>
        
        <h3>Maximum Loan-to-Value (LTV) Ratios</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Property Type</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">LTV Ratio (Inside Valley)</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">LTV Ratio (Outside Valley)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Residential Home Loan</td>
                <td className="border border-[#dadce0] px-4 py-2">50%</td>
                <td className="border border-[#dadce0] px-4 py-2">60%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Commercial Real Estate</td>
                <td className="border border-[#dadce0] px-4 py-2">40%</td>
                <td className="border border-[#dadce0] px-4 py-2">50%</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">First-Time Home Buyer*</td>
                <td className="border border-[#dadce0] px-4 py-2">Up to 70%</td>
                <td className="border border-[#dadce0] px-4 py-2">Up to 70%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] text-[#5f6368] mt-2">*Varies based on NRB circulars and individual bank policies.</p>
        </div>

        <h2>Fixed vs. Variable Interest Rates</h2>
        <p>
          Most banks in Nepal offer variable interest rates linked to their <strong>Base Rate</strong>. However, some banks have started offering fixed interest rates for 5 to 7 years to protect borrowers from market fluctuations. Always check the 'Spread Rate' added by the bank to the base rate.
        </p>

        <h2>Documentation Required</h2>
        <p>
          To apply for a home loan, you will need a 'Lalpurja' (Land Ownership Certificate), 'Char Killa' (Four Boundary Certificate), 'Tax Clearance Certificate', and proof of income. If you are building a new house, an approved house map (Napsa) from the municipality is also required.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the maximum tenure for a home loan in Nepal?",
        answer: "Most commercial banks offer a maximum tenure of 20 years, depending on the age of the borrower at the time of maturity."
      },
      {
        question: "How much down payment is required?",
        answer: "As per NRB regulations, you typically need a 30% to 50% down payment, as banks can only finance up to 50-70% of the property value."
      },
      {
        question: "Are there any hidden charges in home loans?",
        answer: "Besides interest, you should account for service fees (0.25% to 1%), insurance premiums, and legal valuation fees."
      }
    ]
  },
  'nepal-vat': {
    title: "VAT Calculator Nepal | Calculate 13% Value Added Tax",
    description: "Free online VAT calculator for Nepal. Calculate 13% Value Added Tax (VAT) amounts instantly. Add or remove VAT from any price.",
    content: (
      <>
        <h2>How to Calculate 13% VAT in Nepal</h2>
        <p>
          Value Added Tax (VAT) is a consumption tax placed on a product whenever value is added at each stage of the supply chain. In Nepal, the standard VAT rate is <strong>13%</strong>, governed by the Inland Revenue Department (IRD).
        </p>
        
        <h3>Adding VAT to a Price (Exclusive to Inclusive)</h3>
        <p>
          If a product costs Rs. 1,000 (excluding VAT), you must add 13% to find the final selling price.
          <br/><strong>Formula:</strong> <code>Price + (Price × 0.13)</code>
          <br/><strong>Example:</strong> Rs. 1,000 + Rs. 130 = Rs. 1,130
        </p>

        <h3>Removing VAT from a Price (Inclusive to Exclusive)</h3>
        <p>
          If a product is sold for Rs. 1,130 (including VAT) and you need to find the base price before tax:
          <br/><strong>Formula:</strong> <code>Total Price / 1.13</code>
          <br/><strong>Example:</strong> Rs. 1,130 / 1.13 = Rs. 1,000
        </p>

        <h2>Who Needs to Register for VAT in Nepal?</h2>
        <p>
          According to the IRD, businesses must register for VAT if their annual turnover exceeds the threshold limits (e.g., Rs. 50 Lakhs for goods, Rs. 20 Lakhs for services). Once registered, businesses must issue VAT invoices and file their VAT returns electronically on a monthly or trimester basis.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the current VAT rate in Nepal?",
        answer: "The standard VAT rate in Nepal is 13%. However, certain essential goods and services are exempt from VAT."
      },
      {
        question: "How do I remove 13% VAT from a total amount?",
        answer: "Divide the total amount by 1.13. The result is your base price before VAT."
      },
      {
        question: "Is VAT mandatory for all businesses in Nepal?",
        answer: "No, small businesses with an annual turnover below the IRD threshold (e.g., Rs. 50 Lakhs for trading goods) can operate under PAN without registering for VAT."
      }
    ]
  },
  'calorie-calculator': {
    title: "Calorie Calculator | Ideal Daily Calorie Intake & TDEE",
    description: "Calculate your ideal daily calorie intake for weight loss, maintenance, or muscle gain. Accurate TDEE calculator based on your BMI, age, and activity level.",
    content: (
      <>
        <h2>What is Your Ideal Daily Calorie Intake?</h2>
        <p>
          Your ideal daily calorie intake depends entirely on your Total Daily Energy Expenditure (TDEE). TDEE is the total number of calories you burn in a day, which is calculated using your Basal Metabolic Rate (BMR) and your physical activity level.
        </p>
        
        <h3>Calorie Intake by BMI</h3>
        <p>
          Many people ask: <em>"What is the ideal daily calorie intake for BMI 23.2?"</em> 
          <br/><br/>
          Your BMI (Body Mass Index) tells you if you are at a healthy weight, but it does <strong>not</strong> determine your calorie needs by itself. Two people with a BMI of 23.2 might need vastly different calories if one is an athlete and the other sits at a desk all day. To find your exact number, our calculator uses the Mifflin-St Jeor equation to find your BMR, then multiplies it by your activity level.
        </p>

        <h2>How to Use Your TDEE for Weight Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">1. Maintain Weight</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Consume exactly your TDEE calories per day.</p>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#d93025] m-0">2. Lose Weight</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Subtract 500 calories from your TDEE (Caloric Deficit) to lose about 0.5kg per week.</p>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#188038] m-0">3. Gain Muscle</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Add 300-500 calories to your TDEE (Caloric Surplus) combined with resistance training.</p>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How many calories should I eat to lose weight?",
        answer: "A general rule is to consume 500 fewer calories than your TDEE. This creates a deficit of 3,500 calories per week, leading to about 0.5kg (1 lb) of fat loss."
      },
      {
        question: "Is the Mifflin-St Jeor equation accurate?",
        answer: "Yes, the Mifflin-St Jeor equation is widely considered by health professionals to be the most accurate formula for estimating resting metabolic rate."
      },
      {
        question: "What is the difference between BMR and TDEE?",
        answer: "BMR is the calories you burn just staying alive (if you stayed in bed all day). TDEE includes your BMR plus the calories burned through daily movement and exercise."
      }
    ]
  },
  'bmi': {
    title: "BMI Calculator | Check Your Body Mass Index Online",
    description: "Calculate your Body Mass Index (BMI) instantly. Find out your healthy weight range and check if you are underweight, normal, overweight, or obese.",
    content: (
      <>
        <h2>Understanding Your Body Mass Index (BMI)</h2>
        <p>
          The Body Mass Index (BMI) is a simple mathematical formula used to classify whether a person has a healthy body weight for their height. While it doesn't measure body fat directly, it is a widely used screening tool by doctors and health professionals worldwide.
        </p>

        <h3>BMI Classification Chart (WHO Guidelines)</h3>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-[#dadce0] text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border border-[#dadce0] px-4 py-2 text-left">BMI Score</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Weight Status</th>
                <th className="border border-[#dadce0] px-4 py-2 text-left">Health Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">Below 18.5</td>
                <td className="border border-[#dadce0] px-4 py-2 text-blue-600 font-bold">Underweight</td>
                <td className="border border-[#dadce0] px-4 py-2">Possible nutritional deficiency</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">18.5 - 24.9</td>
                <td className="border border-[#dadce0] px-4 py-2 text-green-600 font-bold">Normal Weight</td>
                <td className="border border-[#dadce0] px-4 py-2">Low Risk (Healthy)</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">25.0 - 29.9</td>
                <td className="border border-[#dadce0] px-4 py-2 text-yellow-600 font-bold">Overweight</td>
                <td className="border border-[#dadce0] px-4 py-2">Moderate risk of heart disease</td>
              </tr>
              <tr>
                <td className="border border-[#dadce0] px-4 py-2 font-medium">30.0 and Above</td>
                <td className="border border-[#dadce0] px-4 py-2 text-red-600 font-bold">Obese</td>
                <td className="border border-[#dadce0] px-4 py-2">High risk of diabetes & hypertension</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Next Steps After Calculating BMI</h2>
        <p>
          If your BMI is <strong>23.2</strong>, you are in the healthy "Normal" weight category! However, remember that BMI is just an indicator. For a complete health assessment, you should also calculate your <strong>ideal daily calorie intake</strong> based on your physical activity, and track your body fat percentage, as muscular athletes may have a high BMI but low body fat.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is BMI accurate for bodybuilders?",
        answer: "No. Because muscle weighs more than fat, athletes and bodybuilders often have a high BMI (classifying them as overweight or obese) even if their body fat percentage is extremely low."
      },
      {
        question: "What is a healthy BMI for a woman?",
        answer: "The healthy BMI range is the same for adult men and women, which is between 18.5 and 24.9."
      },
      {
        question: "How can I lower my BMI?",
        answer: "To lower your BMI, you need to lose weight. This is best achieved by eating in a caloric deficit (calculating your TDEE and eating less calories than you burn) and engaging in regular exercise."
      }
    ]
  },
  'weight-converter': {
    title: "Weight Converter | Convert kg to lbs, grams, ounces online",
    description: "Free and highly accurate weight converter tool. Instantly convert kilograms (kg) to pounds (lbs), grams to ounces, and more.",
    content: (
      <>
        <h2>How the Weight Converter Works</h2>
        <p>
          Whether you are following a cooking recipe from a different country, measuring your body weight at the gym, or calculating shipping costs, converting weights between the Metric system (kg, grams) and the Imperial system (lbs, ounces) is a daily necessity.
        </p>

        <h3>Common Weight Conversions</h3>
        <p>
          Here are some of the most common conversion factors used worldwide:
          <br/><strong>1 Kilogram (kg)</strong> = 2.20462 Pounds (lbs)
          <br/><strong>1 Pound (lb)</strong> = 16 Ounces (oz)
          <br/><strong>1 Gram (g)</strong> = 0.035274 Ounces (oz)
        </p>

        <h2>Why Accuracy Matters</h2>
        <p>
          Our weight converter uses up to 6 decimal places of precision. This is critical in fields like baking, chemistry, and international shipping where even a fraction of a gram can make a massive difference. 
        </p>
      </>
    ),
    faqs: [
      {
        question: "How many pounds are in a kilogram?",
        answer: "There are approximately 2.20462 pounds in one kilogram."
      },
      {
        question: "Is ounce a measure of weight or volume?",
        answer: "An 'ounce' (oz) measures weight, whereas a 'fluid ounce' (fl oz) measures volume. This converter is for weight ounces."
      },
      {
        question: "How many grams in one pound?",
        answer: "There are exactly 453.592 grams in one standard pound."
      }
    ]
  },
  'length-converter': {
    title: "Length Converter | Convert meters, feet, inches, cm",
    description: "Accurate length and distance converter. Convert meters to feet, centimeters to inches, kilometers to miles instantly online.",
    content: (
      <>
        <h2>Understanding Length Conversions</h2>
        <p>
          The world uses two primary systems for measuring length: the Metric System (Meters, Centimeters, Kilometers) and the Imperial System (Feet, Inches, Miles). Our length converter allows seamless transitions between these systems for construction, sewing, engineering, and travel.
        </p>

        <h3>Essential Length Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">Metric to Imperial</h4>
             <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
               <li>1 Meter = 3.28084 Feet</li>
               <li>1 Centimeter = 0.3937 Inches</li>
               <li>1 Kilometer = 0.621371 Miles</li>
             </ul>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">Imperial to Metric</h4>
             <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
               <li>1 Foot = 0.3048 Meters</li>
               <li>1 Inch = 2.54 Centimeters</li>
               <li>1 Mile = 1.60934 Kilometers</li>
             </ul>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How many inches are in a foot?",
        answer: "There are exactly 12 inches in one foot."
      },
      {
        question: "What is the difference between a meter and a yard?",
        answer: "A meter is slightly longer than a yard. 1 yard is exactly 0.9144 meters, or 3 feet."
      },
      {
        question: "How many centimeters in an inch?",
        answer: "One inch is exactly equal to 2.54 centimeters."
      }
    ]
  },
  'lcm-gcf-calculator': {
    title: "Calculator for LCM and GCF | Least Common Multiple & Factor",
    description: "Fast online calculator for LCM and GCF. Find the Least Common Multiple and Greatest Common Factor for two or more numbers instantly.",
    content: (
      <>
        <h2>How the LCM and GCF Calculator Works</h2>
        <p>
          Whether you are solving complex fractions, simplifying algebraic expressions, or working on scheduling problems, finding the Least Common Multiple (LCM) and Greatest Common Factor (GCF) is a foundational math skill.
        </p>

        <h3>What is LCM?</h3>
        <p>
          The <strong>Least Common Multiple (LCM)</strong> of two numbers is the smallest number (not zero) that is a multiple of both. 
          <br/><em>Example:</em> For 4 and 6, the multiples of 4 are (4, 8, 12, 16...) and the multiples of 6 are (6, 12, 18...). The lowest matching number is 12. So, LCM = 12.
        </p>

        <h3>What is GCF?</h3>
        <p>
          The <strong>Greatest Common Factor (GCF)</strong>, also known as the Greatest Common Divisor (GCD), is the largest number that divides both numbers without leaving a remainder.
          <br/><em>Example:</em> For 12 and 18, the factors of 12 are (1, 2, 3, 4, 6, 12) and the factors of 18 are (1, 2, 3, 6, 9, 18). The largest common factor is 6. So, GCF = 6.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How is LCM used in fractions?",
        answer: "When adding or subtracting fractions with different denominators, you must find the LCM of the denominators to create a common base."
      },
      {
        question: "What is the relationship between LCM and GCF?",
        answer: "For any two numbers 'a' and 'b', the product of the numbers is equal to the product of their LCM and GCF (a × b = LCM × GCF)."
      },
      {
        question: "Can I find the LCM of three or more numbers?",
        answer: "Yes, this calculator allows you to input multiple numbers separated by commas to find their collective LCM and GCF."
      }
    ]
  },
  'attendance': {
    title: "Attendance Calculator | Find out how many classes you can skip",
    description: "University attendance calculator. Enter your current attendance percentage and total classes to find out how many classes you need to attend to reach your goal.",
    content: (
      <>
        <h2>The Ultimate College Attendance Calculator</h2>
        <p>
          Maintaining the mandatory attendance limit (usually 75% or 80%) is one of the most stressful parts of university life. Our Attendance Calculator helps you strategically plan your schedule so you never fall below the required threshold.
        </p>

        <h3>How to Calculate Required Attendance</h3>
        <p>
          If your current attendance is below your target (e.g., you are at 65% but need 75%), the calculator uses the formula:
          <br/><code>Required Classes = (Target% × Total Classes - Attended) / (1 - Target%)</code>
          <br/>This tells you exactly how many consecutive classes you must attend to pull your average up.
        </p>

        <h3>How Many Classes Can You Bunk?</h3>
        <p>
          If you are above your target (e.g., you are at 90% and only need 75%), the tool calculates your 'bunk buffer'. It tells you exactly how many upcoming classes you can safely miss without dropping below your mandatory threshold.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What happens if my attendance is below 75%?",
        answer: "In most universities, falling below the mandatory 75% attendance mark makes you ineligible to sit for the final semester examinations."
      },
      {
        question: "How is attendance percentage calculated?",
        answer: "It is calculated as: (Number of Classes Attended ÷ Total Number of Classes Held) × 100."
      },
      {
        question: "Can this calculator predict future attendance?",
        answer: "Yes, by entering your current stats and target percentage, it predicts exactly how many future classes you need to attend or can afford to miss."
      }
    ]
  },
  'percentage': {
    title: "Percentage Calculator | Find % Increase, Decrease & Discounts",
    description: "Free online percentage calculator. Calculate percentage increases, decreases, discounts, and find out what percentage one number is of another.",
    content: (
      <>
        <h2>Mastering the Percentage Calculator</h2>
        <p>
          Percentages are everywhere—from calculating a store discount during a sale to determining your profit margin, or figuring out your test scores. This calculator provides a suite of tools to handle any percentage-based math problem instantly.
        </p>

        <h3>The Three Core Percentage Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">1. What is X% of Y?</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Formula: <code>(X / 100) × Y</code><br/>Used for finding the exact value of a percentage (e.g., 20% of 500 is 100).</p>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#d93025] m-0">2. X is what % of Y?</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Formula: <code>(X / Y) × 100</code><br/>Used for finding test scores (e.g., getting 45 out of 60 is 75%).</p>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#188038] m-0">3. Percentage Change</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Formula: <code>((New - Old) / Old) × 100</code><br/>Used for calculating growth, inflation, or discounts.</p>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How do I calculate a 20% discount?",
        answer: "To calculate a 20% discount, multiply the original price by 0.20 to find the discount amount, then subtract it from the original price. Or simply multiply the price by 0.80."
      },
      {
        question: "How do I reverse calculate a percentage?",
        answer: "If you know the final amount after a 13% tax was added, divide the final amount by 1.13 to find the original pre-tax amount."
      },
      {
        question: "What does percent actually mean?",
        answer: "Percent literally means 'per hundred'. So 50 percent (50%) simply means 50 out of every 100."
      }
    ]
  },
  'mortgage-calculator': {
    title: "Mortgage Calculator | Home Loan EMI & Amortization",
    description: "Calculate your monthly mortgage payments with taxes and insurance. Get a detailed amortization schedule for your home loan.",
    content: (
      <>
        <h2>How a Mortgage Calculator Works</h2>
        <p>
          A mortgage is likely the largest financial commitment you will ever make. Our mortgage calculator helps you determine exactly how much your monthly payments will be, breaking down the principal and interest components over the entire life of the loan.
        </p>
        <h3>The Impact of Down Payments</h3>
        <p>
          Making a larger down payment directly reduces your principal loan amount. This not only lowers your monthly EMI but also drastically reduces the total interest you will pay to the bank over 15 or 20 years. Always aim for at least a 20% down payment to avoid mandatory mortgage insurance (PMI) in many jurisdictions.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is an amortization schedule?",
        answer: "It is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off."
      },
      {
        question: "Does this calculator include property tax?",
        answer: "Yes, advanced mortgage calculations often require you to input estimated annual property taxes and home insurance to give you your true monthly housing cost (PITI)."
      }
    ]
  },
  'compound-interest': {
    title: "Compound Interest Calculator | See Your Wealth Grow",
    description: "Free compound interest calculator. Find out how your investments and savings will grow over time with the power of compounding.",
    content: (
      <>
        <h2>The Power of Compound Interest</h2>
        <p>
          Albert Einstein reportedly called compound interest the "eighth wonder of the world." Unlike simple interest, which only pays interest on the initial principal, compound interest pays interest on the principal <strong>and</strong> on the accumulated interest from previous periods.
        </p>
        <h3>Daily vs. Monthly vs. Annual Compounding</h3>
        <p>
          The frequency of compounding drastically changes your final return.
          <br/><strong>Annual:</strong> Interest is calculated once a year.
          <br/><strong>Monthly:</strong> Interest is calculated 12 times a year (Standard for bank accounts).
          <br/><strong>Daily:</strong> Interest is calculated 365 times a year (Maximizes growth).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the formula for compound interest?",
        answer: "The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the compounding frequency, and t is time in years."
      },
      {
        question: "How is compound interest different from simple interest?",
        answer: "Simple interest is only calculated on the principal amount. Compound interest is calculated on the principal amount AND the accumulated interest of previous periods."
      }
    ]
  },
  'sip-calculator': {
    title: "SIP Calculator | Systematic Investment Plan Returns",
    description: "Calculate the future value of your monthly SIP investments in mutual funds. Plan your retirement and wealth creation goals easily.",
    content: (
      <>
        <h2>What is a Systematic Investment Plan (SIP)?</h2>
        <p>
          A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (usually monthly) into mutual funds or stocks. It is one of the most effective ways to build long-term wealth because it enforces financial discipline and utilizes the power of compound interest.
        </p>
        <h3>Rupee Cost Averaging</h3>
        <p>
          By investing a fixed amount every month, you buy more units when the market is down and fewer units when the market is up. This averages out the cost of your investments over time, protecting you from market volatility.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Can I stop my SIP at any time?",
        answer: "Yes, SIPs are highly flexible. You can pause, stop, or increase your SIP amount at any time without facing heavy penalties from the mutual fund."
      },
      {
        question: "What is an expected return on a mutual fund SIP?",
        answer: "While market returns vary, long-term equity mutual funds historically generate an average annualized return of 10% to 15%."
      }
    ]
  },
  'age-calculator': {
    title: "Age Calculator | Calculate Exact Age in Years, Months, Days",
    description: "Find out exactly how old you are today. Calculate your exact age in years, months, weeks, and days between any two dates.",
    content: (
      <>
        <h2>How the Exact Age Calculator Works</h2>
        <p>
          Calculating your age isn't just about knowing your birth year. In many legal, medical, and astrological scenarios, you need to know your exact age down to the day. Our calculator handles leap years and different month lengths automatically to give you perfect precision.
        </p>
        <h3>Use Cases for Exact Age</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Government Forms:</strong> Visa and passport applications require age verification.</li>
          <li><strong>Medical Dosages:</strong> Pediatric medicine requires exact age in months and days.</li>
          <li><strong>Milestones:</strong> Find out exactly when you will turn 10,000 days old!</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does this calculator account for leap years?",
        answer: "Yes, our algorithm automatically detects leap years (like 2020 and 2024) and adjusts the day count perfectly."
      },
      {
        question: "Can I calculate the age of a historical event?",
        answer: "Absolutely. Just enter the date of the event as the 'Date of Birth' to see exactly how much time has passed."
      }
    ]
  },
  'gpa': {
    title: "GPA Calculator | College & High School Grade Point Average",
    description: "Free online GPA calculator for college and high school students. Calculate your semester GPA and cumulative CGPA instantly.",
    content: (
      <>
        <h2>How to Calculate Your GPA</h2>
        <p>
          Your Grade Point Average (GPA) is the standardized metric used by schools and universities to measure your academic performance. It is calculated by dividing the total number of grade points earned by the total number of credit hours attempted.
        </p>
        <h3>The 4.0 Grading Scale</h3>
        <p>
          Most universities use the standard 4.0 scale:
          <br/><strong>A = 4.0</strong> (Excellent)
          <br/><strong>B = 3.0</strong> (Good)
          <br/><strong>C = 2.0</strong> (Average)
          <br/><strong>D = 1.0</strong> (Passing)
          <br/><strong>F = 0.0</strong> (Failing)
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a weighted GPA?",
        answer: "A weighted GPA takes the difficulty of the class into account. For example, an 'A' in an AP or Honors class might be worth 5.0 points instead of the standard 4.0."
      },
      {
        question: "How do credit hours affect my GPA?",
        answer: "Classes with more credit hours have a bigger impact on your GPA. An 'A' in a 4-credit class boosts your GPA much more than an 'A' in a 1-credit class."
      }
    ]
  },
  'standard-deviation': {
    title: "Standard Deviation Calculator | Population & Sample Stats",
    description: "Calculate standard deviation, variance, and mean for a dataset. Supports both population and sample data calculations instantly.",
    content: (
      <>
        <h2>Understanding Standard Deviation</h2>
        <p>
          In statistics, standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range.
        </p>
        <h3>Population vs. Sample</h3>
        <p>
          It is critical to choose the correct formula based on your data:
          <br/><strong>Population:</strong> Use this when your dataset includes every single member of the group you are studying (Divide by N).
          <br/><strong>Sample:</strong> Use this when your data is just a random sample of a larger group (Divide by N-1, known as Bessel's correction).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What does the variance mean?",
        answer: "Variance is simply the square of the standard deviation. It represents the average of the squared differences from the Mean."
      },
      {
        question: "Why do we divide by N-1 for a sample?",
        answer: "Dividing by N-1 (Bessel's correction) corrects the bias in the estimation of the population variance, providing a more accurate estimate."
      }
    ]
  },
  'probability': {
    title: "Probability Calculator | Calculate Odds & Statistics",
    description: "Free probability calculator. Find the probability of single events, multiple events, independent events, and conditional probabilities.",
    content: (
      <>
        <h2>The Basics of Probability</h2>
        <p>
          Probability is the mathematical measure of the likelihood that an event will occur. It is always a number between 0 (impossible) and 1 (certainty), often expressed as a percentage from 0% to 100%.
        </p>
        <h3>Types of Probability Scenarios</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Independent Events:</strong> The outcome of one event does not affect the other (e.g., flipping a coin twice).</li>
          <li><strong>Dependent Events:</strong> The outcome of the first event affects the second (e.g., drawing two cards from a deck without replacement).</li>
          <li><strong>Mutually Exclusive:</strong> Two events that cannot occur at the same time (e.g., rolling a 2 and a 3 on a single die).</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How do you calculate the probability of two independent events?",
        answer: "Multiply the probability of the first event by the probability of the second event: P(A and B) = P(A) × P(B)."
      },
      {
        question: "What is the probability of an event NOT happening?",
        answer: "The probability of an event not happening (the complement) is 1 minus the probability that it will happen: P(not A) = 1 - P(A)."
      }
    ]
  },
  'scientific-calculator': {
    title: "Scientific Calculator Online | Trigonometry, Logs, Exponents",
    description: "Advanced online scientific calculator. Solve complex math problems including trigonometry (sin, cos, tan), logarithms, and exponential functions.",
    content: (
      <>
        <h2>The Power of a Scientific Calculator</h2>
        <p>
          Unlike a standard four-function calculator, a scientific calculator is designed to handle engineering, physics, and advanced mathematics. It includes dedicated functions for trigonometry, logarithms, probability, and complex exponentiation.
        </p>
        <h3>Key Functions Explained</h3>
        <p>
          <strong>Trigonometry (Sin, Cos, Tan):</strong> Used for calculating angles and distances in geometry and physics. Ensure your calculator is set to the correct mode (Degrees or Radians).
          <br/><strong>Logarithms (Log, Ln):</strong> Used in scaling variables, calculating pH levels in chemistry, and measuring earthquake intensity (Richter scale).
          <br/><strong>Factorials (n!):</strong> Essential for calculating combinations and permutations in statistics.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Should I use Degrees or Radians?",
        answer: "It depends on your math problem. High school geometry typically uses Degrees, while advanced calculus and physics often require Radians."
      },
      {
        question: "What does the 'e' button do?",
        answer: "The 'e' button represents Euler's number (approximately 2.718), which is the base of the natural logarithm, widely used in calculus and compound interest."
      }
    ]
  },
  'unit-converter': {
    title: "Universal Unit Converter | Convert Everything Instantly",
    description: "The ultimate universal unit converter. Convert length, weight, temperature, volume, area, and speed instantly online.",
    content: (
      <>
        <h2>The Universal Unit Converter</h2>
        <p>
          Our universal unit converter eliminates the need to memorize complex conversion factors. Whether you are an engineer calculating torque, a chef converting recipe volumes, or a traveler converting temperatures, this tool handles it all.
        </p>
        <h3>Most Common Conversions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">Temperature</h4>
             <p className="text-sm mt-2 text-[#5f6368]">Celsius to Fahrenheit: <code>(°C × 9/5) + 32 = °F</code></p>
          </div>
          <div className="bg-white border border-[#dadce0] p-4 rounded-lg">
             <h4 className="font-bold text-[#1a73e8] m-0">Volume</h4>
             <p className="text-sm mt-2 text-[#5f6368]">1 Gallon (US) = 3.78541 Liters</p>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How do you convert Celsius to Kelvin?",
        answer: "To convert Celsius to Kelvin, simply add 273.15 to the Celsius temperature."
      },
      {
        question: "What is the difference between a US Gallon and a UK Gallon?",
        answer: "A US liquid gallon is roughly 3.785 liters, whereas a UK (Imperial) gallon is larger, at exactly 4.54609 liters."
      }
    ]
  },
  'date-duration': {
    title: "Date Duration Calculator | Days Between Two Dates",
    description: "Calculate the exact duration between two dates. Find out how many days, weeks, months, or years are between a start date and an end date.",
    content: (
      <>
        <h2>Calculating Time Between Dates</h2>
        <p>
          Finding the exact duration between two dates is surprisingly complicated due to leap years, varying month lengths (28, 30, or 31 days), and daylight saving time changes. Our duration calculator handles these complexities automatically.
        </p>
        <h3>Common Uses for Date Calculators</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Project Management:</strong> Calculate the exact number of days remaining until a deadline.</li>
          <li><strong>Legal & Contracts:</strong> Determine the precise length of a lease agreement or warranty period.</li>
          <li><strong>Event Planning:</strong> Find out exactly how many weeks are left until a wedding or vacation.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does the calculator include the end date?",
        answer: "By default, duration calculators calculate the difference between the days. If you want to include both the start AND end date in your count, you must add 1 to the final result."
      },
      {
        question: "How does it handle leap years?",
        answer: "The algorithm automatically checks if a year is divisible by 4 (and handles the century rules) to accurately add February 29th to the day count when applicable."
      }
    ]
  },
  'fd-calculator': {
    title: "Fixed Deposit Calculator | FD Maturity & Interest Returns",
    description: "Calculate your Fixed Deposit (FD) maturity amount and total interest earned. Plan your safe investments with our free FD calculator.",
    content: (
      <>
        <h2>How a Fixed Deposit (FD) Works</h2>
        <p>
          A Fixed Deposit is one of the safest investment options available, offering a guaranteed rate of return over a specific tenure. When you open an FD, you lock in a sum of money for a set period, and the bank pays you interest, usually compounded quarterly.
        </p>
        <h3>Understanding FD Compounding</h3>
        <p>
          Most banks calculate FD interest using <strong>Quarterly Compounding</strong>. This means that every three months, the interest earned is added to your principal amount, and the next quarter's interest is calculated on this new, larger amount. This yields a slightly higher return than simple annual interest.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Can I withdraw my FD before maturity?",
        answer: "Yes, premature withdrawal is possible, but banks usually levy a penalty (often 1% to 2% reduction in the applicable interest rate)."
      },
      {
        question: "Is FD interest taxable?",
        answer: "Yes, the interest earned on Fixed Deposits is subject to Tax Deducted at Source (TDS), which the bank deducts before paying out your maturity amount."
      }
    ]
  },
  'savings': {
    title: "Savings Goal Calculator | Plan Your Financial Future",
    description: "Set a financial goal and calculate exactly how much you need to save daily, weekly, or monthly to reach your savings target.",
    content: (
      <>
        <h2>Reaching Your Savings Goals</h2>
        <p>
          Whether you are saving for a vacation, a down payment on a house, or an emergency fund, breaking down a massive goal into smaller, manageable chunks is the key to financial success. 
        </p>
        <h3>The 50/30/20 Rule</h3>
        <p>
          A popular budgeting strategy is to divide your after-tax income into three categories: 50% for needs (rent, groceries), 30% for wants (entertainment), and <strong>20% strictly for savings</strong>. Use our calculator to see if your monthly savings target aligns with this rule!
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does this calculator account for interest?",
        answer: "This is a pure savings calculator focused on principal accumulation. For growth with interest, use our Compound Interest or SIP calculator."
      },
      {
        question: "Why is an emergency fund important?",
        answer: "Financial experts recommend saving 3 to 6 months of living expenses in a highly liquid account to protect against unexpected job loss or medical emergencies."
      }
    ]
  },
  'cagr-calculator': {
    title: "CAGR Calculator | Compound Annual Growth Rate",
    description: "Calculate the Compound Annual Growth Rate (CAGR) of your investments. Measure the exact yearly return of your portfolio.",
    content: (
      <>
        <h2>What is CAGR?</h2>
        <p>
          The Compound Annual Growth Rate (CAGR) is the most accurate way to measure and compare the past performance of investments over time. It represents the smooth, annualized rate of return of an investment, pretending that it grew at a steady rate every year.
        </p>
        <h3>Why CAGR is Better Than Absolute Return</h3>
        <p>
          If your investment grows from $100 to $150 over 5 years, the absolute return is 50%. However, this doesn't account for the time it took. CAGR accounts for the time value of money, revealing that the actual annualized growth rate is 8.45% per year.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the formula for CAGR?",
        answer: "CAGR = [(Ending Value / Beginning Value) ^ (1 / Number of Years)] - 1"
      },
      {
        question: "Does CAGR account for investment risk?",
        answer: "No, CAGR only measures past growth. It assumes a smooth, steady growth rate and completely ignores the volatility and risk that happened in between."
      }
    ]
  },
  'simple-interest': {
    title: "Simple Interest Calculator | Principal, Rate, Time",
    description: "Calculate simple interest on loans and savings. Easily find the total interest and final amount with our free online calculator.",
    content: (
      <>
        <h2>Understanding Simple Interest</h2>
        <p>
          Simple interest is the most basic way of calculating interest. Unlike compound interest, simple interest is calculated <strong>only on the principal amount</strong>, ignoring any accumulated interest from previous periods.
        </p>
        <h3>The Simple Interest Formula</h3>
        <p>
          The formula is straightforward: <strong>I = P × R × T</strong>
          <br/><strong>P (Principal):</strong> The initial amount of money.
          <br/><strong>R (Rate):</strong> The annual interest rate (in decimal form).
          <br/><strong>T (Time):</strong> The time the money is invested or borrowed for, in years.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Where is simple interest used in real life?",
        answer: "Simple interest is commonly used for short-term personal loans, auto loans, and some types of short-term bonds or certificates of deposit."
      },
      {
        question: "Is simple interest better for the borrower or lender?",
        answer: "Simple interest is generally better for the borrower because they don't pay 'interest on interest,' resulting in a lower total payout compared to compounding loans."
      }
    ]
  },
  'cgpa': {
    title: "CGPA Calculator | Cumulative Grade Point Average",
    description: "Calculate your Cumulative Grade Point Average (CGPA) across multiple semesters. Track your university academic progress easily.",
    content: (
      <>
        <h2>How to Calculate CGPA</h2>
        <p>
          Your Cumulative Grade Point Average (CGPA) is the overall average of your grades across all semesters of your degree. It provides a single metric that represents your entire academic journey, which is crucial for university admissions and job applications.
        </p>
        <h3>Semester GPA vs. CGPA</h3>
        <p>
          Your <strong>Semester GPA</strong> is the average for just one specific term. Your <strong>CGPA</strong> combines all your semester GPAs, but it must be weighted by the number of credit hours you took in each semester. You cannot simply take the average of two semester GPAs if they have different credit hours!
        </p>
      </>
    ),
    faqs: [
      {
        question: "Can I convert my CGPA to a percentage?",
        answer: "Many universities provide a specific formula, but a common standard is to multiply your CGPA by 9.5 or use a direct multiplier like 25 (if on a 4.0 scale), though this varies globally."
      },
      {
        question: "How do credit hours affect my CGPA?",
        answer: "A semester where you took 18 credit hours will pull your CGPA much harder than a semester where you only took 12 credit hours."
      }
    ]
  },
  'fraction-calculator': {
    title: "Fraction Calculator | Add, Subtract, Multiply, Divide",
    description: "Free online fraction calculator. Add, subtract, multiply, and divide fractions easily. Get answers in simplified and mixed fraction formats.",
    content: (
      <>
        <h2>Mastering Fraction Mathematics</h2>
        <p>
          Fractions represent parts of a whole, but calculating them manually can be tricky. Our fraction calculator handles all four basic operations and automatically simplifies the result to its lowest terms.
        </p>
        <h3>The Rules of Fractions</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Addition/Subtraction:</strong> You must first find a common denominator before adding the numerators.</li>
          <li><strong>Multiplication:</strong> Multiply the numerators together, then multiply the denominators together.</li>
          <li><strong>Division:</strong> Flip the second fraction upside down (reciprocal) and then multiply them.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What is an improper fraction?",
        answer: "An improper fraction is one where the numerator (top number) is larger than the denominator (bottom number), such as 7/4."
      },
      {
        question: "Does the calculator simplify fractions?",
        answer: "Yes, the calculator automatically finds the Greatest Common Factor (GCF) to reduce the final answer to its simplest form."
      }
    ]
  },
  'decimal-to-fraction': {
    title: "Decimal to Fraction Converter | Simplify Decimals Instantly",
    description: "Convert any decimal number into a simplified fraction. Fast, accurate, and includes steps for converting repeating decimals.",
    content: (
      <>
        <h2>Converting Decimals to Fractions</h2>
        <p>
          While decimals are easy to use in calculators, fractions are often required in carpentry, recipe measurements, and advanced algebra. Our converter instantly translates any decimal value into its exact fractional equivalent.
        </p>
        <h3>How the Conversion Works</h3>
        <p>
          To convert a decimal like <code>0.75</code> to a fraction:
          <br/>1. Write it over 1: <code>0.75 / 1</code>
          <br/>2. Multiply top and bottom by 100 to remove the decimal: <code>75 / 100</code>
          <br/>3. Simplify by dividing by the Greatest Common Factor (25): <code>3 / 4</code>
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do you convert a repeating decimal?",
        answer: "Repeating decimals (like 0.333...) require an algebraic formula, but as a rule of thumb, a single repeating digit is placed over a 9 (e.g., 0.333... = 3/9 = 1/3)."
      },
      {
        question: "Can I convert whole numbers with decimals?",
        answer: "Yes, numbers like 2.5 will be converted into a mixed fraction (2 1/2) as well as an improper fraction (5/2)."
      }
    ]
  },
  'base-converter': {
    title: "Base Converter | Binary, Hexadecimal, Octal, Decimal",
    description: "Convert numbers between Decimal, Binary, Hexadecimal, and Octal bases. Essential tool for computer science and programming.",
    content: (
      <>
        <h2>Understanding Number Bases</h2>
        <p>
          While humans count in Base-10 (Decimal) because we have 10 fingers, computers operate entirely differently. Our base converter allows programmers and computer scientists to seamlessly translate data between different digital formats.
        </p>
        <h3>The Core Computer Bases</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Binary (Base-2):</strong> Uses only 0 and 1. The fundamental language of all computer hardware.</li>
          <li><strong>Octal (Base-8):</strong> Uses digits 0-7. Often used in Unix file permissions.</li>
          <li><strong>Hexadecimal (Base-16):</strong> Uses digits 0-9 and letters A-F. Used extensively for color codes (HTML) and memory addresses.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Why do programmers use Hexadecimal?",
        answer: "Hexadecimal is a highly compact way to represent binary data. One Hex digit perfectly represents four binary bits (a nibble), making it much easier for humans to read memory dumps or color codes."
      },
      {
        question: "What is the highest number in Base-2?",
        answer: "In Base-2 (Binary), the highest single digit is 1. To count higher than 1, you must add another column (e.g., the decimal number 2 is written as 10 in binary)."
      }
    ]
  },
  'discount-calculator': {
    title: "Discount Calculator | Find the Final Sale Price",
    description: "Calculate the final price after a percentage discount is applied. Quickly figure out your exact savings during sales and promotions.",
    content: (
      <>
        <h2>How the Discount Calculator Works</h2>
        <p>
          During major sales events like Black Friday or holiday clearances, stores often advertise massive percentage discounts. Our calculator helps you instantly figure out the exact cash amount you save, and the final price you will pay at the register.
        </p>
        <h3>The Discount Formula</h3>
        <p>
          Calculating a discount manually is easy:
          <br/><strong>Step 1:</strong> Convert the discount percentage to a decimal (20% = 0.20).
          <br/><strong>Step 2:</strong> Multiply the original price by the decimal to find the savings amount.
          <br/><strong>Step 3:</strong> Subtract the savings from the original price to get the final cost.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do I calculate a double discount?",
        answer: "If a store offers '20% off plus an extra 10% off', do NOT add them to 30%. You must calculate the 20% discount first, and then apply the 10% discount to the new, lower price."
      },
      {
        question: "Does the calculator include sales tax?",
        answer: "By default, this tool calculates the pre-tax discounted price. If sales tax applies, it is usually added to the final discounted price, not the original price."
      }
    ]
  },
  'tip-calculator': {
    title: "Tip Calculator | Calculate Gratuity and Split the Bill",
    description: "Easily calculate the tip for a restaurant bill and split the total cost among multiple people. Free online gratuity calculator.",
    content: (
      <>
        <h2>The Stress-Free Tip Calculator</h2>
        <p>
          Figuring out how much to tip the waiter and how to split the bill fairly among friends can ruin the end of a great meal. Our tip calculator does the math instantly, allowing you to focus on the conversation, not the receipt.
        </p>
        <h3>Tipping Etiquette Worldwide</h3>
        <p>
          Tipping rules vary wildly depending on where you are:
          <br/><strong>United States:</strong> 15% to 20% is the standard expectation for decent service.
          <br/><strong>Europe & Asia:</strong> Tipping is often included as a 'service charge', or a smaller 5-10% tip is given as a compliment.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Should I tip before or after tax?",
        answer: "Standard etiquette suggests calculating your tip based on the pre-tax total, though many people simply tip on the final bill amount for convenience."
      },
      {
        question: "How does splitting the bill work?",
        answer: "Our tool calculates the total bill (Cost + Tip) and then divides that final number equally by the number of people in your party, so everyone pays an exact, fair share."
      }
    ]
  },
  'bmr-calculator': {
    title: "BMR Calculator | Basal Metabolic Rate",
    description: "Calculate your Basal Metabolic Rate (BMR). Find out exactly how many calories your body burns at rest every day.",
    content: (
      <>
        <h2>What is Basal Metabolic Rate (BMR)?</h2>
        <p>
          Your Basal Metabolic Rate (BMR) represents the total number of calories your body needs to perform basic, life-sustaining functions (like breathing, blood circulation, and cell production) if you were to rest in bed all day.
        </p>
        <h3>Why BMR is Crucial for Weight Loss</h3>
        <p>
          You cannot create a healthy weight loss plan without knowing your BMR. It acts as the baseline for your daily calorie needs. Once you know your BMR, you multiply it by an activity factor to find your Total Daily Energy Expenditure (TDEE). Eating below your TDEE results in weight loss.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is BMR the same as resting metabolic rate (RMR)?",
        answer: "They are very similar. BMR is measured under strict laboratory conditions (fasted, fully rested), while RMR is a slightly less strict measurement of resting calorie burn. For practical purposes, they are often used interchangeably."
      },
      {
        question: "How can I increase my BMR?",
        answer: "Muscle tissue burns more calories at rest than fat tissue. Therefore, the most effective way to increase your BMR is by building muscle through resistance training."
      }
    ]
  },
  'body-fat': {
    title: "Body Fat Calculator | Estimate Your Body Fat Percentage",
    description: "Calculate your body fat percentage using the U.S. Navy Method. Enter your height, waist, and neck measurements for an accurate estimate.",
    content: (
      <>
        <h2>Understanding Body Fat Percentage</h2>
        <p>
          Body Fat Percentage is a much better indicator of overall health than Body Mass Index (BMI). While BMI only looks at your total weight, your body fat percentage distinguishes between heavy muscle mass and actual fat tissue.
        </p>
        <h3>The U.S. Navy Method</h3>
        <p>
          Our calculator uses the U.S. Navy algorithm, which estimates body fat based on the circumference of your waist, neck, and (for women) hips. It is one of the most accurate methods available outside of a clinical setting like a DEXA scan.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a healthy body fat percentage?",
        answer: "For men, a healthy range is typically 10-20%. For women, it is naturally higher, generally between 20-30%."
      },
      {
        question: "Why do I need to measure my neck?",
        answer: "The Navy method uses the neck measurement as a proxy for lean body mass. The difference between your waist (which holds fat) and your neck helps estimate total body fat."
      }
    ]
  },
  'ideal-weight': {
    title: "Ideal Weight Calculator | Find Your Healthy Target",
    description: "Calculate your ideal body weight based on your height, age, and gender using multiple scientifically validated formulas.",
    content: (
      <>
        <h2>Finding Your Ideal Body Weight (IBW)</h2>
        <p>
          "What should I weigh?" is one of the most common health questions. Our calculator uses multiple scientifically validated formulas (such as the Devine, Robinson, and Miller formulas) to give you a highly accurate target weight range.
        </p>
        <h3>Why Your Ideal Weight is a Range</h3>
        <p>
          There is no single "perfect" number. Your ideal weight depends on your bone density, muscle mass, and body frame size. Therefore, our tool provides a healthy <em>range</em>, giving you a realistic and achievable health goal rather than a strict, single number.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Which IBW formula is the most accurate?",
        answer: "The Devine formula (1974) is widely used in medicine for calculating drug dosages, but the Robinson formula is often preferred for general health and fitness goals."
      },
      {
        question: "Does this calculator account for muscle mass?",
        answer: "No, standard IBW formulas do not distinguish between fat and muscle. Highly muscular athletes may naturally weigh more than their predicted 'ideal' weight."
      }
    ]
  },
  'margin-calculator': {
    title: "Margin Calculator | Gross Profit & Sales Margin",
    description: "Calculate gross profit margin, markup, and determine your optimal selling price. Free online calculator for business owners and retailers.",
    content: (
      <>
        <h2>Margin vs. Markup</h2>
        <p>
          In retail and business, understanding the difference between Margin and Markup is the key to profitability. If a product costs $100 and you sell it for $150, your profit is $50.
        </p>
        <h3>The Mathematical Difference</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Margin:</strong> Profit divided by Sales Price. ($50 / $150 = 33.3% Margin)</li>
          <li><strong>Markup:</strong> Profit divided by Cost. ($50 / $100 = 50% Markup)</li>
        </ul>
        <p className="mt-2">Always set your prices based on Margin to ensure your business remains profitable after operating expenses.</p>
      </>
    ),
    faqs: [
      {
        question: "What is a good gross profit margin?",
        answer: "It varies heavily by industry. Grocery stores operate on razor-thin margins (1-3%), while software and digital products often have margins exceeding 70%."
      },
      {
        question: "How do I calculate a selling price from a desired margin?",
        answer: "Selling Price = Cost / (1 - Desired Margin Percentage). For example, to get a 20% margin on a $50 item: 50 / (1 - 0.20) = $62.50."
      }
    ]
  },
  'roi-calculator': {
    title: "ROI Calculator | Return on Investment",
    description: "Calculate the Return on Investment (ROI) of any business venture, stock, or real estate property. Find out your exact profit percentage.",
    content: (
      <>
        <h2>What is Return on Investment (ROI)?</h2>
        <p>
          Return on Investment (ROI) is a universal financial metric used to evaluate the efficiency and profitability of an investment. It tells you exactly how much profit you made for every dollar you invested, expressed as a percentage.
        </p>
        <h3>How to Calculate ROI</h3>
        <p>
          The formula is incredibly simple: <strong>ROI = (Net Profit / Cost of Investment) × 100</strong>.
          <br/>If you spend $1,000 on a marketing campaign and it generates $1,500 in total sales, your Net Profit is $500. Your ROI is ($500 / $1000) × 100 = <strong>50%</strong>.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is an annualized ROI?",
        answer: "Standard ROI ignores time. An Annualized ROI factors in how long it took to generate that return, giving you a percentage that represents the yearly growth rate (similar to CAGR)."
      },
      {
        question: "Can ROI be negative?",
        answer: "Yes, if your investment loses money (your final return is less than your initial cost), your Net Profit is negative, resulting in a negative ROI."
      }
    ]
  },
  'inflation-calculator': {
    title: "Inflation Calculator | Future Value of Money",
    description: "Calculate how inflation affects the purchasing power of your money over time. See what your savings will be worth in the future.",
    content: (
      <>
        <h2>The Silent Thief: Inflation</h2>
        <p>
          Inflation is the rate at which the general level of prices for goods and services is rising, causing purchasing power to fall. If the inflation rate is 3%, a $100 grocery bill today will cost $103 next year.
        </p>
        <h3>Protecting Your Wealth</h3>
        <p>
          This calculator demonstrates why leaving money sitting in a zero-interest checking account is dangerous. Over 10 or 20 years, inflation can destroy half the value of your savings. To combat inflation, your money must be invested in assets that yield a return higher than the annual inflation rate.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How is inflation calculated?",
        answer: "Governments calculate inflation using a Consumer Price Index (CPI), which tracks the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services."
      },
      {
        question: "What is hyperinflation?",
        answer: "Hyperinflation is extremely rapid or out of control inflation, typically defined as an inflation rate exceeding 50% per month."
      }
    ]
  },
  'vat-calculator': {
    title: "Global VAT Calculator | Add or Remove Value Added Tax",
    description: "Universal VAT calculator. Instantly add or remove Value Added Tax from prices. Supports standard rates for the UK, EU, and globally.",
    content: (
      <>
        <h2>The Universal Value Added Tax (VAT) Calculator</h2>
        <p>
          Value Added Tax (VAT) is a consumption tax assessed on the value added to goods and services. It is utilized in over 160 countries around the world, particularly in the European Union and the United Kingdom.
        </p>
        <h3>How to Extract VAT from a Total Price</h3>
        <p>
          If you have a receipt with a total price and need to find out how much of that was VAT, you cannot simply multiply the total by the VAT percentage. Instead, you must use division: <strong>Base Price = Total Price / (1 + VAT Rate)</strong>.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is VAT the same as Sales Tax?",
        answer: "No. Sales tax is only collected once, at the final point of sale to the consumer. VAT is collected at every stage of the supply chain whenever value is added."
      },
      {
        question: "How do I add 20% UK VAT?",
        answer: "To add 20% VAT to a net amount, simply multiply the net amount by 1.20."
      }
    ]
  },
  'gst-calculator': {
    title: "GST Calculator | Goods and Services Tax",
    description: "Calculate GST (Goods and Services Tax) instantly. Add or reverse calculate GST for India, Australia, Canada, and New Zealand.",
    content: (
      <>
        <h2>Calculating Goods and Services Tax (GST)</h2>
        <p>
          GST is an indirect, broad-based consumption tax applied to the cost of most goods and services. It is heavily utilized in countries like India (which has multiple tax slabs: 5%, 12%, 18%, 28%), Australia (10%), and Canada.
        </p>
        <h3>Inclusive vs. Exclusive GST</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>GST Exclusive:</strong> The price before tax. You must add the GST percentage to find the final selling price.</li>
          <li><strong>GST Inclusive:</strong> The final retail price including tax. Use our reverse-calculator to extract the base price for accounting and tax returns.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How do you reverse calculate 18% GST?",
        answer: "If the final price is $118, divide it by 1.18 to get the base pre-tax price of $100."
      },
      {
        question: "What is the difference between CGST and SGST in India?",
        answer: "In India, intra-state sales are split equally between the Central Government (CGST) and the State Government (SGST). An 18% GST item will have 9% CGST and 9% SGST."
      }
    ]
  },
  'ppf-calculator': {
    title: "PPF Calculator | Public Provident Fund Returns",
    description: "Calculate your Public Provident Fund (PPF) maturity amount, total investment, and tax-free interest earned over 15 years.",
    content: (
      <>
        <h2>Why Invest in a Public Provident Fund (PPF)?</h2>
        <p>
          The Public Provident Fund (PPF) is one of the most popular long-term saving schemes in India, favored for its safety, attractive interest rates, and incredible tax benefits under the EEE (Exempt-Exempt-Exempt) category.
        </p>
        <h3>The Magic of 15-Year Compounding</h3>
        <p>
          A PPF account has a mandatory lock-in period of 15 years. While this seems long, it allows your money to experience massive growth through annual compounding. The interest earned is completely tax-free, making it superior to standard bank Fixed Deposits for long-term goals like retirement.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the maximum I can invest in PPF?",
        answer: "The current maximum limit for PPF investments in India is Rs. 1.5 Lakh per financial year to claim Section 80C tax deductions."
      },
      {
        question: "Can I extend my PPF account after 15 years?",
        answer: "Yes, upon maturity after 15 years, you can extend your PPF account in blocks of 5 years, with or without making further contributions."
      }
    ]
  },
  'salary-calculator': {
    title: "Salary Calculator | Gross vs. Net Take-Home Pay",
    description: "Calculate your exact take-home pay. Deduct taxes, insurance, and provident fund contributions to find your true monthly net salary.",
    content: (
      <>
        <h2>Gross Salary vs. Net Take-Home Pay</h2>
        <p>
          When you accept a job offer, the company quotes your Gross Salary (your total pay before any deductions). However, what you actually receive in your bank account is your Net Take-Home Pay, which can be significantly lower.
        </p>
        <h3>Common Salary Deductions</h3>
        <p>
          To find your net salary, you must subtract several mandatory and voluntary deductions from your gross pay:
          <br/><strong>Income Tax (TDS):</strong> Deducted by your employer and paid to the government.
          <br/><strong>Retirement Funds:</strong> Contributions to Provident Funds (PF), SSF, or 401(k)s.
          <br/><strong>Health Insurance:</strong> Premiums for company-sponsored medical coverage.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is Cost to Company (CTC)?",
        answer: "CTC is the total amount a company spends on an employee. It includes the gross salary PLUS employer contributions to retirement funds, bonuses, and perks."
      },
      {
        question: "How can I increase my take-home pay?",
        answer: "You can optimize your take-home pay by claiming all legal tax deductions, maximizing tax-saving investments, or restructuring your salary components with your HR department."
      }
    ]
  },
  'time-calculator': {
    title: "Time Calculator | Add, Subtract, & Multiply Time",
    description: "Add or subtract hours, minutes, and seconds easily. Perfect for payroll, running times, and scheduling tasks.",
    content: (
      <>
        <h2>How the Time Calculator Works</h2>
        <p>
          Calculating time is notoriously difficult because it relies on a Base-60 system (60 seconds in a minute, 60 minutes in an hour) rather than the standard Base-10 decimal system used in regular math. Our calculator automatically handles these conversions for you.
        </p>
        <h3>Common Uses</h3>
        <p>
          <strong>Payroll & Timesheets:</strong> Add up the exact number of hours and minutes worked over a week to calculate total pay.
          <br/><strong>Athletics:</strong> Calculate pace and total running times for marathons or interval training.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do you add times together?",
        answer: "To add time, you add the hours, minutes, and seconds separately. If the seconds exceed 60, you add 1 to the minutes and keep the remainder. If minutes exceed 60, you add 1 to the hours."
      },
      {
        question: "Can I subtract a later time from an earlier time?",
        answer: "Yes, this is common when calculating a time difference across midnight. The calculator automatically adjusts for 24-hour cycles."
      }
    ]
  },
  'speed-distance-time': {
    title: "Speed, Distance & Time Calculator",
    description: "Calculate speed, distance, or time. Enter any two values to instantly find the missing variable using standard physics formulas.",
    content: (
      <>
        <h2>The Speed, Distance, and Time Triangle</h2>
        <p>
          The relationship between speed, distance, and time is one of the most fundamental concepts in physics. If you know any two of these variables, you can easily calculate the third.
        </p>
        <h3>The Core Formulas</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Speed:</strong> Distance ÷ Time. (e.g., How fast are you going?)</li>
          <li><strong>Distance:</strong> Speed × Time. (e.g., How far will you travel?)</li>
          <li><strong>Time:</strong> Distance ÷ Speed. (e.g., How long will the trip take?)</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What is the difference between speed and velocity?",
        answer: "Speed is a scalar quantity (how fast you are moving), while velocity is a vector quantity (how fast you are moving AND in what specific direction)."
      },
      {
        question: "How do I convert km/h to mph?",
        answer: "To convert kilometers per hour to miles per hour, divide the speed by 1.60934."
      }
    ]
  },
  'acceleration-calculator': {
    title: "Acceleration Calculator | Find Change in Velocity",
    description: "Calculate the acceleration of an object. Instantly find the rate of change in velocity over time using standard kinematics equations.",
    content: (
      <>
        <h2>What is Acceleration?</h2>
        <p>
          Acceleration is the rate at which an object changes its velocity. If you are driving a car and press the gas pedal, you are accelerating because your speed is increasing over time. Conversely, hitting the brakes is a form of negative acceleration (deceleration).
        </p>
        <h3>The Acceleration Formula</h3>
        <p>
          The standard formula is: <strong>a = (v_f - v_i) / t</strong>
          <br/>Where <strong>v_f</strong> is the final velocity, <strong>v_i</strong> is the initial velocity, and <strong>t</strong> is the time taken for the change.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the unit of acceleration?",
        answer: "The standard SI unit for acceleration is meters per second squared (m/s²)."
      },
      {
        question: "What is the acceleration due to gravity?",
        answer: "On Earth, the acceleration due to gravity is approximately 9.81 m/s²."
      }
    ]
  },
  'kinetic-energy-calculator': {
    title: "Kinetic Energy Calculator | Mass and Velocity",
    description: "Calculate the kinetic energy of a moving object. Enter mass and velocity to find the energy in Joules instantly.",
    content: (
      <>
        <h2>Understanding Kinetic Energy</h2>
        <p>
          Kinetic energy is the energy that an object possesses due to its motion. The heavier an object is and the faster it moves, the more kinetic energy it has. This is why a fast-moving truck causes significantly more damage in a collision than a slow-moving bicycle.
        </p>
        <h3>The Kinetic Energy Formula</h3>
        <p>
          The physics formula is: <strong>KE = 1/2 × m × v²</strong>
          <br/>Where <strong>m</strong> is the mass (in kilograms) and <strong>v</strong> is the velocity (in meters per second). Notice that velocity is squared, meaning speed has a much greater impact on kinetic energy than mass.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the unit of Kinetic Energy?",
        answer: "The standard SI unit for any form of energy, including kinetic energy, is the Joule (J)."
      },
      {
        question: "Can kinetic energy be negative?",
        answer: "No. Because mass is always positive and velocity is squared (making it positive), kinetic energy is always a positive value or zero."
      }
    ]
  },
  'potential-energy-calculator': {
    title: "Potential Energy Calculator | Gravitational Energy",
    description: "Calculate the gravitational potential energy of an object. Enter mass and height to find the stored energy in Joules.",
    content: (
      <>
        <h2>What is Potential Energy?</h2>
        <p>
          Potential energy is the stored energy an object has because of its position or state. The most common type is Gravitational Potential Energy—the energy an object holds because of its height above the ground.
        </p>
        <h3>The Potential Energy Formula</h3>
        <p>
          The standard formula is: <strong>PE = m × g × h</strong>
          <br/>Where <strong>m</strong> is mass (in kg), <strong>g</strong> is the acceleration due to gravity (9.81 m/s² on Earth), and <strong>h</strong> is the height (in meters).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What happens to potential energy when an object falls?",
        answer: "As an object falls, its height decreases, meaning it loses potential energy. According to the conservation of energy, this lost potential energy is converted directly into kinetic energy."
      },
      {
        question: "Does potential energy depend on the path taken?",
        answer: "No. Gravitational potential energy only depends on the vertical height, not the path taken to reach that height."
      }
    ]
  },
  'force-calculator': {
    title: "Force Calculator | Newton's Second Law",
    description: "Calculate force, mass, or acceleration using Newton's Second Law of Motion (F = m × a). Fast and accurate physics calculator.",
    content: (
      <>
        <h2>Understanding Newton's Second Law</h2>
        <p>
          Force is a push or pull upon an object resulting from its interaction with another object. According to Sir Isaac Newton's Second Law of Motion, the force applied to an object is equal to the mass of that object multiplied by its acceleration.
        </p>
        <h3>The Force Formula</h3>
        <p>
          The foundational physics equation is: <strong>F = m × a</strong>
          <br/>Where <strong>F</strong> is Force (in Newtons), <strong>m</strong> is mass (in kg), and <strong>a</strong> is acceleration (in m/s²).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a Newton?",
        answer: "A Newton (N) is the standard SI unit of force. One Newton is equal to the force required to accelerate a 1-kilogram mass at a rate of 1 meter per second squared."
      },
      {
        question: "Is force a vector or scalar?",
        answer: "Force is a vector quantity, meaning it has both a magnitude (how strong the push/pull is) and a specific direction."
      }
    ]
  },
  'pressure-calculator': {
    title: "Pressure Calculator | Force and Area",
    description: "Calculate pressure, force, or area. Understand how force is distributed over a surface using standard physics formulas.",
    content: (
      <>
        <h2>The Physics of Pressure</h2>
        <p>
          Pressure is defined as the physical force exerted on an object. The force applied is perpendicular to the surface of objects per unit area. This explains why a sharp knife cuts easily (the force is concentrated on a tiny area, creating massive pressure).
        </p>
        <h3>The Pressure Formula</h3>
        <p>
          The formula is: <strong>P = F / A</strong>
          <br/>Where <strong>P</strong> is Pressure (in Pascals), <strong>F</strong> is Force (in Newtons), and <strong>A</strong> is the Area (in square meters).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a Pascal?",
        answer: "A Pascal (Pa) is the standard SI unit of pressure. It is defined as one Newton of force applied over one square meter of area (N/m²)."
      },
      {
        question: "How does area affect pressure?",
        answer: "Pressure is inversely proportional to area. If you apply the exact same force to a smaller area, the pressure drastically increases."
      }
    ]
  },
  'work-calculator': {
    title: "Work Calculator | Force and Displacement",
    description: "Calculate the mechanical work done when a force is applied over a distance. Free online physics calculator for work and energy.",
    content: (
      <>
        <h2>What is Work in Physics?</h2>
        <p>
          In everyday language, 'work' means any physical or mental effort. However, in physics, Work is strictly defined as the measure of energy transfer that occurs when an object is moved over a distance by an external, parallel force.
        </p>
        <h3>The Work Formula</h3>
        <p>
          The formula is: <strong>W = F × d × cos(θ)</strong>
          <br/>Where <strong>W</strong> is Work (in Joules), <strong>F</strong> is the force applied, <strong>d</strong> is the displacement, and <strong>θ</strong> is the angle of the force. If the force is applied in the exact direction of movement, the angle is 0, and the formula simplifies to W = F × d.
        </p>
      </>
    ),
    faqs: [
      {
        question: "If I push a wall and it doesn't move, did I do work?",
        answer: "In physics, no. Because the displacement (distance moved) is zero, the total mechanical work done is zero, regardless of how tired you feel."
      },
      {
        question: "What is the unit of Work?",
        answer: "Work is a form of energy transfer, so it is measured in Joules (J)."
      }
    ]
  },
  'power-calculator': {
    title: "Power Calculator | Work and Time",
    description: "Calculate power output. Find out the rate at which work is done or energy is transferred using our free physics calculator.",
    content: (
      <>
        <h2>Understanding Power Output</h2>
        <p>
          While 'Work' measures the total amount of energy transferred, 'Power' measures how <em>fast</em> that work is done. A weak engine and a powerful engine can both do the same amount of work (e.g., move a car 1 mile), but the powerful engine does it in much less time.
        </p>
        <h3>The Power Formula</h3>
        <p>
          The formula is: <strong>P = W / t</strong>
          <br/>Where <strong>P</strong> is Power (in Watts), <strong>W</strong> is the Work done (in Joules), and <strong>t</strong> is the time taken (in seconds).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a Watt?",
        answer: "A Watt (W) is the standard SI unit of power. It is defined as one Joule of work performed per second (1 J/s)."
      },
      {
        question: "How do Watts relate to Horsepower?",
        answer: "Horsepower is an imperial unit of power. One mechanical horsepower is equivalent to approximately 745.7 Watts."
      }
    ]
  },
  'density-calculator': {
    title: "Density Calculator | Mass and Volume",
    description: "Calculate the density of an object. Enter mass and volume to instantly find the density in standard units.",
    content: (
      <>
        <h2>What is Density?</h2>
        <p>
          Density is a measurement that compares the amount of matter an object has (its mass) to its size (its volume). It explains why a handful of lead feels much heavier than a handful of feathers, even though they take up the same amount of space.
        </p>
        <h3>The Density Formula</h3>
        <p>
          The formula is: <strong>ρ = m / V</strong>
          <br/>Where <strong>ρ (rho)</strong> is Density, <strong>m</strong> is mass, and <strong>V</strong> is volume. Objects with a density lower than water (1,000 kg/m³) will float, while objects with a higher density will sink.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What are the common units for density?",
        answer: "In the metric system, density is usually expressed as kilograms per cubic meter (kg/m³) or grams per cubic centimeter (g/cm³)."
      },
      {
        question: "Does temperature affect density?",
        answer: "Yes. For most substances, as temperature increases, the substance expands, increasing its volume and thereby decreasing its density."
      }
    ]
  },
  'engineering-gpa': {
    title: "Engineering GPA Calculator | Tech Degree Grading",
    description: "Calculate your Engineering GPA accurately. Custom weighting for heavy credit-hour labs and technical subjects.",
    content: (
      <>
        <h2>Why an Engineering GPA Calculator?</h2>
        <p>
          Engineering degrees often feature highly variable credit hours (e.g., 4-credit calculus courses vs. 1-credit lab sessions). A standard GPA calculator might incorrectly weigh these, destroying your actual grade representation. This tool correctly applies credit-hour weighting standard to most tech degrees.
        </p>
        <h3>The Importance of Major GPA</h3>
        <p>
          When applying for tech internships, recruiters often look at your "Major GPA" (the GPA of only your core engineering and math classes) rather than your Cumulative GPA (which includes general education electives).
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do credit hours affect my GPA?",
        answer: "A class worth 4 credits impacts your GPA four times as much as a 1-credit class. Doing well in heavy-credit core classes is essential for a high engineering GPA."
      },
      {
        question: "Should I list my Major GPA on my resume?",
        answer: "Yes, especially if your Major GPA is significantly higher than your Cumulative GPA. Just ensure you clearly label it as 'Major GPA' to avoid misleading recruiters."
      }
    ]
  },
  'marks-needed': {
    title: "Target Grade Calculator | What Do I Need on My Final?",
    description: "Calculate exactly what score you need on your final exam to keep your A, or pass the class. Relieve your end-of-semester anxiety instantly.",
    content: (
      <>
        <h2>The 'Final Grade' Anxiety</h2>
        <p>
          As finals week approaches, the most common question students ask is: <em>"What do I need to score on the final exam to pass the class?"</em> Our calculator uses the exact weighting of your syllabus to give you a precise target score.
        </p>
        <h3>How the Math Works</h3>
        <p>
          If you have an 85% in the class going into a final that is worth 20% of your grade, and you want a final grade of 90%, the formula must reverse-engineer the weighted average: <strong>Target = (Desired Grade - (Current Grade × (1 - Final Weight))) / Final Weight</strong>.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What if the calculator says I need over 100%",
        answer: "If the required score is over 100%, it means it is mathematically impossible to achieve your desired final grade with the remaining weight of the final exam, unless extra credit is offered."
      },
      {
        question: "Can I use this if my class uses a point system instead of percentages?",
        answer: "Yes, you can simply convert your total points earned and total points possible into a percentage before using the calculator."
      }
    ]
  },
  'statistics-plus': {
    title: "Statistics Calculator | Mean, Median, Mode, Variance",
    description: "Advanced descriptive statistics calculator. Instantly find the mean, median, mode, variance, and standard deviation of any data set.",
    content: (
      <>
        <h2>Understanding Descriptive Statistics</h2>
        <p>
          Descriptive statistics provide a summary that quantitatively describes or summarizes features from a collection of information. Rather than looking at raw data (like thousands of individual test scores), statistics give you a "big picture" view of the central tendency and dispersion.
        </p>
        <h3>Key Metrics Explained</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Mean (Average):</strong> The sum of all numbers divided by the count. Sensitive to extreme outliers.</li>
          <li><strong>Median:</strong> The exact middle value when data is sorted. Highly robust against outliers.</li>
          <li><strong>Variance:</strong> A measure of how spread out the data points are from the mean.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "When should I use the median instead of the mean?",
        answer: "Use the median when your data set has massive outliers (like income distribution) because extreme high/low values will artificially drag the mean up or down."
      },
      {
        question: "What is a bimodal distribution?",
        answer: "It is a data set that has two distinct peaks (modes), meaning there are two most-frequent values rather than just one."
      }
    ]
  },
  'z-score': {
    title: "Z-Score Calculator | Standard Normal Distribution",
    description: "Calculate the Z-score for any data point. Determine exactly how many standard deviations a value is away from the mean.",
    content: (
      <>
        <h2>What is a Z-Score?</h2>
        <p>
          In statistics, a Z-score (or standard score) tells you how far a data point is from the mean of a data set, measured in terms of standard deviations. It allows you to compare results from completely different tests or surveys on a level playing field.
        </p>
        <h3>The Empirical Rule (68-95-99.7)</h3>
        <p>
          In a normal distribution (a bell curve):
          <br/><strong>68%</strong> of data falls within a Z-score of -1 to 1.
          <br/><strong>95%</strong> falls within a Z-score of -2 to 2.
          <br/><strong>99.7%</strong> falls within a Z-score of -3 to 3. If you have a Z-score of 3.5, you are in the extreme upper percentile!
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the Z-score formula?",
        answer: "Z = (X - μ) / σ, where X is the raw score, μ is the population mean, and σ is the population standard deviation."
      },
      {
        question: "Can a Z-score be negative?",
        answer: "Yes. A negative Z-score simply means the data point is below the average (mean), while a positive Z-score means it is above the average."
      }
    ]
  },
  'ratio-proportion': {
    title: "Ratio & Proportion Calculator | Scale and Simplify",
    description: "Solve proportions, find missing values in ratios, and simplify complex ratios instantly. Essential for baking, geometry, and scaling.",
    content: (
      <>
        <h2>Mastering Ratios and Proportions</h2>
        <p>
          A ratio compares the relationship between two amounts (e.g., 2 cups of flour for every 1 cup of sugar). A proportion is simply an equation stating that two ratios are equal (e.g., 2/1 = 4/2).
        </p>
        <h3>Cross-Multiplication Made Easy</h3>
        <p>
          If you are trying to scale up a recipe or resize an image while maintaining its aspect ratio, you must find a missing value in a proportion (A/B = C/X). Our calculator uses algebraic cross-multiplication to solve for the missing variable instantly.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do you simplify a ratio?",
        answer: "To simplify a ratio like 15:20, you find the Greatest Common Factor (GCF) of both numbers, which is 5. Divide both sides by 5 to get the simplified ratio of 3:4."
      },
      {
        question: "What is the 'Golden Ratio'?",
        answer: "The Golden Ratio is an irrational mathematical constant, approximately 1.618. It frequently appears in geometry, art, and architecture as the most aesthetically pleasing proportion."
      }
    ]
  },
  'area-calculator': {
    title: "Area Calculator | Square Footage & Geometric Shapes",
    description: "Calculate the area of a circle, square, rectangle, or triangle. Get instant measurements in square feet, meters, and acres.",
    content: (
      <>
        <h2>Why Do We Calculate Area?</h2>
        <p>
          Area is a measurement of the 2D surface enclosed within a boundary. Whether you are buying paint for a wall, fertilizer for a lawn, or carpet for a bedroom, calculating the exact square footage is the first step to knowing how much material to buy.
        </p>
        <h3>Common Area Formulas</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Rectangle:</strong> Length × Width</li>
          <li><strong>Triangle:</strong> 1/2 × Base × Height</li>
          <li><strong>Circle:</strong> π × Radius²</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How do I calculate the area of an irregular room?",
        answer: "The easiest method is to divide the irregular shape into smaller, standard shapes (like multiple rectangles), calculate the area of each separately, and then add them together."
      },
      {
        question: "What is the difference between Area and Perimeter?",
        answer: "Perimeter is the 1D length of the OUTSIDE boundary (like a fence). Area is the 2D space on the INSIDE (like the grass inside the fence)."
      }
    ]
  },
  'logarithm-calculator': {
    title: "Logarithm Calculator | Base 10, Natural Log (ln)",
    description: "Calculate logarithms and inverse logarithms for any base. Instantly solve complex exponential equations.",
    content: (
      <>
        <h2>Understanding Logarithms</h2>
        <p>
          A logarithm is simply the inverse operation to exponentiation. It answers the question: <em>"To what power must a base number be raised to produce a specific given number?"</em> For example, if 10² = 100, then the base-10 logarithm of 100 is 2.
        </p>
        <h3>Common vs. Natural Logarithms</h3>
        <p>
          In mathematics, you will encounter two primary types:
          <br/><strong>Common Log (log):</strong> Uses base 10. Heavily used in engineering and defining the Richter Scale for earthquakes.
          <br/><strong>Natural Log (ln):</strong> Uses the mathematical constant <em>e</em> (approx 2.718) as its base. It is the fundamental backbone of calculus and compounding growth formulas.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Can you take the logarithm of a negative number?",
        answer: "No, in the realm of real numbers, logarithms are undefined for negative numbers and zero. An exponent applied to a positive base will never result in a negative number."
      },
      {
        question: "How do I change the base of a logarithm?",
        answer: "You can use the Change of Base Formula: log_b(x) = log_k(x) / log_k(b), allowing you to convert any base to a standard base-10 calculation."
      }
    ]
  },
  'rounding': {
    title: "Rounding Number Utility | Significant Figures",
    description: "Round any decimal number to the nearest tenth, hundredth, or a specific number of significant figures. Mathematical precision tool.",
    content: (
      <>
        <h2>The Rules of Rounding Numbers</h2>
        <p>
          Rounding is used to make numbers simpler and easier to use while keeping their value close to what it originally was. The fundamental rule is: If the digit you are rounding is followed by 5, 6, 7, 8, or 9, round the number UP. If it is 0, 1, 2, 3, or 4, round DOWN.
        </p>
        <h3>What are Significant Figures?</h3>
        <p>
          In science and engineering, "sig-figs" indicate the precision of a measurement. You cannot report an answer to 8 decimal places if your original measuring tool only had precision to 1 decimal place! Our calculator helps you truncate numbers to their valid scientific precision.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is 'Banker's Rounding'?",
        answer: "Banker's rounding (or Round-Half-To-Even) is a statistical tie-breaking rule. If a number ends exactly in 5, it rounds to the nearest EVEN number (e.g., 2.5 becomes 2, but 3.5 becomes 4). This prevents massive upward drift in large datasets."
      },
      {
        question: "How do I round to the nearest hundredth?",
        answer: "Look at the third decimal place (the thousandths). If it's 5 or higher, increase the second decimal place by 1. Otherwise, leave it as is."
      }
    ]
  },
  'simple-calculator': {
    title: "Basic Calculator | Standard Online Arithmetic Tool",
    description: "A fast, free online basic calculator for standard addition, subtraction, multiplication, and division. Perfect for quick daily math.",
    content: (
      <>
        <h2>The Standard Daily Calculator</h2>
        <p>
          While we offer dozens of advanced engineering and financial tools, sometimes you just need to do basic math quickly without hunting for an app on your phone. This lightweight, high-speed standard calculator handles all primary arithmetic operations instantly.
        </p>
        <h3>Order of Operations (PEMDAS)</h3>
        <p>
          Our calculator engine strictly follows standard algebraic rules: <strong>P</strong>arentheses, <strong>E</strong>xponents, <strong>M</strong>ultiplication/<strong>D</strong>ivision (left to right), and <strong>A</strong>ddition/<strong>S</strong>ubtraction (left to right).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What happens if I divide by zero?",
        answer: "In mathematics, division by zero is undefined. Our calculator will return an error or 'Infinity' depending on the exact computation constraint."
      },
      {
        question: "Does this calculator support keyboard input?",
        answer: "Yes, for maximum speed on a desktop, you can use your numeric keypad to enter numbers and operations directly."
      }
    ]
  },
  'roman-numerals': {
    title: "Roman Numerals Converter | Translate to Arabic Numbers",
    description: "Convert Roman Numerals (e.g., XIV, MMXXIV) to standard decimal numbers and vice versa. Learn the rules of ancient Roman counting.",
    content: (
      <>
        <h2>The Ancient Roman Numeral System</h2>
        <p>
          Originating in ancient Rome, this numeric system remained the standard way of writing numbers throughout Europe well into the Late Middle Ages. Today, they are still used in clock faces, movie copyright dates, and the Super Bowl.
        </p>
        <h3>The Core Symbols</h3>
        <p>
          Roman numerals use seven distinct letters from the Latin alphabet: <strong>I (1), V (5), X (10), L (50), C (100), D (500), and M (1000).</strong>
        </p>
        <p className="mt-2">
          <strong>The Subtraction Rule:</strong> If a smaller number is placed BEFORE a larger number, it is subtracted. For example, IV is 4 (5 - 1), but VI is 6 (5 + 1).
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is there a Roman Numeral for zero?",
        answer: "No, the Romans did not have a numeral or concept for zero as a standalone number. They simply left a blank space or used the Latin word 'nulla'."
      },
      {
        question: "What is the highest number you can write?",
        answer: "Using standard Roman symbols, the highest easily written number is 3,999 (MMMCMXCIX). To write higher numbers, the Romans used a 'vinculum' (an overline) to multiply the value by 1,000."
      }
    ]
  },
  'calculus-lab': {
    title: "Calculus & Algebra Solver | Derivatives & Integrals",
    description: "Solve complex calculus problems instantly. Calculate derivatives, integrals, and limits with step-by-step symbolic logic.",
    content: (
      <>
        <h2>The Power of a Calculus Solver</h2>
        <p>
          Calculus forms the foundation of modern engineering, physics, and economics. However, manually computing complex derivatives or indefinite integrals is highly error-prone. Our Calculus Lab provides instantaneous symbolic computation, ensuring 100% mathematical accuracy.
        </p>
        <h3>Derivatives vs. Integrals</h3>
        <p>
          <strong>Derivatives</strong> measure the instantaneous rate of change of a function (the slope of a curve).
          <br/><strong>Integrals</strong> measure the total accumulation of a quantity, mathematically representing the area under a curve. Together, they form the Fundamental Theorem of Calculus.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does the calculator support chain rule differentiation?",
        answer: "Yes, the symbolic engine automatically applies the chain rule, product rule, and quotient rule where necessary."
      },
      {
        question: "Can it solve definite integrals?",
        answer: "Yes, you can input upper and lower bounds to calculate the exact numerical value of a definite integral."
      }
    ]
  },
  'nepal-salary': {
    title: "Salary Calculator Nepal | Net Take-Home Pay & IRD Tax",
    description: "Calculate your exact take-home salary in Nepal. Accurately deducts SSF, CIT, EPF, and the latest IRD income tax slabs.",
    content: (
      <>
        <h2>Gross Salary vs. Net Pay in Nepal</h2>
        <p>
          When accepting a job offer in Nepal, the quoted "Gross Salary" is not what deposits into your bank account. The Inland Revenue Department (IRD) mandates several deductions that significantly reduce your final take-home pay.
        </p>
        <h3>Standard Deductions Explained</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Social Security Fund (SSF):</strong> 11% of basic salary deducted from the employee.</li>
          <li><strong>Employees Provident Fund (EPF):</strong> Typically 10% deduction.</li>
          <li><strong>Income Tax (TDS):</strong> Deducted according to your marital status slab (1% social security tax up to 39% maximum slab).</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Is the 1% Social Security Tax mandatory?",
        answer: "Yes, all salaried employees not enrolled in the formal SSF scheme must pay a flat 1% tax on their base exemption limit."
      },
      {
        question: "How does CIT investment affect my salary tax?",
        answer: "Investing in the Citizen Investment Trust (CIT) allows you to claim tax deductions up to Rs. 300,000 or 1/3rd of your assessable income, drastically lowering your tax liability."
      }
    ]
  },
  'nepal-home-loan': {
    title: "Home Loan EMI Calculator Nepal | Mortgage Rates",
    description: "Calculate your Home Loan EMI based on current Nepal bank interest rates. Generate complete amortization schedules for housing loans.",
    content: (
      <>
        <h2>Planning a Home Loan in Nepal</h2>
        <p>
          Purchasing real estate in Kathmandu or other major cities requires substantial capital, making Home Loans the most common path to property ownership. Calculating your Equated Monthly Installment (EMI) helps you understand if a loan fits your monthly budget.
        </p>
        <h3>How Nepal Banks Calculate EMI</h3>
        <p>
          Commercial banks in Nepal (like Nabil, Global IME, or NIC Asia) use a standard reducing-balance method. Your monthly EMI remains fixed, but the portion of the EMI going toward interest decreases over time, while the portion going toward the principal increases.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is a typical Home Loan interest rate in Nepal?",
        answer: "Rates fluctuate based on the NRB's base rate, but typically range between 9% to 13% depending on liquidity and bank policies."
      },
      {
        question: "What is a prepayment penalty?",
        answer: "If you pay off your home loan early (before maturity), Nepali banks usually charge a prepayment penalty of 1% to 2% on the outstanding amount."
      }
    ]
  },
  'nea-bill': {
    title: "NEA Electricity Bill Calculator Nepal",
    description: "Calculate your exact Nepal Electricity Authority (NEA) bill. Supports 5 Amp to 60 Amp single-phase progressive block tariffs.",
    content: (
      <>
        <h2>Understanding NEA Progressive Billing</h2>
        <p>
          The Nepal Electricity Authority (NEA) uses a "progressive block tariff" system. This means that electricity becomes more expensive per unit the more you consume. The goal is to provide heavily subsidized rates to low-income households while charging premium rates for heavy usage.
        </p>
        <h3>Ampere Capacity Matters</h3>
        <p>
          Your billing structure changes entirely based on your meter's capacity. A standard 5 Amp meter has different slab limits and energy charges compared to a 15 Amp, 30 Amp, or 60 Amp meter. Always check your meter type before calculating!
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the minimum charge for a 5 Amp meter?",
        answer: "For a 5 Amp meter, the minimum monthly demand charge is currently Rs. 30, which includes a few units of free electricity."
      },
      {
        question: "Why did my bill suddenly double?",
        answer: "If you cross a tariff slab (e.g., jumping from 150 units to 151 units), the rate for the excess units increases significantly under the progressive billing system."
      }
    ]
  },
  'nepal-stocks': {
    title: "NEPSE Share Trading Calculator | Profit & Broker Commission",
    description: "Calculate your exact NEPSE share trading profit. Automatically deducts broker commissions, SEBON fees, DP charges, and Capital Gains Tax.",
    content: (
      <>
        <h2>The Hidden Costs of Trading in NEPSE</h2>
        <p>
          When you sell shares at a profit on the Nepal Stock Exchange (NEPSE), the difference between the buy and sell price is not your final profit. You must account for several mandatory fees that eat into your margins.
        </p>
        <h3>Mandatory Trading Deductions</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Broker Commission:</strong> Ranging from 0.40% to 0.27% depending on transaction volume.</li>
          <li><strong>SEBON Fee:</strong> A flat regulatory fee of 0.015%.</li>
          <li><strong>DP Charge:</strong> Rs. 25 levied by your Depository Participant per transaction.</li>
          <li><strong>Capital Gains Tax (CGT):</strong> 5% or 7.5% depending on holding period.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How is NEPSE Capital Gains Tax (CGT) calculated?",
        answer: "If you hold the stock for less than 365 days (short-term), the CGT is 7.5% of your net profit. If held for more than 365 days (long-term), the CGT drops to 5%."
      },
      {
        question: "Does the broker commission apply to both buying and selling?",
        answer: "Yes, you pay broker commissions both when purchasing the shares and when selling them."
      }
    ]
  },
  'property-tax': {
    title: "Capital Gains Tax (CGT) Calculator Real Estate Nepal",
    description: "Calculate Capital Gains Tax for real estate and land sales in Nepal. Find out your exact tax liability before visiting Malpot office.",
    content: (
      <>
        <h2>Capital Gains Tax on Property in Nepal</h2>
        <p>
          When you sell land or a house at a profit in Nepal, the government levies a Capital Gains Tax (CGT). This tax is strictly calculated on the profit margin (Selling Price minus the official Purchase Price), not the total sale value.
        </p>
        <h3>Holding Period Tax Slabs</h3>
        <p>
          The Inland Revenue Department enforces different rates based on how long you owned the property:
          <br/><strong>Short-Term (Less than 5 Years):</strong> Taxed at 7.5% of the total profit.
          <br/><strong>Long-Term (More than 5 Years):</strong> Taxed at a reduced rate of 5% to encourage long-term investment.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What happens if I sell the property at a loss?",
        answer: "If the selling price (official valuation) is less than your purchase price, there is no capital gain, and therefore, no Capital Gains Tax is payable."
      },
      {
        question: "Who pays the CGT, buyer or seller?",
        answer: "Legally, the Capital Gains Tax is the liability of the seller who made the profit, though actual payment arrangements are often negotiated during the sale."
      }
    ]
  },
  'property-registration': {
    title: "Property Registration & Malpot Fee Calculator",
    description: "Calculate land and house registration fees (Rajiinama pass) for Nepal Malpot offices. Includes municipal discounts and stamp duties.",
    content: (
      <>
        <h2>Understanding Malpot Registration Fees</h2>
        <p>
          Transferring property ownership in Nepal requires paying a Registration Fee to the local Land Revenue Office (Malpot). This fee is a significant closing cost and is calculated as a percentage of the property's official government valuation.
        </p>
        <h3>Female Ownership Discounts</h3>
        <p>
          To encourage women's property ownership, the Government of Nepal offers substantial discounts on registration fees if the land is registered in a woman's name. These discounts range from 25% to 50% depending on whether the property is in an urban municipality or rural municipality.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is the fee based on the market price or government valuation?",
        answer: "Registration fees are calculated based on the official 'Thaili' (minimum government valuation) of the land, which is often lower than the actual market trading price."
      },
      {
        question: "What is the Bagmati Civilization Tax?",
        answer: "Properties located within the Kathmandu Valley are subject to an additional 0.5% Bagmati Civilization Fund tax on top of standard registration fees."
      }
    ]
  },
  'nepal-tds': {
    title: "TDS Calculator Nepal | Tax Deducted at Source",
    description: "Calculate Tax Deducted at Source (TDS) for contracts, rent, consultancy, and dividends according to Nepal's Income Tax Act.",
    content: (
      <>
        <h2>What is Tax Deducted at Source (TDS)?</h2>
        <p>
          TDS is an advance tax collection mechanism utilized by the Inland Revenue Department (IRD). Under the Income Tax Act of Nepal, whenever a business makes a payment for rent, consultancy, or contracts, they must withhold a specific percentage and deposit it directly to the government.
        </p>
        <h3>Common TDS Rates in Nepal</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>Consultancy/Professional Services:</strong> 15% (PAN registered).</li>
          <li><strong>House Rent:</strong> 10% (collected by local municipality).</li>
          <li><strong>Dividends:</strong> 5% final withholding tax.</li>
          <li><strong>Contracts/Procurement:</strong> 1.5% for local goods and services.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What happens if a consultant does not have a PAN?",
        answer: "If a service provider does not provide a PAN (Permanent Account Number), the TDS rate is usually penalized and increased (often to 15% even for standard contracts)."
      },
      {
        question: "Can I claim a refund on TDS?",
        answer: "Yes, TDS is an advance tax. When you file your annual tax return (D03), you can adjust the TDS against your total tax liability, potentially resulting in a tax refund."
      }
    ]
  },
  'nepse-bonus-tax': {
    title: "Bonus Share Tax Calculator | NEPSE Dividends",
    description: "Calculate the exact tax you must pay on bonus shares and cash dividends distributed by Nepalese companies.",
    content: (
      <>
        <h2>Taxation on Dividends in Nepal</h2>
        <p>
          When a company in NEPSE distributes profits to its shareholders, it does so via Cash Dividends or Bonus Shares. In Nepal, these distributions are subject to a 5% final withholding tax.
        </p>
        <h3>The 'Bonus Share Tax Issue'</h3>
        <p>
          When a company issues Bonus Shares (stock dividends) but does not distribute enough Cash Dividend to cover the tax liability, the shareholder is forced to deposit the 5% tax directly into the company's bank account out of their own pocket before the shares are credited to their Demat account.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the tax rate on cash dividends?",
        answer: "Both cash dividends and bonus shares are taxed at a flat rate of 5% in Nepal."
      },
      {
        question: "Why did my Demat account not receive the bonus shares?",
        answer: "If the company did not issue a cash dividend, your bonus shares are frozen until you manually deposit the 5% tax amount into the specific bank account designated by the company's share registrar."
      }
    ]
  },
  'gratuity-calculator': {
    title: "Gratuity Calculator Nepal | Labor Act 2074",
    description: "Calculate your retirement and resignation gratuity benefits according to the provisions of the Nepal Labor Act 2074.",
    content: (
      <>
        <h2>Understanding Gratuity under Labor Act 2074</h2>
        <p>
          In Nepal, Gratuity is a statutory benefit provided by an employer to an employee in gratitude for their continuous service. Following the implementation of the Labor Act 2074 and the Social Security Fund (SSF), the rules for gratuity accumulation have been modernized.
        </p>
        <h3>The 8.33% Rule</h3>
        <p>
          Under current labor laws, employers are required to allocate 8.33% of the employee's basic salary every month toward a Gratuity fund (equivalent to 1 month of basic salary per year). This money must be deposited into the SSF or an approved retirement fund.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Am I eligible for gratuity if I resign?",
        answer: "Yes. Unlike the old Labor Act which required 3 years of continuous service, the new Labor Act 2074 entitles employees to gratuity benefits from the very first month of employment, regardless of resignation or termination."
      },
      {
        question: "Is gratuity taxable in Nepal?",
        answer: "Yes, gratuity payouts are subject to a 15% final withholding tax on the total accumulated interest and profit, handled under retirement fund taxation rules."
      }
    ]
  },
  'foreign-employment': {
    title: "Foreign Employment Fees & Salary Calculator Nepal",
    description: "Check the official DoFE visa fees, manpower service charges, and calculate your exact foreign salary in Nepalese Rupees.",
    content: (
      <>
        <h2>Going Abroad: The Costs of Foreign Employment</h2>
        <p>
          Hundreds of thousands of Nepalese workers travel abroad for employment every year. Unfortunately, many are scammed by unauthorized manpower agencies charging illegal fees. It is crucial to know the official fees set by the Department of Foreign Employment (DoFE).
        </p>
        <h3>The 'Free Visa, Free Ticket' Policy</h3>
        <p>
          For major Gulf countries and Malaysia, the Government of Nepal enforces a "Free Visa, Free Ticket" provision. This means employers must bear the cost of the visa and airfare. Manpower agencies are legally only allowed to charge a maximum service fee of Rs. 10,000 for these destinations.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the cost of the mandatory medical test?",
        answer: "The government-approved rate for the pre-departure medical examination is typically around Rs. 4,500, which is non-refundable."
      },
      {
        question: "How do I calculate my foreign salary into NPR?",
        answer: "Our calculator automatically fetches the daily exchange rate (e.g., Qatari Riyal, UAE Dirham, Malaysian Ringgit) from the Nepal Rastra Bank to convert your basic salary into Nepalese Rupees."
      }
    ]
  },
  'kukl-bill': {
    title: "KUKL Water Bill Calculator | Kathmandu Upatyaka",
    description: "Calculate your monthly KUKL water bill and sewerage tax. Supports both tap connections and metered consumption in Kathmandu.",
    content: (
      <>
        <h2>Calculating Kathmandu's Water Tariffs</h2>
        <p>
          The Kathmandu Upatyaka Khanepani Limited (KUKL) manages water distribution across the Kathmandu Valley. Because water is a scarce resource, KUKL utilizes a tiered tariff structure to discourage waste while maintaining affordable minimums for all households.
        </p>
        <h3>Tap Size and Metering</h3>
        <p>
          Your baseline bill depends heavily on the diameter of your water pipe (e.g., 1/2 inch vs. 3/4 inch). Larger pipes allow for significantly higher water pressure and flow, and therefore have a much higher minimum monthly charge regardless of actual usage.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the sewerage tax?",
        answer: "If your house is connected to the government sewerage system, KUKL automatically adds an additional 50% surcharge to your base water bill to cover wastewater treatment and maintenance."
      },
      {
        question: "What if my meter is broken?",
        answer: "If your meter is damaged, KUKL will bill you based on an estimated average consumption or a flat rate depending on your tap size until the meter is replaced."
      }
    ]
  },
  'nepal-attendance': {
    title: "University Attendance Calculator Nepal | 75% Rule",
    description: "Track your university attendance for TU, KU, and PU. Calculate exactly how many classes you can afford to skip before failing.",
    content: (
      <>
        <h2>The Strict 75% Attendance Rule</h2>
        <p>
          Major universities in Nepal, including Tribhuvan University (TU), Kathmandu University (KU), and Pokhara University (PU), enforce a strict attendance policy. If your total attendance falls below 75% (or 80% for some medical/engineering programs), you will be barred from sitting for final board examinations.
        </p>
        <h3>Strategic Class Bunking</h3>
        <p>
          Our calculator helps you mathematically manage your schedule. If you have an important family event or illness, you can input your total conducted classes and attended classes to see exactly how many upcoming lectures you can safely skip while staying in the safe zone.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do medical leaves work?",
        answer: "Even with a valid doctor's certificate, universities usually only provide a small grace margin (e.g., reducing the requirement to 65%). You cannot miss half the semester, even if sick."
      },
      {
        question: "Do practical labs count?",
        answer: "Yes, and often, practical labs have an even stricter attendance requirement (often 100% or mandatory makeup sessions) compared to theoretical lectures."
      }
    ]
  },
  'see-gpa': {
    title: "SEE GPA Calculator | Secondary Education Examination",
    description: "Calculate your exact SEE GPA based on the latest National Examination Board (NEB) grading system in Nepal.",
    content: (
      <>
        <h2>The NEB Letter Grading System</h2>
        <p>
          The Secondary Education Examination (SEE) is the most critical academic milestone for Nepalese students. The National Examination Board (NEB) transitioned from percentage scores to a Letter Grading system to reduce student stress and align with international academic standards.
        </p>
        <h3>Understanding Grade Points</h3>
        <p>
          Instead of an exact percentage, students are awarded a Grade (A+, A, B+, etc.) and a corresponding Grade Point (4.0, 3.6, 3.2). Your final SEE GPA is the weighted average of these grade points across all your compulsory and optional subjects.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is an 'A+' in the SEE grading system?",
        answer: "An 'A+' (Outstanding) is awarded to students scoring 90% and above in a subject, which translates to a Grade Point of 4.0."
      },
      {
        question: "What happens if I get a 'NG'?",
        answer: "'NG' stands for Not Graded. If you fail to secure the minimum passing marks in the theoretical exam, you will receive an NG and cannot enroll in Class 11 until you pass the supplementary exam."
      }
    ]
  },
  'nepali-date': {
    title: "Nepali Date Converter | BS to AD | AD to BS",
    description: "Convert dates between Bikram Sambat (BS) and Gregorian (AD) instantly. The most accurate Nepali calendar tool.",
    content: (
      <>
        <h2>The Bikram Sambat (BS) Calendar</h2>
        <p>
          Bikram Sambat (BS) is the official solar calendar of Nepal, established by Emperor Vikramaditya. It is approximately 56 years and 8.5 months ahead of the Gregorian (AD) calendar. Understanding how to convert between the two is essential for official documentation, visas, and historical research.
        </p>
        <h3>Why Conversion is Complex</h3>
        <p>
          Unlike the Gregorian calendar where months have a fixed number of days (with February leap years), the Nepali calendar is determined by complex astrological calculations. The number of days in a BS month can vary from 29 to 32 days, and this changes every single year, making manual calculation nearly impossible.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is BS a lunar or solar calendar?",
        answer: "Bikram Sambat is a strictly solar calendar based on ancient Hindu traditions, which is why it stays relatively aligned with the seasons compared to pure lunar calendars."
      },
      {
        question: "How accurate is the date converter?",
        answer: "Our tool relies on official data matrices provided by the Nepal Panchanga Nirnayak Samiti, ensuring 100% precision for historical and future dates."
      }
    ]
  },
  'loan-emi': {
    title: "Universal Loan EMI Calculator | Personal & Auto Loans",
    description: "Calculate standard EMIs for personal loans, auto loans, and education loans. Generate complete repayment schedules and interest charts.",
    content: (
      <>
        <h2>What is an Equated Monthly Installment (EMI)?</h2>
        <p>
          An EMI is the fixed payment amount made by a borrower to a lender on a specific date each calendar month. EMIs are used to pay off both the principal amount and the accrued interest over the lifespan of a loan.
        </p>
        <h3>The Hidden Cost of Long-Term Loans</h3>
        <p>
          While stretching a loan over 10 or 15 years dramatically reduces your monthly EMI, it massively increases the total interest you pay to the bank. Use our tool to compare a 5-year auto loan vs. a 7-year auto loan to see the exact difference in total cost.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does EMI change if interest rates rise?",
        answer: "If you have a fixed-rate loan, your EMI never changes. If you have a floating/variable rate loan, the bank may either increase your EMI amount or extend your loan tenure when rates rise."
      },
      {
        question: "What is a reducing balance method?",
        answer: "It means interest is calculated only on the remaining loan principal. As you pay off the loan, the interest portion of your EMI shrinks, while the principal repayment portion grows."
      }
    ]
  },
  'lead-time': {
    title: "Lead Time & Cycle Time Calculator | Supply Chain",
    description: "Calculate manufacturing lead times, cycle times, and takt time. Optimize your inventory and supply chain management.",
    content: (
      <>
        <h2>Optimizing Your Supply Chain</h2>
        <p>
          In manufacturing and retail, "Lead Time" is the total time elapsed between the placement of an order and the delivery of the finished goods. Reducing lead time is the primary goal of lean manufacturing systems (like Toyota's Just-In-Time model) to minimize warehouse inventory costs.
        </p>
        <h3>Lead Time vs. Cycle Time</h3>
        <p>
          <strong>Lead Time</strong> is measured from the customer's perspective (from order to delivery).
          <br/><strong>Cycle Time</strong> is measured from the factory's perspective (how long it takes to actively produce one unit from start to finish).
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is Takt Time?",
        answer: "Takt time is the maximum acceptable time to meet customer demand. If a customer orders 10 units a day and you work 10 hours, your Takt time is 1 hour per unit."
      },
      {
        question: "How do I account for shipping delays?",
        answer: "When calculating standard lead time for inventory reordering, you should always add a safety margin (buffer time) to account for transit delays or supplier shortages."
      }
    ]
  },
  'pythagorean-theorem': {
    title: "Pythagorean Theorem Calculator | Find the Hypotenuse",
    description: "Instantly solve for the hypotenuse or any side of a right-angled triangle. Essential geometric math tool.",
    content: (
      <>
        <h2>The Most Famous Formula in Geometry</h2>
        <p>
          The Pythagorean Theorem states that in a right-angled triangle, the square of the longest side (the hypotenuse) is equal to the sum of the squares of the other two sides.
        </p>
        <h3>Practical Applications</h3>
        <p>
          While it seems like pure math, a² + b² = c² is used constantly in the real world. Carpenters use it to ensure walls form perfect 90-degree corners (the 3-4-5 rule). Navigators use it to find the shortest straight-line distance between two points on a map.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does the Pythagorean theorem work on any triangle?",
        answer: "No. The theorem strictly applies only to right-angled triangles (where one angle is exactly 90 degrees)."
      },
      {
        question: "What is a Pythagorean Triple?",
        answer: "It is a set of three positive integers that perfectly fit the formula, meaning there are no decimals. The most famous examples are (3, 4, 5) and (5, 12, 13)."
      }
    ]
  },
  'surface-area-calculator': {
    title: "Surface Area Calculator | 3D Geometric Shapes",
    description: "Calculate the total surface area of cylinders, spheres, cones, and rectangular prisms. Vital for manufacturing and design.",
    content: (
      <>
        <h2>What is Surface Area?</h2>
        <p>
          Surface Area is the total area that the surface of a 3D object occupies. Unlike volume (which measures the inside), surface area measures the outside wrapper. If you were wrapping a box in gift paper, the surface area tells you exactly how much paper you need.
        </p>
        <h3>Lateral vs. Total Surface Area</h3>
        <p>
          <strong>Lateral Surface Area</strong> only includes the sides of the object, ignoring the top and bottom bases.
          <br/><strong>Total Surface Area</strong> includes every single face of the object. Our calculator lets you compute both instantly.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do you find the surface area of a cylinder?",
        answer: "The formula is 2πr² (for the top and bottom circles) + 2πrh (for the curved side wrapping around it)."
      },
      {
        question: "Why is surface-area-to-volume ratio important?",
        answer: "In biology and chemistry, a high surface-area-to-volume ratio drastically increases the speed of reactions, heat loss, and cellular absorption."
      }
    ]
  },
  'volume-calculator': {
    title: "Volume Calculator | 3D Space & Liquid Capacity",
    description: "Calculate the volume of spheres, cylinders, cubes, and cones. Convert cubic meters to liters and gallons instantly.",
    content: (
      <>
        <h2>Understanding 3D Volume</h2>
        <p>
          Volume is the quantification of the three-dimensional space enclosed by a closed surface. It determines the holding capacity of an object. If you are filling a swimming pool with water, or pouring concrete for a foundation, volume is the metric you need.
        </p>
        <h3>The Base-Times-Height Rule</h3>
        <p>
          For uniform 3D shapes like cylinders or rectangular prisms, the volume formula is simply the <strong>Area of the Base × Height</strong>. For shapes that taper to a point (like cones and pyramids), you calculate the uniform volume and then divide by 3.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do I convert cubic meters to liters?",
        answer: "One cubic meter (m³) is exactly equal to 1,000 liters. This makes metric conversions incredibly simple."
      },
      {
        question: "What is the formula for the volume of a sphere?",
        answer: "The formula is V = 4/3 × π × r³, where r is the radius from the center of the sphere."
      }
    ]
  },
  'market-rates/live-gold-price': {
    title: "Live Gold Price in Nepal Today | Fine & Tejabi Sun",
    description: "Check the exact, official daily gold rates in Nepal (Fine 24K and Tejabi 22K). Prices synced with the Nepal Gold and Silver Dealers' Association.",
    content: (
      <>
        <h2>The Nepali Gold Market</h2>
        <p>
          In Nepal, gold (Sun) is not just an investment; it is deeply embedded in the culture, particularly during weddings and festivals like Tihar. The daily price is strictly regulated and published every morning at 10:00 AM by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA).
        </p>
        <h3>Tola vs. Gram</h3>
        <p>
          While international markets trade gold in Ounces and Grams, the local Nepalese market still relies heavily on the traditional "Tola" system. One Tola is precisely equal to 11.66 grams.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the difference between Fine Gold and Tejabi Gold?",
        answer: "Fine Gold (Chhapawal) is 24-karat, 99.99% pure gold. Tejabi Gold is 22-karat gold, slightly less pure, mixed with other metals to make it harder for jewelry making, and is therefore slightly cheaper."
      },
      {
        question: "Does the listed price include jewelry making charges (Jarti)?",
        answer: "No. The published FENEGOSIDA price is only the raw material cost. Jewelers will add Jarti (wastage) and making charges on top of this base price when you buy a finished ornament."
      }
    ]
  },
  'market-rates/remittance': {
    title: "Nepal Remittance Board | Compare Live Money Transfer Rates",
    description: "Compare real-time exchange rates from top remit companies (IME, Western Union, Prabhu) for sending money to Nepal from abroad.",
    content: (
      <>
        <h2>Maximizing Your Remittance to Nepal</h2>
        <p>
          Remittance forms the backbone of Nepal's economy. When sending money home from the Gulf, Malaysia, USA, or Australia, the exchange rate offered by different money transfer operators can vary wildly. A seemingly small difference in the rate can result in thousands of missing Rupees.
        </p>
        <h3>Exchange Rate vs. Transfer Fees</h3>
        <p>
          Always look at the total "Landed Cost." A remit company might offer a phenomenally high exchange rate, but charge a massive flat fee for the transfer. Conversely, some offer "zero-fee" transfers but hide their profit in a terrible exchange rate.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is it better to send money to a bank account or for cash pickup?",
        answer: "Direct bank account transfers generally offer slightly better exchange rates and lower fees compared to instant cash pickup services."
      },
      {
        question: "Are remittance exchange rates updated daily?",
        answer: "Yes, remittance rates are highly volatile and are updated multiple times a day based on the international forex market and the Nepal Rastra Bank guidelines."
      }
    ]
  },
  'market-rates/exchange-rate': {
    title: "Live Foreign Exchange Rates Nepal | USD, AUD, INR to NPR",
    description: "View real-time, official Nepal Rastra Bank (NRB) foreign exchange reference rates for USD, AUD, EUR, and GBP to Nepalese Rupees.",
    content: (
      <>
        <h2>Nepal Rastra Bank (NRB) Official Rates</h2>
        <p>
          The value of the Nepalese Rupee (NPR) fluctuates daily against major global currencies. The Nepal Rastra Bank (NRB) publishes the official reference exchange rate every morning, which dictates the rates used by commercial banks and customs offices.
        </p>
        <h3>The INR-NPR Peg</h3>
        <p>
          Unlike other currencies, the Nepalese Rupee is permanently pegged to the Indian Rupee (INR) at a fixed rate of 1 INR = 1.60 NPR. Therefore, whenever the Indian Rupee strengthens or weakens against the US Dollar, the Nepalese Rupee automatically follows suit.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the difference between the Buying Rate and Selling Rate?",
        answer: "The Buying Rate is what the bank will pay YOU if you give them foreign currency. The Selling Rate is what the bank charges YOU if you want to buy foreign currency from them."
      },
      {
        question: "Can I get the exact NRB rate at a money exchange counter?",
        answer: "No. Money changers and commercial banks add their own spread (profit margin) on top of the NRB reference rate."
      }
    ]
  },
  'market-rates/live-silver-price': {
    title: "Live Silver Price in Nepal | Chandi Rates Today",
    description: "Check the official daily Silver (Chandi) rates in Nepal per Tola and per Gram, authorized by FENEGOSIDA.",
    content: (
      <>
        <h2>The Silver (Chandi) Market in Nepal</h2>
        <p>
          Silver (locally known as Chandi) is heavily used in Nepal for traditional jewelry, religious idols, and utensils for pooja. Just like gold, the price of silver is standardized daily across the country by the Federation of Nepal Gold and Silver Dealers' Association.
        </p>
        <h3>Silver as an Investment</h3>
        <p>
          While gold is the primary precious metal investment, silver offers a lower barrier to entry. However, silver is highly volatile and is heavily influenced by industrial demand alongside investment demand.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Is the price of silver the same across all of Nepal?",
        answer: "The base price of raw silver is uniform. However, local jewelers may adjust making charges depending on the region and the complexity of the jewelry design."
      },
      {
        question: "How many grams are in one Tola of Silver?",
        answer: "Just like gold, one Tola of silver is equal to 11.66 grams."
      }
    ]
  },
  'bmi-child': {
    title: "Child BMI Percentile Calculator | Pediatric Growth",
    description: "Calculate your child's BMI percentile accurately based on CDC and WHO growth charts for age and gender.",
    content: (
      <>
        <h2>Why Child BMI is Calculated Differently</h2>
        <p>
          You cannot use a standard adult BMI calculator for children or teenagers. Because children are constantly growing, their body fat composition changes significantly with age and differs entirely between boys and girls.
        </p>
        <h3>Understanding Percentiles</h3>
        <p>
          Child BMI is expressed as a "Percentile" rather than a raw number. If your child is in the 75th percentile, it means their BMI is higher than 75% of children of the exact same age and biological sex.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is considered a healthy percentile range for a child?",
        answer: "A healthy weight is typically defined as falling between the 5th and 85th percentiles on the CDC growth charts."
      },
      {
        question: "Is BMI accurate for athletic teenagers?",
        answer: "Like adults, heavily muscular teens may have a high BMI that categorizes them as overweight, even if their body fat is very low. Always consult a pediatrician for a full assessment."
      }
    ]
  },
  'sleep': {
    title: "Sleep Cycle Calculator | Find Your Optimal Wake Time",
    description: "Calculate the exact time you should go to bed or wake up to avoid grogginess. Based on 90-minute human REM sleep cycles.",
    content: (
      <>
        <h2>The Science of Sleep Cycles</h2>
        <p>
          Human sleep is not uniform; it consists of 90-minute cycles transitioning between light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. If your alarm clock wakes you up right in the middle of deep sleep, you will experience "sleep inertia"—that heavy, groggy feeling that ruins your morning.
        </p>
        <h3>Timing is Better Than Duration</h3>
        <p>
          Getting exactly 7.5 hours of sleep (5 full cycles) or even 6 hours of sleep (4 full cycles) will often leave you feeling far more refreshed than getting 8 hours of sleep and waking up mid-cycle.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How long does it take the average person to fall asleep?",
        answer: "It takes the average human about 14 to 20 minutes to fall asleep. Our calculator automatically factors this buffer time into your bedtime."
      },
      {
        question: "What is the optimal number of sleep cycles per night?",
        answer: "Most adults need 5 full sleep cycles (about 7.5 hours) per night to achieve optimal cognitive performance."
      }
    ]
  },
  'momo-calorie-counter': {
    title: "Momo Calorie Counter | Nepalese Food Nutrition",
    description: "Calculate the exact calories and macros in your plate of Momo (Chicken, Buff, Veg). Don't break your diet in Kathmandu!",
    content: (
      <>
        <h2>The Caloric Cost of Nepal's Favorite Food</h2>
        <p>
          Momo is the undisputed king of Nepalese street food. However, if you are tracking your macros or trying to lose weight, a quick plate of Jhol Momo can quietly destroy your daily caloric deficit.
        </p>
        <h3>Steamed vs. Fried (Kothey / C)</h3>
        <p>
          A standard steamed chicken momo has about 35-40 calories. However, deep-frying the momo or tossing it in a heavy, oil-based 'C-Momo' chili sauce can easily double the caloric density of the dish.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Which type of momo has the lowest calories?",
        answer: "Steamed vegetable momo (filled primarily with cabbage and carrots) is the lowest in calories, typically hovering around 25-30 calories per piece."
      },
      {
        question: "Does the Momo Achar (Sauce) add a lot of calories?",
        answer: "Yes! While tomato-based achars are relatively light, peanut-based or heavy oil-based sauces can add an extra 100-200 calories to your meal."
      }
    ]
  },
  'solar-requirement': {
    title: "Solar Panel & Inverter Calculator | Home Load Capacity",
    description: "Calculate the total wattage required for your home. Size your solar panels, battery bank, and inverter accurately.",
    content: (
      <>
        <h2>Sizing a Home Solar System</h2>
        <p>
          With unpredictable grid reliability, moving to solar power is highly beneficial. However, installing a system that is too small will leave you in the dark, and installing one that is too large wastes money. You must calculate your exact total watt-hour load.
        </p>
        <h3>The Battery Bank Factor</h3>
        <p>
          Solar panels only generate power during the day. If you plan to run heavy appliances (like a fridge or TV) at night, your battery bank must have enough Amp-Hour (Ah) capacity to store the day's energy and discharge it safely without dropping below 50% depth-of-discharge.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do I calculate my daily energy consumption?",
        answer: "Multiply the wattage of each appliance by the number of hours you run it per day. Add them all together to get your total daily Watt-Hours."
      },
      {
        question: "What is an inverter's continuous rating vs. surge rating?",
        answer: "Continuous rating is what the inverter can handle indefinitely. Surge rating is the massive, momentary spike of power required to start a motor (like a water pump or refrigerator)."
      }
    ]
  },
  'paint-cost': {
    title: "House Painting Cost & Volume Calculator",
    description: "Estimate exactly how many liters of paint you need for a room or house. Calculate total costs based on primer, coats, and square footage.",
    content: (
      <>
        <h2>Never Overbuy Paint Again</h2>
        <p>
          Buying too much paint is a waste of money, but running out of paint halfway through a wall leads to inconsistent color matching. By calculating the exact square footage of your walls (and subtracting windows and doors), you can purchase the perfect volume.
        </p>
        <h3>Understanding Coverage Rates</h3>
        <p>
          A standard liter of interior latex paint typically covers about 10 to 12 square meters for a single coat. However, highly textured walls or porous drywall might require a heavy layer of primer first to prevent the paint from soaking in.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How many coats of paint are necessary?",
        answer: "For most interior walls, especially if changing colors, you will need one coat of primer and two coats of the finish paint for an even, durable look."
      },
      {
        question: "Do I need to paint the ceiling?",
        answer: "Ceilings require specific 'ceiling paint' which is designed to scatter light and hide imperfections, and it usually requires separate volume calculations."
      }
    ]
  },
  'word-counter': {
    title: "Advanced Word & Character Counter | Reading Time",
    description: "Instantly count words, characters (with/without spaces), paragraphs, and estimate reading time for essays and SEO articles.",
    content: (
      <>
        <h2>The Importance of Word Counts</h2>
        <p>
          Whether you are writing a 500-word university essay, a 280-character tweet, or a 2000-word SEO-optimized blog post, hitting exact length constraints is crucial. Our tool provides instantaneous, real-time metrics as you paste or type your text.
        </p>
        <h3>Characters with vs. without Spaces</h3>
        <p>
          Many government forms, SMS gateways, and API limits count absolute characters (including the blank spaces between words). Our tool separates these metrics so you never exceed strict database or form limits.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How is reading time calculated?",
        answer: "We estimate reading time based on the universal average reading speed of an adult, which is roughly 200 to 250 words per minute."
      },
      {
        question: "Does the tool store my text?",
        answer: "No. All counting is done locally in your browser using JavaScript. We do not upload or save your sensitive documents to our servers."
      }
    ]
  },
  'length-converter': {
    title: "Length & Distance Converter | Meters, Feet, Miles",
    description: "Convert length and distance instantly between metric and imperial units. Convert kilometers to miles, meters to feet, and centimeters to inches.",
    content: (
      <>
        <h2>The Two Measurement Systems</h2>
        <p>
          Navigating between the Metric system (used by 95% of the world) and the Imperial system (used primarily by the US) is a daily necessity in engineering, construction, and travel. Our tool provides instantaneous, high-precision conversions.
        </p>
        <h3>Common Conversion Factors</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>1 Mile</strong> = 1.60934 Kilometers</li>
          <li><strong>1 Meter</strong> = 3.28084 Feet</li>
          <li><strong>1 Inch</strong> = 2.54 Centimeters</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What is a nautical mile?",
        answer: "A nautical mile is based on the circumference of the earth, equal to one minute of latitude. It is slightly longer than a standard (statute) mile, measuring exactly 1.852 kilometers."
      },
      {
        question: "How accurate is the conversion?",
        answer: "Our converter uses standard international scientific conversion factors, providing accuracy up to 6 decimal places."
      }
    ]
  },
  'date-duration': {
    title: "Date Duration Calculator | Days Between Dates",
    description: "Calculate the exact number of days, months, and years between two calendar dates. Perfect for contract lengths, project timelines, and visa tracking.",
    content: (
      <>
        <h2>Why Calculate Date Durations?</h2>
        <p>
          Whether you are tracking the remaining validity of a passport, calculating a project deadline, or counting down to a major life event, calculating the exact time delta between two dates manually is error-prone due to leap years and varying month lengths.
        </p>
        <h3>Inclusive vs. Exclusive Dates</h3>
        <p>
          When calculating duration, you must decide whether to "include the end date." For example, if a hotel booking is from Monday to Wednesday, it is mathematically 2 days duration, but you are physically there for parts of 3 calendar days.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does the calculator account for Leap Years?",
        answer: "Yes, our algorithm automatically detects leap years and adds the extra day (February 29th) into the duration calculation when applicable."
      },
      {
        question: "Can I subtract dates to find a past date?",
        answer: "Yes, you can input a negative duration (e.g., 'subtract 90 days from today') to instantly find a specific past calendar date."
      }
    ]
  },
  'age-calculator': {
    title: "Exact Age Calculator | Chronological Age in Years & Days",
    description: "Calculate your exact age down to the day. Find out how many months, weeks, and days you have been alive based on your date of birth.",
    content: (
      <>
        <h2>Calculating Chronological Age</h2>
        <p>
          While most people know their age in years, many official documents (like pediatric medical records, visa applications, and life insurance policies) require your exact chronological age in months or days at the time of application.
        </p>
        <h3>The Mathematics of Aging</h3>
        <p>
          Because months vary from 28 to 31 days and leap years shift the calendar, simply dividing your age in days by 365 will not give an accurate result. Our calculator uses precise native Date objects to compute the exact biological delta from your birthdate to today.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How is a 'half birthday' calculated?",
        answer: "A half birthday is exactly 6 months from your birth date. If you were born on January 15th, your half birthday is July 15th."
      },
      {
        question: "Is my age calculated differently in some cultures?",
        answer: "Yes. In the traditional East Asian age reckoning system (like in Korea historically), you are considered 1 year old at birth, and you gain a year every New Year's Day, rather than on your birthday."
      }
    ]
  },
  'qr-generator': {
    title: "Free QR Code Generator | Make Custom QR Codes",
    description: "Generate high-density, machine-readable QR codes for URLs, text, WiFi passwords, and contact cards instantly and for free.",
    content: (
      <>
        <h2>The Power of Quick Response (QR) Codes</h2>
        <p>
          QR codes are 2D matrix barcodes that can store massive amounts of data compared to traditional 1D barcodes. They are read instantly by smartphone cameras, bridging the physical world with the digital world.
        </p>
        <h3>Error Correction Levels</h3>
        <p>
          Our generator utilizes Reed-Solomon error correction. This means that even if a part of your QR code is damaged, dirty, or covered by a logo, a smartphone camera can still perfectly reconstruct the data and scan the code successfully.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Do QR codes expire?",
        answer: "No, a standard 'static' QR code contains the actual data embedded in its pixels. It will never expire as long as the destination URL or text remains active."
      },
      {
        question: "Can I put a WiFi password in a QR code?",
        answer: "Yes! You can generate a specific WiFi QR code. When someone scans it with their phone camera, it will automatically connect them to your network without needing to type the password."
      }
    ]
  },
  'number-to-words': {
    title: "Number to Words Converter | Check Writing Utility",
    description: "Convert large numerical integers (e.g., 1,500) into written English words (One Thousand Five Hundred). Essential for writing checks and legal contracts.",
    content: (
      <>
        <h2>Why Convert Numbers to Words?</h2>
        <p>
          In the financial and legal sectors, simply writing "Rs. 1,000,000" on a contract or a check is dangerous, as a single extra zero can change the value dramatically. Writing the number in full text ("One Million Rupees") prevents tampering and ensures absolute clarity.
        </p>
        <h3>Millions vs. Lakhs/Crores</h3>
        <p>
          The International numbering system groups numbers by thousands (Thousands, Millions, Billions). The South Asian numbering system (used in Nepal and India) groups by hundreds after the first thousand (Lakhs, Crores). Our tool supports standard international formatting.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How do you write out decimals on a check?",
        answer: "Usually, decimals are written as fractions of 100. For example, Rs. 150.50 is written as 'One Hundred Fifty and 50/100'."
      },
      {
        question: "What is the biggest number the tool can convert?",
        answer: "Our engine can safely convert numbers up into the trillions without losing precision."
      }
    ]
  },
  'password-generator': {
    title: "Secure Password Generator | Cryptographic Random Strings",
    description: "Generate highly secure, randomized passwords utilizing uppercase, lowercase, numbers, and special symbols to defeat brute-force attacks.",
    content: (
      <>
        <h2>The Danger of Weak Passwords</h2>
        <p>
          Using dictionary words, birth dates, or sequential numbers (like 'password123') makes your accounts highly vulnerable to "dictionary attacks" and "brute-force" botnets. A strong password must be long, complex, and completely unpredictable.
        </p>
        <h3>Length over Complexity</h3>
        <p>
          In modern cybersecurity, the length of the password is often more important than the complexity. A 16-character password using only lowercase letters is mathematically harder for a computer to crack than an 8-character password using symbols and numbers.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Does this tool save my generated passwords?",
        answer: "Absolutely not. All passwords are generated locally on your device using your browser's secure crypto random number generator. Nothing is ever sent to a server."
      },
      {
        question: "How often should I change my password?",
        answer: "Modern security guidelines recommend changing your password immediately if there is a known data breach, rather than changing it on an arbitrary schedule (which often leads to people picking weaker, easier-to-remember passwords)."
      }
    ]
  },
  'concrete-mix': {
    title: "Concrete Mix Calculator | Volume & Material Estimator",
    description: "Calculate exactly how much cement, sand, and aggregate (gravel) you need for your construction project based on the mix ratio.",
    content: (
      <>
        <h2>Understanding Concrete Mix Ratios</h2>
        <p>
          Concrete is not just cement; it is a composite material made of a binder (cement), fine aggregate (sand), and coarse aggregate (gravel/stones) mixed with water. The strength of the concrete depends entirely on the ratio of these materials.
        </p>
        <h3>Common Mix Grades</h3>
        <ul className="text-sm mt-2 text-[#5f6368] space-y-1 pl-4 list-disc">
          <li><strong>M15 (1:2:4):</strong> Used for normal, non-load-bearing foundation work.</li>
          <li><strong>M20 (1:1.5:3):</strong> The standard mix for house slabs, columns, and beams.</li>
          <li><strong>M25 (1:1:2):</strong> High strength mix for heavy-duty load-bearing structures.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What is the 'Dry Volume' multiplier?",
        answer: "When water is added to dry cement, sand, and gravel, the mixture shrinks. Therefore, you must multiply your calculated 'wet volume' by 1.54 to find the actual 'dry volume' of raw materials you need to purchase."
      },
      {
        question: "How many bags of cement are in a cubic meter?",
        answer: "One standard 50kg bag of cement has a volume of approximately 0.0347 cubic meters. Therefore, roughly 28.8 bags of cement make up one cubic meter."
      }
    ]
  },
  'brick-calculator': {
    title: "Brick Calculator | Estimate Wall Construction Materials",
    description: "Calculate the total number of bricks required to build a wall. Accurately factors in mortar joint thickness and wall dimensions.",
    content: (
      <>
        <h2>Estimating Brickwork Quantities</h2>
        <p>
          Before beginning masonry work, you must estimate the number of bricks required to avoid multiple delivery fees or running short mid-project. Because a wall is not just bricks—it includes the mortar holding them together—simple division won't work.
        </p>
        <h3>The Importance of Mortar Joints</h3>
        <p>
          A standard mortar joint is typically 10mm thick. This means that a standard 230x110x70mm brick actually occupies 240x120x80mm of space in the wall. Our calculator automatically adjusts the volume to account for this mortar space.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Should I buy extra bricks for wastage?",
        answer: "Yes. Due to breakage during transport, cutting bricks for edges, and general construction waste, it is an industry standard to add a 5% to 10% wastage allowance to your final calculated number."
      },
      {
        question: "Does the calculator account for windows and doors?",
        answer: "To get an accurate result, you must subtract the square footage of any windows, doors, or open arches from the total area of the wall before calculating the brick count."
      }
    ]
  },
  'chemistry-molar': {
    title: "Molar Mass Calculator | Molecular Weight Finder",
    description: "Calculate the exact molar mass and molecular weight of any chemical compound. Essential chemistry tool for students and lab technicians.",
    content: (
      <>
        <h2>What is Molar Mass?</h2>
        <p>
          Molar mass is a physical property defined as the mass of a given substance (chemical element or chemical compound) divided by the amount of substance. It is essentially the weight of one 'mole' (Avogadro's number: 6.022 × 10²³) of molecules of that substance, typically expressed in grams per mole (g/mol).
        </p>
        <h3>How to Compute It</h3>
        <p>
          To find the molar mass of Water (H₂O), you look at the periodic table:
          <br/>Hydrogen (H) = 1.008 g/mol × 2 atoms = 2.016
          <br/>Oxygen (O) = 15.999 g/mol × 1 atom = 15.999
          <br/><strong>Total Molar Mass of H₂O = 18.015 g/mol</strong>
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the difference between Molar Mass and Molecular Weight?",
        answer: "In practical chemistry, they are used interchangeably and have the same numerical value. However, strictly speaking, molecular weight is a dimensionless quantity (relative to Carbon-12), while molar mass has units (g/mol)."
      },
      {
        question: "Does the calculator support complex bracketed formulas?",
        answer: "Yes, standard parsers can handle nested compounds like Iron(III) Sulfate: Fe2(SO4)3 by multiplying the subscript values accordingly."
      }
    ]
  },
  'linear-solver': {
    title: "Linear Equations Solver | Algebra Systems",
    description: "Solve systems of simultaneous linear equations instantly. Supports multiple variables (x, y, z) using matrix substitution and elimination.",
    content: (
      <>
        <h2>Solving Simultaneous Equations</h2>
        <p>
          A linear equation is an equation for a straight line. When you have two or more unknown variables (like x and y), you need multiple intersecting lines to find the exact point where they meet. This is the foundation of linear algebra.
        </p>
        <h3>Cramer's Rule and Matrix Math</h3>
        <p>
          While simple 2-variable equations can be solved using substitution, solving a system of 3 or 4 variables (x, y, z, w) manually is incredibly tedious. Our calculator uses advanced matrix determinant logic (like Cramer's Rule or Gaussian elimination) to find the precise floating-point roots instantly.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What does it mean if the equations have 'no solution'?",
        answer: "If the calculator returns 'no solution', it means the lines are perfectly parallel and will never intersect (e.g., 2x + y = 5 and 4x + 2y = 20)."
      },
      {
        question: "What if there are 'infinite solutions'?",
        answer: "This happens when both equations actually describe the exact same line, meaning they intersect at every single point."
      }
    ]
  }
};
