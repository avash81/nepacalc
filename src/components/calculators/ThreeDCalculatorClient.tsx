'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  CameraControls, Center, Text, QuadraticBezierLine, Billboard, Grid, OrbitControls, Line, Environment, ContactShadows,
  PerspectiveCamera, OrthographicCamera, Float
} from '@react-three/drei';
import * as THREE from 'three';

import { 
  Box, RotateCcw, Plus, Minus, Search, Maximize, ChevronRight, ArrowLeft
, ChevronDown} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ── TYPES ────────────────────────────────────────────────── */
interface GraphItem {
  id: string;
  equation: string;
  visible: boolean;
  color: string;
  opacity: number;
  error: string | null;
}

interface Parameter {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
}

/* ── CONSTANTS ────────────────────────────────────────────── */
const MAJOR_GRID = '#1e293b'; 
const MINOR_GRID = '#0f172a'; 

const GRAPH_COLORS = [
  '#0ea5e9', '#f43f5e', '#8b5cf6', '#3b82f6', 
  '#10b981', '#f59e0b', '#6366f1', '#ec4899'
];

const CURRICULUM_PRESETS = [
  // CALCULUS & ANALYSIS
  { 
    name: 'Wave (Ripples)', 
    eq: 'z = sin(sqrt(x^2 + y^2))', 
    color: '#4f46e5',
    desc: 'The fundamental sin(r) function, essential for teaching wave mechanics and multivariable calculus.'
  },
  { 
    name: 'Saddle (Engineering)', 
    eq: 'z = (x^2 - y^2)/4', 
    color: '#e11d48',
    desc: 'The hyperbolic paraboloid, a key concept in structural engineering, architecture, and optimization research.'
  },
  { 
    name: 'Sombrero (Signal)', 
    eq: 'z = 5 * sin(sqrt(x^2+y^2)) / (sqrt(x^2+y^2) + 0.01)', 
    color: '#059669',
    desc: 'The 3D sinc function, used globally in electrical engineering, digital signal processing, and physics.'
  },
  { 
    name: 'Gaussian (Stats)', 
    eq: 'z = 8 * exp(-(x^2+y^2)/10)', 
    color: '#7c3aed',
    desc: 'The Normal Distribution surface, the backbone of data science, probability theory, and statistical mechanics.'
  },
  
  // GEOMETRY & QUADRICS
  { 
    name: 'Sphere (Standard)', 
    eq: 'x^2 + y^2 + z^2 = 16', 
    color: '#0ea5e9',
    desc: 'The most fundamental 3D geometric solid, used in everything from basic trigonometry to orbital mechanics.'
  },
  { 
    name: 'Cylinder (Geometry)', 
    eq: 'x^2 + y^2 = 9', 
    color: '#f59e0b',
    desc: 'A basic engineering primitive used for analyzing fluid dynamics, pressure vessels, and mechanical designs.'
  },
  { 
    name: 'Torus (Donut)', 
    eq: '(6 - sqrt(x^2+y^2))^2 + z^2 = 4', 
    color: '#ec4899',
    desc: 'A high-level geometric topology used in advanced mathematics, physics (like tokamak fusion reactors), and design.'
  },
  { 
    name: 'Cone (Technical)', 
    eq: 'z = sqrt(x^2 + y^2)', 
    color: '#6366f1',
    desc: 'Used extensively in optics, acoustics, and engineering geometry.'
  },
  { 
    name: 'Cuboid (Prism)', 
    eq: 'max(abs(x), abs(y*1.5), abs(z*2)) = 4', 
    color: '#64748b', 
    desc: 'The fundamental rectangle prism, used for teaching volume, surface area, and structural basics in geometry.' 
  },
  { 
    name: 'Ellipsoid (Orbit)', 
    eq: 'x^2/16 + y^2/9 + z^2/4 = 1', 
    color: '#8b5cf6', 
    desc: 'A 3D generalization of an ellipse. Essential for analyzing planetary orbits, stress tensors, and medical imaging data.' 
  },
  { 
    name: 'Hyperboloid', 
    eq: 'x^2 + y^2 - z^2 = 4', 
    color: '#f97316', 
    desc: 'Used in structural engineering for cooling towers and architectural designs due to its unique double-ruled surface properties.' 
  },
  { 
    name: 'Monkey Saddle', 
    eq: 'z = (x^3 - 3*x*y^2)/4', 
    color: '#06b6d4', 
    desc: 'An advanced calculus concept featuring three depressions, used to teach higher-order critical points and complex topology.' 
  },
  { 
    name: 'Paraboloid', 
    eq: 'z = (x^2 + y^2)/4', 
    color: '#ec4899', 
    desc: 'The mathematical basis for satellite dishes, telescope mirrors, and headlamp reflectors due to its focal properties.' 
  }
];

function getDarkerColor(hex: string) {
  const color = new THREE.Color(hex);
  color.multiplyScalar(0.4);
  return color;
}
function niceStep(range: number, target: number = 10) {
  const rough = range / target;
  const pow = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))));
  const n = rough / pow;
  const step = (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * pow;
  return step > 0 ? step : 1;
}

/* ── COMPONENTS ───────────────────────────────────────────── */

function ProfessionalAxis({ bounds, showLabels, showGrid }: { bounds: { x: number, y: number, z: number }, showLabels: boolean, showGrid: boolean }) {
  const generateTicks = (limit: number) => {
    const step = niceStep(limit * 2, 10); // Target slightly more ticks for decimals
    const ticks = [];
    for (let i = -limit; i <= limit; i += step) {
      ticks.push(Math.round(i * 100) / 100);
    }
    // Add 0 explicitly if not present
    if (!ticks.includes(0)) ticks.push(0);
    return ticks.sort((a, b) => a - b);
  };

  const xTicks = generateTicks(bounds.x);
  const yTicks = generateTicks(bounds.y);
  const zTicks = generateTicks(bounds.z);
  const labelSize = Math.max(bounds.x, bounds.z) * 0.05;
  
  return (
    <group>
      {showGrid && (
        <Grid 
          infiniteGrid 
          fadeDistance={Math.max(bounds.x, bounds.y) * 4} 
          sectionSize={niceStep(bounds.x, 5)} 
          sectionThickness={1.5} 
          sectionColor="#334155" 
          cellSize={niceStep(bounds.x, 10)}
          cellThickness={1}
          cellColor="#94a3b8" 
          position={[0, -0.01, 0]} 
        />
      )}

      <Line points={[[-bounds.x * 2, 0, 0], [bounds.x * 2, 0, 0]]} color="#ef4444" lineWidth={3} />
      {showLabels && (
        <Billboard position={[bounds.x * 2 + labelSize, 0, 0]}>
          <Text fontSize={labelSize * 1.5} color="#ef4444" fontWeight="black">X</Text>
        </Billboard>
      )}
      {showLabels && xTicks.map(t => (
        <Billboard key={`x-${t}`} position={[t, -labelSize * 1.2, 0]}>
          <Text fontSize={labelSize} color="#000000" fontWeight="bold">{t}</Text>
        </Billboard>
      ))}

      <Line points={[[0, -bounds.z * 2, 0], [0, bounds.z * 2, 0]]} color="#3b82f6" lineWidth={3} />
      {showLabels && (
        <Billboard position={[0, bounds.z * 2 + labelSize, 0]}>
          <Text fontSize={labelSize * 1.5} color="#3b82f6" fontWeight="black">Z</Text>
        </Billboard>
      )}
      {showLabels && zTicks.map(t => (
        <Billboard key={`z-${t}`} position={[labelSize * 1.5, t, 0]}>
          <Text fontSize={labelSize} color="#000000" fontWeight="bold">{t}</Text>
        </Billboard>
      ))}

      <Line points={[[0, 0, -bounds.y * 2], [0, 0, bounds.y * 2]]} color="#22c55e" lineWidth={3} />
      {showLabels && (
        <Billboard position={[0, 0, bounds.y * 2 + labelSize]}>
          <Text fontSize={labelSize * 1.5} color="#22c55e" fontWeight="black">Y</Text>
        </Billboard>
      )}
      {showLabels && yTicks.map(t => (
        <Billboard key={`y-${t}`} position={[0, -labelSize * 1.2, t]}>
          <Text fontSize={labelSize} color="#000000" fontWeight="bold">{t}</Text>
        </Billboard>
      ))}
    </group>
  );
}

function WorkerSurfaceMesh({ id, equation, resolution, color, params, globalWireframe, sliceMode, slicePos, onRangeReport, isImplicit, useRadians }: any) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  
  useEffect(() => {
    const worker = new Worker('/workers/graphWorker.js');
    
    worker.onmessage = (e) => {
      if (e.data.type === 'success' && e.data.id === id) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(e.data.positions, 3));
        geo.setIndex(new THREE.BufferAttribute(e.data.indices, 1));
        geo.computeVertexNormals();
        setGeometry(geo);
        
        if (onRangeReport && e.data.zRange) {
          if (isImplicit) {
             onRangeReport({ x: 6, y: 6, z: 6 });
          } else if (e.data.zRange.min !== Infinity) {
             onRangeReport({ x: 8, y: 8, z: Math.max(Math.abs(e.data.zRange.min), Math.abs(e.data.zRange.max)) });
          }
        }
      }
    };

    const timer = setTimeout(() => {
      worker.postMessage({
        id,
        type: isImplicit ? 'implicit' : 'explicit',
        equation,
        resolution,
        params,
        useRadians
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      worker.terminate();
    };
  }, [id, equation, resolution, params, isImplicit, useRadians]);

  const clippingPlane = useMemo(() => {
    if (sliceMode === 'none') return null;
    const normal = new THREE.Vector3();
    if (sliceMode === 'x') normal.set(-1, 0, 0);
    if (sliceMode === 'y') normal.set(0, -1, 0);
    if (sliceMode === 'z') normal.set(0, 0, -1);
    return new THREE.Plane(normal, slicePos);
  }, [sliceMode, slicePos]);

  if (!geometry) return null;

  const isRotated = !isImplicit;

  return (
    <group rotation={isRotated ? [-Math.PI / 2, 0, 0] : [0, 0, 0]} position={[0, 0.05, 0]}>
      {sliceMode !== 'none' && !isImplicit && (
        <mesh position={sliceMode === 'x' ? [slicePos, 0, 0] : sliceMode === 'y' ? [0, slicePos, 0] : [0, 0, slicePos]} rotation={sliceMode === 'x' ? [0, Math.PI/2, 0] : sliceMode === 'y' ? [Math.PI/2, 0, 0] : [0, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.05} side={THREE.DoubleSide} />
          <Grid args={[12, 12]} cellColor="#2563eb" sectionColor="#2563eb" fadeDistance={20} infiniteGrid />
        </mesh>
      )}
      <mesh geometry={geometry}>
        <meshLambertMaterial color={color} side={THREE.DoubleSide} clippingPlanes={clippingPlane ? [clippingPlane] : []} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={getDarkerColor(color)} wireframe transparent opacity={globalWireframe ? 0.8 : (isImplicit ? 0.2 : 0.25)} side={THREE.DoubleSide} clippingPlanes={clippingPlane ? [clippingPlane] : []} />
      </mesh>
    </group>
  );
}


export default function ThreeDCalculatorClient() {
  const [graphs, setGraphs] = useState<GraphItem[]>([
    { id: '1', equation: 'z = sin(sqrt(x^2 + y^2))', visible: true, color: '#ef4444', opacity: 0.9, error: null }
  ]);
  const [params, setParams] = useState<Parameter[]>([{ id: 'a', name: 'a', value: 1, min: -10, max: 10 }]);
  const [resolution, setResolution] = useState(65);
  const [activeId, setActiveId] = useState<string | null>('1');
  const [globalWireframe, setGlobalWireframe] = useState(false);
  const [sliceMode, setSliceMode] = useState<'none'|'x'|'y'|'z'>('none');
  const [slicePos, setSlicePos] = useState(0);
  const [globalBounds, setGlobalBounds] = useState({ x: 8, y: 8, z: 5 });
  const [showPlane, setShowPlane] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [isOrthographic, setIsOrthographic] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [useRadians, setUseRadians] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

  const [openSections, setOpenSections] = useState({
    equations: true,
    slicing: false,
    variables: false,
    quality: false,
    appearance: false,
    presets: true
  });

  const toggleSection = (sec: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

    const fullscreenContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        fullscreenContainerRef.current?.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    };
  const [cameraZoom, setCameraZoom] = useState(1);
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  
  const sceneRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  const reportRange = useCallback((range: { x: number, y: number, z: number }) => {
    setGlobalBounds(prev => ({
      x: Math.max(prev.x, range.x),
      y: Math.max(prev.y, range.y),
      z: Math.max(prev.z, range.z)
    }));
  }, []);

  const resetStudio = () => {
    setGraphs([{ id: '1', equation: 'z = sin(sqrt(x^2 + y^2))', visible: true, color: '#0ea5e9', opacity: 0.9, error: null }]);
  };

  const updateGraph = (id: string, updates: Partial<GraphItem>) => {
    setGraphs(graphs.map(g => {
      if (g.id === id) {
        const newEq = updates.equation || g.equation;
        // Auto-detect variables (a-z excluding x, y)
        const foundVars = Array.from(newEq.toLowerCase().matchAll(/[a-z]/g))
          .map(m => m[0])
          .filter(v => {
            if (v === 'x' || v === 'y' || v === 'z') return false;
            if (['e', 'i', 'p'].includes(v)) return false; 
            return true;
          });
        
        const uniqueVars = Array.from(new Set(foundVars));
        const currentParamNames = params.map(p => p.name);
        
        const newParams = [...params];
        uniqueVars.forEach(v => {
          if (!currentParamNames.includes(v)) {
            newParams.push({ id: Math.random().toString(), name: v, value: 1, min: -10, max: 10 });
          }
        });
        
        if (newParams.length !== params.length) setParams(newParams);
        return { ...g, ...updates };
      }
      return g;
    }));
  };

  const addGraph = (equation: string, customColor?: string) => {
    setGraphs([...graphs, { 
      id: Math.random().toString(), 
      equation, 
      visible: true, 
      color: customColor || '#4f46e5', 
      opacity: 0.8, 
      error: null 
    }]);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#f8fafc] font-sans">

        {/* EQUATIONS - full width above graph */}
        <div className="w-full px-3 pt-3">
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8fafc] border-b border-slate-200">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Equations</h2>
              <button
                aria-label="Add Graph"
                onClick={() => addGraph('z = sin(sqrt(x^2 + y^2))')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold uppercase transition-all"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {graphs.map((g) => (
                <div key={g.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Layer</span>
                  </div>
                  <input
                    type="text"
                    value={g.equation}
                    onFocus={() => setActiveInputId(g.id)}
                    onChange={(e) => updateGraph(g.id, { equation: e.target.value })}
                    className="flex-1 w-full bg-[#f8fafc] border border-slate-200 rounded px-3 py-2 font-mono text-[13px] font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
                    placeholder="e.g. z = sin(sqrt(x^2 + y^2))"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] text-slate-400 uppercase font-bold hidden sm:inline">Opacity</span>
                    <input
                      type="range" min="0.1" max="1" step="0.05"
                      value={g.opacity}
                      onChange={(e) => updateGraph(g.id, { opacity: parseFloat(e.target.value) })}
                      className="w-20 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <button
                      aria-label="Remove Graph"
                      onClick={() => setGraphs(graphs.filter(x => x.id !== g.id))}
                      className="p-1 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 rotate-45" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* MAIN VIEWPORT AREA */}
        <div className="w-full h-[50vh] lg:h-[60vh] shrink-0 flex flex-col relative">
          <div ref={fullscreenContainerRef} className={`overflow-hidden flex flex-col flex-1 ${isFullscreen ? 'fixed inset-0 z-[100] w-screen h-screen' : 'h-full'}`}>
            <div className="flex-1 bg-[#e2e8f0] relative group">
              {/* Floating fullscreen button */}
              <button
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                onClick={toggleFullscreen}
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/90 backdrop-blur-sm border border-slate-200 hover:bg-white text-slate-600 hover:text-[#1e40af] text-[9px] font-bold uppercase tracking-wide transition-all shadow-sm opacity-60 hover:opacity-100"
              >
                <Maximize className="w-3 h-3" />
                <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </button>
              
              <Canvas 
                shadows 
                frameloop="demand"
                gl={{ 
                  antialias: true, 
                  localClippingEnabled: true, 
                  toneMapping: THREE.ACESFilmicToneMapping,
                  powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
              >
                <color attach="background" args={['#e2e8f0']} />
                {isOrthographic ? (
                  <OrthographicCamera makeDefault position={[12, 12, 12]} zoom={40} near={0.1} far={1000} />
                ) : (
                  <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={45} />
                )}
                <Environment preset="studio" />
                <ContactShadows 
                  position={[0, -0.02, 0]} 
                  opacity={0.4} 
                  scale={20} 
                  blur={2} 
                  far={4.5} 
                />
                <ambientLight intensity={0.5} />
                <hemisphereLight intensity={0.4} groundColor="#000000" color="#ffffff" />
                <pointLight position={[20, 30, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                <Suspense fallback={null}>
                  <group ref={sceneRef}>
                    {showPlane && <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.02, 0]}>
                      <planeGeometry args={[100, 100]} />
                      <meshStandardMaterial color="#f1f5f9" transparent opacity={0.3} />
                    </mesh>}
                    <ProfessionalAxis bounds={globalBounds} showLabels={showLabels} showGrid={showGrid} />
                    {graphs.filter(g => g.visible).map((graph, idx) => {
                      const lowerEq = graph.equation.toLowerCase().trim();
                      // Explicit if it starts with z=, y=, or x= (assignment style)
                      const isImplicit = !lowerEq.startsWith('z =') && 
                                       !lowerEq.startsWith('y =') && 
                                       !lowerEq.startsWith('x =') &&
                                       lowerEq.includes('x') && lowerEq.includes('y') && lowerEq.includes('z');
                      
                      return (
                        <WorkerSurfaceMesh 
                          key={graph.id}
                          id={graph.id}
                          equation={graph.equation}
                          color={graph.color}
                          resolution={resolution} 
                          params={params} 
                          globalWireframe={globalWireframe}
                          sliceMode={sliceMode}
                          slicePos={slicePos}
                          onRangeReport={reportRange}
                          useRadians={useRadians}
                          isImplicit={isImplicit}
                        />
                      );
                    })}
                  </group>
                  <Grid 
                    infiniteGrid={true} 
                    fadeDistance={50} 
                    sectionSize={5} 
                    sectionColor="#334155" 
                    cellColor="#1e293b" 
                    sectionThickness={1.5}
                    cellThickness={1}
                  />
                </Suspense>
                <CameraControls ref={controlsRef} makeDefault />
              </Canvas>
              
              {/* STUDIO CONTROLS, FLOATING PANEL */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
                <button 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`w-9 h-9 rounded shadow-sm border flex items-center justify-center transition-all ${isSettingsOpen ? 'bg-[#1a73e8] text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  <Search className="w-4 h-4 rotate-90" />
                </button>

                {isSettingsOpen && (
                  <div className="bg-white rounded shadow-lg border border-slate-200 w-72 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 space-y-5">
                      {/* VIEWPORT SLIDER (ZOOM) */}
                      <div className="flex items-center gap-4 py-2">
                        <Box className="w-5 h-5 text-slate-300" />
                        <input 
                          type="range" min="0.5" max="3" step="0.1"
                          value={cameraZoom}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setCameraZoom(val);
                            controlsRef.current?.zoomTo(val, true);
                          }}
                          className="flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <Maximize className="w-5 h-5 text-slate-300" />
                      </div>

                      {/* BOUNDS CONTROL */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                          <ChevronRight className="w-3 h-3" /> All Bounds:
                          <input 
                            type="number" 
                            value={globalBounds.x} 
                            onChange={(e) => setGlobalBounds({...globalBounds, x: parseFloat(e.target.value) || 10, y: parseFloat(e.target.value) || 10})}
                            className="w-16 border-b border-slate-200 text-center focus:border-blue-500 outline-none font-bold text-slate-700" 
                          />
                          <span>to</span>
                          <input 
                            type="number" 
                            value={-globalBounds.x} 
                            readOnly
                            className="w-16 border-b border-slate-200 text-center text-slate-300 outline-none" 
                          />
                        </div>
                      </div>

                      {/* MASTER TOGGLES */}
                      <div className="pt-4 border-t border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-700">Axes & Grid (ग्रिड)</span>
                          <div onClick={() => setShowGrid(!showGrid)} className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${showGrid ? 'bg-slate-600' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showGrid ? 'right-1' : 'left-1'}`} />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={showPlane} onChange={e => setShowPlane(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">XY plane</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Numbers</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} className="w-4 h-4 accent-blue-600 rounded" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Labels</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* PROJECTION TYPES */}
                      <div className="pt-4 border-t border-slate-100">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Technical Projections</div>
                        <div className="flex gap-2">
                          <button aria-label="Perspective View" onClick={() => { setIsOrthographic(false); controlsRef.current?.reset(true); }} className={`flex-1 py-2.5 rounded border flex justify-center items-center transition-all ${!isOrthographic ? 'bg-[#1a73e8] border-blue-600 text-[#202124] shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <Box className="w-4 h-4" />
                          </button>
                          <button aria-label="Orthographic View" onClick={() => { setIsOrthographic(true); controlsRef.current?.rotateTo(0, Math.PI/2, true); }} className={`flex-1 py-2.5 rounded border flex justify-center items-center transition-all ${isOrthographic ? 'bg-[#1a73e8] border-blue-600 text-[#202124] shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button aria-label="Top View" onClick={() => controlsRef.current?.setLookAt(0, 0, 30, 0, 0, 0, true)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 rounded flex justify-center items-center text-slate-400 hover:bg-slate-100">
                            <Maximize className="w-4 h-4 rotate-45" />
                          </button>
                          <button aria-label="Front View" onClick={() => controlsRef.current?.setLookAt(0, 30, 0, 0, 0, 0, true)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 rounded flex justify-center items-center text-slate-400 hover:bg-slate-100">
                            <Box className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ANGLE UNITS */}
                    <div className="flex border-t border-slate-100">
                      <button 
                        onClick={() => setUseRadians(true)}
                        className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${useRadians ? 'bg-slate-800 text-[#202124]' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                      >
                        Radians
                      </button>
                      <button 
                        onClick={() => setUseRadians(false)}
                        className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${!useRadians ? 'bg-slate-800 text-[#202124]' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                      >
                        Degrees
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col gap-1 mt-2">
                  <button 
                    onClick={() => controlsRef.current?.zoom(1.5, true)}
                    className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-t flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => controlsRef.current?.zoom(-1.5, true)}
                    className="w-10 h-10 bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all border-y-0"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => controlsRef.current?.reset(true)}
                    className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-b flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* ADVANCED MATHEMATICAL KEYBOARD */}
              {activeInputId && (
                <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#dadce0] p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-3xl w-[95%] max-w-[600px] z-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-[#202124]/40 uppercase tracking-widest">Scientific Input Panel</span>
                    <button aria-label="Close Keyboard" onClick={() => setActiveInputId(null)} className="text-[#202124]/40 hover:text-[#202124]"><Plus className="w-4 h-4 rotate-45" /></button>
                  </div>
                  <div className="grid grid-cols-9 gap-2">
                    {KBD_123.flat().map((key) => (
                      <button 
                        key={key}
                        onClick={() => {
                          const graph = graphs.find(g => g.id === activeInputId);
                          if (graph) {
                            let val = key;
                            if (key === 'AC') { updateGraph(activeInputId, { equation: '' }); return; }
                            if (key === 'DEL') { updateGraph(activeInputId, { equation: graph.equation.slice(0, -1) }); return; }
                            if (key === 'x²') val = '^2';
                            if (key === 'xʸ') val = '^';
                            if (key === '√') val = 'sqrt(';
                            if (key === 'ENTER') { setActiveInputId(null); return; }
                            updateGraph(activeInputId, { equation: graph.equation + val });
                          }
                        }}
                        className={`h-11 rounded-lg text-[11px] font-black transition-all active:scale-95 ${
                          ['AC', 'DEL', 'ENTER'].includes(key) ? 'bg-rose-600 text-[#202124]' : 
                          ['sin', 'cos', 'tan', 'exp', 'log', 'sqrt'].includes(key) ? 'bg-[#1a73e8] text-[#202124]' :
                          'bg-white/10 text-[#202124] hover:bg-white/20'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      
        {/* SETTINGS AREA (BOTTOM) */}
        <div className="w-full px-3 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            <div className="flex flex-col gap-3">
{/* SLICING CONTROLS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('slicing')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Cross-Section Slicing</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.slicing ? "" : "-rotate-90"}`} />
            </button>
            <div className={`p-4 ${openSections.slicing ? "block" : "hidden sm:block"}`}>
              <div className="flex gap-1 mb-4">
                {(['none', 'x', 'y', 'z'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSliceMode(mode)}
                    className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                      sliceMode === mode 
                        ? 'bg-[#1a73e8] text-[#202124] shadow-sm' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {sliceMode !== 'none' && (
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase">
                    <span>Plane Position</span>
                    <span className="text-blue-600">{slicePos.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.1"
                    value={slicePos}
                    onChange={(e) => setSlicePos(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}
            </div>
          </div>

{/* SECTION: FUNCTION PRESETS */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('presets')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Presets</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.presets ? "" : "-rotate-90"}`} />
            </button>
            <div className={`p-4 ${openSections.presets ? "block" : "hidden sm:block"}`}>
              <div className="flex flex-wrap gap-1.5">
                {CURRICULUM_PRESETS.map(p => (
                  <button
                    key={p.name}
                    aria-label={`Plot ${p.name}`}
                    onClick={() => addGraph(p.eq, p.color)}
                    title={p.eq}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-blue-50 bg-white text-[10px] font-semibold text-slate-600 hover:text-blue-700 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
            </div>

            <div className="flex flex-col gap-3">
{/* SECTION: DYNAMIC VARIABLES */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('variables')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Variables</h2>
              </div>
              <div className="flex items-center gap-2">
                <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.variables ? "" : "-rotate-90"}`} />
                <span onClick={(e) => { e.stopPropagation(); setParams([...params, { id: Math.random().toString(), name: 'b', value: 1, min: -10, max: 10 }]); }} className="p-1 hover:bg-slate-200 rounded text-blue-700 transition-all">
                  <Plus className="w-4 h-4" />
                </span>
              </div>
            </button>
            <div className={`p-4 flex flex-wrap gap-4 ${openSections.variables ? "flex" : "hidden sm:flex"}`}>
              {params.map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">{p.name} =</span>
                  <input type="number" step="0.1" value={p.value} onChange={(e) => setParams(params.map(x => x.id === p.id ? { ...x, value: parseFloat(e.target.value) || 0 } : x))} className="w-14 h-7 text-center border border-slate-200 rounded text-blue-600 bg-white text-[12px] font-bold" />
                  <input 
                    type="range" min={p.min} max={p.max} step="0.1"
                    value={p.value} 
                    onChange={(e) => setParams(params.map(x => x.id === p.id ? { ...x, value: parseFloat(e.target.value) } : x))}
                    className="w-20 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                  />
                </div>
              ))}
            </div>
          </div>

{/* SECTION: QUALITY */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <button onClick={() => toggleSection('quality')} className="w-full bg-[#f8fafc] border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[9px] font-bold text-[#1e40af] uppercase tracking-[0.15em]">Quality</h2>
                <span className="text-[10px] font-bold text-blue-600">{resolution}x{resolution}</span>
              </div>
              <ChevronDown className={`w-4 h-4 lg:hidden text-slate-400 transition-transform ${openSections.quality ? "" : "-rotate-90"}`} />
            </button>
            <div className={`p-4 space-y-3 ${openSections.quality ? "block" : "hidden sm:block"}`}>
              <div className="flex justify-between text-[9px] font-bold uppercase">
                <span className="text-slate-400">Resolution</span>
                <span className="text-blue-700">{resolution}x{resolution}</span>
              </div>
              <input 
                type="range" min="20" max="150" step="5"
                value={resolution}
                onChange={(e) => setResolution(parseInt(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-[8px] text-slate-300 uppercase font-bold">
                <span>Low (20)</span><span>High (150)</span>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
    </div>
  );
}
const KBD_123 = [
  ['x', 'y', 'z', 'a', 'b', 'c', '(', ')', 'AC'],
  ['7', '8', '9', '/', 'sin', 'cos', 'tan', 'exp', 'DEL'],
  ['4', '5', '6', '*', 'x\u00b2', 'x\u02b8', '\u221a', 'log', 'ENTER'],
  ['1', '2', '3', '-', '+', '.', '\u03c0', '|x|', '0']
];
