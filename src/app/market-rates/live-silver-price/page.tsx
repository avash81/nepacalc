import { Metadata } from 'next';
import SilverChartClient from './SilverChartClient';
import SilverCalculatorClient from './SilverCalculatorClient';
import { SilverSeoContent, SilverSeoToc } from './SilverSeoSection';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { Table, ShieldCheck, Zap } from 'lucide-react';

import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour

function getLiveData() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'live-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return {
      date: json.date || new Date().toISOString().split('T')[0],
      silver: json.silver?.tolaNPR || null,
      silverData: json.silver || null,
      source: json.source || 'FENEGOSIDA',
      source_name: json.source_name || 'FENEGOSIDA',
      rate_date: json.rate_date || json.date || new Date().toISOString().split('T')[0],
      published_at: json.published_at || null,
      fetched_at: json.fetched_at || null,
      status: json.status || 'verified',
    };
  } catch (e) {
    return { date: new Date().toISOString().split('T')[0], silver: null, silverData: null, source: 'FENEGOSIDA', source_name: 'FENEGOSIDA', rate_date: new Date().toISOString().split('T')[0], published_at: null, fetched_at: null, status: 'error' };
  }
}

// ─── METADATA ────────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const { date: rawDate, silver } = getLiveData();
  const year = rawDate.split('-')[0];

  const priceSnippet = silver
    ? `Current Chandi price: Rs.${silver.toLocaleString('en-IN')} per tola, updated daily with per gram and kg prices.`
    : 'Updated daily with per gram and kg prices.';

  const description = `Live silver price in Nepal today with official FENEGOSIDA rates. ${priceSnippet}`;
  
  return {
    title: `Live Silver Price in Nepal Today (${year}) | Chandi Rate Per Tola & Gram`,
    description,
    keywords: [
      'live silver price nepal',
      'silver price nepal',
      'silver rate today',
      'chandi rate today',
      'silver price per tola',
      'silver price per gram',
      'silver calculator',
      'silver converter',
      'FENEGOSIDA silver price',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/live-silver-price/',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: `Live Silver Price in Nepal Today (${year}) | Chandi Rate`,
      description,
      type: 'website',
      url: 'https://nepacalc.com/market-rates/live-silver-price/',
      images: [
        {
          url: 'https://nepacalc.com/images/live-silver-price-nepal.webp',
          width: 1200,
          height: 630,
          alt: 'Live Silver Price Today Nepal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Live Silver Price in Nepal Today (${year})`,
      description,
    },
  };
}

// ─── PACKAGE 1: COMPLETE SCHEMA GRAPH ────────────────────────────────────────
const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://nepacalc.com/#organization',
      name: 'NepaCalc',
      url: 'https://nepacalc.com/',
      logo: 'https://nepacalc.com/logo.png',
      sameAs: [
        'https://www.facebook.com/nepacalc',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nepacalc.com/#website',
      url: 'https://nepacalc.com/',
      name: 'NepaCalc',
      description: 'Nepal\'s unified platform for everyday calculations.',
      publisher: {
        '@id': 'https://nepacalc.com/#organization',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#webpage',
      url: 'https://nepacalc.com/market-rates/live-silver-price/',
      name: 'Live Silver Price in Nepal Today',
      isPartOf: {
        '@id': 'https://nepacalc.com/#website',
      },
      primaryImageOfPage: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#primaryimage',
      },
    },
    {
      '@type': 'Article',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#article',
      isPartOf: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#webpage',
      },
      author: {
        '@id': 'https://nepacalc.com/#organization',
      },
      headline: 'Live Silver Price in Nepal Today',
      datePublished: '2024-01-01T08:00:00+00:00',
      dateModified: '', 
      mainEntityOfPage: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#webpage',
      },
      publisher: {
        '@id': 'https://nepacalc.com/#organization',
      },
      image: {
        '@id': 'https://nepacalc.com/market-rates/live-silver-price/#primaryimage',
      },
      articleSection: 'Market Rates',
      keywords: [
        'Silver Price Nepal',
        'Chandi Rate',
        'Live Silver Price Today',
        'FENEGOSIDA Silver',
      ],
      mentions: [
        { '@type': 'Thing', name: 'Silver' },
        { '@type': 'Thing', name: 'Chandi' },
        { '@type': 'Thing', name: 'Tola' },
        { '@type': 'Thing', name: 'Gram' },
        { '@type': 'Thing', name: 'Kilogram' },
        { '@type': 'Thing', name: 'Nepal Rastra Bank' },
        { '@type': 'Thing', name: 'XAG/USD' },
        { '@type': 'Thing', name: 'Precious Metal' },
        { '@type': 'Thing', name: 'Bullion' },
        { '@type': 'Thing', name: 'FENEGOSIDA' },
      ],
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#primaryimage',
      url: 'https://nepacalc.com/images/live-silver-price-nepal.webp',
      width: 1200,
      height: 630,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#breadcrumb',
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
          name: 'Market Rates',
          item: 'https://nepacalc.com/market-rates/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Live Silver Price',
          item: 'https://nepacalc.com/market-rates/live-silver-price/',
        },
      ],
    },
    {
      '@type': 'Dataset',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#dataset',
      name: 'Live Silver Price Nepal',
      description: 'Daily official silver price benchmark for Nepal published using FENEGOSIDA market data.',
      creator: {
        '@id': 'https://nepacalc.com/#organization',
      },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      keywords: [
        'Silver Price Nepal',
        'Chandi Rate',
        'Silver Price Today',
        'Silver Price Per Tola',
        'Silver Price Per Gram',
        'FENEGOSIDA',
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Silver Price Units',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Silver Price Per Tola' },
        { '@type': 'ListItem', position: 2, name: 'Silver Price Per Gram' },
        { '@type': 'ListItem', position: 3, name: 'Silver Price Per Kilogram' },
        { '@type': 'ListItem', position: 4, name: 'Silver Calculator' },
        { '@type': 'ListItem', position: 5, name: 'Silver Unit Converter' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://nepacalc.com/market-rates/live-silver-price/#faqpage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "What is today's silver price in Nepal?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Today's silver price in Nepal is based on the latest benchmark published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). This page displays the most recent available silver rate per Tola and automatically calculates equivalent values per Gram, 10 Grams, Kilogram, Aana, and Lal.",
          },
        },
        {
          '@type': 'Question',
          name: 'Who determines the silver price in Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The benchmark silver rate used in Nepal is based on prices published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). International silver prices, exchange rates, and domestic market conditions influence these daily benchmarks.",
          },
        },
        {
          '@type': 'Question',
          name: 'How much does one tola of silver weigh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One Nepal Tola equals 11.6638 grams. This traditional measurement is the standard unit used for pricing silver and gold throughout Nepal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the silver price change every day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Silver prices change because of several market factors including: international silver spot prices, exchange rate fluctuations, industrial demand, investment demand, global economic conditions, and import costs. These factors affect the benchmark price published for the Nepal market.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is silver priced in Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Silver in Nepal is priced by calculating the international spot price (XAG/USD) and converting it to Nepalese Rupees (NPR), then adding import duties, customs charges, and local market adjustments to form the daily benchmark rate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the silver price on NepaCalc updated daily?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The silver benchmark prices on NepaCalc are updated every trading day after the official market rate becomes available, ensuring you have the latest reference price.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between silver spot price and Nepal silver price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The international spot price represents the global trading value of pure silver in US Dollars. The Nepal silver price additionally reflects USD/NPR exchange rates, government import taxes, and domestic supply conditions before retail making charges are added.',
          },
        },
      ],
    },
  ],
};

export default async function Page() {
  const { date: rawDate, silver, silverData, source, source_name, rate_date, status } = getLiveData();

  const priceSnippet = silver
    ? `Current Chandi price: Rs.${silver.toLocaleString('en-IN')} per tola, updated daily with per gram and kg prices.`
    : 'Updated daily with per gram and kg prices.';
  const dynamicDescription = `Live silver price in Nepal today with official FENEGOSIDA rates. ${priceSnippet}`;

  const dynamicSchema = JSON.parse(JSON.stringify(schemaGraph));
  if (dynamicSchema['@graph'] && dynamicSchema['@graph'][3]) {
    dynamicSchema['@graph'][3].dateModified = new Date(rawDate).toISOString();
    dynamicSchema['@graph'][3].description = dynamicDescription;
  }

  const fmt = (n: number) => n.toLocaleString('en-IN');
  const currentSilver = silverData?.tolaNPR?.current || 4710;
  const previousSilver = silverData?.tolaNPR?.previous || 4660;
  const change24h = silverData?.tolaNPR?.change24h ?? (currentSilver - previousSilver);
  const changePercent24h = silverData?.tolaNPR?.changePercent24h ?? ((change24h / previousSilver) * 100);
  const isFresh = status === 'verified';

  const tables = [
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (प्रति तोला)', rate: currentSilver, unit: '1 Tola' },
    { label: 'Fine Silver (Chandi)', np: 'शुद्ध चाँदी (१० ग्राम)', rate: Math.round(currentSilver / 1.1664), unit: '10 Gram' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://s3.tradingview.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://s3.tradingview.com" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicSchema) }}
      />
      
      <CalcWrapper
        title="Live Silver Price Today Nepal (2083/84)"
        description={
          <>
            <strong>Live Silver Price in Nepal Today (2083/84)</strong> provides the latest official Chandi rates published by the Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA). Check today&apos;s silver price per tola, gram and kilogram, convert traditional Nepalese weight units instantly, and monitor daily market movements using real-time pricing and historical trend analysis.
          </>
        }
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Live Silver Price' }]}
        isNepal={false}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Exchange Rate Nepal', slug: '/market-rates/exchange-rate-nepal/' },
          { name: 'Gold Weight Converter', slug: '/calculator/gold-converter/' },
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Market Rates', slug: '/market-rates/' },
        ]}
      >
        <div className="max-w-[1000px] mx-auto pb-12">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 border-b border-slate-200 pb-6">
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <a 
                  href="/market-rates/"
                  className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
                >
                  <span className="text-xl">←</span> <span>Back</span>
                </a>
                <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
                  <a href="/" className="hover:text-blue-600 hover:underline">Home</a>
                  <span className="text-slate-300">/</span>
                  <a href="/market-rates/" className="hover:text-blue-600 hover:underline">Market Rates</a>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#202124] font-bold">Live Silver Price</span>
                </nav>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-2">
                Silver Price in Nepal Today – Live Chandi Rates
              </h1>
              <p className="text-[#5f6368] text-base font-medium leading-relaxed max-w-xl">
                Daily verified silver (Chandi) rates in Nepal. High-precision benchmarks based on international industrial spot markets and official FENEGOSIDA price mandates.
              </p>
            </div>

            <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-5 shadow-sm min-w-[280px]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">Live Market Feed</span>
                </div>
                <span className="text-xs font-medium text-slate-500">Today&apos;s Official Silver Rate<br/>Per Tola (999 Fine)</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-xl font-bold text-slate-400">Rs.</span>
                <span className="text-4xl font-black tracking-tighter text-slate-900">{fmt(currentSilver)}</span>
              </div>
              {changePercent24h !== undefined && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">24H Change</span>
                  <div className={`px-2 py-0.5 rounded text-xs font-black flex items-center gap-1 ${changePercent24h >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {changePercent24h >= 0 ? '+' : ''}{changePercent24h.toFixed(2)}%
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 items-start">
            <article className="min-w-0">
              <div className="lg:hidden mb-12">
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                  <SilverSeoToc />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                <div className="flex flex-col">
                  {!isFresh && (
                    <div className="mx-4 sm:mx-6 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                      <span className="text-amber-600 text-lg">⚠️</span>
                      <div>
                        <p className="text-[12px] font-bold text-amber-800">Showing last verified FENEGOSIDA rate</p>
                        <p className="text-[11px] text-amber-700">Official rate as of {rate_date}. Today&apos;s rate will appear once FENEGOSIDA publishes (~11 AM NPT).</p>
                      </div>
                    </div>
                  )}

                  <div className="mx-4 sm:mx-6 mt-4 p-3 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${!isFresh ? 'bg-amber-400' : 'animate-pulse bg-green-500'}`}></div>
                      {!isFresh ? 'Last Verified Rate' : 'Live · Today'}
                    </div>
                    <div className="flex items-center gap-2">
                      Source:{' '}
                      <a href="https://www.fenegosida.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline normal-case">
                        {source_name}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isFresh ? 'Last verified' : 'Rate date'}: {new Date(rate_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    {isFresh && (
                      <div className="flex items-center gap-2">
                        Next Update: ~11:00 AM NPT
                      </div>
                    )}
                    <div className={`flex items-center gap-2 px-2 py-0.5 rounded text-[10px] ${!isFresh ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'}`}>
                      {!isFresh ? '⚠️ Update pending' : 'Fresh ✓'}
                    </div>
                  </div>

                  <div className="mx-4 sm:mx-6 mt-3 mb-2 text-[11px] text-slate-500 font-medium leading-relaxed">
                    Official Nepal silver rate updated daily from FENEGOSIDA. International spot silver (XAG/USD) is shown for global market reference only.
                  </div>

                  <SilverChartClient />

                  <div className="mx-4 sm:mx-6 mt-4 p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-[11px] leading-relaxed font-medium">
                    <strong>Note:</strong> Rates shown on this page track the official benchmark rates published by FENEGOSIDA as closely as possible, including standard import duties. Retail purchase prices may vary slightly due to making charges (jyala), wastage (jarti), VAT, and individual jeweler pricing policies.
                  </div>

                  <div id="quick-answer" className="quick-answer-block bg-slate-50/50 mt-4 p-6 border-y border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                    <div className="p-3 bg-slate-200 text-slate-600 rounded-full shrink-0">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Today&apos;s Rate Summary</h2>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed m-0">
                        The official silver (Chandi) price in Nepal today is <strong>Rs. {fmt(currentSilver)}</strong> per Tola and <strong>Rs. {fmt(Math.round(currentSilver / 1.1664))}</strong> per 10 Grams. Prices closely reflect FENEGOSIDA benchmarks and include all standard Nepal customs and import duties.
                      </p>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed m-0 mt-3">
                        <strong>Note:</strong> Since import costs dictate the final price, you should also check <a href="/market-rates/exchange-rate-nepal/" className="text-slate-900 underline font-bold hover:text-blue-600">Today&apos;s NRB Exchange Rate</a> and <a href="/market-rates/live-gold-price/" className="text-slate-900 underline font-bold hover:text-blue-600">Live Gold Prices</a>.
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Table className="w-4 h-4 text-slate-500" />
                      <div className="text-[12px] font-black uppercase tracking-widest text-slate-900">Nepal Benchmark Rates</div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="pb-4 px-4">Standard</th>
                            <th className="pb-4 px-4">Unit</th>
                            <th className="pb-4 px-4 text-right">Rate (NPR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {tables.map((row, i) => (
                            <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-black text-slate-800">{row.label}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.np}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">{row.unit}</td>
                              <td className="py-4 px-4 text-right">
                                <span className="text-[17px] font-black text-slate-900 tracking-tighter">Rs. {fmt(row.rate)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-[13px] font-black uppercase tracking-[.2em] text-slate-800">Quick Valuation Calculator</h3>
                </div>
                <div className="p-6">
                  <SilverCalculatorClient silverPerTola={currentSilver} />
                </div>
              </div>

              <SilverSeoContent silverData={silverData} source={source} date={rate_date} />
            </article>
            
            <aside className="hidden lg:block sticky top-24 self-start">
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                <SilverSeoToc />
              </div>
            </aside>
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
