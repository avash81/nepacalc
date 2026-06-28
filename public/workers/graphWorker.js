importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js');

self.onmessage = (e) => {
  const data = e.data;
  try {
    if (data.type === 'explicit') {
      const result = generateExplicit(data);
      self.postMessage({ id: data.id, type: 'success', ...result }, [result.positions.buffer, result.indices.buffer]);
    } else if (data.type === 'implicit') {
      const result = generateImplicit(data);
      self.postMessage({ id: data.id, type: 'success', ...result }, [result.positions.buffer, result.indices.buffer]);
    }
  } catch (err) {
    self.postMessage({ id: data.id, type: 'error', error: err.message });
  }
};

function generateExplicit(data) {
  const { equation, resolution, params } = data;
  const res = Math.max(resolution, 10);
  const size = 16;
  
  const segmentsX = res;
  const segmentsY = res;
  const gridX = segmentsX;
  const gridY = segmentsY;
  const gridX1 = gridX + 1;
  const gridY1 = gridY + 1;
  const segment_width = size / gridX;
  const segment_height = size / gridY;
  const widthHalf = size / 2;
  const heightHalf = size / 2;
  
  const positions = new Float32Array(gridX1 * gridY1 * 3);
  const indices = [];
  
  const cleanExpr = equation.toLowerCase().includes('=') ? equation.split('=')[1] : equation;
  
  // @ts-ignore
  const compiled = math.compile(cleanExpr);
  const scope = { x: 0, y: 0 };
  if (params) {
      for (const p of params) scope[p.name] = p.value;
  }

  let minZ = Infinity;
  let maxZ = -Infinity;
  let idx = 0;
  
  for (let iy = 0; iy < gridY1; iy++) {
    const py = heightHalf - iy * segment_height;
    for (let ix = 0; ix < gridX1; ix++) {
      const px = ix * segment_width - widthHalf;
      
      scope.x = px;
      scope.y = py;
      
      let z = 0;
      try { z = compiled.evaluate(scope); } catch (e) { z = 0; }
      if (!isFinite(z)) z = 0;
      
      positions[idx * 3] = px;
      positions[idx * 3 + 1] = py;
      positions[idx * 3 + 2] = z;
      
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
      idx++;
    }
  }
  
  for (let iy = 0; iy < gridY; iy++) {
    for (let ix = 0; ix < gridX; ix++) {
      const a = ix + gridX1 * iy;
      const b = ix + gridX1 * (iy + 1);
      const c = (ix + 1) + gridX1 * (iy + 1);
      const d = (ix + 1) + gridX1 * iy;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const indexArray = (positions.length / 3) > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
  return { positions, indices: indexArray, zRange: { min: minZ, max: maxZ } };
}

function generateImplicit(data) {
  const { equation, resolution, params } = data;
  const res = Math.min(resolution, 64);
  const size = 12;
  const step = size / res;
  const halfSize = size / 2;
  const grid = new Float32Array((res + 1) * (res + 1) * (res + 1));
  
  try {
    const parts = equation.toLowerCase().split('=');
    // @ts-ignore
    const compiled = math.compile(`(${parts[0]}), (${parts[1] || '0'})`);
    const scope = { x: 0, y: 0, z: 0 };
    if (params) {
        for (const p of params) scope[p.name.toLowerCase()] = p.value;
    }
    
    for (let i = 0; i <= res; i++) {
      for (let j = 0; j <= res; j++) {
        for (let k = 0; k <= res; k++) {
          scope.x = -halfSize + i * step;
          scope.y = -halfSize + j * step;
          scope.z = -halfSize + k * step;
          grid[i * (res+1)*(res+1) + j * (res+1) + k] = compiled.evaluate({ x: scope.x, y: scope.z, z: scope.y });
        }
      }
    }
  } catch (e) {
    return { positions: new Float32Array(), indices: new Uint16Array(), zRange: { min: -6, max: 6 } };
  }

  const positions = [];
  const indices = [];
  const vertexMap = new Int32Array((res + 1) * (res + 1) * (res + 1)).fill(-1);
  let vCount = 0;

  for (let i = 0; i < res; i++) {
    for (let j = 0; j < res; j++) {
      for (let k = 0; k < res; k++) {
        let hasSurface = false;
        const v0 = grid[i * (res+1)*(res+1) + j * (res+1) + k] > 0;
        for (let di=0; di<=1; di++) {
          for (let dj=0; dj<=1; dj++) {
            for (let dk=0; dk<=1; dk++) {
              if ((grid[(i+di)*(res+1)*(res+1) + (j+dj)*(res+1) + (k+dk)] > 0) !== v0) {
                hasSurface = true; break;
              }
            }
            if (hasSurface) break;
          }
          if (hasSurface) break;
        }
        if (hasSurface) {
          positions.push(-halfSize + (i+0.5) * step, -halfSize + (j+0.5) * step, -halfSize + (k+0.5) * step);
          vertexMap[i * (res+1)*(res+1) + j * (res+1) + k] = vCount++;
        }
      }
    }
  }

  for (let i = 0; i < res - 1; i++) {
    for (let j = 0; j < res - 1; j++) {
      for (let k = 0; k < res - 1; k++) {
        const v0 = grid[i * (res+1)*(res+1) + j*(res+1) + k] > 0;
        if (v0 !== (grid[(i+1)*(res+1)*(res+1) + j*(res+1) + k] > 0)) {
          const quad = [vertexMap[i*(res+1)*(res+1)+j*(res+1)+k], vertexMap[i*(res+1)*(res+1)+(j-1)*(res+1)+k], vertexMap[i*(res+1)*(res+1)+(j-1)*(res+1)+(k-1)], vertexMap[i*(res+1)*(res+1)+j*(res+1)+(k-1)]];
          if (quad.every(v => v !== -1)) {
            if (v0) indices.push(quad[0], quad[1], quad[2], quad[0], quad[2], quad[3]);
            else indices.push(quad[0], quad[2], quad[1], quad[0], quad[3], quad[2]);
          }
        }
        if (v0 !== (grid[i*(res+1)*(res+1) + (j+1)*(res+1) + k] > 0)) {
          const quad = [vertexMap[i*(res+1)*(res+1)+j*(res+1)+k], vertexMap[(i-1)*(res+1)*(res+1)+j*(res+1)+k], vertexMap[(i-1)*(res+1)*(res+1)+j*(res+1)+(k-1)], vertexMap[i*(res+1)*(res+1)+j*(res+1)+(k-1)]];
          if (quad.every(v => v !== -1)) {
            if (!v0) indices.push(quad[0], quad[1], quad[2], quad[0], quad[2], quad[3]);
            else indices.push(quad[0], quad[2], quad[1], quad[0], quad[3], quad[2]);
          }
        }
        if (v0 !== (grid[i*(res+1)*(res+1) + j*(res+1) + (k+1)] > 0)) {
          const quad = [vertexMap[i*(res+1)*(res+1)+j*(res+1)+k], vertexMap[(i-1)*(res+1)*(res+1)+j*(res+1)+k], vertexMap[(i-1)*(res+1)*(res+1)+(j-1)*(res+1)+k], vertexMap[i*(res+1)*(res+1)+(j-1)*(res+1)+k]];
          if (quad.every(v => v !== -1)) {
            if (v0) indices.push(quad[0], quad[1], quad[2], quad[0], quad[2], quad[3]);
            else indices.push(quad[0], quad[2], quad[1], quad[0], quad[3], quad[2]);
          }
        }
      }
    }
  }

  const posArray = new Float32Array(positions);
  const indexArray = (positions.length / 3) > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
  return { positions: posArray, indices: indexArray, zRange: { min: -6, max: 6 } };
}
