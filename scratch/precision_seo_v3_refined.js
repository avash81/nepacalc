/**
 * V3 PRECISION SEO INJECTION (Refined)
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');
const appDir = path.join(__dirname, '..', 'src', 'app');
const strategyFile = path.join(researchDir, 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

function loadStrategyData() {
    const wb = xlsx.readFile(strategyFile);
    
    // Sheet 2: Mapping
    const mappingSheet = wb.Sheets['2. Keyword Mapping'];
    const mappingRaw = xlsx.utils.sheet_to_json(mappingSheet, { header: 1 });
    const urlToPageName = new Map();
    for (let i = 2; i < mappingRaw.length; i++) {
        const row = mappingRaw[i];
        if (!row || row.length < 4) continue;
        const pageName = String(row[2]).trim();
        const targetUrl = String(row[3]).trim().replace('nepacalc.com', '').replace(/^\/+/, '').replace(/\/+$/, '');
        if (pageName) {
            urlToPageName.set(targetUrl || 'root', pageName);
        }
    }

    // Sheet 3: Meta
    const metaSheet = wb.Sheets['3. Meta Titles and Descriptions'];
    const metaRaw = xlsx.utils.sheet_to_json(metaSheet, { header: 1 });
    const pageNameToMeta = new Map();
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

    const urlToMeta = new Map();
    for (const [url, name] of urlToPageName) {
        if (pageNameToMeta.has(name)) {
            urlToMeta.set(url, pageNameToMeta.get(name));
        }
    }
    return urlToMeta;
}

function loadCompetitorKeywords() {
    const kwMap = new Map();
    const files = fs.readdirSync(researchDir).filter(f => !f.includes('Strategy'));
    for (const file of files) {
        const fp = path.join(researchDir, file);
        try {
            if (file.endsWith('.csv')) {
                const lines = fs.readFileSync(fp, 'utf8').split('\n').slice(1);
                for (const line of lines) {
                    const kw = line.split(/[;,]/)[0]?.trim().toLowerCase().replace(/^"|"$/g, '');
                    if (kw && kw.length > 2) kwMap.set(kw, true);
                }
            } else if (file.endsWith('.xlsx')) {
                const wb = xlsx.readFile(fp);
                const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                for (const row of data) {
                    const kw = String(row['Keyword'] || row['keyword'] || '').trim().toLowerCase();
                    if (kw && kw.length > 2) kwMap.set(kw, true);
                }
            }
        } catch(e) {}
    }
    return Array.from(kwMap.keys());
}

function getUrlFromFile(filePath) {
    let rel = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
    return rel === '' ? 'root' : rel;
}

function injectSEO(filePath, meta, allKws) {
    let content = fs.readFileSync(filePath, 'utf8');
    const folderName = path.basename(path.dirname(filePath));
    const displayName = meta.title.split('|')[0].trim() || folderName;

    // 1. Update calcMeta
    if (content.includes('calcMeta({')) {
        content = content.replace(/title:\s*["'].*?["']/, `title: "${meta.title.replace(/"/g, '\\"')}"`);
        content = content.replace(/description:\s*["'].*?["']/, `description: "${meta.desc.replace(/"/g, '\\"')}"`);
        if (meta.primaryKw) {
            content = content.replace(/keywords:\s*\[.*?\]/, `keywords: ["${meta.primaryKw}", "nepal", "calculator", "free", "online"]`);
        }
    }

    // 2. Strip old
    content = content.replace(/\s*\{\/\* SEO: Competitor-Data Driven FAQ[\s\S]*?<\/section>/g, '');

    // 3. New Block
    const kw0 = meta.primaryKw || folderName;
    const related = allKws.filter(k => k.includes(kw0.split(' ')[0])).slice(0, 5);
    const kwLinks = [kw0, ...related].map(k => `<strong>${k}</strong>`).join(', ');

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `How to use the ${displayName} tool?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Simply enter your data and our free ${kw0} tool will provide instant results tailored for Nepal.` }
            },
            {
                "@type": "Question",
                "name": `Is this ${displayName} free to use?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Yes, this ${kw0} tool is 100% free with no hidden charges.` }
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

const urlToMeta = loadStrategyData();
const allKws = loadCompetitorKeywords();
const appPages = [];
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.tsx') appPages.push(p);
    });
}
walk(appDir);

let count = 0;
appPages.forEach(p => {
    const url = getUrlFromFile(p);
    const slug = url.split('/').pop();
    
    // Flexible matching: check exact URL, or just the slug
    let meta = urlToMeta.get(url);
    if (!meta) meta = urlToMeta.get(slug);
    if (!meta) {
        // Try matching by removing /calculator prefix if present in file path but not Excel
        const cleanUrl = url.replace('calculator/', '');
        meta = urlToMeta.get(cleanUrl);
    }

    if (meta) {
        injectSEO(p, meta, allKws);
        count++;
        console.log(`[OK] Injected ${url}`);
    }
});

console.log(`\nDONE: Injected ${count} pages.`);
