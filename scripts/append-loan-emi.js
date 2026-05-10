const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo/financial.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const loanEmiSeo = `
  'loan-emi': {
    title: "Loan EMI Calculator Nepal | Precise Monthly Installment Lab",
    description: "Calculate your exact monthly EMI for Home, Auto, or Personal loans in Nepal. Understand NRB interest rates, amortization, and early settlement logic.",
    howToUse: {
      steps: [
        "Input the total loan amount (Principal).",
        "Enter the annual interest rate.",
        "Set the loan tenure in years or months.",
        "View your monthly EMI and total interest payable.",
        "Analyze the amortization schedule."
      ]
    },
    formula: {
      title: "The Equated Monthly Installment (EMI) Formula",
      description: "Our engine uses the standard amortization formula to calculate precise monthly payouts.",
      latex: "$$E = P \\\\times r \\\\times \\\\frac{(1 + r)^n}{(1 + r)^n - 1}$$"
    },
    content: (
      <div className="space-y-12">
        {/* SECTION 1: QUICK SUMMARY */}
        <div className="bg-[#1a1a2e] border-l-4 border-blue-500 rounded-r-xl p-8 shadow-sm">
          <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-3">Executive Summary</h2>
          <p className="text-white text-base leading-relaxed">
            Accurate Equated Monthly Installment (EMI) estimation is critical for managing personal and corporate liquidity in Nepal. Whether securing a home loan in Kathmandu or an auto loan for commercial use, this calculator ensures your monthly cash flow projections align perfectly with banking schedules.
            <br/><br/>
            <span className="text-sm text-slate-400">
              Related Tool: Try our <a href="/calculator/nepal-home-loan" className="text-blue-400 hover:text-blue-300 underline font-bold">Home Loan Limit Calculator</a> to verify eligibility.
            </span>
          </p>
        </div>

        {/* SECTION 2: EEAT DEEP DIVE */}
        <section>
          <h3 className="text-2xl font-black text-white mb-6">EMI Calculation Methodology & NRB Directives</h3>
          <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
            <p>
              In the Nepalese banking ecosystem, EMIs are strictly calculated on a <strong>reducing balance basis</strong>. This means that with every monthly payment you make, a portion goes toward the principal and the remainder covers the interest for that month. As the principal decreases, the interest component of your EMI drops, accelerating your journey to being debt-free.
            </p>
            
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-5 my-8 flex gap-4 items-start">
              <div className="text-amber-500 text-xl">💡</div>
              <div>
                <strong className="block text-amber-500 text-sm uppercase tracking-wider mb-1">Common Pitfall</strong>
                <p className="text-sm text-amber-200/80 m-0">
                  Many borrowers confuse a "Flat Interest Rate" with a "Reducing Balance Rate". A 10% flat rate actually equates to nearly a 17-18% effective reducing rate over a 5-year tenure. Always confirm with your bank that the quoted rate is on a reducing balance!
                </p>
              </div>
            </div>
            
            <p>
              According to the latest Nepal Rastra Bank (NRB) directives for the fiscal year 2081/82, banks must publish their <strong>Base Rate</strong> monthly. Your loan's final interest rate is determined by adding a premium (e.g., Base Rate + 2%). Understanding this fluctuation is vital for long-term variable rate loans.
            </p>
          </div>
        </section>

        {/* SECTION 2.5: VARIABLE LEGEND */}
        <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-black text-blue-400 mb-6 flex items-center gap-3">
            <span>📐</span> Variable Decomposition
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-300">
                P
              </div>
              <div>
                <strong className="text-white block mb-1">Principal Amount (The Loan)</strong>
                <p className="text-sm text-slate-400 leading-relaxed m-0">
                  The initial total amount borrowed from the financial institution before any interest is applied.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-900/50 border border-green-500/30 flex items-center justify-center font-mono font-bold text-green-300">
                r
              </div>
              <div>
                <strong className="text-white block mb-1">Monthly Interest Rate</strong>
                <p className="text-sm text-slate-400 leading-relaxed m-0">
                  The annual interest rate divided by 12. For an annual rate of 12%, the monthly rate (r) is 1% (or 0.01 in decimal).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-900/50 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-purple-300">
                n
              </div>
              <div>
                <strong className="text-white block mb-1">Tenure in Months</strong>
                <p className="text-sm text-slate-400 leading-relaxed m-0">
                  The total duration of the loan. A 5-year auto loan equates to 60 monthly installments (n = 60).
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* SECTION 3: VARIABLE CARDS */}
        <section>
          <h3 className="text-2xl font-black text-white mb-6">Critical Loan Parameters in Nepal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Base Rate Volatility</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                In Nepal, commercial banks adjust their interest rates based on the quarterly publication of their Base Rate. If the Base Rate increases, your EMI amount may remain the same, but the tenure of your loan will automatically extend.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-green-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Prepayment Penalties</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                If you decide to settle your loan early using a bonus or remittance, banks typically charge a prepayment penalty. The NRB generally caps this fee (often between 1% to 2% of the outstanding principal) for retail loans.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Processing Fees</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Before the loan is disbursed, a service/processing fee is deducted. The NRB strictly prohibits banks from charging more than 0.75% for certain retail loans, protecting consumers from hidden upfront costs.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-orange-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Equated Debt Burden</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Banks use an EMI-to-Income ratio (often capped at 50%) to determine eligibility. Your total monthly EMI obligations across all loans cannot exceed half of your verifiable monthly net income.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 4: CASE STUDY */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white relative overflow-hidden shadow-lg border border-slate-700">
           <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-4">
              Strategic Case Study: Auto Loan in Kathmandu
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Consider a professional taking an auto loan to purchase a vehicle worth Rs. 40 Lakhs. The bank finances 50% (Rs. 20 Lakhs) at an interest rate of 10.5% over a 5-year tenure (60 months).
            </p>
            
            <div className="bg-black/40 p-6 rounded-xl border border-white/10 font-mono text-sm relative group">
              <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-md text-slate-300 transition-colors flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                <span>📋</span> Copy Example
              </button>
              
              <div className="mb-2"><span className="text-blue-400">Principal (P):</span> Rs. 20,00,000</div>
              <div className="mb-2"><span className="text-blue-400">Interest (r):</span> 10.5% Annually</div>
              <div className="mb-2"><span className="text-blue-400">Tenure (n):</span> 60 Months</div>
              
              <div className="mt-6 pt-4 border-t border-white/20 font-bold text-green-400 text-base">
                Calculated EMI: Rs. 42,987 per month
              </div>
              <div className="mt-2 text-slate-400">
                Total Interest Paid: Rs. 5,79,220 over 5 years
              </div>
            </div>
          </div>
        </section>
        
        {/* SECTION 5: TRUST SIGNALS */}
        <div className="pt-8 border-t border-slate-800 text-center">
           <p className="text-sm text-slate-400 mb-2">
             Ready to verify your loan capacity? Try our <a href="/calculator/nepal-home-loan" className="text-blue-400 hover:text-blue-300 underline font-bold">Eligibility Calculator</a>.
           </p>
           <p className="text-[10px] text-slate-500 italic">
             Last updated: Baishakh 2081 (May 2024) based on the latest Nepal Rastra Bank monetary policy.
           </p>
        </div>
      </div>
    ),
    faqs: [
      { question: "Can the bank increase my EMI midway?", answer: "Usually, banks keep the EMI constant but increase the tenure of your loan if the Base Rate goes up. If the tenure cannot be extended further, they will recalculate and increase the EMI." },
      { question: "Is a Fixed Interest Rate better than a Variable Rate in Nepal?", answer: "Fixed rates (e.g., fixed for 5 years) provide peace of mind against base rate fluctuations, but they are generally priced 1-2% higher than the initial variable rate." },
      { question: "What happens if I miss an EMI payment?", answer: "Missing an EMI incurs a penal interest charge (often an additional 2% on the overdue amount) and negatively impacts your Credit Information Bureau (CIB) score, affecting future borrowing." },
      { question: "How is interest calculated in the first month?", answer: "In the first month, interest is calculated on the entire Principal amount. For a Rs. 10 Lakh loan at 12%, the first month's interest is Rs. 10,000. The rest of your EMI goes toward reducing the 10 Lakh principal." }
    ]
  },
`;

content = content.replace('};', loanEmiSeo + '\n};');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Appended loan-emi to financial.tsx');
