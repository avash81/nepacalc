'use client';

import React, { useState, useMemo, useRef, Suspense } from 'react';
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
  const [equations, setEquations] = useState<Equation[]>([
    { id: '1', raw: 'z = sin(x) * cos(y)', color: '#3b82f6', visible: true }
  ]);

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
    <div className="w-full h-[calc(100vh-50px)] flex flex-col md:flex-row bg-[#f8fafc] overflow-hidden">
      
      {/* Sidebar: Equation List */}
      <div className="w-full md:w-[350px] shrink-0 border-r border-slate-200 bg-white shadow-xl flex flex-col z-20">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">3D Expressions</h2>
            <button 
               onClick={addEquation}
               className="p-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
               <Plus className="w-4 h-4" />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {equations.map(eq => (
               <div key={eq.id} className="group flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 transition-all shadow-sm">
                  <div className="flex items-center justify-between">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eq.color }} />
                     <button 
                        onClick={() => removeEquation(eq.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                     >
                        <Trash2 className="w-3.5 h-3.5" />
                     </button>
                  </div>
                  <div className="relative">
                     <input 
                        type="text"
                        value={eq.raw}
                        onChange={(e) => updateEquation(eq.id, e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm font-mono text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                     />
                  </div>
               </div>
            ))}
         </div>

         <div className="p-6 bg-slate-50 border-t border-slate-100 italic text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
            Equaly WebGL Render Core
         </div>
      </div>

      {/* Main Viewport: The WebGL Canvas */}
      <div className="flex-1 relative bg-white">
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
               
               {/* Reference Grid */}
               <Grid 
                  infiniteGrid 
                  fadeDistance={30} 
                  sectionSize={5} 
                  sectionColor="#cbd5e1"
                  cellColor="#f1f5f9"
               />
               
               {/* Origin labels */}
               <Text position={[6, 0.1, 0]} fontSize={0.5} color="#94a3b8" rotation={[-Math.PI/2, 0, 0]}>+X</Text>
               <Text position={[0, 0.1, 6]} fontSize={0.5} color="#94a3b8" rotation={[-Math.PI/2, 0, 0]}>+Y</Text>
               <Text position={[0, 6, 0]} fontSize={0.5} color="#94a3b8" rotation={[0, 0, 0]}>+Z</Text>
            </Suspense>

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
         </Canvas>

         <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="bg-white/80 backdrop-blur border border-slate-200 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-xl pointer-events-none">
               Orbit: Drag | Zoom: Scroll
            </div>
         </div>
      </div>

    </div>
  );
}
