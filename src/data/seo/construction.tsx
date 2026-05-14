import React from 'react';
import { SEOContent } from './types';

export const constructionSEO: Record<string, SEOContent> = {
  'concrete-mix': {
    title: "Concrete Mix Calculator | M20, M25 Cement, Sand & Aggregate Estimator",
    description: "Calculate cement bags, sand volume, and aggregate requirements for your construction project in Nepal. Accurate mix ratios for slabs, beams, and columns.",
    
    howToUse: {
      steps: [
        "1. Structure Definition: Select the component type (Slab, Column, Beam, or Foundation) to define the geometric constraints.",
        "2. Dimension Entry: Input the length, width, and thickness/height of the structural member in meters or feet.",
        "3. Mix Grade Calibration: Choose the concrete grade (M5, M10, M15, M20, M25) based on structural load requirements in Nepal.",
        "4. Wastage Buffer: Apply a standard wastage factor (typically 5% to 10%) to account for spills and formwork seepage.",
        "5. Component Breakdown: View the exact number of Cement bags (50kg), Sand volume (Cu.Ft), and Aggregate (Cu.Ft) required.",
        "6. Water-Cement Ratio Sync: Check the required water volume for optimal hydration without compromising strength.",
        "7. Unit Conversion: Toggle between Metric (m³) and Imperial (ft³) for local procurement parity.",
        "8. Result Check: Verify the total volumetric requirement against your bill of quantities (BOQ)."
      ]
    },
    
    formula: {
      title: "Concrete Mix Ratio Formula",
      description: "Concrete volume calculation accounts for the dry-to-wet shrinkage factor, which is standardly taken as 1.54 in civil engineering.",
      raw: "Dry Volume = Wet Volume × 1.54 | Component = (Ratio / Total Ratio) × Dry Volume",
      variables: [
        "Wet Volume: The physical dimensions of the structure.",
        "1.54: The constant representing the void ratio and shrinkage when mixing dry components with water.",
        "Ratio: The specific parts of cement, sand, and stone (e.g., 1:1.5:3 for M20)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-slate-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Everything You Need to Know About Concrete Mix
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Concrete is the literal foundation of modern infrastructure. From residential housing in Kathmandu to large-scale hydropower projects, the ability to accurately audit <strong>Concrete Mix Proportions</strong> is an standard requirement for structural safety. In <strong>FY Current Year</strong>, adherence to international building codes (IS 456) has become a mandatory compliance for municipal building approvals in Nepal. This <a href="/calculator/concrete-mix/" className="text-slate-600 hover:text-slate-900 underline font-semibold transition-colors">Concrete Tool</a> provides a high-precision engine for calculating the exact ratio of cement, sand, and aggregate. By utilizing the 1.54 dry-volume constant, we eliminate the procurement errors that lead to weak structures or excessive material waste. Whether you are casting a roof slab or a retaining wall, volumetric precision is the primary calculator of construction quality.
        </p>
        </div>
        {/* ==========================================
        SECTION 2: GRADE TAXONOMY
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Concrete Grades and Their Uses
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The 'M' in M20 stands for 'Mix', and the number represents the characteristic compressive strength in N/mm² after 28 days of curing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-xs font-black uppercase text-blue-600 mb-2">M15 (1:2:4) </h4>
        <p className="text-[10px] text-slate-500">Standard for flooring and PCC (Plain Cement Concrete where structural load is minimal.</p>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-xs font-black uppercase text-green-600 mb-2">M20 (1:1.5:3) </h4>
        <p className="text-[10px] text-slate-500">The most common grade for residential slabs and beams in Nepal's urban housing.</p>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm"><h4 className="text-xs font-black uppercase text-red-600 mb-2">M25 (1:1:2) </h4>
        <p className="text-[10px] text-slate-500">High-strength mix for columns and heavy structural members in commercial buildings.</p></div>
        </div>
        </div>
        
        
        </section>
        {/* ==========================================
        SECTION 3: PROCUREMENT STRATEGY
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-slate-400">🏗️</span> Calculating Dry Volume vs Wet Volume
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        One of the most common mistakes in site auditing is ordering material based on the 'wet volume' (the physical space to be filled) . Because dry materials like cement and sand contain air pockets, they shrink when mixed with water. Our <a href="/calculator/concrete-mix/" className="text-slate-400 underline font-bold">Concrete Calculator</a> applies the standard <strong>1.54 Dry Factor</strong> to ensure your material order is sufficient.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-slate-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Cement Check:</strong> Calculated in 50kg bags. Ensure you verify the 'OPC' vs 'PPC' type for your specific curing timeline.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-slate-500/20 border border-slate-500/40 flex items-center justify-center text-slate-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Sand Quality:</strong> River sand vs. Crushed sand. Volume is calculated in Cubic Feet (CFT for easy local procurement.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Standard Advice</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "In the high-seismic zones of Nepal, never compromise on the water-cement ratio. Excessive water makes the concrete easier to pour but significantly reduces the ultimate load-bearing capacity. Check your mix design in our <a href="/calculator/scientific-calculator/" className="text-slate-400 underline font-bold">Scientific Tool</a> for high-precision water volume."
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: KNOWLEDGE CARDS
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Construction Insights Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-slate-500">📉</span> Curing Dynamics
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Concrete achieves 70% strength in 7 days and 99% in 28 days. Proper water curing is an standard requirement to prevent thermal cracking.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📐</span> Formwork Check
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Before pouring, audit your shuttering for leaks. Even small gaps can lead to 'honeycombing', significantly weakening the structural member.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-emerald-500">🛡️</span> Rebar Sync
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Concrete provides compressive strength while steel rebar provides tensile strength. Ensure the 'Clear Cover' is maintained as per NBC guidelines.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: FAQ AUDIT
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Check: Last updated Baishakh 2083 (May 2026 . Calculations adhere to IS 456:2000 and Nepal National Building Code (NBC) structural standards.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "How much cement is needed for M20 concrete?", answer: "For 1 cubic meter of M20 (1:1.5:3) concrete, you typically need approx 8.1 bags of cement, 15 cu.ft of sand, and 30 cu.ft of stone aggregate." },
      { question: "What is the 1.54 factor in concrete calculation?", answer: "It is the dry volume coefficient. It accounts for the volume reduction when dry ingredients (cement, sand, stone) are mixed with water and compacted." },
      { question: "What is the standard ratio for residential slabs in Nepal?", answer: "The standard standard ratio for residential slabs is M20 (1 part Cement : 1.5 parts Sand : 3 parts Stone Aggregate)." },
      { question: "How do I calculate the volume of a concrete column?", answer: "Multiply the cross-sectional area (Length x Width) by the Height of the column: Volume = L x W x H." },
      { question: "How many bags of cement are in 1 cubic meter?", answer: "It depends on the mix grade. For M20, it is approx 8 bags; for M25, it is approx 10-11 bags per m³." },
      { question: "Why does concrete crack?", answer: "Common causes include excessive water in the mix, rapid drying (poor curing), or insufficient structural support during the setting phase." }
    ]
  },
  'brick-calculator': {
    title: "Brick Calculator | Wall Material & Mortar Calculator",
    description: "Standard resource for estimating brick count and mortar volume. Calculate bricks for 4-inch and 9-inch walls with local Nepal brick dimensions. 1500+ words.",
    
    howToUse: {
      steps: [
        "1. Wall Configuration: Select the wall thickness (Standard 9-inch load-bearing or 4-inch partition wall).",
        "2. Dimension Entry: Input the length and height of the wall in feet or meters.",
        "3. Opening Deduction: Subtract the area of windows, doors, and lintels to find the net masonry area.",
        "4. Brick Dimension Calibration: Use standard Nepali brick sizes (typically 9\" x 4.5\" x 2.25\") or custom blocks.",
        "5. Mortar Ratio Sync: Define the cement-sand ratio (e.g., 1:4 or 1:6) for the joining mortar.",
        "6. Wastage Calibration: Add a 5% buffer for breakage and site handling losses.",
        "7. Component Breakdown: View the total Brick count, Cement bags, and Sand volume required for the project.",
        "8. Result Check: Verify the procurement list against your site inventory to prevent stock-outs."
      ]
    },
    
    formula: {
      title: "The Masonry Volumetric Principle",
      description: "Brick estimation accounts for the physical volume of the brick plus the 10mm (0.5 inch) mortar joints on all sides.",
      raw: "Number of Bricks = (Wall Volume) / (Volume of 1 Brick with Mortar)",
      variables: [
        "Wall Volume: L x H x Thickness (minus openings).",
        "Mortar Joint: Standard 10mm or 12mm thick bed of cement-sand mix.",
        "Nepali Brick Size: 230mm x 110mm x 55mm (Standard)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-orange-50/50 border-l-4 border-orange-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-orange-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Masonry Insights Overview
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Brick masonry remains the primary structural and aesthetic medium for residential development in Nepal. From the iconic red-brick facades of Lalitpur to the reinforced partition walls of Kathmandu apartments, auditing <strong>Material Volume</strong> is an standard requirement for fiscal discipline. In <strong>FY Current Year</strong>, rising material costs in the Terai and Hilly regions make precision auditing more critical than ever. This <a href="/calculator/brick-calculator/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Brick Calculator</a> provides a high-precision engine for calculating the exact number of bricks and mortar components required. By utilizing local dimensional standards, we eliminate the 'Procurement Gap' that leads to project delays and unnecessary logistics costs.
        </p>
        </div>
        {/* ==========================================
        SECTION 2: WALL TAXONOMY
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Wall Classification: Auditing Load vs. Partition
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In Nepal's National Building Code (NBC brick walls are categorized by their thickness and functional role in the structure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-sm font-black uppercase text-orange-600 mb-4">9-Inch Wall (Full Brick </h4>
        <p className="text-xs text-slate-600 leading-relaxed">Used for exterior boundaries and load-bearing structures. These walls provide better thermal insulation and sound dampening. Our engine calculates approx 10.5 bricks per square foot for this thickness.</p>
        </div>
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <h4 className="text-sm font-black uppercase text-amber-600 mb-4">4-Inch Wall (Half Brick </h4>
        <p className="text-xs text-slate-600 leading-relaxed">Standard for interior partition walls. They save space and reduce the total dead-load on the RCC frame. The calculator estimates approx 5.25 bricks per square foot for these segments.</p>
        </div>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: MORTAR AUDIT
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-orange-400">🧱</span> The Mortar Principle: Binding the Structure
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Bricks only provide strength when bonded with a high-quality mortar mix. In Nepal, a <strong>1:4</strong> or <strong>1:6</strong> (Cement:Sand ratio) is the standard standard for masonry work. This <a href="/calculator/brick-calculator/" className="text-orange-400 underline font-bold">Masonry Tool</a> calculates the dry volume of mortar required per 1000 bricks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Joinery Check:</strong> 10mm to 12mm mortar joints are essential for structural flexibility during minor seismic tremors.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Sand Bulking:</strong> Account for sand moisture which can affect the final volume. Always audit your sand in dry CFT units.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
        <h4 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-3">Standard Advice</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "For superior finish and structural bonding, always 'Drench' your bricks in water before laying. Dry bricks will suck the moisture out of the mortar, leading to brittle joints and structural cracks. For plastering requirements, synchronize your wall area with our <a href="/calculator/paint-cost/" className="text-orange-400 underline font-bold">Paint Tool</a>."
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: KNOWLEDGE CARDS
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Masonry Insights Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-orange-500">📉</span> Frogs & Bonds
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The indentation on a brick is called a 'Frog'. It should always face upwards during laying to create a 'Key' for the mortar, ensuring standard bonding strength.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📐</span> The English Bond
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The strongest masonry bond used in Nepal. It consists of alternating layers of 'Headers' and 'Stretchers'. Our calculator accounts for this volumetric complexity.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-emerald-500">🛡️</span> Seismic Bands
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Masonry walls must be anchored with horizontal RCC bands at the sill and lintel levels. Check these voids using the 'Opening Deduction' feature in our engine.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: FAQ AUDIT
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Check: Last updated June 2083 (June 2026) . Calculations are based on standard Nepali brick dimensions (9" x 4.5" x 2.25" and standard mortar volumes.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "How many bricks are in a 9-inch wall per square foot?", answer: "In Nepal, a standard 9-inch wall requires approx 10.5 to 11 bricks per square foot of wall area." },
      { question: "What is the standard size of a brick in Nepal?", answer: "The standard standard size is 9 inches (length) x 4.5 inches (width) x 2.25 inches (height), though local kiln variations exist." },
      { question: "How much cement is needed for 1000 bricks?", answer: "For 1000 bricks in a 1:6 mix mortar, you typically require approx 3 bags of cement and 20-22 cu.ft of sand." },
      { question: "How do I calculate bricks for a 4-inch wall?", answer: "A 4-inch wall uses roughly half the bricks of a 9-inch wall, approx 5 to 5.5 bricks per square foot." },
      { question: "Do I need to deduct windows from my brick count?", answer: "Yes. Our calculator allows you to subtract the square footage of doors and windows to prevent over-ordering materials." },
      { question: "What is the best mortar ratio for brickwork?", answer: "A 1:6 (Cement:Sand) ratio is common for non-load bearing walls, while 1:4 is recommended for load-bearing or exterior boundary walls." }
    ]
  }
};
