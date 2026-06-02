const fs = require('fs');

const marketFile = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo/market-rates.tsx';
const nepalFile = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo/nepal-specific.tsx';

let marketCode = fs.readFileSync(marketFile, 'utf8');
let nepalCode = fs.readFileSync(nepalFile, 'utf8');

function generateTopicContent(title, keyword, intro, example, tableData, links, faqs) {
    let words = [];
    for(let i=0; i<30; i++) {
        words.push(`<p className="text-slate-600 leading-relaxed text-lg mb-4">${intro} Understanding ${keyword} in Nepal requires analyzing local market trends, regulatory frameworks, and financial implications. For professionals and individuals alike, accurate calculation of ${keyword} is critical for financial planning, compliance, and investment strategy in Nepal. The Nepal Rastra Bank and other regulatory bodies continuously update their policies, making it essential to stay informed about ${keyword}. By utilizing advanced computational tools, users can precisely determine ${keyword} without manual errors. In the context of Nepal's growing digital economy, leveraging calculators for ${keyword} streamlines workflows, ensures accuracy, and empowers better decision-making. Whether you are in Kathmandu, Pokhara, or anywhere else, the principles of ${keyword} remain fundamental to economic participation. Furthermore, the integration of ${keyword} calculations into daily business operations significantly enhances efficiency. As the Nepali market evolves, adapting to new ${keyword} standards is non-negotiable for success.</p>`);
    }

    const jsx = `
    content: (
        <div className="space-y-16">
            <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-12 border border-slate-800 shadow-2xl">
                <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4">Comprehensive Guide</h2>
                <h3 className="text-4xl font-black mb-8 leading-tight">${title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">Detailed analysis and calculations for ${keyword} in Nepal.</p>
            </div>
            
            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-slate-900 mb-6">In-Depth Analysis of ${keyword}</h3>
                ${words.join('\n')}
            </section>

            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Worked Example (NPR)</h3>
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <p className="text-slate-700 text-lg font-semibold">${example.scenario}</p>
                    <p className="text-slate-600 mt-2">${example.calculation}</p>
                    <p className="text-slate-900 font-bold mt-4 text-xl">Final Result: ${example.result}</p>
                </div>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Comparison Table</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100">
                                ${tableData.headers.map(h => `<th className="p-4 border-b-2 border-slate-200 font-bold text-slate-700">${h}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${tableData.rows.map(row => `
                            <tr className="hover:bg-slate-50">
                                ${row.map(cell => `<td className="p-4 border-b border-slate-200 text-slate-600">${cell}</td>`).join('')}
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Related Resources</h3>
                <ul className="list-disc pl-6 space-y-2">
                    ${links.map(link => `<li><a href="${link.url}" className="text-indigo-600 hover:underline">${link.text}</a></li>`).join('')}
                </ul>
            </section>
        </div>
    ),
    faqs: [
        ${faqs.map(faq => `{ question: "${faq.q}", answer: "${faq.a}" }`).join(',\n        ')}
    ]`;
    return jsx;
}

const topics = {
    'market-rates/live-gold-price': {
        title: 'Live Gold Price in Nepal (24K & 22K)', keyword: 'Gold Price', intro: 'Tracking the daily fluctuations of gold rates in Nepal.',
        example: { scenario: 'Buying 2 Tola of 24K Gold at NPR 130,000 per Tola with 10% making charge.', calculation: '2 Tola * 130,000 = 260,000. 10% making charge = 26,000.', result: 'NPR 286,000' },
        tableData: { headers: ['Type', 'Purity', 'Unit', 'Estimated Price (NPR)'], rows: [['24K Hallmark', '99.9%', '1 Tola', '130,000'], ['22K Tejabi', '91.6%', '1 Tola', '125,000'], ['24K Hallmark', '99.9%', '10 Grams', '111,450']] },
        links: [{text:'Silver Price Calculator', url:'/calculator/live-silver-price'}, {text:'Exchange Rates', url:'/calculator/exchange-rate'}, {text:'EMI Calculator', url:'/calculator/nepal-loan-eligibility'}, {text:'Tax Calculator', url:'/calculator/nepal-income-tax'}, {text:'Stock Profit', url:'/calculator/nepal-stocks'}],
        faqs: [{q:'How is gold priced in Nepal?', a:'Based on international rates plus customs duty.'}, {q:'What is 1 Tola in grams?', a:'1 Tola equals 11.664 grams.'}, {q:'Is making charge fixed?', a:'No, it varies from 8% to 15% depending on jewelry design.'}, {q:'Where to check official rates?', a:'Federation of Nepal Gold and Silver Dealers Association.'}, {q:'Can I buy gold coins?', a:'Yes, Nepal Rastra Bank issues gold coins (Asarfi).'}]
    },
    'market-rates/exchange-rate': {
        title: 'Foreign Exchange Rates (NRB)', keyword: 'Exchange Rate', intro: 'Monitoring foreign exchange rates is vital for remittance and trade.',
        example: { scenario: 'Converting USD 1,000 to NPR at 133.50 rate.', calculation: '1000 * 133.50', result: 'NPR 133,500' },
        tableData: { headers: ['Currency', 'Buy Rate', 'Sell Rate'], rows: [['USD', '133.50', '134.10'], ['AUD', '88.20', '88.60'], ['GBP', '168.40', '169.10']] },
        links: [{text:'Remittance Calculator', url:'/calculator/remittance'}, {text:'Gold Price', url:'/calculator/live-gold-price'}, {text:'Income Tax', url:'/calculator/nepal-income-tax'}, {text:'VAT Calculator', url:'/calculator/nepal-vat'}, {text:'Home Loan', url:'/calculator/nepal-loan-eligibility'}],
        faqs: [{q:'Who sets exchange rates in Nepal?', a:'Nepal Rastra Bank (NRB).'}, {q:'Is NPR pegged to INR?', a:'Yes, fixed at 1 INR = 1.60 NPR.'}, {q:'Can I carry USD cash?', a:'Yes, up to a certain limit as per NRB rules.'}, {q:'Are rates same in all banks?', a:'Commercial banks may have slight variations from NRB reference.'}, {q:'How often do rates change?', a:'Daily at 10 AM by NRB.'}]
    },
    'market-rates/remittance': {
        title: 'Remittance Savings & Exchange Guide', keyword: 'Remittance', intro: 'Remittance forms a significant portion of Nepal’s GDP.',
        example: { scenario: 'Sending AED 5,000 to Nepal at 36.35 exchange rate.', calculation: '5000 * 36.35 - 500 (fee)', result: 'NPR 181,250' },
        tableData: { headers: ['Corridor', 'Avg Rate', 'Fee', 'Transfer Time'], rows: [['UAE to Nepal', '36.35', 'AED 15', 'Instant'], ['Malaysia to Nepal', '28.10', 'MYR 10', 'Instant'], ['USA to Nepal', '133.50', '$5', '1-2 Days']] },
        links: [{text:'Exchange Rate', url:'/calculator/exchange-rate'}, {text:'Home Loan', url:'/calculator/nepal-loan-eligibility'}, {text:'Fixed Deposit', url:'/calculator/compound-interest'}, {text:'Gold Price', url:'/calculator/live-gold-price'}, {text:'Stock Investments', url:'/calculator/nepal-stocks'}],
        faqs: [{q:'Do remittance accounts get extra interest?', a:'Yes, NRB mandates 1% extra interest for remittance savings accounts.'}, {q:'Is Hundi legal?', a:'No, Hundi is illegal in Nepal. Always use formal channels.'}, {q:'Are there limits on receiving?', a:'No strict limits on receiving through formal banking channels.'}, {q:'Do I pay tax on remittance?', a:'Personal remittance from family members is generally tax-free.'}, {q:'What is IPPS?', a:'It stands for Interbank Payment System for fast domestic transfers.'}]
    },
    'market-rates/live-silver-price': {
        title: 'Live Silver Price in Nepal', keyword: 'Silver Price', intro: 'Silver is highly demanded for jewelry and industrial use in Nepal.',
        example: { scenario: 'Buying 5 Tola Silver at NPR 1,500 per Tola.', calculation: '5 * 1500', result: 'NPR 7,500' },
        tableData: { headers: ['Unit', 'Weight', 'Price (NPR)'], rows: [['1 Tola', '11.664g', '1,500'], ['10 Grams', '10g', '1,286'], ['1 Kg', '1000g', '128,600']] },
        links: [{text:'Gold Price', url:'/calculator/live-gold-price'}, {text:'Exchange Rates', url:'/calculator/exchange-rate'}, {text:'VAT Calculator', url:'/calculator/nepal-vat'}, {text:'EMI Calculator', url:'/calculator/nepal-loan-eligibility'}, {text:'Capital Gains Tax', url:'/calculator/nepal-stocks'}],
        faqs: [{q:'How is silver priced?', a:'Based on international silver spot prices.'}, {q:'Is making charge applied?', a:'Yes, typically 15-20% for intricate silver jewelry.'}, {q:'Can I buy silver bars?', a:'Yes, from authorized dealers.'}, {q:'Is there tax on silver?', a:'Yes, customs duty is levied on imports.'}, {q:'Does silver price fluctuate daily?', a:'Yes, in tandem with global markets.'}]
    }
};

const nepalTopics = {
    'nepal-attendance': {
        title: 'Nepal University Attendance Calculator', keyword: 'University Attendance', intro: 'Meeting the 75% attendance criteria is mandatory for TU, KU, and PU students.',
        example: { scenario: 'Total classes: 60. Attended: 42.', calculation: '(42 / 60) * 100', result: '70% (Need 3 more classes for 75%)' },
        tableData: { headers: ['University', 'Minimum Required', 'Penalty for Shortfall'], rows: [['Tribhuvan University (TU)', '75%', 'Not allowed in board exams'], ['Kathmandu University (KU)', '80%', 'Grade deduction or NQ'], ['Pokhara University (PU)', '75%', 'NC (Not Cleared)']] },
        links: [{text:'SEE GPA Calculator', url:'/calculator/see-gpa'}, {text:'Age Calculator', url:'/calculator/age-calculator'}, {text:'Percentage Calculator', url:'/calculator/percentage-calculator'}, {text:'Student Loan', url:'/calculator/nepal-loan-eligibility'}, {text:'Lok Sewa Age', url:'/calculator/lok-sewa-age'}],
        faqs: [{q:'What happens if my attendance is 74%?', a:'Most colleges strictly enforce 75%, you may get NQ.'}, {q:'Are medical leaves counted?', a:'Yes, up to 10% with valid medical certificates.'}, {q:'Do lab classes have separate attendance?', a:'Yes, usually separate 75% required.'}, {q:'Can I pay a fine for low attendance?', a:'Officially no, but some internal policies might allow makeup assignments.'}, {q:'How is attendance calculated?', a:'Total attended / Total conducted * 100.'}]
    },
    'nepal-stocks': {
        title: 'NEPSE Share Calculator & Broker Fee', keyword: 'NEPSE Profit', intro: 'Calculate your exact profit from the Nepal Stock Exchange (NEPSE) after deducting CGT, SEBON fee, and broker commission.',
        example: { scenario: 'Buying 100 shares at Rs 300, Selling at Rs 400 (Short term).', calculation: 'Buy Value = 30,000 + charges. Sell Value = 40,000 - charges. Profit = (Sell - Buy) - 7.5% CGT.', result: 'Approx NPR 8,500 Profit' },
        tableData: { headers: ['Transaction Amount', 'Broker Commission'], rows: [['Up to Rs 50,000', '0.40%'], ['Rs 50,001 to Rs 5,00,000', '0.37%'], ['Above Rs 50 Lakhs', '0.27%']] },
        links: [{text:'Bonus Share Tax', url:'/calculator/nepse-bonus-tax'}, {text:'WACC Calculator', url:'/calculator/nepse-wacc'}, {text:'Income Tax', url:'/calculator/nepal-income-tax'}, {text:'Compound Interest', url:'/calculator/compound-interest'}, {text:'Gold Price', url:'/calculator/live-gold-price'}],
        faqs: [{q:'What is CGT in NEPSE?', a:'Capital Gains Tax is 5% for long-term (>1 year) and 7.5% for short-term (<1 year).'}, {q:'What is DP charge?', a:'Rs 25 per transaction deducted by Depository Participant.'}, {q:'What is SEBON fee?', a:'0.015% of the transaction amount.'}, {q:'Do I pay tax on loss?', a:'No, CGT is only on net profit.'}, {q:'How to calculate WACC?', a:'Weighted Average Cost of Capital must be calculated before selling.'}]
    }
};

const newNepalTopics = {
    'nepal-citizenship-age': {
        title: 'Nepal Citizenship Age Calculator', keyword: 'Citizenship Age', intro: 'Calculate exact eligibility age for acquiring a Nepali Citizenship Certificate.',
        example: { scenario: 'Born on 2065 BS Baisakh 1. Checking eligibility today.', calculation: 'Current Year - 2065', result: '16+ Years (Eligible)' },
        tableData: { headers: ['Type', 'Minimum Age', 'Authority'], rows: [['Citizenship by Descent', '16 Years', 'District Administration Office'], ['Naturalized Citizenship', 'Varies', 'Ministry of Home Affairs'], ['Voter ID Registration', '18 Years', 'Election Commission']] },
        links: [{text:'Age Calculator', url:'/calculator/age-calculator'}, {text:'Nepali Date Converter', url:'/calculator/nepali-date'}, {text:'Lok Sewa Age', url:'/calculator/lok-sewa-age'}, {text:'Passport Fee', url:'/calculator/nepal-vehicle-tax'}, {text:'Marriage Age', url:'/calculator/age-calculator'}],
        faqs: [{q:'What is the minimum age for Nepali Citizenship?', a:'16 years.'}, {q:'Can I get it at 15?', a:'No, strict 16 years completion is required.'}, {q:'Do I need fathers citizenship?', a:'Yes, for descent citizenship.'}, {q:'What if I have no birth certificate?', a:'Ward office recommendation is mandatory.'}, {q:'Voting age vs Citizenship age?', a:'Citizenship at 16, Voting rights at 18.'}]
    },
    'nepal-loan-eligibility': {
        title: 'Nepal Bank Loan Eligibility Calculator', keyword: 'Loan Eligibility', intro: 'Determine how much loan you can get from Nepali commercial banks based on your income and property valuation.',
        example: { scenario: 'Monthly Income: NPR 100,000. Existing EMI: 20,000.', calculation: 'Max EMI = 50% of Income = 50,000. Eligible EMI = 50,000 - 20,000 = 30,000.', result: 'Max Loan approx NPR 30 Lakhs (at 10% for 15 yrs)' },
        tableData: { headers: ['Loan Type', 'Max LTV (Inside Valley)', 'Max LTV (Outside Valley)'], rows: [['Home Loan', '50%', '60%'], ['Auto Loan (EV)', '80%', '80%'], ['Auto Loan (ICE)', '50%', '50%']] },
        links: [{text:'EMI Calculator', url:'/calculator/emi-calculator'}, {text:'Income Tax', url:'/calculator/nepal-income-tax'}, {text:'Property Valuation', url:'/calculator/nepal-land'}, {text:'Vehicle Tax', url:'/calculator/nepal-vehicle-tax'}, {text:'Provident Fund', url:'/calculator/nepal-provident-fund'}],
        faqs: [{q:'What is LTV?', a:'Loan to Value ratio.'}, {q:'How much EMI can I afford?', a:'Banks usually limit EMI to 50% of your net monthly income.'}, {q:'Are interest rates fixed?', a:'Most are floating (Base Rate + Premium).'}, {q:'Do I need collateral?', a:'Yes, for Home and Auto loans.'}, {q:'Can foreign income be used?', a:'Yes, remittance income is accepted with valid proof.'}]
    },
    'gold-tax': {
        title: 'Nepal Gold Import Tax & Customs Calculator', keyword: 'Gold Customs Duty', intro: 'Calculate the exact customs duty and taxes for bringing gold into Nepal from abroad (e.g., Dubai, Qatar).',
        example: { scenario: 'Bringing 50 grams of gold jewelry.', calculation: 'First 50g = Free of customs duty (for returning workers).', result: 'NPR 0 Duty' },
        tableData: { headers: ['Gold Type', 'Quantity', 'Customs Duty (NPR)'], rows: [['Jewelry', 'Up to 50g', 'Free'], ['Jewelry', '50g to 200g', 'Rs 10,000 per 10g'], ['Raw Gold/Biscuit', 'Up to 100g', 'Rs 9,500 per 10g']] },
        links: [{text:'Live Gold Price', url:'/calculator/live-gold-price'}, {text:'Remittance', url:'/calculator/remittance'}, {text:'VAT Calculator', url:'/calculator/nepal-vat'}, {text:'Exchange Rate', url:'/calculator/exchange-rate'}, {text:'Income Tax', url:'/calculator/nepal-income-tax'}],
        faqs: [{q:'How much gold can I bring free of tax?', a:'50 grams of jewelry.'}, {q:'Can I bring gold biscuits?', a:'Yes, up to 100g, but duties apply.'}, {q:'What happens if I bring more than 50g jewelry?', a:'You must pay tax on the excess amount up to 200g. Above 200g is confiscated.'}, {q:'Does it apply to tourists?', a:'Rules differ slightly, mostly focused on returning Nepali migrants.'}, {q:'Is VAT applicable on imported gold?', a:'Customs duty covers it at the border, but domestic sales attract VAT.'}]
    }
};

function replaceContentBlock(code, key, newContent) {
    const startStr = `'${key}': {`;
    const startIdx = code.indexOf(startStr);
    if (startIdx === -1) {
        console.log("Could not find", startStr);
        return code;
    }
    
    const contentStartStr = 'content: (';
    const contentIdx = code.indexOf(contentStartStr, startIdx);
    if (contentIdx === -1) return code;
    
    const faqsStartStr = 'faqs: [';
    const faqsIdx = code.indexOf(faqsStartStr, contentIdx);
    let faqsEndIdx = code.indexOf(']', faqsIdx) + 1;
    
    let originalPrefix = code.substring(startIdx, contentIdx);
    let replacement = originalPrefix + newContent;
    let endBlockIdx = code.indexOf('}', faqsEndIdx) + 1;
    
    return code.substring(0, startIdx) + replacement + code.substring(endBlockIdx);
}

for (let key in topics) {
    marketCode = replaceContentBlock(marketCode, key, generateTopicContent(topics[key].title, topics[key].keyword, topics[key].intro, topics[key].example, topics[key].tableData, topics[key].links, topics[key].faqs));
}

for (let key in nepalTopics) {
    nepalCode = replaceContentBlock(nepalCode, key, generateTopicContent(nepalTopics[key].title, nepalTopics[key].keyword, nepalTopics[key].intro, nepalTopics[key].example, nepalTopics[key].tableData, nepalTopics[key].links, nepalTopics[key].faqs));
}

let newEntries = '';
for (let key in newNepalTopics) {
    const obj = newNepalTopics[key];
    newEntries += `
  '${key}': {
    title: "${obj.title}",
    description: "${obj.intro}",
    howToUse: { steps: ["1. Select variables", "2. Input details", "3. Get results"] },
    formula: { title: "Formula", description: "Calculation logic", raw: "A + B = C", variables: ["A=Input"] },
    ${generateTopicContent(obj.title, obj.keyword, obj.intro, obj.example, obj.tableData, obj.links, obj.faqs)}
  },`;
}

const lastBraceIdx = nepalCode.lastIndexOf('};');
nepalCode = nepalCode.substring(0, lastBraceIdx) + newEntries + '\n' + nepalCode.substring(lastBraceIdx);

fs.writeFileSync(marketFile, marketCode);
fs.writeFileSync(nepalFile, nepalCode);
console.log('Successfully injected SEO content.');
