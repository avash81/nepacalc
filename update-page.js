const fs = require('fs');
let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

// Fix loader height for CLS
file = file.replace(/min-h-\[650px\]/g, 'min-h-screen');

// Fix Headings
file = file.replace(/<h3/g, '<h2');
file = file.replace(/<\/h3>/g, '</h2>');
file = file.replace(/<h4/g, '<h3');
file = file.replace(/<\/h4>/g, '</h3>');

// Add FAQ Schema
const faqSchema = `      <JsonLd type="calculator" name="3D Graph Calculator" description="Use our free 3D graph calculator to plot functions and visualize 3D graphs online. Graph equations like z=sin(x,y), paraboloids, spheres, and more." url="https://nepacalc.com/engineering/3d/" category="EducationalApplication" />
      <JsonLd 
        type="FAQPage"
        faqs={[
          { question: "Is this 3D graphing calculator free?", answer: "Yes. NepaCalc's 3D graph calculator is completely free with no signup, no watermarks, and no limits on the number of functions you can plot." },
          { question: "Can I plot multiple functions at once?", answer: "Yes. Click the + button to add more equations. Each function gets a different color and they all render on the same 3D canvas so you can compare them." },
          { question: "What is the difference between a 3D graph and a contour plot?", answer: "A 3D graph shows the full surface in 3D space. A contour plot (2D) shows horizontal slices of that surface, similar to a topographic map. Both represent the same data differently." },
          { question: "Can I graph parametric or polar equations in 3D?", answer: "Currently, our engine supports explicit z = f(x,y) and implicit f(x,y,z) = 0 equations. Parametric 3D curves are on our development roadmap." },
          { question: "How do I rotate the 3D graph?", answer: "Click and drag anywhere on the graph viewport to orbit around the surface. Use scroll wheel to zoom. The reset button restores the default camera angle." },
          { question: "What browsers support the 3D calculator?", answer: "Any modern browser (Chrome, Firefox, Safari, Edge) supports WebGL, which powers the 3D rendering. Mobile browsers are also fully supported." }
        ]}
      />`;

file = file.replace(/<JsonLd type="calculator" [^\/]+\/>/g, faqSchema);

fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
