const fs = require("fs");
const path = require("path");
const appDir = path.join(process.cwd(), "src", "app");
const issues = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walkDir(full); }
    else if (entry.name === "page.tsx") {
      const rel = full.replace(appDir + path.sep, "").replace(/\\/g, "/");
      if (rel.includes("admin") || rel.includes("[")) continue;
      const content = fs.readFileSync(full, "utf8");
      const p = [];

      if (content.includes("min-h-screen") && content.includes("animate-spin")) p.push("CRITICAL: Full-screen spinner blocking Googlebot");
      
      const relCanon = content.match(/canonical.*?"(\/[^h"][^"]+)"/);
      if (relCanon) p.push("WARN: Relative canonical: " + relCanon[1]);

      const staleYear = content.match(/2081|2080|2079/);
      if (staleYear) p.push("WARN: Stale year ref: " + staleYear[0]);

      if (!content.includes("description:")) p.push("WARN: No meta description");

      if (content.match(/319500|316000|315000|314000|318000/)) p.push("WARN: Hardcoded gold price");

      if (!content.includes("openGraph") && !content.includes("og:") && !content.includes("calcMeta") && !content.includes("JsonLd")) p.push("WARN: No OpenGraph");

      const titleMatch = content.match(/title:\s*[""]([^""]+)[""]/);
      if (titleMatch && titleMatch[1].length > 65) p.push("WARN: Title too long (" + titleMatch[1].length + " chars): " + titleMatch[1].substring(0,55) + "...");

      if (!content.includes("ld+json") && !content.includes("JsonLd") && !content.includes("schema.org")) p.push("INFO: No schema markup");

      if (p.length > 0) issues.push({ page: rel, issues: p });
    }
  }
}
walkDir(appDir);
const critical = issues.filter(i => i.issues.some(x => x.startsWith("CRITICAL")));
const warns = issues.filter(i => i.issues.some(x => x.startsWith("WARN")));
console.log("\n=== CRITICAL ===");
if (!critical.length) console.log("None found - all clear!");
critical.forEach(i => { console.log("\n  " + i.page); i.issues.filter(x=>x.startsWith("CRITICAL")).forEach(x=>console.log("    X " + x)); });
console.log("\n=== WARNINGS (by page) ===");
warns.forEach(i => { console.log("\n  " + i.page); i.issues.filter(x=>x.startsWith("WARN")).forEach(x=>console.log("    W " + x)); });
const noSchema = issues.filter(i => i.issues.some(x => x.startsWith("INFO")));
console.log("\n=== SUMMARY ===");
console.log("  CRITICAL: " + critical.length);
console.log("  Pages with warnings: " + warns.length);
console.log("  Pages missing schema: " + noSchema.length);
console.log("  Total issues: " + issues.reduce((a,i) => a+i.issues.length, 0));
