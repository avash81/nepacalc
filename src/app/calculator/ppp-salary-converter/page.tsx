// Route: /calculator/ppp-salary-converter/
import { Metadata } from 'next';
import PPPSalaryClient from './PPPSalaryClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Purchasing Power Parity (PPP) Salary Calculator by Country & City',
  description:
    'Calculate equivalent salaries across countries using official World Bank ICP Purchasing Power Parity (PPP) conversion factors and live cost of living indices. Perfect for remote workers, expats, and global salary negotiations.',
  keywords: [
    'Purchasing Power Parity calculator',
    'Purchasing Power Parity salary converter',
    'PPP salary converter by city',
    'Purchasing Power Parity calculator by country',
    'Purchasing power parity index',
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
  openGraph: {
    title: 'Purchasing Power Parity (PPP) Salary Calculator by Country',
    description:
      'Compare equivalent real-world salaries across countries using World Bank ICP PPP conversion factors and Numbeo cost of living indices.',
    url: 'https://nepacalc.com/calculator/ppp-salary-converter/',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/ppp-salary-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Purchasing Power Parity (PPP) Salary Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purchasing Power Parity (PPP) Salary Calculator by Country',
    description:
      'Compare equivalent real-world salaries across countries using World Bank ICP PPP conversion factors and Numbeo cost of living indices.',
    images: ['https://nepacalc.com/images/og/ppp-salary-converter.jpg'],
  },
};

export default function PPPSalaryConverterPage() {
  const faqItems = [
    {
      name: 'What is Purchasing Power Parity (PPP) and how does it affect salaries?',
      acceptedAnswer: {
        text: "Purchasing Power Parity (PPP) is an economic metric calculated by the World Bank and IMF that compares currencies through a standard 'basket of goods and services'. Because local prices for housing, groceries, healthcare, and education vary dramatically across nations, a $50,000 USD salary in the United States buys vastly more goods and services in India, Thailand, or Nepal than it does in New York or London. PPP adjusts salaries to match real buying power rather than misleading nominal exchange rates.",
      },
    },
    {
      name: 'What is the Purchasing Power Parity between India and the United States?',
      acceptedAnswer: {
        text: 'According to the latest World Bank International Comparison Program (ICP) data, the PPP conversion factor for India is approximately 24.1 INR per 1 USD, whereas the market exchange rate is approximately 86.8 INR per 1 USD. This means a salary of $50,000 in the US provides the equivalent purchasing power of roughly ₹1,205,000 INR ($13,882 USD) in India. If a remote worker in India earns a full US salary of $50,000 (~₹4,340,000 INR), their local purchasing power is equivalent to earning over $180,000 in the United States (a 3.6× multiplier).',
      },
    },
    {
      name: 'What is the World Bank PPP conversion factor formula?',
      acceptedAnswer: {
        text: 'The equivalent salary in the destination country (B) based on origin country (A) is calculated as: Equivalent Salary (B) = Base Salary (A) × [PPP Factor (B) ÷ PPP Factor (A)]. The World Bank computes these PPP conversion factors through the International Comparison Program (ICP) by tracking identical consumer baskets of hundreds of standardized products worldwide.',
      },
    },
    {
      name: 'How should remote software engineers negotiate location-adjusted salaries?',
      acceptedAnswer: {
        text: 'When negotiating international or remote compensation, do not accept a 100% downward PPP adjustment. While local living costs may be 60–75% cheaper in developing economies, global products (laptops, phones, software subscriptions, international travel, imported cars) trade at global USD prices. Modern tech firms typically use a hybrid 50/50 model: 50% tied to the global benchmark rate and 50% adjusted to local living standards.',
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
        text: 'The Cost of Living (CoL) index (such as Numbeo) measures consumer price levels relative to a reference city (typically New York City = 100) and includes heavy weighting on private rentals. PPP (Purchasing Power Parity), published by the World Bank, measures the macro-economic currency exchange rate that would equalize purchasing power across broad domestic GDP aggregates including public infrastructure, healthcare, and subsidized staples.',
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
        name: 'Purchasing Power Parity (PPP) Salary Calculator by Country & City',
        description:
          'Calculate equivalent salaries across countries using official World Bank ICP Purchasing Power Parity (PPP) conversion factors and live cost of living indices.',
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
        '@type': 'SoftwareApplication',
        '@id': 'https://nepacalc.com/calculator/ppp-salary-converter/#app',
        name: 'PPP Salary Converter',
        applicationCategory: 'FinanceApplication',
        url: 'https://nepacalc.com/calculator/ppp-salary-converter/',
        operatingSystem: 'Web',
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
        description:
          'Compare salaries across countries using Purchasing Power Parity (PPP) and Numbeo Cost of Living indices. Includes tax-adjusted take-home, nomad runway, and global country comparison tables.',
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
            <Link href="/calculator/" className="hover:text-blue-600 hover:underline">Calculators</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">PPP Salary Converter</span>
          </div>
        </nav>
      </div>

      {/* ── Main Interactive Client Component ── */}
      <div id="ppp-salary-converter">
        <PPPSalaryClient />
      </div>

      {/* ── SEO FAQ Section (AEO / GEO Engine Optimized) ── */}
      <section id="faq-section" className="w-full px-3 sm:px-6 lg:px-8 pb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions on PPP &amp; International Salaries
          </h2>

          <div className="space-y-4 divide-y divide-gray-100">
            {faqItems.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          {/* ── Internal Topical Navigation Links ── */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-gray-400">Related Tools:</span>
            <Link
              href="/international/gold-silver-ratio/"
              className="text-amber-800 hover:text-amber-950 hover:underline bg-amber-50 px-2.5 py-1 rounded-full"
            >
              Gold-to-Silver Ratio Live →
            </Link>
            <Link
              href="/international/dubai-gold-rate/"
              className="text-emerald-700 hover:text-emerald-900 hover:underline bg-emerald-50 px-2.5 py-1 rounded-full"
            >
              Dubai Gold Rate Hub →
            </Link>
            <Link
              href="/calculator/currency-converter/"
              className="text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-2.5 py-1 rounded-full"
            >
              Currency Converter →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
