/**
 * V3 PRECISION SEO INJECTION (Final Strategy)
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const appDir = path.join(__dirname, '..', 'src', 'app');
const researchDir = path.join(__dirname, '..', 'research_keyword');
const strategyFile = path.join(researchDir, 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

// 1. Manual Overrides for tricky paths
const overrides = {
    'pregnancy-calculator': 'calculator/pregnancy-due-date',
    'pregnancy-week-calculator': 'calculator/pregnancy-due-date',
    'english-to-nepali-date-converter': 'calculator/nepali-date',
    'nepali-date-converter': 'calculator/nepali-date',
    'vat-calculator-nepal': 'calculator/nepal-vat',
    'salary-calculator': 'calculator/nepal-salary',
    'salary-slip-calculator': 'calculator/nepal-salary',
    'npr-exchange-rates': 'market-rates/exchange-rate',
    'vehicle-tax-calculator': 'calculator/nepal-vehicle-tax',
    'gpa-calculator': 'calculator/gpa',
    'grade-calculator': 'calculator/see-gpa',
    'land-area-calculator': 'calculator/nepal-land',
    'land-unit-converter': 'calculator/nepal-land',
    'emi-calculator': 'calculator/loan-emi',
    'compound-interest-nepal': 'calculator/compound-interest',
    'loan-calculator': 'calculator/nepal-home-loan',
    'number-to-roman': 'calculator/roman-numerals',
    'roman-numeral-converter': 'calculator/roman-numerals',
    'bmi-calculator': 'calculator/bmi',
    'bmr-calculator': 'calculator/bmr',
    'ideal-weight-calculator': 'calculator/ideal-weight',
    'standard-deviation-calculator': 'calculator/standard-deviation',
    'z-score-calculator': 'calculator/z-score',
    'rounding-calculator': 'calculator/rounding',
    'quadratic-equation-calculator': 'calculator/quadratic-solver',
    'matrix-calculator': 'calculator/matrices',
    'hcf-gcf-calculator': 'calculator/lcm-gcf-calculator',
    'lcm-calculator': 'calculator/lcm-gcf-calculator',
    'kinetic-energy-calculator': 'calculator/physics-energy',
    'molecular-weight-calculator': 'calculator/chemistry-molar',
    'average-calculator': 'calculator/statistics-plus',
    'mean-median-mode-calculator': 'calculator/statistics-plus'
};

function loadStrategyData() {
    const wb = xlsx.readFile(strategyFile);
    const mappingSheet = wb.Sheets['2. Keyword Mapping'];
    const mappingRaw = xlsx.utils.sheet_to_json(mappingSheet, { header: 1 });
    const urlToPageName = new Map();
    for (let i = 2; i < mappingRaw.length; i++) {
        const row = mappingRaw[i];
        if (!row || !row[2] || !row[3]) continue;
        const pageName = String(row[2]).trim();
        const rawUrl = String(row[3]).trim().replace('nepacalc.com', '').replace(/^\/+/, '').replace(/\/+$/, '') || 'root';
        urlToPageName.set(rawUrl, pageName);
    }

    const metaSheet = wb.Sheets['3. Meta Titles and Descriptions'];
    const metaRaw = xlsx.utils.sheet_to_json(metaSheet, { header: 1 });
    const pageNameToMeta = new Map();
    for (let i = 3; i < metaRaw.length; i++) {
        const row = metaRaw[i];
        if (!row || !row[2]) continue;
        const pageName = String(row[2]).trim();
        pageNameToMeta.set(pageName, {
            primaryKw: String(row[3] || '').trim(),
            title: String(row[4] || '').trim(),
            desc: String(row[7] || '').trim()
        });
    }

    const urlToMeta = new Map();
    for (const [url, name] of urlToPageName) {
        if (pageNameToMeta.has(name)) urlToMeta.set(url, pageNameToMeta.get(name));
    }
    return urlToMeta;
}

function loadCompetitorKeywords() {
    const kwMap = new Map();
    fs.readdirSync(researchDir).forEach(file => {
        if (file.includes('Strategy')) return;
        const fp = path.join(researchDir, file);
        try {
            if (file.endsWith('.csv')) {
                fs.readFileSync(fp, 'utf8').split('\n').slice(1).forEach(line => {
                    const kw = line.split(/[;,]/)[0]?.trim().toLowerCase().replace(/^"|"$/g, '');
                    if (kw && kw.length > 2) kwMap.set(kw, true);
                });
            } else if (file.endsWith('.xlsx')) {
                xlsx.utils.sheet_to_json(xlsx.readFile(fp).Sheets[xlsx.readFile(fp).SheetNames[0]]).forEach(row => {
                    const kw = String(row['Keyword'] || row['keyword'] || '').trim().toLowerCase();
                    if (kw && kw.length > 2) kwMap.set(kw, true);
                });
            }
        } catch(e) {}
    });
    return Array.from(kwMap.keys());
}

function injectSEO(filePath, meta, allKws) {
    let content = fs.readFileSync(filePath, 'utf8');
    const displayName = meta.title.split('|')[0].trim() || path.basename(path.dirname(filePath));
    const kw0 = meta.primaryKw || displayName.toLowerCase();

    // 1. Meta Update
    if (content.includes('calcMeta({')) {
        content = content.replace(/title:\s*["'].*?["']/, `title: "${meta.title.replace(/"/g, '\\"')}"`);
        content = content.replace(/description:\s*["'].*?["']/, `description: "${meta.desc.replace(/"/g, '\\"')}"`);
        content = content.replace(/keywords:\s*\[.*?\]/, `keywords: ["${kw0}", "nepal", "calculator", "free", "online"]`);
    }

    // 2. Clean old
    content = content.replace(/\s*\{\/\* SEO: Competitor-Data Driven FAQ[\s\S]*?<\/section>/g, '');

    // 3. New Content
    const related = allKws.filter(k => k.includes(kw0.split(' ')[0])).slice(0, 5);
    const kwLinks = [kw0, ...related].map(k => `<strong>${k}</strong>`).join(', ');

    const block = `
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the ${displayName} tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free ${kw0} tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this ${displayName} free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's ${displayName} is 100% free with no registration required." } }
          ]
        }) }}
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

    const closeTag = content.includes('</>') ? '</>' : (content.includes('</main>') ? '</main>' : '</div>');
    const idx = content.lastIndexOf(closeTag);
    if (idx !== -1) {
        fs.writeFileSync(filePath, content.slice(0, idx) + block + '\n    ' + content.slice(idx), 'utf8');
    }
}

const urlToMeta = loadStrategyData();
const allKws = loadCompetitorKeywords();
const pages = [];
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.tsx') pages.push(p);
    });
}
walk(appDir);

let count = 0;
pages.forEach(p => {
    const relPath = path.relative(appDir, path.dirname(p)).replace(/\\/g, '/');
    const slug = relPath.split('/').pop();
    const url = relPath || 'root';

    // 1. Direct match
    let meta = urlToMeta.get(url);
    // 2. Overrides
    if (!meta) {
        for (const [exSlug, fsPath] of Object.entries(overrides)) {
            if (fsPath === url || fsPath === relPath) {
                meta = urlToMeta.get(exSlug);
                break;
            }
        }
    }
    // 3. Slug match
    if (!meta) meta = urlToMeta.get(slug);
    // 4. Reverse slug match (excel slug exists in file path)
    if (!meta) {
        for (const [exUrl, m] of urlToMeta) {
            if (url.includes(exUrl) || exUrl.includes(slug)) {
                meta = m;
                break;
            }
        }
    }

    if (meta) {
        injectSEO(p, meta, allKws);
        count++;
        console.log(`[OK] ${url} -> ${meta.primaryKw}`);
    } else {
        // console.log(`[SKIP] ${url}`);
    }
});

console.log(`\nTOTAL: ${count} pages optimized.`);
