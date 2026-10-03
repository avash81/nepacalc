import re

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the single useEffect with two useEffects and a useRef
old_effect = '''  useEffect(() => {
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
  }, [id, equation, resolution, params, isImplicit, useRadians]);'''

new_effect = '''  const workerRef = useRef<Worker | null>(null);

  // Initialize worker exactly once per mesh
  useEffect(() => {
    workerRef.current = new Worker('/workers/graphWorker.js');
    workerRef.current.onmessage = (e) => {
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
    return () => {
      workerRef.current?.terminate();
    };
  }, [id]); // Only recreate if component ID changes

  // Trigger updates without destroying the worker
  useEffect(() => {
    const timer = setTimeout(() => {
      if (workerRef.current) {
        workerRef.current.postMessage({
          id,
          type: isImplicit ? 'implicit' : 'explicit',
          equation,
          resolution,
          params,
          useRadians
        });
      }
    }, 50); // Much faster response time (50ms instead of 300ms)

    return () => clearTimeout(timer);
  }, [id, equation, resolution, params, isImplicit, useRadians]);'''

content = content.replace(old_effect.replace('\n', '\r\n'), new_effect.replace('\n', '\r\n'))
content = content.replace(old_effect, new_effect) # Just in case

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
