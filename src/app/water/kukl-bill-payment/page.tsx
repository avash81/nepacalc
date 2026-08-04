import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'How to Pay KUKL Bill Online in Nepal | Complete Payment Guide',
  description:
    'Learn how to check, pay, download, and manage your KUKL water bill online in Nepal. Compare payment methods, download statements, troubleshoot payment issues, and access official KUKL services.',
  keywords: [
    'How to Pay KUKL Bill Online',
    'KUKL Bill Payment',
    'KUKL Online Bill Check',
    'KUKL Payment Status',
    'KUKL Bill Statement',
    'Water Bill Nepal Online Check',
    'KUKL Customer Portal',
    'KUKL Customer App',
    'Khanepani Bill Payment Nepal',
    'KUKL Payment Methods',
    'Download KUKL Bill Statement',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/water/kukl-bill-payment/',
  },
  openGraph: {
    title: 'How to Pay KUKL Bill Online in Nepal | Complete Payment Guide',
    description:
      'Learn how to check, pay, download, and manage your KUKL water bill online in Nepal using official KUKL services and trusted payment platforms.',
    url: 'https://nepacalc.com/water/kukl-bill-payment/',
    type: 'article',
    images: [{
      url: '/images/kukl-bill-payment-og.jpg',
      width: 1200,
      height: 630,
      alt: 'KUKL Bill Payment Nepal'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pay KUKL Bill Online in Nepal | Complete Payment Guide',
    description:
      'Learn how to check, pay, download, and manage your KUKL water bill online in Nepal using official KUKL services and trusted payment platforms.',
    images: ['/images/kukl-bill-payment-og.jpg'],
  },
};

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/water/kukl-bill-payment/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Water', item: 'https://nepacalc.com/water/' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'KUKL Bill Payment',
      item: 'https://nepacalc.com/water/kukl-bill-payment/',
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://nepacalc.com/water/kukl-bill-payment/#webpage',
  url: 'https://nepacalc.com/water/kukl-bill-payment/',
  name: 'How to Pay KUKL Bill Online in Nepal – Complete Payment Guide',
  description:
    'Learn how to pay your KUKL bill online using the official portal, eSewa, Khalti, ConnectIPS, Fonepay, and mobile banking. Check bills, statements, receipts, and payment status.',
  inLanguage: 'en',
  isPartOf: { '@id': 'https://nepacalc.com/#website' },
  breadcrumb: { '@id': 'https://nepacalc.com/water/kukl-bill-payment/#breadcrumb' },
  publisher: { '@id': 'https://nepacalc.com/#organization' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Pay KUKL Bill Online in Nepal',
  description:
    'Complete guide to checking, paying, downloading statements, viewing payment history and managing Kathmandu Upatyaka Khanepani Limited water bills online.',
  author: {
    '@type': 'Organization',
    name: 'NepaCalc',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NepaCalc',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nepacalc.com/logo.png',
    },
  },
  mainEntityOfPage: 'https://nepacalc.com/water/kukl-bill-payment/',
  datePublished: '2026-07-24',
  dateModified: '2026-08-04',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Pay KUKL Bill Online',
  step: [
    {
      '@type': 'HowToStep',
      text: 'Open your preferred digital wallet or mobile banking application.',
    },
    {
      '@type': 'HowToStep',
      text: 'Select Drinking Water or Khanepani bill payment.',
    },
    {
      '@type': 'HowToStep',
      text: 'Choose your KUKL branch office.',
    },
    {
      '@type': 'HowToStep',
      text: 'Enter your Customer or Connection Number.',
    },
    {
      '@type': 'HowToStep',
      text: 'Verify your bill details.',
    },
    {
      '@type': 'HowToStep',
      text: 'Complete the payment and download your receipt.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I check my KUKL bill online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can check your KUKL bill online through the official KUKL Customer Portal, the KUKL Customer App, digital wallets like eSewa and Khalti, or mobile banking applications supporting Fonepay Bills.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I pay my KUKL bill online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open your preferred banking app or digital wallet, select Drinking Water or Khanepani, choose your KUKL branch, enter your customer or connection number, verify the bill and complete payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download my KUKL bill statement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can download your billing history and payment statements from the official KUKL Customer Portal or the KUKL Customer App.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which payment methods does KUKL support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KUKL supports payments through its customer portal, mobile application, eSewa, Khalti, ConnectIPS, Fonepay-enabled mobile banking, and selected commercial banks.',
      },
    },
  ],
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.article-introduction'],
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Related Utility Calculators',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: 'https://nepacalc.com/calculator/kukl-bill/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: 'https://nepacalc.com/calculator/nea-bill/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      url: 'https://nepacalc.com/electricity/nepal-unit-price/',
    },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NepaCalc',
  url: 'https://nepacalc.com/',
  logo: 'https://nepacalc.com/logo.png',
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function KUKLBillPaymentPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Schema Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <article className="max-w-6xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/water/" className="hover:text-blue-600">Water</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium">KUKL Bill Payment</li>
          </ol>
        </nav>

        {/* H1 + Introduction */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
          How to Pay KUKL Bill Online in Nepal
        </h1>

        {/* Hero Image */}
        <div className="mb-6 mt-4">
          <img
            src="/images/kukl-bill-payment-hero.jpg"
            alt="KUKL Bill Payment Nepal – How to pay water bill online"
            width={1200}
            height={600}
            loading="eager"
            className="rounded-xl shadow-sm w-full h-auto object-cover"
          />
        </div>

        {/* Two-column layout: Main content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">

          {/* ── LEFT: Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Intro */}
            <div className="prose prose-base max-w-none text-gray-700 mb-6">
              <p className="article-introduction">
                You can pay your <strong>KUKL bill</strong> (Kathmandu Upatyaka Khanepani Limited) online using the official <strong>KUKL Customer Portal</strong>, <strong>eSewa</strong>, <strong>Khalti</strong>, <strong>ConnectIPS</strong>, mobile banking apps, and other supported payment services. You will need your <strong>Customer Number</strong> and registered KUKL branch to get started. This guide covers how to check your bill, make payments, download statements, verify payment status, and troubleshoot common issues.
              </p>
              <p>
                Before making a payment, you can estimate your monthly charges using our <Link href="/calculator/kukl-bill/" className="text-blue-600 hover:underline font-medium">KUKL Water Bill Calculator</Link> to understand your expected bill based on your water consumption and current tariff rates.
              </p>
            </div>

            {/* Quick Answer for AI Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-lg font-black text-blue-900 mb-3">Quick Answer: How to Pay KUKL Bill Online</h2>
              <p className="text-blue-800 text-sm mb-3">You can check and pay your KUKL water bill online using:</p>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1 mb-4 font-medium">
                <li>Official KUKL Customer Portal</li>
                <li>KUKL Customer App</li>
                <li>eSewa</li>
                <li>Khalti</li>
                <li>ConnectIPS</li>
                <li>Mobile Banking</li>
                <li>Fonepay Bills</li>
              </ul>
              <p className="text-blue-800 text-sm mb-2">You&apos;ll need:</p>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1 font-medium">
                <li>Customer Number</li>
                <li>Correct Branch</li>
              </ul>
            </div>

          </div>{/* end left */}

          {/* ── RIGHT: Sidebar ── */}
          <aside className="lg:w-72 shrink-0 space-y-4">

            {/* Meta info card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-sm text-gray-700 space-y-3">
              <div className="flex items-start gap-2">
                <span className="mt-0.5">🕒</span>
                <div><span className="font-semibold text-gray-800">Last reviewed:</span><br />August 4, 2026</div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex items-start gap-2">
                <span className="mt-0.5">✍️</span>
                <div><span className="font-semibold text-gray-800">Reviewed by:</span><br />NepaCalc Editorial Team</div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex items-start gap-2">
                <span className="mt-0.5">📖</span>
                <div><span className="font-semibold text-gray-800">Reading time:</span><br />6–8 minutes</div>
              </div>
            </div>

            {/* Page Updates card */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm">
              <h2 className="font-bold text-blue-900 mb-3">Page Updates</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> Updated online payment methods</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> Verified official KUKL payment channels</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> Updated customer portal links</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">✓</span> Reviewed payment providers</li>
              </ul>
            </div>

            {/* Quick Nav card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm">
              <h2 className="font-bold text-gray-900 uppercase tracking-wide mb-3 text-xs">In this guide</h2>
              <ul className="space-y-2 text-blue-700 font-medium">
                <li><a href="#check-kukl-bill" className="hover:underline">• How to check KUKL bill</a></li>
                <li><a href="#pay-kukl-bill" className="hover:underline">• How to pay KUKL bill</a></li>
                <li><a href="#payment-methods" className="hover:underline">• Payment methods</a></li>
                <li><a href="#payment-status" className="hover:underline">• Payment status</a></li>
                <li><a href="#statement" className="hover:underline">• Download statement & receipt</a></li>
                <li><a href="#customer-number" className="hover:underline">• Customer number</a></li>
                <li><a href="#common-problems" className="hover:underline">• Common problems</a></li>
                <li><a href="#faq" className="hover:underline">• FAQs</a></li>
              </ul>
            </div>

          </aside>
        </div>{/* end two-column */}


        {/* ── SECTION 1: Customer Number ── */}
        <section id="customer-number" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Where to Find Your KUKL Customer Number (Connection Number)</h2>
          
          <p className="text-gray-700 mb-4">
            Your Customer Number, also referred to as the Connection Number, is the unique identifier used by Kathmandu Upatyaka Khanepani Limited (KUKL) to identify your water connection. It is required to check your bill, make online payments, download statements, and access customer services.
          </p>
          <p className="text-gray-800 font-semibold mb-8">
            If you&apos;re paying your KUKL bill online for the first time, locating this number is the most important step.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">You Can Find Your Customer Number On:</h3>

          <div className="space-y-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-lg font-bold text-blue-700 mb-3">1. Previous KUKL Water Bills</h4>
              <p className="text-gray-700 text-sm mb-3">The easiest place to locate your Customer Number is on an earlier KUKL water bill.</p>
              <p className="text-gray-800 text-sm font-semibold mb-2">Most printed bills include:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Customer Number</li>
                <li>Connection Number</li>
                <li>Customer Name</li>
                <li>Branch Office</li>
                <li>Billing Period</li>
              </ul>
              <p className="text-gray-500 text-sm italic">Keep a copy of your latest bill for future reference.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-lg font-bold text-blue-700 mb-3">2. KUKL Customer Portal</h4>
              <p className="text-gray-700 text-sm mb-3">If you already have an account on the KUKL Customer Portal, simply sign in and open your water connection details.</p>
              <p className="text-gray-800 text-sm font-semibold mb-2">The portal displays:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Customer Number</li>
                <li>Water Connection Information</li>
                <li>Billing Details</li>
                <li>Payment History</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-lg font-bold text-blue-700 mb-3">3. KUKL Customer App</h4>
              <p className="text-gray-700 text-sm mb-3">The official KUKL Customer App also displays your registered connection information.</p>
              <p className="text-gray-700 text-sm font-medium mb-3">Navigate to: <span className="font-bold">Water Connection → Connection Details</span></p>
              <p className="text-gray-800 text-sm font-semibold mb-2">Here you can view:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Customer Number</li>
                <li>Connection Information</li>
                <li>Branch Office</li>
                <li>Account Status</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-lg font-bold text-blue-700 mb-3">4. Previous Payment Receipts</h4>
              <p className="text-gray-700 text-sm mb-3">If you&apos;ve previously paid through eSewa, Khalti, ConnectIPS, or Mobile Banking:</p>
              <p className="text-gray-700 text-sm">
                Your payment receipt or transaction history may include your Customer Number or enough information to identify your account.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="text-lg font-bold text-blue-700 mb-3">5. Contact Your KUKL Branch</h4>
              <p className="text-gray-700 text-sm mb-3">If you cannot locate your Customer Number, contact your registered KUKL branch.</p>
              <p className="text-gray-800 text-sm font-semibold mb-2">You may be asked to provide:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Customer Name</li>
                <li>Property Address</li>
                <li>Branch Office</li>
                <li>Phone Number</li>
                <li>Citizenship or identification details (if required)</li>
              </ul>
              <p className="text-gray-500 text-sm italic">The branch can help you verify your connection details.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">KUKL Online Payment Branch Coverage</h3>
            <p className="text-gray-700 text-sm mb-3">KUKL online payment is available for branches including:</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700 font-medium">
              <li>• Baneshwor</li>
              <li>• Bhaktapur</li>
              <li>• Kirtipur</li>
              <li>• Lalitpur</li>
              <li>• Mahankalchaur</li>
              <li>• Maharajgunj</li>
              <li>• Thimi</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Is the Customer Number Important?</h3>
            <p className="text-gray-700 mb-4">
              Your Customer Number is required for almost every online KUKL service, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                'Checking your water bill',
                'Paying your KUKL bill online',
                'Downloading bill statements',
                'Viewing payment history',
                'Tracking outstanding dues',
                'Managing multiple water connections'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-sm text-blue-900">
                  <span className="text-blue-500 font-bold">✓</span> {item}
                </div>
              ))}
            </div>
            <p className="text-red-600 font-medium text-sm">
              Without the correct Customer Number, online payment platforms cannot retrieve your billing information.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h3 className="text-base font-bold text-amber-800 mb-3">⚠️ Tips Before Making an Online Payment</h3>
            <p className="text-amber-800 text-sm mb-3">Before entering your Customer Number:</p>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1 mb-3">
              <li>Double-check every digit.</li>
              <li>Select the correct KUKL branch.</li>
              <li>Verify that the customer name displayed matches your account.</li>
              <li>Review the outstanding amount before confirming payment.</li>
            </ul>
            <p className="text-amber-700 text-sm">Entering an incorrect Customer Number may display another customer&apos;s account or prevent the bill from loading.</p>
          </div>
        </section>

        {/* ── SECTION 2: Check Bill ── */}
        <section id="check-kukl-bill" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">How to Check Your KUKL Bill Online</h2>

          <p className="text-gray-700 mb-4">
            Checking your KUKL bill online allows you to see your latest outstanding balance, previous payments, billing period, and invoice details before making a payment. You can check your bill through the official KUKL customer portal, the KUKL mobile app, digital wallets, or mobile banking applications.
          </p>
          <p className="text-gray-700 mb-8">
            If you also need to pay your electricity bill, you can use our <Link href="/calculator/nea-bill/" className="text-blue-600 hover:underline font-medium">NEA Bill Calculator</Link> to estimate your monthly Nepal Electricity Authority charges before making payment.
          </p>

          {/* Method 1 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Method 1: Check Bill Using the Official KUKL Customer Portal</h3>
            <p className="text-gray-700 mb-4">
              The official <a href="https://customer.kukl.org.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KUKL Customer Portal</a> is the most comprehensive way to check your water bill online.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open the official KUKL Customer Portal.</li>
              <li>Sign in to your customer account.</li>
              <li>Select <strong>Billing</strong> or <strong>Water Connection</strong>.</li>
              <li>Choose your registered water connection.</li>
              <li>View your latest bill details.</li>
            </ol>
            <h4 className="text-lg font-bold text-gray-900 mb-2 mt-5">KUKL Customer Portal Features</h4>
            <p className="text-gray-800 font-semibold mb-2 text-sm">The KUKL Customer Portal allows customers to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>View water bills</li>
              <li>Pay bills online</li>
              <li>Check payment history</li>
              <li>Download statements</li>
              <li>Download receipts</li>
              <li>Manage water connections</li>
              <li>Track tanker bookings</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              This is the recommended option if you regularly monitor your KUKL account.
            </p>
          </div>

          {/* Method 2 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Method 2: Check KUKL Bill Using the Mobile App</h3>
            <p className="text-gray-700 mb-4">
              The official KUKL Customer App provides convenient access to billing information from your smartphone.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">After signing in, customers can view:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Current bill amount</li>
              <li>Previous bills</li>
              <li>Payment history</li>
              <li>Water connection details</li>
              <li>Invoice information</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              The mobile application is suitable for customers who frequently check their account without visiting the customer portal.
            </p>
          </div>

          {/* Method 3 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Method 3: Check KUKL Bill Through eSewa</h3>
            <p className="text-gray-700 mb-4">
              You can also check your outstanding KUKL bill without completing the payment.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open <a href="https://esewa.com.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">eSewa</a>.</li>
              <li>Select <strong>Khanepani</strong>.</li>
              <li>Choose your KUKL branch.</li>
              <li>Enter your Customer Number.</li>
              <li>Tap <strong>Get Details</strong>.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">The application retrieves:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Current outstanding amount</li>
              <li>Customer information</li>
              <li>Water connection details</li>
              <li>Payment due</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              You can decide whether to proceed with payment after reviewing the bill.
            </p>
          </div>

          {/* Method 4 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Method 4: Check KUKL Bill Using Khalti</h3>
            <p className="text-gray-700 mb-4">
              <a href="https://khalti.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Khalti</a> offers a similar bill inquiry service before payment.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Open Khalti.</li>
              <li>Navigate to <strong>Utilities</strong>.</li>
              <li>Select <strong>Khanepani</strong>.</li>
              <li>Choose the appropriate KUKL branch.</li>
              <li>Enter your Customer ID.</li>
              <li>Tap <strong>Verify Bill</strong>.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              Your latest payable amount will be displayed instantly.
            </p>
          </div>

          {/* Method 5 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Method 5: Check Bill Through Mobile Banking</h3>
            <p className="text-gray-700 mb-4">
              Most Nepali banks support bill inquiry before payment.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">General process:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Open your bank&apos;s mobile banking app.</li>
              <li>Go to <strong>Utility Payments</strong>.</li>
              <li>Select <strong>Water</strong> or <strong>KUKL</strong>.</li>
              <li>Choose your branch.</li>
              <li>Enter your Customer Number.</li>
              <li>Fetch the bill.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              Many banking applications use the Fonepay Bills network to retrieve live billing information directly from KUKL.
            </p>
          </div>

          {/* Information You Can View */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Information You Can View Online</h3>
            <p className="text-gray-700 mb-4">
              Depending on the platform you use, online bill inquiry may include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Current outstanding balance',
                'Monthly water charges',
                'Sewerage charges',
                'Previous payment history',
                'Billing period',
                'Invoice number',
                'Customer details',
                'Water connection information',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-sm text-blue-900">
                  <span className="text-blue-500 font-bold">✓</span> {item}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-3">The exact information displayed may vary by platform.</p>
          </div>

          {/* What You Need */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <h3 className="text-base font-bold text-gray-900 mb-3">What You Need to Check Your KUKL Bill</h3>
            <p className="text-gray-700 text-sm mb-3">Before checking your bill, keep the following information ready:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Customer Number</li>
              <li>Connection Number</li>
              <li>Registered KUKL Branch</li>
              <li>Internet connection</li>
              <li>Access to the customer portal, digital wallet, or banking application</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">Providing accurate information ensures the correct account details are retrieved.</p>
          </div>

          {/* Troubleshooting */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-red-800 mb-3">⚠️ Unable to Find Your Bill?</h3>
            <p className="text-red-800 text-sm mb-3">If your bill cannot be retrieved online, check the following:</p>
            <ul className="list-disc list-inside text-red-900 text-sm space-y-1">
              <li>Customer Number is entered correctly.</li>
              <li>Correct KUKL branch has been selected.</li>
              <li>The water connection is active.</li>
              <li>There are no temporary service interruptions.</li>
              <li>The billing cycle has already been generated.</li>
            </ul>
            <p className="text-red-700 text-sm mt-3">If the issue continues, you may need to contact your respective KUKL branch for assistance.</p>
          </div>
        </section>

        {/* ── SECTION 3: Pay Bill ── */}
        <section id="pay-kukl-bill" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">How to Pay Your KUKL Bill</h2>

          <p className="text-gray-700 mb-4">
            Paying your Kathmandu Upatyaka Khanepani Limited (KUKL) water bill online is quick and secure. KUKL supports multiple digital payment channels, including its official customer portal, mobile app, digital wallets, internet banking, mobile banking, and QR-based payment systems.
          </p>

          <p className="text-gray-700 mb-2">To complete a payment, you usually need:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm">
            <li>Customer / Connection Number</li>
            <li>Registered KUKL Branch</li>
            <li>Internet or mobile banking access</li>
            <li>Digital wallet or banking application (optional)</li>
          </ul>

          <p className="text-gray-700 mb-8">
            Most online payments are processed instantly, allowing you to view your updated payment status immediately after the transaction is completed. You can also explore the <a href="https://kukl.org.np/e-services/online-payment-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official KUKL Online Payment Service</a> page for official notices.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">General Steps to Pay KUKL Bill Online</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm font-medium">
              <li>Open your preferred digital wallet or mobile banking application.</li>
              <li>Select Drinking Water or Khanepani bill payment.</li>
              <li>Choose your KUKL branch office.</li>
              <li>Enter your Customer or Connection Number.</li>
              <li>Verify your bill details.</li>
              <li>Complete the payment and download your receipt.</li>
            </ol>
          </div>

          {/* Method 1 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Pay KUKL Bill Through the Official Customer Portal</h3>
            <p className="text-gray-700 mb-4">
              The official KUKL Customer Portal allows customers to manage their water account, pay outstanding bills, view invoices, and monitor payment history.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Open the official <a href="https://customer.kukl.org.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KUKL Customer Portal</a>.</li>
              <li>Log in using your registered account.</li>
              <li>Navigate to <strong>Billing</strong> or <strong>Payment</strong>.</li>
              <li>Select your water connection.</li>
              <li>Review the outstanding bill.</li>
              <li>Complete payment using the available payment options.</li>
              <li>Save or download your payment receipt.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              The portal is the best option if you regularly need access to invoices, billing history, and account management.
            </p>
          </div>

          {/* Method 2 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Pay KUKL Bill Using the KUKL Customer App</h3>
            <p className="text-gray-700 mb-4">
              KUKL also provides an official mobile application for Android and iOS users.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Using the mobile app you can:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Check current water bill</li>
              <li>Pay outstanding bills</li>
              <li>View payment history</li>
              <li>Access billing information</li>
              <li>Manage multiple water connections</li>
              <li>Track tanker services (where available)</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              The app provides nearly the same features as the customer portal but is optimised for mobile devices.
            </p>
          </div>

          {/* Method 3 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Pay KUKL Bill via eSewa</h3>
            <p className="text-gray-700 mb-4">
              <a href="https://esewa.com.np/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">eSewa</a> is one of the most popular digital wallets in Nepal for utility payments.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Open the eSewa app.</li>
              <li>Select <strong>Khanepani</strong> or <strong>Water Bill</strong>.</li>
              <li>Choose your KUKL branch.</li>
              <li>Enter your Customer/Connection Number.</li>
              <li>Verify your bill details.</li>
              <li>Complete payment.</li>
              <li>Download the digital receipt for future reference.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              Payments are generally reflected shortly after successful processing.
            </p>
          </div>

          {/* Method 4 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Pay KUKL Bill via Khalti</h3>
            <p className="text-gray-700 mb-4">
              <a href="https://khalti.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Khalti</a> also supports online KUKL bill payments.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
              <li>Open Khalti.</li>
              <li>Navigate to <strong>Utilities</strong>.</li>
              <li>Select <strong>Khanepani</strong>.</li>
              <li>Choose the appropriate KUKL branch.</li>
              <li>Enter your Customer ID.</li>
              <li>Verify the bill amount.</li>
              <li>Confirm payment.</li>
              <li>Save the receipt.</li>
            </ol>
          </div>

          {/* Method 5 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">5. Pay KUKL Bill Using Mobile Banking</h3>
            <p className="text-gray-700 mb-4">
              Most commercial banks in Nepal support KUKL bill payment through mobile banking applications.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Typical process:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Log in to your bank&apos;s mobile banking app.</li>
              <li>Open <strong>Utility Payments</strong>.</li>
              <li>Select <strong>Drinking Water</strong> or <strong>KUKL</strong>.</li>
              <li>Choose the appropriate branch.</li>
              <li>Enter your Customer Number.</li>
              <li>Verify bill information.</li>
              <li>Confirm payment using your banking PIN.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              Many banks process KUKL payments through the Fonepay Bills network.
            </p>
          </div>

          {/* Method 6 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">6. Pay KUKL Bill Through ConnectIPS</h3>
            <p className="text-gray-700 mb-4">
              Customers with a <a href="https://connectips.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ConnectIPS</a> account can also pay KUKL bills online.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">General steps include:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Log in to ConnectIPS.</li>
              <li>Open <strong>Utility Payments</strong>.</li>
              <li>Select <strong>KUKL</strong>.</li>
              <li>Enter your Customer Number.</li>
              <li>Verify the outstanding amount.</li>
              <li>Authorise the payment.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              ConnectIPS is commonly used for secure bank-to-bank utility payments.
            </p>
          </div>

          {/* Method 7 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">7. Pay KUKL Bill Using Fonepay Bills</h3>
            <p className="text-gray-700 mb-4">
              <a href="https://fonepay.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fonepay Bills</a> integrates with numerous Nepali banks and mobile banking applications.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Payment process:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Open your banking application.</li>
              <li>Navigate to <strong>Fonepay Bills</strong>.</li>
              <li>Select <strong>Water</strong>.</li>
              <li>Choose your KUKL branch.</li>
              <li>Enter your Customer Number.</li>
              <li>Review the bill.</li>
              <li>Complete payment.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              This option is convenient if your bank supports Fonepay utility payments.
            </p>
          </div>

          {/* Banks */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">8. Banks Supporting Online KUKL Bill Payment</h3>
            <p className="text-gray-700 mb-4">
              Several Nepali banks provide direct KUKL bill payment services through internet banking or mobile banking.
            </p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Commonly supported banking platforms include:</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700 mb-4">
              {['NIMB', 'Global IME Bank', 'NIC Asia Bank', 'Prabhu Bank', 'Kumari Bank', 'Siddhartha Bank', 'Everest Bank', 'Sanima Bank', 'Himalayan Bank', 'Other Fonepay-enabled banks'].map((bank) => (
                <li key={bank} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                  <span className="text-blue-500">•</span> {bank}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm">Availability may vary depending on your branch and banking platform.</p>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-amber-800 mb-3">✅ Tips Before Paying Your KUKL Bill Online</h3>
            <p className="text-amber-800 text-sm mb-2">Before making payment, verify:</p>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1">
              <li>Correct Customer/Connection Number</li>
              <li>Correct KUKL Branch</li>
              <li>Outstanding bill amount</li>
              <li>Payment confirmation screen</li>
              <li>Digital receipt after successful payment</li>
            </ul>
            <p className="text-amber-700 text-sm mt-3">Keeping your payment receipt helps if you need to verify a transaction later.</p>
          </div>
        </section>

        {/* ── SECTION 4: Payment Methods ── */}
        <section id="payment-methods" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Supported Payment Methods</h2>
          
          <p className="text-gray-700 mb-4">
            Below is a quick comparison of the official and third-party payment platforms supported by KUKL.
          </p>
          <p className="text-gray-700 mb-8">
            Besides utility tools, NepaCalc also provides regularly updated financial resources such as the <Link href="/market-rates/live-gold-price/" className="text-blue-600 hover:underline font-medium">Live Gold Price</Link> in Nepal.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Payment Platforms</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700 mb-8">
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> KUKL Customer Portal</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> KUKL Customer App</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> eSewa</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Khalti</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> ConnectIPS</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Fonepay Bills</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Mobile Banking</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Methods Comparison</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-50 text-gray-900 text-sm">
                <tr>
                  <th className="border border-gray-200 p-3 font-bold">Payment Method</th>
                  <th className="border border-gray-200 p-3 font-bold text-center">Bill Check</th>
                  <th className="border border-gray-200 p-3 font-bold text-center">Bill Payment</th>
                  <th className="border border-gray-200 p-3 font-bold text-center">Receipt</th>
                  <th className="border border-gray-200 p-3 font-bold text-center">Payment History</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">KUKL Customer Portal</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">KUKL Customer App</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">eSewa</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Khalti</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">ConnectIPS</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Mobile Banking</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center">✅</td>
                  <td className="border border-gray-200 p-3 text-center text-xs">Depends on Bank</td>
                  <td className="border border-gray-200 p-3 text-center text-xs">Depends on Bank</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 5: Payment Status ── */}
        <section id="payment-status" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Check Payment Status</h2>

          <p className="text-gray-700 mb-4">
            After paying your KUKL water bill online, you may want to confirm whether the payment has been successfully processed. In most cases, online payments are updated automatically, but the processing time may vary depending on the payment platform and banking network.
          </p>
          <p className="text-gray-700 mb-8">
            You can verify your KUKL payment status using the official customer portal, KUKL Customer App, digital wallets, or your bank&apos;s transaction history.
          </p>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Check Payment Status Through the KUKL Customer Portal</h3>
            <p className="text-gray-700 mb-4">The official KUKL Customer Portal provides the most reliable payment information.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Sign in to the official KUKL Customer Portal.</li>
              <li>Open the <strong>Billing</strong> section.</li>
              <li>Select <strong>Payment History</strong>.</li>
              <li>Review your recent transactions.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">A successful payment will usually display:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Payment date</li>
              <li>Transaction amount</li>
              <li>Payment reference number</li>
              <li>Payment status</li>
              <li>Updated outstanding balance</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              If the outstanding balance becomes zero, the payment has generally been processed successfully.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Check Payment Status Using the KUKL Customer App</h3>
            <p className="text-gray-700 mb-4">Customers using the official KUKL Customer App can also verify recent payments.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Open the application and navigate to:</p>
            <p className="text-gray-700 font-medium mb-4">Billing → Payment History</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">You can review:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Completed payments</li>
              <li>Pending payments</li>
              <li>Recent invoices</li>
              <li>Account balance</li>
              <li>Previous billing records</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Check Payment Status in eSewa</h3>
            <p className="text-gray-700 mb-4">If you paid through eSewa:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open the eSewa app.</li>
              <li>Go to <strong>Transaction History</strong>.</li>
              <li>Select the KUKL payment.</li>
              <li>Review the transaction details.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">A successful transaction generally displays:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Successful</li>
              <li>Completed</li>
              <li>Paid</li>
            </ul>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              You can also download the payment receipt for future reference.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Check Payment Status in Khalti</h3>
            <p className="text-gray-700 mb-4">For Khalti users:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open Khalti.</li>
              <li>Navigate to <strong>Transaction History</strong>.</li>
              <li>Select the KUKL payment.</li>
              <li>View the payment status and receipt.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              If the payment has been completed successfully, Khalti will display the transaction ID along with the payment confirmation.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Check Payment Status Through Mobile Banking</h3>
            <p className="text-gray-700 mb-4">Most mobile banking applications maintain a complete payment history.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Simply:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Log in to your banking app.</li>
              <li>Open <strong>Transaction History</strong> or <strong>Utility Payments</strong>.</li>
              <li>Locate your recent KUKL payment.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">The banking application will usually display:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Successful</li>
              <li>Pending</li>
              <li>Failed</li>
              <li>Reversed</li>
            </ul>
            <p className="text-gray-700 text-sm">along with the transaction reference number.</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Different Payment Statuses</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">Successful</h4>
                <p className="text-green-700 text-sm">The payment has been processed successfully and your KUKL account balance should update shortly.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-2">Pending</h4>
                <p className="text-yellow-700 text-sm mb-2">A pending payment usually means the banking network or payment gateway is still processing the transaction.</p>
                <p className="text-yellow-700 text-sm mb-2">Most pending payments are completed automatically within a short period.</p>
                <p className="text-yellow-800 font-semibold text-sm">Avoid making another payment immediately unless the original transaction ultimately fails.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">Failed</h4>
                <p className="text-red-700 text-sm mb-2">A failed payment means the transaction could not be completed.</p>
                <p className="text-red-800 font-semibold text-sm mb-1">Common reasons include:</p>
                <ul className="list-disc list-inside text-red-700 space-y-1 text-sm mb-3">
                  <li>Poor internet connection</li>
                  <li>Bank server downtime</li>
                  <li>Incorrect customer information</li>
                  <li>Insufficient account balance</li>
                  <li>Payment gateway timeout</li>
                </ul>
                <p className="text-red-700 text-sm">If money has been deducted but the payment failed, contact your payment provider before attempting another payment.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">Reversed or Refunded</h4>
                <p className="text-blue-700 text-sm mb-2">In some situations, a failed transaction may be automatically reversed.</p>
                <p className="text-blue-700 text-sm">The deducted amount is generally returned to the original payment source according to the payment provider&apos;s refund timeline.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <h3 className="text-base font-bold text-gray-900 mb-3">What to Do if Your Payment Is Not Updated</h3>
            <p className="text-gray-700 text-sm mb-3">If your payment status does not change even after completing the transaction:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm mb-3">
              <li>Wait for the payment gateway to finish processing.</li>
              <li>Refresh your billing information.</li>
              <li>Check your transaction history.</li>
              <li>Verify whether the payment amount has been deducted.</li>
              <li>Compare the transaction reference number with your payment receipt.</li>
              <li>Contact your payment provider if the issue persists.</li>
            </ol>
            <p className="text-gray-900 font-semibold text-sm">Avoid making duplicate payments while a previous transaction is still being processed.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <h3 className="text-base font-bold text-gray-900 mb-3">Information to Keep for Payment Verification</h3>
            <p className="text-gray-700 text-sm mb-3">If you need support, keep the following details available:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Customer Number</li>
                <li>Connection Number</li>
                <li>Registered Branch</li>
                <li>Transaction ID</li>
              </ul>
              <ul className="list-disc list-inside space-y-1">
                <li>Payment Date</li>
                <li>Payment Amount</li>
                <li>Digital Receipt</li>
                <li>Bank or Wallet Name</li>
              </ul>
            </div>
            <p className="text-gray-500 text-sm">Providing complete transaction information helps resolve payment issues more quickly.</p>
          </div>
        </section>

        {/* ── SECTION 6 & 7: Bill Statement and Receipt ── */}
        <section id="statement" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Download Bill Statement & Receipt</h2>

          <p className="text-gray-700 mb-4">
            KUKL customers can access their billing history, payment receipts, and previous invoices online through the official customer portal and supported payment platforms. Keeping a copy of your bill statement or payment receipt is useful for personal records, reimbursement claims, tenancy verification, or resolving billing disputes.
          </p>
          <p className="text-gray-700 mb-8">
            Depending on how you paid your bill, you can download your statement or receipt from the KUKL Customer Portal, KUKL Customer App, digital wallets, or your banking application.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Difference Between Statement and Receipt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-blue-800 mb-2">Bill Statement</h4>
                <p className="text-gray-700 text-sm">Shows billing period, consumption, and charges. It acts as an invoice of your dues.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-800 mb-2">Payment Receipt</h4>
                <p className="text-gray-700 text-sm">Confirms successful payment for a transaction. It proves you have paid the bill.</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 italic">Both can usually be accessed online through the KUKL portal.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding Your Water Bill</h3>
            <p className="text-gray-700 text-sm mb-4">Your bill statement includes important details like your billing period, total units consumed, minimum charges, sewerage charge (which is 50% of your water charge), and total dues.</p>
            <p className="text-gray-700 text-sm">
              If you&apos;re comparing household utility expenses, you may also want to check the latest <Link href="/electricity/nepal-unit-price/" className="text-blue-600 hover:underline font-medium">Electricity Unit Price in Nepal</Link> alongside your monthly water charges.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Bill Statement from the KUKL Customer Portal</h3>
            <p className="text-gray-700 mb-4">The official KUKL Customer Portal stores your billing records and payment history.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Sign in to the KUKL Customer Portal.</li>
              <li>Open the <strong>Billing</strong> section.</li>
              <li>Navigate to <strong>Payment History</strong> or <strong>Invoices</strong>.</li>
              <li>Select the billing period you want to view.</li>
              <li>Open the bill details.</li>
              <li>Download or print the statement if available.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">The portal may display:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Monthly bill</li>
              <li>Water consumption</li>
              <li>Sewerage charge</li>
              <li>Outstanding balance</li>
              <li>Payment history</li>
              <li>Invoice details</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Payment Receipt Using the KUKL Customer App</h3>
            <p className="text-gray-700 mb-4">The official KUKL Customer App allows customers to review completed payments.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">Open:</p>
            <p className="text-gray-700 font-medium mb-4">Billing → Payment History</p>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              From there you can review completed transactions and access available payment information for your account.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Receipt from eSewa</h3>
            <p className="text-gray-700 mb-4">If you paid using eSewa:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open the eSewa application.</li>
              <li>Go to <strong>Transaction History</strong>.</li>
              <li>Select the completed KUKL payment.</li>
              <li>Open the transaction details.</li>
              <li>Download or save the digital receipt.</li>
            </ol>
            <p className="text-gray-800 font-semibold mb-2 text-sm">The receipt normally includes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Transaction ID</li>
              <li>Payment date</li>
              <li>Payment amount</li>
              <li>Merchant information</li>
              <li>Payment status</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Receipt from Khalti</h3>
            <p className="text-gray-700 mb-4">Khalti also provides downloadable payment records.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm uppercase tracking-wide">Steps</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-5">
              <li>Open Khalti.</li>
              <li>Navigate to <strong>History</strong>.</li>
              <li>Select your completed KUKL payment.</li>
              <li>View the payment details.</li>
              <li>Save or download the receipt.</li>
            </ol>
            <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
              Keeping a copy of the receipt is recommended for future reference.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Receipt from Mobile Banking</h3>
            <p className="text-gray-700 mb-4">Most Nepali banks maintain digital payment records.</p>
            <p className="text-gray-800 font-semibold mb-2 text-sm">To retrieve your receipt:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm mb-4">
              <li>Log in to your mobile banking application.</li>
              <li>Open <strong>Transaction History</strong>.</li>
              <li>Locate the KUKL payment.</li>
              <li>View the transaction details.</li>
              <li>Download or save the receipt if your banking app supports it.</li>
            </ol>
            <p className="text-gray-600 text-sm">Some banks also allow customers to email the receipt directly.</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">What Information Is Included in a KUKL Bill Statement?</h3>
            <p className="text-gray-700 mb-4">A typical KUKL bill statement may include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                'Customer Name',
                'Customer Number',
                'Connection Number',
                'Branch Office',
                'Billing Period',
                'Water Consumption',
                'Water Charges',
                'Sewerage Charges',
                'Previous Balance',
                'Current Outstanding Amount',
                'Payment History'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-sm text-blue-900">
                  <span className="text-blue-500 font-bold">✓</span> {item}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm">The exact information displayed may vary depending on the service used.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <h3 className="text-base font-bold text-blue-900 mb-3">Why Download Your KUKL Bill or Receipt?</h3>
            <p className="text-blue-800 text-sm mb-3">Maintaining copies of your bills and payment receipts can help you:</p>
            <ul className="list-disc list-inside text-blue-900 text-sm space-y-1 mb-3">
              <li>Verify successful payment</li>
              <li>Track monthly water expenses</li>
              <li>Resolve billing discrepancies</li>
              <li>Maintain financial records</li>
              <li>Support rental or office documentation</li>
              <li>Reference previous billing periods</li>
            </ul>
            <p className="text-blue-800 font-semibold text-sm">Downloading receipts immediately after payment is considered good practice.</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-red-800 mb-3">⚠️ Unable to Download Your Statement?</h3>
            <p className="text-red-800 text-sm mb-3">If your bill statement or receipt is unavailable:</p>
            <ul className="list-disc list-inside text-red-900 text-sm space-y-1 mb-3">
              <li>Confirm that the payment has been completed successfully.</li>
              <li>Refresh your payment history.</li>
              <li>Check whether you&apos;re signed in to the correct account.</li>
              <li>Verify the selected billing period.</li>
              <li>Wait if the payment was completed only recently, as records may take some time to appear.</li>
            </ul>
            <p className="text-red-700 text-sm">If the issue continues, contact your payment provider or KUKL customer support.</p>
          </div>
        </section>

        {/* ── SECTION 8: Problems ── */}
        <section id="common-problems" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Common Problems</h2>
          
          <p className="text-gray-700 mb-8">
            While most KUKL bill payments are processed successfully, customers may occasionally experience issues such as payment failures, pending transactions, incorrect bill information, or difficulty retrieving their account. Understanding the common causes can help you resolve the problem quickly and avoid duplicate payments.
          </p>

          <div className="space-y-8 mb-10">
            {/* Problem 1 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">1. Payment Is Showing as Pending</h3>
              <p className="text-yellow-800 text-sm mb-3">A Pending status usually means the payment gateway or banking network is still processing your transaction.</p>
              <h4 className="font-semibold text-yellow-900 text-sm mb-2">What You Should Do</h4>
              <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1 mb-3">
                <li>Wait a few minutes and refresh your billing information.</li>
                <li>Check your transaction history in your banking app or digital wallet.</li>
                <li>Verify whether the payment amount has already been deducted.</li>
                <li className="font-bold">Do not make another payment while the transaction is still pending.</li>
              </ul>
              <p className="text-yellow-800 text-sm italic">If the payment remains pending for an extended period, contact your payment provider before attempting another transaction.</p>
            </div>

            {/* Problem 2 */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-red-900 mb-3">2. Payment Failed but Money Was Deducted</h3>
              <p className="text-red-800 text-sm mb-3">Sometimes the payment may fail due to network interruptions or banking server issues even though the payment amount has been deducted.</p>
              <h4 className="font-semibold text-red-900 text-sm mb-2">Recommended Steps</h4>
              <ul className="list-disc list-inside text-red-800 text-sm space-y-1 mb-3">
                <li>Save the transaction reference number.</li>
                <li>Check your payment status again after some time.</li>
                <li>Verify whether the bill is still outstanding.</li>
                <li>Contact your payment provider if the amount has not been credited to your KUKL account.</li>
              </ul>
              <p className="text-red-800 text-sm italic">Most failed transactions are either completed later or automatically refunded according to the payment provider&apos;s policies.</p>
            </div>

            {/* Problem 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Unable to Retrieve Your Bill</h3>
              <p className="text-gray-700 text-sm mb-3">If your bill cannot be fetched online, the issue is usually related to incorrect account information.</p>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Check the Following</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Customer/Connection Number is entered correctly.</li>
                <li>Correct KUKL branch has been selected.</li>
                <li>The water connection is active.</li>
                <li>The billing cycle has already been generated.</li>
                <li>There are no temporary service interruptions.</li>
              </ul>
              <p className="text-gray-600 text-sm italic">If everything appears correct but the bill still cannot be retrieved, contact your respective KUKL branch.</p>
            </div>

            {/* Problem 4 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Incorrect Bill Amount Displayed</h3>
              <p className="text-gray-700 text-sm mb-3">If the displayed amount appears different from what you expected:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Compare it with your previous bill.</li>
                <li>Check whether older unpaid balances have been carried forward.</li>
                <li>Verify the billing period.</li>
                <li>Confirm that you are viewing the correct water connection.</li>
              </ul>
              <p className="text-gray-600 text-sm italic">If you believe the amount is incorrect, avoid making assumptions and contact KUKL customer support for clarification.</p>
            </div>

            {/* Problem 5 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Payment Successful but Bill Still Appears Unpaid</h3>
              <p className="text-gray-700 text-sm mb-3">In some cases, billing systems require additional time to synchronize payment information.</p>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Before Reporting the Issue</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Refresh the customer portal.</li>
                <li>Log out and sign in again.</li>
                <li>Check your payment history.</li>
                <li>Wait for the payment system to complete synchronization.</li>
              </ul>
              <p className="text-gray-600 text-sm italic">If the bill continues to appear unpaid after a reasonable processing period, provide your transaction reference number when contacting customer support.</p>
            </div>

            {/* Problem 6 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Customer Number Not Working</h3>
              <p className="text-gray-700 text-sm mb-3">If your Customer Number returns an error:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Verify every digit carefully.</li>
                <li>Select the correct KUKL branch.</li>
                <li>Ensure you are using the latest Customer Number shown on your bill.</li>
                <li>Confirm that your connection is active.</li>
              </ul>
              <p className="text-gray-600 text-sm italic">Using the wrong branch with the correct Customer Number may also prevent your bill from loading.</p>
            </div>

            {/* Problem 7 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Digital Wallet or Banking App Error</h3>
              <p className="text-gray-700 text-sm mb-3">Occasionally, payment applications may display temporary service errors.</p>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Possible reasons include:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                <li>Internet connectivity issues</li>
                <li>Scheduled banking maintenance</li>
                <li>Payment gateway downtime</li>
                <li>Temporary server overload</li>
              </ul>
              <p className="text-gray-600 text-sm italic">Retry the transaction later instead of submitting multiple payment requests.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Best Practices Before Paying Your KUKL Bill</h3>
            <p className="text-blue-800 text-sm mb-3">To avoid payment issues:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                'Verify your Customer Number.',
                'Select the correct branch office.',
                'Review the outstanding amount before confirming payment.',
                'Keep your payment receipt after every successful transaction.',
                'Avoid duplicate payments if the first transaction is still processing.'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white border border-blue-100 rounded-lg px-4 py-2 text-sm text-blue-900 shadow-sm">
                  <span className="text-blue-500 font-bold">✓</span> {item}
                </div>
              ))}
            </div>
            <p className="text-blue-800 font-medium text-sm">These simple checks can prevent most common online payment problems.</p>
          </div>
        </section>

        {/* ── SECTION 10: FAQ ── */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          {/* Related Searches */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Searches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I pay KUKL bill without login?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes. Digital wallets like eSewa and Khalti, as well as most mobile banking applications, allow you to check and pay your outstanding KUKL bill directly using only your Customer Number and branch, without needing to create a portal account.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I pay KUKL bill from abroad?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes, as long as you have access to a Nepali digital wallet (like eSewa or Khalti) or a Nepali mobile banking app connected to your Nepali bank account, you can pay your KUKL bill from anywhere in the world.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">How long does payment update?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Most online payments are updated immediately. However, depending on network or server sync times, it may occasionally take a few hours for the balance to reflect as zero on the official portal.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I download old bills?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes, if you use the official KUKL Customer Portal, you can access your billing history and download previous bill statements and invoices from past billing cycles.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I pay multiple bills?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes. If you have outstanding bills from several past months, the payment platforms will usually aggregate the total due. You can pay the entire outstanding amount in a single transaction.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I pay through QR?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes, many branches and KUKL collection counters now support Fonepay QR. Additionally, Fonepay Bills inside your banking app allows direct KUKL payments without scanning a physical QR.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Can I check KUKL bill on mobile?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Yes. You can use the official KUKL Customer App available for Android and iOS, or check directly through the web portal or your preferred digital wallet app on your smartphone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT THIS GUIDE ── */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-black text-gray-900 mb-3">About this guide</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This guide is maintained by NepaCalc and reviewed periodically against official KUKL payment services and supported payment platforms. While payment methods may change over time, we update this guide whenever official procedures change.
          </p>
        </section>

        {/* ── NEXT STEP CTA ── */}
        <section className="mb-12 bg-blue-600 text-white rounded-xl p-6 md:p-10 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Need to calculate your monthly water bill before making a payment?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Use our KUKL Water Bill Calculator to estimate your bill based on the latest tariff rates, then return here to check your balance or pay online.
          </p>
          <Link href="/calculator/kukl-bill/" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow hover:bg-blue-50 transition-colors">
            Calculate KUKL Bill Now
          </Link>
        </section>

        {/* Internal Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide mb-4">Related Calculators</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator/kukl-bill/" className="text-blue-700 hover:underline font-medium">
                  → KUKL Water Bill Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator/nea-bill/" className="text-blue-700 hover:underline font-medium">
                  → NEA Bill Calculator
                </Link>
              </li>
              <li>
                <Link href="/electricity/nea-tariff-rates/" className="text-blue-700 hover:underline font-medium">
                  → NEA Tariff Rates
                </Link>
              </li>
              <li>
                <Link href="/electricity/nepal-unit-price/" className="text-blue-700 hover:underline font-medium">
                  → Electricity Unit Price
                </Link>
              </li>
              <li>
                <Link href="/market-rates/live-gold-price/" className="text-blue-700 hover:underline font-medium">
                  → Live Gold Price
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide mb-4">You May Also Like</h2>
            <ul className="space-y-2 text-sm text-blue-700 font-medium">
              <li><Link href="/electricity/nepal-unit-price/" className="hover:underline">→ Electricity Unit Price</Link></li>
            </ul>
          </div>
        </div>

      </article>
    </div>
  );
}
