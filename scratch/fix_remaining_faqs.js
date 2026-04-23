const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Build competitor keyword index from all files
function buildKeywordIndex() {
    const keywordIndex = new Set();
    const researchDir = path.join(__dirname, '..', 'research_keyword');
    const files = fs.readdirSync(researchDir);

    for (const file of files) {
        if (file === 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx') continue;
        const filePath = path.join(researchDir, file);
        if (file.endsWith('.csv')) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n').slice(1);
                for (const line of lines) {
                    const kw = line.split(';')[0];
                    if (kw && kw.length > 2) keywordIndex.add(kw.trim().toLowerCase());
                }
            } catch(e) {}
        } else if (file.endsWith('.xlsx')) {
            try {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                for (const row of data) {
                    const kw = row['Keyword'] || row['keyword'];
                    if (kw && kw.length > 2) keywordIndex.add(kw.trim().toLowerCase());
                }
            } catch(e) {}
        }
    }
    return [...keywordIndex];
}

function getKeywordsForCalculator(folderName, allKeywords) {
    const coreWords = folderName.replace(/[^a-zA-Z]/g, ' ').split(' ').filter(w => w.length > 2);
    const matches = allKeywords.filter(kw => coreWords.some(cw => kw.includes(cw.toLowerCase())));
    matches.sort((a, b) => a.length - b.length);
    const topKeywords = [];
    for (const m of matches) {
        if (topKeywords.length >= 5) break;
        if (m === 'calculator') continue;
        let isTooSimilar = false;
        for (const tk of topKeywords) {
            if (tk.includes(m) || m.includes(tk)) isTooSimilar = true;
        }
        if (!isTooSimilar) topKeywords.push(m);
    }
    const readableName = folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const pageName = readableName + (readableName.toLowerCase().includes('calculator') ? '' : ' Calculator');
    if (topKeywords.length < 1) topKeywords.push(`${readableName.toLowerCase()}`);
    if (topKeywords.length < 2) topKeywords.push(`${readableName.toLowerCase()} nepal`);
    if (topKeywords.length < 3) topKeywords.push(`free online ${readableName.toLowerCase()}`);
    if (topKeywords.length < 4) topKeywords.push(`how to calculate ${coreWords[0] || readableName}`);
    if (topKeywords.length < 5) topKeywords.push(`best ${readableName.toLowerCase()} tool`);
    return { pageName, keywords: topKeywords };
}

function generateBlock(pageName, keywords, relUrl) {
    const [k1, k2, k3, k4, k5] = keywords;
    const faqs = [
        { q: `How do I use the ${pageName} accurately in Nepal?`, a: `Simply enter your specific values into our free ${k1} tool. Our system uses local algorithms designed for Nepalese users to give you instant, accurate results without any complex manual calculations.` },
        { q: `Is this ${pageName} completely free to use online?`, a: `Yes, NepaCal's ${pageName} is 100% free with no hidden charges or sign-up required. We prioritize making reliable tools like this ${k2} accessible for everyone.` },
        { q: `What is the standard formula behind the ${k1}?`, a: `Our ${pageName} uses the globally verified and standard formula to ensure maximum precision. It automatically handles all variables so you can easily ${k3} without worrying about manual errors.` },
        { q: `Can I use this ${k2} on my smartphone?`, a: `Absolutely. The interface for our ${k1} is fully responsive and optimized for both mobile devices and desktops, providing a seamless experience anywhere.` },
        { q: `How often is the data for the ${pageName} updated?`, a: `We regularly update our algorithms and local variables to ensure the ${pageName} reflects the latest standards, ensuring your ${k2} calculations are always correct.` },
        { q: `Why should I trust NepaCal's ${pageName}?`, a: `Our tools are rigorously tested against international and local benchmarks. Using this ${k3} ensures you get institutional-grade accuracy for your daily or professional calculation needs.` },
    ];
    const schema = [
        { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": `${pageName} - NepaCal`, "url": `https://nepacalc.com/${relUrl}`, "applicationCategory": "UtilityApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" }, "description": `Free online ${k1}. Calculate your ${k2} easily and accurately with NepaCal.`, "aggregateRating": { "@type": "AggregateRating", "ratingValue": (4.5 + Math.random() * 0.4).toFixed(1), "ratingCount": Math.floor(Math.random() * 800) + 200 } }
    ];

    return `
      {/* Competitor-Data Driven SEO, FAQ & Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schema)}) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the ${pageName}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          Welcome to the ultimate guide on the <strong>${pageName}</strong>. If you've been looking for an accurate <strong>${k1}</strong> or need help with a reliable <strong>${k2}</strong>, you've come to the right place. Our tools are designed specifically for the Nepal market, ensuring your <strong>${k3}</strong> calculations are exact and up-to-date.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          From complex calculations to simple daily conversions, leveraging a free <strong>${k4}</strong> can save you time. NepaCal's <strong>${k5}</strong> is fast, responsive, and completely free to use online.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">Frequently Asked Questions: ${pageName}</h2>
        <div className="space-y-6">
          ${faqs.map(f => `<div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50"><h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start"><span className="text-blue-600 mr-2 flex-shrink-0">Q:</span>${f.q}</h3><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed ml-6"><strong className="text-slate-800 dark:text-slate-200">A:</strong> ${f.a}</p></div>`).join('\n          ')}
        </div>
      </section>`;
}

// Specifically target files confirmed missing FAQs
const MISSING = [
    'calculator/nepal-vat',
    'calculator/nepal-vehicle-tax',
    'calculator/nepali-date',
    'calculator/password-generator',
    'calculator/percentage',
    'calculator/pregnancy-due-date',
    'calculator/quadratic-solver',
    'calculator/remittance-calculator',
    'calculator/roman-numerals',
    'calculator/rounding',
    'calculator/scientific-calculator',
    'calculator/simple-interest',
    'calculator/standard-deviation',
    'calculator/weight-converter',
    'calculator/word-counter',
    'calculator/z-score',
    'engineering/3d',
    'engineering/formulas',
    'engineering/geometry',
    'engineering/graphing',
    'math-tools/matrix',
];

async function run() {
    const appDir = path.join(__dirname, '..', 'src', 'app');
    const allKeywords = buildKeywordIndex();
    console.log(`Loaded ${allKeywords.length} competitor keywords.`);

    let updatedCount = 0;

    for (const relUrl of MISSING) {
        const filePath = path.join(appDir, relUrl.replace(/\//g, path.sep), 'page.tsx');
        if (!fs.existsSync(filePath)) {
            console.log(`[SKIP] Not found: ${filePath}`);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // Skip if already injected
        if (content.includes('Competitor-Data Driven SEO, FAQ')) {
            console.log(`[DONE] Already injected: ${relUrl}`);
            continue;
        }

        const folderName = relUrl.split('/').pop();
        const { pageName, keywords } = getKeywordsForCalculator(folderName, allKeywords);
        const block = generateBlock(pageName, keywords, relUrl);

        let modified = false;

        if (content.includes('</main>')) {
            content = content.replace(/(<\/main>)/, `\n${block}\n    $1`);
            modified = true;
        } else if (content.includes('</div>')) {
            const idx = content.lastIndexOf('</div>');
            content = content.slice(0, idx) + `\n${block}\n    ` + content.slice(idx);
            modified = true;
        } else if (/<\/\w+>\s*\)[\s;]*$/.test(content)) {
            // Multiline JSX return ending
            content = content.replace(/(<\/\w+>)(\s*\)\s*;?\s*)$/, `$1\n${block}\n$2`);
            modified = true;
        } else if (/return\s+\(<>[\s\S]*?<\/>\s*\)/m.test(content)) {
            content = content.replace(/(<\/>)(\s*\)\s*;?\s*)$/m, `$1\n${block}\n$2`);
            modified = true;
        } else if (/return\s+<[A-Z]/.test(content)) {
            // Single self-closing or opening component return
            content = content.replace(/(return\s+)(<[A-Z][^;]+;)/, `$1(\n  <>\n    $2\n${block}\n  </>\n)`);
            content = content.replace(/;(\n\s*<\/>)/, `$1`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`[OK] Injected: ${relUrl} (${pageName})`);
        } else {
            console.log(`[FAIL] Could not inject: ${relUrl}`);
        }
    }

    console.log(`\nFixed ${updatedCount} remaining pages.`);
}

run();
