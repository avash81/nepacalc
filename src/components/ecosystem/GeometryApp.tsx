'use client';

import { useState } from 'react';
import { Mafs, Coordinates, Line, Circle, Theme, MovablePoint, vec } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { GeometrySidebar } from './GeometrySidebar';

export type GeoPoint = {
  type: 'point';
  id: string;
  x: number;
  y: number;
  name: string;
  color: string;
};

export type GeoSegment = {
  type: 'segment';
  id: string;
  p1: string; // Point ID
  p2: string; // Point ID
  color: string;
};

export type GeoCircle = {
  type: 'circle';
  id: string;
  center: string; // Point ID
  radiusPoint: string; // Point ID
  color: string;
};

export type GeoObject = GeoPoint | GeoSegment | GeoCircle;

const DEFAULT_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export function GeometryApp() {
  const [objects, setObjects] = useState<GeoObject[]>([
    { type: 'point', id: 'a', x: -2, y: -2, name: 'A', color: '#3b82f6' },
    { type: 'point', id: 'b', x: 2, y: -2, name: 'B', color: '#3b82f6' },
    { type: 'point', id: 'c', x: 0, y: 2, name: 'C', color: '#3b82f6' },
    { type: 'segment', id: 's1', p1: 'a', p2: 'b', color: '#3b82f6' },
    { type: 'segment', id: 's2', p1: 'b', p2: 'c', color: '#3b82f6' },
    { type: 'segment', id: 's3', p1: 'c', p2: 'a', color: '#3b82f6' },
  ]);

  const addPoint = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const existingPoints = objects.filter(o => o.type === 'point') as GeoPoint[];
    const nextChar = String.fromCharCode(65 + (existingPoints.length % 26));
    const name = existingPoints.length >= 26 ? `${nextChar}${Math.floor(existingPoints.length / 26)}` : nextChar;
    
    setObjects(prev => [
      ...prev,
      { type: 'point', id, x: 0, y: 0, name, color: DEFAULT_COLORS[prev.length % DEFAULT_COLORS.length] }
    ]);
  };

  const addSegment = (p1: string, p2: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setObjects(prev => [
      ...prev,
      { type: 'segment', id, p1, p2, color: '#64748b' }
    ]);
  };

  const addCircle = (center: string, radiusPoint: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setObjects(prev => [
      ...prev,
      { type: 'circle', id, center, radiusPoint, color: '#64748b' }
    ]);
  };

  const deleteObject = (id: string) => {
    setObjects(prev => prev.filter(o => {
      if (o.id === id) return false;
      // If a point is deleted, delete all segments/circles using it
      if (o.type === 'segment' && (o.p1 === id || o.p2 === id)) return false;
      if (o.type === 'circle' && (o.center === id || o.radiusPoint === id)) return false;
      return true;
    }));
  };

  const updatePointPosition = (id: string, newPos: vec.Vector2) => {
    setObjects(prev => prev.map(o => o.id === id && o.type === 'point' ? { ...o, x: newPos[0], y: newPos[1] } : o));
  };

  const points = objects.filter((o): o is GeoPoint => o.type === 'point');
  const segments = objects.filter((o): o is GeoSegment => o.type === 'segment');
  const circles = objects.filter((o): o is GeoCircle => o.type === 'circle');

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col md:flex-row overflow-hidden bg-white">
      <div className="flex h-full w-full">
         
         {/* Sidebar: 320px */}
         <div className="w-[320px] shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col z-20 shadow-sm">
            <GeometrySidebar 
              objects={objects} 
              onAddPoint={addPoint}
              onAddSegment={addSegment}
              onAddCircle={addCircle}
              onDelete={deleteObject}
            />
         </div>

         {/* Canvas: Flexible */}
         <div className="flex-1 relative bg-white overflow-hidden z-10 cursor-crosshair">
            <div className="w-full h-full">
               <Mafs 
                  viewBox={{ x: [-10, 10], y: [-6, 6] }} 
                  preserveAspectRatio="contain"
               >
                  <Coordinates.Cartesian />
                  
                  {/* Render Segments First (behind points) */}
                  {segments.map((seg) => {
                    const p1 = points.find(p => p.id === seg.p1);
                    const p2 = points.find(p => p.id === seg.p2);
                    if (!p1 || !p2) return null;
                    return (
                      <Line.Segment 
                        key={seg.id} 
                        point1={[p1.x, p1.y]} 
                        point2={[p2.x, p2.y]} 
                        color={seg.color}
                      />
                    );
                  })}

                  {/* Render Circles */}
                  {circles.map((circ) => {
                    const center = points.find(p => p.id === circ.center);
                    const rPoint = points.find(p => p.id === circ.radiusPoint);
                    if (!center || !rPoint || isNaN(center.x)) return null;
                    
                    const radius = Math.sqrt(Math.pow(rPoint.x - center.x, 2) + Math.pow(rPoint.y - center.y, 2));
                    
                    return (
                      <Circle 
                        key={circ.id}
                        center={[center.x, center.y]}
                        radius={radius}
                        color={circ.color}
                      />
                    );
                  })}

                  {/* Render Points (on top and interactive) */}
                  {points.map((p) => (
                    <MovablePoint 
                      key={p.id} 
                      point={[p.x, p.y]} 
                      color={p.color}
                      onMove={(newPos) => updatePointPosition(p.id, newPos)}
                    />
                  ))}
               </Mafs>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm pointer-events-none">
               Drag points to construct
            </div>
         </div>

      </div>
    </div>
  );
}


