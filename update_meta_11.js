const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the metadata definition
const metaRegex = /export const metadata(?:.*?)export default function ThreeDPage/s;
const newMeta = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Graph Calculator - Plot Interactive 3D Graphs Online',
  description: 'Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online. Free 3D graph calculator with engineering, calculus and geometry tools.',
  alternates: {
    canonical: 'https://nepacalc.com/engineering/3d/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    }
  },
  openGraph: {
    title: '3D Graph Calculator - Plot Interactive 3D Graphs Online',
    description: 'Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online. Free 3D graph calculator with engineering, calculus and geometry tools.',
    url: 'https://nepacalc.com/engineering/3d/',
    siteName: 'NepaCalc',
    images: [
      {
        url: 'https://nepacalc.com/images/surfaces/3d-graph-calculator-og.png',
        width: 1200,
        height: 630,
        alt: '3D Graph Calculator - Plot Interactive 3D Graphs Online',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Graph Calculator - Plot Interactive 3D Graphs Online',
    description: 'Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online. Free 3D graph calculator with engineering, calculus and geometry tools.',
    images: ['https://nepacalc.com/images/surfaces/3d-graph-calculator-og.png'],
  },
};

export default function ThreeDPage`;

if (!metaRegex.test(content)) {
    console.log("Meta regex not found");
} else {
    content = content.replace(metaRegex, newMeta);
    // Also remove the import for calcMeta if present
    content = content.replace("import { calcMeta } from '@/lib/calcMeta';", "");
}

// Replace JSON-LD
const schemaRegex = /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML={{[\s\S]*?}}\s*\/>/;

const newSchema = `<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "3D Graph Calculator",
              "url": "https://nepacalc.com/engineering/3d/",
              "applicationCategory": ["EducationalApplication", "EngineeringApplication"],
              "operatingSystem": "All",
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
              "@type": "WebPage",
              "name": "3D Graph Calculator - Plot Interactive 3D Graphs Online",
              "url": "https://nepacalc.com/engineering/3d/",
              "description": "Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online.",
              "publisher": {
                "@id": "https://nepacalc.com/#organization"
              },
              "isPartOf": {
                "@id": "https://nepacalc.com/#website"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "3D Graph Calculator - Plot Interactive 3D Graphs Online",
              "description": "Plot interactive 3D graphs, surfaces, equations, vectors and mathematical functions online.",
              "url": "https://nepacalc.com/engineering/3d/",
              "publisher": {
                "@id": "https://nepacalc.com/#organization"
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
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
                { "@type": "ListItem", "position": 2, "name": "Engineering", "item": "https://nepacalc.com/engineering/" },
                { "@type": "ListItem", "position": 3, "name": "3D Graph Calculator", "item": "https://nepacalc.com/engineering/3d/" }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nepacalc.com/#organization",
              "name": "NepaCalc",
              "url": "https://nepacalc.com",
              "logo": "https://nepacalc.com/logo.png"
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://nepacalc.com/#website",
              "url": "https://nepacalc.com",
              "name": "NepaCalc",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://nepacalc.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
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
            }
          ])
        }}
      />`;

if (!schemaRegex.test(content)) {
    console.log("Schema regex not found");
} else {
    content = content.replace(schemaRegex, newSchema);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update script finished successfully.');
