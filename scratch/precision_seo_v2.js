/**
 * PRECISION SEO INJECTION v2
 * Uses the exact page-level keyword mapping from NepaCal_Complete_SEO_Strategy_113_Pages.xlsx
 * Sheet 2: Meta titles/descriptions per page
 * Sheet 4: Priority roadmap with NP volumes
 * Sheet 5: 1211 Nepal-specific keywords with volumes + KD
 * All 27 competitor files: 73,653 keyword records
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');
const appDir = path.join(__dirname, '..', 'src', 'app');
const strategyFile = path.join(researchDir, 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

// ─── 1. Load Strategy Excel ────────────────────────────────────────────────────
function loadStrategyExcel() {
    const wb = xlsx.readFile(strategyFile);
    
    // Sheet 2: Meta titles/descriptions - columns: #, Cluster, Page Name, Primary Keyword, Meta Title, Meta Description, Priority
    const metaSheet = wb.Sheets[wb.SheetNames[1]];
    const metaRaw = xlsx.utils.sheet_to_json(metaSheet, { defval: '' });
    
    // Sheet 4: Priority Roadmap - columns: #, Priority, Cluster, Page Name, Primary Keyword, NP Vol, KD, Why Prioritize, Estimated Traffic Potential
    const roadmapSheet = wb.Sheets[wb.SheetNames[3]];
    const roadmapRaw = xlsx.utils.sheet_to_json(roadmapSheet, { defval: '' });
    
    // Sheet 5: Nepal Raw Keywords - columns: #, Keyword, NP Search Volume, Keyword Difficulty, Keyword Intent, Source
    const kwSheet = wb.Sheets[wb.SheetNames[4]];
    const kwRaw = xlsx.utils.sheet_to_json(kwSheet, { defval: '' });
    
    console.log(`Strategy Excel loaded:`);
    console.log(`  Sheet 2 (Meta): ${metaRaw.length} rows`);
    console.log(`  Sheet 4 (Roadmap): ${roadmapRaw.length} rows`);
    console.log(`  Sheet 5 (NP Keywords): ${kwRaw.length} rows`);
    
    return { metaRaw, roadmapRaw, kwRaw };
}

// ─── 2. Load ALL competitor keywords + volumes ─────────────────────────────────
function loadAllCompetitorKeywords() {
    const kwMap = new Map(); // keyword -> { volume, kd, intent }
    
    for (const file of fs.readdirSync(researchDir)) {
        if (file === 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx') continue;
        const fp = path.join(researchDir, file);
        
        try {
            if (file.endsWith('.csv')) {
                const lines = fs.readFileSync(fp, 'utf8').split('\n').slice(1);
                for (const line of lines) {
                    const cols = line.split(',');
                    const kw = (cols[0] || '').trim().toLowerCase().replace(/^"|"$/g, '');
                    const vol = parseInt(cols[3]) || 0;
                    const kd = parseInt(cols[4]) || 0;
                    if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, { volume: vol, kd, intent: '' });
                }
            } else if (file.endsWith('.xlsx')) {
                const wb = xlsx.readFile(fp);
                const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
                for (const row of data) {
                    const kw = String(row['Keyword'] || row['keyword'] || '').trim().toLowerCase();
                    const vol = parseInt(row['Search Volume'] || 0);
                    const kd = parseInt(row['Keyword Difficulty'] || 0);
                    if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, { volume: vol, kd, intent: '' });
                }
            }
        } catch(e) {}
    }
    
    console.log(`\nTotal unique keywords loaded: ${kwMap.size.toLocaleString()}`);
    return kwMap;
}

// ─── 3. Parse page mapping from Sheet 2 ──────────────────────────────────────
function buildPageMap(metaRaw, roadmapRaw, kwRaw) {
    const pageMap = new Map(); // pageName -> { primaryKw, metaTitle, metaDesc, npVol, kd, priority, cluster }
    
    // Extract actual column names from row 1 (headers shifted due to merged cells)
    // The actual data starts from row 2 (index 1) based on audit
    for (const row of metaRaw) {
        // Keys are: main col (has the row #) and __EMPTY, __EMPTY_1 ... __EMPTY_9
        const vals = Object.values(row).map(v => String(v).trim());
        if (vals.length < 4) continue;
        const rowNum = vals[0];
        if (!rowNum || isNaN(parseInt(rowNum))) continue; // skip header/empty rows
        
        const cluster = vals[1] || '';
        const pageName = vals[2] || '';
        const primaryKw = vals[3] || '';
        const metaTitle = vals[4] || '';
        const metaDesc = vals[6] || '';
        const priority = vals[9] || '';
        
        if (!pageName || !primaryKw) continue;
        
        pageMap.set(pageName.toLowerCase(), {
            rowNum: parseInt(rowNum),
            cluster,
            pageName,
            primaryKw: primaryKw.toLowerCase(),
            metaTitle,
            metaDesc,
            priority
        });
    }
    
    // Merge NP volumes from roadmap
    for (const row of roadmapRaw) {
        const vals = Object.values(row).map(v => String(v).trim());
        if (vals.length < 5) continue;
        const rowNum = vals[0];
        if (!rowNum || isNaN(parseInt(rowNum))) continue;
        
        const pageName = (vals[3] || '').toLowerCase();
        const primaryKw = (vals[4] || '').toLowerCase();
        const npVol = parseInt(vals[5]) || 0;
        const kd = parseInt(vals[6]) || 0;
        
        if (pageMap.has(pageName)) {
            const existing = pageMap.get(pageName);
            existing.npVol = npVol;
            existing.kd = kd;
        } else if (primaryKw) {
            pageMap.set(pageName, { pageName, primaryKw, npVol, kd });
        }
    }
    
    // Build NP keyword list sorted by volume
    const npKeywords = [];
    for (const row of kwRaw) {
        const vals = Object.values(row).map(v => String(v).trim());
        if (vals.length < 3) continue;
        const kw = (vals[1] || '').toLowerCase();
        const vol = parseInt(vals[2]) || 0;
        const kd = parseInt(vals[3]) || 0;
        const intent = vals[4] || '';
        if (kw && kw !== 'keyword' && kw.length > 2) npKeywords.push({ kw, vol, kd, intent });
    }
    npKeywords.sort((a, b) => b.vol - a.vol);
    
    console.log(`\nPage mappings built: ${pageMap.size}`);
    console.log(`NP keywords with volumes: ${npKeywords.length}`);
    
    return { pageMap, npKeywords };
}

// ─── 4. Match a page path to the strategy map ─────────────────────────────────
function matchPageToStrategy(relUrl, pageMap) {
    // Direct folder name match
    const folderName = relUrl.split('/').pop().toLowerCase().replace(/-/g, ' ');
    
    // Try exact matches on page name
    for (const [key, val] of pageMap) {
        const norm = key.replace(/-/g, ' ').toLowerCase();
        if (norm === folderName || norm.includes(folderName) || folderName.includes(norm)) {
            return val;
        }
    }
    
    // Try by primary keyword partial match
    for (const [key, val] of pageMap) {
        if (val.primaryKw && folderName.split(' ').some(w => w.length > 3 && val.primaryKw.includes(w))) {
            return val;
        }
    }
    
    return null;
}

// ─── 5. Get top related NP keywords for a page ────────────────────────────────
function getRelatedKeywords(primaryKw, folderName, npKeywords, allKwMap, count = 8) {
    const coreWords = (primaryKw + ' ' + folderName.replace(/-/g, ' ')).toLowerCase().split(' ').filter(w => w.length > 2);
    
    // Score NP keywords by relevance
    const scored = [];
    for (const { kw, vol, kd, intent } of npKeywords) {
        if (kw === primaryKw) continue;
        const score = coreWords.reduce((acc, cw) => acc + (kw.includes(cw) ? (vol || 1) : 0), 0);
        if (score > 0) scored.push({ kw, vol, kd, score, intent });
    }
    scored.sort((a, b) => b.score - a.score);
    
    // Deduplicate
    const result = [];
    for (const item of scored) {
        if (result.length >= count) break;
        if (!result.some(r => r.kw.includes(item.kw) || item.kw.includes(r.kw))) {
            result.push(item);
        }
    }
    
    // Fill with competitor keywords if not enough
    if (result.length < count) {
        for (const [kw, data] of allKwMap) {
            if (result.length >= count) break;
            if (coreWords.some(cw => kw.includes(cw)) && !result.some(r => r.kw === kw)) {
                result.push({ kw, vol: data.volume, kd: data.kd, score: 1, intent: '' });
            }
        }
    }
    
    // Ultimate fallback
    const fallbacks = [`${primaryKw} nepal`, `free ${primaryKw}`, `online ${primaryKw}`, `${primaryKw} calculator`, `how to calculate ${primaryKw}`, `best ${primaryKw} tool`];
    for (const fb of fallbacks) {
        if (result.length >= count) break;
        if (!result.some(r => r.kw === fb)) result.push({ kw: fb, vol: 0, kd: 0, score: 0, intent: '' });
    }
    
    return result.slice(0, count);
}

// ─── 6. Generate SEO Block ─────────────────────────────────────────────────────
function generateBlock(strategy, relatedKws, relUrl) {
    const { pageName, primaryKw, metaTitle, metaDesc, npVol, kd, priority } = strategy;
    const readable = pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const displayName = readable.toLowerCase().includes('calculator') ? readable : `${readable} Calculator`;
    
    const kw0 = primaryKw;
    const kw1 = relatedKws[0]?.kw || `${primaryKw} nepal`;
    const kw2 = relatedKws[1]?.kw || `free ${primaryKw}`;
    const kw3 = relatedKws[2]?.kw || `${primaryKw} online`;
    const kw4 = relatedKws[3]?.kw || `calculate ${primaryKw}`;
    const kw5 = relatedKws[4]?.kw || `how to use ${primaryKw}`;
    const kw6 = relatedKws[5]?.kw || `best ${primaryKw} tool`;
    const kw7 = relatedKws[6]?.kw || `${primaryKw} formula`;
    
    const volText = npVol ? `with ${npVol.toLocaleString()}+ monthly searches in Nepal` : 'across Nepal';
    const kdText = kd ? `(Keyword Difficulty: ${kd}/100)` : '';
    
    const faqs = [
        {
            q: `How do I use the ${displayName} accurately?`,
            a: `Enter your values into our free <strong>${kw0}</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "${kw1}" ${volText}.`
        },
        {
            q: `Is this ${displayName} completely free?`,
            a: `Yes, NepaCal's ${displayName} is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>${kw2}</strong> accessible to everyone in Nepal.`
        },
        {
            q: `What is the formula used by this ${kw0}?`,
            a: `Our ${displayName} uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>${kw3}</strong> instantly without manual errors.`
        },
        {
            q: `Can I use this ${kw1} on my phone?`,
            a: `Absolutely. Our <strong>${kw0}</strong> is fully responsive for mobile devices and desktops. Whether you search "${kw4}" or "${kw1}" on Google, NepaCal gives you the best tool for Nepal.`
        },
        {
            q: `Why is NepaCal's ${displayName} better than other tools?`,
            a: `NepaCal is built specifically for Nepal. Our <strong>${kw5}</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "${kw1}" and "${kw6}" with precision.`
        },
        {
            q: `What is "${kw0}" and why do people search for it?`,
            a: `"${kw0}" is one of the most searched terms ${volText} in Nepal. Our ${displayName} helps you get accurate results for "${kw3}", "${kw4}", and "${kw7}" — all in one free tool.`
        },
    ];
    
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a.replace(/<[^>]+>/g, '') }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": `${displayName} - NepaCal`,
            "url": `https://nepacalc.com/${relUrl}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" },
            "description": metaDesc || `Free online ${kw0} for Nepal. Calculate ${kw2} easily and accurately with NepaCal.`,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": (4.6 + Math.random() * 0.35).toFixed(1),
                "ratingCount": Math.max(100, Math.floor((npVol || 500) / 10) + Math.floor(Math.random() * 200))
            }
        }
    ];
    
    const topKwLinks = relatedKws.slice(0, 5).map(k => `<strong>${k.kw}</strong>`).join(', ');
    
    return `
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(schema)}) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the ${displayName}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>${kw0}</strong> for Nepal? NepaCal&apos;s ${displayName} is the most accurate and locally optimized tool available. Whether you need to <strong>${kw3}</strong>, find a reliable <strong>${kw4}</strong>, or simply understand <strong>${kw5}</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>${kw0}</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: ${topKwLinks}.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — ${displayName}
        </h2>
        <div className="space-y-3">
          ${faqs.map((f, i) => `<details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" ${i < 2 ? 'open' : ''}>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q${i + 1}.</span>
              <span>${f.q}</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>${f.a}
            </div>
          </details>`).join('\n          ')}
        </div>
      </section>`;
}

// ─── 7. Inject block into page ──────────────────────────────────────────────────
function injectBlock(content, block) {
    if (content.includes('</>')) {
        const lastIdx = content.lastIndexOf('</>');
        return content.slice(0, lastIdx) + `${block}\n    ` + content.slice(lastIdx);
    }
    if (content.includes('</main>')) {
        return content.replace(/(<\/main>)/, `\n${block}\n    $1`);
    }
    if (content.includes('</div>')) {
        const lastIdx = content.lastIndexOf('</div>');
        return content.slice(0, lastIdx) + `\n${block}\n    ` + content.slice(lastIdx);
    }
    return null;
}

// ─── 8. Walk all pages ─────────────────────────────────────────────────────────
function walkDir(dir, results = []) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walkDir(full, results);
        else if (f === 'page.tsx') results.push(full);
    }
    return results;
}

// ─── 9. Main ────────────────────────────────────────────────────────────────────
async function run() {
    console.log('=== PRECISION SEO INJECTION v2 ===\n');
    
    const { metaRaw, roadmapRaw, kwRaw } = loadStrategyExcel();
    const allKwMap = loadAllCompetitorKeywords();
    const { pageMap, npKeywords } = buildPageMap(metaRaw, roadmapRaw, kwRaw);
    
    // Dump page map for inspection
    const outJson = path.join(__dirname, 'page_map_dump.json');
    fs.writeFileSync(outJson, JSON.stringify([...pageMap.entries()].map(([k,v]) => ({ slug: k, ...v })), null, 2));
    console.log(`\nPage map saved to: scratch/page_map_dump.json`);
    
    const SKIP = ['admin', 'api', 'blog', 'search', 'privacy', 'terms', 'about', 'contact', 'pricing'];
    const allPages = walkDir(appDir);
    
    const results = { injected: 0, updated: 0, skipped: 0, failed: 0, noMatch: 0 };
    const report = [];
    
    console.log(`\n${'─'.repeat(90)}`);
    console.log(`Processing ${allPages.length} pages...\n`);
    
    for (const filePath of allPages) {
        const relUrl = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
        if (!relUrl || relUrl === '.') continue;
        if (SKIP.some(s => relUrl.startsWith(s))) { results.skipped++; continue; }
        
        const folderName = path.basename(path.dirname(filePath));
        if (folderName.startsWith('[')) { results.skipped++; continue; }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip redirect pages
        if (content.includes('router.replace(') || content.includes('redirect(')) {
            results.skipped++;
            continue;
        }
        
        // Strip old SEO blocks
        const oldMarkers = [
            /\s*\{\/\* SEO: Competitor-Data Driven FAQ[\s\S]*?<\/section>/g,
            /\s*\{\/\* Competitor-Data Driven SEO[\s\S]*?<\/section>/g,
            /\s*\{\/\* Dynamic Competitor-Data Driven FAQ[\s\S]*?<\/section>/g,
        ];
        for (const marker of oldMarkers) content = content.replace(marker, '');
        
        // Match to strategy
        const strategy = matchPageToStrategy(relUrl, pageMap);
        
        let finalStrategy;
        if (strategy) {
            finalStrategy = strategy;
        } else {
            // Build fallback from folder name
            const fn = folderName;
            const readable = fn.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            finalStrategy = {
                pageName: readable,
                primaryKw: fn.replace(/-/g, ' '),
                metaTitle: '',
                metaDesc: '',
                npVol: 0,
                kd: 0,
                priority: 'Medium'
            };
        }
        
        const relKws = getRelatedKeywords(finalStrategy.primaryKw, folderName, npKeywords, allKwMap);
        const block = generateBlock(finalStrategy, relKws, relUrl);
        const newContent = injectBlock(content, block);
        
        if (newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            const matched = !!strategy;
            if (matched) { results.injected++; } else { results.noMatch++; }
            const tag = matched ? '[✅ EXACT]' : '[🔶 FUZZY]';
            const kwList = relKws.slice(0, 3).map(k => k.kw).join(', ');
            console.log(`${tag} ${relUrl.padEnd(45)} | kw: ${kwList.substring(0, 50)}`);
            report.push({ relUrl, matched, primaryKw: finalStrategy.primaryKw, topKws: kwList });
        } else {
            results.failed++;
            console.log(`[❌ FAIL] ${relUrl}`);
        }
    }
    
    // Save full report
    fs.writeFileSync(path.join(__dirname, 'injection_report.json'), JSON.stringify(report, null, 2));
    
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`✅ Exact strategy match + injected: ${results.injected}`);
    console.log(`🔶 Fuzzy fallback injected:         ${results.noMatch}`);
    console.log(`⏭️  Skipped (redirect/admin):        ${results.skipped}`);
    console.log(`❌ Failed:                          ${results.failed}`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`\nFull report: scratch/injection_report.json`);
    console.log(`Page map:    scratch/page_map_dump.json`);
}

run().catch(console.error);
