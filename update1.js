const fs = require('fs');
let content = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf-8');

// Title
content = content.replace(/title: '3D Graphing Calculator \| Free 3D Grapher & Plotter',/g, "title: '3D Graphing Calculator | Free 3D Grapher & Plotter',");

// Description
const oldDesc = "Plot 3D graphs, surfaces and mathematical functions instantly with our free online 3D Graph Calculator. Visualize equations, rotate graphs and explore multivariable functions directly in your browser.";
const newDesc = "Plot 3D graphs, equations and mathematical surfaces with a free online 3D graphing calculator. Rotate, zoom and compare multiple surfaces directly in your browser.";
content = content.replace(new RegExp(oldDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newDesc);

// H1
content = content.replace(/<h1 className="[^"]*">3D Graph Calculator<\/h1>/g, '<h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-4 text-center">3D Graphing Calculator</h1>');

// First Paragraph update
content = content.replace("Last Updated: June 2026", "Last Updated: October 2026");

const oldIntro = "Plot mathematical equations, visualize 3D surfaces, and explore multivariable functions with NepaCalc's free <strong>3D Graph Calculator</strong>. Whether you're graphing explicit functions, implicit surfaces, engineering models, or calculus equations, this interactive <strong>3D graphing calculator</strong> (and online 3D function grapher) lets you rotate, zoom, compare multiple equations, and analyze complex mathematical surfaces directly in your browser. Designed for students, engineers, educators, researchers, and professionals, it provides fast, accurate, browser-based 3D visualization without requiring software installation.";
const newIntro = "Plot mathematical equations and visualize 3D surfaces directly in your browser. This interactive 3D graphing calculator lets you create and explore surfaces, rotate and zoom the graph, compare multiple equations, and examine explicit and implicit functions without installing software.";
content = content.replace(oldIntro, newIntro);

// Update H2 and what is section
const oldH2_1 = `<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>`;
const newH2_1 = `<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What Is a 3D Graphing Calculator?</h2>`;
content = content.replace(oldH2_1, newH2_1);

const oldWhatIs = `<div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 mb-6 rounded-r-lg">
                  <p className="text-[#202124] font-medium m-0">
                    <strong>A 3D Graph Calculator is</strong> an interactive mathematical tool that visualizes equations, functions, surfaces, and geometric objects in three-dimensional space using x, y, and z coordinates. It is widely used in engineering, mathematics, computer graphics, physics, architecture, and scientific research.
                  </p>
                </div>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  A <strong>3D Graph Calculator</strong> is an interactive mathematical visualization tool that converts equations into three-dimensional graphs, allowing users to explore functions, surfaces, and <Link href="/engineering/geometry" className="text-[#1967D2] hover:underline font-medium">geometric objects</Link> in real time. Unlike a traditional two-dimensional graphing calculator that displays relationships between only the X and Y axes, a 3D graphing calculator introduces a third dimension (the Z-axis) making it possible to visualize complex mathematical surfaces, engineering models, scientific data, and multivariable functions.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Instead of reading equations as abstract mathematical expressions, users can instantly transform them into interactive models that can be rotated, zoomed, sliced, and examined from every angle. This visual approach makes complex concepts significantly easier to understand while helping students, educators, engineers, architects, researchers, and scientists analyze mathematical relationships that cannot be represented on a flat graph.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Modern <strong>online 3D graph calculators</strong> operate entirely within a web browser, eliminating the need to install expensive mathematical software like MATLAB or Mathematica. Users can simply enter an equation, choose visualization settings, and immediately interact with the generated surface — no account or installation needed.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Our <strong>3D Graph Calculator</strong> supports a wide range of mathematical equations including explicit functions, implicit surfaces, engineering models, geometric solids, and advanced multivariable functions. Whether you are studying <Link href="/math-tools/calculus" className="text-[#1967D2] hover:underline font-medium">calculus</Link>, solving engineering problems, visualizing physical phenomena, or teaching mathematics, the calculator provides an intuitive environment for exploring three-dimensional mathematics.
                </p>`;

const newWhatIs = `<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  A 3D graphing calculator is an interactive tool for plotting mathematical equations and visualizing surfaces in three dimensions. It shows how values change across the x, y and z axes, making it easier to explore functions and understand their shapes.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  A 3D graphing calculator can be used to plot explicit functions, implicit surfaces and multiple equations. Interactive controls such as rotation, zooming and cross sections help you examine a graph from different angles.
                </p>`;

content = content.replace(oldWhatIs, newWhatIs);


const oldH2_2 = `<h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">How to Use the 3D Graph Calculator</h2>`;
const newH2_2 = `<h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">How to Use the 3D Graphing Calculator</h2>`;
content = content.replace(oldH2_2, newH2_2);

const oldHowToUse = `<div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>What is a 3D Graphing Calculator?</strong> A 3D graphing calculator is an interactive mathematical software tool designed to plot equations and multivariable functions in three dimensions (X, Y, and Z). It allows users to visualize complex mathematical concepts, render geometric surfaces, and interactively rotate models to analyze relationships across multiple axes simultaneously.</p></div>
                  <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                    The NepaCalc <strong>3D Graph Calculator</strong> is designed to make mathematical visualization simple, whether you are plotting your first surface or analyzing advanced engineering equations. Follow the steps below to generate accurate three-dimensional graphs directly in your browser.
                  </p>`;
const newHowToUse = `<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                    Enter a mathematical equation, choose the available graph settings, and use the interactive controls to explore the surface. You can rotate and zoom the graph, adjust the display settings, compare equations and examine cross sections where available.
                  </p>`;
content = content.replace(oldHowToUse, newHowToUse);

fs.writeFileSync('src/app/engineering/3d/page.tsx', content);
console.log('Done');
