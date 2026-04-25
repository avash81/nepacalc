const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');
const calcDataFile = path.join(__dirname, '..', 'src', 'data', 'calculators.tsx');

// Extract slugs from calculators.tsx
const calcContent = fs.readFileSync(calcDataFile, 'utf8');
const slugs = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(calcContent)) !== null) {
  slugs.push(match[1]);
}

console.log(`Found ${slugs.length} calculators in registry.`);

const kwMap = new Map(); // kw -> { vol, kd }

// Load a few major files for speed, or all if small
for (const file of fs.readdirSync(researchDir)) {
  if (!file.endsWith('.csv') && !file.endsWith('.xlsx')) continue;
  const fp = path.join(researchDir, file);
  try {
    if (file.endsWith('.csv')) {
      const lines = fs.readFileSync(fp, 'utf8').split('\n').slice(1);
      for (const line of lines) {
        const cols = line.split(',');
        const kw = (cols[0] || '').trim().toLowerCase().replace(/^"|"$/g, '');
        const vol = parseInt(cols[3]) || 0;
        const kd = parseInt(cols[4]) || 0;
        if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, { vol, kd });
      }
    } else if (file === 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx') {
       const wb = xlsx.readFile(fp);
       const kwSheet = wb.Sheets[wb.SheetNames[4]];
       const kwRaw = xlsx.utils.sheet_to_json(kwSheet, { defval: '' });
       for (const row of kwRaw) {
         const vals = Object.values(row).map(v => String(v).trim());
         if (vals.length < 3) continue;
         const kw = (vals[1] || '').toLowerCase();
         const vol = parseInt(vals[2]) || 0;
         const kd = parseInt(vals[3]) || 0;
         if (kw.length > 2 && !kwMap.has(kw)) kwMap.set(kw, { vol, kd });
       }
    }
  } catch(e) {}
}

console.log(`Loaded ${kwMap.size} unique keywords.`);

const clusters = {};

for (const slug of slugs) {
  const parts = slug.split('/');
  const baseSlug = parts[parts.length - 1];
  const nameWords = baseSlug.split('-').filter(w => w.length > 2);
  
  const scored = [];
  for (const [kw, data] of kwMap) {
    let score = 0;
    let matches = 0;
    for (const w of nameWords) {
      if (kw.includes(w)) {
        score += (data.vol || 10);
        matches++;
      }
    }
    if (kw.includes('nepal') && (slug.includes('nepal') || slug.includes('nepse'))) score += 500;
    if (matches > 0) {
      scored.push({ kw, ...data, score: score * matches });
    }
  }
  
  scored.sort((a, b) => b.score - a.score);
  
  const selected = [];
  for (const item of scored) {
    if (selected.length >= 10) break;
    if (!selected.some(s => s.kw.includes(item.kw) || item.kw.includes(s.kw))) {
      selected.push(item);
    }
  }
  
  // Fallbacks if not enough
  if (selected.length < 8) {
    const fallbacks = [
      `${baseSlug.replace(/-/g, ' ')} calculator`,
      `free ${baseSlug.replace(/-/g, ' ')}`,
      `online ${baseSlug.replace(/-/g, ' ')}`,
      `how to calculate ${baseSlug.replace(/-/g, ' ')}`,
      `${baseSlug.replace(/-/g, ' ')} tool`,
      `best ${baseSlug.replace(/-/g, ' ')}`,
      `${baseSlug.replace(/-/g, ' ')} formula`,
      `${baseSlug.replace(/-/g, ' ')} nepal`
    ];
    for (const fb of fallbacks) {
      if (selected.length >= 10) break;
      if (!selected.some(s => s.kw === fb)) selected.push({ kw: fb, vol: 0, kd: 0 });
    }
  }
  
  clusters[slug] = selected.map(s => s.kw);
}

fs.writeFileSync(path.join(__dirname, 'keyword_clusters.json'), JSON.stringify(clusters, null, 2));
console.log('Clusters saved to keyword_clusters.json');
