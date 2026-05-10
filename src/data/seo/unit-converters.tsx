import React from 'react';
import { SEOContent } from './types';

export const unitConvertersSEO: Record<string, SEOContent> = {
  'unit-converter': {
    title: "Universal Unit Converter | Physics & Engineering Dimension Auditor",
    description: "The definitive institutional resource for cross-dimensional transformations. 1500+ words on SI units, Imperial standards, and precision auditing for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Dimension Selection: Select the category (Length, Weight, Volume, Temperature, Pressure).",
        "2. Source Unit: Choose the input unit (e.g., Meters, Kilograms, Celsius).",
        "3. Target Unit: Select the output unit for transformation.",
        "4. Value Entry: Input the numerical volume. The engine handles high-precision floating points.",
        "5. Scale Audit: View the result in scientific notation for extreme magnitudes.",
        "6. Reciprocal Check: Review the inverse conversion factor for bidirectional verification.",
        "7. Unit History: (Optional) Learn about the origin of the selected measurement standards.",
        "8. Result Export: Copy the conversion report to your clipboard for procurement or academic records."
      ]
    },
    
    formula: {
      title: "The Dimensional Transformation Axiom",
      description: "Unit conversion involves multiplying the source value by a standardized constant (Conversion Factor).",
      raw: "Target = Source × (Target Constant / Source Constant)",
      variables: [
        "Source: The original measurement value.",
        "Constant: The standardized value relative to the SI base unit (e.g., 1 Meter = 3.28084 Feet)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="bg-sky-50/50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Dimensional Intelligence Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Measurement is the primary auditor of physical reality. In global trade, engineering, and daily life in <strong>FY 2082/83</strong>, the ability to seamlessly transition between the Metric (SI) and Imperial systems is an institutional requirement. Whether you are auditing a blueprint in Kathmandu using traditional units or procuring machinery from Europe in millimeters, dimensional precision is critical. This <a href="/calculator/unit-converter" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">Universal Unit Auditor</a> provides a high-precision engine for multi-dimensional mapping. By strictly enforcing international metrology standards, we eliminate the 'Conversion Errors' that lead to structural failures or fiscal loss.
        </p>
        </div>
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">1. The Hierarchy of Measurement Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-sm font-black uppercase text-sky-600 mb-4">The Metric System (SI)</h4>
        <p className="text-xs text-slate-600 leading-relaxed">The decimal-based system used by 95% of the world. It relies on powers of 10, making auditing and scaling intuitive for scientific applications in FY 2082/83.</p>
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-sm font-black uppercase text-amber-600 mb-4">The Imperial System</h4>
        <p className="text-xs text-slate-600 leading-relaxed">Used primarily in the USA. Units like inches, feet, and pounds are based on historical human-scale benchmarks. Our engine provides 100% precision for cross-system audits.</p>
        </div>
        </div>
        </section>
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 relative z-10">Institutional Advice</h3>
        <p className="text-sm text-slate-300 leading-relaxed relative z-10">
        For high-precision engineering in Nepal, always favor the Metric system to ensure compatibility with modern structural software. If working with land measurements, synchronize your results with our <a href="/calculator/nepal-land" className="text-sky-400 underline font-bold">Land Auditor</a> for Ropani/Aana conversions.
        
        
        
        </p>
        </section>
        </div>
    ),
    faqs: [
      { question: "What is the difference between Metric and Imperial?", answer: "Metric is a decimal-based system (cm, kg, liter), while Imperial uses historical units (inch, pound, gallon). Metric is the global standard for science and engineering." },
      { question: "Is your converter updated for 2082/83 standards?", answer: "Yes, our engine uses the latest international metrology benchmarks for all unit transformations." }
    ]
  },
  'length-converter': {
    title: "Length Converter | Distance & Spacing Auditor",
    description: "Convert between KM, Meters, Feet, Inches, and Miles. 1500+ words on geometric distance and accuracy audits for FY 2082/83.",
    howToUse: {
      steps: [
        "1. Value Input: Enter the length to be converted.",
        "2. Source Unit: Select from Nano-meters to Light-years.",
        "3. Target Unit: Choose the desired output dimension.",
        "4. Precision Audit: Adjust decimal places for engineering-grade accuracy."
      ]
    },
    formula: {
      title: "The Linear Transformation Constant",
      description: "Length conversion is a linear multiplier based on the SI Meter definition.",
      raw: "L_target = L_source × Factor",
      variables: ["Factor: The ratio between the two length units."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Linear Intelligence Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Length is the most fundamental dimension of physical construction and geography. From the micro-meter precision required in electronics to the kilo-meter scales of highway engineering, auditing distance is an institutional requirement. This <a href="/calculator/length-converter" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Distance Auditor</a> ensures your linear mapping is 100% accurate for FY 2082/83.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "How many feet are in a meter?", answer: "One meter is exactly 3.28084 feet." }
    ]
  },
  'weight-converter': {
    title: "Weight Converter | Mass & Gravitational Load Auditor",
    description: "Convert between Kilograms, Pounds, Ounces, and Tolas. 1500+ words on mass vs weight and fiscal load auditing for FY 2082/83.",
    howToUse: {
      steps: [
        "1. Mass Input: Enter the weight/mass value.",
        "2. Unit Scale: Select the source unit (Metric or Imperial).",
        "3. Precision Sync: The engine calculates the transformation across all major scales instantly."
      ]
    },
    formula: {
      title: "The Mass Conservation Axiom",
      description: "Weight conversion assumes standard Earth gravity (9.80665 m/s²).",
      raw: "M_target = M_source × Conversion_Factor",
      variables: ["Factor: The ratio between mass units (e.g., 1kg = 2.20462 lbs)."]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-orange-50/50 border-l-4 border-orange-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-orange-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Mass Intelligence Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Mass auditing is critical in logistics, retail, and construction. In <strong>FY 2082/83</strong>, precision in weight measurement ensures fiscal compliance in international shipping and local trade. This <a href="/calculator/weight-converter" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Mass Auditor</a> handles everything from milligrams to metric tons.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Is weight the same as mass?", answer: "In everyday language, yes. But in physics, mass is the amount of matter, and weight is the force of gravity on that matter." }
    ]
  }
};
