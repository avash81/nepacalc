import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Sources & Methodology | NepaCalc',
  description: 'Learn about the official data sources, methodology, and update frequency behind NepaCalc’s financial, tax, and market rate calculators.',
  alternates: {
    canonical: 'https://nepacalc.com/data-policy/',
  }
};

export default function DataPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Data Sources & Methodology</h1>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            At NepaCalc, accuracy and transparency are our highest priorities. This document outlines the official sources, updating frequency, and mathematical methodologies that power our specialized calculators.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" /> Official Data Sources
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Our financial, taxation, and utility calculators rely on data published by authoritative bodies in Nepal. We regularly verify our constants and algorithms against official circulars from:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Inland Revenue Department (IRD)', desc: 'Income tax slabs, TDS rates, and tax exemptions.' },
                { name: 'Nepal Rastra Bank (NRB)', desc: 'Foreign exchange rates, policy rates, and banking regulations.' },
                { name: 'Nepal Electricity Authority (NEA)', desc: 'Domestic and commercial electricity tariff structures.' },
                { name: 'Nepal Stock Exchange (NEPSE)', desc: 'Capital gains tax rates and broker commission structures.' },
                { name: 'FENEGOSIDA', desc: 'Daily gold and silver benchmark prices.' }
              ].map((source, idx) => (
                <li key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800 mb-1">{source.name}</div>
                  <div className="text-sm text-slate-500">{source.desc}</div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Update Frequency</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Data Type</th>
                    <th className="px-4 py-3">Update Schedule</th>
                    <th className="px-4 py-3">Source Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800">Gold & Silver Rates</td>
                    <td className="px-4 py-3 text-slate-600">Daily (11:00 AM NPT)</td>
                    <td className="px-4 py-3 text-slate-500">Official FENEGOSIDA releases</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800">Exchange Rates</td>
                    <td className="px-4 py-3 text-slate-600">Daily</td>
                    <td className="px-4 py-3 text-slate-500">NRB Reference Rates</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800">Income Tax Slabs</td>
                    <td className="px-4 py-3 text-slate-600">Annually</td>
                    <td className="px-4 py-3 text-slate-500">Federal Budget (Jestha 15)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800">NEA Tariffs</td>
                    <td className="px-4 py-3 text-slate-600">As announced</td>
                    <td className="px-4 py-3 text-slate-500">ERC / NEA Tariff notices</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Mathematical Methodology</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Our engineering, scientific, and health calculators utilize standard, peer-reviewed mathematical formulas.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed"><strong>Financial Mathematics:</strong> Standard Time Value of Money (TVM) algorithms are used for SIP and EMI calculations, adhering to compounding standards utilized by Nepalese commercial banks.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed"><strong>Scientific Precision:</strong> Our JavaScript evaluation engine utilizes IEEE 754 double-precision floating-point arithmetic. High-precision libraries are leveraged for large matrix operations and complex calculus.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed"><strong>Health Calculations:</strong> Tools like BMI and Calorie calculators follow guidelines established by the World Health Organization (WHO) and the US Centers for Disease Control and Prevention (CDC).</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Disclaimer</h2>
            <p className="text-slate-600 leading-relaxed">
              While we strive for 100% accuracy, NepaCalc is an informational platform. Calculated results should be used for reference and planning purposes only. We recommend consulting with certified financial planners, tax consultants, or relevant professionals before making significant financial or engineering decisions. For more details, please read our <Link href="/disclaimer/" className="text-blue-600 hover:underline">full disclaimer</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
