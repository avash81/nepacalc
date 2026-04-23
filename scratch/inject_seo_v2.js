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

    // Explicit manual mappings based on the directory structure
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
        'math-tools/geometry': 'geometry', // Not exactly present but fallback
        'time-calculator': 'date-duration',
        'time-zone-converter': 'world-clock', // may not exist
        'day-counter': 'date-duration', // approximation
    };

    const mappedSlug = exactMappings[slug] || slug;

    for (const p of allPages) {
        const relPath = path.relative(appDir, p).replace(/\\/g, '/');
        const dirName = path.dirname(relPath).split('/').pop();
        
        // Exact match of directory name
        if (dirName === mappedSlug || dirName === slug || dirName === slug.replace('-calculator', '')) {
            return p;
        }

        const pathWords = dirName.split('-').filter(Boolean);
        const score = calculateSimilarity(slugWords, pathWords);

        // Prefer exact path matches e.g. calculator/bmi
        if (relPath.includes(slug)) return p;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = p;
        }
    }

    return highestScore >= 0.5 ? bestMatch : null;
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
    const clusterSheet = workbook.Sheets['1. Keyword Clusters'];
    const metaSheet = workbook.Sheets['3. Meta Titles and Descriptions'];
    const clusters = xlsx.utils.sheet_to_json(clusterSheet, { range: 1 });
    const metas = xlsx.utils.sheet_to_json(metaSheet, { range: 1 });

    const appDir = path.join(__dirname, '..', 'src', 'app');
    const allPages = getAllPages(appDir);
    
    let updatedCount = 0;
    const missingUrls = [];

    for (let i = 0; i < clusters.length; i++) {
        const cRow = clusters[i];
        const mRow = metas[i];

        if (!cRow || !mRow) continue;

        let targetUrl = cRow['Target URL'];
        if (!targetUrl) continue;
        targetUrl = targetUrl.replace('nepacalc.com/', '').replace(/\/$/, '');

        const pageName = cRow['Page Name'];
        const keywords = cRow['Secondary Keywords (7 to 10 per cluster)'] || cRow['Primary Keyword'];
        let metaTitle = mRow['Meta Title'];
        let metaDesc = mRow['Meta Description'];
        
        if (metaTitle && metaTitle.includes('CHARS')) metaTitle = metaTitle.split('CHARS')[0].trim();
        if (metaDesc && metaDesc.includes('CHARS')) metaDesc = metaDesc.split('CHARS')[0].trim();

        const filePath = findBestMatch(targetUrl, allPages, appDir);
        if (!filePath) {
            missingUrls.push(targetUrl);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Update calcMeta block strictly inside the meta declaration
        const metaRegex = /export\s+const\s+metadata[^=]*=\s*calcMeta\s*\(\s*\{([^}]+)\}\s*\)/;
        if (metaRegex.test(content)) {
            // Need to carefully replace title and description inside this block
            content = content.replace(/(title\s*:\s*)(['"`].*?['"`])/g, `$1"${metaTitle}"`);
            content = content.replace(/(description\s*:\s*)(['"`].*?['"`])/g, `$1"${metaDesc}"`);
            modified = true;
        }

        // 2. Inject SEO paragraph (Authority Layer)
        if (!content.includes('SEO Authority Layer')) {
            const seoBlock = generateSeoParagraph(pageName, keywords);
            if (content.includes('</main>')) {
                content = content.replace(/(<\/main>)/, `\n      ${seoBlock}\n    $1`);
                modified = true;
            } else if (content.includes('</div>')) {
                const lastDivIndex = content.lastIndexOf('</div>');
                if (lastDivIndex !== -1) {
                    content = content.slice(0, lastDivIndex) + `\n      ${seoBlock}\n    ` + content.slice(lastDivIndex);
                    modified = true;
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
            console.log(`[OK] Updated ${pageName} -> ${path.relative(appDir, filePath)}`);
        } else {
            console.log(`[INFO] No changes needed or unable to modify: ${filePath}`);
        }
    }

    console.log(`\nSuccessfully updated ${updatedCount} pages with SEO metadata and localized Authority Layers.`);
    if (missingUrls.length > 0) {
        console.log(`\nCould not find physical files for ${missingUrls.length} planned pages. These may need to be built later.`);
    }
}

run();
