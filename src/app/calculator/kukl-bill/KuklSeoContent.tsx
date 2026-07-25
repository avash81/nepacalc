import React from 'react';
import TableOfContents from './TableOfContents';

export default function KuklSeoContent() {
  return (
    <article className="space-y-12 max-w-4xl">
      <div className="flex items-center gap-4 text-sm text-[#5F6368] border-b border-[#DADCE0] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center font-bold">N</div>
          <div>
            <div className="font-bold text-[#202124]">NepaCalc Team</div>
            <div className="text-xs">Reviewed & Updated: July 2026</div>
          </div>
        </div>
      </div>
      <section className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
        <p className="text-lg leading-relaxed text-[#3C4043]">
          Calculate your KUKL water bill online using the latest official tariff structure for Kathmandu Valley. This calculator helps residential customers estimate their monthly water bill by automatically calculating the water charge, 50% sewerage charge, and total amount payable based on your water consumption and pipe connection size.
        </p>
        <p>
          Whether you want to understand how your KUKL bill is calculated, check the price per unit of water in Nepal, learn how many litres are in one water unit, or estimate your monthly bill before it arrives, this calculator provides a quick and easy way to calculate your expected payment. It follows the official KUKL billing methodology for metered domestic connections and presents a transparent breakdown of every charge, making it easier to understand your water consumption and monthly costs.
        </p>
        <p>
          Whether you are checking your monthly household water usage or estimating future bills, this calculator provides a quick and reliable estimate based on the official KUKL tariff structure. You can also explore more useful <a href="/" className="text-[#1A73E8] hover:underline">Nepal Calculators</a> for taxes, utilities, finance, and everyday calculations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
            <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-4">Quick Highlights</h3>
            <ul className="space-y-2">
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Calculate your KUKL water bill instantly.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Uses the official KUKL tariff structure for domestic metered connections.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Automatically calculates the 50% sewerage charge.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Supports multiple official pipe connection sizes.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Provides a detailed bill breakdown.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Shows minimum charges and additional unit charges.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Helps estimate monthly household water costs.</li>
              <li className="flex gap-2"><span className="text-[#188038]">✓</span> Mobile-friendly and free to use.</li>
            </ul>
          </div>
          
          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8]">
            <h3 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider mb-4">Quick Facts</h3>
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-[#1A73E8]/20">
                <tr>
                  <td className="py-2 font-bold text-[#1A73E8]">Water Utility</td>
                  <td className="py-2 text-[#202124]">Kathmandu Upatyaka Khanepani Limited (KUKL)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-[#1A73E8]">Billing Unit</td>
                  <td className="py-2 text-[#202124]">1 Unit = 1,000 Litres</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-[#1A73E8]">Sewerage Charge</td>
                  <td className="py-2 text-[#202124]">50% of the water charge</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-[#1A73E8]">Billing Method</td>
                  <td className="py-2 text-[#202124]">Minimum charge + additional unit + sewerage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Use This Calculator?</h3>
        <p>
          Instead of calculating your water bill manually, this calculator automatically applies the official billing formula used by KUKL. Simply select your pipe connection size, enter your monthly water consumption, and the calculator will estimate your total payable amount, including water charges and sewerage charges. It is useful for homeowners, tenants, landlords, businesses, and anyone who wants to better understand their monthly water bill before making a payment.
        </p>

        <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">What You Can Calculate</h3>
        <ul className="list-disc pl-5 space-y-1 mb-6">
          <li>Monthly KUKL water bill</li>
          <li>Water charge</li>
          <li>Sewerage charge</li>
          <li>Total payable amount</li>
          <li>Cost of additional water units</li>
          <li>Minimum monthly charges</li>
          <li>Estimated monthly household water expenses</li>
        </ul>

        <div className="bg-[#FEF7E0] border border-[#F2C94C] p-4 rounded-lg mt-6">
          <p className="text-sm text-[#B37400]">
            <strong>Disclaimer:</strong> This calculator is designed to estimate KUKL water bills using publicly available tariff information and the current billing structure for domestic metered connections. Actual bills may vary depending on your connection type, meter readings, billing adjustments, regulatory changes, or other charges applied by KUKL.
          </p>
        </div>
      </section>

      <TableOfContents />

      {/* Phase 3 — How KUKL Calculates Your Water Bill */}
      <section id="how-bill-calculated" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">How KUKL Calculates Your Water Bill</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            Your KUKL water bill is calculated using a combination of your monthly water consumption, pipe connection size, the applicable minimum tariff, any additional consumption charges, and a mandatory 50% sewerage charge. Water consumption is measured through your property's water meter, where 1 unit equals 1,000 litres (1 cubic metre or 1 m³).
          </p>
          <p>
            For most domestic metered connections, KUKL first applies the minimum charge associated with your pipe size. If your monthly consumption exceeds the minimum allowance, additional units are billed at the applicable per-unit rate. Once the water charge has been calculated, a sewerage charge equal to 50% of the water charge is added to determine the total amount payable.
          </p>
          <p>
            This standardized billing method allows customers to understand how their monthly bill is calculated and estimate future costs based on expected water usage.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">KUKL Water Bill Calculation Process</h3>
          <p>The billing process follows these steps:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Record the previous and current water meter readings.</li>
            <li>Calculate the total water consumed during the billing period.</li>
            <li>Identify the minimum tariff based on the pipe connection size.</li>
            <li>Apply additional charges for consumption exceeding the minimum allowance.</li>
            <li>Calculate the sewerage charge, which is 50% of the water charge.</li>
            <li>Add the water charge and sewerage charge to determine the final payable bill.</li>
          </ol>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Water Bill Formula</h3>
          <p>The calculation can be simplified as:</p>
          <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0] my-4 text-center space-y-2 font-medium">
            <div>Water Consumed</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Apply Minimum Tariff</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Add Additional Unit Charges (if applicable)</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Calculate 50% Sewerage Charge</div>
            <div className="text-[#1A73E8]">↓</div>
            <div className="font-bold text-[#202124]">Total Water Bill</div>
          </div>
          
          <h4 className="font-bold text-[#202124] mt-6 mb-2">Formula</h4>
          <div className="bg-[#E8F0FE] p-4 rounded-lg border border-[#1A73E8] font-mono text-sm mb-4">
            Total Bill = Water Charge + Sewerage Charge
          </div>
          <p>Where:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li><strong>Water Charge</strong> = Minimum charge + Additional unit charges (if applicable)</li>
            <li><strong>Sewerage Charge</strong> = 50% × Water Charge</li>
          </ul>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example Calculation</h3>
          <p>Assume a household has:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse">
              <tbody className="divide-y divide-[#DADCE0] border border-[#DADCE0] rounded-lg overflow-hidden">
                <tr className="bg-[#F8F9FA]">
                  <td className="p-3 font-bold text-[#202124]">Pipe Connection</td>
                  <td className="p-3">½ inch</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Monthly Consumption</td>
                  <td className="p-3">15 Units</td>
                </tr>
                <tr className="bg-[#F8F9FA]">
                  <td className="p-3 font-bold text-[#202124]">Minimum Included Consumption</td>
                  <td className="p-3">10 Units</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Additional Consumption</td>
                  <td className="p-3">5 Units</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 my-6">
            <div>
              <h4 className="font-bold text-[#202124]">Step 1 — Water Charge</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Minimum water charge applies to the first 10 units.</li>
                <li>Additional water used = 5 units.</li>
                <li>Additional charge is calculated according to the official tariff for the connection type.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#202124]">Step 2 — Sewerage Charge</h4>
              <p>KUKL adds a sewerage charge equal to 50% of the water charge.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#202124]">Step 3 — Final Bill</h4>
              <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0] text-center font-medium mt-2">
                <div>Water Charge</div>
                <div>+</div>
                <div>50% Sewerage Charge</div>
                <div>=</div>
                <div className="font-bold text-[#202124]">Total Amount Payable</div>
              </div>
              <p className="mt-2 text-sm italic">The calculator performs these calculations automatically and provides a detailed breakdown of each component.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">What Affects Your Water Bill?</h3>
          <p>Your monthly bill may change because of:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Higher monthly water consumption.</li>
            <li>Larger pipe connection sizes with different minimum tariffs.</li>
            <li>Water usage beyond the minimum included units.</li>
            <li>Sewerage charges applied to the calculated water charge.</li>
            <li>Updates to official tariff schedules issued by KUKL.</li>
          </ul>
          <p className="mt-4">
            Understanding these factors can help households monitor consumption, identify unusual increases, and estimate future monthly expenses more accurately.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Key Billing Components</h3>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Component</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold">Water Meter Reading</td>
                  <td className="p-3">Measures monthly water consumption.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Water Consumption</td>
                  <td className="p-3">Total units used during the billing period.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Minimum Charge</td>
                  <td className="p-3">Fixed charge based on the pipe connection size.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Additional Unit Charge</td>
                  <td className="p-3">Applies when consumption exceeds the minimum allowance.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Sewerage Charge</td>
                  <td className="p-3">Equal to 50% of the calculated water charge.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Total Payable Amount</td>
                  <td className="p-3">Final bill after all applicable charges are added.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Summary</h3>
            <p className="mb-2">If you only remember three things about KUKL billing, they are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 unit of water equals 1,000 litres (1 m³).</li>
              <li>Your bill depends on both your pipe size and monthly water consumption.</li>
              <li>A sewerage charge equal to 50% of the water charge is added to the final bill.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Understanding the Calculation Matters</h3>
          <p>
            Knowing how KUKL calculates your bill makes it easier to verify monthly charges, estimate future costs, compare water usage across billing periods, and identify unexpected increases in consumption. It also helps homeowners, tenants, and businesses budget more effectively alongside other property-related expenses—such as estimating annual <a href="/calculator/property-tax/" className="text-[#1A73E8] hover:underline">Property Tax</a> obligations—and understand how changes in water usage affect the total amount payable.
          </p>

        </div>
      </section>

      {/* Phase 4 — Official KUKL Tariff Rates */}
      <section id="tariff-rates" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">Official KUKL Water Tariff Rates</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            The KUKL Water Bill Calculator uses the official Kathmandu Upatyaka Khanepani Limited (KUKL) tariff structure for metered household and commercial water connections. Your monthly bill depends on your pipe connection size, water consumption, minimum applicable charge, and the mandatory 50% sewerage charge.
          </p>
          <p>
            Different pipe sizes have different minimum monthly consumption limits and base charges. Once consumption exceeds the included minimum units, additional water is charged according to the official tariff rate.
          </p>
          <p className="text-sm italic bg-[#F8F9FA] p-3 rounded-md border border-[#DADCE0]">
            Note: The tariff structure below is intended for metered KUKL connections. Sewerage service is charged separately at 50% of the calculated water charge.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Official Metered Water Tariff</h3>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead>
                <tr className="bg-[#E8F0FE] text-[#1A73E8] border-b-2 border-[#1A73E8]">
                  <th className="p-3 font-bold uppercase tracking-wider">Pipe Size</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Minimum Consumption</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Minimum Water Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Additional Charge After Minimum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">½ Inch</td>
                  <td className="p-3">10 Units (10,000 Litres)</td>
                  <td className="p-3">Rs. 100</td>
                  <td className="p-3">Rs. 32 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">¾ Inch</td>
                  <td className="p-3">27 Units (27,000 Litres)</td>
                  <td className="p-3">Rs. 1,910</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">1 Inch</td>
                  <td className="p-3">56 Units (56,000 Litres)</td>
                  <td className="p-3">Rs. 3,960</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">1½ Inch</td>
                  <td className="p-3">155 Units (155,000 Litres)</td>
                  <td className="p-3">Rs. 10,950</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">2 Inch</td>
                  <td className="p-3">320 Units (320,000 Litres)</td>
                  <td className="p-3">Rs. 22,600</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">3 Inch</td>
                  <td className="p-3">881 Units (881,000 Litres)</td>
                  <td className="p-3">Rs. 62,240</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="p-3 font-bold text-[#202124]">4 Inch</td>
                  <td className="p-3">1,810 Units (1,810,000 Litres)</td>
                  <td className="p-3">Rs. 127,865</td>
                  <td className="p-3">Rs. 71 per additional unit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Sewerage Charge</h3>
          <p>KUKL automatically applies a 50% sewerage charge to the calculated water charge.</p>
          <p>The calculation is straightforward:</p>
          <div className="bg-[#E8F0FE] p-4 rounded-lg border border-[#1A73E8] font-mono text-sm my-4 text-center">
            Total Bill = Water Charge + 50% Sewerage Charge
          </div>
          <p>For example:</p>
          <ul className="list-none pl-5 space-y-1 mb-4 border-l-4 border-[#1A73E8]">
            <li>Water Charge = Rs. 500</li>
            <li>Sewerage Charge = Rs. 250</li>
            <li className="font-bold text-[#202124]">Total Bill = Rs. 750</li>
          </ul>
          <p>This sewerage amount appears as a separate item on the monthly KUKL bill.</p>

          <h3 id="pipe-sizes" className="text-xl font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">How Pipe Size Affects Your Bill</h3>
          <p>Many users assume only water consumption changes their bill. In reality, the pipe connection size is one of the biggest pricing factors.</p>
          <p>A larger connection receives a higher minimum water allocation, but it also has a significantly higher minimum monthly charge. Because of this, two households using the same amount of water may receive different bills if their pipe sizes are different.</p>
          <p>For example:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>A standard ½-inch domestic connection includes up to 10 units within the minimum charge.</li>
            <li>A ¾-inch connection includes 27 units, but starts with a much higher minimum monthly charge.</li>
            <li>Commercial buildings, apartments, institutions, and large properties typically use larger pipe sizes with higher minimum billing thresholds.</li>
          </ul>
          <p>Selecting the correct pipe size in the calculator ensures the estimated bill closely matches the official KUKL billing method.</p>

          <figure className="my-6 text-center">
            <img
              src="/images/calculators/kukl-pipe-size-comparison.jpg"
              alt="Illustration comparing KUKL water pipe sizes — 1/2 inch, 3/4 inch, and 1 inch — showing how pipe diameter affects minimum monthly water charge in Nepal"
              className="rounded-xl border border-[#DADCE0] shadow-sm mx-auto max-w-md w-full"
              width={480}
              height={320}
              loading="lazy"
            />
            <figcaption className="text-xs text-[#5F6368] mt-2">Larger pipe connections receive higher minimum water allocations but also carry higher base charges.</figcaption>
          </figure>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Important Billing Notes</h3>
          <ul className="list-disc pl-5 space-y-2 bg-[#F8F9FA] p-5 rounded-lg border border-[#DADCE0]">
            <li>All consumption is measured in units (kilolitres or cubic metres).</li>
            <li>1 Unit = 1 Cubic Metre = 1,000 Litres.</li>
            <li>Additional water charges apply only after the included minimum consumption for your pipe size has been exceeded.</li>
            <li>Sewerage service is calculated separately as 50% of the water charge.</li>
            <li>Actual bills may also reflect adjustments, arrears, penalties, or service-related charges depending on your account.</li>
          </ul>

        </div>
      </section>

      {/* Phase 5 — Understanding Water Units */}
      <section id="water-unit" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">What Is One Unit of Water?</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            Many households are unsure what one unit of water actually means when reading a KUKL water bill. Understanding this measurement makes it much easier to calculate your monthly water consumption and verify your bill.
          </p>
          <p className="font-bold text-[#202124]">
            For KUKL (Kathmandu Upatyaka Khanepani Limited) and most water utilities in Nepal, 1 unit of water is equal to 1,000 litres, which is also the same as 1 cubic metre (1 m³). Every increase of one unit on your water meter represents 1,000 litres of water consumed.
          </p>
          <p>
            This is the standard measurement used when applying official KUKL tariff rates and calculating monthly water charges.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Water Unit Conversion Table</h3>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Water Measurement</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold text-[#202124]">1 Unit</td>
                  <td className="p-3">1,000 Litres</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">1 Cubic Metre (m³)</td>
                  <td className="p-3">1 Unit</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">10 Units</td>
                  <td className="p-3">10,000 Litres</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">15 Units</td>
                  <td className="p-3">15,000 Litres</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">20 Units</td>
                  <td className="p-3">20,000 Litres</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">30 Units</td>
                  <td className="p-3">30,000 Litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Does KUKL Use Units Instead of Litres?</h3>
          <p>
            Water consumption is measured through a water meter installed at your property. Instead of recording every litre individually, the meter measures total consumption in cubic metres (m³), commonly referred to as units.
          </p>
          <p>Using units allows KUKL to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Measure household water consumption accurately.</li>
            <li>Apply minimum consumption thresholds based on pipe size.</li>
            <li>Calculate additional charges when consumption exceeds the minimum allowance.</li>
            <li>Calculate the mandatory 50% sewerage charge using the official tariff structure.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">How Much Water Is 1 Unit?</h3>
          <p>One unit (1,000 litres) can be easier to understand through everyday examples.</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Household Activity</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Approximate Water Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Drinking water for one person</td>
                  <td className="p-3">2–4 litres/day</td>
                </tr>
                <tr>
                  <td className="p-3">One shower</td>
                  <td className="p-3">40–80 litres</td>
                </tr>
                <tr>
                  <td className="p-3">Washing machine (one cycle)</td>
                  <td className="p-3">50–90 litres</td>
                </tr>
                <tr>
                  <td className="p-3">Toilet flushing</td>
                  <td className="p-3">6–10 litres/flush</td>
                </tr>
                <tr>
                  <td className="p-3">Kitchen cleaning</td>
                  <td className="p-3">20–40 litres/day</td>
                </tr>
                <tr>
                  <td className="p-3">Bathing a family of four (daily)</td>
                  <td className="p-3">200–350 litres</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm italic">
            These figures are approximate and help estimate how quickly household consumption adds up over a monthly billing cycle.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Household Water Usage Example</h3>
          <p>Suppose your family consumes approximately 500 litres of water each day.</p>
          <div className="bg-[#F8F9FA] p-5 rounded-lg border border-[#DADCE0] space-y-4 my-4 font-medium">
            <div>
              <div className="text-sm text-[#5F6368] uppercase tracking-wider">Daily Consumption:</div>
              <div className="text-lg text-[#202124]">500 Litres</div>
            </div>
            <div>
              <div className="text-sm text-[#5F6368] uppercase tracking-wider">Monthly Consumption (30 days):</div>
              <div className="text-lg text-[#202124]">500 × 30 = 15,000 Litres</div>
            </div>
            <div>
              <div className="text-sm text-[#5F6368] uppercase tracking-wider">Water Meter Reading:</div>
              <div className="text-lg text-[#1A73E8] font-bold">15 Units</div>
            </div>
          </div>
          <p>Your monthly KUKL bill would therefore be calculated using 15 units under the applicable tariff for your connection type.</p>
          <p className="mt-4">Understanding household water consumption is an important part of monthly financial planning. You can also estimate your income deductions using our <a href="/calculator/nepal-salary/" className="text-[#1A73E8] hover:underline">Nepal Salary Tax Calculator</a>.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Does One Unit Always Cost the Same?</h3>
          <p className="font-bold text-[#D93025] text-lg">No.</p>
          <p>A common misconception is that every unit has a fixed price.</p>
          <p>Under the official KUKL tariff structure, your total bill depends on several factors, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pipe connection size</li>
            <li>Minimum consumption allowance</li>
            <li>Minimum monthly charge</li>
            <li>Additional units consumed above the minimum threshold</li>
            <li>Mandatory 50% sewerage charge</li>
          </ul>
          <p>
            For example, a standard ½-inch residential metered connection includes a minimum charge covering the first 10 units. Additional consumption beyond that threshold is charged according to the official tariff schedule before the sewerage charge is added.
          </p>
          <p>
            Because of this structure, the effective cost per unit can vary depending on your monthly usage.
          </p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Facts</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex gap-2"><span className="text-[#1A73E8]">✓</span> 1 Unit = 1,000 Litres</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✓</span> 1 Unit = 1 Cubic Metre (m³)</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✓</span> Water meters record consumption in units.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✓</span> KUKL calculates bills using official tariff slabs rather than a single flat rate per unit.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✓</span> Your final bill also includes a mandatory 50% sewerage charge where applicable.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Phase 6 — How to Read Your KUKL Water Meter */}
      <section id="meter-reading" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">How to Read Your KUKL Water Meter</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            Every KUKL water bill starts with a simple meter reading. Your water meter records the total amount of water supplied to your property, allowing Kathmandu Upatyaka Khanepani Limited (KUKL) to calculate your monthly consumption accurately.
          </p>
          <p>
            The meter displays cumulative water usage in units (m³), where 1 unit equals 1,000 litres. Your monthly consumption is calculated by comparing the previous meter reading with the current reading.
          </p>

          <figure className="my-6 text-center">
            <img
              src="/images/calculators/kukl-meter-reading.jpg"
              alt="Illustration of a KUKL water meter showing the digital reading display used for calculating monthly water consumption in Kathmandu, Nepal"
              className="rounded-xl border border-[#DADCE0] shadow-sm mx-auto max-w-md w-full"
              width={480}
              height={320}
              loading="lazy"
            />
            <figcaption className="text-xs text-[#5F6368] mt-2">A KUKL water meter records cumulative consumption in units (1 unit = 1,000 litres).</figcaption>
          </figure>

          <div className="space-y-6 my-8">
            <div className="flex gap-4 items-start">
              <div className="bg-[#1A73E8] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-1">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] m-0">Step 1: Find Your Current Meter Reading</h3>
                <p className="mt-2 text-[#5F6368]">Locate your KUKL water meter, usually installed near the property entrance or boundary wall.</p>
                <p className="mt-1 text-[#5F6368]">The large numbers displayed on the meter represent the total water consumed since installation.</p>
                <p className="mt-1 text-[#5F6368] italic">Only the whole-number reading is generally used for monthly billing.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1A73E8] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-1">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] m-0">Step 2: Check Your Previous Reading</h3>
                <p className="mt-2 text-[#5F6368]">Your previous month's reading is printed on your latest KUKL bill.</p>
                <p className="mt-1 text-[#5F6368]">This becomes the starting point for calculating your current month's water usage.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1A73E8] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-1">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] m-0">Step 3: Calculate Water Consumption</h3>
                <p className="mt-2 text-[#5F6368]">Use the official calculation formula:</p>
                <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0] font-mono text-sm mt-3 inline-block">
                  Water Consumed (Units) = Current Meter Reading − Previous Meter Reading
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example</h3>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Description</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-[#202124]">Reading</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Previous Reading</td>
                  <td className="p-3">2,145 Units</td>
                </tr>
                <tr>
                  <td className="p-3">Current Reading</td>
                  <td className="p-3">2,160 Units</td>
                </tr>
                <tr className="bg-[#E8F0FE] font-bold">
                  <td className="p-3 text-[#1A73E8]">Total Consumption</td>
                  <td className="p-3 text-[#1A73E8]">15 Units</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Since 1 unit equals 1,000 litres, this household consumed:</p>
          <p className="font-bold">15 × 1,000 = 15,000 Litres</p>
          <p>
            The calculator then applies the official KUKL tariff, minimum charges (based on pipe size), any applicable additional unit charges, and the mandatory 50% sewerage charge to determine the final bill.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Simple Meter Reading Flow</h3>
          <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0] my-4 text-center space-y-2 font-medium">
            <div>Previous Reading</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Current Reading</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Subtract Previous Reading</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Total Units Consumed</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Apply Official KUKL Tariff</div>
            <div className="text-[#1A73E8]">↓</div>
            <div>Add 50% Sewerage Charge</div>
            <div className="text-[#1A73E8]">↓</div>
            <div className="font-bold text-[#202124]">Final Water Bill</div>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Common Meter Reading Mistakes</h3>
          <p>Many billing questions arise because of simple reading errors. Before estimating your bill, make sure you avoid these common mistakes:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#D93025]">
            <li>Reading the wrong digits from the meter.</li>
            <li>Forgetting to subtract the previous month's reading.</li>
            <li>Assuming every unit has a fixed price.</li>
            <li>Ignoring the minimum consumption included with your pipe size.</li>
            <li>Forgetting that KUKL adds a mandatory 50% sewerage charge where applicable.</li>
            <li>Mixing litres with units (1 unit = 1,000 litres).</li>
          </ul>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">How Often Does KUKL Read the Meter?</h3>
          <p>
            KUKL normally records water meter readings during each billing cycle. The difference between consecutive readings determines your monthly water consumption.
          </p>
          <p>
            If a reading cannot be taken, KUKL may estimate usage according to its billing procedures, with adjustments made after an actual meter reading becomes available.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Can I Estimate My Bill Before Receiving It?</h3>
          <p className="font-bold text-[#188038] text-lg">Yes.</p>
          <p>
            Once you know your current meter reading, simply subtract your previous reading to determine the number of units consumed. You can then use this KUKL Water Bill Calculator to instantly estimate:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Water charge</li>
            <li>Sewerage charge</li>
            <li>Total payable amount</li>
            <li>Complete bill breakdown based on the official tariff structure</li>
          </ul>
          <p>This helps you verify your monthly bill before making a payment.</p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Tips</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Always compare your current reading with your previous bill.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Remember that 1 unit = 1,000 litres.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Bills are calculated using the official KUKL tariff structure, not a flat price per unit.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Pipe size, minimum charges, additional usage, and the 50% sewerage charge all affect the final amount.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Phase 7 — Understanding Water Charges */}
      <section id="water-charges" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight">Water Charges Explained</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            A KUKL water bill is made up of several charges rather than a single price per unit. The final amount depends on your connection type, pipe size, monthly water consumption, and the official tariff structure.
          </p>
          <p>For most residential consumers, the bill consists of four main components:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Water Charge</li>
            <li>Minimum Charge</li>
            <li>Additional Consumption Charge (if applicable)</li>
            <li>Sewerage Charge</li>
          </ul>
          <p>Understanding each component makes it easier to verify your monthly bill and estimate future water costs.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">1. Minimum Water Charge</h3>
          <p>Every metered connection has a minimum monthly charge, even if water consumption is low.</p>
          <p>For a standard ½-inch residential connection, the official tariff includes:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Connection Size</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Minimum Consumption</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Minimum Water Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold text-[#202124]">½ Inch</td>
                  <td className="p-3">Up to 10 Units</td>
                  <td className="p-3">Rs. 100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            If your monthly consumption remains within the included minimum units, no additional water consumption charge is applied.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">2. Additional Water Consumption Charge</h3>
          <p>
            When your monthly water usage exceeds the included minimum allowance, KUKL applies an additional charge for every extra unit consumed.
          </p>
          <p>For a standard ½-inch residential metered connection:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Consumption</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold text-[#202124]">First 10 Units</td>
                  <td className="p-3">Included in Minimum Charge</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Above 10 Units</td>
                  <td className="p-3">Rs. 32 per additional unit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Only the units above the minimum threshold are charged at the additional rate.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">3. Sewerage Charge</h3>
          <p>
            KUKL also applies a mandatory sewerage charge equal to 50% of the total water charge for customers receiving sewerage services.
          </p>
          <p>The sewerage charge helps fund:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Wastewater collection</li>
            <li>Sewer network maintenance</li>
            <li>Wastewater treatment</li>
            <li>Sanitation infrastructure</li>
          </ul>
          <p>The sewerage amount is calculated automatically after the water charge has been determined.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">4. Total Payable Bill</h3>
          <p>Your final monthly bill is calculated by combining the water charge and sewerage charge.</p>
          <h4 className="font-bold text-[#202124] mt-4 mb-2">Formula</h4>
          <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0] text-center font-medium my-4">
            <div>Total Bill</div>
            <div className="text-[#1A73E8]">＝</div>
            <div>Water Charge</div>
            <div className="text-[#1A73E8]">＋</div>
            <div>50% Sewerage Charge</div>
          </div>
          <p className="mt-2 text-sm italic">The calculator performs this calculation automatically using the official tariff structure.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Does My Water Bill Increase?</h3>
          <p>
            Many households notice that their bill changes from month to month, even though their water usage appears similar.
          </p>
          <p>Common reasons include:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#202124]">
            <li>Higher monthly water consumption.</li>
            <li>Consumption exceeding the minimum included units.</li>
            <li>Larger pipe connection sizes with higher minimum charges.</li>
            <li>Additional units charged according to the official tariff.</li>
            <li>The mandatory 50% sewerage charge increasing proportionally with water charges.</li>
          </ul>
          <p className="mt-4 font-medium bg-[#FEF7E0] p-4 rounded-md border border-[#F2C94C] text-[#B37400]">
            A higher bill does not always mean the tariff has changed—it often reflects higher recorded consumption.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Does Pipe Size Affect the Bill?</h3>
          <p className="font-bold text-[#188038] text-lg">Yes.</p>
          <p>Pipe size plays an important role in how KUKL calculates bills.</p>
          <p>Larger pipe connections generally have:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Higher minimum consumption allowances.</li>
            <li>Higher minimum monthly charges.</li>
            <li>Different billing thresholds before additional unit charges apply.</li>
          </ul>
          <p>
            Because of this, two households using similar amounts of water may receive different bills if their connection sizes are different.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Doesn't Every Unit Have the Same Price?</h3>
          <p>A common misunderstanding is that KUKL charges one fixed amount for every unit of water.</p>
          <p>In reality, billing follows the official tariff structure, which combines:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minimum monthly charge</li>
            <li>Included minimum consumption</li>
            <li>Additional unit charges</li>
            <li>Sewerage charge</li>
          </ul>
          <p>
            As a result, the effective cost per unit varies depending on total monthly usage rather than remaining constant.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">How This Calculator Estimates Your Bill</h3>
          <p>This calculator automatically:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Calculates total units consumed.</li>
            <li>Applies the correct minimum charge.</li>
            <li>Calculates additional unit charges where applicable.</li>
            <li>Adds the official 50% sewerage charge.</li>
            <li>Displays a complete breakdown of your payable amount.</li>
          </ul>
          <p>This allows you to compare your estimated bill with the amount shown on your KUKL invoice. If you are calculating household or business expenses, you might also find our <a href="/calculator/nepal-income-tax/" className="text-[#1A73E8] hover:underline">Income Tax Calculator</a> useful for estimating your overall tax liabilities.</p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#E8F0FE]">
                  <tr className="border-b-2 border-[#1A73E8]">
                    <th className="py-2 pr-4 font-bold uppercase tracking-wider text-[#1A73E8]">Charge</th>
                    <th className="py-2 pr-4 font-bold uppercase tracking-wider text-[#1A73E8]">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A73E8]/20">
                  <tr>
                    <td className="py-2 pr-4 font-bold text-[#202124]">Minimum Charge</td>
                    <td className="py-2 pr-4">Covers the minimum monthly water supply allowance.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-[#202124]">Additional Consumption Charge</td>
                    <td className="py-2 pr-4">Applied only after exceeding the included units.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-[#202124]">Sewerage Charge</td>
                    <td className="py-2 pr-4">50% of the water charge for sewerage services.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-bold text-[#202124]">Total Bill</td>
                    <td className="py-2 pr-4 font-bold text-[#1A73E8]">Water Charge + Sewerage Charge.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Phase 8 — KUKL Water Bill Calculation Examples */}
      <section id="examples" className="scroll-mt-24">
        <h2 id="examples" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Water Bill Examples</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            The examples below use the official KUKL tariff structure for a standard ½-inch residential metered connection.
          </p>
          <div className="bg-[#F8F9FA] p-5 rounded-lg border border-[#DADCE0] mb-6">
            <h4 className="font-bold text-[#202124] mb-2">Assumptions:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#5F6368]">
              <li>Minimum consumption: 10 Units</li>
              <li>Minimum water charge: Rs. 100</li>
              <li>Additional consumption: Rs. 32 per unit</li>
              <li>Sewerage charge: 50% of the water charge</li>
            </ul>
          </div>
          <p className="text-sm italic text-[#5F6368]">
            These examples are provided for educational purposes to help you understand how the calculator works.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example 1 — 5 Units of Water</h3>
          <p>Since the monthly consumption is below the included minimum allowance, only the minimum charge applies.</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Water Charge</td>
                  <td className="p-3">Rs. 100</td>
                </tr>
                <tr>
                  <td className="p-3">Sewerage Charge (50%)</td>
                  <td className="p-3">Rs. 50</td>
                </tr>
                <tr className="bg-[#F8F9FA] font-bold text-[#202124]">
                  <td className="p-3">Total Payable Bill</td>
                  <td className="p-3">Rs. 150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#FEF7E0] p-4 rounded-lg border border-[#F2C94C] text-sm text-[#B37400] font-mono">
            <strong>Calculation:</strong> Water Charge = Rs.100 | Sewerage = Rs.50 | Total = Rs.150
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example 2 — 10 Units of Water</h3>
          <p>Ten units are fully covered by the minimum monthly charge.</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Water Charge</td>
                  <td className="p-3">Rs.100</td>
                </tr>
                <tr>
                  <td className="p-3">Sewerage Charge</td>
                  <td className="p-3">Rs.50</td>
                </tr>
                <tr className="bg-[#F8F9FA] font-bold text-[#202124]">
                  <td className="p-3">Total Bill</td>
                  <td className="p-3">Rs.150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm italic">No additional unit charges apply.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example 3 — 15 Units of Water</h3>
          <p>Consumption exceeds the included allowance by 5 units.</p>
          <div className="space-y-3 my-4 font-medium text-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <span className="text-[#1A73E8] font-bold min-w-[70px]">Step 1</span>
              <span className="text-[#5F6368] min-w-[150px]">Additional Units</span>
              <span className="text-[#202124]">15 − 10 = 5 Units</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <span className="text-[#1A73E8] font-bold min-w-[70px]">Step 2</span>
              <span className="text-[#5F6368] min-w-[150px]">Additional Charge</span>
              <span className="text-[#202124]">5 × Rs.32 = Rs.160</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <span className="text-[#1A73E8] font-bold min-w-[70px]">Step 3</span>
              <span className="text-[#5F6368] min-w-[150px]">Water Charge</span>
              <span className="text-[#202124]">Rs.100 + Rs.160 = Rs.260</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <span className="text-[#1A73E8] font-bold min-w-[70px]">Step 4</span>
              <span className="text-[#5F6368] min-w-[150px]">Sewerage Charge</span>
              <span className="text-[#202124]">50% × Rs.260 = Rs.130</span>
            </div>
          </div>
          <h4 className="font-bold text-[#202124] mt-6 mb-2">Final Bill</h4>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Water Charge</td>
                  <td className="p-3">Rs.260</td>
                </tr>
                <tr>
                  <td className="p-3">Sewerage Charge</td>
                  <td className="p-3">Rs.130</td>
                </tr>
                <tr className="bg-[#F8F9FA] font-bold text-[#202124]">
                  <td className="p-3">Total Bill</td>
                  <td className="p-3">Rs.390</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example 4 — 20 Units of Water</h3>
          <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0] mb-4 font-mono text-sm">
            <div>Additional Units: 20 − 10 = 10 Units</div>
            <div>Additional Charge: 10 × Rs.32 = Rs.320</div>
          </div>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Minimum Water Charge</td>
                  <td className="p-3">Rs.100</td>
                </tr>
                <tr>
                  <td className="p-3">Additional Charge</td>
                  <td className="p-3">Rs.320</td>
                </tr>
                <tr className="bg-[#F1F3F4] font-medium text-[#202124]">
                  <td className="p-3">Water Charge</td>
                  <td className="p-3">Rs.420</td>
                </tr>
                <tr>
                  <td className="p-3">Sewerage Charge</td>
                  <td className="p-3">Rs.210</td>
                </tr>
                <tr className="bg-[#E8F0FE] font-bold text-[#1A73E8]">
                  <td className="p-3">Total Bill</td>
                  <td className="p-3">Rs.630</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Example 5 — 30 Units of Water</h3>
          <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0] mb-4 font-mono text-sm">
            <div>Additional Units: 30 − 10 = 20 Units</div>
            <div>Additional Charge: 20 × Rs.32 = Rs.640</div>
          </div>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3">Minimum Water Charge</td>
                  <td className="p-3">Rs.100</td>
                </tr>
                <tr>
                  <td className="p-3">Additional Charge</td>
                  <td className="p-3">Rs.640</td>
                </tr>
                <tr className="bg-[#F1F3F4] font-medium text-[#202124]">
                  <td className="p-3">Water Charge</td>
                  <td className="p-3">Rs.740</td>
                </tr>
                <tr>
                  <td className="p-3">Sewerage Charge</td>
                  <td className="p-3">Rs.370</td>
                </tr>
                <tr className="bg-[#E8F0FE] font-bold text-[#1A73E8]">
                  <td className="p-3">Total Bill</td>
                  <td className="p-3">Rs.1,110</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Quick Bill Comparison</h3>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr className="border-b-2 border-[#1A73E8]">
                  <th className="p-3 font-bold uppercase tracking-wider">Monthly Consumption</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Water Charge</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Sewerage</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Total Bill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold text-[#202124]">5 Units</td>
                  <td className="p-3">Rs.100</td>
                  <td className="p-3">Rs.50</td>
                  <td className="p-3 font-bold text-[#1A73E8]">Rs.150</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">10 Units</td>
                  <td className="p-3">Rs.100</td>
                  <td className="p-3">Rs.50</td>
                  <td className="p-3 font-bold text-[#1A73E8]">Rs.150</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">15 Units</td>
                  <td className="p-3">Rs.260</td>
                  <td className="p-3">Rs.130</td>
                  <td className="p-3 font-bold text-[#1A73E8]">Rs.390</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">20 Units</td>
                  <td className="p-3">Rs.420</td>
                  <td className="p-3">Rs.210</td>
                  <td className="p-3 font-bold text-[#1A73E8]">Rs.630</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">30 Units</td>
                  <td className="p-3">Rs.740</td>
                  <td className="p-3">Rs.370</td>
                  <td className="p-3 font-bold text-[#1A73E8]">Rs.1,110</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">If you're planning your monthly household budget, you may also want to estimate your electricity expenses using our <a href="/calculator/electricity-bill/" className="text-[#1A73E8] hover:underline">Electricity Bill Calculator</a>.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Your Actual Bill May Be Different</h3>
          <p>These examples are based on a ½-inch residential metered connection using the official KUKL tariff structure.</p>
          <p>Your actual bill may differ because of factors such as:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A different pipe connection size.</li>
            <li>Commercial or institutional water connections.</li>
            <li>Different minimum consumption thresholds.</li>
            <li>Additional service-related charges where applicable.</li>
            <li>Future tariff revisions approved by the relevant authority.</li>
          </ul>
          <p className="mt-4 font-medium">
            For the most accurate estimate, enter your actual monthly consumption and connection details into the calculator above.
          </p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Key Takeaways</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> The first 10 units are covered by the minimum monthly water charge for a standard ½-inch residential metered connection.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Only additional units are charged at the applicable per-unit rate.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> The sewerage charge is calculated as 50% of the water charge.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> The final bill equals the water charge plus the sewerage charge.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> The calculator automatically performs all calculations using the official tariff structure.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Phase 9 — KUKL Online Bill Payment & Customer Services */}
      <section id="online-payment" className="scroll-mt-24">
        <h2 id="online-payment-title" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Pay Your KUKL Bill Online</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            Kathmandu Upatyaka Khanepani Limited (KUKL) provides several official digital services that allow customers to check their water bills, pay outstanding balances, access customer information, and submit service requests without visiting a branch office.
          </p>
          <p>
            After calculating your estimated bill using the NepaCalc KUKL Water Bill Calculator, you can compare the result with your official KUKL bill and complete payment through the available online channels. KUKL officially supports online payments through its Customer Portal, Mobile App, Internet Banking, Mobile Banking, Fonepay-enabled banks, ConnectIPS, and other integrated payment providers.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Official Ways to Check Your KUKL Water Bill</h3>
          <p>You can access your latest bill and customer information using the official KUKL digital services.</p>
          
          <h4 className="font-bold text-[#202124] mt-4 mb-2">Available Options</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Official KUKL Customer Web Portal</li>
            <li>KUKL Mobile App</li>
            <li>Integrated Mobile Banking</li>
            <li>Internet Banking</li>
            <li>Branch Customer Service</li>
          </ul>

          <p className="mt-4">The customer portal allows users to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View current bill</li>
            <li>Check previous bills</li>
            <li>Verify customer information</li>
            <li>Monitor payment history</li>
            <li>Access account details</li>
          </ul>
          <p className="mt-4 text-sm italic">These services are provided directly by Kathmandu Upatyaka Khanepani Limited for registered customers.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">How to Pay Your KUKL Water Bill Online</h3>
          <p>Online payment usually takes only a few minutes.</p>
          
          <div className="space-y-4 my-6">
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <p className="m-0 text-[#202124]">Open your preferred payment application or online banking service.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <p className="m-0 text-[#202124]">Choose Water Bill or KUKL Water Bill Payment.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <p className="m-0 text-[#202124]">Enter your Customer Number or Connection Number.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <p className="m-0 text-[#202124]">Verify your customer details and outstanding bill.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
              <div>
                <p className="m-0 text-[#202124]">Confirm the payment.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <div className="bg-[#1A73E8] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0">6</div>
              <div>
                <p className="m-0 text-[#202124]">Save the payment receipt for future reference.</p>
              </div>
            </div>
          </div>
          <p>KUKL also provides its own customer portal and mobile application for digital payments and account management.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Supported Online Payment Methods</h3>
          <p>KUKL supports multiple digital payment channels through its official online payment system.</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Payment Method</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-center">Supported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr><td className="p-3">KUKL Customer Portal</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">KUKL Mobile App</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">Mobile Banking</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">Internet Banking</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">Fonepay Integrated Banks</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">ConnectIPS</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
                <tr><td className="p-3">QR Payment (supported providers)</td><td className="p-3 text-center text-[#188038] font-bold">✓</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm italic">Depending on your bank or payment provider, additional payment options may also be available through integrated utility payment services.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Online Payment Service Charges</h3>
          <p>According to KUKL's published online payment information:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Monthly Bill Amount</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Service Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr><td className="p-3">Up to Rs. 500</td><td className="p-3">Free</td></tr>
                <tr><td className="p-3">Above Rs. 501</td><td className="p-3">Maximum Rs. 5</td></tr>
                <tr><td className="p-3">ConnectIPS</td><td className="p-3">As published by ConnectIPS</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-[#B37400] bg-[#FEF7E0] p-4 rounded-lg border border-[#F2C94C]">
            Actual charges may vary if your payment provider applies its own service fee. Always verify the final amount before confirming payment.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">KUKL Mobile App Features</h3>
          <p>The official KUKL Mobile App provides convenient access to several customer services, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View water bills</li>
            <li>Online bill payment</li>
            <li>Customer account information</li>
            <li>Digital services</li>
            <li>Customer support access</li>
          </ul>
          <p className="mt-4 text-sm italic">The application is maintained by Kathmandu Upatyaka Khanepani Limited and is intended to simplify account management for customers.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Customer Portal Features</h3>
          <p>The official KUKL Customer Portal allows customers to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access account information</li>
            <li>View outstanding bills</li>
            <li>Review payment history</li>
            <li>Manage customer records</li>
            <li>Access online services</li>
          </ul>
          <p className="mt-4 text-sm italic">The portal is available through KUKL's official website.</p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Tips Before Paying</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Verify your Customer Number before payment.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Check the billing amount carefully.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Keep the payment receipt until the transaction is confirmed.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Compare your official bill with the estimated result from this calculator if you want to understand how the total was calculated.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> If you own a car or bike, don't forget to budget for your annual renewals using our <a href="/calculator/nepal-vehicle-tax/" className="text-[#1A73E8] hover:underline">Vehicle Tax Calculator</a>.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Contact your local KUKL office if you notice unexpected differences in meter readings or charges.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Phase 10 — Drinking Water Quality Standards in Nepal */}
      <section id="water-quality" className="scroll-mt-24">
        <h2 id="water-quality" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Drinking Water Quality Standards in Nepal</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-4">
          <p className="text-lg leading-relaxed text-[#3C4043]">
            Kathmandu Upatyaka Khanepani Limited (KUKL) supplies drinking water under the regulatory framework established by the Government of Nepal. National drinking water quality requirements are published by the Ministry of Water Supply through the Nepal Drinking Water Quality Standards.
          </p>
          <p>
            These standards define the acceptable physical, chemical, and microbiological characteristics of drinking water to help protect public health and maintain safe water supplies.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">What Do the National Standards Cover?</h3>
          <p>The national drinking water standards evaluate water quality across three main categories:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Category</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Physical Parameters</td>
                  <td className="p-3">Measure appearance and basic water characteristics.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Chemical Parameters</td>
                  <td className="p-3">Monitor naturally occurring minerals and chemical substances.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#202124]">Microbiological Parameters</td>
                  <td className="p-3">Detect harmful microorganisms that may affect public health.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Together, these parameters help ensure drinking water remains suitable for household use.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Key Drinking Water Quality Parameters</h3>
          <p>Some of the most commonly monitored parameters include:</p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm text-left border-collapse border border-[#DADCE0]">
              <thead className="bg-[#E8F0FE] text-[#1A73E8]">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider">Parameter</th>
                  <th className="p-3 font-bold uppercase tracking-wider">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr><td className="p-3 font-bold text-[#202124]">pH</td><td className="p-3">Measures whether water is acidic or alkaline.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Turbidity</td><td className="p-3">Indicates how clear or cloudy the water is.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Residual Chlorine</td><td className="p-3">Confirms effective disinfection where chlorination is used.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Iron</td><td className="p-3">Helps assess colour, taste, and distribution system quality.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Manganese</td><td className="p-3">Monitored to maintain acceptable water quality.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Arsenic</td><td className="p-3">Tested to protect public health.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Fluoride</td><td className="p-3">Monitored within recommended safe limits.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Nitrate</td><td className="p-3">Indicates possible contamination from environmental sources.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">E. coli</td><td className="p-3">Confirms microbiological safety of drinking water.</td></tr>
                <tr><td className="p-3 font-bold text-[#202124]">Total Coliform</td><td className="p-3">Used as an indicator of distribution system hygiene.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm italic">These parameters are monitored according to the applicable national drinking water quality standards.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Why Water Quality Testing Matters</h3>
          <p>Regular water quality monitoring helps:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#202124] font-medium">
            <li>Protect public health.</li>
            <li>Identify contamination risks early.</li>
            <li>Maintain safe drinking water distribution systems.</li>
            <li>Verify treatment effectiveness.</li>
            <li>Improve confidence in public water supplies.</li>
          </ul>
          <p>Routine testing is an important part of maintaining reliable municipal water services.</p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Does KUKL Test Water Quality?</h3>
          <p>
            KUKL operates water supply and wastewater systems across the Kathmandu Valley and conducts water quality monitoring as part of its operational responsibilities. Water quality testing supports the delivery of treated drinking water through the distribution network, although quality can also be influenced by local pipelines, household storage tanks, and internal plumbing.
          </p>
          <p className="bg-[#FEF7E0] border border-[#F2C94C] p-4 rounded-lg mt-4 text-sm text-[#B37400]">
            If you notice unusual colour, taste, odour, or visible contamination, you should contact KUKL for guidance and avoid using the water for drinking until the issue has been assessed.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Is Tap Water Always Safe to Drink?</h3>
          <p>
            Although treated municipal water is supplied through the public distribution system, actual water quality at the point of use may vary depending on factors such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Household storage tank cleanliness.</li>
            <li>Internal plumbing conditions.</li>
            <li>Water pipe leaks or damage.</li>
            <li>Local distribution interruptions.</li>
            <li>Temporary maintenance work.</li>
          </ul>
          <p>
            Many households also use additional treatment methods, such as boiling or filtration, depending on local conditions and personal preference.
          </p>

          <h3 className="text-xl font-bold text-[#202124] mt-8 mb-4">Where Can I Find the Official Standards?</h3>
          <p>
            The official drinking water quality requirements are published by the Government of Nepal, Ministry of Water Supply under the National Drinking Water Quality Standards.
          </p>
          <p>For the latest technical specifications and regulatory updates, always refer to the official government publication.</p>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <h3 className="text-lg font-black text-[#1A73E8] mb-3">Quick Facts</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Nepal has national drinking water quality standards.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Standards include physical, chemical, and microbiological parameters.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> E. coli is monitored as an important indicator of microbiological safety.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Residual chlorine is monitored where chlorination systems are in operation.</li>
              <li className="flex gap-2"><span className="text-[#1A73E8]">✔</span> Water quality standards are published by the Ministry of Water Supply.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Phase 11 — Frequently Asked Questions */}
      <section id="faq" className="scroll-mt-24">
        <h2 id="faqs" className="text-2xl md:text-3xl font-black text-[#202124] mb-4 tracking-tight scroll-mt-24">Frequently Asked Questions</h2>
        <div className="prose prose-slate max-w-none text-[#5F6368] space-y-6">
          
          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">1. How is my KUKL water bill calculated?</h3>
            <p className="m-0">
              KUKL calculates your monthly water bill using your total water consumption, pipe connection size, and the applicable tariff structure. For most residential metered connections, the minimum monthly charge covers the first allocated units of water. If your consumption exceeds the minimum allowance, additional units are charged according to the official tariff. A sewerage charge equal to 50% of the water charge is then added to determine the final payable bill.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">2. What is one unit of water in Nepal?</h3>
            <p className="m-0">
              One unit of water is equal to 1,000 litres, which is the same as 1 cubic metre (1 m³). KUKL records household water consumption in units using the water meter installed at your property.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">3. Why does KUKL charge a sewerage fee?</h3>
            <p className="m-0">
              The sewerage charge helps cover the cost of wastewater collection, sewer network maintenance, and wastewater treatment services. For eligible connections, KUKL applies a sewerage charge equal to 50% of the water charge, which is added automatically when calculating the final bill.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">4. What is the minimum monthly water bill?</h3>
            <p className="m-0">
              The minimum monthly bill depends on your pipe connection size and the applicable tariff category. For a standard ½-inch residential metered connection, the minimum water charge covers the minimum consumption allowance before any additional unit charges apply. If your usage remains within that allowance, only the minimum water charge and applicable sewerage charge are payable.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">5. How do I read my KUKL water meter?</h3>
            <p className="mt-0 mb-2">
              Read the current number displayed on your water meter and subtract the previous month's reading shown on your last bill.
            </p>
            <div className="bg-[#F8F9FA] p-3 rounded text-center font-mono text-sm border border-[#DADCE0] mb-2">
              Water Consumed = Current Reading − Previous Reading
            </div>
            <p className="m-0">
              The result is your monthly water consumption in units, which KUKL uses to calculate your bill.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">6. How can I pay my KUKL water bill online?</h3>
            <p className="m-0">
              You can pay your KUKL water bill through the official KUKL Customer Portal, KUKL Mobile App, Mobile Banking, Fonepay Bills, eSewa, Khalti, ConnectIPS, and participating banks. You will generally need your customer or connection number to retrieve your latest bill before making payment.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">7. Does pipe size affect my water bill?</h3>
            <p className="m-0">
              <strong className="text-[#1A73E8]">Yes.</strong> Pipe size directly affects how KUKL calculates your bill. Different pipe sizes have different minimum consumption allowances, minimum charges, and tariff thresholds. As a result, two households using similar amounts of water may receive different bills if they have different connection sizes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#DADCE0] shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] m-0 mb-2">8. Does this calculator use the official KUKL tariff?</h3>
            <p className="m-0">
              <strong className="text-[#1A73E8]">Yes.</strong> This calculator is designed to estimate water bills using the official KUKL tariff structure, including minimum charges, applicable additional consumption charges, and the 50% sewerage charge. The estimated result helps you understand how your monthly bill is calculated, although the official bill issued by KUKL remains the final payable amount.
            </p>
          </div>

          <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#1A73E8] my-8">
            <p className="m-0 font-medium">Looking for more financial tools? You can also calculate applicable tax deductions using our <a href="/calculator/tds/" className="text-[#1A73E8] font-bold hover:underline">TDS Calculator</a>.</p>
          </div>

        </div>
      </section>

      {/* Phase 13 — External Linking / References */}
      <section className="mt-12 pt-8 border-t border-[#DADCE0] mb-8">
        <h3 className="text-lg font-bold text-[#202124] mb-4">Sources & Official References</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F6368]">
          <li>Tariff rates and billing methodology are based on official information from <a href="https://kathmanduwater.org/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Kathmandu Upatyaka Khanepani Limited (KUKL)</a>.</li>
          <li>National drinking water quality requirements are established by the <a href="https://mows.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">Ministry of Water Supply, Government of Nepal</a>.</li>
        </ul>
      </section>

    </article>
  );
}
