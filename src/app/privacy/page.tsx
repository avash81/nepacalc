import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NepaCal',
  description: 'NepaCal privacy policy — how we use cookies, analytics, and advertising data. We never sell your personal information.',
  alternates: {
    canonical: 'https://NepaCalc.com/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 font-medium mb-8">
        <strong>Last updated:</strong> May 1, 2026 | <strong>Effective date:</strong> April 1, 2026
      </p>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <p>
          NepaCal (nepacalc.com) is operated by Avash Chaudhary, based in Kathmandu, Nepal. This privacy policy explains what information we collect, how we use it, and what choices you have. We have written it in plain language because we believe you deserve to understand exactly what happens with your data.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">What Information We Collect</h2>
        <p><strong>Information you give us:</strong><br />
        NepaCal does not require you to create an account or provide any personal information to use our calculators. If you contact us via email or our contact form, we collect your name and email address solely to respond to your message.</p>

        <p><strong>Information collected automatically:</strong><br />
        When you visit NepaCal, our servers and third-party services may automatically collect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your browser type and version</li>
          <li>Your device type (desktop, mobile, tablet)</li>
          <li>Your approximate location (country/city level only — based on IP address)</li>
          <li>Which pages you visit and how long you spend on them</li>
          <li>The website that referred you to NepaCal (referrer URL)</li>
        </ul>
        <p>We use this information only to understand how people use NepaCal and to improve the site. We do not use it to identify you personally.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Cookies</h2>
        <p>NepaCal uses cookies — small text files stored on your device — for the following purposes:</p>
        <p><strong>Essential cookies:</strong> Required for the site to function correctly (for example, remembering your calculator preferences during a session).</p>
        <p><strong>Analytics cookies (Google Analytics):</strong> We use Google Analytics to understand traffic patterns, popular calculators, and how users navigate the site. Google Analytics collects anonymized usage data. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>
        <p><strong>Advertising cookies (Google AdSense):</strong> NepaCal displays advertisements served by Google AdSense. Google uses cookies to show ads based on your previous visits to NepaCal and other websites. These cookies are set by Google, not by NepaCal directly.</p>
        <p>You can control how Google uses your data for advertising at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google&apos;s Ad Settings</a>. You can also opt out of personalized advertising from Google and other participating companies through the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Network Advertising Initiative opt-out page</a>.</p>
        <p><strong>How to disable cookies:</strong> You can disable cookies in your browser settings. Note that disabling cookies may affect how some parts of NepaCal work.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Google AdSense and Third-Party Advertising</h2>
        <p>NepaCal uses Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads based on a user&apos;s prior visits to NepaCal or other websites on the internet.</p>
        <p>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to NepaCal and/or other sites on the internet. Users may opt out of personalized advertising by visiting Google&apos;s <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ads Settings</a>.</p>
        <p>We do not control the content of third-party advertisements. We are not responsible for the privacy practices of advertisers whose ads appear on our site.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Google Analytics</h2>
        <p>We use Google Analytics to collect anonymized information about how visitors use NepaCal. This includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Number of visitors</li>
          <li>Which calculators are most popular</li>
          <li>How long sessions last</li>
          <li>What device and browser visitors use</li>
        </ul>
        <p>Google Analytics data is processed by Google in accordance with their privacy policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">policies.google.com/privacy</a>. No personally identifiable information is sent to Google Analytics through our implementation.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Operate and improve NepaCal&apos;s calculators and tools</li>
          <li>Understand which features are most useful to our users</li>
          <li>Display relevant advertisements through Google AdSense</li>
          <li>Respond to messages you send us</li>
        </ul>
        <p>We do <strong>not:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sell your personal information to any third party</li>
          <li>Share your data with advertisers (Google AdSense uses its own data — we do not pass them your details)</li>
          <li>Use your data for any purpose beyond operating and improving NepaCal</li>
          <li>Store sensitive personal information (we have no user accounts, no payment processing, no health records)</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Data Retention</h2>
        <p>If you contact us, we retain your email and message only for as long as necessary to respond. We do not maintain a mailing list and will not send you unsolicited emails.</p>
        <p>Analytics data collected by Google Analytics is retained according to Google&apos;s standard retention policies.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Your Rights</h2>
        <p>Depending on where you are located, you may have rights regarding your personal data under laws such as GDPR (European Union) or similar regulations. These rights may include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The right to know what data is collected about you</li>
          <li>The right to request deletion of your data</li>
          <li>The right to opt out of data processing for advertising purposes</li>
        </ul>
        <p>To exercise any of these rights, contact us at: <a href="mailto:admin@nepacalc.com" className="text-blue-600 hover:underline">admin@nepacalc.com</a></p>
        <p>For advertising data specifically, use Google&apos;s tools at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">adssettings.google.com</a>.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Children&apos;s Privacy</h2>
        <p>NepaCal does not knowingly collect information from children under 13. Our tools are designed for general use — students, professionals, and the general public in Nepal. If you believe a child under 13 has provided us with personal information, please contact us and we will delete it promptly.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Links to Other Websites</h2>
        <p>NepaCal links to official government sources (IRD Nepal, NRB, DoTM) and other useful resources. We are not responsible for the privacy practices of those external websites. We encourage you to read the privacy policies of any website you visit.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of NepaCal after any changes constitutes your acceptance of the updated policy.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Contact Us</h2>
        <p>If you have questions about this privacy policy or how NepaCal handles your data:</p>
        <ul className="list-none space-y-1">
          <li><strong>Email:</strong> <a href="mailto:admin@nepacalc.com" className="text-blue-600 hover:underline">admin@nepacalc.com</a></li>
          <li><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:underline">https://nepacalc.com/contact/</Link></li>
          <li><strong>Location:</strong> Kathmandu, Nepal</li>
        </ul>
      </div>
    </div>
  );
}
