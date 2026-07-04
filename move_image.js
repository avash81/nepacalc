const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the image from the top
const topFind = `          <figure className="mt-8 mb-12">
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
          </figure>`;
content = content.replace(topFind, '');

// 2. Insert the image below the calculator component
const calcFind = `<ThreeDCalculatorClient />`;
const calcReplace = `<ThreeDCalculatorClient />
      
      <div className="max-w-[1280px] mx-auto px-4 mt-8">
        <figure className="mb-12">
            <img 
              src="/images/3d-graph-calculator.webp" 
              alt="Example of an interactive 3D Graph Calculator plotting mathematical surfaces" 
              width={1600} 
              height={900} 
              className="w-full h-auto rounded-xl shadow-lg border border-[#DADCE0]"
              loading="lazy"
            />
            <figcaption className="text-center text-sm text-[#5F6368] mt-3">
              Figure 1. Example visualization of mathematical functions plotted using the 3D Graph Calculator above.
            </figcaption>
        </figure>
      </div>`;
content = content.replace(calcFind, calcReplace);

fs.writeFileSync(file, content, 'utf8');
console.log('Update script finished successfully.');
