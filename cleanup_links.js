const fs = require('fs');

const path = 'src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// --- REVERT BAD LINKS ---
// 1. Revert Civil Engineering duplicates
content = content.replace(
  '<li><Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil engineering</Link></li>',
  '<li>Civil engineering</li>'
);
content = content.replace(
  '<h3 className="font-black text-[#202124] text-xl mb-3"><Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil Engineering</Link></h3>',
  '<h3 className="font-black text-[#202124] text-xl mb-3">Civil Engineering</h3>'
);

// 2. Remove 'scientific data' link if it exists anywhere
content = content.replace(
  /<Link href="\/math-tools\/scientific"[^>]*>scientific<\/Link> data/g,
  'scientific data'
);

// 3. Remove 'geometry' inside Cross Section
content = content.replace(
  'internal <Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link>',
  'internal geometry'
);

// 4. Remove 'Linear Algebra' inside the array string
content = content.replace(
  "'<Link href=\"/math-tools/matrix\" className=\"text-[#1967D2] hover:underline font-medium\">Linear Algebra</Link>'",
  "'Linear Algebra'"
);

// --- APPLY PROPER LINKS ---

// Civil Engineering properly linked in the paragraph text below the Civil Engineering heading
// First, find the Civil Engineering paragraph.
// "Civil engineering uses 3D models to calculate structural stress..."
content = content.replace(
  'Civil engineering uses 3D models',
  '<Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil engineering</Link> uses 3D models'
);

// Linear Algebra properly linked in the paragraph text (Matrix Calculator)
// "Linear Algebra and Vector Fields..." -> no, wait. 
// "Matrix transformations..."
content = content.replace(
  'Linear transformations can be visualized',
  '<Link href="/math-tools/matrix" className="text-[#1967D2] hover:underline font-medium">Linear transformations</Link> can be visualized'
);

// Remove GeoGebra comparison link (if any)
content = content.replace(
  'strong for <Link href="/geometry" className="text-[#1967D2] hover:underline">geometry construction</Link>',
  'strong for geometry construction'
);
content = content.replace(
  'strong for <Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link>',
  'strong for geometry'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Cleanup script executed.');
