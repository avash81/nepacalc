import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator | Current Tariffs NepaCalc",
  description: "Professional slab-based bill estimation for Nepal Electricity Authority (NEA) domestic consumers. Accurate for the latest 2081/82 tariff schedules.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator", "electricity bill nepal", "nea tariff 2081", "nea rate calculation", "nepal electricity authority bill"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - Server Rendered for Googlebot */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#202124] mb-6">NEA Electricity Bill Slabs & Tariffs Nepal 2081/82</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="prose prose-sm text-[#5F6368] leading-relaxed">
                <p>
                  The <strong>Nepal Electricity Authority (NEA)</strong> uses a progressive billing system for domestic consumers. Depending on your meter capacity (5A, 15A, 30A, or 60A) and your monthly unit consumption, the energy charge per unit increases. This <strong>NEA Bill Calculator</strong> helps you estimate your monthly bill including the energy charge, service charge, and electricity duty.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-amber-600 pl-3">NEA Domestic Tariff (5 Ampere)</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Unit Range</th>
                        <th className="px-4 py-3">Energy Charge (Per Unit)</th>
                        <th className="px-4 py-3">Service Charge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">0 — 20 Units</td><td className="px-4 py-3 font-bold">Rs. 3.00</td><td className="px-4 py-3">Rs. 30</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">21 — 30 Units</td><td className="px-4 py-3 font-bold">Rs. 6.50</td><td className="px-4 py-3">Rs. 50</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">31 — 50 Units</td><td className="px-4 py-3 font-bold">Rs. 8.00</td><td className="px-4 py-3">Rs. 75</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">51 — 150 Units</td><td className="px-4 py-3 font-bold">Rs. 9.50</td><td className="px-4 py-3">Rs. 100</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">151 — 250 Units</td><td className="px-4 py-3 font-bold">Rs. 10.00</td><td className="px-4 py-3">Rs. 125</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Above 250 Units</td><td className="px-4 py-3 font-bold">Rs. 11.00</td><td className="px-4 py-3">Rs. 150</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                <h3 className="text-lg font-bold text-[#202124] mb-4">How to Read Your NEA Meter?</h3>
                <p className="text-sm text-[#5F6368] mb-4">To calculate your monthly units, you need two readings from your physical meter:</p>
                <ol className="space-y-4 list-decimal pl-5 text-sm text-[#5F6368]">
                  <li>
                    <strong>Current Reading:</strong> The number shown on the meter today.
                  </li>
                  <li>
                    <strong>Previous Reading:</strong> The number shown on your last month's bill.
                  </li>
                  <li>
                    <strong>Total Units:</strong> Current Reading − Previous Reading.
                  </li>
                </ol>
                <p className="mt-4 text-xs text-[#70757A] leading-relaxed italic">Note: If you have a smart meter, you can also view these readings on the NEA Official App.</p>
              </div>

              <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">Billing Components</h4>
                <ul className="space-y-2 text-xs text-[#5F6368]">
                  <li><strong>Energy Charge:</strong> Cost based on units consumed.</li>
                  <li><strong>Service Charge:</strong> Fixed monthly fee based on meter capacity.</li>
                  <li><strong>Electricity Duty:</strong> Tax applied to the total bill amount.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
            <h3 className="text-xl font-black text-[#202124] mb-6">NEA Billing FAQs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "What is the penalty for late payment?", a: "NEA applies a 5% penalty if the bill is paid after 7 days of the billing date, and it increases to 25% if paid after 30 days." },
                { q: "Is there a rebate for early payment?", a: "Yes, you get a 2% rebate (discount) if you pay your bill within 7 days of the billing date." },
                { q: "How can I pay my NEA bill online?", a: "You can use digital wallets like eSewa, Khalti, or IME Pay, or use your bank's mobile banking app to pay directly." },
                { q: "What should I do if my bill is unusually high?", a: "First, verify the current reading on your meter against the bill. If there is a discrepancy, visit your local NEA distribution center for a correction." }
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
