/**
 * Adds 'use client' directive to all SEO data files that contain JSX.
 * This is required for Next.js 14 static export to compile JSX in data modules.
 */
const fs = require('fs');
const path = require('path');

const SEO_DIR = path.join(__dirname, '../src/data/seo');
const files = fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.tsx') && f !== 'index.tsx' && f !== 'types.ts');

files.forEach(file => {
  const filePath = path.join(SEO_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has 'use client'
  if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
    console.log(`  SKIP: ${file} (already has 'use client')`);
    return;
  }

  // Check if this file has JSX content
  if (!content.includes('content: (') && !content.includes('content:(')) {
    console.log(`  SKIP: ${file} (no JSX content field found)`);
    return;
  }

  // Add 'use client' to the top, before any imports
  content = "'use client';\n" + content;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  FIXED: ${file} - added 'use client'`);
});

// Also fix seo-content.tsx to be a client module
const seoContentPath = path.join(__dirname, '../src/data/seo-content.tsx');
let seoContent = fs.readFileSync(seoContentPath, 'utf8');
if (!seoContent.startsWith("'use client'")) {
  seoContent = "'use client';\n" + seoContent;
  fs.writeFileSync(seoContentPath, seoContent, 'utf8');
  console.log('  FIXED: seo-content.tsx - added use client');
}

console.log('\nDone. Re-run npm run build to verify.');
