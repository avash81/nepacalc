const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStart = 'export const metadata = calcMeta({';
const targetEnd = '      />\\n\\n      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-4">';

const startIndex = content.indexOf(targetStart);
if (startIndex === -1) { console.log('Start index not found'); process.exit(1); }

let subContent = content.substring(startIndex);
let endMatchIndex = subContent.indexOf('<div className="max-w-[1280px] mx-auto px-4 pt-8 pb-4">');
if (endMatchIndex === -1) { console.log('End index not found'); process.exit(1); }
const endIndex = startIndex + endMatchIndex;

const replacement = `export const metadata = calcMeta({
  title: '3D Graph Calculator - Plot Interactive 3D Graphs Online',
  description: 'Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online. Free 3D graph calculator with engineering, calculus and geometry tools.',
  slug: 'engineering/3d',
  keywords: [
    '3d graph calculator', '3d graphing calculator', '3d plotter', 'online 3d calculator', 
    '3d surface plotter', 'interactive 3d graph', 'mathematical graph plotter', 'surface grapher', 
    'graphing calculator 3d', 'engineering graph calculator', '3d equation plotter'
  ],
});

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: '3D Graph Calculator', item: 'https://nepacalc.com/engineering/3d/' }
        ]}
      />
      <JsonLd 
        type="calculator" 
        name="3D Graph Calculator" 
        description="Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online. Free 3D graph calculator with engineering, calculus and geometry tools." 
        url="https://nepacalc.com/engineering/3d/" 
        category="EducationalApplication" 
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "3D Graph Calculator",
              "url": "https://nepacalc.com/engineering/3d/",
              "applicationCategory": ["EducationalApplication", "EngineeringApplication"],
              "operatingSystem": "Any",
              "browserRequirements": "Requires WebGL",
              "softwareVersion": "4.0.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": "Interactive 3D plotting, Parametric equations, Implicit surfaces, Engineering presets, Wireframe rendering, Cross sections, Variable sliders",
              "isAccessibleForFree": true,
              "educationalUse": ["Graphing", "Visualization", "Simulation"]
            },
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "3D Graph Calculator - Plot Interactive 3D Graphs Online",
              "description": "Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online.",
              "url": "https://nepacalc.com/engineering/3d/",
              "publisher": {
                "@type": "Organization",
                "name": "NepaCalc",
                "url": "https://nepacalc.com"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "LearningResource",
              "name": "Learn 3D Graphing and Mathematical Visualization",
              "url": "https://nepacalc.com/engineering/3d/#learn-3d-graphing",
              "learningResourceType": ["Course", "Tutorial", "Guide"],
              "educationalAlignment": {
                "@type": "AlignmentObject",
                "alignmentType": "educationalSubject",
                "targetName": "Multivariable Calculus, Engineering Mathematics"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Use the 3D Graph Calculator",
              "description": "Step-by-step guide to generating accurate three-dimensional graphs directly in your browser.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Enter Your Equation",
                  "text": "Begin by typing your equation into the equation input field."
                },
                {
                  "@type": "HowToStep",
                  "name": "Adjust the Viewing Window",
                  "text": "Use the X, Y, and Z boundary settings to control the visible domain of your graph."
                },
                {
                  "@type": "HowToStep",
                  "name": "Interact and Rotate",
                  "text": "Click and drag anywhere on the graph to rotate the mathematical surface in 3D space."
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a 3D graph calculator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A 3D graph calculator visualizes mathematical equations in three-dimensional space by plotting surfaces, curves, and geometric objects using x, y, and z coordinates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is NepaCalc free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The NepaCalc 3D Graph Calculator is completely free and works directly in your web browser."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "DefinedTermSet",
              "name": "3D Graphing Glossary",
              "hasDefinedTerm": [
                {
                  "@type": "DefinedTerm",
                  "name": "Cartesian Coordinates",
                  "description": "The standard three-dimensional coordinate system consisting of the x, y, and z axes."
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Mesh",
                  "description": "A collection of small polygons used to approximate a mathematical surface during rendering."
                }
              ]
            }
          ])
        }}
      />

      `;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Update script finished successfully.');
