const fs = require('fs');
const path = require('path');
const appDir = 'src/app';
const publicDir = 'public';
const pages = [];
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.tsx') {
            const rel = path.relative(appDir, path.dirname(p)).replace(/\\/g, '/');
            if (!rel.includes('[') && !rel.startsWith('admin') && !rel.startsWith('api') && !rel.startsWith('_')) {
                pages.push(rel === '' ? '' : rel + '/');
            }
        }
    });
}
walk(appDir);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://nepacalc.com/${p}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${pages.length} URLs.`);
