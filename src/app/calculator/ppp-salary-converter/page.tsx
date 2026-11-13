// Route: /calculator/ppp-salary-converter/
import { Metadata } from 'next';
import PPPSalaryClient from './PPPSalaryClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PPP Salary Converter: Compare Cost of Living & Buying Power',
  description:
    'Convert salaries between 32+ countries using World Bank Purchasing Power Parity (PPP) data. Compare true buying power, cost of living, and remote work pay.',
  keywords: [
    'Purchasing Power Parity calculator',
    'Purchasing Power Parity salary converter',
    'PPP salary converter by country',
    'Purchasing Power Parity index',
    'Purchasing Power Parity India vs US',
    'PPP conversion factor World Bank',
    'cost of living salary converter',
    'remote work salary calculator',
    'digital nomad ppp calculator',
    'convert us salary to europe',
  ],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/ppp-salary-converter/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://nepacalc.com/calculator/ppp-salary-converter/',
    title: 'PPP Salary Converter: Compare Cost of Living & Buying Power',
    description:
      'Convert salaries between 32+ countries using World Bank Purchasing Power Parity (PPP) data. Compare true buying power, cost of living, and remote work pay.',
    siteName: 'NepaCalc',
    images: [
      {
        url: 'https://nepacalc.com/images/ppp-salary-converter-og.png',
        width: 1200,
        height: 630,
        alt: 'Purchasing Power Parity (PPP) Salary Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPP Salary Converter: Compare Cost of Living & Buying Power',
    description:
      'Convert salaries between 32+ countries using World Bank Purchasing Power Parity (PPP) data. Compare true buying power, cost of living, and remote work pay.',
    images: ['https://nepacalc.com/images/ppp-salary-converter-og.png'],
  },
};

export default function PPPSalaryConverterPage() {
  const faqItems = [
    {
      name: 'What is Purchasing Power Parity (PPP) and how does it affect salaries?',
      acceptedAnswer: {
        text: "Purchasing Power Parity (PPP) is an economic metric calculated by the World Bank and IMF that compares currencies through a standard basket of goods and services. Because local prices for housing, groceries, healthcare, and education vary dramatically across nations, a $50,000 USD salary in the United States buys vastly more goods and services in India, Thailand, or Nepal than it does in New York or London. PPP adjusts salaries to match real domestic buying power rather than misleading nominal exchange rates.",
      },
    },
    {
      name: 'What is the difference between PPP equivalent salary and market exchange rate conversion?',
      acceptedAnswer: {
        text: 'A market exchange rate conversion tells you how much foreign currency you get at a bank or forex desk (for example, $50,000 USD converted at ~139 NPR/USD yields Rs. 6,950,000 NPR). A PPP equivalent salary tells you how much local currency you actually need to maintain the same standard of living (only about Rs. 1,825,000 NPR in Nepal). Because everyday living costs in Nepal are roughly 78% lower than in the US, you do not need 6.95 million NPR to match a $50k US lifestyle.',
      },
    },
    {
      name: 'What is the 50/50 hybrid compensation model for remote workers?',
      acceptedAnswer: {
        text: 'When negotiating international or remote compensation, tech companies frequently use a 50/50 hybrid model rather than a 100% downward PPP adjustment. While local living costs may be lower in developing economies, global products (laptops, phones, software subscriptions, international travel, imported vehicles) trade at global USD prices. The 50/50 hybrid model averages the raw market exchange conversion and the local PPP conversion, preserving competitive savings while respecting local living standards.',
      },
    },
    {
      name: 'What is the Purchasing Power Parity between India and the United States?',
      acceptedAnswer: {
        text: 'Under World Bank private consumption PPP estimates, the PPP factor for India is approximately 24.1 INR per 1 USD, whereas the market exchange rate is approximately 86.8 INR per 1 USD. This means a salary of $50,000 in the US provides the equivalent purchasing power of roughly 1,205,000 INR ($13,882 USD) in India. If a remote worker in India earns a full US salary of $50,000 (~4,340,000 INR), their local purchasing power is equivalent to earning over $180,000 in the United States (a 3.6x multiplier).',
      },
    },
    {
      name: 'What is the World Bank PPP conversion factor formula?',
      acceptedAnswer: {
        text: 'The equivalent salary in the destination country (B) based on origin country (A) is calculated as: Equivalent Salary (B) = Base Salary (A) x [PPP Factor (B) / PPP Factor (A)]. The World Bank computes private consumption PPP conversion factors (Series PA.NUS.PRVT.PP) through the International Comparison Program (ICP) by tracking price levels of identical consumer baskets worldwide.',
      },
    },
    {
      name: 'Does Dubai have personal income tax on salaries?',
      acceptedAnswer: {
        text: 'No. The United Arab Emirates (UAE) levies 0% personal income tax on employment salaries. In contrast, professionals in the UK or Germany face effective tax rates of 35% to 45%, and US professionals face federal and state taxes of 25% to 37%. Because of zero personal income tax, a $100,000 gross salary in Dubai yields higher net take-home pay than equivalent nominal salaries in London or Berlin.',
      },
    },
    {
      name: 'What is the difference between Cost of Living Index and PPP?',
      acceptedAnswer: {
        text: 'The Cost of Living (CoL) index (such as Numbeo) measures consumer price levels relative to a reference city (typically New York City = 100) and includes heavy weighting on private rentals. PPP (Purchasing Power Parity), published by the World Bank, measures the macroeconomic currency exchange rate that equalizes purchasing power across broad domestic consumption expenditure.',
      },
    },
    {
      name: 'Should I compare gross salary or net take-home salary?',
      acceptedAnswer: {
        text: 'PPP conversion factors are applied to pre-tax gross salary to compare economic value. However, because income tax rates vary from 0% in the UAE to over 40% in Western Europe, you should always check destination tax obligations and take-home pay when evaluating a concrete job offer or international relocation.',
      },
    },
  ];

  // Unified Google-Recommended Schema Graph
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/calculator/ppp-salary-converter/',
        url: 'https://nepacalc.com/calculator/ppp-salary-converter/',
        name: 'PPP Salary Converter: Compare Cost of Living & Buying Power',
        description:
          'Convert salaries between 32+ countries using World Bank Purchasing Power Parity (PPP) data. Compare true buying power, cost of living, and remote work pay.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.acceptedAnswer.text,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nepacalc.com/calculator/ppp-salary-converter/#breadcrumb',
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
            name: 'Calculators',
            item: 'https://nepacalc.com/calculator/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PPP Salary Converter',
            item: 'https://nepacalc.com/calculator/ppp-salary-converter/',
          },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://nepacalc.com/calculator/ppp-salary-converter/#app',
        name: 'Purchasing Power Parity (PPP) Salary Converter',
        url: 'https://nepacalc.com/calculator/ppp-salary-converter/',
        description:
          'Compare true international buying power, remote work compensation models, and cost-of-living deltas using official World Bank ICP and WDI data.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript and HTML5 support',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Organization',
          name: 'NepaCalc',
          url: 'https://nepacalc.com',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#202124]">
      {/* ── JSON-LD Structured Data (@graph specification) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      {/* ── Compact Breadcrumb Navigation ── */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-3">
        <nav aria-label="Breadcrumb" className="mb-0.5">
          <Link
            href="/"
            className="sm:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-700 transition"
          >
            ← Home
          </Link>

          <div className="hidden sm:flex items-center flex-wrap gap-1.5 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-emerald-700 hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/calculator/" className="hover:text-emerald-700 hover:underline">Calculators</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">PPP Salary Converter</span>
          </div>
        </nav>
      </div>

      {/* ── Main Interactive Client Component ── */}
      <div id="ppp-salary-converter">
        <PPPSalaryClient />
      </div>

      {/* ── Editorial E-E-A-T Guide & Methodology ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Understanding Purchasing Power Parity in Global Compensation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Purchasing Power Parity (PPP) equalizes the purchasing power of different currencies by taking into account differences in local price levels. While nominal market exchange rates fluctuate based on capital flows, interest rates, and trade balances, PPP conversion factors track the real-world cost of living by comparing the price of identical baskets of goods and services across economies.
          </p>

          <h3 className="text-sm font-bold text-slate-900 pt-2">
            Why Remote Workers Should Not Accept a 100% Downward PPP Cut
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When international companies hire remote talent in countries like Nepal, India, or Vietnam, offering a pure local PPP salary often undervalues global expenses. While local rent and groceries cost less, global goods like laptops, electronics, software subscriptions, professional certifications, and overseas travel are priced in USD worldwide. Leading technology organizations adopt a hybrid 50/50 compensation policy, averaging local purchasing power parity and market exchange conversions.
          </p>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="text-slate-400">Authoritative References:</span>
            <a
              href="https://www.worldbank.org/en/programs/icp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 underline"
            >
              World Bank International Comparison Program (ICP)
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="https://data.worldbank.org/indicator/PA.NUS.PRVT.PP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 underline"
            >
              World Bank WDI Private Consumption PPP (PA.NUS.PRVT.PP)
            </a>
          </div>
        </div>
      </section>

      {/* ── SEO FAQ Section (AEO / GEO Engine Optimized) ── */}
      <section id="faq-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-28 sm:pb-16">
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            Frequently Asked Questions on PPP &amp; International Salaries
          </h2>

          <div className="space-y-4 divide-y divide-slate-100">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          {/* ── Internal Topical Navigation Links ── */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-slate-400">Related Tools:</span>
            <Link
              href="/calculator/us-paycheck-calculator/"
              className="text-emerald-800 hover:text-emerald-950 hover:underline bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
            >
              US Paycheck Calculator →
            </Link>
            <Link
              href="/calculator/currency-converter/"
              className="text-slate-700 hover:text-slate-900 hover:underline bg-slate-100 px-2.5 py-1 rounded-full"
            >
              Live Currency Converter →
            </Link>
            <Link
              href="/international/dubai-gold-rate/"
              className="text-slate-700 hover:text-slate-900 hover:underline bg-slate-100 px-2.5 py-1 rounded-full"
            >
              Dubai Gold Rate Hub →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
