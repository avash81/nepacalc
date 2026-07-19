import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy | NepaCalc',
  description: 'Learn how NepaCalc researches, creates, reviews, maintains, and updates our calculators, educational resources, and market data.',
  alternates: {
    canonical: 'https://nepacalc.com/about/editorial-policy/',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Editorial Policy</h1>
          <div className="text-sm md:text-base text-gray-500 font-medium flex flex-col items-center gap-1">
            <p><strong>Published:</strong> May 1, 2026</p>
            <p><strong>Last Reviewed:</strong> July 19, 2026</p>
            <p><strong>Next Scheduled Review:</strong> July 2027 or whenever official regulations change.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
          
          <p className="lead text-gray-700 font-medium text-lg mt-0">
            At <strong>NepaCalc</strong>, our goal is to provide accurate, transparent, and reliable calculators, educational resources, and market information designed specifically for Nepal.
          </p>
          <p>
            This Editorial Policy explains how our content is researched, created, reviewed, maintained, and updated.
          </p>

          <hr className="my-10" />

          <h2>Our Editorial Principles</h2>
          <p>Every calculator, article, market page, and educational resource published on NepaCalc is developed according to the following principles:</p>
          <ul>
            <li>Accuracy</li>
            <li>Transparency</li>
            <li>Independence</li>
            <li>User-first design</li>
            <li>Continuous improvement</li>
          </ul>
          <p>Our priority is helping users make informed decisions by providing reliable calculations and understandable information.</p>

          <hr className="my-10" />

          <h2>Accuracy Standards</h2>
          <p>Accuracy is the highest priority at NepaCalc.</p>
          <p>Before publishing any calculator or educational resource, we verify:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Mathematical formulas</li>
              <li>Tax calculations</li>
              <li>Government rates</li>
              <li>Utility tariffs</li>
            </ul>
            <ul>
              <li>Financial calculations</li>
              <li>Unit conversions</li>
              <li>Engineering formulas</li>
              <li>Market data methodologies</li>
            </ul>
          </div>
          <p>Whenever possible, calculations are verified using official government publications, regulatory notices, or recognized technical standards.</p>
          <p>Examples include:</p>
          <ul>
            <li>Inland Revenue Department (IRD)</li>
            <li>Nepal Rastra Bank (NRB)</li>
            <li>Department of Transport Management (DoTM)</li>
            <li>Nepal Electricity Authority (NEA)</li>
            <li>Kathmandu Upatyaka Khanepani Limited (KUKL)</li>
            <li>Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</li>
          </ul>
          <p>Where applicable, official sources are referenced within the relevant pages.</p>

          <hr className="my-10" />

          <h2>Our Review Process</h2>
          <p>Every calculator and tool published on NepaCalc goes through a rigorous review process:</p>
          <ul>
            <li><strong>Research:</strong> We identify and collect the most recent official regulations, mathematical standards, and public datasets.</li>
            <li><strong>Formula verification:</strong> We cross-check formulas against official guidelines (e.g., IRD tax brackets, NEA tariffs).</li>
            <li><strong>Development:</strong> Calculators are engineered using modern software practices for high precision.</li>
            <li><strong>Testing:</strong> We run edge cases and compare outputs with authoritative examples to ensure accuracy.</li>
            <li><strong>Editorial review:</strong> A human editor reviews the content, structure, and factual accuracy of the page.</li>
            <li><strong>Publication:</strong> The tool is made publicly available for our users.</li>
            <li><strong>Annual review:</strong> We systematically review all tools every year to ensure they remain accurate.</li>
            <li><strong>Continuous monitoring:</strong> We monitor official channels for ad-hoc changes (like sudden tariff adjustments) and update immediately.</li>
          </ul>

          <hr className="my-10" />

          <h2>Editorial Independence</h2>
          <p>NepaCalc operates as an independent publisher.</p>
          <p>Editorial decisions are made independently and are not influenced by advertisers, sponsors, or third parties.</p>
          <p>Advertising displayed on NepaCalc does not affect:</p>
          <ul>
            <li>Calculator formulas</li>
            <li>Rankings of calculators</li>
            <li>Market information</li>
            <li>Editorial opinions</li>
            <li>Educational content</li>
          </ul>
          <p>Sponsored content, if ever introduced, will always be clearly identified.</p>

          <hr className="my-10" />

          <h2>Use of Artificial Intelligence</h2>
          <p>Artificial intelligence may be used to assist with research, drafting, or editing.</p>
          <p>However, <strong>all calculator formulas, technical content, and factual information are reviewed by a human editor before publication.</strong></p>
          <p>Human review remains an essential part of our editorial process to ensure trust and reliability.</p>

          <hr className="my-10" />

          <h2>Corrections and Updates</h2>
          <p>Despite our review process, errors may occasionally occur.</p>
          <p>If a user identifies an error, outdated regulation, incorrect tariff, or calculation issue, we encourage them to contact us.</p>
          <p>Every reported issue is reviewed. When an error is confirmed:</p>
          <ul>
            <li>The content is corrected promptly.</li>
            <li>The relevant calculator or article is updated.</li>
            <li>Where appropriate, the "Last Updated" date is revised.</li>
          </ul>
          <p>Our objective is to maintain accurate and trustworthy information at all times.</p>

          <hr className="my-10" />

          <h2>Editorial Contact</h2>
          <p>User feedback helps improve NepaCalc. If you have questions, suggestions, or would like to report an issue, please reach out to the appropriate department. All inquiries can be directed to the same address below:</p>
          <ul>
            <li>Editorial enquiries</li>
            <li>Corrections</li>
            <li>Business enquiries</li>
            <li>General support</li>
          </ul>
          <p><strong>Email:</strong> <a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>

          <hr className="my-10" />

          <h2>Editorial Responsibility</h2>
          <p>The editorial content published on NepaCalc is developed and maintained by the NepaCalc editorial team under the direction of the site's founder.</p>
          <p>Our responsibility is to provide educational and informational resources that are as accurate and reliable as reasonably possible based on the latest publicly available information.</p>

          <hr className="my-10" />

          <h2>Commitment to Transparency</h2>
          <p>We are committed to:</p>
          <ul>
            <li>Citing official sources where appropriate.</li>
            <li>Updating information when regulations change.</li>
            <li>Clearly separating editorial content from advertising.</li>
            <li>Continuously improving the quality of our calculators and educational resources.</li>
          </ul>
          <p>Trust is earned through accuracy, transparency, and consistency, and these principles guide every page published on NepaCalc.</p>

        </div>
      </div>
    </div>
  );
}
