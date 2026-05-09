const fs = require('fs');
const file = 'src/data/seo-content.tsx';
let src = fs.readFileSync(file, 'utf8');

// Only fix the newly added section (after original 7500 lines)
const lines = src.split('\n');
const fixFrom = 7499; // 0-indexed line 7500

const fixed = lines.map((line, i) => {
  if (i < fixFrom) return line;
  // Skip JSX attribute lines (contain className=, href=, etc.)
  if (line.includes('className=') || line.includes('href=') || line.includes('target=') || line.includes('rel=')) return line;
  // Fix unescaped << and >> in text content
  line = line.replace(/<<(?!\/)/g, '&lt;&lt;');
  line = line.replace(/(?<!<)>>/g, '&gt;&gt;');
  // Fix standalone & not part of HTML entity (&amp; &lt; &gt; &middot; &copy; &apos;)
  line = line.replace(/&(?!(amp|lt|gt|middot|copy|apos|quot|nbsp|mdash|ndash|bull|#\d+);)/g, '&amp;');
  return line;
});

const result = fixed.join('\n');
fs.writeFileSync(file, result, 'utf8');
console.log('✅ Fixed JSX escape issues in newly added content');
