const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  {
    find: 'solving engineering problems, conducting scientific research',
    replace: 'solving engineering problems, conducting <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific</Link> research'
  },
  {
    find: 'geometry construction and educational',
    replace: '<Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link> construction and educational'
  },
  {
    find: 'Linear Algebra',
    replace: '<Link href="/math-tools/matrix" className="text-[#1967D2] hover:underline">Linear Algebra</Link>'
  },
  {
    find: 'A slice to analyze internal geometry.',
    replace: 'A slice to analyze internal <Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link>.'
  },
  {
    find: 'span key={t} className="bg-[#E8F0FE] border border-[#1967D2] text-[#1967D2] px-3 py-1 rounded-full text-sm font-medium">{t}</span',
    replace: 'Link href={`/${t.toLowerCase().includes("scientific") ? "math-tools/scientific" : t.toLowerCase().includes("matrix") ? "math-tools/matrix" : t.toLowerCase().includes("geometry") ? "math-tools/geometry" : "math-tools/calculator"}`} key={t} className="bg-[#E8F0FE] border border-[#1967D2] text-[#1967D2] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#1967D2] hover:text-white transition-colors">{t}</Link'
  }
];

let updatedContent = content;

replacements.forEach(r => {
  if (updatedContent.includes(r.find)) {
    updatedContent = updatedContent.replace(r.find, r.replace);
  } else {
    console.log('Could not find:', r.find);
  }
});

// Ensure Link is imported
if (!updatedContent.includes("import Link from 'next/link';")) {
  updatedContent = updatedContent.replace("import dynamic from 'next/dynamic';", "import dynamic from 'next/dynamic';\nimport Link from 'next/link';");
}

fs.writeFileSync(file, updatedContent, 'utf8');
console.log('Update script finished successfully.');
