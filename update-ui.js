const fs = require('fs');
let file = fs.readFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', 'utf8');

file = file.replace(/const worker = new Worker\(new URL\('\.\.\/\.\.\/workers\/graphWorker', import\.meta\.url\), \{ type: 'module' \}\);/g, "const worker = new Worker('/workers/graphWorker.js');");

file = file.replace(/<button onClick=\{\(\) => window\.history\.back\(\)\}/g, '<button aria-label="Go Back" onClick={() => window.history.back()}');
file = file.replace(/<button onClick=\{\(\) => addGraph\('z = 0'\)\}/g, '<button aria-label="Add Graph" onClick={() => addGraph(\'z = 0\')}');
file = file.replace(/<button onClick=\{\(\) => updateGraph\(g\.id, \{ visible: !g\.visible \}\)\}/g, '<button aria-label="Toggle Visibility" onClick={() => updateGraph(g.id, { visible: !g.visible })}');
file = file.replace(/<button onClick=\{\(\) => setGraphs\(graphs\.filter\(x => x\.id !== g\.id\)\)\}/g, '<button aria-label="Delete Graph" onClick={() => setGraphs(graphs.filter(x => x.id !== g.id))}');
file = file.replace(/<button onClick=\{\(\) => setParams\(\[\.\.\.params,/g, '<button aria-label="Add Parameter" onClick={() => setParams([...params,');
file = file.replace(/<button onClick=\{\(\) => setGlobalWireframe\(false\)\}/g, '<button aria-label="Solid Mode" onClick={() => setGlobalWireframe(false)}');
file = file.replace(/<button onClick=\{\(\) => setGlobalWireframe\(true\)\}/g, '<button aria-label="Wireframe Mode" onClick={() => setGlobalWireframe(true)}');
file = file.replace(/<button onClick=\{\(\) => \{\s*setIsOrthographic\(false\);/g, '<button aria-label="Perspective View" onClick={() => { setIsOrthographic(false);');
file = file.replace(/<button onClick=\{\(\) => \{\s*setIsOrthographic\(true\);/g, '<button aria-label="Orthographic View" onClick={() => { setIsOrthographic(true);');
file = file.replace(/<button onClick=\{\(\) => controlsRef\.current\?\.setLookAt\(0, 0, 30,/g, '<button aria-label="Top View" onClick={() => controlsRef.current?.setLookAt(0, 0, 30,');
file = file.replace(/<button onClick=\{\(\) => controlsRef\.current\?\.setLookAt\(0, 30, 0,/g, '<button aria-label="Front View" onClick={() => controlsRef.current?.setLookAt(0, 30, 0,');
file = file.replace(/<button onClick=\{\(\) => setActiveInputId\(null\)\}/g, '<button aria-label="Close Keyboard" onClick={() => setActiveInputId(null)}');

file = file.replace(/<button\s+key=\{p\.name\}/g, '<button aria-label={p.name} key={p.name}');

fs.writeFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', file);
