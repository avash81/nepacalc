import React from 'react';

interface SEOContent {
  title: string;
  description: string;
  howToUse?: string[];
  formula?: {
    title: string;
    equation: string;
    description: string;
    variables: string[];
  };
  content: React.ReactNode;
  faqs: { question: string; answer: string }[];
}

export const TIER1_SEO_CONTENT: Record<string, SEOContent> = {
  'nepal-land': {
    title: "Nepal Land Area Converter | Ropani, Bigha, Square Feet",
    description: "Convert land measurements across all Nepalese and International units including Ropani, Bigha, Aana, Kattha, and Sq Ft. Precise Malpot-grade conversions for Kathmandu and Terai.",
    howToUse: [
      "Select Region: Choose the Hilly/Valley (Ropani) or Terai (Bigha) system.",
      "Enter Units: Input your land measurement in Aana, Kattha, or Square Feet.",
      "Analyze Conversion: View the instant conversion across all Nepali and international units.",
      "Check Malpot Value: Use the output for official documentation and property valuation."
    ],
    formula: {
      title: "Land Conversion Formulas",
      equation: "1 Ropani = 16 Aana = 64 Paisa = 256 Daam",
      description: "Nepal uses two distinct measurement systems based on geography: the Ropani system for the Hills/Valleys and the Bigha system for the Terai.",
      variables: [
        "1 Ropani = 5,476 Square Feet (The standard unit of land measurement in the Hills and Valleys of Nepal)",
        "1 Bigha = 72,900 Square Feet (The standard unit of land measurement in the Terai flatlands)",
        "1 Aana = 342.25 Square Feet (Equivalent to 1/16th of a Ropani)",
        "1 Kattha = 3,645 Square Feet (Equivalent to 1/20th of a Bigha)"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Nepal Land Measurement & Real Estate</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Real Estate Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#land-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Ropani vs. Bigha (Hilly vs. Terai)</a>
            <a href="#land-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Square Feet to Daam Precision</a>
            <a href="#land-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> The Malpot \"Minimum Valuation\"</a>
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
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
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
            <h3 className="text-base font-bold text-[#202124] mb-2">3. The Malpot \"Minimum Valuation\" Rule</h3>
            <p className="text-sm text-[#5f6368] mb-2">When registering land, the government has a floor price for every area. This is the minimum price you must declare.</p>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Institutional Tip:** Your registration tax is calculated on either the **Minimum Valuation** or the **Actual Transaction Price**—whichever is higher. Always check the latest Malpot valuation list before signing a deal.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After verifying your land area, calculate the <a href="/calculator/property-registration/" className="text-[#1a73e8] font-bold hover:underline">Registration Fee</a> or check your <a href="/calculator/nepal-home-loan/" className="text-[#1a73e8] font-bold hover:underline">Home Loan Eligibility</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How many Sq Ft are in 1 Ropani?", answer: "1 Ropani equals exactly 5,476 Square Feet." },
      { question: "What is the difference between Bigha and Ropani?", answer: "A Bigha (72,900 sq ft) is much larger than a Ropani (5,476 sq ft). The Bigha system is used in the flatlands of the Terai, while Ropani is used in the Hills and Valleys." },
      { question: "What is an 'Aana'?", answer: "An Aana is a standard unit in the Ropani system, equal to 342.25 Square Feet. It is the most common unit used for buying residential plots in Kathmandu." }
    ]
  },

  'loan-emi': {
    title: "Loan EMI Calculator | Home, Auto & Personal Loan Planning",
    description: "The definitive encyclopedia for Loan EMI in Nepal (FY 2082/83). Learn about NRB monetary policy, construction tranche systems, LTV limits, and the 5 C's of credit.",
    howToUse: [
      "Enter Principal Amount: The total loan amount you wish to borrow.",
      "Set Interest Rate: The annual percentage rate (APR) provided by your bank.",
      "Choose Tenure: The duration of the loan in years or months.",
      "Calculate: View your monthly EMI, total interest, and full repayment amount."
    ],
    formula: {
      title: "EMI (Equated Monthly Installment) Formula",
      equation: "E = [P x r x (1+r)^n] / [(1+r)^n - 1]",
      description: "The standard annuity formula used by banks in Nepal and globally to calculate fixed monthly payments on a reducing balance basis.",
      variables: [
        "P = Principal Loan Amount (The total initial sum of money borrowed from the bank or financial institution)",
        "r = Periodic Interest Rate (The monthly interest rate calculated as Annual Rate / 12 months / 100)",
        "n = Total Number of Payments (The total duration of the loan in months: Number of Years x 12)",
        "E = Monthly EMI (The fixed amount to be repaid to the bank or institution every month)"
      ]
    },
    content: (
      <>
        {/* Main Title */}
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Loan EMI & Institutional Finance</h2>
        
        {/* Navigation */}
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Master Course Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#section-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The Financial Formula Toolkit</a>
            <a href="#section-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> NRB Macro-Economics (Layman Summary)</a>
            <a href="#section-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Home Construction (Tranche) System</a>
            <a href="#section-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> LTV Limits: Inside vs. Outside Valley</a>
            <a href="#section-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> The 3 Phases of Amortization</a>
            <a href="#section-6" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>6.</span> The 5 C's of Credit (Institutional Standards)</a>
            <a href="#section-7" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>7.</span> Global vs. Nepal Rastra Bank Standards</a>
            <a href="#section-8" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>8.</span> Advanced Masterclass: Bi-Weekly & k-Constant</a>
            <a href="#section-9" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>9.</span> Financial Psychology: Good vs. Bad Debt</a>
            <a href="#section-10" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>10.</span> Legal Documentation & IRD Formats</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Taking out a loan is a massive commitment. Whether you're financing a <a href="/calculator/nepal-land/" className="text-[#1a73e8] font-bold hover:underline">Home in Kathmandu</a> or a Commercial Vehicle, you're entering a complex mathematical contract. At NepaCalc, we bridge the gap between bank jargon and financial clarity. This guide provides an institutional-level deep dive into how loan mathematics and central bank policies impact your wealth.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1 */}
          <section id="section-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The Financial Toolkit: Critical Loan Formulas</h3>
            <p className="text-sm text-[#5f6368] mb-3">To manage your debt effectively, you need more than just one formula. Professional financial planning involves a suite of calculations that reveal the 'True Cost' of borrowing.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#1a73e8] uppercase">A. The EMI (Annuity) Formula</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Derived from the Present Value of a Geometric Series, this determines your fixed monthly payment.</p>
                <div className="bg-white p-3 rounded-lg border border-[#dadce0] font-mono text-[11px] font-bold text-[#202124] text-center">
                   E = [P x r x (1+r)^n] / [(1+r)^n - 1]
                </div>
              </div>
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#1a73e8] uppercase">B. Total Interest Payable</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">This formula reveals exactly how much 'extra' you are paying the bank over the life of the loan.</p>
                <div className="bg-white p-3 rounded-lg border border-[#dadce0] font-mono text-[11px] font-bold text-[#202124] text-center">
                   I = (E x n) - P
                </div>
                <p className="text-[10px] text-[#d93025] font-medium italic mt-2">Critical: On long tenures, Interest often exceeds the Principal.</p>
              </div>
            </div>
          </section>

          {/* 2 */}
          <section id="section-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. Macro-Economics: NRB Policy in Plain English</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed mb-2">In Nepal, your interest rate is rarely "Fixed." It is a Floating Rate determined by the bank's Base Rate.</p>
            <div className="p-5 bg-[#fdf2f2] border-l-2 border-[#d93025] rounded-r-xl">
               <h5 className="text-[#d93025] font-bold text-sm mb-2 mt-0">Layman Summary: The "Tap" Theory</h5>
               <p className="text-[#3c4043] text-xs leading-relaxed mb-0">
                  Think of the central bank (NRB) as a tap. When they tighten the tap (raise CRR/SLR), money becomes scarce and expensive. This causes the bank's Base Rate to rise, which automatically pushes your EMI higher. When they open the tap, money flows easily, and your EMI drops.
               </p>
            </div>
          </section>

          {/* 3 */}
          <section id="section-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Home Construction Loans (The Tranche System)</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed mb-3">In Nepal, many borrowers take Vikas Karja (Construction Loans). Unlike a home purchase, the bank releases funds in a Tranche (Installment) System.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: "1", h: "1st Installment (20-25%)", d: "Released after the foundation/DPC level is completed and verified by the bank's engineer." },
                { n: "2", h: "2nd Installment (30-40%)", d: "Released after the first or second-floor slab is cast." },
                { n: "3", h: "Final Installment", d: "Released once the finishing work (plumbing, wiring, painting) is nearly complete." }
              ].map((t, i) => (
                <div key={i} className="p-4 border border-[#dadce0] rounded-xl bg-white text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#1a73e8] flex items-center justify-center text-sm font-bold mx-auto mb-3">{t.n}</div>
                  <h5 className="font-bold text-xs mb-2 text-[#202124]">{t.h}</h5>
                  <p className="text-[10px] text-[#5f6368] leading-relaxed mb-0">{t.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4 */}
          <section id="section-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. LTV Deep Dive: Inside vs. Outside Valley</h3>
            <p className="text-sm text-[#5f6368] mb-2">The Loan-to-Value (LTV) ratio is the absolute limit of what you can borrow based on your collateral. NRB sets different limits based on geography and purpose.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                  <tr><th className="p-3">Loan Category</th><th className="p-3">Inside Ktm Valley</th><th className="p-3">Outside Valley</th></tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  <tr><td className="p-3 font-medium">Residential Home Loan</td><td className="p-3 font-bold text-[#d93025]">50%</td><td className="p-3 font-bold text-[#d93025]">60%</td></tr>
                  <tr><td className="p-3 font-medium">Real Estate/Plotting</td><td className="p-3">40%</td><td className="p-3">50%</td></tr>
                  <tr><td className="p-3 font-medium">Electric Vehicles (EV)</td><td className="p-3 font-bold text-[#1e8e3e]">80%</td><td className="p-3 font-bold text-[#1e8e3e]">80%</td></tr>
                  <tr><td className="p-3 font-medium">Non-EV Petrol/Diesel</td><td className="p-3">50%</td><td className="p-3">50%</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5 */}
          <section id="section-5">
            <h3 className="text-base font-bold text-[#202124] mb-2">5. The Lifecycle of a 20-Year Amortization</h3>
            <p className="text-sm text-[#5f6368] mb-2">An amortization schedule is a dynamic journey through three distinct phases:</p>
            <div className="space-y-3">
              {[
                { n: "1", h: "Phase 1: Interest Dominance (Years 1-7)", d: "In the early years, nearly 80% of your EMI goes toward interest. This is when the bank makes its profit. Pro-Tip: Making even a small extra principal payment here will cancel out months of future debt." },
                { n: "2", h: "Phase 2: The Equilibrium Point (Years 8-12)", d: "Around the midpoint, the portion of your EMI going toward principal finally equals the interest. From this point forward, your equity in the property grows faster than the bank's profit." },
                { n: "3", h: "Phase 3: Principal Dominance (Years 13-20)", d: "The balance is now low. Interest is minimal. Most of your EMI is simply 'moving money from your pocket to your house equity'. Pre-paying now saves less money than pre-paying in Phase 1." }
              ].map((p, i) => (
                <div key={i} className="flex gap-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                  <div className="w-6 h-6 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">{p.n}</div>
                  <div>
                    <h5 className="font-bold text-[#202124] text-xs mb-1">{p.h}</h5>
                    <p className="text-[11px] text-[#5f6368] leading-relaxed mb-0">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6 */}
          <section id="section-6">
            <h3 className="text-base font-bold text-[#202124] mb-2">6. The 5 C's of Credit: Institutional Standards</h3>
            <p className="text-sm text-[#5f6368] mb-2">Nepal's 'A' Class banks use these criteria to determine your Premium. One low score can result in a 'Premium Hike' or rejection:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { h: "Character", d: "Your credit history from the CIB report. Do you have 'Past Due' events?" },
                { h: "Capacity", d: "Your DTI (Debt-to-Income) ratio. Banks prefer this below 50%. Use our <a href='/calculator/nepal-salary/' className='text-[#1a73e8] hover:underline'>Salary Calculator</a> to audit your exact monthly capacity." },
                { h: "Capital", d: "Your net worth and liquid assets. How much 'Skin in the game' do you have?" },
                { h: "Collateral", d: "The forced sale value of the property. Is it near a river or high-tension line?" },
                { h: "Conditions", d: "The macro-economic climate and your industry stability (e.g. Tourism vs. IT)." }
              ].map((c, i) => (
                <div key={i} className="p-4 border border-[#dadce0] rounded-xl bg-white shadow-sm">
                  <h5 className="text-[10px] font-bold text-[#1a73e8] uppercase mb-2 tracking-wider">{c.h}</h5>
                  <p className="text-[10px] text-[#5f6368] leading-relaxed mb-0">{c.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7 */}
          <section id="section-7">
            <h3 className="text-base font-bold text-[#202124] mb-2">7. Institutional Formats: Nepal vs. International</h3>
            <p className="text-sm text-[#5f6368] mb-2">Understanding these formats helps you when comparing loans using global financial tools.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                  <tr><th className="p-3">Feature</th><th className="p-3">Nepal (NRB)</th><th className="p-3">USA (Fed)</th><th className="p-3">Canada (OSFI)</th></tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  <tr><td className="p-3 font-medium">Pricing Model</td><td className="p-3">Base Rate + Premium</td><td className="p-3">SOFR + Margin</td><td className="p-3">Prime + Margin</td></tr>
                  <tr><td className="p-3 font-medium">Compounding</td><td className="p-3">Monthly / Quarterly</td><td className="p-3">Daily / Monthly</td><td className="p-3">Semi-Annual</td></tr>
                  <tr><td className="p-3 font-medium">Day Count</td><td className="p-3">Actual / 365</td><td className="p-3">30 / 360</td><td className="p-3">Actual / 365</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8 */}
          <section id="section-8">
            <h3 className="text-base font-bold text-[#202124] mb-2">8. Advanced Masterclass: Pro Debt Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl">
                 <h5 className="font-bold text-[#1967d2] text-sm mb-2">Bi-Weekly Payment Proof</h5>
                 <p className="text-xs text-[#3c4043] leading-relaxed mb-0">Paying half your EMI every two weeks equals 13 payments a year. This simple mathematical trick can shave 4 years off a 20-year loan without any extra burden.</p>
              </div>
              <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
                 <h5 className="font-bold text-[#202124] text-sm mb-2">The Loan Constant (k)</h5>
                 <p className="text-xs text-[#3c4043] leading-relaxed mb-0">Formula: (Annual Debt / Total Loan) x 100. If 'k' is lower than your property's rental yield, you have Positive Leverage.</p>
              </div>
            </div>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl mt-4 flex gap-3 items-start">
               <span className="text-base shrink-0">⚠️</span>
               <div>
                  <h5 className="font-bold text-[#e65100] text-[10px] uppercase mb-1 mt-0">Technical Warning: Rule of 78s</h5>
                  <p className="text-xs text-[#3c4043] mb-0">Be wary of the Rule of 78s. While mostly phased out, some lenders still use this to 'front-load' interest. Always demand a 'Reducing Balance' contract.</p>
               </div>
            </div>
          </section>

          {/* 9 */}
          <section id="section-9">
            <h3 className="text-base font-bold text-[#202124] mb-2">9. The Psychology of Debt: Good vs. Bad Debt</h3>
            <p className="text-sm text-[#5f6368] mb-2">Not all loans are equal. Successful financial planning involves distinguishing between debt that builds wealth and debt that destroys it.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-[#e6f4ea] border border-[#ceead6] rounded-xl">
                 <h4 className="text-[10px] font-bold text-[#1e8e3e] uppercase mb-3">Good Debt (Wealth Creators)</h4>
                 <ul className="text-xs text-[#3c4043] space-y-2 list-none p-0">
                    <li className="flex items-center gap-2"><span>✓</span> <strong>Home Loans:</strong> Real estate usually appreciates in value over time.</li>
                    <li className="flex items-center gap-2"><span>✓</span> <strong>Education Loans:</strong> An investment in your future earning capacity.</li>
                    <li className="flex items-center gap-2"><span>✓</span> <strong>Business Loans:</strong> Using capital to generate higher returns (ROE).</li>
                 </ul>
              </div>
              <div className="p-5 bg-[#fce8e6] border border-[#fad2cf] rounded-xl">
                 <h4 className="text-[10px] font-bold text-[#d93025] uppercase mb-3">Bad Debt (Wealth Destroyers)</h4>
                 <ul className="text-xs text-[#3c4043] space-y-2 list-none p-0">
                    <li className="flex items-center gap-2"><span>✕</span> <strong>Wedding Loans:</strong> High-interest debt for a one-day event.</li>
                    <li className="flex items-center gap-2"><span>✕</span> <strong>Consumer Loans:</strong> Financing the latest iPhone or luxury watch.</li>
                    <li className="flex items-center gap-2"><span>✕</span> <strong>Credit Card Revolving:</strong> Rates often exceed 20% in Nepal.</li>
                 </ul>
              </div>
            </div>
          </section>

          {/* 11 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">11. The Institutional Workflow: Step-by-Step to Approval</h3>
            <p className="text-sm text-[#5f6368] mb-3">Navigating the bureaucracy of an 'A' Class bank in Nepal can be daunting. Understanding the internal milestones helps you manage expectations:</p>
            <div className="space-y-3">
              {[
                { n: "1", h: "Document Verification (3-5 Days)", d: "The bank reviews your 'Kyc', Lalpurja, and Income certificates. They check if your 'Tax Clearance' matches your bank statements." },
                { n: "2", h: "Valuation & Site Inspection (2-3 Days)", d: "An independent engineer visits the property to determine the 'Fair Market Value' and 'Forced Sale Value'. Note: Banks lend on the lower of the two. For area verification, use the <a href='/calculator/nepal-land/' className='text-[#1a73e8] hover:underline'>Land Area Converter</a>." },
                { n: "3", h: "CIB Verification (Instant)", d: "The bank pulls your record from the Credit Information Bureau. Any 'Blacklisting' or 'Overdue' in the last 2 years will likely cause a rejection." },
                { n: "4", h: "Sanction Letter Issued", d: "If approved, you receive a 'Sanction Letter' detailing the rate, tenure, and conditions. Read this carefully for 'Commitment Fees' and 'Prepayment' clauses." },
                { n: "5", h: "Legal Mortgage (Rokka)", d: "You visit the Land Revenue Office (Malpot) with the bank's representative to place a 'Rokka' (Lien) on your property." }
              ].map((s, i) => (
                <div key={i} className="flex gap-4 p-4 border border-[#dadce0] rounded-xl bg-white items-center shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-[11px] shrink-0">{s.n}</div>
                   <div>
                      <h5 className="font-bold text-[#202124] text-xs mb-0.5">{s.h}</h5>
                      <p className="text-[10px] text-[#5f6368] leading-relaxed mb-0">{s.d}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* 12 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">12. The Insurance Shield: Protecting Your Estate</h3>
            <p className="text-sm text-[#5f6368] mb-2">Banks in Nepal generally require two types of insurance before disbursing a loan. This isn't just a formality—it's a critical safety net for your family.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                 <h5 className="font-bold text-xs text-[#202124] mt-0">A. Term Life Insurance (Loan Protector)</h5>
                 <p className="text-[11px] text-[#5f6368] leading-relaxed mb-0">In the event of the borrower's death, the insurance company pays the outstanding loan balance directly to the bank. This ensures your family keeps the house without the burden of debt.</p>
              </div>
              <div className="p-5 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                 <h5 className="font-bold text-xs text-[#202124] mt-0">B. Property/Fire Insurance</h5>
                 <p className="text-[11px] text-[#5f6368] leading-relaxed mb-0">Required for Home and Business loans. It covers the structure against Fire, Earthquake, and Floods. Pro-Tip: Ensure the valuation on the policy matches the 'Replacement Cost' of the building.</p>
              </div>
            </div>
          </section>

          {/* 13 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">13. Loan Refinancing & Balance Transfers (BT)</h3>
            <p className="text-sm text-[#5f6368] mb-2">Interest rates in Nepal move in cycles. If you took a loan at 14% and the current market is at 10.5%, you have two options to save money:</p>
            <div className="bg-[#f1f3f4] rounded-xl p-5 space-y-3">
               <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🚀</span>
                  <p className="text-[#3c4043] text-xs leading-relaxed mb-0"><strong>Internal Refinancing:</strong> Negotiate with your current bank to lower the 'Premium' over the Base Rate. Often requires a small 'Processing Fee'.</p>
               </div>
               <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🏦</span>
                  <p className="text-[#3c4043] text-xs leading-relaxed mb-0"><strong>External Balance Transfer:</strong> Move your entire loan to another bank with a lower rate. Calculation: Only do this if the Interest Savings &gt; (Swap Fees + Prepayment Penalties + New Processing Fees).</p>
               </div>
            </div>
          </section>

          {/* 14 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">14. The Math of Prepayment: When to Pay Early?</h3>
            <p className="text-sm text-[#5f6368] mb-2">Prepaying your loan is the most effective way to build wealth, but timing matters. Due to the Reducing Balance method, interest is front-loaded.</p>
            <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl mb-3 text-center">
               <h5 className="font-bold text-sm text-[#1a73e8] mb-2">The "Golden Rule" of Prepayment</h5>
               <p className="text-xs text-[#3c4043] italic mb-3">"A Rupee prepaid in Year 2 is worth roughly 5 Rupees in Year 15 due to saved compound interest."</p>
               <p className="text-xs text-[#3c4043] font-medium">Goal: Reduce Tenure, not EMI. Shortening the years saves exponentially more interest.</p>
            </div>
            <div className="p-4 border border-[#dadce0] rounded-xl bg-white">
               <h5 className="font-bold text-[10px] uppercase text-[#1a73e8] mb-1">Bonus Pay</h5>
               <p className="text-[11px] text-[#5f6368] mb-0">Use yearly bonuses to pay off 1-2 extra EMIs. This can cut a 20-year loan down to 14 years.</p>
            </div>
          </section>

          {/* 15 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">15. Tax Benefits & Fiscal Intelligence</h3>
            <p className="text-sm text-[#5f6368] mb-2">In Nepal, loans aren't just a liability—they can be a tool for tax optimization. Under current IRD (Inland Revenue Department) guidelines:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { i: "🏛️", h: "Home Loan Interest", d: "Individual taxpayers can claim a deduction of up to Rs. 25,000 per year on interest paid for a home loan (verify latest budget limits)." },
                { i: "💼", h: "Business Loans", d: "100% of the interest paid on a business loan is a tax-deductible expense, directly reducing your taxable net profit." },
                { i: "🎓", h: "Education Loans", d: "While not a direct deduction in all cases, the 'Social Security Tax' exemptions for students often provide indirect relief." }
              ].map((t, i) => (
                <div key={i} className="p-5 bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl text-center">
                   <span className="text-2xl block mb-2">{t.i}</span>
                   <h5 className="font-bold text-[#1967d2] text-xs mb-2">{t.h}</h5>
                   <p className="text-[10px] text-[#3c4043] leading-relaxed mb-0">{t.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 16 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">16. Default, Recovery & The 35-Day Notice</h3>
            <p className="text-sm text-[#5f6368] mb-2">Missing an EMI has severe consequences beyond just a late fee. Banks in Nepal follow a strict protocol mandated by the NRB:</p>
            <div className="space-y-3">
               <div className="p-4 border-l-2 border-[#fbbc04] bg-[#fffaf0] rounded-r-lg">
                  <h5 className="font-bold text-[#946c00] text-[10px] uppercase mb-1">Step 1: The Call & Penalty (1-30 Days)</h5>
                  <p className="text-[11px] text-[#3c4043] mb-0">Late fees (often 2% over the interest rate) are applied. Your CIB record is flagged as 'Overdue'.</p>
               </div>
               <div className="p-4 border-l-2 border-[#ea4335] bg-[#fef2f2] rounded-r-lg">
                  <h5 className="font-bold text-[#b91c1c] text-[10px] uppercase mb-1">Step 2: The 35-Day Public Notice</h5>
                  <p className="text-[11px] text-[#3c4043] mb-0">If the loan remains 'Non-Performing' (NPL) for over 90 days, the bank publishes your name and photo in a national daily newspaper, giving you 35 days to settle the debt.</p>
               </div>
               <div className="p-4 border-l-2 border-[#202124] bg-[#f8f9fa] rounded-r-lg">
                  <h5 className="font-bold text-[#202124] text-[10px] uppercase mb-1">Step 3: Auction & Legal Action</h5>
                  <p className="text-[11px] text-[#3c4043] mb-0">If the 35-day notice expires, the bank has the legal right to auction your collateral property to recover the outstanding balance and legal costs.</p>
               </div>
            </div>
          </section>

          {/* 17 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">17. The Role of Guarantors & Personal Liability</h3>
            <p className="text-sm text-[#5f6368] mb-2">In Nepal, most loans require a Guarantor (Zamanati). If you are asked to sign as a guarantor, understand the legal gravity:</p>
            <div className="p-5 border-2 border-[#dadce0] rounded-xl bg-white shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-[#ea4335]"></div>
               <p className="text-[#202124] text-xs leading-relaxed mb-0 font-medium italic">
                  "A guarantor is 100% legally responsible for the debt if the primary borrower defaults. The bank can legally freeze the guarantor's bank accounts and even auction the guarantor's property if the primary collateral is insufficient. Rule of Thumb: Only guarantee a loan for someone whose financial integrity you trust as much as your own."
               </p>
            </div>
          </section>

          {/* 18 */}
          <section>
            <h3 className="text-base font-bold text-[#202124] mb-2">18. Digital Banking & EMI Hygiene</h3>
            <p className="text-sm text-[#5f6368] mb-2">Managing a 20-year loan requires organizational discipline. Professional borrowers use these digital tools:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex gap-4 items-start">
                  <span className="text-xl">📱</span>
                  <div>
                     <h5 className="font-bold text-[#202124] text-xs mb-1 mt-0">Standing Instructions (SI)</h5>
                     <p className="text-[10px] text-[#5f6368] mb-0">Set an auto-debit on your mobile banking app. This prevents "Accidental Defaults" due to forgetfulness.</p>
                  </div>
               </div>
               <div className="p-5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex gap-4 items-start">
                  <span className="text-xl">🔔</span>
                  <div>
                     <h5 className="font-bold text-[#202124] text-xs mb-1 mt-0">EMI Alerts</h5>
                     <p className="text-[10px] text-[#5f6368] mb-0">Ensure your phone number is registered for SMS alerts to track interest rate changes immediately.</p>
                  </div>
               </div>
            </div>
          </section>

          {/* 19 */}
          <section id="section-10">
            <h3 className="text-base font-bold text-[#202124] mb-2">19. Legal Documentation & Institutional Protocol</h3>
            <p className="text-sm text-[#5f6368] mb-2">To move from 'Calculation' to 'Approval' in Nepal, you must provide:</p>
            <ul className="space-y-2 text-xs text-[#3c4043] list-none p-0">
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Lalpurja:</strong> Primary land ownership document.</li>
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Tax Clearance:</strong> Proving you are an active taxpayer (Official IRD Format).</li>
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Blue Prints:</strong> Verified by the local municipality (Wada/Nagarpalika).</li>
               <li className="flex items-center gap-3"><span className="text-[#1a73e8]">•</span> <strong>Direct NRB Source:</strong> For latest rates, consult the Official NRB Circulars.</li>
            </ul>
          </section>
        </div>

        {/* Internal Silo */}
        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: For property planning, use the <a href="/calculator/nepal-land/" className="text-[#1a73e8] font-bold hover:underline">Land Area Converter</a>. 
              To audit your take-home pay, visit the <a href="/calculator/nepal-salary/" className="text-[#1a73e8] font-bold hover:underline">Salary Calculator</a>.
           </p>
        </div>
      </>
    ),
  },
  'nepal-income-tax': {
    title: "Nepal Income Tax Calculator FY 2082/83 | Official IRD Slabs",
    description: "Calculate your income tax in Nepal based on the latest 2082/83 fiscal year budget. Includes SSF waivers, female rebates, and authorized IRD deductions.",
    howToUse: [
      "Select Status: Choose between Single or Married (Joint) filing.",
      "Enter Income: Input your total annual income from all sources.",
      "Add Deductions: Enter your contributions to SSF, EPF, CIT, and Life Insurance.",
      "Check Rebates: If you are a female taxpayer, ensure the 10% rebate is applied.",
      "Review Slabs: Analyze how your income is distributed across the progressive tax brackets."
    ],
    formula: {
      title: "Nepal Progressive Tax Formula",
      equation: "Tax = Σ (Slab_Income x Slab_Rate)",
      description: "The IRD uses a Progressive Tax System. You only pay the higher percentage on the portion of income that falls within that specific 'slab.'",
      variables: [
        "Σ (Sigma) = Summation (The mathematical process of adding up the tax from all applicable income slabs)",
        "Slab Income = The specific portion of your total salary that falls within a particular tax bracket",
        "Slab Rate = The tax percentage (ranging from 1% to 39%) assigned by the IRD to that specific slab",
        "SST = Social Security Tax (A mandatory 1% tax on the first slab, waived for SSF contributors)"
      ]
    },
    content: (
      <>
        {/* Main Title */}
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Nepal Income Tax & Fiscal Policy</h2>
        
        {/* Navigation */}
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Institutional Tax Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#section-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The "Social Security Tax" (SST) Rule</a>
            <a href="#section-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Institutional Slabs for 2082/83</a>
            <a href="#section-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Authorized Deductions (Act 2058)</a>
            <a href="#section-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Female Taxpayer Rebates (10%)</a>
            <a href="#section-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Progressive vs. Flat Tax Theory</a>
            <a href="#section-6" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>6.</span> Tax on Bonus & Dashain Allowance</a>
            <a href="#section-7" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>7.</span> Retirement Fund (SSF/CIT/EPF) Strategy</a>
            <a href="#section-8" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>8.</span> Health & Life Insurance Relief</a>
            <a href="#section-9" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>9.</span> Remote Area Allowance (Kha/Ga/Gha)</a>
            <a href="#section-10" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>10.</span> Penalty for Late Filing (D-01/D-03)</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Managing your taxes in Nepal requires a deep understanding of the <a href="/calculator/nepal-salary/" className="text-[#1a73e8] font-bold hover:underline">Income Tax Act 2058</a>. Whether you are a salaried professional or a business owner, your tax liability is determined by a complex hierarchy of slabs, deductions, and rebates. NepaCalc provides this institutional deep-dive to help you optimize your wealth while remaining 100% compliant with the Inland Revenue Department (IRD).
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1 */}
          <section id="section-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The "Social Security Tax" (SST) Waiver Rule</h3>
            <p className="text-sm text-[#5f6368] mb-3">In Nepal, the first bracket of income is subject to a 1% tax known as Social Security Tax. However, there is a critical institutional exception.</p>
            <div className="p-5 bg-[#e8f0fe] border-l-2 border-[#1967d2] rounded-r-xl">
               <h5 className="text-[#1967d2] font-bold text-sm mb-2 mt-0">Institutional Insight: The SSF Advantage</h5>
               <p className="text-[#3c4043] text-xs leading-relaxed mb-0">
                  If you are a contributor to the **Social Security Fund (SSF)**, the 1% SST is completely waived. This means your first Rs. 5,00,000 (Single) or Rs. 6,00,000 (Married) is 100% tax-free. If you are NOT in SSF, the bank or employer will deduct this 1% by default.
               </p>
            </div>
          </section>

          {/* 2 */}
          <section id="section-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. Institutional Slabs for FY 2082/83</h3>
            <p className="text-sm text-[#5f6368] mb-2">The current fiscal year uses a progressive 7-tier system. Note that these limits apply to your *Taxable* income after all deductions are removed.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                  <tr><th className="p-3">Slab Range</th><th className="p-3">Single Rate</th><th className="p-3">Married Rate</th></tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  <tr><td className="p-3">Up to 5L (S) / 6L (M)</td><td className="p-3 font-bold text-[#1e8e3e]">1% (SST)</td><td className="p-3 font-bold text-[#1e8e3e]">1% (SST)</td></tr>
                  <tr><td className="p-3">Next 2,00,000</td><td className="p-3">10%</td><td className="p-3">10%</td></tr>
                  <tr><td className="p-3">Next 3,00,000</td><td className="p-3">20%</td><td className="p-3">20%</td></tr>
                  <tr><td className="p-3">Next 10,00,000</td><td className="p-3">30%</td><td className="p-3">30%</td></tr>
                  <tr><td className="p-3">Next 30,00,000</td><td className="p-3 font-bold text-[#d93025]">36%</td><td className="p-3 font-bold text-[#d93025]">36%</td></tr>
                  <tr><td className="p-3">Above 50,00,000</td><td className="p-3 font-bold text-[#d93025]">39%</td><td className="p-3 font-bold text-[#d93025]">39%</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section id="section-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Authorized Deductions (Income Tax Act 2058)</h3>
            <p className="text-sm text-[#5f6368] mb-3">You can legally reduce your taxable income by utilizing these four pillars of deduction. Use the <a href="/calculator/nepal-salary/" className="text-[#1a73e8] hover:underline">Salary Tool</a> to verify these limits.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#1a73e8] uppercase">A. Retirement Fund (SSF/CIT/EPF)</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Max deduction: **1/3 of total income** or **Rs. 5,00,000** (whichever is lower). This is the most powerful tool for tax saving in Nepal.</p>
              </div>
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#1a73e8] uppercase">B. Insurance Premiums</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">**Life Insurance:** Deduct up to Rs. 40,000/year. **Health Insurance:** Deduct up to Rs. 20,000/year. You must have the official premium receipt for verification.</p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section id="section-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. The 10% Female Taxpayer Rebate</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed mb-3">To encourage workforce participation, the Government of Nepal offers a 10% rebate on the total tax payable for female taxpayers who have income only from employment.</p>
            <div className="bg-[#f1f3f4] rounded-xl p-5 border border-[#dadce0]">
               <p className="text-xs text-[#3c4043] leading-relaxed mb-0">
                  **Rule:** If your total tax calculated is Rs. 1,00,000, and you qualify for the rebate, you only pay **Rs. 90,000**. Note: This does NOT apply if you have income from business, investments, or land sales.
               </p>
            </div>
          </section>

          {/* 5 */}
          <section id="section-5">
            <h3 className="text-base font-bold text-[#202124] mb-2">5. Understanding Progressive Tax Theory</h3>
            <p className="text-sm text-[#5f6368] mb-2">A common misconception is that if you enter the 30% slab, your *entire* income is taxed at 30%. This is false.</p>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl flex gap-3 items-start">
               <span className="text-base shrink-0">💡</span>
               <p className="text-xs text-[#3c4043] mb-0">Your income is like a series of buckets. Only the money that "overflows" into the higher bucket gets taxed at the higher rate. The money in the lower buckets remains taxed at 1%, 10%, and 20%.</p>
            </div>
          </section>

          {/* 10 */}
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

        {/* Internal Silo */}
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

  'nea-bill': {
    title: "NEA Electricity Bill Calculator 2081 | Latest Nepal Tariffs",
    description: "Calculate your Nepal Electricity Authority (NEA) monthly bill including energy charges, service fees, and rebate/penalty logic. Updated for current tariff cycles.",
    howToUse: [
      "Select Meter Capacity: Choose your Ampere limit (usually 5A, 15A, or 30A for homes).",
      "Enter Units: Input the total units consumed for the month.",
      "Energy Charge: View the energy cost based on the current NEA Tariff.",
      "Service Charge: See the fixed monthly fee applied to your meter size.",
      "Check Penalties: Account for late payment fees or early payment rebates."
    ],
    formula: {
      title: "Electricity Billing Formula",
      equation: "Total = Service_Charge + Σ (Unit_Block x Energy_Rate)",
      description: "NepaCalc uses a tiered summation model to calculate your NEA bill, ensuring each unit block is charged according to its specific rate.",
      variables: [
        "Σ (Sigma) = Total Summation (Adding up energy charges from all used consumption tiers)",
        "Service Charge = A fixed monthly fee based on your meter capacity (e.g., 5A, 15A, 30A)",
        "Unit Block = The specific number of electricity units consumed within a particular tariff tier",
        "Energy Rate = The cost per unit (NPR) as defined by the NEA for that specific consumption tier"
      ]
    },
    content: (
      <>
        {/* Main Title */}
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of NEA Billing & Energy Efficiency</h2>
        
        {/* Navigation */}
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Energy Masterclass Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#nea-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The 20-Unit "Free" Threshold</a>
            <a href="#nea-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Domestic Tariff Tiers (5A/15A/30A)</a>
            <a href="#nea-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Service Charges & Fixed Fees</a>
            <a href="#nea-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> TOD (Time-of-Day) Pricing Strategy</a>
            <a href="#nea-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Late Payment Penalties (25% Rule)</a>
            <a href="#nea-6" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>6.</span> Solar Net Metering in Nepal</a>
            <a href="#nea-7" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>7.</span> Commercial vs. Industrial Rates</a>
            <a href="#nea-8" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>8.</span> Understanding Voltage Levels (11kV/33kV)</a>
            <a href="#nea-9" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>9.</span> Meter Reading & Billing Cycle</a>
            <a href="#nea-10" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>10.</span> Official NEA Digital Payments</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Understanding your electricity bill in Nepal is the first step toward significant cost savings. The Nepal Electricity Authority (NEA) operates a progressive tariff system designed to subsidize low-volume users while encouraging efficiency among high-volume consumers. Whether you are managing a household or a large <a href="/calculator/nepal-home-loan/" className="text-[#1a73e8] font-bold hover:underline">Home Construction project</a>, this guide decodes the math behind your meter.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1 */}
          <section id="nea-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The 20-Unit "Free" Threshold</h3>
            <p className="text-sm text-[#5f6368] mb-3">For users with a 5 Ampere meter capacity, the NEA provides a 'Lifeline' subsidy. The first 20 units are free from energy charges.</p>
            <div className="p-5 bg-[#e6f4ea] border-l-2 border-[#1e8e3e] rounded-r-xl">
               <h5 className="text-[#1e8e3e] font-bold text-sm mb-2 mt-0">Institutional Insight: The 21-Unit Jump</h5>
               <p className="text-[#3c4043] text-xs leading-relaxed mb-0">
                  Be careful: once you consume the 21st unit, the subsidy vanishes for all units consumed. If you stay under 20, you only pay the fixed **Rs. 30 service charge**. This makes efficiency critical for small households.
               </p>
            </div>
          </section>

          {/* 2 */}
          <section id="nea-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. Domestic Tariff Tiers (Residential Units)</h3>
            <p className="text-sm text-[#5f6368] mb-2">NEA billing is divided into consumption blocks. The more you use, the higher the rate for that specific block.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                  <tr><th className="p-3">Unit Block</th><th className="p-3">Rate (NPR/Unit)</th><th className="p-3">Svc Charge (5A)</th></tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]">
                  <tr><td className="p-3">0 - 20 Units</td><td className="p-3 font-bold text-[#1e8e3e]">Free</td><td className="p-3">Rs. 30</td></tr>
                  <tr><td className="p-3">21 - 30 Units</td><td className="p-3">Rs. 6.50</td><td className="p-3">Rs. 50</td></tr>
                  <tr><td className="p-3">31 - 50 Units</td><td className="p-3">Rs. 8.00</td><td className="p-3">Rs. 75</td></tr>
                  <tr><td className="p-3">51 - 150 Units</td><td className="p-3">Rs. 9.50</td><td className="p-3">Rs. 100</td></tr>
                  <tr><td className="p-3">Above 250 Units</td><td className="p-3 font-bold text-[#d93025]">Rs. 11.00</td><td className="p-3">Rs. 150</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4 */}
          <section id="nea-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. TOD (Time-of-Day) Pricing Strategy</h3>
            <p className="text-sm text-[#5f6368] mb-3">If you have a digital TOD meter, your unit rate changes based on the time of day. This is the ultimate tool for industrial and high-volume domestic users.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#1a73e8] uppercase">Off-Peak (11 PM - 5 AM)</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">The lowest rates. Ideal for charging EVs or running heavy water pumps.</p>
              </div>
              <div className="p-4 border border-[#dadce0] rounded-xl bg-[#f8f9fa] space-y-2">
                <h4 className="text-[10px] font-bold text-[#d93025] uppercase">Peak Hours (5 PM - 11 PM)</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">The highest rates. Avoid running high-wattage appliances like washing machines or heaters during this window.</p>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section id="nea-5">
            <h3 className="text-base font-bold text-[#202124] mb-2">5. Late Payment Penalties (The 25% Rule)</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed mb-3">NEA is strict about payment deadlines. Missing your window can lead to heavy compounding penalties.</p>
            <div className="bg-[#fdf2f2] rounded-xl p-5 border-l-2 border-[#d93025]">
               <ul className="text-xs text-[#3c4043] space-y-1 list-none p-0">
                  <li className="flex items-center gap-2"><strong>1-7 Days:</strong> 2% Rebate (Early Payment)</li>
                  <li className="flex items-center gap-2"><strong>16-30 Days:</strong> 5% Penalty</li>
                  <li className="flex items-center gap-2"><strong>After 40 Days:</strong> 25% Penalty</li>
               </ul>
            </div>
          </section>
        </div>

        {/* Internal Silo */}
        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: To audit your income for bill payments, visit the <a href="/calculator/nepal-salary/" className="text-[#1a73e8] font-bold hover:underline">Salary Calculator</a>. Planning a home build? Check the <a href="/calculator/nepal-home-loan/" className="text-[#1a73e8] font-bold hover:underline">Home Loan Tool</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Why is my bill Rs. 30 if I used 0 units?", answer: "This is the fixed monthly service charge for a 5 Ampere meter. It covers infrastructure maintenance regardless of usage." },
      { question: "How can I change my meter Ampere (Capacity)?", answer: "You must visit your local NEA distribution center with a copy of your citizenship and an application for upgrade/downgrade." },
      { question: "What is Net Metering?", answer: "Net Metering allows you to sell excess solar energy back to the NEA grid, deducting it from your consumption bill." }
    ]
  },
  'nepal-salary': {
    title: "Nepal Salary Calculator 2081/82 | Official Take Home Pay",
    description: "Calculate your net take-home salary in Nepal including SSF, CIT, EPF, and Income Tax deductions. Updated for the latest fiscal budget.",
    howToUse: [
      "Enter Gross Salary: Input your total monthly or annual gross salary.",
      "Select Filing Status: Choose Single or Married for accurate tax slabs.",
      "Set Deductions: Toggle contributions for SSF, CIT, and Provident Fund.",
      "Calculate Net: Instantly view your monthly take-home pay after all statutory deductions."
    ],
    formula: {
      title: "Salary Computation Logic",
      equation: "Net Pay = Gross Salary - (SSF + CIT + Tax)",
      description: "NepaCalc follows the official Inland Revenue Department (IRD) and Social Security Fund (SSF) guidelines for precise deduction logic.",
      variables: [
        "Gross Salary = Your total monthly or annual remuneration before any statutory deductions or taxes",
        "SSF = Social Security Fund (A 31% total contribution: 11% from employee and 20% from employer)",
        "CIT = Citizen Investment Trust (A voluntary, tax-deductible savings scheme in Nepal)",
        "Net Pay = Your final 'Take-Home' salary amount deposited into your bank account after all deductions"
      ]
    },
    content: (
      <>
        {/* Main Title */}
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Salary Structures & Payroll in Nepal</h2>
        
        {/* Navigation */}
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Payroll Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#sal-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Basic vs. Gross vs. Net Salary</a>
            <a href="#sal-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> SSF Contributions (11% vs 20%)</a>
            <a href="#sal-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> CIT & EPF Strategy</a>
            <a href="#sal-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Festival Allowance (Dashain Bonus)</a>
            <a href="#sal-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Overtime & Allowance Taxation</a>
            <a href="#sal-6" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>6.</span> Tax Clearance Certificates (TCC)</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Navigating the payroll landscape in Nepal requires an understanding of both the Labor Act 2074 and the Income Tax Act 2058. Whether you are an HR professional or an employee, knowing your 'Take-Home' pay is vital for financial planning. Use our <a href="/calculator/nepal-income-tax/" className="text-[#1a73e8] font-bold hover:underline">Income Tax Tool</a> to see a detailed breakdown of your tax slabs.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          <section id="sal-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. Basic vs. Gross vs. Net Salary</h3>
            <p className="text-sm text-[#5f6368] mb-3">In Nepal, your 'Salary' is often quoted as Gross, but you take home the Net. The difference lies in statutory deductions.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl space-y-2">
               <p className="text-xs text-[#3c4043] mb-0">**Basic Salary:** The fixed amount (usually 60% of Gross) used to calculate SSF and PF.</p>
               <p className="text-xs text-[#3c4043] mb-0">**Gross Salary:** Basic + All Allowances (House, Food, Transport).</p>
               <p className="text-xs text-[#3c4043] mb-0">**Net Salary:** The actual cash deposited in your bank account after Tax and SSF.</p>
            </div>
          </section>

          <section id="sal-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. SSF Contributions (The 31% Rule)</h3>
            <p className="text-sm text-[#5f6368] mb-2">The Social Security Fund (SSF) is the most significant change in Nepal's payroll history. It is a 31% total contribution.</p>
            <ul className="text-xs text-[#3c4043] space-y-1">
               <li><strong>11% (Employee):</strong> Deducted from your basic salary monthly.</li>
               <li><strong>20% (Employer):</strong> Paid by the company on top of your gross.</li>
               <li><strong>Result:</strong> You gain a 31% contribution toward medical, accident, and retirement insurance.</li>
            </ul>
          </section>
        </div>

        {/* Internal Silo */}
        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After auditing your salary, plan your investments with the <a href="/calculator/sip-calculator/" className="text-[#1a73e8] font-bold hover:underline">SIP Calculator</a>. Planning a home purchase? Use the <a href="/calculator/nepal-home-loan/" className="text-[#1a73e8] font-bold hover:underline">Home Loan Tool</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Is SSF mandatory in Nepal?", answer: "Yes, for the formal sector, SSF is a mandatory social security requirement under the Labor Act." },
      { question: "What is the tax-free limit for individuals?", answer: "Rs. 5,00,000 for singles and Rs. 6,00,000 for married couples for the current fiscal year." }
    ]
  },

  'nepal-stocks': {
    title: "NEPSE Trading Calculator | Share Profit, Commission & Tax",
    description: "Calculate your net profit or loss on NEPSE share trading. Includes SEBON commission tiers, DP charges, and Capital Gains Tax (CGT) logic.",
    howToUse: [
      "Enter Quantity: Input the number of shares bought or sold.",
      "Enter Price: Set the purchase or selling price per share.",
      "Broker Commission: The tool automatically applies the SEBON regulated commission tiers.",
      "Capital Gains: Select if you have held the share for more or less than 365 days.",
      "Calculate: Instantly see your total costs, tax, and net profit."
    ],
    formula: {
      title: "NEPSE Profit Formula",
      equation: "Net Profit = (Sale - Purchase) - (Fees + Tax)",
      description: "Profit on the Nepal Stock Exchange is calculated by subtracting all institutional fees and capital gains tax from your gross trading result.",
      variables: [
        "Quantity = The total number of shares in the transaction (Bought or Sold)",
        "Price = The market rate per share agreed upon in the secondary market (LTP)",
        "Fees = Total regulatory leakage including Broker Commission, SEBON Fee, and DP Charge",
        "Net Profit = The actual cash gain remaining after subtracting all institutional costs and Capital Gains Tax (CGT)"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Stock Trading & NEPSE Finance</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Stock Market Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#st-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> SEBON Commission Tiers</a>
            <a href="#st-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> DP Charges (Flat Rs. 25)</a>
            <a href="#st-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Long-Term vs. Short-Term CGT</a>
            <a href="#st-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> WACC Calculation Logic</a>
            <a href="#st-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Bonus & Right Share Tax</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Trading on the Nepal Stock Exchange (NEPSE) requires more than just picking the right company. You must manage the 'leakage' caused by commissions, DP charges, and taxes. Whether you are a day trader or a long-term investor, using our <a href="/calculator/nepse-wacc/" className="text-[#1a73e8] font-bold hover:underline">WACC Tool</a> alongside this profit calculator ensures you know your true cost basis.
        </p>

        <div className="space-y-6">
          <section id="st-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. SEBON Commission Tiers</h3>
            <p className="text-sm text-[#5f6368] mb-2">Broker commissions in Nepal are regulated by SEBON. They follow a tiered structure—the more you trade, the lower the percentage.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
               <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                     <tr><th className="p-3">Transaction Amount</th><th className="p-3">Commission %</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#dadce0]">
                     <tr><td className="p-3">Up to Rs. 50,000</td><td className="p-3">0.36%</td></tr>
                     <tr><td className="p-3">Rs. 50,001 to Rs. 5,00,000</td><td className="p-3">0.33%</td></tr>
                     <tr><td className="p-3">Rs. 5,00,001 to Rs. 20,00,000</td><td className="p-3">0.31%</td></tr>
                     <tr><td className="p-3">Above Rs. 1,00,00,000</td><td className="p-3">0.24%</td></tr>
                  </tbody>
               </table>
            </div>
          </section>

          <section id="st-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Long-Term (5%) vs. Short-Term (7.5%) CGT</h3>
            <p className="text-sm text-[#5f6368] mb-3">Capital Gains Tax (CGT) is only paid on profits. Nepal uses a time-based logic to determine your tax rate.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 border-l-4 border-[#1e8e3e] bg-[#f8f9fa] rounded-r-xl">
                  <h5 className="font-bold text-xs text-[#1e8e3e] mb-1 mt-0">Long-Term (5%)</h5>
                  <p className="text-[10px] text-[#5f6368] mb-0">Applies if you hold the share for **more than 365 days**. This encourages stable, long-term investing.</p>
               </div>
               <div className="p-4 border-l-4 border-[#d93025] bg-[#f8f9fa] rounded-r-xl">
                  <h5 className="font-bold text-xs text-[#d93025] mb-1 mt-0">Short-Term (7.5%)</h5>
                  <p className="text-[10px] text-[#5f6368] mb-0">Applies if you sell within **365 days**. This is the standard rate for active traders.</p>
               </div>
            </div>
          </section>

          <section id="st-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. WACC Calculation Logic</h3>
            <p className="text-sm text-[#5f6368] mb-2">In Nepal, you must declare your Weighted Average Cost Basis (WACC) before selling shares. This ensures the IRD collects the correct Capital Gains Tax.</p>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Pro Tip:** Your WACC includes the purchase price plus the broker commission and the 0.015% SEBON fee. Always use the <a href="/calculator/nepse-wacc/" className="text-[#1a73e8] font-bold hover:underline">WACC Tool</a> to find your exact base.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: For accurate portfolio management, use the <a href="/calculator/nepse-wacc/" className="text-[#1a73e8] font-bold hover:underline">WACC Calculator</a>. Need to calculate dividends? Visit our <a href="/calculator/nepse-bonus-tax/" className="text-[#1a73e8] font-bold hover:underline">Bonus Share Tax Tool</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the DP Charge?", answer: "The Depository Participant (DP) charge is a flat fee of Rs. 25 per script, regardless of the quantity of shares sold." },
      { question: "Is there a SEBON fee?", answer: "Yes, SEBON charges a nominal fee of 0.015% on every transaction to fund market regulation." },
      { question: "How is 'Profit' calculated for tax?", answer: "CGT is calculated on (Net Sales Amount - Net Purchase Amount). You only pay tax if you make a profit. Losses can be adjusted in future trades under specific IRD rules." }
    ]
  },

  'property-registration': {
    title: "Nepal Property Registration Fee Calculator | Malpot & Stamp Duty",
    description: "Calculate land and house registration fees in Nepal based on municipal rates and minimum valuation. Official Malpot calculation logic.",
    howToUse: [
      "Select Location: Choose between Metropolitan, Sub-Metropolitan, or Municipality.",
      "Enter Valuation: Input the government minimum valuation or actual price.",
      "Check Gender/Status: Apply rebates for female ownership or senior citizens.",
      "Review Fees: View the breakdown of Registration Tax and Bagmati/Province fees."
    ],
    formula: {
      title: "Registration Fee Formula",
      equation: "Fee = (Valuation x Rate) + Municipal_Surcharge",
      description: "The registration fee is a percentage of the valuation, which varies based on the gender of the owner and the location of the property.",
      variables: [
        "Valuation = The higher value between the official Government Minimum Valuation and the Actual Transaction Price",
        "Base Rate = The standard registration percentage set by the local municipality (Metropolitan vs. Rural)",
        "Rebate = Government-mandated discount (e.g., 25% for female owners, 50% for senior citizens)",
        "Municipal Surcharge = Additional infrastructure or province-specific fees (e.g., Bagmati Province Fee)"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Malpot & Property Registration in Nepal</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Malpot Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#mal-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Metropolitan vs. Village Rates</a>
            <a href="#mal-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Female Ownership Rebate (25%)</a>
            <a href="#mal-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Senior Citizen & Martyr Family Rebates</a>
            <a href="#mal-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Bagmati Province Surcharges</a>
            <a href="#mal-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> The \"Sifarish\" Documentation Flow</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          Registering property in Nepal involves multiple layers of taxation, including the federal Registration Fee and local municipal surcharges. Using our <a href="/calculator/nepal-land/" className="text-[#1a73e8] font-bold hover:underline">Land Area Converter</a> to verify your 'Aana' or 'Kattha' measurements is the first step before calculating your final tax liability at the Malpot office.
        </p>

        <div className="space-y-6">
          <section id="mal-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. Metropolitan vs. Village Rates</h3>
            <p className="text-sm text-[#5f6368] mb-2">The registration fee percentage varies significantly based on whether the property is located in a Metropolitan city (Kathmandu, Pokhara) or a Village Municipality.</p>
            <div className="border border-[#dadce0] rounded-xl overflow-hidden">
               <table className="w-full text-xs text-left">
                  <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                     <tr><th className="p-3">Location Category</th><th className="p-3">Registration Rate</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#dadce0]">
                     <tr><td className="p-3">Metropolitan (Mahanagarpalika)</td><td className="p-3">5%</td></tr>
                     <tr><td className="p-3">Sub-Metropolitan</td><td className="p-3">4.5%</td></tr>
                     <tr><td className="p-3">Municipality (Nagarpalika)</td><td className="p-3">4%</td></tr>
                     <tr><td className="p-3">Rural Municipality (Gaunpalika)</td><td className="p-3">2%</td></tr>
                  </tbody>
               </table>
            </div>
          </section>

          <section id="mal-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. The Female Ownership Rebate</h3>
            <p className="text-sm text-[#5f6368] mb-3">To encourage land ownership among women, the Government of Nepal offers a significant rebate on registration fees.</p>
            <div className="p-5 bg-[#e6f4ea] border-l-2 border-[#1e8e3e] rounded-r-xl">
               <h5 className="text-[#1e8e3e] font-bold text-sm mb-2 mt-0">Institutional Insight: 25% Savings</h5>
               <p className="text-[#3c4043] text-xs leading-relaxed mb-0">
                  Female owners generally receive a **25% discount** on the registration fee. In remote areas, this rebate can go up to 50%. This makes joint ownership or female-only ownership a popular choice for reducing closing costs.
               </p>
            </div>
          </section>

          <section id="mal-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. Bagmati Province Surcharges</h3>
            <p className="text-sm text-[#5f6368] mb-2">If your property is in the Bagmati Province (including Kathmandu), you must pay an additional infrastructure surcharge on top of the base registration fee.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Filing Tip:** Ensure your 'Sifarish' from the local Wada office clearly mentions the 'Ghar/Jagga' valuation to avoid delays at the Malpot counter.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating registration fees, audit your sale profit with the <a href="/calculator/property-tax/" className="text-[#1a73e8] font-bold hover:underline">CGT Calculator</a> or check your <a href="/calculator/nepal-home-loan/" className="text-[#1a73e8] font-bold hover:underline">Home Loan Options</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the Bagmati Province Surcharge?", answer: "Properties in the Bagmati province often incur an additional infrastructure fee (usually Rs. 1,000 to Rs. 5,000) depending on the valuation." },
      { question: "Can I use the Minimum Valuation for tax?", answer: "Yes, but if your bank loan amount or actual transaction price is higher, the Malpot office will use the higher value to calculate tax." }
    ]
  },

  'property-tax': {
    title: "Nepal Property Capital Gains Tax Calculator | IRD Real Estate Tax",
    description: "Calculate Capital Gains Tax (CGT) on property sales in Nepal. Updated for latest IRD rules on 5% vs 7.5% tax tiers based on holding period.",
    howToUse: [
      "Enter Sale Price: The amount you are selling the property for.",
      "Enter Purchase Price: The original cost of the property.",
      "Select Holding Period: Choose 'Less than 10 years' or 'More than 10 years'.",
      "Calculate: View the net profit and applicable tax."
    ],
    formula: {
      title: "Property CGT Formula",
      equation: "CGT = (Sale_Price - Purchase_Price) x Tax_Rate",
      description: "In Nepal, Capital Gains Tax is a final withholding tax on the profit made from selling real estate. The rate depends on how long you held the property.",
      variables: [
        "Sale Price = The total gross amount received from the property buyer at the time of transfer",
        "Purchase Price = The original acquisition cost or the previous government valuation of the property",
        "Tax Rate = The Capital Gains Tax percentage based on holding period (5% for holdings >10 years, 7.5% for <10 years)",
        "Profit = The net taxable gain on the property sale, subject to final withholding tax"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Property CGT in Nepal</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Tax Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#cgt-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Holding Period Logic (10-Year Rule)</a>
            <a href="#cgt-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> The Rs. 10 Lakh Profit Threshold</a>
            <a href="#cgt-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> CGT for Non-Residents</a>
            <a href="#cgt-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Deductible Costs (Brokerage/Registration)</a>
            <a href="#cgt-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Final Withholding vs. Assessment</a>
          </div>
        </div>

        <div className="space-y-6">
          <section id="cgt-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The 10-Year Holding Period Rule</h3>
            <p className="text-sm text-[#5f6368] mb-3">The Inland Revenue Department (IRD) incentivizes long-term property ownership by offering a lower tax rate for properties held for a decade or more.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 border-l-4 border-[#1e8e3e] bg-[#f8f9fa] rounded-r-xl">
                  <h5 className="font-bold text-xs text-[#1e8e3e] mb-1 mt-0">Long-Term (5%)</h5>
                  <p className="text-[10px] text-[#5f6368] mb-0">Applies if you hold the property for **10 years or more**.</p>
               </div>
               <div className="p-4 border-l-4 border-[#d93025] bg-[#f8f9fa] rounded-r-xl">
                  <h5 className="font-bold text-xs text-[#d93025] mb-1 mt-0">Short-Term (7.5%)</h5>
                  <p className="text-[10px] text-[#5f6368] mb-0">Applies if you sell within **10 years** of purchase.</p>
               </div>
            </div>
          </section>

          <section id="cgt-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. The Rs. 10 Lakh Profit Exemption</h3>
            <p className="text-sm text-[#5f6368] mb-2">For individuals selling their primary residence, there is a tax-free threshold on the total profit earned.</p>
            <div className="p-4 bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Institutional Rule:** If your total profit is less than **Rs. 1,000,000** and the property is categorized as 'Residential', you may be exempt from paying CGT. This is a critical provision for small homeowners.</p>
            </div>
          </section>

          <section id="cgt-4">
            <h3 className="text-base font-bold text-[#202124] mb-2">4. Deductible Costs (Improving Your Net)</h3>
            <p className="text-sm text-[#5f6368] mb-2">While Nepal uses a simple sale-minus-purchase logic, you can sometimes adjust for documented registration fees and legal costs.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Note:** Brokerage fees are generally not deductible unless paid via bank transfer to a VAT-registered agency. Always keep your previous Malpot receipts to prove your 'Purchase Price'.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating your tax, check the <a href="/calculator/property-registration/" className="text-[#1a73e8] font-bold hover:underline">Registration Fees</a> for your next purchase or use the <a href="/calculator/nepal-income-tax/" className="text-[#1a73e8] font-bold hover:underline">Income Tax Tool</a> for annual filing.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Is CGT mandatory on every sale?", answer: "No. If your total profit is less than Rs. 10 Lakh on a residential property that you have lived in, you may be exempt under current IRD rules." },
      { question: "Can I deduct brokerage fees from the profit?", answer: "Legally, only documented costs (like registration fees paid previously) are easily deductible. Brokerage fees are often hard to deduct unless paid through official banking channels." }
    ]
  },

  'nepal-tds': {
    title: "Nepal TDS Calculator | Withholding Tax on Services & Rent",
    description: "Calculate Tax Deducted at Source (TDS) in Nepal for professional services, rent, and commissions. Official IRD withholding rates 2081/82.",
    howToUse: [
      "Select Service Type: Professional (1.5%), Rent (10%), or Consultancy.",
      "Enter Invoice Amount: Input the gross amount before tax.",
      "Calculate: View the TDS amount and the net payment to the vendor."
    ],
    formula: {
      title: "TDS Calculation Formula",
      equation: "TDS = Gross_Amount x TDS_Rate",
      description: "TDS is a 'Pay-as-you-earn' tax system where the payer deducts a percentage of the payment and deposits it directly with the IRD on behalf of the receiver.",
      variables: [
        "Gross Amount = The total invoice value or payment amount before any statutory tax deduction",
        "TDS Rate = The specific withholding percentage (e.g., 1.5% for services, 10% for house rent)",
        "Net Payment = The actual cash amount received by the service provider after the TDS has been deducted",
        "PAN Status = The determining factor for the tax rate (Standard vs. Penal 15% rate for entities without a valid PAN)"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of TDS & Withholding Tax in Nepal</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">TDS Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#tds-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Professional Services (1.5%)</a>
            <a href="#tds-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> House Rent TDS Rules (10%)</a>
            <a href="#tds-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Filing Deadlines (25th of Month)</a>
            <a href="#tds-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> PAN vs. VAT TDS Differences</a>
            <a href="#tds-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> TDS Certificate (E-TDS) Retrieval</a>
          </div>
        </div>

        <div className="space-y-6">
          <section id="tds-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The 1.5% Professional Service Rule</h3>
            <p className="text-sm text-[#5f6368] mb-3">Most corporate payments for services (Audit, Legal, IT) attract a 1.5% TDS if the provider is registered.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Note:** If the service provider is NOT registered in the IRD system, the TDS rate typically jumps to **15%**. Always verify the PAN/VAT status of your vendors before making payments.</p>
            </div>
          </section>

          <section id="tds-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. House Rent TDS (The 10% Standard)</h3>
            <p className="text-sm text-[#5f6368] mb-2">In Nepal, the person or company renting a property is responsible for deducting 10% of the rent and depositing it as TDS.</p>
            <div className="p-4 bg-[#fff4e5] border border-[#ffe0b2] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Institutional Rule:** Many local municipalities now collect 'Rental Tax' directly. Ensure you aren't double-taxed by checking if your area requires IRD TDS or Local Government Rent Tax.</p>
            </div>
          </section>

          <section id="tds-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Filing Deadlines (25th Rule)</h3>
            <p className="text-sm text-[#5f6368] mb-2">TDS must be deposited in the government treasury within a strict timeframe to avoid penalties.</p>
            <div className="p-4 bg-[#fdf2f2] border-l-2 border-[#d93025] rounded-r-lg">
               <p className="text-xs text-[#3c4043] mb-0">**Deadline:** TDS must be filed and paid by the **25th day** of the following Nepali month. Late filing attracts interest and a flat penalty per day.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating TDS, ensure your annual returns are correct with the <a href="/calculator/nepal-income-tax/" className="text-[#1a73e8] font-bold hover:underline">Income Tax Calculator</a>. Managing a business? Check our <a href="/calculator/nepal-vat/" className="text-[#1a73e8] font-bold hover:underline">VAT Tool</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Is TDS refundable?", answer: "Yes, TDS is a credit toward your total income tax liability. When you file your annual tax return, the total TDS deducted is subtracted from your tax payable." },
      { question: "What is the deadline for depositing TDS?", answer: "TDS must be deposited with the IRD within 25 days of the end of the month in which the deduction was made." }
    ]
  },

  'nepse-wacc': {
    title: "NEPSE WACC Calculator | Share Weighted Average Cost Basis",
    description: "Calculate your Weighted Average Cost of Capital (WACC) for NEPSE shares. Essential for accurate profit reporting and CGT calculation on the Nepal Stock Exchange.",
    howToUse: [
      "Enter Purchase Quantity: Input the total number of shares bought in each lot.",
      "Enter Purchase Price: Include the broker commission and SEBON fees in your cost.",
      "Add Multiple Lots: Add all transactions for the same script to get the average.",
      "Analyze Result: Use the calculated WACC for your Meroshare EDIS declaration."
    ],
    formula: {
      title: "WACC Calculation Logic",
      equation: "WACC = Σ(Quantity x Price) / Total Quantity",
      description: "Weighted Average Cost of Capital in NEPSE represents the average price you paid for a stock across multiple buy orders, including all regulatory fees.",
      variables: [
        "Σ (Sigma) = Summation (The mathematical process of adding up the total cost of all individual purchase lots)",
        "Quantity = The total number of shares accumulated across all buy transactions for a specific script",
        "Cost Basis = The total purchase price including all regulatory fees such as Broker Commission and SEBON fees",
        "Adjusted WACC = The final weighted average cost of capital after accounting for bonus and right share issues"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of WACC & Cost Basis in NEPSE</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Stock Math Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#wacc-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> Why WACC is Mandatory in Meroshare</a>
            <a href="#wacc-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Including Commissions in Cost Basis</a>
            <a href="#wacc-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Adjusting for Bonus & Right Shares</a>
            <a href="#wacc-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> WACC for IPO vs. Secondary Market</a>
            <a href="#wacc-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Meroshare \"My Purchase Source\" Logic</a>
          </div>
        </div>

        <p className="text-sm text-[#3c4043] leading-relaxed mb-5">
          In the Nepal Stock Exchange (NEPSE), the 'WACC' is not just a metric—it is a legal requirement for 'Purchase Price' declaration in Meroshare. Failing to calculate WACC correctly can lead to overpayment of Capital Gains Tax. Use our <a href="/calculator/nepal-stocks/" className="text-[#1a73e8] font-bold hover:underline">Profit Calculator</a> to see how your WACC impacts your net return.
        </p>

        <div className="space-y-6">
          <section id="wacc-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. Why WACC is Mandatory?</h3>
            <p className="text-sm text-[#5f6368] mb-3">When you sell shares, the CDSC system requires a cost basis to calculate your CGT. The WACC represents this cost.</p>
            <div className="p-4 bg-[#fff4e5] border-l-2 border-[#ff9800] rounded-r-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Critical Step:** Always include the Rs. 25 DP charge and the SEBON fees when manually calculating your 'Purchase Price' if the system doesn't auto-fetch it.</p>
            </div>
          </section>

          <section id="wacc-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Adjusting for Bonus & Right Shares</h3>
            <p className="text-sm text-[#5f6368] mb-2">Bonus and Right shares lower your average cost. The WACC tool automatically averages these 'Free' or 'Subsidized' shares into your total portfolio value.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**WACC Formula for Bonus:** (Original Cost) / (Total Shares Including Bonus). This is why your WACC drops after a company issues a dividend.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating WACC, audit your dividend returns with the <a href="/calculator/nepse-bonus-tax/" className="text-[#1a73e8] font-bold hover:underline">Bonus Tax Tool</a> or check your <a href="/calculator/nepal-stocks/" className="text-[#1a73e8] font-bold hover:underline">Total Trading Profit</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the face value for IPO WACC?", answer: "For most IPOs in Nepal, the cost basis or WACC is the face value of Rs. 100 per share." },
      { question: "Do I include broker commission in WACC?", answer: "Yes. Your true cost basis includes the stock price plus the broker commission and the 0.015% SEBON fee." }
    ]
  },

  'nepse-bonus-tax': {
    title: "NEPSE Bonus & Dividend Tax Calculator | Share Return Analytics",
    description: "Calculate the net cash dividend and tax payable on bonus shares in Nepal. Updated for latest fiscal rules on bonus share taxation.",
    howToUse: [
      "Enter Shares Owned: Your total holding before the book closure.",
      "Bonus/Dividend %: Input the percentages announced by the company.",
      "Market Price: The current LTP or the price on the book closure day.",
      "Calculate: View your new share count and net cash in hand after tax."
    ],
    formula: {
      title: "Dividend Tax Formula",
      equation: "Net Cash = Gross_Dividend - (Gross_Dividend x Tax_Rate)",
      description: "Dividends in Nepal are subject to a 5% tax for individual residents. Bonus shares are also taxed based on their face value (usually Rs. 100).",
      variables: [
        "Bonus % = The percentage of additional shares issued by the company to its existing shareholders",
        "Face Value = The statutory unit price used for tax calculation (Standardized at Rs. 100 in Nepal)",
        "Tax Payable = The 5% final withholding tax calculated on the total face value of the bonus shares issued",
        "Price Adjustment = The mathematical reduction in market price applied by NEPSE on the book closure day"
      ]
    },
    content: (
      <>
        <h2 className="text-xl font-bold text-[#202124] mb-3">The Ultimate Encyclopedia of Dividends & Bonus Shares in Nepal</h2>
        
        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-5 border border-[#d2e3fc]">
          <h4 className="text-[#1967d2] font-bold text-base mb-2 mt-0">Dividend Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-[#3c4043]">
            <a href="#div-1" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>1.</span> The 5% Resident Dividend Tax Rule</a>
            <a href="#div-2" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>2.</span> Price Adjustment Formula (NEPSE)</a>
            <a href="#div-3" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>3.</span> Tax on Bonus Shares (Face Value Logic)</a>
            <a href="#div-4" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>4.</span> Right Share vs. Bonus Share Tax</a>
            <a href="#div-5" className="flex items-center gap-2 hover:text-[#1a73e8] hover:underline transition-colors"><span>5.</span> Book Closure & Eligibility Dates</a>
          </div>
        </div>

        <div className="space-y-6">
          <section id="div-1">
            <h3 className="text-base font-bold text-[#202124] mb-2">1. The 5% Resident Dividend Tax</h3>
            <p className="text-sm text-[#5f6368] mb-3">Nepal's tax law (Income Tax Act 2058) mandates a 5% final withholding tax on cash dividends paid to individual residents by NEPSE-listed companies.</p>
            <div className="p-4 bg-[#f8f9fa] border border-[#dadce0] rounded-xl">
               <p className="text-xs text-[#3c4043] mb-0">**Institutional Note:** The company automatically deducts this 5% before depositing the cash in your bank account. You do not need to pay it manually.</p>
            </div>
          </section>

          <section id="div-2">
            <h3 className="text-base font-bold text-[#202124] mb-2">2. NEPSE Price Adjustment Logic</h3>
            <p className="text-sm text-[#5f6368] mb-3">On the book closure day, NEPSE adjusts the market price of a stock to account for the bonus shares being issued.</p>
            <div className="p-4 bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl">
               <p className="text-xs text-[#3c4043] font-bold mb-1">Adjusted Price = (Market Price) / (1 + Bonus Percentage)</p>
               <p className="text-[10px] text-[#5f6368] mb-0">Example: If a stock is Rs. 1100 and gives 10% bonus, the adjusted price becomes 1100 / 1.1 = Rs. 1000. This maintains the market capitalization of the company.</p>
            </div>
          </section>

          <section id="div-3">
            <h3 className="text-base font-bold text-[#202124] mb-2">3. Tax on Bonus Shares</h3>
            <p className="text-sm text-[#5f6368] mb-2">A common point of confusion is how 'Free' bonus shares are taxed. In Nepal, bonus shares are taxed at 5% of their **Face Value** (Rs. 100), not the market value.</p>
            <div className="p-4 bg-[#fdf2f2] border-l-2 border-[#d93025] rounded-r-lg">
               <p className="text-xs text-[#3c4043] mb-0">**Tax Math:** If you get 10 bonus shares, the tax is 5% of (10 x 100) = Rs. 50. If the company didn't announce enough cash dividend to cover this, you must pay it manually via your broker.</p>
            </div>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f1f3f4] text-center">
           <p className="text-[11px] text-[#5f6368]">
              NepaCalc Internal Silo: After calculating dividends, verify your portfolio's <a href="/calculator/nepse-wacc/" className="text-[#1a73e8] font-bold hover:underline">WACC Basis</a> or check your <a href="/calculator/nepal-stocks/" className="text-[#1a73e8] font-bold hover:underline">Trading Profits</a>.
           </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How much is the tax on cash dividends?", answer: "For individual residents in Nepal, the cash dividend tax is 5%." },
      { question: "Is bonus share tax different from cash dividend tax?", answer: "The rate is the same (5%), but bonus share tax is calculated on the face value (Rs. 100) of the shares issued, not the market value." }
    ]
  }
};
