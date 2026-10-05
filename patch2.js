const fs = require('fs');

const hubPath = 'src/app/market-rates/history/page.tsx';
let hub = fs.readFileSync(hubPath, 'utf8');

// 1. Fix Hub Metadata (Add OG)
if (!hub.includes('openGraph: {')) {
  hub = hub.replace(
    'robots: {\r\n    index: true,\r\n    follow: true,\r\n  },',
    `robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold Rate History in Nepal – Historical Gold Prices',
    description: 'Historical gold rates in Nepal by date, including gold prices per tola and other available units. Browse the historical archive by year or search the available records.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: 'Gold Rate History in Nepal' }]
  },`
  );
  // fallback if windows \r\n vs \n
  hub = hub.replace(
    'robots: {\n    index: true,\n    follow: true,\n  },',
    `robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'NepaCalc',
    title: 'Gold Rate History in Nepal – Historical Gold Prices',
    description: 'Historical gold rates in Nepal by date, including gold prices per tola and other available units. Browse the historical archive by year or search the available records.',
    url: 'https://nepacalc.com/market-rates/history/',
    images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: 'Gold Rate History in Nepal' }]
  },`
  );
}

// 2. Add Schema to Hub
if (!hub.includes('application/ld+json')) {
  hub = hub.replace(
    'return (\n    <div className="min-h-screen bg-slate-50 font-sans">\n      <main',
    `const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
    ],
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main`
  );
  hub = hub.replace(
    'return (\r\n    <div className="min-h-screen bg-slate-50 font-sans">\r\n      <main',
    `const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
    ],
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main`
  );
}
fs.writeFileSync(hubPath, hub);

const yearPath = 'src/app/market-rates/history/[year]/page.tsx';
let year = fs.readFileSync(yearPath, 'utf8');

// 3. Fix Year Metadata (Add OG)
if (!year.includes('openGraph: {')) {
  year = year.replace(
    'robots: {\r\n      index: true,\r\n      follow: true,\r\n    }',
    `robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      siteName: 'NepaCalc',
      title,
      description,
      url: \`https://nepacalc.com/market-rates/history/\${year}/\`,
      images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: title }]
    }`
  );
  year = year.replace(
    'robots: {\n      index: true,\n      follow: true,\n    }',
    `robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      siteName: 'NepaCalc',
      title,
      description,
      url: \`https://nepacalc.com/market-rates/history/\${year}/\`,
      images: [{ url: 'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg', width: 1200, height: 630, alt: title }]
    }`
  );
}

// 4. Add Schema to Year Page
if (!year.includes('application/ld+json')) {
  year = year.replace(
    'return (\n    <div className="min-h-screen bg-slate-50 font-sans">\n      <main',
    `const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
      { '@type': 'ListItem', position: 4, name: \`Gold Rate History \${year}\`, item: \`https://nepacalc.com/market-rates/history/\${year}/\` },
    ],
  };
  
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: \`Gold Rate History \${year}\`,
    description: \`Historical gold rates in Nepal for \${year} by date, including 24K hallmark and 22K gold prices per tola.\`,
    url: \`https://nepacalc.com/market-rates/history/\${year}/\`,
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad || new Date().toISOString().split('T')[0],
    spatialCoverage: 'Nepal',
    temporalCoverage: year,
    variableMeasured: [
      '24K hallmark gold rate per tola',
      '22K tejabi gold rate per tola',
      'silver rate per tola'
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <main`
  );
  year = year.replace(
    'return (\r\n    <div className="min-h-screen bg-slate-50 font-sans">\r\n      <main',
    `const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
      { '@type': 'ListItem', position: 2, name: 'Market Rates', item: 'https://nepacalc.com/market-rates/' },
      { '@type': 'ListItem', position: 3, name: 'Gold Rate History', item: 'https://nepacalc.com/market-rates/history/' },
      { '@type': 'ListItem', position: 4, name: \`Gold Rate History \${year}\`, item: \`https://nepacalc.com/market-rates/history/\${year}/\` },
    ],
  };
  
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: \`Gold Rate History \${year}\`,
    description: \`Historical gold rates in Nepal for \${year} by date, including 24K hallmark and 22K gold prices per tola.\`,
    url: \`https://nepacalc.com/market-rates/history/\${year}/\`,
    creator: { '@type': 'Organization', name: 'NepaCalc', url: 'https://nepacalc.com' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    dateModified: dataset.meta?.last_updated_ad || new Date().toISOString().split('T')[0],
    spatialCoverage: 'Nepal',
    temporalCoverage: year,
    variableMeasured: [
      '24K hallmark gold rate per tola',
      '22K tejabi gold rate per tola',
      'silver rate per tola'
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <main`
  );
}
fs.writeFileSync(yearPath, year);

console.log("Structured data and OpenGraph tags added successfully!");
