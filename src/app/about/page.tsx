import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About NepaCal — Nepal\\'s Free Calculator Platform',
  description: 'NepaCal is a free calculator platform built by Avash Chaudhary in Kathmandu for Nepal. 100+ tools for tax, finance, health, engineering, and more.',
  alternates: {
    canonical: 'https://NepaCalc.com/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-black text-gray-900 mb-8 text-center tracking-tight">About NepaCal</h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Why NepaCal Exists</h2>
        <p>I built NepaCal because I was frustrated.</p>
        <p>Every time I needed to calculate something Nepal-specific — my income tax, vehicle tax, KUKL water bill, or blue book renewal cost — I either had to dig through government PDFs or use generic calculators that had no idea what a &quot;Ropani&quot; or an &quot;SSF contribution&quot; was. The few Nepal-specific tools I found were outdated, clunky, or simply wrong.</p>
        <p>So I built the tools I wished existed.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">What NepaCal Is</h2>
        <p>NepaCal is a free online calculator platform built specifically for Nepal. Every tool on the site is designed with Nepali users in mind — using Nepali units, Nepali fiscal year references (Bikram Sambat / BS dates), IRD and NRB guidelines, and NPR amounts.</p>
        <p><strong>What we cover:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Nepal Tax &amp; Finance:</strong> Income tax (IRD slabs), VAT (13%), TDS, vehicle tax, salary calculator, NEPSE tools, home loans, FD, SIP, gratuity, provident fund, property tax</li>
          <li><strong>Nepal-Specific Tools:</strong> KUKL water bill, NEA electricity bill, Nepali date converter, land area in Ropani/Bigha/Kattha, momo calorie counter</li>
          <li><strong>Engineering &amp; Math:</strong> Scientific calculator, 3D graphing, matrices, geometry, physics, chemistry</li>
          <li><strong>Health &amp; Fitness:</strong> BMI, BMR, TDEE, calorie calculator, body fat, ideal weight</li>
          <li><strong>Converters:</strong> Unit converter, currency, length, weight</li>
          <li><strong>Market Rates:</strong> Live gold price Nepal, silver price, exchange rates, remittance rates</li>
        </ul>
        <p>All tools are free. No account required. No subscription. No ads cluttering the calculators themselves.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">About the Builder</h2>
        <p>I am <strong>Avash Chaudhary</strong>, a full-stack developer and SEO specialist based in Kathmandu, Nepal.</p>
        <p>I studied computer science at NCIT (Nepal College of Information Technology) and have been building web projects and tools since 2022. My work sits at the intersection of software development and technical SEO — I build things that are both functional and findable.</p>
        <p>NepaCal started as a personal project in early 2026 and grew into what it is today: Nepal&apos;s most comprehensive free calculator platform, covering everything from income tax slabs to 3D graphing engines.</p>
        <p>If you want to see more of my work: <a href="https://github.com/avash81" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a> | <a href="https://linkedin.com/in/avash-chaudhary-6a8479364" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Our Commitment to Accuracy</h2>
        <p>Every Nepal-specific calculator on NepaCal is:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Based on official sources</strong> — IRD slab rates from the Finance Act, vehicle tax from DoTM directives, KUKL and NEA rates from published tariff tables</li>
          <li><strong>Updated with each fiscal year</strong> — when the government announces a new budget (typically in May/June), we update the relevant calculators before Shrawan 1 (the start of Nepal&apos;s fiscal year)</li>
          <li><strong>Cross-verified</strong> — before publishing any rate table, we check it against the official government source and cite it on the page</li>
        </ul>
        <p>We add a verification date and source link to every Nepal-specific rate table on the site.</p>
        <p className="italic text-sm text-gray-500 bg-gray-50 p-4 border-l-4 border-gray-300"><strong>Note:</strong> NepaCal is a reference tool, not professional tax or financial advice. For complex tax situations, consult a registered tax practitioner or chartered accountant. For financial decisions, consult a SEBON-registered investment advisor.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Suggest a Calculator</h2>
        <p>Have a tool you wish existed on NepaCal? We regularly add new calculators based on user requests. Nepal has hundreds of niche calculations — land area conversions, trade and customs duties, government fee structures — and we want to build them all.</p>
        <p>Send your suggestion to: <a href="mailto:admin@nepacalc.com" className="text-blue-600 hover:underline">admin@nepacalc.com</a></p>
        <p>Or use the <Link href="/contact" className="text-blue-600 hover:underline">Contact Us form</Link>.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Media and Attribution</h2>
        <p>If you use NepaCal&apos;s data tables or calculations in an article, research, or publication, we ask that you link back to the specific tool page rather than copying the content. This helps keep information accurate and up-to-date for everyone.</p>
        <p>Press enquiries: <a href="mailto:admin@nepacalc.com" className="text-blue-600 hover:underline">admin@nepacalc.com</a></p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Technical Notes for Developers</h2>
        <p>NepaCal is built with React (frontend) and Node.js (backend). All calculations run client-side where possible for speed and privacy. The site is designed to load in under 2 seconds on mobile connections, which is where most Nepali users access the internet.</p>
        <p>If you notice a calculation error on any page, please report it immediately via email or the contact form. Accuracy is non-negotiable.</p>

        <hr className="my-8 border-gray-200" />
        <p className="text-sm italic text-center text-gray-500 pb-8">
          NepaCal is based in Kathmandu, Nepal. All amounts are in Nepali Rupees (NPR) unless otherwise stated. Fiscal year references use the Bikram Sambat (BS) calendar which is Nepal&apos;s official calendar.
        </p>
      </div>
    </div>
  );
}
