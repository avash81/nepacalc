
import { JsonLd } from '@/components/seo/JsonLd';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ThreeDCalculatorClient = dynamic(
  () => import('@/components/calculators/ThreeDCalculatorClient'),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Loading 3D Engine...</p>
        </div>
      </div>
    )
  }
);

import { Metadata } from 'next';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1021',
};

export const metadata: Metadata = {
  title: '3D Graph Calculator Free Online 3D Plotter, Surface & Function Grapher',
  description: "Plot 3D functions, surfaces, equations and mathematical models using NepaCalc's free 3D Graph Calculator. Visualize spheres, paraboloids, saddle surfaces, Gaussian functions, parametric equations and engineering graphs instantly.",
  applicationName: 'NepaCalc 3D Graph Calculator',
  generator: '', // Removing Next.js generator by overriding it
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '3D Graph Calculator',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://nepacalc.com/engineering/3d/',
    languages: {
      'en': 'https://nepacalc.com/engineering/3d/',
      'en-NP': 'https://nepacalc.com/engineering/3d/',
      'x-default': 'https://nepacalc.com/engineering/3d/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  },
  openGraph: {
    type: 'website',
    title: '3D Graph Calculator Free Online 3D Plotter',
    description: "Plot 3D functions, surfaces and engineering graphs instantly using NepaCalc's interactive 3D Graph Calculator.",
    url: 'https://nepacalc.com/engineering/3d/',
    siteName: 'NepaCalc',
    locale: 'en_NP',
    images: [
      {
        url: 'https://nepacalc.com/images/3d-graph-calculator-og.webp',
        width: 1200,
        height: 630,
        alt: 'Interactive 3D Graph Calculator by NepaCalc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Graph Calculator Free Online 3D Plotter',
    description: 'Visualize mathematical surfaces, engineering models and 3D equations online.',
    images: ['https://nepacalc.com/images/3d-graph-calculator-og.webp'],
  },
};

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
      />

      <ThreeDCalculatorClient />

      <div className="max-w-[1280px] mx-auto px-4 mt-8 pb-4">
        <h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-4 text-center">3D Graph Calculator Free Online 3D Plotter & Surface Grapher</h1>
        <p className="text-sm font-semibold text-center text-[#1967D2] mb-6 uppercase tracking-wider">Last Updated: June 2026</p>
        <p className="text-lg text-center leading-relaxed text-[#5F6368] max-w-4xl mx-auto">
          Plot mathematical equations, visualize 3D surfaces, and explore multivariable functions with NepaCalc's free <strong>3D Graph Calculator</strong>. Whether you're graphing explicit functions, implicit surfaces, engineering models, or calculus equations, this interactive <strong>3D graphing calculator</strong> (and online 3D function grapher) lets you rotate, zoom, compare multiple equations, and analyze complex mathematical surfaces directly in your browser. Designed for students, engineers, educators, researchers, and professionals, it provides fast, accurate, browser-based 3D visualization without requiring software installation.
        </p>
      </div>

      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          
          {/* Left Column (Stats, Trust, Links) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* On This Page (Jump Links) */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#202124] mb-4">On This Page</h2>
              <ul className="space-y-2 text-sm text-[#1967D2] font-medium">
                <li><a href="#what-is-3d-calculator" className="hover:underline">What is a 3D Graph Calculator?</a></li>
                <li><a href="#how-to-use" className="hover:underline">How to Use It</a></li>
                <li><a href="#supported-graph-types" className="hover:underline">Supported Graph Types</a></li>
                <li><a href="#mathematical-formulas" className="hover:underline">Mathematical Formulas</a></li>
                <li><a href="#engineering-applications" className="hover:underline">Engineering Applications</a></li>
                <li><a href="#surface-library" className="hover:underline">Surface Library</a></li>
                <li><a href="#examples" className="hover:underline">Examples</a></li>
                <li><a href="#comparison" className="hover:underline">Comparison</a></li>
                <li><a href="#faqs" className="hover:underline">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Trust Box */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm text-sm">
              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>
              <div className="space-y-3 text-[#5F6368] text-sm">
                <p><strong className="text-[#202124]">Last Updated:</strong> June 2026</p>
                <p><strong className="text-[#202124]">Reviewed by:</strong> NepaCalc Mathematics Team</p>
                <p><strong className="text-[#202124]">Accuracy Statement:</strong> All formulas are verified against internationally accepted mathematical references.</p>
                <p><strong className="text-[#202124]">Browser Compatibility:</strong> Supports Chrome, Firefox, Safari, Edge (WebGL Required)</p>
                <p><strong className="text-[#202124]">Suitable for:</strong> Students, Teachers, Researchers, Engineers</p>
              </div>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm text-sm">
              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Supports</h3>
              <ul className="space-y-2 text-[#5F6368]">
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Explicit Functions</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Implicit Equations</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Multiple Surfaces</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Real-Time Rendering</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Cross Sections</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Variable Controls</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Browser-Based WebGL</li>
              </ul>
            </div>

            {/* Related Tools */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4">Related Tools</h3>
              <ul className="space-y-2 text-sm text-[#1967D2] font-medium">
                <li><Link href="/scientific" className="hover:underline">Scientific Calculator</Link></li>
                <li><Link href="/algebra/matrix" className="hover:underline">Matrix Calculator</Link></li>
                <li><Link href="/algebra/linear-equation" className="hover:underline">Linear Equation Solver</Link></li>
                <li><Link href="/algebra/quadratic-equation" className="hover:underline">Quadratic Solver</Link></li>
                <li><Link href="/geometry" className="hover:underline">Geometry Calculator</Link></li>
              </ul>
            </div>

          </div>

          {/* Right Column (Quick Features & Main Content) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
              <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Why Use This 3D Graph Calculator?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {['Plot Explicit Functions', 'Plot Implicit Surfaces', 'Multiple Equations', 'Variable Sliders', 'Interactive Rotation', 'Cross Section Slicing', 'High Resolution Rendering', 'Engineering Presets', 'Mathematical Surface Library', 'Browser Based', 'Free to Use', 'Mobile Friendly'].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm md:text-base text-[#5F6368] font-medium p-3 bg-[#F8F9FA] rounded-lg border border-slate-100">
                    <span className="text-green-600 shrink-0">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <article className="prose prose-slate max-w-none">

                {/* ── Part 3A: What is a 3D Graph Calculator? ── */}

                <h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 mb-6 rounded-r-lg">
                  <p className="text-[#202124] font-medium m-0">
                    <strong>A 3D Graph Calculator is</strong> an interactive mathematical tool that visualizes equations, functions, surfaces, and geometric objects in three-dimensional space using x, y, and z coordinates. It is widely used in engineering, mathematics, computer graphics, physics, architecture, and scientific research.
                  </p>
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  A <strong>3D Graph Calculator</strong> is an interactive mathematical visualization tool that converts equations into three-dimensional graphs, allowing users to explore functions, surfaces, and <Link href="/engineering/geometry" className="text-[#1967D2] hover:underline font-medium">geometric objects</Link> in real time. Unlike a traditional two-dimensional graphing calculator that displays relationships between only the X and Y axes, a 3D graphing calculator introduces a third dimension (the Z-axis) making it possible to visualize complex mathematical surfaces, engineering models, <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific</Link> data, and multivariable functions.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Instead of reading equations as abstract mathematical expressions, users can instantly transform them into interactive models that can be rotated, zoomed, sliced, and examined from every angle. This visual approach makes complex concepts significantly easier to understand while helping students, educators, engineers, architects, researchers, and scientists analyze mathematical relationships that cannot be represented on a flat graph.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Modern <strong>online 3D graph calculators</strong> operate entirely within a web browser, eliminating the need to install expensive mathematical software. Users can simply enter an equation, choose visualization settings, and immediately interact with the generated surface.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Our <strong>3D Graph Calculator</strong> supports a wide range of mathematical equations including explicit functions, implicit surfaces, engineering models, geometric solids, and advanced multivariable functions. Whether you are studying calculus, solving engineering problems, visualizing physical phenomena, or teaching mathematics, the calculator provides an intuitive environment for exploring three-dimensional mathematics.
                </p>

                {/* ── Why Use ── */}
                <h2 id="why-use-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why Use a 3D Graph Calculator?</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Many mathematical concepts become difficult to understand when viewed only as equations. Three-dimensional visualization allows you to see how variables interact, how surfaces change, and how mathematical relationships behave across space.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">A 3D graphing calculator helps you:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
                  <li>Visualize complex mathematical surfaces instantly</li>
                  <li>Explore multivariable functions interactively</li>
                  <li>Understand calculus concepts more easily</li>
                  <li>Analyze engineering and architectural models</li>
                  <li>Compare multiple equations simultaneously</li>
                  <li>Investigate intersections between surfaces</li>
                  <li>Demonstrate mathematical concepts during teaching</li>
                  <li>Improve problem-solving through visualization</li>
                  <li>Build intuition for higher-dimensional mathematics</li>
                </ul>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Instead of imagining how an equation behaves, you can observe its complete structure in real time.
                </p>

                {/* ── How It Works ── */}
                <h2 id="how-it-works" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How Does a 3D Graph Calculator Work?</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  A 3D graph calculator converts mathematical equations into graphical surfaces by evaluating thousands of coordinate points across three-dimensional space.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  For every point within the selected coordinate range, the calculator computes the corresponding values and generates a continuous surface composed of thousands of interconnected polygons. Modern rendering technologies such as WebGL then display these polygons as smooth interactive models inside your browser.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">The visualization process generally follows these steps:</p>
                <ol className="list-decimal pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
                  <li>Read the mathematical equation entered by the user.</li>
                  <li>Generate coordinate values across the selected X and Y ranges.</li>
                  <li>Calculate the corresponding Z value for every coordinate pair.</li>
                  <li>Build a polygon mesh representing the mathematical surface.</li>
                  <li>Apply lighting, shading, and color gradients.</li>
                  <li>Render the model using GPU acceleration.</li>
                  <li>Allow users to rotate, zoom, pan, and inspect the surface interactively.</li>
                </ol>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  This entire process happens almost instantly, making it possible to explore even complex mathematical functions in real time.
                </p>

                {/* ── Coordinate System ── */}
                <h2 id="coordinate-system" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Understanding the Three-Dimensional Coordinate System</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  A three-dimensional graph uses three perpendicular axes to describe the position of every point in space.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">X-Axis</h3>
                    <p className="text-[#5F6368] text-base">The X-axis represents horizontal movement from left to right. Positive values extend to the right, while negative values extend to the left.</p>
                  </div>
                  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Y-Axis</h3>
                    <p className="text-[#5F6368] text-base">The Y-axis represents movement from front to back (or depth depending on the viewing angle). Together, the X and Y axes define the base plane where functions are evaluated.</p>
                  </div>
                  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Z-Axis</h3>
                    <p className="text-[#5F6368] text-base">The Z-axis represents height. Every calculated value of a function determines how high or low the surface rises above the X-Y plane.</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  This additional dimension allows mathematical surfaces to represent relationships that cannot be visualized using ordinary two-dimensional graphs.
                </p>

                {/* ── Explicit Functions ── */}
                <h2 id="explicit-functions" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Explicit Functions</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  One of the most common graph types supported by a <strong>3D Graph Calculator</strong> is the explicit function. An explicit function defines the height of a surface directly as a function of two variables.
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-6">
                  <p className="text-[#5F6368] font-bold mb-2 text-base">General form:</p>
                  <p className="text-xl font-mono font-bold text-[#202124]">z = f(x, y)</p>
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Examples include:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] font-mono mb-6 text-base">
                  <li>z = x² + y²</li>
                  <li>z = sin(x) × cos(y)</li>
                  <li>z = √(x² + y²)</li>
                  <li>z = e^(-(x²+y²))</li>
                </ul>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Because every coordinate pair (x, y) produces exactly one corresponding value of z, explicit functions generate smooth continuous surfaces that are ideal for studying calculus, optimization, physics, and engineering.
                </p>

                {/* ── Implicit Surfaces ── */}
                <h2 id="implicit-surfaces" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Implicit Surfaces</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Unlike explicit functions, implicit equations define relationships among all three variables simultaneously.
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-6">
                  <p className="text-[#5F6368] font-bold mb-2 text-base">General form:</p>
                  <p className="text-xl font-mono font-bold text-[#202124]">F(x, y, z) = 0</p>
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Examples include:</p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] font-mono mb-6 text-base">
                  <li>x² + y² + z² = 16</li>
                  <li>x² + y² − z² = 4</li>
                  <li>x²/16 + y²/9 + z²/4 = 1</li>
                </ul>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  These equations describe complete three-dimensional objects rather than simple surfaces. Implicit surfaces are widely used in:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
                  <li>Geometry</li>
                  <li>Computer graphics</li>
                  <li>Mechanical engineering</li>
                  <li>Medical imaging</li>
                  <li>Scientific visualization</li>
                  <li>Physics simulations</li>
                </ul>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Specialized rendering algorithms convert these equations into interactive 3D models.
                </p>

                {/* ── Who Uses It ── */}
                <h2 id="who-uses-it" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Who Uses a 3D Graph Calculator?</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Interactive three-dimensional graphing tools are used across many academic and professional disciplines.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Students</h3>
                    <p className="text-[#5F6368] text-base">Students use 3D graph calculators to understand multivariable calculus, geometry, algebra, and mathematical visualization.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Teachers</h3>
                    <p className="text-[#5F6368] text-base">Educators demonstrate difficult concepts visually, helping students understand surfaces, gradients, intersections, and mathematical models more effectively.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Engineers</h3>
                    <p className="text-[#5F6368] text-base">Mechanical, civil, structural, and aerospace engineers use three-dimensional graphs to model physical systems, optimize structures, and analyze mathematical relationships.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Researchers</h3>
                    <p className="text-[#5F6368] text-base">Scientists visualize mathematical models, simulation outputs, and experimental datasets using interactive three-dimensional graphs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Architects</h3>
                    <p className="text-[#5F6368] text-base">Architects explore curved surfaces, shell structures, and geometric forms before translating concepts into real-world designs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Data Scientists</h3>
                    <p className="text-[#5F6368] text-base">Machine learning engineers and statisticians use surface plots to visualize optimization functions, probability distributions, and multidimensional datasets.</p>
                  </div>
                </div>

                {/* ── Why Interactive Visualization Matters ── */}
                <h2 id="why-interactive" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why Interactive Visualization Matters</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Reading an equation provides numerical information, but visualizing it provides understanding. Interactive graphing enables users to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
                  <li>Rotate models from every direction</li>
                  <li>Zoom into important regions</li>
                  <li>Inspect peaks and valleys</li>
                  <li>Compare multiple surfaces</li>
                  <li>Understand symmetry</li>
                  <li>Explore curvature</li>
                  <li>Identify intersections</li>
                  <li>Observe mathematical behavior dynamically</li>
                </ul>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  For many advanced mathematical topics, visualization significantly reduces the time required to understand abstract concepts.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  A modern <strong>3D Graph Calculator</strong> transforms equations into intuitive visual models, making mathematics more accessible, engaging, and practical for learners and professionals alike.
                </p>

                {/* ── Part 3B: How to Use the 3D Graph Calculator ── */}
                <h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">How to Use the 3D Graph Calculator</h2>
                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>What is a 3D Graphing Calculator?</strong> A 3D graphing calculator is an interactive mathematical software tool designed to plot equations and multivariable functions in three dimensions (X, Y, and Z). It allows users to visualize complex mathematical concepts, render geometric surfaces, and interactively rotate models to analyze relationships across multiple axes simultaneously.</p></div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  The NepaCalc <strong>3D Graph Calculator</strong> is designed to make mathematical visualization simple, whether you are plotting your first surface or analyzing advanced engineering equations. Follow the steps below to generate accurate three-dimensional graphs directly in your browser.
                </p>

                <div className="space-y-6 mb-12">
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 1 — Enter Your Mathematical Equation</h3>
                    <p className="text-[#5F6368] mb-3 text-base">Begin by typing your equation into the equation input field. The calculator supports a wide variety of mathematical expressions, including explicit functions, implicit equations, engineering surfaces, trigonometric, exponential, and polynomial surfaces.</p>
                    <p className="text-[#5F6368] mb-2 text-sm font-semibold">Example equations:</p>
                    <div className="bg-[#F8F9FA] rounded-lg p-4 font-mono text-sm text-[#202124] space-y-1">
                      <div>z = sin(sqrt(x²+y²))</div>
                      <div>z = (x²+y²)/4</div>
                      <div>z = cos(x) × sin(y)</div>
                      <div>z = exp(-(x²+y²)/8)</div>
                      <div>x²+y²+z²=16</div>
                    </div>
                    <p className="text-[#5F6368] mt-3 text-base">As you edit your equation, the graph updates immediately, allowing you to experiment with different mathematical models without refreshing the page.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 2 — Select a Built-in Preset</h3>
                    <p className="text-[#5F6368] mb-3 text-base">If you do not want to type equations manually, choose one of the predefined mathematical surfaces from the preset library. Current presets include:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Wave Surface','Saddle Surface','Gaussian Surface','Sphere','Cylinder','Cone','Torus','Ellipsoid','Hyperboloid','Monkey Saddle','Paraboloid'].map(p => (
                        <span key={p} className="text-sm bg-[#F8F9FA] text-[#5F6368] border border-[#DADCE0] rounded px-3 py-1">{p}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 3 — Adjust Variables Using Interactive Sliders</h3>
                    <p className="text-[#5F6368] mb-3 text-base">Many mathematical equations contain adjustable parameters. For example: <code className="bg-[#F8F9FA] px-1 rounded">z = a × sin(x)</code>: changing the value of <strong>a</strong> instantly modifies the graph without rewriting the equation. Variable sliders let you investigate amplitude, frequency, scaling, stretching, compression, translation, and engineering constants interactively.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 4 — Rotate the Graph</h3>
                    <p className="text-[#5F6368] text-base">Simply click and drag the graph to rotate the camera around the object. Viewing a surface from multiple angles helps reveal peaks, valleys, symmetry, curvature, intersections, and hidden structures that are not visible from a single perspective.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 5 — Zoom and Pan</h3>
                    <p className="text-[#5F6368] text-base">Use the mouse wheel or touch gestures to zoom into specific regions. Zooming allows you to inspect local maxima, local minima, saddle points, discontinuities, oscillations, and singularities. You can also pan across the coordinate system to examine different portions of larger surfaces.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 6 — Enable Cross-Section Slicing</h3>
                    <p className="text-[#5F6368] mb-3 text-base">Cross-section slicing allows you to cut through a mathematical surface using one of the coordinate planes (X, Y, or Z). Cross sections are widely used in multivariable calculus, structural engineering, finite element analysis, architecture, manufacturing, and medical imaging.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 7 — Compare Multiple Equations</h3>
                    <p className="text-[#5F6368] text-base">The calculator supports multiple graph layers. You can overlay several mathematical surfaces simultaneously to compare functions, identify intersections, visualize optimization problems, and study geometric relationships. Each equation is displayed with a different color for easy interpretation.</p>
                  </div>

                  <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Step 8 — Adjust Surface Appearance</h3>
                    <p className="text-[#5F6368] text-base">Use visualization settings including Smooth Shading, Wireframe Mode, Color Palettes, Surface Opacity, and Lighting Effects. Wireframe mode is particularly useful for studying the underlying mathematical mesh, while smooth shading emphasizes the overall shape of the surface.</p>
                  </div>
                </div>

                {/* ── Main Features ── */}
                <h2 id="features" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Main Features of the 3D Graph Calculator</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  The NepaCalc <strong>3D Graph Calculator</strong> combines interactive visualization with advanced mathematical capabilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {[
                    { title: 'Interactive 3D Rotation', desc: 'Rotate graphs freely to inspect every angle of a mathematical surface.' },
                    { title: 'Real-Time Rendering', desc: 'Every equation updates instantly as you type, powered by WebGL GPU acceleration.' },
                    { title: 'Multiple Graph Layers', desc: 'Display and compare several mathematical functions simultaneously with distinct colors.' },
                    { title: 'Variable Sliders', desc: 'Modify constants dynamically without rewriting equations for instant animation.' },
                    { title: 'Cross-Section Analysis', desc: 'Slice surfaces along the X, Y, or Z axis to study internal geometry.' },
                    { title: 'High-Resolution Surface Mesh', desc: 'Generate smooth, detailed mathematical surfaces suitable for educational and engineering use.' },
                    { title: 'Built-in Mathematical Presets', desc: 'Instantly visualize commonly used surfaces without entering equations manually.' },
                    { title: 'Browser-Based Performance', desc: 'No software installation required. Runs in modern web browsers using GPU-accelerated WebGL.' },
                    { title: 'Mobile Compatible', desc: 'Works on desktops, tablets, and smartphones with touch-based navigation.' },
                    { title: 'Free to Use', desc: 'All graphing tools, visualization options, and mathematical presets are available without registration.' },
                  ].map(f => (
                    <div key={f.title} className="flex gap-3 p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                      <span className="text-green-600 font-bold text-lg shrink-0">✔</span>
                      <div>
                        <p className="font-bold text-[#202124] text-base">{f.title}</p>
                        <p className="text-[#5F6368] text-sm mt-1">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Supported Expressions ── */}
                <h2 id="supported-expressions" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Supported Mathematical Expressions</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  The calculator supports many commonly used mathematical operations, giving users the flexibility to visualize everything from simple classroom examples to advanced engineering equations.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {['Addition','Subtraction','Multiplication','Division','Exponents','Square roots','Logarithms','Trigonometric functions','Hyperbolic functions','Absolute values','Exponential functions','Constants (π, e)','Parentheses','Custom Variables'].map(e => (
                    <div key={e} className="text-sm text-[#5F6368] bg-[#F8F9FA] border border-[#DADCE0] rounded-lg px-3 py-2 text-center">{e}</div>
                  ))}
                </div>

                {/* ── Tips ── */}
                <h2 id="tips" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Tips for Better Graph Visualization</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li>Start with simple equations before experimenting with complex surfaces.</li>
                  <li>Rotate the graph frequently to reveal hidden geometry.</li>
                  <li>Use cross-section slicing when analyzing complicated models.</li>
                  <li>Adjust variable sliders one parameter at a time.</li>
                  <li>Increase mesh resolution for smoother surfaces.</li>
                  <li>Switch between wireframe and shaded modes depending on your analysis.</li>
                  <li>Compare multiple equations to understand mathematical relationships visually.</li>
                </ul>

                {/* ── Part 4: Mathematical Surface Library ── */}
                <h2 id="surface-library" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-4">Mathematical Surface Library for 3D Graphing</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  One of the biggest advantages of using a <strong>3D Graph Calculator</strong> is the ability to visualize mathematical surfaces that are difficult to understand from equations alone.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Whether you are studying multivariable calculus, analytical geometry, engineering mathematics, computer graphics, or physics, plotting these surfaces helps transform abstract equations into interactive three-dimensional models.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-10">
                  The NepaCalc 3D Graph Calculator includes many of the world&apos;s most commonly studied mathematical surfaces. Each preset demonstrates unique mathematical properties while serving important roles in science, engineering, architecture, and research.
                </p>

                <div className="space-y-8">

                  {/* Wave Surface */}
                  <div id="wave-surface" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Wave Surface (Ripples)</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z = sin(√(x²+y²))</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The Wave Surface produces circular ripples that spread outward from the origin. It is one of the most recognizable examples used in multivariable calculus because it demonstrates periodic oscillation across two independent variables.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
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
                    </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Continuous surface</li>
                          <li>Periodic function</li>
                          <li>Circular symmetry</li>
                          <li>Oscillating amplitude</li>
                          <li>Infinite domain</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Wave mechanics</li>
                          <li>Acoustics</li>
                          <li>Electromagnetic waves</li>
                          <li>Ocean modelling</li>
                          <li>Signal visualization</li>
                          <li>Mechanical vibration analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Gaussian Surface */}
                  <div id="gaussian-surface" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Gaussian Surface</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z = e^−((x²+y²)/10)</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The Gaussian Surface represents the famous bell-shaped distribution used throughout mathematics and statistics. It models how values cluster around a central point while gradually decreasing away from the center.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Smooth continuous surface</li>
                          <li>Single global maximum</li>
                          <li>Radial symmetry</li>
                          <li>Positive everywhere</li>
                          <li>Infinite support</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Machine learning</li>
                          <li>Artificial intelligence</li>
                          <li>Data science</li>
                          <li>Probability theory</li>
                          <li>Statistics</li>
                          <li>Heat diffusion</li>
                          <li>Image processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Paraboloid */}
                  <div id="paraboloid" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Paraboloid</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z = (x²+y²)/4</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The paraboloid is one of the most important surfaces in engineering and physics. Unlike a simple parabola, it extends in every horizontal direction, creating a bowl-shaped surface.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Convex surface</li>
                          <li>Single minimum point</li>
                          <li>Rotational symmetry</li>
                          <li>Quadratic function</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Satellite dishes</li>
                          <li>Radio antennas</li>
                          <li>Reflective telescopes</li>
                          <li>Solar concentrators</li>
                          <li>Car headlights</li>
                          <li>Optical engineering</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Saddle Surface */}
                  <div id="saddle-surface" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Hyperbolic Paraboloid (Saddle Surface)</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z = (x²−y²)/4</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      Often called the Saddle Surface, this is one of the most important examples in differential geometry. Unlike the paraboloid, the saddle curves upward in one direction and downward in another.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Saddle point</li>
                          <li>Negative Gaussian curvature</li>
                          <li>Hyperbolic geometry</li>
                          <li>Two principal curvatures</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Bridge construction</li>
                          <li>Roof structures</li>
                          <li>Architectural design</li>
                          <li>Structural engineering</li>
                          <li>Optimization algorithms</li>
                          <li>Surface analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sphere */}
                  <div id="sphere" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Sphere</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">x²+y²+z² = r²</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The sphere is the most fundamental three-dimensional object in geometry. Every point on its surface is exactly the same distance from the center.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Constant radius</li>
                          <li>Perfect symmetry</li>
                          <li>Closed surface</li>
                          <li>Constant positive curvature</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Astronomy</li>
                          <li>Planetary modelling</li>
                          <li>Computer graphics</li>
                          <li>Robotics</li>
                          <li>Physics</li>
                          <li>Engineering simulations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Cylinder */}
                  <div id="cylinder" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Cylinder</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">x²+y² = r²</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      A cylinder extends infinitely along one axis while maintaining a circular cross-section. It is commonly studied in engineering, manufacturing, and fluid mechanics.
                    </p>
                    <div className="bg-[#F8F9FA] rounded-xl p-4">
                      <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                      <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4 columns-2">
                        <li>Pipes</li>
                        <li>Pressure vessels</li>
                        <li>Hydraulic systems</li>
                        <li>Mechanical shafts</li>
                        <li>Storage tanks</li>
                        <li><Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil engineering</Link></li>
                      </ul>
                    </div>
                  </div>

                  {/* Cone */}
                  <div id="cone" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Cone</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z = √(x²+y²)</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The cone forms one of the basic geometric primitives used throughout mathematics. Its constant slope makes it ideal for studying gradients and directional derivatives.
                    </p>
                    <div className="bg-[#F8F9FA] rounded-xl p-4">
                      <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                      <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4 columns-2">
                        <li>Optics</li>
                        <li>Acoustics</li>
                        <li>Mechanical engineering</li>
                        <li>Computer graphics</li>
                        <li>Architectural modelling</li>
                      </ul>
                    </div>
                  </div>

                  {/* Torus */}
                  <div id="torus" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Torus</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">(R−√(x²+y²))²+z²=r²</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The torus is commonly known as the doughnut-shaped surface. Despite its simple appearance, it is one of the most important objects in topology.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Mathematical Properties</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Closed surface</li>
                          <li>Genus one topology</li>
                          <li>Rotational symmetry</li>
                          <li>Periodic geometry</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] rounded-xl p-4">
                        <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                        <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4">
                          <li>Plasma reactors</li>
                          <li>Fusion research</li>
                          <li>Mechanical seals</li>
                          <li>Computer graphics</li>
                          <li>Topology</li>
                          <li>Mathematical modelling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Ellipsoid */}
                  <div id="ellipsoid" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Ellipsoid</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">x²/a²+y²/b²+z²/c²=1</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      An ellipsoid is a stretched sphere with different radii along each axis.
                    </p>
                    <div className="bg-[#F8F9FA] rounded-xl p-4">
                      <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                      <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4 columns-2">
                        <li>Planetary science</li>
                        <li>Orbital mechanics</li>
                        <li>Medical imaging</li>
                        <li>Aerospace engineering</li>
                        <li>Navigation systems</li>
                      </ul>
                    </div>
                  </div>

                  {/* Hyperboloid */}
                  <div id="hyperboloid" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Hyperboloid</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">x²+y²−z²=4</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      Hyperboloids are famous for their elegant curved appearance while still being constructed from straight beams.
                    </p>
                    <div className="bg-[#F8F9FA] rounded-xl p-4">
                      <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                      <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4 columns-2">
                        <li>Cooling towers</li>
                        <li>Observation towers</li>
                        <li>Architectural landmarks</li>
                        <li>Structural optimization</li>
                      </ul>
                    </div>
                  </div>

                  {/* Monkey Saddle */}
                  <div id="monkey-saddle" className="border border-[#DADCE0] rounded-2xl p-8 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-3">Monkey Saddle</h3>
                    <div className="mb-2 text-sm font-semibold text-[#5F6368]">Formula</div>
                    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 font-mono text-base text-[#1967D2] font-bold mb-4 inline-block">z=(x³−3xy²)/4</div>
                    <p className="text-[#5F6368] mb-4 text-base">
                      The Monkey Saddle extends the idea of a standard saddle by creating three valleys instead of two. It is widely used in advanced calculus and topology.
                    </p>
                    <div className="bg-[#F8F9FA] rounded-xl p-4">
                      <p className="font-bold text-[#202124] text-sm mb-2">Applications</p>
                      <ul className="text-[#5F6368] text-sm space-y-1 list-disc pl-4 columns-2">
                        <li>Critical point analysis</li>
                        <li>Higher-order derivatives</li>
                        <li>Differential geometry</li>
                        <li>Mathematical research</li>
                      </ul>
                    </div>
                  </div>

                </div>

                {/* ── Create Your Own ── */}
                <h2 id="custom-equations" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Create Your Own Mathematical Surface</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  While the built-in presets demonstrate the most common mathematical models, the NepaCalc <strong>3D Graph Calculator</strong> also allows you to create completely custom equations.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">Examples include:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {['Polynomial surfaces','Trigonometric surfaces','Exponential models','Logarithmic functions','Implicit equations','Engineering formulas','Physics equations','Scientific simulations'].map(item => (
                    <div key={item} className="text-sm text-[#5F6368] bg-[#F8F9FA] border border-[#DADCE0] rounded-lg px-3 py-2 text-center">{item}</div>
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Simply enter your equation into the calculator, adjust variables using interactive sliders, and visualize the surface instantly in three-dimensional space. Whether you are exploring classroom mathematics, solving engineering problems, conducting scientific research, or experimenting with advanced multivariable functions, the calculator provides an intuitive way to transform equations into interactive visual models.
                </p>

                {/* ── Part 5: Learn 3D Graphing ── */}
                <h2 id="learn-3d-graphing" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">Learn 3D Graphing and Mathematical Visualization</h2>
                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>What is 3D Mathematical Visualization?</strong> 3D mathematical visualization is the process of converting abstract multivariable functions and coordinate equations into interactive three-dimensional geometric surfaces. This graphical representation aids in understanding spatial relationships, gradients, cross-sections, and topological structures critical for engineering, physics, and advanced calculus applications.</p></div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  A <strong>3D Graph Calculator</strong> is more than a plotting tool, it is a visual learning environment for understanding higher-dimensional mathematics.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Instead of interpreting equations only through numbers and symbols, you can instantly transform mathematical expressions into interactive three-dimensional surfaces. This makes abstract concepts easier to understand, analyze, and communicate.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-10">
                  Students, engineers, scientists, architects, researchers, and educators use 3D graphing to study relationships between multiple variables, identify patterns, analyze optimization problems, and visualize complex mathematical models. Whether you are learning multivariable calculus for the first time or building advanced engineering simulations, visualizing equations provides a much deeper understanding than solving them on paper alone.
                </p>

                <div className="space-y-12">

                  {/* Coordinate System */}
                  <div id="learn-coordinate-system">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Understanding the Three-Dimensional Coordinate System</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Every graph created inside the NepaCalc 3D Graph Calculator is built on the three-dimensional Cartesian coordinate system. Unlike traditional graphs that only use X and Y axes, three-dimensional mathematics introduces a third independent axis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {[
                        { axis: 'X-Axis', desc: 'Horizontal direction' },
                        { axis: 'Y-Axis', desc: 'Depth direction' },
                        { axis: 'Z-Axis', desc: 'Vertical height' },
                      ].map(a => (
                        <div key={a.axis} className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 text-center">
                          <p className="font-black text-[#1967D2] text-xl mb-1">{a.axis}</p>
                          <p className="text-[#5F6368] text-base">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-2">Every point is represented as <code className="bg-[#F8F9FA] px-2 py-1 rounded font-mono text-[#1967D2]">(x, y, z)</code></p>
                    <p className="text-lg leading-relaxed text-[#5F6368]">
                      Instead of drawing lines, the calculator creates complete surfaces that extend across the coordinate space. This additional dimension allows mathematicians to visualize relationships that cannot be represented on a flat graph.
                    </p>
                  </div>

                  {/* Explicit Functions */}
                  <div id="learn-explicit">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Explicit Functions</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      The majority of mathematical surfaces are represented as explicit functions. For every combination of x and y there exists one corresponding z value.
                    </p>
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 mb-4">
                      <p className="text-sm font-semibold text-[#5F6368] mb-2">General form:</p>
                      <p className="font-mono font-bold text-[#1967D2] text-xl">z = f(x, y)</p>
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Examples include:</p>
                    <ul className="font-mono text-[#5F6368] list-disc pl-6 space-y-1 mb-4 text-base">
                      <li>z = x² + y²</li>
                      <li>z = sin(x) cos(y)</li>
                      <li>z = √(x²+y²)</li>
                    </ul>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Explicit functions are computationally efficient and are widely used in:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Engineering','Calculus','Physics','Computer graphics','Surface modelling'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Implicit Surfaces */}
                  <div id="learn-implicit">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Implicit Surfaces</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Some mathematical objects cannot be written as a simple function of x and y. Instead they are written as an implicit equation.
                    </p>
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 mb-4">
                      <p className="text-sm font-semibold text-[#5F6368] mb-2">General form:</p>
                      <p className="font-mono font-bold text-[#1967D2] text-xl">f(x, y, z) = 0</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {[
                        { name: 'Sphere', eq: 'x²+y²+z²=16' },
                        { name: 'Cylinder', eq: 'x²+y²=9' },
                        { name: 'Ellipsoid', eq: 'x²/16+y²/9+z²/4=1' },
                      ].map(e => (
                        <div key={e.name} className="bg-white border border-[#DADCE0] rounded-xl p-4">
                          <p className="font-bold text-[#202124] text-sm mb-1">{e.name}</p>
                          <p className="font-mono text-[#1967D2] text-sm">{e.eq}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Implicit equations are extremely common in:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Mechanical engineering','CAD modelling','Scientific computing','Medical imaging','Structural analysis'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368]">
                      The NepaCalc 3D engine visualizes these surfaces automatically using numerical mesh generation.
                    </p>
                  </div>

                  {/* Parametric Surfaces */}
                  <div id="learn-parametric">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Parametric Surfaces</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Some of the world&apos;s most complex mathematical objects are represented parametrically. Instead of solving directly for z, each coordinate is generated using parameters.
                    </p>
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 mb-4">
                      <p className="text-sm font-semibold text-[#5F6368] mb-2">General form:</p>
                      <div className="font-mono text-[#1967D2] font-bold space-y-1">
                        <div>x = f(u, v)</div>
                        <div>y = g(u, v)</div>
                        <div>z = h(u, v)</div>
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Examples include: Möbius strips, Helicoids, Spirals, Parametric spheres, and Torus parameterizations.</p>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Parametric surfaces are widely used in:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Animation','Robotics','Aerospace','CAD software','Industrial design'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-[#5F6368] text-sm italic">Support for advanced parametric plotting is planned for future NepaCalc releases.</p>
                  </div>

                  {/* Surface Curvature */}
                  <div id="learn-curvature">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Understanding Surface Curvature</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                      One of the major advantages of a 3D Graph Calculator is that it reveals surface curvature instantly. Different mathematical surfaces bend in different directions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {[
                        { type: 'Positive Curvature', example: 'Sphere', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
                        { type: 'Negative Curvature', example: 'Hyperbolic paraboloid', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
                        { type: 'Zero Curvature', example: 'Plane', color: 'text-[#1967D2]', bg: 'bg-blue-50 border-blue-200' },
                        { type: 'Mixed Curvature', example: 'Monkey Saddle', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
                      ].map(c => (
                        <div key={c.type} className={`border rounded-xl p-5 ${c.bg}`}>
                          <p className={`font-bold text-base mb-1 ${c.color}`}>{c.type}</p>
                          <p className="text-[#5F6368] text-sm">Example: {c.example}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Understanding curvature is essential in:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Architecture','Mechanical engineering','Bridge construction','Material science','Differential geometry'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Cross Sections */}
                  <div id="learn-cross-sections">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Cross Sections and Slicing</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      One of the most powerful visualization techniques is slicing. The NepaCalc calculator allows cross-sections along the X, Y, and Z planes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5">
                        <p className="font-bold text-[#202124] text-sm mb-2">Cross sections allow users to study:</p>
                        <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                          <li>Internal geometry</li>
                          <li>Symmetry</li>
                          <li>Function behavior</li>
                          <li>Hidden intersections</li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5">
                        <p className="font-bold text-[#202124] text-sm mb-2">Heavily used in:</p>
                        <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                          <li>CT scanning</li>
                          <li>MRI imaging</li>
                          <li>Manufacturing</li>
                          <li>Engineering design</li>
                          <li>Geological modelling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contour Maps */}
                  <div id="learn-contour">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Contour Maps</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Every three-dimensional surface can also be represented as contour lines. Instead of displaying the entire surface, contour maps connect locations having equal height.
                    </p>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Contour plots are useful for:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Topographic maps','Weather forecasting','Heat distribution','Terrain modelling','Optimization'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368]">
                      Many engineering disciplines analyze contour plots before studying full 3D models.
                    </p>
                  </div>

                  {/* Gradient */}
                  <div id="learn-gradient">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Gradient and Slope Visualization</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      The gradient describes the direction of greatest increase of a function. For functions <code className="bg-[#F8F9FA] px-2 py-1 rounded font-mono text-[#1967D2]">z = f(x,y)</code>, the gradient is denoted <code className="bg-[#F8F9FA] px-2 py-1 rounded font-mono text-[#1967D2]">∇f</code>.
                    </p>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Visualizing gradients helps students understand:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Steepest ascent','Optimization','Machine learning','Fluid flow','Heat transfer'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368]">
                      Rather than memorizing formulas, interactive visualization makes gradients intuitive.
                    </p>
                  </div>

                  {/* Partial Derivatives */}
                  <div id="learn-partial-derivatives">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Partial Derivatives</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Unlike single-variable calculus, multivariable functions change in several directions simultaneously. Partial derivatives measure how a surface changes while keeping one variable constant.
                    </p>
                    <div className="flex gap-4 mb-4 flex-wrap">
                      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl px-6 py-4 font-mono text-[#1967D2] font-bold text-xl">∂z/∂x</div>
                      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl px-6 py-4 font-mono text-[#1967D2] font-bold text-xl">∂z/∂y</div>
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">These concepts form the foundation of:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Multivariable calculus','Artificial intelligence','Computational physics','Economics','Engineering analysis'].map(t => (
                        <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Why Visualization */}
                  <div id="learn-why-visualization">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Why Visualization Improves Mathematical Understanding</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                      Research consistently shows that visual learning significantly improves comprehension of mathematical concepts. Instead of imagining complex surfaces mentally, students can rotate, zoom, and inspect them from every angle.
                    </p>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-3">Interactive visualization helps users understand:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {['Surface behavior','Maximum and minimum points','Saddle points','Symmetry','Periodicity','Function growth','Oscillation','Optimization'].map(t => (
                        <div key={t} className="text-sm text-[#5F6368] bg-[#F8F9FA] border border-[#DADCE0] rounded-lg px-3 py-2 text-center">{t}</div>
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-[#5F6368]">
                      This makes three-dimensional graphing one of the most effective tools for learning advanced mathematics.
                    </p>
                  </div>

                  {/* Who Uses */}
                  <div id="learn-who-uses">
                    <h2 className="text-2xl font-black text-[#202124] mb-4">Who Uses 3D Graph Calculators?</h2>
                    <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                      Interactive graphing software is widely used across education, engineering, and scientific research. Whether you are studying for an examination or developing real engineering systems, visualizing mathematics provides a deeper understanding than equations alone.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {[
                        'High school mathematics students',
                        'University engineering students',
                        'Calculus instructors',
                        'Mechanical engineers',
                        'Civil engineers',
                        'Electrical engineers',
                        'Architects',
                        'Physicists',
                        'Data scientists',
                        'Machine learning researchers',
                        'Robotics engineers',
                        'Aerospace engineers',
                        'Software developers',
                        'Scientific researchers',
                      ].map(u => (
                        <div key={u} className="flex items-start gap-2 text-sm text-[#5F6368] bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3">
                          <span className="text-green-600 shrink-0">✔</span>
                          {u}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                                {/* ── Part 6: Real-World Applications ── */}
                <h2 id="real-world-applications" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">Real-World Applications of 3D Graphing</h2>
                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>Why is 3D Graphing Important in the Real World?</strong> 3D graphing is essential in real-world applications for modeling structural stress in engineering, plotting financial risk terrains, simulating fluid dynamics, and rendering computer graphics. By translating data into 3D space, professionals can predict physical behaviors and optimize designs before real-world implementation.</p></div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  A 3D Graph Calculator is not only a mathematical visualization tool; it is also an essential platform used across engineering, architecture, physics, computer science, finance, medicine, and scientific research.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Three-dimensional visualization transforms mathematical equations into practical models that help professionals understand complex systems before they are built or tested. From designing aircraft to predicting weather patterns, 3D mathematical models play a critical role in solving real-world problems.
                </p>

                <div className="space-y-10 mt-8">
                  {/* Applications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3">Mechanical Engineering</h3>
                      <p className="text-[#5F6368] mb-3">Mechanical engineers use three-dimensional mathematical surfaces to design, analyze, and optimize mechanical components.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Applications include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Stress distribution</li>
                        <li>Heat transfer</li>
                        <li>Machine components</li>
                        <li>Gear geometry</li>
                        <li>Pressure vessel analysis</li>
                        <li>Vibration analysis</li>
                        <li>Fluid flow</li>
                        <li>Thermal expansion</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3"><Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil Engineering</Link></h3>
                      <p className="text-[#5F6368] mb-3">Modern civil engineering relies heavily on mathematical surface modelling to identify weak regions and structural deformation before construction begins.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Applications include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Bridges and dams</li>
                        <li>High-rise buildings</li>
                        <li>Foundations</li>
                        <li>Road alignments</li>
                        <li>Drainage systems</li>
                        <li>Retaining walls</li>
                        <li>Tunnel structures</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3">Architecture</h3>
                      <p className="text-[#5F6368] mb-3">Architects frequently use mathematical surfaces to create innovative building designs, experimenting with curves and structural efficiency.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Examples include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Hyperbolic paraboloid roofs</li>
                        <li>Shell structures</li>
                        <li>Dome geometry</li>
                        <li>Free-form facades</li>
                        <li>Parametric architecture</li>
                        <li>Tensile membrane structures</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3">Aerospace Engineering</h3>
                      <p className="text-[#5F6368] mb-3">Aircraft and spacecraft are designed using sophisticated mathematical models to improve both performance and safety.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Applications include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Airfoil surfaces</li>
                        <li>Wing profiles</li>
                        <li>Rocket trajectories</li>
                        <li>Satellite orbits</li>
                        <li>Heat shields</li>
                        <li>Fuel tank geometry</li>
                        <li>Aerodynamic optimization</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3">Computer Graphics</h3>
                      <p className="text-[#5F6368] mb-3">Modern computer graphics rely almost entirely on mathematical surfaces converted into millions of polygons.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Applications include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Video game environments</li>
                        <li>Character modelling</li>
                        <li>Terrain generation</li>
                        <li>Procedural animation</li>
                        <li>Lighting calculations</li>
                        <li>Physics engines</li>
                        <li>Surface shading</li>
                        <li>Rendering algorithms</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-black text-[#202124] text-xl mb-3">Artificial Intelligence</h3>
                      <p className="text-[#5F6368] mb-3">Machine learning algorithms are often visualized as mathematical landscapes, navigating a high-dimensional loss surface.</p>
                      <p className="text-sm font-bold text-[#202124] mb-2">Applications include:</p>
                      <ul className="text-sm text-[#5F6368] list-disc pl-4 space-y-1">
                        <li>Gradient descent</li>
                        <li>Local minima</li>
                        <li>Saddle points</li>
                        <li>Optimization paths</li>
                        <li>Decision boundaries</li>
                        <li>Cost functions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#E8F0FE] border border-[#1967D2] rounded-xl p-6">
                    <p className="text-[#1967D2] font-semibold text-lg mb-2">Other Key Industries</p>
                    <div className="flex flex-wrap gap-2">
                      {['Electrical Engineering','Physics','Calculus','Data Science','Medical Science','Robotics','GIS','Financial Mathematics','Scientific Research','Education'].map(t => (
                        <span key={t} className="bg-white border border-[#1967D2] text-[#1967D2] text-sm px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Part 7: Formula Library ── */}
                <h2 id="formula-library" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Complete 3D Graph Formula Library</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  One of the biggest advantages of a professional 3D Graph Calculator is the ability to visualize a wide variety of mathematical surfaces. This calculator supports many of the equations commonly taught in mathematics, engineering, physics, computer graphics, and scientific research.
                </p>

                <div className="space-y-6 mt-8">
                  {/* Basic Functions */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white">
                    <h3 className="text-lg font-black text-[#202124] mb-4">Basic 3D Functions & Wave Functions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Plane', eq: 'z = ax + by + c', app: 'Linear algebra, Optimization' },
                        { name: 'Constant Plane', eq: 'z = c', app: 'Cross sections' },
                        { name: 'Ripple Surface', eq: 'z = sin(√(x²+y²))', app: 'Wave mechanics' },
                        { name: 'Cosine Wave', eq: 'z = cos(x) cos(y)', app: 'Fourier analysis' },
                        { name: 'Mixed Wave', eq: 'z = sin(x) cos(y)', app: 'Interference patterns' },
                      ].map(f => (
                        <div key={f.name} className="bg-[#F8F9FA] rounded-lg p-3">
                          <p className="font-bold text-[#202124] text-sm">{f.name}</p>
                          <p className="font-mono text-[#1967D2] text-xs my-1">{f.eq}</p>
                          <p className="text-[#5F6368] text-xs">{f.app}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quadrics */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white">
                    <h3 className="text-lg font-black text-[#202124] mb-4">Quadric Surfaces</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Circular Paraboloid', eq: 'z = x² + y²', app: 'Satellite dishes' },
                        { name: 'Saddle Surface', eq: 'z = x² − y²', app: 'Critical point analysis' },
                        { name: 'Sphere', eq: 'x² + y² + z² = r²', app: 'Astronomy' },
                        { name: 'Circular Cylinder', eq: 'x² + y² = r²', app: 'Pipe systems' },
                        { name: 'Right Circular Cone', eq: 'z = √(x²+y²)', app: 'Optics' },
                        { name: 'Ellipsoid', eq: 'x²/a² + y²/b² + z²/c² = 1', app: 'MRI imaging' },
                      ].map(f => (
                        <div key={f.name} className="bg-[#F8F9FA] rounded-lg p-3">
                          <p className="font-bold text-[#202124] text-sm">{f.name}</p>
                          <p className="font-mono text-[#1967D2] text-xs my-1">{f.eq}</p>
                          <p className="text-[#5F6368] text-xs">{f.app}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Advanced/Engineering */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white">
                    <h3 className="text-lg font-black text-[#202124] mb-4">Advanced & Engineering Surfaces</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Gaussian Bell', eq: 'z = exp(-(x²+y²))', app: 'Statistics' },
                        { name: 'Monkey Saddle', eq: 'z = x³ − 3xy²', app: 'Differential geometry' },
                        { name: 'Exponential Growth', eq: 'z = e^(x+y)', app: 'Population models' },
                        { name: 'One Sheet Hyperboloid', eq: 'x² + y² − z² = 1', app: 'Cooling towers' },
                        { name: 'Polynomial Surface', eq: 'z = x³+y³', app: 'Surface approximation' },
                        { name: 'Rational Function', eq: 'z = 1/(x²+y²+1)', app: 'Numerical analysis' },
                      ].map(f => (
                        <div key={f.name} className="bg-[#F8F9FA] rounded-lg p-3">
                          <p className="font-bold text-[#202124] text-sm">{f.name}</p>
                          <p className="font-mono text-[#1967D2] text-xs my-1">{f.eq}</p>
                          <p className="text-[#5F6368] text-xs">{f.app}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Part 8: Advanced Concepts ── */}
                <h2 id="advanced-concepts" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Advanced Concepts in 3D Graphing</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  As mathematical models become more sophisticated, understanding the underlying concepts becomes just as important as plotting the equations themselves. Professional engineers, mathematicians, physicists, data scientists, and researchers rely on advanced visualization techniques to analyze complex systems that cannot be represented using simple two-dimensional graphs.
                </p>

                <div className="space-y-8 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Domain and Range</h3>
                      <p className="text-[#5F6368]">Every mathematical function has a domain (valid x,y inputs) and a range (possible z outputs). Understanding domain restrictions helps prevent undefined mathematical operations while graphing.</p>
                    </div>
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Surface Normals</h3>
                      <p className="text-[#5F6368]">A normal vector is perpendicular to the surface at a specific point. Lighting calculations inside nearly every modern graphics engine depend entirely on accurate surface normals.</p>
                    </div>
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Tangent Planes & Level Surfaces</h3>
                      <p className="text-[#5F6368]">Tangent planes provide local approximations that simplify complicated mathematical surfaces. Level surfaces represent all points having the same function value, like f(x,y,z)=10.</p>
                    </div>
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Contour Lines & Gradient Vectors</h3>
                      <p className="text-[#5F6368]">Contour lines are 2D slices connecting equal heights. The gradient (∇f) points toward the direction of greatest increase, powering optimization algorithms in AI.</p>
                    </div>
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Partial & Directional Derivatives</h3>
                      <p className="text-[#5F6368]">Partial derivatives measure how rapidly the surface changes in x or y directions. Directional derivatives measure the slope along any chosen vector.</p>
                    </div>
                    <div className="bg-white border border-[#DADCE0] rounded-xl p-6">
                      <h3 className="font-bold text-[#202124] text-lg mb-2">Critical Points & Optima</h3>
                      <p className="text-[#5F6368]">Critical points (where the gradient is zero) may represent local/global maxima, minima, or saddle points, forming the primary objectives of optimization.</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Tips for Better 3D Visualization</h3>
                    <ul className="text-[#5F6368] list-disc pl-5 space-y-1">
                      <li>Rotate the graph from multiple angles.</li>
                      <li>Zoom into important regions.</li>
                      <li>Compare multiple equations simultaneously.</li>
                      <li>Adjust parameter values using sliders.</li>
                      <li>Enable wireframe mode to inspect geometry.</li>
                    </ul>
                  </div>
                </div>

                {/* ── Part 9: Comparisons ── */}
                <h2 id="comparisons" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Best 3D Graph Calculators Compared</h2>
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
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Today, numerous online tools allow users to visualize three-dimensional mathematical functions. While all of them provide graphing capabilities, each platform focuses on different audiences and use cases. The NepaCalc 3D Graph Calculator combines interactive visualization, educational content, engineering presets, and browser-based performance into a single platform.
                </p>

                <div className="space-y-6">
                  {/* Desmos */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-2">NepaCalc vs Desmos 3D Calculator</h3>
                    <p className="text-[#5F6368] mb-4">Desmos excels at interactive plotting and classroom teaching. However, Desmos primarily focuses on graphing itself rather than providing detailed educational explanations or engineering-specific references.</p>
                    <div className="bg-[#E8F0FE] rounded-lg p-4">
                      <p className="font-bold text-[#1967D2] mb-2">NepaCalc Advantages:</p>
                      <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                        <li>Complete mathematical reference library</li>
                        <li>Engineering-focused presets</li>
                        <li>Detailed educational explanations</li>
                        <li>Step-by-step learning content</li>
                      </ul>
                    </div>
                  </div>

                  {/* GeoGebra */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-2">NepaCalc vs GeoGebra 3D</h3>
                    <p className="text-[#5F6368] mb-4">GeoGebra is particularly strong for geometry construction and educational demonstrations.</p>
                    <div className="bg-[#E8F0FE] rounded-lg p-4">
                      <p className="font-bold text-[#1967D2] mb-2">NepaCalc Advantages:</p>
                      <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                        <li>Dedicated engineering interface</li>
                        <li>Advanced mathematical surface documentation</li>
                        <li>Scientific presets</li>
                        <li>Calculator-focused workflow</li>
                      </ul>
                    </div>
                  </div>

                  {/* Math3D */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-2">NepaCalc vs Math3D</h3>
                    <p className="text-[#5F6368] mb-4">Math3D is highly capable for university-level mathematics, supporting complex parametric equations and animations.</p>
                    <div className="bg-[#E8F0FE] rounded-lg p-4">
                      <p className="font-bold text-[#1967D2] mb-2">NepaCalc Advantages:</p>
                      <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                        <li>Easier interface</li>
                        <li>Better educational explanations</li>
                        <li>Beginner-friendly documentation</li>
                        <li>Formula reference library</li>
                      </ul>
                    </div>
                  </div>

                  {/* Professional Tools */}
                  <div className="border border-[#DADCE0] rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="text-xl font-black text-[#202124] mb-2">NepaCalc vs MATLAB & Mathematica</h3>
                    <p className="text-[#5F6368] mb-4">MATLAB, Mathematica, and Maple are professional engineering and computational mathematics systems used by universities and research institutions.</p>
                    <div className="bg-[#E8F0FE] rounded-lg p-4">
                      <p className="font-bold text-[#1967D2] mb-2">NepaCalc Advantages:</p>
                      <ul className="text-[#5F6368] text-sm list-disc pl-4 space-y-1">
                        <li>Free to use with no installation required</li>
                        <li>Browser based with instant visualization</li>
                        <li>Simpler interface</li>
                        <li>Beginner friendly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                                {/* ── Part 10: Resources, Glossary, FAQs ── */}
                <h2 id="glossary" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">3D Graphing Glossary</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Understanding common graphing terminology makes it easier to interpret mathematical surfaces and use advanced visualization tools effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Cartesian Coordinates</p>
                    <p className="text-[#5F6368] text-sm">The standard three-dimensional coordinate system consisting of the x, y, and z axes.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Surface</p>
                    <p className="text-[#5F6368] text-sm">A two-dimensional mathematical object that exists within three-dimensional space. Examples include spheres, paraboloids, cones, and saddles.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Mesh & Vertex</p>
                    <p className="text-[#5F6368] text-sm">A collection of small polygons used to approximate a surface. Higher density creates smoother graphs. A vertex is a single coordinate point within the mesh.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Parametric Equation</p>
                    <p className="text-[#5F6368] text-sm">An equation representing coordinates as functions of parameters. e.g., <code className="bg-[#F8F9FA] px-1 rounded font-mono">x=cos(t), y=sin(t), z=t</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Implicit Surface</p>
                    <p className="text-[#5F6368] text-sm">A surface defined by an equation involving x, y, and z together, like <code className="bg-[#F8F9FA] px-1 rounded font-mono">x²+y²+z²=16</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Explicit Function</p>
                    <p className="text-[#5F6368] text-sm">A function where z depends directly on x and y, like <code className="bg-[#F8F9FA] px-1 rounded font-mono">z=x²+y²</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Contour Plot & Gradient</p>
                    <p className="text-[#5F6368] text-sm">A 2D representation using lines of equal height. The gradient is the direction of steepest increase.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Saddle Point</p>
                    <p className="text-[#5F6368] text-sm">A point where the surface rises in one direction and falls in another.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Gaussian Surface</p>
                    <p className="text-[#5F6368] text-sm">A bell-shaped surface representing the normal probability distribution.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Hyperbolic Paraboloid</p>
                    <p className="text-[#5F6368] text-sm">A saddle-shaped surface commonly used in structural engineering and architecture.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Paraboloid & Torus</p>
                    <p className="text-[#5F6368] text-sm">A paraboloid is curved from <Link href="/calculator/quadratic-solver" className="text-[#1967D2] hover:underline font-medium">quadratic equations</Link> (e.g. satellite dishes). A torus is a donut-shape.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Cross Section & Wireframe</p>
                    <p className="text-[#5F6368] text-sm">A slice to analyze internal <Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link>. Wireframe displays only edges instead of filled polygons.</p>
                  </div>
                </div>

                <h2 id="learn-more" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Learn More About 3D Mathematics</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Three-dimensional graphing is closely connected to many advanced mathematical topics. Many of these concepts become significantly easier to understand when visualized interactively. To deepen your understanding, explore:
                </p>
                <div className="flex flex-wrap gap-2 mb-12">
                  {['Multivariable Calculus','Vector Calculus','<Link href="/math-tools/matrix" className="text-[#1967D2] hover:underline font-medium">Linear Algebra</Link>','Analytical Geometry','Differential Equations','Numerical Methods','Computer Graphics','Engineering Mathematics','Scientific Visualization','Machine Learning Mathematics'].map(t => (
                    <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] px-3 py-1 rounded-full text-sm">{t}</span>
                  ))}
                </div>

                <h2 id="related-calculators" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Related NepaCalc Calculators</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Continue exploring mathematics using our specialized calculators. These tools complement the 3D Graph Calculator and help solve a wide range of mathematical, engineering, and scientific problems.
                </p>
                <div className="flex flex-wrap gap-2 mb-12">
                  {['Scientific Calculator','Matrix Calculator','Linear Equation Solver','Quadratic Equation Solver','Geometry Calculator','Area Calculator','Percentage Calculator','Standard Deviation Calculator','Fraction Calculator','Decimal to Fraction Calculator','Physics Force Calculator','Energy Calculator','Unit Converter','Length Converter','Weight Converter'].map(t => (
                    <Link href={`/${t.toLowerCase().includes("scientific") ? "math-tools/scientific" : t.toLowerCase().includes("matrix") ? "math-tools/matrix" : t.toLowerCase().includes("geometry") ? "math-tools/geometry" : "math-tools/calculator"}`} key={t} className="bg-[#E8F0FE] border border-[#1967D2] text-[#1967D2] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#1967D2] hover:text-white transition-colors">{t}</Link>
                  ))}
                </div>

                <h2 id="who-uses" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Who Uses a 3D Graph Calculator?</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Interactive three-dimensional visualization is valuable across numerous professions. Professionals often rely on graphical visualization to communicate complex mathematical ideas more effectively. Common users include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
                  {['High school students','University students','Mathematics teachers','Engineering professors','Civil engineers','Mechanical engineers','Electrical engineers','Software developers','Data scientists','Machine learning engineers','Architects','Physicists','Researchers','Financial analysts','Scientific institutions'].map(u => (
                    <div key={u} className="flex items-start gap-2 text-sm text-[#5F6368]">
                      <span className="text-[#1967D2] mt-0.5">●</span>
                      {u}
                    </div>
                  ))}
                </div>

                <h2 id="faq" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4 mb-16">
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">What is a 3D graph calculator?</h3>
                    <p className="text-[#5F6368]">A 3D graph calculator visualizes mathematical equations in three-dimensional space by plotting surfaces, curves, and geometric objects using x, y, and z coordinates.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Is NepaCalc free?</h3>
                    <p className="text-[#5F6368]">Yes. The NepaCalc 3D Graph Calculator is completely free and works directly in your web browser.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I graph multiple equations?</h3>
                    <p className="text-[#5F6368]">Yes. You can add multiple equations and compare their shapes simultaneously using different colors.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Does NepaCalc support engineering equations?</h3>
                    <p className="text-[#5F6368]">Yes. Engineering presets include saddles, cones, paraboloids, cylinders, spheres, ellipsoids, hyperboloids, and many other commonly studied mathematical surfaces.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I rotate and zoom the graph?</h3>
                    <p className="text-[#5F6368]">Yes. Simply drag with your mouse or touch controls to rotate the model in real time. Zoom controls allow you to inspect both global surface behavior and small local regions.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Does it work on mobile devices and all browsers?</h3>
                    <p className="text-[#5F6368]">Yes. The calculator is fully responsive and supports all modern browsers including Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave, and Opera. It works on smartphones, tablets, laptops, and desktop computers.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Do I need to install software?</h3>
                    <p className="text-[#5F6368]">No. Everything runs directly inside your browser using modern WebGL rendering.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I use this calculator for university assignments?</h3>
                    <p className="text-[#5F6368]">Yes. Many university students use interactive graphing tools to better understand <Link href="/math-tools/calculus" className="text-[#1967D2] hover:underline font-medium">multivariable calculus</Link>, linear equations, <Link href="/engineering" className="text-[#1967D2] hover:underline font-medium">engineering mathematics</Link>, differential equations, and <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific visualization</Link>.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Is NepaCalc suitable for beginners?</h3>
                    <p className="text-[#5F6368]">Absolutely. The calculator includes educational explanations, preset equations, mathematical references, and interactive examples designed for learners at every level.</p>
                  </div>
                </div>

                <div className="bg-[#F0F4FF] border border-[#1967D2] rounded-2xl p-8 mb-12">
                  
                {/* ── Related Engineering Topics ── */}
                <h2 className="text-2xl font-black text-[#202124] mt-16 mb-4">Related Engineering Topics</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  If you're learning 3D graphing, you may also find these engineering and mathematics tools useful for your calculations:
                </p>
                <div className="flex flex-wrap gap-3 mb-16">
                  <Link href="/calculator/scientific-calculator" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Scientific Calculator</Link>
                  <Link href="/math-tools/matrix" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Matrix Calculator</Link>
                  <Link href="/math-tools/geometry" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Geometry Tools</Link>
                  <Link href="/calculator/physics-force" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Force Calculator</Link>
                  <Link href="/calculator/unit-converter" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Unit Converter</Link>
                </div>

                {/* ── Continue Learning ── */}
                <h2 className="text-2xl font-black text-[#202124] mt-16 mb-6">Continue Learning</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                  <Link href="/calculator/scientific-calculator" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Scientific Calculator</span>
                    <span className="text-sm text-[#5F6368]">Perform complex multivariable calculations.</span>
                  </Link>
                  <Link href="/math-tools/matrix" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Matrix Calculator</span>
                    <span className="text-sm text-[#5F6368]">Solve linear algebra and transformations.</span>
                  </Link>
                  <Link href="/calculator/quadratic-solver" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Quadratic Solver</span>
                    <span className="text-sm text-[#5F6368]">Find roots and parabolas instantly.</span>
                  </Link>
                  <Link href="/math-tools/geometry" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Geometry Tools</span>
                    <span className="text-sm text-[#5F6368]">Analyze geometric properties and volumes.</span>
                  </Link>
                  <Link href="/calculator/physics-force" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Force Calculator</span>
                    <span className="text-sm text-[#5F6368]">Calculate tension and structural forces.</span>
                  </Link>
                  <Link href="/calculator/unit-converter" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Unit Converter</span>
                    <span className="text-sm text-[#5F6368]">Convert engineering and scientific units.</span>
                  </Link>
                  <Link href="/algebra/linear-equation" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Linear Equation Solver</span>
                    <span className="text-sm text-[#5F6368]">Solve multi-variable linear systems.</span>
                  </Link>
                  <Link href="/engineering" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Engineering Hub</span>
                    <span className="text-sm text-[#5F6368]">Explore all engineering calculators.</span>
                  </Link>
                </div>

                {/* ── Trusted Mathematical References ── */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-12 shadow-xl border border-slate-700">
                  <h2 className="text-2xl font-black text-white mb-4">Trusted Mathematical References</h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    The following educational references provide authoritative explanations of multivariable calculus, coordinate geometry, engineering mathematics, and scientific visualization concepts discussed throughout this guide.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      <a href="https://mathworld.wolfram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Wolfram MathWorld – 3D Geometry & Mathematical Surfaces
                      </a>
                    </li>
                    <li>
                      <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        MIT OpenCourseWare – Multivariable Calculus
                      </a>
                    </li>
                    <li>
                      <a href="https://www.nist.gov" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        NIST – International System of Units (SI)
                      </a>
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-black text-[#1967D2] mb-4">Continue Exploring Mathematics</h2>
                  <p className="text-lg leading-relaxed text-[#202124] mb-4">
                    Mathematics becomes much easier when you can see it.
                  </p>
                  <p className="text-[#5F6368] mb-4">
                    The NepaCalc 3D Graph Calculator transforms abstract equations into interactive models that improve understanding, strengthen intuition, and support learning across mathematics, engineering, physics, statistics, computer science, and data visualization.
                  </p>
                  <p className="text-[#5F6368]">
                    Whether you are solving homework, preparing for university examinations, teaching a classroom, building engineering models, or conducting research, interactive visualization helps bridge the gap between equations and real-world understanding. Explore more calculators throughout NepaCalc to continue your mathematical journey.
                  </p>
                </div>

              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
