import re

file_path = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\engineering\3d\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_grid = """<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                      <figure>
                        <img src="/images/math/sphere.webp" title="3D Sphere Mathematical Surface" alt="3D sphere generated using Cartesian equation x² + y² + z² = r² visualized in interactive 3D space" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Sphere:</strong> 3D Graph of a Sphere plotted using standard Cartesian coordinates.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/math/torus.webp" title="3D Torus Mathematical Surface" alt="3D torus donut shape visualized using parametric equations in the 3D graph calculator" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Torus:</strong> 3D Graph of a Torus modeled via parametric surface formulation.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/math/cone.webp" title="3D Cone Mathematical Surface" alt="Interactive 3D cone generated from mathematical equation z = √(x² + y²)" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Cone:</strong> 3D Graph of a Cone visualization from a linear radial function.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/math/hyperboloid.webp" title="3D Hyperboloid Mathematical Surface" alt="One-sheet hyperboloid 3D graph used in structural engineering and architectural cooling towers" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Hyperboloid:</strong> 3D Graph of a one-sheet Hyperboloid used in structural engineering.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/math/saddle.webp" title="3D Saddle Surface - Hyperbolic Paraboloid" alt="3D saddle surface hyperbolic paraboloid visualization representing minimax critical points in calculus" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Saddle Surface:</strong> 3D Saddle Surface (Hyperbolic Paraboloid) showing minimax points.</figcaption>
                      </figure>
                      <figure>
                        <img src="/images/math/gaussian.webp" title="3D Gaussian Surface" alt="3D Gaussian surface bell curve graph representing normal distribution in multivariable statistics" width={1200} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-[#DADCE0] shadow-sm hover:shadow-md transition-shadow" />
                        <figcaption className="text-sm text-[#5F6368] mt-3 text-center"><strong>Gaussian:</strong> 3D Gaussian Surface Graph commonly used in statistics and probability.</figcaption>
                      </figure>
                    </div>"""

# Match from `<div className="grid grid-cols-1 md:grid-cols-3...` until its closing `</div>` containing the figures.
old_grid_pattern = re.compile(
    r'<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8[^>]*>.*?</div>',
    re.DOTALL
)

if old_grid_pattern.search(content):
    content = old_grid_pattern.sub(new_grid, content, count=1)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Replaced images successfully!")
else:
    print("Pattern not found!")
