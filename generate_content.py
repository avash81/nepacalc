import json
import textwrap

generic_sections = {
    "evolution": """<p>The evolution of computational tools has fundamentally transformed the landscape of education and professional practice. For centuries, mathematical computation relied on manual methods, abacuses, and rudimentary mechanical calculators. These early tools, while revolutionary for their time, required significant time and cognitive load to operate, often distracting from the underlying conceptual understanding. Today, digital calculators serve not merely as answer-generating machines, but as powerful pedagogical aids that bridge the gap between abstract theory and practical application. By instantly handling complex arithmetic and algebraic manipulations, modern calculators allow students and professionals to focus on higher-order problem-solving, critical thinking, and algorithmic design. This shift is particularly crucial in STEM fields, where the ability to interpret data, model complex systems, and verify theoretical predictions is far more valuable than rote calculation. Furthermore, the accessibility of online calculators democratizes mathematical knowledge, providing learners worldwide with the tools necessary to explore advanced topics independently. As we continue to integrate technology into curricula, the emphasis must remain on using these tools to deepen understanding rather than bypass the learning process. The immediate feedback provided by digital solvers encourages experimentation, allowing users to visualize how changing variables impacts outcomes in real-time, thereby fostering a more intuitive grasp of mathematical relationships.</p>""",
    
    "precision": """<p>In both academic settings and professional engineering, precision is not a luxury—it is an absolute necessity. Mathematical models form the foundation of our modern infrastructure, economic systems, and technological advancements. A minor rounding error or a misplaced decimal can cascade through a complex equation, leading to catastrophic failures in real-world applications. For instance, in structural engineering, calculating the load-bearing capacity of a bridge requires exact adherence to algebraic and trigonometric principles; an error margin of even a fraction of a percent can compromise the safety of the entire structure. Similarly, in financial forecasting and quantitative analysis, precision dictates the allocation of millions of dollars, influencing economic stability and business viability. This highlights the critical importance of utilizing reliable computational tools that adhere to rigorous mathematical standards, such as IEEE-754 double-precision floating-point arithmetic. However, the tool is only as effective as the operator. Users must develop a habit of continuous verification—cross-checking results, understanding the bounds of the algorithm, and performing manual estimations to ensure the output aligns with logical expectations. Cultivating this level of mathematical rigor prepares students for high-stakes environments where precision is directly correlated with success, safety, and innovation.</p>""",
    
    "nepal_context": """<p>In the rapidly developing context of Nepal, the application of advanced mathematical principles is more relevant than ever. As the nation embarks on ambitious infrastructure projects—ranging from extensive road networks threading through the Himalayas to sophisticated hydropower dams harnessing the power of cascading rivers—the demand for precise mathematical modeling and engineering calculation has surged. Nepali engineers, economists, and planners rely on robust mathematical tools to navigate the unique topographical and economic challenges of the region. For example, optimizing the gradient of a mountain road or calculating the flow rate of a hydroelectric penstock requires profound algebraic and trigonometric accuracy. Furthermore, in the realm of finance and commerce, as Nepal integrates more deeply into the global economy, the need for accurate statistical analysis, currency conversion, and economic forecasting becomes paramount. Empowering Nepali students with access to high-quality, digital mathematical tools is a critical step in building local capacity. By mastering these computational resources, the next generation of Nepali professionals can drive sustainable development, innovate local solutions to global challenges, and elevate the country's technological and economic standing on the world stage. Education remains the most potent catalyst for this transformation, and equipping learners with the right tools is the foundation of that educational empowerment.</p>""",
    
    "expert_tips": """<p>To maximize the utility of computational tools, users must adopt a strategic approach to problem-solving. First and foremost, always validate your inputs. The adage 'garbage in, garbage out' holds exceptionally true in mathematics; a calculator can only process the data it is given. Before hitting calculate, take a moment to review the equation for typographical errors or misplaced operators. Secondly, develop the skill of order-of-magnitude estimation. Before relying on the digital output, mentally estimate what the answer should roughly be. If the calculator outputs a number that is drastically different from your estimate, it serves as a red flag that an input error may have occurred. Thirdly, utilize the memory functions and step-by-step breakdowns offered by advanced calculators. Storing intermediate values rather than retyping them minimizes transcription errors and maintains precision throughout multi-step problems. Finally, view the calculator as a tool for exploration. Change one variable at a time and observe how the final result shifts; this practice builds a deep, intuitive understanding of the mathematical function's behavior. By combining computational power with disciplined analytical thinking, users can elevate their mathematical proficiency from mere calculation to true mathematical modeling and analysis.</p>""",
    
    "deep_dive": """<p>Delving deeper into the mathematical underpinnings of this topic reveals a fascinating interplay of logic, algebra, and continuous mathematics. At its core, every algebraic function operates within a specific domain and range, governed by strict axioms that have been proven and refined over centuries of mathematical thought. When we manipulate equations, we are essentially performing transformations that preserve the truth value of the original statement. This concept of invariance is central to advanced mathematics, including abstract algebra and topology. Understanding why a specific formula works—rather than just how to use it—unlocks a higher level of mathematical maturity. It allows practitioners to adapt existing formulas to novel problems, essentially creating new mathematical models tailored to unique situations. This deep structural knowledge is what separates mechanical calculation from true mathematical innovation. As you utilize this calculator, consider the algorithms working beneath the surface. From iterative numerical methods like Newton-Raphson used for finding roots, to the CORDIC algorithms powering trigonometric functions, the software embodies decades of computer science and mathematical optimization. Appreciating this depth enriches the learning experience and fosters a profound respect for the discipline of mathematics.</p>""",
    
    "future_trends": """<p>Looking toward the future, the integration of artificial intelligence and machine learning into computational tools promises to further revolutionize how we approach mathematics. We are moving beyond simple deterministic calculators toward adaptive solvers that can interpret natural language queries, identify logical inconsistencies in user inputs, and suggest alternative solution pathways. This paradigm shift will redefine mathematical education, shifting the focus entirely away from mechanical execution toward conceptual synthesis and algorithmic design. In developing regions like Nepal, this technological leap offers an unprecedented opportunity to leapfrog traditional educational barriers, providing students in remote areas with access to personalized, AI-driven mathematical tutoring. However, this future also necessitates a new type of mathematical literacy—one where students must understand how to interact with intelligent systems, validate AI-generated models, and understand the ethical implications of algorithmic decision-making. By embracing these advanced tools today, users are laying the groundwork for the mathematical literacy of tomorrow, ensuring they remain at the forefront of technological innovation and analytical thought.</p>""",
    
    "digital_literacy": """<p>Digital literacy in mathematics extends far beyond the ability to click buttons on a screen; it encompasses a comprehensive understanding of how digital systems interpret, process, and output numerical data. When users interact with an online calculator, they are engaging with a complex stack of web technologies, scripting languages, and mathematical libraries. Understanding the limitations of these systems—such as floating-point precision errors, maximum computational bounds, and processing latency—is crucial for advanced applications. For instance, knowing that a 64-bit float can only accurately represent numbers up to a certain magnitude prevents catastrophic errors in astronomical or quantum calculations. Furthermore, as data becomes the world's most valuable resource, the ability to mathematically manipulate and interpret large datasets using computational tools is a foundational skill for the 21st-century workforce. From data scientists analyzing global economic trends to local entrepreneurs optimizing their supply chains, mathematical digital literacy is the key to unlocking actionable insights from raw numbers. Cultivating this literacy requires a proactive approach: users should continually seek to understand the 'why' and 'how' behind the tools they use, ensuring they remain masters of the technology rather than mere operators.</p>"""
}

# The previous specific calculators remain exactly the same.
calculators = {
    'linear-solver': {
        'title': 'Linear Systems and Equations',
        'color': 'indigo',
        'intro': 'Linear equations are algebraic representations of straight lines and proportional relationships. Solving these systems involves finding the exact point where multiple lines intersect, a fundamental skill in fields ranging from economics to engineering. This linear solver provides a robust platform for evaluating 2-variable and 3-variable systems with absolute accuracy, removing the friction of manual computation.',
        'history': 'The study of linear systems dates back to ancient civilizations such as the Babylonians and Chinese mathematicians of the Han dynasty, who documented early methods for solving multi-variable problems long before modern symbolic algebra was formalized by Islamic scholars like Al-Khwarizmi.',
        'method': 'To solve a linear system, one can use substitution, elimination, or matrix operations. Substitution involves isolating a variable and replacing it in another equation. Elimination focuses on aligning coefficients to cancel out variables. The calculator automates these steps, providing instant verification.',
        'pitfalls': 'A common mistake is failing to multiply an entire equation during the elimination process, or mismanaging negative signs. Always check the determinant to see if the lines are parallel or coincident.',
        'links': [
            ('<a href="/calculator/matrices/" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Matrix Calculator</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/ratio-proportion/" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Ratio Calculator</a>'),
            ('<a href="/calculator/percentage/" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Percentage Calculator</a>'),
            ('<a href="/calculator/nepal-salary/" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Nepal Salary Calculator</a>')
        ]
    },
    'quadratic-solver': {
        'title': 'Quadratic Equations and Parabolic Paths',
        'color': 'sky',
        'intro': 'Quadratic equations govern non-linear growth and the physical trajectories of moving objects. Whether calculating the arc of a projectile or optimizing a profit curve, the quadratic formula is an indispensable tool. This solver quickly evaluates coefficients to find precise roots, vertex coordinates, and the discriminant.',
        'history': 'The geometric approach to solving quadratics was explored by the Greeks, but it was the Indian mathematician Brahmagupta in the 7th century who first provided a generalized algebraic formula for solving quadratic equations.',
        'method': 'By applying the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a, we extract the roots. The term (b² - 4ac) is the discriminant, revealing whether the roots are real, repeated, or complex.',
        'pitfalls': 'Failing to format the equation in standard ax² + bx + c = 0 form before extracting coefficients is the most frequent error. Additionally, mishandling the square root of a negative discriminant can lead to domain errors if complex numbers are not accounted for.',
        'links': [
            ('<a href="/calculator/physics-force/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">Force Calculator</a>'),
            ('<a href="/calculator/cagr-calculator/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">CAGR Calculator</a>'),
            ('<a href="/calculator/linear-solver/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">Linear Solver</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/nepal-land/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">Nepal Land Area Calculator</a>')
        ]
    },
    'matrices': {
        'title': 'Matrix Algebra and Linear Transformations',
        'color': 'violet',
        'intro': 'Matrices are the computational scaffolding of modern technology, driving everything from 3D computer graphics to deep learning algorithms. This matrix tool enables rapid calculation of addition, multiplication, determinants, and inverses for multi-dimensional data grids.',
        'history': 'The term "matrix" was coined by James Joseph Sylvester in 1850. However, the foundational concepts of matrix determinants trace back to Leibniz and Seki Kowa in the 17th century, developed specifically to solve complex linear systems.',
        'method': 'Matrix addition requires identical dimensions, while multiplication requires the columns of the first to match the rows of the second. Inversion relies on the determinant being non-zero, utilizing the adjugate matrix for computation.',
        'pitfalls': 'Assuming matrix multiplication is commutative (that A*B = B*A) is a massive pitfall; in matrix math, order is absolute. Another error is attempting to invert a singular matrix, which represents a system with collapsed dimensionality.',
        'links': [
            ('<a href="/calculator/linear-solver/" className="text-violet-600 hover:text-violet-800 underline font-semibold transition-colors">Linear Systems Solver</a>'),
            ('<a href="/calculator/binary-converter/" className="text-violet-600 hover:text-violet-800 underline font-semibold transition-colors">Binary Converter</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-violet-600 hover:text-violet-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/percentage/" className="text-violet-600 hover:text-violet-800 underline font-semibold transition-colors">Percentage Tool</a>'),
            ('<a href="/calculator/nepse-wacc/" className="text-violet-600 hover:text-violet-800 underline font-semibold transition-colors">NEPSE WACC Calculator</a>')
        ]
    },
    'scientific-calculator': {
        'title': 'Advanced Scientific Computation',
        'color': 'purple',
        'intro': 'The scientific calculator is the quintessential tool for advanced academic and engineering work, offering access to trigonometric, logarithmic, and exponential functions. It serves as a comprehensive bridge between basic arithmetic and advanced continuous mathematics.',
        'history': 'The transition from slide rules to electronic scientific calculators in the 1970s, spearheaded by companies like HP and Texas Instruments, revolutionized engineering, drastically reducing the time required for complex calculations.',
        'method': 'Using a standard PEMDAS evaluation engine, this calculator parses complex expressions, utilizing CORDIC algorithms for rapid trigonometric resolution and Taylor series expansions for precise logarithmic outputs.',
        'pitfalls': 'A notorious pitfall is failing to switch between Degree and Radian modes when calculating sine or cosine, leading to wildly inaccurate geometric results. Poor use of parentheses also frequently corrupts the order of operations.',
        'links': [
            ('<a href="/calculator/logarithm-calculator/" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">Logarithm Tool</a>'),
            ('<a href="/calculator/geometry-3d/" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">3D Geometry Calculator</a>'),
            ('<a href="/calculator/physics-energy/" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">Energy Calculator</a>'),
            ('<a href="/calculator/simple-calculator/" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">Simple Arithmetic Tool</a>'),
            ('<a href="/calculator/nepal-vat/" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">Nepal VAT Calculator</a>')
        ]
    },
    'percentage-calculator': {
        'title': 'Percentages and Financial Proportions',
        'color': 'emerald',
        'intro': 'Percentages are the universal language of finance, statistics, and growth tracking. Whether you are analyzing profit margins, taxation, or scientific error rates, understanding how to manipulate parts per hundred is an absolutely critical life skill.',
        'history': 'The concept of percentages evolved from the Roman practice of computing taxes as fractions of 100. Over centuries, this evolved into the standard % symbol we use today, simplifying the communication of proportional data globally.',
        'method': 'Calculating a percentage involves dividing a part by the whole and multiplying by 100. To find a percent change, take the difference between the new and old values, divide by the old value, and multiply by 100.',
        'pitfalls': 'A common error is confusing percentage points with percent change. For example, moving from 10% to 15% is a 5 percentage point increase, but a 50% relative increase.',
        'links': [
            ('<a href="/calculator/discount-calculator/" className="text-emerald-600 hover:text-emerald-800 underline font-semibold transition-colors">Discount Calculator</a>'),
            ('<a href="/calculator/cagr-calculator/" className="text-emerald-600 hover:text-emerald-800 underline font-semibold transition-colors">CAGR Calculator</a>'),
            ('<a href="/calculator/ratio-proportion/" className="text-emerald-600 hover:text-emerald-800 underline font-semibold transition-colors">Ratio Calculator</a>'),
            ('<a href="/calculator/fraction-calculator/" className="text-emerald-600 hover:text-emerald-800 underline font-semibold transition-colors">Fraction Calculator</a>'),
            ('<a href="/calculator/nepal-vat/" className="text-emerald-600 hover:text-emerald-800 underline font-semibold transition-colors">Nepal VAT Tool</a>')
        ]
    },
    'fraction-calculator': {
        'title': 'Fractions and Rational Numbers',
        'color': 'orange',
        'intro': 'Fractions represent precise divisions of a whole, avoiding the rounding errors often introduced by decimals. They are indispensable in fields requiring exact physical measurements, such as carpentry, baking, and theoretical mathematics.',
        'history': 'The ancient Egyptians used unit fractions extensively, representing complex values as sums of distinct fractions with a numerator of 1. Modern fraction notation, with the horizontal bar, was popularized by Arab mathematicians in the 12th century.',
        'method': 'Addition and subtraction require finding a Least Common Denominator (LCD). Multiplication is straightforward (top times top, bottom times bottom), while division requires multiplying by the reciprocal of the second fraction.',
        'pitfalls': 'Adding denominators together when adding fractions (e.g., 1/2 + 1/3 = 2/5) is a classic fundamental error. Always find a common base denominator before adding or subtracting.',
        'links': [
            ('<a href="/calculator/decimal-to-fraction/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Decimal to Fraction</a>'),
            ('<a href="/calculator/lcm-gcf-calculator/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">LCM & GCF Calculator</a>'),
            ('<a href="/calculator/percentage-calculator/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Percentage Calculator</a>'),
            ('<a href="/calculator/ratio-proportion/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Ratio Proportion Tool</a>'),
            ('<a href="/calculator/nepal-land/" className="text-orange-600 hover:text-orange-800 underline font-semibold transition-colors">Nepal Land Calculator</a>')
        ]
    },
    'lcm-gcf-calculator': {
        'title': 'Multiples, Factors, and Synchronization',
        'color': 'amber',
        'intro': 'The Least Common Multiple (LCM) and Greatest Common Factor (GCF) are foundational tools in number theory. They are used to synchronize cycles, simplify fractions, and divide resources into optimal, equitable distributions.',
        'history': 'The Euclidean Algorithm for finding the GCF was detailed in Euclid’s Elements around 300 BC, making it one of the oldest known algorithms still in widespread use in modern computing today.',
        'method': 'LCM is found by identifying the smallest value divisible by all inputs, often using prime factorization. The GCF is found by identifying the largest shared prime factors or utilizing the rapid Euclidean division method.',
        'pitfalls': 'Confusing LCM with GCF is common. Remember: LCM is always greater than or equal to the largest number in your set, while GCF is always less than or equal to the smallest number in your set.',
        'links': [
            ('<a href="/calculator/prime-factor-calculator/" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">Prime Factorization</a>'),
            ('<a href="/calculator/fraction-calculator/" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">Fraction Tool</a>'),
            ('<a href="/calculator/ratio-proportion/" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">Ratio Calculator</a>'),
            ('<a href="/calculator/simple-calculator/" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">Simple Calculator</a>'),
            ('<a href="/calculator/nepse-bonus-tax/" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">NEPSE Bonus Tax</a>')
        ]
    },
    'prime-factor-calculator': {
        'title': 'Prime Factorization and Number DNA',
        'color': 'rose',
        'intro': 'Prime numbers are the indivisible building blocks of mathematics. Breaking a composite number down into its prime factors is akin to discovering its mathematical DNA, a process essential for cryptography, fraction simplification, and advanced number theory.',
        'history': 'The Fundamental Theorem of Arithmetic, which states that every integer greater than 1 has a unique prime factorization, was formally proven by Carl Friedrich Gauss in 1801 in his seminal work Disquisitiones Arithmeticae.',
        'method': 'The calculator utilizes trial division, dividing the target number by sequentially larger prime numbers until the quotient reaches 1. The result is expressed in exponential notation for absolute clarity.',
        'pitfalls': 'A common pitfall is forgetting that 1 is neither prime nor composite, and therefore should never appear in a prime factorization tree. Additionally, missing higher-level prime factors (like 13 or 17) can stall manual calculations.',
        'links': [
            ('<a href="/calculator/lcm-gcf-calculator/" className="text-rose-600 hover:text-rose-800 underline font-semibold transition-colors">LCM & GCF Tool</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-rose-600 hover:text-rose-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/password-generator/" className="text-rose-600 hover:text-rose-800 underline font-semibold transition-colors">Password Generator (Crypto)</a>'),
            ('<a href="/calculator/fraction-calculator/" className="text-rose-600 hover:text-rose-800 underline font-semibold transition-colors">Fraction Calculator</a>'),
            ('<a href="/calculator/see-gpa/" className="text-rose-600 hover:text-rose-800 underline font-semibold transition-colors">SEE GPA Calculator</a>')
        ]
    },
    'ratio-proportion': {
        'title': 'Ratios, Proportions, and Scaling',
        'color': 'teal',
        'intro': 'Ratios define the quantitative relationship between different elements, forming the basis of proportionality. Whether mixing chemical compounds, scaling architectural blueprints, or adjusting financial portfolios, proportional reasoning ensures balance and structural integrity.',
        'history': 'The golden ratio (approximately 1.618) was studied intensely by ancient Greek mathematicians and philosophers, who integrated its proportional harmony into their art, architecture, and understanding of natural aesthetics.',
        'method': 'To solve a proportion (A/B = C/D) for a missing variable, one utilizes cross-multiplication. The calculator automates this, while also simplifying given ratios to their absolute lowest integer forms using GCF extraction.',
        'pitfalls': 'Failing to align units is a major error. A ratio of 1 inch to 1 foot is not 1:1, but 1:12. Always ensure the numerator and denominator represent comparable units before calculating.',
        'links': [
            ('<a href="/calculator/percentage/" className="text-teal-600 hover:text-teal-800 underline font-semibold transition-colors">Percentage Tool</a>'),
            ('<a href="/calculator/fraction-calculator/" className="text-teal-600 hover:text-teal-800 underline font-semibold transition-colors">Fraction Solver</a>'),
            ('<a href="/calculator/geometry-3d/" className="text-teal-600 hover:text-teal-800 underline font-semibold transition-colors">3D Geometry Scale</a>'),
            ('<a href="/calculator/discount-calculator/" className="text-teal-600 hover:text-teal-800 underline font-semibold transition-colors">Discount Calculator</a>'),
            ('<a href="/calculator/nepal-land/" className="text-teal-600 hover:text-teal-800 underline font-semibold transition-colors">Nepal Land Conversions</a>')
        ]
    },
    'decimal-to-fraction': {
        'title': 'Precision Conversions: Decimals to Fractions',
        'color': 'blue',
        'intro': 'While decimals are favored for digital computation, fractions are the gold standard for absolute mathematical precision and physical craftsmanship. Converting decimals to exact rational fractions eliminates rounding drift in highly sensitive engineering tasks.',
        'history': 'The shift from fractions to decimals began in the 16th century with Simon Stevin’s publication of "De Thiende". Today, converting back to fractions is often necessary to interface digital outputs with real-world, physical tools like standard imperial tape measures.',
        'method': 'The algorithm identifies the place value of the final digit, creates a base-10 fraction (e.g., /100 or /1000), and then systematically reduces it using the Greatest Common Factor. Repeating decimals are processed algebraically using factors of 9.',
        'pitfalls': 'A frequent mistake is approximating repeating decimals. Treating 0.33 as exactly 33/100 rather than recognizing it as a truncated 1/3 can cause compounding errors in multi-step engineering calculations.',
        'links': [
            ('<a href="/calculator/fraction-calculator/" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Fraction Calculator</a>'),
            ('<a href="/calculator/percentage/" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Percentage Tool</a>'),
            ('<a href="/calculator/rounding/" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Rounding Calculator</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Scientific Tool</a>'),
            ('<a href="/calculator/property-tax/" className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors">Nepal Property Tax</a>')
        ]
    },
    'logarithm-calculator': {
        'title': 'Logarithms and Exponential Scales',
        'color': 'fuchsia',
        'intro': 'Logarithms are the mathematical inverse of exponentiation, designed to unravel the complexities of rapid, non-linear growth. They allow us to compress vast physical scales—like earthquake intensity or acoustic decibels—into comprehensible, linear metrics.',
        'history': 'John Napier introduced logarithms in the early 17th century as a means to drastically simplify astronomical calculations. By converting multiplication into addition, logarithmic tables revolutionized scientific computation prior to the digital age.',
        'method': 'The solver evaluates the argument against the specified base to find the exponent. Utilizing the change-of-base formula (log_b(x) = ln(x) / ln(b)), the tool can accurately resolve logarithms for any positive base.',
        'pitfalls': 'Attempting to calculate the logarithm of a negative number or zero will yield an error in real arithmetic, as no real exponent can force a positive base into a negative outcome. Misinterpreting natural log (ln) as base-10 is also a common oversight.',
        'links': [
            ('<a href="/calculator/scientific-calculator/" className="text-fuchsia-600 hover:text-fuchsia-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/compound-interest/" className="text-fuchsia-600 hover:text-fuchsia-800 underline font-semibold transition-colors">Compound Interest (Exponents)</a>'),
            ('<a href="/calculator/cagr-calculator/" className="text-fuchsia-600 hover:text-fuchsia-800 underline font-semibold transition-colors">CAGR Calculator</a>'),
            ('<a href="/calculator/quadratic-solver/" className="text-fuchsia-600 hover:text-fuchsia-800 underline font-semibold transition-colors">Quadratic Solver</a>'),
            ('<a href="/calculator/fixed-deposit/" className="text-fuchsia-600 hover:text-fuchsia-800 underline font-semibold transition-colors">Nepal Fixed Deposit</a>')
        ]
    },
    'rounding': {
        'title': 'Rounding and Significant Figures',
        'color': 'slate',
        'intro': 'Rounding is the art of balancing precision with practicality. By trimming excess decimal data, we create numbers that are easier to communicate and more reflective of a measurement’s true, practical accuracy in both science and finance.',
        'history': 'The concept of "Banker\'s Rounding" (rounding halves to the nearest even number) was developed to eliminate the statistical bias introduced by standard "round half up" methods when aggregating massive accounting ledgers.',
        'method': 'The calculator evaluates the digit immediately following the target precision level. Depending on the chosen protocol (Standard, Floor, Ceiling, or Banker’s), it adjusts the final significant digit accordingly.',
        'pitfalls': 'Rounding at intermediate steps of a multi-step calculation leads to "rounding drift," a severe cumulative error. Always maintain maximum precision during calculations and only apply rounding protocols to the final result.',
        'links': [
            ('<a href="/calculator/decimal-to-fraction/" className="text-slate-600 hover:text-slate-800 underline font-semibold transition-colors">Decimal to Fraction</a>'),
            ('<a href="/calculator/scientific-calculator/" className="text-slate-600 hover:text-slate-800 underline font-semibold transition-colors">Scientific Calculator</a>'),
            ('<a href="/calculator/percentage/" className="text-slate-600 hover:text-slate-800 underline font-semibold transition-colors">Percentage Tool</a>'),
            ('<a href="/calculator/simple-calculator/" className="text-slate-600 hover:text-slate-800 underline font-semibold transition-colors">Simple Arithmetic</a>'),
            ('<a href="/calculator/nepal-salary/" className="text-slate-600 hover:text-slate-800 underline font-semibold transition-colors">Nepal Salary Tax</a>')
        ]
    },
    'simple-calculator': {
        'title': 'Reliable Simple Arithmetic',
        'color': 'gray',
        'intro': 'At the core of all advanced mathematics lies the unshakeable foundation of basic arithmetic. Addition, subtraction, multiplication, and division are the essential operations that dictate daily transactions, fundamental science, and basic resource allocation.',
        'history': 'The mechanical execution of simple arithmetic dates back to the abacus, but the first true mechanical adding machine, the Pascaline, was invented by Blaise Pascal in 1642 to help his father with tax accounting.',
        'method': 'Following strict IEEE-754 double-precision floating-point protocols, this calculator executes standard binary arithmetic in real-time, ensuring absolute fidelity for basic numerical operations without latency.',
        'pitfalls': 'Ignoring the order of operations (PEMDAS) when entering strings of arithmetic is the primary source of error. Without explicit parentheses, multiplication and division will always precede addition and subtraction.',
        'links': [
            ('<a href="/calculator/scientific-calculator/" className="text-gray-600 hover:text-gray-800 underline font-semibold transition-colors">Scientific Tool</a>'),
            ('<a href="/calculator/percentage/" className="text-gray-600 hover:text-gray-800 underline font-semibold transition-colors">Percentage Calculator</a>'),
            ('<a href="/calculator/fraction-calculator/" className="text-gray-600 hover:text-gray-800 underline font-semibold transition-colors">Fraction Tool</a>'),
            ('<a href="/calculator/ratio-proportion/" className="text-gray-600 hover:text-gray-800 underline font-semibold transition-colors">Ratio Calculator</a>'),
            ('<a href="/calculator/nea-bill/" className="text-gray-600 hover:text-gray-800 underline font-semibold transition-colors">NEA Electricity Bill</a>')
        ]
    }
}

def generate_jsx(key, data):
    c = data['color']
    
    html = f"""
        <div className="space-y-12">
            <div className="bg-{c}-50 border-l-4 border-{c}-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-{c}-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Mastering {data['title']}
                </h2>
                <p className="text-slate-800 text-base leading-relaxed mb-4">
                    {data['intro']}
                </p>
                <div className="text-slate-700 space-y-4">
                    {generic_sections['evolution']}
                </div>
            </div>
            
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">Historical Context & Fundamental Concepts</h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>{data['history']}</p>
                    {generic_sections['deep_dive']}
                    {generic_sections['digital_literacy']}
                </div>
            </section>

            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 text-{c}-400">
                    Methodology & Step-by-Step Process
                </h3>
                <div className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10 space-y-4">
                    <p>{data['method']}</p>
                    {generic_sections['expert_tips']}
                </div>
            </section>

            <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
                <h3 className="text-xl font-black text-slate-900 mb-6">Real-world Applications in the Nepal Context</h3>
                <div className="text-slate-800 leading-relaxed space-y-4">
                    {generic_sections['nepal_context']}
                    <p>{"In Nepal specifically, tools related to " + data['title'].lower() + " have enormous utility. " + data.get('nepal', 'As educational standards rise, mastering these operations offers students and professionals a significant competitive edge.')}</p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Common Pitfalls & Mistakes</h3>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                        <p>{data['pitfalls']}</p>
                        <p>Awareness of these common traps separates the amateur from the expert. Always verify your inputs twice.</p>
                    </div>
                </div>
                <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-4">Essential Internal Links</h3>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                        <p>Expand your knowledge by exploring our related mathematical tools:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            {"".join([f"<li>{link}</li>" for link in data['links']])}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6">The Need for Extreme Precision</h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    {generic_sections['precision']}
                    {generic_sections['future_trends']}
                </div>
            </section>

            <section className="bg-{c}-50 border border-{c}-100 rounded-3xl p-10 relative overflow-hidden">
                <h3 className="text-2xl font-black text-{c}-900 mb-4">Conclusion & Next Steps</h3>
                <div className="text-{c}-900/80 text-sm leading-relaxed mb-8 space-y-4">
                    <p>{"Mastering " + data['title'].lower() + " opens doors to deeper analytical thinking. " + data.get('conclusion', '')}</p>
                    <p>Whether you are a student preparing for examinations in Nepal or a professional verifying engineering designs, continuous practice with reliable tools is the key to mathematical proficiency.</p>
                </div>
            </section>
        </div>"""
    return html

results = {}
for k, v in calculators.items():
    results[k] = generate_jsx(k, v)

with open('replacements.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Generated replacements.json successfully!")
