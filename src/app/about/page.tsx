import { Metadata } from 'next';
import Link from 'next/link';

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
      <div className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            About NepaCalc
          </h1>
          <div className="text-sm md:text-base text-gray-500 font-medium max-w-2xl mx-auto flex flex-col items-center gap-1">
            <p><strong>Published:</strong> May 1, 2026</p>
            <p><strong>Last Reviewed:</strong> July 19, 2026</p>
            <p><strong>Next Scheduled Review:</strong> July 2027 or whenever official regulations change.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
          
          <h2>Welcome to NepaCalc</h2>
          <p>
            NepaCalc is a Nepal-focused digital platform that provides accurate calculators, converters, financial tools, engineering utilities, academic resources, and market information designed specifically for Nepal.
          </p>
          <p>
            Our mission is to simplify everyday calculations by providing reliable, easy-to-use tools based on Nepal's official standards, regulations, and measurement systems.
          </p>
          <p>
            Whether you are calculating income tax, estimating loan repayments, checking today's gold or silver prices, converting land measurements, or solving engineering and mathematics problems, NepaCalc is built to deliver accurate results quickly and efficiently.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6 not-prose">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Why Trust NepaCalc?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Independent Publisher</div>
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Nepal-focused</div>
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Regularly Updated</div>
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Privacy First</div>
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Mobile Friendly</div>
              <div className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Free to Use</div>
            </div>
          </div>

          <hr className="my-8" />

          <h2>Our Mission</h2>
          <p>
            Many online calculators are designed for international audiences and often do not support Nepal's taxation rules, traditional measurement systems, financial regulations, or local standards.
          </p>
          <p>NepaCalc was created to solve this problem.</p>
          <p>
            Our goal is to build Nepal's most trusted collection of calculators and digital tools by combining official data sources, transparent methodologies, and modern software engineering.
          </p>
          <p>
            Every calculator is designed to be fast, accurate, mobile-friendly, and simple to use.
          </p>

          <hr className="my-8" />

          <h2>Our Values</h2>
          <ul>
            <li><strong>Accuracy:</strong> We prioritize correct formulas over fast publishing.</li>
            <li><strong>Transparency:</strong> We clearly state our sources and update methodologies.</li>
            <li><strong>Simplicity:</strong> We make complex calculations easy for everyone to understand.</li>
            <li><strong>Independence:</strong> We are self-funded and operate without third-party influence.</li>
            <li><strong>Continuous Improvement:</strong> We constantly refine our tools based on user feedback and regulation updates.</li>
          </ul>

          <hr className="my-8" />

          <h2>Who We Serve</h2>
          <p>NepaCalc is built for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Students</li>
              <li>Engineers</li>
              <li>Accountants</li>
              <li>Business owners</li>
            </ul>
            <ul>
              <li>Government employees</li>
              <li>Investors</li>
              <li>Homeowners</li>
              <li>Everyday Nepali citizens</li>
            </ul>
          </div>

          <hr className="my-8" />

          <h2>What We Offer</h2>
          <p>NepaCalc currently provides tools across a wide range of categories, including:</p>
          <ul>
            <li>Nepal Finance & Tax Calculators</li>
            <li>Salary & Income Tax Calculators</li>
            <li>Gold & Silver Market Tools</li>
            <li>Exchange Rate Tools</li>
            <li>Loan & EMI Calculators</li>
            <li>Engineering Calculators</li>
            <li>Mathematics Tools</li>
            <li>Academic Calculators</li>
            <li>Health & Fitness Calculators</li>
            <li>Unit & Measurement Converters</li>
            <li>Utility Bill Calculators</li>
            <li>Nepal-specific Government Calculators</li>
          </ul>
          <p>We continuously expand our platform by adding new calculators and improving existing tools.</p>

          <hr className="my-8" />

          <h2>Accuracy & Reliability</h2>
          <p>Accuracy is the foundation of NepaCalc.</p>
          <p>
            Before publishing any calculator, formulas are carefully researched, tested, and verified using official regulations, publicly available government publications, or recognized technical standards.
          </p>
          <p>
            Whenever government rules or official tariffs change, we review and update the relevant calculators accordingly.
          </p>
          <p>Examples include:</p>
          <ul>
            <li>Income Tax</li>
            <li>VAT</li>
            <li>Vehicle Tax</li>
            <li>Nepal Rastra Bank Exchange Rates</li>
            <li>Nepal Electricity Authority Tariffs</li>
            <li>KUKL Water Tariffs</li>
            <li>Gold & Silver Market Rates</li>
            <li>Government Fee Revisions</li>
          </ul>
          <p>Our objective is to ensure users receive calculations that reflect the latest available information.</p>

          <hr className="my-8" />

          <h2>Official Data Sources</h2>
          <p>
            Depending on the calculator, NepaCalc references publicly available information from official organizations, including:
          </p>
          
          <div className="overflow-x-auto my-6 not-prose">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b border-t">
                <tr>
                  <th className="py-3 px-4 border-r">Category</th>
                  <th className="py-3 px-4">Primary Source</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Income Tax</td>
                  <td className="py-3 px-4">Inland Revenue Department (IRD)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">VAT</td>
                  <td className="py-3 px-4">Inland Revenue Department</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Banking & Exchange Rates</td>
                  <td className="py-3 px-4">Nepal Rastra Bank (NRB)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Vehicle Taxes</td>
                  <td className="py-3 px-4">Department of Transport Management (DoTM)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Electricity Bills</td>
                  <td className="py-3 px-4">Nepal Electricity Authority (NEA)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Water Bills</td>
                  <td className="py-3 px-4">Kathmandu Upatyaka Khanepani Limited (KUKL)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Gold & Silver Prices</td>
                  <td className="py-3 px-4">Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold border-r bg-gray-50/50">Land Measurement</td>
                  <td className="py-3 px-4">Government Land Measurement Standards</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Where appropriate, official references are cited within the relevant calculator pages.</p>

          <hr className="my-8" />

          <h2>Editorial Standards</h2>
          <p>Every calculator and educational resource published on NepaCalc follows the same principles:</p>
          <ul>
            <li>Information is researched before publication.</li>
            <li>Official documents are reviewed whenever available.</li>
            <li>Calculation formulas are verified before deployment.</li>
            <li>Content is written in clear and understandable language.</li>
            <li>Updates are published whenever official regulations or market data change.</li>
          </ul>
          <p>Our goal is to provide practical, trustworthy, and transparent digital tools for everyone.</p>
          <p><strong>Editorial Independence:</strong> NepaCalc operates independently. Advertising and commercial relationships do not influence our calculators, research, or editorial decisions.</p>

          <hr className="my-8" />

          <h2>About the Founder</h2>
          <p>
            NepaCalc was founded by <strong>Avash Chaudhary</strong>, a Software Engineer and SEO Specialist based in Nepal.
          </p>
          <p>
            He completed a <strong>Bachelor of Software Engineering</strong> from <strong>Nepal College of Information Technology (NCIT)</strong>, affiliated with <strong>Pokhara University</strong>.
          </p>
          <p>
            With experience in software development, search engine optimization, and building digital platforms, he created NepaCalc to provide accurate calculators and practical online tools designed specifically for Nepal.
          </p>
          <p><strong>Professional Profile</strong></p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/avash-chaudhary-6a8479364" target="_blank" rel="noopener noreferrer">Avash Chaudhary LinkedIn</a>
          </p>

          <hr className="my-8" />

          <h2>Transparency</h2>
          <p>NepaCalc is an independent digital publisher.</p>
          <p>
            Our calculators and content are developed independently and are not sponsored by government agencies, financial institutions, or regulatory organizations unless explicitly stated.
          </p>
          <p>
            To support ongoing development and maintenance, NepaCalc may display advertisements and participate in advertising programs. Advertising does not influence our editorial decisions, calculation methodologies, or published information.
          </p>

          <hr className="my-8" />

          <h2>Corrections</h2>
          <p>We work hard to ensure every calculator and article is accurate.</p>
          <p>
            If you discover an error, outdated information, or calculation issue, we encourage you to contact us.
          </p>
          <p>Every report is reviewed, and verified corrections are published as quickly as possible.</p>

          <hr className="my-8" />

          <h2>Looking Ahead</h2>
          <p>
            We continue to expand NepaCalc by developing new calculators, educational resources, financial tools, engineering utilities, and Nepal-specific digital services.
          </p>
          <p>Our long-term vision is to make NepaCalc Nepal's most trusted and comprehensive calculation platform.</p>

          <hr className="my-8" />

          <h2>Publisher Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li><strong>Publisher:</strong> NepaCalc</li>
              <li><strong>Website:</strong> <a href="https://nepacalc.com">https://nepacalc.com</a></li>
              <li><strong>Country:</strong> Nepal</li>
              <li><strong>Founded:</strong> 2026</li>
            </ul>
          </div>
          
          <h2 className="mt-8">Contact Information</h2>
          <p>If you have questions, suggestions, or would like to report an issue, please reach out to the appropriate department. All inquiries can be directed to the same address below:</p>
          <ul>
            <li>Editorial enquiries</li>
            <li>Corrections</li>
            <li>Business enquiries</li>
            <li>General support</li>
          </ul>
          <p><strong>Email:</strong> <a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>
          
          <hr className="my-10" />
          
          <h2 className="mt-8">Copyright & Licensing</h2>
          <p>Unless otherwise stated, all original content, calculators, graphics, and educational materials published on NepaCalc are protected by copyright. Unauthorized reproduction or commercial redistribution without written permission is prohibited.</p>
          
          <p className="mt-8">Thank you for using NepaCalc.</p>
        </div>
      </div>
    </div>
  );
}
