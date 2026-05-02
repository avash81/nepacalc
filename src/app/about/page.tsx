import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Zap, ShieldCheck, Mail, Github, Linkedin, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: "About NepaCal — Nepal's Free Calculator Platform",
  description: "NepaCal is built by Avash Chaudhary in Kathmandu — 100+ free calculators for Nepal income tax, VAT, engineering, health, land, and more.",
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
            About NepaCal
          </h1>
          <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto">
            Nepal's most comprehensive free calculator platform. Built for precision, designed for accessibility.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Why NepaCal Exists</h2>
          <p><strong>I built NepaCal because I was frustrated.</strong></p>
          <p>Every time I needed to calculate something Nepal-specific — my income tax, vehicle tax, KUKL water bill, or blue book renewal cost — I either had to dig through government PDFs or use generic calculators that had no idea what a "Ropani" or an "SSF contribution" was. The few Nepal-specific tools I found were outdated, clunky, or simply wrong.</p>
          <p>The tools I wished existed didn't exist. So I built them.</p>
          <p>Today, NepaCal is a free online platform designed specifically for Nepali users — using Nepali units, Bikram Sambat (BS) dates, IRD and NRB guidelines, and NPR amounts. Every single tool is built with a Nepali context that generic calculators cannot provide.</p>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-4">
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Target className="w-5 h-5 text-blue-600"/> 100% Accuracy</h3>
                <p className="text-sm mt-1">All financial and tax calculators are updated every Shrawan 1, aligning with the latest Finance Act. Every algorithm is cross-checked against official circulars.</p>
             </div>
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> Lightning Fast</h3>
                <p className="text-sm mt-1">Optimized for Nepal's mobile networks. NepaCal loads in under 2 seconds and all calculations run client-side — no round-trips to servers, no lag.</p>
             </div>
             <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-500"/> Absolute Privacy</h3>
                <p className="text-sm mt-1">Your salary figures, health data, and tax numbers never leave your device. All calculations happen locally. We do not store your inputs.</p>
             </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">How We Verify Our Data</h2>
          <p>Nepal's government changes rates and regulations every year. A 10-rupee difference in a tax calculation can mean a thousand-rupee penalty for a user who relied on an outdated tool. That is unacceptable.</p>
          <p>Every Nepal-specific calculator on NepaCal is sourced from official publications, verified annually against the Nepal Gazette, and cross-referenced with official circulars.</p>
          
          <div className="overflow-x-auto my-4 not-prose">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b">
                <tr><th className="py-2 px-3">Tool Category</th><th className="py-2 px-3">Official Source</th></tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr><td className="py-2 px-3 font-semibold">Income Tax, VAT, TDS</td><td className="py-2 px-3">Inland Revenue Department — ird.gov.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Vehicle Tax, Blue Book</td><td className="py-2 px-3">Department of Transport Management — dotm.gov.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Banking & Exchange Rates</td><td className="py-2 px-3">Nepal Rastra Bank — nrb.org.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Electricity Bills</td><td className="py-2 px-3">Nepal Electricity Authority — nea.org.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Water Bills</td><td className="py-2 px-3">KUKL — kukl.gov.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Gold & Silver Prices</td><td className="py-2 px-3">Federation of Nepal Gold & Silver Dealers — fenegosida.com.np</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Land & Property</td><td className="py-2 px-3">Department of Land Management & Archive — dolma.gov.np</td></tr>
              </tbody>
            </table>
          </div>
          <p>Every rate table on NepaCal shows a "Source" line and the fiscal year it applies to. If something is wrong, we want to know immediately.</p>
        </section>

        <section className="bg-blue-50 rounded-xl p-5 md:p-6 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Help Us Stay Accurate: Suggestion & Correction Box</h2>
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Nepal's regulations change fast. If you spot a rate mismatch, a calculation error, or a missing tool, please tell us. We verify and fix reported issues within 24 hours where possible.</p>
            <ul className="list-disc pl-5">
               <li><strong>Spotted an error?</strong> Email us which calculator and what the correct rate should be.</li>
               <li><strong>Want a new tool?</strong> Tell us which calculation you do manually every month.</li>
               <li><strong>Found a bug?</strong> Describe what happened and which calculator was affected.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href="mailto:admin@nepacalc.com" className="bg-white border border-gray-200 text-gray-800 font-bold py-1.5 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors">
                admin@nepacalc.com
              </a>
              <Link href="/contact" className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                Contact Form
              </Link>
            </div>
            <p className="mt-2 text-xs italic">On every calculator page, there is a "Report a correction" link below the results. Use it — you help every other Nepali user who relies on that tool.</p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Explore Our Top Calculators</h2>
          <div className="overflow-x-auto not-prose my-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b">
                <tr><th className="py-2 px-3">Nepal Tax & Finance</th><th className="py-2 px-3">Engineering & Math</th><th className="py-2 px-3">Health & Fitness</th></tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Income Tax Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/scientific-calculator/" className="text-blue-600 hover:underline">Scientific Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/bmi/" className="text-blue-600 hover:underline">BMI Calculator</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-vat/" className="text-blue-600 hover:underline">VAT Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/engineering/3d/" className="text-blue-600 hover:underline">3D Graphing Engine</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/bmr/" className="text-blue-600 hover:underline">BMR Calculator</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/lcm-gcf-calculator/" className="text-blue-600 hover:underline">LCM/GCF Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/calorie-calculator/" className="text-blue-600 hover:underline">Calorie Calculator</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/loan-emi/" className="text-blue-600 hover:underline">EMI Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/matrices/" className="text-blue-600 hover:underline">Matrix Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/ideal-weight/" className="text-blue-600 hover:underline">Ideal Weight</Link></td>
                </tr>
                <tr>
                  <td className="py-2 px-3"><Link href="/calculator/nepal-salary/" className="text-blue-600 hover:underline">Nepal Salary Calculator</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/quadratic-solver/" className="text-blue-600 hover:underline">Quadratic Solver</Link></td>
                  <td className="py-2 px-3"><Link href="/calculator/water-intake/" className="text-blue-600 hover:underline">Water Intake</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4"><strong>Nepal-Specific Tools:</strong> <Link href="/calculator/nepali-date/" className="text-blue-600 hover:underline">Nepali Date Converter</Link> | <Link href="/calculator/nepal-land/" className="text-blue-600 hover:underline">Land Area Calculator</Link> | <Link href="/calculator/kukl-bill/" className="text-blue-600 hover:underline">KUKL Water Bill</Link> | <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline">NEA Electricity Bill</Link> | <Link href="/calculator/momo-calorie-counter/" className="text-blue-600 hover:underline">Momo Calorie Counter</Link></p>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">The Team</h2>
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <Image 
                src="/Avash.png" 
                alt="Avash Chaudhary" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-black text-gray-900 mb-1">Avash Chaudhary</h3>
              <p className="text-blue-600 font-bold text-[10px] mb-2 uppercase tracking-wider">Founder, Full-Stack Developer & SEO Specialist</p>
              
              <div className="text-sm text-gray-600 mb-3 space-y-2">
                <p>
                  I'm Avash, and like many of you, I was tired of using calculators that used 'Dollars' or 'Acres' when I just wanted to know the tax on my salary in Kathmandu. I built NepaCal to speak our language—both in code and in culture.
                </p>
                <p>
                  I am a Software Engineer completing my Bachelor of Software Engineering (2021–2026) at Nepal College of Information Technology (NCIT), Pokhara University, Lalitpur. I personally cross-check every calculator algorithm against the Nepal Gazette and official IRD/NRB circulars before publishing. My work sits at the intersection of software development and technical SEO — I build tools that are both functionally accurate and findable by the people who need them.
                </p>
              </div>

              <div className="flex justify-center sm:justify-start gap-4 mt-2">
                <a href="https://www.linkedin.com/in/avash-chaudhary-6a8479364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
                <a href="https://github.com/avash81" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <Github className="w-3 h-3" /> GitHub
                </a>
                <a href="mailto:admin@nepacalc.com" className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <Mail className="w-3 h-3" /> Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">What's Coming Next</h2>
          <p>NepaCal is actively growing. Planned additions for 2026:</p>
          <ul>
            <li><strong>Province-specific property tax</strong> calculator for all 7 provinces</li>
            <li><strong>Live NRB exchange rate integration</strong> directly from NRB API</li>
            <li><strong>Nepali-language interface</strong> for calculators (Nepali numerals and labels)</li>
            <li><strong>Advanced NEPSE tools</strong> — dividend yield, portfolio return, WACC calculator</li>
            <li><strong>Trade & customs duty calculator</strong> for common imports</li>
          </ul>
        </section>
        
        <div className="text-center mt-8">
           <p className="text-xs text-gray-500 italic">Last updated: May 1, 2026 | NepaCal is based in Kathmandu, Nepal. All amounts in NPR unless stated. Fiscal year references use Bikram Sambat (BS) calendar.</p>
        </div>

      </div>
    </div>
  );
}
