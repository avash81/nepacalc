import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Zap, ShieldCheck, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: "About NepaCalc: Nepal's Free Calculator Platform",
  description: "NepaCalc is a simple place for Nepal to find free calculators for tax, VAT, engineering, health, and land.",
  alternates: {
    canonical: 'https://nepacalc.com/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            About NepaCalc
          </h1>
          <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto">
            A helpful set of tools for everyone in Nepal. We make math easy and accurate for you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Why We Made NepaCalc</h2>
          <p><strong>NepaCalc was made to solve a real problem.</strong></p>
          <p>For a long time, figuring out things like your income tax, vehicle tax, or water bills in Nepal was hard. You had to look through old papers or use websites that didn't understand how things work here. Most tools didn't know what a Ropani was or how our tax rules change every year.</p>
          <p>We wanted to change that. NepaCalc is a free site made just for people in Nepal. It uses our own units, our own dates, and our own rules. We built it so you can get the right numbers quickly and easily.</p>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">What We Care About</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-4">
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Target className="w-5 h-5 text-blue-600"/> Correct Numbers</h3>
                <p className="text-sm mt-1">We update our tools every year on Shrawan 1. We check every formula against official rules to make sure you get the right answer.</p>
             </div>
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> Very Fast</h3>
                <p className="text-sm mt-1">NepaCalc works great on your phone. It loads quickly and gives you answers instantly, even on slow internet.</p>
             </div>
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-500"/> Your Privacy</h3>
                <p className="text-sm mt-1">Your salary, health info, and tax numbers stay on your own device. We do not save your info or send it to any servers.</p>
             </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">How We Check Our Data</h2>
          <p>Our rules in Nepal change often. A small mistake in a tax calculation can be a big problem for you. We don't want that to happen.</p>
          <p>Every tool here comes from official government news. We check them every year and make sure they match the latest official rules.</p>
          
          <div className="overflow-x-auto my-4 not-prose">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b">
                <tr><th className="py-2 px-3">Tool Type</th><th className="py-2 px-3">Where we get info</th></tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr><td className="py-2 px-3 font-semibold">Tax and VAT</td><td className="py-2 px-3">Inland Revenue Department</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Vehicle and Blue Book</td><td className="py-2 px-3">Department of Transport Management</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Bank Rates</td><td className="py-2 px-3">Nepal Rastra Bank</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Electricity Bills</td><td className="py-2 px-3">Nepal Electricity Authority</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Water Bills</td><td className="py-2 px-3">KUKL</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Gold and Silver</td><td className="py-2 px-3">Official Dealers Federation</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Land and Property</td><td className="py-2 px-3">Land Management Department</td></tr>
              </tbody>
            </table>
          </div>
          <p>Every tool shows you where the data came from. If you ever find a mistake, please let us know right away.</p>
        </section>

        <section className="bg-blue-50 rounded-xl p-5 md:p-6 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">How to Help: Send us a Suggestion</h2>
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Rules change fast. If you see something that is wrong or if you want a new tool, please tell us. We usually fix reported issues within one day.</p>
            <ul className="list-disc pl-5">
               <li><strong>See an error?</strong> Email us with the correct info.</li>
               <li><strong>Want a new tool?</strong> Let us know what you need.</li>
               <li><strong>Found a bug?</strong> Tell us what went wrong.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href="mailto:support@nepacalc.com" className="bg-white border border-gray-200 text-gray-800 font-bold py-1.5 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors">
                support@nepacalc.com
              </a>
              <Link href="/contact" className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                Contact Form
              </Link>
            </div>
            <p className="mt-2 text-xs italic">Every tool has a link to report an error. Using it helps everyone else who uses the site.</p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Top Tools</h2>
          <div className="overflow-x-auto not-prose my-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b">
                <tr><th className="py-2 px-3">Tax and Finance</th><th className="py-2 px-3">Math and Science</th><th className="py-2 px-3">Health</th></tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Income Tax</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/scientific-calculator/" className="text-blue-600 hover:underline">Scientific Calc</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/bmi/" className="text-blue-600 hover:underline">BMI</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-vat/" className="text-blue-600 hover:underline">VAT</Link></td>
                  <td className="py-2 px-3"><Link href="/engineering/3d/" className="text-blue-600 hover:underline">3D Grapher</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/bmr/" className="text-blue-600 hover:underline">BMR</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/lcm-gcf-calculator/" className="text-blue-600 hover:underline">LCM and GCF</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/calorie-calculator/" className="text-blue-600 hover:underline">Calories</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">EMI</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/matrices/" className="text-blue-600 hover:underline">Matrix</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/ideal-weight/" className="text-blue-600 hover:underline">Ideal Weight</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Coming Soon</h2>
          <p>We are working on more tools for 2026. Here is what we have planned:</p>
          <ul>
            <li><strong>Local tax</strong> tools for all provinces.</li>
            <li><strong>Live rates</strong> for currency exchange.</li>
            <li><strong>Nepali language</strong> for every tool.</li>
            <li><strong>NEPSE tools</strong> for stock market investors.</li>
          </ul>
        </section>
        
        <div className="text-center mt-8">
           <p className="text-xs text-gray-500 italic">Last updated: May 1, 2026. NepaCalc is located in Kathmandu, Nepal. All amounts are in NPR. We use the Bikram Sambat calendar.</p>
        </div>

      </div>
    </div>
  );
}
