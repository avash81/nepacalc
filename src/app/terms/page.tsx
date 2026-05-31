import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | NepaCal",
  description: "NepaCal terms of service ,  conditions for using Nepal's free calculator platform.",
  alternates: {
    canonical: 'https://nepacalc.com/terms/',
  },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500 font-medium">
            <strong>Last updated:</strong> May 1, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-5 md:p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm prose prose-sm md:prose-base prose-blue max-w-none text-gray-600">
          
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-8 not-prose">
            <h2 className="text-red-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
               <span className="text-xl">⚠️</span> Important Disclaimer
            </h2>
            <p className="text-red-900 m-0 text-sm md:text-base leading-relaxed">
              NepaCal is a tool for estimation and general information. We are not responsible for tax penalties, financial losses, or any legal consequences arising from use of our calculators. Always consult official IRD/NRB documents or a certified professional before making final decisions.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Use of Calculators</h2>
          <p>NepaCal's calculators are provided for <strong>informational and educational purposes only</strong>. While we update our tools with each fiscal year's government announcements, results should not be treated as professional financial, tax, legal, or medical advice.</p>
          <p>For important decisions involving:</p>
          <ul>
             <li><strong>Tax filing:</strong> Consult a registered tax practitioner or the Inland Revenue Department (ird.gov.np)</li>
             <li><strong>Loans & investments:</strong> Consult a SEBON-registered financial advisor or your bank</li>
             <li><strong>Vehicle matters:</strong> Consult the Department of Transport Management (dotm.gov.np)</li>
             <li><strong>Medical decisions:</strong> Consult a qualified healthcare professional</li>
             <li><strong>Legal/property matters:</strong> Consult a licensed lawyer or relevant government authority</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Accuracy and Liability</h2>
          <p>We update Nepal-specific calculators with each fiscal year's government announcements. However:</p>
          <ul>
             <li>Tax rates, government fees, and financial regulations in Nepal change periodically</li>
             <li>We cannot guarantee that all information on NepaCal is current at any given moment</li>
             <li>Always verify critical figures against the relevant official source before any financial or legal decision</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Limitation of Liability</h2>
          <p>In no event shall NepaCal or its founder be liable for any damages ,  including, without limitation, damages for loss of data, loss of profit, or business interruption ,  arising out of the use or inability to use NepaCal's tools or content, even if we have been notified of the possibility of such damage.</p>
          <p>NepaCal provides tools "as is" without warranty of any kind, express or implied, including but not limited to fitness for a particular purpose or non-infringement.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Intellectual Property & Prohibited Uses</h2>
          <p>All content on NepaCalc ,  including calculator logic, JavaScript formulas, written explanations, blog posts, and design ,  is the intellectual property of NepaCalc.</p>
          <p><strong>You may:</strong></p>
          <ul>
             <li>Use the calculators freely for personal or professional purposes</li>
             <li>Share links to NepaCal pages</li>
             <li>Quote brief passages with proper attribution and a link to the source page</li>
          </ul>
          <p><strong>You may NOT:</strong></p>
          <ul>
             <li><strong>Web scraping:</strong> Use automated bots, spiders, crawlers, or scripts to extract calculator logic, data tables, or written content from NepaCal in bulk. This is explicitly prohibited.</li>
             <li><strong>Frame injection:</strong> Embed or display NepaCal calculators inside an iframe on another website without explicit written permission from us.</li>
             <li><strong>Code reproduction:</strong> Copy, reverse-engineer, or reproduce NepaCal's calculation logic, formulas, or JavaScript code to represent it as your own work.</li>
             <li><strong>Content mirroring:</strong> Mirror or republish NepaCal's rate tables or written guides on another website without attribution and written permission.</li>
          </ul>
          <p>Violations may result in legal action.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Third-Party Advertising</h2>
          <p>NepaCal displays advertisements served by Google AdSense and potentially other advertising partners. We are not responsible for the content, accuracy, or practices of advertisers whose ads appear on our site. Clicking on advertisements takes you away from NepaCal.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">External Links</h2>
          <p>NepaCal links to official government websites (ird.gov.np, nrb.org.np, dotm.gov.np, nea.org.np, etc.) and other resources. We do not control and are not responsible for the content, availability, accuracy, or privacy practices of external websites.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Changes to These Terms</h2>
          <p>We may update these terms periodically. Continued use of NepaCal after any update constitutes acceptance of the revised terms. We do not notify users of updates by email.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Contact</h2>
          <p>For questions about these terms or licensing inquiries: <strong>admin@nepacalc.com</strong></p>

        </div>
      </div>
    </div>
  );
}

