'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Formula { name: string; formula: string; description: string; }
interface Category { id: string; name: string; icon: string; color: string; formulas: Formula[]; }

const CATEGORIES: Category[] = [
  {
    id: 'algebra', name: 'Algebra', icon: '🔤', color: '#4361ee',
    formulas: [
      { name: 'Quadratic Formula', formula: 'x = (−b ± √(b²−4ac)) / 2a', description: 'Solutions of ax² + bx + c = 0' },
      { name: 'Difference of Squares', formula: 'a² − b² = (a+b)(a−b)', description: 'Factoring a² − b²' },
      { name: 'Perfect Square', formula: '(a±b)² = a² ± 2ab + b²', description: 'Expanding squared binomials' },
      { name: 'Binomial Cube', formula: '(a+b)³ = a³ + 3a²b + 3ab² + b³', description: 'Expanding cubed binomials' },
      { name: 'Sum of Cubes', formula: 'a³ + b³ = (a+b)(a²−ab+b²)', description: 'Factoring sum of cubes' },
      { name: 'Logarithm Identity', formula: 'logₐ(xy) = logₐ(x) + logₐ(y)', description: 'Product rule for logarithms' },
      { name: 'Change of Base', formula: 'logₐ(x) = log(x) / log(a)', description: 'Converting between logarithm bases' },
      { name: 'Exponent Rules', formula: 'aᵐ · aⁿ = aᵐ⁺ⁿ,  (aᵐ)ⁿ = aᵐⁿ', description: 'Basic exponent rules' },
      { name: 'Arithmetic Series', formula: 'Sₙ = n/2 · (a₁ + aₙ)', description: 'Sum of first n terms of AP' },
      { name: 'Geometric Series', formula: 'Sₙ = a₁(1−rⁿ)/(1−r)', description: 'Sum of first n terms of GP' },
      { name: 'Binomial Theorem', formula: '(a+b)ⁿ = Σ C(n,k) · aⁿ⁻ᵏ · bᵏ', description: 'General expansion of (a+b)ⁿ' },
    ],
  },
  {
    id: 'geometry', name: 'Geometry', icon: '📐', color: '#f72585',
    formulas: [
      { name: 'Circle Area', formula: 'A = πr²', description: 'Area of a circle with radius r' },
      { name: 'Circle Circumference', formula: 'C = 2πr', description: 'Circumference of a circle' },
      { name: 'Triangle Area', formula: 'A = ½ · b · h', description: 'Area of a triangle' },
      { name: "Heron's Formula", formula: 'A = √(s(s−a)(s−b)(s−c)), s = (a+b+c)/2', description: 'Area from side lengths' },
      { name: 'Pythagorean Theorem', formula: 'a² + b² = c²', description: 'Relationship in right triangles' },
      { name: 'Distance Formula', formula: 'd = √((x₂−x₁)² + (y₂−y₁)²)', description: 'Distance between two points' },
      { name: 'Midpoint Formula', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', description: 'Midpoint of a line segment' },
      { name: 'Sphere Volume', formula: 'V = (4/3)πr³', description: 'Volume of a sphere' },
      { name: 'Sphere Surface Area', formula: 'A = 4πr²', description: 'Surface area of a sphere' },
      { name: 'Cylinder Volume', formula: 'V = πr²h', description: 'Volume of a cylinder' },
      { name: 'Cone Volume', formula: 'V = (1/3)πr²h', description: 'Volume of a cone' },
    ],
  },
  {
    id: 'trigonometry', name: 'Trigonometry', icon: '📊', color: '#7209b7',
    formulas: [
      { name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1', description: 'Fundamental trig identity' },
      { name: 'Tangent Ratio', formula: 'tan θ = sin θ / cos θ', description: 'Definition of tangent' },
      { name: 'Double Angle (sin)', formula: 'sin 2θ = 2 sin θ cos θ', description: 'Double angle formula for sine' },
      { name: 'Double Angle (cos)', formula: 'cos 2θ = cos²θ − sin²θ', description: 'Double angle formula for cosine' },
      { name: 'Sum Formula (sin)', formula: 'sin(α±β) = sinα cosβ ± cosα sinβ', description: 'Addition formula for sine' },
      { name: 'Sum Formula (cos)', formula: 'cos(α±β) = cosα cosβ ∓ sinα sinβ', description: 'Addition formula for cosine' },
      { name: 'Law of Sines', formula: 'a/sinA = b/sinB = c/sinC', description: 'Relates sides to angles in any triangle' },
      { name: 'Law of Cosines', formula: 'c² = a² + b² − 2ab·cosC', description: 'Generalized Pythagorean theorem' },
      { name: 'Half Angle (sin)', formula: 'sin(θ/2) = ±√((1−cosθ)/2)', description: 'Half angle formula for sine' },
      { name: 'Half Angle (cos)', formula: 'cos(θ/2) = ±√((1+cosθ)/2)', description: 'Half angle formula for cosine' },
      { name: 'Euler\'s Formula', formula: 'e^(iθ) = cosθ + i·sinθ', description: 'Complex exponential and trig' },
    ],
  },
  {
    id: 'calculus', name: 'Calculus', icon: '∫', color: '#4cc9f0',
    formulas: [
      { name: 'Power Rule', formula: 'd/dx [xⁿ] = n·xⁿ⁻¹', description: 'Derivative of a power function' },
      { name: 'Product Rule', formula: 'd/dx [f·g] = f\'g + fg\'', description: 'Derivative of a product' },
      { name: 'Chain Rule', formula: 'd/dx [f(g(x))] = f\'(g(x))·g\'(x)', description: 'Derivative of a composition' },
      { name: 'Quotient Rule', formula: 'd/dx [f/g] = (f\'g − fg\') / g²', description: 'Derivative of a quotient' },
      { name: 'Integration (Power)', formula: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', description: 'Antiderivative of power function' },
      { name: 'Integration by Parts', formula: '∫ u dv = uv − ∫ v du', description: 'Integration technique' },
      { name: 'Fundamental Theorem', formula: '∫ₐᵇ f(x)dx = F(b) − F(a)', description: 'Evaluation of definite integrals' },
      { name: 'Taylor Series', formula: 'f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ', description: 'Series expansion around a point' },
      { name: "L'Hôpital's Rule", formula: 'lim f/g = lim f\'/g\' (when 0/0 or ∞/∞)', description: 'Evaluating indeterminate limits' },
      { name: 'Derivative of sin', formula: 'd/dx [sin x] = cos x', description: 'Derivative of sine' },
      { name: 'Derivative of eˣ', formula: 'd/dx [eˣ] = eˣ', description: 'Derivative of natural exponential' },
      { name: 'Derivative of ln x', formula: 'd/dx [ln x] = 1/x', description: 'Derivative of natural log' },
    ],
  },
  {
    id: 'statistics', name: 'Statistics & Probability', icon: '📈', color: '#06d6a0',
    formulas: [
      { name: 'Mean', formula: 'x̄ = (Σxᵢ) / n', description: 'Arithmetic average' },
      { name: 'Standard Deviation', formula: 'σ = √(Σ(xᵢ−x̄)²/n)', description: 'Measure of spread' },
      { name: 'Variance', formula: 'σ² = Σ(xᵢ−x̄)²/n', description: 'Square of standard deviation' },
      { name: 'Z-Score', formula: 'z = (x−μ)/σ', description: 'Standard score' },
      { name: 'Permutation', formula: 'P(n,r) = n!/(n−r)!', description: 'Ordered arrangements' },
      { name: 'Combination', formula: 'C(n,r) = n!/(r!(n−r)!)', description: 'Unordered selections' },
      { name: 'Bayes\' Theorem', formula: 'P(A|B) = P(B|A)·P(A)/P(B)', description: 'Conditional probability' },
      { name: 'Expected Value', formula: 'E(X) = Σ xᵢ·P(xᵢ)', description: 'Long-run average' },
      { name: 'Normal Distribution', formula: 'f(x) = (1/σ√2π)·e^(−(x−μ)²/2σ²)', description: 'Gaussian (bell curve)' },
      { name: 'Correlation', formula: 'r = Σ(xᵢ−x̄)(yᵢ−ȳ) / √(Σ(xᵢ−x̄)²·Σ(yᵢ−ȳ)²)', description: 'Linear relationship strength' },
    ],
  },
  {
    id: 'physics', name: 'Physics', icon: '⚡', color: '#ff6b35',
    formulas: [
      { name: "Newton's Second Law", formula: 'F = ma', description: 'Force equals mass times acceleration' },
      { name: 'Kinetic Energy', formula: 'KE = ½mv²', description: 'Energy of motion' },
      { name: 'Potential Energy', formula: 'PE = mgh', description: 'Gravitational potential energy' },
      { name: 'Work', formula: 'W = F·d·cosθ', description: 'Work done by a force' },
      { name: 'Power', formula: 'P = W/t', description: 'Rate of energy transfer' },
      { name: 'Momentum', formula: 'p = mv', description: 'Linear momentum' },
      { name: 'Impulse', formula: 'J = F·Δt = Δp', description: 'Change in momentum' },
      { name: "Ohm's Law", formula: 'V = IR', description: 'Voltage, current, resistance' },
      { name: 'Wave Speed', formula: 'v = fλ', description: 'Speed = frequency × wavelength' },
      { name: 'Gravitational Force', formula: 'F = G·m₁m₂/r²', description: "Newton's law of gravitation" },
      { name: "Einstein's Energy", formula: 'E = mc²', description: 'Mass-energy equivalence' },
      { name: 'Coulomb\'s Law', formula: 'F = k·q₁q₂/r²', description: 'Electrostatic force' },
    ],
  },
  {
    id: 'engineering', name: 'Engineering', icon: '⚙️', color: '#3a86ff',
    formulas: [
      { name: 'Stress', formula: 'σ = F/A', description: 'Force per unit area (Pascals)' },
      { name: 'Strain', formula: 'ε = ΔL/L₀', description: 'Relative deformation' },
      { name: "Young's Modulus", formula: 'E = σ/ε', description: 'Elasticity modulus' },
      { name: 'Moment of Inertia', formula: 'I = Σmᵢrᵢ²', description: 'Rotational inertia' },
      { name: 'Torque', formula: 'τ = r × F', description: 'Rotational force' },
      { name: 'Beam Deflection', formula: 'δ = PL³/(48EI)', description: 'Simply supported beam, center load' },
      { name: 'Fluid Continuity', formula: 'A₁v₁ = A₂v₂', description: 'Conservation of mass flow' },
      { name: 'Bernoulli Equation', formula: 'P + ½ρv² + ρgh = const', description: 'Fluid energy conservation' },
      { name: 'RLC Resonance', formula: 'f₀ = 1/(2π√(LC))', description: 'Resonant frequency of LC circuit' },
      { name: 'Fourier Transform', formula: 'F(ω) = ∫ f(t)·e^(−iωt) dt', description: 'Time to frequency domain' },
      { name: 'Laplace Transform', formula: 'F(s) = ∫₀^∞ f(t)·e^(−st) dt', description: 'Integral transform for ODEs' },
      { name: 'Navier-Stokes', formula: 'ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v + f', description: 'Fluid dynamics governing equation' },
    ],
  },
];

export default function FormulaReferenceClient() {
  const [activeCategory, setActiveCategory] = useState('algebra');
  const [search, setSearch] = useState('');

  const category = CATEGORIES.find(c => c.id === activeCategory)!;
  const filteredFormulas = search
    ? CATEGORIES.flatMap(c => c.formulas.map(f => ({ ...f, catColor: c.color, catName: c.name }))).filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) || f.formula.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase())
      )
    : category.formulas.map(f => ({ ...f, catColor: category.color, catName: category.name }));

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="text-[11px] font-medium text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link><span className="mx-1.5">›</span>
          <Link href="/engineering" className="hover:text-blue-600">Engineering</Link><span className="mx-1.5">›</span>
          <span className="text-slate-600">Formula Reference</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <h1 className="text-[32px] font-black text-[#202124] tracking-tight mb-2">📖 Math Formula Reference</h1>
        <p className="text-[14px] text-[#5f6368] mb-8">Every essential formula from school algebra to engineering-level differential equations.</p>

        {/* Search */}
        <div className="relative mb-8 max-w-lg">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search formulas..." className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee20] outline-none text-[14px]" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>

        {/* Category tabs */}
        {!search && (
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className="px-4 py-2 rounded-xl text-[12px] font-bold transition-all"
                style={{
                  background: activeCategory === c.id ? c.color : '#f8fafc',
                  color: activeCategory === c.id ? '#fff' : '#64748b',
                  border: `1px solid ${activeCategory === c.id ? c.color : '#e2e8f0'}`,
                }}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Formulas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFormulas.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-lg transition-all group" style={{ borderLeftWidth: 4, borderLeftColor: f.catColor }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[14px] font-bold text-[#202124]">{f.name}</h3>
                {search && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: f.catColor + '15', color: f.catColor }}>{f.catName}</span>}
              </div>
              <div className="font-mono text-[16px] font-bold tracking-wide py-3 px-4 rounded-xl bg-[#f8fafc] border border-slate-100 mb-2" style={{ color: f.catColor }}>
                {f.formula}
              </div>
              <p className="text-[12px] text-[#5f6368]">{f.description}</p>
            </div>
          ))}
        </div>

        {filteredFormulas.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[14px]">No formulas found for "{search}"</p>
          </div>
        )}

        {/* Total count */}
        <div className="mt-12 text-center text-[12px] text-slate-400">
          <strong>{CATEGORIES.reduce((s, c) => s + c.formulas.length, 0)}</strong> formulas across <strong>{CATEGORIES.length}</strong> categories
        </div>
      </div>
    </div>
  );
}
