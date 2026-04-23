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
             <div className="p-8 border-b border-white/10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A73E8] opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8AB4F8] mb-2 relative z-10">Calculated Volume</div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-2 relative z-10 break-all">{res.vol}</div>
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest relative z-10">Cubic Units</div>
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
      howToUse={{ steps: ["Select the 3D geometry shape you want to analyze.", "Input the required dimensions based on the shape (radius, height, length, width).", "The tool instantly calculates the total Volume and total Surface Area.", "View the exact mathematical formulas used at the bottom of the input panel."] }}
      formula={{ title: "3D Geometric Formulas", description: "Standard Volume and Surface Area equations.", raw: "Sphere Volume: 4/3 π r³\nCylinder Volume: π r² h\nCone Volume: 1/3 π r² h\nPyramid Volume: (l × w × h) / 3\n\nSurface area calculations include all external faces and bases." }}
      faqs={[
        { question: "What is a Torus?", answer: "A torus is a doughnut-shaped surface generated by revolving a circle in three-dimensional space about an axis that is coplanar with the circle." },
        { question: "Does the cylinder surface area include the top and bottom?", answer: "Yes, the standard cylinder surface area calculation (2πr(r+h)) accounts for the lateral curved surface as well as both the top and bottom circular bases." }
      ]}
      sidebar={{ title: "Mathematics", links: [{ label: "Area Calculator (2D)", href: "/calculator/area-calculator" }, { label: "Unit Converter", href: "/calculator/unit-converter" }], banner: { title: "Spatial Logic", description: "Volume represents capacity, while surface area represents the outer boundary footprint.", image: "/images/math-banner.jpg" } }}
      relatedTools={[{ label: "Area Calculator", href: "/calculator/area-calculator" }]}
    />
  );
}
