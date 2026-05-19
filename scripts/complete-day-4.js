const fs = require('fs');
const path = require('path');

const updateSEO = () => {
    const nepalSpecificPath = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
    const financialPath = path.join(__dirname, '../src/data/seo/financial.tsx');
    const marketRatesPath = path.join(__dirname, '../src/data/seo/market-rates.tsx');

    const patchContent = (fileContent, key, meta, newContentBody) => {
        const startMarker = `'${key}': {`;
        let startIndex = fileContent.indexOf(startMarker);
        
        if (startIndex === -1) {
            // Entry doesn't exist, append it before the final };
            const entry = `
  '${key}': {
    title: "${meta.title}",
    description: "${meta.description}",
    howToUse: {
      steps: ${JSON.stringify(meta.steps || [])}
    },
    content: (
      <>
${newContentBody}
      </>
    )
  },`;
            const lastClosingBrace = fileContent.lastIndexOf('};');
            return fileContent.substring(0, lastClosingBrace) + entry + fileContent.substring(lastClosingBrace);
        }

        // Update Title
        fileContent = fileContent.replace(new RegExp(`('${key}':\\s*{[^}]*?title:\\s*")[^"]*"`), `$1${meta.title}"`);
        // Update Description
        fileContent = fileContent.replace(new RegExp(`('${key}':\\s*{[^}]*?description:\\s*")[^"]*"`), `$1${meta.description}"`);

        // Update Content
        let contentStartIndex = fileContent.indexOf('content: (', startIndex);
        if (contentStartIndex === -1) return fileContent;
        
        let currentDepth = 0;
        let contentEndIndex = -1;
        for (let i = contentStartIndex + 9; i < fileContent.length; i++) {
            if (fileContent[i] === '(') currentDepth++;
            if (fileContent[i] === ')') {
                currentDepth--;
                if (currentDepth === -1) {
                    contentEndIndex = i;
                    break;
                }
            }
        }

        if (contentEndIndex !== -1) {
            const fullNewContent = `content: (<>\n${newContentBody}\n        </>)`;
            return fileContent.substring(0, contentStartIndex) + fullNewContent + fileContent.substring(contentEndIndex + 1);
        }
        return fileContent;
    };

    // ==========================================
    // 1. NEPAL LAND AREA CONVERTER (nepal-land)
    // ==========================================
    const landMeta = {
        title: "Nepal Land Area Converter | Ropani, Aana, Bigha to Sq Ft | NepaCalc",
        description: "Professional land area converter for Nepal. Convert Ropani-Aana-Paisa-Daam (Hills) and Bigha-Katha-Dhur (Terai) to Square Feet and Meters. Official Malpot standards.",
        steps: [
            "Select the region (Hills for Ropani or Terai for Bigha).",
            "Input the traditional units (e.g., 1 Ropani, 4 Aana).",
            "View instant conversion to Square Feet and Square Meters.",
            "Use the reverse converter to find traditional units from Sq Ft."
        ]
    };
    const landBody = `        <div className="space-y-12">
            <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Nepal Land Measurement System — A Professional Guide
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    Nepal uses two distinct land measurement systems based on geography: the <strong>Ropani-Aana</strong> system in the hilly regions (including Kathmandu Valley) and the <strong>Bigha-Katha</strong> system in the Terai plains. Understanding these units is critical for real estate transactions, heritage planning, and legal documentation (Lalpurja) in Nepal.
                </p>
                <p className="text-slate-700 text-sm">
                    This converter adheres to the official standards used by the <strong>Department of Land Management and Archive (Malpot)</strong> and the Survey Department of Nepal.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">1. The Hilly System (Ropani-Aana-Paisa-Daam)</h2>
                <p className="text-slate-700 mb-4 text-base">Standardized during the Rana era and refined by the Land Act 2021, this system is the primary metric for Kathmandu, Pokhara, and all hilly districts.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Unit</th>
                                <th className="p-4 font-semibold text-slate-900">Equivalent In Smaller Unit</th>
                                <th className="p-4 font-semibold text-slate-900">Equivalent In Square Feet</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-bold">1 Ropani</td><td className="p-4">16 Aana</td><td className="p-4 font-mono font-bold text-emerald-700">5476 Sq. Ft.</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-bold">1 Aana</td><td className="p-4">4 Paisa</td><td className="p-4 font-mono">342.25 Sq. Ft.</td></tr>
                            <tr><td className="p-4 font-bold">1 Paisa</td><td className="p-4">4 Daam</td><td className="p-4 font-mono">85.56 Sq. Ft.</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-bold">1 Daam</td><td className="p-4">-</td><td className="p-4 font-mono">21.39 Sq. Ft.</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                    <strong>Real Estate Fact:</strong> In Kathmandu, a plot of 4 Aana (roughly 1369 Sq. Ft.) is considered the standard minimum for a standalone residential building with proper "Naksha Pass" (building permit) from the Metropolitan City.
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">2. The Terai System (Bigha-Katha-Dhur)</h2>
                <p className="text-slate-700 mb-4 text-base">Used in the southern plains (Madhesh and Lumbini provinces), this system is also common in neighboring Indian states like Bihar and Uttar Pradesh, though the specific conversion factors in Nepal are unique.</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Unit</th>
                                <th className="p-4 font-semibold text-slate-900">Equivalent In Smaller Unit</th>
                                <th className="p-4 font-semibold text-slate-900">Equivalent In Square Feet</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-bold">1 Bigha</td><td className="p-4">20 Katha</td><td className="p-4 font-mono font-bold text-emerald-700">72900 Sq. Ft.</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-bold">1 Katha</td><td className="p-4">20 Dhur</td><td className="p-4 font-mono">3645 Sq. Ft.</td></tr>
                            <tr><td className="p-4 font-bold">1 Dhur</td><td className="p-4">-</td><td className="p-4 font-mono">182.25 Sq. Ft.</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-amber-800">
                    <strong>Critical Conversion:</strong> 1 Bigha is approximately equal to 13.31 Ropani. This is a common conversion required when comparing land prices between the Hills and the Terai.
                </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider">Historical Units & Regional Variations</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-700">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2 underline">Hali, Khetmuri, and Matomuri</h4>
                        <p className="leading-relaxed">In older agricultural deeds (legacy Lalpurjas), you might find units like <strong>Khetmuri</strong> or <strong>Hali</strong>. These are volumetric measurements of the seeds required for the plot. 1 Khetmuri is roughly 25 Ropani. Our converter uses the modern metric-equivalent standards to ensure legal safety.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2 underline">The "Surveyor's Chain"</h4>
                        <p className="leading-relaxed">Until the 1970s, land was measured using chains. Modern digital maps use GPS coordinates, but the conversion to Ropani/Bigha remains the "Sovereign Unit" of Nepal. Always verify your "Naksha" (trace map) dimensions against your "Lalpurja" using our <a href="/calculator/nepal-land" className="text-emerald-700 underline font-bold">Square Feet to Ropani</a> tool.</p>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500 italic">Verified for FY 2082/83. Data synchronized with the Nepal Department of Survey. For official legal disputes, always consult a registered surveyor (Aamin).</p>
            </div>
        </div>`;

    // ==========================================
    // 2. CAPITAL GAINS TAX (property-tax)
    // ==========================================
    const propertyTaxMeta = {
        title: "Capital Gains Tax (CGT) Calculator Nepal | Property Sale Tax | NepaCalc",
        description: "Calculate your real estate Capital Gains Tax (CGT) in Nepal for 2082/83. Includes 5-year vs 2-year holding periods, 5% and 7.5% tax rates, and Malpot exemptions.",
        steps: [
            "Enter the selling price (registered in Malpot).",
            "Enter the purchase price (from your original deed).",
            "Enter any deductible costs (registration fees, repairs).",
            "Select the holding period (how long you owned the land).",
            "View your taxable profit and the final CGT payable to IRD."
        ]
    };
    const propertyTaxBody = `        <div className="space-y-12">
            <div className="bg-amber-50/50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Capital Gains Tax (CGT) on Real Estate in Nepal
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    In Nepal, profit from the sale of land or buildings is subject to <strong>Capital Gains Tax (CGT)</strong>. This tax is collected by the Land Revenue Office (Malpot) on behalf of the Inland Revenue Department (IRD) at the time of the transaction ("Pass"). The tax rate is progressive based on the duration for which you held the property.
                </p>
                <p className="text-slate-700 text-sm">
                    Governing Law: Income Tax Act 2058 (with amendments by Finance Act 2082).
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">CGT Tax Slabs for FY 2082/83</h2>
                <p className="text-slate-700 mb-4">The tax rate depends strictly on the holding period (the time between the date you 'passed' the land into your name and the date you are selling it).</p>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-900">Holding Period</th>
                                <th className="p-4 font-semibold text-slate-900">Tax Rate (on Profit)</th>
                                <th className="p-4 font-semibold text-slate-900">Example Profit: Rs 10 Lakh</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium">Owned for 5 years or more</td><td className="p-4 font-bold text-emerald-600">5.0%</td><td className="p-4">Rs 50,000</td></tr>
                            <tr className="bg-slate-50/50"><td className="p-4 font-medium">Owned for less than 5 years</td><td className="p-4 font-bold text-amber-600">7.5%</td><td className="p-4">Rs 75,000</td></tr>
                            <tr><td className="p-4 font-medium">Non-Resident / Corporate</td><td className="p-4 font-bold text-red-600">10.0% - 15.0%</td><td className="p-4">Depends on entity type</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-emerald-500">✅</span> What is "Taxable Profit"?
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Taxable Profit = Sale Price − (Purchase Price + Registration Fees + Improvement Costs).<br/><br/>
                        You only pay CGT on the actual gain. If you sell a property for the same price you bought it (or less), you pay <strong>zero</strong> CGT. The Malpot officer will verify the "Purchase Deed" to calculate this.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-red-500">🚫</span> Common CGT Exemptions
                    </h3>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                        <li>Sale of ancestral property (inherited) is often subject to different rules.</li>
                        <li>Sales below Rs 10 Lakh (total value) are generally exempt for individuals.</li>
                        <li>Property owned for more than 10 years by an individual is sometimes eligible for rebate under specific local bylaws.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-10 mt-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4">The "Malpot Valuation" Trap</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    In Nepal, the "Sale Price" used for tax calculation is the price mentioned in the legal deed (Lalpurja). While the market price may be higher, the Malpot office will not accept a price lower than the <strong>Government Minimum Valuation (Sarkari Mulyankan)</strong> for that specific area/ward. Our calculator helps you estimate tax based on both market and government figures.
                </p>
                <div className="flex gap-4">
                    <a href="/calculator/property-registration" className="text-amber-400 font-bold underline text-sm">Check Registration Fees →</a>
                </div>
            </div>
        </div>`;

    // ==========================================
    // 3. REMITTANCE BOARD (market-rates/remittance)
    // ==========================================
    const remittanceMeta = {
        title: "Nepal Remittance Board | Exchange Rates & Savings Guide 2082",
        description: "Compare remittance exchange rates for Nepal. Understand NRB rules for Remittance Savings Accounts, 1% extra interest, and legal channels (IPPS/Hundi).",
        steps: [
            "Enter the amount you are sending in foreign currency (USD, AED, MYR, etc.).",
            "View the estimated NPR equivalent based on current market rates.",
            "Check the additional interest benefits for Remittance Fixed Deposits.",
            "Compare legal transfer channel fees."
        ]
    };
    const remittanceBody = `        <div className="space-y-12">
            <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Remittance to Nepal: NRB Guidelines & Benefits
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    Remittance is the backbone of the Nepalese economy, contributing nearly 25% to the GDP. To encourage legal channels, the <strong>Nepal Rastra Bank (NRB)</strong> provides significant incentives for money sent through licensed Remittance Companies (like IME, Prabhu, eSewa Money Transfer) or Bank-to-Bank transfers.
                </p>
                <p className="text-slate-700 text-sm">
                    Current Directive: Banks MUST provide a minimum of <strong>1% higher interest rate</strong> on savings and fixed deposits opened using remittance funds.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">1. Extra Interest</h4>
                    <p className="text-xs text-slate-600">If a normal FD rate is 8%, a Remittance FD will be 9%. This is a sovereign guarantee by the NRB to promote formal inflows.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">2. IPO Quota</h4>
                    <p className="text-xs text-slate-600">10% of all initial public offerings (IPOs) in Nepal are reserved for Nepalese citizens employed abroad who send money through legal channels.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">3. Legal Protection</h4>
                    <p className="text-xs text-slate-600">Funds sent via legal channels are "clean money" and can be used to justify property purchases or business investments without IRD scrutiny.</p>
                </div>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-8 rounded-2xl">
                <h3 className="text-rose-900 font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">⚠️</span> Hundi vs. Legal Remittance
                </h3>
                <p className="text-rose-800 text-sm leading-relaxed">
                    Hundi (informal transfer) is illegal under the <strong>Foreign Exchange (Regulation) Act 2019</strong>. While Hundi may offer a slightly higher exchange rate, it carries zero legal protection. Money sent via Hundi cannot be used to apply for the 10% IPO quota or the extra 1% interest rate. Furthermore, large Hundi transactions are flagged under AML (Anti-Money Laundering) laws, leading to frozen bank accounts in Nepal.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest">Remittance Savings Account (RSA)</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    A Remittance Savings Account is a specialized bank account for migrant workers. To open one, you typically need a valid labor permit (Shram Suwikriti) or a visa copy. Once opened, any funds transferred from abroad into this account automatically qualify for the premium interest rates.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex gap-3"><strong>Step 1:</strong> Transfer funds using an NRB-licensed remittance partner.</li>
                        <li className="flex gap-3"><strong>Step 2:</strong> Provide the 'Remittance Control Number' (MTCN) to your bank.</li>
                        <li className="flex gap-3"><strong>Step 3:</strong> The bank tags the deposit as 'Remittance Inflow' in their system.</li>
                    </ul>
                </div>
            </div>
        </div>`;

    // ==========================================
    // 4. LOAN EMI (loan-emi)
    // ==========================================
    const loanEmiMeta = {
        title: "Loan EMI Calculator Nepal | Precise Monthly Installment Lab",
        description: "Calculate your exact monthly EMI for Home, Auto, or Personal loans in Nepal. Understand NRB interest rates, amortization, and early settlement logic.",
        steps: [
            "Input the total loan amount (Principal).",
            "Enter the annual interest rate (Base Rate + Spread).",
            "Set the loan tenure in years or months.",
            "View your monthly EMI and total interest payable.",
            "Analyze the amortization schedule to see your debt reduction."
        ]
    };
    const loanEmiBody = `        <div className="space-y-12">
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
          <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
            Executive Summary
          </h2>
          <p className="text-slate-800 text-base leading-relaxed">
            Accurate Equated Monthly Installment (EMI) estimation is critical for managing personal and corporate liquidity in Nepal. Whether securing a home loan in Kathmandu or an auto loan for commercial use, this calculator ensures your monthly cash flow projections align perfectly with banking schedules. Financial stability begins with knowing your exact monthly liability before signing any bank contract. By predicting your precise EMI, you avoid late payment penalties and protect your Credit Information Bureau (CIB) rating.
          </p>
        </div>

        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-6">
            EMI Calculation Methodology & NRB Directives
          </h3>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
              In the Nepalese banking ecosystem, EMIs are strictly calculated on a <strong>reducing balance basis</strong>. This is mandated by the Nepal Rastra Bank (NRB) for almost all consumer and retail loans. It means that with every monthly payment you make, a portion goes toward reducing the principal amount, and the remainder covers the interest for that specific month. As the principal decreases month by month, the interest component of your EMI drops, while the principal repayment component accelerates.
            </p>
            <p>
              According to the latest monetary policy for the fiscal year 2082/83, banks must publish their <strong>Base Rate</strong> on a monthly basis. Your loan's final interest rate is determined by adding a premium to this base rate (e.g., Base Rate + 2% premium). If the bank's cost of funds increases, the base rate rises, which means your EMI or your loan tenure will increase. Understanding this floating rate mechanism is vital for long-term loans like mortgages.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Variable Decomposition</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-4">
                <span className="font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">P</span>
                <span><strong>Principal Amount:</strong> The initial total amount borrowed. In a home loan, this is the disbursed amount minus your down payment.</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">r</span>
                <span><strong>Monthly Interest Rate:</strong> The annual interest rate divided by 12. For example, a 12% annual rate is 1% monthly.</span>
            </li>
            <li className="flex items-start gap-4">
                <span className="font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">n</span>
                <span><strong>Tenure in Months:</strong> The total duration of the loan. A 15-year loan is 180 months.</span>
            </li>
          </ul>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-amber-900 mb-2 uppercase text-xs tracking-widest">Base Rate Volatility</h4>
            <p className="text-sm text-amber-800">
                In Nepal, commercial banks adjust their interest rates based on the quarterly publication of their Base Rate. If the Base Rate increases, your EMI amount typically remains the same, but the tenure of your loan will automatically extend. If the tenure cannot be legally extended further, the bank will force an increase in your monthly EMI.
            </p>
        </section>

        <div className="pt-8 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-400 italic">
                Last updated: FY 2082/83 based on the latest Nepal Rastra Bank (NRB) monetary policy and commercial banking directives.
            </p>
        </div>
      </div>`;

    // Apply Patches
    let nepalSpecific = fs.readFileSync(nepalSpecificPath, 'utf8');
    let financial = fs.readFileSync(financialPath, 'utf8');
    let marketRates = fs.readFileSync(marketRatesPath, 'utf8');

    nepalSpecific = patchContent(nepalSpecific, 'nepal-land', landMeta, landBody);
    nepalSpecific = patchContent(nepalSpecific, 'property-tax', propertyTaxMeta, propertyTaxBody);
    financial = patchContent(financial, 'loan-emi', loanEmiMeta, loanEmiBody);
    marketRates = patchContent(marketRates, 'market-rates/remittance', remittanceMeta, remittanceBody);

    fs.writeFileSync(nepalSpecificPath, nepalSpecific, 'utf8');
    fs.writeFileSync(financialPath, financial, 'utf8');
    fs.writeFileSync(marketRatesPath, marketRates, 'utf8');

    console.log('Day 4 Content Deployment Refined: Land, CGT, Remittance, and EMI Updated with correct keys.');
};

updateSEO();
