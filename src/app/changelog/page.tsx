import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog & Updates | NepaCalc',
  description: 'Track all recent updates, new tools, formula corrections, and features across the NepaCalc platform.',
};

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-[#202124] mb-6">Changelog & Updates</h1>
      <p className="text-lg text-[#5F6368] mb-8 leading-relaxed">
        Stay up-to-date with the latest improvements across NepaCalc. We frequently update our calculators, add new features, and refine mathematical models to ensure maximum accuracy and performance.
      </p>

      <div className="space-y-8">
        
        {/* Version 1.0 */}
        <div className="relative pl-8 border-l-2 border-[#1967D2]">
          <div className="absolute w-4 h-4 bg-[#1967D2] rounded-full -left-[9px] top-1"></div>
          <h2 className="text-2xl font-bold text-[#202124] mb-1">June 2026</h2>
          <p className="text-[#1967D2] font-semibold text-sm mb-4 uppercase tracking-wider">Major Pillar Update: 3D Graph Calculator</p>
          
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#202124] text-lg mb-3">3D Graph Calculator v1.0 Released</h3>
            <ul className="list-disc pl-5 space-y-2 text-[#5F6368]">
              <li><strong>New Tool:</strong> Launched the highly anticipated <Link href="/engineering/3d" className="text-[#1967D2] hover:underline">3D Graph Calculator</Link>.</li>
              <li><strong>WebGL Rendering:</strong> Implemented hardware-accelerated 3D rendering for smooth orbit controls and zooming.</li>
              <li><strong>Implicit Surfaces:</strong> Added support for complex implicit equations and parametric surfaces.</li>
              <li><strong>SEO & E-E-A-T:</strong> Introduced the massive educational pillar page featuring AI-optimized definitions, a comprehensive Surface Library, and verified mathematical references (Wolfram, MIT, NIST).</li>
              <li><strong>Authority Pages:</strong> Published the <Link href="/about/editorial-policy" className="text-[#1967D2] hover:underline">Editorial Policy</Link> and <Link href="/about/math-team" className="text-[#1967D2] hover:underline">Mathematics Team</Link> profiles to solidify trust.</li>
            </ul>
          </div>
        </div>

        {/* Older Updates placeholder */}
        <div className="relative pl-8 border-l-2 border-[#DADCE0]">
          <div className="absolute w-4 h-4 bg-[#DADCE0] rounded-full -left-[9px] top-1"></div>
          <h2 className="text-2xl font-bold text-[#202124] mb-1">Early 2026</h2>
          <p className="text-[#5F6368] font-semibold text-sm mb-4 uppercase tracking-wider">Platform Optimization</p>
          
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#202124] text-lg mb-3">Core Upgrades</h3>
            <ul className="list-disc pl-5 space-y-2 text-[#5F6368]">
              <li>Updated Next.js infrastructure for significantly faster page loads.</li>
              <li>Refined the UI/UX across all mobile devices.</li>
              <li>Upgraded the Scientific Calculator with a dedicated degrees/radians toggle.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
