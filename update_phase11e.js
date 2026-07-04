const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Hero Image
const heroFind = '<p className="text-lg text-center leading-relaxed text-[#5F6368] max-w-4xl mx-auto">';
const heroReplace = `<figure className="mt-8 mb-12">
          <img 
            src="/images/3d-graph-calculator.webp" 
            alt="Interactive 3D Graph Calculator plotting mathematical surfaces" 
            width={1600} 
            height={900} 
            className="w-full h-auto rounded-xl shadow-lg border border-[#DADCE0]"
            // Priority image, no lazy loading
          />
          <figcaption className="text-center text-sm text-[#5F6368] mt-3">
            Figure 1. Interactive visualization of mathematical functions in three-dimensional space.
          </figcaption>
        </figure>
        <p className="text-lg text-center leading-relaxed text-[#5F6368] max-w-4xl mx-auto">`;

if (content.includes(heroFind)) {
  content = content.replace(heroFind, heroReplace);
}

// 2. Glossary - Coordinate System
const coordFind = '<h3 className="font-bold text-[#202124] mb-2 text-lg">Cartesian Coordinates</h3>';
const coordReplace = `<h3 className="font-bold text-[#202124] mb-2 text-lg">Cartesian Coordinates</h3>
                    <figure className="my-4 float-right ml-4 max-w-[250px]">
                      <img src="/images/3d-cartesian-coordinate-system.webp" alt="Three-dimensional Cartesian coordinate system with X Y and Z axes" width={800} height={600} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                      <figcaption className="text-xs text-[#5F6368] mt-2 text-center">Coordinate Axes (X, Y, Z)</figcaption>
                    </figure>`;
if (content.includes(coordFind)) {
  content = content.replace(coordFind, coordReplace);
}

// 3. Mathematical Formulas - Sphere
const sphereFind = "{ name: 'Sphere', eq: 'x² + y² + z² = r²', app: 'Geometry' },";
const sphereReplace = `{ name: 'Sphere', eq: 'x² + y² + z² = r²', app: 'Geometry' },
                          // Image placed here visually in the UI logic or alongside the list. We'll add a block below the list.`;

// Instead of injecting into the map array, let's inject after the grid list of formulas.
const formulaEndFind = '<div className="grid grid-cols-1 md:grid-cols-2 gap-4">';
const formulaImages = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                      <figure>
                        <img src="/images/sphere-equation-3d.webp" alt="3D sphere generated using x² + y² + z² = r²" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                        <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Sphere plotted using the standard Cartesian equation.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/cone-3d-graph.webp" alt="3D cone generated from z = √(x² + y²)" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                        <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Cone surface visualization.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/cylinder-3d-graph.webp" alt="3D cylinder represented using x² + y² = r²" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                        <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Cylinder mapped in 3D space.</figcaption>
                      </figure>
                    </div>\n` + formulaEndFind;

if (content.includes(formulaEndFind)) {
  content = content.replace(formulaEndFind, formulaImages);
}

// 4. Advanced / Mathematics
const mathFind = 'These surfaces exhibit unique geometric properties';
const mathReplace = `These surfaces exhibit unique geometric properties
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <figure>
                      <img src="/images/gaussian-surface.webp" alt="Gaussian bell surface in three-dimensional coordinate system" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                      <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Gaussian surface.</figcaption>
                    </figure>
                    <figure>
                      <img src="/images/monkey-saddle-graph.webp" alt="Monkey saddle surface used in multivariable calculus" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                      <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Monkey Saddle.</figcaption>
                    </figure>
                    <figure>
                      <img src="/images/hyperboloid-surface.webp" alt="Hyperboloid mathematical surface visualization" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                      <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Hyperboloid structural model.</figcaption>
                    </figure>
                  </div>`;
if (content.includes(mathFind)) {
  content = content.replace(mathFind, mathReplace);
}

// 5. Engineering
const engFind = '<h3 className="font-bold text-[#202124] mb-3 text-xl">Mechanical Engineering</h3>';
const engReplace = `<figure className="mb-6">
                        <img src="/images/wireframe-3d-surface.webp" alt="Wireframe rendering of a mathematical surface" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0]" />
                        <figcaption className="text-sm text-[#5F6368] mt-2 text-center">Wireframe mesh analysis for engineering.</figcaption>
                      </figure>
                      <h3 className="font-bold text-[#202124] mb-3 text-xl">Mechanical Engineering</h3>`;
if (content.includes(engFind)) {
  content = content.replace(engFind, engReplace);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update script finished successfully.');
