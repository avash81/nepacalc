/**
 * V3 PRECISION SEO INJECTION
 * 
 * 1. Maps file paths to SEO data using "Target URL" from Sheet 2.
 * 2. Uses precise Meta Titles/Descriptions from Sheet 3.
 * 3. Enriches FAQs using all 27 competitor research files (73k+ keywords).
 * 4. Injects metadata into calcMeta() and FAQ/Schema into page body.
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');
const appDir = path.join(__dirname, '..', 'src', 'app');
const strategyFile = path.join(researchDir, 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

// ─── 1. Load Strategy Data ────────────────────────────────────────────────────
function loadStrategyData() {
    const wb = xlsx.readFile(strategyFile);
    
    // Sheet 2: Target URL mapping
    const mappingSheet = wb.Sheets['2. Keyword Mapping'];
    const mappingRaw = xlsx.utils.sheet_to_json(mappingSheet, { header: 1 });
    const urlToPageName = new Map();
    // Headers are at row index 1, data starts index 2
    for (let i = 2; i < mappingRaw.length; i++) {
        const row = mappingRaw[i];
        if (!row || row.length < 4) continue;
        const pageName = String(row[2]).trim();
        const targetUrl = String(row[3]).trim().replace('nepacalc.com', '').replace(/\/$/, '');
        if (pageName && targetUrl !== undefined) {
            urlToPageName.set(targetUrl || '/', pageName);
        }
    }

    // Sheet 3: Meta Titles and Descriptions
    const metaSheet = wb.Sheets['3. Meta Titles and Descriptions'];
    const metaRaw = xlsx.utils.sheet_to_json(metaSheet, { header: 1 });
    const pageNameToMeta = new Map();
    // Headers are at row index 2, data starts index 3 (based on sample)
    for (let i = 3; i < metaRaw.length; i++) {
        const row = metaRaw[i];
        if (!row || row.length < 8) continue;
        const pageName = String(row[2]).trim();
        const primaryKw = String(row[3]).trim();
        const title = String(row[4]).trim();
        const desc = String(row[7]).trim();
        if (pageName) {
            pageNameToMeta.set(pageName, { primaryKw, title, desc });
        }
    }

    // Final Map: Target URL -> Meta Data
    const urlToMeta = new Map();
    for (const [url, name] of urlToPageName) {
        if (pageNameToMeta.has(name)) {
            urlToMeta.set(url, pageNameToMeta.get(name));
        }
    }

    console.log(`Loaded strategy for ${urlToMeta.size} URLs.`);
    return urlToMeta;
}

// ─── 2. Load Competitor Keywords ──────────────────────────────────────────────
function loadCompetitorKeywords() {
    const kwMap = new Map();
    for (const file of fs.readdirSync(researchDir)) {
        if (file.includes('Strategy')) continue;
        const fp = path.join(researchDir, file);
        try {
            if (file.endsWith('.csv')) {
                const content = fs.readFileSync(fp, 'utf8');
                const lines = content.split('\n').slice(1);
                for (const line of lines) {
                    const cols = line.split(/[;,]/);
                    const kw = (cols[0] || '').trim().toLowerCase().replace(/^"|"$/g, '');
                    if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, true);
                }
            } else if (file.endsWith('.xlsx')) {
                const wb = xlsx.readFile(fp);
                const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                for (const row of data) {
                    const kw = String(row['Keyword'] || row['keyword'] || '').trim().toLowerCase();
                    if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, true);
                }
            }
        } catch(e) {}
    }
    console.log(`Loaded ${kwMap.size} unique competitor keywords.`);
    return Array.from(kwMap.keys());
}

// ─── 3. Utility: Match file to URL ───────────────────────────────────────────
function getUrlFromFile(filePath) {
    let rel = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
    return rel === '' ? '/' : '/' + rel;
}

// ─── 4. Injection Logic ──────────────────────────────────────────────────────
function injectSEO(filePath, meta, allKws) {
    let content = fs.readFileSync(filePath, 'utf8');
    const folderName = path.basename(path.dirname(filePath));
    const displayName = meta.title.split('|')[0].trim() || folderName;

    // A. Update Meta Data in calcMeta()
    if (content.includes('calcMeta({')) {
        content = content.replace(/title:\s*["'].*?["']/, `title: "${meta.title.replace(/"/g, '\\"')}"`);
        content = content.replace(/description:\s*["'].*?["']/, `description: "${meta.desc.replace(/"/g, '\\"')}"`);
        if (meta.primaryKw) {
            content = content.replace(/keywords:\s*\[.*?\]/, `keywords: ["${meta.primaryKw}", "nepal", "calculator", "free", "online"]`);
        }
    }

    // B. Strip old SEO blocks
    const oldMarkers = [
        /\s*\{\/\* SEO: Competitor-Data Driven FAQ[\s\S]*?<\/section>/g,
        /\s*\{\/\* Competitor-Data Driven SEO[\s\S]*?<\/section>/g,
        /\s*\{\/\* Dynamic Competitor-Data Driven FAQ[\s\S]*?<\/section>/g,
    ];
    for (const marker of oldMarkers) content = content.replace(marker, '');

    // C. Generate new FAQ block
    const kw0 = meta.primaryKw || folderName;
    const related = allKws.filter(k => k.includes(kw0.split(' ')[0])).slice(0, 5);
    const kwLinks = [kw0, ...related].map(k => `<strong>${k}</strong>`).join(', ');

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `How do I use the ${displayName} in Nepal?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Simply enter your values into our free ${kw0} tool. It uses latest algorithms for Nepal to provide instant results.` }
            },
            {
                "@type": "Question",
                "name": `Is this ${displayName} free?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Yes, NepaCal's ${displayName} is 100% free with no registration required.` }
            }
        ]
    };

    const block = `
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schema)}) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the ${displayName}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>${kw0}</strong> is optimized for Nepalese users. Whether you need an online ${kw0} or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: ${kwLinks}.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the ${displayName}?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Enter your values above to get results instantly.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is it accurate for Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Yes, our <strong>${kw0}</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>`;

    if (content.includes('</>')) {
        const lastIdx = content.lastIndexOf('</>');
        content = content.slice(0, lastIdx) + `${block}\n    ` + content.slice(lastIdx);
    } else if (content.includes('</main>')) {
        content = content.replace(/(<\/main>)/, `\n${block}\n    $1`);
    } else if (content.includes('</div>')) {
        const lastIdx = content.lastIndexOf('</div>');
        content = content.slice(0, lastIdx) + `\n${block}\n    ` + content.slice(lastIdx);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

// ─── 5. Walk Dir ─────────────────────────────────────────────────────────────
function walk(dir, results = []) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat && stat.isDirectory()) walk(full, results);
        else if (file === 'page.tsx') results.push(full);
    }
    return results;
}

// ─── 6. Execute ──────────────────────────────────────────────────────────────
const urlToMeta = loadStrategyData();
const allKws = loadCompetitorKeywords();
const allPages = walk(appDir);

let injected = 0;
let skipped = 0;

for (const page of allPages) {
    const url = getUrlFromFile(page);
    if (urlToMeta.has(url)) {
        injectSEO(page, urlToMeta.get(url), allKws);
        injected++;
        console.log(`[OK] Injected ${url}`);
    } else {
        skipped++;
        // console.log(`[SKIP] No metadata for ${url}`);
    }
}

console.log(`\nDONE: Injected ${injected} pages, skipped ${skipped}.`);
