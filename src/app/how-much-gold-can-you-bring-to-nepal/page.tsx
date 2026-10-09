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
      'Duty-free jewellery limits, raw gold allowances, customs duty and official Nepal rules — verified against the Department of Customs.',
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
        text: 'According to the Department of Customs, the duty-free gold jewellery allowance is up to 25 grams for men and up to 50 grams for women. These limits apply to gold jewellery, not raw gold.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I bring raw gold to Nepal from abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to the Department of Customs, Nepali passengers arriving from abroad may bring up to 100 grams of raw gold by paying customs duty. Do not assume the jewellery allowance applies to raw gold, bars or coins.',
      },
    },
    {
      '@type': 'Question',
      name: 'What customs duty do I pay on gold brought to Nepal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The exact customs duty rate on gold in Nepal is set in Schedule 4 of the Customs Tariff Act. The applicable rate should be verified directly with the Department of Customs before travelling, as rates can change annually.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I bring more gold than allowed into Nepal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold and gold jewellery brought in excess of the permitted allowance is subject to customs duty. If undeclared excess gold is detected at the border, it may be confiscated and the passenger may face additional penalties under customs law.',
      },
    },
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
            <p className="text-amber-900 text-sm leading-relaxed">
              According to the <strong>Department of Customs</strong>, the duty-free allowance for gold jewellery is{' '}
              <strong>up to 25 grams for men</strong> and <strong>up to 50 grams for women</strong>. Nepali passengers may also bring up to{' '}
              <strong>100 grams of raw gold by paying customs duty</strong>. These limits should always be checked against the latest official rules before travelling, as they can change.
            </p>
          </div>

          {/* ── Section 2: How Much Gold ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              How Much Gold Can You Bring to Nepal?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The amount of gold you can bring to Nepal depends on whether you are carrying gold jewellery or raw gold, and whether the gold falls within the duty-free allowance or requires customs duty. If you are planning to buy gold abroad, checking the{' '}
              <Link href="/market-rates/live-gold-price/" className="text-blue-600 font-bold hover:underline">live gold price in Nepal</Link>{' '}
              can help you understand the local market value before you travel.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              According to the Department of Customs, the duty-free allowance for gold jewellery is <strong>up to 25 grams for men and 50 grams for women</strong>. The guidelines separately state that Nepali passengers arriving from abroad may bring up to{' '}
              <strong>100 grams of raw gold by paying customs duty</strong>. These figures should be checked against the Department&apos;s latest passenger-goods notice before travelling, as customs rules may change.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are returning to Nepal from abroad, check the applicable allowance for your type of gold before your journey. Do not assume that the duty-free allowance for jewellery also applies to gold bars, coins, or other forms of raw gold.
            </p>

            {/* Allowance table */}
            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Passenger</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Type of Gold</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Allowance</th>
                    <th className="px-4 py-3 text-left font-black text-slate-900 text-[11px] uppercase tracking-wider">Duty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Men</td><td className="px-4 py-3">Gold jewellery</td><td className="px-4 py-3 font-bold">Up to 25 g</td><td className="px-4 py-3 text-green-700 font-bold">Duty-free</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Women</td><td className="px-4 py-3">Gold jewellery</td><td className="px-4 py-3 font-bold">Up to 50 g</td><td className="px-4 py-3 text-green-700 font-bold">Duty-free</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Men</td><td className="px-4 py-3">Gold jewellery (additional)</td><td className="px-4 py-3 font-bold">Up to 100 g extra</td><td className="px-4 py-3 text-amber-700 font-bold">Duty payable</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Women</td><td className="px-4 py-3">Gold jewellery (additional)</td><td className="px-4 py-3 font-bold">Up to 100 g extra</td><td className="px-4 py-3 text-amber-700 font-bold">Duty payable</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold">Any passenger</td><td className="px-4 py-3">Raw gold</td><td className="px-4 py-3 font-bold">Up to 100 g</td><td className="px-4 py-3 text-amber-700 font-bold">Duty payable</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-slate-500 not-prose">
              Source: Department of Customs. Verify before travelling rules may change.
            </p>
          </section>

          {/* ── Section 3: Gold Jewellery vs Raw Gold ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Gold Jewellery vs Raw Gold: What Is the Difference?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nepal&apos;s customs rules treat gold jewellery and raw gold as separate categories, each with its own allowance and duty structure. Confusing the two categories is one of the most common errors travellers make at the border.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Gold jewellery</strong> refers to finished ornaments worn or carried as personal accessories. The duty-free allowance for gold jewellery is set at 25 grams for men and 50 grams for women, and additional jewellery beyond those limits may be brought in subject to customs duty.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Raw gold</strong> refers to unprocessed or semi-processed gold such as bars, coins, bullion, and other forms that are not finished jewellery. The duty-free allowance that applies to jewellery does not automatically apply to raw gold. If you know the weight of your items in international units, a{' '}
              <Link href="/calculator/gold-converter/" className="text-blue-600 font-bold hover:underline">gold converter</Link>{' '}
              can help translate that into grams for Nepali customs.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4 not-prose">
              <p className="text-red-900 text-sm font-semibold leading-relaxed">
                Important: Do not assume the jewellery allowance applies to gold bars, coins or other raw gold. The categories are treated separately by Nepal Customs.
              </p>
            </div>
          </section>

          {/* ── Section 4: Foreign Tourists ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Rules for Foreign Tourists Bringing Gold to Nepal
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Foreign tourists visiting Nepal are subject to different customs provisions than Nepali passport holders returning from abroad. Tourists are generally permitted to bring personal gold jewellery for their own use as part of their baggage allowance, but the rules differ from the allowances that apply to returning Nepali citizens.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are a foreign tourist carrying gold into Nepal, you should declare it at customs if the value or quantity exceeds the applicable duty-free threshold. Carrying undeclared gold in excess of the permitted limit risks confiscation and penalties.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Confirm the exact allowance for foreign visitors directly with the{' '}
              <a href="https://www.customs.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 font-bold hover:underline">
                Department of Customs
              </a>{' '}
              before your journey, as the provisions for tourists are separate from those for Nepali nationals.
            </p>
          </section>

          {/* ── Section 5: Customs Duty ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              How Much Customs Duty Must You Pay on Gold in Nepal?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The customs duty payable on gold brought into Nepal depends on the applicable customs rules, the type and quantity of gold, and whether the gold falls within a passenger allowance.
            </p>
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">How Is Gold Customs Duty Determined?</h3>
            <p className="text-slate-700 leading-relaxed mb-2">Before calculating customs duty, confirm:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
              <li>Whether the gold is jewellery or raw gold.</li>
              <li>Whether it falls within the applicable duty-free allowance.</li>
              <li>Whether the passenger is eligible to bring the additional quantity under the current rules.</li>
              <li>Which customs duty rate applies to that category of gold.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              Do not assume that the same duty rate or allowance applies to jewellery, gold bars, and other forms of gold.
            </p>
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Check the Latest Official Customs Tariff</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Nepal&apos;s Department of Customs publishes its integrated customs tariff, which is the official source to consult for applicable tariff rates. The exact customs duty rate is defined in Schedule 4 of the Customs Tariff Act, which can be verified via the{' '}
              <a href="https://lawcommission.gov.np/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">
                Nepal Law Commission
              </a>
              .
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 not-prose">
              <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                Important: Confirm the current rate with Nepal Customs before travelling. A rate quoted in an older article may no longer apply.
              </p>
            </div>
          </section>

          {/* ── Section 6: What Happens ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              What Happens If You Bring More Gold Than Allowed?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Bringing gold into Nepal in excess of the permitted allowance without paying the applicable customs duty is a customs violation. The Department of Customs published{' '}
              <a href="https://www.customs.gov.np/content/140/information-of-private-use-goods-that-passengers/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">
                passenger-goods notice
              </a>{' '}
              sets out specific consequences for passengers who carry gold beyond the allowed limit.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Gold and gold jewellery brought in excess of the permitted limit and not declared at the customs checkpoint may be:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
              <li><strong>Confiscated</strong> by customs officials at the point of entry.</li>
              <li>Subject to <strong>additional penalties</strong> under Nepal&apos;s customs law, including fines.</li>
              <li>Treated as a customs offence in cases of deliberate concealment.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              If you are carrying gold that may exceed the allowance, declare it at the customs desk on arrival. Paying the applicable duty is far less costly than risking confiscation or a penalty.
            </p>
          </section>

          {/* ── Section 7: Practical Tips ── */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Practical Tips Before You Travel
            </h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-3">
              <li><strong>Check the official rules before you travel.</strong> The Department of Customs and the passenger-goods notice are the authoritative sources. Read them directly rather than relying solely on third-party summaries.</li>
              <li><strong>Weigh your gold before your journey.</strong> Know the exact weight of any gold jewellery or raw gold you are carrying. Customs checks are conducted on weight, not estimated value alone.</li>
              <li><strong>Keep receipts and documentation.</strong> If you purchased gold abroad, carry the original receipt. This can support your declaration at the customs desk and may be required to confirm the nature and value of the item.</li>
              <li><strong>Declare voluntarily if in doubt.</strong> If you are uncertain whether your gold exceeds the allowance, declare it at the customs checkpoint. Voluntary declaration and payment of applicable duty is always the safest approach.</li>
              <li><strong>Calculate potential levies.</strong> If you are bringing raw gold or excess jewellery, you will need to pay customs duty. You can use a{' '}
                <Link href="/calculator/gold-tax/" className="text-blue-600 hover:underline">gold tax calculator</Link>{' '}
                to estimate your expenses in advance.
              </li>
              <li><strong>Do not mix categories.</strong> Do not carry raw gold and jewellery and assume they share a single combined allowance. Each category is assessed separately.</li>
              <li><strong>Check for annual updates.</strong> Nepal&apos;s customs tariff and passenger allowances are reviewed each fiscal year. What applied last year may not apply this year.</li>
            </ul>
          </section>

          {/* ── Section 8: FAQ ── */}
                      <section className="mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">How much gold can I bring to Nepal duty-free?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    According to the Department of Customs, the duty-free gold jewellery allowance is up to 25 grams for men and up to 50 grams for women. These limits apply to gold jewellery, not raw gold. For broader context on market rules, read the <Link href="/blog/nepal-gold-price-analysis-2083/" className="text-blue-600 hover:underline">Nepal gold price analysis for 2083</Link>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Can I bring raw gold to Nepal from abroad?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">According to the Department of Customs, Nepali passengers arriving from abroad may bring up to 100 grams of raw gold by paying customs duty. Do not assume the jewellery allowance applies to raw gold, bars or coins.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">What customs duty do I pay on gold brought to Nepal?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">The exact customs duty rate on gold in Nepal is set in Schedule 4 of the Customs Tariff Act. The applicable rate should be verified directly with the Department of Customs before travelling, as rates can change annually.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Does the jewellery allowance apply to gold bars and coins?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">No. The duty-free jewellery allowance applies specifically to gold jewellery. Gold bars, coins and other forms of raw or semi-processed gold are assessed under a separate provision. Do not assume the same limit applies.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">What happens if I bring more gold than allowed into Nepal?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">Gold and gold jewellery brought in excess of the permitted allowance is subject to customs duty. If undeclared excess gold is detected at the border, it may be confiscated and the passenger may face additional penalties under customs law.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Do the gold allowance rules apply to foreign tourists?</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Foreign tourists are subject to different customs provisions than returning Nepali nationals. Confirm the specific allowance with the <a href="https://tiairport.com.np/public/index.php/faq/en" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">Tribhuvan International Airport guidelines</a> before your journey.
                  </p>
                </div>
              </div>
            </section>

          {/* ── Section 9: Related Pages ── */}
          <section className="mb-4">
              <h2 className="text-2xl font-black text-slate-900 mb-3 border-b border-slate-100 pb-2 not-prose">
                Related Pages
              </h2>
              <div className="grid sm:grid-cols-2 gap-2 not-prose">
                {[
                  { href: '/market-rates/', label: 'Daily Market Rates Overview' },
                  { href: '/market-rates/silver-price-nepal/', label: 'Live Silver Price in Nepal' },
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
            </section>

        </article>
      </div>
    </div>
  );
}
