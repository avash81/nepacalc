import type { Metadata } from 'next';
import Link from 'next/link';

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
  description:
    'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
  keywords: [
    'bluebook renewal nepal',
    'vehicle tax nepal',
    'bluebook renewal fee nepal',
    'bike bluebook renewal nepal',
    'nepal vehicle tax online',
    'bluebook renewal process nepal',
    'vehicle registration renewal nepal',
    'provincial vehicle tax nepal',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
    description:
      'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
    url: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
    siteName: 'NepaCalc',
    images: [
      {
        url: 'https://nepacalc.com/images/bluebook-renewal-nepal-process.webp',
        alt: 'Bluebook renewal process in Nepal showing province, vehicle tax, requirements, payment and registration renewal steps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
    description:
      'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
    images: ['https://nepacalc.com/images/bluebook-renewal-nepal-process.webp'],
  },
  alternates: {
    canonical: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
  },
};

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/#article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
    },
    headline: 'Bluebook Renewal in Nepal: Tax, Fees, Fine & Online Process',
    description:
      'Learn how Bluebook renewal works in Nepal, including vehicle tax, renewal fees, late charges, required documents, online payment, provincial rules and the renewal process.',
    author: {
      '@type': 'Organization',
      name: 'NepaCalc Editorial Team',
      url: 'https://nepacalc.com/about/editorial-policy/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NepaCalc',
    },
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    image: 'https://nepacalc.com/images/bluebook-renewal-nepal-process.webp',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://nepacalc.com/guide/bluebook-renewal-nepal/#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://nepacalc.com/guide/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bluebook Renewal in Nepal',
        item: 'https://nepacalc.com/guide/bluebook-renewal-nepal/',
      },
    ],
  },
];

// ─── SHARED STYLE CONSTANTS ───────────────────────────────────────────────────
const prose = 'text-slate-600 leading-relaxed';
const h2 = 'text-xl sm:text-2xl font-bold text-slate-900 mt-12 mb-4 scroll-mt-24';
const h3 = 'text-base sm:text-lg font-semibold text-slate-800 mt-6 mb-2';
const extLink = 'text-blue-600 hover:underline';
const intLink = 'text-emerald-700 font-medium hover:underline';

// ─── PROVINCE DATA ────────────────────────────────────────────────────────────
const provinces = [
  {
    name: 'Koshi Province',
    portal: 'https://edlvrs.koshi.gov.np/',
    portalLabel: 'Koshi EDL/VRS Portal',
    status: 'The Koshi provincial EDL/VRS portal provides the government entry point for vehicle registration, tax payment and ownership-transfer services.',
    verify: 'Verify the current Koshi provincial vehicle-tax schedule, your vehicle category, renewal status and the latest service instructions through the portal or the responsible Koshi Province transport office.',
  },
  {
    name: 'Madhesh Province',
    portal: 'https://edlvrs.madhesh.gov.np/',
    portalLabel: 'Madhesh EDL/VRS Portal',
    status: 'The Madhesh provincial EDL/VRS portal provides the government entry point for vehicle-registration, tax-payment and ownership-transfer functionality.',
    verify: "Verify the current Madhesh provincial tax schedule and service procedure before payment. A rate published for another province should not automatically be used for Madhesh.",
  },
  {
    name: 'Bagmati Province',
    portal: 'https://edlvrs.bagamati.gov.np/',
    portalLabel: 'Bagmati EDL/VRS Portal',
    status: "The Bagmati provincial EDL/VRS portal provides the government entry point for vehicle registration, tax payment and ownership transfer. Bagmati covers Kathmandu Valley and surrounding areas. Bagmati's vehicle-tax schedule is province-specific and should not be treated as the nationwide rate.",
    verify: 'Verify the current Bagmati provincial schedule and service availability through the portal or the relevant Bagmati Province transport office before payment.',
  },
  {
    name: 'Gandaki Province',
    portal: 'https://edlvrs.gandaki.gov.np/',
    portalLabel: 'Gandaki EDL/VRS Portal',
    status: 'The Gandaki provincial EDL/VRS portal provides the government entry point for vehicle-registration, tax-payment and ownership-transfer services. The applicable provincial legal framework, including the current economic legislation, determines the Gandaki vehicle-tax schedule.',
    verify: 'Check the current Gandaki provincial economic legislation and the relevant transport-office notices before payment.',
  },
  {
    name: 'Lumbini Province',
    portal: 'https://edlvrs.lumbini.gov.np/',
    portalLabel: 'Lumbini EDL/VRS Portal',
    status: 'The Lumbini provincial EDL/VRS portal provides the government entry point for vehicle registration and transport services. The current detailed service availability should be verified directly, as some specific online functions may still be in the rollout phase.',
    verify: 'Check current service status and the applicable Lumbini provincial tax schedule before relying on online payment for a complete Lumbini renewal.',
  },
  {
    name: 'Karnali Province',
    portal: 'https://edlvrs.karnali.gov.np/',
    portalLabel: 'Karnali EDL/VRS Portal',
    status: 'The Karnali provincial EDL/VRS portal provides the government entry point for vehicle-registration, tax-payment and ownership-transfer services.',
    verify: 'Verify the current Karnali provincial economic legislation and the latest transport-office instructions before calculating or paying vehicle tax.',
  },
  {
    name: 'Sudurpashchim Province',
    portal: 'https://edlvrs.sudurpashchim.gov.np/',
    portalLabel: 'Sudurpashchim EDL/VRS Portal',
    status: "The Sudurpashchim provincial EDL/VRS portal provides the government entry point at the portal level. As of the date this guide was last reviewed, the detailed VRS page for Sudurpashchim currently marks vehicle registration and tax payment as 'Coming Soon'. Service availability may change; always check the current portal status before attempting an online transaction.",
    verify: 'For Sudurpashchim, check current portal availability and contact the relevant provincial transport office to confirm the applicable process.',
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BluebookRenewalPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">

          {/* ── BREADCRUMB ── */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[13px] text-slate-500 mb-6">
            <Link href="/" className={extLink}>Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/guide/" className={extLink}>Guide</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">Bluebook Renewal in Nepal</span>
          </nav>

          {/* ── META BAR ── */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-slate-500">
            <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Transport Guide · Nepal
            </span>
            <span>By <Link href="/about/editorial-policy/" className={extLink}>NepaCalc Editorial Team</Link></span>
            <span>·</span>
            <span>Last reviewed: 6 September 2026</span>
          </div>

          {/* ── H1 ── */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Bluebook Renewal in Nepal
          </h1>

          {/* ── WHAT THIS PAGE DOES / DOESN'T DO ── */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 mb-8 text-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-slate-900 mb-2">What this guide covers</p>
                <ul className="space-y-1 text-slate-600">
                  {[
                    'Bluebook and vehicle registration',
                    'Vehicle tax and renewal fees',
                    'Late renewal and overdue cases',
                    'Required documents and insurance',
                    'Province-by-province system map',
                    'Online payment and its limits',
                    'Vehicle-category differences',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-2">What this guide does not do</p>
                <ul className="space-y-1 text-slate-600">
                  {[
                    'Issue or renew a government certificate',
                    'Determine the legally final payable amount',
                    'Replace a transport-office decision',
                    'Guarantee online services in every province',
                    'Publish current tax tables (use gov source)',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">✗</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── FIND YOUR SITUATION ── */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 mb-8">
            <p className="font-bold text-slate-900 mb-3 text-sm">What are you trying to do?</p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                { label: 'I want to calculate my vehicle tax', href: '/calculator/nepal-vehicle-tax/', ext: true },
                { label: 'I want to renew a bike or scooter', href: '#bike', ext: false },
                { label: 'I want to renew a car or jeep', href: '#car', ext: false },
                { label: 'My Bluebook is expired or overdue', href: '#late-renewal', ext: false },
                { label: 'I want to pay vehicle tax online', href: '#online', ext: false },
                { label: 'I have an electric vehicle', href: '#ev', ext: false },
                { label: 'I need the government source', href: '#sources', ext: false },
              ].map(({ label, href, ext }) =>
                ext ? (
                  <Link key={label} href={href} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-emerald-200 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors">
                    <span>→</span>{label}
                  </Link>
                ) : (
                  <a key={label} href={href} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-emerald-200 text-slate-700 hover:bg-emerald-100 transition-colors">
                    <span className="text-emerald-500">↓</span>{label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* ── QUICK ANSWER ── */}
          <section id="quick-answer" className="scroll-mt-24">
            <h2 className={h2}>Quick Answer</h2>
            <p className={prose}>
              In Nepal, the Bluebook is the common name for a vehicle&apos;s registration certificate. Renewing it
              means completing the applicable requirements to keep that certificate valid. The total amount and process
              depend on the vehicle, the province, the renewal status and any other requirements such as insurance.
              There is no single nationwide vehicle-tax rate or renewal fee. Vehicle taxation is administered through
              each province&apos;s legal framework, while national law provides the registration and renewal structure.
              The applicable government authority determines the final legally correct amount.
            </p>

            {/* At a glance table */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Question</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Answer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['What is a Bluebook?', 'Vehicle registration certificate'],
                    ['What is renewal?', "Renewal of the vehicle's registration"],
                    ['Is vehicle tax the same thing?', 'No'],
                    ['Does tax vary by province?', 'Yes'],
                    ['Is insurance relevant?', 'Yes, where required'],
                    ['Can everything be done online?', 'Depends on province/service availability'],
                    ['Where is the final amount confirmed?', 'Applicable government authority'],
                  ].map(([q, a]) => (
                    <tr key={q} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">{q}</td>
                      <td className="px-4 py-3 text-slate-600">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Early calculator CTA */}
            <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-slate-700 flex-1">
                Need to estimate your vehicle-tax liability? Use the{' '}
                <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>NepaCalc Vehicle Tax Calculator</Link>,
                then verify the final amount against the applicable provincial government schedule.
              </p>
              <Link
                href="/calculator/nepal-vehicle-tax/"
                className="flex-shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Calculate →
              </Link>
            </div>
          </section>

          {/* ── TABLE OF CONTENTS ── */}
          <nav aria-label="Table of contents" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">On this page</h2>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
              {[
                ['#quick-answer', 'Quick Answer'],
                ['#what-is-bluebook', 'What Is a Bluebook?'],
                ['#what-renewal-means', 'What Does Bluebook Renewal Mean?'],
                ['#tax-vs-renewal', 'Bluebook Renewal vs Vehicle Tax'],
                ['#who-sets-tax', 'Who Sets Vehicle Tax in Nepal?'],
                ['#province-guide', "Bluebook Renewal Across Nepal's Seven Provinces"],
                ['#when-to-renew', 'When Should You Renew?'],
                ['#late-renewal', 'What Happens When Renewal Is Late?'],
                ['#documents', 'Documents and Requirements'],
                ['#insurance', 'Insurance and Pollution Requirements'],
                ['#online', 'Online Vehicle Tax and Renewal'],
                ['#bike', 'Motorcycle and Scooter Renewal'],
                ['#car', 'Car and Jeep Renewal'],
                ['#ev', 'Electric Vehicle Renewal'],
                ['#commercial', 'Public and Commercial Vehicles'],
                ['#calculate', 'How to Estimate the Cost'],
                ['#mistakes', 'Common Mistakes'],
                ['#faq', 'Frequently Asked Questions'],
                ['#sources', 'Official Sources & Verification'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-blue-600 hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ── IMPORTANT NOTE ── */}
          <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <strong>Independent guide:</strong> NepaCalc is an independent information and calculation platform, not
            a government transport office. This guide is based on published national laws and government-published
            sources. Tax schedules, fees, penalties, online services and office procedures can change. Verify the
            final amount and current requirements with the relevant government authority before payment.{' '}
            <Link href="/data-policy/" className="underline">Data Sources &amp; Methodology</Link>
          </div>

          {/* ── WHAT IS A BLUEBOOK ── */}
          <section id="what-is-bluebook" className="scroll-mt-24">
            <h2 className={h2}>What Is a Bluebook?</h2>
            <p className={prose}>
              The Bluebook is the commonly used name for a vehicle&apos;s registration certificate. An official
              Department of Transport Management resource describes it as a certificate containing the description of
              the vehicle.
            </p>
            <p className={`${prose} mt-3`}>
              The Bluebook is not the same as:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>a driver&apos;s licence (which belongs to the driver, not the vehicle);</li>
              <li>vehicle insurance;</li>
              <li>vehicle tax or road tax;</li>
              <li>a route permit (for applicable public or hired vehicles);</li>
              <li>a pollution or emissions certificate; or</li>
              <li>an ownership-transfer document.</li>
            </ul>
            <p className={`${prose} mt-3`}>
              These are connected during vehicle administration and renewal, but each is a separate document or
              obligation.
            </p>
          </section>

          {/* ── WHAT RENEWAL MEANS ── */}
          <section id="what-renewal-means" className="scroll-mt-24">
            <h2 className={h2}>What Does Bluebook Renewal Mean?</h2>
            <p className={prose}>
              Bluebook renewal means renewing the validity of the vehicle registration certificate after it expires.
              Under the national{' '}
              <a href="https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/statutes-acts/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Motor Vehicles and Transport Management Act
              </a>
              , registration certificates must be renewed through the prescribed application and payment process.
              Section 31 of the Act addresses registration-certificate renewal, while Sections 33–35 address
              multi-year renewal, cancellation and re-registration.
            </p>
            <p className={`${prose} mt-3`}>
              The practical process differs between provinces because vehicle tax and transport-service administration
              operate within each province&apos;s own legal framework. An instruction, tax amount or online procedure
              verified for one province may not apply to another.
            </p>
          </section>

          {/* ── TAX VS RENEWAL ── */}
          <section id="tax-vs-renewal" className="scroll-mt-24">
            <h2 className={h2}>Bluebook Renewal vs Vehicle Tax</h2>
            <p className={prose}>
              This distinction is a frequent source of confusion. Bluebook renewal and vehicle tax are not the same
              thing, although they are often handled during the same transaction.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Item</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">What it relates to</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Usually handled during renewal?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Bluebook', 'Vehicle registration certificate', 'Yes — the document being renewed'],
                    ['Vehicle tax', 'Provincial vehicle-tax obligation', 'Often — as a renewal prerequisite'],
                    ['Renewal fee', 'Registration renewal administration charge', 'Yes'],
                    ['Insurance', 'Required vehicle insurance (per national law)', 'Relevant prerequisite'],
                    ['Pollution certificate', 'Emissions/vehicle requirement where applicable', 'Where required'],
                    ['Route permit', 'Transport authorisation for public/hired vehicles', 'Where applicable'],
                  ].map(([item, what, when]) => (
                    <tr key={item} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{item}</td>
                      <td className="px-4 py-3 text-slate-600">{what}</td>
                      <td className="px-4 py-3 text-slate-600">{when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={h3}>Vehicle tax</h3>
            <p className={prose}>
              Vehicle tax is the recurring tax applicable to a registered vehicle under the relevant provincial law.
              Depending on the vehicle and province, the tax schedule can be based on engine capacity, motor power,
              seating capacity, carrying capacity, vehicle type or another applicable specification.
            </p>

            <h3 className={h3}>Renewal fee</h3>
            <p className={prose}>
              This is the charge associated with renewing the registration certificate itself, separate from the
              vehicle-tax amount. Check the applicable government source for the current renewal-fee schedule.
            </p>

            <h3 className={h3}>Insurance</h3>
            <p className={prose}>
              The Motor Vehicles and Transport Management Act provides that required insurance must be obtained and
              that a registration certificate will not be renewed without it. Insurance is therefore a legal
              prerequisite, not an optional cost. The{' '}
              <a href="https://nia.gov.np/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Nepal Insurance Authority
              </a>{' '}
              is the current regulatory body for vehicle insurance in Nepal and publishes relevant insurance
              circulars. Insurance premiums are separate from the provincial vehicle-tax amount.
            </p>

            <h3 className={h3}>Pollution certification</h3>
            <p className={prose}>
              The{' '}
              <a href="https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/rules-and-regulations/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Motor Vehicles and Transport Management Rules
              </a>{' '}
              include pollution-related information for applicable vehicles within the renewal-documentation framework.
              Where applicable rules require a pollution certificate, this must be available for renewal. Requirements
              depend on vehicle type, age, fuel type and current transport-office procedure.
            </p>

            <h3 className={h3}>Route permit</h3>
            <p className={prose}>
              A route permit is a separate transport authorisation for public or hired vehicles. It is not a Bluebook.
              Renewing a Bluebook does not renew a route permit. The Transport Management Rules include route-permit
              information for applicable vehicles within the renewal-documentation framework.
            </p>
          </section>

          {/* ── WHO SETS VEHICLE TAX ── */}
          <section id="who-sets-tax" className="scroll-mt-24">
            <h2 className={h2}>Who Sets Vehicle Tax in Nepal?</h2>
            <p className={prose}>
              Vehicle tax is administered within Nepal&apos;s seven provinces, each of which has its own applicable
              provincial economic legislation and transport-service framework. The{' '}
              <a href="https://www.dotm.gov.np/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Department of Transport Management
              </a>{' '}
              provides transport-office references, tax-rate circulars and provincial economic-law references
              including separate legal schedules for each province.
            </p>
            <p className={`${prose} mt-3`}>
              This means that asking &ldquo;how much is vehicle tax in Nepal?&rdquo; without specifying the province
              and vehicle category is not a complete question. The correct question is:
            </p>
            <blockquote className="border-l-4 border-emerald-400 pl-4 my-4 text-slate-700 font-medium italic">
              What is the current vehicle tax and renewal requirement for my vehicle under the applicable province
              and vehicle category?
            </blockquote>
            <p className={prose}>
              A rate published for Bagmati Province should not automatically be presented as the rate for all of
              Nepal. The existing NepaCalc{' '}
              <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>Vehicle Tax Calculator</Link> is
              explicitly Bagmati-based for its current calculation tables.
            </p>
          </section>

          {/* ── PROVINCE GUIDE ── */}
          <section id="province-guide" className="scroll-mt-24">
            <h2 className={h2}>Bluebook Renewal Across Nepal&apos;s Seven Provinces</h2>
            <p className={prose}>
              Each of Nepal&apos;s seven provinces has its own vehicle-registration system, tax authority and online
              service arrangements. The table below provides the government entry point for each province.
              Government portal status was checked as of 6 September 2026.
            </p>

            {/* Province comparison table */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 mb-8">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Province</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Government vehicle-system entry point</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Tax verification</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Online availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {provinces.map(({ name, portal, portalLabel }) => (
                    <tr key={name} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{name}</td>
                      <td className="px-4 py-3">
                        <a href={portal} target="_blank" rel="noopener noreferrer" className={extLink}>{portalLabel}</a>
                      </td>
                      <td className="px-4 py-3 text-slate-600">Check current provincial schedule</td>
                      <td className="px-4 py-3 text-slate-600">Verify current status</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Individual province blocks */}
            {provinces.map(({ name, portal, portalLabel, status, verify }) => (
              <div key={name} className="mt-6 scroll-mt-24" id={name.toLowerCase().replace(/\s+/g, '-')}>
                <h3 className={h3}>{name}</h3>
                <p className={prose}>{status}</p>
                <p className={`${prose} mt-2`}>{verify}</p>
                <p className="mt-2 text-sm">
                  <a href={portal} target="_blank" rel="noopener noreferrer" className={extLink}>
                    Open {portalLabel} →
                  </a>
                </p>
              </div>
            ))}

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              <strong>Important:</strong> A portal existing at the province level does not guarantee that every
              vehicle transaction can currently be completed entirely online. Service rollout is ongoing. Always
              verify current availability with the relevant provincial transport office.
            </div>
          </section>

          {/* ── WHAT CHANGES BY PROVINCE ── */}
          <section id="what-changes-by-province" className="scroll-mt-24">
            <h2 className={h2}>What Changes by Province?</h2>
            <p className={prose}>Provincial differences may affect:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>vehicle-tax rates and the applicable category classification;</li>
              <li>additional provincial charges beyond the basic tax;</li>
              <li>online service availability and the extent of digital renewal;</li>
              <li>payment workflows and accepted payment methods;</li>
              <li>any concessions, waivers or special notices in effect; and</li>
              <li>transport-office procedures and processing times.</li>
            </ul>
            <p className={`${prose} mt-3`}>What does not change by province:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>the basic concept of vehicle registration and renewal;</li>
              <li>the national legal framework (Motor Vehicles and Transport Management Act);</li>
              <li>the distinction between a Bluebook and a driving licence; and</li>
              <li>the requirement to comply with applicable law regardless of province.</li>
            </ul>
          </section>

          {/* ── WHAT CHANGES BY VEHICLE ── */}
          <section id="what-changes-by-vehicle" className="scroll-mt-24">
            <h2 className={h2}>What Changes by Vehicle?</h2>
            <p className={prose}>
              Vehicle category substantially affects the applicable tax and requirements:
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[
                { cat: 'Motorcycle / scooter', note: 'Engine capacity (CC) is typically the primary classification factor for provincial tax.' },
                { cat: 'Private car / jeep', note: 'Vehicle type, engine capacity or another applicable provincial classification determines the tax.' },
                { cat: 'Electric vehicle', note: 'EV annual road tax and EV import taxation are completely different obligations. Provincial EV tax classifications may differ.' },
                { cat: 'Public / commercial', note: 'Route permits, passenger or load capacity, and additional transport requirements apply. Not comparable to private-vehicle renewal.' },
              ].map(({ cat, note }) => (
                <div key={cat} className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900 text-sm mb-1">{cat}</p>
                  <p className="text-slate-600 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHEN TO RENEW ── */}
          <section id="when-to-renew" className="scroll-mt-24">
            <h2 className={h2}>When Should You Renew?</h2>
            <p className={prose}>
              The safest approach is to renew before the registration certificate expires. The national Motor
              Vehicles and Transport Management Act provides a period after expiry within which renewal can still
              proceed before delayed-renewal provisions apply. However, this should not be read as a recommendation
              to wait until after expiry. Renewing before expiry avoids:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>late charges and penalties;</li>
              <li>additional paperwork and documentation requirements;</li>
              <li>service delays at transport offices;</li>
              <li>potential insurance complications; and</li>
              <li>uncertainty about the exact amount due.</li>
            </ul>
          </section>

          {/* ── LATE RENEWAL ── */}
          <section id="late-renewal" className="scroll-mt-24">
            <h2 className={h2}>What Happens When Renewal Is Late?</h2>
            <p className={prose}>
              This area requires careful distinction between two separate legal frameworks.
            </p>

            <h3 className={h3}>National registration-renewal law</h3>
            <p className={prose}>
              The{' '}
              <a href="https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/statutes-acts/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Motor Vehicles and Transport Management Act
              </a>{' '}
              provides a period after a certificate&apos;s stated validity for renewal before delayed-renewal
              provisions apply. The Act specifies escalating additional charges for delayed renewal depending on
              the length of delay, and contains provisions for eventual cancellation and re-registration where a
              vehicle remains unrenewed for an extended period.
            </p>

            <h3 className={h3}>Provincial vehicle-tax late-payment rules</h3>
            <p className={prose}>
              Provincial economic legislation and transport rules may separately specify the treatment of late
              vehicle-tax payments. These are different from the national registration-renewal law. A calculator
              that describes a specific province&apos;s late-payment penalty is describing that province&apos;s
              tax law, not necessarily a nationwide rule.
            </p>

            <h3 className={h3}>Long-overdue or cancelled registrations</h3>
            <p className={prose}>
              There is an important legal difference between a registration that is slightly overdue and one that
              has remained unrenewed long enough to reach statutory cancellation. A vehicle owner should not assume
              that a long-overdue vehicle can simply be renewed by multiplying one year&apos;s tax by the number of
              missed years. The Act contains distinct provisions for cancellation and re-registration. Owners of
              long-overdue vehicles should contact the relevant transport authority rather than relying on a
              generic online estimate.
            </p>
          </section>

          {/* ── DOCUMENTS ── */}
          <section id="documents" className="scroll-mt-24">
            <h2 className={h2}>Documents and Requirements</h2>
            <p className={prose}>
              Rule 8 of the{' '}
              <a href="https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/rules-and-regulations/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Motor Vehicles and Transport Management Rules
              </a>{' '}
              addresses renewal of the registration certificate, and Schedule 11 of the Rules specifies the
              information submitted with a renewal application, including vehicle registration details, owner
              information, expiry, tax evidence, route-permit details for hired vehicles, and pollution information
              where applicable.
            </p>
            <p className={`${prose} mt-3`}>
              Requirements vary by vehicle, transaction and current office procedure. Commonly relevant items include:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>original Bluebook/registration certificate;</li>
              <li>vehicle-tax payment evidence;</li>
              <li>valid required insurance certificate;</li>
              <li>pollution certificate where applicable;</li>
              <li>route permit for applicable public or hired vehicles;</li>
              <li>ownership or identification documents where required;</li>
              <li>payment receipts; and</li>
              <li>any other documents specified by the relevant transport office.</li>
            </ul>
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              The checklist above reflects the general legal framework. Always check the current notice from the
              relevant transport authority before visiting. Office requirements and procedures can change.
            </div>
          </section>

          {/* ── INSURANCE AND POLLUTION ── */}
          <section id="insurance" className="scroll-mt-24">
            <h2 className={h2}>Insurance and Pollution Requirements</h2>

            <h3 className={h3}>Insurance</h3>
            <p className={prose}>
              The Motor Vehicles and Transport Management Act provides that required insurance must be obtained and
              that registration renewal cannot proceed without it. The{' '}
              <a href="https://nia.gov.np/" target="_blank" rel="noopener noreferrer" className={extLink}>
                Nepal Insurance Authority
              </a>{' '}
              is the current regulatory body and publishes applicable insurance circulars including third-party
              vehicle insurance requirements. Insurance premiums are separate from provincial vehicle tax and
              from the renewal fee. Do not publish fixed insurance amounts without verifying against a current
              Nepal Insurance Authority circular or applicable insurer schedule.
            </p>

            <h3 className={h3}>Pollution certification</h3>
            <p className={prose}>
              Where the applicable rules require pollution testing or certification, the relevant certificate must
              be available for renewal. Requirements depend on vehicle type, age, fuel type and current
              transport-office procedure. Check the current requirements from the relevant transport authority.
            </p>
          </section>

          {/* ── ONLINE ── */}
          <section id="online" className="scroll-mt-24">
            <h2 className={h2}>Online Vehicle Tax and Renewal</h2>
            <p className={prose}>
              Online vehicle-registration and tax-payment systems are being deployed through provincial government
              systems, but the services available and the extent to which a transaction can be completed online
              vary by province and may change.
            </p>
            <p className={`${prose} mt-3`}>
              Do not assume that online tax payment automatically means the entire Bluebook-renewal process is
              complete. Some provinces currently provide full digital workflows; others have systems where tax
              payment can be initiated online but certain steps still require transport-office processing.
            </p>
            <p className={`${prose} mt-3`}>
              As of this guide&apos;s last review (6 September 2026), the Sudurpashchim provincial VRS page
              marks vehicle registration and tax payment as &ldquo;Coming Soon.&rdquo; The Lumbini provincial VRS
              page similarly shows some functions as still being introduced. Both portals exist at the entry level
              but detailed service availability is not yet uniform.
            </p>
            <p className={`${prose} mt-3`}>
              Always check the applicable provincial portal directly and confirm with the transport office before
              relying on an online transaction as the complete renewal.
            </p>
          </section>

          {/* ── BIKE ── */}
          <section id="bike" className="scroll-mt-24">
            <h2 className={h2}>Motorcycle and Scooter Renewal</h2>
            <p className={prose}>
              Motorcycle and scooter owners should confirm:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>the applicable province;</li>
              <li>engine capacity (CC) — this is typically the primary classification factor;</li>
              <li>private or commercial classification;</li>
              <li>the current applicable provincial vehicle-tax schedule;</li>
              <li>the renewal fee for the applicable category;</li>
              <li>required insurance status;</li>
              <li>pollution requirements where applicable;</li>
              <li>renewal status (current, slightly overdue, or significantly overdue); and</li>
              <li>any applicable late charges.</li>
            </ul>
            <p className={`${prose} mt-3`}>
              A 125cc motorcycle and a 200cc motorcycle do not automatically have the same renewal liability. A
              rate published for one province should not be applied to another.
            </p>
          </section>

          {/* ── CAR ── */}
          <section id="car" className="scroll-mt-24">
            <h2 className={h2}>Car and Jeep Renewal</h2>
            <p className={prose}>
              Private car and jeep renewal costs depend on the applicable provincial vehicle-tax schedule and
              the vehicle&apos;s classification. Before payment, confirm:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>provincial vehicle tax for the applicable vehicle category;</li>
              <li>registration renewal charge;</li>
              <li>required insurance;</li>
              <li>pollution or inspection requirements where applicable;</li>
              <li>late charges if applicable; and</li>
              <li>any other prescribed fees.</li>
            </ul>
            <p className={`${prose} mt-3`}>
              Do not use a generic national car-tax figure when the applicable province uses a different schedule.
            </p>
          </section>

          {/* ── EV ── */}
          <section id="ev" className="scroll-mt-24">
            <h2 className={h2}>Electric Vehicle Renewal</h2>
            <p className={prose}>
              Electric vehicles require particular attention because several different charges are frequently
              confused:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600">
              <li>
                <strong className="text-slate-800">Annual vehicle tax</strong> — the recurring annual tax for a
                registered EV. This is determined by the applicable provincial schedule, typically based on motor
                power (kW) rather than engine capacity.
              </li>
              <li>
                <strong className="text-slate-800">EV import taxation</strong> — a one-time charge when the
                vehicle enters Nepal. Includes customs duty and other applicable import charges. This is entirely
                separate from the annual renewal tax.
              </li>
              <li>
                <strong className="text-slate-800">Registration and renewal</strong> — keeping the vehicle
                registration certificate valid, subject to the same general renewal framework as other vehicles.
              </li>
            </ul>
            <p className={`${prose} mt-3`}>
              A statement such as &ldquo;EV tax in Nepal is Rs. X&rdquo; is incomplete without specifying which
              charge, which province, which vehicle classification and which legal schedule applies.
            </p>
          </section>

          {/* ── COMMERCIAL ── */}
          <section id="commercial" className="scroll-mt-24">
            <h2 className={h2}>Public and Commercial Vehicles</h2>
            <p className={prose}>
              Public and commercial vehicles have additional regulatory requirements beyond private-vehicle renewal.
              Depending on the vehicle and service, these may include: route permits; passenger or carrying-capacity
              classifications; higher insurance requirements; additional inspection or certification; and
              other transport-management documents. The renewal framework for a private car does not describe
              the requirements for a public bus, taxi, truck or other commercial vehicle. Check the applicable
              transport authority for current requirements.
            </p>
          </section>

          {/* ── HOW TO ESTIMATE ── */}
          <section id="calculate" className="scroll-mt-24">
            <h2 className={h2}>How to Estimate the Cost</h2>
            <p className={prose}>
              The total amount payable during a renewal transaction is not a single nationwide figure. Think of
              it as:
            </p>
            <div className="my-4 rounded-xl bg-slate-50 border border-slate-200 p-4 font-mono text-sm text-slate-700">
              Total = vehicle tax (provincial) + renewal fee + required insurance + applicable certification
              charges + late charges (if any) + other prescribed fees
            </div>
            <p className={prose}>
              Each component depends on the vehicle and applicable provincial rules. The government assessment
              or receipt is the final authority.
            </p>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">Want to estimate your vehicle-tax amount?</p>
                <p className="text-slate-600 text-sm mt-1">
                  Use the{' '}
                  <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>NepaCalc Vehicle Tax Calculator</Link>
                  {' '}for an estimate. The calculator is a calculation tool — the applicable government schedule
                  and transport authority determine the final legally correct amount.
                </p>
              </div>
              <Link
                href="/calculator/nepal-vehicle-tax/"
                className="flex-shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Calculate Vehicle Tax →
              </Link>
            </div>
          </section>

          {/* ── BEFORE YOU PAY ── */}
          <section id="before-you-pay" className="scroll-mt-24">
            <h2 className={h2}>Before You Pay — Checklist</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <ul className="space-y-2">
                {[
                  'Identify the province and applicable provincial vehicle-tax schedule',
                  'Confirm vehicle category (bike, car, EV, commercial)',
                  'Confirm engine capacity (CC), motor power (kW) or other applicable specification',
                  'Check renewal status — current, recently expired, or significantly overdue',
                  'Confirm required insurance is valid',
                  'Check pollution certification requirements where applicable',
                  'Check route-permit requirements for commercial/public vehicles',
                  'Check for any current government notices, waivers or special procedures',
                  'Verify the total amount with the applicable government source before payment',
                  'Keep the government payment receipt and any digital confirmation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 w-5 h-5 rounded border-2 border-slate-300 flex-shrink-0 inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── COMMON MISTAKES ── */}
          <section id="mistakes" className="scroll-mt-24">
            <h2 className={h2}>What Users Should Not Assume</h2>
            <div className="mt-4 space-y-3">
              {[
                ['A Bagmati rate applies nationwide', 'Bagmati is one province. Its tax schedule is province-specific.'],
                ['An old blog table is the current rate', 'Provincial tax schedules can change through annual economic legislation.'],
                ['Vehicle tax equals total renewal cost', 'Tax, renewal fee, insurance and other charges are separate.'],
                ['Online tax payment means renewal is complete', 'Some steps may still require transport-office processing depending on the province.'],
                ['Every province has the same digital service', 'Online availability varies and is still being rolled out in some provinces.'],
                ['A long-overdue vehicle can be calculated as (tax × years)', 'Prolonged non-renewal can eventually involve cancellation and re-registration law, not ordinary late fees.'],
                ['EV import tax equals EV annual road tax', 'These are completely different charges at different stages of vehicle ownership.'],
                ['The same documents apply to every vehicle and province', 'Requirements vary by vehicle category and current office procedure.'],
              ].map(([mistake, why]) => (
                <div key={mistake} className="border-l-4 border-rose-200 pl-4 py-1">
                  <p className="font-semibold text-slate-900 text-sm">Do not assume: {mistake}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="scroll-mt-24">
            <h2 className={h2}>Frequently Asked Questions</h2>
            <div className="space-y-6 mt-4">
              {[
                {
                  q: 'What is Bluebook renewal in Nepal?',
                  a: "Bluebook renewal is the process of renewing a vehicle's registration certificate and completing applicable tax, fee, insurance and other requirements to keep the registration valid.",
                },
                {
                  q: 'Is Bluebook renewal the same as vehicle tax?',
                  a: 'No. Vehicle tax is a recurring provincial tax obligation. Renewal refers to the registration-certificate process. They can be handled in the same transaction but are legally separate.',
                },
                {
                  q: 'Does vehicle tax differ by province in Nepal?',
                  a: "Yes. Each of Nepal's seven provinces administers vehicle taxation through its own applicable legal schedule.",
                },
                {
                  q: 'How much does Bluebook renewal cost in Nepal?',
                  a: 'There is no single nationwide amount. The total depends on the province, vehicle category, applicable tax, renewal fee, insurance, certification requirements and any late charges.',
                },
                {
                  q: 'Can I pay vehicle tax online in Nepal?',
                  a: 'In some provinces, yes. Online vehicle-tax and registration systems are operational or being rolled out through provincial government portals, but current availability varies.',
                },
                {
                  q: 'Can I completely renew my Bluebook online?',
                  a: 'Not always. Online tax payment does not automatically mean every step is complete. Some provinces may require additional office processing for registration to be fully renewed.',
                },
                {
                  q: 'Is insurance required for Bluebook renewal?',
                  a: 'The Motor Vehicles and Transport Management Act provides that required insurance must be in place and that registration renewal cannot proceed without it.',
                },
                {
                  q: 'Is a pollution certificate required for renewal?',
                  a: 'Where applicable rules require pollution certification, the relevant certificate must be available for renewal. This depends on vehicle type, age, fuel type and current procedure.',
                },
                {
                  q: 'What happens if my Bluebook renewal is late?',
                  a: 'Additional charges apply under both national registration-renewal law and potentially provincial tax-law provisions. Prolonged non-renewal can eventually lead to cancellation consequences under national law. These are two separate legal frameworks.',
                },
                {
                  q: 'Can I renew my Bluebook for multiple years?',
                  a: 'The Motor Vehicles and Transport Management Act provides a multi-year renewal provision for eligible vehicle categories, including private vehicles under applicable conditions, for up to five years. Confirm the current procedure with the responsible transport authority.',
                },
                {
                  q: 'Is Bluebook renewal the same as driving licence renewal?',
                  a: 'No. A Bluebook concerns vehicle registration. A driving licence concerns the driver. These are separate documents under the transport-management framework.',
                },
                {
                  q: 'Is Bluebook renewal the same as route-permit renewal?',
                  a: 'No. A route permit is a separate transport authorisation relevant to public or hired vehicles.',
                },
                {
                  q: 'Who is the insurance regulator in Nepal?',
                  a: 'The Nepal Insurance Authority (NIA) is the current regulatory body for vehicle insurance in Nepal and publishes applicable insurance circulars.',
                },
                {
                  q: 'Where should I verify the final renewal amount?',
                  a: 'Check the latest applicable provincial government schedule and the relevant Transport Management Office. A calculator provides an estimate; the government assessment or receipt is the final authority.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-slate-100 pb-5">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-2">{q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── IN BRIEF ── */}
          <section className="mt-10 rounded-2xl bg-slate-900 text-white p-6">
            <h2 className="text-lg font-bold mb-3">In Brief</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Bluebook renewal is a vehicle-registration renewal process. The national vehicle law provides the registration framework, while provincial rules determine vehicle-tax
              obligations and many practical service arrangements. The exact amount depends on the vehicle, province
              and renewal status. Use the current government source for the final legal amount and service
              requirements, and use the{' '}
              <Link href="/calculator/nepal-vehicle-tax/" className="text-emerald-400 hover:underline font-medium">
                NepaCalc Vehicle Tax Calculator
              </Link>{' '}
              when you need an estimate.
            </p>
          </section>

          {/* ── OFFICIAL SOURCES ── */}
          <section id="sources" className="scroll-mt-24">
            <h2 className={h2}>Official Sources &amp; Verification</h2>
            <p className={`${prose} mb-4`}>
              For legal and procedural accuracy, use the following source hierarchy.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Source</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">What it is used to verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      source: 'Nepal Law Commission — Motor Vehicles and Transport Management Act',
                      url: 'https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/statutes-acts/',
                      what: 'National registration and renewal law, delayed-renewal provisions, multi-year renewal, cancellation and re-registration',
                    },
                    {
                      source: 'Nepal Law Commission — Transport Management Rules',
                      url: 'https://repository.lawcommission.gov.np/np/category/documents/prevailing-law/rules-and-regulations/',
                      what: 'Renewal procedure, documentation framework, pollution and route-permit documentation requirements',
                    },
                    {
                      source: 'Department of Transport Management',
                      url: 'https://www.dotm.gov.np/',
                      what: 'Transport-office network, tax-rate circulars, provincial law references, government transport notices',
                    },
                    {
                      source: 'Provincial governments (all seven)',
                      url: '#province-guide',
                      what: 'Current vehicle-tax schedule, provincial legal framework, online service availability',
                    },
                    {
                      source: 'Provincial EDL/VRS portals',
                      url: '#province-guide',
                      what: 'Current online vehicle-service availability and registration/tax-payment workflow',
                    },
                    {
                      source: 'Nepal Insurance Authority',
                      url: 'https://nia.gov.np/',
                      what: 'Vehicle insurance regulatory requirements, applicable insurance circulars',
                    },
                  ].map(({ source, url, what }) => (
                    <tr key={source} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        {url.startsWith('http') ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" className={extLink}>{source}</a>
                        ) : (
                          <a href={url} className={extLink}>{source}</a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── MORE NEPAL TOOLS ── */}
          <div className="mt-10 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-sm">
            <p className="font-semibold text-slate-900 mb-2">More Nepal-specific tools</p>
            <p className="text-slate-600">
              Explore more Nepal-specific calculators and tools in our{' '}
              <Link href="/nepal/" className={intLink}>Nepal Calculators</Link> section.
            </p>
          </div>

          {/* ── EDITORIAL METHODOLOGY ── */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-bold text-slate-900 text-base mb-3">How We Research This Guide</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We separate national vehicle-registration rules from provincial vehicle-tax and transport-service requirements. National legal claims are checked against Nepal's published vehicle and transport laws and rules. Province-specific information is checked against government-published sources where available. When a tax amount or online service is subject to change, we identify the applicable authority rather than presenting an old amount as a permanent nationwide rule.
            </p>
            <p className="text-slate-500 text-xs mt-3">
              <Link href="/data-policy/" className="hover:underline">Data Sources &amp; Methodology</Link>
              {' '}·{' '}
              <Link href="/about/editorial-policy/" className="hover:underline">NepaCalc Editorial Policy</Link>
            </p>
          </section>

          {/* ── EDITORIAL NOTE ── */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900 mb-2">Editorial Note</p>
            <p className="leading-relaxed">
              This guide is designed to explain Nepal&apos;s Bluebook-renewal system using the national legal
              framework, provincial transport systems and government-published information. It is an independent
              resource based on published sources, not a government document. Because transport laws, provincial
              tax schedules, online services, penalties and administrative procedures can change, this page is
              reviewed when a relevant law, provincial economic act, official tax schedule or transport-system
              procedure changes.
            </p>
            <p className="mt-2 leading-relaxed">
              NepaCalc provides calculations and explanatory information as an independent platform. It does not
              replace the authority of Nepal&apos;s federal or provincial governments.
            </p>
            <p className="text-slate-400 text-xs mt-3">
              Published by{' '}
              <Link href="/about/editorial-policy/" className="text-slate-500 hover:underline">
                NepaCalc Editorial Team
              </Link>
            </p>
          </div>

          {/* ── CHANGE HISTORY ── */}
          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 text-base mb-3">Page Change History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="text-left py-2 pr-6 font-semibold text-slate-700 whitespace-nowrap">Date</th>
                    <th className="text-left py-2 font-semibold text-slate-700">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 pr-6 text-slate-500 whitespace-nowrap">6 Sep 2026</td>
                    <td className="py-2 text-slate-600">
                      Initial publication. National renewal framework, provincial online-service map and
                      government portal links reviewed. All seven provincial EDL/VRS portal statuses checked.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}





