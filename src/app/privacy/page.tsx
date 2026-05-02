import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NepaCal',
  description: 'NepaCal privacy policy ,  cookies, Google AdSense, Analytics, and your rights. Plain language. Updated May 2026.',
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
            <strong>Last updated:</strong> May 1, 2026 | <strong>Effective date:</strong> April 1, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Table of Contents Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Contents</h3>
            <ul className="space-y-2.5 text-sm font-medium text-gray-500">
              <li><a href="#data-collection" className="hover:text-blue-600 transition-colors">1. What Information We Collect</a></li>
              <li><a href="#cookies" className="hover:text-blue-600 transition-colors">2. Cookies & How We Use Them</a></li>
              <li><a href="#adsense" className="hover:text-blue-600 transition-colors">3. Google AdSense (Advertising)</a></li>
              <li><a href="#analytics" className="hover:text-blue-600 transition-colors">4. Google Analytics</a></li>
              <li><a href="#how-we-use" className="hover:text-blue-600 transition-colors">5. How We Use Your Information</a></li>
              <li><a href="#international" className="hover:text-blue-600 transition-colors">6. International Privacy Standards</a></li>
              <li><a href="#children" className="hover:text-blue-600 transition-colors">7. Children's Privacy</a></li>
              <li><a href="#your-rights" className="hover:text-blue-600 transition-colors">8. Your Rights</a></li>
              <li><a href="#changes" className="hover:text-blue-600 transition-colors">9. Changes to This Policy</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">10. Contact Us</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 bg-white p-5 md:p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm prose prose-sm md:prose-base prose-blue max-w-none text-gray-600">
          <p className="lead text-gray-700">
            NepaCalc (nepacalc.com) is dedicated to providing high-precision utility laboratory tools for Nepal. This privacy policy explains what information we collect, how we use it, and what rights you have. We have written it in plain language ,  no legal jargon where plain English works just as well.
          </p>

          <h2 id="data-collection" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">1. What Information We Collect</h2>
          <p><strong>Information you give us:</strong> NepaCal does not require you to create an account or provide any personal information to use any of our calculators. If you contact us via the contact form or email, we collect your name and email address solely to respond to your message. We do not add you to any mailing list.</p>
          <p><strong>Information collected automatically:</strong> When you visit NepaCal, our servers and third-party services may automatically collect: Your browser type and version, Your device type (desktop, mobile, tablet), Your approximate location (country/city level only, based on IP address ,  not precise location), Which pages and calculators you visit and how long you spend on them, The website that referred you to NepaCal. We use this information only to understand how people use NepaCal and to improve the tools. We do not use it to identify you personally.</p>
          <p><strong>What we do NOT collect:</strong> NepaCal calculators run client-side in your browser. Your salary figures, health measurements, tax numbers, or any calculation inputs are not stored, sent to our servers, or logged anywhere. Your calculator data stays on your device.</p>

          <h2 id="cookies" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">2. Cookies & How We Use Them</h2>
          <p>NepaCal uses cookies ,  small text files stored on your device ,  for the following purposes:</p>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 font-bold text-gray-700 border-b">
                <tr><th className="py-2 px-3">Cookie Type</th><th className="py-2 px-3">Purpose</th><th className="py-2 px-3">Who Sets It</th><th className="py-2 px-3">How to Opt Out</th></tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <tr><td className="py-2 px-3 font-semibold">Essential</td><td className="py-2 px-3">Site functionality (calculator preferences, session state)</td><td className="py-2 px-3">NepaCal</td><td className="py-2 px-3">Cannot be disabled</td></tr>
                <tr><td className="py-2 px-3 font-semibold">Analytics</td><td className="py-2 px-3">Understanding traffic and popular tools</td><td className="py-2 px-3">Google Analytics</td><td className="py-2 px-3"><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">GA Opt-out</a></td></tr>
                <tr><td className="py-2 px-3 font-semibold">Advertising</td><td className="py-2 px-3">Showing relevant ads</td><td className="py-2 px-3">Google AdSense</td><td className="py-2 px-3"><a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></td></tr>
              </tbody>
            </table>
          </div>
          <p>You can also disable cookies through your browser settings. Note this may affect how some features of NepaCal work.</p>

          <h2 id="adsense" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">3. Google AdSense (Advertising)</h2>
          <p>NepaCal uses Google AdSense to display advertisements. This is how we keep all our tools free.</p>
          <p><strong>Mandatory AdSense disclosure:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to NepaCal or other websites on the internet. Google's advertising cookies enable Google and its partners to serve ads to you based on your visit to NepaCal and other sites. If you would prefer not to have your browsing history used for personalized ads, you can opt out at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>
          <p>We do not pass your personal information to Google AdSense. Google uses its own data from its advertising network. We also do not control the content of the advertisements shown.</p>

          <h2 id="analytics" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">4. Google Analytics</h2>
          <p>We use Google Analytics to understand how visitors use NepaCal ,  which calculators are most popular, session durations, device types, and traffic sources. This helps us decide what to improve and which new tools to build. Google Analytics uses cookies to collect this data in anonymized form. No personally identifiable information is sent to Google Analytics through our implementation. Google processes analytics data in accordance with their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>

          <h2 id="how-we-use" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">5. How We Use Your Information</h2>
          <p>We use information we collect to: Operate and improve NepaCal's calculators and tools, Understand which features are most useful to our users, Display relevant advertisements through Google AdSense, Respond to messages sent through our contact form or email.</p>
          <p><strong>We do NOT:</strong> Sell your personal information to any third party ,  ever. Share your data with advertisers. Use your calculator inputs for any purpose. Store sensitive personal information. Send unsolicited emails.</p>

          <h2 id="international" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">6. International Privacy Standards</h2>
          <p><strong>For visitors from the EEA (GDPR):</strong> Although we are not legally required to comply with the EU GDPR as a Nepal-based operator, we follow its principles as a matter of good practice. We collect minimal data, do not process personal data for purposes beyond those stated here, and respect your right to access or request deletion of any personal data we hold about you. Because NepaCal calculators run entirely client-side and we do not collect personal identifiers, most GDPR data subject rights do not apply to typical NepaCal usage ,  there is simply no personal data to access or delete.</p>
          <p><strong>For visitors from California (CCPA):</strong> NepaCal does not sell personal information to any third party. If you have contacted us by email, that is the only personal data we hold about you, and you may request deletion at any time.</p>
          <p><strong>Do Not Track (DNT):</strong> NepaCal does not currently have a mechanism to respond to DNT signals, but we collect the minimum data necessary by design, and none of our calculators store user data.</p>

          <h2 id="children" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">7. Children's Privacy</h2>
          <p>NepaCal does not knowingly collect any personal information from children under the age of 13. Our tools are designed for general audiences ,  students, professionals, and the public in Nepal. If you believe a child under 13 has provided personal information through our contact form, please contact us immediately at admin@nepacalc.com and we will delete it promptly.</p>

          <h2 id="your-rights" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">8. Your Rights</h2>
          <p>Depending on where you are located, you may have rights regarding your personal data. These include the right to know what data we hold about you, the right to request deletion of your data, and the right to opt out of personalized advertising.</p>
          <p>To exercise any of these rights: <strong>admin@nepacalc.com</strong></p>

          <h2 id="changes" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">9. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We will not notify you of changes by email (since we do not maintain a mailing list). Continued use of NepaCal after any changes means you accept the updated policy.</p>

          <h2 id="contact" className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 scroll-mt-24">10. Contact Us</h2>
          <p>For questions about this privacy policy or how NepaCal handles your data:</p>
          <ul>
            <li><strong>Email:</strong> admin@nepacalc.com</li>
            <li><strong>Contact form:</strong> <Link href="/contact/">nepacalc.com/contact/</Link></li>
            <li><strong>Location:</strong> Kathmandu, Nepal</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
