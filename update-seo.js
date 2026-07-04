const fs = require('fs');
let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

// Replace metadata
file = file.replace(/export const metadata = calcMeta\(\{[\s\S]*?\}\);/, `export const metadata = calcMeta({
  title: '3D Calculator Free 3D Graphing Calculator and Plotter Online',
  description: 'Use our free 3D calculator to plot explicit implicit and parametric equations online Visualize 3D graphs surfaces and vector fields instantly with our advanced WebGL 3D graphing calculator',
  slug: 'engineering/3d',
  keywords: ['3d calculator', '3d graph calculator', '3d graphing calculator', '3d plotter', '3d grapher', '3d plot calculator', 'graph 3d', 'online 3d graph', 'plot 3d function', 'multivariable graph', 'surface grapher', 'equation grapher'],
});`);

// Replace H1 and intro
file = file.replace(/<h1 className="text-3xl lg:text-4xl font-black text-\[#202124\] mb-8">.*?<\/h1>\s*<p className="text-lg leading-relaxed text-\[#5F6368\] mb-12">[\s\S]*?<\/p>/, `<h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-8">3D Calculator: Advanced 3D Graphing & Plotting Tool</h1>

            <p className="text-lg leading-relaxed text-[#5F6368] mb-12">
              Welcome to the most advanced free online <strong>3D calculator</strong> and <strong>3D grapher</strong>. Whether you are an engineering student visualizing multivariable calculus or a professional modeling complex equations, our <strong>3D graphing calculator</strong> makes it effortless to plot any function in three-dimensional space. Unlike standard 2D plotters, this WebGL-powered <strong>3D plot calculator</strong> allows you to instantly render explicit functions <code>z = f(x,y)</code>, implicit surfaces <code>f(x,y,z) = 0</code>, and complex parametric curves. Easily rotate, zoom, and explore mathematical models—from simple spheres to intricate saddle graphs—directly in your browser with zero lag.
            </p>`);

fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
