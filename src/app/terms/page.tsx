import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | NepaCalc",
  description: "Terms and conditions for using NepaCalc's calculators, market data, and educational resources.",
  alternates: {
    canonical: 'https://nepacalc.com/terms/',
  },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            <strong>Effective Date:</strong> July 19, 2026 | <strong>Last Updated:</strong> July 19, 2026
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
          
          <p className="lead text-gray-700 font-medium text-lg mt-0">
            Welcome to <strong>NepaCalc</strong> ("we," "our," or "us").
          </p>
          <p>
            These Terms & Conditions govern your use of <strong>https://nepacalc.com</strong> and all calculators, tools, market information, educational resources, articles, and services provided through the website.
          </p>
          <p>
            By accessing or using NepaCalc, you agree to these Terms & Conditions. If you do not agree with these terms, please discontinue using the website.
          </p>

          <hr className="my-10" />

          <h2>1. Acceptance of Terms</h2>
          <p>By using NepaCalc, you confirm that you have read, understood, and accepted these Terms & Conditions.</p>
          <p>These terms apply to all visitors, users, and anyone accessing our website.</p>

          <hr className="my-10" />

          <h2>2. About NepaCalc</h2>
          <p>NepaCalc provides:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Financial calculators</li>
              <li>Tax calculators</li>
              <li>Engineering calculators</li>
              <li>Academic tools</li>
              <li>Health calculators</li>
            </ul>
            <ul>
              <li>Unit converters</li>
              <li>Precious metal market information</li>
              <li>Exchange rate information</li>
              <li>Utility bill calculators</li>
              <li>Educational resources</li>
            </ul>
          </div>
          <p>Our services are provided for informational and educational purposes.</p>

          <hr className="my-10" />

          <h2>3. Permitted Use</h2>
          <p>You may use NepaCalc only for lawful purposes.</p>
          <p>You agree not to:</p>
          <ul>
            <li>Attempt to interfere with website operations.</li>
            <li>Introduce malicious software.</li>
            <li>Copy large portions of content without permission.</li>
            <li>Attempt unauthorized access to our systems.</li>
            <li>Use automated tools to scrape website content excessively.</li>
            <li>Violate applicable laws while using the website.</li>
          </ul>

          <hr className="my-10" />

          <h2>4. Intellectual Property</h2>
          <p>Unless otherwise stated, all content available on NepaCalc, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Text</li>
              <li>Calculators</li>
              <li>Source code</li>
              <li>Graphics</li>
              <li>Icons</li>
            </ul>
            <ul>
              <li>Logos</li>
              <li>Layout</li>
              <li>Design</li>
              <li>Databases</li>
              <li>Educational resources</li>
            </ul>
          </div>
          <p>is the intellectual property of NepaCalc and is protected by applicable copyright and intellectual property laws.</p>
          <p><strong>You may:</strong></p>
          <ul>
            <li>Use the calculators for personal or business purposes.</li>
            <li>Share links to NepaCalc pages.</li>
          </ul>
          <p><strong>You may not:</strong></p>
          <ul>
            <li>Republish our content without permission.</li>
            <li>Reproduce calculators for commercial distribution.</li>
            <li>Remove copyright notices.</li>
            <li>Copy significant portions of our content onto another website.</li>
          </ul>

          <hr className="my-10" />

          <h2>5. Accuracy of Information</h2>
          <p>We make every reasonable effort to ensure that the information published on NepaCalc is accurate and up to date.</p>
          <p>However:</p>
          <ul>
            <li>Regulations change.</li>
            <li>Government policies change.</li>
            <li>Market prices fluctuate.</li>
            <li>Financial rates change.</li>
            <li>Utility tariffs change.</li>
          </ul>
          <p>Although we regularly review and update our content, we cannot guarantee that every page always reflects the latest official information at every moment.</p>
          <p>Users should independently verify important financial, legal, engineering, tax, or medical information before making decisions.</p>

          <hr className="my-10" />

          <h2>6. Calculator Results</h2>
          <p>Calculator results are generated automatically based on the information entered by users.</p>
          <p>The accuracy of any calculation depends on:</p>
          <ul>
            <li>The correctness of user inputs.</li>
            <li>Applicable assumptions.</li>
            <li>Current regulations.</li>
            <li>Available official data.</li>
          </ul>
          <p>Users remain responsible for verifying results before making financial, legal, engineering, medical, or investment decisions.</p>

          <hr className="my-10" />

          <h2>7. Third-Party Links</h2>
          <p>Some pages may contain links to third-party websites for additional information or reference.</p>
          <p>These links are provided solely for user convenience.</p>
          <p>NepaCalc does not control or endorse the content, policies, or practices of third-party websites.</p>
          <p>We are not responsible for any information, products, or services provided by external websites.</p>

          <hr className="my-10" />

          <h2>8. Advertising</h2>
          <p>NepaCalc may display advertisements through Google AdSense and other advertising partners.</p>
          <p>Advertisements help support the continued development and maintenance of the website.</p>
          <p>Advertising does not influence:</p>
          <ul>
            <li>Editorial decisions</li>
            <li>Calculator methodologies</li>
            <li>Rankings</li>
            <li>Educational content</li>
            <li>Published information</li>
          </ul>
          <p>Sponsored content, if introduced, will always be clearly identified.</p>

          <hr className="my-10" />

          <h2>9. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, NepaCalc shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from:</p>
          <ul>
            <li>Use of the website</li>
            <li>Reliance on calculator results</li>
            <li>Errors or omissions</li>
            <li>Website interruptions</li>
            <li>Data inaccuracies</li>
            <li>Third-party services</li>
            <li>Technical issues</li>
          </ul>
          <p>Users accept full responsibility for decisions made using information obtained from NepaCalc.</p>

          <hr className="my-10" />

          <h2>10. Availability of Service</h2>
          <p>We strive to keep NepaCalc available at all times.</p>
          <p>However, we do not guarantee uninterrupted access.</p>
          <p>The website may occasionally become unavailable due to:</p>
          <ul>
            <li>Maintenance</li>
            <li>Software updates</li>
            <li>Technical failures</li>
            <li>Security improvements</li>
            <li>Hosting issues</li>
            <li>Events beyond our reasonable control</li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue any part of the website without prior notice.</p>

          <hr className="my-10" />

          <h2>11. Privacy</h2>
          <p>Your use of NepaCalc is also governed by our Privacy Policy.</p>
          <p>Please review our Privacy Policy to understand how we collect, process, and protect information.</p>

          <hr className="my-10" />

          <h2>12. Changes to These Terms</h2>
          <p>We may update these Terms & Conditions from time to time.</p>
          <p>Any changes become effective immediately after publication on this page.</p>
          <p>Continued use of NepaCalc after updates constitutes acceptance of the revised Terms & Conditions.</p>
          <p>The latest revision date will always appear at the top of this page.</p>

          <hr className="my-10" />

          <h2>13. Governing Law</h2>
          <p>These Terms & Conditions shall be governed by and interpreted in accordance with the laws of Nepal.</p>
          <p>Any disputes arising from the use of NepaCalc shall be subject to the jurisdiction of the competent courts of Nepal.</p>

          <hr className="my-10" />

          <h2>14. Contact Us</h2>
          <p>If you have any questions regarding these Terms & Conditions, please contact us:</p>
          <p><strong>Email</strong></p>
          <p><a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>

        </div>
      </div>
    </div>
  );
}
