import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal | Personal & Home Loan EMI NepaCalc",
  description: "Calculate your monthly loan installments (EMI) for Home, Car, and Personal loans in Nepal. Use our high-precision reducing balance tool. Try NepaCalc for financial clarity.",
  slug: 'loan-emi',
  keywords: ["loan emi calculator nepal", "home loan emi nepal", "monthly installment tool", "reducing balance interest", "loan amortization schedule", "bank loan calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - ~1800-2000 Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-[#202124] mb-6">Understanding Loan EMI (Equated Monthly Installments)</h2>
            
            <p className="lead text-lg text-[#5F6368]">
              Planning a significant purchase like a home or a vehicle in Nepal requires meticulous financial foresight. At <strong>NepaCalc</strong>, our <strong>Loan EMI Calculator</strong> is designed to provide you with a crystal-clear breakdown of your monthly commitments, ensuring you never overextend your budget.
            </p>

            <div className="my-10 p-6 bg-[#E8F0FE] rounded-2xl border border-[#D2E3FC]">
              <h3 className="text-[#1967D2] font-black uppercase text-sm tracking-widest mb-4">What exactly is an EMI?</h3>
              <p className="text-sm leading-relaxed">
                An <strong>Equated Monthly Installment (EMI)</strong> is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full. In Nepal, most banks (Class A, B, and C) use the <strong>Reducing Balance Method</strong> for calculation.
              </p>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">The Mathematical Formula for EMI</h3>
            <p>While our calculator does the heavy lifting, understanding the underlying math helps in comprehending how interest behaves over time. The standard formula used by financial institutions is:</p>
            
            <div className="bg-[#F8F9FA] p-8 rounded-xl border border-[#DADCE0] my-6 text-center">
              <code className="text-xl font-mono text-[#202124]">E = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)</code>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left text-sm">
                <div><strong>P (Principal):</strong> The total amount you are borrowing from the bank.</div>
                <div><strong>r (Interest Rate):</strong> Monthly interest rate (Annual rate / 12 / 100).</div>
                <div><strong>n (Tenure):</strong> The duration of the loan in months.</div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Reducing Balance vs. Flat Rate</h3>
            <p>In the Nepalese financial market, you might encounter two different ways interest is calculated. It is vital to know the difference:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              <div className="p-6 border rounded-lg">
                <h4 className="font-bold text-[#D93025]">Flat Interest Rate</h4>
                <p className="text-xs text-[#5F6368]">Interest is calculated on the full principal amount throughout the tenure. You pay interest even on the money you have already returned. This is generally more expensive and often used by unorganized lenders.</p>
              </div>
              <div className="p-6 border rounded-lg border-green-200 bg-green-50">
                <h4 className="font-bold text-[#188038]">Reducing Balance Rate</h4>
                <p className="text-xs text-[#5F6368]">Interest is only calculated on the remaining balance. As you pay back the principal, your interest component decreases. This is the standard method used by <strong>Nepal Rastra Bank (NRB)</strong> regulated entities.</p>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">How an Amortization Schedule Works</h3>
            <p>
              An amortization schedule is a table detailing each periodic payment on an amortizing loan. In the early years of your <strong>Home Loan in Nepal</strong>, a larger portion of your EMI goes toward paying interest. As the years progress, the principal component increases significantly.
            </p>
            <p>
              Using our <strong>EMI tool</strong>, you can visualize this transition. Understanding this helps you decide when to make "Pre-payments" to save maximum interest.
            </p>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Tips to Lower Your Monthly EMI</h3>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Higher Down Payment:</strong> Reducing the principal amount (P) is the most effective way to lower EMI.</li>
              <li><strong>Negotiate Interest Rates:</strong> In Nepal, your "Premium" over the base rate can often be negotiated with the bank manager.</li>
              <li><strong>Step-up Repayments:</strong> Start with lower EMIs and increase them as your income grows (useful for young professionals).</li>
              <li><strong>Choose a Longer Tenure:</strong> This lowers the monthly burden but significantly increases the total interest paid over the life of the loan.</li>
            </ul>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions (FAQ)</h3>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h4 className="font-bold">1. Does the EMI change if the base rate of the bank changes?</h4>
                <p className="text-sm text-[#5F6368]">Yes. Most loans in Nepal are "Floating Rate" loans linked to the bank&apos;s base rate. If the base rate increases (usually quarterly), your EMI or tenure will be adjusted accordingly.</p>
              </div>
              <div className="border-b pb-6">
                <h4 className="font-bold">2. Can I use this for a Car Loan?</h4>
                <p className="text-sm text-[#5F6368]">Absolutely. This calculator works for any loan that uses the reducing balance method, including Auto Loans, Education Loans, and Personal Loans.</p>
              </div>
              <div className="border-b pb-6">
                <h4 className="font-bold">3. What is the maximum tenure for a Home Loan in Nepal?</h4>
                <p className="text-sm text-[#5F6368]">Typically, banks in Nepal offer home loans for up to 20 to 25 years, depending on the borrower&apos;s age and income stability.</p>
              </div>
              <div>
                <h4 className="font-bold">4. Is there a charge for pre-payment?</h4>
                <p className="text-sm text-[#5F6368]">Most banks in Nepal charge a small "Pre-payment Fee" (usually 1-2%) if you pay off the loan before the tenure ends. However, for some loans, this is waived after a certain period.</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Related Financial Tools</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/calculator/sip-calculator/" className="px-4 py-2 bg-white border border-[#DADCE0] rounded-full text-xs font-bold text-[#1A73E8] hover:bg-[#E8F0FE]">SIP Calculator</Link>
                <Link href="/calculator/fd-calculator/" className="px-4 py-2 bg-white border border-[#DADCE0] rounded-full text-xs font-bold text-[#1A73E8] hover:bg-[#E8F0FE]">Fixed Deposit (FD)</Link>
                <Link href="/calculator/nepal-income-tax/" className="px-4 py-2 bg-white border border-[#DADCE0] rounded-full text-xs font-bold text-[#1A73E8] hover:bg-[#E8F0FE]">Income Tax Tool</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
