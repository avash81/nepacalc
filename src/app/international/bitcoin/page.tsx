// Route: /international/bitcoin/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Bitcoin Price Today (BTC/USD) | Real-Time Chart, Sats & Digital Gold Tracker',
  description:
    'Track live Bitcoin price in USD (BTC/USD) with real-time interactive charts, 21M hard cap supply economics, Bitcoin-to-gold valuation metrics, and bullion dealer cash discounts.',
  keywords: [
    'bitcoin price today',
    'live btc usd chart',
    'bitcoin spot price usd',
    'bitcoin vs gold',
    'digital gold satoshi valuation',
    'buy gold with bitcoin',
    'bitcoin market cap vs precious metals',
    'btc price real time',
    'bitcoin halving cycle stock to flow',
    'satoshi to usd calculator',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/international/bitcoin/',
  },
  openGraph: {
    title: 'Live Bitcoin Spot Price Today & Interactive Charts (BTC/USD)',
    description:
      'Real-time Bitcoin spot chart, multi-currency pricing, satoshi calculations, and physical precious metals comparisons.',
    url: 'https://nepacalc.com/international/bitcoin/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Bitcoin Price Chart and Precious Metals Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Bitcoin Spot Price Today & Interactive Charts (BTC/USD)',
    description:
      'Real-time Bitcoin spot chart, multi-currency pricing, satoshi calculations, and physical precious metals comparisons.',
    images: ['https://nepacalc.com/images/og/gold-silver-ratio.jpg'],
  },
};

export default function BitcoinPage() {
  const faqItems = [
    {
      name: 'Why is Bitcoin considered Digital Gold by institutional investors?',
      acceptedAnswer: {
        text: 'Bitcoin shares the core economic qualities of physical gold: absolute scarcity, durability, divisibility, and zero counterparty risk. With an immutable programmatic supply limit of 21 million coins and a decentralized proof-of-work consensus network, Bitcoin cannot be debased or diluted by political or central banking authorities.',
      },
    },
    {
      name: 'Why do major bullion dealers offer 3% to 4% discounts when paying with Bitcoin?',
      acceptedAnswer: {
        text: 'Online precious metals mints and dealers (including JM Bullion and APMEX) process Bitcoin payments without paying interchange processing fees (2.5% to 3.5%) to credit card networks. Furthermore, cryptocurrency settlements are irreversible, eliminating fraud and chargeback liability, enabling dealers to pass direct cash-equivalent savings to customers.',
      },
    },
    {
      name: 'What is the Bitcoin-to-Gold ratio and what does it measure?',
      acceptedAnswer: {
        text: 'The Bitcoin-to-Gold ratio calculates how many troy ounces of physical gold are required to buy one Bitcoin (BTC Price divided by Gold Spot Price). Macro allocators track this ratio to measure capital velocity between legacy physical reserve assets and emerging digital monetary networks.',
      },
    },
    {
      name: 'What is a Satoshi and how is it calculated in USD?',
      acceptedAnswer: {
        text: 'A Satoshi (abbreviated sat) is the smallest unit of Bitcoin, equal to one one-hundred-millionth (0.00000001 BTC). If Bitcoin trades at $80,000, 1 US Dollar buys 1,250 satoshis, and 100,000 sats equal $80.00 USD.',
      },
    },
    {
      name: 'How do Bitcoin halving cycles affect stock-to-flow scarcity?',
      acceptedAnswer: {
        text: 'Every 210,000 blocks (roughly every four years), the Bitcoin block subsidy reward paid to miners is cut in half (from 50 BTC in 2009 down to 3.125 BTC in 2024). This programmatic halving drives Bitcoin stock-to-flow ratio above that of physical gold, establishing lower annual issuance than mined gold production.',
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/bitcoin/',
        url: 'https://nepacalc.com/international/bitcoin/',
        name: 'Live Bitcoin Spot Price Today & Interactive Charts (BTC/USD)',
        description:
          'Real-time Bitcoin spot chart, multi-currency pricing, satoshi calculations, and physical precious metals comparisons.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/international/bitcoin/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nepacalc.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'International',
            item: 'https://nepacalc.com/international/gold-silver-ratio/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Bitcoin Price (BTC/USD)',
            item: 'https://nepacalc.com/international/bitcoin/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.acceptedAnswer.text,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* Structural Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="w-full px-3 sm:px-6 lg:px-8 pt-2">
        <nav aria-label="Breadcrumb" className="mb-0.5">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            ← Home
          </Link>

          <div className="hidden sm:flex items-center flex-wrap gap-1.5 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/international/gold-silver-ratio/" className="hover:text-blue-600 hover:underline">International</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Bitcoin Price (BTC/USD)</span>
          </div>
        </nav>
      </div>

      <div id="bitcoin-hub">
        <InternationalGSRClient initialAsset="btcusd" />
      </div>

      {/* ── HIGH-DENSITY BITCOIN SPECIFIC EDITORIAL SECTION ── */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pb-10 space-y-3">
        {/* Deep Dive Guide Container */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Bitcoin Monetary Architecture: Programmatic Scarcity, Halving Cycles &amp; Bullion Synergy
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Evaluating the mathematical properties of Bitcoin against physical precious metals in modern macro portfolios.
            </p>
          </div>

          <p>
            Launched on January 3, 2009 by the pseudonymous creator Satoshi Nakamoto, Bitcoin is the world first decentralized, cryptographic digital money. Designed directly in response to global monetary inflation and sovereign quantitative easing, Bitcoin operates on an open-source peer-to-peer network governed by mathematical consensus rather than governmental decree.
          </p>

          {/* Bitcoin 3-Pillar Fundamental Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">Fixed Supply Hard Cap</span>
              <h3 className="font-bold text-gray-900 text-xs">21,000,000 Total Coin Limit</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Unlike fiat currencies which expand continuously through bank lending and sovereign deficits, Bitcoin supply is mathematically hard-capped. Each coin is divisible into 100,000,000 Satoshis, allowing micro-denominations for global commerce.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wide block">Programmatic Issuance</span>
              <h3 className="font-bold text-gray-900 text-xs">Four-Year Halving Cycles</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Every 210,000 blocks (roughly 4 years), block rewards cut by 50% (most recently to 3.125 BTC in April 2024). By 2140, all 21M coins will be mined, making Bitcoin annual inflation rate lower than mined gold.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">Bullion Dealer Synergy</span>
              <h3 className="font-bold text-gray-900 text-xs">3% to 4% Cash-Equivalent Discounts</h3>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Major online precious metals dealers accept direct on-chain Bitcoin and Lightning payments. By eliminating credit card interchange fees and chargeback fraud, buyers receive the lowest published cash tier pricing on gold and silver coins.
              </p>
            </div>
          </div>

          {/* Bitcoin-to-Gold Macro Spread Analytics */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              The Bitcoin-to-Gold Ratio: How Digital &amp; Tangible Money Complement Each Other
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">The BTC/Gold Ratio as Capital Rotation Barometer</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Dividing Bitcoin spot by gold spot measures how many gold ounces equal 1 BTC. When the ratio reaches cyclical highs, macro stackers frequently take profits by converting digital gains directly into physical gold and silver bars.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/70">
                <span className="font-bold text-gray-900 block">Off-Grid Physical Sovereignty vs Digital Portability</span>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  Precious metals provide off-grid, electromagnetic-pulse-immune physical survival value. Bitcoin provides frictionless borderless transferability across international borders in minutes. Modern resilient investors allocate across both asset classes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section (AEO & People Also Ask Target) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions About Bitcoin, Sats &amp; Precious Metals
          </h2>

          <div className="space-y-4 divide-y divide-gray-100 text-xs sm:text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          {/* Related Tools Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Related Metal Hubs:</span>
            <Link
              href="/international/gold-silver-ratio/"
              className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-2.5 py-1 rounded-full"
            >
              Gold to Silver Ratio &amp; 80/50 Rule →
            </Link>
            <Link
              href="/international/copper/"
              className="text-orange-800 hover:text-orange-950 hover:underline bg-orange-50 px-2.5 py-1 rounded-full"
            >
              Doctor Copper &amp; COMEX Rates →
            </Link>
            <Link
              href="/international/platinum/"
              className="text-sky-800 hover:text-sky-950 hover:underline bg-sky-50 px-2.5 py-1 rounded-full"
            >
              Platinum Live Spot Price →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}