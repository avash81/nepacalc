const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Helper to find page.tsx given a URL slug
function findFileForSlug(baseDir, targetUrl) {
    let slug = targetUrl.replace('nepacalc.com/', '').replace(/\/$/, '');
    if (!slug) slug = 'home'; // Root

    // Typical paths
    const candidates = [
        path.join(baseDir, slug, 'page.tsx'),
        path.join(baseDir, 'calculator', slug, 'page.tsx'),
        path.join(baseDir, slug.replace('-calculator', ''), 'page.tsx'),
        path.join(baseDir, 'calculator', slug.replace('-calculator', ''), 'page.tsx')
    ];

    if (slug === 'home') return path.join(baseDir, 'page.tsx');

    // Special mappings
    if (slug === 'emi-calculator') return path.join(baseDir, 'calculator', 'loan-emi', 'page.tsx');
    if (slug === 'nepal-tds-calculator') return path.join(baseDir, 'calculator', 'nepal-tds-calculator', 'page.tsx');

    for (const c of candidates) {
        if (fs.existsSync(c)) return c;
    }

    // Deep search as fallback
    let found = null;
    function search(dir) {
        if (found) return;
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                if (f === slug || f === slug.replace('-calculator', '')) {
                    const p = path.join(fullPath, 'page.tsx');
                    if (fs.existsSync(p)) {
                        found = p;
                        return;
                    }
                }
                search(fullPath);
            }
        }
    }
    search(baseDir);
    return found;
}

function generateSeoParagraph(pageName, keywords) {
    const kArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
    const k1 = kArray[0] || '';
    const k2 = kArray[1] || '';
    const k3 = kArray[2] || '';
    const k4 = kArray[3] || '';
    
    return `{/* SEO Authority Layer */}
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the ${pageName}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          Welcome to the ultimate guide on the <strong>${pageName}</strong>. If you've been looking for an accurate <strong>${k1}</strong> or need help with a reliable <strong>${k2}</strong>, you've come to the right place. Our suite of tools is designed specifically for the Nepal market, ensuring your <strong>${k3}</strong> calculations are exact and up-to-date.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          From complex calculations to simple daily conversions, leveraging a free <strong>${k4}</strong> can save you time and provide peace of mind. NepaCal's <strong>${k1}</strong> is fast, responsive, and completely free to use online. Explore our platform for all your calculation needs!
        </p>
      </section>`;
}

async function run() {
    const dataPath = 'research_keyword/NepaCal_Complete_SEO_Strategy_113_Pages.xlsx';
    if (!fs.existsSync(dataPath)) {
        console.error("Excel file not found at", dataPath);
        return;
    }

    const workbook = xlsx.readFile(dataPath);
    
    // Sheets: 1: Clusters, 3: Meta
    const clusterSheet = workbook.Sheets['1. Keyword Clusters'];
    const metaSheet = workbook.Sheets['3. Meta Titles and Descriptions'];
    
    const clusters = xlsx.utils.sheet_to_json(clusterSheet, { range: 1 }); // Skip header row
    const metas = xlsx.utils.sheet_to_json(metaSheet, { range: 1 });

    const appDir = path.join(__dirname, '..', 'src', 'app');
    let updatedCount = 0;

    for (let i = 0; i < clusters.length; i++) {
        const cRow = clusters[i];
        const mRow = metas[i]; // assuming matching index

        if (!cRow || !mRow) continue;

        const targetUrl = cRow['Target URL'];
        const pageName = cRow['Page Name'];
        const keywords = cRow['Secondary Keywords (7 to 10 per cluster)'] || cRow['Primary Keyword'];
        
        let metaTitle = mRow['Meta Title'];
        let metaDesc = mRow['Meta Description'];
        
        // Clean meta length indicators if present (e.g. "  CHARS 36")
        if (metaTitle && metaTitle.includes('CHARS')) metaTitle = metaTitle.split('CHARS')[0].trim();
        if (metaDesc && metaDesc.includes('CHARS')) metaDesc = metaDesc.split('CHARS')[0].trim();

        if (!targetUrl) continue;

        const filePath = findFileForSlug(appDir, targetUrl);
        if (!filePath) {
            console.warn(`[SKIP] Could not find file for URL: ${targetUrl}`);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Update calcMeta block
        const metaRegex = /export\s+const\s+metadata[^=]*=\s*calcMeta\s*\(\s*\{([^}]+)\}\s*\)/;
        if (metaRegex.test(content)) {
            // Replace title and description inside calcMeta
            content = content.replace(/(title\s*:\s*)(['"`].*?['"`])/g, `$1"${metaTitle}"`);
            content = content.replace(/(description\s*:\s*)(['"`].*?['"`])/g, `$1"${metaDesc}"`);
            modified = true;
        } else {
             console.log(`[INFO] No calcMeta found in ${filePath}, skipping meta update.`);
        }

        // 2. Inject SEO paragraph (Authority Layer)
        if (!content.includes('SEO Authority Layer') && content.includes('<main')) {
            const seoBlock = generateSeoParagraph(pageName, keywords);
            // Insert right before </main>
            content = content.replace(/(<\/main>)/, `\n      ${seoBlock}\n    $1`);
            modified = true;
        } else if (!content.includes('SEO Authority Layer') && content.includes('</div>')) {
            // Fallback for pages without <main>
            const seoBlock = generateSeoParagraph(pageName, keywords);
            // Insert right before the LAST </div>
            const lastDivIndex = content.lastIndexOf('</div>');
            if (lastDivIndex !== -1) {
                content = content.slice(0, lastDivIndex) + `\n      ${seoBlock}\n    ` + content.slice(lastDivIndex);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`[OK] Updated ${filePath}`);
            updatedCount++;
        }
    }

    console.log(`\nSuccessfully updated ${updatedCount} pages with SEO metadata and localized Authority Layers.`);
}

run();
