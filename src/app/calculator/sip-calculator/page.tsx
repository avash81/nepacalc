import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'SIP Calculator Nepal Monthly Investment Returns',
  description: 'Calculate SIP returns for Nepal mutual funds. Monthly and yearly projections.',
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "mutual fund return calculator", "nepse sip tool", "investment growth calculator", "sip step up calculator", "compound interest nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - Server Rendered for Googlebot */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#202124] mb-6">SIP Calculator Nepal: Build Wealth with Systematic Investing</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="prose prose-sm text-[#5F6368] leading-relaxed">
                <p>
                  A <strong>Systematic Investment Plan (SIP)</strong> is one of the most effective ways to build long-term wealth in Nepal. By investing a fixed amount regularly—typically monthly—into mutual funds or stocks, you benefit from the power of compounding and rupee-cost averaging. This <strong>SIP Calculator</strong> helps you estimate your future portfolio value based on your monthly contributions and expected return rates.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-emerald-600 pl-3">The Power of Compounding (Example)</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Investment Period</th>
                        <th className="px-4 py-3">Total Invested</th>
                        <th className="px-4 py-3">Estimated Wealth (12%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">5 Years</td><td className="px-4 py-3 font-medium">Rs. 3,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">Rs. 4,12,432</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">10 Years</td><td className="px-4 py-3 font-medium">Rs. 6,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">Rs. 11,61,695</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">15 Years</td><td className="px-4 py-3 font-medium">Rs. 9,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">Rs. 25,22,880</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">20 Years</td><td className="px-4 py-3 font-medium">Rs. 12,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">Rs. 49,95,740</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">25 Years</td><td className="px-4 py-3 font-medium">Rs. 15,00,000</td><td className="px-4 py-3 text-emerald-600 font-bold">Rs. 94,88,175</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-[#70757A] italic">* Assumptions: Rs. 5,000 monthly investment at a 12% average annual return.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                <h3 className="text-lg font-bold text-[#202124] mb-4">SIP vs Lumpsum: Which is better?</h3>
                <p className="text-sm text-[#5F6368] mb-4">While Lumpsum investing is great for a windfalls, <strong>SIP</strong> is better for disciplined earners because:</p>
                <ul className="space-y-3 text-sm text-[#5F6368]">
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span><strong>Rupee Cost Averaging:</strong> You buy more units when prices are low and fewer when prices are high.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span><strong>Lower Entry Barrier:</strong> Start with as little as Rs. 1,000 in most Nepalese Mutual Funds.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span><strong>Financial Discipline:</strong> Automates your savings before you can spend them.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">Mutual Funds in Nepal</h4>
                <p className="text-xs text-[#5F6368] leading-relaxed mb-4">Companies like NIBL Ace Capital, Siddhartha Capital, and Global IME Capital offer various open-ended and closed-ended mutual funds in Nepal that are perfect for SIP investors.</p>
                <Link href="/finance/" className="text-xs font-bold text-[#1A73E8] hover:underline">Explore more Finance Tools &rarr;</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
            <h3 className="text-xl font-black text-[#202124] mb-6">Investment & SIP FAQs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "What is an open-ended mutual fund in Nepal?", a: "Open-ended funds allow you to buy and sell units directly from the fund manager at any time. They are ideal for SIP because you can invest small amounts monthly without waiting for a new IPO." },
                { q: "Is a 12-15% return realistic for Nepal?", a: "Historically, the NEPSE index and various mutual funds in Nepal have delivered returns in this range over the long term. However, equity investments are subject to market risks." },
                { q: "What is a 'Step-up' SIP?", a: "A step-up SIP allows you to increase your monthly investment amount by a certain percentage every year as your income grows, significantly accelerating your wealth creation." },
                { q: "Are SIP returns taxable in Nepal?", a: "Capital Gains Tax (CGT) is applicable on the profit you earn. For individuals in Nepal, this is usually 5% for long-term holdings (over 1 year)." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#202124]">{faq.q}</h4>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
