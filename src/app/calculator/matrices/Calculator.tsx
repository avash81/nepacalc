'use client';
import { useMemo, useState, useCallback } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Calculator as CalcIcon, Layers, ShieldCheck, Check, Copy, AlertTriangle, HelpCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

import MatrixEngine from './MatrixEngine';

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 border-l-4 border-[#1A73E8] pl-4 mt-8 first:mt-0">
      <Icon className="w-4 h-4 text-[#1A73E8]" />
      <h2 className="text-sm font-black text-[#202124] uppercase tracking-widest">{label}</h2>
    </div>
  );
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-[#DADCE0] rounded-md bg-white hover:bg-[#E8F0FE] hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all"
    >
      {copied ? <Check className="w-3 h-3 text-[#188038]" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

export default function Calculator() {


  // ── STEP 1: ENGINEERING PAGE INFORMATION ARCHITECTURE ───────────────────
  // Placeholders strictly defined, no content written yet.
  const step1Structure = (
    <div className="space-y-10">

      {/* TABLE OF CONTENTS */}
      <div className="space-y-4">
        <span className="inline-block text-[10px] font-bold text-[#70757A] uppercase tracking-widest bg-white border border-[#DADCE0] px-2.5 py-1 rounded shadow-sm">Last Updated: July 2026</span>
        <nav aria-label="Table of Contents" className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#70757A] mb-3">On This Page</h2>
          <ol className="space-y-1.5 text-sm">
            <li><a href="#what-is-matrix" className="text-[#1A73E8] hover:underline font-medium">Overview — What is a Matrix?</a></li>
            <li><a href="#matrix-formula" className="text-[#1A73E8] hover:underline font-medium">Matrix Formula Reference</a></li>
            <li><a href="#matrix-operations" className="text-[#1A73E8] hover:underline font-medium">Matrix Operations</a></li>
            <li><a href="#worked-examples" className="text-[#1A73E8] hover:underline font-medium">Worked Examples</a></li>
            <li><a href="#applications" className="text-[#1A73E8] hover:underline font-medium">Engineering Applications</a></li>
            <li><a href="#faqs" className="text-[#1A73E8] hover:underline font-medium">Frequently Asked Questions</a></li>
          </ol>
        </nav>
      </div>

      {/* PART 1 CONTENT */}
      <div id="what-is-matrix" className="space-y-10">
        
        {/* What is a Matrix? */}
        <div>
          <div id="what-is-matrix"></div>\n<SectionHeader icon={Layers} label="What is a Matrix?" />
          <div className="text-sm text-[#5F6368] leading-relaxed space-y-4">
            <p>
              A <strong>matrix</strong> is a rectangular arrangement of numbers, variables, or mathematical expressions organized into <strong>rows</strong> and <strong>columns</strong>. Matrices are one of the fundamental building blocks of <strong>linear algebra</strong> and are widely used throughout mathematics, engineering, physics, economics, computer science, robotics, artificial intelligence, and data analysis.
            </p>
            <p>
              A matrix is usually represented using capital letters such as <strong>A</strong>, <strong>B</strong>, or <strong>C</strong>, while its individual elements are identified by their row and column positions. For example:
            </p>
            <div className="py-2 overflow-x-auto text-center">
               <BlockMath math={`A = \\begin{bmatrix} 2 & 4 & 6 \\\\ 1 & 3 & 5 \\end{bmatrix}`} />
            </div>
            <p>
              This matrix contains <strong>2 rows</strong>, <strong>3 columns</strong>, and <strong>6 individual elements</strong>. The size of a matrix is known as its <strong>order</strong>. The order is written as: <span className="font-mono bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#DADCE0] text-[#202124]">Rows × Columns</span>. For the example above, the order is <strong>2 × 3</strong>.
            </p>
            <p>
              Understanding the order of a matrix is extremely important because many matrix operations depend on the dimensions of the matrices involved. <strong>Matrix addition</strong> requires both matrices to have exactly the same order. <strong>Matrix multiplication</strong> requires the number of columns in the first matrix to equal the number of rows in the second matrix. <strong>Determinants</strong> and <strong>inverses</strong> can only be calculated for square matrices.
            </p>
            <p>
              Matrices also form the backbone of modern statistics and data science. Operations such as correlation analysis, regression modelling, and principal component analysis all rely on matrix algebra under the hood. If you work with datasets and statistical measures, our <a href="/calculator/statistics-plus/" className="text-[#1A73E8] hover:underline font-medium">Advanced Statistics Calculator</a> applies these same matrix-based computations to give you mean, variance, standard deviation, and more from any dataset.
            </p>
          </div>
        </div>


        {/* Types of Matrices */}
        <div>
          <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Types of Matrices</h3>
          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
              <h4 className="text-xs font-black text-[#1A73E8] uppercase tracking-widest mb-2">Square Matrix</h4>
              <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">Has the same number of rows and columns. Required for determinants and inverses.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-2">
                <BlockMath math={`\\begin{bmatrix} 3 & 5 \\\\ 2 & 7 \\end{bmatrix}`} />
              </div>
              <p className="text-[10px] font-bold text-[#70757A] text-center mt-2 uppercase tracking-widest">Order: 2 × 2</p>
            </div>

            <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
              <h4 className="text-xs font-black text-[#1A73E8] uppercase tracking-widest mb-2">Rectangular Matrix</h4>
              <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">Has different numbers of rows and columns. Cannot have determinants or inverses.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-2">
                <BlockMath math={`\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}`} />
              </div>
              <p className="text-[10px] font-bold text-[#70757A] text-center mt-2 uppercase tracking-widest">Order: 2 × 3</p>
            </div>

            <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
              <h4 className="text-xs font-black text-[#1A73E8] uppercase tracking-widest mb-2">Identity Matrix</h4>
              <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">Square matrix with 1s on the main diagonal and 0s elsewhere. Behaves like the number 1.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-2">
                <BlockMath math={`I = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`} />
              </div>
            </div>

            <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
              <h4 className="text-xs font-black text-[#1A73E8] uppercase tracking-widest mb-2">Diagonal Matrix</h4>
              <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">Contains non-zero values only on its principal diagonal. Simplifies engineering calculations.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-2">
                <BlockMath math={`\\begin{bmatrix} 5 & 0 & 0 \\\\ 0 & 9 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix}`} />
              </div>
            </div>

          </div>
        </div>

        {/* What is a Matrix Calculator? */}
        <div>
          <SectionHeader icon={CalcIcon} label="What is a Matrix Calculator?" />
          <div className="text-sm text-[#5F6368] leading-relaxed space-y-4">
            <p>
              A <strong><a href="/calculator/linear-solver/" className="text-[#1A73E8] hover:underline">Matrix Calculator</a></strong> is an online mathematical tool that automatically performs matrix operations that would otherwise require lengthy manual calculations. Instead of solving matrices by hand, users simply enter the matrix values, select the desired operation, and receive an accurate solution within seconds.
            </p>
            <p>
              Because matrix calculations often involve dozens or even hundreds of arithmetic operations, performing them manually can be time-consuming and prone to errors. A matrix calculator removes this complexity while maintaining mathematical accuracy. For students building foundational understanding, Khan Academy's Linear Algebra course provides excellent step-by-step video explanations that complement this tool.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Useful For</h3>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-bold text-[#5F6368]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> Engineering Students</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> Civil Engineers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> Mechanical Engineers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> Electrical Engineers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> University Mathematics</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></span> NEB Engineering Preparation</li>
              </ul>
            </div>
            <div className="text-[11px] text-[#70757A] md:w-1/3 border-t md:border-t-0 md:border-l border-[#DADCE0] pt-4 md:pt-0 md:pl-6 leading-relaxed">
              Our calculator assists in simplifying complex linear algebra operations across a wide variety of advanced disciplines.
            </div>
          </div>
        </div>

      </div>

      <hr className="border-[#DADCE0]" />

      {/* SECTION 2: Formula */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <div id="matrix-formula"></div>\n<SectionHeader icon={Layers} label="Matrix Formula Reference" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-4">
          <p>
            The Matrix Calculator uses standard linear algebra formulas for every supported operation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Matrix Addition</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="C = A + B" />
              </div>
            </div>
            
            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Matrix Subtraction</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="C = A - B" />
              </div>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Matrix Multiplication</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="C = AB" />
              </div>
              <p className="text-[10px] text-[#70757A]">where each element is calculated using the dot product of one row and one column.</p>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Determinant (2×2)</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="\det(A) = ad - bc" />
              </div>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Matrix Inverse (2×2)</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math={`A^{-1} = \\frac{1}{ad-bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}`} />
              </div>
              <p className="text-[10px] text-[#70757A]">provided <InlineMath math="\det(A) \neq 0" />.</p>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Matrix Transpose</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="A^T" />
              </div>
              <p className="text-[10px] text-[#70757A]">obtained by exchanging rows and columns.</p>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Trace</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="tr(A) = \sum_{i=1}^{n}a_{ii}" />
              </div>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-2">Identity Matrix</h3>
              <div className="py-2 overflow-x-auto text-center bg-white border border-[#E8EAED] rounded mb-2">
                <BlockMath math="AI = IA = A" />
              </div>
              <p className="text-[10px] text-[#70757A]">where <InlineMath math="I" /> is the identity matrix of the same order.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Worked Examples */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <div id="worked-examples"></div>\n<SectionHeader icon={Layers} label="Worked Matrix Examples" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-8">
          <p>
            Understanding matrix operations becomes much easier when you see each step of the calculation. The examples below demonstrate how the Matrix Calculator solves common problems while also explaining the mathematics behind the results. These worked examples are suitable for High school mathematics, NEB Mathematics, Engineering Mathematics, Diploma Engineering, Computer Science, Data Science, and University Linear Algebra courses.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 1 — Matrix Addition</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the sum of the following matrices.</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 3 \\end{bmatrix}, B = \\begin{bmatrix} 5 & 2 \\\\ 7 & 1 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Step 1: Add the corresponding elements.</p>
                  <p>First row: <InlineMath math="2 + 5 = 7" />, <InlineMath math="4 + 2 = 6" /></p>
                  <p>Second row: <InlineMath math="1 + 7 = 8" />, <InlineMath math="3 + 1 = 4" /></p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <BlockMath math={`A+B = \\begin{bmatrix} 7 & 6 \\\\ 8 & 4 \\end{bmatrix}`} />
                </div>
                <p className="text-[10px] text-[#70757A]">The calculator performs this instantly for any compatible matrices.</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 2 — Matrix Multiplication</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Multiply</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}, B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Step 1: Multiply rows by columns.</p>
                  <p>R1 × C1: <InlineMath math="1(5)+2(7)=19" /></p>
                  <p>R1 × C2: <InlineMath math="1(6)+2(8)=22" /></p>
                  <p>R2 × C1: <InlineMath math="3(5)+4(7)=43" /></p>
                  <p>R2 × C2: <InlineMath math="3(6)+4(8)=50" /></p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <BlockMath math={`AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}`} />
                </div>
                <p className="text-[10px] text-[#70757A]">The Matrix Calculator automatically checks matrix dimensions before multiplication.</p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 3 — Determinant</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the determinant of</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`A = \\begin{bmatrix} 4 & 2 \\\\ 3 & 5 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Formula & Calculation:</p>
                  <BlockMath math={`\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad-bc`} />
                  <p className="text-center mt-2"><InlineMath math="(4)(5)-(2)(3) = 20-6 = 14" /></p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <p className="font-bold text-lg text-[#202124]">Determinant = 14</p>
                </div>
                <p className="text-[10px] text-[#70757A]">Because the determinant is not zero, the matrix is invertible.</p>
              </div>
            </div>

            {/* Example 4 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 4 — Matrix Inverse</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the inverse of</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`A = \\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Step 1: Find the determinant.</p>
                  <p><InlineMath math="(2)(3)-(1)(5) = 1" /></p>
                  <p className="font-bold mt-2 mb-1">Step 2: Apply the inverse formula.</p>
                  <BlockMath math={`A^{-1} = \\frac{1}{1} \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}`} />
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <BlockMath math={`A^{-1} = \\begin{bmatrix} 3 & -1 \\\\ -5 & 2 \\end{bmatrix}`} />
                </div>
                <p className="text-[10px] text-[#70757A]">The calculator automatically reports when an inverse cannot be found.</p>
              </div>
            </div>

            {/* Example 5 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 5 — Matrix Transpose</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the transpose of</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`A = \\begin{bmatrix} 1 & 4 & 7 \\\\ 2 & 5 & 8 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Solution: Swap rows and columns.</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <BlockMath math={`A^T = \\begin{bmatrix} 1 & 2 \\\\ 4 & 5 \\\\ 7 & 8 \\end{bmatrix}`} />
                </div>
                <p className="text-[10px] text-[#70757A]">Commonly used in statistics, machine learning, and graphics.</p>
              </div>
            </div>

            {/* Example 6 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 6 — Solving Equations</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Solve <a href="/calculator/linear-solver/" className="text-[#1A73E8] hover:underline">linear system</a></p>
                <div className="bg-white p-2 rounded border border-[#E8EAED] text-center text-xs">
                   <InlineMath math="x+y=7" /> <br/>
                   <InlineMath math="2x+3y=18" />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Matrix Representation: <InlineMath math="AX=B" /></p>
                  <BlockMath math={`A = \\begin{bmatrix} 1 & 1 \\\\ 2 & 3 \\end{bmatrix}, X = \\begin{bmatrix} x \\\\ y \\end{bmatrix}, B = \\begin{bmatrix} 7 \\\\ 18 \\end{bmatrix}`} />
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <p className="text-xs mb-2 text-[#70757A]">Using <InlineMath math="X=A^{-1}B" />:</p>
                   <p className="font-bold text-lg text-[#202124]">x = 3, y = 4</p>
                </div>
                <p className="text-[10px] text-[#70757A]">Widely used in engineering software, FEA, and structural analysis.</p>
              </div>
            </div>

            {/* Example 7 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 7 — Matrix Rank</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the rank of</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 4 & 5 & 6 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Explanation:</p>
                  <p>The second row is a multiple of the first row. Therefore only two rows are linearly independent.</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <p className="font-bold text-lg text-[#202124]">Matrix Rank = 2</p>
                </div>
                <p className="text-[10px] text-[#70757A]">Important for determining if equation systems have unique solutions.</p>
              </div>
            </div>

            {/* Example 8 */}
            <div className="p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA]">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Example 8 — Trace</h3>
              <div className="space-y-3">
                <p className="text-xs font-bold text-[#202124]">Problem: Find the trace of</p>
                <div className="flex justify-center items-center gap-2 overflow-x-auto bg-white p-3 rounded border border-[#E8EAED]">
                   <BlockMath math={`\\begin{bmatrix} 2 & 3 & 1 \\\\ 4 & 6 & 5 \\\\ 7 & 8 & 9 \\end{bmatrix}`} />
                </div>
                <div className="text-xs">
                  <p className="font-bold mb-1">Calculation: Add the diagonal elements.</p>
                  <p className="text-center mt-2"><InlineMath math="2+6+9=17" /></p>
                </div>
                <div className="bg-white p-3 rounded border border-[#E8EAED] text-center">
                   <p className="text-[10px] font-black uppercase text-[#188038] mb-2 tracking-widest">Final Answer</p>
                   <p className="font-bold text-lg text-[#202124]">Trace = 17</p>
                </div>
                <p className="text-[10px] text-[#70757A]">Used in eigenvalue calculations, statistics, and quantum mechanics.</p>
              </div>
            </div>
            
          </div>

          <div className="mt-6 p-4 bg-[#E8F0FE] border border-[#1A73E8] rounded-lg">
             <h4 className="text-xs font-black text-[#1A73E8] uppercase tracking-widest mb-2">Why These Examples Matter</h4>
             <p className="text-xs text-[#1A73E8] leading-relaxed">
               These worked examples help students understand not only the final answer but also the mathematical process behind each operation. While the Matrix Calculator provides instant results, learning the manual method improves problem-solving skills and prepares students for exams where full working is required. Whether you're solving homework, preparing for engineering entrance exams, or working with matrices in professional applications, these examples provide a practical foundation for mastering linear algebra.
             </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Common Matrix Operations */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <div id="matrix-operations"></div>\n<SectionHeader icon={Layers} label="Common Matrix Operations" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-6">
          <p>
            The NepaCalc Matrix Calculator supports a wide range of matrix operations used in mathematics, engineering, computer science, economics, statistics, and data analysis. Whether you are solving classroom exercises or professional engineering problems, the calculator produces accurate results instantly.
          </p>

          {/* Matrix Dimension Rules */}
          <div className="mb-8 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
            <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Matrix Dimension Rules</h3>
            <p className="text-xs text-[#5F6368] mb-4">Before performing any matrix operation, the matrix dimensions must satisfy specific mathematical rules.</p>
            
            <h4 className="text-xs font-black text-[#1A73E8] mb-2">Addition and Subtraction</h4>
            <p className="text-xs text-[#5F6368] mb-2">Both matrices must have identical dimensions.</p>
            <ul className="text-xs text-[#5F6368] space-y-1 mb-4">
              <li><code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">2 × 3 + 2 × 3</code> ✅</li>
              <li><code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">2 × 3 + 3 × 2</code> ❌</li>
            </ul>

            <h4 className="text-xs font-black text-[#1A73E8] mb-2">Matrix Multiplication</h4>
            <p className="text-xs text-[#5F6368] mb-2">The number of columns in the first matrix must equal the number of rows in the second matrix.</p>
            <ul className="text-xs text-[#5F6368] space-y-1 mb-4">
              <li><code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">2 × 3</code> × <code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">3 × 4</code> ✅ (Result: 2 × 4)</li>
              <li><code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">2 × 3</code> × <code className="bg-white px-1.5 py-0.5 border border-[#DADCE0] rounded text-[#202124]">2 × 2</code> ❌ (Multiplication is not defined)</li>
            </ul>
            <p className="text-[11px] text-[#70757A] font-bold italic">Understanding these rules prevents the most common beginner mistakes when solving matrix problems.</p>
          </div>

          <div className="space-y-6">
            
            {/* Addition */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Addition</h3>
              <p className="mb-3">Matrix addition combines two matrices by adding the corresponding elements together. Two matrices can only be added when they have exactly the same number of rows and columns.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto flex items-center justify-center gap-4 text-center">
                 <BlockMath math={`A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 3 \\end{bmatrix}`} />
                 <span className="font-bold text-[#70757A]">+</span>
                 <BlockMath math={`B = \\begin{bmatrix} 5 & 2 \\\\ 7 & 1 \\end{bmatrix}`} />
                 <span className="font-bold text-[#70757A]">=</span>
                 <BlockMath math={`\\begin{bmatrix} 7 & 6 \\\\ 8 & 4 \\end{bmatrix}`} />
              </div>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Combining datasets, Engineering calculations, Graphics transformations, Statistical models.</p>
            </div>

            {/* Subtraction */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Subtraction</h3>
              <p className="mb-3">Matrix subtraction follows exactly the same rule as addition. Each corresponding element is subtracted from the other.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center flex items-center justify-center gap-4">
                 <BlockMath math={`A - B = \\begin{bmatrix} -3 & 2 \\\\ -6 & 2 \\end{bmatrix}`} />
              </div>
            </div>

            {/* Multiplication */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Multiplication</h3>
              <p className="mb-3">Matrix multiplication is one of the most important concepts in linear algebra. Unlike addition, multiplication requires the number of columns in the first matrix to equal the number of rows in the second matrix. If Matrix A is <InlineMath math="2\\times3" />, then Matrix B must be <InlineMath math="3\\times n" /> for multiplication to be possible. The calculator automatically checks matrix compatibility before performing multiplication.</p>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Machine Learning, Artificial Intelligence, Computer Graphics, Robotics, Engineering Simulation, Structural Analysis, Signal Processing.</p>
            </div>

            {/* Determinant */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Determinant of a Matrix</h3>
              <p className="mb-3">The determinant is a single numerical value calculated from a square matrix. It indicates whether the matrix has an inverse and whether a <a href="/calculator/linear-solver/" className="text-[#1A73E8] hover:underline">system of linear equations</a> has a unique solution. A determinant of zero means the matrix is singular and cannot be inverted.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center">
                 <BlockMath math={`\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad-bc`} />
              </div>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Solving linear systems, Area and volume calculations, Coordinate transformations, Eigenvalue computation.</p>
            </div>

            {/* Inverse */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Inverse</h3>
              <p className="mb-3">The inverse of a matrix is another matrix that reverses the original transformation. Only non-singular square matrices have an inverse. If <InlineMath math="AA^{-1}=I" />, then <InlineMath math="A^{-1}" /> is the inverse of Matrix A. The calculator automatically detects whether an inverse exists.</p>
            </div>

            {/* Transpose */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Transpose</h3>
              <p className="mb-3">The transpose of a matrix is created by swapping rows and columns.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center flex items-center justify-center gap-4">
                 <BlockMath math={`\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix} \\xrightarrow{T} \\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`} />
              </div>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Statistics, Data Science, Machine Learning, Computer Vision, Engineering Mathematics.</p>
            </div>

            {/* RREF */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Reduced Row Echelon Form (RREF)</h3>
              <p className="mb-3">Reduced Row Echelon Form simplifies matrices into a standard format using elementary row operations. Engineering and mathematics students frequently use RREF during university coursework.</p>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> <a href="/calculator/linear-solver/" className="text-[#1A73E8] hover:underline">Solve systems of linear equations</a>, Determine matrix rank, Identify free variables, Check consistency of equations.</p>
            </div>

            {/* Matrix Rank */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Matrix Rank</h3>
              <p className="mb-3">The rank of a matrix represents the number of linearly independent rows or columns. The Matrix Calculator computes matrix rank automatically for supported matrix sizes.</p>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Matrix independence, Linear systems, Data dimensionality, Signal processing.</p>
            </div>

            {/* Trace */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Trace of a Matrix</h3>
              <p className="mb-3">The trace is the sum of all diagonal elements of a square matrix.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center flex items-center justify-center gap-4">
                 <BlockMath math={`\\begin{bmatrix} 2 & 1 \\\\ 5 & 7 \\end{bmatrix} \\implies \\text{Trace} = 2+7=9`} />
              </div>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Eigenvalue analysis, Differential equations, Quantum mechanics, Engineering mathematics.</p>
            </div>

            {/* Scalar Multiplication */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Scalar Multiplication</h3>
              <p className="mb-3">Scalar multiplication multiplies every element of a matrix by the same constant value. For example, multiply every element by 5:</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center flex items-center justify-center gap-4">
                 <span className="font-bold text-[#202124] text-lg">5</span>
                 <span className="font-bold text-[#70757A]">×</span>
                 <BlockMath math={`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}`} />
                 <span className="font-bold text-[#70757A]">=</span>
                 <BlockMath math={`\\begin{bmatrix} 5 & 10 \\\\ 15 & 20 \\end{bmatrix}`} />
              </div>
              <p className="text-xs text-[#70757A] mt-3"><strong>Applications:</strong> Graphics, engineering simulations, and physics.</p>
            </div>

            {/* Identity Matrix */}
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] mb-2">Identity Matrix</h3>
              <p className="mb-3">An identity matrix contains ones along the main diagonal and zeros everywhere else. Multiplying any compatible matrix by the identity matrix leaves it unchanged. Identity matrices form the foundation of many matrix operations including inversion and transformation.</p>
              <div className="bg-[#F8F9FA] rounded border border-[#E8EAED] py-4 overflow-x-auto text-center">
                 <BlockMath math={`I = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 5: Applications */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <div id="applications"></div>\n<SectionHeader icon={Layers} label="Real-World Applications of Matrix Calculators" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-8">
          <p>
            Matrices are one of the most important mathematical tools used in engineering, computer science, physics, economics, artificial intelligence, and data analysis. While many students first encounter matrices in school, professionals rely on them every day to solve complex real-world problems. The Matrix Calculator allows users to perform these calculations instantly while also helping them understand the underlying mathematical concepts.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Engineering</h3>
              <p className="mb-3 text-xs">Engineers use matrices extensively when solving systems involving multiple unknown variables.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Structural analysis & Truss calculations</li>
                <li>Electrical circuit analysis</li>
                <li>Fluid mechanics</li>
                <li>Mechanical system modelling</li>
                <li>Finite Element Analysis (FEA)</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Large engineering software packages often perform millions of matrix calculations behind the scenes.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Computer Graphics</h3>
              <p className="mb-3 text-xs">Every modern 2D and 3D graphics engine relies on matrix operations to compute the mathematical transformations required to render a <a href="/engineering/3d/" className="text-[#1A73E8] hover:underline">3D graph</a> or virtual environment.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Translation, Rotation, Scaling</li>
                <li>Reflection & Perspective projection</li>
                <li>Camera transformations</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Game engines like Unity and Unreal Engine use transformation matrices continuously while rendering scenes.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">AI & Machine Learning</h3>
              <p className="mb-3 text-xs">Machine learning models perform enormous numbers of matrix multiplications during training and prediction.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Neural network weights</li>
                <li>Feature vectors & Image pixels</li>
                <li>Word embeddings & Training datasets</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Libraries such as TensorFlow and PyTorch are built almost entirely around optimized matrix operations.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Data Science</h3>
              <p className="mb-3 text-xs">Data scientists organize datasets into matrices before performing analysis.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Linear regression & PCA</li>
                <li>Recommendation systems</li>
                <li>Clustering algorithms</li>
                <li>Statistical modelling</li>
              </ul>
              <p className="mt-3 text-xs text-[#5F6368]">Combine matrix-based regression analysis with descriptive statistics tools like our <a href="/calculator/standard-deviation/" className="text-[#1A73E8] hover:underline">Standard Deviation Calculator</a> for a complete data analysis workflow.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Physics</h3>
              <p className="mb-3 text-xs">Many physical systems can be represented using matrices.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Coordinate transformations & Quantum mechanics</li>
                <li>Rotational mechanics & Stress analysis</li>
                <li>Electromagnetic field calculations</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Matrix algebra provides a compact method for solving multiple simultaneous equations describing physical behaviour.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Robotics</h3>
              <p className="mb-3 text-xs">Robotic systems constantly calculate matrix transformations.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Robot arm positioning & Motion planning</li>
                <li>Sensor calibration & Camera vision systems</li>
                <li>Navigation algorithms</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Without matrix mathematics, modern robotics would not be possible.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Economics & Finance</h3>
              <p className="mb-3 text-xs">Economists frequently use matrices to model relationships between multiple variables. For example, payroll and salary deduction structures in Nepal rely on similar tabular computations — if you need to calculate your take-home pay, try our <a href="/calculator/nepal-salary/" className="text-[#1A73E8] hover:underline">Nepal Salary Calculator</a>.</p>
              <ul className="list-disc list-inside text-xs space-y-1 ml-2 text-[#70757A]">
                <li>Input-output economic models & Portfolio optimization</li>
                <li>Risk analysis & Market forecasting</li>
                <li>Financial modelling</li>
              </ul>
              <p className="mt-3 text-[10px] text-[#70757A] italic">Large investment firms use advanced matrix mathematics daily.</p>
            </div>

            <div className="p-5 border border-[#DADCE0] rounded-lg">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-3">Education</h3>
              <p className="mb-3 text-xs">Students studying Linear Algebra, Engineering Mathematics, Computer Science, Physics, and Statistics can use this Matrix Calculator to verify homework, check manual calculations, and better understand matrix operations through immediate feedback. For advanced function computations alongside matrix work, pair this with our <a href="/calculator/scientific-calculator/" className="text-[#1A73E8] hover:underline">Scientific Calculator</a>.</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-xs font-bold text-[#202124] leading-relaxed">
            Whether you are solving classroom assignments or building advanced engineering models, matrix calculations remain one of the most powerful mathematical tools available. Understanding how they work provides a strong foundation for higher mathematics, engineering, and computer science.
          </div>
        </div>
      </div>

      {/* SECTION 5B: Matrix Transformations */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm mt-8">
        <SectionHeader icon={Layers} label="Matrix Transformations" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-6">
          <p>Matrices are mathematical tools that describe geometric transformations. The most common transformations include:</p>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Rotation</h3>
                <p className="mb-3 text-xs">Rotates an object around an origin while preserving its size.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Used in: Robotics, Aerospace, Computer Graphics</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Scaling</h3>
                <p className="mb-3 text-xs">Changes the size of an object.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Used in: CAD software, Mechanical design, Image processing</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Reflection</h3>
                <p className="mb-3 text-xs">Flips an object across an axis or plane.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Widely used in computer graphics and geometry</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Shearing</h3>
                <p className="mb-3 text-xs">Slants an object without changing its area.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Common in animation and computer vision</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg md:col-span-2">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Translation</h3>
                <p className="mb-3 text-xs">Using homogeneous coordinates, matrices can also move objects from one position to another.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Forms the mathematical foundation of modern 3D graphics engines.</p>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 5C: Matrix Decomposition */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm mt-8">
        <SectionHeader icon={Layers} label="Matrix Decomposition" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-6">
          <p>Large engineering systems are rarely solved using direct matrix inversion. Instead, engineers decompose matrices into simpler forms. Common decomposition methods include:</p>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">LU Decomposition</h3>
                <p className="mb-3 text-xs">Factors a matrix into Lower and Upper triangular matrices.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Used in: Structural analysis, FEA, Engineering simulations</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">QR Decomposition</h3>
                <p className="mb-3 text-xs">Used for least squares problems and numerical optimization.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Common in signal processing and machine learning</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Cholesky Decomposition</h3>
                <p className="mb-3 text-xs">Designed specifically for positive-definite symmetric matrices.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Frequently used in engineering simulations and probability models</p>
             </div>
             <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Singular Value Decomposition (SVD)</h3>
                <p className="mb-3 text-xs">One of the most important algorithms in modern data science.</p>
                <p className="text-[10px] text-[#1A73E8] uppercase tracking-widest font-bold">Used in: AI, ML, Image Compression, PCA</p>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Common Mistakes */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <SectionHeader icon={AlertTriangle} label="Common Matrix Calculation Mistakes" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-6">
          <p>
            Matrix operations follow strict mathematical rules. Even small mistakes can produce completely incorrect results. Understanding these common errors helps students, engineers, and professionals solve problems more accurately. The Matrix Calculator automatically validates many of these rules before performing calculations, reducing the chance of mathematical errors.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Mistake 1 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">1</span>
                Adding Matrices of Different Sizes
              </h3>
              <p className="mb-2 text-xs">One of the most common mistakes is attempting to add or subtract matrices with different dimensions. For example, <InlineMath math="2\times3" /> cannot be added to <InlineMath math="3\times2" />.</p>
              <div className="bg-white p-3 rounded border border-[#FCE8E6] text-xs">
                <p className="font-bold text-[#188038] mb-1">Correct Rule:</p>
                <ul className="list-disc list-inside text-[#70757A]">
                  <li>Same number of rows</li>
                  <li>Same number of columns</li>
                </ul>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">2</span>
                Multiplying Incompatible Matrices
              </h3>
              <p className="mb-2 text-xs">Many students believe any two matrices can be multiplied. Matrix multiplication is only possible when: Number of columns in first = Number of rows in second.</p>
              <div className="bg-white p-3 rounded border border-[#FCE8E6] text-xs">
                <p className="text-[#188038]"><strong>Valid:</strong> <InlineMath math="2\times3 \times 3\times4" /></p>
                <p className="text-[#D93025]"><strong>Invalid:</strong> <InlineMath math="2\times3 \times 2\times2" /></p>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">3</span>
                Inverse of a Singular Matrix
              </h3>
              <p className="mb-2 text-xs">Not every matrix has an inverse. A matrix is invertible only when it is square and its determinant is not zero.</p>
              <div className="bg-white p-3 rounded border border-[#FCE8E6] text-xs text-center">
                If <InlineMath math="\det(A)=0" />, the inverse does not exist.
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">4</span>
                Forgetting Matrix Order
              </h3>
              <p className="text-xs">The order of a matrix is extremely important. <InlineMath math="2\times3" /> is completely different from <InlineMath math="3\times2" />. Even though both contain six elements, they behave differently during operations.</p>
            </div>

            {/* Mistake 5 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">5</span>
                Element-by-Element Multiplication
              </h3>
              <p className="mb-2 text-xs">Matrix multiplication is not performed by multiplying corresponding elements. Each element is calculated using Row × Column multiplication followed by addition.</p>
              <p className="text-[10px] text-[#70757A] italic">Many beginners incorrectly multiply <InlineMath math="a_{11}\times b_{11}" /> only.</p>
            </div>

            {/* Mistake 6 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">6</span>
                Incorrect Determinant Calculation
              </h3>
              <p className="mb-2 text-xs">For a <InlineMath math="2\times2" /> matrix, many students forget the subtraction.</p>
              <div className="bg-white p-3 rounded border border-[#FCE8E6] text-xs">
                <p className="text-[#188038]"><strong>Correct:</strong> <InlineMath math="\det(A) = ad - bc" /></p>
                <p className="text-[#D93025]"><strong>Incorrect:</strong> <InlineMath math="ad + bc" /></p>
              </div>
            </div>

            {/* Mistake 7 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">7</span>
                Confusing Transpose with Inverse
              </h3>
              <p className="text-xs">Transpose and inverse are completely different operations. Transpose swaps rows and columns, while Inverse creates a matrix satisfying <InlineMath math="AA^{-1}=I" />. They are not interchangeable.</p>
            </div>

            {/* Mistake 8 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">8</span>
                Ignoring Numerical Precision
              </h3>
              <p className="text-xs">Engineering calculations often involve decimal values. Rounding intermediate calculations too early can introduce noticeable errors in the final answer.</p>
            </div>

            {/* Mistake 9 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">9</span>
                Wrong Matrix for Linear Systems
              </h3>
              <p className="mb-2 text-xs">When solving systems, many students arrange coefficients incorrectly. <br/><br/> <InlineMath math="2x+3y=8" /> and <InlineMath math="5x+y=11" /> should become:</p>
              <div className="bg-white py-2 rounded border border-[#FCE8E6] text-center">
                <BlockMath math="\begin{bmatrix} 2 & 3 \\ 5 & 1 \end{bmatrix}" />
              </div>
            </div>

            {/* Mistake 10 */}
            <div className="p-5 border border-[#FCE8E6] bg-[#FCE8E6]/20 rounded-lg">
              <h3 className="text-sm font-black text-[#D93025] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D93025] text-white text-[10px]">10</span>
                Multiplication Is Not Commutative
              </h3>
              <p className="mb-2 text-xs">Unlike ordinary numbers, <InlineMath math="AB \neq BA" /> in most cases. Changing the multiplication order often produces an entirely different matrix or may even make multiplication impossible.</p>
            </div>
            
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#E8F0FE] border border-[#1A73E8]/30 rounded-lg">
              <h3 className="text-sm font-black text-[#1A73E8] mb-3 uppercase tracking-widest">Tips for Accurate Calculations</h3>
              <ul className="list-disc list-inside text-xs space-y-2 text-[#202124]">
                <li>Verify dimensions before starting.</li>
                <li>Check if matrix is square for determinants/inverses.</li>
                <li>Confirm determinant <InlineMath math="\neq 0" /> before finding inverse.</li>
                <li>Keep decimal precision until the final answer.</li>
                <li>Double-check coefficient placement for linear systems.</li>
                <li>Review matrix multiplication order carefully.</li>
                <li>Use worked examples to verify manual calculations.</li>
              </ul>
            </div>

            <div className="p-5 bg-[#E6F4EA] border border-[#188038]/30 rounded-lg">
              <h3 className="text-sm font-black text-[#188038] mb-3 uppercase tracking-widest">Why Use an Online Calculator?</h3>
              <p className="text-xs text-[#202124] mb-3">
                Calculating the inverse of a 5×5 matrix manually may require dozens of arithmetic operations. The calculator eliminates repetitive tasks while maintaining accuracy.
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 text-[#202124]">
                <li>Instant calculations & Reduced human error</li>
                <li>Support for multiple matrix operations</li>
                <li>Engineering-grade accuracy & Mobile-friendly</li>
              </ul>
              <p className="text-[10px] text-[#70757A] mt-3 italic">Suitable for students, teachers, engineers, researchers, and professionals.</p>
            </div>
          </div>
        </div>
      </div>

          {/* INTERNAL LINKS — Engineering Silo Only */}
          <div className="mt-8 p-6 bg-[#E8F0FE] rounded-lg border border-[#1A73E8]/30">
            <h3 className="text-sm font-black text-[#1A73E8] uppercase tracking-widest mb-3">Related Engineering Mathematics Tools</h3>
            <p className="mb-5 text-xs text-[#202124]">
              Matrix algebra connects directly to many other engineering mathematics topics. These tools complement the Matrix Calculator and are recommended for students and professionals working with systems of equations, numerical methods and applied mathematics.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/calculator/linear-solver/" className="p-4 bg-white border border-[#DADCE0] rounded-lg hover:border-[#1A73E8] hover:bg-[#E8F0FE] transition-all group block">
                <h4 className="text-xs font-black text-[#202124] group-hover:text-[#1A73E8] mb-1">Linear Equation Solver</h4>
                <p className="text-[11px] text-[#70757A]">Solve systems of linear equations using matrix methods and Gaussian elimination.</p>
              </a>
              <a href="/calculator/scientific-calculator/" className="p-4 bg-white border border-[#DADCE0] rounded-lg hover:border-[#1A73E8] hover:bg-[#E8F0FE] transition-all group block">
                <h4 className="text-xs font-black text-[#202124] group-hover:text-[#1A73E8] mb-1">Scientific Calculator for Engineering Calculations</h4>
                <p className="text-[11px] text-[#70757A]">Advanced trigonometric, logarithmic and exponential functions for engineering calculations.</p>
              </a>
              <a href="/calculator/quadratic-solver/" className="p-4 bg-white border border-[#DADCE0] rounded-lg hover:border-[#1A73E8] hover:bg-[#E8F0FE] transition-all group block">
                <h4 className="text-xs font-black text-[#202124] group-hover:text-[#1A73E8] mb-1">Quadratic Solver</h4>
                <p className="text-[11px] text-[#70757A]">Find real and complex roots of quadratic equations, used alongside eigenvalue calculations.</p>
              </a>
              <a href="/engineering/3d/" className="p-4 bg-white border border-[#DADCE0] rounded-lg hover:border-[#1A73E8] hover:bg-[#E8F0FE] transition-all group block">
                <h4 className="text-xs font-black text-[#202124] group-hover:text-[#1A73E8] mb-1">3D Graph Calculator</h4>
                <p className="text-[11px] text-[#70757A]">Visualise matrix transformations and 3D vector spaces interactively.</p>
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-[#DADCE0] flex flex-wrap gap-3">
              <a href="/calculator/unit-converter/" className="text-xs text-[#1A73E8] hover:underline font-medium">Unit Converter</a>
              <span className="text-[#DADCE0]">·</span>
              <a href="/engineering/" className="text-xs text-[#1A73E8] hover:underline font-medium">Engineering Hub</a>
              <span className="text-[#DADCE0]">·</span>
              <a href="/engineering/" className="text-xs text-[#1A73E8] hover:underline font-medium">Engineering Mathematics tools</a>
            </div>
          </div>

          {/* EEAT DISCLAIMER */}
          <div className="mt-8 p-4 bg-white border-l-4 border-[#188038] rounded-r-lg text-xs text-[#202124] leading-relaxed italic">
            The formulas and calculations used in this Matrix Calculator follow standard linear algebra principles taught in engineering, mathematics and computer science. Results are intended for educational, professional and verification purposes.
          </div>

          <div className="mt-6 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-xs font-bold text-[#202124] leading-relaxed">
            <h4 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-2">Final Thoughts</h4>
            <p className="mb-2">Matrices are one of the most powerful mathematical tools used across science, engineering, economics, artificial intelligence, and computer graphics.</p>
            <p>Whether you're calculating determinants, solving simultaneous equations, finding matrix inverses, or learning linear algebra for the first time, the NepaCalc Matrix Calculator provides accurate calculations together with educational explanations that help you understand every step. Bookmark this calculator for future use and explore the <a href="/engineering/" className="text-[#1A73E8] hover:underline">Engineering Mathematics tools</a> on NepaCalc to access additional engineering calculators and learning resources.</p>
          </div>

          {/* AUTHORITATIVE EXTERNAL REFERENCES */}
          <div className="mt-8 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl">
            <h3 className="text-xs font-black text-[#202124] uppercase tracking-widest mb-4">References</h3>
            <p className="text-xs text-[#5F6368] mb-4">The mathematical concepts used in this Matrix Calculator are based on internationally recognized engineering and linear algebra references.</p>
            <ul className="space-y-3 text-xs text-[#5F6368] font-medium ml-2">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1A73E8] flex-shrink-0"></span>
                <span>Gilbert Strang — Introduction to Linear Algebra (MIT)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1A73E8] flex-shrink-0"></span>
                <span><a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">MIT OpenCourseWare — Linear Algebra</a></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1A73E8] flex-shrink-0"></span>
                <span>David C. Lay — Linear Algebra and Its Applications</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1A73E8] flex-shrink-0"></span>
                <span>Erwin Kreyszig — Advanced Engineering Mathematics</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1A73E8] flex-shrink-0"></span>
                <span><a href="https://dlmf.nist.gov/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline">NIST Digital Library of Mathematical Functions</a></span>
              </li>
            </ul>
          </div>

      {/* SECTION 7: FAQ */}
      <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
        <div id="faqs"></div>\n<SectionHeader icon={HelpCircle} label="Frequently Asked Questions" />
        <div className="text-sm text-[#5F6368] leading-relaxed space-y-4">

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Why can't every matrix be inverted?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Only matrices with a non-zero determinant have an inverse.</p>
              <p>If the determinant equals zero, the matrix is called singular. Singular matrices lose dimensional information during transformation, making inversion mathematically impossible.</p>
            </div>
          </details>
          
          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              What is a Matrix Calculator?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>A Matrix Calculator is an online mathematical tool that performs matrix operations automatically. It can calculate matrix addition, subtraction, multiplication, determinants, inverses, transpose, rank, trace, and other linear algebra operations without requiring manual calculations.</p>
              <p>The NepaCalc Matrix Calculator is designed for students, engineers, researchers, and professionals who need fast and accurate matrix calculations.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              How do you multiply two matrices?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Two matrices can only be multiplied when the number of columns in the first matrix equals the number of rows in the second matrix.</p>
              <p>The result is obtained by multiplying each row of the first matrix with each column of the second matrix and summing the products.</p>
              <p>The Matrix Calculator performs these calculations instantly and verifies whether the matrices are compatible before multiplication.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Can every matrix have an inverse?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>No.</p>
              <p>A matrix has an inverse only if:</p>
              <ul className="list-disc list-inside ml-2">
                <li>It is a square matrix.</li>
                <li>Its determinant is not equal to zero.</li>
              </ul>
              <p>Matrices with a determinant of zero are called singular matrices and cannot be inverted. The Matrix Calculator automatically checks this condition before attempting to calculate the inverse.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              What is the determinant of a matrix?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The determinant is a single numerical value calculated from a square matrix. It helps determine whether a matrix has an inverse and whether a system of linear equations has a unique solution.</p>
              <p>For a 2 × 2 matrix,</p>
              <div className="overflow-x-auto text-center"><BlockMath math="\det(A)=ad-bc" /></div>
              <p>A determinant of zero indicates that the matrix is singular.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              What is the transpose of a matrix?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The transpose of a matrix is obtained by exchanging its rows and columns.</p>
              <div className="overflow-x-auto text-center flex items-center justify-center gap-4">
                 <BlockMath math="\begin{bmatrix} 1&2&3 \\ 4&5&6 \end{bmatrix}" />
                 <span className="font-bold">becomes</span>
                 <BlockMath math="\begin{bmatrix} 1&4 \\ 2&5 \\ 3&6 \end{bmatrix}" />
              </div>
              <p>Transpose operations are widely used in statistics, engineering, machine learning, and computer graphics.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              What is matrix rank?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The rank of a matrix is the maximum number of linearly independent rows or columns.</p>
              <p>Matrix rank is commonly used to determine whether systems of linear equations have unique solutions, infinitely many solutions, or no solution.</p>
              <p>The Matrix Calculator computes matrix rank automatically.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Can I solve systems of linear equations using this Matrix Calculator?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Yes.</p>
              <p>The calculator can solve systems of linear equations by applying matrix operations such as matrix inversion and Gaussian elimination where applicable.</p>
              <p>This makes it useful for engineering mathematics, linear algebra, and university coursework.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Is this Matrix Calculator suitable for engineering students?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Yes. The calculator is specifically designed for engineering students studying:</p>
              <ul className="list-disc list-inside ml-2 grid grid-cols-2 gap-2">
                <li>Engineering Mathematics</li>
                <li>Linear Algebra</li>
                <li>Numerical Methods</li>
                <li>Computer Science</li>
                <li>Electrical Engineering</li>
                <li>Mechanical Engineering</li>
                <li>Civil Engineering</li>
              </ul>
              <p>It can also be used for homework verification, exam preparation, and professional engineering calculations.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Is the Matrix Calculator free to use?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Yes. The NepaCalc Matrix Calculator is completely free.</p>
              <p>There are no subscriptions, registrations, or hidden charges. You can perform unlimited matrix calculations directly from your browser.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Can I use the Matrix Calculator on my mobile phone?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Yes. The calculator is fully responsive and works on:</p>
              <ul className="list-disc list-inside ml-2 grid grid-cols-2 gap-2">
                <li>Desktop computers</li>
                <li>Laptops</li>
                <li>Tablets</li>
                <li>Android devices</li>
                <li>iPhones</li>
              </ul>
              <p>No software installation is required.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              What matrix sizes are supported?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The calculator supports multiple matrix sizes depending on the selected operation.</p>
              <p>Common matrix sizes include:</p>
              <ul className="list-disc list-inside ml-2">
                <li>2 × 2</li>
                <li>3 × 3</li>
                <li>4 × 4</li>
                <li>Larger matrices where computationally supported</li>
              </ul>
              <p>Input validation automatically prevents unsupported operations.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Why does the calculator show that multiplication is not possible?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>Matrix multiplication is only defined when:</p>
              <p className="font-bold bg-[#F8F9FA] p-2 rounded">Number of columns in Matrix A = Number of rows in Matrix B.</p>
              <p>If this condition is not satisfied, multiplication cannot be performed. The calculator automatically detects incompatible matrices and displays an appropriate message.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Why can't my matrix be inverted?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>There are two common reasons:</p>
              <ol className="list-decimal list-inside ml-2">
                <li>The matrix is not square.</li>
                <li>The determinant equals zero.</li>
              </ol>
              <p>Only non-singular square matrices have an inverse. The Matrix Calculator checks these conditions before attempting inversion.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              How accurate is the Matrix Calculator?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The calculator follows standard linear algebra algorithms and mathematical rules used in engineering and university mathematics.</p>
              <p>Every calculation is performed programmatically to reduce manual calculation errors and provide highly accurate results.</p>
              <p>For educational purposes, users are still encouraged to understand the underlying mathematical concepts alongside the calculated answers.</p>
            </div>
          </details>

          <details className="group border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
            <summary className="p-4 cursor-pointer font-bold text-[#202124] flex justify-between items-center bg-[#F8F9FA] group-open:bg-white group-open:border-b border-[#DADCE0]">
              Which matrix operations are supported?
              <span className="text-[#1A73E8] group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-4 space-y-3">
              <p>The Matrix Calculator currently supports operations including:</p>
              <ul className="list-disc list-inside ml-2 grid grid-cols-2 gap-2">
                <li>Matrix Addition</li>
                <li>Matrix Subtraction</li>
                <li>Matrix Multiplication</li>
                <li>Determinant</li>
                <li>Matrix Inverse</li>
                <li>Matrix Transpose</li>
                <li>Matrix Rank</li>
                <li>Matrix Trace</li>
                <li>Scalar Multiplication</li>
                <li>Identity Matrix operations</li>
              </ul>
              <p>Additional advanced matrix operations may be added in future updates.</p>
            </div>
          </details>

        </div>
      </div>

    </div>
  );

  return <MatrixEngine seoContent={step1Structure} />;
}
