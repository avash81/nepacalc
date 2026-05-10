const fs = require('fs');
const path = require('path');

// 1. Read API Keys
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const keyLine = envContent.split('\n').find(line => line.startsWith('GEMINI_API_KEYS='));
if (!keyLine) {
  console.error("No GEMINI_API_KEYS found in .env.local");
  process.exit(1);
}
const keys = keyLine.split('=')[1].trim().split(',').filter(k => k);

const targetCalculator = "loan-emi";
const calculatorName = "Loan EMI Calculator";

const prompt = "You are a top-tier SEO specialist and mathematician writing content for a Nepalese calculator platform. I need you to write the exact TypeScript (TSX) SEO object for a calculator named '" + calculatorName + "' with slug '" + targetCalculator + "'.\n\nFollow this exact 'V4 Template' structure perfectly. Make sure you write around 1000 to 1500 words of deeply researched content across the sections. Do not use generic text. Be specific about Nepal (NRB rules, interest rates, etc.).\n\nV4 TEMPLATE FORMAT:\n\n  '" + targetCalculator + "': {\n    title: \"Loan EMI Calculator Nepal | Precise Monthly Installment Lab\",\n    description: \"Calculate your exact monthly EMI for Home, Auto, or Personal loans in Nepal. Understand NRB interest rates, amortization, and early settlement logic.\",\n    howToUse: {\n      steps: [\n        \"Input the total loan amount (Principal).\",\n        \"Enter the annual interest rate.\",\n        \"Set the loan tenure in years or months.\",\n        \"View your monthly EMI and total interest payable.\",\n        \"Analyze the amortization schedule.\"\n      ]\n    },\n    formula: {\n      title: \"The Equated Monthly Installment (EMI) Formula\",\n      description: \"Our engine uses the standard amortization formula to calculate precise monthly payouts.\",\n      latex: \"$$E = P \\\\times r \\\\times \\\\frac{(1 + r)^n}{(1 + r)^n - 1}$$\"\n    },\n    content: (\n      <div className=\"space-y-12\">\n        {/* SECTION 1: QUICK SUMMARY */}\n        <div className=\"bg-[#1a1a2e] border-l-4 border-blue-500 rounded-r-xl p-8 shadow-sm\">\n          <h2 className=\"text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-3\">Executive Summary</h2>\n          <p className=\"text-white text-base leading-relaxed\">\n            [Write 3 sentences summarizing the importance of EMI calculation in Nepal]\n            <br/><br/>\n            <span className=\"text-sm text-slate-400\">\n              Related Tool: Try our <a href=\"/calculator/nepal-home-loan\" className=\"text-blue-400 hover:text-blue-300 underline font-bold\">Home Loan Limit Calculator</a>.\n            </span>\n          </p>\n        </div>\n\n        {/* SECTION 2: EEAT DEEP DIVE */}\n        <section>\n          <h3 className=\"text-2xl font-black text-white mb-6\">EMI Calculation Methodology & NRB Directives</h3>\n          <div className=\"prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4\">\n            <p>[Detailed explanation of how interest is calculated on a reducing balance basis]</p>\n            \n            <div className=\"bg-amber-900/20 border border-amber-500/30 rounded-lg p-5 my-8 flex gap-4 items-start\">\n              <div className=\"text-amber-500 text-xl\">💡</div>\n              <div>\n                <strong className=\"block text-amber-500 text-sm uppercase tracking-wider mb-1\">Common Pitfall</strong>\n                <p className=\"text-sm text-amber-200/80 m-0\">\n                  [Explain a common mistake like confusing flat rate vs reducing balance rate]\n                </p>\n              </div>\n            </div>\n            \n            <p>[Detailed explanation of Nepal Rastra Bank (NRB) guidelines on base rate and premium]</p>\n          </div>\n        </section>\n\n        {/* SECTION 2.5: VARIABLE LEGEND */}\n        <section className=\"bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50\">\n          <h3 className=\"text-xl font-black text-blue-400 mb-6 flex items-center gap-3\">\n            <span>📐</span> Variable Decomposition\n          </h3>\n          <ul className=\"space-y-4\">\n            {/* List variables P, r, n with deep explanations */}\n          </ul>\n        </section>\n\n        {/* SECTION 3: VARIABLE CARDS */}\n        <section>\n          <h3 className=\"text-2xl font-black text-white mb-6\">Critical Loan Parameters</h3>\n          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n            <div className=\"group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-blue-500 transition-all\">\n              <div className=\"flex items-center gap-3 mb-2\">\n                <div className=\"h-2 w-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform\" />\n                <h4 className=\"text-lg font-bold text-white\">[Parameter Name]</h4>\n              </div>\n              <p className=\"text-sm text-slate-400 leading-relaxed\">\n                [75 words detailing this parameter]\n              </p>\n            </div>\n            {/* Add more cards */}\n          </div>\n        </section>\n\n        {/* SECTION 4: CASE STUDY */}\n        <section className=\"bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white relative overflow-hidden shadow-lg border border-slate-700\">\n           {/* Case study for a 50 Lakhs loan in Nepal at 10.5% interest */}\n        </section>\n        \n        {/* SECTION 5: TRUST SIGNALS */}\n        <div className=\"pt-8 border-t border-slate-800 text-center\">\n           <p className=\"text-[10px] text-slate-500 italic\">\n             Last updated: Baishakh 2081 (May 2024) based on the latest Nepal Rastra Bank monetary policy.\n           </p>\n        </div>\n      </div>\n    ),\n    faqs: [\n      { question: \"What is the difference between Flat Rate and EMI?\", answer: \"...\" },\n    ]\n  }\n\nONLY output the typescript code. Do not wrap in markdown ```typescript blocks if possible, or just provide the raw code.";

async function generate() {
  console.log("Found " + keys.length + " API Keys.");
  
  for (let i = 0; i < keys.length; i++) {
    const API_KEY = keys[i];
    console.log("Trying API Key " + (i + 1) + "...");
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8000,
          }
        })
      });

      const data = await response.json();
      
      if (data.error) {
          console.error("Key " + (i + 1) + " failed: ", data.error.message);
          continue; // Try next key
      }
      
      let text = data.candidates[0].content.parts[0].text;
      text = text.replace(/^```typescript\n/i, '').replace(/\n```$/i, '').trim();
      if(text.startsWith('```')) text = text.replace(/^```\n/, '');
      
      const outputPath = path.join(__dirname, 'gemini-output-test.tsx');
      fs.writeFileSync(outputPath, text, 'utf8');
      console.log("✅ Success! Generated V4 SEO Content to scripts/gemini-output-test.tsx");
      return; // Exit loop on success
    } catch (err) {
      console.error("Network error with Key " + (i + 1) + ":", err.message);
    }
  }
  
  console.error("❌ All API Keys failed.");
}

generate();
