import React from 'react';

interface SEOContent {
  title: string;
  description: string;
  howToUse?: { steps: string[] };
  formula?: {
    title: string;
    description: string;
    latex?: string;
    raw?: string;
  };
  content: React.ReactNode;
  faqs?: { question: string; answer: string }[];
}

export const TIER1_SEO_CONTENT: Record<string, SEOContent> = {
  'nepal-land': {
    title: "Nepal Land Area Converter | Ropani, Bigha, Square Feet",
    description: "Convert land measurements across all Nepalese and International units including Ropani, Bigha, Aana, Kattha, and Sq Ft. Precise Malpot-grade conversions for Kathmandu and Terai.",
    howToUse: {
      steps: [
        "Select Region: Choose the Hilly/Valley (Ropani) or Terai (Bigha) system.",
        "Enter Units: Input your land measurement in Aana, Kattha, or Square Feet.",
        "Analyze Conversion: View the instant conversion across all Nepali and international units.",
        "Check Malpot Value: Use the output for official documentation and property valuation."
      ]
    },
    formula: {
      title: "Land Conversion Formulas",
      description: "Nepal uses two distinct measurement systems based on geography: the Ropani system for the Hills/Valleys and the Bigha system for the Terai.",
      raw: "1 Ropani = 16 Aana = 64 Paisa = 256 Daam\n1 Bigha = 20 Kattha = 400 Dhur"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Nepal Land Measurement & Real Estate</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Real Estate Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#land-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Ropani vs. Bigha (Hilly vs. Terai)</a>
            <a href="#land-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Square Feet to Daam Precision</a>
            <a href="#land-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> The Malpot "Minimum Valuation"</a>
            <a href="#land-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Registration Fee Structure (Wada/Malpot)</a>
            <a href="#land-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Sifarish & Documentation Flow</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Real estate is the most popular investment in Nepal. However, the complexity of dual measurement systems (Ropani vs. Bigha) and 'Daam' level precision often leads to calculation errors. Whether you are buying a plot in Kathmandu or selling land in Chitwan, our <a href="/calculator/loan-emi/" className="text-[#1a73e8] font-bold hover:underline">Loan EMI Tool</a> can help you plan your property finance once you have verified the area.
        </p>

        <div className="space-y-6">
          <section id="land-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The Ropani vs. Bigha Divide</h3>
            <p className="text-sm text-[#5f6368] mb-3">Nepal's geography dictates its measurement. In Kathmandu and the Hills, we use Ropani. In the Terai, we use Bigha.</p>
            <div className="overflow-hidden rounded-xl border border-[#dadce0]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                  <tr><th className="p-3">Hilly System (Ropani)</th><th className="p-3">Terai System (Bigha)</th></tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  <tr><td className="p-3">1 Ropani = 16 Aana</td><td className="p-3">1 Bigha = 20 Kattha</td></tr>
                  <tr><td className="p-3">1 Aana = 4 Paisa</td><td className="p-3">1 Kattha = 20 Dhur</td></tr>
                  <tr><td className="p-3">1 Paisa = 4 Daam</td><td className="p-3">1 Dhur = 182.25 Sq Ft</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="land-3">
             <h3 className="text-base font-bold text-[#202124] mb-2">3. The Malpot "Minimum Valuation"</h3>
             <p className="text-sm text-[#5f6368] leading-relaxed">The Land Revenue Office (Malpot) publishes a minimum valuation for every road and street in Nepal. Your government registration fee (Lekhapadi) and Capital Gains Tax (CGT) are calculated based on this valuation, even if the actual transaction price is higher.</p>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "How many square feet are in 1 Aana?", answer: "1 Aana is exactly 342.25 square feet." },
      { question: "Is the measurement system same in Kathmandu and Pokhara?", answer: "Yes, both cities follow the Hilly/Ropani system of measurement." },
      { question: "What is the smallest unit of land in Nepal?", answer: "In the Ropani system, it is 'Daam' (approx. 21.39 sq ft). In the Bigha system, it is 'Dhur' (approx. 182.25 sq ft)." }
    ]
  },

  'income-tax': {
    title: "Income Tax Calculator Nepal 2081/82 | Official Slab Audit",
    description: "Calculate your Nepal personal income tax (PIT) for FY 2081/82. Includes progressive slabs, SSF exemptions, CIT deductions, and female tax rebates. Updated with latest IRD budgets.",
    howToUse: {
      steps: [
        "Select Year: Choose FY 2081/82 (Latest) or previous cycles.",
        "Filing Status: Toggle between 'Single' and 'Married' for threshold auditing.",
        "Input Income: Enter your total annual gross income including bonuses.",
        "Define Deductions: Account for CIT, SSF, and Insurance premiums.",
        "Review Audit: Analyze the slab-wise breakdown and net tax payable."
      ]
    },
    formula: {
      title: "Progressive Slab Algorithm",
      description: "Nepal uses a progressive tax model where marginal income is taxed at increasing rates (1%, 10%, 20%, 30%, 36%) rather than a flat rate on the total.",
      raw: "Tax = Σ (Income_in_Slab_i × Rate_i)"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Institutional Guide to Income Tax in Nepal (FY 2081/82)</h2>
        
        <div className="bg-[#E8F0FE] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Tax Architecture Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
             <a href="#tax-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Latest Tax Slabs (2081/82)</a>
             <a href="#tax-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> CIT & SSF Deductions</a>
             <a href="#tax-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Female Tax Rebate (10%)</a>
             <a href="#tax-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Dashain Bonus Taxation</a>
             <a href="#tax-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Progressive Tax Theory</a>
             <a href="#tax-10" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>10.</span> IRD Filing Deadlines</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Navigating the Inland Revenue Department (IRD) protocols requires precision. Whether you are a salaried professional or a consultant, understanding how progressive tax slabs affect your take-home pay is vital. This guide provides the institutional depth needed to audit your payroll with professional accuracy.
        </p>

        <div className="space-y-6">
          <section id="tax-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. Official Tax Slabs (FY 2081/82)</h3>
            <p className="text-sm text-[#5f6368] mb-3">The current budget has maintained the slabs from the previous cycle. Note the difference between Single and Married filing status.</p>
            <div className="overflow-hidden rounded-xl border border-[#DADCE0] shadow-sm">
               <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                     <tr>
                        <th className="p-3 font-bold text-[#202124]">Tax Rate</th>
                        <th className="p-3 font-bold text-[#202124]">Single Status</th>
                        <th className="p-3 font-bold text-[#202124]">Married Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                     <tr className="hover:bg-[#F8F9FA] transition-colors">
                        <td className="p-3 font-medium text-[#188038]">1% (SST)</td>
                        <td className="p-3 text-[#5F6368]">First Rs. 5,00,000</td>
                        <td className="p-3 text-[#5F6368]">First Rs. 6,00,000</td>
                     </tr>
                     <tr className="hover:bg-[#F8F9FA] transition-colors">
                        <td className="p-3 font-medium text-[#1a73e8]">10%</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 2,00,000</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 2,00,000</td>
                     </tr>
                     <tr className="hover:bg-[#F8F9FA] transition-colors">
                        <td className="p-3 font-medium text-[#F29900]">20%</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 3,00,000</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 3,00,000</td>
                     </tr>
                     <tr className="hover:bg-[#F8F9FA] transition-colors">
                        <td className="p-3 font-medium text-[#D93025]">30%</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 10,00,000</td>
                        <td className="p-3 text-[#5F6368]">Next Rs. 9,00,000</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </section>

          <section id="section-5">
            <h3 className="text-base font-bold text-[#202124] mb-2">5. Understanding Progressive Tax Theory</h3>
            <p className="text-sm text-[#5f6368] mb-2">A common misconception is that if you enter the 30% slab, your *entire* income is taxed at 30%. This is false.</p>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl flex gap-3 items-start">
               <span className="text-base shrink-0">💡</span>
               <p className="text-xs text-[#3c4043] mb-0">Your income is like a series of buckets. Only the money that "overflows" into the higher bucket gets taxed at the higher rate. The money in the lower buckets remains taxed at 1%, 10%, and 20%.</p>
            </div>
          </section>

          <section id="section-10">
            <h3 className="text-base font-bold text-[#202124] mb-2">10. Institutional Workflow & Filing Deadlines</h3>
            <p className="text-sm text-[#5f6368] mb-2">Failing to file your tax return (D-01/D-03) can lead to penalties and interest. Follow this institutional cycle:</p>
            <ul className="space-y-2 text-xs text-[#3c4043] list-none p-0">
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Ashwin End:</strong> Deadline for filing the previous year's tax return.</li>
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>TDS Filing:</strong> Must be done within 25 days of the following month.</li>
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Official IRD Portals:</strong> Use the [Taxpayer Portal](https://ird.gov.np) for online submissions.</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating your tax, audit your monthly take-home on the <a href="/calculator/nepal-salary/" className="text-[#1a73e8] font-bold hover:underline">Salary Calculator</a> or plan property wealth with the <a href="/calculator/nepal-land/" className="text-[#1a73e8] font-bold hover:underline">Land Area Converter</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Is the 1% SST mandatory for everyone?", answer: "Yes, it is mandatory for all employment income, but it is waived if you are an active contributor to the Social Security Fund (SSF)." },
      { question: "Can a married couple file as single?", answer: "Yes. In Nepal, couples have the option to file as 'Married' (Joint) to get a higher tax-free ceiling (Rs. 6L vs 5L), or as 'Single' if it is mathematically more advantageous." },
      { question: "What is the tax on a Dashain Bonus?", answer: "Bonuses and allowances are added to your total annual income. They are not taxed separately but are taxed at your highest applicable slab rate." },
      { question: "Are medical expenses tax-deductible?", answer: "Yes, you can claim a medical tax credit of 15% of the approved medical expenses or Rs. 750, whichever is lower. This is a direct credit from your tax payable." }
    ]
  },

  'sip-calculator': {
    title: "SIP Calculator Nepal 2081/82 | Institutional Wealth Architect",
    description: "The definitive systematic investment laboratory for Nepal. Project your mutual fund growth using SEBON-standard annuity-due protocols and inflation-adjusted step-up logic.",
    howToUse: {
      steps: [
        "Principal Allocation: Input your fixed monthly SIP commitment in NPR.",
        "Yield Expectation: Define the projected annual return rate based on fund category.",
        "Maturity Horizon: Select the total duration for capital accumulation in years.",
        "Step-Up Logic: Enter the annual percentage for contribution acceleration.",
        "Institutional Audit: Review the final corpus, multiplier, and historical trajectory."
      ]
    },
    formula: {
      title: "Annuity-Due Compounding Architecture",
      description: "NepaCalc utilizes the sovereign-grade Future Value of Annuity Due formula. For portfolios with Step-Up logic, the engine executes a recurring annual recalibration of the principal 'P' before applying monthly discrete compounding cycles.",
      latex: "FV = P \\times \\left(\\frac{(1 + r)^n - 1}{r}\\right) \\times (1 + r)"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Institutional Encyclopedia of SIP and Capital Accumulation in Nepal</h2>
        
        <div className="bg-[#E8F0FE] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Wealth Architecture Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
             <a href="#sip-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The Geometric Series of Wealth</a>
             <a href="#sip-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> NEPSE Volatility & NAV Arbitrage</a>
             <a href="#sip-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Rupee Cost Averaging (RCA) Protocol</a>
             <a href="#sip-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Step-Up: The Inflation Neutralization Strategy</a>
             <a href="#sip-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> The 3 Lifecycle Epochs of an SIP</a>
             <a href="#sip-6" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>6.</span> Institutional Discipline Benchmarks</a>
             <a href="#sip-7" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>7.</span> Open-Ended Structural Advantages</a>
             <a href="#sip-8" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>8.</span> DRP: Dividend Reinvestment Mechanics</a>
             <a href="#sip-9" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>9.</span> Behavioral Finance: Eliminating Exit Bias</a>
             <a href="#sip-10" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>10.</span> The Sovereign Onboarding Framework</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Deploying a Systematic Investment Plan (SIP) within the Nepalese capital market is a sophisticated act of wealth engineering. Whether your objective is retirement security, educational endowments, or a post-career Systematic Withdrawal Plan (SWP), the compounding velocity of an SIP remains the most efficient vehicle for capital growth. This guide provides the institutional depth required to navigate SEBON-regulated fund dynamics and IRD tax protocols with professional precision.
        </p>

        <div className="space-y-6">
          <section id="sip-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The Geometric Series: Mathematical Foundations of SIP</h3>
            <p className="text-sm text-[#5f6368] mb-3">Capital growth in an SIP is not linear; it is a discrete geometric progression. Understanding the underlying logic is essential for realistic long-term forecasting.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="border border-[#DADCE0] rounded-xl p-4 bg-white shadow-sm">
                  <h4 className="text-[10px] font-bold text-[#1A73E8] uppercase mb-2">A. THE ANNUITY-DUE AXIOM</h4>
                  <p className="text-[11px] text-[#5F6368] mb-3 leading-relaxed">Calculates the future value when payments occur at the start of each month, allowing for immediate interest accrual within the current period.</p>
                  <div className="border border-[#DADCE0] rounded-lg p-3 text-center bg-[#F8F9FA]">
                     <code className="text-[#1A73E8] font-bold text-xs">FV = P × [((1+r)^n - 1) / r] × (1+r)</code>
                  </div>
               </div>
               <div className="border border-[#DADCE0] rounded-xl p-4 bg-white shadow-sm">
                  <h4 className="text-[10px] font-bold text-[#188038] uppercase mb-2">B. COMPOUNDING VELOCITY</h4>
                  <p className="text-[11px] text-[#5F6368] mb-3 leading-relaxed">Isolates the net market appreciation from your core capital outflow, revealing the pure alpha generated by the compounding engine.</p>
                  <div className="border border-[#DADCE0] rounded-lg p-3 text-center bg-[#F8F9FA]">
                     <code className="text-[#188038] font-bold text-xs">Net Appreciation = FV - Σ (Monthly P)</code>
                  </div>
                  <p className="text-[10px] text-[#D93025] font-bold mt-2 italic">Institutional Note: On a 15-year horizon, interest typically contributes {">"} 60% of the final corpus value.</p>
               </div>
            </div>
          </section>

          <section id="sip-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. NEPSE Market Cycles & NAV Dynamics</h3>
            <p className="text-sm text-[#5f6368] mb-2">Nepal's mutual fund NAVs move in sync with NEPSE index cycles and NRB's monetary policy.</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: Compare SIP returns with a one-time investment using the <a href="/calculator/lumpsum-calculator/" className="text-[#1a73e8] font-bold hover:underline">Lumpsum Calculator</a>. Planning to withdraw monthly after retirement? Check the <a href="/calculator/swp-calculator/" className="text-[#1a73e8] font-bold hover:underline">SWP Calculator</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How does the Annual Step-Up feature change my SIP outcome?", answer: "The Annual Step-Up feature increases your monthly SIP contribution by a chosen percentage every year." },
      { question: "Is my SIP investment safe if the mutual fund company (AMC) goes bankrupt?", answer: "Yes. Under SEBON's Mutual Fund Regulation, all AMC assets must be held in custody by a SEBON-licensed custodian bank." }
    ]
  },

  'nea-bill': {
    title: "NEA Electricity Bill Calculator 2081 | Latest Nepal Tariffs",
    description: "Calculate your Nepal Electricity Authority (NEA) monthly bill including energy charges, service fees, and rebate/penalty logic. Updated for current tariff cycles.",
    howToUse: {
      steps: [
        "Select Meter Capacity: Choose your Ampere limit (usually 5A, 15A, or 30A for homes).",
        "Enter Units: Input the total units consumed for the month.",
        "Energy Charge: View the energy cost based on the current NEA Tariff.",
        "Service Charge: See the fixed monthly fee applied to your meter size.",
        "Check Penalties: Account for late payment fees or early payment rebates."
      ]
    },
    formula: {
      title: "Electricity Billing Formula",
      description: "NepaCalc uses a tiered summation model to calculate your NEA bill, ensuring each unit block is charged according to its specific rate.",
      raw: "Total = Service_Charge + Σ (Unit_Block x Energy_Rate)"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of NEA Billing & Energy Efficiency</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Energy Masterclass Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#nea-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The 20-Unit "Free" Threshold</a>
            <a href="#nea-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Domestic Tariff Tiers (5A/15A/30A)</a>
            <a href="#nea-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Service Charges & Fixed Fees</a>
            <a href="#nea-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> TOD (Time-of-Day) Pricing Strategy</a>
            <a href="#nea-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Late Payment Penalties (25% Rule)</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Understanding your electricity bill in Nepal is the first step toward significant cost savings. The Nepal Electricity Authority (NEA) operates a progressive tariff system.
        </p>

        <div className="space-y-6">
          <section id="nea-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The 20-Unit "Free" Threshold</h3>
            <p className="text-sm text-[#5f6368] mb-3">For users with a 5 Ampere meter capacity, the NEA provides a 'Lifeline' subsidy. The first 20 units are free from energy charges.</p>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the 20-unit free scheme?", answer: "Users with a 5A meter pay no energy charge if consumption is ≤ 20 units, paying only the Rs. 30 service charge." }
    ]
  },

  'fixed-deposit': {
    title: "Fixed Deposit Calculator Nepal 2081/82 | Institutional FD Audit",
    description: "The definitive systematic resource for FD planning in Nepal. Calculate maturity amounts with monthly, quarterly, and annual compounding logic based on latest bank rates.",
    howToUse: {
      steps: [
        "Principal Selection: Enter the total capital you intend to commit in NPR.",
        "Yield Calibration: Input the annual interest rate (e.g., 8.5% or 9.0%).",
        "Maturity Horizon: Select the total duration in years or months.",
        "Compounding Cycle: Choose between Monthly, Quarterly, or Annual compounding.",
        "Institutional Audit: Review the final maturity, net interest, and TDS impact."
      ]
    },
    formula: {
      title: "The Compound Interest Axiom",
      description: "Nepal's banks use discrete compounding cycles. NepaCalc applies the high-precision compounding formula to ensure decimal accuracy across all maturity horizons.",
      latex: "A = P(1 + r/n)^{nt}"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The FD Encyclopedia: Institutional Fixed Deposit Strategy</h2>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          In Nepal's financial landscape, Fixed Deposits (FD) remain the most secure vehicle for capital preservation. Our engine is calibrated to handle the specific compounding frequencies (Monthly, Quarterly, Annually) mandated by <a href="https://nrb.org.np" className="text-[#1a73e8] font-bold hover:underline">Nepal Rastra Bank</a>.
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">1. Compounding Frequencies in Nepal</h3>
            <p className="text-sm text-[#5f6368] mb-3">While most international calculators use continuous compounding, banks in Nepal strictly follow discrete cycles. Quarterly compounding is the institutional standard for most commercial banks.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 border border-[#dadce0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#1a73e8] uppercase mb-2">Quarterly Payout</h4>
                  <p className="text-[11px] text-[#5f6368]">Ideal for retirees; interest is credited every 3 months. This follows the Nepali calendar months.</p>
               </div>
               <div className="p-4 border border-[#dadce0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#188038] uppercase mb-2">At Maturity</h4>
                  <p className="text-[11px] text-[#5f6368]">Maximize compounding by reinvesting all interest until the end of the term. Higher effective yield.</p>
               </div>
            </div>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "Is FD interest taxable?", answer: "Yes, a 5% final withholding tax (TDS) is deducted for individuals." }
    ]
  },

  'loan-emi': {
    title: "Loan EMI Calculator Nepal | Institutional Banking Engine",
    description: "The definitive resource for debt intelligence in Nepal. Calculate Equated Monthly Installments for Home, Auto, and Personal loans.",
    howToUse: {
      steps: [
        "Principal Selection: Enter the total capital you intend to borrow in NPR.",
        "Interest Calibration: Input the annual percentage rate (Base Rate + Premium).",
        "Tenure Mapping: Choose the repayment horizon in years (1-30 years).",
        "Method Audit: Select 'Reducing Balance' for institutional banking standard.",
        "Repayment Drilldown: Review the total interest overhead and monthly amortization matrix."
      ]
    },
    formula: {
      title: "The EMI Reducing Axiom",
      description: "Calculated using the high-precision reducing balance algorithm mandated by Nepal Rastra Bank.",
      latex: "E = \\frac{P \\times r \\times (1+r)^n}{(1+r)^n - 1}"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Loan Encyclopedia: Debt Intelligence in Nepal</h2>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          In Nepal's regulated banking sector, loans are governed by the <strong>Interest Rate Spread</strong> and <strong>Base Rate</strong> mechanisms.
        </p>

        <div className="space-y-6">
          <section>
             <h3 className="text-base font-bold text-[#202124] mb-2">1. Reducing Balance vs. Flat Rate</h3>
             <p className="text-sm text-[#5f6368] leading-relaxed">Unlike some informal lenders, Class A commercial banks in Nepal strictly use the <strong>Reducing Balance Method</strong>.</p>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the 'Base Rate'?", answer: "The Base Rate is the minimum rate a bank must charge to cover its cost of funds and operations." }
    ]
  },

  'nepal-salary': {
    title: "Nepal Salary Calculator | Institutional Payroll Masterclass",
    description: "The definitive institutional payroll engine for Nepal. Calculate take-home pay with Labor Act 2074 compliance.",
    howToUse: {
      steps: [
        "Gross Income: Enter your total monthly gross salary (pre-deduction).",
        "Filing Status: Select 'Single' or 'Married' for tax slab thresholds.",
        "Statutory Pooling: Toggle SSF if your employer contributes to the Social Security Fund.",
        "Tax Shield: Input your voluntary monthly CIT deposit for deduction benefits.",
        "Audit: Review the 'Take-Home' card and the composition charts for final values."
      ]
    },
    formula: {
      title: "The Statutory Payroll Algorithm",
      description: "Official payroll logic used by HR departments across BFI and private sectors in Nepal.",
      raw: "Net = Gross - (SSF_ee + CIT + IncomeTax)"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Salary Encyclopedia: Institutional Payroll Mechanics</h2>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Understanding the partition between "Gross Salary" and "Net Take-Home" is governed by the <strong>Labor Act 2074</strong>.
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">1. SSF: The 31% Statutory Pool</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed">The SSF consists of an 11% contribution from the employee and a 20% contribution from the employer.</p>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "How is Basic Salary calculated?", answer: "In Nepal, Basic Salary is typically defined as 60% of the total Gross Salary." }
    ]
  },

  'nepal-stocks': {
    title: "NEPSE Trading Calculator | Share Profit, Commission & Tax",
    description: "Calculate your net profit or loss on NEPSE share trading. Includes SEBON commission tiers, DP charges, and Capital Gains Tax (CGT) logic.",
    howToUse: {
      steps: [
        "Enter Quantity: Input the number of shares bought or sold.",
        "Enter Price: Set the purchase or selling price per share.",
        "Commission Audit: View the SEBON commission breakdown based on volume.",
        "Tax Audit: Check the Capital Gains Tax (CGT) based on holding period.",
        "Net Result: Analyze your pure profit/loss after all institutional charges."
      ]
    },
    formula: {
      title: "Trading Profit Algorithm",
      description: "Official SEBON/NEPSE commission tiers and capital gains calculation logic.",
      raw: "Profit = Selling_Price - (Buying_Price + Total_Costs)\nTotal Costs = Commission + SEBON Fee + DP Charge + CGT"
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The NEPSE Encyclopedia: Share Trading Logic in Nepal</h2>
        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Trading on the Nepal Stock Exchange (NEPSE) involves more than just price movement. Every trade is subject to institutional charges governed by <strong>SEBON</strong>.
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">1. SEBON Commission Tiers</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed">The commission you pay to your broker is regulated. For amounts above Rs. 10 Lakhs, the rate drops to its lowest tier of 0.27%.</p>
          </section>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the CGT on shares?", answer: "For individuals, it is 5% for long-term (held > 1 year) and 7.5% for short-term." }
    ]
  }
};
