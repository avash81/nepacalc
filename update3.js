const fs = require('fs');
let content = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf-8');

// Fix 1: FAQPage schema - parametric surfaces answer is wrong (says "Yes" but it is not yet supported)
content = content.replace(
  '"name": "Can I graph parametric surfaces?",\n                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, parametric surfaces defined by parameters u and v can be visualized within the WebGL rendering engine." }',
  '"name": "Can I graph parametric surfaces?",\n                  "acceptedAnswer": { "@type": "Answer", "text": "Full parametric surface support with u and v parameters is planned for a future update. Currently the calculator supports explicit functions z = f(x, y) and standard implicit equations." }'
);

// Fix 2: WebApplication featureList - remove "Parametric surfaces" which is misleading
content = content.replace(
  '"Parametric surfaces",\n                "Cartesian equations",',
  '"Cartesian equations",'
);

// Fix 3: Comparison table wave label - "Wave Surface" with sin(x)cos(y) should clarify it is a different wave
content = content.replace(
  '<td className="p-3 border border-[#DADCE0] font-bold text-[#202124]">Wave Surface</td><td className="p-3 border border-[#DADCE0] font-mono">sin(x)cos(y)</td><td className="p-3 border border-[#DADCE0]">Physics</td>',
  '<td className="p-3 border border-[#DADCE0] font-bold text-[#202124]">2D Wave</td><td className="p-3 border border-[#DADCE0] font-mono">sin(x)cos(y)</td><td className="p-3 border border-[#DADCE0]">Interference, Physics</td>'
);

// Fix 4: Remove "Parametric surfaces" from LearningResource teaches list
content = content.replace(
  '"Parametric Surfaces",\n                "Implicit Surfaces",',
  '"Implicit Surfaces",'
);

fs.writeFileSync('src/app/engineering/3d/page.tsx', content);
console.log('Done schema and formula fixes');
