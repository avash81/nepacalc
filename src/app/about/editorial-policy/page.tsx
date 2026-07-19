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
          <p className="text-sm md:text-base text-gray-500 font-medium">
            <strong>Effective Date:</strong> July 19, 2026 | <strong>Last Updated:</strong> July 19, 2026
          </p>
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

          <h2>Content Creation Process</h2>
          <p>Every page published on NepaCalc follows a structured editorial workflow.</p>
          
          <h3>Step 1 — Research</h3>
          <p>We review:</p>
          <ul>
            <li>Official government publications</li>
            <li>Regulatory notices</li>
            <li>Public datasets</li>
            <li>Technical documentation</li>
            <li>Recognized industry standards</li>
            <li>Current legislation</li>
            <li>Market information from official organizations</li>
          </ul>

          <h3>Step 2 — Development</h3>
          <p>Calculators are implemented using tested mathematical formulas and software engineering best practices. Each calculator is designed to produce consistent and reproducible results.</p>

          <h3>Step 3 — Verification</h3>
          <p>Before publication, calculations are tested using multiple scenarios to verify:</p>
          <ul>
            <li>Formula accuracy</li>
            <li>Edge cases</li>
            <li>Input validation</li>
            <li>Unit conversions</li>
            <li>Expected outputs</li>
          </ul>
          <p>Where possible, results are compared with official examples or authoritative references.</p>

          <h3>Step 4 — Publication</h3>
          <p>Content is published only after technical and editorial review. We strive to ensure that information is complete, understandable, and technically accurate before it becomes publicly available.</p>

          <h3>Step 5 — Ongoing Maintenance</h3>
          <p>Regulations, tariffs, tax rules, and market information change over time. When official information changes, we review affected calculators and update them as soon as reasonably possible.</p>

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
          <p>Artificial intelligence (AI) tools may assist our editorial workflow by supporting:</p>
          <ul>
            <li>Research organization</li>
            <li>Content drafting</li>
            <li>Language improvements</li>
            <li>Content structure</li>
            <li>Technical documentation</li>
          </ul>
          <p>However:</p>
          <ul>
            <li><strong>AI-generated material is reviewed by a human editor before publication.</strong></li>
            <li>Calculations, formulas, and official information are manually verified.</li>
            <li>AI is never relied upon as the sole source of factual or regulatory information.</li>
          </ul>
          <p>Human review remains an essential part of our editorial process.</p>

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

          <h2>User Feedback</h2>
          <p>User feedback helps improve NepaCalc. We welcome suggestions regarding:</p>
          <ul>
            <li>New calculators</li>
            <li>Formula improvements</li>
            <li>Data corrections</li>
            <li>Technical issues</li>
            <li>User experience improvements</li>
          </ul>
          <p>Feedback can be submitted at: <a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>

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
