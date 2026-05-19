/**
 * Targeted fix for financial.tsx broken content blocks.
 * Replaces the broken 'simple-interest' content and the broken compound-interest formula section.
 */
const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'src/data/seo/financial.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// ── Fix 1: compound-interest formula variables ──────────────────────────────
// The last entry in the variables array is JSX instead of a string, causing parse errors
const badFormulaBlock = `        \"t = Time: Total number of years the money is invested.\",
        </div>
        </div>
        </section>
        </div>
        </section>
        </div>
        </section>
        </div>
        </div>
    ),`;
const goodFormulaBlock = `        \"t = Time: Total number of years the money is invested.\",
        \"Example: Rs. 1,00,000 at 9% for 3 years compounded quarterly = Rs. 1,30,477\"
      ]
    },

    content: (
      <>
        <div className="space-y-8 text-slate-800">
          <p className="text-base leading-relaxed">Compound interest is the core mechanism behind Fixed Deposits, Recurring Savings, and Mutual Fund returns in Nepal. It allows interest to earn its own interest over time.</p>
          <div className="pt-6 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
              Compliance: Last updated June 2083 (June 2026). Conforms to NRB Unified Directives.
            </p>
          </div>
        </div>
      </>
    ),`;
if (content.includes(badFormulaBlock)) {
  content = content.replace(badFormulaBlock, goodFormulaBlock);
  console.log('✓ Fixed compound-interest formula block');
} else {
  console.log('✗ compound-interest formula block not found — checking alternate...');
  // Try to find and fix the duplicate faqs block that appears inside cagr-calculator
  const dupFaqLine = `      {\n        Standard Compliance: Calculations strictly conform to geometric mean standards used by global financial analysts and SEBON-registered mutual funds.`;
  if (content.includes('Standard Compliance: Calculations strictly conform to geometric mean standards used by global financial analysts and SEBON-registered mutual funds.\n        \n        \n        \n        </p>')) {
    // There's a broken FAQ entry mixed in
    content = content.replace(
      /\{\s*\n\s*Standard Compliance: Calculations strictly conform[^}]+\},?/g,
      ''
    );
    console.log('✓ Removed broken FAQ entry in cagr-calculator');
  }
}

// ── Fix 2: simple-interest — the broken content block ──────────────────────
// Replace the entire content block that starts at line ~716
const SI_BAD = `    content: (
        <div className="space-y-12">
        
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Standard Overview
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Simple interest (SI is the most fundamental mechanism`;

const SI_GOOD_CONTENT = `    content: (
      <>
        <div className="space-y-12 text-slate-800">
          <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
            <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
              Simple Interest in Nepal
            </h2>
            <p className="text-slate-800 text-base leading-relaxed">
              Simple interest is the foundation of short-term lending in Nepal. Unlike compound interest, SI only applies the rate to the original principal — making it ideal for gold loans, bridge financing, and informal Tamasuk agreements under the National Civil Code.
              <br/><br/>
              <span className="text-sm text-slate-600 font-medium">
                Regulatory Cap: Informal loans between individuals are legally capped at 10% per annum.
              </span>
            </p>
          </div>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-6">When to Use Simple Interest in Nepal</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-700">
              <li><strong>Gold &amp; Jewelry Loans:</strong> Most gold loans use simple interest monthly or quarterly.</li>
              <li><strong>Bridge Financing:</strong> Short-term business loans often use a flat simple interest rate.</li>
              <li><strong>Legal Judgments:</strong> Court-awarded statutory interest uses the simple interest method.</li>
            </ul>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Strategic Financial Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                <h4 className="font-black text-slate-900 mb-3">📉 Flat Rate</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Applied to the original loan amount even as you pay it back — making the effective rate much higher than nominal.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
                <h4 className="font-black text-slate-900 mb-3">🏦 Fixed Yield</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Retirees withdrawing monthly bank interest effectively receive simple interest — the principal stays fixed.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
                <h4 className="font-black text-slate-900 mb-3">📜 Legal Cap</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Under the National Civil Code, rates above 10% p.a. for informal loans may be legally unenforceable in a Nepalese court.</p>
              </div>
            </div>
          </section>

          <div className="pt-10 border-t border-slate-200 text-center mt-12">
            <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
              Compliance Check: Last updated June 2083 (June 2026). Conforms to the National Civil Code (Muluki Ain).
            </p>
          </div>
        </div>
      </>
    ),`;

if (content.includes(SI_BAD)) {
  // Find end of old content block (faqs: line after the broken content)
  const siStart = content.indexOf(SI_BAD);
  // Find the faqs section that follows
  const faqsMarker = `    faqs: [\r\n      { \r\n        question: \"What is the formula for simple interest?\"`;
  const siEnd = content.indexOf(faqsMarker, siStart);
  if (siEnd !== -1) {
    content = content.substring(0, siStart) + SI_GOOD_CONTENT + '\n    ' + content.substring(siEnd);
    console.log('✓ Replaced broken simple-interest content block');
  } else {
    console.log('✗ Could not find end of simple-interest content block');
  }
} else {
  console.log('✗ SI_BAD pattern not found in file');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. File written.');
