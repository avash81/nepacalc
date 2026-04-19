const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}
walk('./src/app/calculator').filter(f => f.endsWith('page.tsx')).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Only inject if it doesn't already have openGraph
  if (!content.includes('openGraph:')) {
    // Extract title
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    // Extract description
    const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
    
    if (titleMatch && descMatch) {
      const metaBlockEnd = content.indexOf('};', content.indexOf('metadata: Metadata = {'));
      if (metaBlockEnd !== -1) {
        const ogBlock = `
  openGraph: {
    title: '${titleMatch[1]}',
    description: '${descMatch[1]}',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${titleMatch[1]}',
    description: '${descMatch[1]}',
  },
`;
        content = content.slice(0, metaBlockEnd) + ogBlock + content.slice(metaBlockEnd);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Injected OpenGraph to: ' + file);
      }
    }
  }
});
