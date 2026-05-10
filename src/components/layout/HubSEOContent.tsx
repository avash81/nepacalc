
import React from 'react';
import Link from 'next/link';

interface HubContentProps {
  category: 'finance' | 'health' | 'nepal' | 'math' | 'utility' | 'engineering' | 'home';
}

export const HubSEOContent: React.FC<HubContentProps> = ({ category }) => {
  const contents = {
    home: (
      <div className="space-y-12 text-[#4d5156] leading-relaxed">
        <section>
          <h2 className="text-3xl font-black text-[#202124] mb-6">The Evolution of Digital Computation in Nepal</h2>
          <p className="mb-6">
            In the rapidly digitizing landscape of 2082 BS, access to precision mathematical tools is no longer a luxury but a fundamental necessity for students, professionals, and entrepreneurs across Nepal. <strong>NepaCalc</strong> was founded on the principle of institutional accuracy—combining high-performance cloud computing with local legislative compliance. Our platform serves as the digital heartbeat for financial auditing, educational excellence, and engineering precision in the Himalayan region.
          </p>
          <p className="mb-6">
            Historically, calculating complex parameters like <strong>Income Tax TDS</strong> or <strong>Loan Amortization</strong> required hours of manual labor or expensive proprietary software. Today, NepaCalc democratizes this data, providing bank-grade algorithms for free. Our 3D Graphing Engine and Scientific Labs are designed to meet the rigorous standards of IOE, TU, and international universities, ensuring that every result delivered is scientifically sound and audit-ready.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 items-center">
            <Link href="/nepal/" className="text-[#1a0dab] font-bold underline">Nepal Specific Tools</Link>
            <Link href="/finance/" className="text-[#1a0dab] font-bold underline">Finance & Tax Hub</Link>
            <Link href="/math-tools/" className="text-[#1a0dab] font-bold underline">Scientific Math Lab</Link>
            <span className="text-slate-300">|</span>
            <a href="https://nepal.gov.np" target="_blank" className="text-[#1a0dab] font-bold underline">Government of Nepal Official Portal</a>
          </div>
        </section>

        <section className="bg-[#f8f9fa] border border-[#dadce0] p-10 rounded-2xl">
          <h3 className="text-2xl font-black text-[#202124] mb-6">Our Triple-Audit Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#1a73e8] mb-2 uppercase tracking-widest text-xs">1. Statutory Sync</h4>
              <p className="text-sm">Our financial engines are synced weekly with the <strong>Inland Revenue Department (IRD)</strong> and <strong>Nepal Rastra Bank (NRB)</strong> directives to ensure 100% compliance with the latest Finance Act.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#1a73e8] mb-2 uppercase tracking-widest text-xs">2. Academic Rigor</h4>
              <p className="text-sm">Educational tools follow the <strong>CDC Nepal</strong> and international math standards, utilizing symbols and logic recognized in the globally accepted scientific community.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#1a73e8] mb-2 uppercase tracking-widest text-xs">3. Privacy First</h4>
              <p className="text-sm">Unlike other platforms, NepaCalc uses local-browser execution. Your sensitive financial data never leaves your device, providing an unmatched layer of security.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-black text-[#202124] mb-6">Empowering the Future of Nepalese Engineering and Finance</h3>
          <p className="mb-6">
            From the bustling markets of New Road to the remote hydroelectric projects in the mountains, NepaCalc is there. Our <strong>Unit Converters</strong> handle traditional Nepalese measurements like <strong>Ropani, Aana, and Bigha</strong> with the same precision as Metric and Imperial systems. This blend of local relevance and global standards is what makes us the #1 calculator platform in Nepal.
          </p>
          <p className="mb-6">
            We are committed to building a mathematically literate Nepal. That is why we provide detailed guides, historical contexts, and "How-To" walkthroughs for every tool. Whether you are a student preparing for SEE/NEB or a CFO managing a million-dollar payroll, NepaCalc is your sovereign partner in computation.
          </p>
        </section>
      </div>
    ),
    finance: (
      <div className="space-y-12 text-[#4d5156] leading-relaxed">
        <section>
          <h2 className="text-3xl font-black text-[#202124] mb-6">Professional Financial Auditing in Nepal: A 2082 BS Perspective</h2>
          <p className="mb-6">
            Financial planning in Nepal has evolved from simple bookkeeping to a complex landscape of progressive taxes, social security contributions, and varying interest rates. The <strong>NepaCalc Finance Hub</strong> is engineered to help you navigate these complexities with bank-grade precision. Our tools are updated annually following the release of the Finance Bill to ensure that every <strong>TDS</strong>, <strong>Income Tax</strong>, and <strong>VAT</strong> calculation is 100% accurate.
          </p>
          <p className="mb-6">
            For individuals, understanding the <strong>Time Value of Money (TVM)</strong> is the first step toward wealth creation. Our <strong>SIP Calculator</strong> and <strong>Compound Interest</strong> modules allow you to visualize the long-term impact of regular savings. For businesses, our <strong>Payroll and SSF</strong> tools simplify monthly compliance, reducing the risk of IRD penalties and late-fee interest.
          </p>
        </section>

        <section className="bg-[#E8F0FE] border border-[#1A73E8]/20 p-10 rounded-2xl">
          <h3 className="text-2xl font-black text-[#1967D2] mb-6">Institutional Compliance & Accuracy</h3>
          <p className="mb-4">We benchmark our financial results against three primary sources:</p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>NRB Directives:</strong> Ensuring loan EMI and interest calculations match the standard reducing balance method used by A, B, and C class banks in Nepal.</li>
            <li><strong>IRD Circulars:</strong> Updating income tax slabs (Married vs. Individual) and specific tax rebates for female and disabled citizens.</li>
            <li><strong>SSF Guidelines:</strong> Strictly following the 31% contribution model for Social Security, including health, accident, and retirement components.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-black text-[#202124] mb-6">Why Trust NepaCalc for Your Tax & Finance?</h3>
          <p className="mb-6">
            Accuracy in finance isn't just about math; it's about context. Our <strong>Loan EMI Calculator</strong> doesn't just give you a number; it provides a full <strong>Amortization Schedule</strong>, showing you exactly how much of your payment goes to principal vs. interest each month. This level of transparency allows you to make informed decisions about pre-payments or loan refinancing.
          </p>
          <p className="mb-6">
            For more information and official verification, we recommend visiting the <a href="https://www.nrb.org.np" target="_blank" className="text-[#1a0dab] underline font-bold">Nepal Rastra Bank</a> for market rates and the <a href="https://www.ird.gov.np" target="_blank" className="text-[#1a0dab] underline font-bold">Inland Revenue Department</a> for tax slabs. NepaCalc is proud to be the leading digital bridge between these official standards and your daily financial planning.
          </p>
        </section>
      </div>
    ),
    health: (
        <div className="space-y-12 text-[#4d5156] leading-relaxed">
          <section>
            <h2 className="text-3xl font-black text-[#202124] mb-6">Scientific Health & Fitness Metrics for the Nepalese Population</h2>
            <p className="mb-6">
              Modern health management is a game of data. Understanding your <strong>Body Mass Index (BMI)</strong>, <strong>Basal Metabolic Rate (BMR)</strong>, and <strong>Caloric Needs</strong> is the foundation of any sustainable fitness journey. At NepaCalc, we utilize World Health Organization (WHO) standards to provide precision medical-grade diagnostics from the comfort of your browser.
            </p>
            <p className="mb-6">
              Fitness in Nepal is unique, with diverse dietary patterns ranging from high-carb mountain diets to sedentary urban lifestyles. Our <strong>Momo Calorie Counter</strong> and <strong>Water Intake</strong> tools are specifically localized to reflect our culture, while our core medical tools maintain absolute scientific neutrality.
            </p>
          </section>
  
          <section className="bg-[#f8f9fa] border border-[#dadce0] p-10 rounded-2xl">
            <h3 className="text-2xl font-black text-[#202124] mb-6">Medical Standard Compliance</h3>
            <p className="mb-4">Our health engines are calibrated against globally recognized physiological markers:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>WHO BMI Scale:</strong> Differentiating between Underweight, Normal, Overweight, and Obese categories for adult populations.</li>
              <li><strong>Harris-Benedict Equation:</strong> Providing the most accurate BMR calculations based on age, gender, weight, and height.</li>
              <li><strong>Gestational Timelines:</strong> Pregnancy calculators that follow standard obstetric cycles for accurate due-date projection.</li>
            </ul>
          </section>
  
          <section>
            <h3 className="text-2xl font-black text-[#202124] mb-6">Empowering Personal Wellness Through Data</h3>
            <p className="mb-6">
              Health isn't just about weight—it's about homeostasis. Our <strong>Sleep Calculator</strong> helps you optimize your REM cycles, while our <strong>Body Fat</strong> module uses the U.S. Navy method for a non-invasive look at your body composition. These tools empower you to have more informed conversations with your doctor or nutritionist.
            </p>
            <p className="mb-6">
              Always consult a medical professional for clinical diagnosis. For general health standards and global initiatives, visit the <a href="https://www.who.int" target="_blank" className="text-[#1a0dab] underline font-bold">World Health Organization (WHO)</a>.
            </p>
          </section>
        </div>
    ),
    nepal: (
        <div className="space-y-12 text-[#4d5156] leading-relaxed">
          <section>
            <h2 className="text-3xl font-black text-[#202124] mb-6">The Ultimate Hub for Local Nepalese Calculations</h2>
            <p className="mb-6">
              Nepal's administrative and cultural systems often require specialized mathematical models that global platforms simply don't offer. The <strong>NepaCalc Nepal Pillar</strong> is our flagship dedication to local needs—covering everything from <strong>Bikram Sambat Date Conversion</strong> to complex <strong>Land Area Calculations in Ropani and Aana</strong>.
            </p>
            <p className="mb-6">
              Whether you are buying land in Terai (Bigha/Kattha) or the Hills (Ropani/Aana), our <strong>Land Converter</strong> is the most trusted tool for Malpot registration and property verification. We bridge the gap between traditional units and modern metric standards with 100% precision.
            </p>
          </section>
  
          <section className="bg-red-50 border border-red-100 p-10 rounded-2xl">
            <h3 className="text-2xl font-black text-red-900 mb-6">Sovereign Data Integrity</h3>
            <p className="mb-4">We specialize in calculations that matter to Nepalese citizens every day:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>NEA & KUKL Billing:</strong> Stay ahead of your utilities with our electricity and water bill calculators synced with current tariff slabs.</li>
              <li><strong>NEPSE Portfolio Lab:</strong> Calculate your stock profit after SEBON commission, DP fees, and capital gains tax (CGT).</li>
              <li><strong>Vehicle Tax & Renewal:</strong> Precise road tax calculations for motorbikes and cars based on current DoTM regulations.</li>
            </ul>
          </section>
  
          <section>
            <h3 className="text-2xl font-black text-[#202124] mb-6">Built for the People, by the People</h3>
            <p className="mb-6">
              NepaCalc isn't just a website; it's a social utility. We understand that filing your <strong>Income Tax</strong> or checking your <strong>SEE GPA</strong> can be stressful. Our mission is to remove that friction by providing clear, step-by-step auditing tools that you can trust.
            </p>
            <p className="mb-6">
              For official government portals, visit the <a href="https://nepal.gov.np" target="_blank" className="text-[#1a0dab] underline font-bold">Government of Nepal Official Portal</a>.
            </p>
          </section>
        </div>
    ),
    math: (
        <div className="space-y-12 text-[#4d5156] leading-relaxed">
          <section>
            <h2 className="text-3xl font-black text-[#202124] mb-6">Advanced Mathematical Engine & Scientific Lab</h2>
            <p className="mb-6">
              Mathematics is the universal language of the universe, and at NepaCalc, we speak it with absolute clarity. Our <strong>Math & Education Lab</strong> provides a comprehensive suite of tools ranging from <strong>Basic Arithmetic</strong> to advanced <strong>Calculus and Matrix Algebra</strong>. Designed for the high-pressure environment of Nepalese engineering colleges and global science programs.
            </p>
            <p className="mb-6">
              Our <strong>3D Surface Plotter</strong> and <strong>Interactive Graphing Engine</strong> allow students to visualize complex functions in real-time, moving beyond static textbook diagrams to a dynamic, intuitive understanding of algebraic and geometric principles.
            </p>
          </section>
  
          <section className="bg-[#f8f9fa] border border-[#dadce0] p-10 rounded-2xl">
            <h3 className="text-2xl font-black text-[#202124] mb-6">Academic Excellence Standards</h3>
            <p className="mb-4">Our mathematical algorithms are based on rigorous computational logic:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Symbolic Algebra:</strong> Solving for variables with exact fractions and radicals rather than just decimal approximations.</li>
              <li><strong>Statistical Variance:</strong> High-precision standard deviation and probability models for academic research.</li>
              <li><strong>GPA/CGPA Mastering:</strong> Specialized grading systems for NEB, SEE, and Semester-based engineering degrees in Nepal.</li>
            </ul>
          </section>
  
          <section>
            <h3 className="text-2xl font-black text-[#202124] mb-6">The Future of STEM Education in Nepal</h3>
            <p className="mb-6">
              We believe that every student in Nepal should have access to a world-class scientific calculator without the $100 price tag. By bringing professional-grade math tools to the web, we are leveling the playing field for the next generation of Nepalese scientists, engineers, and data analysts.
            </p>
            <p className="mb-6">For academic benchmarks, we reference the <a href="https://www.wolframalpha.com" target="_blank" className="text-[#1a0dab] underline font-bold">Wolfram Alpha Computational Engine</a> and the <a href="https://www.moedu.gov.np" target="_blank" className="text-[#1a0dab] underline font-bold">Ministry of Education Nepal</a>.</p>
          </section>
        </div>
    ),
    utility: (
        <div className="space-y-12 text-[#4d5156] leading-relaxed">
          <section>
            <h2 className="text-3xl font-black text-[#202124] mb-6">Universal Unit Converters & Daily Productivity Tools</h2>
            <p className="mb-6">
              In a globalized world, the ability to switch between measurement systems is a daily necessity. The <strong>NepaCalc Converter Hub</strong> is the most comprehensive toolset in Nepal for translating units of <strong>Length, Weight, Data, and Base Numerals</strong>. Whether you're a developer working in Binary or a chef converting grams to pounds, we provide the exact coefficient for a perfect conversion.
            </p>
            <p className="mb-6">
              Our <strong>Age Calculator</strong>, <strong>Discount Tool</strong>, and <strong>Password Generator</strong> are designed for maximum utility with zero friction. No ads, no sign-ups—just high-speed productivity.
            </p>
          </section>
  
          <section className="bg-[#f8f9fa] border border-[#dadce0] p-10 rounded-2xl">
            <h3 className="text-2xl font-black text-[#202124] mb-6">The Accuracy of Standardized Units</h3>
            <p className="mb-4">We maintain absolute fidelity to the International System of Units (SI):</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Metric & Imperial:</strong> Precise mapping between kilograms/pounds, meters/feet, and Celsius/Fahrenheit.</li>
              <li><strong>Cryptographic Randomness:</strong> Our security tools use browser-native entropy to generate uncrackable passwords.</li>
              <li><strong>Date & Time Delta:</strong> Precise duration calculations for legal, financial, and biological planning.</li>
            </ul>
          </section>
          <div className="mt-8">
             <a href="https://www.bipm.org/en/measurement-units" target="_blank" className="text-[#1a0dab] font-bold underline">BIPM International Standards</a>
          </div>
        </div>
    ),
    engineering: (
        <div className="space-y-12 text-[#4d5156] leading-relaxed">
          <section>
            <h2 className="text-3xl font-black text-[#202124] mb-6">Professional Engineering Suite: Civil, Mechanical & Physics</h2>
            <p className="mb-6">
              Engineering is the art of precision, and at NepaCalc, we provide the tools to build the world. Our <strong>Engineering Pillar</strong> is designed for civil engineers, site managers, and physics students who require immediate, reliable data on **Concrete Mixing**, **Brick Counting**, and **Structural Forces**.
            </p>
            <p className="mb-6">
              From calculating the <strong>Molar Mass</strong> of a chemical compound to determining the <strong>Force and Energy</strong> in a mechanical system, our engine handles the complex physics so you can focus on the design.
            </p>
          </section>
  
          <section className="bg-blue-50 border border-blue-100 p-10 rounded-2xl">
            <h3 className="text-2xl font-black text-blue-900 mb-6">Field-Verified Accuracy</h3>
            <p className="mb-4">Our construction and physics tools are built for practical application:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Concrete & Masonry:</strong> Estimate volume and material ratios for construction projects with built-in wastage buffers.</li>
              <li><strong>Dynamic Physics Lab:</strong> Interactive solvers for second-degree polynomial equations and linear systems.</li>
              <li><strong>Symbolic Logic:</strong> Unlike simple calculators, our engineering tools maintain mathematical integrity for high-stakes modeling.</li>
            </ul>
          </section>
          <div className="mt-8 flex gap-4">
             <a href="https://www.asce.org" target="_blank" className="text-[#1a0dab] font-bold underline">ASCE Global Standards</a>
             <a href="https://www.iop.org" target="_blank" className="text-[#1a0dab] font-bold underline">Institute of Physics</a>
          </div>
        </div>
    )
  };

  return contents[category] || null;
};

