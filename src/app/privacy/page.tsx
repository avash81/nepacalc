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
          <p className="text-sm md:text-base text-gray-500 font-medium">
            <strong>Effective Date:</strong> July 19, 2026 | <strong>Last Updated:</strong> July 19, 2026
          </p>
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

        </div>
      </div>
    </div>
  );
}
