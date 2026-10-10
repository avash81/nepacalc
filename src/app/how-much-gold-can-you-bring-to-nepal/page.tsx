import type { Metadata } from 'next';
import Link from 'next/link';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'How Much Gold Can You Bring to Nepal? (Official Rules)',
  description:
    'Find out how much gold you can bring to Nepal. Check duty-free jewellery limits, raw gold allowances, customs duty rates and official rules.',
  keywords: [
    'how much gold can you bring to nepal',
    'gold allowance nepal',
    'nepal gold import rules',
    'gold customs duty nepal',
    'gold jewellery allowance nepal',
    'raw gold nepal airport',
    'nepal gold limit 2083',
    'bring gold to nepal from abroad',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/',
  },
  openGraph: {
    title: 'How Much Gold Can You Bring to Nepal? (Official Rules)',
    description:
      'Duty-free jewellery limits, raw gold allowances, customs duty and official Nepal rules verified against the Department of Customs.',
    url: 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/',
    siteName: 'NepaCalc',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Gold Can You Bring to Nepal? (Official Rules)',
    description:
      'Duty-free jewellery limits, raw gold allowances, customs duty and official Nepal rules.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/#article',
  headline: 'How Much Gold Can You Bring to Nepal?',
  description:
      'Duty-free jewellery limits, raw gold allowances, customs duty and official Nepal rules.',
  url: 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/',
  datePublished: '2026-10-09',
  dateModified: new Date().toISOString().split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'NepaCalc',
    url: 'https://nepacalc.com/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NepaCalc',
    logo: { '@type': 'ImageObject', url: 'https://nepacalc.com/logo.png' },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/',
  },
  inLanguage: 'en',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'How Much Gold Can You Bring to Nepal?',
      item: 'https://nepacalc.com/how-much-gold-can-you-bring-to-nepal/',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much gold can I bring to Nepal duty-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CAANs AIP customs guidance dated 30 April 2024 lists up to 25 grams of gold ornaments for men and up to 50 grams for women as duty-free. Check the latest Department of Customs passenger-goods notice to confirm whether these limits and conditions remain applicable to your journey.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I bring raw gold to Nepal from abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Raw gold is a separate category from finished jewellery. Do not assume that the jewellery allowance applies to gold bars, coins or bullion. Check the current official rules or contact the Department of Customs to confirm whether your item is permitted and what duties or other conditions apply.',
      },
    },
    {
      '@type': 'Question',
      name: 'What customs duty do I pay on gold brought to Nepal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The amount depends on the applicable customs classification, passenger provisions, quantity and current tariff rate. Check the official integrated customs tariff and confirm the rate with Customs before travelling. This page does not quote a specific rate because the applicable rate must be verified for the item and current rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the jewellery allowance apply to gold bars and coins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do not assume that it does. Gold bars, coins and other forms of raw gold may be treated differently from finished ornaments. Confirm the applicable provision with Customs before carrying them into Nepal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I bring more gold than the permitted allowance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You may need to declare the gold and pay the applicable duty, but the outcome depends on the current rules and the circumstances. Additional restrictions or enforcement action may apply. Confirm the requirements with Customs before travelling rather than assuming that excess gold can always be brought in by paying duty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do the gold allowance rules apply to foreign tourists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The provisions that apply may depend on the passengers circumstances. Foreign visitors should check the current official passenger-goods notice and confirm the applicable allowance directly with Customs instead of assuming that the rules for returning Nepali citizens also apply to them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I check the official rules for bringing gold to Nepal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with the Department of Customs passenger-goods notice and the CAAN AIP customs requirements. For tariff classifications and rates, consult the Department of Customs integrated tariff. If the published information does not clearly cover your item, contact Customs before travelling.',
      },
    }
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold">How Much Gold Can You Bring to Nepal?</span>
        </nav>

        {/* Article */}
        <article className="prose prose-slate max-w-none">

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6 not-prose">
            How Much Gold Can You Bring to Nepal?
          </h1>

          {/* ── Section 1: Quick Answer ── */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10 not-prose">
            <h2 className="text-lg font-bold text-amber-900 mb-3">Quick Answer</h2>
            <p className="text-amber-900 text-sm leading-relaxed mb-4">
              Nepal&apos;s Civil Aviation Authority of Nepal (CAAN) AIP customs guidance dated 30 April 2024 lists a duty-free allowance of <strong>up to 25 grams of gold ornaments for men</strong> and <strong>50 grams for women</strong>. This guidance should not be treated as confirmation that the same limits remain unchanged under the latest customs rules.
            </p>
            <p className="text-amber-900 text-sm leading-relaxed">
              Gold jewellery and raw gold, such as bars or bullion, may be subject to different customs provisions. Before travelling, check the latest{' '}
              <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="font-bold underline hover:text-amber-700">Department of Customs passenger-goods notice</a>{' '}
              and confirm the rules that apply to your nationality and the type of gold you are carrying.
            </p>
          </div>

          {/* ── Section 2: How Much Gold ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              How Much Gold Can You Bring to Nepal?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The amount of gold you can bring into Nepal depends on the type of gold, the applicable passenger allowance, and whether customs duty is payable. If you are buying gold abroad, checking the{' '}
              <Link href="/market-rates/live-gold-price/" className="text-blue-600 font-bold hover:underline">live gold price in Nepal</Link>{' '}
              can help you compare prices before your trip.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              CAAN&apos;s AIP customs guidance, dated 30 April 2024, lists the following duty-free allowance for gold ornaments:
            </p>

            {/* Allowance table */}
            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Passenger</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Type of gold</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Allowance listed in the CAAN AIP</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Customs treatment stated in that guidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Men</td><td className="px-4 py-3">Gold ornaments</td><td className="px-4 py-3 font-bold">Up to 25 g</td><td className="px-4 py-3 font-bold text-green-700">Duty-free</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Women</td><td className="px-4 py-3">Gold ornaments</td><td className="px-4 py-3 font-bold">Up to 50 g</td><td className="px-4 py-3 font-bold text-green-700">Duty-free</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 not-prose">
              <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                Important: These figures come from the dated CAAN AIP guidance. Check the latest Department of Customs passenger-goods notice before relying on them for a current journey. The current allowance and treatment of additional jewellery or raw gold should be confirmed with Customs.
              </p>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4 mt-6">
              Official sources:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
              <li>
                <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Department of Customs: Passenger-goods notice</a>
              </li>
              <li>
                <a href="https://e-aip.caanepal.gov.np/_uploads/_pdf/781312de50dea9a38fba9585f5d3e1d1.pdf" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">CAAN AIP: Customs requirements for passengers (PDF)</a>
              </li>
            </ul>
          </section>

          {/* ── Section 3: Gold Jewellery vs Raw Gold ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Gold Jewellery vs Raw Gold: What Is the Difference?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Gold jewellery and raw gold should not be treated as the same category when checking Nepal&apos;s customs rules. The applicable allowance and duty treatment may differ according to the form of gold and the passenger provisions in force.
            </p>
            
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Gold Jewellery</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Gold jewellery means finished ornaments worn or carried as personal accessories. The CAAN AIP guidance dated 30 April 2024 lists duty-free allowances of up to 25 grams for men and 50 grams for women.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The same guidance notes that items such as rings, bangles and chains made in ordinary ornament shapes without chemicals are not accepted as ornaments under its stated provisions. If you are carrying jewellery that may not qualify as an ornament, ask Customs how it will be classified.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Raw Gold, Bars and Coins</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Raw gold is different from finished jewellery. Gold bars, bullion, coins and other forms of gold should not automatically be assumed to qualify for the jewellery allowance.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Before travelling with raw gold, check the latest passenger-goods notice and ask the Department of Customs which provisions, duties and restrictions apply to your particular item.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you need to convert a gold weight from ounces or another unit into grams, use a{' '}
              <Link href="/calculator/gold-converter/" className="text-blue-600 font-bold hover:underline">gold weight converter</Link>{' '}
              before checking the applicable customs limit.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4 not-prose">
              <p className="text-red-900 text-sm font-semibold leading-relaxed">
                Remember: Do not assume that the jewellery allowance also applies to gold bars, coins or bullion. Confirm the rules for the exact form of gold you plan to carry.
              </p>
            </div>
          </section>

          {/* ── Section 4: Foreign Tourists ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Rules for Foreign Tourists Bringing Gold to Nepal
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Foreign visitors entering Nepal should check the customs provisions that apply to their circumstances. The allowance for a foreign tourist should not automatically be assumed to be the same as the allowance for a Nepali citizen returning from abroad.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are visiting Nepal with personal gold jewellery, check the current passenger-goods rules before travelling. If the gold you carry may exceed the applicable duty-free allowance, or if you are unsure how it should be classified, contact Customs for guidance on whether you need to declare it and pay duty.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The CAAN AIP guidance dated 30 April 2024 provides customs information for passengers arriving on international flights. However, the exact current allowance for your situation should be confirmed against the latest official rules.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Official reference:{' '}
              <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">
                Department of Customs passenger-goods notice
              </a>.
            </p>
          </section>

          {/* ── Section 5: Customs Duty ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              How Much Customs Duty Must You Pay on Gold in Nepal?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The amount of customs duty payable on gold depends on the applicable rules, the category and quantity of gold, and the passenger&apos;s eligibility for any concession.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Do not assume that one duty rate applies to all gold jewellery, bars, coins or bullion. First establish how Customs classifies the item and whether a passenger allowance applies.
            </p>
            
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">How Is Gold Customs Duty Determined?</h3>
            <p className="text-slate-700 leading-relaxed mb-2">Before estimating the duty on gold brought into Nepal, confirm:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
              <li><strong>Type of gold:</strong> Is it finished jewellery, a bar, a coin or another form of gold?</li>
              <li><strong>Passenger eligibility:</strong> Which customs provisions apply to your nationality and circumstances?</li>
              <li><strong>Quantity:</strong> What is the total weight of the gold you are carrying?</li>
              <li><strong>Allowance:</strong> Does the item qualify for a duty-free or other passenger concession?</li>
              <li><strong>Applicable rate:</strong> What duty and other charges, if any, apply under the current rules?</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Once these details are confirmed, you can estimate the potential cost. A calculator can help with an estimate, but it cannot determine your legal eligibility for a customs concession.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Check the Latest Official Customs Tariff</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Department of Customs publishes Nepal&apos;s integrated customs tariff, which is an official starting point for checking tariff classifications and applicable rates.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
              <li>
                <a href="https://customs.gov.np/content/46/integrated-tariff-rate/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Department of Customs: Integrated Tariff Rate</a>
              </li>
              <li>
                <a href="https://mof.gov.np/content/1742/economic-bill--2083/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Ministry of Finance: Economic Bill 2083</a>
              </li>
              <li>
                <a href="https://lawcommission.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Nepal Law Commission</a>
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              The rate applicable to a particular item should be checked against the current tariff and relevant legal provisions. Do not rely on an older article or an estimated calculator result as a substitute for confirmation from Customs.
            </p>
          </section>

          {/* ── Section 6: What Happens ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              What Happens If You Bring More Gold Than Allowed?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you carry gold that exceeds the applicable passenger allowance, you may need to declare it and pay the duty required under the current rules. The consequences depend on the item, the applicable legal provisions and the circumstances of the case.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Do not assume that excess gold can automatically be brought into Nepal simply by paying duty. Some items or circumstances may be subject to additional restrictions or enforcement action.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are unsure whether your gold is permitted, contact the Department of Customs before travelling. On arrival, follow the instructions of customs officials and use the Red Channel if you are carrying goods that must be declared.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The CAAN AIP explains that passengers carrying prohibited, controlled or dutiable goods should declare them through the Red Channel. Passengers who do not have goods exceeding the applicable duty-free concession may use the Green Channel, but they may still be checked.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Official reference:{' '}
              <a href="https://e-aip.caanepal.gov.np/_uploads/_pdf/781312de50dea9a38fba9585f5d3e1d1.pdf" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">
                CAAN AIP customs requirements (PDF)
              </a>.
            </p>
          </section>

          {/* ── Section 7: Practical Tips ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Practical Tips Before You Travel
            </h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-3">
              <li><strong>Check the latest official rules.</strong> Read the{' '}
                <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Department of Customs passenger-goods notice</a>{' '}
                before travelling. Do not rely solely on older articles or summaries.
              </li>
              <li><strong>Weigh your gold in advance.</strong> Know the weight of the jewellery or other gold you plan to carry. Use a{' '}
                <Link href="/calculator/gold-converter/" className="text-blue-600 hover:underline">gold weight converter</Link>{' '}
                if you need to convert another unit into grams.
              </li>
              <li><strong>Keep purchase documents if available.</strong> Receipts or other documents can help explain where the gold came from and its purchase details. Ask Customs whether any particular documents are required for your situation.</li>
              <li><strong>Confirm the category of gold.</strong> Do not assume that jewellery, bars, coins and bullion have the same allowance or duty treatment.</li>
              <li><strong>Ask before travelling if you are unsure.</strong> Contact the Department of Customs to confirm the current allowance, applicable duty and declaration requirements for your specific item.</li>
              <li><strong>Declare goods when required.</strong> If the goods you are carrying are dutiable, controlled or otherwise required to be declared, follow the customs declaration procedure.</li>
              <li><strong>Check the rules again before each trip.</strong> Customs notices, tariff rates and passenger provisions may be revised. Use the latest official information rather than assuming last year&apos;s rules still apply.</li>
            </ul>
          </section>

          {/* ── Section 8: FAQ ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">How Much Gold Can I Bring to Nepal Duty-Free?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  CAAN&apos;s AIP customs guidance dated 30 April 2024 lists up to 25 grams of gold ornaments for men and up to 50 grams for women as duty-free. Check the latest Department of Customs passenger-goods notice to confirm whether these limits and conditions remain applicable to your journey.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Can I Bring Raw Gold to Nepal from Abroad?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Raw gold is a separate category from finished jewellery. Do not assume that the jewellery allowance applies to gold bars, coins or bullion. Check the current official rules or contact the Department of Customs to confirm whether your item is permitted and what duties or other conditions apply.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">What Customs Duty Do I Pay on Gold Brought to Nepal?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  The amount depends on the applicable customs classification, passenger provisions, quantity and current tariff rate. Check the <a href="https://customs.gov.np/content/46/integrated-tariff-rate/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">official integrated customs tariff</a> and confirm the rate with Customs before travelling. This page does not quote a specific rate because the applicable rate must be verified for the item and current rules.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Does the Jewellery Allowance Apply to Gold Bars and Coins?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Do not assume that it does. Gold bars, coins and other forms of raw gold may be treated differently from finished ornaments. Confirm the applicable provision with Customs before carrying them into Nepal.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">What Happens If I Bring More Gold Than the Permitted Allowance?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  You may need to declare the gold and pay the applicable duty, but the outcome depends on the current rules and the circumstances. Additional restrictions or enforcement action may apply. Confirm the requirements with Customs before travelling rather than assuming that excess gold can always be brought in by paying duty.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Do the Gold Allowance Rules Apply to Foreign Tourists?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  The provisions that apply may depend on the passenger&apos;s circumstances. Foreign visitors should check the current official passenger-goods notice and confirm the applicable allowance directly with Customs instead of assuming that the rules for returning Nepali citizens also apply to them.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Where Can I Check the Official Rules for Bringing Gold to Nepal?</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Start with the <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Department of Customs passenger-goods notice</a> and the <a href="https://e-aip.caanepal.gov.np/_uploads/_pdf/781312de50dea9a38fba9585f5d3e1d1.pdf" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">CAAN AIP customs requirements</a>. For tariff classifications and rates, consult the <a href="https://customs.gov.np/content/46/integrated-tariff-rate/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Department of Customs integrated tariff</a>. If the published information does not clearly cover your item, contact Customs before travelling.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 9: Related Pages ── */}
          <section className="mb-4 mt-10">
            <h2 className="text-2xl font-black text-slate-900 mb-3 border-b border-slate-100 pb-2 not-prose">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-2 gap-2 not-prose">
              {[
                { href: '/market-rates/live-gold-price/', label: 'Live Gold Price in Nepal' },
                { href: '/calculator/gold-converter/', label: 'Gold Weight Converter' },
                { href: '/calculator/gold-tax/', label: 'Gold Tax Calculator' },
                { href: '/market-rates/silver-price-nepal/', label: 'Live Silver Price in Nepal' },
                { href: '/market-rates/', label: 'Daily Market Rates Overview' },
                { href: '/market-rates/exchange-rate-nepal/', label: 'NRB Foreign Exchange Rate' },
                { href: '/market-rates/remittance/', label: 'Latest Remittance Rates' },
                { href: '/market-rates/history/', label: 'Historical Market Rates' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic mt-6">
              Editorial note: The gold-ornament figures in this article are attributed to the CAAN AIP customs guidance dated 30 April 2024. Confirm the current passenger-goods notice and applicable tariff before publishing any specific allowance for additional jewellery or raw gold, or any exact duty rate or penalty. Update this article when the relevant current official provision has been verified.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}
