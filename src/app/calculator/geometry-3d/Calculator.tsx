'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Box, HelpCircle } from 'lucide-react';
import { CubeIcon, SphereIcon, ConeIcon, CylinderIcon, PyramidIcon } from '@/components/ui/GeometryIcons';

type Shape = 'sphere' | 'cube' | 'cylinder' | 'cone' | 'pyramid' | 'capsule' | 'torus';

const SHAPES: { id: Shape; label: string; icon: React.ReactNode }[] = [
  { id: 'sphere', label: 'Sphere', icon: <SphereIcon /> },
  { id: 'cube', label: 'Cube/Box', icon: <CubeIcon /> },
  { id: 'cylinder', label: 'Cylinder', icon: <CylinderIcon /> },
  { id: 'cone', label: 'Cone', icon: <ConeIcon /> },
  { id: 'pyramid', label: 'Pyramid', icon: <PyramidIcon /> },
  { id: 'capsule', label: 'Capsule', icon: <CylinderIcon /> },
  { id: 'torus', label: 'Torus', icon: <SphereIcon /> },
];

export default function Geometry3D() {
  const [shape, setShape] = useState<Shape>('sphere');
  const [r, setR] = useState(5);
  const [rMinor, setRMinor] = useState(2);
  const [h, setH] = useState(10);
  const [l, setL] = useState(10);
  const [w, setW] = useState(10);

  const res = useMemo(() => {
    const PI = Math.PI;
    let vol = 0, sa = 0, fV = '', fS = '';
    switch (shape) {
      case 'sphere': vol = (4/3)*PI*r**3; sa = 4*PI*r**2; fV = 'V = 4/3πr³'; fS = 'SA = 4πr²'; break;
      case 'cube': vol = l*w*h; sa = 2*(l*w+w*h+h*l); fV = 'V = l×w×h'; fS = 'SA = 2(lw+lh+wh)'; break;
      case 'cylinder': vol = PI*r**2*h; sa = 2*PI*r*(r+h); fV = 'V = πr²h'; fS = 'SA = 2πr(r+h)'; break;
      case 'cone': { const s = Math.sqrt(r**2+h**2); vol = (1/3)*PI*r**2*h; sa = PI*r*(r+s); fV = 'V = ⅓πr²h'; fS = 'SA = πr(r+l)'; break; }
      case 'pyramid': { const sl = Math.sqrt((w/2)**2+h**2), sw = Math.sqrt((l/2)**2+h**2); vol = l*w*h/3; sa = l*w+l*sl+w*sw; fV = 'V = (lwh)/3'; fS = 'SA = B + ½Pl'; break; }
      case 'capsule': vol = PI*r**2*((4/3)*r+h); sa = 2*PI*r*(2*r+h); fV = 'V = πr²(4r/3+h)'; fS = 'SA = 2πr(2r+h)'; break;
      case 'torus': vol = PI*rMinor**2*(2*PI*r); sa = (2*PI*r)*(2*PI*rMinor); fV = 'V = (πr²)(2πR)'; fS = 'SA = (2πR)(2πr)'; break;
    }
    return { vol: vol.toFixed(4), sa: sa.toFixed(4), fV, fS };
  }, [shape, r, rMinor, h, l, w]);

  const showR = ['sphere','cylinder','cone','capsule','torus'].includes(shape);
  const showH = shape !== 'sphere' && shape !== 'torus';
  const showLW = shape === 'cube' || shape === 'pyramid';
  const showRm = shape === 'torus';
  
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: '3D Geometry' }]}
      title="3D Geometry Calculator"
      description="Calculate exact volume and surface area for complex 3D shapes including spheres, cylinders, pyramids, and toruses."
      icon={Box}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Select 3D Shape</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {SHAPES.map(s => (
                <button key={s.id} onClick={() => setShape(s.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 border rounded-lg transition-all ${shape === s.id ? 'bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8]' : 'bg-white border-[#DADCE0] text-[#70757A] hover:bg-[#F8F9FA]'}`}>
                  <div className={`w-5 h-5 ${shape === s.id ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>{s.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#DADCE0]">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {showR && <div><label className={labelCls}>{shape==='torus' ? 'Major Radius (R)' : 'Radius (r)'}</label><input type="number" value={r} min={0} onChange={e=>setR(Number(e.target.value))} className={inputCls} /></div>}
                {showRm && <div><label className={labelCls}>Minor Radius (r)</label><input type="number" value={rMinor} min={0} onChange={e=>setRMinor(Number(e.target.value))} className={inputCls} /></div>}
                {showH && <div><label className={labelCls}>Height (h)</label><input type="number" value={h} min={0} onChange={e=>setH(Number(e.target.value))} className={inputCls} /></div>}
                {showLW && <>
                   <div><label className={labelCls}>Length (l)</label><input type="number" value={l} min={0} onChange={e=>setL(Number(e.target.value))} className={inputCls} /></div>
                   <div><label className={labelCls}>Width (w)</label><input type="number" value={w} min={0} onChange={e=>setW(Number(e.target.value))} className={inputCls} /></div>
                </>}
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
             <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-center">
                <div className="text-[9px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Volume Formula</div>
                <code className="text-xs font-mono font-bold text-[#202124]">{res.fV}</code>
             </div>
             <div className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded text-center">
                <div className="text-[9px] font-bold text-[#188038] uppercase tracking-wider mb-1">Surface Area Formula</div>
                <code className="text-xs font-mono font-bold text-[#202124]">{res.fS}</code>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="bg-[#1A1A2E] border border-[#DADCE0] rounded-lg overflow-hidden text-center">
             <div className="p-8 border-b border-[#dadce0] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8AB4F8] mb-2 relative z-10">Calculated Volume</div>
                <div className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tighter mb-2 relative z-10 break-all">{res.vol}</div>
                <div className="text-[10px] text-[#202124]/50 font-bold uppercase tracking-widest relative z-10">Cubic Units</div>
             </div>
             
             <div className="p-8 bg-[#F8F9FA]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#188038] mb-2">Surface Area</div>
                <div className="text-4xl font-black text-[#202124] tracking-tighter mb-2 break-all">{res.sa}</div>
                <div className="text-[10px] text-[#70757A] font-bold uppercase tracking-widest">Square Units</div>
             </div>
          </div>

          <div className="flex gap-3 p-4 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
             <HelpCircle className="w-5 h-5 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-relaxed">
               Always ensure your input units are consistent (e.g., all measurements in meters). If inputs are in meters, Volume will be in m³ and Surface Area will be in m².
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Understanding 3D Spatial Mathematics</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                In solid geometry, understanding the physical footprint and capacity of three-dimensional objects is crucial for disciplines ranging from mechanical engineering to fluid dynamics. Our <strong className="text-[#202124]">3d geometry calculator</strong> goes beyond simple arithmetic; it utilizes advanced trigonometric and algebraic formulas to evaluate complex polyhedrons and non-polyhedrons instantly.
              </p>
              <p>
                The calculator primarily outputs two metrics: <strong className="text-[#202124]">Volume</strong>, which measures the amount of three-dimensional space enclosed by a closed boundary (representing capacity or displacement), and <strong className="text-[#202124]">Surface Area</strong>, which quantifies the total area that the surface of an object occupies. Understanding the distinct mathematical relationships between these two metrics, such as the square-cube law, is essential for optimizing material usage in manufacturing and packaging.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Mechanics of Specific Solids</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Cylinder & Capsule:</strong> Calculating the surface area of a cylinder requires flattening its lateral surface into a rectangle (2πrh) and adding the two circular bases (2πr²). A capsule, heavily used in pharmacology and aerodynamics, combines a cylindrical body with two hemispherical end-caps, requiring a composite algebraic approach.</li>
              <li><strong className="text-[#188038]">The Cone & Pyramid:</strong> These are "tapering" solids. The volume of both a cone and a pyramid is exactly one-third the volume of their respective extruded prisms (a cylinder or a rectangular box) that share the same base and height. Calculating their surface area requires determining the 'slant height' using the Pythagorean theorem before finding the lateral area.</li>
              <li><strong className="text-[#D93025]">The Torus:</strong> Often modeled in astrophysics and magnetic confinement (tokamaks), a torus requires two distinct radii: the minor radius (tube thickness) and the major radius (distance from the center of the hole to the center of the tube). Its volume relies on Pappus's centroid theorem.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the specific 3D shape you wish to analyze from the visual grid.",
          "Identify the variables required for that shape (e.g., a Sphere only needs a Radius, while a Pyramid needs Length, Width, and Height).",
          "Enter your measurements. Ensure all inputs use the exact same unit (e.g., all in centimeters or all in meters).",
          "Review the 'Calculated Volume' (which will be in cubic units) and 'Surface Area' (which will be in square units).",
          "Check the generated formulas to see the exact mathematical equations used for your specific shape."
        ]
      }}
      formula={{
        title: "Master 3D Geometric Equations",
        description: "The core computational formulas utilized by the physics engine.",
        raw: "1. Sphere: V = (4/3)πr³ | SA = 4πr²\n2. Cylinder: V = πr²h | SA = 2πr(r+h)\n3. Cone: V = (1/3)πr²h | SA = πr(r + √(r²+h²))\n4. Pyramid: V = (lwh)/3 | SA = Base Area + Lateral Area\n5. Torus: V = (πr²)(2πR) | SA = (2πR)(2πr)"
      }}
      faqs={[
        {
          question: "What is the difference between Volume and Surface Area?",
          answer: "Volume is a measure of capacity, how much space is inside the 3D object (measured in cubic units like cm³). Surface Area is the total area of the outside boundary or 'skin' of the object (measured in square units like cm²)."
        },
        {
          question: "Does the cylinder calculation include the top and bottom lids?",
          answer: "Yes. The Surface Area output provided by this calculator represents the Total Surface Area (TSA). For a cylinder, this includes the curved lateral surface plus both the top and bottom circular bases."
        },
        {
          question: "What is a Torus and what are its major/minor radii?",
          answer: "A torus is a doughnut shape. The Minor Radius (r) is the radius of the circular tube itself. The Major Radius (R) is the distance from the center of the doughnut hole to the center of the tube."
        },
        {
          question: "How is the slant height of a cone calculated?",
          answer: "The calculator automatically derives the slant height internally using the Pythagorean theorem: Slant Height (s) = √(r² + h²), where 'r' is the base radius and 'h' is the vertical height."
        },
        {
          question: "Why do my units matter?",
          answer: "The mathematical formulas are unit-agnostic. If you input measurements in inches, the Volume output will strictly be in Cubic Inches (in³) and the Surface Area in Square Inches (in²). Mixing units will result in an invalid answer."
        },
        {
          question: "What constitutes a 'Capsule' in this calculator?",
          answer: "A capsule is geometrically defined as a cylinder with two hemispheres attached to its ends. The 'height' input refers strictly to the length of the cylindrical body section, not the total end-to-end length."
        }
      ]}
      sidebar={{ title: "Mathematics", links: [
          { label: "Area Calculator (2D)", href: "/calculator/area-calculator/" }, { label: "Unit Converter", href: "/calculator/unit-converter/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" }
        ], banner: { title: "Spatial Logic", description: "Volume represents capacity, while surface area represents the outer boundary footprint.", image: "/images/math-banner.jpg" } }}
      relatedTools={[
        { label: "Area Calculator", href: "/calculator/area-calculator/" },
        { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" }
      ]}
    />
  );
}

