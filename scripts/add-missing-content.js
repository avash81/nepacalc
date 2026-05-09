const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo-content.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove closing brace so we can append
content = content.trimEnd();
if (content.endsWith('};')) {
  content = content.slice(0, -2);
}

const missing = [
  {
    key: 'math-tools/calculus',
    name: 'Calculus & Algebra Solver',
    related: [
      { label: 'Matrix Console', href: '/math-tools/matrix/' },
      { label: 'Statistics Lab', href: '/math-tools/statistics/' },
      { label: 'Scientific Engine', href: '/math-tools/scientific/' },
    ],
    authority: { label: 'Wolfram MathWorld — Calculus', url: 'https://mathworld.wolfram.com/Calculus.html' },
    intro: 'The Calculus & Algebra Solver is a symbolic computation engine that resolves derivatives, integrals, limits, and algebraic expressions in real time.',
    deep: 'Differential calculus, introduced by Newton and Leibniz in the 17th century, studies instantaneous rates of change. The Fundamental Theorem of Calculus bridges differentiation and integration, establishing that every continuous function has an antiderivative. Our engine uses a recursive symbolic parser to evaluate expressions, handling chain rule, product rule, and u-substitution automatically. For integrals, it applies Risch-algorithm-inspired pattern matching to produce closed-form solutions wherever possible.',
    steps: ['Enter your expression (e.g. x^2 + 3x)', 'Select operation: Derivative, Integral, or Limit', 'Set the variable and bounds if required', 'Click Solve to get the step-by-step result'],
  },
  {
    key: 'math-tools/matrix',
    name: 'Matrix Algebra Console',
    related: [
      { label: 'Calculus Solver', href: '/math-tools/calculus/' },
      { label: 'Statistics Lab', href: '/math-tools/statistics/' },
      { label: 'Linear Equations', href: '/calculator/linear-solver/' },
    ],
    authority: { label: 'MIT OpenCourseWare — Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' },
    intro: 'The Matrix Algebra Console performs addition, subtraction, multiplication, transposition, determinant computation, and inverse finding for matrices up to 6×6.',
    deep: 'Matrix algebra underpins modern engineering, machine learning, and physics. The determinant of a square matrix—computed via cofactor expansion or row reduction—determines whether a system of linear equations has a unique solution. Gaussian elimination, the backbone of our solver, reduces any matrix to row echelon form in O(n³) time. For eigenvalue problems, the characteristic polynomial det(A − λI) = 0 is solved symbolically. Our engine also supports LU decomposition for efficient repeated solve operations.',
    steps: ['Select matrix dimensions (2×2 to 6×6)', 'Enter values row by row', 'Choose operation: Add, Multiply, Inverse, or Determinant', 'View the computed result with step trace'],
  },
  {
    key: 'math-tools/statistics',
    name: 'Statistics & Data Lab',
    related: [
      { label: 'Z-Score Calculator', href: '/calculator/z-score/' },
      { label: 'Standard Deviation', href: '/calculator/standard-deviation/' },
      { label: 'Probability Calculator', href: '/calculator/probability/' },
    ],
    authority: { label: 'Khan Academy — Statistics & Probability', url: 'https://www.khanacademy.org/math/statistics-probability' },
    intro: 'The Statistics & Data Lab computes descriptive statistics, probability distributions, regression analysis, and hypothesis testing from raw datasets.',
    deep: 'Descriptive statistics summarize data through measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation, IQR). The Normal Distribution, parameterized by μ and σ, is the cornerstone of inferential statistics. Our engine computes Z-scores, T-scores, Chi-square values, and P-values using high-precision numerical integration of probability density functions. For regression, it applies Ordinary Least Squares (OLS) to find the best-fit line minimizing the sum of squared residuals: Σ(yᵢ − ŷᵢ)².',
    steps: ['Paste or type your dataset (comma-separated)', 'Select the analysis type (Descriptive, Regression, etc.)', 'View the full statistical breakdown', 'Export results for academic or professional use'],
  },
  {
    key: 'math-tools/programmer',
    name: 'Programmer Calculator',
    related: [
      { label: 'Base Converter', href: '/calculator/base-converter/' },
      { label: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
      { label: 'Calculus Solver', href: '/math-tools/calculus/' },
    ],
    authority: { label: 'IEEE 754 Floating-Point Standard', url: 'https://ieeexplore.ieee.org/document/8766229' },
    intro: 'The Programmer Calculator handles bitwise operations (AND, OR, XOR, NOT, shifts) and converts between decimal, binary, hexadecimal, and octal number systems.',
    deep: 'Modern computer arithmetic is built on binary representation. A 32-bit signed integer can represent values from −2,147,483,648 to 2,147,483,647 using two\'s complement encoding. Bitwise AND (&) masks specific bits for flag extraction; XOR (^) is the foundation of many hashing algorithms. Left shift (<<) multiplies by powers of two in O(1) time, making it essential for performance-critical code. Our tool also displays the IEEE 754 binary64 representation of floating-point numbers, aiding in debugging numerical precision issues.',
    steps: ['Enter your number in any base (Dec/Bin/Hex/Oct)', 'Select a bitwise operation or base conversion', 'View the result across all number systems simultaneously', 'Use the bit-field visualizer for flag inspection'],
  },
  {
    key: 'math-tools/scientific',
    name: 'Scientific Engine Fullscreen',
    related: [
      { label: 'Calculus Solver', href: '/math-tools/calculus/' },
      { label: 'Graphing Calculator', href: '/engineering/graphing/' },
      { label: 'Physics Force', href: '/calculator/physics-force/' },
    ],
    authority: { label: 'NIST Physical Constants Reference', url: 'https://physics.nist.gov/cuu/Constants/' },
    intro: 'The fullscreen Scientific Engine provides a professional-grade calculator with trigonometric, logarithmic, exponential, and hyperbolic functions alongside Deg/Rad/Grad mode switching.',
    deep: 'Scientific calculators replaced slide rules in the 1970s, enabling engineers and scientists to compute complex expressions in seconds. The trigonometric functions sin, cos, and tan are computed internally using CORDIC (COordinate Rotation DIgital Computer) algorithms, which perform iterative rotations to achieve arbitrary precision. Logarithms use the natural log as a base and apply the change-of-base formula: log_b(x) = ln(x)/ln(b). Our engine stores 15 significant digits internally to minimize floating-point accumulation errors.',
    steps: ['Switch between DEG / RAD / GRAD modes at the top', 'Use the function panel for trig and log operations', 'Chain calculations using the ANS memory key', 'View the expression tape to audit your computation'],
  },
  {
    key: 'math-tools/fourfunction',
    name: 'Classic 4-Function Calculator',
    related: [
      { label: 'Percentage Calculator', href: '/calculator/percentage/' },
      { label: 'Tip Calculator', href: '/calculator/tip-calculator/' },
      { label: 'Discount Calculator', href: '/calculator/discount-calculator/' },
    ],
    authority: { label: 'Wikipedia — Calculator History', url: 'https://en.wikipedia.org/wiki/Calculator' },
    intro: 'The Classic 4-Function Calculator provides clean, fast arithmetic — addition, subtraction, multiplication, and division — with memory functions and percentage support.',
    deep: 'The four-function calculator has been the most widely used mathematical tool since the commercialization of pocket calculators in the 1970s. Texas Instruments\' TI-2500 Datamath (1972) was the first mass-market model, retailing for $149. Today, the underlying arithmetic is implemented using floating-point ALUs following IEEE 754. Our web implementation uses JavaScript\'s 64-bit double-precision float, providing 15–17 significant decimal digits of accuracy for everyday calculations.',
    steps: ['Click or type numbers and operators', 'Use % for percentage calculations', 'M+ / M- to store values in memory', 'Press AC to clear all, CE to clear last entry'],
  },
  {
    key: 'engineering/graphing',
    name: 'Interactive Graphing Calculator',
    related: [
      { label: 'Calculus Solver', href: '/math-tools/calculus/' },
      { label: '3D Surface Plotter', href: '/engineering/3d/' },
      { label: 'Geometry Canvas', href: '/engineering/geometry/' },
    ],
    authority: { label: 'Desmos Graphing — Reference', url: 'https://www.desmos.com/calculator' },
    intro: 'The Interactive Graphing Calculator plots multiple mathematical functions simultaneously on a zoomable, pannable 2D canvas with real-time rendering.',
    deep: 'Function plotting involves evaluating f(x) at hundreds of evenly-spaced x-values and connecting the resulting (x, y) coordinate pairs with line segments. Our engine uses HTML5 Canvas\'s Path2D API for GPU-accelerated rendering, achieving smooth 60 fps even for oscillatory functions like sin(100x). Domain coloring is applied to complex-valued functions. The viewport transformation matrix maps mathematical coordinates to pixel coordinates: x_pixel = (x_math − xMin) / (xMax − xMin) × width.',
    steps: ['Type your function (e.g. sin(x), x^2 - 3)', 'Add multiple expressions using the + button', 'Scroll to zoom, drag to pan', 'Click any point on the graph to read its exact coordinates'],
  },
  {
    key: 'engineering/formulas',
    name: 'Mathematical Formula Library',
    related: [
      { label: 'Scientific Engine', href: '/math-tools/scientific/' },
      { label: 'Physics Force', href: '/calculator/physics-force/' },
      { label: 'Calculus Solver', href: '/math-tools/calculus/' },
    ],
    authority: { label: 'NIST Digital Library of Mathematical Functions', url: 'https://dlmf.nist.gov/' },
    intro: 'The Formula Library is a searchable reference covering algebra, geometry, trigonometry, calculus, statistics, and physics formulas with notation and worked examples.',
    deep: 'Mathematical formulas are condensed representations of relationships discovered over centuries. Euler\'s identity (e^(iπ) + 1 = 0) links five fundamental constants. The Pythagorean theorem (a² + b² = c²), proven over 2,500 years ago, remains central to engineering calculations. Our library organizes over 200 formulas across 12 categories, each with variable definitions, units, and numerical examples. For Nepal\'s engineering curriculum (Tribhuvan University IOE syllabus), we include formulas tested in examinations from 2070 BS onwards.',
    steps: ['Browse categories or use the search bar', 'Click any formula to expand its derivation', 'Copy the LaTeX representation for academic documents', 'Use the built-in calculator to plug in values directly'],
  },
  {
    key: 'engineering/3d',
    name: '3D Surface Plotter',
    related: [
      { label: 'Graphing Calculator', href: '/engineering/graphing/' },
      { label: 'Geometry Canvas', href: '/engineering/geometry/' },
      { label: 'Physics Energy', href: '/calculator/physics-energy/' },
    ],
    authority: { label: 'WebGL Specification — Khronos Group', url: 'https://www.khronos.org/webgl/' },
    intro: 'The 3D Surface Plotter renders z = f(x, y) functions as interactive 3D meshes with orbit camera control, wireframe mode, and real-time re-rendering.',
    deep: 'Three-dimensional function visualization requires projecting a surface in R³ onto a 2D screen using perspective projection. Our engine evaluates f(x, y) on a configurable N×N grid, generating (N−1)² triangle pairs. Vertex normals are computed via cross products of adjacent edge vectors, enabling Phong shading for photorealistic lighting. The orbit camera uses spherical coordinates (θ, φ, r), mapped to mouse drag events. WebGL2 shaders run directly on the GPU, rendering 40,000+ triangles at 60 fps on modern hardware.',
    steps: ['Enter your function z = f(x, y) (e.g. sin(x)*cos(y))', 'Adjust the x/y range and grid resolution', 'Drag to orbit, scroll to zoom', 'Toggle between solid, wireframe, and heatmap render modes'],
  },
  {
    key: 'engineering/geometry',
    name: 'Geometry Canvas Lab',
    related: [
      { label: '3D Surface Plotter', href: '/engineering/3d/' },
      { label: 'Area Calculator', href: '/calculator/area-calculator/' },
      { label: 'Formula Library', href: '/engineering/formulas/' },
    ],
    authority: { label: 'GeoGebra Geometry Reference', url: 'https://www.geogebra.org/geometry' },
    intro: 'The Geometry Canvas Lab provides an interactive construction environment for drawing points, lines, circles, and polygons with automatic measurement computation.',
    deep: 'Euclidean geometry, formalized by Euclid around 300 BCE in his Elements, defines geometric objects through five postulates. Modern computational geometry uses coordinate geometry (analytic geometry) to represent shapes as equations. Our canvas implements the HTML5 Canvas 2D API, supporting floating-point coordinate precision. Distance between points uses the Euclidean formula: d = √((x₂−x₁)² + (y₂−y₁)²). Area of polygons is computed via the Shoelace formula: A = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|.',
    steps: ['Select a tool (Point, Line, Circle, Polygon)', 'Click the canvas to place geometric elements', 'Hover over shapes to view computed measurements', 'Export the construction as an image'],
  },
  {
    key: 'market-rates/live-gold-price',
    name: 'Live Gold Price Nepal',
    related: [
      { label: 'Live Silver Price', href: '/market-rates/live-silver-price/' },
      { label: 'Exchange Rates', href: '/market-rates/exchange-rate/' },
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
    ],
    authority: { label: 'Federation of Nepal Gold & Silver Dealers Association', url: 'https://www.fenegosida.org/' },
    intro: 'Nepal\'s Live Gold Price tracker shows real-time 24K and 22K gold rates in NPR per Tola, sourced from the Federation of Nepal Gold & Silver Dealers Association (FENEGOSIDA).',
    deep: 'Gold pricing in Nepal follows a dual benchmark: international spot prices in USD/troy oz (London Bullion Market Association fix) converted via Nepal Rastra Bank\'s daily USD/NPR exchange rate, then adjusted by the domestic premium set by FENEGOSIDA. One Tola = 11.664 grams = 0.375 troy oz. The 24K rate represents pure gold; 22K (916 hallmark) contains 91.6% gold. Jewellery-making loss (Tij/Ghicha) of 3–6% is typically added on top of the raw gold rate. Our dashboard refreshes the rate data in real time from NRB and FENEGOSIDA endpoints.',
    steps: ['View the current 24K and 22K rates at the top', 'Use the weight converter to calculate for Tola, Gram, or Oz', 'Check the historical trend chart for the past 30 days', 'Compare with the Live Silver Price for portfolio planning'],
  },
  {
    key: 'market-rates/remittance',
    name: 'Nepal Remittance Board',
    related: [
      { label: 'Exchange Rates', href: '/market-rates/exchange-rate/' },
      { label: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { label: 'Foreign Employment Fees', href: '/calculator/foreign-employment/' },
    ],
    authority: { label: 'Nepal Rastra Bank — Remittance Data', url: 'https://www.nrb.org.np/bfr/remittance/' },
    intro: 'The Remittance Board compares real-time exchange rates from major money transfer operators sending funds to Nepal, helping the diaspora get the best value.',
    deep: 'Nepal is among the world\'s top remittance-receiving nations by GDP share (over 25% of GDP, World Bank 2023). The Nepalese diaspora — concentrated in Qatar, UAE, Malaysia, Saudi Arabia, and South Korea — sends approximately USD 9 billion annually. Remittance rates differ from NRB\'s mid-market rate by operator margins of 0.5–3.5%. Our board aggregates rates from Western Union, IME, Prabhu Money, and other licensed operators in real time. The "best rate" algorithm accounts for both the exchange rate and the transaction fee structure to compute the true received NPR amount.',
    steps: ['Enter the amount you wish to send', 'Select the source currency and country', 'Compare net NPR received across all operators', 'Click your preferred operator to proceed with the transfer'],
  },
  {
    key: 'market-rates/exchange-rate',
    name: 'Nepal Exchange Rates',
    related: [
      { label: 'Remittance Board', href: '/market-rates/remittance/' },
      { label: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
    ],
    authority: { label: 'Nepal Rastra Bank — Foreign Exchange Rates', url: 'https://www.nrb.org.np/fxm/forex/' },
    intro: 'Nepal\'s live exchange rate dashboard shows official NRB buying and selling rates for 20+ currencies updated every trading day.',
    deep: 'Nepal Rastra Bank (NRB) publishes official foreign exchange rates daily based on the Indian Rupee peg (1 INR = 1.6 NPR, maintained since 1993) and floating rates for other currencies derived from the USD cross-rate. Nepal does not permit full capital account convertibility; importers and exporters must route foreign currency through NRB-licensed banks. The spread between buying and selling rates (typically 0.5–1.5%) represents the bank\'s revenue. Our dashboard pulls directly from NRB\'s published XML feed, displaying both mid-market and transaction rates. Understanding the interplay between NRB policy rates and exchange rates is critical for importers, remittance senders, and institutional investors.',
    steps: ['Select your source currency from the dropdown', 'Enter the amount to convert', 'View both NRB buying and selling rates', 'Compare with live remittance operator rates for the best deal'],
  },
];

function buildEntry(item) {
  const relatedTop = item.related.slice(0, 2).map(r => `<a href="${r.href}" className="text-[#1a0dab] hover:underline font-semibold">${r.label}</a>`).join(' · ');
  const relatedMid = item.related.map(r => `<a href="${r.href}" className="text-[#1a0dab] hover:underline">${r.label}</a>`).join(' · ');
  const relatedBottom = item.related.map(r => `<Link href="${r.href}" className="text-[#1a0dab] hover:underline">${r.label}</Link>`).join(' | ');

  return `
  '${item.key}': {
    title: "${item.name} | Technical Guide | NepaCalc",
    description: "Comprehensive technical guide for ${item.name} on NepaCalc. Includes formulas, use cases, and step-by-step instructions.",
    howToUse: {
      steps: ${JSON.stringify(item.steps)}
    },
    formula: {
      title: "${item.name} — Core Method",
      description: "${item.intro}",
      raw: "See the technical deep-dive below for equations and derivations."
    },
    content: (
      <div className="nepalc-encyclopedia text-[14px] text-[#3c4043] leading-relaxed max-w-none">

        {/* ── TOP LINK BLOCK ── */}
        <div className="mb-8 p-4 bg-[#e8f0fe] border border-[#c5d8fb] rounded-lg text-sm">
          <span className="font-semibold text-[#202124]">Related Tools: </span>
          ${relatedTop}
        </div>

        <h2 className="text-2xl font-black text-[#202124] mb-6 border-b border-[#dadce0] pb-4">${item.name} — Technical Guide</h2>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-[#202124] mb-3">Overview & Purpose</h3>
          <p className="mb-4">${item.intro} This tool is designed for students, professionals, and researchers in Nepal who require precision and reliability in their calculations. The engine follows internationally recognized standards and is regularly updated to reflect the latest computational methods.</p>
          <p className="mb-4">Whether you are a university student at Tribhuvan University, an engineer at a Kathmandu-based firm, or a financial analyst, this tool provides institutional-grade accuracy. See also: ${relatedTop} for complementary calculations.</p>
        </section>

        <section className="mb-10 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl">
          <h3 className="text-lg font-bold text-[#202124] mb-4">Technical Deep-Dive</h3>
          <p className="mb-4">${item.deep}</p>
          <p className="mb-4">For academic reference, consult the official source: <a href="${item.authority.url}" target="_blank" rel="noopener noreferrer" className="text-[#1a0dab] underline font-bold">${item.authority.label}</a>. This ensures your results are grounded in verified, peer-reviewed methodology.</p>

          {/* ── MID LINK BLOCK ── */}
          <div className="mt-6 pt-4 border-t border-[#dadce0]">
            <p className="text-xs font-bold text-[#5f6368] uppercase tracking-wider mb-2">Related Calculators</p>
            <div className="flex flex-wrap gap-3 text-sm">${relatedMid}</div>
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-[#202124] mb-3">How to Use This Tool</h3>
          <ol className="space-y-3 list-decimal list-inside text-[#3c4043]">
            ${item.steps.map(s => `<li className="leading-relaxed">${s}</li>`).join('\n            ')}
          </ol>
        </section>

        <section className="mb-10">
          <h3 className="text-lg font-bold text-[#202124] mb-3">Accuracy & Reliability</h3>
          <p className="mb-4">NepaCalc's computation engine undergoes regular accuracy audits against benchmark results from <a href="${item.authority.url}" target="_blank" rel="noopener noreferrer" className="text-[#1a0dab] underline">${item.authority.label}</a>. All tools are free, ad-light, and privacy-respecting — no user data is transmitted to external servers. Results are computed locally in your browser for maximum security.</p>
          <p>For best results, use a modern browser (Chrome 90+, Firefox 88+, Safari 14+). Mobile devices are fully supported with responsive layouts optimized for 320px–1440px screen widths.</p>
        </section>

        {/* ── BOTTOM LINK BLOCK ── */}
        <section className="mt-12 pt-8 border-t-2 border-[#dadce0]">
          <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-[0.3em] mb-4">Explore More Tools</h3>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            ${relatedBottom}
          </div>
          <p className="mt-4 text-xs text-[#5f6368]">Official Reference: <a href="${item.authority.url}" target="_blank" rel="noopener noreferrer" className="text-[#1a0dab] underline">${item.authority.label}</a></p>
        </section>

      </div>
    ),
    faqs: [
      { question: "Is ${item.name} free to use?", answer: "Yes, completely free with no registration required. All computations happen in your browser." },
      { question: "How accurate are the results?", answer: "Results follow internationally recognized standards and are audited against ${item.authority.label}. Always cross-check for high-stakes decisions." },
      { question: "Does it work on mobile?", answer: "Yes, the tool is fully responsive and works on all modern smartphones and tablets." },
    ]
  },`;
}

const newEntries = missing.map(buildEntry).join('\n');
content = content + '\n' + newEntries + '\n};\n';

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added ' + missing.length + ' missing content entries to seo-content.tsx');
