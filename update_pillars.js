const fs = require('fs');
const path = require('path');

const pillars = ['nepal', 'market-rates', 'finance', 'engineering', 'math-tools', 'health', 'converters'];
const basePath = path.join(process.cwd(), 'src', 'app');

pillars.forEach(pillar => {
  const file = path.join(basePath, pillar, 'page.tsx');
  if (!fs.existsSync(file)) {
    console.log('Not found:', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');

  // We want to replace <JsonLd type="collection" ... /> with unified one
  const regex = /<JsonLd[\s\S]*?type="collection"[\s\S]*?data=\{\{([\s\S]*?)\}\}[\s\S]*?\/>/;
  
  content = content.replace(regex, (match, dataBody) => {
    // Extract name and description from the match if possible
    const nameMatch = dataBody.match(/name:\s*['"](.*?)['"]/);
    const descMatch = dataBody.match(/description:\s*['"](.*?)['"]/);
    
    const name = nameMatch ? nameMatch[1] : '';
    const desc = descMatch ? descMatch[1] : '';
    const url = 'https://nepacalc.com/' + pillar + '/';

    const toolsVarMatch = match.match(/calculators:\s*([a-zA-Z0-9_]+)\.map/);
    const toolsVar = toolsVarMatch ? toolsVarMatch[1] : (pillar === 'nepal' ? 'nepalTools' : (pillar === 'market-rates' ? 'marketTools' : 'tools'));
    
    return \<JsonLd
        type="unified"
        data={{
          url: '\',
          collection: {
            url: '\',
            name: '\',
            description: '\',
          },
          itemList: {
            url: '\',
            name: '\ - List',
            description: 'List of calculators in \',
            items: \.map((calculator, index) => ({
              position: index + 1,
              name: calculator.name,
              url: \\\https://nepacalc.com\/\\\,
            })),
          }
        }}
      />\;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated', file);
});
