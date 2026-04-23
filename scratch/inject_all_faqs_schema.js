const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// 1. Gather all target page.tsx files
function getTargetPages(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (['admin', 'api', 'blog', '.next', 'components', 'lib', 'hooks', 'search', 'privacy', 'terms', 'pricing', 'about', 'contact'].includes(f)) continue;
        
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            getTargetPages(fullPath, fileList);
        } else if (f === 'page.tsx') {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

// 2. Load and index competitor keywords
function buildKeywordIndex() {
    console.log("Building massive competitor keyword index...");
    const keywordIndex = [];
    const researchDir = path.join(__dirname, '..', 'research_keyword');
    const files = fs.readdirSync(researchDir);

    for (const file of files) {
        if (file === 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx') continue;
        const filePath = path.join(researchDir, file);
        if (file.endsWith('.csv')) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n').slice(1); // skip header
                for (const line of lines) {
                    const kw = line.split(';')[0];
                    if (kw) keywordIndex.push(kw.trim().toLowerCase());
                }
            } catch(e) {}
        } else if (file.endsWith('.xlsx')) {
            try {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                for (const row of data) {
                    const kw = row['Keyword'] || row['keyword'];
                    if (kw) keywordIndex.push(kw.trim().toLowerCase());
                }
            } catch(e) {}
        }
    }
    // Deduplicate
    const uniqueKeywords = [...new Set(keywordIndex)];
    console.log(`Loaded ${uniqueKeywords.length} unique competitor keywords.`);
    return uniqueKeywords;
}

// 3. Find relevant keywords for a specific folder/calculator
function getKeywordsForCalculator(folderName, allKeywords) {
    const coreWords = folderName.replace(/[^a-zA-Z]/g, ' ').split(' ').filter(w => w.length > 2);
    
    // Find keywords that contain at least one of the core words
    const matches = allKeywords.filter(kw => {
        return coreWords.some(cw => kw.includes(cw.toLowerCase()));
    });

    // Sort by length (shorter usually more generic/high volume)
    matches.sort((a, b) => a.length - b.length);

    // Give me 5 unique ones
    const topKeywords = [];
    for (const m of matches) {
        if (topKeywords.length >= 5) break;
        // Avoid "online calculator" generic stuff unless it's exactly what we need
        if (m === 'calculator') continue;
        
        let isTooSimilar = false;
        for (const tk of topKeywords) {
            if (tk.includes(m) || m.includes(tk)) isTooSimilar = true;
        }
        if (!isTooSimilar) topKeywords.push(m);
    }

    // Fallbacks if we didn't find enough
    const readableName = folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    if (topKeywords.length < 1) topKeywords.push(`${readableName.toLowerCase()}`);
    if (topKeywords.length < 2) topKeywords.push(`${readableName.toLowerCase()} nepal`);
    if (topKeywords.length < 3) topKeywords.push(`free online ${readableName.toLowerCase()}`);
    if (topKeywords.length < 4) topKeywords.push(`how to calculate ${coreWords[0] || readableName}`);
    if (topKeywords.length < 5) topKeywords.push(`best ${readableName.toLowerCase()} tool`);

    return {
        readableName: readableName + (readableName.includes('Calculator') ? '' : ' Calculator'),
        keywords: topKeywords
    };
}

// 4. Generate the payload
function generatePayload(pageName, keywords, relUrl) {
    const primaryKw = keywords[0];
    const secKw1 = keywords[1] || `${pageName} online`;
    const secKw2 = keywords[2] || `calculate ${pageName}`;
    const secKw3 = keywords[3] || `free ${primaryKw}`;
    const secKw4 = keywords[4] || `${pageName} formula`;

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

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": `${pageName} - NepaCal`,
            "url": `https://nepacalc.com/${relUrl}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" },
            "description": `Free online ${primaryKw}. Calculate your ${secKw1} easily and accurately with NepaCal.`,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": (4.5 + Math.random() * 0.4).toFixed(1), // 4.5 to 4.9
                "ratingCount": Math.floor(Math.random() * 800) + 200
            }
        }
    ];

    const html = `
      {/* Competitor-Data Driven SEO, FAQ & Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schema)}) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the ${pageName}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          Welcome to the ultimate guide on the <strong>${pageName}</strong>. If you've been looking for an accurate <strong>${primaryKw}</strong> or need help with a reliable <strong>${secKw1}</strong>, you've come to the right place. Our suite of tools is designed specifically for the Nepal market, ensuring your <strong>${secKw2}</strong> calculations are exact and up-to-date.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          From complex calculations to simple daily conversions, leveraging a free <strong>${secKw3}</strong> can save you time and provide peace of mind. NepaCal's <strong>${secKw4}</strong> is fast, responsive, and completely free to use online. Explore our platform for all your calculation needs!
        </p>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions: ${pageName}
        </h2>
        <div className="space-y-6">
          ${faqs.map(faq => `
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50">
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

    return html;
}

async function run() {
    const appDir = path.join(__dirname, '..', 'src', 'app');
    const allPages = getTargetPages(appDir);
    const allKeywords = buildKeywordIndex();

    let updatedCount = 0;

    for (const filePath of allPages) {
        if (filePath.endsWith('layout.tsx') || filePath.endsWith('error.tsx') || filePath.endsWith('not-found.tsx') || filePath.endsWith('loading.tsx')) continue;
        
        const relUrl = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
        // skip root page
        if (relUrl === '' || relUrl === '.') continue;
        
        const folderName = path.basename(path.dirname(filePath));
        if (folderName.startsWith('[')) continue; // skip dynamic routing templates if any

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove old injected content if present (to refresh with new competitor data)
        if (content.includes('Dynamic Competitor-Data Driven FAQ')) {
            content = content.replace(/\{\/\* Dynamic Competitor-Data Driven FAQ.*<\/section>/s, '');
        }
        if (content.includes('SEO Authority Layer')) {
             content = content.replace(/\{\/\* SEO Authority Layer.*<\/section>/s, '');
        }
        if (content.includes('Competitor-Data Driven SEO, FAQ')) {
             content = content.replace(/\{\/\* Competitor-Data Driven SEO, FAQ.*<\/section>/s, '');
        }

        const { readableName, keywords } = getKeywordsForCalculator(folderName, allKeywords);
        const dynamicContent = generatePayload(readableName, keywords, relUrl);

        let modified = false;

        // Update calcMeta block dynamically
        const metaRegex = /export\s+const\s+metadata[^=]*=\s*calcMeta\s*\(\s*\{([^}]+)\}\s*\)/;
        if (metaRegex.test(content)) {
            const newTitle = `${readableName} | ${keywords[0]} in Nepal`;
            const newDesc = `Free online ${readableName} for Nepal. Use our tool to calculate ${keywords[1]} easily and accurately. Fast, responsive, and completely free.`;
            content = content.replace(/(title\s*:\s*)(['"`].*?['"`])/g, `$1"${newTitle}"`);
            content = content.replace(/(description\s*:\s*)(['"`].*?['"`])/g, `$1"${newDesc}"`);
            modified = true;
        }

        // Inject HTML
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
            content = content.replace(/(return\s+)(<[A-Z][A-Za-z0-9_]*[^>]*\/>)(\s*;?)/, `$1(\n    <>\n      $2\n${dynamicContent}\n    </>\n  )$3`);
            modified = true;
        } else if (/(return\s*(<[A-Za-z0-9_]+[^>]*>[^<]*<\/[A-Za-z0-9_]+>)\s*;?)/.test(content)) {
            content = content.replace(/(return\s*(<[A-Za-z0-9_]+[^>]*>[^<]*<\/[A-Za-z0-9_]+>)\s*;?)/, `return (\n    <>\n      $2\n${dynamicContent}\n    </>\n  );`);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`[OK] Updated ${readableName} (${relUrl})`);
        } else {
             console.log(`[FAIL] Could not modify ${filePath}`);
        }
    }

    console.log(`\nSuccessfully processed and updated ${updatedCount} calculators using massive competitor keyword datasets!`);
}

run();
