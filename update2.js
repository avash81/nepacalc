const fs = require('fs');
let content = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf-8');

// Replace What is section content
content = content.replace(/<div className="bg-\[#F8F9FA\] border-l-4 border-\[#1967D2\] p-4 mb-6 rounded-r-lg">[\s\S]*?<p className="text-lg leading-relaxed text-\[#5F6368\] mb-8">[\s\S]*?<\/p>/, 
`<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  A 3D graphing calculator is an interactive tool for plotting mathematical equations and visualizing surfaces in three dimensions. It shows how values change across the x, y and z axes, making it easier to explore functions and understand their shapes.
                </p>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  A 3D graphing calculator can be used to plot explicit functions, implicit surfaces and multiple equations. Interactive controls such as rotation, zooming and cross sections help you examine a graph from different angles.
                </p>`);

// Replace How To Use section content
content = content.replace(/<div className="bg-\[#F8F9FA\] border-l-4 border-\[#1967D2\] p-4 rounded-r-lg mb-6"><p className="text-sm text-\[#202124\] font-medium leading-relaxed"><strong>What is a 3D Graphing Calculator\?<\/strong>[\s\S]*?The NepaCalc <strong>3D Graph Calculator<\/strong> is designed to make mathematical visualization simple, whether you are plotting your first surface or analyzing advanced engineering equations. Follow the steps below to generate accurate three-dimensional graphs directly in your browser.[\s\S]*?<\/p>/,
`<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
                  Enter a mathematical equation, choose the available graph settings, and use the interactive controls to explore the surface. You can rotate and zoom the graph, adjust the display settings, compare equations and examine cross sections where available.
                </p>`);

fs.writeFileSync('src/app/engineering/3d/page.tsx', content);
console.log('Done replacement');
