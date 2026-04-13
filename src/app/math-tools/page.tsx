'use client';

import Link from 'next/link';
import { Activity, Calculator, Grid, Hexagon, AlignLeft, ChevronRight } from 'lucide-react';

const MATH_TOOLS = [
  {
    title: 'Graphing Calculator',
    description: 'Explore math with our beautiful, free online graphing calculator. Graph functions, plot points, visualize algebraic equations.',
    icon: Activity,
    path: '/math-tools/calculator',
    color: 'bg-green-600',
    hoverColor: 'group-hover:bg-green-700'
  },
  {
    title: 'Scientific Calculator',
    description: 'A beautiful, free online scientific calculator with advanced features for evaluating percentages, fractions, exponential functions, and logarithms.',
    icon: Calculator,
    path: '/math-tools/scientific',
    color: 'bg-blue-600',
    hoverColor: 'group-hover:bg-blue-700'
  },
  {
    title: 'Four Function',
    description: 'A simple, beautiful, free online four function calculator.',
    icon: Calculator,
    path: '/math-tools/fourfunction',
    color: 'bg-blue-600',
    hoverColor: 'group-hover:bg-blue-700'
  },
  {
    title: 'Matrix Calculator',
    description: 'A beautiful, free online matrix calculator. Perform arithmetic operations, find the determinant, inverse, or REF of matrices.',
    icon: Grid,
    path: '/math-tools/matrix',
    color: 'bg-indigo-600',
    hoverColor: 'group-hover:bg-indigo-700'
  },
  {
    title: 'Test Practice',
    description: 'Practice using the testing versions of our calculators in a secure, locked environment.',
    icon: AlignLeft,
    path: '/math-tools/practice',
    color: 'bg-orange-600',
    hoverColor: 'group-hover:bg-orange-700'
  },
  {
    title: 'Geometry Tool',
    description: 'Explore geometry with our beautiful, free online geometry tool. Construct polygons, transform objects, and explore spatial math.',
    icon: Hexagon,
    path: '/math-tools/geometry',
    color: 'bg-purple-600',
    hoverColor: 'group-hover:bg-purple-700'
  },
  {
    title: '3D Calculator',
    description: 'Explore 3D math with our beautiful, free online 3D calculator. Graph surfaces, visualize vector fields, and plot parameterized curves.',
    icon: Hexagon,
    path: '/math-tools/3d',
    color: 'bg-teal-600',
    hoverColor: 'group-hover:bg-teal-700'
  }
];

export default function MathToolsPillarPage() {
  return (
    <div className="w-full flex-1 flex flex-col pt-12 pb-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 w-full mb-20 text-center">
         <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">
            Explore Math.
         </h1>
         <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Beautiful, free math tools built to help students discover and explore mathematical concepts visually.
         </p>
         
         <Link 
           href="/math-tools/calculator"
           className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg md:text-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all hover:-translate-y-1"
         >
           <Activity className="w-6 h-6" />
           Graphing Calculator
         </Link>
      </div>

      {/* Grid Section */}
      <div className="bg-gray-50 flex-1 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {MATH_TOOLS.slice(1).map(tool => {
               const Icon = tool.icon;
               return (
                 <Link 
                   key={tool.path}
                   href={tool.path}
                   className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:border-gray-300 flex flex-col h-full"
                 >
                    <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center mb-6 transition-colors shadow-sm ${tool.color} ${tool.hoverColor}`}>
                       <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed font-medium flex-1">
                      {tool.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                       Open {tool.title} <ChevronRight className="w-4 h-4" />
                    </div>
                 </Link>
               )
             })}
          </div>
        </div>
      </div>
    </div>
  );
}
