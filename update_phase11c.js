const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const schemaRegex = /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML={{[\s\S]*?}}\s*\/>/;

const newSchema = `<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://nepacalc.com/engineering/3d/#webpage",
              "url": "https://nepacalc.com/engineering/3d/",
              "name": "3D Graph Calculator",
              "description": "Interactive 3D Graph Calculator for plotting mathematical surfaces, engineering models, multivariable functions and scientific visualizations.",
              "inLanguage": "en",
              "isPartOf": {
                "@id": "https://nepacalc.com/#website"
              },
              "publisher": {
                "@id": "https://nepacalc.com/#organization"
              },
              "primaryImageOfPage": {
                "@id": "https://nepacalc.com/images/3d-graph-calculator-preview.webp"
              },
              "datePublished": "2026-06-20",
              "dateModified": "2026-06-20"
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "@id": "https://nepacalc.com/engineering/3d/#software",
              "name": "3D Graph Calculator",
              "applicationCategory": "EducationalApplication",
              "applicationSubCategory": "Engineering Calculator",
              "operatingSystem": "Web Browser",
              "browserRequirements": "Requires JavaScript and WebGL",
              "softwareVersion": "4.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "3D Surface Plotting",
                "Implicit Surface Rendering",
                "Multiple Equations",
                "Cross Sections",
                "Wireframe Mode",
                "Function Presets",
                "Engineering Visualization",
                "Mathematical Surface Library"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "@id": "https://nepacalc.com/engineering/3d/#article",
              "headline": "Complete Guide to 3D Graphing Calculator",
              "author": {
                "@id": "https://nepacalc.com/#organization"
              },
              "publisher": {
                "@id": "https://nepacalc.com/#organization"
              },
              "datePublished": "2026-06-20",
              "dateModified": "2026-06-20",
              "about": [
                "3D Graphing",
                "Engineering Mathematics",
                "Multivariable Calculus",
                "Surface Visualization",
                "Scientific Computing"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "LearningResource",
              "@id": "https://nepacalc.com/engineering/3d/#learning",
              "name": "3D Graph Calculator Learning Resource",
              "educationalLevel": "University",
              "learningResourceType": "Interactive Calculator",
              "teaches": [
                "3D Graphing",
                "Multivariable Calculus",
                "Engineering Mathematics",
                "Parametric Surfaces",
                "Implicit Surfaces",
                "Coordinate Geometry",
                "Topology"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a 3D Graph Calculator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A 3D Graph Calculator is an interactive tool used to visualize mathematical equations, engineering surfaces and multivariable functions in three-dimensional space."
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
              "@type": "HowTo",
              "name": "How to Use the 3D Graph Calculator",
              "step": [
                {
                  "@type": "HowToStep",
                  "text": "Enter your equation."
                },
                {
                  "@type": "HowToStep",
                  "text": "Select visualization settings."
                },
                {
                  "@type": "HowToStep",
                  "text": "Rotate and inspect the model."
                },
                {
                  "@type": "HowToStep",
                  "text": "Compare multiple mathematical surfaces."
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
                  "name": "Cartesian Coordinate System"
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Parametric Surface"
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Implicit Surface"
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Gradient"
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Mesh"
                },
                {
                  "@type": "DefinedTerm",
                  "name": "Topology"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nepacalc.com/#organization",
              "name": "NepaCalc",
              "url": "https://nepacalc.com",
              "logo": "https://nepacalc.com/logo.png"
            }
          ])
        }}
      />`;

if (!schemaRegex.test(content)) {
    console.log("Schema regex not found");
} else {
    content = content.replace(schemaRegex, newSchema);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Update script finished successfully.');
}
