const fs = require('fs');

// --- 1. Fix En-dash in page.tsx ---
const pagePath = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Replace all instances of " – " with " " (space), or just "–" with ""
pageContent = pageContent.replace(/ – /g, ' ');
pageContent = pageContent.replace(/–/g, ' '); // Catch any remaining without spaces

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Fixed page.tsx en-dashes');

// --- 2. Fix ThreeDCalculatorClient.tsx ---
const clientPath = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/components/calculators/ThreeDCalculatorClient.tsx';
let clientContent = fs.readFileSync(clientPath, 'utf8');

// A. Add fullscreen state
if (!clientContent.includes('isFullscreen')) {
    const stateHookStr = `const [useRadians, setUseRadians] = useState(true);`;
    clientContent = clientContent.replace(
        stateHookStr, 
        `${stateHookStr}
    const [isFullscreen, setIsFullscreen] = useState(false);
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
          console.error(\`Error attempting to enable fullscreen: \${err.message}\`);
        });
      } else {
        document.exitFullscreen();
      }
    };`
    );
}

// B. Attach ref to the main viewport container and update class for fullscreen
const containerFind = `<div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm flex flex-col h-[650px]">`;
const containerReplace = `<div ref={fullscreenContainerRef} className={\`bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm flex flex-col \${isFullscreen ? 'fixed inset-0 z-[100] w-screen h-screen' : 'h-[650px]'}\`}>`;
clientContent = clientContent.replace(containerFind, containerReplace);

// C. Update the Maximize button to trigger toggleFullscreen
const maximizeFind = `<Maximize className="w-4 h-4 cursor-pointer hover:text-blue-600" />`;
const maximizeReplace = `<Maximize className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={toggleFullscreen} />`;
// Only replace the first one (the one in the header)
clientContent = clientContent.replace(maximizeFind, maximizeReplace);

// D. Add makeDefault to CameraControls to fix centering/resizing issues
const cameraFind = `<CameraControls ref={controlsRef} />`;
const cameraReplace = `<CameraControls ref={controlsRef} makeDefault />`;
clientContent = clientContent.replace(cameraFind, cameraReplace);

// E. Ensure perspective camera handles resize correctly (Canvas should do this, but make sure the tag is clean)
// the tag is <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={32} /> which is fine.

fs.writeFileSync(clientPath, clientContent, 'utf8');
console.log('Fixed ThreeDCalculatorClient.tsx layout and fullscreen');
