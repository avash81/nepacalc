import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy & Accuracy Commitment | NepaCalc',
  description: 'Learn about NepaCalc\'s rigorous editorial policy, formula verification process, and commitment to mathematical accuracy.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-[#202124] mb-6">Editorial Policy & Accuracy Commitment</h1>
      <p className="text-lg text-[#5F6368] mb-8 leading-relaxed">
        At NepaCalc, we believe that mathematical tools must be precise, reliable, and transparent. Our Editorial Policy outlines how we verify formulas, review content, and maintain the highest standards of accuracy for our calculators and educational resources.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#202124] mb-4">1. Formula Verification Process</h2>
        <p className="text-[#5F6368] mb-4 leading-relaxed">
          Every calculator on NepaCalc undergoes a rigorous verification process before publication. We source our formulas exclusively from recognized, authoritative mathematical references, such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#5F6368]">
          <li><strong>Wolfram MathWorld</strong> for advanced geometry and calculus.</li>
          <li><strong>MIT OpenCourseWare</strong> for engineering and applied mathematics.</li>
          <li><strong>NIST (National Institute of Standards and Technology)</strong> for unit conversions and physical constants.</li>
          <li><strong>ISO/IEC Standards</strong> for specialized engineering and financial metrics.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#202124] mb-4">2. The Review Process</h2>
        <p className="text-[#5F6368] mb-4 leading-relaxed">
          All tools and accompanying educational content are thoroughly evaluated by the <Link href="/about/math-team" className="text-[#1967D2] hover:underline font-medium">NepaCalc Mathematics Team</Link>. Our review process includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#5F6368]">
          <li><strong>Mathematical Audits:</strong> Checking formulas against edge cases, limits, and undefined domains.</li>
          <li><strong>Code Verification:</strong> Ensuring that the underlying JavaScript or WebGL code precisely executes the mathematical formulas without floating-point errors.</li>
          <li><strong>Peer Review:</strong> Multiple team members review complex tools (like the 3D Graph Calculator) to ensure pedagogical clarity and correctness.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#202124] mb-4">3. Update & Correction Policy</h2>
        <p className="text-[#5F6368] mb-4 leading-relaxed">
          Mathematics doesn't change, but best practices in computation and education do. We regularly audit our tools to improve performance and user experience. 
        </p>
        <p className="text-[#5F6368] mb-4 leading-relaxed">
          If a user reports an error or if we discover a discrepancy, our team will:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#5F6368]">
          <li>Investigate the issue within 48 hours.</li>
          <li>Deploy a patch immediately if a calculation error is confirmed.</li>
          <li>Document the change in our <Link href="/changelog" className="text-[#1967D2] hover:underline font-medium">Public Changelog</Link>.</li>
        </ul>
      </section>

      <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#202124] mb-2">Our Commitment to You</h2>
        <p className="text-[#5F6368] leading-relaxed">
          We are committed to providing free, accessible, and mathematically sound tools for students, educators, and professionals globally. Trust is earned through accuracy, and we strive to earn your trust with every calculation.
        </p>
      </section>
    </div>
  );
}
