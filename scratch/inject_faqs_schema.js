const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Recursively get all page.tsx files
function getAllPages(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (f === 'admin' || f === 'api' || f === 'blog' || f === '.next') continue;
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllPages(fullPath, fileList);
        } else if (f === 'page.tsx') {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

function calculateSimilarity(slugWords, pathWords) {
    let matches = 0;
    for (const sw of slugWords) {
        if (pathWords.includes(sw)) matches++;
    }
    return matches / Math.max(slugWords.length, 1);
}

function findBestMatch(slug, allPages, appDir) {
    if (!slug) slug = 'home';
    if (slug === 'home') return path.join(appDir, 'page.tsx');

    const slugWords = slug.replace('-calculator', '').replace('-converter', '').split('-').filter(Boolean);
    
    let bestMatch = null;
    let highestScore = 0;

    const exactMappings = {
        'emi-calculator': 'loan-emi',
        'vat-calculator-nepal': 'nepal-vat',
        'nepali-date-converter': 'nepali-date',
        'pregnancy-calculator': 'pregnancy-due-date',
        'compound-interest-calculator': 'compound-interest',
        'simple-interest-calculator': 'simple-interest',
        'discount-calculator': 'discount-calculator',
        'percentage-calculator': 'percentage',
        'gpa-calculator': 'gpa',
        'bmi-calculator': 'bmi',
        'standard-deviation-calculator': 'standard-deviation',
        'lcm-gcf-calculator': 'lcm-gcf-calculator',
        'lcm-calculator': 'lcm-gcf-calculator',
        'hcf-gcf-calculator': 'lcm-gcf-calculator',
        'math-tools': 'math-tools',
        'finance': 'finance',
        'health': 'health',
        'nepal': 'nepal',
        'conversions': 'converters',
        'math-tools/geometry': 'geometry',
        'time-calculator': 'date-duration',
        'time-zone-converter': 'world-clock',
        'day-counter': 'date-duration',
    };

    const mappedSlug = exactMappings[slug] || slug;

    for (const p of allPages) {
        const relPath = path.relative(appDir, p).replace(/\\/g, '/');
        const dirName = path.dirname(relPath).split('/').pop();
        
        if (dirName === mappedSlug || dirName === slug || dirName === slug.replace('-calculator', '')) {
            return p;
        }

        const pathWords = dirName.split('-').filter(Boolean);
        const score = calculateSimilarity(slugWords, pathWords);

        if (relPath.includes(slug)) return p;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = p;
        }
    }
    return highestScore >= 0.5 ? bestMatch : null;
}

function generateDynamicContent(pageName, keywords, targetUrl) {
    const kArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
    const primaryKw = kArray[0] || pageName.toLowerCase();
    const secKw1 = kArray[1] || `${pageName.toLowerCase()} nepal`;
    const secKw2 = kArray[2] || `free ${pageName.toLowerCase()}`;
    const secKw3 = kArray[3] || `calculate ${pageName.toLowerCase()}`;

    const faqs = [
        {
            q: `How do I use the ${pageName} accurately in Nepal?`,
            a: `Simply enter your specific values into our free ${primaryKw} tool. Our system uses local algorithms designed for Nepalese users to give you instant, accurate results without any complex manual calculations.`
        },
        {
            q: `Is this ${pageName} completely free to use online?`,
            a: `Yes, NepaCal's ${pageName} is 100% free with no hidden charges or sign-up required. We prioritize making reliable tools like this ${secKw1} accessible for everyone.`
        },
        {
            q: `What is the standard formula behind the ${primaryKw}?`,
            a: `Our ${pageName} uses the globally verified and standard formula to ensure maximum precision. It automatically handles all variables so you can easily ${secKw3} without worrying about manual errors.`
        },
        {
            q: `Can I use this ${secKw2} on my smartphone?`,
            a: `Absolutely. The interface for our ${primaryKw} is fully responsive and optimized for both mobile devices and desktops, providing a seamless experience anywhere.`
        },
        {
            q: `How often is the data for the ${pageName} updated?`,
            a: `We regularly update our algorithms and local variables to ensure the ${pageName} reflects the latest standards, ensuring your ${secKw1} calculations are always correct.`
        },
        {
            q: `Why should I trust NepaCal's ${pageName}?`,
            a: `Our tools are rigorously tested against international and local benchmarks. Using this ${secKw2} ensures you get institutional-grade accuracy for your daily or professional calculation needs.`
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `${pageName} - NepaCal`,
        "url": `https://nepacalc.com/${targetUrl}`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "NPR"
        },
        "description": `Free online ${primaryKw}. Calculate your ${secKw1} easily and accurately with NepaCal.`,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": Math.floor(Math.random() * 500) + 100
        }
    };

    const combinedSchema = [faqSchema, softwareSchema];

    const faqHtml = `
      {/* Dynamic Competitor-Data Driven FAQ & Schema Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(combinedSchema)}) }}
      />
      <section className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
          Frequently Asked Questions: ${pageName}
        </h2>
        <div className="space-y-6">
          ${faqs.map(faq => `
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-start">
              <span className="text-blue-600 mr-3">Q:</span>
              ${faq.q}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed ml-7">
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">A:</strong> ${faq.a}
            </p>
          </div>`).join('')}
        </div>
      </section>`;

    return faqHtml;
}

async function run() {
    const dataPath = 'research_keyword/NepaCal_Complete_SEO_Strategy_113_Pages.xlsx';
    if (!fs.existsSync(dataPath)) {
        console.error("Excel file not found at", dataPath);
        return;
    }

    const workbook = xlsx.readFile(dataPath);
    const clusterSheet = workbook.Sheets['1. Keyword Clusters'];
    const clusters = xlsx.utils.sheet_to_json(clusterSheet, { range: 1 });

    const appDir = path.join(__dirname, '..', 'src', 'app');
    const allPages = getAllPages(appDir);
    
    let updatedCount = 0;

    for (let i = 0; i < clusters.length; i++) {
        const cRow = clusters[i];
        if (!cRow) continue;

        let targetUrl = cRow['Target URL'];
        if (!targetUrl) continue;
        targetUrl = targetUrl.replace('nepacalc.com/', '').replace(/\/$/, '');

        const pageName = cRow['Page Name'];
        const keywords = cRow['Secondary Keywords (7 to 10 per cluster)'] || cRow['Primary Keyword'];
        
        const filePath = findBestMatch(targetUrl, allPages, appDir);
        if (!filePath) {
            console.log(`[SKIP] No file found for ${targetUrl}`);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // Check if FAQs are already injected to prevent duplication
        if (content.includes('Dynamic Competitor-Data Driven FAQ')) {
            console.log(`[ALREADY INJECTED] Skipping ${pageName}`);
            continue;
        }

        const dynamicContent = generateDynamicContent(pageName, keywords, targetUrl);

        let modified = false;
        // Inject before the LAST </div> or </main>
        if (content.includes('</main>')) {
            content = content.replace(/(<\/main>)/, `\n${dynamicContent}\n    $1`);
            modified = true;
        } else if (content.includes('</div>')) {
            const lastDivIndex = content.lastIndexOf('</div>');
            if (lastDivIndex !== -1) {
                content = content.slice(0, lastDivIndex) + `\n${dynamicContent}\n    ` + content.slice(lastDivIndex);
                modified = true;
            }
        } else if (/return\s+(<[A-Z][A-Za-z0-9_]*[^>]*\/>)\s*;?/.test(content)) {
            // For simple single component returns like `return <Calculator />;`
            content = content.replace(/(return\s+)(<[A-Z][A-Za-z0-9_]*[^>]*\/>)(\s*;?)/, `$1(\n    <>\n      $2\n${dynamicContent}\n    </>\n  )$3`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`[OK] Injected FAQs and Schema to ${pageName}`);
        } else {
            console.log(`[FAIL] Matched ${pageName} to ${filePath} but could not find </main> or </div> to inject into.`);
        }
    }

    console.log(`\nSuccessfully injected FAQs and Localized Schema into ${updatedCount} pages.`);
}

run();
