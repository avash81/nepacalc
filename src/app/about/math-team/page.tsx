import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NepaCalc Mathematics Team | Experts Behind the Tools',
  description: 'Meet the engineering and applied mathematics review team responsible for verifying the accuracy of NepaCalc\'s calculators.',
};

export default function MathTeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-[#202124] mb-6">NepaCalc Mathematics Team</h1>
      <p className="text-lg text-[#5F6368] mb-8 leading-relaxed">
        The NepaCalc Mathematics Team is a dedicated group of engineers, mathematicians, and software developers who ensure that every tool on our platform is mathematically sound, pedagogically clear, and computationally optimized.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#202124] mb-6">Our Mission</h2>
        <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-6 rounded-r-xl shadow-sm">
          <p className="text-[#202124] font-medium leading-relaxed italic">
            "To bridge the gap between complex mathematics and accessible digital tools, providing students and professionals with calculators they can trust implicitly."
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#202124] mb-6">Areas of Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Applied Mathematics</h3>
            <p className="text-[#5F6368] text-sm">Focusing on numerical methods, multivariable calculus, and linear algebra verification.</p>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Engineering Computation</h3>
            <p className="text-[#5F6368] text-sm">Ensuring structural, fluid, and thermodynamics formulas meet real-world engineering standards.</p>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Scientific Visualization</h3>
            <p className="text-[#5F6368] text-sm">Developing interactive WebGL tools like the 3D Graph Calculator for accurate spatial representation.</p>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1967D2] text-lg mb-2">Financial Mathematics</h3>
            <p className="text-[#5F6368] text-sm">Verifying Nepal-specific tax calculations, EMI logic, and actuarial models.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#E8F0FE] border border-[#1967D2] rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#202124] mb-2">Our Editorial Standards</h2>
        <p className="text-[#5F6368] leading-relaxed mb-4">
          Every tool is subjected to peer review before deployment. You can learn more about how we verify our formulas and maintain our high standards of accuracy on our dedicated policy page.
        </p>
        <Link href="/about/editorial-policy" className="inline-block bg-[#1967D2] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Read Our Editorial Policy
        </Link>
      </section>
    </div>
  );
}
