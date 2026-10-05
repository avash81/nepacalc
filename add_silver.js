const fs = require('fs');

let content = fs.readFileSync('src/app/market-rates/history/[year]/page.tsx', 'utf8');

// 1. Update gold condition
const oldCond = "if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold')) {";
const newCond = "if (r.metal === 'Gold' && (r.rate_type.includes('Fine') || r.rate_type === '24K Hallmark Gold' || r.rate_type === 'Gold Rate Per Tola' || r.rate_type === 'Gold')) {";
content = content.replace(oldCond, newCond);

// 2. Add silver logic
const oldLogic = `  const avgGold = goldRecordsForSummary.length > 0 ? sumGold / goldRecordsForSummary.length : null;
  const change = (firstGold && latestGold) ? (latestGold.fine_gold as number) - (firstGold.fine_gold as number) : null;`;

const newLogic = `  const avgGold = goldRecordsForSummary.length > 0 ? sumGold / goldRecordsForSummary.length : null;
  const change = (firstGold && latestGold) ? (latestGold.fine_gold as number) - (firstGold.fine_gold as number) : null;

  // Silver Summary logic
  const silverRecordsForSummary = tableData.filter(d => d.silver !== null);
  const latestSilver = silverRecordsForSummary[0];
  const firstSilver = silverRecordsForSummary[silverRecordsForSummary.length - 1];
  
  let maxSilver = null;
  let maxSilverDate = '';
  let minSilver = null;
  let minSilverDate = '';
  let sumSilver = 0;

  silverRecordsForSummary.forEach(d => {
    const val = d.silver;
    sumSilver += val;
    if (maxSilver === null || val > maxSilver) { maxSilver = val; maxSilverDate = d.date_ad; }
    if (minSilver === null || val < minSilver) { minSilver = val; minSilverDate = d.date_ad; }
  });

  const avgSilver = silverRecordsForSummary.length > 0 ? sumSilver / silverRecordsForSummary.length : null;
  const changeSilver = (firstSilver && latestSilver) ? latestSilver.silver - firstSilver.silver : null;`;
content = content.replace(oldLogic, newLogic);

// 3. Add Silver JSX
const oldJsx = `        </section>

        {/* 7. Chart/visualization */}`;

const newJsx = `        </section>

        {/* Silver Rate Summary */}
        <section className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Silver Rate Summary for {year}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Latest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(latestSilver?.silver ?? null)}</span>
              <span className="block text-xs text-slate-400">{latestSilver?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Highest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(maxSilver)}</span>
              <span className="block text-xs text-slate-400">{maxSilverDate || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Lowest Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(minSilver)}</span>
              <span className="block text-xs text-slate-400">{minSilverDate || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Average Rate</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(avgSilver)}</span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">First Recorded</span>
              <span className="block text-xl font-black text-slate-700">{fmtNPR(firstSilver?.silver ?? null)}</span>
              <span className="block text-xs text-slate-400">{firstSilver?.date_ad || 'N/A'}</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 mb-1">Change ({year})</span>
              <span className={\`block text-xl font-black \${changeSilver && changeSilver > 0 ? 'text-emerald-600' : 'text-rose-600'}\`}>
                {changeSilver !== null ? (changeSilver > 0 ? '+' : '') + fmtNPR(changeSilver) : 'N/A'}
              </span>
              <span className="block text-xs text-slate-400">per tola</span>
            </div>
          </div>
        </section>

        {/* 7. Chart/visualization */}`;

content = content.replace(oldJsx, newJsx);

fs.writeFileSync('src/app/market-rates/history/[year]/page.tsx', content);
console.log('Script ran successfully');
