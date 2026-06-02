import { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Full Tool Directory ,  80+ Precision Calculators | NepaCalc',
  description: 'Explore our complete index of scientific, financial, health, and engineering calculators. Official directory of high-precision mathematical units for Nepal.',
  alternates: {
    canonical: 'https://NepaCalc.com/directory/',
  },
  openGraph: {
    title: 'Full Tool Directory ,  80+ Precision Calculators | NepaCalc',
    description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
    url: 'https://NepaCalc.com/directory/',
  }
};

export default function DirectoryPage() {
  return (
    <>
      <DirectoryClient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">Complete Directory of Calculators & Mathematical Tools in Nepal</h2>
          <p className="text-xl leading-relaxed mb-6">
            Welcome to the ultimate directory of computational tools at <strong>NepaCalc</strong>, the premier destination for high-precision mathematical units and specialized calculators in Nepal. Whether you're a student preparing for SEE or NEB exams, a professional engineer designing infrastructure, a financial analyst evaluating investments, or a medical professional assessing health metrics, our comprehensive suite of 80+ calculators is engineered to provide instant, reliable, and accurate results tailored for your needs.
          </p>
          
          <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">Empowering Education and Professional Excellence in Nepal</h3>
          <p className="mb-4">
            In the rapidly evolving landscape of Nepal's educational and professional sectors, access to robust computational tools is no longer a luxury but a necessity. At NepaCalc, we recognize the diverse mathematical challenges faced by individuals across various disciplines. Our platform bridges the gap between complex mathematical theory and practical, everyday application by offering an intuitive interface paired with powerful backend algorithms.
          </p>
          <p className="mb-4">
            From the bustling streets of Kathmandu to the remote classrooms in the Himalayas, our mission is to democratize access to advanced calculation tools. We have meticulously categorized our calculators to ensure that you can find exactly what you need without unnecessary friction. Our directory spans across Mathematics, Finance, Health, Engineering, Conversions, and Everyday Utilities.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">Explore Our Extensive Categories</h3>
          
          <h4 className="text-xl font-semibold mt-6 mb-3">1. Mathematical & Algebraic Tools</h4>
          <p className="mb-4">
            Mathematics is the universal language, but solving complex equations can be time-consuming. Our mathematical calculators are designed to simplify these processes. You can explore tools like our <a href="/math-tools/fourfunction/" className="text-blue-500 hover:underline">Four-Function Calculator</a> for basic arithmetic, or dive deeper with our <a href="/math-tools/calculus/" className="text-blue-500 hover:underline">Calculus & Algebra Laboratory</a> for advanced limits, derivatives, and integrals. We also offer specialized tools for geometry, trigonometry, statistics, and probability, ensuring that students and researchers have everything they need to verify their manual calculations or explore new concepts.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">2. Financial & Business Calculators</h4>
          <p className="mb-4">
            Navigating the financial landscape requires precision. Whether you are calculating the EMI for a new home loan in Nepal, projecting compound interest on your savings, or determining the depreciation of corporate assets, our financial tools are tailored to local and international standards. We understand the nuances of the Nepalese market, and our tools are flexible enough to accommodate various interest rates and compounding periods. Small business owners can leverage our margin and markup calculators to ensure profitability, while individuals can use our budgeting tools to plan for a secure future.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">3. Health & Fitness Metrics</h4>
          <p className="mb-4">
            Health is wealth, and keeping track of your physical well-being is paramount. Our health calculators go beyond simple BMI assessments. We provide tools for calculating Body Fat Percentage, Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and ideal weight ranges based on various scientific formulas. Whether you are an athlete optimizing your diet or someone on a weight-loss journey, our health tools provide the actionable data you need to make informed lifestyle choices.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">4. Engineering & Scientific Instruments</h4>
          <p className="mb-4">
            For the engineers and scientists shaping Nepal's future infrastructure and technology, precision is non-negotiable. Our engineering section features calculators for civil, mechanical, and electrical engineering. Calculate load-bearing capacities, fluid dynamics, electrical resistance, and material stress with confidence. Our tools utilize standard international units while offering conversions to local measurement systems when applicable, ensuring that your projects meet the highest standards of safety and efficiency.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-3">5. Comprehensive Unit Conversions</h4>
          <p className="mb-4">
            Nepal has a rich history of local measurement systems (such as Ropani, Aana, Paisa, Daam, and Bigha, Katha, Dhur) which often need to be converted to metric or imperial units. Our conversion calculators handle these specific local units alongside standard global conversions for length, mass, volume, temperature, and more. This makes NepaCalc an indispensable tool for real estate professionals, farmers, and anyone dealing with land measurement in Nepal.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">Why Choose NepaCalc for Your Computational Needs?</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Unmatched Precision:</strong> Our backend utilizes robust mathematical libraries to ensure that every decimal point is accurate. Whether you are dealing with quantum physics or local currency, precision is guaranteed.</li>
            <li><strong>User-Centric Design:</strong> We believe that powerful tools shouldn't be difficult to use. Our sleek, modern interface is optimized for both desktop and mobile devices, providing a seamless experience whether you are in a high-tech office or working from your smartphone in a rural village.</li>
            <li><strong>Instant Results:</strong> Time is valuable. Our calculators are built with modern web technologies like Next.js and React, ensuring rapid processing and instantaneous feedback.</li>
            <li><strong>Local Relevance:</strong> While our tools adhere to global mathematical standards, we have integrated features and units that are specifically relevant to the Nepalese context.</li>
            <li><strong>100% Free Access:</strong> Education and essential tools should be accessible to all. All calculators in our directory are free to use, without hidden paywalls or restrictive subscriptions.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900 dark:text-white">The Importance of Digital Calculation Tools in Modern Education</h3>
          <p className="mb-4">
            The integration of digital tools in education has revolutionized how students grasp complex mathematical concepts. By offloading the tedious arithmetic to reliable calculators, students can focus on understanding the underlying theories and logic. For example, using our graphing tools allows visual comprehension of algebraic functions, making abstract concepts concrete. In Nepal, where digital literacy is rapidly expanding, providing access to these advanced tools empowers the next generation of innovators, thinkers, and problem solvers.
          </p>
          <p className="mb-4">
            Furthermore, professionals across various sectors benefit immensely from having a centralized hub for their computational needs. Instead of relying on disparate apps or manual spreadsheets, NepaCalc offers a unified ecosystem. An architect can calculate material requirements, convert the units to local standards, and estimate the financial costs—all on the same platform.
          </p>

          <h3 className="text-2xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">Frequently Asked Questions (FAQs)</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">How many calculators are currently available in the directory?</h4>
              <p>The NepaCalc directory currently features over 80 specialized calculators spanning math, health, finance, and engineering. We are continuously updating and adding new tools based on user feedback and technological advancements.</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">Are the calculators free to use?</h4>
              <p>Yes! All calculators and tools in the NepaCalc directory are completely free. Our goal is to provide accessible computational resources to students, professionals, and the general public in Nepal and globally.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">Do you have calculators specifically for Nepalese measurements?</h4>
              <p>Absolutely. We feature unit converters tailored for Nepalese land measurement systems, including Ropani, Aana, Paisa, Daam for hilly regions and Bigha, Katha, Dhur for the Terai region. This is especially useful for real estate and agricultural purposes.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">Can I use NepaCalc on my mobile phone?</h4>
              <p>Yes, NepaCalc is fully responsive and optimized for mobile devices. You can access our full directory and perform complex calculations directly from your smartphone's web browser, no app installation required.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">How accurate are the financial calculators?</h4>
              <p>Our financial calculators use standard industry formulas for calculating EMI, compound interest, and present/future values. However, they are intended for informational purposes. For official banking and investment decisions in Nepal, we recommend consulting with a certified financial advisor or your respective banking institution.</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">Ready to start calculating?</h3>
            <p className="mb-6 text-lg">Browse our directory above or use the search function to find the exact tool you need.</p>
            <p className="text-sm opacity-80">NepaCalc - Precision Mathematics for Nepal's Future</p>
          </div>
        </section>
      </div>
    </>
  );
}

