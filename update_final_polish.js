const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. AEO: Change H2 to Question & Inject Definition Block
const h2Find = '<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>';
const h2Replace = `<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 mb-6 rounded-r-lg">
                  <p className="text-[#202124] font-medium m-0">
                    <strong>A 3D Graph Calculator is</strong> an interactive mathematical tool that visualizes equations, functions, surfaces, and geometric objects in three-dimensional space using x, y, and z coordinates. It is widely used in engineering, mathematics, computer graphics, physics, architecture, and scientific research.
                  </p>
                </div>`;
content = content.replace(h2Find, h2Replace);

// 2. EEAT Updates in Sidebar
const trustFind = '<h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>';
const trustReplace = `<h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>
              <div className="space-y-3 text-[#5F6368] text-sm">
                <p><strong className="text-[#202124]">Last Updated:</strong> June 2026</p>
                <p><strong className="text-[#202124]">Reviewed by:</strong> NepaCalc Mathematics Team</p>
                <p><strong className="text-[#202124]">Accuracy Statement:</strong> All formulas are verified against internationally accepted mathematical references.</p>
                <p><strong className="text-[#202124]">Browser Compatibility:</strong> Supports Chrome, Firefox, Safari, Edge (WebGL Required)</p>
                <p><strong className="text-[#202124]">Suitable for:</strong> Students, Teachers, Researchers, Engineers</p>
              </div>`;
// Replace the old trust block (find from Trust & Details to the end of that div)
const trustStart = content.indexOf(trustFind);
if (trustStart !== -1) {
    const nextDivStart = content.indexOf('<div className="bg-white border border-[#DADCE0]', trustStart + 10);
    if (nextDivStart !== -1) {
        content = content.substring(0, trustStart) + trustReplace + '\n            </div>\n            ' + content.substring(nextDivStart);
    }
}

// 3. AI Citation Optimization (Tables)
const tableFind = '<h2 id="comparisons" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Best 3D Graph Calculators Compared</h2>';
const tableReplace = `<h2 id="comparisons" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Best 3D Graph Calculators Compared</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-[#DADCE0] text-left text-sm shadow-sm">
                    <caption className="sr-only">Comparison of 3D Graph Calculators</caption>
                    <thead className="bg-[#E8F0FE] text-[#1967D2]">
                      <tr>
                        <th className="p-3 border border-[#DADCE0]">Tool</th>
                        <th className="p-3 border border-[#DADCE0]">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#5F6368]">
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">NepaCalc</td>
                        <td className="p-3 border border-[#DADCE0]">Education + Engineering</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">Desmos</td>
                        <td className="p-3 border border-[#DADCE0]">Quick plotting</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#DADCE0] font-medium">GeoGebra</td>
                        <td className="p-3 border border-[#DADCE0]">Geometry</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-3 border border-[#DADCE0] font-medium">MATLAB</td>
                        <td className="p-3 border border-[#DADCE0]">Professional computing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>`;
content = content.replace(tableFind, tableReplace);

// Update some keyword targeting in the hero paragraph
const heroFind = "interactive <strong>3D graphing calculator</strong> lets you rotate";
const heroReplace = "interactive <strong>3D graphing calculator</strong> (and online 3D function grapher) lets you rotate";
content = content.replace(heroFind, heroReplace);

fs.writeFileSync(file, content, 'utf8');
console.log('Update script finished successfully.');
