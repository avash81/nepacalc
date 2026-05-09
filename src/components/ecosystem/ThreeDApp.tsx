'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, Grid, PerspectiveCamera, Center, Text, 
  Float, Html, RoundedBox, QuadraticBezierLine, Environment
} from '@react-three/drei';
import * as THREE from 'three';
import * as math from 'mathjs';
import { 
  Plus, Minus, Trash2, Eye, EyeOff, Home, ZoomIn, ZoomOut, 
  Settings, Layers, Maximize2, Activity, Box, Grid3X3, Axis3d, ChevronLeft,
  SlidersHorizontal, MousePointer2, Info, Share2, Download, FunctionSquare, LayoutGrid
} from 'lucide-react';

/* ── TYPES ────────────────────────────────────────────────── */
interface Equation {
  id: string;
  raw: string;
  color: string;
  visible: boolean;
  wireframe: boolean;
}

interface Variable {
  id: string;
  name: string;
  val: number;
  min: number;
  max: number;
}

const PRESETS = [
  { name: 'Paraboloid', eq: 'z = (x^2 + y^2)/4' },
  { name: 'Saddle', eq: 'z = (x^2 - y^2)/4' },
  { name: 'Wave', eq: 'z = sin(x) + cos(y)' },
  { name: 'Ripple', eq: 'z = sin(sqrt(x^2 + y^2))' },
  { name: 'Peaks', eq: 'z = 3*(1-x)^2*exp(-(x^2) - (y+1)^2) - 10*(x/5 - x^3 - y^5)*exp(-x^2-y^2) - 1/3*exp(-(x+1)^2 - y^2)' },
  { name: 'Cone', eq: 'z = sqrt(x^2 + y^2)' }
];

/* ── 3D SURFACE COMPONENT ──────────────────────────────────── */
function Surface({ equation, color, variables, resolution = 70, opacity = 0.6, wireframe = false }: { 
  equation: string; color: string; variables: Record<string, number>; resolution?: number; opacity?: number; wireframe?: boolean;
}) {
  const geometry = useMemo(() => {
    const size = 12;
    const geo = new THREE.PlaneGeometry(size, size, resolution, resolution);
    const positions = geo.attributes.position.array;
    try {
      const cleanExpr = equation.toLowerCase().includes('=') ? equation.split('=')[1] : equation;
      const compiled = math.compile(cleanExpr);
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i], y = positions[i + 1];
        const z = compiled.evaluate({ x, y, ...variables });
        positions[i + 2] = typeof z === 'number' && isFinite(z) ? Math.max(-10, Math.min(10, z)) : 0;
      }
    } catch (e) { return geo; }
    geo.computeVertexNormals();
    return geo;
  }, [equation, resolution, variables]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide} 
        transparent 
        opacity={opacity} 
        wireframe={wireframe}
        roughness={0.2} 
        metalness={0.1} 
        emissive={color}
        emissiveIntensity={wireframe ? 0.5 : 0.05}
      />
    </mesh>
  );
}

/* ── PRO AXES ─────────────────────────────────────────────── */
function ArrowAxis({ direction, color, label, size = 8 }: { direction: [number, number, number]; color: string; label: string; size?: number }) {
  const dir = new THREE.Vector3(...direction);
  return (
    <group>
      <QuadraticBezierLine start={[0,0,0]} end={dir.clone().multiplyScalar(size).toArray()} color={color} lineWidth={1.5} />
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute attach="attributes-position" count={2} array={new Float32Array([0, 0, 0, ...dir.clone().multiplyScalar(-size).toArray()])} itemSize={3} />
        </bufferGeometry>
        <lineDashedMaterial attach="material" color={color} dashSize={0.2} gapSize={0.2} transparent opacity={0.3} />
      </line>
      <mesh position={dir.clone().multiplyScalar(size).toArray()} rotation={direction[0]!==0?[0,0,-Math.PI/2]:direction[1]!==0?[0,0,0]:[Math.PI/2,0,0]}>
        <coneGeometry args={[0.12, 0.4, 16]} /><meshBasicMaterial color={color} />
      </mesh>
      <Text position={dir.clone().multiplyScalar(size+0.6).toArray()} fontSize={0.6} color={color} font="/fonts/Inter-Bold.woff">{label}</Text>
    </group>
  );
}

function LabeledAxes() {
  return (
    <group>
      <ArrowAxis direction={[1,0,0]} color="#ef4444" label="X" />
      <ArrowAxis direction={[0,0,1]} color="#22c55e" label="Y" />
      <ArrowAxis direction={[0,1,0]} color="#3b82f6" label="Z" />
    </group>
  );
}

/* ── MAIN APP ─────────────────────────────────────────────── */
export function ThreeDApp() {
  const [mounted, setMounted] = useState(false);
  const [eqs, setEqs] = useState<Equation[]>([{ id: '1', raw: 'z = sin(sqrt(x^2 + y^2))', color: '#6366f1', visible: true, wireframe: true }]);
  const [vars, setVars] = useState<Variable[]>([{ id: 'v1', name: 'a', val: 1, min: -5, max: 5 }]);
  const [globalWireframe, setGlobalWireframe] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => setMounted(true), []);

  const varScope = useMemo(() => {
    const s: Record<string, number> = {};
    vars.forEach(v => s[v.name] = v.val);
    return s;
  }, [vars]);

  const applyPreset = (eq: string) => {
    setEqs([{ ...eqs[0], raw: eq }]);
  };

  return (
    <div className="h-screen bg-[#0f172a] flex flex-col pt-16 overflow-hidden select-none text-slate-300">
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* SIDEBAR (ORIGINAL NEPACALC STYLE RESTORED) */}
        <aside className={`${isSidebarOpen ? 'w-80 lg:w-[400px]' : 'w-0 opacity-0'} bg-[#1e293b] border border-slate-700/50 rounded-lg transition-all duration-300 flex flex-col overflow-hidden shadow-sm`}>
          <div className="p-6 border-b border-slate-700/50 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <Box className="w-6 h-6 text-indigo-400" />
              <h1 className="text-lg font-bold text-[#202124] tracking-tight">3D Calculator</h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Equation Input */}
            <div className="space-y-4">
               {eqs.map((eq) => (
                 <div key={eq.id} className="space-y-4">
                   <input 
                     type="text" value={eq.raw} 
                     onChange={e => setEqs(eqs.map(ex => ex.id===eq.id?{...ex, raw:e.target.value}:ex))} 
                     className="w-full px-5 py-4 bg-[#0f172a] border border-slate-700 rounded-2xl font-mono text-[15px] text-indigo-300 outline-none focus:border-indigo-500 shadow-inner transition-all"
                     spellCheck={false}
                   />
                   <label className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${globalWireframe ? 'bg-indigo-600 border-indigo-500' : 'border-slate-600'}`}>
                       <input type="checkbox" className="hidden" checked={globalWireframe} onChange={() => setGlobalWireframe(!globalWireframe)} />
                       {globalWireframe && <div className="w-2.5 h-2.5 bg-white rounded-[2px]" />}
                     </div>
                     <span className="text-[13px] font-bold text-slate-400 group-hover:text-[#202124] transition-colors">Wireframe mode</span>
                   </label>
                 </div>
               ))}
            </div>

            {/* Presets Gallery (RESTORED) */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">Presets</div>
               <div className="grid grid-cols-2 gap-3">
                 {PRESETS.map(p => (
                   <button 
                     key={p.name} 
                     onClick={() => applyPreset(p.eq)}
                     className="px-4 py-3.5 bg-[#0f172a] border border-slate-700 rounded-xl text-[11px] font-bold text-slate-400 hover:text-[#202124] hover:border-indigo-500 hover:bg-slate-800 transition-all text-left truncate"
                   >
                     {p.name}
                   </button>
                 ))}
               </div>
            </div>

            {/* Parameters */}
            <div className="space-y-4 pt-4 border-t border-slate-700/50">
               <div className="flex items-center gap-2 px-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">Controls</div>
               {vars.map(v => (
                 <div key={v.id} className="bg-[#0f172a] p-5 rounded-2xl border border-slate-700">
                   <div className="flex justify-between text-[13px] font-bold text-indigo-400 mb-3"><span>{v.name} = {v.val.toFixed(2)}</span></div>
                   <input type="range" min={v.min} max={v.max} step="0.1" value={v.val} onChange={e => setVars(vars.map(vx => vx.id===v.id ? {...vx, val:parseFloat(e.target.value)}:vx))} className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                 </div>
               ))}
            </div>
          </div>

          <div className="p-6 bg-[#0f172a] border-t border-slate-700/50 text-[10px] font-medium text-slate-500 flex flex-col gap-2">
             <p>Variables: <span className="text-slate-400">x, y</span> • Functions: <span className="text-slate-400">sin, cos, tan, sqrt, log, ln, abs</span></p>
          </div>
        </aside>

        {/* VIEWPORT */}
        <main className="relative flex-1 bg-[#0f172a] rounded-lg border border-slate-800/50 overflow-hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-8 left-8 z-[50] p-4 bg-slate-800 border border-slate-700 rounded-2xl shadow-sm text-slate-400 hover:text-[#202124] transition-all"><Layers className="w-5 h-5" /></button>

          {mounted ? (
            <Canvas dpr={[1, 2]} camera={{ position: [14, 14, 14], fov: 35 }}>
              <color attach="background" args={['#0f172a']} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 20, 10]} intensity={1} />
              <Suspense fallback={null}>
                <Center top>
                  {eqs.filter(e => e.visible).map(eq => <Surface key={eq.id} equation={eq.raw} color={eq.color} variables={varScope} wireframe={globalWireframe} />)}
                </Center>
                <LabeledAxes />
                <Grid infiniteGrid fadeDistance={40} sectionSize={2} sectionColor="#1e293b" cellColor="#0f172a" position={[0, -0.01, 0]} />
              </Suspense>
              <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.05} />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center"><Activity className="w-8 h-8 text-indigo-500 animate-pulse" /></div>
          )}

          {/* FLOATING CONTROLS (GEO STYLE BUT DARK) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
             <button onClick={() => controlsRef.current?.reset()} className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-[#202124] hover:border-indigo-500 transition-all"><Home className="w-6 h-6" /></button>
             <div className="flex flex-col bg-slate-800 border border-slate-700 rounded-full shadow-sm overflow-hidden">
                <button className="w-14 h-14 flex items-center justify-center text-slate-400 hover:bg-slate-700 border-b border-slate-700"><Plus className="w-5 h-5" /></button>
                <button className="w-14 h-14 flex items-center justify-center text-slate-400 hover:bg-slate-700"><Minus className="w-5 h-5" /></button>
             </div>
          </div>
          
          <div className="absolute bottom-8 left-8 text-[11px] font-bold text-slate-500 font-mono">
            {eqs[0].raw}
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            Drag to orbit • Scroll to zoom
          </div>
        </main>
      </div>
    </div>
  );
}
