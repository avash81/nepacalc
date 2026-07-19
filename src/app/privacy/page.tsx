import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NepaCalc',
  description: 'NepaCalc privacy policy — cookies, Google AdSense, Analytics, and your rights. Plain language. Updated July 2026.',
  alternates: {
    canonical: 'https://nepacalc.com/privacy/',
  },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
          <div className="text-sm md:text-base text-gray-500 font-medium flex flex-col items-center gap-1">
            <p><strong>Published:</strong> May 1, 2026</p>
            <p><strong>Last Reviewed:</strong> July 19, 2026</p>
            <p><strong>Next Scheduled Review:</strong> July 2027 or whenever official regulations change.</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Table of Contents Sidebar */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <div className="sticky top-20 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-500">
              <li><a href="#information-we-collect" className="hover:text-blue-600 transition-colors">1. Information We Collect</a></li>
              <li><a href="#how-we-use-information" className="hover:text-blue-600 transition-colors">2. How We Use Information</a></li>
              <li><a href="#cookies" className="hover:text-blue-600 transition-colors">3. Cookies</a></li>
              <li><a href="#adsense" className="hover:text-blue-600 transition-colors">4. Google AdSense & Advertising</a></li>
              <li><a href="#analytics" className="hover:text-blue-600 transition-colors">5. Google Analytics</a></li>
              <li><a href="#third-party" className="hover:text-blue-600 transition-colors">6. Third-Party Services</a></li>
              <li><a href="#security" className="hover:text-blue-600 transition-colors">7. Data Security</a></li>
              <li><a href="#retention" className="hover:text-blue-600 transition-colors">8. Data Retention</a></li>
              <li><a href="#children" className="hover:text-blue-600 transition-colors">9. Children's Privacy</a></li>
              <li><a href="#rights" className="hover:text-blue-600 transition-colors">10. Your Privacy Rights</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-xl border border-gray-100 shadow-sm prose prose-sm md:prose-base prose-blue max-w-none text-gray-600 prose-headings:text-gray-900">
          
          <p className="lead text-gray-700 font-medium text-lg mt-0">
            At <strong>NepaCalc</strong> ("we," "our," or "us"), protecting your privacy is one of our highest priorities.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use it, how it is protected, and your rights regarding your information when you use <strong>https://nepacalc.com</strong> and its calculators, tools, market pages, articles, and other services.
          </p>
          <p>
            NepaCalc is designed around a simple principle:
          </p>
          <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-900 rounded-r-lg font-medium not-prose my-6">
            Most calculations should happen directly inside your browser without collecting or storing your personal information.
          </blockquote>
          <p>
            By using NepaCalc, you agree to the practices described in this Privacy Policy.
          </p>

          <hr className="my-10" />

          <h2 id="information-we-collect" className="text-2xl font-bold scroll-mt-24 border-b pb-3">1. Information We Collect</h2>
          
          <h3 className="text-lg font-bold mt-6">Information You Provide Voluntarily</h3>
          <p>Most NepaCalc calculators can be used without creating an account or providing any personal information.</p>
          <p>We only collect personal information when you voluntarily provide it, including when you:</p>
          <ul>
            <li>Contact us by email</li>
            <li>Submit a message through our contact form</li>
            <li>Report an error or suggest a calculator improvement</li>
          </ul>
          <p>Depending on your communication, this information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Message contents</li>
          </ul>
          <p>We use this information solely to respond to your enquiry.</p>

          <h3 className="text-lg font-bold mt-8">Information Collected Automatically</h3>
          <p>Like most websites, NepaCalc automatically collects certain technical information when you visit our website.</p>
          <p>This may include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Device type</li>
              <li>Screen resolution</li>
              <li>Language preferences</li>
            </ul>
            <ul>
              <li>Approximate geographic location</li>
              <li>IP address</li>
              <li>Referring website</li>
              <li>Pages visited and time spent</li>
              <li>Click behaviour and session duration</li>
            </ul>
          </div>
          <p>This information is collected in aggregated form and is used to understand how visitors use our website and improve the overall user experience.</p>

          <h3 className="text-lg font-bold mt-8">Calculator Inputs</h3>
          <p>Most NepaCalc calculators perform calculations entirely within your web browser.</p>
          <p>Examples include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Salary calculations</li>
              <li>Income tax calculations</li>
              <li>BMI calculations</li>
              <li>Loan calculations</li>
            </ul>
            <ul>
              <li>Engineering calculations</li>
              <li>Unit conversions</li>
              <li>Market conversion tools</li>
            </ul>
          </div>
          <p>Unless explicitly stated otherwise, the numbers you enter into our calculators:</p>
          <ul>
            <li>are <strong>not stored</strong></li>
            <li>are <strong>not transmitted to our servers</strong></li>
            <li>are <strong>not shared with third parties</strong></li>
            <li>remain only within your browser session</li>
          </ul>
          <p>This privacy-first approach is one of the core design principles of NepaCalc.</p>

          <hr className="my-10" />

          <h2 id="how-we-use-information" className="text-2xl font-bold scroll-mt-24 border-b pb-3">2. How We Use Information</h2>
          <p>The limited information we collect helps us:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Operate the NepaCalc platform</li>
              <li>Improve calculator accuracy and usability</li>
              <li>Monitor website performance</li>
              <li>Understand visitor behaviour</li>
            </ul>
            <ul>
              <li>Fix technical issues</li>
              <li>Respond to enquiries</li>
              <li>Protect the security of the website</li>
              <li>Display advertisements that help keep NepaCalc free</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6 not-prose space-y-3">
            <p className="flex items-center gap-2"><span className="text-red-500 font-black text-xl">✕</span> We do <strong>not</strong> sell your personal information.</p>
            <p className="flex items-center gap-2"><span className="text-red-500 font-black text-xl">✕</span> We do <strong>not</strong> rent your personal information.</p>
            <p className="flex items-center gap-2"><span className="text-red-500 font-black text-xl">✕</span> We do <strong>not</strong> create personal user profiles.</p>
            <p className="flex items-center gap-2"><span className="text-red-500 font-black text-xl">✕</span> We do <strong>not</strong> store your calculator inputs unless explicitly stated.</p>
          </div>

          <hr className="my-10" />

          <h2 id="cookies" className="text-2xl font-bold scroll-mt-24 border-b pb-3">3. Cookies</h2>
          <p>NepaCalc uses cookies and similar technologies to improve website functionality and user experience.</p>
          <p>Cookies are small text files stored on your device. They help us:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Improve website performance</li>
            <li>Measure website traffic</li>
            <li>Display advertisements</li>
            <li>Maintain security</li>
          </ul>
          <p>The cookies used on NepaCalc generally fall into the following categories:</p>

          <h3 className="text-lg font-bold mt-6">Essential Cookies</h3>
          <p>These cookies are required for the website to function properly. They support features such as navigation, security, session management, and calculator functionality. Essential cookies cannot be disabled through our website because they are necessary for basic operation.</p>

          <h3 className="text-lg font-bold mt-6">Analytics Cookies</h3>
          <p>Analytics cookies help us understand how visitors use NepaCalc. They allow us to measure popular calculators, visitor behaviour, device usage, traffic sources, and performance improvements. This information is collected in aggregated form and is not used to personally identify visitors.</p>

          <h3 className="text-lg font-bold mt-6">Advertising Cookies</h3>
          <p>Advertising cookies may be placed by Google and other advertising partners. These cookies help display advertisements, limit repeated advertisements, measure advertising performance, and personalize advertising where permitted. Users may control advertising preferences through Google's Ads Settings and browser privacy controls.</p>

          <hr className="my-10" />

          <h2 id="adsense" className="text-2xl font-bold scroll-mt-24 border-b pb-3">4. Google AdSense & Advertising</h2>
          <p>NepaCalc is supported through advertising. Advertising allows us to continue providing calculators, educational resources, and market information free of charge.</p>
          <p>Google AdSense may display advertisements throughout our website. Google and its advertising partners may use cookies to display advertisements based on:</p>
          <ul>
            <li>Previous visits to NepaCalc</li>
            <li>Visits to other websites</li>
            <li>General browsing behaviour</li>
          </ul>
          <p>Google may use the <strong>DoubleClick Cookie</strong> to serve personalized advertisements.</p>
          <p>You can learn more about Google's advertising technologies and manage your advertising preferences through <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>
          <p>NepaCalc does not control the advertisements shown by Google or other advertising partners. We do not receive personal information about individual users from Google AdSense. Advertising providers operate according to their own privacy policies and terms of service.</p>

          <hr className="my-10" />

          <h2 id="analytics" className="text-2xl font-bold scroll-mt-24 border-b pb-3">5. Google Analytics</h2>
          <p>NepaCalc uses Google Analytics to understand how visitors interact with our website and improve the quality of our services.</p>
          <p>Google Analytics may collect information such as:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Device type</li>
              <li>Browser type</li>
            </ul>
            <ul>
              <li>Operating system</li>
              <li>Country or region</li>
              <li>Traffic source</li>
              <li>User interactions</li>
            </ul>
          </div>
          <p>This information is collected in an aggregated and anonymized manner and is used solely to improve website performance, usability, and content quality.</p>
          <p>We do not use Google Analytics to identify individual users.</p>
          <p>For more information about how Google processes analytics data, please visit: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.</p>
          <p>You may also opt out of Google Analytics by installing the official browser add-on provided by Google.</p>

          <hr className="my-10" />

          <h2 id="third-party" className="text-2xl font-bold scroll-mt-24 border-b pb-3">6. Third-Party Services</h2>
          <p>To operate and improve NepaCalc, we may use trusted third-party service providers. These services may include:</p>
          <ul>
            <li>Google Analytics</li>
            <li>Google AdSense</li>
            <li>Google Tag Manager</li>
            <li>Cloudflare</li>
            <li>Website hosting providers</li>
            <li>Performance monitoring services</li>
            <li>Security services</li>
          </ul>
          <p>These providers may process limited technical information necessary to deliver their respective services.</p>
          <p>Each third-party provider operates under its own privacy policy. NepaCalc does not control how these providers process data beyond the services they provide.</p>

          <hr className="my-10" />

          <h2 id="security" className="text-2xl font-bold scroll-mt-24 border-b pb-3">7. Data Security</h2>
          <p>We take reasonable administrative, technical, and organizational measures to protect our website and the limited information we process. These measures include:</p>
          <ul>
            <li>HTTPS encryption</li>
            <li>Secure hosting infrastructure</li>
            <li>Firewall and security protection</li>
            <li>Regular software updates</li>
            <li>Access controls</li>
            <li>Website monitoring</li>
          </ul>
          <p>Although we work to protect your information, no method of electronic transmission or internet storage can be guaranteed to be completely secure. For this reason, we cannot guarantee absolute security.</p>

          <hr className="my-10" />

          <h2 id="retention" className="text-2xl font-bold scroll-mt-24 border-b pb-3">8. Data Retention</h2>
          <p>NepaCalc stores as little personal information as possible.</p>
          <p>Contact requests submitted through our contact form or email may be retained only for as long as necessary to:</p>
          <ul>
            <li>Respond to your enquiry</li>
            <li>Resolve technical issues</li>
            <li>Maintain communication records</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
          <p>Calculator inputs are generally not stored and remain within your browser unless explicitly stated otherwise for a specific tool.</p>
          <p>Anonymous analytics data may be retained by Google Analytics according to Google's own data retention policies.</p>

          <hr className="my-10" />

          <h2 id="children" className="text-2xl font-bold scroll-mt-24 border-b pb-3">9. Children's Privacy</h2>
          <p>NepaCalc is intended for a general audience and does not knowingly collect personal information from children under the age of 13.</p>
          <p>If you believe that a child has provided personal information to us, please contact us immediately. Upon verification, we will promptly remove the information from our records where applicable.</p>

          <hr className="my-10" />

          <h2 id="rights" className="text-2xl font-bold scroll-mt-24 border-b pb-3">10. Your Privacy Rights</h2>
          <p>Depending on your location, you may have certain privacy rights under applicable laws. These rights may include:</p>
          <ul>
            <li>The right to access personal information we hold about you.</li>
            <li>The right to request correction of inaccurate information.</li>
            <li>The right to request deletion of your personal information.</li>
            <li>The right to object to certain processing activities.</li>
            <li>The right to withdraw consent where consent is the legal basis for processing.</li>
          </ul>
          <p>Because NepaCalc collects very limited personal information, many of these rights will apply only to information voluntarily provided through our contact channels.</p>
          <p>To exercise your privacy rights, please contact us at:</p>
          <p><a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>

        </div>
      </div>
    </div>
  );
}
