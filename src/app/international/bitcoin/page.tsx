// Route: /international/bitcoin/
import { Metadata } from 'next';
import InternationalGSRClient from '../gold-silver-ratio/InternationalGSRClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Bitcoin Price Today (BTC/USD) | Real-Time Chart, Sats & Digital Gold Tracker',
  description:
    'Track live Bitcoin price in USD (BTC/USD) with real-time interactive charts, 21M hard cap supply economics, Bitcoin-to-gold valuation metrics, and bullion comparison analytics.',
  keywords: [
    'bitcoin price today',
    'live btc usd chart',
    'bitcoin spot price usd',
    'bitcoin vs gold',
    'digital gold satoshi valuation',
    'buy gold with bitcoin',
    'bitcoin market cap vs precious metals',
    'btc price real time',
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
      name: 'Why is Bitcoin referred to as Digital Gold?',
      acceptedAnswer: {
        text: 'Bitcoin shares key monetary properties with physical gold: scarcity, divisibility, durability, and absence of counterparty risk. Like gold, which cannot be created arbitrarily by governments, Bitcoin has an algorithmically enforced maximum supply cap of 21,000,000 coins. Because it is digital, it can be transferred across international borders in minutes with negligible friction.',
      },
    },
    {
      name: 'How do bullion dealers treat Bitcoin payments for physical metals?',
      acceptedAnswer: {
        text: 'Major online bullion exchanges (such as JM Bullion and APMEX) accept Bitcoin for physical gold, silver, and platinum purchases. Because cryptocurrency payments eliminate credit card processing chargebacks and credit merchant interchange fees (often 2.5% to 3.5%), dealers frequently pass on cash-equivalent discounts (typically 3% to 4%) to customers paying via Bitcoin.',
      },
    },
    {
      name: 'What is a Satoshi and how is Bitcoin subdivided?',
      acceptedAnswer: {
        text: 'A Satoshi (often called a "Sat") is the smallest unit of Bitcoin recorded on the blockchain ledger. Each Bitcoin is divisible into 100,000,000 Satoshis. For everyday transactions and micropayments, users can price goods in sats (for example, 1,000 sats equals 0.00001 BTC).',
      },
    },
    {
      name: 'How does the Bitcoin-to-Gold ratio work?',
      acceptedAnswer: {
        text: 'The Bitcoin-to-Gold ratio measures how many troy ounces of physical gold are required to purchase one Bitcoin. Dividing the current BTC price ($73,346.60) by the gold spot price ($4,091.25) yields a ratio of approximately 17.93 oz of gold per BTC. Macro investors track this metric to observe capital rotation between traditional physical safe havens and decentralized digital commodities.',
      },
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Structural Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <div id="bitcoin-hub">
        <InternationalGSRClient initialAsset="btcusd" />
      </div>

      {/* SEO Editorial Insights & FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            About Bitcoin Monetary Architecture, Halving Cycles &amp; Bullion Synergy
          </h2>
          <p>
            Launched in January 2009 by the pseudonymous creator Satoshi Nakamoto, Bitcoin is the world first 
            decentralized, proof-of-work digital currency. With no central bank issuer, no administrator, and 
            a strict programmatic issuance rate that halves every 210,000 blocks (roughly every four years), 
            Bitcoin was architected specifically to resist fiat monetary debasement.
          </p>
          <p>
            In institutional portfolio allocation, Bitcoin increasingly acts as a high-beta companion to 
            physical gold and silver. While precious metals provide tangible physical sovereignty free of power 
            grids or internet connections, Bitcoin offers instant global settlement and programmatic verifiability. 
            Savvy allocators actively trade the BTC/Gold ratio to rebalance digital gains into perpetual physical metal stacks.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Bitcoin &amp; Metals
          </h3>
          <div className="space-y-4 divide-y divide-gray-100 text-sm">
            {faqItems.map((item, idx) => (
              <div key={idx} className={idx === 0 ? '' : 'pt-4'}>
                <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Related Markets:</span>
            <Link href="/international/gold-silver-ratio/" className="text-blue-600 hover:underline">Gold-Silver Ratio</Link>
            <span>&bull;</span>
            <Link href="/international/platinum/" className="text-blue-600 hover:underline">Platinum Price</Link>
            <span>&bull;</span>
            <Link href="/international/palladium/" className="text-blue-600 hover:underline">Palladium Price</Link>
            <span>&bull;</span>
            <Link href="/international/copper/" className="text-blue-600 hover:underline">Copper Price</Link>
            <span>&bull;</span>
            <Link href="/international/dubai-gold-rate/" className="text-blue-600 hover:underline">Dubai Gold Rate</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
