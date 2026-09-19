import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Bluebook Renewal in Nepal: Cost, Process & Online Guide',
  description:
    'Learn Bluebook renewal costs, vehicle tax, online renewal, required documents and late fines in Nepal. Check province wise rates and renewal steps.',
  keywords: [
    'bluebook renewal nepal',
    'bluebook renewal cost nepal',
    'vehicle tax nepal',
    'vehicle tax by province nepal',
    'bluebook renewal fee nepal',
    'bike bluebook renewal nepal',
    'nepal vehicle tax online',
    'bluebook renewal process nepal',
    'vehicle registration renewal nepal',
    'provincial vehicle tax nepal',
    'how to renew bluebook nepal',
    'bluebook fine late renewal nepal',
    'nagarik app vehicle tax',
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
    title: 'Bluebook Renewal in Nepal: Cost, Process & Online Guide',
    description:
      'Learn Bluebook renewal costs, vehicle tax, online renewal, required documents and late fines in Nepal. Check province wise rates and renewal steps.',
    url: 'https://nepacalc.com/nepal/bluebook-renewal-nepal/',
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
    title: 'Bluebook Renewal in Nepal: Cost, Process & Online Guide',
    description:
      'Learn Bluebook renewal costs, vehicle tax, online renewal, required documents and late fines in Nepal. Check province wise rates and renewal steps.',
    images: ['https://nepacalc.com/images/bluebook-renewal-nepal-process.webp'],
  },
  alternates: {
    canonical: 'https://nepacalc.com/nepal/bluebook-renewal-nepal/',
  },
};

// ─── SCHEMA ──────────────────────────────────────────────────────────────────
const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://nepacalc.com/nepal/bluebook-renewal-nepal/#article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nepacalc.com/nepal/bluebook-renewal-nepal/',
    },
    headline: 'Bluebook Renewal in Nepal: Cost, Process & Online Guide',
    description:
      'Learn Bluebook renewal costs, vehicle tax, online renewal, required documents and late fines in Nepal. Check province wise rates and renewal steps.',
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
    dateModified: '2026-09-19',
    image: 'https://nepacalc.com/images/bluebook-renewal-nepal-process.webp',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://nepacalc.com/nepal/bluebook-renewal-nepal/#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://nepacalc.com/guide/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bluebook Renewal in Nepal',
        item: 'https://nepacalc.com/nepal/bluebook-renewal-nepal/',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does Bluebook renewal cost in Nepal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no single nationwide figure. In Bagmati Province (FY2082/83), a bike up to 125cc costs Rs 3,000 vehicle tax + Rs 300 renewal fee. A car up to 1000cc costs Rs 22,000 tax + Rs 500 renewal fee. Other provinces have different rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the vehicle tax for a bike in Nepal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Bagmati Province (FY2082/83): up to 125cc = Rs 3,000; 126–150cc = Rs 5,000; 151–225cc = Rs 7,000; 226–400cc = Rs 12,000. Koshi: Rs 3,000 (≤125cc). Karnali: Rs 2,700. Sudurpashchim: Rs 2,500.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I renew my Bluebook online in Nepal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Partially. You can pay vehicle tax via the Nagarik App or the provincial EDL/VRS portal. However, some provinces still require a visit to the Transport Management Office for the final stamp and certificate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fine for late Bluebook renewal in Nepal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Bagmati (FY2082/83): Rs 200 per month for the first 6 months, then Rs 300 per month up to 12 months, then 100% of annual tax as penalty after 1 year. Other provinces have similar but province-specific late-payment rules.',
        },
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
// FY2082/83 official rates. Source: Provincial Economic Acts (Arthik Adhiniyam) FY2082/83
// Koshi: Koshi Province Economic Act 2082/83
// Madhesh: Madhesh Province Economic Act 2082/83
// Bagmati: Bagmati Province Economic Act 2082/83
// Gandaki: Gandaki Province Economic Act 2082/83
// Lumbini: Lumbini Province Economic Act 2082/83
// Karnali: Karnali Province Economic Act 2082/83
// Sudurpashchim: Sudurpashchim Province Economic Act 2082/83
const provinces = [
  {
    name: 'Koshi Province',
    portal: 'https://edlvrs.koshi.gov.np/',
    portalLabel: 'Koshi EDL/VRS Portal',
    bikeTax125: 'Rs 3,000',
    carTax1000: 'Rs 23,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Per provincial economic act',
    sourceLabel: 'Koshi Economic Act FY2082/83',
    description:
      'Koshi Province covers the far-eastern region including Dharan, Biratnagar, and Taplejung. The Koshi EDL/VRS portal is the official government entry point for vehicle registration, tax payment, and ownership-transfer services. Note: Koshi has published specific FY 2083/84 information regarding vehicle-tax penalty relief for certain overdue vehicles.',
    taxNote: 'Bike tax is Rs 3,000 per year for engines up to 125cc. Cars up to 1000cc are taxed at Rs 23,000 per year under the Koshi Province Economic Act FY2082/83. Verify exact slabs at the portal or your Transport Management Office.',
  },
  {
    name: 'Madhesh Province',
    portal: 'https://edlvrs.madhesh.gov.np/',
    portalLabel: 'Madhesh EDL/VRS Portal',
    bikeTax125: 'Rs 3,000',
    carTax1000: 'Rs 22,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Per provincial economic act',
    sourceLabel: 'Madhesh Economic Act FY2082/83',
    description:
      'Madhesh Province covers the central Terai region including Janakpur and Birgunj. The Madhesh EDL/VRS portal provides online vehicle-registration, tax-payment, and ownership-transfer functionality.',
    taxNote: 'Bike tax for engines up to 125cc is Rs 3,000 per year. Cars up to 1000cc are taxed at Rs 22,000 per year. Verify your vehicle category and current slab at the Madhesh portal or the relevant transport office.',
  },
  {
    name: 'Bagmati Province',
    portal: 'https://edlvrs.bagamati.gov.np/',
    portalLabel: 'Bagmati EDL/VRS Portal',
    bikeTax125: 'Rs 3,000',
    carTax1000: 'Rs 22,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Within 3 months or Ashadh end (whichever is earlier)',
    sourceLabel: 'Bagmati Economic Act FY2082/83',
    description:
      'Bagmati Province includes Kathmandu Valley. The official Bagmati Transport Management Office citizen charter explicitly requires the original Bluebook, tax print, valid insurance, and VRS record. Bagmati also publishes special notices for tax or renewal-fee relief.',
    taxNote: 'Bagmati has a specific timing rule: vehicle tax should be paid within a 3-month period from expiry OR by the end of Ashadh of that fiscal year, whichever comes earlier. Do not rely on a generic national grace period.',
  },
  {
    name: 'Gandaki Province',
    portal: 'https://edlvrs.gandaki.gov.np/',
    portalLabel: 'Gandaki EDL/VRS Portal',
    bikeTax125: 'Rs 3,000',
    carTax1000: 'Rs 22,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Per provincial economic act',
    sourceLabel: 'Gandaki Economic Act FY2082/83',
    description:
      'Gandaki Province covers the western hilly region including Pokhara. The Gandaki EDL/VRS portal is the government entry point for vehicle-registration and tax-payment services.',
    taxNote: 'Bike tax for engines up to 125cc is Rs 3,000 per year. Cars up to 1000cc are taxed at Rs 22,000. Verify the full slab table through the Gandaki portal or the Gandaki Province transport office.',
  },
  {
    name: 'Lumbini Province',
    portal: 'https://edlvrs.lumbini.gov.np/',
    portalLabel: 'Lumbini EDL/VRS Portal',
    bikeTax125: 'Rs 3,000',
    carTax1000: 'Rs 22,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Within 90 days or Ashadh end (whichever is earlier)',
    sourceLabel: 'Lumbini Economic Act FY2082/83',
    description:
      'Lumbini Province covers the western Terai. The FY 2083/84 Lumbini budget contains specific provisions for penalty waivers if certain conditions and deadlines are met for overdue vehicles.',
    taxNote: 'The FY 2083/84 Lumbini budget specifically states that vehicle tax must be paid within 90 days from the end of the Bluebook renewal period OR by the end of Ashadh, whichever comes first.',
  },
  {
    name: 'Karnali Province',
    portal: 'https://edlvrs.karnali.gov.np/',
    portalLabel: 'Karnali EDL/VRS Portal',
    bikeTax125: 'Rs 2,700',
    carTax1000: 'Rs 21,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Per provincial economic act',
    sourceLabel: 'Karnali Economic Act FY2082/83',
    description:
      'Karnali Province covers the mid-western hills and mountains including Surkhet. It has Nepal\'s lowest vehicle tax rates, reflecting the province\'s lower vehicle density and economic development stage.',
    taxNote: 'Karnali has lower rates than most other provinces. Bike tax for engines up to 125cc is Rs 2,700. Cars up to 1000cc are taxed at Rs 21,000. Verify the full slab table at the Karnali portal or provincial transport office.',
  },
  {
    name: 'Sudurpashchim Province',
    portal: 'https://edlvrs.sudurpashchim.gov.np/',
    portalLabel: 'Sudurpashchim EDL/VRS Portal',
    bikeTax125: 'Rs 2,500',
    carTax1000: 'Rs 19,000',
    renewalFee: 'Rs 300 (bike) / Rs 500 (car)',
    latePenalty: 'Per provincial economic act',
    sourceLabel: 'Sudurpashchim Economic Act FY2082/83',
    description:
      'Sudurpashchim Province covers the far-western region including Dhangadhi and Mahendranagar. It has the lowest vehicle tax rates in Nepal. Note: the detailed VRS page currently marks certain online services as "Coming Soon" — check the current portal status before attempting an online transaction.',
    taxNote: 'Sudurpashchim has the lowest vehicle tax rates in Nepal. Bike tax for engines up to 125cc is Rs 2,500. Cars up to 1000cc are taxed at Rs 19,000. Verify current portal availability before relying on online services.',
  },
];

// ─── STEP DATA ────────────────────────────────────────────────────────────────
const renewalSteps = [
  {
    step: 1,
    title: 'Gather Your Documents',
    desc: 'Collect your original Bluebook (vehicle registration certificate), your citizenship/identity document, existing insurance certificate, and any pollution certificate if applicable to your vehicle type.',
    icon: '📋',
  },
  {
    step: 2,
    title: 'Identify Your Province and Vehicle Category',
    desc: 'Confirm which of the seven provinces your vehicle is registered in — this determines your tax rate. Know your engine capacity (CC for bikes/cars) or motor power (kW for EVs), as these set the slab.',
    icon: '📍',
  },
  {
    step: 3,
    title: 'Pay Vehicle Tax',
    desc: 'Pay the applicable provincial vehicle tax online via the Nagarik App or your province\'s EDL/VRS portal, or offline at your provincial Transport Management Office (TMO). Get a payment receipt.',
    icon: '💳',
  },
  {
    step: 4,
    title: 'Renew Vehicle Insurance',
    desc: 'Valid vehicle insurance is a mandatory legal prerequisite for renewal under the Motor Vehicles and Transport Management Act. Renew third-party insurance before going to the transport office.',
    icon: '🛡️',
  },
  {
    step: 5,
    title: 'Obtain Pollution Certificate (If Required)',
    desc: 'Petrol and diesel vehicles in areas where pollution testing is required must have a valid pollution/emission certificate. Check the current requirement at your local transport office.',
    icon: '🌿',
  },
  {
    step: 6,
    title: 'Submit at the Transport Management Office',
    desc: 'Present all documents — tax receipt, insurance, pollution cert, and Bluebook — at your relevant TMO. The office will stamp and renew your registration certificate. Keep all original receipts.',
    icon: '🏛️',
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
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-[96px] py-8 pb-24">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
            <div className="w-full">
              {/* ── BREADCRUMB ── */}
              <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[13px] text-slate-500 mb-6">
                <Link href="/" className={extLink}>Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/guide/" className={extLink}>Guide</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-700 font-medium">Bluebook Renewal in Nepal</span>
              </nav>

              {/* ── H1 ── */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                Bluebook Renewal in Nepal: Cost, Process &amp; Online Guide
              </h1>

              {/* ── QUICK ANSWERS HERO BLOCK ── */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 mb-8">
                <p className="font-bold text-slate-900 text-sm mb-3">Quick Answers (FY2082/83)</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    { q: 'Bike renewal cost (Bagmati, ≤125cc)?', a: 'Rs 3,000 tax + Rs 300 renewal fee = Rs 3,300' },
                    { q: 'Car renewal cost (Bagmati, ≤1000cc)?', a: 'Rs 22,000 tax + Rs 500 renewal fee = Rs 22,500' },
                    { q: 'Lowest province vehicle tax?', a: 'Sudurpashchim — bike Rs 2,500, car Rs 19,000' },
                    { q: 'Late fine (Bagmati)?', a: 'Rs 200/month (first 6 months), Rs 300/month after' },
                    { q: 'Can I renew online?', a: 'Yes — via Nagarik App or provincial EDL/VRS portal' },
                    { q: 'Is insurance required?', a: 'Yes — mandatory by law before renewal is processed' },
                  ].map(({ q, a }) => (
                    <div key={q} className="bg-white rounded-xl border border-emerald-100 px-4 py-3">
                      <p className="text-slate-500 text-xs mb-0.5">{q}</p>
                      <p className="font-semibold text-emerald-800">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── WHAT THIS PAGE DOES / DOESN'T DO ── */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 mb-8 text-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-slate-900 mb-2">What this guide covers</p>
                    <ul className="space-y-1 text-slate-600">
                      {[
                        'FY2082/83 vehicle tax by province',
                        'Step-by-step renewal process',
                        'Bike and car tax slabs (Bagmati)',
                        'Late renewal fines and penalties',
                        'Online renewal: Nagarik App + portals',
                        'Required documents checklist',
                        'Province-by-province system map',
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
                        'Provide real-time tax table updates',
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
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 mb-8">
                <p className="font-bold text-slate-900 mb-3 text-sm">What are you trying to do?</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { label: 'I want to see my province\'s tax rates', href: '#province-guide' },
                    { label: 'I want step-by-step renewal instructions', href: '#steps' },
                    { label: 'I want to renew a bike or scooter', href: '#bike' },
                    { label: 'I want to renew a car or jeep', href: '#car' },
                    { label: 'My Bluebook is expired — what\'s the fine?', href: '#late-renewal' },
                    { label: 'I want to renew online (Nagarik App)', href: '#online' },
                    { label: 'I need the required documents list', href: '#documents' },
                    { label: 'I have an electric vehicle', href: '#ev' },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-200 text-slate-700 hover:bg-blue-100 transition-colors">
                      <span className="text-blue-500">↓</span>{label}
                    </a>
                  ))}
                </div>
              </div>


          {/* ── WHAT IS BLUEBOOK RENEWAL ── */}
          <section id="quick-answer" className="scroll-mt-24">
            <h2 className={h2}>What Is Bluebook Renewal?</h2>
            <p className={prose}>
              The <strong>Bluebook</strong> is the common name for a vehicle&apos;s <strong>registration certificate</strong> in Nepal. Every registered vehicle must have a valid Bluebook to legally operate on the road. Renewing it means completing the applicable payment and documentation process to keep that registration certificate valid for another year (or multiple years where applicable).
            </p>
            <p className={`${prose} mt-3`}>
              In Nepal, <strong>vehicle tax</strong> is set by each of the seven provinces — not the federal government — through their annual <Link href="/nepal/nepal-budget/" className={intLink}>economic legislation (Arthik Adhiniyam)</Link>. This means that the answer to &ldquo;how much does Bluebook renewal cost?&rdquo; depends on <strong>which province your vehicle is registered in</strong> and what engine capacity or vehicle type it is.
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
                    ['What is a Bluebook?', 'Vehicle registration certificate (Yantrachalan Praman Patra)'],
                    ['What is renewal?', 'Renewing the vehicle\'s registration certificate annually'],
                    ['Is vehicle tax the same nationwide?', 'No — each province sets its own tax schedule'],
                    ['Who sets vehicle tax?', 'Provincial governments via their annual Economic Act'],
                    ['Is insurance mandatory?', 'Yes — required by law before renewal is processed'],
                    ['Can everything be done online?', 'Partially — tax can be paid online, office visit usually required'],
                    ['Where is the final amount confirmed?', 'Applicable Transport Management Office'],
                  ].map(([q, a]) => (
                    <tr key={q} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">{q}</td>
                      <td className="px-4 py-3 text-slate-600">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* What is not the Bluebook */}
            <p className={`${prose} mt-5`}>
              The Bluebook is <strong>not</strong> the same as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600">
              <li>a driver&apos;s licence (belongs to the driver, not the vehicle);</li>
              <li>vehicle insurance;</li>
              <li>vehicle/road tax (a separate provincial payment);</li>
              <li>a route permit (for public or hired vehicles); or</li>
              <li>a pollution or emissions certificate.</li>
            </ul>
            <p className={`${prose} mt-3`}>
              These are all <em>connected</em> during the renewal process, but each is a separate document or obligation.
            </p>

            {/* Calculator CTA */}
            <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-slate-700 flex-1">
                Use the <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>NepaCalc Vehicle Tax Calculator</Link> to get an instant estimate based on Bagmati Province rates.
              </p>
              <Link
                href="/calculator/nepal-vehicle-tax/"
                className="flex-shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Vehicle Tax Calculator →
              </Link>
            </div>
          </section>

          {/* ── STEP-BY-STEP RENEWAL GUIDE ── */}
          <section id="steps" className="scroll-mt-24">
            <h2 className={h2}>Step-by-Step Bluebook Renewal Guide</h2>
            <p className={prose}>
              The renewal process is broadly the same across all provinces. The difference is in the tax amount and how much of the process can be completed online. Here are the 6 steps:
            </p>

            <div className="mt-6 space-y-4">
              {renewalSteps.map(({ step, title, desc, icon }) => (
                <div key={step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {step}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm mb-1">{icon} {title}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              <strong>Note:</strong> If your Bluebook is expired, additional late-payment charges apply <em>before</em> the office will process renewal. Calculate the fine first — see the <a href="#late-renewal" className="underline">Late Renewal section</a> below.
            </div>
          </section>

          {/* ── PROVINCE GUIDE ── */}
          <section id="province-guide" className="scroll-mt-24">
            <h2 className={h2}>Province-by-Province Vehicle Tax Rates (FY2082/83)</h2>
            <p className={prose}>
              Nepal&apos;s seven provinces each set their own vehicle tax through their annual <Link href="/nepal/nepal-budget/" className={intLink}>Economic Act (Arthik Adhiniyam)</Link>. The table below shows the FY2082/83 rates for the most common vehicle categories. Rates are in Nepali Rupees (NPR) per year.
            </p>

            {/* Province matrix table */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Province</th>
                    <th className="text-left px-4 py-3 font-semibold">Bike ≤125cc</th>
                    <th className="text-left px-4 py-3 font-semibold">Car ≤1000cc</th>
                    <th className="text-left px-4 py-3 font-semibold">Renewal Fee</th>
                    <th className="text-left px-4 py-3 font-semibold">Online Portal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {provinces.map(({ name, bikeTax125, carTax1000, renewalFee, portal, portalLabel }) => (
                    <tr key={name} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{name}</td>
                      <td className="px-4 py-3 text-emerald-700 font-medium">{bikeTax125}</td>
                      <td className="px-4 py-3 text-blue-700 font-medium">{carTax1000}</td>
                      <td className="px-4 py-3 text-slate-600">{renewalFee}</td>
                      <td className="px-4 py-3">
                        <a href={portal} target="_blank" rel="noopener noreferrer" className={`${extLink} text-xs`}>{portalLabel} →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900 mb-6">
              <strong>Data source:</strong> Provincial Economic Acts (Arthik Adhiniyam) FY2082/83 for all seven provinces. Rates shown are for private vehicles, standard category. Higher CC/engine slabs attract higher taxes. Always verify the exact slab applicable to your vehicle with the relevant provincial transport office or EDL/VRS portal before payment.
            </div>

            {/* Individual province blocks */}
            {provinces.map(({ name, portal, portalLabel, description, taxNote, sourceLabel, latePenalty }) => (
              <div key={name} className="mt-8 scroll-mt-24 rounded-2xl border border-slate-200 p-5" id={name.toLowerCase().replace(/\s+/g, '-')}>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{name}</h3>
                <p className="text-sm text-slate-500 mb-3">Source: <span className="font-medium text-slate-700">{sourceLabel}</span> &nbsp;·&nbsp; Late penalty: <span className="font-medium text-slate-700">{latePenalty}</span></p>
                <p className={`${prose} text-sm`}>{description}</p>
                <p className={`${prose} text-sm mt-2`}>{taxNote}</p>
                <p className="mt-3 text-sm">
                  <a href={portal} target="_blank" rel="noopener noreferrer" className={extLink}>
                    Open {portalLabel} →
                  </a>
                </p>
              </div>
            ))}

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              <strong>Important:</strong> A portal existing at the province level does not guarantee that every vehicle transaction can currently be completed entirely online. Service rollout is ongoing. Always verify current availability with the relevant provincial transport office before relying on online renewal.
            </div>
          </section>

          {/* ── MOTORCYCLE & SCOOTER ── */}
          <section id="bike" className="scroll-mt-24">
            <h2 className={h2}>Motorcycle and Scooter Renewal</h2>
            <p className={prose}>
              Motorcycle and scooter vehicle tax in Nepal is determined by engine capacity (CC). Each province has its own CC-based slab. Below is the detailed Bagmati Province slab for FY2082/83 — the most commonly referenced because it covers Kathmandu Valley.
            </p>

            <h3 className={h3}>Bagmati Province — Bike Tax Slabs (FY2082/83)</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Engine Capacity (CC)</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Annual Vehicle Tax</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Renewal Fee</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Total (tax + fee)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Up to 125cc', 'Rs 3,000', 'Rs 300', 'Rs 3,300'],
                    ['126cc – 150cc', 'Rs 5,000', 'Rs 300', 'Rs 5,300'],
                    ['151cc – 225cc', 'Rs 7,000', 'Rs 300', 'Rs 7,300'],
                    ['226cc – 400cc', 'Rs 12,000', 'Rs 300', 'Rs 12,300'],
                  ].map(([cc, tax, fee, total]) => (
                    <tr key={cc} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{cc}</td>
                      <td className="px-4 py-3 text-emerald-700 font-semibold">{tax}</td>
                      <td className="px-4 py-3 text-slate-600">{fee}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">Source: Bagmati Province Economic Act FY2082/83. Rates are for private motorcycles/scooters. Insurance is additional and mandatory.</p>

            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900">
              <strong>Other provinces:</strong> Koshi charges Rs 3,000 (≤125cc). Karnali charges Rs 2,700. Sudurpashchim charges Rs 2,500. Madhesh, Gandaki, and Lumbini also charge Rs 3,000. Always verify the full slab for higher-CC bikes with your province&apos;s transport office.
            </div>

            <h3 className={h3}>Checklist Before Paying Bike Renewal</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600 text-sm">
              <li>Confirm the province and the exact engine CC of your bike</li>
              <li>Check whether renewal is current or overdue (late fees apply)</li>
              <li>Ensure third-party insurance is valid and will not expire before renewal</li>
              <li>Check whether a pollution certificate is required in your area</li>
              <li>Verify total amount with your provincial portal or transport office</li>
            </ul>
          </section>

          {/* ── CAR & JEEP ── */}
          <section id="car" className="scroll-mt-24">
            <h2 className={h2}>Car and Jeep Renewal</h2>
            <p className={prose}>
              Private car and jeep vehicle tax in Nepal is also set by each province separately. The most widely used benchmark is Bagmati Province (which covers Kathmandu), where the FY2082/83 rates are:
            </p>

            <h3 className={h3}>Bagmati Province — Car Tax Slabs (FY2082/83)</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Engine Capacity (CC)</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Annual Vehicle Tax</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Renewal Fee</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Total (tax + fee)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Up to 1000cc', 'Rs 22,000', 'Rs 500', 'Rs 22,500'],
                    ['1001cc – 1500cc', 'Rs 30,000', 'Rs 500', 'Rs 30,500'],
                    ['1501cc – 2000cc', 'Rs 40,000', 'Rs 500', 'Rs 40,500'],
                    ['Above 2000cc', 'Rs 50,000', 'Rs 500', 'Rs 50,500'],
                  ].map(([cc, tax, fee, total]) => (
                    <tr key={cc} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{cc}</td>
                      <td className="px-4 py-3 text-blue-700 font-semibold">{tax}</td>
                      <td className="px-4 py-3 text-slate-600">{fee}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">Source: Bagmati Province Economic Act FY2082/83. Rates are for private cars. Insurance and any pollution certification are additional.</p>

            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900">
              <strong>Other provinces:</strong> Koshi Province charges Rs 23,000 for cars up to 1000cc — slightly higher than most other provinces. Karnali charges Rs 21,000. Sudurpashchim charges the lowest at Rs 19,000. Do not apply a Bagmati rate to vehicles registered in other provinces.
            </div>

            <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-slate-700 flex-1">
                Use the <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>NepaCalc Vehicle Tax Calculator</Link> to estimate your renewal cost based on Bagmati rates.
              </p>
              <Link
                href="/calculator/nepal-vehicle-tax/"
                className="flex-shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Calculate Now →
              </Link>
            </div>
          </section>

          {/* ── LATE RENEWAL ── */}
          <section id="late-renewal" className="scroll-mt-24">
            <h2 className={h2}>Late Renewal Fines &amp; Penalties</h2>
            <p className={prose}>
              If your Bluebook has expired, you must pay <strong>late-payment fines in addition to the regular vehicle tax</strong> before renewal will be processed. However, the exact rule is not just one nationwide 5%–32% table. Late-payment rules can come from different legal provisions, and provinces can also issue specific relief or penalty notices.
            </p>

            <h3 className={h3}>Provincial Vehicle-Tax Late-Payment Rules (Examples)</h3>
            <p className={prose}>
              Do not assume a single grace period applies everywhere. Provinces have their own specific tax timing provisions. For example:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600">
              <li><strong>Bagmati Province:</strong> Vehicle tax should be paid within a 3-month period from the expiry of the one-year renewal date, <strong>OR</strong> by the end of <Link href="/calculator/nepali-date/" className={intLink}>Ashadh</Link> of that fiscal year, whichever comes earlier.</li>
              <li><strong>Lumbini Province:</strong> The <Link href="/nepal/nepal-budget/" className={intLink}>FY 2083/84 budget</Link> contains a specific rule stating tax must be paid within 90 days from the end of the renewal period <strong>OR</strong> by the end of <Link href="/calculator/nepali-date/" className={intLink}>Ashadh</Link>, whichever comes first.</li>
              <li><strong>Koshi Province:</strong> Has published specific FY 2083/84 information concerning vehicle-tax penalty relief for overdue vehicles.</li>
            </ul>

            <h3 className={h3}>Standard Fine Structure (e.g., Bagmati)</h3>
            <p className={prose}>
              If you miss the specific provincial deadline, escalating charges apply:
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Delay Period</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Extra Charge (Bagmati example)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Up to 3 months / Ashadh end', 'Grace period — no late fee (conditions apply)'],
                    ['Missed deadline – 6 months', 'Rs 200 per month'],
                    ['6 months – 12 months', 'Rs 300 per month'],
                    ['Over 12 months', '100% of annual vehicle tax as additional penalty'],
                    ['Prolonged (years)', 'May trigger statutory cancellation — re-registration required'],
                  ].map(([period, charge]) => (
                    <tr key={period} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{period}</td>
                      <td className="px-4 py-3 text-rose-700 font-semibold">{charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">Note: Other provinces have similar structures but verify exact figures and deadlines at your provincial transport office.</p>

            <h3 className={h3}>Long-Overdue or Cancelled Registrations</h3>
            <p className={prose}>
              A vehicle owner should <strong>not assume</strong> that a long-overdue vehicle can simply be renewed by multiplying one year&apos;s tax by the number of missed years. The Motor Vehicles and Transport Management Act contains distinct provisions for cancellation and re-registration. Owners of vehicles that have not been renewed for several years should contact the relevant Transport Management Office directly.
            </p>

            <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-900">
              <strong>Caution:</strong> The longer you delay renewal, the higher the penalty — and after a certain threshold, the vehicle registration is legally cancelled. If your renewal is already late, check the current provincial rule before paying.
            </div>
          </section>

          {/* ── ONLINE RENEWAL ── */}
          <section id="online" className="scroll-mt-24">
            <h2 className={h2}>Online Renewal — Nagarik App &amp; Provincial Portals</h2>
            <p className={prose}>
              Vehicle tax payment can be completed online in most provinces. The two main channels are the <strong>Nagarik App</strong> (national) and the <strong>provincial EDL/VRS portals</strong>.
            </p>

            <h3 className={h3}>Nagarik App</h3>
            <p className={prose}>
              The Nagarik App is a national digital government services platform where you can pay vehicle tax and access other government services. It is available on both Android and iOS. Steps: open the app → go to Transport Services → select Vehicle Tax Payment → enter your vehicle number and confirm payment.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=np.gov.nagarik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                <span>▶</span> Get Nagarik App (Android)
              </a>
              <a
                href="https://apps.apple.com/np/app/nagarik/id1531440521"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                <span>🍎</span> Get Nagarik App (iOS)
              </a>
            </div>

            <h3 className={h3}>Provincial EDL/VRS Portals</h3>
            <p className={`${prose} mb-4`}>
              Each province operates its own Electronic Driver Licence and Vehicle Registration System (EDL/VRS) portal for tax payment and registration services:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {provinces.map(({ name, portal, portalLabel }) => (
                <a
                  key={name}
                  href={portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{name}</p>
                    <p className="text-xs text-slate-500">{portalLabel}</p>
                  </div>
                  <span className="text-blue-400 group-hover:text-blue-600">→</span>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              <strong>Important:</strong> Online tax payment does <em>not</em> automatically mean the entire Bluebook-renewal process is complete. In some provinces, you still need to visit the Transport Management Office to get the physical stamp on your Bluebook. Sudurpashchim&apos;s VRS portal currently lists some services as &ldquo;Coming Soon.&rdquo; Always check the current status of your provincial portal before relying on a fully online renewal.
            </div>
          </section>

          {/* ── DOCUMENTS ── */}
          <section id="documents" className="scroll-mt-24">
            <h2 className={h2}>Required Documents for Bluebook Renewal</h2>
            <p className={prose}>
              Rule 8 of the Motor Vehicles and Transport Management Rules addresses renewal of the registration certificate, and Schedule 11 specifies the documents required. Always check the current notice from the relevant transport authority before visiting — office requirements can change.
            </p>
            <p className={`${prose} mt-3`}>
              For example, the official Bagmati Transport Management Office citizen charter explicitly lists the following items for a standard renewal:
            </p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <ul className="space-y-2">
                {[
                  { item: 'Original Bluebook (vehicle registration certificate)', required: true },
                  { item: 'Tax print (vehicle tax payment receipt)', required: true },
                  { item: 'Valid vehicle insurance certificate (third-party minimum)', required: true },
                  { item: 'VRS record / identity document', required: true },
                  { item: 'Pollution/emission certificate (where required by vehicle type and area)', required: false },
                  { item: 'Route permit (for public buses, taxis, and hired vehicles only)', required: false },
                  { item: 'Late-payment fine receipt (if renewal is overdue)', required: false },
                  { item: 'Any other documents specified by your provincial transport office', required: false },
                ].map(({ item, required }) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-bold ${required ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : 'border-slate-300 text-slate-400'}`}>
                      {required ? '✓' : '○'}
                    </span>
                    <span>
                      {item}
                      {required ? <span className="ml-1 text-xs text-emerald-600 font-medium">(mandatory)</span> : <span className="ml-1 text-xs text-slate-400">(if applicable)</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              If your vehicle has a special issue such as ownership transfer, a lost Bluebook, or another registration problem, additional documents will be required.
            </p>
          </section>

          {/* ── HOW TO ESTIMATE COST ── */}
          <section id="calculate" className="scroll-mt-24">
            <h2 className={h2}>How to Estimate the Total Renewal Cost</h2>
            <p className={prose}>
              The total amount payable during a renewal transaction is the sum of multiple components — not a single fixed number. Use this formula:
            </p>
            <div className="my-4 rounded-xl bg-slate-900 text-white p-5 font-mono text-sm leading-relaxed">
              <p className="text-emerald-400 mb-1">// Total Renewal Cost</p>
              <p>Total = <span className="text-yellow-300">Vehicle Tax</span> (provincial)</p>
              <p className="pl-8">+ <span className="text-yellow-300">Renewal Fee</span> (Rs 300 bike / Rs 500 car)</p>
              <p className="pl-8">+ <span className="text-yellow-300">Insurance Premium</span> (mandatory)</p>
              <p className="pl-8">+ <span className="text-yellow-300">Pollution Certificate</span> (if applicable)</p>
              <p className="pl-8">+ <span className="text-yellow-300">Late Fine</span> (if overdue)</p>
              <p className="pl-8">+ <span className="text-yellow-300">Other Prescribed Fees</span></p>
            </div>
            <p className={prose}>
              <strong>Example (Bagmati, 125cc bike, on time):</strong> Rs 3,000 (tax) + Rs 300 (renewal fee) + ~Rs 2,000–3,000 (insurance estimate) = approximately <strong>Rs 5,300–6,300 total</strong>. Insurance premiums vary by insurer and vehicle value — always get a current quote.
            </p>

            <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-slate-700 flex-1">
                Use the <Link href="/calculator/nepal-vehicle-tax/" className={intLink}>NepaCalc Vehicle Tax Calculator</Link> for a quick Bagmati Province estimate.
              </p>
              <Link
                href="/calculator/nepal-vehicle-tax/"
                className="flex-shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Automate Calculation →
              </Link>
            </div>
          </section>

          {/* ── TAX VS RENEWAL ── */}
          <section id="tax-vs-renewal" className="scroll-mt-24">
            <h2 className={h2}>Bluebook Renewal vs Vehicle Tax — What&apos;s the Difference?</h2>
            <p className={prose}>
              These are frequently confused. Bluebook renewal and vehicle tax are <strong>not the same thing</strong>, although they are handled in the same transaction.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Item</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">What it is</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Who sets it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Bluebook', 'Vehicle registration certificate', 'Department of Transport Management'],
                    ['Vehicle tax', 'Annual provincial tax on registered vehicles', 'Each province (via Economic Act)'],
                    ['Renewal fee', 'Admin charge for renewing the certificate', 'Department of Transport Management'],
                    ['Insurance', 'Mandatory third-party vehicle insurance', 'Nepal Insurance Authority (NIA)'],
                    ['Pollution cert', 'Emissions certificate where required', 'Applicable transport/environment rules'],
                    ['Route permit', 'Transport authorisation for public/hired vehicles', 'Transport Management Office'],
                  ].map(([item, what, who]) => (
                    <tr key={item} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{item}</td>
                      <td className="px-4 py-3 text-slate-600">{what}</td>
                      <td className="px-4 py-3 text-slate-600">{who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── EV ── */}
          <section id="ev" className="scroll-mt-24">
            <h2 className={h2}>Electric Vehicle (EV) Renewal</h2>
            <p className={prose}>
              Electric vehicles require particular attention because several different charges are frequently confused:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600">
              <li>
                <strong className="text-slate-800">Annual vehicle tax</strong> — the recurring annual tax for a registered EV, set by each province and typically based on <strong>motor power (kW)</strong> rather than engine CC. This is paid during Bluebook renewal.
              </li>
              <li>
                <strong className="text-slate-800">EV import taxation</strong> — a one-time charge when the vehicle enters Nepal, including customs duty and applicable import charges. <strong>This is entirely separate from the annual renewal tax.</strong>
              </li>
              <li>
                <strong className="text-slate-800">Registration and renewal</strong> — keeping the vehicle registration certificate valid, subject to the same general renewal framework as other vehicles.
              </li>
            </ul>
            <p className={`${prose} mt-3`}>
              A statement such as &ldquo;EV tax in Nepal is Rs. X&rdquo; is incomplete without specifying which charge, which province, which vehicle classification (kW range), and which fiscal year&apos;s schedule applies.
            </p>
            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900">
              <strong>Note:</strong> EV annual road tax rates differ between provinces. In Bagmati, EV bikes and cars are taxed at lower rates than combustion vehicles. Verify the applicable kW-based slab with your provincial EDL/VRS portal.
            </div>
          </section>

          {/* ── COMMERCIAL ── */}
          <section id="commercial" className="scroll-mt-24">
            <h2 className={h2}>Public and Commercial Vehicles</h2>
            <p className={prose}>
              Public and commercial vehicles have additional regulatory requirements beyond private-vehicle renewal. Depending on the vehicle and service, these may include:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600">
              <li>route permits (separate transport authorisation — not the same as a Bluebook);</li>
              <li>passenger or carrying-capacity classifications for tax;</li>
              <li>higher insurance requirements and premiums;</li>
              <li>additional inspection or certification; and</li>
              <li>other transport-management documents required by current rules.</li>
            </ul>
            <p className={`${prose} mt-3`}>
              The renewal framework for a private car does not describe the requirements for a public bus, taxi, truck or other commercial vehicle. Check the applicable transport authority for current requirements.
            </p>
          </section>

          {/* ── INSURANCE & POLLUTION ── */}
          <section id="insurance" className="scroll-mt-24">
            <h2 className={h2}>Insurance and Pollution Requirements</h2>

            <h3 className={h3}>Vehicle Insurance</h3>
            <p className={prose}>
              The Motor Vehicles and Transport Management Act provides that required insurance must be obtained and that a registration certificate <strong>will not be renewed without it</strong>. Insurance is therefore a legal prerequisite, not an optional cost. The{' '}
              <span className="font-semibold text-slate-900">Nepal Insurance Authority (NIA)</span>{' '}
              is the current regulatory body and publishes applicable insurance circulars including third-party vehicle insurance requirements. Insurance premiums are separate from provincial vehicle tax and the renewal fee — always get a current quote from a licensed insurer.
            </p>

            <h3 className={h3}>Pollution Certification</h3>
            <p className={prose}>
              Where applicable rules require pollution testing or certification, the relevant certificate must be available for renewal. Requirements depend on vehicle type (combustion vs. electric), age, fuel type, and current transport-office procedure. Check the current requirements from the relevant transport authority before visiting.
            </p>

            <h3 className={h3}>Route Permit</h3>
            <p className={prose}>
              A route permit is a separate transport authorisation for public or hired vehicles. It is <strong>not a Bluebook</strong>. Renewing a Bluebook does not renew a route permit. These are separate obligations under the transport-management framework.
            </p>
          </section>

          {/* ── COMMON MISTAKES ── */}
          <section id="mistakes" className="scroll-mt-24">
            <h2 className={h2}>Common Mistakes to Avoid</h2>
            <div className="mt-4 space-y-3">
              {[
                ['Applying a Bagmati rate to another province', 'Bagmati is one province. Koshi, Karnali, and Sudurpashchim all have different rates. Always check your province.'],
                ['Thinking vehicle tax equals total renewal cost', 'Tax, renewal fee, insurance, and any certification costs are all separate components.'],
                ['Assuming online tax payment = renewal complete', 'In some provinces, you still need to visit the TMO for the registration stamp. Confirm with your province.'],
                ['Using an old blog/table as the current rate', 'Provincial tax schedules change with each annual Economic Act. Always verify the current FY rate.'],
                ['Thinking a long-overdue vehicle just needs (tax × years)', 'Prolonged non-renewal triggers cancellation and re-registration law — not just ordinary late fees. Contact your TMO.'],
                ['Confusing EV import tax with EV annual road tax', 'These are completely different charges at different stages of vehicle ownership.'],
                ['Treating a Bagmati Province rate as nationwide', 'No single nationwide rate exists. Each province sets its own schedule.'],
              ].map(([mistake, why]) => (
                <div key={mistake} className="border-l-4 border-rose-200 pl-4 py-1">
                  <p className="font-semibold text-slate-900 text-sm">❌ {mistake}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="scroll-mt-24">
            <h2 className={h2}>Frequently Asked Questions</h2>
            <div className="space-y-5 mt-4">
              {[
                {
                  q: 'How much does Bluebook renewal cost in Nepal?',
                  a: 'It depends on your province and vehicle. In Bagmati Province (FY2082/83): a 125cc bike costs Rs 3,000 tax + Rs 300 renewal fee = Rs 3,300 (plus insurance). A car up to 1000cc costs Rs 22,000 + Rs 500 = Rs 22,500 (plus insurance).',
                },
                {
                  q: 'What is the vehicle tax for a bike in Nepal?',
                  a: 'In Bagmati (FY2082/83): ≤125cc = Rs 3,000; 126–150cc = Rs 5,000; 151–225cc = Rs 7,000; 226–400cc = Rs 12,000. In Karnali: ≤125cc = Rs 2,700. In Sudurpashchim: Rs 2,500. Other provinces charge Rs 3,000 for ≤125cc.',
                },
                {
                  q: 'Is Rs 3,000 the vehicle tax for all provinces?',
                  a: 'No. Rs 3,000 for a 125cc bike applies to Bagmati, Madhesh, Gandaki, Lumbini, and Koshi. Karnali charges Rs 2,700 and Sudurpashchim charges Rs 2,500. For higher CC bikes, the amount increases significantly.',
                },
                {
                  q: 'What is the renewal fee for a bike in Nepal?',
                  a: 'The registration renewal fee is Rs 300 for motorcycles and Rs 500 for cars. This is separate from the vehicle tax. Total minimum bike renewal = Rs 3,000 tax + Rs 300 fee + insurance.',
                },
                {
                  q: 'What is Bluebook renewal in Nepal?',
                  a: "Bluebook renewal is the process of renewing a vehicle's registration certificate and completing applicable tax, fee, insurance, and other requirements to keep the registration valid for another year.",
                },
                {
                  q: 'Is Bluebook renewal the same as vehicle tax?',
                  a: 'No. Vehicle tax is a recurring provincial tax obligation. Renewal refers to renewing the registration certificate. They are handled in the same transaction but are legally separate.',
                },
                {
                  q: 'Does vehicle tax differ by province in Nepal?',
                  a: "Yes. Each of Nepal's seven provinces sets its own vehicle tax through its annual Economic Act. You must use the tax schedule for the province where your vehicle is registered.",
                },
                {
                  q: 'Can I pay vehicle tax online in Nepal?',
                  a: 'Yes — via the Nagarik App or your province\'s EDL/VRS portal. However, some provinces may still require an in-person visit to the Transport Management Office to complete the registration renewal.',
                },
                {
                  q: 'How do I use the Nagarik App for vehicle tax payment?',
                  a: 'Download the Nagarik App (Android/iOS) → go to Transport Services → select Vehicle Tax Payment → enter your vehicle registration number → confirm payment. Keep the digital receipt.',
                },
                {
                  q: 'What is the fine for late Bluebook renewal?',
                  a: 'In Bagmati (FY2082/83): Rs 200/month for the first 6 months, Rs 300/month for 6–12 months, and 100% of annual tax as penalty after 1 year. Prolonged non-renewal can lead to cancellation and re-registration requirements.',
                },
                {
                  q: 'Can I renew my Bluebook for multiple years?',
                  a: 'The Motor Vehicles and Transport Management Act provides a multi-year renewal provision for eligible private vehicle categories — up to five years. Confirm the current procedure with your relevant Transport Management Office.',
                },
                {
                  q: 'Is insurance required for Bluebook renewal?',
                  a: 'Yes. The Motor Vehicles and Transport Management Act provides that required insurance must be in place and that registration renewal cannot proceed without it. Third-party insurance is the minimum requirement.',
                },
                {
                  q: 'Is a pollution certificate required for renewal?',
                  a: 'Where applicable rules require pollution testing, the certificate must be available for renewal. This depends on vehicle type, age, fuel type, and current transport-office procedure. Electric vehicles are generally exempt.',
                },
                {
                  q: 'What happens if my Bluebook renewal is very late (years)?',
                  a: "Do not assume you can simply multiply one year's tax by the number of missed years. The Motor Vehicles and Transport Management Act has specific cancellation and re-registration provisions for prolonged non-renewal. Contact your Transport Management Office directly.",
                },
                {
                  q: 'What are the Bagmati Province bike tax slabs for FY2082/83?',
                  a: 'Up to 125cc: Rs 3,000. 126–150cc: Rs 5,000. 151–225cc: Rs 7,000. 226–400cc: Rs 12,000. Source: Bagmati Province Economic Act FY2082/83.',
                },
                {
                  q: 'How do I calculate my total renewal cost?',
                  a: 'Total = Vehicle Tax (provincial slab) + Renewal Fee (Rs 300/500) + Insurance Premium + Pollution Certificate (if needed) + Late Fine (if overdue). Use the NepaCalc Vehicle Tax Calculator for an estimate.',
                },
                {
                  q: 'Is Bluebook renewal the same as driving licence renewal?',
                  a: 'No. A Bluebook concerns vehicle registration. A driving licence concerns the driver. These are separate documents under the transport-management framework.',
                },
                {
                  q: 'Who is the insurance regulator in Nepal?',
                  a: 'The Nepal Insurance Authority (NIA) is the current regulatory body for vehicle insurance and publishes applicable insurance circulars. Visit nia.gov.np.',
                },
                {
                  q: 'Is vehicle tax the same every year?',
                  a: "Not necessarily. Rates are set by each province's annual Economic Act and can change from one fiscal year to the next. Always verify the current FY rate before paying.",
                },
                {
                  q: 'Where should I verify the final renewal amount?',
                  a: "Check the latest applicable provincial government schedule via the EDL/VRS portal, or visit your relevant Transport Management Office. A calculator provides an estimate; the government receipt is the final authority.",
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
              Bluebook renewal is a vehicle-registration renewal process in Nepal. The national vehicle law provides the registration framework, while provincial economic legislation determines vehicle-tax obligations and practical service arrangements. The exact cost depends on your province, vehicle category, and renewal status. In Bagmati Province (FY2082/83), a 125cc bike costs Rs 3,300 (tax + fee) and a car up to 1000cc costs Rs 22,500 — plus mandatory insurance. Use the{' '}
              <span className="font-medium text-emerald-400">NepaCalc Vehicle Tax Calculator</span>{' '}
              for a quick estimate, and always verify the final amount with the applicable government source.
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
                      url: 'https://lawcommission.gov.np/',
                      what: 'National registration and renewal law, late-renewal provisions, multi-year renewal, cancellation and re-registration',
                    },
                    {
                      source: 'Nepal Law Commission — Transport Management Rules',
                      url: 'https://lawcommission.gov.np/',
                      what: 'Renewal procedure, documentation framework, pollution and route-permit requirements',
                    },
                    {
                      source: 'Department of Transport Management (DOTM)',
                      url: 'https://www.dotm.gov.np/',
                      what: 'Transport-office network, tax-rate circulars, provincial law references, government transport notices',
                    },
                    {
                      source: 'Provincial Economic Acts FY2082/83 (all 7 provinces)',
                      url: '#province-guide',
                      what: 'Current vehicle-tax schedule, renewal fees, late-payment penalties by province',
                    },
                    {
                      source: 'Provincial EDL/VRS portals (all 7 provinces)',
                      url: '#province-guide',
                      what: 'Online vehicle-service availability, registration/tax-payment workflow',
                    },
                    {
                      source: 'Nepal Insurance Authority (NIA)',
                      url: 'https://nia.gov.np/',
                      what: 'Vehicle insurance regulatory requirements, applicable insurance circulars',
                    },
                    {
                      source: 'Nagarik App (online vehicle tax payment)',
                      url: 'https://nagarik.gov.np/',
                      what: 'Online vehicle tax payment channel, digital receipt generation',
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
              Vehicle tax figures are sourced from each of Nepal&apos;s seven provincial Economic Acts (Arthik Adhiniyam) for FY2082/83. We separate national vehicle-registration rules from provincial vehicle-tax requirements. National legal claims are checked against Nepal&apos;s published Motor Vehicles and Transport Management Act and Rules. Province-specific tax data is verified against the applicable provincial economic legislation. When a tax amount or online service is subject to change, we identify the applicable authority rather than presenting a stale amount as a permanent rule.
            </p>
            <p className="text-slate-500 text-xs mt-3">
              <span className="font-medium text-slate-900">Data Sources &amp; Methodology</span>
              {' '}·{' '}
              <span className="font-medium text-slate-900">NepaCalc Editorial Policy</span>
            </p>
          </section>

          {/* ── EDITORIAL NOTE ── */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900 mb-2">Editorial Note</p>
            <p className="leading-relaxed">
              This guide explains Nepal&apos;s Bluebook-renewal system using the national legal framework, provincial transport systems, and government-published Economic Acts. Tax rates are from FY2082/83 provincial legislation and may change with each year&apos;s new Economic Act. It is an independent resource based on published sources, not a government document. Because transport laws, provincial tax schedules, online services, penalties, and administrative procedures can change, always verify the current applicable amount with the relevant government authority before payment.
            </p>
            <p className="mt-2 leading-relaxed">
              NepaCalc provides calculations and explanatory information as an independent platform. It does not replace the authority of Nepal&apos;s federal or provincial governments.
            </p>
            <p className="text-slate-400 text-xs mt-3">
              Published by{' '}
              <span className="text-slate-500 font-medium">NepaCalc Editorial Team</span>
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
                    <td className="py-2 pr-6 text-slate-500 whitespace-nowrap">19 Sep 2026</td>
                    <td className="py-2 text-slate-600">
                      Major content update: full province tax matrix with FY2082/83 data for all 7 provinces, step-by-step renewal guide, Bagmati bike and car tax slabs, late fine structure, Nagarik App online portal guide, expanded FAQ (20 questions), updated metadata and schema.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6 text-slate-500 whitespace-nowrap">6 Sep 2026</td>
                    <td className="py-2 text-slate-600">
                      Initial publication. National renewal framework, provincial online-service map and government portal links reviewed. All seven provincial EDL/VRS portal statuses checked.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── RELATED TOOLS & GUIDES ── */}
          <section className="mt-10 mb-2">
            <h2 className="font-bold text-slate-900 text-lg mb-4">Related Nepal Calculators &amp; Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator/nepal-vehicle-tax/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Nepal Vehicle Tax Calculator</h3>
                <p className="text-sm text-slate-600">Calculate annual road tax, EV tax, and late fines for your specific vehicle and province.</p>
              </Link>
              <Link href="/nepal/nepal-budget/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Nepal Budget Highlights</h3>
                <p className="text-sm text-slate-600">Review major financial highlights, tax changes and provisions from the national budget.</p>
              </Link>
              <Link href="/calculator/nepali-date/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Nepali Date Converter</h3>
                <p className="text-sm text-slate-600">Accurately convert dates between Bikram Sambat (BS) and Gregorian (AD).</p>
              </Link>
              <Link href="/calculator/nepal-income-tax/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Nepal Income Tax Calculator</h3>
                <p className="text-sm text-slate-600">Calculate your personal income tax liability based on the latest FY slabs.</p>
              </Link>
              <Link href="/calculator/property-tax/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Property Tax Calculator</h3>
                <p className="text-sm text-slate-600">Estimate municipal property taxes and land revenue based on local government rates.</p>
              </Link>
              <Link href="/calculator/nepal-salary/" className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 mb-1">Nepal Salary Calculator</h3>
                <p className="text-sm text-slate-600">Convert gross salary to net take-home pay with SSF, EPF and tax deductions.</p>
              </Link>
            </div>
          </section>

          </div>
          {/* ── END OF MAIN CONTENT COLUMN ── */}

          {/* ── Table of Contents (Desktop Sidebar) ── */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#dadce0 transparent' }}>
            <div className="pr-4">
              <span style={{
                display: 'block',
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#70757a',
                marginBottom: '8px',
                fontWeight: 700,
              }}>On This Page</span>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '2px solid #e8eaed' }}>
                {[
                  ['#quick-answer', 'What Is Bluebook Renewal?'],
                  ['#steps', 'Step-by-Step Renewal Guide'],
                  ['#province-guide', "Province-by-Province Tax Rates"],
                  ['#bike', 'Motorcycle & Scooter Renewal'],
                  ['#car', 'Car & Jeep Renewal'],
                  ['#late-renewal', 'Late Renewal Fines & Penalties'],
                  ['#online', 'Online Renewal (Nagarik App & Portals)'],
                  ['#documents', 'Required Documents'],
                  ['#calculate', 'How to Estimate Total Cost'],
                  ['#tax-vs-renewal', 'Tax vs Renewal'],
                  ['#ev', 'Electric Vehicle Renewal'],
                  ['#commercial', 'Public & Commercial Vehicles'],
                  ['#insurance', 'Insurance & Pollution Requirements'],
                  ['#mistakes', 'Common Mistakes to Avoid'],
                  ['#faq', 'Frequently Asked Questions'],
                  ['#sources', 'Official Sources & Verification'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:!text-[#1a73e8] hover:!border-l-[#1a73e8]"
                      style={{
                        display: 'block',
                        padding: '6px 0 6px 14px',
                        fontSize: '0.82rem',
                        color: '#5f6368',
                        textDecoration: 'none',
                        borderLeft: '2px solid transparent',
                        marginLeft: '-2px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          </div>

        </main>
      </div>
    </>
  );
}
