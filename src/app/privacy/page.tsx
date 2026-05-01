import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NepaCal',
  description: 'NepaCal privacy policy — how we use cookies, analytics, and advertising data. We never sell your personal information.',
  alternates: {
    canonical: 'https://nepacalc.com/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-500 font-medium">
            <strong>Effective date:</strong> April 1, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Table of Contents Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Contents</h3>
            <ul className="space-y-2.5 text-sm font-medium text-gray-500">
              <li><a href="#data-collection" className="hover:text-blue-600 transition-colors">1. Data Collection</a></li>
              <li><a href="#cookies-ads" className="hover:text-blue-600 transition-colors">2. Cookies & AdSense</a></li>
              <li><a href="#analytics" className="hover:text-blue-600 transition-colors">3. Google Analytics</a></li>
              <li><a href="#international-rights" className="hover:text-blue-600 transition-colors">4. International Rights</a></li>
              <li><a href="#children" className="hover:text-blue-600 transition-colors">5. Children's Privacy</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm prose prose-sm md:prose-base prose-blue max-w-none text-gray-600">

          <h2 id="data-collection" className="text-lg font-bold text-gray-900 mt-0 mb-3 border-b pb-2 scroll-mt-24">1. Data Collection</h2>
          <p>We do not require accounts. We collect your name and email only if you contact us directly. We automatically collect technical data like your browser type and approximate location to improve site performance.</p>

          <h2 id="cookies-ads" className="text-lg font-bold text-gray-900 mt-8 mb-3 border-b pb-2 scroll-mt-24">2. Cookies & Advertising (AdSense Disclosure)</h2>
          <p>We use Google AdSense to serve ads. Google uses DART cookies to serve ads based on your visit to this site and other sites on the Internet.</p>
          <p><strong>Google AdSense:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this or other websites.</p>
          <p><strong>Opt-out:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.</p>

          <h2 id="analytics" className="text-lg font-bold text-gray-900 mt-8 mb-3 border-b pb-2 scroll-mt-24">3. Google Analytics</h2>
          <p>We use Google Analytics to understand how visitors interact with our calculators. This helps us identify which tools are most popular and where we can improve. Google Analytics uses cookies to collect anonymized data such as browser type and session duration. No personally identifiable information is shared with Google Analytics.</p>

          <h2 id="international-rights" className="text-lg font-bold text-gray-900 mt-8 mb-3 border-b pb-2 scroll-mt-24">4. International User Rights</h2>
          <p>Though built for Nepal, we adhere to GDPR and CCPA standards. You have the right to request data deletion or access at any time via <a href="mailto:admin@nepacalc.com" className="text-blue-600 hover:underline font-bold">admin@nepacalc.com</a>.</p>

          <h2 id="children" className="text-lg font-bold text-gray-900 mt-8 mb-3 border-b pb-2 scroll-mt-24">5. Children's Privacy</h2>
          <p>NepaCal does not knowingly collect any personal information from children under the age of 13. Our tools are designed for general audiences and professionals.</p>

        </div>
      </div>
    </div>
  );
}
