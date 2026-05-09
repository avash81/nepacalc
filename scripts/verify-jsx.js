const fs = require('fs');
const src = fs.readFileSync('src/data/seo-content.tsx', 'utf8');
const lines = src.split('\n');

// Check for common JSX text-content problems in lines 7500+
const issues = [];
for (let i = 7499; i < lines.length; i++) {
  const line = lines[i];
  // Skip attribute lines
  if (line.includes('className=') || line.includes('href=') || line.includes('target=') || line.includes('key=')) continue;
  
  // Check for unescaped apostrophe in likely text content (between > and <)
  // Find text segments between > and <
  let pos = 0;
  while (pos < line.length) {
    const gt = line.indexOf('>', pos);
    if (gt === -1) break;
    pos = gt + 1;
    const lt = line.indexOf('<', pos);
    const end = lt === -1 ? line.length : lt;
    const text = line.slice(pos, end);
    if (text.includes("'") && !text.includes("&apos;")) {
      issues.push({ line: i+1, text: text.trim().substring(0, 60) });
    }
    pos = end;
  }
}

if (issues.length === 0) {
  console.log('✅ No unescaped apostrophe issues found in new content');
} else {
  console.log('❌ Found ' + issues.length + ' issues:');
  issues.slice(0,10).forEach(x => console.log('  Line ' + x.line + ': ' + x.text));
}
