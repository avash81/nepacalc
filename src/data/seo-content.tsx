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

        <h2>Who should use this calculator?</h2>
        <p>
          This tool is essential for salaried employees in Nepal, business owners calculating their personal income tax, and HR professionals managing payroll. It accounts for Social Security Fund (SSF) contributions, which can waive the initial 1% tax, and provides a 10% rebate for female taxpayers on their final tax amount.
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
        <h2>Annual Vehicle Tax in Nepal (2081/82 Update)</h2>
        <p>
          Every vehicle owner in Nepal must pay an annual tax to the provincial government to renew their bluebook. The tax amount depends on the vehicle type, engine capacity (CC), and the province where the vehicle is registered (e.g., Bagmati, Gandaki, Lumbini).
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
  }
};
