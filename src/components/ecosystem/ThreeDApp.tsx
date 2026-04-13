'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera, Center, Text } from '@react-three/drei';
import * as THREE from 'three';
import * as math from 'mathjs';
import { Play, Calculator, Trash2, Plus } from 'lucide-react';

interface Equation {
  id: string;
  raw: string;
  color: string;
  visible: boolean;
}

function Surface({ equation, resolution = 64 }: { equation: string; resolution?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, resolution, resolution);
    const positions = geo.attributes.position.array;

    let compiled;
    try {
      compiled = math.compile(equation.replace(/z\s*=/g, ''));
    } catch (e) {
      return geo;
    }

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      try {
        const z = compiled.evaluate({ x, y });
        positions[i + 2] = typeof z === 'number' ? z : 0;
      } catch (e) {
        positions[i + 2] = 0;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, [equation, resolution]);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#3b82f6" 
        side={THREE.DoubleSide} 
        wireframe={false} 
        roughness={0.4}
        metalness={0.2}
        flatShading={false}
      />
    </mesh>
  );
}

export function ThreeDApp() {
  const [mounted, setMounted] = useState(false);
  const [equations, setEquations] = useState<Equation[]>([
    { id: '1', raw: 'z = sin(x) * cos(y)', color: '#3b82f6', visible: true }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateEquation = (id: string, val: string) => {
    setEquations(prev => prev.map(eq => eq.id === id ? { ...eq, raw: val } : eq));
  };

  const addEquation = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setEquations(prev => [...prev, { id, raw: 'z = 0', color: '#10b981', visible: true }]);
  };

  const removeEquation = (id: string) => {
    setEquations(prev => prev.filter(eq => eq.id !== id));
  };

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col md:row overflow-hidden bg-white">
      
      {/* Sidebar: Equation List */}
      <div className="w-full md:w-[320px] shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col z-20 shadow-lg">
         <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">3D Expressions</h2>
            <button 
               onClick={addEquation}
               className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 text-xs font-black uppercase tracking-widest transition-all"
            >
               <Plus className="w-3.5 h-3.5" /> Add
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {equations.map(eq => (
               <div key={eq.id} className="group flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all shadow-sm">
                  <div className="flex items-center justify-between px-1">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: eq.color }} />
                     <button 
                        onClick={() => removeEquation(eq.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                     >
                        <Trash2 className="w-3.5 h-3.5" />
                     </button>
                  </div>
                  <input 
                     type="text"
                     value={eq.raw}
                     onChange={(e) => updateEquation(eq.id, e.target.value)}
                     className="w-full bg-slate-50/50 border-none rounded-xl px-3 py-2.5 text-sm font-mono text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                     spellCheck={false}
                  />
               </div>
            ))}
         </div>

         <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Equaly 3D Engine</div>
         </div>
      </div>

      {/* Main Viewport: The WebGL Canvas */}
      <div className="flex-1 relative bg-white">
         {mounted ? (
           <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], fov: 45 }}>
              <color attach="background" args={['#ffffff']} />
              <fog attach="fog" args={['#ffffff', 20, 50]} />
              
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} castShadow />
              <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={1} />

              <Suspense fallback={null}>
                 <Center top>
                    {equations.filter(eq => eq.visible).map(eq => (
                       <Surface key={eq.id} equation={eq.raw} />
                    ))}
                 </Center>
                 
                 <Grid 
                    infiniteGrid 
                    fadeDistance={30} 
                    sectionSize={5} 
                    sectionColor="#cbd5e1"
                    cellColor="#f1f5f9"
                 />
              </Suspense>

              <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
           </Canvas>
         ) : (
           <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initializing WebGL...</span>
           </div>
         )}

         <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <div className="bg-white/80 backdrop-blur border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm pointer-events-none">
               Orbit: Drag | Zoom: Scroll
            </div>
         </div>
      </div>

    </div>
  );
}

